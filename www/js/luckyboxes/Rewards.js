/*
	Handles the different rewards you can get.
*/

// LUCKY BOXES

var LuckyBoxesRewards = {
	COINS_5: 0,
	COINS_10: 1,
	COINS_20: 2,
	
	GEM_1: 3,
	
	LUCKY_GOLD: 4
}

var LuckyBoxesRewardsFrequency = {
	COINS_5:	{ FREQUENCY: 60,	TYPE: LuckyBoxesRewards.COINS_5		},
	COINS_10:	{ FREQUENCY: 40,	TYPE: LuckyBoxesRewards.COINS_10	},
	COINS_20:	{ FREQUENCY: 10,	TYPE: LuckyBoxesRewards.COINS_20	},
	GEM_1:		{ FREQUENCY: 20,	TYPE: LuckyBoxesRewards.GEM_1		},
	LUCKY_GOLD:	{ FREQUENCY: 15,	TYPE: LuckyBoxesRewards.LUCKY_GOLD	}
}

// Converting frequencies to %

var lbTotalFreq = 0;

for (var elem in LuckyBoxesRewardsFrequency) {
	
	if (!LuckyBoxesRewardsFrequency.hasOwnProperty(elem))
		continue;
	
	lbTotalFreq += LuckyBoxesRewardsFrequency[elem].FREQUENCY;
}

for (var elem in LuckyBoxesRewardsFrequency) {
	
	if (!LuckyBoxesRewardsFrequency.hasOwnProperty(elem))
		continue;
	
	LuckyBoxesRewardsFrequency[elem].FREQUENCY = (LuckyBoxesRewardsFrequency[elem].FREQUENCY / lbTotalFreq) * 100;
}

function getRandomLuckyBoxReward() {
	
	var x = Math.floor(Math.random() * 100 + 0);
	
	for (var elem in LuckyBoxesRewardsFrequency) {
	
		if (!LuckyBoxesRewardsFrequency.hasOwnProperty(elem))
			continue;

		x -= LuckyBoxesRewardsFrequency[elem].FREQUENCY;
		
		if (x <= 0)
			return LuckyBoxesRewardsFrequency[elem].TYPE;
	}
}

// LUCKY GOLDS

var LuckyGoldsRewards = {
	COINS_20: 0,
	
	GEM_1: 1,
	GEM_5: 2,
	
	GERARD_ALOHA: 4
}

var LuckyGoldsRewardsFrequency = {
	COINS_20:		{ FREQUENCY: 60,	TYPE: LuckyGoldsRewards.COINS_20		},
	GEM_1:			{ FREQUENCY: 47,	TYPE: LuckyGoldsRewards.GEM_1			},
	GEM_5:			{ FREQUENCY: 37,	TYPE: LuckyGoldsRewards.GEM_5			},
	GERARD_ALOHA:	{ FREQUENCY: 3,		TYPE: LuckyGoldsRewards.GERARD_ALOHA	}
}

// Converting frequencies to %

var lgTotalFreq = 0;

for (var elem in LuckyGoldsRewardsFrequency) {
	
	if (!LuckyGoldsRewardsFrequency.hasOwnProperty(elem))
		continue;
	
	lgTotalFreq += LuckyGoldsRewardsFrequency[elem].FREQUENCY;
}

for (var elem in LuckyGoldsRewardsFrequency) {
	
	if (!LuckyGoldsRewardsFrequency.hasOwnProperty(elem))
		continue;
	
	LuckyGoldsRewardsFrequency[elem].FREQUENCY = (LuckyGoldsRewardsFrequency[elem].FREQUENCY / lgTotalFreq) * 100;
}

function getRandomLuckyGoldReward() {
	
	var x = Math.floor(Math.random() * 100 + 0);
	
	for (var elem in LuckyGoldsRewardsFrequency) {
	
		if (!LuckyGoldsRewardsFrequency.hasOwnProperty(elem))
			continue;

		x -= LuckyGoldsRewardsFrequency[elem].FREQUENCY;
		
		if (x <= 0)
			return LuckyGoldsRewardsFrequency[elem].TYPE;
	}
}
