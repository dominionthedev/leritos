# Leritos design module

Import `theme.css`, `presentation.css`, and `motion.css` after Tailwind. Theme roles are defined in one place; Sora is the display face, Nunito the reading face, and JetBrains Mono the terminal face. Load those fonts in the application's document head.

`ViewportFlow` owns the page body: it renders the scrolling `main`, resets scroll on navigation when `pageKey` changes, and reveals each top-level content element out of a light blur as it enters the viewport. Revealed and unrevealed content both stay interactive — nothing is hidden from the keyboard or the pointer. It observes top-level content elements, so route copy does not belong in the motion module.

`motion.css` also carries the two shared chrome pieces: the fixed header bar and the corner navigation (`tilde-nav`) whose link line slides out from a tilde on hover or focus.

The reusable module contains no product copy or logo; those live in the site components. Use the shared Button component for controls.
