import { useEffect, useRef } from "react";
function ParticleMark() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    if (!ctx) return;
    const mask = document.createElement("canvas");
    mask.width = mask.height = 240;
    const m = mask.getContext("2d");
    if (!m) return;
    m.scale(2,2);
    m.fillStyle="#82D7D0"; m.fill(new Path2D("M8 24h25l25 39-15 25z"));
    m.fillStyle="#3E9C94"; m.fill(new Path2D("M47 95 88 24h25L72 95z M57 95h8l26-45 5 5 4-21-20 11 7 1z"),"evenodd");
    const data=m.getImageData(0,0,240,240).data, points=[];
    for(let y=0;y<240;y+=2) for(let x=0;x<240;x+=2) {
      const i=(y*240+x)*4;
      if(data[i+3]>120) points.push({x:x/240-.5,y:y/240-.5,a:Math.random()*Math.PI*2,r:.4+Math.random()*.6,light:data[i]>100});
    }
    const motion=matchMedia("(prefers-reduced-motion: reduce)");
    let w=0,h=0,frame=0,visible=true,mouse=null,start=performance.now();
    function resize(){const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio,2);w=r.width;h=r.height;canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);}
    function pointer(e){const r=canvas.getBoundingClientRect();mouse={x:e.clientX-r.left,y:e.clientY-r.top};wake();}
    function clear(){mouse=null;wake();}
    function draw(t){
      frame=0;
      if(!visible||document.hidden)return;
      ctx.clearRect(0,0,w,h);
      const seconds=motion.matches?7.6:Math.max(0,(t-start)/1000);
      const clamp=n=>Math.max(0,Math.min(1,n));
      const smooth=n=>{const x=clamp(n);return x*x*(3-2*x);};
      const q=smooth((seconds-3.6)/1.5),r=smooth((seconds-6.1)/1.5);
      const angle=(q-r)*Math.PI/2;
      const s=Math.min(w,h)*.76*(1-.27*r),k=clamp(seconds/2.6),e=1-(1-k)**3;
      const textAlpha=smooth((seconds-3.8)/1.2);
      ctx.globalAlpha=textAlpha;
      ctx.fillStyle=document.documentElement.dataset.theme==="dark"?"#82D7D0":"#226E67";
      ctx.font="600 "+Math.min(w*(.15-.025*r),58)+"px system-ui";
      ctx.textAlign="center";ctx.textBaseline="middle";
      ctx.fillText("VEXLOR",w/2,h/2+h*.23*r,w*.88);
      ctx.globalAlpha=1;
      for(const p of points){
        const px=p.x*e+Math.cos(p.a)*p.r*(1-e),py=p.y*e+Math.sin(p.a)*p.r*(1-e);
        const perspective=1/(1+px*Math.sin(angle)*.6);
        let x=w/2+s*px*Math.cos(angle)*perspective,y=h/2-h*.15*r+s*py*perspective;
        if(!motion.matches&&mouse){const dx=x-mouse.x,dy=y-mouse.y,d=Math.hypot(dx,dy);if(d>0&&d<65){x+=dx/d*(65-d)*.42;y+=dy/d*(65-d)*.42;}}
        ctx.fillStyle=p.light?"#82D7D0":"#3E9C94";
        ctx.globalAlpha=(.55+.45*e)*(1-q+r);ctx.beginPath();ctx.arc(x,y,Math.max(.65,s/240*.78),0,Math.PI*2);ctx.fill();
      }
      ctx.globalAlpha=1;
      if(!motion.matches&&(seconds<7.6||mouse))frame=requestAnimationFrame(draw);
    }
    function wake(){if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(draw);}
    const ro=new ResizeObserver(()=>{resize();wake();});ro.observe(canvas);
    const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;wake();});io.observe(canvas);
    const theme=new MutationObserver(wake);theme.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
    canvas.addEventListener("pointermove",pointer);canvas.addEventListener("pointerleave",clear);canvas.addEventListener("pointerup",clear);canvas.addEventListener("pointercancel",clear);
    document.addEventListener("visibilitychange",wake);motion.addEventListener("change",wake);
    resize();wake();
    return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();theme.disconnect();canvas.removeEventListener("pointermove",pointer);canvas.removeEventListener("pointerleave",clear);canvas.removeEventListener("pointerup",clear);canvas.removeEventListener("pointercancel",clear);document.removeEventListener("visibilitychange",wake);motion.removeEventListener("change",wake);};
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:1,touchAction:"pan-y"}} />;
}
import { HERO } from "../data/site.js";
export default function Hero() {
  return <section id="home" className="hero">
    <div className="container vex-hero">
      <div className="vex-copy">
        <p className="vex-eyebrow">VEXLOR / PRECISION IN MOTION</p>
        <h1>{HERO.titleTop}<br/><span>{HERO.titleBrand}</span></h1>
        <p className="vex-description">{HERO.text}</p>
        <div className="hero__cta"><a className="btn btn--primary" href="#service">Explore services <span aria-hidden="true">↗</span></a><a className="btn btn--light" href="#prices">View pricing</a></div>
      </div>
      <div className="vex-art" aria-hidden="true" style={{background:"var(--bg)",borderColor:"var(--line)"}}><div className="vex-grid"/><ParticleMark/><span>01 / DESIGNED FOR PROGRESS</span></div>
    </div>
  </section>;
}