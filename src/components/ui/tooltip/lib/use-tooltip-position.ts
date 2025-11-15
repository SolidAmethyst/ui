/**
 * Tooltip Position Hook
 * Calculates tooltip position with viewport boundary detection
 */

import { createEffect, onCleanup } from "solid-js";
import type { TooltipPosition } from "../model/types";

export function useTooltipPosition(
  tooltipRef: () => HTMLElement | undefined,
  triggerRef: () => HTMLElement | undefined,
  position: () => TooltipPosition,
  isVisible: () => boolean,
) {
  const updatePosition = () => {
    const tooltip = tooltipRef();
    const trigger = triggerRef();

    if (!tooltip || !trigger || !isVisible()) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const spacing = 8;

    let top = 0;
    let left = 0;
    let adjustedPosition = position();

    switch (position()) {
      case "top": {
        top = triggerRect.top - tooltipRect.height - spacing;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;

        // Adjust if tooltip goes off screen
        if (top < 0) {
          // Flip to bottom
          top = triggerRect.bottom + spacing;
          adjustedPosition = "bottom";
        }
        if (left < spacing) {
          left = spacing;
        }
        if (left + tooltipRect.width > viewportWidth - spacing) {
          left = viewportWidth - tooltipRect.width - spacing;
        }
        break;
      }
      case "bottom": {
        top = triggerRect.bottom + spacing;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;

        // Adjust if tooltip goes off screen
        if (top + tooltipRect.height > viewportHeight) {
          // Flip to top
          top = triggerRect.top - tooltipRect.height - spacing;
          adjustedPosition = "top";
        }
        if (left < spacing) {
          left = spacing;
        }
        if (left + tooltipRect.width > viewportWidth - spacing) {
          left = viewportWidth - tooltipRect.width - spacing;
        }
        break;
      }
      case "left": {
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - spacing;

        // Adjust if tooltip goes off screen
        if (left < 0) {
          // Flip to right
          left = triggerRect.right + spacing;
          adjustedPosition = "right";
        }
        if (top < spacing) {
          top = spacing;
        }
        if (top + tooltipRect.height > viewportHeight - spacing) {
          top = viewportHeight - tooltipRect.height - spacing;
        }
        break;
      }
      case "right": {
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + spacing;

        // Adjust if tooltip goes off screen
        if (left + tooltipRect.width > viewportWidth) {
          // Flip to left
          left = triggerRect.left - tooltipRect.width - spacing;
          adjustedPosition = "left";
        }
        if (top < spacing) {
          top = spacing;
        }
        if (top + tooltipRect.height > viewportHeight - spacing) {
          top = viewportHeight - tooltipRect.height - spacing;
        }
        break;
      }
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    return { top, left, adjustedPosition };
  };

  createEffect(() => {
    if (isVisible()) {
      // Update position when tooltip becomes visible
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updatePosition();
        });
      });

      // Update on scroll and resize
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      onCleanup(() => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      });
    }
  });
}
