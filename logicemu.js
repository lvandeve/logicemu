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


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// Generic JavaScript utilities for LogicEmu
var LogicEmuUtils = (function() {
  // exported functions are assigned to result which will be returned by this self invoking anonymous function expression
  var result = {};

  var doNotAddToParent = 'doNotAddToParent';

  var makeElement = function(tag, opt_parent) {
    var parent = opt_parent || document.body;
    var el =  document.createElement(tag);
    if(parent != doNotAddToParent) parent.appendChild(el);
    return el;
  };
  result.makeElement = makeElement;

  var makeElementAt = function(tag, x, y, opt_parent) {
    var el = makeElement(tag, opt_parent);
    el.style.position = 'absolute';
    el.style.left = '' + Math.floor(x) + 'px';
    el.style.top = '' + Math.floor(y) + 'px';
    return el;
  };
  result.makeElementAt = makeElementAt;

  var makeAbsElement = function(tag, x, y, w, h, opt_parent) {
    var el = makeElement(tag, opt_parent);
    el.style.position = 'absolute';
    el.style.left = '' + Math.floor(x) + 'px';
    el.style.top = '' + Math.floor(y) + 'px';
    el.style.width = '' + Math.floor(w) + 'px';
    el.style.height = '' + Math.floor(h) + 'px';
    return el;
  };
  result.makeAbsElement = makeAbsElement;

  var removeElement = function(el) {
    if(!el) return;
    var p = el.parentNode;
    if(p && p.contains(el)) {
      p.removeChild(el);
    }
  };
  result.removeElement = removeElement;

  var makeDiv = function(x, y, w, h, opt_parent) {
    var el =  makeAbsElement('div', x, y, w, h, opt_parent);
    return el;
  };
  result.makeDiv = makeDiv;

  var styleUIElementBorder = function(el) {
    el.style.border = '1px solid #888';
  };
  result.styleUIElementBorder = styleUIElementBorder;

  var highlightUIElementBorder = function(el, opt_color) {
    var color = opt_color || 'black';
    el.style.border = '2px solid ' + color;
  };
  result.highlightUIElementBorder = highlightUIElementBorder;

  var styleUIElement = function(el, opt_smallbutton) {
    styleUIElementBorder(el);
    el.style.height = '20px';
    el.style.width = '80px';
    el.style.margin = '1px';
    el.style.padding = '0';
    el.style.backgroundColor = '#eee';
    el.style.cursor = 'pointer';
    el.style.boxShadow = '0.5px 0.5px #aaa';
    el.style.textAlign = 'center';
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
  };


  var makeUIElement = function(tag, opt_parent, opt_smallbutton) {
    var el = makeElement(tag, opt_parent);
    styleUIElement(el, opt_smallbutton);
    return el;
  };
  result.makeUIElement = makeUIElement;

  var makeUISpacer = function(width, el) {
    var s = makeElement('span', el);
    s.style.width = width + 'px';
    s.style.display = 'inline-block';
  };
  result.makeUISpacer = makeUISpacer;

  var makeInternalButton = function(title, parent, x, y, fun) {
    var button = makeUIElement('button', parent);
    button.style.position = 'absolute';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
    button.innerText = title;
    button.onclick = function() {
      fun();
    };
  };
  result.makeInternalButton = makeInternalButton;

  //bind a single argument to a function
  var bind = function(f, arg) {
    var args = Array.prototype.slice.call(arguments, 1);
    var result = function() {
      return f.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    };
    result.bound_f = f; // to be able to "extract" the original function out of it for debugging and by code
    result.bound_arg = arg; // to be able to "extract" the original function out of it for debugging and by code
    return result;
  };
  result.bind = bind;

  var clone = function(obj) {
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
  };
  result.clone = clone;

  var textHasAt = function(text, pos, sub) {
    return text.substr(pos, sub.length) == sub;
  };
  result.textHasAt = textHasAt;

  var mergeMaps = function(a, b) {
    var c = clone(a);
    for(var k in b) {
      if(b.hasOwnProperty(k)) c[k] = b[k];
    }
    return c;
  };
  result.mergeMaps = mergeMaps;

  var getCGIParameterByName = function(name, opt_url) {
    var url = opt_url || window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };
  result.getCGIParameterByName = getCGIParameterByName;

  // like getCGIParameterByName, but with # instead of ?
  var getFragmentParameterByName = function(name, opt_url) {
    var url = opt_url || window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[#&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };
  result.getFragmentParameterByName = getFragmentParameterByName;

  // sets fragment with this value. Supports only max 1 fragment in total.
  var setFragment = function(name, value) {
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
  };
  result.setFragment = setFragment;

  var clearFragment = function() {
    setFragment('', null);
  };
  result.clearFragment = clearFragment;

  // removes queries and fragments
  var getUrlWithoutQueries = function() {
    var url = window.location.href;
    var q = url.indexOf('?');
    if(q >= 0) url = url.substr(0, q);
    q = url.indexOf('#');
    if(q >= 0) url = url.substr(0, q);
    return url;
  };
  result.getUrlWithoutQueries = getUrlWithoutQueries;

  var clearSelection = function() {
    if(document.selection) {
      document.selection.empty();
    } else if(window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  };
  result.clearSelection = clearSelection;


  var localStorageSupported = function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch(e) {
      return false;
    }
  };
  result.localStorageSupported = localStorageSupported;

  //remember user settings locally (note that this is all fully local, nothing gets sent to any server)
  var setLocalStorage = function(data, name) {
    if(!localStorageSupported()) return;
    localStorage[name] = data;
  };
  result.setLocalStorage = setLocalStorage;

  //note: returns values as strings, e.g. booleans will get string 'true' or 'false'
  var getLocalStorage = function(name, opt_default) {
    if(!localStorageSupported()) return opt_default;
    if(localStorage[name] == undefined) return opt_default;
    return localStorage[name];
  };
  result.getLocalStorage = getLocalStorage;


  // Replacement for setInterval that hopefully works a bit better in modern background-tab-throttling browsers
  // This is not attempting to circumvent background throttling, but instead trying to prevent the tab hanging
  // when coming back to it and browsers may make it do all the missed intervals at once...
  // This tries to combine timeouts with the desired timing, with requestAnimationFrame which has better guarantees that
  // the browser will not do any more frames when the tab is in the background (rather than collect more and more "debt" of expensive updates it will try to call all at once)
  // TODO: this may require updating every now and then as browsers change their behavior of background tabs
  var setIntervalSafe = function(fun, msec) {
    var clear = false;
    var fun2 = function() {
      if(clear) return;
      fun();
      // requestAnimationFrame is used because this one will not run in background tab, which is better than being throttled in background tab but then do all updates at once when the tab becomes foreground, causing slow computation
      // NOTE: this may add an extra delay to the desired msec, of 1/60th of a second probably
      requestAnimationFrame(function() {
        // setTimeout is used becuase this one uses the desired milliseconds unlike requestAnimationFrame.
        window.setTimeout(fun2, msec);
      });
    };
    window.setTimeout(fun2, msec);
    var clearfun = function() {
      clear = true;
    };
    return clearfun;
  };
  result.setIntervalSafe = setIntervalSafe;

  var clearIntervalSafe = function(id) {
    id(); // id is actually a function.
  };
  result.clearIntervalSafe = clearIntervalSafe;

  // See explanation at setIntervalSafe
  var setTimeoutSafe = function(fun, msec) {
    // NOTE: this is very unreliable in modern browsers, especially when tabs come back from background
    var time0 = (new Date()).getTime(); // milliseconds since epich
    var canceled = false;

    // test: disable the requestAnimationFrame step: makes it faster for small msec amounts, but however
    // causes risk of causing browser to hang when this tab was in background and gets enabled again only later
    // TODO: find way that allows fast updates yet works correctly (= doesnt' consume resources just like the browser wants) in background tabs. Unfortunately requestAnimationFrame is the only thing that guarantees nice behavior but is limited to 60fps... so using requestAnimationFrame only every so many ticks (of the update() function) could work
    //var requestAnimationFrame = function(fun){fun();};

    requestAnimationFrame(function() {
      if(canceled) return;
      var time1 = (new Date()).getTime();
      var d = time1 - time0;
      msec -= d;
      if(msec > 0) {
        window.setTimeout(function() {
          if(canceled) return;
          fun();
        }, msec);
      } else {
        fun();
      }
    });
    return function() {
      canceled = true;
    };
  };
  result.setTimeoutSafe = setTimeoutSafe;

  var clearTimeoutSafe = function(id) {
    id(); // id is actually a function.
  };
  result.clearTimeoutSafe = clearTimeoutSafe;


  // warning: does not validate input
  var normalizeCSSColor = function(css) {
    // only has named colors used somewhere in here.
    if(css == 'black') css = '#000000';
    if(css == 'white') css = '#ffffff';
    if(css == 'red') css = '#ff0000';
    if(css == 'green') css = '#00ff00';
    if(css == 'blue') css = '#0000ff';
    if(css == 'yellow') css = '#00ffff';
    if(css.length == 4) {
      css = '#' + css[1] + css[1] + css[2] + css[2] + css[3] + css[3];
    }
    return css;
  };

  var parseCSSColor = function(css) {
    css = normalizeCSSColor(css);
    var r = parseInt(css.substr(1, 2), 16);
    var g = parseInt(css.substr(3, 2), 16);
    var b = parseInt(css.substr(5, 2), 16);
    return [r, g, b];
  };


  var formatCSSColor = function(rgb) {
    var r = rgb[0].toString(16);
    var g = rgb[1].toString(16);
    var b = rgb[2].toString(16);
    if(r.length == 1) r = '0' + r;
    if(g.length == 1) g = '0' + g;
    if(b.length == 1) b = '0' + b;
    return '#' + r + g + b;
  };

  var formatCSSColorAlpha = function(rgba) {
    return 'rgba(' + rgba[0].toString(10) + ', ' + rgba[1].toString(10) + ', ' +
           rgba[2].toString(10) + ', ' + (rgba[3] / 255.0) + ')';
  };

  // slightly darkens the color
  var darkenColor = function(css, amount) {
    amount = amount || 16;
    var rgb = parseCSSColor(css);
    rgb[0] = Math.max(0, rgb[0] - amount);
    rgb[1] = Math.max(0, rgb[1] - amount);
    rgb[2] = Math.max(0, rgb[2] - amount);
    return formatCSSColor(rgb);
  };

  // slightly brightens the color
  var brightenColor = function(css, amount) {
    amount = amount || 16;
    var rgb = parseCSSColor(css);
    rgb[0] = Math.min(255, rgb[0] + amount);
    rgb[1] = Math.min(255, rgb[1] + amount);
    rgb[2] = Math.min(255, rgb[2] + amount);
    return formatCSSColor(rgb);
  };

  // alpha given in range 0.0-1.0
  var addAlpha = function(css, alpha) {
    var rgb = parseCSSColor(css);
    return formatCSSColorAlpha([rgb[0], rgb[1], rgb[2], alpha * 255]);
  };
  result.addAlpha = addAlpha;

  // either darkens or lightens the color, depending on how light it is
  var twiddleColor = function(css, amount) {
    amount = amount || 16;
    var rgb = parseCSSColor(css);
    var lightness = 0.21 * rgb[0] + 0.72 * rgb[1] + 0.07 * rgb[2];
    return lightness < 128 ? brightenColor(css, amount) : darkenColor(css, amount);
  };
  result.twiddleColor = twiddleColor;


  var negateColor = function(css) {
    var rgb = parseCSSColor(css);
    rgb[0] = (255 - rgb[0]);
    rgb[1] = (255 - rgb[1]);
    rgb[2] = (255 - rgb[2]);
    return formatCSSColor(rgb);
  };
  result.negateColor = negateColor;

  var negateLigntness = function(css) {
    var rgb = parseCSSColor(css);
    var r = rgb[0];
    var g = rgb[1];
    var b = rgb[2];
    var mm = Math.min(Math.min(r, g), b) + Math.max(Math.max(r, g), b);
    r = 255 - mm + r;
    g = 255 - mm + g;
    b = 255 - mm + b;
    return formatCSSColor([r, g, b]);
  };
  result.negateLigntness = negateLigntness;



  var averageColor = function(css0, css1) {
    var rgb0 = parseCSSColor(css0);
    var rgb1 = parseCSSColor(css1);
    rgb0[0] = ((rgb0[0] + rgb1[0]) >> 1);
    rgb0[1] = ((rgb0[1] + rgb1[1]) >> 1);
    rgb0[2] = ((rgb0[2] + rgb1[2]) >> 1);
    return formatCSSColor(rgb0);
  };
  result.averageColor = averageColor;


  return result;
}());

var util = LogicEmuUtils;

// for now, export this very often used utility functions directly
var bind = util.bind;
var makeDiv = util.makeDiv;


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var maindiv = undefined;

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

// [search terms: timerspeed autospeed clockspeed timer_speed auto_seconds timer_seconds tickspeed]
var NORMALTICKLENGTH = 0.05; // the normal speed between circuit updates. Also used for timers. 0.05 normal tick length makes it such that a timer with value 10 will have a full period of 1 second.
var AUTOSECONDS = NORMALTICKLENGTH;

var AUTOPAUSESECONDS = 3000; // for autopauseinterval
var USEAUTOPAUSE = true; // pause after LogicEmu was open in a browser tab for a long time (AUTOPAUSESECONDS seconds)



var TWIDDLE_PROBABILITY = 0.1; // for update algorithm 3


var USE_BRESENHAM = true; // if true, use bresenham for diagonal lines to ensure they are not blurry (not antialiased as it looks choppier instead of better here)


var origtext = ''; // the currently loaded circuit original text
var origtitle = null;

var BACKSLASH_ALTERNATIVE = ';'; // because backslash in `` type strings does not work
var DQUOT_ALTERNATIVE = '`'; // JS strings can use `, in other languages " is already the string quotes

var graphics_mode = 1; // 0=text, 1=canvas
var graphics_mode_actual = graphics_mode;

var worldstartheight = 160; // under menu

var worldDiv = makeDiv(10, worldstartheight, 0, 0, maindiv);
var renderingMessageDiv = makeDiv(10, worldstartheight, 0, 0);

// num active ticks done
var numticks = 0;

// num ticks from the viewpoint of timer (includes ticks that were never rendered or computed)
var timerticks = 0;

var supportbigint = !!window.BigInt;

// tile size
var tw = 9;
var th = 9;



// component types (not cell types!)
var TYPE_index = 0;
var TYPE_NULL = TYPE_index++; // uninited
var TYPE_LOOSE_WIRE_EXPLICIT = TYPE_index++; // it has no core, it's just a loose wire, always outputs 0 (in real life, would be "floating" instead)
var TYPE_LOOSE_WIRE_IMPLICIT = TYPE_index++; // like TYPE_LOOSE_WIRE_EXPLICIT, but without any explicit added things like -, |, ^, ..., only implicit part of +, x, X, ...
var TYPE_UNKNOWN_DEVICE = TYPE_index++; // unknown device, which has only device extenders '#', no core. May become one or more TYPE_VTE, TYPE_ROM, ... in a later parsing step if it was a # that extends such device. But for others like AND gate, it will not become a TYPE_UNKNOWN_DEVICE but already be part of TYPE_AND initially (but the big types like VTE need multiple components due to multiple outputs)
var TYPE_SWITCH_OFF = TYPE_index++;
var TYPE_SWITCH_ON = TYPE_index++;
var TYPE_LED = TYPE_index++;
var TYPE_PUSHBUTTON_OFF = TYPE_index++;
var TYPE_PUSHBUTTON_ON = TYPE_index++;
var TYPE_TIMER_OFF = TYPE_index++; // initially off, then will go on, off again, etc...
var TYPE_TIMER_ON = TYPE_index++; // initially on, then will go off, on again, etc...
var TYPE_AND = TYPE_index++;
var TYPE_OR = TYPE_index++;
var TYPE_XOR = TYPE_index++; // odd parity gate
var TYPE_NAND = TYPE_index++;
var TYPE_NOR = TYPE_index++;
var TYPE_XNOR = TYPE_index++; // even parity gate
var TYPE_ONEHOT = TYPE_index++; // the 'real' exclusive or, a one hot detector, but not a primitive gate like XOR since it is more expensive to build than cascating multiple 2-input XORs
var TYPE_NONEHOT = TYPE_index++; // inverted one-hot (not-one-hot, not none-hot)
var TYPE_FLIPFLOP = TYPE_index++; // "c", "C" when combined with other FF parts
var TYPE_COUNTER = TYPE_index++; // standalone "c", "C". TODO: this does not need a separate type, since the TYPE_FLIPFLOP's programming can also handle its behaviour (it handles the c+y combination, which does the same if y is on, for example)
var TYPE_CONSTANT_OFF = TYPE_index++; // 'f' and 'F' from fixed, since letter c is already for counter and clock
var TYPE_CONSTANT_ON = TYPE_index++;
var TYPE_DELAY = TYPE_index++;
var TYPE_ROM = TYPE_index++;
var TYPE_MUX = TYPE_index++;
var TYPE_ALU = TYPE_index++;
var TYPE_IC = TYPE_index++; // also called "sub"
var TYPE_IC_PASSTHROUGH = TYPE_index++; // the switch gets internally converted into this. Behaves like OR, but will have always only 1 input
var TYPE_VTE = TYPE_index++;
var TYPE_DOTMATRIX = TYPE_index++;
var TYPE_TRISTATE = TYPE_index++;
var TYPE_TRISTATE_INV = TYPE_index++;
var TYPE_RANDOM = TYPE_index++;
var TYPE_TOC = TYPE_index++; // table of contents, a type of comment

// number types (higher value = higher priority) [numbertype number priority number order numbers priority numbers order]
var NUMBER_index = 0;
var NUMBER_NONE = NUMBER_index++;
var NUMBER_LED = NUMBER_index++;
var NUMBER_TIMER = NUMBER_index++;
var NUMBER_ROM = NUMBER_index++;
var NUMBER_ALU = NUMBER_index++;
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
typesymbols[TYPE_LED] = 'l'; typesymbols[TYPE_DOTMATRIX] = 'D';
typesymbols[TYPE_PUSHBUTTON_OFF] = 'p'; typesymbols[TYPE_PUSHBUTTON_ON] = 'P';
typesymbols[TYPE_TIMER_OFF] = 'r'; typesymbols[TYPE_TIMER_ON] = 'R';
typesymbols[TYPE_AND] = 'a'; typesymbols[TYPE_NAND] = 'A';
typesymbols[TYPE_OR] = 'o'; typesymbols[TYPE_NOR] = 'O';
typesymbols[TYPE_XOR] = 'e';  typesymbols[TYPE_XNOR] = 'E';
typesymbols[TYPE_ONEHOT] = 'h'; typesymbols[TYPE_NONEHOT] = 'H';
typesymbols[TYPE_CONSTANT_OFF] = 'f'; typesymbols[TYPE_CONSTANT_ON] = 'F';
typesymbols[TYPE_FLIPFLOP] = 'c'; typesymbols[TYPE_RANDOM] = '?'; typesymbols[TYPE_DELAY] = 'd';
typesymbols[TYPE_TRISTATE] = 'z'; typesymbols[TYPE_TRISTATE_INV] = 'Z';


// all devices except flipflop, those are treated differently because multiple different cells of its type can form one component
var devicemap = {'a':true, 'A':true, 'o':true, 'O':true, 'e':true, 'E':true, 'h':true, 'H':true, 'f':true, 'F':true,
                 's':true, 'S':true, 'l':true, 'r':true, 'R':true, 'p':true, 'P':true,
                 'j':true, 'k':true, 'd':true, 't':true, 'q':true, 'Q':true, 'c':true, 'C':true, 'y':true,
                 'b':true, 'B':true, 'M':true, 'U':true, 'i':true, 'T':true, 'D':true, 'z':true, 'Z':true, '?':true};
var specialextendmap = {'#i':true, '#c':true, '#b':true, '#M':true, '#U':true, '#T':true}; // special extenders for large devices (not all of those are used yet)
// devicemap as well as # (with extends devices)
var devicemaparea = util.mergeMaps(devicemap, specialextendmap); devicemaparea['#'] = true;
var ffmap = {'j':true, 'k':true, 'd':true, 't':true, 'q':true, 'Q':true, 'c':true, 'C':true, 'y':true};
var rommap = {'b':true, 'B':true};
var inputmap = {'^':true, '>':true, 'v':true, '<':true, 'm':true, ']':true, 'w':true, '[':true, 'V':true, 'W':true, 'X':true, 'Y':true};
var dinputmap = {'^':true, '>':true, 'v':true, '<':true, 'm':true, ']':true, 'w':true, '[':true}; // directional inputs only
var wiremap = {'-':true, '|':true, '+':true, '.':true, '/':true, '\\':true, 'x':true, 'g':true, '=':true, '(':true, ')':true, 'n':true, 'u':true, ',':true, '%':true, '&':true, '*':true}; // TODO: remove antennas from wiremap?
var antennamap = {'(':true, ')':true, 'n':true, 'u':true};
// only those actively interact diagonally (plus diaginputs but those are not identified by character...)
var diagonalmap = {'x':true, 'X':true, 'Y':true, '/':true, '\\':true, '*':true};
//non-isolators (does not include isolators like ' ' and '0-9' despite being "known"). I is also not part of this, but i is.
var knownmap = {'-':true, '|':true, '+':true, '.':true, '/':true, '\\':true, 'x':true, 'g':true,
                'a':true, 'A':true, 'o':true, 'O':true, 'e':true, 'E':true, 'h':true, 'H':true, 'f':true, 'F':true,
                's':true, 'S':true, 'l':true, 'r':true, 'R':true, 'p':true, 'P':true,
                'c':true, 'C':true, 'y':true, 'j':true, 'k':true, 't':true, 'd':true, 'q':true, 'Q':true, 'b':true, 'B':true, 'M':true, 'U':true,
                '^':true, '>':true, 'v':true, '<':true, 'm':true, ']':true, 'w':true, '[':true, 'V':true, 'W':true, 'X':true, 'Y':true,
                '#':true, '=':true, 'i':true, 'T':true, 'D':true, '(':true, ')':true, 'n':true, 'u':true, ',':true, '%':true, '&':true, '*':true,
                'z':true, 'Z':true, '?':true, 'toc':true, '#i':true, '#c':true, '#b':true, '#M':true, '#U':true, '#T':true};
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
        else if(x + 1 < w && y > 0 && world[y - 1][x + 1].circuitsymbol == 'X') dir = 4;
        else if(x + 1 < w && y + 1 < h && world[y + 1][x + 1].circuitsymbol == 'X') dir = 5;
        else if(x > 0 && y + 1 < h && world[y + 1][x - 1].circuitsymbol == 'X') dir = 6;
        else if(x > 0 && y > 0 && world[y - 1][x - 1].circuitsymbol == 'X') dir = 7;
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
      the chip. However, if it's a large switch extended with ###, we
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
          if(neigh.circuitsymbol == '#') {
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
          if(neigh.circuitsymbol == '#' || neigh.circuitsymbol == 's') continue;

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
      component.previnputs = util.clone(v.previnputs);
      component.ff_cycle = v.ff_cycle;
      component.ff_cycle_time = v.ff_cycle_time;
      component.master = null; // handled further
      component.rom = null; // handled further
      component.mux = null; // handled further
      component.vte = null; // handled further
      component.alu = null; // handled further
      component.ff = null; // handled further
      component.rom_out_pos = v.rom_out_pos;
      component.number = v.number;
      component.defsubindex = v.defsubindex;
      component.callsubindex = v.callsubindex;
      component.rgbcolor = v.rgbcolor;
      component.clocked = v.clocked;
      component.frozen = v.frozen;

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
        rom.array = v.rom.ram ? util.clone(v.rom.array) : v.rom.array;
        rom.output = util.clone(v.rom.output);
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
        rom.selected = util.clone(v.rom.selected);
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
        mux.output = util.clone(v.mux.output);
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
      if(v.vte) {
        var vte = new VTE();
        component.vte = vte;
        vte.x0 = v.vte.x0;
        vte.y0 = v.vte.y0;
        vte.x1 = v.vte.x1;
        vte.y1 = v.vte.y1;
        vte.text = util.clone(v.vte.text);
        vte.numinputs = v.vte.numinputs;
        vte.numoutputs = v.vte.numoutputs;
        vte.cursorx = v.vte.cursorx;
        vte.cursory = v.vte.cursory;
        vte.prevwrite = v.vte.prevwrite;
        vte.prevread = v.vte.prevread;
        vte.output = util.clone(v.vte.output);
        vte.decimaldisplay = v.vte.decimaldisplay;
        vte.passthrough = v.vte.passthrough;
        vte.decimalinput = v.vte.decimalinput;
        vte.counter = v.vte.counter;
        vte.countervalue = v.vte.countervalue;
        vte.previnput = v.vte.previnput;
        vte.previnput2 = v.vte.previnput2;
        vte.allowstyping = v.vte.allowstyping;
        vte.keybuffer = util.clone(v.vte.keybuffer);
        vte.invisible = true;
      }
      if(v.alu) {
        var alu = new Alu();
        component.alu = alu;
        alu.master = component;
        alu.error = v.alu.error;
        alu.errormessage = v.alu.errormessage;
        alu.adir = v.alu.adir;
        alu.alsbpos = v.alu.alsbpos;
        alu.numa = v.alu.numa;
        alu.bdir = v.alu.bdir;
        alu.blsbpos = v.alu.blsbpos;
        alu.numb = v.alu.numb;
        alu.cdir = v.alu.cdir;
        alu.clsbpos = v.alu.clsbpos;
        alu.numc = v.alu.numc;
        alu.odir = v.alu.odir;
        alu.olsbpos = v.alu.olsbpos;
        alu.numo = v.alu.numo;
        alu.miscindir = v.alu.miscindir;
        alu.miscoutdir = v.alu.miscoutdir;
        alu.miscinlsbpos = v.alu.miscinlsbpos;
        alu.miscoutlsbpos = v.alu.miscoutlsbpos;
        alu.nummiscin = v.alu.nummiscin;
        alu.nummiscout = v.alu.nummiscout;
        alu.output = util.clone(v.alu.output);
        alu.opindex = v.alu.opindex;
        alu.signed = v.alu.signed;
        alu.x0 = v.alu.x0;
        alu.y0 = v.alu.y0;
        alu.x1 = v.alu.x1;
        alu.y1 = v.alu.y1;
      }
      if(v.ff) {
        var ff = new FF();
        ff.value = v.ff.value;
        ff.numc = v.ff.numc;
        ff.numq = v.ff.numq;
        ff.numQ = v.ff.numQ;
        ff.numy = v.ff.numy;
        ff.numt = v.ff.numt;
        ff.numd = v.ff.numd;
        ff.numj = v.ff.numj;
        ff.numk = v.ff.numk;
        ff.numff = v.ff.numff;
        component.ff = ff;
      }
      if(v.tristate) {
        var tristate = new TriState();
        tristate.component = component;
        tristate.invin = v.tristate.invin;
        tristate.invout = v.tristate.invout;
        component.tristate = tristate;
      }
      if(v.dotmatrix) {
        // Do nothing, don't copy the dotmatrix: it's an output-only
        // component, and is invisible inside IC's, so has no effect
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
    if(this.inited) return true;
    this.inited  = true;
    var alreadyerror = this.error; // already error, but try to parse anyway, so that it can find the components to which to set this error
    if(alreadyerror) this.error = false;

    // these inputs and outputs are the world components. For the internal components, defsub.inputs/outputs can be used. They should have the exact same order and amount
    // inputs are component that sends the input to us; x,y is where the device input is
    // outputs are the components of ourselves, that will transfer the signal to what reads from that
    var inputs = []; // ordered clockwise NESW. Array of arrays, the sub arrays contain: [component, dir, x, y, negated]
    var outputs = [];

    for(var i = 0; i < this.cells.length; i++) {
      var cell = world[this.cells[i][1]][this.cells[i][0]];
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
            outputs.push([component, j, x, y]);
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

    if(alreadyerror && !this.error) this.markError(this.errormessage);

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








// returns: [array, ni, no, ei, eo, si, so, wi, wo]
// array is array of input and output series, each element is an array: [heading, num, begin, end, output] with:
// -heading: 0-3 for NESW
// -num: amount of bits for this series
// -begin and end: x0-x1 or y0-y1 coordinate of this series on the current side (in absolute world coordinates of the relevant dimension)
// -output: 1 if this is a series of outputs, else it's a series of inputs.
// --> inputs and outputs are mixed and given in clockwise order starting from the left side of the north edge.
// ni, no, ei, eo, si, so, wi and wo are arrays with references to the same elements as the main array, but only for north inputs, north outputs, east inputs, etc...
function getIO(x0, y0, x1, y1, master) {
  var nv = [];
  var ev = [];
  var sv = [];
  var wv = [];

  for(var i = 0; i < master.inputs.length; i++) {
    var x = master.inputs_x[i];
    var y = master.inputs_y[i];
    if(x == x0 - 1) {
      wv.push([y, 0]);
    } else if(x == x1) {
      ev.push([y, 0]);
    } else if(y == y0 - 1) {
      nv.push([x, 0]);
    } else if(y == y1) {
      sv.push([x, 0]);
    } else return null;
  }

  for(var x = x0; x < x1; x++) {
    if(connected2(x, y0, 0)) {
      nv.push([x, 1]);
    }
    if(connected2(x, y1 - 1, 2)) {
      sv.push([x, 1]);
    }
  }
  for(var y = y0; y < y1; y++) {
    if(connected2(x0, y, 3)) {
      wv.push([y, 1]);
    }
    if(connected2(x1 - 1, y, 1)) {
      ev.push([y, 1]);
    }
  }

  nv.sort(function(a, b) {
    return a[0] - b[0];
  });
  ev.sort(function(a, b) {
    return a[0] - b[0];
  });
  sv.sort(function(a, b) {
    return b[0] - a[0];
  });
  wv.sort(function(a, b) {
    return b[0] - a[0];
  });

  var array = []; // array of [heading, num, begin, end, output]
  var current = null;

  for(var i = 0; i < nv.length; i++) {
    if(i == 0 || nv[i][1] != current[4] || nv[i][0] > current[3]) {
      current = [0, 1, nv[i][0], nv[i][0] + 1, nv[i][1]];
      array.push(current);
    } else {
      current[1]++;
      current[3]++;
    }
  }
  for(var i = 0; i < ev.length; i++) {
    if(i == 0 || ev[i][1] != current[4] || ev[i][0] > current[3]) {
      current = [1, 1, ev[i][0], ev[i][0] + 1, ev[i][1]];
      array.push(current);
    } else {
      current[1]++;
      current[3]++;
    }
  }
  for(var i = 0; i < sv.length; i++) {
    if(i == 0 || sv[i][1] != current[4] || sv[i][0] < current[2] - 1) {
      current = [2, 1, sv[i][0], sv[i][0] + 1, sv[i][1]];
      array.push(current);
    } else {
      current[1]++;
      current[2]--;
    }
  }
  for(var i = 0; i < wv.length; i++) {
    if(i == 0 || wv[i][1] != current[4] || wv[i][0] < current[2] - 1) {
      current = [3, 1, wv[i][0], wv[i][0] + 1, wv[i][1]];
      array.push(current);
    } else {
      current[1]++;
      current[2]--;
    }
  }

  var ni = [];
  var no = [];
  var ei = [];
  var eo = [];
  var si = [];
  var so = [];
  var wi = [];
  var wo = [];

  for(var i = 0; i < array.length; i++) { // [heading, num, begin, end, output]
    var a = array[i];
    if(a[0] == 0 && !a[4]) ni.push(a);
    if(a[0] == 0 && a[4]) no.push(a);
    if(a[0] == 1 && !a[4]) ei.push(a);
    if(a[0] == 1 && a[4]) eo.push(a);
    if(a[0] == 2 && !a[4]) si.push(a);
    if(a[0] == 2 && a[4]) so.push(a);
    if(a[0] == 3 && !a[4]) wi.push(a);
    if(a[0] == 3 && a[4]) wo.push(a);
  }

  return [array, ni, no, ei, eo, si, so, wi, wo];
}


// Different output format than getIO: can return input and output series on all sides. 0-4 input sides and 0-4 output sides supported. But max 1 input series and 1 output series per side.
// returns 2D array of form:
// [[[niv], nic], [[eiv], eic], [[siv], sic], [[wiv], wic],[[nov], noc], [[eov], eoc], [[sov], soc], [[wov], woc]];
// with first letter the direction (NESW), next i or o for input/output, and next symbol: v for array, c for count
// end is non-inclusive
// array has absolute world coordinates of the corresponding inputs or outputs for the dimension corresponding to the side
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
    } else {
      return null;
    }
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


// Another different output format of getIO. Allows gaps in between
// returns 2D array of form: [[[nv], nc, nt], [[ev], ec, et], [[sv], sc, st], [[wv], wc, wt], ic, oc];
// with first letter the direction (NESW), and next symbol: v is array with the locations, c num inputs or outputs and t meaning type: 0:none,1:input,2:output.
// ic and oc are input count and output count
// array has absolute world coordinates of the corresponding inputs or outputs for the dimension corresponding to the side
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
        if(!(rommap[c.circuitsymbol] || c.circuitsymbol == '#b')) return false;
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
    this.master.type = TYPE_ROM; // reason: it might be TYPE_UNKNOWN_DEVICE if it was parsed with #
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
      if(numin < numout) {
        // decoder (binary to unary)
        type = 2;
      } else if(numout < numin) {
        // encoder (unary to binary)
        type = 3;
      } else if(numin == numout) {
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

    // The '#b' symbols are not used if this is memory where b and B matter, but
    // is used if this is a non-memory device, where you can use a single b and
    // multiple #
    var usefiller = (this.decoder || this.encoder || this.priority);

    var components = [[this.master, this.master_orig_x, this.master_orig_y]];
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        if(!rommap[c.circuitsymbol] && !(usefiller && c.circuitsymbol == '#b')) continue;
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
        if(c.circuitsymbol == 'M' || c.circuitsymbol == '#M') {
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
    this.master.type = TYPE_MUX; // reason: it might be TYPE_UNKNOWN_DEVICE if it was parsed with #
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
      if(c.circuitsymbol != 'M' && c.circuitsymbol != '#M') continue;
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
      if(c.circuitsymbol != 'M' && c.circuitsymbol != '#M') continue;
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

// a modulo b, matching floored division (not matching truncated division, like the % operation does)
function mod(a, b) {
  var negb = (b < 0);
  if(negb) b = -b;
  var nega = (a < 0);
  if(nega) a = -a;
  a %= b;
  if(nega) { a = (b - a) % b; } // not the most optimal implementation, but made to easily work for both Number and BigInt
  if(negb) a = -a;
  return a;
}

// Arithmetic Logic Unit ('U')
function Alu() {
  this.master = null;
  this.error = false;
  this.errormessage = null;
  // input A
  this.adir = -1;
  this.alsbpos = 0;  // 0: left or top, 1: right or bottom. Where the LSB of address input bits is.
  this.numa = 0;
  // input B
  this.bdir = -1;
  this.blsbpos = 0;
  this.numb = 0;
  // input C
  this.cdir = -1;
  this.clsbpos = 0;
  this.numc = 0;
  // output
  this.odir = -1;
  this.olsbpos = 0;
  this.numo = 0;
  // misc side: carry in, carry or overflow out
  this.miscindir = -1;
  this.miscoutdir = -1;
  this.nummiscin = 0;
  this.nummiscout = 0;
  this.miscinlsbpos = 0;
  this.miscoutlsbpos = 0;
  this.signed = false;
  this.opindex = 0;

  this.output = []; // current ouput values (first data output(s), then the misc ones passthrough)

  // should have rectangular shape
  this.x0 = -1;
  this.y0 = -1;
  this.x1 = -1;
  this.y1 = -1;

  // max 4 characters
  this.getOpShortName = function() {
    switch(this.opindex) {
        case 0: return 'zero';
        case 1: return 'and';
        case 2: return 'nimb';
        case 3: return 'a';
        case 4: return 'nima';
        case 5: return 'b';
        case 6: return 'xor';
        case 7: return 'or';
        case 8: return 'nor';
        case 9: return 'xnor';
        case 10: return 'notb';
        case 11: return 'impa';
        case 12: return 'nota';
        case 13: return 'impb';
        case 14: return 'nand';
        case 15: return 'ones';
        case 16: return 'eq';
        case 17: return 'lt';
        case 18: return 'lte';
        case 19: return 'neq';
        case 20: return 'gte';
        case 21: return 'gt';
        case 22: return 'min';
        case 23: return 'max';
        case 24: return 'add';
        case 25: return 'sub';
        case 26: return 'mul';
        case 27: return 'div';
        case 28: return 'rem';
        case 29: return 'fdiv';
        case 30: return 'mod';
        case 32: return 'inc';
        case 33: return 'dec';
        case 34: return 'neg';
        case 35: return 'abs';
        case 36: return 'sign';
        case 38: return '2bcd';
        case 39: return 'bcd2';
        case 40: return 'lsh';
        case 41: return 'rsh';
        case 42: return 'rlsh';
        case 43: return 'rrsh';
        case 44: return 'mirr';
        case 45: return 'popc';
        case 46: return 'clz';
        case 47: return 'ctz';
        case 48: return 'pow';
        //case 49: return 'log';
        //case 50: return 'root';
        case 52: return 'gcd';
        case 53: return 'lcm';
        case 56: return 'minv';
        case 57: return 'log2';
        case 58: return 'sqrt';
        case 59: return 'fact';
        case 60: return 'sin';
        default: return 'unk';
    }
  };

  this.getOpLongName = function() {
    switch(this.opindex) {
        case 0: return 'zero';
        case 1: return 'bitand';
        case 2: return 'a nimply b';
        case 3: return 'a';
        case 4: return 'b nimply a';
        case 5: return 'b';
        case 6: return 'bitxor';
        case 7: return 'bitor';
        case 8: return 'bitnor';
        case 9: return 'bitxnor';
        case 10: return 'bitinvert b';
        case 11: return 'b imply a';
        case 12: return 'bitinvert a';
        case 13: return 'a imply b';
        case 14: return 'bitnand';
        case 15: return 'all ones';
        case 16: return this.numc ? 'equals modulo third input' : 'equals';
        case 17: return 'lesser than';
        case 18: return 'lesser than or equals';
        case 19: return this.numc ? 'not equals modulo third input' : 'not equals';
        case 20: return 'greater than or equals';
        case 21: return 'greater than';
        case 22: return 'minimum';
        case 23: return 'maximum';
        case 24: return this.numc ? 'add modulo third input' : 'add';
        case 25: return this.numc ? 'subtract modulo third input' : 'subtract';
        case 26: return this.numc ? 'multiply modulo third input' : 'multiply';
        case 27: return this.numc ? 'divide modulo third input' : 'divide';
        case 28: return 'remainder';
        case 29: return this.numc ? 'floor divide modulo third input' : 'floor divide';
        case 30: return 'modulo';
        case 32: return 'increment';
        case 33: return 'decrement';
        case 34: return 'negate';
        case 35: return 'absolute value';
        case 36: return this.numb ? 'copysign' : 'sign';
        case 38: return 'binary to bcd (binary coded decimal)';
        case 39: return 'bcd to binary (bcd = binary coded decimal)';
        case 40: return 'left shift';
        case 41: return 'right shift';
        case 42: return 'rotating left shift';
        case 43: return 'rotating right shift';
        case 44: return 'mirror bits';
        case 45: return 'popcount';
        case 46: return 'count leading zeros';
        case 47: return 'count trailing zeros';
        case 48: return this.numc ? 'integer power modulo third input' : 'integer power';
        //case 49: return 'integer log';
        //case 50: return 'integer root';
        case 52: return 'greatest common divider';
        case 53: return 'least common multiple';
        case 56: return this.numb ? 'modular inverse (modulo output size)' : 'modular inverse';
        case 57: return 'integer base-2 logarithm';
        case 58: return 'integer square root';
        case 59: return this.numb ? 'factorial modulo second input' : 'factorial';
        case 60: return 'sine (scaled)';
        default: return 'unknown';
    }
  };


  // first inputs are the data, last the select
  this.update = function(inputs) {
    if(inputs.length != this.numa + this.numb + this.numc + this.nummiscin) return false;

    for(var i = 0; i < this.output.length; i++) this.output[i] = 0;

    var usebigint = supportbigint;
    // the notation 0n, 1n, 3n, ... cannot be used, because if browser doesn't support BigInt, it'll give parsing error on decimal number ending with n.
    // so use the BigInt construction function instead and name a few common values;
    var n_1 = -1, n0 = 0, n1 = 1, n2 = 2, n4 = 4, n10 = 10, n15 = 15;
    if(usebigint) {
      n_1 = BigInt(-1);
      n0 = BigInt(0);
      n1 = BigInt(1);
      n2 = BigInt(2);
      n4 = BigInt(4);
      n10 = BigInt(10);
      n15 = BigInt(15);
    }

    var a, b, c;
    var op = this.opindex;

    var signed = this.signed;
    if(op < 16) signed = false;
    if(op == 34 || op == 35) signed = true;

    if(usebigint) {
      a = n0;
      for(var i = 0; i < this.numa; i++) {
        var j = i + this.numb + this.numc;
        if(inputs[j]) a ^= (n1 << BigInt(i));
      }

      b = n0;
      for(var i = 0; i < this.numb; i++) {
        var j = i + this.numc;
        if(inputs[j]) b ^= (n1 << BigInt(i));
      }

      c = n0;
      for(var i = 0; i < this.numc; i++) {
        var j = i;
        if(inputs[j]) c ^= (n1 << BigInt(i));
      }

      if(signed) {
        var na = BigInt(this.numa);
        var nb = BigInt(this.numb);
        var nc = BigInt(this.numb);
        var maska = ((n1 << na) - n1);
        var maskb = ((n1 << nb) - n1);
        var maskc = ((n1 << nc) - n1);
        var maxa = (n1 << (na - n1)) - n1;
        var maxb = (n1 << (nb - n1)) - n1;
        var maxc = (n1 << (nc - n1)) - n1;
        if(a > maxa) a = (a - maska - n1);
        if(b > maxb) b = (b - maskb - n1);
        if(c > maxc) c = (c - maskc - n1);
      }
    } else {
      a = 0;
      for(var i = 0; i < this.numa; i++) {
        var j = i + this.numb + this.numc;
        if(inputs[j]) a ^= (1 << i);
      }

      b = 0;
      for(var i = 0; i < this.numb; i++) {
        var j = i + this.numc;
        if(inputs[j]) b ^= (1 << i);
      }

      c = 0;
      for(var i = 0; i < this.numc; i++) {
        var j = i;
        if(inputs[j]) c ^= (1 << i);
      }

      if(signed) {
        var maska = ((1 << this.numa) - 1);
        var maskb = ((1 << this.numb) - 1);
        var maskc = ((1 << this.numc) - 1);
        var maxa = (1 << (this.numa - 1)) - 1;
        var maxb = (1 << (this.numb - 1)) - 1;
        var maxc = (1 << (this.numc - 1)) - 1;
        if(a > maxa) a = (a - maska - 1);
        if(b > maxb) b = (b - maskb - 1);
        if(c > maxc) c = (c - maskc - 1);
      }
    }

    // for the 16 bitwise logic operators, make the input bitsizes equal to the output bitsize,
    // and repeat the bitpatterns.
    // so e.g. if you xor a 16-bit number with a 1-bit number, to a 16-bit output, it will
    // xor each of the 16 bits with that same 1 other bit (controlled bitinvert of the 16-bit input)
    if(op < 16) {
      var n;
      if(this.numa > 0) {
        n = 0;
        var a2 = n0;
        while(n < this.numo) {
          a2 |= usebigint ? (a << BigInt(n)) : (a << n);
          n += this.numa;
        }
        a = a2;
      }

      if(this.numb > 0) {
        n = 0;
        var b2 = n0;
        while(n < this.numo) {
          b2 |= usebigint ? (b << BigInt(n)) : (b << n);
          n += this.numb;
        }
        b = b2;
      }
    }

    var miscin = 0;
    if(this.nummiscin) miscin = inputs[this.numa + this.numb + this.numc];

    var o = n0; // output

    var gcd = function(a, b) {
      if(a < 0) a = -a;
      if(b < 0) b = -b;
      for(;;) {
        if(b == 0) return a;
        var o = a % b;
        a = b;
        b = o;
      }
    };


    var overflow = false;
    if(op == 0) {
      o = n0;
    } else if(op == 1) {
      o = a & b;
    } else if(op == 2) {
      o = a & ~b; // a nimply b
    } else if(op == 3) {
      o = a;
    } else if(op == 4) {
      o = b & ~a; // b nimply a
    } else if(op == 5) {
      o = b;
    } else if(op == 6) {
      o = a ^ b;
    } else if(op == 7) {
      o = a | b;
    } else if(op == 8) {
      o = ~(a | b);
    } else if(op == 9) {
      o = ~(a ^ b);
    } else if(op == 10) {
      o = ~b;
    } else if(op == 22) {
      o = a | ~b; // b imply a
    } else if(op == 12) {
      o = ~a;
    } else if(op == 13) {
      o = b | ~a; // a imply b
    } else if(op == 14) {
      o = ~(a & b);
    } else if(op == 15) {
      // all ones
      if(usebigint) {
        o = n1 << BigInt(this.numo);
        o = ~o;
      } else {
        o = 0x7fffffff;
      }
    } else if(op == 16) {
      // equals
      if(this.numc) {
        if(c == 0) overflow = true;
        else o = (mod(a - b, c) == 0) ? n1 : n0;
      } else {
        o = (a == b) ? n1 : n0;
      }
    } else if(op == 17) {
      o = (a < b) ? n1 : n0;
    } else if(op == 18) {
      o = (a <= b) ? n1 : n0;
    } else if(op == 19) {
      // not equals
      if(this.numc) {
        if(c == 0) overflow = true;
        else o = (mod(a - b, c) != 0) ? n1 : n0;
      } else {
        o = (a != b) ? n1 : n0;
      }
    } else if(op == 20) {
      o = (a >= b) ? n1 : n0;
    } else if(op == 21) {
      o = (a > b) ? n1 : n0;
    } else if(op == 22) {
      o = (a < b) ? a : b;
    } else if(op == 23) {
      o = (a > b) ? a : b;
    } else if(op == 24) {
      // add
      o = a + b;
      if(miscin) o++;
      if(this.numc) {
        if(c == 0) {
          overflow = true;
          o = n0;
        } else {
          o = mod(o, c);
        }
      }
    } else if(op == 25) {
      // sub
      o = a - b;
      if(miscin) o--;
      if(this.numc) {
        if(c == 0) {
          overflow = true;
          o = n0;
        } else {
          o = mod(o, c);
        }
      }
    } else if(op == 26) {
      // mul
      o = a * b;
      if(this.numc) {
        if(c == 0) {
          overflow = true;
          o = n0;
        } else {
          o = mod(o, c);
        }
      }
    } else if(op == 27) {
      // truncating division (rounds towards zero)
      if(b == 0) {
        o = n0;
        overflow = true;
      } else {
        if(usebigint) {
          o = a / b;
        } else {
          o = a / b;
          if(o < 0) o = Math.ceil(o);
          else o = Math.floor(o);
        }
      }
      if(this.numc && !overflow) {
        if(c == 0) {
          overflow = true;
          o = n0;
        } else {
          o = mod(o, c);
        }
      }
    } else if(op == 28) {
      // remainder of truncating division
      if(b == 0) {
        overflow = true;
      } else {
        o = a % b;
      }
    } else if(op == 29) {
      // op==29: floor division (rounds towards -Infinity)
      if(b == 0) {
        o = n0;
        overflow = true;
      } else {
        if(usebigint) {
          o = a / b;
          if((a < 0) != (b < 0)) {
            var m = o * b;
            if(m != a) o--;
          }
        } else {
          o = Math.floor(a / b);
        }
      }
      if(this.numc && !overflow) {
        if(c == 0) {
          overflow = true;
          o = n0;
        } else {
          o = mod(o, c);
        }
      }
    } else if(op == 30) {
      if(b == 0) {
        overflow = true;
      } else {
        o = mod(a, b);
      }
    } else if(op == 32) {
      o = a + n1;
      if(miscin) o++;
    } else if(op == 33) {
      o = a - n1;
      if(miscin) o--;
    } else if(op == 34) {
      o = -a;
    } else if(op == 35) {
      o = (a < 0) ? -a : a;
    } else if(op == 36) {
      if(this.numb) {
        // copysign
        o = a;
        if((b < 0) != (a < 0)) o = -a;
        if(b == 0) o = n0;
      } else {
        // sign
        o = (a == 0) ? n0 : ((a > 0) ? n1 : n_1);
      }
    } else if(op == 38) {
      // binary to bcd
      var neg = a < 0;
      if(neg) a = -a;
      var s = n0;
      while(a > 0) {
        var m = a % n10;
        o |= (m << s);
        s += n4;
        a = usebigint ? (a / n10) : Math.floor(a / 10);
      }
      if(neg) s |= (n1 << s);
    } else if(op == 39) {
      // bcd to binary
      var neg = a < 0;
      if(neg) a = -a;
      var s = n1;
      while(a > 0) {
        var m = a & n15;
        o += (m * s);
        s *= n10;
        a >>= n4;
      }
      if(neg) s |= (n1 << s);
    } else if(op == 40) {
      o = a << b;
    } else if(op == 41) {
      o = a >> b;
    } else if(op == 42) {
      // left rotating shift
      if(usebigint) {
        o = (a << b) | (a >> (BigInt(this.numa) - b));
      } else {
        o = (a << b) | (a >> (this.numa - b));
      }
    } else if(op == 43) {
      // right rotating shift
      if(usebigint) {
        o = (a >> b) | (a << (BigInt(this.numa) - b));
      } else {
        o = (a >> b) | (a << (this.numa - b));
      }
    } else if(op == 44) {
      // mirror bits
      for(var i = 0; i < this.numo; i++) {
        var j = this.numo - i - 1;
        var ni = usebigint ? BigInt(i) : i;
        var nj = usebigint ? BigInt(j) : j;
        o |= ((a >> ni) << nj);
      }
    } else if(op == 45) {
      // popcount
      o = n0;
      if(a >= 0) {
        while(a > 0) {
          if(a & n1) o++;
          a >>= n1;
        }
      } else {
        overflow = true; // popcount not supported for negative numbers. TODO: support it, use twos complement notation (will do same as unsigned popcount operation then)
      }
    } else if(op == 46) {
      // count leading zeroes
      for(var i = 0; i < this.numa; i++) {
        var j = this.numa - i - 1;
        var nj = usebigint ? BigInt(j) : j;
        if((a >> nj) & n1) break;
        o++;
      }
      if(a == 0) overflow = true; // some usages may want to special case this
    } else if(op == 47) {
      // count trailing zeroes
      for(var i = 0; i < this.numa; i++) {
        var ni = usebigint ? BigInt(i) : i;
        if((a >> ni) & n1) break;
        o++;
      }
      if(a == 0) overflow = true; // some usages may want to special case this
    } else if(op == 48) {
      // integer power
      if(b < 0) {
        if(a == 0) {
          o = n0;
          overflow = true;
        } else if(a == 1) {
          o = n1;
        } else if(a == -1) {
          o = (b & n1) ? n_1 : n_1;
        } else {
          o = n0;
        }
      } else if(b == 0) {
        o = n1;
      } else {
        var neg = a < 0;
        if(neg) a = -a;
        if(this.numc) {
          // use modpow with the third input as the modulo: a useful operation
          // in case integer power modulo e.g. a prime is desired
          if(c <= 0) {
            overflow = true;
          } else {
            o = n1;
            var a2 = a % c;
            while(b > 0) {
              if(b & n1) o = ((o * a2) % c);
              b >>= n1;
              a2 = ((a2 * a2) % c);
            }
          }
        } else {
          // use modpow (power modulo the max output value) to get accurate
          // values
          var mask = usebigint ? ((n1 << BigInt(this.numo)) - n1) : ((1 << this.numo) - 1);
          o = n1;
          var a2 = a & mask;
          while(b > 0) {
            if(b & n1) o = ((o * a2) & mask);
            b >>= n1;
            a2 = ((a2 * a2) & mask);
          }
        }
        if(neg && (b & n1)) {
          o = -o;
        }
      }
    } else if(op == 52) {
      o = gcd(a, b);
    } else if(op == 53) {
      o = gcd(a, b);
      if(o != 0) o = a * b / o;
      else overflow = true;
    } else if(op == 56) {
      // modular inverse, modulo 2^outputbits if 1-input op, module b if 2-input op
      if(this.numb == 0) b = usebigint ? (n1 << BigInt(this.numo)) : (1 << this.numo);
      if(a == 0 || b == 0) {
        overflow = true;
      } else {
        var b0 = b;
        var x = n1, y = n0;
        for(;;) {
          if(a == 1) { o = x; break; }
          if(a == 0) { o = n0; break; }
          var d = b / a;
          if(!usebigint) d = Math.floor(d);
          var m = b - d * a; // modulo (matching floored division)
          y -= x * d;
          b = m;

          if(b == 1) { o = y; break; }
          if(b == 0) { o = n0; break; }
          d = a / b;
          if(!usebigint) d = Math.floor(d);
          m = a - d * b; // modulo (matching floored division)
          x -= y * d;
          a = m;
        }
        if(o < 0) o = b0 + o;
      }
    } else if(op == 57) {
      // integer log2
      o = n0;
      if(a <= 0) {
        overflow = true;
      } else {
        o--;
        while(a > 0) {
          o++;
          a >>= n1;
        }
      }
    } else if(op == 58) {
      // integer sqrt
      o = n0;
      if(a < 0) {
        overflow = true;
      } else {
        var s = n2;
        var as = a >> s;
        while(as != 0) {
          s += n2;
          as = a >> s;
        }
        while(s >= 0) {
          o <<= n1;
          var c2 = o + n1;
          if(c2 * c2 <= (a >> s)) {
            o = c2;
          }
          s -= n2;
        }
      }
    } else if(op == 59) {
      // factorial. Limited to a size to keep it reasonable.
      // modulo b if a second input is present.

      // if a/2 is larger than amount of output bits (and we're not doing modulo b),
      // then we know that all visible output bits will be 0, due to the amount of
      // factors '2' in the result. So no need to compute then, plus also
      // indicate overflow
      var allzeroes = !this.numb && (a > this.numo * 2);
      if(a < 0 || a > 4096 || allzeroes) {
        overflow = true;
      } else {
        o = n1;
        if(this.numb) {
          if(b == 0) {
            overflow = true;
          } else {
            if(a >= b) {
              // result is guaranteed to be 0, since the modulo itself will be
              // contained in the factors when a >= b. So no need to compute.
            } else {
              for(var i = n2; i <= a; i++) {
                o *= i;
                o = mod(o, b);
                // once the modulo operation made the result 0, which can easily happen as soon
                // as we passed all the prime factors of b, we can stop since the result is
                // guaranteed to stay 0.
                if(o == 0) break;
                // note: overflow flag not used for this since when using the second modulo
                // input, it's deliberate.
              }
            }
          }
        } else {
          var mask = usebigint ? ((n1 << BigInt(this.numo)) - n1) : ((1 << this.numo) - 1);
          for(var i = n2; i <= a; i++) {
            o *= i;
            if(o >= mask) {
              overflow = true;
              o &= mask;
              if(o == 0) break;
            }
          }
        }
      }
    } else if(op == 60) {
      // TODO: support signed
      var f = Number(a) * Math.PI * 2.0 / ((1 << this.numa) - 0);
      f = Math.sin(f);
      f = (f + 1.0) / 2.0; // make in range 0..1 instead of -1..1
      o = Math.floor(f * (Math.pow(2, this.numo) - 1));
      if(usebigint) o = BigInt(o);
    } else {
      o = n0;
    }

    if(usebigint) {
      if(o < 0) {
        if(o < BigInt.asIntN(this.numo, o)) overflow = true;
      } else {
        if(o > BigInt.asUintN(this.numo, o)) overflow = true;
      }
      o = BigInt.asUintN(this.numo, o);
      for(var i = 0; i < this.numo; i++) {
        if(o & n1) this.output[i] = 1;
        o >>= n1;
      }
      if((overflow) && this.nummiscout) this.output[this.numo] = 1; // overflow. In case of add, this can serve as carry if you have exactly 1 output too short.
    } else {
      if(o > 0x7fffffff) overflow = true;
      o &= 0x7fffffff; // JS supports max 31-bit int. This masking does the right thing for both the signed and unsigned case.
      for(var i = 0; i < this.numo; i++) {
        this.output[i] = (o & 1);
        o >>= 1;
      }
      if((o != 0 || overflow) && this.nummiscout) this.output[this.numo] = 1; // overflow. In case of add, this can serve as carry if you have exactly 1 output too short.
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
        if(c.circuitsymbol == 'U' || c.circuitsymbol == '#U') {
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


    var found = 0;
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        //if(c.circuitsymbol != 'U') continue; // only numbers next to U count, not next to extenders
        // due to the parsing, a multidigit number will show up as lower single digits here and there.
        if(c.number > found) {
          //if(found > 0 && c.number != found) { this.setError('ambiguous: multiple different numbers'); return false; }
          this.opindex = c.number;
          if(c.number > 64) {
            this.opindex -= 64;
            this.signed = true;
          }
          found = c.number;
        }
      }
    }

    // make label with operation name
    // find a suitable location
    var opname = this.getOpShortName();
    var len = opname.length;
    var labelok = false;
    var labelx = -1;
    var labely = -1;
    for(var y = y0; y < y1; y++) {
      var count = 0;
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        if(c.metasymbol == '#') count++;
        else count = 0;
        if(count == len + 1 || (count == len && x - len + 1 == x0)) {
          labelok = true;
          labelx = x - len + 1;
          labely = y;
          break;
        }
      }
      if(labelok) break;
    }
    if(labelok) {
      for(var i = 0; i < len; i++) {
        var x = labelx + i;
        var y = labely;
        var c = world[y][x];
        c.labelsymbol = opname[i];
      }
    } else {
      // try vertical
      for(var x = x0; x < x1; x++) {
        var count = 0;
        for(var y = y0; y < y1; y++) {
          var c = world[y][x];
          if(c.metasymbol == '#') count++;
          else count = 0;
          if(count == len + 1) {
            labelok = true;
            labelx = x;
            labely = y - len;
            break;
          }
        }
        if(labelok) break;
      }
      if(labelok) {
        for(var i = 0; i < len; i++) {
          var x = labelx;
          var y = labely + i + 1;
          var c = world[y][x];
          c.labelsymbol = opname[i];
        }
      }
    }

    this.master.alu = this;
    this.master.type = TYPE_ALU; // reason: it might be TYPE_UNKNOWN_DEVICE if it was parsed with #
    return true;
  };


  /*
  given the array returned by getIO3,
  returns object of {
    a [heading, lsbpos, num]: input A's heading, and lsbpos
    b [heading, lsbpos, num]: input B's heading, and lsbpos (or heading -1 and num 0 if none)
    c [heading, lsbpos, num]: input C's heading, and lsbpos (or heading -1 and num 0 if none)
    o [heading, lsbpos, num]: output's heading, and lsbpos
    miscin [heading, num]: misc in side heading, num is 0 or 1 (heading -1 and num 0 if none)
    miscout [heading, num]: misc out side heading, num is 0 or 1 (heading -1 and num 0 if none)
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

    var a = [-1, -1, 0];
    var b = [-1, -1, 0];
    var c = [-1, -1, 0];
    var o = [-1, -1, 0];
    var miscin = [-1, 0];
    var miscout = [-1, 0];

    /*
    io has format: [array, ni, no, ei, eo, si, so, wi, wo]
    each element is array with elements: [heading, num, begin, end, output]
    There are up to 4 sides:
    -output
    -input(s)
    -misc in
    -misc out
    Rules:
    -side with output is the one with most output wires
    -if an output side remains, that's the misc output (optional)
    -side across output is the side with input(s)
    -remaining side is misc input, if any (optional)
    And then:
    -any remaining unused sides are an error
    -misc input or output with more than 1 wire is an error
    -more than 2 groups of wires on the input side is an error
    -more than 1 group of wires on any other side is an error
    */
    for(var i = 0; i < 4; i++) {
      var arri = io[1 + i * 2];
      var arro = io[2 + i * 2];
      if(arri.length > 0 && arro.length > 0) { this.setError('mixed inputs and outputs on a side'); return null; }
    }

    // find main output
    var num = 0;
    var outdir = -1;
    for(var i = 0; i < 4; i++) {
      var arr = io[2 + i * 2];
      if(arr.length == 0) continue;
      if(arr.length > 1) { this.setError('too many output series on one side'); return null; }
      if(arr[0][1] > num) {
        num = arr[0][1];
        outdir = i;
        o[0] = outdir;
        o[1] = (outdir < 2) ? 1 : 0; // TODO: use optional '0' symbol to indicate its LSB position
        o[2] = num;
      }
    }
    if(outdir == -1) { this.setError('output side not found'); return null; }

    // find misc out, if any
    var miscoutdir = -1;
    for(var i = 0; i < 4; i++) {
      if(i == outdir) continue;
      var arr = io[2 + i * 2];
      if(arr.length == 0) continue;
      if(arr.length > 1) { this.setError('too many misc-output series on one side'); return null; }
      if(miscoutdir != -1) { this.setError('multiple misc out sides'); return null; }
      if(arr[0][1] != 1) { this.setError('too many bits in misc output side'); return null; }
      miscoutdir = i;
      miscout[0] = miscoutdir;
      miscout[1] = 1;
    }

    // get the inputs from opposite side of output
    var indir = (outdir + 2) & 3;
    var arr = io[1 + indir * 2];
    var inlsbpos = (indir >= 2) ? 1 : 0; // TODO: use optional '0' symbol to indicate its LSB position, and then also swap input A and B's positions
    if(arr.length == 1) {
      a[0] = indir;
      a[1] = inlsbpos;
      a[2] = arr[0][1];
    } else if(arr.length == 2) {
      a[0] = indir;
      a[1] = inlsbpos;
      a[2] = arr[1][1]; // a is the leftmost one if at bottom side (last one in clockwise order from output)
      b[0] = indir;
      b[1] = inlsbpos;
      b[2] = arr[0][1];
    } else if(arr.length == 3) {
      a[0] = indir;
      a[1] = inlsbpos;
      a[2] = arr[2][1];
      b[0] = indir;
      b[1] = inlsbpos;
      b[2] = arr[1][1];
      c[0] = indir;
      c[1] = inlsbpos;
      c[2] = arr[0][1];
    } else {
      if(arr.length == 0) { this.setError('must have input side opposite of output side'); return null; }
      if(arr.length > 2) { this.setError('too many inputs'); return null; }
    }

    // find misc in, if any
    var miscindir = -1;
    for(var i = 0; i < 4; i++) {
      if(i == outdir || i == indir || i == miscoutdir) continue;
      var arr = io[1 + i * 2];
      if(arr.length == 0) continue;
      if(arr.length > 1) { this.setError('too many misc-input series on one side'); return null; }
      if(miscindir != -1) { this.setError('multiple misc in sides'); return null; }
      if(arr[0][1] != 1) { this.setError('too many bits in misc output side'); return null; }
      miscindir = i;
      miscin[0] = miscindir;
      miscin[1] = 1;
    }

    var result = [a, b, c, o, miscin, miscout];

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
        if(da == self.adir) return -1;
        if(db == self.adir) return 1;
        if(da == self.miscindir) return 1;
        if(db == self.miscindir) return -1;
        throw 'impossible that it is not using at least one adir and one miscindir, given bdir is in center';
      }
      var lsbpos = (da == self.adir) ? self.alsbpos : (da == self.bdir) ? self.blsbpos : self.miscinlsbpos;
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

    var side = getSide(this.odir);
    var o = io[2 + this.odir * 2][0]; // [heading, num, begin, end, output]
    for(var i = 0; i < o[1]; i++) {
      var j = i;
      if(this.olsbpos) j = o[1] - i - 1;
      j = o[2] + j - ((this.odir & 1) ? this.y0 : this.x0);
      var x = side[0] + side[2] * j;
      var y = side[1] + side[3] * j;
      var z = side[4];
      var c = world[y][x];
      if(c.circuitsymbol != 'U' && c.circuitsymbol != '#U') continue;
      if(c.components[z]) c.components[z].rom_out_pos = rompos++;
    }

    if(this.miscoutdir >= 0) {
      side = getSide(this.miscoutdir);
      o = io[2 + this.miscoutdir * 2][0]; // [heading, num, begin, end, output]
      for(var i = 0; i < o[1]; i++) {
        var j = i;
        if(this.miscoutlsbpos) j = o[1] - i - 1;
        j = o[2] + j - ((this.miscoutdir & 1) ? this.y0 : this.x0);
        var x = side[0] + side[2] * j;
        var y = side[1] + side[3] * j;
        var z = side[4];
        var c = world[y][x];
        if(c.circuitsymbol != 'U' && c.circuitsymbol != '#U') continue;
        if(c.components[z]) c.components[z].rom_out_pos = rompos++;
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

    var io = getIO(x0, y0, x1, y1, this.master);
    if(!io) { this.setError('getting io error'); return false; }

    var dirs = this.getDirs(io);
    if(!dirs) { this.setError('getting dirs error'); return false; }


    this.adir = dirs[0][0];
    this.alsbpos = dirs[0][1];
    this.bdir = dirs[1][0];
    this.blsbpos = dirs[1][1];
    this.cdir = dirs[2][0];
    this.clsbpos = dirs[2][1];
    this.odir = dirs[3][0];
    this.olsbpos = dirs[3][1];
    this.miscindir = dirs[4][0];
    this.miscoutdir = dirs[5][0];
    this.output = []; // current ouput values (first data output(s), then the select passthrough)
    this.numa = dirs[0][2];
    this.numb = dirs[1][2];
    this.numc = dirs[2][2];
    this.numo = dirs[3][2];
    this.nummiscin = dirs[4][1];
    this.nummiscout = dirs[5][1];

    this.output.length = this.numo + this.nummiscout;

    this.sortIO(io);

    return true;
  };
}



var activeVTE = null;

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
  this.passthrough = false; // whether it passes through the input (in case of decimal display)
  this.decimalinput = false;
  this.counter = false;
  this.countervalue = 0;
  this.previnput = 0;
  this.previnput2 = 0;
  this.allowstyping = false;
  this.invisible = false; // if true, is invisible, due to being inside of a chip
  // hidden textarea used to handle typing in better way than pure keyboard events
  // a separate one per VTE because it must be positioned where the VTE is to avoid
  // undesired scrolling to wrong place when it gets focused
  this.textarea = undefined;

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

    var n0 = supportbigint ? BigInt(0) : 0;
    var n1 = supportbigint ? BigInt(1) : 1;
    var n2 = supportbigint ? BigInt(2) : 2;


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
        if(y < 0) break;
      }
      var mul = 1;
      for(var i = 0; i < this.numoutputs; i++) {
        this.output[i] = ((index & mul) ? 1 : 0);
        mul *= 2;
      }
      return;
    }
    if(this.decimaldisplay) {
      var index = n0;
      var mul = n1;
      for(var i = 0; i < this.numinputs; i++) {
        var ip = supportbigint ? BigInt(inputs[i]) : inputs[i];
        index += ip * mul;
        mul *= n2;
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
        if(y < 0) break;
      }
      if(this.passthrough) {
        for(var i = 0; i < this.numoutputs; i++) {
          this.output[i] = i < this.numinputs ? inputs[i] : false;
        }
      }
      return;
    }
    if(this.decimalinput) {
      var s = '';
      var x = n0;
      var y = n0;
      for(var i = 0; i < this.numoutputs; i++) {
        var c = this.text[y][x];
        s += c;
        x++;
        if(x >= this.x1 - this.x0) { x = n0; y++; }
      }
      s = s.trim();

      // avoid typing non-digit characters (exception for hex)
      if(s.length > 0) {
        var c = s[s.length - 1];
        var hex = (s.length >= 2 && s[0] == '0' && (s[1] == 'x' || s[1] == 'X'));
        if(!hex && !(c >= '0' && c <= '9')) {
          this.doBackspace();
          s = s.substr(0, s.length - 1);
        }
      }

      var index = n0;
      for(;;) {
        if(s.length == 0) break;
        var hex = s[0] == '0' && (s[1] == 'x' || s[1] == 'X');
        if(supportbigint) {
          // BigInt throws exception if string contains invalid characters so extract a valid number part.
          if(hex) {
            s = s.match(/..[0-9a-fA-F]+/);
          } else {
            s = s.match(/[0-9]+/);
          }

          s = (s == null) ? 0 : s[0];
          if(!s || s == '' || s == '0x') s = '0';
          index = BigInt(s);
        } else {
          // parse hex or decimal, not octal (note that whether or not it parses octal if radix not given is browser dependent)
          if(hex) index = parseInt(s);
          else index = parseInt(s, 10);
        }
        var ni = supportbigint ? BigInt(this.numoutputs) : this.numoutputs;
        var maxval = (n1 << ni) - n1;
        if(index <= maxval) break;

        // typed number too high, remove last character typed
        this.doBackspace();
        s = s.substr(0, s.length - 1);
      }

      var mul = n1;
      for(var i = 0; i < this.numoutputs; i++) {
        var bit = ((index & mul) ? 1 : 0);
        if(index < 0 && (1 << i) > -index) bit = 1; // also supports negative numbers with twos complement
        this.output[i] = bit;
        mul *= n2;
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



  this.supportsTyping = function() {
    return this.numoutputs > 0 && !this.passthrough;
  };

  // To be done by the renderer
  this.initTextArea = function(el, x, y) {
    this.textarea = util.makeAbsElement('textarea', x, y, 10, 10, el);
    this.textarea.rows = 1;
    this.textarea.cols = 20;
    this.textarea.value = '';
    this.textarea.style.fontSize = '12px';
    this.textarea.style.zIndex = '1';
    this.textarea.autocorrect = 'off';
    this.textarea.spellcheck = false;
    this.textarea.autocapitalize = 'off';
    // display=none or visibility=hidden make the typing no longer work, style.opacity=0 still works
    this.textarea.style.opacity = '0';
  };

  this.getKeyboardFocus = function() {
    var self = this;
    if(!this.textarea) return;

    if(this.decimalinput && this.cursorx == 1 && this.cursory == 0 && this.text[0][0] == '0') {
      this.doBackspace();
    }

    this.textarea.onkeypress = function(e) {
        if(e.code == 'Backspace') {
          // do nothing. onkeydown does backspace already.
          // chrome only handles backspace in onkeydown, while firefox
          // handles it in both onkeypress and onkeydown
        } else {
          var key = e.which || e.charCode || e.keyCode || 0;
          self.typeKeyboard(key);
        }
        // use render() if no update of components should be done but you still want to see the
        // new character appear. Use update() to do a full component update, similar to what
        // is done after pressing on button with mouse.
        //render();
        update();
        return false;
    };

    this.textarea.onkeydown = function(e) {
      if(e && e.code == 'Backspace') {
        self.doBackspace();
        update();
        return false;
      }
    };

    this.textarea.oninput = function(e) {
      // TODO: use this instead of onkeypress
    };


    // When the textarea loses focus, update how the blinking cursor looks to
    // indicate it's no longer focused.
    // NOTE: some mouse controlled switches/buttons/... stop the event from
    // propagating and that causes the textarea to *not* blur and that is
    // actually nice: user's selected VTE remains selected even if you press
    // switches. But selecting another VTE, or the background, blurs this one
    // as intended.
    this.textarea.onblur = function() {
      // Not when another VTE got selected
      if(activeVTE == self) {
        stopBlinkingCursor();
        activeVTE = null;
      }
    };

    this.textarea.onfocus = function() {
      activeVTE = self;
    };


    if(document.activeElement) {
      document.activeElement.blur(); // this prevents that you accidently start typing but it instead selects a different dropdown option
    }

    this.textarea.focus();

    // This must be done the very last only.
    activeVTE = this;

    // ensure the blinking cursor will be activated by rendering
    render();
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
        if(c.circuitsymbol != 'T' && c.circuitsymbol != '#T') return false;
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
          if(c.components[0] == this.master) continue;
          c.components[0].master = this.master;
          //c.components[0].type = TYPE_VTE;
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
    } else if(readheading == -1 && writeheading == -1 && outheading != -1 && inheading != -1 && writeheading2 == -1) {
      this.decimaldisplay = true;
      this.passthrough = true;
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

    this.allowstyping = true;
    if(this.decimaldisplay || this.numoutputs == 0) this.allowstyping = false;

    var w = x1 - x0;
    var h = y1 - y0;
    this.text = [];
    for(var y = 0; y < h; y++) {
      this.text[y] = [];
      for(var x = 0; x < w; x++) {
        this.text[y][x] = ' ';
      }
    }

    // show that this is decimal input by already typing a '0'
    if(this.decimalinput) {
      this.addChar('0');
    }

    return true;
  };
}


// has no outputs, so no master needed
function DotMatrix() {
  this.x0 = 0;
  this.y0 = 0;
  this.x1 = 0;
  this.y1 = 0;
  this.text = null; // not as string but as 2D array of characters
  this.w = -1;
  this.h = -1;
  this.numx = -1;
  this.numy = -1;
  this.numc = -1; // num bits to control color

  this.direct = false; // if true, the x/y addresses are direct, not binary addresses, and multiple dots could be set at the same time

  this.prevdot = false;
  this.prevfill = false;
  this.prevcolor = -1;

  this.error = false;
  this.errormessage = '';

  this.array = [];

  this.master = null;

  this.rgbled = false; // if true, is not a dot matrix screen but a single RGB led with up to 3 inputs

  this.setError = function(text) {
    this.error = true;
    if(!this.errormessage) this.errormessage = text;
  };

  this.update = function(inputs) {
    if(this.error) return;
    var led = this.rgbled;
    var index = 0;
    var mul = 1;
    var dot = !led && inputs[0]; // place a single pixel
    var fill = led || inputs[1]; // fill all pixels
    var color = 0;
    var c0 = led ? 0 : 2;

    // Choose from palette depending on amount of color input wires.
    if(this.numc == 1) {
      color = 0 + inputs[c0];
    } else if(this.numc == 2) {
      var value = inputs[c0] + 2 * inputs[c0 + 1];
      color = 2 + value;
    } else if(this.numc == 3) {
      var value = inputs[c0] + 2 * inputs[c0 + 1] + 4 * inputs[c0 + 2];
      color = 6 + value;
    } else if(this.numc == 4) {
      var value = inputs[c0] + 2 * inputs[c0 + 1] + 4 * inputs[c0 + 2] + 8 * inputs[c0 + 3];
      color = 14 + value;
    }

    if(led) {
      var prevcolor = this.prevcolor;
      this.prevcolor = color;

      if(prevcolor != color) {
        for(var y = 0; y < this.h; y++) {
          for(var x = 0; x < this.w; x++) {
            this.array[y][x] = color;
          }
        }
      }
    } else {
      // for direct
      var xarray = [];
      var yarray = [];

      var x = 0;
      for(var i = 0; i < this.numx; i++) {
        var v = inputs[2 + this.numc + i];
        x += (v << i);
        if(v) xarray.push(i);
      }
      var y = 0;
      for(var i = 0; i < this.numy; i++) {
        var v = inputs[2 + this.numc + this.numx + i];
        y += (v << i);
        if(v) yarray.push(i);
      }

      var prevdot = this.prevdot;
      this.prevdot = dot;
      var prevfill = this.prevfill;
      this.prevfill = fill;

      if(!prevfill && fill) {
        for(var y = 0; y < this.h; y++) {
          for(var x = 0; x < this.w; x++) {
            this.array[y][x] = color;
          }
        }
      } else if(!prevdot && dot) {
        if(this.direct) {
          for(var j = 0; j < yarray.length; j++) {
            for(var i = 0; i < xarray.length; i++) {
              var x = xarray[i];
              var y = yarray[j];
              this.array[y][x] = color;
            }
          }
        } else {
          if(y < this.h && x < this.w) this.array[y][x] = color;
        }
      }
    }
  };


  // init before inputs are resolved
  // returns true if ok, false if error
  this.init1 = function(component) {
    // unlike other large components, the master component is the only single
    // component here, since this component has only inputs, and  multiple
    // components is only needed if multiple different output values must be
    // supported.
    this.master = component;
    var x0 = w, x1 = 0, y0 = h, y1 = 0;
    for(var i = 0; i < component.cells.length; i++) {
      var x = component.cells[i][0];
      var y = component.cells[i][1];
      x0 = Math.min(x, x0);
      x1 = Math.max(x, x1);
      y0 = Math.min(y, y0);
      y1 = Math.max(y, y1);
    }
    x1++;
    y1++;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.w = this.x1 - this.x0;
    this.h = this.y1 - this.y0;
    component.dotmatrix = this;
    return true;
  };


  /*
  given the array returned by getIO2,
  returns object of {
    rgbled: boolean, true if this is rgbled, then only the field "empty" below is present, used to sort the inputs in clockwise order starting from that side
    empty [heading, numc]: side with nothing, and also TOTAL amount of inputs (relevant for RGB LED only)
    misc [heading, dir, num, lsbpos]: side with dot/fill/color
    x [heading, dir, num, lsbpos]: side with x coordinate
    y [heading, dir, num, lsbpos]: side with y coordinate
  }
  sets this.rgbled if it's an rgb led. Then misc, x and y have no meaning other than containing the desired inputs in clockwise order.
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

    // io format: [[[niv], nic], [[eiv], eic], [[siv], sic], [[wiv], wic],[[nov], noc], [[eov], eoc], [[sov], soc], [[wov], woc]];

    var numinputs = 0;

    for(var i = 0; i < 4; i++) {
      // commented out: ignore outputs altogether instead.
      //if(io[i + 4][1] != 0) { this.setError('dotmatrix cannot have outputs'); return false; }
      numinputs += io[i][1];
    }

    var rgbled = false;
    if(numinputs <= 4) {
      rgbled = true;
    }

    var emptyheading = -1; // the one side without inputs

    for(var i = 0; i < 4; i++) {
      if(io[i][1] == 0) {
        emptyheading = i;
        break;
      }
    }

    if(emptyheading < 0) { this.setError('must have side without input'); return null; }
    var empty = [emptyheading, numinputs];
    if(rgbled) return {'rgbled':true, 'empty':empty};

    var mischeading = -1;
    var xheading = -1;
    var yheading = -1;
    for(var i = 0; i < 3; i++) {
      var j = ((emptyheading + i + 1) & 3);
      if(!io[j][1]) { this.setError('missing input side, there must be 3'); return null; }
      if(i == 0) {
        mischeading = j;
      } else {
        if(j & 1) yheading = j;
        else xheading = j;
      }
    }

    var misclsbpos = (mischeading >= 2) ? 1 : 0;
    var xlsbpos = (xheading >= 2) ? 1 : 0;
    var ylsbpos = (yheading >= 2) ? 1 : 0;

    var misc = [mischeading, mischeading & 1, io[mischeading][1], misclsbpos];
    var x = [xheading, xheading & 1, io[xheading][1], xlsbpos];
    var y = [yheading, yheading & 1, io[yheading][1], ylsbpos];

    var result = {'rgbled':false, 'empty':empty, 'misc':misc, 'x':x, 'y':y };
    return result;
  };

  /*
  Sorts inputs from getDirs
  -first the misc bits: dot, fill, R, G, B
  -then the x coordinate, starting from lsb
  -then the y coordinate, starting from lsb
  }
  */
  this.sortIO = function(dirs) {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    var led = dirs.rgbled;
    var emptyheading = dirs.empty[0];

    var getDir = function(x, y) {
      if(y < y0) return 0;
      if(x >= x1) return 1;
      if(y >= y1) return 2;
      if(x < x0) return 3;
      return -1;
    };


    //sort inputs from lsb to msb, then the write input
    var array = [];
    for(var i = 0; i < this.master.inputs.length; i++) array[i] = i;
    var self = this;

    if(led) {
      // sort clockwise starting from the empty side
      array = array.sort(function(a, b) {
        var xa = self.master.inputs_x[a];
        var ya = self.master.inputs_y[a];
        var xb = self.master.inputs_x[b];
        var yb = self.master.inputs_y[b];
        var da = (getDir(xa, ya) + 4 - emptyheading) & 3;
        var db = (getDir(xb, yb) + 4 - emptyheading) & 3;
        if(da != db) return da > db ? 1 : -1;
        if(((da & 1) == 0)) return xb - xa;
        return yb - ya;
      });
    } else {
      var mischeading = dirs.misc[0];
      var xheading = dirs.x[0];
      var yheading = dirs.y[0];
      var miscdir = dirs.misc[1];
      var xdir = dirs.x[1];
      var ydir = dirs.y[1];
      var misclsbpos = dirs.misc[3];
      var xlsbpos = dirs.x[3];
      var ylsbpos = dirs.y[3];


      array = array.sort(function(a, b) {
        var xa = self.master.inputs_x[a];
        var ya = self.master.inputs_y[a];
        var xb = self.master.inputs_x[b];
        var yb = self.master.inputs_y[b];
        var da = getDir(xa, ya);
        var db = getDir(xb, yb);
        if(da != db) {
          // order is: misc, x, y
          if(da == mischeading) return -1;
          if(db == mischeading) return 1;
          if(da == xheading) return -1;
          if(db == xheading) return 1;
        }
        var lsbpos = (da == miscdir) ? misclsbpos : ((da == xdir) ? xlsbpos : ylsbpos);
        if(((da & 1) == 0) && lsbpos) return xb - xa;
        if(((da & 1) == 0)) return xa - xb;
        if(lsbpos) return yb - ya;
        return ya - yb;
      });
    }
    newOrder(this.master.inputs, array);
    newOrder(this.master.inputs_negated, array);
    newOrder(this.master.inputs_x, array);
    newOrder(this.master.inputs_y, array);
    newOrder(this.master.inputs_x2, array);
    newOrder(this.master.inputs_y2, array);
  };

  this.init2 = function() {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var w = x1 - x0;
    var h = y1 - y0;

    if(!this.master) return false;

    var io = getIO2(x0, y0, x1, y1, this.master);
    if(!io) { this.setError('getIO failed'); return false; }

    var dirs = this.getDirs(io);
    if(!dirs) { this.setError('getDirs failed'); return false; }

    this.rgbled = dirs.rgbled;

    // num color bits
    this.numc = this.rgbled ? dirs.empty[1] : (dirs.misc[2] - 2);
    if(this.numc < 1 || this.numc > 4) { this.setError('not enough or too much misc inputs, need 3-6'); return false; }
    this.numx = this.rgbled ? 0 : dirs.x[2];
    this.numy = this.rgbled ? 0 : dirs.y[2];


    if(this.numx == w && this.numy == h) {
      this.direct = true;
      // not binary addressing, make the lsbpos match lowest cell x/y index instead
      dirs.x[3] = 0;
      dirs.y[3] = 0;
    }

    this.sortIO(dirs);

    this.array = [];
    for(var y = 0; y < h; y++) {
      this.array[y] = [];
      for(var x = 0; x < w; x++) {
        this.array[y][x] = 0;
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
  o.numt = 0;
  o.numj = 0;
  o.numk = 0;
  o.numy = 0;
  for(var i = 0; i < array.length; i++) {
    var cell = world[array[i][1]][array[i][0]];

    if(cell.circuitsymbol == 'c') o.numc++;
    if(cell.circuitsymbol == 'C') o.numC++;
    if(cell.circuitsymbol == 'q') o.numq++;
    if(cell.circuitsymbol == 'Q') o.numQ++;
    if(cell.circuitsymbol == 'd') o.numd++;
    if(cell.circuitsymbol == 't') o.numt++;
    if(cell.circuitsymbol == 'j') o.numj++;
    if(cell.circuitsymbol == 'k') o.numk++;
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
    if(num.numc || num.numC) type = TYPE_COUNTER;
    if(num.numd) type = TYPE_DELAY;
  }

  return [type, value];
}

// flip flop
function FF() {
  this.cells = [];
  this.numc = 0; // num on or off c's
  this.numq = 0;
  this.numQ = 0;
  this.numy = 0;
  this.numt = 0;
  this.numd = 0;
  this.numj = 0;
  this.numk = 0;
  this.numff = 0; // num of any kind of above parts

  this.value = false;

  this.update = function(inputs) {
  };

  // init before inputs are resolved
  // returns true if ok, false if error
  this.init1 = function(array) {
    var array2 = [];
    var num = countFFComponents(array);
    this.numc = num.numc + num.numC;
    this.numq = num.numq;
    this.numQ = num.numQ;
    this.numy = num.numy;
    this.numt = num.numt;
    this.numd = num.numd;
    this.numj = num.numj;
    this.numk = num.numk;
    this.numff = num.numff;

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
  this.previnputs = []; // previous values of these inputs (already negated for negated inputs), used for flip-flops. For some algorithms this is same as this.inputs[i].prevvalue, but for algorithm 1 in case of loops it is not.
  this.ff_cycle = false;
  this.ff_cycle_time = 0;
  this.input_ff_types = []; // only used by flipflops. 0=c, 1=j, 2=k, 3=d, 4=t, 5=q, 6=Q, 7=y
  this.master = null; // master component for rom, vte, ...
  this.rom = null; // used if this is a master of rom
  this.mux = null; // used if this is a master of mux
  this.alu = null; // used if this is a master of alu
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
  this.frozen = false; // for realtime timers
  // whether this component changed this frame. Normally can be seen from
  // this.prevvalue != this.value, but, for some components like delays they end
  // up in changed state due to ticking down, even if their value does not
  // change. What this value really indicates is: might any later combinational
  // clock tick still change the value in the future? The purpose of this value is
  // to know when auto-tick updates can stop.
  this.changed = false;
  this.changedticks = 0; // for keeping track of 'changed' for delay
  this.lasttimerticks = 0; // for timers to keep track when they should tick
  this.changein = 0; // if non-0, indicates this component will change again in changein ticks. E.g. timer/delay.

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
    } else if(this.type == TYPE_CONSTANT_OFF) {
      return false;
    } else if(this.type == TYPE_CONSTANT_ON) {
      return true;
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
    } else if(this.type == TYPE_TIMER_OFF || this.type == TYPE_TIMER_ON) {
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
    } else if(this.type == TYPE_ONEHOT) {
      return numon == 1;
    } else if(this.type == TYPE_NONEHOT) {
      return numon != 1;
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
    } else if(this.type == TYPE_ALU) {
      return this.value; // not implemented in this function, but elsewhere
    } else if(this.type == TYPE_VTE) {
      return this.value; // not implemented in this function, but elsewhere
    } else if(this.type == TYPE_DOTMATRIX) {
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
        //this.previnputs[i] = true; // this ensures we will NOT have inputs counted as going from low to high initially
        this.previnputs[i] = this.inputs_negated[i]; // treat as if input was 0 before loading, but 1 in case of negated input. For non-negated input, this means a positive value will create a positive edge on loading the circuit.
        //this.previnputs[i] = false;
      }
    }

    if(this.type == TYPE_COUNTER || this.type == TYPE_RANDOM) {
      for(var i = 0; i < this.inputs.length; i++) {
        //this.previnputs[i] = true; // this ensures we will NOT have inputs counted as going from low to high initially
        this.previnputs[i] = this.inputs_negated[i]; // treat as if input was 0 before loading, but 1 in case of negated input. For non-negated input, this means a positive value will create a positive edge on loading the circuit.
        //this.previnputs[i] = false;
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
    var numc1 = 0;
    var numc_pos_edge = 0;
    var numc_neg_edge = 0;
    var numd1 = 0;
    var numd0 = 0;
    var numt1 = 0;
    var numj1 = 0;
    var numj0 = 0;
    var numk1 = 0;
    var numk0 = 0;
    var numq1 = 0;
    var numQ1 = 0;
    var numy1 = 0;
    var rom_inputs = []; // only filled in if this is ROMe
    var num_misc_pos_edge = 0;

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
      var value2; // the value on the current input
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
        if(this.input_ff_types[i] >= 1 && this.input_ff_types[i] <= 4 && this.ff.numc) {
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
      if(value2) numon++;
      else numoff++;

      // The this.ff check ensures this only happens for the flipflop master component
      if(this.type == TYPE_FLIPFLOP && this.ff) {
        var prevvalue2 = (this.previnputs[i] == undefined) ? value2 : this.previnputs[i];
        this.previnputs[i] = value2;
        if(this.input_ff_types[i] == 1) { // j
          if(value2) numj1++;
          else numj0++;
          if(value2 && !prevvalue2) num_misc_pos_edge++;
        } else if(this.input_ff_types[i] == 2) { // k
          if(value2) numk1++;
          else numk0++;
          if(value2 && !prevvalue2) num_misc_pos_edge++;
        } else if(this.input_ff_types[i] == 3) { // d
          if(value2) numd1++;
          else numd0++;
        } else if(this.input_ff_types[i] == 4) { // t
          if(value2) numt1++;
        } else if(this.input_ff_types[i] == 5) { // q
          if(value2) numq1++;
          if(value2 && !prevvalue2) num_misc_pos_edge++;
        } else if(this.input_ff_types[i] == 6) { // Q
          if(value2) numQ1++;
          if(value2 && !prevvalue2) num_misc_pos_edge++;
        } else if(this.input_ff_types[i] == 7) { // y
          if(value2) numy1++;
        } else { // c: this.input_ff_types[i] == 0, but also if undefined for some edge cases
          if(value2) numc1++;
          if(value2 && !prevvalue2) numc_pos_edge++;
          if(!value2 && prevvalue2) numc_neg_edge++;
        }
      }

      if(this.type == TYPE_COUNTER || this.type == TYPE_RANDOM) {
        var prevvalue2 = (this.previnputs[i] == undefined) ? value2 : this.previnputs[i];
        this.previnputs[i] = value2;
        if(value2) numc1++;
        if(value2 && !prevvalue2) numc_pos_edge++;
        if(!value2 && prevvalue2) numc_neg_edge++;
      }

      if(this.type == TYPE_ROM || this.type == TYPE_MUX || this.type == TYPE_ALU || this.type == TYPE_VTE || this.type == TYPE_DOTMATRIX) {
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
    } else if(this.type == TYPE_ALU) {
      if(this.master) {
        if(this.alu) this.alu.update(rom_inputs);
        var alu = this.alu || this.master.alu;
        this.value = alu.output[this.rom_out_pos];
      }
    } else if(this.type == TYPE_VTE) {
      if(this.master || this.vte) {
        if(this.vte) this.vte.update(rom_inputs); // only if this.vte, don't do this on this.vte || this.master.vte to avoid multiple updates to it
        var vte = this.vte || this.master.vte;
        this.value = vte.output[this.rom_out_pos];
      }
    } else if(this.type == TYPE_DOTMATRIX) {
      if(this.dotmatrix) {
        this.dotmatrix.update(rom_inputs);
      }
    } else if(this.type == TYPE_IC) {
      // a component of this type in theory should do nothing and not be connected with anything, it's just
      this.value = false;
    } else if(this.type == TYPE_FLIPFLOP) {
      // beware that the flip flop inputs such as numd1, numj0, ..., which are the data inputs,
      // have been delayed by 1 above, for the fast algorithms! This to make the built-in
      // flipflops not TOO fast, otherwise serial shift registers from D's don't work like in real life.


      //we do not take the positive edge of the xor "e", but instead the xor of the positive edges. Otherwise while one input is high, a second input would be negative edge triggered. So we use num instead of e here.
      var clocked = (numc_pos_edge & 1);

      var ff = (this.ff || (this.master && this.master.ff));

      // flip flops are made from multiple components (d, c, ...), but only one of them
      // is designated as master component.
      // Only the master component has its own ff. So it's updated only once, as intended.
      if(this.ff) { // this.ff on purpose, not ff from above
        // change whether clocked if there are 'enable' inputs
        var ffenable = numy1; // explicitely enabled
        var ffdisable = ff.numy && !numy1; // explicitely disabled
        if(ffenable) {
          if(!ff.numc) clocked = true; // this is when there is no real clock (c) present, only an enable input
        }
        else if(ffdisable) {
          clocked = false; // edge triggered clock disabled
        } else if(!ff.numc && !ff.numy) {
          // This flip-flop has no clock and no enable. It has, for example, only j and k, or only t.
          // Then it should behave as if it's listening to the inputs every single tick, or as if it has
          // an enable input but it's always on. So a lone t will blink at fast speed when enabled, and
          // jk will work like sr latch or blink if both on.
          clocked = true;
        }


        if((ff.numq == 1 || ff.numQ == 1) && (ff.numff == ff.numq + ff.numy || ff.numff == ff.numQ + ff.numy)) {
          // lone q, or lone Q, behaves as "pulse" instead
          // since Q inverts output, it behaves the opposite way to this rule.
          ff.value = !ffdisable && (num_misc_pos_edge & 1);
        } else if((ff.numj == 1 || ff.numk == 1) && ff.numff == 1) {
          // lone j, or lone k, behave as "once state changed, stay that way"
          // lone k will output 1 initially and then become 0 forever once activated, and the opposite for j.
          // the code is the same for both since k's output is already inversed elsewhere.
          if(numj1 || numk1) ff.value = 1;
        } else if(numQ1 && numq1) {
          // Asynchronous set and reset (input on q and Q) override the enable input (ffdisable)
          ff.value = !ff.value;
        } else if(numQ1) {
          ff.value = false; // asynch reset (takes priority over set)
        } else if(numq1) {
          ff.value = true; // asynch set
        } else if(clocked) {
          // For flip-flop with combination of t, j/k and d, which is normally nonsensical, the order of importance is:
          // -T if on always toggles
          // -else, if a J or K are on (but not J+K at same time) set or reset
          // -else, if a D is present either without any existing J or K inputs at all, or with both J+K enabled, use its value, on or off (overrides J+K toggle)
          // -else if J + K, toggle
          // -if multiple inputs of same type, on inputs trump off inputs within that type
          // What this means for JK is: if a D input is present as well, the J+K will not do toggling but use D's value. This allows making an SR flip-flop that outputs either on or off if both S+R (still labeled J+K here then) are enabled.
          if(numt1) {
            ff.value = !ff.value; // toggle
          } else if(numj1 && !numk1) {
            ff.value = true; // set
          } else if(numk1 && !numj1) {
            ff.value = false; // reset
          } else if(numd1 && ((numj1 && numk1) || !(numj0 || numk0))) {
            ff.value = true; // set
          } else if(numd0 && ((numj1 && numk1) || !(numj0 || numk0))) {
            ff.value = false; // reset
          } else if(numj1 && numk1) {
            ff.value = !ff.value; // toggle
          } else if(!ff.numd && !ff.numt && !ff.numj && !ff.numk && ff.numc) {
            // no data inputs, use as counter if has c
            ff.value = !ff.value;
          }
        }
      }

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
      //var clocked = ((numc_pos_edge + numc_neg_edge) & 1);
      var clocked = (numc_pos_edge & 1);
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
    } else if(this.type == TYPE_TIMER_OFF || this.type == TYPE_TIMER_ON) {
      var duration = this.number;
      if(duration <= 0) duration = 10; // default, or number 0, gives 10 ticks to toggle, 20 ticks period (which for the default of 0.05 seconds per update gives a period of 1 second)

      var d = timerticks - this.lasttimerticks;
      if(d >= duration) {
        this.lasttimerticks = timerticks;
        if(!this.frozen) this.clocked = !this.clocked;
        this.corecell.renderer.setLook(this.corecell, this.type);
        d = 0;
      }
      if(this.frozen) this.changein = 0;
      else this.changein = Math.max(1, duration - d);
      this.value = this.getNewValue(numon, numoff);
    } else if(this.type == TYPE_TRISTATE || this.type == TYPE_TRISTATE_INV) {
      this.value = this.tristate.update();
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
    if(e.shiftKey && !e.ctrlKey && !changeMode) {
      if(isPaused() && highlightedcomponent == this) {
        highlightedcomponent = null;
        unpause();
      } else {
        pause();
        highlightedcomponent = this;
        render();
        autopaused = true; // this to cause less user confusion: with this true, it unpauses more easily (when pressing anything)
      }
      return;
    }
    // for TYPE_ROM, just do default behavior, it already toggles bit
    if(e.ctrlKey && this.type != TYPE_ROM && !changeMode) {
      var didsomething = true;
      if(e.shiftKey) {
        if(this.altType) {
          this.type = this.altType;
          this.altType = undefined;
        } else {
          this.altType = this.type;
          this.type = TYPE_CONSTANT_OFF;
        }
      } else if(this.type == TYPE_PUSHBUTTON_OFF) {
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
        this.clocked = !this.clocked;
      } else if(this.type == TYPE_TIMER_ON) {
        this.type = TYPE_TIMER_OFF;
        this.clocked = !this.clocked;
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
      } else if(this.type == TYPE_ONEHOT) {
        this.type = TYPE_NONEHOT;
      } else if(this.type == TYPE_NONEHOT) {
        this.type = TYPE_ONEHOT;
      } else if(this.type == TYPE_TRISTATE) {
        this.type = TYPE_TRISTATE_INV;
      } else if(this.type == TYPE_TRISTATE_INV) {
        this.type = TYPE_TRISTATE;
      } else if(this.type == TYPE_CONSTANT_OFF) {
        this.type = TYPE_CONSTANT_ON;
      } else if(this.type == TYPE_CONSTANT_ON) {
        this.type = TYPE_CONSTANT_OFF;
      } else if(this.type == TYPE_COUNTER || this.type == TYPE_RANDOM) {
        this.value = !this.value;
      } else if(this.type == TYPE_FLIPFLOP) {
        //this.value = !this.value;
        var ff = this.ff ? this.ff : (this.master ? this.master.ff : null);
        if(ff) ff.value = !ff.value;
      } else {
        didsomething = false;
      }
      if(didsomething) {
        if(this.type == TYPE_FLIPFLOP) {
         // nothing
        } else {
          //world[y][x].initDiv2();
          var symbol = typesymbols[this.type];
          if(this.type == TYPE_COUNTER) symbol = this.value ? 'C' : 'c';
          if(symbol) {
            this.corecell.symbol = symbol;
            this.corecell.displaysymbol = symbol;
            this.corecell.circuitsymbol = symbol;
            this.corecell.initDiv2();
          }
          this.corecell.renderer.setLook(this.corecell, this.type);
        }
      }
      if(!paused) update();
      else render();
      return;
    }
    if(changeMode) {
      changeDropdown.selectedIndex = 0; // so that "onchange" works again even if choosing the same one ...
      var value = this.value;
      var type = changeMode;
      var symbol = typesymbols[type];
      /*if(changeMode == 'rem_inputs') {
        this.inputs = [];
        changeMode = null;
        return;
      }*/
      if(changeMode == 'c') {
        value = false;
        symbol = 'c';
        type = TYPE_COUNTER;
      }
      if(changeMode == 'C') {
        value = true;
        symbol = 'C';
        type = TYPE_COUNTER;
      }
      if(type == TYPE_TIMER_OFF) {
        this.clocked = false;
      }
      if(type == TYPE_TIMER_ON) {
        this.clocked = true;
      }
      if(type == TYPE_RANDOM) {
        value = Math.random() < 0.5;
      }
      if(!e.ctrlKey && !e.shiftKey) changeMode = null;
      // Do not support changing large devices, it breaks them irreversably during this circuit run
      if(this.master || this.dotmatrix || this.type == TYPE_IC) return;
      this.type = type;
      this.value = value;
      if(!symbol) return;
      for(var i = 0; i < this.cells.length; i++) {
        var cell = world[this.cells[i][1]][this.cells[i][0]];
        if(!devicemap[cell.circuitsymbol]) continue;
        cell.symbol = symbol;
        cell.displaysymbol = symbol;
        cell.circuitsymbol = symbol;
        cell.initDiv(cell.x, cell.y);
      }
      if(!paused) update();
      else render();
      return;
    }

    // For pushbutton, do the update immediately (if not paused), to avoid missing a tick when quickly pressing mouse down then up again
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
      this.frozen = !this.frozen;
    }
    if(this.type == TYPE_VTE) {
      var vte = this.vte;
      if(!vte) vte = this.master.vte;
      if(vte && vte.allowstyping && !vte.invisible) {
        vte.getKeyboardFocus();
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
    if(!paused) update();
  };

  this.mouseup = function(e) {
    // For pushbutton, do the update immediately, to avoid missing a tick when quickly pressing mouse down then up again
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
    if(!paused) update();
    return !e.shiftKey; // did something
  };
}



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////



var changeMode = null;


// red, orange, yellow, green, blue, violet, pink, white
var led_off_fg_colors;
var led_off_bg_colors;
var led_off_border_colors;
var led_on_fg_colors;
var led_on_bg_colors;
var led_on_border_colors;

// Colors for RGB LED and Dot Matrix Screen.
// Array of multiple colors spread over multiple palettes.
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
var TERMINALMIDCOLOR; // used to indicate cursor can be placed here

var BUSCOLORS;

var CHIPLABELBGCOLOR;
var CHIPLABELFGCOLOR;

var ERRORBGCOLOR;
var ERRORFGCOLOROFF;
var ERRORFGCOLORON;

function setColorScheme(index) {
  CHIPLABELBGCOLOR = '#feb';
  CHIPLABELFGCOLOR = '#000';
  ERRORBGCOLOR = '#ff0';
  ERRORFGCOLOROFF = '#f00';
  ERRORFGCOLORON = '#f88';


  rgb_led_bg_colors = [
      '#111', '#eee', // 2 colors. Slightly different values instead of #000 #fff to be subtly visible against white/black main background
      '#111', '#0f0', '#f00', '#ff0', // 4 colors
      '#111', '#00f', '#0f0', '#0ff', '#f00', '#f0f', '#ff0', '#fff', // 8 colors
      '#111', '#00a', '#0a0', '#0aa', '#a00', '#a0a', '#a50', '#aaa', '#555', '#55f', '#5f5', '#5ff', '#f55', '#f5f', '#ff5', '#fff' // 16 colors
  ];
  rgb_led_fg_colors = [];
  for(var i = 0; i < rgb_led_bg_colors.length; i++) {
    rgb_led_fg_colors[i] = util.twiddleColor(rgb_led_bg_colors[i], 80);
  }


  if(index == 0) { // light
    ONCOLOR = 'black';
    OFFCOLOR = '#888';
    BGCOLOR = 'white';
    TEXTFGCOLOR = '#000'; // '#940';
    TEXTBGCOLOR = '#eef';

    led_off_fg_colors = ['#d66', '#d96', '#dd6', '#6d6', '#66d', '#60d', '#d66', '#666'];
    led_off_bg_colors = ['#fffafa', '#fffcfa', '#fffff4', '#fafffa', '#fbfdff', '#faf8ff', '#fffdfd', '#fcfcfc'];
    led_off_border_colors = ['#fcc', '#fa8', '#cc2', '#afa', '#ddf', '#d8f', '#fac', '#fff'];
    led_on_fg_colors = ['red', '#a40', '#880', 'green', '#44f', '#80f', '#d58', 'white'];
    led_on_bg_colors = ['#faa', '#fca', '#ff4', '#afa', '#bdf', '#a8f', '#fdd', '#ccc'];
    led_on_border_colors = led_on_fg_colors;



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
  } else if(index == 1) { // dark
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

    BUSCOLORS = ['#080', '#480', '#0c0', '#4c0', '#084', '#484', '#0c4', '#4c4'];

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
  } else if(index == 2) { // gray
    setColorScheme(0);

    BGCOLOR = '#aaa';

    ONCOLOR = 'white';
    OFFCOLOR = 'black';
    TEXTFGCOLOR = '#00a';
    //TEXTBGCOLOR = 'none';
    TEXTBGCOLOR = '#bbc';
    LINKCOLOR = '#22f';

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

  } else if(index == 3) { // blue
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

    BUSCOLORS = ['#aaf', '#caf', '#acf', '#ccf', '#aaa', '#caa', '#aca', '#cca'];

    TEXTBGCOLOR = 'none';
    GATEBGCOLOR = '#228';

    LINKCOLOR = '#880';
    TITLECOLOR = TEXTFGCOLOR;
  } else if(index == 4) { // green
    setColorScheme(0);

    BGCOLOR = '#050';

    ONCOLOR = '#fa0';
    OFFCOLOR = '#af0';
    TEXTFGCOLOR = OFFCOLOR;

    led_off_fg_colors = ['#f00', '#f80', '#dd0', '#0d0', '#00d', '#a0d', '#f99', '#eee'];
    led_off_bg_colors = [BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR];
    led_off_border_colors = led_off_fg_colors;
    led_on_fg_colors = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
    led_on_bg_colors = led_off_fg_colors;
    led_on_border_colors = led_off_border_colors;//led_on_fg_colors;

    SWITCHON_FGCOLOR = 'white';
    SWITCHON_BGCOLOR = '#0e0';
    SWITCHOFF_FGCOLOR = '#0e0';
    SWITCHOFF_BGCOLOR = BGCOLOR;
    //TODO: use switch border colors, and use them to not have invisible border around swithc in gray color scheme switch on
    SWITCHON_BORDERCOLOR = 'white';
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    BUSCOLORS = ['#af0', '#ac0', '#af4', '#ac4', '#6f0', '#6c0', '#6f4', '#6c4'];


    TEXTBGCOLOR = '#060';
    GATEBGCOLOR = '#060';

    LINKCOLOR = '#ff0';
    TITLECOLOR = TEXTFGCOLOR;
  } else if(index == 5) { // candy
    setColorScheme(0);

    BGCOLOR = '#fbf';

    ONCOLOR = '#f08';
    OFFCOLOR = '#80f';
    TEXTFGCOLOR = '#804';
    TEXTBGCOLOR = '#eae';
    LINKCOLOR = '#f08';
    /*TEXTFGCOLOR = '#f08';
    TEXTBGCOLOR = '#eae';
    LINKCOLOR = '#f00';*/

    GATEBGCOLOR = '#ccf';
    SWITCHON_BGCOLOR = '#afa';
    SWITCHOFF_BGCOLOR = TEXTBGCOLOR;


    /*led_off_fg_colors = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
    led_off_bg_colors = ['#800', '#840', '#880', '#080', '#008', '#408', '#844', '#888'];
    led_off_border_colors = led_off_fg_colors;
    led_on_fg_colors = ['white', 'white', 'black', 'white', 'white', 'white', 'white', 'black'];
    led_on_bg_colors = ['#f00', '#f80', '#ff0', '#0f0', '#00f', '#a0f', '#f99', '#fff'];
    led_on_border_colors = led_on_fg_colors;*/

    led_off_fg_colors = ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'];
    led_off_bg_colors = ['#fae', '#fbe', '#fde', '#ded', '#c9f', '#e9f', '#fbf', '#fcf'];
    led_off_border_colors = led_off_fg_colors;
    led_on_fg_colors = ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'];
    led_on_bg_colors = ['#f00', '#f80', '#ff0', '#0f0', '#48f', '#a0f', '#f99', '#fff'];
    led_on_border_colors = led_on_fg_colors;

    SWITCHON_FGCOLOR = led_on_fg_colors[3];
    SWITCHON_BGCOLOR = led_on_bg_colors[3];
    SWITCHOFF_FGCOLOR = led_off_fg_colors[3];
    SWITCHOFF_BGCOLOR = led_off_bg_colors[3];
    SWITCHON_BORDERCOLOR = SWITCHON_FGCOLOR;
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    BUSCOLORS = ['#80f', '#c0f', '#80c', '#c0c', '#84f', '#c4f', '#84c', '#c4c'];

    TERMINALBGCOLOR = '#88f';
    TERMINALFGCOLOR = '#fff';
  } else if(index == 6) { // inverted
    setColorScheme(0);
    negateColorScheme(); // this only looks decent for inverting the 'light' color scheme.
  } else if(index == 7) { // monochrome
    ONCOLOR = 'black';
    OFFCOLOR = ONCOLOR;
    BGCOLOR = 'white';
    TEXTFGCOLOR = ONCOLOR; // '#940';
    TEXTBGCOLOR = BGCOLOR;

    led_off_fg_colors = [ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR];
    led_off_bg_colors = [BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR];
    led_off_border_colors = [ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR];
    led_on_fg_colors = [ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR];
    led_on_bg_colors = [BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR];
    led_on_border_colors = [ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR];

    // for monochrome RGB led: hidden in main background if off, same color as wire if on (for its bg color; its letter G has opposite color)
    rgb_led_bg_colors = [];
    rgb_led_fg_colors = [];
    for(var i = 0; i < 30; i++) {
      if(i == 0 || i == 2 || i == 6 || i == 14) {
        rgb_led_bg_colors[i] = BGCOLOR;
        rgb_led_fg_colors[i] = ONCOLOR;
      } else {
        rgb_led_bg_colors[i] = ONCOLOR;
        rgb_led_fg_colors[i] = BGCOLOR;
      }
    }

    BUSCOLORS = [ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR];

    SWITCHON_FGCOLOR = led_on_fg_colors[3];
    SWITCHON_BGCOLOR = led_on_bg_colors[3];
    SWITCHOFF_FGCOLOR = led_off_fg_colors[3];
    SWITCHOFF_BGCOLOR = led_off_bg_colors[3];
    SWITCHON_BORDERCOLOR = SWITCHON_FGCOLOR;
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    GATEBGCOLOR = BGCOLOR;

    LINKCOLOR = 'blue';
    TITLECOLOR = ONCOLOR;

    TERMINALBGCOLOR = ONCOLOR;
    TERMINALFGCOLOR = BGCOLOR;
    CHIPLABELBGCOLOR = BGCOLOR;
    CHIPLABELFGCOLOR = ONCOLOR;

    // error BG color remains yellow to keep clearly indicating those
    ERRORFGCOLOROFF = 'black';
    ERRORFGCOLORON = 'black';
  }

  TERMINALMIDCOLOR = util.averageColor(TERMINALFGCOLOR, TERMINALBGCOLOR);
}

function negateColorScheme() {
  ONCOLOR = util.negateColor(ONCOLOR);
  OFFCOLOR = util.negateColor(OFFCOLOR);
  BGCOLOR = util.negateColor(BGCOLOR);
  TEXTFGCOLOR = util.negateColor(TEXTFGCOLOR);
  TEXTBGCOLOR = util.negateColor(TEXTBGCOLOR);
  for(var i = 0; i < led_off_fg_colors.length; i++) led_off_fg_colors[i] = util.negateLigntness(led_off_fg_colors[i]);
  for(var i = 0; i < led_off_bg_colors.length; i++) led_off_bg_colors[i] = util.negateLigntness(led_off_bg_colors[i]);
  for(var i = 0; i < led_off_border_colors.length; i++) led_off_border_colors[i] = util.negateLigntness(led_off_border_colors[i]);
  for(var i = 0; i < led_on_fg_colors.length; i++) led_on_fg_colors[i] = util.negateLigntness(led_on_fg_colors[i]);
  for(var i = 0; i < led_on_bg_colors.length; i++) led_on_bg_colors[i] = util.negateLigntness(led_on_bg_colors[i]);
  for(var i = 0; i < led_on_border_colors.length; i++) led_on_border_colors[i] = util.negateLigntness(led_on_border_colors[i]);
  for(var i = 0; i < BUSCOLORS.length; i++) BUSCOLORS[i] = util.negateColor(BUSCOLORS[i]);
  SWITCHON_FGCOLOR = util.negateLigntness(SWITCHON_FGCOLOR);
  SWITCHON_BGCOLOR = util.negateLigntness(SWITCHON_BGCOLOR);
  SWITCHOFF_FGCOLOR = util.negateLigntness(SWITCHOFF_FGCOLOR);
  SWITCHOFF_BGCOLOR = util.negateLigntness(SWITCHOFF_BGCOLOR);
  SWITCHON_BORDERCOLOR = util.negateLigntness(SWITCHON_BORDERCOLOR);
  SWITCHOFF_BORDERCOLOR = util.negateLigntness(SWITCHOFF_BORDERCOLOR);
  GATEBGCOLOR = util.negateColor(GATEBGCOLOR);
  LINKCOLOR = util.negateColor(LINKCOLOR);
  TITLECOLOR = util.negateColor(TITLECOLOR);
  TERMINALBGCOLOR = util.negateColor(TERMINALBGCOLOR);
  TERMINALMIDCOLOR = util.negateColor(TERMINALMIDCOLOR);
  TERMINALFGCOLOR = util.negateColor(TERMINALFGCOLOR);
  CHIPLABELBGCOLOR = util.negateColor(CHIPLABELBGCOLOR);
  CHIPLABELFGCOLOR = util.negateColor(CHIPLABELFGCOLOR);
  // error-colors not negated, should remain yellow+red
}

var colorscheme = util.getLocalStorage('color_scheme') || 0;


setColorScheme(colorscheme);



// I wanted to use CSS animation instead of this javascript solution, but it turns out the CSS animation uses extreme amount of CPU. So do with JS timer instead.
var globalSingleBlinkingCursor = null;
var blinkTimer = null;

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

    blinkTimer = window.setTimeout(blink, 500);
  };

  var initial = !globalSingleBlinkingCursor;
  globalSingleBlinkingCursor = div;
  if(initial) blink();
}

function stopBlinkingCursor() {
  if(globalSingleBlinkingCursor) {
    globalSingleBlinkingCursor.style.backgroundColor = TERMINALMIDCOLOR;
    globalSingleBlinkingCursor.blinkOn = false;
    globalSingleBlinkingCursor = null;
  }
  if(blinkTimer) {
    window.clearTimeout(blinkTimer);
    blinkTimer = null;
  }
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
  this.labelsymbol = null; // used for only very few cell types, for extra text that couldn't be stored in displaysymbol since displaysymbol will render according to actual symbol meaning (e.g. switch becomes green)
  this.circuitextra = 0; // extra information in addition to circuitsymbol in some cases. For ^>v<m]w[ inputs: 0 = input reacting to devices on sides too, 1 = input not reacting to devices on sides, 2 = diagonal crossing input (diaginput). For 'g': if 1, is number (so connected to real g's, unlike g's which don't normally interact)
  this.skipparsing = false; // true for things that can be safely skipped for circuit-related parsing (false for any circuit as well as numbers)
  this.components = [null, null, null, null, null, null, null, null]; // components containing this cell (normally the first is used, but can be 2 for +, /, \, For TYPE_IC, up to 8 can be used, the index matching the output dir)
  this.comment = false;
  this.toclink = ''; // only if this is a 'toc' with single link id
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
  this.commentalign = -1; // -1=none (fullwidth only), 0=left, 1=center, 2=right
  this.commentstyle = 0; // 0=full width, 1=narrow width monospace, 2=formatted, 3=horizontal rule
  this.commentchapter = -1;
  this.commentanchor = ''; // only used if this is chapter title
  this.commentlength = 0; // the text itself
  this.commentlength2 = 0; // including any quotes or styling numbers
  this.antennax = -1; // horizontal matching antenna, if any
  this.antennay = -1; // vertical matching antenna, if any
  this.drawchip = false; // TODO: this feature is now ignored! stop setting this field and remove it. -- when drawing the 'i' of a chip in canvas mode, only do it if this is true, it indicates a good looking "core" cell for it (next to number, ...)
  this.isvte = false; // for drawing
  this.clusterindex = -1; // for components connected together with extenders '#'

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

    if(this.isvte) {
      var master = this.components[0];
      if(!master) return;
      if(master.master) master = master.master;
      var vte = master.vte;
      if(!vte || !vte.text) return;
      if(vte.invisible) return; //inside chip so don't render
      var x = this.x - vte.x0;
      var y = this.y - vte.y0;
      if(x < 0 || y < 0) return;
      var char = vte.text[y][x];
      var blink = (vte == activeVTE && x == vte.cursorx && y == vte.cursory && vte.supportsTyping());
      var blur = (vte != activeVTE && x == vte.cursorx && y == vte.cursory && vte.supportsTyping());
      this.renderer.setTerminal(char, blink, blur);
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
    if(symbol == '#' && this.components[0]) {
      // TODO: use "typesymbols"
      if(this.components[0].type == TYPE_SWITCH_ON) virtualsymbol = 'S';
      if(this.components[0].type == TYPE_SWITCH_OFF) virtualsymbol = 's';
      if(this.components[0].type == TYPE_LED) virtualsymbol = 'l';
      if(this.components[0].type == TYPE_PUSHBUTTON_ON) virtualsymbol = 'P';
      if(this.components[0].type == TYPE_PUSHBUTTON_OFF) virtualsymbol = 'p';
      if(this.components[0].type == TYPE_TIMER_ON) virtualsymbol = 'R';
      if(this.components[0].type == TYPE_TIMER_OFF) virtualsymbol = 'r';
      if(this.components[0].type == TYPE_MUX) virtualsymbol = 'M';
      if(this.components[0].type == TYPE_ALU) virtualsymbol = 'U';
      if(this.components[0].type == TYPE_VTE) virtualsymbol = 'T';
      if(this.components[0].type == TYPE_DOTMATRIX) virtualsymbol = 'D';
    }
    if(symbol == '#' && this.components[1]) {
      if(this.components[1].type == TYPE_MUX) virtualsymbol = 'M';
      if(this.components[1].type == TYPE_ALU) virtualsymbol = 'U';
      if(this.components[1].type == TYPE_VTE) virtualsymbol = 'T';
    }


    var title = null;
    if(!this.comment) {
      var tc = c;
      if(tc == '#') tc = this.components[0].corecell.circuitsymbol;
      if(tc == '-' || tc == '|' || tc == '.' || tc == '/' || tc == '\\' || tc == '%' || tc == '&') {
        title = 'wire. Shift+click to highlight.';
      }
      if(tc == '+' || tc == 'x' || tc == '*') {
        title = 'wire crossing';
      }
      if(tc == '^' || tc == '>' || tc == 'v' || tc == '<' || tc == 'V' || tc == 'X') {
        title = 'device input';
        if(tc == 'X') title += ' (or wire crossing if not near any device)';
      }
      if(tc == 'm' || tc == ']' || tc == 'w' || tc == '[' || tc == 'W' || tc == 'Y') {
        title = 'negated device input';
        if(tc == 'Y') title += ' (or wire crossing if not near any device)';
      }
      if(tc == 's' || tc == 'S') title = 'switch (click to toggle on/off)';
      if(tc == 'p') title = 'pushbutton (hold mouse down to enable)';
      if(tc == 'P') title = 'pushbutton (hold mouse down to disable)';
      if(tc == 'r' || tc == 'R') title = 'timer (click to freeze/unfreeze)';
      if(tc == 'l') title = 'LED';
      if(tc == '?') title = 'random generator';
      if(tc == 'a') title = 'AND gate';
      if(tc == 'A') title = 'NAND gate';
      if(tc == 'o') title = 'OR gate';
      if(tc == 'O') title = 'NOR gate';
      if(tc == 'e') title = 'XOR gate (odd parity detector)';
      if(tc == 'E') title = 'XNOR gate (even parity detector)';
      if(tc == 'h') title = 'one-hot detector';
      if(tc == 'H') title = 'inverted one-hot detector';
      if(tc == 'f') title = 'constant off (fixed off)';
      if(tc == 'F') title = 'constant on (fixed on)';
      if(tc == 'c' || tc == 'C') {
        if(this.components[0] && this.components[0].type == TYPE_COUNTER) {
          if(tc == 'c') title = 'counter off';
          if(tc == 'C') title = 'counter on';
        } else {
          title = 'flipflop clock input (or counter if combined only with y, q or Q)';
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
      if(tc == 'j') title = 'flipflop J input (or edge enable if combined only with y)';
      if(tc == 'k') title = 'flipflop K input (or inverted edge enable if combined only with y)';
      if(tc == 'q') title = 'flipflop output and async set (or pulse if standalone)';
      if(tc == 'Q') title = 'flipflop inverted output and async reset (or inverted pulse if standalone)';
      if(tc == 'z') title = 'tristate buffer, inputs to same z ANDed, multiple z to wire high when any z high (like OR but read on). Allowed to have multiple output to the same wire, but should be used as one-hot (max 1 high to wire, rest must be low) only to be electrically correct and realistic, but logicemu does not enforce that (does not emulate shorts).)';
      if(tc == 'Z') title = 'tristate buffer, inputs to same Z ORed, multiple Z to wire low when any Z low (like AND but read on). Allowed to have multiple output to the same wire, but should be used as one-cold (max 1 low to wire, rest must be high) only to be electrically correct and realistic, but logicemu does not enforce that (does not emulate shorts).)';
      if(tc == 'g') title = 'global (backplane) wire, connects to all other g with matching (or matching absense of) number';
      if(tc == '(') title = 'backplane wire that connects to one matching connector to the right ("antenna")';
      if(tc == ')') title = 'backplane wire that connects to one matching connector to the left ("antenna")';
      if(tc == 'n') title = 'backplane wire that connects to one matching connector to below ("antenna")';
      if(tc == 'u') title = 'backplane wire that connects to one matching connector to the top ("antenna")';
      if(tc == 'I' || this.numbertype == NUMBER_ICDEF) title = 'IC definition';
      if(tc == 'i' || tc == '#i') title = 'IC instance ' + this.components[0].callsubindex;
      if(tc == 'b' || tc == 'B' || tc == '#b') {
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
      if(tc == 'M' || tc == '#M') {
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
      if(tc == 'U' || tc == '#U') {
        var master = this.components[0].master;
        var alu = master ? master.alu : this.components[0].alu;
        if(alu) {
          var numinputs = (alu.numc ? 3 : (alu.numb ? 2 : 1));
          var op = alu.getOpLongName();
          title = 'ALU (arithmetic logic unit): op: "' + op + '",  opindex: ' + alu.opindex + ', signed: ' + alu.signed + ', num inputs: ' + numinputs;
        } else {
          title = 'ALU (but has error)';
        }
      }
      if(tc == 'T' || tc == '#T') {
        title = 'terminal';
        if(this.components[0]) {
          var master = this.components[0].master;
          var vte = master ? master.vte : this.components[0].vte;
          if(vte) {
            if(!vte.counter && !vte.decimaldisplay && !vte.decimalinput) {
              if(vte.numoutputs > 0) title += ' (with ascii output and keyboard input, click to put cursor here)';
              if(vte.numinputs > 0) title += ' (with ascii input, shown on the screen if read)';
              if(vte.numoutputs > 0 && vte.numinputs > 0) title += ' (only outputs what was typed with keyboard using active cursor, not from the component inputs. The inputs are displayed as ascii on screen only.)';
            }
            if(vte.counter) title += ' (as counter)';
            if(vte.decimaldisplay && !vte.counter) {
              title += ' (as decimal display)';
              if(vte.passthrough) title += ' (passes through the input to the output)';
            }
            if(vte.decimalinput && !vte.counter) {
              title += ' (as decimal input, click to put cursor here, and type decimal digits, or hex digits preceded with 0x).';
              title += ' max value, given the ' + vte.numoutputs + ' output wires: ' + (Math.pow(2, vte.numoutputs) - 1);
            }

            if(vte.supportsTyping()) this.renderer.setCursorPointer(true);
          }
        }
      }
      if(tc == 'D') {
        title = 'RGB LED';
        if(this.components[0]) {
          var dot = this.components[0].dotmatrix;
          if(dot && !dot.rgbled) title = 'dot matrix screen';
        }
      }
    }

    this.renderer.init2(this, symbol, virtualsymbol, title);

    if(!this.comment) {
      // TODO: use component type instead?
      var pointer = (c == 's' || c == 'S' || c == 'p' || c == 'P' || c == 'r' || c == 'R' || c == 'b' || c == 'B');
      // currently cursor pointer not enabled for wires etc... that are part of the switch (even though pressing them actually works... but it would look a bit too messy)
      if((c == '#') && this.components[0]) {
        var type = this.components[0].type;
        if(type == TYPE_SWITCH_OFF || type == TYPE_SWITCH_ON || type == TYPE_PUSHBUTTON_OFF || type == TYPE_PUSHBUTTON_ON || type == TYPE_TIMER_OFF || type == TYPE_TIMER_ON) {
          pointer = true;
        }
      }
      if(pointer) this.renderer.setCursorPointer(false);
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
      util.clearSelection(); // we allow selection of comments, but not of other items because it's annoying that selections appear when double clicking. However, do clear the comment selection if it happens to exist when clicking anything.
      e.stopPropagation();
      e.preventDefault();
      if(!changeMode) lastmousedowncomponent = component;
      if(component) component.mousedown(e, x, y);
      // reactivate if it was autopaused
      if(autopaused && isPaused() && !e.shiftKey) {
        // not done with shift key to not interfere with the 'highlight' feature that also uses pause and autopaused state
        unpause();
      }
      if(CLICKDEBUG) {
        console.log('===================');
        console.log('CLICKDEBUG enabled!');
        console.log('===================');
        var w = world[y][x];
        var s = 'x: ' + x + ', y: ' + y + ', circuitsymbol: ' + w.circuitsymbol + ', metasymbol: ' + w.metasymbol + ', displaysymbol: ' + w.displaysymbol + ' | clusterindex: ' + w.clusterindex;
        if(w.number >= -2) s += ', number: ' + w.number + ', numbertype: ' + w.numbertype;
        console.log(s);
        if(w.antennax != -1 || w.antennay != -1) console.log('antennax: ' + w.antennax + ', antennay: ' + w.antennay);
        for(var i = 0; i < w.components.length; i++) {
          var compo = w.components[i];
          if(!compo) continue;
          console.log('component: index: ' + compo.index + ',  type: ' + compo.type + ', corecell: ' + compo.corecell.circuitsymbol + ', corecell.x: ' + compo.corecell.x + ', corecell.y: ' + compo.corecell.y + ' | rom_out_pos: ' + compo.rom_out_pos);
          if(compo.master) console.log('master: index: ' + compo.master.index + ',  type: ' + compo.master.type + ', corecell: ' + compo.master.corecell.circuitsymbol + ', corecell.x: ' + compo.master.corecell.x + ', corecell.y: ' + compo.master.corecell.y);
          for(var j = 0; j < compo.inputs.length; j++) {
            var corecellinfo = (compo.inputs[j].corecell) ? (compo.inputs[j].corecell.circuitsymbol + ', corecell.x: ' + compo.inputs[j].corecell.x + ', corecell.y: ' + compo.inputs[j].corecell.y) : ('' + compo.inputs[j].corecell);
            console.log('input ' + j + ': index: ' +  compo.inputs[j].index + ', type: ' + compo.inputs[j].type + ', corecell: ' +  corecellinfo);
          }
        }

      }
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

  // change the look for user inputs depending on user state (s and p), since they have a few more than 2 combinations
  this.setLook = function(cell, type) {
  };

  // blink = put active cursor for this terminal.
  // blur = put icon that indicates it can accept input but doesn't have focus now
  this.setTerminal = function(char, blink, blur) {
  };
}


// each element is array: [text, anchorname, depth]
var chapters = [];

// the element must already have enough room in the circuit from makeTocRoom
// linkid only used for tocType == 4
function setTocHTML(tocType, linkid, el) {
  el.innerText = '';
  el.style.fontFamily = 'unset'; // remove monospace
  var html = '';
  var j = 0;
  if(tocType == 0) {
    /*var div = makeDiv(0, 0, 800, th, el);
    div.innerText = 'Table of Contents (in this article):';
    div.style.textAlign = 'left';*/
    for(var i = 0; i < chapters.length; i++) {
      var text = chapters[i][0] || '';
      if(text.length > 80) text = text.substr(0, 80) + '...';
      var div = makeDiv(0, i * th, tw, th, el);
      var indent = (chapters[i][2] - 1) * tw;
      var width = Math.floor(text.length * tw * 0.66 + indent + tw * 4);
      div.style.width = width + 'px';
      var span = util.makeElementAt('span', indent, 0, div);
      span.innerText = text;
      //a.href = '#' + chapters[i][1]; // anchor
      var anchorname = chapters[i][1];
      span.onclick = bind(function(anchorname) {
        var e = document.getElementById(anchorname); // anchor name
        if(e) e.scrollIntoView({ behavior: 'smooth'/*, block: 'center'*/ });
      }, anchorname);
      span.style.color = LINKCOLOR;
      // no underline for internal links that just scroll the document
      //span.style.textDecoration = 'underline';
      span.style.fontWeight = 'bold';
      span.style.cursor = 'pointer';
    }
  }
  if(tocType == 1 || tocType == 2 || tocType == 3) {
    for(var i = 0; i < allRegisteredCircuits.length; i++) {
      if(tocType == 2 && (allRegisteredCircuits[i].group != 0 /*|| allRegisteredCircuits[i].linkid == 'helpindex' || allRegisteredCircuits[i].linkid == introId*/)) continue;
      if(tocType == 3 && allRegisteredCircuits[i].group == 0 && allRegisteredCircuits[i].linkid != 'helpindex' && allRegisteredCircuits[i].linkid != 'mainhelp') continue;
      //if(tocType == 4 && allRegisteredCircuits[i].linkid != linkid) continue;
      //var div = makeDiv(0, (i * th), w * tw, th, el);
      var div = makeDiv(0, (j * th), tw, th, el);
      div.style.width = '800px';
      var span = util.makeElementAt('span', 0, 0, div);
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
  if(tocType == 4) {
    var div = makeDiv(0, (j * th), tw, th, el);
    div.style.textAlign = 'left';
    div.style.width = '800px';
    var span = util.makeElementAt('span', 0, 0, div);
    if(linkableCircuits[linkid]) {
      var c = linkableCircuits[linkid];
      var circuit = c.text;
      var title = c.title;
      span.innerText = title;
      span.style.color = LINKCOLOR;
      span.style.textDecoration = 'underline';
      span.style.cursor = 'pointer';
      span.onclick = bind(function(circuit, title, linkid, index) {
        parseText(circuit, title, c);
        currentSelectedCircuit = index;
      }, circuit, title, id, c.index);
    } else {
      span.style.color = TITLECOLOR;
      span.innerText = 'link id "' + linkid + '" not found';
    }
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
    util.removeElement(this.div0);
    util.removeElement(this.div1);
  };

  // one time initialization of a cell
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
        //this.div1.style.fontWeight = 'bold';
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

      var textel = this.div0;

      // allow the text to go to the right
      if(/*cell.commentalign >= 0 && cell.commentalign <= 2*/cell.commentstyle != 0) {
        var align = cell.commentalign;
        if(cell.commentstyle == 2) {
          this.div0.style.fontFamily = 'unset'; // remove monospace
        }
        this.div0.innerText = '';
        this.div0.style.backgroundColor = 'unset';
        if(cell.commentstyle == 3) {
          this.div0.innerHTML = "<hr>";
          this.div0.style.width = '' + (tw * (w - cell.x)) + 'px';
        } else {
          // this span is there so that we can have the background color only over the text, not whitespace parts left or right
          var span0 = util.makeElement('span', this.div0);
          span0.innerText = symbol;
          span0.style.color = fgcolor;
          // don't do the bgcolor for standard non-monospace text, that one is distinguishable enough from circuit elements
          if(cell.commentstyle != 2) span0.style.backgroundColor = bgcolor;
          span0.style.whiteSpace = 'pre';
          //span0.style.fontSize = th + 'px';
          if(cell.commentstyle == 1) {
            span0.style.fontSize = Math.floor(tw * 0.9) + 'px'; // avoids background overlapping parts of font issues
          } else {
            // a bit bigger, because otherwise formatted text tends to be too much smaller compared to circuits, give it a bit more readability
            span0.style.fontSize = Math.floor(tw * 1.1) + 'px';
            if(tw < 16) span0.style.letterSpacing = '0.5px'; // this might make it slightly more readable if zoomed out a lot
          }
          span0.style.height = th + 'px';
          span0.style.lineHeight = th + 'px';
          span0.style.verticalAlign = 'top'; // make the span really go where I want it, not shifted slightly down
          this.div0.style.width = '' + (tw * cell.commentlength2) + 'px';
          //this.div0.style.border = '1px solid red'; // debug comment divs
          if(align == 0) this.div0.style.textAlign = 'left';
          else if(align == 1) this.div0.style.textAlign = 'center';
          else if(align == 2) this.div0.style.textAlign = 'right';

          textel = span0;
        }
      } else {
        this.div0.innerText = symbol;
      }

      if(cell.commentchapter > 0) {
        if(cell.commentchapter == 1) textel.style.fontSize = Math.floor(1.2 * tw) + 'px';
        if(cell.commentchapter < 3) textel.style.fontWeight = 'bold';
        if(cell.commentchapter > 1) textel.style.textDecoration = 'underline';
        if(cell.commentchapter == 3) textel.style.fontStyle = 'italic';

        // this is a bit hacky, but the intention is that we can scroll to this element with "scrollIntoView". But since
        // there is a floating top bar, the top bar would cover up the element. So make it bigger, start it higher up than
        // the real position, to ensure a good boundary area around it will be visible.
        var anchor = makeDiv(0, -200, 1, 400, this.div0);
        //when using "block: center" with scrollIntoView, the above hack is not needed, however center is a bit too far
        //var anchor = makeDiv(0, 0, 1, 1, this.div0);
        anchor.id = cell.commentanchor;
      }

      // allow text selection of those
      this.div0.onmousedown = null;
    } else if(symbol == 'toc') {
      setTocHTML(cell.circuitextra, cell.toclink, this.div0);
    } else {
      if(symbol == '.' || symbol == ',') {
        // shift the wire '.' and ',' up a bit so it is better centered in the div,
        // since the . and , characters are normally at the bottom of the a text line
        this.div0.style.marginTop = '-' + (th >> 2) + 'px';
        this.div1.style.marginTop = '-' + (th >> 2) + 'px';
      }
      if(virtualsymbol == 'l') {
        var color = cell.components[0] ? cell.components[0].number : 0;
        if(color == -1) color = 0;
        if(color > led_off_fg_colors.length) color = 0; // not more colors than that supported
        if(symbol == 'l') {
          this.div0.innerText = 'l';
          this.div1.innerText = 'L';
        }
        this.div0.style.color = led_off_fg_colors[color];
        this.div0.style.backgroundColor = led_off_bg_colors[color];
        this.div1.style.color = led_on_fg_colors[color];
        this.div1.style.backgroundColor = led_on_bg_colors[color];
      }
      if(virtualsymbol == 'D') {
        var color = 0;
        //this.div0.innerText = 'D';
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
        this.div0.innerText = 'r';
        this.div1.innerText = 'R';
      }
      if(symbol == 'b' || symbol == 'B') {
        //this.div1.style.color = this.div0.style.color;
      }
      if(symbol == 'c' || symbol == 'C') {
        this.div0.innerText = 'c';
        this.div1.innerText = 'C';
      }
      if(virtualsymbol == 'T') {
        this.div0.style.visibility = 'hidden';
        this.div1.style.visibility = 'visible';
        this.div1.style.backgroundColor = TERMINALBGCOLOR;
        this.div1.style.color = TERMINALFGCOLOR;
        this.div1.innerText = ' ';
        // The font characters are normally slightly bigger than a cell, but don't do that for the terminal, or bottom of letters gets obscured by the black cell below them, hiding bottom of j, underscores, etc
        this.div1.style.fontSize = Math.floor(tw * 0.9) + 'px';

        if(cell.components[0] && cell.components[0].type == TYPE_VTE) {
          var comp = cell.components[0];
          var vte = comp.vte;
          if(vte && vte.master == comp && vte.supportsTyping() && comp.corecell.x == cell.x && comp.corecell.y == cell.y) {
            // set at position where this terminal is, because otherwise the browser will scroll the screen towards where the element is placed when focusing it
            vte.initTextArea(worldDiv, cell.x * tw, cell.y * th);
          }
        }
      }
      if(symbol == 'I' || (cell.numbertype == NUMBER_ICDEF && digitmap[symbol])) {
        this.div0.style.color = CHIPLABELFGCOLOR;
        this.div0.style.backgroundColor = CHIPLABELBGCOLOR;
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
    this.div0.style.backgroundColor = ERRORBGCOLOR;
    this.div1.style.backgroundColor = ERRORBGCOLOR;
    this.div0.style.color = ERRORFGCOLOROFF;
    this.div1.style.color = ERRORFGCOLORON;
    this.div0.title = errortext;
    this.div1.title = errortext;
  };

  this.setCursorPointer = function(opt_textstyle) {
    var style = opt_textstyle ? 'text' : 'pointer';
    this.div0.style.cursor = style;
    this.div1.style.cursor = style;
    if(this.clickDiv) this.clickDiv.style.cursor = style;
  };

  this.setValue = function(cell, value, type) {
    if(!this.div1) return; // e.g. if this is a comment (TODO: fix the fact that comment gets setValue at all, it should not be part of a component)
    if(type == TYPE_DOTMATRIX && (cell.circuitsymbol == 'D' || cell.circuitsymbol == '#')) {
      var dotmatrix = cell.components[0].dotmatrix;
      if(dotmatrix && !dotmatrix.error) {
        var x = cell.x - dotmatrix.x0;
        var y = cell.y - dotmatrix.y0;
        value = dotmatrix.array[y][x];
        if(value != this.prevvalue) {
          this.div0.style.color = rgb_led_fg_colors[value];
          this.div0.style.backgroundColor = rgb_led_bg_colors[value];
        }
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

    For timer: a R without the changed background indicates the timer is on internally, but
    is not outputting it because it has inputs and none of those inputs are on.
    */
    if(type == TYPE_TIMER_ON || type == TYPE_TIMER_OFF) {
      var clocked = cell.components[0].clocked;
      if(this.div0.innerText != 'R' && clocked) this.div0.innerText = 'R';
      if(this.div0.innerText != 'r' && !clocked) this.div0.innerText = 'r';
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

  this.setTerminal = function(char, blink, blur) {
    if(blink) {
      //blinking cursor for the active terminal
      this.div1.innerText = '';
      registerBlinkingCursor(this.div1);
    } else if(blur) {
      this.div1.innerText = '';
      this.div1.style.backgroundColor = TERMINALMIDCOLOR;
    } else {
      if(char == this.prevchar) return;
      this.div1.innerText = char;
      this.div1.style.backgroundColor = TERMINALBGCOLOR;
    }
  };
}

// checks if neighbor at given direction from x,y is device
function hasDevice(x, y, dir) {
  var n = getNeighbor(x, y, dir);
  if(!n) return false;
  var c2 = world[n.y][n.x].circuitsymbol;
  return devicemaparea[c2];
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
// for backplane wires and antennas. Connects to slightly less things than '.' would.
function connected2b(x, y, dir) {
  var temp = world[y][x].circuitsymbol;
  world[y][x].circuitsymbol = 'g';

  var result = connected2(x, y, dir);

  world[y][x].circuitsymbol = temp;

  return result;
}

// another for graphics, for antennas, which are special
// it's very similar to connected2b, but fixes one more antenna edge case in a
// hacky way: if an antenna is used to cross an IC or other thin long component,
// then there's no point in treating the IC as connected to this antenna, the
// chip is already connected to itself anyway, and the connection of the antenna
// to the chip makes the graphics look very confusing if the antenna was there
// to make a wire cross the chip. So don't draw that as connected.
function connected2a(x, y, dir) {
  // TODO: also consider inputs pointing to this as connected: because thanks to the wraparound antennas let inputs through. Or alternatively, check the partner-antenna as well.
  if(!connected2b(x, y, dir)) return false;

  var c = world[y][x].circuitsymbol;

  // this is a very simple hacky heuristic: only disable antennas with 1 gap in
  // between pointing at each other, like ( )
  // TODO: better solution would be to check if exactly same device (its # or
  // core cell) are touching both antennas, while the antennas point at each other.
  if(c == 'u' && dir == 0 && y - 2 >= 0 && world[y - 2][x].circuitsymbol == 'n') return false;
  if(c == '(' && dir == 1 && x + 2 < w && world[y][x + 2].circuitsymbol == ')') return false;
  if(c == 'n' && dir == 2 && y + 2 < h && world[y + 2][x].circuitsymbol == 'u') return false;
  if(c == ')' && dir == 3 && x - 2 >= 0 && world[y][x - 2].circuitsymbol == '(') return false;

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
// used for rendering boxes around large devices, to determine what are the
// outer sides of the device
function sameDevice(x, y, dir) {
  // getNeighborNoAntennas, not getNeighbor, because the box drawing is local only.
  var n = getNeighborNoAntennas(x, y, dir);
  if(!n) return false;
  var x2 = n.x;
  var y2 = n.y;
  var c = world[y][x].circuitsymbol;
  var c2 = world[y2][x2].circuitsymbol;

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
  if((c == '#' || specialextendmap[c]) && (devicemaparea[c2])) return true;
  if((c2 == '#' || specialextendmap[c2]) && (devicemaparea[c])) return true;

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
  };

  // this one has a circle instead of arrow head (for negated inputs)
  this.drawAntiArrow_ = function(ctx, oppositeColor, x0, y0, x1, y1, opt_r) {
    var c0 = ctx.strokeStyle;
    var c1 = oppositeColor;
    var r = opt_r || 0.25;
    var d = r * 2;
    var d1 = d - 0.1; // just trying to make the line and circle join just right... see the 3-input logic gate circuit's one hot detector with diagonal anti-inputs

    ctx.strokeStyle = c1;
    ctx.beginPath();
    if(y0 == y1 && x1 > x0) {
      this.drawCircleCore_(ctx, x1 - r, y1, r);
    } else if(y0 == y1) {
      this.drawCircleCore_(ctx, x1 + r, y1, r);
    } else if(x0 == x1 && y1 > y0) {
      this.drawCircleCore_(ctx, x1, y1 - r, r);
    } else if(x0 == x1) {
      this.drawCircleCore_(ctx, x1, y1 + r, r);
    } else if(x1 > x0 && y1 > y0) {
      this.drawCircleCore_(ctx, x1 - r, y1 - r, r);
    } else if(x1 > x0 && y1 < y0) {
      this.drawCircleCore_(ctx, x1 - r, y1 + r, r);
    } else if(x1 < x0 && y1 > y0) {
      this.drawCircleCore_(ctx, x1 + r, y1 - r, r);
    } else {
      this.drawCircleCore_(ctx, x1 + r, y1 + r, r);
    }
    ctx.stroke();

    ctx.strokeStyle = c0;
    ctx.beginPath();
    if(y0 == y1 && x1 > x0) {
      this.drawLineCore_(ctx, x0, y0, x1 - d, y1);
    } else if(y0 == y1) {
      this.drawLineCore_(ctx, x0, y0, x1 + d, y1);
    } else if(x0 == x1 && y1 > y0) {
      this.drawLineCore_(ctx, x0, y0, x1, y1 - d);
    } else if(x0 == x1) {
      this.drawLineCore_(ctx, x0, y0, x1, y1 + d);
    } else if(x1 > x0 && y1 > y0) {
      this.drawLineCore_(ctx, x0, y0, x1 - d1, y1 - d1);
    } else if(x1 > x0 && y1 < y0) {
      this.drawLineCore_(ctx, x0, y0, x1 - d1, y1 + d1);
    } else if(x1 < x0 && y1 > y0) {
      this.drawLineCore_(ctx, x0, y0, x1 + d1, y1 - d1);
    } else {
      this.drawLineCore_(ctx, x0, y0, x1 + d1, y1 + d1);
    }
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
  // returns array of [numconnections, binary connection code]
  this.drawBGSplit_ = function(cell, ctx) {
    var num = 0, code = 0;
    ctx.beginPath();
    if(connected2b(cell.x, cell.y, 0)) { num++; code |= 1; this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5); }
    if(connected2b(cell.x, cell.y, 1)) { num++; code |= 2; this.drawLineCore_(ctx, 0.5, 0.5, 1, 0.5); }
    if(connected2b(cell.x, cell.y, 2)) { num++; code |= 4; this.drawLineCore_(ctx, 0.5, 0.5, 0.5, 1); }
    if(connected2b(cell.x, cell.y, 3)) { num++; code |= 8; this.drawLineCore_(ctx, 0, 0.5, 0.5, 0.5); }
    if(connected2b(cell.x, cell.y, 4)) { num++; code |= 16; this.drawLineCore_(ctx, 0.5, 0.5, 1, 0); }
    if(connected2b(cell.x, cell.y, 5)) { num++; code |= 32; this.drawLineCore_(ctx, 0.5, 0.5, 1, 1); }
    if(connected2b(cell.x, cell.y, 6)) { num++; code |= 64; this.drawLineCore_(ctx, 0.5, 0.5, 0, 1); }
    if(connected2b(cell.x, cell.y, 7)) { num++; code |= 128; this.drawLineCore_(ctx, 0.5, 0.5, 0, 0); }
    ctx.stroke();
    return [num, code];
  };

  // returns array of [numconnections, binary connection code]
  this.drawAntennaSplit_ = function(cell, ctx) {
    var num = 0, code = 0;
    ctx.beginPath();
    if(connected2a(cell.x, cell.y, 0)) { num++; code |= 1; this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.4); }
    if(connected2a(cell.x, cell.y, 1)) { num++; code |= 2; this.drawLineCore_(ctx, 0.6, 0.5, 1, 0.5); }
    if(connected2a(cell.x, cell.y, 2)) { num++; code |= 4; this.drawLineCore_(ctx, 0.5, 0.6, 0.5, 1); }
    if(connected2a(cell.x, cell.y, 3)) { num++; code |= 8; this.drawLineCore_(ctx, 0, 0.5, 0.4, 0.5); }
    if(connected2a(cell.x, cell.y, 4)) { num++; code |= 16; this.drawLineCore_(ctx, 0.6, 0.4, 1, 0); }
    if(connected2a(cell.x, cell.y, 5)) { num++; code |= 32; this.drawLineCore_(ctx, 0.6, 0.6, 1, 1); }
    if(connected2a(cell.x, cell.y, 6)) { num++; code |= 64; this.drawLineCore_(ctx, 0.4, 0.6, 0, 1); }
    if(connected2a(cell.x, cell.y, 7)) { num++; code |= 128; this.drawLineCore_(ctx, 0.4, 0.4, 0, 0); }
    ctx.stroke();
    if(connected2a(cell.x, cell.y, 0)) { drawer.drawFilledCircle_(ctx, 0.50, 0.35, 0.07); }
    if(connected2a(cell.x, cell.y, 1)) { drawer.drawFilledCircle_(ctx, 0.65, 0.50, 0.07); }
    if(connected2a(cell.x, cell.y, 2)) { drawer.drawFilledCircle_(ctx, 0.50, 0.65, 0.07); }
    if(connected2a(cell.x, cell.y, 3)) { drawer.drawFilledCircle_(ctx, 0.35, 0.50, 0.07); }
    if(connected2a(cell.x, cell.y, 4)) { drawer.drawFilledCircle_(ctx, 0.65, 0.35, 0.07); }
    if(connected2a(cell.x, cell.y, 5)) { drawer.drawFilledCircle_(ctx, 0.65, 0.65, 0.07); }
    if(connected2a(cell.x, cell.y, 6)) { drawer.drawFilledCircle_(ctx, 0.35, 0.65, 0.07); }
    if(connected2a(cell.x, cell.y, 7)) { drawer.drawFilledCircle_(ctx, 0.35, 0.35, 0.07); }
    return [num, code];
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

  // draws wire crossing only for wires connected on any side. Returns array with amount, and code indicating ('|' ? 1) + ('-' ? 2) + ('/' ? 4) + ('\' ? 8), e.g. 3 if it's a + without diagonals
  this.drawCrossing_ = function(cell, ctx) {
    var num = 0;
    var code = 0;
    if(connected2g(cell.x, cell.y, 0) || connected2g(cell.x, cell.y, 2)) { code |= 1; num++; }
    if(connected2g(cell.x, cell.y, 1) || connected2g(cell.x, cell.y, 3)) { code |= 2; num++; }
    if(connected2g(cell.x, cell.y, 4) || connected2g(cell.x, cell.y, 6)) { code |= 4; num++; }
    if(connected2g(cell.x, cell.y, 5) || connected2g(cell.x, cell.y, 7)) { code |= 8; num++; }

    ctx.beginPath();
    var full = 1; // which one gets the full length
    if(code & 2) {
      if(full) {
        this.drawLineCore_(ctx, 0, 0.5, 1, 0.5);
        full = 0;
      } else {
        var shift = 0.2;
        this.drawLineCore_(ctx, 0, 0.5, 0.5 - shift + 0.1, 0.5);
        this.drawLineCore_(ctx, 0.5 + shift, 0.5, 1, 0.5);
      }
    }
    if(code & 1) {
      if(full) {
        this.drawLineCore_(ctx, 0.5, 0, 0.5, 1);
        full = 0;
      } else {
        var shift = 0.2;
        this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
        this.drawLineCore_(ctx, 0.5, 0.5 + shift, 0.5, 1);
      }
    }
    if(code & 4) {
      if(full) {
        this.drawLineCore_(ctx, 0, 1, 1, 0);
        full = 0;
      } else {
        this.drawLineCore_(ctx, 0, 1, 0.4, 0.6);
        this.drawLineCore_(ctx, 0.6, 0.4, 1, 0);
      }
    }
    if(code & 8) {
      if(full) {
        this.drawLineCore_(ctx, 0, 0, 1, 1);
        full = 0;
      } else {
        this.drawLineCore_(ctx, 0, 0, 0.4, 0.4);
        this.drawLineCore_(ctx, 0.6, 0.6, 1, 1);
      }
    }
    ctx.stroke();

    return [num, code];
  };

  // Designed for the wire crossing input 'X' and 'Y' to draw the non-arrow parts. Returns similar value as this.drawCrossing_, but with 8 possible separate directions for the num and code.
  this.drawCrossing_crossingInput_ = function(cell, ctx) {
    var num = 0;
    var code = 0;
    ctx.beginPath();
    var gap = 0.1;
    if(connected2g(cell.x, cell.y, 0) && isInterestingComponent(cell, 1)) { num++; /*this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5);*/ code |= 1; }
    if(connected2g(cell.x, cell.y, 1) && isInterestingComponent(cell, 0)) { num++; /*this.drawLineCore_(ctx, 0.5, 0.5, 1, 0.5);*/ code |= 2; }
    if(connected2g(cell.x, cell.y, 2) && isInterestingComponent(cell, 1)) { num++; /*this.drawLineCore_(ctx, 0.5, 0.5, 0.5, 1);*/ code |= 4; }
    if(connected2g(cell.x, cell.y, 3) && isInterestingComponent(cell, 0)) { num++; /*this.drawLineCore_(ctx, 0, 0.5, 0.5, 0.5);*/ code |= 8; }
    if(connected2g(cell.x, cell.y, 4) && isInterestingComponent(cell, 3)) { num++; /*this.drawLineCore_(ctx, 0.5, 0.5, 1, 0);*/ code |= 16; }
    if(connected2g(cell.x, cell.y, 5) && isInterestingComponent(cell, 2)) { num++; /*this.drawLineCore_(ctx, 0.5, 0.5, 1, 1);*/ code |= 32; }
    if(connected2g(cell.x, cell.y, 6) && isInterestingComponent(cell, 3)) { num++; /*this.drawLineCore_(ctx, 0.5, 0.5, 0, 1);*/ code |= 64; }
    if(connected2g(cell.x, cell.y, 7) && isInterestingComponent(cell, 2)) { num++; /*this.drawLineCore_(ctx, 0.5, 0.5, 0, 0);*/ code |= 128; }
    ctx.stroke();



    ctx.beginPath();
    var gap = 0.1;
    var full = 1; // which one gets the full length
    if((code & 2) || (code & 8)) {
      if(full) {
        if(code & 2) this.drawLineCore_(ctx, 0.5, 0.5, 1, 0.5);
        if(code & 8) this.drawLineCore_(ctx, 0, 0.5, 0.5, 0.5);
        full = 0;
      } else {
        if(code & 2) this.drawLineCore_(ctx, 0.5 + gap, 0.5, 1, 0.5);
        if(code & 8) this.drawLineCore_(ctx, 0, 0.5, 0.5 - gap, 0.5);
      }
    }
    if((code & 1) || (code & 4)) {
      if(full) {
        this.drawLineCore_(ctx, 0.5, 0, 0.5, 1);
        if(code & 1) this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5);
        if(code & 4) this.drawLineCore_(ctx, 0.5, 0.5, 0.5, 1);
        full = 0;
      } else {
        if(code & 1) this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5 - gap);
        if(code & 4) this.drawLineCore_(ctx, 0.5, 0.5 + gap, 0.5, 1);
      }
    }
    if((code & 16) || (code & 64)) {
      if(full) {
        if(code & 16) this.drawLineCore_(ctx, 0.5, 0.5, 1, 0);
        if(code & 64) this.drawLineCore_(ctx, 0.5, 0.5, 0, 1);
        full = 0;
      } else {
        if(code & 16) this.drawLineCore_(ctx, 0.6, 0.4, 1, 0);
        if(code & 64) this.drawLineCore_(ctx, 0.4, 0.6, 0, 1);
      }
    }
    if((code & 32) || (code & 128)) {
      if(full) {
        if(code & 32) this.drawLineCore_(ctx, 0.5, 0.5, 1, 1);
        if(code & 128) this.drawLineCore_(ctx, 0.5, 0.5, 0, 0);
        full = 0;
      } else {
        if(code & 32) this.drawLineCore_(ctx, 0.6, 0.6, 1, 1);
        if(code & 128) this.drawLineCore_(ctx, 0.4, 0.4, 0, 0);
      }
    }
    ctx.stroke();

    return [num, code];
  };

  // specifically made for dynamic rendering of the 8-way '*' crossing. Value and code use different bits.
  this.drawCrossing2_ = function(ctx, code, value, color0, color1) {
    var color;
    var full = 1; // which one gets the full length

    color = (value & 1) ? color1 : color0;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    if(code & 2) {
      if(full == 2) {
        this.drawLineCore_(ctx, 0, 0.5, 1, 0.5);
        full = 0;
      } else {
        var shift = 0.2;
        this.drawLineCore_(ctx, 0, 0.5, 0.5 - shift + 0.1, 0.5);
        this.drawLineCore_(ctx, 0.5 + shift, 0.5, 1, 0.5);
      }
    }
    ctx.stroke();

    color = (value & 2) ? color1 : color0;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    if(code & 1) {
      if(full) {
        this.drawLineCore_(ctx, 0.5, 0, 0.5, 1);
        full = 0;
      } else {
        var shift = 0.2;
        this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
        this.drawLineCore_(ctx, 0.5, 0.5 + shift, 0.5, 1);
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
        full = 0;
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
        full = 0;
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
      s...+...>l
          .
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
        this.canvases[y2][x2] = util.makeAbsElement('canvas', x + x2 * this.S, y + y2 * this.S, w2, h2, parent);
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
        util.removeElement(this.canvases[y2][x2]);
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

var NOUSETEXTMAP = {'-':true, '|':true, '.':true, '+':true, 'x':true, '*':true,
                    '>':true, 'v':true, '<':true, '^':true, ']':true, 'w':true, '[':true, 'm':true,
                    'V':true, 'W':true, 'X':true, 'Y':true}

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
  // NOTE: this value is updated on the fly depending on whather what's being drawn needs it
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
      util.removeElement(this.text0);
      util.removeElement(this.text1);
    }
    this.fallback.cleanup();
  };

  // one time initialization of a cell
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
      this.canvas0 = rglobal.offcanvas0.getCanvasForCell(cell); //util.makeAbsElement('canvas', 0, 0, tw, th, util.doNotAddToParent/*this.fallback.div0*/);
      this.canvas1 = rglobal.offcanvas1.getCanvasForCell(cell); //util.makeAbsElement('canvas', 0, 0, tw, th, util.doNotAddToParent/*this.fallback.div1*/);
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
      drawer.fillBg_(this.ctx0, ERRORBGCOLOR);
      drawer.fillBg_(this.ctx1, ERRORBGCOLOR);
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
      var oppositeColor = (i == 0) ? ONCOLOR : OFFCOLOR;

      // for big devices like IC and FlipFlop with multiple possible output values, it's
      // ugly if borders get different colors for 'on' and 'off' sub-parts of it, so set to
      // off (the letter character will still get on color)
      if(i == 1 && cell.components[0]) {
        var type = cell.components[0].type;
        if(type == TYPE_FLIPFLOP || type == TYPE_IC || type == TYPE_IC_PASSTHROUGH || type == TYPE_ROM || type == TYPE_MUX || type == TYPE_ALU) {
          // only for the solid parts, wires part of this component must still use on color
          if(devicemaparea[c]) {
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
      } else if(c == '.' || c == ',') {
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
          if(hasDevice(cell.x, cell.y, 7)) { drawer.drawAntiArrow_(ctx, oppositeColor, 1, 1, 0, 0); num++; }
          if(hasDevice(cell.x, cell.y, 4)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0, 1, 1, 0); num++; }
          if(num == 2) this.drawextra = true;
        } else {
          drawer.drawSplit_(cell, ctx, 1);
          drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0.5, 0);
        }
      } else if(c == ']') {
        if(cell.circuitextra == 2 && hasRealComponent(cell)) {
          var num = 0;
          if(hasDevice(cell.x, cell.y, 4)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0, 1, 1, 0); num++; }
          if(hasDevice(cell.x, cell.y, 5)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0, 0, 1, 1); num++; }
          if(num == 2) this.drawextra = true;
        } else {
          drawer.drawSplit_(cell, ctx, 1);
          drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 1, 0.5);
        }
      } else if(c == 'w') {
        if(cell.circuitextra == 2 && hasRealComponent(cell)) {
          var num = 0;
          if(hasDevice(cell.x, cell.y, 6)) { drawer.drawAntiArrow_(ctx, oppositeColor, 1, 0, 0, 1); num++; }
          if(hasDevice(cell.x, cell.y, 5)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0, 0, 1, 1); num++; }
          if(num == 2) this.drawextra = true;
        } else {
          drawer.drawSplit_(cell, ctx, 1);
          drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0.5, 1);
        }
      } else if(c == '[') {
        if(cell.circuitextra == 2 && hasRealComponent(cell)) {
          var num = 0;
          if(hasDevice(cell.x, cell.y, 7)) { drawer.drawAntiArrow_(ctx, oppositeColor, 1, 1, 0, 0); num++; }
          if(hasDevice(cell.x, cell.y, 6)) { drawer.drawAntiArrow_(ctx, oppositeColor, 1, 0, 0, 1); num++; }
          if(num == 2) this.drawextra = true;
        } else {
          drawer.drawSplit_(cell, ctx, 1);
          drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0, 0.5);
        }
      } else if(c == 'V') {
        var num = 0;
        if(hasDevice(cell.x, cell.y, 0)) {num++; drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 0, 0.19);}
        if(hasDevice(cell.x, cell.y, 1)) {num++; drawer.drawArrow_(ctx, 0.5, 0.5, 1, 0.5, 0.19);}
        if(hasDevice(cell.x, cell.y, 2)) {num++; drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 1, 0.19);}
        if(hasDevice(cell.x, cell.y, 3)) {num++; drawer.drawArrow_(ctx, 0.5, 0.5, 0, 0.5, 0.19);}
        drawer.drawSplit_(cell, ctx, num);
      } else if(c == 'W') {
        var num = 0;
        if(hasDevice(cell.x, cell.y, 0)) {num++; drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0.5, 0);}
        if(hasDevice(cell.x, cell.y, 1)) {num++; drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 1, 0.5);}
        if(hasDevice(cell.x, cell.y, 2)) {num++; drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0.5, 1);}
        if(hasDevice(cell.x, cell.y, 3)) {num++; drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0, 0.5);}
        drawer.drawSplit_(cell, ctx, num);
      } else if(c == 'X') {
        var r = drawer.drawCrossing_crossingInput_(cell, ctx);
        var code2 = r[1];
        var code = 0;
        if(hasDevice(cell.x, cell.y, 0) && isInterestingComponent(cell, 1)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 0, 0.19); code |= 1; }
        if(hasDevice(cell.x, cell.y, 1) && isInterestingComponent(cell, 0)) { drawer.drawArrow_(ctx, 0.5, 0.5, 1, 0.5, 0.19); code |= 2; }
        if(hasDevice(cell.x, cell.y, 2) && isInterestingComponent(cell, 1)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 1, 0.19); code |= 4; }
        if(hasDevice(cell.x, cell.y, 3) && isInterestingComponent(cell, 0)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0, 0.5, 0.19); code |= 8; }
        if(hasDevice(cell.x, cell.y, 4) && isInterestingComponent(cell, 3)) { drawer.drawArrow_(ctx, 0.5, 0.5, 1, 0); code |= 16; }
        if(hasDevice(cell.x, cell.y, 5) && isInterestingComponent(cell, 2)) { drawer.drawArrow_(ctx, 0.5, 0.5, 1, 1); code |= 32; }
        if(hasDevice(cell.x, cell.y, 6) && isInterestingComponent(cell, 3)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0, 1); code |= 64; }
        if(hasDevice(cell.x, cell.y, 7) && isInterestingComponent(cell, 2)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0, 0); code |= 128; }
        var code3 = code + code2;

        // temporary debug help
        /*var div = makeDiv(cell.x * tw, cell.y * th, tw, th, worldDiv);
        div.title = 'code: ' + code + ' ' + code2;
        div.style.zIndex = '1000';*/

        if(code == 0 && r[0] > 1) {
          // no actual inputs, it acts as a '*'
          // TODO: support full dynamicdraw for wire crossing inputs too. This will need to draw more types of combinations due to with/without arrow
          this.dynamicdraw = true;
          this.dynamicdrawcode = drawer.drawCrossing_(cell, ctx)[1];
        }
        // TODO: 1,2,4,8 commented out because wrong, this is case of only single direction so only 2 total states, but may be necessary for cases where there's a genuine regular wire
        // TODO: there are more cases that go wrong with combinations of crossing of wire and nonwire, either causing too much or too little drawn
        else if(code == 1 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 32;
        }
        else if(code == 2 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 33;
        }
        else if(code == 4 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 34;
        }
        else if(code == 8 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 35;
        }
        else if(code == 144 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 2;
        }
        else if(code == 48 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 8;
          this.drawextrag = 3;
        }
        else if(code == 96 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 8;
          this.drawextrag = 4;
        }
        else if(code == 192 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 5;
        }
        else if(code == 3 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 16;
        }
        else if(code == 6 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 17;
        }
        else if(code == 12 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 18;
        }
        else if(code == 9 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 19;
        }
      } else if(c == 'Y') {
        var r = drawer.drawCrossing_crossingInput_(cell, ctx);
        var code2 = r[1];
        var code = 0;
        // no "isInterestingComponent" checks for Y, unlike X, because Y can affect things, it's negating (for X any effect, like as AND input, is negated if it's a dummy, but not for Y)
        if(hasDevice(cell.x, cell.y, 0)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0.5, 0); code |= 1; }
        if(hasDevice(cell.x, cell.y, 1)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 1, 0.5); code |= 2; }
        if(hasDevice(cell.x, cell.y, 2)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0.5, 1); code |= 4; }
        if(hasDevice(cell.x, cell.y, 3)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0, 0.5); code |= 8; }
        if(hasDevice(cell.x, cell.y, 4)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 1, 0); code |= 16; }
        if(hasDevice(cell.x, cell.y, 5)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 1, 1); code |= 32; }
        if(hasDevice(cell.x, cell.y, 6)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0, 1); code |= 64; }
        if(hasDevice(cell.x, cell.y, 7)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0, 0); code |= 128; }
        var code3 = code + code2;

        if(code == 0 && r[0] > 1) {
          // no actual inputs, it acts as a '*'
          // TODO: support full dynamicdraw for wire crossing inputs too. This will need to draw more types of combinations due to with/without negated arrow
          this.dynamicdraw = true;
          this.dynamicdrawcode = drawer.drawCrossing_(cell, ctx)[1];
        }
        // TODO: 1,2,4,8 commented out because wrong, this is case of only single direction so only 2 total states, but may be necessary for cases where there's a genuine regular wire
        // TODO: there are more cases that go wrong with combinations of crossing of wire and nonwire, either causing too much or too little drawn
        else if(code == 1 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 36;
        }
        else if(code == 2 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 37;
        }
        else if(code == 4 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 38;
        }
        else if(code == 8 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 39;
        }
        else if(code == 144 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 6;
        }
        else if(code == 48 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 8;
          this.drawextrag = 7;
        }
        else if(code == 96 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 8;
          this.drawextrag = 8;
        }
        else if(code == 192 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 9;
        }
        else if(code == 3 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 20;
        }
        else if(code == 6 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 21;
        }
        else if(code == 12 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 22;
        }
        else if(code == 9 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 23;
        }
      } else if(c == '*') {
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
        var code = drawer.drawAntennaSplit_(cell, ctx)[1];
        if(c == ')') {
          //drawer.drawArc_(ctx, -0.3, 0.5, 0.75, 0.1, 0.8);
          drawer.drawArc_(ctx, 0.5, 0.5, 0.75, 0.25, 0.4);
          //drawer.drawFilledCircle_(ctx, 0.5, 0.5, 0.1);
        } else if(c == '(') {
          //drawer.drawArc_(ctx, 1.3, 0.5, 0.4, 0.75, 0.8);
          drawer.drawArc_(ctx, 0.5, 0.5, 0.25, 0.75, 0.4);
          //if(code & 2) drawer.drawFilledCircle_(ctx, 0.6, 0.5, 0.1);
          //if(code & 8) drawer.drawFilledCircle_(ctx, 0.4, 0.5, 0.1);
        } else if(c == 'u') {
          //drawer.drawArc_(ctx, 0.5, -0.3, 0.65, 0.35, 0.8);
          drawer.drawArc_(ctx, 0.5, 0.5, 0, 0.5, 0.4);
          //drawer.drawFilledCircle_(ctx, 0.5, 0.5, 0.1);
        } else if(c == 'n') {
          //drawer.drawArc_(ctx, 0.5, 1.3, 0.65, 0.85, 0.8);
          drawer.drawArc_(ctx, 0.5, 0.5, 0.5, 0, 0.4);
          //drawer.drawFilledCircle_(ctx, 0.5, 0.5, 0.1);
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
      } else if(c == '@') {
        drawer.fillBg_(ctx, TEXTFGCOLOR);
      } else if(c == 'I' || (cell.numbertype == NUMBER_ICDEF && digitmap[c])) {
        this.fallback.init2(cell, symbol, virtualsymbol); this.usefallbackonly = true; break;
      } else if(virtualsymbol == 'T') {
        this.fallback.init2(cell, symbol, virtualsymbol); this.usefallbackonly = true; break;
      } else if(virtualsymbol == 'D') {
        this.fallback.init2(cell, (symbol == 'D') ? 'D' : ' ', virtualsymbol); this.usefallbackonly = true; break;
        // alternative: always pass space: render the DOTMATRIX purely as a plain color, no letter symbols
        //this.fallback.init2(cell, ' ', virtualsymbol); this.usefallbackonly = true; break;
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
          if(cell.components[0] && cell.components[0].type == TYPE_CONSTANT_OFF) symbol = '0';
          if(cell.components[0] && cell.components[0].type == TYPE_CONSTANT_ON) symbol = '1';
          if(virtualsymbol == 's' || virtualsymbol == 'S' || virtualsymbol == 'p' || virtualsymbol == 'P' || virtualsymbol == 'r' || virtualsymbol == 'R') {
            alreadybg = true;
            drawer.fillBg_(ctx, i == 0 ? SWITCHOFF_BGCOLOR : SWITCHON_BGCOLOR);
            this.ctx0.strokeStyle = this.ctx0.fillStyle = SWITCHOFF_BORDERCOLOR;
            this.ctx1.strokeStyle = this.ctx1.fillStyle = SWITCHON_BORDERCOLOR;
            this.text0.style.color = SWITCHOFF_FGCOLOR;
            this.text1.style.color = SWITCHON_FGCOLOR;
          }
          if(virtualsymbol == 'r' || virtualsymbol == 'R') {
            symbol = (i == 0) ? 'r' : 'R';
          }
          if(symbol == 'c' || symbol == 'C') {
            symbol = (i == 0) ? 'c' : 'C';
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
            if(i == 1) symbol = 'L';
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
        if(devicemaparea[c]) {
          if(!alreadybg) {
            drawer.fillBg_(ctx, GATEBGCOLOR);
          }
          // box drawing for components
          if(!sameDevice(cell.x, cell.y, 0)) drawer.drawLine_(ctx, 0, 0, 1, 0);
          if(!sameDevice(cell.x, cell.y, 1)) drawer.drawLine_(ctx, 1, 0, 1, 1);
          if(!sameDevice(cell.x, cell.y, 2)) drawer.drawLine_(ctx, 1, 1, 0, 1);
          if(!sameDevice(cell.x, cell.y, 3)) drawer.drawLine_(ctx, 0, 1, 0, 0);
        }
        var okdraw = true;
        if(c == '#' || specialextendmap[c]) {
          okdraw = false;
          if((c == '#i' || c == '#U') && digitmap[cell.metasymbol]) okdraw = true; // do still draw chip/ALU numbers

          if(c == '#U' && cell.labelsymbol != null) {
            okdraw = true; // text label on ALU
            symbol = cell.labelsymbol;
          }
        }
        //if((c == 'i') && !(cell.drawchip || digitmap[cell.metasymbol])) okdraw = false;
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
      drawer.drawAntiArrow_(ctx, color1, 1, 1, 0, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, color0, 0, 1, 1, 0);

      // 'diagonal crossing ]'
      prepareAt(7, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, color1, 0, 1, 1, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, color0, 0, 0, 1, 1)

      // 'diagonal crossing w'
      prepareAt(8, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, color1, 1, 0, 0, 1);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, color0, 0, 0, 1, 1);

      // 'diagonal crossing ['
      prepareAt(9, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, color1, 1, 1, 0, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, color0, 1, 0, 0, 1);

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
      drawer.drawAntiArrow_(ctx, color1, 0.5, 1, 0.5, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, color0, 0, 0.5, 1, 0.5);

      // negated input crossing ES
      prepareAt(21, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, color1, 0, 0.5, 1, 0.5);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, color0, 0.5, 0, 0.5, 1);

      // negated input crossing SW
      prepareAt(22, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, color1, 0.5, 0, 0.5, 1);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, color0, 1, 0.5, 0, 0.5);

      // negated input crossing WN
      prepareAt(23, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, color1, 1, 0.5, 0, 0.5);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, color0, 0.5, 1, 0.5, 0);

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
      drawer.drawAntiArrow_(ctx, color1, 0.5, 1, 0.5, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);

      // negated input crossing E
      prepareAt(37, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0.5, 1, 0.5, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, color0, 0, 0.5, 1, 0.5);

      // negated input crossing S
      prepareAt(38, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawAntiArrow_(ctx, color1, 0.5, 0, 0.5, 1);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawLine_(ctx, 0, 0.5, 1, 0.5);

      // negated input crossing W
      prepareAt(39, ty);
      ctx.strokeStyle = ctx.fillStyle = color0;
      drawer.drawLine_(ctx, 0.5, 1, 0.5, 0);
      ctx.strokeStyle = ctx.fillStyle = color1;
      drawer.drawAntiArrow_(ctx, color0, 1, 0.5, 0, 0.5);
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

      // for the * with its up to 16 possible graphics (and more if some legs are
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
          if(c == '*' || c == 'X' || c == 'Y' || c == '+') {
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
      //this.canvas0.style.backgroundColor = ERRORBGCOLOR;
      //this.canvas1.style.backgroundColor = ERRORBGCOLOR;
      this.ctx0.strokeStyle = ERRORFGCOLOROFF;
      this.ctx1.strokeStyle = ERRORFGCOLORON;
      this.ctx0.fillStyle = ERRORFGCOLOROFF;
      this.ctx1.fillStyle = ERRORFGCOLORON;
      this.text0.style.color = ERRORFGCOLOROFF;
      this.text0.title = errortext;
      if(this.usetext) {
        this.text1.style.color = ERRORFGCOLORON;
        this.text1.title = errortext;
      }
    }
  };

  this.setCursorPointer = function(opt_textstyle) {
    this.fallback.setCursorPointer(opt_textstyle);
  };

  this.setLook = function(cell, type) {
    /* see the RendererText setLook function for comment about styles and types */
    if(type == TYPE_TIMER_ON || type == TYPE_TIMER_OFF) {
      var clocked = cell.components[0].clocked;
      if(this.text0.innerText != 'R' && clocked) this.text0.innerText = 'R';
      if(this.text0.innerText != 'r' && !clocked) this.text0.innerText = 'r';
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

  this.setTerminal = function(char, blink, blur) {
    this.fallback.setTerminal(char, blink, blur);
  };
}





////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////




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
      if(antennamap[cell.circuitsymbol]) {
        // This is an inaccurate hack to make antennas light up as well.
        // Antennas are actually more like "warp portals" that make far away cells treated as neighbors, but the antennas
        // themselves don't participate in the component structure.
        // The inaccurate hack makes the antenna light up if some neighboring and probably connected component lights up.
        // It is wrong in some edge cases, doesn't check any components beyond 3, doesn't check diagonal directions, and isn't copied in the renderHighlightComponent function
        // TODO: implement more accurate way. Maybe give antenna cells a component array of relevant components for rendering too, then this code can go away again.
        for(var i = 0; i < 4; i++) {
          if(y > 0 && world[y - 1][x].components[i] && world[y - 1][x].components[i].value && connected2a(x, y, 0)) value |= (1 << i);
          if(x + 1 < w && world[y][x + 1].components[i] && world[y][x + 1].components[i].value && connected2a(x, y, 1)) value |= (1 << i);
          if(y + 1 < h && world[y + 1][x].components[i] && world[y + 1][x].components[i].value && connected2a(x, y, 2)) value |= (1 << i);
          if(x > 0 && world[y][x - 1].components[i] && world[y][x - 1].components[i].value && connected2a(x, y, 3)) value |= (1 << i);
        }
      }
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

// returns in how many ticks something may potentially change again (indicating more update calls should be done), or 0 if nothing changed or will change
function updateComponents(components) {
  var changed = false;
  var changein = 0;

  for(var i = 0; i < components.length; i++) {
    components[i].changed = false;
    components[i].changin = 0;
    components[i].updated = false;
    components[i].prevvalue = components[i].value;
  }
  for(var i = 0; i < components.length; i++) {
    components[i].update();
    if(components[i].changein) changein = (changein ? Math.min(changein, components[i].changein) : components[i].changein);
    if(components[i].changed) changein = 1; // if any component changed, use fastest possible changein since as long as the component changes it or next components can potentially change again

    if(components[i].changed) changed = true; // this is for updating the "numticks" display
  }

  if(changed || numticks < 0) numticks++;
  render();

  return changein;
}

var updateTimeoutId = null;

function update() {
  //console.log('update ' + (+new Date() / 1000.0));
  var changein = updateComponents((UPDATE_ALGORITHM == 1) ? components_order : components);

  if(changein && !paused && !updateTimeoutId) {
    timerticks += changein;
    var time = AUTOSECONDS * 1000 * changein;
    updateTimeoutId = util.setTimeoutSafe(function() {
      updateTimeoutId = null;
      if(paused) return;
      update();
    }, time);
  } else {
    timerticks++;
  }
  console.log(timerticks);
}

// must be called after (or at the end of) parseCells
// this handles various of the numbers, but those affecting comments (which trump all of those) are already done and removed at this point.
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
      if (c == 'U') type = NUMBER_ALU; // TODO: this is not yet working: NUMBER_ALU should trump NUMBER_LED, but it looks like it does not in practice, at least for multidigit number
      // todo: rom corner (is diagonal, currently not handled in this code...)

      if (type != NUMBER_NONE) {
        world[y][x].numbertype = type;
        for (var i = 0; i < 4; i++) {
          if(type == NUMBER_COMMENT && i != 3) continue;
          var dx = ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
          var dy = ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
          var x2 = x + dx;
          var y2 = y + dy;
          // extend this type to the entire number in linear fashion around the core
          for(;;) {
            if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) break;
            var c2 = world[y2][x2].metasymbol;
            if(digitmap[c2] && type > world[y2][x2].numbertype) {
              world[y2][x2].numbertype = type;
            } else {
              break;
            }
            x2 += dx;
            y2 += dy;
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


  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      if(world[y][x].numbertype == NUMBER_LED) {
        if(digitmap[world[y][x].metasymbol]) {
          world[y][x].displaysymbol = ' '; // don't render the numbers next to LEDs, the LED color shows the effect
          // other numbers, such as IC numbers, bus and global wire indices, or timer durations, are not removed but should be shown.
        }
      }
    }
  }


  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      if(world[y][x].numbertype == NUMBER_ALU && digitmap[world[y][x].metasymbol]) {
        world[y][x].circuitsymbol = '#'; // a later pass will turn them into '#'
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
  return true;
}

function parseExtra() {
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
      if(!(devicemaparea[cb] || digitmap[cb]) && (devicemaparea[ca] || digitmap[ca] || devicemaparea[cc] || digitmap[cc])) {
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
        if(devicemaparea[ca] || digitmap[ca] || ca == '.' || ca == '+' || ca == ',') {
          world[y][x].circuitextra = 1;
        }
        if(ca == '|' && (c == '^' || c == 'v' || c == 'm' || c == 'w')) world[y][x].circuitextra = 1;
        if(ca == '-' && (c == '>' || c == '<' || c == ']' || c == '[')) world[y][x].circuitextra = 1;
      }
    }
  }

  return true;
}

