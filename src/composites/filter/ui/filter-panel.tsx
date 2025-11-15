/**
 * FilterPanel Component
 * Filter panel component in modal format with sections for file types, visibility, and size
 */

import type { JSX } from "solid-js";
import { Component, For, Show, createEffect, createSignal } from "solid-js";
import { Checkbox } from "../../../components/ui/checkbox";
import { Modal } from "../../../components/ui/modal";
import { NumberInput } from "../../../components/ui/number-input";
import { Scrollbar } from "../../../components/ui/scrollbar";
import { Typography } from "../../../components/ui/typography";
import { filterPanelStyles } from "../lib/filter-panel.styles";
import type {
  FileTypeFilter,
  FilterPanelProps,
} from "../model/filter-panel.types";

export const FilterPanel: Component<FilterPanelProps> = (props) => {
  const size = () => {
    const baseSize = props.size ?? "md";
    // Reduce modal width by 30% for FilterPanel
    if (baseSize === "md") {
      return "336px"; // 480px * 0.7 = 336px
    }
    return baseSize;
  };
  const title = () => props.title ?? "Filters";

  const [fileTypes, setFileTypes] = createSignal<FileTypeFilter[]>(
    props.fileTypes ?? [],
  );
  const [showHidden, setShowHidden] = createSignal(
    props.showHiddenFiles ?? false,
  );
  const [minSize, setMinSize] = createSignal(props.minFileSize ?? 0);
  const [maxSize, setMaxSize] = createSignal(props.maxFileSize ?? 0);

  // Sync with props
  createEffect(() => {
    if (props.fileTypes) {
      setFileTypes([...props.fileTypes]);
    }
  });

  createEffect(() => {
    if (props.showHiddenFiles !== undefined) {
      setShowHidden(props.showHiddenFiles);
    }
  });

  createEffect(() => {
    if (props.minFileSize !== undefined) {
      setMinSize(props.minFileSize);
    }
  });

  createEffect(() => {
    if (props.maxFileSize !== undefined) {
      setMaxSize(props.maxFileSize);
    }
  });

  const selectedCount = () => {
    return fileTypes().filter((ft) => ft.checked).length;
  };

  const totalCount = () => fileTypes().length;

  const handleFileTypeToggle = (id: string) => {
    const updated = fileTypes().map((ft) =>
      ft.id === id ? { ...ft, checked: !ft.checked } : ft,
    );
    setFileTypes(updated);
    props.onFileTypesChange?.(updated);
  };

  const handleToggleAll = () => {
    const allSelected = selectedCount() === totalCount();
    const updated = fileTypes().map((ft) => ({ ...ft, checked: !allSelected }));
    setFileTypes(updated);
    props.onFileTypesChange?.(updated);
  };

  const handleShowHiddenChange = (checked: boolean) => {
    setShowHidden(checked);
    props.onShowHiddenFilesChange?.(checked);
  };

  const handleMinSizeChange = (value: number | string) => {
    const numValue =
      typeof value === "number" ? value : parseInt(String(value), 10) || 0;
    setMinSize(numValue);
    props.onFileSizeChange?.(numValue, maxSize());
  };

  const handleMaxSizeChange = (value: number | string) => {
    const numValue =
      typeof value === "number" ? value : parseInt(String(value), 10) || 0;
    setMaxSize(numValue);
    props.onFileSizeChange?.(minSize(), numValue);
  };

  const handleReset = () => {
    const resetFileTypes = fileTypes().map((ft) => ({ ...ft, checked: false }));
    setFileTypes(resetFileTypes);
    setShowHidden(false);
    setMinSize(0);
    setMaxSize(0);
    props.onFileTypesChange?.(resetFileTypes);
    props.onShowHiddenFilesChange?.(false);
    props.onFileSizeChange?.(0, 0);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      size={size()}
      showBackdrop={true}
      closeOnBackdropClick={true}
      zIndex={10000}
      class={props.class}
      style={{
        ...(props.style as JSX.CSSProperties),
        "max-height": "80vh", // Reduce height by 20% (100vh * 0.8 = 80vh)
      }}
    >
      <div style={filterPanelStyles.container()}>
        {/* Header */}
        <div style={filterPanelStyles.header()}>
          <Typography variant="h6" style={filterPanelStyles.title()}>
            {title()}
          </Typography>
          <button
            onClick={() => props.onClose()}
            class="control-btn close-btn"
            style={filterPanelStyles.closeButton()}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "hsl(var(--foreground))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "hsl(var(--muted-foreground))";
            }}
            aria-label="Close filters"
          >
            <span
              class="material-symbols-rounded"
              style={{ "font-size": "20px" }}
            >
              close
            </span>
          </button>
        </div>

        {/* Content */}
        <div style={filterPanelStyles.content()}>
          {/* File Types Section */}
          <Show when={fileTypes().length > 0}>
            <div style={filterPanelStyles.section()}>
              <Typography
                variant="small"
                style={filterPanelStyles.sectionTitle()}
              >
                File Types
              </Typography>
              <div style={filterPanelStyles.checkboxListContainer()}>
                <div style={filterPanelStyles.selectAllContainer()}>
                  <Checkbox
                    checked={selectedCount() === totalCount()}
                    indeterminate={
                      selectedCount() > 0 && selectedCount() < totalCount()
                    }
                    label={`Select All ${selectedCount()}/${totalCount()}`}
                    onChange={handleToggleAll}
                    material3={true}
                  />
                  <button
                    type="button"
                    onClick={handleReset}
                    style={filterPanelStyles.resetButton()}
                    onMouseEnter={(e) => {
                      const hoverStyles = filterPanelStyles.resetButtonHover();
                      e.currentTarget.style.background =
                        hoverStyles.background as string;
                      e.currentTarget.style.color = hoverStyles.color as string;
                    }}
                    onMouseLeave={(e) => {
                      const baseStyles = filterPanelStyles.resetButton();
                      e.currentTarget.style.background =
                        baseStyles.background as string;
                      e.currentTarget.style.color = baseStyles.color as string;
                    }}
                    aria-label={props.resetLabel ?? "Reset"}
                    title={props.resetLabel ?? "Reset"}
                  >
                    <span
                      class="material-symbols-rounded"
                      style={{ "font-size": "20px" }}
                    >
                      restart_alt
                    </span>
                  </button>
                </div>
                <Scrollbar
                  style={filterPanelStyles.checkboxListScrollable()}
                  class="filter-panel-scrollable"
                  direction="vertical"
                  showArrows={true}
                >
                  <div style={filterPanelStyles.checkboxList()}>
                    <For each={fileTypes()}>
                      {(fileType) => {
                        const isSelected = () => fileType.checked;
                        const baseItemStyle = () => {
                          const base = filterPanelStyles.checkboxItem();
                          if (isSelected()) {
                            const selected =
                              filterPanelStyles.checkboxItemSelected();
                            return { ...base, ...selected };
                          }
                          return base;
                        };

                        return (
                          <div
                            style={baseItemStyle()}
                            onMouseEnter={(e) => {
                              const hoverStyles = isSelected()
                                ? filterPanelStyles.checkboxItemSelectedHover()
                                : filterPanelStyles.checkboxItemHover();
                              Object.keys(hoverStyles).forEach((key) => {
                                e.currentTarget.style[key as any] = hoverStyles[
                                  key as keyof typeof hoverStyles
                                ] as string;
                              });
                            }}
                            onMouseLeave={(e) => {
                              const baseStyles = baseItemStyle();
                              Object.keys(baseStyles).forEach((key) => {
                                e.currentTarget.style[key as any] = baseStyles[
                                  key as keyof typeof baseStyles
                                ] as string;
                              });
                            }}
                          >
                            <Checkbox
                              checked={fileType.checked}
                              label={fileType.label}
                              onChange={() => handleFileTypeToggle(fileType.id)}
                              material3={true}
                            />
                          </div>
                        );
                      }}
                    </For>
                  </div>
                </Scrollbar>
              </div>
            </div>
          </Show>

          {/* Visibility Section */}
          <div style={filterPanelStyles.section()}>
            <Typography
              variant="small"
              style={filterPanelStyles.sectionTitle()}
            >
              Visibility
            </Typography>
            <Checkbox
              checked={showHidden()}
              label="Hidden Files"
              onChange={handleShowHiddenChange}
              material3={true}
              class="filter-panel-checkbox-small"
            />
          </div>

          {/* Size Section */}
          <div style={filterPanelStyles.section()}>
            <Typography
              variant="small"
              style={filterPanelStyles.sectionTitle()}
            >
              Size (KB)
            </Typography>
            <div style={filterPanelStyles.sizeInputs()}>
              <div style={filterPanelStyles.sizeInputGroup()}>
                <label style={filterPanelStyles.sizeLabel()}>From</label>
                <NumberInput
                  value={minSize()}
                  onChange={handleMinSizeChange}
                  min={0}
                  themeAware={false}
                  style={filterPanelStyles.sizeInput()}
                />
              </div>
              <div style={filterPanelStyles.sizeInputGroup()}>
                <label style={filterPanelStyles.sizeLabel()}>To</label>
                <NumberInput
                  value={maxSize()}
                  onChange={handleMaxSizeChange}
                  min={0}
                  themeAware={false}
                  style={filterPanelStyles.sizeInput()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
