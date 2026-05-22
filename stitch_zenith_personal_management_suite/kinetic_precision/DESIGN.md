---
name: Kinetic Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  container-padding: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is engineered for high-performance personal management, merging the analytical rigor of a data dashboard with the serene clarity of a wellness app. The brand personality is **disciplined, unobtrusive, and empowering**. It targets "power-users" of life—individuals who find peace in organization and clarity in data.

The visual style is a **refined Corporate Minimalism**. It prioritizes high-density information without sacrificing aesthetic breathing room. By utilizing a "Content-First" philosophy, the UI recedes into the background, allowing the user's data (macro progress, task deadlines, financial trends) to become the primary visual driver. The emotional response is one of **calm control and frictionless productivity**.

## Colors
The palette is divided into functional zones to aid instant recognition.
- **Base Neutrals:** Uses a Slate/Zinc scale to create a sophisticated, "app-chrome" feel that doesn't compete with data visualizations.
- **Macro Palette:** Specific high-chroma colors reserved strictly for nutritional tracking to build muscle memory during rapid logging.
- **System Palette:** Indigo serves as the primary brand anchor for navigation and primary actions, while semantic colors (Emerald, Rose, Amber) provide immediate feedback for task and financial statuses.

The default mode is **Light**, utilizing subtle off-white backgrounds (#F8FAFC) to reduce eye strain during long sessions of data entry.

## Typography
The typography system leverages **Geist** for its technical precision and modern geometric construction, ensuring high legibility at small sizes. 
- **Numerical Data:** For financial figures and macro counts, use **JetBrains Mono** to ensure tabular alignment and a "data-centric" aesthetic.
- **Hierarchy:** Use tight letter spacing on larger headlines to maintain a "designed" feel. 
- **Density:** Favor `body-sm` (13px) for secondary meta-data in list views to maximize vertical space without compromising readability.

## Layout & Spacing
The layout follows a **4px baseline grid** to achieve a high-density, mathematical rhythm.
- **Desktop:** A 12-column fluid grid with 24px gutters. Use "Side-sheet" patterns for detail views to keep the main list in context.
- **Mobile:** A single-column layout with 16px horizontal margins. 
- **Density:** Components should utilize a "Compact" vs "Comfortable" toggle. Compact mode reduces internal padding by 4px across all elements to accommodate power-users managing large task lists or complex meal logs.

## Elevation & Depth
Depth is created through **Tonal Layering** rather than heavy shadows. 
- **Surface 0 (Background):** #F8FAFC.
- **Surface 1 (Cards/Sidebar):** White (#FFFFFF) with a 1px neutral-200 border.
- **Surface 2 (Popovers/Modals):** White with a soft, diffused 15% opacity shadow (0 10px 25px -5px) to indicate high-priority interaction.
- **Glassmorphism:** Use a subtle backdrop-blur (12px) on navigation headers and mobile tab bars to maintain a sense of context while scrolling.

## Shapes
The shape language is **precise and architectural**. 
- Standard components (buttons, inputs) use a 4px radius (`soft`). 
- Larger containers and cards use an 8px radius.
- Progress bars and "pills" for category tags use a fully rounded (pill) radius to provide visual contrast against the otherwise rectangular grid.

## Components
- **Buttons:** Primary buttons use a solid Indigo fill. Secondary buttons utilize a "Ghost" style with a 1px border. All hover states should include a subtle 2px vertical lift.
- **Data Cards:** Content is grouped in bordered white cards. Headlines within cards should use `label-caps` for metadata (e.g., "MEAL TYPE", "DUE DATE").
- **Progress Rings:** Used for macros. Utilize a 12px stroke width with a "rounded" cap. The track should be a 10% opacity version of the macro's color.
- **Heatmaps (Activity/Macros):** 12px x 12px squares with a 2px gap. Follow the GitHub-style 4-step intensity scale using the primary Indigo or Macro Green.
- **Input Fields:** Minimalist design with a focus on focus-states. On focus, the border transitions to Primary Indigo with a 2px soft outer glow.
- **Chips:** Small, low-contrast pills (Background: Neutral-100, Text: Neutral-600) for categorization that don't distract from the primary data.