// Shared behaviour for the five pillar pages.
// Demo only: forms validate and show a confirmation state but post nowhere.
// Before launch, replace submitLead() with a POST to the CRM or a Zapier/Make webhook.
(function () {
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function submitLead(form, data) {
    // TODO before launch: POST `data` to the CRM/webhook here.
    if (window.fbq) window.fbq('track', 'Lead', { content_name: form.dataset.offer || 'pillar' });
  }

  function collect(form) {
    var data = { offer: form.dataset.offer || '', page: location.pathname };
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    return data;
  }

  // Lead forms: [data-lead-form]. Required text fields carry data-req="message".
  document.querySelectorAll('[data-lead-form]').forEach(function (form) {
    var status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = null, msg = '';
      form.querySelectorAll('[data-req]').forEach(function (f) {
        if (bad) return;
        var v = f.value.trim();
        if (!v || (f.type === 'email' && !EMAIL.test(v))) { bad = f; msg = f.dataset.req; }
      });
      form.querySelectorAll('fieldset[data-req-group]').forEach(function (fs) {
        if (bad) return;
        if (!fs.querySelector('input:checked')) { bad = fs.querySelector('input'); msg = fs.dataset.reqGroup; }
      });
      if (bad) { status.textContent = msg; status.hidden = false; bad.focus(); return; }
      status.hidden = true;
      var data = collect(form);
      submitLead(form, data);
      var done = form.parentElement.querySelector('[data-form-done]');
      var who = done && done.querySelector('[data-email]');
      if (who) who.textContent = (data.email || '').trim();
      form.hidden = true;
      if (done) { done.hidden = false; done.focus(); }
    });
  });

  // Smooth scroll to the offer block.
  document.querySelectorAll('[data-scroll-offer]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.getElementById('offer');
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      var first = t.querySelector('input,select');
      if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 450);
    });
  });

  // Content-hours calculator (/build/).
  var calc = document.querySelector('[data-calc]');
  if (calc) {
    var hrs = calc.querySelector('[name="hours"]');
    var rate = calc.querySelector('[name="rate"]');
    var money = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
    var update = function () {
      var h = Math.max(0, parseFloat(hrs.value) || 0);
      var r = Math.max(0, parseFloat(rate.value) || 0);
      var yearHours = h * 52;
      var back = Math.max(0, yearHours - 12);
      calc.querySelector('[data-out="hours"]').textContent = h;
      calc.querySelector('[data-out="year"]').textContent = Math.round(yearHours).toLocaleString('en-US') + ' hrs';
      calc.querySelector('[data-out="cost"]').textContent = money(yearHours * r);
      calc.querySelector('[data-out="back"]').textContent = Math.round(back).toLocaleString('en-US') + ' hrs';
      calc.querySelector('[data-out="weeks"]').textContent = (back / 40).toFixed(1);
      calc.querySelectorAll('input[type="hidden"][name="calc_summary"]').forEach(function (i) {
        i.value = h + ' hrs/wk at ' + money(r) + '/hr = ' + money(yearHours * r) + '/yr';
      });
    };
    hrs.addEventListener('input', update);
    rate.addEventListener('input', update);
    update();
  }

  // Freedom Score quiz (/lifestyle/).
  var quiz = document.querySelector('[data-quiz]');
  if (quiz) {
    var qStatus = quiz.querySelector('[data-quiz-status]');
    quiz.addEventListener('submit', function (e) {
      e.preventDefault();
      var sets = quiz.querySelectorAll('fieldset');
      var total = 0, max = 0, missing = null;
      sets.forEach(function (fs) {
        var picked = fs.querySelector('input:checked');
        max += 4;
        if (!picked && !missing) missing = fs;
        if (picked) total += parseInt(picked.value, 10);
      });
      if (missing) {
        qStatus.textContent = 'Answer all five questions to get your score.';
        qStatus.hidden = false;
        missing.querySelector('input').focus();
        return;
      }
      qStatus.hidden = true;
      var score = Math.round((total / max) * 100);
      var band = score <= 35 ? 'grounded' : score <= 65 ? 'daytrip' : 'flight';
      var out = document.querySelector('[data-quiz-result]');
      out.querySelector('[data-score]').textContent = score;
      out.querySelectorAll('[data-band]').forEach(function (p) { p.hidden = p.dataset.band !== band; });
      var hidden = out.querySelector('input[name="freedom_score"]');
      if (hidden) hidden.value = score;
      quiz.hidden = true;
      out.hidden = false;
      out.focus();
      requestAnimationFrame(function () { out.querySelector('.meter i').style.width = score + '%'; });
    });
  }
})();
