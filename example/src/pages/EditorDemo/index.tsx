import React, { useEffect, useRef, useState } from 'react';
import CodeMirror, { ReactCodeMirrorProps } from '@/components/Editor/index';
// import { styled } from '@mui/material';
import { MarkdownDocument, SplitScreen, Tools, Wrapper } from './styled';
import Select from '@/components/@extensions/Select';
import { langs } from '@/components/Editor/extensions/langs';
import { Extension } from '@codemirror/state';
import { color } from '@/components/Editor/extensions/color';
import { BasicSetupOptions } from '@/components/Editor/extensions/basic-setup';
import { Options } from '@/components/@extensions/Options';
import Header from './Header';
import Pyodide from '@/components/Pyodidenic';
import Footer from './Footer';

const themeOptions = ['dark', 'light'];
const heightOptions = ['auto', '200px', '300px', '500px'];
let count = 0;
export type iLang = keyof typeof langs;

interface Props {}
const EditorDemo: React.FC<Props> = () => {
  const pyodideRef = useRef<any>(null);
  const [mode, setMode] = useState<iLang>('javascript');
  const [theme, setTheme] = useState<ReactCodeMirrorProps['theme']>('dark');
  const [placeholder, setPlaceholder] = useState('Please enter the code.');
  const [autofocus, setAutofocus] = useState(false);
  const [editable, setEditable] = useState(true);
  const [readOnly, setReadOnly] = useState(false);
  const [code, setCode] = useState('');
  const [extensions, setExtensions] = useState<Extension[]>();
  const [height, setHeight] = useState('500px');
  const [execCode, setExecCode] = useState('');
  const [dependent, setDependent] = useState<string[]>([]);
  console.log('🚀 ~ file: index.tsx:34 ~ dependent:', dependent);

  const [basicSetup, setBasicSetup] = useState<BasicSetupOptions>({});

  const handleLangChange = (lang: iLang) => {
    try {
      setExecCode('');
      import(`code-example/lib/${lang.toLocaleLowerCase()}.js`)
        .then((data) => {
          setCode(data.default);
          if (langs[lang]) {
            setExtensions([color, langs[lang]()]);
          }
          setMode(lang);
        })
        .catch(() => {
          if (langs[lang]) {
            setExtensions([color, langs[lang]()]);
          } else {
            setExtensions([color]);
          }
          setMode(lang);
          setCode('');
        });
      if (lang == 'html') {
      }
    } catch (error) {}
  };

  const handleRunCode = () => {
    setExecCode(code);
    console.log(pyodideRef.current);
    pyodideRef.current!.runPython(code);
  };

  useEffect(() => {
    handleLangChange('javascript');
  }, []);
  return (
    <Wrapper>
      <Header mode={mode} setMode={setMode} handleLangChange={handleLangChange} handleRunCode={handleRunCode} />
      <SplitScreen>
        <CodeMirror
          value={code}
          height={height}
          theme={theme}
          extensions={extensions}
          autoFocus={autofocus}
          editable={editable}
          basicSetup={basicSetup}
          placeholder={placeholder}
          onChange={(value) => setCode(value)}
          tabSize={2}
          // options={{}}
          style={{
            maxWidth: '995px',
            // margin: '0 auto 0 auto',
            position: 'relative',
            zIndex: 999,
            width: 'calc(50% - 4px)',
            flex: '0 0 auto',
            fontSize: '14px'
          }}
        />
        <div style={{ width: '8px' }}></div>
        <Pyodide ref={pyodideRef} pythonCode={execCode} dependent={dependent} />
      </SplitScreen>
      <Footer setDependent={setDependent} />
      <MarkdownDocument>
        <Tools>
          <Select
            label="Theme"
            options={themeOptions}
            value={theme as string}
            onChange={(evn) => {
              document.documentElement.setAttribute('data-color-mode', evn.target.value);
              console.log('🚀 ~ file: index.tsx:94 ~ evn.target.value:', evn.target.value);
              setTheme(evn.target.value as ReactCodeMirrorProps['theme']);
            }}
          />
          <Select label="Height" options={heightOptions} value={height} onChange={(evn) => setHeight(evn.target.value)} />
          <button
            onClick={() => {
              count++;
              setCode(`console.log("Hello World! ${count}")`);
            }}>
            change code
          </button>
          <label>
            <input type="checkbox" checked={autofocus} onChange={(evn) => setAutofocus(evn.target.checked)} />
            autoFocus
          </label>
          <label>
            <input type="checkbox" checked={editable} onChange={(evn) => setEditable(evn.target.checked)} />
            editable
          </label>
          <label>
            <input type="checkbox" checked={readOnly} onChange={(evn) => setReadOnly(evn.target.checked)} />
            readOnly
          </label>
          <label>
            placeholder:
            <input type="text" value={placeholder} onChange={(evn) => setPlaceholder(evn.target.value)} />
          </label>
          <Options
            checked={basicSetup.lineNumbers !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, lineNumbers: evn.target.checked })}>
            lineNumbers
          </Options>
          <Options
            checked={basicSetup.foldGutter !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, foldGutter: evn.target.checked })}>
            foldGutter
          </Options>
          <Options
            checked={basicSetup.highlightActiveLineGutter !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, highlightActiveLineGutter: evn.target.checked })}>
            highlightActiveLineGutter
          </Options>
          <Options
            checked={basicSetup.highlightSpecialChars !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, highlightSpecialChars: evn.target.checked })}>
            highlightSpecialChars
          </Options>
          <Options checked={basicSetup.history !== false} onChange={(evn) => setBasicSetup({ ...basicSetup, history: evn.target.checked })}>
            history
          </Options>
          <Options
            checked={basicSetup.drawSelection !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, drawSelection: evn.target.checked })}>
            drawSelection
          </Options>
          <Options
            checked={basicSetup.dropCursor !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, dropCursor: evn.target.checked })}>
            dropCursor
          </Options>
          <Options
            checked={basicSetup.allowMultipleSelections !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, allowMultipleSelections: evn.target.checked })}>
            allowMultipleSelections
          </Options>
          <Options
            checked={basicSetup.indentOnInput !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, indentOnInput: evn.target.checked })}>
            indentOnInput
          </Options>
          <Options
            checked={basicSetup.syntaxHighlighting !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, syntaxHighlighting: evn.target.checked })}>
            syntaxHighlighting
          </Options>
          <Options
            checked={basicSetup.bracketMatching !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, bracketMatching: evn.target.checked })}>
            bracketMatching
          </Options>
          <Options
            checked={basicSetup.closeBrackets !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, closeBrackets: evn.target.checked })}>
            closeBrackets
          </Options>
          <Options
            checked={basicSetup.autocompletion !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, autocompletion: evn.target.checked })}>
            autocompletion
          </Options>
          <Options
            checked={basicSetup.rectangularSelection !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, rectangularSelection: evn.target.checked })}>
            rectangularSelection
          </Options>
          <Options
            checked={basicSetup.crosshairCursor !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, crosshairCursor: evn.target.checked })}>
            crosshairCursor
          </Options>
          <Options
            checked={basicSetup.highlightActiveLine !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, highlightActiveLine: evn.target.checked })}>
            highlightActiveLine
          </Options>
          <Options
            checked={basicSetup.highlightSelectionMatches !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, highlightSelectionMatches: evn.target.checked })}>
            highlightSelectionMatches
          </Options>
          <Options
            checked={basicSetup.closeBracketsKeymap !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, closeBracketsKeymap: evn.target.checked })}>
            closeBracketsKeymap
          </Options>
          <Options
            checked={basicSetup.defaultKeymap !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, defaultKeymap: evn.target.checked })}>
            defaultKeymap
          </Options>
          <Options
            checked={basicSetup.searchKeymap !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, searchKeymap: evn.target.checked })}>
            searchKeymap
          </Options>
          <Options
            checked={basicSetup.historyKeymap !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, historyKeymap: evn.target.checked })}>
            historyKeymap
          </Options>
          <Options
            checked={basicSetup.foldKeymap !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, foldKeymap: evn.target.checked })}>
            foldKeymap
          </Options>
          <Options
            checked={basicSetup.completionKeymap !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, completionKeymap: evn.target.checked })}>
            completionKeymap
          </Options>
          <Options
            checked={basicSetup.lintKeymap !== false}
            onChange={(evn) => setBasicSetup({ ...basicSetup, lintKeymap: evn.target.checked })}>
            lintKeymap
          </Options>
        </Tools>
      </MarkdownDocument>
    </Wrapper>
  );
};
export default EditorDemo;
