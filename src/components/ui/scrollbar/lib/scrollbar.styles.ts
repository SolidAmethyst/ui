export const scrollbarStyles = `
.scrollbar-container {
  position: relative;
  overflow: hidden;
}
.scrollbar-content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
.scrollbar-content::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
.scrollbar-track {
  position: absolute;
  z-index: 999;
  background: transparent;
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
.scrollbar-track.visible {
  opacity: 1;
  transform: scale(1);
}
.scrollbar-track-vertical {
  top: 0;
  right: 0;
  width: 12px;
  height: 100%;
}
.scrollbar-track-horizontal {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 12px;
}
.scrollbar-thumb {
  position: absolute;
  background: hsl(var(--scrollbar-thumb) / 0.6);
  border-radius: 2px;
  cursor: grab;
  transition: background 150ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 99999;
  min-width: 1px;
  min-height: 1px;
}
.scrollbar-thumb:hover {
  background: hsl(var(--scrollbar-thumb-hover) / 0.9);
}
.scrollbar-thumb:active,
.scrollbar-thumb.dragging {
  background: hsl(var(--scrollbar-thumb-active));
  cursor: grabbing;
}
.scrollbar-arrow {
  position: absolute;
  width: 12px;
  height: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: hsl(var(--scrollbar-arrow));
  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 100ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  padding: 0;
  margin: 0;
}
.scrollbar-arrow:hover {
  color: hsl(var(--scrollbar-arrow-hover));
  transform: scale(1.1);
}
.scrollbar-arrow:active {
  color: hsl(var(--scrollbar-arrow-active));
}
.scrollbar-arrow:disabled {
  color: hsl(var(--scrollbar-arrow-disabled));
  cursor: not-allowed;
}
.scrollbar-arrow-up {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 0;
  margin: 0;
}
.scrollbar-arrow-down {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 0;
  margin: 0;
}
.scrollbar-arrow-left {
  position: absolute;
  top: 50%;
  left: 0;
  width: 12px;
  height: 12px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}
.scrollbar-arrow-right {
  position: absolute;
  top: 50%;
  right: 0;
  width: 12px;
  height: 12px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}
`;
