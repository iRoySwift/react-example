import { ThemeOptions } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
  export interface TypeBackground {
    default: string;
    paper: string;
    topBar: string;
  }
  interface Palette {
    background: TypeBackground;
  }
}

// const systemFont = ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'];

export const getDesignTokens = (mode: 'light' | 'dark') =>
  ({
    palette: {
      mode,
      ...(mode === 'dark' && {
        background: {
          // default: blueDark[800],
          topBar: '#212329',
          paper: '#282c34'
        }
      })
    }
  } as ThemeOptions);
