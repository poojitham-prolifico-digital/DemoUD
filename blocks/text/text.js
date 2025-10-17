
function buildText({ align = 'left', html = '', color = 'dark' }) {
  const wrapper = document.createElement('div');
  wrapper.className = `text text--align-${align} text--color-${color}`;

  const cmp = document.createElement('div');
  cmp.className = 'cmp-text';
  cmp.id = `text-${Math.random().toString(36).slice(2, 10)}`;

  // Keep authored rich text (p, strong, em, ul/ol, links, etc.)
  cmp.innerHTML = html;

  wrapper.append(cmp);
  return wrapper;
}

export default function decorate(block) {
  const table = block.querySelector('table');
  if (table && table.rows && table.rows[0]) {
    const [cfgCell, contentCell] = table.rows[0].cells || [];
    const cfg = (cfgCell?.textContent || '').toLowerCase();
    let align = 'left';
    if (cfg.includes('center')) align = 'center';
    else if (cfg.includes('right')) align = 'right';
    let color = 'dark';

    const html = contentCell ? contentCell.innerHTML.trim() : '';
    if (html) {
      const ui = buildText({ align, html, color });
      block.innerHTML = '';
      block.append(ui);
      return;
    }
  }
  let align = 'left';
  const allText = (block.textContent || '').toLowerCase();
  if (allText.includes('align:center')) align = 'center';
  else if (allText.includes('align:right')) align = 'right';
  block.querySelectorAll('p,div,span').forEach((el) => {
    const t = (el.textContent || '').trim().toLowerCase();
    if (/^align\s*:\s*(left|right|center)$/.test(t)) el.remove();
  });

  const html = block.innerHTML.trim();
  if (!html) return;

  const ui = buildText({ align, html, color: 'dark' });
  block.innerHTML = '';
  block.append(ui);
}
