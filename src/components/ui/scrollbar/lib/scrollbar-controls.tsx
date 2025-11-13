// Scrollbar controls component
// Global settings panel for scrollbar configuration

import { createSignal } from "solid-js";
import type { ScrollbarConfig } from "./scrollbar-config";
import { useScrollbarConfig } from "./scrollbar-provider";

export const ScrollbarControls = (props: { class?: string }) => {
  const config = useScrollbarConfig();
  const [isOpen, setIsOpen] = createSignal(false);

  const handleEngineToggle = () => {
    config.setEngineEnabled(!config.config.engine.enabled);
  };

  const handleThemeChange = (theme: ScrollbarConfig["theme"]["name"]) => {
    config.setTheme({ name: theme });
  };

  return (
    <div class={`scrollbar-controls ${props.class || ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen())}
        class="scrollbar-controls-toggle"
        title="Scrollbar Settings"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {isOpen() && (
        <div class="scrollbar-controls-panel">
          <h3 class="scrollbar-controls-title">Scrollbar Settings</h3>

          <div class="control-group">
            <label>
              <input
                type="checkbox"
                checked={config.config.engine.enabled}
                onChange={handleEngineToggle}
              />
              Enable Engine
            </label>
          </div>

          <div class="control-group">
            <label>Theme:</label>
            <select
              value={config.config.theme.name}
              onChange={(e) => {
                const value = e.currentTarget
                  .value as ScrollbarConfig["theme"]["name"];
                handleThemeChange(value);
              }}
            >
              <option value="default">Default</option>
              <option value="minimal">Minimal</option>
              <option value="modern">Modern</option>
            </select>
          </div>

          <div class="control-group">
            <label>
              <input
                type="checkbox"
                checked={config.config.engine.autoDetect}
                onChange={(e) =>
                  config.updateConfig({
                    engine: {
                      ...config.config.engine,
                      autoDetect: e.currentTarget.checked,
                    },
                  })
                }
              />
              Auto-detect Engine
            </label>
          </div>

          <div class="control-group">
            <label>
              <input
                type="checkbox"
                checked={config.config.accessibility.keyboardNavigation}
                onChange={(e) =>
                  config.updateConfig({
                    accessibility: {
                      ...config.config.accessibility,
                      keyboardNavigation: e.currentTarget.checked,
                    },
                  })
                }
              />
              Keyboard Navigation
            </label>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-controls {
          position: relative;
          display: inline-block;
        }

        .scrollbar-controls-toggle {
          background: transparent;
          border: none;
          border-radius: 4px;
          padding: 6px;
          cursor: pointer;
          font-size: 16px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 200ms ease;
          color: #6b7280;
        }

        .scrollbar-controls-toggle:hover {
          background: hsla(var(--primary-hover) / 0.15);
          color: hsl(var(--hover-color));
          box-shadow: 0 0 var(--hover-glow-box-blur) hsla(var(--primary-hover) / var(--hover-glow-box-opacity));
        }

        .scrollbar-controls-toggle:active {
          background: hsla(var(--primary) / 0.2);
        }

        .dark .scrollbar-controls-toggle {
          color: #9ca3af;
        }

        .dark .scrollbar-controls-toggle:hover {
          color: #60a5fa;
        }

        .scrollbar-controls-panel {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          min-width: 200px;
          margin-top: 4px;
        }

        .dark .scrollbar-controls-panel {
          background: #1f2937;
          border-color: #374151;
        }

        .control-group {
          margin-bottom: 12px;
        }

        .control-group label {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #374151;
          margin-bottom: 4px;
          cursor: pointer;
        }

        .dark .control-group label {
          color: #e5e7eb;
        }

        .control-group input[type="checkbox"] {
          margin-right: 8px;
        }

        .control-group select {
          width: 100%;
          padding: 4px 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          background: white;
          font-size: 14px;
        }

        .dark .control-group select {
          background: #374151;
          border-color: #4b5563;
          color: #e5e7eb;
        }

        .scrollbar-controls-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 16px 0;
        }

        .dark .scrollbar-controls-title {
          color: #f9fafb;
        }
      `}</style>
    </div>
  );
};
