import { useImperativeHandle, useRef } from 'react';

// import { basicSetup, minimalSetup } from 'codemirror';
import { ViewUpdate } from '@codemirror/view';
// import { EditorState, Compartment } from '@codemirror/state';
// import { python } from '@codemirror/lang-python';
// import { indentWithTab, defaultKeymap } from '@codemirror/commands';

import React from 'react';
import { useCodeMirror } from './hooks/useCodeMirror';
import { EditorState, EditorStateConfig, Extension, StateField } from '@codemirror/state';
import { BasicSetupOptions } from './extensions/basic-setup';
import { Statistics } from './utils';
import { EditorView } from 'codemirror';

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
  /** Enables a placeholder—a piece of example content to show when the editor is empty. */
  placeholder?: string | HTMLElement;
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
   * This disables editing of the editor content by the user.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Whether to optional basicSetup by default
   * @default true
   */
  indentWithTab?: boolean;
  tabSize?: number;
  /** Fired whenever a change occurs to the document. */
  onChange?(value: string, viewUpdate: ViewUpdate): void;
  /** Some data on the statistics editor. */
  onStatistics?(data: Statistics): void;
  /** Fired whenever any state change occurs within the editor, including non-document changes like lint results. */
  onUpdate?(viewUpdate: ViewUpdate): void;
  /** The first time the editor executes the event. */
  onCreateEditor?(view: EditorView, state: EditorState): void;
  /**
   * Extension values can be [provided](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions) when creating a state to attach various kinds of configuration and behavior information.
   * They can either be built-in extension-providing objects,
   * such as [state fields](https://codemirror.net/6/docs/ref/#state.StateField) or [facet providers](https://codemirror.net/6/docs/ref/#state.Facet.of),
   * or objects with an extension in its `extension` property. Extensions can be nested in arrays arbitrarily deep—they will be flattened when processed.
   */
  extensions?: Extension[];
  /**
   * If the view is going to be mounted in a shadow root or document other than the one held by the global variable document (the default), you should pass it here.
   * Originally from the [config of EditorView](https://codemirror.net/6/docs/ref/#view.EditorView.constructor%5Econfig.root)
   */
  root?: ShadowRoot | Document;
  /**
   * Create a state from its JSON representation serialized with [toJSON](https://codemirror.net/docs/ref/#state.EditorState.toJSON) function
   */
  initialState?: {
    json: any;
    fields?: Record<string, StateField<any>>;
  };
}

const ReactCodeMirror: React.FC<ReactCodeMirrorProps> = React.forwardRef((props, ref) => {
  const {
    value = '',
    className,
    selection,
    extensions = [],
    onChange,
    onStatistics,
    onCreateEditor,
    onUpdate,
    autoFocus,
    theme = 'light',
    height = '',
    minHeight = '',
    maxHeight = '',
    width = '',
    minWidth = '',
    maxWidth = '',
    tabSize,
    basicSetup,
    placeholder,
    indentWithTab,
    editable,
    readOnly,
    root,
    initialState,
    ...other
  } = props;

  const editor = useRef<HTMLDivElement>(null);

  const { state, view, container } = useCodeMirror({
    container: editor.current,
    root,
    value,
    theme,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    tabSize,
    extensions,
    editable,
    autoFocus,
    readOnly,
    basicSetup,
    selection,
    onChange,
    onStatistics,
    onCreateEditor,
    onUpdate,
    placeholder,
    indentWithTab,
    initialState
  });

  useImperativeHandle(
    ref,
    () => ({
      editor: editor.current,
      state,
      view
    }),
    [editor, container, state, view]
  );

  // check type of value
  if (typeof value !== 'string') {
    throw new Error(`value must be typeof string but got ${typeof value}`);
  }

  const defaultClassNames = typeof theme === 'string' ? `cm-theme-${theme}` : 'cm-theme';

  return <div ref={editor} className={`${defaultClassNames}${className ? ` ${className}` : ''}`} {...other}></div>;
});
ReactCodeMirror.displayName = 'CodeMirror';

export default ReactCodeMirror;
