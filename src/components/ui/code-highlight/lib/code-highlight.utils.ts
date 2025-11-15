/**
 * Code Highlight Utilities
 * Syntax highlighting functions
 */

/**
 * Simple syntax highlighter for TypeScript/TSX/JavaScript/JSX/CSS
 * @param code - Code string to highlight
 * @returns Highlighted HTML string
 */
export const highlightCode = (code: string): string => {
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

  // CSS-specific highlighting (before keywords to avoid conflicts)
  // Process CSS at-rules first (must be before operators to avoid conflicts)
  const cssAtRules = [
    "@layer",
    "@media",
    "@keyframes",
    "@import",
    "@charset",
    "@supports",
    "@font-face",
  ];
  const cssParts = highlighted.split(/(<span[^>]*>.*?<\/span>)/g);
  highlighted = cssParts
    .map((part) => {
      if (part.startsWith("<span")) {
        return part;
      }
      // Highlight CSS at-rules (@layer, @media, etc.)
      // Process in reverse order to avoid conflicts (longer rules first)
      cssAtRules
        .sort((a, b) => b.length - a.length)
        .forEach((atRule) => {
          // Simple approach: match @layer at start or after whitespace
          const escaped = atRule.replace("@", "\\@");
          // Match @layer followed by space, {, or end of line
          const regex = new RegExp(`(${escaped})(?=\\s|\\{|$)`, "g");
          part = part.replace(regex, (match: string) => {
            // Skip if already inside a span
            if (part.includes(`<span class="code-keyword">${match}</span>`)) {
              return match;
            }
            return `<span class="code-keyword">${match}</span>`;
          });
        });
      // Highlight CSS selectors (:root, [data-theme], .class, #id)
      // Only match if not already inside a span
      const selectorParts = part.split(/(<span[^>]*>.*?<\/span>)/g);
      part = selectorParts
        .map((selPart) => {
          if (selPart.startsWith("<span")) {
            return selPart;
          }
          return selPart.replace(
            /(:root|:hover|:active|:focus|:disabled|\[data-theme[^\]]*\]|\.\w+|#\w+)/g,
            (match: string) => {
              return `<span class="code-attr">${match}</span>`;
            },
          );
        })
        .join("");
      // Highlight CSS custom properties (--variable-name:)
      const propParts = part.split(/(<span[^>]*>.*?<\/span>)/g);
      part = propParts
        .map((propPart) => {
          if (propPart.startsWith("<span")) {
            return propPart;
          }
          return propPart.replace(
            /(--[\w-]+)(\s*:)/g,
            (match: string, prop: string, colon: string) => {
              return `<span class="code-attr">${prop}</span><span class="code-operator">${colon}</span>`;
            },
          );
        })
        .join("");
      return part;
    })
    .join("");

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
          match: string,
          open: string,
          slash: string,
          tag: string,
          attrs: string,
          selfClose: string,
          close: string,
        ) => {
          let attrsHighlighted = attrs;

          // First, highlight JSX expressions {value} - must be before string values
          attrsHighlighted = attrsHighlighted.replace(
            /(\w+)(=)(\{[^}]*?\})/g,
            (match: string, name: string, eq: string, value: string) => {
              const innerValue = value.slice(1, -1).trim();
              // Check if it's a number
              if (/^\d+$/.test(innerValue)) {
                // Number - highlight as string (yellow)
                return `<span class="code-attr">${name}</span><span class="code-operator">${eq}</span><span class="code-operator">{</span><span class="code-string">${innerValue}</span><span class="code-operator">}</span>`;
              } else if (innerValue === "true" || innerValue === "false") {
                // Boolean - highlight as keyword (purple)
                return `<span class="code-attr">${name}</span><span class="code-operator">${eq}</span><span class="code-operator">{</span><span class="code-keyword">${innerValue}</span><span class="code-operator">}</span>`;
              } else if (name === "style" && innerValue.includes(":")) {
                // CSS object in style prop - highlight CSS properties
                const cssProps = [
                  "width",
                  "height",
                  "minWidth",
                  "minHeight",
                  "maxWidth",
                  "maxHeight",
                  "padding",
                  "margin",
                  "display",
                  "position",
                  "top",
                  "left",
                  "right",
                  "bottom",
                  "background",
                  "color",
                  "border",
                  "borderRadius",
                  "gridColumn",
                  "gridRow",
                  "flex",
                  "alignItems",
                  "justifyContent",
                  "gap",
                  "gridGap",
                  "columnGap",
                  "rowGap",
                ];
                let highlightedCSS = innerValue;
                // Highlight CSS property names
                cssProps.forEach((prop) => {
                  const regex = new RegExp(`\\b(${prop})\\s*:`, "g");
                  highlightedCSS = highlightedCSS.replace(
                    regex,
                    (match: string, propName: string) => {
                      return `<span class="code-attr">${propName}</span><span class="code-operator">:</span>`;
                    },
                  );
                });
                // Highlight string values in CSS
                highlightedCSS = highlightedCSS.replace(
                  /(['"])([^'"]*?)\1/g,
                  (match: string, quote: string, strValue: string) => {
                    return `${quote}<span class="code-string">${strValue}</span>${quote}`;
                  },
                );
                return `<span class="code-attr">${name}</span><span class="code-operator">${eq}</span><span class="code-operator">{</span>${highlightedCSS}<span class="code-operator">}</span>`;
              } else {
                // Other expression - keep as is but highlight braces
                return `<span class="code-attr">${name}</span><span class="code-operator">${eq}</span><span class="code-operator">{</span>${innerValue}<span class="code-operator">}</span>`;
              }
            },
          );

          // Then highlight attributes with string values (quoted)
          attrsHighlighted = attrsHighlighted.replace(
            /(\w+)(=)(&quot;[^&]*?&quot;|&apos;[^&]*?&apos;)/g,
            (match: string, name: string, eq: string, value: string) => {
              // Skip if already processed (inside a span)
              if (name.includes("<span") || value.includes("<span")) {
                return match;
              }
              return `<span class="code-attr">${name}</span><span class="code-operator">${eq}</span><span class="code-string">${value}</span>`;
            },
          );

          // Finally, highlight remaining attributes without values or with plain values
          attrsHighlighted = attrsHighlighted.replace(
            /(\w+)(=)(\w+)/g,
            (match: string, name: string, eq: string, value: string) => {
              // Skip if already processed
              if (name.includes("<span") || value.includes("<span")) {
                return match;
              }
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
  // Exclude @ symbol to avoid overwriting CSS at-rules
  const operatorParts = highlighted.split(/(<span[^>]*>.*?<\/span>)/g);
  highlighted = operatorParts
    .map((part) => {
      if (part.startsWith("<span")) {
        return part;
      }
      // Don't highlight @ as operator (it's already highlighted as CSS at-rule)
      return part.replace(/([={}()[\].,:;])/g, (match: string) => {
        // Skip if @ is part of an at-rule (already highlighted)
        if (
          (match === "@" && part.includes("@layer")) ||
          part.includes("@media") ||
          part.includes("@keyframes")
        ) {
          return match;
        }
        return `<span class="code-operator">${match}</span>`;
      });
    })
    .join("");

  return highlighted;
};
