
let stutter, tom, ride, bass, snare, giddi;
var score1 = [];
var score2 = [];
var score3 = [];
var score4 = [];
var score5 = [];
var score6 = [];
var soundLoop1;
var soundLoop2;
var soundLoop3;

var colorCount = 3;
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];
var actRandomSeed = 0;

function preload() {
  soundFormats('ogg');
  stutter = loadSound('assets/stutter.ogg');
  tom = loadSound('assets/tom.ogg');
  ride = loadSound('assets/ride.ogg');
  bass = loadSound('assets/bass.ogg');
  snare = loadSound('assets/snare.ogg');
  giddi = loadSound('assets/giddi.ogg');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  cnv.mousePressed(canvasPressed);

  /////
  let firstIntervall = 1
  soundLoop1 = new p5.SoundLoop(onSoundLoop1, firstIntervall);
  soundLoop2 = new p5.SoundLoop(onSoundLoop2, firstIntervall);
  soundLoop3 = new p5.SoundLoop(onSoundLoop3, firstIntervall);
  soundLoop4 = new p5.SoundLoop(onSoundLoop4, firstIntervall);
  soundLoop5 = new p5.SoundLoop(onSoundLoop5, firstIntervall);
  soundLoop6 = new p5.SoundLoop(onSoundLoop6, firstIntervall);

  //soundLoop.maxIterations = score3.length;

  // synth = new p5.MonoSynth();
  /////
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);

  // ------ colors ------
  // create palette
  for (var i = 0; i < colorCount; i++) {
    if (i % 2 == 0) {
      hueValues[i] = random(130, 220);
      saturationValues[i] = 100;
      brightnessValues[i] = random(15, 100);
    } else {
      hueValues[i] = 195;
      saturationValues[i] = random(20, 100);
      brightnessValues[i] = 100;
    }
  }

  // ------ area tiling ------
  // count tiles
  var counter = 0;
  // row count and row height
  var rowCount = 8;
  //var rowCount = int(random(5, 30));
  var rowHeight = height / rowCount;

  // seperate each line in parts
  for (var i = rowCount; i >= 0; i--) {
    // how many fragments
    var partCount = i + 1;
    var parts = [];

    for (var ii = 0; ii < partCount; ii++) {
      // sub fragments or not?
      // if (random() < 0.075) {
      //   // take care of big values
      //   var fragments = int(random(2, 20));
      //   partCount = partCount + fragments;
      //   for (var iii = 0; iii < fragments; iii++) {
      //     parts.push(random(2));
      //   }
      // } else {
        parts.push(random(2, 20));
      //}
    }

    // add all subparts
    var sumPartsTotal = 0;
    for (var ii = 0; ii < partCount; ii++) {
      sumPartsTotal += parts[ii];
    }

    // draw rects
    var sumPartsNow = 0;
    for (var ii = 0; ii < parts.length; ii++) {
      sumPartsNow += parts[ii];

      var x = map(sumPartsNow, 0, sumPartsTotal, 0, width);
      var y = rowHeight * i;
      var w = -map(parts[ii], 0, sumPartsTotal, 0, width);
      var h = rowHeight;

      var index = counter % colorCount;
      var col = color(hueValues[index], saturationValues[index], brightnessValues[index]);
      fill(col);
      rect(x, y, w, h);

      //create scores from w values:
      //for (var j = rowCount; j >= 0; j--) {
        if (i == 2) {
          //map from px to seconds (5sek-track)
          let dur = map(w, -width, 0, 0, 1);
          score1.push(dur);
        }
        if (i == 3) {
          //map from px to seconds (5sek-track)
          let dur = map(w, -width, 0, 0, 1);
          score2.push(dur);
        }
        if (i == 4) {
          //map from px to seconds (5sek-track)
          let dur = map(w, -width, 0, 0, 1);
          score3.push(dur);
        }
        if (i == 5) {
          //map from px to seconds (5sek-track)
          let dur = map(w, -width, 0, 0, 1);
          score3.push(dur);
        }
        if (i == 6) {
          //map from px to seconds (5sek-track)
          let dur = map(w, -width, 0, 0, 1);
          score5.push(dur);
        }
        if (i == 7) {
          //map from px to seconds (5sek-track)
          let dur = map(w, -width, 0, 0, 1);
          score6.push(dur);
        }
      //}
      counter++;
    }
  }
}

function mouseReleased() {
  actRandomSeed = random(100000);
  loop();
}

function canvasPressed () {
  userStartAudio();

  ///
  // if (soundLoop1.isPlaying || soundLoop2.isPlaying || soundLoop3.isPlaying) {
  //   soundLoop1.stop();
  //   soundLoop2.stop();
  //   soundLoop3.stop();
  // } else {
    // start the loop
    soundLoop1.start();
    soundLoop2.start();
    soundLoop3.start();
    soundLoop4.start();
    soundLoop5.start();
    soundLoop6.start();
    console.log(score1);
    console.log(score2);
    console.log(score3);
    console.log(score4);
    console.log(score5);
    console.log(score6);
  //}
  ///
}

function onSoundLoop1 (timeFromNow) {
  var index = (soundLoop1.iterations - 1) % score1.length;
  var interval = score1[index];
  soundLoop1.interval = interval;
  stutter.play(timeFromNow);
  soundLoop1.maxIterations = score1.length;
}

function onSoundLoop2 (timeFromNow) {
  var index = (soundLoop2.iterations - 1) % score2.length;
  var interval = score2[index];
  soundLoop2.interval = interval;
  bass.play(timeFromNow);
  soundLoop2.maxIterations = score2.length;
}

function onSoundLoop3(timeFromNow) {
  // set interval to position in score-array:
  var index = (soundLoop3.iterations - 1) % score3.length;
  var interval = score3[index];
  soundLoop3.interval = interval;
  soundLoop3.maxIterations = score3.length;
  
//  let noteIndex = (soundLoop.iterations - 1) % notePattern.length;
//  let note = midiToFreq(notePattern[noteIndex]);
giddi.play(timeFromNow);
//   background(noteIndex * 360 / notePattern.length, 50, 100);
}

function onSoundLoop4 (timeFromNow) {
  var index = (soundLoop4.iterations - 1) % score4.length;
  var interval = score4[index];
  soundLoop4.interval = interval;
  tom.play(timeFromNow);
  soundLoop4.maxIterations = score4.length;
}

function onSoundLoop5 (timeFromNow) {
  var index = (soundLoop5.iterations - 1) % score5.length;
  var interval = score5[index];
  soundLoop5.interval = interval;
  snare.play(timeFromNow);
  soundLoop5.maxIterations = score5.length;
}

function onSoundLoop6 (timeFromNow) {
  var index = (soundLoop6.iterations - 1) % score6.length;
  var interval = score6[index];
  soundLoop6.interval = interval;
  ride.play(timeFromNow);
  soundLoop6.maxIterations = score6.length;
}



