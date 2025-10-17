function buildTitle({ align = 'center', titleHTML = '' }) {
  const wrapper = document.createElement('div');
  wrapper.className = `title title--text-${align} title--color-dark`;

  const cmp = document.createElement('div');
  cmp.className = 'cmp-title';
  cmp.id = `title-${Math.random().toString(36).slice(2, 10)}`;

  const h2 = document.createElement('h2');
  h2.className = 'cmp-title__text';
  h2.innerHTML = titleHTML;

  cmp.append(h2);
  wrapper.append(cmp);
  return wrapper;
}

export default function decorate(block) {
  const table = block.querySelector('table');
  if (table && table.rows && table.rows[0]) {
    const [cfgCell, textCell] = table.rows[0].cells || [];
    const rawCfg = (cfgCell?.textContent || '').trim().toLowerCase();

    let align = 'center';
    if (rawCfg.includes('left')) align = 'left';
    else if (rawCfg.includes('right')) align = 'right';
    else if (rawCfg.includes('center')) align = 'center';

    const titleHTML = textCell ? textCell.innerHTML.trim() : '';
    if (titleHTML) {
      const ui = buildTitle({ align, titleHTML });
      block.innerHTML = '';
      block.append(ui);
      return;
    }
  }
  let align = 'center';
  const textAll = (block.textContent || '').toLowerCase();
  if (textAll.includes('align:left')) align = 'left';
  else if (textAll.includes('align:right')) align = 'right';
  else if (textAll.includes('align:center')) align = 'center';

  let titleNode = block.querySelector('h1,h2,h3,h4,h5,h6');
  let titleHTML = titleNode ? titleNode.innerHTML.trim() : '';

  if (!titleHTML) {
    const kids = [...block.children].filter((el) => (el.textContent || '').trim());
    titleHTML = kids[1]?.innerHTML?.trim() || kids[0]?.innerHTML?.trim() || '';
  }

  if (!titleHTML) return;
  block.querySelectorAll('*').forEach((el) => {
    if (/^align\s*:\s*(left|right|center)$/i.test((el.textContent || '').trim())) el.remove();
  });

  const ui = buildTitle({ align, titleHTML });
  block.innerHTML = '';
  block.append(ui);
}
