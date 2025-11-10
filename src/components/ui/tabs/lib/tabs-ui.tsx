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
}

const TabsContext = createContext<TabsContextValue>()

interface TabsRootProps {
	defaultValue: string
	isDark?: boolean
	class?: string
	style?: JSX.CSSProperties
	children: JSX.Element
}

export const TabsRoot: Component<TabsRootProps> = props => {
	const [local, others] = splitProps(props, [
		'defaultValue',
		'isDark',
		'children',
		'class',
		'style'
	])
	const [value, setValue] = createSignal(local.defaultValue)
	const isDark = () => local.isDark ?? false

	return (
		<TabsContext.Provider
			value={{
				value,
				setValue,
				isDark
			}}
		>
			<div
				class={local.class}
				style={{ ...tabsUIStyles.root(), ...local.style }}
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
}

export const TabsList: Component<TabsListProps> = props => {
	const context = useContext(TabsContext)
	if (!context) {
		throw new Error('TabsList must be used within TabsRoot')
	}

	return (
		<div
			class={props.class}
			style={{
				...tabsUIStyles.list({ isDark: context.isDark(), isActive: false }),
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
			onClick={() => context.setValue(props.value)}
			class={props.class}
			style={{
				...tabsUIStyles.trigger({
					isDark: context.isDark(),
					isActive: isActive()
				}),
				...props.style
			}}
			onMouseEnter={e => {
				if (!isActive()) {
					const dark = context.isDark()
					e.currentTarget.style.color = dark ? '#ffffff' : '#000000'
					e.currentTarget.style.background = dark
						? 'rgba(255, 255, 255, 0.1)'
						: 'rgba(0, 0, 0, 0.1)'
				}
			}}
			onMouseLeave={e => {
				if (!isActive()) {
					const dark = context.isDark()
					e.currentTarget.style.color = dark
						? 'rgba(255, 255, 255, 0.8)'
						: 'rgba(0, 0, 0, 0.8)'
					e.currentTarget.style.background = 'transparent'
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
