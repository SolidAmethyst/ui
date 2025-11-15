/**
 * Select Component
 * Dropdown select component for choosing from a list of options
 */

import {
  Component,
  createSignal,
  For,
  onCleanup,
  Show,
  splitProps,
} from "solid-js";
import { Scrollbar } from "../../scrollbar";
import { selectStyles } from "../lib/select.styles";
import type { SelectProps } from "../model/types";

export const Select = <T extends string = string>(
  props: SelectProps<T>,
): ReturnType<Component<SelectProps<T>>> => {
  const [local, others] = splitProps(props, [
    "options",
    "value",
    "onChange",
    "placeholder",
    "disabled",
    "class",
    "style",
  ]);

  const [isOpen, setIsOpen] = createSignal(false);
  let triggerRef: HTMLButtonElement | undefined;
  let dropdownRef: HTMLDivElement | undefined;

  const selectedOption = () => {
    return local.options.find((opt) => opt.value === local.value);
  };

  const handleToggle = () => {
    if (!local.disabled) {
      setIsOpen(!isOpen());
    }
  };

  const handleSelect = (value: T) => {
    local.onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isOpen() &&
      triggerRef &&
      !triggerRef.contains(event.target as Node) &&
      dropdownRef &&
      !dropdownRef.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  if (typeof document !== "undefined") {
    document.addEventListener("click", handleClickOutside);
    onCleanup(() => {
      document.removeEventListener("click", handleClickOutside);
    });
  }

  return (
    <div
      class={local.class}
      style={{
        ...selectStyles.container(),
        ...local.style,
      }}
      {...others}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        disabled={local.disabled}
        style={{
          ...selectStyles.trigger({
            isOpen: isOpen(),
            isDisabled: local.disabled ?? false,
          }),
          ...(isOpen()
            ? selectStyles.triggerOpen({
                isOpen: isOpen(),
                isDisabled: local.disabled ?? false,
              })
            : {}),
        }}
        onMouseEnter={(e) => {
          if (!local.disabled) {
            if (isOpen()) {
              const hoverStyles = selectStyles.triggerOpenHover({
                isOpen: isOpen(),
                isDisabled: local.disabled ?? false,
              });
              e.currentTarget.style.borderColor = hoverStyles[
                "border-color"
              ] as string;
              e.currentTarget.style.background =
                hoverStyles.background as string;
              e.currentTarget.style.boxShadow = hoverStyles[
                "box-shadow"
              ] as string;
            } else {
              const hoverStyles = selectStyles.triggerHover({
                isOpen: isOpen(),
                isDisabled: local.disabled ?? false,
              });
              e.currentTarget.style.borderColor = hoverStyles[
                "border-color"
              ] as string;
              e.currentTarget.style.background =
                hoverStyles.background as string;
              e.currentTarget.style.boxShadow = hoverStyles[
                "box-shadow"
              ] as string;
            }
          }
        }}
        onMouseLeave={(e) => {
          if (!local.disabled) {
            if (isOpen()) {
              const normalStyles = selectStyles.triggerOpen({
                isOpen: isOpen(),
                isDisabled: local.disabled ?? false,
              });
              e.currentTarget.style.borderColor = normalStyles[
                "border-color"
              ] as string;
              e.currentTarget.style.background =
                normalStyles.background as string;
              e.currentTarget.style.boxShadow = "none";
            } else {
              e.currentTarget.style.background = "hsl(var(--background))";
              e.currentTarget.style.borderColor = "hsl(var(--border))";
              e.currentTarget.style.boxShadow = "none";
            }
          }
        }}
      >
        <span style={{ flex: "1", "text-align": "left" }}>
          {selectedOption()?.label ?? local.placeholder ?? "Select..."}
        </span>
        <span
          class="material-symbols-rounded"
          style={selectStyles.icon({
            isOpen: isOpen(),
            isDisabled: local.disabled ?? false,
          })}
        >
          expand_more
        </span>
      </button>

      <Show when={isOpen()}>
        <div
          ref={dropdownRef}
          style={selectStyles.dropdown({
            isOpen: isOpen(),
            isDisabled: local.disabled ?? false,
          })}
        >
          <Scrollbar
            direction="vertical"
            style={{
              width: "100%",
              height: "100%",
              flex: "1",
              "min-height": "0",
            }}
          >
            <For each={local.options}>
              {(option) => {
                const isSelected = () => option.value === local.value;
                const isDisabled = () => option.disabled ?? false;

                return (
                  <div
                    onClick={() => {
                      if (!isDisabled()) {
                        handleSelect(option.value);
                      }
                    }}
                    style={{
                      ...selectStyles.option({
                        isOpen: isOpen(),
                        isDisabled: isDisabled(),
                      }),
                      ...(isSelected()
                        ? selectStyles.optionSelected({
                            isOpen: isOpen(),
                            isDisabled: isDisabled(),
                          })
                        : {}),
                      ...(isDisabled() ? selectStyles.optionDisabled() : {}),
                    }}
                    onMouseEnter={(e) => {
                      if (!isDisabled()) {
                        if (isSelected()) {
                          const hoverStyles = selectStyles.optionSelectedHover({
                            isOpen: isOpen(),
                            isDisabled: isDisabled(),
                          });
                          e.currentTarget.style.background =
                            hoverStyles.background as string;
                          e.currentTarget.style.color =
                            hoverStyles.color as string;
                          e.currentTarget.style.boxShadow = hoverStyles[
                            "box-shadow"
                          ] as string;
                          e.currentTarget.style.textShadow = hoverStyles[
                            "text-shadow"
                          ] as string;
                        } else {
                          const hoverStyles = selectStyles.optionHover({
                            isOpen: isOpen(),
                            isDisabled: isDisabled(),
                          });
                          e.currentTarget.style.background =
                            hoverStyles.background as string;
                          e.currentTarget.style.boxShadow = hoverStyles[
                            "box-shadow"
                          ] as string;
                        }
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isDisabled()) {
                        if (isSelected()) {
                          const normalStyles = selectStyles.optionSelected({
                            isOpen: isOpen(),
                            isDisabled: isDisabled(),
                          });
                          e.currentTarget.style.background =
                            normalStyles.background as string;
                          e.currentTarget.style.color =
                            normalStyles.color as string;
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.textShadow = "none";
                        } else {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.boxShadow = "none";
                        }
                      }
                    }}
                  >
                    <span style={selectStyles.optionLabel()}>
                      {option.label}
                    </span>
                    <Show when={option.description}>
                      <span
                        style={selectStyles.optionDescription({
                          isOpen: isOpen(),
                          isDisabled: isDisabled(),
                        })}
                      >
                        {option.description}
                      </span>
                    </Show>
                  </div>
                );
              }}
            </For>
          </Scrollbar>
        </div>
      </Show>
    </div>
  );
};
