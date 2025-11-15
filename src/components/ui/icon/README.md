# Icon Component

Material 3 SVG icon component using Google Material Symbols. Uses SVG instead of font icons for better performance, customization, and accessibility.

## Features

- ✅ SVG-based icons (no font loading required)
- ✅ Material 3 design (rounded, sharp, outlined variants)
- ✅ Filled and outlined styles
- ✅ Customizable size and color
- ✅ Automatic fallback to font icons if SVG fails to load
- ✅ Fully accessible (ARIA support)
- ✅ TypeScript typed

## Usage

### Basic Usage

```tsx
import { Icon } from "@sapphiresolid/ui";

function MyComponent() {
  return (
    <div>
      <Icon name="home" />
      <Icon name="settings" size={32} />
      <Icon name="close" color="#ff0000" />
    </div>
  );
}
```

### With Variants

```tsx
<Icon name="home" variant="rounded" />  {/* Default */}
<Icon name="home" variant="sharp" />
<Icon name="home" variant="outlined" />
```

### Filled Icons

```tsx
<Icon name="favorite" filled={true} />
```

### Custom Size

```tsx
<Icon name="settings" size={48} />
<Icon name="close" size="2rem" />
```

## Props

| Prop          | Type                                 | Required | Default        | Description                      |
| ------------- | ------------------------------------ | -------- | -------------- | -------------------------------- |
| `name`        | `string`                             | ✅       | -              | Material Symbols icon name       |
| `size`        | `number \| string`                   | ❌       | `24`           | Icon size in pixels or CSS value |
| `color`       | `string`                             | ❌       | `currentColor` | Icon color                       |
| `variant`     | `'rounded' \| 'sharp' \| 'outlined'` | ❌       | `'rounded'`    | Icon variant                     |
| `filled`      | `boolean`                            | ❌       | `false`        | Whether icon is filled           |
| `class`       | `string`                             | ❌       | -              | Additional CSS class names       |
| `style`       | `JSX.CSSProperties`                  | ❌       | -              | Inline CSS styles                |
| `aria-label`  | `string`                             | ❌       | -              | ARIA label for accessibility     |
| `aria-hidden` | `boolean`                            | ❌       | `true`         | Whether icon is decorative       |

## Migration from Font Icons

### Before (Font Icon)

```tsx
<span class="material-symbols-rounded" style={{ "font-size": "24px" }}>
  home
</span>
```

### After (SVG Icon)

```tsx
<Icon name="home" size={24} />
```

## Benefits

1. **Performance**: No font loading required, faster initial render
2. **Customization**: Easy to change color, size, and style
3. **Accessibility**: Better screen reader support
4. **Scalability**: SVG scales perfectly at any size
5. **Tree-shaking**: Only used icons are loaded

## Fallback

If SVG fails to load (network issue, CDN down), the component automatically falls back to the Material Symbols font icon, ensuring your UI always displays correctly.

## Examples

### Button with Icon

```tsx
<Button>
  <Icon name="save" size={20} />
  Save
</Button>
```

### Icon-only Button

```tsx
<Button variant="small">
  <Icon name="close" size={18} />
</Button>
```

### Colored Icons

```tsx
<Icon name="check_circle" color="green" />
<Icon name="error" color="red" />
<Icon name="warning" color="orange" />
```

---

**Note**: The component loads SVG icons from Google Material Symbols CDN. For offline use or better performance, consider bundling SVG files locally.
