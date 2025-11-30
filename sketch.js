let canvasW = 900;
let canvasH = 700;

let centerX = canvasW/2;
let centerY = canvasH/2;

let collageX = 75;
let collageY = 125;
let collageW = 750;
let collageH = 375;

let gridSize = 75;

let titleBg, collageBg, frame, popupBg;
let bgMusic;
let AliceFont;
let correctSound, incorrectSound, buttonSound;

let primaryColor = "#595643";
let secondaryColor = "#F6F2E6";

let screen = "title";
let firstTime = true;
let gameEnd = false;
let endTime;

let titlePlayBtn, instructionsPlayBtn, statsPlayBtn, endPlayBtn;
let linkW, labelH;

let instructionsOpen = false;
let statsOpen = false;
let audioOpen = false;

let instructionsImg, statsImg, audioImg;
let instructionsIcon, statsIcon, audioIcon;

let soundToggle, musicToggle;
let soundOn = true;
let musicOn = true;

let zenMusic, panicMusic, pirateMusic;
let zenImg, panicImg, pirateImg;
let zenBtn, panicBtn, pirateBtn;
let musicSelection = "zen";

let stopwatch;

let timesPlayed = 0;
let gameTimes = [];

let objectImgs = [];
let objectPaths = [
  "objects/obj1.png",
  "objects/obj2.png",
  "objects/obj3.png",
  "objects/obj4.png",
  "objects/obj5.png",
  "objects/obj6.png",
  "objects/obj7.png",
  "objects/obj8.png",
  "objects/obj9.png",
  "objects/obj10.png",
  "objects/obj11.png",
  "objects/obj12.png",
  "objects/obj13.png",
  "objects/obj14.png",
  "objects/obj15.png",
  "objects/obj16.png",
  "objects/obj17.png",
  "objects/obj18.png",
  "objects/obj19.png",
  "objects/obj20.png",
  "objects/obj21.png",
  "objects/obj22.png",
  "objects/obj23.png",
  "objects/obj24.png",
  "objects/obj25.png",
  "objects/obj26.png",
  "objects/obj27.png",
  "objects/obj28.png",
  "objects/obj29.png",
  "objects/obj30.png",
  "objects/obj31.png",
  "objects/obj32.png",
  "objects/obj33.png",
  "objects/obj34.png",
  "objects/obj35.png",
  "objects/obj36.png",
  "objects/obj37.png",
  "objects/obj38.png",
  "objects/obj39.png",
  "objects/obj40.png",
  "objects/obj41.png",
  "objects/obj42.png",
  "objects/obj43.png",
  "objects/obj44.png",
  "objects/obj45.png",
  "objects/obj46.png",
  "objects/obj47.png",
  "objects/obj48.png",
  "objects/obj49.png",
  "objects/obj50.png"
];
let objects = [];

let searchObjects = [];

let totalFound = 0;

// play button class
class Button {
  constructor (x, y, w, h, style, message) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.style = style;
    this.message = message
  }
  
  display() {
    // check for hover
    let hover = this.isHovering();
    
    // container (based on style)
    if (hover) {
      if (this.style === "light") {
        fill(secondaryColor);
      }
      else if (this.style === "dark") {
        fill(primaryColor);
      }
    }
    else {
      if (this.style === "light") {
        noFill();
        stroke(secondaryColor);
      }
      else if (this.style === "dark") {
        noFill();
        stroke(primaryColor);
      }
    }
    
    rectMode(CENTER);
    strokeWeight(1);
    
    rect(this.x, this.y, this.w, this.h);
    
    // text (based on style)
    if (hover) {
      if (this.style === "light") {
        fill(primaryColor);
      }
      else if (this.style === "dark") {
        fill(secondaryColor);
      }
    }
    else {
      if (this.style === "light") {
        fill(secondaryColor);
      }
      else if (this.style === "dark") {
        fill(primaryColor);
      }
    }
    
    textAlign(CENTER, CENTER);
    textSize(18);
    strokeWeight(0);
    
    text(this.message, this.x, this.y);
  }
  
  // checks for hovering, returns bool
  isHovering() {
    return (
      mouseX >= this.x - this.w/2 &&
      mouseX <= this.x + this.w/2 &&
      mouseY >= this.y - this.h/2 &&
      mouseY <= this.y + this.h/2
    );
  }
  
  // for mouseClicked()
  clicked() {
    return this.isHovering();
  }
}

