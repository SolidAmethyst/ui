/**
 * Search Component
 * Search input with debounce and optional clear button
 */

import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  Show,
  splitProps,
} from "solid-js";
import { searchStyles } from "../lib/search.styles";
import type { SearchProps } from "../model/types";

export const Search: Component<SearchProps> = (props) => {
  const [local, others] = splitProps(props, [
    "value",
    "placeholder",
    "disabled",
    "debounceMs",
    "onSearch",
    "onInput",
    "showIcon",
    "showClear",
    "class",
    "style",
    "name",
    "id",
    "autofocus",
    "defaultPlaceholder",
    "clearButtonAriaLabel",
    "searchIcon",
    "clearIcon",
  ]);

  // Initialize with empty string, will be synced via createEffect if value prop is provided
  const [inputValue, setInputValue] = createSignal("");
  const [isFocused, setIsFocused] = createSignal(false);
  let inputRef: HTMLInputElement | undefined;
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  const debounceDelay = () => local.debounceMs ?? 300;

  // Sync external value prop
  const handleValueChange = (newValue: string) => {
    setInputValue(newValue);

    // Call onInput immediately
    if (local.onInput) {
      local.onInput(newValue);
    }

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new debounced timer
    debounceTimer = setTimeout(() => {
      if (local.onSearch) {
        local.onSearch(newValue);
      }
    }, debounceDelay());
  };

  // Handle input change
  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    handleValueChange(target.value);
  };

  // Handle clear button click
  const handleClear = () => {
    if (inputRef) {
      inputRef.value = "";
      handleValueChange("");
      inputRef.focus();
    }
  };

  // Cleanup debounce timer
  onCleanup(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  });

  // Sync with external value prop using createEffect
  createEffect(() => {
    const value = local.value;
    if (value !== undefined) {
      setInputValue(value);
    }
  });

  const currentValue = () => {
    const val = local.value;
    return val !== undefined ? val : inputValue();
  };

  // Auto-focus
  onMount(() => {
    if (local.autofocus && inputRef) {
      inputRef.focus();
    }
  });

  const styleOptions = () => ({
    isDisabled: local.disabled ?? false,
    isFocused: isFocused(),
  });

  return (
    <div
      class={local.class}
      style={{
        ...searchStyles.container(),
        ...local.style,
      }}
    >
      <div style={searchStyles.wrapper()}>
        <Show when={local.showIcon !== false}>
          <span
            class="material-symbols-rounded"
            style={searchStyles.icon(styleOptions())}
          >
            {local.searchIcon ?? "search"}
          </span>
        </Show>

        <input
          ref={inputRef}
          type="text"
          name={local.name}
          id={local.id}
          value={currentValue()}
          placeholder={
            local.placeholder ?? local.defaultPlaceholder ?? "Search..."
          }
          disabled={local.disabled}
          autofocus={local.autofocus}
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={searchStyles.input(styleOptions())}
          {...others}
        />

        <Show when={local.showClear !== false && currentValue().length > 0}>
          <button
            type="button"
            onClick={handleClear}
            disabled={local.disabled}
            class="material-symbols-rounded"
            style={searchStyles.clearButton(styleOptions())}
            aria-label={local.clearButtonAriaLabel ?? "Clear search"}
          >
            {local.clearIcon ?? "close"}
          </button>
        </Show>
      </div>
    </div>
  );
};
