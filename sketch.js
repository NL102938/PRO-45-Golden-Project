var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backgroundIMG, sea;
var fish, fishIMG;
var obstacleGroup, obstacle, gameOver, restart;
var sharkIMG, fishHookIMG, plasticBottleIMG, plasticBagIMG, gameOverIMG, restartIMG;
var score;

function preload() {
  backgroundIMG = loadImage("sea.png");
  fishIMG = loadImage("fish.png");
  sharkIMG = loadImage("shark.png");
  fishHookIMG = loadImage("hook.png");
  plasticBottleIMG = loadImage("bottle.png")
  plasticBagIMG = loadImage("bag.png");
  gameOverIMG = loadImage("gameOver.png");
  restartIMG = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  score = 0;
  
  sea = createSprite(0,height-400,400,700);
  sea.addImage(backgroundIMG);
  sea.velocityX=-4;
  sea.position.x = width/2;
  sea.width=5;
  sea.height=5;

  fish = createSprite(200,200,0,0);
  fish.addImage(fishIMG);
  fish.scale=0.05;

  gameOver = createSprite(675, 300, 100, 20);
  gameOver.addImage(gameOverIMG);

  restart = createSprite(675,400,100,20);
  restart.addImage(restartIMG);
  restart.scale = 0.5;

  obstacleGroup = createGroup();
}

function draw() {
  background("blue");
  gameOver.visible = false;
  restart.visible = false;

  sea.velocityX=-4;;
  
  if(gameState === PLAY){
  spawnObstacles();
  score = score + Math.round(getFrameRate()/60);
  if(sea.position.x < 0){
    sea.position.x = width/2;
  }
  
  if (keyDown("LEFT_ARROW")){
    fish.position.x = fish.position.x - 5;
  }
  if(keyDown("RIGHT_ARROW")){
    fish.position.x = fish.position.x + 5;
  }
  if(keyDown("UP_ARROW")){
    fish.position.y = fish.position.y - 5;
  }
  if(keyDown("DOWN_ARROW")){
    fish.position.y = fish.position.y + 5;
  }

  if(fish.isTouching(obstacleGroup)){
    gameState = END;
  }
}

if(gameState === END){
  obstacle.velocityX = 0;
  sea.velocityX = 0;
  obstacleGroup.lifetime -= 1;
  gameOver.visible = true;
  restart.visible = true;

  if(mousePressedOver(restart)) {
    reset();
  }
}
drawSprites();
textSize(20);
fill("black")
text("Score: "+ score, 1200,50);
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(1350,300,10,40);
    obstacle.velocityX = -5;

    var rand = Math.round(random(1,4));
    switch (rand){
      case 1: obstacle.addImage(sharkIMG);
      obstacle.scale = 1;
      break;
      case 2: obstacle.addImage(fishHookIMG);
      obstacle.scale = 0.2;
      break;
      case 3: obstacle.addImage(plasticBottleIMG);
      obstacle.scale = 0.2;
      break;
      case 4: obstacle.addImage(plasticBagIMG);
      obstacle.scale = 0.05;
      break;
    }
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstacleGroup.destroyEach();
}
