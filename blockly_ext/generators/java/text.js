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
 * @fileoverview Generating Java for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Java.text');

goog.require('Blockly.Java');


Blockly.Java['text'] = function(block) {
  // Text value.
  var code = Blockly.Java.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Java.ORDER_ATOMIC];
};

Blockly.Java['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
  if (block.itemCount_ == 0) {
    return ['\'\'', Blockly.Java.ORDER_ATOMIC];
  } else if (block.itemCount_ == 1) {
    var argument0 = Blockly.Java.valueToCode(block, 'ADD0',
        Blockly.Java.ORDER_NONE) || '\'\'';
    code = 'String(' + argument0 + ')';
    return [code, Blockly.Java.ORDER_FUNCTION_CALL];
  } else if (block.itemCount_ == 2) {
    var argument0 = Blockly.Java.valueToCode(block, 'ADD0',
        Blockly.Java.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.Java.valueToCode(block, 'ADD1',
        Blockly.Java.ORDER_NONE) || '\'\'';
    code = 'String(' + argument0 + ') + String(' + argument1 + ')';
    return [code, Blockly.Java.ORDER_ADDITION];
  } else {
    code = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      code[n] = Blockly.Java.valueToCode(block, 'ADD' + n,
          Blockly.Java.ORDER_COMMA) || '\'\'';
    }
    code = '[' + code.join(',') + '].join(\'\')';
    return [code, Blockly.Java.ORDER_FUNCTION_CALL];
  }
};

Blockly.Java['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Java.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Java.valueToCode(block, 'TEXT',
      Blockly.Java.ORDER_NONE) || '\'\'';
  return varName + ' = String(' + varName + ') + String(' + argument0 + ');\n';
};

Blockly.Java['text_length'] = function(block) {
  // String length.
  var argument0 = Blockly.Java.valueToCode(block, 'VALUE',
      Blockly.Java.ORDER_FUNCTION_CALL) || '\'\'';
  return [argument0 + '.length', Blockly.Java.ORDER_MEMBER];
};

Blockly.Java['text_isEmpty'] = function(block) {
  // Is the string null?
  var argument0 = Blockly.Java.valueToCode(block, 'VALUE',
      Blockly.Java.ORDER_MEMBER) || '\'\'';
  return ['!' + argument0, Blockly.Java.ORDER_LOGICAL_NOT];
};

Blockly.Java['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var operator = block.getFieldValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var argument0 = Blockly.Java.valueToCode(block, 'FIND',
      Blockly.Java.ORDER_NONE) || '\'\'';
  var argument1 = Blockly.Java.valueToCode(block, 'VALUE',
      Blockly.Java.ORDER_MEMBER) || '\'\'';
  var code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
  return [code, Blockly.Java.ORDER_MEMBER];
};

// Blockly.Java['text_charAt'] = function(block) {
//   // Get letter at index.
//   // Note: Until January 2013 this block did not have the WHERE input.
//   var where = block.getFieldValue('WHERE') || 'FROM_START';
//   var at = Blockly.Java.valueToCode(block, 'AT',
//       Blockly.Java.ORDER_UNARY_NEGATION) || '1';
//   var text = Blockly.Java.valueToCode(block, 'VALUE',
//       Blockly.Java.ORDER_MEMBER) || '\'\'';
//   switch (where) {
//     case 'FIRST':
//       var code = text + '.charAt(0)';
//       return [code, Blockly.Java.ORDER_FUNCTION_CALL];
//     case 'LAST':
//       var code = text + '.slice(-1)';
//       return [code, Blockly.Java.ORDER_FUNCTION_CALL];
//     case 'FROM_START':
//       // Blockly uses one-based indicies.
//       if (Blockly.isNumber(at)) {
//         // If the index is a naked number, decrement it right now.
//         at = parseFloat(at) - 1;
//       } else {
//         // If the index is dynamic, decrement it in code.
//         at += ' - 1';
//       }
//       var code = text + '.charAt(' + at + ')';
//       return [code, Blockly.Java.ORDER_FUNCTION_CALL];
//     case 'FROM_END':
//       var code = text + '.slice(-' + at + ').charAt(0)';
//       return [code, Blockly.Java.ORDER_FUNCTION_CALL];
//     case 'RANDOM':
//       var functionName = Blockly.Java.provideFunction_(
//           'text_random_letter',
//           [ 'function ' + Blockly.Java.FUNCTION_NAME_PLACEHOLDER_ +
//               '(text) {',
//             '  var x = Math.floor(Math.random() * text.length);',
//             '  return text[x];',
//             '}']);
//       code = functionName + '(' + text + ')';
//       return [code, Blockly.Java.ORDER_FUNCTION_CALL];
//   }
//   throw 'Unhandled option (text_charAt).';
// };

