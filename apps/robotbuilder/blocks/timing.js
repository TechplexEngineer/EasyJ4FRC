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
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
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
        .appendField(new Blockly.TypedFieldVariable("Timer1", "Timer", true), "NAME");
    this.setPreviousStatement(true, 'declare');
    this.setNextStatement(true, 'declare');
  },
  onchange: EasyJ.Checker.EnsureNotTop_Init
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
        .appendField(new Blockly.TypedFieldVariable("Timer1", "Timer"), "NAME");
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("timer");
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
        .appendField(new Blockly.TypedFieldVariable("Timer1", "Timer"), "NAME");
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("timer");
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
        .appendField(new Blockly.TypedFieldVariable("Timer1", "Timer"), "NAME");
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("timer");
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