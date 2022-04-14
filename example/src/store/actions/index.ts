export enum AppActions {
  ResizeWindow = 'resizeWindow',
  UpdateLoading = 'updateLoading',
  UpdateAppLanguage = 'updateAppLanguage'
}

export enum ComponentsActions {
  UpdateHeaderMobileMenuVisible = 'updateHeaderMobileMenuVisible'
}

export type StateActions = AppActions | ComponentsActions;

export default StateActions;
