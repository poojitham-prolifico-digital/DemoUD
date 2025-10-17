function buildWrapper(align) {
  // align: 'left' | 'center' | 'right'
  const wrapper = document.createElement('div');
  wrapper.className = `image img-${align}-align`;
  return wrapper;
}
function buildCmpImage(node, widthValue) {
  const cmp = document.createElement('div');
  cmp.className = 'cmp-image';
  cmp.id = `image-${Math.random().toString(36).slice(2, 10)}`;

  if (widthValue) cmp.style.width = widthValue;

  if (node) cmp.append(node);
  return cmp;
}
function extractTokens(text) {
  const raw = (text || '').toLowerCase();

  let align = 'left';
  if (raw.includes('align:center')) align = 'center';
  else if (raw.includes('align:right')) align = 'right';

  let width;
  const m = raw.match(/width\s*:\s*([0-9]+(?:px|%|rem|em)?)/);
  if (m && m[1]) {
    width = /\D/.test(m[1]) ? m[1] : `${m[1]}px`;
  }

  return { align, width };
}
function getFirstMedia(el) {
  const pic = el.querySelector('picture');
  if (pic) return pic;
  const img = el.querySelector('img');
  return img || null;
}
export default function decorate(block) {
  const table = block.querySelector('table');
  if (table && table.rows && table.rows[0]) {
    const [cfgCell, mediaCell] = table.rows[0].cells || [];
    const { align, width } = extractTokens(cfgCell?.textContent || '');

    const mediaNode = getFirstMedia(mediaCell || block);
    if (mediaNode) {
      const mediaClone = mediaNode.cloneNode(true);
      const ui = buildWrapper(align);
      const cmp = buildCmpImage(mediaClone, width);
      ui.append(cmp);

      block.innerHTML = '';
      block.append(ui);
      return;
    }
  }
  const { align, width } = extractTokens(block.textContent || '');
  const mediaNode = getFirstMedia(block);
  if (!mediaNode) return;
  block.querySelectorAll('*').forEach((el) => {
    const txt = (el.textContent || '').trim().toLowerCase();
    if (/^align\s*:\s*(left|right|center)$/.test(txt) || /^width\s*:\s*/.test(txt)) {
      el.remove();
    }
  });

  const mediaClone = mediaNode.cloneNode(true);
  const ui = buildWrapper(align);
  const cmp = buildCmpImage(mediaClone, width);
  ui.append(cmp);

  block.innerHTML = '';
  block.append(ui);
}