// music style button
class MusicButton {
  constructor (x, y, w, h, message, icon, selected) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.message = message
    this.icon = icon
    this.selected = selected
  }
  
  display() {
    // border changes based on selected music style
    if (this.selected) {
      strokeWeight(1);
    }
    else {
      let hover = this.isHovering();
      
      if (hover) {
        strokeWeight(1);
      }
      else {
        strokeWeight(0);
      }
    }
    
    // container
    rectMode(CENTER);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    
    // icon
    imageMode(CENTER);
    image(this.icon, this.x, this.y-15, 40, 40);
    
    // text
    textAlign(CENTER, CENTER);
    fill(primaryColor);
    strokeWeight(0);
    textSize(12);
    text(this.message, this.x, this.y+25, this.w);
    
  }
  
  // checks for hovering, returns bool
  isHovering() {
    return (
      mouseX >= this.x - this.w/2 &&
      mouseX <= this.x + this.w/2 &&
      mouseY >= this.y - this.h/2 &&
      mouseY <= this.y + this.h/2
    );
  }
  
  // for mouseClicked()
  clicked() {
    return this.isHovering();
  }
}

// gui icon class
class Icon {
  constructor (x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
  }
  
  display() {
    imageMode(CORNER);
    image(this.img, this.x, this.y, this.w, this.h);
  }
  
  // checks for hovering, returns bool
  isHovering() {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.w &&
      mouseY >= this.y &&
      mouseY <= this.y + this.h
    );
  }
  
  // for mouseClicked()
  clicked() {
    return this.isHovering();
  }
}

// toggle class (for audio settings)
class Toggle {
  constructor (x, y, w, h, toggleOn) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.toggleOn = toggleOn;
  }
  
  display() {   
    // switched on
    if (this.toggleOn) {
      strokeWeight(0);
      fill(primaryColor);
      rect(this.x, this.y, this.w, this.h, 100);
      
      strokeWeight(0);
      fill(secondaryColor);
      circle(this.x+10, this.y, 20);
    }
    // switched off
    else {
      strokeWeight(0);
      fill("#C4BFA9");
      rect(this.x, this.y, this.w, this.h, 100);
      
      strokeWeight(0);
      fill(secondaryColor);
      circle(this.x-10, this.y, 20);
    }
  }
  
  // checks for hovering, returns bool
  isHovering() {
    return (
      mouseX >= this.x - this.w/2 &&
      mouseX <= this.x + this.w/2 &&
      mouseY >= this.y - this.h/2 &&
      mouseY <= this.y + this.h/2
    );
  }
  
  // for mouseClicked()
  clicked() {
    return this.isHovering();
  }
}

// stopwatch class
class Stopwatch {
  constructor () {
    this.startTime = 0;
    this.running = false;
    this.elapsed = 0;
  }
  
  // starts stopwatch
  start() {
    if (!this.running) {
      this.startTime = millis() - this.elapsed;
      this.running = true;
    }
  }
  
  // stops stopwatch
  stop() {
    if (this.running) {
      this.elapsed = millis() - this.startTime;
      this.running = false;
    }
  }
  
  // resets stopwatch to 0
  reset() {
    this.elapsed = 0;
    this.startTime = 0;
    this.running = false;
  }
  
  // updates stopwatch for display
  update() {
    if (this.running) {
      this.elapsed = millis() - this.startTime;
    }
  }
  
  // returns time
  getTime() {
    return this.elapsed;
  }
  
