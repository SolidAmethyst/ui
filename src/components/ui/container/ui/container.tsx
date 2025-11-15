/**
 * Container Component
 * Centered container with max-width constraint
 */

import type { JSX } from "solid-js";
import { Component } from "solid-js";
import { containerStyles } from "../lib/container.styles";
import type { ContainerProps } from "../model/types";

export const Container: Component<ContainerProps> = (props) => {
  const styles = (): JSX.CSSProperties => {
    return {
      ...containerStyles({
        maxWidth: props.maxWidth,
        padding: props.padding,
      }),
      ...(props.style as JSX.CSSProperties),
    };
  };

  return (
    <div class={`container ${props.class || ""}`} style={styles()}>
      {props.children}
    </div>
  );
};
