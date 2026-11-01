# Leritos design module

Import `theme.css`, `presentation.css`, and `motion.css` after Tailwind. Theme roles are defined in one place; Sora is the display face, Nunito the reading face, and JetBrains Mono the terminal face. Load those fonts in the application's document head.

`ViewportFlow` provides repeatable intersection-driven blur/roll transitions, section navigation, and reduced-motion support. Pass a changing `pageKey` to reset the stage on navigation. It observes top-level content elements, so route copy does not belong in the motion module.

The reusable module contains no product copy or logo; those live in the site components. Use the shared Button component for controls.
