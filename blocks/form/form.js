export default function decorate(block) {
  const jotformId = block.textContent?.trim();

  if (!jotformId || !/^\d+$/.test(jotformId)) return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://form.jotform.com/${jotformId}?isIframeEmbed=1&referrer=${window.location.href}`;
  iframe.title = 'Contact_Us';
  iframe.loading = 'lazy';
  iframe.allowTransparency = 'true';
  iframe.allowFullscreen = true;
  iframe.setAttribute('allow', 'geolocation; microphone; camera');
  iframe.frameBorder = '0';
  iframe.scrolling = 'no';
  iframe.style.minWidth = '100%';
  iframe.style.maxWidth = '100%';
  iframe.style.height = '666px';
  iframe.style.border = 'none';

  block.innerHTML = '';
  block.appendChild(iframe);
}
