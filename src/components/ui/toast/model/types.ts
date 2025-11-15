/**
 * Toast Component Types
 * Toast notification system with variants and positioning
 */

import type { JSX } from "solid-js";

export type ToastVariant = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
  onClose?: () => void;
}

export interface ToastProps {
  /**
   * Toast data
   */
  toast: Toast;

  /**
   * Callback when toast should be closed
   */
  onClose: (id: string) => void;
}

export interface ToastProviderProps {
  /**
   * Children elements
   */
  children: JSX.Element;

  /**
   * Default position for toasts (default: 'top-right')
   */
  position?: ToastPosition;

  /**
   * Default duration in milliseconds (default: 5000)
   */
  duration?: number;
}

export interface ToastContextValue {
  toasts: () => Toast[];
  showToast: (toast: Omit<Toast, "id">) => string;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
}
