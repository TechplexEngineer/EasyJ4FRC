// Motors
Blockly.Blocks['declare_motor_controller'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Create a motor controller to control the speed of a motor.');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare Motor Controller")
        .appendField(new Blockly.TypedFieldVariable("MC1","MotorController", true), "NAME")
        .appendField("of type")
        .appendField(new Blockly.FieldDropdown([["Victor", "Victor"], ["Jaguar", "Jaguar"], ["Talon", "Talon"]]), "CONTROLLER_TYPE");
    // this.appendValueInput("PORT")
    //     .setCheck("Number")
    //     .appendField("on PWM port");
    this.appendDummyInput()
        .appendField("on port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.PWM_PORT), "PORT");
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
Blockly.Java['declare_motor_controller'] = function(block) {

  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var dropdown_type = block.getFieldValue('CONTROLLER_TYPE');
  var value_port = block.getFieldValue("PORT");

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

Blockly.Blocks['move_motor_controller'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Set the motor controller speed.');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Set")
        .appendField(new Blockly.TypedFieldVariable("MC1","MotorController"), "NAME");
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField("at speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("declare_motor_controller");
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
Blockly.Java['move_motor_controller'] = function(block) {

  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  var value_speed = Blockly.Java.valueToCode(block, 'SPEED', Blockly.Java.ORDER_ATOMIC);

  if (value_speed=="") {
    block.setWarningText("Motor Controller speed not set. Defaulted to speed 0.");
    value_speed = 0;
  }
  else
  {
    block.setWarningText(null);
  }

  var code =variable_name+'.set('+value_speed+');\n';
  return code;
};

Blockly.Blocks['stop_motor_controller'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Set the motor controller speed to zero to stop the motor.');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Stop")
        .appendField(new Blockly.TypedFieldVariable("MC1","MotorController"), "NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("declare_motor_controller");
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
Blockly.Java['stop_motor_controller'] = function(block) {

  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  var code = variable_name+'.stop();\n';
  return code;
};
// -------------------------------------------------------------------------------------------------
Blockly.Blocks['declare_drivetrain'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Create a drivetrain and associated motor controllers to drive your robot.');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare Drivebase ")
        .appendField(new Blockly.TypedFieldVariable("Drivetrain","RobotDrive", true), "NAME")
        .appendField("of type")
        .appendField(new Blockly.FieldDropdown([["Victor", "Victor"], ["Jaguar", "Jaguar"], ["Talon", "Talon"]]), "TYPE")
        .appendField("on PWM ports 1-4");
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
Blockly.Java['declare_drivetrain'] = function(block) {
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

Blockly.Blocks['move_drivetrain'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Set the speed and turn of the drivetrain.');
    this.setColour(20);
    this.appendValueInput("MOVE") //@todo limit the range[-1,1]
        .setCheck("Number")
        .appendField("Move ")
        .appendField(new Blockly.TypedFieldVariable("Drivetrain", "RobotDrive"), "NAME")
        .appendField("Speed");
    this.appendValueInput("TURN") //@todo limit the range[-1,1]
        .setCheck("Number")
        .appendField("Turn");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("declare_drivetrain");
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
Blockly.Java['move_drivetrain'] = function(block) {
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

Blockly.Blocks['stop_drivetrain'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Set the speed of the drivetrain to zero.');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Stop ")
        .appendField(new Blockly.TypedFieldVariable("Drivetrain", "RobotDrive"), "NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("declare_drivetrain");
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
Blockly.Java['stop_drivetrain'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  var code = variable_name+'.arcadeDrive('+0+','+0+');\n';
  return code;
};

Blockly.Blocks['move_with_joystick'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Connects the drivetrain to the operators joystick.');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Move ")
        .appendField(new Blockly.TypedFieldVariable("Drivetrain", "RobotDrive"), "NAME");
    this.appendDummyInput()
        .appendField("with Joystick")
        .appendField(new Blockly.TypedFieldVariable("JS1", "Joystick"), "JOYSTICK");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
    this.setDependsOn(["declare_drivetrain", "declare_joystick"]);
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
Blockly.Java['move_with_joystick'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var variable_joystick = Blockly.Java.variableDB_.getName(block.getFieldValue('JOYSTICK'), Blockly.Variables.NAME_TYPE);
  // @todo check to see if the variable_joystick exists
  var code = variable_name+'.arcadeDrive('+variable_joystick+', false);\n';
  return code;
};