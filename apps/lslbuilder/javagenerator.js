// This seems like a bit of a hack... but ohwells
Blockly.Java.workspaceToCode = function (rootBlk) {
  var declarations = [];
  var generatorblks = ['touch_start','collision_start','state_entry','object_rez'];
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
 * @param {Blockly.Block=} block block to get variables from
 * @param {bool} opt_onlyCreate false to get a list of all typed variables in use by a block, defaults to true
 * @return {hash} {name:"", vartype:""}
 */
Blockly.Java.getTypedVarsFromBlock = function(block, opt_onlyCreate) {
  if (typeof opt_onlyCreate === "undefined") {
    opt_onlyCreate = true;
  }
  var out = [];
  for (var i = 0; i < block.inputList.length; i++) {
    for (var j = 0; j < block.inputList[i].fieldRow.length; j++) {
      var item = block.inputList[i].fieldRow[j];
      // console.log(block.type, item instanceof Blockly.FieldVariable, item);
      // console.log("Item",item.vartype);
      if (opt_onlyCreate && !item.createVar) {
        continue;
      }
      if (item instanceof Blockly.TypedFieldVariable) { //@todo should we handle these: FieldVariable
        var obj = {};
        obj.name = block.getFieldValue(item.name);
        obj.vartype = item.vartype;
        out.push(obj)
      };
    };
  };
  // console.log("out",out);
  return out;
}

/**
 * Return a hash of a given block's variables
 * @return {hash} {name:"", vartype:""}
 */
Blockly.Block.prototype.getVars = function() {
  return Blockly.Java.getTypedVarsFromBlock(this);
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

/**
 * Find all blocks in workspace of the given type.  No particular order.
 * @return {!Array.<!Blockly.Block>} Array of blocks.
 */
Blockly.Workspace.prototype.getAllBlocksOfType = function(prototypeName) {
  var foundblocks = [];

  var blocks = this.getTopBlocks(false);

  for (var x = 0; x < blocks.length; x++) {
    // iterate over the top blocks and add any that match
    if (blocks[x].type == prototypeName) {
      foundblocks.push(blocks[x])
    }
    // for each top block, iterate over its children looking for matches
    for (var i = 0; i < blocks[x].length; i++) {
      if (blocks[x][i].type == prototypeName) {
        foundblocks.push(blocks[x][i])
      }
    }
    // blocks.push.apply(blocks, blocks[x].getChildren());
  }
  return foundblocks;
};
/**
 * Keeps track of how many of each type of block exist
 */
Blockly.blockHash = {};

function onchgupdatecountsfunc(event) {
// 	console.log(this, a, b)
	var blocks = Blockly.mainWorkspace.getAllBlocks();
	Blockly.blockHash = {};
	for (var i = 0; i < blocks.length; i++) {
		if (typeof Blockly.blockHash[blocks[i].type] === "undefined") {
			Blockly.blockHash[blocks[i].type] = 1;
		} else {
			Blockly.blockHash[blocks[i].type] ++;
		}
	}
}
$(document).on("blocklyLoaded", function() {
	console.log("Loaded");
	Blockly.bindEvent_(Blockly.mainWorkspace.getCanvas(), 'blocklyWorkspaceChange', null, onchgupdatecountsfunc);
});



/**
 * Filter the blocks on the flyout to disable the ones that are above the
 * capacity limit and, the ones which depend on another block
 * @private
 */
Blockly.Flyout.prototype.filterForCapacity_ = function() {
  var remainingCapacity = this.targetWorkspace_.remainingCapacity();
  var blocks = this.workspace_.getTopBlocks(false); //Blocks in this flyout menu (workspace_ is the flyout)
  // console.log("Blocks in this flyout menu:", blocks);
  for (var i = 0, block; block = blocks[i]; i++) {
    // console.log(block.fred);
    // console.log(block.type, block.id, block.fred,"\n");
    var allBlocks = block.getDescendants(); // blocks which are containted (value blocks or statement blocks)

    var disabled = allBlocks.length > remainingCapacity;

    // if the block depends on another block, at least one of those other blocks must exist
    if (block.dependsOn && !disabled) {
      // && (typeof Blockly.blockHash[block.dependsOn] === "undefined" || Blockly.blockHash[block.dependsOn] < 1)
      for (var j = 0; j < block.dependsOn.length; j++) {
        disabled = (typeof Blockly.blockHash[block.dependsOn[j]] === "undefined" || Blockly.blockHash[block.dependsOn[j]] < 1)
        if (disabled)
          break;
      }
    }

// @todo
//     if (block.maxAvailable !== null) {
//       console.log("Not Null!");
//       var blocksoftype = this.targetWorkspace_.getAllBlocksOfType(block.type);
//     }


    block.setDisabled(disabled);
  }
};

Blockly.Block.prototype.setDependsOn = function (who) {
	if (!$.isArray(who))
		who = [who];
	this.dependsOn = who;
}
































