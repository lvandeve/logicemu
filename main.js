/*
LogicEmu

Copyright (c) 2018-2020 Lode Vandevenne

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*
Main program js file

This has been tested to work in Chrome and Firefox, and hopefully works in other browsers too.
*/



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

document.body.onkeydown = function(e) {
  if(editmode && !!edit) {
    if(edit.onkeydown) {
      return edit.onkeydown(e);
    }
  }
};

var lastmousedowncomponent = null;



document.body.onmouseup = function(e) {
  if(lastmousedowncomponent) {
    var didsomething = lastmousedowncomponent.mouseup(e);
    lastmousedowncomponent = null;
  }
  global_changed_something = true;
};

//document.body.ontouchend = document.body.onmouseup;


var edit = undefined;
var NEWEDIT = false;

var editmode = false; // could be called modal mode, it's used for some other things than just editing too

var textbeforeedit = '';
// NOTE: This are used not only by SimpleEditor, but also by the import and export buttons.
var editdiv;
var editarea;

// anything that sets editmode = true, must also assign a function here that does what's needed when setting editmode = false again
// the function itself should not assign editmode = false, the caller must do that when also calling this function
// this should not include saving of map or canceling, only the UI cleanup/restore related functionality
var editModeCancelFun = undefined;
var editModeFinishFun = undefined;

function SimpleEditor() {
  editdiv = undefined;
  editarea = undefined;

  this.setUp = function() {
    var docwidth = /*document.body.clientWidth*/window.innerWidth - 24 - 80;
    var docheight = /*document.body.clientHeight*/window.innerHeight - 100 - 8 - 80;
    var fontsize = 10;
    var ewidth = Math.max(w, 40);
    var eheight = Math.min(Math.max(origtext.split('\n').length, 16));
    editdiv = util.makeAbsElement('div', 30, 128, docwidth, docheight);
    //editarea = makeAbsElement('textarea', 30, 128, (fontsize + 2) * ewidth, (fontsize + 2) * eheight);
    editarea = util.makeAbsElement('textarea', 0, 0, docwidth, docheight - 100, editdiv);
    editarea.rows = eheight;
    editarea.cols = ewidth;
    editarea.value = origtext;
    editarea.style.fontSize = fontsize + 'px';
    editarea.style.zIndex = '1'; // anything as long as it's less than the menu bar
    //worldDiv.style.display = 'none';
    //editarea.style.position = 'fixed';

    util.makeInternalButton('cancel', editdiv, (docwidth - 200), (docheight - 80), function() {
      editModeCancelFun();
    });
    util.makeInternalButton('done', editdiv, (docwidth - 100), (docheight - 80), function() {
      editModeFinishFun();
    });
  };

  // returns the text
  this.turnDown = function() {
    var newtext = editarea.value;
    util.removeElement(editdiv);
    return newtext;
  };
};

function finishEdit() {
  var newtext = edit.turnDown();
  edit = undefined;

  editButton.innerText = 'edit';
  editmode = false;
  createMenuUI();

  if(newtext.length == 0) return;

  if(newtext != textbeforeedit) {
    util.setLocalStorage(newtext, 'circuit_text');
    parseText(newtext, 'edited circuit', undefined, 1);
  } else {
    parseText(newtext, 'edited circuit', undefined, 2);
  }
}

function cancelEdit() {
  edit.turnDown();
  edit = undefined;
  editButton.innerText = 'edit';
  editmode = false;
  createMenuUI();
  parseText(textbeforeedit, origtitle, undefined, 2);
}

//elements created by createMenuUI
var menuRows;
var menuRow0El;
var menuRow1El;
var menuRow2El;
var menuRow3El;
var ticksCounterEl;
var rendererDropdown;
var circuitNameEl;
var circuitDropdownSpan;
var editbutton;
var changeDropdown;
var statsButton;
var dialogDiv;

// functions created by createMenuUI
var updatePauseButtonText;
var updateModeButtonText;
var updateTimeButtonBorders;
var updateTicksDisplay;

// smaller version of the menu rows shown when editing is active
function createEditorMenuUI(cancelFun, finishFun) {
  if(menuRows) util.removeElement(menuRows);

  menuRows = util.makeElementAt('div', 0, 0);
  menuRows.style.position = 'fixed';
  menuRows.style.display = 'block';
  menuRows.style.width = '100%';
  menuRows.style.height = '100px';

  menuRow0El = util.makeElementAt('span', 0, 0, menuRows);
  menuRow0El.style.background = '#f8f8f8';
  menuRow0El.style.position = 'absolute';
  menuRow0El.style.width = '100%';
  menuRow0El.style.height = '32px';


  if(cancelFun) {
    var cancelLink = util.makeElement('span', menuRow0El);
    cancelLink.title = 'cancel the current modal operation';
    cancelLink.innerHTML = 'cancel';
    cancelLink.style.paddingLeft = '10px';
    cancelLink.style.color = '#00e';
    cancelLink.style.textDecoration = 'underline';
    cancelLink.style.cursor = 'pointer';
    cancelLink.onclick = function() {
      if(cancelFun) cancelFun();
    };
  }

  if(finishFun) {
    var cancelLink = util.makeElement('span', menuRow0El);
    cancelLink.title = 'finish and save the current modal operation';
    cancelLink.innerHTML = 'finish';
    cancelLink.style.paddingLeft = '10px';
    cancelLink.style.color = '#00e';
    cancelLink.style.textDecoration = 'underline';
    cancelLink.style.cursor = 'pointer';
    cancelLink.onclick = function() {
      if(finishFun) finishFun();
    };
  }

  var githubLink = util.makeElement('span', menuRow0El);
  githubLink.style.paddingLeft = '10px';
  githubLink.innerHTML = '<a href="https://github.com/lvandeve/logicemu" target="_blank">github</a>';
  githubLink.style.paddingRight = '10px';
}


