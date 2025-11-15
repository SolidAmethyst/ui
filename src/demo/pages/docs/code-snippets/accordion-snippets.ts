/**
 * Accordion Component Code Snippets
 */

export const accordionSnippets = {
  imports: `import { Accordion } from '@sapphiresolid/ui'`,

  usage: {
    basicUsage: `const items = [
  {
    id: '1',
    header: 'Section 1',
    content: 'Content of section 1'
  },
  {
    id: '2',
    header: 'Section 2',
    content: 'Content of section 2'
  }
]

<Accordion items={items} />`,

    allowMultiple: `const items = [
  {
    id: '1',
    header: 'Section 1',
    content: 'Content 1'
  },
  {
    id: '2',
    header: 'Section 2',
    content: 'Content 2'
  }
]

<Accordion items={items} allowMultiple={true} />`,
  },

  customization: `@layer base {
  :root {
    /* Accordion styling using library defaults */
    --accordion-header-padding: 16px;
    --accordion-content-padding: 16px;
    --accordion-border-radius: 8px;
    --accordion-gap: 4px;
  }

  /* Accordion uses border and background from main theme */
  [data-theme="dark"] {
    /* Overrides for dark theme (if needed) */
    --accordion-header-padding: 16px;
  }
}`,
} as const;
