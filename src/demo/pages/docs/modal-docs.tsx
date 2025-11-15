import { Accessor, Component, createSignal } from "solid-js";
import { Button } from "../../../components/ui/button";
import { CodeHighlight } from "../../../components/ui/code-highlight";
import { Modal } from "../../../components/ui/modal";
import { Tabs } from "../../../components/ui/tabs";
import { Typography } from "../../../components/ui/typography";
import { docsStyles } from "../../lib/docs.styles";
import { modalSnippets } from "./code-snippets/modal-snippets";

interface ModalDocsProps {}

export const ModalDocs: Component<ModalDocsProps> = (props) => {
  const [basicOpen, setBasicOpen] = createSignal(false);
  const [smallOpen, setSmallOpen] = createSignal(false);
  const [largeOpen, setLargeOpen] = createSignal(false);
  const [fullOpen, setFullOpen] = createSignal(false);
  const [noBackdropOpen, setNoBackdropOpen] = createSignal(false);
  const [controlledOpen, setControlledOpen] = createSignal(false);
  const [focusTrapOpen, setFocusTrapOpen] = createSignal(false);

  return (
    <article style={docsStyles.article()}>
      <Typography variant="h1">Modal</Typography>
      <Typography variant="body">
        Modal dialog component with overlay, focus trap, and keyboard
        navigation. Perfect for dialogs, confirmations, forms, and other modal
        content.
      </Typography>
      {/* Installation */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Installation
        </Typography>
        <CodeHighlight code={modalSnippets.imports} />
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
                  display: "flex",
                  "justify-content": "center",
                  "align-items": "center",
                }}
              >
                <Button onClick={() => setBasicOpen(true)}>Open Modal</Button>
                <Modal isOpen={basicOpen()} onClose={() => setBasicOpen(false)}>
                  <div style={{ padding: "24px" }}>
                    <Typography
                      variant="h4"
                      as="h2"
                      style={{ margin: "0 0 12px 0" }}
                    >
                      Modal Title
                    </Typography>
                    <Typography
                      variant="small"
                      style={{ margin: "0 0 16px 0" }}
                    >
                      This is a basic modal dialog with overlay and focus trap.
                    </Typography>
                    <Button onClick={() => setBasicOpen(false)}>Close</Button>
                  </div>
                </Modal>
              </div>
            </div>
          }
          code={modalSnippets.usage.basicUsage}
        />
      </section>
      {/* Sizes */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Sizes
        </Typography>
        <Typography variant="body">
          Modal supports predefined sizes (sm, md, lg, xl, full) or custom size
          strings.
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "12px",
                  "justify-content": "center",
                  "align-items": "center",
                  "flex-wrap": "wrap",
                }}
              >
                <Button onClick={() => setSmallOpen(true)}>Small</Button>
                <Button onClick={() => setLargeOpen(true)}>Large</Button>
                <Button onClick={() => setFullOpen(true)}>Full Screen</Button>
                <Modal
                  isOpen={smallOpen()}
                  onClose={() => setSmallOpen(false)}
                  size="sm"
                >
                  <div style={{ padding: "20px" }}>
                    <Typography
                      variant="h4"
                      as="h3"
                      style={{ margin: "0 0 12px 0" }}
                    >
                      Small Modal
                    </Typography>
                    <Typography variant="small" style={{ margin: "0" }}>
                      This is a small modal (max-width: 320px).
                    </Typography>
                  </div>
                </Modal>
                <Modal
                  isOpen={largeOpen()}
                  onClose={() => setLargeOpen(false)}
                  size="lg"
                >
                  <div style={{ padding: "20px" }}>
                    <Typography
                      variant="h4"
                      as="h3"
                      style={{ margin: "0 0 12px 0" }}
                    >
                      Large Modal
                    </Typography>
                    <Typography variant="small" style={{ margin: "0" }}>
                      This is a large modal (max-width: 640px).
                    </Typography>
                  </div>
                </Modal>
                <Modal
                  isOpen={fullOpen()}
                  onClose={() => setFullOpen(false)}
                  size="full"
                >
                  <div
                    style={{
                      padding: "20px",
                      display: "flex",
                      "flex-direction": "column",
                      "align-items": "center",
                      "justify-content": "center",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h4"
                      as="h3"
                      style={{ margin: "0 0 12px 0" }}
                    >
                      Full Screen Modal
                    </Typography>
                    <Typography variant="small" style={{ margin: "0" }}>
                      This modal takes up the full screen.
                    </Typography>
                  </div>
                </Modal>
              </div>
            </div>
          }
          code={modalSnippets.usage.sizes}
        />
      </section>
      {/* No Backdrop */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Without Backdrop
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  "justify-content": "center",
                  "align-items": "center",
                }}
              >
                <Button onClick={() => setNoBackdropOpen(true)}>
                  Open Modal (No Backdrop)
                </Button>
                <Modal
                  isOpen={noBackdropOpen()}
                  onClose={() => setNoBackdropOpen(false)}
                  showBackdrop={false}
                >
                  <div style={{ padding: "20px" }}>
                    <Typography
                      variant="h4"
                      as="h2"
                      style={{ margin: "0 0 12px 0" }}
                    >
                      No Backdrop
                    </Typography>
                    <Typography variant="small" style={{ margin: "0" }}>
                      This modal doesn't have a backdrop overlay.
                    </Typography>
                  </div>
                </Modal>
              </div>
            </div>
          }
          code={modalSnippets.usage.noBackdrop}
        />
      </section>
      {/* Controlled Close */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Controlled Close
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  "justify-content": "center",
                  "align-items": "center",
                }}
              >
                <Button onClick={() => setControlledOpen(true)}>
                  Open Modal
                </Button>
                <Modal
                  isOpen={controlledOpen()}
                  onClose={() => setControlledOpen(false)}
                  closeOnBackdropClick={false}
                  closeOnEscape={false}
                >
                  <div style={{ padding: "20px" }}>
                    <Typography
                      variant="h4"
                      as="h2"
                      style={{ margin: "0 0 12px 0" }}
                    >
                      Controlled Close
                    </Typography>
                    <Typography
                      variant="small"
                      style={{ margin: "0 0 16px 0" }}
                    >
                      This modal won't close on backdrop click or Escape key.
                    </Typography>
                    <Button onClick={() => setControlledOpen(false)}>
                      Close
                    </Button>
                  </div>
                </Modal>
              </div>
            </div>
          }
          code={modalSnippets.usage.controlledClose}
        />
      </section>
      {/* Focus Trap */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Focus Trap
        </Typography>
        <Typography variant="body">
          Modal automatically traps focus within its content. Use Tab to cycle
          through focusable elements.
        </Typography>
        <Tabs
          preview={
            <div style={docsStyles.previewContainer()}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  "justify-content": "center",
                  "align-items": "center",
                }}
              >
                <Button onClick={() => setFocusTrapOpen(true)}>
                  Open Modal (Focus Trap)
                </Button>
                <Modal
                  isOpen={focusTrapOpen()}
                  onClose={() => setFocusTrapOpen(false)}
                >
                  <div style={{ padding: "20px" }}>
                    <Typography
                      variant="h4"
                      as="h2"
                      style={{ margin: "0 0 12px 0" }}
                    >
                      Focus Trap Demo
                    </Typography>
                    <Typography
                      variant="small"
                      style={{ margin: "0 0 16px 0" }}
                    >
                      Press Tab to cycle through buttons. Focus stays within the
                      modal.
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        "flex-wrap": "wrap",
                      }}
                    >
                      <Button>First Button</Button>
                      <Button>Second Button</Button>
                      <Button onClick={() => setFocusTrapOpen(false)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          }
          code={modalSnippets.usage.focusTrap}
        />
      </section>
      {/* Customization */}
      <section style={docsStyles.section()}>
        <Typography variant="h3" as="h2">
          Customization
        </Typography>
        <Typography variant="body">
          The Modal component uses CSS custom properties for theming. These
          variables are already defined in the library, but you can override
          them in your application's stylesheet to match your design system.
        </Typography>
        <CodeHighlight code={modalSnippets.customization} />
        <Typography variant="body">
          The Modal component automatically uses these CSS variables. You can
          override them in your application to match your design system.
        </Typography>
      </section>
    </article>
  );
};
