/*
	This file handles the coins, gems, lucky boxes and lucky golds
*/

function Coins() {
	this.m_node = document.querySelector("#coins");
		this.m_node.innerHTML = '<span class="coin"></span><span>0</span>';
	
		this.updateCoinsPos = function() {
			this.m_node.style.left = ((SCREEN_WIDTH / 2) - (parseInt(this.m_node.style.width, 10) / 2)) + "px";
			this.m_node.style.left = (SCREEN_WIDTH / 2) + "px";
		}
		
	this.m_coins = 0;
	
		this.getCoins = function() {
			return this.m_coins;
		}

		this.addCoin = function() {
			this.m_coins++;
			this.m_node.innerHTML = '<span class="coin"></span><span>' + this.m_coins + '</span>';
			this.updateCoinsPos();
			DATA.addCoins(1);
		}
}

var COINS = new Coins();
	COINS.updateCoinsPos();

function Gems() {
	this.m_gems = 0;
	
		this.getGems = function() {
			return this.m_gems;
		}

		this.addGem = function() {
			this.m_gems++;
			DATA.addGems(1);
		}
}

var GEMS = new Gems();

function LuckyBoxes() {
	this.m_luckyBoxes = 0;
	
		this.getLuckyBoxes = function() {
			return this.m_luckyBoxes;
		}

		this.addLuckyBox = function() {
			this.m_luckyBoxes++;
			DATA.addLuckyBoxes(1);
		}
}

var LUCKYBOXES = new LuckyBoxes();

function LuckyGolds() {
	this.m_luckyGolds = 0;
	
		this.getLuckyGolds = function() {
			return this.m_luckyGolds;
		}

		this.addLuckyGold = function() {
			this.m_luckyGolds++;
			DATA.addLuckyGolds(1);
		}
}

var LUCKYGOLDS = new LuckyGolds();