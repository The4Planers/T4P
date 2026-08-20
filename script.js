const intro=document.getElementById('intro');
window.addEventListener('load',()=>setTimeout(()=>intro?.classList.add('hide'),1650));

// Comparison: BIM stays fixed; the point-cloud layer is the moving/revealing layer.
const compare=document.getElementById('compare');
const pointCloudLayer=document.getElementById('pointCloudLayer');
const compareHandle=document.getElementById('compareHandle');
const pointCloudImage=pointCloudLayer?.querySelector('img');
let compareDrag=false;
function syncCompare(){
  if(!compare||!pointCloudImage) return;
  const r=compare.getBoundingClientRect();
  pointCloudImage.style.width=r.width+'px';
  pointCloudImage.style.height=r.height+'px';
}
function setCompare(clientX){
  if(!compare||!pointCloudLayer||!compareHandle) return;
  const r=compare.getBoundingClientRect();
  let p=((clientX-r.left)/r.width)*100;
  p=Math.max(3,Math.min(97,p));
  pointCloudLayer.style.width=p+'%';
  compareHandle.style.left=p+'%';
}
if(compare){
  syncCompare(); setCompare(compare.getBoundingClientRect().left+compare.clientWidth*.5);
  compare.addEventListener('pointerdown',e=>{compareDrag=true; compare.setPointerCapture?.(e.pointerId); setCompare(e.clientX); e.preventDefault();});
  compare.addEventListener('pointermove',e=>{if(compareDrag)setCompare(e.clientX);});
  compare.addEventListener('pointerup',()=>compareDrag=false);
  compare.addEventListener('pointercancel',()=>compareDrag=false);
  compare.addEventListener('lostpointercapture',()=>compareDrag=false);
  window.addEventListener('resize',()=>{syncCompare();});
}

// Video behavior
const vids=document.querySelectorAll('video');
const io=new IntersectionObserver(es=>es.forEach(e=>{
  const v=e.target;
  v.muted=true; v.setAttribute('playsinline','');
  if(e.isIntersecting) v.play().catch(()=>{});
  else if(!v.closest('.hero')) v.pause();
}),{threshold:.12});
vids.forEach(v=>io.observe(v));

// Mobile menu
const menuToggle=document.getElementById('menuToggle'), mobileMenu=document.getElementById('mobileMenu');
if(menuToggle&&mobileMenu){
  const closeMenu=()=>{menuToggle.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');mobileMenu.classList.remove('open');mobileMenu.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open');};
  menuToggle.addEventListener('click',()=>{const open=!mobileMenu.classList.contains('open');menuToggle.classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open));mobileMenu.classList.toggle('open',open);mobileMenu.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('menu-open',open);});
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  window.addEventListener('resize',()=>{if(innerWidth>700)closeMenu();});
}

// Project portfolio: content is data-driven so future cloud/JSON updates don't require redesigning the page.
const projectGrid=document.getElementById('projectGrid');
const modal=document.getElementById('projectModal'), modalClose=document.getElementById('modalClose');
let projects=[];
const fallbackProjects=[];
function projectCard(p,i){
  const article=document.createElement('article'); article.className='project-card';
  article.innerHTML=`<button class="project-open" data-project="${p.id}">
    <div class="project-card-media"><img src="${p.poster}" alt="${p.title}" loading="lazy"><span class="project-index">0${i+1}</span><span class="project-arrow">↗</span></div>
    <div class="project-card-body"><div class="section-kicker">${p.eyebrow}</div><h3>${p.title}</h3><p>${p.description}</p><div class="project-card-meta"><span>${p.location}</span><span>${p.lod}</span><span>${p.duration}</span></div></div>
  </button>`;
  return article;
}
function renderProjects(data){projects=data||[]; if(!projectGrid)return; projectGrid.innerHTML=''; projects.forEach((p,i)=>projectGrid.appendChild(projectCard(p,i))); projectGrid.querySelectorAll('.project-open').forEach(b=>b.addEventListener('click',()=>openProject(b.dataset.project)));}
fetch('assets/projects/projects.json').then(r=>r.ok?r.json():Promise.reject()).then(renderProjects).catch(()=>renderProjects(fallbackProjects));

function openProject(id){
  const p=projects.find(x=>x.id===id); if(!p||!modal)return;
  document.getElementById('modalEyebrow').textContent=p.eyebrow;
  document.getElementById('modalTitle').textContent=p.title;
  document.getElementById('modalDescription').textContent=p.description;
  document.getElementById('modalStats').innerHTML=[['LOCATION',p.location],['DETAIL',p.lod],['DELIVERY',p.duration],['TYPE',p.type]].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('');
  document.getElementById('modalScope').innerHTML=p.scope.map(x=>`<span>${x}</span>`).join('');
  document.getElementById('modalGallery').innerHTML=p.images.map(x=>`<img src="${x}" alt="${p.title} project view" loading="lazy">`).join('');
  const v=document.getElementById('modalVideo'); v.pause(); v.src=p.video; v.load();
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
}
function closeProject(){if(!modal)return; const v=document.getElementById('modalVideo');v.pause();v.removeAttribute('src');v.load();modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
modalClose?.addEventListener('click',closeProject); modal?.querySelectorAll('[data-close-modal]').forEach(x=>x.addEventListener('click',closeProject)); window.addEventListener('keydown',e=>{if(e.key==='Escape')closeProject();});