  // formats ms => 00:00 string for display 
  formatTime() {
    let totalSeconds = Math.floor(this.elapsed / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    
    return nf(minutes, 2) + ":" + nf(seconds, 2);
  }
  
  display(x, y) {
    fill(primaryColor);
    strokeWeight(0);
    textAlign(CENTER, CENTER);
    textSize(28);
    text(this.formatTime(), x, y);
  }
}

// collage object class (the hidden objects)
class CollageObject {
  constructor (x, y, w, h, img, found) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.found = found;
  }
  
  // returns image
  getImg() {
    return this.img;
  }
  
  // returns if object was found
  markFound() {
    this.found = true;
  }
  
  display() {
    // displays if not found
    if (!this.found) {
      imageMode(CORNER);
      image(this.img, this.x, this.y, this.w, this.h);
    }
  }
  
  // checks for hovering, returns bool
  isHovering() {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.w &&
      mouseY >= this.y &&
      mouseY <= this.y + this.h
    );
  }
  
  // for mouseClicked()
  clicked() {
    return this.isHovering();
  }
}

function preload() {
  correctSound = loadSound("audio/correct.mp3");
  incorrectSound = loadSound("audio/incorrect.mp3");
  buttonSound = loadSound("audio/button.mp3");
  
  zenMusic = loadSound("audio/zenMusic.mp3");
  panicMusic = loadSound("audio/panicMusic.mp3");
  pirateMusic = loadSound("audio/pirateMusic.mp3");
  
  zenImg = loadImage("images/zenImg.png");
  panicImg = loadImage("images/panicImg.png");
  pirateImg = loadImage("images/pirateImg.png");
  
  titleBg = loadImage("images/titleBg.png");
  collageBg = loadImage("images/collageBg.png");
  frame = loadImage("images/frame.png");
  popupBg = loadImage("images/popupBg.png");
  
  AliceFont = loadFont("fonts/Alice.ttf");
  
  instructionsImg = loadImage("images/instructionsImg.png");
  statsImg = loadImage("images/statsImg.png");
  audioImg = loadImage("images/audioImg.png");
  
  for (let i = 0; i < 50; i++) {
    objectImgs.push(loadImage(objectPaths[i]));
  }
}

function setup() {
  createCanvas(canvasW, canvasH);
  
  // create stopwatch object
  stopwatch = new Stopwatch();
  
  // program font
  textFont(AliceFont);
  
  // default bg music is zen
  bgMusic = zenMusic;
}

function draw() {
  // default is title screen
  switch (screen) {
    case "title":
      titleScreen();
      break;
    case "game":
      gameScreen();
      break;
  }
}

// displays title screen
function titleScreen() {
  background(primaryColor);
  background(titleBg);
  
  // title text
  textAlign(CENTER, CENTER);
  textSize(12);
  fill(secondaryColor);
  strokeWeight(0);
  
  // link to public domain review site
  let link = "Images from The Public Domain Review";
  linkW = textWidth(link);
  labelH = 12;
  
  // underline on hover
  let hovering = mouseX > centerX - linkW/2 && mouseX < centerX + linkW/2 && mouseY > canvasH-50-labelH/2 && mouseY < canvasH-50+labelH/2;
  
  textAlign(CENTER, CENTER);
  fill(secondaryColor);
  text(link, centerX, canvasH-50)
  
  stroke(secondaryColor);
  strokeWeight(hovering ? 1 : 0);
  line(centerX-linkW/2, canvasH-40, centerX+linkW/2, canvasH-40);
  
  // play button
  titlePlayBtn = new Button(centerX, centerY+100, 200, 50, "dark", "PLAY");
  titlePlayBtn.display();
}

