const initApp: State.App = {
  appWidth: window.innerWidth,
  appHeight: window.innerHeight,
  language: navigator.language.includes('zh') ? 'zh' : 'en',
  mode: 'light'
};

export default initApp;
