/*
	This file controls the electric cable.
		- Drawing following Gerard's movements
		- Color, shape, etc...
		- Updated every 10ms
*/

var CableState = {
	GERARD_ON_CABLE: 0,
	GERARD_JUMPING: 1,
	GERARD_DYING: 2
}

function ElectricCable() {
	this.m_electricCable = document.querySelector("#electric-cable");
		this.m_electricCable.style.left = "0px";
		this.m_electricCable.style.top = "0px";
	
	this.m_cableCanvas = this.m_electricCable.getContext("2d");
		this.m_cableCanvas.canvas.width = SCREEN_WIDTH;
		this.m_cableCanvas.canvas.height = SCREEN_HEIGHT;
		this.m_cableCanvas.lineWidth = 1;
		this.m_cableCanvas.lineJoin = "round";
		this.m_cableCanvas.strokeStyle = "black";
	
	this.m_startEndDrawPoint = CABLE_HEIGHT; // Y
	this.m_startPoint = POLE_WIDTH; // X Left
	this.m_stopPoint = SCREEN_WIDTH - POLE_WIDTH; // X Right
	
	this.m_currentState = CableState.GERARD_ON_CABLE;
	
		this.setCurrentState = function(state) {
			this.m_currentState = state;
		}
	
		this.getCurrentState = function() {
			return this.m_currentState;
		}
	
	this.updateCable = function() {
		if (this.m_currentState != CableState.GERARD_ON_CABLE)
			return;

		this.m_cableCanvas.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
		
			this.m_cableCanvas.beginPath();
			this.m_cableCanvas.moveTo(this.m_startPoint, this.m_startEndDrawPoint);
			this.m_cableCanvas.lineTo(GERARD.getPosX() + 14, GERARD.getPosY() + GERARD.getHeight() - 2);
			this.m_cableCanvas.lineTo(GERARD.getPosX() + GERARD.getWidth() - 14, GERARD.getPosY() + GERARD.getHeight() - 2);
			this.m_cableCanvas.lineTo(this.m_stopPoint, this.m_startEndDrawPoint);
			this.m_cableCanvas.stroke();
            this.m_cableCanvas.closePath();
	}
	
	this.bounceBack = function(posX, posY) { // From posX/posY to normal
        
        var cableCanvas = this.m_cableCanvas;
		
        var startEndDrawPoint = this.m_startEndDrawPoint;
		var startPoint = this.m_startPoint;
		var stopPoint = this.m_stopPoint;
        
        var bounceDuration = 500;
        
        if (posY > (CABLE_HEIGHT + (GERARD.getHeight() * 2))
            || posY < (CABLE_HEIGHT - (GERARD.getHeight() * 2))) {
                bounceDuration = 730;
        }
        
        $({ j: posX, i: posY }).animate({ j: SCREEN_WIDTH / 2, i: CABLE_HEIGHT }, {
            duration: bounceDuration,
            
            easing : "easeOutElastic",
            
            step: function(now, fx) {
                cableCanvas.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                
                    cableCanvas.beginPath();
                    cableCanvas.moveTo(startPoint, startEndDrawPoint);
                    cableCanvas.quadraticCurveTo(this.j, this.i, stopPoint, startEndDrawPoint);
                    cableCanvas.stroke();
                    cableCanvas.closePath();
            },
            
            complete: function() {
                cableCanvas.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	
                    cableCanvas.beginPath();
                    cableCanvas.moveTo(startPoint, startEndDrawPoint);
                    cableCanvas.lineTo(stopPoint, startEndDrawPoint);
                    cableCanvas.stroke();
                    cableCanvas.closePath();
            }
        });
	}
}

var ELECTRIC_CABLE = new ElectricCable();

function updateCableRequest() {
	ELECTRIC_CABLE.updateCable();
//	setTimeout(updateCableRequest, FPS_48);
	requestAnimationFrame(updateCableRequest);
}

updateCableRequest();
