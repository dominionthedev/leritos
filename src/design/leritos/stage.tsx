import { useEffect, useRef, useState, type ReactNode } from 'react';

type StageTag = 'section' | 'header' | 'div';

/**
 * A block of content that reveals itself as it enters the page body's viewport.
 *
 * The stage state is rendered by React (`data-stage`), never written into the DOM
 * from outside, so the markup stays identical between server render and hydration.
 * The reveal itself lives in motion.css; hidden content stays interactive.
 */
export function Stage({as='section', className, children}: {as?: StageTag; className?: string; children: ReactNode}) {
  const el = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    const node=el.current;
    if(!node) return;
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries) setVisible(entry.isIntersecting);
    },{root:node.closest('.site-main'),threshold:0,rootMargin:'0px 0px -8% 0px'});
    observer.observe(node);
    return ()=>observer.disconnect();
  },[]);
  const Tag = as as 'section';
  return <Tag ref={el} className={className} data-stage={visible?'visible':'hidden'}>{children}</Tag>;
}
