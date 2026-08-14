const projects=[
{name:"BUILDING 8157",meta:"SCAN TO BIM · PROJECT 01",type:"Residential / Existing Conditions",hero:"assets/building-8157/model.png",cloud:"assets/building-8157/pointcloud-bim.png",video:"assets/building-8157/project.mp4",details:[["Workflow","Point Cloud → Revit"],["Visuals","3D Model + Point Cloud"],["Documentation","Plans / Sections / Elevations"]],gallery:["assets/building-8157/model.png","assets/building-8157/pointcloud-bim.png","assets/building-8157/detail.png","assets/building-8157/elevations.png","assets/building-8157/plan-1.png","assets/building-8157/plan-2.png","assets/building-8157/plan-3.png","assets/building-8157/plan-4.png","assets/building-8157/section-1.png","assets/building-8157/section-2.png"]},
{name:"JC BUJUMBURA",meta:"BIM MODELING · PROJECT 02",type:"Architectural / Presentation",hero:"assets/jc-bujumbura/model-1.png",cloud:"assets/jc-bujumbura/project-board.jpg",video:"assets/jc-bujumbura/project-web.mp4",details:[["Workflow","BIM Modeling"],["Visuals","Model + Project Boards"],["Output","Presentation / Design"]],gallery:["assets/jc-bujumbura/model-1.png","assets/jc-bujumbura/model-2.png","assets/jc-bujumbura/brand-board.png","assets/jc-bujumbura/project-board.jpg","assets/jc-bujumbura/info-board.jpg"]},
{name:"RDCH RIAD",meta:"ARCHITECTURAL BIM · PROJECT 03",type:"Architectural / Cut View",hero:"assets/rdch-riad/model.png",cloud:"assets/rdch-riad/cut-view.png",video:"assets/rdch-riad/project.mp4",details:[["Workflow","Architectural BIM"],["Visuals","3D Model + Cut View"],["Output","Model Presentation"]],gallery:["assets/rdch-riad/model.png","assets/rdch-riad/cut-view.png"]}
];

const grid=document.querySelector("#projectGrid");
grid.innerHTML=projects.map((p,i)=>`<article class="project reveal" data-index="${i}">
<div class="project-media">
<div class="project-tile"><span class="tile-label">01 / 3D BIM MODEL</span><img src="${p.hero}" alt="${p.name} BIM model" loading="lazy"></div>
<div class="project-tile cloud"><span class="tile-label">02 / POINT CLOUD + BIM</span><img src="${p.cloud}" alt="${p.name} point cloud or project visual" loading="lazy"></div>
<div class="project-tile video"><span class="tile-label">03 / PROJECT VIDEO</span><video src="${p.video}" muted loop autoplay playsinline preload="metadata"></video></div>
</div>
<div class="project-info"><div><div class="kicker">${p.meta}</div><h3>${p.name}</h3><p>${p.type}</p></div><div class="project-open">OPEN CASE STUDY ↗</div></div>
</article>`).join("");

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll(".project").forEach(card=>{
 card.addEventListener("mousemove",e=>{
   const r=card.getBoundingClientRect();
   card.style.setProperty("--mx",`${((e.clientX-r.left)/r.width)*100}%`);
   card.style.setProperty("--my",`${((e.clientY-r.top)/r.height)*100}%`);
 });
 card.addEventListener("click",()=>openCase(Number(card.dataset.index)));
});

const modal=document.querySelector("#modal"), content=document.querySelector("#modalContent");
function openCase(i){
 const p=projects[i];
 content.innerHTML=`<div class="case-kicker">${p.meta}</div>
 <h2 class="case-title">${p.name}</h2>
 <div class="case-hero"><img src="${p.hero}" alt="${p.name} model"><video src="${p.video}" autoplay muted loop playsinline controls></video></div>
 <div class="case-copy">${p.details.map(d=>`<div><b>${d[0]}</b><span>${d[1]}</span></div>`).join("")}</div>
 <video class="case-video" src="${p.video}" autoplay muted loop playsinline controls></video>
 <div class="case-gallery">${p.gallery.map((x,j)=>`<img class="${j===2&&p.gallery.length>4?'wide':''}" src="${x}" alt="${p.name} project view" loading="lazy">`).join("")}</div>`;
 modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}
function closeCase(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";content.innerHTML=""}
document.querySelectorAll("[data-close]").forEach(x=>x.addEventListener("click",closeCase));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCase()});

const progress=document.querySelector(".progress span");
window.addEventListener("scroll",()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${h>0?(scrollY/h)*100:0}%`},{passive:true});
