/**
 * Blocks Page
 * Showcase page for UI blocks similar to solid-ui.com/blocks
 */

import {
	Accessor,
	Component,
	createSignal,
	For,
	Match,
	Show,
	Switch
} from 'solid-js'
import { Button } from '../../components/ui/button'
import { Container } from '../../components/ui/container'
import { Footer } from '../components/layout'
import { AppBlock } from './blocks'

interface BlocksPageProps {
	isDark: Accessor<boolean>
}

interface Block {
	id: string
	name: string
	description: string
	previewUrl?: string
	sourceUrl?: string
}

const blocks: Block[] = [
	{
		id: 'app',
		name: 'Application window with sidebar',
		description: 'A complete application window layout with sidebar navigation',
		sourceUrl: undefined
	}
]

export const BlocksPage: Component<BlocksPageProps> = props => {
	const [selectedViewport, setSelectedViewport] = createSignal<
		'desktop' | 'tablet' | 'mobile'
	>('desktop')

	return (
		<div
			style={{
				'padding-top': '60px',
				width: '100%',
				'min-height': 'calc(100vh - 60px)',
				'box-sizing': 'border-box',
				position: 'relative',
				display: 'flex',
				'flex-direction': 'column',
				background: props.isDark() ? 'hsl(240 20% 8%)' : '#ffffff',
				color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
			}}
		>
			<Container
				padding='0'
				style={{
					flex: '1',
					display: 'flex',
					'flex-direction': 'column'
				}}
			>
				<div
					style={{
						padding: '48px 32px 48px 32px',
						display: 'flex',
						'flex-direction': 'column',
						gap: '48px',
						'box-sizing': 'border-box'
					}}
				>
					{/* Hero Section */}
					<div
						style={{
							display: 'flex',
							'flex-direction': 'column',
							'align-items': 'center',
							'text-align': 'center',
							gap: '24px',
							'max-width': '800px',
							margin: '0 auto',
							width: '100%'
						}}
					>
						<h1
							style={{
								'font-size': '3.5rem',
								'font-weight': '800',
								'letter-spacing': '-0.04em',
								margin: '0',
								'line-height': '1.1',
								color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
							}}
						>
							Building Blocks for the Web
						</h1>
						<p
							style={{
								'font-size': '1.25rem',
								'line-height': '1.6',
								margin: '0',
								color: props.isDark()
									? 'rgba(246, 246, 246, 0.7)'
									: 'rgba(26, 26, 26, 0.7)',
								'max-width': '600px'
							}}
						>
							Beautifully designed. Copy and paste into your apps. Open Source.
						</p>
						<div
							style={{
								display: 'flex',
								gap: '12px',
								'align-items': 'center',
								'margin-top': '8px'
							}}
						>
							<a
								href='#blocks'
								style={{
									padding: '12px 24px',
									'font-size': '14px',
									'font-weight': '500',
									'text-decoration': 'none',
									color: props.isDark() ? '#1a1a1a' : '#ffffff',
									background: props.isDark() ? '#f6f6f6' : '#1a1a1a',
									'border-radius': '6px',
									transition: 'all 0.2s ease',
									display: 'inline-block'
								}}
								onMouseEnter={e => {
									e.currentTarget.style.opacity = '0.9'
								}}
								onMouseLeave={e => {
									e.currentTarget.style.opacity = '1'
								}}
							>
								Browse Blocks
							</a>
						</div>
					</div>

					{/* Blocks Grid */}
					<div
						id='blocks'
						style={{
							display: 'flex',
							'flex-direction': 'column',
							gap: '48px',
							width: '100%'
						}}
					>
						<For each={blocks}>
							{block => (
								<BlockCard
									block={block}
									isDark={props.isDark}
									selectedViewport={selectedViewport()}
									onViewportChange={setSelectedViewport}
								/>
							)}
						</For>
					</div>
				</div>
				<Footer isDark={props.isDark} />
			</Container>
		</div>
	)
}

interface BlockCardProps {
	block: Block
	isDark: Accessor<boolean>
	selectedViewport: 'desktop' | 'tablet' | 'mobile'
	onViewportChange: (viewport: 'desktop' | 'tablet' | 'mobile') => void
}

