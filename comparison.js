// Illustrative before/after pairs share one photo; HTML adds the sample watermark.
(() => {
  const container = document.getElementById('random-comparison');
  const before = document.getElementById('comparison-before');
  const after = document.getElementById('comparison-after');
  if (!container || !before || !after) return;

  const variants = [
    { name: 'fox', label: 'White fox in a moonlit forest' },
    { name: 'space', label: 'Astronaut beside a ringed blue planet' },
    { name: 'lake', label: 'Mountain lake with a red cabin' },
    { name: 'villa', label: 'Seaside villa at sunset' }
  ];
  let previous = '';
  try { previous = sessionStorage.getItem('payal-comparison-previous') || ''; } catch (_) {}
  const choices = variants.filter(variant => variant.name !== previous);
  const selected = choices[Math.floor(Math.random() * choices.length)];
  const apply = variant => {
    const source = './assets/comparison-' + variant.name + '.png';
    before.src = source;
    after.src = source;
    before.alt = variant.label + ': illustrative example with a sample sparkle watermark';
    after.alt = variant.label + ': the same illustration without the sample watermark';
    container.dataset.exampleSet = variant.name;
  };
  const fallback = () => {
    before.onerror = null;
    after.onerror = null;
    apply(variants[0]);
  };
  before.onerror = fallback;
  after.onerror = fallback;
  apply(selected);
  try { sessionStorage.setItem('payal-comparison-previous', selected.name); } catch (_) {}
})();
