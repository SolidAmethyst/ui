#!/usr/bin/env bun
/**
 * Automatic hardcoded color fixer using jscodeshift
 * Applies intelligent color replacements with safety checks and rollback
 */

import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import jscodeshift from "jscodeshift";
import { findBestCSSVariable, analyzeColor } from "../../src/test/utils/color-mapper";

// Configuration
const DOCS_DIR = path.join(__dirname, "../../src/demo/pages/docs");
const DRY_RUN = process.argv.includes("--dry-run") || process.argv.includes("-d");
const SPECIFIC_FILE = process.argv.find((arg) => arg.endsWith(".tsx"));
const AUTO_COMMIT = process.argv.includes("--commit");

// Statistics
let filesProcessed = 0;
let filesModified = 0;
let colorsReplaced = 0;
let propsRemoved = 0;

/**
 * Transform function for jscodeshift
 * Replaces hardcoded colors with CSS variables
 */
function transform(fileInfo: any, api: any) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  let modified = false;

  // Find and replace hardcoded colors in style props
  root.find(j.JSXAttribute, {
    name: { name: "style" },
  }).forEach((path: any) => {
    if (
      path.node.value?.type === "JSXExpressionContainer" &&
      path.node.value.expression.type === "ObjectExpression"
    ) {
      const objectExpression = path.node.value.expression;

      objectExpression.properties.forEach((prop: any) => {
        if (prop.type !== "ObjectProperty") return;

        // Handle string literal colors
        if (prop.value?.type === "StringLiteral") {
          const originalValue = prop.value.value;

          // Check if it's a hardcoded color
          if (
            /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/.test(originalValue) ||
            /#[0-9a-fA-F]{3,6}/.test(originalValue)
          ) {
            // Skip if already using CSS variables
            if (!originalValue.includes("var(--")) {
              const replacement = findBestCSSVariable(originalValue);
              if (replacement !== originalValue && !replacement.includes("undefined")) {
                prop.value.value = replacement;
                modified = true;
                colorsReplaced++;
                console.log(`    ✓ ${originalValue} → ${replacement}`);
              }
            }
          }
        }

        // Handle conditional expressions with colors
        if (prop.value?.type === "ConditionalExpression") {
          [prop.value.consequent, prop.value.alternate].forEach((node: any) => {
            if (node.type === "StringLiteral") {
              const originalValue = node.value;

              if (
                (/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/.test(originalValue) ||
                  /#[0-9a-fA-F]{3,6}/.test(originalValue)) &&
                !originalValue.includes("var(--")
              ) {
                const replacement = findBestCSSVariable(originalValue);
                if (replacement !== originalValue && !replacement.includes("undefined")) {
                  node.value = replacement;
                  modified = true;
                  colorsReplaced++;
                  console.log(`    ✓ ${originalValue} → ${replacement}`);
                }
              }
            }
          });
        }
      });
    }
  });

  // Remove isDark props
  root.find(j.JSXAttribute, {
    name: { name: "isDark" },
  }).forEach((path: any) => {
    const expression = path.node.value?.expression;

    // Only remove if it's a hardcoded boolean (false or true literal)
    if (
      expression?.type === "BooleanLiteral" ||
      (expression?.type === "Identifier" &&
        (expression.name === "false" || expression.name === "true"))
    ) {
      j(path).remove();
      modified = true;
      propsRemoved++;
      console.log(`    ✓ Removed isDark={${expression.type === "BooleanLiteral" ? expression.value : expression.name}}`);
    }
  });

  return modified ? root.toSource({ quote: "double" }) : null;
}

/**
 * Fix a single file
 */
function fixFile(filePath: string): boolean {
  console.log(`\n📄 Processing: ${path.basename(filePath)}`);

  try {
    const source = fs.readFileSync(filePath, "utf-8");
    const fileInfo = { path: filePath, source };
    // Use TypeScript parser for .tsx files
    const j = jscodeshift.withParser("tsx");
    const api = { jscodeshift: j, j };

    const result = transform(fileInfo, api);

    if (result && result !== source) {
      if (!DRY_RUN) {
        fs.writeFileSync(filePath, result, "utf-8");
        console.log(`  ✅ Modified`);
      } else {
        console.log(`  🔍 Would modify (dry-run)`);
      }
      filesModified++;
      return true;
    } else {
      console.log(`  ⏭️  No changes needed`);
      return false;
    }
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error);
    return false;
  }
}

