import { Link, useRouterState } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
import { ViewportFlow } from '@/design/leritos/viewport';
import { ArrowUpRight, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/leritos.svg.asset.json';

const nav = [{to:'/',label:'Overview'}, {to:'/workspace',label:'Workspace'}, {to:'/reactivity',label:'Reactivity'}, {to:'/ecosystem',label:'Ecosystem'}, {to:'/vision',label:'The vision'}] as const;
export function SiteShell({children}: {children: ReactNode}) {
  const [open,setOpen] = useState(false);
  const pathname = useRouterState({select: s => s.location.pathname});
  useEffect(()=>{
    const nearCorner=(event:PointerEvent)=>{if(event.pointerType==='mouse'&&event.clientX>window.innerWidth-160&&event.clientY<90)setOpen(true);};
    const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false);};
    window.addEventListener('pointermove',nearCorner);
    window.addEventListener('keydown',escape);
    return ()=>{window.removeEventListener('pointermove',nearCorner);window.removeEventListener('keydown',escape);};
  },[]);
  const footer=<footer className="site-footer"><div className="content-width footer-top"><Link to="/" className="brand"><img src={logo.url} alt=""/>leritos.</Link><p>An environment. Not just an emulator.</p><Button asChild variant="outline"><Link to="/vision">Meet the vision <ArrowUpRight/></Link></Button></div><div className="content-width footer-bottom"><span>A project by <strong>Leraniode</strong></span><span>Designed to be yours.</span><span>Concept in development · 2026</span></div></footer>;
  return <div className="site-shell">
    <header className="site-header"><div className="site-header-inner"><Link to="/" className="brand" aria-label="Leritos home"><img src={logo.url} alt=""/><span>leritos<span className="brand-dot">.</span></span></Link></div></header>
    <div className={`corner-navigation ${open?'is-open':''}`} onPointerLeave={()=>setOpen(false)} onBlur={(event)=>{if(!event.currentTarget.contains(event.relatedTarget))setOpen(false);}}>
      <Button variant="ghost" size="icon" className="corner-trigger" aria-label="Open navigation" aria-expanded={open} aria-controls="corner-menu" onClick={()=>setOpen(!open)} onFocus={()=>setOpen(true)} title="Navigation"><Menu/></Button>
      <div className="corner-panel" id="corner-menu" inert={!open}><div className="corner-panel-heading"><span>LERITOS / NAVIGATE</span><Button size="icon" variant="ghost" aria-label="Close navigation" onClick={()=>setOpen(false)}><X/></Button></div><nav className="corner-links" aria-label="Main navigation">{nav.map((n,i)=><Link key={n.to} to={n.to} onClick={()=>setOpen(false)} className={pathname===n.to?'nav-link active':'nav-link'}><span>0{i+1}</span>{n.label}<ArrowUpRight size={14}/></Link>)}</nav><div className="corner-panel-status"><span className="live-dot"/>IN DEVELOPMENT · BY LERANIODE</div></div>
    </div>
    <ViewportFlow pageKey={pathname}>{children}{footer}</ViewportFlow>
  </div>;
}
export function Eyebrow({children}: {children: ReactNode}) {return <p className="eyebrow"><span className="eyebrow-marker"/>{children}</p>;}
export function PageIntro({number,title,accent,description}: {number:string;title:string;accent:string;description:string}) {
  return <header className="page-intro content-width"><Eyebrow>{number} / THE AUGMENTED TERMINAL DESKTOP</Eyebrow><h1>{title}<br/><span className="text-accent">{accent}</span></h1><p className="intro-description">{description}</p></header>;
}
export function NextPage({to,label,description}: {to: '/workspace'|'/reactivity'|'/ecosystem'|'/vision';label:string;description:string}) {
  return <div className="next-section content-width"><div><Eyebrow>KEEP EXPLORING</Eyebrow><h2>{description}</h2></div><Button asChild variant="outline" size="lg"><Link to={to}>{label}<ArrowRight/></Link></Button></div>;
}
