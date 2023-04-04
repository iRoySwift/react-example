import { javascriptGenerator } from 'blockly/javascript';

javascriptGenerator['string_length'] = function (block) {
  // String or array length.
  var argument0 = javascriptGenerator.valueToCode(block, 'VALUE',
    javascriptGenerator.ORDER_FUNCTION_CALL) || '\'\'';
  console.log(block, argument0);

  return [argument0 + '.length', javascriptGenerator.ORDER_MEMBER];
};
