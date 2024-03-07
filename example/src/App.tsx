import Routers from '@/routes/index';
// import withProviders from './store/providers';
import { useInitApp } from './hooks';
import ThemeCustomization from './theme';

const App = () => {
  useInitApp();
  return (
    <ThemeCustomization>
      <Routers />
    </ThemeCustomization>
  );
};

export default App;
