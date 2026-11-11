/* Transparent comparison engine. Never infers motives, diagnoses or numerical probabilities.
   Only affirmative, user-recognized observations are treated as evidence. */
window.ClearframeReasoner = (() => {
  const unique=values=>[...new Set(values)];
  function relevantEntries(analysis,entries){
    const subs=new Set(analysis.selectedSubs||[]);
    // Only explicitly selected child mechanisms can contribute evidence.
    // Unchecking every child must mean no evidence, not all parent evidence.
    // Shared child mechanisms can appear under more than one parent hub.
    return entries.filter(item=>(item.subroutineIds||[]).some(id=>subs.has(id)));
  }
  const pairKey=item=>String(typeof item==='string'?item:item?.id||'').replace(/-(concern|contrast)$/,'');
  function counterpartId(id,entries){
    const source=entries.find(entry=>entry.id===id);
    if(!source)return null;
    // The three original safety observations keep their IDs so saved selections
    // remain valid; their newly paired alternatives use a -contrast suffix.
    const counterpart=entries.find(entry=>entry.id!==id&&pairKey(entry)===pairKey(id)&&entry.kind!==source.kind);
    return counterpart?.id||null;
  }
  function normalizeEvidenceChoices(choices={},entries=[]){
    const matches={...choices};
    let conflicts=0;
    for(const entry of entries){
      if(entry.kind!=='repeats'||!matches[entry.id])continue;
      const opposite=counterpartId(entry.id,entries);
      if(opposite&&matches[opposite]){
        // Older saved records can contain both sides; neither is a justified choice.
        delete matches[entry.id];delete matches[opposite];conflicts++;
      }
    }
    return {matches,conflicts};
  }
  function toggleEvidenceChoice(choices,id,entries){
    const matches={...(choices||{})};
    if(!entries.some(entry=>entry.id===id))return matches;
    if(matches[id])delete matches[id];
    else{
      matches[id]=true;
      const opposite=counterpartId(id,entries);
      if(opposite)delete matches[opposite];
    }
    return normalizeEvidenceChoices(matches,entries).matches;
  }
  function candidates(analysis,entries){
    const linked=relevantEntries(analysis,entries);
    const selectedSubs=new Set(analysis.selectedSubs||[]);
    const ranked=linked.map((entry,index)=>({entry,index,
      score:(entry.routineIds||[]).includes(analysis.top?.[0])?100:0,
      // Suggestions follow the *selected subroutine order*, which is ranked
      // from the moment's words. This never affects evidence evaluation.
      subScore:Math.max(0,...(entry.subroutineIds||[]).filter(id=>selectedSubs.has(id))
        .map(id=>(analysis.selectedSubs||[]).length-(analysis.selectedSubs||[]).indexOf(id)))
    })).sort((a,b)=>(b.score+b.subScore)-(a.score+a.subScore)||a.index-b.index);
    const groups=new Map();
    for(const row of ranked){
      const key=pairKey(row.entry);
      if(!groups.has(key))groups.set(key,[]);
      groups.get(key).push(row.entry);
    }
    const pairLimit=Math.min(5,Math.max(3,(analysis.selectedSubs||[]).length));
    const pairs=[...groups.values()].filter(group=>group.some(x=>x.kind==='repeats')&&group.some(x=>x.kind==='differs'));
    const selectedGroups=new Set(pairs.slice(0,pairLimit));
    for(const group of groups.values()){
      if(group.some(x=>x.severity==='high'||analysis.evidenceMatches?.[x.id]))selectedGroups.add(group);
    }
    const chosenIds=new Set([...selectedGroups].flatMap(group=>group.map(x=>x.id)));
    const ordered=ranked.map(row=>row.entry);
    return {suggested:ordered.filter(entry=>chosenIds.has(entry.id)),additional:ordered.filter(entry=>!chosenIds.has(entry.id))};
  }
  function evaluate(analysis,subroutines,entries){
    const relevant=relevantEntries(analysis,entries);
    const normalized=normalizeEvidenceChoices(analysis.evidenceMatches,entries).matches;
    const matched=relevant.filter(x=>normalized[x.id]);
    const repeats=matched.filter(x=>x.kind==='repeats');
    const differs=matched.filter(x=>x.kind==='differs');
    const urgent=repeats.some(x=>x.severity==='high');
    const status=repeats.length&&differs.length?'mixed':repeats.length?'concerning':differs.length?'different':'undetermined';
    const bySub=(analysis.selectedSubs||[]).map(id=>{
      const s=subroutines.find(x=>x.id===id);if(!s)return null;
      const linked=matched.filter(x=>(x.subroutineIds||[]).includes(id));
      const support=linked.filter(x=>x.kind==='repeats');
      const counter=linked.filter(x=>x.kind==='differs');
      const verdict=support.length&&counter.length?'mixed':support.length?'supported':counter.length?'challenged':'untested';
      return {id,title:s.name,learned:s.learned,protective:s.protective,grounded:s.grounded,support,counter,verdict};
    }).filter(Boolean);
    let conclusion,action;
    if(urgent){
      conclusion='You selected a present-day indicator describing a threat to physical safety or the use of force. Supportive behavior at other times does not erase that concern. Clearframe cannot independently verify the event or infer a person’s motive; take the specific behavior seriously.';
      action='Prioritize physical safety and practical autonomy. If danger may be immediate, move to a safer place and seek urgent help. You do not need to debate an unsafe person or prove their intention before seeking support.';
    }else if(status==='mixed'){
      conclusion='Your selections include both behavior consistent with the pattern being examined and behavior that differs from it. Neither set cancels the other. This mixed picture does not establish anyone’s motive, the origin of your learned expectation, or that every interaction follows the same rule.';
      action='Name the specific concern and look at the circumstances, any repair, and whether it repeats. Respect differences in needs and boundaries without overlooking a real harm.';
    }else if(status==='concerning'){
      conclusion='You selected present-day behavior consistent with the relational pattern being examined. Your concern therefore has a reported observation behind it, but that alone does not establish coercive control, a learned childhood cause, or another person’s motive. Consider the actual conduct and the surrounding context.';
      action='Describe what happened and consider a proportionate request or boundary within your control. Notice any unequal expectations or pressure without assuming an ordinary difference must be wrongdoing.';
    }else if(status==='different'){
      conclusion='You selected present-day behavior that differs from the earlier pattern. This challenges the prediction that the same consequence must happen again; it does not erase the past or guarantee every future interaction. A learned protective alarm can remain strong even when the current relationship works differently.';
      action='Consider whether an old protective rule is still needed here, or whether it might unfairly restrict another person. If clarification is useful, ask without accusing and respect their answer or need for space.';
    }else{
      conclusion='No relevant present-day indicator has been selected yet. The feeling may connect to a learned expectation, but this input does not establish whether the current person is repeating the pattern or behaving differently. Both possibilities remain open.';
      action='Identify one observable fact before interpreting intention. You can then compare the actual behavior with the conditional expectations you may have learned.';
    }
    const strongest=bySub.filter(x=>x.verdict!=='untested');
    return {status,urgent,matched,repeats,differs,bySub,strongest,conclusion,action,
      counts:{similar:repeats.length,different:differs.length,untested:bySub.filter(x=>x.verdict==='untested').length}
    };
  }
  return {evaluate,relevantEntries,candidates,pairKey,counterpartId,normalizeEvidenceChoices,toggleEvidenceChoice};
})();
