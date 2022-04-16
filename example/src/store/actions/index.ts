export enum AppActions {
  ResizeWindow = 'resizeWindow',
  UpdateLoading = 'updateLoading',
  UpdateAppLanguage = 'updateAppLanguage',
  TOGGLEMODEL = 'TOGGLEMODEL'
}

export enum ComponentsActions {
  UpdateHeaderMobileMenuVisible = 'updateHeaderMobileMenuVisible'
}

export type StateActions = AppActions | ComponentsActions;

export default StateActions;
