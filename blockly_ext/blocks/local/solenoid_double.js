Blockly.Blocks['declare_solenoid_double'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('How a double solenoid works');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare Double Solenoid")
        .appendField(new Blockly.TypedFieldVariable("DValve1", "DoubleSolenoid", true), "NAME")
        .appendField("forward port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ_Checker.SOLENOID_PORT), "SOLENOIDFWD")
        .appendField("reverse port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ_Checker.SOLENOID_PORT), "SOLENOIDREV");
    this.setPreviousStatement(true, 'declare');
    this.setNextStatement(true, 'declare');
  },
  onchange: EasyJ_Checker.EnsureNotTop_Init,
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  }
};
Blockly.Java['declare_solenoid_double'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var text_solenoidfwd = block.getFieldValue('SOLENOIDFWD');
   var text_solenoidrev = block.getFieldValue('SOLENOIDREV');

  Blockly.Java.addImport("import edu.wpi.first.wpilibj.DoubleSolenoid;");
  var code = 'DoubleSolenoid '+variable_name+' = new DoubleSolenoid('+text_solenoidfwd+','+text_solenoidrev+');';
  return code;
};

Blockly.Blocks['double_solenoid_set'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Set double solenoid")
        .appendField(new Blockly.TypedFieldVariable("DValve1", "DoubleSolenoid"), "NAME")
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([
            ["Forward", "kForward"], 
            ["Reverse", "kReverse"], 
            ["Off", "kOff"]]), "TO");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setDependsOn("declare_solenoid_double");
  },
  onchange: function(evt) {
   if (!this.workspace || this.isInFlyout) {
      // Block has been deleted, or is in flyout
      return;
    }
    var block = this;
    this.setWarningText(EasyJ_Checker.PickWarning(block, [EasyJ_Checker.EnsureVariablesExist, EasyJ_Checker.EnsureNotOrphaned]));

  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  }
};
Blockly.Java['double_solenoid_set'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var dropdown_value = block.getFieldValue('TO');
  // TODO: Assemble Java into code variable.
  var code = variable_name+'.set(DoubleSolenoid.Value.'+dropdown_value+');';
  return code;
};