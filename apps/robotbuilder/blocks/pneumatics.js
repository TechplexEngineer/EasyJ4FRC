Blockly.Blocks['declare_compressor'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Declare Compressor")
        .appendField(new Blockly.TypedFieldVariable("Pump1", "Compressor"), "NAME")
        .appendField("with Relay on port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.RELAY_PORT), "RELAY")
        .appendField("and pressure switch on port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.DIGITAL_PORT), "PRESSURESW");
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
Blockly.Java['declare_compressor'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var text_relay = block.getFieldValue('RELAY');
  var text_pressuresw = block.getFieldValue('PRESSURESW');

  var code = 'Compressor '+variable_name+' = new Compressor('+text_pressuresw+','+text_relay+');';
  return code;
};

Blockly.Blocks['compressor_start'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Start Compressor")
        .appendField(new Blockly.TypedFieldVariable("Pump1", "Compressor"), "NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("compressor");
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  }
};
Blockly.Java['compressor_start'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  Blockly.Java.addImport("import edu.wpi.first.wpilibj.Compressor;");
  var code = variable_name+'.start();';
  return code;
};


Blockly.Blocks['declare_solenoid_single'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Declare Single Solenoid")
        .appendField(new Blockly.TypedFieldVariable("SValve1", "Solenoid"), "NAME")
        .appendField("on port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.SOLENOID_PORT), "SOLENOID");
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
Blockly.Java['declare_solenoid_single'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var text_solenoid = block.getFieldValue('SOLENOID');

  Blockly.Java.addImport("import edu.wpi.first.wpilibj.Solenoid;");
  var code = 'Solenoid '+variable_name+' = new Solenoid('+text_solenoid+');';
  return code;
};

//solenoid set
Blockly.Blocks['set_solenoid_single'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Set solenoid")
        .appendField(new Blockly.TypedFieldVariable("SValve1", "Solenoid"), "NAME");
    this.appendValueInput("VALUE")
        .setCheck("Boolean")
        .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
	this.setDependsOn("solenoid_single");
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  }
};
Blockly.Java['set_solenoid_single'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var dropdown_value = Blockly.Java.valueToCode(block, 'VALUE', Blockly.Java.ORDER_ATOMIC);
  //@todo make sure variable_name has been declared
  var code = variable_name+'.set('+dropdown_value+')';
  return code;
};


Blockly.Blocks['declare_solenoid_double'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('How a double solenoid works');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Declare Double Solenoid")
        .appendField(new Blockly.TypedFieldVariable("DValve1", "DoubleSolenoid"), "NAME")
        .appendField("forward port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.SOLENOID_PORT), "SOLENOIDFWD")
        .appendField("reverse port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.SOLENOID_PORT), "SOLENOIDREV");
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
Blockly.Java['declare_solenoid_double'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var text_solenoidfwd = block.getFieldValue('SOLENOIDFWD');
   var text_solenoidrev = block.getFieldValue('SOLENOIDREV');

  Blockly.Java.addImport("import edu.wpi.first.wpilibj.DoubleSolenoid;");
  var code = 'DoubleSolenoid '+variable_name+' = new DoubleSolenoid('+text_solenoidfwd+','+text_solenoidrev+');';
  return code;
};

Blockly.Blocks['double_solenoid_set'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Set double solenoid")
        .appendField(new Blockly.TypedFieldVariable("DValve1"), "NAME")
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([
            ["Forward", "kForward"], 
            ["Reverse", "kReverse"], 
            ["Off", "kOff"]]), "TO");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setDependsOn("solenoid_double");
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  }
};
Blockly.Java['double_solenoid_set'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var dropdown_value = block.getFieldValue('TO');
  // TODO: Assemble Java into code variable.
  var code = variable_name+'.set(DoubleSolenoid.Value.'+dropdown_value+')';
  return code;
};