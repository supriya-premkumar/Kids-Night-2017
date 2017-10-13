window.addEventListener('resize', resize, false);

var island;
var audio;

var drawables = [];
var clouds = [];

var assets = [];
var cloudImages = [];
var yoshiImages = [];
var pYoshiImages = [];
var birdImages = [];
var smokeImages = [];
var titleImages = [];
var images = [];

var src = "http://www.unm.edu/~bmatthews1/hosted/just%20assets/";

var showTitle = false;

var json = {
	"names" : [
		"tall mountain", "medium mountain", "short mountain", "tower 1", "tower 2", "volcano", "large hill", "plateau",
		"turret", "fort", "small hill", "step stone", "shrub", "pit", "tree 1", "tree 2", "tree 3", "tree 4", "tree 5",
		"rock pile", "cloud", "cloud city", "trolly", "grass", "flower", "stone", "dot", "smoke", "bird", "yoshi", "pink_yoshi"
		],
	"objects" : [
		{"id": 0, "x": 137, "y": 118, "z":  0},

		{"id": 1, "x": 170, "y": 99, "z":   0},

		{"id": 2, "x": 130, "y": 164, "z":  0},
		{"id": 2, "x": 176, "y": 140, "z":  0},

		{"id": 3, "x": 179, "y": 71, "z":   -3},

		{"id": 4, "x": 90,  "y": 177, "z":  -3},

		{"id": 5, "x": 110, "y": 210, "z":  0},

		{"id": 6, "x": 167, "y": 174,  "z": -2},
		{"id": 6, "x": 202, "y": 112,  "z": -2},
		{"id": 6, "x": 147, "y": 56,   "z": -2},

		{"id": 7, "x": 138, "y": 199,  "z": 1},
		{"id": 7, "x": 93,  "y": 144,  "z": 1},

		{"id": 8, "x": 112, "y": 94,   "z": 2},
		{"id": 8, "x": 92,  "y": 95,   "z": 2},
		{"id": 8, "x": 93,  "y": 115,  "z": 2},
		{"id": 8, "x": 114, "y": 113,  "z": 2},

		{"id": 9, "x": 103, "y": 106,  "z": -1},
		{"id": 9, "x": 202, "y": 153,  "z": -1},

		{"id": 10, "x": 227, "y": 126, "z": 0},
		{"id": 10, "x": 188, "y": 168, "z": 0},
		{"id": 10, "x": 174, "y": 197, "z": 0},
		{"id": 10, "x": 120, "y": 45,  "z": 0},
		{"id": 10, "x": 144, "y": 31,  "z": 0},

		{"id": 11, "x": 102, "y": 82,  "z": 0},
		{"id": 11, "x": 100,  "y": 63,  "z": 0},
		{"id": 11, "x": 100, "y": 72,  "z": 0},
		{"id": 11, "x": 103, "y": 92,  "z": 0},
		{"id": 11, "x": 122, "y": 103, "z": 0},

		{"id": 12, "x": 162, "y": 208, "z": 0},

		{"id": 14, "x": 143, "y": 93,  "z": 0},
		{"id": 14, "x": 67,  "y": 86,  "z": 0},
		{"id": 14, "x": 51,  "y": 93,  "z": 0},
		{"id": 14, "x": 74,  "y": 110, "z": 0},
		{"id": 14, "x": 121, "y": 61,  "z": 0},
		{"id": 14, "x": 84,  "y": 85,  "z": 0},
		{"id": 14, "x": 86,  "y": 119, "z": 0},

		{"id": 15, "x": 169, "y": 55,  "z": 0},
		{"id": 15, "x": 160, "y": 74,  "z": 0},
		{"id": 15, "x": 204, "y": 82,  "z": 0},
		{"id": 15, "x": 204, "y": 63,  "z": 0},

		{"id": 16, "x": 47,  "y": 128, "z": 0},
		{"id": 16, "x": 106, "y": 178, "z": 0},
		{"id": 16, "x": 73,  "y": 212, "z": 0},
		{"id": 16, "x": 67,  "y": 217, "z": 0},
		{"id": 16, "x": 36,  "y": 129, "z": 0},
		{"id": 16, "x": 21,  "y": 130, "z": 0},
		{"id": 16, "x": 54,  "y": 167, "z": 0},
		{"id": 16, "x": 36,  "y": 152, "z": 0},

		{"id": 17, "x": 110, "y": 128, "z": 0},
		{"id": 17, "x": 98,  "y": 126, "z": 0},
		{"id": 17, "x": 84,  "y": 109, "z": 0},
		{"id": 17, "x": 128, "y": 97,  "z": 0},
		{"id": 17, "x": 62,  "y": 70,  "z": 0},
		{"id": 17, "x": 111, "y": 66,  "z": 0},
		{"id": 17, "x": 132, "y": 41,  "z": 0},
		{"id": 17, "x": 158, "y": 38,  "z": 0},
		{"id": 17, "x": 126, "y": 30,  "z": 0},

		{"id": 18, "x": 81,  "y": 203, "z": 0},
		{"id": 18, "x": 88,  "y": 218, "z": 0},
		{"id": 18, "x": 61,  "y": 184, "z": 0},
		{"id": 18, "x": 103, "y": 166, "z": 0},
		{"id": 18, "x": 78,  "y": 163, "z": 0},
		{"id": 18, "x": 58,  "y": 150, "z": 0},
		{"id": 18, "x": 38,  "y": 112, "z": 0},

		{"id": 20, "x": 170, "y": 119, "z": 73},
		{"id": 20, "x": 195, "y": 128, "z": 73},
		{"id": 20, "x": 120, "y": 151, "z": 74},
		{"id": 20, "x": 136, "y": 187, "z": 48},
		{"id": 20, "x": 145, "y": 80,  "z": 64},
		{"id": 20, "x": 162, "y": 159, "z": 64},

		{"id": 21, "x": 134, "y": 158, "z": 88},

		{"id": 23, "x": 217, "y": 73,  "z": 0},
		{"id": 23, "x": 199, "y": 90,  "z": 0},
		{"id": 23, "x": 216, "y": 105, "z": 0},
		{"id": 23, "x": 217, "y": 64,  "z": 0},
		{"id": 23, "x": 216, "y": 87,  "z": 0},
		{"id": 23, "x": 191, "y": 83,  "z": 0},
		{"id": 23, "x": 171, "y": 58,  "z": 0},
		{"id": 23, "x": 191, "y": 69,  "z": 0},
		{"id": 23, "x": 199, "y": 90,  "z": 0},

		{"id": 24, "x": 195, "y": 191, "z": 0},
		{"id": 24, "x": 199, "y": 204, "z": 0},
		{"id": 24, "x": 198, "y": 164, "z": 0},
		{"id": 24, "x": 204, "y": 176, "z": 0},
		{"id": 24, "x": 214, "y": 183, "z": 0},
		{"id": 24, "x": 213, "y": 139, "z": 0},
		{"id": 24, "x": 185, "y": 180, "z": 0},
		{"id": 24, "x": 186, "y": 207, "z": 0},
		{"id": 24, "x": 219, "y": 150, "z": 0},
		{"id": 24, "x": 228, "y": 169, "z": 0},
		{"id": 24, "x": 213, "y": 166, "z": 0},
		{"id": 24, "x": 205, "y": 133, "z": 0},

		{"id": 26, "x": 167, "y": 101, "z": 67},
		{"id": 26, "x": 163, "y": 104, "z": 67},
		{"id": 26, "x": 158, "y": 107, "z": 69},
		{"id": 26, "x": 154, "y": 110, "z": 71},
		{"id": 26, "x": 149, "y": 112, "z": 76},
		{"id": 26, "x": 143, "y": 115, "z": 80},
		{"id": 26, "x": 137, "y": 122, "z": 83},
		{"id": 26, "x": 137, "y": 125, "z": 83},
		{"id": 26, "x": 137, "y": 130, "z": 84},
		{"id": 26, "x": 137, "y": 136, "z": 85},
		{"id": 26, "x": 136, "y": 143, "z": 88},
		{"id": 26, "x": 136, "y": 149, "z": 91},
		{"id": 26, "x": 174, "y": 133, "z": 54},
		{"id": 26, "x": 174, "y": 126, "z": 55},
		{"id": 26, "x": 173, "y": 120, "z": 57},
		{"id": 26, "x": 172, "y": 114, "z": 59},
		{"id": 26, "x": 171, "y": 107, "z": 62},

		{"id": 27, "x": 110, "y": 210, "z": 30},

		{"id": 28, "x": 202, "y": 112, "z": 35},

		{"id": 29, "x": 164, "y": 214, "z": 0},

		{"id": 30, "x": 148, "y": 125, "z": 0}
	]
}


