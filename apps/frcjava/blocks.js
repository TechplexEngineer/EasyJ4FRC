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
// Logic & Control Blocks

Blockly.Blocks['simple_robot'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Simple Robot Named:")
        .appendField(new Blockly.FieldTextInput("MyRobot"), "NAME");
    this.appendStatementInput("setup")
        .appendField("Setup");
    this.appendStatementInput("auto")
        .appendField("Autonomous");
    this.appendStatementInput("teleop")
        .appendField("Teleoperated");
  }
};

Blockly.Java['simple_robot'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var statements_setup = Blockly.Java.statementToCode(block, 'setup');
  var statements_teleop = Blockly.Java.statementToCode(block, 'teleop');
  var statements_auto = Blockly.Java.statementToCode(block, 'auto');
  // TODO: Assemble JavaScript into code variable.
  var code = [];
  code.push("public class "+text_name+" extends SimpleRobot {");
  code.push(statements_setup);
  code.push("\tpublic void autonomous() {");
  code.push("\t\twhile(isEnabled() && isAutonomous() {");
  code.push("\t\t\t"+statements_auto);
  code.push("\t\t}");
  code.push("\t}");
  
  code.push("\tpublic void operatorControl() {")
  code.push("\t\twhile(isEnabled() && isOperatorControl() {");
  code.push("\t\t\t"+statements_teleop);
  code.push("\t\t}");
  code.push("\t}");

  code.push("}");

  code = code.join('\n').replace(/\t/gm, Blockly.Java.INDENT);

  return code;
};

Blockly.Blocks['delay'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(20);
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

  var code = 'Timer.delay('+value_amount+');\n';
  return code;
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
        .appendField(new Blockly.FieldTextInput("JS1"), "NAME")
        .appendField("on usb port");
    this.appendValueInput("PORT")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'Input');
    this.setNextStatement(true);
  }
};

Blockly.Java['joystick'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_port = Blockly.Java.valueToCode(block, 'PORT', Blockly.Java.ORDER_ATOMIC);

  Blockly.Java.addImport("import edu.wpi.first.wpilibj.Joystick;");
  var code = 'Joystick '+text_name+' = new Joystick('+value_port+');\n';
  return code;
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
        .appendField(new Blockly.FieldTextInput("MC1"), "NAME")
        .appendField("of type")
        .appendField(new Blockly.FieldDropdown([["Jaguar", "Jaguar"], ["Victor", "Victor"], ["Talon", "Talon"]]), "CONTROLLER_TYPE");
    this.appendValueInput("PORT") //@todo how do we ensure only one device per port?
        .setCheck("Number")
        .appendField("on PWM port");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['motor_controller'] = function(block) {

  var text_name = block.getFieldValue('NAME'); //@todo should be a varuable name
  var dropdown_type = block.getFieldValue('CONTROLLER_TYPE');
  var value_port = Blockly.Java.valueToCode(block, 'PORT', Blockly.Java.ORDER_ATOMIC);
  
  Blockly.Java.addImport("import edu.wpi.first.wpilibj."+dropdown_type+";");
  var code = dropdown_type+' '+text_name+' = new '+dropdown_type+'('+value_port+');\n';
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
  var text_name = block.getFieldValue('NAME'); //@todo should be a varaiable
  var dropdown_type = block.getFieldValue('TYPE');

  Blockly.Java.addReservedWords('frontLeftMotor,rearLeftMotor,frontRightMotor,rearRightMotor');
  var code = [];
  code.push(dropdown_type+' frontLeftMotor  = new '+dropdown_type+'(1);');
  code.push(dropdown_type+' rearLeftMotor   = new '+dropdown_type+'(2);');
  code.push(dropdown_type+' frontRightMotor = new '+dropdown_type+'(3);');
  code.push(dropdown_type+' rearRightMotor  = new '+dropdown_type+'(4);');

  Blockly.Java.addImport("import edu.wpi.first.wpilibj."+dropdown_type+";");
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.RobotDrive;");
  code.push('RobotDrive'+' '+text_name+' = new RobotDrive(frontLeftMotor, rearLeftMotor, frontRightMotor, rearRightMotor);\n');

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
  // TODO: Assemble Java into code variable.
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
// Pneumatics


// =============================================================================
// Sensors
// Gyro
// Accelerometer
// Encoder


//   referenceBlock.setWarningText(msg);

