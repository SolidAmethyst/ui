/**
 * Modal Component Code Snippets
 */

export const modalSnippets = {
  imports: `import { Modal } from '@sapphiresolid/ui'`,

  usage: {
    basicUsage: `import { createSignal } from 'solid-js'
import { Modal } from '@sapphiresolid/ui'

function MyComponent() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <div style={{ padding: '20px' }}>
          <h2>Modal Title</h2>
          <p>Modal content goes here.</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </>
  )
}`,

    sizes: `import { createSignal } from 'solid-js'
import { Modal } from '@sapphiresolid/ui'

function MyComponent() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Large Modal</button>
      <Modal
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        size="lg"
      >
        <div style={{ padding: '20px' }}>Large Modal Content</div>
      </Modal>
    </>
  )
}`,

    noBackdrop: `import { createSignal } from 'solid-js'
import { Modal } from '@sapphiresolid/ui'

function MyComponent() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        showBackdrop={false}
      >
        <div style={{ padding: '20px' }}>Modal without backdrop</div>
      </Modal>
    </>
  )
}`,

    controlledClose: `import { createSignal } from 'solid-js'
import { Modal } from '@sapphiresolid/ui'

function MyComponent() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        closeOnBackdropClick={false}
        closeOnEscape={false}
      >
        <div style={{ padding: '20px' }}>
          <p>This modal won't close on backdrop click or Escape key.</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </>
  )
}`,

    focusTrap: `import { createSignal } from 'solid-js'
import { Modal } from '@sapphiresolid/ui'

function MyComponent() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        trapFocus={true}
      >
        <div style={{ padding: '20px' }}>
          <button>First Button</button>
          <button>Second Button</button>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </>
  )
}`,
  },

  customization: `@layer base {
  :root {
    /* Modal component styling */
    --modal-backdrop-opacity: 0.4;
    --modal-backdrop-blur: 4px;
    --modal-border-radius: 8px;
    --modal-shadow: 0 25px 50px hsl(var(--shadow) / 0.25);
    --modal-transition-duration: 300ms;
  }

  [data-theme="dark"] {
    /* Modal uses same values in dark theme */
    --modal-backdrop-opacity: 0.4;
  }
}`,
} as const;
