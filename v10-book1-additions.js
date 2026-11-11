/* Clearframe V10 — prior chapter source reconciliation; extended in v10-source-expansion.js.
   These are independently written applications of Nichols & Davis (12e),
   not textbook transcriptions or established diagnostic criteria.
   Source pages use the book's printed numbering (PDF page = printed + 27).
   Existing hubs and all five canonical fields remain unchanged. */
(() => {
  'use strict';
  const atlas=window.CLEARFRAME_V10_CATALOG;
  if(!atlas)throw Error('V10 base atlas must load first');
  const entries=[];
  const add=(id,name,hubs,cite,meaning,learned,protective,check,grounded,concern,contrast,high=false)=>
    entries.push({id,name,hubs,cite,meaning,learned,protective,check,grounded,concern,contrast,high});

  // Introduction and Chapter 1: origins, messaging and constrained expression.
  add('expressed-support-enacted-dismissal','Support Claimed, Voice Removed',['communication-patterns','authority-and-power'],[1,7,11],
    'A declaration of care or openness conflicts with repeated treatment that shuts down the other person’s contribution.',
    'Words of welcome may not guarantee that my perspective is welcome.','Watch reactions instead of trusting an invitation to speak.',
    'What happened when the invitation was accepted?','Care is more credible when the person can speak and make a choice.',
    'When I accept their invitation to explain my view, they interrupt and say my view is not worth hearing.',
    'When I accept their invitation to explain, they listen and allow disagreement without punishment.');
  add('performative-bickering','Conflict That Cannot Reach the Real Issue',['communication-patterns','emotional-expression'],[1,12,13],
    'Repeated surface arguments can displace a difficult substantive issue that neither person is allowed to address.',
    'I may be allowed to argue over details but not discuss what concerns me most.','Keep revisiting trivial disputes to avoid a prohibited concern.',
    'Is a substantive issue explicitly off-limits, or is it simply not yet understood?','A difficult topic can be named without mandating disclosure before anyone is ready.',
    'When I raise the recurring concern underneath an argument, they insist on arguing about a minor detail instead.',
    'When I name the main concern beneath a repeated argument, they consider discussing it directly.');
  add('restricted-outside-support','Outside Connections Conditioned on Permission',['interpersonal-boundaries','family-rules'],[1,12,13],
    'A relationship or household limits access to independent support while claiming to protect unity or loyalty.',
    'Maintaining my place may require withdrawing from other supportive relationships.','Hide friendships or stop asking others for perspective.',
    'Are restrictions justified by concrete safety needs or enforced to isolate me?','Independent connections can coexist with committed and caring relationships.',
    'When I contact a trusted friend for ordinary support, they threaten consequences unless I stop that contact.',
    'When I maintain trusted outside support, they respect my autonomy and discuss any concrete safety concern.');
  add('dominance-redefined-as-normal','One Person’s Control Treated as the Natural Order',['authority-and-power','family-rules'],[1,12,18],
    'A persistent imbalance in decision authority is described as inevitable, leaving one person unable to negotiate.',
    'My preferences may count only after their decision is final.','Defer important choices before stating my view.',
    'Who can revise the agreement, and is disagreement permitted without retaliation?','Authority can be legitimate and limited rather than absolute and permanent.',
    'When I ask to help decide something that affects me, they say I am never entitled to a voice.',
    'When a choice affects me, they invite my input and explain any genuine responsibility they must retain.');
  add('content-displaces-treatment','Debating Facts While Ignoring Treatment',['communication-patterns'],[1,7,11],
    'Arguments about which statement is correct crowd out a separate question about interruptions, contempt or fairness.',
    'I must prove every detail before asking to be treated respectfully.','Overprepare explanations and miss how the exchange unfolds.',
    'Can the conduct of the conversation be discussed independently of its topic?','A factual disagreement does not suspend respectful treatment.',
    'When I ask them to stop mocking me during a factual disagreement, they insist the facts make the mocking acceptable.',
    'When I ask for respectful treatment during disagreement, they address their delivery as well as the facts.');

  // Chapter 2: distinct reciprocal patterns and boundaries around rules.
  add('overfunctioning-dependency-loop','Overfunctioning and Displaced Competence',['family-duties','interaction-cycles'],[2,27,35],
    'One person repeatedly takes over feasible tasks, while the other has fewer chances to act independently.',
    'I may be expected to need their intervention even where I can act.','Wait for direction or overmanage another person in turn.',
    'Was help requested and necessary, and can competent action occur without takeover?','Proportionate help can grow or shrink as abilities and circumstances change.',
    'When I begin a task I can complete, they take it away and later criticize me for depending on them.',
    'When I handle a task competently, they let me finish and offer help only when I need it.');
  add('control-rebellion-polarization','Control and Resistance Reinforce Each Other',['interaction-cycles','authority-and-power'],[2,27,28],
    'More restrictive demands elicit more resistance, which is then used to justify still stronger restrictions.',
    'Disagreement may be treated as proof that I need even less choice.','Resist automatically or conceal reasonable independence.',
    'Which restrictions are necessary, and which were added in response to protest alone?','Disagreement can be heard without allowing unsafe conduct or escalating arbitrary control.',
    'When I question an unnecessary restriction, they call the question rebellion and impose a stricter rule.',
    'When I question a restriction, they explain the need and review whether the rule fits my circumstances.');
  add('corrective-punishment-backfire','Escalating Correction Despite Worsening Results',['interaction-cycles','learning-and-expectations'],[2,24,27],
    'An attempted correction is intensified despite repeated evidence that it aggravates the difficulty.',
    'To resolve tension I may have to endure ever-harsher correction.','Comply out of fear or expect more punishment after each mistake.',
    'Has the measure been evaluated for proportionality and its actual effect?','A reasonable correction can be revised when it causes more harm.',
    'When I explain that repeated public shaming makes a task harder, they intensify the shaming without checking results.',
    'When I explain a correction is worsening the task, they consider its effects and try a less harmful approach.');
  add('forbidden-rule-discussion','Unwritten Rules Cannot Be Named',['family-rules','communication-patterns'],[2,25,27],
    'A recurring expectation governs conduct, but discussion of the expectation itself is blocked.',
    'I may have to follow rules that cannot be clarified or negotiated.','Guess what will be permitted and avoid asking why.',
    'Can the rule and its consequences be discussed openly and safely?','People can revise expectations by naming the rule and its purpose.',
    'When I ask what rule I broke, they refuse to identify it and add punishment for questioning it.',
    'When I ask about an unstated expectation, they make the rule explicit and consider whether it is fair.');
  add('third-party-camps','Disagreement Recruited Into Opposing Camps',['triangular-conflict'],[2,32,34],
    'A two-person dispute expands into competing groups whose pressure makes direct resolution harder.',
    'A disagreement may require me to recruit a side to survive.','Collect allies before trying to clarify the actual issue.',
    'Are outsiders offering safe support or being instructed to enforce a faction?','Receiving counsel or protection differs from organizing retaliation.',
    'When I disagree with them, they enlist several others to demand I accept their account before speaking.',
    'When I disagree with them, they allow outside support without turning the dispute into a group campaign.');

  // Chapter 3: referral, professional authority and separate safety questions.
  add('one-sided-referral-story','First Account Becomes the Official Truth',['interpretation-loops','authority-and-power'],[3,39,46],
    'An initial allegation is treated as a settled description before the affected person can supply independent facts.',
    'A decision about me may be made before anyone hears me.','Overdefend or abandon attempts to correct the record.',
    'Who supplied the account, and have contrary observations been considered?','A report is a starting point for inquiry, not a verdict.',
    'When I offer information omitted from their initial report, they refuse to consider it because the first account is official.',
    'When I offer relevant facts, they review those facts alongside the initial report before deciding.');
  add('coerced-help-agenda','Help Offered on Conditions of Compliance',['authority-and-power','communication-patterns'],[3,39,46],
    'A referral or purported support arrangement is used to secure a predetermined confession or conformity.',
    'Access to support may depend on repeating their version of events.','Say what the authority wants to hear to keep assistance.',
    'Can the participant decline an interpretation without losing unrelated rights or essential care?','A supportive process should disclose requirements and preserve meaningful consent.',
    'When I ask for help, they say they will assist only if I admit to allegations I dispute.',
    'When I request help, they explain any legitimate conditions and let me describe my own experience.');
  add('compliance-called-communication','Communication Defined as Obedience',['communication-patterns','authority-and-power'],[3,46,48],
    'A stated wish to communicate means the other person must agree, rather than having both perspectives heard.',
    'If I am understood, I may still be punished for not agreeing.','Concede to end the conversation instead of sharing my position.',
    'Is listening sufficient, or is identical agreement demanded?','Good communication allows informed disagreement and legitimate limits.',
    'When I accurately repeat their concern but maintain a different view, they say I refuse to communicate.',
    'When I understand their concern and disagree, they acknowledge that listening does not require agreement.');
  add('conflicting-helper-demands','Authorities Issue Incompatible Instructions',['communication-patterns','authority-and-power'],[3,45,57],
    'Multiple helpers or organizations create obligations that cannot all be fulfilled and then blame the person caught between them.',
    'I may be held responsible for reconciling demands I cannot control.','Hide a conflict or overpromise to both sides.',
    'Were the directions compatible, and could the authorities coordinate safely?','A person should not be penalized for a genuine contradiction beyond their control.',
    'When I show that two authorities require incompatible actions, they blame me instead of coordinating an achievable plan.',
    'When I explain conflicting requirements, they help clarify responsibilities and remove the contradiction.');
  add('professional-boundary-exemption','Status Used to Exempt Authority From Boundaries',['authority-and-power','interpersonal-boundaries'],[3,49,51],
    'A helper, supervisor or authority treats their professional position as permission to bypass normal consent and accountability.',
    'Their status may mean my limits do not count.','Accept an intrusion to avoid losing essential assistance.',
    'Was the intrusion required by a disclosed duty, or justified solely by rank?','Professional duties do not remove the need for clear purpose, consent and transparent limits.',
    'When I decline an unrelated private demand, they say their position entitles them to ignore my boundary.',
    'When I ask about a boundary, they explain their limited role and respect matters outside that role.');
  add('assault-excuse-transfer','Responsibility for Harm Transferred to the Target',['authority-and-power','interpretation-loops'],[3,52,55],
    'An actor’s threat or assault is explained away as something the harmed person made them do.',
    'I may be required to accept blame for violence used against me.','Monitor every mood and take responsibility for the other person’s force.',
    'Who chose the threatening or violent act, independently of any dispute?','The actor remains responsible for threats and violence even when distressed.',
    'When they threaten or hurt me, they say I caused the violence by refusing a demand.',
    'When they become upset with me, they keep their actions safe and accept responsibility for any harm.',true);
  add('punitive-silence-vs-safety-pause','Withholding Contact to Force Compliance',['interaction-cycles','interpersonal-boundaries'],[3,42,54],
    'A withdrawal of contact is used as a penalty or leverage, rather than a safe pause with clear limits.',
    'If I disagree, access to ordinary contact may be conditional on surrender.','Chase reconciliation or abandon the original request.',
    'Can each person pause safely without being required to abandon their position?','Time apart and no-contact boundaries can be protective; context and safety control.',
    'When I disagree respectfully, they stop necessary communication and promise to resume only after I surrender my boundary.',
    'When I say a discussion is heated, they propose a safe pause without conditioning reconnection on obedience.');

  // Chapter 4: multigenerational interpretations are hypotheses, not destiny.
  add('conform-or-rebel-trap','Only Compliance or Rebellion Is Recognized',['family-rules','interpretation-loops'],[4,59,66],
    'An authority leaves no room for independent judgment; both acceptance and disagreement are assigned fixed personas.',
    'Any choice may be explained as obedience or defiance rather than my own preference.','Conform reflexively or oppose on principle without considering the issue.',
    'Is a reasoned third option actually available?','Autonomy includes agreeing freely, disagreeing respectfully and changing one’s mind.',
    'When I choose an alternative for my own reasons, they insist it must mean loyalty or rebellion and refuse to discuss my reason.',
    'When I choose an alternative, they consider my stated reasons without forcing a loyalty label.');
  add('anxious-projection-label','A Concern Becomes a Permanent Defect',['interpretation-loops','family-duties'],[4,61,63],
    'Repeated vigilance and anxious correction frame ordinary behavior as proof that a person is defective or incapable.',
    'Their worry about my abilities may count more than evidence of what I can actually do.','Try to prove my competence in advance or avoid a choice I have not made yet.',
    'Is this a freely expressed concern, or is the prediction being enforced as a restriction despite relevant evidence?','A concern can be considered without assigning a permanent identity or removing an appropriate choice.',
    'When I consider a new responsibility, they say I cannot handle it and restrict my choice without considering my actual abilities.',
    'When I consider a new responsibility, they discuss concrete concerns and respect my opportunity to assess my abilities and make an appropriate choice.');
  add('idealized-relative-standard','Measured Against an Idealized Third Person',['triangular-conflict','interpretation-loops'],[4,70,73],
    'A current person’s actions are continually compared with an idealized relationship that cannot be reproduced.',
    'I may never meet a standard that is defined by another person’s image.','Imitate the comparison figure or give up expressing personal preferences.',
    'Is the desired behavior described concretely, or only by an unattainable comparison?','Specific requests are fairer than judging a person against a whole idealized identity.',
    'When I offer a practical compromise, they dismiss it because I am not like the person they admire.',
    'When I ask what they need, they describe the action instead of insisting I become another person.');
  add('speaking-over-capable-person','One Person Speaks for Another Without Permission',['family-duties','communication-patterns'],[4,70,75],
    'A person repeatedly answers on behalf of someone competent to speak, reducing that person’s opportunity to choose.',
    'My own answer may never be considered sufficient.','Wait to be represented or become silent in groups.',
    'Was advocacy requested, or was the voice taken without permission?','Support can amplify a voice instead of replacing it.',
    'When I am asked a question, they answer for me and prevent me from correcting their answer.',
    'When I am asked a question, they let me answer and offer help only if I request it.');
  add('triangular-loyalty-test','Affection Made Conditional on Rejecting Another Person',['triangular-conflict','family-rules'],[4,70,73],
    'An ordinary supportive relationship is recast as proof of disloyalty to a third person.',
    'Caring about them may require rejecting another relationship.','Conceal harmless contact or choose a side to keep peace.',
    'Is there a concrete breach of agreement or only a demand for exclusive loyalty?','Multiple appropriate attachments can coexist without betraying anyone.',
    'When I visit a supportive relative, they insist I prove loyalty by cutting that person off.',
    'When I maintain an appropriate outside bond, they respect it while discussing any specific conflict openly.');

  // Chapter 5: strategic problem-maintaining attempts, not speculative symptom functions.
  add('surface-tactic-unchanged-rule','Tactic Changes While the Rule Remains',['family-rules','interaction-cycles'],[5,81,87],
    'Successive tactics appear different, but each preserves the same unfair premise or distribution of authority.',
    'I may have to adjust constantly while the underlying demand never changes.','Offer new concessions without questioning the rule.',
    'Has the fundamental requirement itself been made open to review?','A meaningful change can revise a rule, not just its enforcement method.',
    'When I object to a one-sided rule, they offer different penalties but refuse to reconsider the rule.',
    'When I question a one-sided rule, they consider changing the requirement itself.');
  add('necessary-response-denied','Needed Action Replaced by Denial',['interaction-cycles','communication-patterns'],[5,85,87],
    'A genuine issue is repeatedly defined out of existence so that necessary attention or action is deferred.',
    'My concern may be invisible even when a concrete problem persists.','Repeat escalating pleas or stop seeking needed support.',
    'What independently observable problem needs a proportionate response?','Not every discomfort requires correction, but concrete harm warrants attention.',
    'When I report a recurring practical problem with evidence, they insist nothing needs to be done and refuse to examine it.',
    'When I report a recurring practical problem, they check the facts and discuss a proportionate response.');
  add('unnecessary-correction','Harmless Difference Treated as a Defect',['authority-and-power','interpretation-loops'],[5,85,87],
    'A personal variation is treated as a problem requiring correction despite no demonstrated harm or breached agreement.',
    'My harmless preferences may need official approval.','Hide ordinary variation or try to appear acceptable.',
    'What concrete harm or responsibility justifies demanding this change?','Differences do not automatically require a fix.',
    'When I choose a harmless personal style, they impose a corrective rule without identifying any harm.',
    'When I choose a harmless personal style, they respect it unless a specific safety or shared-duty issue arises.');
  add('wrong-level-substitution','Material Fix Substituted for Relational Need',['communication-patterns','interpersonal-boundaries'],[5,85,87],
    'A repeated solution addresses the wrong kind of need, such as purchasing something instead of hearing a concern.',
    'If I ask for connection, I may be told that a substitute should settle it.','Accept an unwanted substitute and hide the original request.',
    'Does the response address the need actually expressed, within each person’s capacity?','Practical gifts and emotional attention have different roles; neither is automatically owed.',
    'When I ask for a conversation about a problem, they repeatedly offer a purchase and forbid further discussion.',
    'When I ask for a conversation, they discuss whether and how they can make time to listen.');
  add('conditional-human-worth','Achievement Used as a Requirement for Respect',['interpretation-loops','family-rules'],[5,82,85],
    'An external success measure is treated as the prerequisite for basic dignity or belonging.',
    'I may be worth hearing only when I meet their benchmark.','Chase recognition by never feeling successful enough.',
    'Is the expectation about a specific agreed responsibility or about a person’s worth?','Goals can matter without becoming conditions for respect.',
    'When I miss an ambitious performance target, they say I no longer deserve respect or a voice.',
    'When I miss a performance target, they discuss the task without withdrawing basic respect.');
  add('contradictory-proof-ignored','Contrary Evidence Dismissed Without Review',['interpretation-loops'],[5,82,85],
    'A fixed assumption is protected by automatically rejecting evidence that would require revising it.',
    'Nothing I show may be sufficient to change their judgment.','Collect more and more proof or stop offering any.',
    'Can a concrete disconfirming fact genuinely update the conclusion?','Beliefs can be held tentatively and revised after relevant evidence.',
    'When I provide a verifiable counterexample, they declare it irrelevant solely because it contradicts their label.',
    'When I provide a verifiable counterexample, they consider whether their earlier conclusion needs revision.');
  add('unnegotiable-bargain','Exchange With No Real Choice',['family-duties','authority-and-power'],[5,87,92],
    'A purported negotiation offers only compliance or disproportionate loss, without meaningful agreement over terms.',
    'Calling a demand a bargain may not mean I can refuse.','Accept terms before assessing whether the exchange is fair.',
    'Could either person decline or propose an alternative without threats?','Reciprocity requires feasible, voluntary and proportionate terms.',
    'When I propose another fair arrangement, they threaten unrelated losses and call the demand a mutual bargain.',
    'When I ask to revise an arrangement, they discuss workable terms without using threats as leverage.');
  add('authority-recreates-conflict','Helper Repeats the Same Demand–Withdrawal Cycle',['interaction-cycles','authority-and-power'],[5,94,97],
    'An authority trying to resolve a disagreement recreates pressure, invalidation and retreat within their own intervention.',
    'A person offering help may use the same pressure I hoped to escape.','Comply outwardly or withdraw from help without being heard.',
    'How does the helper respond to dissent in the actual interaction?','An expert can remain accountable to transparent feedback.',
    'When I tell them a proposed intervention feels coercive, they increase demands and blame me for withdrawing.',
    'When I describe a problem with the helping process, they listen and adjust the approach when appropriate.');

  // Chapter 6: flexible structures, autonomy and properly sized support.
  add('premature-rescue','Rescue Before Help Is Needed',['family-duties','interpersonal-boundaries'],[6,101,108],
    'Unasked-for rescue prevents the person from demonstrating an ability they already possess.',
    'If I attempt independence, they may take over before I can succeed.','Stop trying or seek permission for routine decisions.',
    'Was there a genuine risk, incapacity or request for aid?','Help can be available without replacing competent action.',
    'When I start a manageable task, they repeatedly take over and later cite my lack of practice as incapacity.',
    'When I start a manageable task, they allow me to try and assist if I ask.');
  add('support-withheld-at-need','Support Refused Despite Recognized Dependence',['interpersonal-boundaries','family-duties'],[6,103,108],
    'Necessary help is withheld while the person still lacks realistic access to an alternative.',
    'I may be expected to manage a need beyond my capacity alone.','Conceal vulnerability or overextend to avoid rejection.',
    'What responsibility, capacity and alternative support are actually present?','Reasonable limits on help coexist with duty to address genuine dependencies.',
    'When I explain a task is beyond my current capacity, they refuse required support and forbid safe alternatives.',
    'When I explain my limit, they consider age, capacity and available support before deciding on help.');
  add('interrupted-private-exchange','A Third Person Controls Private Conversation',['interpersonal-boundaries','triangular-conflict'],[6,103,113],
    'A person repeatedly enters or overrides a conversation between two others who can speak for themselves.',
    'My direct relationship may require their supervision or permission.','Avoid private conversations or defer to an intermediary.',
    'Was third-party involvement invited, protective, or repeatedly intrusive?','Two people can have privacy without severing other supportive ties.',
    'When I try to speak privately with a trusted person, they interrupt and insist every exchange pass through them.',
    'When I ask for a private conversation, they respect the request unless a real safety duty requires intervention.');
  add('role-locked-by-history','Past Task Becomes Permanent Authority',['family-rules','family-duties'],[6,100,108],
    'A division of labor that once fit is treated as an immutable identity after abilities and circumstances change.',
    'A previous responsibility may permanently define what I am allowed to do.','Continue unwanted duties out of habit or shame.',
    'Was the role freely renewed, and does it still fit current capacity?','Cooperative roles should be reconsidered when they stop working.',
    'When I explain that a former caretaking role is no longer sustainable, they say it is who I am and cannot change.',
    'When my responsibilities change, they discuss redistributing tasks rather than treating an old role as permanent.');
  add('protected-conflict-detour','Two-Person Conflict Redirected Into My Conduct',['triangular-conflict','interpretation-loops'],[6,104,110],
    'Instead of discussing their disagreement, people repeatedly treat a third person’s unrelated behavior as the central problem.',
    'I may be made responsible for tension that precedes my involvement.','Overcorrect minor conduct to restore calm between others.',
    'Did the underlying dispute exist independently of the accused behavior?','Each problem should be addressed with its actual participants and safety context.',
    'When I make an ordinary mistake, they use it to avoid their unresolved dispute and make me its sole cause.',
    'When I make a mistake, they address it proportionately and handle their separate dispute directly.');

  // Chapter 7: feeling-permission, defensive stances and attachment repair.
  add('prohibited-feeling','Emotion Itself Treated as Misconduct',['emotional-expression','family-rules'],[7,117,120],
    'A person is punished for reporting a feeling even when their behavior remains safe and respectful.',
    'I must never feel anger, sadness or fear if they disapprove.','Deny feelings or withdraw from honest discussion.',
    'Was a harmful action limited, or was the mere emotion forbidden?','People may feel strongly and remain accountable for what they do.',
    'When I calmly admit feeling angry, they punish me for having the feeling although I have not acted aggressively.',
    'When I calmly describe anger, they allow the feeling and discuss safe conduct separately.');
  add('blame-as-self-protection','Defensive Blame Replaces a Specific Concern',['emotional-expression','communication-patterns'],[7,117,121],
    'A difficult exchange is diverted into global accusations rather than naming actions and vulnerable feelings.',
    'If I express concern, the conversation may become a character trial.','Attack first or withhold the original issue.',
    'What act is being requested or repaired, distinct from a label?','Specific responsibility can be discussed without declaring a person defective.',
    'When I ask about a missed agreement, they accuse me of being a bad person instead of discussing the agreement.',
    'When I ask about a missed agreement, they describe their view of the event and discuss a specific repair.');
  add('emotion-deflection','A Serious Feeling Deflected Into an Unrelated Topic',['emotional-expression','communication-patterns'],[7,117,122],
    'Irrelevant diversions repeatedly prevent a person’s expressed concern from receiving acknowledgment.',
    'My distress may be treated as a topic to escape.','Stop voicing feelings or switch topics to be tolerated.',
    'Is the shift an agreed pause, or a repeated refusal to return to the issue?','A person can pause a difficult conversation while keeping the concern on the agenda.',
    'When I describe something painful, they change to an unrelated topic and refuse to return to what I said.',
    'When I describe something painful, they acknowledge it or request a clear time to return to the conversation.');
  add('hyperrational-dismissal','Feelings Treated as Invalid Until Proven Logically',['emotional-expression','interpretation-loops'],[7,118,122],
    'Detached factual analysis is used to avoid recognizing an emotional experience at all.',
    'My feelings may count only after I win a logical argument.','Overexplain emotions with evidence or stop sharing them.',
    'Can the feeling be heard separately from whether the explanation is accurate?','Fact-checking and emotional acknowledgment can happen together.',
    'When I say I feel hurt, they demand proof that my feeling is rational before agreeing to listen.',
    'When I say I feel hurt, they acknowledge my feeling while checking the facts fairly.');
  add('forced-emotional-disclosure','Openness Demanded Without Consent',['emotional-expression','authority-and-power'],[7,119,125],
    'A person is pressured to reveal private feelings immediately despite clearly saying they are not ready.',
    'I may not be entitled to decide when or how to disclose my feelings.','Share prematurely or avoid all emotional conversations.',
    'Is there an immediate safety need, or simply another person’s wish for disclosure?','Emotional honesty requires room to choose when a disclosure is safe.',
    'When I say I am not ready to discuss a private feeling, they threaten consequences until I reveal it.',
    'When I say I am not ready to discuss a private feeling, they respect my limit and leave room for later conversation.');
  add('favored-unfavored-story','Good and Bad Roles Assigned by Selective Attention',['interpretation-loops','family-rules'],[7,123,128],
    'One person’s actions are filtered through a favored persona while a comparable person’s actions confirm a negative role.',
    'My conduct may be judged by my role more than by the event.','Compete for recognition or give up trying to be seen fairly.',
    'Were comparable events treated by comparable, behavior-based criteria?','Fair attention can include each person’s needs and mistakes without fixed identities.',
    'When I make the same minor mistake they excuse in another person, they call it proof that I am the bad one.',
    'When I make a mistake, they apply the same relevant standards used for a comparable person.');
  add('unseen-sibling-needs','Visible Crisis Replaces Everyone Else’s Needs',['family-duties','interpersonal-boundaries'],[7,123,130],
    'Persistent attention to the most distressed person leaves another person’s reasonable needs repeatedly unheard.',
    'I may be expected to have no needs because another person needs more support.','Hide requests and become prematurely self-sufficient.',
    'Can urgent needs be addressed while protecting reasonable attention for others?','Needs may differ without making a quieter person invisible.',
    'When I ask for ordinary care, they say I must never need attention because they focus on another person.',
    'When I ask for ordinary care, they consider my need while also recognizing other responsibilities.');
  add('injury-without-repair','Specific Rupture Repeatedly Left Unaddressed',['emotional-expression','interaction-cycles'],[7,118,128],
    'A concrete breach of trust is followed by defensiveness or minimization instead of acknowledgment and accountable repair.',
    'Raising a past injury may trigger rejection rather than repair.','Reassure prematurely or repeatedly test whether the injury matters.',
    'Was a particular harm acknowledged and were future actions made consistent?','Repair can include apology, changed conduct and time; forgiveness is not mandatory.',
    'When I describe a specific trust violation, they dismiss it as my overreaction and repeat the same conduct.',
    'When I describe a trust violation, they acknowledge the effect and discuss concrete future boundaries.');

  // Chapter 8: psychoanalytic hypotheses translated into observable process.
  add('provocation-then-condemnation','Reaction Provoked and Used as a Persona',['interaction-cycles','interpretation-loops'],[8,135,139],
    'Repeated goading followed by condemnation of the predictable reaction can preserve a damaging label.',
    'If I react, my response may be used to confirm their account of me.','Suppress every response or escalate to defend my character.',
    'What was said before the reaction, and is each person responsible for their own conduct?','Provocation is relevant context but never excuses violence or threats.',
    'When I ask them to stop repeated insults, they intensify them and then label my upset response as proof that I am unstable.',
    'When I say an exchange is hurtful, they stop the insults and evaluate each action without permanent labels.');
  add('all-good-all-bad-shift','Whole Person Reduced to Extreme Verdicts',['interpretation-loops'],[8,135,141],
    'An isolated positive or negative interaction leads to a total reversal of the other person’s character.',
    'One disagreement may erase all of my previously acknowledged contributions.','Avoid normal conflict or chase complete approval.',
    'Are both strengths and concerns allowed to remain true simultaneously?','Mixed evidence is ordinary; neither one mistake nor one kind act determines everything.',
    'When I disagree once, they say all my previous care was fake and that I have never done anything good.',
    'When I disagree, they discuss that issue without erasing the many different things they have observed about me.');
  add('unspoken-caretaking-contract','Care Expected Without Agreement',['family-duties','communication-patterns'],[8,140,145],
    'A person treats an unstated obligation to provide attention or care as binding and punishes failure to intuit it.',
    'I may be guilty of neglect whenever I fail to guess a need.','Monitor continually and preempt possible complaints.',
    'Was the need communicated, and was the requested help realistic?','Care can be requested clearly and negotiated without mind-reading.',
    'When I fail to anticipate a need they never expressed, they accuse me of breaking an agreement that was never discussed.',
    'When they need support, they tell me what would help and accept an honest discussion of my capacity.');
  add('scarcity-moral-verdict','Practical Resource Dispute Turned Into Character Judgment',['family-duties','interpretation-loops'],[8,143,145],
    'A disagreement over time, money or care is framed as proof of selfishness or moral failure instead of examining constraints.',
    'If I cannot give more, they may conclude I do not care.','Overgive or conceal resource limitations.',
    'What resources and agreed obligations are actually available?','Different histories of scarcity deserve empathy and practical negotiation.',
    'When I explain I cannot afford a request, they declare I am uncaring and refuse to discuss the actual figures.',
    'When I explain my limit, they discuss the resources and alternatives without equating capacity with worth.');
  add('surveillance-called-care','Monitoring Justified Solely as Affection',['interpersonal-boundaries','authority-and-power'],[8,140,143],
    'Uninvited observation or tracking is treated as proof of care even after a competent person objects.',
    'If they love me, I may be expected to surrender privacy.','Hide ordinary movements or accept intrusive monitoring.',
    'Is monitoring consensual, necessary for safety, and proportionate to dependency?','Caring concern and independent privacy can coexist.',
    'When I ask them to stop checking private communications, they insist love entitles them to inspect everything.',
    'When I set a reasonable privacy boundary, they respect it while discussing any specific safety concern.');

  // Chapter 9: observable consequences and distinguishable cognitive errors.
  add('aversive-compliance-cycle','Punishment and Withdrawal Reinforce Compliance',['interaction-cycles','learning-and-expectations'],[9,150,155],
    'Criticism, nagging or punitive distance repeatedly end only after a person yields, making coercion more likely to recur.',
    'The quickest way to end pressure may be giving in even when the demand is unfair.','Concede immediately or use counterpressure in later conflicts.',
    'What reliably ends the aversive action, and is the condition fair?','Disagreement can end through a pause or agreement without punishing either person.',
    'When I decline a demand, they persist with insults until I give in and then stop the insults.',
    'When I decline a demand, they state their view without prolonged insults or making peace conditional on surrender.');
  add('cross-complaint-derailment','Every Concern Met by a Counteraccusation',['communication-patterns','interaction-cycles'],[9,151,159],
    'A specific grievance is repeatedly answered with a separate accusation, preventing either issue from being addressed.',
    'Raising a concern may mean defending myself against a new charge.','Prepare counterexamples instead of finishing one issue.',
    'Can each concern be considered on its own evidence?','Two legitimate concerns can be discussed separately without cancelling either.',
    'When I ask about one missed agreement, they immediately accuse me of an unrelated failure and refuse to discuss the first.',
    'When I ask about a missed agreement, they address it before raising a separate concern.');
  add('topic-sidetracking','Small Detail Used to Avoid the Main Request',['communication-patterns'],[9,151,157],
    'A minor factual detail takes over a conversation until the central reasonable request is no longer considered.',
    'I may need perfect wording before my concern can be discussed.','Rehearse language obsessively or abandon the request.',
    'Was the wording issue important enough to change the substantive question?','Clarifying a detail should help, not indefinitely prevent, addressing the issue.',
    'When I make a specific request, they debate an unrelated word I used and refuse to address the request.',
    'When I correct a minor detail in my request, they return to its substance and respond.');
  add('arbitrary-inference','Conclusion Reached Without Supporting Event',['interpretation-loops'],[9,152,153],
    'A conclusion about intent or likely harm is stated as fact despite the absence of relevant observations.',
    'Their suspicion may count as proof against me.','Defend harmless actions against accusations without evidence.',
    'What concrete event supports the claim, and what other explanations fit?','A hunch can become a question without becoming a verdict.',
    'When I am quiet, they announce that I am plotting against them without any supporting action.',
    'When I am quiet, they ask if anything is wrong without declaring that they know my thoughts.');
  add('single-event-generalization','One Event Treated as the Rule for Every Time',['interpretation-loops','learning-and-expectations'],[9,152,153],
    'A limited observation is extended to all situations or to a permanent expectation of future behavior.',
    'One mistake may define what they expect from me forever.','Try to prove myself faultless or stop participating.',
    'How frequent are the actions, and are known exceptions acknowledged?','A pattern claim requires repeated relevant examples and room for change.',
    'When I miss a single appointment, they say I never keep commitments and ignore my other attendance.',
    'When I miss an appointment, they discuss that occurrence without making an absolute claim about every commitment.');
  add('magnify-minimize-evidence','Importance of Events Reweighted to Fit a Verdict',['interpretation-loops'],[9,152,153],
    'An error is inflated while a comparable success or harm is dismissed as insignificant without a consistent reason.',
    'My mistakes may count for everything while my progress counts for nothing.','Conceal errors or work excessively for recognition.',
    'Would the same scale of importance apply to comparable events?','A fair assessment considers magnitude, consequences and context consistently.',
    'When I correct an error, they describe the original mistake as catastrophic and call the repair meaningless.',
    'When I make an error and repair it, they weigh both its actual effect and the repair proportionately.');
  add('personalized-blame','Unrelated Events Interpreted as Attacks on Them',['interpretation-loops','interaction-cycles'],[9,152,153],
    'A person treats another’s separate circumstance as deliberately aimed at them without checking the connection.',
    'Even unrelated events may become evidence I have offended them.','Provide preemptive explanations for ordinary choices.',
    'What shows the event was actually directed toward that person?','Effects can be discussed without assuming that another person caused them on purpose.',
    'When I change my schedule for a documented need, they insist the change was meant to insult them.',
    'When I change my schedule, they ask about its effect on shared plans without assuming an insult.');
  add('all-or-nothing-evaluation','Only Perfect Compliance or Total Failure Count',['interpretation-loops','authority-and-power'],[9,152,154],
    'A graded outcome is forced into a perfect-or-worthless category, preventing recognition of partial effort and reasonable limits.',
    'Anything short of full compliance may be treated as complete failure.','Overwork or stop attempting achievable improvements.',
    'Are partial improvements relevant and realistically measurable?','Progress can be incomplete while still real; safety limits are not negotiable.',
    'When I complete most of an agreed task and explain an obstacle, they say I have done absolutely nothing.',
    'When I complete part of a task, they recognize the actual work and address what remains.');
  add('mind-reading-certainty','Assumed Knowledge of Private Thoughts',['interpretation-loops','communication-patterns'],[9,152,160],
    'A person refuses to ask about another’s intentions because their interpretation is treated as direct access to thoughts.',
    'I may not be permitted to explain my actual intention.','Overexplain or suppress any ambiguous action.',
    'Did the person state their thought, or is it being guessed?','A guess about a thought can be checked without accusing.',
    'When I describe my actual intention, they insist they know what I secretly think and refuse my answer.',
    'When I explain my intention, they consider it alongside the observable effect of what I did.');
  add('argument-rebuttal-listening','Listening Replaced by Preparing a Defense',['communication-patterns'],[9,158,163],
    'A conversation becomes competing rebuttals rather than turns in which each concern is accurately heard.',
    'I may have to win an argument before I am understood.','Interrupt or compile counterarguments while the other speaks.',
    'Can each person summarize what was said before answering it?','Listening carefully does not mean agreeing or conceding responsibility.',
    'When I describe a concern, they interrupt repeatedly with a prepared defense and cannot state what I said.',
    'When I describe a concern, they let me finish and check their understanding before replying.');

  // Chapter 10: power-to versus power-over, external conditions and chosen identity.
  add('declared-equality-unshared-labor','Equal Partnership Claimed, Unequal Work Enforced',['family-duties','authority-and-power'],[10,170,173],
    'A shared ideal of equal decision or care is contradicted by repeated unequal duties and penalties for seeking balance.',
    'I may be told the arrangement is equal while carrying unchosen extra work.','Take responsibility silently to maintain the public ideal.',
    'Who actually does the work, who controls decisions, and can roles be revised?','Equity considers capacity, consent, resources and real contributions.',
    'When I ask to share recurring tasks, they praise equality but refuse any redistribution and shame me for asking.',
    'When I ask to review task distribution, they examine actual workload and discuss changes that respect my limits.');
  add('economic-dependence-leverage','Resources Used to Control Personal Choices',['authority-and-power','family-duties'],[10,171,176],
    'Control over housing, money, transportation or other essentials is used to dictate unrelated personal choices.',
    'My access to necessities may depend on pleasing them beyond legitimate agreements.','Accept unrelated demands to preserve basic stability.',
    'What obligation is relevant to the resource, and what are the person’s safe alternatives?','Resource sharing can include fair conditions without coercing unrelated identity or relationships.',
    'When I decline an unrelated personal demand, they threaten to remove an essential resource they control.',
    'When I make an independent personal choice, they keep legitimate resource agreements separate from retaliation.');
  add('structural-barrier-as-fault','Practical Barriers Recast as Personal Failings',['interpretation-loops','authority-and-power'],[10,174,177],
    'Lack of money, transport, accessible services or time is treated as moral evidence against a person without checking constraints.',
    'They may call my effort worthless when real barriers prevent a result.','Hide need or take unsafe shortcuts to meet expectations.',
    'What material circumstances and feasible alternatives were actually available?','Accountability includes recognizing real resources, not just desired outcomes.',
    'When I explain an inaccessible service or unaffordable cost, they accuse me of laziness without checking the barrier.',
    'When I describe a barrier, they consider what options are realistically available before judging my response.');
  add('social-norm-enforcement','Cultural Expectation Presented as Unquestionable Law',['family-rules','authority-and-power'],[10,170,177],
    'A social convention is imposed as a nonnegotiable obligation despite alternative harmless preferences.',
    'My accepted identity may depend on conforming to an outside role script.','Conceal difference or repeat the rule on others.',
    'Is the expectation actually an agreed duty, or an inherited convention?','Traditions can be meaningful without authorizing threat or coercion.',
    'When I question a harmless conventional role, they demand compliance solely because people like me must behave that way.',
    'When I question a role expectation, they explain its meaning and allow room for different choices.');
  add('intergenerational-sacrifice-control','Sacrifice Used to Dictate Adult Life Decisions',['family-duties','family-rules'],[10,176,177],
    'Past family hardship is invoked as an entitlement to choose a younger person’s career, residence or partner.',
    'Their sacrifices may mean my adult choices must be made for them.','Choose an unwanted path to avoid guilt.',
    'Can gratitude coexist with the affected adult’s informed choice?','Sacrifice can be honored without converting appreciation into unlimited authority.',
    'When I choose my own career, they say past sacrifices give them final control over my decision.',
    'When I choose a career, they share their hopes while acknowledging I must live with the choice.');
  add('identity-used-as-risk-label','Protected Identity Treated as Proof of Harm',['interpretation-loops','authority-and-power'],[10,174,178],
    'A person’s social identity is used to predict misconduct or deny ordinary rights in the absence of individual evidence.',
    'They may decide what I am capable of before seeing my conduct.','Overperform or hide a part of myself to be treated fairly.',
    'Was a specific action assessed, or was identity itself treated as evidence?','Identity differences cannot establish character, dangerousness or moral worth.',
    'When I request an ordinary opportunity, they deny it solely because of my identity and offer no action-based reason.',
    'When I request an opportunity, they use relevant actions and responsibilities rather than stereotypes.');
  add('digital-agreement-breach','Private Digital Conduct and Actual Agreements',['interpersonal-boundaries','communication-patterns'],[10,179,183],
    'A concrete digital privacy or relationship agreement is broken while the dispute is reframed as entitlement to monitor all behavior.',
    'My digital choices may be judged by hidden rules or unlimited surveillance.','Conceal ordinary contact or accept invasive searches as reassurance.',
    'What was actually agreed, and does the proposed monitoring protect safety or exceed consent?','Digital boundaries should be explicit, proportionate and revisable; consensual private conduct is not inherently harmful.',
    'When I ask what digital agreement applies, they refuse clarity and demand unrestricted access to my accounts.',
    'When I ask about digital boundaries, they discuss actual agreements without requiring unrestricted surveillance.');

  // Chapter 11: contextual care, autonomy and genuinely negotiated commitments.
  add('rescuer-to-abandoner-cycle','Overpromised Rescue Followed by Sudden Withdrawal',['interaction-cycles','family-duties'],[11,192,193],
    'An authority takes over excessive responsibility, becomes overwhelmed, and then withdraws promised support without a transition.',
    'Accepting help may lead to unexpected abandonment when they tire of helping.','Avoid relying on others or urgently overcompensate.',
    'What was promised, what limits were disclosed, and was a safe transition offered?','Honest capacity and shared planning are more dependable than total rescue.',
    'When I rely on help they insisted on taking over, they abruptly withdraw without notice and blame me for needing it.',
    'When they cannot continue helping me, they give clear notice and collaborate on safe next steps.');
  add('coparent-dispute-contamination','Old Partner Conflict Blocks Separate Care Duties',['triangular-conflict','family-duties'],[11,186,189],
    'An unresolved adult relationship dispute is used to prevent discussion of a separate, legitimate caregiving duty.',
    'My care needs may be secondary to an old dispute between adults.','Avoid asking for support to keep sides apart.',
    'Is contact safe, and what specific responsibility remains regardless of past conflict?','A terminated relationship and a continuing care obligation are different questions.',
    'When I request ordinary care that is safe to arrange, they make it conditional on settling their unrelated dispute.',
    'When I request appropriate care, they consider it separately from past adult disagreement and safety needs.');
  add('implicit-commitment-terms','Relationship Agreement Assumed Rather Than Discussed',['communication-patterns','interpersonal-boundaries'],[11,189,191],
    'Rules about exclusivity, care, finances or privacy are assumed to be shared without explicitly checking whether they were agreed.',
    'I may be condemned for breaking a rule I never knew they assumed.','Guess what commitment means instead of requesting clarity.',
    'What was actually agreed, by whom, and under what circumstances?','Different freely chosen arrangements can be legitimate; unambiguous mutual consent matters.',
    'When I ask what my agreement with them actually is, they insist their unstated assumption was always binding on me.',
    'When I ask about a commitment, they explain their expectations and invite a clear agreement or disagreement.');
  add('needed-rest-called-neglect','Recovery or Care Limits Framed as Moral Failure',['family-duties','interpretation-loops'],[11,193,195],
    'A medically or practically necessary limit is judged as laziness or lack of loyalty despite evidence of genuine capacity limits.',
    'Resting when I need to may be punished as selfishness.','Overextend beyond health or avoid asking for accommodations.',
    'Are needs and limits grounded in actual health and responsibilities, not stereotypes?','A fair task division can adapt to illness and recovery without blaming the family for the illness.',
    'When I explain a documented recovery need, they insist I perform at my prior pace and call my rest selfish.',
    'When I explain a health-related limit, they adjust expectations with appropriate professional guidance.');

  // Chapters 12–13: agency-enhancing counterevidence without forced positivity.
  add('forced-positive-account','Distress Silenced by Mandatory Optimism',['emotional-expression','authority-and-power'],[12,211,216],
    'An authority insists on discussing only good outcomes and treats an unresolved harm as an unacceptable complaint.',
    'My distress may be denied unless I can describe an improvement first.','Perform optimism and conceal ongoing danger or need.',
    'Does the positive question allow an honest answer about harm and stalled progress?','Hope can support change while still acknowledging actual pain and safety needs.',
    'When I report a continuing harmful event, they refuse to hear it and demand I describe only positive experiences.',
    'When I report ongoing harm, they acknowledge it before inviting me to consider possible exceptions.');
  add('prescribed-goal-instead-of-choice','An Expert’s Goal Substituted for Mine',['authority-and-power','family-rules'],[12,201,204],
    'A person with influence defines the outcome I should want and dismisses my own stated priorities.',
    'Improvement may mean becoming what they want rather than exercising agency.','Pursue the approved goal or hide what actually matters.',
    'Who chose the goal, and may it be revised without penalty?','Useful change can start from the affected person’s clearly chosen, safe and feasible goal.',
    'When I describe what I hope to change, they insist only their different goal is acceptable without discussing mine.',
    'When I state my goal, they help clarify it and respect my right to change direction.');
  add('positive-exception-discredited','Better Moments Dismissed as Irrelevant',['interpretation-loops','learning-and-expectations'],[12,199,207],
    'A problem is described as constant even when concrete instances of different, effective behavior exist.',
    'Successful changes may never count against the established description.','Conclude that effort cannot matter and stop noticing progress.',
    'Were genuine exceptions confirmed, or merely wished for?','Small counterexamples matter but do not erase serious harm elsewhere.',
    'When I point to a recent specific improvement, they deny it counts because their story says I never improve.',
    'When I point to a real improvement, they recognize it while considering any problems that remain.');
  add('totalizing-problem-identity','A Difficulty Becomes the Whole Person',['interpretation-loops','family-rules'],[13,219,223],
    'A behavior, feeling or struggle is repeatedly used as a complete identity that excludes unrelated abilities.',
    'They may see my difficulty as all of who I am.','Hide struggles or live according to the imposed description.',
    'Can both the difficulty and specific examples of competence be named?','People can be responsible for conduct without being reduced to one problem.',
    'When I describe a problem I am working on, they call that problem my entire identity and refuse to acknowledge other actions.',
    'When I describe a difficulty, they address it without treating it as my permanent identity.');
  add('social-story-carried-outward','Inherited Judgment Reapplied to New Relationships',['learning-and-expectations','interpretation-loops'],[13,219,228],
    'A controlling rule learned in one setting is applied to a different person without checking that person’s actual behavior.',
    'I may expect or impose the same role rule even when the current relationship differs.','Monitor harmless deviations or demand conformity from people around me.',
    'Does the same rule actually apply here, or is this a learned expectation?','Changing context permits a fresh assessment and respect for another person’s independence.',
    'When I express a harmless difference, they enforce a rule from their earlier household without discussing whether it fits here.',
    'When I express a harmless difference, they consider my actual conduct instead of assuming an old household rule applies.');

  // Chapters 14–15: integration and research-informed humility.
  add('preferred-identity-overridden','A Person’s Self-Description Displaced by an Assigned Role',['interpretation-loops','authority-and-power'],[14,242,244],
    'A repeatedly imposed persona conflicts with a person’s demonstrated preferred ways of acting and being understood.',
    'Their preferred identity for me may matter more than my actions or choices.','Perform the imposed role or fight to disprove it in every exchange.',
    'What does the person actually prefer, and what behavior supports or contradicts each view?','Self-description deserves consideration alongside action-based accountability.',
    'When I describe the kind of responsibility I want to take, they insist on an old role and reject examples of how I act.',
    'When I describe my preferred role, they consider my goals and actual conduct without fixing my identity for me.');
  add('acceptance-used-to-demand-tolerance','Acceptance of Difference Confused With Enduring Harm',['interpersonal-boundaries','authority-and-power'],[14,244,245],
    'An appeal to tolerance of ordinary differences is misused to demand acceptance of threats, abuse or broken safety boundaries.',
    'I may be expected to prove kindness by remaining exposed to harm.','Normalize warning signs or abandon protective limits.',
    'Is the difference benign, or does it violate safety or consent?','Accepting personality differences never requires accepting violence or coercion.',
    'When I set a safety boundary after a threat, they say acceptance means I must tolerate the threat.',
    'When I set a boundary against threats, they respect my safety even if they disagree with other preferences.',true);
  add('unrealistic-change-responsibility','External Constraint Blamed on My Effort',['interpretation-loops','authority-and-power'],[15,253,257],
    'A lack of progress is attributed to unwillingness even when material, social or institutional obstacles have not changed.',
    'If circumstances do not improve, they may decide I have failed morally.','Blame myself for inaccessible opportunities or hide the barrier.',
    'What changed in resources, safety, access and agency as well as individual effort?','Effort matters but cannot always overcome external conditions alone.',
    'When I show that a required service is unavailable, they say my lack of progress proves I refuse to change.',
    'When I explain a real external obstacle, they acknowledge it and explore feasible options rather than assigning fault.');
  add('expert-certainty-overstated','Uncertain Theory Presented as Settled Verdict',['authority-and-power','interpretation-loops'],[15,248,255],
    'An authority claims their interpretation is scientifically certain while avoiding relevant limitations, conflicting evidence or direct feedback.',
    'A confident explanation may feel impossible to question.','Accept an untested label or stop giving corrections.',
    'What observation or study supports this specific claim, and what remains unknown?','Expert knowledge deserves respect and can remain open to correction.',
    'When I ask what supports their conclusion about me, they insist their credentials make further evidence unnecessary.',
    'When I ask about their conclusion, they explain what evidence supports it and what they do not know.');
  add('forgiveness-as-obligation','Forgiveness Demanded Before Safety or Repair',['emotional-expression','authority-and-power'],[15,251,253],
    'An account of reconciliation or research on forgiveness is turned into pressure to restore trust without sufficient repair.',
    'I may be told that healing requires immediate trust even while harm continues.','Conceal doubts or waive protective boundaries.',
    'Has the harmful conduct stopped, and does the harmed person freely choose any reconciliation?','Forgiveness and trust cannot be commanded, especially when coercion persists.',
    'When I say I need safety and time after a violation, they demand immediate forgiveness and threaten me if I refuse.',
    'When I say I need time after a violation, they respect my choice and focus on stopping the harmful conduct.',true);

  // The research ledger also lists non-adopted techniques, contested theories and cautions.
  const source='Nichols & Davis, Family Therapy: Concepts and Methods, 12th ed.';
  const existing=new Set(atlas.data.subroutines.map(s=>s.id));
  for(const r of entries){
    if(existing.has(r.id))throw Error('Duplicate V10 subroutine '+r.id);
    existing.add(r.id);
    if(!r.concern.match(/\b(?:I|me|my|mine|myself)\b/i)||!r.concern.match(/\b(?:they|them|their|theirs)\b/i)||!r.contrast.match(/\b(?:I|me|my|mine|myself)\b/i)||!r.contrast.match(/\b(?:they|them|their|theirs)\b/i))throw Error('Incomplete reversible actors '+r.id);
    atlas.records.push(r);
    atlas.data.subroutines.push({id:r.id,name:r.name,meaning:r.meaning,learned:r.learned,protective:r.protective,
      cues:[],check:r.check,grounded:r.grounded,source:`${source}, ch. ${r.cite[0]}, printed pp. ${r.cite[1]}–${r.cite[2]}`,
      sourceRef:{chapter:r.cite[0],printedPages:[r.cite[1],r.cite[2]],pdfPages:[r.cite[1]+27,r.cite[2]+27]}});
    for(const h of r.hubs){
      const hub=atlas.data.routines.find(x=>x.id===h);
      if(!hub)throw Error('Unknown V10 hub '+h);
      hub.subroutineIds.push(r.id);
    }
    atlas.evidence.entries.push({id:`v7-${r.id}-concern`,subroutineIds:[r.id],routineIds:r.hubs,
      kind:'repeats',severity:r.high?'high':'ordinary',statement:r.concern});
    atlas.evidence.entries.push({id:`v7-${r.id}-contrast`,subroutineIds:[r.id],routineIds:r.hubs,
      kind:'differs',severity:'ordinary',statement:r.contrast});
  }
  atlas.data.auditStatus='Book 1 systematically reviewed; original interpretations pending independent clinical audit';
  atlas.evidence.auditStatus='Reversible, user-reported observations; not validated clinical measures';
})();
