var divScore = document.querySelector("#score");
				divScore.innerHTML = DATA.getLastScore();
				divScore.style.left = ((SCREEN_WIDTH / 2) - (divScore.offsetWidth / 2)) + "px";
				divScore.style.top = ((SCREEN_HEIGHT / 2) - (divScore.offsetHeight / 2)) + "px";
			
			var divNewBestScore = document.querySelector("#new-best-score");
			var divNewWorstScore = document.querySelector("#new-worst-score");
			
			var divRewardLB = document.querySelector("#reward-LB");
			var divRewardRambo = document.querySelector("#reward-Rambo");
			
			if (DATA.getLastScore() > DATA.getBestScore() // New best score
			   && DATA.getLastScore() > 2000
			   && !DATA.getGerardRambo()) {
				
				DATA.setBestScore(DATA.getLastScore());
				
				DATA.unlockGerardRambo();
				
				divNewBestScore.style.display = "block";
				divNewBestScore.style.left = ((SCREEN_WIDTH / 2) - (divNewBestScore.offsetWidth / 2)) + "px";
				divNewBestScore.style.bottom = (SCREEN_HEIGHT / 2) + "px";
				
				divRewardRambo.style.display = "block";
				divRewardRambo.style.left = ((SCREEN_WIDTH / 2) - (divRewardRambo.offsetWidth / 2)) + "px";
				divRewardRambo.style.top = (SCREEN_HEIGHT / 2) + "px";
				
				divScore.style.top = (((SCREEN_HEIGHT / 2) - divNewBestScore.offsetHeight) / 2) - (divScore.offsetHeight / 2) + "px";
			}
			
			else if (DATA.getLastScore() > DATA.getBestScore()) {
				DATA.setBestScore(DATA.getLastScore());
				DATA.addLuckyBoxes(1);
							
				divNewBestScore.style.display = "block";
				divNewBestScore.style.left = ((SCREEN_WIDTH / 2) - (divNewBestScore.offsetWidth / 2)) + "px";
				divNewBestScore.style.bottom = (SCREEN_HEIGHT / 2) + "px";
				
				divRewardLB.style.display = "block";
				divRewardLB.style.left = ((SCREEN_WIDTH / 2) - (divRewardLB.offsetWidth / 2)) + "px";
				divRewardLB.style.top = (SCREEN_HEIGHT / 2) + "px";
				
				divScore.style.top = (((SCREEN_HEIGHT / 2) - divNewBestScore.offsetHeight) / 2) - (divScore.offsetHeight / 2) + "px";
			}
						
			else if (DATA.getLastScore() < DATA.getWorstScore()) {
				DATA.setWorstScore(DATA.getLastScore());
				DATA.addLuckyBoxes(1);
							
				divNewWorstScore.style.display = "block";
				divNewWorstScore.style.left = ((SCREEN_WIDTH / 2) - (divNewWorstScore.offsetWidth / 2)) + "px";
				divNewWorstScore.style.bottom = (SCREEN_HEIGHT / 2) + "px";
				
				divRewardLB.style.display = "block";
				divRewardLB.style.left = ((SCREEN_WIDTH / 2) - (divRewardLB.offsetWidth / 2)) + "px";
				divRewardLB.style.top = (SCREEN_HEIGHT / 2) + "px";
				
				divScore.style.top = (((SCREEN_HEIGHT / 2) - divNewWorstScore.offsetHeight) / 2) - (divScore.offsetHeight / 2) + "px";
			}
			
			document.addEventListener("click", function(e) {
				
				if (DATA.getLuckyBoxes() != 0 || DATA.getLuckyGolds() != 0)
					location.href = "luckyboxes.html";
						
				else
					location.href = "index.html";
				
			}, false);
			
			document.addEventListener("touchmove", function(e) { e.preventDefault(); }, false);