const BlockCard: Component<BlockCardProps> = props => {
	const getViewportWidth = () => {
		switch (props.selectedViewport) {
			case 'desktop':
				return '100%'
			case 'tablet':
				return '768px'
			case 'mobile':
				return '375px'
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				'flex-direction': 'column',
				gap: '16px',
				width: '100%'
			}}
		>
			{/* Block Header */}
			<div
				style={{
					display: 'flex',
					'flex-direction': 'column',
					gap: '16px'
				}}
			>
				<a
					href={`#${props.block.id}`}
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
						'text-decoration': 'none',
						transition: 'opacity 0.2s ease'
					}}
					onMouseEnter={e => {
						e.currentTarget.style.opacity = '0.8'
					}}
					onMouseLeave={e => {
						e.currentTarget.style.opacity = '1'
					}}
				>
					{props.block.name}
				</a>

				{/* Controls */}
				<div
					style={{
						display: 'flex',
						'align-items': 'center',
						gap: '8px',
						'flex-wrap': 'wrap'
					}}
				>
					{/* Viewport Toggle */}
					<div
						style={{
							display: 'flex',
							gap: '0',
							background: props.isDark()
								? 'rgba(255, 255, 255, 0.05)'
								: 'rgba(0, 0, 0, 0.05)',
							'border-radius': '6px',
							padding: '2px',
							border: `1px solid ${
								props.isDark()
									? 'rgba(255, 255, 255, 0.1)'
									: 'rgba(0, 0, 0, 0.1)'
							}`
						}}
					>
						<Button
							variant='small'
							icon='desktop_windows'
							iconPosition='only'
							active={props.selectedViewport === 'desktop'}
							onClick={() => props.onViewportChange('desktop')}
							title='Desktop'
							style={{
								width: '32px',
								height: '32px',
								padding: '0',
								'border-radius': '4px'
							}}
						/>
						<Button
							variant='small'
							icon='tablet'
							iconPosition='only'
							active={props.selectedViewport === 'tablet'}
							onClick={() => props.onViewportChange('tablet')}
							title='Tablet'
							style={{
								width: '32px',
								height: '32px',
								padding: '0',
								'border-radius': '4px'
							}}
						/>
						<Button
							variant='small'
							icon='phone_iphone'
							iconPosition='only'
							active={props.selectedViewport === 'mobile'}
							onClick={() => props.onViewportChange('mobile')}
							title='Mobile'
							style={{
								width: '32px',
								height: '32px',
								padding: '0',
								'border-radius': '4px'
							}}
						/>
					</div>

					{/* Separator */}
					<div
						style={{
							width: '1px',
							height: '20px',
							background: props.isDark()
								? 'rgba(255, 255, 255, 0.1)'
								: 'rgba(0, 0, 0, 0.1)'
						}}
					/>

					{/* Open in New Tab */}
					<a
						href={`/blocks/${props.block.id}`}
						target='_blank'
						rel='noopener noreferrer'
						style={{
							display: 'flex',
							'align-items': 'center',
							gap: '6px',
							padding: '6px 12px',
							'font-size': '14px',
							'text-decoration': 'none',
							color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
							'border-radius': '6px',
							transition: 'background 0.2s ease'
						}}
						onMouseEnter={e => {
							e.currentTarget.style.background = props.isDark()
								? 'rgba(255, 255, 255, 0.1)'
								: 'rgba(0, 0, 0, 0.05)'
						}}
						onMouseLeave={e => {
							e.currentTarget.style.background = 'transparent'
						}}
					>
						<span>Open in New Tab</span>
						<span
							class='material-symbols-rounded'
							style={{
								'font-size': '16px'
							}}
						>
							open_in_new
						</span>
					</a>

					{/* Separator */}
					<div
						style={{
							width: '1px',
							height: '20px',
							background: props.isDark()
								? 'rgba(255, 255, 255, 0.1)'
								: 'rgba(0, 0, 0, 0.1)'
						}}
					/>

					{/* View Source */}
					<Show when={props.block.sourceUrl}>
						<a
							href={props.block.sourceUrl}
							target='_blank'
							rel='noopener noreferrer'
							style={{
								'font-size': '14px',
								'text-decoration': 'none',
								color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
								transition: 'opacity 0.2s ease'
							}}
							onMouseEnter={e => {
								e.currentTarget.style.opacity = '0.8'
							}}
							onMouseLeave={e => {
								e.currentTarget.style.opacity = '1'
							}}
						>
							View source
						</a>
					</Show>
				</div>
			</div>

			{/* Preview */}
			<div
				style={{
					width: getViewportWidth(),
					'max-width': '100%',
					height: '600px',
					margin: '0 auto',
					overflow: 'hidden',
					background: props.isDark() ? '#1a1a1a' : '#ffffff',
					'border-radius': '8px',
					transition: 'width 0.3s ease',
					position: 'relative',
					border: `1px solid ${
						props.isDark() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
					}`,
					'box-shadow': props.isDark()
						? '0 4px 16px rgba(0, 0, 0, 0.3)'
						: '0 4px 16px rgba(0, 0, 0, 0.1)'
				}}
			>
				<Switch>
					<Match when={props.block.id === 'app'}>
						<AppBlock isDark={props.isDark()} />
					</Match>
					<Match when={true}>
						<div
							style={{
								width: '100%',
								height: '100%',
								display: 'flex',
								'align-items': 'center',
								'justify-content': 'center',
								color: props.isDark()
									? 'rgba(246, 246, 246, 0.5)'
									: 'rgba(26, 26, 26, 0.5)',
								'font-size': '14px'
							}}
						>
							Block preview coming soon
						</div>
					</Match>
				</Switch>
			</div>
		</div>
	)
}
