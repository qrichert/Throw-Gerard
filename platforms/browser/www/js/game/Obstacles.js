/*
    This file controls the obstacles/enemies
*/

var ObstacleType = {
/* Good */
    FOOD: 0,
	FOODPLUS: 1,
	SHELTER: 2,
	HEART: 3,
	
/* Bad */
	UFO: 10,
	UFO_INV: 11,
	BOMB: 12,
	DEATHBOMB: 13,
	INVERTBOMB: 14,
	GHOST: 15,
	CLOUD: 16,
	
/* Bonuses */
	LUCKYBOX: 20,
	LUCKYGOLD: 21,
	COIN: 22,
	GEM: 23
}

var ObstacleEffect = {
/* Good */
	PLUS_FIVE: 1,
	PLUS_TEN: 2,
	PLUS_FIFTY: 3,
	
	SHELTER: 4,
	ADD_LIFE: 5,
	
/* Bad */
	MINUS_TEN: 10,
	MINUS_THIRTY: 11,
	DIE: 12,
	INVERT_SCORE: 13,
	
/* Bonuses */
	LUCKY_BOX: 20,
	LUCKY_GOLD: 21,
	ADD_COIN: 22,
	ADD_GEM: 23,
	
/* Other */
	NONE: 30
}

var ObstacleStatus = {
	DELETED: 0, // == Deleted
	ACTIVE: 1
}

function Obstacle(type) {
    this.m_node = document.createElement("div");
    
        this.getNode = function() {
            return this.m_node;
        }
		
	this.m_type = type;
	
		this.getObstacleType = function() {
			return this.m_type;
		}
		
    this.m_parent = document.querySelector("#obstacles");
        this.m_parent.appendChild(this.m_node);
	
	this.m_obstacleEffect = null;
	
		this.getObstacleEffect = function() {
			return this.m_obstacleEffect;
		}
    
    this.m_posX = 0;
    
        this.getPosX = function() {
            return this.m_posX;
        }
        
    this.m_posY = 0;
    
          this.getPosY = function() {
            return this.m_posY;
        }
        
    this.m_width = 0;
    
          this.getWidth = function() {
            return this.m_width;
        }

    this.m_height = 0;

          this.getHeight = function() {
            return this.m_height;
        }
		  
	this.m_isAlreadyHit = false;
	
	this.m_obstacleStatus = ObstacleStatus.ACTIVE;
	
		this.getObstacleStatus = function() {
			return this.m_obstacleStatus;
		}
		
		this.setObstacleDeleted = function() {
			this.m_obstacleStatus = ObstacleStatus.DELETED;
		}
		
	this.m_hasTimeout = false;
	this.m_timeoutID = 0;
	
	this.playSound = function() { // So that if there's no sound already it doesn't crash
		return;
	}
	
/* Good */
		
    if (this.m_type == ObstacleType.FOOD) {
			this.m_obstacleEffect = ObstacleEffect.PLUS_TEN;
		
            this.m_width = 37;
            this.m_height = 23.88;
		
			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

            this.m_node.style.backgroundImage = "url('img/game/obstacles/food.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
			this.m_node.style.transform = "rotate(-10deg)";
		
			function rotateLeft() {
				$({ deg: 10 }).animate({ deg: -10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateRight();
					}
				});
			}
		
			function rotateRight() {
				$({ deg: -10 }).animate({ deg: 10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateLeft();
					}
				});
			}
		
			rotateRight();
		
			this.playSound = function() {
				SOUND.playGetItem();
			}
	}
	
	else if (this.m_type == ObstacleType.FOODPLUS) {
			this.m_obstacleEffect = ObstacleEffect.PLUS_FIFTY;
		
            this.m_width = 40;
            this.m_height = 43.11;
		
			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

            this.m_node.style.backgroundImage = "url('img/game/obstacles/food_plus.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
			this.m_node.style.transform = "rotate(-10deg)";
		
			function rotateLeft() {
				$({ deg: 10 }).animate({ deg: -10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateRight();
					}
				});
			}
		
			function rotateRight() {
				$({ deg: -10 }).animate({ deg: 10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateLeft();
					}
				});
			}
		
			rotateRight();
		
			this.playSound = function() {
				SOUND.playGetItem();
			}
	}
	
	else if (this.m_type == ObstacleType.SHELTER) {
			this.m_obstacleEffect = ObstacleEffect.SHELTER;
		
            this.m_width = 29.79;
            this.m_height = 37;
		
			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

			this.m_node.style.backgroundImage = "url('img/game/obstacles/shield.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
			this.m_node.style.transform = "rotate(-10deg)";
		
			function rotateLeft() {
				$({ deg: 10 }).animate({ deg: -10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateRight();
					}
				});
			}
		
			function rotateRight() {
				$({ deg: -10 }).animate({ deg: 10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateLeft();
					}
				});
			}
		
			rotateRight();
		
			this.playSound = function() {
				SOUND.playGetItem();
			}
	}
	
	else if (this.m_type == ObstacleType.HEART) {
			this.m_obstacleEffect = ObstacleEffect.ADD_LIFE;
		
            this.m_width = 33.5;
            this.m_height = 35.08;
		
			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

			this.m_node.style.backgroundImage = "url('img/game/obstacles/heart.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
			this.m_node.style.transform = "rotate(-10deg)";
		
			function rotateLeft() {
				$({ deg: 10 }).animate({ deg: -10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateRight();
					}
				});
			}
		
			function rotateRight() {
				$({ deg: -10 }).animate({ deg: 10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateLeft();
					}
				});
			}
		
			rotateRight();
		
			this.playSound = function() {
				SOUND.playHeart();
			}
	}
	
