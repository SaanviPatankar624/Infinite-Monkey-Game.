var monkey , monkey_running,ground;
var banana ,bananaImage, obstacleImage ,obstacleGroup;
var backImage;
var FoodGroup;
var score;
var play = 1;
var end = 0;
var gameState = play;
player = [monkey];

function preload(){
  
  backImage = loadImage("jungle.jpg");
   monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 
}

function setup() {
  
  //creating background
    backgroundImage = createSprite(100,150,200,200);
    backgroundImage.addImage("moving",backImage);
    backgroundImage.velocityX = -4;
    backgroundImage.scale = 1;
    backgroundImage.x = backgroundImage.width/2;
    backgroundImage.visible = true;
    console.log(backgroundImage.x);
  
  //creating monkey
    monkey = createSprite(80, 290, 20, 20);
    monkey.addAnimation("moving", monkey_running);
    monkey.addAnimation("collided");
    monkey.scale = 0.2;
  
  //creating ground
    ground = createSprite(400, 370, 800, 10);
    ground.velocityX = -4;
    ground.visible = false;
    ground.x = ground.width/2;
    console.log(ground.x)

    invisibleGround = createSprite(400,370,800,10);
   invisibleGround.visible = false;
  
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;

  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
}

function draw() {
  createCanvas(500,400);
  background("255");
  
  if (gameState === play){
  
    if (ground.x < 0){
      ground.x = ground.width/2;     
    }
    
  if (backgroundImage.x<0){
      backgroundImage.x=backgroundImage.width/2;
      backgroundImage.velocityX = -4;
  }
    
    if (FoodGroup.isTouching(monkey)){
      score = score + 2;
      FoodGroup.destroyEach();
    
    switch(score){
    case 10: monkey.scale = 0.12;
            break;
    case 20: monkey.scale = 0.14;
            break;
    case 30: monkey.scale = 0.16;
            break;
    case 40: monkey.scale = 0.18;
            break;
   default: break;
 }

  }
  if (obstacleGroup.isTouching(monkey)){
      monkey.scale=0.2;
  }
  
  //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }
  
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    monkey.collide(ground);
    
     if(monkey.isTouching(obstacleGroup)){
       monkey.velocityY = 0;
  }
    
    if(monkey.isTouching(obstacleGroup)){
       monkey.destroy();
       obstacleGroup.destroyEach();
    //changing gamestate to end
       gameState = "end"
  }
  
  var survivalTime = 0;
      stroke("black");
      textSize(20);
      fill("black");
      text("Score: "+ score, 250, 50);
  
     //stroke("black");
     //textSize(20);
     // fill("black");
     //survivalTime = Math.ceil(frameCount/getFrameRate())
     // text("Survival Time: "+ survivalTime, 40, 50)
  
     camera.position.x = monkey.x;
     camera.position.y = displayWidth/2;


  obstacle();
  Food();
  
  drawSprites();
  }
  
      stroke("black");
      textSize(30);
      fill("red");
      text("Score: "+ score, 110, 50);
      
  if (gameState === "end"){
      stroke("yellow");
      textSize(40);
      fill("black");
      text("gameover",230,250);
  }
  
}

function Food(){
  if(World.frameCount % 80 === 0) {
     banana = createSprite(400,150,20,20);
     banana.addImage(bananaImage);
     banana.scale = 0.07
     banana.y = Math.round(random(100,200));
     banana.velocityX = -8;
     banana.setLifetime = 50;
    
     FoodGroup.add(banana);
   }
}

function obstacle(){
  if(frameCount % 300 === 0){
 var obstacle = createSprite(400,370,10,30);
     obstacle.addImage(obstacleImage);           
     obstacle.scale = 0.17;
     obstacle.velocityX = -6;
     obstacle.setLifetime = 50;
    
     obstacle.setCollider("circle",0,0,200);
   //obstacle.debug = true;

   //add each obstacle to the group
    obstacleGroup.add(obstacle);
     
  }
}