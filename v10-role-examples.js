/* Clearframe V10: distinct, fictional role-based illustrations for each routine.
 * V4b used short, recognizable statements in two interchangeable role slots.
 * These new illustrations are original editorial examples, not textbook quotations,
 * personal records, verified histories, or evidence that a person has a motive.
 * The roles illustrate an observable rule, consequence or double standard;
 * an assigned persona is a claim used to regulate conduct, not a diagnosis.
 */
(() => {
  'use strict';
  const atlas=window.CLEARFRAME_V10_CATALOG;
  if(!atlas?.data?.routines)throw Error('V10 routines must load before role examples');

  // First statement: the authority/caretaker role. Second: a peer, sibling,
  // witness, or intermediary. The user's chosen role aliases are display-only.
  const scenarios={
    'family-rules':[
      '“I know you have your own home now, but you still need my permission before making plans with relatives.”',
      '“I can arrange my visits directly, but they still make you ask first because you are the one who always followed the old rule.”'
    ],
    'interaction-cycles':[
      '“If you stop answering during this argument, I will keep raising my voice until you give me the answer I want.”',
      '“Every time you try to pause the fight, they follow you into the hall and the argument starts again.”'
    ],
    'interpretation-loops':[
      '“You have always been the dramatic one. Even when you speak calmly, I know you are trying to start a fight.”',
      '“They call my frustration understandable, but say the same words from you prove you are being difficult again.”'
    ],
    'interpersonal-boundaries':[
      '“If you close your bedroom door, you must be keeping secrets from me. Leave it open so I can check.”',
      '“They let me close my door to study, but insist on coming into your room without knocking.”'
    ],
    'triangular-conflict':[
      '“Go tell your sibling I am disappointed in them. I do not want to have that conversation myself.”',
      '“They asked me to convince you to take their side, even though I was not part of your disagreement.”'
    ],
    'authority-and-power':[
      '“It does not matter that the rule changes when I do the same thing. I am in charge, so you cannot question it.”',
      '“I was allowed to come home late, but when you did it they called you disrespectful without explaining a different circumstance.”'
    ],
    'emotional-expression':[
      '“Do not tell me you are sad. You have no reason to feel that way, and I will not listen until you smile.”',
      '“They allow me to be upset after a hard day, but tell you that your tears spoil the mood for everyone.”'
    ],
    'family-duties':[
      '“You are the dependable one, so cancel your outing and manage the household while I deal with my feelings.”',
      '“I get to finish my homework because they expect you to take care of dinner and calm everybody down.”'
    ],
    'communication-patterns':[
      '“You are free to say no. But if you really cared about me, you would not even consider refusing.”',
      '“They told you to be honest, then called you ungrateful when your honest answer was not the one they wanted.”'
    ],
    'learning-and-expectations':[
      '“Yesterday I praised you for deciding independently. Today I am punishing you for making a decision without asking.”',
      '“I watched you hesitate over an ordinary choice because you could not tell which response would be acceptable this time.”'
    ],
    'assigned-persona-enforcement':[
      '“You are usually talkative, so when you go quiet you must be hiding something. Answer me; you are not allowed to withdraw.”',
      '“I am naturally quiet and nobody questions me, but when you need a quiet afternoon they call you suspicious and demand an explanation.”'
    ],
    'conditional-belonging':[
      '“If you insist on being different from the version of you I approve of, do not expect to be invited next time.”',
      '“They included me when I agreed with them but left you out after you expressed a harmless different opinion.”'
    ],
    'unspoken-rule-enforcement':[
      '“I should not have to tell you the rule. You should just know what I expect, and asking why is disrespectful.”',
      '“I was never told about that exception either, but they only penalized you for failing to guess it.”'
    ],
    'narrative-certainty':[
      '“You have always been irresponsible. Finishing the project on time does not change what I know about you.”',
      '“I showed them the work you completed, but they repeated an old mistake instead of discussing what happened today.”'
    ],
    'communication-process-gates':[
      '“I will hear your side only when you use the exact tone I approve of. If you question my account, this conversation is over.”',
      '“They let me interrupt to agree with them, but cut you off every time you try to correct a factual detail.”'
    ],
    'pursuit-distancing-pressure':[
      '“You cannot take ten minutes to calm down. If you walk away now, I will keep following you until you talk.”',
      '“They kept calling after you gave a specific time to reconnect, then described the unanswered calls as proof that you do not care.”'
    ],
    'compelled-openness':[
      '“If you have nothing to hide, hand over your private messages. Refusing means you are guilty of something.”',
      '“They asked me to report what you said privately, even after you told us you did not consent to sharing it.”'
    ],
    'carework-displacement':[
      '“You are better at managing everyone, so you can miss your own appointment to cover the caregiving again.”',
      '“I am allowed to rest when I finish my share, but they keep adding tasks to yours because you are the responsible one.”'
    ],
    'dependency-and-rescue':[
      '“Let me do that for you. You always get things wrong, and I will not let you try it independently.”',
      '“They let me learn that task by practicing, but take it out of your hands before you get the chance.”'
    ],
    'coalition-pressure':[
      '“Three relatives agree with me, so there is no point hearing your account. You need to admit you are the problem.”',
      '“They asked me to repeat their accusation to you as though it were my own observation, although I never saw the event.”'
    ],
    'coercion-and-accountability':[
      '“If you try to leave before I finish arguing, I will block the doorway. You made me do this by disagreeing.”',
      '“I saw them prevent you from leaving, but they told me to call it a mutual argument instead of describing who blocked the door.”'
    ],
    'resource-dependency-power':[
      '“If you disagree with my choice about visitors, I will take away the ride to work you depend on.”',
      '“My transportation was never threatened over that issue, but they made your ability to get to work depend on obedience.”'
    ],
    'professional-authority':[
      '“The counselor will agree that you are the problem. I already told them what kind of person you are.”',
      '“They asked me to confirm their story to the counselor before you had been allowed to give your account.”'
    ],
    'social-norm-power':[
      '“You are the daughter, so serving everyone is naturally your responsibility. Stop questioning the arrangement.”',
      '“I get thanked for clearing one plate, while you are criticized if you do not do all the cleanup.”'
    ],
    'agreement-and-consent':[
      '“Being close means you already agreed to share your passwords. You do not get to change your mind.”',
      '“I heard them claim you had promised access to your phone, but I was there when you explicitly declined.”'
    ],
    'failed-solutions':[
      '“If checking on you every hour has not fixed the problem, I will check every ten minutes until it does.”',
      '“The repeated interruptions make it harder for you to complete the task, but they refuse to discuss a different plan.”'
    ],
    'transferred-old-rules':[
      '“In this house, silence meant defiance. If a friend goes quiet, assume they are punishing you and demand an explanation.”',
      '“I noticed you questioned your friend for taking a break, even though your friend had told you when they would be back.”'
    ],
    'digital-privacy-power':[
      '“Keep your location sharing switched on at all times, or I will treat that as proof you are lying to me.”',
      '“They asked me to send screenshots of your online status so they could challenge every period when you did not reply.”'
    ],
    'repair-and-change-choice':[
      '“I said I was sorry, so you must forgive me immediately. You are not allowed to ask whether the behavior has stopped.”',
      '“They told me to pressure you into reconciling, even though you were still deciding what a safe repair would require.”'
    ]
  };

  const routines=atlas.data.routines;
  const expected=new Set(routines.map(r=>r.id));
  const received=new Set(Object.keys(scenarios));
  if(expected.size!==routines.length||expected.size!==received.size||[...received].some(id=>!expected.has(id))){
    throw Error('V10 role examples must match every distinct control routine');
  }
  for(const r of routines){
    const [guardian,sibling]=scenarios[r.id];
    if(!guardian||!sibling||guardian===sibling)throw Error('Missing distinct role examples for '+r.id);
    r.roleExamples={guardian,sibling};
  }
})();
