const projects=[
 {name:"BUILDING 8157",meta:"SCAN TO BIM · PROJECT 01",type:"Residential / Existing Conditions",hero:"assets/building-8157/model.png",cloud:"assets/building-8157/pointcloud-bim.png",video:"assets/building-8157/project.mp4",details:[["Workflow","Point Cloud → Revit"],["Visuals","3D Model + Point Cloud"],["Documentation","Plans / Sections / Elevations"]],gallery:["assets/building-8157/model.png","assets/building-8157/pointcloud-bim.png","assets/building-8157/detail.png","assets/building-8157/elevations.png","assets/building-8157/plan-1.png","assets/building-8157/plan-2.png","assets/building-8157/plan-3.png","assets/building-8157/plan-4.png","assets/building-8157/section-1.png","assets/building-8157/section-2.png"]},
 {name:"JC BUJUMBURA",meta:"BIM MODELING · PROJECT 02",type:"Architectural / Presentation",hero:"assets/jc-bujumbura/model-1.png",cloud:"assets/jc-bujumbura/project-board.jpg",video:"assets/jc-bujumbura/project-web.mp4",details:[["Workflow","BIM Modeling"],["Visuals","Model + Project Boards"],["Output","Presentation / Design"]],gallery:["assets/jc-bujumbura/model-1.png","assets/jc-bujumbura/model-2.png","assets/jc-bujumbura/brand-board.png","assets/jc-bujumbura/project-board.jpg","assets/jc-bujumbura/info-board.jpg"]},
 {name:"RDCH RIAD",meta:"ARCHITECTURAL BIM · PROJECT 03",type:"Architectural / Cut View",hero:"assets/rdch-riad/model.png",cloud:"assets/rdch-riad/cut-view.png",video:"assets/rdch-riad/project.mp4",details:[["Workflow","Architectural BIM"],["Visuals","3D Model + Cut View"],["Output","Model Presentation"]],gallery:["assets/rdch-riad/model.png","assets/rdch-riad/cut-view.png"]},
 {name:"EGYPT INDUSTRIAL FACILITY",meta:"SCAN TO BIM · LOD 500 · PROJECT 04",type:"Egypt · MEP / Industrial BIM",hero:"assets/egypt-industrial-lod500/model.webp",cloud:"assets/egypt-industrial-lod500/pointcloud-bim.webp",video:"assets/egypt-industrial-lod500/project.mp4",details:[["Location","Egypt"],["LOD","LOD 500"],["Delivery","25 Days · Client: Mohamud"]],gallery:["assets/egypt-industrial-lod500/model.webp","assets/egypt-industrial-lod500/pointcloud-bim.webp"]}
];

const grid=document.querySelector("#projectGrid");

function videoMarkup(src, label="PROJECT VIDEO"){
 return `<div class="project-tile video">
   <span class="tile-label">03 / ${label}</span>
   <video class="smart-video" src="${src}" muted loop playsinline preload="auto"></video>
   <button class="video-play" type="button" aria-label="Play project video">▶</button>
 </div>`;
}

grid.innerHTML=projects.map((p,i)=>`<article class="project reveal" data-index="${i}">
 <div class="project-media">
  <div class="project-tile"><span class="tile-label">01 / 3D BIM MODEL</span><img src="${p.hero}" alt="${p.name} BIM model" loading="lazy"></div>
  <div class="project-tile cloud"><span class="tile-label">02 / POINT CLOUD + BIM</span><img src="${p.cloud}" alt="${p.name} point cloud or project visual" loading="lazy"></div>
  ${videoMarkup(p.video)}
 </div>
 <div class="project-info"><div><div class="kicker">${p.meta}</div><h3>${p.name}</h3><p>${p.type}</p></div><div class="project-open">OPEN CASE STUDY ↗</div></div>
</article>`).join("");

const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.08});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

function initProjectVideo(video){
 if(!video) return;
 const play=()=>video.play().catch(()=>{});
 video.addEventListener("canplay",play,{once:true});
 video.addEventListener("loadeddata",play,{once:true});
 if(video.readyState>=2) play();

 const tile=video.closest(".video");
 const btn=tile?.querySelector(".video-play");
 btn?.addEventListener("click",ev=>{
   ev.stopPropagation();
   if(video.paused){ video.play().catch(()=>{}); btn.textContent="❚❚"; }
   else { video.pause(); btn.textContent="▶"; }
 });
}

document.querySelectorAll(".smart-video").forEach(initProjectVideo);

document.querySelectorAll(".project").forEach(card=>{
 card.addEventListener("mousemove",e=>{
  const r=card.getBoundingClientRect();
  card.style.setProperty("--mx",`${((e.clientX-r.left)/r.width)*100}%`);
  card.style.setProperty("--my",`${((e.clientY-r.top)/r.height)*100}%`);
 });
 card.addEventListener("click",e=>{
  if(e.target.closest(".video-play")) return;
  openCase(Number(card.dataset.index));
 });
});

const modal=document.querySelector("#modal"), content=document.querySelector("#modalContent");

function openCase(i){
 const p=projects[i];
 content.innerHTML=`<div class="case-kicker">${p.meta}</div>
 <h2 class="case-title">${p.name}</h2>
 <div class="case-hero">
   <img src="${p.hero}" alt="${p.name} model">
   <div class="case-video-wrap">
     <video class="case-video" src="${p.video}" autoplay muted loop playsinline controls preload="auto"></video>
   </div>
 </div>
 <div class="case-copy">${p.details.map(d=>`<div><b>${d[0]}</b><span>${d[1]}</span></div>`).join("")}</div>
 <div class="case-gallery">${p.gallery.map((x,j)=>`<img class="${j===2&&p.gallery.length>4?'wide':''}" src="${x}" alt="${p.name} project view" loading="lazy">`).join("")}</div>`;

 modal.classList.add("open");
 modal.setAttribute("aria-hidden","false");
 document.body.style.overflow="hidden";

 const mv=content.querySelector(".case-video");
 if(mv) mv.play().catch(()=>{});
}

function closeCase(){
 modal.classList.remove("open");
 modal.setAttribute("aria-hidden","true");
 document.body.style.overflow="";
 content.innerHTML="";
}

document.querySelectorAll("[data-close]").forEach(x=>x.addEventListener("click",closeCase));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCase()});

const progress=document.querySelector(".progress span");
window.addEventListener("scroll",()=>{
 const h=document.documentElement.scrollHeight-innerHeight;
 progress.style.width=`${h>0?(scrollY/h)*100:0}%`;
},{passive:true});

/* HERO VIDEO: browsers can delay autoplay, so explicitly request playback. */
const heroVideo=document.querySelector(".hero-bg-video");
if(heroVideo){
 const startHero=()=>{
   heroVideo.muted=true;
   heroVideo.playsInline=true;
   heroVideo.play().catch(()=>{});
 };
 heroVideo.addEventListener("loadeddata",startHero,{once:true});
 heroVideo.addEventListener("canplay",startHero,{once:true});
 document.addEventListener("visibilitychange",()=>{
   if(!document.hidden) startHero();
 });
 if(heroVideo.readyState>=2) startHero();
}

/* Welcome animation */
window.addEventListener("load",()=>{
 document.body.classList.add("page-ready");
});
