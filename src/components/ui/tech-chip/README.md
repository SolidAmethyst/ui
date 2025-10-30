# TechChip Component

Status indicator chip for displaying technology stack with real-time status updates.

## Features

- ✅ Three status states: loading, ready, error
- ✅ Three variants: frontend, backend, engine
- ✅ Material 3 design with glass effect
- ✅ Animated status indicators
- ✅ Material Symbols icons
- ✅ Fully accessible (ARIA)
- ✅ TypeScript typed

## Usage

```tsx
import { TechChip } from '@sapphiresolid/ui'

function App() {
	return (
		<div class='flex gap-2'>
			<TechChip
				label='TypeScript'
				icon='code'
				status='ready'
				variant='frontend'
			/>

			<TechChip label='Rust' icon='memory' status='loading' variant='backend' />

			<TechChip
				label='Engine'
				icon='precision_manufacturing'
				status='error'
				variant='engine'
			/>
		</div>
	)
}
```

## Props

| Prop      | Type                                  | Required | Description                |
| --------- | ------------------------------------- | -------- | -------------------------- |
| `label`   | `string`                              | ✅       | Display text               |
| `icon`    | `string`                              | ✅       | Material Symbols icon name |
| `status`  | `'loading' \| 'ready' \| 'error'`     | ✅       | Current status             |
| `variant` | `'frontend' \| 'backend' \| 'engine'` | ✅       | Visual variant             |
| `class`   | `string`                              | ❌       | Custom CSS class           |
| `onClick` | `() => void`                          | ❌       | Click handler              |

## Status States

### Loading

- Orange indicator
- Pulse animation
- Indicates initialization or processing

### Ready

- Green indicator
- Steady glow effect
- Indicates successful state

### Error

- Red indicator
- Blink animation
- Indicates failure or issue

## Variants

### Frontend

- Blue color scheme
- For client-side technologies (TypeScript, React, etc.)

### Backend

- Orange/red color scheme
- For server-side technologies (Rust, Node.js, etc.)

### Engine

- Red color scheme
- For core engine/runtime components

## Styling

The component uses Tailwind CSS utility classes and can be customized:

```tsx
<TechChip
	label='Custom'
	icon='code'
	status='ready'
	variant='frontend'
	class='my-custom-class'
/>
```

## Accessibility

- Uses `role="status"` for screen readers
- Provides descriptive `aria-label`
- Icons marked with `aria-hidden="true"`
- Keyboard accessible when `onClick` is provided

## Material Symbols

Requires Material Symbols Rounded font:

```html
<link
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
	rel="stylesheet"
/>
```

## Examples

### Tech Stack Display

```tsx
import { createSignal } from 'solid-js'
import { TechChip } from '@sapphiresolid/ui'

function TechStack() {
	const [frontendStatus, setFrontendStatus] = createSignal('ready')
	const [backendStatus, setBackendStatus] = createSignal('loading')

	return (
		<div class='flex gap-2 p-4'>
			<TechChip
				label='TypeScript'
				icon='code'
				status={frontendStatus()}
				variant='frontend'
			/>
			<TechChip
				label='Rust'
				icon='memory'
				status={backendStatus()}
				variant='backend'
			/>
		</div>
	)
}
```

### Interactive Chips

```tsx
<TechChip
	label='Debug'
	icon='bug_report'
	status='ready'
	variant='engine'
	onClick={() => console.log('Chip clicked!')}
/>
```

## Design System

Follows Material 3 design principles:

- Glass morphism effect
- Subtle borders
- Smooth transitions
- Status-based colors
- Animated indicators
