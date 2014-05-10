Blockly.Dialog = {};

/**
 * Load the dialog from the href of the event's target
 * @param {!Event} e Mouse or touch event.
 */
Blockly.Dialog.dialogHandler = function(e) {

  var origin = e.target;
  
  var container = document.getElementById('dialogContainer');
  container.innerHTML = "Loading ...";

  if (origin.getAttribute("href") == "dialogs/help.html")
  {
    // This is a terrrible hack. It will do for now.
    var $ifr = $('<iframe>').addClass('help').attr('src', origin.getAttribute("href"))
    var container = $('#dialogContainer')
      container.html($ifr);

      var content = document.getElementById('generalDialog');
      var style = {
        width: '40%',
        left: '30%',
        top: '5em'
      };
      Blockly.Dialog.showDialog(content, origin, true, true, style,
          Blockly.Dialog.stopDialogKeyDown);
      Blockly.Dialog.startDialogKeyDown();
    return;
  }

  if (typeof origin.getAttribute("href") === 'undefined' || origin.getAttribute("href") == "" ) {
    container.innerHTML = "Unable to load the dialog. Try again later.";
  }
  else {
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("get", origin.getAttribute("href"), true);
    oReq.send();
    function reqListener () {
      var container = document.getElementById('dialogContainer');
      container.innerHTML = this.responseText;

      var content = document.getElementById('generalDialog');
      var style = {
        width: '40%',
        left: '30%',
        top: '5em'
      };
      Blockly.Dialog.showDialog(content, origin, true, true, style,
          Blockly.Dialog.stopDialogKeyDown);
      Blockly.Dialog.startDialogKeyDown();
    }
  }  
};



/**
 * A function to call when a dialog closes.
 * @type Function
 * @private
 */
Blockly.Dialog.dialogDispose_ = null;

/**
 * Show the dialog pop-up.
 * @param {!Element} content DOM element to display in the dialog.
 * @param {Element} origin Animate the dialog opening/closing from/to this
 *     DOM element.  If null, don't show any animations for opening or closing.
 * @param {boolean} animate Animate the dialog opening (if origin not null).
 * @param {boolean} modal If true, grey out background and prevent interaction.
 * @param {!Object} style A dictionary of style rules for the dialog.
 * @param {Function} disposeFunc An optional function to call when the dialog
 *     closes.  Normally used for unhooking events.
 */
Blockly.Dialog.showDialog = function(content, origin, animate, modal, style, disposeFunc) {
  if (Blockly.Dialog.isDialogVisible_) {
    Blockly.Dialog.hideDialog(false);
  }
  Blockly.Dialog.isDialogVisible_ = true;
  Blockly.Dialog.dialogOrigin_ = origin;
  Blockly.Dialog.dialogDispose_ = disposeFunc;
  var dialog = document.getElementById('dialog');
  var shadow = document.getElementById('dialogShadow');
  var border = document.getElementById('dialogBorder');

  // Copy all the specified styles to the dialog.
  for (var name in style) {
    dialog.style[name] = style[name];
  }
  if (modal) {
    shadow.style.visibility = 'visible';
    shadow.style.opacity = 0.3;
    var header = document.createElement('div');
    header.id = 'dialogHeader';
    dialog.appendChild(header);
    Blockly.Dialog.dialogMouseDownWrapper_ =
        Blockly.bindEvent_(header, 'mousedown', null,
                           Blockly.Dialog.dialogMouseDown_);
  }
  dialog.appendChild(content);
  content.className = content.className.replace('dialogHiddenContent', '');

  function endResult() {
    // Check that the dialog wasn't closed during opening.
    if (Blockly.Dialog.isDialogVisible_) {
      dialog.style.visibility = 'visible';
      dialog.style.zIndex = 1;
      border.style.visibility = 'hidden';
    }
  }
  if (animate && origin) {
    Blockly.Dialog.matchBorder_(origin, false, 0.2);
    Blockly.Dialog.matchBorder_(dialog, true, 0.8);
    // In 175ms show the dialog and hide the animated border.
    window.setTimeout(endResult, 175);
  } else {
    // No animation.  Just set the final state.
    endResult();
  }
};

/**
 * Horizontal start coordinate of dialog drag.
 */
Blockly.Dialog.dialogStartX_ = 0;

/**
 * Vertical start coordinate of dialog drag.
 */
Blockly.Dialog.dialogStartY_ = 0;

/**
 * Handle start of drag of dialog.
 * @param {!Event} e Mouse down event.
 * @private
 */
Blockly.Dialog.dialogMouseDown_ = function(e) {
  Blockly.Dialog.dialogUnbindDragEvents_();
  if (Blockly.isRightButton(e)) {
    // Right-click.
    return;
  }
  // Left click (or middle click).
  // Record the starting offset between the current location and the mouse.
  var dialog = document.getElementById('dialog');
  Blockly.Dialog.dialogStartX_ = dialog.offsetLeft - e.clientX;
  Blockly.Dialog.dialogStartY_ = dialog.offsetTop - e.clientY;

  Blockly.Dialog.dialogMouseUpWrapper_ = Blockly.bindEvent_(document,
      'mouseup', null, Blockly.Dialog.dialogUnbindDragEvents_);
  Blockly.Dialog.dialogMouseMoveWrapper_ = Blockly.bindEvent_(document,
      'mousemove', null, Blockly.Dialog.dialogMouseMove_);
  // This event has been handled.  No need to bubble up to the document.
  e.stopPropagation();
};

/**
 * Drag the dialog to follow the mouse.
 * @param {!Event} e Mouse move event.
 * @private
 */
