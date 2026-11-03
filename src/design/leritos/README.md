# Leritos design module

Import `theme.css`, `presentation.css`, and `motion.css` after Tailwind. Theme roles are defined in one place; Sora is the display face, Nunito the reading face, and JetBrains Mono the terminal face. Load those fonts in the application's document head.

`ViewportFlow` owns the page body: it renders the scrolling `main`, resets scroll on navigation when `pageKey` changes, and adds the class that switches reveal motion on once the app has hydrated. Without that class the page reads as plain, unanimated content.

`Stage` is how content joins the reveal. Wrap a top-level block in `<Stage>` (or `<Stage as="header">` / `as="div">`) and it fades up out of a light blur as it enters the viewport, and back out as it leaves. The stage state is a rendered attribute, so server markup and hydration agree, and hidden content stays fully interactive — reachable by keyboard, pointer, and screen reader.

`motion.css` also carries the two shared chrome pieces: the fixed header bar and the corner navigation (`tilde-nav`) whose link line slides out from a tilde on hover or focus.

The reusable module contains no product copy or logo; those live in the site components. Use the shared Button component for controls.
