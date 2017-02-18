export function loadCSS (url) {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  stylesheet.href = url;
  requestAnimationFrame(() => {
    document.getElementsByTagName('head')[0].appendChild(stylesheet);
  });
}
