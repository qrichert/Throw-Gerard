/*
	This file handles the daily reward
	and the puzzle which leads to the win of a character.
*/

var DailyRewards = {
	GEM_1: 0,
	GEM_5: 1,
	COIN_10: 2,
	COIN_50: 3,
	PUZZLE_1: 10,
	PUZZLE_2: 11,
	PUZZLE_3: 13,
	PUZZLE_4: 14,
	PUZZLE_5: 15,
	PUZZLE_6: 16,
	PUZZLE_7: 17
}

var DailyRewardsFrequency = {
	GEM_1:		{ FREQUENCY: 75,	TYPE: DailyRewards.GEM_1 },
	GEM_5:		{ FREQUENCY: 50,	TYPE: DailyRewards.GEM_5 },
	COIN_10:	{ FREQUENCY: 100,	TYPE: DailyRewards.COIN_10 },
	COIN_50:	{ FREQUENCY: 150,	TYPE: DailyRewards.COIN_50 },
	PUZZLE_1:	{ FREQUENCY: 5,		TYPE: DailyRewards.PUZZLE_1 },
	PUZZLE_2:	{ FREQUENCY: 5,		TYPE: DailyRewards.PUZZLE_2 },
	PUZZLE_3:	{ FREQUENCY: 5,		TYPE: DailyRewards.PUZZLE_3 },
	PUZZLE_4:	{ FREQUENCY: 5,		TYPE: DailyRewards.PUZZLE_4 },
	PUZZLE_5:	{ FREQUENCY: 5,		TYPE: DailyRewards.PUZZLE_5 },
	PUZZLE_6:	{ FREQUENCY: 5,		TYPE: DailyRewards.PUZZLE_6 },
	PUZZLE_7:	{ FREQUENCY: 5,		TYPE: DailyRewards.PUZZLE_7 }
}

var total = 0;


for (var elem in DailyRewardsFrequency) {
	
	if (!DailyRewardsFrequency.hasOwnProperty(elem))
		continue;
	
	total += DailyRewardsFrequency[elem].FREQUENCY;
}

for (var elem in DailyRewardsFrequency) {
	
	if (!DailyRewardsFrequency.hasOwnProperty(elem))
		continue;
	
	DailyRewardsFrequency[elem].FREQUENCY = (DailyRewardsFrequency[elem].FREQUENCY / total) * 100;
}

function getRandomRewardType() {
	
	var x = Math.floor(Math.random() * 100 + 0);
	
	for (var elem in DailyRewardsFrequency) {
	
		if (!DailyRewardsFrequency.hasOwnProperty(elem))
			continue;

		x -= DailyRewardsFrequency[elem].FREQUENCY;
		
		if (x <= 0)
			return DailyRewardsFrequency[elem].TYPE;
	}
}

function DailyReward() {
	this.m_screen = document.querySelector("#daily-reward");
		this.m_screen.style.display = "block";
	
	var _this = this;
	
	this.m_screen.addEventListener("click", function() {
		_this.m_screen.style.display = "none";
	}, false);
	
	this.chooseDailyReward = function() {
		
		var reward = null;
		
		while (reward == null) {
			reward = getRandomRewardType();
			
			if ((reward == DailyRewards.PUZZLE_1 && DATA.getDailyRewardPuzzle("1"))
				|| (reward == DailyRewards.PUZZLE_2 && DATA.getDailyRewardPuzzle("2"))
				|| (reward == DailyRewards.PUZZLE_3 && DATA.getDailyRewardPuzzle("3"))
				|| (reward == DailyRewards.PUZZLE_4 && DATA.getDailyRewardPuzzle("4"))
				|| (reward == DailyRewards.PUZZLE_5 && DATA.getDailyRewardPuzzle("5"))
				|| (reward == DailyRewards.PUZZLE_6 && DATA.getDailyRewardPuzzle("6"))
				|| (reward == DailyRewards.PUZZLE_7 && DATA.getDailyRewardPuzzle("7")))
			{
				reward = null;
			}
			
			else {
				return reward;
			}
		}
	}
	
	this.setUpView = function() {
		
		var r = this.chooseDailyReward();
		
		if (r == DailyRewards.GEM_1) {
			DATA.addGems(1);
			alert("gem 1");
		}
			
		else if (r == DailyRewards.GEM_5) {
			DATA.addGems(5);
			alert("gem 5");
		}
			
		else if (r == DailyRewards.COIN_10) {
			DATA.addCoins(10);
			alert("coin 10");
		}
			
		else if (r == DailyRewards.COIN_50) {
			DATA.addCoins(50);
			alert("coin 50");
		}
			
		else if (r == DailyRewards.PUZZLE_1) {
			DATA.setGotDailyRewardPuzzle("1");
			alert("puzzle 1");
		}
			
		else if (r == DailyRewards.PUZZLE_2) {
			DATA.setGotDailyRewardPuzzle("2");
			alert("puzzle 2");
		}
			
		else if (r == DailyRewards.PUZZLE_3) {
			DATA.setGotDailyRewardPuzzle("3");
			alert("puzzle 3");
		}
			
		else if (r == DailyRewards.PUZZLE_4) {
			DATA.setGotDailyRewardPuzzle("4");
			alert("puzzle 4");
		}
			
		else if (r == DailyRewards.PUZZLE_5) {
			DATA.setGotDailyRewardPuzzle("5");
			alert("puzzle 5");
		}
			
		else if (r == DailyRewards.PUZZLE_6) {
			DATA.setGotDailyRewardPuzzle("6");
			alert("puzzle 6");
		}
			
		else if (r == DailyRewards.PUZZLE_7) {
			DATA.setGotDailyRewardPuzzle("7");
			alert("puzzle 7");
		}
	}
}

if (!DATA.getDailyReward()) {
	DAILY_REWARD = new DailyReward();
		DAILY_REWARD.setUpView();
}