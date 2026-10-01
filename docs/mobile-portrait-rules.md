# Mobile portrait rules

These rules control layout on **phones held upright**. Apply them to every page and component you build or change.

## When they apply

Only when the viewport matches `(max-width: 600px) and (orientation: portrait)`. Landscape phones, tablets and
desktops are not affected; keep their normal layout.

## The rules

### 1. Text is centered

All text is center-aligned: headings, eyebrows/kickers, paragraphs, intro copy, back links and small notes.

**Except** these, which keep their normal alignment:

| Exception | Examples |
| --- | --- |
| Bulleted or numbered lists | Amenity lists, feature lists, step-by-step instructions |
| Text inside a styled container | Cards, panels, tiles, forms, boxes with a background colour, border or shadow |
| Specially treated text | Accordions/FAQs, labels or badges laid over images, carousel/slideshow captions |
| Navigation menus | The mobile side panel / drawer menu |

### 2. Buttons are centered

Every button sits centered horizontally. "Button" includes links styled as buttons.

- **A button on its own** (nothing next to it on the same row): **80vw wide**, label centered.
- **Two or more buttons side by side:** spread across the **full width** (`justify-content: space-between`),
  first at the left edge, last at the right edge.
  - If they don't fit on one row, **shorten the labels on mobile portrait** (e.g. "Browse more stays" →
    "More stays") rather than letting them wrap. Keep the full label for screen readers if meaning changes.
- **Buttons inside a styled container** (card, form, panel) follow that container's layout instead; don't force
  80vw, which can overflow the container.

## Implementation

One media query in the global stylesheet, plus opt-in data attributes. Add this CSS once per project:

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

| Attribute | Put it on | Effect on mobile portrait |
| --- | --- | --- |
| `data-m-center` | A wrapper around headings and plain text | Centers its text and its direct children |
| `data-m-btn` | A standalone button or button-styled link | 80vw wide, centered, label centered |
| `data-m-row` | The flex row that holds side-by-side buttons | Full width, buttons spread edge to edge |

In JSX they're boolean props: `<div data-m-center>`, `<a data-m-btn>`, `<div data-m-row>`.

## How to apply it correctly

- **`text-align` is inherited.** Never put `data-m-center` on an element that *contains* an exception (a card,
  form, FAQ, list or menu), or that content gets centered too. Wrap just the heading/text group instead:

  ```jsx
  {/* Good: only the intro is centered; the cards below keep their alignment */}
  <div data-m-center>
    <h1>Contact us</h1>
    <p>We'd love to hear from you…</p>
  </div>
  <div className="grid">{cards}</div>
  ```

- **Children with a max width** (e.g. `max-w-[54ch]` paragraphs) are centered by the `margin: auto` rule, so
  put `data-m-center` on their parent, not on the element itself.
- **`data-m-btn` needs a flex button** (`display: flex` or `inline-flex`) for its label to center. Buttons
  built with Tailwind or shadcn usually already are.
- **Don't double up:** a button inside a `data-m-row` must not also get `data-m-btn`.
- **Check it:** test at 390×844 (portrait) and 844×390 (landscape). Portrait should follow these rules;
  landscape should look exactly as it did before.
