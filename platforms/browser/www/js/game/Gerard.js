/*
	This file controls Gerard.
		- Drawing it (STATES)
		- Controlling Blinking
		- Touch events
		- Accelerometer
		- Animation
*/

var PhaseType = {
	CABLE: 0,
	JUMP: 1,
	FALL: 2,
	DIE: 3
}

var StateWidth = {
	NORMAL: 47
}

var StateHeight = {
	NORMAL: 40,
	FALL: 65
}

function GerardOBJ() {
/* GERARD */

	/* Main data */
	
	this.m_gerard = document.querySelector("#gerard");
	
		this.getGerard = function() {
			return this.m_gerard;
		}
        
    this.m_gerardEyes = document.querySelector("#gerard-eyes");
		
/* SIZE */
	
	this.m_width = 0;
	this.m_height = 0;
	
		this.setWidth = function(w) {
			this.m_width = w;
			this.m_gerard.style.width = w + "px";
		}
		
		this.setHeight = function(h) {
			this.m_height = h;
			this.m_gerard.style.height = h + "px";
		}
		
	this.setWidth(StateWidth.NORMAL);
	this.setHeight(StateHeight.NORMAL);
	
		this.getWidth = function() {
			return this.m_width;
		}
	
		this.getHeight = function() {
			return this.m_height;
		}
	
/* POSITION */

	this.m_posX = 0;
	this.m_posY = 0;
	
	this.m_posX_OLD = 0;
	this.m_posY_OLD = 0;
	
		this.setPosX = function(pos) {
			if (this.m_currentPhase != PhaseType.DIE) {
				if (pos < POLE_WIDTH) // Far left
					pos = POLE_WIDTH;

				if ((pos + this.m_width) > (SCREEN_WIDTH - POLE_WIDTH)) // Far right
					pos = (SCREEN_WIDTH - POLE_WIDTH) - this.m_width;
			}
			
			else {
				return;
			}
			
			this.m_posX_OLD = this.m_posX;
			this.m_posX = pos;
			this.m_gerard.style.left = pos + "px";
			
			var rotationFactor = 3.25;
			
			if (!IS_REAL_DEVICE)
				rotationFactor = 1.3;
			
			if (this.m_currentPhase == PhaseType.JUMP)
					GERARD.getGerard().style.transform = "rotate(" + (-(rotationFactor) * (this.m_posX_OLD - this.m_posX)) + "deg)";
			
			else if (this.m_currentPhase == PhaseType.FALL)
					GERARD.getGerard().style.transform = "rotate(" + (rotationFactor * (this.m_posX_OLD - this.m_posX)) + "deg)";
		}
	
		this.setPosY = function(pos) {
			if (this.m_currentPhase == PhaseType.CABLE) {
				if (pos < (SCREEN_HEIGHT * 0.4))
					pos = SCREEN_HEIGHT * 0.4;
				
				if ((pos + this.m_height) > (SCREEN_HEIGHT - 35))
					pos = SCREEN_HEIGHT - this.m_height - 35;
			}
			
			else if (this.m_currentPhase == PhaseType.JUMP) {
				if (pos < 0)
					pos = 0;
				
				if ((pos + this.m_height) > SCREEN_HEIGHT)
					pos = SCREEN_HEIGHT - this.m_height;
			}
			
			else if (this.m_currentPhase == PhaseType.FALL) {
				return;
			}
			
			else if (this.m_currentPhase == PhaseType.DIE) {
				if ((pos + this.m_height) > (SCREEN_HEIGHT - this.m_height)) {
					pos = SCREEN_HEIGHT - this.m_height;
				}
			}

			this.m_posY_OLD = this.m_posY;
			this.m_posY = pos;
			this.m_gerard.style.top = pos + "px";
		}

	this.setPosX((SCREEN_WIDTH / 2) - (this.m_width / 2));
	this.setPosY(CABLE_HEIGHT - (this.m_height / 1.5));
	
		this.getPosX = function() {
			return this.m_posX;
		}
		
		this.getPosY = function() {
			return this.m_posY;
		}
		
		this.updatePosition = function(afterJump) { // 'afterJump' is for parachute animation purposes
													// Only for Y values, X is animated by ACCELERATION
													// And please don't touch this parachute shit !
			
			afterJump = typeof afterJump === "undefined" ? false : afterJump;
			
			var add = 0;
			
			if (afterJump) {
					add = StateHeight.FALL - StateHeight.NORMAL;
			}
			
			this.m_posY_OLD = this.m_posY;
			this.m_posY = parseInt(this.m_gerard.style.top, 10) + add;
			
			if (afterJump) {
				this.setPosY(this.m_posY);
				
				GERARD.getGerard().style.transform = "rotate(0deg)"; // Cancelling falling rotation
			}
		}
		
		this.updatePositionFromValue = function(pos) { // The same as updatePosition(), without parachute shit
													   // and without taking values from parsed CSS.
													   // Used to update position while falling. We got the 'now',
													   // No need to slow shit down with parsing.

 			this.m_posY_OLD = this.m_posY;
			this.m_posY = pos;
		}
		
/* PHASES */

	this.m_currentPhase = PhaseType.CABLE;
	
		this.setCurrentPhase = function(phase) {
			this.m_currentPhase = phase;
		}
	
		this.getCurrentPhase = function() {
			return this.m_currentPhase;
		}

/* STATES */
	
	this.m_STATE_STILL			= new State(StateType.STILL,			this.m_gerard, this.m_gerardEyes);
	this.m_STATE_WALK_LEFT		= new State(StateType.WALK_LEFT,		this.m_gerard, this.m_gerardEyes);
	this.m_STATE_WALK_RIGHT		= new State(StateType.WALK_RIGHT,		this.m_gerard, this.m_gerardEyes);
	this.m_STATE_STRETCH		= new State(StateType.STRETCH,			this.m_gerard, this.m_gerardEyes);
	this.m_STATE_JUMP			= new State(StateType.JUMP,				this.m_gerard, this.m_gerardEyes);
	this.m_STATE_FALL_STRAIGHT	= new State(StateType.FALL_STRAIGHT,	this.m_gerard, this.m_gerardEyes);
	this.m_STATE_FALL_LEFT		= new State(StateType.FALL_LEFT,		this.m_gerard, this.m_gerardEyes);
	this.m_STATE_FALL_RIGHT		= new State(StateType.FALL_RIGHT,		this.m_gerard, this.m_gerardEyes);
	this.m_STATE_DIE			= new State(StateType.DIE,				this.m_gerard, this.m_gerardEyes);
	
	this.m_currentState = this.m_STATE_STILL;
	this.m_currentState.startAnimation();
		this.m_currentState.getEyes().setUsed(); // EYES
	
		this.getCurrentState = function() {
			return this.m_currentState;
		}
	
		this.updateState = function() { // Asynchronous : works alone at X fps and checks POS values updated at <X fps

			var newStateType = null;
			var newState = null;

			if (this.m_currentPhase == PhaseType.CABLE) { // PHASE 1 : On the cable
					if (this.m_posY > (CABLE_HEIGHT - (this.m_height / 4))) {
						newStateType = StateType.STRETCH;
						newState = this.m_STATE_STRETCH;
					}
			
					else if (this.m_posX == this.m_posX_OLD) {
						newStateType = StateType.STILL;
						newState = this.m_STATE_STILL;
					}
			
					else if (this.m_posX < this.m_posX_OLD) {
						newStateType = StateType.WALK_LEFT;
						newState = this.m_STATE_WALK_LEFT;
					}
			
					else if (this.m_posX > this.m_posX_OLD) {
						newStateType = StateType.WALK_RIGHT;
						newState = this.m_STATE_WALK_RIGHT;
					}
			}

			else if (this.m_currentPhase == PhaseType.JUMP) { // PHASE 2 : Jumping
					newStateType = StateType.JUMP;
					newState = this.m_STATE_JUMP;
			}
			
			else if (this.m_currentPhase == PhaseType.FALL) { 	// PHASE 3 : Falling
					if (this.m_posX == this.m_posX_OLD) {
						newStateType = StateType.FALL_STRAIGHT;
						newState = this.m_STATE_FALL_STRAIGHT;
					}
				
					else if (this.m_posX < this.m_posX_OLD) {
						newStateType = StateType.FALL_LEFT;
						newState = this.m_STATE_FALL_LEFT;
					}
				
					else if (this.m_posX > this.m_posX_OLD) {
						newStateType = StateType.FALL_RIGHT;
						newState = this.m_STATE_FALL_RIGHT;
					}
			}
			
			else if (this.m_currentPhase == PhaseType.DIE) {
					newStateType = StateType.DIE;
					newState = this.m_STATE_DIE;
			}

			if (newStateType != this.m_currentState.getStateType()) {
				this.m_currentState.stopAnimation();
				this.m_currentState = newState;
				this.m_currentState.startAnimation();
					this.m_currentState.getEyes().setUsed(); // EYES
			}

			var _this = this;
			setTimeout(function() { _this.updateState(); }, 400);
		}
		
	this.updateState();
	
		this.updateStateToFall = function() { // To parachute
			this.m_currentState.stopAnimation();
			this.m_currentState = this.m_STATE_FALL_STRAIGHT;
			this.m_currentState.startAnimation();
					this.m_currentState.getEyes().setUsed(); // EYES
		}
		
		this.updateStateToCable = function() { // To no parachute
			this.m_currentState.stopAnimation();
			this.m_currentState = this.m_STATE_STILL;
			this.m_currentState.startAnimation();
					this.m_currentState.getEyes().setUsed(); // EYES
		}
		
	this.m_isSheltered = false;
	this.m_shelterTimerId = 0;
	
		this.getSheltered = function() {
			return this.m_isSheltered;
		}
		
		this.setSheltered = function(s, time) {
			
			if (this.m_isSheltered && s) { // Meaning there is already a shelter and we wanna set a new one
				// We just clear the timeout
				clearTimeout(this.m_shelterTimerId);
			}
			
			if (s && time > 0) {
				$(this.m_gerard).addClass("sheltered");
				
				var _this = this;
				this.m_shelterTimerId = setTimeout(function() { _this.setSheltered(false, 0); }, time);
			}
			
			else {
				$(this.m_gerard).removeClass("sheltered");
				clearTimeout(this.m_shelterTimerId);
			}
			
			this.m_isSheltered = s;
		}
		
	this.m_hasStillLives = true;
	
		this.getHasStillLives = function() {
			return this.m_hasStillLives;
		}
		
		this.setNoMoreLives = function() {
			this.m_hasStillLives = false;
		}
		
		this.setGiveNewLife = function() {
			this.m_hasStillLives = true;
		}
		
	this.putGerardBackOnCable = function() {
		this.getGerard().style.display = "block";

		this.setCurrentPhase(PhaseType.CABLE);

		this.m_currentState.stopAnimation();
		this.m_currentState = this.m_STATE_STILL;
		this.m_currentState.startAnimation();
		this.m_currentState.getEyes().setUsed(); // EYES

		this.setPosX((SCREEN_WIDTH / 2) - (this.m_width / 2));
		this.setPosY(CABLE_HEIGHT - (this.m_height / 1.5));

		this.setSheltered(true, 3000);

		ELECTRIC_CABLE.setCurrentState(CableState.GERARD_ON_CABLE);
	}
		
	function animateAngelToHeaven(angel, posY, finalPosY, opacity, moveStepSize, opacityStepSize) {
		if (posY <= finalPosY) {
			document.querySelector("#angels").removeChild(angel);
		}
		
		else {
			posY -= moveStepSize;
			angel.style.top = posY + "px";
			
			opacity -= opacityStepSize;
			angel.style.opacity = opacity;

			
			setTimeout(function() { animateAngelToHeaven(angel, posY, finalPosY, opacity, moveStepSize, opacityStepSize); }, FPS_60);
		}
	}
		
	function angelToHeaven(posX, posY) {
		var angel = document.createElement("div");
			angel.style.position = "absolute";
			angel.style.left = posX + "px";
			angel.style.top = posY + "px";
			angel.style.width = StateWidth.NORMAL + "px";
			angel.style.height = StateHeight.NORMAL + "px";
			angel.style.backgroundSize = "contain";
			angel.style.backgroundImage = "url('img/game/gerard/angel/1.png')";
		
				document.querySelector("#angels").appendChild(angel);
		
		var distance = SCREEN_HEIGHT - ((SCREEN_HEIGHT / 5) * 3);
			var moveStepSize = (distance / 3) / 60;
			var opacityStepSize = 1 / (distance / moveStepSize);
		
		
		animateAngelToHeaven(angel, posY, (SCREEN_HEIGHT / 5) * 3, 0.7, moveStepSize, opacityStepSize);
	}
		
	function animateDyingFall(_this, finalPosX, finalPosY, stepSize) {

		stepSize *= 1.12;
		
		var newPosY = _this.getPosY() + stepSize;
		
		_this.setPosY(newPosY);
		
		if (newPosY >= finalPosY) {
			// Ads fake image at finalPosX, finalPosY
			// Must happen at least 430ms after the hit in order to make sure
			// the cable has bounced back before 'adding' the new Gerard
			
			var fakeBird = document.createElement("div");
					fakeBird.style.position = "absolute";
					fakeBird.style.left = finalPosX + "px";
					fakeBird.style.top = finalPosY + "px";
					fakeBird.style.width = StateWidth.NORMAL + "px";
					fakeBird.style.height = StateHeight.NORMAL + "px";
					fakeBird.style.backgroundSize = "contain";
					fakeBird.style.backgroundImage = "url('img/game/gerard/" + CHARACTER + "/die/dead.png')";

						document.querySelector("#dead-birds").appendChild(fakeBird);
			
			_this.getGerard().style.display = "none";
			
			setTimeout(function() {
				if (_this.getHasStillLives()) {
					_this.putGerardBackOnCable();
				}
				
				else {
					if (SAVE_ME.ask()) {
						LIVES.addLife();
						_this.setGiveNewLife();
						SOUND.playHeart();
						_this.putGerardBackOnCable();
					}
					
					else {
						if (SCORE.getCurrentScore() > DATA.getBestScore()) {
							DATA.setBestScore(SCORE.getCurrentScore());
							alert("New high score!");
						}
						
						else if (SCORE.getCurrentScore() < DATA.getWorstScore()) {
							DATA.setWorstScore(SCORE.getCurrentScore());
							alert("New worst score!");
						}
						
						else {
							alert("click to reload");
						}
						
						location.href = "game.html";
						// Lucky Boxes (if there are any, or game menu)
						// Game Menu
					}
				}
				
				angelToHeaven(finalPosX, finalPosY);
				
			}, 430);
		}
		
		else {
			setTimeout(function() { animateDyingFall(_this, finalPosX, finalPosY, stepSize); }, FPS_60);
		}
	}
		
	this.dieMotherfucker = function() {
		
		if (this.getSheltered())
			return;
		
		if (this.m_currentPhase != PhaseType.DIE) {
			
			if (!LIVES.takeLife()) {
				/*alert("End of the gaaaaaaammmme !\n" +
					  "Score: "+ SCORE.getCurrentScore() + "\n" +
					  "Coins : " + COINS.getCoins() + "\n" +
					  "Gems : " + GEMS.getGems() + "\n" +
					  "Lucky Boxes : " + LUCKYBOXES.getLuckyBoxes() + "\n" +
					  "Lucky Gold : " + LUCKYGOLDS.getLuckyGolds());*/
				
				GERARD.setNoMoreLives();
			}
			
			SOUND.playFallingToDeath();
			
			if (this.m_currentPhase == PhaseType.JUMP
			   || this.m_currentPhase == PhaseType.FALL) {
				
				$(GERARD.getGerard()).stop(true, false); // Stop running animation (clear queue, jump to end)
			}
			
			else {
				ELECTRIC_CABLE.setCurrentState(CableState.GERARD_DYING);
				ELECTRIC_CABLE.bounceBack(this.m_posX, this.m_posY); // Updating the CABLE. Max Bounce duration = 730
			}

			this.setCurrentPhase(PhaseType.DIE); // Updating GERARD
			
			this.m_currentState.stopAnimation();
			this.m_currentState = this.m_STATE_DIE;
			this.m_currentState.startAnimation();
			this.m_currentState.getEyes().setUsed(); // EYES
			
			this.setWidth(StateWidth.NORMAL);
			this.setHeight(StateHeight.NORMAL);
			
			var randomFinalPos = (Math.random() * 5) + 0; // Between +5 and -2 px
			
			var finalPosX = this.m_posX;
			var finalPosY = SCREEN_HEIGHT - this.m_height - randomFinalPos;
			var _this = this;
			
			GERARD.getGerard().style.transform = "rotate(0deg)"; // Cancelling any rotation
			
			animateDyingFall(this, finalPosX, finalPosY, SCREEN_HEIGHT * 0.015);
		}
		
	}
	
/* EVENTS */

	this.m_touchHappening = false;
	this.m_touchPosX = 0;
	this.m_touchPosY = 0;
	
		this.setTouchHappening = function(i, x, y) {
			if (i)
			{
				this.m_touchHappening = true;
				this.m_touchPosX = x - this.m_posX;
				this.m_touchPosY = y - this.m_posY;
			}
			
			else
			{
				this.m_touchHappening = false;
			}
		}
	
		this.getTouchHappening = function() {
			return this.m_touchHappening;
		}
		
		this.getTouchPosX = function() {
			return this.m_touchPosX;
		}
		
		this.getTouchPosY = function() {
			return this.m_touchPosY;
		}
}

