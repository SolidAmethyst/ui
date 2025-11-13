import { Accessor, Component, createSignal } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Drawer } from '../../../components/ui/drawer'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
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
			<Typography variant='h1' isDark={props.isDark()}>
				Drawer
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Universal sliding panel component that can slide in from any edge of the
				screen. Perfect for settings panels, navigation menus, filters, and
				more.
			</Typography>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={drawerSnippets.imports} isDark={props.isDark} />
			</section>

			{/* Basic Usage */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Basic Usage
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div style={{ width: '100%', display: 'flex', 'justify-content': 'center', 'align-items': 'center' }}>
							<Button onClick={() => setRightOpen(true)}>Open Drawer</Button>
							<Drawer
								isOpen={rightOpen()}
								onClose={() => setRightOpen(false)}
								isDark={props.isDark()}
							>
								<div style={{ padding: '20px' }}>
									<Typography
										variant='h4'
										as='h2'
										isDark={props.isDark()}
										style={{ margin: '0 0 12px 0' }}
									>
										Drawer Content
									</Typography>
									<Typography
										variant='small'
										isDark={props.isDark()}
										style={{ margin: '0' }}
									>
										This is the drawer content area.
									</Typography>
								</div>
							</Drawer>
							</div>
						</div>
					}
					code={drawerSnippets.usage.basicUsage}
				/>
			</section>

			{/* Positions */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Positions
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					Drawer can slide in from any edge: left, right, top, or bottom.
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div style={{ width: '100%', display: 'flex', gap: '12px', 'justify-content': 'center', 'align-items': 'center' }}>
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
									<Typography
										variant='h4'
										as='h3'
										isDark={props.isDark()}
										style={{ margin: '0 0 12px 0' }}
									>
										Left Drawer
									</Typography>
									<Typography
										variant='small'
										isDark={props.isDark()}
										style={{ margin: '0' }}
									>
										Slides in from the left side.
									</Typography>
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
									<Typography
										variant='h4'
										as='h3'
										isDark={props.isDark()}
										style={{ margin: '0 0 12px 0' }}
									>
										Top Drawer
									</Typography>
									<Typography
										variant='small'
										isDark={props.isDark()}
										style={{ margin: '0' }}
									>
										Slides in from the top.
									</Typography>
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
									<Typography
										variant='h4'
										as='h3'
										isDark={props.isDark()}
										style={{ margin: '0 0 12px 0' }}
									>
										Bottom Drawer
									</Typography>
									<Typography
										variant='small'
										isDark={props.isDark()}
										style={{ margin: '0' }}
									>
										Slides in from the bottom.
									</Typography>
								</div>
							</Drawer>
							</div>
						</div>
					}
					code={drawerSnippets.usage.positions}
				/>
			</section>

			{/* Custom Size */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Custom Size
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div style={{ width: '100%', display: 'flex', 'justify-content': 'center', 'align-items': 'center' }}>
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
									<Typography
										variant='h4'
										as='h2'
										isDark={props.isDark()}
										style={{ margin: '0 0 12px 0' }}
									>
										Wide Drawer
									</Typography>
									<Typography
										variant='small'
										isDark={props.isDark()}
										style={{ margin: '0' }}
									>
										This drawer is 600px wide instead of the default 320px.
									</Typography>
								</div>
							</Drawer>
							</div>
						</div>
					}
					code={drawerSnippets.usage.customSize}
				/>
			</section>

			{/* No Backdrop */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Without Backdrop
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div style={{ width: '100%', display: 'flex', 'justify-content': 'center', 'align-items': 'center' }}>
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
									<Typography
										variant='h4'
										as='h2'
										isDark={props.isDark()}
										style={{ margin: '0 0 12px 0' }}
									>
										No Backdrop
									</Typography>
									<Typography
										variant='small'
										isDark={props.isDark()}
										style={{ margin: '0' }}
									>
										This drawer doesn't have a backdrop overlay.
									</Typography>
								</div>
							</Drawer>
							</div>
						</div>
					}
					code={drawerSnippets.usage.noBackdrop}
				/>
			</section>

			{/* Controlled Close */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Controlled Close
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div style={{ width: '100%', display: 'flex', 'justify-content': 'center', 'align-items': 'center' }}>
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
									<Typography
										variant='h4'
										as='h2'
										isDark={props.isDark()}
										style={{ margin: '0 0 12px 0' }}
									>
										Controlled Close
									</Typography>
									<Typography
										variant='small'
										isDark={props.isDark()}
										style={{ margin: '0 0 16px 0' }}
									>
										This drawer won't close on backdrop click.
									</Typography>
									<Button onClick={() => setControlledOpen(false)}>
										Close
									</Button>
								</div>
							</Drawer>
							</div>
						</div>
					}
					code={drawerSnippets.usage.controlledClose}
				/>
			</section>
		</article>
	)
}
