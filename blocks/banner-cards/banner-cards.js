function cell(block, r, c = 0) {
  return block.children[r]?.children?.[c] || null;
}
function el(tag, cls, kids = []) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  kids.forEach(k => e.append(k));
  return e;
}

export default function decorate(block) {
  // media
  const media = el('div', 'banner-cards__media');
  const pic = cell(block, 0)?.querySelector('picture, img');
  if (pic) media.append(pic);

  // copy
  const copy = el('div', 'banner-cards__copy');
  const copyCell = cell(block, 1);
  if (copyCell) [...copyCell.childNodes].forEach(n => copy.append(n));

  // tick list
  const ticks = el('ul', 'banner-cards__ticklist');
  const iconClasses = (cell(block, 2, 0)?.textContent || '').trim();
  const tickCell = cell(block, 2, 1) || cell(block, 2, 0) || cell(block, 2);
  const list = tickCell?.querySelectorAll('li') || [];
  list.forEach(li => {
    const item = el('li', 'tick');
    const icoWrap = el('span', 'tick__icon');
    const ico = el('span', `tick__glyph ${iconClasses}`.trim());
    const txt = el('span', 'tick__text');
    [...li.childNodes].forEach(n => txt.append(n.cloneNode(true)));
    icoWrap.append(ico);
    item.append(icoWrap, txt);
    ticks.append(item);
  });

  // CTA
  const ctaIcon = (cell(block, 3, 0)?.textContent || '').trim();
  const ctaCell = cell(block, 3, 1) || cell(block, 3);
  let label = 'Learn More', href = '#';
  if (ctaCell) {
    const a = ctaCell.querySelector('a');
    if (a) { label = a.textContent.trim() || label; href = a.getAttribute('href') || href; }
    else { label = ctaCell.textContent.trim() || label; }
  }

  const ctaP = el('p', 'button-container');
  const ctaA = el('a', 'button banner-cards__cta');
  ctaA.href = href;
  ctaA.textContent = label;

  if (ctaIcon) {
    const iconSpan = el('span', `wg-icon ${ctaIcon} cta__icon`);
    ctaA.append(' ', iconSpan);
  }

  ctaP.append(ctaA);

  // assemble
  const content = el('div', 'banner-cards__content', [copy, ticks, ctaP]);
  const card = el('div', 'banner-cards', [media, content]);
  block.replaceChildren(card);
}
