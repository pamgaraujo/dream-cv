const steps = [
  {key:'style', label:'Style', title:'Choose your personal style', hint:'There is no wrong answer. Pick what feels most like you.', options:[['✨','Creative'],['📚','Curious'],['🎯','Organized'],['🤝','Social'],['🌱','Calm'],['🚀','Adventurous'],['💡','Innovative'],['🎨','Expressive']]},
  {key:'activity', label:'Activity', title:'Choose your favorite activity', hint:'What would you happily spend an afternoon doing?', options:[['📷','Photography'],['✍️','Writing'],['🎵','Music'],['🧁','Baking'],['🧳','Traveling'],['📚','Reading'],['🎨','Design'],['🌿','Gardening'],['☕','Discovering Cafés'],['🎬','Cinema']]},
  {key:'project', label:'Dream project', title:'Choose a dream project', hint:'Choose a project your future self would love to try.', options:[['📖','Publish a Book'],['🎤','Host a Podcast'],['📸','Create a Photo Exhibition'],['🌎','Travel Around the World'],['🎨','Launch a Creative Brand'],['☕','Open a Cozy Café'],['🎵','Organize a Music Festival'],['📰','Create a Digital Magazine'],['🎬','Produce a Documentary'],['📚','Build a Community Library']]},
  {key:'type', label:'CV type', title:'Choose a CV type', hint:'Each format tells your story in a different order.', type:true, options:[['📅','Chronological CV','Leads with experience, tracing steady progress from the most recent project backward.'],['🛠','Functional CV','Leads with skills and strengths, useful when abilities should speak first.'],['🔀','Combined CV','Blends skills and experience for a balanced first impression.']]}
];
const selections = {}; let current = 0;
const $ = s => document.querySelector(s); const random = a => a[Math.floor(Math.random()*a.length)];
function show(id){document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active')); $(id).classList.add('active'); window.scrollTo({top:0,behavior:'smooth'});}
function renderStep(){const step=steps[current]; $('#step-label').textContent=`Step ${current+1} of 4`; $('#progress-word').textContent=step.label; $('#progress-bar').style.width=`${(current+1)*25}%`; $('#question-area').innerHTML=`<div class="question"><h2>${step.title}</h2><p>${step.hint}</p><div class="choice-grid ${step.type?'type-grid':''}">${step.options.map((o,i)=>`<button class="choice-card ${selections[step.key]===o[1]?'selected':''}" data-option="${i}" type="button"><span class="choice-icon">${o[0]}</span><span class="choice-name">${o[1]}</span>${o[2]?`<span class="choice-description">${o[2]}</span>`:''}</button>`).join('')}</div></div>`; $('.back-button').style.visibility=current?'visible':'hidden'; $('.next').disabled=!selections[step.key]; $('.next').innerHTML=current===3?'Create my dream CV <span>✦</span>':'Continue <span>→</span>'; document.querySelectorAll('.choice-card').forEach(c=>c.onclick=()=>{selections[step.key]=step.options[c.dataset.option][1];renderStep()});}

// Vocabulary helpers: give each style a richer synonym and a "signature strength" trait,
// so the generated CV reads less like a template and more like a written paragraph.
const styleMeta = {
  Creative:{synonym:'imaginative', trait:'turning fresh ideas into real, finished projects'},
  Curious:{synonym:'inquisitive', trait:'asking good questions and then finding out the answers'},
  Organized:{synonym:'methodical', trait:'keeping every project mapped out and on track'},
  Social:{synonym:'personable', trait:'building warm, easy connections with new people'},
  Calm:{synonym:'composed', trait:'staying steady and thoughtful even when plans change'},
  Adventurous:{synonym:'intrepid', trait:'chasing new challenges without waiting for permission'},
  Innovative:{synonym:'resourceful', trait:'reimagining ordinary tasks in original ways'},
  Expressive:{synonym:'articulate', trait:'putting big ideas into words other people remember'}
};
// Style-driven vocabulary word added to the Skills list, so switching style
// changes the actual skills shown, not only the summary sentence.
const styleSkill = {Creative:'Idea generation', Curious:'Research instincts', Organized:'Process design', Social:'Relationship building', Calm:'Steady decision-making', Adventurous:'Calculated risk-taking', Innovative:'Creative problem-solving', Expressive:'Persuasive storytelling'};
// Short, tag-style extras (not full sentences) for the Functional CV's
// bonus skill slot — kept separate from strengthPool, which is now full
// behavioral sentences meant for the Strengths list, not a tag pill.
const bonusSkillPool = ['Quick thinking','Steady focus','Clear communication','Careful editing','Fresh ideas','Practical planning','Active listening','Honest feedback','Time management','Pattern spotting','Calm troubleshooting','Extra patience'];
// Alternate opening phrases for the Dream Achievement line, so it does not
// always read "Dream achievement: ..." (that phrase is already the heading).
const dreamLeadIns = ['Someday:','The big one:','Still dreaming about:','One day, hopefully:','Somewhere down the line:','What comes next:'];
const projectDreams = {
  'Publish a Book':'Publish a bestselling novel that turns one good idea into a story readers cannot put down',
  'Host a Podcast':'Host an inspiring podcast full of conversations that feel like catching up with old friends',
  'Create a Photo Exhibition':'Create a photo exhibition that turns strangers into people swapping stories',
  'Travel Around the World':'Visit 50 countries and collect a small, honest story from each one',
  'Launch a Creative Brand':'Launch a creative brand built on ideas strong enough to outgrow a single bedroom studio',
  'Open a Cozy Café':'Open a cozy neighborhood café where regulars start calling it their own within a week',
  'Organize a Music Festival':'Organize a community music festival with one stage and a lineup nobody saw coming',
  'Create a Digital Magazine':'Create a digital magazine that gives new writers their very first byline',
  'Produce a Documentary':'Produce a documentary worth sitting through the credits to think about',
  'Build a Community Library':'Build a welcoming community library stocked with exactly what the neighborhood needs'
};
// How each CV format changes what a reader notices first (matches the classic
// chronological / functional / combination resume framework). Each type has a
// few phrasings so re-generating the same type does not repeat itself either.
const typeIntros = {
  'Chronological CV':['This chronological CV puts experience center stage, tracing steady, hands-on progress from the most recent project backward.','Built around a clear timeline, this CV lets the newest milestone speak first and traces the journey back from there.','Dates lead the way here: this CV reads like a career diary, most recent entry first.'],
  'Functional CV':['This functional CV puts skills in the spotlight, letting real strengths introduce this person before any date does.','Built around ability rather than sequence, this functional CV leads with what this person can actually do — dates take a back seat.','Here, strengths do the talking first; the timeline is deliberately left in the background.'],
  'Combined CV':['This combined CV pairs practical skills with real project experience side by side, for a balanced first impression.','Blending ability and track record, this combined CV lets skills and experience support each other equally.','Half skills, half story: this CV gives strengths and experience equal billing.']
};
// Section vocabulary changes with the CV format too, echoing how each style
// is conventionally read (skills-led, timeline-led, or balanced).
const sectionLabels = {
  'Chronological CV':{skills:'Key Skills', experience:'Career Timeline', strengths:'Standout Qualities'},
  'Functional CV':{skills:'Core Strengths', experience:'Proven Experience', strengths:'Top Traits'},
  'Combined CV':{skills:'Abilities', experience:'Track Record', strengths:'What Sets This Apart'}
};
// Each activity carries an "archetype" — a core motivation (the why, not
// just the what) plus a small pool of strengths and fun facts that stay on
// that same theme. This is what keeps a generated CV from reading like
// unrelated sections stitched together: the summary states the
// motivation, the strengths show it in action, and the fun fact is a
// light echo of it — instead of all three being pulled from unrelated
// generic pools.
const data = {
 Photography:{title:'Aspiring Photographer', skills:['Visual storytelling','Creative composition','Photo editing','Project planning','Attention to detail'], exp:[['Photography Club Member','Took photos at school events and a few personal projects, trying to catch everyday moments that would otherwise get forgotten. Spent a lot of time just learning to wait for the right light.'],['Community Event Volunteer','Photographed workshops and local events, and got good at putting nervous first-timers at ease in front of the camera. Edited the photos afterward and sent organizers a small gallery to keep.']],
   archetype:{motivation:'noticing the small moments other people rush past', strengths:['Notices the moment right before or right after the "obvious" one.','Remembers small details from places most people forget instantly.','Would rather wait five extra minutes for the right light than rush a shot.','Keeps old photos around long after everyone else has deleted theirs.','Notices when a room changes mood, even without being told why.'], facts:['Has a phone full of photos of the same sunset from slightly different angles.','Can spot a good photo opportunity in the most boring parking lot.','Keeps meaning to print photos and still has not.','Picks things up about a place just by spending an afternoon photographing it.']}},
 Writing:{title:'Creative Storyteller',skills:['Narrative writing','Research','Communication','Editing','Creative thinking'],exp:[['Blog Contributor','Published short articles about ideas, places, and everyday life, mostly for people who like an easy read. Pitched a lot of topics that never got published, and a few that did.'],['Writing Club Member','Read other people’s drafts in a writing group and tried to give feedback that was actually useful, not just nice. Came up with a few writing prompts when nobody else had ideas.']],
   archetype:{motivation:'turning ordinary moments into stories worth telling', strengths:['Turns a boring afternoon into a decent story by the time it is retold.','Remembers conversations well enough to repeat them almost word for word.','Rewrites the same sentence five times before moving on.','Notices when a story is missing its ending before anyone else does.','Collects overheard lines that end up in something later.','Notices headlines other people scroll straight past.'], facts:['Has a note app full of half sentences that made sense at 2am.','Rereads old journal entries and cringes, then keeps writing anyway.','Can turn a two-minute story into a ten-minute one, on purpose.']}},
 Music:{title:'Music Festival Dreamer',skills:['Event coordination','Collaboration','Creative programming','Communication','Planning'],exp:[['Music Club Member','Helped pick songs for a few listening sessions, mostly genres nobody else in class had heard yet. Tried to keep everyone happy, which never fully works.'],['Community Event Volunteer','Helped set up sound equipment and keep the schedule at a few small live events. Mostly just tried to keep performers from running late.']],
   archetype:{motivation:'finding the right thing to share with a room full of different people', strengths:['Can tell within thirty seconds whether a song fits the room.','Remembers a song by the moment it was playing, not just the lyrics.','Notices when someone in the group is being left out of the playlist debate.','Keeps a mental list of songs for very specific, oddly niche moods.','Will happily rebuild a whole setlist to fix one bad transition.','Notices the room needs a mood change at the last minute and scrambles the playlist.'], facts:['Has a playlist named something only they understand anymore.','Can identify a song within the first two seconds, most of the time.','Has strong, mostly unshared opinions about transition timing.']}},
 Baking:{title:'Future Café Owner',skills:['Recipe development','Creativity','Time management','Customer care','Organization'],exp:[['Baking Club Member','Tried out a lot of simple recipes and brought the good ones to community events. Kept a notebook of what worked and what definitely didn’t.'],['Café Project Volunteer','Helped plan a small café menu and layout for a school project, mostly arguing about what should go on it. Spent way too long deciding how things should be plated.']],
   archetype:{motivation:'making a small space feel like it was made for whoever walks in', strengths:['Notices who has not eaten yet before anyone says anything.','Remembers exactly how someone likes their coffee after one visit.','Keeps tweaking a recipe long after everyone says it is already good.','Makes sure there is always a little extra for whoever shows up late.','Notices when a room needs something warm in it, literally or otherwise.'], facts:['Has strong opinions about the correct texture of a cookie.','Keeps a mental list of who prefers what, without writing it down.','Has ruined at least one batch trying to fix a batch that was already fine.']}},
 Traveling:{title:'Curious Explorer',skills:['Adaptability','Trip planning','Research','Cross-cultural communication','Problem solving'],exp:[['Travel Blog Contributor','Wrote a few practical travel guides with favorite local spots worth checking out. Double-checked most of the recommendations before publishing, after getting one wrong once.'],['Cultural Event Volunteer','Helped visitors from different backgrounds find things to do that actually matched what they were interested in. Got asked a lot of last-minute questions, most of which had good answers.']],
   archetype:{motivation:'understanding how people build a life for themselves, wherever they are', strengths:['Asks locals more questions than the guidebook answers.','Notices the small daily habits that make a new place feel different.','Would rather get slightly lost than follow the obvious route.','Remembers a place by one small, specific detail nobody else noticed.','Keeps comparing new places back to the last one, out loud, unprompted.'], facts:['Has a note somewhere with a stranger’s restaurant recommendation from years ago.','Packs light and still somehow overpacks.','Can find the local favorite spot within a day of arriving anywhere.','Keeps a running list of tiny travel details other people forget.']}},
 Reading:{title:'Community Book Lover',skills:['Critical analysis','Communication','Organization','Discussion facilitation','Planning'],exp:[['Book Club Member','Led a few book club conversations, usually more prepared than necessary. Tried to get the quieter members talking too, with mixed results.'],['Library Volunteer','Reorganized some shelves and put together a few themed displays, partly because the old ones bothered me. Helped visitors track down a book they half-remembered the cover of.']],
   archetype:{motivation:'chasing one good idea back to wherever it actually came from', strengths:['Follows one footnote until it becomes an entirely different afternoon.','Remembers which book a random fact came from, months later.','Keeps reading past the point where the answer was already found.','Notices when an argument has a hole in it, even in a good book.','Recommends books based on a five-minute read of someone’s mood.','Rarely gives up on a book, even a bad one.'], facts:['Has at least three books going at once, on purpose.','Dog-ears pages, then feels guilty about it, then does it again.','Can quote a favorite line but never remembers where it is from.']}},
 Design:{title:'Creative Brand Builder',skills:['Visual design','Creative thinking','Communication','Problem solving','Planning'],exp:[['Design Club Member','Designed posters and visuals for a few school projects, usually starting from someone’s rough sketch. Tried to keep a similar style across all of them, not always successfully.'],['Creative Workshop Volunteer','Put together templates and materials so beginners could join creative sessions without feeling lost. Gave feedback when asked, and tried not to be too honest about the bad ideas.']],
   archetype:{motivation:'making a rough idea look like it was always meant to exist', strengths:['Notices when spacing is off by a few pixels, unprompted.','Keeps redoing a layout that already looked fine to everyone else.','Can explain exactly why one version works better than another.','Collects inspiration from places that have nothing to do with the project.','Would rather start over than patch something that is not quite right.'], facts:['Has strong opinions about fonts that nobody asked for.','Keeps a folder of "inspiration" that is mostly unrelated screenshots.','Notices bad spacing in places most people would never look.','Turns any car ride into an impromptu brainstorming session for the next project.','Keeps a folder of half-finished projects that seemed important at the time.']}},
 Gardening:{title:'Calm Community Creator',skills:['Planning','Teamwork','Attention to detail','Adaptability','Organization'],exp:[['Community Garden Volunteer','Helped take care of plants and figure out a low-maintenance layout for a neighborhood green space. Wrote down what survived each season and what quietly didn’t.'],['Eco Club Member','Made a few posters about nature and small sustainability ideas anyone could actually do. Helped organize small clean-up days, usually smaller than planned.']],
   archetype:{motivation:'understanding how people turn a shared space into somewhere they belong', strengths:['Makes people feel included without making a big deal about it.','Notices when someone is standing at the edge of a group, unsure.','Remembers who was there the first time, even years later.','Keeps showing up to the same shared space, week after week.','Would rather fix something quietly than take credit for fixing it.','Ends up organizing the whole clean-up day without meaning to.'], facts:['Knows most of the neighbors by name, and most of their plants too.','Has strong opinions about whose tomatoes are actually doing well.','Keeps a small stash of seeds for whoever asks.']}},
 'Discovering Cafés':{title:'Future Café Owner',skills:['Customer care','Research','Communication','Creativity','Planning'],exp:[['Café Explorer','Kept a notebook of favorite cosy cafés — the menu, the seating, small details worth remembering. Turned it into a list of recommendations friends actually asked for.'],['Community Event Volunteer','Helped welcome guests at a few local events and tried to make newcomers feel less awkward standing alone. Handled the small last-minute details nobody else wanted to deal with.']],
   archetype:{motivation:'noticing the small details that make a place feel like somewhere, not just anywhere', strengths:['Notices the small details that make a place feel like somewhere.','Remembers exactly which seat by the window was the good one.','Can tell within a few minutes whether a new place has "it."','Keeps a running mental list of places worth going back to.','Notices when a place is trying too hard, or not hard enough.','Notices when a café’s playlist feels a little off before anyone else does.'], facts:['Has a favorite order at more cafés than is probably reasonable.','Judges a place by its playlist, fairly or not.','Keeps meaning to write a proper list and instead just remembers it all.']}},
 Cinema:{title:'Aspiring Documentary Maker',skills:['Visual storytelling','Research','Directing basics','Communication','Planning'],exp:[['Film Club Member','Talked through films in way too much detail with a small team and pitched a few short video ideas. Helped turn the better ones into an actual shot list.'],['Community Event Volunteer','Helped run a film screening at a small local event and fixed a few last-minute technical problems, mostly by unplugging and replugging things. Introduced each film with a short note, usually written five minutes beforehand.']],
   archetype:{motivation:'chasing down the story hiding inside an ordinary moment', strengths:['Notices the small detail in a scene that explains everything later.','Remembers a film by one shot, not the whole plot.','Would rather rewatch a favorite than start something new and risk it.','Still thinking about an ending long after everyone else has moved on.','Notices when a story is borrowing from somewhere else, usually correctly.'], facts:['Has opinions about directors that come up more than anyone asked for.','Rewatches the same three films more than anything new.','Notices continuity errors and immediately needs to mention them.']}}
};
const cap = s => s.charAt(0).toUpperCase()+s.slice(1);
const lowerFirst = s => s.charAt(0).toLowerCase()+s.slice(1);
// Functional CVs traditionally keep experience brief so skills stay the
// focus — trim each entry down to its opening sentence for that format only.
const firstSentence = text => { const i = text.indexOf('. '); return i===-1 ? text : text.slice(0, i+1); };
function pickStrengths(style, archetype){
  const meta = styleMeta[style];
  const signature = meta ? cap(meta.trait) + '.' : 'Usually finds a way to adapt when plans change.';
  const pool = archetype.strengths.filter(x=>x!==signature);
  const shuffled = [...pool].sort(()=>Math.random()-0.5);
  return [signature, ...shuffled.slice(0,2)];
}
// The summary reads differently per CV type — chronological leans on
// journey/time language, functional leans on ability-first language,
// combined blends both. The rule for every line here: describe behavior,
// don't label the person. "Enjoys turning ideas into stories" beats
// "creative individual" — the reader should conclude the trait themselves.
const summaryTemplates = {
  'Chronological CV': (name, style, meta, activityLower) => [
    `${name} got into ${activityLower} a while back and never really stopped — these days it looks a lot like ${meta.trait}.`,
    `It started small: a bit of ${activityLower} here and there. Somewhere along the way, ${name} ended up ${meta.trait}.`,
    `${name} has been into ${activityLower} for as long as anyone can remember, always ${meta.trait}. Some people just call that ${meta.synonym}.`,
    `Ask ${name} how it all began and the answer is always ${activityLower}. One thing led to another, mostly ${meta.trait} along the way.`
  ],
  'Functional CV': (name, style, meta, activityLower) => [
    `${name} is the kind of ${style.toLowerCase()} person who ends up ${meta.trait} without really trying.`,
    `Ask around and people will say ${name} is good at ${activityLower} — mostly because of a habit of ${meta.trait}. Call it ${meta.synonym} if you want a word for it.`,
    `${name}'s thing is ${activityLower}, and it shows: always ${meta.trait}.`,
    `What ${name} is actually good at does not always show up on paper — it looks more like ${meta.trait}, especially around ${activityLower}.`
  ],
  'Combined CV': (name, style, meta, activityLower) => [
    `${name} has picked up ${activityLower} through a mix of trying things and paying attention, which mostly means ${meta.trait}. If that sounds ${meta.synonym}, it probably is.`,
    `Half habit, half practice: ${name}'s relationship with ${activityLower} comes down to ${meta.trait}, learned by doing it, not reading about it.`,
    `${name} learned ${activityLower} the same way most people learn anything worth learning — a little bit at a time, mostly by ${meta.trait}.`,
    `Somewhere between ${style.toLowerCase()} instinct and real practice, ${name} ended up ${meta.trait} through ${activityLower}.`
  ]
};
// This is the sentence that actually creates narrative coherence: it names
// the person's underlying motivation (from the activity's archetype) and
// explicitly ties it to the dream achievement, so the dream reads as a
// consequence of who they already are instead of an unrelated add-on.
const connector = {
  'Chronological CV': [
    (motivation, dreamLower) => `That same instinct — ${motivation} — is part of why the plan is to ${dreamLower}.`,
    (motivation, dreamLower) => `It comes back to ${motivation}, which is part of why the next step is to ${dreamLower}.`
  ],
  'Functional CV': [
    (motivation, dreamLower) => `Strip away the details and it comes down to ${motivation} — part of why the goal is to ${dreamLower}.`,
    (motivation, dreamLower) => `That is the real thing underneath it all: ${motivation}. It shapes the goal to ${dreamLower}, too.`
  ],
  'Combined CV': [
    (motivation, dreamLower) => `Both the everyday work and the bigger dream trace back to the same thing: ${motivation}. It shapes the goal to ${dreamLower}.`,
    (motivation, dreamLower) => `Whether it is the day-to-day or the big dream, it circles back to ${motivation} — which plays into wanting to ${dreamLower}.`
  ]
};
// A closing "flavor" sentence, also voiced per type, tacked on after the
// base template — makes the summary a full paragraph instead of two short
// clauses, and doubles the effective combinations (4 base × 4 flavor).
const summaryFlavor = {
  'Chronological CV': [
    'Nothing about it happened overnight — it just added up, one small step after another.',
    'Anyone who has known them a while can point to the exact moment it started.',
    'It is less a straight line and more a habit that stuck.',
    'Ask what changed over the years and the honest answer is: not much, just more of it.'
  ],
  'Functional CV': [
    'It rarely looks like effort from the outside — more like something they just do without noticing.',
    'Give them a problem in this area and they will quietly figure it out before anyone asks.',
    'It shows up in small ways more than big announcements.',
    'Nobody had to teach them this part — it just clicked early on.'
  ],
  'Combined CV': [
    'Some of it came from doing, some from just paying attention — hard to say which mattered more.',
    'It is not one thing or the other, more like both at once, most of the time.',
    'Half of it is instinct, the other half is just repetition.',
    'It is hard to tell where the practice ends and the natural part begins.'
  ]
};
// The closing line still names two concrete skills (so it previews the
// Skills section below), but in plain, observational phrasing instead of
// resume boilerplate like "core strengths" or "track record".
const skillNote = {
  'Chronological CV': (a, b) => `Spends a lot of time on ${a} and ${b}, picked up mostly the hard way.`,
  'Functional CV': (a, b) => `Especially good at ${a} and ${b} — the kind of thing that just comes naturally.`,
  'Combined CV': (a, b) => `Somewhere between ${a} and ${b} is where most of the real learning happened, half instinct and half practice.`
};
// A final wrap-up line, one more voiced-per-type sentence — casual idioms
// (a knack for, keeps at it, the hard way) rather than resume buzzwords.
const summaryClosing = {
  'Chronological CV': [
    'Still keeps at it, even on the days it would be easier not to.',
    'Has a habit of finishing what gets started, eventually.',
    'Picked up most of it the hard way — by doing, not by planning.',
    'The kind of person who shows up again the next day and keeps going.'
  ],
  'Functional CV': [
    'Has a real knack for figuring out the parts other people skip.',
    'Picks up on things fast, then quietly gets better at them.',
    'The one people ask first when something needs sorting out.',
    'Notices the small stuff most people walk right past.'
  ],
  'Combined CV': [
    'Learned some of it on purpose and some of it by accident, and both stuck.',
    'Sticks with things long enough to actually get good at them.',
    'Somewhere between practice and instinct, it just works.',
    'Has a knack for it, and the hours put in back it up.'
  ]
};
function buildSummary(name, style, activity, dream, type, skills, archetype){
  const meta = styleMeta[style] || {synonym:style.toLowerCase(), trait:'bringing ideas to life'};
  const activityLower = activity.toLowerCase();
  const dreamLower = lowerFirst(dream);
  const pool = (summaryTemplates[type] || summaryTemplates['Combined CV'])(name, style, meta, activityLower);
  const connectorPool = connector[type] || connector['Combined CV'];
  const flavorPool = summaryFlavor[type] || summaryFlavor['Combined CV'];
  const closingPool = summaryClosing[type] || summaryClosing['Combined CV'];
  const connectorLine = random(connectorPool)(archetype.motivation, dreamLower);
  const shuffledSkills = skills ? [...skills].sort(() => Math.random()-0.5) : [];
  const [skillA, skillB] = shuffledSkills;
  const skillLine = skillA && skillB ? ' ' + (skillNote[type] || skillNote['Combined CV'])(skillA, skillB) : '';
  return `${random(pool)} ${connectorLine} ${random(flavorPool)}${skillLine} ${random(closingPool)}`;
}
function createCV(){
  const d = data[selections.activity];
  const names = ['Emma','Sofia','Maya','Olivia','Luna','Chloe','Isabella','Noah','Leo','Mila','Ethan','Amelia'];
  const name = random(names);
  const dream = projectDreams[selections.project];
  const summary = buildSummary(name, selections.style, selections.activity, dream, selections.type, d.skills, d.archetype);
  const strengths = pickStrengths(selections.style, d.archetype);
  const labels = sectionLabels[selections.type] || {};
  const isFunctional = selections.type === 'Functional CV';
  const skillTags = [...d.skills];
  const styleTag = styleSkill[selections.style];
  if (styleTag && !skillTags.includes(styleTag)) skillTags.push(styleTag);
  if (isFunctional) {
    // Functional CVs lead with skills, so this format gets a visibly deeper
    // skills list — a bonus tag the other two formats do not show.
    const bonusPool = bonusSkillPool.filter(x => !skillTags.includes(x));
    if (bonusPool.length) skillTags.push(random(bonusPool));
  }
  const expEntries = d.exp.map(x => [x[0], isFunctional ? firstSentence(x[1]) : x[1]]);
  const sections = {
    skills:`<div class="cv-section" data-section="skills"><h4>${labels.skills||'Skills'}</h4><div class="tags">${skillTags.map(x=>`<span class="tag">${x}</span>`).join('')}</div></div>`,
    strengths:`<div class="cv-section" data-section="strengths"><h4>${labels.strengths||'Strengths'}</h4><ul class="strength-list">${strengths.map(x=>`<li>${x}</li>`).join('')}</ul></div>`,
    experience:`<div class="cv-section" data-section="experience"><h4>${labels.experience||'Experience'}</h4>${expEntries.map(x=>`<div class="experience-item"><b>${x[0]}</b><p>${x[1]}</p></div>`).join('')}</div>`,
    fun:`<div class="cv-section" data-section="fun"><h4>Fun Fact</h4><p>${random(d.archetype.facts)}</p></div>`,
    dream:`<div class="cv-section dream" data-section="dream"><h4>Dream Achievement</h4><p>${random(dreamLeadIns)} ${dream}.</p></div>`
  };
  const order = selections.type==='Chronological CV'?['experience','skills','strengths','fun','dream']:selections.type==='Functional CV'?['skills','strengths','experience','fun','dream']:['skills','experience','strengths','fun','dream'];
  const intro = random(typeIntros[selections.type] || ['']);
  $('#cv-paper').className='cv-paper';
  $('#cv-paper').innerHTML=`<div class="cv-header"><div><h3>${name}</h3><p class="cv-title">${d.title}</p></div><span class="cv-badge">${selections.type}</span></div><p class="cv-type-note">${intro}</p><p class="cv-summary"><b>Professional summary:</b> ${summary}</p><div class="cv-layout">${order.map(x=>sections[x]).join('')}</div>`;
  show('#result');
}
function surprise(){steps.forEach(s=>selections[s.key]=random(s.options)[1]);createCV()}
function toast(msg){$('#toast').textContent=msg;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),2800)}
$('.start').onclick=()=>{renderStep();show('#builder')};$('.surprise').onclick=surprise;$('.next').onclick=()=>{if(current===3)createCV();else{current++;renderStep()}};$('.back-button').onclick=()=>{if(current){current--;renderStep()}};$('.restart').onclick=()=>{Object.keys(selections).forEach(k=>delete selections[k]);current=0;show('#welcome')};$('.brand').onclick=e=>{e.preventDefault();Object.keys(selections).forEach(k=>delete selections[k]);current=0;show('#welcome')};$('.share-button').onclick=()=>{const paper=$('#cv-paper');paper.classList.toggle('share-mode');toast(paper.classList.contains('share-mode')?'Share card view is ready for your screenshot!':'Full CV view restored.')};