// Blockly.Java['text_getSubstring'] = function(block) {
//   // Get substring.
//   var text = Blockly.Java.valueToCode(block, 'STRING',
//       Blockly.Java.ORDER_MEMBER) || '\'\'';
//   var where1 = block.getFieldValue('WHERE1');
//   var where2 = block.getFieldValue('WHERE2');
//   var at1 = Blockly.Java.valueToCode(block, 'AT1',
//       Blockly.Java.ORDER_NONE) || '1';
//   var at2 = Blockly.Java.valueToCode(block, 'AT2',
//       Blockly.Java.ORDER_NONE) || '1';
//   if (where1 == 'FIRST' && where2 == 'LAST') {
//     var code = text;
//   } else {
//     var functionName = Blockly.Java.provideFunction_(
//         'text_get_substring',
//         [ 'function ' + Blockly.Java.FUNCTION_NAME_PLACEHOLDER_ +
//             '(text, where1, at1, where2, at2) {',
//           '  function getAt(where, at) {',
//           '    if (where == \'FROM_START\') {',
//           '      at--;',
//           '    } else if (where == \'FROM_END\') {',
//           '      at = text.length - at;',
//           '    } else if (where == \'FIRST\') {',
//           '      at = 0;',
//           '    } else if (where == \'LAST\') {',
//           '      at = text.length - 1;',
//           '    } else {',
//           '      throw \'Unhandled option (text_getSubstring).\';',
//           '    }',
//           '    return at;',
//           '  }',
//           '  at1 = getAt(where1, at1);',
//           '  at2 = getAt(where2, at2) + 1;',
//           '  return text.slice(at1, at2);',
//           '}']);
//     var code = functionName + '(' + text + ', \'' +
//         where1 + '\', ' + at1 + ', \'' + where2 + '\', ' + at2 + ')';
//   }
//   return [code, Blockly.Java.ORDER_FUNCTION_CALL];
// };

// Blockly.Java['text_changeCase'] = function(block) {
//   // Change capitalization.
//   var OPERATORS = {
//     'UPPERCASE': '.toUpperCase()',
//     'LOWERCASE': '.toLowerCase()',
//     'TITLECASE': null
//   };
//   var operator = OPERATORS[block.getFieldValue('CASE')];
//   var code;
//   if (operator) {
//     // Upper and lower case are functions built into Java.
//     var argument0 = Blockly.Java.valueToCode(block, 'TEXT',
//         Blockly.Java.ORDER_MEMBER) || '\'\'';
//     code = argument0 + operator;
//   } else {
//     // Title case is not a native Java function.  Define one.
//     var functionName = Blockly.Java.provideFunction_(
//         'text_toTitleCase',
//         [ 'function ' + Blockly.Java.FUNCTION_NAME_PLACEHOLDER_ + '(str) {',
//           '  return str.replace(/\\S+/g,',
//           '      function(txt) {return txt[0].toUpperCase() + ' +
//               'txt.substring(1).toLowerCase();});',
//           '}']);
//     var argument0 = Blockly.Java.valueToCode(block, 'TEXT',
//         Blockly.Java.ORDER_NONE) || '\'\'';
//     code = functionName + '(' + argument0 + ')';
//   }
//   return [code, Blockly.Java.ORDER_FUNCTION_CALL];
// };

// Blockly.Java['text_trim'] = function(block) {
//   // Trim spaces.
//   var OPERATORS = {
//     'LEFT': '.trimLeft()',
//     'RIGHT': '.trimRight()',
//     'BOTH': '.trim()'
//   };
//   var operator = OPERATORS[block.getFieldValue('MODE')];
//   var argument0 = Blockly.Java.valueToCode(block, 'TEXT',
//       Blockly.Java.ORDER_MEMBER) || '\'\'';
//   return [argument0 + operator, Blockly.Java.ORDER_FUNCTION_CALL];
// };
// http://docs.oracle.com/javase/7/docs/api/java/lang/String.html#trim()

Blockly.Java['text_print'] = function(block) {
  // Print statement.
  var argument0 = Blockly.Java.valueToCode(block, 'TEXT',
      Blockly.Java.ORDER_NONE) || '\'\'';
  return 'System.out.println(' + argument0 + ');\n';
};

