// Demo audit form: validates, then swaps the form for a confirmation panel.
// Not wired to a backend. Replace the submit handler with a POST to the CRM/webhook.
(function () {
  document.querySelectorAll('[data-audit-form]').forEach(function (form) {
    var status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var li = form.querySelector('[name="linkedin"]');
      var x = form.querySelector('[name="x"]');
      var email = form.querySelector('[name="email"]');
      var msg = '';
      if (!li.value.trim() && !(x && x.value.trim())) {
        msg = 'Add your LinkedIn URL or X handle so there is a profile to audit.';
        li.focus();
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        msg = 'Enter a work email so we can send your results.';
        email.focus();
      }
      if (msg) { status.textContent = msg; status.hidden = false; return; }
      status.hidden = true;
      var done = form.parentElement.querySelector('[data-form-done]');
      var who = done.querySelector('[data-email]');
      if (who) who.textContent = email.value.trim();
      form.hidden = true;
      done.hidden = false;
      done.focus();
      if (window.fbq) window.fbq('track', 'Lead');
    });
  });
  document.querySelectorAll('[data-scroll-audit]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.getElementById('audit');
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      var first = t.querySelector('input');
      if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 450);
    });
  });
})();
