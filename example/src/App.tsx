import styled, { ThemeProvider } from 'styled-components';
import Routers from '@/routes/index';
import { MAINNET_PRIMARY_THEME_COLOR, MAINNET_SECONDARY_THEME_COLOR } from './utils/const';
import withProviders from './store/providers';
import { useInitApp } from './hooks';

const Theme = {
  primary: MAINNET_PRIMARY_THEME_COLOR,
  secondary: MAINNET_SECONDARY_THEME_COLOR
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const App = withProviders(() => {
  useInitApp();
  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Routers />
      </Container>
    </ThemeProvider>
  );
});

export default App;
