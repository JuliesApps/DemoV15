/* Clearframe V10 | Conservative, mechanism-first, on-device suggestions.
 * A phrase is an invitation to test a mechanism, never proof that it happened.
 * The source atlas remains browseable even when the sentence is too ambiguous
 * for a justified automatic selection. No generative service or network call.
 */
window.ClearframeMatcher = (() => {
  'use strict';
  const normalize = value => String(value || '').toLowerCase().normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9'\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  const has = (sentence, expression) => expression.test(sentence);
  const observable = 'This sentence is a starting account, not independent proof of a recurring pattern or anyone’s intention.';
  // The complete book-derived inventory participates in ranking. Frequent
  // context words (mother, person, family, feel) are not enough to identify a
  // mechanism. Unusual co-occurring mechanism words are more informative.
  const STOP = new Set(('the a an and or but if then when while with without to from for of in on at into as is are was were be been being am do does did can could would should will shall ' +
    'i me my mine myself you your yours they them their theirs he him his she her hers we us our someone anyone people person other another relationship relationships family families mom mother dad father parents parent child children adult today yesterday now old new ' +
    'that this these those it its what who how why where which there here said say says told thinks think thought know knows belief believe felt feeling feels feel very just still really about have has had having not no yes also all most some than because something anything happened happening ' +
    'one two same more less much many make made making get got getting go went come came went do doing thing things time times way ways able handle').split(/\s+/));
  const ALIASES={silent:'quiet',silence:'quiet',quieter:'quiet',talkative:'express',talking:'speak',withdrawal:'withdraw',withdrawn:'withdraw',withdrawing:'withdraw',rejected:'reject',rejecting:'reject',rejection:'reject',punished:'punish',punishing:'punish',punishment:'punish',accusing:'accuse',accusation:'accuse',accused:'accuse',ignored:'ignore',ignoring:'ignore',fearful:'fear',afraid:'fear',worry:'fear',worried:'fear',worries:'fear',threatened:'threat',threatening:'threat',threats:'threat',pressure:'press',pressured:'press',pressuring:'press',belonging:'belong',boundaries:'boundary',rules:'rule',choices:'choice',expectations:'expect',expected:'expect',expecting:'expect',responsibilities:'responsibility',responsible:'responsibility',competence:'capable',incapable:'capable',competent:'capable',incompetent:'capable',capability:'capable',privacy:'private',control:'controlling',controlled:'controlling',controls:'controlling',controlling:'controlling',emotionally:'emotion',emotions:'emotion',feelings:'emotion',evidence:'proof',proved:'proof',proving:'proof',prove:'proof'};
  const tokens=value=>normalize(value).split(/[\s-]+/).map(word=>ALIASES[word]||word.replace(/(?:ingly|edly|ments|ness|ing|ed|es|s)$/,'')).filter(word=>word.length>=4&&!STOP.has(word));
  const basicHubs=new Set(['family-rules','interaction-cycles','interpretation-loops','interpersonal-boundaries','triangular-conflict','authority-and-power','emotional-expression','family-duties','communication-patterns','learning-and-expectations']);
  // These mechanisms require observable supporting conduct. They cannot be
  // chosen by a weak topical similarity score alone.
  const EVIDENCE_GATED=new Set(['pursue-withdraw-cycle','threat-backed-compliance','economic-dependence-leverage','invisible-loyalty-debt','surveillance-called-care','punitive-silence-vs-safety-pause','role-based-double-standards','false-self-accommodation','surface-tactic-unchanged-rule','felt-experience-redefined']);

  // Shared concept vocabulary for the ENTIRE atlas. These are groups of
  // interchangeable meanings, not strings copied from input examples or a
  // fixed list of preferred routines. Each new account is compared to every
  // existing subroutine's name, meaning, learned rule and reality check.
  // The score also depends on the rarity of the concepts across the atlas.
  const CONCEPTS={
    'private-inference':/\b(?:guess\w*|assum\w*|suspect\w*|mind.read\w*|unspoken|secret\w*|hidden|motive\w*|intent\w*|interpret\w*|inferred?|thought\w*|think\w*|believ\w*|presum\w*|certainty|certain|sure that|must mean|really mean|know what|reading (?:his|her|their) mind)\b/,
    'anticipated-outcome':/\b(?:expect\w*|anticipat\w*|foresee\w*|predict\w*|forecast\w*|wait\w*|await\w*|hope\w*|wish\w*|dread\w*|certain to|will eventually|going to|bound to|prepar\w* for|count\w* on|looking forward|plan\w*)\b/,
    'relational-loss':/\b(?:abandon\w*|reject\w*|unwant\w*|exclude\w*|unlov\w*|unvalu\w*|discard\w*|unimportant|leave|left|gone|disappear\w*|vanish\w*|separat\w*|break.up|move out|go away|get rid|no longer|never come back|lost (?:love|interest|connection)|cut me off)\b/,
    'hostile-intent':/\b(?:sabotag\w*|malic\w*|spite\w*|deliberat\w*|on purpose|intentional\w*|evil|cruel\w*|punish\w*|retaliat\w*|revenge|payback|hurt me|ruin\w*|out to get|harm\w*)\b/,
    'emotional-threat':/\b(?:fear\w*|afraid|scared|worr\w*|anxious|anxiety|panic\w*|unsafe|threat\w*|danger\w*|dread\w*|catastroph\w*|worst.case|terrified|overwhelm\w*)\b/,
    'disproportion':/\b(?:tiny|small|minor|ordinary|little|single|one mistake|slight|trivial|disproportion\w*|extreme|enormous|everything|nothing|total\w*|complete\w*|forever|always|never|generaliz\w*|exaggerat\w*|magnif\w*)\b/,
    'boundaries':/\b(?:boundar\w*|privacy|private|personal|own space|own time|my room|my desk|my choice|consent|permission|without asking|autonom\w*|independen\w*|say no|saying no|refus\w*|declin\w*|not comfortable|respect\w*)\b/,
    'coercion':/\b(?:control\w*|forbid\w*|force\w*|demand\w*|insist\w*|must|obey\w*|comply|compliance|required?|enforc\w*|restric\w*|ultimatum|not allowed|can't choose|cannot choose|no choice|pressur\w*|threat\w*)\b/,
    'shame-identity':/\b(?:asham\w*|sham\w*|humiliat\w*|embarrass\w*|worthless|bad person|selfish|incompetent|incapable|failure|defect\w*|unfit|label\w*|character|personality|identity|role|who i am|who they are)\b/,
    'approval-value':/\b(?:approv\w*|validat\w*|worth\w*|value\w*|matter\w*|please|pleasing|care\w*|love\w*|affection|belong\w*|accept\w*|prais\w*|reassur\w*|recognition|important|loyal\w*)\b/,
    'emotional-care':/\b(?:emot\w*|feel\w*|mood\w*|distress\w*|soothe\w*|comfort\w*|calm\w*|cheer up|support\w*|caregiv\w*|caretaking|parentif\w*|upset|cry\w*|anger|angry)\b/,
    'unequal-burden':/\b(?:responsib\w*|obligation\w*|sacrific\w*|debt|owe|guilt\w*|ungrateful|indebted|duty|burden\w*|unfair|one.sided|double standard|hypocr\w*|unequal|scapegoat\w*|blame\w*)\b/,
    'contradiction':/\b(?:contradict\w*|inconsisten\w*|change\w* (?:their |the |her |his )?(?:mind|story|rule|account)|different story|opposite|reverse\w*|backtrack\w*|switch\w*|double.bind|conflict\w*|can't win|goalpost\w*|moving target\w*)\b/,
    'communication':/\b(?:explain\w*|discuss\w*|listen\w*|speak\w*|saying|said|told|conversation|message\w*|respond\w*|answer\w*|silence|silent|quiet|communicat\w*|argument|clarif\w*|heard|deny\w*)\b/,
    'evidence-reality':/\b(?:proof|prove|evidence|fact\w*|actual|observable|observed|reality|real|record\w*|remember\w*|memory|deny\w*|verify|check|know|certainty|confirm\w*)\b/,
    'repetition-pattern':/\b(?:repeat\w*|again|habit\w*|pattern\w*|regular\w*|every time|always|never|continual\w*|constant\w*|persist\w*|keep|keeps|kept)\b/,
    'power-role':/\b(?:authority|power|boss|mother|father|parent|guardian|adult|child|family|manager|supervisor|hierarch\w*|domin\w*|dependent|caretak\w*)\b/
  };
  const conceptHits=value=>{
    const s=normalize(value),hits=new Map();
    for(const [name,pattern] of Object.entries(CONCEPTS)){
      const found=pattern.exec(s);
      if(found)hits.set(name,`${found.index}:${found[0].length}`);
    }
    return hits;
  };
  const concepts=value=>new Set(conceptHits(value).keys());
  const CORE_CONCEPTS=new Set(['private-inference','anticipated-outcome','relational-loss','hostile-intent','emotional-threat','coercion','shame-identity','unequal-burden','contradiction','boundaries','approval-value','repetition-pattern']);
  const ANCHOR_CONCEPTS=new Set(['private-inference','relational-loss','hostile-intent','emotional-threat','coercion','shame-identity','unequal-burden','contradiction','boundaries']);

  function semanticCandidates(sentence, routines, subs) {
    const query=new Set(tokens(sentence));
    const hits=conceptHits(sentence);
    const queryConcepts=new Set(hits.keys());
    if(query.size<2&&queryConcepts.size<2)return [];
    const parentSignals=new Map(routines.map(r=>[r.id,(r.signals||[]).map(normalize).filter(Boolean)]));
    const docs=subs.map(item=>{
      const name=new Set(tokens(item.name));
      const definition=new Set(tokens(`${item.meaning} ${item.check}`));
      const examples=new Set(tokens(`${item.learned} ${item.protective||''}`));
      const conceptual=concepts(`${item.name} ${item.meaning} ${item.learned} ${item.protective||''} ${item.check}`);
      const cues=new Set((item.cues||[]).flatMap(tokens));
      return {item,name,definition,examples,cues,conceptual,all:new Set([...name,...definition,...examples,...cues])};
    });
    const frequencies=new Map();
    for(const doc of docs)for(const term of doc.all)frequencies.set(term,(frequencies.get(term)||0)+1);
    const conceptFrequencies=new Map();
    for(const doc of docs)for(const term of doc.conceptual)conceptFrequencies.set(term,(conceptFrequencies.get(term)||0)+1);
    const parents=new Map();
    for(const r of routines)for(const id of r.subroutineIds||[]){const old=parents.get(id)||[];old.push(r);parents.set(id,old);}
    const scored=[];
    for(const doc of docs){
      const shared=[...query].filter(term=>doc.all.has(term));
      const overlappingConcepts=[...queryConcepts].filter(term=>doc.conceptual.has(term));
      const lexicalWeight=shared.reduce((sum,term)=>{
        const rarity=Math.log(1+(docs.length+1)/(frequencies.get(term)||1));
        return sum+rarity*(doc.name.has(term)?1.6:doc.cues.has(term)?1.35:doc.definition.has(term)?1:0.55);
      },0);
      const conceptWeight=overlappingConcepts.reduce((sum,term)=>sum+Math.log(1+(docs.length+1)/(conceptFrequencies.get(term)||1)),0);
      const conceptSupported=overlappingConcepts.length>=2
        && overlappingConcepts.filter(term=>CORE_CONCEPTS.has(term)).length>=2
        // One word such as "threat" must not count three times just because
        // it appears in the fear, coercion and intention vocabularies.
        && new Set(overlappingConcepts.filter(term=>CORE_CONCEPTS.has(term)).map(term=>hits.get(term))).size>=2;
      // Never turn a single generic shared word ("mother", "feeling",
      // "work") into a psychological explanation. The semantic route needs
      // at least two independently meaningful features of the same mechanism.
      const lexicalSupported=shared.length>=2&&lexicalWeight>=6.4
        && overlappingConcepts.some(term=>ANCHOR_CONCEPTS.has(term));
      if(!lexicalSupported&&!(conceptSupported&&conceptWeight>=3.1))continue;
      const weight=lexicalWeight+Math.min(conceptWeight*0.55,3.2);
      const parent=(parents.get(doc.item.id)||[]).sort((a,b)=>Number(basicHubs.has(a.id))-Number(basicHubs.has(b.id)))[0];
      // A hub's original matching phrases are an extra contextual vote, not
      // license to pick all of its unrelated children from one generic word.
      const signalBoost=parent&&(parentSignals.get(parent.id)||[]).some(phrase=>{
        return phrase.includes(' ')?(` ${sentence} `).includes(` ${phrase} `):query.has(tokens(phrase)[0]);
      })?0.6:0;
      if(parent)scored.push({id:doc.item.id,hub:parent.id,score:Math.min(8.5,2.2+weight/1.9+signalBoost),why:[...shared,...overlappingConcepts]});
    }
    return scored.sort((a,b)=>b.score-a.score);
  }

  // V10 has a second, much richer dictionary that earlier versions of this
  // matcher ignored: every present-day indicator is linked to its intended
  // subroutine. Use all 357 examples as labeled semantic prototypes, not as
  // hardcoded answers to a handful of user phrases. IDF-weighted similarity
  // transfers those links to new wording without needing an exact sentence.
  // Positive "differs" indicators participate too: the user may be describing
  // evidence of a healthy difference rather than a harmful repetition.
  function indicatorCandidates(sentence,routines,subroutines){
    const examples=window.CLEARFRAME_EVIDENCE?.entries||[];
    if(!examples.length)return [];
    const query=new Set(tokens(sentence));
    if(query.size<2)return [];
    const byId=new Set(subroutines.map(x=>x.id));
    const parents=new Map();
    for(const r of routines)for(const id of r.subroutineIds||[]){
      if(!parents.has(id)||basicHubs.has(r.id))parents.set(id,r.id);
    }
    const docs=examples.map(item=>({item,terms:new Set(tokens(item.statement))}));
    const counts=new Map();
    for(const doc of docs)for(const term of doc.terms)counts.set(term,(counts.get(term)||0)+1);
    const weight=term=>Math.log(1+(docs.length+1)/(counts.get(term)||1));
    const queryNorm=Math.sqrt([...query].reduce((n,t)=>n+weight(t)**2,0));
    const results=new Map();
    for(const doc of docs){
      const shared=[...query].filter(term=>doc.terms.has(term));
      if(shared.length<2)continue;
      const common=shared.reduce((n,t)=>n+weight(t)**2,0);
      const docNorm=Math.sqrt([...doc.terms].reduce((n,t)=>n+weight(t)**2,0));
      const similarity=common/(queryNorm*docNorm||1);
      const exact=normalize(sentence)===normalize(doc.item.statement);
      if(!exact&&similarity<0.50)continue;
      const score=exact?11.8:Math.min(10,3.7+similarity*7);
      for(const id of doc.item.subroutineIds||[]){
        if(!byId.has(id)||!parents.has(id))continue;
        const old=results.get(id);
        if(!old||score>old.score)results.set(id,{id,hub:parents.get(id),score,
          why:shared,source:'v10-indicator-similarity'});
      }
    }
    return [...results.values()].sort((a,b)=>b.score-a.score).slice(0,10);
  }

  // V4b always returned a fixed pair when matching failed. Keep its useful
  // affordance (a place to begin exploring) but select a THEMATIC starting
  // point from V10's actual signal/cue index rather than pretending that a
  // random default is an inferred childhood mechanism. This tier is clearly
  // marked as low confidence and never runs for ordinary neutral accounts.
  function exploratoryCandidates(sentence,routines,subroutines){
    if(!/\b(?:he|she|they|them|their|someone|anyone|people|my (?:[a-z-]+)|our (?:[a-z-]+)|boss|coworker|roommate|friend|parent|partner|family)\b/.test(sentence))return [];
    if(!/\b(?:ignore\w*|dismiss\w*|reject\w*|blam\w*|accus\w*|criticiz\w*|criticis\w*|hurt\w*|punish\w*|press\w*|demand\w*|force\w*|unfair|upset|scared|afraid|worr\w*|anxious|never|always|repeatedly|keep|keeps|kept|sham\w*|humiliat\w*|argu\w*|fight\w*|yell\w*|threat\w*|withhold\w*|contradict\w*|confus\w*|misunderst\w*|avoid\w*|neglect\w*|interrupt\w*)\b/.test(sentence))return [];
    const query=new Set(tokens(sentence));
    if(query.size<2)return [];
    const parents=new Map();
    const hubStrength=new Map();
    for(const r of routines){
      let strength=0;
      for(const signal of r.signals||[]){
        const n=normalize(signal),words=tokens(n);
        if(words.length===0)continue;
        if(words.length>1&&(` ${sentence} `).includes(` ${n} `))strength+=2;
        else if(words.length===1&&query.has(words[0]))strength+=1;
      }
      hubStrength.set(r.id,strength);
      for(const id of r.subroutineIds||[]){
        const old=parents.get(id);
        if(!old||strength>(hubStrength.get(old)||0))parents.set(id,r.id);
      }
    }
    const eligible=[];
    for(const sub of subroutines){
      const hub=parents.get(sub.id);
      if(!hub)continue;
      const cueWords=new Set((sub.cues||[]).flatMap(tokens));
      const nameWords=new Set(tokens(sub.name));
      // Only highly specific, editor-authored labels and cues qualify for
      // this weakest tier. Common words buried in long explanatory prose
      // produced unrelated matches (e.g. any "response" or "request").
      const distinctive=[...query].filter(t=>cueWords.has(t)||nameWords.has(t));
      if(!distinctive.length)continue;
      const evidence=distinctive.reduce((n,t)=>n+(cueWords.has(t)?2:1.8),0);
      const strength=evidence+(hubStrength.get(hub)||0)*0.5;
      if(strength<2.3)continue;
      eligible.push({id:sub.id,hub,score:Math.min(6.9,5.5+strength*0.25),strength,
        frame:{title:sub.name,
          observation:'Exploratory thematic match only: some words in this account relate to this V10 mechanism, but there is not enough context to infer that the pattern occurred. Check the definition before choosing it.',
          learned:sub.learned,protective:sub.protective,check:sub.check}});
    }
    return eligible.filter(x=>!EVIDENCE_GATED.has(x.id))
      .sort((a,b)=>b.strength-a.strength||a.id.localeCompare(b.id)).slice(0,2);
  }

  // Last tier: an OPEN-VOCABULARY retrieval pass for relational concerns.
  // The former fallback only ran for a short list of negative verbs and
  // required matching a subroutine's exact cue wording. Most everyday
  // accounts therefore returned zero despite an applicable book concept.
  // These are conceptual domains (consent, conditional regard, self-worth,
  // autonomy, emotional labor, fairness, uncertainty), never user examples.
  // Rank every existing subroutine using its own text, cues, parent signals,
  // and conceptual neighbors. Suggestions from this tier explicitly admit
  // they are exploratory questions rather than diagnosed patterns.
  const TOPICS=[
    {name:'conditional regard',query:/\b(?:only (?:when|if)|unless|as long as|if i (?:do|agree|help|give|comply)|useful|needed|wants? (?:a|my) favou?r|needs? something|likes? me when|love me if)\b/,document:/\b(?:conditional|only when|unless|approval|acceptance|respect|affection|worth|belong|performance|care|loyalty|favor|favour|support)\b/,weight:3.4},
    {name:'one-sided care',query:/\b(?:favo(u)?rs?|help|look after|tak(?:e|ing) care|car(?:e|ing) for|needs? something|burden|carry|responsib\w*|comfort|cheer|fix (?:her|his|their)|make (?:her|him|them) happy|grateful|gratitude|sacrific\w*|gave up)\b/,document:/\b(?:caretak\w*|caregiv\w*|support|obligat\w*|emotional labor|responsib\w*|sacrifice|parentif\w*|duty|burden|favor|favour|reciprocity|gratitude)\b/,weight:3.1},
    {name:'privacy and ownership',query:/\b(?:secret\w*|(?:read|checked?|looked? at|opened?|shared?|saw|went through) (?:my|her|his|their) (?:messages?|texts?)|phone|password|diary|belongings|possessions|room|privacy|private|personal|without asking|go(?:es|ing)? through|check\w* (?:my|our))\b/,document:/\b(?:privacy|private|digital|consent|boundary|access|personal|monitor\w*|disclos\w*|property|snoop\w*|surveill\w*)\b/,weight:3.8},
    {name:'fairness and unequal rules',query:/\b(?:different(?:ly)?|unfair|double standard|other people|everyone else|more freedom|less freedom|compared to|compared with|only me|same thing|rules are|favorit\w*|favou?rit\w*)\b/,document:/\b(?:differen\w*|unequal|double standard|role|rule|fair|privileg\w*|comparison|favor\w*|favou?r\w*|approval|incongruen\w*)\b/,weight:3.1},
    {name:'social presentation',query:/\b(?:in front of|when (?:his|her|their|my) friends|around (?:his|her|their|my) friends|in (?:a|the) group|when others|behind (?:my|our) back|in public|acts? different)\b/,document:/\b(?:audience|public|private|incongruen\w*|loyalty|triangulat\w*|role|persona|perform\w*|coalition|contradic\w*)\b/,weight:3.8},
    {name:'shame and worth',query:/\b(?:burden|stupid|worthless|not lovable|not good enough|not worth|selfish|guilty|ashamed|embarrass\w*|bad person|incompetent|defective|too sensitive|dramatic|failur\w*)\b/,document:/\b(?:shame|worth|identity|critic\w*|label\w*|defect\w*|burden|responsib\w*|validation|rejection|feelings|emotion\w*)\b/,weight:3.7},
    {name:'anticipated harm or rejection',query:/\b(?:worr\w*|scared|afraid|fear\w*|anxi\w*|dread|expect|bet|suspect|guess|seems?|maybe|wonder|not sure|not know|drifting|turn on me|leave me|lose him|lose her|forgotten|doesn.t care|hate me|mad at me)\b/,document:/\b(?:predict\w*|expect\w*|fear|anxi\w*|rejection|abandon\w*|assum\w*|interpret\w*|certainty|forecast\w*|separat\w*|mind|inference|threat)\b/,weight:3.6},
    {name:'voice and expression',query:/\b(?:listen|notice|ignore|dismiss|talk over|interrupt|speak|quiet|silence|say|ask|tell|conversation|feelings?|cry|opinion|views?|ideas?)\b/,document:/\b(?:listen|speak|communication|expression|emotion|validation|dismiss|silenc\w*|hear\w*|rebutt\w*|voice|perspective)\b/,weight:2.5},
    {name:'autonomy and compliance',query:/\b(?:let me|allow|allowed|permission|must|have to|need to|cannot|can't|won.t let|force|push|press\w*|demand\w*|choice|choose|refuse|say no|go out|freedom|control\w*)\b/,document:/\b(?:autonomy|agency|permission|boundary|control|power|rule|obedien\w*|choice|compliance|coerc\w*|independen\w*|authority)\b/,weight:3.4},
    {name:'independent time and space',query:/\b(?:alone|myself|my own time|evening to myself|time to myself|a break|time apart|space|distance|stay home|privacy|without (?:him|her|them)|need quiet)\b/,document:/\b(?:independen\w*|autonomy|separat\w*|closeness|distance|privacy|boundar\w*|space|choice|consent|relationship|disengag\w*)\b/,weight:3.6},
    {name:'disagreement and conflict',query:/\b(?:disagree\w*|different opinion|argu\w*|fight\w*|conflict\w*|confront\w*|challenge\w*|against (?:me|us)|provok\w*|defend\w*|insult\w*)\b/,document:/\b(?:disagree\w*|conflict\w*|argu\w*|escalat\w*|retaliat\w*|voice|autonomy|communication|boundary|choice|fight\w*|sham\w*)\b/,weight:3.4},
    {name:'inconsistent response',query:/\b(?:never know|one day|another day|sometimes|changes?|different version|mood swings|on eggshells|keeps doing|again and again|always|every time|old mistake|no matter what)\b/,document:/\b(?:inconsisten\w*|intermitten\w*|pattern|repeat\w*|unpredictab\w*|change|volatil\w*|expect\w*|reinforce\w*|rule|escalat\w*)\b/,weight:3.2},
    {name:'repair and rupture',query:/\b(?:apologi\w*|sorry|promis\w*|forgiv\w*|hurt|repair|trust|lied|liar|doubt my|memory|blame|accuse)\b/,document:/\b(?:repair|rupture|apolog\w*|forgiv\w*|trust|blam\w*|accountab\w*|narrative|memory|reality|deni\w*|critic\w*)\b/,weight:3.2}
  ];
  // Maintain the semantic index at the *mechanism* level, not as question-by-
  // question exceptions. Each domain links to suitable subroutine IDs already
  // present in the original book atlas. Any new wording activates a domain;
  // the actual candidate is then ranked using its authored name and cues.
  // This prevents incidental overlaps in long explanations from suggesting
  // unrelated mechanisms (e.g. "sister" -> messenger duty).
  const TOPIC_TO_SUBROUTINES=Object.fromEntries(Object.entries({
    'conditional regard':'conditional-human-worth intermittent-approval affection-priced-by-authenticity hidden-condition-in-a-request punishment-for-need fixed-role-performance unnegotiable-bargain',
    'one-sided care':'unspoken-caretaking-contract overfunctioning-dependency-loop emotional-parentification instrumental-parentification caregiver-capacity-erased declared-equality-unshared-labor favour-ledger-without-end needed-rest-called-neglect support-withheld-at-need unseen-sibling-needs',
    'privacy and ownership':'digital-access-without-scope digital-agreement-breach privacy-denied-under-togetherness confidentiality-threat-as-pressure forced-emotional-disclosure vulnerability-weaponized-later interrupted-private-exchange',
    'fairness and unequal rules':'nominal-equality-masks-decision-power role-swap-insight-refused authority-scope-undefined favored-unfavored-story social-norm-enforcement contradictory-injunction harmless-difference-treated-as-harm',
    'social presentation':'witness-recruited-for-a-verdict third-party-amplification third-party-camps triangular-loyalty-test social-story-carried-outward fixed-role-performance favored-unfavored-story cross-generational-coalition',
    'shame and worth':'global-character-criticism fixed-role-performance conditional-human-worth unnecessary-correction prohibited-feeling specific-request-replaced-by-identity punishment-for-need anxious-projection-label totalizing-problem-identity',
    'anticipated harm or rejection':'mind-reading-certainty anxious-projection-label expectation-confirmation old-threat-applied-to-new-person past-expectation-transfer separation-option-erased arbitrary-inference placating-for-peace',
    'voice and expression':'emotional-invalidation blocked-clarification prohibited-feeling compulsory-harmony argument-rebuttal-listening emotion-deflection speaking-over-capable-person feeling-treated-as-action',
    'autonomy and compliance':'authority-scope-undefined unnegotiable-bargain control-rebellion-polarization transition-rule-rigidity agreement-imposed-retroactively separate-preference-treated-as-severance care-language-hides-override compelled-openness',
    'independent time and space':'separate-preference-treated-as-severance needed-rest-called-neglect privacy-denied-under-togetherness emotional-cutoff rigid-boundary-pattern separation-option-erased',
    'disagreement and conflict':'placating-for-peace compulsory-harmony reciprocal-escalation blocked-clarification cross-complaint-derailment argument-rebuttal-listening emotional-pace-set-by-authority',
    'inconsistent response':'intermittent-approval contradictory-injunction incongruent-communication hidden-condition-in-a-request expectation-confirmation need-guessed-then-condemned injury-without-repair',
    'repair and rupture':'injury-without-repair forgiveness-as-obligation blame-as-self-protection vulnerability-weaponized-later cross-complaint-derailment appeasing-words-overriding-actions emotional-invalidation'
  }).map(([topic,ids])=>[topic,new Set(ids.split(' '))]));
  function openVocabularyCandidates(sentence,routines,subroutines){
    const s=normalize(sentence);
    const speakerOrRelation=/\b(?:i|me|my|mine|he|him|his|she|her|they|them|their|someone|anyone|everyone|nobody|no one|people|partner|friend|family|parent|mother|father|sister|brother|roommate|coworker|boss)\b/.test(s);
    const socialContext=/\b(?:he|him|his|she|her|they|them|their|someone|anyone|people|everyone|nobody|no one|partner|friend|sister|brother|mother|father|parent|roommate|coworker|boss|my (?:[a-z-]+)|rules|limits|permission|privacy)\b/.test(s);
    const innerRule=/\b(?:i (?:worry|fear|expect|assume|guess|feel|think|believe|never know|keep quiet|stay quiet|stay silent|avoid speaking)|i(?:'m| am) (?:afraid|ashamed|guilty|scared|a burden)|nobody|no one|everyone)\b/.test(s);
    const concern=/\b(?:only|unless|but|never|always|every|again|keep|keeps|kept|won't|wouldn't|can't|cannot|not|no|different|differently|bad|upset|angry|mad|guilty|scared|afraid|worried|worry|anxious|fear|hurt|frustrated|burden|shame|ashamed|selfish|secrets?|privacy|private|boundary|forgotten|ignored|ignore|seems|suspect|guess|expect|doubt|lied|liar|demand|push|press|unfair|freedom|favor|favour|checked my|read my|took my|snooped|only if|only when|as if)\b/.test(s);
    if(!speakerOrRelation||!concern||!(socialContext||innerRule))return [];
    const active=TOPICS.filter(t=>t.query.test(s));
    if(!active.length)return [];
    const words=new Set(tokens(s));
    const conceptsInQuery=concepts(s);
    const subsDocs=subroutines.map(sub=>{
      const name=new Set(tokens(sub.name));
      const cue=new Set((sub.cues||[]).flatMap(tokens));
      const body=new Set(tokens(`${sub.meaning} ${sub.learned} ${sub.protective||''} ${sub.check}`));
      return {sub,name,cue,body,all:new Set([...name,...cue,...body]),concepts:concepts(`${sub.name} ${sub.meaning} ${sub.learned} ${sub.protective||''} ${sub.check}`)};
    });
    const frequencies=new Map();
    for(const d of subsDocs)for(const w of d.all)frequencies.set(w,(frequencies.get(w)||0)+1);
    const parents=new Map();
    for(const r of routines)for(const id of r.subroutineIds||[])if(!parents.has(id)||basicHubs.has(r.id))parents.set(id,r.id);
    const eligible=[];
    for(const d of subsDocs){
      const parent=parents.get(d.sub.id);
      if(!parent)continue;
      const matchedTopics=active.filter(t=>TOPIC_TO_SUBROUTINES[t.name]?.has(d.sub.id));
      if(!matchedTopics.length)continue;
      const lexical=[...words].filter(w=>d.all.has(w));
      const lexScore=lexical.reduce((sum,w)=>sum+Math.log(1+subroutines.length/(frequencies.get(w)||1))*(d.name.has(w)?1.3:d.cue.has(w)?1.1:0.65),0);
      const conceptScore=[...conceptsInQuery].filter(c=>d.concepts.has(c)&&CORE_CONCEPTS.has(c)).length;
      const strongestTopic=Math.max(...matchedTopics.map(t=>t.weight));
      const score=strongestTopic+Math.min(lexScore,6)*0.5+Math.min(conceptScore,3)*0.75+0.75*(matchedTopics.length-1);
      eligible.push({id:d.sub.id,hub:parent,score:Math.min(8.4,6+score*0.20),strength:score,
        frame:{title:d.sub.name,
          observation:`Exploratory match: the account may connect to ${matchedTopics.map(t=>t.name).slice(0,2).join(' and ')}. The text does not prove this subroutine occurred or that anyone intended harm. Compare the actual conduct and possible alternative explanations.`,
          learned:d.sub.learned,protective:d.sub.protective||'Pause to check the present facts.',check:d.sub.check}});
    }
    // Filter evidence-gated mechanisms *before* taking the shortlist. In the
    // broken build they occupied every top slot and were filtered afterward,
    // making ordinary relationship statements show "0 subroutines".
    return eligible.filter(x=>!EVIDENCE_GATED.has(x.id))
      .sort((a,b)=>b.strength-a.strength||a.id.localeCompare(b.id)).slice(0,3);
  }

  // V4b's scoreRoutines() guaranteed a nonempty exploration by falling back
  // to two default hubs and their linked subroutines. V11 accidentally lost
  // that product behavior. Preserve its useful guarantee, but first search
  // ALL of V11's own authored names, cues, definitions and hub signals. If
  // nothing actually relates, clearly label the suggestions as generic entry
  // points rather than misrepresenting them as a detected learned pattern.
  function openEndedStarters(sentence,routines,subroutines){
    const words=new Set(tokens(sentence));
    const queryConcepts=concepts(sentence);
    const parents=new Map();
    for(const r of routines)for(const id of r.subroutineIds||[]){
      if(!parents.has(id)||basicHubs.has(r.id))parents.set(id,r);
    }
    const documents=subroutines.map(sub=>({
      sub,
      name:new Set(tokens(sub.name)),
      cues:new Set((sub.cues||[]).flatMap(tokens)),
      meaning:new Set(tokens(sub.meaning)),
      context:new Set(tokens(`${sub.learned||''} ${sub.protective||''} ${sub.check||''}`)),
      concepts:concepts(`${sub.name} ${sub.meaning} ${sub.learned||''} ${sub.check||''}`)
    }));
    const frequencies=new Map();
    for(const d of documents){
      const all=new Set([...d.name,...d.cues,...d.meaning,...d.context]);
      for(const word of all)frequencies.set(word,(frequencies.get(word)||0)+1);
    }
    const ranked=[];
    for(const d of documents){
      const parent=parents.get(d.sub.id);
      if(!parent||EVIDENCE_GATED.has(d.sub.id))continue;
      let overlap=0,score=0;
      for(const word of words){
        const weight=Math.log(1+(documents.length+1)/(frequencies.get(word)||1));
        if(d.name.has(word)){score+=weight*2.5;overlap++;}
        else if(d.cues.has(word)){score+=weight*2.1;overlap++;}
        else if(d.meaning.has(word)){score+=weight*1.15;overlap++;}
        else if(d.context.has(word)){score+=weight*0.35;overlap++;}
      }
      const sharedConcepts=[...queryConcepts].filter(c=>CORE_CONCEPTS.has(c)&&d.concepts.has(c));
      score+=sharedConcepts.length*1.15;
      for(const signal of parent.signals||[]){
        const normalized=normalize(signal);
        if(normalized.length>=5&&(` ${sentence} `).includes(` ${normalized} `)){
          score+=normalized.includes(' ')?3.2:1.7;
          overlap++;
        }
      }
      if(overlap===0&&sharedConcepts.length===0)continue;
      ranked.push({sub:d.sub,parent,score,overlap});
    }
    ranked.sort((a,b)=>b.score-a.score||b.overlap-a.overlap||a.sub.id.localeCompare(b.sub.id));
    // A single ordinary shared noun ("test", "teacher", "home") must not
    // become a specific family-control hypothesis. Fall back to openly
    // generic navigation unless two independent terms support a comparison.
    const close=ranked.filter(x=>x.score>=5&&x.overlap>=2).slice(0,3);
    const generic=!close.length;
    const chosen=generic?['arbitrary-inference','expectation-confirmation']
      .map(id=>({sub:subroutines.find(x=>x.id===id),parent:parents.get(id)}))
      .filter(x=>x.sub&&x.parent):close;
    return chosen.map(({sub,parent},index)=>({id:sub.id,hub:parent.id,score:5.6-index*0.03,
      frame:{id:sub.id,title:sub.name,tier:'starter',
        observation:generic
          ?'No close keyword match. Starting point only, not an inferred pattern.'
          :'Loose keyword match only, not evidence that a pattern occurred.',
        learned:sub.learned,protective:sub.protective||'Pause to check the current facts.',check:sub.check}}));
  }

  // Percentages express *textual relevance* on this local index, never a
  // probability that a mechanism or anyone's intention is established.
  // A subroutine is counted once under its best-relevant control routine;
  // group scores are sums of the qualifying (>=1%) child percentages.
  function rankedOverview(sentence,routines,subroutines,selected,matchedTier){
    const query=new Set(tokens(sentence));
    const parentIds=new Map();
    for(const r of routines)for(const id of r.subroutineIds||[]){
      if(!parentIds.has(id)||basicHubs.has(r.id))parentIds.set(id,r.id);
    }
    const docs=subroutines.map(item=>{
      const name=new Set(tokens(item.name));
      const cues=new Set((item.cues||[]).flatMap(tokens));
      const body=new Set(tokens(`${item.meaning||''} ${item.learned||''} ${item.protective||''} ${item.check||''}`));
      return {id:item.id,name,cues,body,all:new Set([...name,...cues,...body])};
    });
    const docById=new Map(docs.map(doc=>[doc.id,doc]));
    const frequencies=new Map();
    for(const doc of docs)for(const word of doc.all)frequencies.set(word,(frequencies.get(word)||0)+1);
    const rarity=word=>Math.log(1+(docs.length+1)/(frequencies.get(word)||1));
    const selectedById=new Map(selected.map(x=>[x.id,x]));
    const candidateById=new Map();
    for(const doc of docs){
      let hitWeight=0,keywordHits=0;
      for(const word of query){
        if(!doc.all.has(word))continue;
        keywordHits++;
        hitWeight+=rarity(word)*(doc.name.has(word)?2.4:doc.cues.has(word)?2:0.85);
      }
      const primary=selectedById.get(doc.id);
      // A generic fallback is navigation, not matched evidence. It must not
      // outrank an actual keyword overlap or receive invented confidence.
      const ruleBoost=primary&&matchedTier==='matched'?Math.min(primary.score,14):0;
      const rank=hitWeight+ruleBoost*1.45;
      const percent=Math.min(95,Math.round((1-Math.exp(-rank/15))*95));
      candidateById.set(doc.id,{id:doc.id,hub:primary?.hub||parentIds.get(doc.id),keywordHits,
        percent,rank,matched:!!primary&&matchedTier==='matched'});
    }
    const eligible=[...candidateById.values()].filter(x=>x.hub&&(!EVIDENCE_GATED.has(x.id)||selectedById.has(x.id)));
    eligible.sort((a,b)=>b.rank-a.rank||b.keywordHits-a.keywordHits||a.id.localeCompare(b.id));
    const byControl=new Map();
    for(const candidate of eligible){
      if(candidate.percent<1)continue;
      if(!byControl.has(candidate.hub))byControl.set(candidate.hub,{id:candidate.hub,totalPercent:0,matches:[]});
      const group=byControl.get(candidate.hub);
      group.matches.push(candidate);
      group.totalPercent+=candidate.percent;
    }
    const groupedMatches=[...byControl.values()].sort((a,b)=>
      b.totalPercent-a.totalPercent||b.matches[0].percent-a.matches[0].percent||a.id.localeCompare(b.id));
    const choices=[];
    const add=item=>{if(item&&!choices.some(x=>x.id===item.id))choices.push(item);};
    // If the sentence has no detectable keyword overlap, keep the browsing
    // defaults in a consistent order, each visibly scored at 0%.
    if(eligible[0]?.rank>0)for(const item of eligible)if(choices.length<3)add(item);
    // A sentence with no atlas vocabulary still receives honest 0%-match
    // browsing entries rather than fabricated high-confidence diagnoses.
    for(const id of ['arbitrary-inference','expectation-confirmation','mind-reading-certainty']){
      if(choices.length<3)add(candidateById.get(id));
    }
    const topThree=choices.slice(0,3);

    const routinesRanked=routines.map(r=>{
      const own=new Set([...tokens(r.name),...(r.signals||[]).flatMap(tokens)]);
      const direct=[...query].filter(word=>own.has(word));
      const children=(r.subroutineIds||[]).map(id=>candidateById.get(id)).filter(Boolean);
      const allHits=new Set(direct);
      for(const id of r.subroutineIds||[]){
        const doc=docById.get(id);
        if(doc)for(const word of query)if(doc.name.has(word)||doc.cues.has(word))allHits.add(word);
      }
      const strongest=children.slice().sort((a,b)=>b.rank-a.rank).slice(0,3);
      const strength=direct.reduce((sum,word)=>sum+rarity(word)*1.7,0)
        +strongest.reduce((sum,item)=>sum+item.rank,0)/Math.max(strongest.length,1);
      const detected=selected.filter(x=>x.hub===r.id).reduce((sum,x)=>sum+x.score,0);
      return {id:r.id,keywordHits:allHits.size,ownHits:direct.length,rank:strength+detected*1.2,
        topFive:children.sort((a,b)=>b.rank-a.rank||b.keywordHits-a.keywordHits||a.id.localeCompare(b.id)).slice(0,5)};
    });
    routinesRanked.sort((a,b)=>b.rank-a.rank||b.keywordHits-a.keywordHits||a.id.localeCompare(b.id));
    // With no keywords at all, show the branch of the first default starting
    // point instead of claiming that an arbitrary routine won a keyword vote.
    if(!routinesRanked[0]?.keywordHits&&topThree[0]){
      const parent=routinesRanked.find(r=>r.id===topThree[0].hub);
      if(parent){routinesRanked.splice(routinesRanked.indexOf(parent),1);routinesRanked.unshift(parent);}
    }
    return {topThree,routinesRanked,groupedMatches};
  }

  function match(text, routines, subroutines, customRoutineIds=[]) {
    const s = normalize(text);
    const byId = new Map(subroutines.map(item => [item.id, item]));
    const hubs = new Map(routines.map(item => [item.id, item]));
    const found = [];
    const add = (when, id, hub, score, frame) => {
      if (when && byId.has(id) && hubs.has(hub)) found.push({ id, hub, score, frame });
    };
    const authority = has(s, /\b(?:mom|mother|dad|father|parent|guardian|caretaker|family|boss|teacher|manager|they|she|he|partner|spouse)\b/);
    const agency = has(s, /\b(?:can|can't|cannot|could|couldn't|could not|able|unable|capable|incapable|competent|incompetent|handle|manage|cope|raise|raising|parenting|responsible|responsibility|ready|fit|trust)\b/);
    const choiceRestriction=has(s,/\b(?:can't|cannot|couldn't|could not|won't|wouldn't)\s+(?:refuse|decline|leave|go out|choose|decide|say no|visit|see|enter|use|access|spend)\b/);
    const otherForecast = authority && agency && !choiceRestriction && (
      has(s, /\b(?:does not|do not|doesn't|don't|didn't|did not|never)\s+(?:really\s+)?(?:think|believe|trust|expect)\b/) ||
      has(s, /\b(?:thinks?|believes?|says?|said|calls?|called|claims?)\b.{0,90}\b(?:can't|cannot|couldn't|could not|won't|wouldn't|not capable|incapable|incompetent|unable|not ready|unfit|would fail|will fail|never)\b/) ||
      has(s, /\b(?:doubts?|questions?)\b.{0,60}\b(?:capability|ability|parenting|responsibility|competence|handle|manage)\b/)
    );
    const fixedLabel = has(s, /\b(?:always|never|forever|still|inherently|fundamentally|incapable|incompetent|useless|irresponsible|unfit|defective|worthless|failure)\b/);
    const actualRestriction = authority && has(s, /\b(?:won't let|will not let|not allowed|forbid|forbids|forbidden|stop me|stopped me|permission|must obey|not permitted|can't choose|cannot decide)\b/);
    const disputedIdentity = has(s, /\b(?:who i am|what i am|my identity|my role|the real me|old reputation|they decided i am|label(?:led|ed)? me|assigned me)\b/);
    const directStatement = has(s, /\b(?:told me|said to me|explicitly said|actually said|said that|wrote to me|texted me|stated outright|heard (?:her|him|them) say)\b/);
    const mentalAttribution = has(s, /\b(?:thinks?|believes?|assumes?|must think|must believe|does not think|doesn't think|do not think|don't think|secretly wants?|hates? me|doesn't care about me|don't care about me|knows? (?:what|why) i)\b/);
    // Not every attribution is mind-reading: explicitly reported words are
    // different from a guess. When evidence is unspecified, offer both
    // possibilities as hypotheses and ask what was actually said.
    add(authority && mentalAttribution && !directStatement, 'mind-reading-certainty', 'narrative-certainty', 10.6, {
      title:'Private thoughts: reported or inferred?',
      observation:'The statement attributes a private belief or intention to another person. It is not yet clear whether the person expressed it or whether it was inferred from their behavior.',
      learned:'I may anticipate rejection or criticism by treating my interpretation of an unspoken thought as certain.',
      protective:'I might prepare a defense, withdraw, or seek reassurance before checking the actual words or actions.',
      check:'Did they explicitly say this, or am I interpreting what they might think? If it was said, examine the actual judgment and its consequences instead.'
    });

    add(otherForecast, 'anxious-projection-label', 'assigned-persona-enforcement', 10, {
      title: 'A prediction about capability',
      observation: 'You report another person’s judgment about what you could manage. That judgment is not evidence of your actual ability, and it does not by itself establish a controlling pattern.',
      learned: 'Their prediction about what I can handle might begin to feel like a limit I have to accept or disprove.',
      protective: 'I might defend my competence before making a choice, or avoid exploring the choice at all.',
      check: 'Is this an opinion you can disagree with, or is it repeatedly used to restrict a decision that belongs to you?'
    });
    add(otherForecast && fixedLabel && actualRestriction, 'fixed-narrative-filter', 'narrative-certainty', 8);
    add(disputedIdentity && actualRestriction, 'preferred-identity-blocked', 'assigned-persona-enforcement', 9);

    const silence = has(s, /\b(?:quiet|silent|silence|talkative|not talking|speak less|withdrawn)\b/);
    const suspicion = has(s, /\b(?:schem(?:e|ing)|suspicious|withholding|hiding something|secretive|plotting|up to something|accus(?:e|ed|es))\b/);
    add(silence && suspicion, 'role-conditioned-suspicion', 'assigned-persona-enforcement', 12, {
      title: 'A mannerism turned into an obligation',
      observation: 'Silence or a change in expressiveness is being interpreted as suspicious. A change from a baseline can invite a question without establishing misconduct.',
      learned: 'I may have to perform the personality they expect, even when I simply want to be quiet.',
      protective: 'I might explain harmless silence or monitor my mannerisms to avoid accusations.',
      check: 'Is the reaction an open-ended check-in, or an accusation with consequences and unequal permission?'
    });
    add(has(s, /\b(?:both|another person|they can|she can|he can|i can but|same (?:thing|behavior|behaviour) as)\b/) && has(s, /\b(?:but|whereas|yet|while|different|allowed|punish|permission)\b/), 'role-based-double-standards', 'authority-and-power', 8);

    const emotion = has(s, /\b(?:feel|feeling|sad|hurt|upset|cry|cried|angry|afraid|fear|anxious|emotion)\b/);
    const dismissed = has(s, /\b(?:ridiculous|dramatic|overreact|too sensitive|stop crying|invalid|don't care|doesn't matter|not real|made it up|grow up|dismiss(?:ed|es)?)\b/);
    add(emotion && dismissed, 'emotional-invalidation', 'emotional-expression', 10, {
      title: 'An expressed feeling dismissed', observation: 'The account may describe a feeling being rejected. Disagreement with an interpretation is different from refusing to acknowledge a feeling.',
      learned: 'My feelings might be treated as unacceptable unless I can justify them.', protective: 'I might hide my feelings or intensify them to be heard.',
      check: 'Were the feelings acknowledged while actual conduct was discussed separately?'
    });
    add(has(s, /\b(?:mistake|accident|forgot|error|spilled|missed|misunderstood)\b/) && has(s, /\b(?:on purpose|deliberate|intentionally|meant to|wanted to hurt|malicious|malice)\b/), 'hostile-attribution', 'interpretation-loops', 10);
    add(has(s, /\b(?:always|never|every time)\b/) && has(s, /\b(?:bad|worthless|useless|selfish|irresponsible|failure|lazy|incapable)\b/) && !otherForecast, 'global-character-criticism', 'learning-and-expectations', 8);
    add(has(s, /\b(?:even though|despite|but i have|although i have)\b/) && has(s, /\b(?:changed|improved|grown|different|proved|demonstrated)\b/) && has(s, /\b(?:still|never|always|old|same|refus(?:e|ed|es))\b/), 'selective-confirmation', 'narrative-certainty', 9);

    const demand = has(s, /\b(?:kept asking|keep asking|begging|pushing|pressing|demand(?:ing)?|need an answer|reassurance)\b/);
    const retreat = has(s, /\b(?:withdraw|pull(?:s|ed)? away|walk(?:s|ed)? away|shut(?:s)? down|retreat|ignores? me|stop(?:s|ped)? talking|silent treatment)\b/);
    add(demand && retreat, 'pursue-withdraw-cycle', 'pursuit-distancing-pressure', 10);
    add(has(s, /\b(?:silent treatment|cut me off|won't speak to me|stop talking to me|stopped talking to me)\b/) && has(s, /\b(?:until|unless|agree|comply|apologize|give in|disagree)\b/), 'punitive-silence-vs-safety-pause', 'pursuit-distancing-pressure', 11);
    add(has(s, /\b(?:after everything (?:i|we)|everything i've done|you owe me|owe me|owe them|sacrificed for you)\b/) && has(s, /\b(?:owe|after everything|sacrificed|obey|loyal|guilt|indebted|repay)\b/), 'invisible-loyalty-debt', 'family-duties', 10);

    const directThreat = has(s, /\b(?:threaten(?:s|ed|ing)? to (?:hurt|hit|kill|injure)|hit me|hits me|punched me|physical force|blocked? my exit|locked me in|assaulted me|held me down|physically prevented)\b/);
    add(directThreat, 'threat-backed-compliance', 'coercion-and-accountability', 20, {
      title: 'A direct safety concern', observation: 'Your statement describes possible force, confinement, or a direct threat. The risk deserves attention regardless of any relational theory.',
      learned: 'Disagreement might carry an immediate safety risk.', protective: 'I might comply or seek distance to stay safe.',
      check: 'Prioritize immediate safety and the specific observed acts; do not use a pattern label to minimize them.'
    });
    add(has(s, /\b(?:money|rent|housing|car|transport|food|pay|job|financial|bank)\b/) && has(s, /\b(?:unless|if i don't|threaten|take away|withhold|control|force|permission)\b/), 'economic-dependence-leverage', 'resource-dependency-power', 11);
    add(actualRestriction && has(s, /\b(?:adult|grown|older|my own|independent|childhood)\b/), 'transition-rule-rigidity', 'unspoken-rule-enforcement', 9);
    add(has(s, /\b(?:rule|allowed|not allowed|must|permission|expect)\b/) && has(s, /\b(?:won't explain|can't ask|not permitted to ask|punished for asking|don't question|no discussion|forbidden to discuss)\b/), 'forbidden-rule-discussion', 'unspoken-rule-enforcement', 9);
    add(has(s, /\b(?:ask me|tell me|say i should|must)\b/) && has(s, /\b(?:opposite|contradictory|conflicting|can't win|damned if|either way)\b/), 'contradictory-injunction', 'communication-patterns', 9);
    add(has(s, /\b(?:mother|mom|dad|father|parent|boss|manager|authority)\b/) && has(s, /\b(?:because i said so|because i'm your|i'm in charge|because they're in charge|i know best|not allowed to question)\b/), 'authority-as-proof', 'authority-and-power', 9);
    add(has(s, /\b(?:pick a side|take sides|choose between|tell (?:your|my) (?:mom|dad|parent)|go between|messenger)\b/), 'triangulated-messenger', 'triangular-conflict', 9);
    add(has(s, /\b(?:password|phone|messages|location|tracking|read my texts|privacy)\b/) && has(s, /\b(?:demand|force|without permission|without consent|secretly|snoop|monitor)\b/) && has(s,/\b(?:because (?:i|he|she|they) (?:love|care|protect)|for (?:my|your|their) (?:own )?(?:good|safety)|out of (?:love|care)|it's for your own good)\b/), 'surveillance-called-care', 'digital-privacy-power', 9);
    add(has(s, /\b(?:chores|housework|caregiving|taking care of|look after)\b/) && has(s, /\b(?:overwhelmed|can't manage|school|work|too much|unfair|expected|must)\b/), 'instrumental-parentification', 'carework-displacement', 8);
    add(has(s, /\b(?:responsible for (?:their|my (?:mom|dad|parent)'s) (?:feelings|emotions)|keep (?:my mom|my dad|them) calm|manage (?:their|her|his) emotions)\b/), 'emotional-parentification', 'carework-displacement', 9);
    // Learned childhood alarms may be re-used as unjust authority over a
    // different person. These are independent hypotheses: the input never
    // establishes that a new relationship is safe simply by being new.
    const oldAlarm=has(s,/\b(?:just like (?:my|when)|reminds me of|as a kid|when i was little|in childhood|growing up|at home growing up|always expect|expect the worst|old pattern|old fear|triggered by)\b/);
    const currentRelation=has(s,/\b(?:partner|friend|coworker|roommate|dating|boyfriend|girlfriend|husband|wife|new relationship|these days|now)\b/);
    add(oldAlarm&&currentRelation,'past-expectation-transfer','transferred-old-rules',11,{
      title:'An old alarm in a present relationship',
      observation:'A response learned in an earlier environment may be active. That does not establish whether today’s behavior is safe, unsafe, or merely different.',
      learned:'A familiar sign might predict the same rejection, punishment, or loss of freedom again.',
      protective:'I may withdraw, seek proof of loyalty, or impose an old rule before checking today’s facts.',
      check:'What has this person actually done here? What would show continuity, and what would demonstrate a meaningful difference?'
    });
    const controllingOthers=has(s,/\b(?:i (?:demand|demanded|insist|insisted|force|forced|forbid|forbade|punish|punished|test|tested|accuse|accused)|make (?:them|her|him) prove|won't let (?:them|her|him)|wouldn't let (?:them|her|him))\b/);
    const boundaryClash=has(s,/\b(?:space|quiet|silence|alone|privacy|private|boundary|independent|say no|refused|declined|choice|explain|reassure|answer)\b/);
    add(controllingOthers&&boundaryClash,'role-based-double-standards','authority-and-power',10.5,{
      title:'The rule from the other side',
      observation:'The account may describe a demand being imposed on another person. Their request for space, quiet, or independent choice is not automatically defiance.',
      learned:'I may expect others to follow the rule that once felt necessary for my safety.',
      protective:'I might require proof or an explanation instead of accepting a reasonable difference.',
      check:'If someone imposed this expectation on me, would I regard it as proportionate and respectful of my autonomy?'
    });
    add(has(s,/\b(?:loyalty test|test(?:ed|ing)? (?:their|her|his) love|prove (?:you|they) love me|prove (?:their|his|her) loyalty|keep asking (?:if|whether) (?:they|she|he) love)\b/),'punishment-for-need','learning-and-expectations',10);
    add(has(s,/\b(?:moving (?:the )?goalposts|moving targets|nothing is ever enough|never enough|change(?:s|d)? the rules|whatever i do|can't win)\b/),'intermittent-approval','learning-and-expectations',10);
    add(has(s,/\b(?:one minute (?:i'm|they're|she's|he's) (?:good|great)|next minute (?:i'm|they're|she's|he's) (?:bad|evil)|all good or all bad|from perfect to worthless|splitting|suddenly hate|suddenly worthless)\b/),'all-good-all-bad-shift','narrative-certainty',11);
    add(has(s,/\b(?:mountain out of a molehill|tiny mistake|little thing|minor (?:thing|event|detail)|small (?:thing|mistake|issue))\b/) && has(s,/\b(?:huge|disaster|terrible|threat|ruined|explod|panic|worst|catastroph|always|never)\w*\b/),'small-fact-inflated-to-threat','narrative-certainty',10);
    // Every statement goes through the same inherited-rule mechanism lens.
    // Its candidates are IDs from V10's own subroutine atlas, not imports.
    for(const candidate of window.ClearframeInterpretiveEngine.evaluate(text,subroutines,routines)){
      add(true,candidate.id,candidate.hub,candidate.score,candidate.frame);
    }
    // Broaden beyond a hand-curated handful: every source-linked subroutine
    // gets a chance when multiple distinctive concepts in its definition
    // align with the sentence. Single generic words never qualify.
    // Some interaction labels require facts that keyword overlap cannot
    // establish. Semantic neighbors may support them *only after* a concrete
    // mechanism detector has already found the required conduct.
    const evidenceGated=EVIDENCE_GATED;
    const ordinaryUrgency=has(s,/\b(?:emergency|evacuat\w*|fire alarm|medical crisis|safety hazard|immediate danger)\b/)
      && !has(s,/\b(?:punish\w*|retaliat\w*|coerc\w*|violence|violent|unfair|threaten\w*|threatened|intimidat\w*|injur\w*)\b/);
    const exactSourceMatch=(window.CLEARFRAME_EVIDENCE?.entries||[]).some(x=>normalize(x.statement)===s);
    const neutralBareStatement=!exactSourceMatch&&!/\b(?:only|unless|but|never|always|every|again|keep|keeps|kept|won't|wouldn't|can't|cannot|not|no|different|differently|upset|angry|mad|guilty|scared|afraid|worried|worry|anxious|fear|hurt|frustrated|burden|shame|ashamed|selfish|secret|privacy|private|boundary|forgotten|ignored|ignore|seems|suspect|guess|expect|doubt|lied|liar|demand|push|press|unfair|love me if|only if|only when)\b/.test(s);
    for(const candidate of ordinaryUrgency||neutralBareStatement?[]:[...semanticCandidates(s,routines,subroutines),...indicatorCandidates(s,routines,subroutines)]){
      if(evidenceGated.has(candidate.id)&&!found.some(item=>item.id===candidate.id)
        && !(candidate.source==='v10-indicator-similarity'&&candidate.score>=11.5))continue;
      add(true,candidate.id,candidate.hub,candidate.score);
    }

    // Preserve matching for user-created routines without reverting to broad
    // substring matching across hundreds of built-in signals.
    const customIds = new Set(customRoutineIds);
    for (const r of routines.filter(item => customIds.has(item.id))) {
      const exact = (r.signals || []).some(signal => {
        const phrase = normalize(signal);
        if (!phrase || phrase.length < 5) return false;
        return (` ${s} `).includes(` ${phrase} `);
      });
      if (exact) for (const id of (r.subroutineIds || []).slice(0, 3)) add(true, id, r.id, 7);
    }

    // Add an independently indexed set of exploratory suggestions for new
    // relational wording. An incidental shared term in the existing prototype
    // matcher must neither suppress these candidates nor determine the only
    // interpretation. Exact source entries keep their authored mappings.
    if(!ordinaryUrgency&&!exactSourceMatch){
      const indexed=openVocabularyCandidates(s,routines,subroutines);
      const heuristic=exploratoryCandidates(s,routines,subroutines);
      const candidates=indexed.length?indexed:heuristic;
      for(const candidate of candidates){
        add(true,candidate.id,candidate.hub,candidate.score,candidate.frame);
      }
    }

    // Deduplicate by canonical ID, keeping the more specific qualifying context.
    const scoreById = new Map();
    for (const f of found) if (!scoreById.has(f.id) || scoreById.get(f.id).score < f.score) scoreById.set(f.id, f);
    const ranked = [...scoreById.values()].sort((a,b) => b.score - a.score || a.id.localeCompare(b.id));
    const selected = [], top = [];
    for (const f of ranked) {
      if (selected.length >= 7) break;
      if (!top.includes(f.hub) && top.length >= 5) continue;
      // Weak semantic neighbors should not crowd out supported mechanisms.
      if(f.score < Math.max(5.5,ranked[0].score-4.2))continue;
      selected.push(f);
      if (!top.includes(f.hub)) top.push(f.hub);
    }
    // Keep the V4b affordance: a valid free-text account always has somewhere
    // to begin browsing. The fallback is *not* a positive finding. In
    // particular, a benign or unrelated sentence must never be described as
    // evidence of a controlling person or a psychological diagnosis.
    let matchTier=selected.length?'matched':'starter';
    if(!selected.length&&s.length>=8){
      for(const suggestion of openEndedStarters(s,routines,subroutines)){
        selected.push(suggestion);
        if(!top.includes(suggestion.hub))top.push(suggestion.hub);
      }
    }
    const reflections=selected.map(item=>{
      if(item.frame)return {id:item.id,...item.frame};
      const sub=byId.get(item.id);
      return {id:item.id,title:sub.name,observation:observable,learned:sub.learned,protective:sub.protective||'Pause and check before choosing a response.',check:sub.check};
    });
    const overview=rankedOverview(s,routines,subroutines,selected,matchTier);
    return {top, selectedSubs:selected.map(f => f.id), reflections, reflection:reflections[0]||null,matchTier,...overview};
  }

  return Object.freeze({match, normalize});
})();
