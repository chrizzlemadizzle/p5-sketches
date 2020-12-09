// P_1_1_1_01
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
 * draw the color spectrum by moving the mouse
 *
 * MOUSE
 * position x/y        : resolution
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var stepX;
var stepY;
var osc;
var lfo;
var filter;
var freq_osc;
var freq_lfo;
var amp_osc;
var amp_lfo;
var playing;
var cnv;
var AM;
var gridX;
var gridY;

function setup() {
  cnv = createCanvas(800, 400);
  noStroke();
  colorMode(HSB, width, height, 100);
  cnv.mousePressed(PlayOscillator);
  cnv.parent("cnv-container")

  osc = new p5.Oscillator();
  osc.setType("sine");
  osc.freq(200);
  osc.amp(0);
  //osc.start();
  
  lfo = new p5.Oscillator();
  lfo.setType("sine");
  lfo.disconnect();
  lfo.freq(5);
  lfo.amp(1);
  lfo.start();

  osc.amp(lfo.scale( -1, 1, -1, 1 ) );

  filter = new p5.LowPass();
  filter.freq(600);
  osc.disconnect();
  osc.connect(filter);
}

function draw() {
  // graphics:
  stepX = mouseX + 2;
  stepY = mouseY + 2;

  for ( gridY = 0; gridY < height; gridY += stepY) {
    for (var gridX = 0; gridX < width; gridX += stepX) {
      let colors = map(gridX, 0, width, 0, 360);
      fill(colors, height - gridY, 100);
      rect(gridX, gridY, stepX, stepY);
    }
  }


  // sound:
  let freq_lfo = gridX;
  let amp_lfo = gridY;
  //amp_lfo = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

  if (playing) {
    lfo.freq(freq_lfo, 0.1);
    lfo.amp(amp_lfo, 0.1);
  }
}


function PlayOscillator() {
  osc.start();
  playing = true;
}

function mouseReleased() {
  osc.amp(0, 0.5);
  lfo.amp(0, 0.5);
  playing = false;
}
