/*
	This file handles lucky boxes opening.
*/

var RewardType = {
	LUCKY_BOX: 1,
	LUCKY_GOLD: 2
}

function rotateLeft(node) {
	$({ deg: 10 }).animate({ deg: -10 }, {
		duration: 500,
		easing: "linear",
		step: function (now) {
			node.style.transform = "rotate(" + now + "deg)";
		},
					
		complete: function() {
			rotateRight(node);
		}
	});
}
		
function rotateRight(node) {
	$({ deg: -10 }).animate({ deg: 10 }, {
		duration: 500,
		easing: "linear",
		step: function (now) {
			node.style.transform = "rotate(" + now + "deg)";
		},
					
		complete: function() {
			rotateLeft(node);
		}
	});
}

rotateRight(LUCKY_BOX);
rotateRight(LUCKY_GOLD);

function showBox(box) {
	box.style.opacity = "0";
	box.style.visibility = "visible";
	
	$(box).animate({ opacity: 1 }, {
		duration: 100,
		easing: "linear"
	});
}

function getReward(t) {
	REWARDS.style.visibility = "visible";
	REWARDS.style.backgroundColor = "rgba(0, 0, 0, 0.06)";
	REWARD.style.visibility = "visible";
	
	if (t == RewardType.LUCKY_BOX)
	{
		var r = getRandomLuckyBoxReward()
		
		switch (r) {
			case LuckyBoxesRewards.COINS_5:
				REWARD.style.backgroundImage = "url('img/luckyboxes/rewards/coin-R.png')";
				AMOUNT.changeValue(5);
				DATA.addCoins(5);
			break;
				
			case LuckyBoxesRewards.COINS_10:
				REWARD.style.backgroundImage = "url('img/luckyboxes/rewards/coin-R.png')";
				AMOUNT.changeValue(10);
				DATA.addCoins(10);
			break;
				
			case LuckyBoxesRewards.COINS_20:
				REWARD.style.backgroundImage = "url('img/luckyboxes/rewards/coin-R.png')";
				AMOUNT.changeValue(20);
				DATA.addCoins(20);
			break;
				
			case LuckyBoxesRewards.GEM_1:
				REWARD.style.backgroundImage = "url('img/luckyboxes/rewards/gem-R.png')";
				AMOUNT.changeValue(1);
				DATA.addGems(1);
			break;
				
			case LuckyBoxesRewards.LUCKY_GOLD:
				REWARD.style.backgroundImage = "url('img/luckyboxes/rewards/luckygold-R.png')";
				AMOUNT.changeValue("");
				DATA.addLuckyGolds(1);
			break;
		}
	}
		
	else if (t == RewardType.LUCKY_GOLD)
	{
		var r = getRandomLuckyGoldReward();
		
		if (r == LuckyGoldsRewards.GERARD_ALOHA && DATA.getGerardAloha()) {
			do {
				r = getRandomLuckyGoldReward();
			} while (r == LuckyGoldsRewards.GERARD_ALOHA)
		} // Not to get it twice !!!
		
		switch (r) {
			case LuckyGoldsRewards.COINS_20:
				REWARD.style.backgroundImage = "url('img/luckyboxes/rewards/coin-R.png')";
				AMOUNT.changeValue(20);
				DATA.addCoins(20);
			break;
				
			case LuckyGoldsRewards.GEM_1:
				REWARD.style.backgroundImage = "url('img/luckyboxes/rewards/gem-R.png')";
				AMOUNT.changeValue(1);
				DATA.addGems(1);
			break;
				
			case LuckyGoldsRewards.GEM_5:
				REWARD.style.backgroundImage = "url('img/luckyboxes/rewards/gem-R.png')";
				AMOUNT.changeValue(5);
				DATA.addGems(5);
			break;
				
			case LuckyGoldsRewards.GEM_10:
				REWARD.style.backgroundImage = "url('img/luckyboxes/rewards/gem-R.png')";
				AMOUNT.changeValue(10);
				DATA.addGems(10);
			break;
				
			case LuckyGoldsRewards.GERARD_ALOHA:
				REWARD.style.backgroundImage = "url('img/luckyboxes/rewards/gerard-aloha-R.png')";
				AMOUNT.changeValue("");
				DATA.unlockGerardAloha();
			break;
		}
	}
}

function hideReward() {
	REWARDS.style.visibility = "hidden";
	REWARDS.style.backgroundColor = "rgba(0, 0, 0, 0)";
	
	REWARD.style.visibility = "hidden";
	
	if (DATA.getLuckyBoxes() > 0) {
		showBox(LUCKY_BOX);
	}
			
	else if (DATA.getLuckyGolds() > 0) {
		showBox(LUCKY_GOLD);
	}
		
	else {
		location.href = "index.html";
	}

	document.querySelector("#lb").innerHTML = DATA.getLuckyBoxes();
	document.querySelector("#lg").innerHTML = DATA.getLuckyGolds();
}

REWARD.addEventListener("click", function() { hideReward(); }, false);

function clickLuckyGold() {
	
	DATA.removeLuckyGolds(1);
	
	$(LUCKY_GOLD).animate({ opacity: 0 }, {
		duration: 200,
		easing: "linear"
	});
	
	getReward(RewardType.LUCKY_GOLD);
}

LUCKY_GOLD.addEventListener("click", function() { clickLuckyGold(); }, false);

function clickLuckyBox() {
	
	DATA.removeLuckyBoxes(1);
	
	$(LUCKY_BOX).animate({ opacity: 0 }, {
		duration: 200,
		easing: "linear"
	});
	
	getReward(RewardType.LUCKY_BOX);
}

LUCKY_BOX.addEventListener("click", function() { clickLuckyBox(); }, false);

if (DATA.getLuckyBoxes() > 0) {
	showBox(LUCKY_BOX);
}
			
else if (DATA.getLuckyGolds() > 0) {
	showBox(LUCKY_GOLD);
}
			
else {
	location.href = "index.html";
}
