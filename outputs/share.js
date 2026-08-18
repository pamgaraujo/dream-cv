(() => {
  const shareButton = document.querySelector('.share-button');
  const toast = message => {
    const element = document.querySelector('#toast');
    element.textContent = message;
    element.classList.add('show');
    setTimeout(() => element.classList.remove('show'), 3200);
  };

  // Wraps text at `width`, drawing each line only when draw=true. Always
  // returns the y position after the last line, so the same call can be
  // used both to measure (draw=false, on a throwaway context) and to
  // actually paint (draw=true, on the correctly-sized canvas).
  function wrapText(ctx, text, x, y, width, lineHeight, draw) {
    const words = text.split(' ');
    let line = '', count = 0;
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width > width && line) {
        if (draw) ctx.fillText(line, x, y + count * lineHeight);
        count++; line = word;
      } else line = next;
    }
    if (line) { if (draw) ctx.fillText(line, x, y + count * lineHeight); count++; }
    return y + count * lineHeight;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  }

  // Reads the CV exactly as rendered on screen — same section order and
  // same labels the chosen CV type produced — so the share image always
  // matches what is on the page, whichever format was picked.
  function readCV() {
    const paper = document.querySelector('#cv-paper');
    const name = paper.querySelector('.cv-header h3')?.textContent || 'My Dream CV';
    const title = paper.querySelector('.cv-title')?.textContent || 'Future creator';
    const type = paper.querySelector('.cv-badge')?.textContent || 'Dream CV';
    const summary = paper.querySelector('.cv-summary')?.textContent.replace('Professional summary:', '').trim() || '';
    const sections = [...paper.querySelectorAll('.cv-layout > .cv-section')].map(sec => {
      const label = (sec.querySelector('h4')?.textContent || '').trim();
      const key = sec.dataset.section;
      if (key === 'skills') return { key, label, tags: [...sec.querySelectorAll('.tag')].map(t => t.textContent) };
      if (key === 'strengths') return { key, label, items: [...sec.querySelectorAll('li')].map(li => li.textContent) };
      if (key === 'experience') return {
        key, label,
        items: [...sec.querySelectorAll('.experience-item')].map(item => ({
          role: item.querySelector('b')?.textContent || '',
          desc: item.querySelector('p')?.textContent || ''
        }))
      };
      return { key, label, text: sec.querySelector('p')?.textContent || '' };
    });
    return { name, title, type, summary, sections };
  }

  // Draws the whole card content top to bottom, in the CV's own section
  // order. With draw=false it only advances the y cursor (a dry run used
  // to measure the final canvas height); with draw=true it actually
  // paints. Both passes must take the exact same path, which is why every
  // font/width decision happens unconditionally and only fillText/fillRect
  // calls are gated on `draw`.
  function drawContent(ctx, cv, draw) {
    const W = 1080, marginX = 120, contentW = W - marginX * 2;
    let y = 130;

    ctx.font = '700 25px "Fredoka", Arial';
    if (draw) { ctx.fillStyle = '#1f9750'; ctx.fillText('BUILD YOUR DREAM CV', marginX + 50, y); }

    y += 105;
    ctx.font = '700 74px "Fredoka", Georgia';
    if (draw) { ctx.fillStyle = '#2c2417'; ctx.fillText(cv.name, marginX, y); }

    y += 50;
    ctx.font = '700 32px "Fredoka", Arial';
    if (draw) { ctx.fillStyle = '#1f9750'; ctx.fillText(cv.title, marginX, y); }
    if (draw) {
      ctx.font = '700 17px Arial';
      const badgeText = cv.type.toUpperCase();
      const badgeW = ctx.measureText(badgeText).width + 40;
      const badgeX = W - marginX - badgeW;
      ctx.fillStyle = '#eaf9ee'; roundRect(ctx, badgeX, y - 34, badgeW, 48, 22); ctx.fill();
      ctx.fillStyle = '#1f9750'; ctx.fillText(badgeText, badgeX + 20, y - 4);
    }

    y += 45;
    if (draw) { ctx.strokeStyle = '#efe6d3'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(marginX, y); ctx.lineTo(W - marginX, y); ctx.stroke(); }
    y += 55;

    ctx.font = '700 21px "Fredoka", Arial';
    if (draw) { ctx.fillStyle = '#1f9750'; ctx.fillText('PROFESSIONAL SUMMARY', marginX, y); }
    y += 40;
    ctx.font = '24px Arial';
    if (draw) ctx.fillStyle = '#5a5346';
    y = wrapText(ctx, cv.summary, marginX, y, contentW, 36, draw);
    y += 55;

    for (const sec of cv.sections) {
      ctx.font = '700 21px "Fredoka", Arial';
      if (draw) { ctx.fillStyle = sec.key === 'dream' ? '#a8730a' : '#1f9750'; ctx.fillText(sec.label.toUpperCase(), marginX, y); }
      y += 42;

      if (sec.key === 'skills') {
        let x = marginX;
        ctx.font = '600 22px Arial';
        for (const tag of sec.tags) {
          const w = ctx.measureText(tag).width + 38;
          if (x + w > W - marginX) { x = marginX; y += 58; }
          if (draw) {
            ctx.fillStyle = '#eaf9ee'; roundRect(ctx, x, y - 30, w, 42, 15); ctx.fill();
            ctx.fillStyle = '#1f9750'; ctx.fillText(tag, x + 19, y - 2);
          }
          x += w + 12;
        }
        y += 40;
      } else if (sec.key === 'strengths') {
        ctx.font = '600 22px Arial';
        for (const item of sec.items) {
          if (draw) { ctx.fillStyle = '#5a4f3d'; ctx.fillText('✦  ' + item, marginX, y); }
          y += 38;
        }
      } else if (sec.key === 'experience') {
        for (const item of sec.items) {
          ctx.font = '700 22px Arial';
          if (draw) { ctx.fillStyle = '#2c2417'; ctx.fillText(item.role, marginX, y); }
          y += 32;
          ctx.font = '20px Arial';
          if (draw) ctx.fillStyle = '#6a6046';
          y = wrapText(ctx, item.desc, marginX, y, contentW, 27, draw);
          y += 24;
        }
      } else {
        ctx.font = '24px Arial';
        if (draw) ctx.fillStyle = sec.key === 'dream' ? '#6a5a2f' : '#5a5346';
        y = wrapText(ctx, sec.text, marginX, y, contentW, 34, draw);
      }
      y += 44;
    }

    ctx.font = 'italic 30px Georgia';
    if (draw) { ctx.fillStyle = '#24332a'; ctx.fillText('My future starts with a dream.', marginX, y); }
    y += 30;
    if (draw) { ctx.fillStyle = '#51bd6b'; ctx.fillRect(marginX, y, W - marginX * 2, 4); }
    y += 42;
    ctx.font = '20px Arial';
    if (draw) { ctx.fillStyle = '#65756a'; ctx.fillText('A playful English-learning activity · Dream CV', marginX, y); }
    y += 60;

    return y;
  }

  async function createShareImage() {
    const cv = readCV();
    const W = 1080;

    // Measure pass: run the exact same draw routine on a throwaway context
    // with draw=false, just to find out how tall the real canvas needs to be.
    const scratch = document.createElement('canvas').getContext('2d');
    const totalHeight = drawContent(scratch, cv, false) + 40;

    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = totalHeight;
    const c = canvas.getContext('2d');

    c.fillStyle = '#fefaf1'; c.fillRect(0, 0, W, totalHeight);
    c.fillStyle = '#eaf9ee'; c.beginPath(); c.arc(980, 95, 230, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#fdecc7'; c.beginPath(); c.arc(70, totalHeight - 60, 170, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#fff'; roundRect(c, 58, 60, W - 116, totalHeight - 120, 42); c.fill();
    c.save(); c.translate(128, 100);
    const g = c.createLinearGradient(-22, -22, 22, 22); g.addColorStop(0, '#9df0a8'); g.addColorStop(1, '#2fbf67');
    c.fillStyle = g; c.beginPath(); c.moveTo(0, -24); c.lineTo(24, 0); c.lineTo(0, 24); c.lineTo(-24, 0); c.closePath(); c.fill();
    c.restore();

    drawContent(c, cv, true);

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    return new File([blob], 'my-dream-cv.png', { type: 'image/png' });
  }

  let generatedFile;
  let generatedUrl;
  window.closeSharePreview = () => {
    document.querySelector('#share-preview').hidden = true;
  };
  window.shareGeneratedImage = async () => {
    if (!generatedFile) return;
    try {
      if (navigator.canShare?.({ files: [generatedFile] })) await navigator.share({ title: 'My Dream CV', text: 'Here is my dream CV!', files: [generatedFile] });
      else { const link = document.createElement('a'); link.href = generatedUrl; link.download = generatedFile.name; link.click(); toast('Image downloaded — send it in WhatsApp!'); }
    } catch (error) { if (error.name !== 'AbortError') toast('Could not share the image. Please try again.'); }
  };
  shareButton.onclick = async () => {
    try {
      shareButton.disabled = true; shareButton.textContent = 'Creating image…';
      generatedFile = await createShareImage();
      if (generatedUrl) URL.revokeObjectURL(generatedUrl);
      generatedUrl = URL.createObjectURL(generatedFile);
      document.querySelector('#share-preview-image').src = generatedUrl;
      document.querySelector('#share-preview').hidden = false;
    } catch (error) { if (error.name !== 'AbortError') toast('Could not create the image. Please try again.'); }
    finally { shareButton.disabled = false; shareButton.textContent = '📸 Share image'; }
  };
})();
