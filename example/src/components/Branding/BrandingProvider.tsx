import { useAppState } from '@/store/providers';
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { getDesignTokens } from './brandingTheme';

interface Props {
  children: any;
}
const BrandingProvider: React.FC<Props> = ({ children }) => {
  const {
    app: { mode }
  } = useAppState();

  const designTokens = getDesignTokens(mode);
  const theme = createTheme(designTokens);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default BrandingProvider;
