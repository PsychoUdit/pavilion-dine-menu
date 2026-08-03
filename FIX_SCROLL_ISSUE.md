# Scroll Fix Summary

## Explanation
The issue was caused by incorrect anchor scrolling when the page navigated to section IDs such as `#menu`, `#visit`, or category anchors like `#soups`. The sticky header at the top of the page was covering the anchored section, and the scroll offset values were inconsistent. The fix standardizes anchor target behavior by using CSS `:target` scroll margin to offset the scroll position by the sticky header height.

This approach is better than inline offsets on every section because:
- It applies consistently to all hash target navigations.
- It avoids duplicate offsets when browser `scroll-padding-top` is also present.
- It keeps anchor behavior correct for both direct URL hashes and internal anchor clicks.

## Cause
- `html { scroll-padding-top: 8.5rem; }` was present in `src/styles.css`.
- Some anchors also had inline `scrollMarginTop` styles in `src/routes/index.tsx`.
- The sticky header height was approximately `106px` (`6.625rem`), not `8.5rem`.
- The combined offsets pushed the target too far down or caused incorrect landing positions.

## Fix
- Removed inline `scrollMarginTop` style from anchor target sections in `src/routes/index.tsx`.
- Removed global `scroll-padding-top` from `html` in `src/styles.css`.
- Added a global `:target { scroll-margin-top: 6.625rem; }` rule in `src/styles.css`.

## Files changed
- `src/routes/index.tsx`
  - Removed `style={{ scrollMarginTop: "8.5rem" }}` from `#menu` section.
  - Removed `style={{ scrollMarginTop: "8.5rem" }}` from category sections.

- `src/styles.css`
  - Removed `scroll-padding-top: 8.5rem;` from `html`.
  - Added `:target { scroll-margin-top: 6.625rem; }`.

## Result
Anchor links now scroll to the correct position below the sticky header, ensuring the section heading is visible and not obscured by the fixed navigation bar.
