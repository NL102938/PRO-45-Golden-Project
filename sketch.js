var WIN = 2;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backgroundIMG, sea;
var fish, fishIMG;
var obstacleGroup, obstacle, gameOver, restart, win, morol;
var sharkIMG, fishHookIMG, plasticBottleIMG, plasticBagIMG, gameOverIMG, restartIMG, winIMG, morolIMG;
var score;

function preload() {
  backgroundIMG = loadImage("images/sea.png");
  fishIMG = loadImage("images/fish.png");
  sharkIMG = loadImage("images/shark.png");
  fishHookIMG = loadImage("images/hook.png");
  plasticBottleIMG = loadImage("images/bottle.png")
  plasticBagIMG = loadImage("images/bag.png");
  gameOverIMG = loadImage("images/gameOver.png");
  restartIMG = loadImage("images/restart.png");
  winIMG = loadImage("images/win.png");
  morolIMG = loadImage("images/morol.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  score = 0;
  
  sea = createSprite(window-10, height-1000, 400, 700);
  sea.addImage(backgroundIMG);
  sea.velocityX = -(6 + 3*score/100);
  sea.position.x = width;
  sea.scale = 4;

  fish = createSprite(200, 200, 0, 0);
  fish.addImage(fishIMG);
  fish.scale=0.05;

  gameOver = createSprite(675, 300, 100, 20);
  gameOver.addImage(gameOverIMG);

  restart = createSprite(675, 400, 100, 20);
  restart.addImage(restartIMG);
  restart.scale = 0.5;

  win = createSprite(675, 250, 100, 20);
  win.addImage(winIMG);

  morol = createSprite(675, 150, 100, 20);
  morol.addImage(morolIMG);
  morol.scale=0.4;

  obstacleGroup = new Group();
}

function draw() {
  background("blue");
  gameOver.visible = false;
  restart.visible = false;
  win.visible = false;
  morol.visible = false;

  sea.velocityX = -4;;
  
  if(gameState === PLAY){
  spawnObstacles();
  obstacleGroup.velocityX = -5;

  score = score + Math.round(getFrameRate()/60);
  if(sea.position.x < 0){
    sea.position.x = width;
  }
  
  if (keyDown("LEFT_ARROW") || keyDown("a")){
    fish.position.x = fish.position.x - 5;
  }
  if(keyDown("RIGHT_ARROW") || keyDown("d")){
    fish.position.x = fish.position.x + 5;
  }
  if(keyDown("UP_ARROW") || keyDown("w")){
    fish.position.y = fish.position.y - 5;
  }
  if(keyDown("DOWN_ARROW") || keyDown("s")){
    fish.position.y = fish.position.y + 5;
  }

  if(fish.isTouching(obstacleGroup)){
    gameState = END;
  }

  if(score > 4999){
    gameState = WIN;
  }
}

if(gameState === END){
  obstacleGroup.setVelocityXEach(0);
  sea.velocityX = 0;
  obstacleGroup.lifetime = -1;
  gameOver.visible = true;
  restart.visible = true;
  morol.visible = true;

  if(mousePressedOver(restart)) {
    reset();
    score = 0;
  }
}

if(gameState === WIN){
  obstacleGroup.setVelocityXEach(0);
  sea.velocityX = 0;
  obstacleGroup.lifetime = -1;
  win.visible = true;
  restart.visible = true;
  morol.visible = true;

  if(mousePressedOver(restart)) {
    reset();
    score = 0;
  }
}

drawSprites();
textSize(20);
fill("black")
text("Score: "+ score, width-150,50);
}

function spawnObstacles(){
  if(frameCount % 200 === 0){
    obstacle = createSprite(1350, 300, 10, 40);
    obstacle.position.y = random(windowHeight - windowHeight, windowHeight);
    obstacle.velocityX = -(6 + 3*score/100);

    var rand = Math.round(random(1, 4));
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
