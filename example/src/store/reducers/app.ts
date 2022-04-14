import { AppActions } from '../actions';

const appReducer = (state: State.AppState, { type, payload }: { type: AppActions; payload: State.AppPayload }): State.AppState => {
  switch (type) {
    case AppActions.ResizeWindow:
      return {
        ...state,
        app: {
          ...state.app,
          appWidth: payload.appWidth,
          appHeight: payload.appHeight
        }
      };
    case AppActions.UpdateAppLanguage:
      return {
        ...state,
        app: {
          ...state.app,
          language: payload.language
        }
      };
    default:
      return state;
  }
};

export default appReducer;
