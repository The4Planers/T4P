const intro=document.getElementById('intro');
window.addEventListener('load',()=>setTimeout(()=>intro.classList.add('hide'),1500));
const compare=document.getElementById('compare'), model=document.querySelector('.compare-model'), handle=document.getElementById('compareHandle');
function move(x){const r=compare.getBoundingClientRect();let p=((x-r.left)/r.width)*100;p=Math.max(3,Math.min(97,p));model.style.width=p+'%';handle.style.left=p+'%'}
compare.addEventListener('pointerdown',e=>{compare.setPointerCapture(e.pointerId);move(e.clientX)});compare.addEventListener('pointermove',e=>{if(e.buttons)move(e.clientX)});
compare.addEventListener('touchstart',e=>move(e.touches[0].clientX),{passive:true});compare.addEventListener('touchmove',e=>move(e.touches[0].clientX),{passive:true});
const vids=document.querySelectorAll('video'); const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.play().catch(()=>{});else e.target.pause()}),{threshold:.15}); vids.forEach(v=>io.observe(v));
