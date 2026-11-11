/* Clearframe V10 terminology audit.
 * A control routine is Clearframe's organizational unit, not a clinical diagnosis.
 * `established` means the label names a documented construct whose scope closely
 * matches this hub. `composite` means the hub joins established constructs or
 * applies them to an additional observable power/agency question. The composite
 * is an original Clearframe category, not an officially validated syndrome.
 * IDs, sources, examples, five-field paths, and reversible indicators remain intact.
 */
(() => {
  'use strict';
  const atlas=window.CLEARFRAME_V10_CATALOG;
  if(!atlas?.data?.routines)throw Error('V10 catalog not loaded for terminology');
  const audit={
    'family-rules':['Family Rules & Role Rigidity','composite','Structural and family-systems theory','Combines negotiated family rules with expectations that keep a person in an outdated role.'],
    'interaction-cycles':['Circular Causality & Escalation','composite','Systems and communication theories','Circular influence describes a sequence; it never makes participants equally responsible for threats or violence.'],
    'interpretation-loops':['Role Labeling & Dominant Narratives','composite','Narrative and family-systems approaches','A label can be used to restrict conduct; it is not evidence that an immutable trait is defective.'],
    'interpersonal-boundaries':['Family Boundaries: Enmeshment & Disengagement','composite','Structural family therapy','Boundaries are assessed by consent, context and actual caregiving duties, not by closeness or privacy alone.'],
    'triangular-conflict':['Triangulation & Coalitions','composite','Bowen and structural family therapies','A third party can be drawn into conflict; safe help-seeking is not automatically triangulation.'],
    'authority-and-power':['Family Hierarchy & Power Differentials','composite','Structural and contextual family therapies','Legitimate authority has limits; comparable conduct and unequal consequences require attention.'],
    'emotional-expression':['Emotional Invalidation & Suppression','composite','Experiential and emotion-focused approaches','Emotions can be accepted without excusing harmful conduct.'],
    'family-duties':['Family Caretaking & Parentification','composite','Contextual and structural family therapies','Parentification applies specifically when children carry developmentally inappropriate adult responsibilities.'],
    'communication-patterns':['Incongruent Communication & Double Binds','composite','Communication and strategic family therapies','A double bind involves incompatible demands with no safe route to clarification; ordinary disagreement alone is insufficient.'],
    'learning-and-expectations':['Learned Expectancies & Reinforcement','composite','Behavioral learning and family-systems approaches','A past consequence can shape a prediction without proving what another person intends today.'],

    'assigned-persona-enforcement':['Role Rigidity & Labeling','composite','Family roles, labeling and narrative approaches','The mechanism is the authority imposing an identity-based restriction; a personality trait or change in baseline is not misconduct.'],
    'conditional-belonging':['Conditional Positive Regard','established','Carl Rogers, person-centered theory','Approval depends on meeting another person’s conditions; distinguish explicit consequences from feared rejection.'],
    'unspoken-rule-enforcement':['Implicit Family Rules','established','Systems and structural family therapies','An unstated expectation is concerning when it is enforced and cannot be clarified or renegotiated.'],
    'narrative-certainty':['Problem-Saturated Narratives','established','Narrative therapy','A dominant account can resist exceptions; judging the present requires considering disconfirming observations.'],
    'communication-process-gates':['Communication Rules & Metacommunication','composite','Communication and strategic family therapies','The issue is how the conversation is governed, including whether clarification is permitted.'],
    'pursuit-distancing-pressure':['Demand–Withdraw Interaction','established','Couple communication research','Pursuit and retreat may reinforce each other, but a safe pause cannot be equated with punitive withdrawal.'],
    'compelled-openness':['Boundary Intrusion & Coerced Disclosure','composite','Structural family therapy and consent principles','Privacy is not guilt; lawful and safety-related disclosure obligations still require context.'],
    'carework-displacement':['Parentification & Unequal Caretaking','composite','Parentification research and contextual family therapy','Separate child role reversal from inequitable adult care or household labor.'],
    'dependency-and-rescue':['Overfunctioning–Underfunctioning','established','Bowen-oriented family-systems practice','Help must be assessed against actual ability and consent; needing assistance is not inherently dysfunctional.'],
    'coalition-pressure':['Coalitions, Triangulation & Scapegoating','composite','Structural and Bowen family therapies','Alliance pressure and blame displacement must be distinguished from appropriate protective support.'],
    'coercion-and-accountability':['Coercion, Intimidation & Accountability','composite','Family violence research and relationship-safety practice','Patterns of coercive control and individual threats require attention to the actor and safety, not equal blame.'],
    'resource-dependency-power':['Economic Coercion & Resource Control','composite','Economic-abuse and contextual-systems research','A necessary resource may be leveraged to suppress choices; distinguish it from a transparent, proportionate limit.'],
    'professional-authority':['Professional Power & Boundary Violations','composite','Professional ethics and therapeutic-alliance research','Expertise does not remove duties of informed consent, evidentiary honesty and independent judgment.'],
    'social-norm-power':['Social Role Expectations & Structural Power','composite','Feminist and culturally informed family therapies','The relevant issue is unequal expectations and consequences, not a culture, identity or family form itself.'],
    'agreement-and-consent':['Boundary Negotiation & Consent','composite','Family therapy ethics and relational negotiation','An assumed agreement does not replace an explicit, informed and revisable choice.'],
    'failed-solutions':['Problem-Maintaining Attempted Solutions','established','Strategic family therapy','Repeating an ineffective correction without reviewing outcomes can maintain the problem.'],
    'transferred-old-rules':['Generalization of Learned Expectations','established','Learning theory and family-of-origin frameworks','An old protective rule may be applied to a friend who has not imposed that rule; present evidence can challenge it.'],
    'digital-privacy-power':['Digital Boundaries & Coercive Monitoring','composite','Technology-facilitated abuse research and consent principles','An agreed digital arrangement differs from surveillance used to punish ordinary autonomy.'],
    'repair-and-change-choice':['Rupture–Repair & Differentiation','composite','Attachment and Bowen family-systems approaches','Accountability, repair and continued contact are evaluated through choice and observable changed conduct.']
  };
  const routines=atlas.data.routines;
  const ids=new Set(routines.map(r=>r.id));
  if(ids.size!==routines.length||Object.keys(audit).length!==ids.size||Object.keys(audit).some(id=>!ids.has(id))) {
    throw Error('Clinical terminology audit must cover every V10 routine exactly once');
  }
  const seen=new Set();
  for(const routine of routines){
    const [name,fit,framework,scopeNote]=audit[routine.id];
    if(!name||!['established','composite'].includes(fit)||!framework||!scopeNote||seen.has(name)) {
      throw Error('Incomplete or repeated clinical terminology: '+routine.id);
    }
    seen.add(name);
    routine.terminology={previousLabel:routine.name,fit,framework,scopeNote};
    routine.name=name;
    routine.short=name;
  }
})();
