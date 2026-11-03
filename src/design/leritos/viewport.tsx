import { useEffect, useRef, type ReactNode } from 'react';

export function ViewportFlow({children, pageKey}: {children:ReactNode;pageKey:string}) {
  const main = useRef<HTMLElement>(null);
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
      observer=new IntersectionObserver(entries=>{
        for(const entry of entries){
          (entry.target as HTMLElement).dataset['stage']=entry.isIntersecting?'visible':'hidden';
        }
      },{root,threshold:0,rootMargin:"0px 0px -8% 0px"});
      for(const stage of stages){stage.dataset['stage']='hidden';observer.observe(stage);}
    };
    frame=requestAnimationFrame(install);
    const mutation=new MutationObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(install);});
    mutation.observe(root,{childList:true});
    return ()=>{cancelAnimationFrame(frame);observer?.disconnect();mutation.disconnect();};
  },[pageKey]);
  return <main ref={main} className="site-main" id="main-content">{children}</main>;
}
