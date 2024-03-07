import { useRoutes } from 'react-router-dom';
import MainRoute from './MainRoute';
import Components from './Components';

export let routes = [MainRoute, Components];

export default function Routes() {
  return useRoutes(routes);
}
