var chalk;
var fontDiner;
var grid;
var myfloor;
var angle = 0;
var bkgMusic
var catPos;
var myState = 0;
var timer = 0;
var myLegs, myBody, head;
var mice = [];
var pieces = [];
var direction = [];
var stomachX = 65;
var stomachY = 214;
var start;
var win;
var lose;
var winSound;
var loseSound;
//------------------------------------------------------var end
//------------------------------------------------------preload
function preload() {
  myLegs = loadImage('assets/legs.png');
  myBody = loadImage('assets/body.png')
  head = loadImage('assets/head_1.png');
  grid = loadImage('assets/grid.png');
  myfloor = loadImage('assets/woodFloor.jpg');
  start = loadImage('assets/start.png');
  win = loadImage('assets/winCat.png');
  lose = loadImage('assets/loss.png')
  mice[0] = loadImage('assets/mice1.png');
  mice[1] = loadImage('assets/mice2.png');
  mice[2] = loadImage('assets/mice3.png');
  mice[3] = loadImage('assets/mice4.png');
  mice[4] = loadImage('assets/mice3.png');
  mice[5] = loadImage('assets/mice2.png');
  bkgMusic = loadSound('assets/456797__anechoix__jazz-music-loop.mp3');
  winSound = loadSound('assets/396174__funwithsound__success-triumph-resolution-sound-effect_01.mp3')
  loseSound = loadSound('assets/174427__badly99__domino-sound-effect_01.mp3')

  bkgMusic.loop();
  bkgMusic.stop();
  winSound.play();
  winSound.stop();
  loseSound.play();
  loseSound.stop();


}
//------------------------------------------------------preload end

//-----------------------------------------------------------setup
function setup() {

  createCanvas(1080, 720);
  angleMode(DEGREES);
  fontDiner = loadFont('assets/FontdinerSwanky-Regular.ttf');
  chalk = loadFont('assets/Chalkboard.ttc');
  montMed = loadFont('assets/Montserrat-Medium.ttf');
  grid = loadImage('assets/grid.png');
  bkgMusic.play();





  //--------------------------Spawn mice
  for (var i = 0; i < 30; i++) {
    pieces.push(new Piece());
  }
  //---------------------------spawn end
  catPos = createVector(width / 2, height / 2);
  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);
}
//------------------------------------------------end setup

//-------------------------------------------------------------draw
function draw() {
  image(myfloor, width / 2, height / 2);


  textFont(fontDiner);


  switch (myState) {

    case 0:
      bkgMusic.play();
      myState = 1;
    case 1:
      fill(0);
      textSize(80);
      textAlign(CENTER);
      text("Let's Hunt Mice!", width / 2, 120);
      image(start, width / 2, height / 2 + 30);
      winSound.stop();
      loseSound.stop();
      textSize(40);
      textFont(montMed);
      text("Click to Start Game", width / 2, height - 35);


      break;

    case 2:
      game();
      timer++;
      if (timer > 1000) {
        myState = 5;
        timer = 0;
      } // the game state
      break;

    case 3:
      winSound.play();
      bkgMusic.stop();
      myState = 4;
      break;

    case 4: // the win state
      fill(0);
        textFont(fontDiner);
      textSize(60);
      textAlign(CENTER);
      text("Hee...Hee!       WE WON!", width / 2 - 15, 120);
      image(win, width / 2, height / 2);
      textSize(40);
      textFont(montMed);
      text("Click to Reset Game", width / 2, height - 35);

      break;

    case 5:
      bkgMusic.stop();
      loseSound.play();
      myState = 6;
      break;

    case 6: // the lose state
      fill(0);
      textFont(fontDiner);
      textSize(60);
      textAlign(CENTER);
      text("uh...oh!", width / 2, 120);
      image(lose, width / 2, 400);
      textSize(40);
      textFont(montMed);
      text("Click to Reset Game", width / 2, height - 35);


      break;
  }
}
//----------------------------------------------------end draw
//----------------------------------------------------mouseReleased
function mouseReleased() {
  switch (myState) {
    case 1:
      myState = 2;
      break;
    case 4:
      resetTheGame();
      myState = 0;
      break;
    case 6:
      resetTheGame();
      myState = 0;
      break;
  }
}
//---------------------------------------------------end mouseReleased


//----------------------------------------------------mice class!!
function Piece() {
  //----attributes
  this.pos = createVector(width - 50, height - 50);
  this.vel = createVector(random(-6, 6), random(-6, 6));
  this.miceNum = 0;
  this.timer = 0;
  this.maxTimer = (1, 10);

  //----- methods
  // display

  this.display = function() {
    //  translate(p5.Vector.fromAngle(millis() / 1000, 40));

    push();
    // animating the mices
    if (this.vel > 0) map(this.maxTimer * -1 === this.vel.mag());
    if (this.vel < 0) map(this.maxTimer === this.vel.mag());
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    image(mice[this.miceNum], 0, 0);
    this.timer++;


    if (this.timer > this.maxTimer) {
      this.miceNum = this.miceNum + 1;
      this.timer = 0;

    }


    //mice reset
    if (this.miceNum > mice.length - 1) {
      this.miceNum = 0;
    }


    pop();

  }
  //drive
  this.drive = function() {
    this.pos.add(this.vel);

    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;

  }

}

//--------------------------------------------------------end pieces class
//------------------------------------------------------mouse keyPressed
function mousePressed() {
  xOffset = mouseX - catPos.x;
  yOffset = mouseY - catPos.y;
}
//----------------------------------------------------mouse keyPressed end

//-----------------------------------------------------mouseDragged
function mouseMoved() {

  catPos.x = mouseX - xOffset;
  catPos.y = mouseY - yOffset;

  if (mouseX + 1 > 1)
    push();
  translate(catPos.x, catPos.y);

  rotate(angle);
  cat(catPos.x, catPos.y);
  angle -= 10;
  pop();

}


//---------------------------------------------------------reset the game
function resetTheGame() {
  pieces = [];
  //--------------------------Spawn cars
  for (var i = 0; i < 30; i++) {
    pieces.push(new Piece());
  }
  timer = 0;
  stomachX = 65;

}
//----------------------------------------------------------end game reset

//------------------------------------------------------------ game
function game() {
  for (var i = 0; i < pieces.length; i++) {
    pieces[i].display();
    pieces[i].drive();
    if (pieces[i].pos.dist(catPos) < 100) {
      pieces.splice(i, 1);
      stomachX += 3;
    }
  }

  if (pieces.length == 0) {
    myState = 3;
    timer = 0;
  }
  push();

  translate(catPos.x - 100, catPos.y - 65);

  cat();
  pop();

}
//------------------------------------------------------------ game end


//--------------------------------------------------------------cat function
function cat() {
  push();
  image(myLegs, 100, 165);
  image(myBody, 104, 209, stomachX, stomachY);
  image(head, 105, 226);

  pop();
}
