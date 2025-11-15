# How to Use Solid UI Toolkit

## 🚀 Quick Start

### 1. Add Component to Project

```bash
# From solid-ui-toolkit folder
node scripts/add-component.js scrollbar

# Or specify project path
node scripts/add-component.js scrollbar "F:\Workspace\L2_Dev\Luminary_V2\lineage2-toolkit"
```

### 2. Use in Code

```tsx
import { Scrollbar } from "./shared/ui/scrollbar";

function MyComponent() {
  return (
    <Scrollbar direction="horizontal" showArrows={false}>
      <div>Your content here</div>
    </Scrollbar>
  );
}
```

## 📦 Available Components

- **Button** - Versatile button component with multiple variants
- **Modal** - Modal dialog with overlay, focus trap, and keyboard navigation
- **ProgressBar** - Progress indicator with determinate and indeterminate variants
- **Scrollbar** - Custom scrollbar with Material 3 styling
- **Toast** - Notification system with success, error, warning, info variants

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build library
npm run build

# Run Storybook
npm run storybook
```

## 📁 Structure After Adding

```
your-project/
├── src/
│   └── shared/
│       └── ui/
│           └── scrollbar/
│               ├── ui/
│               │   └── scrollbar.tsx
│               ├── lib/
│               │   ├── scrollbar-calculations.ts
│               │   ├── scrollbar-engine.ts
│               │   ├── scrollbar.styles.ts
│               │   ├── use-scrollbar-handlers.ts
│               │   ├── use-scrollbar-logic.ts
│               │   ├── use-scrollbar-observers.ts
│               │   └── use-scrollbar-state.ts
│               ├── model/
│               │   └── types.ts
│               └── index.tsx
```

## 🎨 Styling

Components use Tailwind CSS. Make sure Tailwind is configured in your project.

## 🔄 Updating Components

To update a component, simply run the add command again - files will be overwritten.

## 📝 Adding New Components

1. Create folder in `src/components/ui/your-component/`
2. Add export to `src/index.ts`
3. Update `scripts/add-component.js` if needed
4. Create Storybook story
