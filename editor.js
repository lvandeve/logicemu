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
How the cursor and selection region should work:

SHORT SUMMARY:

xb,yb-xe,ye: main active sel coords (xe,ye=blinking cursor). xe may be < xb and ye may be < yb. ye inclusive. xe inclusive if overwrite mode.
xi,yi-xa,ya: minimum and maximum of xb,yb-xe,ye
xr0,yr0-xr1,yr1: rectangular region, always exclusive
xm0,ym0-xm1,ym1: classic multiline region, always exclusive, first line is at ym0 from xm0 to end, last line is at ym1-1 from 0 to xm1-1.
x0,y0-x1,y1: don't exist here, use locally derived from whichever of the above you want (prefer exclusive end coordinates for this naming)


LONGER EXPLANATION:

xb,yb - xe,ye describes the user selection (xe exclusive in insert mode, inclusive in overwrite mode. ye inclusive)
--> note that xe,ye usually represents the actual active cursor position
xi,yi - xa,ya represent min and max of those values respectively

The region:
in the case of rectangular mode:
-in insert mode, xi,yi - xa,ya is the rectangular area, excluding x1 and including y1
-in overwrite mode, xi,yi - xa,ya is the rectangular area, including x1 and y1 (so one bigger horizontally)
in the case of classic multiline mode:
-in insert mode, selection spans (yi-ya+1) lines (ya is inclusive)
--the line belonging to yb goes from xb to end of line
--the line belonging to ye goes from begin of line to xe
--the lines in between go from begin of line to end of line
-in overwrite mode, same except on the last line, xe is included instead of excluded

The cursor:
-in insert mode, a blinking vertical line located on line ye in front of character xe
-in overwrite mode, a blinking horizontal line located on line ye under character xe

ye is allowed to be smaller than yb and xe is allowed to be smaller than xb. For some purposes, you want to use xi,yi and xa,ya instead


In insert mode, the cursor can have a thickness of 0.

xr0,yr0 - xr1,yr1 represents region for rectangle with exclusive coordinates, and with taking overwrite mode's switch between inclusive and exclusive into account
-xr0 and yr0 are the same as respectively xi and yi
-yr1 is ya + 1 (so exclusive instead of inclusive)
-xr1 is xa in insert mode, or xa + 1 in overwrite mode (so always exclusive)
--> inclusive top left and exclusive bottom right respectively (so the relation to xa depends on overwrite mode)

