

var EasyJ = {};
EasyJ.projectPackage = "org.usfirst.frcEasyJ.team5122";
EasyJ.robotClass = "MyRobot";


EasyJ.localStorage = {};

EasyJ.localStorage.addSave = function (name, blocks, overwrite) {
	if (typeof overwrite === "undefined") {
		overwrite = false;
	}
	if (typeof localStorage['easyj_saves'] === "undefined") {
		var first = {};
		first[name] = blocks;
		localStorage['easyj_saves'] = JSON.stringify(first);
	} else {
		var saves = JSON.parse(localStorage['easyj_saves']);
		if (typeof saves[name] === "undefined" || overwrite) {
			saves[name] = blocks;
			localStorage['easyj_saves'] = JSON.stringify(saves);
			return true;
		} else {
			// Throw Error! The name is already used! & we are not overwriting it
			return false;
		}
	}
};
EasyJ.localStorage.listSaves = function () {
	if (typeof localStorage['easyj_saves'] === "undefined") {
		return [];
	} else {
		var saves = JSON.parse(localStorage['easyj_saves']);
		return Object.keys(JSON.parse(localStorage['easyj_saves']));
	}
};

EasyJ.localStorage.open = function (name) {
	if (typeof localStorage['easyj_saves'] === "undefined") {
		alert("No saves in storage!"); //@todo fixme
		return;
	}
	var saves = JSON.parse(localStorage['easyj_saves']);
	if (typeof saves[name] === "undefined")
	{
		alert("A save by the name of '"+name+"' does not exit!"); //@todo fixme
	}
	return loadxml(saves[name]);
};


