Blockly.Blocks['declare_compressor'] = {
  init: function() {
    this.setHelpUrl('');
    this.setTooltip('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare Compressor")
        .appendField(new Blockly.TypedFieldVariable("Pump1", "Compressor", true), "NAME")
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
	this.setDependsOn("declare_compressor");
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
Blockly.Java['compressor_start'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  Blockly.Java.addImport("import edu.wpi.first.wpilibj.Compressor;");
  var code = variable_name+'.start();';
  return code;
};