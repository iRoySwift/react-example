import { ComponentsActions } from '../actions';

const componentsReducer = (state: State.AppState, { type, payload }: { type: ComponentsActions; payload: State.Components }): State.AppState => {
  switch (type) {
    case ComponentsActions.UpdateHeaderMobileMenuVisible:
      return {
        ...state,
        components: {
          ...state.components,
          mobileMenuVisible: payload.mobileMenuVisible
        }
      };
    default:
      return state;
  }
};

export default componentsReducer;
