import Routers from '@/routes/index';
import withProviders from './store/providers';
import { useInitApp } from './hooks';
import ThemeCustomization from './theme';

const App = withProviders(() => {
  useInitApp();
  return (
    <ThemeCustomization>
      <Routers />
    </ThemeCustomization>
  );
});

export default App;
