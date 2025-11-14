function getConfig(block) {
  const cfg = { _cells: {} };
  const rows = [...block.querySelectorAll(':scope > div')];

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const key = cells[0].textContent.trim().toLowerCase();
    const valEl = cells[1];

    cfg[key] = valEl.textContent.trim();
    cfg._cells[key] = valEl;
  });

  return cfg;
}

function createIconSpan(name) {
  const span = document.createElement('span');
  span.className = `icon icon-${name}`;
  const img = document.createElement('img');
  img.setAttribute('data-icon-name', name);
  img.src = `/icons/${name}.svg`;
  img.alt = name;
  img.loading = 'lazy';
  img.width = 16;
  img.height = 16;
  span.appendChild(img);
  return span;
}

export default function decorate(block) {
  console.log('decorate mainarea');

  const cfg = getConfig(block);

  const logoCell = cfg._cells.logo;

  let phoneText = cfg.phone || '';
  phoneText = phoneText.replace(/^:phone:\s*/i, '').trim();
  let btnRaw = cfg['button-label'] || '';
  let btnIconName = 'calendar';
  let btnLabel = btnRaw;

  const m = btnRaw.match(/^\s*:([a-z0-9_-]+):\s*(.*)$/i);
  if (m) {
    btnIconName = m[1].toLowerCase();
    btnLabel = (m[2] || '').trim();
  } else {
    btnLabel = btnRaw.trim();
  }

  const reviewsUrl = cfg['reviews-url'] || '';
  const schedulerId = cfg['button-scheduler-id'] || '';
  const extraClass = cfg['button-class'] || '';
  block.innerHTML = '';

  const inner = document.createElement('div');
  inner.className = 'mainarea-inner';
  const logoWrap = document.createElement('div');
  logoWrap.className = 'mainarea-logo';
  if (logoCell) {
    const pic = logoCell.querySelector('picture, img');
    if (pic) logoWrap.appendChild(pic.cloneNode(true));
  }
  inner.appendChild(logoWrap);
  const reviewsWrap = document.createElement('div');
  reviewsWrap.className = 'mainarea-reviews';
  if (reviewsUrl) {
    const badge = document.createElement('div');
    badge.className = 'reviews-badge';
    const iframe = document.createElement('iframe');
    iframe.src = reviewsUrl;
    iframe.loading = 'lazy';
    iframe.width = '100%';
    iframe.height = '56';
    iframe.style.border = 'none';
    iframe.title = 'Google Reviews';
    badge.appendChild(iframe);
    reviewsWrap.appendChild(badge);
  }
  inner.appendChild(reviewsWrap);
  const ctaWrap = document.createElement('div');
  ctaWrap.className = 'mainarea-cta';
  if (phoneText) {
    const p = document.createElement('p');
    p.className = 'mainarea-phone';

    p.appendChild(createIconSpan('phone'));
    p.appendChild(document.createTextNode(` ${phoneText}`));

    ctaWrap.appendChild(p);
  }
  if (btnLabel) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'button primary with-icon mainarea-button se-booking-show';

    if (extraClass) {
      extraClass.split(/\s+/).forEach((c) => c && btn.classList.add(c));
    }
    btn.appendChild(createIconSpan(btnIconName));

    const labelSpan = document.createElement('span');
    labelSpan.className = 'label';
    labelSpan.textContent = btnLabel;
    btn.appendChild(labelSpan);

    if (schedulerId) {
      btn.setAttribute(
        'onclick',
        `_scheduler.show({ schedulerId: '${schedulerId}' })`,
      );
      btn.addEventListener('click', () => {
        window._scheduler?.show?.({ schedulerId });
      });
    }

    ctaWrap.appendChild(btn);
  }
  const rightWrap = document.createElement('div');
  rightWrap.classList.add('mainarea-right');
  rightWrap.append(reviewsWrap, ctaWrap);

  inner.append(logoWrap, rightWrap);
  block.appendChild(inner);
}
