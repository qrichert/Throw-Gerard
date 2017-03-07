/*
	This file controls the animated frames that make Gerard and his Eyes
*/

var StateType = {
	STILL: 0,
	WALK_LEFT: 1,
	WALK_RIGHT: 2,
	STRETCH: 3,
	JUMP: 4,
	FALL_STRAIGHT: 5,
	FALL_LEFT: 6,
	FALL_RIGHT: 7,
	DIE: 8
}

var EyesPos = {
	NORMALX: 16,
	NORMALY: 8,
	
	PARACHUTEX: 16,
	PARACHUTEY: 33
}

var EyesSize = {
	WIDTH: 15,
	HEIGHT: 8
}

function Eyes(target, stateType) { // Controls for the eyes
    this.m_target = target;
	
		this.getTarget = function() {
			return this.m_target;
		}
	
	this.m_stateType = stateType;
	
	if (this.m_stateType != StateType.DIE) { // The size of the eye's image
		this.m_target.style.width = EyesSize.WIDTH + "px";
		this.m_target.style.height = EyesSize.HEIGHT + "px";
	}
	
	this.m_posLeft = 0;
	this.m_posTop = 0;
	
	this.m_eyesPicture = "";
	
		switch (this.m_stateType) {
				case StateType.STILL:			this.m_posLeft = EyesPos.NORMALX;		this.m_posTop = EyesPos.NORMALY;		this.m_eyesPicture = "still";			break;
				case StateType.WALK_LEFT:		this.m_posLeft = EyesPos.NORMALX;		this.m_posTop = EyesPos.NORMALY;		this.m_eyesPicture = "walk_left";		break;
				case StateType.WALK_RIGHT:		this.m_posLeft = EyesPos.NORMALX;		this.m_posTop = EyesPos.NORMALY;		this.m_eyesPicture = "walk_right";		break;
				case StateType.STRETCH:			this.m_posLeft = EyesPos.NORMALX;		this.m_posTop = EyesPos.NORMALY;		this.m_eyesPicture = "stretch";			break;
				case StateType.JUMP:			this.m_posLeft = EyesPos.NORMALX;		this.m_posTop = EyesPos.NORMALY;		this.m_eyesPicture = "jump";			break;
				case StateType.FALL_STRAIGHT:	this.m_posLeft = EyesPos.PARACHUTEX;	this.m_posTop = EyesPos.PARACHUTEY;		this.m_eyesPicture = "fall_straight";	break;
				case StateType.FALL_LEFT:		this.m_posLeft = EyesPos.PARACHUTEX;	this.m_posTop = EyesPos.PARACHUTEY;		this.m_eyesPicture = "fall_left";		break;
				case StateType.FALL_RIGHT:		this.m_posLeft = EyesPos.PARACHUTEX;	this.m_posTop = EyesPos.PARACHUTEY;		this.m_eyesPicture = "fall_right";		break;
				//case StateType.DIE: break; No moving eyes while dying
			}
	
		this.getEyesPicture = function() {
			return this.m_eyesPicture;
		}

	this.setUsed = function() {
		if (this.m_stateType != StateType.DIE) {
			this.m_target.style.display = "block";
			this.m_target.style.left = this.m_posLeft + "px";
			this.m_target.style.top = this.m_posTop + "px";
			this.m_target.style.backgroundImage = "url('img/game/gerard/eyes/" + this.m_eyesPicture + ".png')";
		}
		
		else {
			this.m_target.style.display = "none";
		}
	}
	
	this.blink = function() {
		this.m_target.style.backgroundImage = "url('img/game/gerard/eyes/blink.png')";
	}
	
	this.unblink = function() {
		this.m_target.style.backgroundImage = "url('img/game/gerard/eyes/" + this.m_eyesPicture + ".png')";
	}
}