/* Bad */
	
	else if (this.m_type == ObstacleType.UFO) {
			this.m_obstacleEffect = ObstacleEffect.DIE;
		
			this.m_width = 60;
            this.m_height = 36.24;
		
			this.m_posX = 0 - this.m_width - 5;
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65 - 70)) + 10 + 70);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

            this.m_node.style.backgroundImage = "url('img/game/obstacles/flying_saucer.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
		
			var ufoNewHeight = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65 - 70)) + 10 + 70);
		
			var ufoAnimDuration = (Math.floor(Math.random() * 8 + 4)) * 1000; // Between 8 and 4s
		
		
			$(this.m_node).animate({ left: SCREEN_WIDTH + 5 }, {
				duration: ufoAnimDuration,
				
				queue: false,
				
				easing: "linear",
				
				step: function (now) {
					_this.m_posX = now;
				},
				
				complete: function () {
					_this.getRidOf();
				}
			});
		
			$(this.m_node).animate({ top: ufoNewHeight }, { // random end POS
				duration: ufoAnimDuration, // random same as for X
				
				queue: false,
				
				easing: "easeInOutElastic",
				
				step: function (now) {
					_this.m_posY = now;
				}
			});
		
			this.playSound = function() {
				SOUND.playUfo();
			}
	}
	
	else if (this.m_type == ObstacleType.UFO_INV) {
			this.m_obstacleEffect = ObstacleEffect.DIE;
		
			this.m_width = 60;
            this.m_height = 36.24;
		
			this.m_posX = SCREEN_WIDTH + 5;
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65 - 70)) + 10 + 70);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

            this.m_node.style.backgroundImage = "url('img/game/obstacles/flying_saucer_invert.png')";
            this.m_node.style.backgroundSize = "cover";
		
			this.m_node.style.transform = "rotate(-2deg)";
		
			var _this = this;
		
			var ufoNewHeight = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65 - 70)) + 10 + 70);
		
			var ufoAnimDuration = (Math.floor(Math.random() * 8 + 4)) * 1000; // Between 8 and 4s
		
		
			$(this.m_node).animate({ left: (0 - this.m_width - 5) }, {
				duration: ufoAnimDuration,
				
				queue: false,
				
				easing: "linear",
				
				step: function (now) {
					_this.m_posX = now;
				},
				
				complete: function () {
					_this.getRidOf();
				}
			});
		
			$(this.m_node).animate({ top: ufoNewHeight }, { // random end POS
				duration: ufoAnimDuration, // random same as for X
				
				queue: false,
				
				easing: "easeInOutElastic",
				
				step: function (now) {
					_this.m_posY = now;
				}
			});
		
			this.playSound = function() {
				SOUND.playUfo();
			}
	}
	
	else if (this.m_type == ObstacleType.BOMB) {
			this.m_obstacleEffect = ObstacleEffect.MINUS_TEN;
		
            this.m_width = 37.80;
            this.m_height = 45;
		
			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

			this.m_node.style.backgroundImage = "url('img/game/obstacles/bomb.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
			this.m_node.style.transform = "rotate(-10deg)";
		
			function rotateLeft() {
				$({ deg: 10 }).animate({ deg: -10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateRight();
					}
				});
			}
		
			function rotateRight() {
				$({ deg: -10 }).animate({ deg: 10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateLeft();
					}
				});
			}
		
			rotateRight();
		
			this.playSound = function() {
				SOUND.playBomb();
			}
	}
	
	else if (this.m_type == ObstacleType.DEATHBOMB) {
			this.m_obstacleEffect = ObstacleEffect.DIE;
		
            this.m_width = 37.80;
            this.m_height = 45;
		
			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

			this.m_node.style.backgroundImage = "url('img/game/obstacles/deathbomb.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
			this.m_node.style.transform = "rotate(-10deg)";
		
			function rotateLeft() {
				$({ deg: 10 }).animate({ deg: -10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateRight();
					}
				});
			}
		
			function rotateRight() {
				$({ deg: -10 }).animate({ deg: 10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateLeft();
					}
				});
			}
		
			rotateRight();
		
			this.playSound = function() {
				SOUND.playBomb();
			}
	}
	
	else if (this.m_type == ObstacleType.INVERTBOMB) {
			this.m_obstacleEffect = ObstacleEffect.INVERT_SCORE;
		
            this.m_width = 37.80;
            this.m_height = 45;
		
			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

			this.m_node.style.backgroundImage = "url('img/game/obstacles/invertbomb.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
			this.m_node.style.transform = "rotate(-10deg)";
		
			function rotateLeft() {
				$({ deg: 10 }).animate({ deg: -10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateRight();
					}
				});
			}
		
			function rotateRight() {
				$({ deg: -10 }).animate({ deg: 10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateLeft();
					}
				});
			}
		
			rotateRight();
		
			this.playSound = function() {
				SOUND.playBomb(); // Change that
			}
	}
	
	else if (this.m_type == ObstacleType.GHOST) {
			this.m_obstacleEffect = ObstacleEffect.MINUS_THIRTY;
		
            this.m_width = 26;
            this.m_height = 47.27;
		
			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

			this.m_node.style.backgroundImage = "url('img/game/obstacles/ghost.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
			this.m_node.style.transform = "rotate(-8deg)";
		
			function rotateLeft() {
				$({ deg: 2 }).animate({ deg: -8 }, {
					duration: 800,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateRight();
					}
				});
			}
		
			function rotateRight() {
				$({ deg: -8 }).animate({ deg: 2 }, {
					duration: 800,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateLeft();
					}
				});
			}
		
			rotateRight();
		
			this.playSound = function() {
				SOUND.playGhost();
			}
	}
	
	else if (this.m_type == ObstacleType.CLOUD) {
			this.m_obstacleEffect = ObstacleEffect.NONE;
		
            this.m_width = 65;
            this.m_height = 43.77;
		
//			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
			this.m_posX = 0 - this.m_width - 5;
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

			this.m_node.style.backgroundImage = "url('img/game/obstacles/cloud.png')";
            this.m_node.style.backgroundSize = "cover";
            this.m_node.style.backgroundRepeat = "no-repeat";
		
			this.m_node.style.transform = "rotate(-7deg)";
			
			var _this = this;
		
			var cloudAnimDuration = (Math.floor(Math.random() * 10000 + 6000));
		
			var stepPercent = Math.random(); // Between 0 and 1
		
			var totalTravel = (this.m_width + 5) + SCREEN_WIDTH + 5;
		
			var stepPoint = totalTravel * stepPercent;
		
				if (stepPoint < 30)
					stepPoint = 30;
		
				else if (stepPoint > (SCREEN_WIDTH - this.m_width - 30))
					stepPoint = SCREEN_WIDTH - this.m_width - 30;
		
			$(this.m_node).animate({ left: stepPoint }, {
				duration: cloudAnimDuration * stepPercent,
				
				queue: false,
				
				easing: "linear",
				
				step: function (now) {
					_this.m_posX = now;
				},
				
				complete: function () {
					_this.m_lightningStroke = document.createElement("div");
						_this.m_lightningStroke.style.width = "24px";
						_this.m_lightningStroke.style.height = "46.34px";
						_this.m_lightningStroke.style.backgroundImage = "url('img/game/obstacles/lightning_stroke.png')";
						_this.m_lightningStroke.style.backgroundSize = "cover";
						_this.m_lightningStroke.style.position = "absolute";
						_this.m_lightningStroke.style.left = ((_this.m_width / 2.7) - (24 / 2)) + "px";
						_this.m_lightningStroke.style.top = (_this.m_height - 3) + "px";
	//					_this.m_lightningStroke.style.transform = "rotate(" + (Math.floor(Math.random() * 100 + 0) > 50 ? '-' : '') + "20deg)";

							_this.m_node.appendChild(_this.m_lightningStroke);

					_this.m_obstacleEffect = ObstacleEffect.DIE;

					_this.m_hasTimeout = true;

					_this.m_timeoutID = setTimeout(function() {
						
						_this.m_obstacleEffect = ObstacleEffect.NONE;
						_this.m_hasTimeout = false;
						_this.m_node.removeChild(_this.m_lightningStroke);
						
							$(_this.m_node).animate({ left: SCREEN_WIDTH + 5 }, {
								duration: cloudAnimDuration - (cloudAnimDuration * stepPercent),

								queue: false,

								easing: "linear",

								step: function (now) {
									_this.m_posX = now;
								},

								complete: function () {
									_this.getRidOf();
								}
							});

					}, 1200);
				}
			});
	}
	
