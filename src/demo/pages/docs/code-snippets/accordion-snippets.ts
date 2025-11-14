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

<Accordion items={items} />`
	}
} as const