// displays game screen
function gameScreen() {
  background(secondaryColor);
  
  displayGame();
  
  // if user is playing for the first time, instructions display
  if (firstTime) {
    instructionsOpen = true;
  }
  
  // if instructions are open, stopwatch stops & music pauses
  if (instructionsOpen) {
    displayInstructions();
    stopwatch.stop();
    
    if (musicOn) {
      bgMusic.pause();
    }
  }
  // if stats are open, stopwatch stops & music pauses
  else if (statsOpen) {
    displayStats();
    stopwatch.stop();
    
    if (musicOn) {
      bgMusic.pause();
    }
  }
  // if audio settings are open, stopwatch stops (music continues to play)
  else if (audioOpen) {
    displayAudio();
    stopwatch.stop();
  }
  else if (gameEnd) {
    displayEnd();
    
    if (musicOn) {
      bgMusic.pause();
    }
  }
  // if no popups are open, game is ongoing => stopwatch display is updated
  else {
    stopwatch.update();
  }
}

// displays game screen contents
function displayGame() {  
  // upper bar
    // instructions
    instructionsIcon = new Icon(25, 25, 25, 25,  instructionsImg);
    instructionsIcon.display();
    
    // stopwatch
    stopwatch.display(centerX, 40);
  
    // stats
    statsIcon = new Icon(canvasW-100, 25, 25, 25, statsImg);
    statsIcon.display();
    
    // audio settings 
    audioIcon = new Icon(canvasW-50, 25, 25, 25, audioImg);
    audioIcon.display();
  
  // collage  
  imageMode(CORNER);
  image(collageBg, collageX, collageY, collageW, collageH);
  image(frame, collageX-50, collageY-50, collageW+100, collageH+100);
  
  drawCollage();
  
  // items to search for
  rectMode(CORNER);
  fill(secondaryColor);
  stroke(primaryColor);
  strokeWeight(1);
  rect(25, canvasH-125, canvasW-50, 100);
  
  drawSearch();  
}

// draws the collage
function drawCollage() {
  // iterates through objects and displays them
  for (let i = 0; i < objects.length; i++) {
    objects[i].display();
  }
}

// draws the items to search for
function drawSearch() {
  let imgSize = 50;
  
  // search objects evenly spaced in container
  let searchX = 75;
  let searchY = canvasH - 125 + 50;
  let searchW = canvasW-100;
  
  let gap = (searchW - 10 * imgSize) / (10 - 1);
  
  // iterates through search objects and displays if not found
  for (let i = 0; i < searchObjects.length; i++) {
    if (!searchObjects[i].found){
      imageMode(CENTER);
      image(searchObjects[i].img, searchX, searchY, imgSize, imgSize);
    }
    
    // spaces objects out
    searchX = searchX + imgSize + gap;
  }
}

// displays instruction popups
function displayInstructions() {
  rectMode(CENTER);
  
  // background
  fill("#0000007F");
  rect(centerX, centerY, canvasW, canvasH);
  
  // instructions container
  let instructionsW = canvasW/2;
  let instructionsH = canvasH - 250;
  
  imageMode(CENTER);
  strokeWeight(0);
  image(popupBg, centerX, centerY, instructionsW, instructionsH);
  
  // instructions text
  fill(primaryColor);
  strokeWeight(0);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("How to Play", centerX, centerY-instructionsH/2+50);
  
  textSize(18);
  text("1. Look closely through the artwork collage.\n\n2. Find the hidden objects listed at the bottom of the screen.\n\n3. Click each one when you spot it.\n\n4. Collect them all to complete the game!", centerX, centerY, instructionsW-50);
  
  // start/resume game button
  let instructionsBtnMessage;
  
  // if first time, text is start game
  // all other times, text is resume game
  if (firstTime) {
    instructionsBtnMessage = "Start Game";
  }
  else {
    instructionsBtnMessage = "Resume Game";
  }
  
  instructionsPlayBtn = new Button(centerX, centerY+instructionsH/2-50, 200, 50, "dark", instructionsBtnMessage);
  instructionsPlayBtn.display();
}

