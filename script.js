const intro=document.getElementById('intro');
window.addEventListener('load',()=>setTimeout(()=>intro.classList.add('hide'),1500));
const compare=document.getElementById('compare'), model=document.querySelector('.compare-model'), handle=document.getElementById('compareHandle');
function move(x){const r=compare.getBoundingClientRect();let p=((x-r.left)/r.width)*100;p=Math.max(3,Math.min(97,p));model.style.width=p+'%';handle.style.left=p+'%'}
compare.addEventListener('pointerdown',e=>{compare.setPointerCapture(e.pointerId);move(e.clientX)});compare.addEventListener('pointermove',e=>{if(e.buttons)move(e.clientX)});
compare.addEventListener('touchstart',e=>move(e.touches[0].clientX),{passive:true});compare.addEventListener('touchmove',e=>move(e.touches[0].clientX),{passive:true});
const vids=document.querySelectorAll('video'); const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.play().catch(()=>{});else e.target.pause()}),{threshold:.15}); vids.forEach(v=>io.observe(v));

// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
  const closeMenu = () => {
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded','false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden','true');
    document.body.classList.remove('menu-open');
  };
  menuToggle.addEventListener('click', () => {
    const open = !mobileMenu.classList.contains('open');
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 700) closeMenu(); });
}

// Keep videos silent and mobile-friendly; do not force-load the whole file.
document.querySelectorAll('video').forEach(v => {
  v.muted = true;
  v.setAttribute('playsinline','');
  v.addEventListener('loadedmetadata', () => {
    if (v.paused && v.closest('.hero')) v.play().catch(()=>{});
  });
});
