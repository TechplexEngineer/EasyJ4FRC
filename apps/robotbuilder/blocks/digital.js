// Digital

Blockly.Blocks['declare_digital_input'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Create a digital input which allows reading of a digital signal.');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare Digital Input")
        .appendField(new Blockly.TypedFieldVariable("Din1", "DigitalInput", true), "NAME");
    this.appendDummyInput()
        .appendField("on port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.DIGITAL_PORT), "PORT");
    // this.appendValueInput("PORT")
    //     .setCheck("Number")
    //     .appendField("on Port");
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
Blockly.Java['declare_digital_input'] = function(block) {
  var value_port = block.getFieldValue('PORT');
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  Blockly.Java.addImport("import edu.wpi.first.wpilibj.DigitalInput;");
  var code = 'DigitalInput '+variable_name+' = new DigitalInput('+value_port+');';
  return code;
};

Blockly.Blocks['get_digital_input_value'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('Get the current value of the digital input.');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Get value")
        .appendField(new Blockly.TypedFieldVariable("Din1", "DigitalInput"), "NAME");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
	this.setDependsOn("declare_digital_input");
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  }
};
Blockly.Java['get_digital_input_value'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  //@todo make sure variable_name has been declared
  var code = variable_name+'.get()';
  return code;
};

// Digital Output

Blockly.Blocks['declare_digital_output'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare Digital Output")
        .appendField(new Blockly.TypedFieldVariable("Dout1", "DigitalOutput", true), "NAME");
    this.appendDummyInput()
        .appendField("on port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.DIGITAL_PORT), "PORT");
    // this.appendValueInput("PORT")
    //     .setCheck("Number")
    //     .appendField("on Port");
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
Blockly.Java['declare_digital_output'] = function(block) {
  var value_port = block.getFieldValue('PORT');
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.DigitalOutput;");
  var code = 'DigitalInput '+variable_name+' = new DigitalInput('+value_port+');';
  return code;
};

Blockly.Blocks['set_digital_output'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Set value")
        .appendField(new Blockly.TypedFieldVariable("Dout1", "DigitalOutput"), "NAME");
    this.appendValueInput("VALUE")
        .setCheck("Boolean")
        .appendField("to");
    // this.appendDummyInput()
    //     .appendField("to")
    //     .appendField(new Blockly.FieldDropdown([["True", "True"], ["False", "False"]]), "VALUE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("set_digital_output");
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  }
};
Blockly.Java['set_digital_output'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var dropdown_value = Blockly.Java.valueToCode(block, 'VALUE', Blockly.Java.ORDER_ATOMIC);
  //block.getFieldValue('VALUE');
  //@todo make sure variable_name has been declared
  var code = variable_name+'.set('+dropdown_value+')';
  return code;
};