/* Bonuses */
	
	else if (this.m_type == ObstacleType.LUCKYBOX) {
			this.m_obstacleEffect = ObstacleEffect.LUCKY_BOX;
		
            this.m_width = 32.04;
            this.m_height = 40;
		
			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

			this.m_node.style.backgroundImage = "url('img/game/obstacles/luckybox.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
			this.m_node.style.transform = "rotate(-10deg)";
		
			function rotateLeft() {
				$({ deg: 10 }).animate({ deg: -10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateRight();
					}
				});
			}
		
			function rotateRight() {
				$({ deg: -10 }).animate({ deg: 10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateLeft();
					}
				});
			}
		
			rotateRight();
		
			this.playSound = function() {
				SOUND.playGetItem();
			}
	}
	
	else if (this.m_type == ObstacleType.LUCKYGOLD) {
			this.m_obstacleEffect = ObstacleEffect.LUCKY_GOLD;
		
			this.m_width = 32.04;
            this.m_height = 40;
		
			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

			this.m_node.style.backgroundImage = "url('img/game/obstacles/luckygold.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
			this.m_node.style.transform = "rotate(-10deg)";
		
			function rotateLeft() {
				$({ deg: 10 }).animate({ deg: -10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateRight();
					}
				});
			}
		
			function rotateRight() {
				$({ deg: -10 }).animate({ deg: 10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateLeft();
					}
				});
			}
		
			rotateRight();
		
			this.playSound = function() {
				SOUND.playLuckyGold();
			}
	}
	
	else if (this.m_type == ObstacleType.COIN) {
			this.m_obstacleEffect = ObstacleEffect.ADD_COIN;
		
            this.m_width = 33.5;
            this.m_height = 30;
		
			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

			this.m_node.style.backgroundImage = "url('img/game/obstacles/coin.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
			this.m_node.style.transform = "rotate(-10deg)";
		
			function rotateLeft() {
				$({ deg: 10 }).animate({ deg: -10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateRight();
					}
				});
			}
		
			function rotateRight() {
				$({ deg: -10 }).animate({ deg: 10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateLeft();
					}
				});
			}
		
			rotateRight();
		
			this.playSound = function() {
				SOUND.playGetItem();
			}
	}
	
	else if (this.m_type == ObstacleType.GEM) {
			this.m_obstacleEffect = ObstacleEffect.ADD_GEM;
		
			this.m_width = 29.82;
			this.m_height = 35.5;
		
			this.m_posX = Math.floor((Math.random() * (SCREEN_WIDTH - this.m_width - 30)) + 30);
            this.m_posY = Math.floor((Math.random() * (CABLE_HEIGHT - this.m_width - 65)) + 10);
		
            this.m_node.style.position = "absolute";
            this.m_node.style.left = this.m_posX + "px";
            this.m_node.style.top = this.m_posY + "px";

            this.m_node.style.width = this.m_width + "px";
            this.m_node.style.height = this.m_height + "px";

			this.m_node.style.backgroundImage = "url('img/game/obstacles/gem.png')";
            this.m_node.style.backgroundSize = "cover";
		
			var _this = this;
			this.m_node.style.transform = "rotate(-10deg)";
		
			function rotateLeft() {
				$({ deg: 10 }).animate({ deg: -10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateRight();
					}
				});
			}
		
			function rotateRight() {
				$({ deg: -10 }).animate({ deg: 10 }, {
					duration: 300,
					easing: "linear",
					step: function (now) {
						_this.m_node.style.transform = "rotate(" + now + "deg)";
					},
					
					complete: function() {
						rotateLeft();
					}
				});
			}
		
			rotateRight();
		
			this.playSound = function() {
				SOUND.playGem();
			}
	}
	
