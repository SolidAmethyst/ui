# Theming Guide

## Color System

The library uses a professional color system based on CSS custom properties (CSS variables) that can be easily customized in your application.

### Primary Color (Sapphire Blue)

The library uses **Sapphire Blue** as the primary brand color:

- **Light theme**: `hsl(217, 85%, 50%)` - Deep sapphire blue
- **Dark theme**: `hsl(217, 85%, 60%)` - Lighter sapphire for better contrast

### Color Variables

All colors are defined as CSS custom properties in `globals.css`:

```css
:root {
  --primary: 217 85% 50%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --destructive: 0 84.2% 60.2%;
  /* ... more colors */
}

[data-theme='dark'] {
  --primary: 217 85% 60%;
  --primary-foreground: 222.2 84% 4.9%;
  /* ... dark theme overrides */
}
```

## Customizing Colors

### Method 1: Override CSS Variables

Override the CSS variables in your application's stylesheet:

```css
:root {
  /* Change primary color to your brand color */
  --primary: 250 95% 58%; /* Indigo example */
  
  /* Or use any color format */
  --primary: 217 85% 50%; /* HSL format (recommended) */
}

[data-theme='dark'] {
  --primary: 250 95% 65%; /* Lighter for dark theme */
}
```

### Method 2: Component-Level Overrides

Override specific component colors:

```css
/* Customize drag-drop colors */
:root {
  --drag-drop-indicator-color-light: 250 95% 58%;
  --drag-drop-indicator-color-dark: 250 95% 65%;
}
```

## Theme Switching

The library supports theme switching via the `data-theme` attribute:

```html
<html data-theme="dark">
  <!-- Dark theme active -->
</html>
```

Or via CSS class:

```html
<html class="dark">
  <!-- Dark theme active -->
</html>
```

## Using Colors in Components

All components use CSS variables, so they automatically adapt to your custom colors:

```tsx
import { DragDrop } from '@sapphiresolid/ui'

// Component automatically uses --primary color
<DragDrop items={items} />
```

## Color Palette

### Primary Colors
- `--primary`: Main brand color (Sapphire Blue)
- `--primary-foreground`: Text color on primary background

### Semantic Colors
- `--destructive`: Error/danger actions (Red)
- `--success`: Success states (Green) - if defined
- `--warning`: Warning states (Yellow/Orange) - if defined
- `--info`: Information states (Blue) - if defined

### Neutral Colors
- `--background`: Page background
- `--foreground`: Main text color
- `--muted`: Muted text/backgrounds
- `--border`: Border colors
- `--input`: Input field colors

## Best Practices

1. **Use HSL format** for colors - easier to adjust lightness/saturation
2. **Maintain contrast ratios** - ensure text is readable (WCAG AA minimum)
3. **Test both themes** - verify colors work in light and dark modes
4. **Use CSS variables** - never hardcode colors in components

## Example: Custom Brand Colors

```css
/* Your brand uses purple instead of sapphire */
:root {
  --primary: 270 80% 55%;
  --primary-foreground: 0 0% 100%;
}

[data-theme='dark'] {
  --primary: 270 80% 65%;
  --primary-foreground: 0 0% 100%;
}
```

All components will automatically use your custom primary color!

