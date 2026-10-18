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
  gallery.dataset.exampleSet = selected.name;
  gallery.alt = selected.label + ': illustrative Gemini and Veo before and after examples';
  gallery.addEventListener('error', () => {
    if (selected.name !== 'nature') gallery.src = './assets/showcase-nature.png';
  }, { once: true });
  gallery.src = './assets/showcase-' + selected.name + '.png';
  try { sessionStorage.setItem('payal-showcase-previous', selected.name); } catch (_) {}
})();
