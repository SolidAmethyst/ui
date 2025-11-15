/**
 * FilterBar Component
 * Filter bar component for advanced filtering options
 */

import { Component, For, Show, createSignal, createEffect } from "solid-js";
import { Checkbox } from "../../../components/ui/checkbox";
import { Search } from "../../../components/ui/search";
import { Select } from "../../../components/ui/select";
import { Slider } from "../../../components/ui/slider";
import { filterBarStyles } from "../lib/filter-bar.styles";
import type { FilterBarProps, FilterItem } from "../model/types";

export const FilterBar: Component<FilterBarProps> = (props) => {
  const showClearAll = () => props.showClearAll ?? true;

  const [filterValues, setFilterValues] = createSignal<
    Record<string, string | number | string[] | number[]>
  >({});

  // Initialize filter values from props
  createEffect(() => {
    const values: Record<string, string | number | string[] | number[]> = {};
    props.filters.forEach((filter) => {
      if (filter.value !== undefined) {
        values[filter.id] = filter.value;
      }
    });
    setFilterValues(values);
  });

  const handleFilterChange = (
    filterId: string,
    value: string | number | string[] | number[],
  ) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }));
    props.onFilterChange?.(filterId, value);

    // Call onFiltersChange with all current values
    const newValues = { ...filterValues(), [filterId]: value };
    props.onFiltersChange?.(newValues);
  };

  const handleClearAll = () => {
    const clearedValues: Record<string, string | number | string[] | number[]> =
      {};
    props.filters.forEach((filter) => {
      if (filter.type === "checkbox") {
        clearedValues[filter.id] = [];
      } else {
        clearedValues[filter.id] = "";
      }
    });
    setFilterValues(clearedValues);
    props.onFiltersChange?.(clearedValues);
  };

  const renderFilter = (filter: FilterItem) => {
    const currentValue = () => filterValues()[filter.id] ?? filter.value ?? "";

    switch (filter.type) {
      case "checkbox":
        return (
          <div style={filterBarStyles.filterItem()}>
            <Show when={filter.label}>
              <label style={filterBarStyles.filterLabel()}>
                {filter.label}
              </label>
            </Show>
            <div style={filterBarStyles.checkboxGroup()}>
              <For each={filter.options}>
                {(option) => {
                  const checked = () => {
                    const val = currentValue() as string[];
                    return (
                      Array.isArray(val) && val.includes(String(option.value))
                    );
                  };
                  return (
                    <Checkbox
                      checked={checked()}
                      label={option.label}
                      disabled={filter.disabled || option.disabled}
                      onChange={(checked) => {
                        const val = (currentValue() as string[]) || [];
                        const newVal = checked
                          ? [...val, String(option.value)]
                          : val.filter((v) => v !== String(option.value));
                        handleFilterChange(filter.id, newVal);
                      }}
                    />
                  );
                }}
              </For>
            </div>
          </div>
        );

      case "select":
        return (
          <div style={filterBarStyles.filterItem()}>
            <Show when={filter.label}>
              <label style={filterBarStyles.filterLabel()}>
                {filter.label}
              </label>
            </Show>
            <Select
              options={
                filter.options?.map((opt) => ({
                  value: String(opt.value),
                  label: opt.label,
                  disabled: opt.disabled,
                })) ?? []
              }
              value={String(currentValue()) || ""}
              onChange={(value) => handleFilterChange(filter.id, value)}
              placeholder={filter.placeholder ?? "Select..."}
              disabled={filter.disabled}
            />
          </div>
        );

      case "text":
        return (
          <div style={filterBarStyles.filterItem()}>
            <Show when={filter.label}>
              <label style={filterBarStyles.filterLabel()}>
                {filter.label}
              </label>
            </Show>
            <Search
              value={String(currentValue())}
              onInput={(value) => handleFilterChange(filter.id, value)}
              placeholder={filter.placeholder}
              disabled={filter.disabled}
              showIcon={false}
            />
          </div>
        );

      case "date":
        return (
          <div style={filterBarStyles.filterItem()}>
            <Show when={filter.label}>
              <label style={filterBarStyles.filterLabel()}>
                {filter.label}
              </label>
            </Show>
            <input
              type="date"
              value={String(currentValue())}
              disabled={filter.disabled}
              onChange={(e) => {
                handleFilterChange(filter.id, e.currentTarget.value);
              }}
              style={filterBarStyles.dateInput()}
            />
          </div>
        );

      case "range":
        return (
          <div style={filterBarStyles.filterItem()}>
            <Show when={filter.label}>
              <label style={filterBarStyles.filterLabel()}>
                {filter.label}
              </label>
            </Show>
            <Slider
              value={Number(currentValue()) || filter.min || 0}
              min={filter.min ?? 0}
              max={filter.max ?? 100}
              step={filter.step ?? 1}
              onChange={(value) => handleFilterChange(filter.id, value)}
              label={undefined}
              showValue={true}
              disabled={filter.disabled}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      class={`filter-bar ${props.class || ""}`}
      style={{
        ...filterBarStyles.container(),
        ...props.style,
      }}
    >
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          gap: "var(--spacing-md)",
          "align-items": "flex-start",
          flex: "1",
          "min-width": "0",
        }}
      >
        <For each={props.filters}>{(filter) => renderFilter(filter)}</For>
      </div>
      <Show when={showClearAll()}>
        <button
          type="button"
          onClick={handleClearAll}
          style={filterBarStyles.clearButton()}
          onMouseEnter={(e) => {
            const hoverStyles = filterBarStyles.clearButtonHover();
            e.currentTarget.style.background = hoverStyles.background as string;
            e.currentTarget.style.color = hoverStyles.color as string;
          }}
          onMouseLeave={(e) => {
            const baseStyles = filterBarStyles.clearButton();
            e.currentTarget.style.background = baseStyles.background as string;
            e.currentTarget.style.color = baseStyles.color as string;
          }}
          aria-label={props.clearAllLabel ?? "Clear All"}
          title={props.clearAllLabel ?? "Clear All"}
        >
          <span
            class="material-symbols-rounded"
            style={{ "font-size": "18px" }}
          >
            delete
          </span>
        </button>
      </Show>
    </div>
  );
};
