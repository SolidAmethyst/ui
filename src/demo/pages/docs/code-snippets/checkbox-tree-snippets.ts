/**
 * CheckboxTree Component Code Snippets
 */

export const checkboxTreeSnippets = {
	imports: `import { CheckboxTree } from '@sapphiresolid/ui'`,

	usage: {
		basicUsage: `const treeData = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'File 1.txt' },
      { id: '1-2', label: 'File 2.txt' }
    ]
  }
]

<CheckboxTree nodes={treeData} />`
	}
} as const

