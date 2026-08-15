(() => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const isItalian = params.get('lang') === 'it';
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const next = form.querySelector('input[name="_next"]');
  const subject = form.querySelector('input[name="_subject"]');

  const labels = form.querySelectorAll('.field-label');
  const fields = {
    first: form.querySelector('input[name="first_name"]'),
    last: form.querySelector('input[name="last_name"]'),
    email: form.querySelector('input[name="email"]'),
    phone: form.querySelector('input[name="telephone"]'),
    message: form.querySelector('textarea[name="message"]')
  };

  if (isItalian) {
    const texts = ['Nome', 'Cognome', 'Email', 'Telefono', 'Motivazione del contatto'];
    labels.forEach((label, i) => { if (texts[i]) label.textContent = texts[i]; });
    if (fields.first) fields.first.placeholder = 'Nome';
    if (fields.last) fields.last.placeholder = 'Cognome';
    if (fields.email) fields.email.placeholder = 'tu@azienda.com';
    if (fields.phone) fields.phone.placeholder = '+39 ...';
    if (fields.message) fields.message.placeholder = 'Descrivi brevemente la questione';
    if (button) button.textContent = 'Invia richiesta';
    const note = form.querySelector('.form-note');
    if (note) note.textContent = 'Protetto da reCAPTCHA e controlli anti-spam. Non inserire informazioni altamente sensibili o riservate in questo primo messaggio.';
    if (subject) subject.value = 'Nuova richiesta di contatto dal sito MGV Legal';
    if (next) next.value = 'https://gas-dev.github.io/mgvella_site/?lang=it&sent=1#contact';
  } else if (next) {
    next.value = 'https://gas-dev.github.io/mgvella_site/?sent=1#contact';
  }

  if (params.get('sent') === '1' && status) {
    status.textContent = isItalian
      ? 'Messaggio inviato. Grazie, la richiesta è stata ricevuta.'
      : 'Message sent. Thank you, your enquiry has been received.';
    status.classList.add('success');
  }

  const startedAt = Date.now();
  form.addEventListener('submit', (event) => {
    if (status) {
      status.textContent = '';
      status.classList.remove('success', 'error');
    }

    const honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value.trim() !== '') {
      event.preventDefault();
      return;
    }

    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      if (status) {
        status.textContent = isItalian
          ? 'Controlla i campi obbligatori prima di inviare.'
          : 'Please check the required fields before sending.';
        status.classList.add('error');
      }
      return;
    }

    if (Date.now() - startedAt < 2500) {
      event.preventDefault();
      if (status) {
        status.textContent = isItalian
          ? 'Attendi un momento e riprova.'
          : 'Please wait a moment and try again.';
        status.classList.add('error');
      }
      return;
    }

    if (button) {
      button.disabled = true;
      button.textContent = isItalian ? 'Invio…' : 'Sending…';
    }
  });
})();
