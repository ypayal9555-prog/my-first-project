/* Theme toggle — keeps light/dark preference in localStorage and respects the
   system setting until the visitor makes an explicit choice. */
(function () {
  'use strict';

  var KEY = 'theme';
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function saved() {
    try {
      var v = localStorage.getItem(KEY);
      return v === 'dark' || v === 'light' ? v : null;
    } catch (e) {
      return null;
    }
  }

  function preferred() {
    return saved() || (media && media.matches ? 'dark' : 'light');
  }

  function apply(theme, persist) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');

    if (persist) {
      try { localStorage.setItem(KEY, theme); } catch (e) { /* private mode */ }
    }

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#070d18' : '#eef5ff');

    var label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    var buttons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      buttons[i].setAttribute('aria-label', label);
      buttons[i].setAttribute('title', label);
    }
  }

  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('.theme-toggle') : null;
    if (!btn) return;
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  if (media) {
    var onChange = function (e) {
      if (!saved()) apply(e.matches ? 'dark' : 'light', false);
    };
    if (media.addEventListener) media.addEventListener('change', onChange);
    else if (media.addListener) media.addListener(onChange);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { apply(preferred(), false); });
  } else {
    apply(preferred(), false);
  }
})();
