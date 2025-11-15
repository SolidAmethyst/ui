import { Component, createSignal } from "solid-js";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { DragDrop, type DragDropItem } from "../../../components/ui/drag-drop";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { dragDropSnippets } from "./code-snippets/drag-drop-snippets";

export const DragDropDocs: Component = () => {
  const [basicItems, setBasicItems] = createSignal<DragDropItem[]>([
    { id: "1", content: <div>Item 1</div> },
    { id: "2", content: <div>Item 2</div> },
    { id: "3", content: <div>Item 3</div> },
  ]);

  const [horizontalItems] = createSignal<DragDropItem[]>([
    { id: "1", content: <div>Item 1</div> },
    { id: "2", content: <div>Item 2</div> },
    { id: "3", content: <div>Item 3</div> },
  ]);

  const [disabledItems] = createSignal<DragDropItem[]>([
    { id: "1", content: <div>Item 1</div> },
    { id: "2", content: <div>Item 2 (Disabled)</div>, disabled: true },
    { id: "3", content: <div>Item 3</div> },
  ]);

  const [customItems] = createSignal<DragDropItem[]>([
    { id: "1", content: <div>Item 1</div>, data: { title: "First Item" } },
    { id: "2", content: <div>Item 2</div>, data: { title: "Second Item" } },
    { id: "3", content: <div>Item 3</div>, data: { title: "Third Item" } },
  ]);

  const handleDrop = (
    item: DragDropItem,
    fromIndex: number,
    toIndex: number,
  ) => {
    const newItems = [...basicItems()];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, removed);
    setBasicItems(newItems);
  };

  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Drag Drop</Typography>
      <Typography variant="body">
        Drag and drop component for creating reorderable lists. Supports both
        vertical and horizontal orientations, custom rendering, and full control
        over drag and drop behavior.
      </Typography>

      {/* Installation */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={dragDropSnippets.imports} />
      </section>

      {/* Basic Usage */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Basic Usage
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                  margin: "0 auto",
                }}
              >
                <DragDrop items={basicItems()} onDrop={handleDrop} />
              </div>
            </div>
          }
          code={dragDropSnippets.usage.basicUsage}
        />
      </section>

      {/* With Callbacks */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          With Callbacks
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                  margin: "0 auto",
                }}
              >
                <DragDrop
                  items={basicItems()}
                  onDragStart={(item, index) =>
                    console.log("Drag started:", item.id, index)
                  }
                  onDrop={(item, fromIndex, toIndex) => {
                    console.log(`Moved from ${fromIndex} to ${toIndex}`);
                    handleDrop(item, fromIndex, toIndex);
                  }}
                  onDragEnd={(item, index) =>
                    console.log("Drag ended:", item.id, index)
                  }
                />
              </div>
            </div>
          }
          code={dragDropSnippets.usage.withCallbacks}
        />
      </section>

      {/* Horizontal Orientation */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Horizontal Orientation
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                  margin: "0 auto",
                }}
              >
                <DragDrop items={horizontalItems()} orientation="horizontal" />
              </div>
            </div>
          }
          code={dragDropSnippets.usage.horizontal}
        />
      </section>

      {/* Disabled Items */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Disabled Items
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                  margin: "0 auto",
                }}
              >
                <DragDrop items={disabledItems()} />
              </div>
            </div>
          }
          code={dragDropSnippets.usage.disabled}
        />
      </section>

      {/* Custom Gap */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Custom Gap
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                  margin: "0 auto",
                }}
              >
                <DragDrop items={basicItems()} gap="16px" />
              </div>
            </div>
          }
          code={dragDropSnippets.usage.customGap}
        />
      </section>

      {/* Custom Render */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Custom Render Function
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  "max-width": "400px",
                  margin: "0 auto",
                }}
              >
                <DragDrop
                  items={customItems()}
                  renderItem={(item, index, isDragging) => (
                    <div
                      style={{
                        width: "100%",
                        opacity: isDragging ? 0.5 : 1,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      <strong
                        style={{
                          display: "block",
                          "margin-bottom": "4px",
                          color: "hsl(var(--foreground))",
                        }}
                      >
                        {(item.data as { title: string })?.title ||
                          `Item ${index + 1}`}
                      </strong>
                      {item.content}
                    </div>
                  )}
                />
              </div>
            </div>
          }
          code={dragDropSnippets.usage.customRender}
        />
      </section>

      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The DragDrop component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={dragDropSnippets.customization} />
        <Typography variant="body">
          The DragDrop component automatically uses these CSS variables. You can
          override them in your application to match your design system. The
          component uses primary color for borders, indicators, and drag handles
          when items are being dragged or hovered over.
        </Typography>
      </section>
    </article>
  );
};
