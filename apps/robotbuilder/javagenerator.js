// This seems like a bit of a hack... but ohwells
function JavaGenerator(rootBlk) {
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
    if ($.isArray(line)) {
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
      if (generatorblks.indexOf(block.type) ==-1 ) {
        declarations.push(line);
      } else {
        code.push(line);
      }
    }
  }
  code = code.join('\n');  // Blank line between each section.
  declarations = declarations.join('\n');
  // code = this.finish(code, declarations.join('\n'));
  
  var out = "package org.usfirst.frcEasyJ.team5122;\n\n";
  out += Blockly.Java.getImports().join("\n");
  out += "\npublic class MyRobot extends IterativeRobot\n{\n";
  out += declarations;
  out += code;
  out += "}";
  code = out;


  // Final scrubbing of whitespace.
  code = code.replace(/^\s+\n/, '');
  code = code.replace(/\n\s+$/, '\n');
  code = code.replace(/[ \t]+\n/g, '\n');
  return code;
};