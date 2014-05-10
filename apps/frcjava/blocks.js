/**
 * Blockly Apps: Block Factory Blocks
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocks for Blockly's Block Factory application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';


// =============================================================================
// Root Block

Blockly.Blocks['simple_robot'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Sinple Robot Named:")
        .appendField(new Blockly.FieldVariable("MyRobot"), "NAME");
    this.appendStatementInput("setup")
        .appendField("Setup");
    this.appendStatementInput("auto")
        .appendField("Autonomous Loop");
    this.appendStatementInput("teleop")
        .appendField("Teleoperated Loop");
  }
};
Blockly.Java['simple_robot'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var statements_setup = Blockly.Java.statementToCode(block, 'setup');
  var statements_auto = Blockly.Java.statementToCode(block, 'auto');
  var statements_teleop = Blockly.Java.statementToCode(block, 'teleop');
  
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.SimpleRobot;");
  var code = [];
  code.push("public class "+variable_name+" extends SimpleRobot {");
  
  code.push(statements_setup);
  code.push("\tpublic void autonomous() {");
  code.push("\t\twhile(isEnabled() && isAutonomous()) {");
  code.push("\t\t\t"+statements_auto);
  code.push("\t\t}");
  code.push("\t}");
  
  code.push("\tpublic void operatorControl() {")
  code.push("\t\twhile(isEnabled() && isOperatorControl()) {");
  code.push("\t\t\t"+statements_teleop);
  code.push("\t\t}");
  code.push("\t}");

  code.push("}");

  code = code.join('\n').replace(/\t/gm, Blockly.Java.INDENT);

  return code;
};

// =============================================================================
// Timing Blocks

Blockly.Blocks['delay'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(330);
    this.appendValueInput("AMOUNT")
        .setCheck("Number")
        .appendField("Delay for");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['delay'] = function(block) {
  var value_amount = Blockly.Java.valueToCode(block, 'AMOUNT', Blockly.Java.ORDER_ATOMIC);
  
  
  if (value_amount=="") {
    block.setWarningText("Delay amount not set. Defaulted to 0 secs.");
    value_amount = 1;
  }
  else {
    block.setWarningText(null);
  }
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.Timer;");
  var code = 'Timer.delay('+value_amount+');\n';
  return code;
};

Blockly.Blocks['timer'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Declare Timer")
        .appendField(new Blockly.FieldVariable("Timer1"), "NAME");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['timer'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.Timer;");
  var code = 'Timer '+variable_name+' = new Timer();';
  return code;
};

Blockly.Blocks['start_timer'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Start timer")
        .appendField(new Blockly.FieldVariable("Timer1"), "NAME");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['start_timer'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  // @todo check to see if the variable_name exists
  var code = variable_name+'.start()';
  return code;
};

Blockly.Blocks['stop_timer'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Stop timer")
        .appendField(new Blockly.FieldVariable("Timer1"), "NAME");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['stop_timer'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  // @todo check to see if the variable_name exists
  var code = variable_name+'.stop()';
  return code;
};

Blockly.Blocks['reset_timer'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Reset timer")
        .appendField(new Blockly.FieldVariable("Timer1"), "NAME");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['reset_timer'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  // @todo check to see if the variable_name exists
  var code = variable_name+'.reset()';
  return code;
};

Blockly.Blocks['us_counter'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("Microsecond Counter");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
  }
};

Blockly.Java['us_counter'] = function(block) {
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.Timer;");
  var code = 'Timer.getUsClock()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Java.ORDER_ATOMIC];
};

// =============================================================================
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
    this.setPreviousStatement(true);
    this.setNextStatement(true);
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
  variable_name+'.getRawButton('+value_button_number+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Java.ORDER_ATOMIC];
};

// =============================================================================
// Motors
Blockly.Blocks['motor_controller'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Declare Motor Controller")
        .appendField(new Blockly.FieldVariable("MC1"), "NAME")
        .appendField("of type")
        .appendField(new Blockly.FieldDropdown([["Victor", "Victor"], ["Jaguar", "Jaguar"], ["Talon", "Talon"]]), "CONTROLLER_TYPE");
    this.appendValueInput("PORT")
        .setCheck("Number")
        .appendField("on PWM port");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
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
        .appendField("Declare 2 CIM Drivebase ")
        .appendField(new Blockly.FieldVariable("Drivetrain"), "NAME")
        .appendField("of type")
        .appendField(new Blockly.FieldDropdown([["Victor", "Victor"], ["Jaguar", "Jaguar"], ["Talon", "Talon"]]), "TYPE")
        .appendField("on PWM ports 1-4");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
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
    this.setPreviousStatement(true);
    this.setNextStatement(true);
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
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['move_with_joystick'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var variable_joystick = Blockly.Java.variableDB_.getName(block.getFieldValue('JOYSTICK'), Blockly.Variables.NAME_TYPE);
  // @todo check to see if the variable_joystick exists
  var code = variable_name+'.arcadeDrive('+variable_joystick+', false);\n';
  return code;
};

// =============================================================================
// Digital

Blockly.Blocks['digital_input'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare Digital Input")
        .appendField(new Blockly.FieldVariable("Din1"), "NAME");
    this.appendValueInput("PORT")
        .setCheck("Number")
        .appendField("on Port");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['digital_input'] = function(block) {
  var value_port = Blockly.Java.valueToCode(block, 'PORT', Blockly.Java.ORDER_ATOMIC);
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.DigitalInput;");
  var code = 'DigitalInput '+variable_name+' = new DigitalInput('+value_port+');';
  return code;
};

Blockly.Blocks['get_digital_input_value'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Get value")
        .appendField(new Blockly.FieldVariable("Din1"), "NAME");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
  }
};
Blockly.Java['get_digital_input_value'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  
  //@todo make sure wariable_name has been declared
  var code = variable_name+'.get()';
  return code;
};

// =============================================================================
// Analog

Blockly.Blocks['analog_input'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("Declare Analog Input")
        .appendField(new Blockly.FieldVariable("Ain1"), "NAME");
    this.appendValueInput("PORT")
        .setCheck("Number")
        .appendField("on Port");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['analog_input'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_port = Blockly.Java.valueToCode(block, 'PORT', Blockly.Java.ORDER_ATOMIC);
  
  if (value_port=="") {
    block.setWarningText("Analog Input port not set. Defaulted to port 1.");
    value_port = 1;
  }
  else {
    block.setWarningText(null);
  }
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.AnalogChannel;");
  var code = 'AnalogChannel '+variable_name+' = new AnalogChannel('+value_port+');';
  return code;
};

Blockly.Blocks['get_analog_input_value'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("Get ")
        .appendField(new Blockly.FieldDropdown([["Average Voltage", "getAverageVoltage"], ["Voltage", "getVoltage"], [" Average Value", "getAverageValue"]]), "WHAT")
        .appendField(new Blockly.FieldVariable("Ain1"), "NAME");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
  }
};
Blockly.Java['get_analog_input_value'] = function(block) {
  var dropdown_what = block.getFieldValue('WHAT');
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  
  //@todo make sure wariable_name has been declared
  var code = variable_name+'.'+dropdown_what+'()';
  return code;
};

// =============================================================================
// Pneumatics


// =============================================================================
// Sensors
// Gyro
// Accelerometer
// Encoder


//   referenceBlock.setWarningText(msg);

