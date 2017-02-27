/*
	Adds a square to the bottom of a page which you can tap to cheat.
*/

var cheatSquare = document.createElement("div");
	cheatSquare.style.position = "absolute";
	cheatSquare.style.right = "0px";
	cheatSquare.style.bottom = "0px";
	cheatSquare.style.width = "40px";
	cheatSquare.style.height = "40px";
	cheatSquare.style.backgroundColor = "rgba(0, 0, 0, 0)";
		document.querySelector("body").appendChild(cheatSquare);

var nbClicks = 0;

function cheatSquareClick() {
	nbClicks++;
	
	if (nbClicks >= 100) {
		
		var passwd = prompt("Password:\n(Type \"clear\" to erase all data)");
		
		if (passwd == "barzoni") {
			if (!DATA.getGerardRambo() && confirm("Unlock Gerard RAMBO?"))
				DATA.unlockGerardRambo();
			
			if (!DATA.getGerardAloha() && confirm("Unlock Gerard ALOHA?"))
				DATA.unlockGerardAloha();
			
			if (!DATA.getGerardObelix() && confirm("Unlock Gerard OBELIX?"))
				DATA.unlockGerardObelix();
			
			DATA.setGems(prompt("Gems", DATA.getGems()));
			DATA.setCoins(prompt("Coins", DATA.getCoins()));
			DATA.addLuckyBoxes(parseInt(prompt("Add Lucky Boxes", 0), 10));
			DATA.addLuckyGolds(parseInt(prompt("Add Lucky Golds", 0), 10));
			
			location.href = "index.html";
		}
		
		else if (passwd == "clear") {
			if (confirm("Are you sure?")) {
				DATA.clear();
				location.href = "index.html";
			}
		}
	}
}

if (!IS_TOUCHABLE) {
	cheatSquare.addEventListener("mouseup", function() { cheatSquareClick(); }, false);
}

cheatSquare.addEventListener("touchend", function() { cheatSquareClick(); }, false);