function getStatsText() {
  var numVisibleComponents = 0;
  var numComponents = 0;
  var numOnComponents = 0;
  var numOffComponents = 0;
  var numComponentInputs = 0;
  var numGates = 0;
  var numGatesLarge = 0;
  var numGatesOther = 0;
  var numInvertedInputs = 0;
  var numCells = 0;
  var numTransistors = 0;
  var numTransistorsLarge = 0;
  for(var i = 0; i < components.length; i++) {
    var c = components[i];
    var t = c.type;
    var ni = c.inputs.length;

    if(t == TYPE_NULL || t == TYPE_LOOSE_WIRE_EXPLICIT || t == TYPE_LOOSE_WIRE_IMPLICIT || t == TYPE_UNKNOWN_DEVICE || t == TYPE_IC_PASSTHROUGH) {
      continue;
    }

    numComponents++;

    if(!c.issub) {
      numVisibleComponents++;
    }

    if(c.value) {
      numOnComponents++;
    } else {
      numOffComponents++;
    }

    if(t == TYPE_AND || t == TYPE_NAND || t == TYPE_OR || t == TYPE_NOR || t == TYPE_XOR || t == TYPE_XNOR || t == TYPE_ONEHOT || t == TYPE_NONEHOT) {
      numGates++;
    }

    numComponentInputs += ni;

    // Any built-in device of some complexity, e.g. the terminal emulator or ALUs, are assumed to use a simple CPU of 4000 transistors for that.
    var cpuTransistors = 4000;
    var ffTransistors = 26; // num transistors of JK flip-flop with 13 NAND gates
    var dffTransistors = 18; // num transistors of D ff or 1-input T ff
    var cpuGates = 2000;
    var ffGates = 13;
    var dffGates = 9;
    // to count flip-flops, VTE, ... that use multiple components internally only once, skip sub-components
    var isSubComponent = c.master && (c.master != c);
    // Estimate total amount of transitors, assuming NMOS
    if(t == TYPE_AND || t == TYPE_NAND) {
      numTransistors += (ni > 1) ? ((ni - 1) * 3) : 0;
      if(t == TYPE_NAND && ni > 1) numTransistors--;
      if(ni == 1) numTransistors++; // diode or invertor
    } else if(t == TYPE_OR || t == TYPE_NOR) {
      numTransistors += (ni > 1) ? ((ni - 1) * 3) : 0;
      if(t == TYPE_NOR && ni > 1) numTransistors--;
      if(ni == 1) numTransistors++; // diode or invertor
    } else if(t == TYPE_XOR || t == TYPE_XNOR) {
      // TODO: xor with more than 2 inputs may be possible with less than 6 per implicit XOR
      numTransistors += (ni > 1) ? ((ni - 1) * 6) : 0;
      if(t == TYPE_XNOR && ni > 1) numTransistors++;
      if(ni == 1) numTransistors++; // diode or invertor
    } else if(t == TYPE_ONEHOT || t == TYPE_NONEHOT) {
      if(ni == 2) {
        numTransistors += 6;
      } else if(ni > 2) {
        // This estimate assumes that with many inputs, you can add one more input to the onehot detector using 2 ORs and 1 AND (an OR to keep track of having any input on, the AND and OR to keep track of too many inputs on).
        // The + 2 at the end is an AND with a negated input, which would be +4, but then assume the or series ends with NOR to reduce 2.
        // TODO: this estimate is likely too high, there may be possibilities with less transistors per input.
        numTransistors += 6 + (ni - 2) * 9 + 2;
      }
      if(ni == 1) numTransistors++; // diode or invertor
    } else if (t == TYPE_TRISTATE || t == TYPE_TRISTATE_INV) {
      // we could not count tristate buffers, since they represent direct connection to wires
      // so below code, which would count it as and/or gates, commented out
      //numTransistors += (ni > 1) ? ((ni - 1) * 3) : 0;
      //if(t == TYPE_TRISTATE_INV && ni > 1) numTransistors--;
      //if(ni == 1) numTransistors++; // diode or invertor
    } else if(t == TYPE_COUNTER) {
      // assume counter based on 1-input T flip-flop with 9 NAND gates (18 transistors)
      numTransistors += dffTransistors;
      numGatesOther += dffGates;
      if(ni > 1) {
        numTransistors += 6 * (ni - 1); // assume one more xor gate per input, this may be underestimate since it's not just as simple as an extra XOR per input
        numGatesOther += (ni - 1);
      }
    } else if (t == TYPE_FLIPFLOP && !isSubComponent && c.ff) {
      var ff = c.ff;
      var extrainputcost = 4; // somewhat arbitrary
      var totaldatainputs = ff.numj + ff.numk + ff.numd + ff.numt;
      if(ff.numc) {
        if(ff.numj || ff.numk) {
          numTransistors += ffTransistors;
          numGatesOther += ffGates;
          if(totaldatainputs > 2) {
            numTransistors += (totaldatainputs - 2) * extrainputcost;
            numGatesOther += (((totaldatainputs - 2) * extrainputcost) >> 1);
          }
        } else if(ff.numd || ff.numt) {
          numTransistors += dffTransistors;
          if(totaldatainputs > 1) {
            numTransistors += (totaldatainputs - 1) * extrainputcost;
            numGatesOther += (((totaldatainputs - 1) * extrainputcost) >> 1);
          }
        } else {
          // Any other kind of inputs is treated as the most expensive type.
          numTransistors += ffTransistors;
          if(totaldatainputs > 1) {
            numTransistors += (totaldatainputs - 1) * extrainputcost;
            numGatesOther += (((totaldatainputs - 1) * extrainputcost) >> 1);
          }
        }
        numTransistors += ff.numy * extrainputcost;
        numGatesOther += ((ff.numy * extrainputcost) >> 1);
      } else {
        numTransistors += 8; // jk, d and t latch can all be made with 4 NANDs
        numGatesOther += 4;
        var expecteddatainputs = ((ff.numj || ff.numk) ? 2 : 1);
        if(totaldatainputs > expecteddatainputs) {
          numTransistors += (totaldatainputs - expecteddatainputs) * extrainputcost;
          numGatesOther += (((totaldatainputs - expecteddatainputs) * extrainputcost) >> 1);
        }
        var expectedy = ((ff.numj || ff.numk) ? 0 : 1);
        if(ff.numy > expectedy) {
          numTransistors += (ff.numy - expectedy) * extrainputcost;
          numGatesOther += (((ff.numy - expectedy) * extrainputcost) >> 1 );
        }
      }
    } else if(t == TYPE_TIMER_OFF || t == TYPE_TIMER_ON) {
      numTransistors += 2; // amount of transistors for blinking circuit
      numGatesOther++;
    } else if(t == TYPE_RANDOM) {
      // very arbitrary estimate, make random as expensive as full flip-flop, it is edge triggered and keeps state
      if(ni > 0) {
        numTransistors += ffTransistors;
        numGatesOther += ffGates;
      }
      if(ni > 1) {
        numTransistors += 6 * (ni - 1); // assume one more xor gate per input, this may be underestimate since it's not just as simple as an extra XOR per input
        numGatesOther += (ni - 1);
      }
    } else if(t == TYPE_DELAY) {
      if(ni > 0) {
        // assume 1 D-flipflop of 9 NAND gates per delay amount
        if(c.number <= 1) {
          numTransistors += dffTransistors;
          numGatesOther += dffGates;
        } else {
          numTransistors += dffTransistors * c.number;
          numGatesOther += dffGates * c.number;
        }
      }
    } else if(t == TYPE_VTE && !isSubComponent) {
      if(ni == 1 && c.vte && c.vte.numoutputs <= 0) {
        // nothing, is 1-bit output
      } else {
        numTransistorsLarge += cpuTransistors;
        numTransistorsLarge += ni * ffTransistors;
        numGatesLarge += cpuGates;
        numGatesLarge += ni * ffGates;
      }
    } else if(t == TYPE_ALU && !isSubComponent) {
      numTransistorsLarge += cpuTransistors;
      numTransistorsLarge += ni * ffTransistors;
      numGatesLarge += cpuGates;
      numGatesLarge += ni * ffGates;
    } else if(t == TYPE_ROM && !isSubComponent && c.rom) {
      var rom = c.rom;
      var isrom = !(rom.decoder || rom.encoder || rom.priority || rom.ram);
      var perbit = 0;
      if(rom.ram || isrom) {
        perbit = 1;
        if(rom.ram) perbit = dffTransistors;
        if(rom.array.length) {
          numTransistorsLarge += rom.array.length * rom.array[0].length * perbit;
          numGatesLarge += rom.array.length * rom.array[0].length * perbit;
        }
      }
      // handling of the encoding/decoding of inputs
      // TODO: get better estimate of amount transistors per input for decoder/encoder/priority
      if(!rom.onehot) {
        numTransistorsLarge += ni * 32;
        numGatesLarge += ni * 16;
      }
    } else if(t == TYPE_MUX && !isSubComponent) {
      // only an estimate
      if(ni >= 3) {
        numTransistorsLarge += (ni - 2) * 8; // 2-input MUX (+ selector) can be made from 4 NANDs = 8 transistors. All other input amounts = estimate.
        numGatesLarge += (ni - 2) * 3; // for the gates, don't count 4 NANDs, but instead 2 ANDs (one with negated input, not counted as separate gate by the counting logic for all other gates either) and an OR
      }
      if(ni  > 3) {
        numTransistorsLarge += ni * 32;  // assume some encoding/decoding needed
        numGatesLarge += ni * 16;  // TODO: better estimate
      }
    } else if(t == TYPE_DOTMATRIX && !isSubComponent) {
      // only an estimate
      // <= 3 inputs is considered simple RGB LED so does not add transitors. > 3 inputs is considered dot matrix screen with complex circuitry inside.
      if(ni > 3) {
        numTransistorsLarge += cpuTransistors;
        numTransistorsLarge += ni * ffTransistors;
        numGatesLarge += cpuGates;
        numGatesLarge += ni * ffGates;
      }
    }

    // each inverted input adds one more transistor to the estimate
    for(var j = 0; j < c.inputs_negated.length; j++) {
      if(c.inputs_negated[j]) {
        numTransistors++;
        numInvertedInputs++;
      }
    }
  }

  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      var c0 = world[y0][x0].circuitsymbol;
      if(c0 != ' ') numCells++;
    }
  }

  var text = '';
  text += 'world width: ' + w + '\n';
  text += 'world height: ' + h + '\n';
  text += 'num circuit cells: ' + numCells + '\n'; // not comments, isolators, ...
  text += '\n';
  text += ' real-world stats\n';
  text += 'estimated num transistors: ' + (numTransistors + numTransistorsLarge) + '\n'; // not exact for large components like built-in flip-flops, ALUs, ...
  text += 'num transistors (excluding large devices): ' + numTransistors  + '\n';
  text += 'estimated num logic gates: ' + (numGates + numGatesLarge + numGatesOther) + '\n'; // not exact for large components like built-in flip-flops, ALUs, ... Also, inverted inputs for logic gates are not counted as extra gates, and multi-input gates count as 1 gate.
  text += 'num standard logic gates: ' + numGates + '\n';
  text += 'num inverted inputs (extra NOT gates): ' + numInvertedInputs  + '\n';
  text += '\n';
  text += ' component stats\n';
  text += 'num components: ' + numComponents + '\n';
  text += 'num on components: ' + numOnComponents + '\n';
  text += 'num off components: ' + numOffComponents + '\n';
  text += 'num component inputs: ' + numComponentInputs + '\n';
  text += 'num defined ICs: ' + Object.keys(defsubs).length + '\n';
  text += 'num IC usages: ' + callsubs.length + '\n';
  text += '\n';
  text += ' other logicemu-related stats\n';
  text += 'num non-hidden components: ' + numVisibleComponents + '\n'; // not in chip etc...
  text += 'num components (full): ' + components.length + '\n'; // includes components for internal workings, not relevant to the actual circuit
  return text;
}


