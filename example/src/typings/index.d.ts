declare namespace State {
  type IMode = 'light' | 'dark';
  export interface App {
    appWidth: number;
    appHeight: number;
    language: 'en' | 'zh';
    mode: IMode;
  }

  export interface AppPayload extends App {}

  export interface Components {
    mobileMenuVisible: boolean;
  }

  export interface AppState {
    app: App;
    components: Components;
  }
}

declare module 'Routes';