// Similar to getNeighbor, but without antenna support
function getNeighborNoAntennas(x, y, dir) {
  var x2 = x + ((dir == 1 || dir == 4 || dir == 5) ? 1 : ((dir == 3 || dir == 6 || dir == 7) ? -1 : 0));
  var y2 = y + ((dir == 0 || dir == 4 || dir == 7) ? -1 : ((dir == 2 || dir == 5 || dir == 6) ? 1 : 0));
  if(x2 < 0 || x2 >= w) return null;
  if(y2 < 0 || y2 >= h) return null;

  return world[y2][x2];
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

function setCommentOptions(o, commentalign, commentstyle, commentchapter) {
  o.commentalign = commentalign;
  o.commentstyle = commentstyle;
  o.commentchapter = commentchapter;
}

// parse the individual world cells from the text
function parseCells(text) {
  world = [];
  var lines = text.split('\n');
  h = lines.length;
  w = 1;
  for(var i = 0; i < lines.length; i++) w = Math.max(w, lines[i].length);

  var anchorindex = 0;

  for(var y = 0; y < h; y++) {
    world[y] = [];
    var comment = false;
    var commentalign = -1;
    var commentstyle = 0;
    var commentchapter = -1;
    var thincommentcell = null;
    line0[y] = 0;
    line1[y] = 0;
    var line0inited = false;
    var commentstart = 0; // text itself
    var commentstart2 = 0; // quote or number
    var commentend = 0; // text itself
    var commentend2 = 0; // quote or number
    var commentanchor = '';

    for(var x = 0; x < w; x++) {
      var cell = new Cell();
      var s = x >= lines[y].length ? ' ' : lines[y][x];
      if (s == BACKSLASH_ALTERNATIVE && !comment) s = '\\';
      if (s == DQUOT_ALTERNATIVE) s = '"';
      cell.symbol = s;
      cell.displaysymbol = s;
      cell.circuitsymbol = s;
      //cell.metasymbol = comment ? commentalign : s;
      cell.metasymbol = comment ? '"' : s;
      world[y][x] = cell;
      cell.comment = comment;
      cell.x = x;
      cell.y = y;
      // disable numbers that affected comments
      if(!comment && (cell.symbol == '0' || cell.symbol == '1' || cell.symbol == '2' || cell.symbol == '3' || cell.symbol == '4' || cell.symbol == '5' || cell.symbol == '6' || cell.symbol == '7' || cell.symbol == '8')) {
        if((x > 0 && lines[y][x - 1] == '"') || (x + 1 < w && lines[y][x + 1] == '"')) {
          cell.displaysymbol = ' ';
          cell.circuitsymbol = ' ';
          cell.metasymbol = '"';
          cell.comment = true; // a number that affects a comment is itself part of the comment, and made invisible. It should not affect LED color etc...
        }
      }
      if(comment) {
        if(cell.symbol == '"') { // comment done
          cell.displaysymbol = ' ';
          cell.circuitsymbol = ' ';
          cell.comment = true;
          setCommentOptions(cell, commentalign, commentstyle, commentchapter);
          if(commentchapter > 0 && thincommentcell) {
            cell.commentanchor = commentanchor;
            chapters.push([thincommentcell.displaysymbol, cell.commentanchor, commentchapter]);
          }
          comment = !comment;

          if(cell.commentalign == 3 || cell.commentalign == 5) {
            if(commentend2 > x) {
              x++;
              world[y][x] = new Cell();
              world[y][x].x = x;
              world[y][x].y = y;
            }
            var i;
            for(i = commentstart2; i <= commentend2; i++) {
              var j = i;
              if(commentalign == 5) j = commentend2 - (i - commentstart2); // need to go from other end to not overwrite
              var shift = (commentalign == 3) ?
                  (j + commentstart - commentstart2) :
                  j - (commentend2 - commentend);
              if(shift >= commentstart && shift <= commentend) {
                world[y][j].commentalign = -1;
                world[y][j].displaysymbol = world[y][shift].displaysymbol;
                world[y][j].circuitsymbol = world[y][shift].circuitsymbol;
                world[y][j].metasymbol = world[y][shift].metasymbol;
                world[y][j].symbol = world[y][shift].symbol;
                world[y][j].comment = true;
                //world[y][j].number = true;
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
          commentalign = -1;
          commentstyle = 0;
          commentchapter = -1;
        }
      } else {
        if(cell.symbol == '"') {
          cell.displaysymbol = ' ';
          cell.circuitsymbol = ' ';
          cell.comment = true;
          cell.commentlength = 0;
          cell.commentlength2 = 2; // the begin and end quote themselves take place in the alignment room
          // they are counted one too much further on, compensate here
          cell.commentlength--;
          cell.commentlength2--;

          comment = !comment;
          commentalign = -1;
          commentstyle = 0;
          commentchapter = -1;
          commentanchor = '';

          var numberleft = true;
          commentend = x + 1;
          for(;;) {
            if(lines[y][commentend] == '"') break;
            if(commentend + 1 >= w) break;
            commentend++;
          }
          commentend--;

          commentend2 = commentend + 1;
          commentstart = x + 1;
          commentstart2 = x;

          var markdown = false;
          var narrowmono = false;

          var x2 = x - 1;
          if(x2 >= 0 && (lines[y][x2] == '0')) { commentalign = 0; markdown = true; }
          else if(x2 >= 0 && (lines[y][x2] == '1')) { commentalign = 1; markdown = true; }
          else if(x2 >= 0 && (lines[y][x2] == '2')) { commentalign = 2; markdown = true; }
          else if(x2 >= 0 && (lines[y][x2] == '3')) { commentalign = 0; narrowmono = true; }
          else if(x2 >= 0 && (lines[y][x2] == '4')) { commentalign = 1; narrowmono = true; }
          else if(x2 >= 0 && (lines[y][x2] == '5')) { commentalign = 2; narrowmono = true; }
          else if(x2 >= 0 && (lines[y][x2] == '6')) commentalign = 3;
          else if(x2 >= 0 && (lines[y][x2] == '7')) commentalign = 4;
          else if(x2 >= 0 && (lines[y][x2] == '8')) commentalign = 5;
          else {
            numberleft = false;
            for(x2 = x + 1; x2 < w; x2++) {
              if(lines[y][x2] == '"') break;
            }
            x2++;
          }
          if(numberleft) {
            commentstart2--;
            cell.commentlength2++; // for correct right alignment that includes the number
          }

          var numberright = true;
          var xe;
          for(xe = x + 1; xe < w; xe++) {
            if(lines[y][xe] == '"') break;
          }
          xe++;
          if(xe < w && lines[y][xe] == '0') { commentalign = 0; markdown = true; }
          else if(xe < w && lines[y][xe] == '1') { commentalign = 1; markdown = true; }
          else if(xe < w && lines[y][xe] == '2') { commentalign = 2; markdown = true; }
          else if(xe < w && lines[y][xe] == '3') { commentalign = 0; narrowmono = true; }
          else if(xe < w && lines[y][xe] == '4') { commentalign = 1; narrowmono = true; }
          else if(xe < w && lines[y][xe] == '5') { commentalign = 2; narrowmono = true; }
          else if(xe < w && lines[y][xe] == '6') commentalign = 3;
          else if(xe < w && lines[y][xe] == '7') commentalign = 4;
          else if(xe < w && lines[y][xe] == '8') commentalign = 5;
          else {
            numberright = false;
          }

          commentstyle = narrowmono ? 1 : (markdown ? 2 : 0);

          // markdown header support
          if(markdown) {
            if(lines[y][x + 1] == '#' && lines[y][x + 2] == ' ') {
              commentchapter = 1;
              commentstart += 2;
            }
            else if(lines[y][x + 1] == '#' && lines[y][x + 2] == '#' && lines[y][x + 3] == ' ') {
              commentchapter = 2;
              commentstart += 3;
            }
            else if(lines[y][x + 1] == '#' && lines[y][x + 2] == '#' && lines[y][x + 3] == '#' && lines[y][x + 4] == ' ') {
              commentchapter = 3;
              commentstart += 3;
            }
            // support - or * as bullet list item. (Markdown also supports +, but no need to support 3 variants here, less risk of clashing with
            // circuits symbols in comments).
            else if((lines[y][x + 1] == '-' || lines[y][x + 1] == '*') && lines[y][x + 2] == ' ') {
              //lines[y][x + 1] = '•'
              //lines[y].replaceAt(x + 1, '•');
              lines[y] = lines[y].substr(0, x + 1) + '•' + lines[y].substr(x + 2);
            }
            // Markdown also supports --- or *** for horizontal rule, but one is enough, avoid risk of clashing with e.g. intended "---" wire in comment.
            else if(lines[y][x + 1] == '_' && lines[y][x + 2] == '_' && lines[y][x + 3] == '_') {
              commentstyle = 3;
            }
          }

          if(commentchapter) {
            commentanchor = 'a' + anchorindex;
            cell.commentanchor = commentanchor;
            anchorindex++;
          }

          if(numberright) {
            commentend2++;
            cell.commentlength2++; // for correct right alignment that includes the number
          }

          setCommentOptions(cell, commentalign, commentstyle, commentchapter);
          thincommentcell = (cell.commentalign >= 0 && cell.commentalign <= 2) ? (commentstart2 < x ? world[y][commentstart2] : cell) : null;

          if(thincommentcell && thincommentcell != cell) {
            thincommentcell.circuitsymbol = thincommentcell.metasymbol = '"';
            thincommentcell.comment = cell.comment;
            thincommentcell.commentlength = cell.commentlength;
            thincommentcell.commentlength2 = cell.commentlength2;
            thincommentcell.commentalign = cell.commentalign;
            thincommentcell.commentstyle = cell.commentstyle;
            thincommentcell.commentchapter = cell.commentchapter;
            thincommentcell.commentanchor = cell.commentanchor;
          }
        }
      }
      if(comment) {
        if(thincommentcell) {
          if(thincommentcell.commentlength <= 0) thincommentcell.displaysymbol = '';
          if(x >= commentstart && x <= commentend) thincommentcell.displaysymbol += cell.circuitsymbol;
          cell.displaysymbol = ' ';
          thincommentcell.commentlength++;
          thincommentcell.commentlength2++;
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
  for(var y = 0; y < h; y++) {
    for(var x = 0; x < w; x++) {
      var cell = world[y][x];
      var c = world[y][x].circuitsymbol;
      if(c == ':' && !cell.comment) {
        // search for ending ':'. Any ':' already used for another comment already has its circuitsymbol marked as something else so no need to check that.
        var y2;
        for(y2 = y + 1; y2 < h; y2++) {
          if(world[y2][x].circuitsymbol == ':') break;
        }
        // check for numbers that change style
        var commentstyle = 0;
        var commentalign = 0;
        var number0 = (y > 0) ? lines[y - 1][x] : '';
        var number1 = (y2 + 1 < h) ? lines[y2 + 1][x] : '';
        var rem0 = true;
        if(number0 == '0' || number0 == '1' || number0 == '2') commentstyle = 2;
        else if(number0 == '3' || number0 == '4' || number0 == '5') commentstyle = 1;
        else if(number0 == '6' || number0 == '7' || number0 == '8') ; // keep as-is, style >0 overrides this
        else rem0 = false;

        var rem1 = true;
        if(number1 == '0' || number1 == '1' || number1 == '2') { if(commentstyle != 1) commentstyle = 2; }
        else if(number1 == '3' || number1 == '4' || number1 == '5') commentstyle = 1;
        else if(number1 == '6' || number1 == '7' || number1 == '8') ; // keep as-is, style >0 overrides this
        else rem1 = false;

        if(commentstyle != 0) commentalign = 1;

        // disable numbers that affect comments so they don't affect LED colors etc...
        if(rem0) {
          var cell2 = world[y - 1][x];
          if(!cell2.comment) { // do not disable if it's already marked comment, may contain content of a horizontal comment
            cell2.displaysymbol = ' ';
            cell2.circuitsymbol = ' ';
            cell2.metasymbol = '"';
            cell2.comment = true;
          }
        }
        if(rem1) {
          var cell2 = world[y2 + 1][x];
          if(!cell2.comment) { // do not disable if it's already marked comment, may contain content of a horizontal comment
            cell2.displaysymbol = ' ';
            cell2.circuitsymbol = ' ';
            cell2.metasymbol = '"';
            cell2.comment = true;
          }
        }
        for(var y3 = y; y3 <= y2; y3++) {
          if(y3 >= h) break; // there may be no final colon if at bottom
          var cell2 = world[y3][x];
          cell2.comment = true;
          cell2.circuitsymbol = ' ';
          cell2.metasymbol = '"';
          setCommentOptions(cell2, commentalign, commentstyle, -1);
        }
        cell.displaysymbol = ' ';
        if(y2 < h) world[y2][x].displaysymbol = ' ';
      }
    }
  }


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
      var c0 = world[y0][x0].circuitsymbol;
      if(c0 != 'i') continue;

      var stack = [[x0, y0]];
      used[y0][x0] = true;

      var array = [];

      var error = false;

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

        array.push(s);

        if(c == 'i') {
          // why no error but taking the max: in case you have this:
          //   #i##
          //   i12i
          //   ##i#
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
          var c2 = world[y2][x2].circuitsymbol;
          if(c != 'i' && c2 != 'i' && devicemap[c2]) error = true;
          if(c2 != '#' && c2 != 'i' && !digitmap[c2]) continue; // we only care about i, # and digits, they form a group, the 'i' component
          if(c == 'i' && c2 == 'i') continue; // i's don't interact with each other
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
          // extenders should also be marked with a '#i' because we will treat them all
          // specially in the "connected" function, which takes only the circuitsymbol character as input.
          if(world[y][x].circuitsymbol != 'i') world[y][x].circuitsymbol = '#i';
          if(error) {
            world[y][x].error = true;
            callsub.markError('chip area extension error');
          }
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
        var c = world[y][x].metasymbol; // TODO: do we need metasymbol at all, or can drop cc below and just do c = circuitsymbol?
        var cc = world[y][x].circuitsymbol;
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

        if(c == 'i' || cc == '#i') {
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

  if(z > 3 && c != 'i' && c != '#i') return false;
  if(z > 1 && !(c == 'i' || c == '#i' || c == 'X' || c2 == 'X' || c == 'Y' || c2 == 'Y' || c == '*' || c2 == '*')) return false;

  if(c == '-' && (todir2 == 0 || todir2 == 2 || todir2 >= 4)) return false;
  if(c == '|' && (todir2 == 1 || todir2 == 3 || todir2 >= 4)) return false;

  if((c == ',') && (c2 == ',')) return false;

  // Multi-part devices like flip-flop should not have their individual cells connected,
  // they are initially all their own device (to be able to handle multiple inputs), so
  // don't let device extenders extend those here yet.
  if(devicemap[c] && specialextendmap[c2]) return false;
  if(devicemap[c2] && specialextendmap[c]) return false;
  if(specialextendmap[c] && specialextendmap[c2]) return false;

  if(!knownmap[c2]) return false; // it's an isolator

  // TODO: may need to become || instead of && when bus connections handled separately
  if(c == '=' && c2 == '=') return false; // '='-'=' connections must be handled with "handleJunctionConnections" instead

  if(c == '+' && !(z == 0 && (todir2 == 1 || todir2 == 3)) && !(z == 1 && (todir2 == 0 || todir2 == 2))) return false;
  if(c == '%' && !(z == 0 && (todir2 == 1 || todir2 == 2)) && !(z == 1 && (todir2 == 0 || todir2 == 3))) return false;
  if(c == '&' && !(z == 0 && (todir2 == 2 || todir2 == 3)) && !(z == 1 && (todir2 == 0 || todir2 == 1))) return false;
  if(c == '/' && !(todir == 4 || todir == 6)) return false;
  if(c == '\\' && !(todir == 5 || todir == 7)) return false;

  if(c == 'x' && !(z == 0 && (todir == 4 || todir == 6)) && !(z == 1 && (todir == 5 || todir == 7))) return false;
  if((c == 'X' || c == 'Y' || c == '*') &&
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

    if((c == '^' || c == 'm') && ce == 1 && devicemaparea[c2] && (todir == 1 || todir == 3)) return false;
    if((c == '>' || c == ']') && ce == 1 && devicemaparea[c2] && (todir == 0 || todir == 2)) return false;
    if((c == 'v' || c == 'w') && ce == 1 && devicemaparea[c2] && (todir == 1 || todir == 3)) return false;
    if((c == '<' || c == '[') && ce == 1 && devicemaparea[c2] && (todir == 0 || todir == 2)) return false;
  }

  if(dinputmap[c] && ce == 2) {
    if(todir < 4) return false;
    if((c == '^' || c == 'm') && !(todir == 5 && z == 0) && !(todir == 6 && z == 1)) return false;
    if((c == '>' || c == ']') && !(todir == 6 && z == 0) && !(todir == 7 && z == 1)) return false;
    if((c == 'v' || c == 'w') && !(todir == 7 && z == 0) && !(todir == 4 && z == 1)) return false;
    if((c == '<' || c == '[') && !(todir == 4 && z == 0) && !(todir == 5 && z == 1)) return false;
  }


  // those device inputs, too, don't interact with devices here (interaction with devices is resolved later)
  if((c == 'V' || c == 'W' || c == 'X' || c == 'Y') && devicemaparea[c2]) return false;

  // The different backplane types don't interact, unless numbers of a matching one (ce then encodes allowed direction)
  if(c == 'g' && c2 == 'g') {
    if(todir > 3) return false;
    var cedir = (todir & 1) + 1;
    if(ce != cedir && ce2 != cedir) return false;
  }

  if(((dinputmap[c] && inputmap[c2]) || (inputmap[c] && dinputmap[c2]))) return false; // inputs don't interact, including not > with V, but V with V do interact
  if(devicemap[c] && devicemap[c2]) return false; // device cores don't interact

  if((c == 'i' || c == '#i') && z != todir) return false;
  if(c == 'M' || c == '#M' || c == 'U' || c == '#U') {
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
  if(c2 == '*' || c2 == 'X' || c2 == 'Y') {
    // *'s meaning for z coordinate: z=0:-, z=1:|, z=2:/, z=3:\ (backspace)
    if(todir == 0 || todir == 2) z2 = 1;
    else if(todir == 4 || todir == 6) z2 = 3;
    else if(todir == 5 || todir == 7) z2 = 2;
  }
  if(c2 == '%' && (todir2 == 1 || todir2 == 2)) z2 = 1;
  if(c2 == '&' && (todir2 == 3 || todir2 == 2)) z2 = 1;
  if(c2 == 'x' && (todir == 5 || todir == 7)) z2 = 1;
  if(c2 == 'i' || c2 == '#i') {
    if(todir < 4) z2 = ((todir + 2) & 3);
    else z2 = 4 + ((todir + 2) & 3);
  }
  if(c2 == 'M' || c2 == '#M' || c2 == 'U' || c2 == '#U') {
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
  pause(); // also cancels potentially set timeouts
  updateTimeButtonBorders();
  updatePauseButtonText();
  numticks = -1; // -1 because the first implicit tick after parse should not be counted
  timerticks = -1;
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




  // PASS 1: big device and extension ('#') clusters
  var clusterindex = 0;
  used = initUsed3();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0][0]) continue;
      var c0 = world[y0][x0].circuitsymbol;
      if(c0 == '#') continue;
      if(!devicemap[c0]) continue;
      if(c0 == 'i') continue; // this one is currently handled in parseSubs instead

      var stack = [[x0, y0, 0]];
      used[y0][x0][0] = true;
      var rom = false;
      var mux = false;
      var alu = false;
      var vte = false;
      var ff = false;
      var other = false;
      var error = false;
      var array = [];

      if(ffmap[c0]) ff = true;
      else if(rommap[c0]) rom = true;
      else if(c0 == 'T') vte = true;
      else if(c0 == 'M') mux = true;
      else if(c0 == 'U') alu = true;
      else other = true;

      while (stack.length) {
        var s = stack.pop();
        var x = s[0];
        var y = s[1];
        var z = s[2];
        if(x < 0 || x >= w || y < 0 || y >= h) continue;
        var c = world[y][x].circuitsymbol;
        var ce = world[y][x].circuitextra;

        array.push(s);

        // neighbors
        for(var i = 0; i < 8; i++) { // N, E, S, W ; NE, SE, SW, NW
          var x2 = x + ((i == 1 || i == 4 || i == 5) ? 1 : ((i == 3 || i == 6 || i == 7) ? -1 : 0));
          var y2 = y + ((i == 0 || i == 4 || i == 7) ? -1 : ((i == 2 || i == 5 || i == 6) ? 1 : 0));
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          var c2 = world[y2][x2].circuitsymbol;
          var ce2 = world[y2][x2].circuitextra;

          /*if(ff && i >= 4) continue;
          if(rom && i >= 4) continue;
          if(mux && i >= 4) continue;
          if(alu && i >= 4) continue;
          if(vte && i >= 4) continue;*/
          if(i >= 4) continue;

          var z2 = getZ2(c, c2, ce, ce2, i, z); // z coordinate for the neighbor
          if(used[y2][x2][z2]) continue;

          // don't allow any flip-flop parts of the same type to touch, only different types will mix together to form one bigger component
          // this also ensures standalone d's (delay) or c's (clock) don't interact with each other
          if(ffmap[c] && c == c2) continue;

          if(c2 != '#') {
            if(ff) {
              if(!ffmap[c2] && c2 != '#') continue;
              if((c == 'c' || c == 'C') && (c2 == 'c' || c2 == 'C')) continue; //c and C also don't connect in flip-flops, only different types
            }
            else if(rom) {
              if(!rommap[c2] && c2 != '#') continue;
            }
            else if(vte) {
              if(c == '#' && c2 != 'T' && devicemap[c2]) error = true; // the extension # touches another device type
              if(c != '#' || c2 != 'T') continue; // device cells don't interact (e.g. no T with T), plus we also ignore any other cells like wires, ...
            }
            else if(mux) {
              if(c == '#' && c2 != 'M' && devicemap[c2]) error = true; // the extension # touches another device type
              if(c != '#' || c2 != 'M') continue; // device cells don't interact (e.g. no M with M), plus we also ignore any other cells like wires, ...
            }
            else if(alu) {
              if(c == '#' && c2 != 'U' && devicemap[c2]) error = true; // the extension # touches another device type
              if(c != '#' || c2 != 'U') continue; // device cells don't interact (e.g. no M with M), plus we also ignore any other cells like wires, ...
            }
            else {
              //if(c == '#' && c2 != c && devicemap[c2]) error = true; // error already found in other way further on
              if(c != '#' || c2 != c0) continue; // device cells don't interact (e.g. no a with a), plus we also ignore any other cells like wires, ...
            }
          }

          stack.push([x2, y2, z2]);
          used[y2][x2][z2] = true;
        }

        if(mux || alu) {
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

      for(var i = 0; i < array.length; i++) {
        var x = array[i][0];
        var y = array[i][1];
        if(other) {
          // nothing to do
        } else {
          if(world[y][x].circuitsymbol == '#') {
            if(ff) world[y][x].circuitsymbol = '#c';
            if(mux) world[y][x].circuitsymbol = '#M';
            if(alu) world[y][x].circuitsymbol = '#U';
            if(vte) world[y][x].circuitsymbol = '#T';
            if(rom) world[y][x].circuitsymbol = '#b';
          } else {
            world[y][x].bigdevicearray = array;
          }
          if(vte) world[y][x].isvte = true;
        }
        if(error) world[y][x].error = true;
      }
      if(array.length > 1) {
        for(var i = 0; i < array.length; i++) {
          var x = array[i][0];
          var y = array[i][1];
          world[y][x].clusterindex = clusterindex;
        }
        clusterindex++;
      }
    }
  }

  logPerformance('parseComponents pass 1 begin');

  // PASS 2: parse all components
  used = initUsed3();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      var c0 = world[y0][x0].circuitsymbol;

      // z0 > 0 is only to handle following weird edge case scenarios:
      // *) to connect the negated Y as loose wire to things, it should cause a negated input signal there...
      // *) to connect things to call-ic's in some rare case, the rare case being such crossings like that.
      // the thing is, IC output connections use the z value as output direction detector. and crossings like x use the z value for
      // the different legs. Now, if IC's z is higher than 0, and so is the z of this leg of x, it would NEVER find that connection
      // unless we also start from z0 > 0. But using z0 > 0 on EVERYTHING, breaks various things. So only use for those crossings..........
      // It's tricky and hacky and ad hoc (this only added on 20171210) but I HOPE It works
      var maxz0 = 1;
      if(c0 == 'Y') maxz0 = 4;
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

          if(devicemap[c] || specialextendmap[c]) {
            var type2 = TYPE_NULL;
            if(c == 's') type2 = TYPE_SWITCH_OFF;
            if(c == 'S') type2 = TYPE_SWITCH_ON;
            if(c == 'l') type2 = TYPE_LED;
            if(c == 'p') type2 = TYPE_PUSHBUTTON_OFF;
            if(c == 'P') type2 = TYPE_PUSHBUTTON_ON;
            if(c == 'r') type2 = TYPE_TIMER_OFF;
            if(c == 'R') type2 = TYPE_TIMER_ON;
            if(c == 'a') type2 = TYPE_AND;
            if(c == 'A') type2 = TYPE_NAND;
            if(c == 'o') type2 = TYPE_OR;
            if(c == 'O') type2 = TYPE_NOR;
            if(c == 'e') type2 = TYPE_XOR;
            if(c == 'E') type2 = TYPE_XNOR;
            if(c == 'h') type2 = TYPE_ONEHOT;
            if(c == 'H') type2 = TYPE_NONEHOT;
            if(c == 'f') type2 = TYPE_CONSTANT_OFF;
            if(c == 'F') type2 = TYPE_CONSTANT_ON;
            if(c == 'b' || c == 'B' || c == '#b') type2 = TYPE_ROM;
            if(c == 'i' || c == '#i') type2 = TYPE_IC;
            if(c == 'M' || c == '#M') type2 = TYPE_MUX;
            if(c == 'U' || c == '#U') type2 = TYPE_ALU;
            if(c == 'T' || c == '#T') type2 = TYPE_VTE;
            if(c == 'D') type2 = TYPE_DOTMATRIX;
            if(c == 'z') type2 = TYPE_TRISTATE;
            if(c == 'Z') type2 = TYPE_TRISTATE_INV;
            if(c == '?') type2 = TYPE_RANDOM;
            if(ffmap[c] || c == '#c') type2 = TYPE_FLIPFLOP;

            if(type != TYPE_NULL && type != TYPE_UNKNOWN_DEVICE) {
              var ok = false;
              // allow input that touches same special shaped chip with multiple sides
              // (TODO: also allow this for other special shaped devices)
              if(world[y][x].callsub != null && world[y][x].callsub == corecell.callsub) ok = true;
              if(type == TYPE_TRISTATE && c == 'z') ok = true;
              if(type == TYPE_TRISTATE_INV && c == 'Z') ok = true;
              if(corecell && corecell.clusterindex >= 0 && corecell.clusterindex == world[y][x].clusterindex && type == type2) ok = true;
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

            if(!corecell) {
              corecell = world[y][x];
              if(type2 != TYPE_NULL) type = type2;
            }
          }

          if(c == 'toc') type = TYPE_TOC;

          if(type == TYPE_NULL && (c == '#')) type = TYPE_UNKNOWN_DEVICE;
          if(type == TYPE_NULL && specialextendmap[c]) type = TYPE_UNKNOWN_DEVICE;
          if(world[y][x].number >= 0 && devicemaparea[c]) {
            // TODO: check if the above if really needs devicemaparea instead of just devicemap,
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
            // part of a X,*,%,& or so that only exists as side effect of those having possibly undesired wires
            // even + and x are considered explicit! Since you can always avoid their extra wire with a different ascii char. Not so for X or % etc....
            if(c == '-' || c == '|' || c == '/' || c == '\\' || c == ',' || c == '.' || c == '+' || c == 'x' ||
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

          if(type == TYPE_TIMER_ON) {
            component.clocked = true;
          }
          if(type == TYPE_TIMER_OFF) {
            component.clocked = false;
          }
          if(type == TYPE_DOTMATRIX) {
            var dot = new DotMatrix();
            dot.init1(component);
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

  // PASS 3, now to resolve devices made out of multiple devices (ROM, VTE, FF). TODO: remove more code duplication
  used = initUsed3();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0][0]) continue;
      var c0 = world[y0][x0].circuitsymbol;
      //if(c0 == '#') continue; // this is so that we will NOT start parsing with a symbol of which we do not know what component it is. Start with b or B for example so we know it's ROM and correctly handle # extending it (otherwise bug if top row is #)
      if(c0 == '#' || specialextendmap[c0]) continue;

      var stack = [[x0, y0, 0]];
      used[y0][x0][0] = true;
      var rom = false;
      var mux = false;
      var alu = false;
      var vte = false;
      var ff = false;
      var error = false;
      var array = [];

      if(ffmap[c0] && world[y0][x0].components[0] && world[y0][x0].components[0].type == TYPE_FLIPFLOP) ff = true;
      else if(rommap[c0]) rom = true; // type not checked, since some are set to TYPE_NULL
      else if(c0 == 'M' && world[y0][x0].components[0] && world[y0][x0].components[0].type == TYPE_MUX) mux = true;
      else if(c0 == 'M' && world[y0][x0].components[1] && world[y0][x0].components[1].type == TYPE_MUX) mux = true;
      else if(c0 == 'U' && world[y0][x0].components[0] && world[y0][x0].components[0].type == TYPE_ALU) alu = true;
      else if(c0 == 'U' && world[y0][x0].components[1] && world[y0][x0].components[1].type == TYPE_ALU) alu = true;
      else if(c0 == 'T' && world[y0][x0].components[0] && world[y0][x0].components[0].type == TYPE_VTE) vte = true;
      else continue;

      array = world[y0][x0].bigdevicearray;

      for(var i = 0; i < array.length; i++) {
        var x = array[i][0];
        var y = array[i][1];
        var z = array[i][2];
        used[y][x][z] = true;
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

      if(alu) {
        var aluobject = new Alu();
        var x0 = w, y0 = h, x1 = 0, y1 = 0;
        for(var i = 0; i < array.length; i++) {
          x0 = Math.min(x0, array[i][0]);
          y0 = Math.min(y0, array[i][1]);
          x1 = Math.max(x1, array[i][0] + 1);
          y1 = Math.max(y1, array[i][1] + 1);
        }
        if(!aluobject.init1(x0, y0, x1, y1)) {
          console.log('alu error @' + array[0][0] + ' ' + array[0][1]);
          aluobject.error = true;
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
          // # is considered separate components. At that stage of parsing it does not yet
          // know if it'll turn out to be a real flip-flop, or a TYPE_DELAY or TYPE_COUNTER, and
          // merging the # there will cause trouble when you have e.g. j#k, as the j and k for sure
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

  // pass 4: now resolve inputs and outputs of all components
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
      if(c == 'V' || c == 'W') {
        for(var k = 0; k < 4; k++) {
          var wc2 = getNeighbor(x, y, k);
          if(!wc2) continue;
          var x2 = wc2.x;
          var y2 = wc2.y;
          var c2 = wc2.circuitsymbol;
          if(devicemaparea[c2]) {
            x2s.push(x2);
            y2s.push(y2);
            inputused[y2][x2] = true;
          }
        }
      //} else if((c == 'X' || c == 'Y') && component.type != TYPE_LOOSE_WIRE_IMPLICIT) {
      } else if((c == 'X' && component.type != TYPE_LOOSE_WIRE_IMPLICIT) || c == 'Y') {
        // why not for loose wire: if a X touches an AND with an unused side, then it would be
        // counted as an actual input for the AND and the AND would never work. For other inputs
        // like > it's explicitely pointed at the AND so there it's fine. But for the X, often
        // the X serves just to cross over some other input with the goal of not interfering with
        // this AND at all.
        // It's enabled for Y (due to negating this one cannot be ignored), only not for X.
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
          if(devicemaparea[c2]) {
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
          if(devicemaparea[wco0.circuitsymbol]) {
            x2s.push(wco0.x);
            y2s.push(wco0.y);
            inputused[wco0.y][wco0.x] = true;
          } else {
            if(world[y][x].components[0]) {
              // This diagonal input does not have an output on this side. But it still connected to something on the other side.
              // break that connection here now (it was unfortunately not easy to avoid it during earlier parsing since "connected" doesn't look at 3 things at once)
              // Remove that connection here, with as main reason the rendering: otherwise, it may render this input as "on" when this stray connection is on, but that would look incorrect.
              world[y][x].components[0] = null;
            }
          }
        }
        if(z == 1) {
          if(!wco1) continue;
          if(devicemaparea[wco1.circuitsymbol]) {
            x2s.push(wco1.x);
            y2s.push(wco1.y);
            inputused[wco1.y][wco1.x] = true;
          } else {
            if(world[y][x].components[1]) {
              // Same comment as the equivalent for component[0] above.
              world[y][x].components[1] = null;
            }
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
      if(c == 'm' || c == ']' || c == 'w' || c == '[' || c == 'W' || c == 'Y') negated = true;
      for(var k = 0; k < x2s.length; k++) {
        var x2 = x2s[k];
        var y2 = y2s[k];
        var cell2 = world[y2][x2];
        var c2 = cell2.circuitsymbol;
        if(!devicemaparea[c2]) {
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

  // parse input-less flip-flop c,y,q,Q, for packing of flip-flops (clock passthrough and other signal passthrough)
  // TODO: also support c's separated with e.g. #'s in between?
  used = initUsed2();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0]) continue;
      if(inputused[y0][x0]) continue;
      var c0 = world[y0][x0].circuitsymbol;
      if(c0 != 'c' && c0 != 'C' && c0 != 'y' && c0 != 'q' && c0 != 'Q') continue;

      var stack = [[x0, y0]];
      used[y0][x0] = true;
      var array = [];
      while(stack.length) {
        var s = stack.pop();
        var x = s[0];
        var y = s[1];
        if(x < 0 || x >= w || y < 0 || y >= h) continue;
        var c = world[y][x].circuitsymbol;
        if(c0 == 'c' || c0 == 'C') { if (c != 'c' && c != 'C') continue; }
        else if(c != c0) continue;

        array.push(s);

        // neighbors
        for(var i = 0; i < 4; i++) {
          var x2 = x + ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
          var y2 = y + ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          var c2 = world[y2][x2].circuitsymbol;
          if(c0 == 'c' || c0 == 'C') { if (c2 != 'c' && c2 != 'C') continue; }
          else if(c2 != c0) continue;
          if(used[y2][x2]) continue;
          stack.push([x2, y2]);
          used[y2][x2] = true;
        }
      }

      var ffinputtype = (c0 == 'c' || c0 == 'C') ? 0 : (c0 == 'q' ? 5 : (c0 == 'Q') ? 6 : 7 /*'y'*/);

      var newinputs = [];
      for(var i = 0; i < array.length; i++) {
        var x = array[i][0];
        var y = array[i][1];
        if(!inputused[y][x]) continue;
        var component = world[y][x].components[0];
        if(component.master) component = component.master;
        for(var j = 0; j < component.inputs.length; j++) {
          if(component.input_ff_types[j] == ffinputtype) {
            newinputs.push([component.inputs[j], component.inputs_negated[j], component.inputs_x[j], component.inputs_y[j], component.input_ff_types[j]]);
          }
        }
      }

      for(var i = 0; i < array.length; i++) {
        var x = array[i][0];
        var y = array[i][1];
        if(inputused[y][x]) continue;
        var component = world[y][x].components[0];
        if(component.master) component = component.master;
        for(var j = 0; j < newinputs.length; j++) {
          component.inputs.push(newinputs[j][0]);
          component.inputs_negated.push(newinputs[j][1]);
          component.inputs_x.push(newinputs[j][2]);
          component.inputs_y.push(newinputs[j][3]);
          component.inputs_x2.push(-1);
          component.inputs_y2.push(-1);
          component.input_ff_types.push(newinputs[j][4]);
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
    if(component.alu) {
      if(!component.alu.error && !component.alu.init2()) {
        component.alu.error = true;
        console.log('alu error with component ' + i);
      }
      if(component.alu.error) {
        component.error = true;
        component.errormessage = component.alu.errormessage;
      }
    }
    if(component.vte) {
      if(!component.vte.error && !component.vte.init2()) component.vte.error = true;
      if(component.vte.error) component.error = true;
    }
    if(component.dotmatrix) {
      if(!component.dotmatrix.error && !component.dotmatrix.init2()) component.dotmatrix.error = true;
      if(component.dotmatrix.error) {
        component.markError(component.dotmatrix.errormessage);
      }
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
    if(component.master && component.master.alu && component.master.alu.error) {
      component.error = true;
    }
    if(component.type == TYPE_ALU && (!component.master && !component.alu)) {
      component.markError('is ALU but has no master');
    }
    if(component.master && component.master.vte && component.master.vte.error) {
      component.error = true;
    }
    if(component.type == TYPE_VTE && (!component.master && !component.vte)) {
      component.markError('is vte but has no master');
    }
    if(component.type == TYPE_DOTMATRIX && component.dotmatrix.error) {
      component.markError(component.dotmatrix.errormessage);
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
    } else if((cycle_detected && global_counter) || (!cycle_detected && global_delay) || (global_counter && global_delay)) {
      // As soon as the circuit has any loops or delays, the combinational mode does not work and the sequential
      // mode is needed: a single update is no longer guaranteed to bring the circuit to a final stable
      // state.
      // NOTE: replaced by fast now after unification of combinational and sequential

      // MODE:immediate
      UPDATE_ALGORITHM = 1;
    } else if(cycle_detected || global_delay /*the global_delay check is in theory not needed here unless I update the above conditions again*/) {
      // The previous check, which set to MODE:sequential, left out a few cases. Those are set to electron instead of sequential here instead.
      // This is circuits with loops but without any flip-flops or counters. It is more likely that the user intended to make a circuit
      // with electron-like behavior than sequential-like behavior in this case (e.g. a roundloop of or gates)

      // MODE:electron
      UPDATE_ALGORITHM = 3;
    } else {
      // otherwise, by default, set to 'combinational' mode, which has no ticks, only updates when a switch is toggled
      // the circuit should be guaranteed to fully update in a single tick if none of the above conditions triggered
      // NOTE: replaced by fast now after unification of combinational and sequential

      // MODE:immediate
      UPDATE_ALGORITHM = 1;
    }

    var modeindex = origtext.indexOf('MODE:');
    if(modeindex >= 0) {
      if(util.textHasAt(origtext, modeindex + 5, 'immediate')) {
        UPDATE_ALGORITHM = 1;
      }
      else if(util.textHasAt(origtext, modeindex + 5, 'electron')) {
        UPDATE_ALGORITHM = 3;
      }
    }

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
  circuitNameEl.innerText = /*'Current Circuit: ' +*/ text;
}

var firstParse = true; // to keep scrolled down if you were scrolled down before refresh

//opt_fragmentAction: 0=use id if possible else clear, 1=set from code if possible else clear, 2=keep as-is (e.g. if it's already #code). Default: 0
function parseText(text, opt_title, opt_registeredCircuit, opt_fragmentAction) {
  if(editmode) return;

  var titleindex = text.indexOf('"TITLE:');
  if(titleindex >= 0) {
    var titleend = text.indexOf('"', titleindex + 1);
    //if(titleend < 0) titleend = text.indexOf('\n', titleindex);
    if(titleend > titleindex && titleend - titleindex < 200) {
      // override the title with the one marked in the circuit
      opt_title = text.substr(titleindex + 7, titleend - titleindex - 7);
    }
  }

  setDocumentTitle(opt_title || 'unnamed circuit');
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


// to do in a stage before setTocHTML, since it edits the source text itself
function makeTocRoom(text, tocPos, tocType, codelen, outCoords) {
  var start = tocPos;
  var end = tocPos + codelen;
  var numLines = 0;

  if(text[start - 1] == '"') {
    start--;
    if(text[start - 1] == '0') start--;
  }
  if(text[end] == '"') end++;
  for(var i = 0; i < start; i++) {
    if(text[i] == '\n') outCoords[1]++;
  }


  if(tocType == 0) {
    // find amount of chapters in the text. This is a bit of a hack and unaccurate and duplicates some work of parseCells (
    // in parsing markDown chapters), but it's still the easiest, for now, if we can insert fake extra lines BEFORE doing parseCells.
    var numchapters = 0;
    var pos = -1;
    for(;;) {
      pos = text.indexOf('"#', pos + 1);
      if(pos < 0) break;
      var digit0pos = pos - 1;
      var digit1pos = text.indexOf('"', pos + 1) + 1;
      var d0 = text[digit0pos];
      var d1 = text[digit1pos];
      var markdown = (d0 == '0' || d0 == '1' || d0 == '2') || (d1 == '0' || d1 == '1' || d1 == '2');
      if(!markdown) continue;
      if(!((text[pos + 2] == ' ') ||
           (text[pos + 2] == '#' && text[pos + 3] == ' ') ||
           (text[pos + 2] == '#' && text[pos + 3] == '#' && text[pos + 4] == ' '))) {
        continue;
      }
      numchapters++;
    }
    numLines = numchapters + 1;
  }

  if(tocType >= 1 && tocType <= 3) {
    var newlines = '';
    numLines = allRegisteredCircuits.length;
    if(tocType == 2) {
      numLines = 0;
      for(var i = 0; i < allRegisteredCircuits.length; i++) if(allRegisteredCircuits[i].group == 0) numLines++;
    }
    if(tocType == 3) {
      numLines = 0;
      for(var i = 0; i < allRegisteredCircuits.length; i++) if(allRegisteredCircuits[i].group != 0) numLines++;
      numLines++; // circuit 'Help' counted for this one
    }
  }

  if(tocType == 4) {
    numLines = 1;
  }

  for(var i = 1; i < numLines; i++) newlines += '\n';
  text = text.substr(0, start) + newlines + text.substr(end);
  return text;
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
      util.setFragment('id', opt_id);
    } else {
      util.clearFragment();
    }
  }

  if(opt_fragmentAction == 1) {
    var encoded = encodeBoard(text);
    if(encoded.length < 2000) {
      util.setFragment('code', encoded);
    } else {
      if(util.getFragmentParameterByName('code')) {
        util.clearFragment();
      }
    }
  }

  updateCircuitDropdowns(opt_registeredCircuit);

  chapters = [];

  // remove a first newline if present. typically in long string literal you begin the first line after the quote and really don't want that first empty line created by it
  if(text[0] == '\n') text = text.substr(1); // only the first one, typically in long string literal you begin the first line after the quote and really don't want that first empty line created by it
  // keep other starting newlines: you may want them on purpose to allow scrolling


  var tocs = []; // elements are arrays: [x, y, type, linkname]
  var pos = 0;
  for(;;) {
    var tocType = -1;
    var codelen = 0;
    var pos = text.indexOf('INSERT:', pos);
    if(pos < 0) break;
    var tocPos = pos;
    var keyword = '';
    pos += 7;
    while(pos < text.length) {
      var c = text[pos];
      if(c == '"' || c == ' ' || c.charCodeAt(0) < 32 || c == ':') break;
      keyword += c;
      if(keyword.length > 80) break;
      pos++;
    }
    var linkname = '';
    if(keyword == 'toc') tocType = 0;
    else if(keyword == 'links') tocType = 1;
    else if(keyword == 'links_help') tocType = 2;
    else if(keyword == 'links_main') tocType = 3;
    else if(keyword == 'link') {
      if(text[pos] == ':') {
        pos++;
        var name = '';
        while(pos < text.length) {
          var c = text[pos];
          if(c == '"' || c == ' ' || c.charCodeAt(0) < 32 || c == ':') break;
          name += c;
          if(name.length > 80) break;
          pos++;
        }
      }
      if(name.length > 0) {
        tocType = 4;
        linkname = name;
      }
    }
    if(tocType < 0) continue;

    codelen = 7 + keyword.length + linkname.length;

    var tocX = 0;
    var tocY = 0;
    if(tocPos >= 0) {
      var coords = [tocX, tocY];
      text = makeTocRoom(text, tocPos, tocType, codelen, coords);
      coords.push(tocType);
      coords.push(linkname);
      tocs.push(coords);
    }
  }

  resetForParse();
  startLogPerformance();

  logPerformance('parseCells begin');
  if(!parseCells(text)) return false;
  logPerformance('parseCells done');

  logPerformance('parseAntennas begin');
  if(!parseAntennas()) return false;
  logPerformance('parseAntennas done');

  logPerformance('parseExtra begin');
  if(!parseExtra()) return false;
  logPerformance('parseExtra done');

  for(var i = 0; i < tocs.length; i++) {
    var tocX = tocs[i][0];
    var tocY = tocs[i][1];
    var tocType = tocs[i][2];
    world[tocY][tocX].symbol = 'toc';
    world[tocY][tocX].circuitsymbol = 'toc';
    world[tocY][tocX].displaysymbol = 'toc';
    world[tocY][tocX].metasymbol = 'toc';
    world[tocY][tocX].skipparsing = false;
    world[tocY][tocX].circuitextra = tocType;
    world[tocY][tocX].toclink = tocs[i][3];
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
  /*if(graphics_mode && countSlowGraphicalDivs() > 2000) {
    graphics_mode_actual = 0;
  }*/
  var graphicsindex = origtext.indexOf('RENDER:');
  if(graphicsindex >= 0) {
    if(util.textHasAt(origtext, graphicsindex + 7, 'text')) {
      graphics_mode_actual = 0;
    }
    else if(util.textHasAt(origtext, graphicsindex + 7, 'graphical')) {
      graphics_mode_actual = 1;
    }
  }
  rendererDropdown.selectedIndex = graphics_mode_actual;

  // for rendering: this is circuit's width, but reduced to a smaller width in
  // case the only parts extending to the right are left aligned thin comments,
  // which take up less space than the full width so would produce unnecessary
  // whitespace on the right side if zoom to fit is chosen.
  var nonthinw = 0;
  for(var y = 0; y < h; y++) {
    for(var x = 0; x < w; x++) {
      if(world[y][x].circuitsymbol != ' ' && world[y][x].circuitsymbol != '"') nonthinw = Math.max(nonthinw, x);
      if(world[y][x].symbol == '"' && world[y][x].commentalign == -1) nonthinw = Math.max(nonthinw, x);
      if(world[y][x].commentlength > 0 && world[y][x].commentalign != -1) {
        var a = world[y][x].commentalign;
        var fontwidth = (world[y][x].commentchapter > 0) ? 0.66 : 0.5;
        var l = world[y][x].commentlength;
        if(a == 0) {
          nonthinw = Math.max(nonthinw, x + l * fontwidth);
        } else if(a == 1) {
          // centered
          nonthinw = Math.max(nonthinw, x + l * (fontwidth + 1) * 0.5);
        } else {
          // right aligned
          nonthinw = Math.max(nonthinw, x + l);
        }
        x += l;
      }
    }
  }

  var docwidth = /*document.body.clientWidth*/window.innerWidth - 24;
  var docheight = /*document.body.clientHeight*/window.innerHeight - 100 - 8;
  if(!docwidth) docwidth = 1000;
  if(!docheight) docheight = 800;

  // heuristically choose t: find balance between being too zoomed out and
  // having to scroll too much
  var fitx = nonthinw;
  var fity = h;
  var docwidth2 = docwidth;
  var docheight2 = docheight;
  // for wide monitors, treat them as if they are less wide, since most
  // circuits tend to be higher than wider ("articles"), and for reading it's
  // easier to not span the width of the entire screen, but have some more
  // vertical text available instead.
  if(docwidth2 > docheight2 && fity > fitx * 0.75) docwidth2 = docheight2;
  tw = Math.floor(docwidth2 / (fitx + 2));
  th = Math.floor(docheight2 / (fity + 2));
  //t = Math.max(tw, th);
  //t = Math.min(tw, th);
  t = tw;

  var mint = 12;
  var maxt = 40;
  if(t < mint) t = mint;
  if(t > maxt) t = maxt;


  // when something would just fit in the y direction but require a little bit
  // of scrolling, zoom out a bit anyway to make it visible.
  if(th > mint && th < t && th * 2 >= t) t = th;
  if(tw > mint && tw < t && tw * 2 >= t) t = tw;

  th = tw = t;


  logPerformance('initDivs start');
  initDivs();
  logPerformance('initDivs done');

  worldDiv.style.display = 'block';

  logPerformance('initial update start');
  unpause(); // this also calls update
  logPerformance('initial update done');

  return true; // success
}


var autopauseinterval = null; // I don't want browser to keep ticking in background when you forget about it in a tab
var autopaused = false;

if(USEAUTOPAUSE) setAutoPauseInterval();

function setAutoPauseInterval() {
  autopauseinterval = util.setIntervalSafe(function(){
    pause();
    autopaused = true;
  }, AUTOPAUSESECONDS * 1000);
}

var paused = false;

function pause() {
  if(updateTimeoutId) {
    util.clearTimeoutSafe(updateTimeoutId);
    updateTimeoutId = null;
  }
  if(USEAUTOPAUSE && autopauseinterval) {
    util.clearIntervalSafe(autopauseinterval);
  }
  autopaused = false;
  paused = true;
  updatePauseButtonText();
  updateTimeButtonBorders();
}

function unpause() {
  autopaused = false;
  paused = false;
  highlightedcomponent = null;

  if(USEAUTOPAUSE && !autopauseinterval) {
    setAutoPauseInterval();
  }
  updatePauseButtonText();
  updateTimeButtonBorders();
  update(); // unpause must call update, becuase update starts the timing look again (especially relevant if there are timers)
}

function isPaused() {
  return paused;
}

var changeDropdownElements = [];

function registerChangeDropdownElement(type) {
  changeDropdownElements.push(type);
}

registerChangeDropdownElement('change');
registerChangeDropdownElement(TYPE_SWITCH_OFF);
registerChangeDropdownElement(TYPE_SWITCH_ON);
registerChangeDropdownElement(TYPE_PUSHBUTTON_OFF);
registerChangeDropdownElement(TYPE_PUSHBUTTON_ON);
registerChangeDropdownElement(TYPE_TIMER_OFF);
registerChangeDropdownElement(TYPE_TIMER_ON);
registerChangeDropdownElement(TYPE_LED);
registerChangeDropdownElement(TYPE_AND);
registerChangeDropdownElement(TYPE_NAND);
registerChangeDropdownElement(TYPE_OR);
registerChangeDropdownElement(TYPE_NOR);
registerChangeDropdownElement(TYPE_XOR);
registerChangeDropdownElement(TYPE_XNOR);
registerChangeDropdownElement(TYPE_ONEHOT);
registerChangeDropdownElement(TYPE_NONEHOT);
registerChangeDropdownElement(TYPE_CONSTANT_OFF);
registerChangeDropdownElement(TYPE_CONSTANT_ON);
// For 'c' and 'C' I can unfortunately not use TYPE, because both for on and off it's just called "TYPE_COUNTER", plus it
// needs to choose between constant and counter (handled elsewhere)
registerChangeDropdownElement('c');
registerChangeDropdownElement('C');
registerChangeDropdownElement(TYPE_DELAY);
registerChangeDropdownElement(TYPE_RANDOM);
//registerChangeDropdownElement('rem_inputs');





////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////



// utility functions to mirror/rotate a whole circuit
// does NOT yet support comments and possibly other things correctly: manual tuning may be needed afterwards

function transpose(text) {
  var hasbackslash = text.indexOf('\\') >= 0;

  var lines = text.split('\n');
  while(lines.length > 0 && lines[0].length == 0) lines.splice(0, 1);
  while(lines.length > 0 && lines[lines.length - 1].length == 0) lines.length--;
  var h = lines.length;
  var w = 0;
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

  var result = '';
  //result += '\n';
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
  var h = lines.length;
  var w = 0;
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

  var result = '';
  //result += '\n';
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



