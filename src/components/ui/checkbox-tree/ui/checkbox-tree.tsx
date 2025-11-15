/**
 * CheckboxTree Component
 * Hierarchical checkbox tree component
 */

import { Component, For, Show, createMemo } from "solid-js";
import { Checkbox } from "../../checkbox";
import { checkboxTreeStyles } from "../lib/checkbox-tree.styles";
import { useCheckboxTreeState } from "../lib/use-checkbox-tree-state";
import type { CheckboxTreeProps, CheckboxTreeNode } from "../model/types";

interface TreeNodeProps {
  node: CheckboxTreeNode;
  level: number;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  onChange: (nodeId: string, checked: boolean) => void;
}

const TreeNode: Component<TreeNodeProps> = (props) => {
  const hasChildren = () =>
    props.node.children && props.node.children.length > 0;

  return (
    <div style={checkboxTreeStyles.node(props.level)}>
      <div
        style={checkboxTreeStyles.nodeContent()}
        onMouseEnter={(e) => {
          if (!props.disabled) {
            const hoverStyles = checkboxTreeStyles.nodeContentHover();
            e.currentTarget.style.background = hoverStyles.background as string;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "";
        }}
      >
        <Checkbox
          checked={props.checked}
          indeterminate={props.indeterminate}
          disabled={props.disabled}
          onChange={(checked) => props.onChange(props.node.id, checked)}
        />
        <span style={checkboxTreeStyles.label(props.disabled)}>
          {props.node.label}
        </span>
      </div>
      <Show when={hasChildren()}>
        <For each={props.node.children}>
          {(child) => {
            const childState = createMemo(() => {
              // This will be provided by parent component
              return { checked: false, indeterminate: false };
            });
            return (
              <TreeNode
                node={child}
                level={props.level + 1}
                checked={childState().checked}
                indeterminate={childState().indeterminate}
                disabled={child.disabled ?? false}
                onChange={props.onChange}
              />
            );
          }}
        </For>
      </Show>
    </div>
  );
};

export const CheckboxTree: Component<CheckboxTreeProps> = (props) => {
  const { nodeStates, updateNode } = useCheckboxTreeState(
    () => props.nodes,
    props.onChange,
    props.onTreeChange,
  );

  // Recursive render function
  const renderNode = (node: CheckboxTreeNode, level: number) => {
    // Use createMemo to make state reactive
    const state = createMemo(() => {
      return (
        nodeStates().get(node.id) ?? { checked: false, indeterminate: false }
      );
    });
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div style={checkboxTreeStyles.node(level)}>
        <div
          style={checkboxTreeStyles.nodeContent()}
          onMouseEnter={(e) => {
            if (!(node.disabled ?? false)) {
              const hoverStyles = checkboxTreeStyles.nodeContentHover();
              e.currentTarget.style.background =
                hoverStyles.background as string;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "";
          }}
        >
          <Checkbox
            checked={state().checked}
            indeterminate={state().indeterminate}
            disabled={node.disabled ?? false}
            material3={props.material3 ?? false}
            onChange={(checked) => updateNode(node.id, checked)}
          />
          <span style={checkboxTreeStyles.label(node.disabled ?? false)}>
            {node.label}
          </span>
        </div>
        <Show when={hasChildren}>
          <For each={node.children}>
            {(child) => renderNode(child, level + 1)}
          </For>
        </Show>
      </div>
    );
  };

  return (
    <div
      class={`checkbox-tree ${props.class || ""}`}
      style={{
        ...checkboxTreeStyles.container(),
        ...props.style,
      }}
    >
      <For each={props.nodes}>{(node) => renderNode(node, 0)}</For>
    </div>
  );
};
