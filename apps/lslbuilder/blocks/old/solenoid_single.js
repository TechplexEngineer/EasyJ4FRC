Blockly.Blocks['declare_solenoid_single'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare Single Solenoid")
        .appendField(new Blockly.TypedFieldVariable("SValve1", "Solenoid", true), "NAME")
        .appendField("on port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.SOLENOID_PORT), "SOLENOID");
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
Blockly.Java['declare_solenoid_single'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var text_solenoid = block.getFieldValue('SOLENOID');

  Blockly.Java.addImport("import edu.wpi.first.wpilibj.Solenoid;");
  var code = 'Solenoid '+variable_name+' = new Solenoid('+text_solenoid+');';
  return code;
};

//solenoid set
Blockly.Blocks['set_solenoid_single'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Set solenoid")
        .appendField(new Blockly.TypedFieldVariable("SValve1", "Solenoid"), "NAME");
    this.appendValueInput("VALUE")
        .setCheck("Boolean")
        .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("declare_solenoid_single");
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
Blockly.Java['set_solenoid_single'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var dropdown_value = Blockly.Java.valueToCode(block, 'VALUE', Blockly.Java.ORDER_ATOMIC);
  //@todo make sure variable_name has been declared
  var code = variable_name+'.set('+dropdown_value+');';
  return code;
};