import { Link, useRouterState } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { ArrowUpRight, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/leritos.svg.asset.json';

const nav = [{to:'/',label:'Overview'}, {to:'/workspace',label:'Workspace'}, {to:'/reactivity',label:'Reactivity'}, {to:'/ecosystem',label:'Ecosystem'}, {to:'/vision',label:'The vision'}] as const;
export function SiteShell({children}: {children: ReactNode}) {
  const [open,setOpen] = useState(false);
  const pathname = useRouterState({select: s => s.location.pathname});
  return <div className="site-shell">
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand" aria-label="Leritos home"><img src={logo.url} alt=""/><span>leritos<span className="brand-dot">.</span></span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">{nav.map(n => <Link key={n.to} to={n.to} className={pathname === n.to ? 'nav-link active' : 'nav-link'}>{n.label}</Link>)}</nav>
        <span className="development-label"><span/> In development</span>
        <Button variant="ghost" size="icon" className="mobile-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">{nav.map(n => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className={pathname === n.to ? 'nav-link active' : 'nav-link'}>{n.label}<ArrowUpRight size={15}/></Link>)}</nav>}
    </header>
    <main>{children}</main>
    <footer className="site-footer"><div className="content-width footer-top"><Link to="/" className="brand"><img src={logo.url} alt=""/>leritos.</Link><p>An environment. Not just an emulator.</p><Button asChild variant="outline"><Link to="/vision">Meet the vision <ArrowUpRight/></Link></Button></div><div className="content-width footer-bottom"><span>A project by <strong>Leraniode</strong></span><span>Designed to be yours.</span><span>Concept in development · 2026</span></div></footer>
  </div>;
}
export function Eyebrow({children}: {children: ReactNode}) {return <p className="eyebrow"><span className="eyebrow-marker"/>{children}</p>;}
export function PageIntro({number,title,accent,description}: {number:string;title:string;accent:string;description:string}) {
  return <header className="page-intro content-width"><Eyebrow>{number} / THE AUGMENTED TERMINAL DESKTOP</Eyebrow><h1>{title}<br/><span className="text-accent">{accent}</span></h1><p className="intro-description">{description}</p></header>;
}
export function NextPage({to,label,description}: {to: '/workspace'|'/reactivity'|'/ecosystem'|'/vision';label:string;description:string}) {
  return <div className="next-section content-width"><div><Eyebrow>KEEP EXPLORING</Eyebrow><h2>{description}</h2></div><Button asChild variant="outline" size="lg"><Link to={to}>{label}<ArrowRight/></Link></Button></div>;
}
