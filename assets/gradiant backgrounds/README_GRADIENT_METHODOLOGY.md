# Seamless Grainy Gradient Methodology

How to create organic, drifting, and seamless gradient backgrounds across multiple website sections.

## 1. The "Continuous Canvas" Strategy (Best for seamlessness)
The most effective way to completely eliminate "seams" or "lines" between sections is to **not** apply backgrounds to the sections themselves.

Instead, create a **single fixed background layer** that sits behind everything.

### How it works:
1.  **Wrapper**: Create a `div` with `position: fixed` (or `absolute` if horizontal scrolling) that spans the entire viewport (`100vw`, `100vh`).
2.  **Layers**: Inside this wrapper, place your gradient "blobs" (divs).
3.  **Drift**: Position these blobs absolutely (e.g., `top: -20%`, `left: 50%`) and let them overlap significantly.
4.  **Content**: Your content sections sit *on top* of this wrapper and represent just the text/images. They should have `background: transparent`.

**Why:** Since the background is one unified element, there is mathematically 0% chance of a mismatch.

---

## 2. The "Bridge Color" Strategy (If using separate blocks)
If you *must* have separate background styles for each block (e.g., Block 1 is blue, Block 2 is yellow), you must follow the **Bridge Rule**.

**Rule:** The **End Color** of Block A must be identical to the **Start Color** of Block B.

### Example (CSS Linear Gradient):
```css
/* Block 1 (Left) */
.section-1 {
  background: linear-gradient(to right, Blue, Cyan); 
  /* Ends in Cyan */
}

/* Block 2 (Right) */
.section-2 {
  background: linear-gradient(to right, Cyan, Yellow); 
  /* MUST start in Cyan */
}
```

---

## 3. Designing for "Drift" (Softness)
To avoid the "brutal" or "blocky" look, follow these styling tips:

*   **Use `radial-gradient` instead of `linear-gradient`**: Linear gradients create hard directional lines. Radial gradients imitate light and clouds.
*   **Use `vmax` units**: Size your gradients using `vmax` (e.g., `width: 80vmax`). This ensures the blob is huge regardless of screen size.
*   **Low Opacity & Blending**: Give your blobs `opacity: 0.6` to `0.8` and use `mix-blend-mode: overlay` or `screen`. This makes them "mix" like watercolor paints rather than stacking like paper.

## 4. The Noise Texture
Grain needs to be consistent. Do not apply noise to each section individually, or the grain pattern will "jump" as you scroll.

**Technique:**
Apply a single noise `.png` or SVG filter to a `::after` pseudo-element on the **body** or the **main wrapper** with `position: fixed` and `pointer-events: none`.
