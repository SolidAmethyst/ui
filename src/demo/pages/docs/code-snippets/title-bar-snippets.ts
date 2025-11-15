/**
 * Code examples for TitleBar component documentation
 * Separated from the main docs file for better readability and maintainability
 */

export const titleBarSnippets = {
  imports: `import { TitleBar } from '@sapphiresolid/ui'`,

  usage: {
    basicUsage: `<TitleBar
  title="Physics Engine Demo"
  onBurgerClick={() => console.log('Menu')}
  onThemeToggle={() => toggleTheme()}
  onDebugClick={() => console.log('Debug')}
  onPinClick={() => setPinned(!pinned)}
  onSettingsClick={() => console.log('Settings')}
  onMinimizeClick={() => console.log('Minimize')}
  onMaximizeClick={() => setMaximized(!maximized)}
  onCloseClick={() => console.log('Close')}
  maximized={maximized}
  pinned={pinned}
/>`,

    minimalExample: `<TitleBar title="My Application" />`,

    windowControls: `<TitleBar
  title="Window Title"
  onMinimizeClick={() => handleMinimize()}
  onMaximizeClick={() => handleMaximize()}
  onCloseClick={() => handleClose()}
  maximized={maximized}
/>`,
  },
} as const;
