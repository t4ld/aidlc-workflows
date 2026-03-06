import { createTheme, Theme } from '@mui/material/styles';
import themeJson from '../joule theme/theme.json';

// Create Material-UI shadows based on common shadow values
const createShadows = () => {
  const shadows = [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 1px 6px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)',
    '0px 6px 8px rgba(0, 0, 0, 0.1), 0px 3px 6px rgba(0, 0, 0, 0.06)',
    '0px 8px 10px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.06)',
    '0px 10px 12px rgba(0, 0, 0, 0.1), 0px 5px 10px rgba(0, 0, 0, 0.06)',
    '0px 12px 14px rgba(0, 0, 0, 0.1), 0px 6px 12px rgba(0, 0, 0, 0.06)',
    '0px 14px 16px rgba(0, 0, 0, 0.1), 0px 7px 14px rgba(0, 0, 0, 0.06)',
    '0px 16px 18px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.06)',
    '0px 18px 20px rgba(0, 0, 0, 0.1), 0px 9px 18px rgba(0, 0, 0, 0.06)',
    '0px 20px 22px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.06)',
    '0px 22px 24px rgba(0, 0, 0, 0.1), 0px 11px 22px rgba(0, 0, 0, 0.06)',
    '0px 24px 26px rgba(0, 0, 0, 0.1), 0px 12px 24px rgba(0, 0, 0, 0.06)',
    '0px 26px 28px rgba(0, 0, 0, 0.1), 0px 13px 26px rgba(0, 0, 0, 0.06)',
    '0px 28px 30px rgba(0, 0, 0, 0.1), 0px 14px 28px rgba(0, 0, 0, 0.06)',
    '0px 30px 32px rgba(0, 0, 0, 0.1), 0px 15px 30px rgba(0, 0, 0, 0.06)',
    '0px 32px 34px rgba(0, 0, 0, 0.1), 0px 16px 32px rgba(0, 0, 0, 0.06)',
    '0px 34px 36px rgba(0, 0, 0, 0.1), 0px 17px 34px rgba(0, 0, 0, 0.06)',
    '0px 36px 38px rgba(0, 0, 0, 0.1), 0px 18px 36px rgba(0, 0, 0, 0.06)',
    '0px 38px 40px rgba(0, 0, 0, 0.1), 0px 19px 38px rgba(0, 0, 0, 0.06)',
    '0px 40px 42px rgba(0, 0, 0, 0.1), 0px 20px 40px rgba(0, 0, 0, 0.06)',
    '0px 42px 44px rgba(0, 0, 0, 0.1), 0px 21px 42px rgba(0, 0, 0, 0.06)',
    '0px 44px 46px rgba(0, 0, 0, 0.1), 0px 22px 44px rgba(0, 0, 0, 0.06)',
  ];
  return shadows as Theme['shadows'];
};

// Create the theme from the JSON configuration
export const createJouleTheme = (mode: 'light' | 'dark' = 'light'): Theme => {
  const colorScheme = themeJson.colorSchemes[mode];
  const palette = colorScheme.palette;

  return createTheme({
    palette: {
      mode,
      primary: {
        main: palette.primary.main,
        dark: palette.primary.dark,
        light: palette.primary.light,
        contrastText: palette.primary.contrastText,
      },
      secondary: {
        main: palette.secondary.main,
        dark: palette.secondary.dark,
        light: palette.secondary.light,
        contrastText: palette.secondary.contrastText,
      },
      error: {
        main: palette.error.main,
        dark: palette.error.dark,
        light: palette.error.light,
        contrastText: palette.error.contrastText,
      },
      warning: {
        main: palette.warning.main,
        dark: palette.warning.dark,
        light: palette.warning.light,
        contrastText: palette.warning.contrastText,
      },
      info: {
        main: palette.info.main,
        dark: 'dark' in palette.info ? palette.info.dark : palette.info.main,
        light: 'light' in palette.info ? palette.info.light : palette.info.main,
        contrastText: palette.info.contrastText,
      },
      success: {
        main: palette.success.main,
        dark: palette.success.dark,
        contrastText: palette.success.contrastText,
      },
      text: {
        primary: 'primary' in palette.text ? palette.text.primary : (mode === 'light' ? '#000000' : '#ffffff'),
        secondary: 'secondary' in palette.text ? palette.text.secondary : (mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'),
      },
      action: {
        disabled: palette.action?.disabled || (mode === 'light' ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.38)'),
        disabledBackground: palette.action?.disabledBackground || (mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)'),
        hover: palette.action?.hover || (mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)'),
      },
    },
    typography: {
      fontFamily: themeJson.typography.body1.fontFamily,
      h1: {
        fontFamily: themeJson.typography.h1.fontFamily,
      },
      h2: {
        fontFamily: themeJson.typography.h2.fontFamily,
      },
      h3: {
        fontFamily: themeJson.typography.h3.fontFamily,
      },
      h4: {
        fontFamily: themeJson.typography.h4.fontFamily,
      },
      h5: {
        fontFamily: themeJson.typography.h5.fontFamily,
      },
      h6: {
        fontFamily: themeJson.typography.h6.fontFamily,
      },
      body1: {
        fontFamily: themeJson.typography.body1.fontFamily,
      },
      body2: {
        fontFamily: themeJson.typography.body2.fontFamily,
      },
      subtitle1: {
        fontFamily: themeJson.typography.subtitle1.fontFamily,
      },
      subtitle2: {
        fontFamily: themeJson.typography.subtitle2.fontFamily,
      },
      caption: {
        fontFamily: themeJson.typography.caption.fontFamily,
      },
      overline: {
        fontFamily: themeJson.typography.overline.fontFamily,
      },
    },
    shape: {
      borderRadius: themeJson.shape.borderRadiusM, // Use medium radius as default
    },
    shadows: createShadows(),
    spacing: 8, // Standard Material-UI spacing
  });
};

// Export the default light theme
export const jouleTheme = createJouleTheme('light');
