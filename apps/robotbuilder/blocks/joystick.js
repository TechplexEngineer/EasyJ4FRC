// User Input Blocks
Blockly.Blocks['joystick'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Declare Joystick")
        .appendField(new Blockly.FieldVariable("JS1"), "NAME")
        .appendField("on usb port");
    this.appendValueInput("PORT")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'declare');
    this.setNextStatement(true, 'declare');
  }
};

Blockly.Java['joystick'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_port = Blockly.Java.valueToCode(block, 'PORT', Blockly.Java.ORDER_ATOMIC);

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
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Get Joystick")
        .appendField(new Blockly.FieldVariable("JS1"), "NAME")
        .appendField(new Blockly.FieldDropdown([["X Axis", "kX"], ["Y Axis", "kY"], ["Z Axis", "kZ"], ["Twist", "kTwist"], ["Throttle", "kThrottle"]]), "WHAT");
    this.setOutput(true, "Number");
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
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Get Joystick")
        .appendField(new Blockly.FieldVariable("JS1"), "NAME");
    this.appendValueInput("BUTTON_NUMBER")
        .setCheck("Number") // @todo Get the button value for buttons 1 through 12.
        .appendField("Button");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
  }
};
Blockly.Java['get_joystick_button'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_button_number = Blockly.Java.valueToCode(block, 'BUTTON_NUMBER', Blockly.Java.ORDER_ATOMIC);
  // TODO: Assemble Java into code variable.
  var code = variable_name+'.getRawButton('+value_button_number+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Java.ORDER_ATOMIC];
};