export const TILING_STYLES = ['Flex', 'Equal', 'Scrolling', 'Loose/Float'] as const;
export type TilingStyle = (typeof TILING_STYLES)[number];
export const EQUAL_DEFAULT_PANES = 4;
export const SCROLLING_VISIBLE_PANES = 2;
export const tilingCopy: Record<TilingStyle, string> = {
  Flex: 'Uneven panes. A deliberate rhythm. Give your editor room and keep the rest within reach.',
  Equal: 'Every pane gets an equal share. Start with four, then configure the count and orientation.',
  Scrolling: 'Two panes in view, a workspace beyond them. Move through a sequence instead of shrinking every tool.',
  'Loose/Float': 'A window-like arrangement. Place panes freely rather than locking them into a grid.',
};
export function pageHead(title: string, description: string) {
  return { meta: [
    { title: `${title} — Leritos` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} — Leritos` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] };
}
