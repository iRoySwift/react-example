import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// state
const initialState = {
  drawer: false,
  test: false
};

// slice
const menuSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer(state, action) {
      state.drawer = action.payload;
    },
    closeDrawer(state, action) {
      state.drawer = action.payload;
    }
  }
});
export const { closeDrawer, openDrawer } = menuSlice.actions;

// reducer
const reducer = combineReducers({ menuSlice: menuSlice.reducer });

// store
const store = configureStore({ reducer });

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// hooks
export const useDrawerState: TypedUseSelectorHook<RootState> = useSelector;
export const useDrawerDispatch: () => AppDispatch = useDispatch;

interface Props {}
const withProvider =
  (Component): React.FC<Props> =>
  (props) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
export default withProvider;
