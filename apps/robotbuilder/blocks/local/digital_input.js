// Digital

Blockly.Blocks['declare_digital_input'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Create a digital input which allows reading of a digital signal.');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare Digital Input")
        .appendField(new Blockly.TypedFieldVariable("Din1", "DigitalInput", true), "NAME");
    this.appendDummyInput()
        .appendField("on port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.DIGITAL_PORT), "PORT");
    // this.appendValueInput("PORT")
    //     .setCheck("Number")
    //     .appendField("on Port");
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
Blockly.Java['declare_digital_input'] = function(block) {
  var value_port = block.getFieldValue('PORT');
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  Blockly.Java.addImport("import edu.wpi.first.wpilibj.DigitalInput;");
  var code = 'DigitalInput '+variable_name+' = new DigitalInput('+value_port+');';
  return code;
};

Blockly.Blocks['get_digital_input_value'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Get the current value of the digital input.');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Get value")
        .appendField(new Blockly.TypedFieldVariable("Din1", "DigitalInput"), "NAME");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
	this.setDependsOn("declare_digital_input");
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
Blockly.Java['get_digital_input_value'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  //@todo make sure variable_name has been declared
  var code = variable_name+'.get()';
  return [code, Blockly.Java.ORDER_ATOMIC];
};



