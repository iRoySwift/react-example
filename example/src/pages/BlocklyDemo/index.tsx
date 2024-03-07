import React from 'react';
import { Block, Category, Field, Shadow, Value } from '@/components/BlocklyComponent';
import BlocklyComponent from '@/components/BlocklyComponent/BlocklyComponent';

interface Props {}
const BlocklyDemo: React.FC<Props> = () => {
  return (
    <div>
      BlocklyDemo
      <BlocklyComponent
        readOnly={false}
        trashcan={true}
        media={'BlocklyMedia/'}
        zoom={{
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true
        }}
        grid={{
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true
        }}
        move={{
          scrollbars: true,
          drag: true,
          wheel: true
        }}
        initialXml={`
          <xml xmlns="http://www.w3.org/1999/xhtml">
          <block type="controls_ifelse" x="0" y="0"></block>
          </xml>
        `}>
        <Category name="Custom">
          <Block type="string_length" />
          <Block type="test_react_field" />
        </Category>
        <Category name="Block">
          <Block type="controls_ifelse" />
          <Block type="logic_compare" />
          <Block type="logic_operation" />
          <Block type="controls_repeat_ext">
            <Value name="TIMES">
              <Shadow type="math_number">
                <Field name="NUM">10</Field>
              </Shadow>
            </Value>
          </Block>
          <Block type="logic_operation" />
          <Block type="logic_negate" />
          <Block type="logic_boolean" />
          <Block
            type="logic_null"
            disabled="true"
          />
          <Block type="logic_ternary" />
          <Block type="text_charAt">
            <Value name="VALUE">
              <Block type="variables_get">
                <Field name="VAR">text</Field>
              </Block>
            </Value>
          </Block>
        </Category>
      </BlocklyComponent>
    </div>
  );
};
export default BlocklyDemo;
