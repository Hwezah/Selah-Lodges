# Mobile portrait rules

Applies to phones held upright: `(max-width: 600px) and (orientation: portrait)`.
Follow these on every page and component you build or change.

## Buttons

- Center all buttons horizontally.
- A button on its own (not side by side with another): width `80vw`, content centered.
- Buttons side by side in a row: `justify-content: space-between`, spread wide apart across the full width.

## Text

- Center all text.
- **Exceptions** (keep their normal alignment):
  - Bulleted or numbered lists
  - Text inside styled containers (cards, panels, tiles, boxes with backgrounds or borders)
  - Specially treated text (accordions/FAQs, labels overlaid on images, captions in carousels)
  - The mobile side panel / navigation menu

## Implementation

Use one media query plus opt-in data attributes. Put this in the global stylesheet once:

```css
@media (max-width: 600px) and (orientation: portrait) {
  [data-m-center] {
    text-align: center !important;
    align-items: center !important;
    justify-content: center !important;
  }
  [data-m-center] > * {
    margin-left: auto !important;
    margin-right: auto !important;
    align-self: center !important;
  }
  [data-m-btn] {
    width: 80vw !important;
    justify-content: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  [data-m-row] {
    justify-content: space-between !important;
    width: 100% !important;
  }
}
```

Then opt elements in:

| Attribute | Put it on |
| --- | --- |
| `data-m-center` | Wrappers whose text and children should center |
| `data-m-btn` | Standalone buttons (and button-styled links) |
| `data-m-row` | Rows of side-by-side buttons |

Notes:

- Don't add `data-m-center` to the exceptions above (lists, cards/panels, FAQs, image overlays, carousel
  captions, the mobile menu). Add it to the section wrapper, not inside those containers.
- A standalone button needs `display: flex` / `inline-flex` for `justify-content: center` to center its
  content, which is the usual case for buttons styled with Tailwind or shadcn.
- In React/JSX the attributes are written as boolean props: `<div data-m-center>`, `<a data-m-btn>`.
