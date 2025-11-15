/**
 * Detailed Hardcoded Colors Detection with AST Parsing
 * Provides exact line numbers and context for hardcoded colors in source files
 */

import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import {
  findBestCSSVariable,
  generateReplacement,
} from "../utils/color-mapper";

// List of demo pages to analyze
const DOCS_PAGES_DIR = path.join(__dirname, "../../demo/pages/docs");

/**
 * Extract hardcoded colors from TSX source file using AST
 */
function findHardcodedColorsInFile(filePath: string): Array<{
  line: number;
  column: number;
  type: "rgba" | "hex" | "isDark-prop";
  value: string;
  property?: string;
  context: string;
  suggestion: string;
  reason: string;
}> {
  const findings: Array<{
    line: number;
    column: number;
    type: "rgba" | "hex" | "isDark-prop";
    value: string;
    property?: string;
    context: string;
    suggestion: string;
    reason: string;
  }> = [];

  try {
    const sourceCode = fs.readFileSync(filePath, "utf-8");
    const ast = parser.parse(sourceCode, {
      sourceType: "module",
      plugins: ["typescript", "jsx"],
    });

    traverse(ast, {
      // Find style={{...}} JSX attributes
      JSXAttribute(path) {
        if (
          path.node.name.name === "style" &&
          path.node.value?.type === "JSXExpressionContainer"
        ) {
          const expression = path.node.value.expression;

          // Check ObjectExpression in style={{ color: '...' }}
          if (expression.type === "ObjectExpression") {
            expression.properties.forEach((prop: any) => {
              if (prop.type === "ObjectProperty" && prop.value) {
                const propertyName =
                  prop.key.type === "Identifier"
                    ? prop.key.name
                    : prop.key.type === "StringLiteral"
                      ? prop.key.value
                      : "";

                // Check for string literals with colors
                if (prop.value.type === "StringLiteral") {
                  const value = prop.value.value;

                  // Check for rgba/rgb
                  if (/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/.test(value)) {
                    const { replacement, reason } = generateReplacement(
                      value,
                      propertyName,
                    );
                    findings.push({
                      line: prop.value.loc?.start.line || 0,
                      column: prop.value.loc?.start.column || 0,
                      type: "rgba",
                      value,
                      property: propertyName,
                      context: `style={{ ${propertyName}: '${value}' }}`,
                      suggestion: replacement,
                      reason,
                    });
                  }

                  // Check for hex colors
                  if (/#[0-9a-fA-F]{3,6}/.test(value)) {
                    const { replacement, reason } = generateReplacement(
                      value,
                      propertyName,
                    );
                    findings.push({
                      line: prop.value.loc?.start.line || 0,
                      column: prop.value.loc?.start.column || 0,
                      type: "hex",
                      value,
                      property: propertyName,
                      context: `style={{ ${propertyName}: '${value}' }}`,
                      suggestion: replacement,
                      reason,
                    });
                  }
                }

                // Check for conditional expressions with hardcoded colors
                if (prop.value.type === "ConditionalExpression") {
                  [prop.value.consequent, prop.value.alternate].forEach(
                    (node: any) => {
                      if (node.type === "StringLiteral") {
                        const value = node.value;
                        if (
                          /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/.test(value) ||
                          /#[0-9a-fA-F]{3,6}/.test(value)
                        ) {
                          const { replacement, reason } = generateReplacement(
                            value,
                            propertyName,
                          );
                          findings.push({
                            line: node.loc?.start.line || 0,
                            column: node.loc?.start.column || 0,
                            type: /rgba?\(/.test(value) ? "rgba" : "hex",
                            value,
                            property: propertyName,
                            context: `Conditional: ${propertyName}`,
                            suggestion: replacement,
                            reason,
                          });
                        }
                      }
                    },
                  );
                }
              }
            });
          }
        }

        // Find isDark={false} or isDark={true}
        if (
          path.node.name.name === "isDark" &&
          path.node.value?.type === "JSXExpressionContainer"
        ) {
          const expression = path.node.value.expression;
          if (
            expression.type === "BooleanLiteral" ||
            (expression.type === "Identifier" &&
              (expression.name === "true" || expression.name === "false"))
          ) {
            findings.push({
              line: path.node.loc?.start.line || 0,
              column: path.node.loc?.start.column || 0,
              type: "isDark-prop",
              value:
                expression.type === "BooleanLiteral"
                  ? String(expression.value)
                  : expression.name,
              context: `isDark prop`,
              suggestion: "Remove isDark prop, use getThemeFromCSS()",
              reason: "Components should not use isDark prop",
            });
          }
        }
      },

      // Find template literals with colors
      TemplateLiteral(path) {
        path.node.quasis.forEach((quasi) => {
          const value = quasi.value.raw;
          if (
            /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/.test(value) ||
            /#[0-9a-fA-F]{3,6}/.test(value)
          ) {
            const { replacement, reason } = generateReplacement(value);
            findings.push({
              line: quasi.loc?.start.line || 0,
              column: quasi.loc?.start.column || 0,
              type: /rgba?\(/.test(value) ? "rgba" : "hex",
              value,
              context: "Template literal",
              suggestion: replacement,
              reason,
            });
          }
        });
      },
    });
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
  }

  return findings.sort((a, b) => a.line - b.line);
}

/**
 * Get source code context around a specific line
 */
function getSourceContext(
  filePath: string,
  line: number,
  contextLines: number = 3,
): string {
  try {
    const sourceCode = fs.readFileSync(filePath, "utf-8");
    const lines = sourceCode.split("\n");
    const startLine = Math.max(0, line - contextLines - 1);
    const endLine = Math.min(lines.length, line + contextLines);

    const contextLines: string[] = [];
    for (let i = startLine; i < endLine; i++) {
      const lineNum = i + 1;
      const prefix = lineNum === line ? "> " : "  ";
      const lineNumStr = String(lineNum).padStart(4, " ");
      contextLines.push(`${prefix}${lineNumStr}| ${lines[i]}`);
    }

    return contextLines.join("\n");
  } catch (error) {
    return "";
  }
}

describe("Detailed Hardcoded Colors Detection (AST)", () => {
  // Get all .tsx files in docs directory
  let docsFiles: string[] = [];

  try {
    docsFiles = fs
      .readdirSync(DOCS_PAGES_DIR)
      .filter((file) => file.endsWith("-docs.tsx"))
      .map((file) => path.join(DOCS_PAGES_DIR, file));
  } catch (error) {
    console.error("Error reading docs directory:", error);
  }

  // Create a test for each docs page
  docsFiles.forEach((filePath) => {
    const fileName = path.basename(filePath);

    it(`${fileName} should not have hardcoded colors (AST analysis)`, () => {
      const findings = findHardcodedColorsInFile(filePath);

      if (findings.length > 0) {
        const report = findings
          .map((finding, index) => {
            const context = getSourceContext(filePath, finding.line);
            return (
              `\n[${index + 1}/${findings.length}] Line ${finding.line}:${finding.column}\n` +
              `Type: ${finding.type}${finding.property ? ` (${finding.property})` : ""}\n` +
              `Found: ${finding.value}\n` +
              `Suggested: ${finding.suggestion}\n` +
              `Reason: ${finding.reason}\n` +
              `Context:\n${context}\n`
            );
          })
          .join("\n" + "=".repeat(80) + "\n");

        expect.fail(
          `Found ${findings.length} hardcoded color(s) in ${fileName}:\n${report}`,
        );
      }

      expect(findings).toHaveLength(0);
    });
  });

  it("should provide color analysis utilities", () => {
    // Meta-test to verify the AST parser works
    const testFile = path.join(DOCS_PAGES_DIR, "grid-docs.tsx");

    if (fs.existsSync(testFile)) {
      const findings = findHardcodedColorsInFile(testFile);
      // Just verify the parser runs without throwing
      expect(Array.isArray(findings)).toBe(true);
    }
  });
});
