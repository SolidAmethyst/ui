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
    --accordion-border-color-dark: rgba(255, 255, 255, 0.1);
    --accordion-border-color-light: rgba(0, 0, 0, 0.1);
    --accordion-header-padding: 16px;
    --accordion-content-padding: 16px;
    --accordion-border-radius: 8px;
    --accordion-gap: 4px;
  }

  .dark,
  [data-theme="dark"] {
    --accordion-border-color-dark: rgba(255, 255, 255, 0.1);
    --accordion-border-color-light: rgba(0, 0, 0, 0.1);
    --accordion-header-padding: 16px;
    --accordion-content-padding: 16px;
    --accordion-border-radius: 8px;
    --accordion-gap: 4px;
  }
}`,
} as const;
