/**
 * Universal Tabs UI Components
 * For real application tabs (like solid-ui.com pattern)
 */

import {
	Component,
	createContext,
	createSignal,
	JSX,
	Show,
	splitProps,
	useContext
} from 'solid-js'
import { tabsUIStyles } from './tabs-ui.styles'

interface TabsContextValue {
	value: () => string
	setValue: (value: string) => void
	isDark: () => boolean
	setResetAllTabStyles?: (fn: (newActiveValue: string) => void) => void
	resetAllTabStyles?: (newActiveValue: string) => void
}

const TabsContext = createContext<TabsContextValue>()

interface TabsRootProps {
	defaultValue: string
	isDark?: boolean
	class?: string
	style?: JSX.CSSProperties
	children: JSX.Element
	/**
	 * Controlled value (if provided, component becomes controlled)
	 */
	value?: string
	/**
	 * Callback when active tab changes
	 */
	onValueChange?: (value: string) => void
	/**
	 * Orientation of tabs (default: 'horizontal')
	 */
	orientation?: 'horizontal' | 'vertical'
}

export const TabsRoot: Component<TabsRootProps> = props => {
	const [local, others] = splitProps(props, [
		'defaultValue',
		'value',
		'onValueChange',
		'isDark',
		'orientation',
		'children',
		'class',
		'style'
	])

	// Controlled or uncontrolled mode
	const isControlled = () => local.value !== undefined
	const [internalValue, setInternalValue] = createSignal(local.defaultValue)

	const value = () => (isControlled() ? local.value! : internalValue())

	const setValue = (newValue: string) => {
		if (!isControlled()) {
			setInternalValue(newValue)
		}
		if (local.onValueChange) {
			local.onValueChange(newValue)
		}
	}

	const isDark = () => local.isDark ?? false

	let resetAllTabStylesRef: ((newActiveValue: string) => void) | undefined

	const resetAllTabStyles = (newActiveValue: string) => {
		if (resetAllTabStylesRef) {
			resetAllTabStylesRef(newActiveValue)
		}
	}

	return (
		<TabsContext.Provider
			value={{
				value,
				setValue,
				isDark,
				setResetAllTabStyles: (fn: (newActiveValue: string) => void) => {
					resetAllTabStylesRef = fn
				},
				resetAllTabStyles
			}}
		>
			<div
				class={local.class}
				style={{
					...tabsUIStyles.root(),
					...(local.orientation === 'vertical'
						? {
								'flex-direction': 'row',
								display: 'flex'
							}
						: {}),
					...local.style
				}}
				{...others}
			>
				{local.children}
			</div>
		</TabsContext.Provider>
	)
}

interface TabsListProps {
	class?: string
	style?: JSX.CSSProperties
	children: JSX.Element
	/**
	 * Center align tabs (default: false)
	 */
	center?: boolean
	/**
	 * Gap between tabs (overrides CSS variable)
	 */
	gap?: string
	/**
	 * Custom border bottom color (overrides default)
	 */
	borderColor?: string
}

export const TabsList: Component<TabsListProps> = props => {
	const context = useContext(TabsContext)
	if (!context) {
		throw new Error('TabsList must be used within TabsRoot')
	}

	let listRef: HTMLDivElement | undefined

	// Function to reset all tab button styles
	const resetAllTabStyles = (newActiveValue: string) => {
		if (!listRef) return
		const buttons = listRef.querySelectorAll('button')
		buttons.forEach(button => {
			const buttonValue = button.getAttribute('data-tab-value')
			if (buttonValue && buttonValue !== newActiveValue) {
				// Reset inactive tab styles - only color, border-bottom, and text-shadow
				// Preserve all other styles (padding, margin, flex properties) from inline styles or CSS
				const dark = context.isDark()
				const normalStyles = tabsUIStyles.trigger({
					isDark: dark,
					isActive: false
				})
				// Only update visual state properties, preserve layout properties
				button.style.color = normalStyles.color as string
				button.style.borderBottom = normalStyles['border-bottom'] as string
				button.style.textShadow = 'none'
			}
		})
	}

	// Expose reset function to context
	if (context.setResetAllTabStyles) {
		context.setResetAllTabStyles(resetAllTabStyles)
	}

	const baseStyles = tabsUIStyles.list({
		isDark: context.isDark(),
		isActive: false
	})

	return (
		<div
			ref={listRef}
			class={props.class}
			style={{
				...baseStyles,
				...(props.center
					? {
							'justify-content': 'center',
							'align-items': 'center'
						}
					: {}),
				...(props.gap ? { gap: props.gap } : {}),
				...(props.borderColor
					? {
							'border-bottom': `1px solid ${props.borderColor}`
						}
					: {}),
				...props.style
			}}
		>
			{props.children}
		</div>
	)
}

interface TabsTriggerProps {
	value: string
	class?: string
	style?: JSX.CSSProperties
	children: JSX.Element
	/**
	 * Disable this tab
	 */
	disabled?: boolean
	/**
	 * Custom padding (overrides CSS variable)
	 */
	padding?: string
	/**
	 * Custom font size (overrides CSS variable)
	 */
	fontSize?: string
	/**
	 * Custom font weight (overrides CSS variable)
	 */
	fontWeight?: string
	/**
	 * Display type for flex alignment (default: 'flex')
	 */
	display?: 'flex' | 'block' | 'inline-flex' | 'inline-block'
	/**
	 * Align items vertically (default: 'center')
	 */
	alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'
	/**
	 * Justify content horizontally (default: 'center')
	 */
	justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
}

