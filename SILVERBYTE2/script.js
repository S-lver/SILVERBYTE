// script.js
(function () {
  'use strict';

  var root = document.documentElement;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sessionKey = 'sb-booted';

  /* ============ BOOT SEQUENCE ============ */
  var bootTimers = [];
  var bootDone = false;
  var bootRail = document.getElementById('bootRail');
  var bootCaret = document.getElementById('bootCaret');

  function clearBootTimers() {
    bootTimers.forEach(function (t) { clearTimeout(t); });
    bootTimers = [];
  }

  function finishBoot() {
    if (bootDone) return;
    bootDone = true;
    clearBootTimers();
    document.body.classList.remove('booting');
    document.body.classList.add('booted');
    if (bootRail) bootRail.style.opacity = '0';
    if (bootCaret) bootCaret.style.opacity = '0';
    try { sessionStorage.setItem(sessionKey, '1'); } catch (e) {}
    window.dispatchEvent(new Event('bootfinished'));
  }

  function runBoot() {
    if (prefersReduced) { finishBoot(); return; }
    document.body.classList.add('booting');

    bootTimers.push(setTimeout(function () {
      if (bootRail) bootRail.style.width = '100%';
    }, 40));

    bootTimers.push(setTimeout(function () {
      document.body.classList.add('booted');
    }, 250));

    var dgNodes = Array.prototype.slice.call(document.querySelectorAll('.diagram-stage .dg-node'));
    dgNodes.forEach(function (node, i) {
      bootTimers.push(setTimeout(function () {
        node.classList.add('boot-on');
        node.style.opacity = '0.3';
        setTimeout(function () { node.style.opacity = ''; }, 60);
      }, 500 + i * 70));
    });

    bootTimers.push(setTimeout(function () {
      var dgLines = document.querySelectorAll('.diagram-stage .dg-line');
      dgLines.forEach(function (l) { l.style.strokeDashoffset = '0'; });
    }, 900));

    bootTimers.push(setTimeout(function () { finishBoot(); }, 1400));

    function skip() { finishBoot(); cleanupSkip(); }
    function cleanupSkip() {
      window.removeEventListener('keydown', skip);
      document.removeEventListener('click', skip);
      window.removeEventListener('wheel', skip, { passive: true });
      window.removeEventListener('touchstart', skip, { passive: true });
    }
    window.addEventListener('keydown', skip, { once: true });
    document.addEventListener('click', skip, { once: true });
    window.addEventListener('wheel', skip, { passive: true, once: true });
    window.addEventListener('touchstart', skip, { passive: true, once: true });
  }

  var alreadyBooted = false;
  try { alreadyBooted = sessionStorage.getItem(sessionKey) === '1'; } catch (e) {}
  if (alreadyBooted) {
    document.body.classList.remove('booting');
    document.body.classList.add('booted');
    var railEl = document.getElementById('bootRail');
    var caretEl = document.getElementById('bootCaret');
    if (railEl) railEl.style.display = 'none';
    if (caretEl) caretEl.style.display = 'none';
  } else {
    runBoot();
  }

  /* ============ THEME TOGGLE ============ */
  var themeBtn = document.getElementById('themeToggle');
  var sweep = document.getElementById('themeSweep');
  var stored = localStorage.getItem('sb-theme');
  if (stored) root.setAttribute('data-theme', stored);

  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    var rect = themeBtn.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;

    if (!prefersReduced) {
      sweep.style.background = next === 'dark' ? '#0A0A0C' : '#F2F0EA';
      sweep.style.opacity = '0';
      sweep.style.transition = 'none';
      sweep.style.clipPath = 'circle(0px at ' + cx + 'px ' + cy + 'px)';
      void sweep.offsetWidth;
      sweep.style.transition = 'clip-path 0.55s cubic-bezier(.2,.8,.2,1), opacity 0.55s ease';
      sweep.style.clipPath = 'circle(140vmax at ' + cx + 'px ' + cy + 'px)';
      sweep.style.opacity = '1';
      setTimeout(function () {
        root.setAttribute('data-theme', next);
        localStorage.setItem('sb-theme', next);
        sweep.style.opacity = '0';
        setTimeout(function () {
          sweep.style.transition = 'none';
          sweep.style.clipPath = 'circle(0px at ' + cx + 'px ' + cy + 'px)';
        }, 350);
      }, 240);
    } else {
      root.setAttribute('data-theme', next);
      localStorage.setItem('sb-theme', next);
    }
  });

  /* ============ NAV INDICATOR ============ */
  var navCenter = document.getElementById('navCenter');
  var indicator = document.getElementById('navIndicator');
  var navLinks = navCenter ? Array.prototype.slice.call(navCenter.querySelectorAll('a')) : [];
  var sections = navLinks.map(function (a) {
    var id = a.getAttribute('data-section');
    return id ? document.getElementById(id) : null;
  }).filter(Boolean);

  function moveIndicator(link) {
    if (!link || !indicator) return;
    var linkRect = link.getBoundingClientRect();
    var parentRect = navCenter.getBoundingClientRect();
    indicator.style.left = (linkRect.left - parentRect.left) + 'px';
    indicator.style.width = linkRect.width + 'px';
    indicator.style.opacity = '1';
  }
  function clearIndicator() { if (indicator) indicator.style.opacity = '0'; }

  navLinks.forEach(function (a) { a.addEventListener('mouseenter', function () { moveIndicator(a); }); });
  navCenter.addEventListener('mouseleave', function () {
    var active = navCenter.querySelector('a.active');
    if (active) moveIndicator(active); else clearIndicator();
  });

  var ticking = false;
  function updateActive() {
    var scrollY = window.scrollY + 120;
    var current = null;
    sections.forEach(function (sec) { if (sec.offsetTop <= scrollY) current = sec; });
    navLinks.forEach(function (a) {
      var id = a.getAttribute('data-section');
      a.classList.toggle('active', current && current.id === id);
    });
    if (current) {
      var activeLink = navCenter.querySelector('a.active');
      if (activeLink) moveIndicator(activeLink);
    } else { clearIndicator(); }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(updateActive); ticking = true; }
  }, { passive: true });
  window.addEventListener('load', updateActive);
  window.addEventListener('resize', updateActive);

  /* ============ DIAGRAM: HOVER + FOCUS + KEYBOARD ============ */
  var stage = document.getElementById('diagramStage');
  var focusBadge = document.getElementById('focusBadge');
  var focusedNode = null;

  if (stage) {
    var nodes = Array.prototype.slice.call(stage.querySelectorAll('.dg-node'));
    var flows = Array.prototype.slice.call(stage.querySelectorAll('.dg-flow'));
    var lines = Array.prototype.slice.call(stage.querySelectorAll('.dg-line'));

    function relatedPath(el, nodeKey) {
      return el.getAttribute('data-from') === nodeKey || el.getAttribute('data-to') === nodeKey;
    }

    function applyHover(key) {
      stage.setAttribute('data-hovering', key ? 'true' : 'false');
      nodes.forEach(function (n) { n.classList.toggle('active', n.getAttribute('data-node') === key); });
      flows.forEach(function (f) { f.classList.toggle('active', key && relatedPath(f, key)); });
      lines.forEach(function (l) { l.classList.toggle('active', key && relatedPath(l, key)); });
    }

    function applyFocus(key) {
      focusedNode = key;
      stage.setAttribute('data-focused', key ? 'true' : 'false');
      nodes.forEach(function (n) {
        var match = n.getAttribute('data-node') === key;
        n.classList.toggle('focus-active', match);
        n.setAttribute('aria-pressed', match ? 'true' : 'false');
      });
      flows.forEach(function (f) { f.classList.toggle('focus-active', key && relatedPath(f, key)); });
      lines.forEach(function (l) { l.classList.toggle('focus-active', key && relatedPath(l, key)); });
      if (focusBadge) {
        focusBadge.classList.toggle('on', !!key);
        focusBadge.textContent = key ? 'focus=' + key : 'focus';
      }
    }

    nodes.forEach(function (node) {
      var key = node.getAttribute('data-node');
      node.addEventListener('mouseenter', function () {
        if (!focusedNode) applyHover(key);
      });
      node.addEventListener('mouseleave', function () {
        if (!focusedNode) applyHover(null);
      });
      node.addEventListener('click', function (e) {
        e.stopPropagation();
        if (focusedNode === key) applyFocus(null);
        else applyFocus(key);
      });
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          if (focusedNode === key) applyFocus(null);
          else applyFocus(key);
        }
        if (e.key === 'Escape' && focusedNode === key) {
          applyFocus(null);
        }
      });
    });

    stage.addEventListener('click', function (e) {
      if (e.target.closest('.dg-node')) return;
      if (focusedNode) applyFocus(null);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && focusedNode) {
        applyFocus(null);
      }
    });

    if (!prefersReduced && window.matchMedia('(pointer: fine)').matches) {
      var wrap = stage.closest('.diagram-wrap');
      var packets = Array.prototype.slice.call(stage.querySelectorAll('.pkt'));

      packets.forEach(function (p) {
        var am = p.querySelector('animateMotion');
        if (am) p.setAttribute('data-base-dur', am.getAttribute('dur') || '8');
      });

      wrap.addEventListener('mousemove', function (e) {
        var r = wrap.getBoundingClientRect();
        var mx = (e.clientX - r.left) / r.width - 0.5;
        var my = (e.clientY - r.top) / r.height - 0.5;
        stage.style.transform = 'translate(' + (mx * -6).toFixed(2) + 'px,' + (my * -4).toFixed(2) + 'px)';

        var cx = r.left + r.width / 2;
        var cy = r.top + r.height / 2;
        var dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        var maxDist = Math.max(r.width, r.height) * 0.6;
        var prox = Math.max(0, 1 - dist / maxDist);
        packets.forEach(function (p) {
          var base = parseFloat(p.getAttribute('data-base-dur'));
          var dur = base / (0.7 + prox * 0.9);
          var am = p.querySelector('animateMotion');
          if (am) am.setAttribute('dur', dur.toFixed(2) + 's');
        });
      });
      wrap.addEventListener('mouseleave', function () {
        stage.style.transform = 'translate(0,0)';
        packets.forEach(function (p) {
          var base = parseFloat(p.getAttribute('data-base-dur'));
          var am = p.querySelector('animateMotion');
          if (am) am.setAttribute('dur', base.toFixed(2) + 's');
        });
      });
    }
  }

  /* ============ SCROLL REVEAL ============ */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = revealEls.indexOf(entry.target);
          var delay = Math.min(idx * 50, 300);
          setTimeout(function () { entry.target.classList.add('in'); }, delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else { revealEls.forEach(function (el) { el.classList.add('in'); }); }

  /* ============ MAGNETIC BUTTONS ============ */
  if (!prefersReduced && window.matchMedia('(pointer: fine)').matches) {
    var magnets = Array.prototype.slice.call(document.querySelectorAll('[data-magnetic]'));
    magnets.forEach(function (btn) {
      var strength = 6;
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        var dx = (mx / r.width) * strength;
        var dy = (my / r.height) * strength;
        btn.style.transform = 'translate(' + dx.toFixed(2) + 'px,' + dy.toFixed(2) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = 'translate(0,0)'; });
    });
  }

  /* ============ STAT COUNT-UP ============ */
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  if ('IntersectionObserver' in window && !prefersReduced && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var start = performance.now();
          var dur = 1100;
          function tick(now) {
            var p = Math.min((now - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target);
            if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
          }
          requestAnimationFrame(tick);
          cio.unobserve(el);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  } else { counters.forEach(function (c) { c.textContent = c.getAttribute('data-count'); }); }

  /* ============ UPTIME TICKER ============ */
  var ticker = document.getElementById('uptimeTicker');
  if (ticker && !prefersReduced) {
    setInterval(function () {
      var base = 99.97;
      var jitter = (Math.random() - 0.5) * 0.02;
      var val = Math.min(99.99, Math.max(99.94, base + jitter));
      ticker.textContent = val.toFixed(2) + '%';
    }, 2400);
  }

  /* ============ BRIDGE STRIP DUPLICATE ============ */
  var bridgeTrack = document.getElementById('bridgeTrack');
  if (bridgeTrack) {
    bridgeTrack.innerHTML = bridgeTrack.innerHTML + bridgeTrack.innerHTML;
  }

  /* ============ COPY-TO-CLIPBOARD EMAIL ============ */
  var copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    var copyTimeout = null;
    copyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var email = copyBtn.getAttribute('data-email') || 'hello@silverbyte.co.za';
      var done = function () {
        copyBtn.classList.add('copied');
        clearTimeout(copyTimeout);
        copyTimeout = setTimeout(function () { copyBtn.classList.remove('copied'); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, function () {
          fallbackCopy(email); done();
        });
      } else {
        fallbackCopy(email); done();
      }
    });
    function fallbackCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  /* ============ FOOTER CLOCK (SAST = UTC+2) ============ */
  var clockEl = document.getElementById('footerClock');
  if (clockEl) {
    var updateClock = function () {
      var now = new Date();
      var h = (now.getUTCHours() + 2) % 24;
      var m = now.getUTCMinutes();
      var s = now.getUTCSeconds();
      var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
      clockEl.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ============ RUNBOOK: TIMELINE + TYPEWRITER + RE-RUN ============ */
  var railNodes = document.getElementById('railNodes');
  var railFill = document.getElementById('railFill');
  var termBody = document.getElementById('termBody');
  var progressBar = document.getElementById('progressBar');
  var progressPct = document.getElementById('progressPct');
  var termStatusLabel = document.getElementById('termStatusLabel');
  var runIdEl = document.getElementById('runId');
  var termRerunBtn = document.getElementById('termRerun');

  if (runIdEl) {
    var d = new Date();
    var pad2 = function (n) { return n < 10 ? '0' + n : '' + n; };
    runIdEl.textContent = 'sb-' + d.getFullYear() + '-' + pad2(d.getMonth()+1) + '-' + pad2(d.getDate()) + '-' + Math.floor(Math.random()*900+100);
  }

  var runScript = [
    { step: 0, lines: [
      { t: '00:00.12', txt: 'discovery.start  scope=commerce', cls: '' },
      { t: '00:00.48', txt: 'map.workflow     nodes=6 flows=7', cls: '' },
      { t: '00:00.91', txt: 'handoffs.flagged 3 manual steps', cls: 't-warn' },
      { t: '00:01.20', txt: 'discovery.done   ✓ plan scoped', cls: 't-ok' }
    ]},
    { step: 1, lines: [
      { t: '00:01.24', txt: 'build.start      stack=headless', cls: '' },
      { t: '00:01.78', txt: 'storefront.init  → deploy', cls: '' },
      { t: '00:02.31', txt: 'qa.loadtest      200rps ok', cls: '' },
      { t: '00:02.60', txt: 'build.done       ✓ shipped', cls: 't-ok' }
    ]},
    { step: 2, lines: [
      { t: '00:02.64', txt: 'automate.start   wiring flows', cls: '' },
      { t: '00:03.10', txt: 'flow.inventory   threshold→PO', cls: '' },
      { t: '00:03.55', txt: 'flow.triage      ai→handoff', cls: '' },
      { t: '00:03.92', txt: 'automate.done    ✓ 7 flows live', cls: 't-ok' }
    ]},
    { step: 3, lines: [
      { t: '00:03.96', txt: 'support.start    monitoring on', cls: '' },
      { t: '00:04.20', txt: 'engineer.assigned named=yes', cls: '' },
      { t: '00:04.41', txt: 'sla.response     <4h business', cls: '' },
      { t: '00:04.60', txt: 'run.complete     ✓ all systems go', cls: 't-ok' }
    ]}
  ];

  var rnodes = railNodes ? Array.prototype.slice.call(railNodes.querySelectorAll('.rnode')) : [];
  var runStarted = false;
  var runTimeouts = [];

  function clearRunTimeouts() {
    runTimeouts.forEach(function (t) { clearTimeout(t); });
    runTimeouts = [];
  }

  function typeLine(data, onDone) {
    var lineEl = document.createElement('div');
    lineEl.className = 'term-line';
    var timeSpan = document.createElement('span');
    timeSpan.className = 't-time';
    timeSpan.textContent = data.t;
    var arrowSpan = document.createElement('span');
    arrowSpan.className = 't-arrow';
    arrowSpan.textContent = '→';
    var textSpan = document.createElement('span');
    textSpan.className = 't-text ' + (data.cls || '');
    var cursor = document.createElement('span');
    cursor.className = 'term-cursor';

    lineEl.appendChild(timeSpan);
    lineEl.appendChild(arrowSpan);
    lineEl.appendChild(textSpan);
    textSpan.appendChild(cursor);

    var prevActive = termBody.querySelector('.term-line.active');
    if (prevActive) prevActive.classList.remove('active');
    var prevCursor = termBody.querySelector('.term-cursor');
    if (prevCursor) prevCursor.remove();

    termBody.appendChild(lineEl);
    void lineEl.offsetWidth;
    lineEl.classList.add('show', 'active');

    var full = data.txt;
    var i = 0;
    function typeChar() {
      if (i < full.length) {
        textSpan.insertBefore(document.createTextNode(full.charAt(i)), cursor);
        i++;
        var ch = full.charAt(i - 1);
        var delay = 6;
        if (ch === ' ') delay = 8;
        if (ch === '.') delay = 24;
        if (ch === ':') delay = 18;
        runTimeouts.push(setTimeout(typeChar, delay));
      } else {
        cursor.remove();
        lineEl.classList.remove('active');
        termBody.scrollTop = termBody.scrollHeight;
        if (onDone) onDone();
      }
    }
    typeChar();
  }

  function finishStep(stepIdx) {
    rnodes.forEach(function (n, i) {
      n.classList.toggle('past', i <= stepIdx);
      n.classList.toggle('active', i === stepIdx + 1 && stepIdx + 1 < rnodes.length);
    });
    var pct = Math.round(((stepIdx + 1) / runScript.length) * 100);
    if (progressBar) progressBar.style.width = pct + '%';
    if (progressPct) progressPct.textContent = pct + '%';
    if (termStatusLabel) termStatusLabel.textContent = stepIdx + 1 < runScript.length ? 'running' : 'complete';
  }

  function setRerunAvailable(available) {
    if (!termRerunBtn) return;
    termRerunBtn.classList.toggle('available', available);
  }

  function playRun() {
    if (runStarted) return;
    runStarted = true;
    setRerunAvailable(false);

    var stepIdx = 0;
    var lineIdx = 0;

    function nextLine() {
      if (stepIdx >= runScript.length) {
        rnodes.forEach(function (n) { n.classList.remove('active'); n.classList.add('past'); });
        var last = rnodes[rnodes.length - 1];
        if (last) last.classList.add('active');
        if (termStatusLabel) termStatusLabel.textContent = 'complete';
        setRerunAvailable(true);
        return;
      }
      var stepData = runScript[stepIdx];
      if (lineIdx >= stepData.lines.length) {
        finishStep(stepIdx);
        stepIdx++;
        lineIdx = 0;
        runTimeouts.push(setTimeout(nextLine, 380));
        return;
      }
      if (lineIdx === 0) {
        rnodes.forEach(function (n, i) {
          n.classList.toggle('active', i === stepIdx);
          n.classList.toggle('past', i < stepIdx);
        });
        if (termStatusLabel) termStatusLabel.textContent = 'step ' + (stepIdx + 1) + ' / 4';
      }
      var data = stepData.lines[lineIdx];
      lineIdx++;
      typeLine(data, function () {
        runTimeouts.push(setTimeout(nextLine, 180));
      });
    }
    nextLine();
  }

  function resetRun() {
    clearRunTimeouts();
    runStarted = false;
    if (termBody) termBody.innerHTML = '';
    if (progressBar) progressBar.style.width = '0%';
    if (progressPct) progressPct.textContent = '0%';
    if (termStatusLabel) termStatusLabel.textContent = 're-run starting';
    rnodes.forEach(function (n) { n.classList.remove('active', 'past'); });
    setRerunAvailable(false);
  }

  if (termRerunBtn) {
    termRerunBtn.addEventListener('click', function () {
      termRerunBtn.classList.add('spinning');
      setTimeout(function () { termRerunBtn.classList.remove('spinning'); }, 520);
      setTimeout(function () {
        resetRun();
        playRun();
      }, 120);
    });
  }

  var runbookSection = document.getElementById('runbook');
  if (runbookSection && 'IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !runStarted) {
          playRun();
        }
      });
    }, { threshold: 0.35 });
    rio.observe(runbookSection);
  } else {
    setTimeout(playRun, 600);
  }

})();