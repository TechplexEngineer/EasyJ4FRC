// This seems like a bit of a hack... but ohwells
Blockly.Java.workspaceToCode = function (rootBlk) {
  var declarations = [];
  var generatorblks = ['auto_init','auto_perodic','teleop_init','teleop_perodic'];
  var code = [];
  this.init();
  var blocks = [];
  if (rootBlk) {
    blocks = [rootBlk];
  } else {
    blocks = Blockly.mainWorkspace.getTopBlocks(true);
  }
  for (var x = 0, block; block = blocks[x]; x++) {
    var line = this.blockToCode(block);
    if (goog.isArray(line)) {
      // Value blocks return tuples of code and operator order.
      // Top-level blocks don't care about operator order.
      line = line[0];
    }
    if (line) {
      if (block.outputConnection && this.scrubNakedValue) {
        // This block is a naked value.  Ask the language's code generator if
        // it wants to append a semicolon, or something.
        line = this.scrubNakedValue(line);
      }
      // @note: The main difference is we separate out declarations
      if (generatorblks.indexOf(block.type) != -1 ) { // in list
        code.push(line);
      } else if (block.type == "init_declare") {
        declarations.push(line);
      } else {
        console.log("Ignoring Loose Block! of type %s",block.type, block);
      }
    }
  }
  code = code.join('\n');  // Blank line between each section.
  declarations = declarations.join('');
  // code = this.finish(code, declarations.join('\n'));
  
 


  // Final scrubbing of whitespace.
  code = scrubWhitespace(code);
  declarations = scrubWhitespace(declarations);
  
  return {"code":code, "declarations":declarations};
};

function scrubWhitespace(code) {
  code = code.replace(/^\s+\n/, '');
  code = code.replace(/\n\s+$/, '\n');
  code = code.replace(/[ \t]+\n/g, '\n');
  return code;
}