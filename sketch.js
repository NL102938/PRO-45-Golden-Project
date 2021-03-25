var backgroundIMG, sea;
var fish, fishIMG;
var obstacleGroup;
var sharkIMG, fishHookIMG, plasticBottleIMG, plasticBagIMG;

function preload() {
  backgroundIMG = loadImage("sea.png");
  fishIMG = loadImage("fish.png");
  sharkIMG = loadImage("shark.png");
  fishHookIMG = loadImage("hook.png");
  plasticBottleIMG = loadImage("bottle.png")
  plasticBagIMG = loadImage("bag.png");
}

function setup() {
  createCanvas(1350,650);
  
  sea = createSprite(400,250,400,700);
  sea.addImage(backgroundIMG);
  sea.velocityX=-4;
  sea.position.x = width/2;
  sea.scale=1.5;

  fish = createSprite(200,200,0,0);
  fish.addImage(fishIMG);
  fish.scale=0.1;

  obstacleGroup = createGroup();
}

function draw() {
  background("blue");
  spawnObstacles();

  if(sea.position.x < 0){
    sea.position.x = width/2;
  }
  
  if (keyDown("LEFT_ARROW")){
    fish.position.x = fish.position.x - 5;
  }
  if (keyDown("RIGHT_ARROW")){
    fish.position.x = fish.position.x + 5;
  }
  if (keyDown("UP_ARROW")){
    fish.position.y = fish.position.y - 5;
  }
  if (keyDown("DOWN_ARROW")){
    fish.position.y = fish.position.y + 5;
  }

  drawSprites();
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(1350,300,10,40);
    obstacle.velocityX = -5;

    var rand = Math.round(random(1,4));
    switch (rand){
      case 1: obstacle.addImage(sharkIMG);
      obstacle.scale = 2;
      break;
      case 2: obstacle.addImage(fishHookIMG);
      obstacle.scale = 0.25;
      break;
      case 3: obstacle.addImage(plasticBottleIMG);
      obstacle.scale = 0.2;
      break;
      case 4: obstacle.addImage(plasticBagIMG);
      obstacle.scale = 0.1;
      break;
    }
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}