function createMenuUI() {
  if(menuRows) util.removeElement(menuRows);

  menuRows = util.makeElementAt('div', 0, 0);
  menuRows.style.position = 'fixed';
  menuRows.style.display = 'block';
  menuRows.style.width = '100%';
  menuRows.style.height = '100px';

  menuRow0El = util.makeElementAt('span', 0, 0, menuRows);
  menuRow1El = util.makeElementAt('span', 0, 24, menuRows);
  menuRow2El = util.makeElementAt('span', 0, 72, menuRows);
  menuRow3El = util.makeElementAt('span', 0, 104, menuRows);

  menuRows.style.zIndex = 5; // can be anything as long as it's higher than what we assign to editarea

  menuRow0El.style.background = '#f8f8f8';
  menuRow0El.style.position = 'absolute';
  menuRow0El.style.width = '100%';
  menuRow0El.style.height = '32px';
  menuRow1El.style.background = '#f8f8f8';
  menuRow1El.style.position = 'absolute';
  menuRow1El.style.width = '100%';
  menuRow1El.style.height = '48px';
  menuRow2El.style.background = '#f8f8f8';
  menuRow2El.style.position = 'absolute';
  menuRow2El.style.width = '100%';
  menuRow2El.style.height = '32px';
  menuRow3El.style.background = '#f8f8f8';
  menuRow3El.style.position = 'absolute';
  menuRow3El.style.width = '100%';
  menuRow3El.style.height = '32px';
  menuRow3El.style.boxShadow = '0px 4px 4px #aaa';

  var modes = [
    ['immediate', 1], // faster than electron: recursively resolved gates, and keeps updating until things stop changing (in combinational circuits, that's after only 1 tick)
    ['electron', 3], // designed for gate-level flip-flops (but the built-in flip flops don't need this mode, those work as ideal flipflop in all modes!)
  ];
  function getMode() {
    for(var i = 0; i < modes.length; i++) {
      if(UPDATE_ALGORITHM == modes[i][1]) {
        return i;
      }
    }
    return -1;
  }


  var modeDropdown = util.makeUIElement('select', menuRow2El);
  modeDropdown.title = 'Choose Emulation Algorithm. *) immediate: does fast updates (all gates at once in sorted order, or as sorted as possible in case of loops) when using a button or timer. Updates until things stop changing (1 tick for combinational circuits).' +
                       ' *) electron: does slow update (gate-per-gate) every so many milliseconds, emulates flip-flops crafted from gates in more interesting way with even a randomness mechanism to get them out of metastable state.' +
                       ' When loading a new circuit, a mode is automatically chosen as follows: by default, immediate. If a particular type of loop between gates (such as in SR latch) is detected, electron. If any other loop is present: immediate'
                       ;
  modeDropdown.onchange = function() {
    var mode = modeDropdown.selectedIndex;
    if(mode >= modes.length) mode = 0;
    UPDATE_ALGORITHM = modes[mode][1];
    updateModeButtonText();
    updatePauseButtonText();
  };

  for(var i = 0; i < modes.length; i++) {
    var el = util.makeElement('option', modeDropdown).innerText = modes[i][0];
  }

  updateModeButtonText = function() {
    var mode = getMode();
    if(mode == -1) modeDropdown.selectedIndex = -1;
    else modeDropdown.selectedIndex = mode;
  }


  var tickButton = util.makeUIElement('button', menuRow2El);
  tickButton.innerText = 'tick';
  tickButton.title = 'Tick once. This allows ticking the circuit when paused, to investigate the signal. Especially useful in paused electron mode, or paused immediate mode if there are flip-flops or other sequential parts.';
  tickButton.onclick = function() {
    if(!isPaused()) pause();
    update();
  }

  updatePauseButtonText = function() {
    pauseButton.innerText = isPaused() ? 'paused' : 'pause';
  }
  var pauseButton = util.makeUIElement('button', menuRow2El, 3);
  pauseButton.innerText = 'pause';
  pauseButton.title = 'pauses running circuit and timers, or enables them again if already paused. If paused, use the tick button to manually advance circuit state step by step instead. If you press switches of the circuit while paused, the update will be visible after you use the tick button.';
  pauseButton.onclick = function() {
    if(isPaused()) {
      unpause();
    } else {
      pause();
      suspendAudioContext();
    }
    updateTimeButtonBorders();
  };
  updatePauseButtonText();


  var slowerButton = util.makeUIElement('button', menuRow2El, 3);
  slowerButton.title = 'slows down simulation';
  slowerButton.innerText = 'slow';
  slowerButton.onclick = function() {
    AUTOSECONDS = NORMALTICKLENGTH * 10;

    pause();
    unpause();

    updateTimeButtonBorders();
  };

  var normalButton = util.makeUIElement('button', menuRow2El, 3);
  normalButton.title = 'set to standard speed';
  normalButton.innerText = 'norm';
  normalButton.onclick = function() {
    AUTOSECONDS = NORMALTICKLENGTH;

    pause();
    unpause();

    updateTimeButtonBorders();
  };

  var boostButton = util.makeUIElement('button', menuRow2El, 3);
  boostButton.title = 'speeds up simulation, if possible within the computational resources of the web browser';
  boostButton.innerText = 'fast';
  boostButton.onclick = function() {
    AUTOSECONDS = NORMALTICKLENGTH / 10;

    pause();
    unpause();

    updateTimeButtonBorders();
  };

  var timebuttons = [pauseButton, slowerButton, normalButton, boostButton];

  updateTimeButtonBorders = function() {
    var j = 0;
    if(isPaused()) j = 0;
    else if(AUTOSECONDS > NORMALTICKLENGTH) j = 1;
    else if(AUTOSECONDS == NORMALTICKLENGTH) j = 2;
    else if(AUTOSECONDS < NORMALTICKLENGTH) j = 3;
    for (var i = 0; i < 4; i++) {
      if(i == j) {
        util.highlightUIElementBorder(timebuttons[i], i == 2 ? 'black' : 'red');
      } else {
        util.styleUIElementBorder(timebuttons[i]);
      }
    }
  }


  ticksCounterEl = util.makeElement('div', menuRow2El);
  ticksCounterEl.innerHTML = '&nbspticks:' + numticks;
  ticksCounterEl.style.width = '100px';
  ticksCounterEl.style.display = 'inline-block';
  ticksCounterEl.style.whiteSpace = 'nowrap';
  //ticksCounterEl.style.fontSize = '90%';
  ticksCounterEl.title = 'Amount of ticks so far. Click to reset to 0. If in electron mode, is per gate ticks. In immediate mode, one tick per full update.';
  ticksCounterEl.onclick = function() {
    numticks = 0;
    updateTicksDisplay();
  };

  updateTicksDisplay = function() {
    ticksCounterEl.innerHTML = '&nbspticks:' + numticks;
  };



  rendererDropdown = util.makeUIElement('select', menuRow2El);
  rendererDropdown.title = 'Choose renderer: graphical or text. Graphical is with HTML5 canvas and has better looking wire connections but may be slower for huge circuits. Text mode is faster and is more closely related to how you edit circuits with ASCII text.';
  rendererDropdown.onchange = function() {
    graphics_mode = rendererDropdown.selectedIndex;
    graphics_mode_actual = rendererDropdown.selectedIndex;
    initDivs();
    render();
  };
  util.makeElement('option', rendererDropdown).innerText = 'text';
  util.makeElement('option', rendererDropdown).innerText = 'graphical';
  rendererDropdown.selectedIndex = graphics_mode;

  var colorDropdown = util.makeUIElement('select', menuRow2El, 3);
  colorDropdown.title = 'Choose color scheme';
  colorDropdown.onchange = function() {
    util.setLocalStorage(colorDropdown.selectedIndex, 'color_scheme');
    setColorScheme(colorDropdown.selectedIndex);
    initDivs();
    render();
  };
  util.makeElement('option', colorDropdown).innerText = 'light';
  util.makeElement('option', colorDropdown).innerText = 'dark';
  util.makeElement('option', colorDropdown).innerText = 'gray';
  util.makeElement('option', colorDropdown).innerText = 'blue';
  util.makeElement('option', colorDropdown).innerText = 'green';
  util.makeElement('option', colorDropdown).innerText = 'candy';
  util.makeElement('option', colorDropdown).innerText = 'inverted';
  util.makeElement('option', colorDropdown).innerText = 'monochrome';
  util.makeElement('option', colorDropdown).innerText = 'contrast';
  colorDropdown.selectedIndex = colorscheme;

  var zoomoutButton = util.makeUIElement('button', menuRow2El, 1);
  zoomoutButton.innerText = '-';
  zoomoutButton.title = 'Zoom out';
  zoomoutButton.onclick = function() {
    if(tw <= 8 && th <= 8) return;
    tw = Math.floor(tw * 0.66);
    th = Math.floor(th * 0.66);
    if(tw < 8) tw = 8;
    if(th < 8) th = 8;
    initDivs();
    render();
  };

  var zoominButton = util.makeUIElement('button', menuRow2El, 1);
  zoominButton.innerText = '+';
  zoominButton.title = 'Zoom in';
  zoominButton.onclick = function() {
    if(tw >= 64 && th >= 64) return;
    tw = Math.floor(tw * 1.5);
    th = Math.floor(th * 1.5);
    if(tw > 64) tw = 64;
    if(th > 64) th = 64;
    initDivs();
    render();
  };

  util.makeUISpacer(16, menuRow2El);

  changeDropdown = util.makeUIElement('select', menuRow2El);
  changeDropdown.title = 'Perform simple edit operations while the circuit is running. Change the type of a gate, switch or LED. First click an option from this list, then the main cell of a device (e.g. the "a" of an AND gate).' +
      ' This is a very limited form of editing. It doesn\'t support creating or removing wire connections. It can only change a device that has one of the types in the list to another type in the list. On other devices it may either do nothing, or cause' +
      ' unexpected behavior. Changes in IC templates have no effect on instances. Changes are not saved. Use the full editor or import for more complete features intstead.';
  changeDropdown.onchange = function() {
    changeMode = changeDropdownElements[changeDropdown.selectedIndex];
  };
  for(var i = 0; i < changeDropdownElements.length; i++) {
    var type = changeDropdownElements[i];
    var text = (typesymbols[type] == undefined) ? '[change]' : typesymbols[type];
    //if(type == 'rem_inputs') text = 'disconnect inputs';
    if(type == 'c' || type == 'C') text = type;
    var el = util.makeElement('option', changeDropdown).innerText = text;
  }

  util.makeUISpacer(16, menuRow2El);
  statsButton = util.makeUIElement('button', menuRow2El);
  statsButton.innerText = 'stats';
  statsButton.title = 'show circuit statistics and parameters. The estimated num transistors assumes NMOS logic, gives exact value when only using basic 2-input logic gates (AND, NAND, XOR, ...), but will use some arbitrary large amount of transistors per big built-in device (ALU, terminal emulator, ...)';
  statsButton.onclick = function() {
    if(dialogDiv) return;
    dialogDiv = util.makeAbsElement('div', 200, 200, 400, 500);
    dialogDiv.style.backgroundColor = 'white';
    dialogDiv.style.position = 'fixed';
    dialogDiv.style.border = '1px solid black';
    dialogDiv.style.zIndex = '100';
    dialogDiv.style.padding = '10px';


    var text = getStatsText();
    dialogDiv.innerText = text;
    var hide = function() {
      util.removeElement(dialogDiv);
      dialogDiv = undefined;
    };
    util.makeInternalButton('ok', dialogDiv, (400 - 100), (500 - 30), hide);
  };

  circuitDropdownSpan = util.makeElement('span', menuRow1El);

  var prevCircuitButton = util.makeUIElement('button', menuRow1El, 1);
  prevCircuitButton.innerText = '<';
  prevCircuitButton.title = 'Previous built-in circuit';
  prevCircuitButton.onclick = function() {
    for(;;) {
      if(currentSelectedCircuit == 0) return;
      currentSelectedCircuit--;
      if(!allRegisteredCircuits[currentSelectedCircuit].istitle) break;
    }
    parseText(allRegisteredCircuits[currentSelectedCircuit].text,
        allRegisteredCircuits[currentSelectedCircuit].title,
        allRegisteredCircuits[currentSelectedCircuit]);
  };

  var nextCircuitButton = util.makeUIElement('button', menuRow1El, 1);
  nextCircuitButton.innerText = '>';
  nextCircuitButton.title = 'Next built-in circuit';
  nextCircuitButton.onclick = function() {
    for(;;) {
      if(currentSelectedCircuit + 1 >= allRegisteredCircuits.length) return;
      currentSelectedCircuit++;
      if(!allRegisteredCircuits[currentSelectedCircuit].istitle) break;
    }
    parseText(allRegisteredCircuits[currentSelectedCircuit].text,
        allRegisteredCircuits[currentSelectedCircuit].title,
        allRegisteredCircuits[currentSelectedCircuit]);
  };


  util.makeUISpacer(16, menuRow1El)

  var importButton = util.makeUIElement('button', menuRow1El);
  importButton.innerText = 'import';
  importButton.title = 'Import a circuit from its ASCII diagram copypasted from elsewhere. Paste it into the field that appears and use the buttons to import or cancel. To export a circuit instead, use the "export" button (or "edit" to change it), or create your own circuit in a text editor (see the editing help).';
  importButton.onclick = function() {
    if(!editmode) {
      var fontsize = 10;
      var ewidth = 60;
      var eheight = 60;
      editdiv = makeDiv(30-5, 128-5, 400+15, 400+15+30);
      editdiv.style.backgroundColor = '#888';
      editdiv.style.position = 'fixed';
      editarea = util.makeAbsElement('textarea', 5, 5, 400, 400, editdiv);
      editarea.rows = 40;
      editarea.cols = 40;
      editarea.value = '';
      editarea.style.fontSize = fontsize + 'px';
      editdiv.style.zIndex = '100';
      editarea.focus();

      util.makeInternalButton('import', editdiv, 330, 415, importButton.onclick);
      util.makeInternalButton('cancel', editdiv, 245, 415, function() {
        editModeCancelFun();
      });

      pause();
      importButton.innerText = 'done';
      window.scrollTo(0, 0);
      editmode = true;
      editModeCancelFun = function() {
        document.body.removeChild(editdiv);
        importButton.innerText = 'import';
        editmode = false;
        createMenuUI();
        unpause();
      };
      editModeFinishFun = function() {
        var newtext = editarea.value;
        document.body.removeChild(editdiv);
        importButton.innerText = 'import';
        editmode = false;
        createMenuUI();
        if(newtext.length > 0) parseText(newtext, 'imported circuit', undefined, 1);
      };
      createEditorMenuUI(editModeCancelFun, editModeFinishFun);
    } else {
      editModeFinishFun();
    }
  };

  var exportButton = util.makeUIElement('button', menuRow1El);
  exportButton.innerText = 'export';
  exportButton.title = 'Export circuit ASCII diagram, to easily store it elsewhere in text format or share. Note: an alternative but less good looking way is to share the URL, if it has a code (not if the circuit is too large; the actual circuit itself is encoded and compressed in the URL code, it is not stored anywhere)';
  exportButton.onclick = function() {
    if(!editmode) {
      var fontsize = 10;
      var ewidth = 60;
      var eheight = 60;
      editdiv = makeDiv(30-5, 128-5, 400+15, 400+15+30);
      editdiv.style.backgroundColor = '#888';
      editdiv.style.position = 'fixed';
      editarea = util.makeAbsElement('textarea', 5, 5, 400, 400, editdiv);
      editarea.rows = 40;
      editarea.cols = 40;
      editarea.value = origtext;
      editarea.style.fontSize = fontsize + 'px';
      editdiv.style.zIndex = '100';
      editarea.select();
      editarea.focus();

      util.makeInternalButton('cancel', editdiv, 330, 415, function() {
        editModeCancelFun();
      });

      pause();
      exportButton.innerText = 'done';
      window.scrollTo(0, 0);
      editmode = true;
      editModeCancelFun = function() {
        document.body.removeChild(editdiv);
        importButton.innerText = 'import';
        editmode = false;
        unpause();
        createMenuUI();
      };
      editModeFinishFun = editModeCancelFun;
      createEditorMenuUI(editModeCancelFun, editModeFinishFun);
    } else {
      editModeFinishFun();
    }
  };

  util.makeUISpacer(16, menuRow1El)

  var settingsButton = util.makeUIElement('button', menuRow1El, 3);
  settingsButton.innerText = 'settings';
  settingsButton.title = 'settings';
  settingsButton.onclick = function() {
    editdiv = makeDiv(30-5, worldstartheight, 400+15, 400+15+30);
    editdiv.style.backgroundColor = '#888';
    editdiv.style.position = 'fixed';
    window.scrollTo(0, 0);
    editmode = true;
    editModeFinishFun = function() {
      createMenuUI();
    };
    editModeCancelFun = editModeFinishFun;
    createEditorMenuUI(undefined, editModeFinishFun);
    editdiv.style.zIndex = 100;
    util.makeInternalButton('ok', editdiv, 300, 415, function() {
      document.body.removeChild(editdiv);
      editmode = false;
      editModeCancelFun();
    });
    var cb = util.makeElementAt('input', 20, 20, editdiv);
    cb.type = 'checkbox';
    cb.checked = NEWEDIT;
    cb.onchange = function() {
      NEWEDIT = cb.checked;
    };
    var text = util.makeElementAt('span', 50, 20, editdiv);
    text.innerText = 'enable experimental possible new editor';
  };


  editButton = util.makeUIElement('button', menuRow1El, 3);
  editButton.innerText = 'edit';
  editButton.title = 'Opens text field to edit the map. Press this button again to stop editing and run the new circuit. Read the editing tutorial under "help" first. Advice: for large projects, do not actually edit in the text field because that is fiddly, use a good text editor (that has block selection), or copypaste a circuit in here from an external source. ' +
                     'Once you use edit, the circuit will be saved in local storage (only the most recent one). To remove such save, press the forget button. Local storage is unreliable, so if you made a circuit you want to keep, copypaste it into a text editor and save it as a .txt file on disk instead. Note that nothing gets sent to any server or cloud, everything is' +
                     'local to your computer only.';
  editButton.onclick = function() {
    if(!editmode) {
      textbeforeedit = origtext;

      if(NEWEDIT) {
        edit = new Editor();
      } else {
        edit = new SimpleEditor();
      }

      //setUpEditor();
      edit.setUp();
      var oldw = w;
      var oldh = h;
      resetForParse();
      w = oldw;
      h = oldh;

      pause();
      numticks = 0;
      initDivs();

      editButton.innerText = 'done';
      window.scrollTo(0, 0);
      editmode = true;
      editModeCancelFun = cancelEdit;
      editModeFinishFun = finishEdit;
      createEditorMenuUI(editModeCancelFun, editModeFinishFun);
    } else {
      editModeFinishFun();
    }
  };

  if(util.getLocalStorage('circuit_text')) {
    var restoreButton = util.makeUIElement('button', menuRow1El, 3);
    restoreButton.innerText = 'restore';
    restoreButton.title = 'Restore circuit you created before with edit. Only works if an actual circuit was found in local storage.';
    restoreButton.onclick = function() {
      if(maybeLoadFromLocalStorage()) {
        parseText(initialCircuitText, initialTitle, initialId ? linkableCircuits[initialId] : null, 1);
      }
    };

    var forgetButton = util.makeUIElement('button', menuRow1El, 3);
    forgetButton.innerText = 'forget';
    forgetButton.title = 'If you have edited a circuit, this removes the saved circuit from local storage. If you refresh after pressing this button ' +
                         'and also remove URL fragments (#id=... or #code=...), you will no longer see the last circuit you edited, but the default introduction. WARNING! ' +
                         'if you want to keep your circuit, make sure you save it to disk first! That can be done by ' +
                         'using the export button, or copypasting it from the edit field, into a text editor and saving to your disk, e.g. as a .txt file.';
    forgetButton.onclick = function() {
      util.setLocalStorage('', 'circuit_text');
      util.clearFragment();
    };
  }



  var indexLink = util.makeElement('span', menuRow0El);
  indexLink.title = 'go to the main welcome page and remove tokens from URL';
  if(util.getCGIParameterByName('id')) {
    indexLink.innerHTML = '&nbsp;&nbsp;<a href="' + util.getUrlWithoutQueries() + '">index</a>';
  } else {
    indexLink.innerHTML = 'index';
    //indexLink.style.paddingLeft = '10px';
    indexLink.style.color = '#00e';
    indexLink.style.textDecoration = 'underline';
    indexLink.style.cursor = 'pointer';
    indexLink.onclick = function() {
      if(origtext == introText) return;
      parseText(introText, introTitle, linkableCircuits[introId]);
    };
  }

  var helpLink = util.makeElement('span', menuRow0El);
  helpLink.title = 'go to the help index page';
  helpLink.innerHTML = 'help';
  helpLink.style.paddingLeft = '10px';
  helpLink.style.color = '#00e';
  helpLink.style.textDecoration = 'underline';
  helpLink.style.cursor = 'pointer';
  helpLink.onclick = function() {
    var circuit = linkableCircuits['helpindex'];

    parseText(circuit.text, circuit.id, circuit);
  };


  var githubLink = util.makeElement('span', menuRow0El);
  githubLink.style.paddingLeft = '10px';
  githubLink.innerHTML = '<a href="https://github.com/lvandeve/logicemu" target="_blank">github</a>';
  githubLink.style.paddingRight = '10px';


  circuitNameEl = util.makeElement('span', menuRow3El);
  circuitNameEl.innerHTML = 'Circuit Name';
  //circuitNameEl.style.backgroundColor = '#0f0';
  //circuitNameEl.style.border = '1px solid #080';
  circuitNameEl.style.fontSize = '27px';
  circuitNameEl.style.paddingLeft = '8px';
  circuitNameEl.style.fontWeight = 'bold';
  //circuitNameEl.style.marginTop = '-8px';
  //circuitNameEl.style.marginLeft = '520px';
  //circuitNameEl.style.marginTop = '20px';
  //circuitNameEl.style.padding = '2px';
  //circuitNameEl.style.position = 'absolute';
  //circuitNameEl.style.top = '32px';
  //circuitNameEl.style.left = '650px'; // 712px
  //circuitNameEl.style.height = '34px';
  //circuitNameEl.style.zIndex = '100';


  /*var directLinkSpan = util.makeElement('span', menuRow1El);
  directLinkSpan.innerHTML = '&nbsp;&nbsp;';//<a href="' + util.getUrlWithoutQueries() + '">direct link</a>';
  var directLink = util.makeElement('a', directLinkSpan);
  directLink.innerText = 'direct link';
  directLink.href = util.getUrlWithoutQueries();
  directLink.style.visibility = 'hidden';
  directLink.title = 'external link to link directly to this circuit rather than the index page';*/

  fillRegisteredCircuits();
}

