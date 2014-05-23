Blockly.Blocks['declare_gyro'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("Declare Gyro")
        .appendField(new Blockly.TypedFieldVariable("gyro1", "Gyro"), "NAME");
    this.appendDummyInput()
        .appendField("on port")
        .appendField(new Blockly.FieldTextInput("1", EasyJ.Checker.DIGITAL_PORT), "PORT");
    // this.appendValueInput("PORT")
    //     .setCheck("Number")
    //     .appendField("on Port");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'declare');
    this.setNextStatement(true, 'declare');
  }
};
Blockly.Java['declare_gyro'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_port = block.getFieldValue('PORT');
  
  if (value_port=="") {
    block.setWarningText("Gyro port not set. Defaulted to port 1.");
    value_port = 1;
  }
  else {
    block.setWarningText(null);
  }
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.Gyro;");
  var code = 'Gyro '+variable_name+' = new Gyro('+value_port+');';
  return code;
};

Blockly.Blocks['get_gyro'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("Get ")
        .appendField(new Blockly.FieldDropdown(
          [
            ["Angle", "getAngle"], 
            ["Rate of Change", "getRate"]
          ]), "WHAT")
        .appendField(new Blockly.TypedFieldVariable("gyro1", "Gyro"), "NAME");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
  }
};
Blockly.Java['get_gyro_angle'] = function(block) {
  var dropdown_what = block.getFieldValue('WHAT');
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  
  //@todo make sure wariable_name has been declared
  var code = variable_name+'.'+dropdown_what+'()';
  return code;
};