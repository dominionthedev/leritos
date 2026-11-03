import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function ViewportFlow({children, pageKey}: {children:ReactNode;pageKey:string}) {
  const main = useRef<HTMLElement>(null);
  const [position,setPosition] = useState({index:0,total:1});
  useEffect(()=>{
    const root=main.current;
    if(!root) return;
    root.scrollTop=0;
    let observer: IntersectionObserver | undefined;
    let frame=0;
    const install=()=>{
      observer?.disconnect();
      const stages=Array.from(root.children).filter((el):el is HTMLElement=>el instanceof HTMLElement);
      root.classList.add('viewport-motion');
      setPosition({index:0,total:stages.length});
      observer=new IntersectionObserver(entries=>{
        for(const entry of entries){
          const element=entry.target as HTMLElement;
          element.dataset['stage']=entry.isIntersecting?'visible':'hidden';
          element.inert=!entry.isIntersecting;
        }
      },{root,threshold:0,rootMargin:"0px 0px -8% 0px"});
      for(const stage of stages){stage.dataset['stage']='hidden';observer.observe(stage);}
    };
    frame=requestAnimationFrame(install);
    const mutation=new MutationObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(install);});
    mutation.observe(root,{childList:true});
    const onScroll=()=>{
      const stages=Array.from(root.children);
      const rootTop=root.getBoundingClientRect().top;
      let nearest=0, distance=Infinity;
      stages.forEach((s,i)=>{const d=Math.abs(s.getBoundingClientRect().top-rootTop-85);if(d<distance){nearest=i;distance=d;}});
      setPosition({index:nearest,total:stages.length});
    };
    root.addEventListener('scroll',onScroll,{passive:true});
    return ()=>{cancelAnimationFrame(frame);observer?.disconnect();mutation.disconnect();root.removeEventListener('scroll',onScroll);};
  },[pageKey]);
  function move(direction:number){
    const root=main.current;
    if(!root)return;
    const target=root.children[position.index+direction];
    if(target instanceof HTMLElement){target.inert=false;target.dataset['stage']='visible';target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
  }
  return <><main ref={main} className="site-main" id="main-content">{children}</main><div className="stage-navigation" aria-label="Page sections"><Button size="icon" variant="ghost" aria-label="Previous section" disabled={position.index===0} onClick={()=>move(-1)}><ChevronUp/></Button><span>{String(position.index+1).padStart(2,'0')} / {String(position.total).padStart(2,'0')}</span><Button size="icon" variant="ghost" aria-label="Next section" disabled={position.index>=position.total-1} onClick={()=>move(1)}><ChevronDown/></Button></div></>;
}
