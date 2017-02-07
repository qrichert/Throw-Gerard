var ImagesToPreload = [
	
	"img/game/gerard/eyes/blink.png",
	"img/game/gerard/eyes/fall_left.png",
	"img/game/gerard/eyes/fall_right.png",
	"img/game/gerard/eyes/fall_straight.png",
	"img/game/gerard/eyes/jump.png",
	"img/game/gerard/eyes/still.png",
	"img/game/gerard/eyes/stretch.png",
	"img/game/gerard/eyes/walk_left.png",
	"img/game/gerard/eyes/walk_right.png",

	// FALL
		"img/game/gerard/" + CHARACTER + "/fall/1.png",

	// JUMP
		"img/game/gerard/" + CHARACTER + "/jump/1.png",

	// STRETCH
		"img/game/gerard/" + CHARACTER + "/stretch/1.png",

	// WALK
		"img/game/gerard/" + CHARACTER + "/walk/1.png",

	// DIE
		"img/game/gerard/" + CHARACTER + "/die/1.png",
		"img/game/gerard/" + CHARACTER + "/die/dead.png",
	
	// ANGEL
		"img/game/gerard/angel/1.png",
	
	// ELECTRICITY
		"img/game/electricity/1.png",

	// OBSTACLES
		"img/game/obstacles/bomb.png",
		"img/game/obstacles/cloud.png",
		"img/game/obstacles/flying_saucer.png",
		"img/game/obstacles/flying_saucer_invert.png",
		"img/game/obstacles/food_plus.png",
		"img/game/obstacles/food.png",
		"img/game/obstacles/gem.png",
		"img/game/obstacles/ghost.png",
		"img/game/obstacles/heart.png",
		"img/game/obstacles/lightning_stroke.png"
];

var FrameForImagesToPreload = document.querySelector("#frame-for-images-to-preload");

for (var i = 0; i < ImagesToPreload.length; i++) {
	var img = new Image();
	img.src = ImagesToPreload[i];

	FrameForImagesToPreload.appendChild(img);
}