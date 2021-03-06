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
    case AppActions.TOGGLEMODEL:
      return {
        ...state,
        app: {
          ...state.app,
          mode: payload.mode
        }
      };
    default:
      return state;
  }
};

export default appReducer;
