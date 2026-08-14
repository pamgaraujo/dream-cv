(() => {
  const paper = document.querySelector('#cv-paper');
  const card = document.querySelector('#learning-card');
  const descriptions = {
    'Chronological CV': ['📅', 'Chronological CV', 'Experience and progression over time come first.'],
    'Functional CV': ['🛠', 'Functional CV', 'Skills and strengths show what this person can do.'],
    'Combined CV': ['🔀', 'Combined CV', 'Skills and experience receive equal attention.']
  };
  function refine() {
    const badge = paper.querySelector('.cv-badge');
    if (!badge) return;
    const type = badge.textContent.trim();
    const className = type.replace(' CV', '').toLowerCase();
    paper.classList.remove('chronological', 'functional', 'combined');
    paper.classList.add(className);
    paper.querySelectorAll('.cv-section').forEach(section => {
      const heading = section.querySelector('h4')?.textContent.trim().toLowerCase().replace(' ', '-');
      if (heading) section.classList.add(heading);
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
  }
  new MutationObserver(refine).observe(paper, { childList: true });
  window.selectComparison = (type, button) => {
    const details = {
      chronological: 'Experience gets the most attention. It shows a career path from newest projects to earlier ones.',
      functional: 'Skills get the most attention. It is useful when strengths and transferable qualifications matter most.',
      combined: 'Skills and experience have equal attention. It gives a balanced view of abilities and projects.'
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
