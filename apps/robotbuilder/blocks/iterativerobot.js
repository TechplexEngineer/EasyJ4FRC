// =============================================================================
// Declare
Blockly.Blocks['init_declare'] = {
  init: function() {
	this.setHelpUrl('');
	this.setTooltip('Declare blocks go here');
	this.appendDummyInput()
		.appendField("Initialization");
	this.appendStatementInput("WHAT")
		.appendField("do")
		.setCheck('declare');
	this.setDeletable(false);
	this.setColour(120);
  }
};
Blockly.Java['init_declare'] = function(block) {
  var statements_what = Blockly.Java.statementToCode(block, 'WHAT');
  return statements_what;
};

// =============================================================================
// Autonomous
Blockly.Blocks['auto_init'] = {
  init: function() {
	this.setHelpUrl('');
	this.setTooltip('These blocks are run once at the beginning of autonomous.');
	this.appendDummyInput()
		.appendField("At the Start of Auto");
	this.appendStatementInput("WHAT")
		.appendField("do")
		.setCheck('statement');
	this.setDeletable(false);
	this.setColour(0);
  }
};
Blockly.Java['auto_init'] = function(block) {
  var statements_what = Blockly.Java.statementToCode(block, 'WHAT');
  // TODO: Assemble Java into code variable.
  var code = 'public void autonomousInit() { \n'+statements_what+'\n}';
  return code;
};

Blockly.Blocks['auto_perodic'] = {
  init: function() {
	this.setHelpUrl('');
	this.setTooltip('These blocks are run repeadedly following the "At the Start of Auto" blocks.');
	this.appendDummyInput()
		.appendField("Repeat During Auto");
	this.appendStatementInput("WHAT")
		.appendField("do")
		.setCheck('statement');
	this.setDeletable(false);
	this.setColour(0);
  }
};

Blockly.Java['auto_perodic'] = function(block) {
  var statements_what = Blockly.Java.statementToCode(block, 'WHAT');
  // TODO: Assemble Java into code variable.
  var code = 'public void autonomousPeriodic() { \n'+statements_what+'\n}';
  return code;
};

// =============================================================================
// Teleoperated

Blockly.Blocks['teleop_init'] = {
  init: function() {
	this.setHelpUrl('');
	this.setTooltip('These blocks are run once at the beginning of teleop.');
	this.setColour(210);
	this.appendDummyInput()
		.appendField("At the Start of Teleop");
	this.appendStatementInput("WHAT")
		.appendField("do")
		.setCheck('statement');
	this.setDeletable(false);
  }
};
Blockly.Java['teleop_init'] = function(block) {
  var statements_what = Blockly.Java.statementToCode(block, 'WHAT');
  // TODO: Assemble Java into code variable.
  var code = 'public void teleoperatedInit() { \n'+statements_what+'\n}';
  return code;
};

Blockly.Blocks['teleop_perodic'] = {
  init: function() {
	this.setHelpUrl('');
	this.setTooltip('These blocks are run repeadedly following the "At the Start of Teleop" blocks.');
	this.setColour(210);
	this.appendDummyInput()
		.appendField("Repeat During Teleop");
	this.appendStatementInput("WHAT")
		.appendField("do")
		.setCheck('statement');
	this.setDeletable(false);
  }
};
Blockly.Java['teleop_perodic'] = function(block) {
  var statements_what = Blockly.Java.statementToCode(block, 'WHAT');
  // TODO: Assemble Java into code variable.
  var code = 'public void teleoperatedPeriodic() { \n'+statements_what+'\n}';
  return code;
};

