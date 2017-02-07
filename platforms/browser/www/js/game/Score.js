/*
	This file handles the score and lives
*/

function Score() {
	this.m_score = document.querySelector("#score");
	
	this.m_currentScore = 0;
	
		this.getCurrentScore = function() {
			return this.m_currentScore;
		}
		
		this.updateCurrentScore = function () { // Updates view only
			this.m_score.innerHTML = this.m_currentScore;
		}
		
			this.updateCurrentScore();
		
	this.addToScore = function(x) { // Called from oustide
		this.m_currentScore += x;
		
		this.updateCurrentScore();
		
		// if (this.m_currentScore >= 1000)
		// setScoreOver1000(true);
		
		return this.m_currentScore;
	}
	
	this.takeFromScore = function(x) {
		this.m_currentScore -= x;
		
		this.updateCurrentScore();
		
		return this.m_currentScore;
	}
	
	this.invertScore = function() {
		var absScore = Math.abs(this.m_currentScore);
		
		if (this.m_currentScore > 0)
			this.m_currentScore = -absScore;
		
		else if (this.m_currentScore < 0)
			this.m_currentScore = absScore;
			
		this.updateCurrentScore();
	}
}

var SCORE = new Score();

function Lives(fourLives = false) {
	this.m_lives = document.querySelector("#lives");
	
	if (fourLives == true)
		this.m_currentLives = 4;
	
	else
		this.m_currentLives = 3;
	
		this.getCurrentLives = function() {
			return this.m_currentLives;
		}
		
		this.updateCurrentLives = function() {
			switch (this.m_currentLives) {
					case 0: this.m_lives.innerHTML = '';																												break;
					case 1: this.m_lives.innerHTML = '<span class="heart"></span>';																						break;
					case 2: this.m_lives.innerHTML = '<span class="heart"></span><span class="heart"></span>';															break;
					case 3: this.m_lives.innerHTML = '<span class="heart"></span><span class="heart"></span><span class="heart"></span>';								break;
					case 4: this.m_lives.innerHTML = '<span class="heart"></span><span class="heart"></span><span class="heart"></span><span class="heart"></span>';	break; // Rambo
			}
		}
		
			this.updateCurrentLives();
		
		this.takeLife = function() {
			if (this.m_currentLives != 0) {
				
				this.m_currentLives--;
				this.updateCurrentLives();

				if (this.m_currentLives > 0)
					return true;

				else
					return false;
			}
			
			else {
				return false;
			}
		}
		
		this.addLife = function() {
			if (this.m_currentLives < 3) {
				this.m_currentLives++;
				
				this.updateCurrentLives();
			}
		}
}

if (CHARACTER == Characters.RAMBO)
	var LIVES = new Lives(true);

else
	var LIVES = new Lives();
