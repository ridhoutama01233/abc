// CV. Ridho Utama Berkah static website interactions.
// Update these placeholders before publishing.
const SITE_CONFIG = {
  email: 'sales@ridhoutamaberkah.com',
  whatsappDisplay: '+62 812 3456 7890',
  whatsappNumber: '6281234567890',
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    tiktok: 'https://www.tiktok.com/',
    twitter: 'https://twitter.com/'
  }
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function applyConfig() {
  $$('[data-email-link]').forEach((el) => {
    el.href = `mailto:${SITE_CONFIG.email}`;
  });
  $$('[data-email-text]').forEach((el) => {
    el.textContent = SITE_CONFIG.email;
  });
  $$('[data-whatsapp-link]').forEach((el) => {
    el.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  });
  $$('[data-whatsapp-text]').forEach((el) => {
    el.textContent = SITE_CONFIG.whatsappDisplay;
  });
  Object.entries(SITE_CONFIG.social).forEach(([key, value]) => {
    $$(`[data-social="${key}"]`).forEach((el) => { el.href = value; });
  });
}

function setActiveNav() {
  const page = document.body.dataset.page;
  $$('[data-nav]').forEach((link) => {
    link.classList.toggle('is-active', link.dataset.nav === page);
  });
}

function setupMobileNav() {
  const toggle = $('.nav-toggle');
  const links = $('#navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('is-open', !expanded);
  });
  links.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
    }
  });
}

function setupHeader() {
  const header = $('[data-header]');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 14);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setupReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  items.forEach((item) => observer.observe(item));
}

function setupTilt() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || window.matchMedia('(pointer: coarse)').matches) return;
  $$('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function setupFilters() {
  const buttons = $$('.filter-btn');
  const cards = $$('.product-card');
  if (!buttons.length || !cards.length) return;
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      buttons.forEach((btn) => btn.classList.toggle('active', btn === button));
      cards.forEach((card) => {
        const visible = filter === 'All' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !visible);
      });
    });
  });
}

function inquiryMessage(form) {
  const data = new FormData(form);
  const lines = [
    'Hello CV. Ridho Utama Berkah,',
    '',
    'I would like to request an export inquiry with the following details:',
    `Name: ${data.get('name') || '-'}`,
    `Company: ${data.get('company') || '-'}`,
    `Country: ${data.get('country') || '-'}`,
    `Email: ${data.get('email') || '-'}`,
    `WhatsApp: ${data.get('whatsapp') || '-'}`,
    `Product: ${data.get('product') || '-'}`,
    `Estimated Quantity: ${data.get('quantity') || '-'}`,
    `Destination Port: ${data.get('port') || '-'}`,
    '',
    'Message:',
    `${data.get('message') || '-'}`
  ];
  return lines.join('\n');
}

function setupInquiryForm() {
  const form = $('[data-inquiry-form]');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const subject = encodeURIComponent('Export Inquiry - CV. Ridho Utama Berkah');
    const body = encodeURIComponent(inquiryMessage(form));
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
  });
  const whatsappButton = $('[data-whatsapp-submit]', form);
  if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
      if (!form.reportValidity()) return;
      const text = encodeURIComponent(inquiryMessage(form));
      window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, '_blank', 'noopener');
    });
  }
}

function setYear() {
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
}

applyConfig();
setActiveNav();
setupMobileNav();
setupHeader();
setupReveal();
setupTilt();
setupFilters();
setupInquiryForm();
setYear();
