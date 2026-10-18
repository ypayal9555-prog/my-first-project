// Decorative examples only; no uploads or watermark processing are involved.
(() => {
  const gallery = document.getElementById('showcase-gallery');
  if (!gallery) return;

  const sets = [
    { name: 'nature', label: 'Alpine lake and tropical coast' },
    { name: 'wildlife', label: 'Snow leopard and forest deer' },
    { name: 'city', label: 'Waterfront skyline and evening street' },
    { name: 'product', label: 'Headphones and coastal sports car' }
  ];

  // Avoid an immediate repeat in this tab. Storage may be disabled by the browser.
  let previous = '';
  try { previous = sessionStorage.getItem('payal-showcase-previous') || ''; } catch (_) {}
  const choices = sets.filter(set => set.name !== previous);
  const selected = choices[Math.floor(Math.random() * choices.length)];
  const host = gallery.closest('.ice-gallery');
  if (!host) return;
  host.classList.add('has-card-hotspots');
  const ns = 'http://www.w3.org/2000/svg';
  const labels = ['Gemini image — Before', 'Gemini image — After', 'Veo video — Before', 'Veo video — After'];
  const layouts = {
    nature: [[13,5,37,46,-8],[53,12,33,45,7],[20,58,29,33,-6],[54,61,29,33,5]],
    product: [[13,7,36,45,-8],[53,13,34,45,7],[20,59,29,33,-6],[53,61,29,33,5]],
    city: [[9,7,38,43,-9],[54,15,34,42,8],[17,59,32,33,-5],[55,63,31,31,5]],
    wildlife: [[10,6,39,45,-9],[53,16,36,43,8],[18,59,31,33,-5],[54,64,31,31,5]]
  };
  const dialog = document.createElement('dialog');
  dialog.className = 'showcase-preview';
  dialog.setAttribute('aria-labelledby', 'showcase-preview-title');
  const title = document.createElement('h2'); title.id = 'showcase-preview-title';
  const close = document.createElement('button'); close.type = 'button'; close.className = 'showcase-preview-close';
  close.textContent = 'Close ×';
  const preview = document.createElementNS(ns, 'svg'); preview.setAttribute('role', 'img');
  const photo = document.createElementNS(ns, 'image');
  preview.append(photo);
  const note = document.createElement('p'); note.textContent = 'Illustrative example · Press Esc or Close to return';
  dialog.append(title, close, preview, note);
  // The script runs before </main>; the dialog stays inside the gallery host.
  host.append(dialog);
  let opener;
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => opener?.focus({preventScroll:true}));
  labels.forEach((label, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'showcase-hotspot cursor-surface';
    button.setAttribute('aria-label', 'Preview ' + label + ' illustrative example');
    button.setAttribute('aria-haspopup', 'dialog');
    const [x,y,w,h,angle] = layouts[selected.name][index];
    button.style.cssText = `left:${x}%;top:${y}%;width:${w}%;height:${h}%;--card-angle:${angle}deg`;
    button.addEventListener('click', () => {
      if (!gallery.complete || !gallery.naturalWidth) return;
      opener = button; title.textContent = label;
      const width = gallery.naturalWidth, height = gallery.naturalHeight;
      // Expand the crop to include the rotated card's border. The PNG is unchanged.
      const left = Math.max(0,x-5), top = Math.max(0,y-5);
      const cw = Math.min(100-left,w+10), ch = Math.min(100-top,h+10);
      preview.setAttribute('viewBox', `${left/100*width} ${top/100*height} ${cw/100*width} ${ch/100*height}`);
      preview.setAttribute('aria-label', label + ' illustrative example');
      photo.setAttribute('href', gallery.currentSrc || gallery.src);
      photo.setAttribute('width', String(width)); photo.setAttribute('height', String(height));
      dialog.showModal();
    });
    host.append(button);
  });
  gallery.addEventListener('load', () => host.style.setProperty('--gallery-ratio', `${gallery.naturalWidth} / ${gallery.naturalHeight}`));
  gallery.dataset.exampleSet = selected.name;
  gallery.alt = selected.label + ': illustrative Gemini and Veo before and after examples';
  gallery.addEventListener('error', () => {
    if (selected.name !== 'nature') gallery.src = './assets/showcase-nature.png';
  }, { once: true });
  gallery.src = './assets/showcase-' + selected.name + '.png';
  try { sessionStorage.setItem('payal-showcase-previous', selected.name); } catch (_) {}
})();
