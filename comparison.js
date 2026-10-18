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
  let active = selected;
  let buttons = [];
  let caption;
  const apply = variant => {
    active = variant;
    const source = './assets/comparison-' + variant.name + '.png';
    before.src = source;
    after.src = source;
    before.alt = variant.label + ': illustrative example with a sample sparkle watermark';
    after.alt = variant.label + ': the same illustration without the sample watermark';
    container.dataset.exampleSet = variant.name;
    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(variants[index].name === variant.name)));
    if (caption) caption.textContent = variant.label + ' · Illustrative example';
    try { sessionStorage.setItem('payal-comparison-previous', variant.name); } catch (_) {}
  };
  const fallback = () => {
    before.onerror = null;
    after.onerror = null;
    apply(variants[0]);
  };
  before.onerror = fallback;
  after.onerror = fallback;
  const controls = document.createElement('div');
  controls.className = 'comparison-controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'Choose a before and after example');
  variants.forEach(variant => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'comparison-choice';
    button.textContent = variant.name[0].toUpperCase() + variant.name.slice(1);
    button.setAttribute('aria-controls', container.id);
    button.addEventListener('click', () => {
      if (variant.name === active.name) return;
      apply(variant);
    });
    buttons.push(button);
    controls.append(button);
  });
  caption = document.createElement('p');
  caption.className = 'comparison-caption';
  caption.setAttribute('role', 'status');
  const content = document.querySelector('#comparison .comparison-content');
  if (content) content.append(controls, caption);
  apply(selected);
  try { sessionStorage.setItem('payal-comparison-previous', selected.name); } catch (_) {}
})();
