const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

const siteRoot = new URL('.', document.currentScript.src).href;
const params = new URLSearchParams(window.location.search);
const currentLanguage = params.get('lang') === 'it' ? 'it' : 'en';

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function setHTML(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = value;
}

function setPlaceholder(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('placeholder', value);
}

function addLanguageSwitch() {
  if (!nav) return;
  const wrap = document.createElement('span');
  wrap.className = 'lang-switch';
  wrap.setAttribute('aria-label', currentLanguage === 'it' ? 'Lingua' : 'Language');
  const en = document.createElement('a');
  en.href = siteRoot;
  en.textContent = 'EN';
  en.lang = 'en';
  const slash = document.createElement('span');
  slash.textContent = '/';
  const it = document.createElement('a');
  it.href = siteRoot + '?lang=it';
  it.textContent = 'IT';
  it.lang = 'it';
  if (currentLanguage === 'en') en.className = 'active';
  if (currentLanguage === 'it') it.className = 'active';
  wrap.append(en, slash, it);
  nav.appendChild(wrap);

  const style = document.createElement('style');
  style.textContent = `
    .lang-switch{display:inline-flex;align-items:center;gap:7px;margin-left:2px;font-size:11px;letter-spacing:.16em;white-space:nowrap}
    .lang-switch a{opacity:.62;transition:opacity .2s ease,color .2s ease}
    .lang-switch a:hover,.lang-switch a.active{opacity:1;color:#d6a65e}
    @media(max-width:1000px){.lang-switch{margin-top:8px}}
  `;
  document.head.appendChild(style);
}

