var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png","ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(300, 300, 1, 1);
  ghost.addAnimation("jump",ghostImg);
  ghost.scale = 0.45;
  ghost.debug = true;
  ghost.setCollider("rectangle", -20, 20, 80, 200);
}

function draw() {
  background("black");
  if (gameState === "play") {
    console.log(frameCount);

    if (tower.y > 400) {
      tower.y = 300
    }

    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 5;
    }

    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 5;
    }

    if (keyDown("space")) {
      ghost.velocityY = -5;
    }

    ghost.velocityY = ghost.velocityY + 0.5;

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y >= 600) {
      ghost.destroy();
      gameState = "end";
    }



    spawnDoors();

    drawSprites();
  }
else if(gameState === "end"){
  stroke("black");
  strokeWeight(7);
  fill ("red");
  textSize(30);
  text("You Died", 240,300);
  textSize(20);
  text("Mwahaha", 260,350);
}

}

function spawnDoors() {
  if (frameCount % 250 == 0) {
    door = createSprite(Math.round(random(100, 500)), -65, 1, 1);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 600;
    doorsGroup.add(door);

    climber = createSprite(door.x, door.y + 60, 1, 1);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 600;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(door.x, climber.y + 10, 100, 3);
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 600;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = true;

    ghost.depth = door.depth;
    ghost.depth += 1;
  }
}

