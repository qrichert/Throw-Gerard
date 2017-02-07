/*
	This file controls the electric current.
*/

function Electricity() {
	this.m_electricity = document.querySelector("#electricity");
		this.m_electricity.style.width = "25px";
		this.m_electricity.style.height = "25px";
		this.m_electricity.style.backgroundImage = "url('img/game/electricity/1.png')";
		this.m_electricity.style.backgroundSize = "auto 25px";
		this.m_electricity.style.backgroundPosition = "0px 0px";
		this.m_electricity.style.visibility = "hidden";
	
		this.m_electricity.style.left = POLE_WIDTH + "px";
		this.m_electricity.style.top = CABLE_HEIGHT - (parseInt(this.m_electricity.style.height, 10) / 2) + "px";
	
	
			this.getElectricity = function() {
				return this.m_electricity;
			}

				this.setPosX = function(pos) {
					this.m_electricity.style.left = pos + "px";
				}

				this.setPosY = function(pos) {
					this.m_electricity.style.top = pos + "px";
				}

				this.getWidth = function() {
					return parseInt(this.m_electricity.style.width, 10);
				}

				this.getHeight = function() {
					return parseInt(this.m_electricity.style.height, 10);
				}
			
	this.show = function() {
		this.m_electricity.style.visibility = "visible";
	}
	
	this.hide = function() {
		this.m_electricity.style.visibility = "hidden";
	}
		
	this.m_initialPosX = POLE_WIDTH; // Cable height
	this.m_initialPosY = CABLE_HEIGHT;
	
	this.m_targetPosX = GERARD.getPosX() + 14; // Gerard (reference: cable)
	this.m_targetPosY = GERARD.getPosY() + GERARD.getHeight() - 2;
	
// ANIMATION
	
	this.m_animationFramesPosX = new Array(0, 50, 100, 150, 200); // Y always 0 !
	
	this.m_animate = false;
	this.m_currentFrame = 0;
	
		this.animationLoop = function() {
			if (this.m_animate) {
				this.m_electricity.style.backgroundPosition = this.m_animationFramesPosX[this.m_currentFrame] + "px 0px";
				
				this.m_currentFrame++;
				
				if (this.m_currentFrame == this.m_animationFramesPosX.length)
					this.m_currentFrame = 0;
				
				var _this = this;
				setTimeout(function() { _this.animationLoop(); }, FPS_24);
			}
		}

	this.startAnimation = function() {
		this.m_animate = true;
		this.animationLoop();
	}
	
	this.stopAnimation = function() {
		this.m_animate = false;
	}
}

var ELECTRICITY = new Electricity();

function newElectricCurrent() {
	
	ELECTRICITY.startAnimation();
	ELECTRICITY.show();
	
	$(ELECTRICITY.getElectricity()).animate({ left: (SCREEN_WIDTH - POLE_WIDTH) - ELECTRICITY.getWidth() } , {
		duration: Math.floor((Math.random() * 2.8) + 1.7) * 1000, // Between 1,7 and 2,8s
		
		easing: "linear",
		
		step: function(now, fx) {

			now -= POLE_WIDTH;
			var GerardPosX = GERARD.getPosX() - POLE_WIDTH;
			
			if (GERARD.getCurrentPhase() == PhaseType.CABLE) {
				
				var R = 10; /* See sqCollision. */
				
				if (((now + ELECTRICITY.getWidth()) >= GerardPosX + R) && (now <= (GerardPosX + GERARD.getWidth() - R))) {
					SOUND.playElectricity();
/**/				GERARD.dieMotherfucker(); /**/
				}

				var currentProgress = 0; // Y value factor of electricity
				
				if (now <= GerardPosX)
					currentProgress = (now / GerardPosX);

				if ((now > GerardPosX) && (now < (GerardPosX + GERARD.getWidth())))
					currentProgress = 1;

				else if (now >= (GerardPosX + GERARD.getWidth()))
					currentProgress = 1 - ((now - (GERARD.getPosX() + GERARD.getWidth()) + POLE_WIDTH) / ((SCREEN_WIDTH - ELECTRICITY.getWidth() - POLE_WIDTH) - (GERARD.getPosX() + GERARD.getWidth())));
				
				ELECTRICITY.setPosY(CABLE_HEIGHT - ((CABLE_HEIGHT - (GERARD.getPosY() + GERARD.getHeight())) * currentProgress) - (ELECTRICITY.getHeight() / 2));
			}
			
			else {
				ELECTRICITY.setPosY(CABLE_HEIGHT - (ELECTRICITY.getHeight() / 2));
			}
			
		},
		
		complete: function() {
			ELECTRICITY.setPosX(POLE_WIDTH);
			ELECTRICITY.setPosY(CABLE_HEIGHT - (ELECTRICITY.getHeight() / 2));
			ELECTRICITY.hide();
			ELECTRICITY.stopAnimation();
			
			setTimeout(newElectricCurrent, Math.floor((Math.random() * 10) + 5) * 1000); // Between 5 and 10s
		}
	});
}

setTimeout(newElectricCurrent, Math.floor((Math.random() * 7.5) + 5.5) * 1000); // Between 5,5 and 7,5s