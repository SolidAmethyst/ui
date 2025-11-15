/**
 * Drawer Icon Component
 * Custom SVG icon for drawer/sidebar trigger button
 * Changes appearance based on open/closed state
 */

import { Component } from "solid-js";

interface DrawerIconProps {
  /**
   * Whether the drawer is open
   */
  isOpen: boolean;

  /**
   * Icon size (default: 16px)
   */
  size?: number;

  /**
   * Icon color (default: currentColor)
   */
  color?: string;
}

export const DrawerIcon: Component<DrawerIconProps> = (props) => {
  const size = () => props.size ?? 16;
  const color = () => props.color ?? "currentColor";
  const isOpen = () => props.isOpen;

  return (
    <svg
      width={size()}
      height={size()}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", "flex-shrink": 0 }}
      aria-hidden="true"
    >
      {/* Rectangle frame - empty square */}
      <rect
        x="2"
        y="2"
        width="12"
        height="12"
        rx="2"
        fill="none"
        stroke={color()}
        stroke-width="1.5"
        opacity="1"
      />
      {/* Vertical line inside - moves left to right when opening */}
      <rect
        x="3.5"
        y="4"
        width="2"
        height="8"
        rx="1"
        fill={color()}
        style={{
          transform: isOpen() ? "translateX(6.5px)" : "translateX(0px)",
          transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </svg>
  );
};
