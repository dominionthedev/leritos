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

  // The body keeps its own scroll across navigations, and CSS makes scrolling
  // smooth — so this one jump is forced to land immediately.
  function snapToTop() {
    const root=main.current;
    if(!root || root.scrollTop===0) return;
    const behavior=root.style.scrollBehavior;
    root.style.scrollBehavior='auto';
    root.scrollTop=0;
    root.style.scrollBehavior=behavior;
  }

  useEffect(()=>{
    const root=main.current;
    if(!root) return;
    root.classList.add('viewport-motion');
    snapToTop();
    // A page's own content can arrive a beat after navigation (its code loads
    // first), and the browser then puts the old scroll offset back. Snapping
    // again when the content actually lands keeps every page opening at its top.
    const mutation=new MutationObserver(snapToTop);
    mutation.observe(root,{childList:true});
    return ()=>mutation.disconnect();
  },[pageKey]);

  return <main ref={main} className="site-main" id="main-content">{children}</main>;
}
