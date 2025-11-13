function getPlainTextExcludingIcons(el) {
  const clone = el.cloneNode(true);
  clone.querySelectorAll('span.icon').forEach((n) => n.remove());
  return clone.textContent.replace(/\u00A0/g, ' ').replace(/\uFF1A/g, ':').trim();
}
function getTableConfig(block) {
  const cfg = {};
  const rows = [...block.querySelectorAll(':scope > div')];
  for (const row of rows) {
    const cells = [...row.children];
    if (cells.length < 2) continue;

    const key = cells[0].textContent.trim().toLowerCase();
    const valEl = cells[1];

    if (key === 'label') {
      const raw = valEl.textContent.replace(/\u00A0/g, ' ').replace(/\uFF1A/g, ':').trimStart();
      const m = /^:([a-z0-9-]+):\s*(.*)$/i.exec(raw);

      // 2) already-decorated icon?
      const iconSpan = valEl.querySelector('span.icon');

      if (m) {
        cfg.__icon = m[1].toLowerCase();
        cfg.label = (m[2] || '').trim();
      } else if (iconSpan) {
        const mm = /icon-([a-z0-9-]+)/i.exec(iconSpan.className);
        if (mm) cfg.__icon = mm[1].toLowerCase();
        cfg.label = getPlainTextExcludingIcons(valEl);
      } else {
        cfg.label = getPlainTextExcludingIcons(valEl);
      }
    } else {
      cfg[key] = getPlainTextExcludingIcons(valEl);
    }
  }
  return cfg;
}

function injectIconSpan(iconName) {
  const icon = document.createElement('span');
  icon.className = `icon icon-${iconName}`;
  const img = document.createElement('img');
  img.src = `/icons/${iconName}.svg`;
  img.alt = iconName;
  img.width = 18;
  img.height = 18;
  icon.appendChild(img);
  return icon;
}

export default function decorate(block) {
  const cfg = getTableConfig(block);
  const label = (cfg.label ?? '').trim();                  
  const iconName = (cfg.__icon || '').trim(); 
  const schedulerId = cfg['scheduler id'] || cfg['schedulerid'] || cfg['scheduler id#'];
  const extraClass = cfg['class'];

  block.replaceChildren();

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'button primary';

  if (iconName) {
    btn.classList.add('with-icon');
    btn.appendChild(injectIconSpan(iconName));
    const txt = document.createElement('span');
    txt.className = 'label';
    txt.textContent = label;
    btn.appendChild(txt);
  } else {
    btn.textContent = label;
  }
  if (schedulerId) {
    btn.setAttribute('onclick', `_scheduler.show({ schedulerId: '${schedulerId}' })`);
    btn.addEventListener('click', () => window._scheduler?.show?.({ schedulerId }));
  }
  if (extraClass) btn.classList.add(extraClass);

  block.appendChild(btn);
}