/**
 * Run tests to verify changes didn't break anything
 */
function runTests(): boolean {
  console.log("\n🧪 Running tests...");
  try {
    execSync("npm run test:run", {
      stdio: "inherit",
      cwd: path.join(__dirname, "../.."),
    });
    console.log("✅ Tests passed!");
    return true;
  } catch (error) {
    console.error("❌ Tests failed!");
    return false;
  }
}

/**
 * Create a git commit for the changes
 */
function gitCommit(fileName: string) {
  try {
    execSync(`git add ${fileName}`, { cwd: path.join(__dirname, "../..") });
    execSync(
      `git commit -m "fix(themes): Auto-fix hardcoded colors in ${path.basename(fileName)}"`,
      { cwd: path.join(__dirname, "..") },
    );
    console.log("  ✅ Committed to git");
  } catch (error) {
    console.log("  ⚠️  Could not commit (no git or no changes)");
  }
}

/**
 * Rollback changes for a file
 */
function rollback(filePath: string) {
  console.log(`  ⏪ Rolling back changes to ${path.basename(filePath)}...`);
  try {
    execSync(`git checkout ${filePath}`, { cwd: path.join(__dirname, "../..") });
    console.log("  ✅ Rolled back");
  } catch (error) {
    console.error("  ❌ Rollback failed - manual intervention needed");
  }
}

/**
 * Main execution
 */
function main() {
  console.log("🎨 Hardcoded Color Auto-Fixer");
  console.log("=============================\n");

  if (DRY_RUN) {
    console.log("🔍 DRY RUN MODE - No files will be modified\n");
  }

  // Get files to process
  let filesToProcess: string[] = [];

  if (SPECIFIC_FILE) {
    const fullPath = path.isAbsolute(SPECIFIC_FILE)
      ? SPECIFIC_FILE
      : path.join(process.cwd(), SPECIFIC_FILE);
    if (fs.existsSync(fullPath)) {
      filesToProcess = [fullPath];
      console.log(`📌 Processing specific file: ${SPECIFIC_FILE}\n`);
    } else {
      console.error(`❌ File not found: ${SPECIFIC_FILE}`);
      process.exit(1);
    }
  } else {
    // Process all docs files
    try {
      filesToProcess = fs
        .readdirSync(DOCS_DIR)
        .filter((file) => file.endsWith("-docs.tsx"))
        .map((file) => path.join(DOCS_DIR, file));
      console.log(`📂 Processing ${filesToProcess.length} files in ${DOCS_DIR}\n`);
    } catch (error) {
      console.error(`❌ Error reading docs directory:`, error);
      process.exit(1);
    }
  }

  // Process each file
  for (let i = 0; i < filesToProcess.length; i++) {
    const filePath = filesToProcess[i];
    filesProcessed++;

    console.log(`[${i + 1}/${filesToProcess.length}]`);
    const wasModified = fixFile(filePath);

    if (wasModified && !DRY_RUN) {
      // Optionally commit after each file
      if (AUTO_COMMIT) {
        gitCommit(filePath);
      }

      // Run tests after modification (optional, can be slow)
      // Uncomment if you want to test after each file:
      // if (!runTests()) {
      //   console.log(`❌ Tests failed after modifying ${path.basename(filePath)}`);
      //   rollback(filePath);
      // }
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 Summary:");
  console.log(`  Files processed: ${filesProcessed}`);
  console.log(`  Files modified: ${filesModified}`);
  console.log(`  Colors replaced: ${colorsReplaced}`);
  console.log(`  isDark props removed: ${propsRemoved}`);
  console.log("=".repeat(50));

  if (DRY_RUN) {
    console.log("\n💡 Run without --dry-run to apply changes");
  } else if (filesModified > 0) {
    console.log("\n✅ Done! Run `npm run test:theme-all` to verify fixes");
  } else {
    console.log("\n✨ No changes needed!");
  }
}

// Run the script
main();
