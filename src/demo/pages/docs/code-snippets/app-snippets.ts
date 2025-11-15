/**
 * Code examples for App component documentation
 * Separated from the main docs file for better readability and maintainability
 */

export const appSnippets = {
  imports: `import { App } from '@sapphiresolid/ui'
import type { SidebarItem } from '@sapphiresolid/ui'`,

  usage: {
    basicUsage: `<App toggleTheme={toggleTheme} sidebarItems={sidebarItems}>
  {/* Your content here */}
</App>`,

    adaptiveLayout: `<App toggleTheme={toggleTheme} sidebarItems={sidebarItems}>
  <div style={{ padding: '24px', overflow: 'auto' }}>
    <h1>Welcome to My Application</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {/* Your cards here */}
    </div>
  </div>
</App>`,

    overlayMode: `<App toggleTheme={toggleTheme} sidebarItems={sidebarItems} overlayMode={true}>
  <div style={{ padding: '24px', overflow: 'auto' }}>
    <h1>Welcome to My Application</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {/* Your cards here */}
    </div>
  </div>
</App>`,
  },

  customization: `@layer base {
  :root {
    /* App component uses theme colors for layout */
    /* Top navigation uses --top-nav-background */
    /* Page background uses --background */
    --app-border-radius: 8px;
    --app-transition-duration: 200ms;
  }

  [data-theme="dark"] {
    /* App automatically adapts to dark theme */
    --app-border-radius: 8px;
  }
}`,
} as const;
