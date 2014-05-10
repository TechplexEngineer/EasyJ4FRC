/**
 * Blockly Apps: Block Factory
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
 * @fileoverview JavaScript for Blockly's Block Factory application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * The uneditable container block that everything else attaches to.
 * @type {Blockly.Block}
 */
var rootBlock = null;

/**
 * The language to send to the prettyprinter
 * http://code.google.com/p/google-code-prettify/wiki/GettingStarted
 */
var PRETTY_PRINT_LANGUAGE = 'java';


/**
 * When the workspace changes, update the three other displays.
 */
function onchange() {

  updateLanguage();

}

/**
 * Update the language code.
 */
function updateLanguage() {

  var code = "package org.usfirst.frcEasyJ.team5122;\n";
  // code.push("");

  

  var content = document.getElementById('languagePre');
  code += Blockly.Java.workspaceToCode(rootBlock);
  content.textContent = code;
  if (typeof prettyPrintOne == 'function') {
    code = content.innerHTML;
    code = prettyPrintOne(code, 'java');
    content.innerHTML = code;
  }

}

/**
 * Escape a string.
 * @param {string} string String to escape.
 * @return {string} Escaped string surrouned by quotes.
 */
function escapeString(string) {
  if (JSON && JSON.stringify) {
    return JSON.stringify(string);
  }
  // Hello MSIE 8.
  return '"' + string.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}



// /**
//  * Provide help to the user.
//  * @param {!Event} e Mouse or touch event.
//  */
// function helpDialog(e) {
//   var origin = e.target;

//   var container = document.getElementById('dialogContainer');
//   container.innerHTML = "Help";

//   var content = document.getElementById('generalDialog');
//   var style = {
//     width: '40%',
//     left: '30%',
//     top: '5em'
//   };
//   Blockly.Dialog.showDialog(content, origin, true, true, style,
//       Blockly.Dialog.stopDialogKeyDown);
//   Blockly.Dialog.startDialogKeyDown();
// };

/**
 * Initialize Blockly and layout.  Called on page load.
 */
function init() {
  // Blockly.Java.init();
  var expandList = [
    document.getElementById('blockly'),
    // document.getElementById('previewFrame'),
    document.getElementById('languagePre'),
    // document.getElementById('generatorPre')
  ];
  var onresize = function(e) {
    for (var i = 0, expand; expand = expandList[i]; i++) {
      expand.style.width = (expand.parentNode.offsetWidth - 2) + 'px';
      expand.style.height = (expand.parentNode.offsetHeight - 2) + 'px';
    }
  };
  onresize();
  window.addEventListener('resize', onresize);

  var toolbox = document.getElementById('toolbox'); //@todo can we lazy load this?
  Blockly.inject(document.getElementById('blockly'),
                 {path: BLOCKLYPATH, toolbox: toolbox});

  // Create the root block.
  rootBlock = Blockly.Block.obtain(Blockly.mainWorkspace, 'simple_robot');
  rootBlock.initSvg();
  rootBlock.render();
  rootBlock.setMovable(false);
  rootBlock.setDeletable(false);

  Blockly.addChangeListener(onchange);

  // Dialogs
  Blockly.Dialog.bindClick('aboutButton', aboutDialog);
  Blockly.Dialog.bindClick('helpButton', helpDialog);
  
}
window.addEventListener('load', init);


