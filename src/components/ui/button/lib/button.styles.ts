/**
 * Button Styles
 * Exact copy from Tauri project styles
 */

export const buttonStyles = {
  // Control button (основная кнопка)
  control: `
    height: var(--normal-btn-height);
    padding: var(--normal-btn-padding);
    border: none;
    background: transparent;
    color: hsl(var(--foreground));
    cursor: pointer;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-app-region: no-drag;
    font-size: var(--button-font-size);
    border-radius: var(--button-border-radius);
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: none;
    outline: none;
    position: relative;
    z-index: 2;
  `,

  // Play/Pause button
  playPause: `
    position: relative;
    width: var(--button-play-pause-size);
    height: var(--button-play-pause-size);
    border: 2px solid transparent;
    background: transparent;
    color: hsl(var(--foreground));
    cursor: pointer;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    box-sizing: border-box;
    box-shadow: none;
    outline: none;
  `,

  // Small button (для иконок в заголовке)
  small: `
    width: var(--small-btn-size);
    height: var(--small-btn-size);
    padding: 0;
    margin: 0 2px;
    align-self: center;
    pointer-events: auto;
  `,

  // Hover effects with glow on icon only - using unified system
  hover: `
    background: transparent;
    color: hsl(var(--hover-color));
    box-shadow: none;
  `,
  hoverIcon: `
    filter: drop-shadow(0 0 var(--hover-glow-blur) hsla(var(--primary-hover) / var(--hover-glow-opacity)));
  `,

  // Active state
  active: `
    color: hsl(var(--primary));
  `,

  // Close button hover
  closeHover: `
    background: transparent;
    color: #e81123;
  `,

  // Close button active
  closeActive: `
    background: #c50e1f;
  `,

  // Disabled state
  disabled: `
    opacity: 0.3;
    cursor: not-allowed;
  `,

  // Icon sizes
  iconSizes: {
    small: "var(--button-icon-size-small)",
    normal: "var(--button-icon-size-normal)",
    large: "var(--button-icon-size-large)",
  },
};
