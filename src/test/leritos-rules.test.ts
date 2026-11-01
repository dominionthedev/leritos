import { describe, expect, it } from 'vitest';
import { TILING_STYLES, EQUAL_DEFAULT_PANES, SCROLLING_VISIBLE_PANES } from '@/components/leritos/content';
describe('Leritos workspace direction',()=>{
 it('retains four distinct tiling styles including Flex and Loose/Float',()=>{expect([...TILING_STYLES].sort()).toEqual(['Equal','Flex','Loose/Float','Scrolling']);});
 it('defaults Equal to four panes',()=>{expect(EQUAL_DEFAULT_PANES).toBe(4);});
 it('shows two splits in the scrolling concept',()=>{expect(SCROLLING_VISIBLE_PANES).toBe(2);});
});
