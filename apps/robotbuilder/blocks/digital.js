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
    this.setPreviousStatement(true, 'declare');
    this.setNextStatement(true, 'declare');
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