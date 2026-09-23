// ---- theme toggle (system default, manual override remembered) ----
// The saved choice is applied by the inline script in <head>, before first paint.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var current = root.getAttribute('data-theme') || (systemDark ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// ---- publication filter ----
(function () {
  var list = document.getElementById('pub-list');
  if (!list) return;
  var items = Array.prototype.slice.call(list.querySelectorAll('li[data-type]'));
  var years = Array.prototype.slice.call(list.querySelectorAll('.pub-year'));
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.filter'));
  var count = document.getElementById('pub-count');

  function apply(type) {
    var shown = 0;
    items.forEach(function (li) {
      var match = type === 'all' || li.dataset.type === type;
      li.hidden = !match;
      if (match) shown++;
    });
    years.forEach(function (y) {
      y.hidden = !y.querySelector('li[data-type]:not([hidden])');
    });
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.filter === type));
    });
    if (count) count.textContent = shown + (shown === 1 ? ' paper' : ' papers');
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.dataset.filter); });
  });
  apply('all');
})();

// ---- highlight the nav link for the section in view ----
(function () {
  // Only in-page links (#section); links to other pages like blog/ are left alone.
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  var byId = {};
  var targets = [];
  links.forEach(function (a) {
    var el = document.querySelector(a.getAttribute('href'));
    if (el) { byId[el.id] = a; targets.push(el); }
  });
  var visible = new Set();
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) visible.add(en.target.id); else visible.delete(en.target.id);
    });
    links.forEach(function (a) { a.removeAttribute('aria-current'); });
    for (var i = 0; i < targets.length; i++) {
      if (visible.has(targets[i].id)) { byId[targets[i].id].setAttribute('aria-current', 'true'); break; }
    }
  }, { rootMargin: '-70px 0px -65% 0px' });
  targets.forEach(function (t) { obs.observe(t); });
})();

// ---- footer year ----
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
