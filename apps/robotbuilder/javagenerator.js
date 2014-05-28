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
        // console.log("Ignoring Loose Block! of type %s",block.type, block);
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

/**
 * Return a hash of a given block's variables
 * @return {hash} {name:"", vartype:""}
 */
Blockly.Block.prototype.getVars = function() {
  var out = [];
  for (var i = 0; i < this.inputList.length; i++) {
    for (var j = 0; j < this.inputList[i].fieldRow.length; j++) {
      var item = this.inputList[i].fieldRow[j];
      // console.log(this.type, item instanceof Blockly.FieldVariable, item);
      // console.log("Item",item.vartype);
      if (item instanceof Blockly.TypedFieldVariable) { //@todo should we handle these: FieldVariable
        var obj = {};
        obj.name = this.getFieldValue(item.name);
        obj.vartype = item.vartype;
        out.push(obj)
      };
    };
  };
  // console.log("out",out);
  return out;
}

/**
 * Find all user-created variablesof a given type.
 * @param {Blockly.Block=} opt_block Optional root block.
 * @return {!Array.<string>} Array of variable names.
 */
Blockly.Variables.allVariablesOfType = function(type) {
  var blocks;

  blocks = Blockly.mainWorkspace.getAllBlocks();

  var variableHash = Object.create(null);
  // Iterate through every block and add each variable to the hash.
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].getVars;
    if (func) {
      var blockVariables = func.call(blocks[x]);
      for (var y = 0; y < blockVariables.length; y++) {

        var varName = blockVariables[y].name;
        var vartype = blockVariables[y].vartype;
        // Variable name may be null if the block is only half-built.
        if (varName) {
          // variableHash[varName.toLowerCase()] = varName;
          if (!goog.isArray(variableHash[vartype])) {
            variableHash[vartype] = [];
          }
          if (variableHash[vartype].indexOf(varName) == -1) {
            variableHash[vartype].push(varName);
          }
        }
      }
    }
  }

  return variableHash[type] || [];
};
