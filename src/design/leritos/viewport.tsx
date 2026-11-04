import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Owns the page body: the scrolling element, the scroll reset on navigation, and
 * the gate class that switches reveal motion on once the app has taken over.
 *
 * Content blocks opt into the reveal themselves with <Stage>, which keeps every
 * rendered attribute under React's control. Without this class the page reads as
 * plain, unanimated content — which is what a browser without JavaScript gets.
 */
export function ViewportFlow({children, pageKey}: {children:ReactNode;pageKey:string}) {
  const main = useRef<HTMLElement>(null);
  useEffect(()=>{
    const root=main.current;
    if(!root) return;
    // The body keeps its own scroll across navigations, and CSS makes scrolling
    // smooth — which would turn this reset into an animation that the incoming
    // page's layout cancels. Force this one jump to land immediately.
    const behavior=root.style.scrollBehavior;
    root.style.scrollBehavior='auto';
    root.scrollTop=0;
    root.style.scrollBehavior=behavior;
    root.classList.add('viewport-motion');
  },[pageKey]);
  return <main ref={main} className="site-main" id="main-content">{children}</main>;
}
