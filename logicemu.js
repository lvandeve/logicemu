/*
LogicEmu

Copyright (c) 2018-2021 Lode Vandevenne

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

  // deep clone
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

  // only shallow clone array
  var cloneArray = function(arr) {
    var result = [];
    for(var i = 0; i < arr.length; i++) {
      result[i] = arr[i];
    }
    return result;
  };
  result.cloneArray = cloneArray;

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
    localStorage[name] = data ? data : '';
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


  // e,g, code point 0x1f600 returns smile emoji.
  var unicode_to_utf16 = function(code_point) {
    var result = '';
    if (code_point < 0x10000) {
       result += String.fromCharCode(code_point);
    } else if (code_point <= 0x10FFFF) {
      result += String.fromCharCode((code_point >> 10) + 0xD7C0);
      result += String.fromCharCode((code_point & 0x3FF) + 0xDC00);
    } else {
      result += String.fromCharCode(0xFFFD); // replacement character code
    }
    return result;
  };
  result.unicode_to_utf16 = unicode_to_utf16;

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


// Mathematics for the "ALU" component
// Mostly integer math. If LogicEmuMath.supportbigint is true, functions require type BigInt as input and output, else regular JS numbers.
var LogicEmuMath = (function() {
  // exported functions/fields are assigned to result which will be returned by this self invoking anonymous function expression
  var result = {};

  var supportbigint = !!window.BigInt;
  result.supportbigint = supportbigint;

  // Make integer of the relevant type: BigInt if supported, JS number otherwise.
  // Most of the math here will use BigInt if available, JS number otherwise.
  // If JS supports BigInt, then, between JS number and BigInt:
  // - the following operators work the same (but support larger values for bigInt): almost all, including +, %, <=, <<, &, **, etc...
  // - the following operators work differently: / becomes integer division
  // - the following things are not supported, resulting in an exception: mixing JS nubmer with BigInt for any operation except comparisons; using Math.#### functions on BigInt.
  var B = supportbigint ? window.BigInt : function(i) { return i; };
  result.B = B;

  // the notation 0n, 1n, 3n, ... cannot be used, because if browser doesn't support BigInt,
  // it'll give parsing error on decimal number ending with n.
  var n0 = B(0); result.n0 = n0;
  var n1 = B(1); result.n1 = n1;
  var n2 = B(2); result.n2 = n2;
  var n3 = B(3); result.n3 = n3;
  var n4 = B(4); result.n4 = n4;
  var n5 = B(5); result.n5 = n5;
  var n6 = B(6); result.n6 = n6;
  var n7 = B(7); result.n7 = n7;
  var n10 = B(10); result.n10 = n10;
  var n11 = B(11); result.n11 = n11;
  var n13 = B(13); result.n13 = n13;
  var n15 = B(15); result.n15 = n15;
  var n17 = B(17); result.n17 = n17;

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
  result.gcd = gcd;

  var lcm = function(a, b) {
    var g = gcd(a, b);
    if(g == 0) return n0;
    return intdiv(a, g) * b;
  };
  result.lcm = lcm;


  // error cases: returns 0 if result would be infinity
  var truncdiv = function(a, b) {
    if(b == 0) return n0;
    if(supportbigint) return a / b;
    var result = a / b;
    return (result < 0) ? Math.ceil(result) : Math.floor(result);
  };
  result.truncdiv = truncdiv;

  // error cases: returns 0 if result would be infinity
  var floordiv = function(a, b) {
    if(b == 0) return n0;
    if(!supportbigint) return Math.floor(a / b);
    var result = a / b;
    if((a < 0) != (b < 0)) {
      var m = result * b;
      if(m != a) result--;
    }
    return result;
  };
  result.floordiv = floordiv;

  // only for positive integers, so slightly faster due to less checks.
  var intdiv = function(a, b) {
    if(b == 0) return n0;
    if(!supportbigint) return Math.floor(a / b);
    return a / b;
  };

  // a modulo b, matching floored division (not matching truncated division, like the % operation does)
  var mod = function(a, b) {
    var negb = (b < 0);
    if(negb) b = -b;
    var nega = (a < 0);
    if(nega) a = -a;
    a %= b;
    if(nega) { a = (b - a) % b; } // not the most optimal implementation, but made to easily work for both Number and BigInt
    if(negb) a = -a;
    return a;
  };
  result.mod = mod;

  // in case BigInt is not supported, this function helps to support shifting up to 2**53 instead of just up to 2**31
  var rshift1 = supportbigint ? function(n) { return n >> n1; } : function(n) { return Math.floor(n / 2); };

  // like left shift, but designed to also work with more than 31 bits in case BigInt is not supported in the browser
  var lshift = supportbigint ? function(n, s) { return n << s; } : function(n, s) { return n * ((s < 31) ? (1 << s) : (Math.pow(2, s))); };
  result.lshift = lshift;

  // returns (a + b) % c, taking overflow into account (in JS, overflow means reaching a part in the floating point representation where it can no longer distinguish 1)
  var modadd = supportbigint ?
      function(a, b, c) { return mod(a + b, c); } :
      function(a, b, c) {
    if (a + b < 9007199254740992) return mod(a + b, c);
    if(a + b > c) {
      return mod(a - c + b, c);
    }
    // This assumes that c < 4503599627370496 or a + b doesn't overflow
    return mod(mod(a, c) + mod(b, c), c);
  };

  // returns (a * b) % c, taking overflow into account
  var modmul = supportbigint ?
      function(a, b, c) { return mod(a * b, c); } :
      function(a, b, c) {
    if(a * b < 9007199254740992) return mod(a * b, c);
    var x = 0;
    var y = mod(a, c);
    while(b > 0) {
      if(b & 1) x = modadd(x, y, c);
      y = modadd(y, y, c);
      b = rshift1(b);
    }
    return x % c;
  };

  // Computes integer power (a**b) modulo m.
  // Handles error cases as follows:
  // Returns 0 if the output would be infinity (instead of throwing error) which happens if b < 0 and a == 0.
  // Returns 0 if m is <= 0
  // Returns 1 for the case of 0**0.
  var modpow = function(a, b, m) {
    if(m == 1) return n0; // anything modulo 1 is 0.
    if(m <= 0) return n0; // error
    // integer power
    if(b < 0) {
      if(a == 0) {
        return n0; // actually infinity, but user must handle this as error case outside if desired
      } else if(a == 1) {
        return n1;
      } else if(a == -1) {
        return (b & n1) ? -n1 : n1;
      } else {
        return n0; // integer power result: truncation of the small value is 0.
      }
    } else if(b == 0) {
      return n1;
    } else {
      var neg = a < 0;
      if(neg) a = -a;
      var r = n1;
      var pot = ((m & (m - n1)) == 0); // power of two, so can use faster mask instead of modulo division
      if(pot) {
        var mask = m - n1;
        a &= mask;
        while(b > 0) {
          if(b & n1) r = ((r * a) & mask);
          b = rshift1(b);
          a = ((a * a) & mask);
        }
      } else {
        r = n1;
        a %= m;
        while(b > 0) {
          if(b & n1) r = modmul(r, a, m);
          b = rshift1(b);
          a = modmul(a, a, m);
        }
      }
      if(neg && (b & n1)) {
        r = -r;
      }
      return r;
    }
  };
  result.modpow = modpow;


  // returns floored integer log b of a (e.g. b = 2 gives log2)
  // that is, returns largest integer k such that b**k <= a
  // error cases: returns 0 if a <= 0 or b <= 1
  var intlog = function(a, b) {
    if(b <= 1) return n0;
    if(a <= 1) return n0;
    if(a == b) return n1;
    var r = n0;
    while(a > 0) {
      r++;
      a = intdiv(a, b);
    }
    return r - n1;
  };
  result.intlog = intlog;


  // computes floored integer root b of a (e.g. b = 2 gives sqrt, b=3 gives cbrt)
  // that is, computes largest integer k such that k**b <= a
  // b must be positive integer
  // returns array with [result, boolean error]
  var introot = function(a, b) {
    if(b <= 0) return [n0, true];
    if(b == 1) return [a, false];
    var neg = a < 0;
    if(neg && !(b & n1)) return [n0, true];
    if(neg) a = -a;

    //if n is bigger than log2(a), the result is smaller than 2
    var l = log2(a);
    if(l == 0) return [n0, true];
    if(b > l) return [neg ? -n1 : n1, false];

    var low = n0;
    // high must be higher than the solution (not equal), otherwise the comparisons below don't work correctly.
    // estimate for higher bound: exact non-integer solution of a ^ (1 / b) is 2 ** (log2(a) / b)
    // integer approximation: ensure to use ceil of log2(a)/b to have higher upper bound, and add 1 to be sure it's higher.
    // ceil of log2(a) is l + 1, and ceil of (l + 1) / b is intdiv(l + b + 1 - 1, b)
    var high = (n2 ** intdiv(l + b, b)) + n1;
    var r;
    for (;;) {
      var r = (low + high) >> n1;
      var rr = r ** b;
      if(rr == a) return [neg ? -r : r, false];
      else if(rr < a) low = r;
      else high = r;
      if(high <= low + n1) {
        return [neg ? -low : low, false];
      }
    }
  };
  result.introot = introot;

  // integer modular inverse 1 / a modulo b
  // error cases: if a is 0 or m <= 0, returns 0
  var modinv = function(a, b) {
    if(a == 0 || m == 0) {
      return n0;
    } else {
      a = mod(a, b);
      var r = n0;
      var b0 = b;
      var x = n1, y = n0;
      for(;;) {
        if(a == 1) { r = x; break; }
        if(a == 0) { r = n0; break; }
        var d = intdiv(b, a);
        var m = b - d * a; // modulo (matching floored division)
        y -= x * d;
        b = m;

        if(b == 1) { r = y; break; }
        if(b == 0) { r = n0; break; }
        d = intdiv(a, b);
        m = a - d * b; // modulo (matching floored division)
        x -= y * d;
        a = m;
      }
      if(r < 0) r += b0;
      return r;
    }
  };
  result.modinv = modinv;


  // integer log2
  // error cases: returns 0 if a <= 0
  var log2 = function(a) {
    if(a <= 1) return n0;
    var r = n0;
    while(a > 0) {
      r++;
      a >>= n1;
    }
    return r - n1;
  };
  result.log2 = log2;

  // integer sqrt
  // error cases: returns 0 if a < 0
  var sqrt = function(a) {
    if(a <= 0) return n0;
    var r = n0;
    var s = n2;
    var as = a >> s;
    while(as != 0) {
      s += n2;
      as = a >> s;
    }
    while(s >= 0) {
      r <<= n1;
      var c2 = r + n1;
      if(c2 * c2 <= (a >> s)) {
        r = c2;
      }
      s -= n2;
    }
    return r;
  };
  result.sqrt = sqrt;



  // factorial of a modulo b. returns array of [result, overflow]
  // overflow means the real (non-modulo) result is larger than b, or error condition
  // error cases:
  // - returns 0 and sets overflow if a < 0
  // - returns 0 and sets overflow if b <= 0
  // if opt_nooverflow is true, will not treat output larger than b as overflow (but still use the overflow flag for error conditions)
  // NOTE: can be slow for a > 4096 especially if b only has large prime factors
  var factorial = function(a, b, opt_nooverflow) {
    if(a < 0) return [n0, true];
    if(b <= 0) return [n0, true];

    var pot = ((b & (b - n1)) == 0); // power of two, so can use faster mask instead of modulo division

    // if a/2 is larger than amount of output bits,
    // then we know that all visible output bits will be 0, due to the amount of
    // factors '2' in the result. So no need to compute then, plus also
    // indicate overflow
    if(pot && a > log2(b) * n2) return [n0, true && !opt_nooverflow];
    // if a is larger than b, then it's guaranteed that the modulo value itself
    // is a factor and we know the output modulo b will be 0.
    if(a >= b) return [n0, true && !opt_nooverflow];

    var r = n1;
    var overflow = false;

    if(pot) {
      var mask = b - n1;
      for(var i = n2; i <= a; i++) {
        r *= i;
        if(r > mask) {
          if(!opt_nooverflow) overflow = true;
          r &= mask;
          if(r == 0) break;
        }
      }
    } else {
      if(a >= b) {
        // result is guaranteed to be 0, since the modulo itself will be
        // contained in the factors when a >= b. So no need to compute.
        r = n0;
      } else {
        for(var i = n2; i <= a; i++) {
          r *= i;
          if(r > b) {
            if(!opt_nooverflow) overflow = true;
            r = mod(r, b);
            // once the modulo operation made the result 0, which can easily happen as soon
            // as we passed all the prime factors of b, we can stop since the result is
            // guaranteed to stay 0.
            if(r == 0) break;
          }
        }
      }
    }

    return [r, overflow];
  };
  result.factorial = factorial;

  // return array of [isprime, error]
  var isprime = function(n) {
    if(n < 2) return [false, false];
    if((n & n1) == 0) return [(n == 2) ? true : false, false];
    if((n % n3) == 0) return [(n == 3) ? true : false, false];
    if((n % n5) == 0) return [(n == 5) ? true : false, false];
    if((n % n7) == 0) return [(n == 7) ? true : false, false];
    if(!supportbigint && n > 9007199254740991) return [false, true];
    if(supportbigint && n.toString(16).length > 180) return [false, true]; // too slow for running inside LogicEmu components

    if(n < 1500000) {
      if(supportbigint) n = Number(n); // no need for BigInt for this part
      var s = Math.ceil(Math.sqrt(n)) + 6;
      p = Math.floor(7 / 6) * 6;
      while(p < s) {
        if(n % (p - 1) == 0 || n % (p + 1) == 0) return [false, false];
        p += 6;
      }
      return [true, false];
    } else {
      // Miller-Rabin
      var base;
      if(n < 1373653) base = [2, 3];
      else if(n < 9080191) base = [31, 73];
      else if(n < 4759123141) base = [2, 7, 61];
      else if(n < 1122004669633) base = [2, 13, 23, 1662803];
      else if(n < 2152302898747) base = [2, 3, 5, 7, 11];
      else if(n < 3474749660383) base = [2, 3, 5, 7, 11, 13];
      else if(n < 341550071728321) base = [2, 3, 5, 7, 11, 13, 17];
      else if(n < 3770579582154547) base = [2, 2570940, 880937, 610386380, 4130785767];
      else base = [2, 325, 9375, 28178, 450775, 9780504, 1795265022]; //valid up to >2^64
      for(var i = 0; i < base.length; i++) base[i] = B(base[i]);

      var d = rshift1(n);
      var s = n1;
      while(!(d & n1)) {
        d = rshift1(d);
        ++s;
      }

      var witness = function(n, s, d, a) {
        var x = modpow(a, d, n);
        var y;
        while(s) {
          y = modmul(x, x, n);
          if(y == n1 && x != n1 && x != n - n1) return [false, false];
          x = y;
          s--;
        }
        return y == 1;
      };

      for(var i = 0; i < base.length; i++) {
        if(!witness(n, s, d, base[i])) return [false, false];
      }
      return [true, false];
    }
  };
  result.isprime = isprime;

  // returns smallest prime that is >= n
  // returns -1 if error
  var nextprime = function(n) {
    if(n <= 2) return n2;
    if(n <= 3) return n3;
    if(!supportbigint && n >= 9007199254740881) return -n1;
    if(supportbigint && n.toString(16).length > 180) return -n1; // too slow for running inside LogicEmu components
    if(isprime(n)[0]) return n;

    var m = n % n6;
    var step = n2;
    if(m == 0 || m == 5) {
      n += (m == 0 ? n1 : n2);
      step = n4;
    } else {
      n += (n5 - m);
    }
    for(;;) {
      var p = isprime(n);
      if(p[1]) return -n1; // error
      if(p[0]) return n;
      n += step;
      step ^= n6; //swap step between 2 and 4
    }
  };
  result.nextprime = nextprime;

  // returns largest prime that is <= n
  // returns -1 if error
  var prevprime = function(n) {
    if(n < 2) return -n1; // there is no lower prime
    if(n < 3) return n2;
    if(n < 5) return n3;
    if(n < 7) return n5;
    if(!supportbigint && n > 9007199254740881) return -n1; // not supported if no BigInt
    if(supportbigint && n.toString(16).length > 180) return -n1; // too slow for running inside LogicEmu components
    if(isprime(n)[0]) return n;

    var m = n % n6;
    var step = n2;
    if(m == 0 || m == 1) {
      n -= (m + n1);
      step = n4;
    } else {
      n -= (m - n1);
    }
    for(;;) {
      var p = isprime(n);
      if(p[1]) return -n1; // error
      if(p[0]) return n;
      n -= step;
      step ^= n6; //swap step between 2 and 4
    }
  };
  result.prevprime = prevprime;


  // returns the highest possible exponent if the number is a perfect power (>= 2), or 1 if not.
  // e.g. if n is 8, returns 3 because 2^3 is 8, if n is 10 returns 1.
  var perfectpow = function(n) {
    if(n <= 3) return n1;
    var l2 = log2(n);
    for(var i = l2; i >= 2; i--) {
      var s = introot(n, i)[0];

      if(s ** i == n) return i;
    }

    return n1;
  };
  result.perfectpow = perfectpow;


  var pollard_rho = function(n, c) {
    var count = 0;
    // limit amount of iterations, to avoid slow components in logicemu.
    // the limit is chosen such that a product of two 32-bit primes can still
    // usually be factorized but the total runtime will not take more than a
    // fraction of a second. For lager numbers, the max iteration count is
    // severely reduced because the gcd's take longer in that case.
    var limit = 70000;
    if(n > (2 ** 65)) limit = 1000;
    for(;;) {
      var x = n2;
      var y = n2;
      var d = n1;

      while(d == 1) {
        if(count++ > limit) return n0;
        // Turtle
        x = (x * x + c) % n;
        // Hare
        y = (y * y + c) % n;
        y = (y * y + c) % n;
        d = gcd(x - y, n);
      }

      if(d == n) {
        c++;
        continue;
      }
      return d;
    }
  };

  var firstprimes = [n2, n3, n5, n7, n11, n13, n17];

  // returns smallest prime factor of n, or 0 if factorizing it takes too long.
  // can usually find the product of two 32-bit primes in time.
  // NOTE: factorization is most difficult when n is a product of two different large primes
  var smallestfactor = function(n) {
    if(n < 0) return -n1;
    if(n == 0) return n0;
    if(n == 1) return n1;
    for(var i = 0; i < firstprimes.length; i++) {
      if(n % firstprimes[i] == 0) return firstprimes[i];
    }

    var p = perfectpow(n);
    if(p > n1) return smallestfactor(introot(n, p)[0]);

    p = isprime(n);
    if(p[1]) return n0; // error
    if(p[0]) return n; // prime

    var r = pollard_rho(n, n1);
    if(r == n || r == 1) return r;

    // recursively factor to ensure getting the smallest factor
    var r0 = smallestfactor(r);
    var r1 = smallestfactor(intdiv(n, r));
    return (r0 < r1) ? r0 : r1;
  };
  result.smallestfactor = smallestfactor;

  // returns all prime factors of n
  var factorize = function(n) {
    if(n == 0 || n == 1) return [n];
    var result = [];
    if(n < 0) {
      if(n == -1) return [-n1];
      result = factorize(-n);
      if(result.length == 0) return []; // error
      result.unshift(-n1);
      return result;
    }
    for(var i = 0; i < firstprimes.length; i++) {
      while(!(n % firstprimes[i])) {
        result.push(firstprimes[i]);
        n = intdiv(n, firstprimes[i]);
      }
    }

    if(n == 1) return result;

    var p = perfectpow(n);
    if(p > n1) {
      var f = factorize(introot(n, p)[0]);
      for(var i = 0; i < f.length; i++) {
        for(var j = n0; j < p; j++) {
          result.push(f[i]);
        }
      }
      return result;
    }

    p = isprime(n);
    if(p[1]) return []; // error
    if(p[0]) {
      result.push(n); // prime
      return result;
    }

    var r = pollard_rho(n, n1);
    if(r == 0) return []; // too slow, error

    // recursively factor, each side could have more factors
    var r0 = factorize(r);
    if(r0.length == 0) return []; // error
    var r1 = factorize(intdiv(n, r));
    if(r1.length == 0) return []; // error
    for(var i = 0; i < r0.length; i++) result.push(r0[i]);
    for(var i = 0; i < r1.length; i++) result.push(r1[i]);
    result.sort(function(a, b) { return a < b ? -1 : (a > b ? 1 : 0); });
    return result;
  };
  result.factorize = factorize;

  var factorize2 = function(n) {
    var f = factorize(n);
    var result = [];
    for(var i = 0; i < f.length; i++) {
      var p = f[i];
      var e = n1; // exponent of identical primes
      while(i + 1 < f.length && f[i + 1] == p) {
        e++;
        i++;
      }
      result.push([p, e]);
    }
    return result;
  };
  result.factorize2 = factorize2;

  var allfactors = function(n) {
    var f = factorize2(n);
    if(f.length == 0) return [];

    var result = [n1];
    for(var i = 0; i < f.length; i++) {
      var len2 = result.length;
      var p = f[i][0];
      var e = f[i][1];
      for(var j = 0; j < e; j++) {
        for(var k = 0; k < len2; k++) {
          result.push(result[k] * p);
        }
        p *= f[i][0];
      }
    }
    result.sort(function(a, b) { return a < b ? -1 : (a > b ? 1 : 0); });
    return result;
  };
  result.allfactors = allfactors;

  // returns smallest positive integer r such that a**r = 1 (mod m)
  // this is a special case of discrete log, where b == 1, but computed in a different way
  // TODO: doesn't work for 10007n, 1000000000000000000000007n. Answer should be: 1000000000000000000000006n
  // probable reason: must use not just prime factors, but all unique factors (including non prime ones, but no need to repeat same ones), for f2 at least (for f prime factors is ok)
  var multiplicativeorder = function(a, m) {
    if(m == 0) return -n1;
    if(gcd(a, m) != 1) return n0;
    a = mod(a, m);
    var f = factorize2(m);
    if(f.length == 0) return -n1; // error, too difficult
    var result = n0;
    for(var i = 0; i < f.length; i++) {
      var p = f[i][0];
      var e = f[i][1];
      var m2 = p ** e;
      var t = intdiv(m2, p) * (p - n1);
      var f2 = allfactors(t);
      for(var j = 0; j < f2.length; j++) {
        if(modpow(a, f2[j], m2) == 1) {
          if(!result) result = n1;
          result = lcm(result, f2[j]);
          break;
        }
      }
    }
    return result;
  };
  result.multiplicativeorder = multiplicativeorder;

  // baby-step-giant-step algorithm for discrete log
  var bsgs = function(a, b, m) {
    var n = sqrt(m) + n1;
    var limit = 70000; // limit amount of iterations, to not make logicemu components too slow to compute

    var o = {};
    var e = modpow(a, n, m);
    var an = e;
    for(var i = n1; i <= n; i++) {
      if(i > limit) break;
      var k = e.toString(16);  // JS object keys are strings, by default BigInt converts to decimal string which is much slower.
      if(!o[k]) o[k] = i; // prefer smaller values as result
      e = modmul(e, an, m);
    }
    e = n1;
    var result = n0;
    for(var i = n0; i < n; i++) {
      if(i > limit) {
        if(!result) return -n1;
        break;
      }
      var c = modmul(e, b, m);
      var v = o[c.toString(16)];
      if(v != undefined) {
        var r = v * n - i;
        if(result == 0 || r < result) {
          result = r; // continue instead of immediately returning: try to find smaller result
        }
      }
      e = modmul(e, a, m);
    }
    return result;
  };


  // computes r such that a**r = b (mod m).
  // This problem is of similar computational difficulty as integer factorization.
  // If b is 1, computes multiplicative order: r such that a**r = 1 (mod m)
  // Returns 0 if it's known there is no result, -1 if it failed to compute (took too long)
  var discretelog = function(a, b, m) {
    if(m <= 0)  return -n1;
    var r = (b == 1) ? multiplicativeorder(a, m) : bsgs(a, b, m);

    var test = modpow(a, r, m);
    var test2 = mod(b, m);

    if(r <= 0) return r;
    if(test != test2) {
      return -n1;
    }
    return r;
  };
  result.discretelog = discretelog;

  // Euler's totient function: counts amount of positive integers <= n that are relatively prime to n
  var totient = function(n) {
    if(n == 0 || n == 1) return n;
    var f = factorize2(n);
    if(f.length == []) return -n1; // error
    var r = n;
    for(var i = 0; i < f.length; i++) {
      r -= r / f[i][0];
    }
    return r;
  };
  result.totient = totient;

  var legendre  = function(n, p) {
    return modpow(n, (p - n1) >> n1, p);
  };

  // Tonelli–Shanks algorithm for quadratic residue (square root of n modulo p). p must be prime.
  var ressol = function(n, p) {
    if(p == 2) return n0;
    if (p < 2) return -n1; // error
    n = mod(n, p);
    var q = p - n1;
    var s = n0;
    while((q & n1) == 0) {
      q >>= n1;
      s++;
    }
    if(s == 1) {
      var r = modpow(n, (p + n1) >> n2, p);
      if(mod(r * r, p) != n) return n0;
      return r;
    }

    var nr = n1; // find a non-residue
    for(;;) {
      nr++;
      if(legendre(nr, p) > 1) break; // if legendre symbol is -1
    }

    var c = modpow(nr, q, p);
    var r = modpow(n, (q + n1) >> n1, p);
    var t = modpow(n, q, p);
    var m = s;
    while(t != 1) {
      var tmp = t;
      var i = n0;
      while(tmp != 1) {
        tmp = (tmp * tmp) % p;;
        i++;
        if(i >= m) return n0;
      }
      var b = modpow(c, modpow(n2, m - i - n1, p - n1), p);
      tmp = (b * b) % p;
      r = (r * b) % p;
      t = (t * tmp) % p;;
      c = tmp;
      m = i;
    }

    if ((r * r)% p != n) return n0;
    return r;
  };
  result.ressol = ressol;


  var binomtoobig = supportbigint ? (n1 << B(65536)) : 9007199254740992;

  var binomial = function(n, k) {
    if(k > n) return n0;
    if(n == k || k == 0) return n1;
    if(k * n2 > n) k = n - k;
    var r = n - k + n1;
    for(var i = n2; i <= k; i++) {
      r *= (n - k + i);
      r /= i;
      if(r > binomtoobig) return n0; // bail out
    }
    return r;
  };
  result.binomial = binomial;

  // does not use BigInt, for now
  // uses IEEE rules
  var createfloat = function(sign, exp, mantissa, expbits, mantissabits) {
    if(expbits == 0 && mantissabits == 0) {
      return sign ? -0 : 0;
    }
    var subnormal = (exp == 0);
    var special = (exp == (1 << expbits) - 1);
    if(special) {
      if(sign) return mantissa ? -NaN : -Infinity;
      return mantissa ? NaN : Infinity;
    }
    var bias = (1 << (expbits - 1)) - 1;
    exp -= bias;
    if(subnormal) exp++;
    mantissa /= Math.pow(2, mantissabits);
    if(!subnormal) mantissa += 1;

    var result = mantissa;
    result *= Math.pow(2, exp);
    if(sign) result = -result;
    return result;
  };
  result.createfloat = createfloat;

  // returns [sign, mantissa, exponent] all as unsigned binary integers
  var dissectfloat = function(f, expbits, mantissabits) {
    // NOTE: in the pathalogical case of 3, 2 or 1 bits, we have respectively: SEM, SE, S (where S=sign bit, E=exponent bits, M=mantissa bits). So e.g. the 2-bit case only supports 0, -0, Inf and -Inf.
    if(expbits == 0 && mantissabits == 0) return [(f < 0) ? 1 : 0, 0, 0];
    var sign = 0;
    if(f < 0) {
      f = -f;
      sign = 1;
    }
    var maxexp = (1 << expbits) - 1;
    if(f == Infinity) {
      return [sign, maxexp, 0];
    }
    if(isNaN(f)) {
      return [sign, maxexp, 1];
    }
    if(f == 0) {
      if(1 / f < 0) sign = 1; // for the case of negative zero (-0)
      return [sign, 0, 0];
    }

    var exp = 0;
    while(f >= 2) {
      f /= 2;
      exp++;
    }
    while(f < 1) {
      f *= 2;
      exp--;
    }
    var bias = (1 << (expbits - 1)) - 1;
    exp += bias;
    if(exp < 1) {
      // subnormal number
      var mantissa = Math.floor(f * Math.pow(2, mantissabits + exp - 1));
      return [sign, 0, mantissa];
    }
    if(exp >= maxexp) {
      // overflow, return infinity
      return [sign, maxexp, 0];
    }
    var mantissa = Math.floor((f - 1) * Math.pow(2, mantissabits));
    return [sign, exp, mantissa];
  };
  result.dissectfloat = dissectfloat;

  // approximation of gamma function, for floating point input
  var gamma = function(x) {
    if(x <= 0 && x == Math.round(x)) return Infinity;
    if(x > 200) return Infinity;
    if(x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
    var p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    x -= 1;
    var y = p[0];
    for(var i = 1; i < 7 + 2; i++) {
      y += p[i] / (x + i);
    }
    var t = x + 7 + 0.5;
    return Math.sqrt(Math.PI * 2) * Math.pow(t, x + 0.5) * Math.exp(-t) * y;
  };
  result.gamma = gamma;

  var loggamma = function(x) {
    if(x < 0) {
      if(x == Math.floor(x)) return Infinity;
      var l = Math.log(Math.PI / Math.abs((Math.sin(Math.PI * x))));
      return l - loggamma(1 - x);
    }
    if(x == 1 || x == 2) return 0;
    if(x == Infinity) return Infinity;
    if(x == -Infinity) return NaN;
    if(x > -20 && x < 20) return Math.log(Math.abs(gamma(x)));

    // stirling series
    var x3 = x * x * x;
    var x5 = x3 * x * x;
    var x7 = x5 * x * x;
    var x9 = x7 * x * x;
    var result = 0.918938533204672669540968854562; //0.5 * ln(2pi)
    result += (x - 0.5) * Math.log(x) - x + 1.0 / (x * 12) -1.0 / (x3 * 360) + 1.0 / (x5 * 1260) - 1.0 / (x7 * 1680) + 1.0 / (x9 * 1188);
    return result;
  };
  result.loggamma = loggamma;

  // approximation of Lamber's W function (principal branch, for real values above -1/e), for floating point input
  var lambertw = function(x) {
    if(isNaN(x)) return NaN;
    if(x == Infinity || x == -Infinity) return Infinity;

    if(x >= -1.0 / Math.E && x <= 703) {
      //Newton's method. Only works up to 703
      var wj = x < 10 ? 0 : Math.log(x) - Math.log(Math.log(x)); // Without good starting value, it requires hundreds of iterations rather than just 30.
      var num = Math.max(30, x > 0 ? 10 + Math.floor(x) : 30);
      for(var i = 0; i < num; i++) {
        var ew = Math.exp(wj);
        wj = wj - ((wj * ew - x) / (ew + wj * ew));
      }
      return wj;
    } else if (x > 0) {
      var step = 1;
      var lastDir = 0;
      var result = Math.log(x) - Math.log(Math.log(x)); // good starting value speeds up iterations. E.g. only 76 instead of 292 for 7e100.
      for(;;) {
        if(step == 0 || step * 0.5 == step || result + step == result) return result; //avoid infinite loop
        var v = result * Math.exp(result);
        if(Math.abs(v - x) <= 1e-15) return result;
        if(v > x) {
          result -= step;
          if(lastDir == -1) step *= 0.5;
          lastDir = 1;
        } else {
          result += step;
          if(lastDir == 1) step *= 0.5;
          lastDir = -1;
        }
      }
    }
    return NaN;
  };
  result.lambertw = lambertw;

  // Faddeeva function: w(z) = exp(-z^2)*erfc(-iz)
  var faddeeva = function(x, y) {
    var invsqrtpi2   = 2 / Math.sqrt(Math.PI);
    var cexp = function(x, y) {
      var e = Math.exp(x);
      return [e * Math.cos(y), e * Math.sin(y)];
    };
    var cmul = function(a, b, c, d) {
      return [a * c - b * d, a * d + b * c];
    };
    var cinv = function(x, y) {
      var d = x * x + y * y;
      return [x / d, -y / d];
    };
    var rho2 = (x / 6.3 * x / 6.3) + (y / 4.4 * y / 4.4);
    if(y < 0 && rho2 >= 0.292 * 0.292) {
      if(x == 0 && y < -26.64) return [Infinity, 0];
      var e = cexp(y * y - x * x, -2 * x * y);
      var f = R.faddeeva(-x, -y);
      return [2 * e[0] - f[0], 2 * e[1] - f[1]];
    }
    var result = [0, 0];
    if(rho2 < 0.292 * 0.292) {
      var s = (1 - 0.85 * y / 4.4) * Math.sqrt(rho2);
      var n = Math.ceil(6 + 72 * s);
      var kk = 1;
      var zz = [y * y - x * x, -2 * x * y];
      var t = [y, -x];
      for(var k = 0; k < n; k++) {
        if(k > 0) {
          kk *= -k;
          t = cmul(t[0], t[1], zz[0], zz[1]);
        }
        result[0] += t[0] / (kk * (2 * k + 1));
        result[1] += t[1] / (kk * (2 * k + 1));
      }
      var e = cexp(zz[0], zz[1]);
      result = cmul(e[0], e[1], result[0], result[1]);
      result[0] = e[0] - result[0] * invsqrtpi2;
      result[1] = e[1] - result[1] * invsqrtpi2;
    } else if(rho2 < 1.0) {
      var s = (1 - y / 4.4) * Math.sqrt(1 - rho2);
      var nu = Math.ceil(16 + 26 * s) + 1;
      var n = Math.ceil(7  + 34 * s) + 1;
      var h = 1.88 * s;

      var w = [0, 0];
      for (var k = nu; k > n; k--) {
        w = cinv(2 * (y + k * w[0] + h), 2 * (k * w[1] - x));
      }
      var hh = Math.pow(h * 2, n - 1);
      for (var k = n; k > 0; k--) {
        w = cinv(2 * (y + k * w[0] + h), 2 * (k * w[1] - x));
        result = cmul(result[0] + hh, result[1], w[0], w[1]);
        hh /= (h * 2);
      }
      result[0] *= invsqrtpi2;
      result[1] *= invsqrtpi2;
    } else {
      var nu = Math.ceil(3 + (1442 / (26 * Math.sqrt(rho2) + 77))) + 1;
      for (var k = nu; k > 0; k--) {
        result = cinv(2 * (y + k * result[0]), 2 * (k * result[1] - x));
      }
      result[0] *= invsqrtpi2;
      result[1] *= invsqrtpi2;
    }

    if(x == 0) result[1] = 0;
    if(y == 0) result[0] = Math.exp(-x * x);
    return result;
  };

  var erf = function(x, y) {
    var a = Math.exp(-x * x);
    if(x >= 0) return 1 - a * faddeeva(0, x)[0];
    else return a * faddeeva(0, -x)[0] - 1;
  };
  result.erf = erf;

  var erfc = function(x, y) {
    var a = Math.exp(-x * x);
    if(x >= 0) return a * faddeeva(0, x)[0];
    else return 2 - a * faddeeva(0, -x)[0];
  };
  result.erfc = erfc;

  var besselj = function(n, x) {
    if(n < 0 && Math.floor(n) == n) {
      return (n & 1) ? -besselj(-n, x) : besselj(-n, x);
    }
    if(x == 0) return n == 0 ? 1 : ((n > 0 || Math.floor(n) == n) ? 0 : Infinity);
    if(n == -0.5) return Math.sqrt(2 / (Math.PI * x)) * Math.cos(x);
    if(n == 0.5) return Math.sqrt(2 / (Math.PI * x)) * Math.sin(x);
    // For 0 and 1, provide implementation that supports large |x| as well
    if((n == 0 || n == 1) && Math.abs(x) > 12) {
      var a = (n == 0) ? [-0.703125e-1, 0.112152099609375, -0.5725014209747314, 0.6074042001273483, -0.1100171402692467e3, 0.03038090510922384e4, -0.1188384262567832e6, 0.06252951493434797e7, -0.4259392165047669e9, 0.03646840080706556e11, -0.3833534661393944e13, 0.04854014686852901e15] : [0.1171875,-0.144195556640625, 0.6765925884246826,-0.6883914268109947e1, 0.1215978918765359e3, -0.3302272294480852e4, 0.1276412726461746e6, -0.6656367718817688e7, 0.4502786003050393e9, -0.3833857520742790e11, 0.4011838599133198e13, -0.5060568503314727e15];
      var b = (n == 0) ? [0.732421875e-1, -0.2271080017089844, 0.1727727502584457e1, -0.2438052969955606e2, 0.5513358961220206e3, -0.1825775547429318e5, 0.8328593040162893e6, -0.5006958953198893e8, 0.3836255180230433e10, -0.3649010818849833e12, 0.4218971570284096e14, -0.5827244631566907e16] : [-0.1025390625,0.2775764465332031, -0.1993531733751297e1,0.2724882731126854e2, -0.6038440767050702e3, 0.1971837591223663e5, -0.8902978767070678e6, 0.5310411010968522e8, -0.4043620325107754e10, 0.3827011346598605e12, -0.4406481417852278e14, 0.6065091351222699e16];
      var ca = 1, cb = ((n == 0 ? -0.125 : 0.375) / x);
      var xx = 1;
      for(var k = 0; k < 12; k++) {
        xx /= x * x;
        ca += xx * a[k];
        cb += xx / x * b[k];
      }
      var p = x - (Math.PI * (n == 0 ? 0.25 : 0.75));
      return Math.sqrt(1 / (x * (Math.PI / 2))) * (ca * (Math.cos(p)) - (cb * (Math.sin(p))));
    }
    // series for others
    var r = 1;
    var e = 1;
    var s = -x * x / 4;
    var maxit = 50;
    for(var i = 1; i <= maxit; i++) {
      e *= s / (i * (n + i));
      if((i == maxit && Math.abs(e) < 1e-15) || e == 0) {
        return r * Math.pow(x, n) / (Math.pow(2, n) * gamma(n + 1));
      }
      r += e;
    }
    // The series did not have enough numerical precision to converge. Return NaN.
    // Implementing alternative algorithms for large values of x is too much code to be worth it in this logic simulator.
    return NaN;
  };
  result.besselj = besselj;

  return result;
}());

var math = LogicEmuMath;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var maindiv = undefined;

/*
UPDATE_ALGORITHM values:
0: "scanline": Components updated in scanline order and could read inputs from sometimes already-updated, some not-yet-updated components. This has problems such as shape of circuit affects result, so is only included for completeness, not used.
1: "fast recursive": components recursively update their inputs before themselves, for faster propagation. This breaks JK flipflops, round-and-round blinking led loops and most other things with loops.
This algorithm is good for immediate perfect full update in a single tick of final outputs based on user niputs in an asynchronic circuit like a 16-bit adder or multiplier, without any clocks, flipflops or loops
2: "slow": components only update based on the value of its inputs at the previous tick. This can break flipflops, the balance is so perfect that some flipflops can never flip to one state
This algorithm allows the "on" led in the roundabout circuit to travel around circularly, always 1 led is on
3: "twiddled slow": like slow, but with some random probability (customizable, e.g. 10%), a gate does not update [or alternatively uses the previous-previous instead of just previous as input.] This may randomly fix some metastable flipflops..
*/
var UPDATE_ALGORITHM = 2;

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

var graphics_mode = 0; // 1=canvas, 0=text, 2=source
var graphics_mode_actual = graphics_mode;

var worldstartheight = 160; // under menu

var worldDiv = makeDiv(10, worldstartheight, 0, 0, maindiv);
//worldDiv2 is used for the kindiv of kinetic components, but can be used for anything that should be an overlay where clicking on elements does not trigger the onclick of worlddiv (which always activates before children)
var worldDiv2 = makeDiv(10, worldstartheight, 0, 0, maindiv);
var renderingMessageDiv = makeDiv(10, worldstartheight, 0, 0);

// num active ticks done
var numticks = 0;

// num ticks from the viewpoint of timer (includes ticks that were never rendered or computed)
var timerticks = 0;

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
var TYPE_FIXED = TYPE_index++; // uses f and F like constant, but version that outputs a binary value from decimal number in circuit
var TYPE_DELAY = TYPE_index++;
var TYPE_ROM = TYPE_index++;
var TYPE_MUX = TYPE_index++;
var TYPE_ALU = TYPE_index++;
var TYPE_IC = TYPE_index++; // also called "sub"
var TYPE_IC_PASSTHROUGH = TYPE_index++; // the internal implicit input/output switches/LEDs of ICs get internally converted into this. Behaves like OR, but will have always only 1 input. Will be removed from the circuit flow in a next parsing stage to avoid delays.
var TYPE_VTE = TYPE_index++;
var TYPE_DOTMATRIX = TYPE_index++;
var TYPE_TRISTATE = TYPE_index++;
var TYPE_TRISTATE_INV = TYPE_index++;
var TYPE_RANDOM = TYPE_index++;
var TYPE_MUSIC_NOTE = TYPE_index++; // music, speaker, sound, audio, jukebox. type_note type_musicnote
var TYPE_JACK = TYPE_index++; // jack for patch cables
var TYPE_TOC = TYPE_index++; // table of contents, a type of comment
var TYPE_KINETIC = TYPE_index++;

// number types (higher value/nearer to bottom = higher priority) [numbertype number_type number priority number order numbers priority numbers order]
var NUMBER_index = 0;
var NUMBER_NONE = NUMBER_index++;
var NUMBER_FIXED = NUMBER_index++; // very low priority, to ensure f and F can be used standalone when desired
var NUMBER_LED = NUMBER_index++;
var NUMBER_TIMER = NUMBER_index++;
var NUMBER_PULSE = NUMBER_index++;
var NUMBER_NOTE = NUMBER_index++;
var NUMBER_ROM = NUMBER_index++;
var NUMBER_ALU = NUMBER_index++;
var NUMBER_VTE = NUMBER_index++;
var NUMBER_KINETIC = NUMBER_index++;
var NUMBER_ICCALL = NUMBER_index++;
var NUMBER_ICDEF = NUMBER_index++;
var NUMBER_GLOBAL = NUMBER_index++; // for global wire g
var NUMBER_BUS = NUMBER_index++;
var NUMBER_ANTENNA = NUMBER_index++; // for antenna wrap
var NUMBER_COMMENT = NUMBER_index++;


/*
How things like ROM, VTE and FLIPFLOP are parsed: each of their cells are seen as individual components rather than one whole, because we support only 1 output per component, but
each of these things can have multiple different outputs. Then at a later stage a class implementation for the FF, ROM or VTE is instantiated, and those loose components are
connected together with a "parent".
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
typesymbols[TYPE_MUSIC_NOTE] = 'N'; typesymbols[TYPE_JACK] = 'J'; typesymbols[TYPE_KINETIC] = 'K';


var devicemap = {'a':true, 'A':true, 'o':true, 'O':true, 'e':true, 'E':true, 'h':true, 'H':true, 'f':true, 'F':true,
                 's':true, 'S':true, 'l':true, 'r':true, 'R':true, 'p':true, 'P':true,
                 'j':true, 'k':true, 'd':true, 't':true, 'q':true, 'Q':true, 'c':true, 'C':true, 'y':true,
                 'b':true, 'B':true, 'M':true, 'U':true, 'i':true, 'T':true, 'D':true, 'z':true, 'Z':true,
                 '?':true, 'N':true, 'J':true, 'K':true};
// all "large" devices with slightly different parsing rules, where different cells can be different types of inputs/outputs
// the "start" cells allow starting the parsing there. The extra ones can only be used once having started from one of the others
// characters NOT included here but that can be part of large device once parsing: 'c' (can be standalone gate), '#', digits
// WORK IN PROGRESS
var largedevicestartmap = {'j':true, 'k':true, 'd':true, 't':true, 'q':true, 'Q':true, 'y':true,
                      'b':true, 'B':true, 'M':true, 'U':true, 'i':true, 'T':true, 'D':true, 'N':true};
var largedevicemap = util.mergeMaps(largedevicestartmap, {'c':true, 'C':true});
var largeextendmap = {'#i':true, '#c':true, '#f':true, '#b':true, '#M':true, '#U':true, '#T':true, '#D':true, '#N':true}; // special extenders for large devices (not all of those are used yet)
var extendmap = util.mergeMaps(largeextendmap, {'#':true});
// devicemap as well as # (with extends devices)
var devicemaparea = util.mergeMaps(devicemap, largeextendmap); devicemaparea['#'] = true;
var largemaparea = util.mergeMaps(largedevicemap, largeextendmap);
var ffmap = {'j':true, 'k':true, 'd':true, 't':true, 'q':true, 'Q':true, 'c':true, 'C':true, 'y':true};
var specialmap = {'q':true, 'Q':true, 'c':true, 'C':true, 'y':true}; // these can serve as special inputs for large devices: cells which are normally from flip-flop, but can also instead be special input-cells of other large devices
var rommap = {'b':true, 'B':true};
var inputmap = {'^':true, '>':true, 'v':true, '<':true, 'm':true, ']':true, 'w':true, '[':true, 'V':true, 'W':true, 'X':true, 'Y':true};
var dinputmap = {'^':true, '>':true, 'v':true, '<':true, 'm':true, ']':true, 'w':true, '[':true}; // directional inputs only
var wiremap = {'-':true, '|':true, '+':true, '.':true, '/':true, '\\':true, 'x':true, 'g':true, '=':true, ',':true, '%':true, '&':true, '*':true, '(':true, ')':true, 'n':true, 'u':true};
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
                'z':true, 'Z':true, '?':true, 'N':true, 'J':true, 'K':true, 'toc':true,
                '#i':true, '#c':true, '#f':true, '#b':true, '#M':true, '#U':true, '#T':true, '#D':true, '#N':true};
var digitmap = {'0':true, '1':true, '2':true, '3':true, '4':true, '5':true, '6':true, '7':true, '8':true, '9':true, '$':true};
var puredigitmap = {'0':true, '1':true, '2':true, '3':true, '4':true, '5':true, '6':true, '7':true, '8':true, '9':true};

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
  this.externalinputs = []; // filled in by parseICTemplates, array of [x, y] pairs
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
      if(v.defsubindex != id) continue; // the input components is in fact those of the entire world... so filter out for only ours
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
        else if(x + 1 < w && y > 0 && world[y - 1][x + 1].circuitsymbol == 'X') dir = 6;
        else if(x + 1 < w && y + 1 < h && world[y + 1][x + 1].circuitsymbol == 'X') dir = 7;
        else if(x > 0 && y + 1 < h && world[y + 1][x - 1].circuitsymbol == 'X') dir = 4;
        else if(x > 0 && y > 0 && world[y - 1][x - 1].circuitsymbol == 'X') dir = 5;
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
      // collect all cells of the switch in array
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

      // find connected wire to this switch to get its direction for the input direction
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
      // the sort order for the different directions is rotation invariant, to support rotated chips
      // the sort order must match that of CallSub's sort order
      if(a[1] == 0) return a[2] - b[2];
      if(a[1] == 1) return a[3] - b[3];
      if(a[1] == 2) return b[2] - a[2];
      if(a[1] == 3) return b[3] - a[3];
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
      component.inputs_negated = util.cloneArray(v.inputs_negated);
      component.inputs_x = util.cloneArray(v.inputs_x);
      component.inputs_y = util.cloneArray(v.inputs_y);
      component.inputs_x2 = util.cloneArray(v.inputs_x2);
      component.inputs_y2 = util.cloneArray(v.inputs_y2);
      component.input_ff_types = util.cloneArray(v.input_ff_types);
      component.cells = v.cells;
      component.corecell = v.corecell;
      component.updated = v.updated;
      component.error = v.error;
      component.errormessage = v.errormessage;
      component.previnputs = util.clone(v.previnputs);
      component.ff_cycle = v.ff_cycle;
      component.ff_cycle_time = v.ff_cycle_time;
      component.parent = null; // handled further
      component.fixed = null; // handled further
      component.rom = null; // handled further
      component.mux = null; // handled further
      component.vte = null; // handled further
      component.musicnote = null; // handled further
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
      if(v.parent) {
        component.parent = this.components[defsub.translateindex[v.parent.index]];
      }
      if(v.fixed) {
        var fixed = new Fixed();
        component.fixed = fixed;
        fixed.x0 = v.fixed.x0;
        fixed.y0 = v.fixed.y0;
        fixed.x1 = v.fixed.x1;
        fixed.y1 = v.fixed.y1;
        fixed.inverted = v.fixed.fixed;
        fixed.value = v.fixed.value;
        fixed.output = util.clone(v.fixed.output);
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
        rom.parent = component;
        rom.error = v.rom.error;
        rom.errormessage = v.rom.errormessage;
        rom.addressdir = v.rom.addressdir;
        rom.wordshor = v.rom.wordshor;
        rom.outdir = v.rom.outdir;
        rom.selected = util.clone(v.rom.selected);
        rom.num_address_inputs = v.rom.num_address_inputs;
        rom.ram = v.rom.ram;
        rom.has_enable = v.rom.has_enable;
        //rom.has_set_all = v.rom.has_set_all;
        rom.has_reset_all = v.rom.has_reset_all;
        rom.has_outputenable = v.rom.has_outputenable;
        rom.has_outputenabled = v.rom.has_outputenabled;
        rom.decoder = v.rom.decoder;
        rom.encoder = v.rom.encoder;
        rom.bits = util.clone(v.rom.bits);
        rom.bits_inv = util.clone(v.rom.bits_inv);
        rom.lines = util.clone(v.rom.lines);
        rom.lines_inv = util.clone(v.rom.lines_inv);
      }
      if(v.mux) {
        var mux = new Mux();
        component.mux = mux;
        mux.parent = component;
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
        vte.numinputs2 = v.vte.numinputs2;
        vte.numinputs3 = v.vte.numinputs3;
        vte.numoutputs = v.vte.numoutputs;
        vte.numoutputs2 = v.vte.numoutputs2;
        vte.numoutputs3 = v.vte.numoutputs3;
        vte.numwrite = v.vte.numwrite;
        vte.has_enable = v.vte.has_enable;
        vte.has_read = v.vte.has_read;
        vte.has_write = v.vte.has_write;
        vte.has_up = v.vte.has_up;
        vte.has_down = v.vte.has_down;
        vte.has_set = v.vte.has_set;
        vte.has_reset = v.vte.has_reset;
        vte.cursorx = v.vte.cursorx;
        vte.cursory = v.vte.cursory;
        vte.prevwrite = v.vte.prevwrite;
        vte.prevread = v.vte.prevread;
        vte.output = util.clone(v.vte.output);
        vte.decimaldisplay = v.vte.decimaldisplay;
        vte.signeddisplay = v.vte.signeddisplay;
        vte.floatdisplay = v.vte.floatdisplay;
        vte.passthrough = v.vte.passthrough;
        vte.decimalinput = v.vte.decimalinput;
        vte.counter = v.vte.counter;
        vte.countervalue = v.vte.countervalue;
        vte.previnput = util.clone(v.vte.previnput);
        vte.keybuffer = util.clone(v.vte.keybuffer);
        vte.invisible = true;
        vte.error = v.vte.error;
        vte.errormessage = v.vte.errormessage;
      }
      if(v.alu) {
        var alu = new Alu();
        component.alu = alu;
        alu.parent = component;
        alu.error = v.alu.error;
        alu.errormessage = v.alu.errormessage;
        alu.adir = v.alu.adir;
        alu.alsbpos = v.alu.alsbpos;
        alu.numa = v.alu.numa;
        alu.numa_mant = v.alu.numa_mant;
        alu.numa_exp = v.alu.numa_exp;
        alu.numa_sign = v.alu.numa_sign;
        alu.bdir = v.alu.bdir;
        alu.blsbpos = v.alu.blsbpos;
        alu.numb = v.alu.numb;
        alu.numb_mant = v.alu.numb_mant;
        alu.numb_exp = v.alu.numb_exp;
        alu.numb_sign = v.alu.numb_sign;
        alu.cdir = v.alu.cdir;
        alu.clsbpos = v.alu.clsbpos;
        alu.numc = v.alu.numc;
        alu.numc_mant = v.alu.numc_mant;
        alu.numc_exp = v.alu.numc_exp;
        alu.numc_sign = v.alu.numc_sign;
        alu.odir = v.alu.odir;
        alu.olsbpos = v.alu.olsbpos;
        alu.numo = v.alu.numo;
        alu.numo_mant = v.alu.numo_mant;
        alu.numo_exp = v.alu.numo_exp;
        alu.numo_sign = v.alu.numo_sign;
        alu.miscindir = v.alu.miscindir;
        alu.miscoutdir = v.alu.miscoutdir;
        alu.miscinlsbpos = v.alu.miscinlsbpos;
        alu.miscoutlsbpos = v.alu.miscoutlsbpos;
        alu.nummiscin = v.alu.nummiscin;
        alu.nummiscout = v.alu.nummiscout;
        alu.selectdir = v.alu.selectdir;
        alu.selectlsbpos = v.alu.selectlsbpos;
        alu.numselect = v.alu.numselect;
        alu.output = util.clone(v.alu.output);
        alu.opindex = v.alu.opindex;
        alu.signed = v.alu.signed;
        alu.floating = v.alu.floating;
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
      if(v.musicnote) {
        var musicnote = new MusicNote();
        component.musicnote = musicnote;
        musicnote.x0 = v.musicnote.x0;
        musicnote.y0 = v.musicnote.y0;
        musicnote.x1 = v.musicnote.x1;
        musicnote.y1 = v.musicnote.y1;
        musicnote.has_enable = v.musicnote.has_enable;
        musicnote.numvolinputs = v.musicnote.numvolinputs;
        musicnote.numfreqinputs = v.musicnote.numfreqinputs;
        musicnote.numshapeinputs = v.musicnote.numshapeinputs;
        musicnote.basefrequency = v.musicnote.basefrequency;
        musicnote.baseshape = v.musicnote.baseshape;
        musicnote.basevolume = v.musicnote.basevolume;
        musicnote.error = v.musicnote.error;
        musicnote.errormessage = v.musicnote.errormessage;
        musicnote.output = v.musicnote.output;
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
      // note: j is the z index of the cell, which is used for the direction in the case of ICs
      for(var j = 0; j < cell.components.length; j++) {
        var component = cell.components[j];
        if(parent && component) {
          component = parent.components[parent.defsub.translateindex[component.index]];
        }
        if(component) {
          if(!this.parent) {
            this.parent = component;
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
    // chipdir -1 means same as template.
    if(this.chipdir >= 0) dirdiff = ((this.defsub.chipdir - this.chipdir) & 3);

    var sortfun = function(a, b) {
      if(a[1] != b[1]) {
        // virtual dirs (based on chip rotation vs template)
        var avdir = (a[1] & 4) | ((a[1] + dirdiff) & 3);
        var bvdir = (b[1] & 4) | ((b[1] + dirdiff) & 3);
        if(avdir < bvdir) return -1;
        if(avdir > bvdir) return 1;
      }
      // the sort order for the different directions is rotation invariant, to support rotated chips
      // the sort order must match that of DefSub's sort order
      if(a[1] == 0) return a[2] - b[2];
      if(a[1] == 1) return a[3] - b[3];
      if(a[1] == 2) return b[2] - a[2];
      if(a[1] == 3) return b[3] - a[3];
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

    // connect external inputs to our internal components. So our inputs from a sub-level, will read from a higher level,
    // while the higher level thinks it's outputting to the 'i' instead of our own components
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
      ioutput.type = TYPE_IC_PASSTHROUGH;
    }
  };
}

function newOrder(array, order) {
  var result = [];
  for(var i = 0; i < array.length; i++) result[i] = array[order[i]];
  for(var i = 0; i < array.length; i++) array[i] = result[i];
}

function newOrderInputs(component, order) {
  if(order.length != component.inputs.length) return false;  // must use *all* inputs for newOrderInputs
  newOrder(component.inputs, order);
  newOrder(component.inputs_negated, order);
  newOrder(component.inputs_x, order);
  newOrder(component.inputs_y, order);
  newOrder(component.inputs_x2, order);
  newOrder(component.inputs_y2, order);
  return true;
}

// returns the direction from which a device input is coming, with x,y the position of the input symbol (<,v, ...) and x2,y2 the position of the device cell this goes to
// in other words, returns the direction to go from x2,y2 towards x,y
// return value is dir: 0=N, 1=E, 2=S, 3=W ; 4=NE, 5=SE, 6=SW, 7=NW
function getInputDir(x, y, x2, y2) {
  if(x == x2 && y < y2) return 0;
  if(y == y2 && x > x2) return 1;
  if(x == x2 && y > y2) return 2;
  if(y == y2 && x < x2) return 3;
  if(x > x2 && y < y2) return 4;
  if(x > x2 && y > y2) return 5;
  if(x < x2 && y > y2) return 6;
  if(x < x2 && y < y2) return 7;
  return -1; // invalid, same pos
}

/*
returns object {} with following fields:
i[0]: inputs for north side. {n:num, a:[array], ai:[array], ng:numgroups, ga:[groups], ai:array, nspecial}
    array a has form [[x,y,v,p,i], ...]. Here:
      v is computed from x or y component as distance from: i[0]:left, i[1]:top, i[2]:right, i[3]:bottom, o[0]:right, o[1]:bottom, o[2]:left, o[3]:top
      --> note: the LSB sides are rotationally invariant, and the order is reversed for input and output because if you have LSB on one side on an input, then for an output on the opposing side, the LSB should be on the same side on screen.
      p is x for N/S, y for E/W
      i is index of this input in the given component, and is only present for inputs, not for outputs
    ai is array that matches the i values from a, and is only present for inputs, not for outputs
    ga (groups) is array of {n:num, f:[x,y,v,p,i], l:[x,y,v,p,i], d:[x,y,v,p], dn:[x,y,v,p], ai:[array]} with:
      f = first
      l = last (*inclusive*!)
      first and last are in the same order as described for "v" in array and the order of array a.
      d: each value is 0, 1 or -1: how to increment each field of f to reach l.
      dn: negated version of d: for reaching f from l, to go from MSB to LSB instead
      ai is array of indices of this input in the given component, and is only present for inputs, not for outputs
      nspecial: amount of special inputs/outputs matching the direction of this side. Doesn't have to actually touch this side, but same incoming direction to the device as a regular input going to this side. Special input = y, q, Q, c or C.
    A group is a consecutive streak of inputs.
    num == a.length, numgroups == ga.length
    arrays are sorted in the order of the v value. Note that this means inputs and outputs are sorted in reverse order. LSB is first clockwise for inputs, counterclockwise for outputs.
i[1]: idem for east side
i[2]: idem for south side
i[3]: idem for west side
o[0]: outputs for north side. same format as ni.
o[1]: idem for east side
o[2]: idem for south side
o[3]: idem for west side
iy: special inputs of type 'y'. {n:num, a:array, ai:array}, array a is of [x,y,d,i], array ai is as above
    here the array fields are: x,y,i: as for i[0] etc..., d: direction this input comes from (0=N, 1=E, 2=S, 3=W ; 4=NE, 5=SE, 6=SW, 7=NW)
ic, iC, iq, iQ: idem for inputs of type 'c', 'C', 'q', 'Q'
oy: special outputs of type 'y'. similar to iy, but witout input-only fields such as ai
oc, oC, oq, oQ: idem for outputs of type 'c', 'C', 'q', 'Q'
ispecial: array with pointers to [iy, ic, iC, iq, iQ] in that order
ni: total amount of non-special inputs
no: total amount of outputs
nispecial: amount of special inputs
nospecial: amount of special outputs
nig: total amount of input groups (non-special)
nog: total amount of output groups (non-special)
nis: total amount of input sides (including mixed input/output, excluding special)
nos: total amount of output sides (including mixed input/output, excluding special)
nes: total amount of empty sides (no inputs or outputs, ignoring special)
niis: total amount of input-only sides (ignoring special)
noos: total amount of output-only sides (ignoring special)
nios: total amount of mixed sides (inputs and outputs, ignoring special)

The given device is of type LargeDevice.
For the side-inputs/outputs, only supports rectangular shape (where y, c, C, q and Q may deviate from the rectangular shape)
Does not support diagonal inputs, so not useable for ICs.
The inputs appear in following order:
for n/e/s/w inputs: for N right to left, E: bottom to top, S: left to right, W: top to bottom
for n/e/s/w outputs: for N left to right, E: top to bottom, S: right to left, W: bottom to top

The sides to use to detect inputs/outputs are given by x0, y0, x1, y1
The values x0s, y0s, x1s, y1s are used for an additional extra check for special inputs. These values can be the same as x0, y0, x1, y1 (in that case nothing more is done), or possibly 1 larger on one or more sides. See getIO for info.
*/
function getIO(x0, y0, x1, y1, x0s, y0s, x1s, y1s, component) {
  var r = {};
  r.i = [];
  r.o = [];
  r.i[0] = {n:0, a:[], ng:0, ga:[], ai:[], nspecial:0};
  r.i[1] = {n:0, a:[], ng:0, ga:[], ai:[], nspecial:0};
  r.i[2] = {n:0, a:[], ng:0, ga:[], ai:[], nspecial:0};
  r.i[3] = {n:0, a:[], ng:0, ga:[], ai:[], nspecial:0};
  r.o[0] = {n:0, a:[], ng:0, ga:[], nspecial:0};
  r.o[1] = {n:0, a:[], ng:0, ga:[], nspecial:0};
  r.o[2] = {n:0, a:[], ng:0, ga:[], nspecial:0};
  r.o[3] = {n:0, a:[], ng:0, ga:[], nspecial:0};
  r.iy = {n:0, a:[], ai:[]};
  r.ic = {n:0, a:[], ai:[]};
  r.iC = {n:0, a:[], ai:[]};
  r.iq = {n:0, a:[], ai:[]};
  r.iQ = {n:0, a:[], ai:[]};
  r.oy = {n:0, a:[]};
  r.oc = {n:0, a:[]};
  r.oC = {n:0, a:[]};
  r.oq = {n:0, a:[]};
  r.oQ = {n:0, a:[]};
  r.nispecial = 0;
  r.nospecial = 0;

  for(var i = 0; i < component.inputs.length; i++) {
    var x = component.inputs_x[i];
    var y = component.inputs_y[i];
    var x2 = component.inputs_x2[i];
    var y2 = component.inputs_y2[i];
    var c = world[y2][x2].circuitsymbol;
    if(c == 'y') {
      var d = getInputDir(x, y, x2, y2);
      r.iy.n++;
      r.iy.a.push([x2, y2, d, i]);
      r.iy.ai.push(i);
      if(d >= 0 && d < 4) r.i[d].nspecial++;
      r.nispecial++;
    } else if(c == 'c') {
      var d = getInputDir(x, y, x2, y2);
      r.ic.n++;
      r.ic.a.push([x2, y2, d, i]);
      r.ic.ai.push(i);
      if(d >= 0 && d < 4) r.i[d].nspecial++;
      r.nispecial++;
    } else if(c == 'C') {
      var d = getInputDir(x, y, x2, y2);
      r.iC.n++;
      r.iC.a.push([x2, y2, d, i]);
      r.iC.ai.push(i);
      if(d >= 0 && d < 4) r.i[d].nspecial++;
      r.nispecial++;
    } else if(c == 'q') {
      var d = getInputDir(x, y, x2, y2);
      r.iq.n++;
      r.iq.a.push([x2, y2, d, i]);
      r.iq.ai.push(i);
      if(d >= 0 && d < 4) r.i[d].nspecial++;
      r.nispecial++;
    } else if(c == 'Q') {
      var d = getInputDir(x, y, x2, y2);
      r.iQ.n++;
      r.iQ.a.push([x2, y2, d, i]);
      r.iQ.ai.push(i);
      if(d >= 0 && d < 4) r.i[d].nspecial++;
      r.nispecial++;
    } else if(y == y0 - 1) {
      r.i[0].n++;
      r.i[0].a.push([x2, y2, x2 - x0, x2, i]);
      r.i[0].ai.push(i);
    } else if(x == x1) {
      r.i[1].n++;
      r.i[1].a.push([x2, y2, y2 - y0, y2, i]);
      r.i[1].ai.push(i);
    } else if(y == y1) {
      r.i[2].n++;
      r.i[2].a.push([x2, y2, x1 - x2 - 1, x2, i]);
      r.i[2].ai.push(i);
    } else if(x == x0 - 1) {
      r.i[3].n++;
      r.i[3].a.push([x2, y2, y1 - y2 - 1, y2, i]);
      r.i[3].ai.push(i);
    } else {
      return null; // some non-special input is not on the rectangle boundary
    }
  }

  // d = dir, x,y,v,p are the 4 array elements as explained above
  var addOutput = function(d, x, y, v, p, special_only) {
    var c = world[y][x].circuitsymbol;
    if(c == 'y') {
      r.oy.n++;
      r.oy.a.push([x, y, d]);
      if(d >= 0 && d < 4) r.o[d].nspecial++;
      r.nospecial++;
    } else if(c == 'c') {
      r.oc.n++;
      r.oc.a.push([x, y, d]);
      if(d >= 0 && d < 4) r.o[d].nspecial++;
      r.nospecial++;
    } else if(c == 'C') {
      r.oC.n++;
      r.oC.a.push([x, y, d]);
      if(d >= 0 && d < 4) r.o[d].nspecial++;
      r.nospecial++;
    } else if(c == 'q') {
      r.oq.n++;
      r.oq.a.push([x, y, d]);
      if(d >= 0 && d < 4) r.o[d].nspecial++;
      r.nospecial++;
    } else if(c == 'Q') {
      r.oQ.n++;
      r.oQ.a.push([x, y, d]);
      if(d >= 0 && d < 4) r.o[d].nspecial++;
      r.nospecial++;
    } else {
      if(special_only) return null; // shouldn't put a regular output on an edge that's only for special outputs
      r.o[d].n++;
      r.o[d].a.push([x, y, v, p]);
    }
  };

  for(var x = x0; x < x1; x++) {
    if(connected2(x, y0, 0)) addOutput(0, x, y0, x1 - x - 1, x, false);
    if(connected2(x, y1 - 1, 2)) addOutput(2, x, y1 - 1, x - x0, x, false);
  }
  for(var y = y0; y < y1; y++) {
    if(connected2(x0, y, 3)) addOutput(3, x0, y, y - y0, y, false);
    if(connected2(x1 - 1, y, 1)) addOutput(1, x1 - 1, y, y1 - y - 1, y, false);
  }

  // also support special outputs that are at possible larger bounding box x0s, y0s, x1s, y1s. See largeComponentBB for more info on these.
  // NOTE: this is only a temporary solution. In theory ALL y,c,C,q,Q of the component's outputs should be considered, and also diagonal ones.
  // however this temporary solution probably covers almost all use cases, so is likely good enough.
  for(var x = x0s; x < x1s; x++) {
    if(y0s != y0 && connected2(x, y0s, 0)) addOutput(0, x, y0s, x1s - x - 1, x, true);
    if(y1s != y1 && connected2(x, y1s - 1, 2)) addOutput(2, x, y1s - 1, x - x0s, x, true);
  }
  for(var y = y0s; y < y1s; y++) {
    if(x0s != x0 && connected2(x0s, y, 3)) addOutput(3, x0s, y, y - y0s, y, true);
    if(x1s != x1 && connected2(x1s - 1, y, 1)) addOutput(1, x1s - 1, y, y1s - y - 1, y, true);
  }

  // computes ng, f, l, ga given object with n and a.
  var process = function(v) {
    v.a.sort(function(a, b) {
      return a[2] - b[2]; // sort by LSB order
    });
    // needs to be resorted too
    if(v.ai) {
      for(var i = 0; i < v.ai.length; i++) {
        v.ai[i] = v.a[i][4];
      }
    }

    for(var i = 1; i < v.a.length; i++) {
      if(v.a[i - 1][2] == v.a[i][2]) return null; // two inputs to same side, so maybe diagonal input, not supported for this.
    }

    // groups array
    if(v.a.length) {
      var prev = v.a[0];
      v.ga.push({n:0, f:prev, l:null, ai:[]});
      for(var i = 1; i <= v.a.length; i++) {
        var b = v.ga[v.ga.length - 1];
        if(i < v.a.length) {
          b.ai.push(v.a[i][4]);
        }
        if(i == v.a.length || v.a[i][2] > prev[2] + 1) {
          b.l = prev;
          b.n = b.l[2] - b.f[2] + 1;
          b.d = [];
          b.d[0] = (b.f[0] == b.l[0]) ? 0 : (b.l[0] > b.f[0] ? 1 : -1);
          b.d[1] = (b.f[1] == b.l[1]) ? 0 : (b.l[1] > b.f[1] ? 1 : -1);
          b.d[2] = 1;
          b.d[3] = (b.l[3] > b.f[3]) ? 1 : -1;
          b.dn = [-b.d[0], -b.d[1], -b.d[2], -b.d[3]];
          if(i < v.a.length) v.ga.push({n:0, f:v.a[i], l:null, ai:[]});
        }
        if(i < v.a.length) {
          prev = v.a[i];
        }
      }
    }

    v.ng = v.ga.length;
  };

  r.ni = 0;
  r.no = 0;
  r.nig = 0;
  r.nog = 0;
  r.nis = 0;
  r.nos = 0;
  r.nes = 0;
  r.niis = 0;
  r.noos = 0;
  r.nios = 0;
  for(var i = 0; i < 4; i++) {
    process(r.i[i]);
    process(r.o[i]);
    r.ni += r.i[i].n;
    r.no += r.o[i].n;
    r.nig += r.i[i].ng;
    r.nog += r.o[i].ng;
    if(r.i[i].n) r.nis++;
    if(r.o[i].n) r.nos++;
    if(!r.i[i].n && !r.o[i].n) r.nes++;
    if(r.i[i].n && !r.o[i].n) r.niis++;
    if(r.o[i].n && !r.i[i].n) r.noos++;
    if(r.o[i].n && r.i[i].n) r.nios++;
  }

  r.ispecial = [r.iy, r.ic, r.iC, r.iq, r.iQ];
  r.ospecial = [r.oy, r.oc, r.oC, r.oq, r.oQ];

  return r;
}

// returns array, wich first element null or an error message, and each next element a subarray: [n, mantissa, exp]
// here n = #inputs for this float (mantissa+exp+1), mantissas = #mantissa bits, exp = #exp bits (there is also always 1 sign bit, the MSB)
// output: if false, gets inputs from that side, otherwise outputs.
function extractfloatio(io, dir, output) {
  var result = [null]; // null for first element means no error
  var s = output ? io.o[dir] : io.i[dir]; // the relevant input/output side
  var ng = s.ng;
  // whether floats are given as separate input groups for sign, exp, mantissa, or as single bitgroups
  // if separate, sign must be size 1. if single bitgroups, an exponent size is automatically computed using an IEEE like formula.
  var separate = ((ng % 3) == 0);
  if(separate) {
    for(var i = 2; i < s.ng; i += 3) {
      if(s.ga[i].n != 1) {
        separate = false;
        break;
      }
    }
  }
  if(separate) {
    for(var i = 0; i < s.ng; i += 3) {
      var mantissa = s.ga[i + 0].n;
      var exp = s.ga[i + 1].n;
      //if(exp < 2) return ['floating point exponent bits too small'];
      // more than double precision not supported: JS Number can't represent them
      if(exp > 11) return ['floating point exponent bits > 11 not supported'];
      if(mantissa > 52) return ['floating point mantissa bits > 52 not supported'];
      result.push([mantissa + exp + 1, mantissa, exp]);
    }
  } else {
    for(var i = 0; i < s.ng; i++) {
      var n = s.ga[i].n;
      //if(n < 4) return ['too few bits for floating point value'];
      // compute amount of exponent bits. IEEE gives a formula Math.round(4 * Math.log2(n)) - 13, however this
      // formula only holds starting from 64, so here a few extra formulas are improvides to make it match good
      // values (and the correct ones for 16, 32) for lower bits.
      // we know (with the cases for n=4 and n=8 not IEEE but sensible): n:exp pairs:
      // 4:2, 8:3, 16:5, 32:8, 64:11, 128:15, 256:19, ...
      var exp = 0;
      if(n >= 64) exp = Math.round(4 * Math.log2(n)) - 13;
      else if(n >= 16) exp = Math.round(3 * Math.log2(n)) - 7; // designed to smoothly go from 16:5 to 32:8 to 64:11
      else if(n >= 8) exp = Math.round(2 * Math.log2(n)) - 3;
      else if(n >= 4) exp = Math.floor(Math.log2(n));
      else if(n > 1) exp = 1; // NOTE: in the pathalogical case of 3, 2 or 1 bits, we have respectively: SEM, SE, S (where S=sign bit, E=exponent bits, M=mantissa bits). So e.g. the 2-bit case only supports 0, -0, Inf and -Inf.
      var mantissa = n - exp - 1;
      //if(exp < 2) return ['floating point exponent bits too small'];
      // more than double precision not supported: JS Number can't represent them
      if(exp > 11) return ['floating point exponent bits > 11 not supported'];
      if(mantissa > 52) return ['floating point mantissa bits > 52 not supported'];
      result.push([mantissa + exp + 1, mantissa, exp]);
    }
  }
  return result;
}


// find largest rectangle of 1's in array of 0's and 1's. Returned as [x0, y0, x1, y1] with x1, y1 exclusive end coordinates
// modifies arr while it works
function largestRectangle(arr) {
  var best = 0;
  var result = [0, 0, 0, 0];

  if(arr.length == 0) return result;
  var h = arr.length;
  var w = arr[0].length;

  // store amount of non-0 above current non-0 value
  for(var y = 1; y < h; y++) {
    for(var x = 0; x < w; x++) {
      if(arr[y][x] && arr[y - 1][x]) arr[y][x] += arr[y - 1][x];
    }
  }

  for(var y = 0; y < h; y++) {
    // solve for current row as largest rectangle in histogram
    var stack = [];
    var row = arr[y];
    // left bars
    var left = [];
    for(var x = 0; x < w; x++) {
      while(stack.length > 0) {
        if(row[stack[stack.length - 1]] < row[x]) break;
        stack.pop();
      }
      var v = (stack.length ? stack[stack.length - 1] : -1);
      left[x] = x - v - 1;
      stack.push(x);
    }
    // right bars
    var right = [];
    stack = [];
    for(var x = w - 1; x >= 0; x--) {
      while(stack.length > 0) {
        if(row[stack[stack.length - 1]] < row[x]) break;
        stack.pop();
      }
      var v = (stack.length ? stack[stack.length - 1] : w);
      right[x] = v - x - 1;
      stack.push(x);
    }
    // max area
    for(var x = 0; x < w; x++) {
      var area = row[x] * (left[x] + right[x] + 1);
      if(area > best) {
        best = area;
        result = [x - left[x], y - row[x] + 1, x + right[x] + 1, y + 1];
      }
    }
  }

  return result;
};


// computes the rectangular bounding box of a large component, as intended to use for the coordinates for getIO, that is, the sides on which main inputs and outputs are detected
// array: 2D array of cell index, x/y coord in 0,1
// if special_controls is false:
//   simply computes the rectangular bounding box and outputs in the component's x0, y0, x1, y1 fields, does not add any other fields
// if special_controls: if true, also computes extra bounding boxes related to special input tiles (y, c, C, q, Q) of large device, and outputs them to extra fields
//   x0, y0, x1, y1 will now exclude any y,c,C,q,Q in its computation, so that they still are the main input/output sides
//   x0s, y01, x1s, y1s: full bounding box that was normally gotten if special_controls was false
//   x0b, y0b, x1b, y1b: largest rectangle not containing the special inputs. This can be smaller than x0, y0, x1, y1.
//   examples: in each example, left side is a possible large component, right of that main bounding box is shown, right of that 's' bounding box, right of that 'b' bounding box
//   T###y  mmmmm  sssss  bbbby
//   #####  mmmmm  sssss  bbbb#
//
//   T###y  mmmmy  sssss  bbbby --> the difference in this example and previous one is the # below the y, it's no longer there, so main bounding box now smaller.
//   ####   mmmm   sssss  bbbb#
//
//   And also excludes these for computation of x0,y0,x1,y1 (but this one can still be larger than x0b,y0b,x1b,y1b as this one still takes the min/max of regular tiles)
// component: sets x0, y0, x1, y1 fields to this
// possible resulting areas:
//   x0,y0,x1,y1: the rectangle to use for getIO for finding the location of input and output sides for large device. May be smaller than all fields in array if special_controls is enabled.
//   x0b,y0b,x1b,y1b: an inner bounding box that could be smaller than or equal to x0,y0,x1,y1, intended for display (VTE, dot matrix) that excludes special controls
//   array: original input, may be non rectangular

function largeComponentBB(array, special_controls, component) {
  var x0 = w, y0 = h, x1 = 0, y1 = 0;
  for(var i = 0; i < array.length; i++) {
    var x = array[i][0];
    var y = array[i][1];
    if(special_controls && specialmap[world[y][x].circuitsymbol]) continue;
    x0 = Math.min(x0, x);
    y0 = Math.min(y0, y);
    x1 = Math.max(x1, x + 1);
    y1 = Math.max(y1, y + 1);
  }

  component.x0 = x0;
  component.y0 = y0;
  component.x1 = x1;
  component.y1 = y1;

  if(special_controls) {
    // larger bounding box than above (or same as above would give if !special_controls)
    var x0s = w, y0s = h, x1s = 0, y1s = 0;
    for(var i = 0; i < array.length; i++) {
      var x = array[i][0];
      var y = array[i][1];
      x0s = Math.min(x0s, x);
      y0s = Math.min(y0s, y);
      x1s = Math.max(x1s, x + 1);
      y1s = Math.max(y1s, y + 1);
    }
    component.x0s = x0s;
    component.y0s = y0s;
    component.x1s = x1s;
    component.y1s = y1s;

    var arr = [];
    for(var y = y0; y < y1; y++) {
      var y2 = y - y0;
      arr[y2] = [];
      for(var x = x0; x < x1; x++) {
        var x2 = x - x0;
        var c = world[y][x].circuitsymbol;
        arr[y2][x2] = (specialmap[c] ? 0 : 1);
      }
    }
    var r = largestRectangle(arr);
    component.x0b = x0 + r[0];
    component.y0b = y0 + r[1];
    component.x1b = x0 + r[2];
    component.y1b = y0 + r[3];
  }
}


function Fixed() { // function FixedValue()
  this.x0 = 0;
  this.y0 = 0;
  this.x1 = 0;
  this.y1 = 0;
  this.parent = null;
  this.error = false;
  this.errormessage = null;

  this.inverted = false;
  this.value = -1;
  this.output = []; // binary ouput values


  this.setError = function(text) {
    this.error = true;
    if(!this.errormessage) this.errormessage = text;
  };

  this.init1 = function(array) {
    largeComponentBB(array, false, this);
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    this.parent = null; // the parent component for this fixed value
    this.inverted = false;

    for(var i = 0; i < array.length; i++) {
      var x = array[i][0];
      var y = array[i][1];
      var c = world[y][x];
      var s = c.circuitsymbol;
      var component = c.components[0] || c.components[1];
      if(component) {
        if(s == 'f' || s == 'F') {
          if(this.parent) {
            if(s == 'f' && this.inverted) { this.setError('conflict: f and F in same fixed value'); return false; }
            if(s == 'F' && !this.inverted) { this.setError('conflict: f and F in same fixed value'); return false; }
          } else {
            var component = c.components[0] || c.components[1];
            this.parent = component;
            if(s == 'F') this.inverted = true;
          }
        }
      }
    }
    if(!this.parent) { this.setError('no parent found'); return false; }

    for(var i = 0; i < array.length; i++) {
      var x = array[i][0];
      var y = array[i][1];
      var c = world[y][x];
      if(c.numbertype == NUMBER_FIXED && c.number > this.value) {
        this.value = c.number;
      }
      if(c.components[0]) c.components[0].parent = this.parent;
    }
    this.parent.fixed = this;


    var fixedmap = {'f':true, 'F':true};
    var move = true; //!this.inverted;
    if(move) {
      // compute potential better location to put the number. Only if a f or F
      // symbol is present on a side, otherwise assume the number is deliberately
      // placed off the side. (only used by the graphics mode, not the text mode)
      var numberx0 = -1, numbery0 = -1;
      var numberx1 = -1, numbery1 = -1;
      var dir = -1; // -1 = single digit, 0 = vertical, 1 = horizontal
      for(var i = 0; i < array.length; i++) {
        var x = array[i][0];
        var y = array[i][1];
        var c = world[y][x].displaysymbol;
        if(puredigitmap[c]) {
          var initial = (numberx0 == -1);
          if(!initial) {
            if(x != numberx0) dir = 1;
            else if(y != numbery0) dir = 0;
          }
          if(x < numberx0 || y < numbery0 || initial) {
            numberx0 = x;
            numbery0 = y;
          }
          if(x > numberx1 || y > numbery1 || initial) {
            // inclusive coordinates (unlike x1, y1 which are exclusive end coordinates)
            numberx1 = x;
            numbery1 = y;
          }
        }
      }
      move = ((numberx0 == numberx1) || (numbery0 == numbery1)) && (numberx0 != -1);
    }
    if(move) {
      // turn dir into direction to move, or -1 to not move; e.g. 3 to move 1 west
      if(dir != 0 && numberx0 == x0 + 1 && fixedmap[world[numbery0][x0].circuitsymbol]) dir = 1;
      else if(dir != 0 && numberx1 + 1 == x1 - 1 && fixedmap[world[numbery0][x1 - 1].circuitsymbol]) dir = 3;
      else if(dir != 1 && numbery0 == y0 + 1 && fixedmap[world[y0][numberx0].circuitsymbol]) dir = 2;
      else if(dir != 1 && numbery1 + 1 == y1 - 1 && fixedmap[world[y1 - 1][numberx0].circuitsymbol]) dir = 0;
      else move = false;
    }
    if(move) {
      for(var i = 0; i < array.length; i++) {
        var x = array[i][0];
        var y = array[i][1];
        var n = getNeighborNoAntennas(x, y, dir);
        var s = n ? n.displaysymbol : ' ';
        if(!puredigitmap[s]) s = ' ';
        world[y][x].fixedvaluesymbol = s;
      }
    } else {
      for(var i = 0; i < array.length; i++) {
        var x = array[i][0];
        var y = array[i][1];
        var s = world[y][x].displaysymbol;
        //if(this.inverted && s == 'F') s = '~'; // indicate the bits are negated
        //else if(!puredigitmap[s]) s = ' ';
        if(!puredigitmap[s]) s = ' ';
        world[y][x].fixedvaluesymbol = s;
      }
    }
    return true;
  }

  this.processIO = function(io) {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    // inputs are not an error but are completely ignored, it's a fixed value

    // outputs
    if(io.nos > 1) { this.setError('only one output side supported'); return false; }


    var ontype = this.inverted ? TYPE_CONSTANT_OFF : TYPE_CONSTANT_ON;
    var offtype = this.inverted ? TYPE_CONSTANT_ON : TYPE_CONSTANT_OFF;

    var rompos = 0;
    for(var dir = 0; dir < 4; dir++) {
      if(io.o[dir].n) {
        var o = io.o[dir];

        var bits = [];
        var v = math.B(this.value);
        for(var i = 0; i < o.n; i++) {
          bits[i] = (v & math.n1) ? 1 : 0;
          v >>= math.n1;
        }


        for(var i = 0; i < o.n; i++) {
          var x = o.a[i][0];
          var y = o.a[i][1];
          var c = world[y][x];
          if(c.components[0]) {
            //c.components[z].rom_out_pos = rompos++;
            c.components[0].type = bits[i] ? ontype : offtype;
          }
        }
      }
    }

    return true;
  };

  // init after inputs are resolved
  // returns true if ok, false if error (e.g. no rectangle or inputs not all on one side)
  this.init2 = function() {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    if(!this.parent) return false;

    var io = getIO(x0, y0, x1, y1, x0, y0, x1, y1, this.parent);
    if(!io) return false;

    if(!this.processIO(io)) return false;

    return true;
  };
}

// actually also RAM! but it started out with only rom functionality.
function ROM() {
  this.onehot = false; // NOTE: actually a wrong name, per-row addressing is better name since it does allow multiple ones to be enabled.
  // 2D array of all bit values, the actual data
  // - height (first index) = #addresses (which word is selected) --> index 0 is always the one closest to the output side
  // - width (second index) = #outputs (which output bit)
  this.array = [];
  this.output = []; // current ouput values (can be one row of the array, or an OR thereof)
  this.x0 = 0;
  this.y0 = 0;
  this.x1 = 0;
  this.y1 = 0;
  this.parent = null;
  this.error = false;
  this.errormessage = null;
  this.addressdir = -1;
  // NOTE: by default, LSB pos is always on the right side when looking in the direction of the input/output arrows
  // exception to that: the address lines have their LSB on the output side (their direction is always perpendicular to output)
  this.wordshor = -1; // whether words are horizontal or vertical, for rendering. 0:columns (so outdir is E or W), 1:rows (so outdir is N or S)
  this.outdir = -1;
  this.selected = []; // selected row/column, for graphical effect. Only as large as the visual part
  this.num_address_inputs = -1;
  this.ram = false; // if true, is ram instead of rom ("has_write")
  this.has_enable = false;
  //this.has_set_all = false;
  this.has_reset_all = false;
  this.has_outputenable = false;
  this.has_outputenabled = false;
  this.decoder = false; // if true, is decoder instead of rom
  this.encoder = false; // if true, is encoder instead of rom
  this.priority = false; // if true, is priority selector instead of rom (with unary input, unary output)
  this.lines = []; // array of x or y values of the coordinates with a line of bits
  this.bits = []; // array of x or y values of the coordinates where each line has bits
  this.lines_inv = []; // from x-x0 or y-y0 to line index
  this.bits_inv = []; // from x-x0 or y-y0 to bits index
  this.previnput = [];


  this.updateRamDisplay = function(bit, line) {
    var x, y;
    if(this.wordshor == 1) {
      x = this.bits[bit];
      y = this.lines[line];
    } else {
      y = this.bits[bit];
      x = this.lines[line];
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
  this.binaryToUnary = function(inputs, inputpos, inputsize) {
    var index = 0;
    var mul = 1;
    for(var i = 0; i < inputsize; i++) {
      index += inputs[inputpos + i] * mul;
      mul *= 2;
    }
    return index;
  };

  this.updateOutputEnabled = function() {
    if(this.has_outputenabled) {
      for(var i = 0; i < this.output.length - 1; i++) {
        if(this.output[i]) {
          this.output[this.output.length - 1] = true;
          break;
        }
      }
    }
  };

  // Assumes the component has already updated all inputs according to the UPDATE_ALGORITHM and gotten the input values from it
  // Inputs are MSB to LSB (TODO: verify if this is still true)
  // for RAM the inputs are in the order: address select, read/write bit, data input
  this.update = function(inputs) {
    if(this.error) return;

    for(var j = 0; j < this.output.length; j++) this.output[j] = false;
    for(var i = 0; i < this.selected.length; i++) this.selected[i] = false;


    var pos = 0;

    var enable = true;
    var do_set = false;
    var do_reset_all = false;
    var output_enable = true;

    if(this.has_enable) {
      if(!inputs[pos]) enable = false;
      pos++;
    }

    if(this.has_set) {
      if(enable && inputs[pos] && !this.previnput[pos]) do_set = true;
      this.previnput[pos] = inputs[pos];
      pos++;
    }

    if(this.has_reset_all) {
      if(inputs[pos]) {
        do_reset_all = true; // asynch, no clock edge, overrides enable
        do_set = false;
      }
      pos++;
    }

    if(this.has_outputenable) {
      if(!inputs[pos]) output_enable = false;
      pos++;
    }

    var output_enabled = false;
    var numdataout = this.output.length - (this.has_outputenabled ? 1 : 0);

    if(this.priority) {
      if(!output_enable) return;

      var index = -1;
      for(var i = 0; i < this.num_address_inputs; i++) {
        if(inputs[pos + i]) index = i;
      }

      for(var j = 0; j < numdataout; j++) {
        this.output[j] = (j == index);
      }
      this.updateOutputEnabled();
    } else if(this.encoder) {
      if(!output_enable) return;

      for(var i = 0; i < this.num_address_inputs; i++) {
        if(inputs[pos + i]) {
          for(var j = 0; j < numdataout; j++) {
            if((i >> j) & 1) {
              this.output[j] = true;
            }
          }
        }
      }
      this.updateOutputEnabled();
    } else if(this.decoder) {
      if(!output_enable) return;
      var index = this.binaryToUnary(inputs, pos, this.num_address_inputs);
      if(index < numdataout) this.output[index] = true;
      this.updateOutputEnabled();
    } else {
      if(this.onehot) {
        // one hot can have multiple lines selected, the output is then their OR, and if this is RAM and we are writing, it will write the same value to all selected lines
        for(var i = 0; i < this.num_address_inputs; i++) {
          if(inputs[pos + i]) {
            if(do_set) {
              for(var j = 0; j < this.array[i].length; j++) {
                this.array[i][j] = inputs[pos + this.num_address_inputs + j];
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
        var index = this.binaryToUnary(inputs, pos, this.num_address_inputs);
        if(index < this.lines.length && (this.outdir == 1 || this.outdir == 2)) index = this.lines.length - index - 1; // translate index to order where output side represents 0 (only when in visible part)

        if(index < this.array.length) {
          if(do_set) {
            for(var j = 0; j < this.array[index].length; j++) {
              this.array[index][j] = inputs[pos + this.num_address_inputs + j];
              this.updateRamDisplay(j, index);
            }
          }
          for(var j = 0; j < this.array[index].length; j++) {
            this.output[j] = this.array[index][j];
          }
          if(index < this.selected.length) this.selected[index] = true;
        }
      }

      if(do_reset_all) {
        for(var i = 0; i < this.array.length; i++) {
          for(var j = 0; j < this.array[i].length; j++) {
            if(this.array[i][j]) {
              this.array[i][j] = false;
              this.updateRamDisplay(j, i);
            }
          }
        }
        for(var j = 0; j < this.array[0].length; j++) this.output[i] = 0;
      }
    }
  };

  this.setError = function(text) {
    this.error = true;
    if(!this.errormessage) this.errormessage = text;
  };

  // init before inputs are resolved
  // returns true if ok, false if error
  this.init1 = function(array) {
    largeComponentBB(array, true, this);
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var x0b = this.x0b;
    var y0b = this.y0b;
    var x1b = this.x1b;
    var y1b = this.y1b;

    this.parent = null; // the parent component for this ROM
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var mainbb = (x >= x0b && x < x1b && y >= y0b && y < y1b);
        var c = world[y][x];
        if(mainbb && !(rommap[c.circuitsymbol] || c.circuitsymbol == '#b')) { this.setError('can only have b, B or # in the main rectangular region'); return false; }
        if(!mainbb && rommap[c.circuitsymbol])  { this.setError('cannot have b or B outside of the main rectangular region'); return false; }
        var component = c.components[0] || c.components[1];
        if(!this.parent && mainbb && component) {
          this.parent = component;
        }
      };
    }
    if(!this.parent) { this.setError('didn\'t find a parent component'); return false; }

    for(var i = 0; i < array.length; i++) {
      var x = array[i][0];
      var y = array[i][1];
      var c = world[y][x];
      if(c.components[0]) c.components[0].parent = this.parent;
      if(c.components[1]) c.components[1].parent = this.parent;
      if(!c.components[0] && !c.components[1]) c.components[0] = this.parent;
    }
    this.parent.rom = this;
    this.parent.type = TYPE_ROM; // reason: it might be TYPE_UNKNOWN_DEVICE if it was parsed with #
    return true;
  };

  this.processIO = function(io) {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var x0b = this.x0b;
    var y0b = this.y0b;
    var x1b = this.x1b;
    var y1b = this.y1b;


    if(io.nospecial) { this.setError('special outputs not supported for this component'); return false; }

    var numb = 0, numB = 0;
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        if(world[y][x].circuitsymbol == 'b') numb++;
        if(world[y][x].circuitsymbol == 'B') numB++;
      }
    }
    var coder = true;
    if(numb >= io.no || numB > 0) coder = false;

    var arr = [];

    var hasspecial = !!io.nspecial;

    var outdir = -1;
    var outenableddir = -1; // output-enabled output (OR of all outputs)
    for(var i = 0; i < 4; i++) {
      if(io.i[i].n && io.o[i].n) { this.setError('can\'t have mixed input/output side'); return false; }
      if(coder && io.o[i].n == 1) {
        if(outenableddir > -1) { this.setError('can have only one output-enable side'); return false; }
        outenableddir = i;
      } else if(io.o[i].n) {
        if(outdir > -1) { this.setError('can have only one output side'); return false; }
        outdir = i;
      }
    }
    if(outdir == -1) { this.setError('must have an output side'); return false; }
    this.outdir = outdir;
    if(outenableddir > -1 && (outenableddir & 1) == (outdir & 1)) { this.setError('output-enable side can\'t be across the main output side'); return false; }
    var addressdir = -1;
    var worddir = -1;
    var outenabledir = -1; // output-enable input
    for(var i = 0; i < 4; i++) {
      if(io.i[i].n) {
        if((i & 1) == (outdir & 1)) {
          // across output, so word input
          if(worddir > -1) { this.setError('can have only one word input side'); return false; }
          worddir = i;
        } else if(outenableddir > -1 && (i & 1) == (outenableddir & 1)) {
          if(outenabledir > -1) { this.setError('can have only one output-enable input'); return false; }
          outenabledir = i;
        } else {
          // address input
          if(addressdir > -1) { this.setError('can have only one address input side'); return false; }
          addressdir = i;
        }
      }
    }
    //if(addressdir == -1) { this.setError('must have an address input side'); return false; }


    if(addressdir == -1 && worddir == -1) { this.setError('must have an address and/or word input side'); return false; }

    // if there is only an input side across the output, then it's intended to be the address side instead.
    // a wordside can only appear for a RAM, and a RAM must already have an address side that may not be across the output.
    if(addressdir == -1 && worddir > -1) {
      var temp = addressdir;
      addressdir = worddir;
      worddir = temp;
    }

    //var outsize = io.o[outdir].n;
    this.num_address_inputs = io.i[addressdir].n;

    this.onehot = false;
    var numvisiblewords = 0;
    var wordsize = 0;
    if(!coder) {
      var bits = []; // if e.g. output side is north, this contains x coordinate of every position actually used as bit output
      var lines = []; // // if e.g. output side is north, this contains y coordinate of every position that is actually a line with bits in it
      var bits_inv = [];
      var lines_inv = [];
      var lines_count = [];
      var bits_count = [];
      for(var x = x0b; x < x1b; x++) {
        bits_count[x] = 0;
        bits_inv[x - x0b] = -1;
      }
      for(var y = y0b; y < y1b; y++) {
        lines_count[y] = 0;
        lines_inv[y - y0b] = -1;
        for(var x = x0b; x < x1b; x++) {
          if(world[y][x].circuitsymbol == 'b' || world[y][x].circuitsymbol == 'B') {
            bits_count[x]++;
            lines_count[y]++;
          }
        }
      }
      for(var x = x0b; x < x1b; x++) {
        if(bits_count[x]) {
          bits_inv[x - x0b] = bits.length;
          bits.push(x);
        }
      }
      for(var y = y0b; y < y1b; y++) {
        if(lines_count[y]) {
          lines_inv[y - y0b] = lines.length;
          lines.push(y);
          if(lines_count[y] != bits.length) { this.setError('not all rows filled'); return false; }
        }
      }
      for(var x = x0b; x < x1b; x++) {
        if(bits_count[x] && bits_count[x] != lines.length) { this.setError('not all columns filled'); return false; }
      }
      if(outdir & 1) {
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

      numvisiblewords = lines.length; // num visible words (with RAM there could be hidden ones too)
      wordsize = bits.length;

      this.selected.length = numvisiblewords;


      this.onehot = (!coder && (addressdir & 1) != (outdir & 1) && this.num_address_inputs == numvisiblewords);
    }


    // while the result of getIO has lsb in a certain clockwise order (which is inverted for outputs vs inputs), for the ROM with the visual bB grid,
    // invert the lsbdir if necessary such that we're always in increasing x or y order.
    // exceptions:
    // -binary address (not onehot) should use the getIO system, and be adjustable with a placed '0' instead
    // -inputs/outputs of coder

    var addresslsbinv = false;
    if(!coder && this.onehot && (addressdir == 3 || addressdir == 2)) addresslsbinv = true;

    var wordlsbinv = false;
    if(!coder && (worddir == 3 || worddir == 2)) wordlsbinv = true;

    var outlsbinv = false;
    if(!coder && (outdir == 1 || outdir == 0)) outlsbinv = true;

    // NOTE: in the case of RAM, this is enable for the clock input. In the case of ROM and coders, this is instead output enable.
    if(io.iy.n) {
      if(io.iy.n > 1) { this.setError('too many y inputs'); return false; }
      this.has_enable = true;
      arr.push(io.iy.ai[0]);
      this.has_enable = true;
    }


    if(io.iC.n) { this.setError('C input not supported'); return false; }

    if(io.ic.n) {
      if(io.ic.n > 1) { this.setError('too many c inputs'); return false; }
      this.has_set = true;
      arr.push(io.ic.ai[0]);
    }

    /*if(io.iq.n) {
      if(io.iq.n > 1) { this.setError('too many q inputs'); return false; }
      this.has_dot = true;
      arr.push(io.iq.ai[0]);
      this.has_set_all = true;
    }*/
    if(io.iq.n) { this.setError('q input not supported'); return false; }

    if(io.iQ.n) {
      if(io.iQ.n > 1) { this.setError('too many Q inputs'); return false; }
      this.has_dot = true;
      arr.push(io.iQ.ai[0]);
      this.has_reset_all = true;
    }


    if(outenabledir > -1) {
      for(var i = 0; i < io.i[outenabledir].n; i++) {
        arr.push(io.i[outenabledir].ai[i]);
      }
    }
    if(addressdir > -1) {
      for(var i = 0; i < io.i[addressdir].n; i++) {
        var j = (addresslsbinv ? (io.i[addressdir].n - i - 1) : i);
        arr.push(io.i[addressdir].ai[j]);
      }
    }
    if(worddir > -1) {
      for(var i = 0; i < io.i[worddir].n; i++) {
        var j = (wordlsbinv ? (io.i[worddir].n - i - 1) : i);
        arr.push(io.i[worddir].ai[j]);
      }
      this.ram = true;
    }



    if(coder) {
      // encoder, decoder or priority, not a ROM or RAM
      if(hasspecial) { this.setError('coder doesn\'t support special inputs'); return false; }
      if(worddir > -1) { this.setError('coder cannot have multiple data input sides'); return false; }

      this.has_outputenable = (outenabledir > -1);
      this.has_outputenabled = (outenableddir > -1);

      var numout = io.no - (this.has_outputenabled ? 1 : 0);
      var numin = io.ni - (this.has_outputenable ? 1 : 0);

      if(numout == numin) {
        this.priority = true;
      } else if(numout > numin) {
        this.decoder = true;
      } else {
        this.encoder = true;
      }
    } else {
      // ROM or RAM




      if(this.ram) {
        if(!this.has_enable && !this.has_set)  { this.setError('RAM must have set or enable input'); return false; }
        if(io.i[worddir].n != wordsize) { this.setError('input and output word size must be the same'); return false; }
      } else {
        // ROM
        if(this.has_set) { this.setError('c only supported for RAM'); return false; }
        if(this.has_reset_all) { this.setError('Q only supported for RAM'); return false; }
      }

      this.wordshor = 1 - (outdir & 1);


      if(outdir & 1) {
        for(var ix = 0; ix < this.lines.length; ix++) {
          var x = this.lines[ix];
          var ax = ix;
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
          var ay = iy;
          this.array[ay] = [];
          for(var ix = 0; ix < this.bits.length; ix++) {
            var x = this.bits[ix];
            var c = world[y][x].circuitsymbol;
            this.array[ay][ix] = (c == 'B');
          }
        }
      }

      if(this.ram) {
        var addresssize = io.i[addressdir].n;
        var realsize = addresssize;
        if(!this.onehot) {
          if(realsize > 20) realsize = 20; // don't make it too extreme. Max 1M entries. The question is, can javascript even handle that
          realsize = (1 << realsize);
        }
        var oldsize = this.array.length;
        if(oldsize == 0) { this.setError('invalid oldsize'); return false; }
        var wordwidth = this.array[0].length;
        for(var i = oldsize; i < realsize; i++) {
          this.array[i] = [];
          for(var j = 0; j < wordwidth; j++) this.array[i][j] = false;
        }
      }
    }



    if(!newOrderInputs(this.parent, arr)) { this.setError('must use *all* inputs for newOrderInputs'); return false; }

    // outputs
    var rompos = 0;
    var outa = [];

    var o = io.o[outdir];
    for(var i = 0; i < o.n; i++) {
      var j = (outlsbinv ? (o.n - i - 1) : i);
      var x = o.a[j][0];
      var y = o.a[j][1];
      var z = (outdir & 1) ? 0 : 1;
      outa.push([x, y, z]);
    }
    if(outenableddir > -1) {
      var o = io.o[outenableddir];
      for(var i = 0; i < o.n; i++) {
        var x = o.a[i][0];
        var y = o.a[i][1];
        var z = (outenableddir & 1) ? 0 : 1;
        outa.push([x, y, z]);
      }
    }
    for(var i = 0; i < outa.length; i++) {
      var x = outa[i][0];
      var y = outa[i][1];
      var z = outa[i][2];
      var c = world[y][x];
      if(c.components[z]) {
        c.components[z].rom_out_pos = rompos++;
      }
    }
    this.output.length = outa.length;

    return true;
  };


  // init after inputs are resolved
  // returns true if ok, false if error (e.g. no rectangle or inputs not all on one side)
  this.init2 = function() {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var x0s = this.x0s;
    var y0s = this.y0s;
    var x1s = this.x1s;
    var y1s = this.y1s;

    if(!this.parent) return false;

    var io = getIO(x0, y0, x1, y1, x0s, y0s, x1s, y1s, this.parent);
    if(!io) return false;

    if(!this.processIO(io)) return false;

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
  this.parent = null;
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
  this.init1 = function(array) {
    largeComponentBB(array, false, this);
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    this.parent = null; // the parent component for this Mux

    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        if(c.circuitsymbol == 'M' || c.circuitsymbol == '#M') {
          this.parent = c.components[0] || c.components[1];
          break;
        }
      }
      if(this.parent) break;
    }

    if(!this.parent) {
      this.setError('no parent component found');
      return false;
    }
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        //if(c.components[0] == this.parent) continue;
        /*if(!c.components[0]) {
          c.components[0] = this.parent;
        } else {
          c.components[0].parent = this.parent;
        }*/
        if(c.components[0]) c.components[0].parent = this.parent;
        if(c.components[1]) c.components[1].parent = this.parent;
      }
    }
    this.parent.mux = this;
    this.parent.type = TYPE_MUX; // reason: it might be TYPE_UNKNOWN_DEVICE if it was parsed with #
    return true;
  };


  /*
  given the array returned by getIO,
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

    if(io.nios) return null; // mixed input/output sides not supported

    // it's a demux if there is a side with less inputs than outputs
    for(var i = 0; i < 4; i++) {
      var j = getOppositeDir(i);
      if(io.i[i].n && // is input
         io.o[j].n && // other is output
         io.i[i].n < io.o[j].n) { // less inputs than the other has outputs
        demux = true;
        demuxdataside = i;
        break;
      }
    }

    if(demux) {
      for(var i = 0; i < 4; i++) {
        if(io.i[i].n) {
          numinputsides++;
          if(numinputsides > 2) {
            this.setError('too many input sides');
            return null;
          }
          if(i == demuxdataside) {
            datain[0] = i;
            datain[2] = io.i[i].n;
          } else {
            selin[0] = i;
            selin[2] = io.i[i].n;
          }
        }
        if(io.o[i].n) {
          numoutputsides++;
          if(numoutputsides > 2) {
            this.setError('too many output sides');
            return null;
          }
          if(i == getOppositeDir(demuxdataside)) {
            dataout[0] = i;
            dataout[2] = io.o[i].n;
          } else {
            selout[0] = i;
            selout[2] = io.o[i].n;
          }
        }
      }

      if(dataout[2] < 2) { this.setError('must have multiple outputs'); return null; }
      if(dataout[2] < (1 << selin[2])) { this.setError('too few data outputs'); return null; }
    } else {
      for(var i = 0; i < 4; i++) {
        if(io.i[i].n) {
          numinputsides++;
          if(numinputsides > 2) {
            this.setError('too many input sides');
            return null;
          }
          if(numinputsides == 1) {
            datain[0] = i;
            datain[2] = io.i[i].n;
          }
          if(numinputsides == 2) {
            selin[0] = i;
            selin[2] = io.i[i].n;
            if(selin[2] > datain[2]) {
              var temp = selin;
              selin = datain;
              datain = temp;
            }
          }
        }
        if(io.o[i].n) {
          numoutputsides++;
          if(numoutputsides > 2) {
            this.setError('too many output sides');
            return null;
          }
          if(numoutputsides == 1) {
            dataout[0] = i;
            dataout[2] = io.o[i].n;
          }
          if(numoutputsides == 2) {
            selout[0] = i;
            selout[2] = io.o[i].n;
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
    for(var i = 0; i < this.parent.inputs.length; i++) array[i] = i;
    var self = this;
    array = array.sort(function(a, b) {
      var xa =  self.parent.inputs_x[a];
      var ya =  self.parent.inputs_y[a];
      var xb =  self.parent.inputs_x[b];
      var yb =  self.parent.inputs_y[b];
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
    if(!newOrderInputs(this.parent, array)) { this.setError('must use *all* inputs for newOrderInputs'); return false; }

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
    var o = io.o[getOppositeDir(this.dataindir)];
    for(var i = 0; i < o.a.length; i++) {
      var j = i;
      var lsbpos = this.datainlsbpos;
      if(this.dataindir == 2 || this.dataindir == 3) lsbpos = !lsbpos; // take into account the order of getIO
      if(lsbpos) j = o.a.length - i - 1;
      j = o.a[j][3] - ((this.dataindir & 1) ? this.y0 : this.x0);
      var x = side[0] + side[2] * j;
      var y = side[1] + side[3] * j;
      var z = side[4];
      var c = world[y][x];
      if(c.circuitsymbol != 'M' && c.circuitsymbol != '#M') continue;
      if(c.components[z]) c.components[z].rom_out_pos = rompos++;
    }

    side = getSide(getOppositeDir(this.selindir));
    o = io.o[getOppositeDir(this.selindir)];
    for(var i = 0; i < o.a.length; i++) {
      var j = i;
      var lsbpos = this.selinlsbpos;
      if(this.selindir == 2 || this.selindir == 3) lsbpos = !lsbpos; // take into account the order of getIO
      if(lsbpos) j = o.a.length - i - 1;
      j = o.a[j][3] - ((this.selindir & 1) ? this.y0 : this.x0);
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

    if(!this.parent) return false;

    var io = getIO(x0, y0, x1, y1, x0, y0, x1, y1, this.parent);
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

// Arithmetic Logic Unit ('U')
function Alu() {
  this.parent = null;
  this.error = false;
  this.errormessage = null;
  // input A
  this.adir = -1;
  this.alsbinv = false;  // true means lsb is on other side than the usual (usual = the rule of 'v' in getIO)
  this.numa = 0; // total amount of input wires involved in input a
  this.numa_mant = 0; // mantissa wires of input a, only relevant if this.floating (or floating opindex with op select if not this.floating)
  this.numa_exp = 0; // exponent wires of input a, only relevant if this.floating (or floating opindex with op select if not this.floating)
  this.numa_sign = 0; // sign wires of input a, always 1, only relevant if this.floating (or floating opindex with op select if not this.floating)
  // input B
  this.bdir = -1;
  this.blsbinv = false;
  this.numb = 0;
  this.numb_mant = 0; // similar to numa_mant
  this.numb_exp = 0; // similar to numa_exp
  this.numb_sign = 0; // similar to numa_sign
  // input C
  this.cdir = -1;
  this.clsbinv = false;
  this.numc = 0;
  this.numc_mant = 0; // similar to numa_mant
  this.numc_exp = 0; // similar to numa_exp
  this.numc_sign = 0; // similar to numa_sign
  // output
  this.odir = -1;
  this.olsbinv = false;
  this.numo = 0;
  this.numo_mant = 0; // similar to numa_mant, but for the output
  this.numo_exp = 0; // similar to numa_exp, but for the output
  this.numo_sign = 0; // similar to numa_sign, but for the output
  // misc side: carry in, carry or overflow out
  this.miscindir = -1;
  this.miscoutdir = -1;
  this.nummiscin = 0;
  this.nummiscout = 0;
  this.miscinlsbinv = false;
  this.miscoutlsbinv = false;
  // select operation
  this.selectdir = -1;
  this.selectlsbinv = false;
  this.numselect = 0;

  this.signed = false; // signed instead of unsigned integer
  this.floating = false; // floating point instead of integer
  this.opindex = 16; // default (without number), the operation is 'add'
  // not used by all ops
  this.preva = undefined;
  this.prevo = undefined;

  this.output = []; // current ouput values (first data output(s), then the misc ones passthrough)

  // should have rectangular shape
  this.x0 = -1;
  this.y0 = -1;
  this.x1 = -1;
  this.y1 = -1;

  // max 4 characters
  this.getOpShortNameFor = function(opindex) {
    switch(opindex) {
        case 0: return this.floating ? 'un2f' : 'zero';
        case 1: return this.floating ? 'f2un' : 'and';
        case 2: return this.floating ? 'in2f' : 'nimb';
        case 3: return this.floating ? 'f2in' : 'a';
        case 4: return this.floating ? 'un2s' : 'nima';
        case 5: return this.floating ? 's2un' : 'b';
        case 6: return this.floating ? 'in2s' : 'xor';
        case 7: return this.floating ? 's2in' : 'or';
        case 8: return this.floating ? 'flr' : 'nor';
        case 9: return this.floating ? 'ceil' : 'xnor';
        case 10: return this.floating ? 'rnd' : 'notb';
        case 11: return this.floating ? 'trun' : 'impa';
        case 12: return this.floating ? 'fexp' : 'nota';
        case 13: return this.floating ? 'fman' : 'impb';
        case 14: return this.floating ? 'pi' : 'nand';
        case 15: return this.floating ? 'e' : 'ones';
        case 16: return this.numc ? 'addm' : 'add';
        case 17: return this.numc ? 'subm' : 'sub';
        case 18: return this.numc ? 'mulm' : 'mul';
        case 19: return this.numc ? 'divm' : 'div';
        case 20: return 'rem';
        case 21: return 'fdiv';
        case 22: return 'mod';
        case 23: return 'clml';
        case 24: return 'inc';
        case 25: return 'dec';
        case 26: return 'neg';
        case 27: return 'abs';
        case 28: return this.numb ? 'csgn' : 'sign';
        case 31: return 'iden';
        case 32: return this.numb ? 'eq' : 'eq0';
        case 33: return this.numb ? 'lt' : 'lt0';
        case 34: return this.numb ? 'lte' : 'lte0';
        case 35: return this.numb ? 'neq' : 'neq0';
        case 36: return this.numb ? 'gte' : 'gte0';
        case 37: return this.numb ? 'gt' : 'gt0';
        case 38: return 'min';
        case 39: return 'max';
        case 40: return 'lsh';
        case 41: return 'rsh';
        case 42: return 'rlsh';
        case 43: return 'rrsh';
        case 48: return this.numc ? 'powm' : 'pow';
        case 49: return this.numb ? 'log' : 'log2';
        case 50: return this.numb ? 'root' : 'sqrt';
        case 54: return this.numb ? '2bas' : '2bcd';
        case 55: return this.numb ? 'bas2' : 'bcd2';
        case 56: return 'minv';
        case 57: return 'gcd';
        case 58: return 'lcm';
        case 59: return 'fact'; // factorial
        case 60: return 'binm';
        case 61: return 'ppow';
        case 64: return 'prim';
        case 65: return 'npr';
        case 66: return 'ppr';
        case 67: return 'fctr'; // factorize
        case 68: return this.numc ? 'dlog' : 'mulo';
        case 69: return 'qres';
        case 70: return 'etot';
        case 72: return 'clz';
        case 73: return 'ctz';
        case 74: return 'popc';
        case 76: return 'pext';
        case 77: return 'pdep';
        case 80: return 'sin';
        case 81: return 'asin';
        case 82: return 'cos';
        case 83: return 'acos';
        case 84: return 'tan';
        case 85: return this.numb? 'atn2' : 'atan';
        case 86: return 'ln';
        case 87: return 'exp';
        case 88: return 'time';
        case 89: return 'date';
        case 90: return 'unix';
        case 95: return 'rand';
        case 96: return 'mirr';
        case 97: return 'btrv';
        case 98: return 'shuf';
        case 99: return 'ushf';
        case 100: return 'grp';
        case 101: return 'ugrp';
        case 104: return 'gama';
        case 105: return 'lgam';
        case 106: return 'w';
        case 107: return 'j';
        case 108: return 'erf';
        default: return 'unk';
    }
  };

  this.getOpShortName = function() {
    return this.getOpShortNameFor(this.opindex);
  };

  this.getOpLongNameFor = function(opindex) {
    switch(opindex) {
        case 0: return this.floating ? ('convert from unsigned integer to float') : 'zero';
        case 1: return this.floating ? ('convert from float to unsigned integer') : 'bitand';
        case 2: return this.floating ? ('convert from signed integer to float') : 'a nimply b';
        case 3: return this.floating ? ('convert from float to signed integer') : 'a';
        case 4: return this.floating ? ('convert to float 0..1 from unsigned integer full range (0..1 range modifiable if multiple inputs)') : 'b nimply a';
        case 5: return this.floating ? ('convert from float 0..1 to unsigned integer full range') : 'b';
        case 6: return this.floating ? ('convert to float -1..1 from signed integer full range (-1..1 range modifiable if multiple inputs)') : 'bitxor';
        case 7: return this.floating ? ('convert float float -1..1 to signed integer full range') : 'bitor';
        case 8: return this.floating ? ('floor') : 'bitnor';
        case 9: return this.floating ? ('ceil') : 'bitxnor';
        case 10: return this.floating ? ('round') : 'bitinvert b';
        case 11: return this.floating ? ('truncate towards 0') : 'b imply a';
        case 12: return this.floating ? ('floating point exponent raw bits') : 'bitinvert a';
        case 13: return this.floating ? ('floating point mantissa raw bits') : 'a imply b';
        case 14: return this.floating ? 'get the mathematical constant pi' : 'bitnand';
        case 15: return this.floating ? 'get the mathematical constant e (Euler\'s number)' : 'all ones';
        case 16: return this.numc ? 'add modulo third input' : 'add';
        case 17: return this.numc ? 'subtract modulo third input' : 'subtract';
        case 18: return this.numc ? 'multiply modulo third input' : 'multiply';
        case 19: return this.numc ? 'divide modulo third input' : 'divide';
        case 20: return 'remainder';
        case 21: return this.numc ? 'floor divide modulo third input' : 'floor divide';
        case 22: return 'modulo';
        case 23: return 'carryless multiply';
        case 24: return 'increment';
        case 25: return 'decrement';
        case 26: return 'negate';
        case 27: return 'absolute value';
        case 28: return this.numb ? 'copysign' : 'sign';
        case 31: return 'identity function (passes through the value, possibly with changed bit amount or precision)';
        case 32: return this.numc ? 'equals modulo third input' : (this.numb ? 'equals' : 'equals 0');
        case 33: return (this.numb ? 'lesser than' : 'lesser than 0');
        case 34: return (this.numb ? 'lesser than or equals' : 'lesser than or equals 0');
        case 35: return this.numc ? 'not equals modulo third input' : (this.numb ? 'not equals' : 'not equal to 0');
        case 36: return (this.numb ? 'greater than or equals' : 'greater than or equals 0');
        case 37: return (this.numb ? 'greater than' : 'greater than 0');
        case 38: return 'minimum';
        case 39: return 'maximum';
        case 40: return 'left shift';
        case 41: return 'right shift';
        case 42: return 'rotating left shift';
        case 43: return 'rotating right shift';
        case 48: return this.floating ? 'power' : (this.numc ? 'integer power modulo third input' : 'integer power');
        case 49: return this.numb ? (this.floating ? 'log' : 'integer log') : 'log2';
        case 50: return this.numb ? (this.floating ? 'root' : 'integer root') : 'sqrt';
        case 54: return this.numb ? 'binary to base b (b bitsize = output digit bitgroup size; if carry input true, instead uses base b + 1)' : 'binary to bcd (binary coded decimal)';
        case 55: return this.numb ? 'base b to binary (b bitsize = input digit bitgroup size; if carry input true, instead uses base b + 1)' : 'bcd to binary (bcd = binary coded decimal)';
        case 56: return this.numb ? 'modular inverse (modulo output size)' : 'modular inverse';
        case 57: return 'greatest common divider';
        case 58: return 'least common multiple';
        case 59: return this.numb ? 'factorial modulo second input' : 'factorial';
        case 60: return 'binomial coefficient';
        case 61: return 'perfect power (if so, outputs exponent)';
        case 64: return 'is prime';
        case 65: return 'next prime';
        case 66: return 'previous prime';
        case 67: return 'integer factorization';
        case 68: return this.numc ? 'discrete logarithm' : 'multiplicative order';
        case 69: return 'quadratic residue modulo prime (ressol)';
        case 70: return 'euler\'s totient function';
        case 72: return 'count leading zeros';
        case 73: return 'count trailing zeros';
        case 74: return 'popcount';
        case 76: return 'parallel bit extract (PEXT): select input bits with mask, extract to continguous low order bits of result';
        case 77: return 'parallel bit deposit (PDEP): select output bits with mask, deposit contiguious low order bits of input there';
        case 80: return this.floating ? 'sine' : 'sine (scaled: unsigned=quarter period, signed=full period, float=not scaled)';
        case 81: return this.floating ? 'arcsine' : 'arcsine (scaled: unsigned=quarter period, signed=full period, float=not scaled)';
        case 82: return this.floating ? 'cosine' : 'cosine (scaled: unsigned=quarter period, signed=full period, float=not scaled)';
        case 83: return this.floating ? 'arccosine' : 'arccosine (scaled: unsigned=quarter period, signed=full period, float=not scaled)';
        case 84: return this.floating ? 'tangent' : 'tangent (scaled and limited: unsigned=1/8th period, signed=1/4th period, float=unlimited, not scaled)';
        case 85: return this.numb ? 'atan2' : (this.floating ? 'arctangent' : 'arctangent (scaled and limited)');
        case 86: return 'ln (input scaled to 1..e)';
        case 87: return 'exp (input scaled to 0..1)';
        case 88: return 'time in seconds since unix epoch. Needs positive edge input bit change to update.';
        case 89: return 'convert unix epoch to Y-M-S h:m:s: from LSB: 6 bits seconds, 6 bits minutes, 5 bits hour, 5 bits day, 4 bits month, remaining bits year';
        case 90: return 'Y-M-S h:m:s to unix epoch: from LSB: 6 bits seconds, 6 bits minutes, 5 bits hour, 5 bits day, 4 bits month, remaining bits year';
        case 95: return this.numa ? (this.numb ? 'random a..b' : 'random 0..a') : 'random';
        case 96: return 'mirror bits';
        case 97: return 'bit reversal (mirror bit indices)';
        case 98: return 'perfect shuffle bits';
        case 99: return 'perfect unshuffle bits';
        case 100: return 'group bits (GRP): select input bits with mask, bits matching mask one go to low order bits of result, others to high order bits of result';
        case 101: return 'ungroup bits (UNGRP): select output bits with mask, deposit contiguous low order bits of input to output positions where mask is one, remaining input bits to where mask is zero';
        case 104: return 'gamma function';
        case 105: return 'loggamma function';
        case 106: return 'lambertw function' + (this.floating ? '' : (' (floating point only, use opindex ' + (opindex + 256) + ')'));
        case 107: return 'bessel J function' + (this.floating ? ' (for any real nu and x, but some large values are not supported and return NaN)' : (' (floating point only, use opindex ' + (opindex + 256) + ')'));
        case 108: return 'error function (complementary if with misc input)';
        default: return 'unknown';
    }
  };

  this.getOpLongName = function() {
    return this.getOpLongNameFor(this.opindex);
  };


  this.update = function(inputs) {
    for(var i = 0; i < this.output.length; i++) this.output[i] = 0;

    var op = this.opindex;

    var selectbegin = this.numa + this.numb + this.numc + this.nummiscin;
    var select = 0;
    for(var i = 0; i < this.numselect; i++) {
      if(inputs[selectbegin + i]) {
        select += (1 << i);
      }
    }

    op += select;

    var signed = this.signed;
    var floating = this.floating;

    if(!signed && (op >= 128 && op < 256)) {
      signed = true;
      op -= 128;
    } else if(!signed && op >= 256) {
      floating = true;
      op -= 256;
    } else if(signed && op >= 128) {
      floating = true;
      op -= 128;
    }

    if(floating) {
      this.updateFloating(inputs, op);
    } else {
      this.updateInteger(inputs, op, signed);
    }
  }

  // first inputs are the data, last the select
  // can handle both signed and unsigned integer case
  this.updateInteger = function(inputs, op, signed) {
    if(inputs.length != this.numa + this.numb + this.numc + this.nummiscin + this.numselect) return false;

    for(var i = 0; i < this.output.length; i++) this.output[i] = 0;

    if(op < 16) signed = false;
    if(op == 26 || op == 27) signed = true;  // neg or abs
    if(op == 55 || op == 90) signed = false;

    var a = math.n0;
    for(var i = 0; i < this.numa; i++) {
      var j = i + this.numb + this.numc;
      if(inputs[j]) a += math.lshift(math.n1, math.B(i)); // +, not |, to support non-BigInt supporting browsers too
    }

    var b = math.n0;
    for(var i = 0; i < this.numb; i++) {
      var j = i + this.numc;
      if(inputs[j]) b += math.lshift(math.n1, math.B(i)); // +, not |, to support non-BigInt supporting browsers too
    }

    var c = math.n0;
    for(var i = 0; i < this.numc; i++) {
      var j = i;
      if(inputs[j]) c += math.lshift(math.n1, math.B(i)); // +, not |, to support non-BigInt supporting browsers too
    }

    if(signed) {
      var na = math.B(this.numa);
      var nb = math.B(this.numb);
      var nc = math.B(this.numb);
      var maska = math.lshift(math.n1, na) - math.n1;
      var maskb = math.lshift(math.n1, nb) - math.n1;
      var maskc = math.lshift(math.n1, nc) - math.n1;
      var maxa = math.lshift(math.n1, na - math.n1) - math.n1;
      var maxb = math.lshift(math.n1, nb - math.n1) - math.n1;
      var maxc = math.lshift(math.n1, nc - math.n1) - math.n1;
      if(a > maxa) a = (a - maska - math.n1);
      if(op != 54 && b > maxb) b = (b - maskb - math.n1);
      if(c > maxc) c = (c - maskc - math.n1);
    }

    // without bigint, normally up to 31 bits are supported, for a few ops supporting up to 53 is essential, such as the date format input
    if(op == 90 && !math.supportbigint) {
      a = math.n0;
      var shift = math.n1;
      for(var i = 0; i < this.numa; i++) {
        var j = i + this.numb + this.numc;
        if(inputs[j]) a += shift;
        shift *= math.n2;
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
        var a2 = math.n0;
        while(n < this.numo) {
          a2 |= math.supportbigint ? (a << BigInt(n)) : (a << n);
          n += this.numa;
        }
        a = a2;
      }

      if(this.numb > 0) {
        n = 0;
        var b2 = math.n0;
        while(n < this.numo) {
          b2 |= math.supportbigint ? (b << BigInt(n)) : (b << n);
          n += this.numb;
        }
        b = b2;
      }
    }

    var miscin = 0;
    if(this.nummiscin) miscin = inputs[this.numa + this.numb + this.numc];

    var o = math.n0; // output


    var overflow = false;
    if(op == 0) {
      o = math.n0;
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
    } else if(op == 11) {
      o = a | ~b; // b imply a
    } else if(op == 12) {
      o = ~a;
    } else if(op == 13) {
      o = b | ~a; // a imply b
    } else if(op == 14) {
      o = ~(a & b);
    } else if(op == 15) {
      // all ones
      if(math.supportbigint) {
        o = math.n1 << BigInt(this.numo);
        o = ~o;
      } else {
        o = 0x7fffffff;
      }
    } else if(op == 16) {
      // add
      o = a + b;
      if(miscin) o++;
      if(this.numc) {
        if(c == 0) {
          overflow = true;
          o = math.n0;
        } else {
          o = math.mod(o, c);
        }
      }
    } else if(op == 17) {
      // sub
      o = a - b;
      if(miscin) o--;
      if(this.numc) {
        if(c == 0) {
          overflow = true;
          o = math.n0;
        } else {
          o = math.mod(o, c);
        }
      }
    } else if(op == 18) {
      // mul
      o = a * b;
      if(this.numc) {
        if(c == 0) {
          overflow = true;
          o = math.n0;
        } else {
          o = math.mod(o, c);
        }
      }
    } else if(op == 19) {
      // truncating division (rounds towards zero)
      if(b == 0 || (this.numc && c == 0)) {
        o = math.n0;
        overflow = true;
      } else {
        o = math.truncdiv(a, b);
        if(this.numc) o = math.mod(o, c);
      }
    } else if(op == 20) {
      // remainder of truncating division
      if(b == 0) {
        overflow = true;
      } else {
        o = a % b;
      }
    } else if(op == 21) {
      // floor division (rounds towards -Infinity)
      if(b == 0 || (this.numc && c == 0)) {
        o = math.n0;
        overflow = true;
      } else {
        o = math.floordiv(a, b);
        if(this.numc) o = math.mod(o, c);
      }
    } else if(op == 22) {
      if(b == 0) {
        overflow = true;
      } else {
        o = math.mod(a, b);
      }
    } else if(op == 23) {
      // carryless multiply (like multiply, but layers are XORed instead of ADDed)
      var s = a;
      // BigInt does not support >>> and negative values would cause infinite loop, but neg value goes towards -1 so check that value too
      while(b != 0 && b != -1) {
        if(b & math.n1) o ^= s;
        b >>= math.n1;
        s <<= math.n1;
      }
    } else if(op == 24) {
      o = a + math.n1;
      if(miscin) o++;
    } else if(op == 25) {
      o = a - math.n1;
      if(miscin) o--;
    } else if(op == 26) {
      o = -a;
    } else if(op == 27) {
      o = (a < 0) ? -a : a;
    } else if(op == 28) {
      if(this.numb) {
        // copysign
        o = a;
        if((b < 0) != (a < 0)) o = -a;
        if(b == 0) o = math.n0;
      } else {
        // sign
        o = (a == 0) ? math.n0 : ((a > 0) ? math.n1 : -math.n1);
      }
    } else if(op == 31) {
      o = a;
    } else if(op == 32) {
      // equals
      if(this.numc) {
        if(c == 0) overflow = true;
        else o = (math.mod(a - b, c) == 0) ? math.n1 : math.n0;
      } else {
        o = (a == b) ? math.n1 : math.n0;
      }
    } else if(op == 33) {
      o = (a < b) ? math.n1 : math.n0;
    } else if(op == 34) {
      o = (a <= b) ? math.n1 : math.n0;
    } else if(op == 35) {
      // not equals
      if(this.numc) {
        if(c == 0) overflow = true;
        else o = (math.mod(a - b, c) != 0) ? math.n1 : math.n0;
      } else {
        o = (a != b) ? math.n1 : math.n0;
      }
    } else if(op == 36) {
      o = (a >= b) ? math.n1 : math.n0;
    } else if(op == 37) {
      o = (a > b) ? math.n1 : math.n0;
    } else if(op == 38) {
      o = (a < b) ? a : b;
    } else if(op == 39) {
      o = (a > b) ? a : b;
    } else if(op == 40) {
      if(!this.numb) b = math.n1;
      o = a << b;
    } else if(op == 41) {
      if(!this.numb) b = math.n1;
      o = a >> b;
    } else if(op == 42) {
      // left rotating shift
      if(!this.numb) b = math.n1;
      if(math.supportbigint) {
        o = (a << b) | (a >> (BigInt(this.numa) - b));
      } else {
        o = (a << b) | (a >> (this.numa - b));
      }
    } else if(op == 43) {
      // right rotating shift
      if(!this.numb) b = math.n1;
      if(math.supportbigint) {
        o = (a >> b) | (a << (BigInt(this.numa) - b));
      } else {
        o = (a >> b) | (a << (this.numa - b));
      }
    } else if(op == 48) {
      if(!this.numb) b = math.n2;
      if((b < 0 && a == 0) || (this.numc && c == 0)) {
        overflow = true;
        o = math.n0;
      } else {
        var m = this.numc ? c : ((math.n1 << math.B(this.numo)) - math.n1);
        o = math.modpow(a, b, m);
      }
    } else if(op == 49) {
      if(this.numb > 0) {
        o = math.n0;
        if(a <= 0) {
          overflow = true;
        } else {
          o = math.intlog(a, b);
        }
      } else {
        // integer log2
        o = math.n0;
        if(a <= 0) {
          overflow = true;
        } else {
          o = math.log2(a);
        }
      }
    } else if(op == 50) {
      if(this.numb > 0) {
        var l = math.introot(a, b);
        o = l[0];
        if(l[1]) overflow = true; // error condition
      } else {
        // integer sqrt
        o = math.n0;
        if(a < 0) {
          overflow = true;
        } else {
          o = math.log2(a);
        }
      }
    } else if(op == 54) {
      if(this.numb == 0) {
        // binary to bcd
        var neg = a < 0;
        if(neg) a = -a;
        var s = math.n0;
        while(a > 0) {
          var m = a % math.n10;
          o |= (m << s);
          s += math.n4;
          a = math.supportbigint ? (a / math.n10) : Math.floor(a / 10);
        }
        if(neg) o |= (math.n1 << math.B(this.numo - 1));
      } else {
        // binary to base b (or if misc input, base b+1), using numb as amount of wires per output digit
        var base = b;
        if(miscin) base++;
        if(base < 2) {
          overflow = true;
        } else {
          var neg = a < 0;
          if(neg) a = -a;
          var s = math.n0;
          while(a > 0) {
            var m = a % base;
            o |= (m << s);
            s += math.B(this.numb);
            a = math.floordiv(a, base);
          }
          if(neg) o |= (math.n1 << math.B(this.numo - 1));
        }
      }
    } else if(op == 55) {
      if(this.numb == 0) {
        // bcd to binary
        var neg = !!(a & (math.n1 << math.B(this.numa - 1)));
        if(neg) a ^= (math.n1 << math.B(this.numa - 1));
        var s = math.n1;
        while(a > 0) {
          var m = a & math.n15;
          o += (m * s);
          s *= math.n10;
          a >>= math.n4;
        }
        if(neg) o = -o;
      } else {
        // any base b (or if misc input, base b+1) to binary, using numb as amount of wires per input digit
        var base = b;
        if(miscin) base++;
        if(base < 2) {
          overflow = true;
        } else {
          var mask = (math.n1 << math.B(this.numb)) - math.n1;
          var neg = !!(a & (math.n1 << math.B(this.numa - 1)));
          if(neg) a ^= (math.n1 << math.B(this.numa - 1));
          var s = math.n1;
          while(a > 0) {
            var m = a & mask;
            o += (m * s);
            s *= base;
            a >>= math.B(this.numb);
          }
          if(neg) o = -o;
        }
      }
    } else if(op == 56) {
      // modular inverse, modulo 2^outputbits if 1-input op, module b if 2-input op
      if(this.numb == 0) b = (math.n1 << math.B(this.numo - 1));
      if(a == 0 || b == 0) {
        overflow = true;
      } else {
        o = math.modinv(a, b);
      }
    } else if(op == 57) {
      o = math.gcd(a, b);
    } else if(op == 58) {
      o = math.gcd(a, b);
      if(o != 0) o = a * b / o;
      else overflow = true;
    } else if(op == 59) {
      // factorial. Limited to a size to keep it reasonable.
      // modulo b if a second input is present.
      if(a > 16384) {
        overflow = true;
      } else {
        if(this.numb == 0) b = (math.n1 << math.B(this.numo));
        var f = math.factorial(a, b, (this.numb != 0));
        o = f[0];
        overflow = f[1];
      }
    } else if(op == 60) {
      o = math.binomial(a, b);
      if(o == 0) overflow = true;
    } else if(op == 61) {
      o = math.perfectpow(a);
    } else if(op == 64) {
      p = math.isprime(a, b);
      if(p[1]) {
        overflow = true;
      } else {
        o = p[0] ? math.n1 : math.n0;
      }
    } else if(op == 65) {
      var p = math.nextprime(a, b);
      if(p == -1) {
        overflow = true;
      } else {
        o = p;
      }
    } else if(op == 66) {
      var p = math.prevprime(a, b);
      if(p == -1) {
        overflow = true;
      } else {
        o = p;
      }
    } else if(op == 67) {
      o = math.smallestfactor(a);
      if(o == 0 && a != 0) {
        // failed to find a factor
        overflow = true;
      }
    } else if(op == 68) {
      if(this.numc) {
        o = math.discretelog(a, b, c);
      } else {
        o = math.multiplicativeorder(a, b);
      }
      if(o == -1) {
        o = math.n0;
        overflow = true;
      }
    } else if(op == 69) {
      o = math.ressol(a, b);
      if(o == -1) {
        o = math.n0;
        overflow = true;
      }
    } else if(op == 70) {
      o = math.totient(a);
    } else if(op == 72) {
      // count leading zeroes (clz)
      for(var i = 0; i < this.numa; i++) {
        var j = this.numa - i - 1;
        var nj = math.supportbigint ? BigInt(j) : j;
        if((a >> nj) & math.n1) break;
        o++;
      }
      if(a == 0) overflow = true; // some usages may want to special case this
    } else if(op == 73) {
      // count trailing zeroes (ctz)
      for(var i = 0; i < this.numa; i++) {
        var ni = math.supportbigint ? BigInt(i) : i;
        if((a >> ni) & math.n1) break;
        o++;
      }
      if(a == 0) overflow = true; // some usages may want to special case this
    } else if(op == 74) {
      // popcount
      o = math.n0;
      if(a >= 0) {
        while(a > 0) {
          if(a & math.n1) o++;
          a >>= math.n1;
        }
      } else {
        overflow = true; // popcount not supported for negative numbers. TODO: support it, use twos complement notation (will do same as unsigned popcount operation then)
      }
    } else if(op == 76) {
      // PEXT bits. NOTE: very similar to GRP, but not a permutation so positioned under bit ops instead
      var n = Math.max(Math.max(this.numa, this.numb), this.numo);
      var s = math.n0;
      for(var i = math.n0; i < n; i++) {
        var bit = (a >> i) & math.n1;
        if((b >> i) & math.n1) {
          o |= (bit << s);
          s++;
        }
      }
    } else if(op == 77) {
      // PDEP bits. NOTE: very similar to UNGRP, but not a permutation so positioned under bit ops instead
      var n = Math.max(Math.max(this.numa, this.numb), this.numo);
      var s = math.n0;
      for(var i = math.n0; i < n; i++) {
        if((b >> i) & math.n1) {
          o |= (((a >> s) & math.n1) << i);
          s++;
        }
      }
    } else if(op == 80) {
      // sine, with full input period scaled in the full integer range, and scaled output to fit full output integer range
      // with 8-bit int as example and with for internal values [] meaning closed interval and [) meaning half-open interval (for signed int due to different magnitude of largest neg and pos value):
      // for unsigned: input 0..255 scaled to [0..pi/2], output [0..1] scaled to 0..255
      // for signed: input -128..127 scaled to [-pi..pi), output [-1..1] scaled to -128..127 (even sized buckets, e.g. output value 0 is for mathematical output values [0..2.0/256))
      var ascale = math.n1 << math.B(this.numa);
      var ascale2 = math.n1 << math.B(this.numa - 1);
      var oscale = math.n1 << math.B(this.numo);
      var oscale2 = math.n1 << math.B(this.numo - 1);
      if(signed) {
        var f = Number(a) / (Number(ascale2));
        f *= Math.PI;
        f = Math.sin(f);
        o = math.B(Math.floor(f * (Number(oscale2) - 0))); // - 0 instead of - 1 on purpose, see next line why
        if(o >= oscale2) o--; // e.g. for 8-bit, allow outputting -128 as minimum, but +127 max (+128 would overflow to -128), so that the sine uses full available output range, best for plasma's etc...
        // fix numerical imprecisions of a few common values
        if(a == 0) o = math.n0;
        if(a == -ascale2) o = math.n0;
      } else {
        var f = Number(a) / (Number(ascale) - 1);
        f *= Math.PI * 0.5;
        f = Math.sin(f);
        o = math.B(Math.floor(f * (Number(oscale) - 1)));
      }
    } else if(op == 81) {
      // arcsine, with full input scaled in the full integer range, and scaled output period to fit full output integer range
      // with 8-bit int as example and with for floats [] meaning closed interval and [) meaning half-open interval (for signed int due to different magnitude of largest neg and pos value):
      // for unsigned: input 0..255 scaled to [0..1], output [0..pi/2] scaled to 0..255
      // for signed: input -128..127 scaled to [-1..1), output [-pi..pi) scaled to -127..127 (note that the function mathematically only outputs -pi/2..pi/2 so -64..64, and that range not fully reached due to halfopen input interval. -pi..pi range is used for consistency with sin, cos and acos)
      var ascale = math.n1 << math.B(this.numa);
      var ascale2 = math.n1 << math.B(this.numa - 1);
      var oscale = math.n1 << math.B(this.numo);
      var oscale2 = math.n1 << math.B(this.numo - 1);
      if(signed) {
        var f = Number(a) / (Number(ascale2));
        f = Math.asin(f);
        f /= Math.PI;
        o = math.B(Math.floor(f * (Number(oscale2) - 1)));
      } else {
        var f = Number(a) / (Number(ascale) - 1);
        f = Math.asin(f);
        f /= (Math.PI * 0.5);
        o = math.B(Math.floor(f * (Number(oscale) - 1)));
      }
    } else if(op == 82) {
      // cosine, with full input period scaled in the full integer range, and scaled output to fit full output integer range
      // with 8-bit int as example and with for internal values [] meaning closed interval and [) meaning half-open interval (for signed int due to different magnitude of largest neg and pos value):
      // for unsigned: input 0..255 scaled to [0..pi/2], output [0..1] scaled to 0..255
      // for signed: input -128..127 scaled to [-pi..pi), output [-1..1] scaled to -128..127
      var ascale = math.n1 << math.B(this.numa);
      var ascale2 = math.n1 << math.B(this.numa - 1);
      var oscale = math.n1 << math.B(this.numo);
      var oscale2 = math.n1 << math.B(this.numo - 1);
      if(signed) {
        var f = Number(a) / (Number(ascale2));
        f *= Math.PI;
        f = Math.cos(f);
        o = math.B(Math.floor(f * (Number(oscale2) - 0))); // - 0 instead of - 1 on purpose, see next line why
        if(o >= oscale2) o--; // e.g. for 8-bit, allow outputting -128 as minimum, but +127 max (+128 would overflow to -128), so that the cosine uses full available output range, best for plasma's etc...
      } else {
        var f = Number(a) / (Number(ascale) - 1);
        f *= Math.PI * 0.5;
        f = Math.cos(f);
        o = math.B(Math.floor(f * (Number(oscale) - 1)));
      }
    } else if(op == 83) {
      // arccosine, with full input scaled in the full integer range, and scaled output period to fit full output integer range
      // with 8-bit int as example and with for floats [] meaning closed interval and [) meaning half-open interval (for signed int due to different magnitude of largest neg and pos value):
      // for unsigned: input 0..255 scaled to [0..1], output [0..pi/2] scaled to 0..255
      // for signed: input -128..127 scaled to [-1..1), output [-pi..pi) scaled to -127..127 (note that the function mathematically only outputs 0..pi so 0..127, and that range not fully reached due to halfopen input interval. -pi..pi range is used for consistency with sin, asin and cos)
      var ascale = math.n1 << math.B(this.numa);
      var ascale2 = math.n1 << math.B(this.numa - 1);
      var oscale = math.n1 << math.B(this.numo);
      var oscale2 = math.n1 << math.B(this.numo - 1);
      if(signed) {
        var f = Number(a) / (Number(ascale2));
        f = Math.acos(f);
        f /= Math.PI;
        o = math.B(Math.floor(f * (Number(oscale2) - 1)));
      } else {
        var f = Number(a) / (Number(ascale) - 1);
        f = Math.acos(f);
        f /= (Math.PI * 0.5);
        o = math.B(Math.floor(f * (Number(oscale) - 1)));
      }
    } else if(op == 84) {
        // tan, with input limited to 0..pi/4 (-pi/4..pi/4 if signed) and output 0..1 (-1..1 if signed) (scaled to fit in the full input/output bits)
      var ascale = math.n1 << math.B(this.numa);
      var oscale = math.n1 << math.B(this.numo);
      var scaled = Number(a) / (Number(ascale) * (signed ? 0.5 : 1)); // full input bit range scaled to -1..1 for signed, 0..1 for unsigned
      var f = scaled * Math.PI / 4;
      f = Math.tan(f);
      f = Math.min(Math.max(signed ? -1 : 0, f), 1);
      o = math.B(Math.floor(f * (Number(oscale) * (signed ? 0.5 : 1))));
    } else if(op == 85) {
      var ascale = math.n1 << math.B(this.numa);
      var oscale = math.n1 << math.B(this.numo);
      if(this.numb) {
        // atan2
        // range 0..1 if unsigned, -1..1 if signed
        var ascale2 = math.n1 << math.B(this.numa);
        var oscale2 = math.n1 << math.B(this.numo);
        var bscale = math.n1 << math.B(this.numb);
        var bscale2 = math.n1 << math.B(this.numb - 1);
        var a2 = Number(a) / Number(signed ? ascale2 : ascale);
        var b2 = Number(b) / Number(signed ? bscale2 : bscale);
        var f = Math.atan2(a2, b2);
        // if signed, f has range -pi to pi, map to -1..1. if unsigned it has range 0 to pi/2,  map it to range 0..1
        if(signed) f = f / Math.PI;
        else f = f / (Math.PI / 2);
        o = Math.floor(f * Number(signed ? oscale2 : oscale) - 1);
        o = math.B(o);
        if(!a && !b) overflow = true;
      } else {
        // arctan, with input limited to 0..1 (unsigned) or -1..1 (signed) and output 0..pi/4 or -pi/4..pi/4 (scaled to fit in the full input/output bits)
        var scaled = Number(a) / (Number(ascale) * (signed ? 0.5 : 1)); // full input bit range scaled to -1..1 for signed, 0..1 for unsigned
        var f = Math.atan(scaled);
        f /= Math.PI / 4;
        f = Math.min(Math.max(signed ? -1 : 0, f), 1);
        o = math.B(Math.floor(f * (Number(oscale) * (signed ? 0.5 : 1))));
      }
    } else if(op == 86) {
      // ln, with input scaled from 1 to e, so output is scaled from 0 to 1
      var ascale = math.n1 << math.B(this.numa);
      var ascale2 = math.n1 << math.B(this.numa - 1);
      var oscale = math.n1 << math.B(this.numo);
      var oscale2 = math.n1 << math.B(this.numo - 1);
      if(signed) a += ascale2;
      var f = 1 + Number(a) * (Math.E - 1) / (Number(ascale) - 0);
      f = Math.log(f);
      o = Math.floor(f * (Number(oscale) - 1));
      if(math.supportbigint) o = BigInt(o);
      if(signed) o -= oscale2;
    } else if(op == 87) {
      // exp, with input scaled from 0 to 1, so output scaled from 1 to e
      var ascale = math.n1 << math.B(this.numa);
      var ascale2 = math.n1 << math.B(this.numa - 1);
      var oscale = math.n1 << math.B(this.numo);
      var oscale2 = math.n1 << math.B(this.numo - 1);
      if(signed) a += ascale2;
      var f = Number(a) / (Number(ascale) - 0);
      f = Math.exp(f);
      f = (f - 1) / (Math.E - 1); // make in range 0..1
      o = Math.floor(f * (Number(oscale) - 1));
      if(math.supportbigint) o = BigInt(o);
      if(signed) o -= oscale2;
    } else if(op == 88) {
      if(!this.prevo || ((a & math.n1) && !(this.preva & math.n1))) {
        var date = new Date();
        var seconds = Math.floor(date.getTime() / 1000);
        // JS returns the unix time in UTC. However, in logicemu use the local timezone instead:
        // we could base everything on UTC and take users' timezone into account, but we can't know for
        // sure if their system is set up correctly. Keep it simple, just use local time. This does mean
        // that the unix time here does not perfectly fullfill the definition of "seconds since 1970-1-1 UTC",
        // it's seconds since 1970-1-1 in local timezone instead.
        seconds -= date.getTimezoneOffset() * 60;
        o = math.B(seconds);
      } else {
        o = this.prevo;
      }
      this.preva = a;
      this.prevo = o;
    } else if(op == 89) {
      var date = new Date(Number(a) * 1000);
      // Using the UTC methods makes the math independent of the location.
      var seconds = date.getUTCSeconds();
      var minutes = date.getUTCMinutes();
      var hours = date.getUTCHours();
      var day = date.getUTCDate();
      var month = date.getUTCMonth() + 1;
      var year = date.getUTCFullYear();
      if(isNaN(seconds)) {
        overflow = true;
      } else {
        o = math.B(seconds) + math.B(minutes << 6) + math.B(hours << 12) + math.B(day << 17) + math.B(month << 22);
        var y = math.B(year) * math.B(1 << 26);
        o += y;
      }
    } else if(op == 90) {
      var seconds = Number(a & math.B(63));
      var minutes = Number((a >> math.B(6) & math.B(63)));
      var hours = Number((a >> math.B(12) & math.B(31)));
      var day = Number((a >> math.B(17) & math.B(31)));
      var month = Number((a >> math.B(22) & math.B(15)));
      var year = math.supportbigint ? Number(a >> math.B(26)) : Math.floor(Number(a) / (1 << 26));
      //var date = new Date(year, month - 1, day, hours, minutes, seconds);
      var date = new Date();
      date.setUTCFullYear(year);
      date.setUTCMonth(month - 1);
      date.setUTCDate(day);
      date.setUTCHours(hours);
      date.setUTCMinutes(minutes);
      date.setUTCSeconds(seconds);
      var unix = Math.floor(+date / 1000);
      o = math.B(unix);
    } else if(op == 95) {
      if((miscin && !this.prevmiscin) || (this.prevo == undefined)) {
        if(!this.numa) {
          for(var i = 0; i < this.numo; i++) {
            if(Math.random() < 0.5) {
              var ni = math.B(i);;
              o |= (math.n1 << ni);
            }
          }
        } else if(!this.numb) {
          // 1 input, random value is in range 0..a (excluding a itself)
          var rb;
          if(math.supportbigint) {
            o = math.B(Math.floor(Math.random() * 4294967296)) * a / math.B(4294967296);
            //o = math.B(Math.floor(Math.random() * 4294967296)) * (a + math.n1) / math.B(4294967296);
          } else {
            o = Math.floor(a * Math.random());
            //o = Math.floor((a + 1) * Math.random());
          }
        } else {
          // 2 inputs, random value is in range a..b (excluding b itself, b == a returns a, b < a returns unspecified result)
          var rb;
          if(math.supportbigint) {
            o = a + math.B(Math.floor(Math.random() * 4294967296)) * (b - a) / math.B(4294967296);
            //o = math.B(Math.floor(Math.random() * 4294967296)) * (a + math.n1) / math.B(4294967296);
          } else {
            o = a + Math.floor((b - a) * Math.random());
            //o = Math.floor((a + 1) * Math.random());
          }
        }
        this.prevo = o;
      } else {
        o = this.prevo;
      }
      this.prevmiscin = miscin;
    } else if(op == 96) {
      // mirror bits
      for(var i = 0; i < this.numo; i++) {
        var j = this.numo - i - 1;
        var ni = math.supportbigint ? BigInt(i) : i;
        var nj = math.supportbigint ? BigInt(j) : j;
        o |= (((a >> ni) & math.n1) << nj);
      }
    } else if(op == 97) {
      // "bit reversal" (mirror bit indices) (requires power of two bitsize to be a permutation)
      for(var i = 0; i < this.numo; i++) {
        // mirror bits of i and store result in j
        var j = 0;
        var l2 = 0;
        while((1 << l2) < this.numo) l2++; // ceiling log2 of numo
        for(var l = 0; l < l2; l++) {
          j <<= 1;
          j |= ((i >> l) & 1);
        }
        var ni = math.B(i);
        var nj = math.B(j);
        o |= (((a >> ni) & math.n1) << nj);
      }
    } else if(op == 98) {
      // perfect shuffle bits
      var mid = (this.numo >> 1);
      for(var i = 0; i < this.numo; i++) {
        var j = (i < mid) ? (i * 2) : ((i - mid) * 2 + 1);
        var ni = math.B(i);
        var nj = math.B(j);
        o |= (((a >> ni) & math.n1) << nj);
      }
    } else if(op == 99) {
      // perfect unshuffle bits
      var mid = (this.numo >> 1);
      for(var i = 0; i < this.numo; i++) {
        var j = (i < mid) ? (i * 2) : ((i - mid) * 2 + 1);
        var ni = math.B(i);
        var nj = math.B(j);
        o |= (((a >> nj) & math.n1) << ni);
      }
    } else if(op == 100) {
      // GRP bits
      var n = Math.max(Math.max(this.numa, this.numb), this.numo);
      var r0 = math.n0;
      var r1 = math.n0;
      var s0 = math.n0;
      var s1 = math.n0;
      for(var i = math.n0; i < n; i++) {
        var bit = (a >> i) & math.n1;
        if((b >> i) & math.n1) {
          r1 |= (bit << s1);
          s1++;
        } else {
          r0 |= (bit << s0);
          s0++;
        }
      }
      o = (r0 << s1) | r1;
    } else if(op == 101) {
      // UNGRP bits
      var n = Math.max(Math.max(this.numa, this.numb), this.numo);
      var s = math.n0;
      for(var i = math.n0; i < n; i++) {
        if((b >> i) & math.n1) {
          o |= (((a >> s) & math.n1) << i);
          s++;
        }
      }
      for(var i = math.n0; i < n; i++) {
        if(!((b >> i) & math.n1)) {
          o |= (((a >> s) & math.n1) << i);
          s++;
        }
      }
    } else if(op == 104) {
      // similar to op==59, but gamma function instead of factorial
      // Limited to a size to keep it reasonable.
      // modulo b if a second input is present.
      a--; // gamma function instead of factorial
      if(a > 16384) {
        overflow = true;
      } else {
        if(this.numb == 0) b = (math.n1 << math.B(this.numo));
        var f = math.factorial(a, b, (this.numb != 0));
        o = f[0];
        overflow = f[1];
      }
    } else if(op == 105) {
      // float-only function not supported by int (lambertw)
    } else if(op == 106) {
      // float-only function not supported by int (lambertw)
    } else if(op == 107) {
      // float-only function not supported by int (besselj)
    } else if(op == 108) {
      // erf, scaled to range 0..1 or -1..1 in full integer range
      var ascale = math.n1 << math.B(this.numa);
      var oscale = math.n1 << math.B(this.numo);
      var scaled = Number(a) / (Number(ascale) * (signed ? 0.5 : 1)); // full input bit range scaled to -1..1 for signed, 0..1 for unsigned
      var f = miscin ? math.erfc(scaled) : math.erf(scaled);
      f = Math.min(Math.max(signed ? -1 : 0, f), 1);
      o = math.B(Math.floor(f * (Number(oscale) * (signed ? 0.5 : 1))));
    } else {
      o = math.n0;
    }

    if(math.supportbigint) {
      if(o < 0) {
        if(o < BigInt.asIntN(this.numo, o)) overflow = true;
      } else {
        if(o > BigInt.asUintN(this.numo, o)) overflow = true;
      }
      o = BigInt.asUintN(this.numo, o);
      for(var i = 0; i < this.numo; i++) {
        if(o & math.n1) this.output[i] = 1;
        o >>= math.n1;
      }
      if((overflow) && this.nummiscout) this.output[this.numo] = 1; // overflow. In case of add, this can serve as carry if you have exactly 1 output too short.
    } else {
      if(op != 89) {
        if(o > 0x7fffffff || o < -0x7fffffff) overflow = true; // overflow of JS number
        o &= 0xffffffff; // ensure behaves as integer, including sign. JS binary operations uses 32-bit signed integers.
        // overflow of circuit's output size
        for(var i = 0; i < this.numo; i++) {
          this.output[i] = (o & 1);
          o >>= 1;
        }
        if(o == -1) o = 0; // right shifted negative integer will become -1. But o will be compared to 0 for overflow detection below, not taking negative ones into account. So set to 0 to indicate no overflow from o.
      } else {
        // for a few rare exceptions, the op supports more than 31 bits, up to 53. Essential for the date representation to have enough year bits.
        for(var i = 0; i < this.numo; i++) {
          this.output[i] = (o & 1);
          o = Math.floor(o / 2);
        }
      }
      if((o != 0 || overflow) && this.nummiscout) this.output[this.numo] = 1; // overflow. In case of add, this can serve as carry if you have exactly 1 output too short.
    }
  };

  this.updateFloating = function(inputs, op) {
    var read = function(inputs, pos, mantissabits, expbits) {
      var mantissa = 0;
      var exponent = 0;
      var sign = 1;
      var mul = 1; // can't use shift due to JS only supporting that up to 32 bits (when not using BigInt) and mantissa can go up to 52
      for(var i = 0; i < mantissabits; i++) {
        mantissa += inputs[pos + i] * mul;
        mul *= 2;
      }
      for(var i = 0; i < expbits; i++) {
        exponent |= (inputs[pos + mantissabits + i] << i);
      }
      sign = inputs[pos + mantissabits + expbits] ? 1 : 0;
      return math.createfloat(sign, exponent, mantissa, expbits, mantissabits);
    };

    var readint = function(inputs, pos, bits, signed) {
      var mul = 1;
      var result = 0;
      for(var i = 0; i < bits; i++) {
        result += inputs[pos + i] * mul;
        mul *= 2;
      }
      if(signed) {
        var s = Math.pow(2, bits - 1);
        if(result >= s) result -= s * 2;
      }
      return result;
    };

    var write = function(f, output, pos, mantissabits, expbits) {
      var p = math.dissectfloat(f, expbits, mantissabits);
      var conv = p[2].toString(2); // can't use shift due to JS only supporting that up to 32 bits (when not using BigInt) and mantissa can go up to 52
      for(var i = 0; i < mantissabits; i++) {
        output[pos + i] = (i < conv.length) ? (conv[conv.length - i - 1] == '1' ? 1 : 0) : 0;
      }
      for(var i = 0; i < expbits; i++) {
        output[pos + mantissabits + i] = ((p[1] & (1 << i)) ? 1 : 0);
      }
      output[pos + mantissabits + expbits] = p[0];
    };

    var a = 0, b = 0, c = 0, o = 0;
    var pos = 0;
    var posa = 0, posb = 0, posc = 0;
    if(this.numc) {
      posc = pos;
      c = read(inputs, pos, this.numc_mant, this.numc_exp);
      pos += this.numc;
    }
    if(this.numb) {
      posb = pos;
      b = read(inputs, pos, this.numb_mant, this.numb_exp);
      pos += this.numb;
    }
    if(this.numa) {
      posa = pos;
      a = read(inputs, pos, this.numa_mant, this.numa_exp);
      pos += this.numa;
    }

    var miscin = 0;
    if(this.nummiscin) {
      miscin = inputs[pos];
      pos++;
    }

    var out_uint = false; // use output as unsigned integer bits
    var out_int = false; // use output as signed integer bits

    if(op == 0) {
      // from uint
      o = readint(inputs, posa, this.numa_mant + this.numa_exp + 1, false);
    } else if(op == 1) {
      // to uint
      o = Math.round(a);
      out_uint = true;
    } else if(op == 2) {
      // from int
      o = readint(inputs, posa, this.numa_mant + this.numa_exp + 1, true);
    } else if(op == 3) {
      // to int
      o = Math.round(a);
      out_int = true;
    } else if(op == 4) {
      // from uint, scaled
      var scale = Math.pow(2, this.numa_mant + this.numa_exp + 1) - 1;
      if(miscin) scale++; // make 1 exclusive instead of inclusive
      var mul = 1, add = 0;
      if(this.numb && !this.numc) {
        mul = readint(inputs, posb, this.numb_mant + this.numb_exp + 1, false);
      } else if(this.numb && this.numc) {
        var ia = readint(inputs, posb, this.numb_mant + this.numb_exp + 1, false);
        var ib = readint(inputs, posc, this.numc_mant + this.numc_exp + 1, false);
        mul = ib - ia;
        add = ia;
      }
      o = readint(inputs, posa, this.numa_mant + this.numa_exp + 1, false);
      o /= scale;
      o = o * mul + add;
    } else if(op == 5) {
      // to uint, scaled
      var scale = Math.pow(2, this.numo_mant + this.numo_exp + 1) - 1;
      if(miscin) scale++; // make 1 exclusive instead of inclusive
      o = Math.min(Math.max(0, Math.round(a * scale)), scale - 1);
      out_uint = true;
    } else if(op == 6) {
      // from int, scaled
      if(!this.numb) {
        var scale = Math.pow(2, this.numa_mant + this.numa_exp) - 1;
        if(miscin) scale++; // make 1 exclusive instead of inclusive
        o = readint(inputs, posa, this.numa_mant + this.numa_exp + 1, true);
        o /= scale;
      } else {
        var scale = Math.pow(2, this.numa_mant + this.numa_exp + 1) - 1;
        if(miscin) scale++; // make 1 exclusive instead of inclusive
        var mul = 1, add = 0;
        if(this.numb && !this.numc) {
          mul = readint(inputs, posb, this.numb_mant + this.numb_exp + 1, true);
        } else if(this.numb && this.numc) {
          var ia = readint(inputs, posb, this.numb_mant + this.numb_exp + 1, true);
          var ib = readint(inputs, posc, this.numc_mant + this.numc_exp + 1, true);
          mul = ib - ia;
          add = ia;
        }
        o = readint(inputs, posa, this.numa_mant + this.numa_exp + 1, false);
        o /= scale;
        o = o * mul + add;
      }
    } else if(op == 7) {
      var scale = Math.pow(2, this.numo_mant + this.numo_exp) - 1;
      if(miscin) scale++; // make 1 exclusive instead of inclusive
      // to int, scaled
      o = Math.min(Math.max(-scale, Math.round(a * scale)), scale - 1);
      out_int = true;
    } else if(op == 8) {
      o = Math.floor(a);
    } else if(op == 9) {
      o = Math.ceil(a);
    } else if(op == 10) {
      o = Math.round(a);
    } else if(op == 11) {
      o = (a < 0) ? Math.ceil(a) : Math.floor(a);
    } else if(op == 12) {
      // extract exponent bits (raw, keep bias)
      o = readint(inputs, posa + this.numa_mant, this.numa_exp, false);
      out_uint = true;
    } else if(op == 13) {
      // extract mantissa bits
      o = readint(inputs, posa, this.numa_mant, false);
      out_uint = true;
    } else if(op == 14) {
      o = Math.PI;
      if(this.numb) o *= b;
    } else if(op == 15) {
      o = Math.E;
      if(this.numb) o *= b;
    } else if(op == 16) {
      o = a + b;
      if(miscin) o++;
    } else if(op == 17) {
      o = a - b;
      if(miscin) o--;
    } else if(op == 18) {
      o = a * b;
    } else if(op == 19) {
      o = a / b;
    } else if(op == 20) {
      // fmod
      o = a % b;
    } else if(op == 21) {
      // floordiv actually designed for int, but simply do as the name imples
      o = Math.floor(a / b);
    } else if(op == 22) {
      o = (a - b * Math.floor(a / b));
    } else if(op == 23) {
      return 0; // carryless mul not supported for float
    } else if(op == 24) {
      o = a + 1;
      if(miscin) o++;
    } else if(op == 25) {
      o = a - 1;
      if(miscin) o--;
    } else if(op == 26) {
      o = -a;
    } else if(op == 27) {
      o = (a < 0) ? -a : a;
    } else if(op == 28) {
      if(this.numb) {
        // copysign
        o = a;
        if((b < 0) != (a < 0)) o = -a;
        if(b == 0) o = 0;
      } else {
        // sign
        o = (a == 0) ? 0 : ((a > 0) ? 1 : -1);
      }
    } else if(op == 31) {
      o = a;
    } else if(op == 32) {
      o = (a == b) ? 1 : 0;
    } else if(op == 33) {
      o = (a < b) ? 1 : 0;
    } else if(op == 34) {
      o = (a <= b) ? 1 : 0;
    } else if(op == 35) {
      o = (a != b) ? 1 : 0;
    } else if(op == 36) {
      o = (a >= b) ? 1 : 0;
    } else if(op == 37) {
      o = (a > b) ? 1 : 0;
    } else if(op == 38) {
      o = (a < b) ? a : b;
    } else if(op == 39) {
      o = (a > b) ? a : b;
    } else if(op == 40) {
      if(!this.numb) b = 1;
      o = a * Math.pow(2, b);
    } else if(op == 41) {
      if(!this.numb) b = 1;
      o = a * Math.pow(0.5, b);
    } else if(op == 42) {
      o = 0; // left rotating shift not supported for float
    } else if(op == 43) {
      o = 0; // right rotating shift not supported for float
    } else if(op == 48) {
      o = this.numb ? Math.pow(a, b) : (a * a);
    } else if(op == 49) {
      o = this.numb ? (Math.log(a) / Math.log(b)) : (Math.log(a) / Math.log(2));
    } else if(op == 50) {
      o = this.numb ? Math.pow(a, 1 / b) : Math.sqrt(a);
    } else if(op == 54) {
      o = 0;  // binary to bcd / base conversion not supported for float
    } else if(op == 55) {
      o = 0;  // bcd to binary / base conversion not supported for float
    } else if(op == 56) {
      o = 0; // number theory integer ops not supported for float
    } else if(op == 57) {
      o = 0; // number theory integer ops not supported for float
    } else if(op == 58) {
      o = 0; // number theory integer ops not supported for float
    } else if(op == 59) {
      o = math.gamma(a + 1);
    } else if(op == 60) {
      o = 0; // number theory integer ops not supported for float
    } else if(op == 61) {
      o = 0; // number theory integer ops not supported for float
    } else if(op == 64) {
      o = 0; // number theory integer ops not supported for float
    } else if(op == 65) {
      o = 0; // number theory integer ops not supported for float
    } else if(op == 66) {
      o = 0; // number theory integer ops not supported for float
    } else if(op == 67) {
      o = 0; // number theory integer ops not supported for float
    } else if(op == 68) {
      o = 0; // number theory integer ops not supported for float
    } else if(op == 69) {
      o = 0; // number theory integer ops not supported for float
    } else if(op == 70) {
      o = 0; // number theory integer ops not supported for float
    } else if(op == 72) {
      o = 0; // bit ops not supported for float
    } else if(op == 73) {
      o = 0; // bit ops not supported for float
    } else if(op == 74) {
      o = 0; // bit ops not supported for float
    } else if(op == 76) {
      o = 0; // bit ops not supported for float
    } else if(op == 77) {
      o = 0; // bit ops not supported for float
    } else if(op == 80) {
      o = Math.sin(a);
    } else if(op == 81) {
      o = Math.asin(a);
    } else if(op == 82) {
      o = Math.cos(a);
    } else if(op == 83) {
      o = Math.acos(a);
    } else if(op == 84) {
      o = Math.tan(a);
    } else if(op == 85) {
      if(this.numb) {
        o = Math.atan2(a, b);
      } else {
        o = Math.atan(a);
      }
    } else if(op == 86) {
      o = Math.log(a);
    } else if(op == 87) {
      o = Math.exp(a);
    } else if(op == 89) {
      o = 0; // time/date ops not supported for float
    } else if(op == 90) {
      o = 0; // time/date ops not supported for float
    } else if(op == 95) {
      if((miscin && !this.prevmiscin) || (this.prevo == undefined)) {
        if(!this.numa) {
          o = Math.random();
        } else if(!this.numb) {
          // 1 input, random value is in range 0..a (excluding a itself)
          o = Math.random() * a;
        } else {
          o = Math.random() * (b - a) + a;
        }
        this.prevo = o;
      } else {
        o = this.prevo;
      }
      this.prevmiscin = miscin;
    } else if(op == 96) {
      o = 0; // bit ops not supported for float
    } else if(op == 97) {
      o = 0; // bit ops not supported for float
    } else if(op == 98) {
      o = 0; // bit ops not supported for float
    } else if(op == 99) {
      o = 0; // bit ops not supported for float
    } else if(op == 100) {
      o = 0; // bit ops not supported for float
    } else if(op == 101) {
      o = 0; // bit ops not supported for float
    } else if(op == 104) {
      o = math.gamma(a);
    } else if(op == 105) {
      o = math.loggamma(a);
    } else if(op == 106) {
      o = math.lambertw(a);
    } else if(op == 107) {
      o = this.numb ? math.besselj(a, b) : math.besselj(0, a);
    } else if(op == 108) {
      o = miscin ? math.erfc(a) : math.erf(a);
    } else {
      o = 0;
    }

    var outflag = 0;
    if(out_int || out_uint) {
      if(o < 0) {
        if(out_int) {
          var max = Math.pow(2, this.numo_mant + this.numo_exp + 1);
          if(o * 2 < -max) outflag = 1;
          o = max + o;
        } else {
          var max2 = Math.pow(2, this.numo_mant + this.numo_exp + 2);
          outflag = 1;
          o = max + o;
        }
      } else {
        if(out_int) {
          var max = Math.pow(2, this.numo_mant + this.numo_exp + 1);
          if(o * 2 >= max) outflag = 1;
        }
      }
      var conv = o.toString(2);
      var bits = this.numo_mant + this.numo_exp + 1;
      for(var i = 0; i < bits; i++) {
        this.output[i] = (i < conv.length) ? (conv[conv.length - i - 1] == '1' ? 1 : 0) : 0;
      }
      if(conv.length > bits) outflag = 1;
    } else {
      write(o, this.output, 0, this.numo_mant, this.numo_exp);
    }
    this.output[this.numo_mant + this.numo_exp + 1] = outflag;
  };

  this.setError = function(text) {
    this.error = true;
    if(!this.errormessage) this.errormessage = text;
  };

  // init before inputs are resolved
  // returns true if ok, false if error
  this.init1 = function(array) {
    this.parent = null; // the parent component for this Mux

    largeComponentBB(array, false, this);
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        if(c.circuitsymbol == 'U' || c.circuitsymbol == '#U') {
          this.parent = c.components[0] || c.components[1];
          break;
        }
      }
      if(this.parent) break;
    }

    if(!this.parent) {
      this.setError('no parent component found');
      return false;
    }
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        //if(c.components[0] == this.parent) continue;
        /*if(!c.components[0]) {
          c.components[0] = this.parent;
        } else {
          c.components[0].parent = this.parent;
        }*/
        if(c.components[0]) c.components[0].parent = this.parent;
        if(c.components[1]) c.components[1].parent = this.parent;
      }
    }


    var found = -1;
    for(var y = y0; y < y1; y++) {
      for(var x = x0; x < x1; x++) {
        var c = world[y][x];
        if(!extendmap[c.symbol]) c.isalutext = true;
        //if(c.circuitsymbol != 'U') continue; // only numbers next to U count, not next to extenders
        // due to the parsing, a multidigit number will show up as lower single digits here and there.
        if(c.number > found) {
          //if(found > 0 && c.number != found) { this.setError('ambiguous: multiple different numbers'); return false; }
          this.opindex = c.number;
          if(c.number >= 256) {
            this.opindex -= 256;
            this.floating = true;
          } else if(c.number >= 128) {
            this.opindex -= 128;
            this.signed = true;
          }
          found = c.number;
        }
      }
    }

    this.parent.alu = this;
    this.parent.type = TYPE_ALU; // reason: it might be TYPE_UNKNOWN_DEVICE if it was parsed with #
    return true;
  };


  this.processIO = function(io) {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var numinputsides = 0;
    var numoutputsides = 0;

    var a = [-1, -1, 0, 0, 0, 0]; // dir, lsbpos, num, num_mant, num_exp, num_sign. TODO: use "lsbinv" system some other large components use instead, to align better with getIO's clockwise/counterclockwise system
    var b = [-1, -1, 0, 0, 0, 0];
    var c = [-1, -1, 0, 0, 0, 0];
    var o = [-1, -1, 0, 0, 0, 0];
    var miscin = [-1, 0];
    var miscout = [-1, 0];
    var select = [-1, -1, 0];

    /*
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
    if(io.nios) { this.setError('mixed inputs and outputs on a side'); return false; }

    // find main output
    var num = 0;
    var outdir = -1;
    for(var i = 0; i < 4; i++) {
      if(!this.floating && io.o[i].ng > 1) { this.setError('too many output series on one side'); return false; }
      if(io.o[i].n > num) {
        outdir = i;
        num = io.o[i].n;
      }
    }
    if(outdir == -1) { this.setError('output side not found'); return false; }

    if(this.floating) {
      var f = extractfloatio(io, outdir, true);
      if(f[0]) { this.setError(f[0]); return false; }
      var numf = f.length - 1;
      if(numf != 1) { this.setError('max 1 floating point output supported, either as 1 whole group or 3 separate parts'); return false; }
      o[0] = outdir;
      o[1] = false; // TODO: use optional '0' symbol to indicate its LSB position
      o[3] = f[1][1];
      o[4] = f[1][2];
      o[5] = 1; // amount of sign bits is always 1
      o[2] = o[3] + o[4] + o[5];
    } else {
      o[0] = outdir;
      o[1] = false; // TODO: use optional '0' symbol to indicate its LSB position
      o[2] = num;
      // still compute mantissa, exponent and sign bits anyway. Even though this is an integer operation by default, it is still possible to become floating when opindex can be incremented to cross int->float opindex boundary
      var f = extractfloatio(io, outdir, true);
      if(f[0]) {
        // error, but no problem, just let float not work then
      } else {
        o[3] = f[1][1];
        o[4] = f[1][2];
        o[5] = 1; // amount of sign bits is always 1
      }
    }

    // get the inputs from opposite side of output
    var indir = (outdir + 2) & 3;
    if(this.floating) {
      var f = extractfloatio(io, indir, false);
      if(f[0]) { this.setError(f[0]); return false; }
      var numf = f.length - 1;
      if(numf == 1) {
        a[0] = indir;
        a[1] = inlsbinv;
        a[3] = f[1][1];
        a[4] = f[1][2];
        a[5] = 1;
        a[2] = a[3] + a[4] + a[5];
      } else if(numf == 2) {
        a[0] = indir;
        a[1] = inlsbinv;
        a[3] = f[2][1];
        a[4] = f[2][2];
        a[5] = 1;
        a[2] = a[3] + a[4] + a[5];
        b[0] = indir;
        b[1] = inlsbinv;
        b[3] = f[1][1];
        b[4] = f[1][2];
        b[5] = 1;
        b[2] = b[3] + b[4] + b[5];
      } else if(numf == 3) {
        a[0] = indir;
        a[1] = inlsbinv;
        a[3] = f[3][1];
        a[4] = f[3][2];
        a[5] = 1;
        a[2] = a[3] + a[4] + a[5];
        b[0] = indir;
        b[1] = inlsbinv;
        b[3] = f[2][1];
        b[4] = f[2][2];
        b[5] = 1;
        b[2] = b[3] + b[4] + b[5];
        c[0] = indir;
        c[1] = inlsbinv;
        c[3] = f[1][1];
        c[4] = f[1][2];
        c[5] = 1;
        c[2] = c[3] + c[4] + c[5];
      } else {
        //if(numf == 0) { this.setError('must have input side opposite of output side'); return false; }
        if(numf > 3) { this.setError('too many inputs'); return false; }
      }
    } else {
      var arr = io.i[indir].ga;
      var inlsbinv = false; // TODO: use optional '0' symbol to indicate its LSB position
      if(arr.length == 1) {
        a[0] = indir;
        a[1] = inlsbinv;
        a[2] = arr[0].n;
      } else if(arr.length == 2) {
        a[0] = indir;
        a[1] = inlsbinv;
        a[2] = arr[1].n; // a is the leftmost one if at bottom side (last one in clockwise order from output)
        b[0] = indir;
        b[1] = inlsbinv;
        b[2] = arr[0].n;
      } else if(arr.length == 3) {
        a[0] = indir;
        a[1] = inlsbinv;
        a[2] = arr[2].n;
        b[0] = indir;
        b[1] = inlsbinv;
        b[2] = arr[1].n;
        c[0] = indir;
        c[1] = inlsbinv;
        c[2] = arr[0].n;
      } else {
        //if(arr.length == 0) { this.setError('must have input side opposite of output side'); return false; }
        if(arr.length > 3) { this.setError('too many inputs'); return false; }
      }
      // similar as with outputs: still compute mantissa, exp, sign bits anyway in case int opindex becomes a float opindex. But error is not treated as error in this case.
      var f = extractfloatio(io, indir, false);
      var numf = f.length - 1;
      if(!f[0] && numf == arr.length) {
        if(numf >= 1) {
          a[3] = f[1][1];
          a[4] = f[1][2];
          a[5] = 1;
        }
        if(numf >= 2) {
          b[3] = f[2][1];
          b[4] = f[2][2];
          b[5] = 1;
        }
        if(numf >= 3) {
          c[3] = f[3][1];
          c[4] = f[3][2];
          c[5] = 1;
        }
      }
    }

    // find misc out, if any
    var miscoutdir = -1;
    for(var i = 0; i < 4; i++) {
      if(i == outdir) continue;
      if(io.o[i].ng == 0) continue;
      if(io.o[i].ng > 1) { this.setError('too many misc-output series on one side'); return false; }
      if(miscoutdir != -1) { this.setError('multiple misc out sides'); return false; }
      var arr = io.o[i].ga;
      if(arr[0].n != 1) { this.setError('too many bits in misc output side'); return false; }
      miscoutdir = i;
      miscout[0] = miscoutdir;
      miscout[1] = 1;
    }

    // find misc in, if any
    var miscindir = -1;
    for(var i = 0; i < 4; i++) {
      if(i == outdir || i == indir || i == miscoutdir) continue;
      var arr = io.i[i].ga;
      if(arr.length == 0) continue;
      if(miscindir != -1) { this.setError('multiple misc in sides'); return false; }
      if(arr.length == 1) {
        if(arr[0].n == 1) {
          // 1 bit: the side input is the 1-bit carry or similar input
          miscindir = i;
          miscin[0] = miscindir;
          miscin[1] = 1;
        } else {
          // Multiple bits: the side input is the operation-select input
          selectdir = i;
          select[0] = selectdir;
          select[1] = false; // TODO: use optional '0' symbol to indicate its LSB position
          select[2] = arr[0].n;
        }
      } else if(arr.length == 2) {
        if(arr[0].n != 1) { this.setError('misc in must have 1 bit'); return false; }
        miscindir = i;
        miscin[0] = miscindir;
        miscin[1] = 1;
        selectdir = i;
        select[0] = selectdir;
        select[1] = false;  // TODO: use optional '0' symbol to indicate its LSB position
        select[2] = arr[1].n;
      } else {
        this.setError('too many misc-input series on one side');
        return null;
      }
      //if(arr[0][1] != 1) { this.setError('too many bits in misc input side'); return null; }
    }

    // TODO: work without this temporary object, a leftover from when this was split across 2 functions
    var dirs = [a, b, c, o, miscin, miscout, select];

    this.adir = dirs[0][0];
    this.alsbinv = dirs[0][1];
    this.bdir = dirs[1][0];
    this.blsbinv = dirs[1][1];
    this.cdir = dirs[2][0];
    this.clsbinv = dirs[2][1];
    this.odir = dirs[3][0];
    this.olsbinv = dirs[3][1];
    this.miscindir = dirs[4][0];
    this.miscoutdir = dirs[5][0];
    this.selectdir = dirs[6][0];
    this.selectlsbinv = dirs[6][1];
    this.output = []; // current ouput values (first data output(s), then the select passthrough)
    this.numa = dirs[0][2];
    this.numb = dirs[1][2];
    this.numc = dirs[2][2];
    this.numo = dirs[3][2];
    this.numa_mant = dirs[0][3];
    this.numb_mant = dirs[1][3];
    this.numc_mant = dirs[2][3];
    this.numo_mant = dirs[3][3];
    this.numa_exp = dirs[0][4];
    this.numb_exp = dirs[1][4];
    this.numc_exp = dirs[2][4];
    this.numo_exp = dirs[3][4];
    this.numa_sign = dirs[0][5];
    this.numb_sign = dirs[1][5];
    this.numc_sign = dirs[2][5];
    this.numo_sign = dirs[3][5];
    this.nummiscin = dirs[4][1];
    this.nummiscout = dirs[5][1];
    this.numselect = dirs[6][2];

    this.output.length = this.numo + this.nummiscout;

    /*
    Sort inputs as follows:
    -data inputs from lsb to msb
    -misc input bit (carry, ...)
    -select operation inputs from lsb to msb
    The given dirs are headings (NESW)
    */

    var getDir = function(x, y) {
      if(y < y0) return 0;
      if(x >= x1) return 1;
      if(y >= y1) return 2;
      if(x < x0) return 3;
      return -1;
    };

    var array = [];
    for(var i = 0; i < this.parent.inputs.length; i++) array[i] = i;
    var self = this;
    array = array.sort(function(a, b) {
      var xa =  self.parent.inputs_x[a];
      var ya =  self.parent.inputs_y[a];
      var xb =  self.parent.inputs_x[b];
      var yb =  self.parent.inputs_y[b];
      var da = getDir(xa, ya);
      var db = getDir(xb, yb);
      if(da != db) {
        if(da == self.adir) return -1;
        if(db == self.adir) return 1;
        if(da == self.miscindir) return 1;
        if(db == self.miscindir) return -1;
        throw 'impossible that it is not using at least one adir and one miscindir, given bdir is in center';
      }
      // NOTE: this assumes alsbinv == blsbinv, miscinlsbinv == selectlsbinv and miscindir == selectdir
      var lsbdir = (da >= 2);
      var lsbinv = (da == self.adir) ? self.alsbinv : (da == self.bdir) ? self.blsbinv : self.selectlsbinv;
      if(lsbinv) lsbdir = !lsbdir;
      if(((da & 1) == 0) && lsbdir) return xb - xa;
      if(((da & 1) == 0)) return xa - xb;
      if(lsbdir) return yb - ya;
      return ya - yb;
    });
    if(!newOrderInputs(this.parent, array)) { throw 'must use *all* inputs for newOrderInputs'; }

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

    for(var j = 0; j < io.o[this.odir].ng; j++) {
      var o = io.o[this.odir].ga[j];
      var f = this.olsbinv ? o.l : o.f;
      var d = this.olsbinv ? o.dn : o.d;
      for(var i = 0; i < o.n; i++) {
        var x = f[0] + d[0] * i;
        var y = f[1] + d[1] * i;
        var z = (this.odir & 1) ? 0 : 1;
        var c = world[y][x];
        if(c.circuitsymbol != 'U' && c.circuitsymbol != '#U') continue;
        if(c.components[z]) c.components[z].rom_out_pos = rompos++;
      }
    }

    if(this.miscoutdir >= 0) {
      o = io.o[this.miscoutdir].ga[0];
      var f = this.miscoutlsbinv ? o.l : o.f;
      var d = this.miscoutlsbinv ? o.dn : o.d;
      for(var i = 0; i < o.n; i++) {
        var x = f[0] + d[0] * i;
        var y = f[1] + d[1] * i;
        var z = (this.miscoutdir & 1) ? 0 : 1;
        var c = world[y][x];
        if(c.circuitsymbol != 'U' && c.circuitsymbol != '#U') continue;
        if(c.components[z]) c.components[z].rom_out_pos = rompos++;
      }
    }

    return true;
  };


  // init after inputs are resolved
  // returns true if ok, false if error (e.g. no rectangle or inputs not all on one side)
  this.init2 = function() {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    if(!this.parent) return false;

    var io = getIO(x0, y0, x1, y1, x0, y0, x1, y1, this.parent);
    if(!io) { this.setError('getting io error'); return false; }

    if(!this.processIO(io)) { this.setError('processIO failed'); return false; }


    // make label with operation name
    // find a suitable location
    var opname = this.numselect ? 'ALU#' : this.getOpShortName();
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
        c.isalutext = true;
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
          c.isalutext = true;
        }
      }
    }

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
  // The bounding box for the part in which text is displayed
  this.x0b = 0;
  this.y0b = 0;
  this.x1b = 0;
  this.y1b = 0;
  this.text = null; // not as string but as 2D array of characters
  this.numinputs = 0; // num data inputs
  this.numinputs2 = 0; // exponent bits, if this.floatdisplay, for floating point. Note that there is implicitely one more bit, the sign bit, not included in numinputs or numinputs2.
  this.numinputs3 = 0; // sign bits, always 1 if has float input
  this.numoutputs = -1; // num data outputs
  this.numoutputs2 = -1; // exponent bits for output float, similar in function to this.numinputs2
  this.numoutputs3 = -1; //  sign bits, always 1 if has float input
  this.numwrite = 0; // num write control bits
  this.cursorx = 0;
  this.cursory = 0;
  this.prevwrite = false;
  this.prevread = false;
  this.output = [0,0,0,0,0,0,0,0];

  this.has_enable = false;
  this.has_read = false;
  this.has_write = false;
  this.has_up = false;
  this.has_down = false;
  this.has_set = false;
  this.has_reset = false;

  /*
  The terminal has the following modes, depending on amount, sizes and locations of input and output groups:
  -multibit output side, and a non-opposing side with 1 input bit and 1 output bit: ascii keyboard
  -multibit input side and a non-opposing side with 1 input bit: ascii screen
  -both above combined (4 sides used, multibit sides opposing): ascii keyboard + screen
  -only a multibit output side: decimal keyboard
  -only a multibit input side: decimal screen
  -multibit input side and opposing multibit output side: decimal passthrough screen
  -multibit output side and a non-opposing side with 1/2/3 input bit: counter with up/up,reset/up,reset,down
  -multibit output side, opposing multibit input side, and side with 1/2/3 input bit: counter with set/up,set/up,set,down
  */
  this.decimaldisplay = false;
  this.signeddisplay = false;
  this.floatdisplay = false;
  this.passthrough = false; // whether it passes through the input (in case of decimal display)
  this.decimalinput = false;
  this.counter = false;
  this.countervalue = math.n0;


  this.previnput = [];
  this.invisible = false; // if true, is invisible, due to being inside of a chip
  // hidden textarea used to handle typing in better way than pure keyboard events
  // a separate one per VTE because it must be positioned where the VTE is to avoid
  // undesired scrolling to wrong place when it gets focused
  this.textarea = undefined;
  this.keybuffer = [];
  this.error = false;
  this.errormessage = null;

  this.newline = function() {
    var w = this.x1b - this.x0b;
    var h = this.y1b - this.y0b;
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
    if(this.error) return;
    var enable = true;
    var do_read = false;
    var do_write = false;
    var do_up = false;
    var do_down = false;
    var do_set = false;
    var do_reset = false;

    var pos = 0;

    if(this.has_enable) {
      if(!inputs[pos]) enable = false;
      pos++;
    }

    if(this.has_read) {
      if(enable && inputs[pos] && !this.previnput[pos]) do_read = true;
      this.previnput[pos] = inputs[pos];
      pos++;
    }

    if(this.has_write) {
      if(enable && inputs[pos] && !this.previnput[pos]) do_write = true;
      this.previnput[pos] = inputs[pos];
      pos++;
    }

    if(this.has_up) {
      if(enable && inputs[pos] && !this.previnput[pos]) do_up = true;
      this.previnput[pos] = inputs[pos];
      pos++;
    }

    if(this.has_down) {
      if(enable && inputs[pos] && !this.previnput[pos]) do_down = true;
      this.previnput[pos] = inputs[pos];
      pos++;
    }

    if(this.has_set) {
      if(enable && inputs[pos] && !this.previnput[pos]) do_set = true;
      this.previnput[pos] = inputs[pos];
      pos++;
    }

    if(this.has_reset) {
      if(inputs[pos]) do_reset = true; // reset is asynch and ignores enable
      pos++;
    }

    if(this.counter) {
      var x = this.x1b - this.x0b - 1;
      var y = this.y1b - this.y0b - 1;
      var width = Math.max(this.x1b - this.x0b, this.y1b - this.y0b);

      if(do_set) {
        var index = math.n0;
        var mul = math.n1;
        for(var i = 0; i < this.numinputs; i++) {
          var j = pos + i;
          var ip = math.supportbigint ? BigInt(inputs[j]) : inputs[j];
          index += ip * mul;
          mul *= math.n2;
        }
        if(this.signeddisplay) {
          var max = math.n1 << math.B(this.numinputs);
          var half = math.n1 << (math.B(this.numinputs) - math.n1);
          if(index >= half) index = -(max - index);
        }
        this.countervalue = index;
      }
      if(do_reset) {
        this.countervalue = math.n0;
      }
      if(do_up) {
        this.countervalue++;
      }
      if(do_down) {
        this.countervalue--;
      }

      var index = this.countervalue;
      var s = '' + index;
      for(var i = 0; i < width; i++) {
        //if(x >= this.x1b - this.x0b) { x = 0; y++; }
        if(x < 0) { x = this.x1b - this.x0b - 1; y--; }
        if(x < 0) break;
        if(y < 0) break;
        var c = (i < s.length) ? s[s.length - i - 1] : '';
        if(!this.text) break;
        this.text[y][x] = c;
        x--;
      }
      var mul = math.n1;
      for(var i = 0; i < this.numoutputs; i++) {
        this.output[i] = ((index & mul) ? 1 : 0);
        mul *= math.n2;
      }
      return;
    }
    if(this.decimaldisplay) {
      var s = '';
      var rendersize = 0;
      if(this.floatdisplay) {
        var mantissa = 0;
        var exponent = 0;
        var sign = 1;
        var mul = 1; // can't use shift due to JS only supporting that up to 32 bits (when not using BigInt) and mantissa can go up to 52
        for(var i = 0; i < this.numinputs; i++) {
          mantissa += inputs[i] * mul;
          mul *= 2;
        }
        for(var i = 0; i < this.numinputs2; i++) {
          exponent |= (inputs[this.numinputs + i] << i);
        }
        sign = inputs[this.numinputs + this.numinputs2] ? 1 : 0;
        //s = '' + sign + '.' + exponent + '.' + mantissa;
        var f = math.createfloat(sign, exponent, mantissa, this.numinputs2, this.numinputs);
        s = '' + f;
        rendersize = Math.max(this.x1b - this.x0b, this.y1b - this.y0b);
        if(s == 'Infinity' && rendersize < 8) s = 'Inf';
        if(s == '-Infinity' && rendersize < 9) s = '-Inf';
        if(s.length + 1 > rendersize) { // + 1, to show at least one empty character to show it's not accidently clipped
          if(f >= 10 || (f < 0.1 && f > -0.1) || f <= -10) {
            s = f.toExponential(Math.max(2, rendersize - 4));
            if(s.length + 1 > rendersize) s = f.toExponential(Math.max(2, rendersize - 5));
            if(s.length + 1 > rendersize) s = f.toExponential(Math.max(2, rendersize - 6));
            if(s.length + 1 > rendersize) s = f.toExponential(Math.max(2, rendersize - 7));
            if(s.length + 1 > rendersize) s = f.toExponential(Math.max(2, rendersize - 8));
          } else {
            s = f.toPrecision(Math.max(2, rendersize - 3));
            if(s.length + 1 > rendersize) s = f.toPrecision(Math.max(2, rendersize - 4));
            if(s.length + 1 > rendersize) s = f.toPrecision(Math.max(2, rendersize - 5));
            if(s.length + 1 > rendersize) s = f.toPrecision(Math.max(2, rendersize - 6));
          }
        }
      } else {
        var index = math.n0;
        var mul = math.n1;
        for(var i = 0; i < this.numinputs; i++) {
          var j = i + pos;
          var ip = math.B(inputs[j]);
          index += ip * mul;
          mul *= math.n2;
        }
        if(this.signeddisplay) {
          var max = math.lshift(math.n1, math.B(this.numinputs));
          var half = math.lshift(math.n1, math.B(this.numinputs - 1));
          if(index >= half) index = -(max - index);
        }
        s = '' + index;
        rendersize = this.numinputs;
      }
      var x = this.x1b - this.x0b - 1;
      var y = this.y1b - this.y0b - 1;
      for(var i = 0; i < rendersize; i++) {
        //if(x >= this.x1b - this.x0b) { x = 0; y++; }
        if(x < 0) { x = this.x1b - this.x0b - 1; y--; }
        if(x < 0) break;
        if(y < 0) break;
        var c = (i < s.length) ? s[s.length - i - 1] : '';
        if(!this.text) break;
        this.text[y][x] = c;
        x--;
      }
      if(this.passthrough) {
        for(var i = 0; i < this.numoutputs; i++) {
          this.output[i] = i < this.numinputs ? inputs[i] : false;
        }
        if(this.floatdisplay) {
          for(var i = 0; i <= this.numoutputs2; i++) {
            this.output[this.numoutputs + i] = (i < this.numinputs + this.numinputs2 + 1) ? inputs[this.numinputs + i] : false;
          }
        }
      }
      return;
    }
    if(this.decimalinput) {
      var rendersize = this.floatdisplay ? Math.max(this.x1b - this.x0b, this.y1b - this.y0b) : this.numoutputs;
      var s = '';
      var x = math.n0;
      var y = math.n0;
      for(var i = 0; i < rendersize; i++) {
        var c = this.text[y][x];
        s += c;
        x++;
        if(x >= this.x1b - this.x0b) { x = math.n0; y++; }
      }
      s = s.trim();


      if(this.floatdisplay) {
        var f = parseFloat(s);
        if(s == 'Inf' || s == 'inf' || s == 'infinity') f = Infinity;
        if(s == '-Inf' || s == '-inf' || s == '-infinity') f = -Infinity;
        if(s == '') f = 0; // empty string parses as nan otherwise, which does not look nice when starting to type
        var p = math.dissectfloat(f, this.numoutputs2, this.numoutputs);
        var conv = p[2].toString(2); // can't use shift due to JS only supporting that up to 32 bits (when not using BigInt) and mantissa can go up to 52
        for(var i = 0; i < this.numoutputs; i++) {
          this.output[i] = (i < conv.length) ? (conv[conv.length - i - 1] == '1' ? 1 : 0) : 0;
        }
        for(var i = 0; i < this.numoutputs2; i++) {
          this.output[this.numoutputs + i] = ((p[1] & (1 << i)) ? 1 : 0);
        }
        this.output[this.numoutputs + this.numoutputs2] = p[0];
      } else {
        // If a negative number is entered, support it using twos complement
        var neg = false;
        if(s[0] == '-') {
          neg = true;
          s = s.substr(1);
        }

        // avoid typing non-digit characters (exception for hex)
        if(s.length > 0) {
          var c = s[s.length - 1];
          var hex = (s.length >= 2 && s[0] == '0' && (s[1] == 'x' || s[1] == 'X'));
          if(!hex && !(c >= '0' && c <= '9')) {
            this.doBackspace();
            s = s.substr(0, s.length - 1);
          }
        }

        var index = math.n0;
        for(;;) {
          if(s.length == 0) break;
          var hex = s[0] == '0' && (s[1] == 'x' || s[1] == 'X');
          if(math.supportbigint) {
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
          var ni = math.supportbigint ? BigInt(this.numoutputs) : this.numoutputs;
          var maxval = (ni == 31) ? math.B(2147483647) : ((math.n1 << ni) - math.n1);
          if(index <= maxval) break;

          // typed number too high, remove last character typed
          this.doBackspace();
          s = s.substr(0, s.length - 1);
        }

        if(neg) index = ~index + math.n1;
        var mul = math.n1;
        for(var i = 0; i < this.numoutputs; i++) {
          var bit = ((index & mul) ? 1 : 0);
          if(index < 0 && (1 << i) > -index) bit = 1; // also supports negative numbers with twos complement
          this.output[i] = bit;
          mul *= math.n2;
        }
      }
      return;
    }


    var index = 0;
    var mul = 1;

    if(do_read) {
      for(var i = 0; i < this.numinputs; i++) {
        var j = pos + i;
        index += inputs[j] * mul;
        mul *= 2;
      }
      //console.log('vte update: ' + index);
      if(index == 10 || index == 13) {
        this.newline();
        return;
      }
      var support_unicode = true;
      var text = '';
      if(support_unicode) {
        if(index < 32 || index == 127) index = 63; // ascii value for question mark '?' as replacement char
        text = util.unicode_to_utf16(index);
      } else {
        if(index < 32 || index > 126) index = 63; // ascii value for question mark '?' as replacement char
        text = String.fromCharCode(index);
      }
      if(this.cursorx >= this.x1b - this.x0b) this.newline();
      this.text[this.cursory][this.cursorx] = text;
      this.cursorx++;
    }

    this.output[0] = (this.keybuffer.length == 0); // eof

    if(do_write && this.keybuffer.length > 0) {
      if(this.keybuffer.length > 0) index = this.keybuffer.shift(); // use as queue

      var mul = 1;
      for(var i = 0; i < this.numoutputs; i++) {
        this.output[i + 1] = ((index & mul) ? 1 : 0);
        mul *= 2;
      }
    }
  };

  this.addChar = function(c) {
    if(this.cursorx >= this.x1b - this.x0b) this.newline();
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
        this.cursorx = this.x1b - this.x0b - 0;
        this.cursory--;
      } else {
        this.cursorx = 0;
      }
    }
    this.text[this.cursory][this.cursorx] = '';
  };



  this.supportsTyping = function() {
    return (this.numoutputs > 0 || this.numoutputs3 > 0) && !this.passthrough && !this.counter && !this.decimaldisplay;
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

  this.setError = function(text) {
    this.error = true;
    if(!this.errormessage) this.errormessage = text;
  };

  // init before inputs are resolved
  // returns true if ok, false if error
  this.init1 = function(array) {
    largeComponentBB(array, true, this);
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    this.parent = null; // the parent component for this VTE

    for(var i = 0; i < array.length; i++) {
      var x = array[i][0];
      var y = array[i][1];
      var c = world[y][x];
      var component = c.components[0] || c.components[1];
      if(component) {
        this.parent = component;
        break;
      }
    }

    if(!this.parent) { this.setError('no parent found'); return false; }

    for(var i = 0; i < array.length; i++) {
      var x = array[i][0];
      var y = array[i][1];
      var c = world[y][x];
      if(c.number == 1 && c.numbertype == NUMBER_VTE && !this.floatdisplay) this.signeddisplay = true;
      if(c.number == 2 && c.numbertype == NUMBER_VTE) this.floatdisplay = true;
      if(c.components[0]) c.components[0].parent = this.parent;
      if(c.components[1]) c.components[1].parent = this.parent;
      if(!c.components[0] && !c.components[1]) c.components[0] = this.parent;
    }
    this.parent.vte = this;
    return true;
  };

  this.processIO = function(io) {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    if(io.oy.n) { this.setError('y output not supported for this component'); return false; }
    if(io.oC.n) { this.setError('C output not supported for this component'); return false; }
    if(io.oq.n) { this.setError('q output not supported for this component'); return false; }
    if(io.oQ.n) { this.setError('Q output not supported for this component'); return false; }

    // NOTE: normally c is used for the main clock signal, and q and Q only for special types of set/reset. But for the VTE, c is required to uniquely distinguish the counter.
    // therefore, screen and keyboard use q and Q instead of c and C.

    var outdir = -1;
    var outanydir = -1;
    var indir = -1;

    var numinputsides = 0;
    var numoutputsides = 0;
    this.numoutputs = 0;
    this.numinputs = 0;
    for(var i = 0; i < 4; i++) {
      if(io.o[i].n > 0) {
        numoutputsides++;
        this.numoutputs += io.o[i].n;
        outdir = i;
        outanydir = i;
      }
      if(io.i[i].n > 0) {
        numinputsides++;
        this.numinputs += io.i[i].n;
      }
    }

    var has_eof = false;
    if(io.oc.n > 1) { this.setError('too many EOF (c) outputs'); return false; }
    if(io.oc.n == 1) has_eof = true;

    var arr = [];

    if((io.ic.n && !has_eof) || io.iq.n || io.iQ.n) {
      // counter/memory of any form. This is if it has any c without output-c (EOF, that would indicate keyboard instead), or any q or Q
      this.counter = true;

      if(has_eof) { this.setError('has EOF output (c) but either a q or Q input, or no c input, EOF can only be used for keyboard which must also have a c input and optional C for screen'); return false; }

      if(io.nis > 1) { this.setError('too many input sides'); return false; }
      if(io.nos > 1) { this.setError('too many output sides'); return false; }

      if(io.iy.n) {
        if(io.iy.n > 1) { this.setError('too many y inputs'); return false; }
        this.has_enable = true;
        arr.push(io.iy.ai[0]);
      }

      if(io.ic.n) {
        if(io.ic.n > 1) { this.setError('too many c inputs'); return false; }
        this.has_up = true;
        arr.push(io.ic.ai[0]);
      }

      if(io.iC.n) {
        if(io.iC.n > 1) { this.setError('too many C inputs'); return false; }
        this.has_down = true;
        arr.push(io.iC.ai[0]);
      }

      if(io.iq.n) {
        if(io.iq.n > 1) { this.setError('too many q inputs'); return false; }
        this.has_set = true;
        arr.push(io.iq.ai[0]);
      }

      if(io.iQ.n) {
        if(io.iQ.n > 1) { this.setError('too many Q inputs'); return false; }
        this.has_reset = true;
        arr.push(io.iQ.ai[0]);
      }
    } else if(io.ic.n || io.iC.n) {
      // keyboard and/or screen (actual VTE)
      if(io.iy.n) {
        if(io.iy.n > 1) { this.setError('too many y inputs'); return false; }
        this.has_enable = true;
        arr.push(io.iy.ai[0]);
      }

      if(io.iC.n) {
        if(io.iC.n > 1) { this.setError('too many C inputs'); return false; }
        this.has_read = true;
        arr.push(io.iC.ai[0]);

        if(numinputsides == 0) { this.setError('screen must have input side'); return false; }
        if(numinputsides != 1) { this.setError('too many input sides for screen'); return false; }
      } else {
        if(numinputsides != 0) { this.setError('pure keyboard cannot have input side'); return false; }
      }

      if(io.ic.n) {
        if(io.ic.n > 1) { this.setError('too many c inputs'); return false; }
        this.has_write = true;
        arr.push(io.ic.ai[0]);
        if(numoutputsides != 1) { this.setError('keyboard must have output side'); return false; }
        if(!has_eof) { this.setError('keyboard must have EOF flag output'); return false; }
      } else {
        if(numoutputsides != 0) { this.setError('pure screen cannot have output side'); return false; }
        if(has_eof) { this.setError('not keyboard (no Q input), so cannot have EOF output (Q)'); return false; }
      }
    } else {
      // decimal display, decimal input or decimal passthrough

      if(io.nis > 1) { this.setError('too many input sides'); return false; }
      if(io.nos > 1) { this.setError('too many output sides'); return false; }

      if(io.nis) {
        this.decimaldisplay = true;
      }
      if(io.nos) {
        this.decimalinput = true;
      }
      if(this.decimaldisplay && this.decimalinput) {
        this.decimalinput = false;
        this.passthrough = true;
      }

    }

    this.numinputs = 0;
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < io.i[i].ai.length; j++) {
        arr.push(io.i[i].ai[j]);
        this.numinputs++;
      }
    }

    if(this.floatdisplay) {
      if(this.counter) { this.setError('floating point, indicated by "2" not supported for counter'); return false; }
      if(!this.decimalinput && !this.decimaldisplay) { this.setError('floating point, indicated by "2", can only be used for decimal input or decimal output'); return false; }
      if(io.nis > 0) {
        // we want, if it has iputs, 3 inputs on one side
        if(io.nis > 1) { this.setError('floating point input requires all its inputs on 1 side'); return false; }
        for(var i = 0; i < 4; i++) {
          if(io.i[i].n) {
            var f = extractfloatio(io, i, false);
            if(f[0]) { this.setError(f[0]); return false; }
            var numf = f.length - 1;
            if(numf != 1) { this.setError('max 1 floating point input supported, either as 1 whole group or 3 separate parts'); return false; }
            this.numinputs = f[1][1];
            this.numinputs2 = f[1][2];
            this.numinputs3 = 1;
            break;
          }
        }
      }
      if(io.nos > 0) {
        // we want, if it has iputs, 3 inputs on one side
        if(io.nos > 1) { this.setError('floating point output requires all its outputs on 1 side'); return false; }
        for(var i = 0; i < 4; i++) {
          if(io.o[i].n) {
            var f = extractfloatio(io, i, true);
            if(f[0]) { this.setError(f[0]); return false; }
            var numf = f.length - 1;
            if(numf != 1) { this.setError('max 1 floating point output supported, either as 1 whole group or 3 separate parts'); return false; }
            this.numoutputs = f[1][1];
            this.numoutputs2 = f[1][2];
            this.numoutputs3 = 1;
            break;
          }
        }
      }

      if(this.passthrough && this.numinputs != this.numoutputs) { this.setError('floating point passthrough requires equal input and output mantissa size'); return false; }
      if(this.passthrough && this.numinputs2 != this.numoutputs2) { this.setError('floating point passthrough requires equal input and output exponent size'); return false; }
    }

    if(!newOrderInputs(this.parent, arr)) { this.setError('must use *all* inputs for newOrderInputs'); return false; }

    var rompos = 0;
    var outa = [];
    if(has_eof) {
      var o = io.oc.a[0];
      outa.push([o[0], o[1], 0]);
    }
    if(outdir >= 0) {
      var o = io.o[outdir];
      for(var i = 0; i < o.n; i++) {
        var x = o.a[i][0];
        var y = o.a[i][1];
        var z = (outdir & 1) ? 0 : 1;
        outa.push([x, y, z]);
      }
    }
    for(var i = 0; i < outa.length; i++) {
      var x = outa[i][0];
      var y = outa[i][1];
      var z = outa[i][2];
      var c = world[y][x];
      // TODO: investigate: is the "!= this.parent" check needed? The ROM does it. But in the case here, it prevents outputting the "EOF" signal if it happens to be connected to the cell that happens to be the core cell!
      if(c.components[z] /*&& c.components[z] != this.parent*/) {
        var component = c.components[z];
        component.rom_out_pos = rompos++;
      }
    }

    return true;
  };


  this.init2 = function() {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var x0s = this.x0s;
    var y0s = this.y0s;
    var x1s = this.x1s;
    var y1s = this.y1s;

    if(!this.parent) { this.setError('no parent present'); return false; }

    var io = getIO(x0, y0, x1, y1, x0s, y0s, x1s, y1s, this.parent);
    if(!io) { this.setError('getting io failed'); return false; }

    if(!this.processIO(io)) { this.setError('processIO failed'); return false; }

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


function DotMatrix() {
  this.x0 = 0;
  this.y0 = 0;
  this.x1 = 0;
  this.y1 = 0;
  // the bounding box for the lit up rectangle
  this.x0b = 0;
  this.y0b = 0;
  this.x1b = 0;
  this.y1b = 0;
  this.text = null; // not as string but as 2D array of characters
  this.w = -1;
  this.h = -1;
  this.numx = -1;
  this.numy = -1;
  this.numc = -1; // num bits to control color
  this.has_enable = false;
  this.has_dot = false;
  this.has_fill = false;
  this.has_clear = false;

  // TODO: make this separate for x and y direction
  this.matrix = false; // matrix addressing: if true, the x/y addresses are direct, not binary addresses, and multiple dots could be set at the same time

  this.previnput = [];
  this.prevcolor = -1;

  this.error = false;
  this.errormessage = null;

  this.array = [];
  this.oarray = []; // only used if oscilloscope.
  this.oarray2 = []; // only used if oscilloscope.
  this.opointer = 0; // ringbuffer into oscilloscope array

  this.parent = null;


  this.rgbled = false; // if true, is not a dot matrix screen but a single RGB led with up to 3 inputs

  this.setError = function(text) {
    this.error = true;
    if(!this.errormessage) this.errormessage = text;
  };

  this.update = function(inputs) {
    if(this.error) return;
    var oscilloscope = (this.numc == 0);
    var index = 0;
    var c0 = this.nummisc;

    var enable = true;
    var do_dot = false;
    var do_fill = false;
    var do_clear = false;

    var pos = 0;

    if(this.has_enable) {
      if(!inputs[pos]) enable = false;
      pos++;
    }

    if(this.has_dot) {
      if(enable && inputs[pos] && !this.previnput[pos]) do_dot = true;
      this.previnput[pos] = inputs[pos];
      pos++;
    }

    if(this.has_fill) {
      if(enable && inputs[pos] && !this.previnput[pos]) do_fill = true;
      this.previnput[pos] = inputs[pos];
      pos++;
    }

    if(this.has_clear) {
      if(enable && inputs[pos] && !this.previnput[pos]) do_clear = true;
      this.previnput[pos] = inputs[pos];
      pos++;
    }

    var color = 0;
    for(var i = 0; i < this.numc; i++) {
      color += (inputs[pos + i] << i);
    }
    pos += this.numc;

    // the first color of the palette, the clear color. differnt numc gives different palette
    var color0 = 0;
    if(this.numc == 0) color0 = 34;
    else if(this.numc == 1) color0 = 0;
    else if(this.numc == 2) color0 = 2;
    else if(this.numc == 3) color0 = 6;
    else if(this.numc == 4) color0 = 14;
    else if(this.numc == 5) color0 = 35;
    else if(this.numc == 6) color0 = 62;
    else if(this.numc == 7) color0 = 126;
    else if(this.numc == 8) color0 = 251;
    else if(this.numc == 9) color0 = 467;
    color += color0;

    if(this.rgbled) {
      var prevcolor = this.prevcolor;
      this.prevcolor = color;

      if(prevcolor != color) {
        for(var y = 0; y < this.h; y++) {
          for(var x = 0; x < this.w; x++) {
            this.array[y][x] = color;
          }
        }
      }
    } else if(oscilloscope) {
      if(do_clear || do_fill) {
        // fill also clears: the oscilloscope concept only supports some max amount of dots lit at the same time.
        // note that in fact an oscilloscope wouldn't support clear either, dots stay lit for a while due to the phosphor,
        // but here it's supported anyway
        for(var y = 0; y < this.h; y++) {
          for(var x = 0; x < this.w; x++) {
            this.array[y][x] = 0;
            this.oarray2[y][x] = -1;
          }
        }
        for(var i = 0; i < this.oarray.length; i++) this.oarray[i] = -1;
      } else if(do_dot) {
        var x = 0;
        for(var i = 0; i < this.numx; i++) {
          x += (inputs[pos + i] << i);
        }
        var y = 0;
        for(var i = 0; i < this.numy; i++) {
          y += (inputs[pos + this.numx + i] << i);
        }

        var op, ox, oy;

        op = (this.opointer + Math.floor(3 * this.oarray.length / 4)) % this.oarray.length;
        ox = this.oarray[op][0];
        oy = this.oarray[op][1];
        if(ox >= 0 && oy >= 0 && oy < this.h && ox < this.w && this.oarray2[oy][ox] == op) this.array[oy][ox] = 33;

        op = (this.opointer + Math.floor(2 * this.oarray.length / 4)) % this.oarray.length;
        ox = this.oarray[op][0];
        oy = this.oarray[op][1];
        if(ox >= 0 && oy >= 0 && oy < this.h && ox < this.w && this.oarray2[oy][ox] == op) this.array[oy][ox] = 32;

        op = (this.opointer + Math.floor(this.oarray.length / 4)) % this.oarray.length;
        ox = this.oarray[op][0];
        oy = this.oarray[op][1];
        if(ox >= 0 && oy >= 0 && oy < this.h && ox < this.w && this.oarray2[oy][ox] == op) this.array[oy][ox] = 31;

        op = this.opointer;
        ox = this.oarray[op][0];
        oy = this.oarray[op][1];
        if(ox >= 0 && oy >= 0 && oy < this.h && ox < this.w && this.oarray2[oy][ox] == op) this.array[oy][ox] = 30;

        if(y < this.h && x < this.w) {
          this.array[y][x] = color;
          this.oarray[this.opointer] = [x, y];
          this.oarray2[y][x] = this.opointer;
          this.opointer = (this.opointer + 1) % this.oarray.length;
        }
      }
    } else {
      // for matrix addressing
      var xarray = [];
      var yarray = [];

      if(do_clear) {
        for(var y = 0; y < this.h; y++) {
          for(var x = 0; x < this.w; x++) {
            this.array[y][x] = color0;
          }
        }
      } else if(do_fill) {
        for(var y = 0; y < this.h; y++) {
          for(var x = 0; x < this.w; x++) {
            this.array[y][x] = color;
          }
        }
      } else if(do_dot) {
        var x = 0;
        for(var i = 0; i < this.numx; i++) {
          var v = inputs[pos + i];
          x += (v << i);
          if(v) xarray.push(i);
        }
        var y = 0;
        for(var i = 0; i < this.numy; i++) {
          var v = inputs[pos + this.numx + i];
          y += (v << i);
          if(v) yarray.push(i);
        }

        if(this.matrix) {
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
  this.init1 = function(array, component) {
    // unlike other large components, the parent component is the only single
    // component here, since this component has only inputs, and multiple
    // components is only needed if multiple different output values must be
    // supported.
    this.parent = component;
    largeComponentBB(array, true, this);

    this.w = this.x1b - this.x0b;
    this.h = this.y1b - this.y0b;
    component.dotmatrix = this;
    return true;
  };

  this.processIO = function(io) {
    // commented out: ignore outputs altogether instead.
    //if(io.no != 0) { this.setError('dotmatrix cannot have outputs'); return false; }

    this.rgbled = true;

    if(io.nospecial) { this.setError('special outputs not supported for this component'); return false; }

    var arr = [];

    if(io.iy.n) {
      if(io.iy.n > 1) { this.setError('too many y inputs'); return false; }
      this.has_enable = true;
      arr.push(io.iy.ai[0]);
      this.rgbled = false;
    }


    if(io.iC.n) { this.setError('C input not supported'); return false; }

    if(io.ic.n) {
      if(io.ic.n > 1) { this.setError('too many c inputs'); return false; }
      this.has_dot = true;
      arr.push(io.ic.ai[0]);
      this.rgbled = false;
    }

    if(io.iq.n) {
      if(io.iq.n > 1) { this.setError('too many q inputs'); return false; }
      this.has_fill = true;
      arr.push(io.iq.ai[0]);
      this.rgbled = false;
    }

    if(io.iQ.n) {
      if(io.iQ.n > 1) { this.setError('too many Q inputs'); return false; }
      this.has_clear = true;
      arr.push(io.iQ.ai[0]);
      this.rgbled = false;
    }

    this.numc = 0;

    if(this.rgbled) {
      this.numc = 0;
      for(var i = 0; i < 4; i++) {
        for(var j = 0; j < io.i[i].n; j++) {
          arr.push(io.i[i].ai[j]);
          this.numc++;
        }
      }
    } else {
      var colorside = -1;
      var xside = -1;
      var yside = -1;
      for(var i = 0; i < 4; i++) {
        // the dot matrix screen must have 3 regular input sides (ignoring the special q,Q,y inputs), one for x coordinate, one for y coordinate,
        // one for the color. Since there are only 4 sides total, two sides will be across each other, and the remaining one is definitaly an
        // x or y coordinate. Between those two, we must diambiguate which one is the color side and which one hte other coordinate. We use
        // the presense of special inputs (the q, Q and/or y) on a side for that disambiguation: that one is the color side.
        if(io.i[i].n && io.i[i].nspecial) {
          if(colorside > -1) { this.setError('multiple possible color sides, only one side may mix special and unmarked inputs'); return false; }
          colorside = i;
          this.numc = io.i[i].n;
        } else if(io.i[i].n) {
          if(i & 1) {
            if(yside > -1) { this.setError('multiple possible y-coordinate sides'); return false; }
            yside = i;
            this.numy = io.i[i].n;
          } else {
            if(xside > -1) { this.setError('multiple possible x-coordinate sides'); return false; }
            xside = i;
            this.numx = io.i[i].n;
          }
        }
      }
      if(xside == -1) { this.setError('no x-coordinate side found'); return false; }
      if(yside == -1) { this.setError('no y-coordinate side found'); return false; }
      // no color side is ok: means that it's an oscilloscope

      // sorting order of inputs: first the special inputs (added higher up already), then color bits, then x bits, then y bits (all starting from LSB, according to the LSB rules of getIO)
      if(colorside > -1) {
        for(var i = 0; i < io.i[colorside].n; i++) {
          arr.push(io.i[colorside].ai[i]);
        }
      }
      // matrix addressing. Not supported for oscilloscope (numc == 0) since that one can only draw a limited amount of dots at the same time
      this.matrix = (this.numc > 0 && this.numx == this.w && this.numy == this.h);
      var invertx = this.matrix && (xside == 2);
      var inverty = this.matrix && (yside == 3);
      for(var i = 0; i < io.i[xside].n; i++) {
        var j = i;
        if(invertx) j = io.i[xside].n - i - 1;
        arr.push(io.i[xside].ai[j]);
      }
      for(var i = 0; i < io.i[yside].n; i++) {
        var j = i;
        if(inverty) j = io.i[yside].n - i - 1;
        arr.push(io.i[yside].ai[j]);
      }

    }

    if(this.numc > 9) { this.setError('too many RGB color inputs, supports up to 9'); return false; }

    if(!newOrderInputs(this.parent, arr)) { this.setError('must use *all* inputs for newOrderInputs'); return false; }

    return true;
  };





  this.init2 = function() {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var x0s = this.x0s;
    var y0s = this.y0s;
    var x1s = this.x1s;
    var y1s = this.y1s;
    var w = x1 - x0;
    var h = y1 - y0;

    if(!this.parent) return false;

    var io = getIO(x0, y0, x1, y1, x0s, y0s, x1s, y1s, this.parent);
    if(!io) { this.setError('getIO failed'); return false; }

    if(!this.processIO(io)) { this.setError('processIO failed'); return false; }


    this.array = [];
    for(var y = 0; y < h; y++) {
      this.array[y] = [];
      for(var x = 0; x < w; x++) {
        this.array[y][x] = 0;
      }
    }

    this.oarray = [];
    this.oarray2 = [];
    this.opointer = 0;
    if(this.numc == 0) {
      // oscilloscope: old dots go off
      var numo = Math.max(this.x1 - this.x0, this.y1 - this.y0) * 4;
      for(var i = 0; i < numo; i++) {
        this.oarray[i] = [-1, -1];
      }
      for(var y = 0; y < h; y++) {
        this.oarray2[y] = [];
        for(var x = 0; x < w; x++) {
          this.oarray2[y][x] = 0;
        }
      }
    }

    return true;
  };
}



var supportsAudio = !!(window.AudioContext || window.webkitAudioContext);
var audioContext = null;
var whiteNoiseBuffer = null;

var ensureAudioContext = function() {
  if(audioContext) return;
  if(!supportsAudio) return;

  audioContext = new(window.AudioContext || window.webkitAudioContext)();
  var num = 2 * audioContext.sampleRate;
  whiteNoiseBuffer = audioContext.createBuffer(1, num, audioContext.sampleRate);
  pinkNoiseBuffer = audioContext.createBuffer(1, num, audioContext.sampleRate);
  whiteNoise = whiteNoiseBuffer.getChannelData(0);
  pinkNoise = pinkNoiseBuffer.getChannelData(0);
  var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for(var i = 0; i < num; i++) {
    var r = Math.random() * 2 - 1;
    whiteNoise[i] = r;
    // Paul Kellet's refined method for pink noise
    b0 = 0.99886 * b0 + r * 0.0555179;
    b1 = 0.99332 * b1 + r * 0.0750759;
    b2 = 0.96900 * b2 + r * 0.1538520;
    b3 = 0.86650 * b3 + r * 0.3104856;
    b4 = 0.55000 * b4 + r * 0.5329522;
    b5 = -0.7616 * b5 - r * 0.0168980;
    pinkNoise[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + r * 0.5362) * 0.2;
    b6 = r * 0.115926;
  }
};

var mutevalue = 0; // set bitmasks like 1, 2, 4 for different mute channels. auto only plays if value is 0

// also removes all nodes
var destroyAudioContext = function() {
  if(audioContext) audioContext.close();
  audioContext = null;
};

// mute for given bit. If any bit is muted, suspends (but can continue once fully unmuted)
var muteAudioContext = function(bit) {
  mutevalue |= bit;
  if(audioContext && mutevalue) audioContext.suspend();
};

// unmute for the given bit, or use 0 to just ensure play if not muted by other bits. Only if all bits are unmuted, it'll actually play.
var unmuteAudioContext = function(bit) {
  mutevalue &= ~bit;
  if(!mutevalue) {
    ensureAudioContext();
    if(audioContext && audioContext.state == 'suspended') audioContext.resume();
  }
};

// Sound, speaker, music, audio, jukebox,
// has same single output everywhere, so no parent needed
function MusicNote() { // function Note()
  this.x0 = 0;
  this.y0 = 0;
  this.x1 = 0;
  this.y1 = 0;
  this.has_enable = false;
  this.numvolinputs = 0;
  this.numfreqinputs = 0;
  this.numshapeinputs = 0;

  // shape of web audio connections: oscillator --> volume --> audioContext
  this.volume = null;
  this.oscillator = null;

  this.prevvolvalue = -1;
  this.prevfreqvalue = -1;
  this.prevshapevalue = -1;

  this.basefrequency = 0;
  this.baseshape = 0;
  this.basevolume = 0.2;

  this.prevvol = 0;
  this.currentvol = -1;
  this.prevfreq = 0;
  this.prevfreq2 = 0;
  this.currentfreq = -1;
  this.prevshape = -1;
  this.currentshape = -1;

  this.error = false;
  this.errormessage = null;

  this.output = false; // whether it should give component output value: true if volume > 0, enabled, and other valid values; computed in update()

  this.setError = function(text) {
    this.error = true;
    if(!this.errormessage) this.errormessage = text;
  };

  this.stop = function() {
    if(this.oscillator) {
      this.oscillator.stop();
      this.oscillator = null;
    }
    this.filter = null;
  };

  // frequency to use to play right now, depends on whether it's dynamic or static
  this.getPlayFreq = function(opt_default) {
    if(this.currentfreq >= 0) return this.currentfreq;
    if(!this.basefrequency) return (opt_default == undefined) ? 440 : opt_default;
    return this.basefrequency;
  };

  // get frequency for dynamic frequency
  this.getHighFreq = function() {
    if(!this.basefrequency) return 20000;
    return this.basefrequency;
  };

  this.ensureStarted = function() {
    if(!supportsAudio) return; // audio not supported by browser
    ensureAudioContext();
    if(this.oscillator) return;

    var volume = audioContext.createGain();
    volume.connect(audioContext.destination);
    volume.gain.value = 0.0;
    this.volume = volume;

    var shape = this.getCurrentShape();
    this.setShape(shape);
  };


  this.update = function(inputs) {
    if(!supportsAudio) return;
    this.output = true;

    var numenableinputs = this.has_enable ? 1 : 0;

    //var value = inputs[0] ? 1 : 0;
    var volvalue = 0;
    for(var i = 0; i < this.numvolinputs; i++) {
      var j = i + numenableinputs;
      volvalue += (inputs[j] << i);
    }
    var vol = 0;
    if(this.numvolinputs) {
      vol = volvalue / ((1 << this.numvolinputs) - 1);
    } else if(this.has_enable) {
      vol = volvalue = inputs[0] ? 1 : 0;
    }
    var outvol = vol * this.basevolume * this.getVolumeMul();
    if(outvol == 0) this.output = false;

    if(this.has_enable && !inputs[0]) {
      vol = outvol = volvalue = 0;
      this.output = false;
    }

    var freqvalue = 0;
    for(var i = 0; i < this.numfreqinputs; i++) {
      var j = i + this.numvolinputs + numenableinputs;
      freqvalue += (inputs[j] << i);
    }
    var freq = this.numfreqinputs ? (this.getHighFreq() * freqvalue / ((1 << this.numfreqinputs) - 1)) : this.basefrequency;

    var shapevalue = 0;
    for(var i = 0; i < this.numshapeinputs; i++) {
      var j = i + this.numvolinputs + this.numfreqinputs + numenableinputs;
      shapevalue += (inputs[j] << i);
    }
    var shape = this.numshapeinputs ? shapevalue : this.baseshape;

    if(freqvalue != this.prevfreqvalue && this.numfreqinputs) {
      this.currentfreq = freq;
      if(this.oscillator) {
        var fv = !!this.filter ? this.filter.frequency : this.oscillator.frequency;
        if(fv) {
          if(!freqvalue) {
            fv.setValueAtTime(0, audioContext.currentTime);
            // do a ramp to 0 too: this ensures if any earlier ramp to non-0 was going on, this overrides it
            fv.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
            // TODO: instead, stop completely if freq is 0. But that requires changes elsewhere as well. Maybe wrap this whole thing in a separate class to deal with all the sound/frequency/shape combinations and when to play and when not
          } else {
            // Don't set this at all, it depends on browser what this does.
            //var currentvalue = fv.value; // not all browsers support reading this...
            //if(currentvalue) fv.setValueAtTime(currentvalue, audioContext.currentTime);
            fv.linearRampToValueAtTime(freq, audioContext.currentTime + 0.1);
          }
        }
      }
      //this.oscillator.frequency.value = freq;
      this.prevfreqvalue = freqvalue;
      this.prevfreq = freq;


      unmuteAudioContext(1);
    }

    if(!(shape == 4 || shape == 5) && this.getPlayFreq() == 0) this.output = false; // can't hear 0-Hz wave (except the noise ones)

    if(this.numshapeinputs) {
      this.currentshape = shape;

      if(this.oscillator) {
        this.setShape(shape);
      }

      //this.oscillator.frequency.value = freq;
      this.prevshapevalue = shapevalue;
      this.prevshape = shape;

      if(this.output) unmuteAudioContext(1);
    }

    if(volvalue != this.prevvolvalue) {
      this.currentvol = vol;
      if(!volvalue) {
        this.stop();
        this.prevvol = 0;
      } else {
        this.ensureStarted();
        var gain = this.volume.gain;
        var diff = Math.abs(vol - this.prevvol);
        if(this.prevvolvalue && diff < 0.3) {
          // go slightly gradual instead of immediately changing volume
          var currentvalue = gain.value; // not all browsers support reading this...
          if(currentvalue) gain.setValueAtTime(currentvalue, audioContext.currentTime);
          gain.linearRampToValueAtTime(outvol, audioContext.currentTime + 0.1);
        } else {
          // if no previous value, go immediate anyway, to not give the feeling of delayed response then
          gain.setValueAtTime(outvol, audioContext.currentTime);
        }
      }
      this.prevvolvalue = volvalue;
      this.prevvol = vol;
    }
  };


  this.getShapeName = function() {
    if(this.baseshape == 0) return 'sine';
    if(this.baseshape == 1) return 'square';
    if(this.baseshape == 2) return 'triangle';
    if(this.baseshape == 3) return 'sawtooth';
    if(this.baseshape == 4) return 'white noise';
    if(this.baseshape == 5) return 'pink noise';
    return 'unknown';
  };

  this.getVolumeMul = function(opt_shape) {
    // with higher volume than 0.3, a sine wave sounds quite non-sine like, as if it gets clipped
    // let's keep the sounds pleasant to use and not make the volume too high
    // the square wave sounds even louder so make that one even softer
    var shape = opt_shape == undefined ? this.getCurrentShape() : opt_shape;
    if(shape > 5) shape = 0;
    if(shape == 0 || shape == 2) return 0.2;
    if((shape == 4 || shape == 5) && this.getPlayFreq(0) != 0) return 0.3;
    return 0.1;
  };

  this.getPlayVolume = function(opt_shape) {
    if(this.currentvol >= 0) return this.currentvol * this.getVolumeMul(opt_shape) * this.basevolume;
    else return this.getVolumeMul(opt_shape) * this.basevolume;
  };

  this.getCurrentShape = function() {
    if(this.currentshape == -1) return this.baseshape;
    return this.currentshape;
  };

  this.setShape = function(shape) {
    var shapechange = false;
    if(!this.oscillator) shapechange = true;
    if(shape != this.prevshape) shapechange = true;
    if((shape == 4 || shape == 5) && ((this.getPlayFreq(0) == 0) != (this.prevfreq2 == 0))) shapechange = true; // the noise ones have different shape setup for freq 0 vs other freqs
    this.prevfreq2 = this.getPlayFreq(0);
    if(!shapechange) return;

    this.stop();
    if(shape == 4 || shape == 5) {
      this.oscillator = audioContext.createBufferSource();
      this.oscillator.buffer = (shape == 4) ? whiteNoiseBuffer : pinkNoiseBuffer;
      this.oscillator.loop = true;
      if(this.getPlayFreq(0) == 0) {
        this.oscillator.connect(this.volume);
      } else {
        this.filter = audioContext.createBiquadFilter();
        this.filter.type = 'bandpass'
        this.filter.frequency.setValueAtTime(this.getPlayFreq(), audioContext.currentTime);
        this.filter.connect(this.volume);
        this.oscillator.connect(this.filter);
      }
    } else {
      this.oscillator = audioContext.createOscillator();
      this.oscillator.frequency.setValueAtTime(this.getPlayFreq(), audioContext.currentTime);
      if(shape == 1) {
        this.oscillator.type = 'square';
      } else if(shape == 2) {
        this.oscillator.type = 'triangle';
      } else if(shape == 3) {
        this.oscillator.type = 'sawtooth';
      } else {
        this.oscillator.type = 'sine';
      }
      this.oscillator.connect(this.volume);
    }
    this.oscillator.start();
    this.prevshape = shape;
    if(this.volume) this.volume.gain.setValueAtTime(this.getPlayVolume(shape), audioContext.currentTime);
  };


  this.initDefault = function(component) {
    this.basefrequency = 440;
    this.baseshape = 0;
    this.basevolume = 1.0;
    this.parent = component;
  };

  // init before inputs are resolved
  // returns true if ok, false if error
  this.init1 = function(array, component) {
    // unlike other large components, the parent component is the only single
    // component here, since there's only one output value, and multiple
    // components is only needed if multiple different output values must be
    // supported.
    this.parent = component;

    largeComponentBB(array, false, this);

    this.w = this.x1 - this.x0;
    this.h = this.y1 - this.y0;
    component.musicnote = this;

    var freq = component.number;
    var shape = 0;
    if(component.number >= 100000) {
      var shape = Math.floor(freq / 100000);
      freq %= 100000;
      if(shape > 7) shape = 0;
    }
    if(freq < 1) freq = 0;
    if(freq > 100000) freq = 100000;
    this.basefrequency = freq;
    this.baseshape = shape;

    this.basevolume = 1.0;

    return true;
  };

  this.processIO = function(io) {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;

    if(io.nospecial) { this.setError('special outputs not supported for this component'); return false; }

    var arr = [];

    if(io.nis > 1) { this.setError('too many input sides'); return false; }

    // commented out: do allow musicnote output. It's a very simple output (can have any amount, they're all the same) indicating whether it's playing
    //if(io.nos > 0) { this.setError('musicnote shouldn\'t have output sides'); return false; }

    if(io.iy.n) {
      if(io.iy.n > 1) { this.setError('too many c inputs'); return false; }
      this.has_enable = true;
      arr.push(io.iy.ai[0]);
    }

    if(io.ic.n) { this.setError('too many c inputs'); return false; }
    if(io.iC.n) { this.setError('too many C inputs'); return false; }
    if(io.iq.n) { this.setError('too many q inputs'); return false; }
    if(io.iQ.n) { this.setError('too many Q inputs'); return false; }

    var g = [];
    this.numinputs = 0;
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < io.i[i].ai.length; j++) {
        arr.push(io.i[i].ai[j]);
        this.numinputs++;
      }
      if(io.i[i].n) {
        g = io.i[i].ga;
      }
    }

    if(g.length == 1) {
      this.numvolinputs = g[0].n;
    } else if(g.length == 2) {
      this.numvolinputs = g[0].n;
      this.numfreqinputs = g[1].n;
    } else if(g.length == 3) {
      this.numvolinputs = g[0].n;
      this.numfreqinputs = g[1].n;
      this.numshapeinputs = g[2].n;
    } else {
      if(g.length > 2) { this.setError('too many input groups'); return false; }
    }

    if(!newOrderInputs(this.parent, arr)) { this.setError('must use *all* inputs for newOrderInputs'); return false; }

    return true;
  };

  this.init2 = function() {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var x0s = this.x0s;
    var y0s = this.y0s;
    var x1s = this.x1s;
    var y1s = this.y1s;
    var w = x1 - x0;
    var h = y1 - y0;

    if(!this.parent) return false;

    var io = getIO(x0, y0, x1, y1, x0s, y0s, x1s, y1s, this.parent);
    if(!this.processIO(io)) { this.setError('processIO failed'); return false; }

    /*var io = getIO(x0, y0, x1, y1, this.parent);
    if(!io) { this.setError('getIO failed'); return false; }

    var dirs = this.getDirs(io);
    if(!dirs) { this.setError('getDirs failed'); return false; }

    this.numvolinputs = dirs.volume[2];
    this.numfreqinputs = dirs.frequency[2];
    this.numshapeinputs = dirs.shape[2];

    this.sortIO(dirs);*/

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

// returns [type, value]. Returns what TYPE the component should have.
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

    this.parent = array2[0].components[0];
    for(var i = 0; i < array2.length; i++) {
      array2[i].components[0].parent = this.parent;
      array2[i].components[0].type = TYPE_FLIPFLOP;
    }
    this.parent.ff = this;
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
    newOrderInputs(component, array);

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


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var jackclick = null; // previously clicked jack, when clicking two jacks to connect them
var jackclickdiv = null; // div which indicates which starting jack you clicked
var jackcolor = 0;

var maxjacks = 4;

// for jacks
function rempartner(c, i) {
  var old = c.partner[i];
  c.partner[i] = null;
  if(c.partnerdiv[i]) {
    util.removeElement(c.partnerdiv[i]);
    c.partnerdiv[i] = null;
  }
  if(old) {
    for(var j = 0; j < old.partner.length; j++) {
      if(old.partner[j] == c) rempartner(old, j);
    }
  }
};

// temporarily removes this connection, but does not remove the divs and returns
// info that you can use either to restore the connection, or fully complete
// the removal
function temprempartner(c, i) {
  // p = list of partner connections (list of all one-sided elements+index of each pair), d = list of divs that should be removed
  var result = {p:[], d:[]};
  var old = c.partner[i];
  if(!old) return result;
  result.p.push([c, i, old]);
  c.partner[i] = null;
  if(c.partnerdiv[i]) {
    result.d.push([c, i, old]);
  }
  if(old) {
    for(var j = 0; j < old.partner.length; j++) {
      if(old.partner[j] == c) {
        result.p.push([old, j, c]);
        old.partner[j] = null;
        if(old.partnerdiv[j]) {
          result.d.push([old, j, c]);
        }
      }
    }
  }
  return result;
}

// for jacks
// make room for a new partner, shift out the oldest one if necessary
function shiftpartner(c) {
  // first close any gaps, move older ones upwards to any available gaps
  var partner = [];
  var partnerdiv = [];
  for(var i = 0; i < c.partner.length; i++) {
    if(c.partner[i]) {
      partner.push(c.partner[i]);
      partnerdiv.push(c.partnerdiv[i]);
    }
  }
  for(var i = 0; i < c.partner.length; i++) {
    if(i < partner.length) {
      c.partner[i] = partner[i];
      c.partnerdiv[i] = partnerdiv[i];
    } else {
      c.partner[i] = null;
      c.partnerdiv[i] = null;
    }
  }
  if(c.partner[c.partner.length - 1]) {
    drawpatchcable(c, c.partner[c.partner.length - 1], 0, true); // temporarily indicate the removed patch cable
    rempartner(c, c.partner.length - 1);
  }
  // move all upward to open up the partner[0] spot
  for(var i = c.partner.length - 1; i > 0; i--) {
    c.partner[i] = c.partner[i - 1];
    c.partnerdiv[i] = c.partnerdiv[i - 1];
  }
  c.partner[i] = null;
  c.partnerdiv[i] = null;
}

function removepatchcables(component) {
  var p = component.partner;
  for(var i = 0; i < p.length; i++) {
    rempartner(component, i);
  }
}

function removeallpatchcables() {
  // clear jacks
  for(var i = 0; i < components.length; i++) {
    var p = components[i].partner;
    if(!p) continue;
    var d = components[i].partnerdiv;
    for(var j = 0; j < p.length; j++) {
      p[j] = null;
      if(d[j]) {
        util.removeElement(d[j]);
        d[j] = null;
      }
    }
  }
}

// remember even through loading different circuits to reapply to similarly shaped circuit later
var jackstate0 = [];
var jackstate1 = [];
var jackstate2 = [];
var jackstate3 = [];
var jackstate4 = [];

function storepatchcablestate() {
  var state = [];
  for(var i = 0; i < components.length; i++) {
    var p = components[i].partner;
    if(!p) continue;
    for(var j = 0; j < p.length; j++) {
      if(!p[j]) continue;
      if(components[i].index > p[j].index) continue; // only store once per pair
      state.push([components[i].index, p[j].index]);
    }
  }
  return state;
}

function restorepatchcablestate(state) {
  // first check if the patch applies.
  for(var i = 0; i < state.length; i++) {
    var a = state[i][0];
    var b = state[i][1];
    if(a >= components.length) return false;
    if(b >= components.length) return false;
    if(components[a].type != TYPE_JACK) return false;
    if(components[b].type != TYPE_JACK) return false;
  }
  // apply the patch
  removeallpatchcables();
  for(var i = 0; i < state.length; i++) {
    var a = state[i][0];
    var b = state[i][1];
    connectjacks(components[a], components[b]);
  }
  return true;
}

function drawpatchcable(a, b, index, error) {
  var thickness = 4;
  var x0 = a.corecell.x * tw;
  var y0 = a.corecell.y * th;
  var x1 = b.corecell.x * tw;
  var y1 = b.corecell.y * th;
  // randomize the start and end coordinate, they then twiddle different each time, which diversifies the diagonality a bit better for more visual distinction between patch wires
  if((((a.corecell.x * 19) % 13) ^ ((b.corecell.x * 37) % 7)) & 1) {
    var temp = x0;
    x0 = x1;
    x1 = temp;
    temp = y0;
    y0 = y1;
    y1 = temp;
  }
  // now twiddle their positions a bit so they'll be slightly diagonal, makes it easier to distinguish overlapping ones
  if(x0 < x1) {
    x0 += tw;
  } else {
    x1 += tw;
  }
  if(y0 < y1) {
    y0 += th - thickness - 2;
    y1 += thickness + 2;
  } else {
    y0 += thickness + 2;
    y1 += th - thickness - 2;
  }
  var color = error ? 'red' : BUSCOLORS[jackcolor];
  jackcolor = (jackcolor + 1) % BUSCOLORS.length;
  if(error) {
    var tempdiv = drawLine(x0, y0, x1, y1, color, thickness, worldDiv);
    window.setTimeout(function() {
      util.removeElement(tempdiv);
    }, 500);
  } else {
    a.partnerdiv[index] = drawLine(x0, y0, x1, y1, color, thickness, worldDiv);
  }
}

function drawstartjack(a) {
  var x0 = a.corecell.x * tw;
  var y0 = a.corecell.y * th;
  jackclickdiv = util.makeDiv(x0, y0, tw, th, worldDiv);
  jackclickdiv.style.border = '2px solid red';
}

// redraw all jacks, e.g. for after worldDiv changed
function redrawjacks() {
  for(var i = 0; i < components.length; i++) {
    var d = components[i].partnerdiv;
    if(!d) continue;
    for(var j = 0; j < d.length; j++) {
      if(d[j]) {
        util.removeElement(d[j]);
        d[j] = null;
        drawpatchcable(components[i], components[i].partner[j], j, false);
      }
    }
  }
}

// either connects them, or removes connections if e.g. a and b are the same (the behavior when clicking jacks)
function connectjacks(a, b) {
  // click already existing connection to remove it instead of adding a new connection
  var DISALLOWCONFLICT = true; // disallow multiple jacks with different component input, which would be a conflict and can cause an electrical short in real life.
  var already = false;
  for(var i = 0; i < a.partner.length; i++) {
    if(a.partner[i] == b) {
      rempartner(a, i);
      already = true;
    }
  }
  if(a == b) {
    // click twice same jack to remove all its partners
    for(var i = 0; i < a.partner.length; i++) {
      rempartner(a, i);
    }
  } else if(DISALLOWCONFLICT && a.inputs.length && b.inputs.length) {
    // do nothing, refuse to connect two components with inputs together
    drawpatchcable(a, b, 0, true); // temporarily indicate error
  } else if(!already) {
    if(DISALLOWCONFLICT) {
      var group = getalljacks2(a, b);
      var inputs = {};
      var numunique = 0;
      for(var i = 0; i < group.length; i++) {
        var c = group[i];
        if(c.inputs.length) {
          if(!inputs[c.index]) {
            numunique++;
            inputs[c.index] = true;
          }
        }
      }

      // there's only a conflict starting from 2 different inputs present in the new group
      if(numunique >= 2) {
        var removed = []; // store temporary-completed removals
        for(var i = 0; i < group.length; i++) {
          var c = group[i];
          if(c == a || c == b) continue;
          if(c.inputs.length) {
            // c has inputs, but a or b too, break the original connections of c with the group, now use a or b as the group's input instead
            // TODO: the loop below deletes more cables than necessary, some could stay and form a new group, instead find the smallest set of cables that can be removed to have the new input and old input in a different group.
            for(var j = 0; j < c.partner.length; j++) {
              var c2 = c.partner[j];
              if(!c2) continue;
              removed.push([temprempartner(c, j), c2]);
            }
          }
        }

        // a and b now form a new smaller group. Now, put back any connections from input-jacks that were not actually connecting to
        // this new group: there was no reason to remove them.
        // if none of the jacks involved in the current add have inputs, then only one of the two groups has to be disconnected. Otherwise both (getalljacks2)
        group = ((a.inputs.length || b.inputs.length)) ? getalljacks2(a, b) : getalljacks(a);
        var seen = {};
        for(var i = 0; i < group.length; i++) seen[group[i].index] = true;
        for(var i = 0; i < removed.length; i++) {
          var p = removed[i][0]; // commands to either restore or complete removal
          var b2 = removed[i][1];
          if(seen[b2.index]) {
            // stay removed, complete the removal: remove the divs
            for(var j = 0; j < p.d.length; j++) {
              util.removeElement(p.d[j][0].partnerdiv[p.d[j][1]]);
              p.d[j][0].partnerdiv[p.d[j][1]] = null;
              drawpatchcable(p.d[j][0], p.d[j][2], 0, true); // temporarily indicate the removed patch cable
            }
          } else {
            // add it back
            for(var j = 0; j < p.p.length; j++) {
              p.p[j][0].partner[p.p[j][1]] = p.p[j][2];
            }
          }
        }
      }
    }
    shiftpartner(a);
    shiftpartner(b);
    a.partner[0] = b;
    b.partner[0] = a;
    drawpatchcable(a, b, 0, false);
  }
}

// get all jacks connected together to the same group, including the given component
function getalljacks(component) {
  var jacks = [];
  var seen = [];
  var stack = [component];
  while(stack.length) {
    var c = stack.pop();
    seen[c.index] = true;
    jacks.push(c);
    for(var i = 0; i < c.partner.length; i++) {
      if(c.partner[i] && !seen[c.partner[i].index]) stack.push(c.partner[i]);
    }
  }
  return jacks;
}

// get all jacks part of both a's group and b's group (but not outputting double if a and b are part of the same group)
function getalljacks2(a, b) {
  var group = getalljacks(a);
  var hasb = false; // it is possible that b is in the same group as a, the connection is then redundant but it's made anyway, no problem with that
  for(var i = 0; i < group.length; i++) { if(group[i] == b) { hasb = true; break; }}
  if(!hasb) {
    // b not part of same group, so must also add its components to the list that will be the new group formed after connecting a and b
    var group = group.concat(getalljacks(b));
  }
  return group;
}


function updateJacks() {
  // the order in which components must be updated depends on the jack connections
  computeComponentsOrder();
  update();
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function drawkinetic(component) {
  if(component.type != TYPE_KINETIC && component.number != 20) return;
  if(component.kindiv) util.removeElement(component.kindiv);

  var x0 = 0;
  var y0 = 0;
  var x1 = 0;
  var y1 = 0;
  // TODO: better way to find our max bounding box, this here is a temporary solution, better is to use graph search or largeComponentBB at the point when the array is available
  var y = component.corecell.y;
  for(var x = line0[y]; x <= component.corecell.x; x++) {
    if(world[y][x].components[0] == component) {
      x0 = x;
      break;
    }
  }
  for(var x = component.corecell.x; x < line1[y]; x++) {
    if(world[y][x].components[0] == component) {
      x1 = x + 1;
    }
  }
  var x = component.corecell.x;
  for(var y = 0; y <= component.corecell.y; y++) {
    if(world[y] && world[y][x] && world[y][x].components[0] == component) {
      y0 = y;
      break;
    }
    if(world[y] && world[y][x0] && world[y][x0].components[0] == component) {
      y0 = y;
      break;
    }
    if(world[y] && world[y][x1] && world[y][x1].components[0] == component) {
      y0 = y;
      break;
    }
  }
  for(var y = component.corecell.y; y < h; y++) {
    if(world[y] && world[y][x] && world[y][x].components[0] == component) {
      y1 = y + 1;
    }
    if(world[y] && world[y][x0] && world[y][x0].components[0] == component) {
      y1 = y + 1;
    }
    if(world[y] && world[y][x1] && world[y][x1].components[0] == component) {
      y1 = y + 1;
    }
  }
  for(var x = line0[y0]; x <= x0; x++) {
    if(x >= line1[y0]) break;
    if(world[y0][x].components[0] == component) {
      x0 = x;
      break;
    }
  }
  for(var x = Math.max(x0, line0[y0]); x < line1[y0]; x++) {
    if(world[y0][x].components[0] == component) {
      x1 = x + 1;
    }
  }
  for(var x = line0[y1 - 1]; x <= x0; x++) {
    if(x >= line1[y1 - 1]) break;
    if(world[y1 - 1][x].components[0] == component) {
      x0 = x;
      break;
    }
  }
  for(var x = Math.max(x0, line0[y1 - 1]); x < line1[y1 - 1]; x++) {
    if(world[y1 - 1][x].components[0] == component) {
      x1 = x + 1;
    }
  }
  component.kindiv = util.makeDiv(x0 * tw + 4, y0 * th + 4, (x1 - x0) * tw - 8 - 2, (y1 - y0) * th - 8 - 2, worldDiv2);

  //component.kindiv.style.backgroundColor = OFFCOLOR;
  //component.kindiv.style.color = ONCOLOR;

  component.kindiv.style.backgroundColor = GATEBGCOLOR;
  component.kindiv.style.border = '1px solid ' + OFFCOLOR;
  component.kindiv.style.color = OFFCOLOR;


  component.kindiv.innerText = 'K20';
  component.kindiv.title = 'cover/hatch, give input signal to reveal what\'s behind';
  component.kindiv.style.fontSize = tw + 'px';
  component.kindiv.style.zIndex = MAINZINDEX + 3;
  component.kindiv.style.visibility = component.value ? 'hidden' : 'visible';
  component.kindivvisible = !component.value;

  component.kindiv.onclick = function(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  };
}

// redraw after e.g. graphics mode/color/zoom was changed
function redrawkinetic() {
  for(var i = 0; i < components.length; i++) {
    var d = components[i].kindiv;
    if(!d) continue;
    components[i].kindiv = undefined;
    drawkinetic(components[i]);
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function Component() {
  this.value = false;
  this.prevvalue = false; // used for the slow algorithms, plus also for flipflops (to support shift registers with D flipflops made from counters...)
  this.type = TYPE_NULL;
  this.disabled = 0; // mask 1: fully disabled, mask 2: temp disabled, mask 4: activated, 8: jammed (random value)
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
  this.parent = null; // parent component for rom, vte, ...
  this.rom = null; // used if this is a parent of rom
  this.mux = null; // used if this is a parent of mux
  this.alu = null; // used if this is a parent of alu
  this.vte = null;
  this.ff = null;
  this.tristate = null;
  this.rom_out_pos = -1; // used not only for ROM outputs but also for other big components like flip-flops and mux, to know which output value of the parent this one belongs to
  // location of the input symbol >, v, ... of incoming component
  this.inputs_x = [];
  this.inputs_y = [];
  // location of cell of this component to which inputting >, v, ... is attached (for typical components with only 1 cell, this is usually all the same core cell coordinates)
  this.inputs_x2 = [];
  this.inputs_y2 = [];
  this.number = -1; // meanings: -1: no number present, >=0: number with that value present
  this.defsubindex = -2; // meanings: -2: no defsubindex, -1: defsubindex without number, >= 0: defsubindex wiht number
  this.callsubindex = -2; // meanings: see defsubindex
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
  this.partner = null; // for patch panel jack: which other component it is connected with
  this.partnerdiv = null;

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

  // Determines whether this is part of a flipflop-like device at electron-level,
  // e.g. created with two NOR gates with outputs going to each others inputs, but
  // this also works through MUXes (M) for example.
  // This is used for the ff_cycle system to randomly settle rapidly blinking electron-based flip-flops,
  // as well as to auto-choose electron mode.
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
    } else if(this.type == TYPE_FIXED) {
      return true; // not implemented here, and normally can't exist at this point, being replaced by CONSTANT_ON or OFF
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
    } else if(this.type == TYPE_MUSIC_NOTE) {
      return numon > 0;  // NOTE: not correct in case volume is off or not enabled, this is just initial value
    } else if(this.type == TYPE_JACK) {
      return numon != 0; // not implemented in this function, but elsewhere, but behave like OR initially when not yet connected to another jack
    } else if(this.type == TYPE_KINETIC) {
      return (this.number == 20) ? (numoff == 0) : (numon != 0); // acts as OR, except the hatch/cover which acts as AND to require all inputs enabled to open up
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
      if(this.parent && this.parent.ff) value = this.parent.ff.value;
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
    if(this.disabled & 11) {
      this.value = false;
      if(this.value != this.prevvalue) this.changed = true;
      if(this.musicnote) this.musicnote.stop();
      if(this.disabled & 8) this.value = Math.random() > 0.5;
      this.disabled &= ~10; // flag 2/8 are temporary
      return;
    }
    if(this.error) {
      this.value = false;
      return;
    }
    if(this.parent) this.parent.update();
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
    var rom_inputs = []; // only filled in if this is a large device, like ROM, ...
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

      // The this.ff check ensures this only happens for the flipflop parent component
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

      if(this.type == TYPE_ROM || this.type == TYPE_MUX || this.type == TYPE_ALU || this.type == TYPE_VTE || this.type == TYPE_DOTMATRIX || this.type == TYPE_MUSIC_NOTE || this.type == TYPE_FIXED) {
        rom_inputs[i] = value2;
      }
    }

    if(this.type == TYPE_FIXED && this.parent) {
      if(this.parent) {
        // nothing to update for this one, it's constant and ignores inputs
        var fixed = this.fixed || this.parent.fixed;
        this.value = fixed.output[this.rom_out_pos];
      }
    } else if(this.type == TYPE_ROM) {
      if(this.parent) {
        if(this.rom) this.rom.update(rom_inputs);
        var rom = this.rom || this.parent.rom;
        this.value = rom.output[this.rom_out_pos];
      }
    } else if(this.type == TYPE_MUX) {
      if(this.parent) {
        if(this.mux) this.mux.update(rom_inputs);
        var mux = this.mux || this.parent.mux;
        this.value = mux.output[this.rom_out_pos];
      }
    } else if(this.type == TYPE_ALU) {
      if(this.parent) {
        if(this.alu) this.alu.update(rom_inputs);
        var alu = this.alu || this.parent.alu;
        this.value = alu.output[this.rom_out_pos];
      }
    } else if(this.type == TYPE_VTE) {
      if(this.parent || this.vte) {
        if(this.vte) this.vte.update(rom_inputs); // only if this.vte, don't do this on this.vte || this.parent.vte to avoid multiple updates to it
        var vte = this.vte || this.parent.vte;
        this.value = vte.output[this.rom_out_pos];
      }
    } else if(this.type == TYPE_DOTMATRIX) {
      if(this.dotmatrix) {
        this.dotmatrix.update(rom_inputs);
      }
    } else if(this.type == TYPE_MUSIC_NOTE) {
      if(this.musicnote) {
        this.musicnote.update(rom_inputs);
        this.value = this.musicnote.output;
      } else {
        this.value = this.getNewValue(numon, numoff);
      }
    } else if(this.type == TYPE_JACK) {
      // compute numon and numoff from *all* connected jacks
      // NOTE: getting the input values from the other jacks like this may be out-of-order compared to what the UPDATE_ALGORITHM normally requires, but the user can connect jacks in any possible order so this is hard to avoid. This can give a delay of one tick per group of jacks in the worst case.
      var jacks = getalljacks(this);
      numon = 0;
      numoff = 0;
      for(var i = 0; i < jacks.length; i++) {
        for(var j = 0; j < jacks[i].inputs.length; j++) {
          // the algorithm must match how it's done in the main numon/numoff for loop above!
          var v = (UPDATE_ALGORITHM == 0 || UPDATE_ALGORITHM == 1) ? jacks[i].inputs[j].value : jacks[i].inputs[j].prevvalue;
          if(jacks[i].inputs_negated[j]) v = !v;
          if(v) numon++;
          else numoff++;
        }
      }
      this.value = this.getNewValue(numon, numoff);
      // also update all the connected jacks, to avoid doing the same computation over all jacks for every jack
      // beware: ensure to play correctly with the updated, changed, changein, and so on variables! we emulate
      // their update function without actually calling it on the others!
      // NOTE: we know for sure that all other jacks are not yet updated, because if one was, then this would have been updated and we wouldn't end up this far in this function
      for(var i = 0; i < jacks; i++) {
        if(jacks[i] == this) continue; // self is already done
        jacks[i].value = this.value;
        if(jacks[i].value != jacks[i].prevvalue) jacks[i].changed = true;
        jacks[i].updated = true;
      }
    } else if(this.type == TYPE_KINETIC) {
      this.kintick = this.kintick ? (this.kintick) + 1 : 1;
      if(this.number >= 0 && this.number <= 4) {
        var input_only = (this.number != 0 && this.number != 3); // the water and gear ones propagate their effect, that is to say, even ones without input will active next ones
        if(this.inputs.length) {
          this.value = this.getNewValue(numon, numoff);
          if(!input_only) {
            this.kinprevvalue = this.kinvalue || 0;
            if(!this.kinvalue) {
              this.kinvalue = this.value ? 1 : 0;
            } else if(this.kinvalue == 1) {
              this.kinvalue = 2;
            } else if(this.kinvalue == 2) {
              this.kinvalue = this.value ? 2 : 3;
            } else if(this.kinvalue == 3) {
              this.kinvalue = 0;
            }
          }
        } else {
          numon = 0;
          numoff = 0;

          // for non-straight-only ones, avoid too large radius, it's computationally expensive and done for every tick
          var radius = 1;
          if(this.number == 0) radius = 1; // gear
          if(this.number == 1) radius = 8; // fan
          if(this.number == 2) radius = 4; // heat
          if(this.number == 3) radius = 4; // water
          if(this.number == 4) radius = 32;
          var straight_only = (this.number == 0 || this.number == 4);
          var x0 = this.corecell.x - radius;
          var x1 = this.corecell.x + radius;
          var y0 = this.corecell.y - radius;
          var y1 = this.corecell.y + radius;

          if(input_only) {
            this.value = false;
            for(var y = y0; y <= y1; y++) {
              if(y < 0) y = 0;
              if(y >= h) break;
              for(var x = x0; x <= x1; x++) {
                if(x < line0[y]) x = line0[y];
                if(x > line1[y]) break;
                if(straight_only && y != this.corecell.y) {
                  if(x < this.corecell.x) x = this.corecell.x;
                  else if(x > this.corecell.x) break;
                }
                var dx = this.corecell.x - x;
                var dy = this.corecell.y - y;
                if(radius > 1) {
                  if(dx * dx + dy * dy > radius * radius) continue;
                } else {
                  if(Math.abs(dx) + Math.abs(dy) > 1) continue;
                }
                var c = world[y][x];
                if(!c) continue;
                var comp = c.components[0];
                if(comp == this || !comp || comp.type != TYPE_KINETIC || comp.number != this.number || !comp.inputs.length) continue;
                this.value |= comp.value;
              }
            }
          } else {
            // kinetic components with this type of propagating effect need their own prevvalue field, independent of the main prevvalue field that depends on the emulation algorithm for the electronic components
            this.kinprevvalue2 = this.kinprevvalue;
            this.kinprevvalue = this.kinvalue;
            if(!this.kinvalue) this.kinvalue = 0;
            for(var y = y0; y <= y1; y++) {
              if(y < 0) y = 0;
              if(y >= h) break;
              for(var x = x0; x <= x1; x++) {
                if(x < line0[y]) x = line0[y];
                if(x > line1[y]) break;
                if(straight_only && y != this.corecell.y) {
                  if(x < this.corecell.x) x = this.corecell.x;
                  else if(x > this.corecell.x) break;
                }
                var dx = this.corecell.x - x;
                var dy = this.corecell.y - y;
                if(radius > 1) {
                  if(dx * dx + dy * dy > radius * radius) continue;
                } else {
                  if(Math.abs(dx) + Math.abs(dy) > 1) continue;
                }
                var c = world[y][x];
                if(!c) continue;
                var comp = c.components[0];
                if(comp == this || !comp || comp.type != TYPE_KINETIC || comp.number != this.number) continue;

                // make the speed independent of whether comp was already updated this tick, or was last updated previous tick
                var curr = (this.kintick == comp.kintick) ? comp.kinprevvalue : comp.kinvalue;
                var prev = (this.kintick == comp.kintick) ? comp.kinprevvalue2 : comp.kinprevvalue;
                if(curr == 1) numon++;
                if(curr == 3) numoff++;
              }
            }

            if(this.number == 0) {
              // for gears only, do not activate if 3 neighbors activated. There's no real good reason
              // to do this, but this unlocks some intersting behavioral possibilities.
              if(numon == 3) numon = 0;
              if(numoff == 3) numoff = 0;
            }

            if(this.kinvalue == 0) {
              if(numon) this.kinvalue = 1;
            } else if(this.kinvalue == 1) {
              if(numoff) this.kinvalue = 3;
              else this.kinvalue = 2;
            } else if(this.kinvalue == 2) {
              if(numoff) this.kinvalue = 3;
            } else if(this.kinvalue == 3) {
              if(numon) this.kinvalue = 1;
              else this.kinvalue = 0;
            }
            this.value = (this.kinvalue == 1 || this.kinvalue == 2);
            if(this.kinvalue == 1 || this.kinvalue == 3) this.changein = 1;
          }
        }
      } else if(this.number >= 5 && this.number <= 19) {
        this.value = this.getNewValue(numon, numoff);
        var emp = (this.number >= 10 && this.number <= 14);
        var jam = (this.number >= 15 && this.number <= 19);
        var activate = false;
        if(emp || jam) {
          activate = this.value;
        } else {
          if(this.value || this.prevvalue) activate = true;
          if(!emp && !jam && (this.disabled & 4)) {
            this.value = true;
            if(Math.random() < 0.2) {
              activate = true;
            } else {
              this.changein = 1;
            }
          }
        }
        if(activate) {
          if(!emp && !jam) this.disabled |= 1;
          var radius = 1;
          if((this.number % 5) == 0) radius = 1;
          if((this.number % 5) == 1) radius = 4;
          if((this.number % 5) == 2) radius = 8;
          if((this.number % 5) == 3) radius = 16;
          if((this.number % 5) == 4) radius = 32;
          var x0 = this.corecell.x - radius;
          var x1 = this.corecell.x + radius;
          var y0 = this.corecell.y - radius;
          var y1 = this.corecell.y + radius;
          for(var y = y0; y <= y1; y++) {
            if(y < 0) y = 0;
            if(y >= h) break;
            for(var x = x0; x <= x1; x++) {
              if(x < line0[y]) x = line0[y];
              if(x > line1[y]) break;
              var dx = this.corecell.x - x;
              var dy = this.corecell.y - y;
              if(radius > 1) {
                if(dx * dx + dy * dy > radius * radius) continue;
                if(!emp && !jam && radius > 4 && Math.random() > 0.5 && dx * dx + dy * dy > radius * radius * 0.8) continue; // slightly randomize the shape
              } else {
                if(Math.abs(dx) + Math.abs(dy) > 1) continue;
              }
              var c = world[y][x];
              if(!c) continue;
              if(devicemaparea[c.circuitsymbol]) {
                var type = TYPE_NULL;
                for(var i = 0; i < c.components.length; i++) {
                  if(c.components[i]) {
                    type = c.components[i].type;
                    if(emp) {
                      if(type == TYPE_KINETIC && c.components[i].number >= 10 && c.components[i].number <= 14) {
                        // emp is immune to emp
                      } else {
                        c.components[i].disabled |= 2;
                      }
                    } else if(jam) {
                      if(type == TYPE_KINETIC && c.components[i].number >= 15 && c.components[i].number <= 19) {
                        // jam is immune to jam
                      } else {
                        c.components[i].disabled |= 8;
                        this.changein = 1;
                      }
                    } else {
                      if(type == TYPE_KINETIC && c.components[i].number >= 5 && c.components[i].number <= 9) {
                        c.components[i].disabled |= 4;
                      } else {
                        c.components[i].disabled |= 1;
                      }
                    }
                  }
                }
                c.renderer.setLook(c, type);
              }
            }
          }
        }
      } else if(this.number == 20) {
        if(!this.kindiv) {
          drawkinetic(this);
        }
        this.value = this.getNewValue(numon, numoff);
        if(!this.value && !this.kindivvisible) {
          this.kindiv.style.visibility = 'visible';
          this.kindivvisible = true;
        }
        if(this.value && this.kindivvisible) {
          this.kindiv.style.visibility = 'hidden';
          this.kindivvisible = false;
        }
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

      var ff = (this.ff || (this.parent && this.parent.ff));

      // flip flops are made from multiple components (d, c, ...), but only one of them
      // is designated as parent component.
      // Only the parent component has its own ff. So it's updated only once, as intended.
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
          // since Q inverts output, it behaves the opposite way to this rule without needing any extra code here.
          var number = this.number;
          var value = !ffdisable && (num_misc_pos_edge & 1);
          if(number > 1) {
            if(value) {
              this.qcount = number + 1;
            }
            this.prevqvalue = value;
            if(this.qcount) this.qcount--;
            ff.value = (this.qcount > 0);
            if(this.qcount > 0) this.changed = true;
          } else {
            ff.value = value;
          }
        } else if((ff.numj == 1 || ff.numk == 1) && ff.numff == 1) {
          // lone j, or lone k, behave as "once state changed, stay that way"
          // lone k will output 1 initially and then become 0 forever once activated, and the opposite for j.
          // the code is the same for both since k's output is already inversed elsewhere.
          if(numj1 || numk1) ff.value = 1;
        } else if(numQ1 && numq1) {
          // NOTE: asynch inputs (q and Q) override even enable input (y). When trying to make SR latch without clock and with enable, use jky, not qQy since in the latter the y will be ignored.
          ff.value = !ff.value; // asynch toggle
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
        if(!this.error) console.log('suspicious: ff component without ff field');
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
    } else if(this.type == TYPE_PUSHBUTTON_OFF || this.type == TYPE_PUSHBUTTON_ON) {
      //var type_on = this.type == TYPE_PUSHBUTTON_ON;
      //if(this.pushbuttonflipwhilepaused) type_on = !type_on;

      this.value = this.getNewValue(numon, numoff);
      if(this.pushbuttonflipwhilepaused) {
        delete this.pushbuttonflipwhilepaused;
        this.type = (this.type == TYPE_PUSHBUTTON_OFF ? TYPE_PUSHBUTTON_ON : TYPE_PUSHBUTTON_OFF);
        this.corecell.renderer.setLook(this.corecell, this.type);
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
    }

    // This can be for standard logic gates such as two NOR gates configured
    // as an SR latch, but can also involve large components such as a mux in the
    // cycle.
    if(this.ff_cycle) {
      if(this.value != this.prevvalue) this.ff_cycle_time++;
      else this.ff_cycle_time = 0;
    }

    if(this.value != this.prevvalue) this.changed = true;

    //console.log('updated: ' + this.index + ' ' + this.corecell.symbol + ' ' + this.corecell.x + ' ' + this.corecell.y);
  };

  this.mousedown = function(e, x, y) {
    if(e.shiftKey && !e.ctrlKey && !changeMode) {
      if(highlightedcomponent != this) {
        pause();
        highlightedcomponent = this;
        render();
        autopaused = true; // this to cause less user confusion: with this true, it unpauses more easily (when pressing anything)
        e.stopPropagation();
        e.preventDefault();
        return false;
      } else if(highlightedcomponent == this) {
        // NOTE: worldDiv's onclick also handles undoing of this but for the whole area and without shift
        highlightedcomponent = null;
        unpause();
      }
    }
    // for TYPE_ROM, just do default behavior, it already toggles bit
    if(e.ctrlKey && this.type != TYPE_ROM && !changeMode) {
      if(this.musicnote) this.musicnote.stop();
      var didsomething = true;
      if(e.shiftKey) {
        if(this.altType) {
          this.type = this.altType;
          this.altType = undefined;
        } else {
          this.altType = this.type;
          if(this.type == TYPE_SWITCH_ON) this.type = TYPE_CONSTANT_ON;
          else this.type = TYPE_CONSTANT_OFF;
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
      } else if(this.type == TYPE_KINETIC && this.number == 0) {
        if(this.kinvalue == 0) this.kinvalue = 1;
        if(this.kinvalue == 2) this.kinvalue = 3;
      } else if(this.type == TYPE_FLIPFLOP) {
        //this.value = !this.value;
        var ff = this.ff ? this.ff : (this.parent ? this.parent.ff : null);
        if(ff) {
          if((ff.numq == 1 || ff.numQ == 1) && (ff.numff == ff.numq + ff.numy || ff.numff == ff.numQ + ff.numy)) {
            var temp = ff.numq;
            ff.numq = ff.numQ;
            ff.numQ = temp;
            ff.value = !ff.value;
            if(this.parent) {
              for(var i = 0; i < this.parent.inputs.length; i++) {
                if(this.parent.input_ff_types[i] == 5) this.parent.input_ff_types[i] = 6;
                else if(this.parent.input_ff_types[i] == 6) this.parent.input_ff_types[i] = 5;
              }
            } else {
              for(var i = 0; i < this.inputs.length; i++) {
                if(this.input_ff_types[i] == 5) this.input_ff_types[i] = 6;
                else if(this.input_ff_types[i] == 6) this.input_ff_types[i] = 5;
              }
            }
            if(this.corecell.circuitsymbol == 'q') this.corecell.circuitsymbol = 'Q';
            else if(this.corecell.circuitsymbol == 'Q') this.corecell.circuitsymbol = 'q';
            if(this.corecell.displaysymbol == 'q') this.corecell.displaysymbol = 'Q';
            else if(this.corecell.displaysymbol == 'Q') this.corecell.displaysymbol = 'q';
            if(this.corecell.symbol == 'q') this.corecell.symbol = 'Q';
            else if(this.corecell.symbol == 'Q') this.corecell.symbol = 'q';
            this.corecell.initDiv2();
          } else {
            ff.value = !ff.value;
          }
        }
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
      var type = changeMode[0];
      var symbol = typesymbols[type];
      // Do not support changing large devices, it breaks them irreversably during this circuit run
      if(!(type == TYPE_KINETIC && changeMode[2] > 0) && (this.parent || this.dotmatrix || this.type == TYPE_IC)) return;
      if(this.musicnote) this.musicnote.stop();
      if(type == TYPE_COUNTER) {
        value = !!changeMode[2];
        symbol = value ? 'C' : 'c';
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
      if(type == TYPE_MUSIC_NOTE) {
        if(!this.musicnote) {
          this.musicnote = new MusicNote();
          this.musicnote.initDefault(this);
          this.musicnote.numvolinputs = 1;
        }
      }
      if(type == TYPE_KINETIC) {
        this.number = changeMode[2] || 0;
      }
      if(type == TYPE_JACK && !this.partner) {
        this.partner = [];
        this.partnerdiv = [];
        for(var i = 0; i < maxjacks; i++) this.partner[i] = this.partnerdiv[i] = null;
      }
      if(this.type == TYPE_JACK && type != TYPE_JACK) {
        removepatchcables(this);
      }
      var repair = type == 'repair';
      if(!e.ctrlKey && !e.shiftKey) changeMode = null;
      if(!repair) {
        this.type = type;
        this.value = value;
        if(!symbol) return;
      } else {
        this.disabled = 0; // repair
      }
      for(var i = 0; i < this.cells.length; i++) {
        var cell = world[this.cells[i][1]][this.cells[i][0]];
        if(!repair) {
          if(!devicemap[cell.circuitsymbol]) continue;
          cell.symbol = symbol;
          cell.displaysymbol = symbol;
          cell.circuitsymbol = symbol;
        }
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
      if(!vte && this.parent) vte = this.parent.vte;
      if(vte && vte.supportsTyping() && !vte.invisible) {
        vte.getKeyboardFocus();
      }
    }
    if(this.type == TYPE_ROM) {
      //throw 'todo: must reimplement this, to not use x/y coords directly but the true line/bit pos';
      var rom = this;
      if(this.parent) rom = this.parent;
      if(rom.rom) rom = rom.rom;
      if(!rom.array) return;
      if(rom.decoder || rom.encoder) return;

      //var x = this.corecell.x, y = this.corecell.y;
      var bit;
      var line;
      if(rom.wordshor == 1) {
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
    if(this.type == TYPE_JACK) {
      if(jackclick) {
        connectjacks(this, jackclick);
        jackclick = null;
        util.removeElement(jackclickdiv);
        updateJacks();
      } else {
        jackclick = this;
        drawstartjack(this);
      }
    } else {
      jackclick = null;
      util.removeElement(jackclickdiv);
    }
    if(!paused) update();
  };

  this.mouseup = function(e) {
    // For pushbutton, do the update immediately, to avoid missing a tick when quickly pressing mouse down then up again
    if(this.type == TYPE_PUSHBUTTON_OFF) {
      if(!e.shiftKey) {
        if(paused) {
          this.pushbuttonflipwhilepaused = true;
        } else {
          this.type = TYPE_PUSHBUTTON_ON;
          this.corecell.renderer.setLook(this.corecell, this.type);
        }
      }
    } else if(this.type == TYPE_PUSHBUTTON_ON) {
      if(!e.shiftKey) {
        if(paused) {
          this.pushbuttonflipwhilepaused = true;
        } else {
          this.type = TYPE_PUSHBUTTON_OFF;
          this.corecell.renderer.setLook(this.corecell, this.type);
        }
      }
    } else {
      return false; // did nothing
    }
    if(!paused) update();
    return !e.shiftKey; // did something
  };
}

// draw a line in plain HTML/CSS, not on canvas. Returns the created element.
function drawLine(x0, y0, x1, y1, color, thickness, opt_parent) {
  var parent = opt_parent || document.body;
  var dist = Math.floor(Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)));
  var angle = Math.atan2(y1 - y0, x1 - x0);
  var div = document.createElement('div');
  div.style.backgroundColor = color;
  div.style.position = 'absolute';
  div.style.width = '' + dist + 'px';
  div.style.height = '' + thickness + 'px';
  div.style.top = y0 + 'px';
  div.style.left = x0 + 'px';
  div.style.transformOrigin = 'top left';
  div.style.transform = 'rotate(' + angle + 'rad)';
  div.style.zIndex = '2';
  parent.appendChild(div);
  return div;
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
var GATEFGONCOLOR;
var GATEFGOFFCOLOR;

var LINKCOLOR;
var TITLECOLOR;
var TERMINALBGCOLOR;
var TERMINALFGCOLOR;
var TERMINALMIDCOLOR; // used to indicate cursor can be placed here
var OUTSIDESCREENBGCOLOR;
var OUTSIDESCREENFGCOLOR;

var BUSCOLORS;

var CHIPLABELBGCOLOR;
var CHIPLABELFGCOLOR;

var ERRORBGCOLOR;
var ERRORFGCOLOROFF;
var ERRORFGCOLORON;

var currentcolorschemeindex = 0;

function setColorScheme(index) {
  currentcolorschemeindex = index;
  computeColorScheme(index);
}

function computeColorScheme(index) {

  // random
  if(index == 12) {
    randomizeColorScheme();
    return;
  }

  // custom
  if(index == 13) {
    importColorScheme(customcolorscheme);
    return;
  }

  CHIPLABELBGCOLOR = '#feb';
  CHIPLABELFGCOLOR = '#000';
  ERRORBGCOLOR = '#ff0';
  ERRORFGCOLOROFF = '#f00';
  ERRORFGCOLORON = '#f88';
  OUTSIDESCREENBGCOLOR = '#444';
  OUTSIDESCREENFGCOLOR = '#fff';

  rgb_led_bg_colors = [
      // 0-1: 1-bit palette: 2 colors, black and white. Slightly different values instead of #000 #fff to be subtly visible against white/black main background
      '#111', '#eee',
      // 2-6: 4-color palette: RG
      '#111', '#0f0', '#f00', '#ff0',
      // 6-13: 8-color palette: RGB
      '#111', '#00f', '#0f0', '#0ff', '#f00', '#f0f', '#ff0', '#fff',
      // 14-29: 16 color palette: RGBI
      '#111', '#00a', '#0a0', '#0aa', '#a00', '#a0a', '#a50', '#aaa', '#555', '#55f', '#5f5', '#5ff', '#f55', '#f5f', '#ff5', '#fff',
      // 30-34: oscilloscope colors
      '#111a11', '#151', '#181', '#1c1', '#1f1',
  ];
  // 35-61: 27 color palette: 3-level RGB
  for(var i = 0; i < 27; i++) {
    var b = i % 3;
    var g = Math.floor(i / 3) % 3;
    var r = Math.floor(i  / 9) % 3;
    var a = ['00', '7f', 'ff'];
    rgb_led_bg_colors.push('#' + a[r] + a[g] + a[b]);
  }
  // 62-125: 64 color palette: 4-level RGB
  for(var i = 0; i < 64; i++) {
    var b = i & 3;
    var g = (i >> 2) & 3;
    var r = (i >> 4) & 3;
    var a = ['0', '5', 'a', 'f'];
    rgb_led_bg_colors.push('#' + a[r] + a[g] + a[b]);
  }
  // 126-250: 125 color palette: 5-level RGB
  for(var i = 0; i < 125; i++) {
    var b = i % 5;
    var g = Math.floor(i / 5) % 5;
    var r = Math.floor(i  / 25) % 5;
    var a = ['00', '3f', '7f', 'bf', 'ff'];
    rgb_led_bg_colors.push('#' + a[r] + a[g] + a[b]);
  }
  // 251-466: 216 color palette: 6-level RGB
  for(var i = 0; i < 216; i++) {
    var b = i % 6;
    var g = Math.floor(i / 6) % 6;
    var r = Math.floor(i  / 36) % 6;
    var a = ['0', '3', '6', '9', 'c', 'f'];
    rgb_led_bg_colors.push('#' + a[r] + a[g] + a[b]);
  }
  // 467-978: 512 color palette: 8-level RGB
  for(var i = 0; i < 512; i++) {
    var b = i & 7;
    var g = Math.floor(i >> 3) & 7;
    var r = Math.floor(i  >> 6) & 7;
    var a = ['00', '24', '48', '6c', '90', 'b4', 'd8', 'ff'];
    rgb_led_bg_colors.push('#' + a[r] + a[g] + a[b]);
  }
  rgb_led_fg_colors = [];
  for(var i = 0; i < rgb_led_bg_colors.length; i++) {
    rgb_led_fg_colors[i] = util.twiddleColor(rgb_led_bg_colors[i], 80);
  }


  if(index == 0) { // light
    ONCOLOR = '#200';
    OFFCOLOR = '#999';
    BGCOLOR = '#fafafa';
    TEXTFGCOLOR = '#333'; // '#940';
    TEXTBGCOLOR = '#eef';

    led_off_fg_colors = ['#d66', '#d96', '#dd6', '#6d6', '#66d', '#60d', '#d66', '#666', '#000'];
    led_off_bg_colors = ['#fffafa', '#fffcfa', '#fffff4', '#fafffa', '#fbfdff', '#faf8ff', '#fffdfd', '#fcfcfc', '#f00'];
    led_off_border_colors = led_off_fg_colors;//['#fcc', '#fa8', '#cc2', '#afa', '#ddf', '#d8f', '#fac', '#999', '#000'];
    led_on_fg_colors = ['red', '#a40', '#880', 'green', '#44f', '#80f', '#d58', '#fff', '#080'];
    led_on_bg_colors = ['#faa', '#fca', '#ff4', '#afa', '#bdf', '#a8f', '#fdd', '#ccc', '#0f0'];
    led_on_border_colors = led_on_fg_colors;


    BUSCOLORS = ['#aaa', '#aab', '#aba', '#baa', '#bba', '#bab', '#abb', '#bbb'];

    SWITCHON_FGCOLOR = led_on_fg_colors[3];
    SWITCHON_BGCOLOR = led_on_bg_colors[3];
    SWITCHOFF_FGCOLOR = led_off_fg_colors[3];
    SWITCHOFF_BGCOLOR = led_off_bg_colors[3];
    SWITCHON_BORDERCOLOR = SWITCHON_FGCOLOR;
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    GATEBGCOLOR = '#f7f7f7';
    GATEFGONCOLOR = ONCOLOR;
    GATEFGOFFCOLOR = OFFCOLOR;

    OUTSIDESCREENBGCOLOR = '#444';
    OUTSIDESCREENFGCOLOR = '#fff';

    LINKCOLOR = '#06f';
    TITLECOLOR = 'black';

    TERMINALBGCOLOR = 'black';
    TERMINALFGCOLOR = '#0d0';
  } else if(index == 1) { // dark
    ONCOLOR = '#f44';
    OFFCOLOR = '#080';
    BGCOLOR = 'black';
    TEXTFGCOLOR = '#da0'; // '#0c0'; //'#fff';
    TEXTBGCOLOR = '#210'; // '#020'; //'#040';

    led_off_fg_colors = ['#d66', '#d96', '#dd6', '#6d6', '#66d', '#60d', '#d66', '#666', '#f88'];
    led_off_bg_colors = ['#400', '#420', '#440', '#040', '#004', '#204', '#422', '#444', '#f00'];
    led_off_border_colors = led_off_fg_colors;//['#800', '#840', '#880', '#080', '#008', '#408', '#844', '#888', '#f88'];
    led_on_fg_colors = ['red', '#a40', '#880', 'green', '#44f', '#80f', '#d58', '#aaa', '#080'];
    led_on_bg_colors = ['#faa', '#fca', '#ff4', '#afa', '#bdf', '#a8f', '#fdd', '#fff', '#0f0'];
    led_on_border_colors = led_on_fg_colors;

    BUSCOLORS = ['#080', '#480', '#0c0', '#4c0', '#084', '#484', '#0c4', '#4c4'];

    SWITCHON_FGCOLOR = ONCOLOR;
    SWITCHON_BGCOLOR = led_on_bg_colors[3];
    SWITCHOFF_FGCOLOR = '#0e0';
    SWITCHOFF_BGCOLOR = 'black';
    SWITCHON_BORDERCOLOR = SWITCHON_FGCOLOR;
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    GATEBGCOLOR = '#020';
    GATEFGONCOLOR = ONCOLOR;
    GATEFGOFFCOLOR = OFFCOLOR;

    LINKCOLOR = '#880';
    TITLECOLOR = TEXTFGCOLOR;

    TERMINALBGCOLOR = '#00f';
    TERMINALFGCOLOR = '#fff';
  } else if(index == 2) { // gray
    computeColorScheme(0);

    BGCOLOR = '#aaa';

    ONCOLOR = 'white';
    OFFCOLOR = 'black';
    TEXTFGCOLOR = '#00a';
    //TEXTBGCOLOR = 'none';
    TEXTBGCOLOR = '#bbc';
    LINKCOLOR = '#22f';

    GATEBGCOLOR = '#9b9b9b'; // '#b4b4b4';
    GATEFGONCOLOR = ONCOLOR;
    GATEFGOFFCOLOR = OFFCOLOR;

    var offbg = GATEBGCOLOR;
    led_off_fg_colors = ['#f00', '#f80', '#dd0', '#0d0', '#88f', '#a0d', '#f99', '#eee', 'white'];
    led_off_bg_colors = [offbg, offbg, offbg, offbg, offbg, offbg, offbg, offbg, '#f00'];
    led_off_border_colors = led_off_fg_colors;
    led_on_fg_colors = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
    led_on_bg_colors = ['#f00', '#f80', '#dd0', '#0d0', '#88f', '#a0d', '#f99', '#eee', '#0f0'];
    led_on_border_colors = led_on_fg_colors;//led_off_border_colors

    SWITCHON_FGCOLOR = 'white';
    SWITCHON_BGCOLOR = '#0e0';
    SWITCHOFF_FGCOLOR = '#0e0';
    SWITCHOFF_BGCOLOR = offbg;
    //TODO: use switch border colors, and use them to not have invisible border around swithc in gray color scheme switch on
    SWITCHON_BORDERCOLOR = 'white';
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    BUSCOLORS = ['#666', '#665', '#656', '#566', '#556', '#565', '#655', '#555'];

  } else if(index == 3) { // red
    computeColorScheme(0);
    BGCOLOR = '#500';
    TEXTBGCOLOR = '#720';

    var offbg = BGCOLOR;
    led_off_fg_colors = ['#f22', '#f80', '#dd0', '#0d0', '#88f', '#f0f', '#f99', '#eee', 'white'];
    led_off_bg_colors = [offbg, offbg, offbg, offbg, offbg, offbg, offbg, offbg, '#f00'];
    led_off_border_colors = led_off_fg_colors;
    led_on_fg_colors = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
    led_on_bg_colors = ['#f00', '#f80', '#dd0', '#0d0', '#88f', '#a0d', '#f99', '#eee', '#0f0'];
    led_on_border_colors = led_on_fg_colors;//led_off_border_colors

    ONCOLOR = '#fff';
    OFFCOLOR = '#f44';
    TEXTFGCOLOR = ONCOLOR;

    GATEBGCOLOR = '#800';
    GATEFGONCOLOR = ONCOLOR;
    GATEFGOFFCOLOR = OFFCOLOR;

    OUTSIDESCREENBGCOLOR = GATEBGCOLOR;
    OUTSIDESCREENFGCOLOR = GATEFGOFFCOLOR;

    SWITCHON_FGCOLOR = 'white';
    SWITCHON_BGCOLOR = '#0e0';
    SWITCHOFF_FGCOLOR = '#0e0';
    SWITCHOFF_BGCOLOR = GATEBGCOLOR;
    //TODO: use switch border colors, and use them to not have invisible border around swithc in gray color scheme switch on
    SWITCHON_BORDERCOLOR = 'white';
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    LINKCOLOR = '#88f';
    TITLECOLOR = ONCOLOR;
  } else if(index == 4) { // green
    computeColorScheme(0);

    BGCOLOR = '#050';

    ONCOLOR = '#fa0';
    OFFCOLOR = '#af0';
    TEXTFGCOLOR = OFFCOLOR;

    var offbg = BGCOLOR;
    led_off_fg_colors = ['#f00', '#f80', '#dd0', '#0d0', '#88f', '#a0d', '#f99', '#eee', 'white'];
    led_off_bg_colors = [offbg, offbg, offbg, offbg, offbg, offbg, offbg, offbg, '#f00'];
    led_off_border_colors = led_off_fg_colors;
    led_on_fg_colors = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
    led_on_bg_colors = ['#f00', '#f80', '#dd0', '#0d0', '#88f', '#a0d', '#f99', '#eee', '#0f0'];
    led_on_border_colors = led_on_fg_colors;//led_off_border_colors

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
    GATEFGONCOLOR = ONCOLOR;
    GATEFGOFFCOLOR = OFFCOLOR;

    LINKCOLOR = '#ff0';
    TITLECOLOR = TEXTFGCOLOR;
  } else if(index == 5) { // blue
    computeColorScheme(0);

    BGCOLOR = '#008';

    ONCOLOR = '#fff';
    OFFCOLOR = '#aaf';
    TEXTFGCOLOR = '#aaa';

    var offbg = BGCOLOR;
    led_off_fg_colors = ['#f00', '#f80', '#dd0', '#0d0', '#88f', '#a0d', '#f99', '#eee', 'white'];
    led_off_bg_colors = [offbg, offbg, offbg, offbg, offbg, offbg, offbg, offbg, '#f00'];
    led_off_border_colors = led_off_fg_colors;
    led_on_fg_colors = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
    led_on_bg_colors = ['#f00', '#f80', '#dd0', '#0d0', '#88f', '#a0d', '#f99', '#eee', '#0f0'];
    led_on_border_colors = led_on_fg_colors;//led_off_border_colors

    SWITCHON_FGCOLOR = 'white';
    SWITCHON_BGCOLOR = '#0e0';
    SWITCHOFF_FGCOLOR = '#0e0';
    SWITCHOFF_BGCOLOR = '#028';
    //TODO: use switch border colors, and use them to not have invisible border around swithc in gray color scheme switch on
    SWITCHON_BORDERCOLOR = 'white';
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    BUSCOLORS = ['#aaf', '#caf', '#acf', '#ccf', '#aaa', '#caa', '#aca', '#cca'];

    TEXTBGCOLOR = '#22a';
    GATEBGCOLOR = '#228';
    GATEFGONCOLOR = ONCOLOR;
    GATEFGOFFCOLOR = OFFCOLOR;

    LINKCOLOR = '#880';
    TITLECOLOR = TEXTFGCOLOR;
  } else if(index == 6) { // brown
    computeColorScheme(0);
    BGCOLOR = '#a60';
    TEXTBGCOLOR = '#720';

    var offbg = '#000';
    led_off_fg_colors = ['#f00', '#f80', '#dd0', '#0d0', '#88f', '#f0f', '#f99', '#eee', 'white'];
    led_off_bg_colors = [offbg, offbg, offbg, offbg, offbg, offbg, offbg, offbg, '#f00'];
    led_off_border_colors = led_off_fg_colors;
    led_on_fg_colors = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
    led_on_bg_colors = ['#f00', '#f80', '#dd0', '#0d0', '#88f', '#a0d', '#f99', '#eee', '#0f0'];
    led_on_border_colors = led_on_fg_colors;//led_off_border_colors

    ONCOLOR = '#fe0';
    OFFCOLOR = '#000';
    TEXTFGCOLOR = '#fdb';

    GATEBGCOLOR = '#a60';
    GATEFGONCOLOR = ONCOLOR;
    GATEFGOFFCOLOR = OFFCOLOR;

    OUTSIDESCREENBGCOLOR = GATEBGCOLOR;
    OUTSIDESCREENFGCOLOR = GATEFGOFFCOLOR;

    SWITCHON_FGCOLOR = 'white';
    SWITCHON_BGCOLOR = '#0e0';
    SWITCHOFF_FGCOLOR = '#0e0';
    SWITCHOFF_BGCOLOR = GATEBGCOLOR;
    //TODO: use switch border colors, and use them to not have invisible border around swithc in gray color scheme switch on
    SWITCHON_BORDERCOLOR = 'white';
    SWITCHOFF_BORDERCOLOR = SWITCHOFF_FGCOLOR;

    LINKCOLOR = '#ccf';
    TITLECOLOR = ONCOLOR;
  } else if(index == 7) { // candy
    computeColorScheme(0);

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
    GATEFGONCOLOR = ONCOLOR;
    GATEFGOFFCOLOR = OFFCOLOR;
    SWITCHON_BGCOLOR = '#afa';
    SWITCHOFF_BGCOLOR = TEXTBGCOLOR;

    led_off_fg_colors = ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'];
    led_off_bg_colors = ['#fae', '#fbe', '#fde', '#ded', '#c9f', '#e9f', '#fbf', '#fcf', '#f00'];
    led_off_border_colors = led_off_fg_colors;
    led_on_fg_colors = ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'];
    led_on_bg_colors = ['#f00', '#f80', '#ff0', '#0f0', '#48f', '#a0f', '#f99', '#fff', '#0f0'];
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
  } else if(index == 8) { // inverted
    computeColorScheme(0);
    negateColorScheme(); // this only looks decent for inverting the 'light' color scheme.
  } else if(index == 9) { // contrast
    computeColorScheme(2); //gray
    BGCOLOR = '#999';
    ONCOLOR = 'white';
    OFFCOLOR = 'black';

    GATEBGCOLOR = '#111'; //'#a98'; // '#b4b4b4';
    GATEFGONCOLOR = '#fff';
    GATEFGOFFCOLOR = '#aaa';

    var ledoffbg = '#000'; // NOTE: disadvantage of LED BG color that differs a lot from main BGCOLOR: 7-segment displays made from LEDs are harder to read
    led_off_bg_colors = [ledoffbg, ledoffbg, ledoffbg, ledoffbg, ledoffbg, ledoffbg, ledoffbg, ledoffbg, ledoffbg];
    led_off_fg_colors[8] = led_off_fg_colors[0];
    led_off_border_colors[8] = led_off_border_colors[0];
    SWITCHOFF_BGCOLOR = ledoffbg;

    TEXTFGCOLOR = '#000';
    TEXTBGCOLOR = '#fff';
    LINKCOLOR = '#22f';
  } else if(index == 10 || index == 11) { // monochrome
    ONCOLOR = (index == 10 ? 'black' : 'white');
    OFFCOLOR = ONCOLOR;
    BGCOLOR = (index == 10 ? 'white' : 'black');
    TEXTFGCOLOR = ONCOLOR; // '#940';
    TEXTBGCOLOR = BGCOLOR;

    led_off_fg_colors = [ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR];
    led_off_bg_colors = [BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR];
    led_off_border_colors = [ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR];
    led_on_fg_colors = [BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR];
    led_on_bg_colors = [ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR, ONCOLOR];
    led_on_border_colors = [BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR, BGCOLOR];

    // for monochrome RGB led: hidden in main background if off, same color as wire if on (for its bg color; its letter G has opposite color)
    rgb_led_bg_colors = [];
    rgb_led_fg_colors = [];
    for(var i = 0; i <= 978; i++) {
      if(i == 0 || i == 2 || i == 6 || i == 14 || i == 30 || i == 35 || i == 62 || i == 126 || i == 251 || i == 467) {
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
    GATEFGONCOLOR = ONCOLOR;
    GATEFGOFFCOLOR = OFFCOLOR;

    OUTSIDESCREENBGCOLOR = BGCOLOR;
    OUTSIDESCREENFGCOLOR = OFFCOLOR;

    LINKCOLOR = (index == 11) ? '#88f' : 'blue';
    TITLECOLOR = ONCOLOR;

    TERMINALBGCOLOR = ONCOLOR;
    TERMINALFGCOLOR = BGCOLOR;
    CHIPLABELBGCOLOR = BGCOLOR;
    CHIPLABELFGCOLOR = ONCOLOR;

    // ERRORBGCOLOR remains yellow to keep clearly indicating those
    ERRORFGCOLOROFF = 'black';
    ERRORFGCOLORON = 'black';
  }

  TERMINALMIDCOLOR = util.averageColor(TERMINALFGCOLOR, TERMINALBGCOLOR);

  if(index != 10 && index != 11) {
    // the "LCD" LED color; its off background color must match the main BGCOLOR.

    // variant A: ON LCD uses the wire ON color
    /*led_off_fg_colors[9] = OFFCOLOR;
    led_off_bg_colors[9] = BGCOLOR;
    led_off_border_colors[9] = OFFCOLOR;
    led_on_fg_colors[9] = OFFCOLOR;
    led_on_bg_colors[9] = ONCOLOR;
    led_on_border_colors[9] = OFFCOLOR;*/

    // variant B: ON LCD uses the wire OFF color
    led_off_fg_colors[9] = OFFCOLOR;
    led_off_bg_colors[9] = BGCOLOR;
    led_off_border_colors[9] = OFFCOLOR;
    led_on_fg_colors[9] = BGCOLOR;
    led_on_bg_colors[9] = OFFCOLOR;
    led_on_border_colors[9] = BGCOLOR;
  }
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
  GATEFGONCOLOR = util.negateColor(GATEFGONCOLOR);
  GATEFGOFFCOLOR = util.negateColor(GATEFGOFFCOLOR);
  LINKCOLOR = util.negateColor(LINKCOLOR);
  TITLECOLOR = util.negateColor(TITLECOLOR);
  TERMINALBGCOLOR = util.negateColor(TERMINALBGCOLOR);
  TERMINALMIDCOLOR = util.negateColor(TERMINALMIDCOLOR);
  TERMINALFGCOLOR = util.negateColor(TERMINALFGCOLOR);
  CHIPLABELBGCOLOR = util.negateColor(CHIPLABELBGCOLOR);
  CHIPLABELFGCOLOR = util.negateColor(CHIPLABELFGCOLOR);
  // error-colors not negated, should remain yellow+red
}

function randomColor(dark, bright) {
  var hex = '0123456789ABCDEF';
  var result = '#';
  if(dark) for(var i = 0; i < 3; i++) result += hex[Math.floor(Math.random() * 8)] + hex[Math.floor(Math.random() * 16)];
  else if(bright) for(var i = 0; i < 3; i++) result += hex[8 + Math.floor(Math.random() * 8)] + hex[Math.floor(Math.random() * 16)];
  else for(var i = 0; i < 6; i++) result += hex[Math.floor(Math.random() * 16)];
  return result;
}

// generate two random colors, with a higher chance of being more different
function randomColorPair(dark, bright) {
  var hex = '0123456789ABCDEF';
  var result = '#';

  var random = function() {
    if(dark) return Math.random() * 0.5;
    else if(bright) return 0.5 + Math.random() * 0.5;
    else return Math.random();
  };

  var a = [], b = [], c = [];
  var dab = 0, dbc = 0, dac = 0;
  for(var i = 0; i < 3; i++) {
    a.push(random());
    b.push(random());
    c.push(random());
    dab += (a[i] - b[i]) * (a[i] - b[i]);
    dbc += (b[i] - c[i]) * (b[i] - c[i]);
    dac += (a[i] - c[i]) * (a[i] - c[i]);
  }
  if(dab > dbc && dab > dac) {
    // keep
  } else if(dbc > dac) {
    a = b;
    b = c;
  } else {
    b = c;
  }

  var resulta = '#', resultb = '#';

  for(var i = 0; i < 3; i++) {
    resulta +=  hex[Math.floor(a[i] * 16)] + hex[Math.floor(Math.random() * 16)];
    resultb +=  hex[Math.floor(b[i] * 16)] + hex[Math.floor(Math.random() * 16)];
  }
  return [resulta, resultb];
}

function randomizeColorScheme() {
  // while most colors are entirely random (and thus have too low contrast in some cases), ensure a few things, such as text vs background, are in distinct groups "dark" and "bright"
  var dark = Math.random() < 0.5;
  var onoff;
  computeColorScheme(2); // get correct array lengths etc...
  BGCOLOR = randomColor(dark, !dark);
  onoff = randomColorPair(!dark, dark);
  ONCOLOR = onoff[0];
  OFFCOLOR = onoff[1];
  GATEBGCOLOR = randomColor(dark, !dark);
  onoff = randomColorPair(!dark, dark);
  GATEFGONCOLOR = onoff[0];
  GATEFGOFFCOLOR = onoff[1];
  TEXTFGCOLOR = randomColor(!dark, dark);
  TEXTBGCOLOR = randomColor(dark, !dark);
  for(var i = 0; i < BUSCOLORS.length; i++) BUSCOLORS[i] = randomColor();
  TERMINALFGCOLOR = randomColor(!dark, dark);
  TERMINALMIDCOLOR = randomColor();
  TERMINALBGCOLOR = randomColor(dark, !dark);
  OUTSIDESCREENFGCOLOR = randomColor();
  OUTSIDESCREENBGCOLOR = randomColor();
  LINKCOLOR = randomColor(!dark, dark);
  TITLECOLOR = randomColor(!dark, dark);
  CHIPLABELFGCOLOR = randomColor(!dark, dark);
  CHIPLABELBGCOLOR = randomColor(dark, !dark);
}

function randomizeColorSchemeAndRedraw() {
  randomizeColorScheme();
  initDivs();
  render();
}

// more: also LED, switch and error colors
function randomizeColorSchemeMore() {
  randomizeColorSchemeMild();
  for(var i = 0; i < led_off_fg_colors.length; i++) led_off_fg_colors[i] = randomColor();
  for(var i = 0; i < led_off_bg_colors.length; i++) led_off_bg_colors[i] = randomColor();
  for(var i = 0; i < led_off_border_colors.length; i++) led_off_border_colors[i] = randomColor();
  for(var i = 0; i < led_on_fg_colors.length; i++) led_on_fg_colors[i] = randomColor();
  for(var i = 0; i < led_on_bg_colors.length; i++) led_on_bg_colors[i] = randomColor();
  for(var i = 0; i < led_on_border_colors.length; i++) led_on_border_colors[i] = randomColor();
  SWITCHOFF_FGCOLOR = randomColor();
  SWITCHOFF_BGCOLOR = randomColor();
  SWITCHOFF_BORDERCOLOR = randomColor();
  SWITCHON_FGCOLOR = randomColor();
  SWITCHON_BGCOLOR = randomColor();
  SWITCHON_BORDERCOLOR = randomColor();
  ERRORBGCOLOR = randomColor();
  ERRORFGCOLOROFF = randomColor();
  ERRORFGCOLORON = randomColor();
}

function randomizeColorSchemeMoreAndRedraw() {
  randomizeColorSchemeMore();
  initDivs();
  render();
}

function exportColorScheme() {
  var result = '';
  result += 'background:' + BGCOLOR + '\n';
  result += 'on:' + ONCOLOR + '\n';
  result += 'off:' + OFFCOLOR + '\n';
  result += 'gate_bg:' + GATEBGCOLOR + '\n';
  result += 'gate_on:' + GATEFGONCOLOR + '\n';
  result += 'gate_off:' + GATEFGOFFCOLOR + '\n';
  result += 'text_fg:' + TEXTFGCOLOR + '\n';
  result += 'text_bg:' + TEXTBGCOLOR + '\n';
  result += 'bus:' + BUSCOLORS.join(',') + '\n';
  result += 'led_off_fg:' + led_off_fg_colors.join(',') + '\n';
  result += 'led_off_bg:' + led_off_bg_colors.join(',') + '\n';
  result += 'led_off_border:' + led_off_border_colors.join(',') + '\n';
  result += 'led_on_fg:' + led_on_fg_colors.join(',') + '\n';
  result += 'led_on_bg:' + led_on_bg_colors.join(',') + '\n';
  result += 'led_on_border:' + led_on_border_colors.join(',') + '\n';
  result += 'switch_off_fg:' + SWITCHOFF_FGCOLOR + '\n';
  result += 'switch_off_bg:' + SWITCHOFF_BGCOLOR + '\n';
  result += 'switch_off_border:' + SWITCHOFF_BORDERCOLOR + '\n';
  result += 'switch_on_fg:' + SWITCHON_FGCOLOR + '\n';
  result += 'switch_on_bg:' + SWITCHON_BGCOLOR + '\n';
  result += 'switch_on_border:' + SWITCHON_BORDERCOLOR + '\n';
  result += 'terminal_fg:' + TERMINALFGCOLOR + '\n';
  result += 'terminal_mid:' + TERMINALMIDCOLOR + '\n';
  result += 'terminal_bg:' + TERMINALBGCOLOR + '\n';
  result += 'terminal_outside_fg:' + OUTSIDESCREENFGCOLOR + '\n';
  result += 'terminal_outside_bg:' + OUTSIDESCREENBGCOLOR + '\n';
  result += 'link:' + LINKCOLOR + '\n';
  result += 'title:' + TITLECOLOR + '\n';
  result += 'chiplabel_fg:' + CHIPLABELFGCOLOR + '\n';
  result += 'chiplabel_bg:' + CHIPLABELBGCOLOR + '\n';
  result += 'error_bg:' + ERRORBGCOLOR + '\n';
  result += 'error_fg_off:' + ERRORFGCOLOROFF + '\n';
  result += 'error_fg_on:' + ERRORFGCOLORON + '\n';

  return result;
}


function importColorScheme(scheme) {
  computeColorScheme(0); // defaults in case of missing fields or for the arrays if too short length
  if(!scheme) return;

  var lines = scheme.split('\n');
  for(var i = 0; i < lines.length; i++) {
    var pair = lines[i].split(':');
    if(pair.length == 0 || lines[i].length == 0) continue;
    if(pair.length != 2) {
      console.log('importColorScheme: invalid line: ' + lines[i]);
    }
    var key = pair[0];
    var color = pair[1]; // must follow CSS color format
    if(key == 'background') BGCOLOR = color;
    else if(key == 'on') ONCOLOR = color;
    else if(key == 'off') OFFCOLOR = color;
    else if(key == 'gate_bg') GATEBGCOLOR = color;
    else if(key == 'gate_on') GATEFGONCOLOR = color;
    else if(key == 'gate_off') GATEFGOFFCOLOR = color;
    else if(key == 'text_fg') TEXTFGCOLOR = color;
    else if(key == 'text_bg') TEXTBGCOLOR = color;
    else if(key == 'bus') {
      var colors = color.split(',');
      var len = Math.min(BUSCOLORS.length, colors.length) || 0;
      for(var j = 0; j < len; j++) BUSCOLORS[j] = colors[j];
    }
    else if(key == 'led_off_fg') {
      var colors = color.split(',');
      var len = Math.min(led_off_fg_colors.length, colors.length) || 0;
      for(var j = 0; j < len; j++) led_off_fg_colors[j] = colors[j];
    }
    else if(key == 'led_off_bg') {
      var colors = color.split(',');
      var len = Math.min(led_off_bg_colors.length, colors.length) || 0;
      for(var j = 0; j < len; j++) led_off_bg_colors[j] = colors[j];
    }
    else if(key == 'led_off_border') {
      var colors = color.split(',');
      var len = Math.min(led_off_border_colors.length, colors.length) || 0;
      for(var j = 0; j < len; j++) led_off_border_colors[j] = colors[j];
    }
    else if(key == 'led_on_fg') {
      var colors = color.split(',');
      var len = Math.min(led_on_fg_colors.length, colors.length) || 0;
      for(var j = 0; j < len; j++) led_on_fg_colors[j] = colors[j];
    }
    else if(key == 'led_on_bg') {
      var colors = color.split(',');
      var len = Math.min(led_on_bg_colors.length, colors.length) || 0;
      for(var j = 0; j < len; j++) led_on_bg_colors[j] = colors[j];
    }
    else if(key == 'led_on_border') {
      var colors = color.split(',');
      var len = Math.min(led_on_border_colors.length, colors.length) || 0;
      for(var j = 0; j < len; j++) led_on_border_colors[j] = colors[j];
    }
    else if(key == 'switch_off_fg') SWITCHOFF_FGCOLOR = color;
    else if(key == 'switch_off_bg') SWITCHOFF_BGCOLOR = color;
    else if(key == 'switch_off_border') SWITCHOFF_BORDERCOLOR = color;
    else if(key == 'switch_on_fg') SWITCHON_FGCOLOR = color;
    else if(key == 'switch_on_bg') SWITCHON_BGCOLOR = color;
    else if(key == 'switch_on_border') SWITCHON_BORDERCOLOR = color;
    else if(key == 'terminal_fg') TERMINALFGCOLOR = color;
    else if(key == 'terminal_mid') TERMINALMIDCOLOR = color;
    else if(key == 'terminal_bg') TERMINALBGCOLOR = color;
    else if(key == 'terminal_outside_fg') OUTSIDESCREENFGCOLOR = color;
    else if(key == 'terminal_outside_bg') OUTSIDESCREENBGCOLOR = color;
    else if(key == 'link') LINKCOLOR = color;
    else if(key == 'title') TITLECOLOR = color;
    else if(key == 'chiplabel_fg') CHIPLABELFGCOLOR = color;
    else if(key == 'chiplabel_bg') CHIPLABELBGCOLOR = color;
    else if(key == 'error_bg') ERRORBGCOLOR = color;
    else if(key == 'error_fg_off') ERRORFGCOLOROFF = color;
    else if(key == 'error_fg_on') ERRORFGCOLORON = color;
    else console.log('unknown key: ' + key);
  }
}

function importColorSchemeAndRedraw(scheme) {
  importColorScheme(scheme);
  initDivs();
  render();
}

var colorscheme = util.getLocalStorage('color_scheme') || 0;
var customcolorscheme = util.getLocalStorage('custom_color_scheme') || 0;


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
    return new RendererImg();
  } else if(graphics_mode_actual == 1) {
    return new RendererText();
  } else if(graphics_mode_actual == 2) {
    return new RendererSource();
  }
}


var CLICKDEBUG = false;

function Cell() {
  this.origsymbol = ''; // the original parsed symbol from the text, unaltered
  this.symbol = ''; // almost always equal to origsymbol, with just very few exceptions (toc, some string alterations, ...)
  this.displaysymbol = ''; // the symbol that will be displayed for this cell (sometimes different than the text, e.g. ! gets hidden, ...)
  this.circuitsymbol = ''; // symbols that take part of circuits, does NOT include comments, numbers (those only alter circuit properties), ...
  this.metasymbol = ''; // like symbol, but comments get all replaced by '"' (use this to check for comment, or for number digits, instead of circuitsymbol)
  this.labelsymbol = null; // used for only very few cell types, for extra text that couldn't be stored in displaysymbol since displaysymbol will render according to actual symbol meaning (e.g. switch becomes green)
  // extra information in addition to circuitsymbol in some cases.
  // For ^>v<m]w[ inputs: 0 = input reacting to devices on sides too, 1 = input not reacting to devices on sides, 2 = diagonal crossing input (diaginput).
  // For 'g': if 1, is number (so connected to real g's, unlike g's which don't normally interact)
  // For antennas: if 0, antenna behaves similar as a 'g' but connecting to one matching antenna rather than all matching numbered global wires. If 1, antenna acts as a neighbor-warp, which allows to make wrap-around circuits; if 2, similar to 0 but won't connect to something sandwiched in between short hop, like the x in (x)
  this.circuitextra = 0;
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
  this.commentstyle = 0; // 0=full width, 1=narrow width monospace, 2=formatted, 3=horizontal rule, 9=hidden source code comment
  this.commentchapter = -1;
  this.commentanchor = ''; // only used if this is chapter title
  this.commentlength = 0; // the text itself
  this.commentlength2 = 0; // including any quotes or styling numbers
  this.antennax = -1; // horizontal matching antenna, if any
  this.antennay = -1; // vertical matching antenna, if any
  this.drawchip = false; // TODO: this feature is now ignored! stop setting this field and remove it. -- when drawing the 'i' of a chip in canvas mode, only do it if this is true, it indicates a good looking "core" cell for it (next to number, ...)
  this.isvte = false; // for drawing
  this.isalutext = false; // for drawing. This makes the cell always display as "on". This is done for the text labels on an ALU with the op name, because otherwise the op name is harder to read (contrast), and also changes color per character depending on whether there happen to be individual outputs there, which is undesired.
  this.clusterindex = -1; // for components connected together with extenders '#'. This is not only for large devices, but also for standard logic gates extended with #, such as a###a forming a single AND gate.
  // cell error is used for some parsing errors that occur before components are created, e.g. during parseLargeDevices. But once components are there, component.error is mainly used.
  this.error = false;
  this.errormessage = null;

  this.renderer = null;
  this.clickFun = null;

  this.largedevicearray = null;
  this.largedevicetype = TYPE_NULL;

  // Update the style based on current value in the component
  this.setValue = function(value) {
    if(this.circuitsymbol == 'b' || this.circuitsymbol == 'B') {
      var parent = this.components[0] || this.components[1];
      if(!parent) return;
      if(parent.parent) parent = parent.parent;
      var rom = parent.rom;
      if(!rom) return;
      var co = rom.wordshor ? (this.y - rom.y0) : (this.x - rom.x0);
      var index = rom.lines_inv[co];
      value = rom.selected[index]; // show which line is selected
    }

    // Note: it looks like now they light up as expected, and it's nicer if the bus and global wire do show the numbers lighted up, so
    // no longer setting value to false unlike what the comment inside the next commented out code says.
    /*if(digitmap[this.displaysymbol]) {
      // with buses, some digits light up in confusing ways, so
      // disable them altogether
      value = false;
    }*/

    if(this.isalutext) {
      value = true;
    }

    if(this.isvte) {
      var parent = this.components[0] || this.components[1];
      if(!parent) return;
      if(parent.parent) parent = parent.parent;
      var vte = parent.vte;
      if(!vte || !vte.text) return;
      if(vte.invisible) return; //inside chip so don't render
      if(this.x < vte.x0b || this.x >= vte.x1b) return;
      if(this.y < vte.y0b || this.y >= vte.y1b) return;
      var x = this.x - vte.x0b;
      var y = this.y - vte.y0b;
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
      if(!result && this.components[0].parent) result = this.components[0].parent.errormessage;
      return result;
    }
    return 'unknown error';
  }

  this.initDiv2 = function() {
    var c = this.circuitsymbol;
    var symbol = this.displaysymbol;
    var virtualsymbol = symbol;
    var component = this.components[0] || this.components[1];
    var type = component ? component.type : TYPE_NULL;
    if(symbol == '#') {
      // TODO: use "typesymbols"
      if(type == TYPE_SWITCH_ON) virtualsymbol = 'S';
      if(type == TYPE_SWITCH_OFF) virtualsymbol = 's';
      if(type == TYPE_LED) virtualsymbol = 'l';
      if(type == TYPE_PUSHBUTTON_ON) virtualsymbol = 'P';
      if(type == TYPE_PUSHBUTTON_OFF) virtualsymbol = 'p';
      if(type == TYPE_TIMER_ON) virtualsymbol = 'R';
      if(type == TYPE_TIMER_OFF) virtualsymbol = 'r';
      if(type == TYPE_MUX) virtualsymbol = 'M';
      if(type == TYPE_ALU) virtualsymbol = 'U';
      if(type == TYPE_VTE) virtualsymbol = 'T';
      if(type == TYPE_DOTMATRIX) virtualsymbol = 'D';
    }

    // large devices using c, C, q, Q or y inputs and needing different rendering for an inner bounding box
    if(type == TYPE_VTE && specialmap[c]) virtualsymbol = 'T';
    if(type == TYPE_DOTMATRIX && specialmap[c]) virtualsymbol = 'D';


    var title = null;
    if(!this.comment) {
      var tc = c;
      if(digitmap[this.metasymbol]) {
        if(this.numbertype == NUMBER_FIXED) title = 'digit affecting decimal to binary fixed value';
        if(this.numbertype == NUMBER_LED) title = 'digit affecting LED color';
        if(this.numbertype == NUMBER_TIMER) title = 'digit indicating timer speed';
        if(this.numbertype == NUMBER_PULSE) title = 'digit indicating pulse speed';
        if(this.numbertype == NUMBER_NOTE) title = 'digit indicating music note sound frequency';
        if(this.numbertype == NUMBER_ROM) title = 'digit indicating least significant bit position of ROM address';
        if(this.numbertype == NUMBER_ALU) title = 'digit affecting ALU operation';
        if(this.numbertype == NUMBER_VTE && this.metasymbol == '1') title = 'digit indicating decimal display is signed';
        if(this.numbertype == NUMBER_VTE && this.metasymbol == '2') title = 'digit indicating decimal display is floating point';
        if(this.numbertype == NUMBER_KINETIC) title = 'number defining type of kinetic device';
        if(this.numbertype == NUMBER_ICCALL) title = 'IC usage numeric code, matches an IC definition';
        if(this.numbertype == NUMBER_ICDEF) title = 'IC definition numeric code';
        if(this.numbertype == NUMBER_GLOBAL) title = 'backplane numbered connection';
        // TODO: some digits are erronously set to NUMBER_BUS in handleJunctionConnections, disable the misleading title for now
        //if(this.numbertype == NUMBER_BUS) title = 'bus numbered connection';
        if(this.numbertype == NUMBER_ANTENNA) title = 'digit indicating the backplane "antennas" use wrap-around';
        if(this.numbertype == NUMBER_COMMENT) title = 'digit setting comment alignment and style';
      }
      if(tc == '#') tc = component.corecell.circuitsymbol;
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
      if(tc == 'l') {
        title = 'LED';
        var number = component.number;
        if(number <= 0) title += ' (color 0: red)'; // -1 indicates default color, which is also red
        else if(number == 1) title += ' (color 1: orange)';
        else if(number == 2) title += ' (color 2: yellow)';
        else if(number == 3) title += ' (color 3: green)';
        else if(number == 4) title += ' (color 4: blue)';
        else if(number == 5) title += ' (color 5: purple)';
        else if(number == 6) title += ' (color 6: pink)';
        else if(number == 7) title += ' (color 7: white)';
        else if(number == 8) title += ' (color 8: off=red, on=green)';
        else if(number == 9) title += ' (color 9: LCD)';
        else title += ' (unknown color)';
      }
      if(tc == '?') title = 'random generator: random bit';
      if(tc == 'a') title = 'AND gate. Truth table for 2 inputs: 00:0, 01:0, 10:0, 11:1';
      if(tc == 'A') title = 'NAND gate. Truth table for 2 inputs: 00:1, 01:1, 10:1, 11:0';
      if(tc == 'o') title = 'OR gate. Truth table for 2 inputs: 00:0, 01:1, 10:1, 11:1';
      if(tc == 'O') title = 'NOR gate. Truth table for 2 inputs: 00:1, 01:0, 10:0, 11:0. With 1 input, serves as NOT gate.';
      if(tc == 'e') title = 'XOR gate (odd parity detector). Truth table for 2 inputs: 00:0, 01:1, 10:1, 11:0';
      if(tc == 'E') title = 'XNOR gate (even parity detector). Truth table for 2 inputs: 00:1, 01:0, 10:0, 11:1';
      if(tc == 'h') title = 'one-hot detector (same as XOR if 2 inputs). Truth table for 2 inputs: 00:0, 01:1, 10:1, 11:0';
      if(tc == 'H') title = 'inverted one-hot detector (same as XNOR if 2 inputs). Truth table for 2 inputs: 00:1, 01:0, 10:0, 11:1';
      if(tc == 'K') {
        title = 'kinetic device';
        if(component) {
          title += ': ';
          if(!component.number) title += 'motor / gear. Can also activate neighboring gears.';
          if(component.number == 1) title += 'fan / wind / cooling. Can also detect nearby activated fans.';
          if(component.number == 2) title += 'heating / incandescent. Can also detect nearby heat.';
          if(component.number == 3) title += 'pump / sprinkler / liquid. Can also transport and detect water.';
          if(component.number == 4) title += 'electromagnet. Can also detect electromagnets at some horizontal or vertical distance.';
          if(component.number >= 5 && component.number <= 9) title += 'TNT: destroys devices around it';
          if(component.number >= 10 && component.number <= 14) title += 'EMP: temporarily disables devices around it';
          if(component.number >= 15 && component.number <= 19) title += 'JAM: temporarily randomizes devices around it';
          if(component.number == 20) title += 'cover / hatch';
        }

      }
      if(tc == 'f' || tc == 'F') {
        if(component && component.parent) {
          if(component.parent.fixed && component.parent.fixed.inverted) title = 'constant binary value given as decimal (output bits inverted)';
          else title = 'constant binary value given as decimal';
        }
        else if(tc == 'f') title = 'constant off (fixed off)';
        else if(tc == 'F') title = 'constant on (fixed on)';
      }
      if(tc == 'J' && component) {
        title = 'jack for patch panel. Click this jack, then another jack, to connect them together with a patch wire. To remove a wire, click both its jacks again. To remove all wires from one jack, click that jack twice. To remove all jacks of the board, see one of the dropdowns in the main menu. You cannot connect multiple jacks that have an input (an arrow pointing to it) together in one group, if you try an older input connection may be removed, or it may refuse to connect and indicate a temporary red line. This is because multiple inputs to the same connected jacks gives a conflict (we could OR them, but instead we choose the realistic approach where this can cause an electric short). A jack supports a maximum of ' + component.partner.length + ' wires, adding more will remove the oldest one.';
      }
      if(devicemaparea[tc]) {
        if(type == TYPE_FLIPFLOP) {
          var ff = component.ff;
          if(!ff && component.parent) ff = component.parent.ff;
          var name = 'flipflop';
          if(ff) {
            if(ff.numc && ff.numd && !ff.numj && !ff.numk && !ff.numt) name = 'D flipflop';
            if(ff.numc && !ff.numd && !ff.numj && !ff.numk && ff.numt) name = 'T flipflop';
            if(ff.numc && !ff.numd && ff.numj && ff.numk && !ff.numt) name = 'JK flipflop';
            if(!ff.numc && ff.numd && !ff.numj && !ff.numk && !ff.numt) name = 'D latch';
            if(!ff.numc && !ff.numd && !ff.numj && !ff.numk && ff.numt) name = 'T latch';
            if(!ff.numc && !ff.numd && ff.numj && ff.numk && !ff.numt) name = 'JK latch';
            if(ff.numc && !ff.numd && !ff.numj && !ff.numk && !ff.numt) name = 'counter';
            if(ff.numq && ff.numQ && !ff.numc && !ff.numd && !ff.numj && !ff.numk && !ff.numt) name = 'SR latch';
            if((!!ff.numq != !!ff.numQ) && !ff.numc && !ff.numd && !ff.numj && !ff.numk && !ff.numt) name = 'pulse';
            if(ff.numd && !ff.numc && !ff.numj && !ff.numk && !ff.numt) name = 'D latch';
            var none = !ff.numc && !ff.numd && !ff.numj && !ff.numk && !ff.numt;

            title = name;

            var cellname = '';
            if(tc == 'c') title = ((ff.numd || ff.numt || ff.numj || ff.numk) ? (name + ' - clock input') : 'counter') + ' (initially off)';
            if(tc == 'C') title = ((ff.numd || ff.numt || ff.numj || ff.numk) ? (name + ' - clock input') : 'counter') + ' (initially on)';
            if(tc == 'y') title = name + ' - enable input';
            if(tc == 'd') title = name + ' - D input';
            if(tc == 't') title = name + ' - T input';
            if(tc == 'j') title = name + ' - J input';
            if(tc == 'k') title = name + ' - K input';
            if(tc == 'q') title = (none && !ff.numQ) ? 'pulse' : (name + ' - output and async set');
            if(tc == 'Q') title = (none && !ff.numq) ? 'inverted pulse' : (name + ' - inverted output and async reset');
          }
        } else if(type == TYPE_VTE) {
          title = 'terminal';
          if(component) {
            var parent = component.parent;
            var vte = parent ? parent.vte : component.vte;
            if(vte) {
              if(tc == 'y') {
                if(vte.counter) {
                  title = 'enable input (y) for decimal counter';
                } else {
                  title = 'enable input (y) for terminal controls';
                }
              } else if(tc == 'c') {
                if(vte.counter) {
                  title = 'count-up input (c) for decimal counter';
                } else {
                  title = 'write signal (Q) for terminal keyboard: command to write user-typed character to output ASCII bits, and outputs EOF flag';
                }
              } else if (tc == 'C') {
                if(vte.counter) {
                  title = 'count-down input (C) for decimal counter';
                } else {
                  title = 'read signal (C) for terminal screen: command to read input ASCII bits to display on screen';
                }
              } else if (tc == 'q') {
                if(vte.counter) {
                  title = 'set input (q) for decimal counter';
                } else {
                  title = 'invalid';
                }
              } else if (tc == 'Q') {
                if(vte.counter) {
                  title = 'reset input (Q) for decimal counter';
                } else {
                  title = 'invalid';
                }
              } else {
                if(!vte.counter && !vte.decimaldisplay && !vte.decimalinput) {
                  if(vte.numoutputs > 0) title += ' (with ascii output and keyboard input, click to put cursor here)';
                  if(vte.numinputs > 0) title += ' (with ascii input, shown on the screen if read)';
                  if(vte.numoutputs > 0 && vte.numinputs > 0) title += ' (only outputs what was typed with keyboard using active cursor, not from the component inputs. The inputs are displayed as ascii on screen only.)';
                }
                if(vte.counter) {
                  var features = [];
                  if(vte.has_up) features.push('c=up');
                  if(vte.has_down) features.push('C=down');
                  if(vte.has_set) features.push('q=set');
                  if(vte.has_reset) features.push('Q=reset');
                  if(vte.has_enable) features.push('y=enable');
                  var phrases = ['as decimal counter with ' + features.join(', ')];
                  if(vte.has_down) phrases.push('Screen can show signed (negative) values or values larger than the output bits support, but output bits will use twos complement and can be treated as unsigned if desired.');
                  if(vte.has_set) phrases.push('Data input is treated as ' + (vte.signeddisplay ? 'twos complement signed' : 'unsigned'));
                  title += ' (' + phrases.join('. ') + ')';
                }
                if(vte.decimaldisplay && !vte.counter) {
                  title += ((vte.numinputs == 1) ? ' (as 1-bit display)' : ' (as decimal display)');
                  if(vte.passthrough) title += ' (passes through the input to the output)';
                  if(vte.floatdisplay) title += ' (using floating point: num mantissa bits: ' + vte.numinputs + ', num exponent bits: ' + vte.numinputs2 + ', num sign bits: 1, num total bits: ' + (vte.numinputs + vte.numinputs2 + 1) + ')';
                  else if(vte.signeddisplay) title += ' (signed two\'s complement)';
                }
                if(vte.decimalinput && !vte.counter) {
                  if(vte.floatdisplay) {
                    title += ' (as floating point decimal input. Type floating point values such as 0.5, -8.25, 2e3, 1e-15 or Infinity. Invalid values such as text will be interepreted as NaN. Too large or too small values will give Infinity or -Infinity.)';
                    title += ' (num mantissa bits: ' + vte.numoutputs + ', num exponent bits: ' + vte.numoutputs2 + ', num sign bits: 1, num total bits: ' + (vte.numoutputs + vte.numoutputs2 + 1) + ')';
                  } else {
                    title += ' (as decimal input, click to put cursor here, and type decimal digits, or hex digits preceded with 0x).';
                    title += ' max value, given the ' + vte.numoutputs + ' output wires: ' + (Math.pow(2, vte.numoutputs) - 1);
                  }
                }

                if(vte.supportsTyping()) this.renderer.setCursorPointer(true);
              }
            }
          }
        } else if(type == TYPE_MUSIC_NOTE) {
          title = 'music note (note/noise, audio speaker, for music)';
          if(tc == 'y') {
            title = 'enable input (y) for ' + title;
          } else if(component) {
            var musicnote = component.musicnote;
            if(musicnote) {
              title += '. Frequency: ' + (musicnote.numfreqinputs ? 'variable' : musicnote.basefrequency) + ' Hz';
              title += '. Shape: ' + musicnote.getShapeName();
              if(musicnote.numvolinputs) title += '. Has volume input';
              if(musicnote.numfreqinputs) title += '. Has frequency input';
              if(musicnote.numshapeinputs) title += '. Has shape input';
            }
          }
        } else if(type == TYPE_MUX) {
          title = 'mux';
          var parent = component.parent;
          var mux = parent ? parent.mux : component.mux;
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
        } else if(type == TYPE_ALU) {
          var parent = component.parent;
          var alu = parent ? parent.alu : component.alu;
          if(alu) {
            var numinputs = (alu.numc ? 3 : (alu.numb ? 2 : 1));
            if(alu.numselect) {
              title = 'ALU (arithmetic logic unit), with custom selectable operation from the select input bits. First operation (matching select 0 and internal opindex ' +
                alu.opindex + '): ' + alu.getOpLongName() + '. Select range: 0 - ' + ((1 << alu.numselect) - 1) + '. Selectable opindex range: ' + alu.opindex + ' - ' + (alu.opindex + ((1 << alu.numselect) - 1));
                if(alu.numselect <= 4) {
                  title += '. All operations for each select value: ';
                  var num = 1 << alu.numselect;
                  for(var i = 0; i < num; i++) {
                    if(i > 0) title += ', ';
                    title += '' + i + ':' + alu.getOpShortNameFor(alu.opindex + i);
                  }
                }
            } else {
              var op = alu.getOpLongName();
              title = 'ALU (arithmetic logic unit): op: "' + op + '"' + (alu.signed ? ' (signed)' : '') + ',  opindex: ' + alu.opindex + ', num inputs: ' + numinputs;
            }
          } else {
            title = 'ALU (but has error)';
          }
        } else if(type == TYPE_ROM) {
          title = 'ROM/RAM bit (b=0, B=1)';
          if(component) {
            var parent = component.parent;
            var rom = parent ? parent.rom : component.rom;
            if(rom) {
              if(tc == 'c') {
                title = 'clock input (write/store) for RAM';
              } else if(tc == 'Q') {
                title = 'reset all input for RAM';
              } else if(tc == 'y') {
                title = 'enable-input for RAM clock';
              } else {
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
                if(rom.onehot) {
                  title += ' (using per-line addressing, one or more lines can be enabled.)'
                } else {
                  if(rom.ram) title += ' (using binary addressing, the address inputs select one line with binary code. In case of large RAM, it is possible for there to be more memory than visible lines, only the first few values are then visible but more hidden ones exist)';
                  else title += ' (using binary addressing, the address inputs select one line with binary code)';
                }
              }
            }
          }
        } else if(type == TYPE_DOTMATRIX) {
          title = 'RGB LED';
          if(component) {
            var dot = component.dotmatrix;
            if(dot && !dot.rgbled) title = 'dot matrix screen';
            var colordescription = '';
            if(dot.numc == 0) colordescription = 'oscilloscope';
            else if(dot.numc == 1) colordescription = 'two-color';
            else if(dot.numc == 2) colordescription = 'four-color: red-green';
            else if(dot.numc == 3) colordescription = '8-color: binary RGB';
            else if(dot.numc == 4) colordescription = '16-color: RGBI';
            else if(dot.numc == 5) colordescription = '27-color: 3-level RGB';
            else if(dot.numc == 6) colordescription = '64-color: 4-level RGB, 2 bits for each';
            else if(dot.numc == 7) colordescription = '125-color: 5-level RGB';
            else if(dot.numc == 8) colordescription = '216-color: 6-level RGB';
            else if(dot.numc == 9) colordescription = '512-color: 8-level RGB, 3 bits for each';
            else colordescription = 'unknown color palette, more color bits than expected (max is 9)';
            if(dot) {
              if(dot.rgbled) {
                title = 'RGB LED';
                if(dot.numc != 3) title += '. ' + colordescription;
              } else {
                var name = (dot.numc == 0) ? 'oscilloscope' : 'dot matrix screen';
                if(tc == 'y') {
                  title = 'enable input for ' + name;
                } else if(tc == 'c') {
                  title = 'place-dot input for ' + name;
                } else if(tc == 'q') {
                  title = 'fill screen input for ' + name;
                } else if(tc == 'Q') {
                  title = 'clear screen input for ' + name;
                } else {
                  var addressingdescription = dot.matrix ? 'X and Y coordinate use matrix addressing: can enable multiple rows/columns at the same time, dots are placed at intersections.' : 'X and Y coordinate use binary addressing.';
                  if(dot.numc == 0) {
                    title = name;
                    title += '. Has X coordinate input, Y coordinate input, color choice input, and controls to place dots or clear screen. ';
                    title += addressingdescription;
                  } else {
                    title = name;
                    title += '. Has X coordinate input, Y coordinate input, color choice input, and can have controls to place dots, fill, ... ';
                    title += addressingdescription;
                    title += ' Color palette: ' + colordescription;
                  }
                }
              }
            }
          }
        } else {
          if(tc == 'c') title = 'counter (initially off)'; // type == TYPE_COUNTER
          if(tc == 'C') title = 'counter (initially on)'; // type == TYPE_COUNTER
          if(tc == 'd') title = 'delay'; // type == TYPE_DELAY
        }
      }
      if(tc == 'z') title = 'tristate buffer, inputs to same z ANDed, multiple z to wire high when any z high (like OR but read on). Allowed to have multiple output to the same wire, but should be used as one-hot (max 1 high to wire, rest must be low) only to be electrically correct and realistic, but logicemu does not enforce that (does not emulate shorts).)';
      if(tc == 'Z') title = 'tristate buffer, inputs to same Z ORed, multiple Z to wire low when any Z low (like AND but read on). Allowed to have multiple output to the same wire, but should be used as one-cold (max 1 low to wire, rest must be high) only to be electrically correct and realistic, but logicemu does not enforce that (does not emulate shorts).)';
      if(tc == 'g') {
        if(this.displaysymbol == '$') title = 'global (backplane) connection automatically numbered with $, unique code: ' + this.number + ', connects to global wires with matching code';
        else if(digitmap[this.displaysymbol]) title = 'global (backplane) wire numbered connection ' + this.number + ', connects to global wires with matching number';
        else title = 'global (backplane) wire, connects to all other g with matching (or matching absense of) number';
      }
      if(tc == '(') title = 'backplane wire that connects to one matching connector to the right ("antenna")';
      if(tc == ')') title = 'backplane wire that connects to one matching connector to the left ("antenna")';
      if(tc == 'n') title = 'backplane wire that connects to one matching connector to below ("antenna")';
      if(tc == 'u') title = 'backplane wire that connects to one matching connector to the top ("antenna")';
      if(tc == 'I' || this.numbertype == NUMBER_ICDEF) title = 'IC definition';
      if(tc == 'i' || tc == '#i') title = 'IC instance ' + component.callsubindex;
      if(tc == '=') {
        if(this.displaysymbol == '$') title = 'bus (wire bundle) connection automatically numbered with $, unique code: ' + this.number + ', connects to matching codes on this bus';
        else if(digitmap[this.displaysymbol]) title = 'bus (wire bundle) numbered connection ' + this.number + ', connects to matching numbers on this bus';
        else title = 'bus (wire bundle)';
      }
    }

    this.renderer.init2(this, symbol, virtualsymbol, title);

    if(!this.comment) {
      // TODO: use component type instead?
      var pointer = (c == 's' || c == 'S' || c == 'p' || c == 'P' || c == 'r' || c == 'R' || c == 'b' || c == 'B' || c == 'J');
      // currently cursor pointer not enabled for wires etc... that are part of the switch (even though pressing them actually works... but it would look a bit too messy)
      if(c == '#') {
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
    if(graphics_mode_actual != 2 && this.displaysymbol == ' ' && !(x == 0 && y == h - 1) && !this.verticalcommentspace) return;
    if(graphics_mode_actual == 2 && this.symbol == ' ' && this.origsymbol == ' ') return;

    if(this.renderer) {
      this.renderer.cleanup();
    }
    this.renderer = getNewRenderer();
    var component = this.components[0] || this.components[1];

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
        var s = 'x: ' + x + ', y: ' + y + ', circuitsymbol: ' + w.circuitsymbol + ', metasymbol: ' + w.metasymbol + ', displaysymbol: ' + w.displaysymbol + ', circuitextra: ' + w.circuitextra + ' | clusterindex: ' + w.clusterindex;
        s += ', number: ' + w.number + ', numbertype: ' + w.numbertype + ', largedevicetype: ' + w.largedevicetype;
        console.log(s);
        if(w.antennax != -1 || w.antennay != -1) console.log('antennax: ' + w.antennax + ', antennay: ' + w.antennay);
        for(var i = 0; i < w.components.length; i++) {
          var compo = w.components[i];
          if(!compo) continue;
          console.log('component ' + i + ': index: ' + compo.index + ',  type: ' + compo.type + ', corecell: ' + compo.corecell.circuitsymbol + ', corecell.x: ' + compo.corecell.x + ', corecell.y: ' + compo.corecell.y + ' number: ' + compo.number + ' | rom_out_pos: ' + compo.rom_out_pos + ' ff_cycle: ' + compo.ff_cycle + ',' + compo.ff_cycle_time + ', disabled: ' + compo.disabled + ', kinvalue: ' + compo.kinvalue);
          if(compo.parent) console.log('parent: index: ' + compo.parent.index + ',  type: ' + compo.parent.type + ', corecell: ' + compo.parent.corecell.circuitsymbol + ', corecell.x: ' + compo.parent.corecell.x + ', corecell.y: ' + compo.parent.corecell.y);
          for(var j = 0; j < compo.inputs.length; j++) {
            var corecellinfo = (compo.inputs[j].corecell) ? (compo.inputs[j].corecell.circuitsymbol + ', corecell.x: ' + compo.inputs[j].corecell.x + ', corecell.y: ' + compo.inputs[j].corecell.y) : ('' + compo.inputs[j].corecell);
            console.log('input ' + j + ': index: ' +  compo.inputs[j].index + ', type: ' + compo.inputs[j].type + ', corecell: ' +  corecellinfo);
          }
        }
      }
      return false;
    }, component, x, y);

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
function setTocHTML(tocType, tocDepth, linkid, el) { // gettochhtml
  el.innerText = '';
  el.style.fontFamily = 'unset'; // remove monospace
  var html = '';
  var j = 0;
  if(tocType == 0) {
    /*var div = makeDiv(0, 0, 800, th, el);
    div.innerText = 'Table of Contents (in this article):';
    div.style.textAlign = 'left';*/
    var j = 0;
    for(var i = 0; i < chapters.length; i++) {
      if(tocDepth > 0 && chapters[i][2] > tocDepth) continue;
      var text = chapters[i][0] || '';
      if(text.length > 80) text = text.substr(0, 80) + '...';
      var div = makeDiv(0, j * th, tw, th, el);
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
      span.style.whiteSpace = 'nowrap';
      j++;
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
        span.style.whiteSpace = 'nowrap';
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
      span.style.whiteSpace = 'nowrap';
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
  this.componentdisabled = false;

  this.globalInit = function() {
    document.body.style.backgroundColor = BGCOLOR;
    //worldDiv.style.zIndex = -50;

    //worldDiv.style.width = (tw * w) + 'px';
    //worldDiv.style.height = (th * h) + 'px';
    //worldDiv.style.border = '1px solid yellow';
    worldDiv.onmousedown = function(e) {
      if(isPaused() && !!highlightedcomponent) {
        highlightedcomponent = null;
        unpause();
      }

      var x = e.pageX - worldDiv.offsetLeft;
      var y = e.pageY - worldDiv.offsetTop;
      var button = findNearestSwitch(x, y, x - AROUNDBUTTONRADIUS - tw, y - AROUNDBUTTONRADIUS - th,
                                     x + AROUNDBUTTONRADIUS + tw, y + AROUNDBUTTONRADIUS + th);
      if(button) button.clickFun(e);

      /*e.stopPropagation();
      e.preventDefault();
      return false;*/
    };

    //worldDiv.ontouchstart = worldDiv.onmousedown;
  };

  this.cleanup = function() {
    util.removeElement(this.div0);
    util.removeElement(this.div1);
  };

  // one time initialization of a cell
  this.init = function(cell, x, y, clickfun) {
    this.componentdisabled = false;
    this.div0 = makeDiv(x * tw, y * th, tw, th, worldDiv);
    this.div0.onmousedown = clickfun;
    //this.div0.ontouchstart = clickfun;

    if(cell.circuitsymbol != '"' && !cell.comment) {
      this.div1 = makeDiv(x * tw, y * th, tw, th, worldDiv);
      this.div1.onmousedown = clickfun;
      //this.div1.ontouchstart = clickfun;
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
    if(symbol == ' ' && virtualsymbol == ' ' && !cell.verticalcommentspace) return;

    if (!this.init2done) {
      this.div0.style.color = OFFCOLOR;
      this.div0.style.textAlign = 'center';
      this.div0.style.fontSize = Math.ceil(tw * 0.9) + 'px';
      this.div0.style.fontFamily = 'monospace';
      this.div0.style.backgroundColor = '';
      this.div0.style.zIndex = MAINZINDEX;

      if(this.div1) {
        this.div1.style.color = ONCOLOR;
        this.div1.style.textAlign = 'center';
        this.div1.style.fontSize = Math.ceil(tw * 0.9) + 'px';
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
      var hidden = (cell.commentstyle == 9); // 9 is a hidden source-code only comment


      if(!hidden) {
        this.div0.style.color = fgcolor;
        this.div0.style.backgroundColor = bgcolor;
      }

      // no need to affect div1, it's never shown for comments

      var textel = this.div0;

      // allow the text to go to the right
      if(hidden) {
        // do nothing, do not add the text:
      } else if(/*cell.commentalign >= 0 && cell.commentalign <= 2*/cell.commentstyle != 0) {
        var align = cell.commentalign;
        if(cell.commentstyle == 2) {
          this.div0.style.fontFamily = 'sans-serif'; // remove monospace
        }
        this.div0.innerText = '';
        this.div0.style.backgroundColor = 'unset';
        if(cell.commentstyle == 3) {
          this.div0.innerHTML = "<hr>";
          this.div0.style.width = '' + (tw * (w - cell.x)) + 'px';
        } else {
          // this span is there so that we can have the background color only over the text, not whitespace parts left or right
          var span0b = util.makeElement('span', this.div0);
          var span0 = util.makeElement('span', span0b);
          span0.innerText = symbol;
          span0.style.color = fgcolor;
          span0.style.whiteSpace = 'pre';
          //span0.style.fontSize = th + 'px';
          if(cell.commentstyle == 1) {
            span0.style.fontSize = Math.floor(tw * 0.8) + 'px'; // avoids background overlapping parts of font issues. Test this with underscore characters in font style 3 of 4 (multiple lines), with different zoom letters, to ensure the _ does not disappear behind the background of the next line
          } else {
            // a bit bigger, because otherwise formatted text tends to be too much smaller compared to circuits, give it a bit more readability
            // however, on the other hand it makes letters too close to each other on next lines, so disabled after all...
            span0.style.fontSize = Math.floor(tw * 1.1) + 'px';
            if(tw < 16) span0.style.letterSpacing = '0.5px'; // this might make it slightly more readable if zoomed out a lot
          }
          span0.style.height = th + 'px';
          span0.style.verticalAlign = 'top'; // make the span really go where I want it, not shifted slightly down
          //span0.style.lineHeight = th + 'px';
          this.div0.style.width = '' + (tw * cell.commentlength2) + 'px';
          //this.div0.style.border = '1px solid red'; // debug comment divs
          if(align == 0) this.div0.style.textAlign = 'left';
          else if(align == 1) this.div0.style.textAlign = 'center';
          else if(align == 2) this.div0.style.textAlign = 'right';

          // don't do the bgcolor for standard non-monospace text, that one is distinguishable enough from circuit elements
          if(cell.commentstyle != 2) {
            // There is some carefuly trickery going on here to ensure that the following renders fine:
            // 3"______"
            // 3"      "
            // 3"      "
            // 3"aaaaaa"
            // That is, the balance between: not having the underscores disappear under the background of
            // the next line, and, not having a gap without background between the two spaces.
            // The combination of having a spearate span0 and span0b and the fontSize of 0.8 appear to fix this.
            // Issues that are preventing easier fixes are:
            // The fact that text width is not easy to measure in HTML.
            // Using offsetWidth of clientWidth do not work here because those only work for visible elements.
            // Using zIndex does not work between elements of this and next line.
            // Rendering from bottom to top instead of top to bottom ruins text selection. HTML does not allow good control over having the
            // span background exactly match the size of the field, and, have the text stay perfectly inside of it.
            // Assigning the backgroundColor to div0 gives it the wrong width for styles 3, 4, 5.
            // All of this is browser dependent too.
            // The following combination appears to work to solve 5 problems: no vertical gaps, no hidden underscores,
            // correctly centered/right when wanted, background color only for the width of the text, and no too high
            // span0b that partially overlaps logic gates on next line.
            span0b.style.backgroundColor = bgcolor;
            span0b.style.fontSize = th + 'px';
            span0b.style.display = 'inline-block'; // required to be able to override height
            span0b.style.height = th + 'px';
          }
          //span0.style.zIndex = '1';
          textel = span0;
        }
      } else {
        this.div0.innerText = symbol;
      }

      if(cell.commentchapter > 0) {
        if(cell.commentchapter == 1) {
          textel.style.fontSize = Math.floor(1.2 * tw) + 'px';
          textel.style.fontFamily = 'sans-serif';
        }
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
      //this.div0.ontouchstart = null;
    } else if(symbol == 'toc') {
      setTocHTML(cell.circuitextra, cell.tocdepth, cell.toclink, this.div0);
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
        if(color >= led_off_fg_colors.length) color = 0; // not more colors than that supported
        if(symbol == 'l') {
          this.div0.innerText = 'l';
          this.div1.innerText = 'L';
        }
        this.div0.style.color = led_off_fg_colors[color];
        this.div0.style.backgroundColor = led_off_bg_colors[color];
        this.div1.style.color = led_on_fg_colors[color];
        this.div1.style.backgroundColor = led_on_bg_colors[color];
      }
      else if(virtualsymbol == 'D') {
        var outside = specialmap[symbol];
        var dotmatrix = null;
        if(cell.components[0] && cell.components[0].type == TYPE_DOTMATRIX) dotmatrix = cell.components[0].dotmatrix;
        if(!dotmatrix && cell.components[0] && cell.components[0].parent) dotmatrix = cell.components[0].parent.dotmatrix;
        if(dotmatrix && (cell.x < dotmatrix.x0b || cell.x >= dotmatrix.x1b || cell.y < dotmatrix.y0b || cell.y >= dotmatrix.y1b)) outside = true;

        if(outside) {
          this.div0.innerText = symbol;
          this.div1.innerText = symbol;
          this.div0.style.backgroundColor = OUTSIDESCREENBGCOLOR;
          this.div0.style.color = OUTSIDESCREENFGCOLOR;
        } else {
          //this.div0.innerText = 'D';
          this.div0.style.color = '#888';
          this.div0.style.backgroundColor = '#888';
          this.div0.style.visibility = 'visible';
          // div 1 unused
          this.div1.style.visibility = 'hidden';
          this.div0.style.boxSizing = 'border-box'; // have the border not make the total size bigger, have it go inside
        }
        var color = 0;
        var bordercolor = ONCOLOR;
        if(!sameDevice(cell.x, cell.y, 0)) this.div0.style.borderTop = '1px solid ' + bordercolor;
        if(!sameDevice(cell.x, cell.y, 1)) this.div0.style.borderRight = '1px solid ' + bordercolor;
        if(!sameDevice(cell.x, cell.y, 2)) this.div0.style.borderBottom = '1px solid ' + bordercolor;
        if(!sameDevice(cell.x, cell.y, 3)) this.div0.style.borderLeft = '1px solid ' + bordercolor;
      }
      else if(virtualsymbol == 's' || virtualsymbol == 'S') {
        this.div0.style.color = SWITCHOFF_FGCOLOR;
        this.div1.style.color = SWITCHON_FGCOLOR;
        this.div0.style.backgroundColor = SWITCHOFF_BGCOLOR;
        this.div1.style.backgroundColor = SWITCHON_BGCOLOR;
      }
      else if(virtualsymbol == 'p' || virtualsymbol == 'P') {
        this.div0.style.color = SWITCHOFF_FGCOLOR;
        this.div1.style.color = SWITCHON_FGCOLOR;
        this.div0.style.backgroundColor = SWITCHOFF_BGCOLOR;
        this.div1.style.backgroundColor = SWITCHON_BGCOLOR;
      }
      else if(virtualsymbol == 'r' || virtualsymbol == 'R') {
        this.div0.style.color = SWITCHOFF_FGCOLOR;
        this.div1.style.color = SWITCHON_FGCOLOR;
        this.div0.style.backgroundColor = SWITCHOFF_BGCOLOR;
        this.div1.style.backgroundColor = SWITCHON_BGCOLOR;
        this.div0.innerText = 'r';
        this.div1.innerText = 'R';
      }
      else if(symbol == 'b' || symbol == 'B') {
        //this.div1.style.color = this.div0.style.color;
      }
      else if(virtualsymbol == 'T') {
        var outside = specialmap[symbol];
        var vte = null;
        if(cell.components[0] && cell.components[0].type == TYPE_VTE) vte = cell.components[0].vte;
        if(!vte && cell.components[0] && cell.components[0].parent) vte = cell.components[0].parent.vte;
        if(vte && (cell.x < vte.x0b || cell.x >= vte.x1b || cell.y < vte.y0b || cell.y >= vte.y1b)) outside = true;

        this.div1.style.boxSizing = 'border-box'; // have the border not make the total size bigger, have it go inside
        var bordercolor = TERMINALFGCOLOR; //TERMINALMIDCOLOR;
        if(!sameDevice(cell.x, cell.y, 0)) this.div0.style.borderTop = '1px solid ' + bordercolor;
        if(!sameDevice(cell.x, cell.y, 1)) this.div0.style.borderRight = '1px solid ' + bordercolor;
        if(!sameDevice(cell.x, cell.y, 2)) this.div0.style.borderBottom = '1px solid ' + bordercolor;
        if(!sameDevice(cell.x, cell.y, 3)) this.div0.style.borderLeft = '1px solid ' + bordercolor;

        if(outside) {
          if(specialmap[symbol]) {
            this.div0.innerText = symbol;
            this.div1.innerText = symbol;
          } else {
            // hide '#' and so on in outside-typing-area
            this.div0.innerText = '';
            this.div1.innerText = '';
          }
          this.div0.style.visibility = 'visible';
          this.div1.style.visibility = 'hidden';
          this.div0.style.backgroundColor = OUTSIDESCREENBGCOLOR;
          this.div0.style.color = OUTSIDESCREENFGCOLOR;
        } else {
          this.div1.style.visibility = 'hidden';
          this.div0.style.visibility = 'visible';
          this.div0.style.backgroundColor = TERMINALBGCOLOR;
          this.div0.style.color = TERMINALFGCOLOR;
          this.div0.innerText = ' ';
          // The font characters are normally slightly bigger than a cell, but don't do that for the terminal, or bottom of letters gets obscured by the black cell below them, hiding bottom of j, underscores, etc
          this.div0.style.fontSize = Math.floor(tw * 0.9) + 'px';
        }
        if(vte) {
          var comp = cell.components[0];
          if(vte.parent == comp && vte.supportsTyping() && comp.corecell.x == cell.x && comp.corecell.y == cell.y) {
            // set at position where this terminal is, because otherwise the browser will scroll the screen towards where the element is placed when focusing it
            vte.initTextArea(worldDiv, cell.x * tw, cell.y * th);
          }
        }
      }
      else if(symbol == 'c' || symbol == 'C') {
        this.div0.innerText = 'c';
        this.div1.innerText = 'C';
      }
      else if(symbol == 'I' || (cell.numbertype == NUMBER_ICDEF && digitmap[symbol])) {
        this.div0.style.color = CHIPLABELFGCOLOR;
        this.div0.style.backgroundColor = CHIPLABELBGCOLOR;
      }
      else if(symbol == '|') {
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

    //if(cell.components[0] && cell.components[0].disabled && devicemaparea[cell.circuitsymbol]) {
    if(cell.components[0] && devicemaparea[cell.circuitsymbol]) {
      this.setLook(cell, cell.components[0].type);
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
    if(!this.div0) return;
    var style = opt_textstyle ? 'text' : 'pointer';
    this.div0.style.cursor = style;
    this.div1.style.cursor = style;
    if(this.clickDiv) this.clickDiv.style.cursor = style;
  };

  this.setValue = function(cell, value, type) {
    if(!this.div1) return; // e.g. if this is a comment (TODO: fix the fact that comment gets setValue at all, it should not be part of a component)
    if(type == TYPE_DOTMATRIX && (cell.circuitsymbol == 'D' || cell.circuitsymbol == '#' || cell.circuitsymbol == '#D')) {
      var dotmatrix = cell.components[0].dotmatrix;
      if(dotmatrix && !dotmatrix.error) {
        var x = cell.x - dotmatrix.x0b;
        var y = cell.y - dotmatrix.y0b;
        if(x < dotmatrix.w && y < dotmatrix.h) {
          value = dotmatrix.array[y][x];
          if(value != this.prevvalue) {
            this.div0.style.color = rgb_led_fg_colors[value];
            this.div0.style.backgroundColor = rgb_led_bg_colors[value];
          }
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
    if(!this.div0) return;

    if(cell.components[0] && (cell.components[0].disabled & 1)) {
      if(this.componentdisabled) return;
      this.componentdisabled = true;
      //util.removeElement(this.div0);
      util.removeElement(this.div1);
      this.div0.style.visibility = 'visible';
      this.div0.innerHTML = '';
      this.div0.style.backgroundColor = OFFCOLOR;
      return;
    }
    /*
    For switch: user click toggles it between TYPE_SWITCH_ON and TYPE_SWITCH_OFF. The
    on type uses div1 and capital S, the off type uses div0 and small s. div1 comes with green bg, div0 with 'off' bg.
    In case switch has input component, then it can be of TYPE_SWITCH_ON but not output any signal.
    Then it will use capital S but div0.

    For pushbutton: idem

    For timer: a R without the changed background indicates the timer is on internally, but
    is not outputting it because it has inputs and none of those inputs are on.
    */
    // Reading from .innerText turns out to be very slow in JavaScript (for the comparisons with 'R', 'r', etc...),
    // even if there are just a few hundreds switches/timers/... in a large map, and for that reason, the separate
    // fields look0 and look1 are used instead.
    if(!this.div1) return;
    if(!cell.components[0] || cell != cell.components[0].corecell) return;
    if(type == TYPE_TIMER_ON || type == TYPE_TIMER_OFF) {
      var clocked = cell.components[0].clocked;
      if(clocked && this.look0 != 'R') this.div0.innerText = this.look0 = 'R';
      else if(!clocked && this.look0 != 'r') this.div0.innerText = this.look0 = 'r';
    }
    if(type == TYPE_SWITCH_ON || type == TYPE_SWITCH_OFF) {
      var user = (type == TYPE_SWITCH_ON);
      if(user && this.look0 != 'S') this.div0.innerText = this.look0 = 'S';
      else if(!user && this.look0 != 's') this.div0.innerText = this.look0 = 's';
      if(user && this.look1 != 'S') this.div1.innerText = this.look1 = 'S';
      else if(!user &&this.look1 != 's') this.div1.innerText = this.look1 = 's';
    }
    if(type == TYPE_PUSHBUTTON_ON || type == TYPE_PUSHBUTTON_OFF) {
      var user = (type == TYPE_PUSHBUTTON_ON);
      if(user && this.look0 != 'P') this.div0.innerText = this.look0 = 'P';
      else if(!user && this.look0 != 'p') this.div0.innerText = this.look0 = 'p';
      if(user && this.look1 != 'P') this.div1.innerText = this.look1 = 'P';
      else if(!user && this.look1 != 'p') this.div1.innerText = this.look1 = 'p';
    }
  };

  // typevte rendervte typeterminal renderterminal
  this.setTerminal = function(char, blink, blur) {
    if(blink) {
      //blinking cursor for the active terminal
      this.div0.innerText = '';
      registerBlinkingCursor(this.div0);
      this.prevchar = null;
    } else if(blur) {
      this.div0.innerText = '';
      this.div0.style.backgroundColor = TERMINALMIDCOLOR;
      this.prevchar = null;
    } else {
      if(char == this.prevchar) return;
      this.div0.innerText = char;
      this.div0.style.backgroundColor = TERMINALBGCOLOR;
      this.prevchar = char;
    }
  };
}

/** @implements Renderer
 * This renderer shows the source code, mostly, with a few exceptions
 * It does not show contents of terminal displays well, no RGB LEd or dot matrix
 * coors, nor various other graphicsl effects.
 * It does show different color for ON and OFF cells.
 * This is mainly useful to take a quick look at the source in-place.
 *
 * There are a few things where it deviates from the source, including showing
 * any table of contents (since those resize the circuit so there's not much
 * to avoid the change anyway).
 */
function RendererSource() {
  this.fallback = new RendererText();

  this.prevvalue = -1;
  this.prevchar = -1;
  this.div0 = null; // div for off style
  this.div1 = null; // div for on style

  this.globalInit = function() {
    this.fallback.globalInit();
  };

  this.cleanup = function() {
    util.removeElement(this.div0);
    util.removeElement(this.div1);
  };

  // one time initialization of a cell
  this.init = function(cell, x, y, clickfun) {
    this.fallback.init(cell, x, y, clickfun);
    this.div0 = this.fallback.div0;
    this.div1 = this.fallback.div1;
  };

  // specific initialization, can be re-done if cell changed on click
  this.init2 = function(cell, symbol, virtualsymbol, opt_title) {
    var c = cell.origsymbol;
    var c2 = cell.symbol; // this one can distinguish 'toc'
    if(c == ' ' && c2 == ' ') return;

    if(this.div0) {
      this.div0.innerText = c;
      this.div0.style.color = OFFCOLOR;
      this.div0.style.fontFamily = 'fixed';
      this.div0.style.fontSize = Math.floor(tw * 1.0) + 'px';
      //this.div0.style.border = '1px solid white';
      this.div0.style.textAlign = 'center';
      //this.div0.style.fontWeight = 'bold';
      this.div0.style.zIndex = MAINZINDEX;
    }
    if(this.div1) {
      var c1 = c;
      // One of the few exceptions for 'source': capitalize ON LED's
      if(c == 'l' && cell.components[0] && cell.components[0].type == TYPE_LED) c1 = 'L';
      this.div1.innerText = c1;
      this.div1.style.color = ONCOLOR;
      this.div1.style.fontFamily = 'fixed';
      this.div1.style.fontSize = Math.floor(tw * 1.0) + 'px';
      this.div1.style.fontWeight = 'bold';
      this.div1.style.textAlign = 'center';
      this.div1.style.zIndex = MAINZINDEX;
      this.div1.style.visibility = 'hidden';
    }

    if(cell.comment) this.div0.style.color = TEXTFGCOLOR;

    // One of the few exceptions that's not rendered as source. One reason is that the original shape of the circuit has been changed to let the TOC fit here anyway, and the toc command overwritten from the cell.symbol's
    if(symbol == 'toc') {
      setTocHTML(cell.circuitextra, cell.tocdepth, cell.toclink, this.div0);
    }


    if(virtualsymbol == 'T') {
      var outside = specialmap[symbol];
      var vte = null;
      if(cell.components[0] && cell.components[0].type == TYPE_VTE) vte = cell.components[0].vte;
      if(!vte && cell.components[0] && cell.components[0].parent) vte = cell.components[0].parent.vte;

      if(vte) {
        var comp = cell.components[0];
        if(vte.parent == comp && vte.supportsTyping() && comp.corecell.x == cell.x && comp.corecell.y == cell.y) {
          // set at position where this terminal is, because otherwise the browser will scroll the screen towards where the element is placed when focusing it
          vte.initTextArea(worldDiv, cell.x * tw, cell.y * th);
        }
      }
    }

    if(cell.components[0] && cell.components[0].error) {
      this.markError(cell, cell.getErrorText());
    } else if(opt_title) {
      if(this.div0) this.div0.title = opt_title;
      if(this.div1) this.div1.title = opt_title;
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
    if(!this.div0) return;
    var style = opt_textstyle ? 'text' : 'pointer';
    this.div0.style.cursor = style;
    this.div1.style.cursor = style;
    if(this.clickDiv) this.clickDiv.style.cursor = style;
  };

  this.setValue = function(cell, value, type) {
    if(!this.div1) return; // e.g. if this is a comment (TODO: fix the fact that comment gets setValue at all, it should not be part of a component)
    if(value != this.prevvalue) { // changing visibility is slow in case of lots of elements, so only do if it changed
      if(value) {
        this.div0.style.visibility = 'hidden';
        this.div1.style.visibility = 'visible';
      } else {
        this.div0.style.visibility = 'visible';
        this.div1.style.visibility = 'hidden';
      }
    }
    this.prevvalue = value;
  };

  this.setLook = function(cell, type) {
    this.fallback.setLook(cell, type);
  };

  // typevte rendervte typeterminal renderterminal
  this.setTerminal = function(char, blink, blur) {
    if(blink) {
      //blinking cursor for the active terminal
      this.div0.innerText = '';
      registerBlinkingCursor(this.div0);
      this.prevchar = null;
    } else if(blur) {
      this.div0.innerText = '';
      this.prevchar = null;
    } else {
      if(char == this.prevchar) return;
      if(char == ' ' || !char) {
      } else if(!char) {
        this.div1.innerText = '';
        this.div1.style.visibility = 'hidden';
      } else {
        this.div1.innerText = char;
        if(this.prevchar != ' ') this.div1.style.visibility = 'visible';
      }
      this.prevchar = char;
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
  var n = getNeighbor(x, y, dir);
  if(n) {
    var x2 = n.x;
    var y2 = n.y;
    var c2 = world[y2][x2].circuitsymbol;

    if(dir > 3) {
      if(world[y2][x2].circuitextra == 2 && dinputmap[c2]) {
        // this is a diagonal ^, possibly crossing. If not crossing and this wire corresponds to the empty output side, then a wire should not make a diagonal branch towards that input
        var n2 = getNeighbor(x2, y2, dir);
        if(!n2) return false;
        var x3 = n2.x;
        var y3 = n2.y;
        var c3 = world[y3][x3].circuitsymbol;
        if(!devicemaparea[c3]) return false;
      }
      return true;
    }

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
  if(!(antennamap[world[y][x].circuitsymbol] && world[y][x].circuitextra != 1)) world[y][x].circuitsymbol = 'g';

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

  if(world[y][x].clusterindex >= 0 && world[y][x].clusterindex == world[y2][x2].clusterindex) return true; // TODO: probably this check is enough and all the below can be removed

  if((c == 'b' || c == 'B') && (c2 == 'b' || c2 == 'B')) return true;
  /*if(c == 'c' && c2 == 'c') {
    return !!world[y][x].ff && (world[y][x].ff == world[y2][x2].ff);
  }
  if(ffmap[c] && ffmap[c2]) return true;*/
  if(ffmap[c] && ffmap[c2]) {
    var co1 = world[y][x].components[0];
    var co2 = world[y2][x2].components[0];
    var ff1 = co1.parent ? co1.parent.ff : co1.ff;
    var ff2 = co2.parent ? co2.parent.ff : co2.ff;
    return !!ff1 && ff1 == ff2;
  }
  if(devicemap[c] && devicemap[c2]) return false;
  if((c == '#' || largeextendmap[c]) && (devicemaparea[c2])) return true;
  if((c2 == '#' || largeextendmap[c2]) && (devicemaparea[c])) return true;

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

    var thick = tw > 35;

    if(USE_BRESENHAM) {
      // For non-diagonal lines, the canvas line drawing routine is reliable
      // enough to not be blurry (if used carefully such as with the 0.5's
      // below). So let's use that for those, assuming this is more efficient.
      if(x0b == x1b) {
        if(x0b == tw) { x0b--; x1b--; }
        ctx.moveTo(this.tx + x0b + 0.5, this.ty + y0b);
        ctx.lineTo(this.tx + x1b + 0.5, this.ty + y1b);
        if(thick) {
          if(x0 > 0.5) {
            ctx.moveTo(this.tx + x0b + 0.5 - 1, this.ty + y0b);
            ctx.lineTo(this.tx + x1b + 0.5 - 1, this.ty + y1b);
          } else {
            ctx.moveTo(this.tx + x0b + 0.5 + 1, this.ty + y0b);
            ctx.lineTo(this.tx + x1b + 0.5 + 1, this.ty + y1b);
          }
        }
        return;
      } else if(y0b == y1b) {
        if(y0b == th) { y0b--; y1b--; }
        ctx.moveTo(this.tx + x0b, this.ty + y0b + 0.5);
        ctx.lineTo(this.tx + x1b, this.ty + y1b + 0.5);
        if(thick) {
          if(y0 > 0.5) {
            ctx.moveTo(this.tx + x0b, this.ty + y0b + 0.5 - 1);
            ctx.lineTo(this.tx + x1b, this.ty + y1b + 0.5 - 1);
          } else {
            ctx.moveTo(this.tx + x0b, this.ty + y0b + 0.5 + 1);
            ctx.lineTo(this.tx + x1b, this.ty + y1b + 0.5 + 1);
          }
        }
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
        if(thick) {
          if(dxb > dyb) ctx.fillRect(this.tx + x, this.ty + y, 1, 2);
          else ctx.fillRect(this.tx + x, this.ty + y, 2, 1);
        } else {
          ctx.fillRect(this.tx + x, this.ty + y, 1, 1);
        }
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

  this.drawFilledTriangle_ = function(ctx, x0, y0, x1, y1, x2, y2) {
    var x0b = this.tx + Math.floor(x0 * tw);
    var y0b = this.ty + Math.floor(y0 * th);
    var x1b = this.tx + Math.floor(x1 * tw);
    var y1b = this.ty + Math.floor(y1 * th);
    var x2b = this.tx + Math.floor(x2 * tw);
    var y2b = this.ty + Math.floor(y2 * th);

    ctx.beginPath();
    ctx.moveTo(x0b, y0b);
    ctx.lineTo(x1b, y1b);
    ctx.lineTo(x2b, y2b);
    ctx.fill();
  };

  this.drawFilledRectangle_ = function(ctx, x0, y0, x1, y1) {
    var x0b = this.tx + Math.floor(x0 * tw);
    var y0b = this.ty + Math.floor(y0 * th);
    var x1b = this.tx + Math.floor(x1 * tw);
    var y1b = this.ty + Math.floor(y1 * th);

    ctx.fillRect(x0b, y0b, x1b - x0b, y1b - y0b);
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

  this.drawEllipse_ = function(ctx, x, y, radiusx, radiusy) {
    var xb = Math.floor(x * tw);
    var yb = Math.floor(y * th);
    var rxb = Math.floor(radiusx * th);
    var ryb = Math.floor(radiusy * th);
    ctx.beginPath();
    ctx.ellipse(this.tx + xb, this.ty + yb, rxb, ryb, 0, 0, Math.PI * 2, true);
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
    if(connected2b(cell.x, cell.y, 0)) { num++; code |= 1; this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.4); }
    if(connected2b(cell.x, cell.y, 1)) { num++; code |= 2; this.drawLineCore_(ctx, 0.6, 0.5, 1, 0.5); }
    if(connected2b(cell.x, cell.y, 2)) { num++; code |= 4; this.drawLineCore_(ctx, 0.5, 0.6, 0.5, 1); }
    if(connected2b(cell.x, cell.y, 3)) { num++; code |= 8; this.drawLineCore_(ctx, 0, 0.5, 0.4, 0.5); }
    if(connected2b(cell.x, cell.y, 4)) { num++; code |= 16; this.drawLineCore_(ctx, 0.6, 0.4, 1, 0); }
    if(connected2b(cell.x, cell.y, 5)) { num++; code |= 32; this.drawLineCore_(ctx, 0.6, 0.6, 1, 1); }
    if(connected2b(cell.x, cell.y, 6)) { num++; code |= 64; this.drawLineCore_(ctx, 0.4, 0.6, 0, 1); }
    if(connected2b(cell.x, cell.y, 7)) { num++; code |= 128; this.drawLineCore_(ctx, 0.4, 0.4, 0, 0); }
    ctx.stroke();
    if(connected2b(cell.x, cell.y, 0)) { drawer.drawFilledCircle_(ctx, 0.50, 0.35, 0.07); }
    if(connected2b(cell.x, cell.y, 1)) { drawer.drawFilledCircle_(ctx, 0.65, 0.50, 0.07); }
    if(connected2b(cell.x, cell.y, 2)) { drawer.drawFilledCircle_(ctx, 0.50, 0.65, 0.07); }
    if(connected2b(cell.x, cell.y, 3)) { drawer.drawFilledCircle_(ctx, 0.35, 0.50, 0.07); }
    if(connected2b(cell.x, cell.y, 4)) { drawer.drawFilledCircle_(ctx, 0.65, 0.35, 0.07); }
    if(connected2b(cell.x, cell.y, 5)) { drawer.drawFilledCircle_(ctx, 0.65, 0.65, 0.07); }
    if(connected2b(cell.x, cell.y, 6)) { drawer.drawFilledCircle_(ctx, 0.35, 0.65, 0.07); }
    if(connected2b(cell.x, cell.y, 7)) { drawer.drawFilledCircle_(ctx, 0.35, 0.35, 0.07); }
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

  // specifically made for dynamic rendering of the 8-way '*' crossing. Value and code use different bits.
  this.drawCrossing2_ = function(ctx, code, value, color0, color1) {
    var full = 1; // which one gets the full length

    if(code & 2) {
      ctx.strokeStyle = ctx.fillStyle = ((value & 1) ? color1 : color0);
      ctx.beginPath();
      if(full == 2) {
        this.drawLineCore_(ctx, 0, 0.5, 1, 0.5);
        full = 0;
      } else {
        var shift = 0.2;
        this.drawLineCore_(ctx, 0, 0.5, 0.5 - shift + 0.1, 0.5);
        this.drawLineCore_(ctx, 0.5 + shift, 0.5, 1, 0.5);
      }
      ctx.stroke();
    }

    if(code & 1) {
      ctx.strokeStyle = ctx.fillStyle = ((value & 2) ? color1 : color0);
      ctx.beginPath();
      if(full) {
        this.drawLineCore_(ctx, 0.5, 0, 0.5, 1);
        full = 0;
      } else {
        var shift = 0.2;
        this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5 - shift + 0.1);
        this.drawLineCore_(ctx, 0.5, 0.5 + shift, 0.5, 1);
      }
      ctx.stroke();
    }

    if(code & 4) {
      ctx.strokeStyle = ctx.fillStyle = ((value & 8) ? color1 : color0);
      ctx.beginPath();
      if(full == 4) {
        this.drawLineCore_(ctx, 0, 1, 1, 0);
        full = 0;
      } else {
        this.drawLineCore_(ctx, 0, 1, 0.4, 0.6);
        this.drawLineCore_(ctx, 0.6, 0.4, 1, 0);
      }
      ctx.stroke();
    }

    if(code & 8) {
      ctx.strokeStyle = ctx.fillStyle = ((value & 4) ? color1 : color0);
      ctx.beginPath();
      if(full == 8) {
        this.drawLineCore_(ctx, 0, 0, 1, 1);
        full = 0;
      } else {
        this.drawLineCore_(ctx, 0, 0, 0.4, 0.4);
        this.drawLineCore_(ctx, 0.6, 0.6, 1, 1);
      }
      ctx.stroke();
    }
  };

  // Designed for the wire crossing input 'X' and 'Y' to draw the non-arrow parts. Returns similar value as this.drawCrossing_, but with 8 possible separate directions for the num and code.
  this.drawCrossing_crossingInput_ = function(cell, ctx) {
    var num = 0;
    var code = 0;
    var gap = 0.1;
    if(connected2g(cell.x, cell.y, 0) && isInterestingComponent(cell, 1)) { num++;  code |= 1; }
    if(connected2g(cell.x, cell.y, 1) && isInterestingComponent(cell, 0)) { num++;  code |= 2; }
    if(connected2g(cell.x, cell.y, 2) && isInterestingComponent(cell, 1)) { num++;  code |= 4; }
    if(connected2g(cell.x, cell.y, 3) && isInterestingComponent(cell, 0)) { num++;  code |= 8; }
    if(connected2g(cell.x, cell.y, 4) && isInterestingComponent(cell, 3)) { num++; code |= 16; }
    if(connected2g(cell.x, cell.y, 5) && isInterestingComponent(cell, 2)) { num++; code |= 32; }
    if(connected2g(cell.x, cell.y, 6) && isInterestingComponent(cell, 3)) { num++; code |= 64; }
    if(connected2g(cell.x, cell.y, 7) && isInterestingComponent(cell, 2)) { num++; code |= 128; }

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

  // The version for dynamicdraw
  this.drawCrossing_crossingInput2_ = function(ctx, code, value, color0, color1) {
    var gap = 0.1;
    var full = 1; // which one gets the full length
    if((code & 2) || (code & 8)) {
      ctx.strokeStyle = ctx.fillStyle = ((value & 1) ? color1 : color0);
      ctx.beginPath();
      if(full) {
        if(code & 2) this.drawLineCore_(ctx, 0.5, 0.5, 1, 0.5);
        if(code & 8) this.drawLineCore_(ctx, 0, 0.5, 0.5, 0.5);
        full = 0;
      } else {
        if(code & 2) this.drawLineCore_(ctx, 0.5 + gap, 0.5, 1, 0.5);
        if(code & 8) this.drawLineCore_(ctx, 0, 0.5, 0.5 - gap, 0.5);
      }
      ctx.stroke();
    }
    if((code & 1) || (code & 4)) {
      ctx.strokeStyle = ctx.fillStyle = ((value & 2) ? color1 : color0);
      ctx.beginPath();
      if(full) {
        this.drawLineCore_(ctx, 0.5, 0, 0.5, 1);
        if(code & 1) this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5);
        if(code & 4) this.drawLineCore_(ctx, 0.5, 0.5, 0.5, 1);
        full = 0;
      } else {
        if(code & 1) this.drawLineCore_(ctx, 0.5, 0, 0.5, 0.5 - gap);
        if(code & 4) this.drawLineCore_(ctx, 0.5, 0.5 + gap, 0.5, 1);
      }
      ctx.stroke();
    }
    if((code & 16) || (code & 64)) {
      ctx.strokeStyle = ctx.fillStyle = ((value & 8) ? color1 : color0);
      ctx.beginPath();
      if(full) {
        if(code & 16) this.drawLineCore_(ctx, 0.5, 0.5, 1, 0);
        if(code & 64) this.drawLineCore_(ctx, 0.5, 0.5, 0, 1);
        full = 0;
      } else {
        if(code & 16) this.drawLineCore_(ctx, 0.6, 0.4, 1, 0);
        if(code & 64) this.drawLineCore_(ctx, 0.4, 0.6, 0, 1);
      }
      ctx.stroke();
    }
    if((code & 32) || (code & 128)) {
      ctx.strokeStyle = ctx.fillStyle = ((value & 4) ? color1 : color0);
      ctx.beginPath();
      if(full) {
        if(code & 32) this.drawLineCore_(ctx, 0.5, 0.5, 1, 1);
        if(code & 128) this.drawLineCore_(ctx, 0.5, 0.5, 0, 0);
        full = 0;
      } else {
        if(code & 32) this.drawLineCore_(ctx, 0.6, 0.6, 1, 1);
        if(code & 128) this.drawLineCore_(ctx, 0.4, 0.4, 0, 0);
      }
      ctx.stroke();
    }

  };

  this.drawCrossingInput_ = function(cell, ctx) {
    var r = drawer.drawCrossing_crossingInput_(cell, ctx);
    var num = r[0];
    var code = r[1];
    var code2 = 0;
    if(hasDevice(cell.x, cell.y, 0) && isInterestingComponent(cell, 1)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 0, 0.19); code2 |= 1; }
    if(hasDevice(cell.x, cell.y, 1) && isInterestingComponent(cell, 0)) { drawer.drawArrow_(ctx, 0.5, 0.5, 1, 0.5, 0.19); code2 |= 2; }
    if(hasDevice(cell.x, cell.y, 2) && isInterestingComponent(cell, 1)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 1, 0.19); code2 |= 4; }
    if(hasDevice(cell.x, cell.y, 3) && isInterestingComponent(cell, 0)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0, 0.5, 0.19); code2 |= 8; }
    if(hasDevice(cell.x, cell.y, 4) && isInterestingComponent(cell, 3)) { drawer.drawArrow_(ctx, 0.5, 0.5, 1, 0); code2 |= 16; }
    if(hasDevice(cell.x, cell.y, 5) && isInterestingComponent(cell, 2)) { drawer.drawArrow_(ctx, 0.5, 0.5, 1, 1); code2 |= 32; }
    if(hasDevice(cell.x, cell.y, 6) && isInterestingComponent(cell, 3)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0, 1); code2 |= 64; }
    if(hasDevice(cell.x, cell.y, 7) && isInterestingComponent(cell, 2)) { drawer.drawArrow_(ctx, 0.5, 0.5, 0, 0); code2 |= 128; }
    return [num, code, code2];
  };

  this.drawCrossingInput2_ = function(ctx, code, code2, value, color0, color1) {
    this.drawCrossing_crossingInput2_(ctx, code, value, color0, color1);
    if(code2 & 1) { ctx.strokeStyle = ctx.fillStyle = (value & 2) ? color1 : color0; drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 0, 0.19); }
    if(code2 & 2) { ctx.strokeStyle = ctx.fillStyle = (value & 1) ? color1 : color0; drawer.drawArrow_(ctx, 0.5, 0.5, 1, 0.5, 0.19); }
    if(code2 & 4) { ctx.strokeStyle = ctx.fillStyle = (value & 2) ? color1 : color0; drawer.drawArrow_(ctx, 0.5, 0.5, 0.5, 1, 0.19); }
    if(code2 & 8) { ctx.strokeStyle = ctx.fillStyle = (value & 1) ? color1 : color0; drawer.drawArrow_(ctx, 0.5, 0.5, 0, 0.5, 0.19); }
    if(code2 & 16) { ctx.strokeStyle = ctx.fillStyle = (value & 8) ? color1 : color0; drawer.drawArrow_(ctx, 0.5, 0.5, 1, 0); }
    if(code2 & 32) { ctx.strokeStyle = ctx.fillStyle = (value & 4) ? color1 : color0; drawer.drawArrow_(ctx, 0.5, 0.5, 1, 1); }
    if(code2 & 64) { ctx.strokeStyle = ctx.fillStyle = (value & 8) ? color1 : color0; drawer.drawArrow_(ctx, 0.5, 0.5, 0, 1); }
    if(code2 & 128) { ctx.strokeStyle = ctx.fillStyle = (value & 4) ? color1 : color0; drawer.drawArrow_(ctx, 0.5, 0.5, 0, 0); }
  };

  this.drawAntiCrossingInput_ = function(cell, ctx, oppositeColor) {
    var r = drawer.drawCrossing_crossingInput_(cell, ctx);
    var num = r[0];
    var code = r[1];
    var code2 = 0;
    // no "isInterestingComponent" checks for Y, unlike X, because Y can affect things, it's negating (for X any effect, like as AND input, is negated if it's a dummy, but not for Y)
    if(hasDevice(cell.x, cell.y, 0)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0.5, 0); code2 |= 1; }
    if(hasDevice(cell.x, cell.y, 1)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 1, 0.5); code2 |= 2; }
    if(hasDevice(cell.x, cell.y, 2)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0.5, 1); code2 |= 4; }
    if(hasDevice(cell.x, cell.y, 3)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0, 0.5); code2 |= 8; }
    if(hasDevice(cell.x, cell.y, 4)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 1, 0); code2 |= 16; }
    if(hasDevice(cell.x, cell.y, 5)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 1, 1); code2 |= 32; }
    if(hasDevice(cell.x, cell.y, 6)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0, 1); code2 |= 64; }
    if(hasDevice(cell.x, cell.y, 7)) { drawer.drawAntiArrow_(ctx, oppositeColor, 0.5, 0.5, 0, 0); code2 |= 128; }
    return [num, code, code2];
  };

  this.drawAntiCrossingInput2_ = function(ctx, code, code2, value, color0, color1) {
    this.drawCrossing_crossingInput2_(ctx, code, value, color0, color1);

    if(code2 & 1) { ctx.strokeStyle = ctx.fillStyle = (value & 2) ? color1 : color0; drawer.drawAntiArrow_(ctx, (value & 2) ? color0 : color1, 0.5, 0.5, 0.5, 0); }
    if(code2 & 2) { ctx.strokeStyle = ctx.fillStyle = (value & 1) ? color1 : color0; drawer.drawAntiArrow_(ctx, (value & 1) ? color0 : color1, 0.5, 0.5, 1, 0.5); }
    if(code2 & 4) { ctx.strokeStyle = ctx.fillStyle = (value & 2) ? color1 : color0; drawer.drawAntiArrow_(ctx, (value & 2) ? color0 : color1, 0.5, 0.5, 0.5, 1); }
    if(code2 & 8) { ctx.strokeStyle = ctx.fillStyle = (value & 1) ? color1 : color0; drawer.drawAntiArrow_(ctx, (value & 1) ? color0 : color1, 0.5, 0.5, 0, 0.5); }
    if(code2 & 16) { ctx.strokeStyle = ctx.fillStyle = (value & 8) ? color1 : color0; drawer.drawAntiArrow_(ctx, (value & 8) ? color0 : color1, 0.5, 0.5, 1, 0); }
    if(code2 & 32) { ctx.strokeStyle = ctx.fillStyle = (value & 4) ? color1 : color0; drawer.drawAntiArrow_(ctx, (value & 4) ? color0 : color1, 0.5, 0.5, 1, 1); }
    if(code2 & 64) { ctx.strokeStyle = ctx.fillStyle = (value & 8) ? color1 : color0; drawer.drawAntiArrow_(ctx, (value & 8) ? color0 : color1, 0.5, 0.5, 0, 1); }
    if(code2 & 128) { ctx.strokeStyle = ctx.fillStyle = (value & 4) ? color1 : color0; drawer.drawAntiArrow_(ctx, (value & 4) ? color0 : color1, 0.5, 0.5, 0, 0); }
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
// initfun = set parameters, CSS style, etc... on the canvases it creates
function MultiCanvas(x, y, w, h, parent, initfun) {
  if(USE_BRESENHAM) {
    // as of june 2020, it now looks like it's more performant in chrome to have smaller rather than
    // larger canvases, when switching tab back to this tab. on larger circuits when using 4096 as MAX_S,
    // then switching from another tab back to the logicemu tab appears to take 5-10 seconds before
    // chrome renders anything again since a recent update
    // Also implemented lazy loading now, so smaller canvases allows creating no canvases at all in areas where
    // no circuitry is present (but only background and selectable text which are not on a canvas)
    // however, still cannot go too small, since having many small canvases gives other performance issues,
    // for example 64 is too small and makes way too many individual canvases.
    //this.MAX_S = 4096; // max size
    this.MAX_S = 512; // max size
  } else {
    // the larger one would be a great max size to use. However, Chrome (at least on my system as of 2018) makes the
    // 45-degree diagonal lines horribly antialiased for large canvas, while for any canvas smaller than 256
    // it makes the diagonal lines like I want (= non smooth). So depending on this super brittle
    // trick now, until HTML gives reliable way to disable smoothing for lines on canvas in the future?
    this.MAX_S = 255; // max size
  }

  this.S = 0;

  this.canvases = null;
  this.contexts = null;

  this.initfun = initfun;


  this.S = Math.floor(this.MAX_S / tw) * tw; // such that size is multiple of cell size so there's no visible edges

  this.w = w;
  this.h = h;
  this.x = x;
  this.y = y;

  var numx = Math.ceil(w  / this.S);
  var numy = Math.ceil(h  / this.S);

  this.canvases = [];
  this.contexts = [];

  this.makeCanvas = function(x2, y2) {
    if(!this.canvases[y2]) this.canvases[y2] = [];
    if(!this.contexts[y2]) this.contexts[y2] = [];
    var h2 = Math.min(this.S, this.h - y2 * this.S);
    var w2 = Math.min(this.S, this.w - x2 * this.S);
    this.canvases[y2][x2] = util.makeAbsElement('canvas', this.x + x2 * this.S, this.y + y2 * this.S, w2, h2, parent);
    this.canvases[y2][x2].width = w2;
    this.canvases[y2][x2].height = h2;
    this.canvases[y2][x2].style.display = 'block';
    //this.canvases[y2][x2].style.border = '1px solid red'; // for debugging
    this.contexts[y2][x2] = this.canvases[y2][x2].getContext('2d');
    this.initfun(this.canvases[y2][x2], this.contexts[y2][x2]);
  };

  this.hasCanvas = function(x2, y2) {
    if(!this.canvases[y2]) return false;
    if(!this.canvases[y2][x2]) return false;
    return true;
  };

  this.remove = function() {
    if(!this.canvases) return;

    for(var y2 = 0; y2 < this.canvases.length; y2++) {
      if(!this.canvases[y2]) continue;
      for(var x2 = 0; x2 < this.canvases[y2].length; x2++) {
        if(this.hasCanvas(x2, y2)) util.removeElement(this.canvases[y2][x2]);
      }
    }
    this.canvases = null;
    this.contexts = null;
  };

  this.getCanvasAt = function(x, y) {
    var x2 = Math.floor(x / this.S);
    var y2 = Math.floor(y / this.S);
    if(!this.hasCanvas(x2, y2)) this.makeCanvas(x2, y2);
    return this.canvases[y2][x2];
  };

  this.getCanvasForCell = function(cell) {
    return this.getCanvasAt(cell.x * tw, cell.y * th);
  };

  this.getContextAt = function(x, y) {
    var x2 = Math.floor(x / this.S);
    var y2 = Math.floor(y / this.S);
    if(!this.hasCanvas(x2, y2)) this.makeCanvas(x2, y2);
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
}

/** @constructor */
/* global info shared by renderer for every cell */
function RendererImgGlobal() {
  this.maincanvas = null;
  this.offcanvas0 = null;
  this.offcanvas1 = null;
  this.extracanvas = null;;

  this.init = function() {
    var parent = worldDiv;

    if(this.maincanvas) this.maincanvas.remove();
    if(this.offcanvas0) this.offcanvas0.remove();
    if(this.offcanvas1) this.offcanvas1.remove();
    if(this.extracanvas) this.extracanvas.remove();

    this.maincanvas = new MultiCanvas(0, 0, tw * w, th * h, parent, function(canvas, context) {
      // attempt at disabling antialiazing. It doesn't actually work, since
      // this does not apply to lines but image, but let's just tell the context
      // that we want non-AA in as many ways as possible
      context.imageSmoothingEnabled = false;
    });
    this.offcanvas0 = new MultiCanvas(0, 0, tw * w, th * h, parent, function(canvas, context) {
      canvas.style.display = 'none';
      context.imageSmoothingEnabled = false;
    });
    this.offcanvas1 = new MultiCanvas(0, 0, tw * w, th * h, parent, function(canvas, context) {
      canvas.style.display = 'none';
      context.imageSmoothingEnabled = false;
    });
    this.extracanvas = new MultiCanvas(0, 0, tw * 128, th * 4, parent, function(canvas, context) {
      canvas.style.display = 'none';
      context.imageSmoothingEnabled = false;
      context.strokeStyle = BGCOLOR;
      context.fillStyle = BGCOLOR;
      context.fillRect(0, 0, canvas.width, canvas.height);
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
  this.dynamicdrawcode = 0; // for regular wires
  this.dynamicdrawcode2 = 0; // for arrowed (or antiarrow if >= 256) wires
  this.norender = false; // don't do anything in setValue
  this.falserender = false; // only do something in setValue the first time
  this.componentdisabled = false;

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
    this.componentdisabled = false;
    var c = cell.circuitsymbol;
    if(digitmap[cell.metasymbol] && (cell.numbertype == NUMBER_LED /*|| cell.numbertype == NUMBER_ANTENNA*/)) {
      // Don't render the LED numbers in the graphical render mode (note: in text mode, they are rendered)
      this.norender = true;
    }
    if(this.norender) return;
    if(NOUSETEXTMAP[c]) {
      // optimization for those that don't need divs at all
      this.usetext = false;
    }
    if(this.usetext) this.fallback.init(cell, x, y, clickfun);
    this.tx = tw * cell.x + rglobal.offcanvas0.getXOffsetForCell(cell);
    this.ty = th * cell.y + rglobal.offcanvas0.getYOffsetForCell(cell);
    if(!cell.comment && c != ' ') {
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
        //this.text0.ontouchstart = clickfun;
      }
    }
  };


  // specific initialization, can be re-done if cell changed on click
  this.init2 = function(cell, symbol, virtualsymbol, opt_title) {
    if(this.norender) return;

    if(!this.canvas0) {
      this.usefallbackonly = true;
      this.fallback.init2(cell, symbol, virtualsymbol, opt_title);
      return;
    }

    var c = cell.circuitsymbol;

    drawer.tx = this.tx;
    drawer.ty = this.ty;

    if(this.init2done) {
      // TODO: this clears the TOP LEFT square of the screen, not the current one, check why this was needed again, if at all
      //this.ctx0.clearRect(0, 0, tw, th);
      //this.ctx1.clearRect(0, 0, tw, th);
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

    // This avoids blurry lines that take up other amounts of pixels with lighter colors than desired
    //this.ctx0.translate(0.5, 0.5);
    //this.ctx1.translate(0.5, 0.5);
    for (var i = 0; i < 2; i++) {
      var ctx = (i == 0) ? this.ctx0 : this.ctx1;
      var canvas = (i == 0) ? this.canvas0 : this.canvas1;
      var textel = (i == 0) ? this.text0 : this.text1;

      var component = cell.components[0] || cell.components[1];
      var type = component ? component.type : TYPE_NULL;

      var currentColor = (i == 0) ? OFFCOLOR : ONCOLOR;
      var oppositeColor = (i == 0) ? ONCOLOR : OFFCOLOR;
      var currentGateColor = (i == 0) ? GATEFGOFFCOLOR : GATEFGONCOLOR;
      var oppositeGateColor = (i == 0) ? GATEFGONCOLOR : GATEFGOFFCOLOR;
      var gateBorderColor = currentGateColor;

      // for big devices like IC and FlipFlop with multiple possible output values, it's
      // ugly if borders get different colors for 'on' and 'off' sub-parts of it, so set to
      // off. Idem for the text/number characters inside.
      if(i == 1 && component) {
        var fixed = ((type == TYPE_CONSTANT_OFF || type == TYPE_CONSTANT_ON || type == TYPE_FIXED) && (component.parent || component.fixed));
        if(type == TYPE_FLIPFLOP || type == TYPE_IC || type == TYPE_IC_PASSTHROUGH || type == TYPE_ROM || type == TYPE_MUX ||
            type == TYPE_ALU || fixed) {
          // only for the solid parts, wires part of this component must still use on color
          if(devicemaparea[c]) {
            if(type != TYPE_ROM && !fixed && type != TYPE_FLIPFLOP) {
              // For types where the letters/numbers don't positionally mean anything about the output wire at that location, disable
              // the on/off color, e.g. to avoid parts of the numbers of an ALU type lighting up, ...
              currentColor = OFFCOLOR;
              oppositeColor = ONCOLOR;
              currentGateColor = GATEFGOFFCOLOR;
              oppositeGateColor = GATEFGONCOLOR;
            }
            gateBorderColor = GATEFGOFFCOLOR;
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
        var r = drawer.drawCrossingInput_(cell, ctx);
        var code = r[1];
        var code2 = r[2];
        var code3 = code + code2;
        if(code2 == 0 && r[0] > 1) {
          // no actual inputs, it acts as a '*', use its simpler dynamicdraw
          this.dynamicdraw = true;
          this.dynamicdrawcode = drawer.drawCrossing_(cell, ctx)[1];
        }
        // For several combinations, built-in non-dynamic graphics can be used
        else if(code2 == 1 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 32;
        }
        else if(code2 == 2 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 33;
        }
        else if(code2 == 4 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 34;
        }
        else if(code2 == 8 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 35;
        }
        else if(code2 == 144 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 2;
        }
        else if(code2 == 48 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 8;
          this.drawextrag = 3;
        }
        else if(code2 == 96 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 8;
          this.drawextrag = 4;
        }
        else if(code2 == 192 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 5;
        }
        else if(code2 == 3 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 16;
        }
        else if(code2 == 6 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 17;
        }
        else if(code2 == 12 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 18;
        }
        else if(code2 == 9 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 19;
        }
        else {
          // nothing simpler work, use complex dynamicdraw
          this.dynamicdraw = true;
          this.dynamicdrawcode = code;
          this.dynamicdrawcode2 = code2;
        }
      } else if(c == 'Y') {
        var r = drawer.drawAntiCrossingInput_(cell, ctx, oppositeColor);
        var code = r[1];
        var code2 = r[2];
        var code3 = code + code2;
        if(code2 == 0 && r[0] > 1) {
          // no actual inputs, it acts as a '*', use its simpler dynamicdraw
          this.dynamicdraw = true;
          this.dynamicdrawcode = drawer.drawCrossing_(cell, ctx)[1];
        }
        // For several combinations, built-in non-dynamic graphics can be used
        else if(code2 == 1 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 36;
        }
        else if(code2 == 2 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 37;
        }
        else if(code2 == 4 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 38;
        }
        else if(code2 == 8 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 39;
        }
        else if(code2 == 144 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 6;
        }
        else if(code2 == 48 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 8;
          this.drawextrag = 7;
        }
        else if(code2 == 96 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 4;
          this.drawextrai1 = 8;
          this.drawextrag = 8;
        }
        else if(code2 == 192 && code3 == 240) {
          this.drawextra = true;
          this.drawextrai0 = 8;
          this.drawextrai1 = 4;
          this.drawextrag = 9;
        }
        else if(code2 == 3 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 20;
        }
        else if(code2 == 6 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 21;
        }
        else if(code2 == 12 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 1;
          this.drawextrai1 = 2;
          this.drawextrag = 22;
        }
        else if(code2 == 9 && code3 == 15) {
          this.drawextra = true;
          this.drawextrai0 = 2;
          this.drawextrai1 = 1;
          this.drawextrag = 23;
        }
        else {
          // nothing simpler work, use complex dynamicdraw
          this.dynamicdraw = true;
          this.dynamicdrawcode = code;
          this.dynamicdrawcode2 = (code2 << 8);
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
          ctx.font = '' + tw + 'px sans-serif';
          this.ctx0.strokeStyle = this.ctx0.fillStyle = BGCOLOR;
          ctx.fillText(symbol, drawer.tx + (tw >> 1), drawer.ty + (th >> 1));
        }
      } else if(c == '@') {
        //drawer.fillBg_(ctx, TEXTFGCOLOR);
        drawer.fillBg_(ctx, OFFCOLOR);
      } else if(c == 'I' || (cell.numbertype == NUMBER_ICDEF && digitmap[c])) {
        this.fallback.init2(cell, symbol, virtualsymbol); this.usefallbackonly = true; break;
      } else if(virtualsymbol == 'T') {
        this.fallback.init2(cell, symbol, virtualsymbol); this.usefallbackonly = true; break;
      } else if(virtualsymbol == 'D') {
        // turn # into space to not render the #'s in graphical mode
        this.fallback.init2(cell, extendmap[symbol] ? ' ' : symbol, virtualsymbol); this.usefallbackonly = true; break;
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
        var numborder = 0;
        if(!error) {
          var type = TYPE_NULL;
          if(cell.components[0]) type = cell.components[0].type;

          // Replace constant f and F to 0 or 1, but not if they have a parent component, then their decimal number should show
          if(cell.components[0] && type == TYPE_CONSTANT_OFF && !cell.components[0].parent) symbol = '0';
          if(cell.components[0] && type == TYPE_CONSTANT_ON && !cell.components[0].parent) symbol = '1';

          if(cell.components[0] && (type == TYPE_CONSTANT_OFF || type == TYPE_CONSTANT_ON || type == TYPE_FIXED) && cell.components[0].parent) {
            if(cell.fixedvaluesymbol) symbol = cell.fixedvaluesymbol;
          }

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
            if(color >= led_off_fg_colors.length) color = 0; // not more colors than that supported
            drawer.fillBg_(ctx, i == 0 ? led_off_bg_colors[color] : led_on_bg_colors[color]);

            this.ctx0.strokeStyle = this.ctx0.fillStyle = led_off_border_colors[color];
            this.ctx1.strokeStyle = this.ctx1.fillStyle = led_on_border_colors[color];
            this.text0.style.color = led_off_fg_colors[color];
            this.text1.style.color = led_on_fg_colors[color];
            if(i == 1) symbol = 'L';
          }
          if(virtualsymbol == 'B') {
            // invert the colors for on bits, to make them more distinguishable
            alreadybg = true;
            drawer.fillBg_(ctx, currentGateColor);
            textel.style.color = GATEBGCOLOR;
            // NOTE: the background color may not show up for invalid lone B's,
            // that are not part of a valid ROM. This is because setValue will
            // not be called on them. However, this bug is ignored, no need
            // to call setValue on them, that could be inefficient. The below
            // commented out line also fixes it, but again, not necessary and
            // could be inefficient.
            //textel.style.backgroundColor = currentColor;
          }
        }
        if(c == 'J') {
          numborder = this.drawBorder(cell, drawer, ctx, true); // dryrun
          if(numborder != 4) {
            // this jack is larger, so drawing just the sphere without border looks ugly,
            // as the extension has borders
            drawer.fillBg_(ctx, GATEBGCOLOR);
            this.drawBorder(cell, drawer, ctx, false);
          }
          //drawer.drawCircle_(ctx, 0.5, 0.5, 0.5);
          ctx.fillStyle = currentColor;
          textel.style.color = GATEBGCOLOR;
          //ctx.strokeStyle = 'blue';
          drawer.drawFilledCircle_(ctx, 0.5, 0.5, 0.45);
          drawer.drawCircle_(ctx, 0.5, 0.5, 0.45);
        } else if(devicemaparea[c]) {
          if(!alreadybg) {
            drawer.fillBg_(ctx, GATEBGCOLOR);
            // if alreadybg is set, also a specific fg/border color has already been set, don't override those either (so, this is not for switches/LEDs, but for AND gates and other plain colored devices)
            textel.style.color = currentGateColor;
            ctx.strokeStyle = gateBorderColor;
          }
          numborder = this.drawBorder(cell, drawer, ctx);
        }
        var okdraw = true;
        if(c == '#' || largeextendmap[c]) {
          okdraw = false;
          if((c == '#i' || c == '#U' || c == '#f') && digitmap[cell.metasymbol]) okdraw = true; // do still draw chip/ALU/fixed numbers

          if(c == '#U' && cell.labelsymbol != null) {
            okdraw = true; // text label on ALU
            symbol = cell.labelsymbol;
          }
        }
        if(c == 'K') { // TYPE_KINETIC
          okdraw = false;
          if(!component.number) {
            // draw a gear-icon
            drawer.drawCircle_(ctx, 0.5, 0.5, 0.15);
            var num = (tw < 32) ? 6 : 8;
            var r0 = 0.25;
            var r1 = 0.35;
            for(var j = 0; j < num; j++) {
              var t0 = j / num;
              var t1 = (j + 0.5) / num;
              var t2 = (j + 1) / num;
              var s0 = Math.sin(t0 * Math.PI * 2);
              var s1 = Math.sin(t1 * Math.PI * 2);
              var s2 = Math.sin(t2 * Math.PI * 2);
              var c0 = Math.cos(t0 * Math.PI * 2);
              var c1 = Math.cos(t1 * Math.PI * 2);
              var c2 = Math.cos(t2 * Math.PI * 2);
              drawer.drawLine_(ctx, 0.5 + s0 * r0, 0.5 + c0 * r0, 0.5 + s0 * r1, 0.5 + c0 * r1);
              drawer.drawLine_(ctx, 0.5 + s1 * r0, 0.5 + c1 * r0, 0.5 + s1 * r1, 0.5 + c1 * r1);

              drawer.drawArc_(ctx, 0.5, 0.5, t0, t1, r0);
              drawer.drawArc_(ctx, 0.5, 0.5, t1, t2, r1);
            }
            if(i == 1) {
              // draw stripes that indicate the gear is spinning
              var s = 0.07;
              var s2 = 0.03;
              drawer.drawArc_(ctx, 0.5, 0.5, 1.0 / 8 - s, 1.0 / 8 + s, 0.45);
              drawer.drawArc_(ctx, 0.5, 0.5, 3.0 / 8 - s, 3.0 / 8 + s, 0.45);
              drawer.drawArc_(ctx, 0.5, 0.5, 5.0 / 8 - s, 5.0 / 8 + s, 0.45);
              drawer.drawArc_(ctx, 0.5, 0.5, 7.0 / 8 - s, 7.0 / 8 + s, 0.45);
              drawer.drawArc_(ctx, 0.5, 0.5, 1.0 / 8 - s2, 1.0 / 8 + s2, 0.52);
              drawer.drawArc_(ctx, 0.5, 0.5, 3.0 / 8 - s2, 3.0 / 8 + s2, 0.52);
              drawer.drawArc_(ctx, 0.5, 0.5, 5.0 / 8 - s2, 5.0 / 8 + s2, 0.52);
              drawer.drawArc_(ctx, 0.5, 0.5, 7.0 / 8 - s2, 7.0 / 8 + s2, 0.52);
            }
          } else if(component.number == 1) {
            // draw a fan-icon
            drawer.drawFilledCircle_(ctx, 0.5, 0.5, 0.15);
            drawer.drawFilledTriangle_(ctx, 0.5, 0.5, 0.1, 0.1, 0.3, 0.1);
            drawer.drawFilledTriangle_(ctx, 0.5, 0.5, 0.9, 0.1, 0.9, 0.3);
            drawer.drawFilledTriangle_(ctx, 0.5, 0.5, 0.9, 0.9, 0.7, 0.9);
            drawer.drawFilledTriangle_(ctx, 0.5, 0.5, 0.1, 0.9, 0.1, 0.7);
            if(i == 1) {
              // draw stripes that indicate the fan is spinning
              drawer.drawArc_(ctx, 0.5, 0.5, 1.0/8-0.15, 1.0/8, 0.25);
              drawer.drawArc_(ctx, 0.5, 0.5, 1.0/8-0.15, 1.0/8, 0.35);
              drawer.drawArc_(ctx, 0.5, 0.5, 1.0/8-0.15+0.25, 1.0/8+0.25, 0.25);
              drawer.drawArc_(ctx, 0.5, 0.5, 1.0/8-0.15+0.25, 1.0/8+0.25, 0.35);
              drawer.drawArc_(ctx, 0.5, 0.5, 1.0/8-0.15+0.5, 1.0/8+0.5, 0.25);
              drawer.drawArc_(ctx, 0.5, 0.5, 1.0/8-0.15+0.5, 1.0/8+0.5, 0.35);
              drawer.drawArc_(ctx, 0.5, 0.5, 1.0/8-0.15+0.75, 1.0/8+0.75, 0.25);
              drawer.drawArc_(ctx, 0.5, 0.5, 1.0/8-0.15+0.75, 1.0/8+0.75, 0.35);
            }
          } else if(component.number == 2) {
            // TODO: draw this better. This represents a heating coil, with some stripes indicating heat above it when enabled
            // draw a heating coil icon
            drawer.drawLine_(ctx, 0.2, 1.0, 0.2, 0.7);
            drawer.drawCircle_(ctx, 0.3, 0.7, 0.1);
            drawer.drawCircle_(ctx, 0.43, 0.7, 0.1);
            drawer.drawCircle_(ctx, 0.58, 0.7, 0.1);
            drawer.drawCircle_(ctx, 0.7, 0.7, 0.1);
            drawer.drawLine_(ctx, 0.79, 1.0, 0.79, 0.7);
            if(i == 1) {
              // draw heat stripes above it
              drawer.drawArc_(ctx, 0.4, 0.4, 0.5-0.1, 0.5+0.1, 0.15);
              drawer.drawArc_(ctx, 0.6, 0.4, 0.5-0.1, 0.5+0.1, 0.15);
              drawer.drawArc_(ctx, 0.8, 0.4, 0.5-0.1, 0.5+0.1, 0.15);
              drawer.drawArc_(ctx, 0.17, 0.25, 0.0-0.1, 0.0+0.1, 0.15);
              drawer.drawArc_(ctx, 0.37, 0.25, 0.0-0.1, 0.0+0.1, 0.15);
              drawer.drawArc_(ctx, 0.57, 0.25, 0.0-0.1, 0.0+0.1, 0.15);
            }
          } else if(component.number == 3) {
            // water droplet
            drawer.drawFilledTriangle_(ctx, 0.5, 0.2, 0.3, 0.5, 0.7, 0.5);
            drawer.drawFilledCircle_(ctx, 0.5, 0.6, 0.21);
          } else if(component.number == 4) {
            drawer.drawEllipse_(ctx, 0.43, 0.5, 0.15, 0.3);
            drawer.drawEllipse_(ctx, 0.57, 0.5, 0.15, 0.3);
          } else if(component.number >= 5 && component.number <= 9) {
            drawer.drawLine_(ctx, 0.2, 0.35, 0.2, 0.65);
            drawer.drawLine_(ctx, 0.1, 0.35, 0.3, 0.35);

            drawer.drawLine_(ctx, 0.4, 0.35, 0.4, 0.65);
            drawer.drawLine_(ctx, 0.4, 0.35, 0.6, 0.65);
            drawer.drawLine_(ctx, 0.6, 0.35, 0.6, 0.65);

            drawer.drawLine_(ctx, 0.8, 0.35, 0.8, 0.65);
            drawer.drawLine_(ctx, 0.7, 0.35, 0.9, 0.35);
          } else if(component.number >= 10 && component.number <= 14) {
            drawer.drawLine_(ctx, 0.1, 0.3, 0.1, 0.7);
            drawer.drawLine_(ctx, 0.1, 0.3, 0.3, 0.3);
            drawer.drawLine_(ctx, 0.1, 0.5, 0.3, 0.5);
            drawer.drawLine_(ctx, 0.1, 0.7, 0.3, 0.7);

            drawer.drawLine_(ctx, 0.4, 0.3, 0.4, 0.7);
            drawer.drawLine_(ctx, 0.4, 0.3, 0.5, 0.5);
            drawer.drawLine_(ctx, 0.5, 0.5, 0.6, 0.3);
            drawer.drawLine_(ctx, 0.6, 0.3, 0.6, 0.7);

            drawer.drawLine_(ctx, 0.75, 0.3, 0.75, 0.7);
            drawer.drawLine_(ctx, 0.75, 0.3, 0.9, 0.3);
            drawer.drawLine_(ctx, 0.9, 0.3, 0.9, 0.5);
            drawer.drawLine_(ctx, 0.75, 0.5, 0.9, 0.5);
          } else if(component.number >= 15 && component.number <= 19) {
            // ligntning symbol for jamming
            drawer.drawLine_(ctx, 0.5, 0.2, 0.3, 0.5);
            drawer.drawLine_(ctx, 0.3, 0.5, 0.6, 0.4);
            drawer.drawLine_(ctx, 0.6, 0.4, 0.4, 0.7);
            drawer.drawFilledTriangle_(ctx, 0.3, 0.7, 0.5, 0.7, 0.3, 0.85);
          } else {
            okdraw = true;
          }
        }
        //if((c == 'i') && !(cell.drawchip || digitmap[cell.metasymbol])) okdraw = false;
        if(okdraw && textel) {
          /*ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = '' + tw + 'px sans-serif';
          ctx.fillText(symbol, tw >> 1, th >> 1);*/
          textel.innerText = symbol;
        } else if((numborder == 0 && virtualsymbol == '#') || symbol == '#i') {
          // it's a plain surface of a large logic gate, without borders so nothing can change color when going on/off
          // in case of chip, even if it has border, the border there doesn't change color
          this.staticrender = true;
        }
      }
    }

    //if(cell.components[0] && cell.components[0].disabled && devicemaparea[cell.circuitsymbol]) {
    if(cell.components[0] && devicemaparea[cell.circuitsymbol]) {
      this.setLook(cell, cell.components[0].type);
    }

    // ensure that if this is a re-init (e.g. after clicking on a bB bit with mouse), it will actually draw the change, not do the optimization when nothing changed
    this.prevvalue = -1;
  };

  // box drawing for components; must already set the color styles on the ctx beforehand
  this.drawBorder = function(cell, drawer, ctx, opt_dryrun) {
    var num = 0;
    if(!sameDevice(cell.x, cell.y, 0)) { if(!opt_dryrun) drawer.drawLine_(ctx, 0, 0, 1, 0); num++; }
    if(!sameDevice(cell.x, cell.y, 1)) { if(!opt_dryrun) drawer.drawLine_(ctx, 1, 0, 1, 1); num++; }
    if(!sameDevice(cell.x, cell.y, 2)) { if(!opt_dryrun) drawer.drawLine_(ctx, 1, 1, 0, 1); num++; }
    if(!sameDevice(cell.x, cell.y, 3)) { if(!opt_dryrun) drawer.drawLine_(ctx, 0, 1, 0, 0); num++; }
    return num;
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
    if(this.norender) return;
    if(this.staticrender && this.prevvalue != -1) return;

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
        if(this.dynamicdrawcode2 == 0) {
          drawer.drawCrossing2_(dest, this.dynamicdrawcode, value, OFFCOLOR, ONCOLOR);
        } else if(this.dynamicdrawcode2 < 256) {
          drawer.drawCrossingInput2_(dest, this.dynamicdrawcode, this.dynamicdrawcode2, value, OFFCOLOR, ONCOLOR);
        } else {
          drawer.drawAntiCrossingInput2_(dest, this.dynamicdrawcode, this.dynamicdrawcode2 >> 8, value, OFFCOLOR, ONCOLOR);
        }
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
    if(!this.text0) return;

    if(cell.components[0] && (cell.components[0].disabled & 1)) {
      if(this.componentdisabled) return;
      this.componentdisabled = true;
      //util.removeElement(this.div0);
      util.removeElement(this.text1);
      this.text0.style.visibility = 'visible';
      this.text0.innerHTML = '';
      this.text0.style.backgroundColor = OFFCOLOR;
      return;
    }

    if(!this.text1) return;

    /* see the RendererText setLook function for comment about styles and types */
    // Reading from .innerText turns out to be very slow in JavaScript (for the comparisons with 'R', 'r', etc...),
    // even if there are just a few hundreds switches/timers/... in a large map, and for that reason, the separate
    // fields look0 and look1 are used instead.
    if(!cell.components[0] || cell != cell.components[0].corecell) return;
    if(type == TYPE_TIMER_ON || type == TYPE_TIMER_OFF) {
      var clocked = cell.components[0].clocked;
      if(clocked && this.look0 != 'R') this.text0.innerText = this.look0 = 'R';
      if(!clocked && this.look0 != 'r') this.text0.innerText = this.look0 = 'r';
    }
    if(type == TYPE_SWITCH_ON || type == TYPE_SWITCH_OFF) {
      var user = (type == TYPE_SWITCH_ON);
      if(user && this.look0 != 'S') this.text0.innerText = this.look0 = 'S';
      if(!user && this.look0 != 's') this.text0.innerText = this.look0 = 's';
      if(user && this.look1 != 'S') this.text1.innerText = this.look1 = 'S';
      if(!user && this.look1 != 's') this.text1.innerText = this.look1 = 's';
    }
    if(type == TYPE_PUSHBUTTON_ON || type == TYPE_PUSHBUTTON_OFF) {
      var user = (type == TYPE_PUSHBUTTON_ON);
      if(user && this.look0 != 'P') this.text0.innerText = this.look0 = 'P';
      if(!user && this.look0 != 'p') this.text0.innerText = this.look0 = 'p';
      if(user && this.look1 != 'P') this.text1.innerText = this.look1 = 'P';
      if(!user && this.look1 != 'p') this.text1.innerText = this.look1 = 'p';
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

// render when components updated. For the initial render, see initDivs
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
      if(antennamap[cell.circuitsymbol] && cell.circuitextra == 1) {
        // This is an inaccurate hack to make antennas light up as well.
        // Antennas with circuitextra 1 are actually more like "warp portals" that make far away cells treated as neighbors, but the antennas
        // themselves don't participate in the component structure.
        // The inaccurate hack makes the antenna light up if some neighboring and probably connected component lights up.
        // It is wrong in some edge cases, doesn't check any components beyond 3, not performant, and isn't copied in the renderHighlightComponent function
        // TODO: implement more accurate way. Maybe give antenna cells a component array of relevant components for rendering too, then this code can go away again.
        for(var i = 0; i < 4; i++) {
          if(y > 0 && world[y - 1][x].components[i] && world[y - 1][x].components[i].value && connected2b(x, y, 0)) value |= (1 << i);
          if(x + 1 < w && world[y][x + 1].components[i] && world[y][x + 1].components[i].value && connected2b(x, y, 1)) value |= (1 << i);
          if(y + 1 < h && world[y + 1][x].components[i] && world[y + 1][x].components[i].value && connected2b(x, y, 2)) value |= (1 << i);
          if(x > 0 && world[y][x - 1].components[i] && world[y][x - 1].components[i].value && connected2b(x, y, 3)) value |= (1 << i);
          // diagonal ones
          if(y > 0 && x + 1 < w && world[y - 1][x + 1].components[i] && world[y - 1][x + 1].components[i].value && connected2b(x, y, 4)) value |= (1 << i);
          if(y + 1 < h && x + 1 < w && world[y + 1][x + 1].components[i] && world[y + 1][x + 1].components[i].value && connected2b(x, y, 5)) value |= (1 << i);
          if(y + 1 < h && x > 0 && world[y + 1][x - 1].components[i] && world[y + 1][x - 1].components[i].value && connected2b(x, y, 6)) value |= (1 << i);
          if(y > 0 && x > 0 && world[y - 1][x - 1].components[i] && world[y - 1][x - 1].components[i].value && connected2b(x, y, 7)) value |= (1 << i);
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
    components[i].changein = 0;
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
    var nexttimerticks = timerticks + changein;
    var time = AUTOSECONDS * 1000 * changein;
    updateTimeoutId = util.setTimeoutSafe(function() {
      // this assigns the timerticks the next value expected to be once this function triggers, note that during the delay of this function, user pressed switches could have caused updates in-between, those could have changed timerticks, but that's overriden here
      timerticks = nexttimerticks;
      updateTimeoutId = null;
      if(paused) return;
      update();
    }, time);
  } else {
    timerticks++;
  }
  //console.log(timerticks);
}

// must be called after (or at the end of) parseCells
// this handles various of the numbers, but those affecting comments (which trump all of those) are already done and removed at this point.
function parseNumbers() {
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(digitmap[world[y][x].symbol] && !world[y][x].comment) {
        world[y][x].circuitsymbol = ' ';
        //world[y][x].displaysymbol = ' ';
      }
    }
  }

  // .numbertype
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      var c = world[y][x].metasymbol;
      var type = NUMBER_NONE;
      if(c == '=') type = NUMBER_BUS;
      else if(c == '"' && world[y][x].symbol == '"') type = NUMBER_COMMENT;
      else if(c == 'l') type = NUMBER_LED;
      else if(c == 'f' || c == 'F') type = NUMBER_FIXED;
      else if(c == 'r' || c == 'R') type = NUMBER_TIMER;
      else if(c == 'q' || c == 'Q') type = NUMBER_PULSE;
      else if(c == 'K') type = NUMBER_KINETIC;
      else if(c == 'N') type = NUMBER_NOTE;
      else if(c == 'I') type = NUMBER_ICDEF;
      else if(c == 'i') type = NUMBER_ICCALL;
      else if(c == 'g') type = NUMBER_GLOBAL;
      else if(c == 'U') type = NUMBER_ALU; // TODO: this is not yet working: NUMBER_ALU should trump NUMBER_LED, but it looks like it does not in practice, at least for multidigit number
      else if(c == 'T') type = NUMBER_VTE; // TODO: same problem as NUMBER_ALU: does not actually use the priority order at all, and in addition this number should work next to # too and this code here doesn't know when the # belongs to a T
      // TODO: the above doesn't work with device extenders # for T and N (for U, i it works because those numbers are required to be next to the i/U)
      else if(antennamap[c]) type = NUMBER_ANTENNA;
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
        if(puredigitmap[c2]) {
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
          if(puredigitmap[c2]) {
            if(dir == 0 || dir == 3) {
              // make numbers always left-to-right or top-to-bottom
              value += mul * parseInt(c2);
              mul *= 10;
            } else {
              value *= 10;
              value += parseInt(c2);
            }
          } else {
            break;
          }
        }
        if(i > 0 && value != world[y][x].number) {
          world[y][x].number = -1;
          break; // multiple numbers with different values not supported
        }
        if(c != '$') world[y][x].number = value;
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
        if(puredigitmap[c2]) {
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
        if(puredigitmap[c2]) {
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

  // .numberv and .numberh to number
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      if(puredigitmap[world[y][x].metasymbol]) {
        world[y][x].number = Math.max(world[y][x].numberh, world[y][x].numberv);
      }
    }
  }

  // turn numbers into component extenders for some large devices where the numbers are made part of the surface area
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      if(world[y][x].numbertype == NUMBER_ALU && puredigitmap[world[y][x].metasymbol]) {
        world[y][x].circuitsymbol = '#';
      }
      if(world[y][x].numbertype == NUMBER_ICCALL && puredigitmap[world[y][x].metasymbol]) {
        world[y][x].circuitsymbol = '#';
      }
      if(world[y][x].numbertype == NUMBER_FIXED && puredigitmap[world[y][x].metasymbol]) {
        world[y][x].circuitsymbol = '#';
      }
    }
  }

  // wrap-around antennas
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      if(world[y][x].skipparsing) continue;
      if(world[y][x].numbertype == NUMBER_ANTENNA && world[y][x].metasymbol == '0') {
        for(var x2 = x + 1; x2 < line1[y]; x2++) {
          if(world[y][x2].skipparsing || !antennamap[world[y][x2].circuitsymbol]) break;
          world[y][x2].circuitextra = 1;
        }
        for(var x2 = x - 1; x2 >= line0[y]; x2--) {
          if(!antennamap[world[y][x2].circuitsymbol]) break;
          world[y][x2].circuitextra = 1;
        }
        for(var y2 = y + 1; y2 < h; y2++) {
          if(!antennamap[world[y2][x].circuitsymbol]) break;
          world[y2][x].circuitextra = 1;
        }
        for(var y2 = y - 1; y2 >= 0; y2--) {
          if(!antennamap[world[y2][x].circuitsymbol]) break;
          world[y2][x].circuitextra = 1;
        }
      }
    }
  }

  // '$' number extenders for bus and global wire
  // TODO: this implementation does not specify various corner cases, it is designed only to work with horizontal or vertical streaks like 4$$$$$,
  // and then only with core digits 0 to 9. Other behaviour and shapes should be treated as errors, or well-specified, instead of ignored like is done now.
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      var c = world[y][x].metasymbol;
      if(c == '$') {
        if(world[y][x].number != -1) continue; // already processed here
        var vertical = true;
        if(x > 0 && digitmap[world[y][x - 1].metasymbol]) vertical = false;
        if(x + 1 < line1[y] && digitmap[world[y][x + 1].metasymbol]) vertical = false;

        var number2 = 1;
        var range = 4096;

        // The parsing is done such that we go left to right or right to left depending on the bigger structure:
        // In case of 0$$$1$$$2$$$, we go left to right, while in case of $$$0$$$1$$$2 we go right to left.
        // This allows attaching multiple auto-numbered sections together in a reliable way, even when mirrored.
        // In case of 0$$$1$$$2$$$3 or $$$0$$$1$$$ this is ambiguous, that is currently ignored (should be treated as error)
        // Similar for the vertical case.
        // TODO: also have method for the opposite, splitting an auto numbered section with gaps in between but continue numbering

        if(vertical) {
          var ttb = true;
          var y1 = y + 1;
          while(y1 < h && digitmap[world[y1][x].metasymbol]) y1++;
          if(puredigitmap[world[y1 - 1][x].metasymbol]) ttb = false;
          var base = -range;
          var y0 = y;
          while(y0 > 0 && digitmap[world[y0 - 1][x].metasymbol]) y0--;
          if(ttb) {
            // top to bottom
            for(y2 = y0; y2 < y1; y2++) {
              if(y2 >= h) break;
              if(puredigitmap[world[y2][x].metasymbol]) {
                base = -(2 + world[y2][x].number) * range;
                y0 = y2; // new start for dist computation
              } else {  // $
                var dist = y2 - y0;
                world[y2][x].number = base - dist;
              }
            }
          } else {
            // bottom to top
            for(y2 = y1 - 1; y2 >= y0; y2--) {
              if(y2 < 0) break;
              if(puredigitmap[world[y2][x].metasymbol]) {
                base = -(2 + world[y2][x].number) * range;
                y1 = y2; // new start for dist computation
              } else {  // $
                var dist = y1 - y2;
                world[y2][x].number = base - dist;
              }
            }
          }
        } else {
          var ltr = true;
          var x1 = x + 1;
          while(x1 < line1[y] && digitmap[world[y][x1].metasymbol]) x1++;
          if(puredigitmap[world[y][x1 - 1].metasymbol]) ltr = false;
          var base = -range;
          var x0 = x;
          while(x0 > line0[y] && digitmap[world[y][x0 - 1].metasymbol]) x0--;
          if(ltr) {
            // left to right
            for(x = x0; x < x1; x++) {
              if(x >= line1[y]) break;
              if(puredigitmap[world[y][x].metasymbol]) {
                base = -(2 + world[y][x].number) * range;
                x0 = x; // new start for dist computation
              } else {  // $
                var dist = x - x0;
                world[y][x].number = base - dist;
              }
            }
          } else {
            // right to left
            for(x = x1 - 1; x >= x0; x--) {
              if(x < line0[y]) break;
              if(puredigitmap[world[y][x].metasymbol]) {
                base = -(2 + world[y][x].number) * range;
                x1 = x; // new start for dist computation
              } else {  // $
                var dist = x1 - x;
                world[y][x].number = base - dist;
              }
            }
            x = x1;
          }
        }
      }
    }
  }
  // spread the $ numbers, too, to neighbors (this is important for global wire g; buses = already work without doing this)
  // NOTE: any effects on anything other than bus = and global wire g is unspecified behavior. TODO: limit such effects
  for(var y = 0; y < h; y++) {
    for(var x = line0[y]; x < line1[y]; x++) {
      var c = world[y][x].metasymbol;
      if(c == '$' && world[y][x].number != -1) {
        for(var i = 0; i < 4; i++) {
          var x2 = x + ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
          var y2 = y + ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          if(world[y2][x2].number == -1) world[y2][x2].number = world[y][x].number;
        }
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
  // Note: more antenna related parsing happens in parseNumbers, which must have been called before this
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
            if(world[y][x].circuitextra == 1) world[y][xb].circuitextra = 1; // make it match, if it didn't already
            if(world[y][xb].circuitextra == 1) world[y][x].circuitextra = 1; // make it match, if it didn't already
            if(xb == x + 2 && world[y][x].circuitextra == 0) {
              world[y][x].circuitextra = world[y][xb].circuitextra = 2; // short hop, do not connect to anything in the aimed side
            }
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
            if(world[y][x].circuitextra == 1) world[yb][x].circuitextra = 1; // make it match, if it didn't already
            if(world[yb][x].circuitextra == 1) world[y][x].circuitextra = 1; // make it match, if it didn't already
            if(yb == y + 2 && world[y][x].circuitextra == 0) {
              world[y][x].circuitextra = world[yb][x].circuitextra = 2; // short hop, do not connect to anything in the aimed side
            }
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
// returns 'wc': "world cell", or null if none
// dir: 0=N, 1=E, 2=S, 3=W ; 4=NE, 5=SE, 6=SW, 7=NW
// also warps through antennas, including rules to make wrap-around circuits work
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
    if(wca.circuitextra == 1 && wca.antennax != -1) {
      x2 = wca.antennax + dx;
      y2 += dy;
      if(x2 < 0 || x2 >= w) return null;
      if(y2 < 0 || y2 >= h) return null;
    }
    else if(wca.circuitextra == 1 && wca.antennay != -1) {
      x2 += dx;
      y2 = wca.antennay + dy;
      if(x2 < 0 || x2 >= w) return null;
      if(y2 < 0 || y2 >= h) return null;
    }
  } else {
    var wcb = world[y][x2];
    var wcc = world[y2][x];
    var antennaa = wca.circuitextra == 1 && (wca.antennax != -1 || wca.antennay != -1);
    var antennab = wcb.circuitextra == 1 && (wcb.antennax != -1 || wcb.antennay != -1);
    var antennac = wcc.circuitextra == 1 && (wcc.antennax != -1 || wcc.antennay != -1);
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
        //  0n   n0
        // b(     )b'
        //
        // d(     )d'
        //  0u   u0
        //   c'  e'

        var wcd = world[wcc.antennay + (wcc.antennay > y2 ? -1 : 1)][x2];
        var wce = world[y2][wcb.antennax + (wcb.antennax > x2 ? -1 : 1)];
        if(!wcd.circuitextra == 1 || wcd.antennax != wcb.antennax) ok = false;
        if(!wce.circuitextra == 1 || wce.antennay != wcc.antennay) ok = false;
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
      cell.origsymbol = s;
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
      if(!comment && puredigitmap[cell.symbol]) {
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
          else if(x2 >= 0 && (lines[y][x2] == '9')) commentstyle = 9;
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
          else if(xe < w && lines[y][xe] == '9') commentstyle = 9;
          else {
            numberright = false;
          }

          if(commentstyle != 9) commentstyle = narrowmono ? 1 : (markdown ? 2 : 0);

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
        if(commentstyle == 9) {
          cell.commentstyle = 9;
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
        else if(number0 == '9') commentstyle = 9; // hidden source-code only comment
        else rem0 = false;

        var rem1 = true;
        if(number1 == '0' || number1 == '1' || number1 == '2') { if(commentstyle != 1) commentstyle = 2; }
        else if(number1 == '3' || number1 == '4' || number1 == '5') commentstyle = 1;
        else if(number1 == '6' || number1 == '7' || number1 == '8') ; // keep as-is, style >0 overrides this
        else if(number1 == '9') commentstyle = 9; // hidden source-code only comment
        else rem1 = false;

        if(commentstyle != 0) commentalign = 1;

        // disable numbers that affect comments so they don't affect LED colors etc...
        if(rem0 && y >= 1) {
          var cell2 = world[y - 1][x];
          if(!cell2.comment) { // do not disable if it's already marked comment, may contain content of a horizontal comment
            cell2.displaysymbol = ' ';
            cell2.circuitsymbol = ' ';
            cell2.metasymbol = '"';
            cell2.comment = true;
          }
        }
        if(rem1 && y2 + 1 < h) {
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
          if(commentstyle == 1 && !cell2.comment && cell2.symbol == ' ') { // not if it's already horizontal comment
            cell2.verticalcommentspace = true; // we sometimes want the spaces of vertical comments to render, for e.g. style 3. Without this flag, spaces get skipped for rendering as optimization.
            if(line0[y3] > x) line0[y3] = x;
            if(line1[y3] <= x) line1[y3] = x + 1;
          }
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

// This parses the groups of subs (for TYPE_IC, small i), all connected cells that are connected to a capital I
function parseICCalls() {

  logPerformance('parseICCalls begin');

  var used = initUsed2();
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
          // NOTE: the above with multiple i's is allowed as long as there are #'s in between, i's don't interact with each other directly (allow touching different IC's) but do interact (and hence form same IC) through #.
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
        for(var i = 0; i < 4; i++) { // 0=N, 1=E, 2=S, 3=W
          var x2 = x + ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
          var y2 = y + ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
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
  logPerformance('parseICCalls done');
  return true;
}

// IC templates: the capital I's
// must be called after parseICCalls
function parseICTemplates() {
  var sub_tree = {};  // numbers as index. Actually it's not a tree but a DAG, since multiple things can have the same child. But it's also a tree because each shared child will actually become its own copy of all the involved components of it later on.

  logPerformance('parseICTemplates begin');

  var used = initUsed2();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0]) continue;
      if(world[y0][x0].circuitsymbol != 'I') continue;

      var stack = [[x0, y0]];
      used[y0][x0] = true;

      var array = [];

      var subindex = -2; // >= -1 means actual sub
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
            console.log('parse error: multiple connected IC templates ' + subindex + ' ' + world[y][x].number);
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

        // neighbors
        for(var i = 0; i < 8; i++) { // 0=N, 1=E, 2=S, 3=W ; 4=NE, 5=SE, 6=SW, 7=NW
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
          console.log('error: multiple IC templates with same id: ' + subindex);
          error = true; //multiple sub with same number defined
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

  logPerformance('parseICTemplates done');
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
        // TODO: bug: this or code below is setting digits unrelated to buses to "NUMBER_BUS" (when they don't have another NUMBER_... type yet)
        if(digitmap[c]) world[y][x].numbertype = NUMBER_BUS;
        array.push(s);

        if(c == '=') {
          isjunction = true;
        }

        // neighbors
        for(var i = 0; i < 4; i++) { // 0=N, 1=E, 2=S, 3=W
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

      for(var i = 0; i < 4; i++) { // 0=N, 1=E, 2=S, 3=W
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


// An important thing about this function that is relied on by all users, is that it does NOT connect components to each other,
// it finds the cells that belong to a single component instead (which includes all its entire output wires which can be huge of course).
// todir: 0=N, 1=E, 2=S, 3=W ; 4=NE, 5=SE, 6=SW, 7=NW, from c to c2
function connected(c, c2, ce, ce2, todir, z, z2) {
  var a = antennamap[c];
  var a2 = antennamap[c2];
  if(a || a2) {
    if(a && ce == 1) return false; // wrap-around antenna does not participate
    if(a2 && ce2 == 1) return false; // wrap-around antenna does not participate
    if(a && a2) return false; // antennas do not interact with each other
    //short-hop antenna ignores what's sandwitched in between the (x), as well as inputs touching the sides so that it can hop over a gate or chip with inputs going to that chip
    if(a && ce == 2) {
      if(todir == 0 && c == 'u') return false;
      if(todir == 1 && c == '(') return false;
      if(todir == 2 && c == 'n') return false;
      if(todir == 3 && c == ')') return false;
      if((todir == 0 || todir == 2) && (c == '(' || c == ')') && inputmap[c2]) return false;
      if((todir == 1 || todir == 3) && (c == 'u' || c == 'n') && inputmap[c2]) return false;

    }
    if(a2 && ce2 == 2) {
      if(todir == 2 && c2 == 'u') return false;
      if(todir == 3 && c2 == '(') return false;
      if(todir == 0 && c2 == 'n') return false;
      if(todir == 1 && c2 == ')') return false;
      if((todir == 0 || todir == 2) && (c2 == '(' || c2 == ')') && inputmap[c]) return false;
      if((todir == 1 || todir == 3) && (c2 == 'u' || c2 == 'n') && inputmap[c]) return false;
    }
    // from now on, antenna acts as '.' wire
    if(a) c = '.';
    if(a2) c2 = '.';
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
  if(devicemap[c] && largeextendmap[c2]) return false;
  if(devicemap[c2] && largeextendmap[c]) return false;
  if(largeextendmap[c] && largeextendmap[c2]) return false;

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

  if(dinputmap[c]) {
    if(ce == 2) {
      if(todir < 4) return false;
      if((c == '^' || c == 'm') && !(todir == 5 && z == 0) && !(todir == 6 && z == 1)) return false;
      if((c == '>' || c == ']') && !(todir == 6 && z == 0) && !(todir == 7 && z == 1)) return false;
      if((c == 'v' || c == 'w') && !(todir == 7 && z == 0) && !(todir == 4 && z == 1)) return false;
      if((c == '<' || c == '[') && !(todir == 4 && z == 0) && !(todir == 5 && z == 1)) return false;
    } else {
      //if(c2 == 'g' || c2 == '=' || antennamap[c2]) return true;
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
  // large devices where outputs from the same cell can be different depending on direction use z cooridnate to distinguish them
  if(c == 'M' || c == '#M' || c == 'U' || c == '#U' || c == 'T' || c == '#T' || c == 'b' || c == 'B' || c == '#b') {
    if((todir == 0 || todir == 2) && z != 1) return false;
    if((todir == 1 || todir == 3) && z != 0) return false;
    if(todir > 3) return false;
  }

  // Things included here that return true:
  // valid wire connections, such as . with .
  // standard device cell like 'a' with device extender '#'
  // device cell like 'a' with wire
  // wire or device cell with the non-pointy side of an input (but pointy side of input is the connection to *other* component so returns false)
  // and any other connection that makes two cells belong to the same component
  return true;
}

function connected2(x, y, todir) {
  var n = getNeighbor(x, y, todir);
  if(!n) return false;
  var x2 = n.x;
  var y2 = n.y;

  var c2 = world[y2][x2].circuitsymbol;
  if(c2 == ' ') return false; // early return for efficiency given how common this is and how often this fucntion is called
  var c = world[y][x].circuitsymbol;
  var ce = world[y][x].circuitextra;
  var ce2 = world[y2][x2].circuitextra;
  var fromdir = (todir <= 3) ? ((todir + 2) & 3) : (4 + ((todir - 2) & 3));

  // 'connected2' and 'connected' are relatively expensive, given how often they are called,
  // the theoretical max z is 8, but avoid using higher than 2, avoiding unneeded connected() calls, if the cell doesn't use such high z
  var maxz = 2;
  if(c == '-' || c == '|' || c == '.') maxz = 1;
  if(c == 'X' || c == 'Y' || c == '*') maxz = 4;
  if(c == 'i' || c == '#i') maxz = ((todir > 3) ? 8 : 4);

  for(var z = 0; z < maxz; z++) {
    var z2 = getZ2(c, c2, ce, ce2, todir, z); // z coordinate for the neighbor
    if(connected(c, c2, ce, ce2, todir, z, z2) &&
       connected(c2, c, ce2, ce, fromdir, z2, z)) return true;
  }

  return false;
}

// coming from a c at z towards c2, what z2 of c2 is needed to connect them?
// todir: 0=N, 1=E, 2=S, 3=W ; 4=NE, 5=SE, 6=SW, 7=NW
function getZ2(c, c2, ce, ce2, todir, z) {
  // see comment at similar code in function connected
  var todir2 = todir;
  if(ce == 2) {
    if(c == '^' && (todir == 5 || todir == 6)) todir2 = 2;
    if(c == '>' && (todir == 6 || todir == 7)) todir2 = 3;
    if(c == 'v' && (todir == 4 || todir == 7)) todir2 = 0;
    if(c == '<' && (todir == 4 || todir == 5)) todir2 = 1;
  }

  if(c2 == '+' && (todir2 == 0 || todir2 == 2)) return 1;
  if(c2 == '*' || c2 == 'X' || c2 == 'Y') {
    // *'s meaning for z coordinate: z=0:-, z=1:|, z=2:/, z=3:\ (backspace)
    if(todir == 0 || todir == 2) return 1;
    else if(todir == 4 || todir == 6) return 3;
    else if(todir == 5 || todir == 7) return 2;
  }
  if(c2 == '%' && (todir2 == 1 || todir2 == 2)) return 1;
  if(c2 == '&' && (todir2 == 3 || todir2 == 2)) return 1;
  if(c2 == 'x' && (todir == 5 || todir == 7)) return 1;
  if(c2 == 'i' || c2 == '#i') {
    if(todir < 4) return ((todir + 2) & 3);
    else return 4 + ((todir + 2) & 3);
  }
  // large devices where outputs from the same cell can be different depending on direction use z cooridnate to distinguish them
  if(c2 == 'M' || c2 == '#M' || c2 == 'U' || c2 == '#U' || c2 == 'T' || c2 == '#T' || c2 == 'b' || c2 == 'B' || c2 == '#b') {
    if(todir == 0 || todir == 2) return 1;
  }
  if(dinputmap[c2] && ce2 == 2) {
    if(c2 == '^' || c2 == 'm') return todir == 4 ? 1 : 0;
    if(c2 == '>' || c2 == ']') return todir == 5 ? 1 : 0;
    if(c2 == 'v' || c2 == 'w') return todir == 6 ? 1 : 0;
    if(c2 == '<' || c2 == '[') return todir == 7 ? 1 : 0;
  }
  return 0;
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
  destroyAudioContext();
  jackclick = null;
  highlightedcomponent = null;
  muteAudioContext(1);
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
  if(antennamap[c] && world[y][x].circuitextra != 1) {
    var wca = world[y][x];
    if(wca.antennax != -1 || wca.antennay != -1) {
      var xb = x;
      var yb = y;
      if(wca.antennax != -1) xb = wca.antennax;
      if(wca.antennay != -1) yb = wca.antennay;
      if(!used[yb][xb][z]) {
        stack.push([xb, yb, z]);
        used[yb][xb][z] = true;
      }
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
  if(oldcomponent.error) {
    component.error = true;
    if(component.errormessage) component.errormessage += ' | ' + oldcomponent.errormessage;
    else component.errormessage = oldcomponent.errormessage;
  }

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


// returns if two cells connect for forming the area of a large device (such as flip-flops, T and L, but not simple devices like a, s and l) (excluding wires, but only the letters and # extenders)
// for reference, the involved symbols are: jkdtqQcCybBMUiTDJ#
// device symbols that are not large devices, such as aeoAEOsSpPrRl, are also involved, since this is also used for clustering non-large devices with extenders, or treating mix of large and non large device in a cluster as error
function largeDeviceConnected(c, c2) { // largeConnected connectedLarge isLargeConnected isLargeDeviceConnected
  if(!devicemaparea[c]) return false;
  if(!devicemaparea[c2]) return false;

  // device extender connects with anything, and could even connect to a non-large device, which must be returned.
  // This may result in the # being not part of a large device (but it must be checked anyway) or an error where
  // different large/small devices are connected to the same series of #'s (which must be handled outside of this function)
  // note how devicemaparea, not just largemaparea, is used here
  if(c == '#' && devicemaparea[c2]) return true;
  if(c2 == '#' && devicemaparea[c]) return true;

  // NOTE: for some large devices, digits are part of the surface area too, but
  // only if those digits touch its main letter (i for ICs, U for ALU)
  // however, these digits' circuitsymbol must already have been converted to '#'
  // by parseNumbers which must alreaady have been called before this.

  // exception of further below rules for the ROM bits which must be able to touch and form any bit pattern with b and B
  if((c == 'b' || c == 'B') && (c2 == 'b' || c2 == 'B')) return true;

  if(c == c2) return false; // two identical letters will not interact, that allows making separate large devices (as well as c's which can also be small device) still touch

  // exception of further below rules for c and C: clock gates never interact even when of the different types (large and small)
  if((c == 'c' || c == 'C') && (c2 == 'c' || c2 == 'C')) return false;

  // if they are from uniquely distinct device types, they do not interact. E.g. a N and a D are completely different devices so don't interact. But a j and a k would interact since they can be part of one device with mixed letters, the flip-flop. And y (the enable input) can be part of almost anything so always interacts.
  var c_unique = (c == 'N' || c == 'i' || c == 'T' || c == 'b' || c == 'B' || c == 'M' || c == 'U' || c == 'D' || c == 'f' || c == 'F');
  var c2_unique = (c2 == 'N' || c2 == 'i' || c2 == 'T' || c2 == 'b' || c2 == 'B' || c2 == 'M' || c2 == 'U' || c2 == 'D' || c2 == 'f' || c2 == 'F');
  if(c_unique && c2_unique) return false;
  // some mix of symbols, e.g. y connecting to a T, forming the enable input of the T
  // note that a few nonsensical combinations can happen here anyway, e.g. a j with a D, but for simplicity of rules (e.g. treat almost all symbols involved in flip-flops the same) those will connect, but should result in error (handled elsewhere)

  // a non-large device never interacts with other types
  if(devicemap[c] && devicemap[c2] && (!largedevicemap[c] || !largedevicemap[c2])) return false;

  return true;
}


// parse large devices with extensions #
// this handles large devices such as VTE, ROM, mux, ALU, ...
// this also handles standard gates (not large devices) that have been extended with # (for the clusterindex)
// TODO: the parsing differently whether numbers are included are not is too difficult here... ensure digits are already turned into # beforehand for both i and U.
function parseLargeDevices() {
  parseICCalls();

  var TYPE_SMALL = TYPE_NAND; // placeholder for any type of cell that isn't a large device, such as nand, nor, switch, LED, ...
  var TYPE_SPECIAL = TYPE_NOR; // placeholder for anything that is from the specialmap when it's not yet determined to be flip-flop; it doesn't matter what TYPE we assign to this as long as it's unique

  logPerformance('parseLargeDevices begin');
  var clusterindex = 0;
  used = initUsed2();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0]) continue;
      var c0 = world[y0][x0].circuitsymbol;

      //if(!largedevicestartmap[c0]) continue; // WORK IN PROGRESS
      if(!devicemap[c0]) continue;
      if(c0 == 'i') continue; // this one is currently handled in parseICCalls instead

      var stack = [[x0, y0]];
      used[y0][x0] = true;


      var error = false;
      var errormessage = 'unknown error';
      var array = [];

      while(stack.length) {
        var s = stack.pop();
        var x = s[0];
        var y = s[1];
        if(x < 0 || x >= w || y < 0 || y >= h) continue;
        var c = world[y][x].circuitsymbol;
        var ce = world[y][x].circuitextra;


        array.push(s);

        // neighbors
        for(var i = 0; i < 4; i++) { // 0=N, 1=E, 2=S, 3=W
          var x2 = x + ((i == 1) ? 1 : ((i == 3) ? -1 : 0));
          var y2 = y + ((i == 0) ? -1 : ((i == 2) ? 1 : 0));
          if(x2 < 0 || x2 >= w || y2 < 0 || y2 >= h) continue;
          if(used[y2][x2]) continue;

          var c2 = world[y2][x2].circuitsymbol;
          var ce2 = world[y2][x2].circuitextra;

          if(!largeDeviceConnected(c, c2)) continue;

          stack.push([x2, y2]);
          used[y2][x2] = true;
        }
      }

      var type = TYPE_NULL;
      var seen_fixed_number = false;
      for(var i = 0; i < array.length; i++) {
        var x = array[i][0];
        var y = array[i][1];
        var c = world[y][x].circuitsymbol;
        if(c == '#') continue;

        var type2 = TYPE_NULL;
        if(specialmap[c]) type2 = TYPE_SPECIAL;
        else if(ffmap[c]) type2 = TYPE_FLIPFLOP;
        else if(rommap[c]) type2 = TYPE_ROM;
        else if(c == 'T') type2 = TYPE_VTE;
        else if(c == 'M') type2 = TYPE_MUX;
        else if(c == 'U') type2 = TYPE_ALU;
        else if(c == 'D') type2 = TYPE_DOTMATRIX;
        else if(c == 'N') type2 = TYPE_MUSIC_NOTE;
        else if(c == 'f') {
          type2 = TYPE_CONSTANT_OFF;
          if(world[y][x].numbertype == NUMBER_FIXED && world[y][x].number >= 0) seen_fixed_number = true;
        }
        else if(c == 'F') {
          type2 = TYPE_CONSTANT_ON;
          if(world[y][x].numbertype == NUMBER_FIXED && world[y][x].number >= 0) seen_fixed_number = true;
        }
        else if(devicemap[c]) type2 = TYPE_SMALL;

        if(type2 != TYPE_NULL && type2 != TYPE_SPECIAL && type != TYPE_NULL && type != TYPE_SPECIAL && type != type2) {
          error = true;  // error: the extension # touches another device type
          errormessage = 'mixed component cell types in large component';
        }
        //if(type2 != TYPE_NULL && type2 != TYPE_SMALL) type = type2;
        if(type2 != TYPE_NULL) {
          if(type == TYPE_NULL || type == TYPE_SPECIAL) type = type2;
        }
      }

      if(type == TYPE_CONSTANT_OFF || type == TYPE_CONSTANT_ON) {
        if(seen_fixed_number) type = TYPE_FIXED;
        else type = TYPE_SMALL;
      }

      // in that case it's a flipflop instead
      if(type == TYPE_SPECIAL) type = TYPE_FLIPFLOP;

      if(type != TYPE_NULL && type != TYPE_SPECIAL && type != TYPE_SMALL) {
        for(var i = 0; i < array.length; i++) {
          var x = array[i][0];
          var y = array[i][1];
          if(type == TYPE_NULL) {
            // nothing to do
          } else {
            if(world[y][x].circuitsymbol == '#') {
              if(type == TYPE_FLIPFLOP) world[y][x].circuitsymbol = '#c';
              if(type == TYPE_MUX) world[y][x].circuitsymbol = '#M';
              if(type == TYPE_ALU) world[y][x].circuitsymbol = '#U';
              if(type == TYPE_VTE) world[y][x].circuitsymbol = '#T';
              if(type == TYPE_ROM) world[y][x].circuitsymbol = '#b';
              if(type == TYPE_FIXED) world[y][x].circuitsymbol = '#f';
              // Don't do this for D and N, it splits up its one component into one component per cell, unlike alu, rom, ..., dotmatrix and musicnote aren't designed for that (and don't need it due to not having outputs).
              //if(type == TYPE_DOTMATRIX) world[y][x].circuitsymbol = '#D';
              //if(type == TYPE_MUSIC_NOTE) world[y][x].circuitsymbol = '#N';
            } else {
              world[y][x].largedevicearray = array;
              world[y][x].largedevicetype = type;
            }
            if(type == TYPE_VTE) world[y][x].isvte = true;
          }
          if(error) {
            world[y][x].error = true;
            world[y][x].errormessage = errormessage;
          }
        }
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

  logPerformance('parseLargeDevices done');

  if(!parseICTemplates()) return false;

  return true;
}

// parse the buses (=)
function parseBuses() {
  logPerformance('parseBuses begin');
  used = initUsed3();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0][0]) continue;

      // don't do all this parsing if it's not a bus in the first place
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
        for(var i = 0; i < 8; i++) { // 0=N, 1=E, 2=S, 3=W ; 4=NE, 5=SE, 6=SW, 7=NW
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
              if(c == '=' && number != -1) continue;
              if(c2 == '=' && number2 != -1) continue;
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
          if(number != -1) {
            if(!bus.connections[number]) bus.connections[number] = [];
            bus.connections[number].push([x, y, z]);
          }
        }
      }
    }
  }
  logPerformance('parseBuses done');
  return true;
}



// create the components after the cells have been parsed (note: is not really parsing anymore, but a post-processing step of it)
function parseComponents() {
  var used;
  logPerformance('parseComponents start');

  globalLooseWireInstanceI = null;
  globalLooseWireInstanceE = null;


  // PASS 1: parse all components
  logPerformance('parseComponents pass 1 begin');
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

          if(world[y][x].error) {
            error = true;
            if(world[y][x].errormessage) errormessage = world[y][x].errormessage;
          }

          array.push(s);

          if(devicemap[c] || largeextendmap[c]) {
            var type2 = TYPE_NULL;
            if(world[y][x].largedevicetype != TYPE_NULL) {
              type2 = world[y][x].largedevicetype;
            } else {
              if(c == 's') type2 = TYPE_SWITCH_OFF;
              else if(c == 'S') type2 = TYPE_SWITCH_ON;
              else if(c == 'l') type2 = TYPE_LED;
              else if(c == 'p') type2 = TYPE_PUSHBUTTON_OFF;
              else if(c == 'P') type2 = TYPE_PUSHBUTTON_ON;
              else if(c == 'r') type2 = TYPE_TIMER_OFF;
              else if(c == 'R') type2 = TYPE_TIMER_ON;
              else if(c == 'a') type2 = TYPE_AND;
              else if(c == 'A') type2 = TYPE_NAND;
              else if(c == 'o') type2 = TYPE_OR;
              else if(c == 'O') type2 = TYPE_NOR;
              else if(c == 'e') type2 = TYPE_XOR;
              else if(c == 'E') type2 = TYPE_XNOR;
              else if(c == 'h') type2 = TYPE_ONEHOT;
              else if(c == 'H') type2 = TYPE_NONEHOT;
              else if(c == 'f') type2 = (world[y][x].numbertype == NUMBER_FIXED && world[y][x].number >= 0) ? TYPE_FIXED : TYPE_CONSTANT_OFF;
              else if(c == 'F') type2 = (world[y][x].numbertype == NUMBER_FIXED && world[y][x].number >= 0) ? TYPE_FIXED : TYPE_CONSTANT_ON;
              else if(c == '#f') type2 = TYPE_FIXED;
              else if(c == 'b' || c == 'B' || c == '#b') type2 = TYPE_ROM;
              else if(c == 'i' || c == '#i') type2 = TYPE_IC;
              else if(c == 'M' || c == '#M') type2 = TYPE_MUX;
              else if(c == 'U' || c == '#U') type2 = TYPE_ALU;
              else if(c == 'T' || c == '#T') type2 = TYPE_VTE;
              else if(c == 'D' || c == '#D') type2 = TYPE_DOTMATRIX;
              else if(c == 'z') type2 = TYPE_TRISTATE;
              else if(c == 'Z') type2 = TYPE_TRISTATE_INV;
              else if(c == '?') type2 = TYPE_RANDOM;
              else if(c == 'N' || c == '#N') type2 = TYPE_MUSIC_NOTE;
              else if(c == 'J') type2 = TYPE_JACK;
              else if(c == 'K') type2 = TYPE_KINETIC;
              else if(ffmap[c] || c == '#c') type2 = TYPE_FLIPFLOP;
            }

            if(type != TYPE_NULL && type != TYPE_UNKNOWN_DEVICE) {
              var ok = false;
              // allow input that touches same special shaped chip with multiple sides
              // (TODO: also allow this for other special shaped devices)
              if(world[y][x].callsub != null && world[y][x].callsub == corecell.callsub) ok = true;
              if(type == TYPE_TRISTATE && c == 'z') ok = true;
              if(type == TYPE_TRISTATE_INV && c == 'Z') ok = true;
              if(corecell && corecell.clusterindex >= 0 && corecell.clusterindex == world[y][x].clusterindex && type == type2) {
                // The case of a non-large device, where reusing the same letter within a group of # is ok
                // e.g. a#a is a single and gate
                // but: aa would form two and gates, also ok, but no # will not connect them into one
                // but: a#o would be ambiguous and an error (conflict whether it's AND or OR)
                // why reusing same letter like that is allowed: to allow to make multiple 3-wide (and wider) and gates that touch each other: a#aa#a are two AND gates of 3 characters wide each.
                // NOTE: large devices like T, N, ... are treated separately elsewhere
                ok = true;
              }
              // allowed to mix, if e.g. f with number and f without number are part of same group with #, they're all fixed.
              if(type == TYPE_FIXED && (type2 == TYPE_CONSTANT_ON || type2 == TYPE_CONSTANT_OFF)) ok = true;
              if(type2 == TYPE_FIXED && (type == TYPE_CONSTANT_ON || type == TYPE_CONSTANT_OFF)) ok = true;
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
          if(type == TYPE_NULL && largeextendmap[c]) type = TYPE_UNKNOWN_DEVICE;
          if(world[y][x].number != -1 && devicemaparea[c]) {
            // TODO: check if the above if really needs devicemaparea instead of just devicemap,
            // because numbers currently don't interact with # anyway (for e.g. chip, led, ...)
            if(number != -1 && world[y][x].number != number) {
              errormessage = 'multiple numbers to same component not supported';
              console.log(errormessage);
              error = true;
            }
            number = world[y][x].number;
            // TODO: handle conflicting number types. Not necessarily error, but ignore/override numbertypes not relevant for this device
            if(numbertype == NUMBER_NONE) numbertype = world[y][x].numbertype;
          }
          //if(world[y][x].defsubindex >= -1) defsubindex = world[y][x].defsubindex;
          if(world[y][x].callsubindex >= -1) {
            callsubindex = world[y][x].callsubindex;
          }

          // neighbors
          for(var i = 0; i < 8; i++) { // 0=N, 1=E, 2=S, 3=W ; 4=NE, 5=SE, 6=SW, 7=NW
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
          if(type == TYPE_JACK) {
            // the array size here defines how many patch wires per jack are maximum supported
            component.partner = [];
            component.partnerdiv = [];
            for(var i = 0; i < maxjacks; i++) component.partner[i] = component.partnerdiv[i] = null;
          }
          if(type == TYPE_KINETIC) {
            var number = 0;
            for(var i = 0; i < array.length; i++) {
              var x = array[i][0];
              var y = array[i][1];
              var c = world[y][x].circuitsymbol;
              // do not count numbers of wires: the wire could be touching a larger number e.g. formed by the grouping of various small numbers next to each other and then give that much too large invalid value to this component
              if(c == 'K') number = Math.max(number, world[y][x].number);
            }
            component.number = number;
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

  // PASS 2, now to resolve large devices
  // these are handled in a separate pass, because for some types, a single large device can be made out of multiple sub-devices, e.g. ROM, FLIP-FLOP, ...
  logPerformance('parseComponents pass 2 begin');
  used = initUsed3();
  for(var y0 = 0; y0 < h; y0++) {
    for(var x0 = line0[y0]; x0 < line1[y0]; x0++) {
      if(used[y0][x0][0]) continue;
      var c0 = world[y0][x0].circuitsymbol;
      //if(c0 == '#') continue; // this is so that we will NOT start parsing with a symbol of which we do not know what component it is. Start with b or B for example so we know it's ROM and correctly handle # extending it (otherwise bug if top row is #)
      if(c0 == '#' || largeextendmap[c0]) continue;

      var stack = [[x0, y0, 0]];
      used[y0][x0][0] = true;
      var error = false;
      var array = [];

      var type = TYPE_NULL;

      var component = world[y0][x0].components[0] ? world[y0][x0].components[0] : world[y0][x0].components[1];

      if(ffmap[c0] && component && component.type == TYPE_FLIPFLOP) type = TYPE_FLIPFLOP;
      else if(rommap[c0]) type = TYPE_ROM; // type not checked, since some are set to TYPE_NULL, and even component may be null
      else if(c0 == 'M' && component && component.type == TYPE_MUX) type = TYPE_MUX;
      else if(c0 == 'U' && component && component.type == TYPE_ALU) type = TYPE_ALU;
      else if(c0 == 'T' && component && component.type == TYPE_VTE) type = TYPE_VTE;
      else if(c0 == 'D' && component && component.type == TYPE_DOTMATRIX) type = TYPE_DOTMATRIX;
      else if(c0 == 'N' && component && component.type == TYPE_MUSIC_NOTE) type = TYPE_MUSIC_NOTE;
      else if((c0 == 'f' || c0 == 'F') && component && component.type == TYPE_FIXED) type = TYPE_FIXED;
      else continue;

      array = world[y0][x0].largedevicearray;
      if(!array) {
        console.log('suspicious: no largedevicearray for a large device @' + x0 + ',' + y0);
        continue;
      }

      for(var i = 0; i < array.length; i++) {
        var x = array[i][0];
        var y = array[i][1];
        var z = array[i][2];
        used[y][x][z] = true;
      }

      if(type == TYPE_FIXED) {
        var o = new Fixed();
        if(!o.init1(array)) {
          console.log('fixed value error @' + array[0][0] + ' ' + array[0][1]);
          o.error = true;
        }
      }

      if(type == TYPE_ROM) {
        var romobject = new ROM();
        if(!romobject.init1(array)) {
          console.log('rom error @' + array[0][0] + ' ' + array[0][1]);
          romobject.error = true;
        }
      }

      if(type == TYPE_MUX) {
        var muxobject = new Mux();
        if(!muxobject.init1(array)) {
          console.log('mux error @' + array[0][0] + ' ' + array[0][1]);
          muxobject.error = true;
        }
      }

      if(type == TYPE_ALU) {
        var aluobject = new Alu();
        if(!aluobject.init1(array)) {
          console.log('alu error @' + array[0][0] + ' ' + array[0][1]);
          aluobject.error = true;
        }
      }

      if(type == TYPE_VTE) {
        var vteobject = new VTE();
        if(!vteobject.init1(array)) {
          console.log('vte error @' + array[0][0] + ' ' + array[0][1]);
          vteobject.error = true;
        }
      }

      if(type == TYPE_DOTMATRIX) {
        var dot = new DotMatrix();
        if(!dot.init1(array, component)) {
          console.log('dotmatrix error @' + array[0][0] + ' ' + array[0][1]);
          dot.error = true;
        }
      }

      if(type == TYPE_MUSIC_NOTE) {
        var musicnote = new MusicNote();
        if(!musicnote.init1(array, component)) {
          console.log('music note error @' + array[0][0] + ' ' + array[0][1]);
          musicnote.error = true;
        }
      }

      if(type == TYPE_FLIPFLOP) {
        var fftype = getFFType(array);
        if(fftype[0] == TYPE_FLIPFLOP) {
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
          // TODO: can we get rid of this (and of mergeComponents) and know type of the FF from its largedevicearray?
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
            corecomp.type = fftype[0];
            corecomp.value = fftype[1];
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
  logPerformance('parseComponents pass 3 begin');
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
        if(!component2) component2 = cell2.components[1];
        if(!component2) continue;
        if(component2.parent) component2 = component2.parent;
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
        if(component.parent) component = component.parent;
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
        if(component.parent) component = component.parent;
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
    if(component.fixed) {
      if(!component.fixed.error && !component.fixed.init2()) {
        component.fixed.error = true;
        console.log('fixed value error with component ' + i);
      }
      if(component.fixed.error) {
        component.markError(component.fixed.errormessage);
      }
    }
    if(component.rom) {
      if(!component.rom.error && !component.rom.init2()) {
        component.rom.error = true;
        console.log('rom error with component ' + i);
      }
      if(component.rom.error) {
        component.markError(component.rom.errormessage);
      }
    }
    if(component.mux) {
      if(!component.mux.error && !component.mux.init2()) {
        component.mux.error = true;
        console.log('mux error with component ' + i);
      }
      if(component.mux.error) {
        component.markError(component.mux.errormessage);
      }
    }
    if(component.alu) {
      if(!component.alu.error && !component.alu.init2()) {
        component.alu.error = true;
        console.log('alu error with component ' + i);
      }
      if(component.alu.error) {
        component.markError(component.alu.errormessage);
      }
    }
    if(component.vte) {
      if(!component.vte.error && !component.vte.init2()) component.vte.error = true;
      if(component.vte.error) {
        component.markError(component.vte.errormessage);
      }
    }
    if(component.dotmatrix) {
      if(!component.dotmatrix.error && !component.dotmatrix.init2()) component.dotmatrix.error = true;
      if(component.dotmatrix.error) {
        component.markError(component.dotmatrix.errormessage);
      }
    }
    if(component.musicnote) {
      if(!component.musicnote.error && !component.musicnote.init2()) component.musicnote.error = true;
      if(component.musicnote.error) {
        component.markError(component.musicnote.errormessage);
      }
    }
    if(component.type == TYPE_TRISTATE || component.type == TYPE_TRISTATE_INV) {
      component.tristate = new TriState();
      component.tristate.init(component);
    }
  }

  for(var i = 0; i < components.length; i++) {
    var component = components[i];
    if(component.parent && component.parent.rom && component.parent.rom.error) {
      component.markError(component.parent.rom.errormessage);
    }
    if(component.type == TYPE_ROM && (!component.parent && !component.rom)) {
      component.markError('is rom but has no parent');
    }
    if(component.parent && component.parent.mux && component.parent.mux.error) {
      component.markError(component.parent.mux.errormessage);
    }
    if(component.type == TYPE_MUX && (!component.parent && !component.mux)) {
      component.markError('is mux but has no parent');
    }
    if(component.parent && component.parent.alu && component.parent.alu.error) {
      component.markError(component.parent.alu.errormessage);
    }
    if(component.type == TYPE_ALU && (!component.parent && !component.alu)) {
      component.markError('is ALU but has no parent');
    }
    if(component.parent && component.parent.vte && component.parent.vte.error) {
      component.markError(component.parent.vte.errormessage);
    }
    if(component.type == TYPE_VTE && (!component.parent && !component.vte)) {
      component.markError('is vte but has no parent');
    }
    if(component.type == TYPE_DOTMATRIX && component.dotmatrix && component.dotmatrix.error) {
      component.markError(component.dotmatrix.errormessage);
    }
    if(component.type == TYPE_MUSIC_NOTE && component.musicnote && component.musicnote.error) {
      component.markError(component.musicnote.errormessage);
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
      if(callsubs[i].parent) callsubs[i].parent.error = error;
    }
  }

  for(var i = 0; i < callsubs.length; i++) {
    callsubs[i].init2(null);
  }

  // Bypass IC-passthroughs when possible (when they have 1 input, which is normally always the case):
  // this will save 3 ticks per IC (1 on input and 2 on output side due to the way they are parsed
  // and constructed), thereby removing all delays and making the IC equivalent to having the original
  // circuit in its place.
  // TODO: prevent the creation of those TYPE_IC_PASSTHROUGH components in the first place, connect it up correctly in the CallSub and DefSub functions from the start
  var has_skipped_passthrough = false;
  for(var i = 0; i < components.length; i++) {
    var c = components[i];
    var inputs = c.inputs;
    for(var j = 0; j < inputs.length; j++) {
      var p = c.inputs[j];
      while(p && p.type == TYPE_IC_PASSTHROUGH && p.inputs.length == 1) {
        c.inputs[j] = p.inputs[0];
        if(p.inputs_negated[0]) c.inputs_negated[j] = !c.inputs_negated[j];
        p.passthrough_skipped = true;
        has_skipped_passthrough = true;
        // if p's input itself was also a passthrough, then keep going...
        // TODO: also update all intermediate ones already so higher up loop will be more efficient in some potential pathalogical cases
        p = p.inputs[0];
      }
    }
  }
  // This is done for graphical reasons: the cells have references to the components, e.g. long wires that are output
  // from a chip will have reference to the passthrough. But to also have the wires light up faster in electron mode,
  // let them too point to the input-component that replaces the passthrough instead.
  if(has_skipped_passthrough) {
    for(var y = 0; y < h; y++) {
      for(var x = line0[y]; x < line1[y]; x++) {
        var c = world[y][x];
        for(var j = 0; j < c.components.length; j++) {
          var p = c.components[j];
          // not done for corecell: the corecell is the IC cell itself, that one should stay of type passthrough or it'll get the wrong rendered look
          if(p && p.passthrough_skipped && (x != p.corecell.x || y != p.corecell.y)) {
            var p2 = p.inputs[0];
            c.components[j] = p2;
          }
        }
      }
    }
  }
  // In theory, we could remove the inputs of the skippes passthroughs now since nothing depends on them anymore. However, as seen above, corecells
  // still do so if their graphics would dpened on their state, they should still be updated. Also it's uncertain if maybe possibly some other form
  // of references to them still exists. So, the code below is commented out and not done.
  /*for(var i = 0; i < components.length; i++) {
    var c = components[i];
    if(c.passthrough_skipped) c.inputs = [];
  }*/

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
  // I think that is because I'm using only components.inputs here and maybe I also have to look at component.parent
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

  computeComponentsOrder();

  logPerformance('parseComponents done');

  return true; // success
}

function computeComponentsOrder() {
  //components_order = components; return;

  // calculate update order for UPDATE_ALGORITHM=1 to avoid reaching stack limit by using recursion for UPDATE_ALGORITHM = 1 (JS only has a max stack depth of 5000 or so, this can get reached with a 32-bit division circuit)
  // not using toposort here, because we still want to do something meaningful in case of cycles
  components_order = [];
  for(var i = 0; i < components.length; i++) {
    components[i].updated = false;
    /*
    added due to the way parent is added, and also because otherwise components_order will be larger than components in the following circuit where a gets parsed before s:
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
        if(t.parent && !t.parent.added) {
          components_order.push(t.parent);
          t.parent.added = true;
          t.parent.updated = true;
        }
        components_order.push(t);
        stack.pop();
        continue;
      }
      t.updated = true;

      var deps = [];
      if(t.parent && !t.parent.updated) {
        var m = t.parent;
        deps.push(m);
        for(var j = 0; j < m.inputs.length; j++) {
          if(!m.inputs[j].updated) deps.push(m.inputs[j]);
        }
      }
      for(var j = 0; j < t.inputs.length; j++) {
        if(!t.inputs[j].updated) deps.push(t.inputs[j]);
      }
      if(t.partner) {
        // for patch panel jacks, which can have arbitrary user order
        var jacks = getalljacks(t);
        for(var j = 0; j < jacks.length; j++) {
          if(!jacks[j].updated) deps.push(jacks[j]);
        }
      }
      // order inverted here because our stack emulates the function stack, but the order in which the inputs is called should be like a queue, inverting the order does that
      for(var j = deps.length - 1; j >= 0; j--) {
        stack.push(deps[j]);
      }
    }
  }
}

// initial render
function initDivs() {
  worldDiv.style.display = 'none'; // making it invisible while rendering makes it faster in some browsers
  worldDiv.innerText = '';
  worldDiv2.innerText = '';

  getNewRenderer().globalInit();

  if(graphics_mode_actual == 2) {
    for(var y = 0; y < h; y++) {
      if(!world[y]) continue;
      for(var x = 0; x < w; x++) {
        if(!world[y][x]) continue;
        world[y][x].initDiv(x, y);
      }
    }
  } else {
    for(var y = 0; y < h; y++) {
      for(var x = line0[y]; x < line1[y]; x++) {
        world[y][x].initDiv(x, y);
      }
    }
  }
  // The purpose of this div is that you can still scroll a bit lower,
  // to cover the entire world area basically
  makeDiv(w * tw, h * th, 1, 1, worldDiv);
  worldDiv.style.display = 'block';
  renderingMessageDiv.innerText = '';

  redrawjacks();
  redrawkinetic();
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

var documentTitle = 'Circuit Name';

function setDocumentTitle(text) {
  document.title = 'LogicEmu: ' + text;
  circuitNameEl.innerText = /*'Current Circuit: ' +*/ text;
  documentTitle = text;
}

var firstParse = true; // to keep scrolled down if you were scrolled down before refresh

//opt_fragmentAction: 0=use id if possible else clear, 1=set from code if possible else clear, 2=keep as-is (e.g. if it's already #code). Default: 0
//opt_paused: if true, is paused at start
function parseText(text, opt_title, opt_registeredCircuit, opt_fragmentAction, opt_paused) {
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
    parseText2(text, opt_title, opt_registeredCircuit, opt_fragmentAction, opt_paused);
    return;
  }
  renderingMessageDiv.innerText = 'rendering';
  // The timeout is so that the 'rendering' text becomes visible first before
  // it starts creating all the divs and canvases.
  // The timeout seems to not always work anyway, so first another trick that
  // may force a redraw
  var dummy = worldDiv.offsetHeight;
  worldDiv.style.display = 'none';
  window.setTimeout(bind(parseText2, text, opt_title, opt_registeredCircuit, opt_fragmentAction, opt_paused), 0);
}


// to do in a stage before setTocHTML, since it edits the source text itself
function makeTocRoom(text, tocPos, tocType, tocDepth, codelen, outCoords) {
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
      var depth = 1;
      if(text[pos + 2] == '#' && text[pos + 3] == ' ') depth = 2;
      if(text[pos + 2] == '#' && text[pos + 3] == '#' && text[pos + 4] == ' ') depth = 3;
      if(tocDepth != 0 && depth > tocDepth) continue;
      numchapters++;
    }
    numLines = numchapters + 1;
  }

  var newlines = '';

  if(tocType >= 1 && tocType <= 3) {
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

var graphics_mode_debug_override = -1;

function parseText2(text, opt_title, opt_registeredCircuit, opt_fragmentAction, opt_paused) {
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
    var tocDepth = 0;
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
    if(keyword == 'toc') { tocType = 0; tocDepth = 0; } // infinite toc depth
    else if(keyword == 'toc1') { tocType = 0; tocDepth = 1; }
    else if(keyword == 'toc2') { tocType = 0; tocDepth = 2; }
    else if(keyword == 'toc3') { tocType = 0; tocDepth = 3; }
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
      text = makeTocRoom(text, tocPos, tocType, tocDepth, codelen, coords);
      coords.push(tocType);
      coords.push(linkname);
      coords.push(tocDepth);
      tocs.push(coords);
    }
  }

  resetForParse();
  startLogPerformance();

  logPerformance('parseCells begin');
  if(!parseCells(text)) return false;
  logPerformance('parseCells done');

  for(var i = 0; i < tocs.length; i++) {
    var tocX = tocs[i][0];
    var tocY = tocs[i][1];
    var tocType = tocs[i][2];
    var tocLink = tocs[i][3];
    var tocDepth = tocs[i][4];
    world[tocY][tocX].symbol = 'toc';
    world[tocY][tocX].circuitsymbol = 'toc';
    world[tocY][tocX].displaysymbol = 'toc';
    world[tocY][tocX].metasymbol = 'toc';
    world[tocY][tocX].skipparsing = false;
    world[tocY][tocX].circuitextra = tocType;
    world[tocY][tocX].tocdepth = tocDepth;
    world[tocY][tocX].toclink = tocLink;
    line0[tocY] = 0;
    line1[tocY] = 1;
  }

  logPerformance('parseNumbers begin');
  parseNumbers();
  logPerformance('parseNumbers done');

  logPerformance('parseAntennas begin');
  if(!parseAntennas()) return false;
  logPerformance('parseAntennas done');

  logPerformance('parseExtra begin');
  if(!parseExtra()) return false;
  logPerformance('parseExtra done');

  logPerformance('parseBackplanes begin');
  convertBackplaneNumbers();
  parseBackplanes();
  logPerformance('parseBackplanes done');

  logPerformance('convertJunctionNumbers begin');
  convertJunctionNumbers();
  logPerformance('convertJunctionNumbers done');

  if(!parseBuses()) return false;
  if(!parseLargeDevices()) return false;
  if(!parseComponents()) return false;


  graphics_mode_actual = graphics_mode;
  /*if(graphics_mode && countSlowGraphicalDivs() > 2000) {
    graphics_mode_actual = 0;
  }*/
  var graphicsindex = origtext.indexOf('RENDER:');
  if(graphicsindex >= 0) {
    if(util.textHasAt(origtext, graphicsindex + 7, 'graphical')) {
      graphics_mode_actual = 0;
    }
    else if(util.textHasAt(origtext, graphicsindex + 7, 'text')) {
      graphics_mode_actual = 1;
    }
    else if(util.textHasAt(origtext, graphicsindex + 7, 'source')) {
      graphics_mode_actual = 2;
    }
  }
  if(graphics_mode_debug_override >= 0) graphics_mode_actual = graphics_mode_debug_override;
  //graphics_mode_actual = 2;
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
  if(docwidth2 > docheight2 && fity > fitx * 0.75 && h > 3 * w) docwidth2 = docheight2;
  // And even if it's not an article but a circuit that's more wide than high,
  // but part is invisible below the bottom, still make it fit anyway (otherwide e.g. the game of life circuit looks very badly zoomed in on widescreen)
  else if(docwidth2 > docheight2 && Math.floor(docwidth2 / (fitx + 2)) * h > docheight2) docwidth2 = docheight2;
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
  if(opt_paused) {
    update();
  } else {
    unpause(); // this also calls update
  }
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
  muteAudioContext(2);
}

function unpause() {
  autopaused = false;
  paused = false;
  highlightedcomponent = null;
  jackclick = null;

  if(USEAUTOPAUSE && !autopauseinterval) {
    setAutoPauseInterval();
  }
  updatePauseButtonText();
  updateTimeButtonBorders();
  unmuteAudioContext(2);
  update(); // unpause must call update, becuase update starts the timing look again (especially relevant if there are timers)
}

function isPaused() {
  return paused;
}

var changeDropdownElements = [];

// opt_value can mean on/off, or a number, depending on the type
function registerChangeDropdownElement(type, opt_name, opt_value) {
  changeDropdownElements.push([type, opt_name || typesymbols[type], opt_value == undefined ? -1 : opt_value]);
}

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
registerChangeDropdownElement(TYPE_COUNTER, 'c', 0);
registerChangeDropdownElement(TYPE_COUNTER, 'C', 1);
registerChangeDropdownElement(TYPE_DELAY);
registerChangeDropdownElement(TYPE_MUSIC_NOTE);
registerChangeDropdownElement(TYPE_RANDOM);
registerChangeDropdownElement(TYPE_JACK);
registerChangeDropdownElement(TYPE_KINETIC, 'gear', 0);
registerChangeDropdownElement(TYPE_KINETIC, 'fan', 1);
registerChangeDropdownElement(TYPE_KINETIC, 'TNT', 8);
registerChangeDropdownElement(TYPE_KINETIC, 'EMP', 13);
registerChangeDropdownElement(TYPE_KINETIC, 'JAM', 18);
registerChangeDropdownElement('repair', 'repair');
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
    text += transform(origtext, i) + '\n\n';
  }
  parseText(text, 'transformed circuit', undefined, 1);
}

function printTransform(text, op) {
  console.log(transform(text, op));
}

var debugHook = null;

