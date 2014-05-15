// Motors
Blockly.Blocks['motor_controller'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Declare Motor Controller")
        .appendField(new Blockly.TypedFieldVariable("MC1","MotorController"), "NAME")
        .appendField("of type")
        .appendField(new Blockly.FieldDropdown([["Victor", "Victor"], ["Jaguar", "Jaguar"], ["Talon", "Talon"]]), "CONTROLLER_TYPE");
    this.appendValueInput("PORT")
        .setCheck("Number")
        .appendField("on PWM port");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'declare');
    this.setNextStatement(true, 'declare');
  }
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAME')];
  },
};
Blockly.Java['motor_controller'] = function(block) {

  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var dropdown_type = block.getFieldValue('CONTROLLER_TYPE');
  var value_port = Blockly.Java.valueToCode(block, 'PORT', Blockly.Java.ORDER_ATOMIC);

  if (value_port=="") {
    block.setWarningText("Motor Controller port not set. Defaulted to port 1.");
    value_port = 1;
  }
  else
  {
    block.setWarningText(null);
  }
  
  Blockly.Java.addImport("import edu.wpi.first.wpilibj."+dropdown_type+";");
  var code = dropdown_type+' '+variable_name+' = new '+dropdown_type+'('+value_port+');\n';
  return code;
};

Blockly.Blocks['drivetrain'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Declare Drivebase ")
        .appendField(new Blockly.FieldVariable("Drivetrain"), "NAME")
        .appendField("of type")
        .appendField(new Blockly.FieldDropdown([["Victor", "Victor"], ["Jaguar", "Jaguar"], ["Talon", "Talon"]]), "TYPE")
        .appendField("on PWM ports 1-4");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'declare');
    this.setNextStatement(true, 'declare');
  }
};
Blockly.Java['drivetrain'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var dropdown_type = block.getFieldValue('TYPE');

  Blockly.Java.addReservedWords('frontLeftMotor,rearLeftMotor,frontRightMotor,rearRightMotor');
  var code = [];
  code.push(dropdown_type+' frontLeftMotor  = new '+dropdown_type+'(1);');
  code.push(dropdown_type+' rearLeftMotor   = new '+dropdown_type+'(2);');
  code.push(dropdown_type+' frontRightMotor = new '+dropdown_type+'(3);');
  code.push(dropdown_type+' rearRightMotor  = new '+dropdown_type+'(4);');

  Blockly.Java.addImport("import edu.wpi.first.wpilibj."+dropdown_type+";");
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.RobotDrive;");
  code.push('RobotDrive'+' '+variable_name+' = new RobotDrive(frontLeftMotor, rearLeftMotor, frontRightMotor, rearRightMotor);\n');

  return code.join('\n');
};

Blockly.Blocks['move'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(20);
    this.appendValueInput("MOVE") //@todo limit the range[-1,1]
        .setCheck("Number")
        .appendField("Move ")
        .appendField(new Blockly.FieldVariable("Drivetrain"), "NAME")
        .appendField("Speed");
    this.appendValueInput("TURN") //@todo limit the range[-1,1]
        .setCheck("Number")
        .appendField("Turn");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
  }
};
Blockly.Java['move'] = function(block) {
  var value_move = Blockly.Java.valueToCode(block, 'MOVE', Blockly.Java.ORDER_ATOMIC);
  var value_turn = Blockly.Java.valueToCode(block, 'TURN', Blockly.Java.ORDER_ATOMIC);
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  
  if (value_move=="") {
    block.setWarningText("Motor Controller speed not set. Defaulted to speed 0.");
    value_move = 0;
  }
  else {
    block.setWarningText(null);
  }
  if (value_turn=="") {
    block.setWarningText("Motor Controller turn not set. Defaulted to turn 0.");
    value_turn = 0;
  }
  else {
    block.setWarningText(null);
  }

  var code = variable_name+'.arcadeDrive('+value_move+','+value_turn+');\n';
  return code;
};

Blockly.Blocks['stop'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Stop ")
        .appendField(new Blockly.FieldVariable("Drivetrain"), "NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
  }
};
Blockly.Java['stop'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  var code = variable_name+'.arcadeDrive('+0+','+0+');\n';
  return code;
};

Blockly.Blocks['move_with_joystick'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Move ")
        .appendField(new Blockly.FieldVariable("Drivetrain"), "NAME");
    this.appendDummyInput()
        .appendField("with Joystick")
        .appendField(new Blockly.FieldVariable("JS1"), "JOYSTICK");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
  }
};
Blockly.Java['move_with_joystick'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var variable_joystick = Blockly.Java.variableDB_.getName(block.getFieldValue('JOYSTICK'), Blockly.Variables.NAME_TYPE);
  // @todo check to see if the variable_joystick exists
  var code = variable_name+'.arcadeDrive('+variable_joystick+', false);\n';
  return code;
};