export function ThemeScript() {
  const script = `
(function() {
  try {
    var t = localStorage.getItem('reader-theme');
    if (t) document.documentElement.setAttribute('data-theme', t);
  } catch(e) {}
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