//go to editor on load, for easy development on it
//NEWEDIT=true;window.setTimeout(function(){tw = Math.ceil(tw * 0.75); th = Math.ceil(th * 0.75); editButton.click();}, 300);


// called by footer.js
function maybeLoadFromLocalStorage() {
  // the text you last edited is remembered. To remove the memory, use the edit button, clear the string, and save
  var stored_text = util.getLocalStorage('circuit_text');
  if(!stored_text) return false;
  if (stored_text != '' && !!stored_text) {
    initialCircuitText = stored_text;
    initialTitle = 'stored circuit';
    initialId = null;
  }

  return true;
}

// called by footer.js
function maybeLoadFromLinkId() {
  var link_id = util.getFragmentParameterByName('id');
  if(!link_id) return false;

  var linkableCircuit = linkableCircuits[link_id];
  if(linkableCircuit) {
    initialCircuitText = linkableCircuit.text;
    initialTitle = linkableCircuit.title;
    initialId = link_id;
    currentSelectedCircuit = linkableCircuit.index;
  } else {
    initialCircuitText = 'R>l 1"Circuit with id \'' + link_id + '\' not found, loading intro instead." l<R\n\n' + introText;
    initialTitle = introTitle;
    initialId = introId;
  }

  return true;
}

// called by footer.js
function maybeLoadFromUrlCode() {
  var code = util.getFragmentParameterByName('code');
  if(!code) return false;
  var text = decodeBoard(code);

  if(text) {
    initialCircuitText = text;
    initialTitle = 'Decoded circuit';
    initialId = undefined;
  } else {
    initialCircuitText = 'R>l 1"Invalid #code in the URL" l<R\n\n' + introText;
    initialTitle = introTitle;
    initialId = introId;
  }

  return true;
}

