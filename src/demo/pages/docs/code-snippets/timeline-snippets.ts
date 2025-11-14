/**
 * Timeline Component Code Snippets
 */

export const timelineSnippets = {
	imports: `import { Timeline } from '@sapphiresolid/ui'`,

	usage: {
		basicUsage: `const events = [
  {
    id: '1',
    title: 'Event 1',
    description: 'Description of event 1',
    date: '2024-01-01',
    variant: 'default'
  },
  {
    id: '2',
    title: 'Event 2',
    description: 'Description of event 2',
    date: '2024-01-02',
    variant: 'success'
  }
]

<Timeline events={events} />`,

		variants: `const events = [
  {
    id: '1',
    title: 'Success Event',
    description: 'Operation completed',
    variant: 'success'
  },
  {
    id: '2',
    title: 'Error Event',
    description: 'Something went wrong',
    variant: 'error'
  },
  {
    id: '3',
    title: 'Warning Event',
    description: 'Please be careful',
    variant: 'warning'
  },
  {
    id: '4',
    title: 'Info Event',
    description: 'Here is some information',
    variant: 'info'
  }
]

<Timeline events={events} />`,

		horizontal: `const events = [
  {
    id: '1',
    title: 'Step 1',
    description: 'First step',
    date: '2024-01-01'
  },
  {
    id: '2',
    title: 'Step 2',
    description: 'Second step',
    date: '2024-01-02'
  }
]

<Timeline events={events} orientation="horizontal" />`,

		customIcons: `const events = [
  {
    id: '1',
    title: 'Custom Event',
    description: 'With custom icon',
    icon: 'star',
    variant: 'primary'
  }
]

<Timeline events={events} />`
	},

	customization: `@layer base {
  :root {
    --timeline-padding: 16px 0;
    --timeline-vertical-gap: 24px;
    --timeline-horizontal-gap: 24px;
    --timeline-event-padding-left: 40px;
    --timeline-event-min-width: 200px;
    --timeline-icon-size: 24px;
    --timeline-icon-font-size: 14px;
    --timeline-content-margin-left: 16px;
    --timeline-content-margin-top: 12px;
    --timeline-title-font-size: 15px;
    --timeline-description-font-size: 13px;
    --timeline-description-margin: 4px 0 0 0;
    --timeline-date-font-size: 12px;
    --timeline-date-margin: 4px 0 0 0;
  }

  .dark,
  [data-theme="dark"] {
    --timeline-padding: 16px 0;
    --timeline-vertical-gap: 24px;
    --timeline-horizontal-gap: 24px;
    --timeline-event-padding-left: 40px;
    --timeline-event-min-width: 200px;
    --timeline-icon-size: 24px;
    --timeline-icon-font-size: 14px;
    --timeline-content-margin-left: 16px;
    --timeline-content-margin-top: 12px;
    --timeline-title-font-size: 15px;
    --timeline-description-font-size: 13px;
    --timeline-description-margin: 4px 0 0 0;
    --timeline-date-font-size: 12px;
    --timeline-date-margin: 4px 0 0 0;
  }
}`
} as const
