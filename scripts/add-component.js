#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const COMPONENTS_DIR = path.join(__dirname, '../src/components/ui')
const TARGET_PROJECT = process.argv[2] || process.cwd()

function copyComponent(componentName) {
  const sourceDir = path.join(COMPONENTS_DIR, componentName)
  const targetDir = path.join(TARGET_PROJECT, 'src/shared/ui', componentName)
  
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Component "${componentName}" not found in the toolkit`)
    process.exit(1)
  }
  
  // Create target directory
  fs.mkdirSync(targetDir, { recursive: true })
  
  // Copy all files from component directory
  const files = fs.readdirSync(sourceDir)
  files.forEach(file => {
    const sourceFile = path.join(sourceDir, file)
    const targetFile = path.join(targetDir, file)
    
    if (fs.statSync(sourceFile).isFile()) {
      fs.copyFileSync(sourceFile, targetFile)
      console.log(`✅ Copied ${file}`)
    }
  })
  
  console.log(`🎉 Component "${componentName}" added successfully!`)
}

function listComponents() {
  const components = fs.readdirSync(COMPONENTS_DIR)
  console.log('📦 Available components:')
  components.forEach(comp => {
    console.log(`  - ${comp}`)
  })
}

const command = process.argv[2]
const componentName = process.argv[3]

if (command === 'list') {
  listComponents()
} else if (componentName) {
  copyComponent(componentName)
} else {
  console.log(`
Usage:
  node add-component.js <component-name> [target-project-path]
  node add-component.js list

Examples:
  node add-component.js scrollbar
  node add-component.js scrollbar /path/to/project
  node add-component.js list
  `)
}
