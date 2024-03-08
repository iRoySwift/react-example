import React, { createContext, useContext, useReducer } from 'react';

// action
enum Action {
  OPEN_DRAWER = 'OPEN_DRAWER',
  CLOSE_DRAWER = 'CLOSE_DRAWER'
}
const openDrawer = () => ({
  type: Action.OPEN_DRAWER
});
const closeDrawer = () => ({
  type: Action.CLOSE_DRAWER
});

// state
const initialState = {
  drawer: false
};

// reducers
const reducer = (state, action) => {
  switch (action.type) {
    case Action.OPEN_DRAWER:
      return Object.assign({}, state, {
        drawer: true
      });
    case Action.CLOSE_DRAWER:
      return Object.assign({}, state, {
        drawer: false
      });
    default:
      return false;
  }
};

// Provider
const Context = createContext({
  state: initialState,
  dispatch: console.info
});

interface Props {}
const withProvider =
  (Component): React.FC<Props> =>
  (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <Context.Provider value={{ state, dispatch }}>
        <Component {...props} />
      </Context.Provider>
    );
  };

const useStoreState = () => useContext(Context).state;
const useStoreDispatch = () => useContext(Context).dispatch;

export default withProvider;
export { useStoreState, useStoreDispatch, openDrawer, closeDrawer };
