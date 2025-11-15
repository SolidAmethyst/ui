/**
 * Glass Component
 * Glass morphism effect component with Tauri integration support
 */

import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { getCurrentEngine } from "../../../../engines";
import type { GlassEffectConfig } from "../../../../engines/types/engine-interface";
import { glassStyles } from "../lib/glass.styles";
import type { GlassProps } from "../model/types";

// Tauri API types (same as in tauri-engine)
declare global {
  interface Window {
    __TAURI__?: {
      invoke: <T = unknown>(
        command: string,
        args?: Record<string, unknown>,
      ) => Promise<T>;
    };
  }
}

export const Glass: Component<GlassProps> = (props) => {
  const [useNative, setUseNative] = createSignal(false);
  const [isTauriAvailable, setIsTauriAvailable] = createSignal(false);

  // Determine if we should use native effects
  const shouldUseNative = () => {
    return props.useNative !== false && isTauriAvailable();
  };

  // Get effective variant
  const getEffectiveVariant = (): GlassEffectConfig["type"] => {
    const variant = props.variant ?? "matte";
    if (variant === "auto") {
      // Auto-detect: prefer native if available, otherwise use matte
      return shouldUseNative() ? "matte" : "matte";
    }
    return variant as GlassEffectConfig["type"];
  };

  // Apply glass effect via engine
  const applyNativeEffect = async () => {
    if (!shouldUseNative()) return;

    try {
      const engine = await getCurrentEngine();
      const isAvailable = await engine.isAvailable();

      if (!isAvailable) {
        setUseNative(false);
        return;
      }

      const config: GlassEffectConfig = {
        type: getEffectiveVariant(),
        blur: props.blur,
        opacity: props.opacity,
        tintColor: props.tintColor,
        tintOpacity: props.tintOpacity,
        saturation: props.saturation,
        darkness: props.darkness,
      };

      await engine.applyGlassEffect(config);
      setUseNative(true);
    } catch (error) {
      console.warn(
        "[Glass] Failed to apply native effect, using CSS fallback:",
        error,
      );
      setUseNative(false);
    }
  };

  // Update glass effect
  const updateNativeEffect = async () => {
    if (!shouldUseNative()) return;

    try {
      const engine = await getCurrentEngine();
      const isAvailable = await engine.isAvailable();

      if (!isAvailable) return;

      const config: Partial<GlassEffectConfig> = {
        blur: props.blur,
        opacity: props.opacity,
        tintColor: props.tintColor,
        tintOpacity: props.tintOpacity,
        saturation: props.saturation,
        darkness: props.darkness,
      };

      await engine.updateGlassEffect(config);
    } catch (error) {
      console.warn("[Glass] Failed to update native effect:", error);
    }
  };

  // Remove glass effect
  const removeNativeEffect = async () => {
    if (!shouldUseNative()) return;

    try {
      const engine = await getCurrentEngine();
      const isAvailable = await engine.isAvailable();

      if (!isAvailable) return;

      await engine.removeGlassEffect();
    } catch (error) {
      console.warn("[Glass] Failed to remove native effect:", error);
    }
  };

  // Check Tauri availability on mount
  onMount(async () => {
    const hasTauri =
      typeof window !== "undefined" &&
      window.__TAURI__ !== undefined &&
      typeof window.__TAURI__?.invoke === "function";

    setIsTauriAvailable(hasTauri);

    if (hasTauri && shouldUseNative()) {
      await applyNativeEffect();
    }
  });

  // Update effect when props change
  createEffect(() => {
    // Track all relevant props by using them in computation
    const variant = props.variant;
    const blur = props.blur;
    const opacity = props.opacity;
    const tintColor = props.tintColor;
    const tintOpacity = props.tintOpacity;
    const saturation = props.saturation;
    const darkness = props.darkness;
    const useNative = props.useNative;

    // Prevent unused variable warnings
    void variant;
    void blur;
    void opacity;
    void tintColor;
    void tintOpacity;
    void saturation;
    void darkness;
    void useNative;

    if (shouldUseNative()) {
      updateNativeEffect().catch((err) => {
        console.warn("[Glass] Failed to update native effect:", err);
      });
    }
  });

  // Cleanup on unmount
  onCleanup(async () => {
    if (shouldUseNative()) {
      await removeNativeEffect();
    }
  });

  return (
    <div
      class={`glass-container ${props.class || ""}`}
      style={{
        ...glassStyles.container(props, useNative()),
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};
