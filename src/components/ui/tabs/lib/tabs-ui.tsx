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
				// Reset inactive tab styles - explicitly clear text-shadow and border-bottom
				const dark = context.isDark()
				Object.assign(
					button.style,
					tabsUIStyles.trigger({
						isDark: dark,
						isActive: false
					})
				)
				// Explicitly reset text-shadow to ensure no lingering glow
				button.style.textShadow = 'none'
				button.style.borderBottom = '2px solid transparent'
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
				// Reset all tab styles first
				if (context.resetAllTabStyles) {
					context.resetAllTabStyles(props.value)
				}
				context.setValue(props.value)
				// Immediately apply hover styles to the newly active tab
				// (since we're setting it to active, we know it will be active)
				const dark = context.isDark()
				Object.assign(
					e.currentTarget.style,
					tabsUIStyles.triggerHover({
						isDark: dark,
						isActive: true
					})
				)
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
				Object.assign(
					e.currentTarget.style,
					tabsUIStyles.triggerHover({
						isDark: dark,
						isActive: active
					})
				)
			}}
			onMouseLeave={e => {
				if (props.disabled) return
				const dark = context.isDark()
				const active = isActive()
				Object.assign(
					e.currentTarget.style,
					tabsUIStyles.trigger({
						isDark: dark,
						isActive: active
					})
				)
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
