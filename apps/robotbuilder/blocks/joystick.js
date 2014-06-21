// User Input Blocks
Blockly.Blocks['declare_joystick'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Create a joystick to take input from the operator.');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare Joystick")
        .appendField(new Blockly.TypedFieldVariable("JS1", "Joystick", true), "NAME");
    this.appendDummyInput()
        .appendField("on usb port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.JS_PORT), "PORT");
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

Blockly.Java['declare_joystick'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_port = block.getFieldValue("PORT");

  if (value_port=="") {
    block.setWarningText("Joystick port not set. Defaulted to port 1.");
    value_port = 1;
  }
  else {
    block.setWarningText(null);
  }

  Blockly.Java.addImport("import edu.wpi.first.wpilibj.Joystick;");
  var code = 'Joystick '+variable_name+' = new Joystick('+value_port+');\n';
  return code;
};

Blockly.Blocks['get_joystick_axis'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Reads the current value of the selected joystick axis.');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Get Joystick")
        .appendField(new Blockly.TypedFieldVariable("JS1", "Joystick"), "NAME")
        .appendField(new Blockly.FieldDropdown([["X Axis", "kX"], ["Y Axis", "kY"], ["Z Axis", "kZ"], ["Twist", "kTwist"], ["Throttle", "kThrottle"]]), "WHAT");
    this.setOutput(true, "Number");
	this.setDependsOn("declare_joystick");
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
Blockly.Java['get_joystick_axis'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var dropdown_what = block.getFieldValue('WHAT');

  var code = variable_name+'.getAxis(Joystick.AxisType.'+dropdown_what+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Java.ORDER_ATOMIC];
};

Blockly.Blocks['get_joystick_button'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Checks if the button is bieng pressed by the operator.');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Joystick")
        .appendField(new Blockly.TypedFieldVariable("JS1", "Joystick"), "NAME");
    this.appendDummyInput()
        .appendField("Button")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.JS_BUTTON), "BUTTON_NUMBER")
        .appendField("is pressed");
    // this.appendDummyInput("BUTTON_NUMBER")
    //     .setCheck("Number") // @todo Get the button value for buttons 1 through 12. JS_BUTTON
    //     .appendField("Button is pressed");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
	this.setDependsOn("declare_joystick");
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
Blockly.Java['get_joystick_button'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_button_number = block.getFieldValue("BUTTON_NUMBER");
  // TODO: Assemble Java into code variable.
  var code = variable_name+'.getRawButton('+value_button_number+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Java.ORDER_ATOMIC];
};