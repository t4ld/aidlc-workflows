# Quick Start: Integrating the Engage2 Design System

## Step-by-Step Integration Guide

### Step 1: Install Required Dependencies

Add these to your project's `package.json`:

```json
{
  "dependencies": {
    "@emotion/react": "latest",
    "@emotion/styled": "latest",
    "@fontsource/ibm-plex-mono": "^5.2.6",
    "@fontsource/ibm-plex-sans": "^5.2.6",
    "@mui/icons-material": "^7.1.2",
    "@mui/material": "latest",
    "@mui/x-data-grid": "^8.6.0",
    "react": "latest",
    "react-dom": "latest"
  }
}
```

Then run:
```bash
npm install
```

### Step 2: Copy Design System Files

#### Option A: Copy Everything (Recommended for full integration)

```bash
# Create directories
mkdir -p src/theme
mkdir -p src/components/design-system

# Copy theme files
cp -r engage2-mui-trial/joule\ theme src/theme/
cp engage2-mui-trial/src/theme.ts src/theme/

# Copy all components
cp engage2-mui-trial/src/components/*.tsx src/components/design-system/

# Copy utilities
mkdir -p src/utils
cp engage2-mui-trial/src/utils/*.ts src/utils/
```

#### Option B: Copy Only Theme (Minimal integration)

```bash
# Create theme directory
mkdir -p src/theme

# Copy theme files
cp -r engage2-mui-trial/joule\ theme src/theme/
cp engage2-mui-trial/src/theme.ts src/theme/
```

### Step 3: Update Import Paths

If you copied to different locations, update the import in `src/theme/theme.ts`:

```typescript
// Change this line:
import themeJson from '../joule theme/theme.json';

// To match your structure:
import themeJson from './joule theme/theme.json';
```

### Step 4: Set Up Your Main App File

Create or update your main application file:

```typescript
// src/main.tsx or src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { jouleTheme } from './theme/theme';
import '@fontsource/ibm-plex-sans';
import '@fontsource/ibm-plex-mono';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={jouleTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### Step 5: Use Design System Components

#### Example 1: Using the Theme

```typescript
import { Button, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      p: 3,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius 
    }}>
      <Typography variant="h4" color="primary.contrastText">
        Hello Engage2!
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Box>
  );
}
```

#### Example 2: Using Custom Components

```typescript
import { AppBar } from './components/design-system/AppBar';
import StatusChip from './components/design-system/StatusChip';

function MyApp() {
  return (
    <>
      <AppBar activeTab={0} />
      <Box sx={{ p: 3 }}>
        <StatusChip status="In Progress" />
        <StatusChip status="At Risk" />
        <StatusChip status="Complete" />
      </Box>
    </>
  );
}
```

### Step 6: Configure TypeScript (if using TypeScript)

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "jsx": "react-jsx"
  }
}
```

## Common Integration Patterns

### Pattern 1: Theme with Mode Toggle

```typescript
import { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { createJouleTheme } from './theme/theme';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(() => createJouleTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IconButton 
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        color="inherit"
      >
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Pattern 2: Using with React Router

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { jouleTheme } from './theme/theme';
import { AppBar } from './components/design-system/AppBar';

function App() {
  return (
    <ThemeProvider theme={jouleTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
```

### Pattern 3: Custom Styled Components

```typescript
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const StyledCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  '&:hover': {
    boxShadow: theme.shadows[8],
  },
}));

function MyCard() {
  return (
    <StyledCard>
      Card content here
    </StyledCard>
  );
}
```

## Troubleshooting

### Issue: Theme not applying

**Solution**: Ensure ThemeProvider wraps your entire app and CssBaseline is included:

```typescript
<ThemeProvider theme={jouleTheme}>
  <CssBaseline />
  <App />
</ThemeProvider>
```

### Issue: Fonts not loading

**Solution**: Import fonts at the top of your main file:

```typescript
import '@fontsource/ibm-plex-sans';
import '@fontsource/ibm-plex-mono';
```

### Issue: JSON import error

**Solution**: Enable JSON imports in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

### Issue: Component styles not matching

**Solution**: Check that you're using the correct MUI version (v7+) and Emotion as the style engine.

## Next Steps

1. Review the complete documentation in `DESIGN_SYSTEM.md`
2. Explore example components in `engage2-mui-trial/src/components/`
3. Check the theme configuration in `engage2-mui-trial/joule theme/theme.json`
4. Customize the theme for your specific needs
5. Build your own components using the design system patterns

## Additional Resources

- **Example App**: `engage2-mui-trial/src/App.tsx`
- **Theme Source**: `engage2-mui-trial/src/theme.ts`
- **Component Examples**: `engage2-mui-trial/src/components/`
- **MUI Documentation**: https://mui.com/material-ui/
