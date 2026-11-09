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
  const main=document.getElementById('downloadBtn');
  const win10=document.getElementById('downloadWin10');
  const archive=document.getElementById('releasesLink');
  const latest=`https://github.com/${repo}/releases/latest`;
  archive.href=`https://github.com/${repo}/releases`;
  archive.classList.remove('disabled');archive.removeAttribute('aria-disabled');
  // Fallback when GitHub API is unavailable: the existing, working release page.
  main.href=latest;
  main.innerHTML='Открыть релиз Windows 11 <span>↗</span>';
  document.getElementById('downloadStatus').textContent='Windows 11: опубликован. Windows 10: проверяется наличие отдельного установщика.';
  document.getElementById('releaseTitle').textContent='Последняя версия Daylo';
  document.getElementById('releaseDesc').textContent='Установщики доступны в GitHub Releases. Выберите вашу Windows.';
  document.getElementById('win11ReleaseLink').href=latest;
  document.getElementById('win11State').textContent='Открыть последнюю опубликованную версию';
  document.getElementById('win10State').textContent='Установщик пока не опубликован';
  const enable=(el,url,text)=>{el.href=url;el.classList.remove('disabled');el.removeAttribute('aria-disabled');if(text)el.textContent=text;};
  fetch(`https://api.github.com/repos/${repo}/releases/latest`, {headers:{'Accept':'application/vnd.github+json'}})
    .then(r=>{if(!r.ok)throw new Error('GitHub API HTTP '+r.status);return r.json()})
    .then(release=>{
      const assets=Array.isArray(release.assets)?release.assets:[];
      const executable=a=>a && /\.exe$/i.test(a.name) && a.browser_download_url && /^https:\/\/github\.com\//.test(a.browser_download_url);
      const ten=assets.find(a=>executable(a) && /win(?:dows)?[_-]?10/i.test(a.name));
      const eleven=assets.find(a=>executable(a) && /win(?:dows)?[_-]?11/i.test(a.name)) || assets.find(a=>executable(a) && !/win(?:dows)?[_-]?10/i.test(a.name));
      const version=String(release.tag_name||'').replace(/^v/i,'');
      document.getElementById('releaseTitle').textContent='Daylo '+(version||'— последняя версия');
      if(eleven){
        enable(main,eleven.browser_download_url);main.innerHTML='Скачать для Windows 11 <span>↓</span>';
        enable(document.getElementById('win11ReleaseLink'),eleven.browser_download_url,'Скачать установщик ↓');
        document.getElementById('win11State').textContent='Доступен для загрузки · '+version;
      }
      if(ten){
        enable(win10,ten.browser_download_url);win10.innerHTML='Скачать для Windows 10 <span>↓</span>';
        enable(document.getElementById('win10ReleaseLink'),ten.browser_download_url,'Скачать установщик ↓');
        document.getElementById('win10State').textContent='Доступен для загрузки · '+version;
        document.getElementById('downloadStatus').textContent='Выберите свою систему: оба установщика опубликованы.';
      }else{
        document.getElementById('win10State').textContent='Готовится: опубликуем после проверки на Windows 10';
        document.getElementById('downloadStatus').textContent='Windows 11 доступна. Windows 10 появится после тестирования сборки.';
      }
    })
    .catch(()=>{
      document.getElementById('downloadStatus').textContent='Не удалось проверить файлы автоматически. Откройте страницу релиза.';
      document.getElementById('win11State').textContent='Открыть последнюю версию на GitHub';
      document.getElementById('win10State').textContent='Наличие сборки Windows 10 пока не подтверждено';
    });
})();
