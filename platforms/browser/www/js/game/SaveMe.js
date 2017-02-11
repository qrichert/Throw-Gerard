/*
	This file is for the Save Me dialog
*/

function SaveMe() {
	this.m_node = document.querySelector("#save-me");
	this.m_progress = document.querySelector("#save-me #progress");
	
	this.m_gemsNeeded = 1;
	
	this.ask = function() {
		
		if ((DATA.getGems() - this.m_gemsNeeded) < 0) // Not enough gems
			return false;
		
		if (confirm("Save me?\nUse " + this.m_gemsNeeded + " of your " + DATA.getGems() + " gems to get saved !")) {
			
			DATA.removeGems(this.m_gemsNeeded);
			
			this.m_gemsNeeded *= 2;
			
			return true;
		}
		
		else {
			return false;
		}
	}
}

var SAVE_ME = new SaveMe();
