/*
	This file handles all the sound effects.
*/

function Sound() {
	
	this.playBomb = function() {
		new Audio('audio/bomb.mp3').play();
	}
	
	this.playElectricity = function() {
		new Audio('audio/electricity.mp3').play();
	}
	
	this.playEndOfGame = function() {
		new Audio('audio/endofgame.mp3').play();
	}
	
	this.playFallingToDeath = function() {
		new Audio('audio/fallingtodeath.mp3').play();
	}
	
	this.playGem = function() {
		new Audio('audio/gem.mp3').play();
	}
	
	this.m_getItemCounter = 1;
	
	this.playGetItem = function() {
		new Audio('audio/getitem_' + this.m_getItemCounter + '.mp3').play();
		
		this.m_getItemCounter++;
		
		if (this.m_getItemCounter > 4)
			this.m_getItemCounter = 1;
	}
	
	this.playGhost = function() {
		new Audio('audio/ghost.mp3').play();
	}
	
	this.playHeart = function() {
		new Audio('audio/heart.mp3').play();
	}
	
	this.playLuckyGold = function() {
		new Audio('audio/luckygold.mp3').play();
	}
	
	this.playUfo = function() {
		new Audio('audio/ufo.mp3').play();
	}
}

var SOUND = new Sound();
