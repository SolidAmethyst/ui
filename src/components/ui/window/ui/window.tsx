/**
 * Window Component
 * Grid-based application window container
 */

import type { JSX } from 'solid-js'
import { Component, Show } from 'solid-js'
import { Grid } from '../../grid'
import { windowStyles } from '../lib/window.styles'
import type { WindowProps } from '../model/types'

export const Window: Component<WindowProps> = props => {
	return (
		<Grid
			class={`window ${props.class || ''}`}
			rows='32px 1fr'
			columns='1fr'
			style={{
				width: '100%',
				height: '100vh',
				overflow: 'hidden',
				margin: '0',
				padding: '0',
				...(props.style as JSX.CSSProperties)
			}}
		>
			{/* TitleBar Slot */}
			<Show when={props.titleBar}>
				<div style={windowStyles.titleBarSlot}>{props.titleBar}</div>
			</Show>

			{/* Content Area */}
			<Grid
				columns={props.sidebar ? 'minmax(0, auto) 1fr' : '1fr'}
				style={{
					'grid-row': '2',
					'grid-column': '1 / -1',
					overflow: 'hidden',
					position: 'relative',
					width: '100%',
					height: '100%',
					'min-height': '0'
				}}
			>
				{/* Sidebar Slot */}
				<Show when={props.sidebar}>
					<aside style={windowStyles.sidebarSlot}>{props.sidebar}</aside>
				</Show>

				{/* Main Content Slot */}
				<main
					style={{
						...(props.sidebar
							? windowStyles.mainSlot
							: {
									'grid-column': '1',
									'box-sizing': 'border-box' as const,
									width: '100%',
									height: '100%',
									position: 'relative' as const,
									display: 'flex',
									'flex-direction': 'column'
							  })
					}}
				>
					{props.children}
				</main>
			</Grid>
		</Grid>
	)
}
