export default function decorate(block) {
  const iframe = document.createElement('iframe');

  iframe.src = 'https://form.jotform.com/240255957613258?isIframeEmbed=1&referrer=https://www.mountainhomeutah.com/air-conditioning/&aaid=88575735570976223831839858657348094379,54,Direct,null,desktop,null&originReferrer=&promo_code=&utm_params=utm_campaign-null,utm_content-null,utm_medium-null,utm_source-null,utm_term-null';

  iframe.title = 'Contact_Us';
  iframe.loading = 'lazy';
  iframe.allowTransparency = 'true';
  iframe.allowFullscreen = true;
  iframe.setAttribute('allow', 'geolocation; microphone; camera');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('scrolling', 'no');
  iframe.style.minWidth = '100%';
  iframe.style.maxWidth = '800px';
  iframe.style.height = '666px';
  iframe.style.border = 'none';
  iframe.style.display = 'block';
  iframe.style.margin = '0 auto';

  block.innerHTML = '';
  block.appendChild(iframe);
}
