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