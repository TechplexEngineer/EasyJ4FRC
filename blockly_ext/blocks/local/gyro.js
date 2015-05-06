Blockly.Blocks['declare_gyro'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Create a gyro for measureing angle and heading.');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare Gyro")
        .appendField(new Blockly.TypedFieldVariable("gyro1", "Gyro", true), "NAME");
    this.appendDummyInput()
        .appendField("on port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ_Checker.DIGITAL_PORT), "PORT");
    // this.appendValueInput("PORT")
    //     .setCheck("Number")
    //     .appendField("on Port");
    this.setInputsInline(true);
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
Blockly.Java['declare_gyro'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_port = block.getFieldValue('PORT');

  if (value_port=="") {
    block.setWarningText("Gyro port not set. Defaulted to port 1.");
    value_port = 1;
  }
  else {
    block.setWarningText(null);
  }
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.Gyro;");
  var code = 'Gyro '+variable_name+' = new Gyro('+value_port+');';
  return code;
};

Blockly.Blocks['get_gyro'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Get current data from the gyro. Either the angle or the rate of change of the angle.');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("Get ")
        .appendField(new Blockly.FieldDropdown(
          [
            ["Angle", "getAngle"], 
            ["Rate of Change", "getRate"]
          ]), "WHAT")
        .appendField(new Blockly.TypedFieldVariable("gyro1", "Gyro"), "NAME");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
	this.setDependsOn("declare_gyro");
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
Blockly.Java['get_gyro'] = function(block) {
  var dropdown_what = block.getFieldValue('WHAT');
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  //@todo make sure wariable_name has been declared
  var code = variable_name+'.'+dropdown_what+'()';
  return [code, Blockly.Java.ORDER_ATOMIC];
};

Blockly.Blocks['gyro_reset'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("Reset Gyro")
        .appendField(new Blockly.TypedFieldVariable("gyro1", "Gyro"), "NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("declare_gyro");
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
Blockly.Java['gyro_reset'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  var code = variable_name+'.start();';
  return code;
};