# Solid UI Toolkit

Beautiful Solid.js components built with Tailwind CSS. Copy and paste components into your apps.

## 🚀 Quick Start

### Add a component to your project

```bash
# From the toolkit directory
node scripts/add-component.js scrollbar

# Or specify target project
node scripts/add-component.js scrollbar /path/to/your/project
```

### List available components

```bash
node scripts/add-component.js list
```

## 📦 Available Components

- **Scrollbar** - Customizable scrollbar with Material 3 styling

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run Storybook
npm run storybook
```

## 📁 Project Structure

```
src/
├── components/ui/          # UI components
│   └── scrollbar/         # Scrollbar component
├── lib/                   # Utility functions
├── types/                 # TypeScript types
└── index.ts              # Main entry point
```

## 🎨 Styling

Components use Tailwind CSS with CSS variables for theming. Make sure to include the Tailwind config in your project.

## 📝 Usage

After adding a component, import it in your project:

```tsx
import { Scrollbar } from "./shared/ui/scrollbar";

function App() {
  return (
    <Scrollbar direction="horizontal" showArrows={false}>
      <div>Your content here</div>
    </Scrollbar>
  );
}
```

## 🤝 Contributing

1. Add your component to `src/components/ui/`
2. Export it from `src/index.ts`
3. Update this README
4. Test with Storybook

## 📄 License

MIT
