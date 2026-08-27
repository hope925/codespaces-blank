---
name: Bold Heritage
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#cfc4c5'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#988e90'
  outline-variant: '#4c4546'
  surface-tint: '#c6c6c6'
  primary: '#c6c6c6'
  on-primary: '#303030'
  primary-container: '#000000'
  on-primary-container: '#757575'
  inverse-primary: '#5e5e5e'
  secondary: '#62df74'
  on-secondary: '#003910'
  secondary-container: '#1ea644'
  on-secondary-container: '#00320d'
  tertiary: '#ecc200'
  on-tertiary: '#3b2f00'
  tertiary-container: '#000000'
  on-tertiary-container: '#8d7300'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#7ffc8d'
  secondary-fixed-dim: '#62df74'
  on-secondary-fixed: '#002107'
  on-secondary-fixed-variant: '#00531b'
  tertiary-fixed: '#ffe07d'
  tertiary-fixed-dim: '#ecc200'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#564500'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
  surface-black: '#000000'
  jamaican-green: '#009b3a'
  jamaican-gold: '#fed100'
  pure-white: '#FFFFFF'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-sm:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Sora
    fontSize: 12px
    fontWeight: '800'
    lineHeight: 16px
    letterSpacing: 0.1em
  status-lg:
    fontFamily: Sora
    fontSize: 20px
    fontWeight: '800'
    lineHeight: 24px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system is defined by a **Bold Jamaican Heritage** theme, shifting from institutional caution to a high-impact, rhythmic, and confident aesthetic. The brand personality is **vibrant, energetic, and unapologetic**, evoking a sense of national pride and modern resilience. 

The visual style is a fusion of **Modern Minimalism and High-Contrast Color Blocking**. It utilizes large areas of saturated color to create a powerful visual hierarchy that is impossible to ignore. By leveraging a dark-mode-first approach with sharp black backgrounds, the secondary green and tertiary gold colors achieve maximum luminescence. This style is designed for high-visibility environments and users who demand immediate clarity through strong, graphic interfaces.

## Colors

The palette is a tribute to the Jamaican flag, utilizing a high-impact triad. **Black (#000000)** serves as the primary canvas, providing a deep, sophisticated base that allows other colors to pop. **Green (#009b3a)** is the secondary color, used for growth, success, and navigational elements. **Gold (#fed100)** is the tertiary accent, reserved for critical information, warnings, and high-priority highlights.

**Text Contrast Strategy:**
- All primary body text on black backgrounds must be **Pure White (#FFFFFF)**.
- Large headlines and status labels may use **Jamaican Gold** for emphasis.
- On Green backgrounds, text must be **Black** or **Pure White** to maintain a minimum 7:1 contrast ratio.
- Backgrounds are strictly dark, reducing eye strain and increasing the perceived brightness of the brand colors.

## Typography

This design system uses a dual-font strategy to balance character with readability. **Sora** is used for headlines and labels; its geometric construction and unique ink traps provide a futuristic, bold look that matches the Jamaican theme. **Hanken Grotesk** is used for body copy to ensure clarity and professional utility.

Typography follows a "loud" hierarchy. Headlines are oversized and tightly tracked to feel like editorial posters. The **label-caps** style is used for categorization, always set in uppercase with wide tracking to contrast against the dense headlines. Mobile scales have been significantly boosted to ensure the "high-impact" feel remains consistent on smaller screens.

## Layout & Spacing

The layout philosophy is based on a **Fixed Grid with Generous Margins** to create a focused, premium feel. 

- **Desktop:** A 12-column grid centered in the viewport with a 1440px max-width. Large 64px margins create a frame that contains the high-contrast content.
- **Mobile:** A 4-column grid with 20px margins.

The spacing rhythm is aggressive. Instead of tight clusters, we use **stack-md (24px)** as the default vertical rhythm to allow the color-blocked elements room to breathe. Components should use the full width of their grid containers to maximize the impact of the primary and secondary colors.

## Elevation & Depth

This design system rejects traditional shadows in favor of **Tonal Layers** and **Hard Outlines**.

- **Surface Tiers:** The base layer is pure black (#000000). Secondary containers use a slightly lighter "Off-Black" (#121212) or full-bleed Green/Gold blocks to show depth.
- **Bold Borders:** Interactive elements use 2px solid borders in Green or Gold instead of shadows to define their boundaries.
- **Zero Transparency:** Avoid blurs or glassmorphism. Every element is solid and opaque to reinforce the "bold" and "clean" aesthetic.

## Shapes

The shape language is **Soft (0.25rem)**, moving away from the previous roundedness to a sharper, more architectural feel. 

- **Buttons & Inputs:** Use the 4px (0.25rem) radius to feel precise and modern.
- **Cards & Modules:** Maintain 4px radius or 0px (sharp) for a more brutalist, high-impact look when used in full-bleed sections.
- **Status Chips:** Use a 2px radius or sharp corners to distinguish them as technical labels.

## Components

- **Primary Buttons:** Solid Gold (#fed100) with Black text. These are the loudest elements on the screen. On hover, the background shifts to Green (#009b3a).
- **Secondary Buttons:** Ghost style with a 2px Green border and White text.
- **Cards:** Defined by high-contrast color blocking. A card may have a solid Green header with Black text, followed by a Black body with White text.
- **Input Fields:** Black background with a 2px White border. On focus, the border turns Gold.
- **Alert Chips:** Large, bold labels using Sora. "ACTIVE" or "LIVE" labels should be Gold on Black to ensure they command attention.
- **Lists:** Separated by solid 1px Green lines. Each list item should have ample padding (stack-sm) to ensure high touchability and a clean, spacious look.
- **Checkboxes & Radios:** Large 24px targets with a 2px Gold border when selected.