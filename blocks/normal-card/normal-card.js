function normLink(href) {
  const v = (href || '').trim();
  if (!v) return '';
  if (/^https?:\/\//i.test(v) || v.startsWith('/')) return v;
  return `/${v}`;
}
function makeCard({ title, desc, cta, href }) {
  const article = document.createElement('article');
  article.className = 'nc-card';

  if (title) {
    const h3 = document.createElement('h3');
    h3.className = 'nc-title';
    h3.textContent = title.trim();
    article.appendChild(h3);
  }

  if (desc) {
    const p = document.createElement('p');
    p.className = 'nc-desc';
    p.innerHTML = desc.trim().replace(/\n/g, '<br>');
    article.appendChild(p);
  }

  if (cta && href) {
    const a = document.createElement('a');
    a.className = 'nc-btn';
    a.href = normLink(href);
    a.textContent = cta.trim();
    a.setAttribute('aria-label', `${cta} - ${title || ''}`.trim());
    article.appendChild(a);
  }

  return article;
}
function readRows(block) {
  const rows = [];

  const table = block.querySelector('table');
  if (table) {
    const trs = [...table.rows];
    const start = trs[0]?.querySelector('th') ? 1 : 0;
    for (let i = start; i < trs.length; i += 1) {
      const r = trs[i];
      rows.push([
        (r.cells[0]?.innerText || '').trim(),
        (r.cells[1]?.innerText || '').trim(),
        (r.cells[2]?.innerText || '').trim(),
        (r.cells[3]?.innerText || '').trim(),
      ]);
    }
    return rows;
  }
  const divRows = [...block.children].filter((el) => el.tagName === 'DIV');
  const likelyHeader =
    divRows[0] && divRows[0].children.length === 1 &&
    (divRows[0].textContent || '').trim().toLowerCase() === 'normal-card';

  const startIdx = likelyHeader ? 1 : 0;

  for (let i = startIdx; i < divRows.length; i += 1) {
    const r = divRows[i];
    const cells = [...r.children].filter((el) => el.tagName === 'DIV');
    rows.push([
      (cells[0]?.innerText || '').trim(),
      (cells[1]?.innerText || '').trim(),
      (cells[2]?.innerText || '').trim(),
      (cells[3]?.innerText || '').trim(), 
    ]);
  }

  return rows;
}export default function decorate(block) {
  block.style.outline = '';
  block.classList.remove('nc-probe');
  block.removeAttribute('data-nc');

  const data = readRows(block);
  if (!data.length) return;

  const grid = document.createElement('div');
  grid.className = 'nc-grid';

  data.forEach(([title, desc, cta, href]) => {
    const card = makeCard({ title, desc, cta, href });
    grid.appendChild(card);
  });

  block.innerHTML = '';
  block.appendChild(grid);
}
