/**
 * Tech Chip Styles
 * Material 3 inspired status chip styles
 */

export const techChipStyles = {
	base: `
		display: inline-flex
		align-items: center
		gap: 4px
		height: 24px
		padding: 0 8px
		background: transparent
		color: white
		font-size: 12px
		line-height: 1
		vertical-align: middle
	`,

	text: `
		color: white
		font-size: 12px
		line-height: 1
	`,

	variants: {
		frontend: `
			color: white
		`,
		backend: `
			color: white
		`,
		engine: `
			color: white
		`
	},

	hover: `
		opacity: 0.8
	`,

	indicator: `
		width: 6px
		height: 6px
		border-radius: 50%
		flex-shrink: 0
	`,

	icon: `
		color: white
		font-size: 12px
		line-height: 1
		width: 12px
		height: 12px
		display: flex
		align-items: center
		justify-content: center
	`,

	status: {
		loading: `
			bg-[#ff9800]
			animate-pulse
		`,
		ready: `
			bg-[#4caf50]
			shadow-[0_0_8px_rgba(76,175,80,0.5)]
		`,
		error: `
			bg-[#f44336]
			animate-pulse
		`
	}
}

/**
 * Keyframe animations
 */
export const animations = `
@keyframes pulse {
	0%, 100% {
		opacity: 1;
		transform: scale(1);
	}
	50% {
		opacity: 0.5;
		transform: scale(0.8);
	}
}

@keyframes blink {
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.3;
	}
}
`
