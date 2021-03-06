// P_1_2_1_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * shows how to interpolate colors in different styles/ color modes
 *
 * MOUSE
 * left click          : new random color set
 * position x          : interpolation resolution
 * position y          : row count
 *
 * KEYS
 * 1-2                 : switch interpolation style
 * s                   : save png
 * c                   : save color palette
 */
'use strict';

var tileCountX = 2;
var tileCountY = 10;

var colorsLeft = [];
var colorsRight = [];
var colors = [];

var interpolateShortest = true;

// required var for oscillator
var osc;
var playing;
var cnv;
var frequency;
var amplitude;
var filter, filterFreq, filterRes;
var panning;

//////////

function setup() {
  var cnv = createCanvas(800, 800);
  colorMode(HSB);
  noStroke();
  shakeColors();

  // osc setup
  cnv.mousePressed(PlayOscillator);
  osc = new p5.Oscillator();
  osc.setType("sine");
  osc.freq(200);
  osc.amp(0);
  osc.disconnect();

  filter = new p5.LowPass();
  filter.set(4000, 0);
  osc.connect(filter);
  /////////
}

function draw() {
  tileCountX = int(map(mouseX, 0, width, 2, 100));
  tileCountY = int(map(mouseY, 0, height, 2, 10));
  var tileWidth = width / tileCountX;
  var tileHeight = height / tileCountY;
  var interCol;
  colors = [];

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    var col1 = colorsLeft[gridY];
    var col2 = colorsRight[gridY];

    for (var gridX = 0; gridX < tileCountX; gridX++) {
      var amount = map(gridX, 0, tileCountX - 1, 0, 1);

      if (interpolateShortest) {
        // switch to rgb / switch to sine
        colorMode(RGB);
        interCol = lerpColor(col1, col2, amount);
        osc.setType("square");
        // switch back / switch to square
        colorMode(HSB);
      } else {
        interCol = lerpColor(col1, col2, amount);
        osc.setType("sawtooth");
      }

      fill(interCol);

      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;
      rect(posX, posY, tileWidth, tileHeight);

      frequency = map(posX, 0, 800, 600, 5000);
      amplitude = map(posY, 0, 800, 0, 1);
      panning = map(mouseX, 0, 800, -1, 1);
      
      
      //console.log(gridY);
      //osc.freq(frequency);

      if (playing == true) {
        console.log(amplitude);
        osc.freq(frequency);
        osc.amp(amplitude * 0.3);
        osc.pan(panning);
      }

      // save color for potential ase export
      colors.push(interCol);
    }
  }
}

function shakeColors() {
  for (var i = 0; i < tileCountY; i++) {
    colorsLeft[i] = color(random(0, 255), random(0, 255), 255);
    colorsRight[i] = color(random(160, 190), 255, random(0, 100));
  }
}

// required to play oscillator
function PlayOscillator() {
  osc.start();
  osc.amp(0.1, 0.5);
  playing = true;
}
///////////////////  

function mouseReleased() {
  shakeColors();
  
  // smooth synth
  osc.amp(0, 0.5);
  playing = false;
  //////////////

}

function keyPressed() {
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') interpolateShortest = true;
  if (key == '2') interpolateShortest = false;
}