Blockly.Dialog.dialogMouseMove_ = function(e) {
  var dialog = document.getElementById('dialog');
  var dialogLeft = Blockly.Dialog.dialogStartX_ + e.clientX;
  var dialogTop = Blockly.Dialog.dialogStartY_ + e.clientY;
  dialogTop = Math.max(dialogTop, 0);
  dialogTop = Math.min(dialogTop, window.innerHeight - dialog.offsetHeight);
  dialogLeft = Math.max(dialogLeft, 0);
  dialogLeft = Math.min(dialogLeft, window.innerWidth - dialog.offsetWidth);
  dialog.style.left = dialogLeft + 'px';
  dialog.style.top = dialogTop + 'px';
};

/**
 * Stop binding to the global mouseup and mousemove events.
 * @private
 */
Blockly.Dialog.dialogUnbindDragEvents_ = function() {
  if (Blockly.Dialog.dialogMouseUpWrapper_) {
    Blockly.unbindEvent_(Blockly.Dialog.dialogMouseUpWrapper_);
    Blockly.Dialog.dialogMouseUpWrapper_ = null;
  }
  if (Blockly.Dialog.dialogMouseMoveWrapper_) {
    Blockly.unbindEvent_(Blockly.Dialog.dialogMouseMoveWrapper_);
    Blockly.Dialog.dialogMouseMoveWrapper_ = null;
  }
};

/**
 * Hide the dialog pop-up.
 * @param {boolean} opt_animate Animate the dialog closing.  Defaults to true.
 *     Requires that origin was not null when dialog was opened.
 */
Blockly.Dialog.hideDialog = function(opt_animate) {
  if (!Blockly.Dialog.isDialogVisible_) {
    return;
  }
  Blockly.Dialog.dialogUnbindDragEvents_();
  if (Blockly.Dialog.dialogMouseDownWrapper_) {
    Blockly.unbindEvent_(Blockly.Dialog.dialogMouseDownWrapper_);
    Blockly.Dialog.dialogMouseDownWrapper_ = null;
  }

  Blockly.Dialog.isDialogVisible_ = false;
  Blockly.Dialog.dialogDispose_ && Blockly.Dialog.dialogDispose_();
  Blockly.Dialog.dialogDispose_ = null;
  var origin = (opt_animate === false) ? null : Blockly.Dialog.dialogOrigin_;
  var dialog = document.getElementById('dialog');
  var shadow = document.getElementById('dialogShadow');
  var border = document.getElementById('dialogBorder');

  shadow.style.opacity = 0;

  function endResult() {
    shadow.style.visibility = 'hidden';
    border.style.visibility = 'hidden';
  }
  if (origin) {
    Blockly.Dialog.matchBorder_(dialog, false, 0.8);
    Blockly.Dialog.matchBorder_(origin, true, 0.2);
    // In 175ms hide both the shadow and the animated border.
    window.setTimeout(endResult, 175);
  } else {
    // No animation.  Just set the final state.
    endResult();
  }
  dialog.style.visibility = 'hidden';
  dialog.style.zIndex = -1;
  var header = document.getElementById('dialogHeader');
  if (header) {
    header.parentNode.removeChild(header);
  }
  while (dialog.firstChild) {
    var content = dialog.firstChild;
    content.className += ' dialogHiddenContent';
    document.body.appendChild(content);
  }
};

/**
 * Match the animated border to the a element's size and location.
 * @param {!Element} element Element to match.
 * @param {boolean} animate Animate to the new location.
 * @param {number} opacity Opacity of border.
 * @private
 */
Blockly.Dialog.matchBorder_ = function(element, animate, opacity) {
  if (!element) {
    return;
  }
  var border = document.getElementById('dialogBorder');
  var bBox = Blockly.Dialog.getBBox_(element);
  function change() {
    border.style.width = bBox.width + 'px';
    border.style.height = bBox.height + 'px';
    border.style.left = bBox.x + 'px';
    border.style.top = bBox.y + 'px';
    border.style.opacity = opacity;
  }
  if (animate) {
    border.className = 'dialogAnimate';
    window.setTimeout(change, 1);
  } else {
    border.className = '';
    change();
  }
  border.style.visibility = 'visible';
};

/**
 * Compute the absolute coordinates and dimensions of an HTML or SVG element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Blockly.Dialog.getBBox_ = function(element) {
  if (element.getBBox) {
    // SVG element.
    var bBox = element.getBBox();
    var height = bBox.height;
    var width = bBox.width;
    var xy = Blockly.getAbsoluteXY_(element);
    var x = xy.x;
    var y = xy.y;
  } else {
    // HTML element.
    var height = element.offsetHeight;
    var width = element.offsetWidth;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
  }
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
};

/**
 * If the user preses enter, escape, or space, hide the dialog.
 * @param {!Event} e Keyboard event.
 * @private
 */
Blockly.Dialog.dialogKeyDown_ = function(e) {
  if (Blockly.Dialog.isDialogVisible_) {
    if (e.keyCode == 13 ||
        e.keyCode == 27 ||
        e.keyCode == 32) {
      Blockly.Dialog.hideDialog(true);
      e.stopPropagation();
      e.preventDefault();
    }
  }
};

/**
 * Start listening for Blockly.Dialog.dialogKeyDown_.
 */
Blockly.Dialog.startDialogKeyDown = function() {
  document.body.addEventListener('keydown',
      Blockly.Dialog.dialogKeyDown_, true);
};

/**
 * Stop listening for Blockly.Dialog.dialogKeyDown_.
 */
Blockly.Dialog.stopDialogKeyDown = function() {
  document.body.removeEventListener('keydown',
      Blockly.Dialog.dialogKeyDown_, true);
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Blockly.Dialog.bindClick = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};