xm0,ym0 - xm1,ym1 are coordinates for classical multiline mode (note that the shape is ALWAYS such that top line has selection on right and not on left, even if xe < xb, that's how it always works in text editors)
-ym0 is same as yi, the first line
-ym1 is same as ya + 1 (so exclusive), after the last line
-xm0 is the x coordinate belonging to line ym0, and characters left of it are not selected
-xm1 is the x coordinate belonging to line ym1, and characters left of it are selected (xm1 itself is exclusive)

Why so many "inclusive" end coordinates are used:
in y direction, and for overwrite in x direction, you never want something of 0 height or 0 thickness to be selected
so the case of yi==ya must have a height of 1, not 0. Hence ya as inclusive coordinate.

For naming "x0,y0,x1,y1": set those to whichever of the above x/y combinations you need depending on the situation (prefer exclusive end coordinates for this naming)
*/

function LineOp(opt_editop, opt_y, opt_x) {
  this.y = opt_y || 0; // y position of this line

  this.rem0 = 0; // start x position of part to remove
  this.rem1 = 0; // end x position of part to remove
  this.add0 = opt_x || 0; // start x position of part where to insert
  this.add = ''; // text to insert there

  if(opt_editop) opt_editop.ops1.push(this);
}

// operation on a single line
function EditorOp() {
  this.ops0 = []; // line ops to do before rem/add below
  this.rem0 = 0; // start y position of lines to remove
  this.rem1 = 0; // end y position of lines to remove
  this.add0 = 0; // start y position of lines to add
  this.add1 = 0; // end y position of lines to add, must be > add0 to add anything at all (is exclusive end coordinate)
  this.ops1 = []; // line ops to do after rem/add above

  //this is filled in by doOps and used by undo, no need to fill it in yourself
  this.selxb = 0;
  this.selyb = 0;
  this.selxe = 0;
  this.selye = 0;
  this.selrect = false;

  this.mergeundo = false;
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO: use own fields for width and height rather than global w and h (use nothing global at all)
function EditComponent() {
  this.div = undefined;
  this.textarea = undefined; // the hidden textarea for typing and pasting in

  this.elgrid = []; // divs per cell, for all rows
  this.elrow = []; // div's per row, undefined if this row has no content
  this.chargrid = []; // 2D grid of all chars, space ' ' may also mean empty
  this.linelen = []; // actually used length of each line

  this.areadiv = undefined; // contains the hidden textarea inside

  // cursor or selection area
  this.cursordiv = undefined; // blinking cursor (vertical if insert mode, horizontal if insert mode)
  this.cursorcenterdiv = undefined; // center of rectangle (if any)
  this.cursortopdiv = undefined; // top one if not rectangle
  this.cursorbottomdiv = undefined; // bottom one if not rectangle

  this.cursorblinkinterval = undefined;

  this.pastepreview = undefined; // contains preview of what gets pasted that follows mouse when in paste mode
  this.pastprevieww = 0;
  this.pastpreviewh = 0;
  this.pasting = false; // if true, shows the preview
  this.pastecontent = 's->a->l\n   #   \ns->#';

  // On a change in the text content
  this.onchange = undefined;
  this.onchange_ = function() {
    if(this.onchange) this.onchange();
  };

  // On a change in the selection or cursor position
  this.onchangesel = undefined;
  this.onchangesel_ = function() {
    if(this.onchangesel) this.onchangesel();
  };

  // On a change in a mode (e.g. overwrite mode)
  this.onchangemode = undefined;
  this.onchangemode_ = function() {
    if(this.onchangemode) this.onchangemode();
  };



  // overwritemode is like overwrite (as opposed to insert) in standard text editors, and a bit more too:
  // it also preserves witdh of lines when backspacing
  this.overwritemode = true;

  // freecursormode allows cursor to move beyond end of line
  // this one is actually linked together with overwritemode by the code later on
  this.freecursormode = this.overwritemode;
  // in block mode, selections become rectangular, else they are like traditional multiline text selection
  // this one, too, gets linked with overwritemode
  // NOTE: this doesn't say whether the selection itself is rectangular or not, only the default behavior of dragging. See this.isrectangular instead for that.
  this.blockmode = this.overwritemode;


  // remember how large the div style was set last, to avoid updating it when already equal to w
  this.divWidth_ = 0;
  this.divHeight_ = 0;

  // see the long explanation at the top of hte file for the meaning of all these coordinates
  // selection coordinates. xb/yb is where dragging started, xe/ye is end drag corner
  this.xb = 0;
  this.yb = 0;
  this.xe = 0; // inclusive
  this.ye = 0; // inclusive as well
  // unlike selection coordinates, these return top left or bottom right corner, with same inclusivity modes
  this.xi = function() { return Math.min(this.xb, this.xe); };
  this.yi = function() { return Math.min(this.yb, this.ye); };
  this.xa = function() { return Math.max(this.xb, this.xe); };
  this.ya = function() { return Math.max(this.yb, this.ye); };
  // begin and end of rectangle, exclusive (unlike b/e and i/a which have some inclusive bounds), and updated for overwrite mode when needed
  // see info at top of file for more
  this.xr0 = function() { return Math.min(this.xb, this.xe); };
  this.yr0 = function() { return Math.min(this.yb, this.ye); };
  this.xr1 = function() { return Math.max(this.xb, this.xe) + (this.overwritemode ? 1 : 0); };
  this.yr1 = function() { return 1 + Math.max(this.yb, this.ye); };
  // this one is for classic multiline selection (arbitrary naming: s=start, f=finish), inclusive for y, exclusive for x end
  // see info at top of file for more
  this.xm0 = function() { return (this.yb == this.ye) ? this.xr0() : ((this.yb < this.ye) ? this.xb : this.xe) };
  this.ym0 = function() { return this.yi(); };
  this.xm1 = function() { return (this.yb == this.ye) ? this.xr1() : (((this.yb < this.ye) ? this.xe : this.xb) + (this.overwritemode ? 1 : 0)); };
  this.ym1 = function() { return this.ya() + 1; };

  // whether the current x0,y0,x1,y1 combination represents rectangular or classical multiline region (has no meaning if isRegion() is false)
  // while blockmode tells what form new selections must have, isrectangular tells what form the current selection has
  this.isrectangular = false;

  // returns whether the selection is any region, whether rectangular shaped or classic multiline shaped
  this.isRegion = function() { return this.xb != this.xe || this.yb != this.ye; };

  // unlike isrectangular (without capital r), this also includes the trivial rectangle of having single cell reflected, and even the case of multiline which is only a single line, so anything that's mathematically speaking a rectangle
  // if this returns false, we have the classical multiline case
  this.isAnyRectangular = function() { return this.isrectangular || (this.yb == this.ye); };

  this.isFullyRectangular = function() { return this.isrectangular && this.isRegion() };

  // includes case of being single-line
  this.isAnyClassicMultiline = function() { return !this.isrectangular; };

  // only if truly multiple lines and not rectangular shape
  this.isFullyClassicMultiline = function() { return !this.isrectangular && (this.ya() > this.yi()) };

  // The selection can be seen as either rectangular or classic multiline, e.g. if it's only a single line
  // TODO: There are some multiline cases that also could be both, include those? Or else rename the function to "issingleline"
  this.couldBeBoth = function() { return this.yb == this.ye; };

  // the regular ops done, for redo
  this.redoops = [];
  // the inverted ops, for undo
  this.undoops = [];
  this.undopos = 0;


  this.avoidcontextmenu = false; // used for when using right click for some other goal. But normally allow it.

  this.printDebug = function() {
    //console.log('area contents: ' + this.area.value);
    //console.log('area selection range: ' + this.area.selectionStart + ' ' + this.area.selectionEnd);
  };

  // may modify op and store them in undo array
  this.doLineOp_ = function(op) {
    var y = op.y;

    var add0 = op.add0;
    var add1 = op.add0 + op.add.length;
    var rem0 = op.rem0;
    var rem1 = op.rem1;

    this.ensureHeight(y + 1);

    var oldlen = this.linelen[y];
    var numadd = add1 - Math.min(add0, oldlen);
    var numrem = Math.min(rem1, oldlen) - Math.min(rem0, oldlen);

    if(add1 > add0 && rem0 == add0 && rem1 == add1) {
      this.ensureWidth(add0 + 1); // add1 not necessary, but add0 yes
      if(!this.elrow[y]) this.elrow[y] = makeDiv(0, y * th, tw * w, th, this.div);
      var row = this.elrow[y];

      for(var x = add0; x < add1; x++) {
        var c = op.add[x - add0];
        this.chargrid[y][x] = c;
        if(c == ' ') {
          if(this.elgrid[y][x]) {
            util.removeElement(this.elgrid[y][x]);
            this.elgrid[y][x] = undefined;
          }
        } else {
          if(!this.elgrid[y][x]) this.elgrid[y][x] = makeDiv(x * tw, 0, tw, th, row);
          this.elgrid[y][x].innerText = c;
        }
      }
      this.linelen[y] += numadd - numrem; // in theory 0 except if rem was out of bounds
    } else {
      if(rem1 > rem0) {
        for(var x = rem0; x < this.linelen[y]; x++) {
          var x2 = x - rem0 + rem1;
          var c2 = x2 < this.linelen[y] ? this.chargrid[y][x2] : ' ';
          var g2 = x2 < this.linelen[y] ? this.elgrid[y][x2] : undefined;
          this.chargrid[y][x] = c2;
          if(this.elgrid[y][x]) util.removeElement(this.elgrid[y][x]);
          this.elgrid[y][x] = g2;
          if(this.elgrid[y][x]) this.elgrid[y][x].style.left = (x * tw) + 'px';
          if(x2 < this.linelen[y]) {
            this.chargrid[y][x2] = ' ';
            this.elgrid[y][x2] = undefined;
          }
        }
        this.linelen[y] -= numrem;
      }
      if(add1 > add0) {
        if(y < 0 || y >= this.elgrid.length) return;

        this.linelen[y] += numadd;
        this.ensureWidth(this.linelen[y]);

        if(!this.elrow[y]) this.elrow[y] = makeDiv(0, y * th, tw * w, th, this.div);
        var row = this.elrow[y];

        for(var x = this.linelen[y] - 1; x >= add1; x--) {
          var x2 = x - add1 + add0;
          this.chargrid[y][x] = this.chargrid[y][x2];
          this.elgrid[y][x] = this.elgrid[y][x2];
          if(this.elgrid[y][x]) this.elgrid[y][x].style.left = (x * tw) + 'px';
          this.elgrid[y][x2] = undefined;
        }
        for(var x = add0; x < add1; x++) {
          var c = op.add[x - add0];
          this.chargrid[y][x] = c;
          this.elgrid[y][x] = undefined;
          if(c != ' ') {
            this.elgrid[y][x] = makeDiv(x * tw, 0, tw, th, row);
            this.elgrid[y][x].innerText = c;
          }
        }
      }
    }
    this.onchange_();
  };

  // this one does not alter undo arrays
  this.doOpWithoutUndo = function(op) {
    for(var i = 0; i < op.ops0.length; i++) {
      this.doLineOp_(op.ops0[i]);
    }
    if(op.rem1 > op.rem0) this.removeLines_(op.rem0, op.rem1);
    if(op.add1 > op.add0) this.insertLines_(op.add0, op.add1);
    for(var i = 0; i < op.ops1.length; i++) {
      this.doLineOp_(op.ops1[i]);
    }
    this.fitDiv();
  };

  this.storeUndo_ = function(op) {
    // TODO: merge undo ops if they're typing single characters (this doesn't refer to using the "mergeundo" flag, but actually turning it into a single op for performance reasons)

    var u = this.invertOp(op);
    u.selxb = this.xb;
    u.selyb = this.yb;
    u.selxe = this.xe;
    u.selye = this.ye;
    u.selrect = this.isrectangular;
    if(this.undopos > this.undoops.length) this.undopos = this.undoops.length;
    if(this.undopos != this.undoops.length) {
      this.undoops.length = this.undopos;
      this.redoops.length = this.undopos;
    }
    this.redoops.push(op);
    this.undoops.push(u);
    this.undopos++;


    // prune
    if(this.undoops.length > 200) {
      var undoops2 = [];
      var redoops2 = [];
      for(var i = 0; i < 100; i++) {
        undoops2.push(this.undoops[100 + i]);
        redoops2.push(this.redoops[100 + i]);
      }
      this.undoops = undoops2;
      this.redoops = redoops2;
      this.undopos = this.undoops.length;
    }
  };

  this.doOp = function(op) {
    this.storeUndo_(op);
    this.doOpWithoutUndo(op);
  };

  this.undo = function() {
    // TODO: also save cursor position
    console.log('undo: undopos: ' + this.undopos + ', len: ' + this.undoops.length);
    if(this.undopos > this.undoops.length) this.undopos = this.undoops.length;
    if(this.undopos == 0) return;

    this.undopos--;

    var rop = this.redoops[this.undopos];
    rop.selxb = this.xb;
    rop.selyb = this.yb;
    rop.selxe = this.xe;
    rop.selye = this.ye;
    rop.selrect = this.isrectangular;

    var op = this.undoops[this.undopos];
    this.doOpWithoutUndo(op);

    this.selectRegion(op.selxb, op.selyb, op.selxe, op.selye, op.selrect);

    if(op.mergeundo) this.undo();
  };

  this.redo = function() {
    if(this.undopos < 0) this.undopos = 0;
    if(this.undopos >= this.redoops.length) return;
    var op = this.redoops[this.undopos];
    this.undopos++;
    this.doOpWithoutUndo(op);
    this.selectRegion(op.selxb, op.selyb, op.selxe, op.selye, op.selrect);

    if(this.undopos < this.redoops.length && this.redoops[this.undopos].mergeundo) this.redo();
  };

  // mark the last two operations as merged for undo (doesn't help performance, but makes the user undo button combine them if there was some intermediate operation that shouldn't be user visible)
  this.markMergeUndo = function() {
    if((this.undopos - 1 < 0) || (this.undopos - 1 >= this.undoops.length)) return;
    this.undoops[this.undopos - 1].mergeundo = true;
    this.redoops[this.undopos - 1].mergeundo = true;
  };

  this.invertLineOp = function(op) {
    var y = op.y;
    var result = new LineOp();
    result.add = '';
    for(var x = op.rem0; x < op.rem1; x++) {
      if(this.chargrid[y]) {
        result.add += (this.chargrid[y][x] || ' ');
      } else {
        result.add += ' ';
      }
    }
    result.add0 = op.rem0;
    result.rem0 = op.add0;
    result.rem1 = op.add0 + op.add.length;
    result.y = op.y;
    return result;
  };

  // inverts an op to create the undo version
  this.invertOp = function(op) {
    var result = new EditorOp();
    result.add0 = op.rem0;
    result.add1 = op.rem1;
    result.rem0 = op.add0;
    result.rem1 = op.add1;
    result.mergeundo = op.mergeundo;
    for(var y = op.rem0; y < op.rem1; y++) {
      var l = new LineOp();
      l.y = y;
      l.add = '';
      for(var x = 0; x < this.linelen[y]; x++) l.add += this.chargrid[y][x];
      result.ops1.push(l);
    }
    for(var i = 0; i < op.ops1.length; i++) {
      result.ops0.push(this.invertLineOp(op.ops1[i]));
    }
    for(var i = 0; i < op.ops0.length; i++) {
      result.ops1.push(this.invertLineOp(op.ops0[i]));
    }
    return result;
  };

  // clears all text, using the operations so it supports undo
  this.clear = function() {
    var op = new EditorOp();
    op.rem0 = 0;
    op.rem1 = this.chargrid.length;
    this.doOp(op);
  };

  this.renderCursorDivs = function() {
    var xi = this.xi();
    var yi = this.yi();
    var xa = this.xa();
    var ya = this.ya();
    var xb = this.xb;
    var yb = this.yb;
    var xe = this.xe;
    var ye = this.ye;
    var xr0 = this.xr0();
    var yr0 = this.yr0();
    var xr1 = this.xr1();
    var yr1 = this.yr1();
    var xm0 = this.xm0();
    var ym0 = this.ym0();
    var xm1 = this.xm1();
    var ym1 = this.ym1();
    var rectangular = this.isrectangular;

    // the blinking cursor is at xe,ye, NOT at xb,yb nor min/max, because it should be at the last corner you selected
    if(this.overwritemode) {
      this.cursordiv.style.left = (xe * tw) + 'px';
      this.cursordiv.style.width = (tw) + 'px';
      this.cursordiv.style.top = ((ye + 1) * th - 4) + 'px';
      this.cursordiv.style.height = 2 + 'px';
    } else {
      this.cursordiv.style.left = (xe * tw + 2) + 'px';
      this.cursordiv.style.width = 2 + 'px';
      this.cursordiv.style.top = (ye * th) + 'px';
      this.cursordiv.style.height = (th) + 'px';
    }

    if(rectangular) {
      if(this.cursortopdiv.style.visibility != 'hidden') {
        this.cursortopdiv.style.visibility = 'hidden';
        this.cursorbottomdiv.style.visibility = 'hidden';
      }

      this.cursortopdiv.style.width = '0';
      this.cursorbottomdiv.style.width = '0';

      this.cursorcenterdiv.style.left = xr0 * tw + 'px';
      this.cursorcenterdiv.style.top = yr0 * th + 'px';
      this.cursorcenterdiv.style.width = Math.max(2, (xr1 - xr0) * tw) + 'px';
      this.cursorcenterdiv.style.height = (yr1 - yr0) * th + 'px';
    } else { // classic multiline
      //this.cursortopdiv.style.backgroundColor = 'blue';
      //this.cursorbottomdiv.style.backgroundColor = 'yellow';

      if(yi == ya) {
        if(this.cursortopdiv.style.visibility != 'hidden') {
          this.cursortopdiv.style.visibility = 'hidden';
          this.cursorbottomdiv.style.visibility = 'hidden';
        }
      } else {
        if(this.cursortopdiv.style.visibility != 'visible') {
          this.cursortopdiv.style.visibility = 'visible';
          this.cursorbottomdiv.style.visibility = 'visible';
        }
      }

      var boardwidth = w;
      //var selh = ya - yi;
      this.cursortopdiv.style.width = '0';
      this.cursorbottomdiv.style.width = '0';
      this.cursorcenterdiv.style.width = '0';

      if(yi == ya) {
        this.cursortopdiv.style.width = '0';
        this.cursorbottomdiv.style.width = '0';
        if(xi != xa) {
          this.cursorcenterdiv.style.left = xi * tw + 'px';
          this.cursorcenterdiv.style.top = yi * th + 'px';
          this.cursorcenterdiv.style.width = (xa - xi) * tw + 'px';
          this.cursorcenterdiv.style.height = th + 'px';
        }
      } else {
        this.cursortopdiv.style.left = xm0 * tw + 'px';
        this.cursortopdiv.style.top = ym0 * th + 'px';
        this.cursortopdiv.style.width = (boardwidth - xm0) * tw + 'px';
        this.cursortopdiv.style.height = th + 'px';
        this.cursorcenterdiv.style.left = 0 + 'px';
        this.cursorcenterdiv.style.top = (yi + 1) * th + 'px';
        this.cursorcenterdiv.style.width = boardwidth * tw + 'px';
        this.cursorcenterdiv.style.height = Math.max(0, ya - yi - 1) * th + 'px';
        this.cursorbottomdiv.style.left = 0 * tw + 'px';
        this.cursorbottomdiv.style.top = (ym1 - 1) * th + 'px';
        this.cursorbottomdiv.style.width = xm1 * tw + 'px';
        this.cursorbottomdiv.style.height = th + 'px';
      }

      /*var rx = 0, ry = 0, rw = 0, rh = 0;
      var rx0 = 0, rw0 = 0, rh0 = 0, ry0 = 0;
      var rx1 = 0, ry1 = 0, rw1 = 0, rh1 = 0;

      if(selh > 2) {
        rx0 = xi;
        ry0 = yi;
        rw0 = (boardwidth - xi);
        rh0 = 1;

        rx = 0;
        ry = (yi + 1);
        rw = boardwidth;
        rh = (ya - yi - 2);

        rx1 = 0;
        ry1 = ya - 1;
        rw1 = xa;
        rh1 = 1;
      } else if(selh == 2) {
        rx0 = xi;
        ry0 = yi;
        rw0 = boardwidth - xi + 1;
        rh0 = 1;

        rx1 = 0;
        ry1 = ya - 1;
        rw1 = xa;
        rh1 = 1;
      } else if(selh == 1) {
        rx = xi;
        ry = yi;
        rw = xa - xi;
        rh = 1;
      }

      this.cursortopdiv.style.left = rx0 * tw + 'px';
      this.cursortopdiv.style.top = ry0 * th + 'px';
      this.cursortopdiv.style.width = rw0 * tw + 'px';
      this.cursortopdiv.style.height = rh0 * th + 'px';
      this.cursorcenterdiv.style.left = rx * tw + 'px';
      this.cursorcenterdiv.style.top = ry * th + 'px';
      this.cursorcenterdiv.style.width = rw * tw + 'px';
      this.cursorcenterdiv.style.height = rh * th + 'px';
      this.cursorbottomdiv.style.left = rx1 * tw + 'px';
      this.cursorbottomdiv.style.top = ry1 * th + 'px';
      this.cursorbottomdiv.style.width = rw1 * tw + 'px';
      this.cursorbottomdiv.style.height = rh1 * th + 'px';*/
    }
  };

  // is like a single press select, place the cursor in one spot, no region, actually even cell is wrong word except in overwrite mode
  // this will also reset the "isrectangular" value to whether or not blockmode is enabled
  this.selectCell = function(x, y) {
    if(!this.freecursormode && x > this.linelen[y]) {
      x = this.linelen[y];
    }

    this.selectRegion(x, y, x, y, this.blockmode);

    this.onchangesel_();
    //this.printDebug();
  };

  // rectangular = whether block selection (if true), or classic line-based text selection (if false)
  // for the xb..ye params, use selection start/end, not topleft/bottomright convention
  this.selectRegion = function(xb, yb, xe, ye, rectangular) {
    this.xb = xb;
    this.yb = yb;
    this.xe = xe;
    this.ye = ye;
    this.isrectangular = rectangular;
console.log('selectRegion: ' + xb + ' ' + yb + ' ' + xe + ' ' + ye + ' | ' + rectangular);

    this.renderCursorDivs();

    // now switch them to the topleft/bottomright convention
    var x0 = this.xi();
    var y0 = this.yi();
    var x1 = this.xa();
    var y1 = this.ya();

    var text = this.extractSelectedText();

    // Put the text in the hidden textarea, so standard browser methods of copying
    // the text (ctrl+c, middle click selection, ...) work the default OS way
    // without having to handle it ourselves here.
    this.textarea.value = text;
    this.textarea.setSelectionRange(0, this.textarea.value.length);
    console.log('set selrange: ' + this.textarea.value.length);
    console.log('text: "' + text + '"');
    this.printDebug();

    this.onchangesel_();

    //this.printDebug();
  };

  // extracts and returns the text in the selected region
  this.extractSelectedText = function() {
    var text = '';

    if(this.isrectangular) {
      var x0 = this.xr0();
      var y0 = this.yr0();
      var x1 = this.xr1();
      var y1 = this.yr1();

      for(var y = y0; y < y1; y++) {
        if(y != y0) text += '\n';
        if(y >= this.chargrid.length) break;
        for(var x = x0; x < x1; x++) {
          if(x >= this.chargrid[y].length) break;
          text += this.chargrid[y][x];
        }
      }
    } else { // classic multiline
      var x0 = this.xm0();
      var y0 = this.ym0();
      var x1 = this.xm1();
      var y1 = this.ym1();

      var boardwidth = w;
      var selh = y1 - y0;

      var rx0 = 0, rw0 = 0, rh0 = 0, ry0 = 0;
      var rx = 0, ry = 0, rw = 0, rh = 0;
      var rx1 = 0, ry1 = 0, rw1 = 0, rh1 = 0;

      if(selh > 2) {
        rx0 = x0;
        ry0 = y0;
        rw0 = (boardwidth - x0);
        rh0 = 1;

        rx = 0;
        ry = (y0 + 1);
        rw = boardwidth;
        rh = (y1 - y0 - 2);

        rx1 = 0;
        ry1 = y1 - 1;
        rw1 = x1;
        rh1 = 1;
      } else if(selh == 2) {
        rx0 = x0;
        ry0 = y0;
        rw0 = boardwidth - x0 + 1;
        rh0 = 1;

        rx1 = 0;
        ry1 = y1 - 1;
        rw1 = x1;
        rh1 = 1;
      } else if(selh == 1) {
        rx = x0;
        ry = y0;
        rw = x1 - x0;
        rh = 1;
      }

      for(var y = ry0; y < ry0 + rh0; y++) {
        if(y != y0) text += '\n';
        if(y >= this.chargrid.length) break;
        for(var x = rx0; x <= rx0 + rw0; x++) {
          if(x >= this.chargrid[y].length) break;
          text += this.chargrid[y][x];
        }
      }
      for(var y = ry; y < ry + rh; y++) {
        if(y != y0) text += '\n';
        if(y >= this.chargrid.length) break;
        for(var x = rx; x < rx + rw; x++) {
          if(x >= this.chargrid[y].length) break;
          text += this.chargrid[y][x];
        }
      }
      for(var y = ry1; y < ry1 + rh1; y++) {
        if(y != y0) text += '\n';
        if(y >= this.chargrid.length) break;
        for(var x = rx1; x < rx1 + rw1; x++) {
          if(x >= this.chargrid[y].length) break;
          text += this.chargrid[y][x];
        }
      }
    }

    return text;
  };

  // same as selectRegion, but preserves this.isrectangular, that is, doesn't take it as parameter
  // can also be used to make region smaller, move it, ..., the name is not perfect
  this.changeRegion = function(xb, yb, xe, ye) {
    this.selectRegion(xb, yb, xe, ye, this.isrectangular);
  };

  // any region becomes normal cursor instead
  this.unselectRegion = function() {
    this.selectCell(this.xb, this.yb);
    this.onchangesel_();
  };

  this.reselectRegion = function() {
    this.selectRegion(this.xb, this.yb, this.xe, this.ye, this.isrectangular);
    this.focusTextArea();
  };

  this.fillPastePreview = function() {
    this.pastepreview.innerHTML = '';

    if(!this.pasting) {
      this.pastepreview.style.visibility = 'hidden';
      return;
    } else {
      this.pastepreview.style.visibility = 'visible';
    }

    this.unselectRegion();

    this.pastepreview.style.backgroundColor = BGCOLOR;
    this.pastepreview.style.zIndex = '10';
    var v = this.pastecontent;
    var pw = 0; // horizontal paste content size
    var ph = 0; // vertical paste content size
    var x = 0;
    var y = 0;
    for(var i = 0; i < v.length; i++) {
      if(v[i] == '\n') {
        if(i + 1 == v.length) break;
        x = 0;
        y++;
        continue;
      }
      x++;
      pw = Math.max(x, pw);
    }
    ph = y + 1;
    this.pastprevieww = pw;
    this.pastpreviewh = ph;
    this.pastepreview.style.width = (pw * tw)  + 'px';
    this.pastepreview.style.height = (ph * th)  + 'px';
    x = y = 0;
    for(var i = 0; i < v.length; i++) {
      var c = v[i];
      if(c == '\n') {
        if(i + 1 == v.length) break;
        x = 0;
        y++;
        continue;
      }

      var cell = makeDiv(x * tw, y * th, tw, th, this.pastepreview);
      cell.innerText = c;
      cell.style.color = ONCOLOR;

      x++;
    }
  };

  this.focusTextArea = function() {
    // avoid screen scrolling around by placing the hidden cursor focused element at the correct spot
    this.areadiv.style.left = (this.xe * tw) + 'px';
    this.areadiv.style.top = (this.ye * th) + 'px';

    this.textarea.focus();
  };

  this.setUp = function(x, y, parent) {
    var self = this;

    this.div = makeDiv(x, y, tw, th, parent);
    this.div.contenteditable = true;
    this.div.style.fontSize = Math.ceil(tw * 0.75) + 'px';
    this.div.style.textAlign = 'center';
    this.div.style.fontFamily = 'monospace';
    this.div.style.border = '1px solid ' + OFFCOLOR;
    this.elgrid = [];
    this.chargrid = [];
    this.linelen = [];

    this.areadiv = makeDiv(10, 10, 100, 0, this.div);
    this.areadiv.style.overflow = 'hidden';

    this.textarea = util.makeAbsElement('textarea', 0, 0, 100, 40, this.areadiv);
    this.textarea.rows = 1;
    this.textarea.cols = 20;
    this.textarea.value = '';
    this.textarea.style.fontSize = '12px';
    this.textarea.style.zIndex = '1';
    this.textarea.autocorrect = 'off';
    this.textarea.spellcheck = false;
    this.textarea.autocapitalize = 'off';

    this.div.style.whiteSpace = 'pre';
    this.div.style.backgroundColor = BGCOLOR;
    this.div.style.color = OFFCOLOR;

    this.pastepreview = makeDiv(0, 0, tw * 6, th * 6, this.div);
    this.pastepreview.style.border = '1px solid ' + ONCOLOR;
    this.fillPastePreview(); // actually empties it now.

    this.cursordiv = makeDiv(0, 0, 1, 1, this.div);
    this.cursordiv.style.backgroundColor = ONCOLOR;
    this.cursordiv.style.animation = '1s blink step-end infinite';

    this.cursorcenterdiv = makeDiv(0, 0, tw, th, this.div);
    this.cursorcenterdiv.style.backgroundColor = util.addAlpha(ONCOLOR, 0.65);
    this.cursortopdiv = makeDiv(0, 0, tw, th, this.div);
    this.cursortopdiv.style.backgroundColor = util.addAlpha(ONCOLOR, 0.65);
    this.cursortopdiv.style.visibility = 'hidden';
    this.cursorbottomdiv = makeDiv(0, 0, tw, th, this.div);
    this.cursorbottomdiv.style.backgroundColor = util.addAlpha(ONCOLOR, 0.65);
    this.cursorbottomdiv.style.visibility = 'hidden';

    var self = this;

    this.resetCursorBlinkInterval();

    this.fitDiv();

    this.selectCell(Math.floor(w / 2), Math.floor(h / 2));


    this.div.oncontextmenu = function(e) {
      if(self.avoidcontextmenu || self.pasting) {
        self.avoidcontextmenu = false;
        return false;
      }
    };

    this.div.onmouseup = function(e) {
      console.log('mouse up');
      self.printDebug();
    }

    this.div.onmousedown = function(e) {
      console.log('mouse down');
      self.printDebug();

      var rect = self.div.getBoundingClientRect();
      var x = e.x - rect.left;
      var y = e.y - rect.top;
      var x2 = self.mouseSelXb(x);
      var y2 = self.mouseSelYb(y);

      if(e.buttons == 1) {
        self.avoidcontextmenu = false;
      }

      var inregion = (self.isRegion() && x2 >= self.xi() && x2 < self.xa() && y2 >= self.yi() && y2 < self.ya());


      if(self.pasting) {
        if(e.buttons == 2) { // right mouse button
          self.avoidcontextmenu = true;
          self.pasting = false;
          self.fillPastePreview();
        }

        self.ensureWidth(x2 + self.pastprevieww);
        self.ensureHeight(y2 + self.pastpreviewh);

        if(e.buttons == 1) {
          self.pasteText(self.pastecontent, x2, y2, true, false, true);
        }
        e.stopPropagation();
        return false;
      }

      if(this.blockmode && inregion) {
        e.stopPropagation();
        return false;
      }

      if(e.buttons == 1) {
        // ctrl+dragging to copy
        if(self.isrectangular && inregion && e.ctrlKey && !self.pasting) {
          self.pastecontent = '';
          for(var py = self.yi(); py <= self.ya(); py++) {
            for(var px = self.xi(); px <= self.xa(); px++) {
              self.pastecontent += self.chargrid[py][px];
            }
            self.pastecontent += '\n';
          }
          self.pasting = true;
          self.fillPastePreview();
          e.stopPropagation();
          return false;
        }
      }


      // standard single left click cursor placement
      if(e.buttons == 1) {
        if(y2 >= h) {
          e.stopPropagation();
          return false;
        }

        //var x = Math.floor((e.x - rect.left) / tw);
        //var y = Math.floor((e.y - rect.top) / th);

        // move the hidden textarea to here. TODO: should this be in selectCell instead?
        self.textarea.style.left = (x - 20) + 'px';
        self.textarea.style.top = (y - 20) + 'px';

        self.selectCell(x2, y2);
        self.resetCursorBlinkInterval();

        document.activeElement.blur();
        self.focusTextArea();
      }

      e.stopPropagation();
      return false;
    };

    // [search terms: doubleclick double click dclick dblclick]
    this.div.ondblclick = function(e) {
      var rect = self.div.getBoundingClientRect();
      var x = e.x - rect.left;
      var y = e.y - rect.top;

      var x2 = self.mouseSelXb(x);
      var y2 = self.mouseSelYb(y);

      //self.selectRegion(x2, y2, x2 + 4, y2 + 2, false);
      if(y2 >= self.chargrid.length || x2 >= self.chargrid[y2].length) return;
      var line = self.chargrid[y2];
      var c = line[x2];
      var x0 = x2;
      while(x0 >= 0 && line[x0] != ' ') x0--; x0++;
      var x1 = x2;
      while(x1 < line.length && line[x1] != ' ') x1++; x1--;
      self.selectRegion(x0, y2, x1 + 1, y2, self.blockmode);
    };

    this.div.onmousemove = function(e) {
      //console.log('mousemove: ' + e.x + ',' + e.y);
      if(!self.pasting && !e.buttons) return;
      var rect = self.div.getBoundingClientRect();
      var x = e.x - rect.left;
      var y = e.y - rect.top;

      if(self.pasting) {
        var x2 = self.mouseSelXb(x);
        var y2 = self.mouseSelYb(y);

        self.pastepreview.style.left = (x2 * tw) + 'px';
        self.pastepreview.style.top = (y2 * th) + 'px';
      }

      if(e.buttons == 1) {  // while selection button down
        if(self.pasting) return;

        var x2 = self.mouseSelXe(x);
        var y2 = self.mouseSelYe(y);

        if(x2 != self.xe || y2 != self.ye) {
          //self.selectCell(this.xe, this.ye);
          // NOTE about the alt key for this: ctrl and shift already have other behavior in combination with arrow keys
          // and I want consistency between mouse and arrow.
          // BUT alt+mouse makes operating system move the whole window! But the solution is to start selection first, then press alt: that works in here, and the OS doesn't do window drag
          var bm = (e.altKey) != (self.blockmode);
          ///var y3 = (y2 == self.yb) ? (y2 + 1) : y2;
          ///self.selectRegion(self.xb, self.yb, x2, y3, bm);
          self.selectRegion(self.xb, self.yb, x2, y2, bm);
          //console.log('...: ' + x2 + ' ' + y2 + ' ' + e.buttons + ' | ' + this.xb + ' ' + this.yb + ' ' + this.xe + ' ' + this.ye);
        }
      }
    };

    this.textarea.oninput = function(e) {
      console.log('textarea.oninput');
      self.printDebug();
      var v = self.textarea.value;

      if(v.length == 1 && self.isrectangular && (self.xr1() > self.xr0() || self.yr1() > self.yr0())) {
        // fill entire rectangle with same char
        var op = new EditorOp();
        if(self.ya() > h) {
          op.add0 = h;
          op.add1 = self.ya();
        }
        var op = new EditorOp();
        for(var y = self.yr0(); y < self.yr1(); y++) {
          var lop = new LineOp(op, y, x);
          var xend = self.xr1();
          var ovr = self.overwritemode ? true : (self.xr1() > self.xr0());
          lop.add0 = self.xr0();
          for(var x = self.xr0(); x < xend; x++) lop.add += v[0];
          if(ovr) {
            lop.rem0 = lop.add0;
            lop.rem1 = lop.add0 + lop.add.length;
          }
        }
        self.doOp(op);

        // if only 1 thick, advance cursor
        if(self.xr1() <= self.xr0() + 1) {
          self.changeRegion(self.xb + 1, self.yb, self.xe + 1, self.ye);
        }
      } else {
        // add the text that was typed, e.g. single character, or more if something was pasted in the textarea
        self.deleteSelectedRegion();
        self.pasteText(v, self.xi(), self.yi(), self.blockmode, true);
      }

      //self.printDebug();
      self.textarea.value = '';
      //self.printDebug();
    };

    this.textarea.onkeydown = function(e) {
      if(e.code == 'ArrowUp' || e.code == 'ArrowDown' || e.code == 'ArrowLeft' || e.code == 'ArrowRight'
         || e.code == 'End' || e.code == 'Home') {
        // This is because we want to control the selectionrange of the textarea. The textarea must definitely
        // listen to keys like typing, pasting, copying, ..., but it may not listen to keys that affects
        // its selection or cursor.
        return false;
      }
      return true;
    };

    this.selectCell(0, 0);
    this.focusTextArea();
  };  // end of this.setup

  // whether the selection has any area. A multiline thin cursor has no area for example.
  // the 1-width of overwrite mode is NOT counted as area here (if you want to include that one,
  // you could consider overwrite mode to always return true here and hence not need this function)
  // note that it is possible to have multiple cursors but no area if they're thin
  this.hasArea = function() {
    if(this.isrectangular) {
      return this.xb != this.xe; //y not checked because y always gives area: end coordinate is inclusive
    } else {
      if(this.ye == this.yb) return this.xb != this.xe;
      return true;
    }
  };

  // only does something if this.hasArea() true
  this.deleteSelectedRegion = function() {
    if(!this.hasArea()) return;

    var xi = this.xi();
    var yi = this.yi();
    var xa = this.xa();
    var ya = this.ya();
    var x0 = this.xr0();
    var y0 = this.yr0();
    var x1 = this.xr1();
    var y1 = this.yr1();
    var xm0 = this.xm0();
    var ym0 = this.ym0();
    var xm1 = this.xm1();
    var ym1 = this.ym1();

    if (this.isFullyRectangular() && xa > xi) { // for large rectangle, we delete inside the rectangle rather than in front
      var op = new EditorOp();
      for(var y = y0; y < y1; y++) {
        var lop = new LineOp(op, y);
        lop.rem0 = x0;
        lop.rem1 = x1;
        if(this.overwritemode) {
          lop.add0 = x0;
          for(var x = x0; x < x1; x++) {
            lop.add += ' ';
          }
        }
      }
      this.doOp(op);
      if(!this.overwritemode) {
        this.changeRegion(this.xb, this.yb, this.xb, this.ye);
      }
    } else if(this.isAnyClassicMultiline() && this.hasArea()) { // multiple chars on multiple lines, delete all those
      if(this.overwritemode) {
        var op = new EditorOp();
        for(var y = y0; y < y1 && y < h; y++) {
          var xstart = (y == y0) ? x0 : 0;
          var xend = (y + 1 == y1) ? x1 : this.linelen[y];
          var lop = new LineOp(op, y);
          lop.rem0 = xstart;
          lop.rem1 = xend;
          lop.add0 = xstart;
          for(var x = xstart; x < xend; x++) {
            lop.add += ' ';
          }
        }
        this.doOp(op);
        this.selectCell(x0, y0);
      } else {
        if(ym0 == ym1 - 1) {
          var op = new EditorOp();
          var lop = new LineOp(op, ym0);
          lop.rem0 = xm0;
          lop.rem1 = xm1;
          this.doOp(op);
          this.selectCell(xm0, ym0);
        } else {
          var op = new EditorOp();
          var xend = this.linelen[y1 - 1];
          var lop = new LineOp(op, y0);
          lop.rem0 = xm0;
          lop.rem1 = this.linelen[y0];
          lop.add0 = xm0;
          for(var x = xm1; x < xend; x++) {
            lop.add += this.chargrid[y1 - 1][x];
          }
          op.rem0 = y0 + 1;
          op.rem1 = y1;

          this.doOp(op);
          this.selectCell(xm0, ym0);
        }
      }
    }
  };

  this.onkeydown = function(e) {
    var xb = this.xb;
    var yb = this.yb;
    var xe = this.xe;
    var ye = this.ye;
    var xi = this.xi();
    var yi = this.yi();
    var xa = this.xa();
    var ya = this.ya();
    var xr0 = this.xr0();
    var yr0 = this.yr0();
    var xr1 = this.xr1();
    var yr1 = this.yr1();
    var xm0 = this.xm0();
    var ym0 = this.ym0();
    var xm1 = this.xm1();
    var ym1 = this.ym1();

    var x0 = xi;
    var y0 = yi;
    var x1 = xa;
    var y1 = ya;

    var shift = !!e.shiftKey;
    var ctrl = !!e.ctrlKey;

    console.log('onkeydown: ' + e.code);
    this.printDebug();

    //console.log(e.code);
    if(e.code == 'Backspace') {
      /*
      How backspace works:
      -if you have, horizontally, more than (overwritemode ? 1 : 0) characters selected:
       --delete every selected character (no matter what the shape of the selection was) (without moving characters after it yet)
       --if insert mode is OFF, then also shift characters after it towards the front. If insert mode is ON, don't move any other characters, leave an empty gap in the middle instead: that is the special 'block' insert mode we have for this since it's essentially a 2D ascii art editor)
       --if the selection was rectangular, do multiline: basically an independent backspace operation on each line. If the selection was classical text selection, then lines in the middle get deleted (only if insert mode is OFF)
       --do NOT move start of the cursor, keep if in place after the above happened
       --but make the cursor smaller: make it 1 or 0 characters wide (1 in insert mode, 0 in non insert mode)
      -if the selection is 0 or 1 wide:
       --delete 1 character in front of the cursor (per line if multiline)
       --if insert mode is OFF, then also shift characters after it towards the front. If insert mode is ON, don't move any other characters, leave an empty gap in the middle instead: that is the special 'block' insert mode we have for this since it's essentially a 2D ascii art editor)
       --move the cursor one to the left
       --if the cursor was at the start of the line, and the selection is NOT multiline, then also delete this line and append the text that was still on this line to the previous line
      -ALTERNATIVE FOR INSERT MODE:
       --instead of deleting the char in front, delete the char under the cursor, since in insert mode it draws a box around the char rather than a line in front. But still move cursor to left.
      */

      if(ye >= h || xe > w || ye < 0 || xe < 0) {
        return false;
      }

      x0 = xr0;
      y0 = yr0;
      x1 = xr1;
      y1 = yr1;

      // currently only done for multiline, so the behavior is different if more lines selected, but actually it feels surprisingly intuitive...
      var overwritemodedeletesatinsteadofbeforecursor = true;

      if (this.isFullyRectangular() && xa > xi) { // for large rectangle, we delete inside the rectangle rather than in front
        this.deleteSelectedRegion();
      } else if(this.isAnyClassicMultiline() && this.hasArea()) { // multiple chars on multiple lines, delete all those
        this.deleteSelectedRegion();
      } else if(this.isrectangular && xa == xi && ya > yi) { // thin but multiline
        if(x0 > 0) {
          var del_at = (this.overwritemode && overwritemodedeletesatinsteadofbeforecursor) ? x0 : (x0 - 1);
          var op = new EditorOp();
          for(var y = y0; y < y1 && y < h; y++) {
            var lop = new LineOp(op, y);
            lop.rem0 = del_at;
            lop.rem1 = del_at + 1;
            if(this.overwritemode) {
              lop.add0 = lop.rem0;
              lop.add = ' ';
            }
          }
          this.doOp(op);

          this.changeRegion(this.xb - 1, this.yb, this.xe - 1, this.ye);
        }
      } else {
        if(x0 > 0) {
          // remove a single character with a single line cursor
          var op = new EditorOp();
          var lop = new LineOp(op, y0);
          lop.rem0 = x0 - 1;
          lop.rem1 = x0;
          if(this.overwritemode) {
            lop.add0 = lop.rem0;
            lop.add = ' ';
          }
          this.doOp(op);
          this.selectCell(x0 - 1, y0);
        } else if(y0 > 0) {
          // start of line: remove line and append its contents to previous line
          var start = this.linelen[y0 - 1];
          var end = start + this.linelen[y0];
          var op = new EditorOp();
          op.rem0 = y0;
          op.rem1 = y0 + 1;
          var lop = new LineOp(op, y0 - 1);
          lop.add0 = start;
          for(var x = start; x < end; x++) {
            lop.add += this.chargrid[y0][x - start];
          }
          this.doOp(op);
          this.selectCell(start, y0 - 1);
        }
      }
    }
    else if(e.code == 'Delete') {
      if(y0 >= h || x0 >= w || y0 < 0 || x0 < 0) {
        return false;
      }

      x0 = xr0;
      y0 = yr0;
      x1 = xr1;
      y1 = yr1;


      if (this.isFullyRectangular() && xa > xi) { // for large rectangle, we delete inside the rectangle rather than in front
        this.deleteSelectedRegion();
      } else if(this.isAnyClassicMultiline() && this.hasArea()) { // multiple chars on multiple lines, delete all those
        this.deleteSelectedRegion();
      } else if(this.isrectangular && xa == xi && ya > yi) { // thin but multiline
        var op = new EditorOp();
        for(var y = y0; y < y1 && y < h; y++) {
          var lop = new LineOp(op, y);
          lop.rem0 = x0;
          lop.rem1 = x0 + 1;
          // disabled: let's make delete move things anyway in overwrite mode, otherwise this is identical to the spacebar key
          /*if(this.overwritemode) {
            lop.add0 = lop.rem0;
            lop.add = ' ';
          }*/
        }
        this.doOp(op);
        //this.selectRegion(x0, y0, this.overwritemode ? (x0 + 1) : x0, y1, true);
      } else { // single char with single line cursor
        if(x0 < this.linelen[y0]) {
          // remove a single character with a single line cursor
          var op = new EditorOp();
          var lop = new LineOp(op, y0);
          lop.rem0 = x0;
          lop.rem1 = x0 + 1;
          // disabled: let's make delete move things anyway in overwrite mode, otherwise this is identical to the spacebar key
          /*if(this.overwritemode) {
            lop.add0 = lop.rem0;
            lop.add = ' ';
          }*/
          this.doOp(op);
        } else if(y0 + 1 < h && !this.overwritemode) {
          // end of line, move next line to the ened of this one
          var end = this.linelen[y0 + 1];
          var op = new EditorOp();
          op.rem0 = y0 + 1;
          op.rem1 = y0 + 2;
          var lop = new LineOp(op, y0);
          lop.add0 = this.linelen[y0];
          for(var x = 0; x < end; x++) {
            lop.add += this.chargrid[y0 + 1][x];
          }
          this.doOp(op);
        }
      }
    }
    else if(e.code == 'ArrowUp') {
      if(yb > 0) {
        if(shift) {
          this.changeRegion(xb, yb, xe, ye - 1);
        } else {
          if(this.isrectangular) {
            this.changeRegion(xb, yb - 1, xe, ye - 1);
          } else {
            this.selectCell(xe, ye - 1);
          }
        }
      }
      this.resetCursorBlinkInterval();
    }
    else if(e.code == 'ArrowDown') {
      if(yb + 1 < h) {
        if(shift) {
          this.changeRegion(xb, yb, xe, ye + 1);
        } else {
          if(this.isrectangular) {
            if(ye < h) this.changeRegion(xb, yb + 1, xe, ye + 1);
          } else {
            this.selectCell(xe, ye + 1);
          }
        }
      }
      this.resetCursorBlinkInterval();
    }
    else if(e.code == 'ArrowLeft') {
      var amount = 1;
      if(ctrl) {
        while(xe - amount > 0 && this.chargrid[ye][xe - amount] != ' ') amount++;
      }
      if(xe > 0) {
        if(shift) {
          this.changeRegion(xb, yb, xe - amount, ye);
        } else if(this.isrectangular) {
          this.changeRegion(xb - 1, yb, xe - 1, ye);
        } else {
          this.selectCell(xe - amount, ye);
        }
      } else if(y0 > 0) {
        // beginning of line
        if(!this.isrectangular) {
          if(shift) {
            this.changeRegion(xb, yb, this.linelen[ye - 1] - 1, ye - 1);
          } else {
            this.selectCell(this.linelen[ye - 1], ye - 1);
          }
        }
      }
      this.resetCursorBlinkInterval();
    }
    else if(e.code == 'ArrowRight') {
      var amount = 1;
      if(ctrl) {
        while(xe + amount < this.linelen[ye] && this.chargrid[ye][xe + amount] != ' ') amount++;
      }
      if((xe + 1 < w && this.freecursormode) || xe + 1 < this.linelen[ye] || false/*this.isrectangular*/) {
        if(shift) {
          this.changeRegion(xb, yb, xe + amount, ye);
        } else if(this.isrectangular) {
          this.changeRegion(xb + 1, yb, xe + 1, ye);
        } else {
          this.selectCell(xe + amount, ye);
        }
      } else if(ye + 1 < h && !this.freecursormode) {
        // end of line reached, go to beginning of next line; only intended for non rectangular non free cursor mode
        if(shift) {
          this.changeRegion(xb, yb, 1, ye + 1);
        } else {
          this.selectCell(0, ye + 1);
        }
      }
      this.resetCursorBlinkInterval();
    }
    else if(e.code == 'Insert') {
      this.toggleOverwriteMode();
    }
    else if(e.code == 'Escape') {
      // It is intuitive and makes sense that escape unselects blockselect and makes it 1 cursor again
      this.unselectRegion();

      // It is also intuitive that it ends pasting
      this.pasting = false;
      this.fillPastePreview();
    }
    else if(e.code == 'Home') {
      if(shift) {
        this.selectRegion(xb, yb, 0, ye);
      } else {
        this.selectCell(0, ye);
      }
      this.resetCursorBlinkInterval();
    }
    else if(e.code == 'End') {
      if(shift) {
        this.selectRegion(xb, yb, this.linelen[ye], ye);
      } else {
        var end = this.linelen[ye];
        if(end >= w) end--;
        if(end >= 0) this.selectCell(end, ye);
      }

      this.resetCursorBlinkInterval();
    }
    else if(e.code == 'Enter') {
      var end = this.linelen[y0];
      var op = new EditorOp();
      op.add0 = y0 + 1;
      op.add1 = y0 + 2;
      var lop = new LineOp(op, y0);
      lop.rem0 = x0;
      lop.rem1 = end;
      lop = new LineOp(op, y0 + 1);
      lop.add0 = 0;
      for(var x = x0; x < end; x++) {
        lop.add += this.chargrid[y0][x];
      }
      this.doOp(op);
      this.selectCell(0, y0 + 1);
    }
    else if(e.code == 'KeyZ' && ctrl && !shift) {
      this.undo();
    }
    else if((e.code == 'KeyZ' && ctrl && shift) || (e.code == 'KeyY' && ctrl)) {
      this.redo();
    }
    else if(e.code == 'Tab') {
      this.pasteText('  ', this.xi(), this.yi(), this.blockmode, true);
    }
    else if(ctrl && e.code == 'KeyA') {
      this.changeRegion(0, 0, w, h);
    }
    else {
      return true; // allow other keys to be handled by the browser
    }
    //this.updateDebugSideDiv();
    return false;
  };  // end of this.onkeydown

  this.insertLines_ = function(y0, y1) {
    var num = y1 - y0;
    h += num;
    for(var y = h - 1; y >= y1; y--) {
      var y2 = y - num;
      this.linelen[y] = this.linelen[y2];
      this.elrow[y] = this.elrow[y2];
      if (this.elrow[y]) this.elrow[y].style.top = (y * th) + 'px';
      this.elgrid[y] = this.elgrid[y2];
      this.chargrid[y] = this.chargrid[y2];
    }
    for(var y = y0; y < y1; y++) {
      this.chargrid[y] = [];
      this.elgrid[y] = [];
      this.elrow[y] = undefined;
      this.linelen[y] = 0;
      for(var x = 0; x < w; x++) {
        this.chargrid[y][x] = ' ';
      }
    }
    //this.div.style.height = (h * th + th * 64) + 'px';
    this.fitDiv();
  };

  this.removeLines_ = function(y0, y1) {
    for(var y = y0; y < y1; y++) {
      if(this.elrow[y]) util.removeElement(this.elrow[y]);
    }
    for(var y = y0; y + y1 - y0 < h; y++) {
      var y2 = y + y1 - y0;
      this.linelen[y] = this.linelen[y2];
      this.elrow[y] = this.elrow[y2];
      if (this.elrow[y]) this.elrow[y].style.top = (y * th) + 'px';
      this.elgrid[y] = this.elgrid[y2];
      this.chargrid[y] = this.chargrid[y2];
    }
    h -= y1 - y0;
    this.chargrid.length = h;
    this.elrow.length = h;
    this.elgrid.length = h;
    this.linelen.length = h;
    //this.div.style.height = (h * th + th * 64) + 'px';
  };


  // The width and height of the content could dynamically update as you type.
  // Knowing the height is easy: it's this.chargrid.length
  // The width however is the longest of all this.linelen, to efficiently know it requires maintaining sorted array.
  // We don't do such sorted array for now, instead only make it wider, never smaller. User can press a button to re-fit.
  this.fitDiv = function() {
    // correct w computed elsewhere
    h = this.chargrid.length;
    if(w == this.divWidth_ && h == this.divHeight_) return;
    this.divWidth_ = w;
    this.divHeight_ = h;

    this.div.style.height = (h * (th + 1)) + 'px';
    this.div.style.width = (w * (tw + 1)) + 'px';
  };

  // This one recomputes the true max line length
  this.recomputeFitDiv = function() {
    w = 0;
    for(var y = 0; y < h; y++) {
      if(!this.linelen[y]) continue; // could be undefined (nan)
      w = Math.max(w, this.linelen[y]);
    }
    h = this.chargrid.length;
    this.fitDiv();
  };

  // sets width to be at least w2 (if it's already equal or more, does nothing)
  this.ensureWidth = function(w2) {
    if(w >= w2) return;
    if(w2 > 1024) w2 = 1024; // avoid accidental huge sizes, which would make it too slow
    var w0 = w;
    w = w2;
    for(var y = 0; y < h; y++) {
      if(this.elrow[y]) this.elrow[y].style.width = (tw * w) + 'px';
      if(this.chargrid[y]) {
        for(var x = w0; x < w2; x++) {
          this.chargrid[y][x] = ' ';
        }
      }
    }
    this.contentWidth = w;
    //this.div.style.width = (w * tw + tw * 16) + 'px';
    //this.fitDiv();
  };

  this.ensureHeight = function(h2) {
    if(h >= h2) return;
    if(h2 > 32768) return; // avoid accidental huge sizes, which would make it too slow
    var h0 = h;
    h = h2;
    for(var y = h0; y < h2; y++) {
      this.chargrid[y] = [];
      this.elgrid[y] = [];
      this.elrow[y] = undefined;
      this.linelen[y] = 0;
      for(var x = 0; x < w; x++) {
        this.chargrid[y][x] = ' ';
      }
    }
    //this.div.style.height = (h * th + th * 64) + 'px';
    //this.fitDiv();
  };

  // Since block mode is also attached to overwrite mode, it'll also toggle block selection mode
  this.toggleOverwriteMode = function() {
    this.overwritemode = !this.overwritemode;
    this.freecursormode = this.overwritemode;
    this.blockmode = this.overwritemode;

    if(this.couldBeBoth()) this.isrectangular = this.overwritemode;

    this.reselectRegion();
    this.onchangemode_();
  };

  this.toText = function() {
    var result = '';
    for(var y = 0; y < this.elgrid.length; y++) {
      if(this.elgrid[y]) {
        for(var x = 0; x < this.elgrid[y].length; x++) {
          result += this.chargrid[y][x];
        }
      }
      result += '\n';
    }
    return result;
  };

  // Translate mouse coordinates to cursor position, for starting drag, that is, for xb,yb
  this.mouseSelXb = function(mousex) {
    if(this.overwritemode) {
      return Math.floor(mousex / tw);
    } else {
      // since in insert mode, you click to aim the cursor between two characters
      return Math.floor(mousex / tw + 0.5);
    }
  };

  // Translate mouse coordinates to cursor position, for starting drag, that is, for xb,yb
  this.mouseSelYb = function(mousey) {
    return Math.floor(mousey / th);
  };

  // Translate mouse coordinates to cursor position, for ending drag, that is, for xe,ye
  this.mouseSelXe = function(mousex) {
    if(this.overwritemode) {
      return Math.floor(mousex / tw);
    } else {
      return Math.floor(mousex / tw + 0.5);
    }
  };

  // Translate mouse coordinates to cursor position, for ending drag, that is, for xe,ye
  this.mouseSelYe = function(mousey) {
    return Math.floor(mousey / th);
  };

  // rectangular actually means newlines start at the same x as the first line rather than at 0
  // paste()
  /*
  TODO: Behavior the function should do:
  -overwrite and rectangular: insert the rectangule with its top left at the cursor, overwriting everything to the bottom right of it
  -overwrite and not rectangular: paste with the shape of non rectangular selection, but every newline starts at the x position of your cursor. And overwrite everythying
  -insert and rectangular: paste the rectangle with top left at the cursor, and everything appearing bottom right of it, not adding new lines (except if at bottom), but old text gets moved to the right
  -insert and non-rectangular: the bevior of a standard text editor, inserting new lines and pasting starting from beginning there when needed
  --> but actually, could do 8 combinations: all combinations of blockmode, overwritemode, rectangular. However, blockmode and overwritemode are linked so doesn't matter.
  */
  this.pasteText = function(text, x, y, rectangular, updatecursor, opt_override_overwrite) {
    var overwrite = (opt_override_overwrite == undefined) ? this.overwritemode : opt_override_overwrite;
    var origx = x;
    var origy = y;
    if(rectangular) {
      if(overwrite) {
        var starty = y;
        var largestx = x;
        var startx = x;
        var op = new EditorOp();
        var lop = new LineOp(op, y, x);
        for(var i = 0; i < text.length; i++) {
          var c = text[i];
          if(c == '\n') {
            y++;
            x = startx;
            lop = new LineOp(op, y, x);
            if(y >= h) {
              op.add0 = h;
              op.add1 = y + 1;
            }
            continue;
          }
          lop.add += c;
          x++;
          largestx = Math.max(x, largestx);
        }
        for(var i = 0; i < op.ops1.length; i++) {
          var lop = op.ops1[i];
          lop.rem0 = lop.add0;
          lop.rem1 = lop.add0 + lop.add.length;
        }
        this.doOp(op);
        if(updatecursor) this.selectCell(largestx, starty);
        else this.reselectRegion(); // otherwise it doesn't update the textarea.value with the changed content
      } else {
        var startx = 0;
        var op = new EditorOp();
        op.add0 = op.add1 = y + 1;
        var lop = new LineOp(op, y, x);
        var lastpiece = '';
        var multiline = false;
        for(var i = 0; i < text.length; i++) {
          var c = text[i];
          if(c == '\n') {
            if(!multiline) {
              multiline = true;
              for(var x2 = origx; x2 < this.linelen[origy]; x2++) {
                lastpiece += this.chargrid[origy][x2];
              }
            }
            y++;
            x = startx;
            lop = new LineOp(op, y, x);
            op.add1++;
            continue;
          }
          lop.add += c;
          x++;
        }
        this.doOp(op);
        if(updatecursor) this.selectCell(x, y);
        else this.reselectRegion(); // otherwise it doesn't update the textarea.value with the changed content
      }
    } else {
      if(overwrite) {
        var startx = x;
        var op = new EditorOp();
        var lop = new LineOp(op, y, x);
        for(var i = 0; i < text.length; i++) {
          var c = text[i];
          if(c == '\n') {
            y++;
            x = startx;
            lop = new LineOp(op, y, x);
            if(y >= h) {
              op.add0 = h;
              op.add1 = y + 1;
            }
            continue;
          }
          lop.add += c;
          x++;
        }
        for(var i = 0; i < op.ops1.length; i++) {
          var lop = op.ops1[i];
          lop.rem0 = lop.add0;
          lop.rem1 = lop.add0 + lop.add.length;
        }
        this.doOp(op);
        if(updatecursor) this.selectCell(x, y);
        else this.reselectRegion(); // otherwise it doesn't update the textarea.value with the changed content
      } else {
        var startx = 0;
        var op = new EditorOp();
        op.add0 = op.add1 = y + 1;
        var lop = new LineOp(op, y, x);
        var lastpiece = '';
        var multiline = false;
        for(var i = 0; i < text.length; i++) {
          var c = text[i];
          if(c == '\n') {
            if(!multiline) {
              multiline = true;
              for(var x2 = origx; x2 < this.linelen[origy]; x2++) {
                lastpiece += this.chargrid[origy][x2];
              }
            }
            y++;
            x = startx;
            lop = new LineOp(op, y, x);
            /*if(y >= h) {
              op.add0 = h;
              op.add1 = y + 1;
            }*/
            op.add1++;
            continue;
          }
          lop.add += c;
          x++;
        }
        this.doOp(op);
        if(updatecursor) this.selectCell(x, y);
        else this.reselectRegion(); // otherwise it doesn't update the textarea.value with the changed content
      }
    }
  };

  //// returns rectangular block selection as a string where each line is the same length.
  //this.copyRectangle = function() {
  //  if(!this.isFullyRectangular()) return "";
  //  return this.textarea.value;
  //};

  // returns the selected area as a string
  this.copy = function() {
    // the textarea is already kept up to date with the selection contents so we can just return its value
    // (an alternative is to compute it with this.extractSelectedText())
    return this.textarea.value;
  };

  // makes it be on immediately, good to use after arrow keys too
  this.resetCursorBlinkInterval = function() {
    if(this.cursorblinkinterval) window.clearInterval(this.cursorblinkinterval);
    var self = this;
    self.cursordiv.style.visibility = 'visible';
    this.cursorblinkinterval = window.setInterval(function() {
      self.cursordiv.style.visibility = (self.cursordiv.style.visibility == 'hidden') ? 'visible' : 'hidden';
    }, 500);
  };

  this.turnDown = function() {
    if(this.cursorblinkinterval) window.clearInterval(this.cursorblinkinterval);
    util.removeElement(this.div);
    util.removeElement(this.sidediv);
    this.div = undefined;
    this.sidediv = undefined;
    this.elgrid = [];
  };
};




////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function Editor() {
  this.div = undefined;
  this.sidediv = undefined;
  this.textarea = undefined; // EditComponent

  this.insertbutton = null;

  this.nb = 0; // number of buttons in sidediv

  this.makeSideButton = function() {
    //var button = util.makeAbsElement('span', 0, 0, 20, 20, this.sidediv);
    var button = util.makeAbsElement('div', 8, this.nb * 24, 50, 20, this.sidediv);
    button.style.border = '1px solid black';
    this.nb++;
    return button;
  };

  this.updateDebugSideDiv = function() {
    var area = this.textarea;
    var str = '';
    str += 's:&nbsp;' + w + '&nbsp;' + h;
    str += '<br>'
    str += 'b:&nbsp;' + area.xb + '&nbsp;' + area.yb;
    str += '<br>'
    str += 'e:&nbsp;' + area.xe + '&nbsp;' + area.ye;
    str += '<br>'
    str += 'i:&nbsp;' + area.xi() + '&nbsp;' + area.yi();
    str += '<br>'
    str += 'a:&nbsp;' + area.xa() + '&nbsp;' + area.ya();
    str += '<br>'
    str += 'r0:&nbsp;' + area.xr0() + '&nbsp;' + area.yr0();
    str += '<br>'
    str += 'r1:&nbsp;' + area.xr1() + '&nbsp;' + area.yr1();
    str += '<br>'
    str += 'm0:&nbsp;' + area.xm0() + '&nbsp;' + area.ym0();
    str += '<br>'
    str += 'm1:&nbsp;' + area.xm1() + '&nbsp;' + area.ym1();
    str += '<br>'
    str += (area.isrectangular ? 'r' : 'm');
    this.debugind.innerHTML = str;
  };

  this.setUp = function() {
    var sidedivwidth = 80;
    this.sidediv = makeDiv(0, 96, sidedivwidth, h * th);
    this.sidediv.style.backgroundColor = 'white';
    this.sidediv.style.position = 'fixed';
    this.sidediv.style.height = '100%';

    this.div = makeDiv(sidedivwidth + 10, 128, tw, th);

    this.textarea = new EditComponent();
    var area = this.textarea;
    area.setUp(0, 0, this.div);
    var self = this;

    area.onchange = function() {
      self.updateDebugSideDiv();
    };
    area.onchangesel = function() {
      self.updateDebugSideDiv();
    };
    area.onchangemode = function() {
      self.updateDebugSideDiv();
      self.updateOverwriteMode();
    };

    var button;

    button = this.makeSideButton();
    button.innerText = 'block';
    button.title = 'toggle block mode. Block mode enables rectangular regions, free cursor placement and overwrite mode and is good for circuit editing or ASCII art. Standard mode works like a standard text editor in insert mode and is good for comments or textual content.';
    button.onclick = function(e) {
      area.toggleOverwriteMode();
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };
    this.insertbutton = button;

    button = this.makeSideButton();
    button.innerText = 'stop';
    button.title = 'cancel any pasting';
    button.onclick = function(e) {
      area.pasting = false;
      area.fillPastePreview();
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    var dotransform = function(type) {
      if(area.pasting) {
        area.pastecontent = transform(area.pastecontent, type);
        area.fillPastePreview();
      } else if(area.isFullyRectangular()) {
        var x0 = area.xr0();
        var y0 = area.yr0();
        var x1 = area.xr1();
        var y1 = area.yr1();
        var text = area.copy();
        // non square area, if the transform rotates or transposes there is a part where content should be removed, write spaces in it
        var reshapes = (y1 - y0 != x1 - x0) && (type == 1 || type == 3 || type == 4 || type == 6);
        if(reshapes) {
          var spaces = '';
          for(var i = 0; i < text.length; i++) {
            if(text[i] == '\n') spaces += '\n';
            else spaces += ' ';
          }
          area.pasteText(spaces, x0, y0, true, true);
        }
        text = transform(text, type);
        area.pasteText(text, x0, y0, true, true);
        if(reshapes) {
          var x1b = x0 + y1 - y0;
          var y1b = y0 + x1 - x0;
          x1 = x1b;
          y1 = y1b;
          area.markMergeUndo();
        }
        area.selectRegion(x0, y0, x1 - 1, y1 - 1, true);
      } else {
        var text = area.toText();
        text = transform(text, type);
        area.clear();
        area.pasteText(text, 0, 0, true, false);
        area.markMergeUndo();
      }
    };

    var button = this.makeSideButton();
    button.innerText = 'rot R';
    button.title = 'rotate circuit right';
    button.onclick = function(e) {
      dotransform(1);
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    var button = this.makeSideButton();
    button.innerText = 'rot L';
    button.title = 'rotate circuit left';
    button.onclick = function(e) {
      dotransform(3);
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    var button = this.makeSideButton();
    button.innerText = 'mirror';
    button.title = 'horizontal mirror circuit';
    button.onclick = function(e) {
      dotransform(7);
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    var button = this.makeSideButton();
    button.innerText = 'flip';
    button.title = 'vertical mirror circuit';
    button.onclick = function(e) {
      dotransform(5);
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    button = this.makeSideButton();
    button.innerText = 'unselect';
    button.title = 'unselect test';
    button.onclick = function(e) {
      area.unselectRegion();
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    /*button = this.makeSideButton();
    button.innerText = 't';
    button.title = 'type test';
    button.onclick = function(e) {
      var op = new LineOp();
      op.y = area.yi();
      op.add0 = area.xi();
      op.add = 'a  f';

      op.rem0 = area.xi();
      op.rem1 = area.xi() + 4;

      var eop = new EditorOp();
      eop.ops1.push(op);
      area.doOp(eop);
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };*/

    button = this.makeSideButton();
    button.innerText = 'undo';
    button.title = 'undo';
    button.onclick = function(e) {
      area.undo();
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    button = this.makeSideButton();
    button.innerText = 'redo';
    button.title = 'redo';
    button.onclick = function(e) {
      area.redo();
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    /*button = this.makeSideButton();
    button.innerText = 'f';
    button.title = 'simply focus the area';
    button.onclick = function(e) {
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };*/

    button = this.makeSideButton();
    button.innerText = 'fit';
    button.title = 'fit div';
    button.onclick = function(e) {
      area.recomputeFitDiv();
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    button = this.makeSideButton();
    button.innerText = 'AND';
    button.title = 'pasting something test';
    button.onclick = function(e) {
      area.pastecontent = 's->a->l\n   #   \ns->#';
      area.pasting = !area.pasting;
      area.fillPastePreview();
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    button = this.makeSideButton();
    button.innerText = 'OR';
    button.title = 'pasting something test';
    button.onclick = function(e) {
      area.pastecontent = 's->o->l\n   #   \ns->#';
      area.pasting = !area.pasting;
      area.fillPastePreview();
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    button = this.makeSideButton();
    button.innerText = 'XOR';
    button.title = 'pasting something test';
    button.onclick = function(e) {
      area.pastecontent = 's->e->l\n   #   \ns->#';
      area.pasting = !area.pasting;
      area.fillPastePreview();
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    button = this.makeSideButton();
    button.innerText = 'JK';
    button.title = 'pasting something test';
    button.onclick = function(e) {
      area.pastecontent = 's->j->l\ns->k   \ns->c   ';
      area.pasting = !area.pasting;
      area.fillPastePreview();
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    button = this.makeSideButton();
    button.innerText = 'D';
    button.title = 'pasting something test';
    button.onclick = function(e) {
      area.pastecontent = 's->d->l\n   #   \ns->c   ';
      area.pasting = !area.pasting;
      area.fillPastePreview();
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    button = this.makeSideButton();
    button.innerText = 'T';
    button.title = 'pasting something test';
    button.onclick = function(e) {
      area.pastecontent = 's->t->l\n   #   \ns->c   ';
      area.pasting = !area.pasting;
      area.fillPastePreview();
      area.focusTextArea(); // every button must do this because they steal focus from the region
    };

    this.debugind = util.makeAbsElement('div', 8, this.nb * 24, 20, 20, this.sidediv); this.nb++;
    this.debugind.style.width = '32px';
    this.debugind.style.height = '32px';

    var overwritemode = util.getLocalStorage('overwritemode', 'true') == 'true';
    if(overwritemode != area.overwritemode) area.toggleOverwriteMode();

    var op = new EditorOp();
    op.add0 = 0;
    op.add1 = 0;
    for(var y = 0; y < world.length; y++) {
      var num = 0;
      for(var x = 0; x < world[y].length; x++) {
        if(world[y][x].symbol != ' ') num = x + 1;
      }
      if(y + 1 == world.length && num == 0) break;
      op.add1++;
      var lop = new LineOp(op, y);
      lop.add0 = 0;
      lop.add = '';
      for(var x = 0; x < num; x++) {
        lop.add += world[y][x].symbol;
      }
    }
    area.doOp(op);

    area.focusTextArea();
    this.updateOverwriteMode();
  };  // end of this.setup

  /*this.clear = function() {
    var op = new EditorOp();
    op.rem0 = 0;
    op.rem1 = this.chargrid.length;
    this.doOp(op);
  };*/

  this.onkeydown = function(e) {
    return this.textarea.onkeydown(e);
  };

  this.updateOverwriteMode = function() {
    util.setLocalStorage(this.textarea.overwritemode ? 'true' : 'false', 'overwritemode');
    this.insertbutton.style.backgroundColor = this.textarea.overwritemode ? 'red' : '';
    //if(this.isrectangular && this.xb == this.xe && this.overwritemode) this.xe = this.xb + 1;
    //if(this.isrectangular && this.xa() == this.xi() + 1 && !this.overwritemode) this.xb = this.xe = this.xi();
  };

  // returns the text
  this.turnDown = function() {
    var newtext = this.textarea.toText();
    this.textarea.turnDown();
    util.removeElement(this.div);
    util.removeElement(this.sidediv);
    return newtext;
  };
};

