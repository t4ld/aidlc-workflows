# Engage2 MUI Design System Integration

## Overview

This project incorporates the Engage2 MUI design system (Joule theme), a comprehensive Material-UI based design system featuring custom theming, components, and styling patterns.

## Design System Location

The complete design system is located in the `engage2-mui-trial/` directory.

## Key Features

### Theme Configuration

The design system uses a custom Joule theme with:

- **Dual Mode Support**: Light and dark color schemes
- **Custom Color Palette**: Primary (#0067A3), Secondary (#FFA100), Error, Warning, Info, and Success colors
- **Typography**: IBM Plex Sans and IBM Plex Mono font families
- **Shape System**: Multiple border radius options (S: 4px, M: 8px, L: 16px, Full: 1000px)
- **Shadow System**: 25 elevation levels for depth and hierarchy
- **Component Overrides**: Extensive MUI component customizations

### Core Files

```
engage2-mui-trial/
├── joule theme/
│   └── theme.json          # Complete theme configuration
├── src/
│   ├── theme.ts            # Theme creation and export
│   ├── components/         # Custom components
│   │   ├── AppBar.tsx      # Application header
│   │   ├── StatusChip.tsx  # Status indicator chips
│   │   ├── FilterChip.tsx  # Filter chips
│   │   ├── FilterDrawer.tsx
│   │   ├── FilterToolbar.tsx
│   │   ├── GridToolbar.tsx
│   │   ├── SelectionToolbar.tsx
│   │   ├── CardRow.tsx
│   │   ├── CollapsibleFilterChips.tsx
│   │   └── EngageIcon.tsx  # Custom icon component
│   └── utils/
│       └── assigneeUtils.ts
```

## Installation

### 1. Install Dependencies

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-data-grid
npm install @fontsource/ibm-plex-sans @fontsource/ibm-plex-mono
```

### 2. Copy Theme Files

Copy the following from `engage2-mui-trial/`:

```bash
# Copy theme configuration
cp -r engage2-mui-trial/joule\ theme/ ./src/theme/

# Copy theme.ts
cp engage2-mui-trial/src/theme.ts ./src/

# Copy components (optional, as needed)
cp -r engage2-mui-trial/src/components/ ./src/components/
```

## Usage

### Basic Setup

```tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { jouleTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={jouleTheme}>
      <CssBaseline />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Using Dark Mode

```tsx
import { createJouleTheme } from './theme';

// Create dark theme
const darkTheme = createJouleTheme('dark');

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Theme Switching

```tsx
import { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createJouleTheme } from './theme';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  const theme = useMemo(() => createJouleTheme(mode), [mode]);
  
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <button onClick={toggleTheme}>Toggle Theme</button>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## Color Palette

### Light Mode

- **Primary**: #0067A3 (Blue)
- **Secondary**: #FFA100 (Orange)
- **Error**: #B40006 (Red)
- **Warning**: #E57709 (Orange)
- **Info**: #81D4FA (Light Blue)
- **Success**: #2E7D32 (Green)

### Dark Mode

- **Primary**: #00AAFF (Bright Blue)
- **Secondary**: #FEAC2A (Bright Orange)
- **Error**: #F21E48 (Bright Red)
- **Warning**: #E57709 (Orange)
- **Info**: #29B6F6 (Blue)
- **Success**: #66BB6A (Green)

## Typography

All typography uses **IBM Plex Sans** as the primary font family, with **IBM Plex Mono** for monospace text.

```tsx
import '@fontsource/ibm-plex-sans';
import '@fontsource/ibm-plex-mono';
```

## Custom Components

### StatusChip

Status indicator with predefined color mappings:

```tsx
import StatusChip from './components/StatusChip';

<StatusChip status="At Risk" />
<StatusChip status="In Progress" />
<StatusChip status="Complete" />
```

Status colors:
- **At Risk**: Red (#b40006)
- **Unassigned**: Orange (#e57709)
- **Pending Review**: Outlined red
- **Assigned**: Outlined blue
- **Pending Close**: Blue (#0067A3)
- **In Progress**: Light blue (#81D4FA)
- **Complete**: Gray

### AppBar

Custom application header with navigation tabs:

```tsx
import { AppBar } from './components/AppBar';

<AppBar 
  activeTab={0}
  onTabChange={(event, newValue) => console.log(newValue)}
/>
```

### FilterChip

Chip component for filters with delete functionality:

```tsx
import FilterChip from './components/FilterChip';

<FilterChip 
  label="Filter Name"
  onDelete={() => console.log('deleted')}
/>
```

## Border Radius System

The theme provides multiple border radius options:

```tsx
// In your components
sx={{
  borderRadius: 'var(--mui-shape-borderRadiusS)', // 4px
  borderRadius: 'var(--mui-shape-borderRadiusM)', // 8px (default)
  borderRadius: 'var(--mui-shape-borderRadiusL)', // 16px
  borderRadius: 'var(--mui-shape-borderRadiusFull)', // 1000px (pill shape)
}}
```

## Shadow System

25 elevation levels available via `theme.shadows[0-24]`:

```tsx
import { useTheme } from '@mui/material';

const theme = useTheme();

<Box sx={{ boxShadow: theme.shadows[6] }}>
  Elevated content
</Box>
```

## Component Customization

The theme includes extensive MUI component overrides for:

- Buttons (all variants and sizes)
- Chips
- Text fields
- Switches
- Alerts
- And more...

These customizations are automatically applied when using MUI components within the ThemeProvider.

## Best Practices

1. **Always wrap your app with ThemeProvider and CssBaseline**
2. **Use theme values instead of hardcoded colors**
3. **Leverage the custom components for consistency**
4. **Use the sx prop for component-specific styling**
5. **Import fonts at the app entry point**

## Example Application

See `engage2-mui-trial/src/App.tsx` for a complete working example with:
- Theme provider setup
- AppBar integration
- Data grid with custom styling
- Filter components
- Responsive design patterns

## Resources

- [Material-UI Documentation](https://mui.com/material-ui/)
- [Emotion Documentation](https://emotion.sh/docs/introduction)
- [IBM Plex Fonts](https://www.ibm.com/plex/)
