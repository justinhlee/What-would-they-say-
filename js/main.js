/*
* DATA FILES: 
* o.js
* c.js
* e.js
* a.js
* n.js
*/

/*global $:false*/
/*jshint indent:2*/

'use strict';

$( document ).ready( function() {

  // Array of OCEAN values
  var ocean    = [0.50, 0.50, 0.50, 0.50, 0.50];
  var aLengths = [o.length, c.length, e.length, a.length, n.length];
  var text     = $( '.generated' );
  var generate = $( '#generate' );
  var append   = $( '#append' );
  var inputs   = $( '[type="range"]' );
  var firstClick = true;
  var count = 0;
  var maxNGrams = 1000;

  // Update OCEAN array
  inputs.change( function() {
    switch (this.name) {
      case 'open':
        ocean[0] = this.value/100;
        break;
      case 'consc':
        ocean[1] = this.value/100;
        break;
      case 'extra':
        ocean[2] = this.value/100;
        break;
      case 'agree':
        ocean[3] = this.value/100;
        break;
      case 'neuro':
        ocean[4] = this.value/100;
        break;
    }
  });

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function within (min, max, value) {
    if (value > max) {
      value = max;
    }
    if (value < min) {
      value = min;
    }
    return value;
  }

  function generator() {
    var r = 7*getRandomArbitrary(-1.0, 1.0);

    var oi = within(0, aLengths[0]-1, Math.round(ocean[0]*aLengths[0]+r));
    var ci = within(0, aLengths[1]-1, Math.round(ocean[1]*aLengths[1]+r));
    var ei = within(0, aLengths[2]-1, Math.round(ocean[2]*aLengths[2]+r));
    var ai = within(0, aLengths[3]-1, Math.round(ocean[3]*aLengths[3]+r));
    var ni = within(0, aLengths[4]-1, Math.round(ocean[4]*aLengths[4]+r));
    
    text.append(o[oi].word + ' ');
    text.append(c[ci].word + ' ');
    text.append(e[ei].word + ' ');
    text.append(a[ai].word + ' ');
    text.append(n[ni].word + ' ');
  }

  // Call to generator
  generate.click(function () {
    count = 0;
    text.empty();
    generator();
  });

  // Add generated content 
  append.click(function () {
    if (firstClick) {
      text.empty();
      firstClick = false;
    }
    count++;
    if (count < maxNGrams) generator();
  });
});