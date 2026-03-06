# IDE Troubleshooting Guide

## Issue: Red Lines in vite.config.ts

If you're seeing a red line under `'@vitejs/plugin-react'` in vite.config.ts, this is an **IDE caching issue**, not an actual code problem.

### ✅ Verification

The code is actually working correctly:
- ✅ Package is installed: `@vitejs/plugin-react@4.7.0`
- ✅ TypeScript compilation passes: `npx tsc --noEmit` (no errors)
- ✅ Build succeeds: `npm run build` (successful)
- ✅ Module resolves at runtime: Verified with Node.js

### 🔧 Solutions (Try in Order)

#### 1. Restart TypeScript Server (Quickest)

**VS Code:**
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type: `TypeScript: Restart TS Server`
3. Press Enter

**WebStorm/IntelliJ:**
1. Go to File → Invalidate Caches
2. Select "Invalidate and Restart"

#### 2. Reload IDE Window

**VS Code:**
1. Press `Cmd+Shift+P` / `Ctrl+Shift+P`
2. Type: `Developer: Reload Window`
3. Press Enter

#### 3. Select Workspace TypeScript Version

**VS Code:**
1. Open vite.config.ts
2. Click on the TypeScript version in the bottom-right status bar
3. Select "Use Workspace Version"
4. Should show: TypeScript 5.9.3

#### 4. Close and Reopen Project

Sometimes the IDE needs a full restart:
1. Close the IDE completely
2. Reopen the project folder
3. Wait for indexing to complete (check status bar)

#### 5. Clear IDE Caches

**VS Code:**
```bash
# Close VS Code first, then:
rm -rf ~/Library/Caches/com.microsoft.VSCode  # Mac
rm -rf ~/.config/Code/Cache                    # Linux
# Windows: Delete %APPDATA%\Code\Cache
```

**WebStorm:**
- File → Invalidate Caches → Invalidate and Restart

#### 6. Reinstall node_modules

```bash
cd competency-assessment-mvp
rm -rf node_modules package-lock.json
npm install
```

Then restart your IDE.

### 🎯 Why This Happens

This is a known issue with TypeScript language servers in IDEs:
- The IDE caches module resolution results
- When packages are installed after the IDE starts, the cache may not update
- The actual TypeScript compiler (used by build tools) works fine
- Only the IDE's language server shows the error

### ✅ Confirm It's Working

Run these commands to verify everything is actually fine:

```bash
# TypeScript compilation (should pass with no errors)
npx tsc --noEmit

# Build (should succeed)
npm run build

# Dev server (should start without errors)
npm run dev
```

If all these work, the red line is just a cosmetic IDE issue.

### 📝 Alternative: Ignore the Error

If the above solutions don't work and you've verified the code compiles and runs:
1. The error is purely cosmetic
2. The application will work correctly
3. You can safely ignore the red line
4. Consider it a known IDE limitation

### 🐛 Report to IDE

If this persists:
- **VS Code**: Report at https://github.com/microsoft/vscode/issues
- **WebStorm**: Report at https://youtrack.jetbrains.com

Include:
- IDE version
- TypeScript version (5.9.3)
- Node version
- Operating system

---

**Bottom Line**: The code is correct and working. This is an IDE display issue only.
