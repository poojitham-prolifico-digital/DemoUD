export default function decorate(block) {
  const table = block.querySelector('table');
  let rows = [];
  let mode = 'table';

  if (table) {
    rows = [...table.querySelectorAll('tr')];
  } else {
    mode = 'divgrid';
    const rowNodes = [...block.children];
    if (rowNodes.length === 1 && rowNodes[0].children?.length) {
      rows = [...rowNodes[0].children];
    } else {
      rows = rowNodes;
    }
  }

  if (!rows.length) return;

  const getText = (el) => (el?.textContent || '').trim().toLowerCase();
  const getCells = (row) => {
    if (mode === 'table') return [...row.querySelectorAll('td,th')];
    return row ? [...row.children] : [];
  };

  let dataRows = rows;
  const firstCells = getCells(rows[0]);
  const headerGuess = firstCells.length >= 3 && (
    getText(firstCells[0]).includes('image') ||
    getText(firstCells[1]).includes('title') ||
    getText(firstCells[2]).includes('body')
  );
  if (headerGuess) dataRows = rows.slice(1);

  const list = document.createElement('ul');
  list.className = 'cc-grid';

  dataRows.forEach((row) => {
    const cells = getCells(row);
    const [imgCell, titleCell, bodyCell] = cells;

    const li = document.createElement('li');
    li.className = 'cc-card';
    const media = imgCell?.querySelector?.('picture, img');
    const mediaWrap = document.createElement('div');
    mediaWrap.className = 'cc-media';
    if (media) mediaWrap.append(media.cloneNode(true));
    const panel = document.createElement('div');
    panel.className = 'cc-panel';

    // Pull the authored title text AND link (if any)
    const titleTextOriginal = (titleCell?.textContent || '').trim();
    const titleLinkEl = titleCell?.querySelector?.('a');
    const titleTextForAria =
      (titleLinkEl?.textContent || titleTextOriginal || '').trim();

    const h3 = document.createElement('h3');
    if (titleLinkEl && titleLinkEl.href) {
      h3.textContent = titleTextForAria;
    } else if (titleTextOriginal) {
      h3.textContent = titleTextOriginal;
    }
    if (h3.textContent) panel.append(h3);

    const bodyHTML = bodyCell?.innerHTML || '';
    if (bodyHTML) {
      const copy = document.createElement('div');
      copy.className = 'cc-copy';
      copy.innerHTML = bodyHTML;
      panel.append(copy);
    }
    if (titleLinkEl && titleLinkEl.href) {
      const a = document.createElement('a');
      a.className = 'cc-card__link'; 
      a.href = titleLinkEl.href;
      if (titleLinkEl.target) a.target = titleLinkEl.target;
      if (titleLinkEl.rel) a.rel = titleLinkEl.rel;
      if (titleTextForAria) a.setAttribute('aria-label', titleTextForAria);
      a.append(mediaWrap, panel);
      li.classList.add('has-link'); 
      li.append(a);
    } else {
      li.append(mediaWrap, panel);
    }

    list.append(li);
  });

  block.innerHTML = '';
  block.append(list);
}
