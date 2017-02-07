/*
	This file controls the clouds.
*/

function CloudEnum(type, width, height) {
	this.m_type = type;
	this.m_width = width;
	this.m_height = height;
}

var CloudsArray = new Array();
	CloudsArray.push(new CloudEnum(1, 182, 93));
	CloudsArray.push(new CloudEnum(2, 138, 54));
	CloudsArray.push(new CloudEnum(3, 115, 51));
	CloudsArray.push(new CloudEnum(4, 132, 76));
	CloudsArray.push(new CloudEnum(5, 146, 56));
	CloudsArray.push(new CloudEnum(6, 142, 70));
	CloudsArray.push(new CloudEnum(7, 249, 113));
	CloudsArray.push(new CloudEnum(8, 146, 82));
	CloudsArray.push(new CloudEnum(9, 133, 82));

function Cloud() {
	this.m_cloud = document.createElement("div");
		this.m_cloud.style.position = "absolute";
		this.m_cloud.style.backgroundSize = "contain";
		this.m_cloud.style.backgroundRepeat = "no-repeat";
		this.m_cloud.style.display = "none";
	
			this.m_parent = document.querySelector("#clouds");
			this.m_parent.appendChild(this.m_cloud);
	
	this.m_type = 0;
	this.m_width = 0;
	this.m_height = 0;
	this.m_duration = 0;
	this.m_opacity = 0;
	
	this.m_isQueued = false;
	
		this.getIsQueued = function() {
			return this.m_isQueued;
		}
	
	this.update = function() {
		this.m_isQueued = false;
		
		this.m_type = Math.floor((Math.random() * 9) + 1); // Between 9 and 1
			this.m_cloud.style.backgroundImage = "url('img/game/set/clouds/cloud-" + this.m_type + ".png')";
		
		var sizeFactor = Math.floor((Math.random() * 10) + 5) / 10; // Between 0,5 and 1
		
		this.m_width = (CloudsArray[this.m_type - 1].m_width / 2) * sizeFactor;
			this.m_cloud.style.width = this.m_width + "px";
		
		this.m_height = (CloudsArray[this.m_type - 1].m_height / 2) * sizeFactor;
			this.m_cloud.style.height = this.m_height + "px";
		
		var MAX_d = 60;
		var MIN_d = 20;
		
		this.m_duration = Math.floor((Math.random() * MAX_d) + MIN_d) * 1000; // Between 20s and 1min
		
		// The quicker, the darker. Helps create depth.
		
			var ratio = ((this.m_duration / 1000) - MIN_d) / (MAX_d - MIN_d);

			ratio = ratio > 1 ? 1 : ratio;
			ratio = 1 - ratio;

			var MAX_o = 0.95;
			var MIN_o = 0.35;

			this.m_opacity = ((MAX_o - MIN_o) * ratio) + MIN_o; // Between 0,4 and 0,9
				this.m_cloud.style.opacity = this.m_opacity;
	}
	
	this.update();
	
	function moveCloud(_this, nbSteps, oneStep, interval, currentPos, currentStep) {
		
		currentStep++;
		currentPos += oneStep;
		
		_this.m_cloud.style.left = currentPos + "px";
		
		if (currentStep < nbSteps) {
			setTimeout(function() { moveCloud(_this, nbSteps, oneStep, interval, currentPos, currentStep); }, interval);
		}
		
		else {
			_this.m_cloud.style.display = "none";
			_this.m_isQueued = true;
		}
	}
	
	this.animate = function(headStart) {
		
		headStart = typeof headStart === "undefined" ? false : headStart;
		
		var initialPosX = -this.m_width;
		
				if (headStart) {
					var initialPosX = Math.floor((Math.random() * SCREEN_WIDTH) + -this.m_width);

					// If there's a head start, the duration needs to be adapted
					this.m_duration *= 1 - (initialPosX / (SCREEN_WIDTH + this.m_width));
				}
					
			this.m_cloud.style.left = initialPosX + "px";
		
		var initialPosY = Math.floor((Math.random() * (SCREEN_HEIGHT * 0.4 + 37 - this.m_height)) + (-this.m_height / 3));
		// Max: Just above cable, Min: Can be a bit out of frame
			this.m_cloud.style.top = initialPosY + "px";

		var finalPosX = SCREEN_WIDTH;
		
		this.m_cloud.style.display = "block";
		
		var _this = this;
		
		// Calculation stuff
		
			var interval = FPS_18;
		
			var nbSteps = this.m_duration / interval;
			var oneStep = (SCREEN_WIDTH - initialPosX) / nbSteps; // Distance to travel / Number of steps
		
		moveCloud(this, nbSteps, oneStep, interval, initialPosX, 0);
	}
}

var CloudList = new Array();

	for (var i = 0; i < 6; i++) { // 6 clouds
		CloudList[i] = new Cloud();
		CloudList[i].animate(true);
	}

function addCloud() {
	/*
		Searches for finished clouds every 2s.
		If it finds one in the list it gets recycled and the search stops.
	*/
	
	for (var i = 0; i < CloudList.length; i++) {
		
		if (CloudList[i].getIsQueued()) {
			
			CloudList[i].update();
			CloudList[i].animate();
			
			break;
		}
	}
	
	setTimeout(addCloud, 2000)
}

addCloud();
