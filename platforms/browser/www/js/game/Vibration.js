/*
	This file handles phone's vibrations.
*/

function Vibration() {
	this.vibrate = function(time = 700) {
		
		return; // cause doesn't seem to work...

		if (IS_REAL_DEVICE) {
			navigator.vibrate(time);
		}
		
	}
	
	this.cancel = function() {
		
		if (IS_REAL_DEVICE) {
			navigator.vibrate(0);
		}
		
	}
}

var VIBRATION = new Vibration();