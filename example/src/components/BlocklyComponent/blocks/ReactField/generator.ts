import { javascriptGenerator } from 'blockly/javascript';

javascriptGenerator['test_react_field'] = function () {
  return 'console.log(\'custom block\');\n';
};
