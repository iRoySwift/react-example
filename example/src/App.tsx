import Routers from '@/routes/index';
// import withProviders from './store/providers';
import ThemeCustomization from './theme';

const App = () => {
  return (
    <ThemeCustomization>
      <Routers />
    </ThemeCustomization>
  );
};

export default App;
