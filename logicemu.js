/*
LogicEmu

Copyright (c) 2018 Lode Vandevenne

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

Welcome to the main JS source code of LogicEmu, in all its frameworkless glory.

This has been tested to work in Chrome and Firefox, and hopefully works in other browsers too.
*/

var doNotAddToParent = 'doNotAddToParent';

function makeElement(tag, opt_parent) {
  var parent = opt_parent || document.body;
  var el =  document.createElement(tag);
  if(parent != doNotAddToParent) parent.appendChild(el);
  return el;
}

function makeElementAt(tag, x, y, opt_parent) {
  var el = makeElement(tag, opt_parent);
  el.style.position = 'absolute';
  el.style.left = '' + Math.floor(x) + 'px';
  el.style.top = '' + Math.floor(y) + 'px';
  return el;
}


function makeAbsElement(tag, x, y, w, h, opt_parent) {
  var el = makeElement(tag, opt_parent);
  el.style.position = 'absolute';
  el.style.left = '' + Math.floor(x) + 'px';
  el.style.top = '' + Math.floor(y) + 'px';
  el.style.width = '' + Math.floor(w) + 'px';
  el.style.height = '' + Math.floor(h) + 'px';
  return el;
}

function removeElement(el) {
  if(!el) return;
  if(el.parentNode && el.parentNode.contains(el)) {
    el.parentNode.removeChild(el);
  }
}

function removeAllChildren(el) {
  while(el.firstChild) el.removeChild(el.firstChild);
}

function makeDiv(x, y, w, h, opt_parent) {
  var el =  makeAbsElement('div', x, y, w, h, opt_parent);
  return el;
}

function styleUIElementBorder(el) {
  el.style.border = '1px solid #888';
}

function highlightUIElementBorder(el, opt_color) {
  var color = opt_color || 'black';
  el.style.border = '2px solid ' + color;
}

function styleUIElement(el, opt_smallbutton) {
  styleUIElementBorder(el);
  el.style.height = '20px';
  el.style.width = '80px';
  el.style.margin = '1px';
  el.style.padding = '0';
  el.style.backgroundColor = '#eee';
  el.style.cursor = 'pointer';
  el.style.boxShadow = '0.5px 0.5px #aaa';
  el.style.textAligh = 'center';
  el.style.boxSizing = 'border-box';
  el.style.font = '400 13px Arial';

  if (opt_smallbutton == 1) {
    el.style.width = '20px';
  }

  if (opt_smallbutton == 2) {
    el.style.width = '40px';
  }

  if (opt_smallbutton == 3) {
    el.style.width = '60px';
  }
}


function makeUIElement(tag, opt_parent, opt_smallbutton) {
  var el = makeElement(tag, opt_parent);
  styleUIElement(el, opt_smallbutton);
  return el;
}

function makeUISpacer(width, el) {
  var s = makeElement('span', el);
  s.style.width = width + 'px';
  s.style.display = 'inline-block';
}

//bind a single argument to a function
function bind(f, arg) {
  var args = Array.prototype.slice.call(arguments, 1);
  var result = function() {
    return f.apply(this, args.concat(Array.prototype.slice.call(arguments)));
  };
  result.bound_f = f; // to be able to "extract" the original function out of it for debugging and by code
  result.bound_arg = arg; // to be able to "extract" the original function out of it for debugging and by code
  return result;
}

function textHasAt(text, pos, sub) {
  return text.substr(pos, sub.length) == sub;
}

function clone(obj) {
  // Handle the 3 simple types, and null or undefined
  if(null == obj || 'object' != typeof obj) return obj;

  // Handle Array
  if(obj instanceof Array) {
    var copy = [];
    for(var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    var copy = new obj.constructor(); //This makes it also have the correct prototype
    for(var attr in obj) {
      if(obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error('Cloning this object not supported.');
}

function getCGIParameterByName(name, opt_url) {
  var url = opt_url || window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// like getCGIParameterByName, but with # instead of ?
function getFragmentParameterByName(name, opt_url) {
  var url = opt_url || window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[#&]" + name + "(=([^&#]*)|&|#|$)");
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// sets fragment with this value. Supports only max 1 fragment in total.
function setFragment(name, value) {
  if(history && history.replaceState) {
    // using history to NOT have history!
    // with history.replaceState, this avoids it creating a new back-button entry each time you update the URL fragment
    // reason for not storing this as history: it doesn't actually work because there's nothing here that handles pressing the back button,
    // and, it's quite annoying if this app creates a long back button history so you can't go back to the real previous website you came from.
    // if I do implement history button at some point, maybe it should only go back to index, but not through all circuits visited to avoid that annoyance
    if(!value) {
      if(window.location.hash) history.replaceState(undefined, undefined, '#');
    } else {
      history.replaceState(undefined, undefined, '#' + name + '=' + value);
    }
  } else {
    // fallback for browsers that don't support history.replaceState
    if(!value) {
      if(window.location.hash) window.location.hash = '';
    } else {
      window.location.hash = '#' + name + '=' + value;
    }
  }
}

function clearFragment() {
  setFragment('', null);
}

// removes queries and fragments
function getUrlWithoutQueries() {
  var url = window.location.href;
  var q = url.indexOf('?');
  if(q >= 0) url = url.substr(0, q);
  q = url.indexOf('#');
  if(q >= 0) url = url.substr(0, q);
  return url;
}

function clearSelection() {
  if(document.selection) {
    document.selection.empty();
  } else if(window.getSelection) {
    window.getSelection().removeAllRanges();
  }
}

function localStorageSupported() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e) {
    return false;
  }
}

//remember user settings locally (note that this is all fully local, nothing gets sent to any server)
function setLocalStorage(data, name) {
  if(!localStorageSupported()) return;
  localStorage[name] = data;
}

function getLocalStorage(name) {
  if(!localStorageSupported()) return undefined;
  return localStorage[name];
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


/*
NOTE: some old names of things you may find in the code. This will help understand functions and variables more
bus = junction = ygroup = bundle = '=' (current true name: bus. And it means any bundle of wires, like a ribbon cable, not the more complex idea of shared bus in CPU (though it can be used as part of that). Used to use 'y' as ascii symbol instead of '='
sub = function = integrated circuit = IC = chip = def & call. Now uses symbols i,I. Has used u,U and f,F before. (current true name: I = IC template, i = IC usage, with IC = integrated circuit)
rom = bits = bB. serves also as ram and more (current true name: bits, with usages rom, ram, binary to unary convertor, ...)
terminal = VTE = interactive terminal = keyboard and screen. Now uses symbol T. Has used i before. (current true name: terminal, with symbol T)
global wires = backplane
*/


/*
AUTOUPDATE and UPDATE_ALGORITHM together form the way to experience the emulation.
Good combinations of AUTOUPDATE and UPDATE_ALGORITHM are as follows:
-when working on combinatorial aritmhetic things (adder or multiplier with 7-segment display output, ...): AUTOUPDATE=1, UPDATE_ALGORITHM=1
-when working with sequential circuits (with built-in flipflops): AUTOUPDATE=2, UPDATE_ALGORITHM=1
-when working with flipflops from gates: AUTOUPDATE=2, UPDATE_ALGORITHM=3
-when working on circuits where exact timing through wire is important with loops etc...: AUTOUPDATE=0, UPDATE_ALGORITHM=2
-combining the advantages of combinatorial and sequential: AUTOUPDATE=3, UPDATE_ALGORITHM=3
*/

/*
AUTOUPDATE values:
0: never update unless on manual tick
1: update when the user presses any input button, or when timers update. This is very useful for combinatorial networks with algorithm 1. However, when things take multiple steps to update, such as other update algorithms, or sequential circuits with any update algorithm, this is useless and 0 (manual ticking) or 2 (realtime ticking) should be used.
2: update automatically every AUTOSECONDS seconds
3: between 1 and 2: update as long as things keep changing
*/
var AUTOUPDATE = 1; // values described below
/*
UPDATE_ALGORITHM info:
0: "scanline": Components updated in scanline order and could read inputs from sometimes already-updated, some not-yet-updated components. This has problems such as shape of circuit affects result, so is only included for completeness, not used.
1: "fast recursive": components recursively update their inputs before themselves, for faster propagation. This breaks JK flipflops, round-and-round blinking led loops and most other things with loops.
This algorithm is good for immediate perfect full update in a single tick of final outputs based on user niputs in an asynchronic circuit like a 16-bit adder or multiplier, without any clocks, flipflops or loops
2: "slow": components only update based on the value of its inputs at the previous tick. This can break flipflops, the balance is so perfect that some flipflops can never flip to one state
This algorithm allows the "on" led in the roundabout circuit to travel around circularly, always 1 led is on
3: "twiddled slow": like slow, but with some random probability (customizable, e.g. 10%), a gate does not update [or alternatively uses the previous-previous instead of just previous as input.] This may randomly fix some metastable flipflops..
*/

var UPDATE_ALGORITHM = 2; // values described below

// search words: autochoose auto_choose autoalgo auto_algo
var AUTO_CHOOSE_MODE = true; // automatically choose AUTOUPDATE and UPDATE_ALGORITHM based on the circuit

// [search terms: timerspeed autospeed clockspeed timer_speed auto_seconds timer_seconds]
var NORMALAUTOSECONDS = 0.05;
var NORMALTIMERSECONDS = 0.1;
var AUTOSECONDS = NORMALAUTOSECONDS; // good value: 0.05. computers can handle faster but this makes operating circuits visible
var TIMERSECONDS = NORMALTIMERSECONDS; // default speed of "timer" components in seconds (note that the other timers with numbers are all slower than this). Good value: 1.0 or 0.1
var TWIDDLE_PROBABILITY = 0.1; // for update algorithm 3


var USE_BRESENHAM = true; // if true, use bresenham for diagonal lines to ensure they are not blurry (not antialiased as it looks choppier instead of better here)


var origtext = ''; // the currently loaded circuit original text
var origtitle = null;

var BACKSLASH_ALTERNATIVE = ';'; // because backslash in `` type strings does not work
var DQUOT_ALTERNATIVE = '`'; // JS strings can use `, in other languages " is already the string quotes
var ASTERIX_ALTERNATIVE = '.'; // because . is easier to write on paper than *

var graphics_mode = 1; // 0=text, 1=canvas
var graphics_mode_browser = graphics_mode; //is_chrome ? graphics_mode : 0;
var graphics_mode_actual = graphics_mode_browser;



var worldDiv = makeDiv(10, 128, 0, 0);
var renderingMessageDiv = makeDiv(10, 128, 0, 0);

var numticks = 0;


// tile size
var tw = 9;
var th = 9;



// component types (not cell types!)
var TYPE_index = 0;
var TYPE_NULL = TYPE_index++; // uninited
var TYPE_LOOSE_WIRE_EXPLICIT = TYPE_index++; // it has no core, it's just a loose wire, always outputs 0 (in real life, would be "floating" instead)
var TYPE_LOOSE_WIRE_IMPLICIT = TYPE_index++; // like TYPE_LOOSE_WIRE_EXPLICIT, but without any explicit added things like -, |, ^, ..., only implicit part of +, x, V, ...
var TYPE_UNKNOWN_DEVICE = TYPE_index++; // e.g. a # without proper core cell
var TYPE_SWITCH_OFF = TYPE_index++;
var TYPE_SWITCH_ON = TYPE_index++;
var TYPE_LED = TYPE_index++;
var TYPE_LED_RGB = TYPE_index++;
var TYPE_PUSHBUTTON_OFF = TYPE_index++;
var TYPE_PUSHBUTTON_ON = TYPE_index++;
var TYPE_TIMER_OFF = TYPE_index++;
var TYPE_TIMER_ON = TYPE_index++;
var TYPE_AND = TYPE_index++;
var TYPE_OR = TYPE_index++;
var TYPE_XOR = TYPE_index++;
var TYPE_NAND = TYPE_index++;
var TYPE_NOR = TYPE_index++;
var TYPE_XNOR = TYPE_index++;
var TYPE_FLIPFLOP = TYPE_index++; // "c", "C" when combined with other FF parts
var TYPE_COUNTER = TYPE_index++; // standalone "c", "C"
var TYPE_CONSTANT = TYPE_index++; // also "c", "C", but when they have no inputs. Why it exists: if you use C as constant, you do not want mode to become sequential due to this C, and we auto-set mode to sequential if any TYPE_FLIPFLOP is present
var TYPE_DELAY = TYPE_index++;
var TYPE_ROM = TYPE_index++;
var TYPE_MUX = TYPE_index++;
var TYPE_IC = TYPE_index++; // also called "sub"
var TYPE_IC_PASSTHROUGH = TYPE_index++; // the switch gets internally converted into this. Behaves like OR, but will have always only 1 input
var TYPE_VTE = TYPE_index++;
var TYPE_TRISTATE = TYPE_index++;
var TYPE_TRISTATE_INV = TYPE_index++;
var TYPE_RANDOM = TYPE_index++;
var TYPE_TOC = TYPE_index++; // table of contents, a type of comment

// number types (higher value = higher priority) [numbertype]
var NUMBER_index = 0;
var NUMBER_NONE = NUMBER_index++;
var NUMBER_LED = NUMBER_index++;
var NUMBER_TIMER = NUMBER_index++;
var NUMBER_ROM = NUMBER_index++;
var NUMBER_ICCALL = NUMBER_index++;
var NUMBER_ICDEF = NUMBER_index++;
var NUMBER_GLOBAL = NUMBER_index++; // for global wire g
var NUMBER_BUS = NUMBER_index++;
var NUMBER_COMMENT = NUMBER_index++;


/*
How things like ROM, VTE and FLIPFLOP are parsed: each of their cells are seen as individual components rather than one whole, because we support only 1 output per component, but
each of these things can have multiple different outputs. Then at a later stage a class implementation for the FF, ROM or VTE is instantiated, and those loose components are
connected together with a "master".
*/

// this is mainly for the "change type" dropdown.
var typesymbols = {}; // cannot use object colon notation because JS then interprets the variable names as strings, not as their numeric values
typesymbols[TYPE_NULL] = '`'; typesymbols[TYPE_SWITCH_OFF] = 's'; typesymbols[TYPE_SWITCH_ON] = 'S';
typesymbols[TYPE_LED] = 'l'; typesymbols[TYPE_LED_RGB] = 'L';
typesymbols[TYPE_PUSHBUTTON_OFF] = 'p'; typesymbols[TYPE_PUSHBUTTON_ON] = 'P';
typesymbols[TYPE_TIMER_OFF] = 'r'; typesymbols[TYPE_TIMER_ON] = 'R'; typesymbols[TYPE_AND] = 'a';
typesymbols[TYPE_OR] = 'o'; typesymbols[TYPE_XOR] = 'e'; typesymbols[TYPE_NAND] = 'A';
typesymbols[TYPE_NOR] = 'O'; typesymbols[TYPE_XNOR] = 'E'; typesymbols[TYPE_FLIPFLOP] = 'c';
typesymbols[TYPE_CONSTANT] = 'c'; // TODO: have 'on' version of typesymbols when needed, so it can have 'C' for on-valued constant
typesymbols[TYPE_RANDOM] = '?'; typesymbols[TYPE_DELAY] = 'd';
typesymbols[TYPE_TRISTATE] = 'z'; typesymbols[TYPE_TRISTATE_INV] = 'Z';


// all devices except flipflop, those are treated differently because multiple different cells of its type can form one component
var devicemap = {'a':true, 'A':true, 'o':true, 'O':true, 'e':true, 'E':true, 's':true,
                 'S':true, 'l':true, 'L':true, 'r':true, 'R':true, 'p':true, 'P':true,
                 'j':true, 'k':true, 'd':true, 't':true, 'q':true, 'Q':true, 'c':true, 'C':true, 'y':true,
                 'b':true, 'B':true, 'M':true, 'i':true, 'T':true, 'z':true, 'Z':true, '?':true};
// devicemap as well as # (with which inputs interact), but not $ (with which inputs do not interact)
var devicemapin = clone(devicemap); devicemapin['#'] = true;
// everything that forms the surface of devices, so that includes $
var devicemaparea = clone(devicemapin); devicemaparea['$'] = true;
var ffmap = {'j':true, 'k':true, 'd':true, 't':true, 'q':true, 'Q':true, 'c':true, 'C':true, 'y':true};
var rommap = {'b':true, 'B':true};
var inputmap = {'^':true, '>':true, 'v':true, '<':true, 'm':true, ']':true, 'w':true, '[':true, 'U':true, 'G':true, 'V':true, 'W':true};
var dinputmap = {'^':true, '>':true, 'v':true, '<':true, 'm':true, ']':true, 'w':true, '[':true}; // directional inputs only
var wiremap = {'-':true, '|':true, '+':true, '*':true, ASTERIX_ALTERNATIVE:true, '/':true, '\\':true, 'x':true, 'g':true, '=':true, '(':true, ')':true, 'n':true, 'u':true, ',':true, '%':true, '&':true, 'X':true}; // TODO: remove antennas from wiremap?
var antennamap = {'(':true, ')':true, 'n':true, 'u':true};
// only those actively interact diagonally (plus diaginputs but those are not identified by character...)
var diagonalmap = {'x':true, 'V':true, 'W':true, '/':true, '\\':true, 'X':true};
//non-isolators (does not include isolators like ' ' and '0-9' despite being "known"). I is also not part of this, but i is.
var knownmap = {'-':true, '|':true, '+':true, '*':true, ASTERIX_ALTERNATIVE:true, '/':true, '\\':true, 'x':true, 'g':true,
                'a':true, 'A':true, 'o':true, 'O':true, 'e':true, 'E':true, 's':true, 'S':true, 'l':true, 'L':true, 'r':true, 'R':true, 'p':true, 'P':true,
                'c':true, 'C':true, 'y':true, 'j':true, 'k':true, 't':true, 'd':true, 'q':true, 'Q':true, 'b':true, 'B':true, 'M':true,
                '^':true, '>':true, 'v':true, '<':true, 'm':true, ']':true, 'w':true, '[':true, 'U':true, 'G':true, 'V':true, 'W':true,
                '#':true, '=':true, 'i':true, 'T':true, '(':true, ')':true, 'n':true, 'u':true, ',':true, '%':true, '&':true, 'X':true,
                '$':true, 'z':true, 'Z':true, '?':true, 'toc':true};
var digitmap = {'0':true, '1':true, '2':true, '3':true, '4':true, '5':true, '6':true, '7':true, '8':true, '9':true};

var defsubs = {}; // key is number of the sub (but those are not consecutive like in an array, e.g. one could make a I555 and the index would be 555)
var callsubs = [];
var defsubs_order = [];

// for TYPE_IC (i and I)
// This one is for the single capital I, see CallSub for the other one
function DefSub() {
  this.components = []; // this points to the original real world ones. Copies are made in CallSub.
  this.translateindex = {}; // from original world index to our new smaller component index
  this.translateindex2 = {}; // from our component index to original world components array index (inverse of translateindex)
  this.inputs = []; // ordered clockwise NESW. Array of arrays, the sub arrays contain: [translated index, dir, x, y]
  this.outputs = [];
  this.index = -2;
  this.error = false;
  this.errormessage = null;
  this.externalinputs = [];
  //this.inputcounts = [0, 0, 0, 0, 0, 0, 0, 0]; // num inputs for N, E, S, W, NE, SE, SW, NW
  //this.outputcounts = [0, 0, 0, 0, 0, 0, 0, 0]; // num outputs for N, E, S, W, NE, SE, SW, NW

  this.markError = function(message) {
    for(var i = 0; i < this.components.length; i++) {
      this.components[i].error = true;
      if(message && !this.components[i].errormessage) this.components[i].errormessage = message;
    }
    this.error = true;
    if(message) {
      console.log(message);
      if(!this.errormessage) this.errormessage = message;
    }
  };

  this.collectComponents = function(id, components) {
    this.components = [];
    this.translateindex = {};
    this.translateindex2 = {};
    var inputs = [];
    var outputs = [];

    for(var i = 0; i < components.length; i++) {
      var v = components[i];
      if(v.defsubindex != id) continue;
      var newindex = this.components.length;
      this.components.push(v);
      this.translateindex[v.index] = newindex;
      this.translateindex2[newindex] = v.index;

      if(v.type == TYPE_LED) {
        var x = v.corecell.x;
        var y = v.corecell.y;
        var dir = -1;
        if(y + 1 < h && world[y + 1][x].circuitsymbol == '^') dir = 0;
        else if(x > 0 && world[y][x - 1].circuitsymbol == '>') dir = 1;
        else if(y > 0 && world[y - 1][x].circuitsymbol == 'v') dir = 2;
        else if(x + 1 < w && world[y][x + 1].circuitsymbol == '<') dir = 3;
        else if(x + 1 < w && y > 0 && world[y - 1][x + 1].circuitsymbol == 'V') dir = 4;
        else if(x + 1 < w && y + 1 < h && world[y + 1][x + 1].circuitsymbol == 'V') dir = 5;
        else if(x > 0 && y + 1 < h && world[y + 1][x - 1].circuitsymbol == 'V') dir = 6;
        else if(x > 0 && y > 0 && world[y - 1][x - 1].circuitsymbol == 'V') dir = 7;
        else if(x + 1 < w && y > 0 && world[y - 1][x + 1].circuitextra == 2 && (world[y - 1][x + 1].circuitsymbol == 'v' || world[y - 1][x + 1].circuitsymbol == '<')) dir = 4;
        else if(x + 1 < w && y + 1 < h && world[y + 1][x + 1].circuitextra == 2 && (world[y + 1][x + 1].circuitsymbol == '<' || world[y + 1][x + 1].circuitsymbol == '^')) dir = 5;
        else if(x > 0 && y + 1 < h && world[y + 1][x - 1].circuitextra == 2 && (world[y + 1][x - 1].circuitsymbol == '^' || world[y + 1][x - 1].circuitsymbol == '>')) dir = 6;
        else if(x > 0 && y > 0 && world[y - 1][x - 1].circuitextra == 2 && (world[y - 1][x - 1].circuitsymbol == '>' || world[y - 1][x - 1].circuitsymbol == 'v')) dir = 7;
        if(dir >= 0) {
          outputs.push([newindex, dir, x, y]);
        }
      }
    }

    for(var i = 0; i < this.externalinputs.length; i++) {
      var x0 = this.externalinputs[i][0];
      var y0 = this.externalinputs[i][1];
      /*
      Normally we could just look at 8 neighbors to see where the 's' touches
      the chip. However, if it's a large switch extended with ### or $$$, we
      need to look in the entire area where it touches the chip, and not count
      the connections inside this area itself. Hence the stack and array.
      */
      var used = {};
      used[y0 * w + x0] = true;
      var stack = [[x0, y0]];
      var array = [];
      while(stack.length > 0) {
        var s = stack.pop();
        array.push(s);
        for(var d = 0; d < 4; d++) {
          var neigh = getNeighbor(s[0], s[1], d);
          if(!neigh) continue;
          var x = neigh.x;
          var y = neigh.y;
          if(used[y * w + x]) continue;
          if(neigh.circuitsymbol == '#' || neigh.circuitsymbol == '$') {
            used[y * w + x] = true;
            stack.push([x, y]);
          }
        }
      }

      var dir = -1;
      for(var j = 0; j < array.length; j++) {
        var x = array[j][0];
        var y = array[j][1];
        for(var d = 0; d < 8; d++) {
          var neigh = getNeighbor(x, y, d);
          if(!neigh) continue;
          if(neigh.circuitsymbol == '#' || neigh.circuitsymbol == '$' || neigh.circuitsymbol == 's') continue;

          if(connected2(x, y, d)) {
            dir = getOppositeDir(d);
            break;
          }
        }
        if(dir >= 0) break; // only one wire per entire switch supported
      }

      var v = world[y0][x0].components[0];
      if(!v) {
        this.markError('component not found for chip template');
        return;
      }
      var tindex = this.translateindex[v.index];
      if(dir >= 0) {
        inputs.push([tindex, dir, x0, y0]);
      }
    }

    var sortfun = function(a, b) {
      // sort by direction N,E,S,W first
      if(a[1] < b[1]) return -1;
      if(a[1] > b[1]) return 1;
      // for same direction, sort left to right, top to bottom, right to left,
      // bottom to top, depending on dir
      if(a[1] == 0) return a[2] - b[2];
      if(a[1] == 1) return b[3] - a[3];
      if(a[1] == 2) return b[2] - a[2];
      if(a[1] == 3) return a[3] - b[3];
      if(a[1] == 4) return (a[2] + a[3]) - (b[2] + b[3]);
      if(a[1] == 5) return (a[2] - a[3]) - (b[2] - b[3]);
      if(a[1] == 6) return (b[2] + b[3]) - (a[2] + a[3]);
      if(a[1] == 7) return (b[2] - b[3]) - (a[2] - a[3]);
    };

    inputs.sort(sortfun);
    outputs.sort(sortfun);

    this.inputs = inputs;
    this.outputs = outputs;
  };

  this.init = function() {
    this.collectComponents(this.index, components);
    if(this.error) this.markError(undefined); // something else marked this as error
  };
}

// for TYPE_IC (i and I)
// This one is for small i, see DefSub for the other one
function CallSub(id) {
  this.components = []; // the internal components
  this.wcomponents = []; // the world components (the i's, up to 4 per i in fact, one per output). But if this is a sub-sub component, then it's not really world components but those of 1 level higher (inside the sub which is then our parent)
  this.cells = []; // the small i world cells where this one is for, as [x, y] coordinates
  this.subindex = -2;
  this.inputs = [];
  this.outputs = [];
  this.outputvalues = [];
  this.inited = false;
  this.defsub = null;
  this.error = false;
  this.errormessage = null;
  this.subsubs = [];
  //this.inputcounts = [0, 0, 0, 0, 0, 0, 0, 0]; // num inputs for N, E, S, W, NE, SE, SW, NW
  //this.outputcounts = [0, 0, 0, 0, 0, 0, 0, 0]; // num outputs for N, E, S, W, NE, SE, SW, NW

  this.markError = function(message) {
    for(var i = 0; i < this.wcomponents.length; i++) {
      this.wcomponents[i].error = true;
      if(message && !this.wcomponents[i].errormessage) this.wcomponents[i].errormessage = message;
    }
    this.error = true;
    if(message) {
      console.log(message);
      if(!this.errormessage) this.errormessage = message;
    }
  };

  this.copyComponents = function(parent) {
    this.components = [];
    var defsub = defsubs[this.subindex];

    // first already create all the components, so we can update pointers (inputs, ...) to them in the next pass
    for(var i = 0; i < defsub.components.length; i++) {
      var component = new Component();
      this.components.push(component);
      component.index = components.length;
      components.push(component);
    }

    for(var i = 0; i < defsub.components.length; i++) {
      var v = defsub.components[i];

      var component = this.components[i];
      component.issub = true;
      component.value = v.value;
      component.prevvalue = v.prevvalue;
      component.type = v.type;
      component.inputs = []; // handled further
      component.inputs_negated = v.inputs_negated;
      component.inputs_x = v.inputs_x;
      component.inputs_y = v.inputs_y;
      component.inputs_x2 = v.inputs_x2;
      component.inputs_y2 = v.inputs_y2;
      component.input_ff_types = v.input_ff_types;
      component.cells = v.cells;
      component.corecell = v.corecell;
      component.updated = v.updated;
      component.error = v.error;
      component.errormessage = v.errormessage;
      component.previnputs = clone(v.previnputs);
      component.ff_cycle = v.ff_cycle;
      component.ff_cycle_time = v.ff_cycle_time;
      component.master = null; // handled further
      component.rom = null; // handled further
      component.mux = null; // handled further
      component.ff = null; // handled further
      component.rom_out_pos = v.rom_out_pos;
      component.number = v.number;
      component.defsubindex = v.defsubindex;
      component.callsubindex = v.callsubindex;
      component.rgbcolor = v.rgbcolor;
      component.clocked = v.clocked;

      for(var j = 0; j < v.inputs.length; j++) {
        var input = this.components[defsub.translateindex[v.inputs[j].index]];
        if(!input) input = v.inputs[j]; // NOT a special sub input, but e.g. a global wire
        component.inputs[j] = input;
      }
      if(v.master) {
        component.master = this.components[defsub.translateindex[v.master.index]];
      }
      if(v.rom) {
        var rom = new ROM();
        component.rom = rom;
        rom.onehot = v.rom.onehot;
        rom.array = v.rom.ram ? clone(v.rom.array) : v.rom.array;
        rom.output = clone(v.rom.output);
        rom.x0 = v.rom.x0;
        rom.y0 = v.rom.y0;
        rom.x1 = v.rom.x1;
        rom.y1 = v.rom.y1;
        rom.master = component;
        rom.master_orig_x = v.rom.master_orig_x;
        rom.master_orig_y = v.rom.master_orig_y;
        rom.error = v.rom.error;
        rom.errormessage = v.rom.errormessage;
        rom.addressdir = v.rom.addressdir;
        rom.addresslsbpos = v.rom.addresslsbpos;
        rom.worddir = v.rom.worddir;
        rom.wordlsbpos = v.rom.wordlsbpos;
        rom.selected = clone(v.rom.selected);
        rom.num_address_inputs = v.rom.num_address_inputs;
        rom.ram = v.rom.ram;
        rom.decoder = v.rom.decoder;
        rom.encoder = v.rom.encoder;
      }
      if(v.mux) {
        var mux = new Mux();
        component.mux = mux;
        mux.master = component;
        mux.error = v.mux.error;
        mux.errormessage = v.mux.errormessage;
        mux.dataindir = v.mux.dataindir;
        mux.datainlsbpos = v.mux.datainlsbpos;
        mux.selindir = v.mux.selindir;
        mux.selinlsbpos = v.mux.selinlsbpos;
        mux.output = clone(v.mux.output);
        mux.numdatain = v.mux.numdatain;
        mux.numselin = v.mux.numselin;
        mux.numdataout = v.mux.numdataout;
        mux.numselout = v.mux.numselout;
        mux.demux = v.mux.demux;
        mux.swap = v.mux.swap;
        mux.bussize = v.mux.bussize;
        mux.x0 = v.mux.x0;
        mux.y0 = v.mux.y0;
        mux.x1 = v.mux.x1;
        mux.y1 = v.mux.y1;
      }
      if(v.ff) {
        var ff = new FF();
        ff.value = v.ff.value;
        ff.numcC = v.ff.numcC;
        component.ff = ff;
      }
      if(v.tristate) {
        var tristate = new TriState();
        tristate.component = component;
        tristate.invin = v.tristate.invin;
        tristate.invout = v.tristate.invout;
        component.tristate = tristate;
      }

      if(v.type == TYPE_SWITCH_OFF || v.type == TYPE_SWITCH_ON) {
        component.type = TYPE_IC_PASSTHROUGH;
        component.inputs = [];
        component.inputs_x = [];
        component.inputs_y = [];
        component.inputs_x2 = [];
        component.inputs_y2 = [];
        component.inputs_negated = [];
      }
    }

    if(this.components.length) this.components[0].callsub = this;

    for(var i = 0; i < this.components.length; i++) {
      var component = this.components[i];
      var v = defsub.components[i];
      if(v.callsub) {
        var callsub = new CallSub();
        this.subsubs.push(callsub);
        component.callsub = callsub;
        callsub.subindex = v.callsub.subindex;
        callsub.cells = v.callsub.cells;
        if(!callsub.init(this)) {
          return false;
        }
      }
    }

    return true; // ok
  };

  // must be called after components were parsed and inputs resolved
  this.init = function(parent) {
    if(this.inited) return;
    this.inited  = true;

    // these inputs and outputs are the world components. For the internal components, defsub.inputs/outputs can be used. They should have the exact same order and amount
    // inputs are component that sends the input to us; x,y is where the device input is
    // outputs are the components of ourselves, that will transfer the signal to what reads from that
    var inputs = []; // ordered clockwise NESW. Array of arrays, the sub arrays contain: [component, dir, x, y, negated]
    var outputs = [];

    for(var i = 0; i < this.cells.length; i++) {
      var cell = world[this.cells[i][1]][this.cells[i][0]];
      if(cell.circuitsymbol == '$') continue; // because $ does not interact with inputs
      for(var j = 0; j < cell.components.length; j++) {
        var component = cell.components[j];
        if(parent && component) {
          component = parent.components[parent.defsub.translateindex[component.index]];
        }
        if(component) {
          if(!this.master) {
            this.master = component;
            component.callsub = this;
          }
          this.wcomponents.push(component);
          var x = cell.x;
          var y = cell.y;
          var z = j;
          for(var k = 0; k < component.inputs.length; k++) {
            var x2 = component.inputs_x[k];
            var y2 = component.inputs_y[k];
            var dir = -1;
            for(var d = 0; d < 8; d++) {
              var neigh = getNeighbor(x, y, d);
              if(neigh != null && neigh.x == x2 && neigh.y == y2) {
                dir = d;
                break;
              }
            }
            if(dir == -1) {
              console.log('bug with IC input near ' + x + ', ' + y);
              this.markError('bug with IC inputs near ' + x + ', ' + y);
              return false;
            }
            inputs.push([component.inputs[k], dir, x2, y2, component.inputs_negated[k]]);
          }
          if(connected2(x, y, j)) {
            if(getNeighbor(x, y, j).circuitsymbol != '$') { // because $ does not interact with outputs
              outputs.push([component, j, x, y]);
            }
          }
        }
      }
    }

    var defsub = defsubs[this.subindex];
    if(!defsub) { this.markError('IC template (which should be defined with a capital I) with this id does not exist, id: ' + this.subindex); return false; }
    if(defsub.error) { this.markError(defsub.errormessage); return false; }
    this.defsub = defsub;
    if(!this.copyComponents(parent)) { this.markError('copyComponents failed'); return false; }

    var dirdiff = 0;
    if(this.chipdir >= 0) {
      dirdiff = (this.defsub.chipdir - this.chipdir) & 3;
    }

    var sortfun = function(a, b) {
      if(a[1] != b[1]) {
        // virtual dirs (based on chip rotation vs template)
        var avdir = (a[1] & 4) | ((a[1] + dirdiff) & 3);
        var bvdir = (b[1] & 4) | ((b[1] + dirdiff) & 3);
        if(avdir < bvdir) return -1;
        if(avdir > bvdir) return 1;
      }
      if(a[1] == 0) return a[2] - b[2];
      if(a[1] == 1) return b[3] - a[3];
      if(a[1] == 2) return b[2] - a[2];
      if(a[1] == 3) return a[3] - b[3];
      if(a[1] == 4) return (a[2] + a[3]) - (b[2] + b[3]);
      if(a[1] == 5) return (a[2] - a[3]) - (b[2] - b[3]);
      if(a[1] == 6) return (b[2] + b[3]) - (a[2] + a[3]);
      if(a[1] == 7) return (b[2] - b[3]) - (a[2] - a[3]);
    };

    inputs.sort(sortfun);
    outputs.sort(sortfun);

    this.inputs = inputs;
    this.outputs = outputs;

    // TODO: also give errors if directions don't match
    if(inputs.length != defsub.inputs.length) {
      this.markError('unequal inputs amount in ' + this.subindex + ': IC instance: ' + inputs.length + ', IC template: ' + defsub.inputs.length);
      return false;
    }
    if(outputs.length != defsub.outputs.length) {
      this.markError('unequal outputs amount in ' + this.subindex + ': IC instance: ' + outputs.length + ', IC template: ' + defsub.outputs.length);
      return false;
    }

    return true; // ok
  };

  this.init2 = function(parent) {
    if(this.error) return;
    for(var i = 0; i < this.subsubs.length; i++) this.subsubs[i].init2();
    var defsub = this.defsub;
    var inputs = this.inputs;
    var outputs = this.outputs;

    // connect external inputs to our internal components. So our inputs from a sub-level, will read from a higher level, while the higher level thinks it's outputting to the 'i' instead of our own components
    for(var i = 0; i < inputs.length; i++) {
      var einput = inputs[i][0];
      var iinput = this.components[defsub.inputs[i][0]];
      iinput.inputs.push(einput);
      iinput.inputs_negated.push(inputs[i][4]);
      iinput.inputs_x.push(-1);
      iinput.inputs_y.push(-1);
      iinput.inputs_x2.push(-1);
      iinput.inputs_y2.push(-1);
    }

    // connect our internal outputs, to the external output components (which are 'i'), and change their type to "TYPE_IC_PASSTHROUGH"
    for(var i = 0; i < outputs.length; i++) {
      var eoutput = outputs[i][0];
      var ioutput = this.components[defsub.outputs[i][0]];

      eoutput.inputs = [ioutput]; // handled further
      eoutput.inputs_negated = [false];
      eoutput.inputs_x = [-1];
      eoutput.inputs_y = [-1];
      eoutput.inputs_x2 = [-1];
      eoutput.inputs_y2 = [-1];
      eoutput.input_ff_types = [0];

      eoutput.type = TYPE_IC_PASSTHROUGH;
    }
  };
}

function newOrder(array, order) {
  var result = [];
  for(var i = 0; i < array.length; i++) result[i] = array[order[i]];
  for(var i = 0; i < array.length; i++) array[i] = result[i];
}


// More powerful version of getIO: can return input and output series on all sides. 0-4 input sides and 0-4 output sides supported. But max 1 input series and 1 output series per side.
// returns 2D array of form:
// BEFORE:
// [[ni0, ni1, ni1-ni0], [ei0, ei1, ei1-ei0], [si0, si1, si1-si0], [wi0, wi1, wi1-wi0],[no0, no1, no1-no0], [eo0, eo1, eo1-eo0], [so0, so1, so1-so0], [wo0, wo1, wo1-wo0]];
// with first letter the direction (NESW), next i or o for input/output, and next symbol: 0 for start, 1 for end, 1-0 = num inputs or outputs
// AFTER:
// [[[niv], nic], [[eiv], eic], [[siv], sic], [[wiv], wic],[[nov], noc], [[eov], eoc], [[sov], soc], [[wov], woc]];
// with first letter the direction (NESW), next i or o for input/output, and next symbol: v for array, c for count
// end is non-inclusive
// returns null on error, such as having gaps
function getIO2(x0, y0, x1, y1, master) {
  var niv = [];
  var eiv = [];
  var siv = [];
  var wiv = [];

  var nov = [];
  var eov = [];
  var sov = [];
  var wov = [];

  for(var i = 0; i < master.inputs.length; i++) {
    var x = master.inputs_x[i];
    var y = master.inputs_y[i];
    if(x == x0 - 1) {
      wiv.push(y);
    } else if(x == x1) {
      eiv.push(y);
    } else if(y == y0 - 1) {
      niv.push(x);
    } else if(y == y1) {
      siv.push(x);
    } else return null;
  }

  for(var x = x0; x < x1; x++) {
    if(connected2(x, y0, 0)) {
      nov.push(x);
    }
    if(connected2(x, y1 - 1, 2)) {
      sov.push(x);
    }
  }
  for(var y = y0; y < y1; y++) {
    if(connected2(x0, y, 3)) {
      wov.push(y);
    }
    if(connected2(x1 - 1, y, 1)) {
      eov.push(y);
    }
  }

  return [[niv, niv.length],
          [eiv, eiv.length],
          [siv, siv.length],
          [wiv, wiv.length],
          [nov, nov.length],
          [eov, eov.length],
          [sov, sov.length],
          [wov, wov.length]];
}


// like getIO, but allows gaps in between
// returns 2D array of form: [[[nv], nc, nt], [[ev], ec, et], [[sv], sc, st], [[wv], wc, wt], ic, oc];
// with first letter the direction (NESW), and next symbol: v is array with the locations, c num inputs or outputs and t meaning type: 0:none,1:input,2:output.
// ic and oc are input count and output count
// returns null on error, such as mixing inputs and outputs on a side
function getIO3(x0, y0, x1, y1, master) {
  var nv = [];
  var nt = 0;
  var ev = [];
  var et = 0;
  var sv = [];
  var st = 0;
  var wv = [];
  var wt = 0;

  if(master.inputs.length == 0) return null;
  for(var i = 0; i < master.inputs.length; i++) {
    var x = master.inputs_x[i];
    var y = master.inputs_y[i];
    if(x == x0 - 1) {
      wv.push(y);
      wt = 1;
    } else if(x == x1) {
      ev.push(y);
      et = 1;
    } else if(y == y0 - 1) {
      nv.push(x);
      nt = 1;
    } else if(y == y1) {
      sv.push(x);
      st = 1;
    } else return null;
  }

  for(var x = x0; x < x1; x++) {
    if(connected2(x, y0, 0)) {
      if(nt == 1) return null; // is already input
      nv.push(x);
      nt = 2;
    }
    if(connected2(x, y1 - 1, 2)) {
      if(st == 1) return null; // is already input
      sv.push(x);
      st = 2;
    }
  }
  for(var y = y0; y < y1; y++) {
    if(connected2(x0, y, 3)) {
      if(wt == 1) return null; // is already input
      wv.push(y);
      wt = 2;
    }
    if(connected2(x1 - 1, y, 1)) {
      if(et == 1) return null; // is already input
      ev.push(y);
      et = 2;
    }
  }


  var result = [[nv, nv.length, nt], [ev, ev.length, et], [sv, sv.length, st], [wv, wv.length, wt]];

  var ic = 0;
  var oc = 0;
  for(var i = 0; i < 4; i++) {
    if(result[i][2] == 1) ic++;
    if(result[i][2] == 2) oc++;
  }
  result[4] = ic;
  result[5] = oc;

  return result;
}

// actually also RAM! but it started out with only rom functionality.
function ROM() {
  this.onehot = false;
  // 2D array of all bit values, the actual data
  // - height (first index) = #addresses (which word is selected) --> index 0 is always the one closest to the output side
  // - width (second index) = #outputs (which output bit)
  this.array = [];
  this.output = []; // current ouput values (can be one row of the array, or an OR thereof)
  this.x0 = 0;
  this.y0 = 0;
  this.x1 = 0;
  this.y1 = 0;
  this.master = null;
  this.master_orig_x = 0;
  this.master_orig_y = 0;
  this.error = false;
  this.errormessage = null;
  this.addressdir = -1;
  // NOTE: by default, LSB pos is always on the right side when looking in the direction of the input/output arrows
  // exception to that: the address lines have their LSB on the output side (their direction is always perpendicular to output)
  this.addresslsbpos = 0; // 0: left or top, 1: right or bottom. Where the LSB of address input bits is.
  this.worddir = -1; // dir is 0:columns (so outputdir is E or W), 1:rows (so outputdir is N or S)
  this.wordlsbpos = 0; // where the LSB of the wordlines is
  this.selected = []; // selected row/column, for graphical effect. Only as large as the visual part
  this.num_address_inputs = -1;
  this.ram = false; // if true, is ram instead of rom
  this.decoder = false; // if true, is decoder instead of rom
  this.encoder = false; // if true, is encoder instead of rom
  this.priority = false; // if true, is priority selector instead of rom (with unary input, unary output)
  this.lines = []; // array of x or y values of the coordinates with a line of bits
  this.bits = []; // array of x or y values of the coordinates where each line has bits
  this.lines_inv = []; // from x-x0 or y-y0 to line index
  this.bits_inv = []; // from x-x0 or y-y0 to bits index

  this.updateRamDisplay = function(bit, line) {
    var x, y;
    if(this.worddir == 1) {
      x = this.bits[bit];
      y = this.wordlsbpos ? this.lines[this.lines.length - 1 - line] : this.lines[line];
    } else {
      y = this.bits[bit];
      x = this.wordlsbpos ? this.lines[this.lines.length - 1 - line] : this.lines[line];
    }
    if(x < this.x1 && y < this.y1 && x >= this.x0 && y >= this.y0) {
      var c = world[y][x];
      c.displaysymbol = (this.array[line][bit]) ? 'B' : 'b';
      c.renderer.init2(c, c.displaysymbol, c.displaysymbol);
      /*c.div0.innerText = c.displaysymbol;
      c.div1.innerText = c.displaysymbol;*/
    }
  };

  // Converts the address part of the inputs from binary to unary address
  this.binaryToUnary = function(inputs) {
    var index = 0;
    var mul = 1;
    for(var i = 0; i < this.num_address_inputs; i++) {
      index += inputs[i] * mul;
      mul *= 2;
    }
    return index;
  };

  // Assumes the component has already updated all inputs according to the UPDATE_ALGORITHM and gotten the input values from it
  // Inputs are MSB to LSB (TODO: verify if this is still true)
  // for RAM the inputs are in the order: address select, read/write bit, data input
  this.update = function(inputs) {
    if(this.error) return;
    var write = this.ram && inputs[this.num_address_inputs];

    for(var j = 0; j < this.output.length; j++) this.output[j] = false;
    for(var i = 0; i < this.selected.length; i++) this.selected[i] = false;

    if(this.priority) {
      if(inputs.length == this.num_address_inputs + 1 && inputs[inputs.length - 1] == false) {
        return; // 'enable' input not on
      }

      var index = -1;
      for(var i = 0; i < this.num_address_inputs; i++) {
        if(inputs[i]) index = i;
      }
      for(var j = 0; j < this.output.length; j++) {
        this.output[j] = (j == index);
      }
    } else if(this.encoder) {
      if(inputs.length == this.num_address_inputs + 1 && inputs[inputs.length - 1] == false) {
        return; // 'enable' input not on
      }

      for(var i = 0; i < this.num_address_inputs; i++) {
        if(inputs[i]) {
          for(var j = 0; j < this.output.length; j++) {
            if((i >> j) & 1) this.output[j] = true;
          }
        }
      }
    } else if(this.decoder) {
      if(inputs.length == this.num_address_inputs + 1 && inputs[inputs.length - 1] == false) {
        return; // 'enable' input not on
      }

      var index = this.binaryToUnary(inputs);
      this.output[index] = true;
    } else if(this.onehot) {
      // one hot can have multiple lines selected, the output is then their OR, and if this is RAM and we are writing, it will write the same value to all selected lines
      for(var i = 0; i < this.num_address_inputs; i++) {
        if(inputs[i]) {
          if(write) {
            for(var j = 0; j < this.array[i].length; j++) {
              this.array[i][j] = inputs[this.num_address_inputs + 1 + j];
              this.updateRamDisplay(j, i);
            }
          }
          for(var j = 0; j < this.array[i].length; j++) {
            this.output[j] |= this.array[i][j];
          }
          this.selected[i] = true;
        }
      }
    } else {
      var index = this.binaryToUnary(inputs);
      if(index < this.array.length) {
        if(write) {
          for(var j = 0; j < this.array[index].length; j++) {
            this.array[index][j] = inputs[this.num_address_inputs + 1 + j];
            this.updateRamDisplay(j, index);
          }
        }
        for(var j = 0; j < this.array[index].length; j++) {
          this.output[j] = this.array[index][j];
        }
        if(index < this.selected.length) this.selected[index] = true;
      }
    }
  };

  // init before inputs are resolved
  // returns true if ok, false if error
  this.init1 = function(x0, y0, x1, y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.master = null; // the master component for this ROM
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        if(!(rommap[c.circuitsymbol] || c.circuitsymbol == '#' || c.circuitsymbol == '$')) return false;
        if(c.components[0]) {
          this.master = c.components[0];
          this.master_orig_x = x;
          this.master_orig_y = y;
          break;
        }
      }
      if(this.master) break;
    }
    if(!this.master) return false;
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        if(!c.components[0]) {
          c.components[0] = this.master;
        } else {
          c.components[0].master = this.master;
        }
      }
    }
    this.master.rom = this;
    this.master.type = TYPE_ROM; // reason: it might be TYPE_UNKNOWN_DEVICE if it was parsed with $ or #
    return true;
  };


  /*
  given the array returned by getIO3,
  returns object of {
    type: 0=rom, 1=ram, 2=decoder, 3=encoder, 4=priority
    onehot: 0=binary address selection, 1=one-hot (unary) (only used for rom or ram)
    word [dir, lsbpos]: dir is 0:columns (so outputdir is E or W), 1:rows (so outputdir is N or S). The lsbpos here is where line addressed by "0" is. Not always same as where lsbpos of address select inputs are!!
    addressinput [heading, dir, [v], num, lsbpos]: address selection inputs.
    rwinput [heading, dir, [v], num, lsbpos]: read/write input of RAM
    datainput [heading, dir, [v], num, lsbpos]: input for RAM
    out [heading, dir, [v], num, lsbpos]: output side
  }
  with
  heading: wind direction of side with this inputs/outputs (NESW), for input is where it comes from, for output is where it goes to
  dir: heading & 1: 0=horizontal, 1=vertical
  i0: begin coordinate (x or y depends on dir)
  i1: end coordinate
  num: i1 - i0
  lsbpos: is lsbpos for this left or right (not relevant for everything), value is 0:left/top, 1:right/bottom
  }
  returns null on error.
  */
  this.getDirs = function(io) {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var numinputsides = 0;
    var numoutputsides = 0;
    var someinput = -1; // heading of the input if there is only 1 input side. If there are two, then the one opposite of the output side gets precedence
    var someoutput = -1;
    var somesingleinput = -1; // heading of some input with exactly 1 bit, if present
    var somemultiinput = -1; // heading of some input with more than 1 bits, if present
    for(var i = 0; i < 4; i++) {
      if(io[i][2] == 1) {
        numinputsides++;
        someinput = i;
        if(io[i][1] == 1) somesingleinput = i;
        if(io[i][1] > 1) somemultiinput = i;
      }
      if(io[i][2] == 2) {
        numoutputsides++;
        someoutput = i;
      }
    }

    //io is of form: [[[nv], nc, nt], [[ev], ec, et], [[sv], sc, st], [[wv], wc, wt], ic, oc], with t meaning type: 0:none,1:input,2:output

    if(numoutputsides != 1) return null; // every single possible device has 1 output side.
    var outheading = someoutput;
    var outdir = (someoutput & 1);
    var outlsbpos = (outheading == 0 || outheading == 1) ? 1 : 0;

    var worddir = (outdir + 1) & 1; // the dir of the words: 0:columns (so outputdir is E or W), 1:rows (so outputdir is N or S)
    var wordlsbpos = (outheading == 0 || outheading == 3) ? 0 : 1;

    var bits = []; // if e.g. output side is north, this contains x coordinate of every position actually used as bit output
    var lines = []; // // if e.g. output side is north, this contains y coordinate of every position that is actually a line with bits in it
    var bits_inv = [];
    var lines_inv = [];
    var lines_count = [];
    var bits_count = [];
    for(var x = x0; x < x1; x++) {
      bits_count[x] = 0;
      bits_inv[x - x0] = -1;
    }
    for(var y = y0; y < y1; y++) {
      lines_count[y] = 0;
      lines_inv[y - y0] = -1;
      for(var x = x0; x < x1; x++) {
        if(world[y][x].circuitsymbol == 'b' || world[y][x].circuitsymbol == 'B') {
          bits_count[x]++;
          lines_count[y]++;
        }
      }
    }
    for(var x = x0; x < x1; x++) {
      if(bits_count[x]) {
        bits_inv[x - x0] = bits.length;
        bits.push(x);
      }
    }
    for(var y = y0; y < y1; y++) {
      if(lines_count[y]) {
        lines_inv[y - y0] = lines.length;
        lines.push(y);
        if(lines_count[y] != bits.length) return null;
      }
    }
    for(var x = x0; x < x1; x++) {
      if(bits_count[x] && bits_count[x] != lines.length) return null;
    }
    if(outdir == 1) {
      var temp = bits;
      bits = lines;
      lines = temp;
      temp = bits_inv;
      bits_inv = lines_inv;
      lines_inv = temp;
    }
    this.lines = lines;
    this.bits = bits;
    this.lines_inv = lines_inv;
    this.bits_inv = bits_inv;

    var numwords = lines.length; // num visible words (with RAM there could be hidden ones too)
    var wordsize = bits.length;

    // find the address input.
    // If there is 1 input, it's that one.
    // If there are 3 inputs, it's one NOT opposite of the output, and larger than size 1.
    // If there are 2 inputs, it's one with more than 1 bits
    var addressheading = someinput;
    if(numinputsides == 3) {
      for(var i = 0; i < 4; i++) {
        if(io[i][2] == 1 && i != ((outheading + 2) & 3) && io[i][1] != 1) { // if(input size, and not opposite of output, and larger amount than 1)
          addressheading = i;
          break;
        }
      }
    }
    if(numinputsides == 2) {
      addressheading = somemultiinput;
    }
    var addressdir = addressheading & 1;
    var addresslsbpos = (addressheading == 0 || addressheading == 1) ? 0 : 1;

    var type = -1;
    var unary = 0;

    // only used for ram
    var rwheading = -1;
    var rwdir = -1;
    var datainputheading = -1;
    var datainputdir = -1;

    if(numwords == 1) {
      // encoder or decoder. Because RAM or ROM must always have at least 2 words
      if(numinputsides < 1) return null;
      if(numinputsides > 2) return null;
      if(numinputsides == 2) {
        // an enable input is present
        if(somemultiinput == -1 || somesingleinput == -1) return false;
      }
      if(addressdir != outdir) return null; // must be accross for enc/dec
      var numin = io[addressheading][1];
      var numout = io[outheading][1];
      if(numout == wordsize && numin < wordsize) {
        // decoder (binary to unary)
        type = 2;
      } else if(numin == wordsize && numout < wordsize) {
        // encoder (unary to binary)
        type = 3;
      } else if(numin == wordsize && numout == wordsize) {
        // priority (unary to unary)
        type = 4;
      } else {
        return null;
      }
    } else {
      var numaddr = io[addressheading][1];
      var numout = io[outheading][1];

      if(numout != wordsize) return null;

      if(numinputsides == 1) {
        // ROM
        type = 0;
        if(addressdir != outdir && numaddr == numwords) unary = 1;
      } else if(numinputsides == 3) {
        // RAM
        type = 1;
        rwheading = ((addressheading + 2) & 3);
        rwdir = rwheading & 1;
        datainputheading = ((outheading + 2) & 3);
        datainputdir = datainputheading & 1;
        if(io[rwheading][1] != 1) return null;
        if(io[datainputheading][1] != wordsize) return null;
        if(numaddr == numwords) unary = 1;
      } else {
        return null;
      }
    }

    // Finalize default lsb pos
    if(unary) addresslsbpos = wordlsbpos;
    //if(addressdir != outdir) addresslsbpos = wordlsbpos; // OPTION 1: if perpendicular address, make address LSB pos that of the wordlines, which has LSB closest to output
    //if(addressdir != outdir) wordlsbpos = addresslsbpos; // OPTION 2: if perpendicular address, make wordlines LSB pos match that of the address input rather than closest to outpupt
    // OPTION 3: Do nothing. All input wires have LSB on the right (when looking in direction of their arrow), and word lines always closest to screen, so it's sometimes on opposite side, oh well

    // Scan for numbers 0 around that may alter lsb pos
    // It only changes the binary addresslsbpos or for the encoder/decoder/priority ones. Wordlsbpos is not affected, there have lsb always at output side, it's a graphical thing anyway
    if(!unary || type == 2 || type == 3 || type == 4) {
      if (addressdir == 0) {
        for(var y = y0 - 1; y <= y1; y++) {
          if(y < 0 || y >= h) continue;
          if(x0 > 0 && world[y][x0 - 1].metasymbol == '0') addresslsbpos = 0;
          if(x1 + 1 < w && world[y][x1 + 1].metasymbol == '0') addresslsbpos = 1;
        }
      }
      if (addressdir == 1) {
        for(var x = x0 - 1; x <= x1; x++) {
          if(x < 0 || x >= w) continue;
          if(y0 > 0 && world[y0 - 1][x0].metasymbol == '0') addresslsbpos = 0;
          if(y1 + 1 < h && world[y1 + 1][x /* + 1*/].metasymbol == '0') addresslsbpos = 1;
        }
      }
    }

    // The arrays have form [heading, dir, i0, i1, num, lsbpos]
    var result = {'type':type, 'onehot':unary,
                  'word':[worddir, wordlsbpos],
                  'address':[addressheading, addressheading & 1, io[addressheading][0], io[addressheading][1], addresslsbpos],
                  'out':[outheading, outdir, io[outheading][0], io[outheading][1], outlsbpos] };
    if(type == 1) { // RAM
      result['rwinput'] = [rwheading, rwdir, io[rwheading][0], io[rwheading][1], -1];
      result['datainput'] = [datainputheading, datainputdir, io[datainputheading][0], io[datainputheading][1], outlsbpos];
    } else {
      result['rwinput'] = [-1, -1, 0, 0, -1];
      result['datainput'] = [-1, -1, 0, 0, -1];
    }
    result['lines'] = lines;
    result['bits'] = bits;
    return result;
  };

  /*
  Sorts as follows:
  -address inputs from lsb to msb
  -the read/write input (if it's a RAM or indicator of ROM lsb pos)
  -data inputs from lsb to msb (if it's a RAM)
  The given dirs are headings (NESW)
  */
  this.sortInputs = function(addressdir, datadir, addresslsb) {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var worddir = this.worddir;

    var getDir = function(x, y) {
      if(y < y0) return 0;
      if(x >= x1) return 1;
      if(y >= y1) return 2;
      if(x < x0) return 3;
      return -1;
    };

    //sort master input components from lsb to msb, and if present the "dummy" indicator input last
    var array = [];
    for(var i = 0; i < this.master.inputs.length; i++) array[i] = i;
    var self = this;
    array = array.sort(function(a, b) {
      var xa =  self.master.inputs_x[a];
      var ya =  self.master.inputs_y[a];
      var xb =  self.master.inputs_x[b];
      var yb =  self.master.inputs_y[b];
      var da = getDir(xa, ya);
      var db = getDir(xb, yb);
      if(da != db) {
        if(da == addressdir) return -1;
        if(db == addressdir) return 1;
        if(da == datadir) return 1;
        if(db == datadir) return -1;
      }
      var lsbpos = (da == addressdir) ? addresslsb : 0; // 0 for the data inputs, to make it match the outputs (hopefully...)
      if(((da & 1) == 0) && lsbpos) return xb - xa;
      if(((da & 1) == 0)) return xa - xb;
      if(lsbpos) return yb - ya;
      return ya - yb;
    });
    newOrder(this.master.inputs, array);
    newOrder(this.master.inputs_negated, array);
    newOrder(this.master.inputs_x, array);
    newOrder(this.master.inputs_y, array);
    newOrder(this.master.inputs_x2, array);
    newOrder(this.master.inputs_y2, array);

    var components = [[this.master, this.master_orig_x, this.master_orig_y]];
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        if(!rommap[c.circuitsymbol]) continue;
        if(c.components[0] && c.components[0] != this.master) {
          components.push([c.components[0], x, y]);
        }
      }
    }

    if(this.decoder || this.encoder || this.priority) {
      // there may be more bits than outputs in encoder case. Therefor, we need to sort the outputs.
      var o = {}; //x or y to "has output"
      for(var i = 0; i < components.length; i++) {
        o[(this.addressdir == 0) ? components[i][1] : components[i][2]] = true;
      }
      var a = []; // array of coordinates of outputs
      for(var k in o) a.push(k);
      var self = this;
      a.sort(function(a, b) {
        return self.addresslsbpos ? (b - a) : (a - b);
      });
      var map = {}; // output coordinate to sort order
      for(var i = 0; i < a.length; i++) map[a[i]] = i;
      for(var i = 0; i < components.length; i++) {
        var component = components[i][0];
        var x = components[i][1];
        var y = components[i][2];
        component.rom_out_pos = (this.addressdir == 0) ? map[x] : map[y];
      }
    } else {
      for(var i = 0; i < components.length; i++) {
        var component = components[i][0];
        var x = components[i][1];
        var y = components[i][2];
        component.rom_out_pos = this.bits_inv[worddir == 0 ? (y - y0) : (x - x0)];
      }
    }
  };

  // init after inputs are resolved
  // returns true if ok, false if error (e.g. no rectangle or inputs not all on one side)
  this.init2 = function() {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    if(!this.master) return false;

    var io = getIO3(x0, y0, x1, y1, this.master);
    if(!io) return false;
    if(io[5] != 1) return false; // oc != 1. cannot have more than 1 output size nor less

    var dirs = this.getDirs(io);
    if(!dirs) return false;

    this.addressdir = dirs.address[1];
    this.addresslsbpos = dirs.address[4];
    this.worddir = dirs.word[0];
    this.wordlsbpos = dirs.word[1];

    this.onehot = dirs.onehot;
    this.ram = (dirs.type == 1);
    this.decoder = (dirs.type == 2);
    this.encoder = (dirs.type == 3);
    this.priority = (dirs.type == 4);

    if(this.decoder || this.priority) {
      this.array = [];
    } else {
      if(this.worddir == 0) {
        for(var ix = 0; ix < this.lines.length; ix++) {
          var x = this.lines[ix];
          var ax = (this.wordlsbpos == 0) ? ix : (this.lines.length - ix - 1);
          this.array[ax] = [];
          for(var iy = 0; iy < this.bits.length; iy++) {
            var y = this.bits[iy];
            var c = world[y][x].circuitsymbol;
            this.array[ax][iy] = (c == 'B');
          }
        }
      } else {
        for(var iy = 0; iy < this.lines.length; iy++) {
          var y = this.lines[iy];
          var ay = (this.wordlsbpos == 0) ? iy : (this.lines.length - iy - 1);
          this.array[ay] = [];
          for(var ix = 0; ix < this.bits.length; ix++) {
            var x = this.bits[ix];
            var c = world[y][x].circuitsymbol;
            this.array[ay][ix] = (c == 'B');
          }
        }
      }
    }

    this.output.length = dirs.out[3];
    this.selected.length = this.lines.length;

    if(this.ram) {
      var realsize = dirs.address[3];
      if(!this.onehot) {
        if(realsize > 20) realsize = 20; // don't make it too extreme. Max 1M memory. The question is, can javascript even handle that
        realsize = (1 << realsize);
      }
      var oldsize = this.array.length;
      var wordwidth = this.worddir == 0 ? (y1 - y0) : (x1 - x0);
      for(var i = oldsize; i < realsize; i++) {
        this.array[i] = [];
        for(var j = 0; j < wordwidth; j++) this.array[i][j] = false;
      }
    }
    this.num_address_inputs = dirs.address[3];

    this.sortInputs(dirs.address[0], dirs.datainput[0], dirs.address[4]);

    return true;
  };
}



// TODO: support other shapes than rectangular
function Mux() {
  /*
  with #select = 2 ^ #select_bits
  An input side with outputs on opposing side is the data in and data out pair
  Another input side is the select side. If that one has opposite output, that's
  the select passthrough.
  If unclear which pair of sides is data and select, the one with most should be
  data, as select only needs log2 size.

  On the data side:
  -when #inputs > #outputs, it's a mux.
  -when #inputs < #outputs, it's a demux.
  -when #inputs == #outputs, it's a controlled swap.

  When there are more outputs (for mux) or inputs (for demux) than the amount of
  select bits can choose from, then it will be a mux or demux of buses instead.
  Similarly for controlled swap.

  When it's mux and not enough inputs, selecting missing address outputs 0.
  */
  this.master = null;
  this.error = false;
  this.errormessage = null;
  this.dataindir = -1; // out dir is always opposite side
  this.datainlsbpos = 0; // 0: left or top, 1: right or bottom. The data one will be away from the selection inputs side
  this.selindir = -1;
  this.selinlsbpos = -1; // by default: will be on the right side when looking at the direction of the arrows
  this.output = []; // current ouput values (first data output(s), then the select passthrough)
  this.numdatain = 0;
  this.numselin = 0;
  this.numdataout = 0;
  this.numselout = 0; // passthrough of sel, should be same as numselin
  this.demux = false;
  this.swap = false;
  this.bussize = 1;

  // should have rectangular shape
  this.x0 = -1;
  this.y0 = -1;
  this.x1 = -1;
  this.y1 = -1;

  // first inputs are the data, last the select
  this.update = function(inputs) {
    var index = 0;
    var l = 1;
    for(var i = 0; i < this.numselin; i++) {
      var j = this.numdatain + i;
      index += l * inputs[j];
      l += l;
    }

    if(this.bussize == 1) {
      if(this.demux) {
        for(var i = 0; i < this.numdataout; i++) {
          this.output[i] = false;
        }
        this.output[index] = inputs[0]; // the one chosen output
      } else if(this.swap) {
        for(var i = 0; i < this.numdataout; i++) {
          this.output[i] = inputs[i ^ index];
        }
      } else {
        // mux
        if(index < this.numdatain) this.output[0] = inputs[index];
        else this.output[0] = false;
      }
    } else {
      if(this.demux) {
        for(var i = 0; i < this.numdataout; i++) {
          this.output[i] = false;
        }
        // the one chosen output bus
        for(var i = 0; i < this.bussize; i++) {
          this.output[index * this.bussize + i] = inputs[i];
        }
      } else if(this.swap) {
        for(var i = 0; i < this.numdataout; i++) {
          var j = i % this.bussize;
          var k = Math.floor(i / this.bussize);
          this.output[i] = inputs[(k ^ index) * this.bussize + j];
        }
      } else {
        for(var i = 0; i < this.bussize; i++) {
          var j = index * this.bussize + i;
          this.output[i] = j < this.numdatain ? inputs[j] : false;
        }
      }
    }
    // passthrough of the select signal
    for(var i = 0; i < this.numselout; i++) {
      this.output[this.numdataout + i] = inputs[this.numdatain + i];
    }
  };

  this.setError = function(text) {
    this.error = true;
    if(!this.errormessage) this.errormessage = text;
  };

  // init before inputs are resolved
  // returns true if ok, false if error
  this.init1 = function(x0, y0, x1, y1) {
    this.master = null; // the master component for this Mux

    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        if(c.circuitsymbol == 'M') {
          this.master = c.components[0] || c.components[1];
          break;
        }
      }
      if(this.master) break;
    }

    if(!this.master) {
      this.setError('no master component found');
      return false;
    }
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        //if(c.components[0] == this.master) continue;
        /*if(!c.components[0]) {
          c.components[0] = this.master;
        } else {
          c.components[0].master = this.master;
        }*/
        if(c.components[0]) c.components[0].master = this.master;
        if(c.components[1]) c.components[1].master = this.master;
      }
    }
    this.master.mux = this;
    this.master.type = TYPE_MUX; // reason: it might be TYPE_UNKNOWN_DEVICE if it was parsed with $ or #
    return true;
  };


  /*
  given the array returned by getIO3,
  returns object of {
    datain [heading, lsbpos, num]: input and output's heading, and lsbpos: which data line is for select 0 (normally the one closest to input side of select)
    dataout [heading, lsbpos, num]: heading/lsbpos should be same as datain,
    selin [heading, lsbpos, num]
    selout [heading, lsbpos, num]
    demux: true if it's a demultiplexer instead of multiplexer
  }
  with
  heading: wind direction of side with this inputs/outputs (NESW), for input is where it comes from, for output is where it goes to
  lsbpos: is lsbpos for this left or right, value is 0:left/top, 1:right/bottom
  num: the amount
  }
  returns null on error.
  */
  this.getDirs = function(io) {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var numinputsides = 0;
    var numoutputsides = 0;

    var datain = [-1, -1, -1];
    var dataout = [-1, -1, -1];
    var selin = [-1, -1, -1];
    var selout = [-1, -1, -1];

    var demux = false;
    var demuxdataside = -1;

    //io is of form: [[[nv], nc, nt], [[ev], ec, et], [[sv], sc, st], [[wv], wc, wt], ic, oc], with t meaning type: 0:none,1:input,2:output

    // it's a demux if there is a side with less inputs than outputs
    for(var i = 0; i < 4; i++) {
      var j = getOppositeDir(i);
      if(io[i][2] == 1 && // is input
         io[j][2] == 2 && // other is output
         io[i][1] < io[j][1]) { // less inputs than the other has outputs
        demux = true;
        demuxdataside = i;
        break;
      }
    }

    if(demux) {
      for(var i = 0; i < 4; i++) {
        if(io[i][2] == 1) {
          numinputsides++;
          if(numinputsides > 2) {
            this.setError('too many input sides');
            return null;
          }
          if(i == demuxdataside) {
            datain[0] = i;
            datain[2] = io[i][1];
          } else {
            selin[0] = i;
            selin[2] = io[i][1];
          }
        }
        if(io[i][2] == 2) {
          numoutputsides++;
          if(numoutputsides > 2) {
            this.setError('too many output sides');
            return null;
          }
          if(i == getOppositeDir(demuxdataside)) {
            dataout[0] = i;
            dataout[2] = io[i][1];
          } else {
            selout[0] = i;
            selout[2] = io[i][1];
          }
        }
      }

      if(dataout[2] < 2) { this.setError('must have multiple outputs'); return null; }
      if(dataout[2] < (1 << selin[2])) { this.setError('too few data outputs'); return null; }
    } else {
      for(var i = 0; i < 4; i++) {
        if(io[i][2] == 1) {
          numinputsides++;
          if(numinputsides > 2) {
            this.setError('too many input sides');
            return null;
          }
          if(numinputsides == 1) {
            datain[0] = i;
            datain[2] = io[i][1];
          }
          if(numinputsides == 2) {
            selin[0] = i;
            selin[2] = io[i][1];
            if(selin[2] > datain[2]) {
              var temp = selin;
              selin = datain;
              datain = temp;
            }
          }
        }
        if(io[i][2] == 2) {
          numoutputsides++;
          if(numoutputsides > 2) {
            this.setError('too many output sides');
            return null;
          }
          if(numoutputsides == 1) {
            dataout[0] = i;
            dataout[2] = io[i][1];
          }
          if(numoutputsides == 2) {
            selout[0] = i;
            selout[2] = io[i][1];
          }
        }
      }

      if(datain[2] < 2) { this.setError('must have multiple data inputs'); return null; }
      if(datain[2] < (1 << selin[2])) { this.setError('too few data inputs'); return null; }
    }

    if(numoutputsides == 2) {
      if(selout[0] == getOppositeDir(datain[0])) {
        var temp = selout;
        selout = dataout;
        dataout = temp;
      }
    }

    if(datain[0] == -1) { this.setError('no data in'); return null; }
    if(dataout[0] == -1) { this.setError('no data out'); return null; }
    if(selin[0] == -1) { this.setError('no sel in'); return null; }
    if(datain[0] != getOppositeDir(dataout[0])) { this.setError('data dir not opposite'); return null; }
    if(selout[0] != -1) {
      if(selin[0] != getOppositeDir(selout[0])) { this.setError('sel dir not opposite'); return null; }
      if(selout[2] != selin[2]) { this.setError('passthrough sel output not matching amount'); return null; }
    } else {
      selout[2] = 0;
    }


    var datalsb = 0;
    if(selin[0] == 0 || selin[0] == 3) datalsb = 1;
    datain[1] = dataout[1] = datalsb;

    var sellsb = 0;
    if(selin[0] == 2 || selin[0] == 3) sellsb = 1;
    selin[1] = selout[1] = sellsb;

    var swap = false;
    if(datain[2] == dataout[2]) {
      swap = true;
    }

    var result = [datain, dataout, selin, selout, demux, swap];

    return result;
  };

  /*
  Sorts as follows:
  -data inputs from lsb to msb
  -select inputs from lsb to msb
  The given dirs are headings (NESW)
  */
  this.sortIO = function(io) {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    var getDir = function(x, y) {
      if(y < y0) return 0;
      if(x >= x1) return 1;
      if(y >= y1) return 2;
      if(x < x0) return 3;
      return -1;
    };

    var array = [];
    for(var i = 0; i < this.master.inputs.length; i++) array[i] = i;
    var self = this;
    array = array.sort(function(a, b) {
      var xa =  self.master.inputs_x[a];
      var ya =  self.master.inputs_y[a];
      var xb =  self.master.inputs_x[b];
      var yb =  self.master.inputs_y[b];
      var da = getDir(xa, ya);
      var db = getDir(xb, yb);
      if(da != db) {
        if(da == self.dataindir) return -1;
        if(db == self.dataindir) return 1;
        if(da == self.selindir) return 1;
        if(db == self.selindir) return -1;
      }
      var lsbpos = (da == self.dataindir) ? self.datainlsbpos : self.selinlsbpos;
      if(((da & 1) == 0) && lsbpos) return xb - xa;
      if(((da & 1) == 0)) return xa - xb;
      if(lsbpos) return yb - ya;
      return ya - yb;
    });
    newOrder(this.master.inputs, array);
    newOrder(this.master.inputs_negated, array);
    newOrder(this.master.inputs_x, array);
    newOrder(this.master.inputs_y, array);
    newOrder(this.master.inputs_x2, array);
    newOrder(this.master.inputs_y2, array);

    // now assign the outputs

    var getSide = function(dir) {
      if(dir == 0) {
        return [x0, y0, 1, 0, 1, x1 - x0];
      }
      if(dir == 1) {
        return [x1 - 1, y0, 0, 1, 0, y1 - y0];
      }
      if(dir == 2) {
        return [x0, y1 - 1, 1, 0, 1, x1 - x0];
      }
      if(dir == 3) {
        return [x0, y0, 0, 1, 0, y1 - y0];
      }
    };

    var rompos = 0;

    var side = getSide(getOppositeDir(this.dataindir));
    var o = io[getOppositeDir(this.dataindir)];
    for(var i = 0; i < o[0].length; i++) {
      var j = i;
      if(this.datainlsbpos) j = o[0].length - i - 1;
      j = o[0][j] - ((this.dataindir & 1) ? this.y0 : this.x0);
      var x = side[0] + side[2] * j;
      var y = side[1] + side[3] * j;
      var z = side[4];
      var c = world[y][x];
      if(c.circuitsymbol != 'M' && c.circuitsymbol != '#') continue;
      if(c.components[z]) c.components[z].rom_out_pos = rompos++;
    }

    side = getSide(getOppositeDir(this.selindir));
    o = io[getOppositeDir(this.selindir)];
    for(var i = 0; i < o[0].length; i++) {
      var j = i;
      if(this.selinlsbpos) j = o[0].length - i - 1;
      j = o[0][j] - ((this.selindir & 1) ? this.y0 : this.x0);
      var x = side[0] + side[2] * j;
      var y = side[1] + side[3] * j;
      var z = side[4];
      var c = world[y][x];
      if(c.circuitsymbol != 'M' && c.circuitsymbol != '#') continue;
      if(c.components[z]) c.components[z].rom_out_pos = rompos++;
    }
  };

  // init after inputs are resolved
  // returns true if ok, false if error (e.g. no rectangle or inputs not all on one side)
  this.init2 = function() {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    if(!this.master) return false;

    var io = getIO3(x0, y0, x1, y1, this.master);
    if(!io) { this.setError('getting io error'); return false; }

    var dirs = this.getDirs(io);
    if(!dirs) { this.setError('getting dirs error'); return false; }

    this.demux = dirs[4];
    this.swap = dirs[5];

    this.dataindir = dirs[0][0];
    this.datainlsbpos = dirs[0][1];
    this.selindir = dirs[2][0];
    this.selinlsbpos = dirs[2][1];
    this.output = []; // current ouput values (first data output(s), then the select passthrough)
    this.numdatain = dirs[0][2];
    this.numselin = dirs[2][2];
    this.numdataout = dirs[1][2];
    this.numselout = dirs[3][2];

    var numsel = (1 << this.numselin);
    this.bussize = this.demux ? this.numdatain : (this.swap ? Math.ceil(this.numdatain / numsel) : this.numdataout);

    this.output.length = this.numdataout + this.numselout;

    this.sortIO(io);

    return true;
  };
}

// Terminal
function VTE() {
  this.x0 = 0;
  this.y0 = 0;
  this.x1 = 0;
  this.y1 = 0;
  this.text = null; // not as string but as 2D array of characters
  this.numinputs = -1;
  this.numoutputs = -1;
  this.cursorx = 0;
  this.cursory = 0;
  this.prevwrite = false;
  this.prevread = false;
  this.output = [0,0,0,0,0,0,0,0];
  this.decimaldisplay = false;
  this.decimalinput = false;
  this.counter = false;
  this.countervalue = 0;
  this.previnput = 0;
  this.previnput2 = 0;

  this.keybuffer = [];

  this.newline = function() {
    var w = this.x1 - this.x0;
    var h = this.y1 - this.y0;
    if(this.cursory + 1 < h) {
      this.cursory++;
    } else {
      for(var y = 0; y + 1 < h; y++) this.text[y] = this.text[y + 1];
      this.text[h - 1] = [];
      for(var x = 0; x < w; x++) this.text[h - 1][x] = ' ';
    }
    this.cursorx = 0;
  };

  // Assumes the component has already updated all inputs according to the UPDATE_ALGORITHM and gotten the input values from it
  // Inputs are MSB to LSB
  this.update = function(inputs) {
    if(this.counter) {
      var x = this.x1 - this.x0 - 1;
      var y = this.y1 - this.y0 - 1;
      var width = Math.max(this.x1 - this.x0, this.y1 - this.y0);
      if(inputs[0] && !this.previnput) this.countervalue++;
      this.previnput = inputs[0];
      if(inputs.length > 1) {
        if(inputs[1] && !this.previnput2) this.countervalue = 0;
        this.previnput2 = inputs[1];
      }
      var index = this.countervalue;
      var s = '' + index;
      for(var i = 0; i < width; i++) {
        var c = (i < s.length) ? s[s.length - i - 1] : '';
        this.text[y][x] = c;
        x--;
        //if(x >= this.x1 - this.x0) { x = 0; y++; }
        if(x < 0) { x = this.x1 - 1; y--; }
      }
      var mul = 1;
      for(var i = 0; i < this.numoutputs; i++) {
        this.output[i] = ((index & mul) ? 1 : 0);
        mul *= 2;
      }
      return;
    }
    if(this.decimaldisplay) {
      var index = 0;
      var mul = 1;
      for(var i = 0; i < this.numinputs; i++) {
        index += inputs[i] * mul;
        mul *= 2;
      }
      var x = this.x1 - this.x0 - 1;
      var y = this.y1 - this.y0 - 1;
      var s = '' + index;
      for(var i = 0; i < this.numinputs; i++) {
        var c = (i < s.length) ? s[s.length - i - 1] : '';
        this.text[y][x] = c;
        x--;
        //if(x >= this.x1 - this.x0) { x = 0; y++; }
        if(x < 0) { x = this.x1 - this.x0 - 1; y--; }
      }
      return;
    }
    if(this.decimalinput) {
      var s = '';
      var x = 0;
      var y = 0;
      for(var i = 0; i < this.numoutputs; i++) {
        var c = this.text[y][x];
        s += c;
        x++;
        if(x >= this.x1 - this.x0) { x = 0; y++; }
      }

      var index = 0;
      if(s[0] == '0' && s[1] == 'x') index = parseInt(s); // NOTE: this also supports decimal with prefix '0x' and oct with prefix '0'
      else index = parseInt(s, 10); // do NOT support the horrible octal notation
      var maxval = (1 << this.numoutputs) - 1;
      if(index > maxval) {
        for(var i = 0; i < s.length; i++) this.doBackspace();
        index = maxval;
        s = '' + index;
        for(var i = 0; i < s.length; i++) this.addChar(s[i]);
      }
      var mul = 1;
      for(var i = 0; i < this.numoutputs; i++) {
        var bit = ((index & mul) ? 1 : 0);
        if(index < 0 && (1 << i) > -index) bit = 1; // also supports negative numbers with twos complement
        this.output[i] = bit;
        mul *= 2;
      }
      return;
    }


    var index = 0;
    var mul = 1;
    var write = inputs[this.numinputs];
    var read = inputs[this.numinputs + 1];
    var prevwrite = this.prevwrite;
    var prevread = this.prevread;
    this.prevwrite = write;
    this.prevread = read;
    if(write && !prevwrite) {
      for(var i = 0; i < this.numinputs; i++) {
        index += inputs[i] * mul;
        mul *= 2;
      }
      //console.log('vte update: ' + index);
      if(index == 10 || index == 13) {
        this.newline();
        return;
      }
      if(index < 32 || index > 126) index = 63;
      if(this.cursorx >= this.x1 - this.x0) this.newline();
      this.text[this.cursory][this.cursorx] = String.fromCharCode(index);
      this.cursorx++;
    }

    this.output[this.numoutputs] = (this.keybuffer.length == 0); // eof

    if(read && !prevread && this.keybuffer.length > 0) {
      if(this.keybuffer.length > 0) index = this.keybuffer.shift(); // use as queue

      var mul = 1;
      for(var i = 0; i < this.numoutputs; i++) {
        this.output[i] = ((index & mul) ? 1 : 0);
        mul *= 2;
      }
    }
  };

  this.addChar = function(c) {
    if(this.cursorx >= this.x1 - this.x0) this.newline();
    this.text[this.cursory][this.cursorx] = c;
    this.cursorx++;
  };

  // user keyboard typing input
  this.typeKeyboard = function(index) {
    this.keybuffer.push(index & 255);

    if(index == 10 || index == 13) {
      this.newline();
      return;
    }

    if(index < 32 || index > 126) index = 63;
    this.addChar(String.fromCharCode(index));
  };

  this.doBackspace = function() {
    this.cursorx--;
    if(this.cursorx < 0) {
      if(this.cursory > 0) {
        this.cursorx = this.x1 - this.x0 - 0;
        this.cursory--;
      } else {
        this.cursorx = 0;
      }
    }
    this.text[this.cursory][this.cursorx] = '';
  };

  // init before inputs are resolved
  // returns true if ok, false if error
  this.init1 = function(x0, y0, x1, y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.master = null; // the master component for this VTE
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        if(c.symbol != 'T') return false;
        if(c.components[0]) {
          this.master = c.components[0];
          this.master_orig_x = x;
          this.master_orig_y = y;
          break;
        }
      }
    }
    if(!this.master) return false;
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        if(!c.components[0]) {
          c.components[0] = this.master;
        } else {
          c.components[0].master = this.master;
        }
      }
    }
    this.master.vte = this;
    return true;
  };


  /*
  given the array returned by getIO2,
  returns object of {
    input [heading, dir, [iv], num, lsbpos]: input side
    write [heading, dir, [iv], num, lsbpos]: read/write input, also indicates LSB pos
    output [heading, dir, [iv], num, lsbpos]: output side
    read [heading, dir, [iv], num, lsbpos]: read side: the side with eof and keyboard read
  }
  with
  heading: wind direction of side with this inputs/outputs (NESW), or -1 if not present
  dir: heading & 1: 0=horizontal, 1=vertical
  i0: begin coordinate (x or y depends on dir)
  i1: end coordinate
  num: i1 - i0
  lsbpos: is lsbpos for this left or right (not relevant for everything)
  }
  returns null on error.
  */
  this.getDirs = function(io) {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    var outheading = -1;
    var outdir = -1;
    var inheading = -1;
    var indir = -1;
    var writeheading = -1;
    var writedir = -1;
    var writeheading2 = -1;
    var writedir2 = -1;
    var readheading = -1;
    var readdir = -1;
    // NOTE: by default, LSB pos is always on the right side when looking in the direction of the input/output arrows
    var ilsbpos = -1; // 0: left or top, 1: right or bottom.
    var olsbpos = -1;

    for(var i = 0; i < 4; i++) {
      if(io[i][1] == 0 && io[i + 4][1] == 0) {
        // nothing, that is ok
      } else if(io[i + 4][1] > 1) {
        if(outheading != -1) return null; // there may only be 1 valid candidate
        if(io[i][1] > 0) return null; //error: there may not be inputs on the output side
        outheading = i;
        outdir = (i & 1);
        olsbpos = (i == 0 || i == 1) ? 1 : 0;
      } else if(io[i][1] > 1) {
        if(inheading != -1) return null; // there may only be 1 valid candidate
        if(io[i + 4][1] > 0) return null; //error: there may not be outputs on the input side
        inheading = i;
        indir = (i & 1);
        ilsbpos = (i == 3 || i == 2) ? 1 : 0;
      } else if(io[i][1] == 1 && io[i + 4][1] == 0) {
        if(writeheading != -1 && writeheading2 != -1) return null; // there may only be max 2 valid candidates
        if(writeheading != -1) {
          writeheading2 = i;
          writedir2 = (i & 1);
          //ilsbpos = (i == 1 || i == 2) ? 1 : 0;
        } else {
          writeheading = i;
          writedir = (i & 1);
          //ilsbpos = (i == 1 || i == 2) ? 1 : 0;
        }
      } else  if(io[i][1] == 1 && io[i + 4][1] == 1) {
        if(readheading != -1) return null; // there may only be 1 valid candidate
        // TODO: if the read output is on a side, that is, a cell that could also already be a bit output, return error too. Only 1 distinct output can be connected per cell.
        readheading = i;
        readdir = (i & 1);
        //olsbpos = (i == 1 || i == 2) ? 0 : 1; // here, MSB is at the indicator. So that it matches the input order which has indicator on the other side
      } else {
        this.errormessage = 'ERROR: Unknown input/output count combination for VTE';
        console.log(this.errormessage);
        return null; // unknown input/output count combination
      }
    }

    if(readheading == -1 && writeheading == -1 && outheading == -1 && inheading != -1 && writeheading2 == -1) {
      this.decimaldisplay = true;
    } else if(readheading == -1 && writeheading != -1 && outheading == -1 && inheading == -1 && writeheading2 == -1) {
      inheading = writeheading;
      indir = writedir;
      ilsbpos = (inheading == 1 || inheading == 2) ? 1 : 0;
      writeheading = writedir = -1;
      this.decimaldisplay = true;
    } else if(readheading == -1 && writeheading == -1 && outheading != -1 && inheading == -1 && writeheading2 == -1) {
      this.decimalinput = true;
    } else if(readheading == -1 && writeheading != -1 && outheading != -1 && inheading == -1 && ((writedir == outdir) || (writedir2 == outdir))) {
      // the counter input must always be opposite side of the output. The optional reset on one of the sides.
      this.decimaldisplay = true;
      this.counter = true;
      if(writeheading2 == -1) {
        inheading = writeheading;
        indir = writedir;
        writeheading = -1;
      } else {
        if(writedir == outdir) {
          inheading = writeheading;
          indir = writedir;
          writeheading = writeheading2;
          writedir = writedir2;
        } else {
          inheading = writeheading2;
          indir = writedir2;
          writeheading = writeheading;
          writedir = writedir;
        }
        ilsbpos = (inheading == 1 || inheading == 2) ? 1 : 0;
        writeheading2 = -1;
        writedir2 = -1;
      }
      this.cursorx = this.cursory = -1;
    } else {
      if(writeheading2 != -1) return null; // only used for counter with reset
      if(readheading == -1 && writeheading == -1) return null;
      if((writeheading != -1) != (inheading != -1)) return null;
      if((readheading != -1) != (outheading != -1)) return null;
    }

    var rinput = (inheading == -1) ? [-1, -1, [], -1, -1] :
        [inheading, inheading & 1, io[inheading][0], io[inheading][1], ilsbpos];
    var rwrite = (inheading == -1) ? [-1, -1, [], -1, -1] :
        [writeheading, writedir, [], -1, ilsbpos];
    var routput = (outheading == -1) ? [-1, -1, [], -1, -1] :
        [outheading, outdir, io[outheading + 4][0], io[outheading + 4][1], olsbpos];
    var rread = (outheading == -1) ? [-1, -1, [], -1, -1] :
        [readheading, readdir, [], -1, olsbpos];

    var result = {'input':rinput, 'write':rwrite, 'output':routput, 'read':rread };
    return result;
  };

  /*
  Sorts inputs and outputs, as follows:
  -from lsb to msb
  -for inputs, the write input comes after that
  dirs is as returned by getDirs: {
    input [heading, dir, [iv], num, lsbpos]: input side
    write [heading, dir, [iv], num, lsbpos]: read/write input, also indicates LSB pos
    output [heading, dir, [iv], num, lsbpos]: output side
    read [heading, dir, [iv], num, lsbpos]: read side: the side with eof and keyboard read
  }
  */
  this.sortIO = function(dirs) {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    var inputheading = dirs.input[0];
    var outputheading = dirs.output[0];
    var outputdir = dirs.output[1];
    var writeheading = dirs.write[0];
    var ilsbpos = dirs.input[4];
    var olsbpos = dirs.output[4];
    var readheading = dirs.read[0];

    var getDir = function(x, y) {
      if(y < y0) return 0;
      if(x >= x1) return 1;
      if(y >= y1) return 2;
      if(x < x0) return 3;
      return -1;
    };

    // corners touch two sides. So returns false for any of those for corners.
    var sideIsNot = function(x, y, d) {
      if(y <= y0 && d == 0) return false;
      if(x >= x1 - 1 && d == 1) return false;
      if(y >= y1 - 1 && d == 2) return false;
      if(x <= x0 && d == 3) return false;
      return true;
    };

    //sort master input components from lsb to msb, then the write input
    var array = [];
    for(var i = 0; i < this.master.inputs.length; i++) array[i] = i;
    var self = this;
    array = array.sort(function(a, b) {
      var xa =  self.master.inputs_x[a];
      var ya =  self.master.inputs_y[a];
      var xb =  self.master.inputs_x[b];
      var yb =  self.master.inputs_y[b];
      var da = getDir(xa, ya);
      var db = getDir(xb, yb);
      if(da != db) {
        // order is: inputs, write, read
        if(da == inputheading) return -1;
        if(db == inputheading) return 1;
        if(da == writeheading) return -1;
        if(db == writeheading) return 1;
      }
      if(da != inputheading && db != inputheading && da == db) {
        return 0;
      }
      if(((da & 1) == 0) && ilsbpos) return xb - xa;
      if(((da & 1) == 0)) return xa - xb;
      if(ilsbpos) return yb - ya;
      return ya - yb;
    });
    newOrder(this.master.inputs, array);
    newOrder(this.master.inputs_negated, array);
    newOrder(this.master.inputs_x, array);
    newOrder(this.master.inputs_y, array);
    newOrder(this.master.inputs_x2, array);
    newOrder(this.master.inputs_y2, array);

    // also handle outputs

    var output_inv = {};
    for(var i = 0; i < dirs.output[2].length; i++) {
      output_inv[dirs.output[2][i]] = i;
    }

    // TODO: is this creating much more output components than needed? Should be only one row plus 1 eof, not a whole 2D rectangle. And same TODO for ROM!
    var components = [[this.master, this.master_orig_x, this.master_orig_y]];
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        // TODO: investigate: is the "!= this.master" check needed? The ROM does it. But in the case here, it prevents outputting the "EOF" signal if it happens to be connected to the cell that happens to be the core cell!
        if(c.components[0] /*&& c.components[0] != this.master*/) {
          var component = c.components[0];
          if(sideIsNot(x, y, outputheading)) component.rom_out_pos = this.numoutputs;
          //else if(olsbpos) component.rom_out_pos = ((outputdir == 1) ? (dirs.output[3] - y - 1) : (dirs.output[3] - x - 1));
          else if(olsbpos) component.rom_out_pos = this.numoutputs - 1 - ((outputdir == 1) ? (output_inv[y]) : (output_inv[x]));
          else component.rom_out_pos = ((outputdir == 1) ? (output_inv[y]) : (output_inv[x]));
        }
      }
    }

    if(this.numoutputs > 0) {
      activeVTE = this;
      document.activeElement.blur(); // this prevents that you accidently start typing but it instead selects a different dropdown option!
    }
  };

  this.init2 = function() {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    if(!this.master) return false;

    var io = getIO2(x0, y0, x1, y1, this.master);
    if(!io) return false;

    var dirs = this.getDirs(io);
    if(!dirs) return false;

    this.numinputs = dirs.input[3];
    this.numoutputs = dirs.output[3];
    this.sortIO(dirs);

    var w = x1 - x0;
    var h = y1 - y0;
    this.text = [];
    for(var y = 0; y < h; y++) {
      this.text[y] = [];
      for(var x = 0; x < w; x++) {
        this.text[y][x] = ' ';
      }
    }

    return true;
  };
}

function countFFComponents(array) {
  var o = {};
  o.numc = 0;
  o.numC = 0;
  o.numq = 0;
  o.numQ = 0;
  o.numff = 0;
  o.numd = 0;
  o.numy = 0;
  for(var i = 0; i < array.length; i++) {
    var cell = world[array[i][1]][array[i][0]];

    if(cell.circuitsymbol == 'c') o.numc++;
    if(cell.circuitsymbol == 'C') o.numC++;
    if(cell.circuitsymbol == 'q') o.numq++;
    if(cell.circuitsymbol == 'Q') o.numQ++;
    if(cell.circuitsymbol == 'd') o.numd++;
    if(cell.circuitsymbol == 'y') o.numy++;
    if(ffmap[cell.circuitsymbol]) o.numff++;
  }
  return o;
}

// returns [type, value]
function getFFType(array) {
  var num = countFFComponents(array);

  var value = num.numC > 0;
  var type = TYPE_FLIPFLOP;

  if(num.numff == 1) {
    // could also return TYPE_CONSTANT, but it depends on whetehr there are inputs
    // or not and that's not known yet here...
    if(num.numc || num.numC) type = TYPE_COUNTER;
    if(num.numd) type = TYPE_DELAY;
  }

  return [type, value];
}

// flip flop
function FF() {
  this.cells = [];
  this.numcC = 0;

  this.value = false;

  this.update = function(inputs) {
  };

  // init before inputs are resolved
  // returns true if ok, false if error
  this.init1 = function(array) {
    var array2 = [];
    var num = countFFComponents(array);
    this.numcC = num.numc + num.numC;

    for(var i = 0; i < array.length; i++) {
      var cell = world[array[i][1]][array[i][0]];
      array2.push(cell);
    }

    if(num.numC) this.value = true;

    this.master = array2[0].components[0];
    for(var i = 0; i < array2.length; i++) {
      array2[i].components[0].master = this.master;
      array2[i].components[0].type = TYPE_FLIPFLOP;
    }
    this.master.ff = this;
    this.cells = array2;

    return true;
  };

  this.init2 = function() {
    return true;
  };
}

/*
The tristate component 'z': is a fake component that acts somewhat like a tristate buffer in real life,
except we don't actually have 3 states here (high impedance/floating is treated the same as zero, because
the simulation only supports two states).
Unlike other components, multiple z's can output to the same wire. Internally this group of z's and wires
is actually a single component, which exists out of multiple tristate buffers all outputting to the same wire.
Every z that is part of it must have exactly 1 or 2 inputs. If the AND of these 2 inputs is true, then the entire
components outputs (and this applies to any z).
NOTE:
-In real life, a tristate buffer can output 3 possible levels: low voltage, high voltage, or high impedance, which is like having no connection at all (switch open)
--> In the simulation, this third state "high impedance" aka "floating" aka "disconnected" aka "Z" is NOT supported. It still outputs only 0 or 1 here, the simulation treats high impedance exactly like zero.
-In real life, if multiple tristate buffers output to the same wire, then all except one must be high impedance, otherwise there can be a short (or at least a conflict)
--> In the simulation, that error condition is not indicated as an error (This is a TODO), instead the OR is taken (without using 'z' the error condition is immediately shown though)
-In real life, a tristate buffer has 2 inputs: one that turns it between high impedance and signal, and the other is the signal
--> In the simulation, there are also up to 2 inputs, but they both do the same thing rather than being different (they AND here), but the intention of using 'z' instead of 'a' is to actually show this
    to the viewer and point out they need to interpret it as how it would be in real life.
*/
function TriState() {
  this.component = null;
  this.invin = false; // if true, input ORs instead of ANDs
  this.invout = false;  // if true, output ANDs instead of ORs with wire (low wins instead of high wins, a 'high' pull up resistor is at the wire bus)

  // must be called after inputs are resolved
  this.init = function(component) {
    // we sort the inputs such that each group of inputs pointing to the same 'z' are after each other
    this.component = component;

    if(component.type == TYPE_TRISTATE_INV) {
      this.invin = true;
      this.invout = true;
    }

    var array = [];
    for(var i = 0; i < component.inputs.length; i++) array[i] = i;
    /*if((array.length & 1) != 0) {
      component.error = true;
      component.errormessage = 'Invalid tristate buffer input combination, each z must have 1 pair';
      return;
    }*/
    array = array.sort(function(a, b) {
      if(component.inputs_x2[a] == component.inputs_x2[b]) {
        return component.inputs_y2[a] - component.inputs_y2[b];
      }
      return component.inputs_x2[a] - component.inputs_x2[b];
    });
    newOrder(component.inputs, array);
    newOrder(component.inputs_x, array);
    newOrder(component.inputs_y, array);
    newOrder(component.inputs_x2, array);
    newOrder(component.inputs_y2, array);
    newOrder(component.inputs_negated, array);

    /*for(var i = 0; i < component.inputs.length; i += 2) {
      if((component.inputs_x2[i] != component.inputs_x2[i + 1]) ||
         (component.inputs_y2[i] != component.inputs_y2[i + 1])) {
        component.error = true;
        component.errormessage = 'Invalid tristate buffer input combination, each z must have 1 pair';
        return;
      }
    }*/

    for(var i = 0; i + 2 < component.inputs.length; i++) {
      if(component.inputs_x2[i] == component.inputs_x2[i + 1] &&
         component.inputs_x2[i] == component.inputs_x2[i + 2] &&
         component.inputs_y2[i] == component.inputs_y2[i + 1] &&
         component.inputs_y2[i] == component.inputs_y2[i + 2]) {
        component.error = true;
        component.errormessage = 'Invalid tristate buffer input combination: max 2 inputs per z. More makes no sense IRL so we do not simulate it to avoid confusion.';
        return;
      }
    }
  };

  this.update = function() {
    var component = this.component;
    // given the order created by init, we simply have to check for each consecutive pair of inputs, if their 'AND' is on
    // NOTE: in theory, if there are multiple pairs that are on, this should result in an error! But we don't support dynamic errors. So they get OR-ed instead.
    var on = this.invout ? true : false;
    var prevx = -1;
    var prevy = -1;
    if(component.inputs.length > 0) {
      prevx = component.inputs_x2[0];
      prevy = component.inputs_y2[0];
    }
    var v = this.invin ? false : true;
    for(var i = 0; i < component.inputs.length; i++) {
      var value = component.inputs[i].value;
      if(component.inputs_negated[i]) value = !value;
      if(this.invin) {
        if(value) v = true;
      } else {
        if(!value) v = false;
      }
      var x = -2;
      var y = -2;
      if(i + 1 < component.inputs.length) {
        x = component.inputs_x2[i + 1];
        y = component.inputs_y2[i + 1];
      }
      if(x != prevx || y != prevy) {
        prevx = x;
        prevy = y;
        if(this.invout) {
          if(!v) {
            on = false;
            break;
          }
        } else {
          if(v) {
            on = true;
            break;
          }
        }
        v = this.invin ? false : true;
      }
    }
    return on;
  };
}

var buses = [];

function Bus() {
  // object, index is number. Value is array of coordinates that have this number.
  this.connections = {};
}

var highlightedcomponent = null;

function Component() {
  this.value = false;
  this.prevvalue = false; // used for the slow algorithms, plus also for flipflops (to support shift registers with D flipflops made from counters...)
  this.type = TYPE_NULL;
  this.inputs = []; // input components. The same one may appear multiple times, that is fine (if same component wired to different inputs of this one)
  this.inputs_negated = []; // true if this input is negated (using m]w[ instead of ^>v<)
  this.cells = []; //x,y,z coordinates of world cells
  this.corecell = null; // the one cell containing the type of this component, e.g. in A----> it's the A
  this.updated = false;
  this.index = -1; // index in the global components array
  this.error = false;
  this.errormessage = null;
  this.previnputs = []; // previous values of these inputs (already negated for negated inputs), only used for counters. For some algorithms this is same as this.inputs[i].prevvalue, but for algorithm 1 in case of loops it is not.
  this.ff_cycle = false;
  this.ff_cycle_time = 0;
  this.input_ff_types = []; // only used by flipflops. 0=c, 1=j, 2=k, 3=d, 4=t, 5=q, 6=Q
  this.master = null; // master component for rom, vte, ...
  this.rom = null; // used if this is a master of rom
  this.mux = null; // used if this is a master of mux
  this.vte = null;
  this.ff = null;
  this.tristate = null;
  this.rom_out_pos = -1; // used not only for ROM outputs but also for other big components like flip-flops and mux, to know which output value of the master this one belongs to
  // location of the input symbol >, v, ... of incoming component
  this.inputs_x = [];
  this.inputs_y = [];
  // location of cell of this component to which inputting >, v, ... is attached (for typical components with only 1 cell, this is usually all the same core cell coordinates)
  this.inputs_x2 = [];
  this.inputs_y2 = [];
  this.number = -1;
  this.defsubindex = -2;
  this.callsubindex = -2;
  this.callsub = null;
  this.rgbcolor = 0; // index in array of 16 RGB LED colors
  this.issub = false; // is a component copied for a sub
  this.clocked = false; // for realtime timers
  // whether this component changed this frame. Normally can be seen from
  // this.prevvalue != this.value, but, for some components like delays they end
  // up in changed state due to ticking down, even if their value does not
  // change. What this value really indicates is: might any later combinational
  // clock tick still change the value in the future? The purpose of this value is
  // to know when auto-tick updates can stop for AUTOUPDATE algorithm 3.
  this.changed = false;
  this.changedticks = 0; // for keeping track of 'changed' for delay

  this.markError = function(message) {
    this.error = true;
    if(!message) message = 'component error';
    for(var i = 0; i < this.cells.length; i++) {
      var x = this.cells[i][0];
      var y = this.cells[i][1];
      world[y][x].markError(message);
    }
    if(message && !this.errormessage) this.errormessage = message;
  };

  // for RGB led
  this.sortInputsNESW = function() {
    var self = this;
    var array = [];
    for(var i = 0; i < this.inputs.length; i++) array[i] = i;
    var x = self.corecell.x;
    var y = self.corecell.y;
    array = array.sort(function(a, b) {
      var xa =  self.inputs_x[a];
      var ya =  self.inputs_y[a];
      var xb =  self.inputs_x[b];
      var yb =  self.inputs_y[b];
      var dira = (ya < y) ? 0 : ((xa > x) ? 1 : ((ya > y) ? 2 : 3));
      var dirb = (yb < y) ? 0 : ((xb > x) ? 1 : ((yb > y) ? 2 : 3));
      if(dira != dirb) return dira - dirb;
      if(dira == 0) return xa - xb;
      if(dira == 1) return yb - ya;
      if(dira == 2) return xb - xa;
      if(dira == 3) return ya - yb;
      return 0;
    });
    newOrder(this.inputs, array);
    newOrder(this.inputs_negated, array);
    newOrder(this.inputs_x, array);
    newOrder(this.inputs_y, array);
    newOrder(this.inputs_x2, array);
    newOrder(this.inputs_y2, array);
    newOrder(this.input_ff_types, array);
  };

  this.hasLength2CycleWithTwoInputs = function() {
    if(this.type == TYPE_FLIPFLOP) return false;
    if(this.type == TYPE_VTE) return false;
    if(this.type == TYPE_ROM) return false;
    var component2 = null;
    var found = false;
    for(var i = 0; i < this.inputs.length; i++) {
      component2 = this.inputs[i];
      if(component2 == this) continue;
      if(component2.type == TYPE_FLIPFLOP) continue;
      if(component2.type == TYPE_VTE) continue;
      if(component2.type == TYPE_ROM) continue;
      for(var j = 0; j < component2.inputs.length; j++) {
        if (component2.inputs[j] == this) {
          var otherinput0 = null;
          var k = 0;
          for(; k < this.inputs.length + component2.inputs.length; k++) {
            var input = k < this.inputs.length ? this.inputs[k] : component2.inputs[k - this.inputs.length];
            if(input != this && input != component2) {
              otherinput0 = input;
              break;
            }
          }
          var otherinput1 = null;
          for(; k < this.inputs.length + component2.inputs.length; k++) {
            var input = k < this.inputs.length ? this.inputs[k] : component2.inputs[k - this.inputs.length];
            // the "input != otherinput0" check was disabled on 20180224 because due to new global optimization where loose wire is same component everywhere, it can be that a small device you make to enforce electron mode does not work... If ever comment strings are used to enforce electron mode this can be reenabled
            if(input != this && input != component2 /*&& input != otherinput0*/) {
              otherinput1 = input;
              break;
            }
          }
          if(otherinput0 && otherinput1) return true;
        }
      }
    }
    return false;
  };

  /*
  numon: num inputs that are on
  numoff: num inputs that are off
  NOTE: does not support the counters/flip-flops or ROM
  */
  this.getNewValue = function(numon, numoff) {
    if(this.type == TYPE_LOOSE_WIRE_IMPLICIT) {
      return false;
    } else if(this.type == TYPE_LOOSE_WIRE_EXPLICIT) {
      return false;
    } else if(this.type == TYPE_CONSTANT) {
      return this.value;
    } else if(this.type == TYPE_SWITCH_OFF) {
      return false;
    } else if(this.type == TYPE_SWITCH_ON) {
      return (numoff == 0) || (numon > 0); // if the switch has no inputs, it always returns true. If it has inputs, it returns the OR of them.
    } else if(this.type == TYPE_LED) {
      return numon > 0;
    } else if(this.type == TYPE_PUSHBUTTON_OFF) {
      return false;
    } else if(this.type == TYPE_PUSHBUTTON_ON) {
      return (numoff == 0) || (numon > 0); // same principle as switch
    } else if(this.type == TYPE_TIMER_OFF) {
      return false;
    } else if(this.type == TYPE_TIMER_ON) {
      return (this.clocked) && ((numoff == 0) || (numon > 0)); // same principle as switch
    } else if(this.type == TYPE_AND) {
      return numoff == 0;
    } else if(this.type == TYPE_OR || this.type == TYPE_IC_PASSTHROUGH) {
      return numon != 0;
    } else if(this.type == TYPE_XOR) {
      return (numon & 1) == 1;
    } else if(this.type == TYPE_NAND) {
      return numoff != 0;
    } else if(this.type == TYPE_NOR) {
      return numon == 0;
    } else if(this.type == TYPE_XNOR) {
      return (numon & 1) == 0;
    } else if(this.type == TYPE_DELAY) {
      return this.value; // not implemented in this function, but elsewhere
    } else if(this.type == TYPE_COUNTER) {
      return this.value; // not implemented in this function, but elsewhere
    } else if(this.type == TYPE_FLIPFLOP) {
      return this.value; // not implemented in this function, but elsewhere
    } else if(this.type == TYPE_ROM) {
      return this.value; // not implemented in this function, but elsewhere
    } else if(this.type == TYPE_MUX) {
      return this.value; // not implemented in this function, but elsewhere
    } else if(this.type == TYPE_VTE) {
      return this.value; // not implemented in this function, but elsewhere
    } else if(this.type == TYPE_RANDOM) {
      return (Math.random() < 0.5);
    }
    return false;
  };

  /*
  sets initial value for both value and prevvalue. Reason: some components look at prevvalue. If prevvalue is not consistent
  during the very first round, then flip flops can behave differently depending on whether there is a NAND with negative input to us, or AND with positive
  input to us, but those two cases really should do the same thing.
  So in conclusion: we make an AND with pos output and a NAND with negated output behave the same after initialization.
  Flip flop or loops state isn't necessarily defined on first tick, but at least I want it to do the same for those two cases rather than something different.
  */
  this.setInitialValue = function() {
    // do as if all inputs are off. that is the value that we do as if this component has historically had forever
    var value = this.getNewValue(0, this.inputs.length);

    if(this.type == TYPE_FLIPFLOP) {
      if(this.ff) value = this.ff.value;
      if(this.master && this.master.ff) value = this.master.ff.value;
      for(var i = 0; i < this.inputs.length; i++) {
        this.previnputs[i] = true; // this ensures we will NOT have inputs counted as going from low to high initially
      }
    }

    if(this.type == TYPE_COUNTER || this.type == TYPE_RANDOM) {
      for(var i = 0; i < this.inputs.length; i++) {
        this.previnputs[i] = true; // this ensures we will NOT have inputs counted as going from low to high initially
      }
    }

    if(this.type == TYPE_DELAY && this.number < 0) this.number = 1;

    this.prevvalue = this.value = value;
  };

  this.update = function() {
    if(this.updated) return;
    this.updated = true;
    if(this.master) this.master.update();
    var numon = 0;
    var numoff = 0;

    // for counter, flipflops, ..., not updated for other types
    var numc = 0;
    var numc_pos_edge = 0;
    var numc_neg_edge = 0;
    var numf0 = 0; // num positive inputs set to false
    var numf1 = 0; // num positive inputs set to true
    var numF0 = 0; // num negative inputs set to false
    var numF1 = 0; // num positive inputs set to true
    var numq = 0;
    var numQ = 0;
    var numy = 0;
    var numY = 0; // y inputs that are off
    var rom_inputs = []; // only filled in if this is ROM

    if(UPDATE_ALGORITHM == 3 && this.ff_cycle && this.ff_cycle_time > 5 && this.type != TYPE_FLIPFLOP && Math.random() < TWIDDLE_PROBABILITY) {
      // emulate flip flop made from gates metastability
      return;
    }

    for(var i = 0; i < this.inputs.length; i++) {
      var negated = this.inputs_negated[i];
      var component2 = this.inputs[i];
      if(!component2) {
        console.log('undefined input');
        continue;
      }
      var value2;
      if(UPDATE_ALGORITHM == 0) {
        // simple but inconsistent (based on scanline order) algorithm
        value2 = component2.value;
      } else if(UPDATE_ALGORITHM == 1) {
        // recursive fast algorithm
        if(!component2.updated) {
          // this can happen if the cells were wrongly sorted for the fast update algorithm,
          //but also simply if there are loops. So no action taken (we could have printed
          //error in console or this.markError here, but then loops would not be supported)
        }
        value2 = component2.value;
      } else if(UPDATE_ALGORITHM == 2) {
        // slow algorithm, components only update based on previous value of inputs
        value2 = component2.prevvalue;
      } else if(UPDATE_ALGORITHM == 3) {
        // also slow algorithm, but as seen elsewhere this component has small chance to not update this tick
        value2 = component2.prevvalue;
      }

      if(this.ff && this.type == TYPE_FLIPFLOP && (UPDATE_ALGORITHM == 0 || UPDATE_ALGORITHM == 1)) {
        if(this.input_ff_types[i] >= 1 && this.input_ff_types[i] <= 4 && this.ff.numcC) {
          // add a 1-tick delay to the non-clock inputs of built-in flip flops,
          // otherwise serial-in shift registers from D flipflops don't work as intended
          // the flipflops would be too fast and all update at once instead of one by one

          // If no clock (only enable for example) then don't do this delay, to have very
          // fast response for D-latch (which can be used as 'enable' for other things)

          // the shift register is not the only example why this is needed, in fast update modes
          // when there are loops, the order in which components are updated is not defined (because there is
          // no topographical order then), and that may cause some flipflops to read old values and
          // others to read new values (that were already updated this cycle). We want all
          // flipflops to update from data values from the same moment, the ones from the previous cycle, otherwise
          // you might get e.g. 8-bit registers that partially updated from the previous, partially from new values...
          value2 = component2.prevvalue;
        }
      }


      value2 = (value2 != negated);
      if (value2) numon++;
      else numoff++;

      // The this.ff check ensures this only happens for the flipflop master component
      if(this.type == TYPE_FLIPFLOP && this.ff) {
        var prevvalue2 = (this.previnputs[i] == undefined) ? value2 : this.previnputs[i];
        this.previnputs[i] = value2;
        if(this.input_ff_types[i] == 1) { // j
          if(value2) numf1++;
          else numf0++;
        } else if(this.input_ff_types[i] == 2) { // k
          if(value2) numF1++;
          else numF0++;
        } else if(this.input_ff_types[i] == 3) { // d
          if(value2) { numf1++; numF0++; }
          else  { numf0++; numF1++; }
        } else if(this.input_ff_types[i] == 4) { // t
          if(value2) { numf1++; numF1++; }
          else  { numf0++; numF0++; }
        } else if(this.input_ff_types[i] == 5) { // q
          if(value2) numq++;
        } else if(this.input_ff_types[i] == 6) { // Q
          if(value2) numQ++;
        } else if(this.input_ff_types[i] == 7) { // y
          if(value2) numy++;
          else numY++;
        } else { // c: this.input_ff_types[i] == 0, but also if undefined for some edge cases
          if(value2) numc++;
          if(value2 && !prevvalue2) numc_pos_edge++;
          if(!value2 && prevvalue2) numc_neg_edge++;
        }
      }

      if(this.type == TYPE_COUNTER || this.type == TYPE_RANDOM) {
        var prevvalue2 = (this.previnputs[i] == undefined) ? value2 : this.previnputs[i];
        this.previnputs[i] = value2;
        if(value2) numc++;
        if(value2 && !prevvalue2) numc_pos_edge++;
        if(!value2 && prevvalue2) numc_neg_edge++;
      }

      if(this.type == TYPE_ROM || this.type == TYPE_MUX || this.type == TYPE_LED_RGB || this.type == TYPE_VTE) {
        rom_inputs[i] = value2;
      }
    }

    if(this.type == TYPE_ROM) {
      if(this.master) {
        if(this.rom) this.rom.update(rom_inputs);
        var rom = this.rom || this.master.rom;
        this.value = rom.output[this.rom_out_pos];
      }
    } else if(this.type == TYPE_MUX) {
      if(this.master) {
        if(this.mux) this.mux.update(rom_inputs);
        var mux = this.mux || this.master.mux;
        this.value = mux.output[this.rom_out_pos];
      }
    } else if(this.type == TYPE_VTE) {
      if(this.master) {
        if(this.vte) this.vte.update(rom_inputs);
        var vte = this.vte || this.master.vte;
        this.value = vte.output[this.rom_out_pos];
      }
    } else if(this.type == TYPE_IC) {
      // a component of this type in theory should do nothing and not be connected with anything, it's just
      this.value = false;
    } else if(this.type == TYPE_LED_RGB) {
      this.value = (numon > 0);
      var color = 0;
      for(var i = 0; i < rom_inputs.length && i < 3; i++) color += (rom_inputs[i] << i);
      this.rgbcolor = color;
    } else if(this.type == TYPE_FLIPFLOP) {
      // beware that the numf0, numf1, numF0, numF1 inputs, which are the data inputs,
      // have been delayed by 1 above, for the fast algorithms! This to make the built-in
      // flipflops not TOO fast, otherwise serial shift registers from D's don't work like in real life.


      //we do not take the positive edge of the xor "e", but instead the xor of the positive edges. Otherwise while one input is high, a second input would be negative edge triggered. So we use num instead of e here.
      var clocked = (numc_pos_edge & 1);

      // flip flops are made from multiple components (d, c, ...), but only one of them
      // is designated as master component.
      // Only the master component has its own ff. So it's updated only once, as intended.
      if(this.ff) {
        // change whether clocked if there are 'enable' inputs
        var ffenable = numy;
        var ffdisable = numY && !numy;
        if(ffenable) {
          if(!this.ff.numcC) clocked = true; // this is when there is no real clock (c) present, only an enable input
        }
        else if(ffdisable) {
          clocked = false; // edge triggered clock disabled
        }

        if(numQ && numq) {
          if(!ffdisable) this.ff.value = !this.ff.value;
        } else if(numQ) {
          if(!ffdisable) this.ff.value = false; // asynch reset (takes priority over set)
        } else if(numq) {
          if(!ffdisable) this.ff.value = true; // asynch set
        } else if(clocked) {
          if((numf1 && numF1) || (!numf1 && !numf0 && !numF1 && !numF0 && this.ff.numcC)) {
            // "numf1 && numF1" means that JK of a JK flip-flop, or T of a T-flip-flop was set
            // "!numf1 && !numf0 && !numF1 && !numF0 && this.ff.numcC" means: flip-flop without actual inputs, e.g. a counter (single c, even if combined with q and/or Q), but don't do for 'y'-only FF.
            this.ff.value = !this.ff.value; // toggle
          } else if(numf1) {
            this.ff.value = true; // set
          } else if(numF1) {
            this.ff.value = false; // reset
          }
        }
      }

      var ff = (this.ff || (this.master && this.master.ff));
      if(ff) {
        var value = ff.value;
        // The output value of these particular cells of a flip flop, are inverted. Reading from Q gives inverted of what flip flops' full state is.
        if(this.corecell.circuitsymbol == 'Q' || this.corecell.circuitsymbol == 'k') value = !value;
        this.value = value;
      } else {
        console.log('suspicious: ff component without ff field');
        //if(clocked) this.value = !this.value;
      }
    } else if(this.type == TYPE_COUNTER) {
      var clocked = (numc_pos_edge & 1);
      if(clocked) {
        this.value = !this.value;
      }
    } else if(this.type == TYPE_RANDOM) {
      var clocked = ((numc_pos_edge + numc_neg_edge) & 1);
      if(clocked) {
        this.value = (Math.random() < 0.5);
      }
    } else if(this.type == TYPE_DELAY) {
      var number = this.number;
      if(number < 0) number = 1; // default value
      if(number > 256) number = 0; // too large, disable it
      if(UPDATE_ALGORITHM == 2 || UPDATE_ALGORITHM == 3) number--; // slow algorithms already introduce a 1-tick delay!
      if(number > 0) {
        if(!this.reg) {
          this.reg = [];
          this.regpos = 0;
          for(var r = 0; r < number + 1; r++) this.reg[r] = false;
        }

        var prevregpos = (this.regpos == 0) ? (number - 1) : (this.regpos - 1);
        if((!!this.reg[prevregpos]) != (!!numon)) {
          this.changedticks = number;
        }
        if(this.changedticks > 0) this.changed = true;
        this.changedticks--;

        this.reg[this.regpos] = numon;
        this.regpos++;
        if(this.regpos >= number + 1) this.regpos = 0;
        this.value = this.reg[this.regpos];
      } else {
        this.value = numon; // delay 0, so immediate
      }
    } else if(this.type == TYPE_TRISTATE || this.type == TYPE_TRISTATE_INV) {
      this.value = this.tristate.update();
    } else if(this.type == TYPE_TIMER_OFF) {
      this.value = false;
    /*} else if(this.type == TYPE_TIMER_ON) {
      this.value = this.clocked && this.getNewValue(numon, numoff);*/
    } else {
      // regular gate, not flip-flop
      this.value = this.getNewValue(numon, numoff);
      if(this.value != this.prevvalue) this.ff_cycle_time++;
      else this.ff_cycle_time = 0;
    }

    if(this.value != this.prevvalue) this.changed = true;

    //console.log('updated: ' + this.index + ' ' + this.corecell.symbol + ' ' + this.corecell.x + ' ' + this.corecell.y);
  };

  this.mousedown = function(e, x, y) {
    if(e.shiftKey) {
      if(isPaused() && highlightedcomponent == this) {
        highlightedcomponent = null;
        unpause();
        render();
      } else {
        pause();
        highlightedcomponent = this;
        render();
        autopaused = true; // this to cause less user confusion: with this true, it unpauses more easily (when pressing anything)
      }
      return;
    }
    // for TYPE_ROM, just do default behavior, it already toggles bit
    if(e.ctrlKey && this.type != TYPE_ROM) {
      var didsomething = true;
      if(this.type == TYPE_PUSHBUTTON_OFF) {
        // do not change here. The mouseup event will do the change. All we
        // do here for pushbutton is ignore the mousedown event.
      } else if(this.type == TYPE_PUSHBUTTON_ON) {
        // do not change here. The mouseup event will do the change. All we
        // do here for pushbutton is ignore the mousedown event.
      } else if(this.type == TYPE_SWITCH_OFF) {
        this.type = TYPE_SWITCH_ON;
      } else if(this.type == TYPE_SWITCH_ON) {
        this.type = TYPE_SWITCH_OFF;
      } else if(this.type == TYPE_TIMER_OFF) {
        this.type = TYPE_TIMER_ON;
      } else if(this.type == TYPE_TIMER_ON) {
        this.type = TYPE_TIMER_OFF;
      } else if(this.type == TYPE_AND) {
        this.type = TYPE_NAND;
      } else if(this.type == TYPE_NAND) {
        this.type = TYPE_AND;
      } else if(this.type == TYPE_OR) {
        this.type = TYPE_NOR;
      } else if(this.type == TYPE_NOR) {
        this.type = TYPE_OR;
      } else if(this.type == TYPE_XOR) {
        this.type = TYPE_XNOR;
      } else if(this.type == TYPE_XNOR) {
        this.type = TYPE_XOR;
      } else if(this.type == TYPE_TRISTATE) {
        this.type = TYPE_TRISTATE_INV;
      } else if(this.type == TYPE_TRISTATE_INV) {
        this.type = TYPE_TRISTATE;
      } else if(this.type == TYPE_CONSTANT || this.type == TYPE_COUNTER || this.type == TYPE_RANDOM) {
        this.value = !this.value;
      } else {
        didsomething = false;
      }
      if(didsomething) {
        //world[y][x].initDiv2();
        var symbol = typesymbols[this.type];
        if(this.type == TYPE_CONSTANT || this.type == TYPE_COUNTER) symbol = this.value ? 'C' : 'c';
        if(symbol) {
          this.corecell.symbol = symbol;
          this.corecell.displaysymbol = symbol;
          this.corecell.circuitsymbol = symbol;
          this.corecell.initDiv2();
        }
      }
      render();
      return;
    }
    if(changeMode) {
      changeDropdown.selectedIndex = 0; // so that "onchange" works again even if choosing the same one ...
      var value = this.value;
      var type = changeMode;
      var symbol = typesymbols[type];
      if(changeMode == 'rem_inputs') {
        this.inputs = [];
        return;
      }
      if(changeMode == 'c') {
        type = this.inputs.length ? TYPE_COUNTER : TYPE_CONSTANT;
        value = false;
        symbol = 'c';
      }
      if(changeMode == 'C') {
        type = this.inputs.length ? TYPE_COUNTER : TYPE_CONSTANT;
        value = true;
        symbol = 'C';
      }
      if(type == TYPE_RANDOM) {
        value = Math.random() < 0.5;
      }
      this.type = type;
      this.value = value;
      changeMode = null;
      if(!symbol) return;
      for(var i = 0; i < this.cells.length; i++) {
        var cell = world[this.cells[i][1]][this.cells[i][0]];
        if(!devicemap[cell.circuitsymbol]) continue;
        cell.symbol = symbol;
        cell.displaysymbol = symbol;
        cell.circuitsymbol = symbol;
        cell.initDiv(cell.x, cell.y);
      }
      return;
    }
    if(this.type == TYPE_SWITCH_OFF) {
      this.type = TYPE_SWITCH_ON;
      this.corecell.renderer.setLook(this.corecell, this.type);
    } else if(this.type == TYPE_SWITCH_ON) {
      this.type = TYPE_SWITCH_OFF;
      this.corecell.renderer.setLook(this.corecell, this.type);
    }
    if(this.type == TYPE_PUSHBUTTON_OFF) {
      this.type = TYPE_PUSHBUTTON_ON;
      this.corecell.renderer.setLook(this.corecell, this.type);
    } else if(this.type == TYPE_PUSHBUTTON_ON) {
      this.type = TYPE_PUSHBUTTON_OFF;
      this.corecell.renderer.setLook(this.corecell, this.type);
    }
    if(this.type == TYPE_TIMER_OFF || this.type == TYPE_TIMER_ON) {
      if(this.type == TYPE_TIMER_OFF) this.type = TYPE_TIMER_ON;
      else this.type = TYPE_TIMER_OFF;
      this.corecell.renderer.setLook(this.corecell, this.type);
    }
    if(this.type == TYPE_VTE) {
      var vte = this.vte;
      if(!vte) vte = this.master.vte;
      if(vte && vte.numoutputs > 0) {
        activeVTE = vte;
      }
    }
    if(this.type == TYPE_ROM) {
      //throw 'todo: must reimplement this, to not use x/y coords directly but the true line/bit pos';
      var rom = this;
      if(this.master) rom = this.master;
      if(rom.rom) rom = rom.rom;
      if(!rom.array) return;
      if(rom.decoder || rom.encoder) return;

      //var x = this.corecell.x, y = this.corecell.y;
      var bit;
      var line;
      if(rom.worddir == 1) {
        bit = rom.bits_inv[x - rom.x0];
        line = rom.lines_inv[rom.wordlsbpos ? (rom.y1 - 1 - y) : (y - rom.y0)];
      } else {
        bit = rom.bits_inv[y - rom.y0];
        line = rom.lines_inv[rom.wordlsbpos ? (rom.x1 - 1 - x) : (x - rom.x0)];
      }
      if(!rom.array[line]) return;

      rom.array[line][bit] = !rom.array[line][bit];
      rom.updateRamDisplay(bit, line);
    }
    global_changed_something = true;
  };

  this.mouseup = function(e) {
    if(this.type == TYPE_PUSHBUTTON_OFF) {
      if(!e.shiftKey) {
        this.type = TYPE_PUSHBUTTON_ON;
        this.corecell.renderer.setLook(this.corecell, this.type);
      }
    } else if(this.type == TYPE_PUSHBUTTON_ON) {
      if(!e.shiftKey) {
        this.type = TYPE_PUSHBUTTON_OFF;
        this.corecell.renderer.setLook(this.corecell, this.type);
      }
    } else {
      return false; // did nothing
    }
    global_changed_something = true;
    return !e.shiftKey; // did something
  };
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

var activeVTE = null;

document.body.onkeypress = function(e) {
  //console.log('body keypress: vte: ' + activeVTE + ', event: ' + e);
  if(activeVTE) {
    if(editmode) return;
    if(e.code == 'Backspace') {
      // do nothing. onkeydown does backspace already.
      // chrome only handles backspace in onkeydown, while firefox
      // handles it in both onkeypress and onkeydown
    } else {
      var key = e.which || e.charCode || e.keyCode || 0;
      activeVTE.typeKeyboard(key);
    }
    global_changed_something = true;
    // use render() if no update of components should be done but you still want to see the
    // new character appear. Use update() to do a full component update, similar to what
    // is done after pressing on button with mouse.
    //render();
    update();
  }
};

document.body.onkeydown = function(e) {
  if(activeVTE && e && e.code == 'Backspace') {
    if(editmode) return;
    activeVTE.doBackspace();
    global_changed_something = true;
    update();
  }
};

var lastmousedowncomponent = null;

var changeMode = null;


// red, orange, yellow, green, blue, violet, pink, white
var led_off_fg_colors;
var led_off_bg_colors;
var led_off_border_colors;
var led_on_fg_colors;
var led_on_bg_colors;
var led_on_border_colors;

// RGB order: bit 1: red, bit 2: green, bit 4: blue
// black, red, green, yellow, blue, magenta, cyan, white
// the RGB led can make cyan, magenta and black, regular leds can make orange, violet and pink
var rgb_led_fg_colors;
var rgb_led_bg_colors;

var ONCOLOR;
var OFFCOLOR;
var BGCOLOR;
var TEXTFGCOLOR;
var TEXTBGCOLOR;

var SWITCHON_FGCOLOR;
var SWITCHON_BGCOLOR;
var SWITCHON_BORDERCOLOR;
var SWITCHOFF_FGCOLOR;
var SWITCHOFF_BGCOLOR;
var SWITCHOFF_BORDERCOLOR;

var GATEBGCOLOR;

var LINKCOLOR;
var TITLECOLOR;
var TERMINALBGCOLOR;
var TERMINALFGCOLOR;

var BUSCOLORS;

function setColorScheme(index) {
  if(index == 0) {
    ONCOLOR = 'black';
    OFFCOLOR = '#aaa';
    BGCOLOR = 'white';
    TEXTFGCOLOR = '#000'; // '#940';
    TEXTBGCOLOR = '#fff6ea';

    led_off_fg_colors = ['#d66', '#d96', '#dd6', '#6d6', '#66d', '#60d', '#d66', '#666'];
    led_off_bg_colors = ['#fffafa', '#fffcfa', '#fffff4', '#fafffa', '#fbfdff', '#faf8ff', '#fffdfd', '#fcfcfc'];
    led_off_border_colors = ['#fcc', '#fa8', '#cc2', '#afa', '#ddf', '#d8f', '#fac', '#fff'];
    led_on_fg_colors = ['red', '#a40', '#880', 'green', '#44f', '#80f', '#d58', 'white'];
    led_on_bg_colors = ['#faa', '#fca', '#ff4', '#afa', '#bdf', '#a8f', '#fdd', '#ccc'];
    led_on_border_colors = led_on_fg_colors;

    rgb_led_fg_colors = ['#888', '#f77', '#dfd', '#dd0', '#ccf', '#f8f', '#0dd', '#888'];
    rgb_led_bg_colors = ['#000', '#f00', '#0f0', '#ff0', '#00f', '#f0f', '#0ff', '#eee'];

    BUSCOLORS = ['#aaa', '#aab', '#aba', '#baa', '#bba', '#bab', '#abb', '#bbb'];

    SWITCHON_FGCOLOR = led_on_fg_colors[3];
    SWITCHON_BGCOLOR = led_on_bg_colors[3];
    SWITCHOFF_FGCOLOR = led_off_fg_colors[3];
    SWITCHOFF_BGCOLOR = led_off_bg_colors[3];
    SWITCHON_BORDERCOLOR = SWITCHON_FGCOLOR;
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    GATEBGCOLOR = '#f7f7f7';

    LINKCOLOR = '#00e';
    TITLECOLOR = 'black';

    TERMINALBGCOLOR = 'black';
    TERMINALFGCOLOR = '#0d0';
  } else if(index == 1) {
    ONCOLOR = '#f44';
    OFFCOLOR = '#080';
    BGCOLOR = 'black';
    TEXTFGCOLOR = '#da0'; // '#0c0'; //'#fff';
    TEXTBGCOLOR = '#210'; // '#020'; //'#040';

    led_off_fg_colors = ['#d66', '#d96', '#dd6', '#6d6', '#66d', '#60d', '#d66', '#666'];
    led_off_bg_colors = ['#400', '#420', '#440', '#040', '#004', '#204', '#422', '#444'];
    led_off_border_colors = ['#800', '#840', '#880', '#080', '#008', '#408', '#844', '#888'];
    led_on_fg_colors = ['red', '#a40', '#880', 'green', '#44f', '#80f', '#d58', 'white'];
    led_on_bg_colors = ['#faa', '#fca', '#ff4', '#afa', '#bdf', '#a8f', '#fdd', '#ccc'];
    led_on_border_colors = led_on_fg_colors;

    rgb_led_fg_colors = ['#888', '#f77', '#dfd', '#dd0', '#ccf', '#f8f', '#0dd', '#888'];
    rgb_led_bg_colors = ['#222', '#f00', '#0f0', '#ff0', '#00f', '#f0f', '#0ff', '#fff'];

    BUSCOLORS = ['#aaa', '#aab', '#aba', '#baa', '#bba', '#bab', '#abb', '#bbb'];

    SWITCHON_FGCOLOR = ONCOLOR;
    SWITCHON_BGCOLOR = led_on_bg_colors[3];
    SWITCHOFF_FGCOLOR = '#0e0';
    SWITCHOFF_BGCOLOR = 'black';
    SWITCHON_BORDERCOLOR = SWITCHON_FGCOLOR;
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    GATEBGCOLOR = '#020';

    LINKCOLOR = '#880';
    TITLECOLOR = TEXTFGCOLOR;

    TERMINALBGCOLOR = '#00f';
    TERMINALFGCOLOR = '#fff';
  } else if(index == 2) {
    setColorScheme(0);

    BGCOLOR = '#aaa';

    ONCOLOR = 'white';
    OFFCOLOR = 'black';
    TEXTFGCOLOR = '#00a';

    GATEBGCOLOR = '#9b9b9b'; // '#b4b4b4';
    var offbg = GATEBGCOLOR;

    led_off_fg_colors = ['#f00', '#f80', '#dd0', '#0d0', '#00d', '#a0d', '#f99', '#eee'];
    led_off_bg_colors = [offbg, offbg, offbg, offbg, offbg, offbg, offbg, offbg];
    led_off_border_colors = led_off_fg_colors;
    led_on_fg_colors = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
    led_on_bg_colors = led_off_fg_colors;
    led_on_border_colors = led_off_border_colors;//led_on_fg_colors;

    SWITCHON_FGCOLOR = 'white';
    SWITCHON_BGCOLOR = '#0e0';
    SWITCHOFF_FGCOLOR = '#0e0';
    SWITCHOFF_BGCOLOR = offbg;
    //TODO: use switch border colors, and use them to not have invisible border around swithc in gray color scheme switch on
    SWITCHON_BORDERCOLOR = 'white';
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    BUSCOLORS = ['#666', '#665', '#656', '#566', '#556', '#565', '#655', '#555'];

    TEXTBGCOLOR = 'none';
  } else if(index == 3) {
    setColorScheme(0);

    BGCOLOR = '#008';

    ONCOLOR = '#fff';
    OFFCOLOR = '#aaf';
    TEXTFGCOLOR = '#aaa';

    led_off_fg_colors = ['#f00', '#f80', '#dd0', '#0d0', '#00d', '#a0d', '#f99', '#eee'];
    led_off_bg_colors = ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'];
    led_off_border_colors = led_off_fg_colors;
    led_on_fg_colors = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
    led_on_bg_colors = led_off_fg_colors;
    led_on_border_colors = led_off_border_colors;//led_on_fg_colors;

    SWITCHON_FGCOLOR = 'white';
    SWITCHON_BGCOLOR = '#0e0';
    SWITCHOFF_FGCOLOR = '#0e0';
    SWITCHOFF_BGCOLOR = '#028';
    //TODO: use switch border colors, and use them to not have invisible border around swithc in gray color scheme switch on
    SWITCHON_BORDERCOLOR = 'white';
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    BUSCOLORS = ['#666', '#665', '#656', '#566', '#556', '#565', '#655', '#555'];

    TEXTBGCOLOR = 'none';
    GATEBGCOLOR = '#228';

    LINKCOLOR = '#880';
    TITLECOLOR = TEXTFGCOLOR;
  } else {
    setColorScheme(index - 4);
    negateColorScheme(); // this only looks decent for inverting the 'light' color scheme.
  }
}

// warning: does not validate input
function normalizeCSSColor(css) {
  if(css == 'black') css = '#000000';
  if(css == 'white') css = '#ffffff';
  if(css == 'red') css = '#ff0000';
  if(css == 'green') css = '#00ff00';
  if(css == 'blue') css = '#0000ff';
  if(css.length == 4) {
    css = '#' + css[1] + css[1] + css[2] + css[2] + css[3] + css[3];
  }
  return css;
}

function negateColor(css) {
  css = normalizeCSSColor(css);
  var r = (255 - parseInt(css.substr(1, 2), 16)).toString(16);
  var g = (255 - parseInt(css.substr(3, 2), 16)).toString(16);
  var b = (255 - parseInt(css.substr(5, 2), 16)).toString(16);
  if(r.length == 1) r = '0' + r;
  if(g.length == 1) g = '0' + g;
  if(b.length == 1) b = '0' + b;
  return '#' + r + g + b;
}

function negateLigntness(css) {
  css = normalizeCSSColor(css);
  var r = parseInt(css.substr(1, 2), 16);
  var g = parseInt(css.substr(3, 2), 16);
  var b = parseInt(css.substr(5, 2), 16);
  var mm = Math.min(Math.min(r, g), b) + Math.max(Math.max(r, g), b);
  r = 255 - mm + r;
  g = 255 - mm + g;
  b = 255 - mm + b;
  var r = r.toString(16);
  var g = g.toString(16);
  var b = b.toString(16);
  if(r.length == 1) r = '0' + r;
  if(g.length == 1) g = '0' + g;
  if(b.length == 1) b = '0' + b;
  return '#' + r + g + b;
}

function negateColorScheme() {
  ONCOLOR = negateColor(ONCOLOR);
  OFFCOLOR = negateColor(OFFCOLOR);
  BGCOLOR = negateColor(BGCOLOR);
  TEXTFGCOLOR = negateColor(TEXTFGCOLOR);
  TEXTBGCOLOR = negateColor(TEXTBGCOLOR);
  for(var i = 0; i < led_off_fg_colors.length; i++) led_off_fg_colors[i] = negateLigntness(led_off_fg_colors[i]);
  for(var i = 0; i < led_off_bg_colors.length; i++) led_off_bg_colors[i] = negateLigntness(led_off_bg_colors[i]);
  for(var i = 0; i < led_off_border_colors.length; i++) led_off_border_colors[i] = negateLigntness(led_off_border_colors[i]);
  for(var i = 0; i < led_on_fg_colors.length; i++) led_on_fg_colors[i] = negateLigntness(led_on_fg_colors[i]);
  for(var i = 0; i < led_on_bg_colors.length; i++) led_on_bg_colors[i] = negateLigntness(led_on_bg_colors[i]);
  for(var i = 0; i < led_on_border_colors.length; i++) led_on_border_colors[i] = negateLigntness(led_on_border_colors[i]);
  for(var i = 0; i < BUSCOLORS.length; i++) BUSCOLORS[i] = negateColor(BUSCOLORS[i]);
  SWITCHON_FGCOLOR = negateLigntness(SWITCHON_FGCOLOR);
  SWITCHON_BGCOLOR = negateLigntness(SWITCHON_BGCOLOR);
  SWITCHOFF_FGCOLOR = negateLigntness(SWITCHOFF_FGCOLOR);
  SWITCHOFF_BGCOLOR = negateLigntness(SWITCHOFF_BGCOLOR);
  SWITCHON_BORDERCOLOR = negateLigntness(SWITCHON_BORDERCOLOR);
  SWITCHOFF_BORDERCOLOR = negateLigntness(SWITCHOFF_BORDERCOLOR);
  GATEBGCOLOR = negateColor(GATEBGCOLOR);
  LINKCOLOR = negateColor(LINKCOLOR);
  TITLECOLOR = negateColor(TITLECOLOR);
  TERMINALBGCOLOR = negateColor(TERMINALBGCOLOR);
  TERMINALFGCOLOR = negateColor(TERMINALFGCOLOR);
}

var colorscheme = getLocalStorage('color_scheme') || 0;


setColorScheme(colorscheme);



// I wanted to use CSS animation instead of this javascript solution, but it turns out the CSS animation uses extreme amount of CPU. So do with JS timer instead.
var globalSingleBlinkingCursor = null;
function registerBlinkingCursor(div) {
  if(div == globalSingleBlinkingCursor) return;

  if(globalSingleBlinkingCursor) {
    globalSingleBlinkingCursor.style.backgroundColor = TERMINALBGCOLOR;
  }

  var blink = function() {
    if(!globalSingleBlinkingCursor.parentNode) {
      globalSingleBlinkingCursor = null;
      return;
    }

    if(globalSingleBlinkingCursor.blinkOn) {
      globalSingleBlinkingCursor.style.backgroundColor = TERMINALBGCOLOR;
      globalSingleBlinkingCursor.blinkOn = false;
    } else {
      globalSingleBlinkingCursor.style.backgroundColor = TERMINALFGCOLOR;
      globalSingleBlinkingCursor.blinkOn = true;
    }

    window.setTimeout(blink, 500);
  };

  var initial = !globalSingleBlinkingCursor;
  globalSingleBlinkingCursor = div;
  if(initial) blink();
}

function getNewRenderer() {
  if(graphics_mode_actual == 0) {
    return new RendererText();
  } else if(graphics_mode_actual == 1) {
    return new RendererImg();
  }
}


var CLICKDEBUG = false;

function Cell() {
  this.symbol = ''; // the original parsed symbol from the text
  this.displaysymbol = ''; // the symbol that will be displayed for this cell (sometimes different than the text, e.g. ! gets hidden, ...)
  this.circuitsymbol = ''; // symbols that take part of circuits, does NOT include comments, numbers (those only alter circuit properties), ...
  this.metasymbol = ''; // like symbol, but comments get all replaced by '"' (use this to check for comment, or for number digits, instead of circuitsymbol)
  this.circuitextra = 0; // extra information in addition to circuitsymbol in some cases. For ^>v<m]w[ inputs: 0 = input reacting to devices on sides too, 1 = input not reacting to devices on sides, 2 = diagonal crossing input (diaginput). For 'g': if 1, is number (so connected to real g's, unlike g's which don't normally interact)
  this.skipparsing = false; // true for things that can be safely skipped for circuit-related parsing (false for any circuit as well as numbers)
  this.components = [null, null, null, null, null, null, null, null]; // components containing this cell (normally the first is used, but can be 2 for +, /, \, For TYPE_IC, up to 8 can be used, the index matching the output dir)
  this.comment = false;
  this.x = -1;
  this.y = -1;
  this.number = -1; //-1 means no number. For options, like LED color.
  this.numberv = -1; // number for vertical parse direction only
  this.numberh = -1; // number for horizontal parse direction only
  this.numbertype = NUMBER_NONE; // NOTE: this is set for numbers touching devices, and the touched device cells, but may NOT be set for all digits of a longer number. Only read at the device cells touching the number, unless specially handled (like for NUMBER_BUS).
  this.bus = null;
  this.defsubindex = -2; // define sub (capital I). >=-1 means it's part of a sub, indicated with a capital I and that number (-1 means no number - still to be distinguished from 0!)
  this.callsubindex = -2; // use sub (small i)
  this.callsub = null; // the CallSub
  this.commentalign = -1;
  this.commentlength = 0;
  this.antennax = -1; // horizontal matching antenna, if any
  this.antennay = -1; // vertical matching antenna, if any
  this.drawchip = false; // when drawing the 'i' of a chip in canvas mode, only do it if this is true, it indicates a good looking "core" cell for it (next to number, ...)

  this.renderer = null;
  this.clickFun = null;

  // Update the style based on current value in the component
  this.setValue = function(value) {
    if(this.circuitsymbol == 'b' || this.circuitsymbol == 'B') {
      var master = this.components[0];
      if(!master) return;
      if(master.master) master = master.master;
      var rom = master.rom;
      if(!rom) return;
      var co = rom.worddir ? (this.y - rom.y0) : (this.x - rom.x0);
      if(rom.wordlsbpos) co = rom.worddir ? (rom.y1 - this.y - 1) : (rom.x1 - this.x - 1);
      var index = rom.lines_inv[co];
      value = rom.selected[index]; // show which line is selected
    }

    if(digitmap[this.displaysymbol]/*this.circuitsymbol == '='*/) {
      // with buses, some digits light up in confusing ways, so
      // disable them altogether
      value = false;
    }

    if(this.circuitsymbol == 'T') {
      var master = this.components[0];
      if(!master) return;
      if(master.master) master = master.master;
      var vte = master.vte;
      if(!vte || !vte.text) return;
      var x = this.x - vte.x0;
      var y = this.y - vte.y0;
      var char = vte.text[y][x];
      var blink = (vte == activeVTE && x == vte.cursorx && y == vte.cursory);
      this.renderer.setTerminal(char, blink);
      return;
    }

    var type = this.components[0] ? this.components[0].type : TYPE_NULL;
    this.renderer.setValue(this, value, type);
  };

  this.markError = function(message) {
    //var errortext = 'parse error @ ' + this.x + ' ' + this.y + '(' + world[this.y][this.x].symbol + ')';
    //this.renderer.markError(this, errortext);
    //this.error = true;

    // this function looks unused!!!! it's for graphics effect. but the renderers already check component.
  };

  this.getErrorText = function() {
    if(this.components[0]) {
      var result = this.components[0].errormessage;
      if(!result && this.components[0].master) result = this.components[0].master.errormessage;
      return result;
    }
    return 'unknown error';
  }

  this.initDiv2 = function() {
    var c = this.circuitsymbol;
    var symbol = this.displaysymbol;
    var virtualsymbol = symbol;
    if((symbol == '#' || symbol == '$') && this.components[0]) {
      // TODO: use "typesymbols"
      if(this.components[0].type == TYPE_SWITCH_ON) virtualsymbol = 'S';
      if(this.components[0].type == TYPE_SWITCH_OFF) virtualsymbol = 's';
      if(this.components[0].type == TYPE_LED) virtualsymbol = 'l';
      if(this.components[0].type == TYPE_LED_RGB) virtualsymbol = 'L';
      if(this.components[0].type == TYPE_PUSHBUTTON_ON) virtualsymbol = 'P';
      if(this.components[0].type == TYPE_PUSHBUTTON_OFF) virtualsymbol = 'p';
      if(this.components[0].type == TYPE_TIMER_ON) virtualsymbol = 'R';
      if(this.components[0].type == TYPE_TIMER_OFF) virtualsymbol = 'r';
    }


    var title = null;
    if(!this.comment) {
      var tc = c;
      if(tc == '#' || tc == '$') tc = this.components[0].corecell.circuitsymbol;
      if(tc == '-' || tc == '|' || tc == '*') {
        title = 'wire. Shift+click to highlight.';
      }
      if(tc == 's' || tc == 'S') title = 'switch';
      if(tc == 'p' || tc == 'P') title = 'pushbutton';
      if(tc == 'r' || tc == 'R') title = 'timer';
      if(tc == 'l') title = 'LED';
      if(tc == 'L') title = 'RGB LED';
      if(tc == '?') title = 'random generator';
      if(tc == 'a') title = 'AND gate';
      if(tc == 'A') title = 'NAND gate';
      if(tc == 'o') title = 'OR gate';
      if(tc == 'O') title = 'NOR gate';
      if(tc == 'e') title = 'XOR gate';
      if(tc == 'E') title = 'XNOR gate';
      if(tc == 'c' || tc == 'C') {
        if(this.components[0] && this.components[0].type == TYPE_CONSTANT) {
          if(tc == 'c') title = 'constant off';
          if(tc == 'C') title = 'constant on';
        } else if(this.components[0] && this.components[0].type == TYPE_COUNTER) {
          if(tc == 'c') title = 'counter off';
          if(tc == 'C') title = 'counter on';
        } else {
          title = 'flipflop clock input';
        }
      }
      if(tc == 'd') {
        if(this.components[0] && this.components[0].type == TYPE_DELAY) {
          title = 'delay';
        } else {
          title = 'flipflop D input';
        }
      }
      if(tc == 'y') title = 'flipflop enable input';
      if(tc == 't') title = 'flipflop T input';
      if(tc == 'j') title = 'flipflop J input';
      if(tc == 'k') title = 'flipflop K input';
      if(tc == 'q') title = 'flipflop output and async set';
      if(tc == 'Q') title = 'flipflop inverted output and async reset';
      if(tc == 'z') title = 'tristate buffer, inputs to same z ANDed, multiple z to wire high when any z high (like OR but read on). Allowed to have multiple output to the same wire, but should be used as one-hot (max 1 high to wire, rest must be low) only to be electrically correct and realistic, but logicemu does not enforce that (does not emulate shorts).)';
      if(tc == 'Z') title = 'tristate buffer, inputs to same Z ORed, multiple Z to wire low when any Z low (like AND but read on). Allowed to have multiple output to the same wire, but should be used as one-cold (max 1 low to wire, rest must be high) only to be electrically correct and realistic, but logicemu does not enforce that (does not emulate shorts).)';
      if(tc == 'g') title = 'global (backplane) wire, connects to all other g with matching (or matching absense of) number';
      if(tc == '(') title = 'backplane wire that connects to one matching connector to the right';
      if(tc == ')') title = 'backplane wire that connects to one matching connector to the left';
      if(tc == 'n') title = 'backplane wire that connects to one matching connector to below';
      if(tc == 'u') title = 'backplane wire that connects to one matching connector to the top';
      if(tc == 'I') title = 'IC definition';
      if(tc == 'i') title = 'IC instance';
      if(tc == 'b' || tc == 'B') {
        title = 'ROM/RAM bit (b=0, B=1)';
        if(this.components[0]) {
          var master = this.components[0].master;
          var rom = master ? master.rom : this.components[0].rom;
          if(rom) {
            if(rom.ram && rom.array && rom.array[0]) {
              var numadr = rom.array.length;
              var width = rom.array[0].length;
              title = 'RAM with ' + numadr + ' ' + width + '-bit values (b=0, B=1). Note that the RAM may be bigger than the amount of bits shown, if so only the first lines are shown. Clicking bits with the mouse can toggle them.';
            }
            else if(rom.decoder) title = 'decoder (binary to unary)';
            else if(rom.encoder) title = 'encoder (unary to binary)';
            else if(rom.priority) title = 'priority selector (unary to unary)';
            else if(rom.array && rom.array[0]) {
              var numadr = rom.array.length;
              var width = rom.array[0].length;
              title = 'ROM with ' + numadr + ' ' + width + '-bit values (b=0, B=1). Clicking bits with the mouse can toggle them.';
            }
          }
        }
      }
      if(tc == '=') title = 'bus (wire bundle)';
      if(tc == 'M') {
        title = 'mux';
        var master = this.components[0].master;
        var mux = master ? master.mux : this.components[0].mux;
        if(mux) {
          if(mux.demux) {
            title = 'demux';
            if(mux.bussize > 1) title += ' of width-' + mux.bussize + ' buses';
            if(mux.bussize == 1 && mux.numdataout > 2) title = '' + mux.numdataout + '-output ' + title;
            title += '. ';
            var side0 = '';
            var side1 = '';
            if(!(mux.dataindir & 1) && mux.datainlsbpos) {side0 = 'right'; side1 = 'left';}
            if(!(mux.dataindir & 1) && !mux.datainlsbpos) {side0 = 'left'; side1 = 'right';}
            if((mux.dataindir & 1) && mux.datainlsbpos) {side0 = 'bottom'; side1 = 'top';}
            if((mux.dataindir & 1) && !mux.datainlsbpos) {side0 = 'top'; side1 = 'bottom';}
            title += 'Output 0 is at the ' + side0 + ', output ' + (mux.numdataout - 1) + ' is at the ' + side1;
          } else if(mux.swap) {
            title = 'controlled swap';
            if(mux.bussize > 1) title += ' of width-' + mux.bussize + ' buses';
          } else {
            title = 'mux';
            if(mux.bussize > 1) title += ' of width-' + mux.bussize + ' buses';
            if(mux.numselout > 0) title += ' (with selection passthrough)';
            if(mux.bussize == 1 && mux.numdatain > 2) title = '' + mux.numdatain + '-input ' + title;
            title += '. ';
            var side0 = '';
            var side1 = '';
            if(!(mux.dataindir & 1) && mux.datainlsbpos) {side0 = 'right'; side1 = 'left';}
            if(!(mux.dataindir & 1) && !mux.datainlsbpos) {side0 = 'left'; side1 = 'right';}
            if((mux.dataindir & 1) && mux.datainlsbpos) {side0 = 'bottom'; side1 = 'top';}
            if((mux.dataindir & 1) && !mux.datainlsbpos) {side0 = 'top'; side1 = 'bottom';}
            title += 'Input 0 is at the ' + side0 + ', input ' + (mux.numdatain - 1) + ' is at the ' + side1;
          }
          if(mux.numselin > 1) {
            title += '. ';
            var sellsbname = '';
            if(!(mux.selindir & 1) && mux.selinlsbpos) sellsbname = 'right';
            if(!(mux.selindir & 1) && !mux.selinlsbpos) sellsbname = 'left';
            if((mux.selindir & 1) && mux.selinlsbpos) sellsbname = 'bottom';
            if((mux.selindir & 1) && !mux.selinlsbpos) sellsbname = 'top';
            title += 'There are ' + mux.numselin + ' selection inputs and their LSB is at the ' + sellsbname;
          }
          /*title += ' DEBUG: ';
          title += ' demux: ' + mux.demux + '. ';
          title += ' swap: ' + mux.swap + '. ';
          title += ' bussize: ' + mux.bussize + '. ';
          title += ' numdatain: ' + mux.numdatain + '. ';
          title += ' numdataout: ' + mux.numdataout + '. ';
          title += ' numselin: ' + mux.numselin + '. ';
          title += ' numselout: ' + mux.numselout + '. ';*/
        }
      }
      if(tc == 'T') {
        title = 'terminal';
        if(this.components[0]) {
          var master = this.components[0].master;
          var vte = master ? master.vte : this.components[0].vte;
          if(vte) {
            if(vte.numinputs > 0 && !vte.counter) title += ' (with keyboard input)';
            if(vte.numoutputs > 0 && !vte.counter) title += ' (with ascii output)';
            if(vte.counter) title += ' (as counter)';
            if(vte.decimaldisplay && !vte.counter) title += ' (as decimal display)';
            if(vte.decimalinput && !vte.counter) title += ' (as decimal input)';
          }
        }
      }
    }

    this.renderer.init2(this, symbol, virtualsymbol, title);

    if(!this.comment) {
      // TODO: use component type instead?
      var pointer = (c == 's' || c == 'S' || c == 'p' || c == 'P' || c == 'r' || c == 'R' || c == 'b' || c == 'B');
      // currently cursor pointer not enabled for wires etc... that are part of the switch (even though pressing them actually works... but it would look a bit too messy)
      if((c == '#' || c == '$') && this.components[0]) {
        var type = this.components[0].type;
        if(type == TYPE_SWITCH_OFF || type == TYPE_SWITCH_ON || type == TYPE_PUSHBUTTON_OFF || type == TYPE_PUSHBUTTON_ON ||
           type == TYPE_TIMER_OFF || type == TYPE_TIMER_ON) {
           pointer = true;
        }
      }
      if(pointer) this.renderer.setCursorPointer();
    }
  };

  // must be called after components are parsed
  this.initDiv = function(x, y) {
    // do not make unneeded divs, large rendering speedup
    // make one on the last row though, if user added empty rows they want some scrolling space there
    if(this.displaysymbol == ' ' && !(x == 0 && y == h - 1)) return;

    if(this.renderer) {
      this.renderer.cleanup();
    }
    this.renderer = getNewRenderer();

    //clickFun
    var f = bind(function(component, x, y, e) {
      clearSelection(); // we allow selection of comments, but not of other items because it's annoying that selections appear when double clicking. However, do clear the comment selection if it happens to exist when clicking anything.
      e.stopPropagation();
      e.preventDefault();
      if(!changeMode) lastmousedowncomponent = component;
      if(AUTOUPDATE == 1/* || AUTOUPDATE == 3*/) update();
      if(component) component.mousedown(e, x, y);
      if(autopaused && isPaused() && !e.shiftKey) {
        // not done with shift key to not interfere with the 'highlight' feature that also uses pause and autopaused state
        unpause();
      }
      if(CLICKDEBUG) {
        console.log('===================');
        console.log('CLICKDEBUG enabled!');
        console.log('===================');
        var w = world[y][x];
        var s = 'x: ' + x + ', y: ' + y + ', circuitsymbol: ' + w.circuitsymbol;
        if(w.number >= -2) s += ', number: ' + w.number;
        console.log(s);
        if(w.antennax != -1 || w.antennay != -1) console.log('antennax: ' + w.antennax + ', antennay: ' + w.antennay);
        for(var i = 0; i < w.components.length; i++) {
          var compo = w.components[i];
          if(!compo) continue;
          console.log('component: index: ' + compo.index + ',  type: ' + compo.type + ', corecell: ' + compo.corecell.circuitsymbol + ', corecell.x: ' + compo.corecell.x + ', corecell.y: ' + compo.corecell.y);
          for(var j = 0; j < compo.inputs.length; j++) {
            var corecellinfo = (compo.inputs[j].corecell) ? (compo.inputs[j].corecell.circuitsymbol + ', corecell.x: ' + compo.inputs[j].corecell.x + ', corecell.y: ' + compo.inputs[j].corecell.y) : ('' + compo.inputs[j].corecell);
            console.log('input ' + j + ': index: ' +  compo.inputs[j].index + ', type: ' + compo.inputs[j].type + ', corecell: ' +  corecellinfo);
          }
        }

      }
      global_changed_something = true;
      return false;
    }, this.components[0], x, y);

    this.clickFun = f;

    this.renderer.init(this, x, y, f);
    this.initDiv2();
  };
}

function Renderer() {
  // one time initialization for all cells
  this.globalInit = function() {
  };

  // only needed if you redraw something different on existing cell, like when changing it to different type
  this.cleanup = function() {
  };

  // one time initialization for this cell
  this.init = function(cell, x, y, clickfun) {
  };

  // specific initialization, can be re-done if cell changed on click
  // symbol is what to display, virtualsymbol represents the type of the device
  // TODO: don't give virtualsymbol as a character but as a device type
  this.init2 = function(cell, symbol, virtualsymbol) {
  };

  this.markError = function(cell, errortext) {
  };

  this.setValue = function(cell, value, type) {
  };

  // for r or R of timer for example
  this.setLook = function(cell, type) {
  };

  this.setTerminal = function(char, blink) {
  };
}



function setTocHTML(toc, el) {
  el.innerText = '';
  var html = '';
  var j = 0;
  for(var i = 0; i < allRegisteredCircuits.length; i++) {
    if(toc == 1 && (allRegisteredCircuits[i].group != 0 /*|| allRegisteredCircuits[i].linkid == 'helpindex' || allRegisteredCircuits[i].linkid == introId*/)) continue;
    if(toc == 2 && allRegisteredCircuits[i].group == 0 && allRegisteredCircuits[i].linkid != 'helpindex' && allRegisteredCircuits[i].linkid != 'mainhelp') continue;
    //var div = makeDiv(0, (i * th), w * tw, th, el);
    var div = makeDiv(0, (j * th), tw, th, el);
    div.style.width = '800px';
    var span = makeElementAt('span', 0, 0, div);
    var id = allRegisteredCircuits[i].linkid;
    var circuit = allRegisteredCircuits[i].text;
    var title = allRegisteredCircuits[i].title;
    span.innerText = title;
    div.style.textAlign = 'left';
    if(allRegisteredCircuits[i].istitle/* == 1*/) {
      span.style.color = TITLECOLOR;
    } else {
      span.style.color = LINKCOLOR;
      span.style.textDecoration = 'underline';
      span.style.cursor = 'pointer';
      span.onclick = bind(function(circuit, title, id, index) {
        parseText(circuit, title, allRegisteredCircuits[index]);
        currentSelectedCircuit = index;
      }, circuit, title, id, i);
    }
    j++;
  }
}

// x, y must be pixel coordinates relative to worldDiv
function findNearestSwitch(x, y, x0, y0, x1, y1) {
  var bx0 = Math.floor(x0 / tw);
  var by0 = Math.floor(y0 / th);
  var bx1 = Math.ceil(x1 / tw);
  var by1 = Math.ceil(y1 / th);

  var bestdist = Infinity;
  var best = null;
  for(var by = by0; by < by1; by++) {
    for(var bx = bx0; bx < bx1; bx++) {
      if(bx < 0 || by < 0 || bx >= w || by >= h) continue;
      var cell = world[by][bx];
      var c = cell.circuitsymbol;
      if(c == 's' || c == 'S' || c == 'p' || c == 'P' || c == 'r' || c == 'R') {
        var cx = bx * tw + (tw >> 1);
        var cy = by * th + (th >> 1);
        var dx = cx - x;
        var dy = cy - y;
        var d = dx * dx + dy * dy;
        if(d < bestdist) {
          bestdist = d;
          best = cell;
        }
      }
    }
  }
  return best;
}

// For mouse zone extension around buttons
var AROUNDBUTTONRADIUS = 32;
var MAINZINDEX = 2;
var AROUNDZINDEX = 1;
var BGZINDEX = 0;

/** @implements Renderer */
function RendererText() {
  this.prevvalue = -1;
  this.prevchar = -1;
  this.div0 = null; // div for off style
  this.div1 = null; // div for on style
  this.init2done = false;
  this.clickDiv = null;

  this.globalInit = function() {
    document.body.style.backgroundColor = BGCOLOR;
    //worldDiv.style.zIndex = -50;

    //worldDiv.style.width = (tw * w) + 'px';
    //worldDiv.style.height = (th * h) + 'px';
    //worldDiv.style.border = '1px solid yellow';

    worldDiv.onmousedown = function(e) {
      var x = e.pageX - worldDiv.offsetLeft;
      var y = e.pageY - worldDiv.offsetTop;
      var button = findNearestSwitch(x, y, x - AROUNDBUTTONRADIUS - tw, y - AROUNDBUTTONRADIUS - th,
                                     x + AROUNDBUTTONRADIUS + tw, y + AROUNDBUTTONRADIUS + th);
      if(button) button.clickFun(e);

      /*e.stopPropagation();
      e.preventDefault();
      return false;*/
    };
  };

  this.cleanup = function() {
    removeElement(this.div0);
    removeElement(this.div1);
  };

  // one time initialization
  this.init = function(cell, x, y, clickfun) {
    this.div0 = makeDiv(x * tw, y * th, tw, th, worldDiv);
    this.div0.onmousedown = clickfun;

    if(cell.circuitsymbol != '"') {
      this.div1 = makeDiv(x * tw, y * th, tw, th, worldDiv);
      this.div1.onmousedown = clickfun;
    }

    var c = cell.circuitsymbol;
    if(c == 's' || c == 'S' || c == 'p' || c == 'P' || c == 'r' || c == 'R') {
      // This clickDiv is actually only used for mouse cursor graphic, the actual click event is set on worldDiv.
      var x0 = x * tw + (tw >> 1)- AROUNDBUTTONRADIUS - tw;
      var y0 = y * th + (th >> 1) - AROUNDBUTTONRADIUS - th;
      this.clickDiv = makeDiv(x0, y0, AROUNDBUTTONRADIUS * 2 + tw * 2, AROUNDBUTTONRADIUS * 2 + th * 2, worldDiv);
      this.clickDiv.style.zIndex = AROUNDZINDEX;
    } else {
      this.clickDiv = null;
    }
  };

  // specific initialization, can be re-done if cell changed on click
  this.init2 = function(cell, symbol, virtualsymbol, opt_title) {
    if(symbol == ' ') return;

    if (!this.init2done) {
      this.div0.style.color = OFFCOLOR;
      this.div0.style.textAlign = 'center';
      this.div0.style.fontSize = tw + 'px';
      this.div0.style.fontFamily = 'monospace';
      this.div0.style.backgroundColor = '';
      this.div0.style.zIndex = MAINZINDEX;

      if(this.div1) {
        this.div1.style.color = ONCOLOR;
        this.div1.style.textAlign = 'center';
        this.div1.style.fontSize = tw + 'px';
        this.div1.style.fontFamily = 'monospace';
        this.div1.style.fontWeight = 'bold';
        this.div1.style.backgroundColor = '';
        this.div1.style.zIndex = MAINZINDEX;
      }
    }

    if(!cell.comment) {
      // setting innerText is noticably faster than setting innerHTML!
      this.div0.innerText = symbol;
      this.div1.innerText = symbol;
    }

    if(cell.comment) {
      var fgcolor = TEXTFGCOLOR;
      var bgcolor = TEXTBGCOLOR;
      //this.div0.style.fontWeight = 'bold';

      this.div0.style.color = fgcolor;
      this.div0.style.backgroundColor = bgcolor;

      // no need to affect div1, it's never shown for comments

      // allow the text to go to the right
      if(cell.commentalign >= 0 && cell.commentalign <= 2) {
        this.div0.innerText = '';
        this.div0.style.backgroundColor = 'unset';
        // this span is there so that we can have the background color only over the text, not whitespace parts left or right
        var span0 = makeElement('span', this.div0);
        span0.innerText = symbol;
        span0.style.color = fgcolor;
        span0.style.backgroundColor = bgcolor;
        span0.style.whiteSpace = 'pre';
        //span0.style.fontSize = th + 'px';
        span0.style.fontSize = Math.floor(tw * 0.9) + 'px'; // avoids background overlapping parts of font issues
        span0.style.height = th + 'px';
        span0.style.lineHeight = th + 'px';
        span0.style.verticalAlign = 'top'; // make the span really go where I want it, not shifted slightly down
        this.div0.style.width = '' + (tw * cell.commentlength) + 'px';
        if(cell.commentalign == 0) this.div0.style.textAlign = 'left';
        else if(cell.commentalign == 1) this.div0.style.textAlign = 'center';
        else if(cell.commentalign == 2) this.div0.style.textAlign = 'right';
      } else {
        this.div0.innerText = symbol;
      }
      // allow text selection of those
      this.div0.onmousedown = null;
    } else if(symbol == 'toc') {
      setTocHTML(cell.circuitextra, this.div0);
    } else {
      if(virtualsymbol == 'l') {
        var color = cell.components[0] ? cell.components[0].number : 0;
        if(color == -1) color = 0;
        if(color > led_off_fg_colors.length) color = 0; // not more colors than that supported
        //this.div0.innerText = 'l';
        //this.div1.innerText = 'L';
        this.div0.style.color = led_off_fg_colors[color];
        this.div0.style.backgroundColor = led_off_bg_colors[color];
        this.div1.style.color = led_on_fg_colors[color];
        this.div1.style.backgroundColor = led_on_bg_colors[color];
      }
      if(virtualsymbol == 'L') {
        var color = 0;
        //this.div0.innerText = 'L';
        this.div0.style.color = '#888';
        this.div0.style.backgroundColor = '#888';
        this.div0.style.visibility = 'visible';
        // div 1 unused
        this.div1.style.visibility = 'hidden';
      }
      if(virtualsymbol == 's' || virtualsymbol == 'S') {
        this.div0.style.color = SWITCHOFF_FGCOLOR;
        this.div1.style.color = SWITCHON_FGCOLOR;
        this.div0.style.backgroundColor = SWITCHOFF_BGCOLOR;
        this.div1.style.backgroundColor = SWITCHON_BGCOLOR;
      }
      if(virtualsymbol == 'p' || virtualsymbol == 'P') {
        this.div0.style.color = SWITCHOFF_FGCOLOR;
        this.div1.style.color = SWITCHON_FGCOLOR;
        this.div0.style.backgroundColor = SWITCHOFF_BGCOLOR;
        this.div1.style.backgroundColor = SWITCHON_BGCOLOR;
      }
      if(virtualsymbol == 'r' || virtualsymbol == 'R') {
        this.div0.style.color = SWITCHOFF_FGCOLOR;
        this.div1.style.color = SWITCHON_FGCOLOR;
        this.div0.style.backgroundColor = SWITCHOFF_BGCOLOR;
        this.div1.style.backgroundColor = SWITCHON_BGCOLOR;
      }
      if(symbol == 'b' || symbol == 'B') {
        //this.div1.style.color = this.div0.style.color;
      }
      if(symbol == 'T') {
        this.div0.style.visibility = 'hidden';
        this.div1.style.visibility = 'visible';
        this.div1.style.backgroundColor = TERMINALBGCOLOR;
        this.div1.style.color = TERMINALFGCOLOR;
        this.div1.innerText = ' ';
        // The font characters are normally slightly bigger than a cell, but don't do that for the terminal, or bottom of letters gets obscured by the black cell below them, hiding bottom of j, underscores, etc
        this.div1.style.fontSize = Math.floor(tw * 0.9) + 'px';
      }
      if(symbol == '|') {
        // The | ascii character renders a bit low compared to others. Tweak that here. TODO: find better way to keep characters properly centered in their cell
        this.div0.style.marginTop = '-' + (th >> 2) + 'px';
        this.div1.style.marginTop = '-' + (th >> 2) + 'px';
      }
    }

    if(cell.components[0] && cell.components[0].error) {
      this.markError(cell, cell.getErrorText());
    } else if(opt_title) {
      this.div0.title = opt_title;
      this.div1.title = opt_title;
    }

    this.init2done = true;
  };

  this.markError = function(cell, errortext) {
    if (!errortext) {
      errortext = 'parse error @ ' + cell.x + ' ' + cell.y + '(' + cell.symbol + ')';
    }
    this.div0.style.backgroundColor = 'yellow';
    this.div1.style.backgroundColor = 'yellow';
    this.div0.style.color = 'red';
    this.div1.style.color = '#f88';
    this.div0.title = errortext;
    this.div1.title = errortext;
  };

  this.setCursorPointer = function() {
    this.div0.style.cursor = 'pointer';
    this.div1.style.cursor = 'pointer';
    if(this.clickDiv) this.clickDiv.style.cursor = 'pointer';
  };

  this.setValue = function(cell, value, type) {
    if(!this.div1) return; // e.g. if this is a comment (TODO: fix the fact that comment gets setValue at all, it should not be part of a component)
    if(type == TYPE_LED_RGB && (cell.circuitsymbol == 'L' || cell.circuitsymbol == '#' || cell.circuitsymbol == '$')) {
      value = cell.components[0].rgbcolor;
      if(value != this.prevvalue) {
        this.div0.style.color = rgb_led_fg_colors[value];
        this.div0.style.backgroundColor = rgb_led_bg_colors[value];
      }
    } else {
      if(value != this.prevvalue) { // changing visibility is slow in case of lots of elements, so only do if it changed
        if(value) {
          this.div0.style.visibility = 'hidden';
          this.div1.style.visibility = 'visible';
        } else {
          this.div0.style.visibility = 'visible';
          this.div1.style.visibility = 'hidden';
        }
      }
    }
    this.prevvalue = value;
  };

  this.setLook = function(cell, type) {
    /*
    For switch: user click toggles it between TYPE_SWITCH_ON and TYPE_SWITCH_OFF. The
    on type uses div1 and capital S, the off type uses div0 and small s. div1 comes with green bg, div0 with 'off' bg.
    In case switch has input component, then it can be of TYPE_SWITCH_ON but not output any signal.
    Then it will use capital S but div0.

    For pushbutton: idem

    For timer: same as with switch! It's still user click that toggles it between TYPE_TIMER_ON and TYPE_TIMER_OFF.
    It has 3 bits now: its type, the clock pulse, and in case it has input component, that input.
    The styles now are: type off: always small r, div0 (no bg). type on: capital R. div1 if outputting. div0 if clock
    pulse off or input off. Clock pulse never animates if user-off or if input-off.
    */
    if(type == TYPE_TIMER_ON || type == TYPE_TIMER_OFF) {
      var clocked = cell.components[0].clocked;
      var user = (type == TYPE_TIMER_ON);
      if(this.div0.innerText != 'R' && user) this.div0.innerText = 'R';
      if(this.div0.innerText != 'r' && !user) this.div0.innerText = 'r';
      if(this.div1.innerText != 'R' && user) this.div1.innerText = 'R';
      if(this.div1.innerText != 'r' && !user) this.div1.innerText = 'r';
    }
    if(type == TYPE_SWITCH_ON || type == TYPE_SWITCH_OFF) {
      var user = (type == TYPE_SWITCH_ON);
      if(this.div0.innerText != 'S' && user) this.div0.innerText = 'S';
      if(this.div0.innerText != 's' && !user) this.div0.innerText = 's';
      if(this.div1.innerText != 'S' && user) this.div1.innerText = 'S';
      if(this.div1.innerText != 's' && !user) this.div1.innerText = 's';
    }
    if(type == TYPE_PUSHBUTTON_ON || type == TYPE_PUSHBUTTON_OFF) {
      var user = (type == TYPE_PUSHBUTTON_ON);
      if(this.div0.innerText != 'P' && user) this.div0.innerText = 'P';
      if(this.div0.innerText != 'p' && !user) this.div0.innerText = 'p';
      if(this.div1.innerText != 'P' && user) this.div1.innerText = 'P';
      if(this.div1.innerText != 'p' && !user) this.div1.innerText = 'p';
    }
  };

  this.setTerminal = function(char, blink) {
    if(char == this.prevchar) return;
    this.div1.innerText = char;
    //blinking cursor for the active terminal
    if(blink) {
      //this.div1.style.animation = '1.5s blinker linear infinite';
      this.div1.innerText = '';
      registerBlinkingCursor(this.div1);
    }
    else if(this.div1.style.animation != undefined) this.div1.style.animation = undefined;
  };
}

// checks if neighbor at given direction from x,y is device
function hasDevice(x, y, dir) {
  var n = getNeighbor(x, y, dir);
  if(!n) return false;
  var c2 = world[n.y][n.x].circuitsymbol;
  return devicemap[c2] || c2 == '#' || c2 == '$';
}

// very similar to connected, but with a few tweaks for graphics.
// if connected to a % or & double corner and that double corner is not
// connected with its other end, returns false instead of true
function connected2g(x, y, dir) {
  if(!connected2(x, y, dir)) return false;
  if(dir > 3) return true;
  var n = getNeighbor(x, y, dir);
  if(n) {
    var x2 = n.x;
    var y2 = n.y;
    var c2 = world[y2][x2].circuitsymbol;
    var dir2 = -1;
    if(c2 == '&') dir2 = (dir == 0) ? 3 : ((dir == 1) ? 2 : ((dir == 2) ? 1 : 0));
    if(c2 == '%') dir2 = (dir == 0) ? 1 : ((dir == 1) ? 0 : ((dir == 2) ? 3 : 2));
    if(dir2 != -1 && !connected2(x2, y2, dir2)) return false;
    var n2 = getNeighbor(x2, y2, dir2);
    if(n2) {
      var x3 = n2.x;
      var y3 = n2.y;
      var c3 = world[y3][x3].circuitsymbol;
      var dir3 = -1;
      if(c3 == '&') dir3 = (dir2 == 0) ? 3 : ((dir2 == 1) ? 2 : ((dir2 == 2) ? 1 : 0));
      if(c3 == '%') dir3 = (dir2 == 0) ? 1 : ((dir2 == 1) ? 0 : ((dir2 == 2) ? 3 : 2));
      if(dir3 != -1 && !connected2(x3, y3, dir3)) return false;
    }
  }
  return true;
}

// another for graphics, treats middle cell as a 'g', for drawing split from it,
// for backplane wires and antennas. Connects to slightly less things than '*' would.
function connected2b(x, y, dir) {
  var temp = world[y][x].circuitsymbol;
  world[y][x].circuitsymbol = 'g';

  var result = connected2(x, y, dir);

  world[y][x].circuitsymbol = temp;

  return result;
}

// for canvas drawing of % and & and x without too much stray arms
function isInterestingComponent(cell, z) {
  if(!cell.components[z]) return false;
  if(cell.components[z].type == TYPE_NULL) return false;
  if(cell.components[z].type == TYPE_LOOSE_WIRE_IMPLICIT) return false;
  if(cell.components[z].type == TYPE_UNKNOWN_DEVICE) return false;
  return true;
}

// whether the neighbouring cell at given dir is part of the same device
function sameDevice(x, y, dir) {
  var n = getNeighbor(x, y, dir);
  if(!n) return false;
  var x2 = n.x;
  var y2 = n.y;
  var c = world[y][x].circuitsymbol;
  var c2 = world[y2][x2].circuitsymbol;
  if(c == 'M' && c2 == 'M') return true;
  if(c == 'i' && c2 == 'i') return true;
  if((c == 'b' || c == 'B') && (c2 == 'b' || c2 == 'B')) return true;
  /*if(c == 'c' && c2 == 'c') {
    return !!world[y][x].ff && (world[y][x].ff == world[y2][x2].ff);
  }
  if(ffmap[c] && ffmap[c2]) return true;*/
  if(ffmap[c] && ffmap[c2]) {
    var co1 = world[y][x].components[0];
    var co2 = world[y2][x2].components[0];
    var ff1 = co1.master ? co1.master.ff : co1.ff;
    var ff2 = co2.master ? co2.master.ff : co2.ff;
    return !!ff1 && ff1 == ff2;
  }
  if(devicemap[c] && devicemap[c2]) return false;
  //if(c == '#' || c2 == '#' || c == '$' || c2 == '$') return true;
  if((c == '#' || c == '$') && (devicemap[c2] || c2 == '#' || c2 == '$')) return true;
  if((c2 == '#' || c2 == '$') && (devicemap[c] || c == '#' || c == '$')) return true;
  return false;
}

/** @constructor */
function RendererDrawer() {
  this.tx = 0;
  this.ty = 0;

  // Both endpoints are inclusive (TODO: if translucent lines are desired, an option to make one endpoint exclusive must be added)
  this.drawLineCore_ = function(ctx, x0, y0, x1, y1) {
    var x0b = Math.floor(x0 * tw);
    var y0b = Math.floor(y0 * th);
    var x1b = Math.floor(x1 * tw);
    var y1b = Math.floor(y1 * th);

    if(USE_BRESENHAM) {
      // For non-diagonal lines, the canvas line drawing routine is reliable
      // enough to not be blurry (if used carefully such as with the 0.5's
      // below). So let's use that for those, assuming this is more efficient.
      if(x0b == x1b) {
        if(x0b == tw) { x0b--; x1b--; }
        ctx.moveTo(this.tx + x0b + 0.5, this.ty + y0b);
        ctx.lineTo(this.tx + x1b + 0.5, this.ty + y1b);
        return;
      } else if(y0b == y1b) {
        if(y0b == th) { y0b--; y1b--; }
        ctx.moveTo(this.tx + x0b, this.ty + y0b + 0.5);
        ctx.lineTo(this.tx + x1b, this.ty + y1b + 0.5);
        return;
      }

      // Update such that diagonal lines work as intended
      x0b = Math.floor(x0 * (tw - 1));
      y0b = Math.floor(y0 * (th - 1));
      x1b = Math.floor(x1 * (tw - 1));
      y1b = Math.floor(y1 * (th - 1));

      if(x1 - x0 == y0 - y1) {
        // ugly hack: only do this fix for antidiagonals on the main diagonal for now, as it shifts the ones of '%' in less nice way compared to alignemt with its straight segments
        if(x0 == 1.0 - y0) {
          // ensure to preserve the 45 degree angle (the rounding may break antidiagonals)
          x0b = Math.ceil(x0 * (tw - 1));
          y0b = Math.floor(y0 * (th - 1));
          x1b = Math.ceil(x1 * (tw - 1));
          y1b = Math.floor(y1 * (th - 1));
        }
      }

      var dxb = Math.abs(x1b - x0b);
      var dyb = Math.abs(y1b - y0b);
      var xinc0 = 0, xinc1 = 0, yinc0 = 0, yinc1 = 0, den, numinc;
      if(false && (x1 - x0 == y0 - y1)) {
        // special antidiagonal case
        xinc1 = (x1b >= x0b) ? 1 : -1;
        yinc0 = (y1b >= y0b) ? 1 : -1;
        den = dxb;
        numinc = dyb;
      } else if(dxb >= dyb) {
        // more horizontal
        xinc1 = (x1b >= x0b) ? 1 : -1;
        yinc0 = (y1b >= y0b) ? 1 : -1;
        den = dxb;
        numinc = dyb;
      } else {
        // more vertical
        xinc0 = (x1b >= x0b) ? 1 : -1;
        yinc1 = (y1b >= y0b) ? 1 : -1;
        den = dyb;
        numinc = dxb;
      }

      var num = (den >> 1);
      var numpixels = den;
      var x = x0b;
      var y = y0b;
      for(var i = 0; i <= numpixels; i++) {
        ctx.fillRect(this.tx + x, this.ty + y, 1, 1);
        num += numinc;
        if (num >= den) {
          num -= den;
          x += xinc0;
          y += yinc0;
        }
        x += xinc1;
        y += yinc1;
      }
      return;
    }

    // Non-bresenham version. Should not be used: The canvas is not a pixel
    // based drawing engine, and is unable to guarantee drawing diagonal lines
    // in non-antialiased way (even if it looks so in some browsers, it's not
    // guaranteed in others, and e.g. in Chrome as of 2018 it depends on the
    // canvas size whether it antialiases or goes for sharp pixels).

    // And to be clear: we do not want antialiased here as it does not look good
    // when connecting the multiple cell based pieces together. We want sharp
    // pixels that are either fully on or fully off, like the bresenham above
    // does.

    // the 0.5 makes line take up actual pixel rather than blurry multipixel
    // mess. Canvas is THAT kind of drawing engine :( the sub pixel blurry kind
    if(x0b == x1b) {
      if(x0b == tw) { x0b--; x1b--; }
      ctx.moveTo(this.tx + x0b + 0.5, this.ty + y0b);
      ctx.lineTo(this.tx + x1b + 0.5, this.ty + y1b);
    } else if(y0b == y1b) {
      if(y0b == th) { y0b--; y1b--; }
      ctx.moveTo(this.tx + x0b, this.ty + y0b + 0.5);
      ctx.lineTo(this.tx + x1b, this.ty + y1b + 0.5);
    } else {
      // likely blurry, at least in some browsers

      // if 45 degree line intended but the Math.floor above skewed it
      // make it exact 45 degree again: that renders better on pixels
      if(Math.abs(x1 - x0) == Math.abs(y1 - y0) && Math.abs(x1b - x0b) != Math.abs(y1b - y0b)) {
        /*var d = Math.max(Math.abs(x1b - x0b), Math.abs(y1b - y0b));
        x1b = (x1b > x0b) ? (x0b + d) : (x0b - d);
        y1b = (y1b > y0b) ? (y0b + d) : (y0b - d);*/
        x0b = x0 * tw;
        y0b = y0 * th;
        x1b = x1 * tw;
        y1b = y1 * th;
      }
      ctx.moveTo(this.tx + x0b, this.ty + y0b);
      ctx.lineTo(this.tx + x1b, this.ty + y1b);
    }
  };

  this.drawLine_ = function(ctx, x0, y0, x1, y1) {
    ctx.beginPath();
    this.drawLineCore_(ctx, x0, y0, x1, y1);
    ctx.stroke();
  };

  // arrow head will be at x1, y1
  this.drawArrowCore_ = function(ctx, x0, y0, x1, y1, opt_w) {
    var w = opt_w || 0.3;
    this.drawLineCore_(ctx, x0, y0, x1, y1);
    if(y0 == y1 && x1 > x0) {
      this.drawLineCore_(ctx, x1 - w, y1 - w, x1, y1);
      this.drawLineCore_(ctx, x1 - w, y1 + w, x1, y1);
    } else if(y0 == y1) {
      this.drawLineCore_(ctx, x1 + w, y1 - w, x1, y1);
      this.drawLineCore_(ctx, x1 + w, y1 + w, x1, y1);
    } else if(x0 == x1 && y1 > y0) {
      this.drawLineCore_(ctx, x1 - w, y1 - w, x1, y1);
      this.drawLineCore_(ctx, x1 + w, y1 - w, x1, y1);
    } else if(x0 == x1) {
      this.drawLineCore_(ctx, x1 - w, y1 + w, x1, y1);
      this.drawLineCore_(ctx, x1 + w, y1 + w, x1, y1);
    } else if(x1 > x0 && y1 > y0) {
      this.drawLineCore_(ctx, x1 - w, y1, x1, y1);
      this.drawLineCore_(ctx, x1, y1 - w, x1, y1);
    } else if(x1 > x0 && y1 < y0) {
      this.drawLineCore_(ctx, x1 - w, y1, x1, y1);
      this.drawLineCore_(ctx, x1, y1 + w, x1, y1);
    } else if(x1 < x0 && y1 > y0) {
      this.drawLineCore_(ctx, x1 + w, y1, x1, y1);
      this.drawLineCore_(ctx, x1, y1 - w, x1, y1);
    } else {
      this.drawLineCore_(ctx, x1 + w, y1, x1, y1);
      this.drawLineCore_(ctx, x1, y1 + w, x1, y1);
    }
  };

  // arrow head will be at x1, y1
  this.drawArrow_ = function(ctx, x0, y0, x1, y1, opt_w) {
    ctx.beginPath();
    this.drawArrowCore_(ctx, x0, y0, x1, y1, opt_w);
    ctx.stroke();
  };

  this.drawAntiArrowCore_ = function(ctx, x0, y0, x1, y1, opt_r) {
    var r = opt_r || 0.25;
    var d = r * 2;
    var d1 = d - 0.1; // just trying to make the line and circle join just right... see the 3-input logic gate circuit's one hot detector with diagonal anti-inputs
    if(y0 == y1 && x1 > x0) {
      this.drawCircleCore_(ctx, x1 - r, y1, r);
      this.drawLineCore_(ctx, x0, y0, x1 - d, y1);
    } else if(y0 == y1) {
      this.drawCircleCore_(ctx, x1 + r, y1, r);
      this.drawLineCore_(ctx, x0, y0, x1 + d, y1);
    } else if(x0 == x1 && y1 > y0) {
      this.drawCircleCore_(ctx, x1, y1 - r, r);
      this.drawLineCore_(ctx, x0, y0, x1, y1 - d);
    } else if(x0 == x1) {
      this.drawCircleCore_(ctx, x1, y1 + r, r);
      this.drawLineCore_(ctx, x0, y0, x1, y1 + d);
    } else if(x1 > x0 && y1 > y0) {
      this.drawCircleCore_(ctx, x1 - r, y1 - r, r);
      this.drawLineCore_(ctx, x0, y0, x1 - d1, y1 - d1);
    } else if(x1 > x0 && y1 < y0) {
      this.drawCircleCore_(ctx, x1 - r, y1 + r, r);
      this.drawLineCore_(ctx, x0, y0, x1 - d1, y1 + d1);
    } else if(x1 < x0 && y1 > y0) {
      this.drawCircleCore_(ctx, x1 + r, y1 - r, r);
      this.drawLineCore_(ctx, x0, y0, x1 + d1, y1 - d1);
    } else {
      this.drawCircleCore_(ctx, x1 + r, y1 + r, r);
      this.drawLineCore_(ctx, x0, y0, x1 + d1, y1 + d1);
    }
  };

  // this one has a circle instead of arrow head (for negated inputs)
  this.drawAntiArrow_ = function(ctx, x0, y0, x1, y1, opt_r) {
    ctx.beginPath();
    this.drawAntiArrowCore_(ctx, x0, y0, x1, y1, opt_r);
    ctx.stroke();
  };

  this.drawCircleCore_ = function(ctx, x, y, radius) {
    var xb = Math.floor(x * tw);
    var yb = Math.floor(y * th);
    var rb = Math.floor(radius * th);
    ctx.arc(this.tx + xb, this.ty + yb, rb, 0, Math.PI * 2, true);
  };

  this.drawCircle_ = function(ctx, x, y, radius) {
    ctx.beginPath();
    this.drawCircleCore_(ctx, x, y, radius);
    ctx.stroke();
  };

  this.drawArc_ = function(ctx, x, y, a0, a1, radius) {
    var xb = Math.floor(x * tw);
    var yb = Math.floor(y * th);
    var rb = Math.floor(radius * th);
    ctx.beginPath();
    ctx.arc(this.tx + xb, this.ty + yb, rb, Math.PI * 2 * a0, Math.PI * 2 * a1, false);
    ctx.stroke();
  };

  this.drawFilledCircle_ = function(ctx, x, y, radius) {
    var xb = Math.floor(x * tw);
    var yb = Math.floor(y * th);
    var rb = Math.floor(radius * th);
    ctx.beginPath();
    ctx.arc(this.tx + xb, this.ty + yb, rb, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
  };

  // for 'g' and antennas
  this.drawBGSplit_ = function(cell, ctx) {
    var num = 0;
    ctx.beginPath();
    if(connected2b(cell.x, cell.y, 0)) { num++; this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5); }
    if(connected2b(cell.x, cell.y, 1)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 1, 0.5); }
    if(connected2b(cell.x, cell.y, 2)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 0.5, 1); }
    if(connected2b(cell.x, cell.y, 3)) { num++; this.drawLineCore_(ctx, 0, 0.5, 0.5, 0.5); }
    if(connected2b(cell.x, cell.y, 4)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 1, 0); }
    if(connected2b(cell.x, cell.y, 5)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 1, 1); }
    if(connected2b(cell.x, cell.y, 6)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 0, 1); }
    if(connected2b(cell.x, cell.y, 7)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 0, 0); }
    ctx.stroke();
    return num;
  };

  // also returns amount of wires
  this.drawSplit_ = function(cell, ctx, num0) {
    var num = num0 || 0;
    ctx.beginPath();
    if(connected2g(cell.x, cell.y, 0)) { num++; this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5); }
    if(connected2g(cell.x, cell.y, 1)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 1, 0.5); }
    if(connected2g(cell.x, cell.y, 2)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 0.5, 1); }
    if(connected2g(cell.x, cell.y, 3)) { num++; this.drawLineCore_(ctx, 0, 0.5, 0.5, 0.5); }
    if(connected2g(cell.x, cell.y, 4)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 1, 0); }
    if(connected2g(cell.x, cell.y, 5)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 1, 1); }
    if(connected2g(cell.x, cell.y, 6)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 0, 1); }
    if(connected2g(cell.x, cell.y, 7)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 0, 0); }
    ctx.stroke();
    if(num >= 3) {
      ctx.fillRect(this.tx + (tw >> 1) - 1.5, this.ty + (th >> 1) - 1.5, 3.5, 3.5);
    }
    return num;
  };

  this.drawSplitDiag_ = function(cell, ctx, num0) {
    var num = 0;
    if(num0) num += num0;
    if(connected2g(cell.x, cell.y, 4)) { num++; this.drawLine_(ctx, 0.5, 0.5, 1, 0); }
    if(connected2g(cell.x, cell.y, 5)) { num++; this.drawLine_(ctx, 0.5, 0.5, 1, 1); }
    if(connected2g(cell.x, cell.y, 6)) { num++; this.drawLine_(ctx, 0.5, 0.5, 0, 1); }
    if(connected2g(cell.x, cell.y, 7)) { num++; this.drawLine_(ctx, 0.5, 0.5, 0, 0); }
    if(num >= 3) {
      ctx.fillRect(this.tx + (tw >> 1) - 1.5, this.ty + (th >> 1) - 1.5, 3.5, 3.5);
    }
    return num;
  };

  this.drawSplit_h_ = function(cell, ctx, num0) {
    var num = num0 || 0;
    ctx.beginPath();
    if(connected2g(cell.x, cell.y, 0) && isInterestingComponent(cell, 1)) { num++; this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5); }
    if(connected2g(cell.x, cell.y, 1) && isInterestingComponent(cell, 0)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 1, 0.5); }
    if(connected2g(cell.x, cell.y, 2) && isInterestingComponent(cell, 1)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 0.5, 1); }
    if(connected2g(cell.x, cell.y, 3) && isInterestingComponent(cell, 0)) { num++; this.drawLineCore_(ctx, 0, 0.5, 0.5, 0.5); }
    if(connected2g(cell.x, cell.y, 4) && isInterestingComponent(cell, 3)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 1, 0); }
    if(connected2g(cell.x, cell.y, 5) && isInterestingComponent(cell, 2)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 1, 1); }
    if(connected2g(cell.x, cell.y, 6) && isInterestingComponent(cell, 3)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 0, 1); }
    if(connected2g(cell.x, cell.y, 7) && isInterestingComponent(cell, 2)) { num++; this.drawLineCore_(ctx, 0.5, 0.5, 0, 0); }
    ctx.stroke();
    if(num >= 3) {
      ctx.fillRect(this.tx + (tw >> 1) - 1.5, this.ty + (th >> 1) - 1.5, 3.5, 3.5);
    }
  };

  // draws wire crossing only for wires connected on any side. Returns array with amount, and code indicating ('|' ? 1) + ('-' ? 2) + ('/' ? 4) + ('\' ? 8), e.g. 3 if it's a + without diagonals
  this.drawCrossing_ = function(cell, ctx) {
    var num = 0;
    var code = 0;
    if(connected2g(cell.x, cell.y, 0) || connected2g(cell.x, cell.y, 2)) { code |= 1; num++; }
    if(connected2g(cell.x, cell.y, 1) || connected2g(cell.x, cell.y, 3)) { code |= 2; num++; }
    if(connected2g(cell.x, cell.y, 4) || connected2g(cell.x, cell.y, 6)) { code |= 4; num++; }
    if(connected2g(cell.x, cell.y, 5) || connected2g(cell.x, cell.y, 7)) { code |= 8; num++; }

    var full = 0; // which one gets the full length
    if(code & 2) full = 2; // horizontal full looks best
    else if(code & 1) full = 1;
    else if(code & 4) full = 4;
    else full = 8;

    ctx.beginPath();
    if(code & 1) {
      if(full == 1) {
        this.drawLineCore_(ctx, 0.5, 0, 0.5, 1);
      } else {
        var shift = 0.2;
        this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
        this.drawLineCore_(ctx, 0.5, 0.5 + shift, 0.5, 1);
      }
    }
    if(code & 2) {
      if(full == 2) {
        this.drawLineCore_(ctx, 0, 0.5, 1, 0.5);
      } else {
        var shift = 0.2;
        this.drawLineCore_(ctx, 0, 0.5, 0.5 - shift + 0.1, 0.5);
        this.drawLineCore_(ctx, 0.5 + shift, 0.5, 1, 0.5);
      }
    }
    if(code & 4) {
      if(full == 4) {
        this.drawLineCore_(ctx, 0, 1, 1, 0);
      } else {
        this.drawLineCore_(ctx, 0, 1, 0.4, 0.6);
        this.drawLineCore_(ctx, 0.6, 0.4, 1, 0);
      }
    }
    if(code & 8) {
      if(full == 8) {
        this.drawLineCore_(ctx, 0, 0, 1, 1);
      } else {
        this.drawLineCore_(ctx, 0, 0, 0.4, 0.4);
        this.drawLineCore_(ctx, 0.6, 0.6, 1, 1);
      }
    }
    ctx.stroke();

    return [num, code];
  };

  // specifically made for dynamic rendering of the 4-way X crossing. Value and code use different bits.
  this.drawCrossing2_ = function(ctx, code, value, color0, color1) {
    var full = 0; // which one gets the full length
    if(code & 2) full = 2; // horizontal full looks best
    else if(code & 1) full = 1;
    else if(code & 4) full = 4;
    else full = 8;

    var color;

    color = (value & 2) ? color1 : color0;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    if(code & 1) {
      if(full == 1) {
        this.drawLineCore_(ctx, 0.5, 0, 0.5, 1);
      } else {
        var shift = 0.2;
        this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
        this.drawLineCore_(ctx, 0.5, 0.5 + shift, 0.5, 1);
      }
    }
    ctx.stroke();
    color = (value & 1) ? color1 : color0;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    if(code & 2) {
      if(full == 2) {
        this.drawLineCore_(ctx, 0, 0.5, 1, 0.5);
      } else {
        var shift = 0.2;
        this.drawLineCore_(ctx, 0, 0.5, 0.5 - shift + 0.1, 0.5);
        this.drawLineCore_(ctx, 0.5 + shift, 0.5, 1, 0.5);
      }
    }
    ctx.stroke();
    color = (value & 8) ? color1 : color0;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    if(code & 4) {
      if(full == 4) {
        this.drawLineCore_(ctx, 0, 1, 1, 0);
      } else {
        this.drawLineCore_(ctx, 0, 1, 0.4, 0.6);
        this.drawLineCore_(ctx, 0.6, 0.4, 1, 0);
      }
    }
    ctx.stroke();
    color = (value & 4) ? color1 : color0;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    if(code & 8) {
      if(full == 8) {
        this.drawLineCore_(ctx, 0, 0, 1, 1);
      } else {
        this.drawLineCore_(ctx, 0, 0, 0.4, 0.4);
        this.drawLineCore_(ctx, 0.6, 0.6, 1, 1);
      }
    }
    ctx.stroke();
  };

  this.fillBg_ = function(ctx, color) {
    var origStyle = ctx.fillStyle;
    ctx.fillStyle = color;
    ctx.fillRect(this.tx, this.ty, tw, th);
    if(origStyle != color) ctx.fillStyle = origStyle;
  };

  this.doDrawPlusDiagSplit_ = function(code, ctx) {
    var rect0 = false;
    var rect1 = false;
    var rect2 = false;
    var rect3 = false;

    ctx.beginPath();
    if(code & 2) {
      this.drawLineCore_(ctx, 0.5, 0, 1, 0);
      rect0 = true;
    }
    if(code & 4) {
      this.drawLineCore_(ctx, 1, 0.5, 1, 0);
      rect1 = true;
    }
    if(code & 16) {
      this.drawLineCore_(ctx, 0.5, 1, 1, 1);
      rect2 = true;
    }
    if(code & 8) {
      this.drawLineCore_(ctx, 1, 0.5, 1, 1);
      rect1 = true;
    }
    if(code & 32) {
      this.drawLineCore_(ctx, 0, 1, 0.5, 1);
      rect2 = true;
    }
    if(code & 64) {
      this.drawLineCore_(ctx, 0, 0.5, 0, 1);
      rect3 = true;
    }
    if(code & 1) {
      this.drawLineCore_(ctx, 0, 0, 0.5, 0);
      rect0 = true;
    }
    if(code & 128) {
      this.drawLineCore_(ctx, 0, 0.5, 0, 0);
      rect3 = true;
    }
    ctx.stroke();
    //if(rect0) ctx.fillRect(this.tx + (tw >> 1) - 1.5, this.ty + (th >> 1) - 1.5, 3.5, 3.5);
    if(rect0) ctx.fillRect(this.tx + (tw >> 1) - 1.5, this.ty + 0, 3.5, 3.5);
    if(rect1) ctx.fillRect(this.tx + tw - 4, this.ty + (th >> 1) - 1.5, 3.5, 3.5);
    if(rect2) ctx.fillRect(this.tx + (tw >> 1) - 1.5, this.ty + th - 4, 3.5, 3.5);
    if(rect3) ctx.fillRect(this.tx + 0, this.ty + (th >> 1) - 1.5, 3.5, 3.5);
  }

  /*
  The '+' wire crossing can still connect a particular one of its wires to a diagonal crossing input.
  The graphics for that are handled here.
  returns true if it drew a dot in the center
  This is an example where this happens (each switch has an input to a and one to e):

          a e
          ^^^
      s***+***>l
          *
          s
  */
  this.drawPlusDiagSplit_ = function(cell, ctx) {
    var cell;
    var code = 0;

    n = getNeighbor(cell.x, cell.y, 4);
    if(n && n.circuitextra == 2) {
      var c = n.circuitsymbol;
      if(c == '^' || c == 'm') {
        code |= 2;
      }
      if(c == '>' || c == ']') {
        code |= 4;
      }
    }
    n = getNeighbor(cell.x, cell.y, 5);
    if(n && n.circuitextra == 2) {
      var c = n.circuitsymbol;
      if(c == 'v' || c == 'w') {
        code |= 16;
      }
      if(c == '>' || c == ']') {
        code |= 8;
      }
    }
    n = getNeighbor(cell.x, cell.y, 6);
    if(n && n.circuitextra == 2) {
      var c = n.circuitsymbol;
      if(c == 'v' || c == 'w') {
        code |= 32;
      }
      if(c == '<' || c == '[') {
        code |= 64;
      }
    }
    n = getNeighbor(cell.x, cell.y, 7);
    if(n && n.circuitextra == 2) {
      var c = n.circuitsymbol;
      if(c == '^' || c == 'm') {
        code |= 1;
      }
      if(c == '<' || c == '[') {
        code |= 128;
      }
    }

    this.doDrawPlusDiagSplit_(code, ctx);

    return code;
  };
}

// Browsers have certain limits to canvas size (e.g. max 8192 pixels wide, ...), and for large
// circuits larger than 16384 height can easily be reached, so break it up into smaller pieces
function MultiCanvas() {
  if(USE_BRESENHAM) {
    this.MAX_S = 4096; // max size
  } else {
    // 4096 would be a great max size to use. However, Chrome (at least on my system) makes the
    // 45-degree diagonal lines horribly antialiased for large canvas, while for any canvas smaller than 256
    // it makes the diagonal lines like I want (= non smooth). So depending on this super brittle
    // trick now, until HTML gives reliable way to disable smoothing for lines on canvas in the future?
    this.MAX_S = 255; // max size
  }

  this.S = 0;

  this.canvases = null;
  this.contexts = null;

  this.w = 0;
  this.h = 0;

  this.make = function(x, y, w, h, parent) {
    this.S = Math.floor(this.MAX_S / tw) * tw; // such that size is multiple of cell size so there's no visible edges

    this.w = w;
    this.h = h;

    var numx = Math.ceil(w  / this.S);
    var numy = Math.ceil(h  / this.S);

    this.canvases = [];
    this.contexts = [];

    for(var y2 = 0; y2 < numy; y2++) {
      this.canvases[y2] = [];
      this.contexts[y2] = [];
      for(var x2 = 0; x2 < numx; x2++) {
        var h2 = Math.min(this.S, h - y2 * this.S);
        var w2 = Math.min(this.S, w - x2 * this.S);
        this.canvases[y2][x2] = makeAbsElement('canvas', x + x2 * this.S, y + y2 * this.S, w2, h2, parent);
        this.canvases[y2][x2].width = w2;
        this.canvases[y2][x2].height = h2;
        this.canvases[y2][x2].style.display = 'block';
        this.contexts[y2][x2] = this.canvases[y2][x2].getContext('2d');
      }
    }
  };

  this.remove = function() {
    if(!this.canvases) return;

    for(var y2 = 0; y2 < this.canvases.length; y2++) {
      for(var x2 = 0; x2 < this.canvases[y2].length; x2++) {
        removeElement(this.canvases[y2][x2]);
      }
    }
    this.canvases = null;
    this.contexts = null;
  };

  this.getCanvasAt = function(x, y) {
    var x2 = Math.floor(x / this.S);
    var y2 = Math.floor(y / this.S);
    return this.canvases[y2][x2];
  };

  this.getCanvasForCell = function(cell) {
    return this.getCanvasAt(cell.x * tw, cell.y * th);
  };

  this.getContextAt = function(x, y) {
    var x2 = Math.floor(x / this.S);
    var y2 = Math.floor(y / this.S);
    return this.contexts[y2][x2];
  };

  this.getContextForCell = function(cell) {
    return this.getContextAt(cell.x * tw, cell.y * th);
  };

  // how much must you add to your x co to draw to this canvas correctly (since it has its own corner)
  this.getXOffsetAt = function(x) {
    var x2 = Math.floor(x / this.S);
    return (-x2 * this.S) | 0;
  };

  this.getYOffsetAt = function(y) {
    var y2 = Math.floor(y / this.S);
    return (-y2 * this.S) | 0;
  };

  this.getXOffsetForCell = function(cell) {
    return this.getXOffsetAt(cell.x * tw);
  };

  this.getYOffsetForCell = function(cell) {
    return this.getYOffsetAt(cell.y * th);
  };

  // e.g. to set a CSS style on them
  this.forEach = function(fun) {
    for(var y2 = 0; y2 < this.canvases.length; y2++) {
      for(var x2 = 0; x2 < this.canvases[y2].length; x2++) {
        fun(this.canvases[y2][x2], this.contexts[y2][x2]);
      }
    }
  };
}

/** @constructor */
/* global info shared by renderer for every cell */
function RendererImgGlobal() {
  this.maincanvas = new MultiCanvas();
  this.offcanvas0 = new MultiCanvas();
  this.offcanvas1 = new MultiCanvas();
  this.extracanvas = new MultiCanvas();

  this.init = function() {
    var parent = worldDiv;

    this.maincanvas.remove();
    this.offcanvas0.remove();
    this.offcanvas1.remove();
    this.extracanvas.remove();

    this.maincanvas.make(0, 0, tw * w, th * h, parent);
    this.offcanvas0.make(0, 0, tw * w, th * h, parent);
    this.offcanvas1.make(0, 0, tw * w, th * h, parent);
    this.extracanvas.make(0, 0, tw * 128, th * 4, parent);

    this.offcanvas0.forEach(function(canvas, context) {
      canvas.style.display = 'none';
    });
    this.offcanvas1.forEach(function(canvas, context) {
      canvas.style.display = 'none';
    });
    this.extracanvas.forEach(function(canvas, context) {
      canvas.style.display = 'none';
    });

    // attempt at disabling antialiazing. It doesn't actually work, since
    // this does not apply to lines but image, but let's just tell the context
    // that we want non-AA in as many ways as possible
    this.maincanvas.forEach(function(canvas, context) {
      context.imageSmoothingEnabled = false;
    });
    this.offcanvas0.forEach(function(canvas, context) {
      context.imageSmoothingEnabled = false;
    });
    this.offcanvas1.forEach(function(canvas, context) {
      context.imageSmoothingEnabled = false;
    });
    this.extracanvas.forEach(function(canvas, context) {
      context.imageSmoothingEnabled = false;
    });
  };
}

function hasRealComponent(cell) {
  for(var i = 0; i < cell.components.length; i++) {
    if(!cell.components[i]) continue;
    var type = cell.components[i].type;
    if(type != TYPE_NULL && type != TYPE_LOOSE_WIRE_IMPLICIT) return true;
  }
  return false;
}

var rglobal = new RendererImgGlobal();

var NOUSETEXTMAP = {'-':true, '|':true, '*':true, '+':true, 'x':true, 'X':true,
                    '>':true, 'v':true, '<':true, '^':true, ']':true, 'w':true, '[':true, 'm':true,
                    'U':true, 'G':true, 'V':true, 'W':true}

var drawer = new RendererDrawer();

// TODO: Fix a few pixel leak through glitches because some things render a few pixels outside their cell.
/** @implements Renderer */
function RendererImg() { // RendererCanvas RendererGraphical RendererGraphics RendererImage
  this.fallback = new RendererText();

  this.canvas0 = null;
  this.canvas1 = null;
  this.ctx0 = null;
  this.ctx1 = null;
  this.prevvalue = null;
  this.usefallbackonly = false;
  this.usetext = true;
  this.init2done = false;
  this.text0 = null; // also used for clickfun, tooltip, ...
  this.text1 = null;
  this.tx = 0;
  this.ty = 0;
  // if false: avoid using the few fixed graphics from the 'extra' canvas for 2+ connection things if their graphics are too custom
  // if true: see the drawGlobalExtras_ function for more info
  this.drawextra = false;
  // what value must input match to use this extra graphic
  this.drawextrai0 = 0;
  this.drawextrai1 = 0;
  // x coordinate of this extra graphic
  this.drawextrag = 0;
   // if non-0, only use "on" drawing if a wire with that particular numerical direction is on
  this.drawonly = 0;
  this.dynamicdraw = false;
  this.dynamicdrawcode = 0;

  this.globalInit = function() {
    this.fallback.globalInit();
    rglobal.init();
    this.drawGlobalExtras_();
  };

  this.cleanup = function() {
    if(this.text0) {
      removeElement(this.text0);
      removeElement(this.text1);
    }
    this.fallback.cleanup();
  };

  // one time initialization
  this.init = function(cell, x, y, clickfun) {
    var c = cell.circuitsymbol;
    if(NOUSETEXTMAP[c]) {
      // optimization for those that don't need divs at all
      this.usetext = false;
    }
    if(this.usetext) this.fallback.init(cell, x, y, clickfun);
    this.tx = tw * cell.x + rglobal.offcanvas0.getXOffsetForCell(cell);
    this.ty = th * cell.y + rglobal.offcanvas0.getYOffsetForCell(cell);
    if(!cell.comment && cell.circuitsymbol != ' ') {
      this.canvas0 = rglobal.offcanvas0.getCanvasForCell(cell); //makeAbsElement('canvas', 0, 0, tw, th, doNotAddToParent/*this.fallback.div0*/);
      this.canvas1 = rglobal.offcanvas1.getCanvasForCell(cell); //makeAbsElement('canvas', 0, 0, tw, th, doNotAddToParent/*this.fallback.div1*/);
      this.ctx0 = rglobal.offcanvas0.getContextForCell(cell);
      this.ctx1 = rglobal.offcanvas1.getContextForCell(cell);
      if(this.usetext) {
        this.text0 = this.fallback.div0;
        this.text1 = this.fallback.div1;
      } else {
        // still need to make 1 div anyway (at least not 2) for the click function
        this.text0 = makeDiv(x * tw, y * th, tw, th, worldDiv);
        this.text0.onmousedown = clickfun;
      }
    }
  };


  // specific initialization, can be re-done if cell changed on click
  this.init2 = function(cell, symbol, virtualsymbol, opt_title) {
    if(!this.canvas0) {
      this.usefallbackonly = true;
      this.fallback.init2(cell, symbol, virtualsymbol, opt_title);
      return;
    }

    drawer.tx = this.tx;
    drawer.ty = this.ty;

    if(this.init2done) {
      this.ctx0.clearRect(0, 0, tw, th);
      this.ctx1.clearRect(0, 0, tw, th);
    }
    this.init2done = true;

    // BGCOLOR instead of transparent background
    // so that when using 'drawImage' to blit, it fully covers it rather than draw semitranslucent edges more and more over each other
    drawer.fillBg_(this.ctx0, BGCOLOR);
    drawer.fillBg_(this.ctx1, BGCOLOR);

    var fs = tw - 2;
    if (fs < 7) fs = 7;
    this.text0.style.color =  OFFCOLOR;
    this.text0.style.textAlign = 'center';
    this.text0.style.fontSize = fs + 'px';
    this.text0.style.fontFamily = 'monospace';
    this.text0.style.zIndex = MAINZINDEX;

    if(this.text1) {
      this.text1.style.color = ONCOLOR;
      this.text1.style.textAlign = 'center';
      this.text1.style.fontSize = fs + 'px';
      this.text1.style.fontFamily = 'monospace';
      this.text1.style.zIndex = MAINZINDEX;
    }

    this.ctx0.strokeStyle = OFFCOLOR;
    this.ctx1.strokeStyle = ONCOLOR;
    this.ctx0.fillStyle = OFFCOLOR;
    this.ctx1.fillStyle = ONCOLOR;
    //this.ctx0.lineWidth = 0.5;
    //this.ctx1.lineWidth = 0.5;
    this.ctx0.lineWidth = 1;
    this.ctx1.lineWidth = 1;
    var error = false;
    if(cell.components[0] && cell.components[0].error) {
      error = true;
      this.markError(cell, cell.getErrorText());
      drawer.fillBg_(this.ctx0, 'yellow');
      drawer.fillBg_(this.ctx1, 'yellow');
    } else if(opt_title) {
      this.text0.title = opt_title;
      if(this.text1) this.text1.title = opt_title;
    }
    var c = cell.circuitsymbol;
    // This avoids blurry lines that take up other amounts of pixels with lighter colors than desired
    //this.ctx0.translate(0.5, 0.5);
    //this.ctx1.translate(0.5, 0.5);
    for (var i = 0; i < 2; i++) {
      var ctx = (i == 0) ? this.ctx0 : this.ctx1;
      var canvas = (i == 0) ? this.canvas0 : this.canvas1;
      var textel = (i == 0) ? this.text0 : this.text1;

      // for big devices like IC and FlipFlop with multiple possible output values, it's
      // ugly if borders get different colors for 'on' and 'off' sub-parts of it, so set to
      // off (the letter character will still get on color)
      if(i == 1 && cell.components[0]) {
        var type = cell.components[0].type;
        if(type == TYPE_FLIPFLOP || type == TYPE_IC || type == TYPE_IC_PASSTHROUGH || type == TYPE_ROM || type == TYPE_MUX) {
          // only for the solid parts, wires part of this component must still use on color
          if(devicemap[c] || c == '#' || c == '$') {
            ctx.strokeStyle = OFFCOLOR;
            ctx.fillStyle = OFFCOLOR;
          }
        }
      }

      if(c == '-') {
        drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
        drawer.drawSplitDiag_(cell, ctx, 2);
      } else if(c == '|') {
        drawer.drawLine_(ctx, 0.5, 0, 0.5, 1);
        drawer.drawSplitDiag_(cell, ctx, 2);
      } else if(c == '/') {
        drawer.drawLine_(ctx, 0, 1, 1, 0);
      } else if(c == '\\') {
        drawer.drawLine_(ctx, 0, 0, 1, 1);
      } else if(c == 'x') {
        this.drawextra = isInterestingComponent(cell, 0) && isInterestingComponent(cell, 1);
        //drawer.drawLine_(ctx, 0, 0, 1, 1);
        if(isInterestingComponent(cell, 1) && !isInterestingComponent(cell, 0)) drawer.drawLine_(ctx, 0, 0, 1, 1);
        if(isInterestingComponent(cell, 1)) {
          drawer.drawLine_(ctx, 0, 0, 0.4, 0.4);
          drawer.drawLine_(ctx, 0.6, 0.6, 1, 1);
        }
        if(isInterestingComponent(cell, 0)) drawer.drawLine_(ctx, 0, 1, 1, 0);
      } else if(c == '+') {
        var code = drawer.drawPlusDiagSplit_(cell, ctx);
        var shift = 0.2;
        drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
        //drawer.drawLine(ctx, 0.5, 0, 0.5, 1);
        drawer.drawLine_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
        drawer.drawLine_(ctx, 0.5, 0.5 + shift, 0.5, 1);
        if(code == 0) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 0;
        }
        if(code == 1) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 24;
        }
        if(code == 2) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 25;
        }
        if(code == 4) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 26;
        }
        if(code == 8) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 27;
        }
        if(code == 16) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 28;
        }
        if(code == 32) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 29;
        }
        if(code == 64) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 30;
        }
        if(code == 128) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 31;
        }
      } else if(c == '*' || c == ',') {
        drawer.drawSplit_(cell, ctx);
      } else if(c == '^') {
        if(cell.circuitextra == 2) {
          var num = 0;
          if(hasDevice(cell.x, cell.y, 7)) { drawer.drawArrow_(ctx, 1, 1, 0, 0); num++; }
          if(hasDevice(cell.x, cell.y, 4)) { drawer.drawArrow_(ctx, 0, 1, 1, 0); num++; }
          if(num == 2) this.drawextra = true;
        } else {
          drawer.drawSplit_(cell, ctx, 1);
          drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 0);
        }
      } else if(c == '>') {
        if(cell.circuitextra == 2 && hasRealComponent(cell)) {
          var num = 0;
          if(hasDevice(cell.x, cell.y, 4)) { drawer.drawArrow_(ctx, 0, 1, 1, 0); num++; }
          if(hasDevice(cell.x, cell.y, 5)) { drawer.drawArrow_(ctx, 0, 0, 1, 1); num++; }
          if(num == 2) this.drawextra = true;
        } else {
          drawer.drawSplit_(cell, ctx, 1);
          drawer.drawArrow_(ctx, 0.5, 0.5, 1, 0.5);
        }
      } else if(c == 'v') {
        if(cell.circuitextra == 2 && hasRealComponent(cell)) {
          var num = 0;
          if(hasDevice(cell.x, cell.y, 6)) { drawer.drawArrow_(ctx, 1, 0, 0, 1); num++; }
          if(hasDevice(cell.x, cell.y, 5)) { drawer.drawArrow_(ctx, 0, 0, 1, 1); num++; }
          if(num == 2) this.drawextra = true;
        } else {
          drawer.drawSplit_(cell, ctx, 1);
          drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 1);
        }
      } else if(c == '<') {
        if(cell.circuitextra == 2 && hasRealComponent(cell)) {
          var num = 0;
          if(hasDevice(cell.x, cell.y, 7)) { drawer.drawArrow_(ctx, 1, 1, 0, 0); num++; }
          if(hasDevice(cell.x, cell.y, 6)) { drawer.drawArrow_(ctx, 1, 0, 0, 1); num++; }
          if(num == 2) this.drawextra = true;
        } else {
          drawer.drawSplit_(cell, ctx, 1);
          drawer.drawArrow_(ctx, 0.5, 0.5, 0, 0.5);
        }
      } else if(c == 'm') {
        if(cell.circuitextra == 2 && hasRealComponent(cell)) {
          var num = 0;
          if(hasDevice(cell.x, cell.y, 7)) { drawer.drawAntiArrow_(ctx, 1, 1, 0, 0); num++; }
          if(hasDevice(cell.x, cell.y, 4)) { drawer.drawAntiArrow_(ctx, 0, 1, 1, 0); num++; }
          if(num == 2) this.drawextra = true;
        } else {
          drawer.drawSplit_(cell, ctx, 1);
          drawer.drawAntiArrow_(ctx, 0.5, 0.5, 0.5, 0);
        }
      } else if(c == ']') {
        if(cell.circuitextra == 2 && hasRealComponent(cell)) {
          var num = 0;
          if(hasDevice(cell.x, cell.y, 4)) { drawer.drawAntiArrow_(ctx, 0, 1, 1, 0); num++; }
          if(hasDevice(cell.x, cell.y, 5)) { drawer.drawAntiArrow_(ctx, 0, 0, 1, 1); num++; }
          if(num == 2) this.drawextra = true;
        } else {
          drawer.drawSplit_(cell, ctx, 1);
          drawer.drawAntiArrow_(ctx, 0.5, 0.5, 1, 0.5);
        }
      } else if(c == 'w') {
        if(cell.circuitextra == 2 && hasRealComponent(cell)) {
          var num = 0;
          if(hasDevice(cell.x, cell.y, 6)) { drawer.drawAntiArrow_(ctx, 1, 0, 0, 1); num++; }
          if(hasDevice(cell.x, cell.y, 5)) { drawer.drawAntiArrow_(ctx, 0, 0, 1, 1); num++; }
          if(num == 2) this.drawextra = true;
        } else {
          drawer.drawSplit_(cell, ctx, 1);
          drawer.drawAntiArrow_(ctx, 0.5, 0.5, 0.5, 1);
        }
      } else if(c == '[') {
        if(cell.circuitextra == 2 && hasRealComponent(cell)) {
          var num = 0;
          if(hasDevice(cell.x, cell.y, 7)) { drawer.drawAntiArrow_(ctx, 1, 1, 0, 0); num++; }
          if(hasDevice(cell.x, cell.y, 6)) { drawer.drawAntiArrow_(ctx, 1, 0, 0, 1); num++; }
          if(num == 2) this.drawextra = true;
        } else {
          drawer.drawSplit_(cell, ctx, 1);
          drawer.drawAntiArrow_(ctx, 0.5, 0.5, 0, 0.5);
        }
      } else if(c == 'U') {
        var num = 0;
        if(hasDevice(cell.x, cell.y, 0)) {num++; drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 0, 0.19);}
        if(hasDevice(cell.x, cell.y, 1)) {num++; drawer.drawArrow_(ctx, 0.5, 0.5, 1, 0.5, 0.19);}
        if(hasDevice(cell.x, cell.y, 2)) {num++; drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 1, 0.19);}
        if(hasDevice(cell.x, cell.y, 3)) {num++; drawer.drawArrow_(ctx, 0.5, 0.5, 0, 0.5, 0.19);}
        drawer.drawSplit_(cell, ctx, num);
      } else if(c == 'G') {
        var num = 0;
        if(hasDevice(cell.x, cell.y, 0)) {num++; drawer.drawAntiArrow_(ctx, 0.5, 0.5, 0.5, 0);}
        if(hasDevice(cell.x, cell.y, 1)) {num++; drawer.drawAntiArrow_(ctx, 0.5, 0.5, 1, 0.5);}
        if(hasDevice(cell.x, cell.y, 2)) {num++; drawer.drawAntiArrow_(ctx, 0.5, 0.5, 0.5, 1);}
        if(hasDevice(cell.x, cell.y, 3)) {num++; drawer.drawAntiArrow_(ctx, 0.5, 0.5, 0, 0.5);}
        drawer.drawSplit_(cell, ctx, num);
      } else if(c == 'V') {
        drawer.drawSplit_h_(cell, ctx, -8);
        var code = 0;
        if(hasDevice(cell.x, cell.y, 0) && isInterestingComponent(cell, 1)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 0, 0.19); code |= 1; }
        if(hasDevice(cell.x, cell.y, 1) && isInterestingComponent(cell, 0)) { drawer.drawArrow_(ctx, 0.5, 0.5, 1, 0.5, 0.19); code |= 2; }
        if(hasDevice(cell.x, cell.y, 2) && isInterestingComponent(cell, 1)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 1, 0.19); code |= 4; }
        if(hasDevice(cell.x, cell.y, 3) && isInterestingComponent(cell, 0)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0, 0.5, 0.19); code |= 8; }
        if(hasDevice(cell.x, cell.y, 4) && isInterestingComponent(cell, 3)) { drawer.drawArrow_(ctx, 0.5, 0.5, 1, 0); code |= 16; }
        if(hasDevice(cell.x, cell.y, 5) && isInterestingComponent(cell, 2)) { drawer.drawArrow_(ctx, 0.5, 0.5, 1, 1); code |= 32; }
        if(hasDevice(cell.x, cell.y, 6) && isInterestingComponent(cell, 3)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0, 1); code |= 64; }
        if(hasDevice(cell.x, cell.y, 7) && isInterestingComponent(cell, 2)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0, 0); code |= 128; }
        if(code == 1) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 32;
        }
        if(code == 2) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 33;
        }
        if(code == 4) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 34;
        }
        if(code == 8) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 35;
        }
        if(code == 144) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 2;
        }
        if(code == 48) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 8;
          this.drawextrag = 3;
        }
        if(code == 96) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 8;
          this.drawextrag = 4;
        }
        if(code == 192) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 5;
        }
        if(code == 3) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 16;
        }
        if(code == 6) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 17;
        }
        if(code == 12) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 18;
        }
        if(code == 9) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 19;
        }
      } else if(c == 'W') {
        drawer.drawSplit_h_(cell, ctx, -8);
        var code = 0;
        // no "isInterestingComponent" checks for W, unlike V, because W can affect things, it's negating (for V any effect, like as AND input, is negated if it's a dummy, but not for W)
        if(hasDevice(cell.x, cell.y, 0)) { drawer.drawAntiArrow_(ctx, 0.5, 0.5, 0.5, 0); code |= 1; }
        if(hasDevice(cell.x, cell.y, 1)) { drawer.drawAntiArrow_(ctx, 0.5, 0.5, 1, 0.5); code |= 2; }
        if(hasDevice(cell.x, cell.y, 2)) { drawer.drawAntiArrow_(ctx, 0.5, 0.5, 0.5, 1); code |= 4; }
        if(hasDevice(cell.x, cell.y, 3)) { drawer.drawAntiArrow_(ctx, 0.5, 0.5, 0, 0.5); code |= 8; }
        if(hasDevice(cell.x, cell.y, 4)) { drawer.drawAntiArrow_(ctx, 0.5, 0.5, 1, 0); code |= 16; }
        if(hasDevice(cell.x, cell.y, 5)) { drawer.drawAntiArrow_(ctx, 0.5, 0.5, 1, 1); code |= 32; }
        if(hasDevice(cell.x, cell.y, 6)) { drawer.drawAntiArrow_(ctx, 0.5, 0.5, 0, 1); code |= 64; }
        if(hasDevice(cell.x, cell.y, 7)) { drawer.drawAntiArrow_(ctx, 0.5, 0.5, 0, 0); code |= 128; }
        if(code == 1) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 36;
        }
        if(code == 2) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 37;
        }
        if(code == 4) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 38;
        }
        if(code == 8) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 39;
        }
        if(code == 144) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 6;
        }
        if(code == 48) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 8;
          this.drawextrag = 7;
        }
        if(code == 96) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 8;
          this.drawextrag = 8;
        }
        if(code == 192) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 9;
        }
        if(code == 3) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 20;
        }
        if(code == 6) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 21;
        }
        if(code == 12) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 22;
        }
        if(code == 9) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 23;
        }
      } else if(c == 'X') {
        var a = drawer.drawCrossing_(cell, ctx);
        var code = a[1];
        if(code == 3) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 0;
        } else if(code == 12) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 1;
        } else if(code == 6) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 1;
          this.drawextrag = 12;
        } else if(code == 10) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 1;
          this.drawextrag = 13;
        } else if(code == 5) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 2;
          this.drawextrag = 14;
        } else if(code == 9) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 2;
          this.drawextrag = 15;
        } else {
          this.dynamicdraw = true;
          this.dynamicdrawcode = code;
        }
      } else if(c == '&') {
        var draw1 = connected2g(cell.x, cell.y, 0) && connected2g(cell.x, cell.y, 1) && isInterestingComponent(cell, 1);
        var draw0 = connected2g(cell.x, cell.y, 2) && connected2g(cell.x, cell.y, 3) && isInterestingComponent(cell, 0);
        if(draw0 && draw1) {
          var r = 0.3;
          drawer.drawLine_(ctx, 0, 0.5, r, 0.5);
          drawer.drawLine_(ctx, 0.5, 1, 0.5, 1 - r);
          drawer.drawLine_(ctx, r, 0.5, 0.5, 1 - r);
          drawer.drawLine_(ctx, 1, 0.5, 1 - r, 0.5);
          drawer.drawLine_(ctx, 0.5, 0, 0.5, r);
          drawer.drawLine_(ctx, 1 - r, 0.5, 0.5, r);
          this.drawextra = true;
        }
        else if(draw0) {
          drawer.drawLine_(ctx, 0.5, 0.5, 0, 0.5);
          drawer.drawLine_(ctx, 0.5, 0.5, 0.5, 1);
          this.drawonly = 1;
        }
        else if(draw1) {
          drawer.drawLine_(ctx, 0.5, 0.5, 1, 0.5);
          drawer.drawLine_(ctx, 0.5, 0.5, 0.5, 0);
          this.drawonly = 2;
        }
      } else if(c == '%') {
        var draw1 = connected2g(cell.x, cell.y, 0) && connected2g(cell.x, cell.y, 3) && isInterestingComponent(cell, 1);
        var draw0 = connected2g(cell.x, cell.y, 1) && connected2g(cell.x, cell.y, 2) && isInterestingComponent(cell, 0);
        if(draw0 && draw1) {
          var r = 0.3;
          drawer.drawLine_(ctx, 0, 0.5, r, 0.5);
          drawer.drawLine_(ctx, 0.5, 0, 0.5, r);
          drawer.drawLine_(ctx, r, 0.5, 0.5, r);
          drawer.drawLine_(ctx, 1, 0.5, 1 - r, 0.5);
          drawer.drawLine_(ctx, 0.5, 1, 0.5, 1 - r);
          drawer.drawLine_(ctx, 1 - r, 0.5, 0.5, 1 - r);
          this.drawextra = true;
        }
        else if(draw0) {
          drawer.drawLine_(ctx, 0.5, 0.5, 1, 0.5);
          drawer.drawLine_(ctx, 0.5, 0.5, 0.5, 1);
          this.drawonly = 1;
        }
        else if(draw1) {
          drawer.drawLine_(ctx, 0.5, 0.5, 0, 0.5);
          drawer.drawLine_(ctx, 0.5, 0.5, 0.5, 0);
          this.drawonly = 2;
        }
      } else if(antennamap[c]) {
        //drawer.fillBg_(ctx, ctx.fillStyle);
        //this.ctx0.strokeStyle = this.ctx0.fillStyle = BGCOLOR;
        drawer.drawBGSplit_(cell, ctx);
        if(c == ')') {
          //drawer.drawArc_(ctx, -0.3, 0.5, 0.75, 0.1, 0.8);
          drawer.drawArc_(ctx, 0.5, 0.5, 0.75, 0.25, 0.4);
          drawer.drawFilledCircle_(ctx, 0.5, 0.5, 0.3);
        } else if(c == '(') {
          //drawer.drawArc_(ctx, 1.3, 0.5, 0.4, 0.75, 0.8);
          drawer.drawArc_(ctx, 0.5, 0.5, 0.25, 0.75, 0.4);
          drawer.drawFilledCircle_(ctx, 0.5, 0.5, 0.3);
        } else if(c == 'u') {
          //drawer.drawArc_(ctx, 0.5, -0.3, 0.65, 0.35, 0.8);
          drawer.drawArc_(ctx, 0.5, 0.5, 0, 0.5, 0.4);
          drawer.drawFilledCircle_(ctx, 0.5, 0.5, 0.3);
        } else if(c == 'n') {
          //drawer.drawArc_(ctx, 0.5, 1.3, 0.65, 0.85, 0.8);
          drawer.drawArc_(ctx, 0.5, 0.5, 0.5, 0, 0.4);
          drawer.drawFilledCircle_(ctx, 0.5, 0.5, 0.3);
        }
      } else if(c == '=') {
        var bus = cell.bus;
        if(bus) {
          // color some buses slightly differently to allow to distinguish them visually
          var cc = (bus.index & 7);
          drawer.fillBg_(ctx, BUSCOLORS[cc]);
        }
        if(digitmap[symbol]) {
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = '' + tw + 'px serif';
          this.ctx0.strokeStyle = this.ctx0.fillStyle = BGCOLOR;
          ctx.fillText(symbol, drawer.tx + (tw >> 1), drawer.ty + (th >> 1));
        }
      } else if(c == 'T') {
        this.fallback.init2(cell, symbol, virtualsymbol); this.usefallbackonly = true; break;
      } else if(virtualsymbol == 'L') {
        this.fallback.init2(cell, symbol, virtualsymbol); this.usefallbackonly = true; break;
      } else if(virtualsymbol == 'g') {
        drawer.drawBGSplit_(cell, ctx);
        drawer.drawFilledCircle_(ctx, 0.5, 0.5, 0.4);
      } else if(cell.comment) {
        this.fallback.init2(cell, symbol, virtualsymbol); this.usefallbackonly = true; break;
      } else if(c == 'toc') {
        this.fallback.init2(cell, symbol, virtualsymbol); this.usefallbackonly = true; break;
      } else {
        var alreadybg = error;
        if(!error) {
          if(virtualsymbol == 's' || virtualsymbol == 'S' || virtualsymbol == 'p' || virtualsymbol == 'P' || virtualsymbol == 'r' || virtualsymbol == 'R') {
            alreadybg = true;
            drawer.fillBg_(ctx, i == 0 ? SWITCHOFF_BGCOLOR : SWITCHON_BGCOLOR);
            this.ctx0.strokeStyle = this.ctx0.fillStyle = SWITCHOFF_BORDERCOLOR;
            this.ctx1.strokeStyle = this.ctx1.fillStyle = SWITCHON_BORDERCOLOR;
            this.text0.style.color = SWITCHOFF_FGCOLOR;
            this.text1.style.color = SWITCHON_FGCOLOR;
          }
          if(virtualsymbol == 'l') {
            alreadybg = true;
            var color = cell.components[0] ? cell.components[0].number : 0;
            if(color == -1) color = 0;
            if(color > led_off_fg_colors.length) color = 0; // not more colors than that supported
            drawer.fillBg_(ctx, i == 0 ? led_off_bg_colors[color] : led_on_bg_colors[color]);

            this.ctx0.strokeStyle = this.ctx0.fillStyle = led_off_border_colors[color];
            this.ctx1.strokeStyle = this.ctx1.fillStyle = led_on_border_colors[color];
            this.text0.style.color = led_off_fg_colors[color];
            this.text1.style.color = led_on_fg_colors[color];
          }
          if(virtualsymbol == 'B') {
            // NOTE: this actually may make a loose B (not part of a component) invisible
            // since setValue, that actually copies it to the canvas, is never called, and
            // this makes the text color equal to the background color.
            // That's actually more like an error (it has no component), and it would be
            // not efficient to enforce drawing somehow, who ignored for now.
            alreadybg = true;
            drawer.fillBg_(ctx, textel.style.color);
            textel.style.color = BGCOLOR;
          }
        }
        if(devicemap[c] || c == '#' || c == '$') {
          if(!alreadybg) {
            drawer.fillBg_(ctx, GATEBGCOLOR);
          }
          if(c == '$') {
            // subtle (but large code) graphics effect: for $ cells, that don't connect to inputs or outputs,
            // draw a notch when there is an input or wire explicitely trying to connect to this, to show that
            // it ignores it (to make that clear to the viewer). Only for those where the other graphics doesn't
            // already show it, e.g. *'s already are obvious because they won't extend there line all the way to
            // the side.
            if(!sameDevice(cell.x, cell.y, 0)) {
              var n2 = getNeighbor(cell.x, cell.y, 0);
              var c2 = n2 ? n2.circuitsymbol : '';
              if(c == '$' && (c2 == '^' || c2 == 'v' || c2 == 'm' || c2 == 'w' || c2 == '|' || c2 == '+')) {
                drawer.drawLine_(ctx, 0, 0, 0.5, 0.25);
                drawer.drawLine_(ctx, 0.5, 0.25, 1, 0);
              } else {
                drawer.drawLine_(ctx, 0, 0, 1, 0);
              }
            }
            if(!sameDevice(cell.x, cell.y, 1)) {
              var n2 = getNeighbor(cell.x, cell.y, 1);
              var c2 = n2 ? n2.circuitsymbol : '';
              if(c == '$' && (c2 == '>' || c2 == '<' || c2 == ']' || c2 == '[' || c2 == '-' || c2 == '+')) {
                drawer.drawLine_(ctx, 1, 0, 0.75, 0.5);
                drawer.drawLine_(ctx, 0.75, 0.5, 1, 1);
              } else {
                drawer.drawLine_(ctx, 1, 0, 1, 1);
              }
            }
            if(!sameDevice(cell.x, cell.y, 2)) {
              var n2 = getNeighbor(cell.x, cell.y, 2);
              var c2 = n2 ? n2.circuitsymbol : '';
              if(c == '$' && (c2 == '^' || c2 == 'v' || c2 == 'm' || c2 == 'w' || c2 == '|' || c2 == '+')) {
                drawer.drawLine_(ctx, 0, 1, 0.5, 0.75);
                drawer.drawLine_(ctx, 0.5, 0.75, 1, 1);
              } else {
                drawer.drawLine_(ctx, 1, 1, 0, 1);
              }
            }
            if(!sameDevice(cell.x, cell.y, 3)) {
              var n2 = getNeighbor(cell.x, cell.y, 3);
              var c2 = n2 ? n2.circuitsymbol : '';
              if(c == '$' && (c2 == '>' || c2 == '<' || c2 == ']' || c2 == '[' || c2 == '-' || c2 == '+')) {
                drawer.drawLine_(ctx, 0, 0, 0.25, 0.5);
                drawer.drawLine_(ctx, 0.25, 0.5, 0, 1);
              } else {
                drawer.drawLine_(ctx, 0, 1, 0, 0);
              }
            }
          } else {
            // standard box drawing
            if(!sameDevice(cell.x, cell.y, 0)) drawer.drawLine_(ctx, 0, 0, 1, 0);
            if(!sameDevice(cell.x, cell.y, 1)) drawer.drawLine_(ctx, 1, 0, 1, 1);
            if(!sameDevice(cell.x, cell.y, 2)) drawer.drawLine_(ctx, 1, 1, 0, 1);
            if(!sameDevice(cell.x, cell.y, 3)) drawer.drawLine_(ctx, 0, 1, 0, 0);
          }
        }
        var okdraw = true;
        if(c == '#' || c == '$') okdraw = false;
        if(c == 'i' && !(cell.drawchip || digitmap[cell.metasymbol])) okdraw = false;
        if(okdraw) {
          /*ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = '' + tw + 'px serif';
          ctx.fillText(symbol, tw >> 1, th >> 1);*/
          textel.innerText = symbol;
        }
      }
    }

    // ensure that if this is a re-init (e.g. after clicking on a bB bit with mouse), it will actually draw the change, not do the optimization when nothing changed
    this.prevvalue = -1;
  };

  /*
  Some cell types can have multiple independent signals through them, like wire
  crossings. However, for most cell types, only two graphics are created: off and on.
  Some cell types can have 4 signals through them, giving up to 16 instead of 2 combinations.
  But it would be a bit too much to make 16 different full graphics planes, and render all
  those combinations.
  So instead, for a few very common cell types, we support up to 4 graphics, by adding two more
  here, such as a + with one leg gray and the other black and vice versa.
  */
  this.drawGlobalExtras_ = function() {
    var drawer = new RendererDrawer();

    rglobal.extracanvas.forEach(function(canvas, context) {
      context.strokeStyle = BGCOLOR;
      context.fillStyle = BGCOLOR;
      context.fillRect(0, 0, canvas.width, canvas.height);
    });

    var ctx;

    var prepareAt = function(x, y) {
      // multiplied by 2 because the tiles are currently spread out to avoid leaking
      var tx = x * tw * 2;
      var ty = y * th * 2;
      ctx = rglobal.extracanvas.getContextAt(tx, ty);
      drawer.tx = tx + rglobal.extracanvas.getXOffsetAt(tx);
      drawer.ty = ty + rglobal.extracanvas.getYOffsetAt(ty);
    };

    for(var i = 0; i < 2; i++) {
      var color0, color1;
      if(i == 0) {
        color0 = OFFCOLOR;
        color1 = ONCOLOR;
      } else {
        color0 = ONCOLOR;
        color1 = OFFCOLOR;
      }

      // leaving one gap open between each tile so that some border graphics don't overlap each other
      var ty = ((i == 0) ? 0 : 1);

      // '+'
      prepareAt(0, ty);
      var shift = 0.2;
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
      drawer.drawLine_(ctx, 0.5, 0.5 + shift, 0.5, 1);

      // 'x'
      prepareAt(1, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0, 0.4, 0.4);
      drawer.drawLine_(ctx, 0.6, 0.6, 1, 1);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0, 1, 1, 0);

      // 'diagonal crossing ^'
      prepareAt(2, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawArrow_(ctx, 1, 1, 0, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawArrow_(ctx, 0, 1, 1, 0);

      // 'diagonal crossing >'
      prepareAt(3, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawArrow_(ctx, 0, 1, 1, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawArrow_(ctx, 0, 0, 1, 1)

      // 'diagonal crossing v'
      prepareAt(4, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawArrow_(ctx, 1, 0, 0, 1);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawArrow_(ctx, 0, 0, 1, 1);

      // 'diagonal crossing <'
      prepareAt(5, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawArrow_(ctx, 1, 1, 0, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawArrow_(ctx, 1, 0, 0, 1);

      // 'diagonal crossing m'
      prepareAt(6, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, 1, 1, 0, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, 0, 1, 1, 0);

      // 'diagonal crossing ]'
      prepareAt(7, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, 0, 1, 1, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, 0, 0, 1, 1)

      // 'diagonal crossing w'
      prepareAt(8, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, 1, 0, 0, 1);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, 0, 0, 1, 1);

      // 'diagonal crossing ['
      prepareAt(9, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, 1, 1, 0, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, 1, 0, 0, 1);

      // '&'
      prepareAt(10, ty);
      var r = 0.3;
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, r, 0.5);
      drawer.drawLine_(ctx, 0.5, 1, 0.5, 1 - r);
      drawer.drawLine_(ctx, r, 0.5, 0.5, 1 - r);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 1, 0.5, 1 - r, 0.5);
      drawer.drawLine_(ctx, 0.5, 0, 0.5, r);
      drawer.drawLine_(ctx, 1 - r, 0.5, 0.5, r);

      // '%'
      prepareAt(11, ty);
      r = 0.3;
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, r, 0.5);
      drawer.drawLine_(ctx, 0.5, 0, 0.5, r);
      drawer.drawLine_(ctx, r, 0.5, 0.5, r);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 1, 0.5, 1 - r, 0.5);
      drawer.drawLine_(ctx, 0.5, 1, 0.5, 1 - r);
      drawer.drawLine_(ctx, 1 - r, 0.5, 0.5, 1 - r);

      // '-/-'
      prepareAt(12, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0, 1, 0.4, 0.6);
      drawer.drawLine_(ctx, 0.6, 0.4, 1, 0);

      // '-\-'
      prepareAt(13, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0, 0, 0.4, 0.4);
      drawer.drawLine_(ctx, 0.6, 0.6, 1, 1);

      // '| with /'
      prepareAt(14, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0.5, 0, 0.5, 1);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0, 1, 0.4, 0.6);
      drawer.drawLine_(ctx, 0.6, 0.4, 1, 0);

      // '| with \'
      prepareAt(15, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0.5, 0, 0.5, 1);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0, 0, 0.4, 0.4);
      drawer.drawLine_(ctx, 0.6, 0.6, 1, 1);

      // input crossing NE
      prepareAt(16, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawArrow_(ctx, 0.5, 1, 0.5, 0, 0.19);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawArrow_(ctx, 0, 0.5, 1, 0.5, 0.19);

      // input crossing ES
      prepareAt(17, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawArrow_(ctx, 0, 0.5, 1, 0.5, 0.19);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawArrow_(ctx, 0.5, 0, 0.5, 1, 0.19);

      // input crossing SW
      prepareAt(18, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawArrow_(ctx, 0.5, 0, 0.5, 1, 0.19);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawArrow_(ctx, 1, 0.5, 0, 0.5, 0.19);

      // input crossing WN
      prepareAt(19, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawArrow_(ctx, 1, 0.5, 0, 0.5, 0.19);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawArrow_(ctx, 0.5, 1, 0.5, 0, 0.19);

      // negated input crossing NE
      prepareAt(20, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, 0.5, 1, 0.5, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, 0, 0.5, 1, 0.5);

      // negated input crossing ES
      prepareAt(21, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, 0, 0.5, 1, 0.5);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, 0.5, 0, 0.5, 1);

      // negated input crossing SW
      prepareAt(22, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, 0.5, 0, 0.5, 1);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, 1, 0.5, 0, 0.5);

      // negated input crossing WN
      prepareAt(23, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, 1, 0.5, 0, 0.5);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, 0.5, 1, 0.5, 0);

      shift = 0.2;

      prepareAt(24, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
      drawer.drawLine_(ctx, 0.5, 0.5 + shift, 0.5, 1);
      drawer.doDrawPlusDiagSplit_(1, ctx);

      prepareAt(25, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
      drawer.drawLine_(ctx, 0.5, 0.5 + shift, 0.5, 1);
      drawer.doDrawPlusDiagSplit_(2, ctx);

      prepareAt(26, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
      drawer.doDrawPlusDiagSplit_(4, ctx);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
      drawer.drawLine_(ctx, 0.5, 0.5 + shift, 0.5, 1);

      prepareAt(27, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
      drawer.doDrawPlusDiagSplit_(8, ctx);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
      drawer.drawLine_(ctx, 0.5, 0.5 + shift, 0.5, 1);

      prepareAt(28, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
      drawer.drawLine_(ctx, 0.5, 0.5 + shift, 0.5, 1);
      drawer.doDrawPlusDiagSplit_(16, ctx);

      prepareAt(29, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
      drawer.drawLine_(ctx, 0.5, 0.5 + shift, 0.5, 1);
      drawer.doDrawPlusDiagSplit_(32, ctx);

      prepareAt(30, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
      drawer.doDrawPlusDiagSplit_(64, ctx);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
      drawer.drawLine_(ctx, 0.5, 0.5 + shift, 0.5, 1);

      prepareAt(31, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);
      drawer.doDrawPlusDiagSplit_(128, ctx);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
      drawer.drawLine_(ctx, 0.5, 0.5 + shift, 0.5, 1);

      // input crossing N
      prepareAt(32, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawArrow_(ctx, 0.5, 1, 0.5, 0, 0.19);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);

      // input crossing E
      prepareAt(33, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0.5, 1, 0.5, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawArrow_(ctx, 0, 0.5, 1, 0.5, 0.19);

      // input crossing S
      prepareAt(34, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawArrow_(ctx, 0.5, 0, 0.5, 1, 0.19);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);

      // input crossing W
      prepareAt(35, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0.5, 1, 0.5, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawArrow_(ctx, 1, 0.5, 0, 0.5, 0.19);

      // negated input crossing N
      prepareAt(36, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, 0.5, 1, 0.5, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);

      // negated input crossing E
      prepareAt(37, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0.5, 1, 0.5, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, 0, 0.5, 1, 0.5);

      // negated input crossing S
      prepareAt(38, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, 0.5, 0, 0.5, 1);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);

      // negated input crossing W
      prepareAt(39, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0.5, 1, 0.5, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, 1, 0.5, 0, 0.5);
    }
  };

  this.setValue = function(cell, value, type) {
    if(this.usefallbackonly) {
      this.fallback.setValue(cell, value, type);
      return;
    }

    if(value != this.prevvalue) { // changing visibility is slow in case of lots of elements, so only do if it changed
      var dest = rglobal.maincanvas.getContextForCell(cell);
      var offsetx = rglobal.maincanvas.getXOffsetForCell(cell);
      var offsety = rglobal.maincanvas.getYOffsetForCell(cell);
      var sx = offsetx + cell.x * tw;
      var sy = offsety + cell.y * th;
      var dx = offsetx + cell.x * tw;
      var dy = offsety + cell.y * th;
      var tweak = 0; // set to 1 to fix a few graphics are not perfectly aligned to the cell. This is a quick fix for that... TODO: this too gives issues. Fix all rendering above to let each symbol stay only inside of its own cell (not as easy as it seems near borders).
      var source;

      // for the X with its up to 16 possible graphics (and more if some legs are
      // not present), do dynamic drawing. Not done for other components because possibly slower.
      if(this.dynamicdraw) {
        drawer.tx = dx;
        drawer.ty = dy;
        drawer.drawCrossing2_(dest, this.dynamicdrawcode, value, OFFCOLOR, ONCOLOR);
        this.prevvalue = value;
        return;
      }

      if(value && this.drawonly) {
        value &= this.drawonly;
      }

      if(value) {
        if(this.usetext) {
          this.text0.style.visibility = 'hidden';
          if(this.text1) this.text1.style.visibility = 'visible';
        }
        source = rglobal.offcanvas1.getCanvasForCell(cell);
        if(this.drawextra) {
          var c = cell.circuitsymbol;
          var isextra = true;
          var qx, qy;
          if(c == 'x' && value == 1) { qx = 1;  qy = 0; }
          else if(c == 'x' && value == 2) { qx = 1;  qy = 1; }
          else if(c == '^' && value == 1) { qx = 2;  qy = 1; }
          else if(c == '^' && value == 2) { qx = 2;  qy = 0; }
          else if(c == '>' && value == 1) { qx = 3;  qy = 1; }
          else if(c == '>' && value == 2) { qx = 3;  qy = 0; }
          else if(c == 'v' && value == 1) { qx = 4;  qy = 0; }
          else if(c == 'v' && value == 2) { qx = 4;  qy = 1; }
          else if(c == '<' && value == 1) { qx = 5; qy = 0; }
          else if(c == '<' && value == 2) { qx = 5; qy = 1; }
          else if(c == 'm' && value == 1) { qx = 6; qy = 1; }
          else if(c == 'm' && value == 2) { qx = 6; qy = 0; }
          else if(c == ']' && value == 1) { qx = 7; qy = 1; }
          else if(c == ']' && value == 2) { qx = 7; qy = 0; }
          else if(c == 'w' && value == 1) { qx = 8; qy = 0; }
          else if(c == 'w' && value == 2) { qx = 8; qy = 1; }
          else if(c == '[' && value == 1) { qx = 9; qy = 0; }
          else if(c == '[' && value == 2) { qx = 9; qy = 1; }
          else if(c == '&' && value == 1) { qx = 10; qy = 1; }
          else if(c == '&' && value == 2) { qx = 10; qy = 0; }
          else if(c == '%' && value == 1) { qx = 11; qy = 0; }
          else if(c == '%' && value == 2) { qx = 11; qy = 1; }
          else isextra = false;
          if(c == 'X' || c == 'V' || c == 'W' || c == '+') {
            isextra = true;
            if(value == this.drawextrai0) { qx = this.drawextrag;  qy = 0; }
            else if(value == this.drawextrai1) { qx = this.drawextrag;  qy = 1; }
            else isextra = false;
          }
          if(isextra) {
            // multiplied by 2 because the tiles are currently spread out to avoid leaking
            qx *= 2;
            qy *= 2;
            var cx = tw * qx;
            var cy = th * qy;
            source = rglobal.extracanvas.getCanvasAt(cx, cy);
            tweak = 0;
            var sx = cx + rglobal.extracanvas.getXOffsetAt(cx);
            var sy = cy + rglobal.extracanvas.getYOffsetAt(cy);
          }
        }
      } else {
        if(this.usetext) {
          this.text0.style.visibility = 'visible';
          if(this.text1) this.fallback.div1.style.visibility = 'hidden';
        }
        source = rglobal.offcanvas0.getCanvasForCell(cell);
      }
      dest.drawImage(source, sx, sy, tw + tweak, th + tweak, dx, dy, tw + tweak, th + tweak);
    }
    this.prevvalue = value;
  };

  this.markError = function(cell, errortext) {
    if(this.usefallbackonly) {
      this.fallback.markError(cell, errortext);
    } else {
      //this.canvas0.style.backgroundColor = 'yellow';
      //this.canvas1.style.backgroundColor = 'yellow';
      this.ctx0.strokeStyle = 'red';
      this.ctx1.strokeStyle = '#f88';
      this.ctx0.fillStyle = 'red';
      this.ctx1.fillStyle = '#f88';
      this.text0.style.color = 'red';
      this.text0.title = errortext;
      if(this.usetext) {
        this.text1.style.color = '#f88';
        this.text1.title = errortext;
      }
    }
  };

  this.setCursorPointer = function() {
    this.fallback.setCursorPointer();
  };

  this.setLook = function(cell, type) {
    /* see the RendererText setLook function for comment about styles and types */
    if(type == TYPE_TIMER_ON || type == TYPE_TIMER_OFF) {
      var clocked = cell.components[0].clocked;
      var user = (type == TYPE_TIMER_ON);
      if(this.text0.innerText != 'R' && user) this.text0.innerText = 'R';
      if(this.text0.innerText != 'r' && !user) this.text0.innerText = 'r';
      if(this.text1.innerText != 'R' && user) this.text1.innerText = 'R';
      if(this.text1.innerText != 'r' && !user) this.text1.innerText = 'r';
    }
    if(type == TYPE_SWITCH_ON || type == TYPE_SWITCH_OFF) {
      var user = (type == TYPE_SWITCH_ON);
      if(this.text0.innerText != 'S' && user) this.text0.innerText = 'S';
      if(this.text0.innerText != 's' && !user) this.text0.innerText = 's';
      if(this.text1.innerText != 'S' && user) this.text1.innerText = 'S';
      if(this.text1.innerText != 's' && !user) this.text1.innerText = 's';
    }
    if(type == TYPE_PUSHBUTTON_ON || type == TYPE_PUSHBUTTON_OFF) {
      var user = (type == TYPE_PUSHBUTTON_ON);
      if(this.text0.innerText != 'P' && user) this.text0.innerText = 'P';
      if(this.text0.innerText != 'p' && !user) this.text0.innerText = 'p';
      if(this.text1.innerText != 'P' && user) this.text1.innerText = 'P';
      if(this.text1.innerText != 'p' && !user) this.text1.innerText = 'p';
    }
  };

  this.setTerminal = function(char, blink) {
    this.fallback.setTerminal(char, blink);
  };
}



document.body.onmouseup = function(e) {
  if(lastmousedowncomponent) {
    var didsomething = lastmousedowncomponent.mouseup(e);
    lastmousedowncomponent = null;
    if(didsomething && (AUTOUPDATE == 1/* || AUTOUPDATE == 3*/)) update();
  }
  global_changed_something = true;
};

var components = [];
var components_order = [];
var world = [];
var w = 0, h = 0;

// parsing optimization
var line0 = [];
var line1 = [];

function render() {
  if(highlightedcomponent) {
    renderHighlightComponent(highlightedcomponent);
    return;
  }
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      var cell = world[y][x];
      if(!cell.renderer) continue;
      var value = 0;
      if(cell.components[0]) value |= cell.components[0].value;
      if(cell.components[1]) value |= (cell.components[1].value << 1);
      if(cell.components[2]) value |= (cell.components[2].value << 2);
      if(cell.components[3]) value |= (cell.components[3].value << 3);
      if(cell.components[4]) value |= (cell.components[4].value << 4);
      if(cell.components[5]) value |= (cell.components[5].value << 5);
      if(cell.components[6]) value |= (cell.components[6].value << 6);
      if(cell.components[7]) value |= (cell.components[7].value << 7);
      cell.setValue(value);
    }
  }

  if(ticksCounterEl) updateTicksDisplay();
}

function renderHighlightComponent(component) {
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      var cell = world[y][x];
      if(!cell.renderer) continue;
      var value = 0;
      if(cell.components[0] == component) value |= 1;
      if(cell.components[1] == component) value |= (1 << 1);
      if(cell.components[2] == component) value |= (1 << 2);
      if(cell.components[3] == component) value |= (1 << 3);
      if(cell.components[4] == component) value |= (1 << 4);
      if(cell.components[5] == component) value |= (1 << 5);
      if(cell.components[6] == component) value |= (1 << 6);
      if(cell.components[7] == component) value |= (1 << 7);
      cell.setValue(value);
    }
  }

  if(ticksCounterEl) updateTicksDisplay();
}

global_changed_something = true;

function updateComponents(components) {
  // For AUTOUPDATE == 3, we can stop updates if nothing changed: the state became stable. This is not the same as a full pause. Timers, button clicks, ... will start the updates again
  // TODO: instead of doing this, stop the JS timer (autoupdateinterval) instead (and restart it when action like button or timer component happens with AUTOUPDATE == 3)
  if(AUTOUPDATE == 3 && !global_changed_something && numticks >= 0) {
    return;
  }

  var changed = false;
  for(var i = 0; i < components.length; i++) {
    components[i].changed = false;
    components[i].updated = false;
    components[i].prevvalue = components[i].value;
  }
  for(var i = 0; i < components.length; i++) {
    components[i].update();
    if(components[i].changed) changed = true;
  }

  if(!changed) global_changed_something = false;

  if(AUTOUPDATE != 3 || changed || numticks < 0) numticks++;
  render();
}

function update() {
  //console.log('update');
  if(UPDATE_ALGORITHM == 1) updateComponents(components_order);
  else updateComponents(components);
}

var timerticks = 0;

function toggleTimers() {
  var changed_something = false;
  for(var i = 0; i < components.length; i++) {
    if((components[i].type == TYPE_TIMER_OFF || components[i].type == TYPE_TIMER_ON) /*&& !components[i].paused*/) {
      var n = components[i].number;
      if(n == 0) n = 10; // 0 represents 10x
      if(n == -1) n = 5; // the default is half a second (total period is 1 second here by the way as it toggles per half second)
      if ((timerticks % n) == n - 1) {
        components[i].clocked = !components[i].clocked;
        changed_something = true;
      }
    }
  }
  if((AUTOUPDATE == 1/* || AUTOUPDATE == 3*/) && changed_something) update();
  if(changed_something) global_changed_something = true;
  timerticks++;
}

// must be called after (or at the end of) parseCells
function parseNumbers() {

  // .numbertype
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      var c = world[y][x].metasymbol;
      var type = NUMBER_NONE;
      if (c == '=') type = NUMBER_BUS;
      if (c == '"' && world[y][x].symbol == '"') type = NUMBER_COMMENT;
      if (c == 'l') type = NUMBER_LED;
      if (c == 'r' || c == 'R') type = NUMBER_TIMER;
      if (c == 'I') type = NUMBER_ICDEF;
      if (c == 'i') type = NUMBER_ICCALL;
      if (c == 'g') type = NUMBER_GLOBAL;
      // todo: rom corner (is diagonal, currently not handled in this code...)

      if (type != NUMBER_NONE) {
        for (var i = 0; i < 4; i++) {
          if(type == NUMBER_COMMENT && i != 3) continue;
          var x2 = x + ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
          var y2 = y + ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          var c2 = world[y2][x2].metasymbol;
          if (digitmap[c2] && type > world[y2][x2].numbertype) {
            world[y2][x2].numbertype = type;
          }
        }
      }
    }
  }
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      var c = world[y][x].metasymbol;
      if (!digitmap[c]) continue;
      var type = world[y][x].numbertype;
      if (type != NUMBER_NONE) {
        for (var i = 0; i < 4; i++) {
          var dx2 = (i == 1) ? 1 : ((i == 3) ? -1 : 0);
          var dy2 = (i == 0) ? -1 : ((i == 2) ? 1 : 0);
          var x2 = x + dx2;
          var y2 = y + dy2;
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          var c2 = world[y2][x2].metasymbol;
          if (type > world[y2][x2].numbertype) {
            world[y2][x2].numbertype = type;
          }
        }
      }
    }
  }

  // .number
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      var c = world[y][x].metasymbol;
      var dirs = [];
      var dx = 0, dy = 0;
      for(var i = 0; i < 4; i++) {
        var dx2 = (i == 1) ? 1 : ((i == 3) ? -1 : 0);
        var dy2 = (i == 0) ? -1 : ((i == 2) ? 1 : 0);
        var x2 = x + dx2;
        var y2 = y + dy2;
        if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
        if(world[y2][x2].comment) continue; // comments metasymbol can be number for the aligned strings...
        var c2 = world[y2][x2].metasymbol;
        if(digitmap[c2]) {
          dirs.push(i);
        }
      }
      for(var i = 0; i < dirs.length; i++) {
        var dir = dirs[i];
        var dx = (dir == 1) ? 1 : ((dir == 3) ? -1 : 0);
        var dy = (dir == 0) ? -1 : ((dir == 2) ? 1 : 0);
        var x2 = x;
        var y2 = y;
        var value = 0;
        var mul = 1;
        for(;;) {
          x2 += dx;
          y2 += dy;
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) break;
          var c2 = world[y2][x2].metasymbol;
          if(digitmap[c2]) {
            if(dir == 0 || dir == 3) {
              // make numbers always left-to-right or top-to-bottom
              value += mul * parseInt(c2);
              mul *= 10;
            } else {
              value *= 10;
              value += parseInt(c2);
            }
            if(c == 'i') world[y2][x2].circuitsymbol = '#'; // for TYPE_IC, the numbers are part of the component
          } else {
            break;
          }
        }
        if(i > 0 && value != world[y][x].number) {
          world[y][x].number = -1;
          break; // multiple numbers with different values not supported
        }
        world[y][x].number = value;
      }
    }
  }

  // .numberh
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(world[y0][x0].skipparsing) continue;
      var x2 = x0;
      var y2 = y0;
      var value = 0;
      for(;;) {
        if(x2 >= w) break;
        var c2 = world[y2][x2].metasymbol;
        if(digitmap[c2]) {
          value *= 10;
          value += parseInt(c2);
        } else {
          break;
        }
        x2++;
      }
      if(x0 != x2) {
        for(var x = x0 - 1; x < x2 + 1; x++) {
          if(x < 0 || x >= w) continue;
          world[y0][x].numberh = value;
        }
        x0 = x2;
      }
    }
  }

  // .numberv
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(world[y0][x0].skipparsing) continue;
      if(world[y0][x0].numberv >= 0) continue; // already done
      var x2 = x0;
      var y2 = y0;
      var value = 0;
      for(;;) {
        if(y2 >= h) break;
        var c2 = world[y2][x2].metasymbol;
        if(digitmap[c2]) {
          value *= 10;
          value += parseInt(c2);
        } else {
          break;
        }
        y2++;
      }
      if(y0 != y2) {
        for(var y = y0 - 1; y < y2 + 1; y++) {
          if(y < 0 || y >= h) continue;
          world[y][x0].numberv = value;
        }
      }
    }
  }


  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      if(digitmap[world[y][x].metasymbol]) {
        world[y][x].number = Math.max(world[y][x].numberh, world[y][x].numberv);
      }
    }
  }
}

// performance log debug log debuglog
var PERFORMANCELOGENABLED = false;
var PERFSTART = 0;

function logPerformance(text) {
  if(!PERFORMANCELOGENABLED) return;

  var t = (new Date()).getTime();
  var d = t - PERFSTART;

  console.log('@' + d + ': ' + text);
}
function startLogPerformance() {
  PERFSTART = (new Date()).getTime();
}

// should be called asap after parseCells, everything else that has neighbors will depend on this
function parseAntennas() {
  logPerformance('parseAntennas start');

  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      var c = world[y][x].circuitsymbol;

      if(c == '(') {
        var count = 1;
        var yb = y;
        for(var xb = x + 1; xb < w; xb++) {
          if(world[yb][xb].circuitsymbol == ')') {
            count--;
            if(count != 0) continue;
            world[y][x].antennax = xb;
            world[y][xb].antennax = x;
            break;
          }
          if(world[yb][xb].circuitsymbol == '(') {
            count++;
          }
        }
      }

      if(c == 'n') {
        var count = 1;
        var xb = x;
        for(var yb = y + 1; yb < h; yb++) {
          if(world[yb][xb].circuitsymbol == 'u') {
            count--;
            if(count != 0) continue;
            world[y][x].antennay = yb;
            world[yb][x].antennay = y;
            break;
          }
          if(world[yb][xb].circuitsymbol == 'n') {
            count++;
          }
        }
      }
    }
  }
  logPerformance('parseAntennas done');
}

// get neighbor, or if antenna, warps to position on other side
// returns 'wc': "world cell"
// dir: 0=N, 1=E, 2=S, 3=W ; 4=NE, 5=SE, 6=SW, 7=NW
function getNeighbor(x, y, dir) {
  var x2 = x + ((dir == 1 || dir == 4 || dir == 5) ? 1 : ((dir == 3 || dir == 6 || dir == 7) ? -1 : 0));
  var y2 = y + ((dir == 0 || dir == 4 || dir == 7) ? -1 : ((dir == 2 || dir == 5 || dir == 6) ? 1 : 0));
  if(x2 < 0 || x2 >= w) return null;
  if(y2 < 0 || y2 >= h) return null;

  // antenna stuff
  var dx = x2 - x;
  var dy = y2 - y;
  var wca = world[y2][x2];
  if(dir < 4) {
    if(wca.antennax != -1) {
      x2 = wca.antennax + dx;
      y2 += dy;
      if(x2 < 0 || x2 >= w) return null;
      if(y2 < 0 || y2 >= h) return null;
    }
    else if(wca.antennay != -1) {
      x2 += dx;
      y2 = wca.antennay + dy;
      if(x2 < 0 || x2 >= w) return null;
      if(y2 < 0 || y2 >= h) return null;
    }
  } else {
    var wcb = world[y][x2];
    var wcc = world[y2][x];
    var antennaa = wca.antennax != -1 || wca.antennay != -1;
    var antennab = wcb.antennax != -1 || wcb.antennay != -1;
    var antennac = wcc.antennax != -1 || wcc.antennay != -1;
    //   ca  b/  ac  \b
    //   /b  ac  b\  ca
    if(antennaa || antennab || antennac) {
      // aimed at us or aimed away from us?
      var aimb = (x > x2 && wcb.antennax > x2) || (x < x2 && wcb.antennax < x2);
      var aimc = (y > y2 && wcc.antennay > y2) || (y < y2 && wcc.antennay < y2);
      if(antennaa && antennab && !antennac && wca.antennax != -1 && wca.antennax == wcb.antennax) {
        x2 = wca.antennax + dx;
        if(x2 < 0 || x2 >= w) return null;
      }
      else if(antennaa && antennac && !antennab && wca.antennay != -1 && wca.antennay == wcc.antennay) {
        y2 = wca.antennay + dy;
        if(y2 < 0 || y2 >= h) return null;
      }
      else if(antennab && antennac && aimb && aimc) {

        var ok = true;
        //   c   e
        //   n   n
        // b(     )b'
        //
        // d(     )d'
        //   u   u
        //   c'  e'

        var wcd = world[wcc.antennay + (wcc.antennay > y2 ? -1 : 1)][x2];
        var wce = world[y2][wcb.antennax + (wcb.antennax > x2 ? -1 : 1)];
        if(wcd.antennax != wcb.antennax) ok = false;
        if(wce.antennay != wcc.antennay) ok = false;
        if(ok) {
          x2 = wcb.antennax + dx;
          y2 = wcc.antennay + dy;
         if(x2 < 0 || x2 >= w) return null;
         if(y2 < 0 || y2 >= h) return null;
        }
      } else if(antennaa && !antennab && !antennac) {
        // case for simple single antenna (or invalid combination of multiple)
        // we must check if it's symmetric, and also only a single antenna is on the
        // other side, otherwise different neighbor may be parsed on different sides!
        if(wca.antennax != -1) {
          var x3 = wca.antennax + dx;
          var y3 = y2 + dy;
          if(x3 < 0 || x3 >= w) return null;
          if(y3 < 0 || y3 >= h) return null;
          var wcd = world[y3][wca.antennax];
          var wce = world[wca.y][x3];
          if(wcd.antennax == -1 && wcd.antennay == -1 && wce.antennax == -1 && wce.antennay == -1) {
            x2 = x3;
            y2 = y3;
          }
        }
        else if(wca.antennay != -1) {
          var x3 = x2 + dx;
          var y3 = wca.antennay + dy;
          if(x3 < 0 || x3 >= w) return null;
          if(y3 < 0 || y3 >= h) return null;
          var wcd = world[y3][wca.x];
          var wce = world[wca.antennay][x3];
          if(wcd.antennax == -1 && wcd.antennay == -1 && wce.antennax == -1 && wce.antennay == -1) {
            x2 = x3;
            y2 = y3;
          }
        }
      }
    }
  }

  return world[y2][x2];
}

function getOppositeDir(dir) {
  return (dir ^ 2);
}

// parse the individual world cells from the text
function parseCells(text) {
  world = [];
  logPerformance('parseCells start');
  var lines = text.split('\n');
  h = lines.length;
  w = 1;
  for(var i = 0; i < lines.length; i++) w = Math.max(w, lines[i].length);

  for(var y = 0; y < h; y++) {
    world[y] = [];
    var comment = false;
    var commentalign = -1;
    var thincommentcell = null;
    line0[y] = 0;
    line1[y] = 0;
    var line0inited = false;
    var commentstart = 0; // quote
    var commentstart2 = 0; // quote or number
    var commentend = 0; // quote
    var commentend2 = 0; // quote or number

    for(var x = 0; x < w; x++) {
      var cell = new Cell();
      var s = x >= lines[y].length ? ' ' : lines[y][x];
      if (s == BACKSLASH_ALTERNATIVE && !comment) s = '\\';
      if (s == DQUOT_ALTERNATIVE) s = '"';
      cell.symbol = s;
      cell.displaysymbol = s;
      if (!comment && s == ASTERIX_ALTERNATIVE) s = '*';
      cell.circuitsymbol = s;
      //cell.metasymbol = comment ? commentalign : s;
      cell.metasymbol = comment ? '"' : s;
      world[y][x] = cell;
      cell.comment = comment;
      cell.x = x;
      cell.y = y;
      if(!comment && (cell.symbol == '0' || cell.symbol == '1' || cell.symbol == '2')) {
        if((x > 0 && lines[y][x - 1] == '"') || (x + 1 < w && lines[y][x + 1] == '"')) {
          cell.displaysymbol = ' ';
        }
      }
      if(comment) {
        if(cell.symbol == '"') {
          cell.displaysymbol = ' ';
          cell.circuitsymbol = ' ';
          cell.comment = true;
          cell.commentalign = commentalign;
          comment = !comment;

          if(commentalign >= 3 && commentalign <= 4) {
            if(commentend2 > x) {
              x++;
              world[y][x] = new Cell();
              world[y][x].x = x;
              world[y][x].y = y;
            }
            var i;
            for(i = commentstart2; i <= commentend2; i++) {
              var j = i;
              if(commentalign == 4) j = commentend2 - (i - commentstart2); // need to go from other end to not overwrite
              var shift = (commentalign == 3) ?
                  (j + 1 + (commentstart - commentstart2)) :
                  j - 1 - (commentend2 - commentend);
              if(shift > commentstart && shift < commentend) {
                world[y][j].commentalign = -1;
                world[y][j].displaysymbol = world[y][shift].displaysymbol;
                world[y][j].circuitsymbol = world[y][shift].circuitsymbol;
                world[y][j].metasymbol = world[y][shift].metasymbol;
                world[y][j].symbol = world[y][shift].symbol;
                world[y][j].comment = true;
                world[y][j].nuber = true;
              } else {
                world[y][j].commentalign = -1;
                world[y][j].displaysymbol = ' ';
                world[y][j].circuitsymbol = ' ';
                world[y][j].metasymbol = ' ';
                world[y][j].symbol = ' ';
                world[y][j].comment = false;
              }
            }
          }

          thincommentcell = null;
          commentalign = null;
        }
      } else {
        if(cell.symbol == '"') {
          commentstart = x;
          cell.displaysymbol = ' ';
          cell.circuitsymbol = ' ';
          cell.comment = true;
          cell.commentlength = 2; // the begin and end quote themselves take place in the alignment room
          comment = !comment;
          commentalign = -1;

          commentend = x + 1;
          for(;;) {
            if(lines[y][commentend] == '"') break;
            if(commentend + 1 >= w) break;
            commentend++;
          }
          commentend2 = commentend;

          var x2 = x - 1;
          if(x2 >= 0 && (lines[y][x2] == '0')) commentalign = 0;
          else if(x2 >= 0 && (lines[y][x2] == '1')) commentalign = 1;
          else if(x2 >= 0 && (lines[y][x2] == '2')) commentalign = 2;
          else if(x2 >= 0 && (lines[y][x2] == '3')) commentalign = 3;
          else if(x2 >= 0 && (lines[y][x2] == '4')) commentalign = 4;
          else {
            for(x2 = x + 1; x2 < w; x2++) {
              if(lines[y][x2] == '"') break;
            }
            x2++;
            commentend2++;
            if(x2 < w && lines[y][x2] == '0') commentalign = 0;
            else if(x2 < w && lines[y][x2] == '1') commentalign = 1;
            else if(x2 < w && lines[y][x2] == '2') commentalign = 2;
            else if(x2 < w && lines[y][x2] == '3') commentalign = 3;
            else if(x2 < w && lines[y][x2] == '4') commentalign = 4;
            else commentend2 = commentend;
          }
          commentstart = x;
          commentstart2 = x;
          if(x2 == x - 1 && commentalign >= 0) commentstart2 = x2;

          thincommentcell = (commentalign >= 0 && commentalign <= 2) ? (x2 < x ? world[y][x2] : cell) : null;
          cell.commentalign = commentalign;

          if(thincommentcell && thincommentcell != cell) {
            thincommentcell.circuitsymbol = thincommentcell.metasymbol = '"';
            thincommentcell.comment = cell.comment;
            thincommentcell.commentlength = cell.commentlength;
            thincommentcell.commentalign = cell.commentalign;
          }
        }
      }
      if(comment) {
        if(thincommentcell) {
          if(thincommentcell.commentlength == 3) thincommentcell.displaysymbol = '';
          thincommentcell.displaysymbol += cell.circuitsymbol;
          cell.displaysymbol = ' ';
          thincommentcell.commentlength++;
        }
        cell.circuitsymbol = ' ';
      }

      // For '@', do not skip parsing: It's used to connect IC's! Else initUsed2 breaks for I's of ICs.
      // Also had to enable metasymbol == '"' again, else non-aligned strings don't appear!!!
      // TODO: the extra cells of aligned strings should be disableable...
      if(cell.metasymbol == ' ' /*|| cell.metasymbol == '"'*/ /*|| cell.metasymbol == '@'*/) {
        cell.skipparsing = true;
      } else {
        line1[y] = x + 1;
        if(!line0inited) {
          line0inited = true;
          line0[y] = x;
        }
      }
    }
  }

  // vertical comments
  var above = [];
  for(var y = 0; y < h; y++) {
    var above2 = [];
    //for(var x = line0[y]; x < line1[y]; x++) {
    for(var x = 0; x < w; x++) {
      var cell = world[y][x];
      var c = world[y][x].circuitsymbol;
      if(c == ':') {
        if(above[x]) {
          // nothing, comment done
        } else {
          above2[x] = true;
        }
        cell.comment = true;
        cell.circuitsymbol = ' ';
        cell.displaysymbol = ' ';
        cell.metasymbol = '"';
      } else {
        if(above[x]) {
          cell.comment = true;
          above2[x] = true;
          cell.circuitsymbol = ' ';
          cell.metasymbol = '"';
        }
      }
    }
    above = above2;
  }

  parseAntennas();

  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(digitmap[world[y][x].symbol] && !world[y][x].comment) {
        world[y][x].circuitsymbol = ' ';
        //world[y][x].displaysymbol = ' ';
      }
      if(world[y][x].symbol == BACKSLASH_ALTERNATIVE && !world[y][x].comment) {
        world[y][x].displaysymbol = '\\';
        world[y][x].circuitsymbol = '\\';
        world[y][x].metasymbol = '\\';
      }
      var c = world[y][x].circuitsymbol;
      var wca, wcb, wcc;

      if(c == '^' || c == 'm') { wca = getNeighbor(x, y, 7); wcb = getNeighbor(x, y, 0); wcc = getNeighbor(x, y, 4); }
      else if(c == '>' || c == ']') { wca = getNeighbor(x, y, 4); wcb = getNeighbor(x, y, 1); wcc = getNeighbor(x, y, 5); }
      else if(c == 'v' || c == 'w') { wca = getNeighbor(x, y, 5); wcb = getNeighbor(x, y, 2); wcc = getNeighbor(x, y, 6); }
      else if(c == '<' || c == '[') { wca = getNeighbor(x, y, 6); wcb = getNeighbor(x, y, 3); wcc = getNeighbor(x, y, 7); }
      else continue;


      var ca = ' ', cb = ' ', cc = ' ';

      // metasymbol instead of circuitsymbol due to the TODO below with using digitmap
      if(wca) ca = wca.metasymbol;
      if(wcb) cb = wcb.metasymbol;
      if(wcc) cc = wcc.metasymbol;

      // digitmap too because those could be IC numbers that count as part of it...
      // this is a bit sloppy tbh (number is not always chip) but this is an early parse, we don't know which numbers are chip yet
      // TODO: improve that
      if(!(devicemapin[cb] || digitmap[cb]) && (devicemapin[ca] || digitmap[ca] || devicemapin[cc] || digitmap[cc])) {
        // Even if their diagonal backsides have nothing, make them diagonal inputs. Otherwise large repeated IC structures may fail
        // at the edges when just copypasting the same structure multiple times (see the game of life circuits)
        world[y][x].circuitextra = 2;
      }

      if(world[y][x].circuitextra == 0) {
        // if an input touches a device on its main input side, then ignore devices touching its sides (mostly for special shaped ICs)
        if(c == '^' || c == 'm') { wca = getNeighbor(x, y, 2); }
        else if(c == '>' || c == ']') { wca = getNeighbor(x, y, 3); }
        else if(c == 'v' || c == 'w') { wca = getNeighbor(x, y, 0); }
        else if(c == '<' || c == '[') { wca = getNeighbor(x, y, 1); }
        ca = ' ';
        if(wca) ca = wca.metasymbol; // idem TODO as above about numbers and chips
        if(devicemapin[ca] || digitmap[ca] || ca == '*' || ca == '+' || ca == ',') {
          world[y][x].circuitextra = 1;
        }
        if(ca == '|' && (c == '^' || c == 'v' || c == 'm' || c == 'w')) world[y][x].circuitextra = 1;
        if(ca == '-' && (c == '>' || c == '<' || c == ']' || c == '[')) world[y][x].circuitextra = 1;
      }
    }
  }

  logPerformance('parseCells done');
  return true; // success
}

//graph is an object, like this: {5:{4:true, 3:true}, 4:{3:true, 2:true}, 3:{2:true}}, which returns [5, 4, 3, 2]
// This represents the directed graph 5:4,3 ; 4:3,2 ; 3:2, where after each colon is the list of nodes pointed to by this one.
// So an object of objects, with indices of nodes as keys.
// This does a toposort, or returns null if a cycle is detected
// In fact I only use this function for its cycle detection ability.
// Here is one with a cycle to try: {5:{4:true}, 4:{5:true}}
function toposort(graph) {
  var mark = {}; // undefined=unmarked, 1=temporary marked, 2=permanently marked

  var result = [];

  var visit = function(k) {
    var stack = [k];
    while(stack.length > 0) {
      var k1 = stack.pop();
      if(k1 == Infinity) {
        k1 = stack.pop();
        mark[k1] = 2;
        result.push(k1);
        continue;
      }
      if(mark[k1] == 1) return false; // not a DAG, there is a cycle
      stack.push(k1);
      stack.push(Infinity); // special mark to say that when we pop this, we must mark k1 as 2
      if(!mark[k1]) {
        mark[k1] = 1;
        for(var k2 in graph[k1]) {
          stack.push(k2);
        }
      }
    }
    return true;
  };

  for(var k in graph) {
    if(!mark[k] && !visit(k)) return null;
  }

  result.reverse();
  for(var i = 0; i < result.length; i++) result[i] = parseInt(result[i]);
  return result;
}

// This parses the groups of subs (for TYPE_IC), all connected cells that are connected to a capital I
function parseSubs() {
  var used;
  logPerformance('parseSubs begin');

  var sub_tree = {};  // numbers as index. Actually it's not a tree but a DAG, since multiple things can have the same child. But it's also a tree because each shared child will actually become its own copy of all the involved components of it later on.

  // pass 1: small i's
  used = initUsed2();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0]) continue;
      if(world[y0][x0].circuitsymbol != 'i') continue;

      var stack = [[x0, y0]];
      used[y0][x0] = true;

      var array = [];

      var subindex = -2; // >= -1 means actual sub

      var drawchip = null;

      var calldir = -1;
      var calldirval = -1;

      while (stack.length) {
        var s = stack.pop();
        var x = s[0];
        var y = s[1];
        if(x < 0 || x >= w || y < 0 || y >= h) continue;
        var c = world[y][x].circuitsymbol;
        if(c != '#' && c != '$' && c != 'i' && !digitmap[c]) continue; // we only care about i, # and digits, they form a group, the 'i' component
        array.push(s);

        if(c == 'i') {
          // why no error but taking the max: in case you have this:
          //   iiii
          //   i12i
          //   iiii
          // that makes the chip touch numbers 12, 1 and 2. but we really only want 12 to count.
          //if(subindex >= -1) console.log('parse error: multiple numbers for sub call ' + subindex + ' ' + world[y][x].number);
          if(world[y][x].number >= subindex) {
            subindex = world[y][x].number;
            drawchip = world[y][x];
            for(var i = 0; i < 4; i++) {
              var x2 = x + ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
              var y2 = y + ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
              if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
              var c2 = world[y2][x2].metasymbol;
              if (digitmap[c2] && world[y2][x2].numbertype == NUMBER_ICCALL) {
                if(calldirval == subindex && calldir != i) {
                  calldir = -1; // ambiguous, so assume same as template
                } else {
                  calldir = i;
                  calldirval = subindex;
                }
              }
            }
          }
        }

        // neighbors
        for(var i = 0; i < 4; i++) { // N, E, S, W ; NE, SE, SW, NW
          var x2 = x + ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
          var y2 = y + ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
          /*var x2 = x + ((i == 1 || i == 4 || i == 5) ? 1 : ((i == 3 || i == 6 || i == 7) ? -1 : 0));
          var y2 = y + ((i == 0 || i == 4 || i == 7) ? -1 : ((i == 2 || i == 5 || i == 6) ? 1 : 0));*/
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          if(used[y2][x2]) continue;
          stack.push([x2, y2]);
          used[y2][x2] = true;
        }
      }

      if(subindex >= -1) {
        var callsub = new CallSub();
        callsubs.push(callsub);
        callsub.subindex = subindex;
        callsub.chipdir = calldir;
        for(var i = 0; i < array.length; i++) {
          var x = array[i][0];
          var y = array[i][1];
          world[y][x].callsubindex = subindex;
          world[y][x].callsub = callsub;
          // Unlike other digits, those for ICs become extenders of the IC component, and
          // extenders should also be marked with a 'i' because we will treat them all
          // specially in the "connected" function, which takes only the circuitsymbol character as input.
          // '$' is not changed into 'i' here because it indicates a different function (no interaction)
          if(world[y][x].circuitsymbol != '$') world[y][x].circuitsymbol = 'i';
          callsub.cells.push([x, y]);
        }
        if(drawchip) drawchip.drawchip = true;
      }
    }
  }

  logPerformance('parseSubs pass 2 begin');

  // pass 2: capital I's
  used = initUsed2();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0]) continue;
      if(world[y0][x0].circuitsymbol != 'I') continue;

      var stack = [[x0, y0]];
      used[y0][x0] = true;

      var array = [];

      var subindex = -2; // >= -1 means actual sub
      var globalwire = false;
      var error = false;

      var called = {};

      var defdir = 0;

      while (stack.length) {
        var s = stack.pop();
        var x = s[0];
        var y = s[1];
        if(x < 0 || x >= w || y < 0 || y >= h) continue;
        var c = world[y][x].metasymbol;
        if(!knownmap[c] && !digitmap[c] && c != 'I' && world[y][x].symbol != '@') continue; // it's an isolator
        array.push(s);

        if(c == 'I') {
          if(subindex >= -1) {
            console.log('parse error: multiple connected subs ' + subindex + ' ' + world[y][x].number);
            error = true;
          }
          subindex = world[y][x].number;
          for(var i = 0; i < 4; i++) {
            var x2 = x + ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
            var y2 = y + ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
            if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
            var c2 = world[y2][x2].metasymbol;
            if (digitmap[c2] && world[y2][x2].numbertype == NUMBER_ICDEF) {
              defdir = i;
              break;
            }
          }
        }

        if(c == 'i') {
          called[world[y][x].callsubindex] = true;
        }

        if(c == 'g') {
          globalwire = true;
        }

        // neighbors
        for(var i = 0; i < 8; i++) { // N, E, S, W ; NE, SE, SW, NW
          var x2 = x + ((i == 1 || i == 4 || i == 5) ? 1 : ((i == 3 || i == 6 || i == 7) ? -1 : 0));
          var y2 = y + ((i == 0 || i == 4 || i == 7) ? -1 : ((i == 2 || i == 5 || i == 6) ? 1 : 0));
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          if(used[y2][x2]) continue;
          stack.push([x2, y2]);
          used[y2][x2] = true;
        }
      }

      if(subindex >= -1) {
        for(var i = 0; i < array.length; i++) {
          var x = array[i][0];
          var y = array[i][1];
          world[y][x].defsubindex = subindex;
        }

        if(sub_tree[subindex]) {
          console.log('error: multiple subs with same id: ' + subindex);
          error = true; //multiple sub with same number defined
        }
        if(globalwire) {
          //console.log('error: global wire in subdef');
          //error = true; // global wires in sub componetns not supported
          // TODO! global wire out must still be forbidden!!!
        }

        sub_tree[subindex] = called;
        var defsub = new DefSub();
        defsub.index = subindex;
        defsubs[subindex] = defsub;
        defsub.error = error;
        defsub.chipdir = defdir;

        for(var i = 0; i < array.length; i++) {
          var x = array[i][0];
          var y = array[i][1];
          if(world[y][x].circuitsymbol == 's' || world[y][x].circuitsymbol == 'S') {
            defsub.externalinputs.push([x, y]);
          }
        }
      }
    }
  }

  defsubs_order = toposort(sub_tree);
  if(!defsubs_order) {
    //for(var i = 0; i < components.length; i++) {
    //  if(components[i].callsub) components[i].markError();
    //}
    for(var k in defsubs) {
      defsubs[k].error = true;
      defsubs[k].markError(); // TODO: add error message
    }
    for(var i = 0; i < callsubs.length; i++) {
      callsubs[i].error = true;
      callsubs[i].markError(); // TODO: add error message
    }
    defsubs_order = [];
    // TODO: only disable those ICs that participate in the loop
    console.log('error: loop in defsubs, would create infinite loop, ALL ICs disabled!');
    //return false; // return false if cycle, otherwise we would have an infinite loop
  }

  logPerformance('parseSubs done');
  return true;
}

// This does nothing more than turn numbers that touch junctions (=)'s circuitsymbol, into ='s themselves, so wires can connect to the numbers
// This is similar to the numbers touching i's
// But this is unlike numbers touching l's and r's, those numbers will be isolators (for example a number for an l is to indicate its color, but you may not want to increase the led size)
function convertJunctionNumbers() {
  var used;

  used = initUsed2();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0]) continue;

      var stack = [[x0, y0]];
      used[y0][x0] = true;

      var array = [];
      var isjunction = false;

      while (stack.length) {
        var s = stack.pop();
        var x = s[0];
        var y = s[1];
        if(x < 0 || x >= w || y < 0 || y >= h) continue;
        var c = world[y][x].metasymbol;
        if(c != '=' && !digitmap[c]) continue; // we only care about bus and digits, they form a group
        if(digitmap[c] && world[y][x].numbertype != NUMBER_BUS && world[y][x].numbertype != NUMBER_NONE) continue;
        if(digitmap[c]) world[y][x].numbertype = NUMBER_BUS;
        array.push(s);

        if(c == '=') {
          isjunction = true;
        }

        // neighbors
        for(var i = 0; i < 4; i++) { // N, E, S, W
          var x2 = x + ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
          var y2 = y + ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          if(used[y2][x2]) continue;
          stack.push([x2, y2]);
          used[y2][x2] = true;
          if (world[y2][x2].numbertype < NUMBER_BUS) world[y2][x2].numbertype = NUMBER_BUS;
        }
      }

      if(isjunction) {
        for(var i = 0; i < array.length; i++) {
          var x = array[i][0];
          var y = array[i][1];
          world[y][x].circuitsymbol = '=';
        }
      }
    }
  }

  // resolve numbers of buses touching wires in a very particular useful but heuristic way
  // TODO: can this be done simpler and better?
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      if(world[y][x].circuitsymbol == '=') {
        var hor = false;
        var ver = false;
        for(var i = 0; i < 4; i++) {
          var dx2 = (i == 1) ? 1 : ((i == 3) ? -1 : 0);
          var dy2 = (i == 0) ? -1 : ((i == 2) ? 1 : 0);
          var x2 = x + dx2;
          var y2 = y + dy2;
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          if(world[y2][x2].circuitsymbol == '=') continue;
          if(connected2(x, y, i)) {
            if(i == 0 || i == 2) ver = true;
            if(i == 1 || i == 3) hor = true;
          }
        }

        if(hor && !ver && world[y][x].numberh >= 0) {
          world[y][x].number = world[y][x].numberh;
        }
        if(ver && !hor && world[y][x].numberv >= 0) {
          world[y][x].number = world[y][x].numberv;
        }
      }
    }
  }
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      if(world[y][x].circuitsymbol == '=' && world[y][x].metasymbol == '=') {
        world[y][x].number = world[y][x].numberh = world[y][x].numberv = -1;
        // this is on purpose! Wires that touch a real '=' do NOT count for numbered connections
      }
    }
  }
}

// similar convertJunctionNumbers, but for backplanes ('g')
function convertBackplaneNumbers() {
  var used;

  used = initUsed2();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0]) continue;
      if (world[y0][x0].metasymbol != 'g') continue;

      var number = world[y0][x0].number;
      var dir = -1;

      for(var i = 0; i < 4; i++) { // N, E, S, W
        var x2 = x0 + ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
        var y2 = y0 + ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
        if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
        var c2 = world[y2][x2].metasymbol;
        if(!digitmap[c2]) continue;
        if(world[y2][x2].numbertype != NUMBER_GLOBAL) continue;
        dir = i;
        break;
      }

      if(dir == -1) continue;

      var stack = [[x0, y0]];
      used[y0][x0] = true;

      var array = [];
      while (stack.length) {
        var s = stack.pop();
        var x = s[0];
        var y = s[1];
        if(x < 0 || x >= w || y < 0 || y >= h) continue;
        if (world[y][x].numbertype != NUMBER_GLOBAL) continue;
        var c = world[y][x].metasymbol;
        if(array.length > 0 && !digitmap[c]) continue; // g's themselves don't interact
        array.push(s);

        var i = dir;
        var x2 = x + ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
        var y2 = y + ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
        if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
        if(used[y2][x2]) continue;
        stack.push([x2, y2]);
        used[y2][x2] = true;
        if (world[y2][x2].numbertype < NUMBER_GLOBAL) world[y2][x2].numbertype = NUMBER_GLOBAL;
      }

      for(var i = 0; i < array.length; i++) {
        var x = array[i][0];
        var y = array[i][1];
        if(!digitmap[world[y][x].metasymbol]) continue;
        world[y][x].circuitsymbol = 'g';
        world[y][x].number = number;
        world[y][x].circuitextra = (dir & 1) + 1;
      }
    }
  }
}


// An important thing about this function that is relied on by all users, is that it does NOT connect components to each other, it finds the cells that belong to a single component instead (which includes all its entire output wires which can be huge of course).
// todir: 0=N, 1=E, 2=S, 3=W ; 4=NE, 5=SE, 6=SW, 7=NW, from c to c2
function connected(c, c2, ce, ce2, todir, z, z2) {
  if(antennamap[c] || antennamap[c2]) {
    return false;
  }

  // for the diagonal ^ style inputs, for any non-diagonal type of cell (|, -, +, &, %, ...), treat as if we have an orthogonal direction anyway
  var todir2 = todir;
  if(ce2 == 2) {
    if((c2 == '^' || c2 == 'm') && (todir == 4 || todir == 7)) todir2 = 0;
    if((c2 == '>' || c2 == ']') && (todir == 4 || todir == 5)) todir2 = 1;
    if((c2 == 'v' || c2 == 'w') && (todir == 5 || todir == 6)) todir2 = 2;
    if((c2 == '<' || c2 == '[') && (todir == 6 || todir == 7)) todir2 = 3;
  }

  if(c == '$' && !devicemaparea[c2]) return false; // $ is really only for extending devices, nothing else

  if(todir > 3) {
    // the corners can only interact with those
    var ok = false;
    if(diagonalmap[c]) ok = true;
    if(diagonalmap[c2]) ok = true;
    if(dinputmap[c] && ce == 2) ok = true;
    if(dinputmap[c2] && ce2 == 2) ok = true;
    if(!ok) return false;
  }

  if(todir <= 3 && (c == 'x' || c2 == 'x')) return false; // x's do not interact with the sides

  if(z > 3 && c != 'i') return false;
  if(z > 1 && !(c == 'i' || c == 'V' || c == 'W' || c2 == 'V' || c2 == 'W' || c == 'X' || c2 == 'X')) return false;

  //if(c == 'i' && c2 != 'i') return false; // connecting sub-calls is implemented later. And full subs are marked with 'i' earlier, so u's connect only with u's.

  if(c == '-' && (todir2 == 0 || todir2 == 2 || todir2 >= 4)) return false;
  if(c == '|' && (todir2 == 1 || todir2 == 3 || todir2 >= 4)) return false;

  if((c == ',') && (c2 == ',')) return false;

  // Multi-part devices like flip-flop should not have their individual cells connected,
  // they are initially all their own device (to be able to handle multiple inputs), so
  // don't let device extenders extend those here yet.
  if(ffmap[c] && (c2 == '#' || c2 == '$')) return false;
  if(ffmap[c2] && (c == '#' || c == '$')) return false;
  if(rommap[c] && (c2 == '#' || c2 == '$')) return false;
  if(rommap[c2] && (c == '#' || c == '$')) return false;
  if(c == 'i' && (c2 == '#' || c2 == '$')) return false;
  if(c2 == 'i' && (c == '#' || c == '$')) return false;

  if(!knownmap[c2]) return false; // it's an isolator

  // TODO: may need to become || instead of && when bus connections handled separately
  if(c == '=' && c2 == '=') return false; // '='-'=' connections must be handled with "handleJunctionConnections" instead

  if(c == '+' && !(z == 0 && (todir2 == 1 || todir2 == 3)) && !(z == 1 && (todir2 == 0 || todir2 == 2))) return false;
  if(c == '%' && !(z == 0 && (todir2 == 1 || todir2 == 2)) && !(z == 1 && (todir2 == 0 || todir2 == 3))) return false;
  if(c == '&' && !(z == 0 && (todir2 == 2 || todir2 == 3)) && !(z == 1 && (todir2 == 0 || todir2 == 1))) return false;
  if(c == '/' && !(todir == 4 || todir == 6)) return false;
  if(c == '\\' && !(todir == 5 || todir == 7)) return false;

  if(c == 'x' && !(z == 0 && (todir == 4 || todir == 6)) && !(z == 1 && (todir == 5 || todir == 7))) return false;
  if((c == 'V' || c == 'W' || c == 'X') &&
      !(z == 0 && (todir == 1 || todir == 3)) &&
      !(z == 1 && (todir == 0 || todir == 2)) &&
      !(z == 2 && (todir == 5 || todir == 7)) &&
      !(z == 3 && (todir == 4 || todir == 6))) return false;

  /*if(c2 != '#') {
    // nothing interacts with the front side if device inputs here, that is resolved only later
    if((c == '^' || c == 'm') && todir == 0) return false;
    if((c == '>' || c == ']') && todir == 1) return false;
    if((c == 'v' || c == 'w') && todir == 2) return false;
    if((c == '<' || c == '[') && todir == 3) return false;
  } else {
    // # only interacts with back side of it
    if((c == '^' || c == 'm') && todir != 2) return false;
    if((c == '>' || c == ']') && todir != 3) return false;
    if((c == 'v' || c == 'w') && todir != 0) return false;
    if((c == '<' || c == '[') && todir != 1) return false;
  }*/

  if(dinputmap[c] && ce != 2) {
    // nothing interacts with the front side if device inputs here, that is resolved only later
    if((c == '^' || c == 'm') && todir == 0) return false;
    if((c == '>' || c == ']') && todir == 1) return false;
    if((c == 'v' || c == 'w') && todir == 2) return false;
    if((c == '<' || c == '[') && todir == 3) return false;

    if((c == '^' || c == 'm') && ce == 1 && devicemapin[c2] && (todir == 1 || todir == 3)) return false;
    if((c == '>' || c == ']') && ce == 1 && devicemapin[c2] && (todir == 0 || todir == 2)) return false;
    if((c == 'v' || c == 'w') && ce == 1 && devicemapin[c2] && (todir == 1 || todir == 3)) return false;
    if((c == '<' || c == '[') && ce == 1 && devicemapin[c2] && (todir == 0 || todir == 2)) return false;
  }

  if(dinputmap[c] && ce == 2) {
    if(todir < 4) return false;
    if((c == '^' || c == 'm') && !(todir == 5 && z == 0) && !(todir == 6 && z == 1)) return false;
    if((c == '>' || c == ']') && !(todir == 6 && z == 0) && !(todir == 7 && z == 1)) return false;
    if((c == 'v' || c == 'w') && !(todir == 7 && z == 0) && !(todir == 4 && z == 1)) return false;
    if((c == '<' || c == '[') && !(todir == 4 && z == 0) && !(todir == 5 && z == 1)) return false;
  }


  // those device inputs, too, don't interact with devices here (interaction with devices is resolved later)
  if((c == 'U' || c == 'G' || c == 'V' || c == 'W') && devicemapin[c2]) return false;

  // The different backplane types don't interact, unless numbers of a matching one (ce then encodes allowed direction)
  if(c == 'g' && c2 == 'g') {
    if(todir > 3) return false;
    var cedir = (todir & 1) + 1;
    if(ce != cedir && ce2 != cedir) return false;
  }

  if(((dinputmap[c] && inputmap[c2]) || (inputmap[c] && dinputmap[c2]))) return false; // inputs don't interact, including not > with U, but U with U do interact
  if(devicemap[c] && devicemap[c2]) return false; // device cores don't interact

  if(c == 'i' && z != todir) return false;
  if(c == 'M') {
    if((todir == 0 || todir == 2) && z != 1) return false;
    if((todir == 1 || todir == 3) && z != 0) return false;
    if(todir > 3) return false;
  }

  return true;
}

function connected2(x, y, todir) {
  var n = getNeighbor(x, y, todir);
  if(!n) return false;
  var x2 = n.x;
  var y2 = n.y;

  var c = world[y][x].circuitsymbol;
  var c2 = world[y2][x2].circuitsymbol;
  var ce = world[y][x].circuitextra;
  var ce2 = world[y2][x2].circuitextra;
  var fromdir = (todir <= 3) ? ((todir + 2) & 3) : (4 + ((todir - 2) & 3));

  for(var z = 0; z < 8; z++) {
    var z2 = getZ2(c, c2, ce, ce2, todir, z); // z coordinate for the neighbor
    if(connected(c, c2, ce, ce2, todir, z, z2) &&
       connected(c2, c, ce2, ce, fromdir, z2, z)) return true;
  }

  return false;
}

// coming from a c at z towards c2, what z2 of c2 is needed to connect them?
// todir: 0=N, 1=E, 2=S, 3=W ; 4=NE, 5=SE, 6=SW, 7=NW
function getZ2(c, c2, ce, ce2, todir, z) {
  var z2 = 0;

  // see comment at similar code in function connected
  var todir2 = todir;
  if(ce == 2) {
    if(c == '^' && (todir == 5 || todir == 6)) todir2 = 2;
    if(c == '>' && (todir == 6 || todir == 7)) todir2 = 3;
    if(c == 'v' && (todir == 4 || todir == 7)) todir2 = 0;
    if(c == '<' && (todir == 4 || todir == 5)) todir2 = 1;
  }

  if(c2 == '+' && (todir2 == 0 || todir2 == 2)) z2 = 1;
  if(c2 == 'X' || c2 == 'V' || c2 == 'W') {
    // X's meaning for z coordinate: z=0:-, z=1:|, z=2:/, z=3:\ (backspace)
    if(todir == 0 || todir == 2) z2 = 1;
    else if(todir == 4 || todir == 6) z2 = 3;
    else if(todir == 5 || todir == 7) z2 = 2;
  }
  if(c2 == '%' && (todir2 == 1 || todir2 == 2)) z2 = 1;
  if(c2 == '&' && (todir2 == 3 || todir2 == 2)) z2 = 1;
  if(c2 == 'x' && (todir == 5 || todir == 7)) z2 = 1;
  if(c2 == 'i') {
    if(todir < 4) z2 = ((todir + 2) & 3);
    else z2 = 4 + ((todir + 2) & 3);
  }
  if(c2 == 'M') {
    if(todir == 0 || todir == 2) z2 = 1;
  }
  if(dinputmap[c2] && ce2 == 2) {
    if(c2 == '^' || c2 == 'm') return todir == 4 ? 1 : 0;
    if(c2 == '>' || c2 == ']') return todir == 5 ? 1 : 0;
    if(c2 == 'v' || c2 == 'w') return todir == 6 ? 1 : 0;
    if(c2 == '<' || c2 == '[') return todir == 7 ? 1 : 0;
  }
  return z2;
}

function resetForParse() {
  components = [];
  components_order = [];
  world = [];
  w = 0;
  h = 0;
  buses = [];
  defsubs = {};
  callsubs = [];
  backplanes_g = [];
  line0 = [];
  line1 = [];
  // important to pause, else if circuit starts with a timer that is supposed to be initially off, it may randomly affect initial state
  // especially in case of long parse time...
  pause();
  timerticks = 0;
  global_changed_something = true;
  numticks = -1; // -1 because the first implicit tick after parse should not be counted
  showingLinkIds = false;
}

// 3D version, for wire crossings etc...
function initUsed3() {
  var used = [];
  for(var y = 0; y < h; y++) {
    used[y] = [];

    // Optimize by not working where we have no parsable data, but for
    // initUsed we have the problem that we want to check neighbors too,
    // so extend the zone left, right, up and below
    var start = line0[y];
    var end = line1[y];
    if(y > 0) {
      start = Math.min(line0[y - 1], start);
      end = Math.max(line1[y - 1], end);
    }
    if(y + 1 < h) {
      start = Math.min(line0[y + 1], start);
      end = Math.max(line1[y + 1], end);
    }
    if(start > 0) start--;
    if(end < w) end++;

    for(var x = start; x < end; x++) {
      if(world[y][x].skipparsing) used[y][x] = [true, true, true, true, true, true, true, true]; // easy optimization: make all parse-loops skip empty spaces
      else used[y][x] = [false, false, false, false, false, false, false, false]; // the second one (z-coord 1) is for: +:vertical part, /: top-left part, \:top-right part
    }
  }

  return used;
}

// 2D version, only y and x
function initUsed2() {
  var used = [];
  for(var y = 0; y < h; y++) {
    used[y] = [];
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) used[y][x] = true;
      else used[y][x] = false;
    }
  }

  return used;
}

var backplanes_g = [];

// must be called after parseNumbers
function parseBackplanes() {
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      var c = world[y][x].circuitsymbol;
      if(c == 'g') {
        var n = world[y][x].number;
        if(!backplanes_g[n]) backplanes_g[n] = [];
        backplanes_g[n].push([x, y]);
      }
    }
  }
}

// backplane has even more neighbors: all other backplane cells in the entire world
function handleBackPlaneConnections(used, stack, x, y, z) {
  var c = world[y][x].circuitsymbol;
  if(c == 'g') {
    var n = world[y][x].number;
    var b = backplanes_g[n];
    for(var i = 0; i < b.length; i++) {
      var xb = b[i][0];
      var yb = b[i][1];
      if(used[yb][xb][0]) continue;
      stack.push([xb, yb, 0]);
      used[yb][xb][0] = true;
    }
  }
}

// buses ('=')
function handleJunctionConnections(used, stack, x, y) {
  if(world[y][x].circuitsymbol != '=') return;
  var bus = world[y][x].bus;
  if(!bus) {
    return;
  }
  var number = world[y][x].number;
  if (world[y][x].numbertype != NUMBER_BUS) return;
  // unnumbered wire connections are not independent signals but bus itself, so skip
  if(number == -1) return;
  var c = bus.connections[number];
  if(!c) {
    console.log('no connections for this number? this should not happen');
    return;
  }
  for(var i = 0; i < c.length; i++) {
    var x2 = c[i][0];
    var y2 = c[i][1];
    var z2 = c[i][2];
    if(!used[y2][x2][z2]) {
      stack.push([x2, y2, z2]);
      used[y2][x2][z2] = true;
    }
  }
}

// optimization: in many circuits, like the large game of life, almost half the components are loose wires. they can all be the same one as all they do is output zero
var globalLooseWireInstanceI = null;
var globalLooseWireInstanceE = null;

// merge old component into component and fix up the global components array, world cells, etc...
// also sets index of old component to -1, since it's no longer part of the components array
function mergeComponents(component, oldcomponent) {
  if(oldcomponent.index < 0) return;

  for(var j = 0; j < oldcomponent.cells.length; j++) {
    component.cells.push(oldcomponent.cells[j]);
    var x = oldcomponent.cells[j][0];
    var y = oldcomponent.cells[j][1];
    var z = oldcomponent.cells[j][2];
    world[y][x].components[z] = component;
  }
  if(oldcomponent.index + 1 < components.length) {
    components[oldcomponent.index] = components[components.length - 1];
    components[oldcomponent.index].index = oldcomponent.index;
    components[components.length - 1] = null;
  }
  components.length--;
  oldcomponent.index = -1;
}

// create the components after the cells have been parsed (note: is not really parsing anymore, but a post-processing step of it)
function parseComponents() {
  var used;

  logPerformance('parseComponents start');

  globalLooseWireInstanceI = null;
  globalLooseWireInstanceE = null;

  // PASS 0: parse the buses ('=')
  used = initUsed3();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0][0]) continue;

      // don't do all this parsing if it's not a junction in the first place
      if(world[y0][x0].circuitsymbol != '=') continue;

      var stack = [[x0, y0, 0]];
      used[y0][x0][0] = true;
      var junction = false;
      var array = [];

      while (stack.length) {
        var s = stack.pop();
        var x = s[0];
        var y = s[1];
        var z = s[2];
        if(x < 0 || x >= w || y < 0 || y >= h) continue;
        var c = world[y][x].circuitsymbol;
        var ce = world[y][x].circuitextra;
        if(!knownmap[c] || world[y][x].comment) continue; // it's an isolator

        if(c == '=') {
          junction = true;
          array.push(s);
        }

        // neighbors
        for(var i = 0; i < 8; i++) { // N, E, S, W ; NE, SE, SW, NW
          var wc2 = getNeighbor(x, y, i);
          if(wc2 == null) continue;
          var x2 = wc2.x;
          var y2 = wc2.y;
          var c2 = wc2.circuitsymbol;
          var ce2 = wc2.circuitextra;

          var z2 = getZ2(c, c2, ce, ce2, i, z); // z coordinate for the neighbor
          if(used[y2][x2][z2]) continue;

          var number = world[y][x].number;
          var number2 = world[y2][x2].number;

          if(c == '=' || c2 == '=') {
            if(c != '=' || c2 != '=') {
              // For y's, we do not use the regular connection rules. But instead rules for how y-groups are connected, which are different than components!
              // a numbered y is only connected to y, it's not even connected to wires
              // an unnumbered y is connected to wires and extends its group that way
              if(c == '=' && number >= 0) continue;
              if(c2 == '=' && number2 >= 0) continue;
              if(!connected(c, c2, ce, ce2, i, z, z2)) continue;
              var fromdir = (i <= 3) ? ((i + 2) & 3) : (4 + ((i - 2) & 3));
              if(!connected(c2, c, ce2, ce, fromdir, z2, z)) continue;
            } else {
              if(i > 3) continue;
            }
          } else {
            if(!connected(c, c2, ce, ce2, i, z, z2)) continue;
            var fromdir = (i <= 3) ? ((i + 2) & 3) : (4 + ((i - 2) & 3));
            if(!connected(c2, c, ce2, ce, fromdir, z2, z)) continue;
          }

          stack.push([x2, y2, z2]);
          used[y2][x2][z2] = true;
        }

        handleBackPlaneConnections(used, stack, x, y, z);
      }

      if(junction) {
        var bus = new Bus();
        bus.index = buses.length;
        buses.push(bus);
        for(var i = 0; i < array.length; i++) {
          var x = array[i][0];
          var y = array[i][1];
          var z = array[i][2];
          world[y][x].bus = bus;
          var number = world[y][x].number;
            // unnumbered wire connections are not independent signals but bus itself, so skip
          if(number >= 0) {
            if(!bus.connections[number]) bus.connections[number] = [];
            bus.connections[number].push([x, y, z]);
          }
        }
      }
    }
  }

  logPerformance('parseComponents pass 1 begin');

  // PASS 1: parse all components
  used = initUsed3();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      var c0 = world[y0][x0].circuitsymbol;

      // z0 > 0 is only to handle following weird edge case scenarios:
      // *) to connect the negated W as loose wire to things, it should cause a negated input signal there...
      // *) to connect things to call-ic's in some rare case, the rare case being such crossings like that.
      // the thing is, IC output connections use the z value as output direction detector. and crossings like x use the z value for
      // the different legs. Now, if IC's z is higher than 0, and so is the z of this leg of x, it would NEVER find that connection
      // unless we also start from z0 > 0. But using z0 > 0 on EVERYTHING, breaks various things. So only use for those crossings..........
      // It's tricky and hacky and ad hoc (this only added on 20171210) but I HOPE It works
      var maxz0 = 1;
      if(c0 == 'W') maxz0 = 4;
      if(c0 == 'x' || c0 == '+' || c0 == '%' || c0 == '&') maxz0 = 2;
      if(dinputmap[c0] && world[y0][x0].circuitextra == 2) maxz0 = 2;

      for(var z0 = 0; z0 < maxz0; z0++) {
        if(used[y0][x0][z0]) continue;
        var stack = [[x0, y0, z0]];
        used[y0][x0][z0] = true;
        var type = TYPE_NULL;
        var array = [];
        var corecell = null;
        var error = false;
        var errormessage = null;
        var number = -1;
        var numbertype = NUMBER_NONE;
        //var defsubindex = -2;
        var callsubindex = -2;

        while (stack.length) {
          var s = stack.pop();
          var x = s[0];
          var y = s[1];
          var z = s[2];
          if(x < 0 || x >= w || y < 0 || y >= h) continue;
          var c = world[y][x].circuitsymbol;
          var ce = world[y][x].circuitextra;
          if(!knownmap[c] || world[y][x].comment) continue; // it's an isolator

          array.push(s);

          if(devicemap[c]) {
            if(type != TYPE_NULL && type != TYPE_UNKNOWN_DEVICE) {
              var ok = false;
              // allow input that touches same special shaped chip with multiple sides
              // (TODO: also allow this for other special shaped devices)
              if(world[y][x].callsub != null && world[y][x].callsub == corecell.callsub) ok = true;
              if(type == TYPE_TRISTATE && c == 'z') ok = true;
              if(type == TYPE_TRISTATE_INV && c == 'Z') ok = true;
              if(!ok) {
                if((type == TYPE_TRISTATE && c == 'Z') || (type == TYPE_TRISTATE_INV && c == 'z')) {
                  errormessage = 'error: cannot mix low and high tristate buffers (z and Z)';
                } else {
                  errormessage = 'error: multiple devices outputting to same wire at ' + x + ' ' + y + ' (type: ' + type + ')';
                }
                console.log(errormessage);
                //return false;
                error = true;
              }
            }
            corecell = world[y][x];
            if(c == 's') type = TYPE_SWITCH_OFF;
            if(c == 'S') type = TYPE_SWITCH_ON;
            if(c == 'l') type = TYPE_LED;
            if(c == 'L') type = TYPE_LED_RGB;
            if(c == 'p') type = TYPE_PUSHBUTTON_OFF;
            if(c == 'P') type = TYPE_PUSHBUTTON_ON;
            if(c == 'r') type = TYPE_TIMER_OFF;
            if(c == 'R') type = TYPE_TIMER_ON; //ON = user enabled, OFF = user disabled (this is a different bit than the 'clocked' bit that changes by real time)
            if(c == 'a') type = TYPE_AND;
            if(c == 'A') type = TYPE_NAND;
            if(c == 'o') type = TYPE_OR;
            if(c == 'O') type = TYPE_NOR;
            if(c == 'e') type = TYPE_XOR;
            if(c == 'E') type = TYPE_XNOR;
            if(c == 'b' || c == 'B') type = TYPE_ROM;
            if(c == 'M') type = TYPE_MUX;
            if(c == 'i') type = TYPE_IC;
            if(c == 'T') type = TYPE_VTE;
            if(c == 'z') type = TYPE_TRISTATE;
            if(c == 'Z') type = TYPE_TRISTATE_INV;
            if(c == '?') type = TYPE_RANDOM;
            if(ffmap[c]) type = TYPE_FLIPFLOP;
          }

          if(c == 'toc') type = TYPE_TOC;

          if(type == TYPE_NULL && (c == '#' || c == '$')) type = TYPE_UNKNOWN_DEVICE;
          if(world[y][x].number >= 0 && devicemapin[c]) {
            // TODO: check if the above if really needs devicemapin instead of just devicemap,
            // because numbers currently don't interact with # anyway (for e.g. chip, led, ...)
            if(number >= 0 && world[y][x].number != number) {
              errormessage = 'multiple numbers to same component not supported';
              console.log(errormessage);
              error = true;
            }
            number = world[y][x].number;
            numbertype = world[y][x].numbertype;
          }
          //if(world[y][x].defsubindex >= -1) defsubindex = world[y][x].defsubindex;
          if(world[y][x].callsubindex >= -1) {
            callsubindex = world[y][x].callsubindex;
          }

          // neighbors
          for(var i = 0; i < 8; i++) { // N, E, S, W ; NE, SE, SW, NW
            var wc2 = getNeighbor(x, y, i);
            if(wc2 == null) continue;
            var x2 = wc2.x;
            var y2 = wc2.y;
            var c2 = wc2.circuitsymbol;
            var ce2 = wc2.circuitextra;

            var z2 = getZ2(c, c2, ce, ce2, i, z); // z coordinate for the neighbor
            if(used[y2][x2][z2]) continue;

            if(!connected(c, c2, ce, ce2, i, z, z2)) continue;
            var fromdir = (i <= 3) ? ((i + 2) & 3) : (4 + ((i - 2) & 3));
            if(!connected(c2, c, ce2, ce, fromdir, z2, z)) continue;

            stack.push([x2, y2, z2]);
            used[y2][x2][z2] = true;
          }
          handleBackPlaneConnections(used, stack, x, y, z);
          handleJunctionConnections(used, stack, x, y);
        }

        if(type == TYPE_NULL && array.length > 0) {
          type = TYPE_LOOSE_WIRE_IMPLICIT;
          for(var i = 0; i < array.length; i++) {
            var c = world[array[i][1]][array[i][0]].circuitsymbol;
            // when using such wires, then it's clear that it's a desired explicit loose wire, not a stray wire
            // part of a V,X,%,& or so that only exists as side effect of those having possibly undesired wires
            // even + and x are considered explicit! Since you can always avoid their extra wire with a different ascii char. Not so for V or % etc....
            if(c == '-' || c == '|' || c == '/' || c == '\\' || c == ',' || c == '*' || c == '+' || c == 'x' ||
                (dinputmap[c] && world[array[i][1]][array[i][0]].circuitextra == 0)) { // only straight inputs considered explicit, diagonal ones may be misplaced ones
              type = TYPE_LOOSE_WIRE_EXPLICIT;
              break;
            }
          }
        }
        if(type == TYPE_ROM && array.length < 2) {
          type = TYPE_NULL;
        }
        if(!corecell && array.length > 0) {
          corecell = world[array[0][1]][array[0][0]];
        }

        if (type != TYPE_NULL) {
          var component;
          if(type == TYPE_LOOSE_WIRE_IMPLICIT && globalLooseWireInstanceI != null) {
            component = globalLooseWireInstanceI;
            for(var i = 0; i < array.length; i++) {
              component.cells.push(array[i]);
            }
          } else if(type == TYPE_LOOSE_WIRE_EXPLICIT && globalLooseWireInstanceE != null) {
            component = globalLooseWireInstanceE;
            for(var i = 0; i < array.length; i++) {
              component.cells.push(array[i]);
            }
          } else {
            //console.log('component: ' + type);
            component = new Component();
            component.type = type;
            component.cells = array;
            component.corecell = corecell;
            component.index = components.length;
            components.push(component);
            component.error = error;
            component.errormessage = errormessage;
            if(type == TYPE_LED) {
              if(numbertype == NUMBER_LED) component.number = number;
            } else if(type == TYPE_TIMER_OFF || type == TYPE_TIMER_ON) {
              if(numbertype == NUMBER_TIMER) component.number = number;
            } else {
              component.number = number;
            }
            //if(type == TYPE_TIMER_OFF && corecell.circuitsymbol == 'r') component.paused = true;
            //if(type == TYPE_TIMER_OFF && corecell.circuitsymbol == 'R') component.paused = false;
            //component.defsubindex = defsubindex;
            if(corecell) component.defsubindex = corecell.defsubindex;
            component.callsubindex = callsubindex;
            if(type == TYPE_LOOSE_WIRE_IMPLICIT) globalLooseWireInstanceI = component;
            if(type == TYPE_LOOSE_WIRE_EXPLICIT) globalLooseWireInstanceE = component;
          }

          for(var i = 0; i < array.length; i++) {
            var x = array[i][0];
            var y = array[i][1];
            var z = array[i][2];
            world[y][x].components[z] = component;
          }
        }
      }
    }
  }

  logPerformance('parseComponents pass 2 begin');

  // PASS 2, now to resolve devices made out of multiple devices (ROM, VTE, FF). TODO: remove more code duplication
  used = initUsed3();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0][0]) continue;
      var c0 = world[y0][x0].circuitsymbol;
      //if(c0 == '#' || c0 == '$') continue; // this is so that we will NOT start parsing with a symbol of which we do not know what component it is. Start with b or B for example so we know it's ROM and correctly handle # extending it (otherwise bug if top row is #)

      var stack = [[x0, y0, 0]];
      used[y0][x0][0] = true;
      var rom = false;
      var mux = false;
      var vte = false;
      var ff = false;
      var error = false;
      var array = [];

      while (stack.length) {
        var s = stack.pop();
        var x = s[0];
        var y = s[1];
        var z = s[2];
        if(x < 0 || x >= w || y < 0 || y >= h) continue;
        var c = world[y][x].circuitsymbol;
        var ce = world[y][x].circuitextra;
        if(!knownmap[c] || world[y][x].comment) continue; // it's an isolator

        array.push(s);

        if(ffmap[c] && world[y][x].components[0].type == TYPE_FLIPFLOP) ff = true;
        if(c == 'T' && world[y][x].components[0].type == TYPE_VTE) vte = true;
        if(c == 'M' && world[y][x].components[0] && world[y][x].components[0].type == TYPE_MUX) mux = true;
        if(c == 'M' && world[y][x].components[1] && world[y][x].components[1].type == TYPE_MUX) mux = true;

        // neighbors
        for(var i = 0; i < 8; i++) { // N, E, S, W ; NE, SE, SW, NW
          var x2 = x + ((i == 1 || i == 4 || i == 5) ? 1 : ((i == 3 || i == 6 || i == 7) ? -1 : 0));
          var y2 = y + ((i == 0 || i == 4 || i == 7) ? -1 : ((i == 2 || i == 5 || i == 6) ? 1 : 0));
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          var c2 = world[y2][x2].circuitsymbol;
          var ce2 = world[y2][x2].circuitextra;

          var z2 = getZ2(c, c2, ce, ce2, i, z); // z coordinate for the neighbor
          if(used[y2][x2][z2]) continue;

          if(rommap[c] && c2 == 'M') continue;
          if(rommap[c2] && c == 'M') continue;

          if(rommap[c] && c2 == 'T') continue;
          if(rommap[c2] && c == 'T') continue;

          if(rommap[c]/* && (rommap[c2] || c2 == '#' || c2 == '$')*/) rom = true;
          if(rommap[c] && !(rommap[c2] || c2 == '#' || c2 == '$')) continue;
          if(rommap[c2] && !(rommap[c] || c == '#' || c == '$')) continue;
          if(rom && i >= 4) continue;

          if(c == 'T') vte = true;
          if(c == 'T' && c2 != 'T') continue;
          if(c2 == 'T' && c != 'T') continue;

          if(c == 'M') mux = true;
          if(c == 'M' && !(c2 == 'M' || c2 == '#' || c2 == '$')) continue;
          if(c2 == 'M' && !(c == 'M' || c == '#' || c == '$')) continue;

          if(ffmap[c] && world[y][x].components[0].type == TYPE_FLIPFLOP) ff = true;
          if((c == '#' || c == '$') && (ffmap[c2] && i < 4 && world[y2][x2].components[0].type == TYPE_FLIPFLOP)) ff = true;
          if(ff && i >= 4) continue;
          if(ff && !(ffmap[c2] || c2 == '#' || c2 == '$')) continue;
          if(ff && !(ffmap[c] || c == '#' || c == '$')) continue;
          // don't support c's and d's touching each other.
          // reason: those are also standalone components and then you want them not grouped if they touch
          if((c == 'c' || c == 'C') && (c2 == 'c' || c2 == 'C')) continue;
          if(c == 'd' && c2 == 'd') continue;
          // Note: for other flipflop parts, such as qq, it is allowed to touch and they are part of same flipflop then.

          if(!rom && !vte && !ff && !mux) {
            if(!connected(c, c2, ce, ce2, i, z, z2)) continue;
            var fromdir = (i <= 3) ? ((i + 2) & 3) : (4 + ((i - 2) & 3));
            if(!connected(c2, c, ce2, ce, fromdir, z2, z)) continue;
            // in addition, for this search we don't go through devices, or other ff elements or extensions
            if(devicemaparea[c] || devicemaparea[c2]) continue;
          }

          stack.push([x2, y2, z2]);
          used[y2][x2][z2] = true;
        }

        if(c == 'M') {
          var x2 = x;
          var y2 = y;
          var z2 = (z == 0) ? 1 : 0;
          if(!used[y2][x2][z2]) {
            stack.push([x2, y2, z2]);
            used[y2][x2][z2] = true;
          }
        }

        handleBackPlaneConnections(used, stack, x, y, z);
        handleJunctionConnections(used, stack, x, y);
      }

      if(rom) {
        var romobject = new ROM();
        var x0 = w, y0 = h, x1 = 0, y1 = 0;
        for(var i = 0; i < array.length; i++) {
          x0 = Math.min(x0, array[i][0]);
          y0 = Math.min(y0, array[i][1]);
          x1 = Math.max(x1, array[i][0] + 1);
          y1 = Math.max(y1, array[i][1] + 1);
        }
        if(!romobject.init1(x0, y0, x1, y1)) {
          console.log('rom error @' + x0 + ',' + y0 + '-' + x1 + ',' + y1);
          romobject.error = true;
        }
      }

      if(mux) {
        var muxobject = new Mux();
        var x0 = w, y0 = h, x1 = 0, y1 = 0;
        for(var i = 0; i < array.length; i++) {
          x0 = Math.min(x0, array[i][0]);
          y0 = Math.min(y0, array[i][1]);
          x1 = Math.max(x1, array[i][0] + 1);
          y1 = Math.max(y1, array[i][1] + 1);
        }
        if(!muxobject.init1(x0, y0, x1, y1)) {
          console.log('mux error @' + array[0][0] + ' ' + array[0][1]);
          muxobject.error = true;
        }
      }

      if(vte) {
        var vteobject = new VTE();
        var x0 = w, y0 = h, x1 = 0, y1 = 0;
        for(var i = 0; i < array.length; i++) {
          x0 = Math.min(x0, array[i][0]);
          y0 = Math.min(y0, array[i][1]);
          x1 = Math.max(x1, array[i][0] + 1);
          y1 = Math.max(y1, array[i][1] + 1);
        }
        if(!vteobject.init1(x0, y0, x1, y1)) vteobject.error = true;
      }

      if(ff) {
        var type = getFFType(array);
        if(type[0] == TYPE_FLIPFLOP) {
          var ffobject = new FF();
          if(!ffobject.init1(array)) ffobject.error = true;
        } else {
          // This part is a bit tricky. Due to the way the parsing works, for flip-flops
          // # and $ is considered separate components. At that stage of parsing it does not yet
          // know if it'll turn out to be a real flip-flop, or a TYPE_DELAY or TYPE_COUNTER, and
          // merging the # or $ there will cause trouble when you have e.g. j#k, as the j and k for sure
          // must not be connected (different outputs requires different components).
          // So if we're a TYPE_DELAY or TYPE_COUNTER, we actually want our #'s to instead
          // be merged with the main core component. And this requires a bit of fixing up.
          // In addition, do the main purpose here, which is to change the type of the TYPE_FLIPFLOP component to the new type
          if(array.length > 0) {
            // find corecell
            var corecell = -1;
            var corecomp = null;
            for(var i = 0; i < array.length; i++) {
              var cell = world[array[i][1]][array[i][0]];
              if(ffmap[cell.circuitsymbol]) {
                corecell = i;
                corecomp = cell.components[0];
                break;
              }
            }
            corecomp.type = type[0];
            corecomp.value = type[1];
            for(var i = 0; i < array.length; i++) {
              var oldcomponent = world[array[i][1]][array[i][0]].components[0];
              if(oldcomponent != corecomp && oldcomponent.index >= 0) {
                mergeComponents(corecomp, oldcomponent);
              }
              world[array[i][1]][array[i][0]].components[0] = corecomp;
            }
          }
        }
      }
    }
  }

  // pass 3: now resolve inputs and outputs of all components
  var inputused = initUsed2();
  for(var i = 0; i < components.length; i++) {
    var component = components[i];
    for(var j = 0; j < component.cells.length; j++) {
      var cellco = component.cells[j];
      var x = cellco[0];
      var y = cellco[1];
      var z = cellco[2];
      var cell = world[y][x];
      var c = cell.circuitsymbol;
      if(!inputmap[c]) continue;
      var x2s = [];
      var y2s = [];
      if(c == 'U' || c == 'G') {
        for(var k = 0; k < 4; k++) {
          var wc2 = getNeighbor(x, y, k);
          if(!wc2) continue;
          var x2 = wc2.x;
          var y2 = wc2.y;
          var c2 = wc2.circuitsymbol;
          if(devicemapin[c2]) {
            x2s.push(x2);
            y2s.push(y2);
            inputused[y2][x2] = true;
          }
        }
      //} else if((c == 'V' || c == 'W') && component.type != TYPE_LOOSE_WIRE_IMPLICIT) {
      } else if((c == 'V' && component.type != TYPE_LOOSE_WIRE_IMPLICIT) || c == 'W') {
        // why not for loose wire: if a V touches an AND with an unused side, then it would be
        // counted as an actual input for the AND and the AND would never work. For other inputs
        // like > it's explicitely pointed at the AND so there it's fine. But for the V, often
        // the V serves just to cross over some other input with the goal of not interfering with
        // this AND at all.
        // It's enabled for W (due to negating this one cannot be ignored), only not for V.
        for(var k = 0; k < 8; k++) {
          var wc2 = getNeighbor(x, y, k);
          if(!wc2) continue;
          var x2 = wc2.x;
          var y2 = wc2.y;
          if(z < 0 || z > 3) continue;
          if(z == 0 && !(k == 1 || k == 3)) continue;
          if(z == 1 && !(k == 0 || k == 2)) continue;
          if(z == 2 && !(k == 5 || k == 7)) continue;
          if(z == 3 && !(k == 4 || k == 6)) continue;
          var c2 = wc2.circuitsymbol;
          if(devicemapin[c2]) {
            x2s.push(x2);
            y2s.push(y2);
            inputused[y2][x2] = true;
          }
        }
      } else if(world[y][x].circuitextra == 2) {
        var wco0 = null;
        var wco1 = null;
        if(c == '^' || c == 'm') { wco0 = getNeighbor(x, y, 7); wco1 = getNeighbor(x, y, 4); }
        if(c == '>' || c == ']') { wco0 = getNeighbor(x, y, 4); wco1 = getNeighbor(x, y, 5); }
        if(c == 'v' || c == 'w') { wco0 = getNeighbor(x, y, 5); wco1 = getNeighbor(x, y, 6); }
        if(c == '<' || c == '[') { wco0 = getNeighbor(x, y, 6); wco1 = getNeighbor(x, y, 7); }
        if(z == 0) {
          if(!wco0) continue;
          if(devicemapin[wco0.circuitsymbol]) {
            x2s.push(wco0.x);
            y2s.push(wco0.y);
            inputused[wco0.y][wco0.x] = true;
          }
        }
        if(z == 1) {
          if(!wco1) continue;
          if(devicemapin[wco1.circuitsymbol]) {
            x2s.push(wco1.x);
            y2s.push(wco1.y);
            inputused[wco1.y][wco1.x] = true;
          }
        }
      } else {
        var dir = -1;

        if(c == '^' || c == 'm') dir = 0;
        if(c == '>' || c == ']') dir = 1;
        if(c == 'v' || c == 'w') dir = 2;
        if(c == '<' || c == '[') dir = 3;
        var wc2 = getNeighbor(x, y, dir);
        if(!wc2) continue;

        //failed attempt at supporting special chip touching input at two sides
        //var x3 = x + (x - x2);
        //var y3 = y + (y - y2);
        //if(world[y3][x3].callsub != 0 && world[y3][x3].callsub == world[y][x].callsub) continue;

        x2s.push(wc2.x);
        y2s.push(wc2.y);
        inputused[wc2.y][wc2.x] = true;
      }
      var negated = false;
      if(c == 'm' || c == ']' || c == 'w' || c == '[' || c == 'G' || c == 'W') negated = true;
      for(var k = 0; k < x2s.length; k++) {
        var x2 = x2s[k];
        var y2 = y2s[k];
        var cell2 = world[y2][x2];
        var c2 = cell2.circuitsymbol;
        if(!devicemapin[c2]) {
          continue;
        }
        var component2 = cell2.components[0]; // component outputs to component2 (component is the input, component2 is the output)
        if(!component2) {
          continue;
        }
        if(component2.master) component2 = component2.master;
        var negated2 = negated;
        component2.inputs.push(component);
        component2.inputs_negated.push(negated2);
        component2.inputs_x.push(x);
        component2.inputs_y.push(y);
        component2.inputs_x2.push(x2);
        component2.inputs_y2.push(y2);
        if(component2.type == TYPE_FLIPFLOP) {
          if(c2 == 'j') component2.input_ff_types.push(1);
          else if(c2 == 'k') component2.input_ff_types.push(2);
          else if(c2 == 'd') component2.input_ff_types.push(3);
          else if(c2 == 't') component2.input_ff_types.push(4);
          else if(c2 == 'q') component2.input_ff_types.push(5);
          else if(c2 == 'Q') component2.input_ff_types.push(6);
          else if(c2 == 'y') component2.input_ff_types.push(7);
          else /*if(c2 == 'c' || c2 == 'C' || c2 == '#')*/ component2.input_ff_types.push(0);
        }
      }
    }
  }

  // parse lonely c's, for packing of flip-flops
  // TODO: also support c's separated with e.g. #'s in between?
  used = initUsed2();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0]) continue;
      if(inputused[y0][x0]) continue;
      var c0 = world[y0][x0].circuitsymbol;
      if(c0 != 'c' && c0 != 'C') continue;

      var stack = [[x0, y0]];
      used[y0][x0] = true;
      var array = [];
      while (stack.length) {
        var s = stack.pop();
        var x = s[0];
        var y = s[1];
        if(x < 0 || x >= w || y < 0 || y >= h) continue;
        var c = world[y][x].circuitsymbol;
        if(c != 'c' && c != 'C') continue;

        array.push(s);

        // neighbors
        for(var i = 0; i < 4; i++) {
          var x2 = x + ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
          var y2 = y + ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          var c2 = world[y2][x2].circuitsymbol;
          if(c2 != 'c' && c2 != 'C') continue;
          if(used[y2][x2]) continue;
          stack.push([x2, y2]);
          used[y2][x2] = true;
        }
      }

      var clockinputs = [];
      for(var i = 0; i < array.length; i++) {
        var x = array[i][0];
        var y = array[i][1];
        if(!inputused[y][x]) continue;
        var component = world[y][x].components[0];
        if(component.master) component = component.master;
        for(var j = 0; j < component.inputs.length; j++) {
          if(component.input_ff_types[j] == 0) {
            clockinputs.push([component.inputs[j], component.inputs_negated[j], component.inputs_x[j], component.inputs_y[j]]);
          }
        }
      }

      for(var i = 0; i < array.length; i++) {
        var x = array[i][0];
        var y = array[i][1];
        if(inputused[y][x]) continue;
        var component = world[y][x].components[0];
        if(component.master) component = component.master;
        for(var j = 0; j < clockinputs.length; j++) {
          component.inputs.push(clockinputs[j][0]);
          component.inputs_negated.push(clockinputs[j][1]);
          component.inputs_x.push(clockinputs[j][2]);
          component.inputs_y.push(clockinputs[j][3]);
          component.inputs_x2.push(-1);
          component.inputs_y2.push(-1);
          component.input_ff_types.push(0);
        }
      }
    }
  }

  for(var i = 0; i < components.length; i++) {
    var component = components[i];
    if(component.rom) {
      if(!component.rom.error && !component.rom.init2()) {
        component.rom.error = true;
        console.log('rom error with component ' + i);
      }
      if(component.rom.error) {
        component.error = true;
        component.errormessage = component.rom.errormessage;
      }
    }
    if(component.mux) {
      if(!component.mux.error && !component.mux.init2()) {
        component.mux.error = true;
        console.log('mux error with component ' + i);
      }
      if(component.mux.error) {
        component.error = true;
        component.errormessage = component.mux.errormessage;
      }
    }
    if(component.vte) {
      if(!component.vte.error && !component.vte.init2()) component.vte.error = true;
      if(component.vte.error) component.error = true;
    }
    if(component.type == TYPE_TRISTATE || component.type == TYPE_TRISTATE_INV) {
      component.tristate = new TriState();
      component.tristate.init(component);
    }
  }

  for(var i = 0; i < components.length; i++) {
    var component = components[i];
    if(component.master && component.master.rom && component.master.rom.error) {
      component.error = true;
    }
    if(component.type == TYPE_ROM && (!component.master && !component.rom)) {
      component.markError('is rom but has no master');
    }
    if(component.master && component.master.mux && component.master.mux.error) {
      component.error = true;
    }
    if(component.type == TYPE_MUX && (!component.master && !component.mux)) {
      component.markError('is mux but has no master');
    }
    if(component.master && component.master.vte && component.master.vte.error) {
      component.error = true;
    }
    if(component.type == TYPE_VTE && (!component.master && !component.vte)) {
      component.markError('is vte but has no master');
    }

    if(component.type == TYPE_LED_RGB) {
      component.sortInputsNESW();
    }
  }

  for(var k in defsubs) {
    defsubs[k].init();
  }

  var defsubs_order_inversed = {};
  for(var i = 0; i < defsubs_order.length; i++) defsubs_order_inversed[defsubs_order[i]] = i;
  callsubs.sort(function(a, b) {
    return defsubs_order_inversed[b.subindex] - defsubs_order_inversed[a.subindex];
  });

  for(var i = 0; i < callsubs.length; i++) {
    var error = !callsubs[i].init(null);
    if(error) {
      if(callsubs[i].master) callsubs[i].master.error = error;
    }
  }

  for(var i = 0; i < callsubs.length; i++) {
    callsubs[i].init2(null);
  }

  var global_counter = false;
  var global_delay = false;
  var global_ff_cycle = false;
  for(var i = 0; i < components.length; i++) {
    var c = components[i];
    if(c.type == TYPE_COUNTER && c.inputs.length == 0) {
      c.type = TYPE_CONSTANT;
    }
    c.ff_cycle = c.hasLength2CycleWithTwoInputs();
    if(c.ff_cycle) global_ff_cycle = true;
    if(c.type == TYPE_FLIPFLOP) global_counter = true;
    if(c.type == TYPE_COUNTER) global_counter = true;
    if(c.type == TYPE_RANDOM) global_counter = true; // it also changes state on edge trigger
    if(c.type == TYPE_DELAY) global_delay = true;
  }

  // NOTE: this currently will not detect some cycles through flip-flops
  // I think that is because I'm using only components.inputs here and maybe I also have to look at component.master
  // but it does not matter really, because this cycle_detected is used only for auto-choosing mode, and
  // if there are flipflops present, it will already choose mode "sequential"
  var cycle_detected = false;
  var graph = {};
  for(var i = 0; i < components.length; i++) {
    graph[i] = {};
    for(var j = 0; j < components[i].inputs.length; j++) {
      graph[i][components[i].inputs[j].index] = true;
    }
  }
  var toposorted = toposort(graph);
  cycle_detected = (toposorted == null);

  // automatically choose a useful mode
  if(AUTO_CHOOSE_MODE) {
    if(global_ff_cycle) {
      // if there is a particular doubly looped cycle like an RS latch core, set to 'electron' mode

      // MODE:electron
      UPDATE_ALGORITHM = 3;
      AUTOUPDATE = 3;
    } else if((cycle_detected && global_counter) || (!cycle_detected && global_delay) || (global_counter && global_delay)) {
      // As soon as the circuit has any loops or delays, the combinational mode does not work and the sequential
      // mode is needed: a single update is no longer guaranteed to bring the circuit to a final stable
      // state.
      // NOTE: replaced by fast now after unification of combinational and sequential

      // MODE:immediate
      UPDATE_ALGORITHM = 1;
      AUTOUPDATE = 3;
    } else if(cycle_detected || global_delay /*the global_delay check is in theory not needed here unless I update the above conditions again*/) {
      // The previous check, which set to MODE:sequential, left out a few cases. Those are set to electron instead of sequential here instead.
      // This is circuits with loops but without any flip-flops or counters. It is more likely that the user intended to make a circuit
      // with electron-like behavior than sequential-like behavior in this case (e.g. a roundloop of or gates)

      // MODE:electron
      UPDATE_ALGORITHM = 3;
      AUTOUPDATE = 3;
    } else {
      // otherwise, by default, set to 'combinational' mode, which has no ticks, only updates when a switch is toggled
      // the circuit should be guaranteed to fully update in a single tick if none of the above conditions triggered
      // NOTE: replaced by fast now after unification of combinational and sequential

      // MODE:immediate
      UPDATE_ALGORITHM = 1;
      AUTOUPDATE = 3;
    }

    var modeindex = origtext.indexOf('MODE:');
    if(modeindex >= 0) {
      if(textHasAt(origtext, modeindex + 5, 'immediate')) {
        UPDATE_ALGORITHM = 1;
        AUTOUPDATE = 3;
      }
      else if(textHasAt(origtext, modeindex + 5, 'electron')) {
        UPDATE_ALGORITHM = 3;
        AUTOUPDATE = 3;
      }
    }

    updateRunningState();
    updateModeButtonText();
    updatePauseButtonText();
  }

  for(var i = 0; i < components.length; i++) {
    components[i].setInitialValue();
  }

  // calculate update order for UPDATE_ALGORITHM=1 to avoid reaching stack limit by using recursion for UPDATE_ALGORITHM = 1 (JS only has a max stack depth of 5000 or so, this can get reached with a 32-bit division circuit)
  // not using toposort here, because we still want to do something meaningful in case of cycles
  components_order = [];
  for(var i = 0; i < components.length; i++) {
    components[i].updated = false;
    /*
    added due to the way master is added, and also because otherwise components_order will be larger than components in the following circuit where a gets parsed before s:
    a<-s
    ^--*
    */
    components[i].added = false;
  }

  for(var i = 0; i < components.length; i++) {
    var c = components[i];
    if(c.updated) {
      continue;
    }
    // somewhat like post order traversal but through graph (simulate recursively calling "update" on inputs before updating self)

    var stack = [c];
    while(stack.length > 0) {
      var t = stack[stack.length - 1];
      if(t.added) {
        stack.pop();
        continue;
      }
      if(t.updated) {
        t.added = true;
        if(t.master && !t.master.added) {
          components_order.push(t.master);
          t.master.added = true;
          t.master.updated = true;
        }
        components_order.push(t);
        stack.pop();
        continue;
      }
      t.updated = true;
      // order inverted here because our stack emulates the function stack, but the order in which the inputs is called should be like a queue, inverting the order does that
      for(var j = t.inputs.length - 1; j >= 0; j--) {
        if(!t.inputs[j].updated) stack.push(t.inputs[j]);
      }
      if(t.master && !t.master.updated) {
        var m = t.master;
        for(var j = m.inputs.length - 1; j >= 0; j--) {
          if(!m.inputs[j].updated) stack.push(m.inputs[j]);
        }
        stack.push(t.master);
      }
    }
  }

  logPerformance('parseComponents done');

  return true; // success
}

// initial render
function initDivs() {
  worldDiv.style.display = 'none'; // making it invisible while rendering makes it faster in some browsers
  worldDiv.innerText = '';

  getNewRenderer().globalInit();

  // y in opposite order: reason: fonts usually have attachments at the bottom, not the top. And sometimes the bottom attachment spills over into the cell below. If the cell below has a background color, it would come on top of the font, clipping it. Doing bottom to to porder makes higher cells be on top of lower cells, fixing that.
  for(var y = h - 1; y >= 0; y--) {
    for(var x = line0[y]; x < line1[y]; x++) {
      world[y][x].initDiv(x, y);
    }
  }
  // The purpose of this div is that you can still scroll a bit lower,
  // to cover the entire world area basically
  makeDiv(w * tw, h * th, 1, 1, worldDiv);
  worldDiv.style.display = 'block';
  renderingMessageDiv.innerText = '';
}

// this is for divs that create canvases (non-empty and non-comment ones), for the slow firefox
function countSlowGraphicalDivs() {
  var count = 0;
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(!world[y][x].comment && world[y][x].circuitsymbol != ' ') count++;
    }
  }
  return count;
}

function setDocumentTitle(text) {
  document.title = 'LogicEmu: ' + text;
  circuitName.innerText = 'Current Circuit: ' + text;
}

var firstParse = true; // to keep scrolled down if you were scrolled down before refresh

//opt_fragmentAction: 0=use id if possible else clear, 1=set from code if possible else clear, 2=keep as-is (e.g. if it's already #code)
function parseText(text, opt_title, opt_registeredCircuit, opt_fragmentAction) {
  if(editmode) return;
  if(firstParse) {
    parseText2(text, opt_title, opt_registeredCircuit, opt_fragmentAction);
    return;
  }
  renderingMessageDiv.innerText = 'rendering';
  // The timeout is so that the 'rendering' text becomes visible first before
  // it starts creating all the divs and canvases.
  // The timeout seems to not always work anyway, so first another trick that
  // may force a redraw
  var dummy = worldDiv.offsetHeight;
  worldDiv.style.display = 'none';
  window.setTimeout(bind(parseText2, text, opt_title, opt_registeredCircuit, opt_fragmentAction), 0);
}

function parseText2(text, opt_title, opt_registeredCircuit, opt_fragmentAction) {
  // for the very first parse, do NOT scroll up, it is handy if you have
  // a big edited circuit open and refresh the browser to still see the
  // same one
  if(!firstParse) {
    window.scrollTo(0, 0);
  }
  firstParse = false;

  worldDiv.style.display = 'none';
  origtext = text;
  origtitle = opt_title;
  console.log(text);

  var opt_id = opt_registeredCircuit ? opt_registeredCircuit.linkid : undefined;

  if(!opt_fragmentAction) {
    if(opt_id && opt_id != introId) {
      setFragment('id', opt_id);
    } else {
      clearFragment();
    }
  }

  if(opt_fragmentAction == 1) {
    var encoded = encodeBoard(text);
    if(encoded.length < 2000) {
      setFragment('code', encoded);
    } else {
      if(getFragmentParameterByName('code')) {
        clearFragment();
      }
    }
  }

  updateCircuitDropdowns(opt_registeredCircuit);

  // remove a first newline if present. typically in long string literal you begin the first line after the quote and really don't want that first empty line created by it
  if(text[0] == '\n') text = text.substr(1); // only the first one, typically in long string literal you begin the first line after the quote and really don't want that first empty line created by it
  // keep other starting newlines: you may want them on purpose to allow scrolling

  var tocPos = text.indexOf('INSERT:toc');
  var tocType = 0;
  if(text.indexOf('INSERT:toc_help') == tocPos) tocType = 1;
  if(text.indexOf('INSERT:toc_main') == tocPos) tocType = 2;
  var tocX = 0;
  var tocY = 0;
  if(tocPos >= 0) {
    var start = tocPos;
    var end = tocPos + 10;
    if(tocType == 1 || tocType == 2) end += 5;
    if(text[start - 1] == '"') {
      start--;
      if(text[start - 1] == '0') start--;
    }
    if(text[end] == '"') end++;
    for(var i = 0; i < start; i++) {
      if(text[i] == '\n') tocY++;
    }
    var newlines = '';
    var numLines = allRegisteredCircuits.length;
    if(tocType == 1) {
      // TODO: get numlines directly from setTocHTML instead
      numLines = 0;
      for(var i = 0; i < allRegisteredCircuits.length; i++) if(allRegisteredCircuits[i].group == 0) numLines++;
    }
    if(tocType == 2) {
      numLines = 0;
      for(var i = 0; i < allRegisteredCircuits.length; i++) if(allRegisteredCircuits[i].group != 0) numLines++;
      numLines++; // circuit 'Help' counted for this one
    }
    for(var i = 1; i < numLines; i++) newlines += '\n';
    text = text.substr(0, start) + newlines + text.substr(end);
  }

  resetForParse();
  startLogPerformance();
  if(!parseCells(text)) return false;

  if(tocPos >= 0) {
    world[tocY][tocX].symbol = 'toc';
    world[tocY][tocX].circuitsymbol = 'toc';
    world[tocY][tocX].displaysymbol = 'toc';
    world[tocY][tocX].metasymbol = 'toc';
    world[tocY][tocX].skipparsing = false;
    world[tocY][tocX].circuitextra = tocType;
    line0[tocY] = 0;
    line1[tocY] = 1;
  }

  logPerformance('parseNumbers begin');
  parseNumbers();
  logPerformance('parseNumbers done');

  logPerformance('parseBackplanes begin');
  convertBackplaneNumbers();
  parseBackplanes();
  logPerformance('parseBackplanes done');

  if(!parseSubs()) return false;

  logPerformance('convertJunctionNumbers begin');
  convertJunctionNumbers();
  logPerformance('convertJunctionNumbers done');


  if(!parseComponents()) return false;

  graphics_mode_actual = graphics_mode;
  if(graphics_mode_browser != graphics_mode_actual && countSlowGraphicalDivs() > 2000) {
    graphics_mode_actual = graphics_mode_browser;
  }
  var graphicsindex = origtext.indexOf('RENDER:');
  if(graphicsindex >= 0) {
    if(textHasAt(origtext, graphicsindex + 7, 'text')) {
      graphics_mode_actual = 0;
    }
    else if(textHasAt(origtext, graphicsindex + 7, 'graphical')) {
      graphics_mode_actual = 1;
    }
  }
  rendererDropdown.selectedIndex = graphics_mode_actual;

  var nonthinw = 0;
  for(var y = 0; y < h; y++) {
    for(var x = 0; x < w; x++) {
      if(world[y][x].circuitsymbol != ' ' && world[y][x].circuitsymbol != '"') nonthinw = Math.max(nonthinw, x);
      if(world[y][x].symbol == '"' && world[y][x].commentalign == -1) nonthinw = Math.max(nonthinw, x);
      if(world[y][x].commentlength > 0 && world[y][x].commentalign != -1) {
        var l = 0;
        if(world[y][x].commentalign == 0) l = Math.ceil(world[y][x].commentlength * 0.66);
        if(world[y][x].commentalign == 1) l = Math.ceil(world[y][x].commentlength * 0.825); // centered, so bit more space used to the right
        if(world[y][x].commentalign == 2) l = world[y][x].commentlength;
        nonthinw = Math.max(nonthinw, x + l);
      }
    }
  }

  var fityindex = origtext.indexOf('FIT:y');
  var fity = 0;
  if(fityindex >= 0) {
    for(var i = 0; i < fityindex; i++) {
      if(origtext[i] == '\n') fity++;
    }
  }

  var fityindex2 = origtext.indexOf('FIT:y', fityindex + 1);
  var fity2 = 0;
  if(fityindex2 >= 0) {
    for(var i = 0; i < fityindex2; i++) {
      if(origtext[i] == '\n') fity2++;
    }
    fity = fity2 - fity;
  }

  var fitrindex = origtext.indexOf('FIT:r');
  var fitr = 0;
  if(fitrindex >= 0) {
    for(var i = 0; i < fitrindex; i++) {
      if(origtext[i] == '\n') fitr = 0;
      fitr++;
    }
  }

  var fitw = (origtext.indexOf('FIT:w') >= 0);

  var fitwidth = true;
  var fitheight = true;
  var docwidth = /*document.body.clientWidth*/window.innerWidth - 8;
  var docheight = /*document.body.clientHeight*/window.innerHeight - 100 - 8;
  if(!docwidth) docwidth = 1000;
  if(!docheight) docheight = 800;
  var h2 = h;
  if(h * 20 > docheight || h > w) { // only very rarely DON't disable fitheight
    if(fity > 0) {
      h2 = fity;
    } else {
      fitheight = false; // if it's very high, then do not try to fit h, use width only, and scroll for h
    }
  }
  if(fitw) {
    if(fity > 0 && fity < h) {
      //if you have both a FIT:w and a FIT:y, then it means:
      //be as wide as possible as you can, while still fitting that what
      //FIT:y asked for. Without FIT:w, the FIT:y might be having no
      //effect when it tries to fit an even higher h. But FIT:w then
      //lets it try to be as wide as possible.
      h2 = fity;
    } else {
      fitheight = false;
    }
  }
  if(fitr) nonthinw = fitr;
  tw = Math.floor(docwidth / (nonthinw + 2));
  th = Math.floor(docheight / (h2 + 2));
  var t = tw;
  if(fitwidth && fitheight) t = Math.min(tw, th);
  else if(fitwidth) t = tw;
  else if(fitheight) t = th;
  if(t < 9) t = 9;
  if(t > 40) t = 40;
  if(h > 80 && t > 28) t = 28;
  th = tw = t;


  logPerformance('initDivs start');
  initDivs();
  logPerformance('initDivs done');

  logPerformance('initial render start');
  if(UPDATE_ALGORITHM == 1) update();
  else render();
  logPerformance('initial render done');

  setDocumentTitle(opt_title || 'unnamed circuit');

  worldDiv.style.display = 'block';
  return true; // success
}

var AUTOPAUSESECONDS = 3000; // for autopauseinterval
var USEAUTOPAUSE = true; // pause after LogicEmu was open in a browser tab for a long time (AUTOPAUSESECONDS seconds)

var autoupdateinterval = null; // for AUTOUPDATE 2 and 3
var timerinterval = null; // for the timer components
var autopauseinterval = null; // I don't want browser to keep ticking in background when you forget about it in a tab

if(AUTOUPDATE == 2 || AUTOUPDATE == 3) autoupdateinterval = setInterval(function(){ update(); }, AUTOSECONDS * 1000);

timerinterval = setInterval(function(){ toggleTimers(); }, TIMERSECONDS * 1000);

if(USEAUTOPAUSE) setAutoPauseInterval();

function setAutoPauseInterval() {
  autopauseinterval = setInterval(function(){
    pause();
    autopaused = true;
  }, AUTOPAUSESECONDS * 1000);
}

function pause() {
  autopaused = false;
  if(autoupdateinterval) {
    clearInterval(autoupdateinterval);
    autoupdateinterval = null;
  }
  if(timerinterval) {
    clearInterval(timerinterval);
    timerinterval = null;
  }
  if(autopauseinterval) {
    clearInterval(autopauseinterval);
    autopauseinterval = null;
  }
  updatePauseButtonText();
  updateTimeButtonBorders();
}

function pauseUpdateOnly() {
  if(autoupdateinterval) {
    clearInterval(autoupdateinterval);
    autoupdateinterval = null;
  }
  updateTimeButtonBorders();
}

function unpause() {
  autopaused = false;
  highlightedcomponent = null;
  if((AUTOUPDATE == 2 || AUTOUPDATE == 3) && !autoupdateinterval) {
    autoupdateinterval = setInterval(function(){ update(); }, AUTOSECONDS * 1000);
  }
  if(!timerinterval)  timerinterval = setInterval(function(){ toggleTimers(); }, TIMERSECONDS * 1000);
  if(USEAUTOPAUSE && !autopauseinterval) {
    setAutoPauseInterval();
    updatePauseButtonText();
  }
  updateTimeButtonBorders();
}

function updateRunningState() {
  unpause(); // Required e.g. when switching from combinational to other modes [TODO: remove need for this so that mode switching allows remaining paused if user paused]
  if((AUTOUPDATE != 2 && AUTOUPDATE != 3) && autoupdateinterval) {
    // we're pausing, but however we still want the timer interval to run
    if(!timerinterval) timerinterval = setInterval(function(){ toggleTimers(); }, TIMERSECONDS * 1000);
    clearInterval(autoupdateinterval);
    autoupdateinterval = null;
  }
  updatePauseButtonText();
}

var menuRows = makeElementAt('div', 0, 0);
menuRows.style.position = 'fixed';
menuRows.style.display = 'block';
menuRows.style.width = '100%';
menuRows.style.height = '100px';

var menuRow1El = makeElementAt('span', 0, 0, menuRows);
var menuRow2El = makeElementAt('span', 0, 48, menuRows);
//var menuRow3El = makeElementAt('span', 0, 80, menuRows);
var menuRow3El = menuRow2El;

menuRows.style.zIndex = 5; // can be anything as long as it's higher than what we assign to editarea

menuRow1El.style.background = '#f8f8f8';
menuRow1El.style.position = 'absolute';
menuRow1El.style.width = '100%';
menuRow1El.style.height = '48px';
menuRow2El.style.background = '#f8f8f8';
menuRow2El.style.position = 'absolute';
menuRow2El.style.width = '100%';
menuRow2El.style.height = '48px';
menuRow3El.style.background = '#f8f8f8';
menuRow3El.style.position = 'absolute';
menuRow3El.style.width = '100%';
menuRow3El.style.height = '48px';

// predesigned algorithm/autoupdate combinations
var modes = [
  ['immediate', 1, 3], // faster than electron: recursively resolved gates, and keeps updating until things stop changing (in combinational circuits, that's after only 1 tick)
  ['electron', 3, 3], // designed for gate-level flip-flops (but the built-in flip flops don't need this mode, those work as ideal flipflop in all modes!)
];
function getMode() {
  for(var i = 0; i < modes.length; i++) {
    if(UPDATE_ALGORITHM == modes[i][1] && AUTOUPDATE == modes[i][2]) {
      return i;
    }
  }
  return -1;
}


var modeDropdown = makeUIElement('select', menuRow3El);
modeDropdown.title = 'Choose Emulation Algorithm. *) immediate: does fast updates (all gates at once in sorted order, or as sorted as possible in case of loops) when using a button or timer. Updates until things stop changing (1 tick for combinational circuits).' +
                     ' *) electron: does slow update (gate-per-gate) every so many milliseconds, emulates flip-flops crafted from gates in more interesting way with even a randomness mechanism to get them out of metastable state.' +
                     ' When loading a new circuit, a mode is automatically chosen as follows: by default, immediate. If a particular type of loop between gates (such as in SR latch) is detected, electron. If any other loop is present: immediate'
                     ;
modeDropdown.onchange = function() {
  var mode = modeDropdown.selectedIndex;
  if(mode >= modes.length) mode = 0;
  UPDATE_ALGORITHM = modes[mode][1];
  AUTOUPDATE = modes[mode][2];
  updateModeButtonText();
  updatePauseButtonText();
  updateRunningState();
};

for(var i = 0; i < modes.length; i++) {
  var el = makeElement('option', modeDropdown).innerText = modes[i][0];
}

function updateModeButtonText() {
  var mode = getMode();
  if(mode == -1) modeDropdown.selectedIndex = -1;
  else modeDropdown.selectedIndex = mode;
}


var tickButton = makeUIElement('button', menuRow3El);
tickButton.innerText = 'tick';
tickButton.title = 'Tick once. This allows ticking the circuit when paused, to investigate the signal. Especially useful in paused electron mode, or paused immediate mode if there are flip-flops or other sequential parts.';
tickButton.onclick = update;

function isPaused() {
  return !timerinterval && !autoupdateinterval;
}

function updatePauseButtonText() {
  pauseButton.innerText = isPaused() ? 'paused' : 'pause';
}
var pauseButton = makeUIElement('button', menuRow3El, 3);
pauseButton.innerText = 'pause';
pauseButton.title = 'pauses running circuit and timers, or enables them again if already paused. If paused, use the tick button to manually advance circuit state step by step instead. If you press switches of the circuit while paused, the update will be visible after you use the tick button.';
pauseButton.onclick = function() {
  if(isPaused()) {
    unpause();
  } else {
    pause();
  }
  updateTimeButtonBorders();
};
updatePauseButtonText();


var slowerButton = makeUIElement('button', menuRow3El, 3);
slowerButton.title = 'slows down simulation';
slowerButton.innerText = 'slow';
slowerButton.onclick = function() {
  AUTOSECONDS = NORMALAUTOSECONDS * 10;
  TIMERSECONDS = NORMALTIMERSECONDS * 10;

  pause();
  unpause();

  updateTimeButtonBorders();
};

var normalButton = makeUIElement('button', menuRow3El, 3);
normalButton.title = 'set to standard speed';
normalButton.innerText = 'norm';
normalButton.onclick = function() {
  AUTOSECONDS = NORMALAUTOSECONDS;
  TIMERSECONDS = NORMALTIMERSECONDS;

  pause();
  unpause();

  updateTimeButtonBorders();
};

var boostButton = makeUIElement('button', menuRow3El, 3);
boostButton.title = 'speeds up simulation, if possible within the computational resources of the web browser';
boostButton.innerText = 'fast';
boostButton.onclick = function() {
  AUTOSECONDS = NORMALAUTOSECONDS / 10;
  TIMERSECONDS = NORMALTIMERSECONDS / 10;

  pause();
  unpause();

  updateTimeButtonBorders();
};

var timebuttons = [pauseButton, slowerButton, normalButton, boostButton];

function updateTimeButtonBorders() {
  var j = 0;
  if(isPaused()) j = 0;
  else if(AUTOSECONDS > NORMALAUTOSECONDS) j = 1;
  else if(AUTOSECONDS == NORMALAUTOSECONDS) j = 2;
  else if(AUTOSECONDS < NORMALAUTOSECONDS) j = 3;
  for (var i = 0; i < 4; i++) {
    if(i == j) {
      highlightUIElementBorder(timebuttons[i], i == 2 ? 'black' : 'red');
    } else {
      styleUIElementBorder(timebuttons[i]);
    }
  }
}


var ticksCounterEl = makeElement('div', menuRow3El);
ticksCounterEl.innerHTML = '&nbspticks:' + numticks;
ticksCounterEl.style.width = '95px';
ticksCounterEl.style.display = 'inline-block';
ticksCounterEl.title = 'Amount of ticks so far. Click to reset to 0. If in electron mode, is per gate ticks. In immediate mode, one tick per full update.';
ticksCounterEl.onclick = function() {
  numticks = 0;
  updateTicksDisplay();
};

function updateTicksDisplay() {
  ticksCounterEl.innerHTML = '&nbspticks: ' + numticks;
}



var rendererDropdown = makeUIElement('select', menuRow2El);
rendererDropdown.title = 'Choose renderer: graphical or text. Graphical is with HTML5 canvas and has better looking wire connections but may be slower for huge circuits. Text mode is faster and is more closely related to how you edit circuits with ASCII text.';
rendererDropdown.onchange = function() {
  graphics_mode = rendererDropdown.selectedIndex;
  graphics_mode_actual = rendererDropdown.selectedIndex;
  initDivs();
  render();
};
makeElement('option', rendererDropdown).innerText = 'text';
makeElement('option', rendererDropdown).innerText = 'graphical';
rendererDropdown.selectedIndex = graphics_mode;

var colorDropdown = makeUIElement('select', menuRow2El, 3);
colorDropdown.title = 'Choose color scheme';
colorDropdown.onchange = function() {
  setLocalStorage(colorDropdown.selectedIndex, 'color_scheme');
  setColorScheme(colorDropdown.selectedIndex);
  initDivs();
  render();
};
makeElement('option', colorDropdown).innerText = 'light';
makeElement('option', colorDropdown).innerText = 'dark';
makeElement('option', colorDropdown).innerText = 'gray';
makeElement('option', colorDropdown).innerText = 'blue';
makeElement('option', colorDropdown).innerText = 'inverted';
colorDropdown.selectedIndex = colorscheme;

var zoomoutButton = makeUIElement('button', menuRow2El, 1);
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

var zoominButton = makeUIElement('button', menuRow2El, 1);
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

makeUISpacer(16, menuRow2El);


var changeDropdownElements = [];

var changeDropdown = makeUIElement('select', menuRow2El);
changeDropdown.title = 'A simpler more primitive form of edit, but it works while a circuit is running. Change the type of a gate, switch or LED to this. First click an option from this list, then the main cell of a device (e.g. the "a" of an AND gate).' +
    ' This is a very limited form of editing. It doesn\'t support creating or removing wire connections. It can only change a device that has one of the types in the list to another type in the list. On other devices it may either do nothing, or cause' +
    ' unexpected behavior. Changes in IC templates have no effect on instances. Changes are not saved and not visible under the edit button. To do full editing, use the edit button instead.';
changeDropdown.onchange = function() {
  changeMode = changeDropdownElements[changeDropdown.selectedIndex];
};

function registerChangeDropdownElement(type) {
  var text = (typesymbols[type] == undefined) ? '[change]' : typesymbols[type];
  if(type == 'rem_inputs') text = 'disconnect inputs';
  if(type == 'c' || type == 'C') text = type;
  var el = makeElement('option', changeDropdown).innerText = text;
  changeDropdownElements.push(type);
}

registerChangeDropdownElement('change');
registerChangeDropdownElement(TYPE_SWITCH_ON);
registerChangeDropdownElement(TYPE_SWITCH_OFF);
registerChangeDropdownElement(TYPE_PUSHBUTTON_ON);
registerChangeDropdownElement(TYPE_PUSHBUTTON_OFF);
registerChangeDropdownElement(TYPE_TIMER_ON);
registerChangeDropdownElement(TYPE_TIMER_OFF);
registerChangeDropdownElement(TYPE_LED);
registerChangeDropdownElement(TYPE_LED_RGB);
registerChangeDropdownElement(TYPE_AND);
registerChangeDropdownElement(TYPE_OR);
registerChangeDropdownElement(TYPE_XOR);
registerChangeDropdownElement(TYPE_NAND);
registerChangeDropdownElement(TYPE_NOR);
registerChangeDropdownElement(TYPE_XNOR);
// For 'c' and 'C' I can unfortunately not use TYPE, because both for on and off it's just called "TYPE_COUNTER", plus it
// needs to choose between constant and counter (handled elsewhere)
registerChangeDropdownElement('c');
registerChangeDropdownElement('C');
registerChangeDropdownElement(TYPE_DELAY);
registerChangeDropdownElement(TYPE_RANDOM);
registerChangeDropdownElement('rem_inputs');


var editmode = false;

var textbeforeedit = '';
var editdiv;
var editarea;
var editButton = makeUIElement('button', menuRow2El, 3);
editButton.innerText = 'edit';
editButton.title = 'Opens text field to edit the map. Press this button again to stop editing and run the new circuit. Read the editing tutorial under "help" first. Advice: for large projects, do not actually edit in the text field because that is fiddly, use a good text editor (that has block selection), or copypaste a circuit in here from an external source. ' +
                   'Once you use edit, the circuit will be saved in local storage (only the most recent one). To remove such save, press the forget button. Local storage is unreliable, so if you made a circuit you want to keep, copypaste it into a text editor and save it as a .txt file on disk instead. Note that nothing gets sent to any server or cloud, everything is' +
                   'local to your computer only.';
editButton.onclick = function() {
  if(!editmode) {
    textbeforeedit = origtext;
    var docwidth = /*document.body.clientWidth*/window.innerWidth - 8;
    var docheight = /*document.body.clientHeight*/window.innerHeight - 100 - 8;
    var fontsize = 10;
    var ewidth = Math.max(w, 40);
    var eheight = Math.min(Math.max(origtext.split('\n').length, 16));
    //editarea = makeAbsElement('textarea', 30, 128, (fontsize + 2) * ewidth, (fontsize + 2) * eheight);
    editarea = makeAbsElement('textarea', 30, 128, docwidth - 80, docheight - 80);
    editarea.rows = eheight;
    editarea.cols = ewidth;
    editarea.value = origtext;
    editarea.style.fontSize = fontsize + 'px';
    editarea.style.zIndex = '1'; // anything as long as it's less than the menu bar
    //worldDiv.style.display = 'none';
    //editarea.style.position = 'fixed';

    pause();
    numticks = 0;
    resetForParse();
    initDivs();

    editButton.innerText = 'done';
    editmode = true;
  } else {
    var newtext = editarea.value;
    document.body.removeChild(editarea);
    editButton.innerText = 'edit';
    editmode = false;
    if(newtext != textbeforeedit) {
      setLocalStorage(newtext, 'circuit_text');
      parseText(newtext, 'edited circuit', undefined, 1);
    } else {
      parseText(newtext, 'edited circuit', undefined, 2);
    }
  }
};


if(getLocalStorage('circuit_text')) {
  var restoreButton = makeUIElement('button', menuRow2El, 3);
  restoreButton.innerText = 'restore';
  restoreButton.title = 'Restore circuit you created before with edit. Only works if an actual circuit was found in local storage.';
  restoreButton.onclick = function() {
    if(maybeLoadFromLocalStorage()) {
      parseText(initialCircuitText, initialTitle, initialId ? linkableCircuits[initialId] : null, 1);
    }
  };

  var forgetButton = makeUIElement('button', menuRow2El, 3);
  forgetButton.innerText = 'forget';
  forgetButton.title = 'If you have edited a circuit, this removes the saved circuit from local storage. If you refresh after pressing this button' +
                       'and also remove URL fragments (#id=... or #code=...), you will no longer see the last circuit you edited, but the default introduction. WARNING! ' +
                       'if you want to keep your circuit, make sure you save it to disk first! That can be done by' +
                       'copypasting it from the edit field into a text editor and saving to your disk, e.g. as a .txt file.';
  forgetButton.onclick = function() {
    setLocalStorage('', 'circuit_text');
    clearFragment();
  };
}

// utility functions to mirror/rotate a whole circuit
// does NOT yet support comments and possibly other things correctly: manual tuning may be needed afterwards

function transpose(text) {
  var hasbackslash = text.indexOf('\\') >= 0;

  var lines = text.split('\n');
  while(lines.length > 0 && lines[0].length == 0) lines.splice(0, 1);
  while(lines.length > 0 && lines[lines.length - 1].length == 0) lines.length--;
  h = lines.length;
  w = 0;
  for(var i = 0; i < lines.length; i++) w = Math.max(w, lines[i].length);
  var grid = [];
  var above = []; // for vertical comments
  for(var y = 0; y < h; y++) {
    grid[y] = [];
    var comment = false;
    var above2 = [];
    for(var x = 0; x < w; x++) {
      var c = x < lines[y].length ? lines[y][x] : ' ';
      if(comment) {
        if(c == '"' || c == '`') {
          c = ':'; // swap this just in case there's a : in regular comment that would prematurely end rotated comment
          comment = false;
        } else if(c == ':') {
          c = '~'; // idem, however " overrules : and due to that we cannot put " inside :. So use ~ as replacement.
        }
      } else if(above[x]) {
        above2[x] = true;
        if(c == ':') {
          above2[x] = false;
          c = '"';
        } else if (c == '"' || c == '`') {
          c = ':';
        } else if (c == '~') {
          c = ':';
        }
      } else {
        if(c == '|') c = '-';
        else if(c == '-') c = '|';
        else if(c == '^') c = '<';
        else if(c == '>') c = 'v';
        else if(c == 'v') c = '>';
        else if(c == '<') c = '^';
        else if(c == 'm') c = '[';
        else if(c == ']') c = 'w';
        else if(c == 'w') c = ']';
        else if(c == '[') c = 'm';
        else if(c == 'n') c = '(';
        else if(c == ')') c = 'u';
        else if(c == 'u') c = ')';
        else if(c == '(') c = 'n';
        else if(c == ':') {
          c = '"';
          above2[x] = true;
        }
        else if(c == '"' || c == '`') {
          c = ':';
          comment = true;
        }
      }
      grid[y][x] = c;
    }
    above = above2;
  }

  var result = '\n';
  for(var x = 0; x < w; x++) {
    for(var y = 0; y < h; y++) {
      result += grid[y][x];
    }
    result += '\n';
  }

  return result;
}

// horizontal mirror
function mirror(text) {
  var hasbackslash = text.indexOf('\\') >= 0;

  var lines = text.split('\n');
  while(lines.length > 0 && lines[0].length == 0) lines.splice(0, 1);
  while(lines.length > 0 && lines[lines.length - 1].length == 0) lines.length--;
  h = lines.length;
  w = 0;
  for(var i = 0; i < lines.length; i++) w = Math.max(w, lines[i].length);
  var grid = [];
  var above = []; // for vertical comments
  for(var y = 0; y < h; y++) {
    grid[y] = [];
    var comment = false;
    var above2 = [];
    for(var x = 0; x < w; x++) {
      var c = x < lines[y].length ? lines[y][x] : ' ';
      if(comment || above[x]) {
        if(above[x]) above2[x] = true;
        if(c == '"') {
          comment = false;
        } else if(c == ':') {
          above2[x] = false;
        }
      } else {
        // TODO: keep multidigit numbers unmirrored, otherwise they may not match up with horizontal numbers
        if(c == '>') c = '<';
        else if(c == '<') c = '>';
        else if(c == ']') c = '[';
        else if(c == '[') c = ']';
        else if(c == ')') c = '(';
        else if(c == '(') c = ')';
        else if(c == '%') c = '&';
        else if(c == '&') c = '%';
        else if(c == '/') c = hasbackslash ? '\\' : BACKSLASH_ALTERNATIVE;
        else if(c == '\\' || c == BACKSLASH_ALTERNATIVE) c = '/';
        else if(c == ':') {
          above2[x] = true;
        }
        else if(c == '"') {
          comment = true;
        }
      }
      grid[y][x] = c;
    }
    above = above2;
  }

  var result = '\n';
  for(var y = 0; y < h; y++) {
    for(var x = 0; x < w; x++) {
      result += grid[y][w - x - 1];
    }
    result += '\n';
  }

  return result;
}

// 0=none, 1=rot90, 2=rot180, 3=rot270, 4=transpose, 5=flipver, 6=antitranpose, 7=fliphor
function transform(text, op) {
  if(op == 0) { // none
    return text;
  } else if(op == 1) { // rotate 90 degrees
    return mirror(transpose(text));
  } else if(op == 2) { // rotate 180 degrees
    return mirror(transpose(mirror(transpose(text))));
  } else if(op == 3) { // rotate 270 degrees
    return transpose(mirror(text));
  } else if(op == 4) { // transpose
    return transpose(text);
  } else if(op == 5) { // flip vertically (= rotate 90, then transpose)
    return transpose(mirror(transpose(text)));
  } else if(op == 6) { // anti-transpose (= rotate 180, then transpose)
    return mirror(transpose(mirror(text)));
  } else if(op == 7) { // mirror horizontally (= rotate 270, then transpose)
    return mirror(text);
  } else {
    return text; // error, unknown op
  }

  /*
  By implementing only horizontal mirror and transpose, we can do all 8 transformation combinations (90 degree rotations, hor/ver mirrors, identity, transpose, and combinations of it)
  The point is, we need to implement the tedious checking for individual parts only twice, not 8 times.
  But of course, different choices than transpose and mirror could have been made. We could as well have implemented rot90 and mirror, rot90 and transpose, ... It does not matter for optimal sequence length unless adding a third helper "rot180"
  If there was also a "rot180" as an extra helper, the longest sequences could be improved... flipver could be mirrorhor+rot180, antitranspose could be rot180+transpose
  With our current 2 transforms, we have one at distance 0, two at distance 1, two at distance 2, two at distance 3 and one at distance 4, and there is no way to improve that with 2 transforms.
  This is logical: our two bidirectional transforms give each transformation two neighbors (that can be reached by 1 transform), not more.
  So it looks like this, when detangled (the lines are alternatingly a mirror and a transpose op but that does not matter for this discussion):
  0-7-3-6
  |     |
  4-1-5-2
  So as you can see, the one that is farthest away from 0, has only paths of length 4 to reach it. There is no way to have a closerby farthest one without making multiple loops hence some unreachable.
  */
}

// 0=none, 1=rot90, 2=rot180, 3=rot270, 4=transpose, 5=flipver, 6=antitranpose, 7=fliphor
function applyTransform(op) {
  var text = transform(origtext, op);
  parseText(text, 'transformed circuit', undefined, 1);
}

// extreme debugging! makes size 8x bigger so use with care!
function applyAllTransforms() {
  var text = '';
  for(var i = 0; i < 8; i++) {
    text += transform(origtext, i) + '\n';
  }
  parseText(text, 'transformed circuit', undefined, 1);
}

function printTransform(text, op) {
  console.log(transform(text, op));
}


var circuitDropdownSpan = makeElement('span', menuRow1El);

var currentSelectedCircuit = 0;

var prevCircuitButton = makeUIElement('button', menuRow1El, 1);
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

var nextCircuitButton = makeUIElement('button', menuRow1El, 1);
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


var importButton = makeUIElement('button', menuRow1El);
importButton.innerText = 'import';
importButton.title = 'Import a circuit from its ASCII diagram copypasted from elsewhere. Paste it into the field that appears and use the buttons to import or cancel. To export or change a circuit instead, use the "edit" button, or create your own circuit in a text editor.';
importButton.onclick = function() {
  if(!editmode) {
    var fontsize = 10;
    var ewidth = 60;
    var eheight = 60;
    editdiv = makeDiv(30-5, 128-5, 400+15, 400+15+30);
    editdiv.style.backgroundColor = '#888';
    editdiv.style.position = 'fixed';
    editarea = makeAbsElement('textarea', 5, 5, 400, 400, editdiv);
    editarea.rows = 40;
    editarea.cols = 40;
    editarea.value = '';
    editarea.style.fontSize = fontsize + 'px';
    editdiv.style.zIndex = '100';
    editarea.focus();

    var donebutton = makeUIElement('button', editdiv);
    donebutton.style.position = 'absolute';
    donebutton.style.left = '330px';
    donebutton.style.top = '415px';
    donebutton.innerText = 'import';
    donebutton.onclick = importButton.onclick;

    var cancelbutton = makeUIElement('button', editdiv);
    cancelbutton.style.position = 'absolute';
    cancelbutton.style.left = '245px';
    cancelbutton.style.top = '415px';
    cancelbutton.innerText = 'cancel';
    cancelbutton.onclick = function() {
      document.body.removeChild(editdiv);
      importButton.innerText = 'import';
      editmode = false;
      unpause();
    };

    pause();
    importButton.innerText = 'done';
    editmode = true;
  } else {
    var newtext = editarea.value;
    document.body.removeChild(editdiv);
    importButton.innerText = 'import';
    editmode = false;
    parseText(newtext, 'imported circuit', undefined, 1);
  }
};


var indexLink = makeElement('span', menuRow1El);
indexLink.title = 'go to the main welcome page and remove tokens from URL';
if(getCGIParameterByName('id')) {
  indexLink.innerHTML = '&nbsp;&nbsp;<a href="' + getUrlWithoutQueries() + '">index</a>';
} else {
  indexLink.innerHTML = 'index';
  indexLink.style.paddingLeft = '10px';
  indexLink.style.color = '#00e';
  indexLink.style.textDecoration = 'underline';
  indexLink.style.cursor = 'pointer';
  indexLink.onclick = function() {
    if(origtext == introText) return;
    parseText(introText, introTitle, linkableCircuits[introId]);
  };
}

var helpLink = makeElement('span', menuRow1El);
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


var githubLink = makeElement('span', menuRow1El);
githubLink.style.paddingLeft = '10px';
githubLink.innerHTML = '<a href="https://github.com/lvandeve/logicemu">github</a>';
githubLink.style.paddingRight = '10px';


var circuitName = makeElement('span', menuRow1El);
circuitName.innerHTML = 'Circuit Name';
circuitName.style.backgroundColor = '#0f0';
circuitName.style.border = '1px solid #080';
circuitName.style.paddingLeft = circuitName.style.paddingRight = '2px';


/*var directLinkSpan = makeElement('span', menuRow1El);
directLinkSpan.innerHTML = '&nbsp;&nbsp;';//<a href="' + getUrlWithoutQueries() + '">direct link</a>';
var directLink = makeElement('a', directLinkSpan);
directLink.innerText = 'direct link';
directLink.href = getUrlWithoutQueries();
directLink.style.visibility = 'hidden';
directLink.title = 'external link to link directly to this circuit rather than the index page';*/


// This button is commented out, because exporting a circuit only makes sense if you edited it, and if you edit circuits you already know how to copypaste their ASCII text from the 'edit' textfield
/*
var exportButton = makeUIElement('button', menuRow1El);
exportButton.innerText = 'export';
exportButton.title = 'Export a circuit. Copypaste its ASCII diagram to store or post it. Then press done (this button itself) to remove the popup textfield. NOTE: nothing gets exported to the cloud. Everything is stored locally and you must copypaste it yourself to share it.';
exportButton.onclick = function() {
  if(!editmode) {
    var fontsize = 10;
    var ewidth = 60;
    var eheight = 60;
    editarea = makeAbsElement('textarea', 30, 128, 400, 400);
    editarea.rows = h;
    editarea.cols = w;
    editarea.value = origtext;
    editarea.style.fontSize = fontsize + 'px';
    editarea.style.whiteSpace = 'nowrap';

    pause();
    exportButton.innerText = 'done';
    editmode = true;
  } else {
    document.body.removeChild(editarea);
    exportButton.innerText = 'export';
    editmode = false;
    unpause();
  }
};*/


// called by footer.js
function maybeLoadFromLocalStorage() {
  // the text you last edited is remembered. To remove the memory, use the edit button, clear the string, and save
  var stored_text = getLocalStorage('circuit_text');
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
  var link_id = getFragmentParameterByName('id');
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
  var code = getFragmentParameterByName('code');
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
  this.circuits = [];
  this.main = makeElement('div', circuitDropdownSpan);
  this.main.style.display = 'inline-block';
  this.title = makeElement('span', this.main);
  this.title.innerText = name;
  makeElement('br', this.main);
  this.dropdown = makeUIElement('select', this.main);
  this.dropdown.style.width = '120px';
  this.dropdown.title = 'Built-in circuit selector dropdown "' + name + '"';
  // disabled, using onclick of element instead
  var that = this;
  this.dropdown.onchange = function() {
    var index = that.dropdown.selectedIndex - 1;
    var c = that.circuits[index];
    currentSelectedCircuit = c.index;
    parseText(c.text, c.title, c);
  };
}

// must use registerCircuitGroup, then register circuits to add them to the last registered circuitgroup
// this is a global variable, designed to use separate .js files which each register one circuit group and then register several circuits in it
var currentCircuitGroup = null;

var circuitGroups = [];

function registerCircuitGroup(name) {
  currentCircuitGroup = new CircuitGroup(name);
  circuitGroups.push(currentCircuitGroup);

  var el = makeElement('option', currentCircuitGroup.dropdown);
  el.innerHTML = '[choose circuit]';
}

var allRegisteredCircuits = [];
var linkableCircuits = {};
var linkableCircuitsOrder = [];

function registerCircuit(name, circuit, opt_link_id, opt_is_title) {
  if(!opt_link_id) opt_link_id = 'circuit' + allRegisteredCircuits.length;
  var dropdownname = name;
  if(opt_is_title && name != '--------') dropdownname = '--- ' + name + ' ---';
  var el = makeElement('option', currentCircuitGroup.dropdown);
  if(opt_link_id == 'mainhelp') { el.style.fontWeight = 'bold'; }
  el.innerHTML = dropdownname;
  var index = allRegisteredCircuits.length;
  var c = {};
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

var introText = `
0"Welcome to LogicEmu, a digital logic simulator!"

0"In circuits, press the green 's' inputs with the mouse to change values."
0"Read results from the red 'l' outputs. For example, below is an AND gate 'a'."
0"Only if both switches are on, the LED will go on. Try enabling both"
0"switches by clicking them:""

  s****>a****>l
        ^
  s******0"AND GATE"

0"There are much more types of gates and devices available: logic gates,"
0"flip-flops, integrated circuits, ROMs, displays, ... Explore the circuits"
0"index below or read the help circuits first to learn more!"

  s**>a**>o**>l"carry"0
     >    ^            s-->jq->l
  s**>e**>a    0"ADDER"s-->c#    0"JK FLIPFLOP"
         >             s-->kQ->l
  s******>e**>l"sum"0


0"Circuits Index"
0"--------------"

0"INSERT:toc_main"


0"You can also use the 'help', 'articles' and 'circuits' dropdowns"
0"and the prev/next buttons in the top bar to navigate to these. You can also"
0"edit or create your own circuits instead."

0"Even this welcome page itself is a circuit, named 'Welcome'"
0"in the 'help' dropdown but hidden in the list and help index above on"
0"purpose to avoid such redundancy."

0"A note about running in the browser"
0"-----------------------------------"

0"LogicEmu runs completely offline, even though it uses JavaScript in a"
0"web browser. Once the HTML and JS got fetched, it does not make any"
0"further connections to any server, cloud or remote storage."

0"If you download the HTML file and the few JS files (with view source"
0"or from github) and save them to disk, you can run LogicEmu locally"
0"without internet."

0"All circuits listed above are already loaded since they are hardcoded"
0"in LogicEmu's source code (all of them, no dynamic requests are done)."

0"If you edit your own circuit, it's only stored in your browsers local"
0"storage (not a cookie), it's not sent anywhere. To share a circuit with"
0"others, you must post its source or base64 URL code somewhere yourself."

0"FIT:w"

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"`;

var introTitle = 'Browser-Based Logic Simulator';

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
