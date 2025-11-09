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
  icon="crop_square"
  iconPosition="only"
  title="Maximize"
/>
<Button
  variant="close"
  icon="close"
  iconPosition="only"
  title="Close"
/>`,

		actionButtons: `<Button variant="back" iconPosition="only" title="Back" />
<Button variant="save" iconPosition="only" title="Save" />
<Button variant="delete" iconPosition="only" title="Delete" />
<Button variant="search" iconPosition="only" title="Search" />
<Button variant="share" iconPosition="only" title="Share" />`,

		buttonStates: `<Button active>Active</Button>
<Button pinned>Pinned</Button>
<Button maximized>Maximized</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`,

		numberInputControls: `<div style={{ position: "relative", display: "inline-flex" }}>
  <input
    type="number"
    value={value}
    min={1}
    max={6}
    style={{ paddingRight: "20px" }}
  />
  <div style={{ position: "absolute", right: "4px" }}>
    <Button
      variant="ghost"
      icon="arrow_drop_up"
      iconPosition="only"
      onClick={() => setValue(v => Math.min(v + 1, 6))}
    />
    <Button
      variant="ghost"
      icon="arrow_drop_down"
      iconPosition="only"
      onClick={() => setValue(v => Math.max(v - 1, 1))}
    />
  </div>
</div>`
	}
} as const
