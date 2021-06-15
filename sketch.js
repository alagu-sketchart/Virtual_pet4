 var dog, happyDog, Standdog;
 var foodObj, foodS, foodStock;
 var FeedTime, lastFed, feed, addFood;
 var database;
 
 function preload(){
   //load images here
   Standdog = loadImage("dog.png")
   happyDog = loadImage("Happydog.png")
 }
 
 function setup() {
    createCanvas(1000,500);
    foodObj = new Food();
    dog = createSprite(750,200,10,10);    
    dog.addImage(Standdog)
    dog.scale = 0.25

    database = firebase.database();
    foodStock = database.ref('food');
    foodStock.on("value",readStock);  

    feed = createButton("Feed the dog");
    feed.position(700,100);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(800,100);
    addFood.mousePressed(addFoods)
 }
 
 function draw() {  
 background(50, 140, 85);

 foodObj.display();

 Feedtime = database.ref('Feedtime');
 Feedtime.on("value", function(data){
 lastFed = firebase.time();
 })
  
   //add styles here
   textSize(15);
   fill("white")
   if(lastFed >= 12){
     text("Last Fed: " + lastFed %12 + "PM", 350,40);
   }
   else if(lastFed == 0){
     text("Last Fed: 12 AM", 350, 30);
   }else{
     text("Last Fed: "+ lastFed + "AM", 350,40);
   }
   drawSprites();
 }
 
 function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
 }
 
 function feedDog(){
   dog.addImage(happyDog);
   
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
     Food: foodObj.getFoodStock(),
     FeedTime: hour()
   })
 }

 function addFoods(){
  foodObj.updateFoodStock(foodObj.getFoodStock()+1);
   database.ref('/').update({
     Food: foodS
   })
 }