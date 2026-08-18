(() => {
  const paper = document.querySelector('#cv-paper');
  const card = document.querySelector('#learning-card');
  const descriptions = {
    'Chronological CV': ['📅', 'Chronological CV', 'Experience and steady progress over time take the spotlight first.'],
    'Functional CV': ['🛠', 'Functional CV', 'Skills and strengths lead the way, showing what this person can do.'],
    'Combined CV': ['🔀', 'Combined CV', 'Skills and experience share the spotlight for a balanced picture.']
  };
  // A glossary of the "harder" words this app actually writes into the CV
  // (style synonyms, resume-vocabulary phrases). Rather than showing random
  // expressions, this scans the generated CV text and only surfaces the
  // definitions for words that genuinely appear in it this time.
  const vocab = document.querySelector('#vocab-card');
  const vocabGlossary = [
    ['imaginative', 'full of new, creative ideas'],
    ['inquisitive', 'eager to ask questions and learn more'],
    ['methodical', 'careful, organized, and done step by step'],
    ['sociable', 'friendly and enjoys spending time with other people'],
    ['composed', 'calm, even under pressure'],
    ['daring', 'willing to take risks; brave enough to try new things'],
    ['resourceful', 'good at finding clever solutions with what is available'],
    ['articulate', 'able to express ideas clearly'],
    ['knack for', 'a natural ability to do something well, without much effort'],
    ['picks up on', 'notices or understands something quickly'],
    ['sorting out', 'solving a problem or organizing something'],
    ['keeps at it', 'keeps trying, without giving up'],
    ['the hard way', 'by making mistakes, instead of being told directly'],
    ['clicked', 'suddenly made sense or felt easy to understand'],
    ['sticks with', 'continues doing something, without stopping'],
    ['added up', 'became more and more, over time'],
    ['comes naturally', 'is easy for someone, without needing to learn it'],
    ['instinct', 'a natural way of reacting, without thinking about it first'],
    ['worth checking out', 'good enough that someone should look at it or try it'],
    ['down the line', 'at some point in the future'],
    ['figure it out', 'to understand or solve something by thinking about it'],
    ['figuring out', 'understanding or solving something by thinking about it'],
    ['half-finished', 'started, but not yet complete'],
    ['without really trying', 'easily, without much effort'],
    ['on paper', 'in official documents or records, as opposed to in real life'],
    ['impromptu', 'done without planning ahead'],
    ['milestone', 'an important point or event marking progress'],
    ['center stage', 'the most important or most noticed position'],
    ['in the spotlight', 'getting the most attention'],
    ['take a back seat', 'become less important, for now'],
    ['equal billing', 'getting the same amount of attention or credit as something else'],
    ['mapped out', 'planned in detail, step by step'],
    ['on track', 'making good progress, following the plan'],
    ['moved on', 'stopped thinking about something and started something new'],
    ['at the last minute', 'very close to the deadline, with little time left'],
    ['ends up', 'eventually does or becomes something, often without planning it'],
    ['without meaning to', 'unintentionally, by accident'],
    ['picks things up', 'learns new skills or information quickly'],
    ['gives up on', 'stops trying to do something'],
    ['a little off', 'not quite right, slightly strange'],
    ['got into', 'became interested in or started doing something'],
    ['here and there', 'in small amounts, occasionally'],
    ['for as long as anyone can remember', 'for a very long time'],
    ['one thing led to another', 'events happened naturally, one after another, without much planning'],
    ['ask around', 'ask several different people the same question'],
    ['it shows', "it is obvious or easy to notice"],
    ['comes down to', 'the basic fact or reason is'],
    ['a little bit at a time', 'gradually, in small steps'],
    ['happened overnight', 'happened very suddenly or quickly'],
    ['stuck', 'stayed permanently; did not go away'],
    ['from the outside', "from another person's point of view, without knowing all the details"],
    ['hard to tell', 'difficult to know for sure'],
    ['walk right past', 'go past something without noticing it'],
    ['on purpose', 'intentionally, not by accident'],
    ['by accident', 'unintentionally, without planning it'],
    ['put in', 'invested time or effort'],
    ['back it up', 'support or prove a claim'],
    ['running list', 'a list that keeps growing as new items are added'],
    ['scroll straight past', 'keep scrolling without stopping to look at something'],
    ['brainstorming', 'coming up with many ideas quickly, often in a group'],
    ['the big one', 'the most important one'],
    ['cannot put down', "so interesting that it is hard to stop reading or using it"],
    ['catching up with', 'meeting someone to talk about what has happened recently'],
    ['swapping stories', 'sharing and exchanging stories with each other'],
    ['outgrow', 'become too big or advanced for something'],
    ['regulars', 'people who visit a place often'],
    ['lineup', 'a list of people performing or taking part in something'],
    ['nobody saw coming', 'completely unexpected'],
    ['byline', 'the line that gives the name of the writer of an article'],
    ['stocked with', 'filled or supplied with'],
    ['got good at', 'became skilled at something, usually through practice'],
    ['at ease', 'relaxed and comfortable, not nervous'],
    ['an easy read', 'something simple and pleasant to read'],
    ['pitched', 'suggested or proposed an idea'],
    ['came up with', 'thought of or invented an idea'],
    ['set up', 'prepared or put something in place'],
    ['running late', 'behind schedule; later than planned'],
    ['tried out', 'tested something to see if it works well'],
    ['plated', 'arranged food nicely on a plate before serving'],
    ['double-checked', 'checked something again to make sure it is correct'],
    ['last-minute', 'happening or done very close to the deadline'],
    ['mixed results', 'partly successful and partly not'],
    ['put together', 'made or assembled something from different parts'],
    ['track down', 'find something or someone after searching for a while'],
    ['half-remembered', 'only partly remembered, not clearly'],
    ['rough sketch', 'a quick, simple drawing that is not detailed or final'],
    ['feeling lost', 'confused, not understanding what is happening'],
    ['low-maintenance', 'needing very little care or attention'],
    ['deal with', 'handle or take care of a problem or situation'],
    ['talked through', 'discussed something in detail, step by step'],
    ['part of why', 'one of the reasons, though not the only one'],
    ['trace back to', 'can be followed back to an original cause or source'],
    ['circles back to', 'returns to the same idea or topic'],
    ['plays into', 'is one of the reasons behind something, or supports it'],
    ['underneath it all', 'at the most basic or true level, once everything else is set aside'],
    ['rush past', 'move by quickly, without stopping to notice'],
    ['word for word', 'using the exact same words, without changing anything'],
    ['left out', 'not included in a group or activity'],
    ['hole in it', 'a weak or missing part in an argument or plan'],
    ['start over', 'begin again from the beginning'],
    ['take credit for', 'let people think you are responsible for something good'],
    ['stash of', 'a hidden or private supply of something'],
    ['nobody asked for', 'unwanted or unrequested, but given anyway'],
    ['point to', 'identify or indicate something as the cause or source'],
    ['over the years', 'during a long period of time'],
    ['shows up', 'appears or becomes noticeable'],
    ['early on', 'at an early stage, near the beginning'],
    ['keeps going', 'continues, without stopping'],
    ['strip away', 'remove extra parts to reveal the basic truth underneath'],
    ['borrowing from', 'taking ideas or style from another source'],
    ['run out', 'come to an end; be used up'],
    ['low bar', 'an easy standard to meet'],
    ['off day', 'a day when someone is not at their best'],
    ['needs to breathe', 'needs time or space, without being rushed'],
    ['call it done', 'decide that something is finished'],
    ['leans in', 'shows more interest or gets more involved'],
    ['chronological cv', 'a resume that lists work experience by date, usually starting with the most recent'],
    ['functional cv', 'a resume that focuses on skills and abilities instead of dates'],
    ['combined cv', 'a resume that mixes skills and work experience together'],
    ['track record', 'a record of what someone has done and how well they have done it'],
    ['career timeline', 'a summary of someone’s jobs and experience, in the order they happened'],
    ['core strengths', 'the abilities someone is naturally best at'],
    ['standout qualities', 'qualities that make someone noticeably different or better than others'],
    ['top traits', 'someone’s most noticeable characteristics'],
    ['proven experience', 'experience that has already shown good results'],
    ['what sets this apart', 'what makes someone or something different from the rest'],
    ['professional summary', 'a short paragraph at the top of a CV that introduces a person’s skills and goals'],
    ['career diary', 'a record of someone’s jobs and experience, written like a personal diary'],
    ['hands-on', 'involving direct, practical experience rather than just theory']
  ];
  function refineVocab() {
    if (!vocab) return;
    const text = paper.textContent.toLowerCase();
    const matches = vocabGlossary.filter(([phrase]) => text.includes(phrase));
    if (!matches.length) { vocab.innerHTML = ''; return; }
    const picks = [...matches].sort(() => Math.random() - 0.5);
    vocab.innerHTML = `<b>📚 Words from your CV</b><ul>${picks.map(([phrase, meaning]) => `<li><strong>${phrase}</strong> — ${meaning}</li>`).join('')}</ul>`;
  }
  function refine() {
    const badge = paper.querySelector('.cv-badge');
    if (!badge) return;
    const type = badge.textContent.trim();
    const className = type.replace(' CV', '').toLowerCase();
    paper.classList.remove('chronological', 'functional', 'combined');
    paper.classList.add(className);
    paper.querySelectorAll('.cv-section').forEach(section => {
      const key = section.dataset.section;
      if (key) section.classList.add(key);
    });
    const experiences = paper.querySelectorAll('.experience-item');
    const timeline = ['2026 · Dream project', '2025 · Creative practice', '2024 · First ideas'];
    experiences.forEach((item, index) => {
      if (!item.querySelector('.experience-meta')) {
        const meta = document.createElement('span');
        meta.className = 'experience-meta';
        meta.textContent = timeline[index] || '2024 · Learning journey';
        item.querySelector('b').after(meta);
      }
    });
    const [icon, title, copy] = descriptions[type];
    card.innerHTML = `<span>${icon}</span><div><b>${title}</b><p>${copy}</p></div>`;
    refineVocab();
  }
  new MutationObserver(refine).observe(paper, { childList: true });
  window.selectComparison = (type, button) => {
    const details = {
      chronological: 'Experience takes center stage, tracing a career path from the newest projects back to earlier ones. Ideal for showing steady, consistent progress.',
      functional: 'Skills take center stage, useful when strengths and transferable abilities should matter more than exact dates.',
      combined: 'Skills and experience share equal billing, giving a balanced view of abilities and real projects.'
    };
    document.querySelectorAll('.compare-option').forEach(option => option.classList.remove('selected'));
    button.classList.add('selected');
    document.querySelector('#compare-detail').textContent = details[type];
    window.selectedComparison = type;
    document.querySelector('#confirm-comparison').disabled = false;
  };
  window.confirmComparison = () => {
    const labels = { chronological: 'Chronological CV', functional: 'Functional CV', combined: 'Combined CV' };
    if (!window.selectedComparison) return;
    selections.type = labels[window.selectedComparison];
    document.querySelector('#compare-dialog').removeAttribute('open');
    createCV();
  };
})();
