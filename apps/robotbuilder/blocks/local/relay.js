Blockly.Blocks['declare_relay'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare Relay")
        .appendField(new Blockly.TypedFieldVariable("Relay1", "Relay", true), "NAME");
    this.appendDummyInput()
        .appendField("on port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.RELAY_PORT), "PORT");
    this.appendDummyInput()
        .appendField("with valid direction")
        .appendField(new Blockly.FieldDropdown([["Both", "kBoth"], ["Forward", "kForward"], ["Reverse", "kReverse"]]), "DIRS");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'declare');
    this.setNextStatement(true, 'declare');
  },
  onchange: EasyJ.Checker.EnsureNotTop_Init,
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  }
};
Blockly.Java['declare_relay'] = function(block) {
  var dropdown_dirs = block.getFieldValue('DIRS');
  var text_port = block.getFieldValue('PORT');
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  Blockly.Java.addImport("import edu.wpi.first.wpilibj.Relay;");

  var code = 'Relay '+variable_name+' = new Relay('+text_port+', Relay.Direction.'+dropdown_dirs+');';
  return code;
};

Blockly.Blocks['set_relay'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Set value")
        .appendField(new Blockly.TypedFieldVariable("Relay1", "Relay"), "NAME");
    this.appendDummyInput()
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([["Off", "kOff"], ["Forward", "kForward"], ["Reverse", "kReverse"]]), "DIRECTION");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("declare_relay");
  },
  onchange: function(evt) {
   if (!this.workspace || this.isInFlyout) {
      // Block has been deleted, or is in flyout
      return;
    }
    var block = this;
    this.setWarningText(EasyJ.Checker.PickWarning(block, [EasyJ.Checker.EnsureVariablesExist, EasyJ.Checker.EnsureNotOrphaned]));

  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  }
};
Blockly.Java['set_relay'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var dropdown_value = Blockly.Java.valueToCode(block, 'VALUE', Blockly.Java.ORDER_ATOMIC);
  //block.getFieldValue('VALUE');
  //@todo make sure variable_name has been declared
  var code = variable_name+'.set(Relay.Value.'+dropdown_value+')';
  return code;
};