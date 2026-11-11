(() => {
  'use strict';
  const KNOWLEDGE=window.CLEARFRAME_DATA;
  // V10 uses only the source-linked Book 1 catalog and its own indicators.
  // V4b served as an interaction reference; its records are not merged.
  const EVIDENCE=window.CLEARFRAME_EVIDENCE;
  const REASONER=window.ClearframeReasoner;
  const MATCHER=window.ClearframeMatcher;
  const STORE=window.ClearframeStore;
  const app=document.getElementById('app');
  const dialog=document.getElementById('detail-dialog');
  const dialogContent=document.getElementById('dialog-content');
  const toastEl=document.getElementById('toast');
  let state=STORE.fresh(), analysis=null, draft='', editingMoment=false, activeProcessingStep='moment', reviewReading=false, processingScrollY=0, processingScrollGuardUntil=0, processingUserScrollUntil=0, firstMatchLandingGap=0, selectedRoutine='family-rules', dictionarySearch='', dictionaryFilter='all', evidenceSearch='', evidenceFilter='all', momentSearch='', importMode='merge', toastTimer, footerResizeFrame=0;
  const footerSizeCache=new WeakMap();

  const ROLE_THEMES={
    neutral:{guardian:'Guardian',sibling:'Sibling',self:'You'},
    legacy:{guardian:'MotherQ',sibling:'SisterQ',self:'You'},
    storybook:{guardian:'WickedWitch',sibling:'TinMan',self:'DorothyGale'}
  };
  const ROLE_HELP={guardian:'Caretaker, authority figure, or person holding the original power.',sibling:'Peer, witness, messenger, intermediary, or person caught between loyalties.',self:'The person whose response we are trying to understand.'};
  const roles=()=>({...ROLE_THEMES.neutral,...(state.roleTheme?.aliases||{})});
  const roleName=id=>roles()[id]||ROLE_THEMES.neutral[id]||id;
  // Role labels are presentation only. Never use them to determine an inference.
  const roleExample=value=>String(value||'').replace(/\b(mom|mother)\b/gi,roleName('guardian')).replace(/\b(sister)\b/gi,roleName('sibling'));

  // Swap Shoes is presentation-only, never a separate evidence or reasoning path.
  const swapPronouns=window.ClearframePerspective.swapPronouns;

  const uid=()=>crypto.randomUUID?.()||('cf-'+Date.now()+'-'+Math.random().toString(36).slice(2));
  const e=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const titleCase=value=>String(value??'').toLowerCase().replace(/\b[a-z]/g,x=>x.toUpperCase()).replace(/\bQ\b/g,'Q');
  const fmtDate=value=>{try{const date=/^\d{4}-\d{2}-\d{2}$/.test(String(value))?new Date(value+'T12:00:00'):new Date(value);return new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric',year:'numeric'}).format(date);}catch{return String(value||'');}};
  const nowLocalDate=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
  const normalizeText=value=>String(value??'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[’‘]/g,"'").replace(/[^a-z0-9'\s]/g,' ').replace(/\s+/g,' ').trim();
  const normalizeRoutine=(base,edits={})=>({...base,...edits,name:titleCase(edits.name||base.name),roleExamples:{
    guardian:edits.roleExamples?.guardian??edits.mother??base.roleExamples?.guardian??base.mother??'',
    sibling:edits.roleExamples?.sibling??edits.sister??base.roleExamples?.sibling??base.sister??''
  }});
  const routineList=()=>[...KNOWLEDGE.routines.map(r=>normalizeRoutine(r,state.routineEdits[r.id])),...state.customRoutines.map(r=>normalizeRoutine(r))];
  const subList=()=>KNOWLEDGE.subroutines.map(s=>({...s,...state.subroutineEdits[s.id]})).concat(state.customSubroutines).map(s=>({...s,name:titleCase(s.name)}));
  const routine=id=>routineList().find(r=>r.id===id);
  const sub=id=>subList().find(s=>s.id===id);
  const owners=id=>routineList().filter(r=>(r.subroutineIds||[]).includes(id));
  const unique=arr=>[...new Set(arr.filter(Boolean))];
  const pill=(value,kind='quiet')=>`<span class="pill ${kind}">${e(value)}</span>`;
  const label=(value)=>`<span class="mini-kicker">${e(value)}</span>`;
  const routineOptions=(chosen='')=>routineList().map(r=>`<option value="${e(r.id)}" ${chosen===r.id?'selected':''}>${e(r.name)}</option>`).join('');
  function toast(msg){clearTimeout(toastTimer);toastEl.textContent=msg;toastEl.classList.add('show');toastTimer=setTimeout(()=>toastEl.classList.remove('show'),3200);}
  async function persist(){try{await STORE.save(state);}catch(error){toast('Could not save on this device. Export a backup.');console.error(error);}}
  function sectionIntro(overline,name,desc,extra=''){return `<div class="page-title-row"><div><div class="eyebrow">${e(overline)}</div><h1>${e(name)}</h1><p class="page-lede">${e(desc)}</p></div>${extra}</div>`;}
  const motionBehavior=()=>state.preferences?.reducedMotion?'instant':'smooth';
  function applyPreferences(){
    const prefs={...STORE.defaultPreferences(),...state.preferences};
    if(prefs.colorTheme==='terminal')prefs.darkMode=true;
    state.preferences=prefs;
    document.documentElement.dataset.theme=prefs.darkMode?'dark':'light';
    document.documentElement.dataset.colorTheme=prefs.colorTheme;
    document.documentElement.dataset.textTheme=prefs.textTheme;
    document.documentElement.dataset.textSize=prefs.largeText?'large':'normal';
    document.documentElement.dataset.reducedMotion=String(prefs.reducedMotion);
    document.documentElement.dataset.matchFade=String(prefs.softMatchEdges);
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content',prefs.darkMode?'dark light':'light');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',prefs.colorTheme==='terminal'?'#010801':prefs.darkMode?'#101927':'#f7f6f2');
    try{localStorage.setItem('clearframe-ui-preferences-v1',JSON.stringify({darkMode:prefs.darkMode,colorTheme:prefs.colorTheme,textTheme:prefs.textTheme,softMatchEdges:prefs.softMatchEdges,largeText:prefs.largeText,reducedMotion:prefs.reducedMotion,autoAdvance:prefs.autoAdvance,swapShoes:prefs.swapShoes}));}catch{}
  }

  function route(){const path=(location.hash||'#home').slice(1).split('?')[0];return ['home','atlas','dictionary','evidence','source','moments','roles','preferences','data'].includes(path)?path:'home';}
  function render(){
    const page=route();
    document.querySelectorAll('[data-nav]').forEach(a=>{a.classList.toggle('active',a.dataset.nav===page);a.setAttribute('aria-current',a.dataset.nav===page?'page':'false');});
    const names={home:'Process an emotion',atlas:'Pressure-Point Atlas',dictionary:'Pattern dictionary',evidence:'Present-day signals',source:'Book 1 source map',moments:'Saved moments',roles:'Roles & themes',preferences:'Preferences',data:'Data & privacy'};
    document.getElementById('breadcrumb').textContent='Workspace / '+names[page];
    app.innerHTML=({home:renderHome,atlas:renderAtlas,dictionary:renderDictionary,evidence:renderEvidenceDictionary,source:renderSource,moments:renderMoments,roles:renderRoles,preferences:renderPreferences,data:renderData}[page])();
    if(page==='home'&&analysis&&!editingMoment){
      if(reviewReading)app.querySelector('[data-processing-step="matches"] .processing-footer')?.setAttribute('hidden','');
      else stabilizeMatchingFooter();
    }
    document.getElementById('sidebar').classList.remove('open');document.getElementById('menu-toggle').setAttribute('aria-expanded','false');
  }

  function renderHome(){
    if(analysis&&!editingMoment)return `<section class="result-section analysis-panel">${renderAnalysis()}</section>`;
    return `<section class="card home-entry" aria-labelledby="home-prompt-title">
      <h1 id="home-prompt-title">What's weighing on you?</h1>
      <div class="input-surface"><textarea id="moment-input" aria-label="Describe your current emotion or situation" placeholder="What happened? Or what thought keeps coming back? One sentence is enough…">${e(draft)}</textarea><div class="input-footer"><span class="subtle">You can start messy. There's no right way to phrase it.</span><div class="moment-input-actions">${editingMoment?'<button class="button outline" data-action="cancel-edit">Cancel</button>':''}<button class="button" data-action="analyze">Untangle this</button></div></div></div>
    </section>`;
  }

  function processingStepStart(id,title,aside=''){
    const open=activeProcessingStep===id;
    return `<section class="card processing-step ${open?'is-open':''}" data-processing-step="${e(id)}">
      <div class="processing-heading"><div class="processing-heading-row"><h3 class="processing-heading-title"><button type="button" class="processing-heading-button" data-action="open-processing-step" data-id="${e(id)}" aria-expanded="${open}" aria-controls="processing-body-${e(id)}"><span class="processing-title">${e(title)}</span></button></h3>${aside? `<div class="processing-heading-actions">${aside}</div>`:''}<button type="button" class="processing-chevron-button" data-action="open-processing-step" data-id="${e(id)}" aria-label="View ${e(title)}" aria-expanded="${open}" aria-controls="processing-body-${e(id)}"><span class="processing-chevron" aria-hidden="true">⌄</span></button></div></div>
      <div class="processing-body" id="processing-body-${e(id)}" ${open?'':'hidden'}>`;
  }
  const processingStepEnd=(footer='')=>`</div>${footer?`<div class="processing-footer">${footer}</div>`:''}</section>`;

  function openProcessingStep(id,align=false){
    const steps=[...document.querySelectorAll('[data-processing-step]')];
    const target=steps.find(step=>step.dataset.processingStep===id);
    if(!target)return;
    if(id==='matches'&&reviewReading){
      reviewReading=false;
      target.classList.remove('is-review-reading');
      target.querySelector('.processing-footer')?.removeAttribute('hidden');
      stabilizeMatchingFooter();
    }
    const heading=target.querySelector('.processing-heading');
    const priorTop=heading.getBoundingClientRect().top;
    for(const step of steps){
      const open=step===target;
      step.classList.toggle('is-open',open);
      step.querySelector('.processing-body').hidden=!open;
      step.querySelectorAll('[data-action="open-processing-step"]').forEach(button=>button.setAttribute('aria-expanded',String(open)));
    }
    activeProcessingStep=id;
    if(align)processingUserScrollUntil=0;
    processingScrollGuardUntil=Date.now()+(align?850:320);
    if(align){
      // A clicked sticky heading may be focused after the DOM collapses;
      // align on the next frame so focus scrolling cannot override the jump.
      requestAnimationFrame(()=>{
        const top=target.getBoundingClientRect().top+window.scrollY;
        window.scrollTo({top,behavior:'instant'});
        processingScrollY=window.scrollY;
      });
    }
    else{
      // Collapsing earlier content must not jerk the newly reached heading away.
      const displacement=heading.getBoundingClientRect().top-priorTop;
      if(Math.abs(displacement)>1)window.scrollBy({top:displacement,behavior:'instant'});
    }
    processingScrollY=window.scrollY;
  }
  function advanceProcessingStep(direction){
    const steps=[...document.querySelectorAll('[data-processing-step]')];
    const index=steps.findIndex(step=>step.dataset.processingStep===activeProcessingStep);
    const target=steps[index+direction];
    if(index>=0&&target)openProcessingStep(target.dataset.processingStep,true);
  }

  function newAnalysis(text){
    activeProcessingStep='matches';
    reviewReading=false;
    firstMatchLandingGap=0;
    const {reflection,reflections,matchTier,groupedMatches}=MATCHER.match(text,routineList(),subList(),state.customRoutines.map(r=>r.id));
    const firstMatch=groupedMatches.find(group=>group.matches?.length)?.matches[0];
    const allMatches=groupedMatches.flatMap(group=>group.matches);
    const highest=[...allMatches].sort((a,b)=>b.percent-a.percent||b.rank-a.rank).slice(0,3);
    const cutoff=state.preferences.autoAddPercent;
    const automaticallyIncluded=[
      ...(state.preferences.autoAddTopThree?highest:[]),
      ...allMatches.filter(item=>item.percent>cutoff)
    ];
    const selectedIds=unique(automaticallyIncluded.map(item=>item.id));
    return {id:null,text,top:unique(automaticallyIncluded.map(item=>item.hub)),selectedSubs:selectedIds,reviewAddedSubs:[],recentlyIncludedSubroutine:firstMatch?.id||null,
      reflection,reflections,matchTier,groupedMatches,evidenceMatches:{},next:'',createdAt:new Date().toISOString()};
  }
  function signalCard(item,a){
    const checked=!!a.evidenceMatches?.[item.id];
    const statement=state.preferences.swapShoes?swapPronouns(item.statement):item.statement;
    const kindLabel=item.kind==='repeats'?'Old pattern':'Different response';
    return `<button type="button" class="signal-choice observation-choice ${checked?'matched':''} ${item.kind}" data-action="toggle-evidence" data-id="${e(item.id)}" aria-pressed="${checked}" aria-label="${kindLabel}: ${e(statement)} ${checked?'Selected':'Not selected'}"><span class="signal-choice-copy"><span>${e(statement)}</span>${item.severity==='high'?'<small class="signal-warning">Potential safety or coercion concern</small>':''}</span><span class="signal-mark observation-corner-mark" aria-hidden="true">${checked?'✓':'+'}</span></button>`;
  }
  function renderObservationPairs(items,a){
    const grouped=new Map();
    for(const item of items){
      const key=REASONER.pairKey(item);
      if(!grouped.has(key))grouped.set(key,[]);
      grouped.get(key).push(item);
    }
    const pairs=[...grouped].filter(([,group])=>group.some(x=>x.kind==='repeats')&&group.some(x=>x.kind==='differs'));
    const unpaired=[...grouped].filter(([,group])=>!pairs.some(([key])=>key===REASONER.pairKey(group[0]))).flatMap(([,group])=>group);
    return `${pairs.length?`<div class="observation-pairs" role="group" aria-label="Paired present-day observations">${pairs.map(([key,group],index)=>`<div class="observation-pair-row" role="group" aria-label="Comparison ${index+1}: choose one or neither">${signalCard(group.find(x=>x.kind==='repeats'),a)}${signalCard(group.find(x=>x.kind==='differs'),a)}</div>`).join('')}</div>`:''}
      ${unpaired.length?`<div class="observation-unpaired"><h4>Additional observations</h4><p>These do not have a direct contrasting option. Mark them only if you have actually observed the behaviour.</p><div class="observation-unpaired-list">${unpaired.map(item=>signalCard(item,a)).join('')}</div></div>`:''}`;
  }
  function renderRecentObservations(a,subroutineId,included){
    // The same per-subroutine height is reserved when removed, without showing any choices.
    const item=sub(subroutineId);
    const signals=EVIDENCE.entries.filter(entry=>(entry.subroutineIds||[]).includes(subroutineId));
    const pairedCount=new Set(signals.filter(entry=>entry.kind==='repeats').map(entry=>REASONER.pairKey(entry))).size;
    const layoutClass=pairedCount>1?' has-multiple-pairs':'';
    // Keep the choices in the layout when removed, but invisible and inert, so their
    // measured height (and the blue reserved area) is identical in both states.
    return `<div class="recent-evidence-slot ${included?'is-visible':'is-hidden'}${layoutClass}" ${included?`role="region" aria-label="Present-day observations for ${e(item?.name||'this subroutine')}"`:'aria-hidden="true" inert'}>
      <div class="recent-evidence-scroll" role="group" aria-label="Observations for ${e(item?.name||'this subroutine')}">${signals.length?renderObservationPairs(signals,a):'<p class="recent-evidence-empty">No built-in observation signs are linked to this subroutine yet.</p>'}</div>
    </div>`;
  }
  function matchGroupsForDisplay(a){
    const fresh=Array.isArray(a.groupedMatches)?a:MATCHER.match(a.text,routineList(),subList(),state.customRoutines.map(r=>r.id));
    const minimum=state.preferences.minDisplayPercent;
    const selected=new Set(a.selectedSubs||[]);
    const groups=(fresh.groupedMatches||[]).map(group=>({...group,
      matches:group.matches.filter(item=>item.percent>=minimum||selected.has(item.id))
    })).filter(group=>group.matches.length);
    const alreadyShown=new Set(groups.flatMap(group=>group.matches.map(match=>match.id)));
    for(const id of selected){
      if(alreadyShown.has(id)||!sub(id))continue;
      const linked=owners(id);
      const owner=linked.find(r=>groups.some(group=>group.id===r.id))||linked[0];
      if(!owner)continue;
      let group=groups.find(group=>group.id===owner.id);
      if(!group){group={id:owner.id,matches:[]};groups.push(group);}
      group.matches.push({id,percent:0,manual:true});
      alreadyShown.add(id);
    }
    return groups;
  }
  function renderMatchOverview(a){
    const groups=matchGroupsForDisplay(a);
    const groupRows=groups.map(group=>{
      const r=routine(group.id);
      return `<details class="disclosure" data-match-group="${e(group.id)}" style="margin-bottom:9px" open>
        <summary><strong>${e(r?.name||group.id)}</strong></summary>
        <div class="compact-stack" style="margin-top:12px">${group.matches.map(entry=>{
          const item=sub(entry.id);if(!item)return '';
          const included=a.selectedSubs.includes(entry.id);
          return `<div class="hypothesis-row ${a.recentlyIncludedSubroutine===entry.id?'is-recent-match':''}" data-match-sub="${e(entry.id)}" style="padding:11px 14px">
            <div class="matching-subroutine-bar">
              <strong class="matching-subroutine-name">${e(item.name)}</strong>
              <div class="matching-subroutine-meta">
                ${included?`<button class="button small outline subroutine-action remove-sub-button" data-action="remove-sub" data-id="${e(entry.id)}" aria-label="Remove ${e(item.name)} from comparison">− Remove</button>`:`<button class="button small outline subroutine-action" data-action="add-sub" data-id="${e(entry.id)}" aria-label="Add ${e(item.name)} to comparison">+ Add</button>`}
                ${included&&(a.reviewAddedSubs||[]).includes(entry.id)?pill('Added by you','quiet'):entry.manual?pill(included?'Added by you':'Available to add','quiet'):pill(`${entry.percent}% match`,entry.percent>=45?'green':'quiet')}
              </div>
            </div>
          </div>`;
        }).join('')}</div></details>`;
    }).join('');
    return `<div style="margin-bottom:15px">${groups.length?groupRows:'<div class="empty-state">No subroutines matched at 1% or higher. Try describing another detail of the situation.</div>'}</div>`;
  }
  function renderRecentIncludedSubroutine(a){
    const order=unique(matchGroupsForDisplay(a).flatMap(group=>group.matches.map(match=>match.id)));
    const recentId=order.includes(a.recentlyIncludedSubroutine)?a.recentlyIncludedSubroutine:order.find(id=>a.selectedSubs.includes(id))||order[0];
    const index=order.indexOf(recentId);
    const item=sub(recentId);
    const included=!!item&&a.selectedSubs.includes(recentId);
    return `<div class="recent-included-wrap" aria-live="polite" aria-atomic="true"><div class="recent-included-box">
      <div class="recent-included-content">
        <div class="recent-included-heading">
          <div class="recent-included-name">
            ${item?`<button type="button" class="recent-subroutine-status ${included?'is-added':'is-removed'}" data-action="${included?'remove-sub':'add-sub'}" data-id="${e(recentId)}" aria-pressed="${included}" aria-label="${included?'Remove':'Add'} ${e(item.name)} ${included?'from':'to'} comparison" title="${included?'Included — click to remove':'Not included — click to add'}"><span aria-hidden="true">${included?'✓':'×'}</span></button>`:''}
            <strong>${e(item?.name||'No matching subroutine')}</strong>
          </div>
        </div>
        <div class="recent-included-fields">
          <div class="recent-included-field"><span>Expectation Trigger:</span><p>${e(item?.learned||'Not described yet.')}</p></div>
          <div class="recent-included-field"><span>Protective Response:</span><p>${e(item?.protective||'Not described yet.')}</p></div>
        </div>
      </div>
      <div class="recent-included-controls" role="group" aria-label="Browse matching subroutines">
          <button type="button" class="recent-nav-button" data-action="browse-recent" data-direction="-1" aria-label="Previous matching subroutine" title="Previous subroutine" ${index<=0?'disabled':''}><span class="recent-nav-glyph" aria-hidden="true">‹</span></button>
          <span class="recent-nav-position" aria-label="Subroutine ${Math.max(index+1,0)} of ${order.length}">${Math.max(index+1,0)} / ${order.length}</span>
          <button type="button" class="recent-nav-button" data-action="browse-recent" data-direction="1" aria-label="${index===order.length-1?'Open learned expectations review':'Next matching subroutine'}" title="${index===order.length-1?'Open learned expectations review':'Next subroutine'}" ${index<0?'disabled':''}><span class="recent-nav-glyph" aria-hidden="true">›</span></button>
      </div>
    </div>${renderRecentObservations(a,recentId,included)}</div>`;
  }
  function stabilizeMatchingFooter(){
    const footer=app.querySelector('[data-processing-step="matches"] .processing-footer');
    const wrap=footer?.querySelector('.recent-included-wrap');
    if(!wrap||!analysis)return;
    const order=unique(matchGroupsForDisplay(analysis).flatMap(group=>group.matches.map(match=>match.id)));
    if(!order.length)return;

    // Measure every browsable entry at the actual footer width, including its
    // natural text height, before stretching the red/green cards into the blue
    // slot. Reuse the largest measurements on subsequent renders of this same
    // comparison so a selection or re-render cannot make the controls jump.
    const width=wrap.getBoundingClientRect().width;
    const probe=document.createElement('div');
    probe.className='footer-measure-probe';
    probe.setAttribute('aria-hidden','true');
    probe.inert=true;
    probe.style.cssText=`position:absolute;left:0;top:0;width:${width}px;visibility:hidden;pointer-events:none;--recent-detail-height:auto;--recent-evidence-height:auto`;
    probe.innerHTML=order.map(id=>renderRecentIncludedSubroutine({...analysis,recentlyIncludedSubroutine:id})).join('');
    footer.append(probe);
    const tallest=selector=>Math.ceil(Math.max(0,...[...probe.querySelectorAll(selector)].map(el=>el.getBoundingClientRect().height)));
    const prior=footerSizeCache.get(analysis);
    const sameWidth=prior&&Math.abs(prior.width-width)<8;
    const details=Math.max(tallest('.recent-included-box'),sameWidth?prior.details:0);
    const evidence=Math.max(tallest('.recent-evidence-slot'),sameWidth?prior.evidence:0);
    probe.remove();
    footerSizeCache.set(analysis,{width,details,evidence});
    if(details)footer.style.setProperty('--recent-detail-height',`${details}px`);
    if(evidence)footer.style.setProperty('--recent-evidence-height',`${evidence}px`);
  }
  function scrollMatchingRowAboveFooter(row,footer,behavior=motionBehavior()){
    processingScrollGuardUntil=Date.now()+1400;
    requestAnimationFrame(()=>{
      const footerTop=window.innerHeight-footer.getBoundingClientRect().height;
      const delta=row.getBoundingClientRect().bottom-(footerTop-16);
      window.scrollTo({top:Math.max(0,window.scrollY+delta),behavior});
      processingScrollY=window.scrollY;
    });
  }
  function landFirstMatchingRow(){
    const step=document.querySelector('[data-processing-step="matches"]');
    const footer=step?.querySelector('.processing-footer');
    const row=step?.querySelector('[data-match-sub]');
    const spacer=step?.querySelector('.first-match-landing-spacer');
    if(!row||!footer||!spacer)return;
    // The first row starts too near the top to scroll down into the footer's
    // sightline. Give the list just enough lead-in space to land that row there.
    spacer.style.height='0px';
    const footerTop=window.innerHeight-footer.getBoundingClientRect().height;
    firstMatchLandingGap=Math.max(0,Math.ceil(footerTop-16-row.getBoundingClientRect().bottom));
    spacer.style.height=`${firstMatchLandingGap}px`;
    scrollMatchingRowAboveFooter(row,footer,'instant');
  }
  function browseRecentSubroutine(direction){
    if(!analysis||![-1,1].includes(direction))return;
    const step=document.querySelector('[data-processing-step="matches"]');
    const footer=step?.querySelector('.processing-footer');
    const rows=[...(step?.querySelectorAll('[data-match-sub]')||[])];
    const current=rows.findIndex(row=>row.dataset.matchSub===analysis.recentlyIncludedSubroutine);
    if(direction===1&&rows.length&&current===rows.length-1){
      showLearnedReview(step,footer);
      return;
    }
    const next=Math.max(0,Math.min(rows.length-1,(current<0?(direction>0?-1:rows.length):current)+direction));
    const row=rows[next];
    if(!row||!footer)return;
    row.closest('[data-match-group]')?.setAttribute('open','');
    analysis.recentlyIncludedSubroutine=row.dataset.matchSub;
    rows.forEach(candidate=>candidate.classList.toggle('is-recent-match',candidate===row));
    footer.innerHTML=renderRecentIncludedSubroutine(analysis);
    const focusAction=footer.querySelector(`[data-action="browse-recent"][data-direction="${direction}"]:not([disabled])`)||footer.querySelector(`[data-action="browse-recent"]:not([disabled])`);
    focusAction?.focus({preventScroll:true});
    // Keep the browsed row just above the footer's feathered upper edge.
    scrollMatchingRowAboveFooter(row,footer);
  }
  function showLearnedReview(step,footer){
    const review=step?.querySelector('[data-learned-review]');
    if(!review||!footer)return;
    reviewReading=true;
    review.open=true;
    step.classList.add('is-review-reading');
    processingScrollGuardUntil=Date.now()+1800;
    processingUserScrollUntil=0;
    review.querySelector('summary')?.focus({preventScroll:true});
    if(state.preferences.reducedMotion)footer.hidden=true;
    else{
      const onExit=event=>{
        if(event.target!==footer||event.animationName!=='hideMatchingFooter')return;
        footer.hidden=true;
        footer.removeEventListener('animationend',onExit);
      };
      footer.addEventListener('animationend',onExit);
    }
    requestAnimationFrame(()=>{
      // The matching-section heading stays sticky above the review title.
      const headingHeight=step.querySelector('.processing-heading')?.getBoundingClientRect().height||72;
      const top=review.getBoundingClientRect().top+window.scrollY-headingHeight-12;
      window.scrollTo({top:Math.max(0,top),behavior:motionBehavior()});
      processingScrollY=window.scrollY;
    });
  }
  function changeIncludedSubroutine(id,include,fromReview=false){
    if(!analysis||analysis.selectedSubs.includes(id)===include)return;
    const scrollPosition=window.scrollY;
    const openMatchGroups=[...document.querySelectorAll('[data-match-group][open]')].map(group=>group.dataset.matchGroup);
    if(include){
      analysis.selectedSubs.push(id);
      if(fromReview)analysis.reviewAddedSubs=unique([...(analysis.reviewAddedSubs||[]),id]);
      const hub=analysis.groupedMatches?.find(group=>group.matches.some(item=>item.id===id))?.id||owners(id)[0]?.id;
      if(hub&&!analysis.top.includes(hub))analysis.top.push(hub);
    }else{
      analysis.selectedSubs=analysis.selectedSubs.filter(selectedId=>selectedId!==id);
      analysis.reviewAddedSubs=(analysis.reviewAddedSubs||[]).filter(addedId=>addedId!==id);
    }
    // Picking an option from the expanded review returns to its match and
    // brings back the normal sticky navigation footer.
    if(include&&fromReview)reviewReading=false;
    analysis.recentlyIncludedSubroutine=id;
    analysis.reflection=null;
    analysis.reflections=[];
    render();
    document.querySelectorAll('[data-match-group]').forEach(group=>{group.open=openMatchGroups.includes(group.dataset.matchGroup);});
    const newlyIncludedRow=fromReview&&include?[...document.querySelectorAll('[data-match-sub]')].find(row=>row.dataset.matchSub===id):null;
    if(newlyIncludedRow){
      newlyIncludedRow.closest('[data-match-group]').open=true;
      newlyIncludedRow.scrollIntoView({behavior:'instant',block:'center'});
    }else window.scrollTo({top:scrollPosition,behavior:'instant'});
  }
  function renderComparisonFollowup(item){
    const signals=[];
    if(item.support.length)signals.push(`${item.support.length} matching concern signal(s).`);
    if(item.counter.length)signals.push(`${item.counter.length} contrasting signal(s).`);
    const hasUpdatedRule=item.verdict==='challenged';
    if(!signals.length&&!hasUpdatedRule)return '';
    return `<span class="comparison-detail-label-space" aria-hidden="true"></span><div class="comparison-detail-followup">${signals.length?`<p class="test-hint">${signals.join(' ')}</p>`:''}${hasUpdatedRule?`<p class="subtle"${signals.length?' style="margin-top:7px"':''}>Possible updated rule: ${e(item.grounded)}</p>`:''}</div>`;
  }
  function renderComparisonEvidence(item,matched){
    const linked=matched.filter(entry=>(entry.subroutineIds||[]).includes(item.id));
    if(!linked.length)return '';
    return `<div class="comparison-evidence-trail"><div class="mini-kicker">WHY THE RESULT CHANGED</div>${linked.map(entry=>`<div class="trail-row"><span class="pill ${entry.kind==='repeats'?'rose':'green'}">${entry.kind==='repeats'?'Resembles old pattern':'Differs from old pattern'}</span><span>${e(entry.statement)}</span></div>`).join('')}</div>`;
  }
  function renderAnalysis(){
    const a=analysis, subs=(a.selectedSubs||[]).map(sub).filter(Boolean);
    const result=REASONER.evaluate(a,subList(),EVIDENCE.entries);
    const others=unique(a.top.flatMap(id=>routine(id)?.subroutineIds||[])).filter(id=>!a.selectedSubs.includes(id));
    const disposition={untested:'Awaiting observation',supported:'Current behaviour resembles the old pattern',challenged:'Present behaviour challenges the old prediction',mixed:'Conflicting evidence'};
    return `<div class="processing-accordion">
      ${processingStepStart('moment','1 · The moment',`<button type="button" class="edit-moment-button" data-action="edit-moment" aria-label="Edit this moment" title="Edit this moment"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z"/></svg></button>`)}
      <div class="quote-block">“${e(a.text)}”</div>${processingStepEnd()}
      ${processingStepStart('matches','2 · Matching subroutines')}
        <div class="first-match-landing-spacer" style="height:${firstMatchLandingGap}px" aria-hidden="true"></div>
        ${renderMatchOverview(a)}
        <details class="disclosure learned-expectations-review" data-learned-review style="margin-top:15px" ${reviewReading?'open':''}><summary>Review possible learned expectations and protective responses (${subs.length})</summary><div class="compact-stack" style="margin-top:12px">${subs.map(s=>`<label class="assumption-row"><input type="checkbox" data-assumption="${e(s.id)}" checked><span><strong>${e(s.name)}</strong><small class="review-detail-grid"><b>Expectation Trigger:</b><span class="review-detail-value">${e(s.learned)}</span><b>Protective Response:</b><span class="review-detail-value">${e(s.protective||'Not described yet.')}</span></small></span></label>`).join('')}</div>${others.length?`<div class="tag-cloud" style="margin-top:11px">${others.map(id=>`<button class="pill interactive" data-action="add-sub" data-from-review="true" data-id="${e(id)}">+ ${e(sub(id)?.name||id)}</button>`).join('')}</div>`:''}</details>${processingStepEnd(renderRecentIncludedSubroutine(a))}
      ${processingStepStart('comparison','3 · What does the comparison actually show?')}
        <div class="reason-stats"><div class="reason-stat-similar"><strong>${result.counts.similar}</strong><span>Observed similarities</span></div><div class="reason-stat-different"><strong>${result.counts.different}</strong><span>Observed differences</span></div><div class="reason-stat-untested"><strong>${result.counts.untested}</strong><span>Awaiting observation</span></div></div>
        <div class="result-synthesis" style="margin-top:17px"><div class="mini-kicker">EVIDENCE-BASED SYNTHESIS</div><p>${e(result.conclusion)}</p></div>
        ${!result.matched.length?`<div class="callout-quiet" style="margin-top:15px"><strong>No behavioural evidence was selected.</strong> Clearframe cannot justify a reassuring conclusion or a concerning one from the sentence alone.</div>`:''}
        <details class="disclosure" style="margin-top:17px" open><summary>Compare each possible learned expectation with selected observations (${result.bySub.length})</summary><div class="compact-stack" style="margin-top:12px">${result.bySub.map(item=>`<div class="hypothesis-row"><div class="summary-bar comparison-card-summary"><strong>${e(item.title)}</strong>${pill(disposition[item.verdict],item.verdict==='supported'?'rose':item.verdict==='challenged'?'green':item.verdict==='mixed'?'gold':'quiet')}</div>${renderComparisonEvidence(item,result.matched)}<div class="comparison-detail-grid subtle" style="margin-top:8px"><strong>Expectation Trigger:</strong><span class="comparison-detail-value">${e(item.learned)}</span><strong>Protective Response:</strong><span class="comparison-detail-value">${e(item.protective||'Not described yet.')}</span>${renderComparisonFollowup(item)}</div></div>`).join('')}</div></details>
      ${processingStepEnd()}
      ${processingStepStart('save','Keep this comparison?')}
      <div class="result-next"><div class="mini-kicker">PROPORTIONATE NEXT STEP</div><p>${e(result.action)}</p></div>
      <div class="warning-box" style="margin-top:13px"><strong>Limits:</strong> The engine compares indicators you recognize; it cannot independently verify facts or intentions. A high-risk behaviour is never cancelled by a kind gesture somewhere else.</div>
      <div class="processing-save-form"><div class="form-field"><label for="analysis-next">My own next step (optional note)</label><input id="analysis-next" value="${e(a.next)}" placeholder="My choice—not part of the calculation"></div><div class="form-actions"><button class="button" data-action="save-moment">${a.id?'Update saved moment':'Save this comparison'}</button><button class="button ghost" data-action="clear-analysis">Start fresh</button></div></div>${processingStepEnd()}
      </div>`;
  }

  function atlasSvg(){
    const list=routineList(), count=list.length, center={x:380,y:292}, radiusX=275, radiusY=215;
    const positions=list.map((r,i)=>({r,x:center.x+Math.sin(2*Math.PI*i/count)*radiusX,y:center.y-Math.cos(2*Math.PI*i/count)*radiusY}));
    const truncate=name=>name.replace(' / ',' / ').split(' ');
    const lines=positions.map(({r,x,y})=>`<line class="atlas-line ${selectedRoutine===r.id?'highlight':''}" x1="${center.x}" y1="${center.y}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`).join('');
    const nodes=positions.map(({r,x,y})=>{
      const words=truncate(r.short||r.name);let upper='',lower='';
      if(words.length===1)upper=words[0];
      else {const at=Math.ceil(words.length/2);upper=words.slice(0,at).join(' ');lower=words.slice(at).join(' ');}
      const selected=r.id===selectedRoutine;
      return `<g class="atlas-node ${selected?'selected':''}" role="button" tabindex="0" aria-label="View ${e(r.name)}" data-action="select-routine" data-id="${e(r.id)}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="49"/><text x="${x.toFixed(1)}" y="${lower?(y-4).toFixed(1):(y+4).toFixed(1)}" text-anchor="middle"><tspan>${e(upper)}</tspan>${lower?`<tspan x="${x.toFixed(1)}" dy="15">${e(lower)}</tspan>`:''}</text></g>`;
    }).join('');
    return `<svg class="atlas-svg" viewBox="0 0 760 584" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interactive hub-and-spoke map of relational control routines"><circle cx="380" cy="292" r="198" fill="none" stroke="#dce0ed" stroke-width="1" stroke-dasharray="4 6"/>${lines}<circle class="atlas-core" cx="380" cy="292" r="77"/><text class="atlas-core-text" x="380" y="285" text-anchor="middle">Pressure-Point</text><text class="atlas-core-text" x="380" y="305" text-anchor="middle">Atlas</text><text class="atlas-core-sub" x="380" y="325" text-anchor="middle">${count} connected routines</text>${nodes}</svg>`;
  }
  function renderInspector(){
    const r=routine(selectedRoutine)||routineList()[0];if(!r)return '';
    const children=(r.subroutineIds||[]).map(sub).filter(Boolean);
    // A shared subroutine must show its indicators under EVERY linked routine.
    const signals=EVIDENCE.entries.filter(x=>x.subroutineIds.some(id=>(r.subroutineIds||[]).includes(id)));
    return `<div class="atlas-inspector"><div class="inspector-head"><div><div class="mini-kicker">FIELD 1 · CONTROL ROUTINE · ${e(r.domain||'Personal')}</div><h2>${e(r.name)}</h2><p>${e(r.summary)}</p></div><button class="button small outline" data-action="edit-routine" data-id="${e(r.id)}">✎ Edit routine</button></div>
      ${r.terminology?`<div class="info-block" style="margin:14px 0 18px"><div class="mini-kicker">CLINICAL TERMINOLOGY · ${r.terminology.fit==='established'?'ESTABLISHED CONSTRUCT':'DESCRIPTIVE COMPOSITE'}</div><p><strong>${e(r.terminology.framework)}</strong> · ${e(r.terminology.scopeNote)}</p><p class="subtle" style="margin-top:7px">Previous Clearframe label: ${e(r.terminology.previousLabel)}. The control routine is an educational category, not a diagnosis or a validated measure.</p></div>`:''}
      <div class="inspector-body"><div>${label('Why it may have been protective then')}<p>${e(r.then||'An earlier response may have protected you in a different environment.')}</p></div><div>${label('What to examine now')}<p>${e(r.now||'Consider what the present evidence supports.')}</p></div></div>
      <div class="mini-kicker">ROLE-BASED FICTIONAL EXAMPLES · NOT PERSONAL RECORDS</div><div class="example-lines"><div class="example-line"><strong>${e(roleName('guardian'))} <small class="role-key">Guardian role</small></strong> ${e(roleExample(r.roleExamples?.guardian||'No example yet.'))}</div><div class="example-line"><strong>${e(roleName('sibling'))} <small class="role-key">Sibling role</small></strong> ${e(roleExample(r.roleExamples?.sibling||'No example yet.'))}</div></div><p class="test-hint" style="margin:10px 0 22px">Changing the cast names never changes a routine, a subroutine, or the comparison logic. <a class="linkish" href="#roles">Edit role names</a>.</p>
      <div class="section-header"><div><div class="mini-kicker">FIELDS 2–5 · SHARED RECORDS</div><h3>Connected subroutines (${children.length})</h3></div><button class="button small light" data-action="add-sub-dialog" data-routine="${e(r.id)}">+ Add a subroutine</button></div>
      <div class="thread-list">${children.map((s,i)=>{const related=signals.filter(x=>x.subroutineIds.includes(s.id));return `<details class="thread-card" ${i===0?'open':''}><summary><strong>${e(s.name)}</strong><span>${related.length} linked reality signals</span></summary><div class="thread-grid"><div class="thread-field"><small>1 · Control Routine</small><p>${e(r.name)}</p></div><div class="thread-field"><small>2 · Subroutine</small><p>${e(s.meaning)}</p></div><div class="thread-field"><small>3 · Learned Expectation</small><p>${e(s.learned||'Not yet described.')}</p></div><div class="thread-field"><small>4 · Protective Response</small><p>${e(s.protective||'Not yet described.')}</p></div></div><div class="thread-signals"><small>5 · Present-Day Reality Indicators</small>${related.length?`<div class="signal-columns"><div class="signal-column risk"><div class="signal-column-head"><span class="signal-key rose-key"></span><h4>Possible continuity</h4></div>${related.filter(x=>x.kind==='repeats').map(x=>`<p class="thread-indicator">${e(x.statement)}</p>`).join('')||'<p class="subtle">No linked indicators.</p>'}</div><div class="signal-column repair"><div class="signal-column-head"><span class="signal-key green-key"></span><h4>Possible difference</h4></div>${related.filter(x=>x.kind==='differs').map(x=>`<p class="thread-indicator">${e(x.statement)}</p>`).join('')||'<p class="subtle">No linked indicators.</p>'}</div></div>`:'<p class="subtle">No built-in reality indicators are linked to this subroutine yet.</p>'}</div><div class="thread-foot"><button class="button small outline" data-action="show-sub" data-id="${e(s.id)}">View / edit this shared definition</button></div></details>`;}).join('')||'<div class="empty-state">No subroutines linked yet. Add one above to build this branch.</div>'}</div>
      <div class="form-actions"><button class="button small" data-action="try-routine" data-id="${e(r.id)}">Use this routine in a comparison</button></div></div>`;
  }
  function renderAtlas(){
    const all=routineList(),browse=`<div class="dot-grid">${all.map(r=>`<button class="routine-tile ${selectedRoutine===r.id?'chosen':''}" data-action="select-routine" data-id="${e(r.id)}"><span class="mini-kicker">${e(r.domain||'Personal')}</span><strong>${e(r.name)}</strong><small>${(r.subroutineIds||[]).length} connected subroutines</small></button>`).join('')}</div>`;
    return `${sectionIntro('THE FIVE-FIELD KNOWLEDGE LAYER','Pressure-Point Atlas',`${all.length} connected routine categories, derived from distinguishable source mechanisms—not a predetermined limit. Each shared subroutine has learned expectations, protective responses and paired observable comparisons.`,`<button class="button outline" data-action="add-routine">+ New control routine</button>`)}
      ${all.length<=14?`<div class="atlas-stage">${atlasSvg()}</div>`:''}<p class="test-hint" style="margin:12px 0 20px">${all.length>14?'Choose a category below to inspect its five-field paths.':'Tap a node to inspect it.'} A subroutine can be shared by multiple categories without duplication.</p>
      ${all.length>14?browse:''}${renderInspector()}
      ${all.length<=14?`<div class="section-header"><h3>Browse all routines</h3><span class="counter">${all.length} total</span></div>${browse}`:''}`;
  }
  function renderSource(){
    const source=window.CLEARFRAME_V10_SOURCE_INDEX;
    if(!source)return sectionIntro('SOURCE MAP','Book 1 review','The chapter map did not load. Check the offline assets.');
    const groups=source.coverage.map(c=>{
      const observations=source.observations.filter(o=>String(o.chapter)===String(c.chapter));
      const patterns=observations.filter(o=>o.mappedSubroutineIds.length);
      const other=observations.filter(o=>!o.mappedSubroutineIds.length);
      const cite=c.chapter==='Introduction'?'Introduction':`Chapter ${c.chapter}`;
      return `<details class="source-chapter"><summary><span><strong>${e(cite)}</strong><small>${e(c.editorialFocus)}</small></span><span class="counter">pp. ${c.printedPages[0]}–${c.printedPages[1]} · ${patterns.length} patterns · ${other.length} other notes</span></summary><div class="source-chapter-body"><p class="test-hint">${e(c.disposition)}</p><h3>Mapped relational mechanisms (${patterns.length})</h3><div class="source-observations">${patterns.map(o=>`<div class="source-observation"><strong>${e(sub(o.mappedSubroutineIds[0])?.name||o.mappedSubroutineIds[0])}</strong><small>Printed pp. ${o.printedPages[0]}–${o.printedPages[1]} · ${e(o.decision)}</small><p>${e(o.summary)}</p></div>`).join('')}</div><h3>Other textbook material accounted for (${other.length})</h3><div class="source-observations">${other.map(o=>`<div class="source-observation"><strong>${e(o.type)} · ${e(o.decision)}</strong><small>Printed pp. ${o.printedPages[0]}–${o.printedPages[1]}</small><p>${e(o.summary)}</p><p class="subtle">Why: ${e(o.rationale)}</p></div>`).join('')}</div></div></details>`;
    }).join('');
    return `${sectionIntro('BOOK 1 · SOURCE AUDIT','Chapter-by-chapter source map','An original conceptual adaptation of Nichols and Davis, 12th ed., Introduction and all 15 chapters. Each chapter distinguishes observable relational mechanisms from therapy techniques, historical hypotheses, research and cautions.')}
      <div class="card soft"><div class="mini-kicker">READ THIS BEFORE AUDITING</div><p>This is not a verbatim reproduction of the book or a clinical transcription of every sentence. The linked patterns are Clearframe editorial examples based on cited concepts; the source map shows the decisions, including material deliberately not converted into routines.</p><p style="margin-top:10px" class="subtle">${e(source.method.preciseLimit)} The entries have not received Jul’s content audit or independent clinical validation.</p><div class="metric-row" style="grid-template-columns:repeat(3,1fr);margin-top:14px"><div><strong>${source.coverage.length}</strong><small>Sections mapped</small></div><div><strong>${source.observations.length}</strong><small>Source observations</small></div><div><strong>${subList().length}</strong><small>Connected subroutines</small></div></div></div>
      <div class="source-chapters">${groups}</div><p class="footnote">Reference: Michael P. Nichols and Sean D. Davis, <em>Family Therapy: Concepts and Methods</em>, 12th ed. Printed page numbers appear above. Source prose, figures and case material are not reproduced. These statements are educational reflections, not validated diagnostic tests.</p>`;
  }
  function renderDictionary(){
    const data=subList().filter(s=>(dictionaryFilter==='all'||owners(s.id).some(r=>r.id===dictionaryFilter))&&(!dictionarySearch||[s.name,s.meaning,s.learned,s.protective,s.check].join(' ').toLowerCase().includes(dictionarySearch.toLowerCase())));
    return `${sectionIntro('REUSABLE KNOWLEDGE, NOT DUPLICATED NOTES','Pattern dictionary','Each subroutine is defined once and linked to every control routine that uses it.',`<button class="button" data-action="add-sub-dialog">+ New subroutine</button>`)}
      <div class="search-row"><input id="dictionary-search" type="search" placeholder="Find a pattern, thought, or meaning…" value="${e(dictionarySearch)}" aria-label="Search dictionary"><select id="dictionary-filter" aria-label="Filter by control routine"><option value="all">All control routines</option>${routineOptions(dictionaryFilter)}</select><span class="counter">${data.length} shown · ${subList().length} total</span></div>
      <div class="dictionary-list">${data.length?data.map(s=>`<button class="dictionary-item" data-action="show-sub" data-id="${e(s.id)}"><strong>${e(s.name)} ↗</strong><p>${e(s.meaning)}</p><p class="subtle" style="margin-top:8px"><strong>Learned:</strong> ${e(s.learned||'Not yet described.')}</p><p class="subtle" style="margin-top:5px"><strong>Protective response:</strong> ${e(s.protective||'Not yet described.')}</p><div class="mini-links">Linked to: ${e(owners(s.id).map(r=>r.name).join(' · ')||'No routines yet')}</div></button>`).join(''):`<div class="empty-state">No subroutines match that search.</div>`}</div><p class="footnote">The dictionary offers possibilities to test, not facts about any individual. You can edit a definition or its links without creating duplicate records.</p>`;
  }

  function renderEvidenceDictionary(){
    const entries=EVIDENCE.entries.filter(item=>(evidenceFilter==='all'||item.routineIds.includes(evidenceFilter)||item.subroutineIds.some(id=>(routine(evidenceFilter)?.subroutineIds||[]).includes(id)))&&(!evidenceSearch||[item.statement,...item.subroutineIds.map(id=>sub(id)?.name||'')].join(' ').toLowerCase().includes(evidenceSearch.toLowerCase())));
    return `${sectionIntro('A SECOND, STATIC DICTIONARY','Present-day signals','Observable examples to compare against your actual relationships. The entries are not your history and do not require you to record anything.')}
    <div class="info-block" style="margin-bottom:18px"><strong>How to use this dictionary</strong><p>Look for anything that matches your reality. One side illustrates behaviour resembling the old controlling environment; the other illustrates behaviour that challenges that learned expectation. Both can be true of the same person. Nothing is assumed unless you recognize it yourself.</p></div>
    <div class="search-row"><input type="search" id="evidence-search" placeholder="Search observable behaviours…" value="${e(evidenceSearch)}" aria-label="Search present-day signals"><select id="evidence-filter" aria-label="Filter signals by routine"><option value="all">All control routines</option>${routineOptions(evidenceFilter)}</select><span class="counter">${entries.length} of ${EVIDENCE.entries.length} signals</span></div>
    <div class="signal-columns catalog-columns"><div class="signal-column risk"><div class="signal-column-head"><span class="signal-key rose-key"></span><h3>Signs of continuity</h3></div><p class="subtle">Observations that might mean the old pattern is still operating.</p>${entries.filter(x=>x.kind==='repeats').map(item=>`<div class="signal-static catalog-card">${pill(routine(item.routineIds[0])?.name||'Pattern','rose')}<p>${e(item.statement)}</p><small>Related subroutines: ${e(item.subroutineIds.map(id=>sub(id)?.name).filter(Boolean).join(' · '))}</small></div>`).join('')||'<p class="subtle">No matches.</p>'}</div><div class="signal-column repair"><div class="signal-column-head"><span class="signal-key green-key"></span><h3>Signs of difference</h3></div><p class="subtle">Observations that might challenge the old prediction.</p>${entries.filter(x=>x.kind==='differs').map(item=>`<div class="signal-static catalog-card">${pill(routine(item.routineIds[0])?.name||'Pattern','green')}<p>${e(item.statement)}</p><small>Related subroutines: ${e(item.subroutineIds.map(id=>sub(id)?.name).filter(Boolean).join(' · '))}</small></div>`).join('')||'<p class="subtle">No matches.</p>'}</div></div><p class="footnote">These are non-diagnostic examples for reflection. A single observation cannot establish a person's motives or the overall safety of a relationship.</p>`;
  }

  function renderMoments(){
    const search=momentSearch.trim().toLowerCase();
    const rows=[...state.moments].filter(m=>!search||[m.text,m.selectedSubs?.map(id=>sub(id)?.name).join(' ')].join(' ').toLowerCase().includes(search)).sort((a,b)=>new Date(b.updatedAt||b.createdAt)-new Date(a.updatedAt||a.createdAt));
    return `${sectionIntro('YOUR OWN INFORMATION, KEPT SEPARATE','Saved moments','Only the reflections you choose to keep appear here. Reopen one to revise its assumptions, evidence, and next step.',`<a href="#home" class="button">+ Process an emotion</a>`)}
      <div class="search-row"><input id="moment-search" type="search" placeholder="Search saved moments…" value="${e(momentSearch)}" aria-label="Search moments"><span class="counter">${rows.length} saved</span></div>
      <div class="record-list">${rows.length?rows.map(m=>{const outcome=REASONER.evaluate(m,subList(),EVIDENCE.entries);const outcomeLabel=outcome.urgent?'Safety concern noted':{undetermined:'No evidence selected',different:'Old expectation challenged',concerning:'Current concern',mixed:'Mixed evidence'}[outcome.status];const outcomeColor=outcome.urgent?'rose':{undetermined:'quiet',different:'green',concerning:'rose',mixed:'gold'}[outcome.status];return `<article class="record-row"><div class="record-top"><strong>${e((m.text||'Untitled moment').slice(0,110))}${(m.text||'').length>110?'…':''}</strong>${pill(fmtDate(m.createdAt),'quiet')}</div><div class="tag-list">${pill(outcomeLabel,outcomeColor)}${(m.top||[]).map(id=>routine(id)).filter(Boolean).map(r=>pill(r.name,'green')).join('')}</div><p>${e((m.selectedSubs||[]).map(id=>sub(id)?.name).filter(Boolean).slice(0,5).join(' · ')||'No selected subroutines')}</p><div class="record-actions"><button class="button small outline" data-action="resume-moment" data-id="${e(m.id)}">Reopen & edit</button><button class="button small ghost" data-action="delete-moment" data-id="${e(m.id)}">Delete</button></div></article>`;}).join(''):`<div class="empty-state"><h3>Nothing filed yet.</h3><p>That's completely fine. You can use Clearframe without saving a single moment.</p></div>`}</div>`;
  }
  function renderRoles(){
    const sample=routine('family-rules');
    return `${sectionIntro('IDENTITIES ARE LABELS, NOT THE THEORY','Roles & themes','The atlas stores role slots, not people. Rename them for a fictional cast, a pseudonymous family map, or a neutral example without changing the underlying definitions.')}
      <div class="card" style="margin-bottom:18px"><div class="card-head"><div><div class="overline">ONE-TAP THEMES</div><h2>Choose a cast.</h2></div>${pill(state.roleTheme?.preset==='custom'?'Custom names':'Preset: '+(state.roleTheme?.preset||'neutral'))}</div><div class="theme-choices">${Object.keys(ROLE_THEMES).map(id=>`<button type="button" class="theme-choice ${state.roleTheme?.preset===id?'active':''}" data-action="apply-role-preset" data-id="${e(id)}" aria-pressed="${state.roleTheme?.preset===id}"><strong>${e({neutral:'Neutral',legacy:'MotherQ / SisterQ',storybook:'Storybook'}[id])}</strong><small>${e(Object.values(ROLE_THEMES[id]).join(' · '))}</small></button>`).join('')}</div></div>
      <div class="grid-2"><section class="card"><div class="overline">CUSTOM ROLE NAMES</div><h2>Make the names yours.</h2><p class="page-lede">These are interchangeable character labels, not records about real people. The role keys stay stable.</p><form id="roles-form" class="cast-form">${['guardian','sibling','self'].map(id=>`<div class="form-field"><label for="role-${id}">${e({guardian:'Guardian / Authority role',sibling:'Sibling / Intermediary role',self:'Self / Observer role'}[id])}</label><input id="role-${id}" name="${id}" required maxlength="60" value="${e(roleName(id))}"><p class="help-text">${e(ROLE_HELP[id])}</p></div>`).join('')}<button class="button" type="submit">Save role names</button></form></section>
      <aside class="card soft"><div class="overline">LIVE EXAMPLE</div><h2>Same pattern, different cast.</h2><p class="page-lede">Notice that only names change. The control routine and connected learned responses stay identical.</p><div class="role-preview"><div><small>Guardian role</small><strong>${e(roleName('guardian'))}</strong><p>${e(roleExample(sample?.roleExamples?.guardian))}</p></div><div><small>Sibling role</small><strong>${e(roleName('sibling'))}</strong><p>${e(roleExample(sample?.roleExamples?.sibling))}</p></div><div><small>Self / Observer</small><strong>${e(roleName('self'))}</strong><p>Evaluates the same protective response against observable present-day indicators.</p></div></div><p class="test-hint">Role assignment is a metaphor for the example, not an assumption about diagnosis, gender, or who is right.</p></aside></div>`;
  }
  function renderPreferences(){
    const switches=[
      {id:'darkMode',name:'Dark mode',description:'Use darker surfaces across Clearframe. Enabled by default.'},
      {id:'softMatchEdges',name:'Soft routine-box edges',description:'Gently feather the rightmost third of each control routine box. Enabled by default.'},
      {id:'largeText',name:'Larger text',description:'Make headings, descriptions, and controls easier to read.'},
      {id:'reducedMotion',name:'Reduce motion',description:'Turn off animations and smooth scrolling.'},
      {id:'autoAdvance',name:'Change sections when scrolling',description:'Automatically open the next processing step as you scroll. Turn this off to change steps only by tapping their headings.'},
      {id:'swapShoes',name:'Swap Shoes',description:'View the observation statements with the pronouns reversed. This changes only how the text appears, not the original wording or your selections. Off by default.'}
    ];
    const colors=[
      {id:'midnight',name:'Midnight',description:'Cool navy & lilac'},
      {id:'amethyst',name:'Amethyst',description:'Deep plum & violet'},
      {id:'ocean',name:'Ocean',description:'Teal & sea glass'},
      {id:'terminal',name:'DOS Terminal',description:'Black & phosphor green'}
    ];
    const textStyles=[
      {id:'modern',name:'Modern',description:'Clean and familiar'},
      {id:'bookish',name:'Bookish',description:'Warm serif lettering'},
      {id:'mono',name:'Monospace',description:'Computer-style text'}
    ];
    const toggle=choice=>{
      const checked=!!state.preferences[choice.id];
      return `<div class="preference-row"><div class="preference-copy"><h3>${e(choice.name)}</h3><p>${e(choice.description)}</p></div><button type="button" class="preference-switch ${checked?'enabled':''}" role="switch" aria-checked="${checked}" aria-label="${e(choice.name)}" data-action="toggle-preference" data-id="${choice.id}"><span class="preference-switch-knob" aria-hidden="true"></span></button></div>`;
    };
    return `${sectionIntro('MAKE IT YOURS','Preferences','Choose what feels comfortable. Settings save immediately on this device; automatic match selection applies to new comparisons.')}
      <section class="card preferences-card" aria-labelledby="preferences-heading"><div class="preferences-card-head"><h2 id="preferences-heading">Appearance</h2><p class="subtle">Make the workspace feel like yours.</p></div>
      <div class="preferences-list">${toggle(switches[0])}
        <div class="preference-choice-section"><h3>Colour themes</h3><p class="subtle">Choose a palette. DOS Terminal automatically enables dark mode.</p><div class="colour-theme-grid">${colors.map(item=>`<button type="button" class="theme-picker colour-picker ${state.preferences.colorTheme===item.id?'active':''}" data-action="set-color-theme" data-id="${item.id}" aria-pressed="${state.preferences.colorTheme===item.id}"><span class="colour-swatch swatch-${item.id}" aria-hidden="true"><i></i><i></i><i></i></span><strong>${e(item.name)}</strong><small>${e(item.description)}</small></button>`).join('')}</div></div>
        <div class="preference-choice-section"><h3>Text themes</h3><p class="subtle">Change the typeface without changing text size.</p><div class="text-theme-grid">${textStyles.map(item=>`<button type="button" class="theme-picker text-picker ${state.preferences.textTheme===item.id?'active':''}" data-action="set-text-theme" data-id="${item.id}" aria-pressed="${state.preferences.textTheme===item.id}"><span class="text-style-sample sample-${item.id}" aria-hidden="true">Aa</span><span><strong>${e(item.name)}</strong><small>${e(item.description)}</small></span></button>`).join('')}</div></div>
        <div class="preference-section-label">VISUAL EFFECTS</div>${toggle(switches[1])}
        <div class="preference-section-label">READING & MOVEMENT</div>${switches.slice(2,5).map(toggle).join('')}
        <div class="preference-section-label">PERSPECTIVE</div>${toggle(switches[5])}
        <div class="preference-section-label">MATCHING &amp; SELECTION</div>
        ${toggle({id:'autoAddTopThree',name:'Automatically + Add top 3',description:'Include the three highest matching subroutines when you start a new comparison. On by default.'})}
        <div class="preference-row"><div class="preference-copy"><label class="preference-setting-title" for="auto-add-match-percent">Automatic + Add percentage</label><p>Also include every subroutine matching above this percentage in new comparisons. This works separately from the Top 3 toggle.</p></div><div class="preference-percent-input"><input id="auto-add-match-percent" type="number" min="1" max="100" step="1" inputmode="numeric" value="${state.preferences.autoAddPercent}" aria-label="Automatically add matches above this percentage"><span aria-hidden="true">%</span></div></div>
        <div class="preference-row"><div class="preference-copy"><label class="preference-setting-title" for="min-display-match-percent">Minimum percentage to display</label><p>Only show matching-list items at or above this percentage. Already selected subroutines remain visible so you can remove them.</p></div><div class="preference-percent-input"><input id="min-display-match-percent" type="number" min="1" max="100" step="1" inputmode="numeric" value="${state.preferences.minDisplayPercent}" aria-label="Minimum match percentage to display in the list"><span aria-hidden="true">%</span></div></div></div>
      <div class="preferences-footer"><p class="subtle">Preferences are included when you export a backup. Thresholds change which matches are selected or shown, not the underlying scores.</p><button type="button" class="button outline small" data-action="reset-preferences">Reset preferences</button></div></section>`;
  }
  function renderData(){
    return `${sectionIntro('YOU CONTROL YOUR RECORDS','Data & privacy','The dictionaries are built into the app. Only optional saved comparisons, dictionary edits, role labels, and display preferences are stored on this device.')}
    <div class="grid-equal"><div class="card"><div class="overline">YOUR DATA</div><h2>Make a backup.</h2><p class="page-lede">Export a portable JSON file whenever you like. It includes your preferences, role labels, saved comparisons, custom definitions, edits, and any older archived records.</p><div class="form-actions"><button class="button" data-action="export">↓ Export JSON backup</button></div><div class="divider"></div><h3>Bring a backup back</h3><p class="subtle" style="margin:9px 0 15px">Merge adds records with new IDs and keeps your current display preferences and role theme. Replace restores all saved settings and records from the backup. Older version 1 backups are supported.</p><div class="data-actions"><button class="button outline" data-action="import-merge">Import & merge</button><button class="button outline" data-action="import-replace">Import & replace</button><input type="file" id="backup-file" accept="application/json,.json" hidden></div></div>
    <div class="card"><div class="overline">WHAT WE STORE</div><h2>On this device only.</h2><div class="compact-stack" style="margin-top:20px"><div class="info-block"><strong>${state.moments.length} optional saved comparisons</strong><p>Nothing is saved automatically during processing.</p></div><div class="info-block"><strong>${e(roleName('guardian'))} · ${e(roleName('sibling'))} · ${e(roleName('self'))}</strong><p>Your interchangeable role labels.</p></div><div class="info-block"><strong>${state.customRoutines.length+state.customSubroutines.length} custom definitions</strong><p>Your additions to the built-in knowledge.</p></div>${state.people.length||state.observations.length?`<div class="info-block"><strong>Archived records retained: ${state.people.length} old people · ${state.observations.length} old observations</strong><p>The People & Evidence feature is removed from the interface. Its older data is preserved in JSON backup for possible recovery; no new entries are created.</p></div>`:''}</div><p class="footnote">Stored in IndexedDB (or localStorage where needed). No cloud sync, no account, no analytics, and no external JavaScript. This storage is not encrypted. Clearing site data can permanently remove entries; export backups to a private location.</p></div></div>
    <div class="danger-zone" style="margin-top:24px"><div class="card-head"><div><h3>Erase my local records</h3><p class="subtle">Removes all saved comparisons, custom definitions, role labels, preferences, and legacy archived data. Does not remove the built-in dictionary.</p></div><button class="button danger" data-action="erase-data">Erase local data</button></div></div>`;
  }

  function modal(html){dialogContent.innerHTML=`<div class="modal-inner">${html}</div>`;if(!dialog.open)dialog.showModal();}
  function closeModal(){if(dialog.open)dialog.close();}
  function modalHeader(overline,heading){return `<div class="modal-head"><div><div class="mini-kicker">${e(overline)}</div><h2>${e(heading)}</h2></div><button class="icon-button" type="button" data-action="close-dialog" aria-label="Close dialog">✕</button></div>`;}
  function showSub(id){
    const s=sub(id);if(!s)return;
    const links=owners(id),signals=EVIDENCE.entries.filter(x=>x.subroutineIds.includes(id));
    modal(`${modalHeader('ONE DEFINITION · MULTIPLE CONNECTIONS',s.name)}<div class="modal-content"><div>${label('2 · What this subroutine describes')}<p>${e(s.meaning)}</p></div><div class="info-block">${label('3 · Learned expectation')}<strong>${e(s.learned||'Not yet described.')}</strong></div><div class="info-block">${label('4 · Possible protective response')}<strong>${e(s.protective||'Not yet described.')}</strong></div><div>${label('5 · Present-day indicators')}<p>${signals.length} indicator(s) reference this definition.</p><div class="compact-stack" style="margin-top:10px">${signals.map(x=>`<div class="signal-static">${pill(x.kind==='repeats'?'Resembles old pattern':'Challenges old pattern',x.kind==='repeats'?'rose':'green')}<p style="margin-top:7px">${e(x.statement)}</p></div>`).join('')||'<p class="subtle">No built-in indicators linked yet.</p>'}</div></div><div>${label('Question to consider')}<p>${e(s.check)}</p></div><div class="result-synthesis" style="padding:16px"><div class="mini-kicker">POSSIBLE UPDATED EXPECTATION</div><p style="font-size:.9rem">${e(s.grounded)}</p></div>${s.source?`<div>${label('Source / reference')}<p>${e(s.source)}</p></div>`:''}<div>${label('1 · Linked control routines')}<div class="tag-cloud">${links.length?links.map(r=>pill(r.name,'green')).join(''):pill('Not yet linked')}</div></div></div><div class="modal-actions"><button class="button outline" data-action="edit-sub" data-id="${e(id)}">✎ Edit definition & links</button><button class="button light" data-action="close-dialog">Close</button></div>`);
  }
  function editSub(id='',preferredRoutine=''){
    const s=sub(id), linked=s?owners(s.id).map(r=>r.id):preferredRoutine?[preferredRoutine]:[];
    modal(`${modalHeader('PATTERN DICTIONARY',s?'Edit subroutine':'Add a subroutine')}<form id="sub-form" data-id="${e(id)}" class="modal-content"><div class="form-field"><label for="sub-name">2 · Subroutine name</label><input id="sub-name" name="name" required maxlength="90" value="${e(s?.name||'')}" placeholder="e.g., Fear of Disappointment"></div><div class="form-field"><label for="sub-meaning">What does it describe?</label><textarea id="sub-meaning" name="meaning" required rows="2">${e(s?.meaning||'')}</textarea></div><div class="form-field"><label for="sub-learned">3 · Learned expectation</label><textarea id="sub-learned" name="learned" rows="2" placeholder="I learned that…">${e(s?.learned||'')}</textarea></div><div class="form-field"><label for="sub-protective">4 · Possible protective response</label><textarea id="sub-protective" name="protective" rows="2" placeholder="I learned to do…">${e(s?.protective||'')}</textarea></div><div class="form-field"><label for="sub-check">Reality-check question</label><textarea id="sub-check" name="check" rows="2">${e(s?.check||'')}</textarea></div><div class="form-field"><label for="sub-grounded">Possible updated expectation</label><textarea id="sub-grounded" name="grounded" rows="2">${e(s?.grounded||'')}</textarea></div><div class="form-field"><label for="sub-source">Source / reference (optional)</label><input id="sub-source" name="source" value="${e(s?.source||'')}" maxlength="250" placeholder="Book title, chapter, page, or your own definition"><p class="help-text">Keep a source trail as we expand the atlas from books.</p></div><div><label>1 · Connect this shared subroutine to any number of routines</label><div class="tag-cloud">${routineList().map(r=>`<label class="inline-checkbox pill quiet" style="cursor:pointer"><input type="checkbox" name="links" value="${e(r.id)}" ${linked.includes(r.id)?'checked':''}> ${e(r.name)}</label>`).join('')}</div></div><p class="help-text">5 · Present-day reality indicators are linked by stable IDs in the built-in dictionary. Their content is not changed by renaming a role.</p><div class="modal-actions">${s&&!KNOWLEDGE.subroutines.some(x=>x.id===s.id)?`<button type="button" class="button ghost" data-action="delete-custom-sub" data-id="${e(s.id)}">Delete subroutine</button>`:''}<button class="button light" type="button" data-action="close-dialog">Cancel</button><button class="button" type="submit">Save subroutine</button></div></form>`);
  }
  function editRoutine(id=''){
    const r=routine(id);
    modal(`${modalHeader('PRESSURE-POINT ATLAS',r?'Edit control routine':'New control routine')}<form id="routine-form" data-id="${e(id)}" class="modal-content"><div class="field-grid"><div class="form-field"><label for="routine-name">1 · Control routine name</label><input id="routine-name" name="name" value="${e(r?.name||'')}" required maxlength="90"></div><div class="form-field"><label for="routine-domain">Category</label><input id="routine-domain" name="domain" value="${e(r?.domain||'Personal')}" maxlength="35"></div><div class="form-field wide"><label for="routine-summary">What pattern does it describe?</label><textarea id="routine-summary" name="summary" required rows="2">${e(r?.summary||'')}</textarea></div><div class="form-field wide"><label for="routine-then">Then: Why could it have been protective?</label><textarea id="routine-then" name="then" rows="2">${e(r?.then||'')}</textarea></div><div class="form-field wide"><label for="routine-now">Now: What is worth testing?</label><textarea id="routine-now" name="now" rows="2">${e(r?.now||'')}</textarea></div><div class="form-field wide"><label for="routine-guardian">Guardian-role fictional statement · ${e(roleName('guardian'))}</label><textarea id="routine-guardian" name="guardianExample" rows="2">${e(r?.roleExamples?.guardian||'')}</textarea></div><div class="form-field wide"><label for="routine-sibling">Sibling-role fictional statement · ${e(roleName('sibling'))}</label><textarea id="routine-sibling" name="siblingExample" rows="2">${e(r?.roleExamples?.sibling||'')}</textarea><p class="help-text">Write statements using role names or neutral terms. Role labels are editable separately in Roles & themes.</p></div><div class="form-field wide"><label for="routine-signals">Matching phrases · separated by commas</label><textarea id="routine-signals" name="signals" rows="2">${e((r?.signals||[]).join(', '))}</textarea><p class="help-text">Used for transparent on-device suggestions when you describe a moment.</p></div></div><div class="modal-actions">${r&&!KNOWLEDGE.routines.some(x=>x.id===r.id)?`<button class="button ghost" type="button" data-action="delete-custom-routine" data-id="${e(r.id)}">Delete routine</button>`:''}<button class="button light" type="button" data-action="close-dialog">Cancel</button><button class="button" type="submit">Save routine</button></div></form>`);
  }
  function updateRoutine(id,changes){
    if(KNOWLEDGE.routines.some(r=>r.id===id))state.routineEdits[id]={...(state.routineEdits[id]||{}),...changes};
    else {const i=state.customRoutines.findIndex(r=>r.id===id);if(i>=0)state.customRoutines[i]={...state.customRoutines[i],...changes};}
  }
  function updateSubroutine(id,changes){
    if(KNOWLEDGE.subroutines.some(s=>s.id===id))state.subroutineEdits[id]={...(state.subroutineEdits[id]||{}),...changes};
    else {const i=state.customSubroutines.findIndex(s=>s.id===id);if(i>=0)state.customSubroutines[i]={...state.customSubroutines[i],...changes};}
  }
  function saveNewConnections(subId,desired){
    for(const r of routineList()){
      const existing=r.subroutineIds||[];
      const next=desired.includes(r.id)?unique([...existing,subId]):existing.filter(id=>id!==subId);
      if(next.join('|')!==existing.join('|'))updateRoutine(r.id,{subroutineIds:next});
    }
  }
  async function handleFormSubmit(form){
    const data=new FormData(form),id=form.dataset.id||'';
    if(form.id==='roles-form'){
      const aliases={};for(const key of ['guardian','sibling','self'])aliases[key]=String(data.get(key)||'').trim().slice(0,60);
      if(Object.values(aliases).some(x=>!x)){toast('Give each role a name.');return;}
      state.roleTheme={preset:'custom',aliases};await persist();render();toast('Character names saved. Pattern definitions are unchanged.');
    }
    if(form.id==='routine-form'){
      const changes={name:titleCase(String(data.get('name')||'').trim()),domain:titleCase(String(data.get('domain')||'').trim()),summary:String(data.get('summary')||'').trim(),then:String(data.get('then')||'').trim(),now:String(data.get('now')||'').trim(),roleExamples:{guardian:String(data.get('guardianExample')||'').trim(),sibling:String(data.get('siblingExample')||'').trim()},signals:unique(String(data.get('signals')||'').split(',').map(x=>x.trim()).filter(Boolean))};
      if(!changes.name||!changes.summary)return;
      const target=id||uid();
      if(id)updateRoutine(id,changes);else state.customRoutines.push({id:target,...changes,subroutineIds:[]});
      selectedRoutine=target;await persist();closeModal();render();toast('Routine saved.');
    }
    if(form.id==='sub-form'){
      const changes={name:titleCase(String(data.get('name')||'').trim()),meaning:String(data.get('meaning')||'').trim(),learned:String(data.get('learned')||'').trim(),protective:String(data.get('protective')||'').trim(),check:String(data.get('check')||'').trim(),grounded:String(data.get('grounded')||'').trim(),source:String(data.get('source')||'').trim()};
      if(!changes.name||!changes.meaning)return;
      const target=id||uid();
      if(id)updateSubroutine(id,changes);else state.customSubroutines.push({id:target,...changes});
      saveNewConnections(target,data.getAll('links').map(String));
      await persist();closeModal();render();toast('Subroutine and links saved.');
    }
  }

  async function exportBackup(){
    const payload={...state,exportedAt:new Date().toISOString(),app:'Clearframe'};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob),link=document.createElement('a');
    link.href=url;link.download='clearframe-backup-'+nowLocalDate()+'.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('JSON backup downloaded.');
  }
  async function importBackup(file){
    if(!file)return;
    try{
      if(file.size>10*1024*1024)throw new Error('This file is too large (10 MB limit).');
      const imported=STORE.normalize(JSON.parse(await file.text()));
      if(importMode==='replace'&&!confirm('Replace ALL local comparisons, role names, dictionary edits, and archived legacy records with this backup? This cannot be undone without another backup.'))return;
      state=importMode==='replace'?imported:STORE.merge(state,imported);
      applyPreferences();await persist();analysis=null;render();toast(importMode==='replace'?'Backup restored.':'Backup merged.');
    }catch(error){alert('Could not import the file: '+error.message);}
    finally{const input=document.getElementById('backup-file');if(input)input.value='';}
  }

  document.addEventListener('click',async ev=>{
    const t=ev.target.closest('[data-action]');if(!t)return;
    const action=t.dataset.action,id=t.dataset.id||'';
    if(t.tagName==='BUTTON')ev.preventDefault();
    switch(action){
      case 'open-processing-step':openProcessingStep(id,true);break;
      case 'toggle-preference':if(Object.hasOwn(STORE.defaultPreferences(),id)){
        state.preferences[id]=!state.preferences[id];
        if(id==='darkMode'&&!state.preferences.darkMode&&state.preferences.colorTheme==='terminal')state.preferences.colorTheme='midnight';
        applyPreferences();await persist();render();
      }break;
      case 'set-color-theme':if(['midnight','amethyst','ocean','terminal'].includes(id)){
        state.preferences.colorTheme=id;
        if(id==='terminal'){state.preferences.darkMode=true;state.preferences.textTheme='mono';}
        applyPreferences();await persist();render();
      }break;
      case 'set-text-theme':if(['modern','bookish','mono'].includes(id)){
        state.preferences.textTheme=id;applyPreferences();await persist();render();
      }break;
      case 'reset-preferences':{
        state.preferences=STORE.defaultPreferences();applyPreferences();await persist();render();toast('Preferences reset to defaults.');break;
      }
      case 'use-example': {const sample=KNOWLEDGE.examples.find(x=>x.id===id);if(sample){draft=sample.text;analysis=null;editingMoment=false;render();document.getElementById('moment-input')?.focus();}break;}
      case 'analyze':{
        const input=document.getElementById('moment-input');if(input)draft=input.value;
        if(draft.trim().length<8){toast('Enter at least one short sentence or thought.');input?.focus();break;}
        analysis=newAnalysis(draft.trim());editingMoment=false;render();openProcessingStep('matches',true);
        requestAnimationFrame(landFirstMatchingRow);break;
      }
      case 'edit-moment':if(analysis){draft=analysis.text;editingMoment=true;render();window.scrollTo({top:0,behavior:motionBehavior()});document.getElementById('moment-input')?.focus({preventScroll:true});}break;
      case 'cancel-edit':if(analysis){draft=analysis.text;editingMoment=false;render();window.scrollTo({top:0,behavior:motionBehavior()});}break;
      case 'clear-analysis':analysis=null;draft='';editingMoment=false;render();window.scrollTo({top:0,behavior:motionBehavior()});break;
      case 'show-routine':selectedRoutine=id;location.hash='#atlas';break;
      case 'select-routine':selectedRoutine=id;render();document.querySelector('.atlas-inspector')?.scrollIntoView({behavior:motionBehavior(),block:'nearest'});break;
      case 'show-sub':showSub(id);break;
      case 'edit-sub':editSub(id);break;
      case 'add-sub-dialog':editSub('',t.dataset.routine||'');break;
      case 'edit-routine':editRoutine(id);break;
      case 'add-routine':editRoutine();break;
      case 'apply-role-preset':if(ROLE_THEMES[id]){state.roleTheme={preset:id,aliases:{...ROLE_THEMES[id]}};await persist();render();toast('Theme applied. Your learned-pattern definitions are unchanged.');}break;
      case 'close-dialog':closeModal();break;
      case 'add-sub':changeIncludedSubroutine(id,true,t.dataset.fromReview==='true');break;
      case 'remove-sub':changeIncludedSubroutine(id,false);break;
      case 'browse-recent':browseRecentSubroutine(Number(t.dataset.direction));break;
      case 'toggle-evidence':if(analysis){const y=window.scrollY;const panelY=document.querySelector('.recent-evidence-scroll')?.scrollTop||0;analysis.evidenceMatches=REASONER.toggleEvidenceChoice(analysis.evidenceMatches,id,EVIDENCE.entries);render();const panel=document.querySelector('.recent-evidence-scroll');if(panel)panel.scrollTop=panelY;window.scrollTo(0,y);}break;
      case 'try-routine':{
        const r=routine(id);if(r){draft=roleExample(r.roleExamples?.guardian)||r.summary;analysis=newAnalysis(draft);editingMoment=false;analysis.top=[id];analysis.selectedSubs=(r.subroutineIds||[]).slice(0,6);analysis.reflection=null;analysis.reflections=[];location.hash='#home';if(route()==='home')render();}break;
      }
      case 'save-moment':{
        if(!analysis)break;
        const record={...analysis,updatedAt:new Date().toISOString()};
        // The ranking index is reproducible from the saved words and atlas;
        // do not multiply it into every locally saved comparison.
        delete record.groupedMatches;
        if(record.id){const index=state.moments.findIndex(m=>m.id===record.id);if(index>=0)state.moments[index]=record;else state.moments.push(record);}
        else{record.id=uid();analysis.id=record.id;state.moments.push(record);}
        await persist();render();toast('Moment saved on this device.');break;
      }
      case 'resume-moment':{
        const m=state.moments.find(x=>x.id===id);
        if(m){
          const legacy=Array.isArray(m.selectedSubs)&&m.selectedSubs.some(sid=>typeof sid==='string'&&sid.startsWith('v4b-'));
          const fresh=newAnalysis(m.text||'');
          analysis={...fresh,...JSON.parse(JSON.stringify(m)),
            top:legacy?fresh.top:Array.isArray(m.top)?m.top:[],
            selectedSubs:legacy?fresh.selectedSubs:Array.isArray(m.selectedSubs)?m.selectedSubs:[],
            evidenceMatches:legacy?{}:m.evidenceMatches&&typeof m.evidenceMatches==='object'?m.evidenceMatches:{}};
          const corrected=REASONER.normalizeEvidenceChoices(analysis.evidenceMatches,EVIDENCE.entries);
          analysis.evidenceMatches=corrected.matches;
          draft=m.text||'';editingMoment=false;location.hash='#home';
          if(route()==='home')render();window.scrollTo({top:0,behavior:motionBehavior()});
          if(legacy)toast('Re-matched with V15 subroutines. The saved original remains unchanged until you save again.');
          else if(corrected.conflicts)toast('Earlier contradictory pairs were reset to neither. Choose the observation that fits this occasion.');
        }
        break;
      }
      case 'delete-moment':if(confirm('Delete this saved moment?')){state.moments=state.moments.filter(m=>m.id!==id);await persist();render();toast('Moment deleted.');}break;
      case 'delete-custom-sub':if(confirm('Delete this custom subroutine and remove its links?')){
        state.customSubroutines=state.customSubroutines.filter(s=>s.id!==id);saveNewConnections(id,[]);await persist();closeModal();render();toast('Custom subroutine deleted.');
      }break;
      case 'delete-custom-routine':if(confirm('Delete this custom control routine?')){
        state.customRoutines=state.customRoutines.filter(r=>r.id!==id);selectedRoutine='family-rules';await persist();closeModal();render();toast('Custom routine deleted.');
      }break;
      case 'export':exportBackup();break;
      case 'import-merge':case 'import-replace':importMode=action==='import-merge'?'merge':'replace';document.getElementById('backup-file')?.click();break;
      case 'erase-data':if(confirm('Permanently erase ALL saved comparisons, role names, display preferences, dictionary edits, and archived legacy records stored in this browser? Export a backup first if you might need them.')){
        state=STORE.fresh();analysis=null;editingMoment=false;applyPreferences();await persist();render();toast('Local data erased.');
      }break;
    }
  });

  document.addEventListener('submit',async ev=>{
    if(!ev.target.matches('#sub-form,#routine-form,#roles-form'))return;
    ev.preventDefault();try{await handleFormSubmit(ev.target);}catch(error){toast('Unable to save: '+error.message);}
  });
  document.addEventListener('input',ev=>{
    const t=ev.target;
    if(t.id==='moment-input')draft=t.value;
    if(t.id==='analysis-next'&&analysis)analysis.next=t.value;
    if(['dictionary-search','moment-search','evidence-search'].includes(t.id)){
      if(t.id==='dictionary-search')dictionarySearch=t.value;else if(t.id==='evidence-search')evidenceSearch=t.value;else momentSearch=t.value;
      const id=t.id,pos=t.selectionStart;render();const input=document.getElementById(id);input?.focus();if(input&&pos!=null)input.setSelectionRange(pos,pos);
    }
  });
  document.addEventListener('change',async ev=>{
    const t=ev.target;
    if(['auto-add-match-percent','min-display-match-percent'].includes(t.id)){
      const key=t.id==='auto-add-match-percent'?'autoAddPercent':'minDisplayPercent';
      const raw=t.value.trim();
      const value=raw===''?(key==='autoAddPercent'?20:1):Number(raw);
      if(!Number.isInteger(value)||value<1||value>100){
        t.value=state.preferences[key];
        toast('Enter a whole percentage from 1 to 100.');
        return;
      }
      state.preferences[key]=value;
      t.value=value;
      await persist();
    }
    if(t.dataset.assumption&&analysis){
      if(!t.checked)analysis.selectedSubs=analysis.selectedSubs.filter(id=>id!==t.dataset.assumption);
      else if(!analysis.selectedSubs.includes(t.dataset.assumption))analysis.selectedSubs.push(t.dataset.assumption);
      render();
    }
    if(t.id==='dictionary-filter'){dictionaryFilter=t.value;render();}
    if(t.id==='evidence-filter'){evidenceFilter=t.value;render();}
    if(t.id==='backup-file')await importBackup(t.files?.[0]);
  });
  dialog.addEventListener('click',event=>{if(event.target===dialog)closeModal();});
  document.getElementById('menu-toggle').addEventListener('click',()=>{
    const side=document.getElementById('sidebar'),opened=side.classList.toggle('open');document.getElementById('menu-toggle').setAttribute('aria-expanded',String(opened));
  });
  document.addEventListener('keydown',event=>{
    if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key)&&!event.target.closest?.('button,a,summary,input,textarea,select,[contenteditable]'))processingUserScrollUntil=Date.now()+1400;
    if((event.key==='Enter'||event.key===' ')&&event.target.classList.contains('atlas-node')){event.preventDefault();event.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}
    if(event.key==='Escape')document.getElementById('sidebar').classList.remove('open');
  });
  window.addEventListener('hashchange',render);
  window.addEventListener('resize',()=>{
    if(!analysis||editingMoment||reviewReading||route()!=='home')return;
    cancelAnimationFrame(footerResizeFrame);
    footerResizeFrame=requestAnimationFrame(stabilizeMatchingFooter);
  });
  window.addEventListener('scroll',()=>{
    const scrollY=window.scrollY;
    const direction=scrollY-processingScrollY;
    processingScrollY=scrollY;
    // Reflow after collapsing a section can move the scroll position without
    // any user scroll. Only an actual scroll gesture may switch sections.
    if(Math.abs(direction)<3||Date.now()<processingScrollGuardUntil||Date.now()>processingUserScrollUntil||route()!=='home'||!analysis||editingMoment||!state.preferences.autoAdvance)return;
    const steps=[...document.querySelectorAll('[data-processing-step]')];
    const currentIndex=steps.findIndex(step=>step.dataset.processingStep===activeProcessingStep);
    if(currentIndex<0)return;
    const adjacent=steps[currentIndex+(direction>0?1:-1)];
    if(!adjacent)return;
    const heading=adjacent.querySelector('.processing-heading');
    const rect=heading.getBoundingClientRect();
    // A new heading approaching the top becomes the active, expanded section.
    // Scrolling backward works the same way; only one body stays expanded.
    if(direction>0&&rect.top<=145&&rect.bottom>16)openProcessingStep(adjacent.dataset.processingStep);
    if(direction<0&&rect.top>=0&&rect.top<=155)openProcessingStep(adjacent.dataset.processingStep);
  },{passive:true});
  // Wheel and touch gestures can reach the page's scroll limit before a
  // collapsed next section's heading reaches the top of the viewport.
  function atProcessingEdge(direction){
    if(Date.now()<processingScrollGuardUntil||route()!=='home'||!analysis||editingMoment||!state.preferences.autoAdvance)return false;
    return direction>0?window.scrollY>=document.documentElement.scrollHeight-window.innerHeight-18:window.scrollY<=18;
  }
  window.addEventListener('wheel',event=>{
    if(Math.abs(event.deltaY)<12)return;
    processingUserScrollUntil=Date.now()+1400;
    const direction=event.deltaY>0?1:-1;
    if(atProcessingEdge(direction))advanceProcessingStep(direction);
  },{passive:true});
  let processingTouchStartY=null;
  window.addEventListener('touchstart',event=>{processingTouchStartY=event.touches[0]?.clientY??null;processingUserScrollUntil=Date.now()+1800;},{passive:true});
  window.addEventListener('touchend',event=>{
    if(processingTouchStartY==null)return;
    const amount=processingTouchStartY-(event.changedTouches[0]?.clientY??processingTouchStartY);
    processingTouchStartY=null;
    if(Math.abs(amount)<35)return;
    processingUserScrollUntil=Date.now()+1400;
    const direction=amount>0?1:-1;
    if(atProcessingEdge(direction))advanceProcessingStep(direction);
  },{passive:true});

  async function start(){
    try{state=await STORE.get();}catch(error){state=STORE.fresh();toast('Storage unavailable. Use JSON export for backups.');}
    applyPreferences();
    if(!routine(selectedRoutine))selectedRoutine=routineList()[0]?.id||'family-rules';
    render();
    if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').catch(()=>{});
  }
  start();
})();
