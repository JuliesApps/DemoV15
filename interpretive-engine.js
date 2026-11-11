/* Clearframe V10: reusable, on-device interpretation of learned survival rules.
 * The vocabulary is about mechanisms (forecasts, guilt, rules, boundaries,
 * demands), never the nouns in a supplied example. Nothing here diagnoses a
 * caregiver, asserts motive, or assumes that a present relationship is safe.
 *
 * Each input passes through the same pipeline:
 * 1. Separate described conduct from inferred meaning and possible response.
 * 2. Detect overlapping relational mechanisms in the whole account.
 * 3. Score mechanisms against the EXISTING V10 source-linked subroutines.
 * 4. Invite an independent present-day evidence comparison for each match.
 */
window.ClearframeInterpretiveEngine=(()=>{
  'use strict';
  const norm=value=>String(value||'').toLowerCase().normalize('NFKD')
    .replace(/[\u0300-\u036f]/g,'').replace(/[’‘]/g,"'")
    .replace(/[^a-z0-9'\s-]/g,' ').replace(/\s+/g,' ').trim();
  const test=(s,re)=>re.test(s);
  // Conceptual routes, not imported V4b records. Each destination is an
  // independently authored V10 Book 1 subroutine with its own evidence.
  // IDs that have no defensible counterpart stay absent rather than becoming
  // fabricated new catalog entries.
  const routes={
    'forgotten-preference':'separate-preference-treated-as-severance',
    'malice-attribution':'hostile-attribution',
    'mind-reading':'mind-reading-certainty',
    'rejection-forecast':'separate-preference-treated-as-severance',
    'retaliation-forecast':'hostile-attribution',
    'catastrophic-fill':'small-fact-inflated-to-threat',
    'separation-alarm':'separate-preference-treated-as-severance',
    'withdrawal-threat':'silence-read-as-deliberate-harm',
    'reassurance-loop':'more-of-same-solutions',
    'conditional-affection':'separate-preference-treated-as-severance',
    'loyalty-test':'separate-preference-treated-as-severance',
    'double-standard':'role-based-double-standards',
    'moving-goalposts':'intermittent-approval',
    'minimized-feeling':'emotional-invalidation',
    'prove-my-reality':'argument-rebuttal-listening',
    'shame-label':'global-character-criticism',
    'unmet-need-shame':'totalizing-problem-identity',
    'boundary-guilt':'false-self-accommodation',
    'permission-seeking':'false-self-accommodation',
    'obedience-pressure':'compliance-called-communication',
    'emotional-debt':'unspoken-caretaking-contract',
    'sacrifice-ledger':'favour-ledger-without-end',
    'emotional-caretaking':'unspoken-caretaking-contract',
    'parentification':'emotional-parentification',
    'fear-disappointment':'placating-for-peace',
    'privacy-intrusion':'diffuse-boundary-pattern',
    'overexplaining':'argument-rebuttal-listening',
    'appeasement':'placating-for-peace',
    'walking-on-eggshells':'placating-for-peace',
    'change-threat':'small-fact-inflated-to-threat',
    'no-safe-exit':'contradictory-injunction',
    'triangulation':'triangulated-messenger',
    'selective-transparency':'incongruent-communication',
    'scapegoating':'scapegoated-member',
    'trust-collapse':'single-event-generalization',
    'access-control':'economic-dependence-leverage'
  };
  function evaluate(input,subroutines,routines){
    const s=norm(input),suggestions=new Map();
    const available=new Map(subroutines.filter(x=>!x.id.startsWith('v4b-')).map(x=>[x.id,x]));
    const parents=new Map();
    for(const r of routines)for(const id of r.subroutineIds||[]){
      if(!parents.has(id))parents.set(id,r.id);
    }
    if(s.length<4||!available.size)return [];
    const f={
      other:test(s,/\b(?:he|she|they|him|her|them|someone|partner|boyfriend|girlfriend|husband|wife|friend|friends|mother|mom|father|dad|parent|parents|sister|sisters|brother|brothers|roommate|roommates|coworker|coworkers|boss|bosses|teacher|teachers|classmate|classmates)\b/),
      uncertain:String(input).includes('?')||test(s,/\b(?:perhaps|maybe|might|could it|i wonder|wondering|i guess|i assume|i suspect|seems|i'm sure|surely|probably|must mean|what if|i bet|i think|i fear|i'm afraid|i worry|does this mean|do they|does he|does she|are they|is he|is she|i know)\b/),
      reported:test(s,/\b(?:told me|said to me|explicitly said|said that|texted me that|wrote to me that|admitted to me|stated outright|(?:said|says|told|texted|wrote|messaged|announced|stated)\s+(?:(?:to me|out loud)\s+)?(?:that\s+)?(?:he|she|they)\s+(?:wants?|believes?|hopes?|expects?|thinks?|plans?))\b/),
      slight:test(s,/\b(?:forgot|forgotten|missed|overlooked|mistake|accident|accidental|small|little|minor|late|delayed|canceled|cancelled|changed|didn't|did not|left|ignored|misheard|wrong|different|quiet|silence|slow to|did something|made|bought|chose|put|added|served)\b/),
      preference:test(s,/\b(?:prefer|preference|favorite|favourite|dislike|usual|remember|forgot|overlook|listen to me|pay attention|my choice|my wishes|i (?:want|wanted|asked for|like|liked)|i don't like|i do not like|what i (?:want|wanted|like|liked|asked for)|told (?:them|him|her) (?:that|i|my))\w*\b/),
      upset:test(s,/\b(?:hurt|upset|sadden|ruin|spoil|wreck|sabotage|damage|embarrass|humiliat|disappoint|angry|mad|furious|sick|scared|afraid|anxious|panic|pain|unfair)\w*\b/),
      inferredIntent:test(s,/\b(?:deliberately|intentionally|on purpose|meant to|trying to|tried to|wants to hurt|wanted to hurt|to spite|malicious|sabotage|did it to|punishing me|mess with me|make me suffer|out to get me)\b/),
      inferredMind:test(s,/\b(?:think|thinks|believe|believes|assume|assumes|secretly|must want|must think|hates me|doesn't care|does not care|don't care|do not care|must mean|doesn't respect|does not respect|they want me to|she wants me to|he wants me to|(?:does|do) (?:he|she|they) (?:not |really )?(?:care|love|want|like|respect)|(?:he|she|they|my friend|my partner) (?:is|are) (?:angry|mad|upset|furious|disappointed|disgusted|resentful) (?:at|with|because))\b/),
      connection:test(s,/\b(?:care|love|loved|affection|relationship|bond|friendship|trust|value|valued|matter|important|wanted|unwanted|abandon|reject|exclude|leave me|no longer|anymore|stop loving|don't like me|doesn't like me|hates me|boyfriend|girlfriend|husband|wife|partner|best friend)\b/),
      rejection:test(s,/\b(?:no longer (?:care|love|want|like)|doesn't (?:care|love|want|like)|does not (?:care|love|want|like)|don't (?:care|love|want|like)|do not (?:care|love|want|like)|(?:does|do) (?:he|she|they) not (?:care|love|want|like)|abandon|reject|leave me|break up|unwanted|not important|i don't matter|i do not matter|hates me|never loved|not love me|doesn't want me|lost interest|never come back|never return|won't come back|won't return|leave for good|leave permanently|not like me anymore)\b/),
      retaliation:test(s,/\b(?:revenge|retaliat\w*|getting even|get even|payback|getting back at|punish(?:ing)? me for|spite(?:ful)?|settle the score|teach me a lesson)\b/),
      space:test(s,/\b(?:space|alone|quiet|distance|distant|silent|silence|withdraw|stop replying|no reply|didn't answer|not answer|need a break|time apart|separat|leave|left|stop talking|not speaking|ignore)\w*\b/),
      careReassurance:test(s,/\b(?:reassur|ask again|asked again|keep asking|kept asking|check(?:ing)? (?:again|his|her|their)|need (?:to know|an answer|proof)|prove (?:you|he|she|they) (?:care|love)|tell me (?:again|you love)|won't stop asking)\w*\b/),
      judgment:test(s,/\b(?:bad|wrong|broken|worthless|useless|selfish|lazy|failure|unfit|incompetent|incapable|irresponsible|stupid|crazy|dramatic|overreact|too sensitive|bad person|not good enough|shame|ashamed|embarrass)\w*\b/)&&!test(s,/\b(?:did nothing wrong|haven't done anything wrong|did not do anything wrong)\b/),
      global:test(s,/\b(?:always|never|every time|everyone|nobody|nothing|everything|entire|all of it|forever|completely|totally|no one|no matter what)\b/),
      invalidation:test(s,/\b(?:overreact|too sensitive|dramatic|ridiculous|dismiss|laugh(?:ed)? at|mock|stop crying|doesn't matter|didn't happen|making it up|imagining it|invalid|exaggerat|not a big deal|not real|crazy)\w*\b/),
      evidence:test(s,/\b(?:prove|proof|evidence|receipts|record|document|screenshot|believe me|lying|deny|denied|never said|said something different|my reality|my memory|gaslight|can't convince|won't believe)\w*\b/),
      imposedRole:test(s,/\b(?:can't|cannot|couldn't|incompetent|incapable|unfit|not able|not capable|not ready|would fail|never succeed|too young|too old|always been|i'm the|i am the|treats me like|labelled|labeled|decided who i am)\b/),
      approval:test(s,/\b(?:permission|approval|allowed|let me|won't let|not allowed|obey|obedi|must|have to|supposed to|rule|order|demand|insist|forbid|in charge|decide for me|tell(?:s)? me what to do)\w*\b/),
      obligation:test(s,/\b(?:owe|debt|after everything|sacrifice|ungrateful|guilt|guilty|duty|responsib|obligation|do this for|the least you can do|return the favor|pay back|comply)\w*\b/),
      caretaking:test(s,/\b(?:keep (?:her|him|them|my mom|my mother) happy|manage (?:her|his|their|my mom's|my mother's) (?:feelings|emotions)|fix (?:her|his|their) (?:mood|feelings)|calm (?:her|him|them|my mom|my mother|my dad|my father) down|cheer (?:her|him|them|my mom|my mother) up|walking on eggshells|don't upset (?:her|him|them)|afraid (?:she|he|they)'ll get upset|their emotions|their mood|her mood|his mood|their disappointment|disappoint(?:ed|ing)? (?:everyone|her|him|them)|letting (?:everyone|her|him|them) down)\b/),
      boundary:test(s,/\b(?:boundary|say no|saying no|said no|decline|declined|refuse|refused|not comfortable|privacy|private|my room|my phone|my time|need space|need alone|my choice|independent|my decision|respect my|access to|without asking)\w*\b/),
      consequence:test(s,/\b(?:punish|threat|retaliat|withdraw affection|silent treatment|cut me off|explode|yell|scream|rage|lose|kick me out|take away|leave me|abandon|guilt trip|shame me|angry at me|upset with me)\w*\b/),
      conflict:test(s,/\b(?:argue|argument|fight|disagree|disagreement|conflict|refuse|refused|confront|said no|say no|different opinion|tension)\w*\b/),
      volatility:test(s,/\b(?:scream|yell|rage|furious|explode|outburst|slammed|fight|escalate|lash out|violent|intimidat|attack|shout|walking on eggshells|volatile)\w*\b/),
      rulesShift:test(s,/\b(?:chang(?:e|ed|es|ing) (?:the|their|my|these)? ?(?:rules|requirements|expectations)|goalposts|moving targets|never enough|never win|impossible to please|nothing i do|can't win|whatever i do|new conditions|changed (?:the|their) mind|one minute.*next minute)\b/),
      fairness:test(s,/\b(?:unfair|double standard|hypocri|same rule|different rules|everyone else|they can but|she can but|he can but|always me|only me|punished for the same|different treatment|treats me differently)\w*\b/),
      mediation:test(s,/\b(?:take sides|pick a side|middle of|pass a message|relay|tell (?:him|her|them)|everyone agrees|behind my back|says one thing|tells me one thing|one thing alone|another when|different story|contradicts herself|contradicts himself|in front of (?:our|my) mother|family secret|loyalty)\b/),
      change:test(s,/\b(?:change(?:d|s)? (?:plans|our plans|the plan)|cancell?ed|reschedul|last minute|unexpected|suddenly|different than|not what i expected|surprise|no notice|didn't tell me|did not tell me)\w*\b/),
      isolation:test(s,/\b(?:isolate|hide|withdraw|avoid everyone|want to be alone|leave me alone|don't want to see|stay in bed|need quiet|can't deal with people|people exhaust|burned out|burnt out)\w*\b/),
      noExit:test(s,/\b(?:trapped|stuck|no choice|can't leave|cannot leave|nowhere to go|no way out|helpless|powerless|whatever i do|damned if|either way|no safe option)\b/),
      apologies:test(s,/\b(?:apologiz|apologis|say sorry|said sorry|keep saying sorry|give in|agree just to|avoid a fight|keep the peace|don't make her mad|do what they want)\w*\b/),
      controllingSelf:test(s,/\b(?:i (?:demand|demanded|insist|insisted|forbid|forbade|punish|punished|test|tested|accuse|accused|yelled|shouted|won't let|wouldn't let|make|made) (?:them|her|him|my |that )|i told (?:them|her|him) (?:they|she|he) (?:can't|cannot|must|should|don't get|doesn't get)|if (?:they|he|she) (?:really |truly |actually )?loved me|i won't let (?:them|him|her))\b/),
      conditional:test(s,/\b(?:if (?:you|they|he|she) (?:really |truly |actually )?(?:loved|love|cared|care|respected|respect)|prove (?:your|their|his|her) love|only love|only care|unless (?:you|they|he|she)|or else|won't love|withdraw (?:care|affection)|affection depends|conditional)\b/)
    };
    // The interpretation layer works with *roles and relationships between
    // ideas*, not exact user examples. In particular, a third person's
    // unreported expectation of an outcome for the writer is a possible
    // attribution of a private motive. "Waiting", "hoping" and "expecting"
    // are all expectation verbs; the outcome and its target determine whether
    // the claim is relationally significant. A shared timetable is different
    // from anticipating that somebody will disappear from the relationship.
    const writerTarget=test(s,/\b(?:me|my|myself|i|us|our)\b/);
    // A grammatical third-person actor also covers unnamed relationships
    // ("my flatmate", "the neighbour") without enumerating their job or role.
    const thirdPersonAgent=f.other||test(s,/\b(?:my|our|the|their)\s+[a-z][a-z-]*\s+(?:(?:is|was|has|had|will|would|can't|cannot)\s+)?(?:expect\w*|hop\w*|wish\w*|want\w*|prefer\w*|anticipat\w*|await\w*|wait\w*|count\w*|look\w*|plan\w*|intend\w*)\b/);
    const expectationPredicate=test(s,/\b(?:expect(?:s|ed|ing)?|hop(?:e|es|ed|ing)|wish(?:es|ed|ing)?|want(?:s|ed|ing)?|prefer(?:s|red|ring)?|anticipat\w*|await\w*|wait(?:s|ed|ing)?|count(?:s|ed|ing)? on|looking forward to|looks forward to|can't wait|cannot wait|intend\w*|plan(?:s|ned|ning)?|bet(?:s|ting)?|secretly|think(?:s|ing)?|believ\w*|assum\w*)\b/);
    const writerExit=test(s,/\b(?:me (?:to )?(?:leave|go away|be gone|disappear|vanish|move out|stay away|never (?:come|go) back|out)|i(?:'ll| will| would| may| might| should| could)? (?:leave|go away|disappear|vanish|move out|never (?:come|go) back)|(?:get|getting|got) rid of me|(?:kick|kicking|kicked|push|pushing|pushed|force|forcing|forced) me out|(?:my|our) departure|(?:me|us) gone)\b/);
    const writerOtherLoss=test(s,/\b(?:fire|firing|fired|dismiss|dismissed|oust|ousted|evict|evicted|replace|replaced|exclude|excluded|blacklist|blacklisted|drop|dropped|remove|removed|dump|dumped)\s+me\b/);
    const sharedLogistics=test(s,/\b(?:so (?:we|they|he|she) can (?:go|leave|drive|start|finish)|for (?:the|a|our|my) (?:bus|train|ride|flight|taxi|meeting|shift)|until i (?:finish|return|get back)|at (?:the|my) (?:station|airport)|to (?:start|catch) (?:the|a) (?:trip|train|bus)|leave (?:the|my|our) (?:room|office|building|table|store|workplace|bathroom|car))\b/);
    const impliedMotive=thirdPersonAgent&&writerTarget&&expectationPredicate&&(writerExit||writerOtherLoss)&&!f.reported&&!sharedLogistics;
    if(impliedMotive){
      f.other=true;
      f.inferredMind=true;
      if(writerExit){f.rejection=true;f.space=true;f.connection=true;}
    }
    const forcedComfort=thirdPersonAgent&&test(s,/\b(?:mak(?:e|es|ing)|made|forc\w*|compel\w*|demand\w*|insist\w*|expect\w*|requir\w*)\b.{0,55}\b(?:me|i)\b.{0,60}\b(?:comfort|calm|soothe|reassure|cheer|fix|manage|carry|absorb|regulate)\b/)
      &&test(s,/\b(?:her|him|them|their|his|hers|emotions?|feelings?|mood|distress|cry\w*|ang\w*|upset|anxiet\w*)\b/);
    if(forcedComfort){f.caretaking=true;f.obligation=true;}
    const have=(...keys)=>keys.every(k=>f[k]);
    function add(id,score,observation,adaptedFields={}){
      const canonical=routes[id]||id;
      const sub=available.get(canonical);
      if(!sub)return;
      const old=suggestions.get(sub.id);
      if(!old||old.score<score)suggestions.set(sub.id,{
        id:sub.id,hub:parents.get(sub.id),score,
        frame:{title:sub.name,observation:observation||sub.meaning,
          learned:adaptedFields.learned||sub.learned,
          protective:adaptedFields.protective||sub.protective,
          check:adaptedFields.check||sub.check}
      });
    }
    // Cross-domain relationship frames. The subject, action, target and
    // consequence matter; no specific food, relative, property or quotation
    // is built into the answer. Each frame raises an evidence question, not
    // an assertion about the other person's diagnosis or hidden motive.
    const relationshipFrames={
      otherActor:thirdPersonAgent||test(s,/\b(?:my|our|the|their)\s+[a-z][a-z-]*\s+(?:(?:always|never|often|constantly|repeatedly|still)\s+)?(?:ask\w*|tak\w*|took|touch\w*|mov\w*|read\w*|open\w*|us\w*|chang\w*|rearrang\w*|borrow\w*|check\w*|search\w*|yell\w*|shout\w*|blam\w*|accus\w*|demand\w*)\b/),
      refusal:test(s,/\b(?:said no|say no|refus\w*|declin\w*|disagree\w*|not comfortable|wouldn't|would not|won't|will not)\b/),
      punitiveReaction:test(s,/\b(?:yell\w*|shout\w*|scream\w*|threat\w*|punish\w*|penalt\w*|retaliat\w*|mock\w*|ridicul\w*|insult\w*|take away|cut off|angry|rage|explode\w*)\b/),
      needExpressed:test(s,/\b(?:i (?:need|needed|want|wanted|asked|requested|said i need|told (?:her|him|them) i need)|my (?:need|request|boundary)|i(?:'m| am) not comfortable)\b/),
      personalProperty:test(s,/\b(?:my|mine|our) (?:own )?[a-z][a-z-]*\b/),
      propertyAction:test(s,/\b(?:tak\w*|took|touch\w*|mov\w*|read\w*|open\w*|us\w*|chang\w*|rearrang\w*|borrow\w*|alter\w*|inspect\w*|check\w*|search\w*)\b/),
      noConsent:test(s,/\b(?:without (?:my )?(?:permission|consent|asking)|never ask\w*|didn't ask|did not ask|before (?:asking|checking)|ignored my no|after i said no|even though i said no)\b/),
      resourceLoss:test(s,/\b(?:evict\w*|kick\w* (?:me|us) out|fire\w*|dismiss\w*|withhold\w* (?:rent|money|housing|help|benefits|pay|food)|cut off (?:my|our) (?:money|income|housing|benefits)|take away (?:my|our) (?:job|home|housing|income))\b/),
      authorityRole:test(s,/\b(?:landlord|employer|boss|supervisor|manager|parent|guardian|mother|father|authority|provider|teacher|principal)\b/),
      sameRequest:test(s,/\b(?:same (?:request|action|conduct|thing|behavior|behaviour)|each time|one (?:day|time|week).{0,45}(?:another|next|other)|sometimes.{0,50}(?:other times|then)|inconsisten\w*|depends on (?:their|her|his) mood)\b/),
      reversedOutcome:test(s,/\b(?:yes|prais\w*|reward\w*|approv\w*|accept\w*).{0,65}\b(?:no|punish\w*|penalt\w*|sham\w*|reject\w*|blam\w*)\b|\b(?:no|punish\w*|penalt\w*|sham\w*|reject\w*).{0,65}\b(?:yes|prais\w*|reward\w*|approv\w*|accept\w*)\b/),
      displacedBlame:test(s,/\b(?:blam\w*|fault|accus\w*|responsib\w* for|cause\w*)\b.{0,45}\b(?:me|us)\b|\b(?:me|us)\b.{0,35}\b(?:blam\w*|at fault)\b/),
      otherPeoplesConflict:test(s,/\b(?:parents?|siblings?|friends?|neighbors?|roommates?|coworkers?|partners?|they|others?|two people)\b.{0,45}\b(?:fight\w*|argu\w*|conflict\w*|disagree\w*|tension|problem\w*)\b|\b(?:their|someone else's|another person's)\s+(?:fight\w*|conflict|argument|mistake|problem)\b/),
      dismissedContribution:test(s,/\b(?:ignor\w*|dismiss\w*|overlook\w*|silenc\w*|talk\w* over|interrupt\w*|brush\w* off|shut\w* down|refus\w* to listen)\b.{0,90}\b(?:my|our)\s+(?:ideas?|opinions?|views?|input|suggestions?|contributions?|concerns?|feelings?|words?|perspective)\b|\b(?:my|our)\s+(?:ideas?|opinions?|views?|input|suggestions?|contributions?|concerns?|feelings?|words?|perspective)\b.{0,80}\b(?:ignor\w*|dismiss\w*|silenc\w*|interrupt\w*)\b|\b(?:ignor\w*|dismiss\w*|silenc\w*|interrupt\w*)\b.{0,70}\bwhen i (?:present|share|express|offer|explain|voice|raise|speak|talk)\b/),
      pressuredResponse:test(s,/\b(?:press\w*|push\w*|demand\w*|insist\w*|forc\w*|requir\w*)\b.{0,65}\b(?:me|us|my)\b.{0,55}\b(?:answer|reply|respond|response|discuss|talk|explain|speak)\b|\b(?:demand\w*|insist\w*|press\w*|push\w*)\b.{0,55}\b(?:immediate|quick|right away|now)\b.{0,45}\b(?:answer|reply|response|talk)\b/),
      forcedTiming:test(s,/\b(?:immediat\w*|right away|quick\w*|at once|now|on (?:their|her|his) schedule|before i(?:'m| am) ready|won't wait|cannot wait|won't let me pause)\b/)
    };
    if(relationshipFrames.otherActor&&relationshipFrames.personalProperty&&relationshipFrames.propertyAction&&relationshipFrames.noConsent){
      add('diffuse-boundary-pattern',10.2,'An action involving your belongings or space is described alongside missing permission. The relevant questions are what was accessed, what consent was given, and whether a reasonable boundary was respected.');
    }
    if(relationshipFrames.resourceLoss&&relationshipFrames.punitiveReaction&&(relationshipFrames.refusal||relationshipFrames.authorityRole)){
      add('economic-dependence-leverage',10.6,'Housing, employment or another essential resource may be at risk after a disagreement. Identify the actual condition, the person’s lawful authority and whether the consequence is legitimate or being used to pressure compliance.');
    }
    if(relationshipFrames.sameRequest&&relationshipFrames.reversedOutcome){
      add('intermittent-approval',10.4,'The same action is described as receiving sharply different responses. Compare the actual circumstances and reasons before deciding whether the rule keeps changing.');
    }
    if(relationshipFrames.displacedBlame&&relationshipFrames.otherPeoplesConflict){
      add('scapegoated-member',9.6,'The account may assign responsibility for a dispute between other people to you. Clarify who did what, without treating a family member as the automatic cause of the wider conflict.');
    }
    if(relationshipFrames.needExpressed&&relationshipFrames.punitiveReaction&&thirdPersonAgent){
      add('punishment-for-need',9.8,'The account describes an upsetting response after expressing a need, limit or request. Check whether the response was a proportionate disagreement or a penalty for asking in the first place.');
    }
    if((relationshipFrames.otherActor||thirdPersonAgent)&&relationshipFrames.dismissedContribution){
      add('argument-rebuttal-listening',8.6,'Your contribution is described as being disregarded. This may raise a question about whether you are genuinely heard, but it does not yet establish that the person is preparing rebuttals or deliberately silencing you.');
    }
    const practicalUrgency=test(s,/\b(?:emergency|evacuat\w*|fire alarm|injury|immediate danger|medical crisis|safety hazard|imminent risk)\b/);
    if(thirdPersonAgent&&relationshipFrames.pressuredResponse&&relationshipFrames.forcedTiming&&!practicalUrgency){
      add('emotional-pace-set-by-authority',8.3,'There may be pressure to answer on someone else’s timetable. Check whether the exchange is about personal feelings, whether a timely reply is genuinely necessary, and whether a reasonable pause can be negotiated.');
    }
    // Relational *structure* matters beyond literal textbook vocabulary:
    // compare a stated position, its subsequent reversal, and a changed
    // audience. The identity of the third person is deliberately irrelevant.
    // Ordinary opinion changes, new facts and honest disagreement are not
    // themselves evidence of coercion or divided loyalty.
    const publicPosition={
      alignment:test(s,/\b(?:agree\w*|support\w*|back(?:s|ed|ing)? (?:me|us|him|her|them) up|has (?:my|our|their|his|her) back|side\w* with|take\w* (?:my|their|his|her) side|on (?:my|their|his|her) side|defend\w*|corroborat\w*|confirm\w*|endors\w*|affirm\w*|told (?:me|us) yes|tells? (?:me|us) yes|said yes|says yes)\b/),
      contradiction:test(s,/\b(?:chang\w* (?:her|his|their|my|the)? ?(?:story|account|version|position|stance|mind)|different (?:story|version|account|position|answer)|contradict\w*|deni\w*|deny|revers\w*|switch\w* (?:side|position|stance)|flip\w*|backtrack\w*|retract\w*|take\w* (?:it|that) back|said no|says no|tells? (?:me|us) no|tell\w* (?:a|the) different story|claim\w* (?:the )?opposite|oppose\w*)\b/),
      private:test(s,/\b(?:alone|privat\w*|one[ -]on[ -]one|just (?:the two of us|us|me and)|between (?:us|me and)|behind closed doors|without (?:anyone|others|my mom|our mom|the manager))\b/),
      audience:test(s,/\b(?:in front of|in (?:the|a|our) room|in (?:their|my|our) presence|(?:someone|anyone|everybody|everyone|others) (?:is|are|was|were) (?:there|watching|around)|(?:with|around) (?:our|my|the|their|her|his|a|an) (?:mom|mother|dad|father|grandma|grandmother|grandpa|grandfather|parent|aunt|uncle|sister|brother|boss|manager|supervisor|teacher|friend|friends|coworker|coworkers|client|colleague|relative)|(?:mom|mother|dad|father|grandma|grandmother|grandpa|grandfather|parent|aunt|uncle|sister|brother|boss|manager|supervisor|teacher|friend|coworker|client|colleague|relative) (?:is|was|comes|came|walks|walked|shows|showed|arrives|arrived|joins|joined) (?:in|into|over|up|around|present|there|us)|(?:[a-z][a-z-]+) (?:is|was|were) (?:around|present|watching|in the room)|(?:public|publicly|in company|in a group|at a meeting))\b/),
      contrast:test(s,/\b(?:but|however|yet|whereas|although|even though|instead|then|suddenly|once|when|while|after|until)\b/),
      newInformation:test(s,/\b(?:after (?:learning|discovering|finding out)|because (?:of )?new (?:facts|evidence|information)|corrected (?:the|a) mistake|because (?:the|my|her|his|their) facts changed)\b/)
    };
    if(f.other&&publicPosition.alignment&&publicPosition.contradiction&&publicPosition.private&&publicPosition.audience&&publicPosition.contrast){
      add('incongruent-communication',10.6,'The account describes agreement in one setting and a different position before another person. Compare the statements and context; a change of position does not establish the reason for it.');
      if(!publicPosition.newInformation)
        add('false-self-accommodation',7.4,'A shifting position around an audience can raise a question about pressure to perform an approved stance. Fear, persuasion, new information and genuine reconsideration remain different possibilities.');
    }
    // A recurring change to something personal can *raise a question* about
    // whose choice is being respected. It does not prove the change is
    // unwelcome: that depends on permission, communicated preferences and
    // the other person's actual response. Match the relationship between
    // actor, repeated action and personal object, not a particular food,
    // possession, family member or example sentence.
    const recurringPersonalChange=test(s,/\b(?:(?:they|he|she|someone|my [a-z-]+|the [a-z-]+|[a-hj-z][a-z-]*)\s+)(?:(?:still|continually|constantly|repeatedly)\s+)?(?:keep|keeps|kept|always|constantly|repeatedly|continues? to|continued to)\s+(?:(?:on|just|still|constantly|repeatedly)\s+){0,3}(?:put(?:s|ting)?|add(?:s|ed|ing)?|chang(?:e|es|ed|ing)|rearrang(?:e|es|ed|ing)|mov(?:e|es|ed|ing)|alter(?:s|ed|ing)?|replac(?:e|es|ed|ing)|edit(?:s|ed|ing)?|tak(?:e|es|en|ing)|throw(?:s|ing)?|toss(?:es|ed|ing)?|cut(?:s|ting)?|touch(?:es|ed|ing)?|adjust(?:s|ed|ing)?|remov(?:e|es|ed|ing)|reorganiz(?:e|es|ed|ing))\b.{0,100}\b(?:my|mine)\s+[a-z][a-z-]*\b/);
    const recurringChoiceRequested=test(s,/\b(?:because i asked|as i asked|at my request|with my permission|because i wanted|i (?:like|love|appreciate|enjoy) (?:it|that|this|when|the)|i(?:'m| am) glad (?:he|she|they)|i asked (?:him|her|them) to (?:do|keep|continue|put|add|change)|i told (?:him|her|them) to (?:do|keep|continue|put|add|change))\b/);
    const recurringChoiceOpposed=test(s,/\b(?:even after i (?:asked|told)|despite (?:my|me) (?:asking|request)|i (?:asked|told) (?:him|her|them) (?:not to|to stop)|i(?:'ve| have) (?:asked|told) (?:him|her|them) (?:not to|to stop)|without (?:my )?(?:consent|permission)|i (?:do not|don't) (?:want|like)|i hate\b|i (?:said|say) (?:no|stop))\b/);
    if(recurringPersonalChange&&!recurringChoiceRequested){
      add('diffuse-boundary-pattern',recurringChoiceOpposed?10.2:7.8,
        recurringChoiceOpposed
          ? 'Someone is described as repeatedly changing something personal despite a stated objection. Check the specific boundary, any legitimate shared responsibilities, and whether the request was understood.'
          : 'Someone is described as repeatedly changing something personal. It may be worth asking whether your preference was expressed and respected, but the sentence alone does not show that the action was unwanted or that anyone crossed a boundary.');
    }
    // The inferred meaning can recruit several mutually distinct alarms.
    // Their possible connection is a *question*, not evidence of intent.
    if(have('other','preference','rejection'))
      add('forgotten-preference',10.5,'A missed wish or detail appears alongside concern about being remembered or valued. Whether the other person knew it, and how they respond to clarification, still matters.');
    if(have('other','inferredIntent')&&(f.upset||f.slight)&&!f.reported)
      add('malice-attribution',10.2,'The description moves from an unwelcome effect to a suspected intention to cause it. The intention has not been established by the effect alone.');
    if(f.other&&(f.inferredMind||f.inferredIntent)&&(f.uncertain||f.rejection)&&!f.reported)
      add('mind-reading',9.9,'The account interprets someone else’s private state. Their actual words and conduct should be distinguished from that interpretation.');
    if(impliedMotive)
      add('mind-reading',10.5,
        'The account attributes an unspoken expectation about your future to someone else. It may be a meaningful signal, a guess, or practical timing; ask what actually indicates their intention.',{
          learned:'When someone’s motives are unclear, I may expect rejection and feel responsible for detecting their intentions before they reveal them.',
          protective:'I might treat a suspected private wish as settled, seek immediate reassurance, confront the person, or withdraw first.',
          check:'What has this person actually said or done to suggest that intention? What other explanation fits the same evidence?'
        });
    if(have('other','rejection')&&!f.reported&&(f.preference||f.space||f.conditional))
      add('rejection-forecast',9.5,'A present event is being linked to a larger prediction about being wanted, valued, or kept close. The prediction needs evidence beyond the feeling.');
    if(impliedMotive&&writerExit)
      add('rejection-forecast',10.4,
        'An anticipated departure is being interpreted as something the other person desires. Check whether this is grounded in their words, a repeated action, or an old expectation of being unwanted.',{
          learned:'If another person might want distance, I may assume that I am no longer welcome or valued.',
          protective:'I might scan for signs of rejection, ask repeatedly for reassurance, or leave before I can be asked to.',
          check:'Was leaving actually requested, suggested by a consistent pattern, or only anticipated? A real boundary is different from a guess about being unwanted.'
        });
    if(f.retaliation||have('other','inferredIntent','rejection','upset'))
      add('retaliation-forecast',f.retaliation?9.5:7.8,f.retaliation?'The account suggests a possible revenge motive. Check for a specific prior conflict, threat, or repeated conduct.':'A possible hostile motive is being anticipated, but no prior conflict or threat of payback is stated. This is a weaker hypothesis, not a conclusion.');
    if(f.uncertain&&(f.slight||f.change||f.global)&&(f.rejection||f.consequence||(f.global&&f.inferredIntent))&&!f.reported)
      add('catastrophic-fill',7.0,'Unknown details may be acquiring a worst-case explanation. A possibility is not the same as the only possible outcome.');
    if(have('other','space')&&(f.rejection||(f.connection&&f.uncertain)))
      add('separation-alarm',8.8,'Distance or a pause is being considered as a lasting loss of connection. Ask whether the person actually indicated a permanent departure.');
    if(have('other','space','rejection')&&f.inferredIntent)
      add('withdrawal-threat',7.5,'Space or silence may feel punitive, even if the person has not said it is punishment. Look for an actual threat or pattern.');
    if(f.careReassurance&&test(s,/\b(?:repeatedly|again|keep|kept|constantly|won't stop|over and over)\b/))
      add('reassurance-loop',9.5,'The wish for immediate certainty may lead to repeated checking. Check whether reassurance lasts or restarts the same fear.');
    if(f.connection&&f.conditional)
      add('conditional-affection',10.2,'The account links care or belonging to doing what another person wants. Examine whether this condition was imposed or feared.');
    if(f.connection&&f.conditional&&f.other)
      add('loyalty-test',9.4,'A present choice may be turned into proof of love or loyalty. The same freedom to decline or disagree should apply in both directions.');
    if(f.fairness)
      add('double-standard',10,'The account compares rules or consequences across people. Identify the actual agreements and whether the situations are equivalent.');
    if(f.rulesShift)
      add('moving-goalposts',10,'The account describes changing expectations or an unwinnable test. Compare the agreed rule with any later changes.');
    if(f.invalidation)
      add('minimized-feeling',9.6,'The account involves a feeling being dismissed or ridiculed. Acknowledging emotion and agreeing with an interpretation are separate matters.');
    if((f.evidence||test(s,/\b(?:believe me|not believe me|every detail|explain everything|prove myself|prove my story)\b/))&&(f.upset||f.invalidation||f.uncertain||f.judgment||f.global))
      add('prove-my-reality',8.8,'There may be pressure to prove an entire experience before being heard. Distinguish the specific facts needing clarification.');
    if(f.judgment&&(f.global||f.imposedRole||f.upset))
      add('shame-label',8.6,'A specific action or disagreement may be turning into a global verdict on someone’s character or competence.');
    if(f.judgment&&test(s,/\b(?:asking for help|asked for help|ask for help|needing help|need help|need support|asking for support|being a burden|burden on|too much to ask|feel stupid for asking|feel bad for needing)\b/))
      add('unmet-need-shame',9.4,'A need for help may be getting translated into a judgment about worth or burden. Asking is different from requiring another person to say yes.');
    if(f.boundary&&(f.obligation||f.judgment||test(s,/\b(?:guilty|selfish|ashamed|bad for|feel bad|i worry|i am afraid)\b/)))
      add('boundary-guilt',9.3,'A need or limit may be followed by guilt or a fear of being selfish. A reasonable boundary can still disappoint someone.');
    if(f.boundary&&f.approval&&!test(s,/\bwithout (?:permission|consent)\b/))
      add('permission-seeking',8.5,'A personal choice appears to require permission or approval. Check who actually has authority over this decision.');
    if(f.approval&&(f.consequence||f.conflict||f.controllingSelf))
      add('obedience-pressure',8.8,'A request or preference may be turning into an obligation to comply. Distinguish fair agreements from compelled agreement.');
    if(f.controllingSelf&&(f.space||f.boundary||f.approval||f.connection))
      add('loyalty-test',9.6,'A wish for reassurance may be expressed as a demand that another person prove loyalty. The reverse perspective deserves the same boundary standard.');
    if(f.controllingSelf&&(f.space||f.boundary))
      add('obedience-pressure',9.4,'The account may describe enforcing a rule on another person instead of allowing their independent need or choice.');
    if(f.obligation&&f.other&&f.boundary)
      add('emotional-debt',8.4,'Past help, care, or sacrifice may be treated as a standing debt. Gratitude does not automatically create unlimited obligations.');
    if(f.obligation&&test(s,/\b(?:sacrifice|after everything|what i did|what (?:she|he|they) did|gave up|owe)\b/))
      add('sacrifice-ledger',9.5,'Past sacrifices are being used to evaluate a present request. Consider what was actually promised and what remains voluntary.');
    if(f.caretaking)
      add('emotional-caretaking',9.7,'Someone else’s emotional state may have become a responsibility to manage. Support is different from being required to regulate their feelings.');
    if(f.caretaking&&test(s,/\b(?:as a child|when i was (?:a child|little|young)|growing up|raised me|my parents|my mother|my mom|my father|my dad|childhood)\b/))
      add('parentification',8.9,'An earlier caregiving role may have been placed on a child. Adult emotional responsibilities do not automatically belong to the child.');
    if((f.caretaking||f.obligation)&&f.consequence)
      add('fear-disappointment',9,'Avoiding another person’s distress may be determining the choice before a reasonable request can be discussed.');
    if(f.boundary&&test(s,/\b(?:without permission|invad|snoop|read my|opened my private|opened my messages|went through|entered my|looked in my|would not leave|won't stop|keep calling|keep texting|refused to stop|ignored my no|won't respect)\w*\b/))
      add('privacy-intrusion',10,'The account describes a possible specific boundary violation. A present violation is not excused by childhood learning.');
    if(f.boundary&&test(s,/\b(?:my (?:phone|messages|texts|password|location)|read my|opened my (?:private )?messages|went through my phone|tracked my|snooped on my)\b/))
      add('digital-access-without-scope',10.4,'A device, message, or location was accessed or monitored. Review the actual consent and scope before inferring a motive.');
    if(f.boundary&&f.evidence)
      add('overexplaining',7.5,'A personal boundary may feel as if it needs an exhaustive defense. What explanation, if any, is actually owed?');
    if(test(s,/\b(?:overexplain|over explain|explain (?:myself|everything|every detail|over and over)|justify everything|defend every decision|give a long explanation)\w*\b/))
      add('overexplaining',9.1,'Repeated explanations may be used to prevent disapproval. The present relationship still deserves a proportionate and accurate explanation.');
    if(f.apologies&&(f.volatility||f.consequence||f.caretaking))
      add('appeasement',9.2,'Apologizing or agreeing may be a way to escape a feared reaction. Compare responsibility for the specific act with responsibility for another person’s mood.');
    if(f.volatility&&f.caretaking)
      add('walking-on-eggshells',9.4,'Attention may be concentrated on preventing another person’s outburst. Current safety still depends on what is happening now.');
    if(f.change&&(f.uncertain||f.upset||f.connection))
      add('change-threat',9.1,'An unexpected change may feel like a danger signal. Examine its practical effects separately from a feared relationship meaning.');
    if(f.isolation&&f.other&&test(s,/\b(?:cut (?:them|her|him) off|never speak|stop talking|avoid (?:my|their) family|end (?:all|the) contact)\b/))
      add('emotional-cutoff',9.1,'Avoidance may become a full relational cutoff. Distinguish necessary protection and chosen rest from a reaction that eliminates possible negotiation.');
    if(f.noExit)
      add('no-safe-exit',9.1,'Available choices may feel uniformly punishing. Identify the practical constraints that exist now and any safe options.');
    if(f.mediation)
      add('triangulation',8.4,'The account may involve loyalty pressure or information traveling through a third person. Check what can be discussed directly.');
    if(f.mediation&&test(s,/\b(?:contradict|one thing.*another|different story|changing story|says one thing|tells me one thing)\w*\b/))
      add('selective-transparency',8.7,'Accounts may differ by audience. Compare the actual statements and context without assuming deception automatically.');
    if(f.fairness&&f.consequence)
      add('scapegoating',7.4,'Responsibility may be falling unevenly on one person. Clarify each person’s actual conduct.');
    if(f.connection&&f.slight&&f.uncertain&&test(s,/\b(?:nothing was real|everything was false|can't trust|cannot trust|never trust|whole relationship|all a lie)\b/))
      add('trust-collapse',6.8,'One ambiguity may be influencing the perceived reliability of the whole relationship. Repeated observations matter more than one inference.');
    if(f.imposedRole&&f.other&&(f.judgment||f.approval))
      add('shame-label',8.6,'A forecast about someone’s identity or competence may be received as a fixed label rather than a revisable opinion.');
    if(f.approval&&f.noExit)
      add('access-control',8.4,'The account may include practical leverage over access or resources. Check what is actually being withheld.');

    // All 177 V10 subroutines remain available to the separate atlas-wide
    // semantic scorer, even when no mechanism above is triggered.
    return [...suggestions.values()].sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
  }
  return Object.freeze({evaluate});
})();
