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

<CheckboxTree nodes={treeData} />`,

    material3: `const treeData = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'File 1.txt' },
      { id: '1-2', label: 'File 2.txt' }
    ]
  }
]

<CheckboxTree nodes={treeData} material3={true} />`,
  },

  customization: `@layer base {
  :root {
    --checkbox-tree-indent: 20px;
    --checkbox-tree-gap: 4px;
    --checkbox-tree-padding: 4px 8px;
  }

  .dark,
  [data-theme="dark"] {
    --checkbox-tree-indent: 20px;
    --checkbox-tree-gap: 4px;
    --checkbox-tree-padding: 4px 8px;
  }
}`,
} as const;
