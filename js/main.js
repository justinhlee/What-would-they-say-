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

  var toggles = $('.text-toggle');

  var isBold = false;
  var isItalic = false;

  var headerState = 0;

  /*
  0 - no header
  1 - H1
  2 - H2
  3 - H3
  */

  function untoggleHeaders() {
    $('#h1-toggle').removeClass('active');
    $('#h2-toggle').removeClass('active');
    $('#h3-toggle').removeClass('active');
  }

  

  function toggleHeader(el) {
    var toggle = $(el);
    
    switch (toggle.attr('id')) {
      case 'h1-toggle':
        
        if (headerState == 1) {
          
          $(el).toggleClass('active');
          headerState = 0;
        } else {
          untoggleHeaders();
          $(el).toggleClass('active');
          headerState = 1;
        }
        break;
      case 'h2-toggle':
        if (headerState == 2) {
          
          $(el).toggleClass('active');
          headerState = 0;
        } else {
          untoggleHeaders();
          $(el).toggleClass('active');
          headerState = 2;
        }
        
        break;
      case 'h3-toggle':
        if (headerState == 3) {
          
          $(el).toggleClass('active');
          headerState = 0;
        } else {
          untoggleHeaders();
          $(el).toggleClass('active');
          headerState = 3;
        }
       
        break;
      case 'em-toggle':
        isItalic = !isItalic;
        $(el).toggleClass('active');
        break;
      case 'strong-toggle':
        isBold = !isBold;
        $(el).toggleClass('active');
        break;  
    }
  }



  toggles.click(function() {
    toggleHeader(this);
  });


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

  function getPrefix() {
    var prefix = '';
    if (isBold) prefix += '<strong>';
    if (isItalic) prefix += '<em>';
    if (headerState != 0) {
      prefix += '<h' + headerState + '>';
    }
    return prefix;
  }

  function getSuffix() {
    var suffix = '';
    if (isBold) suffix += '</strong>';
    if (isItalic) suffix += '</em>';
    if (headerState != 0) {
      suffix += '</h' + headerState + '>';
    }
    return suffix;
  }

  function generator() {
    var r = 7*getRandomArbitrary(-1.0, 1.0);
    console.log(r);

    var oi = within(0, aLengths[0]-1, Math.round(ocean[0]*aLengths[0]+r));
    var ci = within(0, aLengths[1]-1, Math.round(ocean[1]*aLengths[1]+r));
    var ei = within(0, aLengths[2]-1, Math.round(ocean[2]*aLengths[2]+r));
    var ai = within(0, aLengths[3]-1, Math.round(ocean[3]*aLengths[3]+r));
    var ni = within(0, aLengths[4]-1, Math.round(ocean[4]*aLengths[4]+r));
  
    var str = getPrefix() + o[oi].word + ' ' + c[ci].word + ' ' + e[ei].word + ' ' + a[ai].word + ' ' + n[ni].word + ' ' + getSuffix();
    text.append(str);
    
  }

  // Call to generator
  generate.click(function () {
    count = 1;
    firstClick = false;
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