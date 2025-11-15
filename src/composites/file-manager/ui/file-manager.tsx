/**
 * FileManager Component
 * File manager component with navigation, search, and filtering
 */

import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onMount,
  Show,
  splitProps,
} from "solid-js";
import { Checkbox } from "../../../components/ui/checkbox";
import { fileManagerStyles } from "../lib/file-manager.styles";
import { useFileFilters } from "../lib/use-file-filters";
import { useFileNavigation } from "../lib/use-file-navigation";
import { useFileSelection } from "../lib/use-file-selection";
import type { FileItem, FileManagerProps, SortBy } from "../model/types";

export const FileManager = (props: FileManagerProps) => {
  const [local, others] = splitProps(props, [
    "files",
    "currentPath",
    "onPathChange",
    "onFileSelect",
    "onLoadFolder",
    "onLoadDrives",
    "allowedExtensions",
    "loading",
    "class",
    "style",
  ]);

  const loading = () => local.loading ?? false;
  const allowedExtensions = () => local.allowedExtensions || [];

  const [items, setItems] = createSignal<FileItem[]>(local.files);
  const [currentPath, setCurrentPath] = createSignal(local.currentPath);
  const [sortBy, setSortBy] = createSignal<SortBy>("name");
  const [searchQuery, setSearchQuery] = createSignal("");
  const [availableDrives, setAvailableDrives] = createSignal<string[]>([]);
  const [showHiddenFiles, setShowHiddenFiles] = createSignal(false);
  const [minFileSize, setMinFileSize] = createSignal<number>(0);
  const [maxFileSize, setMaxFileSize] = createSignal<number>(0);
  const [activeExtensions, setActiveExtensions] =
    createSignal<string[]>(allowedExtensions());

  const [mainCheckboxIndeterminate, setMainCheckboxIndeterminate] =
    createSignal(false);

  // Navigation hook
  const { breadcrumbs, getParentPath } = useFileNavigation(currentPath);

  // Selection hook
  const {
    selectedFiles,
    setSelectedFiles,
    toggleFile,
    selectAllFiles,
    deselectAll,
    handleFileClick,
    isSelected,
    selectedCount,
    clearSelection,
  } = useFileSelection();

  // Filter options
  const filterOptions = createMemo(() => ({
    searchQuery: searchQuery(),
    sortBy: sortBy(),
    allowedExtensions: activeExtensions(),
    showHiddenFiles: showHiddenFiles(),
    minFileSize: minFileSize(),
    maxFileSize: maxFileSize(),
  }));

  // Filters hook
  const { filteredItems } = useFileFilters(items, filterOptions);

  // Load folder contents
  const loadFolder = async (path: string) => {
    if (local.onLoadFolder) {
      try {
        const folderItems = await local.onLoadFolder(path);
        setItems(folderItems);
        setCurrentPath(path);
        local.onPathChange?.(path);
        clearSelection();
      } catch (error) {
        console.error("Failed to load folder:", error);
      }
    } else {
      // Fallback: just update path
      setCurrentPath(path);
      local.onPathChange?.(path);
    }
  };

  // Load drives
  const loadDrives = async () => {
    if (local.onLoadDrives) {
      try {
        const drives = await local.onLoadDrives();
        setAvailableDrives(drives);
      } catch (error) {
        console.error("Failed to load drives:", error);
      }
    }
  };

  // Navigate to parent folder
  const goUp = () => {
    const parentPath = getParentPath(currentPath());
    if (parentPath) {
      loadFolder(parentPath);
    }
  };

  // Navigate to folder
  const navigateToFolder = (path: string) => {
    loadFolder(path);
    clearSelection();
  };

  // Handle double click
  const handleDoubleClick = (item: FileItem) => {
    if (item.isFolder) {
      navigateToFolder(item.path);
    }
  };

  // Toggle extension filter
  const toggleExtension = (ext: string) => {
    setActiveExtensions((prev) => {
      if (prev.includes(ext)) {
        return prev.filter((e) => e !== ext);
      } else {
        return [...prev, ext];
      }
    });
  };

  // Toggle all extensions
  const toggleAllExtensions = () => {
    const total = allowedExtensions().length;
    const selected = activeExtensions().length;
    if (selected === total) {
      setActiveExtensions([]);
    } else {
      setActiveExtensions(allowedExtensions());
    }
  };

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectAllFiles(filteredItems());
    } else {
      deselectAll();
    }
  };

  // Update main checkbox indeterminate state
  createEffect(() => {
    const selected = selectedFiles();
    const filtered = filteredItems();

    const allFiles = filtered.filter((item) => !item.isFolder);
    const selectedCount = allFiles.filter((item) =>
      selected.includes(item.path),
    ).length;

    setMainCheckboxIndeterminate(
      selectedCount > 0 && selectedCount < allFiles.length,
    );
  });

  // Handle keyboard shortcuts
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.code === "KeyA") {
      event.preventDefault();
      selectAllFiles(filteredItems());
    }
  };

  // Update items when props.files changes
  createEffect(() => {
    setItems(local.files);
  });

  // Update current path when props.currentPath changes
  createEffect(() => {
    setCurrentPath(local.currentPath);
  });

  // Load drives on mount
  onMount(() => {
    loadDrives();
  });

  // Notify parent of selection changes
  createEffect(() => {
    const selected = selectedFiles();
    local.onFileSelect?.(selected);
  });

  // Get sort icon
  const getSortIcon = (column: SortBy) => {
    const current = sortBy();
    if (current === column) {
      return "arrow_upward";
    } else if (current === `${column}-desc`) {
      return "arrow_downward";
    }
    return "unfold_more";
  };

  // Format file size
  const formatSize = (size?: number): string => {
    if (!size) return "";
    return `${(size / 1024).toFixed(1)} KB`;
  };

  // Format date
  const formatDate = (modified?: string): string => {
    if (!modified) return "—";
    try {
      return new Date(parseInt(modified)).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  return (
    <div
      class={local.class}
      style={{
        ...fileManagerStyles.container(),
        ...local.style,
      }}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Header */}
      <div style={fileManagerStyles.header()}>
        <h2 style={fileManagerStyles.headerTitle()}>File Manager</h2>
      </div>

      {/* Toolbar */}
      <div style={fileManagerStyles.toolbar()}>
        {/* Drives */}
        <Show when={availableDrives().length > 0}>
          <div style={{ display: "flex", gap: "var(--spacing-xs)" }}>
            <For each={availableDrives()}>
              {(drive) => (
                <button
                  type="button"
                  onClick={() => loadFolder(drive)}
                  style={fileManagerStyles.driveButton()}
                  onMouseEnter={(e) => {
                    const hoverStyles = fileManagerStyles.driveButtonHover();
                    e.currentTarget.style.background =
                      hoverStyles.background as string;
                    e.currentTarget.style.color = hoverStyles.color as string;
                  }}
                  onMouseLeave={(e) => {
                    const normalStyles = fileManagerStyles.driveButton();
                    e.currentTarget.style.background =
                      normalStyles.background as string;
                    e.currentTarget.style.color = normalStyles.color as string;
                  }}
                  title={`Drive ${drive}`}
                >
                  {drive}
                </button>
              )}
            </For>
          </div>
        </Show>

        {/* Navigation Up */}
        <button
          type="button"
          onClick={goUp}
          style={fileManagerStyles.navigationButton()}
          onMouseEnter={(e) => {
            const hoverStyles = fileManagerStyles.navigationButtonHover();
            e.currentTarget.style.background = hoverStyles.background as string;
            e.currentTarget.style.color = hoverStyles.color as string;
          }}
          onMouseLeave={(e) => {
            const normalStyles = fileManagerStyles.navigationButton();
            e.currentTarget.style.background =
              normalStyles.background as string;
            e.currentTarget.style.color = normalStyles.color as string;
          }}
          title="Up"
        >
          <svg
            style={{ width: "14px", height: "14px" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>

        {/* Breadcrumbs */}
        <div style={fileManagerStyles.breadcrumbs()}>
          <For each={breadcrumbs()}>
            {(part, index) => (
              <>
                <button
                  type="button"
                  onClick={() => loadFolder(part.path)}
                  style={fileManagerStyles.breadcrumbButton()}
                  onMouseEnter={(e) => {
                    const hoverStyles =
                      fileManagerStyles.breadcrumbButtonHover();
                    e.currentTarget.style.background =
                      hoverStyles.background as string;
                    e.currentTarget.style.color = hoverStyles.color as string;
                  }}
                  onMouseLeave={(e) => {
                    const normalStyles = fileManagerStyles.breadcrumbButton();
                    e.currentTarget.style.background =
                      normalStyles.background as string;
                    e.currentTarget.style.color = normalStyles.color as string;
                  }}
                >
                  {part.name}
                </button>
                <Show when={index() < breadcrumbs().length - 1}>
                  <svg
                    style={fileManagerStyles.breadcrumbSeparator()}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Show>
              </>
            )}
          </For>
        </div>
      </div>

      {/* Search Panel */}
      <div style={fileManagerStyles.searchPanel()}>
        <div style={fileManagerStyles.searchInputContainer()}>
          <input
            type="text"
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            placeholder="Search files..."
            style={fileManagerStyles.searchInput()}
          />
          <div style={fileManagerStyles.searchControls()}>
            <Show when={searchQuery().length > 0}>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={fileManagerStyles.searchClearButton(
                  searchQuery().length > 0,
                )}
                onMouseEnter={(e) => {
                  const hoverStyles =
                    fileManagerStyles.searchClearButtonHover();
                  e.currentTarget.style.background =
                    hoverStyles.background as string;
                }}
                onMouseLeave={(e) => {
                  const normalStyles = fileManagerStyles.searchClearButton(
                    searchQuery().length > 0,
                  );
                  e.currentTarget.style.background =
                    normalStyles.background as string;
                }}
              >
                <svg
                  style={{ width: "16px", height: "16px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Show>
          </div>
        </div>
      </div>

      {/* File List */}
      <div style={fileManagerStyles.fileList()}>
        <Show
          when={!loading()}
          fallback={
            <div style={fileManagerStyles.loadingContainer()}>
              <div style={fileManagerStyles.loadingSpinner()} />
            </div>
          }
        >
          <table style={fileManagerStyles.table()}>
            <thead style={fileManagerStyles.thead()}>
              <tr>
                <td style={fileManagerStyles.th()}>
                  <div style={fileManagerStyles.checkboxCell()}>
                    <Checkbox
                      checked={
                        filteredItems().filter((item) => !item.isFolder)
                          .length > 0 &&
                        filteredItems()
                          .filter((item) => !item.isFolder)
                          .every((item) => isSelected(item.path))
                      }
                      indeterminate={mainCheckboxIndeterminate()}
                      onChange={handleSelectAll}
                      material3={true}
                      style={{
                        width: "14px",
                        height: "14px",
                      }}
                      title="Select all files"
                    />
                  </div>
                </td>
                <td style={fileManagerStyles.th()}>
                  <button
                    type="button"
                    onClick={() =>
                      setSortBy(sortBy() === "name" ? "name-desc" : "name")
                    }
                    style={fileManagerStyles.sortButton(
                      sortBy() === "name" || sortBy() === "name-desc",
                    )}
                    onMouseEnter={(e) => {
                      const hoverStyles = fileManagerStyles.sortButtonHover();
                      e.currentTarget.style.color = hoverStyles.color as string;
                    }}
                    onMouseLeave={(e) => {
                      const normalStyles = fileManagerStyles.sortButton(
                        sortBy() === "name" || sortBy() === "name-desc",
                      );
                      e.currentTarget.style.color =
                        normalStyles.color as string;
                    }}
                  >
                    Name
                  </button>
                </td>
                <td style={fileManagerStyles.th()}>
                  <button
                    type="button"
                    onClick={() =>
                      setSortBy(sortBy() === "size" ? "size-desc" : "size")
                    }
                    style={fileManagerStyles.sortButton(
                      sortBy() === "size" || sortBy() === "size-desc",
                    )}
                    onMouseEnter={(e) => {
                      const hoverStyles = fileManagerStyles.sortButtonHover();
                      e.currentTarget.style.color = hoverStyles.color as string;
                    }}
                    onMouseLeave={(e) => {
                      const normalStyles = fileManagerStyles.sortButton(
                        sortBy() === "size" || sortBy() === "size-desc",
                      );
                      e.currentTarget.style.color =
                        normalStyles.color as string;
                    }}
                  >
                    Size
                  </button>
                </td>
                <td style={fileManagerStyles.th()}>
                  <button
                    type="button"
                    onClick={() =>
                      setSortBy(sortBy() === "type" ? "type-desc" : "type")
                    }
                    style={fileManagerStyles.sortButton(
                      sortBy() === "type" || sortBy() === "type-desc",
                    )}
                    onMouseEnter={(e) => {
                      const hoverStyles = fileManagerStyles.sortButtonHover();
                      e.currentTarget.style.color = hoverStyles.color as string;
                    }}
                    onMouseLeave={(e) => {
                      const normalStyles = fileManagerStyles.sortButton(
                        sortBy() === "type" || sortBy() === "type-desc",
                      );
                      e.currentTarget.style.color =
                        normalStyles.color as string;
                    }}
                  >
                    Type
                  </button>
                </td>
                <td style={fileManagerStyles.th()}>
                  <button
                    type="button"
                    onClick={() =>
                      setSortBy(sortBy() === "date" ? "date-desc" : "date")
                    }
                    style={fileManagerStyles.sortButton(
                      sortBy() === "date" || sortBy() === "date-desc",
                    )}
                    onMouseEnter={(e) => {
                      const hoverStyles = fileManagerStyles.sortButtonHover();
                      e.currentTarget.style.color = hoverStyles.color as string;
                    }}
                    onMouseLeave={(e) => {
                      const normalStyles = fileManagerStyles.sortButton(
                        sortBy() === "date" || sortBy() === "date-desc",
                      );
                      e.currentTarget.style.color =
                        normalStyles.color as string;
                    }}
                  >
                    Modified
                  </button>
                </td>
              </tr>
            </thead>
            <tbody style={fileManagerStyles.tbody()}>
              <Show
                when={filteredItems().length > 0}
                fallback={
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        ...fileManagerStyles.td(),
                        padding: "var(--spacing-2xl)",
                        "text-align": "center",
                      }}
                    >
                      No files
                    </td>
                  </tr>
                }
              >
                <For each={filteredItems()}>
                  {(item, index) => {
                    const isFile = !item.isFolder;
                    const selected = () => isSelected(item.path);

                    return (
                      <tr
                        style={fileManagerStyles.tr(selected())}
                        onMouseEnter={(e) => {
                          const hoverStyles =
                            fileManagerStyles.trHover(selected());
                          e.currentTarget.style.background =
                            hoverStyles.background as string;
                        }}
                        onMouseLeave={(e) => {
                          const normalStyles = fileManagerStyles.tr(selected());
                          e.currentTarget.style.background =
                            normalStyles.background as string;
                        }}
                        onClick={(e) => {
                          if (isFile) {
                            const files = filteredItems().filter(
                              (item) => !item.isFolder,
                            );
                            const fileIndex = files.findIndex(
                              (f) => f.path === item.path,
                            );
                            handleFileClick(
                              item,
                              fileIndex,
                              e,
                              filteredItems(),
                            );
                          }
                        }}
                        onDblClick={() => handleDoubleClick(item)}
                      >
                        <td style={fileManagerStyles.td()}>
                          <div
                            style={fileManagerStyles.checkboxCell()}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Show when={isFile}>
                              <Checkbox
                                checked={selected()}
                                onChange={() => toggleFile(item.path)}
                                material3={true}
                                style={{
                                  width: "14px",
                                  height: "14px",
                                }}
                              />
                            </Show>
                          </div>
                        </td>
                        <td style={fileManagerStyles.td()}>
                          <div
                            style={{
                              display: "flex",
                              "align-items": "center",
                              gap: "var(--spacing-xs)",
                            }}
                          >
                            <svg
                              style={fileManagerStyles.fileIcon(item.isFolder)}
                              fill={
                                item.isFolder ? "currentColor" : "currentColor"
                              }
                              viewBox={
                                item.isFolder ? "0 0 20 20" : "0 0 20 20"
                              }
                            >
                              {item.isFolder ? (
                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                              ) : (
                                <path
                                  fill-rule="evenodd"
                                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                  clip-rule="evenodd"
                                />
                              )}
                            </svg>
                            <span style={fileManagerStyles.fileName()}>
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td style={fileManagerStyles.td()}>
                          <Show when={!item.isFolder && item.size}>
                            {formatSize(item.size)}
                          </Show>
                        </td>
                        <td style={fileManagerStyles.td()}>
                          {item.isFolder ? "Folder" : "File"}
                        </td>
                        <td style={fileManagerStyles.td()}>
                          {formatDate(item.modified)}
                        </td>
                      </tr>
                    );
                  }}
                </For>
              </Show>
            </tbody>
          </table>
        </Show>
      </div>

      {/* Footer */}
      <div style={fileManagerStyles.footer()}>
        <span style={fileManagerStyles.footerText()}>
          Selected: {selectedCount()}
        </span>
      </div>
    </div>
  );
};
