/* Clearframe V10: independent, source-led reconciliation beyond the V8 ten-hub grouping.
 * These are original editorial applications, not transcribed passages or clinical tests.
 * Each addition has a chapter and printed-page reference to Nichols & Davis, 12e.
 * Previous canonical subroutine and indicator IDs remain stable for import compatibility.
 * The new routine set is derived from distinct relational mechanisms; it has no quota.
 */
(() => {
  'use strict';
  const atlas=window.CLEARFRAME_V10_CATALOG;
  if(!atlas)throw Error('V10 source catalogue must load before expansion');
  const hub=(id,name,domain,summary,signals,then,now)=>({id,name,domain,summary,signals,then,now,short:name,subroutineIds:[],roleExamples:{guardian:'An authority figure interprets or enforces an expectation.',sibling:'Another participant can be affected or invited to enforce it.'}});

  // Distinctions derive from family systems, structural, communication, cognitive,
  // contextual, experiential and narrative theory. They are not types of people.
  const newHubs=[
    hub('assigned-persona-enforcement','Assigned Persona Enforcement','Interpretation','A description of a person becomes a condition on what that person is permitted to do.',['persona','role','quiet','scheming','obedient','assigned','identity','label'], 'A fixed description may have determined which conduct was allowed.','Separate an actual action from the persona used to explain and control it.'),
    hub('conditional-belonging','Conditional Belonging & Worth','Belonging','Respect, approval or belonging is made contingent on performance or emotional conformity.',['conditional','love','approval','worth','selfish','rejection','shame'], 'Approval may have required suppressing real needs or preferences.','Check whether respect depends on achieving an imposed role or standard.'),
    hub('unspoken-rule-enforcement','Unspoken Rules & Blocked Renegotiation','Rules','A governing expectation cannot be named, contested or adjusted despite changed circumstances.',['unwritten','rules','ask why','not allowed','transition','old rule'], 'Unclear rules may have made guessing feel safer than asking.','Make a rule explicit and assess whether it can be questioned safely.'),
    hub('narrative-certainty','Fixed Stories & Selective Evidence','Interpretation','Accounts of what happened are made immune to contrary evidence or the speaker’s own description.',['always','never','story','proof','mindreading','assume','reframe','blame'], 'An imposed verdict may have replaced direct evidence.','Look for specific examples that could change the account.'),
    hub('communication-process-gates','Control of Conversational Process','Communication','Turn-taking, tone, contradiction and forbidden topics determine whether a person may be heard.',['listen','interrupt','topic','tone','conversation','communication','silent'], 'Speaking may have carried costs separate from the content.','Evaluate observable treatment during discussion as well as the disagreement itself.'),
    hub('pursuit-distancing-pressure','Pursuit, Criticism & Distance','Interaction','Critical pursuit, defensive retreat and demands for closeness may become self-reinforcing patterns.',['pursue','withdraw','chase','retreat','silent','criticism','repair'], 'Distance or intensified pursuit may once have prevented an anticipated loss.','Distinguish protective pauses, clear contact boundaries and punitive withdrawal.'),
    hub('compelled-openness','Compelled Disclosure & Secrecy','Boundaries','Demands for private explanations, exposure or secrets are enforced beyond a justified role.',['private','explain','secret','disclose','monitor','permission','confidential'], 'Privacy may have felt like evidence of disloyalty.','Check actual consent and safety obligations before requiring disclosure.'),
    hub('carework-displacement','Displaced Care & Household Work','Responsibilities','Practical or emotional responsibilities are transferred, overconcentrated or imposed without capacity-based review.',['care','labor','chores','help','responsibility','parentification','burnout'], 'Anticipating needs may have protected belonging or prevented criticism.','Separate chosen contributions and age-appropriate support from enforced overload.'),
    hub('dependency-and-rescue','Dependency Through Rescue or Neglect','Structure','Help is supplied too early, withheld when needed or used to replace a capable person’s agency.',['rescue','dependent','take over','help','incapable','support'], 'Acting independently may have been penalized or blocked.','Match support to actual ability, consent, obligation and available alternatives.'),
    hub('coalition-pressure','Coalitions, Alliances & Blame Displacement','Alliances','Third-person pressure and alliances replace direct responsibility or turn another person into the problem.',['choose side','alliance','messenger','scapegoat','triangulation','gossip'], 'A direct disagreement may have become a loyalty test.','Distinguish safe outside support from organizing pressure or retaliation.'),
    hub('coercion-and-accountability','Coercion, Threats & Accountability','Safety','Threats, confinement, violence or retaliation are not excused by a relational theory or a kind act.',['threat','fear','force','block exit','coercion','assault','safety'], 'Complying may have been necessary for immediate safety.','Attribute harmful acts to their actor and prioritize safety over reconciliation.'),
    hub('resource-dependency-power','Economic & Resource Dependency','Power','Money, housing, caregiving or access to services is used to condition meaningful personal choices.',['money','housing','resources','employment','dependent','transport','financial'], 'Loss of needed resources may have made dissent costly.','Identify actual alternatives and whether limits are proportionate and transparent.'),
    hub('professional-authority','Professional & Institutional Authority','Institution','Help-seeking or expert language is used to override consent, impose an interpretation or substitute for a person’s voice.',['therapist','doctor','professional','expert','service','clinic','help'], 'A credentialed explanation may have seemed impossible to question.','Check consent, accountability, scope and willingness to revise a mistaken judgment.'),
    hub('social-norm-power','Cultural Norms & Unequal Standards','Context','Taken-for-granted social expectations are used to allocate voice, care, risk or authority unequally.',['culture','gender','tradition','respect','social','normal','inequality'], 'Belonging may have required obeying a norm presented as universal.','Evaluate a concrete duty and its consequences, not an identity or family form.'),
    hub('agreement-and-consent','Consent, Agreements & Mutual Limits','Agreement','A presumed obligation replaces a freely discussed and revisable agreement about relationship conduct.',['consent','agree','promise','deal','boundary','privacy','loyalty'], 'Having a need may have felt like entering an unstated contract.','Use actual shared agreements and legitimate boundaries without forced compliance.'),
    hub('failed-solutions','Failed Solutions & Suppressed Feedback','Change','Attempts to fix a problem repeat or intensify without evaluating their effects or revising their premise.',['same again','punish','fix','correct','worse','try','change'], 'Correction may have been expected to escalate regardless of results.','Assess actual outcomes and whether a more appropriate response can be negotiated.'),
    hub('transferred-old-rules','Old Expectations Imposed on New Relationships','Learning','Historical predictions are projected onto a current person despite different evidence or opportunity for choice.',['childhood','past','friend','trigger','expect','different','projection'], 'Vigilance or enforcement may have prevented earlier punishment.','Test the current situation without imposing an old conditional rule on another person.'),
    hub('digital-privacy-power','Digital Privacy & Network Pressure','Digital','Technology, surveillance and online access become settings for actual agreement disputes or unilateral control.',['phone','online','password','messages','track','internet','digital'], 'Connection or privacy may have been contingent on monitoring.','Separate agreed digital commitments from generalized suspicion or surveillance.'),
    hub('repair-and-change-choice','Repair, Differentiation & Change Choice','Change','Responsibility, repair, forgiveness and relationship continuation are chosen rather than compelled by a fixed story.',['apology','forgive','reconcile','change','goal','repair','leave'], 'Keeping peace may have felt more necessary than making an independent decision.','Check whether choices, repair and changed behavior are voluntary and observable.')
  ];
  const routineIndex=new Map(atlas.data.routines.map(r=>[r.id,r]));
  for(const h of newHubs){
    if(routineIndex.has(h.id))throw Error('Duplicate V10 routine: '+h.id);
    atlas.data.routines.push(h);routineIndex.set(h.id,h);
  }
  // Existing canonical records link to source-derived focused routines as well
  // as their original broad indexes. The source is not duplicated.
  const links={
    'assigned-persona-enforcement':['fixed-role-performance','role-conditioned-suspicion','role-based-double-standards','role-locked-by-history','anxious-projection-label','fixed-narrative-filter','preferred-identity-overridden','favored-unfavored-story','identity-used-as-risk-label','totalizing-problem-identity','prohibited-feeling'],
    'conditional-belonging':['conditional-human-worth','false-self-accommodation','compulsory-harmony','invisible-loyalty-debt','intergenerational-sacrifice-control','punishment-for-need','needed-rest-called-neglect','unseen-sibling-needs'],
    'unspoken-rule-enforcement':['family-rule-feedback','forbidden-rule-discussion','transition-rule-rigidity','surface-tactic-unchanged-rule','dominance-redefined-as-normal','conform-or-rebel-trap','unspoken-caretaking-contract','social-norm-enforcement'],
    'narrative-certainty':['fixed-narrative-filter','selective-confirmation','totalizing-problem-identity','mind-reading-certainty','arbitrary-inference','single-event-generalization','personalized-blame','all-good-all-bad-shift','contradictory-proof-ignored','role-conditioned-suspicion'],
    'communication-process-gates':['content-displaces-treatment','blocked-clarification','compliance-called-communication','incongruent-communication','emotion-deflection','topic-sidetracking','cross-complaint-derailment','argument-rebuttal-listening','expressed-support-enacted-dismissal'],
    'pursuit-distancing-pressure':['pursue-withdraw-cycle','punitive-silence-vs-safety-pause','emotional-cutoff','reciprocal-escalation','injury-without-repair','blame-as-self-protection','control-rebellion-polarization'],
    'compelled-openness':['forced-emotional-disclosure','restricted-outside-support','surveillance-called-care','interrupted-private-exchange','professional-boundary-exemption'],
    'carework-displacement':['emotional-parentification','instrumental-parentification','declared-equality-unshared-labor','unspoken-caretaking-contract','unseen-sibling-needs','needed-rest-called-neglect','intergenerational-sacrifice-control'],
    'dependency-and-rescue':['overfunctioning-dependency-loop','premature-rescue','support-withheld-at-need','speaking-over-capable-person','role-locked-by-history','rescuer-to-abandoner-cycle'],
    'coalition-pressure':['triangulated-messenger','cross-generational-coalition','scapegoated-member','third-party-amplification','third-party-camps','triangular-loyalty-test','coparent-dispute-contamination','protected-conflict-detour','one-sided-referral-story'],
    'coercion-and-accountability':['threat-backed-compliance','assault-excuse-transfer','economic-dependence-leverage','acceptance-used-to-demand-tolerance','forgiveness-as-obligation','unnegotiable-bargain'],
    'resource-dependency-power':['economic-dependence-leverage','structural-barrier-as-fault','unrealistic-change-responsibility','needed-rest-called-neglect','support-withheld-at-need'],
    'professional-authority':['one-sided-referral-story','coerced-help-agenda','professional-boundary-exemption','conflicting-helper-demands','authority-recreates-conflict','prescribed-goal-instead-of-choice','expert-certainty-overstated','forced-positive-account'],
    'social-norm-power':['social-norm-enforcement','role-based-double-standards','declared-equality-unshared-labor','identity-used-as-risk-label','intergenerational-sacrifice-control','structural-barrier-as-fault','scarcity-moral-verdict'],
    'agreement-and-consent':['implicit-commitment-terms','unnegotiable-bargain','digital-agreement-breach','forced-emotional-disclosure','restricted-outside-support','triangular-loyalty-test','coerced-help-agenda'],
    'failed-solutions':['more-of-same-solutions','corrective-punishment-backfire','surface-tactic-unchanged-rule','necessary-response-denied','unnecessary-correction','wrong-level-substitution','contradictory-proof-ignored','rescuer-to-abandoner-cycle'],
    'transferred-old-rules':['past-expectation-transfer','social-story-carried-outward','expectation-confirmation','personalized-blame','false-self-accommodation','mind-reading-certainty'],
    'digital-privacy-power':['digital-agreement-breach','surveillance-called-care','restricted-outside-support','identity-used-as-risk-label'],
    'repair-and-change-choice':['positive-exception-discredited','forgiveness-as-obligation','injury-without-repair','prescribed-goal-instead-of-choice','acceptance-used-to-demand-tolerance','unrealistic-change-responsibility']
  };
  const subIndex=new Map(atlas.data.subroutines.map(s=>[s.id,s]));
  for(const [hubId,ids] of Object.entries(links)){
    const hub= routineIndex.get(hubId);
    for(const id of ids){
      if(!subIndex.has(id))throw Error('V10 hub mapping lacks canonical subroutine: '+hubId+' / '+id);
      if(!hub.subroutineIds.includes(id))hub.subroutineIds.push(id);
      const evidence=atlas.evidence.entries.filter(e=>e.subroutineIds.includes(id));
      for(const item of evidence)if(!item.routineIds.includes(hubId))item.routineIds.push(hubId);
    }
  }

  const additions=[];
  const add=(id,name,hubs,cite,meaning,learned,protective,check,grounded,concern,contrast,high=false)=>{
    if(subIndex.has(id))throw Error('Duplicate V10 subroutine: '+id);
    additions.push({id,name,hubs,cite,meaning,learned,protective,check,grounded,concern,contrast,high});
  };

  // Additional source-distinct applications follow below. A mechanism is not
  // added merely because another chapter uses a different theoretical label.

  // Introduction, printed pp. 1–5: conditions of worth, structural decisions,
  // and the more specific criticism–withdrawal loop.
  add('affection-priced-by-authenticity','Affection Conditional on Hiding a Feeling',['conditional-belonging','emotional-expression'],['Introduction',4,4],
    'Acceptance is tied to expressing only the feelings another person approves of, rather than managing harmful conduct.',
    'I may lose connection if I show what I honestly feel.','Mask the feeling and give the expected answer.',
    'Is a feeling itself prohibited, or is a specific harmful action being limited?','Feelings can be acknowledged while choices and conduct remain accountable.',
    'When I express sadness or frustration respectfully, they withdraw affection until I say I no longer feel it.',
    'When I express sadness or frustration respectfully, they accept the feeling while discussing any conduct that needs changing.');
  add('criticism-withdrawal-spiral','Criticism Followed by Retreat and Renewed Criticism',['pursuit-distancing-pressure','interaction-cycles'],['Introduction',5,5],
    'Repeated criticism elicits protective retreat, which is interpreted as a reason to criticize even more.',
    'Stepping back may provoke greater attack, even when continuing feels unsafe.','Go silent, leave abruptly or overexplain to stop criticism.',
    'Does criticism increase when a safe pause is requested, and are later discussions possible?','A pause can reduce strain while both remain accountable for their conduct.',
    'When I pause after repeated criticism, they call the pause proof of my guilt and intensify the criticism.',
    'When I request a pause from criticism, they allow time and agree to return to a specific issue safely.');
  add('authority-scope-undefined','Decision Authority Claimed Without an Agreed Scope',['authority-and-power','unspoken-rule-enforcement'],['Introduction',1,3],
    'One participant treats a new or ambiguous relationship role as permission to decide matters affecting another person without discussion.',
    'Their relationship status may automatically override my choices.','Avoid decisions or submit before any scope has been clarified.',
    'Who actually has responsibility for the decision, and what was agreed?','Authority can be explained, limited and renegotiated with relevant participants.',
    'When I ask which decisions they may make for me, they refuse to define the limits and punish my independent choice.',
    'When I ask about their decision role, they explain its limits and allow appropriate input before making a shared plan.');

  // Chapter 1, pp. 7–23: complementary organization, mystification and alliances.
  add('polarized-complementary-positions','Only Opposite Positions Are Permitted',['family-rules','assigned-persona-enforcement'],[1,8,15],
    'Two people repeatedly occupy opposed roles, and the arrangement becomes compulsory even when one wants to act differently.',
    'If I initiate, they may treat me as violating my assigned passive role.','Perform the opposite of their usual position automatically.',
    'Can either person vary the role by choice without a penalty?','Complementary strengths are useful when both participants retain freedom to change roles.',
    'When I volunteer to lead a task they usually lead, they say I must remain the follower regardless of my ability.',
    'When I volunteer to lead a task, they consider my ability and agree that either person may take the lead.');
  add('felt-experience-redefined','My Stated Feeling Replaced With Their Version',['emotional-expression','narrative-certainty'],[1,12,14],
    'An authority repeatedly tells a person what that person actually feels, discounting their direct report.',
    'My own account of my feelings may not be accepted as evidence.','Agree to the imposed feeling or conceal private experience.',
    'Does the other person allow correction of their interpretation of my experience?','Another person may ask about feelings, but cannot establish them by decree.',
    'When I say I am frightened, they insist I am secretly enjoying the situation and refuse my correction.',
    'When I describe what I feel, they ask clarifying questions and accept that my direct account may differ from their guess.');
  add('competing-parental-recruitment','Competing Adults Recruit My Loyalty',['coalition-pressure','triangular-conflict'],[1,11,13],
    'Two authorities pursue their own dispute by asking a dependent participant to demonstrate loyalty against the other.',
    'Keeping either bond may require condemning the other person.','Try to please both sides or repeat each side’s accusation.',
    'Is the participant being given safe support or asked to arbitrate an adult conflict?','Adults can handle their disagreements without making a dependent person choose a faction.',
    'When I decline to take sides in their disagreement, they demand I publicly reject the other adult to prove allegiance.',
    'When I decline to choose a side, they leave the adult disagreement with the adults and allow my separate relationships.');
  add('care-language-hides-override','Care Stated While Choice Is Removed',['communication-process-gates','authority-and-power'],[1,7,13],
    'Warm or benevolent language accompanies an actual decision that bypasses the other person’s stated preference.',
    'A declaration of love may mean I am not allowed to object.','Express gratitude instead of naming the lost choice.',
    'Would the person still have a meaningful say if the comforting words were removed?','An expression of care is compatible with accountability for how a decision is made.',
    'When I say I do not want them to disclose my private concern, they call it loving support and disclose it anyway.',
    'When I explain a privacy preference, they listen and ask permission before involving another person.');

  // Chapter 2: reciprocal processes, context and power asymmetry.
  add('circularity-used-for-equal-blame','Mutual Influence Used to Assign Equal Blame',['coercion-and-accountability','interpretation-loops'],[2,32,37],
    'The fact that two people interact is used to minimize one person’s choice to threaten, restrain or harm the other.',
    'If I react to danger, I may be blamed equally for the dangerous action.','Stop reporting unsafe acts or try to take responsibility for their violence.',
    'What did each person actually do, and who controlled the harmful act?','Interaction patterns can be studied without distributing responsibility for threats or assault.',
    'When they threaten me and I ask for safety, they claim the argument makes me equally responsible for their threat.',
    'When I describe an unsafe act, they acknowledge the actor’s responsibility and do not offset it with my reaction.',true);
  add('situation-ignored-for-fixed-verdict','Relevant Outside Circumstances Refused Consideration',['interpretation-loops','resource-dependency-power'],[2,27,33],
    'A judgment about personal willingness is maintained while relevant work, school, disability or resource conditions are excluded.',
    'A real limitation may be dismissed as an excuse.','Promise what I cannot perform to avoid a character judgment.',
    'Are actual capacities and external constraints considered before deciding?','A fair expectation considers both the person and the surrounding system.',
    'When I explain a verified work conflict, they insist it proves I do not care and refuse to consider any schedule adjustment.',
    'When I explain a work conflict, they examine the practical constraint and discuss alternatives without declaring my character defective.');
  add('rule-process-prohibition','Asking About the Rule Becomes a New Violation',['unspoken-rule-enforcement','communication-process-gates'],[2,25,30],
    'Questions about how an expectation is applied are treated as misconduct, making correction of the rule impossible.',
    'I may be punished simply for asking how to comply.','Guess silently and obey without seeking clarification.',
    'Can the expectation and its exceptions be discussed without retaliation?','Discussing the rule is different from refusing every legitimate responsibility.',
    'When I ask how a rule applies to my situation, they add a penalty solely because I questioned the rule.',
    'When I ask how a rule applies, they explain its purpose and allow appropriate discussion of exceptions.');

  // Chapter 3: helping systems, consent and direct accountability.
  add('professional-ally-used-as-enforcer','Outside Professional Recruited to Enforce One Account',['professional-authority','coalition-pressure'],[3,39,46],
    'A professional is asked to validate a predetermined accusation rather than independently hear the affected person.',
    'A credential may make their accusation feel unchallengeable.','Agree with the initial story to avoid appearing resistant.',
    'Has the professional heard my own account and explained the purpose of involvement?','A professional alliance can remain fair without surrendering independent judgment.',
    'When I offer a different account, they tell the professional to ignore it and require the professional to endorse their accusation.',
    'When I offer my account, they permit the professional to consider it independently before deciding what support is appropriate.');
  add('confidentiality-threat-as-pressure','Privacy Threatened to Secure an Admission',['professional-authority','compelled-openness'],[3,49,51],
    'Sensitive information is threatened with unauthorized disclosure to obtain agreement or obedience.',
    'Seeking assistance may expose private information if I disagree.','Withhold needed information or repeat the demanded story.',
    'Is disclosure tied to a genuine, explained safety or legal duty, or retaliation?','Necessary limits of confidentiality can be stated before disclosure without using privacy as leverage.',
    'When I dispute their interpretation, they threaten to disclose my private account to unrelated people unless I agree.',
    'When I dispute their interpretation, they explain any legitimate confidentiality limit and do not threaten unrelated disclosure.');
  add('helper-speaks-in-place-of-client','Help Replaces the Person’s Own Voice',['professional-authority','dependency-and-rescue'],[3,41,45],
    'An authority takes over direct communication between capable participants, preserving dependency on the helper.',
    'I may need an intermediary to speak even when I can answer.','Let the helper decide my position or avoid direct discussion.',
    'Was representation requested and safe, or imposed despite my ability to speak?','Good help can support direct communication and retain protective separation when needed.',
    'When I explain my own view, they interrupt to state what they claim I mean and refuse to let me correct them.',
    'When I explain my own view, they let me speak and offer mediation only if it is useful and safe.');
  add('safe-timeout-retaliated-against','Safe Pause Punished as Defiance',['coercion-and-accountability','pursuit-distancing-pressure'],[3,42,55],
    'A brief protective pause from an escalating encounter is prohibited or punished despite a plan to reconnect safely.',
    'Staying in an unsafe conversation may feel compulsory.','Keep arguing under duress or flee without any chance to plan.',
    'Was a safe, proportionate pause possible, and who prevented it?','Taking space to reduce danger is not a surrender of legitimate concerns.',
    'When I request a brief safe pause during threatening behavior, they block my way and threaten me for leaving.',
    'When I request a safe pause during a heated exchange, they let me leave without threats and discuss if or when to resume.',true);
  add('service-dependency-exploited','Access to Essential Help Used as Leverage',['professional-authority','resource-dependency-power'],[3,49,57],
    'A helper uses a person’s reliance on services to demand unrelated cooperation or silence.',
    'Losing care may be the price of refusing an unreasonable demand.','Agree to unrelated terms to keep necessary assistance.',
    'Is the condition necessary for safe service delivery, or outside the helper’s mandate?','A service provider can set legitimate limits without trading essential access for personal compliance.',
    'When I refuse an unrelated private favor, they threaten to withdraw the assistance I depend on.',
    'When I refuse an unrelated favor, they keep professional boundaries and explain only the actual conditions of care.');

  // Chapter 4: self-position in connection and family-of-origin transfer.
  add('separate-preference-treated-as-severance','Independent Preference Taken as Relationship Rejection',['conditional-belonging','transferred-old-rules'],[4,59,66],
    'A considered preference is treated as proof of disloyalty or abandonment rather than a negotiable difference.',
    'To preserve closeness I may have to surrender harmless choices.','Agree reflexively or conceal what I actually prefer.',
    'Can difference coexist with respectful ongoing contact?','Connection does not require identical wishes in every decision.',
    'When I choose an ordinary activity they dislike, they insist I have rejected the relationship and punish the choice.',
    'When I choose a different activity, they accept the difference while discussing any genuine shared obligation.');
  add('partner-assigned-parental-duty','Partner Required to Repair Another Adult Bond',['coalition-pressure','carework-displacement'],[4,70,73],
    'A participant is expected to become the intermediary or substitute for unresolved obligations between other adults.',
    'I may have to manage a bond that is not mine to control.','Negotiate on behalf of others instead of expressing my own limits.',
    'Was that caretaking role freely chosen and realistically possible?','Adults can address their own relationships while others provide bounded support.',
    'When I ask them to speak directly with their parent, they require me to carry the messages and blame me if it fails.',
    'When I ask them to address their parent directly, they accept responsibility and let me decide my own involvement.');
  add('distance-as-proof-of-defect','Protective Distance Converted Into a Permanent Identity',['narrative-certainty','pursuit-distancing-pressure'],[4,62,65],
    'A temporary or protective separation is treated as proof of an unchanging personality flaw.',
    'Taking distance may define me as incapable of caring.','Remain in unwanted contact or avoid setting limits.',
    'Was distance needed for safety, and can its purpose be described without a global label?','Appropriate boundaries and affection are not mutually exclusive.',
    'When I step away from a hostile exchange, they declare that I am permanently incapable of relationships.',
    'When I step away from a hostile exchange, they discuss the immediate limit without assigning me a lasting defect.');

  // Chapter 5, printed pp. 79–99: mixed message, attempted remedies and framing.
  add('appeasing-words-overriding-actions','Reassurance That Does Not Change the Restriction',['communication-process-gates','narrative-certainty'],[5,79,84],
    'A warm verbal message is cited as proof of support while the person continues the very restriction under dispute.',
    'I must accept a reassuring phrase even if the action removes my choice.','Stop asking about the actual restriction and thank them for reassurance.',
    'What happened after the reassurance, and could the affected person make a meaningful choice?','Friendly language and observable respect can be evaluated separately.',
    'When I ask to make an ordinary decision, they say they support me while continuing to forbid the decision without discussion.',
    'When I ask to make an ordinary decision, they explain their concern and allow an appropriate choice despite disagreement.');
  add('hidden-condition-in-a-request','Unstated Condition Makes Every Response Wrong',['unspoken-rule-enforcement','failed-solutions'],[5,82,89],
    'A request includes an unspoken qualification that is revealed only after the person complies, leaving no answer acceptable.',
    'Even doing what I am asked may be treated as wrong.','Repeatedly guess hidden qualifications or stop initiating.',
    'Was the expectation stated in advance, and can it be clarified or revised?','An actionable request can specify expectations and recognize reasonable compliance.',
    'When I follow the instruction they gave, they say I should have known an unstated exception and penalize me.',
    'When I follow the stated instruction, they acknowledge it or explain a new requirement without retroactively blaming me.');
  add('failed-correction-escalated','Ineffective Correction Escalated Without Review',['failed-solutions','coercion-and-accountability'],[5,85,95],
    'A repeated sanction fails to produce an appropriate change, yet authority responds by making the same sanction more severe.',
    'A problem may always lead to harsher control regardless of results.','Conceal the difficulty or comply visibly without actually resolving it.',
    'Did the intervention help, and what alternatives were considered?','A legitimate concern can be addressed by adapting the response to evidence and safety.',
    'When I show that the same restriction repeatedly makes the problem worse, they intensify it and refuse to examine its effects.',
    'When I show that a restriction failed, they examine what happened and consider a proportionate different approach.');
  add('beneficial-reframe-ordered','Positive Interpretation Required to Silence Objection',['professional-authority','narrative-certainty'],[5,86,96],
    'A preferred interpretation of a harmful act is imposed as the only acceptable account and displaces its consequences.',
    'Calling a harmful event helpful may be necessary for acceptance.','Adopt their positive description while withholding my objection.',
    'Is the alternative interpretation offered for consideration or enforced against concrete evidence?','Reframing can broaden options without erasing harm, consent or accountability.',
    'When I describe the damage from their decision, they order me to call it care and forbid discussing the damage.',
    'When I describe the damage, they allow my account and consider alternate explanations without demanding agreement.');

  // Chapter 6, printed pp. 100–116: boundary, hierarchy and agency distinctions.
  add('subgroup-contact-veto','Independent Relationship Contact Requires Approval',['compelled-openness','coalition-pressure'],[6,100,107],
    'One person claims a general right to prevent ordinary direct contact between two others in order to maintain the existing alignment.',
    'A healthy connection may require permission from a third person.','Communicate through the gatekeeper or keep contact secret.',
    'Is the restriction tied to an actual safety risk, or merely to preserving another person’s control?','Relationships can have appropriate privacy and direct contact without excluding needed safeguarding.',
    'When I ask to speak privately with them, they demand to approve every exchange despite no stated safety concern.',
    'When I ask for a private conversation, they respect it unless a specific safety obligation requires their involvement.');
  add('delegated-competence-withdrawn','Competence Ignored When Authority Is Challenged',['dependency-and-rescue','assigned-persona-enforcement'],[6,104,112],
    'A capable participant is invited to take responsibility only until exercising independent judgment threatens the authority’s preferred position.',
    'My competence may count only while I agree with them.','Return decisions to authority even when I can handle them.',
    'Is responsibility paired with real permission to decide within agreed limits?','Support can decrease as actual ability grows while accountability remains clear.',
    'When I competently manage a task but choose a different reasonable method, they revoke my role solely for disagreeing.',
    'When I manage a task competently, they discuss any concrete safety concern while allowing my reasonable method.');
  add('child-trusted-with-adult-dispute','Dependent Person Given Adult Conflict Duty',['carework-displacement','coalition-pressure'],[6,105,113],
    'A dependent participant is made responsible for settling a dispute whose adult participants retain the actual decision power.',
    'Keeping peace may be my duty even when I cannot control the conflict.','Mediate adult disagreements or accept blame for their outcome.',
    'Who has the decision authority and developmental responsibility?','Support can be age-appropriate without transferring adult accountability.',
    'When two adults disagree, they require me to resolve it and blame me when their conflict continues.',
    'When two adults disagree, they address it themselves and let me have an age-appropriate voice without taking responsibility.');
  add('privacy-denied-under-togetherness','Privacy Portrayed as a Threat to Family Unity',['compelled-openness','unspoken-rule-enforcement'],[6,101,109],
    'A demand for universal access to private space or conversation is justified solely by an ideal of closeness.',
    'Wanting a boundary may mean I do not belong.','Allow intrusive access or apologize for requesting privacy.',
    'Does closeness allow proportionate boundaries, consent and safeguarding?','Connection and private space can coexist.',
    'When I request an ordinary private conversation, they call it disloyal and insist on listening.',
    'When I request a private conversation, they respect it while stating any genuine safeguarding concern.');

  // Chapter 7, printed pp. 117–132: emotion differentiated from action.
  add('feeling-treated-as-action','Disapproved Feeling Punished as If It Were Conduct',['conditional-belonging','emotional-expression'],[7,117,123],
    'An emotion is treated as equivalent to a harmful act, eliminating the option to feel it while behaving responsibly.',
    'I am wrong merely for experiencing anger, grief or disappointment.','Hide the feeling and perform emotional agreement.',
    'Did I act harmfully, or did I simply name a feeling?','Emotions can be heard while unsafe behavior is still clearly limited.',
    'When I say I am angry without threatening them, they punish me as if I had attacked them.',
    'When I say I am angry without threatening them, they hear the feeling and address any specific conduct separately.');
  add('forced-vulnerability-before-safety','Intimate Disclosure Demanded Before Safety Exists',['compelled-openness','coercion-and-accountability'],[7,121,126],
    'An authority treats private vulnerability as owed even when a participant has not consented or may be punished for sharing.',
    'I cannot say no to revealing sensitive experiences.','Disclose under pressure or invent safe answers.',
    'Can disclosure be declined, paced and protected from retaliation?','Genuine openness depends on choice and a credible response to vulnerability.',
    'When I say I am not ready to discuss something private, they threaten consequences until I disclose it.',
    'When I say I am not ready to discuss something private, they honor that limit and leave room for safe voluntary discussion.',true);
  add('vulnerability-weaponized-later','Private Feeling Reused as a Weapon',['compelled-openness','narrative-certainty'],[7,124,130],
    'A personal disclosure is later used to win unrelated disputes or discredit the discloser’s judgment.',
    'Explaining my feelings may give them evidence to use against me.','Withhold emotional context even when support might help.',
    'Was the disclosure relevant and shared with permission, or repurposed as leverage?','Sensitive admissions can remain within their intended context.',
    'When I confide a fear, they repeatedly raise it in unrelated disagreements to portray me as unreliable.',
    'When I confide a fear, they keep it private and address later disagreements on their actual merits.');
  add('emotional-pace-set-by-authority','Only One Person Controls When Emotions May Be Discussed',['communication-process-gates','emotional-expression'],[7,120,128],
    'An authority demands immediate emotional engagement on their schedule while denying proportionate pauses or different processing styles.',
    'I may not choose when I am ready to speak respectfully.','Speak before ready, become overwhelmed or give rehearsed answers.',
    'Can discussion be scheduled without coercion or abandonment?','Different emotional speeds can be accommodated while addressing real obligations.',
    'When I ask for a short agreed pause before describing my feelings, they accuse me of defiance and forbid the pause.',
    'When I ask for a short pause, they agree to return when I can speak safely and clearly.');

  // Chapter 8, printed pp. 133–148: old expectations and relational loyalty.
  add('old-threat-applied-to-new-person','Old Threat Response Applied Without Current Evidence',['transferred-old-rules','narrative-certainty'],[8,133,141],
    'A response once used for protection continues in a changed setting and treats a new person as if they enforce the old rule.',
    'I may expect punishment from them even if they have not imposed it.','Preemptively conceal a harmless preference or try to control their reaction.',
    'What have they actually done here, and what belongs to an earlier setting?','A learned response can be appreciated for its old purpose and revised in a safer relationship.',
    'When I request quiet time, they allow it, yet I insist they must be angry and repeatedly demand proof they are not.',
    'When I request quiet time, they allow it, and I use their current actions rather than an old threat prediction to decide what to do.');
  add('favour-ledger-without-end','Past Favors Treated as Unlimited Future Authority',['conditional-belonging','agreement-and-consent'],[8,138,144],
    'Past care or sacrifice is used to claim open-ended power over present choices without a defined reciprocal agreement.',
    'I may owe every future decision because they once helped me.','Surrender decisions or offer endless repayment for unpriced care.',
    'Was a concrete obligation agreed, and is any requested repayment proportionate?','Gratitude and reasonable reciprocity need not transfer permanent control.',
    'When I express thanks for past help, they insist it gives them authority over unrelated decisions for the rest of my life.',
    'When I express thanks for past help, they appreciate it and discuss any real outstanding obligation specifically.');
  add('silence-read-as-deliberate-harm','Protective Silence Interpreted as an Intentional Attack',['assigned-persona-enforcement','transferred-old-rules'],[8,140,145],
    'A pause or reduced expression is converted into a claim of deliberate malice without checking context or baseline.',
    'Being quiet may be treated as evidence that I am plotting harm.','Overexplain or perform cheerfulness to make silence permissible.',
    'Does the explanation fit what I normally do, and was the purpose of silence checked?','A change in behavior can invite a question, not a fixed accusation.',
    'When I become quiet to gather my thoughts, they say I am scheming and punish me without asking what changed.',
    'When I become quiet, they ask if I need space and consider that I may simply be thinking.');
  add('need-guessed-then-condemned','Unspoken Care Need Converted Into a Moral Accusation',['unspoken-rule-enforcement','carework-displacement'],[8,140,145],
    'A private need is never directly requested, then failure to anticipate it is treated as proof of selfishness.',
    'I must anticipate needs they have not told me about.','Monitor mood and supply care before any request.',
    'Was the need expressed and the capacity to help discussed?','Care is easier to negotiate when needs and limits can be voiced openly.',
    'When I do not anticipate an unexpressed need, they accuse me of not caring despite refusing to tell me what they wanted.',
    'When they need help, they say what they need and allow me to discuss what I can reasonably offer.');

  // Chapter 9, printed pp. 149–168: observable consequences and thinking errors.
  add('nonresponse-called-reward','Neutral or Quiet Response Punished as Bad Intent',['failed-solutions','assigned-persona-enforcement'],[9,149,156],
    'An authority assumes a quiet response rewards wrongdoing or shows defiance without checking what function it actually serves.',
    'I may be required to react dramatically to prove that I take an issue seriously.','Perform the demanded emotion instead of choosing a proportionate action.',
    'What behavior changed after the response, and is the interpretation supported?','The effects of attention, withdrawal and consequences can be examined without assigning hidden intent.',
    'When I answer calmly, they say calmness proves I enjoy conflict and demand a more distressed response.',
    'When I answer calmly, they evaluate my actions and willingness to address the issue instead of requiring a performance.');
  add('selective-detail-made-whole-case','One Detail Replaces the Complete Record',['narrative-certainty','assigned-persona-enforcement'],[9,151,163],
    'A negative detail is isolated and treated as representative while relevant information and counterexamples are excluded.',
    'A single mistake may erase all the other evidence about me.','Work to appear perfect or hide ordinary errors.',
    'What information was left out, and would it change the conclusion?','A specific mistake can be addressed without turning it into an entire identity.',
    'When I make one small error, they use it to describe my whole history while refusing examples of what went well.',
    'When I make one small error, they discuss it in proportion and consider other relevant facts.');
  add('small-fact-inflated-to-threat','Minor Event Magnified Into a Character Threat',['narrative-certainty','coercion-and-accountability'],[9,151,155],
    'A limited or ordinary event is represented as proof of a catastrophic outcome to justify an outsized response.',
    'An ordinary mistake may justify almost any penalty.','Overprepare, hide errors or seek repeated permission.',
    'How likely and severe is the stated harm, and is the response proportionate?','Consequences can be matched to evidence rather than imagined extremes.',
    'When I forget a routine detail, they say I will ruin the entire relationship and impose severe restrictions.',
    'When I forget a routine detail, they name the actual inconvenience and propose a proportionate remedy.');
  add('specific-request-replaced-by-identity','Concrete Request Replaced With a Global Character Complaint',['communication-process-gates','narrative-certainty'],[9,154,160],
    'Instead of requesting an identifiable change, one person relies on a broad negative identity judgment.',
    'I may have to defend who I am before I can resolve a small problem.','Try to disprove the label rather than address the action.',
    'Can a concrete behavior and an achievable request be identified?','A practical disagreement need not establish a permanent personality verdict.',
    'When I ask what action needs changing, they repeat that I am selfish and refuse to specify the action.',
    'When I ask what needs changing, they name a specific action and listen to a workable alternative.');
  add('role-swap-insight-refused','Perspective Exchange Allowed Only for One Side',['agreement-and-consent','assigned-persona-enforcement'],[9,160,163],
    'One person demands empathy for their position but refuses to examine how the same rule operates when roles reverse.',
    'I must understand their position while mine remains inadmissible.','Argue only from their perspective or give up on reciprocity.',
    'Would this standard be accepted if the same action and roles were reversed?','Mutual perspective-taking can reveal an asymmetry without assuming both actions are equally harmful.',
    'When I describe how their rule affects me, they demand I imagine their feelings but refuse to consider the reversed situation.',
    'When I describe how their rule affects me, they consider the reversed positions and discuss fair limits.');

  // Chapter 10, printed pp. 169–184: power in social arrangements and technology.
  add('nominal-equality-masks-decision-power','Equal Words Cover Unequal Decision Rights',['social-norm-power','authority-and-power'],[10,169,176],
    'An arrangement is described as equal even though one participant makes the decisions and can veto the other without review.',
    'I may need to call a rule fair even when only they can set it.','Agree that the arrangement is equal to avoid conflict.',
    'Who can decide, appeal, refuse and revise the arrangement in practice?','Equality claims can be checked against actual authority and opportunity to choose.',
    'When I ask for a voice in a shared decision, they insist I have equal standing but deny me any vote or explanation.',
    'When I ask for a voice in a shared decision, they share relevant information and include me in the decision.');
  add('structural-obstacle-moralized','Limited Opportunity Treated as Moral Failure',['resource-dependency-power','social-norm-power'],[10,173,179],
    'A real financial, transportation, language or access barrier is recast as laziness rather than a constraint to consider.',
    'My lack of access may prove I am not trying.','Promise impossible performance or hide the barrier.',
    'What accessible options actually existed at the time?','Practical obligations can be evaluated alongside unequal resources and opportunities.',
    'When I cannot use a service that I cannot afford or reach, they call it laziness and reject every practical alternative.',
    'When I cannot reach a service, they ask what access exists and discuss a realistic alternative.');
  add('culture-invoked-to-end-dialogue','Cultural Claim Used as an Unquestionable Command',['social-norm-power','unspoken-rule-enforcement'],[10,174,180],
    'One authority invokes a broad cultural rule to end discussion, without considering the affected person’s differing values or actual safety.',
    'My values may be invalid if they disagree with a rule called traditional.','Avoid describing my own interpretation or harmless preference.',
    'Who endorses the rule, what does it actually require, and can it be discussed?','Cultural context deserves respect without granting anyone an automatic right to coerce.',
    'When I express a different harmless preference, they claim everyone in the shared culture must obey them and forbid discussion.',
    'When I express a different preference, they explain their tradition and listen to how I understand it.');
  add('identity-exposure-pressured','Identity Disclosure Made a Condition of Access',['social-norm-power','compelled-openness'],[10,175,180],
    'Private identity information is demanded or threatened with exposure as leverage in an unrelated decision.',
    'I may lose support if I control when I disclose private identity information.','Share before ready or comply to prevent exposure.',
    'Who has consented to disclosure, and is any protective duty specific and legitimate?','Personal identity is not a defect and disclosure should be governed by consent and genuine safety duties.',
    'When I ask to keep my identity private, they threaten to expose it unless I obey an unrelated demand.',
    'When I ask to keep my identity private, they respect my decision and discuss any actual safety duty transparently.',true);
  add('digital-access-without-scope','Technology Monitoring Claimed Without Limits',['digital-privacy-power','compelled-openness'],[10,179,183],
    'Access to accounts, devices or location is demanded without a defined safety basis or reciprocal agreement.',
    'Privacy in a device may be treated as proof of guilt.','Offer unrestricted access to prevent suspicion.',
    'What was genuinely agreed, what risk is addressed, and can a less intrusive boundary work?','Specific digital commitments can be negotiated without unlimited surveillance.',
    'When I decline to share every password, they accuse me of betrayal and demand ongoing access to my private accounts.',
    'When I decline to share a password, they discuss the actual concern and respect reasonable privacy arrangements.');

  // Chapter 11, printed pp. 185–198: capacities, chosen care and discernment.
  add('support-network-discredited','Outside Support Recast as Disloyalty',['coalition-pressure','compelled-openness'],[11,185,191],
    'Independent supportive relationships are portrayed as betrayal despite no actual unsafe behavior or broken agreement.',
    'I may have to isolate myself to prove loyalty.','Stop asking trusted people for ordinary support.',
    'Is the concern about a concrete breach, or a general demand for exclusive dependence?','Safe support networks can coexist with privacy and mutually agreed relationship limits.',
    'When I talk to a trusted friend about my needs, they call the friendship disloyal and demand I end it.',
    'When I talk to a trusted friend, they respect outside support and discuss any concrete privacy concern without isolation.');
  add('separation-option-erased','Relationship Continuation Made the Only Permitted Goal',['repair-and-change-choice','agreement-and-consent'],[11,193,198],
    'A person’s choice to leave or reconsider a relationship is treated as unacceptable before the actual circumstances are heard.',
    'I may owe reconciliation no matter what happened.','Say I want repair even when I am not freely choosing it.',
    'Can each person openly choose whether to remain, seek help or separate safely?','Repair is a possibility, not a requirement that overrides consent or safety.',
    'When I say I want to consider leaving, they forbid discussion of that option and threaten to punish the decision.',
    'When I say I want to consider leaving, they acknowledge my choice and discuss logistics without coercion.');
  add('caregiver-capacity-erased','Caregiver Capacity Ignored in Demands',['carework-displacement','resource-dependency-power'],[11,185,190],
    'A caregiver is assigned obligations beyond available time, health or material resources, then judged for falling short.',
    'I must meet every need regardless of what resources exist.','Overwork or conceal exhaustion instead of requesting a realistic division.',
    'Which responsibilities and resources are real, and can others share the load?','Care plans can acknowledge capacity without devaluing anyone’s needs.',
    'When I explain that a task exceeds my health limits, they call me uncaring and refuse to reconsider the workload.',
    'When I explain a health limit, they discuss what support or adjustment is possible without attacking my character.');
  add('agreement-imposed-retroactively','Personal Relationship Rule Applied Without Prior Agreement',['agreement-and-consent','narrative-certainty'],[11,190,197],
    'A nonobvious expectation is presented after the fact as a promise the person supposedly broke.',
    'I may be blamed for violating agreements I never made.','Accept the blame to avoid being called dishonest.',
    'What exactly was agreed, by whom, and when?','A relationship can develop new terms through explicit consent rather than retroactive accusations.',
    'When I ask which commitment I broke, they describe a rule they never raised and insist I knowingly agreed.',
    'When I ask about a commitment, they identify what I actually agreed with them and negotiate any new preference openly.');

  // Chapter 12, printed pp. 199–216: exceptions and client-defined change.
  add('exception-report-penalized','Evidence of a Better Moment Dismissed as Disobedience',['narrative-certainty','failed-solutions'],[12,199,206],
    'A genuine exception to a negative generalization is rejected because it disrupts the authority’s preferred account.',
    'Evidence that I can change may not be allowed to count.','Stop reporting progress or explain it away.',
    'Which facts would count as a counterexample, if any?','Small positive differences can be noticed without denying continuing problems.',
    'When I describe a concrete time I managed the problem well, they say I am lying without examining what happened.',
    'When I describe a time the problem was managed better, they consider it alongside remaining concerns.');
  add('optimism-imposed-on-distress','Positive Outlook Required Before Pain Is Heard',['professional-authority','conditional-belonging'],[12,207,216],
    'Optimistic language or solution exercises are required as a substitute for acknowledging a legitimate distressing experience.',
    'I may have to sound hopeful before anyone listens.','Perform enthusiasm while suppressing the real problem.',
    'Can harm and disappointment be acknowledged without preventing future-oriented reflection?','Hope and honest acknowledgment can coexist, and participation should be voluntary.',
    'When I describe an ongoing harm, they require me to list positives first and refuse to hear the harm.',
    'When I describe an ongoing harm, they acknowledge it and ask whether discussing possible next steps would help.');
  add('experiment-made-compulsory','Optional Change Experiment Enforced as an Obedience Test',['professional-authority','repair-and-change-choice'],[12,205,214],
    'A suggested small change is imposed as a test of loyalty or willingness, without respecting consent or feasibility.',
    'Declining a suggested exercise may mean I am defective.','Agree to an unsafe or impractical task to satisfy the evaluator.',
    'Who selected the goal, and can the task be safely declined or adapted?','Small experiments can support agency only when appropriate and chosen.',
    'When I explain that a suggested task is unsafe for me, they say refusal proves I want to fail and threaten a penalty.',
    'When I explain a task is unsafe, they accept that limit and discuss an alternative I can choose.');

  // Chapter 13, printed pp. 217–232: narratives may constrain possible identities.
  add('problem-story-owns-all-events','Every Event Forced Into One Negative Story',['narrative-certainty','assigned-persona-enforcement'],[13,217,225],
    'Contrary events are repeatedly redescribed to preserve an all-encompassing story about a person.',
    'My actions may count as evidence against me whichever choice I make.','Stop offering evidence or act the assigned role.',
    'Is there a concrete outcome that would lead to revising the story?','A story can be revised when actual conduct and circumstances differ.',
    'When I cooperate they call it manipulation, and when I decline they call it defiance, so they reject both as proof of my bad character.',
    'When I cooperate or decline, they describe each action accurately and revise their judgment when new evidence warrants it.');
  add('problem-separated-from-actor-to-excuse-harm','Problem Label Used to Hide the Responsible Action',['coercion-and-accountability','narrative-certainty'],[13,219,230],
    'A neutral name for a problem is used to avoid identifying who chose a harmful action and what responsibility follows.',
    'Their harmful choice may become nobody’s responsibility.','Focus on the abstract problem and stop naming the act.',
    'Can the problem be discussed while still naming the actor, act and needed protection?','A useful metaphor need not erase responsibility for real behavior.',
    'When they threaten me, they insist the problem made it happen and refuse responsibility for choosing the threat.',
    'When I describe a problem contributing to conflict, they still accept responsibility for their own threatening conduct.',true);
  add('preferred-identity-blocked','Self-Description Rejected to Preserve Assigned Persona',['assigned-persona-enforcement','repair-and-change-choice'],[13,220,229],
    'An authority disallows a person’s evolving self-description despite conduct supporting that change.',
    'They may refuse to recognize me outside the old role.','Return to the assigned identity or keep change hidden.',
    'What current actions support a more flexible description, and whose choice is affected?','Identity descriptions can remain tentative and open to evidence, without coercion.',
    'When I show that I can handle a new responsibility, they say my old persona makes growth impossible and refuse to reconsider.',
    'When I show that I can handle a responsibility, they update their expectations based on present conduct.');
  add('witness-recruited-for-a-verdict','Public Witness Used to Lock In One Account',['coalition-pressure','narrative-certainty'],[13,225,230],
    'An outside audience is gathered to repeat an authority’s negative narrative while the affected person cannot speak freely.',
    'A public description may become more powerful than what actually happened.','Perform the expected role before witnesses to avoid humiliation.',
    'Did the witness receive a fair account, and is disclosure proportionate and consent-based?','Supportive witnesses can affirm chosen change without serving as an enforcement audience.',
    'When I disagree with their account, they gather others to repeat the accusation and forbid me to respond.',
    'When I disagree with their account, they allow proportionate independent perspectives without pressuring others to condemn me.');

  // Chapter 14, printed pp. 233–247: integrate multiple levels without imposing one model.
  add('model-made-more-real-than-event','Theory Applied Despite Contradictory Evidence',['professional-authority','narrative-certainty'],[14,239,244],
    'An expert explanation is preserved even after the person offers direct observations that do not fit it.',
    'A theory may count more than my lived experience.','Supply details that match the expert frame rather than actual events.',
    'What evidence could falsify the explanation, and were alternatives considered?','Models are provisional tools and should be updated when reality differs.',
    'When I give evidence contrary to their preferred theory, they tell me the theory proves I cannot understand my own experience.',
    'When I give evidence contrary to their theory, they reconsider the model and ask what account fits the facts.');
  add('harmless-difference-treated-as-harm','Nonharmful Difference Cast as a Violation',['agreement-and-consent','repair-and-change-choice'],[14,244,247],
    'A preference that violates no consent, responsibility or safety duty is portrayed as wrongdoing solely because it differs.',
    'I may need to share every preference to remain acceptable.','Give up benign preferences to prevent conflict.',
    'What concrete harm or broken agreement follows from the difference?','Accepting difference does not require accepting threats, neglect or abuse.',
    'When I express a harmless preference, they demand that I stop because difference itself is unacceptable.',
    'When I express a harmless preference, they accept it while discussing any genuine shared responsibilities.');
  add('material-barrier-dismissed-by-therapy-language','Practical Barrier Explained Away as Resistance',['professional-authority','resource-dependency-power'],[14,242,247],
    'A real transport, housing, financial or accessibility barrier is recast as a failure of motivation.',
    'I may be blamed for obstacles I cannot remove alone.','Pretend access is available or accept impossible demands.',
    'What support or external change is necessary before the expectation becomes realistic?','Internal reflection and practical access both matter, and neither replaces the other.',
    'When I explain that I lack transport to attend, they insist it shows I resist improvement and refuse to discuss access.',
    'When I explain a transport barrier, they look for feasible access options before judging what I can do.');
  add('acceptance-used-to-waive-safety','Acceptance Language Used to Normalize Abuse',['coercion-and-accountability','repair-and-change-choice'],[14,243,247],
    'A call to accept imperfections is extended to harmful conduct that requires accountability or protection.',
    'Keeping the bond may require tolerating actual danger.','Relabel a harmful act as a harmless difference.',
    'Is the issue a benign preference or a threat, assault or coercive action?','Acceptance of difference and firm limits on harm are compatible.',
    'When they threaten my safety, they say acceptance means I must allow the threats without protest.',
    'When I express an ordinary preference, they accept the difference; when I report an actual threat, they treat safety as nonnegotiable.',true);

  // Chapter 15, printed pp. 248–257: limits of evidence and of authority.
  add('research-as-individual-verdict','Population Study Used as Proof About My Individual Case',['professional-authority','narrative-certainty'],[15,248,253],
    'A population-level finding is presented as proof that a particular person caused or will develop an outcome.',
    'A statistic may outweigh the specifics of what happened to me.','Stop asking what the individual evidence actually shows.',
    'Does the research support this individual conclusion, and what are the limits of generalization?','Study findings can inform questions without dictating a personal verdict.',
    'When I ask how a study applies to me, they say its average result proves my responsibility without reviewing my circumstances.',
    'When I ask how a study applies, they explain the population limits and examine what is known in my situation.');
  add('progress-solely-assigned-to-client','Unchanged Circumstances Blamed Entirely on Personal Effort',['resource-dependency-power','repair-and-change-choice'],[15,253,257],
    'A person is held wholly responsible for lack of improvement while external resources and opportunities remain blocked.',
    'If a problem persists, it must mean I failed to try.','Work harder without asking for actual support or changed conditions.',
    'Which factors were controllable, and what outside conditions constrained improvement?','Effort matters, but outcomes also depend on material conditions and other people’s choices.',
    'When I cannot improve a situation because they control the needed resource, they call my limited progress laziness.',
    'When I cannot improve without a resource, they acknowledge the constraint and discuss what changes are realistically possible.');
  add('consent-to-help-inferred-from-outcome','Beneficial Intent Presented as Consent',['professional-authority','agreement-and-consent'],[15,253,257],
    'A helper assumes that a desirable outcome proves the affected person agreed to the methods or goals used.',
    'I may be required to accept an intervention because it might help.','Go along with a plan I did not choose.',
    'Were goals and tasks explained and agreed, apart from whether the helper expected success?','Good intentions and evidence can guide an offer, but do not substitute for consent.',
    'When I refuse an unwanted nonurgent intervention, they insist its potential benefit means I already owe compliance.',
    'When I decline a proposed intervention, they respect the decision and explain other appropriate options.');
  add('evidence-limits-hidden-behind-credential','Uncertain Finding Presented as Guaranteed Truth',['professional-authority','narrative-certainty'],[15,248,256],
    'A person invokes credentials or a scientific label to conceal uncertainty, competing explanations or study limits.',
    'Questioning their certainty may be treated as ignorance.','Accept an unsupported conclusion without checking evidence.',
    'What was actually studied, and which limitations could change the inference?','Expert knowledge should include what remains unknown and what would update the judgment.',
    'When I ask what supports the conclusion, they claim certainty from their title alone and prohibit further questions.',
    'When I ask what supports the conclusion, they explain its evidence and limitations without treating questions as disobedience.');

  for(const r of additions){
    if(!r.hubs.length||!r.hubs.every(h=>routineIndex.has(h)))throw Error('V10 orphan hub: '+r.id);
    const source=`Nichols & Davis, Family Therapy: Concepts and Methods, 12th ed., ch. ${r.cite[0]}, printed pp. ${r.cite[1]}–${r.cite[2]}`;
    const s={id:r.id,name:r.name,meaning:r.meaning,learned:r.learned,protective:r.protective,check:r.check,grounded:r.grounded,
      cues:r.name.toLowerCase().split(/[^a-z]+/).filter(x=>x.length>=5).slice(0,5),source,
      sourceRef:{chapter:r.cite[0],printedPages:[r.cite[1],r.cite[2]],pdfPages:[r.cite[1]+27,r.cite[2]+27]}};
    atlas.records.push(r);atlas.data.subroutines.push(s);subIndex.set(s.id,s);
    for(const h of r.hubs){const hub=routineIndex.get(h);if(!hub.subroutineIds.includes(s.id))hub.subroutineIds.push(s.id);}
    const concern={id:`v10-${r.id}-concern`,subroutineIds:[r.id],routineIds:[...r.hubs],kind:'repeats',severity:r.high?'high':'ordinary',statement:r.concern};
    const contrast={id:`v10-${r.id}-contrast`,subroutineIds:[r.id],routineIds:[...r.hubs],kind:'differs',severity:'ordinary',statement:r.contrast};
    atlas.evidence.entries.push(concern,contrast);
  }
  atlas.data.version=10;atlas.evidence.version=10;
})();