////////////////////////////////////////////////////////////////////////////////

// To URL-compatible base64 (https://tools.ietf.org/html/rfc7515#appendix-C)
function toBase64(text) {
  var result = btoa(text);
  // remove padding, and use -_ instead of +/
  result = result.split('=')[0];
  result = result.replace(new RegExp('\\+', 'g'), '-');
  result = result.replace(new RegExp('/', 'g'), '_');
  return result;
}

// From URL-compatible base64 (https://tools.ietf.org/html/rfc7515#appendix-C)
function fromBase64(enc) {
  enc = enc.replace(new RegExp('-', 'g'), '+');
  enc = enc.replace(new RegExp('_', 'g'), '/');
  if((enc.length & 3) == 2) enc += '==';
  else if((enc.length & 3) == 3) enc += '=';
  return atob(enc);
}


// converts array of unicode codepoints to JS string
function arrayToString(a) {
  var s = '';
  for(var i = 0; i < a.length; i++) {
    //s += String.fromCharCode(a[i]);
    var c = a[i];
    if (c < 0x10000) {
       s += String.fromCharCode(c);
    } else if (c <= 0x10FFFF) {
      s += String.fromCharCode((c >> 10) + 0xD7C0);
      s += String.fromCharCode((c & 0x3FF) + 0xDC00);
    } else {
      s += ' ';
    }
  }
  return s;
}

