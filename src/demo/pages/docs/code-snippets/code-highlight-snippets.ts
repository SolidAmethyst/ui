/**
 * CodeHighlight Component Code Snippets
 */

export const codeHighlightSnippets = {
  imports: `import { CodeHighlight } from '@sapphiresolid/ui'`,

  basicUsage: `<CodeHighlight
  code="const greeting = 'Hello, World!'"
/>`,

  withCustomClass: `<CodeHighlight
  code="const x = 1"
  class="custom-code"
/>`,

  withCustomStyle: `<CodeHighlight
  code="const x = 1"
  style={{ 'margin-top': '20px' }}
/>`,

  examples: {
    typescript: `interface User {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`
}`,

    javascript: `const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(n => n * 2)
const sum = doubled.reduce((a, b) => a + b, 0)

console.log('Sum:', sum) // Output: 30`,

    css: `.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: hsl(var(--background));
  border-radius: 8px;
}

.button {
  padding: 12px 24px;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-radius: 4px;
  cursor: pointer;
}`,
  },
} as const;
