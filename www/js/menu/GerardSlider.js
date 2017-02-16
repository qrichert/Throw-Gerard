/*
	JS slider for touch devices
*/

function GerardSlider(imgStrip, imgArray, imgWidth, imgSpacing) {
	this.m_imgStrip = imgStrip;
	
		this.getImgStrip = function() {
			return this.m_imgStrip;
		}
		
	this.m_imgArray = imgArray;
	this.m_imgWidth = imgWidth;
	this.m_imgSpacing = imgSpacing;
	
	this.m_width = (this.m_imgArray.length * this.m_imgWidth) + (this.m_imgArray.length * this.m_imgSpacing) - this.m_imgSpacing;
	
		this.getWidth = function() {
			return this.m_width;
		}
	
	this.m_oldPosX = 0; // Old cursor pos
	this.m_posX = 0; // Slider Pos = real actual pos
	this.m_newMove = true;
	
		this.setPosX = function(x) { // x = new cursor X
			
			if (this.m_newMove) {
				this.m_newMove = false;
				this.m_oldPosX = x;
				
				return;
			}
			
			var pixelsToMove = 0;
			
			if (this.m_oldPosX > x) { // Go left
				pixelsToMove = this.m_oldPosX - x;
				this.m_posX -= pixelsToMove;
			}
			
			else if (this.m_oldPosX < x) { // Go right
				pixelsToMove = x - this.m_oldPosX;
				this.m_posX += pixelsToMove;
			}
			
			this.m_imgStrip.style.left = this.m_posX + "px";
			
			this.m_oldPosX = x;
		}
		
		this.setRawPosX = function(x) {
			this.m_posX = x;
			this.m_imgStrip.style.left = this.m_posX + "px";
		}

		this.getPosX = function() {
			return this.m_posX;
		}
	
	this.m_touchPosX = 0; // Touch Pos
	
		this.setTouchPosX = function(x) {
			this.m_touchPosX = x;
		}
		
		this.getTouchPosX = function() {
			return this.m_touchPosX;
		}
	
	this.m_touchHappening = false;
	
		this.setTouchHappening = function(t, x) {
			
			if (t) {
				this.m_touchHappening = true;
				this.setTouchPosX(x);
			}
			
			else {
				this.m_touchHappening = false;
				this.m_newMove = true;
			}
		}
		
		this.getTouchHappening = function() {
			return this.m_touchHappening;
		}
		
	this.m_isMovable = true; // false while animated;
	
		this.setIsMovable = function (m) {
			this.m_isMovable = m;
		}
		
		this.getIsMovable = function() {
			return this.m_isMovable;
		}
}


var SLIDER = new GerardSlider(document.querySelector("#characters"), charactersArray, characterWidth, spacingWidth);

/* Initializing */

if (SLIDER.getWidth() > SCREEN_WIDTH) {
	SLIDER.setRawPosX(50);
}
		
else { // Go back to center
	SLIDER.setRawPosX((SCREEN_WIDTH / 2) - (SLIDER.getWidth() / 2));
}
		
function clickDown(e) {
	
	if (!SLIDER.getIsMovable())
		return;
	
	SLIDER.setTouchHappening(true, e.clientX);
}

function clickUp(e) {
	
	if (!SLIDER.getIsMovable())
		return;
	
	if (SLIDER.getTouchHappening()) {
		SLIDER.setTouchHappening(false, 0);
		
		
		if (SLIDER.getWidth() > SCREEN_WIDTH) {
			
			if ((SLIDER.getPosX() + SLIDER.getWidth()) < (SCREEN_WIDTH - 50)) {
				
				SLIDER.setIsMovable(false);
				
				$({ posX: SLIDER.getPosX() }).animate({ posX: (SCREEN_WIDTH - 50) - SLIDER.getWidth() }, {
					duration: 600,
					easing: "easeOutElastic",
					step: function (now) {
						SLIDER.setRawPosX(now);
					},
					
					complete: function() {
						SLIDER.setRawPosX((SCREEN_WIDTH - 50) - SLIDER.getWidth());
						SLIDER.setIsMovable(true);
					}
				});
			}

			if (SLIDER.getPosX() > 50) {
				
				SLIDER.setIsMovable(false);
				
				$({ posX: SLIDER.getPosX() }).animate({ posX: 50 }, {
					duration: 600,
					easing: "easeOutElastic",
					step: function (now) {
						SLIDER.setRawPosX(now);
					},
					
					complete: function() {
						SLIDER.setRawPosX(50);
						SLIDER.setIsMovable(true);
					}
				});
			}
		}
		
		else { // Go back to center
			
			SLIDER.setIsMovable(false);
			
			var centerPos = (SCREEN_WIDTH / 2) - (SLIDER.getWidth() / 2);
			
			$({ posX: SLIDER.getPosX() }).animate({ posX: centerPos }, {
				duration: 600,
				easing: "easeOutElastic",
				step: function (now) {
					SLIDER.setRawPosX(now);
				},
					
				complete: function() {
					SLIDER.setRawPosX(centerPos);
					SLIDER.setIsMovable(true);
				}
			});
		}
	}
}

function clickMove(e) {
	
	if (!SLIDER.getIsMovable())
		return;
	
	if (SLIDER.getTouchHappening()) {
		SLIDER.setPosX(e.clientX);
	}
}

/* Mouse */

if (!IS_TOUCHABLE) {
	document.querySelector("#characters-frame").addEventListener("mousedown",	function(e) { clickDown(e); },	false);
	document.querySelector("#characters-frame").addEventListener("mouseup",		function(e) { clickUp(e); },	false);
	document.querySelector("#characters-frame").addEventListener("mousemove",	function(e) { clickMove(e); },	false);
}

/* Touch */

document.querySelector("#characters-frame").addEventListener("touchstart",	function(e) { clickDown(e.changedTouches[0]); },	false);
document.querySelector("#characters-frame").addEventListener("touchend",	function(e) { clickUp(e.changedTouches[0]); },		false);
document.querySelector("#characters-frame").addEventListener("touchmove",	function(e) { clickMove(e.changedTouches[0]); },	false);
