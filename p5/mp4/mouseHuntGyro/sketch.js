//-------------------------------------------------------gyro variables
var alpha, beta, gamma; // orientation data
var myLegs, myBody, head;
var xPosition = 0;
var yPosition = 0;
var x = 0; // acceleration data
var y = 0;
var z = 0;

// var pstate1 = false;
// var pstate2 = false;
// var alreadyTouched = false;
//-----------------------------------------------------------gyro variables end

//-----------------------------------------------------------Mouse hunt variable
var chalk;
var fontDiner;
var grid;
var myfloor;
var angle = 0;
var bkgMusic;
var catPos;
var myState = 0;
var timer = 0;

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

//------------------------------------------------------------mouse hunt var end
//------------------------------------------------------preload
function preload() {
  myLegs = loadImage('assets/legs.png');
  myBody = loadImage('assets/body.png')
  head = loadImage('assets/head_1.png');
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
  winSound = loadSound('assets/396174__funwithsound__success-triumph-resolution-sound-effect_01.mp3');
  loseSound = loadSound('assets/174427__badly99__domino-sound-effect_01.mp3');

  bkgMusic.loop();
  bkgMusic.stop();
  winSound.play();
  winSound.stop();
  loseSound.play();
  loseSound.stop();


}
//------------------------------------------------------preload end


function setup() {

  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  // deviceOrientation(LANDSCAPE);
  fontDiner = loadFont('assets/FontdinerSwanky-Regular.ttf');
  bkgMusic.play();
  // requestT() ;

  // initialize accelerometer variables
  alpha = 0;
  beta = 0;
  gamma = 0;


  //--------------------------Spawn mice
  for (var i = 0; i < 20; i++) {
    pieces.push(new Piece());
  }
  //---------------------------spawn end
  catPos = createVector(width / 2, height / 2);
  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);

}
//------------------------------------------------end setup


//---------------------------------------------------draw
function draw() {

  image(myfloor, width / 2, height / 2, windowWidth, windowHeight);

  textFont(fontDiner);
  xPosition = map(gamma, -60, 60, 0, width);
  yPosition = map(beta, -30, 30, 0, height);

  push(); // before you use translate, rotate, or scale commands, push and then pop after

  translate(xPosition, yPosition); // move everything over by x, y

  rotate(radians(alpha)); // using alpha in here so it doesn't feel bad

  cat();
  //  	rect(0, 0, 100, 100) ;
  pop();

  // the map command !!!!
  // takes your variable and maps it from range 1 to range 2
  // map(yourVar, range1_x, range1_y, range2_x, range2_y) ;
  // xPosition = map(gamma, -60, 60, 0, width);
  // yPosition = map(beta, -30, 30, 0, height);


  switch (myState) {

    case 0:
      bkgMusic.play();
      myState = 1;
    case 1:
      fill(0);
      textSize(80);
      textAlign(CENTER);
      text("Let's Hunt Mice!", width / 2, 180);
      image(start, width / 2, height / 2 + 30);
      winSound.stop();
      loseSound.stop();


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
      textSize(60);
      textAlign(CENTER);
      text("Hee..Hee!       WE WON!", width / 2 - 45, 180);
      image(win, width / 2, height / 2);

      break;

    case 5:
      bkgMusic.stop();
      loseSound.play();
      myState = 6;
      break;

    case 6: // the lose state
      fill(0);
      textSize(60);
      textAlign(CENTER);
      text("uh...oh!", width / 2, 180);
      image(lose, width / 2, 450);

      break;
  }
  // DECORATIONS
  // Just a bunch of text commands to display data coming in from addEventListeners
  textAlign(LEFT);
  textSize(20);
  fill('black');
  text("orientation data:", 25, 25);
  textSize(15);
  text("alpha: " + alpha, 25, 50);
  text("beta: " + beta, 25, 70);
  text("gamma: " + gamma, 25, 90);
  textSize(20);
  text("acceleration data:", 25, 125);
  textSize(15);


  text("x = " + x, 25, 150); // .toFixed means just show (x) decimal places
  text("y = " + y, 25, 170);
  text("z = " + z, 25, 190);
}
//----------------------------------------------------end draw

// Read in accelerometer data
window.addEventListener('deviceorientation', function(e) {
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
});


// accelerometer Data
window.addEventListener('devicemotion', function(e) {
  // get accelerometer values
  x = e.acceleration.x;
  y = e.acceleration.y;
  z = e.acceleration.z;
});

//----------------------------------------------------touch touchStarted
function touchStarted() {
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
//---------------------------------------------------touch touchStarted
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//---------------------------------------------------------- car class!!
function Piece() {
  //--------------------------attributes
  this.pos = createVector(width - 50, height - 50);
  this.vel = createVector(random(-6, 6), random(-6, 6));
  this.miceNum = 0;
  this.timer = 0;
  this.maxTimer = (1, 8);
  //-----------------------------methods

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


//---------------------------------------------------------reset the game
function resetTheGame() {
  pieces = [];
  //--------------------------Spawn cars
  for (var i = 0; i < 20; i++) {
    pieces.push(new Piece());
  }
  timer = 0;
  stomachX = 72;

}
//----------------------------------------------------------end game reset

//------------------------------------------------------------ game
function game() {
  for (var i = 0; i < pieces.length; i++) {
    pieces[i].display();
    pieces[i].drive();
    if (pieces[i].pos.dist(catPos) < 100) {
      pieces.splice(i, 1);
      stomachX += 5;
    }
  }

  if (pieces.length == 0) {
    myState = 3;
    timer = 0;
  }



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