var cloudScale = 1;
var islandScale = 1;
var skyScale = 1;

var angle = 0;

var nWidth = 256;
var nHeight = 220;
var bSkyRatio = 93/220;

function preload(){
	island = loadImage(src + "island_floor.png");
	audio = new Audio(src + "title.mp3");
	audio.loop = true;
	audio.play();

	for (var i = 0; i < 27; i++){
		assets.push(loadImage(src + "asset" + i + ".png"));
	}

	for (var i = 1; i < 7; i++){
		cloudImages.push(loadImage(src + "bgcloud" + i + ".png"));
	}

	for (var i = 0; i < 5; i++){
		yoshiImages.push(loadImage(src + "yoshi" + i + ".png"));
	}

	for (var i = 0; i < 2; i++){
		pYoshiImages.push(loadImage(src + "pinkyoshi" + i + ".png"));
	}

	for (var i = 0; i < 8; i++){
		birdImages.push(loadImage(src + "bird" + i + ".png"));
	}

	for (var i = 0; i < 7; i++){
		smokeImages.push(loadImage(src + "smoke" + i + ".png"));
	}

	for (var i = 0; i < 16; i++){
		titleImages.push(loadImage(src + i + ".png"));
	}

	for (var i = 0; i < json.objects.length; i++){
		var d = json.objects[i];
		if (d.id < 27) drawables.push(new Deco(d.id, d.x, d.y, d.z));
		else if (d.id == 27){
			for (var j = 0; j < 3; j++){
				var s = new Smoke(d.x, d.y, d.z);
				s.index = j*2.33;
				drawables.push(s);
			}
		}
		else if (d.id == 28){
			drawables.push(new Bird(d.x, d.y, d.z));
		}
		else if (d.id == 29){
			drawables.push(new Yoshi(0, d.x, d.y, d.z));
		}
		else if (d.id == 30){
			drawables.push(new Yoshi(1, d.x, d.y, d.z));
		}
	}
}

