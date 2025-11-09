/**
 * Drawer Component Code Snippets
 */

export const drawerSnippets = {
	imports: `import { Drawer } from '@sapphiresolid/ui'`,

	usage: {
		basicUsage: `import { createSignal } from 'solid-js'
import { Drawer } from '@sapphiresolid/ui'

function MyComponent() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      <Drawer isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <div style={{ padding: '20px' }}>
          <h2>Drawer Content</h2>
          <p>This is the drawer content area.</p>
        </div>
      </Drawer>
    </>
  )
}`,

		positions: `import { createSignal } from 'solid-js'
import { Drawer } from '@sapphiresolid/ui'

function MyComponent() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Left Drawer</button>
      <Drawer
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        position="left"
        size="300px"
      >
        <div style={{ padding: '20px' }}>Left Drawer</div>
      </Drawer>
    </>
  )
}`,

		customSize: `import { createSignal } from 'solid-js'
import { Drawer } from '@sapphiresolid/ui'

function MyComponent() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Wide Drawer</button>
      <Drawer
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        size="600px"
      >
        <div style={{ padding: '20px' }}>Wide Drawer Content</div>
      </Drawer>
    </>
  )
}`,

		noBackdrop: `import { createSignal } from 'solid-js'
import { Drawer } from '@sapphiresolid/ui'

function MyComponent() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      <Drawer
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        showBackdrop={false}
      >
        <div style={{ padding: '20px' }}>Drawer without backdrop</div>
      </Drawer>
    </>
  )
}`,

		controlledClose: `import { createSignal } from 'solid-js'
import { Drawer } from '@sapphiresolid/ui'

function MyComponent() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      <Drawer
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        closeOnBackdropClick={false}
      >
        <div style={{ padding: '20px' }}>
          <p>This drawer won't close on backdrop click</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </Drawer>
    </>
  )
}`
	}
} as const