/* METHODS */
	
	this.getRidOf = function() {
		if (this.m_obstacleStatus == ObstacleStatus.DELETED)
			return;
		
        this.m_parent.removeChild(this.m_node);
		$(this.m_node).stop(true, false); // Stop running animation (clear queue, jump to end)
		this.m_obstacleStatus = ObstacleStatus.DELETED;
		
		if (this.m_hasTimeout)
			clearTimeout(this.m_timeoutID);
		
		if (this.m_hasSecondTimeout)
			clearTimeout(this.m_secondTimeoutID);
    }
    
    this.hit = function() {
		
		if (this.m_isAlreadyHit == false) {
			
			if (this.m_type != ObstacleType.UFO
			   && this.m_type != ObstacleType.CLOUD) {
				
				this.m_isAlreadyHit = true;
				this.getRidOf();
			}
			
//			else
//				setHitByUfo(true);
			
			return true;
		}
		
		else {
			return false;
		}
    }
	
	if (this.m_type != ObstacleType.UFO
	   && this.m_type != ObstacleType.CLOUD) { // Autodelete
		
		var x = (Math.floor(Math.random() * 9 + 6)) * 1000; // Between 6 and 9s

		var _this = this;
		
		setTimeout(function() {
			_this.getRidOf();
		}, x);
	}
}

