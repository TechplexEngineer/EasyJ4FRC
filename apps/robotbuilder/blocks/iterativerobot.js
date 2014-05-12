// =============================================================================
// Autonomous
Blockly.Blocks['auto_init'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setTooltip('');
	this.appendDummyInput()
		.appendField("At the Start of Auto");
	this.appendStatementInput("WHAT")
		.appendField("do");
	this.setDeletable(false);
	this.setColour(0);
  }
};
Blockly.Java['auto_init'] = function(block) {
  var statements_what = Blockly.Java.statementToCode(block, 'WHAT');
  // TODO: Assemble Java into code variable.
  var code = '...';
  return code;
};

Blockly.Blocks['auto_perodic'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setTooltip('');
	this.appendDummyInput()
		.appendField("During Auto");
	this.appendStatementInput("WHAT")
		.appendField("do");
	this.setDeletable(false);
	this.setColour(0);
  }
};

Blockly.Java['auto_perodic'] = function(block) {
  var statements_what = Blockly.Java.statementToCode(block, 'WHAT');
  // TODO: Assemble Java into code variable.
  var code = '...';
  return code;
};

// =============================================================================
// Teleoperated

Blockly.Blocks['teleop_init'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setTooltip('');
	this.setColour(210);
	this.appendDummyInput()
		.appendField("At the Start of Teleop");
	this.appendStatementInput("WHAT")
		.appendField("do");
	this.setDeletable(false);
  }
};
Blockly.Java['teleop_init'] = function(block) {
  var statements_name = Blockly.Java.statementToCode(block, 'WHAT');
  // TODO: Assemble Java into code variable.
  var code = '...';
  return code;
};

Blockly.Blocks['teleop_perodic'] = {
  init: function() {
	this.setHelpUrl('http://www.example.com/');
	this.setTooltip('');
	this.setColour(210);
	this.appendDummyInput()
		.appendField("During Teleop");
	this.appendStatementInput("WHAT")
		.appendField("do");
	this.setDeletable(false);
  }
};
Blockly.Java['teleop_perodic'] = function(block) {
  var statements_what = Blockly.Java.statementToCode(block, 'WHAT');
  // TODO: Assemble Java into code variable.
  var code = '...';
  return code;
};

