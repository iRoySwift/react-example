import { useRef } from 'react';

// import { basicSetup, minimalSetup } from 'codemirror';
// import { EditorView, keymap } from '@codemirror/view';
// import { EditorState, Compartment } from '@codemirror/state';
// import { python } from '@codemirror/lang-python';
// import { indentWithTab, defaultKeymap } from '@codemirror/commands';

import React from 'react';
import { useCodeMirror } from './hooks/useCodeMirror';
import { EditorStateConfig, Extension, StateField } from '@codemirror/state';
import { BasicSetupOptions } from './extensions/basic-setup';

export interface ReactCodeMirrorProps
  extends Omit<EditorStateConfig, 'doc' | 'extensions'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'placeholder'> {
  value?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  /** focus on the editor. */
  autoFocus?: boolean;
  /**
   * `light` / `dark` / `Extension` Defaults to `light`.
   * @default light
   */
  theme?: 'light' | 'dark' | Extension | any;
  /**
   * Whether to optional basicSetup by default
   * @default true
   */
  basicSetup?: boolean | BasicSetupOptions;
  /**
   * This disables editing of the editor content by the user.
   * @default true
   */
  editable?: boolean;
  /**
   * Extension values can be [provided](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions) when creating a state to attach various kinds of configuration and behavior information.
   * They can either be built-in extension-providing objects,
   * such as [state fields](https://codemirror.net/6/docs/ref/#state.StateField) or [facet providers](https://codemirror.net/6/docs/ref/#state.Facet.of),
   * or objects with an extension in its `extension` property. Extensions can be nested in arrays arbitrarily deep—they will be flattened when processed.
   */
  extensions?: Extension[];
  /**
   * Create a state from its JSON representation serialized with [toJSON](https://codemirror.net/docs/ref/#state.EditorState.toJSON) function
   */
  initialState?: {
    json: any;
    fields?: Record<string, StateField<any>>;
  };
}

const ReactCodeMirror: React.FC<ReactCodeMirrorProps> = (props) => {
  console.log('🚀 ~ file: index.tsx:40 ~ props:', props);
  const {
    value,
    className,
    theme,
    height = '',
    minHeight = '',
    maxHeight = '',
    width = '',
    minWidth = '',
    maxWidth = '',
    editable,
    extensions = [],
    basicSetup,
    initialState,
    ...other
  } = props;

  console.log('🚀 ~ file: index.tsx:44 ~ theme:', theme);
  const editor = useRef<HTMLDivElement>(null);

  useCodeMirror({
    container: editor.current,
    value,
    theme,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    extensions,
    basicSetup,
    initialState
  });
  const defaultClassNames = typeof theme === 'string' ? `cm-theme-${theme}` : 'cm-theme';

  return <div ref={editor} className={`${defaultClassNames}${className ? ` ${className}` : ''}`} {...other}></div>;
};
ReactCodeMirror.displayName = 'CodeMirror';

export default ReactCodeMirror;
