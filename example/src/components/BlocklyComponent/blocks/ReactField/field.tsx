import Blockly from "blockly"
import React from 'react';
import ReactDOM from 'react-dom';

class BlocklyReactField extends Blockly.Field {
  SERIALIZABLE = true
  div_;
  sourceBlock_;
  root;

  static fromJson(options) {
    return new BlocklyReactField(options['text']);
  }

  showEditor_() {
    this.div_ = Blockly.DropDownDiv.getContentDiv();
    console.log(this.div_, 'show');

    // this.root = ReactDOM.createRoot(this.div_)
    // this.root.render(this.render());

    ReactDOM.render(this.render(), this.div_)

    var border = this.sourceBlock_.style.colourTertiary;
    border = border.colourBorder || border.colourLight;
    Blockly.DropDownDiv.setColour(this.sourceBlock_.getColour(), border);

    Blockly.DropDownDiv.showPositionedByField(
      this, this.dropdownDispose_.bind(this));
  }

  dropdownDispose_() {
    // this.root.unmount(this.div_);
    ReactDOM.unmountComponentAtNode(this.div_)
  }

  render() {
    return <FieldRenderComponent />
  }
}

class FieldRenderComponent extends React.Component {

  render() {
    return <div style={{ color: '#fff' }}>
      Hello from React!
    </div>;
  }
}

Blockly.fieldRegistry.register('field_react_component', BlocklyReactField);

export default BlocklyReactField
