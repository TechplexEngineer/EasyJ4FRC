if (typeof EasyJ !== "object") {
	EasyJ = {};
}
EasyJ.Checker = {};

// @todo this.sourceBlock_.setWarningText
EasyJ.Checker.JS_PORT = function(text) {
	var port = parseInt(text);
	if (isNaN(port)) {
		return null;
	}
	if (port < 1 || port > 4) { //4 joystick ports
		return null;
	}
	return port;
};

EasyJ.Checker.JS_BUTTON = function(text) {
	var btn = parseInt(text);
	if (isNaN(btn)) {
		return null;
	}
	if (btn < 1 || btn > 12) { //12 js buttons?
		return null;
	}
	return btn;
};

EasyJ.Checker.ANALOG_PORT = function(text) {
	var btn = parseInt(text);
	if (isNaN(btn)) {
		return null;
	}
	if (btn < 1 || btn > 12) { //12 analog channels?
		return null;
	}
	return btn;
};

EasyJ.Checker.DIGITAL_PORT = function(text) {
	var btn = parseInt(text);
	if (isNaN(btn)) {
		return null;
	}
	if (btn < 1 || btn > 12) { //12 digital channels?
		return null;
	}
	return btn;
};

EasyJ.Checker.PWM_PORT = function(text) {
	var btn = parseInt(text);
	if (isNaN(btn)) {
		return null;
	}
	if (btn < 1 || btn > 12) { //12 PWM Ports?
		return null;
	}
	return btn;
};

EasyJ.Checker.RELAY_PORT = function(text) {
	var btn = parseInt(text);
	if (isNaN(btn)) {
		return null;
	}
	if (btn < 1 || btn > 10) { //10 RELAY Ports?
		return null;
	}
	return btn;
};

EasyJ.Checker.SOLENOID_PORT = function(text) {
	var btn = parseInt(text);
	if (isNaN(btn)) {
		return null;
	}
	if (btn < 1 || btn > 10) { //10 SOLENOID Ports?
		return null;
	}
	return btn;
};

EasyJ.Checker.IS_NUM = function(text) {
	var num = parseInt(text);
	if (isNaN(num)) {
		return null;
	}

	return num;
};

EasyJ.Checker.IS_NUMF = function(text) {
	var num = parseFloat(text);
	if (isNaN(num)) {
		return null;
	}

	return num;
};


EasyJ.Checker.EnsureNotTop_Init = function() {
  if (!this.workspace) {
    // Block has been deleted.
    return;
  }

  if (this.getSurroundParent() != null) {
    this.setWarningText(null);
  } else {
    this.setWarningText("Error: This block must be within the Initialization block.");
  }
};

EasyJ.Checker.PickWarning = function(block, warnings) {
  if (!$.isArray(warnings))
    warnings = [warnings];

  for (var i=0; i<warnings.length; i++) {
    var ret = warnings[i].call(block, block);
    if (ret != null) {
      //block.setWarningText(warnings[i]);
      return ret;
    }
  }
  return null;
};

EasyJ.Checker.EnsureVariablesExist = function(block) {
  var blkvars = Blockly.Java.getTypedVarsFromBlock(block, false);
  for (var i=0; i<blkvars.length; i++) {
    var vartype = blkvars[i].vartype;
    var varsofmatchingtype = Blockly.Variables.allVariablesOfType(vartype);

    //http://stackoverflow.com/a/18867667/429544 -- returns index, or -1 if not found
    if ($.inArray(blkvars[i].name, varsofmatchingtype) == -1 ) {
     return "The variable '"+blkvars[i].name+"' is not declared!";
    }
  }
  return null;
};


EasyJ.Checker.EnsureNotOrphaned = function(block) {
	if (block.getSurroundParent()) {
		return null;
	} else {
		return 'Ensure this block is correctly connected. It is not currently part of your program.';
	}
}
