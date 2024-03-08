import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { iLan, initAppLanguage } from '@/utils/i18n2';

interface Props {}

enum LayoutAction {
  ACTIVE_ITEM = 'ACTIVE_ITEM',
  OPEN_DRAWER = 'OPEN_DRAWER',
  CLOSE_DRAWER = 'CLOSE_DRAWER',
  CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
}

const initialState = {
  openItem: ['dashboard'],
  drawer: true,
  language: navigator.language.includes('zhCN') ? 'zhCN' : 'enUS'
};

const reducer = (state, action) => {
  switch (action.type) {
    case LayoutAction.ACTIVE_ITEM:
      return Object.assign({}, state, {
        openItem: [action.openItem]
      });
    case LayoutAction.OPEN_DRAWER:
      return Object.assign({}, state, {
        drawer: true
      });
    case LayoutAction.CLOSE_DRAWER:
      return Object.assign({}, state, {
        drawer: false
      });
    case LayoutAction.CHANGE_LANGUAGE:
      return Object.assign({}, state, { language: action.language });
    default:
      return state;
  }
};

const activeItem = (openItem) => ({
  type: LayoutAction.ACTIVE_ITEM,
  openItem
});
const openDrawer = () => ({
  type: LayoutAction.OPEN_DRAWER
});
const closeDrawer = () => ({
  type: LayoutAction.CLOSE_DRAWER
});
const handleChangeLanguage = (v: iLan) => ({
  type: LayoutAction.CHANGE_LANGUAGE,
  language: v
});
const LayoutContext = createContext({
  state: initialState,
  dispatch: console.info
});
const withLayoutContext =
  (Component): React.FC<Props> =>
  (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
      initAppLanguage(state, dispatch);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <LayoutContext.Provider value={{ state, dispatch }}>
        <Component {...props} />
      </LayoutContext.Provider>
    );
  };

const useLayoutState = () => useContext(LayoutContext).state;
const useLayoutDispatch = () => useContext(LayoutContext).dispatch;

export { useLayoutState, useLayoutDispatch, activeItem, openDrawer, closeDrawer, handleChangeLanguage };
export default withLayoutContext;
