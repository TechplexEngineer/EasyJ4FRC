/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating JavaScript for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Java');

goog.require('Blockly.Generator');


Blockly.Java = new Blockly.Generator('Java');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Java.addReservedWords(
  //http://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html
  'abstract,continue,for,new,switch,assert,default,goto,package,synchronized' +
  'boolean,do,if,private,this,break,double,implements,protected,throw,byte,else'+
  'import,public,throws,case,enum,instanceof,return,transient,catch,extends,int'+
  'short,try,char,final,interface,static,void,class,finally,long,strictfp'+
  'volatile,const,float,native,super,while'
);

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
 * @todo Update for Java
 */
Blockly.Java.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Java.ORDER_MEMBER = 1;         // . []
Blockly.Java.ORDER_NEW = 1;            // new
Blockly.Java.ORDER_FUNCTION_CALL = 2;  // ()
Blockly.Java.ORDER_INCREMENT = 3;      // ++
Blockly.Java.ORDER_DECREMENT = 3;      // --
Blockly.Java.ORDER_LOGICAL_NOT = 4;    // !
Blockly.Java.ORDER_BITWISE_NOT = 4;    // ~
Blockly.Java.ORDER_UNARY_PLUS = 4;     // +
Blockly.Java.ORDER_UNARY_NEGATION = 4; // -
Blockly.Java.ORDER_TYPEOF = 4;         // typeof
Blockly.Java.ORDER_VOID = 4;           // void
Blockly.Java.ORDER_DELETE = 4;         // delete
Blockly.Java.ORDER_MULTIPLICATION = 5; // *
Blockly.Java.ORDER_DIVISION = 5;       // /
Blockly.Java.ORDER_MODULUS = 5;        // %
Blockly.Java.ORDER_ADDITION = 6;       // +
Blockly.Java.ORDER_SUBTRACTION = 6;    // -
Blockly.Java.ORDER_BITWISE_SHIFT = 7;  // << >> >>>
Blockly.Java.ORDER_RELATIONAL = 8;     // < <= > >=
Blockly.Java.ORDER_IN = 8;             // in
Blockly.Java.ORDER_INSTANCEOF = 8;     // instanceof
Blockly.Java.ORDER_EQUALITY = 9;       // == != === !==
Blockly.Java.ORDER_BITWISE_AND = 10;   // &
Blockly.Java.ORDER_BITWISE_XOR = 11;   // ^
Blockly.Java.ORDER_BITWISE_OR = 12;    // |
Blockly.Java.ORDER_LOGICAL_AND = 13;   // &&
Blockly.Java.ORDER_LOGICAL_OR = 14;    // ||
Blockly.Java.ORDER_CONDITIONAL = 15;   // ?:
Blockly.Java.ORDER_ASSIGNMENT = 16;    // = += -= *= /= %= <<= >>= ...
Blockly.Java.ORDER_COMMA = 17;         // ,
Blockly.Java.ORDER_NONE = 99;          // (...)

/**
 * Arbitrary code to inject into locations that risk causing infinite loops.
 * Any instances of '%1' will be replaced by the block ID that failed.
 * E.g. '  checkTimeout(%1);\n'
 * @type ?string
 */
Blockly.Java.INFINITE_LOOP_TRAP = null;

/**
 * Initialise the database of variable names.
 */
Blockly.Java.init = function() {
  //A set of all the import statments
  Blockly.Java.imports = [];
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Java.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Java.functionNames_ = Object.create(null);

  if (Blockly.Variables) {
    if (!Blockly.Java.variableDB_) {
      Blockly.Java.variableDB_ =
          new Blockly.Names(Blockly.Java.RESERVED_WORDS_);
    } else {
      Blockly.Java.variableDB_.reset();
    }

    var defvars = [];
    var variables = Blockly.Variables.allVariables();
    for (var x = 0; x < variables.length; x++) {
      defvars[x] = 'var ' +
          Blockly.Java.variableDB_.getName(variables[x],
          Blockly.Variables.NAME_TYPE) + ';';
    }
    Blockly.Java.definitions_['variables'] = defvars.join('\n');
    // Blockly.Java.definitions_['imports'] = [];
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Java.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Java.definitions_) {
    definitions = definitions.concat(Blockly.Java.definitions_[name]);
  }
  return definitions.join('\n') + '\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Java.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * @todo Update for Java
 * Encode a string as a properly escaped JavaScript string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Java string.
 * @private
 */
Blockly.Java.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

/**
 * Common tasks for generating Java from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Java code created for this block.
 * @return {string} Java code with comments and subsequent blocks added.
 * @private
 */
Blockly.Java.scrub_ = function(block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += this.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};


Blockly.Java.addImport = function(imprt) {
  if ( !(Blockly.Java.imports.indexOf(imprt) > -1) ) //This will make it a set
    Blockly.Java.imports.push(imprt);
}

Blockly.Java.getImports = function() {
  return Blockly.Java.imports;
}

// This seems like a bit of a hack... but ohwells
Blockly.Java.workspaceToCode = function(rootBlk) {
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
      code.push(line);
    }
  }
  code = code.join('\n');  // Blank line between each section.
  code = this.finish(code);
  // Final scrubbing of whitespace.
  code = code.replace(/^\s+\n/, '');
  code = code.replace(/\n\s+$/, '\n');
  code = code.replace(/[ \t]+\n/g, '\n');
  return code;
};