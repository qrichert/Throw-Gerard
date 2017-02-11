/*
	This file handles all the sound effects.
*/

function Sound() {
	
	this.playBomb = function() {
		new Audio('audio/game/bomb.mp3').play();
		
		VIBRATION.vibrate();
	}
	
	this.playElectricity = function() {
		new Audio('audio/game/electricity.mp3').play();
		
		VIBRATION.vibrate();
	}
	
	this.playEndOfGame = function() {
		new Audio('audio/game/endofgame.mp3').play();
	}
	
	this.playFallingToDeath = function() {
		new Audio('audio/game/fallingtodeath.mp3').play();
	}
	
	this.playGem = function() {
		new Audio('audio/game/gem.mp3').play();
	}
	
	this.m_getItemCounter = 1;
	
	this.playGetItem = function() {
		new Audio('audio/game/getitem_' + this.m_getItemCounter + '.mp3').play();
		
		this.m_getItemCounter++;
		
		if (this.m_getItemCounter > 4)
			this.m_getItemCounter = 1;
	}
	
	this.playGhost = function() {
		new Audio('audio/game/ghost.mp3').play();
		
		VIBRATION.vibrate();
	}
	
	this.playHeart = function() {
		new Audio('audio/game/heart.mp3').play();
	}
	
	this.playLuckyGold = function() {
		new Audio('audio/game/luckygold.mp3').play();
	}
	
	this.playUfo = function() {
		new Audio('audio/game/ufo.mp3').play();
		
		VIBRATION.vibrate();
	}
}

var SOUND = new Sound();