// displays statistics popup
function displayStats() {
  rectMode(CENTER);
  
  // background
  fill("#0000007F");
  rect(centerX, centerY, canvasW, canvasH);
  
  // statistics container
  let statsW = canvasW - 300;
  let statsH = canvasH - 350;
  
  imageMode(CENTER);
  strokeWeight(0);
  image(popupBg, centerX, centerY, statsW, statsH);
  
  // statistics text
  // shows: # of times played, best time, average time
  fill(primaryColor);
  strokeWeight(0);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Statistics", centerX, centerY-statsH/2+50);
  
  textSize(36);
  text(timesPlayed, centerX-statsW/3, centerY-20, statsW/3);
  text(calculateBestTime(), centerX, centerY-20, statsW/3);
  text(calculateAverageTime(), centerX+statsW/3, centerY-20, statsW/3);
  
  textSize(12);
  text("Played", centerX-statsW/3, centerY+10, statsW/3);
  text("Best Time", centerX, centerY+10, statsW/3);
  text("Average Time", centerX+statsW/3, centerY+10, statsW/3);
  
  // resume game button
  statsPlayBtn = new Button(centerX, centerY+statsH/2-50, 200, 50, "dark", "Resume Game");
  statsPlayBtn.display();
}

// displays audio settings popup
function displayAudio() {
  rectMode(CENTER);
  
  // background
  fill("#0000007F");
  rect(centerX, centerY, canvasW, canvasH);
  
  // audio settings container
  let audioW = canvasW/2;
  let audioH = canvasH - 250;
  
  imageMode(CENTER);
  strokeWeight(0);
  image(popupBg, centerX, centerY, audioW, audioH);
  
  // audio settings text
  fill(primaryColor);
  strokeWeight(0);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Audio Settings", centerX, centerY-audioH/2+50);
  
  // toggles
  textSize(18);
  textAlign(LEFT, CENTER);
  text("Sound Effects", centerX, centerY-100, audioW-50);
  text("Music", centerX, centerY-50, audioW-50);
  
  // sound effect toggle
  soundToggle = new Toggle(centerX+audioW/2-50, centerY-100, 50, 30, soundOn);
  soundToggle.display();
  
  // background music toggle
  musicToggle = new Toggle(centerX+audioW/2-50, centerY-50, 50, 30, musicOn);
  musicToggle.display();
  
  // music styles
  fill(primaryColor);
  strokeWeight(0);
  textAlign(CENTER, CENTER);
  text("Music Style", centerX, centerY, audioW-50);
  
  // zen music button
  zenBtn = new MusicButton(centerX-audioW/3, centerY+75, audioW/3-40, 100, "Zen", zenImg, musicSelection === "zen");
  zenBtn.display();
  
  // panic music button
  panicBtn = new MusicButton(centerX, centerY+75, audioW/3-40, 100, "Panic", panicImg, musicSelection === "panic");
  panicBtn.display();
  
  // pirate music button (<3 a sea shanty)
  pirateBtn = new MusicButton(centerX+audioW/3, centerY+75, audioW/3-40, 100, "Pirate", pirateImg, musicSelection === "pirate");
  pirateBtn.display();
  
  // resume game button
  audioPlayBtn = new Button(centerX, centerY+audioH/2-50, 200, 50, "dark", "Resume Game");
  audioPlayBtn.display();
}

// displays end popup
function displayEnd() {
  rectMode(CENTER);
  
  // background
  fill("#0000007F");
  rect(centerX, centerY, canvasW, canvasH);
  
  // success!
  let endW = canvasW-200;
  let endH = canvasH - 300;
  
  imageMode(CENTER);
  strokeWeight(0);
  image(popupBg, centerX, centerY, endW, endH);
  
  // end text
  fill(primaryColor);
  strokeWeight(0);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Success!", centerX, centerY-endH/2+50);
  
  // end time of most recent game
  textSize(36);
  text(formatStatTime(endTime), centerX, centerY-endH/2+125);
  
  // statistics
  text(timesPlayed, centerX-endW/3, centerY+25, endW/3);
  text(calculateBestTime(), centerX, centerY+25, endW/3);
  text(calculateAverageTime(), centerX+endW/3, centerY+25, endW/3);
  
  textSize(12);
  text("Completion Time", centerX, centerY-endH/2+160, endW/3);
  text("Played", centerX-endW/3, centerY+60, endW/3);
  text("Best Time", centerX, centerY+60, endW/3);
  text("Average Time", centerX+endW/3, centerY+60, endW/3);
  
  // resume game button
  endPlayBtn = new Button(centerX, centerY+endH/2-50, 200, 50, "dark", "Replay Game");
  endPlayBtn.display();
}

