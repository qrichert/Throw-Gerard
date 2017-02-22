/*
	This file handles phone's vibrations.
*/

function Vibration() {
	this.vibrate = function(time = 700) {
		
		if ("vibrate" in navigator)
			navigator.vibrate(time);
		
		else if ("vibrate" in navigator.notification)
			navigator.notification.vibrate(time);
	}
	
	this.cancel = function() {
		this.vibrate(0);
	}
}

var VIBRATION = new Vibration();