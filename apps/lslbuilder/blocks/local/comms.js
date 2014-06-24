Blockly.Blocks['llsay'] = {
  init: function() {
    this.setHelpUrl('http://wiki.secondlife.com/wiki/Llsay');
    this.setTooltip('Says the text supplied in a radius of 10 meters.');
    this.setColour(160);
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("Say");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['llsay'] = function(block) {
  var value_name = Blockly.Java.valueToCode(block, 'NAME', Blockly.Java.ORDER_ATOMIC);
  // TODO: Assemble Java into code variable.
  var code = 'llSay(0, ';
  code += value_name;
  code += ');';
  return code;
};
//==========================================================================================================================

Blockly.Blocks['llwhisper'] = {
  init: function() {
    this.setHelpUrl('http://wiki.secondlife.com/wiki/LlWhisper');
    this.setTooltip('Whispers the text supplied in a radius of 20 meters.');
    this.setColour(160);
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("Whisper");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['llwhisper'] = function(block) {
  var value_name = Blockly.Java.valueToCode(block, 'NAME', Blockly.Java.ORDER_ATOMIC);
  // TODO: Assemble Java into code variable.
  var code = 'llWhisper(0, ';
  code += value_name;
  code += ');';
  return code;
};
//==========================================================================================================================

Blockly.Blocks['llshout'] = {
  init: function() {
    this.setHelpUrl('http://wiki.secondlife.com/wiki/LlShout');
    this.setTooltip('Whispers the text supplied in a radius of 100 meters.');
    this.setColour(160);
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("Shout");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['llshout'] = function(block) {
  var value_name = Blockly.Java.valueToCode(block, 'NAME', Blockly.Java.ORDER_ATOMIC);
  // TODO: Assemble Java into code variable.
  var code = 'llShout(0, ';
  code += value_name;
  code += ');';
  return code;
};
//==========================================================================================================================

Blockly.Blocks['llownersay'] = {
  init: function() {
    this.setHelpUrl('http://wiki.secondlife.com/wiki/LlOwnerSay');
    this.setTooltip('Says the text supplied directly to the owner if the owner is in the same region as the object.');
    this.setColour(160);
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("Say to Owner");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['llownersay'] = function(block) {
  var value_name = Blockly.Java.valueToCode(block, 'NAME', Blockly.Java.ORDER_ATOMIC);
  // TODO: Assemble Java into code variable.
  var code = 'llOwnerSay(';
  code += value_name;
  code += ');';
  return code;
};
//==========================================================================================================================

Blockly.Blocks['llinstantmessage'] = {
  init: function() {
    this.setHelpUrl('http://wiki.secondlife.com/wiki/LlInstantMessage');
    this.setTooltip('Sends the text supplied directly to the specified user.');
    this.setColour(160);
    this.appendValueInput("MSG")
        .setCheck("String")
        .appendField("Say");
    this.appendValueInput("TO")
        .setCheck("Key")
        .appendField("To");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Java['llinstantmessage'] = function(block) {
  var value_msg = Blockly.Java.valueToCode(block, 'MSG', Blockly.Java.ORDER_ATOMIC);
  var value_to = Blockly.Java.valueToCode(block, 'TO', Blockly.Java.ORDER_ATOMIC);
  // @todo: handle the case where there aren't any blocks in the value sockets
  var code = 'llInstantMessage(';
  code += value_to;
  code += ',';
  code += value_msg;
  code += ');';
  return code;
};
//==========================================================================================================================


















