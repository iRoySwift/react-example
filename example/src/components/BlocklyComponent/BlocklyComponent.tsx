import React, { useEffect, useRef } from 'react'
import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
import locale from 'blockly/msg/zh-hans';
import 'blockly/blocks';
import './index.css';

Blockly.setLocale(locale)

type iMoveOptions = {
  scrollbars?: {
    horizontal?: boolean
    vertical?: boolean
  } | boolean
  drag?: boolean
  wheel?: boolean
}

type iGrid = {
  spacing?: number
  length?: number
  colour?: string
  snap?: boolean
}

type iZoom = {
  controls: boolean
  wheel: boolean
  startScale: number
  maxScale: number
  minScale: number
  scaleSpeed: number
  pinch: boolean
}

interface Props {
  children?: React.ReactNode
  readOnly?: boolean
  trashcan?: boolean
  media?: string
  move?: iMoveOptions
  grid?: iGrid
  zoom?: iZoom
  initialXml?: any
}
// var toolbox = {
//   "kind": "flyoutToolbox",
//   "contents": [
//     {
//       "kind": "block",
//       "type": "controls_if"
//     },
//     {
//       "kind": "block",
//       "type": "controls_repeat_ext"
//     },
//     {
//       "kind": "block",
//       "type": "logic_compare"
//     },
//     {
//       "kind": "block",
//       "type": "math_number"
//     },
//     {
//       "kind": "block",
//       "type": "math_arithmetic"
//     },
//     {
//       "kind": "block",
//       "type": "text"
//     },
//     {
//       "kind": "block",
//       "type": "text_print"
//     },
//   ]
// }
const BlocklyComponent: React.FC<Props> = (props) => {
  const blocklyDiv = useRef<any>();
  const toolbox = useRef<any>();
  let primaryWorkspace = useRef<Blockly.WorkspaceSvg>();

  const generateJsCode = () => {
    var code = javascriptGenerator.workspaceToCode(
      primaryWorkspace.current
    );
    console.log(code);
  }

  const generatePythonCode = () => {
    var code = pythonGenerator.workspaceToCode(
      primaryWorkspace.current
    );
    console.log(code);
  }

  useEffect(() => {
    if (!blocklyDiv.current) return;
    const { initialXml, ...rest } = props;
    primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      ...rest
    });
    // 加载 toolbox
    if (initialXml) {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), primaryWorkspace.current);
    }
  }, [blocklyDiv, primaryWorkspace])

  return (
    <React.Fragment>
      <button onClick={generateJsCode}>Convert Js</button>
      <button onClick={generatePythonCode}>Convert python</button>
      <div id="blocklyDiv" ref={blocklyDiv}></div>
      <div style={{ display: 'none' }} ref={toolbox}>
        {props.children}
      </div>
    </React.Fragment>
  );
}
export default BlocklyComponent;
