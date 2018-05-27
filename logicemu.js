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

function makeDiv(x, y, w, h, opt_parent) {
  var el =  makeAbsElement('div', x, y, w, h, opt_parent);
  return el;
}

function styleUIElement(el, opt_smallbutton) {
  el.style.border = '1px solid #888';
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

  if (opt_smallbutton) {
    el.style.width = '20px';
  }
}


function makeUIElement(tag, opt_parent, opt_smallbutton) {
  var el = makeElement(tag, opt_parent);
  styleUIElement(el, opt_smallbutton);
  return el;
}

var worldDiv = makeDiv(10, 128, 0, 0);
var renderingMessageDiv = makeDiv(10, 128, 0, 0);

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

// gets CGI parameter from URL
function getParameterByName(name, opt_url) {
  var url = opt_url || window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getUrlWithoutQueries() {
  var url = window.location.href;
  var q = url.indexOf('?');
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
bus = junction = ygroup = y = bundle (current true name: bus. And it means any bundle of wires, like a ribbon cable, not the more complex idea of shared bus in CPU (though it can be used as part of that)
sub = function = integrated circuit = IC = chip = def & call. Now uses symbols i,I. Has used u,U and f,F before. (current true name: I = IC template, i = IC usage, with IC = integrated circuit)
rom = bits = bB. serves also as ram and more (current true name: bits, with usages rom, ram, binary to unary convertor, ...)
terminal = VTE = interactive terminal = keyboard and screen. Now uses symbol T. Has used i before. (current true name: terminal, with symbol T)
global wires = backplane
*/


/*
Good combinations of AUTOUPDATE and UPDATE_ALGORITHM are as follows:
-when working on combinatorial aritmhetic things (adder or multiplier with 7-segment display output, ...): AUTOUPDATE=1, UPDATE_ALGORITHM=1
-when working with flipflops: AUTOUPDATE=2, UPDATE_ALGORITHM=3
-when working on circuits where exact timing through wire is important with loops etc...: AUTOUPDATE=0, UPDATE_ALGORITHM=2
*/

var AUTOUPDATE = 1; // 0: only update on manual tick, 1: update once whenever user switch or real time timer event happened, 2: update all the time, every so many ticks
var UPDATE_ALGORITHM = 2; // 0=scanline, 1=fast recursive, 2=slow, 3=slow with infinite metastability fix

// zoektermen: autochoose auto_choose autoalgo auto_algo
var AUTO_CHOOSE_MODE = true; // automatically choose AUTOUPDATE and UPDATE_ALGORITHM based on the circuit

var numticks = 0;

var origtext = ''; // the currently loaded circuit original text
var origtitle = undefined;

var BACKSLASH_ALTERNATIVE = ';'; // because backslash in `` type strings does not work
var DQUOT_ALTERNATIVE = '`'; // JS strings can use `, in other languages " is already the string quotes
var ASTERIX_ALTERNATIVE = '.'; // because . is easier to write on paper than *

var is_chrome = (navigator.userAgent.indexOf('Chrom') != -1); // 'Chrom' as substring of Chrome/Chromium
var graphics_mode = 1; // 0=text, 1=canvas
//canvas too slow in firefox currently (the method with the many little canvases)
var graphics_mode_browser = is_chrome ? graphics_mode : 0;
var graphics_mode_actual = graphics_mode_browser;

/*
AUTOUPDATE values:
------------------

0: never update unless pressing the "tick" button

1: update when the user presses any input button, or when timers update. This is very useful for combinatorial networks with algorithm 1. However, when things take multiple steps to update, such as other update algorithms, or sequential circuits with any update algorithm, this is useless and 0 (manual ticking) or 2 (realtime ticking) should be used.

2: update automatically every AUTOSECONDS seconds


UPDATE_ALGORITHM info:
----------------------

0: "scanline": Components updated in scanline order and could read inputs from somtimes already-updated, some not-yet-updated components, so e.g. a signal travels faster left to right than right to left. Interestingly, this works best of all with the JK flipflop (simulated at 20Hz, with push button for the clock)

1: "fast": components recursively update their inputs before themselves, for faster propagation. This breaks JK flipflops, round-and-round blinking led loops and most other things with loops.
This algorithm is good for immediate perfect full update in a single tick of final outputs based on user niputs in an asynchronic circuit like a 16-bit adder or multiplier, without any clocks, flipflops or loops

2: "slow": components only update based on the value of its inputs at the previous tick. This can break flipflops, the balance is so perfect that some flipflops can never flip to one state
This algorithm allows the "on" led in the roundabout circuit to travel around circularly, always 1 led is on

3: "twiddled slow": like slow, but with some random probability (customizable, e.g. 10%), a gate does not update [or alternatively uses the previous-previous instead of just previous as input.] This may randomly fix some metastable flipflops..
*/


// [search terms: timerspeed autospeed clockspeed timer_speed auto_seconds timer_seconds]
var AUTOSECONDS = 0.05; // good value: 0.05. computers can handle faster but this makes operating circuits visible
var TIMERSECONDS = 0.1; // default speed of "timer" components in seconds (note that the other timers with numbers are all slower than this). Good value: 1.0 or 0.1
var TWIDDLE_PROBABILITY = 0.1; // for update algorithm 3

// tile size
var tw = 9;
var th = 9;



// component types (not cell types!)
var TYPE_index = 0;
var TYPE_NULL = TYPE_index++; // uninited
var TYPE_LOOSE_WIRE_EXPLICIT = TYPE_index++; // it has no core, it's just a loose wire, always outputs 0 (in real life, would be "floating" instead)
var TYPE_LOOSE_WIRE_IMPLICIT = TYPE_index++; // like TYPE_LOOSE_WIRE_EXPLICIT, but without any explicit added things like -, |, ^, ..., only implicit part of +, x, h, ...
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
var TYPE_FLIPFLOP = TYPE_index++; // "c", "C", and all other FF parts
var TYPE_CONSTANT = TYPE_index++; // also "c", "C", but when they have no inputs. Why it exists: if you use C as constant, you do not want mode to become sequential due to this C, and we auto-set mode to sequential if any TYPE_FLIPFLOP is present
var TYPE_ROM = TYPE_index++;
var TYPE_IC = TYPE_index++; // also called "sub"
var TYPE_IC_PASSTHROUGH = TYPE_index++; // the switch gets internally converted into this. Behaves like OR, but will have always only 1 input
var TYPE_VTE = TYPE_index++;
var TYPE_TRISTATE = TYPE_index++;
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
typesymbols[TYPE_RANDOM] = '?'; typesymbols[TYPE_TRISTATE] = 'V';


// all devices except flipflop, those are treated differently because multiple different cells of its type can form one component
var devicemap = {'a':true, 'A':true, 'o':true, 'O':true, 'e':true, 'E':true, 's':true,
                 'S':true, 'l':true, 'L':true, 'r':true, 'R':true, 'p':true, 'P':true,
                 'j':true, 'k':true, 'd':true, 't':true, 'q':true, 'Q':true, 'c':true, 'C':true,
                 'b':true, 'B':true, 'i':true, 'T':true, 'V':true, '?':true};
var devicemapext = clone(devicemap); devicemapext['#'] = true;
var ffmap = {'j':true, 'k':true, 'd':true, 't':true, 'q':true, 'Q':true, 'c':true, 'C':true};
var rommap = {'b':true, 'B':true};
var inputmap = {'^':true, '>':true, 'v':true, '<':true, 'm':true, ']':true, 'w':true, '[':true, 'z':true, 'Z':true, 'h':true, 'H':true};
var dinputmap = {'^':true, '>':true, 'v':true, '<':true, 'm':true, ']':true, 'w':true, '[':true}; // directional inputs only
var wiremap = {'-':true, '|':true, '+':true, '*':true, ASTERIX_ALTERNATIVE:true, '/':true, '\\':true, 'x':true, 'g':true, 'y':true, '(':true, ')':true, 'n':true, 'u':true, ',':true, '%':true, '&':true, 'X':true}; // TODO: remove antennas from wiremap?
var antennamap = {'(':true, ')':true, 'n':true, 'u':true};
// only those actively interact diagonally (plus diaginputs but those are not identified by character...)
var diagonalmap = {'x':true, 'h':true, 'H':true, '/':true, '\\':true, 'X':true};
//non-isolators (does not include isolators like ' ' and '0-9' despite being "known"). I is also not part of this, but i is.
var knownmap = {'-':true, '|':true, '+':true, '*':true, ASTERIX_ALTERNATIVE:true, '/':true, '\\':true, 'x':true, 'g':true,
                'a':true, 'A':true, 'o':true, 'O':true, 'e':true, 'E':true, 's':true, 'S':true, 'l':true, 'L':true, 'r':true, 'R':true, 'p':true, 'P':true,
                'c':true, 'C':true, 'j':true, 'k':true, 't':true, 'd':true, 'q':true, 'Q':true, 'b':true, 'B':true,
                '^':true, '>':true, 'v':true, '<':true, 'm':true, ']':true, 'w':true, '[':true, 'z':true, 'Z':true, 'h':true, 'H':true,
                '#':true, 'y':true, 'i':true, 'T':true, '(':true, ')':true, 'n':true, 'u':true, ',':true, '%':true, '&':true, 'X':true, '$':true, 'V':true, '?':true,
                'toc':true};
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
        else if(x + 1 < w && y > 0 && world[y - 1][x + 1].circuitsymbol == 'h') dir = 4;
        else if(x + 1 < w && y + 1 < h && world[y + 1][x + 1].circuitsymbol == 'h') dir = 5;
        else if(x > 0 && y + 1 < h && world[y + 1][x - 1].circuitsymbol == 'h') dir = 6;
        else if(x > 0 && y > 0 && world[y - 1][x - 1].circuitsymbol == 'h') dir = 7;
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
      var x = this.externalinputs[i][0];
      var y = this.externalinputs[i][1];
      var dir = -1;
      if(connected2(x, y, 0)) dir = 2;
      else if(connected2(x, y, 1)) dir = 3;
      else if(connected2(x, y, 2)) dir = 0;
      else if(connected2(x, y, 3)) dir = 1;
      else if(connected2(x, y, 4)) dir = 6;
      else if(connected2(x, y, 5)) dir = 7;
      else if(connected2(x, y, 6)) dir = 4;
      else if(connected2(x, y, 7)) dir = 5;
      var v = world[y][x].components[0];
      if(!v) {
        this.markError('component not found for chip template');
        return;
      }
      var tindex = this.translateindex[v.index];
      if(dir >= 0) {
        inputs.push([tindex, dir, x, y]);
      }
    }

    var sortfun = function(a, b) {
      if(a[1] < b[1]) return -1;
      if(a[1] > b[1]) return 1;
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
};

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
      component.prevnumon = v.prevnumon;
      component.ff_cycle = v.ff_cycle;
      component.ff_cycle_time = v.ff_cycle_time;
      component.master = null; // handled further
      component.rom = null; // handled further
      component.ff = null; // handled further
      component.rom_out_pos = v.rom_out_pos;
      component.number = v.number;
      component.defsubindex = v.defsubindex;
      component.callsubindex = v.callsubindex;

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
      if(v.ff) {
        var ff = new FF();
        ff.value = v.ff.value;
        ff.isdelay = v.ff.isdelay;
        component.ff = ff;
      }
      if(v.tristate) {
        var tristate = new TriState();
        tristate.component = component;
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
      if(cell.circuitsymbol == '$') continue;
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
            inputs.push([component.inputs[k], dir, x2, y2, component.inputs_negated[k]]);
          }
          if(connected2(x, y, j)) {
            if(getNeighbor(x, y, j).circuitsymbol != '$') {
              outputs.push([component, j, x, y]);
            }
          }
        }
      }
    }

    var defsub = defsubs[this.subindex];
    if(!defsub) { this.markError('called defsub does not exist, id: ' + this.subindex); return false; };
    if(defsub.error) { this.markError(defsub.errormessage); return false; };
    this.defsub = defsub;
    if(!this.copyComponents(parent)) { this.markError('copyComponents failed'); return false; };

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
      this.markError('unequal inputs amount in ' + this.subindex + ': call: ' + inputs.length + ', def: ' + defsub.inputs.length);
      return false;
    }
    if(outputs.length != defsub.outputs.length) {
      this.markError('unequal outputs amount in ' + this.subindex + ': call: ' + outputs.length + ', def: ' + defsub.outputs.length);
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
        if(x < 0) { x = this.x1 - 1; y--; }
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

    this.output[this.numoutputs] = this.keybuffer.length == 0; // eof

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
    var readheading = -1;
    var readdir = -1;
    var ilsbpos = -1;
    var olsbpos = -1;

    for(var i = 0; i < 4; i++) {
      if(io[i][1] == 0 && io[i + 4][1] == 0) {
        // nothing, that is ok
      } else if(io[i + 4][1] > 1) {
        if(outheading != -1) return null; // there may only be 1 valid candidate
        if(io[i][1] > 0) return null; //error: there may not be inputs on the output side
        outheading = i;
        outdir = (i & 1);
        olsbpos = (i == 0 || i == 3) ? 1 : 0;
      } else if(io[i][1] > 1) {
        if(inheading != -1) return null; // there may only be 1 valid candidate
        if(io[i + 4][1] > 0) return null; //error: there may not be outputs on the input side
        inheading = i;
        indir = (i & 1);
        ilsbpos = (i == 1 || i == 2) ? 1 : 0;
      } else  if(io[i][1] == 1 && io[i + 4][1] == 0) {
        if(writeheading != -1) return null; // there may only be 1 valid candidate
        writeheading = i;
        writedir = (i & 1);
        //ilsbpos = (i == 1 || i == 2) ? 1 : 0;
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

    if(readheading == -1 && writeheading == -1 && outheading == -1 && inheading != -1) {
      this.decimaldisplay = true;
    } else if(readheading == -1 && writeheading != -1 && outheading == -1 && inheading == -1) {
      inheading = writeheading;
      writeheading = -1;
      this.decimaldisplay = true;
    } else if(readheading == -1 && writeheading == -1 && outheading != -1 && inheading == -1) {
      this.decimalinput = true;
    } else {
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
  Sorts as follows:
  -inputs from lsb to msb
  -the write input
  The given dirs are headings (NESW)
  Also handles outputs.
  */
  this.sortInputs = function(dirs) {
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
    this.sortInputs(dirs);

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

// flip flop
function FF() {
  this.cells = [];
  this.isdelay = false;

  this.value = false;

  this.update = function(inputs) {
  };

  // init before inputs are resolved
  // returns true if ok, false if error
  this.init1 = function(array) {
    var array2 = [];
    var numc = 0;
    var numC = 0;
    var numQ = 0;
    var numff = 0;
    var numd = 0;
    for(var i = 0; i < array.length; i++) {
      var cell = world[array[i][1]][array[i][0]];
      array2.push(cell);
      if(cell.circuitsymbol == 'C') this.value = true;

      if(cell.circuitsymbol == 'C') numC++;
      if(cell.circuitsymbol == 'c') numc++;
      if(cell.circuitsymbol == 'Q') numQ++;
      if(cell.circuitsymbol == 'd') numd++;
      if(ffmap[cell.circuitsymbol]) numff++;
    }

    if(numff == 1 && numd == 1) this.isdelay = true;


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
The tristate component 'V': is a fake component that acts somewhat like a tristate buffer in real life,
except we don't actually have 3 states here (high impedance/floating is treated the same as zero, because
the simulation only supports two states).
Unlike other components, multiple V's can output to the same wire. Internally this group of V's and wires
is actually a single component, which exists out of multiple tristate buffers all outputting to the same wire.
Every V that is part of it must have exactly 1 or 2 inputs. If the AND of these 2 inputs is true, then the entire
components outputs (and this applies to any V).
NOTE:
-In real life, a tristate buffer can output 3 possible levels: low voltage, high voltage, or high impedance, which is like having no connection at all (switch open)
--> In the simulation, this third state "high impedance" aka "floating" aka "disconnected" aka "Z" is NOT supported. It still outputs only 0 or 1 here, the simulation treats high impedance exactly like zero.
-In real life, if multiple tristate buffers output to the same wire, then all except one must be high impedance, otherwise there can be a short (or at least a conflict)
--> In the simulation, that error condition is not indicated as an error (This is a TODO), instead the OR is taken (without using 'V' the error condition is immediately shown though)
-In real life, a tristate buffer has 2 inputs: one that turns it between high impedance and signal, and the other is the signal
--> In the simulation, there are also up to 2 inputs, but they both do the same thing rather than being different (they AND here), but the intention of using 'V' instead of 'a' is to actually show this
    to the viewer and point out they need to interpret it as how it would be in real life.
*/
function TriState() {
  this.component = null;

  // must be called after inputs are resolved
  this.init = function(component) {
    // we sort the inputs such that each group of inputs pointing to the same 'V' are after each other
    this.component = component;
    var array = [];
    for(var i = 0; i < component.inputs.length; i++) array[i] = i;
    /*if((array.length & 1) != 0) {
      component.error = true;
      component.errormessage = 'Invalid tristate buffer input combination, each V must have 1 pair';
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
        component.errormessage = 'Invalid tristate buffer input combination, each V must have 1 pair';
        return;
      }
    }*/

    for(var i = 0; i + 2 < component.inputs.length; i++) {
      if(component.inputs_x2[i] == component.inputs_x2[i + 1] &&
         component.inputs_x2[i] == component.inputs_x2[i + 2] &&
         component.inputs_y2[i] == component.inputs_y2[i + 1] &&
         component.inputs_y2[i] == component.inputs_y2[i + 2]) {
        component.error = true;
        component.errormessage = 'Invalid tristate buffer input combination: max 2 inputs per V. More makes no sense IRL so we do not simulate it to avoid confusion.';
        return;
      }
    }
  };

  this.update = function() {
    var component = this.component;
    // given the order created by init, we simply have to check for each consecutive pair of inputs, if their 'AND' is on
    // NOTE: in theory, if there are multiple pairs that are on, this should result in an error! But we don't support dynamic errors. So they get OR-ed instead.
    var on = false;
    var prevx = -1;
    var prevy = -1;
    if(component.inputs.length > 0) {
      prevx = component.inputs_x2[0];
      prevy = component.inputs_y2[0];
    }
    var v = true;
    for(var i = 0; i < component.inputs.length; i++) {
      var value = component.inputs[i].value;
      if(component.inputs_negated[i]) value = !value;
      if(!value) v = false;
      var x = -2;
      var y = -2;
      if(i + 1 < component.inputs.length) {
        x = component.inputs_x2[i + 1];
        y = component.inputs_y2[i + 1];
      }
      if(x != prevx || y != prevy) {
        prevx = x;
        prevy = y;
        if(v) {
          on = true;
          break;
        }
        v = true;
      }
    }
    return on;
  };
}

var ygroups = []; // this are busses in fact. named ygroup here because the letter y is used to draw them...

function YGroup() {
  // object, index is number. Value is array of coordinates that have this number.
  this.connections = {};
}

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
  this.prevnumon = 0;
  this.ff_cycle = false;
  this.ff_cycle_time = 0;
  this.input_ff_types = []; // only used by flipflops. 0=c, 1=j, 2=k, 3=d, 4=t, 5=q, 6=Q
  this.master = null; // master component for rom, vte, ...
  this.rom = null; // used if this is a master of rom
  this.vte = null;
  this.ff = null;
  this.tristate = null;
  this.rom_out_pos = -1;
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

  this.markError = function(message) {
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
  }

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
    } else if(this.type == TYPE_FLIPFLOP) {
      return this.value; // counter NOT implemented in this function. Uses too much different variables.
    } else if(this.type == TYPE_ROM) {
      return this.value; // rom NOT implemented in this function, but elsewhere
    } else if(this.type == TYPE_VTE) {
      return this.value; // NOT implemented in this function, but elsewhere
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


    this.prevvalue = this.value = value;
  };

  this.update = function() {
    if(this.updated) return;
    this.updated = true;
    if(this.master) this.master.update();
    var numon = 0;
    var numoff = 0;

    var numc = 0; // for counter, not updated for other types
    var numf0 = 0;
    var numf1 = 0;
    var numF0 = 0;
    var numF1 = 0;
    var numq = 0;
    var numQ = 0;
    var rom_inputs = []; // only filled in if this is ROM

    if(UPDATE_ALGORITHM == 3 && this.ff_cycle && this.ff_cycle_time > 5 && this.type != TYPE_FLIPFLOP && Math.random() < TWIDDLE_PROBABILITY) return;

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
        if(this.type == TYPE_FLIPFLOP /*&& component2.type == TYPE_FLIPFLOP*/) value2 = component2.prevvalue; // otherwise shift registers don't work as intended with D flipflops made from counters
      } else if(UPDATE_ALGORITHM == 1) {
        // recursive fast algorithm
        if(!component2.updated) {
          // this can happen if the cells were wrongly sorted for the fast update algorithm, but also simply if there are loops. So no action taken (we could have printed error in console or this.markError here, but then loops would not be supported)
        }
        value2 = component2.value;
        if(this.type == TYPE_FLIPFLOP /*&& component2.type == TYPE_FLIPFLOP*/) value2 = component2.prevvalue; // otherwise shift registers don't work as intended with D flipflops made from counters
      } else if(UPDATE_ALGORITHM == 2) {
        // slow algorithm, components only update based on previous value of inputs
        value2 = component2.prevvalue;
      } else if(UPDATE_ALGORITHM == 3) {
        // also slow algorithm, but as seen elsewhere this component has small chance to not update this tick
        value2 = component2.prevvalue;
      }
      value2 = (value2 != negated);
      if (value2) numon++;
      else numoff++;

      if(this.type == TYPE_FLIPFLOP) {
        if(this.ff) {
          var prevvalue2 = (this.previnputs[i] == undefined) ? value2 : this.previnputs[i];
          this.previnputs[i] = value2;
          if(this.input_ff_types[i] == 0) { // c
            if(value2 && !prevvalue2) numc++;
          } else if(this.input_ff_types[i] == 1) { // j
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
          }
        }
      }

      if(this.type == TYPE_ROM || this.type == TYPE_LED_RGB || this.type == TYPE_VTE) {
        rom_inputs[i] = value2;
      }
    }

    if(this.type == TYPE_ROM) {
      if(this.master) {
        if(this.rom) this.rom.update(rom_inputs);
        var rom = this.rom || this.master.rom;
        this.value = rom.output[this.rom_out_pos];
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
      if(this.ff && !this.ff.isdelay) {
        //we do not take the positive edge of the xor "e", but instead the xor of the positive edges. Otherwise while one input is high, a second input would be negative edge triggered. So we use num instead of e here.
        var clocked = (numc & 1);

        if(numQ && numq) {
          this.ff.value = !this.ff.value;
        } else if(numQ) {
          this.ff.value = false; // asynch reset (takes priority over set)
        } else if(numq) {
          this.ff.value = true; // asynch set
        } else if(clocked) {
          if((numf1 && numF1) || (!numf1 && !numf0 && !numF1 && !numF0)) {
            this.ff.value = !this.ff.value; // toggle
          } else if(numf1) {
            this.ff.value = true; // set
          } else if(numF1) {
            this.ff.value = false; // reset
          }
        }
      }
      else if(this.ff && this.ff.isdelay) {
        //this.ff.value = this.ff.prevvalued || false;
        //this.ff.prevvalued = numon;

        if(this.number > 1 && this.number <= 256) {
          if(!this.reg) {
            this.reg = [];
            this.regpos = 0;
            for(var r = 0; r < this.number; r++) this.reg[r] = false;
          }
          this.reg[this.regpos] = numon;
          this.regpos++;
          if(this.regpos >= this.number) this.regpos = 0;
          this.ff.value = this.reg[this.regpos];
        } else {
          this.ff.value = numon;
        }
      }

      if(this.ff || (this.master && this.master.ff)) {
        var value = this.master ? this.master.ff.value : this.ff.value;
        // The output value of these particular cells of a flip flop, are inverted. Reading from Q gives inverted of what flip flops' full state is.
        if(this.corecell.circuitsymbol == 'Q' || this.corecell.circuitsymbol == 'k') value = !value;
        this.value = value;
      } else {
        // It's a TYPE_FLIPFLOP but it has no ff. This is normally not possible, except if a user used the '[change]' dropdown to change a logic
        // gate into a C. That means it's desired to act like a counter. So below is the code for doing so without using the 'ff' class.
        //console.log('suspicious: ff component without ff field');
        var trigger = (numon > this.prevnumon && ((this.prevnumon - numon) & 1)); // positive edge
        if(trigger) {
          this.value = !this.value;
        }
        this.prevnumon = numon;
      }
    } else if(this.type == TYPE_TRISTATE) {
      this.value = this.tristate.update();
    } else if(this.type == TYPE_TIMER_OFF) {
      this.value = false;
    /*} else if(this.type == TYPE_TIMER_ON) {
      this.value = this.clocked && this.getNewValue(numon, numoff);*/
    } else if(this.type == TYPE_RANDOM) {
      //var trigger = (numon > this.prevnumon && ((this.prevnumon - numon) & 1)); // positive edge
      var trigger = ((this.prevnumon - numon) & 1); // pos or neg edge
      if(trigger) {
        this.value = (Math.random() < 0.5);
      }
      this.prevnumon = numon;
    } else {
      // regular gate, not flip-flop
      this.value = this.getNewValue(numon, numoff);
      if(this.value != this.prevvalue) this.ff_cycle_time++;
      else this.ff_cycle_time = 0;
    }

    //console.log('updated: ' + this.index + ' ' + this.corecell.symbol + ' ' + this.corecell.x + ' ' + this.corecell.y);
  };

  this.mousedown = function(e, x, y) {
    if(toggleMode) {
      toggleMode = false;
      this.value = !this.value;
      if(this.type == TYPE_PUSHBUTTON_OFF) {
        this.type = TYPE_PUSHBUTTON_ON;
      } else if(this.type == TYPE_PUSHBUTTON_ON) {
        this.type = TYPE_PUSHBUTTON_OFF;
      }
      render();
      return;
    }
    if(changeMode) {
      var value = this.value;
      var type = changeMode;
      var symbol = typesymbols[type];
      if(changeMode == 'c') {
        type = this.inputs.length ? TYPE_FLIPFLOP : TYPE_CONSTANT;
        value = false;
        symbol = 'c';
      }
      if(changeMode == 'C') {
        type = this.inputs.length ? TYPE_FLIPFLOP : TYPE_CONSTANT;
        value = true;
        symbol = 'C';
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
    sequential_mode_changed = true;
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
    sequential_mode_changed = true;
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
    if(e.code == 'Backspace') {
      // do nothing. onkeydown does backspace already.
      // chrome only handles backspace in onkeydown, while firefox
      // handles it in both onkeypress and onkeydown
    } else {
      var key = e.which || e.charCode || e.keyCode || 0;
      activeVTE.typeKeyboard(key);
    }
    // use render() if no update of components should be done but you still want to see the
    // new character appear. Use update() to do a full component update, similar to what
    // is done after pressing on button with mouse.
    //render();
    update();
  }
};

document.body.onkeydown = function(e) {
  if(activeVTE && e && e.code == 'Backspace') {
    activeVTE.doBackspace();
    update();
  }
};

var lastmousedowncomponent = null;

var toggleMode = false;
var changeMode = null;


// red, orange, yellow, green, blue, violet, pink, white
var led_off_colors = ['#d66', '#d96', '#dd6', '#6d6', '#66d', '#60d', '#d66', '#666'];
var led_fg_colors = ['red', '#a40', '#880', 'green', '#44f', '#80f', 'd58', 'white'];
var led_bg_colors = ['#faa', '#fca', '#ff4', '#afa', '#bdf', '#a8f', 'fdd', 'ccc'];
var led_light_bg_colors = ['#fffafa', '#fffcfa', '#fffff4', '#fafffa', '#fbfdff', '#faf8ff', 'fffdfd', 'fcfcfc'];
var led_light_fg_colors = ['#fcc', '#fa8', '#cc2', '#afa', '#ddf', '#d8f', 'fac', '#fff'];

// RGBY order: bit 1: red, bit 2: green, bit 4: blue
// black, red, green, yellow, blue, magenta, cyan, white
// the RGB led can make cyan, magenta and black, regular leds can make orange, violet and pink
var rgb_led_fg_colors = ['#333', '#f88', '#8f8', '#ff8', '#ccf', '#f8f', '#8ff', '#000'];
var rgb_led_bg_colors = ['#000', '#f00', '#0f0', '#ff0', '#00f', '#f0f', '#0ff', '#eee'];


// I wanted to use CSS animation instead of this javascript solution, but it turns out the CSS animation uses extreme amount of CPU, at least so much that a flash game in a different window of chrome goes slower.
var globalSingleBlinkingCursor = null;
function registerBlinkingCursor(div) {
  if (div == globalSingleBlinkingCursor) return;

  if (globalSingleBlinkingCursor) {
    globalSingleBlinkingCursor.style.backgroundColor = '#000';
  }


  var blink = function() {
    if (!globalSingleBlinkingCursor.parentNode) {
      globalSingleBlinkingCursor = null;
      return;
    }

    if(globalSingleBlinkingCursor.blinkOn) {
      globalSingleBlinkingCursor.style.backgroundColor = '#000';
      globalSingleBlinkingCursor.blinkOn = false;
    } else {
      globalSingleBlinkingCursor.style.backgroundColor = '#0a0';
      globalSingleBlinkingCursor.blinkOn = true;
    }

    window.setTimeout(blink, 500);
  };

  var initial = !globalSingleBlinkingCursor;
  globalSingleBlinkingCursor = div;
  if(initial) blink();
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
  this.ygroup = null;
  this.defsubindex = -2; // define sub (capital I). >=-1 means it's part of a sub, indicated with a capital I and that number (-1 means no number - still to be distinguished from 0!)
  this.callsubindex = -2; // use sub (small i)
  this.callsub = null; // the CallSub
  this.commentalign = -1;
  this.commentlength = 0;
  this.antennax = -1; // horizontal matching antenna, if any
  this.antennay = -1; // vertical matching antenna, if any
  this.drawchip = false; // when drawing the 'i' of a chip in canvas mode, only do it if this is true, it indicates a good looking "core" cell for it (next to number, ...)

  this.renderer = null;

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
      value = rom.selected[index];
    }

    if(digitmap[this.displaysymbol]/*this.circuitsymbol == 'y'*/) {
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
      if(c == 's' || c == 'S') title = 'switch';
      if(c == 'p' || c == 'P') title = 'pushbutton';
      if(c == 'r' || c == 'R') title = 'timer';
      if(c == 'l') title = 'LED';
      if(c == 'L') title = 'RGB LED';
      if(c == '?') title = 'random generator';
      if(c == 'a') title = 'AND gate';
      if(c == 'A') title = 'NAND gate';
      if(c == 'o') title = 'OR gate';
      if(c == 'O') title = 'NOR gate';
      if(c == 'e') title = 'XOR gate';
      if(c == 'E') title = 'XNOR gate';
      if(c == 'c' || c == 'C') {
        if(this.components[0] && this.components[0].type == TYPE_CONSTANT) {
          if(c == 'c') title = 'constant off';
          if(c == 'C') title = 'constant on';
        } else {
          title = 'counter or flipflop clock input';
        }
      }
      if(c == 'd') title = 'delay or flipflop D input';
      if(c == 't') title = 'flipflop T input';
      if(c == 'j') title = 'flipflop J input';
      if(c == 'k') title = 'flipflop K input';
      if(c == 'q') title = 'flipflop output and async set';
      if(c == 'Q') title = 'flipflop inverted output and async reset';
      if(c == 'V') title = 'tristate buffer';
      if(c == 'g') title = 'global (backplane) wire';
      if(c == 'I') title = 'IC definition';
      if(c == 'i') title = 'IC instance';
      if(c == 'b' || c == 'B') title = 'ROM/RAM bit, or encoder/decoder';
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
  }

  // must be called after components are parsed
  this.initDiv = function(x, y) {
    // do not make unneeded divs, large rendering speedup
    // make one on the last row though, if user added empty rows they want some scrolling space there
    if(this.displaysymbol == ' ' && !(x == 0 && y == h - 1)) return;

    if(graphics_mode_actual == 0) {
      this.renderer = new RendererText();
    } else {
      this.renderer = new RendererImg();
    }

    //toggleMode aka clickFun
    var f = bind(function(component, x, y, e) {
      clearSelection(); // we allow selection of comments, but not of other items because it's annoying that selections appear when double clicking. However, do clear the comment selection if it happens to exist when clicking anything.
      e.stopPropagation();
      e.preventDefault();
      if(!toggleMode && !changeMode) lastmousedowncomponent = component;
      if(component) component.mousedown(e, x, y);
      if(AUTOUPDATE == 1) update();
      if(isPaused()) unpause();
      if(CLICKDEBUG) {
        console.log('===================');
        console.log('CLICKDEBUG enabled!');
        console.log('===================');
        var w = world[y][x];
        console.log('x: ' + x + ', y: ' + y + ', circuitsymbol: ' + w.circuitsymbol);
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
      sequential_mode_changed = true;
      return false;
    }, this.components[0], x, y);

    this.renderer.init(this, x, y, f);
    this.initDiv2();
  };
}

function Renderer() {
  // one time initialization
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
};



function setTocHTML2(el) {
  el.innerText = '';
  var html = '';
  for(var i = 0; i < allRegisteredCircuits.length; i++) {
    //var div = makeDiv(0, (i * th), w * tw, th, el);
    var div = makeDiv(0, (i * th), tw, th, el);
    div.style.width = '800px';
    var span = makeElementAt('span', 0, 0, div);
    var id = allRegisteredCircuits[i].linkid;
    var circuit = allRegisteredCircuits[i].text;
    var title = allRegisteredCircuits[i].title;
    span.innerText = title;
    div.style.textAlign = 'left';
    if(allRegisteredCircuits[i].istitle/* == 1*/) {
      span.style.color = '#000';
    } else {
      span.style.color = '#00e';
      span.style.textDecoration = 'underline';
      span.style.cursor = 'pointer';
      span.onclick = bind(function(circuit, title, id, index) {
        parseText(circuit, title, id);
        currentSelectedCircuit = index;
      }, circuit, title, id, i);
    }
  }
}

function setTocHTML(el) {
  el.innerText = '';
  var html = '';
  for(var i = 0; i < linkableCircuitsOrder.length; i++) {
    //var div = makeDiv(0, (i * th), w * tw, th, el);
    var div = makeDiv(0, (i * th), tw, th, el);
    div.style.width = '800px';
    var id = linkableCircuitsOrder[i];
    var circuit = linkableCircuits[id][1];
    var title = linkableCircuits[id][0];
    div.innerText = title;
    div.style.textAlign = 'left';
    div.style.color = '#00';
    div.style.textDecoration = 'underline';
    div.style.cursor = 'pointer';
    div.onclick = bind(function(circuit, title, id, index) {
      parseText(circuit, title, id);
      currentSelectedCircuit = index;
    }, circuit, title, id, linkableCircuits[id][2]);
  }
}

// alternative to setTocHTML
function setLinkHTML(el) {
  el.innerText = '';
  var html = '';

  var url = getUrlWithoutQueries();

  for(var i = 0; i < linkableCircuitsOrder.length; i++) {
    var div = makeDiv(0, (i * th), w * tw, th, el);
    var id = linkableCircuitsOrder[i];
    div.style.textAlign = 'left';
    var circuit = linkableCircuits[id][1];
    var title = linkableCircuits[id][0];
    var link = url + '?id=' + linkableCircuitsOrder[i];
    if(id == 'welcome') link = url;
    var a = makeElement('a', div);
    a.innerText = title;
    a.href = link;
  }
}

/** @implements Renderer */
function RendererText() {
  this.prevvalue = -1;
  this.prevchar = -1;
  this.div0 = null; // div for off style
  this.div1 = null; // div for on style
  this.init2done = false;


  // one time initialization
  this.init = function(cell, x, y, clickfun) {
    this.div0 = makeDiv(x * tw, y * th, tw, th, worldDiv);
    this.div1 = makeDiv(x * tw, y * th, tw, th, worldDiv);

    this.div0.onmousedown = clickfun;
    this.div1.onmousedown = clickfun;
  };

  // specific initialization, can be re-done if cell changed on click
  this.init2 = function(cell, symbol, virtualsymbol, opt_title) {
    if(symbol == ' ') return;

    if (!this.init2done) {
      // setting innerText is noticably faster than setting innerHTML!
      this.div0.style.color = '#999';
      this.div0.style.textAlign = 'center';
      this.div0.style.fontSize = tw + 'px';
      this.div0.style.fontFamily = 'monospace';
      this.div1.style.color = 'black';
      this.div1.style.textAlign = 'center';
      this.div1.style.fontSize = tw + 'px';
      this.div1.style.fontFamily = 'monospace';
      this.div1.style.fontWeight = 'bold';
      this.div0.style.backgroundColor = '';
      this.div1.style.backgroundColor = '';
    }

    this.div0.innerText = symbol;
    this.div1.innerText = symbol;

    if(cell.comment) {
      this.div0.style.color = '#000';
      this.div0.style.backgroundColor = '#fff6ea';
      //this.div0.style.fontWeight = 'bold';

      //this.div1.style.color = '#940';
      //this.div1.style.fontWeight = 'bold';

      // allow the text to go to the right
      if(cell.commentalign != -1) {
        this.div0.style.whiteSpace = 'pre';
        this.div1.style.whiteSpace = 'pre';
        //this.div0.style.width = '' + (tw * cell.commentlength) + 'px';
        this.div0.style.width = ''; // make it as wide as the text itself, which looks better if a background is enabled for it
        if(cell.commentalign == 0) this.div0.style.textAlign = 'left';
        else if(cell.commentalign == 1) this.div0.style.textAlign = 'center';
        else if(cell.commentalign == 2) this.div0.style.textAlign = 'right';
      }

      // allow text selection of those
      this.div0.onmousedown = null;
    } else if(symbol == 'toc') {
      setTocHTML2(this.div0);
      //setTocHTML(this.div0);
      //setLinkHTML(this.div0);
    } else {
      if(virtualsymbol == 'l') {
        var color = cell.components[0] ? cell.components[0].number : 0;
        if(color == -1) color = 0;
        if(color > led_off_colors.length) color = 0; // not more colors than that supported
        //this.div0.innerText = 'l';
        //this.div1.innerText = 'L';
        this.div0.style.color = led_off_colors[color];
        this.div1.style.color = led_fg_colors[color];
        this.div1.style.backgroundColor = led_bg_colors[color];
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
        this.div0.style.color = '#6d6';
        this.div1.style.color = 'green';
        this.div1.style.backgroundColor = '#afa';
      }
      if(virtualsymbol == 'p' || virtualsymbol == 'P') {
        this.div0.style.color = '#6d6';
        this.div1.style.color = 'green';
        this.div1.style.backgroundColor = '#afa';
      }
      if(virtualsymbol == 'r' || virtualsymbol == 'R') {
        this.div0.style.color = '#6d6';
        this.div1.style.color = 'green';
        this.div1.style.backgroundColor = '#afa';
      }
      if(symbol == 'b' || symbol == 'B') {
        //this.div1.style.color = this.div0.style.color;
      }
      if(symbol == 'T') {
        this.div0.style.visibility = 'hidden';
        this.div1.style.visibility = 'visible';
        this.div1.style.backgroundColor = 'black';
        this.div1.style.color = '#0d0';
        this.div1.innerText = ' ';
        // The font characters are normally slightly bigger than a cell, but don't do that for the terminal, or bottom of letters gets obscured by the black cell below them, hiding bottom of j, underscores, etc
        this.div1.style.fontSize = Math.floor(tw * 0.9) + 'px';
      }
    }

    if(cell.components[0] && cell.components[0].error) {
      this.markError(cell, components[0].errormessage);
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
    this.div1.style.color = 'red';
    this.div0.title = errortext;
    this.div1.title = errortext;
  };

  this.setCursorPointer = function() {
    this.div0.style.cursor = 'pointer';
    this.div1.style.cursor = 'pointer';
  };

  this.setValue = function(cell, value, type) {
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
};

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

// TODO: to be faster in firefox, do not create a tiny canvas for every single cell,
// instead create 1 big canvas (or multiple big tiles if larger than max canvas size)
// and copy/blit graphics on them from elsewhere. This way fix two things at once:
// the speed in firefox, and, by making more separate graphics pieces allow one wire grey
// and one wire black at the same time in wire crossings.
/** @implements Renderer */
function RendererImg() { // RendererCanvas RendererGraphical
  this.fallback = new RendererText();

  this.canvas0 = null;
  this.canvas1 = null;
  this.ctx0 = null;
  this.ctx1 = null;
  //this.data0 = null;
  //this.data1 = null;
  this.prevvalue = null;
  this.usefallback = false;
  this.init2done = false;
  this.text0 = null;
  this.text1 = null;

  // one time initialization
  this.init = function(cell, x, y, clickfun) {
    this.fallback.init(cell, x, y, clickfun);
    if(!cell.comment && cell.circuitsymbol != ' ') {
      this.canvas0 = makeAbsElement('canvas', 0, 0, tw, th, doNotAddToParent/*this.fallback.div0*/);
      this.canvas0.width = parseInt(tw);
      this.canvas0.height = parseInt(th);
      this.canvas1 = makeAbsElement('canvas', 0, 0, tw, th, doNotAddToParent/*this.fallback.div1*/);
      this.canvas1.width = parseInt(tw);
      this.canvas1.height = parseInt(th);
      this.ctx0 = this.canvas0.getContext('2d');
      this.ctx1 = this.canvas1.getContext('2d');
      this.fallback.div0.appendChild(this.canvas0);
      this.fallback.div1.appendChild(this.canvas1);
      this.text0 = makeDiv(0, 0, tw, th, this.fallback.div0);
      this.text1 = makeDiv(0, 0, tw, th, this.fallback.div1);
      var fs = tw - 2;
      if (fs < 7) fs = 7;
      this.text0.style.color = '#999';
      this.text0.style.textAlign = 'center';
      this.text0.style.fontSize = fs + 'px';
      this.text0.style.fontFamily = 'monospace';
      this.text1.style.color = 'black';
      this.text1.style.textAlign = 'center';
      this.text1.style.fontSize = fs + 'px';
      this.text1.style.fontFamily = 'monospace';
    }
  };

  this.drawLineCore_ = function(ctx, x0, y0, x1, y1) {
    var x0b = Math.floor(x0 * tw);
    var y0b = Math.floor(y0 * th);
    var x1b = Math.floor(x1 * tw);
    var y1b = Math.floor(y1 * th);
    // the 0.5 makes line take up actual pixel rather than blurry multipixel mess.
    // canvas is THAT kind of drawing engine :( the sub pixel blurry kind
    if(x0b == x1b) {
      if(x0b == tw) { x0b--; x1b--; }
      ctx.moveTo(x0b + 0.5, y0b);
      ctx.lineTo(x1b + 0.5, y1b);
    } if(y0b == y1b) {
      if(y0b == th) { y0b--; y1b--; }
      ctx.moveTo(x0b, y0b + 0.5);
      ctx.lineTo(x1b, y1b + 0.5);
    } else {
      ctx.moveTo(x0b, y0b);
      ctx.lineTo(x1b, y1b);
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
  }

  // this one has a circle instead of arrow head (for negated inputs)
  this.drawAntiArrow_ = function(ctx, x0, y0, x1, y1, opt_r) {
    ctx.beginPath();
    this.drawAntiArrowCore_(ctx, x0, y0, x1, y1, opt_r);
    ctx.stroke();
  }

  this.drawCircleCore_ = function(ctx, x, y, radius) {
    var xb = Math.floor(x * tw);
    var yb = Math.floor(y * th);
    var rb = Math.floor(radius * th);
    ctx.arc(xb, yb, rb, 0, Math.PI * 2, true);
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
    ctx.arc(xb, yb, rb, Math.PI * 2 * a0, Math.PI * 2 * a1, false);
    ctx.stroke();
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
      ctx.fillRect((tw >> 1) - 1.5, (th >> 1) - 1.5, 3.5, 3.5);
    }
  };

  this.drawSplitDiag_ = function(cell, ctx, num0) {
    var num = 0;
    if(num0) num += num0;
    if(connected2g(cell.x, cell.y, 4)) { num++; this.drawLine_(ctx, 0.5, 0.5, 1, 0); }
    if(connected2g(cell.x, cell.y, 5)) { num++; this.drawLine_(ctx, 0.5, 0.5, 1, 1); }
    if(connected2g(cell.x, cell.y, 6)) { num++; this.drawLine_(ctx, 0.5, 0.5, 0, 1); }
    if(connected2g(cell.x, cell.y, 7)) { num++; this.drawLine_(ctx, 0.5, 0.5, 0, 0); }
    if(num >= 3) {
      ctx.fillRect((tw >> 1) - 1.5, (th >> 1) - 1.5, 3.5, 3.5);
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
      ctx.fillRect((tw >> 1) - 1.5, (th >> 1) - 1.5, 3.5, 3.5);
    }
  };

  // specific initialization, can be re-done if cell changed on click
  this.init2 = function(cell, symbol, virtualsymbol, opt_title) {
    if(!this.canvas0) {
      this.fallback.init2(cell, symbol, virtualsymbol, opt_title);
      return;
    }

    if (this.init2done) {
      this.ctx0.clearRect(0, 0, tw, th);
      this.ctx1.clearRect(0, 0, tw, th);
    }
    this.init2done = true;

    this.ctx0.strokeStyle = '#aaa';
    this.ctx1.strokeStyle = 'black';
    this.ctx0.fillStyle = '#aaa';
    this.ctx1.fillStyle = 'black';
    //this.ctx0.lineWidth = 0.5;
    //this.ctx1.lineWidth = 0.5;
    this.ctx0.lineWidth = 1;
    this.ctx1.lineWidth = 1;
    var error = false;
    if(cell.components[0] && cell.components[0].error) {
      error = true;
      this.markError(cell, cell.components[0].errormessage);
    } else if(opt_title) {
      //this.text0.title = opt_title;
      //this.text1.title = opt_title;
      this.fallback.div0.title = opt_title;
      this.fallback.div1.title = opt_title;
    }
    var c = cell.circuitsymbol;
    // This avoids blurry lines that take up other amounts of pixels with lighter colors than desired
    //this.ctx0.translate(0.5, 0.5);
    //this.ctx1.translate(0.5, 0.5);
    for (var i = 0; i < 2; i++) {
      var ctx = (i == 0) ? this.ctx0 : this.ctx1;
      var textel = (i == 0) ? this.text0 : this.text1;
      if(c == '-') {
        this.drawLine_(ctx, 0, 0.5, 1, 0.5);
        this.drawSplitDiag_(cell, ctx, 2);
      } else if(c == '|') {
        this.drawLine_(ctx, 0.5, 0, 0.5, 1);
        this.drawSplitDiag_(cell, ctx, 2);
      } else if(c == '/') {
        this.drawLine_(ctx, 0, 1, 1, 0);
      } else if(c == '\\') {
        this.drawLine_(ctx, 0, 0, 1, 1);
      } else if(c == 'x') {
        //this.drawLine_(ctx, 0, 0, 1, 1);
        if(isInterestingComponent(cell, 1) && !isInterestingComponent(cell, 0)) this.drawLine_(ctx, 0, 0, 1, 1);
        if(isInterestingComponent(cell, 1)) { this.drawLine_(ctx, 0, 0, 0.4, 0.4); this.drawLine_(ctx, 0.6, 0.6, 1, 1); }
        if(isInterestingComponent(cell, 0)) this.drawLine_(ctx, 0, 1, 1, 0);
      } else if(c == '+') {
        this.drawLine_(ctx, 0, 0.5, 1, 0.5);
        //this.drawLine(ctx, 0.5, 0, 0.5, 1);
        this.drawLine_(ctx, 0.5, 0, 0.5, 0.4);
        this.drawLine_(ctx, 0.5, 0.7, 0.5, 1);
      } else if(c == '*' || c == ',') {
        this.drawSplit_(cell, ctx);
      } else if(c == '^') {
        if(cell.circuitextra == 2) {
          if(hasDevice(cell.x, cell.y, 7)) this.drawArrow_(ctx, 1, 1, 0, 0);
          if(hasDevice(cell.x, cell.y, 4)) this.drawArrow_(ctx, 0, 1, 1, 0);
        } else {
          this.drawSplit_(cell, ctx, 1);
          this.drawArrow_(ctx, 0.5, 0.5, 0.5, 0);
        }
      } else if(c == '>') {
        if(cell.circuitextra == 2) {
          if(hasDevice(cell.x, cell.y, 4)) this.drawArrow_(ctx, 0, 1, 1, 0);
          if(hasDevice(cell.x, cell.y, 5)) this.drawArrow_(ctx, 0, 0, 1, 1);
        } else {
          this.drawSplit_(cell, ctx, 1);
          this.drawArrow_(ctx, 0.5, 0.5, 1, 0.5);
        }
      } else if(c == 'v') {
        if(cell.circuitextra == 2) {
          if(hasDevice(cell.x, cell.y, 6)) this.drawArrow_(ctx, 1, 0, 0, 1);
          if(hasDevice(cell.x, cell.y, 5)) this.drawArrow_(ctx, 0, 0, 1, 1);
        } else {
          this.drawSplit_(cell, ctx, 1);
          this.drawArrow_(ctx, 0.5, 0.5, 0.5, 1);
        }
      } else if(c == '<') {
        if(cell.circuitextra == 2) {
          if(hasDevice(cell.x, cell.y, 7)) this.drawArrow_(ctx, 1, 1, 0, 0);
          if(hasDevice(cell.x, cell.y, 6)) this.drawArrow_(ctx, 1, 0, 0, 1);
        } else {
          this.drawSplit_(cell, ctx, 1);
          this.drawArrow_(ctx, 0.5, 0.5, 0, 0.5);
        }
      } else if(c == 'm') {
        if(cell.circuitextra == 2) {
          if(hasDevice(cell.x, cell.y, 7)) this.drawAntiArrow_(ctx, 1, 1, 0, 0);
          if(hasDevice(cell.x, cell.y, 4)) this.drawAntiArrow_(ctx, 0, 1, 1, 0);
        } else {
          this.drawSplit_(cell, ctx, 1);
          this.drawAntiArrow_(ctx, 0.5, 0.5, 0.5, 0);
        }
      } else if(c == ']') {
        if(cell.circuitextra == 2) {
          if(hasDevice(cell.x, cell.y, 4)) this.drawAntiArrow_(ctx, 0, 1, 1, 0);
          if(hasDevice(cell.x, cell.y, 5)) this.drawAntiArrow_(ctx, 0, 0, 1, 1);
        } else {
          this.drawSplit_(cell, ctx, 1);
          this.drawAntiArrow_(ctx, 0.5, 0.5, 1, 0.5);
        }
      } else if(c == 'w') {
        if(cell.circuitextra == 2) {
          if(hasDevice(cell.x, cell.y, 6)) this.drawAntiArrow_(ctx, 1, 0, 0, 1);
          if(hasDevice(cell.x, cell.y, 5)) this.drawAntiArrow_(ctx, 0, 0, 1, 1);
        } else {
          this.drawSplit_(cell, ctx, 1);
          this.drawAntiArrow_(ctx, 0.5, 0.5, 0.5, 1);
        }
      } else if(c == '[') {
        if(cell.circuitextra == 2) {
          if(hasDevice(cell.x, cell.y, 7)) this.drawAntiArrow_(ctx, 1, 1, 0, 0);
          if(hasDevice(cell.x, cell.y, 6)) this.drawAntiArrow_(ctx, 1, 0, 0, 1);
        } else {
          this.drawSplit_(cell, ctx, 1);
          this.drawAntiArrow_(ctx, 0.5, 0.5, 0, 0.5);
        }
      } else if(c == 'z') {
        var num = 0;
        if(hasDevice(cell.x, cell.y, 0)) {num++; this.drawArrow_(ctx, 0.5, 0.5, 0.5, 0, 0.19);}
        if(hasDevice(cell.x, cell.y, 1)) {num++; this.drawArrow_(ctx, 0.5, 0.5, 1, 0.5, 0.19);}
        if(hasDevice(cell.x, cell.y, 2)) {num++; this.drawArrow_(ctx, 0.5, 0.5, 0.5, 1, 0.19);}
        if(hasDevice(cell.x, cell.y, 3)) {num++; this.drawArrow_(ctx, 0.5, 0.5, 0, 0.5, 0.19);}
        this.drawSplit_(cell, ctx, num);
      } else if(c == 'Z') {
        var num = 0;
        if(hasDevice(cell.x, cell.y, 0)) {num++; this.drawAntiArrow_(ctx, 0.5, 0.5, 0.5, 0);}
        if(hasDevice(cell.x, cell.y, 1)) {num++; this.drawAntiArrow_(ctx, 0.5, 0.5, 1, 0.5);}
        if(hasDevice(cell.x, cell.y, 2)) {num++; this.drawAntiArrow_(ctx, 0.5, 0.5, 0.5, 1);}
        if(hasDevice(cell.x, cell.y, 3)) {num++; this.drawAntiArrow_(ctx, 0.5, 0.5, 0, 0.5);}
        this.drawSplit_(cell, ctx, num);
      } else if(c == 'h') {
        this.drawSplit_h_(cell, ctx, -8);
        if(hasDevice(cell.x, cell.y, 0) && isInterestingComponent(cell, 1)) this.drawArrow_(ctx, 0.5, 0.5, 0.5, 0, 0.19);
        if(hasDevice(cell.x, cell.y, 1) && isInterestingComponent(cell, 0)) this.drawArrow_(ctx, 0.5, 0.5, 1, 0.5, 0.19);
        if(hasDevice(cell.x, cell.y, 2) && isInterestingComponent(cell, 1)) this.drawArrow_(ctx, 0.5, 0.5, 0.5, 1, 0.19);
        if(hasDevice(cell.x, cell.y, 3) && isInterestingComponent(cell, 0)) this.drawArrow_(ctx, 0.5, 0.5, 0, 0.5, 0.19);
        if(hasDevice(cell.x, cell.y, 4) && isInterestingComponent(cell, 3)) this.drawArrow_(ctx, 0.5, 0.5, 1, 0, 0.19);
        if(hasDevice(cell.x, cell.y, 5) && isInterestingComponent(cell, 2)) this.drawArrow_(ctx, 0.5, 0.5, 1, 1, 0.19);
        if(hasDevice(cell.x, cell.y, 6) && isInterestingComponent(cell, 3)) this.drawArrow_(ctx, 0.5, 0.5, 0, 1, 0.19);
        if(hasDevice(cell.x, cell.y, 7) && isInterestingComponent(cell, 2)) this.drawArrow_(ctx, 0.5, 0.5, 0, 0, 0.19);
      } else if(c == 'H') {
        this.drawSplit_h_(cell, ctx, -8);
        // no "isInterestingComponent" checks for H, unlike h, because H can affect things, it's negating (for h any effect, like as AND input, is negated if it's a dummy, but not for H)
        if(hasDevice(cell.x, cell.y, 0)) this.drawAntiArrow_(ctx, 0.5, 0.5, 0.5, 0);
        if(hasDevice(cell.x, cell.y, 1)) this.drawAntiArrow_(ctx, 0.5, 0.5, 1, 0.5);
        if(hasDevice(cell.x, cell.y, 2)) this.drawAntiArrow_(ctx, 0.5, 0.5, 0.5, 1);
        if(hasDevice(cell.x, cell.y, 3)) this.drawAntiArrow_(ctx, 0.5, 0.5, 0, 0.5);
        if(hasDevice(cell.x, cell.y, 4)) this.drawAntiArrow_(ctx, 0.5, 0.5, 1, 0);
        if(hasDevice(cell.x, cell.y, 5)) this.drawAntiArrow_(ctx, 0.5, 0.5, 1, 1);
        if(hasDevice(cell.x, cell.y, 6)) this.drawAntiArrow_(ctx, 0.5, 0.5, 0, 1);
        if(hasDevice(cell.x, cell.y, 7)) this.drawAntiArrow_(ctx, 0.5, 0.5, 0, 0);
      } else if(c == 'X') {
        this.drawSplit_(cell, ctx, -8);
      } else if(c == '&') {
        var draw1 = connected2g(cell.x, cell.y, 0) && connected2g(cell.x, cell.y, 1) && isInterestingComponent(cell, 1);
        var draw0 = connected2g(cell.x, cell.y, 2) && connected2g(cell.x, cell.y, 3) && isInterestingComponent(cell, 0);
        if(draw0 && draw1) {
          var r = 0.3;
          this.drawLine_(ctx, 0, 0.5, r, 0.5);
          this.drawLine_(ctx, 0.5, 1, 0.5, 1 - r);
          this.drawLine_(ctx, r, 0.5, 0.5, 1 - r);
          this.drawLine_(ctx, 1, 0.5, 1 - r, 0.5);
          this.drawLine_(ctx, 0.5, 0, 0.5, r);
          this.drawLine_(ctx, 1 - r, 0.5, 0.5, r);
        }
        else if(draw0) {
          this.drawLine_(ctx, 0.5, 0.5, 0, 0.5);
          this.drawLine_(ctx, 0.5, 0.5, 0.5, 1);
        }
        else if(draw1) {
          this.drawLine_(ctx, 0.5, 0.5, 1, 0.5);
          this.drawLine_(ctx, 0.5, 0.5, 0.5, 0);
        }
      } else if(c == '%') {
        var draw1 = connected2g(cell.x, cell.y, 0) && connected2g(cell.x, cell.y, 3) && isInterestingComponent(cell, 1);
        var draw0 = connected2g(cell.x, cell.y, 1) && connected2g(cell.x, cell.y, 2) && isInterestingComponent(cell, 0);
        if(draw0 && draw1) {
          var r = 0.3;
          this.drawLine_(ctx, 0, 0.5, r, 0.5);
          this.drawLine_(ctx, 0.5, 0, 0.5, r);
          this.drawLine_(ctx, r, 0.5, 0.5, r);
          this.drawLine_(ctx, 1, 0.5, 1 - r, 0.5);
          this.drawLine_(ctx, 0.5, 1, 0.5, 1 - r);
          this.drawLine_(ctx, 1 - r, 0.5, 0.5, 1 - r);
        }
        else if(draw0) {
          this.drawLine_(ctx, 0.5, 0.5, 1, 0.5);
          this.drawLine_(ctx, 0.5, 0.5, 0.5, 1);
        }
        else if(draw1) {
          this.drawLine_(ctx, 0.5, 0.5, 0, 0.5);
          this.drawLine_(ctx, 0.5, 0.5, 0.5, 0);
        }
      } else if(antennamap[c]) {
        ctx.fillRect(0, 0, tw, th);
        this.ctx0.strokeStyle = this.ctx0.fillStyle = 'white';
        if(c == ')') {
          this.drawArc_(ctx, -0.3, 0.5, 0, 1, 0.8);
        } else if(c == '(') {
          this.drawArc_(ctx, 1.3, 0.5, 0, 1, 0.8);
        } else if(c == 'u') {
          this.drawArc_(ctx, 0.5, -0.3, 0, 1, 0.8);
        } else if(c == 'n') {
          this.drawArc_(ctx, 0.5, 1.3, 0, 1, 0.8);
        }
      } else if(c == 'y') {
        var ygroup = cell.ygroup;
        if(ygroup) {
          // color some buses slightly differently to allow to distinguish them visually
          var cc = (ygroup.index & 7);
          var color = '#aaa';
          if(cc == 1) color = '#aab';
          if(cc == 2) color = '#aba';
          if(cc == 3) color = '#baa';
          if(cc == 4) color = '#bba';
          if(cc == 5) color = '#bab';
          if(cc == 6) color = '#abb';
          if(cc == 7) color = '#bbb';
          ctx.fillStyle = color;
        }
        ctx.fillRect(0, 0, tw, th);
        if(digitmap[symbol]) {
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = '' + tw + 'px serif';
          this.ctx0.strokeStyle = this.ctx0.fillStyle = 'white';
          ctx.fillText(symbol, tw >> 1, th >> 1);
        }
      } else if(c == 'T') {
        this.fallback.init2(cell, symbol, virtualsymbol); this.usefallback = true; break;
      } else if(virtualsymbol == 'L') {
        this.fallback.init2(cell, symbol, virtualsymbol); this.usefallback = true; break;
      } else if(cell.comment) {
        this.fallback.init2(cell, symbol, virtualsymbol); this.usefallback = true; break;
      } else if(c == 'toc') {
        this.fallback.init2(cell, symbol, virtualsymbol); this.usefallback = true; break;
      } else {
        var alreadybg = error;
        if(!error) {
          if(virtualsymbol == 's' || virtualsymbol == 'S' || virtualsymbol == 'p' || virtualsymbol == 'P' || virtualsymbol == 'r' || virtualsymbol == 'R') {
            alreadybg = true;
            this.canvas0.style.backgroundColor = '#fafffa';
            this.canvas1.style.backgroundColor = '#afa';
            this.ctx0.strokeStyle = this.ctx0.fillStyle = '#5c5';//'#6d6';
            this.ctx1.strokeStyle = this.ctx1.fillStyle = 'green';
            this.text0.style.color = '#6d6';
            this.text1.style.color = 'green';
          }
          if(virtualsymbol == 'l') {
            alreadybg = true;
            var color = cell.components[0] ? cell.components[0].number : 0;
            if(color == -1) color = 0;
            if(color > led_off_colors.length) color = 0; // not more colors than that supported
            this.canvas0.style.backgroundColor = led_light_bg_colors[color];
            this.canvas1.style.backgroundColor = led_bg_colors[color];
            this.ctx0.strokeStyle = this.ctx0.fillStyle = led_light_fg_colors[color];
            this.ctx1.strokeStyle = this.ctx1.fillStyle = led_fg_colors[color];
            this.text0.style.color = led_off_colors[color];
            this.text1.style.color = led_fg_colors[color];
          }
        }
        if(devicemap[c] || c == '#' || c == '$') {
          if(!alreadybg) {
            this.canvas0.style.backgroundColor = '#f7f7f7';
            this.canvas1.style.backgroundColor = '#f7f7f7';
          }
          if(!sameDevice(cell.x, cell.y, 0)) this.drawLine_(ctx, 0, 0, 1, 0);
          if(!sameDevice(cell.x, cell.y, 1)) this.drawLine_(ctx, 1, 0, 1, 1);
          if(!sameDevice(cell.x, cell.y, 2)) this.drawLine_(ctx, 1, 1, 0, 1);
          if(!sameDevice(cell.x, cell.y, 3)) this.drawLine_(ctx, 0, 1, 0, 0);
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
  };

  this.markError = function(cell, errortext) {
    this.fallback.markError(cell, errortext);
    this.canvas0.style.backgroundColor = 'yellow';
    this.canvas1.style.backgroundColor = 'yellow';
    this.ctx0.strokeStyle = 'red';
    this.ctx1.strokeStyle = 'red';
    this.ctx0.fillStyle = 'red';
    this.ctx1.fillStyle = 'red';
  };

  this.setCursorPointer = function() {
    this.fallback.div0.style.cursor = 'pointer';
    this.fallback.div1.style.cursor = 'pointer';
    this.text0.style.cursor = 'pointer';
    this.text1.style.cursor = 'pointer';
  };

  this.setValue = function(cell, value, type) {
    if(this.usefallback) {
      this.fallback.setValue(cell, value, type);
      return;
    }
    if(value != this.prevvalue) { // changing visibility is slow in case of lots of elements, so only do if it changed
      if(value) {
        this.fallback.div0.style.visibility = 'hidden';
        this.fallback.div1.style.visibility = 'visible';
      } else {
        this.fallback.div0.style.visibility = 'visible';
        this.fallback.div1.style.visibility = 'hidden';
      }
    }
    this.prevvalue = value;
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
};

document.body.onmouseup = function(e) {
  if(lastmousedowncomponent) {
    var didsomething = lastmousedowncomponent.mouseup(e);
    lastmousedowncomponent = null;
    if(didsomething && AUTOUPDATE == 1) update();
  }
  sequential_mode_changed = true;
};

var components = [];
var components_order = [];
var world = [];
var w = 0, h = 0;

// parsing optimization
var line0 = [];
var line1 = [];

function render() {
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      var cell = world[y][x];
      if(!cell.renderer) continue;
      var value = false;
      if(cell.components[0]) value |= cell.components[0].value;
      if(cell.components[1]) value |= cell.components[1].value;
      if(cell.components[2]) value |= cell.components[2].value;
      if(cell.components[3]) value |= cell.components[3].value;
      if(cell.components[4]) value |= cell.components[4].value;
      if(cell.components[5]) value |= cell.components[5].value;
      if(cell.components[6]) value |= cell.components[6].value;
      if(cell.components[7]) value |= cell.components[7].value;
      cell.setValue(value);
    }
  }

  if(ticksCounterEl) ticksCounterEl.innerHTML = '&nbspticks: ' + numticks;
}

sequential_mode_changed = true;

function updateComponents(components) {
  // In sequential mode, we can stop updates if nothing changed: the state became stable. This is not the same as a full pause. Timers, button clicks, ... will start the updates again
  //if(UPDATE_ALGORITHM == 1 && AUTOUPDATE == 2 && !sequential_mode_changed) return; // only for sequential mode. TODO: stop the JS timer instead.

  //the above (sequential_mode_changed) is disabled! Reason: it makes components that may still do something in the future, that is, delays with a buffer of 16, fail! Since they can still change after some amount of ticks.

  var changed = false;
  for(var i = 0; i < components.length; i++) {
    components[i].updated = false;
    components[i].prevvalue = components[i].value;
  }
  for(var i = 0; i < components.length; i++) {
    components[i].update();
    if(components[i].prevvalue != components[i].value) changed = true;
  }

  if(!changed) sequential_mode_changed = false;

  numticks++;
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
  if(AUTOUPDATE == 1 && changed_something) update();
  if(changed_something) sequential_mode_changed = true;
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
      if (c == 'y') type = NUMBER_BUS;
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

// parse the individual world cells from the text
function parseCells(text) {
  world = [];
  logPerformance('parseCells start');
  var lines = text.split('\n');
  if(lines[0].length == 0) lines.splice(0, 1); // only the first one, typically in long string literal you begin the first line after the quote and really don't want that first empty line created by it
  // commented out stripping other empty lines: you may want them on purpose to allow scrolling, ...
  //while(lines.length > 0 && lines[0].length == 0) lines.splice(0, 1);
  //while(lines.length > 0 && lines[lines.length - 1].length == 0) lines.length--;
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
          thincommentcell = null;
          commentalign = null;
        }
      } else {
        if(cell.symbol == '"') {
          cell.displaysymbol = ' ';
          cell.circuitsymbol = ' ';
          cell.comment = true;
          cell.commentlength = 2; // the begin and end quote themselves take place in the alignment room
          comment = !comment;
          commentalign = -1;
          var x2 = x - 1;
          if(x2 >= 0 && (lines[y][x2] == '0')) commentalign = 0;
          else if(x2 >= 0 && (lines[y][x2] == '1')) commentalign = 1;
          else if(x2 >= 0 && (lines[y][x2] == '2')) commentalign = 2;
          else {
            for(x2 = x + 1; x2 < w; x2++) {
              if(lines[y][x2] == '"') break;
            }
            x2++;
            if(x2 < w && lines[y][x2] == '0') commentalign = 0;
            else if(x2 < w && lines[y][x2] == '1') commentalign = 1;
            else if(x2 < w && lines[y][x2] == '2') commentalign = 2;
          }
          thincommentcell = (commentalign == -1) ? null : (x2 < x ? world[y][x2] : cell);
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
      if(!(devicemapext[cb] || digitmap[cb]) && (devicemapext[ca] || digitmap[ca] || devicemapext[cc] || digitmap[cc])) {
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
        if(devicemapext[ca] || digitmap[ca] || ca == '*' || ca == '+' || ca == ',') {
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
  }

  for(k in graph) {
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
          // unlike other digits, those for subs become extenders of the sub component, and extenders should also be marked with a 'i' because we will treat them all specially in the "connected" function, which takes only the circuitsymbol character as input
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
          if(world[y][x].circuitsymbol == 's' || world[y][x].circuitsymbol == 'S') defsub.externalinputs.push([x, y]);
        }
      }
    }
  }

  defsubs_order = toposort(sub_tree)
  if(!defsubs_order) {
    //for(var i = 0; i < components.length; i++) {
    //  if(components[i].callsub) components[i].markError();
    //}
    for(var k in defsubs) {
      defsubs[k].error = true;
      defsubs[k].markError();
    }
    for(var i = 0; i < callsubs.length; i++) {
      callsubs[i].error = true;
      callsubs[i].markError();
    }
    defsubs_order = [];
    // TODO: only disable those ICs that participate in the loop
    console.log('error: loop in defsubs, would create infinite loop, ALL ICs disabled!');
    //return false; // return false if cycle, otherwise we would have an infinite loop
  }

  logPerformance('parseSubs done');
  return true;
}

// This does nothing more than turn numbers that touch junctions (y)'s circuitsymbol, into y's themselves, so wires can connect to the numbers
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
        if(c != 'y' && !digitmap[c]) continue; // we only care about y and digits, they form a group
        if(digitmap[c] && world[y][x].numbertype != NUMBER_BUS && world[y][x].numbertype != NUMBER_NONE) continue;
        if(digitmap[c]) world[y][x].numbertype = NUMBER_BUS;
        array.push(s);

        if(c == 'y') {
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
          world[y][x].circuitsymbol = 'y';
        }
      }
    }
  }

  // resolve numbers of buses touching wires in a very particular useful but heuristic way
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      if(world[y][x].circuitsymbol == 'y') {
        var hor = false;
        var ver = false;
        for(var i = 0; i < 4; i++) {
          var dx2 = (i == 1) ? 1 : ((i == 3) ? -1 : 0);
          var dy2 = (i == 0) ? -1 : ((i == 2) ? 1 : 0);
          var x2 = x + dx2;
          var y2 = y + dy2;
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          if(world[y2][x2].circuitsymbol == 'y') continue;
          if(connected2(x, y, i)) {
            if(i == 0 || i == 2) ver = true;
            if(i == 1 || i == 3) hor = true;
          }
        }

        if(hor && !ver && world[y][x].numberh >= 0) world[y][x].number = world[y][x].numberh;
        if(ver && !hor && world[y][x].numberv >= 0) world[y][x].number = world[y][x].numberv;
      }
    }
  }
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      if(world[y][x].circuitsymbol == 'y' && world[y][x].metasymbol == 'y') {
        world[y][x].number = world[y][x].numberh = world[y][x].numberv = -1;
        // this is on purpose! Wires that touch a real y do NOT count for numbered connections
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

  // resolve numbers of backplane touching wires in a very particular useful but heuristic way
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      if(world[y][x].circuitsymbol == 'g') {
        var hor = false;
        var ver = false;
        for(var i = 0; i < 4; i++) {
          var dx2 = (i == 1) ? 1 : ((i == 3) ? -1 : 0);
          var dy2 = (i == 0) ? -1 : ((i == 2) ? 1 : 0);
          var x2 = x + dx2;
          var y2 = y + dy2;
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          if(world[y2][x2].circuitsymbol == 'g') continue;
          if(connected2(x, y, i)) {
            if(i == 0 || i == 2) ver = true;
            if(i == 1 || i == 3) hor = true;
          }
        }

        if(hor && !ver && world[y][x].numberh >= 0) world[y][x].number = world[y][x].numberh;
        if(ver && !hor && world[y][x].numberv >= 0) world[y][x].number = world[y][x].numberv;
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

  if(c == '$' && !(devicemapext[c2] || c2 == '$')) return false;

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
  if(z > 1 && !(c == 'i' || c == 'h' || c == 'H' || c2 == 'h' || c2 == 'H' || c == 'X' || c2 == 'X')) return false;

  //if(c == 'i' && c2 != 'i') return false; // connecting sub-calls is implemented later. And full subs are marked with 'i' earlier, so u's connect only with u's.

  if(c == '-' && (todir2 == 0 || todir2 == 2 || todir2 >= 4)) return false;
  if(c == '|' && (todir2 == 1 || todir2 == 3 || todir2 >= 4)) return false;

  if((c == ',') && (c2 == ',')) return false;

  if(ffmap[c] && (c2 == '#' || c2 == '$')) return false;
  if(ffmap[c2] && (c == '#' || c == '$')) return false;
  if(rommap[c] && (c2 == '#' || c2 == '$')) return false;
  if(rommap[c2] && (c == '#' || c == '$')) return false;

  if(!knownmap[c2]) return false; // it's an isolator

  if(c == 'y' && c2 == 'y') return false; // y-y connections must be handled with "handleJunctionConnections" instead

  if(c == '+' && !(z == 0 && (todir2 == 1 || todir2 == 3)) && !(z == 1 && (todir2 == 0 || todir2 == 2))) return false;
  if(c == '%' && !(z == 0 && (todir2 == 1 || todir2 == 2)) && !(z == 1 && (todir2 == 0 || todir2 == 3))) return false;
  if(c == '&' && !(z == 0 && (todir2 == 2 || todir2 == 3)) && !(z == 1 && (todir2 == 0 || todir2 == 1))) return false;
  if(c == '/' && !(todir == 4 || todir == 6)) return false;
  if(c == '\\' && !(todir == 5 || todir == 7)) return false;

  if(c == 'x' && !(z == 0 && (todir == 4 || todir == 6)) && !(z == 1 && (todir == 5 || todir == 7))) return false;
  if((c == 'h' || c == 'H' || c == 'X') &&
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

    if((c == '^' || c == 'm') && ce == 1 && devicemapext[c2] && (todir == 1 || todir == 3)) return false;
    if((c == '>' || c == ']') && ce == 1 && devicemapext[c2] && (todir == 0 || todir == 2)) return false;
    if((c == 'v' || c == 'w') && ce == 1 && devicemapext[c2] && (todir == 1 || todir == 3)) return false;
    if((c == '<' || c == '[') && ce == 1 && devicemapext[c2] && (todir == 0 || todir == 2)) return false;
  }

  if(dinputmap[c] && ce == 2) {
    if(todir < 4) return false;
    if((c == '^' || c == 'm') && !(todir == 5 && z == 0) && !(todir == 6 && z == 1)) return false;
    if((c == '>' || c == ']') && !(todir == 6 && z == 0) && !(todir == 7 && z == 1)) return false;
    if((c == 'v' || c == 'w') && !(todir == 7 && z == 0) && !(todir == 4 && z == 1)) return false;
    if((c == '<' || c == '[') && !(todir == 4 && z == 0) && !(todir == 5 && z == 1)) return false;
  }


  // those device inputs, too, don't interact with devices here (interaction with devices is resolved later)
  if((c == 'z' || c == 'Z' || c == 'h' || c == 'H') && devicemapext[c2]) return false;

  // The different backplane types don't interact, unless numbers of a matching one (ce then encodes allowed direction)
  if(c == 'g' && c2 == 'g') {
    if(todir > 3) return false;
    var cedir = (todir & 1) + 1;
    if(ce != cedir && ce2 != cedir) return false;
  }

  if(((dinputmap[c] && inputmap[c2]) || (inputmap[c] && dinputmap[c2]))) return false; // inputs don't interact, including not > with z, but z with z do interact
  if(devicemap[c] && devicemap[c2]) return false; // device cores don't interact

  if(c == 'i' && z != todir) return false;

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
  if(c2 == 'X' || c2 == 'h' || c2 == 'H') {
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
  w = 0, h = 0;
  ygroups = [];
  defsubs = {};
  callsubs = [];
  backplanes_g = [];
  line0 = [];
  line1 = [];
  // important to pause, else if circuit starts with a timer that is supposed to be initially off, it may randomly affect initial state
  // especially in case of long parse time...
  pause();
  timerticks = 0;
  sequential_mode_changed = true;
  numticks = 0;
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

// buses (y)
function handleJunctionConnections(used, stack, x, y) {
  if(world[y][x].circuitsymbol != 'y') return;
  var ygroup = world[y][x].ygroup;
  if(!ygroup) {
    return;
  }
  var number = world[y][x].number;
  if (world[y][x].numbertype != NUMBER_BUS) return;
  if(number == -1) return;
  var c = ygroup.connections[number];
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

// create the components after the cells have been parsed (note: is not really parsing anymore, but a post-processing step of it)
function parseComponents() {
  var used;

  logPerformance('parseComponents start');

  globalLooseWireInstanceI = null;
  globalLooseWireInstanceE = null;

  // PASS 0: parse the buses (y)
  used = initUsed3();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0][0]) continue;

      // pretty good optimization! since we only care about junctions, avoid
      // doing all the "connected" parsing unless we have a y as startpoint
      if(world[y0][x0].circuitsymbol != 'y') continue;

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

        if(c == 'y') {
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

          if(c == 'y' || c2 == 'y') {
            if(c != 'y' || c2 != 'y') {
              // For y's, we do not use the regular connection rules. But instead rules for how y-groups are connected, which are different than components!
              // a numbered y is only connected to y, it's not even connected to wires
              // an unnumbered y is connected to wires and extends its group that way
              if(c == 'y' && number >= 0) continue;
              if(c2 == 'y' && number2 >= 0) continue;
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
        var ygroup = new YGroup();
        ygroup.index = ygroups.length;
        ygroups.push(ygroup);
        for(var i = 0; i < array.length; i++) {
          var x = array[i][0];
          var y = array[i][1];
          var z = array[i][2];
          world[y][x].ygroup = ygroup;
          var number = world[y][x].number;
          if(number >= 0) {
            if(!ygroup.connections[number]) ygroup.connections[number] = [];
            ygroup.connections[number].push([x, y, z]);
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
      // *) to connect the negated H as loose wire to things, it should cause a negated input signal there...
      // *) to connect things to call-ic's in some rare case, the rare case being such crossings like that.
      // the thing is, IC output connections use the z value as output direction detector. and crossings like x use the z value for
      // the different legs. Now, if IC's z is higher than 0, and so is the z of this leg of x, it would NEVER find that connection
      // unless we also start from z0 > 0. But using z0 > 0 on EVERYTHING, breaks various things. So only use for those crossings..........
      // It's tricky and hacky and ad hoc (this only added on 20171210) but I HOPE It works
      var maxz0 = 1;
      if(c0 == 'H') maxz0 = 4;
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
              // allow input that touches same special shaped chip with multiple sides (TODO: also allow this for other special shaped devices)
              if(world[y][x].callsub != null && world[y][x].callsub == corecell.callsub) ok = true;
              if(type == TYPE_TRISTATE && c == 'V') ok = true;
              if(!ok) {
                errormessage = 'error: multiple devices outputting to same wire at ' + x + ' ' + y + ' (type: ' + type + ')';
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
            if(c == 'i') type = TYPE_IC;
            if(c == 'T') type = TYPE_VTE;
            if(c == 'V') type = TYPE_TRISTATE;
            if(c == '?') type = TYPE_RANDOM;
            if(ffmap[c]) type = TYPE_FLIPFLOP;
          }

          if(c == 'toc') type = TYPE_TOC;

          if(type == TYPE_NULL && (c == '#' || c == '$')) type = TYPE_UNKNOWN_DEVICE;

          if(world[y][x].number >= 0 && devicemapext[c]) {
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
            // part of a h,X,%,& or so that only exists as side effect of those having possibly undesired wires
            // even + and x are considered explicit! Since you can always avoid their extra wire with a different ascii char. Not so for h or % etc....
            if(c == '-' || c == '|' || c == '/' || c == '\\' || c == ',' || c == '*' || c == '+' || c == 'x' || dinputmap[c]) {
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

        // neighbors
        for(var i = 0; i < 8; i++) { // N, E, S, W ; NE, SE, SW, NW
          var x2 = x + ((i == 1 || i == 4 || i == 5) ? 1 : ((i == 3 || i == 6 || i == 7) ? -1 : 0));
          var y2 = y + ((i == 0 || i == 4 || i == 7) ? -1 : ((i == 2 || i == 5 || i == 6) ? 1 : 0));
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          var c2 = world[y2][x2].circuitsymbol;
          var ce2 = world[y2][x2].circuitextra;

          var z2 = getZ2(c, c2, ce, ce2, i, z); // z coordinate for the neighbor
          if(used[y2][x2][z2]) continue;

          if(rommap[c] && c2 == 'T') continue;
          if(rommap[c2] && c == 'T') continue;

          if(rommap[c]/* && (rommap[c2] || c2 == '#' || c2 == '$')*/) rom = true;
          if(rommap[c] && !(rommap[c2] || c2 == '#' || c2 == '$')) continue;
          if(rommap[c2] && !(rommap[c] || c == '#' || c == '$')) continue;
          if(rom && i >= 4) continue;

          if(c == 'T') vte = true;
          if(c == 'T' && c2 != 'T') continue;
          if(c2 == 'T' && c != 'T') continue;

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

          if(!rom && !vte && !ff) {
            if(!connected(c, c2, ce, ce2, i, z, z2)) continue;
            var fromdir = (i <= 3) ? ((i + 2) & 3) : (4 + ((i - 2) & 3));
            if(!connected(c2, c, ce2, ce, fromdir, z2, z)) continue;
            // in addition, for this search we don't go through devices, or other ff elements or extensions
            if(devicemapext[c] || devicemapext[c2]) continue;
          }

          stack.push([x2, y2, z2]);
          used[y2][x2][z2] = true;
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
        var ffobject = new FF();
        if(!ffobject.init1(array)) ffobject.error = true;
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
      if(c == 'z' || c == 'Z') {
        for(var k = 0; k < 4; k++) {
          var wc2 = getNeighbor(x, y, k);
          if(!wc2) continue;
          var x2 = wc2.x;
          var y2 = wc2.y;
          var c2 = wc2.circuitsymbol;
          if(devicemapext[c2]) {
            x2s.push(x2);
            y2s.push(y2);
            inputused[y2][x2] = true;
          }
        }
      //} else if((c == 'h' || c == 'H') && component.type != TYPE_LOOSE_WIRE_IMPLICIT) {
      } else if((c == 'h' && component.type != TYPE_LOOSE_WIRE_IMPLICIT) || c == 'H') {
        // why not for loose wire: if an h touches an AND with an unused side, then it would be
        // counted as an actual input for the AND and the AND would never work. For other inputs
        // like > it's explicitely pointed at the AND so there it's fine. But for the h, often
        // the h serves just to cross over some other input with the goal of not interfering with
        // this AND at all.
        // It's enabled for H (due to negating this one cannot be ignored), only not for h.
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
          if(devicemapext[c2]) {
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
          if(devicemapext[wco0.circuitsymbol]) {
            x2s.push(wco0.x);
            y2s.push(wco0.y);
            inputused[wco0.y][wco0.x] = true;
          }
        }
        if(z == 1) {
          if(!wco1) continue;
          if(devicemapext[wco1.circuitsymbol]) {
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
      if(c == 'm' || c == ']' || c == 'w' || c == '[' || c == 'Z' || c == 'H') negated = true;
      for(var k = 0; k < x2s.length; k++) {
        var x2 = x2s[k];
        var y2 = y2s[k];
        var cell2 = world[y2][x2];
        var c2 = cell2.circuitsymbol;
        if(!devicemapext[c2]) {
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
      if(component.rom.error) component.error = true;
    }
    if(component.vte) {
      if(!component.vte.error && !component.vte.init2()) component.vte.error = true;
      if(component.vte.error) component.error = true;
    }
    if(component.type == TYPE_TRISTATE) {
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
      component.error = true;
    }
    if(component.master && component.master.vte && component.master.vte.error) {
      component.error = true;
    }
    if(component.type == TYPE_VTE && (!component.master && !component.vte)) {
      component.error = true;
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
    if(c.type == TYPE_FLIPFLOP && c.inputs.length == 0 && c.ff && c.corecell.circuitsymbol != 'Q') {
      c.type = TYPE_CONSTANT;
      c.value = c.ff.value;
    }
    c.ff_cycle = c.hasLength2CycleWithTwoInputs();
    if(c.ff_cycle) global_ff_cycle = true;
    if(c.type == TYPE_FLIPFLOP) global_counter = true;
    if(c.type == TYPE_RANDOM) global_counter = true; // it also changes state on edge trigger
    if(c.type == TYPE_FLIPFLOP && c.ff && c.ff.isdelay) global_delay = true;
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

  // check if any counter reads from another counter
  // if cycle is de
  var global_counter_to_counter = false;
  if(global_counter && cycle_detected) global_counter_to_counter = true; // TODO: actually properly check in this case.
  if(global_counter && !cycle_detected) {
    var array = [];
    for(var i = 0; i < toposorted.length; i++) {
      var c = components[toposorted[i]];
      array[i] = 1;
      if(c.type == TYPE_FLIPFLOP || c.type == TYPE_RANDOM) array[i] = 2;
      for(var j = 0; j < c.inputs.length; j++) {
        var c2 = c.inputs[j];
        var i2 = c2.index;
        if(array[i2] == 2 && array[i] == 2) {
          global_counter_to_counter = true;
          break;
        }
        if(array[i2] == 2) array[i] = 2;
      }
    }
  }



  // automatically choose a useful mode
  if(AUTO_CHOOSE_MODE) {
    if(global_ff_cycle) {
      // MODE:electron
      // if there is a particular doubly looped cycle like an RS latch core, set to 'electron' mode
      UPDATE_ALGORITHM = 3;
      AUTOUPDATE = 2;
    } else if(global_counter_to_counter || global_delay) {
      // MODE:sequential
      // global_counter_to_counter instead of global_counter, because:
      // it can actaully still be combinational if no counter (or ff or '?') read from any other counter

      // if there is any counter gate present, set to 'sequential' mode
      // maybe the mode is a bit overkill, it keeps updating at autointerval all the time even if things stopped changing
      // but in the current implementation, combinational is not sufficient, combinational may not do enough updates to support multiple c's
      // and the timer system is currently a bit difficult to refactor to support auto-pausing after all parts stopped updating
      // the circuit to try that on is game of life galaxy with auto starting timer in sequential mode
      UPDATE_ALGORITHM = 1;
      AUTOUPDATE = 2;

    } else if(cycle_detected) {
      // MODE:electron
      // other non-flip flop related cycles
      // TODO: this may be too strict or should maybe use UPDATE_ALGORITHM = 1. E.g. we do NOT want electron for a VTE that happens to have a cycle due to it inputting from its own EOF to read flag.
      UPDATE_ALGORITHM = 3;
      AUTOUPDATE = 2;
    } else {
      // MODE:combinational
      // otherwise, by default, set to 'combinational' mode, which has no ticks, only updates when a switch is toggled
      UPDATE_ALGORITHM = 1;
      AUTOUPDATE = 1;
    }

    var modeindex = origtext.indexOf('MODE:');
    if(modeindex >= 0) {
      if(textHasAt(origtext, modeindex + 5, 'combinational')) {
        UPDATE_ALGORITHM = 1;
        AUTOUPDATE = 1;
      }
      else if(textHasAt(origtext, modeindex + 5, 'sequential')) {
        UPDATE_ALGORITHM = 1;
        AUTOUPDATE = 2;
      }
      else if(textHasAt(origtext, modeindex + 5, 'electron')) {
        UPDATE_ALGORITHM = 3;
        AUTOUPDATE = 2;
      }
      else if(textHasAt(origtext, modeindex + 5, 'investigate')) {
        UPDATE_ALGORITHM = 2;
        AUTOUPDATE = 0;
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
}

var firstParse = true; // to keep scrolled down if you were scrolled down before refresh

function parseText(text, opt_title, opt_id) {
  if(firstParse) {
    parseText2(text, opt_title, opt_id);
    return;
  }
  renderingMessageDiv.innerText = 'rendering';
  // The timeout is so that the 'rendering' text becomes visible first before
  // it starts creating all the divs and canvases.
  // The timeout seems to not always work anyway, so first another trick that
  // may force a redraw
  var dummy = worldDiv.offsetHeight;
  worldDiv.style.display = 'none';
  window.setTimeout(bind(parseText2, text, opt_title, opt_id), 0);
}

function parseText2(text, opt_title, opt_id) {
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

  if(opt_id) {
    directLink.href = getUrlWithoutQueries() + '?id=' + opt_id;
    directLink.style.visibility = 'visible';
  } else {
    directLink.style.visibility = 'hidden';
  }

  var tocPos = text.indexOf('INSERT:toc');
  var tocX = 0;
  var tocY = 0;
  if(tocPos >= 0) {
    var start = tocPos;
    var end = tocPos + 10;
    if(text[start - 1] == '"') {
      start--;
      if(text[start - 1] == '0') start--;
    }
    if(text[end] == '"') end++;
    for(var i = 0; i < start; i++) {
      if(text[i] == '\n') tocY++;
    }
    var newlines = '';
    //var numLines = linkableCircuitsOrder.length;
    var numLines = allRegisteredCircuits.length;
    for(var i = 0; i < numLines; i++) newlines += '\n';
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
      if(world[y][x].circuitsymbol != ' ') nonthinw = Math.max(nonthinw, x);
      if(world[y][x].symbol == '"' && world[y][x].commentalign != 0) nonthinw = Math.max(nonthinw, x);
      if(world[y][x].commentlength > 0) {
        nonthinw = Math.max(nonthinw, x + (world[y][x].commentlength * 0.66));
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

  var fitx = (origtext.indexOf('FIT:x') >= 0);

  var fitwidth = true;
  var fitheight = true;
  var docwidth = /*document.body.clientWidth*/window.innerWidth - 8;
  var docheight = /*document.body.clientHeight*/window.innerHeight - 100 - 8;
  if(!docwidth) docwidth = 1000;
  if(!docheight) docwidth = 800;
  var h2 = h;
  if(h2 * 9 > docheight) {
    if(fity > 0) {
      h2 = fity;
    } else {
      fitheight = false; // if it's very high, then do not try to fit h, use width only, and scroll for h
    }
  }
  if(fitx) {
    if(fity > 0 && fity < h) {
      //if you have both a FIT:x and a FIT:y, then it means:
      //be as wide as possible as you can, while still fitting that what
      //FIT:y asked for. Without FIT:x, the FIT:y might be having no
      //effect when it tries to fit an even higher h. But FIT:x then
      //lets it try to be as wide as possible.
      h2 = fity;
    } else {
      fitheight = false;
    }
  }
  tw = Math.floor(docwidth / (nonthinw + 2));
  th = Math.floor(docheight / (h2 + 2));
  var t = tw;
  if(fitwidth && fitheight) t = Math.min(tw, th);
  else if(fitwidth) t = tw;
  else if(fitheight) t = th;
  if(t < 9) t = 9;
  if(t > 32) t = 32;
  if(h > 80 && t > 24) t = 24;
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

var AUTOPAUSESECONDS = 3000; // good value: 300
var USEAUTOPAUSE = true; // pause after LogicEmu was open in a browser tab for a long time (AUTOPAUSESECONDS seconds)

var autoupdateinterval = null;
var timerinterval = null;
var autopauseinterval = null; // I don't want browser to keep ticking in background when you forget about it in a tab

if(AUTOUPDATE == 2) autoupdateinterval = setInterval(function(){ update(); }, AUTOSECONDS * 1000);

timerinterval = setInterval(function(){ toggleTimers(); }, TIMERSECONDS * 1000);

if(USEAUTOPAUSE) autopauseinterval = setInterval(function(){ pause(); }, AUTOPAUSESECONDS * 1000);

function pause() {
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
}

function pauseUpdateOnly() {
  if(autoupdateinterval) {
    clearInterval(autoupdateinterval);
    autoupdateinterval = null;
  }
}

function unpause() {
  if(AUTOUPDATE == 2 && !autoupdateinterval) {
    autoupdateinterval = setInterval(function(){ update(); }, AUTOSECONDS * 1000);
  }
  if(!timerinterval)  timerinterval = setInterval(function(){ toggleTimers(); }, TIMERSECONDS * 1000);
  if(USEAUTOPAUSE && !autopauseinterval) {
    autopauseinterval = setInterval(function(){ pause(); }, AUTOPAUSESECONDS * 1000);
    updatePauseButtonText();
  }
}

function updateRunningState() {
  unpause(); // unpause no matter what mode (not just AUTOUPDATE == 2), otherwise timers don't work in other modes
  if(AUTOUPDATE != 2 && autoupdateinterval) {
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
  ['combinational', 1, 1], // purely combinational circuits update in a single tick
  ['sequential', 1, 2],
  ['electron', 3, 2], // designed for gate-level flip-flops (but the built-in flip flops don't need this mode, those work as ideal flipflop in all modes!)
  ['investigate', 2, 0]
];
function getMode() {
  for(var i = 0; i < modes.length; i++) {
    if(UPDATE_ALGORITHM == modes[i][1] && AUTOUPDATE == modes[i][2]) {
      return i;
    }
  };
  return -1;
}


var modeDropdown = makeUIElement('select', menuRow3El);
modeDropdown.title = 'Choose Emulation Algorithm. combinational: does not auto tick, does fast update when using a button or timer.' +
                     ' sequential: does fast update every so many milliseconds, works with sequential circuits with c, does not work for some flip-flops made from actual gates.' +
                     ' electron: does slow update every so many milliseconds, supports flip-flops crafted from gates, and even has some randomness mechanism to get them out of metastable state.' +
                     ' investigate: does not update unless you press the tick button, and does slow gate-per-gate updates without the randomness mechanism for flip-flops.' +
                     ' When loading a new circuit, a mode is automatically chosen as follows: by default, combinational. If any "c" is present, sequential. If a particular type of loop between gates (such as in SR latch) is detected, electron.'
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
tickButton.title = 'Tick once, to update to next state when the circuit is paused or in "investigate" mode. If the emulator is already autoticking, pressing this button has little effect.';
tickButton.onclick = update;

function isPaused() {
  return !timerinterval && !autoupdateinterval;
}

function updatePauseButtonText() {
  pauseButton.innerText = isPaused() ? 'paused' : 'pause';
}
var pauseButton = makeUIElement('button', menuRow3El);
pauseButton.innerText = 'pause';
pauseButton.title = 'pauses auto ticking and timers, or enables them again if already paused.';
pauseButton.onclick = function() {
  if(isPaused()) {
    unpause();
  } else {
    pause();
  }
};
updatePauseButtonText();


var boosted = false;
var boostButton = makeUIElement('button', menuRow3El);
boostButton.title = 'speeds up simulation, if possible within the computational resources of the web browser';
boostButton.innerText = 'boost';
boostButton.onclick = function() {
  if(boosted) {
    AUTOSECONDS *= 10;
    TIMERSECONDS *= 10;
    boostButton.innerText = 'boost';
  } else {
    AUTOSECONDS *= 0.1;
    TIMERSECONDS *= 0.1;
    boostButton.innerText = 'unboost';
  }
  boosted = !boosted;
  pause();
  unpause();
};

var ticksCounterEl = makeElement('div', menuRow3El);
ticksCounterEl.innerHTML = '&nbspticks:' + numticks;
ticksCounterEl.style.width = '95px';
ticksCounterEl.style.display = 'inline-block';



var rendererDropdown = makeUIElement('select', menuRow2El);
rendererDropdown.title = 'Choose renderer: graphical or text. Graphical is with HTML5 canvas and has better looking wire connections but may be slow in some browsers for large circuits. Text mode is faster and is more closely related to how you edit circuits with ASCII text.';
rendererDropdown.onchange = function() {
  graphics_mode = rendererDropdown.selectedIndex;
  graphics_mode_actual = rendererDropdown.selectedIndex;
  initDivs();
  render();
};
makeElement('option', rendererDropdown).innerText = 'text';
makeElement('option', rendererDropdown).innerText = 'graphical';
rendererDropdown.selectedIndex = graphics_mode;

/*
var toggleButton = makeUIElement('button', menuRow2El);
toggleButton.innerText = 'spark';
toggleButton.title = 'after clicking this button, click any component and its state will be toggled. May not take effect in fast mode.';
toggleButton.onclick = function() {
  toggleMode = true;
};
*/



var zoomoutButton = makeUIElement('button', menuRow2El, true);
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

var zoominButton = makeUIElement('button', menuRow2El, true);
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






var changeDropdownElements = [];

var changeDropdown = makeUIElement('select', menuRow2El);
changeDropdown.title = 'A simpler more primitive form of edit, but it works while a circuit is running. Change the type of a gate, switch or LED to this. First click an option from this list, then the main cell of a device (e.g. the "a" of an AND gate).' +
    ' This is a very limited form of editing. It doesn\'t support creating or removing wire connections. It can only change a device that has one of the types in the list to another type in the list. On other devices it may either do nothing, or cause' +
    ' unexpected behavior. Changes in IC templates have no effect on instances. Changes are not saved and not visible under the edit button. To do full editing, use the edit button instead.';
changeDropdown.onchange = function() {
  changeMode = changeDropdownElements[changeDropdown.selectedIndex];
  changeDropdown.selectedIndex = 0; // so that "onchange" works again even if choosing the same one ...
};

function registerChangeDropdownElement(type) {
  var text = (typesymbols[type] == undefined) ? '[change]' : typesymbols[type];
  if(type == 'c' || type == 'C') text = type;
  var el = makeElement('option', changeDropdown).innerText = text;
  changeDropdownElements.push(type);
};

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
// For 'c' and 'C' I can unfortunately not use TYPE, because c can mean both flipflop and constant.
// Instead some logic is created where changeMode is used instead, to decide to make it constant if 0 inputs, toggle flipflop otherwise, in each case off if c, on if C.
//registerChangeDropdownElement(TYPE_FLIPFLOP);
registerChangeDropdownElement('c');
registerChangeDropdownElement('C');
registerChangeDropdownElement(TYPE_RANDOM);


var editmode = false;

var textbeforeedit = '';
var editdiv;
var editarea;
var editButton = makeUIElement('button', menuRow2El);
editButton.innerText = 'edit';
editButton.title = 'Opens text field to edit the map. Press this button again to stop editing and run the new circuit. Read the editing tutorial under "help" first. Advice: for large projects, do not actually edit in the text field because that is fiddly, use a good text editor (that has block selection), or copypaste a circuit in here from an external source. '
                 + 'Once you use edit, the circuit will be saved in local storage (only the most recent one). To remove such save, press the forget button. Local storage is unreliable, so if you made a circuit you want to keep, copypaste it into a text editor and save it as a .txt file on disk instead. Note that nothing gets sent to any server or cloud, everything is'
                 + 'local to your computer only.';
editButton.onclick = function() {
  if(!editmode) {
    textbeforeedit = origtext;

    var fontsize = 10;
    var ewidth = Math.max(w, 16);
    var eheight = Math.min(Math.max(origtext.split('\n').length, 16));
    editarea = makeAbsElement('textarea', 30, 128, (fontsize + 2) * ewidth, (fontsize + 2) * eheight);
    editarea.rows = eheight;
    editarea.cols = ewidth;
    editarea.value = origtext;
    editarea.style.fontSize = fontsize + 'px';
    editarea.style.zIndex = '-1';
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
    if(newtext != textbeforeedit) setLocalStorage(newtext, 'circuit_text');
    editmode = false;
    parseText(newtext);
  }
};


var forgetButton = makeUIElement('button', menuRow2El);
forgetButton.innerText = 'forget';
forgetButton.title = 'If you have edited a circuit, this removes the saved circuit from local storage. If you refresh after pressing this button,' +
                     'you will no longer see the last circuit you edited, but the default introduction. WARNING! ' +
                     'if you want to keep your circuit, make sure you save it to disk first! That can be done by' +
                     'copypasting it from the edit field into a text editor and saving to your disk, e.g. as a .txt file.';
forgetButton.onclick = function() {
  setLocalStorage('', 'circuit_text');
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
  for(var y = 0; y < h; y++) {
    grid[y] = [];
    for(var x = 0; x < w; x++) {
      var c = x < lines[y].length ? lines[y][x] : ' ';
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
      // not yet implemented "vertical comment", but transform done to
      // avoid existing quotes commenting out wrong lines when transposed
      else if(c == '=') c = '"';
      else if(c == '"') c = '=';
      grid[y][x] = c;
    }
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
  for(var y = 0; y < h; y++) {
    grid[y] = [];
    for(var x = 0; x < w; x++) {
      var c = x < lines[y].length ? lines[y][x] : ' ';
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
      grid[y][x] = c;
    }
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
  parseText(text);
}

// extreme debugging! makes size 8x bigger so use with care!
function applyAllTransforms() {
  var text = '';
  for(var i = 0; i < 8; i++) {
    text += transform(origtext, i) + '\n';
  }
  parseText(text);
}

function printTransform(text, op) {
  console.log(transform(text, op));
}


var circuitDropdownSpan = makeElement('span', menuRow1El);

var currentSelectedCircuit = 0;

var prevCircuitButton = makeUIElement('button', menuRow1El, true);
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
      allRegisteredCircuits[currentSelectedCircuit].linkid);
};

var nextCircuitButton = makeUIElement('button', menuRow1El, true);
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
      allRegisteredCircuits[currentSelectedCircuit].linkid);
};


var importButton = makeUIElement('button', menuRow1El);
importButton.innerText = 'import';
importButton.title = 'Import a circuit from its ASCII diagram copypasted from elsewhere. Paste it into the field that appears, press done (this button itself) when finished. To export a circuit instead, use the "edit" button, or create your own circuit in a text editor.';
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
    editarea.focus();

    var donebutton = makeUIElement('button', editdiv);
    donebutton.style.position = 'absolute';
    donebutton.style.left = '330px';
    donebutton.style.top = '415px';
    donebutton.innerText = 'done';
    donebutton.onclick = importButton.onclick;

    var cancelbutton = makeUIElement('button', editdiv);
    cancelbutton.style.position = 'absolute';
    cancelbutton.style.left = '245px';
    cancelbutton.style.top = '415px';
    cancelbutton.innerText = 'cancel';
    cancelbutton.onclick = function() {
      editarea.value = '';
      importButton.onclick();
    };

    pause();
    importButton.innerText = 'done';
    editmode = true;
  } else {
    var newtext = editarea.value;
    document.body.removeChild(editdiv);
    importButton.innerText = 'import';
    editmode = false;
    if(newtext == '') {
      unpause();
    } else {
      parseText(newtext, 'imported circuit');
    }
  }
};



var githubLink = makeElement('span', menuRow2El);
githubLink.innerHTML = '&nbsp<a href="https://github.com/lvandeve/logicemu">github</a>';

var indexLink = makeElement('span', menuRow1El);
if(getParameterByName('id')) {
  indexLink.innerHTML = '&nbsp;&nbsp;<a href="' + getUrlWithoutQueries() + '">index</a>';
} else {
  indexLink.innerHTML = 'index';
  indexLink.style.paddingLeft = '10px';
  indexLink.style.color = '#00e';
  indexLink.style.textDecoration = 'underline';
  indexLink.style.cursor = 'pointer';
  indexLink.onclick = function() {
    if(origtext == introText) return;
    parseText(introText, introTitle, 'welcome')
  };
}


var directLinkSpan = makeElement('span', menuRow1El);
directLinkSpan.innerHTML = '&nbsp;&nbsp;';//<a href="' + getUrlWithoutQueries() + '">direct link</a>';
var directLink = makeElement('a', directLinkSpan);
directLink.innerText = 'direct link';
directLink.href = getUrlWithoutQueries();
directLink.style.visibility = 'hidden';
directLink.title = 'external link to link directly to this circuit rather than the index page';


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


function CircuitGroup(name) {
  this.circuits = [];
  this.circuitsNumbers = [];
  this.circuitsNames = [];
  this.circuitsIds = [];
  this.main = makeElement('div', circuitDropdownSpan);
  this.main.style.display = 'inline-block';
  this.title = makeElement('span', this.main);
  this.title.innerText = name;
  makeElement('br', this.main);
  this.dropdown = makeUIElement('select', this.main);
  this.dropdown.style.width = '120px';
  // disabled, using onclick of element instead
  var that = this;
  this.dropdown.onchange = function() {
    var index = that.dropdown.selectedIndex - 1;
    currentSelectedCircuit = that.circuitsNumbers[index];
    var c = that.circuits[index];
    parseText(c, that.circuitsNames[index], that.circuitsIds[index]);
    that.dropdown.selectedIndex = 0;
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
  var dropdownname = name;
  if(opt_is_title && name != '--------') dropdownname = '--- ' + name + ' ---';
  var el = makeElement('option', currentCircuitGroup.dropdown).innerHTML = dropdownname;
  var index = allRegisteredCircuits.length;
  currentCircuitGroup.circuits.push(circuit);
  currentCircuitGroup.circuitsNumbers.push(index);
  currentCircuitGroup.circuitsNames.push(name);
  currentCircuitGroup.circuitsIds.push(opt_link_id);
  var c = {};
  c.text = circuit;
  c.title = name;
  c.linkid = opt_link_id;
  c.istitle = opt_is_title;
  allRegisteredCircuits.push(c);
  if(opt_link_id) {
    linkableCircuits[opt_link_id] = [name, circuit, index];
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
0"Welcome to LogicEmu, a logic simulator running in your browser"
0"that supports combinational and sequential logic circuits."

0"LogicEmu comes with a lot of pre-packaged circuits built in. A selection"
0"is below, and all are in the 'help' and 'circuits' dropdowns above."
0"It's also possible to edit them or create your own circuits."
0"Try to experience the help tutorials first. The circuit you're viewing"
0"right now is called 'Welcome'."

0"In circuits, press the green 's' inputs with the mouse to change values."
0"Read results from the red 'l' outputs. For example, below is an AND gate"
0"(The 'a', this simulator comes with its own letter based notation)."
0"Only if both switches are on, the LED will go on. Try enabling both"
0"switches by clicking them:""

   s****>a****>l
         ^
   s******

0"There are much more types of gates and devices available: logic gates,"
0"flip-flops, integrated circuits, ROMs, displays, ... See the next"
0"tutorials to learn more!"

   s-->jq->l
   s-->c#
   s-->kQ->l

0"Below are all built-in circuits. You can always use the dropdowns at"
0"the top in the menu section to open these while one is open and you"
0"don't have this list."

0"INSERT:toc"


0"LogicEmu runs completely offline, even though it happens to be"
0"implemented in JavaScript and opened in a web browser."
0"That is, this html file and the few included js files are fetched"
0"from the server initially but once it runs, it does not make any"
0"further connections to any server, cloud or remote storage."
0"This means you can run LogicEmu as an offline application: if you download"
0"the html file and the few js files (either by viewing source here, or"
0"through github) and save them to disk, you can run LogicEmu from there"
0"with an offline browser."
0"All circuits listed above are already loaded since they are hardcoded"
0"in LogicEmu's source code. If you edit your own circuit, it's only"
0"stored in your browsers local storage (not cookie) but never sent"
0"anywhere. To share a circuit with others, you must share its source"
0"code yourself."


0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"              0"FIT:x"
`;

var introTitle = 'Online Logic Simulator';

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

