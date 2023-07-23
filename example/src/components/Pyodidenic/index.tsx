import { Box } from '@mui/material';
// import { loadPyodide } from 'pyodide/pyodide.js';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useScript } from 'usehooks-ts';
import SearchContent from './SearchContent';
// const { loadPyodide } = require('pyodide');

interface Props {
  ref: any;
  pythonCode?: string;
  loadingMessage?: string;
  evaluatingMessage?: string;
  dependent?: string[];
}
const Pyodide: React.FC<Props> = React.forwardRef<any, Props>((props, ref) => {
  const { dependent, loadingMessage = 'loading…', evaluatingMessage = '正在初始化环境，请稍等... \n' } = props;
  const pyodideStatus = useScript(`https://gcore.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js`, {
    removeOnUnmount: false
  });
  // const bokehStatus = useScript(`https://cdn.bokeh.org/bokeh/release/bokeh-2.4.3.js`, {
  //   removeOnUnmount: false,
  //   shouldPreventLoad: pyodideStatus !== 'ready'
  // });
  // const bokehWidgetsStatus = useScript(`https://cdn.bokeh.org/bokeh/release/bokeh-widgets-2.4.3.min.js`, {
  //   removeOnUnmount: false,
  //   shouldPreventLoad: bokehStatus !== 'ready'
  // });
  // const bokehTablesStatus = useScript(`https://cdn.bokeh.org/bokeh/release/bokeh-tables-2.4.3.min.js`, {
  //   removeOnUnmount: false,
  //   shouldPreventLoad: bokehWidgetsStatus !== 'ready'
  // });
  // const panelStatus = useScript(`https://cdn.jsdelivr.net/npm/@holoviz/panel@0.14.0/dist/panel.min.js`, {
  //   removeOnUnmount: false,
  //   shouldPreventLoad: bokehTablesStatus !== 'ready'
  // });

  console.log(pyodideStatus);

  const indexURL = 'https://gcore.jsdelivr.net/pyodide/v0.21.2/full/';
  const pyodide: any = useRef(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [pyodideOutput, setPyodideOutput] = useState(evaluatingMessage); // load pyodide wasm module and initialize it

  const addToOutput = useCallback((pyodideOutput, result) => `${pyodideOutput}${result || ''}\n>>>\n`, []);

  const runPython = useCallback(
    async (pythonCode) => {
      if (pyodide.current) {
        try {
          await pyodide.current.runPython(`
            import io
            import sys
            sys.stdout = io.StringIO()
          `);
          let result = await pyodide.current.runPython(pythonCode);
          let stdout = await pyodide.current.runPython('sys.stdout.getvalue()');
          let output = `${stdout}${result}`;
          setPyodideOutput((pyodideOutput) => addToOutput(pyodideOutput, output));
        } catch (error) {
          setPyodideOutput((pyodideOutput) => addToOutput(pyodideOutput, error));
        }
      }
    },
    [pyodide.current]
  );

  useImperativeHandle(
    ref,
    () => ({
      runPython
    }),
    [runPython]
  );

  // useEffect(() => {
  //   runPython(pythonCode);
  // }, [pythonCode]);

  useEffect(() => {
    if (pyodideStatus === 'ready') {
      (async function () {
        pyodide.current = await globalThis.loadPyodide({
          indexURL
        });
        await pyodide.current.loadPackage('micropip');
        setIsPyodideLoading(false);
        setPyodideOutput((pre) => pre + 'Python初始化完成' + '\n');
      })();
    }
    return () => {
      pyodide.current = null;
    };
  }, [pyodideStatus]);

  useEffect(() => {
    if (pyodide.current) {
      const loadPackage = async () => {
        try {
          setPyodideOutput((pre) => `${pre}Loading ${dependent!.join(',')}\n`);
          const micropip = pyodide.current.pyimport('micropip');
          await micropip.install(dependent);
          setPyodideOutput((pre) => `${pre}Loaded ${dependent!.join(',')}\n`);
        } catch (error) {
          console.error(error);
          return 'load package error';
        }
      };
      loadPackage();
    }
  }, [pyodide.current, dependent]);

  return (
    <Box sx={{ width: 'calc(50% - 4px)', flex: '0 0 auto', background: '#282c34', position: 'relative', padding: 1 }}>
      <SearchContent setPyodideOutput={setPyodideOutput} />
      <textarea
        ref={ref}
        style={{ width: '100%', height: '100%', background: '#282c34', color: '#fff', border: 'none' }}
        value={isPyodideLoading ? loadingMessage : pyodideOutput}
        disabled></textarea>
    </Box>
  );
});
export default Pyodide;
// function loadPyodide(): any {
//   throw new Error('Function not implemented.');
// }
