/*
	This file handles saved data.
*/

function Data() {
	this.setValue = function(k, v) {
		localStorage.setItem(k, v);
	}
	
	this.getValue = function(k, nb = false) { // nb = return a number, not a string
		
		var v = localStorage.getItem(k);
		
		if (v === null)
			v = 0;
		
		if (nb)
			v = parseInt(v, 10);
		
		return v;
	}
	
	this.clear = function() {
		localStorage.clear();
	}
	
	// OTHER SPECIFIC FUNCTIONS
	
	/* LAST SCORE */
		this.setLastScore = function(x) {
			this.setValue("last-score", x);
		}
		
		this.getLastScore = function() {
			return this.getValue("last-score", true);
		}
	
	/* BEST SCORE */
		this.setBestScore = function(x) {
			this.setValue("best-score", x);
		}

		this.getBestScore = function() {
			return this.getValue("best-score", true);
		}
		
	/* WORST SCORE */
		this.setWorstScore = function(x) {
			this.setValue("worst-score", x);
		}

		this.getWorstScore = function() {
			return this.getValue("worst-score", true);
		}
	
	/* COINS */
		this.addCoins = function(x) {
			this.setValue("coins", (this.getValue("coins", true) + x));
		}

		this.removeCoins = function(x) {
			this.setValue("coins", (this.getValue("coins", true) - x));

			if (this.getValue("coins", true) < 0)
				this.setValue("coins", 0);
		}

		this.getCoins = function() {
			return this.getValue("coins", true);
		}
		
		this.setCoins = function(x) {
			x = parseInt(x, 10);
			
			if (!isNaN(x))
				this.setValue("coins", x);
		}
		
	/* GEMS */
		this.addGems = function(x) {
			this.setValue("gems", (this.getValue("gems", true) + x));
		}

		this.removeGems = function(x) {
			this.setValue("gems", (this.getValue("gems", true) - x));

			if (this.getValue("gems", true) < 0)
				this.setValue("gems", 0);
		}

		this.getGems = function() {
			return this.getValue("gems", true);
		}
		
		this.setGems = function(x) {
			x = parseInt(x, 10);
			
			if (!isNaN(x))
				this.setValue("gems", x);
		}
		
	/* LUCKY BOXES */
		this.addLuckyBoxes = function(x) {
			this.setValue("luckyboxes", (this.getValue("luckyboxes", true) + x));
		}

		this.removeLuckyBoxes = function(x) {
			this.setValue("luckyboxes", (this.getValue("luckyboxes", true) - x));

			if (this.getValue("luckyboxes", true) < 0)
				this.setValue("luckyboxes", 0);
		}

		this.getLuckyBoxes = function() {
			return this.getValue("luckyboxes", true);
		}
		
	/* LUCKY GOLDS */
		this.addLuckyGolds = function(x) {
			this.setValue("luckygolds", (this.getValue("luckygolds", true) + x));
		}

		this.removeLuckyGolds = function(x) {
			this.setValue("luckygolds", (this.getValue("luckygolds", true) - x));

			if (this.getValue("luckygolds", true) < 0)
				this.setValue("luckygolds", 0);
		}

		this.getLuckyGolds = function() {
			return this.getValue("luckygolds", true);
		}
		
	/* CHARACTER SELECTION */
		
		this.selectCharacter = function(c) {
			this.setValue("current-character", c);
		}
		
		this.getSelectedCharacter = function() {
			return this.getValue("current-character");
		}
		
	/* SPECIAL CHARACTERS */
		
	// Any
		this.getCharacter = function(c) {
			return this.getValue("gerard-" + c) == "true" ? true : false;
		}
		
	// Rambo
		this.unlockGerardRambo = function() {
			this.setValue("gerard-rambo", "true");
		}
		
		this.getGerardRambo = function() {
			return this.getValue("gerard-rambo") == "true" ? true : false;
		}
		
	// Aloha
		this.unlockGerardAloha = function() {
			this.setValue("gerard-aloha", "true");
		}
		
		this.getGerardAloha = function() {
			return this.getValue("gerard-aloha") == "true" ? true : false;
		}
		
	// Obelix
		this.unlockGerardObelix = function() {
			this.setValue("gerard-obelix", "true");
		}
		
		this.getGerardObelix = function() {
			return this.getValue("gerard-obelix") == "true" ? true : false;
		}
		
		this.addFoodPlusEaten = function() {
			var fpe = this.getValue("foodplus-eaten", true);
			fpe++;
			
			this.setValue("foodplus-eaten", fpe);
			
			if (fpe >= 3000) {
				this.unlockGerardObelix();
			}
		}
		
	/* SETTINGS */
		
	// Clouds
		this.setUseClouds = function(b) {
			
			var bool = b == true ? "true" : "false";
			this.setValue("use-clouds", bool);
		}
		
		this.getUseClouds = function() {
			return this.getValue("use-clouds") == "true" ? true : false;
		}
		
	// Test Type
		
		this.setTestType = function(t) {
			this.setValue("test-type", t);
		}
	
		this.getTestType = function() {
			return this.getValue("test-type");
		}

	// First Open

		this.checkFirstOpen = function() {
			var firstOpen = localStorage.getItem("first-open");

			if (firstOpen != "false") {
				this.setValue("first-open", "false");

				this.setUseClouds(true);
				this.addGems(5);
				this.addCoins(20);
			}
		}
		
	// Daily Reward
		
		this.getDailyReward = function() {
			var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
			
			var d = days[new Date().getDay()];
			
			if (this.getValue("daily-reward") != d) {
				this.setValue("daily-reward", d);
				
				return true;
			}
			
			return false;
		}
		
		this.getDailyRewardPuzzle = function(p) { // true = already has it
			return this.getValue("puzzle-piece-" + p) == "true" ? true : false;
		}
		
		this.setGotDailyRewardPuzzle = function(p) {
			this.setValue("puzzle-piece-" + p, "true");
		}
}

var DATA = new Data();