var GERARD = new GerardOBJ();

/* EVENTS */

/* Mouse */

GERARD.getGerard().addEventListener("mousedown", function(e) {
	if (GERARD.getCurrentPhase() != PhaseType.CABLE)
		return;
	
	GERARD.setTouchHappening(true, e.clientX, e.clientY);
}, false);

GERARD.getGerard().addEventListener("mouseup", function(e) {
	if (GERARD.getTouchHappening()) {
		GERARD.setTouchHappening(false, 0, 0);
		checkTouchEnd();
	}
}, false);
	
document.addEventListener("mousemove", function(e) {
	if (GERARD.getTouchHappening()) {
		GERARD.setPosX(e.clientX - GERARD.getTouchPosX()); // We keep the mouse for testing purposes
		GERARD.setPosY(e.clientY - GERARD.getTouchPosY());
	}
}, false);

/* Touch */

GERARD.getGerard().addEventListener("touchstart", function(e) {
	if (GERARD.getCurrentPhase() != PhaseType.CABLE)
		return;
	
	GERARD.setTouchHappening(true, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
}, false);

GERARD.getGerard().addEventListener("touchend", function(e) {
	if (GERARD.getTouchHappening()) {
		GERARD.setTouchHappening(false, 0, 0);
		checkTouchEnd();
	}
}, false);
	
document.addEventListener("touchmove", function(e) {
	
	e.preventDefault(); // To prevent scrolling to clouds being out of frame
	
	if (GERARD.getTouchHappening()) {
		GERARD.setPosX(e.changedTouches[0].clientX - GERARD.getTouchPosX());
		GERARD.setPosY(e.changedTouches[0].clientY - GERARD.getTouchPosY());
	}
}, false);

/* FOR COMPUTERS AND TESTING */

document.addEventListener("click", function(e) {

	if (e.clientX < SCREEN_WIDTH / 2) {
		GERARD.setPosX(GERARD.getPosX() - 20);
	}
	
	else if (e.clientX > SCREEN_WIDTH / 2) {
		GERARD.setPosX(GERARD.getPosX() + 20);
	}
}, false);

if (!IS_REAL_DEVICE) {

	document.addEventListener("touchend", function(e) {

		if (e.changedTouches[0].clientX < SCREEN_WIDTH / 2) {
			GERARD.setPosX(GERARD.getPosX() - 20);
		}

		else if (e.changedTouches[0].clientX > SCREEN_WIDTH / 2) {
			GERARD.setPosX(GERARD.getPosX() + 20);
		}
	}, false);
}

document.addEventListener("keypress", function(e) { // To be able to move him around

	if (GERARD.getTouchHappening())
		return;
	
// X
	if ((e.which == 37) || (e.keyCode == 37)
		|| (e.which == 113) || (e.keyCode == 113)) { // Left Arrow / Letter 'Q'
		GERARD.setPosX(GERARD.getPosX() - 20); // Go left
	}
	
	else if ((e.which == 39) || (e.keyCode == 39)
		|| (e.which == 100) || (e.keyCode == 100)) { // Right Arrow / Letter 'D'
		
		e.preventDefault(); // To prevent scrolling to clouds being out of frame
		
		GERARD.setPosX(GERARD.getPosX() + 20); // Go right
	}
	
// Y
	
	if ((e.which == 38) || (e.keyCode == 38)
		|| (e.which == 122) || (e.keyCode == 122)) { // Up Arrow / Letter 'Z'
		GERARD.setPosY(GERARD.getPosY() - 20); // Go up
	}
	
	else if ((e.which == 40) || (e.keyCode == 40)
		|| (e.which == 115) || (e.keyCode == 115)) { // Down Arrow / Letter 'S'
		GERARD.setPosY(GERARD.getPosY() + 20); // Go down
	}
	
// J
	
	if ((e.which == 32) || (e.keyCode == 32)
		|| (e.which == 106) || (e.keyCode == 106)) { // Space Bar / Letter 'J'
		checkTouchEnd();
	}
	
}, false)

document.addEventListener("keypress", function(e) { // Pressing 'K' automatically kills Gerard.
	if ((e.which == 107) || (e.keyCode == 107)) {
		GERARD.dieMotherfucker();
	}
}, false);


/* Accelerometer */

var ACCELERATION_watchID = null;

var ACCELERATION_X = 0;
var ACCELERATION_Y = 0;

function ACCELERATION_onSuccess(acceleration) {
	if (GERARD.getCurrentPhase() == PhaseType.DIE)
			return;

	ACCELERATION_X = acceleration.x;
	ACCELERATION_Y = acceleration.y;
	
	if (!GERARD.getTouchHappening()) {
		ACCELERATION_updatePos();
	}
}

function ACCELERATION_updatePos() {
	GERARD.setPosX(GERARD.getPosX() - (ACCELERATION_X * 1.57)); // New position : OLD - ACCLX
}		

function ACCELERATION_onError() {
	return;
}

document.addEventListener("deviceready", function() {
	navigator.accelerometer.watchAcceleration(ACCELERATION_onSuccess, ACCELERATION_onError, { frequency : FPS_60 });
	
	LOADING_IN_PROGRESS = false;
	document.querySelector("#loading-screen").style.display = "none";
}, false);

/* ANIMATION */

function checkCollisions(now) {
	
    var GerardPosWidth = {
        x: GERARD.getPosX(),
        y: now,
        w: GERARD.getWidth(),
        h: GERARD.getHeight()
    }
                        
    for (var i = 0; i < obstacleList.length; i++) {
                            
        var ObstaclePosWidth = {
            x: obstacleList[i].getPosX(),
            y: obstacleList[i].getPosY(),
            w: obstacleList[i].getWidth(),
            h: obstacleList[i].getHeight()
        }

        if (sqCollision(ObstaclePosWidth, GerardPosWidth) || sqCollision(GerardPosWidth, ObstaclePosWidth)) {
			
			// HERE, SEE IF OBSTACLE TAKES LIVES ETC... AND ACT ACCORDINGLY
            var o = obstacleList[i];
			
			if (o.hit()) {
				
				o.playSound();
				
				switch (o.getObstacleEffect()) {
					case ObstacleEffect.PLUS_FIVE:		SCORE.addToScore(5);		break;
					case ObstacleEffect.PLUS_TEN:		SCORE.addToScore(10);		break;
					case ObstacleEffect.PLUS_FIFTY:		SCORE.addToScore(50);		break;
						
					case ObstacleEffect.SHELTER:
						GERARD.setSheltered(true, Math.floor(Math.random() * 10000 + 5000));
					break;
						
					case ObstacleEffect.ADD_LIFE:		LIVES.addLife();			break;

					case ObstacleEffect.MINUS_TEN:
						if (!GERARD.getSheltered())
							SCORE.takeFromScore(10);
					break;
						
					case ObstacleEffect.MINUS_THIRTY:
						
						if (!GERARD.getSheltered())
							SCORE.takeFromScore(30);
					break;
						
					case ObstacleEffect.DIE:
						if (o.getObstacleType() == ObstacleType.CLOUD)
							SOUND.playElectricity();
						
						GERARD.dieMotherfucker();
					break;
						
					case ObstacleEffect.INVERT_SCORE:
						if (!GERARD.getSheltered())
							SCORE.invertScore();
					break;

					case ObstacleEffect.LUCKY_BOX:		LUCKYBOXES.addLuckyBox();	break;
					case ObstacleEffect.LUCKY_GOLD:		LUCKYGOLDS.addLuckyGold();	break;
						
					case ObstacleEffect.ADD_COIN:
						COINS.addCoin();
						SCORE.addToScore(5);
					break;
						
					case ObstacleEffect.ADD_GEM:		GEMS.addGem();				break;
				}
			}
			
        }
    }
}

function checkTouchEnd() {

	if (GERARD.getCurrentPhase() != PhaseType.CABLE)
		return;
		
    var posX = GERARD.getPosX();
	var posY = GERARD.getPosY();
	var height = GERARD.getHeight();
	
		var MIN_POS_FOR_STAY = 2 * height;
		var MAX_POS_FOR_STAY = 0.3 * height;
	
	if (posY >= (CABLE_HEIGHT - MIN_POS_FOR_STAY) // 2*height because -height = normal pos
			&& posY <= (CABLE_HEIGHT + MAX_POS_FOR_STAY)) { // STAY
		
		$(GERARD.getGerard()).animate({ top: (CABLE_HEIGHT - (height / 1.5)) }, {
				duration: 1000,
			
				easing: "easeOutElastic",
			
				step: function(now) {
					GERARD.updatePositionFromValue(now);
				},
			
				complete: GERARD.updatePosition()
		});
		
	} // CABLE NOT STRETCHED ENOUGH TO JUMP
	
	else if (posY > (CABLE_HEIGHT + MAX_POS_FOR_STAY)) { // JUMP
		GERARD.setCurrentPhase(PhaseType.JUMP); // Updating GERARD
		
		ELECTRIC_CABLE.setCurrentState(CableState.GERARD_JUMPING);
		ELECTRIC_CABLE.bounceBack(posX, posY); // Updating the CABLE
		
			/* DON'T TOUCH THIS FUCKING SHIT */
        
            // It is for the jump height

				var MAX_STRETCH_AMOUNT = ((SCREEN_HEIGHT - 35) - CABLE_HEIGHT);
				var MIN_STRETCH_AMOUNT = MAX_POS_FOR_STAY + height;
				var STRETCH_RANGE = MAX_STRETCH_AMOUNT - MIN_STRETCH_AMOUNT;
				var STRETCH_AMOUNT = (posY + height) - (CABLE_HEIGHT + MIN_STRETCH_AMOUNT);
				var STRETCH_RATIO = STRETCH_AMOUNT / STRETCH_RANGE;

				var MAX = 30;
				var MIN =  CABLE_HEIGHT - (CABLE_HEIGHT / 8);
				var RANGE = MIN - MAX;

				var JUMP_TO = MIN - (STRETCH_RATIO * RANGE);
				var TIME = STRETCH_RATIO * 600 + 200; // At least 200 and max 800

			/* ----------------------------- */
		
		$(GERARD.getGerard()).animate({ top: JUMP_TO }, { // THE JUMP
            duration: TIME,
            
            easing: "easeOutCubic",
            
            step: function(now) {
				GERARD.updatePositionFromValue(now);
                checkCollisions(now);
            },
            
            complete: function() {
		
                var newPos = (CABLE_HEIGHT - (GERARD.getHeight() / 1.5)) - (StateHeight.FALL - StateHeight.NORMAL);

                    GERARD.setCurrentPhase(PhaseType.FALL);
                    GERARD.setHeight(StateHeight.FALL);
				
						/* IMMEDIATELY SWITCH TO THE GOOD DIMENSIONS AND PICTURE */
						GERARD.updateStateToFall();

					GERARD.getGerard().style.top = (parseInt(GERARD.getGerard().style.top, 10) - (StateHeight.FALL - StateHeight.NORMAL)) + "px"; // So that he stays at the same place when the parachute opens


                $(GERARD.getGerard()).animate({ top: newPos }, { // THE FALL
                        duration: TIME * 5.65, // OLD: 8.34

                        easing: "easeInSine",

                        step: function(now) {

                            if ((now + StateHeight.FALL) >= CABLE_HEIGHT) { // Landing

                                if (ELECTRIC_CABLE.getCurrentState() != CableState.GERARD_ON_CABLE) {
                                    ELECTRIC_CABLE.setCurrentState(CableState.GERARD_ON_CABLE);
                                }
                            }
							
							GERARD.updatePositionFromValue(now);
                            checkCollisions(now);
                        },

                        complete: function() {

                            GERARD.setCurrentPhase(PhaseType.CABLE);
                            GERARD.setHeight(StateHeight.NORMAL);
							
								/* IMMEDIATELY SWITCH TO THE GOOD DIMENSIONS AND PICTURE */
								GERARD.updateStateToCable();
							
                            GERARD.updatePosition(true);
                        }
                });
            }
        });
    } // JUMP
	
	else if (posY < (CABLE_HEIGHT - MAX_POS_FOR_STAY) && GERARD.getSheltered()) {

		$(GERARD.getGerard()).animate({ top: (CABLE_HEIGHT - (height / 1.5)) }, {
				duration: 1700,
			
				easing: "easeOutElastic",
			
				step: function(now) {
					GERARD.updatePositionFromValue(now);
				},
			
				complete: GERARD.updatePosition()
		});
		
	} // CABLE STRETCH THE OPPOSITE WAY BUT SHELTERED
	
	else { // posY < (CABLE_HEIGHT + 5) // DIE
		GERARD.dieMotherfucker();
	} // CABLE STRETCH THE OPPOSITE WAY AND NOT SHELTERED (DIE)
}

// BLINKING

function Blinking() {
	
	this.blink = function() {
			
			GERARD.getCurrentState().getEyes().blink();

		var _this = this;
			var blinkingDuration =			Math.floor((Math.random() * 100) + 40);		// Between 40 and 100ms
			var blinkingIntervalDuration =	Math.floor((Math.random() * 5000) + 1500);	// Between 1,5 and 5s
		
		setTimeout(function() {
			
			GERARD.getCurrentState().getEyes().unblink();
			
			setTimeout(function() { _this.blink(); }, blinkingIntervalDuration);
			
		}, blinkingDuration);
	}
}

var BLINKING = new Blinking();
	BLINKING.blink();
