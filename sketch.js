//Create variables here
var dog,dogimg,dogimg1;
var database;
var food,foodStock;
function preload()
{
	//load images here
  dogimg = loadImage("images/dogImg.png");
  dogimg1 = loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();

  dog = createSprite(250, 300, 150, 150);
  dog.addImage(dogimg);
  dog.scale= 0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);

}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){

    writeStock(food)
    dog.addImage(dogimg1);

  }
  drawSprites();
  //add styles here
  fill(255,255,254);
  stroke("black");
  textSize(20)
  text("Food remaining :" +food,170,200);
  textSize(20);
  text("NOTE: Press (UP ARROW KEY) to feed the dog.", 10,30);

}
function readStock(data){

  food=data.val();
}
function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1;
  }
database.ref('/').update({
  food:x
})
}