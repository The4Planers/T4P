const compare=document.getElementById('compare');
const overlay=document.getElementById('overlay');
const handle=document.getElementById('handle');
let dragging=false;
function setPos(clientX){
  const r=compare.getBoundingClientRect();
  let p=((clientX-r.left)/r.width)*100;
  p=Math.max(2,Math.min(98,p));
  overlay.style.width=p+'%';
  handle.style.left=p+'%';
  handle.setAttribute('aria-valuenow',Math.round(p));
}
compare.addEventListener('pointerdown',e=>{dragging=true;compare.setPointerCapture(e.pointerId);setPos(e.clientX)});
compare.addEventListener('pointermove',e=>{if(dragging)setPos(e.clientX)});
compare.addEventListener('pointerup',()=>dragging=false);
compare.addEventListener('pointercancel',()=>dragging=false);
handle.addEventListener('keydown',e=>{
  const step=e.shiftKey?10:2;
  const current=parseFloat(handle.style.left)||50;
  if(e.key==='ArrowLeft')setPos(compare.getBoundingClientRect().left+(current-step)/100*compare.getBoundingClientRect().width);
  if(e.key==='ArrowRight')setPos(compare.getBoundingClientRect().left+(current+step)/100*compare.getBoundingClientRect().width);
});
