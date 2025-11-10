import { Accessor, Component } from 'solid-js'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'

interface IntroductionDocsProps {
	isDark: Accessor<boolean>
}

export const IntroductionDocs: Component<IntroductionDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Introduction
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Beautiful Solid.js components built with Material 3 design principles.
			</Typography>

			<section style={{ 'margin-bottom': '48px' }}>
				<Typography
					variant='body'
					isDark={props.isDark()}
					style={{ margin: '12px 0' }}
				>
					This is <strong>NOT</strong> a component library. It's a collection of
					re-usable components that you can copy and paste into your apps.
				</Typography>
				<Typography
					variant='body'
					isDark={props.isDark()}
					style={{ margin: '12px 0' }}
				>
					Pick the components you need. Copy and paste the code into your
					project and customize to your needs. The code is yours.
				</Typography>
			</section>
		</article>
	)
}