function Position(x, y, z){
	this.x = x - 128;
	this.y = y - 128;
	this.z = z;

	this.angle = atan2(y, x);
	this.rad = sqrt(x*x + y*y);

	this.screenX = 0;
	this.screenY = 0;

	this.tick = function(){
		this.screenX = cos(this.angle + angle)*this.rad;
		this.screenY = sin(this.angle + angle)*this.rad;
	}
}

function Deco(i, x, y, z){
	this.img = assets[i];
	this.pos = new Position(x, y, z);

	this.render = function(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(-angle);
		scale(1, (10/4));
		image(this.img, 0, (-this.img.height - this.pos.z*2)/2);
		pop();
	}
}

function Bird(x, y, z){
	this.index = 0;
	this.pos = new Position(x, y, z);

	this.render = function(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(-angle);
		scale(1, (10/4));
		var xMod = sin(this.index*PI/16)*4*islandScale;
		var yMod = cos(this.index*PI/16)*4*islandScale;
		image(birdImages[floor(this.index)%8], xMod, (yMod-this.pos.z*2)/2);
		pop();
		this.index += .1;
		if (this.index >= 32) this.index -= 32;
	}
}

function Yoshi(t, x, y, z){
	this.index = 0;
	this.type = t;
	this.pos = new Position(x, y, z);

	this.render = function(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(-angle);
		scale(1, (10/4));
		if (this.type == 0){
			var a = (angle)%(PI*2);
			if (a < PI/8 || a > PI*(15/8)) image(yoshiImages[0], 0, 0);
			else if (a < PI*(3/8)) image(yoshiImages[1], 0, 0);
			else if (a < PI*(5/8)) image(yoshiImages[2], 0, 0);
			else if (a < PI*(13/8)) image(yoshiImages[3], 0, 0);
			else if (a < PI*(15/8)) image(yoshiImages[4], 0, 0);
		}
		if (this.type == 1){
			scale(.25, .25);
			image(pYoshiImages[floor(this.index)], 0, -3)
		}
		this.index += .05;
		if (this.index >= 2) this.index -=2;
		pop();
	}
}

