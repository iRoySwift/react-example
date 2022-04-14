import StateActions, { AppActions, ComponentsActions } from '../actions';
import appReducer from './app';
import componentsReducer from './components';

export type AppDispatch = React.Dispatch<{ type: StateActions; payload: any }>;

const reducer = (state: State.AppState, { type, payload }: { type: StateActions; payload: any }): State.AppState => {
  if (Object.values(AppActions).includes(type as AppActions)) {
    return appReducer(state, { type: type as AppActions, payload });
  } else {
    return componentsReducer(state, {
      type: type as ComponentsActions,
      payload
    });
  }
};

export default reducer;