function State(stateType, target, eyesTarget) { // target = HTML object
// CONSTRUCTION
	this.m_stateType = stateType;
	
		this.getStateType = function() {
				return this.m_stateType;
		}
		
	this.m_target = target;
    
    this.m_eyes = new Eyes(eyesTarget, this.m_stateType);
        
        this.getEyes = function() {
            return this.m_eyes;
        }
	
	this.m_animationFramesPos = new Array();
	
		var folder = null;
		this.m_numberOfAnimationFrames = null;
	
		var i = 0;

			switch (this.m_stateType) {
				case StateType.STILL:			folder = "walk";		this.m_numberOfAnimationFrames = 1;		break;
				case StateType.WALK_LEFT:		folder = "walk";		this.m_numberOfAnimationFrames = 1;		break;
				case StateType.WALK_RIGHT:		folder = "walk";		this.m_numberOfAnimationFrames = 1;		break;
				case StateType.STRETCH:			folder = "stretch";		this.m_numberOfAnimationFrames = 1;		break;
				case StateType.JUMP:			folder = "jump";		this.m_numberOfAnimationFrames = 24;	break;
				case StateType.FALL_STRAIGHT:	folder = "fall";		this.m_numberOfAnimationFrames = 30;	break;
				case StateType.FALL_LEFT:		folder = "fall";		this.m_numberOfAnimationFrames = 30;	break;
				case StateType.FALL_RIGHT:		folder = "fall";		this.m_numberOfAnimationFrames = 30;	break;
				case StateType.DIE:				folder = "die";			this.m_numberOfAnimationFrames = 1;		break;
			}
	
		if (this.m_stateType == StateType.JUMP) {
			// 24 images | x:12 y:2 | 94x80 | 1128x160
			
			for (i = 0; i < 12; i++) { // 1st line
				this.m_animationFramesPos.push({ X: -(47 * i), Y: 0 }); // Attention !!! Not in raw image size value, because background-image is scaled to fit Gerard's size !!!
			}
			
			for (i = 0; i < 12; i++) { // 2nd line
				this.m_animationFramesPos.push({ X: -(47 * i), Y: -40 });
			}
		}
	
		else if (this.m_stateType == StateType.FALL_STRAIGHT
				|| this.m_stateType == StateType.FALL_LEFT
				|| this.m_stateType == StateType.FALL_RIGHT)
		{
			// 30 images | x:15 y:2 | 94x130 |
			
			for (i = 0; i < 15; i++) { // 1st line
				this.m_animationFramesPos.push({ X: -(47 * i), Y: 0 });
			}
			
			for (i = 0; i < 15; i++) { // 2nd line
				this.m_animationFramesPos.push({ X: -(47 * i), Y: -65 });
			}
		}
	
// METHODS
	this.m_animate = false;
	this.m_currentFrame = 1;
	
		this.animationLoop = function() {
			
			if (this.m_animate) {
				
				this.m_target.style.backgroundPosition =
					this.m_animationFramesPos[this.m_currentFrame].X + "px " +
					this.m_animationFramesPos[this.m_currentFrame].Y + "px";
				
				this.m_currentFrame++; // After, because array starts at 0
				
				if (this.m_currentFrame == this.m_numberOfAnimationFrames)
					this.m_currentFrame = 0;
				
				var _this = this;
				setTimeout(function() { _this.animationLoop(); }, FPS_24);
			}
			
		}

	this.startAnimation = function() {
		this.m_target.style.backgroundImage = "url('img/game/gerard/" + CHARACTER + "/" + folder + "/1.png')";
		this.m_target.style.backgroundPosition = "0px 0px";
		
		this.m_animate = true;
		
		if (this.m_numberOfAnimationFrames != 1) {
			
			if (this.m_stateType == StateType.JUMP) {
				this.m_target.style.backgroundSize = "auto 80px"; // auto width AND 2*StateHeight
			}
			
			else if (this.m_stateType == StateType.FALL_STRAIGHT
				|| this.m_stateType == StateType.FALL_LEFT
				|| this.m_stateType == StateType.FALL_RIGHT)
			{
				this.m_target.style.backgroundSize = "auto 130px"; // auto width AND 2*StateHeight
			}
			
			this.animationLoop();
		}
		
		else {
			this.m_target.style.backgroundSize = "contain";
		}
	}
	
	this.stopAnimation = function() {
		this.m_animate = false;
	}
}
