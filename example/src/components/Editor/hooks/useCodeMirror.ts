// import { python } from '@codemirror/lang-python';
import { useEffect, useState } from 'react';
// import { basicSetup, minimalSetup } from 'codemirror';
import { EditorState, StateEffect } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

import { oneDark } from '@codemirror/theme-one-dark';

import { ReactCodeMirrorProps } from '..';
import { basicSetup } from '../extensions/basic-setup';
// import { basicSetup } from 'codemirror';

interface iUseCodeMirror extends ReactCodeMirrorProps {
  container?: HTMLDivElement | null;
}
const useCodeMirror = (props: iUseCodeMirror) => {
  const {
    value,
    theme = 'light',
    height = '',
    minHeight = '',
    maxHeight = '',
    width = '',
    minWidth = '',
    maxWidth = '',
    editable = true,
    extensions = [],
    basicSetup: defaultBasicSetup = true,
    initialState
  } = props;
  console.log('🚀 ~ file: useCodeMirror.ts:4 ~ useCodeMirror ~ props:', theme);
  const [container, setContainer] = useState<HTMLDivElement>();
  const [view, setView] = useState<EditorView>();
  const [state, setState] = useState<EditorState>();
  const defaultLightThemeOption = EditorView.theme(
    {
      '&': {
        backgroundColor: '#fff'
      }
    },
    {
      dark: false
    }
  );
  const defaultThemeOption = EditorView.theme({
    '&': {
      height,
      minHeight,
      maxHeight,
      width,
      minWidth,
      maxWidth
    }
  });
  let getExtensions = [
    defaultThemeOption
    // basicSetup,
    // minimalSetup
    // language.of(python()),
    // tabSize.of(EditorState.tabSize.of(8)),
    // keymap.of([indentWithTab, { key: 'Alt-l', run: moveToLine }]),
    // keymap.of(defaultKeymap)
  ];
  useEffect(() => setContainer(props.container!), [props.container]);

  if (defaultBasicSetup) {
    if (typeof defaultBasicSetup === 'boolean') {
      getExtensions.unshift(basicSetup());
    } else {
      getExtensions.unshift(basicSetup(defaultBasicSetup));
    }
  }

  console.log('🚀 ~ file: useCodeMirror.ts:63 ~ useCodeMirror ~ theme:', theme);
  switch (theme) {
    case 'light':
      getExtensions.push(defaultLightThemeOption);
      break;
    case 'dark':
      getExtensions.push(oneDark);
      break;
    default:
      getExtensions.push(theme);
      break;
  }

  if (editable === false) {
    getExtensions.push(EditorView.editable.of(false));
  }

  getExtensions = getExtensions.concat(extensions);

  useEffect(() => {
    console.log('🚀 ~ file: useCodeMirror.ts:21 ~ useEffect ~ container:', container);
    if (container && !state) {
      const config = {
        doc: value,
        extensions: getExtensions
      };
      let stateCurrent = initialState ? EditorState.fromJSON(initialState.json, config, initialState.fields) : EditorState.create(config);
      setState(stateCurrent);
      if (!view) {
        const viewCurrent = new EditorView({
          parent: container,
          state: stateCurrent
        });
        setView(viewCurrent);
      }
    }
    return () => {
      if (view) {
        setView(undefined);
        setState(undefined);
      }
    };
  }, [container, value, state]);

  useEffect(
    () => () => {
      if (view) {
        view.destroy();
        setView(undefined);
      }
    },
    [view]
  );

  useEffect(() => {
    if (view) {
      view.dispatch({ effects: StateEffect.reconfigure.of(getExtensions) });
    }
  }, [theme, extensions, height, minHeight, maxHeight, width, minWidth, maxWidth, defaultBasicSetup]);

  useEffect(() => {
    const currentValue = view ? view.state.doc.toString() : '';
    if (view && value !== currentValue) {
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value || '' }
      });
    }
  }, [value, view]);

  return [view, setView, view, setView, container, setContainer];
};

export { useCodeMirror };