// ignores the utf-32 unlike arrayToString but that's ok for now
function arrayToStringPart(a, pos, len) {
  var s = '';
  for(var i = pos; i < pos + len; i++) {
    s += String.fromCharCode(a[i]);
  }
  return s;
}

// converts JS string to array of unicode codepoints
function stringToArray(s) {
  var a = [];
  for(var i = 0; i < s.length; i++) {
    //a.push(s.charCodeAt(i));
    var c = s.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < s.length) {
      var c2 = s.charCodeAt(i + 1);
      if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
        c = (c << 10) + c2 - 0x35FDC00;
        i++;
      }
    }
    a.push(c);
  }
  return a;
}

/** @constructor */
function LZ77Coder() {
  this.lz77MatchLen = function(text, i0, i1) {
    var l = 0;
    while(i1 + l < text.length && text[i1 + l] == text[i0 + l] && l < 255) {
      l++;
    }
    return l;
  };

  this.encodeString = function(text) {
    return arrayToString(this.encode(stringToArray(text)));
  };

  this.decodeString = function(text) {
    return arrayToString(this.decode(stringToArray(text)));
  };

  // Designed mainly for 7-bit ASCII text. Although the text array may contain values
  // above 127 (e.g. unicode codepoints), only values 0-127 are encoded efficiently.
  this.encode = function(text) {
    var result = [];
    var map = {};

    var encodeVarint = function(i, arr) {
      if(i < 128) {
        arr.push(i);
      } else if(i < 16384) {
        arr.push(128 | (i & 127));
        arr.push(i >> 7);
      } else {
        arr.push(128 | (i & 127));
        arr.push(128 | ((i >> 7) & 127));
        arr.push((i >> 14) & 127);
      }
    };

    for(var i = 0; i < text.length; i++) {
      var len = 0;
      var dist = 0;

      var sub = arrayToStringPart(text, i, 4);
      var s = map[sub];
      if(s) {
        for(var j = s.length - 1; j >= 0; j--) {
          var i2 = s[j];
          var d = i - i2;
          if(d > 2097151) break;
          var l = this.lz77MatchLen(text, i2, i);
          if(l > len) {
            len = l;
            dist = d;
            if(l > 255) break; // good enough, stop search
          }
        }
      }

      if(len > 2097151) len = 2097151;

      if(!(len > 5 || (len > 4 && dist < 16383) || (len > 3 && dist < 127))) {
        len = 1;
      }

      for(var j = 0; j < len; j++) {
        var sub = arrayToStringPart(text, i + j, 4);
        if(!map[sub]) map[sub] = [];
        if(map[sub].length > 1000) map[sub] = []; // prune
        map[sub].push(i + j);
      }
      i += len - 1;

      if(len >= 3) {
        if(len < 130) {
          result.push(128 + len - 3);
        } else {
          var len2 = len - 128;
          result.push(255);
          encodeVarint(len2, result);
        }
        encodeVarint(dist, result);
      } else {
        var c = text[i];
        if(c < 128) {
          result.push(c);
        } else {
          // Above-ascii character, encoded as unicode codepoint (not UTF-16).
          // Normally such character does not appear in circuits, but it could in comments.
          result.push(255);
          encodeVarint(c - 128, result);
          result.push(0);
        }
      }
    }
    return result;
  };

  this.decode = function(encoded) {
    var result = [];
    var temp;
    for(var i = 0; i < encoded.length;) {
      var c = encoded[i++];
      if(c > 127) {
        var len = c + 3 - 128;
        if(c == 255) {
          len = encoded[i++];
          if(len > 127) len += (encoded[i++] << 7) - 128;
          if(len > 16383) len += (encoded[i++] << 14) - 16384;
          len += 128;
        }
        dist = encoded[i++];
        if(dist > 127) dist += (encoded[i++] << 7) - 128;
        if(dist > 16383) dist += (encoded[i++] << 14) - 16384;

        if(dist == 0) {
          result.push(len);
        } else {
          for(var j = 0; j < len; j++) {
            result.push(result[result.length - dist]);
          }
        }
      } else {
        result.push(c);
      }
    }
    return result;
  };
}


