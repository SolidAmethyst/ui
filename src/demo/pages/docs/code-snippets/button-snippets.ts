/**
 * Code examples for Button component documentation
 * Separated from the main docs file for better readability and maintainability
 */

export const buttonSnippets = {
  imports: `import { Button } from '@sapphiresolid/ui'`,

  usage: {
    basicUsage: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>`,

    controlButtons: `<Button icon="menu">Menu</Button>
<Button icon="settings">Settings</Button>
<Button icon="bug_report">Debug</Button>`,

    smallButtons: `<Button
  variant="small"
  icon="settings"
  iconPosition="only"
  title="Settings"
/>`,

    triggerButton: `<Button
  variant="trigger"
  iconPosition="only"
  title="Toggle Sidebar"
  active={isOpen}
  onClick={() => setIsOpen(!isOpen)}
  style={{ width: "28px", height: "28px" }}
/>`,

    playPause: `<Button variant="play-pause" icon="play_arrow" title="Play" />
<Button variant="play-pause" icon="pause" title="Pause" />`,

    windowControls: `<Button
  variant="minimize"
  icon="remove"
  iconPosition="only"
  title="Minimize"
/>
<Button
  variant="maximize"
  iconPosition="only"
  title="Maximize / Restore Down"
/>
<Button
  variant="close"
  icon="close"
  iconPosition="only"
  title="Close"
/>
<Button
  variant="small"
  icon="push_pin"
  iconPosition="only"
  title="Pin"
/>`,

    actionButtons: `<Button variant="back" iconPosition="only" title="Back" />
<Button variant="save" iconPosition="only" title="Save" />
<Button variant="delete" iconPosition="only" title="Delete" />
<Button variant="search" iconPosition="only" title="Search" />
<Button variant="share" iconPosition="only" title="Share" />
<Button variant="small" icon="restart_alt" iconPosition="only" title="Reset" />`,

    buttonStates: `<Button active>Active</Button>
<Button pinned>Pinned</Button>
<Button maximized>Maximized</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`,
  },

  customization: `@layer base {
  :root {
    /* Button uses primary color for hover state */
    --button-hover: var(--primary);
    --button-close-hover: 0 84.2% 60.2%;
    --button-close-active: 0 62.8% 30.6%;
  }

  [data-theme="dark"] {
    /* Button uses primary color for hover state in dark mode */
    --button-hover: var(--primary);
    --button-close-hover: 0 62.8% 30.6%;
    --button-close-active: 0 84.2% 60.2%;
  }
}`,
} as const;
