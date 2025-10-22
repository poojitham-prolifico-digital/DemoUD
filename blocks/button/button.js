function readConfigFromBlock(block) {
  const cfg = {};
  const rows = [...block.querySelectorAll(':scope > div')];
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 1) return;
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase();
      const val = cells[1].textContent.trim();
      cfg[key] = val;
    }
  });
  return cfg;
}function createBaseButton(label) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'button primary';
  btn.textContent = label || 'Book Now!';
  return btn;
}

function attachScheduler(btn, schedulerId) {
  btn.setAttribute(
    'onclick',
    `_scheduler.show({ schedulerId: '${schedulerId}' })`
  );
  btn.addEventListener('click', () => {
    try {
      if (window._scheduler && typeof window._scheduler.show === 'function') {
        window._scheduler.show({ schedulerId });
      }
    } catch (e) {
      console.warn('Scheduling Pro not available yet.');
    }
  });
}
export default function decorate(block) {
  const cfg = readConfigFromBlock(block);

  const label = cfg['label'] || 'Book Now!';
  const schedulerId = cfg['scheduler id'] || cfg['schedulerid'];
  const className = cfg['class'];
  block.textContent = '';

  const buttonEl = createBaseButton(label);
  if (schedulerId && className) {
    attachScheduler(buttonEl, schedulerId);
    buttonEl.className = `button primary ${className}`.trim();
  } else if (schedulerId) {
    attachScheduler(buttonEl, schedulerId);
  } else if (className) {
    buttonEl.className = `button primary ${className}`.trim();
  } else {
    buttonEl.disabled = true;
    buttonEl.title = 'Provide either "Scheduler ID" or "Class" in the block.';
  }
  block.appendChild(buttonEl);
}
