/*
	This file is for the menu of the game.
*/

var characterWidth = 85;
	var spacingWidth = 12;
	
var charactersArray = new Array('normal', 'rambo', 'aloha', 'obelix');
var charactersObjectsArray = [];
	
for (var i = 0; i < charactersArray.length; i++) {
	var c = document.querySelector("#" + charactersArray[i]);
		c.style.width = characterWidth + "px";
		c.style.height = "85px";
		c.style.left = (i * characterWidth) + (i * spacingWidth) + "px";

	charactersObjectsArray.push(new Character(c, charactersArray[i]));
}

var isAnySelected = false;

function selectCharachterOnClick(target) {
	var selectedCharacter = target.id;
	
		if (DATA.getCharacter(selectedCharacter) || selectedCharacter == "normal") {
			DATA.selectCharacter(selectedCharacter);

			for (var j = 0; j < charactersObjectsArray.length; j++) {
				if (selectedCharacter == charactersObjectsArray[j].getCharacter())
					charactersObjectsArray[j].select();

				else
					charactersObjectsArray[j].deselect();
			}
		}

		else {
//			alert("character not unlocked!");
		}
}
	
for (var i = 0; i < charactersObjectsArray.length; i++) {
	if (!IS_TOUCHABLE) {
		charactersObjectsArray[i].getNode().addEventListener("click", function(e) {
			var target = e.target || e.srcElement;
			selectCharachterOnClick(target);
		}, false);
	}
	
	charactersObjectsArray[i].getNode().addEventListener("touchend", function(e) {
		var target = e.target || e.srcElement;
		selectCharachterOnClick(target);
	}, false);
		
	if (DATA.getSelectedCharacter() == charactersObjectsArray[i].getCharacter()) {
		charactersObjectsArray[i].select();
		isAnySelected = true;
	}
}

if (!isAnySelected)
	charactersObjectsArray[0].select(); // normal
	
document.querySelector("#characters").style.width = (charactersArray.length * characterWidth) + (charactersArray.length * spacingWidth) - spacingWidth + "px";
