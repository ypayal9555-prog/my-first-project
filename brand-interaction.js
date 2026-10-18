// A little pointer light and sparkle for the home link in the header.
(() => {
  function initBrandInteraction() {
    const motion = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    document.querySelectorAll('.app-header .brand').forEach(brand => {
      let frame = 0;
      let pressTimer = 0;
      let pointerX = 0;
      let pointerY = 0;
      const properties = ['--brand-light-x', '--brand-light-y', '--brand-icon-x', '--brand-icon-y', '--brand-twist', '--brand-text-x'];
      function reset() {
        cancelAnimationFrame(frame);
        clearTimeout(pressTimer);
        frame = 0;
        brand.classList.remove('brand-engaged', 'brand-pressed');
        properties.forEach(property => brand.style.removeProperty(property));
      }
      brand.addEventListener('pointermove', event => {
        if (!motion.matches || event.pointerType !== 'mouse') return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          const bounds = brand.getBoundingClientRect();
          if (!bounds.width || !bounds.height) return;
          const x = Math.max(0, Math.min(bounds.width, pointerX - bounds.left));
          const y = Math.max(0, Math.min(bounds.height, pointerY - bounds.top));
          const horizontal = x / bounds.width - 0.5;
          const vertical = y / bounds.height - 0.5;
          brand.style.setProperty('--brand-light-x', `${x}px`);
          brand.style.setProperty('--brand-light-y', `${y}px`);
          brand.style.setProperty('--brand-icon-x', `${horizontal * 5}px`);
          brand.style.setProperty('--brand-icon-y', `${vertical * 4}px`);
          brand.style.setProperty('--brand-twist', `${horizontal * 14}deg`);
          brand.style.setProperty('--brand-text-x', `${horizontal * 2}px`);
          brand.classList.add('brand-engaged');
        });
      }, { passive: true });
      brand.addEventListener('pointerdown', () => {
        clearTimeout(pressTimer);
        brand.classList.add('brand-pressed');
        pressTimer = setTimeout(() => brand.classList.remove('brand-pressed'), 240);
      }, { passive: true });
      brand.addEventListener('pointerleave', reset);
      brand.addEventListener('pointercancel', reset);
      window.addEventListener('blur', reset);
      window.addEventListener('resize', reset, { passive: true });
      window.addEventListener('scroll', reset, { passive: true });
      document.addEventListener('visibilitychange', reset);
      motion.addEventListener('change', reset);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBrandInteraction);
  else initBrandInteraction();
})();
