
Blockly.Blocks['variables_declare_int'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Declare")
        .appendField(new Blockly.TypedFieldVariable("num1", 'int', true), "NAME")
        .appendField("of type 'integer' value")
        // .appendField(new Blockly.FieldDropdown([["integer", "int"], ["double", "double"]]), "TYPE")
        // .appendField("value")
        .appendField(new Blockly.FieldTextInput("0", EasyJ.Checker.IS_NUM), "VALUE");
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

Blockly.Java['variables_declare_int'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  // var dropdown_type = block.getFieldValue('TYPE');
  var text_value = block.getFieldValue('VALUE');
  // TODO: Assemble Java into code variable.
  var code = 'int '+variable_name+' = '+text_value+';';
  return code;
};

//------------------------------------------------------------------------------

Blockly.Blocks['variables_set_int'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("set")
        .appendField(new Blockly.TypedFieldVariable("item", 'int'), "NAME");
    this.appendValueInput("VALUE")
        .setCheck("Number")
        .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'statement');
    this.setNextStatement(true, 'statement');
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

Blockly.Java['variables_set_int'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_value = Blockly.Java.valueToCode(block, 'VALUE', Blockly.Java.ORDER_ASSIGNMENT) || '0';
  // TODO: Assemble Java into code variable.
  var code = variable_name+' = '+value_value+';';
  return code;
};


//------------------------------------------------------------------------------


Blockly.Blocks['variables_get_int'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("get")
        .appendField(new Blockly.TypedFieldVariable("item", 'int'), "NAME");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
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

Blockly.Java['variables_get_int'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

  var code = variable_name;

  return [code, Blockly.Java.ORDER_ATOMIC];
};

















// Blockly.Blocks['variables_declare_double'] = {
//   init: function() {
//     this.setHelpUrl('http://www.example.com/');
//     this.setTooltip('');
//     this.setColour(230);
//     this.appendDummyInput()
//         .appendField("Declare")
//         .appendField(new Blockly.TypedFieldVariable("var2", 'double', true), "NAME")
//         .appendField("of type 'double' value")
//         // .appendField(new Blockly.FieldDropdown([["integer", "int"], ["double", "double"]]), "TYPE")
//         // .appendField("value")
//         .appendField(new Blockly.FieldTextInput("0.0", EasyJ.Checker.IS_NUMF), "VALUE");
//     this.setInputsInline(true);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//   },
//   onchange: EasyJ.Checker.EnsureNotTop_Init,
//   renameVar: function(oldName, newName) {
//     if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
//       this.setFieldValue(newName, 'NAME');
//     }
//   }
// };

// Blockly.Java['variables_declare_double'] = function(block) {
//   var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
//   // var dropdown_type = block.getFieldValue('TYPE');
//   var text_value = block.getFieldValue('VALUE');
//   // TODO: Assemble Java into code variable.
//   var code = 'int '+variable_name+' = '+text_value+';';
//   return code;
// };


//------

// Blockly.Java['variables_get_int'] = function(block) {
//   // Variable getter.
//   var code = Blockly.Java.variableDB_.getName(block.getFieldValue('VAR'),
//       Blockly.Variables.NAME_TYPE);
//   return [code, Blockly.Java.ORDER_ATOMIC];
// };

// Blockly.Java['variables_set_int'] = function(block) {
//   // Variable setter.
//   var argument0 = Blockly.Java.valueToCode(block, 'VALUE',
//       Blockly.Java.ORDER_ASSIGNMENT) || '0';
//   var varName = Blockly.Java.variableDB_.getName(
//       block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
//   return varName + ' = ' + argument0 + ';\n';
// };