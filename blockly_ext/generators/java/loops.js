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
 * @fileoverview Generating Java for loop blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Java.loops');

goog.require('Blockly.Java');


Blockly.Java['controls_repeat'] = function(block) {
  // Repeat n times (internal number).
  var repeats = Number(block.getFieldValue('TIMES'));
  var branch = Blockly.Java.statementToCode(block, 'DO');
  if (Blockly.Java.INFINITE_LOOP_TRAP) {
    branch = Blockly.Java.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var loopVar = Blockly.Java.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var code = 'for (int ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + repeats + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

Blockly.Java['controls_repeat_ext'] = function(block) {
  // Repeat n times (external number).
  var repeats = Blockly.Java.valueToCode(block, 'TIMES',
      Blockly.Java.ORDER_ASSIGNMENT) || '0';
  var branch = Blockly.Java.statementToCode(block, 'DO');
  if (Blockly.Java.INFINITE_LOOP_TRAP) {
    branch = Blockly.Java.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var code = '';
  var loopVar = Blockly.Java.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    var endVar = Blockly.Java.variableDB_.getDistinctName(
        'repeat_end', Blockly.Variables.NAME_TYPE);
    code += 'int ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (int ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

Blockly.Java['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.Java.valueToCode(block, 'BOOL',
      until ? Blockly.Java.ORDER_LOGICAL_NOT :
      Blockly.Java.ORDER_NONE) || 'false';
  var branch = Blockly.Java.statementToCode(block, 'DO');
  if (Blockly.Java.INFINITE_LOOP_TRAP) {
    branch = Blockly.Java.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.Java['controls_for'] = function(block) {
  // For loop.
  var variable0 = Blockly.Java.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Java.valueToCode(block, 'FROM',
      Blockly.Java.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Java.valueToCode(block, 'TO',
      Blockly.Java.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.Java.valueToCode(block, 'BY',
      Blockly.Java.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.Java.statementToCode(block, 'DO');
  if (Blockly.Java.INFINITE_LOOP_TRAP) {
    branch = Blockly.Java.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var code;
  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
      Blockly.isNumber(increment)) {
    // All arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (int ' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
      var startVar = Blockly.Java.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'int ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
      var endVar = Blockly.Java.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'int ' + endVar + ' = ' + argument1 + ';\n';
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    var incVar = Blockly.Java.variableDB_.getDistinctName(
        variable0 + '_inc', Blockly.Variables.NAME_TYPE);
    code += 'var ' + incVar + ' = ';
    if (Blockly.isNumber(increment)) {
      code += Math.abs(increment) + ';\n';
    } else {
      code += 'Math.abs(' + increment + ');\n';
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {\n';
    code += Blockly.Java.INDENT + incVar + ' = -' + incVar +';\n';
    code += '}\n';
    code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
        '     '  + incVar + ' >= 0 ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + ';\n' +
        '     ' + variable0 + ' += ' + incVar + ') {\n' +
        branch + '}\n';
  }
  Blockly.Java.addImport("java.lang.Math;");
  return code;
};

// Blockly.Java['controls_forEach'] = function(block) {
//   // For each loop.
//   var variable0 = Blockly.Java.variableDB_.getName(
//       block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
//   var argument0 = Blockly.Java.valueToCode(block, 'LIST',
//       Blockly.Java.ORDER_ASSIGNMENT) || '[]';
//   var branch = Blockly.Java.statementToCode(block, 'DO');
//   if (Blockly.Java.INFINITE_LOOP_TRAP) {
//     branch = Blockly.Java.INFINITE_LOOP_TRAP.replace(/%1/g,
//         '\'' + block.id + '\'') + branch;
//   }
//   var indexVar = Blockly.Java.variableDB_.getDistinctName(
//       variable0 + '_index', Blockly.Variables.NAME_TYPE);
//   branch = Blockly.Java.INDENT + variable0 + ' = ' + argument0 + '[' + indexVar + '];\n' +
//       branch;
//   var code = 'for (var ' + indexVar + ' in  ' + argument0 + ') {\n' +
//       branch + '}\n';
//   return code;
// };

Blockly.Java['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw 'Unknown flow statement.';
};
