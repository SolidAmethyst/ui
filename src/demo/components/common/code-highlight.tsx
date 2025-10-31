import { Component, createEffect, createSignal } from "solid-js";

interface CodeHighlightProps {
  code: string;
  isDark: () => boolean;
}

// Simple syntax highlighter
const highlightCode = (code: string): string => {
  // Escape HTML first
  let highlighted = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comments (must be first to avoid conflicts)
  highlighted = highlighted.replace(
    /(&lt;!--[\s\S]*?--&gt;|\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g,
    (match: string) => `<span class="code-comment">${match}</span>`,
  );

  // Strings (must be before keywords to avoid conflicts)
  highlighted = highlighted.replace(
    /(&quot;[^&]*?&quot;|&apos;[^&]*?&apos;|`[^`]*?`)/g,
    (match: string) => `<span class="code-string">${match}</span>`,
  );

  // Keywords - process only outside of existing spans
  const keywords = [
    "import",
    "export",
    "from",
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "switch",
    "case",
    "default",
    "interface",
    "type",
    "extends",
    "implements",
    "async",
    "await",
    "new",
    "this",
    "typeof",
    "instanceof",
    "true",
    "false",
    "null",
    "undefined",
  ];

  // Process keywords only in plain text parts (not inside spans)
  const parts = highlighted.split(/(<span[^>]*>.*?<\/span>)/g);
  highlighted = parts
    .map((part) => {
      // Skip already processed spans
      if (part.startsWith("<span")) {
        return part;
      }
      // Apply keywords to plain text
      let processed = part;
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "g");
        processed = processed.replace(
          regex,
          (match: string) => `<span class="code-keyword">${match}</span>`,
        );
      });
      return processed;
    })
    .join("");

  // JSX/HTML tags (must be after strings and keywords)
  // Process tags only in plain text parts
  const tagParts = highlighted.split(/(<span[^>]*>.*?<\/span>)/g);
  highlighted = tagParts
    .map((part) => {
      if (part.startsWith("<span")) {
        return part;
      }
      return part.replace(
        /(&lt;)(\/?)([\w-]+)([^&]*?)(\/?)(&gt;)/g,
        (
          _match: string,
          open: string,
          slash: string,
          tag: string,
          attrs: string,
          selfClose: string,
          close: string,
        ) => {
          let attrsHighlighted = attrs;

          // Highlight attributes with string values
          attrsHighlighted = attrsHighlighted.replace(
            /(\w+)(=)(&quot;[^&]*?&quot;|&apos;[^&]*?&apos;)/g,
            (_m: string, name: string, eq: string, value: string) => {
              return `<span class="code-attr">${name}</span><span class="code-operator">${eq}</span><span class="code-string">${value}</span>`;
            },
          );

          // Highlight attributes with boolean/other values
          attrsHighlighted = attrsHighlighted.replace(
            /(\w+)(=)(\{[^}]*?\}|\w+)/g,
            (_m: string, name: string, eq: string, value: string) => {
              return `<span class="code-attr">${name}</span><span class="code-operator">${eq}</span>${value}`;
            },
          );

          return `<span class="code-tag">${open}</span>${
            slash ? `<span class="code-tag">${slash}</span>` : ""
          }<span class="code-tag-name">${tag}</span>${attrsHighlighted}${
            selfClose ? `<span class="code-tag">${selfClose}</span>` : ""
          }<span class="code-tag">${close}</span>`;
        },
      );
    })
    .join("");

  // Operators - apply only to plain text parts
  const operatorParts = highlighted.split(/(<span[^>]*>.*?<\/span>)/g);
  highlighted = operatorParts
    .map((part) => {
      if (part.startsWith("<span")) {
        return part;
      }
      return part.replace(/([={}()[\].,:;])/g, (match: string) => {
        return `<span class="code-operator">${match}</span>`;
      });
    })
    .join("");

  return highlighted;
};

export const CodeHighlight: Component<CodeHighlightProps> = (props) => {
  let codeRef: HTMLElement | undefined;
  const [copied, setCopied] = createSignal(false);

  createEffect(() => {
    if (codeRef) {
      codeRef.innerHTML = highlightCode(props.code);
    }
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        background: props.isDark()
          ? "rgba(255, 255, 255, 0.03)"
          : "rgba(0, 0, 0, 0.03)",
        border: `1px solid ${
          props.isDark() ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        }`,
        overflow: "hidden",
        "margin-bottom": "20px",
        "word-wrap": "break-word",
        "overflow-wrap": "break-word",
      }}
    >
      <button
        onClick={copyToClipboard}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          padding: "4px 10px",
          "font-size": "11px",
          "font-weight": "500",
          border: "none",
          background: "transparent",
          color: props.isDark()
            ? "rgba(246, 246, 246, 0.6)"
            : "rgba(26, 26, 26, 0.6)",
          cursor: "pointer",
          transition: "color 0.2s ease",
          "z-index": "10",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = props.isDark() ? "#f6f6f6" : "#1a1a1a";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = props.isDark()
            ? "rgba(246, 246, 246, 0.6)"
            : "rgba(26, 26, 26, 0.6)";
        }}
        title="Copy code"
      >
        {copied() ? "Copied!" : "Copy"}
      </button>
      <pre
        style={{
          margin: "0",
          padding: "12px",
          overflow: "auto",
          "overflow-x": "auto",
          "font-size": "12px",
          "line-height": "1.5",
          "font-family": 'Monaco, Menlo, "Ubuntu Mono", monospace',
          background: "transparent",
          "word-wrap": "break-word",
          "overflow-wrap": "break-word",
          width: "100%",
          "max-width": "100%",
          "box-sizing": "border-box",
        }}
      >
        <code
          ref={codeRef}
          class="code-block"
          style={{
            display: "block",
            "white-space": "pre",
            overflow: "visible",
            "word-wrap": "normal",
            "word-break": "normal",
          }}
        />
      </pre>
    </div>
  );
};
