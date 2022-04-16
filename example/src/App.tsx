// import { ThemeProvider } from '@emotion/react';
import { styled } from '@mui/material/styles';
// import * as locales from '@mui/material/locale';

import Routers from '@/routes/index';
// import { MAINNET_PRIMARY_THEME_COLOR, MAINNET_SECONDARY_THEME_COLOR } from './utils/const';
import withProviders from './store/providers';
import { useInitApp } from './hooks';
import BrandingProvider from './components/Branding/BrandingProvider';

// const Theme = {
//   primary: MAINNET_PRIMARY_THEME_COLOR,
//   secondary: MAINNET_SECONDARY_THEME_COLOR
// };

// const theme = createTheme(
//   {
//     palette: {
//       primary: { main: MAINNET_PRIMARY_THEME_COLOR }
//     }
//   },
//   zhCN
// );

const Container = styled('div')`
  width: 100vw;
  height: 100vh;
`;
// type SupportedLocales = keyof typeof locales;

const App = withProviders(() => {
  // const [locale, setLocale] = useState<SupportedLocales>('zhCN');

  // const {
  //   app: { mode }
  // } = useAppState();

  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode
  //       }
  //     }),
  //   [mode]
  // );

  // const themeWithLocale = useMemo(() => createTheme(theme, locales['zhCN']), ['zhCN', theme]);

  useInitApp();
  return (
    <BrandingProvider>
      <Container>
        <Routers />
      </Container>
    </BrandingProvider>
  );
});

export default App;