export const TabsTrigger: Component<TabsTriggerProps> = props => {
	const context = useContext(TabsContext)
	if (!context) {
		throw new Error('TabsTrigger must be used within TabsRoot')
	}

	const isActive = () => context.value() === props.value

	return (
		<button
			type='button'
			data-tab-value={props.value}
			onClick={e => {
				if (props.disabled) return
				// Don't do anything if this tab is already active
				if (isActive()) return
				// Reset all tab styles first
				if (context.resetAllTabStyles) {
					context.resetAllTabStyles(props.value)
				}
				context.setValue(props.value)
				// Apply hover styles only to color, border-bottom, and text-shadow
				// Don't touch padding, margin, or flex properties
				const dark = context.isDark()
				const hoverStyles = tabsUIStyles.triggerHover({
					isDark: dark,
					isActive: true
				})
				e.currentTarget.style.color = hoverStyles.color as string
				e.currentTarget.style.borderBottom = hoverStyles['border-bottom'] as string
				e.currentTarget.style.textShadow = hoverStyles['text-shadow'] as string
				// Preserve flex props and height if provided (they override CSS variables)
				if (props.display) {
					e.currentTarget.style.display = props.display
				}
				if (props.alignItems) {
					e.currentTarget.style.alignItems = props.alignItems
				}
				if (props.justifyContent) {
					e.currentTarget.style.justifyContent = props.justifyContent
				}
				// Preserve height from inline styles if set
				if (props.style?.height) {
					e.currentTarget.style.height = props.style.height as string
				}
			}}
			class={props.class}
			style={{
				...tabsUIStyles.trigger({
					isDark: context.isDark(),
					isActive: isActive()
				}),
				...(props.padding ? { padding: props.padding } : {}),
				...(props.fontSize ? { 'font-size': props.fontSize } : {}),
				...(props.fontWeight ? { 'font-weight': props.fontWeight } : {}),
				...(props.display ? { display: props.display } : {}),
				...(props.alignItems ? { 'align-items': props.alignItems } : {}),
				...(props.justifyContent ? { 'justify-content': props.justifyContent } : {}),
				...(props.disabled
					? {
							opacity: '0.5',
							cursor: 'not-allowed'
						}
					: {}),
				...props.style
			}}
			onMouseEnter={e => {
				if (props.disabled) return
				const dark = context.isDark()
				const active = isActive()
				// Apply hover styles only to color, border-bottom, and text-shadow
				// All other properties (padding, margin, flex) are preserved from initial styles
				const hoverStyles = tabsUIStyles.triggerHover({
					isDark: dark,
					isActive: active
				})
				e.currentTarget.style.color = hoverStyles.color as string
				e.currentTarget.style.borderBottom = hoverStyles['border-bottom'] as string
				e.currentTarget.style.textShadow = hoverStyles['text-shadow'] as string
				// Preserve flex props and height if provided (they override CSS variables)
				if (props.display) {
					e.currentTarget.style.display = props.display
				}
				if (props.alignItems) {
					e.currentTarget.style.alignItems = props.alignItems
				}
				if (props.justifyContent) {
					e.currentTarget.style.justifyContent = props.justifyContent
				}
				// Preserve height from inline styles if set
				if (props.style?.height) {
					e.currentTarget.style.height = props.style.height as string
				}
			}}
			onMouseLeave={e => {
				if (props.disabled) return
				const dark = context.isDark()
				const active = isActive()
				// Apply normal styles only to color, border-bottom, and text-shadow
				// All other properties (padding, margin, flex, height) are preserved from initial styles
				const normalStyles = tabsUIStyles.trigger({
					isDark: dark,
					isActive: active
				})
				e.currentTarget.style.color = normalStyles.color as string
				e.currentTarget.style.borderBottom = normalStyles['border-bottom'] as string
				e.currentTarget.style.textShadow = normalStyles['text-shadow'] || 'none'
				// Preserve flex props and height if provided (they override CSS variables)
				if (props.display) {
					e.currentTarget.style.display = props.display
				}
				if (props.alignItems) {
					e.currentTarget.style.alignItems = props.alignItems
				}
				if (props.justifyContent) {
					e.currentTarget.style.justifyContent = props.justifyContent
				}
				// Preserve height from inline styles if set
				if (props.style?.height) {
					e.currentTarget.style.height = props.style.height as string
				}
			}}
		>
			{props.children}
		</button>
	)
}

interface TabsContentProps {
	value: string
	class?: string
	style?: JSX.CSSProperties
	children: JSX.Element
}

export const TabsContent: Component<TabsContentProps> = props => {
	const context = useContext(TabsContext)
	if (!context) {
		throw new Error('TabsContent must be used within TabsRoot')
	}

	return (
		<Show when={context.value() === props.value}>
			<div
				class={props.class}
				style={{ ...tabsUIStyles.content(), ...props.style }}
			>
				{props.children}
			</div>
		</Show>
	)
}
