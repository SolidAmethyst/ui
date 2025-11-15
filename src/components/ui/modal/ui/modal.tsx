/**
 * Modal Component
 * Modal dialog component with overlay, focus trap, and keyboard navigation
 * Renders in a portal to body to ensure proper positioning relative to viewport
 */

import {
  Component,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { render } from "solid-js/web";
import { modalStyles } from "../lib/modal.styles";
import { useFocusTrap } from "../lib/use-focus-trap";
import type { ModalProps } from "../model/types";

export const Modal: Component<ModalProps> = (props) => {
  const showBackdrop = () => props.showBackdrop ?? true;
  const closeOnBackdropClick = () => props.closeOnBackdropClick ?? true;
  const closeOnEscape = () => props.closeOnEscape ?? true;
  const trapFocus = () => props.trapFocus ?? true;
  const zIndex = () => props.zIndex ?? 10000;
  const size = () => props.size ?? "md";

  // Local state for smooth animation - always starts closed
  const [localIsOpen, setLocalIsOpen] = createSignal(false);

  let portalContainer: HTMLDivElement | null = null;
  let dispose: (() => void) | null = null;
  let modalContentRef: HTMLDivElement | undefined;

  const handleBackdropClick = () => {
    if (closeOnBackdropClick() && props.isOpen) {
      props.onClose();
    }
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && closeOnEscape() && props.isOpen) {
      props.onClose();
    }
  };

  // Sync local state with props for smooth animation
  createEffect(() => {
    const shouldBeOpen = props.isOpen;

    // Use requestAnimationFrame to ensure smooth transition
    if (shouldBeOpen) {
      // Opening: render closed first, then open
      if (!localIsOpen()) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setLocalIsOpen(true);
          });
        });
      }
    } else {
      // Closing: update immediately
      setLocalIsOpen(false);
    }
  });

  // Setup focus trap
  useFocusTrap(
    () => modalContentRef,
    () => trapFocus() && localIsOpen(),
  );

  // Render portal once and update styles reactively
  const renderPortal = () => {
    if (!portalContainer) return;

    dispose = render(
      () => (
        <>
          {/* Backdrop */}
          <Show when={showBackdrop()}>
            <div
              onClick={handleBackdropClick}
              style={modalStyles.backdrop(
                localIsOpen(),
                showBackdrop(),
                zIndex(),
              )}
            />
          </Show>

          {/* Modal Container */}
          <div
            style={modalStyles.container(localIsOpen(), zIndex())}
            onClick={(e) => {
              // Close if clicking on container (not content)
              if (e.target === e.currentTarget && closeOnBackdropClick()) {
                props.onClose();
              }
            }}
          >
            {/* Modal Content */}
            <div
              ref={modalContentRef}
              class={`modal-content ${props.class || ""}`}
              style={{
                ...modalStyles.content(localIsOpen(), size()),
                ...props.style,
              }}
              role="dialog"
              aria-modal="true"
            >
              {props.children}
            </div>
          </div>
        </>
      ),
      portalContainer!,
    );
  };

  onMount(() => {
    // Create container in body for portal
    portalContainer = document.createElement("div");
    document.body.appendChild(portalContainer);

    // Render once - Solid.js will handle reactive updates
    renderPortal();

    // Add escape key handler
    if (closeOnEscape()) {
      document.addEventListener("keydown", handleEscape);
    }
  });

  onCleanup(() => {
    // Remove escape key handler
    document.removeEventListener("keydown", handleEscape);

    if (dispose) {
      dispose();
    }
    if (portalContainer && portalContainer.parentNode) {
      portalContainer.parentNode.removeChild(portalContainer);
    }
  });

  // Return empty fragment - content is rendered in portal
  return <></>;
};