/** @constructor */
function RangeCoder() {
  this.base = 256;
  this.high = 1 << 24;
  this.low = 1 << 16;
  this.num = 256;
  this.values = [];
  this.inc = 8;

  this.reset = function() {
    this.values = [];
    for(var i = 0; i <= this.num; i++) {
      this.values.push(i);
    }
  };

  this.floordiv = function(a, b) {
    return Math.floor(a / b);
  };

  // Javascript numbers are doubles with 53 bits of integer precision so can
  // represent unsigned 32-bit ints, but logic operators like & and >> behave as
  // if on 32-bit signed integers (31-bit unsigned). Mask32 makes the result
  // positive again. Use e.g. after multiply to simulate unsigned 32-bit overflow.
  this.mask32 = function(a) {
    return ((a >> 1) & 0x7fffffff) * 2 + (a & 1);
  };

  this.update = function(symbol) {
    // too large denominator
    if(this.getTotal() + this.inc >= this.low) {
      var last = this.values[0];
      for(var i = 0; i < this.num; i++) {
        var d = this.values[i + 1] - last;
        d = (d > 1) ? this.floordiv(d, 2) : d;
        last = this.values[i + 1];
        this.values[i + 1] = this.values[i] + d;
      }
    }
    for(var i = symbol + 1; i < this.values.length; i++) {
      this.values[i] += this.inc;
    }
  };

  this.getProbability = function(symbol) {
    return [this.values[symbol], this.values[symbol + 1]];
  };

  this.getSymbol = function(scaled_value) {
    var symbol = this.binSearch(this.values, scaled_value);
    var p = this.getProbability(symbol);
    p.push(symbol);
    return p;
  };

  this.getTotal = function() {
    return this.values[this.values.length - 1];
  };

  // returns last index in values that contains entry that is <= value
  this.binSearch = function(values, value) {
    var high = values.length - 1, low = 0, result = 0;
    if(value > values[high]) return high;
    while(low <= high) {
      var mid = this.floordiv(low + high, 2);
      if(values[mid] >= value) {
        result = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    if(result > 0 && values[result] > value) result--;
    return result;
  };

  this.encodeString = function(text) {
    return arrayToString(this.encode(stringToArray(text)));
  };

  this.decodeString = function(text) {
    return arrayToString(this.decode(stringToArray(text)));
  };

  this.encode = function(data) {
    this.reset();

    var result = [1];
    var low = 0;
    var range = 0xffffffff;

    result.push(data.length & 255);
    result.push((data.length >> 8) & 255);
    result.push((data.length >> 16) & 255);
    result.push((data.length >> 24) & 255);

    for(var i = 0; i < data.length; i++) {
      var c = data[i];
      var p = this.getProbability(c);
      var total = this.getTotal();
      var start = p[0];
      var size = p[1] - p[0];
      this.update(c);
      range = this.floordiv(range, total);
      low = this.mask32(start * range + low);
      range = this.mask32(range * size);

      for(;;) {
        if(low == 0 && range == 0) {
          return null; // something went wrong, avoid hanging
        }
        if(this.mask32(low ^ (low + range)) >= this.high) {
          if(range >= this.low) break;
          range = this.mask32((-low) & (this.low - 1));
        }
        result.push((this.floordiv(low, this.high)) & (this.base - 1));
        range = this.mask32(range * this.base);
        low = this.mask32(low * this.base);
      }
    }

    for(var i = this.high; i > 0; i = this.floordiv(i, this.base)) {
      result.push(this.floordiv(low, this.high) & (this.base - 1));
      low = this.mask32(low * this.base);
    }

    if(result.length > data.length) {
      result = [0];
      for(var i = 0; i < data.length; i++) result[i + 1] = data[i];
    }

    return result;
  };

  this.decode = function(data) {
    if(data.length < 1) return null;
    var result = [];
    if(data[0] == 0) {
      for(var i = 1; i < data.length; i++) result[i - 1] = data[i];
      return result;
    }
    if(data[0] != 1) return null;
    if(data.length < 5) return null;

    this.reset();

    var code = 0;
    var low = 0;
    var range = 0xffffffff;
    var pos = 1;
    var symbolsize = data[pos++];
    symbolsize |= (data[pos++] << 8);
    symbolsize |= (data[pos++] << 16);
    symbolsize |= (data[pos++] << 24);
    symbolsize = this.mask32(symbolsize);

    for(var i = this.high; i > 0; i = this.floordiv(i, this.base)) {
      var d = pos >= data.length ? 0 : data[pos++];
      code = this.mask32(code * this.base + d);
    }
    for(var i = 0; i < symbolsize; i++) {
      var total = this.getTotal();
      var scaled_value = this.floordiv(code - low, (this.floordiv(range, total)));
      var p = this.getSymbol(scaled_value);
      var c = p[2];
      result.push(c);
      var start = p[0];
      var size = p[1] - p[0];
      this.update(c);

      range = this.floordiv(range, total);
      low = this.mask32(start * range + low);
      range = this.mask32(range * size);
      for(;;) {
        if(low == 0 && range == 0) {
          return null; // something went wrong, avoid hanging
        }
        if(this.mask32(low ^ (low + range)) >= this.high) {
          if(range >= this.low) break;
          range = this.mask32((-low) & (this.low - 1));
        }
        var d = pos >= data.length ? 0 : data[pos++];
        code = this.mask32(code * this.base + d);
        range = this.mask32(range * this.base);
        low = this.mask32(low * this.base);
      }
    }

    return result;
  };
}


function encodeBoard(text) {
  var lz77 = (new LZ77Coder()).encodeString(text);
  var range = (new RangeCoder()).encodeString(lz77);
  return '0' + toBase64(range); // '0' = format version
}

function decodeBoard(enc) {
  if(enc[0] != '0') return null; // '0' = format version
  enc = enc.substr(1);
  var range = fromBase64(enc);
  var lz77 = (new RangeCoder()).decodeString(range);
  if(!lz77 && lz77 != '') return null;
  return (new LZ77Coder()).decodeString(lz77);
}


function testCompression(o) {
  if(!o && o != '') o = origtext;
  var e = encodeBoard(o);
  var d = decodeBoard(e);
  var ok = (d == o);
  console.log('o size: ' + Math.ceil(o.length * 8 / 6) + ', e size: ' + e.length + ', ok: ' + ok);
  if(!ok) console.log('ERROR! not equal!');
  return ok;
}

////////////////////////////////////////////////////////////////////////////////

var currentSelectedCircuit = 0;

function updateCircuitDropdowns(opt_registeredCircuit) {
  if(!opt_registeredCircuit) {
    for(var i = 0; i < circuitGroups.length; i++) {
      circuitGroups[i].dropdown.selectedIndex = 0;
    }
    return;
  }

  for(var i = 0; i < circuitGroups.length; i++) {
    if(i == opt_registeredCircuit.group) {
      circuitGroups[i].dropdown.selectedIndex = opt_registeredCircuit.groupindex + 1;
    } else {
      circuitGroups[i].dropdown.selectedIndex = 0;
    }
  }
}

function CircuitGroup(name) {
  this.name = name;
  this.circuits = [];
}

// must use registerCircuitGroup, then register circuits to add them to the last registered circuitgroup
// this is a global variable, designed to use separate .js files which each register one circuit group and then register several circuits in it
var currentCircuitGroup = null;

var circuitGroups = [];

function registerCircuitGroup(name) {
  currentCircuitGroup = new CircuitGroup(name);
  circuitGroups.push(currentCircuitGroup);
}

var allRegisteredCircuits = [];
var linkableCircuits = {};
var linkableCircuitsOrder = [];

function registerCircuit(name, circuit, opt_link_id, opt_is_title) {
  if(!opt_link_id) opt_link_id = 'circuit' + allRegisteredCircuits.length;
  var dropdownname = name;
  if(opt_is_title && name != '--------') dropdownname = '--- ' + name + ' ---';
  var index = allRegisteredCircuits.length;
  var c = {};
  c.name = name;
  c.dropdownname = dropdownname;
  c.text = circuit;
  c.title = name;
  c.linkid = opt_link_id;
  c.istitle = opt_is_title;
  c.group = circuitGroups.length - 1;
  c.index = index;
  c.groupindex = currentCircuitGroup.circuits.length;
  currentCircuitGroup.circuits.push(c);
  allRegisteredCircuits.push(c);
  if(opt_link_id) {
    linkableCircuits[opt_link_id] = c;
    linkableCircuitsOrder.push(opt_link_id);
  }
}

function registerTitle(title) {
  var name = title;
  if(!title) name = '--------';
  var circuit = '0"This is a title section. Choose the next circuit to view the first one under this title.';
  registerCircuit(name, circuit, undefined, 1);
}
var fallbackhelptext = '0"Load any circuit from the dropdowns above, or press edit to make a new one."\n0"Use help if this is your first time"';

// fills the built-in circuits in the UI
function fillRegisteredCircuits() {
  for(var i = 0; i < circuitGroups.length; i++) {
    var g = circuitGroups[i];
    g.main = util.makeElement('div', circuitDropdownSpan);
    g.main.style.display = 'inline-block';
    g.title = util.makeElement('span', g.main);
    g.title.innerText = g.name + ':';
    util.makeElement('br', g.main);
    g.dropdown = util.makeUIElement('select', g.main);
    g.dropdown.style.width = '120px';
    g.dropdown.title = 'Built-in circuit selector dropdown "' + name + '"';
    g.dropdown.onchange = bind(function(g) {
      var index = g.dropdown.selectedIndex - 1;
      var c = g.circuits[index];
      currentSelectedCircuit = c.index;
      parseText(c.text, c.title, c);
    }, g);

    var el = util.makeElement('option', g.dropdown);
    el.innerHTML = '[choose circuit]';
  }
  for(var i = 0; i < allRegisteredCircuits.length; i++) {
    var c = allRegisteredCircuits[i];
    var currentCircuitGroup = circuitGroups[c.group];
    var el = util.makeElement('option', currentCircuitGroup.dropdown);
    if(c.linkid == 'mainhelp') { el.style.fontWeight = 'bold'; }
    el.innerHTML = c.dropdownname;
  }

  updateCircuitDropdowns();
}


var introText = `
0"# Welcome to LogicEmu, an online digital logic simulator!"

0"In circuits, press the green 's' inputs with the mouse to change values."
0"Read results from the red 'l' outputs. For example, below is an AND gate 'a'."
0"Only if both switches are on, the LED will go on. Try enabling both"
0"switches by clicking them:""

  4"AND gate"   4"OR gate"   4"XOR gate"

  s..>a..>l     s..>o..>l    s..>e..>l
      ^             ^            ^
  s....         s....        s....

0"There are much more types of gates and devices available: logic gates,"
0"flip-flops, integrated circuits, ROMs, displays, ... Explore the circuits"
0"index below or read the help circuits first to learn more!"

     4"adder"          4"JK flipflop"

  s..>a..>o..>l3"carry"
     >    ^              s-->jq->l
  s..>e..>a              s-->c#
         >               s-->kQ->l
  s......>e..>l3"sum"

0"# Circuits Index"

0"INSERT:links_main"


0"You can also use the 'help', 'articles' and 'circuits' dropdowns"
0"and the prev/next buttons in the top bar to navigate to these. You can also"
0"edit or create your own circuits instead."

0"Even this welcome page itself is a circuit, named 'Welcome'"
0"in the 'help' dropdown but hidden in the list and help index above on"
0"purpose to avoid such redundancy."

0"## A note about running in the browser"

0"Even though it's called an 'online' logic simulator since it can be ran"
0"conveniently in the browser, LogicEmu runs completely offline. Once the HTML"
0"and JS got fetched, it doesn't make any further connections. All circuits are"
0"already loaded since they're part of the source code. If you get LogicEmu"
0"from github you can run it offline from your own disk."

0"Settings and edited circuit are stored in local storage (not a cookie), which is private"
0"to you, not shared. Sharing has to be done manually, which you can do either"
0"using the source code of a circuit or a base64 URL if it's small enough."

0"LogicEmu. Copyright (C) 2018-2020 by Lode Vandevenne"`;

var introTitle = 'Online Logic Simulator';

var introId = 'welcome';

function printComponentsDebug() {
  for(var i = 0; i < components.length; i++) {
    var c = components[i];
    var s = 'comp ' + i + ': ' + c.corecell.symbol + ' t:' + c.type + ' @' + c.corecell.x + ',' + c.corecell.y;
    if(c.rom) s += ' rom';
    if(c.master) s += ' master:' + c.master.index;
    if(c.ff) s += ' ff';
    console.log(s);
    for(var tempi = 0; tempi < c.inputs.length; tempi++) {
      var neg = c.inputs_negated[tempi];
      var arrowsymbol = neg ? ' -o ' : ' -> ';
      console.log('' + c.inputs[tempi].index + arrowsymbol + i);
    }
  }
}


/*
Available debug functions:
printComponentsDebug()
applyAllTransforms()
applyTransform(...)
testCompression()
CLICKDEBUG=true

*/

