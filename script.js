(()=>{
  const root=document.documentElement;
  const toggle=document.getElementById('themeSwitch');
  const saved=localStorage.getItem('daylo-site-theme');
  if(saved==='light')root.classList.add('light');
  const updateTheme=()=>{toggle.textContent=root.classList.contains('light')?'☾':'☀';toggle.title=root.classList.contains('light')?'Тёмная тема':'Светлая тема'};
  updateTheme();toggle.addEventListener('click',()=>{root.classList.toggle('light');localStorage.setItem('daylo-site-theme',root.classList.contains('light')?'light':'dark');updateTheme()});
  document.getElementById('year').textContent=new Date().getFullYear();
  const repo=(window.DAYLO_REPO||'').trim();
  if(!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) return;
  const main=document.getElementById('downloadBtn'),archive=document.getElementById('releasesLink');
  const latest=`https://github.com/${repo}/releases/latest`;
  archive.href=`https://github.com/${repo}/releases`;archive.classList.remove('disabled');archive.removeAttribute('aria-disabled');
  // GitHub's 'latest' redirect always points to the current published release; no guessed EXE filename.
  main.href=latest;main.innerHTML='Открыть последний релиз <span>↗</span>';
  document.getElementById('downloadStatus').textContent='Актуальная версия и файл установщика доступны на странице релиза.';
  document.getElementById('releaseTitle').textContent='Последняя версия Daylo';
  document.getElementById('releaseDesc').textContent='Откройте GitHub Releases, чтобы скачать готовый установщик и посмотреть список изменений.';
})();