function Smoke(x, y, z){
	this.index = 0;
	this.pos = new Position(x, y, z);

	this.render = function(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(-angle);
		scale(1, (10/4));
		image(smokeImages[floor(this.index)], sin(this.index) - .5, (-this.index*10 -this.pos.z*2)/2);
		pop();
		this.index += .05;
		if (this.index >= 7) this.index -= 7;
	}
}

function Cloud(){
	this.index = floor(random()*cloudImages.length);
	if (random() < .4) this.index = 1;
	this.img = cloudImages[this.index];
	this.x = -this.img.width;
	this.y = 93 - this.img.height;
	if (this.index == 1) this.y = random()*60;

	this.speed = random()/2 + .1;

	this.tick = function(){
		this.x += this.speed;
	}

	this.render = function(){
		push();
		scale(cloudScale, cloudScale);
		image(this.img, this.x, this.y);
		pop();
	}
}

function setup(){
  createCanvas();
  colorMode(HSB, 360, 100, 100, 100);
  ellipseMode(CENTER);
  noStroke();
  noSmooth();

  resize();
}

function draw(){
  background(211, 83, 58);
  fill(196, 48, 100);
  rect(0, 0, width, height*skyScale);

  for (var i = 0; i < clouds.length; i++){
	  clouds[i].tick();
	  clouds[i].render();
	  if (clouds[i].x > width/cloudScale){
		  clouds.splice(i, 1);
		  i--;
	  }
  }

  if (clouds.length < 20 && random() < .05){
	  clouds.push(new Cloud());
  }
  push();

  translate(width/2, height*.7);
  angle = frameCount/200;
  imageMode(CENTER);
  scale(islandScale, islandScale*.4);
  push();
  rotate(angle);
  image(island, 0, 0);
  pop();

  rotate(angle);
  for (var i = 0; i < drawables.length; i++){
	drawables[i].pos.tick();
  }

  drawables.sort(function(a, b){
	if (a.pos.screenY > b.pos.screenY) return 1;
	else if (a.pos.screenY < b.pos.screenY) return -1;
	else if (a.pos.screenX > b.pos.screenX) return 1;
	return -1;
  });

  for (var i = 0; i < drawables.length; i++){
	drawables[i].render();
  }
  pop();



  if (showTitle){
	  push();
	  translate(width/2, height*.2);
	  scale(islandScale, islandScale);
	  imageMode(CENTER);
	  if (floor(frameCount/8)%32 < 16) image(titleImages[0], 0, 0);
	  else image(titleImages[floor(frameCount/8)%16], 0, 0);
	  pop();
  }
}

// function mousePressed(){
// 	showTitle ^= true;
// }

function resize(){
	resizeCanvas(window.innerWidth, window.innerHeight);

	if (width > height){
		islandScale = height/nHeight;
		cloudScale = islandScale;
		skyScale = bSkyRatio;
	} else {
		islandScale = width/nWidth;
	}

	clouds = [];
	for (var i = 0; i < 20; i++){
		var c = new Cloud();
		c.x = random()*width/cloudScale;
		clouds.push(c);
	}
}
