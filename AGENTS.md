<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## UI architecture
- Keep the reusable visual system in `src/design/leritos`: semantic theme tokens, scoped presentation styles, and viewport motion; page content stays separate so the design can be reused without product copy.
- Use the shared SiteShell for all content routes, with accessible proximity navigation and repeatable viewport transitions; this keeps interaction and motion consistent across pages.
- Interactive terminal examples are illustrative client-side studies, not a terminal engine or published product API; retain clear concept status.
