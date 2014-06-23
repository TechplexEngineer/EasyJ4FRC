Blockly.Blocks['simple_robot'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setTooltip('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Sinple Robot Named:")
        .appendField(new Blockly.TypedFieldVariable("MyRobot", "Class"), "NAME");
    this.appendStatementInput("setup")
        .appendField("Setup");
    this.appendStatementInput("auto")
        .appendField("Autonomous Loop");
    this.appendStatementInput("teleop")
        .appendField("Teleoperated Loop");
  }
};
Blockly.Java['simple_robot'] = function(block) {
  var variable_name = Blockly.Java.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var statements_setup = Blockly.Java.statementToCode(block, 'setup');
  var statements_auto = Blockly.Java.statementToCode(block, 'auto');
  var statements_teleop = Blockly.Java.statementToCode(block, 'teleop');
  
  Blockly.Java.addImport("import edu.wpi.first.wpilibj.SimpleRobot;");
  var code = [];
  code.push("public class "+variable_name+" extends SimpleRobot {");
  
  code.push(statements_setup);
  code.push("\tpublic void autonomous() {");
  code.push("\t\twhile(isEnabled() && isAutonomous()) {");
  code.push("\t\t\t"+statements_auto);
  code.push("\t\t}");
  code.push("\t}");
  
  code.push("\tpublic void operatorControl() {")
  code.push("\t\twhile(isEnabled() && isOperatorControl()) {");
  code.push("\t\t\t"+statements_teleop);
  code.push("\t\t}");
  code.push("\t}");

  code.push("}");

  code = code.join('\n').replace(/\t/gm, Blockly.Java.INDENT);

  return code;
};