var ObstacleFrequency = {
/* Good */
    FOOD:		{ FREQUENCY: 100,	TYPE: ObstacleType.FOOD			},
	FOODPLUS:	{ FREQUENCY: 40,	TYPE: ObstacleType.FOODPLUS		},
	SHELTER:	{ FREQUENCY: 7.5,	TYPE: ObstacleType.SHELTER		},
	HEART:		{ FREQUENCY: 4.5,	TYPE: ObstacleType.HEART		},
	
/* Bad */
	UFO:		{ FREQUENCY: 8,		TYPE: ObstacleType.UFO			},
	UFO_INV:	{ FREQUENCY: 7,		TYPE: ObstacleType.UFO_INV		},
	BOMB:		{ FREQUENCY: 45,	TYPE: ObstacleType.BOMB			},
	DEATHBOMB:	{ FREQUENCY: 12,	TYPE: ObstacleType.DEATHBOMB	},
	INVERTBOMB:	{ FREQUENCY: 5,		TYPE: ObstacleType.INVERTBOMB	},
	GHOST:		{ FREQUENCY: 25,	TYPE: ObstacleType.GHOST		},
	CLOUD:		{ FREQUENCY: 10,	TYPE: ObstacleType.CLOUD		},
	
/* Bonuses */
	LUCKYBOX:	{ FREQUENCY: 5,		TYPE: ObstacleType.LUCKYBOX		},
	LUCKYGOLD:	{ FREQUENCY: 2,		TYPE: ObstacleType.LUCKYGOLD	},
	COIN:		{ FREQUENCY: 25,	TYPE: ObstacleType.COIN			},
	GEM:		{ FREQUENCY: 3.5,	TYPE: ObstacleType.GEM			}
}

var total = 0;

// We calculate the total

for (var elem in ObstacleFrequency) { // "elem" = FOOD, FOODPLUS, etc... -> ObstacleFrequency[elem] = { frequency, type }
	
	if (!ObstacleFrequency.hasOwnProperty(elem))
		continue;
	
	total += ObstacleFrequency[elem].FREQUENCY;
}

// Now that we have the total, we update the frequencies in %

for (var elem in ObstacleFrequency) {
	
	if (!ObstacleFrequency.hasOwnProperty(elem))
		continue;
	
	ObstacleFrequency[elem].FREQUENCY = (ObstacleFrequency[elem].FREQUENCY / total) * 100;
}

function getRandomOBJType() {
	
	var x = Math.floor(Math.random() * 100 + 0);
	
	for (var elem in ObstacleFrequency) {
	
		if (!ObstacleFrequency.hasOwnProperty(elem))
			continue;

		x -= ObstacleFrequency[elem].FREQUENCY;
		
		if (x <= 0)
			return ObstacleFrequency[elem].TYPE;
	}
}

var obstacleList = new Array();

	for (var i = 0; i < 6; i++) { // 6 obstacles ; MAKE IT PROPORTIONAL TO THE SCREEN
		obstacleList.push(new Obstacle(getRandomOBJType()));
	}


function addObstacle() {
	/*
		Searches for finished obstacles every 2s.
		If it finds one in the list it gets recycled and the search stops.
	*/
	
	for (var i = 0; i < obstacleList.length; i++) {
		
		if (obstacleList[i].getObstacleStatus() == ObstacleStatus.DELETED) {
			
			obstacleList[i] = new Obstacle(getRandomOBJType());
		}
	}
	
	setTimeout(addObstacle, 2000)
}

addObstacle();
