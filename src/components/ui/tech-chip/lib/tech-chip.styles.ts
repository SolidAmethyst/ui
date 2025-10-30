/**
 * Tech Chip Styles
 * Material 3 inspired status chip styles
 */

export const techChipStyles = {
	base: `
		inline-flex items-center gap-1.5 px-3 py-1
		text-xs font-medium
		backdrop-blur-md border border-solid
		transition-all duration-200 ease-in-out
		relative
	`,

	variants: {
		frontend: `
			bg-[rgba(49,120,198,0.15)]
			border-[rgba(49,120,198,0.3)]
			text-[#3178c6]
		`,
		backend: `
			bg-[rgba(206,66,43,0.15)]
			border-[rgba(206,66,43,0.3)]
			text-[#ce422b]
		`,
		engine: `
			bg-[rgba(206,66,43,0.15)]
			border-[rgba(206,66,43,0.3)]
			text-[#ce422b]
		`,
	},

	hover: `
		hover:-translate-y-0.5
		hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)]
	`,

	indicator: `
		w-1.5 h-1.5 rounded-full flex-shrink-0 relative
	`,

	icon: `
		text-sm leading-none h-3.5 -mt-px
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
		`,
	},
};

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
`;

