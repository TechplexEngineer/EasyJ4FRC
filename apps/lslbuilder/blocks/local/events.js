

Blockly.Blocks['touch_start'] = {
  init: function() {
    this.setHelpUrl('http://wiki.secondlife.com/wiki/Touch_start');
    this.setTooltip('Triggered by the start of agent clicking on task');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("When touched");
    this.appendStatementInput("NAME")
        .appendField("Do");
    this.setMaxAvailable(1);
  }
};
Blockly.Java['touch_start'] = function(block) {
  var statements_name = Blockly.Java.statementToCode(block, 'NAME');

  var code = 'touch_start(integer num_detected) {';
  code += statements_name;
  code += '}';
  return code;
};

//=========================================================================================
Blockly.Blocks['collision_start'] = {
  init: function() {
    this.setHelpUrl('http://wiki.secondlife.com/wiki/Collision_start');
    this.setTooltip('Triggered when task starts colliding with another task');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("When an avatar collides");
    this.appendStatementInput("NAME")
        .appendField("Do");
   this.setMaxAvailable(1);
  }
};
Blockly.Java['collision_start'] = function(block) {
  var statements_name = Blockly.Java.statementToCode(block, 'NAME');

  var code = 'collision_start(integer num_detected) {';
  code += statements_name;
  code += '}';
  return code;
};

//=========================================================================================
Blockly.Blocks['state_entry'] = {
  init: function() {
    this.setHelpUrl('http://wiki.secondlife.com/wiki/State_entry');
    this.setTooltip('Triggered on any state transition and startup');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("On startup");
    this.appendStatementInput("NAME")
        .appendField("Do");
   this.setMaxAvailable(1);
  }
};
Blockly.Java['state_entry'] = function(block) {
  var statements_name = Blockly.Java.statementToCode(block, 'NAME');

  var code = 'state_entry() {';
  code += statements_name;
  code += '}';
  return code;
};

//=========================================================================================
Blockly.Blocks['object_rez'] = {
  init: function() {
    this.setHelpUrl('http://wiki.secondlife.com/wiki/Object_rez');
    this.setTooltip('Triggered when the object rezzes an object');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("On creation");
    this.appendStatementInput("NAME")
        .appendField("Do");
   this.setMaxAvailable(1);
  }
};
Blockly.Java['object_rez'] = function(block) {
  var statements_name = Blockly.Java.statementToCode(block, 'NAME');

  var code = 'object_rez() {';
  code += statements_name;
  code += '}';
  return code;
};