function translateToItalian() {
  document.documentElement.lang = 'it';
  document.title = 'MGV Legal | Servizi finanziari, regolamentazione e contenzioso';
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = 'Consulenza legale e regolamentare indipendente per istituti di pagamento, istituti di moneta elettronica, banche, fintech e fornitori di tecnologia finanziaria a Malta e nei mercati internazionali.';
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogTitle) ogTitle.content = document.title;
  if (ogDescription) ogDescription.content = 'Chiarezza legale per le imprese che stanno trasformando la finanza moderna.';

  if (menuButton) menuButton.textContent = 'Menu';
  const navLinks = nav ? nav.querySelectorAll(':scope > a') : [];
  const navLabels = ['Competenze', 'Approccio', 'Mary Grace Vella', 'Approfondimenti', 'Contatti'];
  navLinks.forEach((link, i) => { if (navLabels[i]) link.textContent = navLabels[i]; });

  setText('.hero .eyebrow', 'Malta · Europa · Internazionale');
  setHTML('.hero h1', 'Chiarezza legale per le imprese <em>che stanno trasformando la finanza moderna.</em>');
  setText('.hero-intro', 'Consulenza legale e regolamentare strategica per istituti di pagamento, istituti di moneta elettronica, banche, società fintech e fornitori di tecnologia finanziaria.');
  setText('.hero-actions .button', 'Parliamo del tuo caso');
  setHTML('.hero-actions .text-link', 'Scopri le competenze <span>↘</span>');
  setText('.hero-card span', 'Consulenza indipendente');
  setHTML('.hero-card strong', 'Servizi finanziari<br>dalla licenza al contenzioso.');

  setText('.statement .eyebrow', 'Una pratica focalizzata sui servizi finanziari');
  setText('.statement h2', 'La regolamentazione non è un controllo finale. Definisce il prodotto, il modello operativo e ogni decisione che segue.');
  const statementP = document.querySelector('.statement-content > p:last-child');
  if (statementP) statementP.textContent = "MGV Legal opera all'intersezione tra diritto, regolamentazione, tecnologia e operatività finanziaria. Assistiamo fondatori, consigli di amministrazione, soggetti regolamentati e fornitori tecnologici durante autorizzazione, implementazione, vigilanza continuativa, remediation e contenzioso.";

  setText('.expertise .section-heading .eyebrow', 'Competenze principali');
  setText('.expertise .section-heading h2', "Un'assistenza costruita intorno al reale ciclo di vita di un'impresa finanziaria regolamentata.");

  const expertise = [
    ['Licensing e accesso al mercato','Strategia regolamentare, domande di autorizzazione, governance, programma operativo, policy, outsourcing e interlocuzione con le autorità competenti.',['Istituti di pagamento e IMEL/EMI','Istituti di credito e digital banking','Fintech e modelli tecnologici regolamentati']],
    ['Pagamenti, moneta elettronica e tecnologia bancaria','Assistenza legale su prodotti di pagamento, wallet, carte, safeguarding, strutture di conto, outsourcing, API, piattaforme bancarie transazionali e servizi cross-border.',['PSD2 e servizi di pagamento','Emissione e distribuzione di moneta elettronica','Contratti tecnologici e operativi']],
    ['AML, CFT e financial crime','Consulenza pratica su business risk assessment, metodologie di rischio cliente, governance, transaction monitoring, reporting, remediation e preparazione ai controlli regolamentari.',['Framework e controlli AML','Supporto a MLRO e board','Transizione AMLA e sviluppi UE']],
    ['Enforcement regolamentare e contenzioso','Rappresentanza e supporto strategico durante ispezioni, richieste di informazioni, rilievi di vigilanza, procedimenti sanzionatori, appelli e controversie nei servizi finanziari.',['Questioni MFSA e FIAU','Appelli amministrativi e regolamentari','Controversie commerciali e tra azionisti']],
    ['Governance e compliance continuativa',"Supporto al board, cambiamenti normativi, supervisione dell'outsourcing, safeguarding, condotta, architettura delle policy, responsabilità interne e processi decisionali difendibili.",['Consulenza a board e senior management','Compliance remediation','Notifiche e approvazioni regolamentari']],
    ['Finanza digitale e resilienza operativa','Consulenza su DORA, governance ICT, fornitori critici, contratti cloud e software, protezione dei dati, onboarding digitale e tecnologia regolamentare.',['DORA e rischio ICT di terze parti','Contratti fintech e outsourcing','Dati, GDPR e processi digitali']]
  ];
  document.querySelectorAll('.expertise-card').forEach((card, i) => {
    const data = expertise[i];
    if (!data) return;
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    if (h3) h3.textContent = data[0];
    if (p) p.textContent = data[1];
    card.querySelectorAll('li').forEach((li, j) => { if (data[2][j]) li.textContent = data[2][j]; });
  });

  setText('.approach .eyebrow', "L'approccio MGV");
  setText('.approach h2', 'Attenzione senior. Comprensione del business. Un contatto diretto con il tuo avvocato.');
  const approachIntro = document.querySelector('.approach-copy > p:not(.eyebrow)');
  if (approachIntro) approachIntro.textContent = 'Le questioni regolamentari complesse richiedono profondità. Richiedono anche rapidità, accessibilità e una reale comprensione di come operano le istituzioni finanziarie.';
  const principles = [
    ['Analisi legale orientata al business','Consulenza costruita sul prodotto, sulla tecnologia, sulla governance e sulla realtà operativa del cliente.'],
    ["Un'unica strategia internazionale coordinata",'Le questioni cross-border vengono gestite con avvocati e specialisti selezionati nelle giurisdizioni rilevanti.'],
    ['Lavoro difendibile fin dal primo giorno','Registrazioni chiare, decisioni strutturate e documentazione in grado di resistere al controllo regolamentare e giudiziario.']
  ];
  document.querySelectorAll('.principles > div').forEach((row, i) => {
    const strong = row.querySelector('strong'); const p = row.querySelector('p');
    if (principles[i] && strong) strong.textContent = principles[i][0];
    if (principles[i] && p) p.textContent = principles[i][1];
  });

  setText('.profile-heading .eyebrow', 'Fondatrice');
  setText('.profile-heading .role', 'Avvocato · Financial Services & Regulatory Counsel');
  setText('.profile-lead', 'Mary Grace Vella presta consulenza in materia di diritto dei servizi finanziari, corporate governance, compliance regolamentare, servizi di pagamento, moneta elettronica e antiriciclaggio.');
  const profileParas = document.querySelectorAll('.profile-body > p');
  if (profileParas[1]) profileParas[1].textContent = "La sua esperienza combina la pratica legale indipendente con un'esposizione diretta alle funzioni di governance e AML di un istituto di moneta elettronica regolamentato. Questo le consente di comprendere in modo pratico le questioni legali, di vigilanza e operative affrontate dai soggetti regolamentati.";
  const credentialSpans = document.querySelectorAll('.credentials span');
  if (credentialSpans[2]) credentialSpans[2].textContent = 'Malta';
  const credentialStrong = document.querySelectorAll('.credentials strong');
  if (credentialStrong[2]) credentialStrong[2].textContent = 'Pratica indipendente dal 2016';
  setHTML('.profile-body .text-link', 'Contatta Mary Grace <span>↘</span>');

  setText('.network .eyebrow', 'Portata internazionale');
  setText('.network h2', 'Un unico punto di contatto per questioni che attraversano più giurisdizioni.');
  const networkP = document.querySelector('.network-copy > p:last-child');
  if (networkP) networkP.textContent = 'MGV Legal opera attraverso una rete internazionale di avvocati indipendenti e specialisti di settore. Il modello offre ai clienti competenze locali dove necessarie, mantenendo una strategia unitaria e una responsabilità diretta sul mandato.';

  setText('.sectors .eyebrow', 'Chi assistiamo');
  setText('.sectors h2', 'Per istituzioni, fondatori e fornitori tecnologici che operano nella finanza regolamentata.');
  setText('.sector-marquee', 'Istituti di moneta elettronica · Istituti di pagamento · Banche · Società fintech · Piattaforme bancarie · Provider RegTech · Programmi carte · Gruppi finanziari · Investitori · Board e senior management');

  setText('.insights .eyebrow', 'Approfondimenti selezionati');
  setText('.insights .section-heading h2', 'Analisi chiare delle regole che stanno cambiando i servizi finanziari.');
  const insights = [
    ['Pagamenti','Cosa significa il prossimo quadro normativo sui pagamenti per i modelli operativi'],
    ['AML',"Da AMLA all'implementazione interna: prepararsi alla supervisione diretta dell'UE"],
    ['Enforcement','Rispondere ai rilievi regolamentari senza indebolire la futura difesa']
  ];
  document.querySelectorAll('.insight-card').forEach((card, i) => {
    const span = card.querySelector('span'); const h3 = card.querySelector('h3'); const a = card.querySelector('a');
    if (insights[i] && span) span.textContent = insights[i][0];
    if (insights[i] && h3) h3.textContent = insights[i][1];
    if (a) a.textContent = 'Prossimamente';
  });

  setText('.contact .eyebrow', 'Iniziamo una conversazione');
  setText('.contact h2', 'Raccontaci cosa deve andare avanti.');
  const contactP = document.querySelector('.contact-copy > p:last-child');
  if (contactP) contactP.textContent = 'Per questioni di licensing, regolamentazione, operazioni o contenzioso nei servizi finanziari, contatta direttamente Mary Grace.';
  const labels = document.querySelectorAll('.contact-form label');
  const labelTexts = ['Nome','Email','Organizzazione','Come possiamo aiutarti?'];
  labels.forEach((label, i) => {
    if (!labelTexts[i]) return;
    const input = label.querySelector('input,textarea');
    const node = Array.from(label.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
    if (node) node.nodeValue = labelTexts[i];
  });
  setPlaceholder('input[name="name"]', 'Il tuo nome');
  setPlaceholder('input[name="email"]', 'tu@azienda.com');
  setPlaceholder('input[name="company"]', 'Società o istituzione');
  setPlaceholder('textarea[name="message"]', 'Descrivi brevemente la questione');
  setText('.contact-form .button', 'Invia richiesta');
  setText('.form-note', "I recapiti, l'informativa privacy e l'endpoint del modulo saranno aggiunti prima della pubblicazione definitiva.");

  const footerMeta = document.querySelectorAll('.footer-meta span');
  if (footerMeta[0]) footerMeta[0].textContent = 'Servizi finanziari · Regolamentazione · Contenzioso';
  if (footerMeta[1]) footerMeta[1].textContent = 'Malta · Internazionale';
  const footerLinks = document.querySelectorAll('.footer-links a');
  if (footerLinks[2]) footerLinks[2].textContent = 'Note legali';
  const footerP = document.querySelector('footer > p');
  if (footerP) footerP.innerHTML = '© <span id="year"></span> MGV Legal. Tutti i diritti riservati.';
}

if (currentLanguage === 'it') translateToItalian();
addLanguageSwitch();

if (menuButton && nav) {
  menuButton.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function (element) {
  observer.observe(element);
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
