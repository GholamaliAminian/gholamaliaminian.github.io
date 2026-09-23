// ---- theme toggle (system default, manual override remembered) ----
(function () {
  var root = document.documentElement;
  var KEY = 'theme';
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) { /* private mode / blocked storage */ }

  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var current = root.getAttribute('data-theme') || (systemDark ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }
})();

// ---- publication filter ----
(function () {
  var list = document.getElementById('pub-list');
  if (!list) return;
  var items = Array.prototype.slice.call(list.children);
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.filter'));
  var count = document.getElementById('pub-count');

  function apply(type) {
    var shown = 0;
    items.forEach(function (li) {
      var match = type === 'all' || li.dataset.type === type;
      li.hidden = !match;
      if (match) shown++;
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
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
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
