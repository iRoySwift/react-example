import { AppActions } from '@/store/actions';
import { useAppState, useDispatch } from '@/store/providers';
import { fetchCachedData } from '@/utils/cache';
import { AppCachedKeys, RESIZE_LATENCY } from '@/utils/const';
import { changeLanguage } from '@/utils/i18n';
import { useEffect, useState } from 'react';

const useInitApp = () => {
  const dispatch = useDispatch();
  const { app } = useAppState();
  const [init, setInit] = useState(false);
  if (!init) {
    setInit(true);
    initAppLanguage(app, dispatch);
  }
  useWindowResize(dispatch);
};

const useWindowResize = (dispatch: any) => {
  useEffect(() => {
    let resizeTimer: any = null;
    const resizeListener = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        dispatch({
          type: AppActions.ResizeWindow,
          payload: {
            appWidth: window.innerWidth,
            appHeight: window.innerHeight
          }
        });
        resizeTimer = null;
      }, RESIZE_LATENCY);
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [dispatch]);
};

export const initAppLanguage = (app: State.App, dispatch: any) => {
  const lang = fetchCachedData<'en' | 'zh'>(AppCachedKeys.AppLanguage) || app.language;
  setTimeout(() => {
    dispatch({
      type: AppActions.UpdateAppLanguage,
      payload: {
        language: lang
      }
    });
  }, 0);
  changeLanguage(lang);
};

export { useInitApp, useWindowResize };