// loads hidden objects
function loadObjects() {  
  // controls object array index
  let objIndex = 0;
  
  // iterates through grid
  for (let i = collageX; i < collageX+collageW; i+=gridSize) {
    for (let j = collageY; j < collageY+collageH; j+=gridSize) { 
      // generates random size between 25px & 75px
      let randomSize = random(25,75);
      
      // object created
      // pulls image from objectImg array
      let obj = new CollageObject(i, j, randomSize, randomSize, objectImgs[objIndex], false);
      objects.push(obj);
      
      objIndex++;
    }
  }
}

// loads objects to search for
function loadSearch() {
  // shuffles object array
  shuffle(objects, true);
  
  // selects first 10 objects
  for (let i = 0; i < 10; i++) {
    searchObjects.push(objects[i]);
  }
}

// calculates best time
function calculateBestTime() {
  // default is "--:--""
  if (timesPlayed === 0) {
    return "--:--";
  }
  
  // best time = lowest time
  let best = min(gameTimes);
  
  // returns formatted string of time
  return formatStatTime(best);
}

// calculates average time
function calculateAverageTime() {
  // default is "--:--""
  if (timesPlayed === 0) {
    return "--:--";
  }
  
  // adds each time to total
  let total = 0;
  for (let i = 0; i < gameTimes.length; i++) {
    total += gameTimes[i];
  }
  
  // divides total time by # of times played
  let average = total/timesPlayed;
  
  // returns formatted string of time
  return formatStatTime(average);
}

// formats statistic times
function formatStatTime(ms) {
  // ms -> 00:00 string for display 
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  return nf(minutes, 2) + ":" + nf(seconds, 2);
}

// ends game
function endGame() {
  // stops stopwatch
  stopwatch.stop();
  
  gameEnd = true;
  
  timesPlayed++;
  
  // sets the final end time & pushes it to array
  endTime = stopwatch.getTime();
  gameTimes.push(endTime);
}

// resets game to replay
function resetGame() {
  // resets variables to clear objects
  gameEnd = false;
  totalFound = 0;
  objects = [];
  searchObjects = [];
  
  // shuffles object images => new each time
  shuffle(objectImgs, true);
  
  // reloads objects & search objects
  loadObjects();
  loadSearch();
  
  // resets stopwatch
  stopwatch.reset();
  stopwatch.start();
  
  // music restarts
  if (musicOn) {
    bgMusic.stop();
    bgMusic.loop();
  }
}

