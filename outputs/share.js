(() => {
  const shareButton = document.querySelector('.share-button');
  const toast = message => {
    const element = document.querySelector('#toast');
    element.textContent = message;
    element.classList.add('show');
    setTimeout(() => element.classList.remove('show'), 3200);
  };
  const lines = (context, text, x, y, width, lineHeight, maxLines = 99) => {
    const words = text.split(' '); let line = ''; let count = 0;
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (context.measureText(next).width > width && line) {
        context.fillText(line, x, y + count * lineHeight); count++; line = word;
        if (count === maxLines) return y + count * lineHeight;
      } else line = next;
    }
    if (count < maxLines) { context.fillText(line, x, y + count * lineHeight); count++; }
    return y + count * lineHeight;
  };
  async function createShareImage() {
    const paper = document.querySelector('#cv-paper');
    const name = paper.querySelector('.cv-header h3')?.textContent || 'My Dream CV';
    const title = paper.querySelector('.cv-title')?.textContent || 'Future creator';
    const type = paper.querySelector('.cv-badge')?.textContent || 'Dream CV';
    const summary = paper.querySelector('.cv-summary')?.textContent.replace('Professional summary:', '').trim() || '';
    const skills = [...paper.querySelectorAll('.tag')].slice(0, 5).map(tag => tag.textContent);
    const dream = paper.querySelector('.dream p')?.textContent || '';
    const canvas = document.createElement('canvas'); canvas.width = 1080; canvas.height = 1350;
    const c = canvas.getContext('2d');
    c.fillStyle = '#f6fbf7'; c.fillRect(0, 0, 1080, 1350);
    c.fillStyle = '#dff5e3'; c.beginPath(); c.arc(970, 85, 220, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#ffffff'; c.beginPath(); c.roundRect(62, 65, 956, 1218, 42); c.fill();
    c.fillStyle = '#51bd6b'; c.save(); c.translate(130, 122); c.rotate(Math.PI / 4); c.roundRect(-20, -20, 40, 40, 5); c.fill(); c.restore();
    c.fillStyle = '#21854a'; c.font = '700 25px Arial'; c.fillText('BUILD YOUR DREAM CV', 170, 130);
    c.fillStyle = '#24332a'; c.font = '700 78px Georgia'; c.fillText(name, 120, 255);
    c.fillStyle = '#21854a'; c.font = '700 34px Arial'; c.fillText(title, 120, 310);
    c.fillStyle = '#e5f8e9'; c.beginPath(); c.roundRect(760, 230, 175, 48, 22); c.fill();
    c.fillStyle = '#21854a'; c.font = '700 17px Arial'; c.fillText(type.toUpperCase(), 785, 260);
    c.strokeStyle = '#dce8df'; c.lineWidth = 2; c.beginPath(); c.moveTo(120, 360); c.lineTo(960, 360); c.stroke();
    c.fillStyle = '#21854a'; c.font = '700 21px Arial'; c.fillText('PROFESSIONAL SUMMARY', 120, 420);
    c.fillStyle = '#526259'; c.font = '31px Arial'; let y = lines(c, summary, 120, 470, 820, 44, 4) + 45;
    c.fillStyle = '#21854a'; c.font = '700 21px Arial'; c.fillText('KEY SKILLS', 120, y); y += 35;
    c.font = '600 26px Arial'; let x = 120;
    skills.forEach(skill => { const width = c.measureText(skill).width + 42; if (x + width > 940) { x = 120; y += 58; } c.fillStyle = '#edf7ef'; c.beginPath(); c.roundRect(x, y, width, 42, 16); c.fill(); c.fillStyle = '#365b42'; c.fillText(skill, x + 21, y + 29); x += width + 12; });
    y += 105; c.fillStyle = '#21854a'; c.font = '700 21px Arial'; c.fillText('DREAM ACHIEVEMENT', 120, y); y += 48;
    c.fillStyle = '#526259'; c.font = '31px Arial'; lines(c, dream, 120, y, 820, 44, 3);
    c.fillStyle = '#24332a'; c.font = 'italic 30px Georgia'; c.fillText('My future starts with a dream.', 120, 1145);
    c.fillStyle = '#51bd6b'; c.fillRect(120, 1193, 840, 4);
    c.fillStyle = '#65756a'; c.font = '20px Arial'; c.fillText('A playful English-learning activity · Dream CV', 120, 1235);
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
