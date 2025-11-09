import { Accessor, Component, createSignal } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { Drawer } from '../../../components/ui/drawer'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'
import { docsStyles } from '../../lib/docs.styles'
import { drawerSnippets } from './code-snippets/drawer-snippets'

interface DrawerDocsProps {
	isDark: Accessor<boolean>
}

export const DrawerDocs: Component<DrawerDocsProps> = props => {
	const [rightOpen, setRightOpen] = createSignal(false)
	const [leftOpen, setLeftOpen] = createSignal(false)
	const [topOpen, setTopOpen] = createSignal(false)
	const [bottomOpen, setBottomOpen] = createSignal(false)
	const [wideOpen, setWideOpen] = createSignal(false)
	const [noBackdropOpen, setNoBackdropOpen] = createSignal(false)
	const [controlledOpen, setControlledOpen] = createSignal(false)
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<h1 style={docsStyles.title(theme())}>Drawer</h1>
			<p style={docsStyles.description(theme())}>
				Universal sliding panel component that can slide in from any edge of the
				screen. Perfect for settings panels, navigation menus, filters, and
				more.
			</p>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Installation</h2>
				<CodeHighlight code={drawerSnippets.imports} isDark={props.isDark} />
			</section>

			{/* Basic Usage */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Basic Usage</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={{ padding: '20px' }}>
							<Button onClick={() => setRightOpen(true)}>Open Drawer</Button>
							<Drawer
								isOpen={rightOpen()}
								onClose={() => setRightOpen(false)}
								isDark={props.isDark()}
							>
								<div style={{ padding: '20px' }}>
									<h2
										style={{
											margin: '0 0 12px 0',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
										}}
									>
										Drawer Content
									</h2>
									<p
										style={{
											margin: '0',
											color: props.isDark()
												? 'rgba(246, 246, 246, 0.7)'
												: 'rgba(26, 26, 26, 0.7)'
										}}
									>
										This is the drawer content area.
									</p>
								</div>
							</Drawer>
						</div>
					}
					code={drawerSnippets.usage.basicUsage}
				/>
			</section>

			{/* Positions */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Positions</h2>
				<p style={docsStyles.description(theme())}>
					Drawer can slide in from any edge: left, right, top, or bottom.
				</p>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={{ padding: '20px', display: 'flex', gap: '12px' }}>
							<Button onClick={() => setLeftOpen(true)}>Left</Button>
							<Button onClick={() => setTopOpen(true)}>Top</Button>
							<Button onClick={() => setBottomOpen(true)}>Bottom</Button>
							<Drawer
								isOpen={leftOpen()}
								onClose={() => setLeftOpen(false)}
								position='left'
								size='300px'
								isDark={props.isDark()}
							>
								<div style={{ padding: '20px' }}>
									<h3
										style={{
											margin: '0 0 12px 0',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
										}}
									>
										Left Drawer
									</h3>
									<p
										style={{
											margin: '0',
											color: props.isDark()
												? 'rgba(246, 246, 246, 0.7)'
												: 'rgba(26, 26, 26, 0.7)'
										}}
									>
										Slides in from the left side.
									</p>
								</div>
							</Drawer>
							<Drawer
								isOpen={topOpen()}
								onClose={() => setTopOpen(false)}
								position='top'
								size='200px'
								isDark={props.isDark()}
							>
								<div
									style={{
										padding: '20px',
										display: 'flex',
										'flex-direction': 'column',
										'align-items': 'center',
										'justify-content': 'center',
										'text-align': 'center',
										height: '100%'
									}}
								>
									<h3
										style={{
											margin: '0 0 12px 0',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
										}}
									>
										Top Drawer
									</h3>
									<p
										style={{
											margin: '0',
											color: props.isDark()
												? 'rgba(246, 246, 246, 0.7)'
												: 'rgba(26, 26, 26, 0.7)'
										}}
									>
										Slides in from the top.
									</p>
								</div>
							</Drawer>
							<Drawer
								isOpen={bottomOpen()}
								onClose={() => setBottomOpen(false)}
								position='bottom'
								size='300px'
								isDark={props.isDark()}
							>
								<div
									style={{
										padding: '20px',
										display: 'flex',
										'flex-direction': 'column',
										'align-items': 'center',
										'justify-content': 'center',
										'text-align': 'center',
										height: '100%'
									}}
								>
									<h3
										style={{
											margin: '0 0 12px 0',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
										}}
									>
										Bottom Drawer
									</h3>
									<p
										style={{
											margin: '0',
											color: props.isDark()
												? 'rgba(246, 246, 246, 0.7)'
												: 'rgba(26, 26, 26, 0.7)'
										}}
									>
										Slides in from the bottom.
									</p>
								</div>
							</Drawer>
						</div>
					}
					code={drawerSnippets.usage.positions}
				/>
			</section>

			{/* Custom Size */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Custom Size</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={{ padding: '20px' }}>
							<Button onClick={() => setWideOpen(true)}>
								Open Wide Drawer
							</Button>
							<Drawer
								isOpen={wideOpen()}
								onClose={() => setWideOpen(false)}
								size='600px'
								isDark={props.isDark()}
							>
								<div style={{ padding: '20px' }}>
									<h2
										style={{
											margin: '0 0 12px 0',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
										}}
									>
										Wide Drawer
									</h2>
									<p
										style={{
											margin: '0',
											color: props.isDark()
												? 'rgba(246, 246, 246, 0.7)'
												: 'rgba(26, 26, 26, 0.7)'
										}}
									>
										This drawer is 600px wide instead of the default 320px.
									</p>
								</div>
							</Drawer>
						</div>
					}
					code={drawerSnippets.usage.customSize}
				/>
			</section>

			{/* No Backdrop */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Without Backdrop</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={{ padding: '20px' }}>
							<Button onClick={() => setNoBackdropOpen(!noBackdropOpen())}>
								{noBackdropOpen()
									? 'Close Drawer'
									: 'Open Drawer (No Backdrop)'}
							</Button>
							<Drawer
								isOpen={noBackdropOpen()}
								onClose={() => setNoBackdropOpen(false)}
								showBackdrop={false}
								isDark={props.isDark()}
							>
								<div style={{ padding: '20px' }}>
									<h2
										style={{
											margin: '0 0 12px 0',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
										}}
									>
										No Backdrop
									</h2>
									<p
										style={{
											margin: '0',
											color: props.isDark()
												? 'rgba(246, 246, 246, 0.7)'
												: 'rgba(26, 26, 26, 0.7)'
										}}
									>
										This drawer doesn't have a backdrop overlay.
									</p>
								</div>
							</Drawer>
						</div>
					}
					code={drawerSnippets.usage.noBackdrop}
				/>
			</section>

			{/* Controlled Close */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Controlled Close</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={{ padding: '20px' }}>
							<Button onClick={() => setControlledOpen(true)}>
								Open Drawer
							</Button>
							<Drawer
								isOpen={controlledOpen()}
								onClose={() => setControlledOpen(false)}
								closeOnBackdropClick={false}
								isDark={props.isDark()}
							>
								<div style={{ padding: '20px' }}>
									<h2
										style={{
											margin: '0 0 12px 0',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
										}}
									>
										Controlled Close
									</h2>
									<p
										style={{
											margin: '0 0 16px 0',
											color: props.isDark()
												? 'rgba(246, 246, 246, 0.7)'
												: 'rgba(26, 26, 26, 0.7)'
										}}
									>
										This drawer won't close on backdrop click.
									</p>
									<Button onClick={() => setControlledOpen(false)}>
										Close
									</Button>
								</div>
							</Drawer>
						</div>
					}
					code={drawerSnippets.usage.controlledClose}
				/>
			</section>
		</article>
	)
}
