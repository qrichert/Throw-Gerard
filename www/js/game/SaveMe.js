/*
	This file is for the Save Me dialog
*/

function SaveMe() {
	this.m_node = document.querySelector("#save-me");
	this.m_progress = document.querySelector("#save-me #progress");
	this.m_container = document.querySelector("#save-me-container");
	
	this.m_gemsNeeded = 1;
	this.m_gerardRef = null;
	this.m_continueTimer = false;
	this.m_timeoutDelay = 2500;
	
	this.timer = function(t) {
		
		if ((Date.now() - t) >= this.m_timeoutDelay) {
			this.decline();
			return;
		}
		
		var progressWidth = 100 - (((Date.now() - t) / this.m_timeoutDelay) * 100);
		
			if (progressWidth < 3)
				this.m_progress.style.display = "none";
		
		this.m_progress.style.width = progressWidth + "%";
		
		var _this = this;
		
		if (this.m_continueTimer)
			requestAnimationFrame(function() { _this.timer(t); });
	}
	
	this.accept = function() {
		this.m_continueTimer = false;
		
		DATA.removeGems(this.m_gemsNeeded);
		this.m_gemsNeeded *= 2;
		
		LIVES.addLife();
		SOUND.playHeart();
		
		if (this.m_gerardRef != null) {
			this.m_gerardRef.setGiveNewLife();
			this.m_gerardRef.putGerardBackOnCable();
		}
		
		this.m_container.style.display = "none";
		this.m_progress.style.width = "100%";
	}
	
	this.decline = function() {
		DATA.setLastScore(SCORE.getCurrentScore());
		location.href = "score.html";
	}
	
	this.ask = function(gRef) {
		
		if ((DATA.getGems() - this.m_gemsNeeded) < 0) // Not enough gems !!! Not <= cause if has 1 gem can spend 1 gem
			this.decline();
		
		this.m_gerardRef = gRef;
		
		document.querySelector("#save-me #nb-of-gems").innerHTML = this.m_gemsNeeded;
		
		this.m_progress.style.display = "block";
		
		this.m_container.style.display = "block";
			this.m_node.style.left = (SCREEN_WIDTH / 2) - (this.m_node.offsetWidth / 2) + "px";
			this.m_node.style.top = (SCREEN_HEIGHT / 2) - (this.m_node.offsetHeight / 2) - 50 + "px";
		
		this.m_continueTimer = true;
		this.timer(Date.now());
	}
}

var SAVE_ME = new SaveMe();

if (!IS_TOUCHABLE) {
	document.querySelector("#save-me").addEventListener("click", function() { SAVE_ME.accept(); }, false);
}

document.querySelector("#save-me").addEventListener("touchend", function() { SAVE_ME.accept(); }, false);
