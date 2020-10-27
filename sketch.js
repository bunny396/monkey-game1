
var monkey , monkey_running
var ground1 , ground2 ,bg
var banana ,bananaImage, obstacle, obstacleImage
var restartImg;
var FoodGroup, obstacleGroup
var score = 0;
var bananaGroup,obstacleGroup
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survival=0;
var collect,over;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bg = loadImage("fobg.png");
 restartImg = loadImage("restart.png");
  collect = loadSound("collect.mp3");
  over = loadSound("gameover.mp3")
}



function setup() {
  createCanvas(600,400)
  
  
  
  ground1 = createSprite(10,200);
  ground1.addImage(bg);
  ground1.scale =  0.28;
  ground1.velocityX = -4;

  
  monkey = createSprite(80,344,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  
  ground2 = createSprite(400,380,900,10);
  ground2.velocityX = -4;
  ground2.x = ground2.width/2;
  ground2.visible = false;
  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
  
  restart = createSprite(300,190);
  restart.addImage(restartImg);
  restart.scale = 0.5;

}


function draw() {
  background("white");
  
 if(gameState === PLAY){

   restart.visible = false;
  
  if(ground1.x <100){
      ground1.x = 300;
    }
   
   ground1.velocityX = -4;
   ground2.velocityX = -4;
  
   survival= survival + Math.round(getFrameRate()/60);
   //survival=Math.ceil(frameCount/frameRate());
   
   console.log(monkey.scale);
   
  if(ground2.x<0){
  ground2.x = ground2.width/2;
  }
  
  //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -10;
    }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
   
  food();
  rock();
   
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    collect.play();
    score = score+2;
    
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
   
   if(monkey.isTouching(obstaclesGroup)){
     gameState = END;
     over.play();
   }
   
 }
  else if (gameState === END) {
    ground1.velocityX = 0;
    ground2.velocityX = 0;
    monkey.velocityY = 0;
    
    restart.visible = true;
    
//set lifetime of the game objects so that they are never destroyed
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
     
    bananaGroup.setVelocityXEach(0); 
     obstaclesGroup.setVelocityXEach(0);
    
   
  if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  monkey.collide(ground2);
  
  

  drawSprites();
  
  //displaying score
  stroke("black");
  fill("black");
  textSize(18);
  text("Score : "+ score, 500,50);
  text("Survival time :"+survival,200,50);
}

function food(){
  
  if(frameCount%80===0){
    banana = createSprite(600,165,10,40);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    banana.lifetime = 80;
    banana.y= Math.round(random(120, 200)); 
    
    bananaGroup.add(banana);
  }
}

function rock(){
  if(frameCount%300===0){
    
    obstacle=createSprite(400,345,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale=0.16;
    obstacle.lifetime=150;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  bananaGroup.destroyEach();
  obstaclesGroup.destroyEach();
  score = 0;
  survival=0;
  monkey.scale = 0.1
  
}