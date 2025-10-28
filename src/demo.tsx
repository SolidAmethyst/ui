import { render } from 'solid-js/web'
import { Scrollbar, ScrollbarProvider } from './components/ui/scrollbar'

function App() {
	const longText = Array.from(
		{ length: 30 },
		(_, i) =>
			`Item ${i + 1}: Lorem ipsum dolor sit amet consectetur adipiscing elit. `
	).join('')
	const verticalContent = Array.from(
		{ length: 20 },
		(_, i) =>
			`<div style="padding: 15px; border-bottom: 1px solid #eee;"><h3>Card ${
				i + 1
			}</h3><p>This is content for card ${
				i + 1
			} to demonstrate vertical scrolling.</p></div>`
	).join('')

	return (
		<ScrollbarProvider>
			<div style={{"padding":"40px","font-family":"Arial, sans-serif","background":"#f5f5f5","min-height":"100vh"}}>
				<h1 style={{"margin-bottom":"30px","color":"#333"}}>Scrollbar Demo</h1>

				<div style={{"background":"white","padding":"30px","margin":"20px 0","border-radius":"8px","box-shadow":"0 2px 10px rgba(0,0,0,0.1)"}}>
					<h2 style={{"margin-bottom":"15px","color":"#555"}}>
						Horizontal Scrollbar
					</h2>
					<div style={{"border":"2px solid #ddd","border-radius":"4px","width":"400px","height":"80px"}}>
						<Scrollbar
							direction='horizontal'
							showArrows={true}
							autoHide={false}
							style={{ width: '100%', height: '100%' }}
						>
							<div style={{"padding":"15px","white-space":"nowrap","background":"#f9f9f9"}}>
								{longText}
							</div>
						</Scrollbar>
					</div>
				</div>

				<div style={{"background":"white","padding":"30px","margin":"20px 0","border-radius":"8px","box-shadow":"0 2px 10px rgba(0,0,0,0.1)"}}>
					<h2 style={{"margin-bottom":"15px","color":"#555"}}>Vertical Scrollbar</h2>
					<div style={{"border":"2px solid #ddd","border-radius":"4px","width":"300px","height":"250px"}}>
						<Scrollbar
							direction='vertical'
							showArrows={true}
							autoHide={false}
							minThumbSize={20}
							style={{ width: '100%', height: '100%' }}
						>
							<div style={{"background":"#f9f9f9"}} innerHTML={verticalContent} />
						</Scrollbar>
					</div>
				</div>
			</div>
		</ScrollbarProvider>
	)
}

render(() => <App />, document.getElementById('app')!)
