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
	
	/* BEST SCORE */
		this.setBestScore = function(x) {
			this.setValue("bestscore", x);
		}

		this.getBestScore = function() {
			return this.getValue("bestscore", true);
		}
		
	/* WORST SCORE */
		this.setWorstScore = function(x) {
			this.setValue("worstscore", x);
		}

		this.getWorstScore = function() {
			return this.getValue("worstscore", true);
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
		
	/* CHARACTERS */
		
		this.unlockGerardAloha = function() {
			this.setValue("gerard-aloha", "true");
		}
		
		this.getGerardAloha = function() {
			return this.getValue("gerard-aloha") == "true" ? true : false;
		}
}

var DATA = new Data();
//DATA.clear();