// mouse clicks
function mouseClicked() {
  // on title screen
  if (screen === "title") {
    // clicks play button
    if (titlePlayBtn.clicked()) {
      screen = "game";
      
      // shuffles object images
      shuffle(objectImgs, true);
      
      // loads objects and search objects
      loadObjects();
      loadSearch();
      
      if (soundOn) {
        buttonSound.play();
      }
    }
    
    // clicks link 
    if (mouseX > centerX - linkW/2 && mouseX < centerX + linkW/2 && mouseY > canvasH-50-labelH/2 && mouseY < canvasH-50+labelH/2) {
      console.log("clicked link");
      window.open("https://publicdomainreview.org/", "_blank");
    }
  }
  // on game screen
  else if (screen === "game") {
    // if instructions are open
    if (instructionsOpen) {
      // click start/resume button
      if (instructionsPlayBtn.clicked()) {
        firstTime = false;
        instructionsOpen = false;
        
        if (soundOn) {
          buttonSound.play();
        }
        
        // resumes stopwatch
        stopwatch.start();
        
        // resumes bg music
        if (musicOn && !bgMusic.isPlaying()) {
          bgMusic.loop();
        }
      }
    }
    // if stats are open
    else if (statsOpen) {
      // click resume button
      if (statsPlayBtn.clicked()) {
        statsOpen = false;
        
        // resumes stopwatch
        stopwatch.start();
        
        if (soundOn) {
          buttonSound.play();
        }
        
        // resumes bg music
        if (musicOn && !bgMusic.isPlaying()) {
          bgMusic.loop();
        }
      }
    }
    // if audio settings are open
    else if (audioOpen) {
      // click sound toggle
      if (soundToggle.clicked()) {
        soundOn = !soundOn;
        
        if (soundOn) {
          buttonSound.play();
        }
      }
      
      // click music toggle
      if (musicToggle.clicked()) {
        musicOn = !musicOn;
        
        if (musicOn) {
          bgMusic.loop();
        }
        else {
          bgMusic.pause();
        }

        if (soundOn) {
          buttonSound.play();
        }
      }
      
      // music style buttons
      // click for zen music
      if (zenBtn.clicked()) {
        if (musicSelection != "zen") {
          musicSelection = "zen";
          
          bgMusic.stop();
          bgMusic = zenMusic;
          
          if (musicOn) {
            bgMusic.loop();
          }
        }
      }
      // click for panic music
      else if (panicBtn.clicked()) {
        if (musicSelection != "panic") {
          musicSelection = "panic";
          
          bgMusic.stop();
          bgMusic = panicMusic;
          if (musicOn) {
            bgMusic.loop();
          }
        }
      }
      // click for pirate music
      else if (pirateBtn.clicked()) {
        if (musicSelection != "pirate") {
          musicSelection = "pirate";
          
          bgMusic.stop();
          bgMusic = pirateMusic;
          if (musicOn) {
            bgMusic.loop();
          }
        }
      }
      
      // click resume button
      if (audioPlayBtn.clicked()) {
        audioOpen = false;
        
        // resumes stopwatch
        stopwatch.start();
        
        if (soundOn) {
          buttonSound.play();
        }
      }
    }
    // if game ends
    else if (gameEnd) {
      // click replay button
      if (endPlayBtn.clicked()) {
        resetGame();
        
        if (soundOn) {
          buttonSound.play();
        }
      }
    }
    // game screen (without any popups)
    else {
      // click instructions icon
      if (instructionsIcon.clicked()) {
        instructionsOpen = true;
        
        if (soundOn) {
          buttonSound.play();
        }
      }
      
      // click statistics icon
      if (statsIcon.clicked()) {
        statsOpen = true;
        
        if (soundOn) {
          buttonSound.play();
        }
      }
      
      // click audio settings icon
      if (audioIcon.clicked()) {
        audioOpen = true;
        
        if (soundOn) {
          buttonSound.play();
        }
      }
      
      // click object in the collage
      // default is click the wrong object
      let wrong = true;
      
      // iterates through objects array to check if an object has been clicked
      for (let i = 0; i < objects.length; i++) {
        if (objects[i].clicked()) {
          // iterates through searchObjects array
          for (let j = 0; j < searchObjects.length; j++) {
            // checks if object that was clicked equals an object in search objects array
            if (objects[i] === searchObjects[j]) {
              // object is not a wrong one
              wrong = false;
              
              // marks object as found in search objects array
              searchObjects[i].markFound();
              totalFound++;
              
              if (soundOn) {
                correctSound.play();
              }
              
              // if 10 objects are found => game ends
              if (totalFound === 10) {
                endGame();
              }
            }
          }
          // if no correct items are found, incorrect sound plays
          if (wrong && soundOn) {
            incorrectSound.play();
          }
        }
      }
    }
  }
}