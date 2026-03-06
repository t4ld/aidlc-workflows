import { CssBaseline, ThemeProvider } from '@mui/material';
import { ListView } from './listview';
import { AppBar } from './components/AppBar';
import { jouleTheme } from './theme';


export default function App() {
  return (
    <ThemeProvider theme={jouleTheme}>
      <CssBaseline />
      <AppBar />
      <ListView />
    </ThemeProvider>
  );
}
