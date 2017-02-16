/*
	This file handles the little Gerards.
*/

function Character(node, character) { // character = string
	this.m_node = node;
		this.m_node.style.backgroundSize = "auto 85px";
		this.m_node.style.backgroundPosition = "0px 0px";
	
			this.getNode = function() {
				return this.m_node;
			}
	
	this.m_character = character;
	
			this.getCharacter = function() {
				return this.m_character;
			}
	
			if (!DATA.getCharacter(this.m_character) && this.m_character != "normal")
				this.m_node.style.backgroundImage = "url('img/menu/locked.png')";
	
			else
				this.m_node.style.backgroundImage = "url('img/menu/" + this.m_character + ".png')";
	
	this.select = function() {
		this.m_node.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
		this.m_node.style.borderRadius = "50%";
	}
	
	this.deselect = function() {
		this.m_node.style.backgroundColor = "rgba(0, 0, 0, 0)";
	}
	
	var _this = this;
	
	this.blink = function() {
		this.m_node.style.backgroundPosition = "-85px 0px";
		
			var blinkingDuration =			Math.floor((Math.random() * 100) + 40);		// Between 40 and 100ms
			var blinkingIntervalDuration =	Math.floor((Math.random() * 5000) + 1500);	// Between 1,5 and 5s
		
		setTimeout(function() {
			_this.m_node.style.backgroundPosition = "0px 0px";
			
			setTimeout(function() { _this.blink(); }, blinkingIntervalDuration);
		}, blinkingDuration);
	}
	
	setTimeout(function() { _this.blink(); }, Math.floor((Math.random() * 5000) + 1500));
}