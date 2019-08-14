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
This JS file contains various demo circuits and single devices,
and injects them into a dropdown from logicemu.js
*/

registerCircuitGroup('circuits');

registerTitle('Binary Logic');

registerCircuit('16 gates', `

0"Because a 2-input gate has 4 combinations of inputs, and for each input"
0"combination has some output, there are in total 2^4 = 16 different possible"
0"behaviours of 16-input gate. Here, all 16 are implemented and their"
0"properties and names from logic shown"


          "gate name     value      properties              logic name"

 * *
 * ***  **>l "ZERO"       "0"      0"nullary, symmetric"    0"contradiction"
 * *
 **+**
 * *
 * ***>a**>l "AND"       "a*b"     0"binary, symmetric"     0"conjunction"
 * *   ^
 **+****
 * *
 * ***>a**>l "a NIMPLY b""a>b"     0"universal, asymmetric" 0"nonimplication, abjunction"
 * *   m
 **+****
 * *
 * *******>l "A"          "a"      0"unary, asymmetric"     0"statement"
 * *
 **+**
 * *
 * ***]a**>l "b NIMPLY a" "a<b"    0"universal, asymmetric" 0"converse nonimplication"
 * *   ^
 **+****
 * *
 * *** ***>l "B"          "b"      0"unary, asymmetric"     0"statement"
 * *   *
 **+****
 * *
 * ***>e**>l "XOR"       "a!=b"    0"binary, symmetric"     0"exclusive disjunction"
 * *   ^               "a+b mod 2"
 **+****
 * *
 * ***>o**>l "OR"        "a+b"     0"binary, symmetric"     0"(inclusive) disjunction"
 * *   ^
 **+****
 * *
 * ***>O**>l "NOR"                 0"universal, symmetric"  0"joint denial"
 * *   ^
 **+****
 * *
 * ***>E**>l "XNOR, EQV" "a==b"    0"binary, symmetric"     0"biconditional"
 * *   ^
 **+****
 * *
 * *** O**>l "NOT B"               0"unary, asymmetric"     0"negation"
 * *   ^
 **+****
 * *
 * ***>o**>l "a IMPLY b" "a>=b"    0"universal, asymmetric" 0"converse implication"
 * *   m
 **+****
 * *
 * ***>O**>l "NOT A"               0"unary, asymmetric"     0"negation"
 * *
 **+**
 * *
 * ***]o**>l "a IMPLY b" "a<=b"    0"universal, asymmetric" 0"implication"
 * *   ^
 **+****
 * *
 * ***>A**>l "NAND"                0"universal, symmetric"  0"alternative denial"
 * *   ^
 **+****
 * *
 * *** O**>l "ONE"        "1"      0"nullary, symmetric"    0"tautology"
 * *
 **+**
 * *
 * *
 * *
 s s

"b a"

0"FIT:y FIT:w"

0"Configurable gate"

0"You can set this to any of the 16 logic gates with the 4 control switches."
0"Enable a switch to make that input combination true, otherwise it is false."
0"E.g. enable switch '10' and '01' to make it behave like a XOR gate."
0"NOTE: in reality, the final 4 ands might be replaced by tristate buffers,"
0"and the large or would then not be needed, just combine the wires together."


   l
   ^
   *
   *
   o############
   ^   ^   ^   ^
   *   *   *   *
   a<--+---+---+------------s "11"
   ^   a<--+---+------------s "10"
   *   ^   a<--+------------s "01"
   *   *   ^   a<-----------s "00"
   *   *   *   ^
   a<* a<* a[* a[*
   ^ * m * ^ * m *
   **+***+***+** *
   * *   *   *   *
   * *************
   * *
   * *
   s s

`, 'gates16');


registerCircuit('mux & demux', `

0"The multiplexer (mux) brings one of two signals to the output"
0"The demultiplexer (demux) brings one input to one of the two outputs"


    "mux"                "demux"

      *                     *
      *                     *
  s***+>a>o**>l         s***+>a**>l
      * m ^               * * m
      *** *               * ***
      * v *               * * v
  s***+>a**               **+>a**>l
      *                     *
      *                     *
      s                     s

 "select"                "select"


0"8-bit mux"


     l     l     l     l     l     l     l     l
     ^     ^     ^     ^     ^     ^     ^     ^
     *     *     *     *     *     *     *     *
   *>o<* *>o<* *>o<* *>o<* *>o<* *>o<* *>o<* *>o<*
   *   * *   * *   * *   * *   * *   * *   * *   *
   a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
   ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
   * * * * * * * * * * * * * * * * * * * * * * * *
***+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+****s"select"
   *   * *   * *   * *   * *   * *   * *   * *   *
   *   * *   * *   * *   * *   * *   * *   * *   *
   *   s *   s *   s *   s *   s *   s *   s *   s
   *     *     *     *     *     *     *     *
   s     s     s     s     s     s     s     s

`, 'mux');


registerTitle('Arithmetic');

registerCircuit('half adder', `

0"The half adder adds two 1-bit values. The output can represent 0, 1 or 2. The"
0"bit output by the XOR gate has value 1, the bit output by the AND gate has"
0"value 2."

 l l
 ^ ^
 * *
 a e
 ^^^
 * *
 s s

0"Chained as increment operation: this can add 1 to the 4-bit input number"


      l   l   l   l
      ^   ^   ^   ^
l<**a e a e a e a e **S
    ^^^/^^^/^^^/^^^/
    s * s * s * s *



`, 'half_adder');



registerCircuit('full adder', `

0"The full adder is made from two half adders (each pair of a+e gate is a half"
0"adder). It sums 3 1-bit numbers (or 2 bits of a 1-bit number, and the third"
0"bit being the carry, see the ripple carry circuit for that), and outputs a"
0"2-bit number"

 "c   s"                     "s"
  l   l                       l
  ^   ^                       ^
  *   *                       *
  o<a e          "c"l<****o<a e *****s"c"
  ^ ^^^                   ^ ^^^/
  a e *                   a e *
  ^^^ *                   ^^^
  * * *                   * *
  * * *                   * *
  s s s                   s s
 "a b c"                 "a b"

0"Placing multiple in a row (ripple carry adder, more info in next circuit):"

        "128"  "64"  "32"  "16"  "8"   "4"   "2"   "1"
          l     l     l     l     l     l     l     l
          ^     ^     ^     ^     ^     ^     ^     ^
    l<o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e s
      ^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/
      a e * a e * a e * a e * a e * a e * a e * a e *
      ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^
      * *   * *   * *   * *   * *   * *   * *   * *
      * *   * *   * *   * *   * *   * *   * *   * *
      s *   s *   s *   s *   s *   s *   s *   s *
        *     *     *     *     *     *     *     *
        s     s     s     s     s     s     s     s

`, 'full_adder');


registerCircuit('8-bit ripple carry adder', `

0"The 8-bit ripple carry has 8 full adders, configured to pass on the carry. If"
0"you add 1 to 255, you get the slowest possible ripple. The longest path is as"
0"long as the amount of bits, so this type of adder is slow and not used in"
0"practice (see carry lookahead adder next)"


            "128"  "64"  "32"  "16"  "8"   "4"   "2"   "1"
              l     l     l     l     l     l     l     l
              ^     ^     ^     ^     ^     ^     ^     ^
 "carry"l<o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e s"carry"
          ^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/
          a e * a e * a e * a e * a e * a e * a e * a e *
          ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^
          * *   * *   * *   * *   * *   * *   * *   * *
          * *   * *   * *   * *   * *   * *   * *   * *
          * ,---+-+---+-+---+-+---+-+---+-+---+-+---+-+-*
          * ,---* *---+-+---+-+---+-+---+-+---+-+---+-+-+-*
          * * *-------* *---+-+---+-+---+-+---+-+---+-+-+-+-*
          * * * *-----------* *---+-+---+-+---+-+---+-+-+-+-+-*
          * * * * *---------------* *---+-+---+-+---+-+-+-+-+-+-*
          * * * * * *-------------------* *---+-+---+-+-+-+-+-+-+-*
          * * * * * * *-----------------------* *---+-+-+-+-+-+-+-+-*
          * * * * * * * *---------------------------* *-+-+-+-+-+-+-+-*
          * * * * * * * *                               * * * * * * * *
          * * * * * * * *                               * * * * * * * *
          s s s s s s s s                               s s s s s s s s
     "a" "1 6 3 1 8 4 2 1"                         "b" "1 6 3 1 8 4 2 1"
         "2 4 2 6        "                             "2 4 2 6        "
         "8              "                             "8              "


0"Note: The adder logic is in the gates at the top. The omnious looking wires"
0"at the bottom have no logic and are there only to separate the A and B inputs."



`, 'ripple_carry_adder');


registerCircuit('4-bit carry lookahead adder', `

0"MODE:electron (set to electron by default to show the gate delays)"

0"The carry lookahead adder is faster than the ripple carry adder. A ripple"
0"carry adder is slow because the longest path goes through all the full"
0"adders."

0"Lookahead of the expected carry rather than letting it ripple through makes"
0"the adder faster, at the cost of more logic (especially many multi-input"
0"AND/OR gates)"

0"At the bottom are the standard full adders, except they are missing an AND"
0"and an OR (the lookahead unit has many big ones of those instead), and the"
0"outputs of their first half adder is given to the lookahead unit."

0"The left part computes things that are not needed for this 4-bit adder but"
0"can be used to chain multiple CLA's together. pg,gg to make a recursively"
0"bigger CLA, or c4 to ripple CLA's instead. Note that there is some serious"
0"redundancy in the left part, since c4 can be computed as (pg AND c0) OR gg,"
0"but that would add one more gate delay and this circuit is demonstrating the"
0"absolute max speed"

0"The one-input AND and OR gates represent buffers. Without them, some signals"
0"have different lengths of gate delay and cause some garbage flickering. They"
0"cause no slowdown since only the longest path matters."

0"CLA = carry lookahead adder: this whole circuit"
0"LCU = lookahead carry unit: the logic excluding the full adders"
0"c = carry, g = carry generator (from AND), p = carry propagator (from XOR),"
0"pg = group prop., gg = group gen."

0"carry propagate will go on if adding 1 more bit to the input would cause a"
0"carry out."
0"carry generate will go on if a carry got generated in this 4-bit sum itself,"
0"but not due to the external input carry"

 2"c0"--------------------------------------------*-------------------*------------*--------*-----*---s"c0"
 2"p0"--------*----------------------------------*+------------------*+-----------*+-------*+---* *
 2"g0"--------+-------------*---------------*----++--------------*---++--------*--++-----*-++-* * *
 2"p1"-------*+------------*+--------------*+---*++-------------*+--*++-------*+-*++---* * || * * *
 2"g1"-------++--------*---++----------*---++---+++----------*--++--+++-----*-++-+++-* * * || * * *
 2"p2"------*++-------*+--*++---------*+--*++--*+++---------*+-*++-*+++---* * || ||| * * * || * * *
 2"g2"------+++----*--++--+++------*--++--+++--++++-------*-++-+++-++++-* * * || ||| * * * || * * *
 2"p3"-----*+++---*+-*++-*+++-----*+-*++-*+++-*++++-----* * || ||| |||| * * * || ||| * * * || * * *
 2"g3"-----++++-*-++-+++-++++---*-++-+++-++++-+++++---* * * || ||| |||| * * * || ||| * * * || * * *
           vvvv v vv vvv vvvv   v vv vvv vvvv vvvvv   * * v vv vvv vvvv * * v vv vvv * * v vv * * v
           a### a a# a## a###   a a# a## a### a####   * * a a# a## a### * * a a# a## * * a a# * * a
           v    v v  v   v      v v  v   v    v       * * v v  v   v    * * v v  v   * * v v  * * v
           o    o#########      o##############       * * o#########    * * o#####   * * o##  * * o
 2"pg"l<---*    *               |                     * * *"c3"         * * *"c2"    * * *"c1"* * *
 2"gg"l<--------*               |                     * * *             * * *        * * *    * * *
 2"c4"l<------------------------*                     * * *             * * *        * * *    * * *
                                                      * * *             * * *        * * *    * * *
                                                      * * * l           * * * l      * * * l  * * * l
                                                      * * v ^           * * v ^      * * v ^  * * v ^
                                                      * *>e**           * *>e**      * *>e**  * *>e**
                                                      * *               * *          * *      * *
                                                      a e               a e          a e      a e
                                                      ^^^               ^^^          ^^^      ^^^
                                                      * *               * *          * *      * *
                                                      * *               * *          * *      * *
                                                      s s               s s          s s      s s

0"There are many ways to extend this adder to more than 4 bits: Keep doing the"
0"same as above with more and more and bigger and bigger AND and OR gates for"
0"every next bit. This is the fastest but most expensive. Recursively create a"
0"16-bit adder from 4 of the above CLA, and so on. This is the middle ground in"
0"cost/speed. Ripple multiple of the above CLA's. This is slower but cheaper,"
0"and still faster than rippling every single bit (which would be an even"
0"slower but even cheaper option). And then, even more tradeoffs can be made by"
0"doing any of the above with other sizes than 4-bit CLA's."

`, 'cla_adder');


registerCircuit('half subtractor', `

"+-----+-----+"  "l=loan (borrow)"
"| a b | d l |"  "d=difference"
"+-----+-----+"
"| 0 0 | 0 0 |"
"| 0 1 | 1 1 |"
"| 1 0 | 1 0 |"
"| 1 1 | 0 0 |"
"+-----+-----+"

"l d"

 l l
 ^ ^
 * *
 a e
 m^^
 * *
 * *
 s s

"a b"

`, 'half_sub');


registerCircuit('full subtractor', `

0"Note: The full subtractor is similar to the adder, and in practice you don't"
0"need a separate circuit like this to subtract, you can also use a full adder,"
0"invert the bits of B and add 1 to B"

"+-------+-----+"  "l=loan (borrow)"
"| a b l | d l |"  "d=difference"
"+-------+-----+"
"| 0 0 0 | 0 0 |"
"| 0 0 1 | 1 1 |"
"| 0 1 0 | 1 1 |"
"| 0 1 1 | 0 1 |"
"| 1 0 0 | 1 0 |"
"| 1 0 1 | 0 0 |"
"| 1 1 0 | 0 0 |"
"| 1 1 1 | 1 1 |"
"+-------+-----+"


              "d"                   "d"

               l                     l
               ^                     ^
    "l"l<--o<a e **s"l"   "l"l<--o<a e **s"l"
           ^ m^^/                ^ m^^/
           a e *                 a e *
           m^^                   ^mm
           * *                   * *
           | |                   | |
           s s                   s s

          "a b"                 "b a"


0"Placing multiple in a row (ripple carry subtractor, more info in next circuit):"

        "128"  "64"  "32"  "16"  "8"   "4"   "2"   "1"
          l     l     l     l     l     l     l     l
          ^     ^     ^     ^     ^     ^     ^     ^
    l<o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e s
      ^ m^^/^ m^^/^ m^^/^ m^^/^ m^^/^ m^^/^ m^^/^ m^^/
      a e * a e * a e * a e * a e * a e * a e * a e *
      m^^   m^^   m^^   m^^   m^^   m^^   m^^   m^^
      * *   * *   * *   * *   * *   * *   * *   * *
      * *   * *   * *   * *   * *   * *   * *   * *
      s *   s *   s *   s *   s *   s *   s *   s *
        *     *     *     *     *     *     *     *
        s     s     s     s     s     s     s     s


`, 'full_sub');


registerCircuit('8-bit comparator', `

0"Note: in practice you don't need a separate circuit like this, you can use"
0"the full adder, to subtract, and look at the carry bit of the result, see the"
0"ALU circuit for more on that."



 "a < = > b"      "a < = b"
    l l l            l l
    ^ ^ ^            ^ ^
    * * *            * *
    a E a            a E
    m^ ^m            m^^
    * x *            * *
    ** **            * *
    *   *            s s
    s   s           "a b"
   "a   b"


 p****>o****>o****>o****>o****>o****>o****>o****>o*********>l "a < b"
       ^     ^     ^     ^     ^     ^     ^     ^        *
 P*****+>a***+>a***+>a***+>a***+>a***+>a***+>a***+>a******+>l "a = b"
     * * ^ * * ^ * * ^ * * ^ * * ^ * * ^ * * ^ * * ^   *  w
     * * * * * * * * * * * * * * * * * * * * * * * *   **]a>l "a > b"
     *>a E *>a E *>a E *>a E *>a E *>a E *>a E *>a E
       m^^   m^^   m^^   m^^   m^^   m^^   m^^   m^^
       * *   * *   * *   * *   * *   * *   * *   * *
       * *   * *   * *   * *   * *   * *   * *   * *
       s *   s *   s *   s *   s *   s *   s *   s *
   "a128"*"a64"*"a32"*"a16"*" a8"*" a4"*" a2"*" a1"*
         s     s     s     s     s     s     s     s
     "b128   b64   b32   b16    b8    b4    b2    b1"


`, 'comparator');


registerCircuit('8-bit ALU from adder', `


0"Earlier circuits demonstrated the adder, subtractor and comparator. You don't"
0"need all those three separate circuits to compute any of those however, with"
0"just an adder you can do all those operations. An ALU in a CPU, at a very"
0"basic level, does exactly that: It usually includes an adder to do various"
0"different computations."

0"In twos complement binary notation, subtracting a-b can be done by inverting"
0"the bits of b and adding 1. So before the adder inputs, put a circuit that"
0"can optionally negate b's bits (with xor gates), and adding 1 can be done"
0"with the carry input."

0"Comparing can be done by subtracting and then looking at the carry out: when"
0"subtracting a-b, it will be high when a >= b, low when a < b. To test for"
0"equality, use a many-input NOR gate to check if all out bits are zero."

0"The build below does this, and is operated as follows:"
0"The operation depends on the 3 input flags of the right side:"
0"none: ADD"
0"zb,c: INCREMENT"
0"nb,c: SUBTRACT, COMPARE: z: 'a == b', c': 'a >= b'"
0"nb,zb: DECREMENT"

                 "128"  "64"  "32"  "16"  "8"   "4"   "2"   "1"

                   l     l     l     l     l     l     l     l
                   ^     ^     ^     ^     ^     ^     ^     ^
                   *     *     *     *     *     *     *     *
 2"z: zero"l<****O<+***o<+***o<+***o<+***o<+***o<+***o<+***o<+
                 ^ *   ^ *   ^ *   ^ *   ^ *   ^ *   ^ *   ^ *
                 ***   ***   ***   ***   ***   ***   ***   ***
                   *     *     *     *     *     *     *     *
2"c: carry"l<**o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e *************s 0"c: carry in: add 1"
     2"out"    ^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/
               a e * a e * a e * a e * a e * a e * a e * a e *
               ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^
               * *   * *   * *   * *   * *   * *   * *   * *
               * *   * *   * *   * *   * *   * *   * *   * *
               * ,---+-+---+-+---+-+---+-+---+-+---+-+---+-+-*
               * ,---* *---+-+---+-+---+-+---+-+---+-+---+-+-+---*
               * * *-------* *---+-+---+-+---+-+---+-+---+-+-+---+---*
               * * * *-----------* *---+-+---+-+---+-+---+-+-+---+---+---*
               * * * * *---------------* *---+-+---+-+---+-+-+---+---+---+---*
               * * * * * *-------------------* *---+-+---+-+-+---+---+---+---+---*
               * * * * * * *-----------------------* *---+-+-+---+---+---+---+---+---*
               * * * * * * * *---------------------------* *-+---+---+---+---+---+---+---*
               * * * * * * * *                               *   *   *   *   *   *   *   *
               * * * * * * * *                               * **+***+***+***+***+***+***+****s 0"nb: negate b"
               * * * * * * * *                               * * * * * * * * * * * * * * * *    0"(bitwise not)"
               * * * * * * * *                               e<* e<* e<* e<* e<* e<* e<* e<*
               * * * * * * * *                               ^   ^   ^   ^   ^   ^   ^   ^
               * * * * * * * *                               *   *   *   *   *   *   *   *
               * * * * * * * *                               * **+***+***+***+***+***+***+****s 0"zb: zero b"
               * * * * * * * *                               * * * * * * * * * * * * * * * *
               * * * * * * * *                               a[* a[* a[* a[* a[* a[* a[* a[*
               * * * * * * * *                               ^   ^   ^   ^   ^   ^   ^   ^
               * * * * * * * *                               *   *   *   *   *   *   *   *
               s s s s s s s s                               s   s   s   s   s   s   s   s
          "a" "1 6 3 1 8 4 2 1"                         "b" "1   6   3   1   8   4   2   1"
              "2 4 2 6        "                             "2   4   2   6                "
              "8              "                             "8                            "

`, 'alu');

registerCircuit('2-bit multiplier', `

0"This circuit multiplies two 2-bit numbers"


 "a1"s******>a**********>l"r1"
         *   ^
         * ***
         * *
 "a2"s** **+>a**>e******>l"r2"
       *   * ^ * ^
       * **+** * *
       * * *   * *
 "b1"s*+*+**>a*+** *>e**>l"r4"
       * *   ^ * v * ^
       **+**** *>a*+**
         *   v     * v
 "b2"s******>a******>a**>l"r8"


`, 'mul2');

registerCircuit('4-bit multiplier', `

0"Multiplication can be done with the shift-and-add algorithm: To multiply"
0"number A with n-bit number B: Initialize a result value at 0. Then n times,"
0"if the n-th bit of B is 1, add A to the result, and always shift A left by 1."
0"This can be done sequentially with an algorithm, but here it is done as one"
0"entire combinational circuit in hardware, so with n layers of adders. To"
0"multiply two 4-bit numbers, that gives 4 4-bit adders, for a total of 16 full"
0"adders."

0"The main unit is the following 1-bit full adder with a few extra's. The carry"
0"c works as usual within a 4-bit adder. The bit 'b' is the bit matching the"
0"current stage from the second number we are multiplying. It ANDs the 'a'"
0"input of the adder to disable it if 0. We also output 'a' again at the top to"
0"apply the left-shift for the next stage, and pass 'b' through to the left"
0"because it must be applied to all adders of this stage. 'r' will eventually"
0"become a final result bit after it went through all stages."

             "a     r"
              l     l
              ^     ^
              *     *
       "c"l<**+*o<a e%*****s"c"
              * ^ ^^^|
              * a e *%
              * ^^^
              * * *
       "b"l<**+*+*+*********s"b"
              * * * *
        ******+** a<*
        *     *   ^
        *     *****
        *     *
        s     s
       "r     a"


0"Note how the shifting is done: rather than physically shifting a left,"
0"instead in this implementation 'a' goes up vertically and instead r shifts to"
0"the right. That boils down to the exact same thing, but it allows the circuit"
0"to be square shaped rather than a parallellogram."

0"To operate the circuit, enter a binary a at the bottom row, and a binary b at"
0"the right column. Then read the output in the 8 output LEDs, the ones in the"
0"right column are the 4 LSBs of the output, the top ones the 4 MSBs."
0"Multiplying two 4-bit numbers can give an 8-bit result."


  "r128      r64       r32       r16"
    l         l         l         l            *>l"r8"
    ^         ^         ^         ^           /
    *   *     *   *     *   *     *   *      /
    *   *     *   *     *   *     *   *     *
    ****+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%*
        * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|
        * a e *%  * a e *%  * a e *%  * a e *%
        * ^^^     * ^^^     * ^^^     * ^^^
        * * *     * * *     * * *     * * *
       *+*+*+*****+*+*+*****+*+*+*****+*+*+****s"b8"
        * * * *   * * * *   * * * *   * * * *
       *+** a<*  *+** a<*  *+** a<*  *+** a<*  *>l"r4"
      / *   ^   / *   ^   / *   ^   / *   ^   /
     /  *****  /  *****  /  *****  /  *****  /
    *   *     *   *     *   *     *   *     *
    ****+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%*
        * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|
        * a e *%  * a e *%  * a e *%  * a e *%
        * ^^^     * ^^^     * ^^^     * ^^^
        * * *     * * *     * * *     * * *
       *+*+*+*****+*+*+*****+*+*+*****+*+*+****s"b4"
        * * * *   * * * *   * * * *   * * * *
       *+** a<*  *+** a<*  *+** a<*  *+** a<*  *>l"r2"
      / *   ^   / *   ^   / *   ^   / *   ^   /
     /  *****  /  *****  /  *****  /  *****  /
    *   *     *   *     *   *     *   *     *
    ****+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%*
        * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|
        * a e *%  * a e *%  * a e *%  * a e *%
        * ^^^     * ^^^     * ^^^     * ^^^
        * * *     * * *     * * *     * * *
       *+*+*+*****+*+*+*****+*+*+*****+*+*+****s"b2"
        * * * *   * * * *   * * * *   * * * *
       *+** a<*  *+** a<*  *+** a<*  *+** a<*  *>l"r1"
      / *   ^   / *   ^   / *   ^   / *   ^   /
     /  *****  /  *****  /  *****  /  *****  /
    *   *     *   *     *   *     *   *     *
    ****+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%*
        * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|
        * a e *%  * a e *%  * a e *%  * a e *%
        * ^^^     * ^^^     * ^^^     * ^^^
        * * *     * * *     * * *     * * *
       *+*+*+*****+*+*+*****+*+*+*****+*+*+****s"b1"
        * * * *   * * * *   * * * *   * * * *
       *+** a<*  *+** a<*  *+** a<*  *+** a<*
      / *   ^   / *   ^   / *   ^   / *   ^
     /  *****  /  *****  /  *****  /  *****
    *   *     *   *     *   *     *   *
    *   *     *   *     *   *     *   *
        s         s         s         s
       "a8        a4        a2        a1"





`, 'multiply');


registerCircuit('8-bit multiplier', `


0"8-bit multiplier: made from 8 8-bit adders"

0"See the 4-bit multiplier for the explanation. This one is simply bigger"


   "r32768    r16384    r8192     r4096     r2048     r1024     r512      r256"
    l         l         l         l         l         l         l         l            *>l"r128"
    ^         ^         ^         ^         ^         ^         ^         ^           /
    *   *     *   *     *   *     *   *     *   *     *   *     *   *     *   *      /
    *   *     *   *     *   *     *   *     *   *     *   *     *   *     *   *     *
    ****+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%*
        * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|
        * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%
        * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^
        * * *     * * *     * * *     * * *     * * *     * * *     * * *     * * *
       *+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+****s"b128"
        * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *
       *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *>l"r64"
      / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   /
     /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /
    *   *     *   *     *   *     *   *     *   *     *   *     *   *     *   *     *
    ****+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%*
        * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|
        * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%
        * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^
        * * *     * * *     * * *     * * *     * * *     * * *     * * *     * * *
       *+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+****s"b64"
        * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *
       *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *>l"r32"
      / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   /
     /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /
    *   *     *   *     *   *     *   *     *   *     *   *     *   *     *   *     *
    ****+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%*
        * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|
        * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%
        * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^
        * * *     * * *     * * *     * * *     * * *     * * *     * * *     * * *
       *+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+****s"b32"
        * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *
       *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *>l"r16"
      / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   /
     /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /
    *   *     *   *     *   *     *   *     *   *     *   *     *   *     *   *     *
    ****+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%*
        * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|
        * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%
        * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^
        * * *     * * *     * * *     * * *     * * *     * * *     * * *     * * *
       *+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+****s"b16"
        * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *
       *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *>l"r8"
      / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   /
     /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /
    *   *     *   *     *   *     *   *     *   *     *   *     *   *     *   *     *
    ****+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%*
        * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|
        * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%
        * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^
        * * *     * * *     * * *     * * *     * * *     * * *     * * *     * * *
       *+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+****s"b8"
        * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *
       *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *>l"r4"
      / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   /
     /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /
    *   *     *   *     *   *     *   *     *   *     *   *     *   *     *   *     *
    ****+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%*
        * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|
        * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%
        * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^
        * * *     * * *     * * *     * * *     * * *     * * *     * * *     * * *
       *+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+****s"b4"
        * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *
       *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *>l"r2"
      / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   /
     /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /
    *   *     *   *     *   *     *   *     *   *     *   *     *   *     *   *     *
    ****+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%*
        * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|
        * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%
        * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^
        * * *     * * *     * * *     * * *     * * *     * * *     * * *     * * *
       *+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+****s"b2"
        * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *
       *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *>l"r1"
      / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   /
     /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /
    *   *     *   *     *   *     *   *     *   *     *   *     *   *     *   *     *
    ****+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%**+*o<a e%*
        * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|  * ^ ^^^|
        * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%  * a e *%
        * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^     * ^^^
        * * *     * * *     * * *     * * *     * * *     * * *     * * *     * * *
       *+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+*****+*+*+****s"b1"
        * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *   * * * *
       *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*  *+** a<*
      / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^   / *   ^
     /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****  /  *****
    *   *     *   *     *   *     *   *     *   *     *   *     *   *     *   *
    *   *     *   *     *   *     *   *     *   *     *   *     *   *     *   *
        s         s         s         s         s         s         s         s
       "a128      a64       a32       a16       a8        a4        a2        a1"



0"FIT:y"

`, 'mul8');


registerCircuit('4-bit divider', `


0"Division of two binary n-bit numbers A/B to get quotient Q and remainder R"
0"can be done with the following algorithm (long division): Initialize Q and R"
0"at 0. Do n times (i=0..n-1): Left shift R by 1 bit. Set R's least significant"
0"bit to bit #i of A. If R >= B, then subtract B from R and set bit #i of Q to"
0"1."

0"This can be computed sequentially as an algorithm, but here we build a full"
0"combinational implementation with gates. Since there are n subtractions (and"
0"n is 4 for 4-bit dividers) that means there will be 4 4-bit subtractors."

0"The base unit is a subtractor with a few extras:"


       "b" "r-b, r"
        l     l
        ^     ^
        *     o<*
        *     ^ *
        *   *]a a<*
        *   * ^ ^ *
   "q"s*+*****+*+****>l"q"
        *     * *
   "l"l<+*o<a e * ****s"l"
        * ^ m^^ * *
        * a e **+**
        * ^mm   *
        *** *****
        *   *
        s   s
       "b   r"

0"This implements the algorithm as follows: the subtractor inputs are the"
0"corresponding r and b bits of the R and B inputs. The l is the loan and works"
0"as usual in the full 4-bit subtractor unit this is part of. On top, a"
0"multiplexer is added, which can choose between the subtractor output r-b, or"
0"between copying the input r. The choice is made by the q bit output by this"
0"4-bit layer, and that q bit is the loan of the leftmost (MSB) full adder of"
0"this 4-bit layer (the inverse of it will be output). This matches the"
0"algorithm as follows: this leftmost load bit is true if r < b, and by"
0"controlling the mux this implements the 'if R >= B' and outputs R itself, or"
0"R with B subtracted, as seen in the algo, as the next R. The rightmost R bit"
0"will be set to the corresponding bit of A (adding 1 to R where needed), and R"
0"is left shifted implicitely through the wiring between each layer."

0"Here is one of the 4 layers. Note how a single bit of A is input from the"
0"right as rightmost R bit, and all bits from B are used. Also note how the"
0"MUXes of all subtractors are controlled by the result of the leftmost"
0"subtractor, making this algorithm slow since this happens at every layer, so"
0"the computation has to cross every single subtractor all the time (the"
0"multiplier did not suffer from such slowness). Also note how the B inputs are"
0"passed through to the top, ready to go to the next layer. The output"
0"remainder bits will be left shifted (and r8 discarded) for the next layer."

               "r8           r4           r2           r1"
                l            l            l            l
                ^            ^            ^            ^
                *            *            *            *
                o<*          o<*          o<*          o<*
                ^ *          ^ *          ^ *          ^ *
          *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
          *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
       ***+*****+*+****+*****+*+****+*****+*+****+*****+*+*****
       *  *     * *    *     * *    *     * *    *     * *
  "q"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***s"l"
          * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
          * a e **+**  * a e **+**  * a e **+**  * a e **+**
          * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
          *** *****    *** *****    *** *****    *** *****
          *   *        *   *        *   *        *   *
          s   s        s   s        s   s        s   **********s"a"
         "b8 r8        b4 r4        b2 r2        b1"


0"Finally, combining all stages together, to get the full 4-bit divider. It"
0"computes a / b, and outputs the quotient on the left, and the remainder at"
0"the top, all 4-bit numbers. Look carefully which of the bits are the LSB"
0"(marked with 1) and MSB (marked with 8) of each of those 4 numbers..."


                l            l            l            l
                ^            ^            ^            ^
                *            *            *            *
                o<*          o<*          o<*          o<*
                ^ *          ^ *          ^ *          ^ *
          *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
          *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
       ***+*****+*+****+*****+*+****+*****+*+****+*****+*+***
       *  *     * *    *     * *    *     * *    *     * *
 "q1"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
          * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
          * a e **+**  * a e **+**  * a e **+**  * a e **+**
          * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
          *** *******  *** *******  *** *******  *** *********s"a1"
          *         *  *         *  *         *  *
       ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
          *     ^ *    *     ^ *    *     ^ *    *     ^ *
          *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
          *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
       ***+*****+*+****+*****+*+****+*****+*+****+*****+*+***
       *  *     * *    *     * *    *     * *    *     * *
 "q2"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
          * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
          * a e **+**  * a e **+**  * a e **+**  * a e **+**
          * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
          *** *******  *** *******  *** *******  *** *********s"a2"
          *         *  *         *  *         *  *
       ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
          *     ^ *    *     ^ *    *     ^ *    *     ^ *
          *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
          *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
       ***+*****+*+****+*****+*+****+*****+*+****+*****+*+***
       *  *     * *    *     * *    *     * *    *     * *
 "q4"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
          * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
          * a e **+**  * a e **+**  * a e **+**  * a e **+**
          * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
          *** *******  *** *******  *** *******  *** *********s"a4"
          *         *  *         *  *         *  *
       ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
          *     ^ *    *     ^ *    *     ^ *    *     ^ *
          *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
          *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
       ***+*****+*+****+*****+*+****+*****+*+****+*****+*+***
       *  *     * *    *     * *    *     * *    *     * *
 "q8"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
          * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
          * a e **+**  * a e **+**  * a e **+**  * a e **+**
          * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
          *** *****    *** *****    *** *****    *** *********s"a8"
          *            *            *            *
          s            s            s            s
         "b8           b4           b2           b1"


`, 'divide');




registerCircuit('8-bit divider', `

0"8-bit divider. See the 4-bit divider circuit for the explanation. This one is"
0"simply bigger."

0"Enable electron mode to see how slow it operates!"

                 "r128         r64          r32          r16          r8           r4           r2           r1"
                  l            l            l            l            l            l            l            l
                  ^            ^            ^            ^            ^            ^            ^            ^
                  *            *            *            *            *            *            *            *
                  o<*          o<*          o<*          o<*          o<*          o<*          o<*          o<*
                  ^ *          ^ *          ^ *          ^ *          ^ *          ^ *          ^ *          ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
   "q1"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********s"a1"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
   "q2"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********s"a2"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
   "q4"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********s"a4"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
   "q8"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********s"a8"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
  "q16"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********s"a16"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
  "q32"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********s"a32"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
  "q64"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********s"a64"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
 "q128"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *****    *** *****    *** *****    *** *****    *** *****    *** *****    *** *****    *** *********s"a128"
            *            *            *            *            *            *            *            *
            s            s            s            s            s            s            s            s
           "b128         b64          b32          b16          b8           b4           b2           b1"



0"FIT:y"

`, 'div8');


registerCircuit('8-bit right barrel shifter', `


0"A right barrel shifter can shift a binary number by a configurable amount of"
0"bits. This is implemented with layers of multiplexers. The last layer, for 8+"
0"bits of shifting, makes it always output 0, since it means the number got"
0"shifted too far."

0"Right shifting does the same as dividing through powers of two. For example"
0"right shifting by 1 is like dividing through 2."


      l     l     l     l     l     l     l     l
      ^     ^     ^     ^     ^     ^     ^     ^
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      a[*   a[*   a[*   a[*   a[*   a[*   a[*   a[*
      ^ *   ^ *   ^ *   ^ *   ^ *   ^ *   ^ *   ^ *
      * ****+*****+*****+*****+*****+*****+*****+******s"8+"
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      o<*** o<*** o<*** o<*** o<*** o<*** o<*** o<***
      ^   * ^   * ^   * ^   * ^   * ^   * ^   * ^   *
      a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
      ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
    **+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+**s"4"
      *   p *   p *   p *   p *   * *   * *   * *   *
      *     *     *     *     *   * *   * *   * *   *
      ******+*****+*****+*****+**** *   * *   * *   *
      *     *     *     *     *     *   * *   * *   *
      *     ******+*****+*****+*****+**** *   * *   *
      *     *     *     *     *     *     *   * *   *
      *     *     ******+*****+*****+*****+**** *   *
      *     *     *     *     *     *     *     *   *
      *     *     *     ******+*****+*****+*****+****
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      o<*** o<*** o<*** o<*** o<*** o<*** o<*** o<***
      ^   * ^   * ^   * ^   * ^   * ^   * ^   * ^   *
      a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
      ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
    **+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+**s"2"
      *   p *   p *   * *   * *   * *   * *   * *   *
      *     *     *   * *   * *   * *   * *   * *   *
      ******+*****+**** ****+*+***+*+**** *   * *   *
      *     *     *     *   * *   * *     *   * *   *
      *     ******+*****+**** ****+*+*****+**** *   *
      *     *     *     *     *   * *     *     *   *
      *     *     ******+*****+**** ******+*****+****
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      o<*** o<*** o<*** o<*** o<*** o<*** o<*** o<***
      ^   * ^   * ^   * ^   * ^   * ^   * ^   * ^   *
      a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
      ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
    **+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+**s"1"
      *   p *   * *   * *   * *   * *   * *   * *
      *     *   * *   * *   * *   * *   * *   * *
      ******+**** ****+*+**** ****+*+**** *   * *
      *     *     *   * *     *   * *     *   * *
      *     ******+**** ******+**** ******+**** *
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      s     s     s     s     s     s     s     s

0"FIT:y"

`, 'rshift');

registerCircuit('8-bit left barrel shifter', `


0"A left barrel shifter can shift a binary number by a configurable amount of"
0"bits. This is implemented with layers of multiplexers. The last layer, for 8+"
0"bits of shifting, makes it always output 0, since it means the number got"
0"shifted too far."

0"Left shifting does the same as multiplying by two. For example left shifting"
0"by 1 is like multiplying with 2 (or adding the number to itself)."


      l     l     l     l     l     l     l     l
      ^     ^     ^     ^     ^     ^     ^     ^
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      a[*   a[*   a[*   a[*   a[*   a[*   a[*   a[*
      ^ *   ^ *   ^ *   ^ *   ^ *   ^ *   ^ *   ^ *
      * ****+*****+*****+*****+*****+*****+*****+******s"8+"
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      o<*** o<*** o<*** o<*** o<*** o<*** o<*** o<***
      ^   * ^   * ^   * ^   * ^   * ^   * ^   * ^   *
      a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
      ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
    **+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+**s"4"
      *   * *   * *   * *   * *   p *   p *   p *   p
      *   * *   * *   * *   * *     *     *     *
      *   * *   * *   * *   **+*****+*****+******
      *   * *   * *   * *     *     *     *     *
      *   * *   * *   **+*****+*****+******     *
      *   * *   * *     *     *     *     *     *
      *   * *   **+*****+*****+******     *     *
      *   * *     *     *     *     *     *     *
      *   **+*****+*****+******     *     *     *
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      o<*** o<*** o<*** o<*** o<*** o<*** o<*** o<***
      ^   * ^   * ^   * ^   * ^   * ^   * ^   * ^   *
      a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
      ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
    **+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+**s"2"
      *   * *   * *   * *   * *   * *   * *   p *   p
      *   * *   * *   * *   * *   * *   * *     *
      *   * *   **+***+**   **+***+**   **+******
      *   * *     *   * *     *   * *     *     *
      *   **+******   **+******   **+******     *
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      o<*** o<*** o<*** o<*** o<*** o<*** o<*** o<***
      ^   * ^   * ^   * ^   * ^   * ^   * ^   * ^   *
      a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
      ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
    **+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+**s"1"
      *   * *   * *   * *   * *   * *   * *   * *   p
      *   ***   ***   ***   ***   ***   ***   ***
      *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *
      s     s     s     s     s     s     s     s

0"FIT:y"

`, 'lshift');


registerCircuit('8-bit fully customizable barrel shifter', `

0"This barrel shifter can do all: left or right shift, arithmetic or logical,"
0"rotating or regular, and it can even mirror the result."

0"r=rotate"
0"a=arithmetic (off: logical)"
0"l=left (off: right)"
0"m=mirror result"

0"The choice of left/right is implemented by mirroring at input and then"
0"mirroring back before the output. That way the internal right shifter has the"
0"effect of shifting left."


                    l     l     l     l     l     l     l     l
                    ^     ^     ^     ^     ^     ^     ^     ^
                    *     *     *     *     *     *     *     *
                    *     *     *     *     *     *     *     *
                    *     *     *     *     *     *     *     *
                    *     *     *     *     *     *     *     *
                    o<*** o<*** o<*** o<*** o<*** o<*** o<*** o<***
                    ^   * ^   * ^   * ^   * ^   * ^   * ^   * ^   *
                    a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
                    ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
                  **+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+**
                  * *   * *   * *   * *   * *   * *   * *   * *   *
                  * 7===0=6===1=5===2=4===3=3===4=2===5=1===6=0===7 0"mirroring stage"
                  * *     *     *     *     *     *     *     *
                  * *     *     *     *     *     *     *     *
                  * *     *     *     *     *     *     *     *
                  * o<*** o<*** o<*** o<*** o<*** o<*** o<*** o<***
                  * ^   * ^   * ^   * ^   * ^   * ^   * ^   * ^   *
                  * a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
                  * ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
       "8+"s******+*+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+**
                  * *   * *   * *   * *   * *   * *   * *   * *   *
                  * *   * *   * *   * *   * *   * *   * *   * *   *
                **+*+***+*+***+*+***+*+***+*+***+*+***+*+***+*+** *
                * * * * * * * * * * * * * * * * * * * * * * * * * *
                * * * *>o * *>o * *>o * *>o * *>o * *>o * *>o * *>o
                * * *   ^ *   ^ *   ^ *   ^ *   ^ *   ^ *   ^ *   ^
                * * * *>a * *>a * *>a * *>a * *>a * *>a * *>a * *>a
                * * * * ^ * * ^ * * ^ * * ^ * * ^ * * ^ * * ^ * * ^
              **+*+*+***+*+***+*+***+*+***+*+***+*+***+*+***+*+** *
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * * * 7===7=6===6=5===5=4===4=3===3=2===2=1===1=0===0 0"redundant looking mux. For consistency..."
              * * * *     *     *     *     *     *     *     *
              * * * o<*** o<*** o<*** o<*** o<*** o<*** o<*** o<***
              * * * ^   * ^   * ^   * ^   * ^   * ^   * ^   * ^   *
              * * * a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
              * * * ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
        "4"s**+*+*+*+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+**
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * **+*+***+*+***+*+***+*+** * *   * *   * *   * *   *
              * * * * * * * * * * * * * * * *   * *   * *   * *   *
              * * * * *>o * *>o * *>o * *>o *   * *   * *   * *   *
              * * * *   ^ *   ^ *   ^ *   ^ *   * *   * *   * *   *
              * * * * *>a * *>a * *>a * *>a *   * *   * *   * *   *
              * * * * * ^ * * ^ * * ^ * * ^ *   * *   * *   * *   *
              **+*+*+***+*+***+*+***+*+** * *   * *   * *   * *   *
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * * * 7===3=6===2=5===1=4===0=3===7=2===6=1===5=0===4 0"rotate 4"
              * * * *     *     *     *     *     *     *     *
              * * * o<*** o<*** o<*** o<*** o<*** o<*** o<*** o<***
              * * * ^   * ^   * ^   * ^   * ^   * ^   * ^   * ^   *
              * * * a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
              * * * ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
        "2"s**+*+*+*+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+**
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * **+*+***+*+** * *   * *   * *   * *   * *   * *   *
              * * * * * * * * * *   * *   * *   * *   * *   * *   *
              * * * * *>o * *>o *   * *   * *   * *   * *   * *   *
              * * * *   ^ *   ^ *   * *   * *   * *   * *   * *   *
              * * * * *>a * *>a *   * *   * *   * *   * *   * *   *
              * * * * * ^ * * ^ *   * *   * *   * *   * *   * *   *
              **+*+*+***+*+** * *   * *   * *   * *   * *   * *   *
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * * * 7===1=6===0=5===7=4===6=3===5=2===4=1===3=0===2 0"rotate 2 right"
              * * * *     *     *     *     *     *     *     *
              * * * o<*** o<*** o<*** o<*** o<*** o<*** o<*** o<***
              * * * ^   * ^   * ^   * ^   * ^   * ^   * ^   * ^   *
              * * * a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
              * * * ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
        "1"s**+*+*+*+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+**
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * **+*+**>o *   * *   * *   * *   * *   * *   * *   *
              * * * *   ^ *   * *   * *   * *   * *   * *   * *   *
              **+*+*+**>a *   * *   * *   * *   * *   * *   * *   *
              * * * *   ^ *   * *   * *   * *   * *   * *   * *   *
              * * * *   * *   * *   * *   * *   * *   * *   * *   *
              * * * 7===0=6===7=5===6=4===5=3===4=2===3=1===2=0===1 0"rotate 1 right"
              * * * *     *     *     *     *     *     *     *
              * * * *     *     *     *     *     *     *     *
              * * * *     *     *     *     *     *     *     *
        "r"s***]a * *     *     *     *     *     *     *     *
                ^ * *     *     *     *     *     *     *     *
        "a"s***>a * o<*** o<*** o<*** o<*** o<*** o<*** o<*** o<***
                ^ * ^   * ^   * ^   * ^   * ^   * ^   * ^   * ^   *
        "m"s****+>e a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a a[*>a
                * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^ ^ * ^
        "l"s****+***+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***+**
                *   *   * *   * *   * *   * *   * *   * *   * *   *
                *   7===0=6===1=5===2=4===3=3===4=2===5=1===6=0===7 0"mirroring stage"
                *   *     *     *     *     *     *     *     *
                *****     *     *     *     *     *     *     *
                    *     *     *     *     *     *     *     *
                    s     s     s     s     s     s     s     s

`, 'fullshift');


registerTitle('Flip-flops');

registerCircuit('Dual Edge Triggered D Flip-Flop', `

0"Built-in:"

"D"s****>d
         #
"C"s****>c****>l
       * m
       ***

0"From two D latches (with mux to use the right one depending on clock state):"

"D"s****>d
     *   #
"C"s*+**>y**>a**
     * *     m v
     * ******* o**>l
     * *     v ^
     **+>d**>a**
       * #
       *]y

0"From NAND gates only:"

"D"s******>A**>A**
         * ^ v ^ *
"C"s*****+>A>A>A<*>A>A**>l
       * *         ^ ^
       * *>A**>A***+>A
       *   ^ v ^ * * ^
       *****>A>A<* *>A
       *           *
       *************


`);



registerCircuit('edge detectors', `
0"single pulse on positive edge"

      ****             ***
      *  v             v *
   s**>d]a**>l     s**>c****>l


0"single pulse on negative edge"

      ****             ***
      *  w             v *
   s**>d>a**>l     s**]c****>l


0"single pulse on both edges: frequency doubler"

      ****
      *  v
   s**>d>e**>l

0"NOTE: in 'electron' mode, you can also make it with an or gate (serving as"
0"buffer/diode) instead of a 'd' gate. but in the 'fast' simulation algorithms,"
0"only the 'd' makes the 1-tick we need explicit"

0"The single counter is a frequency halfer, so undos the effect of the"
0"frequency doubler:"

        l2
        ^
s****>d>e>c*****>l
    *   ^
    *****

`, 'edge');

registerTitle('Displays');


registerCircuit('colored LEDs', `

   0 1 2 3 4 5 6 7
   l l l l l l l l   >L<
   ^ ^ ^ ^ ^ ^ ^ ^   |^|
   | | | | | | | |   |||
   s s s s s s s s   sss

   0 1 2 3 4 5 6 7
   l l l l l l l l   >L<
   ^ ^ ^ ^ ^ ^ ^ ^   |^|
   | | | | | | | |   |||
   S S S S S S S S   SSS


  >L< >L[ >L< >L[ ]L< ]L[ ]L< ]L[
  *^* *^* *m* *m* *^* *^* *m* *m*
   |   |   |   |   |   |   |   |
   s   s   s   s   s   s   s   s
`, 'colored_leds');




registerCircuit('colored LEDs wave', `
   R--*>c>c>c--->l0
   1  *]c>c>c--->l1
      *>c]c>c--->l2
      *]c]c>c--->l3
      *>c>c]c--->l4
      *]c>c]c--->l5
      *>c]c]c--->l6
      *]c]c]c--->l7
`, 'wave');


registerCircuit('7-segment display', `

      "7-segment display"

          $$$$
         $$$$$l<-*
        $ $$$$ $ |       $$l<-*
        $$    $$ |      $   $ |    "segment names (officially):"
        $$    $$ |     >l   l<|
        $$    $$ |     |$   $||      " a"
       >l$    $$ |    *+>l$$ ||      "f b"
       |$ $$$$ l<|    ||$   $||      " g"
      *+>l$$$$$ ||    ||$   $||      "e c"
      ||$ $$$$ $||    ||l   l||      " d"
      ||$$    $$||    ||^$l$^||
      ||$$    $$||    ||| ^ |||
      ||$$    $$||    ||| | |||
      ||$$    $$||    ||| | |||
      ||l $$$$ l||    sss s sss
      ||^$$$$$$^||
      ||| $$$l<|||   "gfe d cba"
      |||     ||||
      |||     ||||
      sss     ssss
     "gfe     dcba"

`, '7_seg');


registerCircuit('7-segment decoder', `


           "0-9"                    "0-9"                   "0-F"

            $$l<-*                   $$l<-*                  $$l<-*
           $   $ |                  $   $ |                 $   $ |
          >l   l<|                 >l   l<|                >l   l<|
          |$   $||                 |$   $||                |$   $||
         *+>l$$ ||                *+>l$$ ||               *+>l$$ ||
         ||$   $||                ||$   $||               ||$   $||
         ||$   $||                ||$   $||               ||$   $||
         ||l   l||                ||l   l||               ||l   l||
         ||^$l$^||                ||^$l$^||               ||^$l$^||
     *---*|| ^ ||*--*             ||| ^ |||               ||| ^ |||
     |*---*| | |*--*|             &&&&|%%%%               &&&&|%%%%
     ||*---* | *--*||              |||||||                 |||||||
     |||*----,    |||              bBBBBBB "0"             bBBBBBB "0"
     |||A<o<-,    |||              bbbbBBb "1"             bbbbBBb "1"
     |||m ^ ]a<   |||              BbBBbBB "2"             BbBBbBB "2"
     |||| | |m|   |||              BbbBBBB "3"             BbbBBBB "3"
     |||| a<+++-* |||              BBbbBBb "4"             BBbbBBb "4"
     |||| ^-*|*>E |||              BBbBBbB "5"             BBbBBbB "5"
     ||||   |*+-^ |||              BBBBBbB "6"             BBBBBbB "6"
     |||&v-*+++--*|||              bbbbBBB "7"             bbbbBBB "7"
     ||a<o[+*++-vv|||              BBBBBBB "8"             BBBBBBB "8"
     ||G ^-++*+]o#*||              BBbBBBB "9"             BBbBBBB "9"
     ||U-v-+++*-U  ||                 ^^^^                 BBBbBBB "A"
     ||a[e<++*+>e-*||                 ||||                 BBBBBbb "b"
     ||v v ||||   v||                 ||||                 bBBBbbB "C"
     ||o<a[+*++-->A*|                 ssss                 BbBBBBb "d"
     |A<   ||||   m |                                      BBBBbbB "E"
     |GG---*+++-w-* |                "8421"                BBBbbbB "F"
     *-A<E<++*+]A---*                                         ^^^^
       ^ U |||| ^                                             ||||
       | G-+*++>e                                             ||||
       *-o<+++*-^                                             ssss
           ||||
           ssss                                              "8421"

          "8421"

`, '7_seg_dec');


registerCircuit('10 7-segments', `
        $$l<-*    $$l<-*    $$l<-*    $$l<-*    $$l<-*    $$l<-*    $$l<-*    $$l<-*    $$l<-*    $$l<-*
       $   $ |   $   $ |   $   $ |   $   $ |   $   $ |   $   $ |   $   $ |   $   $ |   $   $ |   $   $ |
      >l   l<|  >l   l<|  >l   l<|  >l   l<|  >l   l<|  >l   l<|  >l   l<|  >l   l<|  >l   l<|  >l   l<|
      |$   $||  |$   $||  |$   $||  |$   $||  |$   $||  |$   $||  |$   $||  |$   $||  |$   $||  |$   $||
     *+>l$$ || *+>l$$ || *+>l$$ || *+>l$$ || *+>l$$ || *+>l$$ || *+>l$$ || *+>l$$ || *+>l$$ || *+>l$$ ||
     ||$   $|| ||$   $|| ||$   $|| ||$   $|| ||$   $|| ||$   $|| ||$   $|| ||$   $|| ||$   $|| ||$   $||
     ||$   $|| ||$   $|| ||$   $|| ||$   $|| ||$   $|| ||$   $|| ||$   $|| ||$   $|| ||$   $|| ||$   $||
     ||l   l|| ||l   l|| ||l   l|| ||l   l|| ||l   l|| ||l   l|| ||l   l|| ||l   l|| ||l   l|| ||l   l||
     ||^$l$^|| ||^$l$^|| ||^$l$^|| ||^$l$^|| ||^$l$^|| ||^$l$^|| ||^$l$^|| ||^$l$^|| ||^$l$^|| ||^$l$^||
     ||| ^ ||| ||| ^ ||| ||| ^ ||| ||| ^ ||| ||| ^ ||| ||| ^ ||| ||| ^ ||| ||| ^ ||| ||| ^ ||| ||| ^ |||
     ||| | ||| ||| | ||| ||| | ||| ||| | ||| ||| | ||| ||| | ||| ||| | ||| ||| | ||| ||| | ||| ||| | |||
     ||| | ||| ||| | ||| ||| | ||| ||| | ||| ||| | ||| ||| | ||| ||| | ||| ||| | ||| ||| | ||| ||| | |||
     sSS S SSS sss s SSs SsS S sSS Sss S SSS SSs s SSs SSs S SsS SSS S SsS sss s SSS SSS S SSS SSs S SSS

`, '10_7_seg');


registerCircuit('Hello World terminal', `

    TTTTTTT<****************************
    TTTTTTT                            *
    TTTTTTT                            *
    TTTTTTT                            *
    ^^^^^^^                            *
    |||||||                            *
    bBbbbbB<-----------------------*   *
    BBbbBbb<---------------------* *   *
    BBbBBbb<-------------------* * *   *
    BBBbbBb<-----------------* * * *   *
    BBbBBBB<---------------* * * * *   *
    BBBbBBB<-------------* * * * * *   *
    bBbbbbb<-----------* * * * * * *   *
    BBbBBBB<---------* * * * * * * *   *
    BBbBBbb<-------* * * * * * * * *   *
    BBbBBbb<-----* * * * * * * * * *   *
    BBbbBbB<---* * * * * * * * * * *   *
    BbbBbbb<-* * * * * * * * * * * *   *
             * * * * * * * * * * * *   *
           **+*+*+*+*+*+*+*+*+*+*+**   *
           * * * * * * * * * * * * *   *
           *>d>d>d>d>d>d>d>d>d>d>d>d   *
             C c c c c c c c c c c c   *
             ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^   *
             ************************d<R

`, 'hello_world');


registerCircuit('Keyboard and screen', `

0"The keyboard text typed fast at the bottom will slowly be transfered to the"
0"screen"


   TTTTTTTTTTTTTT
   TTTTTTTTTTTTTT
   TTTTTTTTTTTTTT
   TTTTTTTTTTTTTT
 *>TTTTTTTTTTTTTT
 * TTTTTTTTTTTTTT
 *        ^^^^^^^
 *        |||||||
 *        |||||||
 *        |||||||
 d<******>TTTTTTT
     *    TTTTTTT
     *    TTTTTTT
     *    TTTTTTT
     a[***TTTTTTT
     ^
     R5

0"The 'd' delay ensures the keyboard can output first before the screen reads"
`, 'terminal');


registerTitle('Sequential Logic');

registerCircuit('Asynchronous binary up counter', `

0"Single-input T flip-flops in series behave like a binary counter."
0"Without NOT gates they will be counting down, so the NOT gates"
0"in-between make them count up instead."

  "    ... 8 4 2 1"
   l l l l l l l l
   ^ ^ ^ ^ ^ ^ ^ ^
   * * * * * * * *
   c[c[c[c[c[c[c[c<**p

`, 'counter');


registerCircuit('Synchronous up counter', `

0"The asynchronous counter has a disadvantage that the value"
0"ripples through slowly as it updates. The synchronous one"
0"updates all bits at the same time:"


"  128    64    32    16    8     4     2     1"
    l     l     l     l     l     l     l     l
    ^     ^     ^     ^     ^     ^     ^     ^
    *     *     *     *     *     *     *     *
    *   **+** **+** **+** **+** **+** **+** **+**
    *   v * * v * * v * * v * * v * * v * * v * *
    t<**a<t<**a<t<**a<t<**a<t<**a<t<**a<t<**a<t<**C
    c     c     c     c     c     c     c     c
    ^     ^     ^     ^     ^     ^     ^     ^
    ***************************************************p

`, 'synch_counter');


registerCircuit('Synchronous down counter', `


"  128    64    32    16    8     4     2     1"
    l     l     l     l     l     l     l     l
    ^     ^     ^     ^     ^     ^     ^     ^
    *     *     *     *     *     *     *     *
    *   **+** **+** **+** **+** **+** **+** **+**
    *   v * * v * * v * * v * * v * * v * * v * *
    t<**a[t<**a[t<**a[t<**a[t<**a[t<**a[t<**a[t<**C
    c     c     c     c     c     c     c     c
    ^     ^     ^     ^     ^     ^     ^     ^
    ***************************************************p

`, 'down_counter');


registerCircuit('Synchronous up/down counter', `

        l     l     l     l     l     l     l     l
        ^     ^     ^     ^     ^     ^     ^     ^
        *     *     *     *     *     *     *     *
      **+** **+** **+** **+** **+** **+** **+** **+**
      v * * v * * v * * v * * v * * v * * v * * v * *
    **a t<**a t<**a t<**a t<**a t<**a t<**a t<**a t<*C
      ^ #   ^ #   ^ #   ^ #   ^ #   ^ #   ^ #   ^ #
      e<c   e<c   e<c   e<c   e<c   e<c   e<c   e<c
      ^ ^   ^ ^   ^ ^   ^ ^   ^ ^   ^ ^   ^ ^   ^ ^
    **+*****+*****+*****+*****+*****+*****+*****+*********p"clock"
      *     *     *     *     *     *     *     *
    ******************************************************s"up/down"

`, 'up_down_counter');


registerCircuit('Synchronous up/down counter w. load', `



       l           l            l            l            l            l           l           l
       ^           ^            ^            ^            ^            ^           ^           ^
       *           *            *            *            *            *           *           *
       *           *            *            *            *            *           *           *
     **+******** **+********  **+********  **+********  **+********  **+******** **+******** **+********
     v *       * v *       *  v *       *  v *       *  v *       *  v *       * v *       * v *       *
*****a t<**o<a<**a t<**o<a<***a t<**o<a<***a t<**o<a<***a t<**o<a<***a t<**o<a<**a t<**o<a<**a t<**o<a<**C
     ^ #   ^ m   ^ #   ^ m    ^ #   ^ m    ^ #   ^ m    ^ #   ^ m    ^ #   ^ m   ^ #   ^ m   ^ #   ^ m
     e<c>e>a<*   e<c>e>a<*    e<c>e>a<*    e<c>e>a<*    e<c>e>a<*    e<c>e>a<*   e<c>e>a<*   e<c>e>a<*
     ^ ^ ^   *   ^ ^ ^   *    ^ ^ ^   *    ^ ^ ^   *    ^ ^ ^   *    ^ ^ ^   *   ^ ^ ^   *   ^ ^ ^   *
*****+***+***+***+***+***+****+***+***+****+***+***+****+***+***+****+***+***+***+***+***+***+***+***+***p"clock"
     *   *   *   *   *   *    *   *   *    *   *   *    *   *   *    *   *   *   *   *   *   *   *   *
*********+***+*******+***+********+***+********+***+********+***+********+***+*******+***+*******+***+***s"up/down"
         *   *       *   *        *   *        *   *        *   *        *   *       *   *       *   *
*********+***********+************+************+************+************+***********+***********+*******s"load enable"
         *           *            *            *            *            *           *           *
         s           s            s            s            s            s           s           s




`, 'full_counter');


registerCircuit('register', `
0"A register can be made from a D flip-flop plus a mux. A D flip-flop is in"
0"fact sufficient to have a working memory unit useful as a register, but the"
0"addition of the mux allows to have an independent 'enable' flag that will not"
0"interfere with the clock signal (if you would try to AND an enable signal"
0"with the clock, then enabling it while the clock is high would cause a"
0"positive edge that should not be there). This is desirable because in a CPU"
0"you want registers to only be written to when specifically enabled, and you"
0"do not want turning on enable signals in between clock edges to mess up"
0"anything. The mux allows to feed back the registers output to its input while"
0"not write-enabled."


            l
            ^
        *****
        *   *
"C"s****+>c#d
        *   ^
        *>a>o
          m ^
"E"s*******>a
            ^
            *
            *
            s

0"Logicemu also supports a shortcut for this (a D flip-flop with an enable"
0"input y), and alternatively a MUX notation (M), these are shown here below,"
0"but are not used further down, since shortcuts like this are intended for"
0"bigger circuits that use registers but are not themselves about registers."

       l                l
       ^                ^
       *                *
       *                *
"C"s-->c    "C"s*****>c#d**
"E"s-->y                ^ *
       d    "E"s*****>MMM *
       ^              ^ ^ *
       *              * ***
       *              *
       s              s

0"8-bit register"

       l       l       l       l       l       l       l       l
       ^       ^       ^       ^       ^       ^       ^       ^
       ******* ******* ******* ******* ******* ******* ******* *******
       *     * *     * *     * *     * *     * *     * *     * *     *
       c#d   * c#d   * c#d   * c#d   * c#d   * c#d   * c#d   * c#d   *
       ^ ^   * ^ ^   * ^ ^   * ^ ^   * ^ ^   * ^ ^   * ^ ^   * ^ ^   *
 "C"s****+***+***+***+***+***+***+***+***+***+***+***+***+***+***+***+****
         *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
 "E"s****+***+***+***+***+***+***+***+***+***+***+***+***+***+***+***+****
       v * w * v * w * v * w * v * w * v * w * v * w * v * w * v * w *
       a>o<a<* a>o<a<* a>o<a<* a>o<a<* a>o<a<* a>o<a<* a>o<a<* a>o<a<*
       ^       ^       ^       ^       ^       ^       ^       ^
       *       *       *       *       *       *       *       *
       *       *       *       *       *       *       *       *
       s       s       s       s       s       s       s       s


0"To make it more compact, it can be defined as an IC:"

    lI1
    ^
    c#d****       l  l  l  l  l  l  l  lI8
    ^ ^   *       ^  ^  ^  ^  ^  ^  ^  ^
   s**+***+*>l  s>i1>i1>i1>i1>i1>i1>i1>i1-
      *   *     s>ii>ii>ii>ii>ii>ii>ii>ii-
   s**+***+*>l    ^  ^  ^  ^  ^  ^  ^  ^
    v * w *       s  s  s  s  s  s  s  s
    a>o<a<*
    ^
    s

0"And then used as follows:"

       llllllll
       ^^^^^^^^
"C"s-->iiiiiii8
"E"s-->iiiiiiii
       ^^^^^^^^
       ssssssss

`, 'register');


registerCircuit('serial-in, serial-out shift register', `

0"The serial-in, serial-out (SISO) shift register,"
0"reads one input value per tick, and outputs one per tick later."

 "D"s**>d*>d*>d*>d*>d*>d*>d*>d**>l
        #  #  #  #  #  #  #  #
        c  c  c  c  c  c  c  c
        ^  ^  ^  ^  ^  ^  ^  ^
 "C"p*************************

`, 'siso');


registerCircuit('serial-in, parallel-out shift register', `

0"The serial-in, parallel-out (SIPO) shift register, reads one input value per"
0"tick, and outputs all at the same time, to the correct wires after the"
0"correct amount of shifts."


        l  l  l  l  l  l  l  l
        ^  ^  ^  ^  ^  ^  ^  ^
 "D"s**>d*>d*>d*>d*>d*>d*>d*>d
        #  #  #  #  #  #  #  #
        c  c  c  c  c  c  c  c
        ^  ^  ^  ^  ^  ^  ^  ^
 "C"p*************************

`, 'sipo');


registerCircuit('parallel-in, serial-out shift register', `

0"The parralel-in, serial-out (PISO) shift register, reads all inputs at the"
0"same time, then outputs them one by one."


"W = write to the register"

                     1"parallel input"
          s     s     s     s     s     s     s     s
          *     *     *     *     *     *     *     *
 "W"s*****+*****+*****+*****+*****+*****+*****+*****+****
        * *   * *   * *   * *   * *   * *   * *   * *
        * *   * *   * *   * *   * *   * *   * *   * *
        * *   * *   * *   * *   * *   * *   * *   * *
        * v   * v   * v   * v   * v   * v   * v   * v
        *>a** *>a** *>a** *>a** *>a** *>a** *>a** *>a**
            * *   v *   v *   v *   v *   v *   v *   v
            * *]a>o *]a>o *]a>o *]a>o *]a>o *]a>o *]a>o
            *   ^ *   ^ *   ^ *   ^ *   ^ *   ^ *   ^
            *>d** *>d** *>d** *>d** *>d** *>d** *>d******>l"serial output"
              #     #     #     #     #     #     #
              c>l2  c>l2  c>l2  c>l2  c>l2  c>l2  c>l2
              ^     ^     ^     ^     ^     ^     ^
 "C"s****************************************************

`, 'piso');

registerCircuit('rotating shift register', `

         l l l l l l l l
         ^ ^ ^ ^ ^ ^ ^ ^
         * * * * * * * *
       **+*+*+*+*+*+*+**
       * * * * * * * * *
       *>d>d>d>d>d>d>d>d
         # # # # # # # #
         C c c c c c c c
         ^ ^ ^ ^ ^ ^ ^ ^
 "C"p*******************

`, 'rot_shift');

registerTitle('Coders');


registerCircuit('binary decoders', `

0"binary to unary decoders convert a binary number to a one-hot unary value"

           "3   2   1   0"
            l   l   l   l
            ^   ^   ^   ^
            *   *   *   *
            *   *   *   *
          *>a *>a *]a *]a
          * ^ * m * ^ * m
          * * * * * * * *
 "2"s*******+***+***+***+*************
            *   *   *   *
 "1"s*********************************


           "7     6     5     4     3     2     1     0"
            l     l     l     l     l     l     l     l
            ^     ^     ^     ^     ^     ^     ^     ^
            *     *     *     *     *     *     *     *
            *     *     *     *     *     *     *     *
          *>a<* *>a[* *>a<* *>a[* *]a<* *]a[* *]a<* *]a[*
          * ^ * * ^ * * m * * m * * ^ * * ^ * * m * * m *
          * * * * * * * * * * * * * * * * * * * * * * * *
 "4"s*******+*+***+*+***+*+***+*+***+*+***+*+***+*+***+*+***********
            * *   * *   * *   * *   * *   * *   * *   * *
 "2"s*********+*****+*****+*****+*****+*****+*****+*****+***********
              *     *     *     *     *     *     *     *
 "1"s***************************************************************

`, 'decoder');


registerCircuit('simple encoders', `


0"A binary encoder translates one-hot unary input to a binary output"

0"called 'simple' as opposed to priority encoders"

0"4-input unary to binary encoder"

"2   1"
 l   l
 ^   ^
 *   *
 o<* *
 ^ * *
 **+>o
 * * ^
 * * * *
 s s s s
"3 2 1 0"

0"8-input unary to binary encoder"


   "4         2         1"
    l         l         l
    ^         ^         ^
    o######   o######   o######
    ^^^^^^^   ^^^^^^^   ^ ^ ^ ^
    * * * *   * * * *   * * * *
    * * * *   * * * *   * * * *
    * * * *   * * * *   * * * *
    * * * *   * * * *   * * * *
    * * * *   * * * *   * * * *
    * * * *   * * * *   * * * *
    **+*+*+**** * * *   * * * *
    * * * *     * * *   * * * *
    * **+*+****** * *   * * * *
    * * * *       * *   * * * *
    * * * * ******* *   * * * *
    * * * * *       *   * * * *
    * * * * * *******   * * * *
    * * * * * *         * * * *
    * * * * * *         * * * *
    * * * * * *         * * * *
    **+*+*+*+*+********** * * *
    * * * * * *           * * *
    * * **+*+*+************ * *
    * * * * * *             * *
    * * * * **+************** *
    * * * * * *               *
    * * * * * * ***************
    * * * * * * *
    * * * * * * * *
    s s s s s s s s
   "7 6 5 4 3 2 1 0"



0"combine two of those to get 8-input unary to binary encoder"


                              l         l         l         l
                              ^         ^         ^         ^
                          o######       *         *         *
                          ^ ^ ^ ^       *         *         *
    ************************+*+*+******>o         *         *
    *                       * * *       ^         *         *
    *         ****************+*+*******+********>o         *
    *         *               * *       *         ^         *
    *         *         ********+*******+*********+********>o
    *         *         *       *       *         *         ^
    o######   o######   o###### *       o######   o######   o######
    ^^^^^^^   ^^^^^^^   ^ ^ ^ ^ *       ^^^^^^^   ^^^^^^^   ^ ^ ^ ^
    * * * *   * * * *   * * * * *       * * * *   * * * *   * * * *
    * * * *   * * * *   * * * * *       * * * *   * * * *   * * * *
    **+*+*+**** * * *   * * * * *       **+*+*+**** * * *   * * * *
    * * * *     * * *   * * * * *       * * * *     * * *   * * * *
    * **+*+****** * *   * * * * *       * **+*+****** * *   * * * *
    * * * *       * *   * * * * *       * * * *       * *   * * * *
    * * * * ******* *   * * * * *       * * * * ******* *   * * * *
    * * * * *       *   * * * * *       * * * * *       *   * * * *
    * * * * * *******   * * * * *       * * * * * *******   * * * *
    * * * * * *         * * * * *       * * * * * *         * * * *
    * * * * * *         * * * * *       * * * * * *         * * * *
    * * * * * *         * * * * *       * * * * * *         * * * *
    **+*+*+*+*+********** * * * *       **+*+*+*+*+********** * * *
    * * * * * *           * * * *       * * * * * *           * * *
    * * **+*+*+************ * * *       * * **+*+*+************ * *
    * * * * * *             * * *       * * * * * *             * *
    * * * * **+************** * *       * * * * **+************** *
    * * * * * *               * *       * * * * * *               *
    * * * * * * *************** *       * * * * * * ***************
    * * * * * * *               *       * * * * * * *
    * * * * * * * ***************       * * * * * * * *
    * * * * * * * *                     * * * * * * * *
    * * * * * * * *                     * * * * * * * *
    s s s s s s s s                     s s s s s s s s

0"a ROM can also be used for it. E.g. 10-input unary to binary encoder with ROM:"

      *   *   *   *   *   *   *   *   *   *
 **>o*+>o*+***+***+***+***+***+***+***+***+*****>l"8"
    ^ * ^ *   *   *   *   *   *   *   *   *
    *** ***   *   *   *   *   *   *   *   *
      *   *   *   *   *   *   *   *   *   *
 *****+***+>o*+>o*+>o*+>o*+***+***+***+***+*****>l"4"
      *   * ^ * ^ * ^ * ^ *   *   *   *   *
      *   * *** *** *** ***   *   *   *   *
      *   *   *   *   *   *   *   *   *   *
 *****+***+>o*+>o*+***+***+>o*+>o*+***+***+*****>l"2"
      *   * ^ * ^ *   *   * ^ * ^ *   *   *
      *   * *** ***   *   * *** ***   *   *
      *   *   *   *   *   *   *   *   *   *
 **>o*+***+>o*+***+>o*+***+>o*+***+>o*+***+*****>l"1"
    ^ *   * ^ *   * ^ *   * ^ *   * ^ *   *
    ***   * ***   * ***   * ***   * ***   *
      *   *   *   *   *   *   *   *   *   *
      s   s   s   s   s   s   s   s   s   s
     "9   8   7   6   5   4   3   2   1   0"

0"This can be more compact with bB: 16-input unary to binary encoder using a ROM"

    BBBBBBBBbbbbbbbb>l"8"
    BBBBbbbbBBBBbbbb>l"4"
    BBbbBBbbBBbbBBbb>l"2"
    BbBbBbBbBbBbBbBb>l"1"
    ^^^^^^^^^^^^^^^^
    ssssssssssssssss

   "FEDCBA9876543210"

0"FIT:w"

`, 'encoder');


registerCircuit('priority encoders', `

0"unary to binary priority encoders. highest unary input value has priority"

0"4-to-2 priority encoder"

   "2 1"
    l l
    ^ ^
    * *
    * *
  *>o *
  * ^ *
  **+>o
  * * ^
  * *]a
  * * ^
  * * *
  * * * *
  s s s s
 "3 2 1 0"


0"8-to-3 priority encoder, made from 2 4-to-2 priority encoders plus glue logic"

            "4 2 1"
             l l l
             ^ ^ ^
             * * *
             * * *
         ****+*+>o
         *   * * ^
       **+***+>o *
       * *   * ^ *
       **+** **+]a
       * * v * * ^
       * *>o**]a *
       * * ^   ^ *
       * * *   * *
       * * *   * *
     *>o * * *>o *
     * ^ * * * ^ *
     **+>o * **+>o
     * * ^ * * * ^
     * *]a * * *]a
     * * ^ * * * ^
     * * * * * * *
     * * * * * * * *
     s s s s s s s s
    "7 6 5 4 3 2 1 0"




0"8-to-3 priority encoder, made from 5 4-to-2 priority encoders (the 5th is at"
0"the top) plus glue logic. Also has 'disable' input and ouptut which allow"
0"making larger ones out of this."

                              "8 4 2 1"
                               l l l l
                               ^ ^ ^ ^
                             *>o * * *
                             * ^ * * *
                             **+>o * *
                             * * ^ * *
                             * *]a * *
                             * * ^ * *
         ********************* * * * *
         *                     * * * *
         *         ************* * * *
         *         *             * * *
         *         *         ***** * *
         *         *         *     * *
     ****+****>o***+****>o***+****>o *
     *   *     ^   *     ^   *     ^ *
     * **+*****+>o*+*****+>o*+*****+>o
     * * *     * ^ *     * ^ *     * ^
   *]a * *   *]a * *   *]a * *   *]a * *
   * ^ * *   * ^ * *   * ^ * *   * ^ * *
   **+]a *   **+]a *   **+]a *   **+]a *
   * * ^ *   * * ^ *   * * ^ *   * * ^ *
   **+*+]a   **+*+]a   **+*+]a   **+*+]a
   * * * ^   * * * ^   * * * ^   * * * ^
s****+*+*+>o***+*+*+>o***+*+*+>o***+*+*+>o**>l
     * * * ^   * * * ^   * * * ^   * * * ^
     **+>#**   **+>#**   **+>#**   **+>#**
     * * #     * * #     * * #     * * #
   *>o *>o   *>o *>o   *>o *>o   *>o *>o
   * ^ * ^   * ^ * ^   * ^ * ^   * ^ * ^
   **+>o *   **+>o *   **+>o *   **+>o *
   * * ^ *   * * ^ *   * * ^ *   * * ^ *
   * *]a *   * *]a *   * *]a *   * *]a *
   * * ^ *   * * ^ *   * * ^ *   * * ^ *
   * * * *   * * * *   * * * *   * * * *
   * * * *   * * * *   * * * *   * * * *
   s s s s   s s s s   s s s s   s s s s
  "f e d c   b a 9 8   7 6 5 4   3 2 1 0"

`, 'priority_encoder');



registerCircuit('8-bit binary to BCD decoder', `

0"8-bit binary to decimal (BCD), double dabble"

0"BCD is a method of representing decimal numbers with 4 bits per decimal digit"
0"(0-9)."

0"This circuit converts a 8-bit binary number (0-255) into three decimal"
0"digits."

0"For that it uses the 'double dabble' method. In this method, do 'add-3' for"
0"multiple layers"

0"add-3: 4-bit adder. Only if value >= 5, add 3"

    l   l   l   l
    ^   ^   ^   ^
    *   *   *   *
    *   *   *   *
    e<a e   *** *
    ^ ^^^     * *
    * * **o<a e *
    * *   ^ ^^^ *
    * *** a e a e
    *   * ^^^ ^^^
    *   * * * * *
    *   * * * * *
    * **+**-+-* *
    * * *   *   *
    * o<+*a<+*o<*
    * ^ * ^ * ^ *
    *** *** *** *
    *   *   *   *
    *   *   *   *
    *   *   *   *
    s   s   s   s

0"For 8-bit: 8 layers of add-3 modules. Not all are present since not all input"
0"values have the ability to go above 5"

0"The ROM with B's is to turn the 4-bit decimal digits into the segments for"
0"the 7-segment display."

0"FIT:y"

                           $$l<-*          $$l<-*          $$l<-*
                          $   $ |         $   $ |         $   $ |
                         >l   l<|        >l   l<|        >l   l<|
                         |$   $||        |$   $||        |$   $||
                        *+>l$$ ||       *+>l$$ ||       *+>l$$ ||
                        ||$   $||       ||$   $||       ||$   $||
                        ||$   $||       ||$   $||       ||$   $||
                        ||l   l||       ||l   l||       ||l   l||
                        ||^$l$^||       ||^$l$^||       ||^$l$^||
                        ||| ^ |||       ||| ^ |||       ||| ^ |||
                        &&&&|%%%%       &&&&|%%%%       &&&&|%%%%
                         |||||||         |||||||         |||||||
                         bBBBBBB         bBBBBBB         bBBBBBB
                         bbbbBBb         bbbbBBb         bbbbBBb
                         BbBBbBB         BbBBbBB         BbBBbBB
                         BbbBBBB         BbbBBBB         BbbBBBB
                         BBbbBBb         BBbbBBb         BBbbBBb
                         BBbBBbB         BBbBBbB         BBbBBbB
                         BBBBBbB         BBBBBbB         BBBBBbB
                         bbbbBBB         bbbbBBB         bbbbBBB
                         BBBBBBB         BBBBBBB         BBBBBBB
                         BBbBBBB         BBbBBBB         BBbBBBB
                            ^^^^            ^^^^            ^^^^
                            ||||            ||||            ||||
                       *----*||&---*   *----*||&---*   *----*||&---*
                       |   *-%&&   |   |   *-%&&   |   |   *-%&&   |
                       p   p   *   *   *   *   *   *   *   *   *   *
                               *200*100*80 *40 *20 *10 *8  *4  *2  *1
                               *   *   *   *   *   *   *   *   *   *
                               *   *   *   *   *   *   *   *   *   *
                               *   *   *   *** *   *   *   *** *   *
                               *   *   *     * *   *   *     * *   *
                               *   e<a e     * *   e<a e     * *   *
                               *   ^ ^^^     * *   ^ ^^^     * *   *
                               *   * * **o<a e *   * * **o<a e *   *
                               *   * *   ^ ^^^ *   * *   ^ ^^^ *   *
                               *   * *** a e a e   * *** a e a e   *
                               *   *   * ^^^ ^^^   *   * ^^^ ^^^   *
                               *   * **+***+** *   * **+***+** *   *
                               *   * * *   *   *   * * *   *   *   *
                               *   * o<+*a<+*o<*   * o<+*a<+*o<*   *
                               *   * ^ * ^ * ^ *   * ^ * ^ * ^ *   *
                               *   *** *** *** *   *** *** *** *   *
                               *   *     * *   *   *     * *   *   *
                               e<a e     * *   e<a e     * *   *   *
                               ^ ^^^     * *   ^ ^^^     * *   *   *
                               * * **o<a e *   * * **o<a e *   *   *
                               * *   ^ ^^^ *   * *   ^ ^^^ *   *   *
                               * *** a e a e   * *** a e a e   *   *
                               *   * ^^^ ^^^   *   * ^^^ ^^^   *   *
                               * **+***+** *   * **+***+** *   *   *
                               * * *   *   *   * * *   *   *   *   *
                               * o<+*a<+*o<*   * o<+*a<+*o<*   *   *
                               * ^ * ^ * ^ *   * ^ * ^ * ^ *   *   *
                               *** *** *** *   *** *** *** *   *   *
                                   *   *   *   *     * *   *   *   *
                                   *   *   e<a e     * *   *   *   *
                                   *   *   ^ ^^^     * *   *   *   *
                                   *   *   * * **o<a e *   *   *   *
                                   *   *   * *   ^ ^^^ *   *   *   *
                                   *   *   * *** a e a e   *   *   *
                                   *   *   *   * ^^^ ^^^   *   *   *
                                   *   *   * **+***+** *   *   *   *
                                   *   *   * * *   *   *   *   *   *
                                   *   *   * o<+*a<+*o<*   *   *   *
                                   *   *   * ^ * ^ * ^ *   *   *   *
                                   *   *   *** *** *** *   *   *   *
                                   *   *   *     * *   *   *   *   *
                                   *   e<a e     * *   *   *   *   *
                                   *   ^ ^^^     * *   *   *   *   *
                                   *   * * **o<a e *   *   *   *   *
                                   *   * *   ^ ^^^ *   *   *   *   *
                                   *   * *** a e a e   *   *   *   *
                                   *   *   * ^^^ ^^^   *   *   *   *
                                   *   * **+***+** *   *   *   *   *
                                   *   * * *   *   *   *   *   *   *
                                   *   * o<+*a<+*o<*   *   *   *   *
                                   *   * ^ * ^ * ^ *   *   *   *   *
                                   *   *** *** *** *   *   *   *   *
                                   *   *     * *   *   *   *   *   *
                                   e<a e     * *   *   *   *   *   *
                                   ^ ^^^     * *   *   *   *   *   *
                                   * * **o<a e *   *   *   *   *   *
                                   * *   ^ ^^^ *   *   *   *   *   *
                                   * *** a e a e   *   *   *   *   *
                                   *   * ^^^ ^^^   *   *   *   *   *
                                   * **+***+** *   *   *   *   *   *
                                   * * *   *   *   *   *   *   *   *
                                   * o<+*a<+*o<*   *   *   *   *   *
                                   * ^ * ^ * ^ *   *   *   *   *   *
                                   *** *** *** *   *   *   *   *   *
                                   *   *   *   *   *   *   *   *   *
                                   p   *   *   *   *   *   *   *   *
                                      #s# #s# #s# #s# #s# #s# #s# #s#
                                      ### ### ### ### ### ### ### ###
                                      ### ### ### ### ### ### ### ###
                                     "128  64  32  16   8   4   2   1"

0"FIT:y"

`, 'double_dabble');


registerCircuit('bcd to binary, 0-255', `


0"BCD = binary coded decimal, each 4 bits represents 1 decimal digit."
0"This circuit converts 3 digits of binary coded decimal to a single"
0"8-bit binary number"

0"How it works: at each layer, it sums a binary value matching a decimal"
0"number (..., 80, 100, 200, ...) if the corresponding input is on:"
0"notice how some adders don't have some of their inputs connected,"
0"essentialy making them zero bits, but they still pass through the data"
0"from the previous layer and carry. So this is literally adding"
0"decimal digits together, no multiplications by 10 are involved in this"
0"because the connections to the adders are pre-programmed with particular"
0"binary values."

0"In the circuit below, to make it slightly easier to see little '@' symbols"
0"got added wherever the connection is broken to make it a zero."

0"Because 1, 2, 4 and 8 are only single bits, those are not added in the form"
0"of horizontal lines, but at the other inputs of the first layer of adders."
0"That saves several layers."

0"The input is in BCD, so you use a 4-bit code per digit. In theory you"
0"may only use digits 0-9, though due to the way BCD works it's possible"
0"to provide values 10-15 for digits, and it'll do what you'd expect from that"
0"(That is, e.g. if giving 15 to the tens, it'll output 150)"

0"The output here only goes to 255, so if you try to give larger input it'll"
0"overflow"

0"FIT:y"

                "128    64    32    16    8     4     2     1"
                  l     l     l     l     l     l     l     l
                  ^     ^     ^     ^     ^     ^     ^     ^
                  *     *     *     *     *     *     *     *
                  *     *     *     *     *     *     *     *
              **a e **a e **a e **a e **a e     *     *     *
              v ^^^ v ^^^ v ^^^ v ^^^ v ^^^     *     *     *
              o * **o * **o * **o * **o * **    *     *     *
              ^  ;  ^  ;  ^  ;  ^  ;  ^  ;      *     *     *
              **a e **a e **a e **a e **a e     *     *     *
                ^^^   ^^^   ^^^   ^^^   ^^^     *     *     *
                * *   * *   @ *   @ *   * *     *     *     *
      ************+*****+*****+*****+*****+**   *     *     *
      *           *     *     *     *     *     *     *     *
      *       **a e **a e **a e **a e **a e **a e     *     *
      *       v ^^^ v ^^^ v ^^^ v ^^^ v ^^^ v ^^^     *     *
      *       o * **o * **o * **o * **o * **o * **    *     *
      *       ^  ;  ^  ;  ^  ;  ^  ;  ^  ;  ^  ;      *     *
      *       **a e **a e **a e **a e **a e **a e     *     *
      *         ^^^   ^^^   ^^^   ^^^   ^^^   ^^^     *     *
      *         @ *   * *   * *   @ *   @ *   * *     *     *
      *     ******+*****+*****+*****+*****+*****+**   *     *
      *     *     *     *     *     *     *     *     *     *
      *     *     * **a e **a e **a e     *     *     *     *
      *     *     * v ^^^ v ^^^ v ^^^     *     *     *     *
      *     *     **o * **o * **o * **    *     *     *     *
      *     *       ^  ;  ^  ;  ^  ;      *     *     *     *
      *     *       **a e **a e **a e     *     *     *     *
      *     *         ^^^   ^^^   ^^^     *     *     *     *
      *     *         * *   @ *   * *     *     *     *     *
      *     *     ******+*****+*****+**   *     *     *     *
      *     *     *     *     *     *     *     *     *     *
      *     *     *     * **a e **a e **a e     *     *     *
      *     *     *     * v ^^^ v ^^^ v ^^^     *     *     *
      *     *     *     * o * **o * **o * **    *     *     *
      *     *     *     * ^  ;  ^  ;  ^  ;      *     *     *
      *     *     *     ****a e **a e **a e     *     *     *
      *     *     *         ^^^   ^^^   ^^^     *     *     *
      *     *     *         * *   @ *   * *     *     *     *
      *     *     *     ******+*****+*****+**   *     *     *
      *     *     *     *     *     *     *     *     *     *
      *     *     *     *     * **a e **a e **a e     *     *
      *     *     *     *     * v ^^^ v ^^^ v ^^^     *     *
      *     *     *     *     **o * **o * **o * **    *     *
      *     *     *     *       ^  ;  ^  ;  ^  ;      *     *
      *     *     *     *       **a e **a e **a e     *     *
      *     *     *     *         ^^^   ^^^   ^^^     *     *
      *     *     *     *         * *   @ *   * *     *     *
      *     *     *     *     ******+*****+*****+**   *     *
      *     *     *     *     *     *     *     *     *     *
      *     *     *     *     *     * **a e **a e **a e     *
      *     *     *     *     *     * v ^^^ v ^^^ v ^^^     *
      *     *     *     *     *     **o * **o * **o * **    *
      *     *     *     *     *       ^  ;  ^  ;  ^  ;      *
      *     *     *     *     *       **a e **a e **a e     *
      *     *     *     *     *         ^^^   ^^^   ^^^     *
      *     *     *     *     *         * *   @ *   * *     *
      *     *     *     *     *     ******+*****+*****+**   *
      *     *     *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *     *     *
      *     *     *     *     *     *     *     *     *     *
      *     *  "|"*     *     *     * "|" *     *     *     *
      s     s  "|"s     s     s     s "|" s     s     s     s
    "200   100  | 80    40    20    10 |  8     4     2     1"
    " hundreds  |         tens         |         units       "

0"FIT:y"


`, 'bcd_to_bin');


registerCircuit('bcd to binary, 0-999', `

0"See the 0-255 circuit for the explanation of this one. This is just a"
0"slightly bigger version to do up to 999"

               "512   256   128    64    32    16    8     4     2     1"
                 l     l     l     l     l     l     l     l     l     l
                 ^     ^     ^     ^     ^     ^     ^     ^     ^     ^
           *     *     *     *     *     *     *     *     *     *     *
           *     *     *     *     *     *     *     *     *     *     *
       **a e **a e **a e **a e **a e **a e     *     *     *     *     *
       v ^^^ v ^^^ v ^^^ v ^^^ v ^^^ v ^^^     *     *     *     *     *
       o * **o * **o * **o * **o * **o * **    *     *     *     *     *
       ^  ;  ^  ;  ^  ;  ^  ;  ^  ;  ^  ;      *     *     *     *     *
       **a e **a e **a e **a e **a e **a e     *     *     *     *     *
         ^^^   ^^^   ^^^   ^^^   ^^^   ^^^     *     *     *     *     *
         @ *   * *   * *   @ *   @ *   * *     *     *     *     *     *
     ************+*****+*****+*****+*****+**   *     *     *     *     *
     *           *     *     *     *     *     *     *     *     *     *
     *       **a e **a e **a e **a e **a e **a e     *     *     *     *
     *       v ^^^ v ^^^ v ^^^ v ^^^ v ^^^ v ^^^     *     *     *     *
     *       o * **o * **o * **o * **o * **o * **    *     *     *     *
     *       ^  ;  ^  ;  ^  ;  ^  ;  ^  ;  ^  ;      *     *     *     *
     *       **a e **a e **a e **a e **a e **a e     *     *     *     *
     *         ^^^   ^^^   ^^^   ^^^   ^^^   ^^^     *     *     *     *
     *         @ *   * *   * *   @ *   @ *   * *     *     *     *     *
     *     ************+*****+*****+*****+*****+**   *     *     *     *
     *     *           *     *     *     *     *     *     *     *     *
     *     *       **a e **a e **a e **a e **a e **a e     *     *     *
     *     *       v ^^^ v ^^^ v ^^^ v ^^^ v ^^^ v ^^^     *     *     *
     *     *       o * **o * **o * **o * **o * **o * **    *     *     *
     *     *       ^  ;  ^  ;  ^  ;  ^  ;  ^  ;  ^  ;      *     *     *
     *     *       **a e **a e **a e **a e **a e **a e     *     *     *
     *     *         ^^^   ^^^   ^^^   ^^^   ^^^   ^^^     *     *     *
     *     *         @ *   * *   * *   @ *   @ *   * *     *     *     *
     *     *     ************+*****+*****+*****+*****+**   *     *     *
     *     *     *           *     *     *     *     *     *     *     *
     *     *     *       **a e **a e **a e **a e **a e **a e     *     *
     *     *     *       v ^^^ v ^^^ v ^^^ v ^^^ v ^^^ v ^^^     *     *
     *     *     *       o * **o * **o * **o * **o * **o * **    *     *
     *     *     *       ^  ;  ^  ;  ^  ;  ^  ;  ^  ;  ^  ;      *     *
     *     *     *       **a e **a e **a e **a e **a e **a e     *     *
     *     *     *         ^^^   ^^^   ^^^   ^^^   ^^^   ^^^     *     *
     *     *     *         @ *   * *   * *   @ *   @ *   * *     *     *
     *     *     *     ******+*****+*****+*****+*****+*****+**   *     *
     *     *     *     *     *     *     *     *     *     *     *     *
     *     *     *     *     * **a e **a e **a e     *     *     *     *
     *     *     *     *     * v ^^^ v ^^^ v ^^^     *     *     *     *
     *     *     *     *     **o * **o * **o * **    *     *     *     *
     *     *     *     *       ^  ;  ^  ;  ^  ;      *     *     *     *
     *     *     *     *       **a e **a e **a e     *     *     *     *
     *     *     *     *         ^^^   ^^^   ^^^     *     *     *     *
     *     *     *     *         * *   @ *   * *     *     *     *     *
     *     *     *     *     ******+*****+*****+**   *     *     *     *
     *     *     *     *     *     *     *     *     *     *     *     *
     *     *     *     *     *     * **a e **a e **a e     *     *     *
     *     *     *     *     *     * v ^^^ v ^^^ v ^^^     *     *     *
     *     *     *     *     *     * o * **o * **o * **    *     *     *
     *     *     *     *     *     * ^  ;  ^  ;  ^  ;      *     *     *
     *     *     *     *     *     ****a e **a e **a e     *     *     *
     *     *     *     *     *         ^^^   ^^^   ^^^     *     *     *
     *     *     *     *     *         * *   @ *   * *     *     *     *
     *     *     *     *     *     ******+*****+*****+**   *     *     *
     *     *     *     *     *     *     *     *     *     *     *     *
     *     *     *     *     *     *     * **a e **a e **a e     *     *
     *     *     *     *     *     *     * v ^^^ v ^^^ v ^^^     *     *
     *     *     *     *     *     *     **o * **o * **o * **    *     *
     *     *     *     *     *     *       ^  ;  ^  ;  ^  ;      *     *
     *     *     *     *     *     *       **a e **a e **a e     *     *
     *     *     *     *     *     *         ^^^   ^^^   ^^^     *     *
     *     *     *     *     *     *         * *   @ *   * *     *     *
     *     *     *     *     *     *     ******+*****+*****+**   *     *
     *     *     *     *     *     *     *     *     *     *     *     *
     *     *     *     *     *     *     *     * **a e **a e **a e     *
     *     *     *     *     *     *     *     * v ^^^ v ^^^ v ^^^     *
     *     *     *     *     *     *     *     **o * **o * **o * **    *
     *     *     *     *     *     *     *       ^  ;  ^  ;  ^  ;      *
     *     *     *     *     *     *     *       **a e **a e **a e     *
     *     *     *     *     *     *     *         ^^^   ^^^   ^^^     *
     *     *     *     *     *     *     *         * *   @ *   * *     *
     *     *     *     *     *     *     *     ******+*****+*****+**   *
     *     *     *     *     *     *     *     *     *     *     *     *
     *     *     *     *     *     *     *     *     *     *     *     *
     *     *     *     *     *     *     *     *     *     *     *     *
     *     *     *     *     *     *     *     *     *     *     *     *
     *     *     *     *  "|"*     *     *     * "|" *     *     *     *
     s     s     s     s  "|"s     s     s     s "|" s     s     s     s
   "800   400   200   100  | 80    40    20    10 |  8     4     2     1"
   "      hundreds         |         tens         |         units       "

0"FIT:y"

`, 'bcd_to_bin_999');

registerCircuit('compact 0-999 display', `


         iiiiiiiiiiiiiiiiiiiii  iiiiiiiiiiiiiiiiiiiii  iiiiiiiiiiiiiiiiiiiii
         i|| v ||| v ||| v | i  i|| v ||| v ||| v | i  i|| v ||| v ||| v | i
         i|v$l$v|v$l$v|v$l$v i  i|v$l$v|v$l$v|v$l$v i  i|v$l$v|v$l$v|v$l$v i
         i|l   l|l   l|l   l i  i|l   l|l   l|l   l i  i|l   l|l   l|l   l i
         i|$   $|$   $|$   $ i  i|$   $|$   $|$   $ i  i|$   $|$   $|$   $ i
         i|$   $|$   $|$   $ i  i|$   $|$   $|$   $ i  i|$   $|$   $|$   $ i
         $&>l$$ &>l$$ &>l$$  i  $&>l$$ &>l$$ &>l$$  i  $&>l$$ &>l$$ &>l$$  i
         i $   $ $   $ $   $ i  i $   $ $   $ $   $ i  i $   $ $   $ $   $ i
         i $   $ $   $ $   $ i  i $   $ $   $ $   $ i  i $   $ $   $ $   $ i
         i l   l l   l l   l i  i l   l l   l l   l i  i l   l l   l l   l i
         i ^$l$^ ^$l$^ ^$l$^ i  i ^$l$^ ^$l$^ ^$l$^ i  i ^$l$^ ^$l$^ ^$l$^ i
         i | ^ | | ^ | | ^ | i  i | ^ | | ^ | | ^ | i  i | ^ | | ^ | | ^ | i
         iiiiiiiiiiiiiiiii89ii  iiiiiiiiiiiiiiiii89ii  iiiiiiiiiiiiiiiii89ii
              ^^^^^^^^^^             ^^^^^^^^^^             ^^^^^^^^^^
              ssssssssss             ssssssssss             ssssssssss

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

 lllllll      lllllll lllllll lllllll        l   l   l   lI5
 ^^^^^^^      ^^^^^^^ ^^^^^^^ ^^^^^^^        ^   ^   ^   ^
 |||||||      ||||||| ||||||| |||||||        e<a e   *** *
 bBBBBBBI6    i6##### i6##### i6#####I87     ^ ^^^     * *
 bbbbBBb      ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^        * * **o<a e *
 BbBBbBB      i85####################        * *   ^ ^^^ *
 BbbBBBB          ^ ^ ^ ^ ^ ^ ^ ^ ^ ^        * *** a e a e
 BBbbBBb          s s s s s s s s s s        *   * ^^^ ^^^
 BBbBBbB                                     * **+***+** *
 BBBBBbB                                     * * *   *   *
 bbbbBBB                                     * o<+*a<+*o<*
 BBBBBBB       l l l l l l l l l l l l       * ^ * ^ * ^ *
 BBbBBBB       ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^       *** *** *** *
 BBBbBBB     | | | | | | | | | | | | |       *   *   *   *
 BBBBBbb     i5##### i5##### i5##### |       s   s   s   s
 bBBBbbB     ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ |
 BbBBBBb     p | | | | | | | | | | | |
 BBBBbbB       | | i5##### i5##### | |    v* v* l l l v* *v  v* v* l l l v* *v  v* v* l l l v* *v
 BBBbbbB       | | ^ ^ ^ ^ ^ ^ ^ ^ | |    l| l| ^ ^ ^ l x l  l| l| ^ ^ ^ l x l  l| l| ^ ^ ^ l x l
    ^^^^       | | | | | | | | | | | |     |  | | | |  * *    |  | | | |  * *    |  | | | |  * *
    ||||       | i5##### i5##### | | |  i87#######################################################I89
    ||||       | ^ ^ ^ ^ ^ ^ ^ ^ | | |                                                  ^^^^^^^^^^
    ssss       | | | | | | | | | | | |                                                  ssssssssss
               i5##### i5##### | | | |
               ^ ^ ^ ^ ^ ^ ^ ^ | | | |
               | | | | | | | | | | | |
               p | | i5##### | | | | |
                 | | ^ ^ ^ ^ | | | | |
                 | | | | | | | | | | |
                 | i5##### | | | | | |
                 | ^ ^ ^ ^ | | | | |I|
                 | | | | | | | | | |8|
                 i5##### | | | | | |5|
                 ^ ^ ^ ^ | | | | | | |
                 p | | | | | | | | | |
                   s s s s s s s s s s

`, 'compact_999_display');


registerCircuit('keypad', `



       $$l<-*   $$l<-*   $$l<-*
      $   $ |  $   $ |  $   $ |
     >l   l<| >l   l<| >l   l<|
     |$   $|| |$   $|| |$   $||
    *+>l$$ ||*+>l$$ ||*+>l$$ ||
    ||$   $||||$   $||||$   $||
    ||$   $||||$   $||||$   $||
    ||l   l||||l   l||||l   l||
    ||^$l$^||||^$l$^||||^$l$^||
    ||| ^ |||||| ^ |||||| ^ |||
    &&&&|%%%%&&&&|%%%%&&&&|%%%%
     |||||||  |||||||  |||||||
     bBBBBBB  bBBBBBB  bBBBBBB
     bbbbBBb  bbbbBBb  bbbbBBb
     BbBBbBB  BbBBbBB  BbBBbBB
     BbbBBBB  BbbBBBB  BbbBBBB
     BBbbBBb  BBbbBBb  BBbbBBb
     BBbBBbB  BBbBBbB  BBbBBbB
     BBBBBbB  BBBBBbB  BBBBBbB
     bbbbBBB  bbbbBBB  bbbbBBB
     BBBBBBB  BBBBBBB  BBBBBBB
     BBbBBBB  BBbBBBB  BBbBBBB
        ^^^^    ^^^^    ^^^^
        ||||    ||||    ||||
        ||||    ||||    ||||
        ||||    ||||    ||||
        +++*-cd<+++*-cd<+++*-cd<---*
        ||| *U  ||| *U  ||| *U     |
        ++*-+cd<++*-+cd<++*-+cd<--*|
        ||  |   ||  |   ||  |     ||
        +*--+cd<+*--+cd<+*--+cd<-*||
        |   *U  |   *U  |   *U   |||
        *---+cd<*---+cd<*---+cd<*|||
            |       |       |   ||||
            |       |       d   ||||
            |       |       ^   ||||
            *-------o#########  ||||
       %--------&   ^^^^^^^^^^  ||||
       *   *----&&  ||||||||||  ||||
     1#p 2#p 3#p&&--*+++++++++->bbbB
      ##  ##  ##&&---*++++++++->bbBb
       %---------&----*+++++++->bbBB
       *   *-----&-----*++++++->bBbb
     4#p 5#p 6#p-&------*+++++->bBbB
      ##  ##  ## &-------*++++->bBBb
       %------------------*+++->bBBB
       *   *---------------*++->Bbbb
     7#p 8#p 9#p------------*+->BbbB
      ##  ##  ## *-----------*->bbbb
                 |
                 |
         0#p-----*
          ##

0"FIT:y"

`, 'keypad');


registerTitle('Other');

registerCircuit('NAND logic II', `

0"Here we have even more NAND logic, but first the original gates again:"

s****>A****>l"NOT"


s**>A>A****>l"AND"
    ^
s****


s**>A>A****>l"OR"
      ^
s**>A**


s**>A**
  v ^ v
  A** A****>l"XOR"
  ^ v ^
s**>A**


s**>A******>l"NAND"
    ^
s****


s**>A>A>A**>l "NOR"
      ^
s**>A**


  *****>A
  *     v
s*+**>A>A
  * v   v
s**>A**>A**>l"XNOR"



0"NAND logic emulating 3-input gates"
0"smallest possible amount of gates used"


s********
        v
s**>A>A>A>A******>l      "and"
    ^
s****


s**>A******
          v
s**>A>A>A>A******>l      "or"
      ^
s**>A**


s********>A**
        v ^ v
s**>A** A** A*****>l     "xor"
  v ^ v ^ v ^
  A** A**>A**
  ^ v ^
s**>A**


s********
        v
s**>A>A>A*****>l         "nand"
    ^
s****


s**>A******
          v
s**>A>A>A>A>A***>l       "nor"
      ^
s**>A**


s*************
             *
    *****>A  *>A**
    *     v  v ^ v
s***+**>A>A  A** A***>l  "xnor"
    * v   v  ^ v ^
s****>A**>A***>A**


"a"s****>A****
         ^   v
"s"s****>A   A***>l      "mux"
       v     ^
"b"s**>A******


  ***>A**
  *   ^ *
s*+**** *
  *   v v
s*+**>A>A>A>A***>l  "majority"
  * v       ^
s**>A********

0"wire crossing with 10 NANDs (various shapes)"

                                           s
   ***>A****        s**>A**>A**>l          *
   *   ^   v          * ^   ^            *******
s***>A**>A>A***>l     *>A**>A            v v   v
   v ^ v ^            v ^ v ^          *>A>A**>A
   A** A**            A** A**          * v v v v
   ^ v ^ v            ^ v ^ v        s**>A>A>A>A**>l
s***>A**>A>A***>l     *>A**>A          * * v
   *   v   ^          * v   v          * *>A
   ***>A****        s**>A**>A**>l      * v v
                                       *>A>A
                                           *
                                           *
                                           v
                                           l

0"SR latch (inputs corrected to be not inverted)"

  "S"s***>A>A*****>l "Q"
            ^ *
  "R"s***>A>A<*

0"JK flip-flop (edge triggered, from D flip-flop, stable)"


"J" s*****>A>A>A**>A**>A**>A*****>l
           ^ ^ ^ v ^ * ^ v ^   *
"K" s*****>A>A A>A>A<* *>A>A   *
           ^ ^ ^       *   ^   *
"C" s******+*+**********   *   *
           * *             *   *
           *********************

0"half adder"


   *****>A**
   *     ^ v
s***>A**** A****>l
     ^ * v ^
s******+>A**
       *
       ***>A****>l


0"full adder"


   *****>A** *****>A**
   *     ^ v *     ^ v
s***>A**** A**>A**** A*****>l
     ^ * v ^   ^ * v ^
s******+>A**   **+>A**
       *       * *
s******+******** *
       *         v
       *********>A*********>l

0"multiplexer"

   s*****>A**
          ^ v
"C"s*****>A A**>l
        v   ^
   s***>A****


   s***>A>A**>l
        ^ ^
   s****+>A
        * ^
"C"s*****>A

`, 'nand_logic_2');

registerCircuit('NAND logic III: no wire crossings', `

0"Here we make circuits only from NAND, and without any wire crossings either."
0"So purely NAND in 2-dimensional plane (because a wire crossing is in fact"
0"3-dimensional). Of course there is the 10-NAND wire crossing and sometimes it"
0"will have to be used, but for most circuits below more minimal solutions were"
0"found."


0"All logic gates from NAND"

s****>A****>l"NOT"


s**>A>A****>l"AND"
    ^
s****


s**>A>A****>l"OR"
      ^
s**>A**


s**>A**
  v ^ v
  A** A****>l"XOR"
  ^ v ^
s**>A**


s**>A******>l"NAND"
    ^
s****


s**>A>A>A**>l "NOR"
      ^
s**>A**


s**>A**
  v ^ v
  A** A>A**>l"XNOR"
  ^ v ^
s**>A**


0"wire crossing with 10 NANDs, various shapes"

                                           s
   ***>A****        s**>A**>A**>l          *
   *   ^   v          * ^   ^            *******
s***>A**>A>A***>l     *>A**>A            v v   v
   v ^ v ^            v ^ v ^          *>A>A**>A
   A** A**            A** A**          * v v v v
   ^ v ^ v            ^ v ^ v        s**>A>A>A>A**>l
s***>A**>A>A***>l     *>A**>A          * * v
   *   v   ^          * v   v          * *>A
   ***>A****        s**>A**>A**>l      * v v
                                       *>A>A
                                           *
                                           *
                                           v
                                           l

0"Note that in electron mode, there are some flickering garbage signals in the"
0"wire crossing due to different path lengths. This is never fixable with NAND"
0"gates. This can only be fixed with buffers (delays). We can use LEDs as such"
0"buffers (after all, we're allowed to use l, but not o which you'd normally"
0"use for that). The longest path goes through 5 gates, so LEDs are added such"
0"that every possible path from input to output is 5 devices long."

s****>l>l>A>l>A****>l
    *     ^   ^
    *>l>A**>l>A
    v   ^ v   ^
    A**** A****
    ^   v ^   v
    *>l>A**>l>A
    *     v   v
s****>l>l>A>l>A****>l



0"Half adder without wire crossings:"

s*****>A>A*******>l
     * ^ ^ v
     *>A>A A
       ^ ^ v
s*********>A>A***>l


0"Full adder without wire crossings:"

s*********>A>A****>l
       v v ^ ^
     *>A>A A *
     * v v ^ *
s*****>A>A**>A
         v v ^
       *>A>A A
       * v v ^
s*******>A>A******>l



        "carry"
           s
           *
           *
           *
s********* *****
     v   v v   v
     A**>A A**>A
     ^ v v ^ v v
s*****>A>A**>A>A******>l
     *   v v   v
     *   A A<**A
     *   v v
     ***>A>A
           *
           v
           l
        "carry"

0"The adders also suffer a lot from garbage flickering in electron mode,"
0"so here is a version with delay-LEDs in between:"


s*******>l>l>l>l>A>l>l>l**>A******>l
       v v       ^         ^
   ***>A>A       A         *
   *   v v       ^         *
s***>l>A>A********>l>l>l>l>A
                 v v       ^
             ***>A>A       A
             *   v v       ^
s*************>l>A>A**************>l


0"SR latch (inputs corrected to be not inverted)"

  "S"s***>A>A*****>l "Q"
            ^ *
  "R"s***>A>A<*


0"JK latch"

          *****
          *   v
  "J"s***>A<*>A*****>l "Q"
          v * *
  "K"s***>A>A<*


0"Gated D Latch"

 "D" s**>A**>A*****>l
         ^ v ^ *
 "E" s****>A>A<*


0"D flipflop with NAND and no wire crossings:"


 "D"s**********>A**>A**>A**>A*****>l
                ^ v ^ * ^ v ^ *
                A>A>A<* *>A>A<*
                ^       *
 "C"s********************


0"T flip flop"


          *********************
          v v                 *
        *>A>A *>A**>A**>A**>A*****>l
        * v v * ^ v ^ * ^ v ^ *
 "T"s****>A>A** A>A>A<* *>A>A<*
                ^       *
 "C"s********************


0"single-input T flip flop"


                *************
                v           *
                A**>A<*>A**>A<*
                ^ v v * ^ v v *
                A>A>A** *>A>A**
                ^       *     *
    s********************     ****>l




0"JK flipflop with NAND and no wire crossings:"


          *******************
          v v               *
"K"s*****>A>A *>A**>A**>A**>A*****>l
          v v * ^ v ^ * ^ v ^ *
"J"s*****>A>A** A>A>A<* *>A>A<*
                ^       *
"C"s*********************


`, 'nowirecross');




registerCircuit('mirror bits', `
     l l l l l l l l      llllllll
     ^ ^ ^ ^ ^ ^ ^ ^      ^^^^^^^^
     * * * * * * * *      ||||||||
     *  x   x   x  *      ||||||||
     * * * * * * * *      76543210
      x   x   x   x       ========
     * * * * * * * *      01234567
     *  x   x   x  *      ||||||||
     * * * * * * * *      ||||||||
      x   x   x   x       ssssssss
     * * * * * * * *
     *  x   x   x  *
     * * * * * * * *
      x   x   x   x
     * * * * * * * *
     *  x   x   x  *
     * * * * * * * *
      x   x   x   x
     * * * * * * * *
     s s s s s s s s
`, 'mirror');


registerCircuit('shuffle & unshuffle bits', `

0"Shuffle is a particular bit permutation"

     l l l l l l l l      llllllll
     ^ ^ ^ ^ ^ ^ ^ ^      ^^^^^^^^
     * * * * * * * *      ||||||||
     *  x   x   x  *      ||||||||
     * * * * * * * *      04152637
     * *  x   x  * *      ========
     * * * * * * * *      01234567
     * * *  x  * * *      ||||||||
     * * * * * * * *      ||||||||
     s s s s s s s s      ssssssss

     l l l l l l l l      llllllll
     ^ ^ ^ ^ ^ ^ ^ ^      ^^^^^^^^
     * * * * * * * *      ||||||||
     * * *  x  * * *      ||||||||
     * * * * * * * *      02461357
     * *  x   x  * *      ========
     * * * * * * * *      01234567
     *  x   x   x  *      ||||||||
     * * * * * * * *      ||||||||
     s s s s s s s s      ssssssss

`, 'shuffle');




registerCircuit('gray code', `

0"binary to gray code"

  l  l  l  l  l  l  l  l
  ^  ^  ^  ^  ^  ^  ^  ^
  *  *  *  *  *  *  *  *
  *  *  *  *  *  *  *  *
  * >e >e >e >e >e >e >e
  */ ^/ ^/ ^/ ^/ ^/ ^/ ^
  *  *  *  *  *  *  *  *
  *  *  *  *  *  *  *  *
  s  s  s  s  s  s  s  s
                      "1"

0"gray code to binary"

  l  l  l  l  l  l  l  l
  ^  ^  ^  ^  ^  ^  ^  ^
  *  *  *  *  *  *  *  *
  *  *  *  *  *  *  *  *
  **>e*>e*>e*>e*>e*>e*>e
  *  ^  ^  ^  ^  ^  ^  ^
  *  *  *  *  *  *  *  *
  *  *  *  *  *  *  *  *
  s  s  s  s  s  s  s  s
                      "1"


0"both undo each other"

  l  l  l  l  l  l  l  l
  ^  ^  ^  ^  ^  ^  ^  ^
  *  *  *  *  *  *  *  *
  *  *  *  *  *  *  *  *
  **>e*>e*>e*>e*>e*>e*>e
  *  ^  ^  ^  ^  ^  ^  ^
  *  *  *  *  *  *  *  *
  *  *  *  *  *  *  *  *
  * >e >e >e >e >e >e >e
  */ ^/ ^/ ^/ ^/ ^/ ^/ ^
  *  *  *  *  *  *  *  *
  *  *  *  *  *  *  *  *
  s  s  s  s  s  s  s  s


0"both undo each other II"

  l  l  l  l  l  l  l  l
  ^  ^  ^  ^  ^  ^  ^  ^
  *  *  *  *  *  *  *  *
  *  *  *  *  *  *  *  *
  * >e >e >e >e >e >e >e
  */ ^/ ^/ ^/ ^/ ^/ ^/ ^
  *  *  *  *  *  *  *  *
  *  *  *  *  *  *  *  *
  *  *  *  *  *  *  *  *
  **>e*>e*>e*>e*>e*>e*>e
  *  ^  ^  ^  ^  ^  ^  ^
  *  *  *  *  *  *  *  *
  s  s  s  s  s  s  s  s

`, 'gray_code');


registerCircuit('bit sorter', `

0"The bit sorter sorts the input bits by value, putting all 0's left and all"
0"1's right"

0"slowest even if it looks small. Use electron mode to see speed difference"
0"Note the single input gates on the sides, they are just buffers to make all"
0"path lengths the same."


l l l l l l l l
^ ^ ^ ^ ^ ^ ^ ^
* * * * * * * *
* * * * * * * *
o a o a o a o a"8"
^ ^^^ ^^^ ^^^ ^
a o a o a o a o"7"
^^^ ^^^ ^^^ ^^^
o a o a o a o a"6"
^ ^^^ ^^^ ^^^ ^
a o a o a o a o"5"
^^^ ^^^ ^^^ ^^^
o a o a o a o a"4"
^ ^^^ ^^^ ^^^ ^
a o a o a o a o"3"
^^^ ^^^ ^^^ ^^^
o a o a o a o a"2"
^ ^^^ ^^^ ^^^ ^
a o a o a o a o"1"
^^^ ^^^ ^^^ ^^^
* * * * * * * *
* * * * * * * *
s s s s s s s s


0"Bitonic sort"
0"Stages with the same number indicated happen in parallel, which is"
0"why this is faster than the above: 6 instead of 8 gate delays"

l   l   l   l   l   l   l   l
^   ^   ^   ^   ^   ^   ^   ^
*   *   *   *   *   *   *   *
a< >o   a< >o   a< >o   a< >o
^ x ^   ^ x ^   ^ x ^   ^ x ^"6"
** **   ** **   ** **   ** **
*   *   *   *   *   *   *   *
a<**|**>o   *   a<**|**>o   *
^   X   ^   *   ^   X   ^   *"5"
****|****   *   ****|****   *
*   *   *   *   *   *   *   *
*   a<**|**>o   *   a<**|**>o
*   ^   X   ^   *   ^   X   ^"5"
*   ****|****   *   ****|****
*   *   *   *   *   *   *   *
*   *   *   a< >o   *   *   *
*   *   *   ^ x ^   *   *   *"4"
*   *   *   ** **   *   *   *
*   *   *   *   *   *   *   *
*   *   a<**+* *+**>o   *   *
*   *   ^   * x *   ^   *   *"4"
*   *   ****+* *+****   *   *
*   *   *   *   *   *   *   *
*   a<**+***+* *+***+**>o   *
*   ^   *   * x *   *   ^   *"4"
*   ****+***+* *+***+****   *
*   *   *   *   *   *   *   *
a<**+***+***+* *+***+***+**>o
^   *   *   * x *   *   *   ^"4"
****+***+***+* *+***+***+****
*   *   *   *   *   *   *   *
a< >o   a< >o   a< >o   a< >o
^ x ^   ^ x ^   ^ x ^   ^ x ^"3"
** **   ** **   ** **   ** **
*   *   *   *   *   *   *   *
*   a< >o   *   *   a< >o   *
*   ^ x ^   *   *   ^ x ^   *"2"
*   ** **   *   *   ** **   *
*   *   *   *   *   *   *   *
a<**+* *+**>o   a<**+* *+**>o
^   * x *   ^   ^   * x *   ^"2"
****+* *+****   ****+* *+****
*   *   *   *   *   *   *   *
a< >o   a< >o   a< >o   a< >o
^ x ^   ^ x ^   ^ x ^   ^ x ^"1"
** **   ** **   ** **   ** **
*   *   *   *   *   *   *   *
s   s   s   s   s   s   s   s


0"FIT:y"

0"Batcher odd-even mergesort"
0"Same speed as above, different shape."


l   l   l   l   l   l   l   l
^   ^   ^   ^   ^   ^   ^   ^
*   *   *   *   *   *   *   *
*   a< >o   a< >o   a< >o   *
*   ^ x ^   ^ x ^   ^ x ^   *"6"
*   ** **   ** **   ** **   *
*   *   *   *   *   *   *   *
*   *   a<**|**>o   *   *   *
*   *   ^   X   ^   *   *   *"5"
*   *   ****|****   *   *   *
*   *   *   *   *   *   *   *
*   *   *   a<**|**>o   *   *
*   *   *   ^   X   ^   *   *"5"
*   *   *   ****|****   *   *
*   *   *   *   *   *   *   *
a<**+***|***+**>o   *   *   *
^   *   X   *   ^   *   *   *"4"
****+***|***+****   *   *   *
*   *   *   *   *   *   *   *
*   a<**+***|***+**>o   *   *
*   ^   *   X   *   ^   *   *"4"
*   ****+***|***+****   *   *
*   *   *   *   *   *   *   *
*   *   a<**+***|***+**>o   *
*   *   ^   *   X   *   ^   *"4"
*   *   ****+***|***+****   *
*   *   *   *   *   *   *   *
*   *   *   a<**+***|***+**>o
*   *   *   ^   *   X   *   ^"4"
*   *   *   ****+***|***+****
*   *   *   *   *   *   *   *
*   a< >o   *   *   a< >o   *
*   ^ x ^   *   *   ^ x ^   *"3"
*   ** **   *   *   ** **   *
*   *   *   *   *   *   *   *
a<**|**>o   *   a<**|**>o   *
^   X   ^   *   ^   X   ^   *"2"
****|****   *   ****|****   *
*   *   *   *   *   *   *   *
*   a<**|**>o   *   a<**|**>o
*   ^   X   ^   *   ^   X   ^"2"
*   ****|****   *   ****|****
*   *   *   *   *   *   *   *
*   *   *   *   *   *   *   *
a< >o   a< >o   a< >o   a< >o
^ x ^   ^ x ^   ^ x ^   ^ x ^"1"
** **   ** **   ** **   ** **
*   *   *   *   *   *   *   *
s   s   s   s   s   s   s   s



0"Finally, here is the original bit sorter attached to an 8-bit random generator,"
0"to easily test different patterns:

l l l l l l l l
^ ^ ^ ^ ^ ^ ^ ^
* * * * * * * *
* * * * * * * *
o a o a o a o a"8"
^ ^^^ ^^^ ^^^ ^
a o a o a o a o"7"
^^^ ^^^ ^^^ ^^^
o a o a o a o a"6"
^ ^^^ ^^^ ^^^ ^
a o a o a o a o"5"
^^^ ^^^ ^^^ ^^^
o a o a o a o a"4"
^ ^^^ ^^^ ^^^ ^
a o a o a o a o"3"
^^^ ^^^ ^^^ ^^^
o a o a o a o a"2"
^ ^^^ ^^^ ^^^ ^
a o a o a o a o"1"
^^^ ^^^ ^^^ ^^^
* * * * * * * *
* * * * * * * *
? ? ? ? ? ? ? ?
^ ^ ^ ^ ^ ^ ^ ^
***************
              s



0"MODE:electron"



`, 'sorter');

registerCircuit('4-bit majority gate', `

0"4-bit majority gate"

   l
   ^
   |
   o############
   ^   ^   ^   ^
   a## a## a## a##
   ^^^ ^^^ ^^^ ^^^
   ||| ||| ||| |||
   *++-*++-*++-+++-
   |*+--*+--++-*++-
   ||*---+--*+--*+-
   |||*--*---*---*-
   ||||
   ssss

0"for more bits, try the bit sorter"

`, '4_bit_majority');


registerCircuit('population count', `

0"The population count circuit outputs in binary how many inputs bits are one."
0"They can be made from half and full adders, with corresponding bits"
0"criss-cross connected to next layers. For example, the 2-bit population is a"
0"half adder, 3-bit population count is a full adder, and the higher ones use"
0"more and more adders. Those circuits are not guaranteed to be optimal."


     "1"
      l
      ^
      s  "1-bit popcount: trivial"0


     "2 1"
      l l
      ^ ^
      a e
      ^^^
      s s "2-bit popcount: half adder"0


     "2   1"
      l   l
      ^   ^
      o<a e
      ^ ^^^
      a e *
      ^^^ *
      s s s "3-bit popcount: full adder"0


     "4 2   1"
      l l   l
      ^ ^   ^
      a e<a e
      ^^^ ^^^
      * * * *
      *  x  *
      a e a e
      ^^^ ^^^
      s s s s "4-bit popcount"0


     "4   2   1"
      l   l   l
      ^   ^   ^
      o<a e   *
      ^ ^^^   *
      a e **a e
      ^^^   ^^^
      * *** * *
      *    x  *
      o<a e * *
      ^ ^^^ * *
      a e * a e
      ^^^ * ^^^
      s s s s s "5-bit popcount"0


     "4   2     1"
      l   l     l
      ^   ^     ^
      o<a e     *
      ^ ^^^     *
      a e ****a e
      ^^^     ^^^
      * *** *** *
      *    x    *
      o<a e o<a e
      ^ ^^^ ^ ^^^
      a e * a e *
      ^^^ * ^^^ *
      s s s s s s "6-bit popcount"0


     "4   2       1"
      l   l       l
      ^   ^       ^
      o<a e **o<a e
      ^ ^^^/  ^ ^^^
      a e *   a e *
      ^^^     ^^^ *
      * *** *** * *
      *    x    * *
      o<a e o<a e *
      ^ ^^^ ^ ^^^ *
      a e * a e * *
      ^^^ * ^^^ * *
      s s s s s s s "7-bit popcount"0


     "8   4     2   1"
      l   l     l   l
      ^   ^     ^   ^
      o<a e o<a e   *
      ^ ^^^/^ ^^^   *
      a e * a e **a e
      ^^^   ^^^   ^^^
      * *   * *   * *
      * *** * * *** *
      *    x   x    *
      * *** * * *   *
      * *    x  *   *
      a e<a e a e<a e
      ^^^ ^^^ ^^^ ^^^
      * * * * * * * *
      *  x  * *  x  *
      a e a e a e a e
      ^^^ ^^^ ^^^ ^^^
      s s s s s s s s "8-bit popcount"0


     "8   4     2     1"
      l   l     l     l
      ^   ^     ^     ^
      *   *     *     *
      *   *     *     *
      o<a e o<a e o<a e
      ^ ^^^/^ ^^^/^ ^^^
      a e * a e * a e *
      ^^^   ^^^   ^^^ *
      * *   * *   * * *
      * *** * * *** * *
      *    x   x    * *
      * *** * * *   * *
      * *    x  *   * *
      a e<a e a e<a e *
      ^^^ ^^^ ^^^ ^^^ *
      * * * * * * * * *
      *  x  * *  x  * *
      a e a e a e a e *
      ^^^ ^^^ ^^^ ^^^ *
      s s s s s s s s s  "9-bit popcount"0

`, 'popcount');



registerCircuit('random number', `

0"Roll a random number from 0-255 by pushing the button"


TTTTTTTT
^^^^^^^^
????????
^^^^^^^^
********
c
^
p

`, 'roll');


registerTitle('Cellular Automata');


registerCircuit('Conway\'s game of life single cell', `

0"A single cell of Conway's game of life. If the clock is activated, it will go"
0"on if it has 3 neighbors, stay on if it was on and has 2 neighbors, go off in"
0"all other cases. The neighbors here are the small switches on the sides"

0"Internally, half and full adders are used for population count to do that"
0"computation."

0"For compactness, a wire bus from all inputs to the core is used."

                         s
            |           ||         |
          ==8===========80=========8==
          =                          =
          =           ###"clock"     =
          =           ###            =
        s-7           ##p-->c<d      1-s
          = *----]a------>a>d ^      =
          = *     ^       ^ t<*p#    =
          = o<a e>e<o<a e>o<*  ##    =
          = ^ ^^^   ^ ^^^   *"toggle"=
          = a e *   a e *   *        =
          = ^^^ *   ^^^ *   *        =
          = * * ** ** * *** *        =
        s-6 * *   x   *   * *        8-
         -8 * * ** ** *   * *        2-s
          = *  x     x    * *        =
          = a e o<a e o<a e *        =
          = ^^^ ^ ^^^ ^ ^^^ *        =
          = * * a e * a e * * ###### =
          = * * ^^^ * ^^^ * * ###### =
          = * * * * * * * * * ###### =
          ==0=1=2=3=4=5=6=7=8>l##### =
          =                   ###### =
        s-5                   ###### 3-s
          =                          =
          =                          =
          =                          =
          ==8===========48=========8==
            |           ||         |
                        s

`, 'gol_cell');


registerCircuit('Conway\'s game of life', `

   "tick" g    "autotick"
    p##-->o<-----r##
    ###          ###
    ###          ###




     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx

0"FIT:y"

          l           ls          l
           V          ^|         V
       s    *         ||        *    s          l
        ; ==8=========80========8== /      ls   ^   sl
         *7                       1*        V;  |s /V
          =             g-->c<d   =          ;V |vV/
          = *----]a------>a>d ^   =           i####
          = |     ^       ^ t<*s  =           #   #<--s
          = o<a e>e<o<a e>o<*     =         s>#   #-->l
          = ^ ^^^   ^ ^^^   |     =       l<--#>l #<s
          = a e *   a e *   |     =           #   #
          = ^^^ |   ^^^ |   |     =          /#####;
       s--6 0 2 4   1 3 5   |     8->l      VV  ^| VV
       l<-8 =============== |     2--s     l/   s|  ;l
          = 0 1 2   3 4   5 |     =        s     v   s
          = a e o<a e o<a e |     =              l
          = ^^^ ^ ^^^ ^ ^^^ |     =
          = * * a e * a e * |     =
          = | | ^^^ | ^^^ | |     =I
          = | | * * | * * | |     =
          ==0=1=2=3=4=5=6=7=8>l   =
         *5                       3*
        / ==8=========48========8== ;
       s    *         ||        *    s
           V          |v         V
          l           sl          l

`, 'game_of_life');

registerCircuit('Conway\'s game of life galaxy', `

   "tick" g    "autotick"
    p##-->o<-----###
    ###         2R##<d<C
    ###          ### 4




     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiviiiiv1iiiv1iiiv1iiiv1iiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiviiiiv1iiiv1iiiv1iiiv1iiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiv1iiiv1iiiv1iiiv1iiiviiiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiv1iiiv1iiiv1iiiv1iiiviiiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx
    viiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv
    >i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>
    <i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<
    ^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^
     x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx

0"FIT:y"

          l           ls          l
           V          ^|         V
       s    *         ||        *    s          l
        ; ==8=========80========8== /      ls   ^   sl
         *7                       1*        V;  |s /V
          =         g------>c<d   =          ;V |vV/
          = *----]a------>a>d ^   =           i####
          = |     ^       ^ t<*s  =           #   #<--------o<sI1
          = o<a e>e<o<a e>o<*     =         s>#   #-->l     ^
          = ^ ^^^   ^ ^^^   |     =       l<--#>l #<s       a<
          = a e *   a e *   |     =           #   #         m|
          = ^^^ |   ^^^ |   |     =          /#####;        d|
       s--6 0 2 4   1 3 5   |     8->l      VV  ^| VV       ^|
       l<-8 =============== |     2--s     l/   s|  ;l      C*
          = 0 1 2   3 4   5 |     =        s     v   s
          = a e o<a e o<a e |     =              l
          = ^^^ ^ ^^^ ^ ^^^ |     =
          = * * a e * a e * |     =
          = | | ^^^ | ^^^ | |     =I
          = | | * * | * * | |     =
          ==0=1=2=3=4=5=6=7=8>l   =
         *5                       3*
        / ==8=========48========8== ;
       s    *         ||        *    s
           V          |v         V
          l           sl          l

`, 'gol_galaxy');


registerCircuit('Conway\'s game of life wrap', `

   "tick" g    "autotick"
    p##-->o<-----###
    ###          ##r4
    ###          ###



     nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
     uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu

0"FIT:y"



          l           ls          l
           V          ^|         V
       s    *         ||        *    s          l
        ; ==8=========80========8== /      ls   ^   sl
         *7                       1*        V;  |s /V
          =             g-->c<d   =          ;V |vV/
          = *----]a------>a>d ^   =           i####
          = |     ^       ^ t<*s  =           #   #<--s
          = o<a e>e<o<a e>o<*     =         s>#   #-->l
          = ^ ^^^   ^ ^^^   |     =       l<--#>l #<s
          = a e *   a e *   |     =           #   #
          = ^^^ |   ^^^ |   |     =          /#####;
       s--6 0 2 4   1 3 5   |     8->l      VV  ^| VV
       l<-8 =============== |     2--s     l/   s|  ;l
          = 0 1 2   3 4   5 |     =        s     v   s
          = a e o<a e o<a e |     =              l
          = ^^^ ^ ^^^ ^ ^^^ |     =
          = * * a e * a e * |     =
          = | | ^^^ | ^^^ | |     =I
          = | | * * | * * | |     =
          ==0=1=2=3=4=5=6=7=8>l   =
         *5                       3*
        / ==8=========48========8== ;
       s    *         ||        *    s
           V          |v         V
          l           sl          l

`, 'gol_wrap');


registerCircuit('Conway\'s game of life ship', `

   "tick" g    "autotick"
    p##-->o<-----###
    ###         1R##<d<C
    ###          ### 4



     nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv1iiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv1iiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv1iiiv1iiiv1iiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
    (x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx x^vx )
    (iiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiviiiiv)
    (i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>i<pi>)
    (i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<i>li<)
    (iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^iiii^)
     uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu

0"FIT:y"


          l           ls          l
           V          ^|         V
       s    *         ||        *    s          l
        ; ==8=========80========8== /      ls   ^   sl
         *7                       1*        V;  |s /V
          =         g------>c<d   =          ;V |vV/
          = *----]a------>a>d ^   =           i####
          = |     ^       ^ t<*s  =           #   #<--------o<sI1
          = o<a e>e<o<a e>o<*     =         s>#   #-->l     ^
          = ^ ^^^   ^ ^^^   |     =       l<--#>l #<s       a<
          = a e *   a e *   |     =           #   #         m|
          = ^^^ |   ^^^ |   |     =          /#####;        d|
       s--6 0 2 4   1 3 5   |     8->l      VV  ^| VV       ^|
       l<-8 =============== |     2--s     l/   s|  ;l      C*
          = 0 1 2   3 4   5 |     =        s     v   s
          = a e o<a e o<a e |     =              l
          = ^^^ ^ ^^^ ^ ^^^ |     =
          = * * a e * a e * |     =
          = | | ^^^ | ^^^ | |     =I
          = | | * * | * * | |     =
          ==0=1=2=3=4=5=6=7=8>l   =
         *5                       3*
        / ==8=========48========8== ;
       s    *         ||        *    s
           V          |v         V
          l           sl          l

`, 'gol_ship');

registerCircuit('Langtons Ant', `
0"Langton's Ant"

0"This circuit is without clock, and only works in 'electron' mode, not in"
0"'fast' mode. Make this clocked with global wire to make it work in"
0"'fast' mode."

0"MODE:electron"


      nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<i1i<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
     ( v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^ v ^)
     (<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii<iii)
     ( ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi ivi)
     (>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili>ili)
      uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu


0"FIT:y"


               s       l
               *       ^
         ******+******>o
         *     *       ^
         a[****+******>a
         ^     *     * ^                                      O*
         o ****+****** o                                      v|
         ^ v   *     * ^               s l             s l    d|
    l<*o<+*a<o<*>o>a*+*+**I            | ^             | ^    v|
       ^ *     v   m * * *             v |             v |    e<
    s**+******>c######<**+*s          i####           i####   v
       * *     ^   v * * v         l<-# v #<-s     l<-# v #<--o<-sI1
       **+*a<o<*>o>a*+*+>o>l          # l #           # l #
         v m   *     * v           s->#   #->l     s->#   #->l
         o *   *     * o              #####           #####
         v *   *     * v               | ^             | ^
         a<****+******]a               v |             v |
         v     *     * *               l s             l s
         o<****+*****+**
         v     *     v
         l     s     l


`, 'langtons_ant');



registerTitle('Large');




registerCircuit('16-bit carry lookahead adder', `
0"MODE:electron (set to electron by default to show the gate delays)"

0"This circuit combines 4 4-bit CLA's to form a fast 16-bit adder. Read the"
0"description of the 4-bit CLA first before this one."

0"An IC (I0) is used in the circuit at the bottom to define the 4-bit CLA. Then"
0"the IC is used 4 times (the boxes with i0) to get the 16-bit adder."

0"Note that the CLU logic (the logic with the large AND and OR gates) for the"
0"16-bit unit is the exact same logic as the CLU logic in the 4-bit unit. We"
0"just replaced the 1-bit full adders with 4-bit CLAs."

0"A 64-bit adder can be made recursively from this again, and so on."


2"c0 "----------------------------------------*---------------*-----------*--------*---s"c0"
2"p0 "-----*---------------------------------*+--------------*+----------*+--*     *
2"g0 "-----+-------------*---------------*---++-----------*--++--------*-++-*|     *
2"p4 "----*+------------*+--------------*+--*++----------*+-*++--*     * || ||     *
2"g4 "----++--------*---++-----------*--++--+++--------*-++-+++-*|     * || ||     *
2"p8 "---*++-------*+--*++----------*+-*++-*+++--*     * || ||| ||     * || ||     *
2"g8 "---+++----*--++--+++--------*-++-+++-++++-*|     * || ||| ||     * || ||     *
2"p12"--*+++---*+-*++-*+++--*     * || ||| |||| ||     * || ||| ||     * || ||     *
2"g12"--++++-*-++-+++-++++-*|     * || ||| |||| ||     * || ||| ||     * || ||     *
        vvvv v vv vvv vvvv ||     v vv vvv vvvv ||     v vv vvv ||     v vv ||     v
        a### a a# a## a### ||     a a# a## a### ||     a a# a## ||     a a# ||     a
        v    v v  v   v    ||     v v  v   v    ||     v v  v   ||     v v  ||     v
        o    o#########    ||     o#########    ||     o#####   ||     o##  ||     o
2"pg"l<-*    * "not c16"   ||     * "c12"       ||     * "c8"   ||     *"c4"||     *
2"gg"l<------* "but gg"    ||     *             ||     *        ||     *    ||     *
                           ||     *             ||     *        ||     *    ||     *
                           ||llll *             ||llll *        ||llll *    ||llll *
                           ||^^^^ v             ||^^^^ v        ||^^^^ v    ||^^^^ v
                           iiiiiiii             iiiiiiii        iiiiiiii    iiiiiiii
                           iiiiiiii             iiiiiiii        iiiiiiii    iiiiiiii
                           iiiiiii0             iiiiiii0        iiiiiii0    iiiiiii0
                           ^^^^^^^^             ^^^^^^^^        ^^^^^^^^    ^^^^^^^^
                           ssssssss             ssssssss        ssssssss    ssssssss
                          "abababab             abababab        abababab    abababab"

                          "33118844             22115522        11663311    88442211"
                          "2266kkkk             kkkk1155        22442266"
                          "kkkk                     2266        88"


                                                          I0                  s"c0"
 2"c0"--------------------------------------------*------------*--------*-----*
 2"p0"-------*-----------------------------------*+-----------*+-------*+---* *
 2"g0"-------+---------------*---------------*---++--------*--++-----*-++-* * *
 2"p1"------*+--------------*+--------------*+--*++-------*+-*++---* * || * * *
 2"g1"------++----------*---++-----------*--++--+++-----*-++-+++-* * * || * * *
 2"p2"-----*++---------*+--*++----------*+-*++-*+++---* * || ||| * * * || * * *
 2"g2"-----+++------*--++--+++--------*-++-+++-++++-* * * || ||| * * * || * * *
 2"p3"----*+++-----*+-*++-*+++------* * || ||| |||| * * * || ||| * * * || * * *
 2"g3"----++++---*-++-+++-++++----* * * || ||| |||| * * * || ||| * * * || * * *
          vvvv   v vv vvv vvvv    * * v vv vvv vvvv * * v vv vvv * * v vv * * v
    "pg"  a###   a a# a## a###    * * a a# a## a### * * a a# a## * * a a# * * a
  "gg"l   v      v v  v   v       * * v v  v   v    * * v v  v   * * v v  * * v
    l ^   o      o#########       * * o#########    * * o#####   * * o##  * * o
    ^ *---*      * "not c4"       * * *"c3"         * * *"c2"    * * *"c1"* * *
    *------------* "but gg"       * * *             * * *        * * *    * * *
                                  * * *             * * *        * * *    * * *
                                  * * *             * * *        * * *    * * *
                                  * * * l           * * * l      * * * l  * * * l
                                  * * v ^           * * v ^      * * v ^  * * v ^
                                  * *>e**           * *>e**      * *>e**  * *>e**
                                  * *               * *          * *      * *
                                  a e               a e          a e      a e
                                  ^^^               ^^^          ^^^      ^^^
                                  * *               * *          * *      * *
                                  * *               * *          * *      * *
                                  s s               s s          s s      s s

0"FIT:y"

`, 'cla_adder_16');


registerCircuit('16-bit ripple vs lookahead speed comparison', `

0"MODE:electron (set to electron by default to show the gate delays)"

0"This circuit allows to compare the speed of the 16-bit ripple carry adder and"
0"16-bit carry lookahead adder in electron mode. The input A has already been"
0"set to all ones to enable the case with longest carry propagation. Just press"
0"the buttons marked 'CARRY' or alternatively the ones marked 'B1' (the first"
0"bit of B) (but not both at the same time) to see the rippling propagation in"
0"the first adder, and the faster update in the second adder"

0"NOTE: you can look at the ticks counter above to see how long updates take,"
0"      and can reset the ticks counter to 0 by clicking it."


        l     l     l     l     l     l     l     l     l     l     l     l     l     l     l     l
        ^     ^     ^     ^     ^     ^     ^     ^     ^     ^     ^     ^     ^     ^     ^     ^ ###
  l<o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e o<a e s##"<------ CARRY"
    ^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/^ ^^^/###
    a e * a e * a e * a e * a e * a e * a e * a e * a e * a e * a e * a e * a e * a e * a e * a e *
    ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^   ^^^
    * *   * *   * *   * *   * *   * *   * *   * *   * *   * *   * *   * *   * *   * *   * *   * *
    * *   * *   * *   * *   * *   * *   * *   * *   * *   * *   * *   * *   * *   * *   * *   * *
    * s   * s   * s   * s   * s   * s   * s   * s   * s   * s   * s   * s   * s   * s   * s   * s##"<------ B1"
    *     *     *     *     *     *     *     *     *     *     *     *     *     *     *     * ###
    S     S     S     S     S     S     S     S     S     S     S     S     S     S     S     S ###



                             llll                 llll            llll        llll
                             ^^^^                 ^^^^            ^^^^        ^^^^     ###
2"c0 "-----------------------++++-------------*---++++--------*---++++----*---++++-*---s##"<------ CARRY"
2"p0 "-----*-----------------++++------------*+---++++-------*+---++++---*+--*|||| *   ###
2"g0 "-----+-------------*---++++--------*---++---++++----*--++---++++-*-++-*||||| *
2"p4 "----*+------------*+---++++-------*+--*++---++++---*+-*++--*|||| * || |||||| *
2"g4 "----++--------*---++---++++----*--++--+++---++++-*-++-+++-*||||| * || |||||| *
2"p8 "---*++-------*+--*++---++++---*+-*++-*+++--*|||| * || ||| |||||| * || |||||| *
2"g8 "---+++----*--++--+++---++++-*-++-+++-++++-*||||| * || ||| |||||| * || |||||| *
2"p12"--*+++---*+-*++-*+++--*|||| * || ||| |||| |||||| * || ||| |||||| * || |||||| *
2"g12"--++++-*-++-+++-++++-*||||| * || ||| |||| |||||| * || ||| |||||| * || |||||| *
        vvvv v vv vvv vvvv |||||| v vv vvv vvvv |||||| v vv vvv |||||| v vv |||||| v
        a### a a# a## a### |||||| a a# a## a### |||||| a a# a## |||||| a a# |||||| a
        v    v v  v   v    |||||| v v  v   v    |||||| v v  v   |||||| v v  |||||| v
        o    o#########    |||||| o#########    |||||| o#####   |||||| o##  |||||| o
2"pg"l<-*    * "not c16"   |||||| * "c12"       |||||| * "c8"   |||||| *"c4"|||||| *
2"gg"l<------* "but gg"    |||||| *             |||||| *        |||||| *    |||||| *
                           |||||| *             |||||| *        |||||| *    |||||| *
                           |||||| *             |||||| *        |||||| *    |||||| *
                           |||||| v             |||||| v        |||||| v    |||||| v
                           iiiiiiii             iiiiiiii        iiiiiiii    iiiiiiii
                           iiiiiiii             iiiiiiii        iiiiiiii    iiiiiiii
                           iiiiiii0             iiiiiii0        iiiiiii0    iiiiiii0
                           ^^^^^^^^             ^^^^^^^^        ^^^^^^^^    ^^^^^^^^
                           SsSsSsSsS            SsSsSsSs        SsSsSsSs    SsSsSsSs##"<------ B1"
                                                                                   ###
                                                                                   ###
0"FIT:y"


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



0"The circuit below is the chip-template for the 4-bit CLA used 4 times above."
0"Using a chip has no effect on speed. It does obscure some of the logic above"
0"from view but otherwise it would be too large to fit on a screen."

                                                          I0                  s"c0"
 2"c0"--------------------------------------------*------------*--------*-----*
 2"p0"-------*-----------------------------------*+-----------*+-------*+---* *
 2"g0"-------+---------------*---------------*---++--------*--++-----*-++-* * *
 2"p1"------*+--------------*+--------------*+--*++-------*+-*++---* * || * * *
 2"g1"------++----------*---++-----------*--++--+++-----*-++-+++-* * * || * * *
 2"p2"-----*++---------*+--*++----------*+-*++-*+++---* * || ||| * * * || * * *
 2"g2"-----+++------*--++--+++--------*-++-+++-++++-* * * || ||| * * * || * * *
 2"p3"----*+++-----*+-*++-*+++------* * || ||| |||| * * * || ||| * * * || * * *
 2"g3"----++++---*-++-+++-++++----* * * || ||| |||| * * * || ||| * * * || * * *
          vvvv   v vv vvv vvvv    * * v vv vvv vvvv * * v vv vvv * * v vv * * v
    "pg"  a###   a a# a## a###    * * a a# a## a### * * a a# a## * * a a# * * a
  "gg"l   v      v v  v   v       * * v v  v   v    * * v v  v   * * v v  * * v
    l ^   o      o#########       * * o#########    * * o#####   * * o##  * * o
    ^ *---*      * "not c4"       * * *"c3"         * * *"c2"    * * *"c1"* * *
    *------------* "but gg"       * * *             * * *        * * *    * * *
                                  * * *             * * *        * * *    * * *
                                  * * *             * * *        * * *    * * *
                                  * * * l           * * * l      * * * l  * * * l
                                  * * v ^           * * v ^      * * v ^  * * v ^
                                  * *>e**           * *>e**      * *>e**  * *>e**
                                  * *               * *          * *      * *
                                  a e               a e          a e      a e
                                  ^^^               ^^^          ^^^      ^^^
                                  * *               * *          * *      * *
                                  * *               * *          * *      * *
                                  s s               s s          s s      s s
`, 'cla_adder_speed');


registerCircuit('16-bit divider', `

                               "q1"
                                l                                                "r8  r4  r2  r1"
                                ^ l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l
                                O ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^
                                ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
                          "q2"l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                              ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                              O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                              ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s"a1"
                        "q4"l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                            ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                            O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                            ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s"a2"
                      "q8"l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                          ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                          O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                          ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s"a4"
                        l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                        ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                        O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                        ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s"a8"
                      l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                      ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                      O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                      ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s
                    l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                    ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                    O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                    ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s
                  l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                  ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                  O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                  ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s
                l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s
              l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
              ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
              O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
              ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s               l    lI4
            l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>                 ^    ^
            ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<                 |    |
            O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^                  o<*  |
            ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s                 ^ |  |
          l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>                  ]a a< |
          ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<                  |^ ^| |
          O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^         s---------*+-+*-+>l
          ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s                   | |  |
        l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>          l<---o<-a<>e%+--+-s
        ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<               ^  m/;^||  |
        O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^                a[>e  **|  |
        ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s               ^/;^----*  |
      l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>                 *  *       |
      ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<                 *--+-------*
      O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^                  s  s
      ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s
    l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
    ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
    O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
    ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s
  l *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
  ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
  O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
  ^ | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s
  *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
  *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
    ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
    | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | *s
    s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s
                                                   "b8  b4  b2  b1"

0"FIT:y"

`, 'div16');


registerCircuit('32-bit divider', `
                                                                                                                                                                                   1"remainder"
                                                                                                                                                                                 "r8  r4  r2  r1"
                                                            "q1"l l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l
                                                                m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                                                                *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                    l    lI4                              "q2"l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                    ^    ^                      2"quotient"   m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s"a1"
                    |    |                                    *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                    o<*  |                              "q4"l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                    ^ |  |                                  m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s"a2"
                   ]a a< |                                  *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                   |^ ^| |                            "q8"l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
         s---------*+-+*-+>l                              m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s"a4"
                    | |  |                                *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
         l<---o<-a<>e%+--+-s                            l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
              ^  m/;^||  |                              m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s"a8"
              a[>e  **|  |                              *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
              ^/;^----*  |                            l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
              *  *       |                            m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
              *--+-------*                            *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
              s  s                                  l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                                    m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                                                    *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                                                  l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                                  m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                                                  *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                                                l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                                m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                                                *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                                              l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                              m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                                              *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                                            l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                            m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                                            *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                                          l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                          m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                                          *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                                        l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                        m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                                        *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                                      l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                      m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                                      *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                                    l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                    m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                                    *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                                  l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                  m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                                  *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                                l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                                *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                              l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                              m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                              *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                            l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                            m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                            *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                          l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                          m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                          *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                        l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                        m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                        *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                      l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                      m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                      *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                    l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                    m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                    *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                  l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                  m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                  *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
                *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
              l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
              m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
              *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
            l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
            m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
            *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
          l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
          m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
          *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
        l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
        m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
        *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
      l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
      m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
      *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
    l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
    m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
    *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
  l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
  m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
  *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
  &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
    ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s
    | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
    s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s   s
                                                                                                                   "b8  b4  b2  b1"

`, 'div32');



registerCircuit('74181 ALU', `

0"74181 ALU. Info below."

"Cn  M  A'0                   B'0     A'1                   B'1     A'2                   B'2   A'3                   B'3"
### ### ###                   ###     ###                   ###     ###                   ###   ###                   ###
### ### ###                   ###     ###                   ###     ###                   ###   ###                   ###
#s# #s# #s#                   #s#     #s#                   #s#     #s#                   #s#   #s#                   #s#
 *   *   *I74181               *       *                     *       *                     *     *                     *
 *   *   *                     *       *                     *       *                     *     *                     *
 *   *   *   *******************       *   *******************       *   *******************     *   *******************
 *   *   *   *       *         *       *   *       *         *       *   *       *         *     *   *       *         *
 *   v   *   *       w         *       *   *       w         *       *   *       w         *     *   *       w         *
 *   O   *   *       o         *       *   *       o         *       *   *       o         *     *   *       o         *
 *   *   *   *       *         *       *   *       *         *       *   *       *         *     *   *       *         *    ###
 *   *   *   * ******+*********+*******+***+*******+*********+*******+***+*******+*********+*****+***+*******+*********+****s##"s0"
 *   *   *   * *     *         *       *   * *     *         *       *   * *     *         *     *   * *     *         *    ###
 *   *   *   * *     *         *       *   * *     *         *       *   * *     *         *     *   * *     *         *
 *   *   *   * *     *         *       *   * *     *         *       *   * *     *         *     *   * *     *         *    ###
 *   *   *   * * ****+*********+*******+***+*+*****+*********+*******+***+*+*****+*********+*****+***+*+*****+*********+****s##"s1"
 *   *   *   * * *   *         *       *   * * *   *         *       *   * * *   *         *     *   * * *   *         *    ###
 *   *   *   * * *   *         *       *   * * *   *         *       *   * * *   *         *     *   * * *   *         *
 *   *   *   * * *   *         *       *   * * *   *         *       *   * * *   *         *     *   * * *   *         *    ###
 *   *   *   * * *   *   ******+*******+***+*+*+***+*********+*******+***+*+*+***+*********+*****+***+*+*+***+*********+****s##"s2"
 *   *   *   * * *   *   *     *       *   * * *   *   *     *       *   * * *   *   *     *     *   * * *   *   *     *    ###
 *   *   *   * * *   *   *     *       *   * * *   *   *     *       *   * * *   *   *     *     *   * * *   *   *     *
 *   *   *   * * *   *   *     *       *   * * *   *   *     *       *   * * *   *   *     *     *   * * *   *   *     *    ###
 *   *   *   * * *   *   *     * ******+***+*+*+***+***+*****+*******+***+*+*+***+***+*****+*****+***+*+*+***+***+*****+****s##"s3"
 *   *   *   * * *   *   *     * *     *   * * *   *   *     * *     *   * * *   *   *     * *   *   * * *   *   *     * *  ###
 *   *   *   * * *   *   *     * *     *   * * *   *   *     * *     *   * * *   *   *     * *   *   * * *   *   *     * *
 *   *   *   * * *   *   *     * *     *   * * *   *   *     * *     *   * * *   *   *     * *   *   * * *   *   *     * *
 *   *   ****+*+*+***+***+**** * *     ****+*+*+***+***+**** * *     ****+*+*+***+***+**** * *   ****+*+*+***+***+**** * *
 *   *   *   * * *   *   * * * * *     *   * * *   *   * * * * *     *   * * *   *   * * * * *   *   * * *   *   * * * * *
 *   *   *   * * * ***** * * * * *     *   * * * ***** * * * * *     *   * * * ***** * * * * *   *   * * * ***** * * * * *
 *   *   v   v v v v   v v v v v v     v   v v v v   v v v v v v     v   v v v v   v v v v v v   v   v v v v   v v v v v v
 *   *   #a# #a# #a#   ##a## ##a##     #a# #a# #a#   ##a## ##a##     #a# #a# #a#   ##a## ##a##   #a# #a# #a#   ##a## ##a##
 *   *     *   *   *     *     *         *   *   *     *     *         *   *   *     *     *       *   *   *     *     *
 *   *     *** * ***     *** ***         *** * ***     *** ***         *** * ***     *** ***       *** * ***     *** ***
 *   *       * * *         * *             * * *         * *             * * *         * *           * * *         * *
 *   *       v v v         v v             v v v         v v             v v v         v v           v v v         v v
 *   *       ##O##         #O#             ##O##         #O#             ##O##         #O#           ##O##         #O#
 *   *         *           *                 *           *                 *           *               *           *
 *   *         *           *                 *         ***                 *           *               *           *
 *   *         *           *                 *         *                   *       ****+***************************+********
 *   *         *           *                 *         *                   *       *   *                           *       *
 *   *         *           *                 *         *                   *       * **+********************************** *
 *   *         *           *                 *         *                   *       * * *     *         *       *     *   * *
 *   *         *           *                 *     ****+***************************+*+*+*****+*********+*******+*****+** * *
 *   *         *           *                 *     *   * *                         * * *     *         *       *     * * * *
 *   *         *           *                 *     * **+*+*************************+*+*******+*********+*******+**** * * * *
 *   *         *           *                 *     * * * *     *       *         * * *     * *       * *     * *   * * * * *
 *   *         *           * **********************+*+*+*+*****+*******+*********+*+*+*****+*+*******+*+*****+*+** * * * * *
 *   *         *           * *     *               * * * *   * *       *         * * *     * *       * *     * * * * * * * *
 *   *         *           * * ****+***************+*+***+***+*+*******+*********+*+*+*****+*+*******+*+**** * * * * * * * *
 *   *         *           * * *   *     *       * * *   *   * *     * *       * * * *   * * *     * * *   * * * * * * * * *
 *   *   ******************+*+*+***+*****+*******+*+*+***+***+*+*****+*+*******+*+*+*+***+*+*+*****+*+*+** * * * * * * * * *
 *   *   *       *         * * *   *   * *       * * *   *   * *   * * *       * * * *   * * *     * * * * * * * * * * * * *
 *   *   * ******+***********+*+***+***+*+*******+*+*+***+***+*+***+*+*+*******+*+*+*+***+*+*+**** * * * * * * * * * * * * *
 *   *   * *     *     *     * *   *   * *     * * * *   *   * *   * * *     * * * * * * * * *   * * * * * * * * * * * * * *
 ****+***+*+*****+*****+*****+*+***+***+*+*****+*+*+*+***+***+*+***+*+*+*****+*+*+*+*+*+*+*+*+** * * * * * * * * * * * * * *
 *   *   * *     *   * *     * *   *   * *   * * * * *   *   * *   * * *   * * * * * * * * * * * * * * * * * * * * * * * * *
 * ******+*+*****+***+*+*****+*+***+***+*+***+*+*+*+*+***+***+*+***+*+*+** * * * * * * * * * * * * * * * * * * * * * * * * *
 * *     * *   * * * * *     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 v v     v *   v v v v v     v * v v v v v v v v v v * v v v v v v v v v v v v v v v * v v v v v v v v v v v v v v v v v v v
 #A#     O *   #a# ##a##     O * #a# ##a## ###a### O * #a# ##a## ###a### ####a#### O * ###A### ####A#### ###a### ##a## #a# a
   *     * *   *     *       * *   *     *    *    * *   *   *         *     *     * *       *     *        *    *     *   *
   *     * *   *** ***       * *   ***** * ****    * *   *   ***** *****     *     * *       *     *        *    * *****   *
   *     * *     * *         * *       * * *       * *   *       * *         *     * *       *     *        *    * *       *
   *     * *     * *         * *       * * *       * *   ******* * * *********     * *       *     *        **** * * *******
   *     v v     v v         v v       v v v       v v         v v v v             v v       *     *           v v v v
   *     #a#     #O#         #a#       ##O##       #a#         ###O###             #a#       *     *           ###O###
   *     *         *         *             *       *                 *             *         *     *           *
   * *****         * *********             * *******                 * *************         *     *           *
   * *             * *                     * *                       * *                     *     * ***********
   v v             v v                     v v                       v v                     *     w w         *
   #e#             #e#                     #e#                       #e#                     *     #o#         *
   *               *                       *                         *                       *       *         *
   *               *********** *************                         *                       *       *         *
   *               *         * *           *                         *                       *       *         *
   ****************+******** * * **********+**************************                       *       *         *
   *               *       * * * *         *                         *                       *       *         *
   *               *       v v v v         *                         *                       *       *         *
   *               *       ###a###         *                         *                       *       *         *
   *               *          *            *                         *                       *       *         *
   v               v          v            v                         v                       v       v         v
  #l#             #l#        #l#          #l#                       #l#                     #l#     #l#       #l#
  ###             ###        ###          ###                       ###                     ###     ###       ###
  ###             ###        ###          ###                       ###                     ###     ###       ###
 "F'0             F'1        A=B          F'2                       F'3                      G'    Cn+4        P'"

0"FIT:y"

0"The once popular 74181 4-bit ALU. Check out its spec sheet for more"
0"information."

0"It supports 32 operations (of which many overlapping/similar/trivial ones)"

0"The m bit selects between two groups of 16 operations (mode): when m is low,"
0"the 16 different logic operations (0, AND, IMPLY, ...). When m is high,"
0"addition/subtraction operations, with various combinations of"
0"adding/subtracting A and B, subtracting 1 of the result (to add 1 use carry"
0"instead), and several that have A OR B, A AND B or bit-inverted versions as"
0"operands"

0"Bits s0-s3 select one of the 16 operations for the current m"

0"Bits a0-a3 are the first input, bits b0-b3 the second input."

0"Bits f0-f3 are the output"

0"The input c is carry in, the output c is carry out"

0"= is true when all output bits are true (when result of subtraction in"
0"active-low usage is zero)"

0"p = carry propagate, g = carry generate, used to combine multiple chips"
0"(including a separate carry lookahead chip) to make 8-bit and higher ALU."
0"These are standard signals of carry lookahead adders, for more info on those"
0"see the included carry lookahead adder circuit from the dropdown."

0"You can interpret the inputs/outputs as either active low or active high and"
0"both cases work equally well (but the intended use is active-low, because ="
0"only works correct there) Both those views have a different table of"
0"operations, same ones but in different order. They support all the same ones"
0"due to Morgan's law and similar symmetries (e.g. AND and OR wap for both"
0"tables)"

0"Some signals are active high in active low mode and vice versa. Here is the"
0"full list: When using in active-low mode: carry, m, s and = are active-HIGH."
0"a, b, f, g, p are active-low When using in active-high mode: carry is"
0"active-LOW. All the rest is active-high."

0"The ' in the main circuit shows which are active-low. The ' is not repeated"
0"in the small instances below."

0"NOTE! The IC definition here is not the true pin-order of the physical chip!"
0"But it is how the official logic diagram is specified. The true pinout has"
0"2x12 pins, has the inputs/outputs in a more mixed order, and has the voltage"
0"and ground pins."


0"Instance with all inputs at zero"

     "c m a0b0a1b1a2b2a3b3"
      s s s s s s s s s s
      v v v v v v v v v v
      iiiiiiiiiiiiiiiiiii<s"s0"
      iiiiiiiiiiiiiiiiiii<s"s1"
      iiiiiiiiiiiiiiiiiii<s"s2"
      iiiiiiiiiiiiii74181<s"s3"
      v v v v v     v v v
      l l l l l     l l l
     "f0f1= f2f3    g c p"

0"Instance set up for doing addition in active-high"

     "c m a0b0a1b1a2b2a3b3"
      S s s s s s s s s s
      v v v v v v v v v v
      iiiiiiiiiiiiiiiiiii<S"s0"
      iiiiiiiiiiiiiiiiiii<s"s1"
      iiiiiiiiiiiiiiiiiii<s"s2"
      iiiiiiiiiiiiii74181<S"s3"
      v v v v v     v v v
      l l l l l     l l l
     "f0f1= f2f3    g c p"

0"Instance set up for doing addition in active-low"

     "c m a0b0a1b1a2b2a3b3"
      s s S S S S S S S S
      v v v v v v v v v v
      iiiiiiiiiiiiiiiiiii<S"s0"
      iiiiiiiiiiiiiiiiiii<s"s1"
      iiiiiiiiiiiiiiiiiii<s"s2"
      iiiiiiiiiiiiii74181<S"s3"
      v v v v v     v v v
      l l l l l     l l l
     "f0f1= f2f3    g c p"

0"Instance set up for doing XNOR in active high, XOR in active low"

     "c m a0b0a1b1a2b2a3b3"
      s S s s s s s s s s
      v v v v v v v v v v
      iiiiiiiiiiiiiiiiiii<S"s0"
      iiiiiiiiiiiiiiiiiii<s"s1"
      iiiiiiiiiiiiiiiiiii<s"s2"
      iiiiiiiiiiiiii74181<S"s3"
      v v v v v     v v v
      l l l l l     l l l
     "f0f1= f2f3    g c p"




0"Inverting all active-low inputs to make it fully active-high using the"
0"active-low table of operations"

     "c m a0b0a1b1a2b2a3b3"
      s s s s s s s s s s
      v v v v v v v v v v
      o o O O O O O O O OI2
      v v v v v v v v v v
      iiiiiiiiiiiiiiiiiii<s"s0"
      iiiiiiiiiiiiiiiiiii<s"s1"
      iiiiiiiiiiiiiiiiiii<s"s2"
      iiiiiiiiiiiiii74181<s"s3"
      v v v v v     v v v
      O O o O O     O o O
      v v v v v     v v v
      l l l l l     l l l
     "f0f1= f2f3    g c p"



     "c m a0b0a1b1a2b2a3b3"
      s s s s s s s s s s
      v v v v v v v v v v
      iiiiiiiiiiiiiiiiiii<s"s0"
      iiiiiiiiiiiiiiiiiii<s"s1"
      iiiiiiiiiiiiiiiiiii<s"s2"
      iiiiiiiiiiiiiiiiii2<s"s3"
      v v v v v     v v v
      l l l l l     l l l
     "f0f1= f2f3    g c p"


`, '74181');

registerCircuit('compact 0-65535 display', `

         #################################
         #|| v ||| v ||| v ||| v ||| v | #
         #|V#l#V|V#l#V|V#l#V|V#l#V|V#l#V #
         #|#   #|#   #|#   #|#   #|#   # #
         #|l   l|l   l|l   l|l   l|l   l #
         #|#   #|#   #|#   #|#   #|#   # #
         $&V#l# &V#l# &V#l# &V#l# &V#l#  #
         # #   # #   # #   # #   # #   # #
         # l   l l   l l   l l   l l   l #
         # #   # #   # #   # #   # #   # #
         # V#l#V V#l#V V#l#V V#l#V V#l#V #
         # | ^ | | ^ | | ^ | | ^ | | ^ | #
         ###########################i89###
                          ^^^^^^^^^^^^^^^^
                          ssssssssssssssss
                         "............8421"




@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

 lllllll      lllllll lllllll lllllll lllllll lllllll           l   l   l   lI5
 ^^^^^^^      ^^^^^^^ ^^^^^^^ ^^^^^^^ ^^^^^^^ ^^^^^^^           ^   ^   ^   ^
 |||||||      ||||||| ||||||| ||||||| ||||||| |||||||           e<a e   *** *
 bBBBBBBI6    i6##### i6##### i6##### i6##### i6#####I87        ^ ^^^     * *
 bbbbBBb      ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^           * * **o<a e *
 BbBBbBB      i85####################################           * *   ^ ^^^ *
 BbbBBBB              ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^           * *** a e a e
 BBbbBBb              s s s s s s s s s s s s s s s s           *   * ^^^ ^^^
 BBbBBbB                                                        *   * * * * *
 BBBBBbB                                                        *   * * * * *
 bbbbBBB        l l l l l l l l l l l l l l l l l l l l         * **+**-+-* *
 BBBBBBB        ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^         * * *   *   *
 BBbBBBB      | | | | | | | | | | | | | | | | | | | | |         * o<+*a<+*o<*
 BBBbBBB      i5##### i5##### i5##### i5##### i5##### |         * ^ * ^ * ^ *
 BBBBBbb      ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ |         *** *** *** *
 bBBBbbB      p | | | | | | | | | | | | | | | | | | | |         s   s   s   s
 BbBBBBb        | | i5##### i5##### i5##### i5##### | |
 BBBBbbB        | | ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ |I|
 BBBbbbB        | | | | | | | | | | | | | | | | | | |8|
    ^^^^        | i5##### i5##### i5##### i5##### | |5|
    ||||        | ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ | | |
    ||||        | | | | | | | | | | | | | | | | | | | |
    ssss        i5##### i5##### i5##### i5##### | | | |
                ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ | | | |
                p | | | | | | | | | | | | | | | | | | |
                  | | i5##### i5##### i5##### | | | | |
                  | | ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ | | | | |
                  | | | | | | | | | | | | | | | | | | |
                  | i5##### i5##### i5##### | | | | | |
                  | ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ | | | | | |
                  | | | | | | | | | | | | | | | | | | |
                  i5##### i5##### i5##### | | | | | | |
                  ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ | | | | | | |
                  p | | | | | | | | | | | | | | | | | |
                    | | i5##### i5##### | | | | | | | |
                    | | ^ ^ ^ ^ ^ ^ ^ ^ | | | | | | | |
                    | | | | | | | | | | | | | | | | | |
                    | i5##### i5##### | | | | | | | | |
                    | ^ ^ ^ ^ ^ ^ ^ ^ | | | | | | | | |
                    | | | | | | | | | | | | | | | | | |
                    i5##### i5##### | | | | | | | | | |
                    ^ ^ ^ ^ ^ ^ ^ ^ | | | | | | | | | |
                    p | | | | | | | | | | | | | | | | |
                      | | i5##### | | | | | | | | | | |
                      | | ^ ^ ^ ^ | | | | | | | | | | |
                      | | | | | | | | | | | | | | | | |
                      | i5##### | | | | | | | | | | | |
                      | ^ ^ ^ ^ | | | | | | | | | | | |
                      | | | | | | | | | | | | | | | | |
                      i5##### | | | | | | | | | | | | |
                      ^ ^ ^ ^ | | | | | | | | | | | | |
                      p | | | | | | | | | | | | | | | |
                        s s s s s s s s s s s s s s s s


  v* v* l l l v* *v  v* v* l l l v* *v  v* v* l l l v* *v  v* v* l l l v* *v  v* v* l l l v* *v
  l| l| ^ ^ ^ l x l  l| l| ^ ^ ^ l x l  l| l| ^ ^ ^ l x l  l| l| ^ ^ ^ l x l  l| l| ^ ^ ^ l x l
   |  | | | |  * *    |  | | | |  * *    |  | | | |  * *    |  | | | |  * *    |  | | | |  * *
i87#############################################################################################I89
                                                                                ^^^^^^^^^^^^^^^^
                                                                                ssssssssssssssss

0"FIT:y"

`, 'compact_65535_display');



registerCircuit('16-bit adder with decimal IO', `

0"Binary 16-bit adder with decimal input and decimal output."

0"Decimal conversions done with the built-in terminal component. For true"
0"decimal conversion circuits from gates, see bcd/binary encoder/decoder"
0"circuits or the 'compact display' circuits"

0"The output is 17-bit: the carry is used as extra output bit."

0"Click with mouse in input field to move keyboard cursor there."

TTTTTTTTTTTTTTTTT
^^^^^^^^^^^^^^^^^
*iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii16<c
 ^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^
 TTTTTTTTTTTTTTTT TTTTTTTTTTTTTTTT


0"(IC definitions below)"

        l
        ^
  l<o<a e *sI1
    ^ ^^^/
    a e *
    ^^^
    s s

   l  l  l  l  l  l  l  l  l  l  l  l  l  l  l  l
   ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^
l<i1<i1<i1<i1<i1<i1<i1<i1<i1<i1<i1<i1<i1<i1<i1<i1<sI16
  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^
  31 31 21 21 21 21 20 20 20 20 20 20 10 10 10 10
  15 04 93 82 71 60 59 48 37 26 15 04 93 82 71 60
  ===============================================
  3322222222221111 1111110000000000
  1098765432109876 5432109876543210
  ssssssssssssssss ssssssssssssssss

`, 'decimal_adder');



registerCircuit('4 math functions with decimal', `
           iiiiiiiiiiiiiiiiiiiii       iiiiiiiiiiiiiiiiiiiii      iiiiiiiiiiiiiiiiiiiii      iiiiiiiiiiiiiiiiiiiii
           i|| v ||| v ||| v | i       i|| v ||| v ||| v | i      i|| v ||| v ||| v | i      i|| v ||| v ||| v | i
           i|v$l$v|v$l$v|v$l$v i       i|v$l$v|v$l$v|v$l$v i      i|v$l$v|v$l$v|v$l$v i      i|v$l$v|v$l$v|v$l$v i
           i|l   l|l   l|l   l i       i|l   l|l   l|l   l i      i|l   l|l   l|l   l i      i|l   l|l   l|l   l i
           i|$   $|$   $|$   $ i       i|$   $|$   $|$   $ i      i|$   $|$   $|$   $ i      i|$   $|$   $|$   $ i
           i|$   $|$   $|$   $ i       i|$   $|$   $|$   $ i      i|$   $|$   $|$   $ i      i|$   $|$   $|$   $ i
           $&>l$$ &>l$$ &>l$$  i       $&>l$$ &>l$$ &>l$$  i      $&>l$$ &>l$$ &>l$$  i      $&>l$$ &>l$$ &>l$$  i
           i $   $ $   $ $   $ i       i $   $ $   $ $   $ i      i $   $ $   $ $   $ i      i $   $ $   $ $   $ i
           i $   $ $   $ $   $ i       i $   $ $   $ $   $ i      i $   $ $   $ $   $ i      i $   $ $   $ $   $ i
           i l   l l   l l   l i       i l   l l   l l   l i      i l   l l   l l   l i      i l   l l   l l   l i
           i ^$l$^ ^$l$^ ^$l$^ i       i ^$l$^ ^$l$^ ^$l$^ i      i ^$l$^ ^$l$^ ^$l$^ i      i ^$l$^ ^$l$^ ^$l$^ i
           i | ^ | | ^ | | ^ | i       i | ^ | | ^ | | ^ | i      i | ^ | | ^ | | ^ | i      i | ^ | | ^ | | ^ | i
           iiiiiiiiiiiiiiiii89ii       iiiiiiiiiiiiiiiii89ii      iiiiiiiiiiiiiiiii89ii      iiiiiiiiiiiiiiiii89ii
              ^^^^^^^^                    ^^^^^^^^                   ^^^^^^^^                   ^^^^^^^^
              ||||||||                    ||||||||                   ||||||||                   ||||||||
           l<-i81#####<-s              l<-i82#####<-s              l<i83#####<-------*        l<i84#####<-------*
              ########                    ########                 l<########<------*|        l<########<------*|
              ########<-------*           ########<-------*        l<# ### ##<-----*||        l<### ####<-----*||
              ### ####<------*|           ########<------*|        l<## # ###<----*|||        l<########<----*|||
              ### ####<-----*||           ########<-----*||        l<### ####<---*||||        l<#     ##<---*||||
              #     ##<----*|||           #     ##<----*|||        l<## # ###<--*|||||        l<########<--*|||||
              ### ####<---*||||           ########<---*||||        l<# ### ##<-*||||||        l<### ####<-*||||||
              ### ####<--*|||||           ########<--*|||||          ########<*|||||||        l<########<*|||||||
              ########<-*||||||           ########<-*||||||          ^^^^^^^^ ||||||||          ^^^^^^^^ ||||||||
              ########<*|||||||           ########<*|||||||          |||||||| ||||||||          |||||||| ||||||||
              ^^^^^^^^ ||||||||           ^^^^^^^^ ||||||||          |||||||| ||||||||          |||||||| ||||||||
              |||||||| ||||||||           |||||||| ||||||||          |||||||| ||||||||          |||||||| ||||||||
  *-----------*+++++++-++++++++-----------*+++++++-++++++++----------*+++++++-++++++++----------++++++++-*+++++++
  |*-----------*++++++-++++++++------------*++++++-++++++++-----------*++++++-++++++++----------++++++++--*++++++
  ||*-----------*+++++-++++++++-------------*+++++-++++++++------------*+++++-++++++++----------++++++++---*+++++
  |||*-----------*++++-++++++++--------------*++++-++++++++-------------*++++-++++++++----------++++++++----*++++
  ||||*-----------*+++-++++++++---------------*+++-++++++++--------------*+++-++++++++----------++++++++-----*+++
  |||||*-----------*++-++++++++----------------*++-++++++++---------------*++-++++++++----------++++++++------*++
  ||||||*-----------*+-++++++++-----------------*+-++++++++----------------*+-++++++++----------++++++++-------*+
  |||||||*-----------*-++++++++------------------*-++++++++-----------------*-++++++++----------++++++++--------*
  ||||||||             ||||||||                    ||||||||                   ||||||||          ||||||||
  |||||||| *-----------*+++++++--------------------*+++++++-------------------*+++++++----------*+++++++--------------
  |||||||| |*-----------*++++++---------------------*++++++--------------------*++++++-----------*++++++--------------
  |||||||| ||*-----------*+++++----------------------*+++++---------------------*+++++------------*+++++--------------
  |||||||| |||*-----------*++++-----------------------*++++----------------------*++++-------------*++++--------------
  |||||||| ||||*-----------*+++------------------------*+++-----------------------*+++--------------*+++--------------
  |||||||| |||||*-----------*++-------------------------*++------------------------*++---------------*++--------------
  |||||||| ||||||*-----------*+--------------------------*+-------------------------*+----------------*+--------------
  |||||||| |||||||*-----------*---------------------------*--------------------------*-----------------*--------------
  |||||||| ||||||||
  |||||||| ||||||||
  |||||||| ||||||||
  |||||||| ||||||||
  ssssssss ssssssss
 " ...8421  ...8421"

       "inputs"

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



          lI1             lI2            l      lI3                          l    lI4
          ^               ^              ^      ^                            ^    ^
          |               |              |      |                            |    |
          |               |           l<-+o<-a<>e%----s                      o<*  |
      v-aUe           v-aNe              |^  ^/;^|                           ^ |  |
  l<--o ^+^--s    l<--o ^+m--s           |a<>e  **                          ]a a< |
      ^aUe            ^aNE               |^/;^                              |^ ^| |
       ^+^&            ^+^&              |*  a<                   s---------*+-+*-+>l
        | |             | |              ||  ^|                              | |  |
        | |             | |           l<-++--+*-------s           l<---o<-a<>e%+--+-s
        s s             s s              ||  |                         ^  m/;^||  |
                                         *+--*                         a[>e  **|  |
                                          |  |                         ^/;^----*  |
                                          s  s                         *  *       |
                                                                       *--+-------*
                                                                       s  s

                                                                      l<
                                                                  l<   |                                                                           l<
                                                              l<   |   |                                                                       l<   |
                                                          l<   |   |   |                                                                   l<   |   |
                                                      l<   |   |   |   |                                                               l<   |   |   |
     l   l   l   l   l   l   l   l                l<   |   |   |   |   |   l             llllllll                    "q1"          l<   |   |   |   |
     ^   ^   ^   ^   ^   ^   ^   ^            l<   |   |   |   |   |   |   ^             ^^^^^^^^                     l        l<   |   |   |   |   |
     |   |   |   |   |   |   |   |           | | | | | | | | | | | | | | | |             ||||||||                     ^    l<   |   |   |   |   |   |
 l<-i1<-i1<-i1<-i1<-i1<-i1<-i1<-i1<-sI81   <-###<###<###<###<###<###<###<###<          l<i830####<--0y7-sI83          Ol<   |   |   |   |   |   |   |
    ^^  ^^  ^^  ^^  ^^  ^^  ^^  ^^         <-i3#<i3#<i3#<i3#<i3#<i3#<i3#<i3#<s         l<########<--1y6-s             ^ | | | | | | | | | | | | | | | |
    ||  ||  ||  ||  ||  ||  ||  |*s          ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ l         l<########<--2y5-s           l *>###>###>###>###>###>###>###>###>
    s|  s|  s|  s|  s|  s|  s&s s              | | | | | | | | | | | | | | | ^         l<########<--3y4-s           ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
     |   |   |   |   |   *s                  <-###<###<###<###<###<###<###<###<        l<########<--4y3-s           O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
     |   |   |   |   *s                      <-i3#<i3#<i3#<i3#<i3#<i3#<i3#<i3#<s       l<########<--5y2-s           ^ | | | | | | | | | | | | | | | | *sI84
     |   |   |   *s                            ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ l       l<########<--6y1-s         l *>###>###>###>###>###>###>###>###>
     |   |   *s                                  | | | | | | | | | | | | | | | ^         ########<--7y0-s         ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
     |   *s                                    <-###<###<###<###<###<###<###<###<        ^^^^^^^^                 O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
     *s                                        <-i3#<i3#<i3#<i3#<i3#<i3#<i3#<i3#<s       ||||||||                 ^ | | | | | | | | | | | | | | | | *s
                                                 ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ l       ssssssss               l *>###>###>###>###>###>###>###>###>
      l   l   l   l   l   l   l   l                | | | | | | | | | | | | | | | ^                              ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
      ^   ^   ^   ^   ^   ^   ^   ^              <-###<###<###<###<###<###<###<###<                             O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
      |   |   |   |   |   |   |   |              <-i3#<i3#<i3#<i3#<i3#<i3#<i3#<i3#<s                            ^ | | | | | | | | | | | | | | | | *s
  l<-i2<-i2<-i2<-i2<-i2<-i2<-i2<-i2<-sI82          ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ l                          l *>###>###>###>###>###>###>###>###>
     ^^  ^^  ^^  ^^  ^^  ^^  ^^  ^^                  | | | | | | | | | | | | | | | ^                          ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
     ||  ||  ||  ||  ||  ||  ||  |*s               <-###<###<###<###<###<###<###<###<                         O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
     s|  s|  s|  s|  s|  s|  s&s s                 <-i3#<i3#<i3#<i3#<i3#<i3#<i3#<i3#<s                        ^ | | | | | | | | | | | | | | | | *s
      |   |   |   |   |   *s                         ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ l                      l *>###>###>###>###>###>###>###>###>
      |   |   |   |   *s                               | | | | | | | | | | | | | | | ^                      ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
      |   |   |   *s                                 <-###<###<###<###<###<###<###<###<                     O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
      |   |   *s                                     <-i3#<i3#<i3#<i3#<i3#<i3#<i3#<i3#<s                    ^ | | | | | | | | | | | | | | | | *s
      |   *s                                           ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ l                  l *>###>###>###>###>###>###>###>###>
      *s                                                 | | | | | | | | | | | | | | | ^                  ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                                       <-###<###<###<###<###<###<###<###<                 O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                                                       <-i3#<i3#<i3#<i3#<i3#<i3#<i3#<i3#<s                ^ | | | | | | | | | | | | | | | | *s
                                                         ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ l              l *>###>###>###>###>###>###>###>###>
                                                           | | | | | | | | | | | | | | | ^              ^ *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                                         <-###<###<###<###<###<###<###<###<             O   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                                                         <-i3#<i3#<i3#<i3#<i3#<i3#<i3#<i3#<sI830        ^ | | | | | | | | | | | | | | | | *s
                                                           ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^              *>###>###>###>###>###>###>###>###>
                                                           | | | | | | | | | | | | | | | |              *-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                                                             s   s   s   s   s   s   s   s                ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                                                                                                          | | | | | | | | | | | | | | | *s
                                                                                                          s   s   s   s   s   s   s   s

     llllllll           llllllll                llllllll               llllllll
     ^^^^^^^^           ^^^^^^^^                ^^^^^^^^               ^^^^^^^^
     ||||||||           ||||||||                ||||||||               ||||||||
  l<-i81#####<-s     l<-i82#####<-s           l<i83#####<-s          l<i84#####<-s
     ########           ########              l<########<-s          l<########<-s
     ########<-s        ########<-s           l<########<-s          l<########<-s
     ########<-s        ########<-s           l<########<-s          l<########<-s
     ########<-s        ########<-s           l<########<-s          l<########<-s
     ########<-s        ########<-s           l<########<-s          l<########<-s
     ########<-s        ########<-s           l<########<-s          l<########<-s
     ########<-s        ########<-s             ########<-s          l<########<-s
     ########<-s        ########<-s             ^^^^^^^^               ^^^^^^^^
     ########<-s        ########<-s             ||||||||               ||||||||
     ^^^^^^^^           ^^^^^^^^                ssssssss               ssssssss
     ||||||||           ||||||||
     ssssssss           ssssssss

 lllllll      lllllll lllllll lllllll        l   l   l   lI5
 ^^^^^^^      ^^^^^^^ ^^^^^^^ ^^^^^^^        ^   ^   ^   ^
 |||||||      ||||||| ||||||| |||||||        e<a e   *** *
 bBBBBBBI6    i6##### i6##### i6#####I87     ^ ^^^     * *
 bbbbBBb      ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^        * * **o<a e *
 BbBBbBB      p p i85################        * *   ^ ^^^ *
 BbbBBBB              ^ ^ ^ ^ ^ ^ ^ ^        * *** a e a e
 BBbbBBb              s s s s s s s s        *   * ^^^ ^^^
 BBbBBbB                                     *   * * * * *
 BBBBBbB                                     *   * * * * *
 bbbbBBB          l l l l l l l l l l        * **+**-+-* *
 BBBBBBB          ^ ^ ^ ^ ^ ^ ^ ^ ^ ^        * * *   *   *
 BBbBBBB          | | | | | | | | | |        * o<+*a<+*o<*
 BBBbBBB          | i5##### i5##### |        * ^ * ^ * ^ *
 BBBBBbb          | ^ ^ ^ ^ ^ ^ ^ ^ |        *** *** *** *
 bBBBbbB          | | | | | | | | | |        s   s   s   s
 BbBBBBb          i5##### i5##### |I|
 BBBBbbB          ^ ^ ^ ^ ^ ^ ^ ^ |8|     v* v* l l l v* *v  v* v* l l l v* *v  v* v* l l l v* *v
 BBBbbbB          | | | | | | | | |5|     l| l| ^ ^ ^ l x l  l| l| ^ ^ ^ l x l  l| l| ^ ^ ^ l x l
    ^^^^          p | | i5##### | | |      |  | | | |  * *    |  | | | |  * *    |  | | | |  * *
    ||||            | | ^ ^ ^ ^ | | |   i87#######################################################I89
    ||||            | | | | | | | | |                                                     ^^^^^^^^
    ssss            | i5##### | | | |                                                     ssssssss
                    | ^ ^ ^ ^ | | | |
                    | | | | | | | | |
                    i5##### | | | | |
                    ^ ^ ^ ^ | | | | |
                    p | | | | | | | |
                      s s s s s s s s
`, 'calculator');


registerCircuit('4-bit CPU', `

0"A 4-bit CPU in action. Full explanation with instruction set is further down."

  1                                llll"ALU out"
  3 0                              ^^^^
  g g                    ==========3210
  * *                    =         ||||
  * *   3210============ =         MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM<g17
  * *   ||||           = =         MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM<g18
  * *   ||||"registers"= =         ^^^^                  ^^^^  ^^^^         ^^^^
  * *   ||||"memory"   = =         ||||     0g>c"carry"  ||||  ||||         ||||
  * ***>iiiiilllli     = =         |||| 1  13g>yg19      ||||  ||||         ||||
  *-+-->i"r0"^^^^i<b<0 = =         |||| 0   1g>Q         ||||  ||||         ||||
  * * *>iiiiiiii32 # = = =         |||| g      d g10  8g>a|||  ||||         ||||
  * * * ^^^^       # = = =         |||| w      ^ v       ^|||  ||||         ||||
  * **+>iiiiilllli # = = =   ******++++>a----->o<a<***** g|||  ||||         ||||
  *-+-+>i"r1"^^^^i<b<1 = =   *     ||||                * 1|||  ||||  98     ||||
  * * *>iiiiiiii32 # = = =   *iiiiiii21<***e<a<g19     * 9|||  ||||  gg     ||||
  * * * ^^^^       # = = =    ^^^^ ^^^^    ^ ^         *  |||  ||||  vv     ||||
  * **+>iiiiilllli # = = =    |||| ii22<g9** g8        ***|||  iiiiii23     ||||
  *-+-+>i"r2"^^^^i<b<2 = =    |||| ^^^^                  ||||  ^^^^^^^^     ||||
  * * *>iiiiiiii32 # = = = ===3210=7654==================0321==32107654=====7654==3210==
  * * * ^^^^       # = = = =    "adder"             "shift"     "logic"           vvvv
  * **+>iiiiilllli # = = = =                                                      O###
  *-+-+>i"r3"^^^^i<b<3 = = =     "ALU inputs"                                     v
  * * *>iiiiiiii32 # = = = =======3210====7654                                    lg20 "zero"
  * * * ^^^^       # = = = =      ||||    ||||
  * **+>iiiiilllli # = = = =   "A"llll    llll"B"
  *-+-+>i"r4"^^^^i<b = = = =      ^^^^    ^^^^
  * * *>iiiiiiii32 # = = = =   0g>ii31 0g>ii31
  * * * ^^^^       # = = = =   4g>iiii 5g>iiii
  * **+>iiiiilllli # = = = =   1g>iiii 1g>iiii
  *-+-+>i"r5"^^^^i<b = = = =      ^^^^    ^^^^
  * * *>iiiiiiii32 # = = = =      3210====3210
  * * * ^^^^       # = = = =              ||||
  * **+>iiiiilllli # = = = =         MMMMMMMMM<a<g14
  *-+-+>i"r6"^^^^i<b = = = =         ^^^^ ^^^^
  * * *>iiiiiiii32 # = ==+=+=========3210 3210======
  * * * ^^^^       # =   = =          "B imm"      =
  * **+>iiiiilllli # =   = =                       =
  *---+>i"r7"^^^^i<b ====+=+=========3210          =
      *>iiiiiiii32 #     = =         ||||"A ind"   =
      * ^^^^       #     = =         MMMMMMMMM[g15 =
      g ||||       #     = =         ^^^^ ^^^^     =
      1 ||||"user" #     = ==========3210 3210===============3210
        MMMMMMMMMM<b     =                                   ||||
    "r8"^^^^ ^^^^  #     =                                   ||||"ABC"
        |||| SSSS  #     =          "jump"                   MMMMMMMMMMMMMM<g5
        ||||       #     =         ==3210                    MMMMMMMMMMMMMM<g6
        MMMMMMMMMM<b     =         = ||||                    ^^^^ ^^^^ ^^^^
    "r9"^^^^ ^^^^  #     =         = MMMMMMMMM[g16           |||| |||| c|||
        |||| sSSS  #     =         = ^^^^ ^^^^               |||| ||||  |||
        ||||       #     ==========+=3210 ||||          11   |||| |||| 1|||
        MMMMMMMMMM<b     =         =      ||||          1098 |||| |||| 2|||
    "ra"^^^^ ^^^^  #     =         =     2||||          gggg |||| |||| g|||
        |||| ssSS  #     =         =     1||||"inc"     |||| |||| |||| ||||
        ||||       #     =         =     g||||"IP"      llll llll llll llll
    "rb"MMMMMMMMMM<b     =         =     *ii20<C        ^^^^ ^^^^ ^^^^ ^^^^
        ^^^^ ^^^^  #     =         =      ^^^^          |||| |||| |||| ||||"instruction ROM"0
        |||| sssS  #     =         =      ||||          |||| |||| |||| ||||"put program here"0
        ||||       #     =         =    *-*+++--------->bbbb#Bbbb#bbbb#bbbb"0 0000"
    "rc"MMMMMMMMMM<b     =         =    |*-*++--------->bbbb#BbbB#bbbb#bbbB"1 0001"
        ^^^^ ^^^^  #     =         ="IP"||*-*+--------->bbbb#BbBb#bbbb#bbBb"2 0010"
        |||| ssss  #     =         =    |||*-*--------->bbbb#BbBB#bbbb#bbBB"3 0011"
        ||||       #     =         = 0g>ii31            BBbB#bBbb#bBBb#bbbb"4 0100"
    "rd"MMMMMMMMMM<b     =         = 7g>iiii            bbbb#BBBB#bbBB#bBbb"5 0101"
        ^^^^ ^^^^  #     =         = 2g>iiii            bBBb#bBbb#bbbb#bBbB"6 0110"
        |||| ssss  #     =         =    ^^^^            bbBb#bBbb#bbbB#bBbb"7 0111"
        ||||       #     =         =    llll            bBBb#bBbb#bbbb#bBBb"8 1000"
    "rd"MMMMMMMMMM<b     =         =    ^^^^            bbBb#bBbB#bBBb#BBBB"9 1001"
        ^^^^ ^^^^  #     =         = 0g>ii31            BBBb#bbbb#BBBb#bbbb"a 1010"
        |||| ssss  #     =         = 6g>iiii            bBBB#bBbb#bBbB#Bbbb"b 1011"
        ||||       #     =         = 1g>iiii            bbbb#bBbb#bbbB#bBBB"c 1100"
    "rf"MMMMMMMMMM<b     =         =    ^^^^            bBBB#bBBB#bBBb#Bbbb"d 1101"
        ^^^^ ^^^^        =         =====3210            BBbb#BBBB#bBbb#bbbb"e 1110"
        |||| ssss        =                              bbbb#bbbb#bbbb#bbbb"f 1111"
        ||||             =                                                 "      "
        3210==============                             "oooo aaaa bbbb iccc"
                                                       " op |  A |  B |b indir, C"

0"Control the CPU here: clock to toggle ticking, manual clock to do a single"
0"tick, reset to reset the whole memory, reset IP to only reset the instruction"
0"pointer (program counter)."

             ###
             ###"manual clock"0
             p##
         ### v                    ###                   ###
 0"clock"###>o>a*g0           1g--p##"reset"0   2go<----p##"reset only IP"0
         ##R   m                  ###             ^     ###
           3   g3                                 g1

0"FIT:y"


           4   5   6   7                                                                       g9
           g   g   g   g   "control logic"                                                     v
           l   l   l   l                                                              11g>o<***a<g10
           ^   ^   ^   ^                        1                  15g                    *    m
     ******+*o<+*o<+*o<+**    11g>a<g10  10g**  6  g8  g9      9g** /    8g        g5     g17  g11
     w     * ^ * ^ * ^ * *        w          v  g  v   w          v/      v        v
    (o****>d**>d**>d**>d**>)      a-g13  11g>a->a<-e<o<a<g20  10g>a<****o<a<g6 12g]ag14
           #   #   #   #          ^                  ^            m     ^          m
           Q<g Q<g Q<g Q<g     g6**               9g>a<g19    11g**  8g]a<g5   15g**   10g---g18
           c 2 c 2 c 2 c 2           g16
           ^   ^   ^   ^             w
           *   *   *   *         21g>a>c-g3
 0g>O*******************             ^ Q<g2
                                     g6

0"All the global 'g' signals are control signals: 0=clock, 1=reset, 2=reset"
0"only IP (instruction pointer), 3=halt, 4-7=stages, 8-11=opcode, 12=c msb,"
0"13=alu, 14=b imm, 15=a indir, 16=IP jump, 17-18=alu select, 19=carry,"
0"20=zero, 21=IP carry"


0"Templates of the chips from which the CPU above is built:"


  "4-bit half adder"          "4-bit full adder"                     "negate 4 bits if flag"
      l   l   l   lI20            l     l     l     lI21                l   l   l   l
      ^   ^   ^   ^               ^     ^     ^     ^                   ^   ^   ^   ^
  l<a e a e a e a e **s     l<o<a e o<a e o<a e o<a e **s               e<* e<* e<* e<*
    ^^^/^^^/^^^/^^^/          ^ ^^^/^ ^^^/^ ^^^/^ ^^^/                  ^ * ^ * ^ * ^ *
    * * * * * * * *           a e * a e * a e * a e *                   * **+***+***+****sI22
    |   |   |   |             ^^^   ^^^   ^^^   ^^^                     *   *   *   *
    s   s   s   s             7 3   6 2   5 1   4 0                     s   s   s   s
                              =====================
                              7654 3210
                              ssss ssss

"logic: and, nand, or, xor"

                  llll                                                          s sI23
                  ^^^^                                                          v v
                  MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM<* |
                  MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM<--*
                  ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^
                  a<* a<* a<* a<* A<* A<* A<* A<* o<* o<* o<* o<* e<* e<* e<* e<*
                  ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ *
  0=1=2=3=4=5=6=7=0=4=1=5=2=6=3=7=0=4=1=5=2=6=3=7=0=4=1=5=2=6=3=7=0=4=1=5=2=6=3=7=============
  s s s s s s s s


       "4-bit reg w. clock,"                "4-bit reg w. clock,"
        "enable and reset"                  "reset, enable & bus"

           l   l   l   lI31                        "bus"
           ^   ^   ^   ^                           llllI32
         ==+===+===+===+=                          ^^^^
     "c"s0>c 0>c 0>c 0>c                      MMMMMMMMM<* llll"state"
     "e"s1>y 1>y 1>y 1>y                      ^^^^ ^^^^ * ^^^^
     "r"s2>Q 2>Q 2>Q 2>Q                 =====3210 3210=+=3210
           d   d   d   d                 =         |||| *
           ^   ^   ^   ^               **+*********++++****s"en. r/w"
           s   s   s   s               * =         ||||
                                       v = s>iiiiiiii31
                              "en. w"s>a-+-->iiiiiiiiii
                                         = s>iiiiiiiiii
                                         =         ^^^^
                                         ==========3210
                                                   ssss



"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"3

0"4-bit CPU information"

0"This is a 4-bit CPU. With 4 bits you can only represent 16 values, and in this"
0"CPU this is taken quite literally:"
0"There are less than 16 different possible opcodes"
0"There are max 16 instructions in the whole program"
0"There are max 16 addresses for all registers/memory and IO (8 are input, 8 are work/output)"
0"The ALU does 4-bit addition, 4-bit shift, ..."
0"So obviously it cannot do too much, but more than you think and it's easy to follow and program"

0"instruction format: oooo aaaa bbbb Dccc. In there:
0"oooo = opcode"
0"aaaa = address of first operand a"
0"bbbb = address or immediate value of second operand b"
0"D = if 0, b is immediate, else b is direct addressed"
0"ccc = address of output register/memory c"

0"the opcodes are:"
0"0000: add a to b and store in c"
0"0001: add a to b and store in c, using previous carry"
0"0010: subtract b from a and store in c"
0"0011: subtract b from a and store in c, using previous carry (borrow)"
0"0100: right shift a and store in c (NOTE: to left shift, use add a+a)"
0"0101: right shift a and store in c, using previous carry"
0"0110: MOV (=copy) indirect-addressed a to c"
0"0111: MOV (=copy) b to indirect-addressed a"
0"1000: a and b, store in c"
0"1001: a nand b, store in c"
0"1010: a or b, store in c"
0"1011: a xor b, store in c"
0"1100: jump to b if a is zero (value of b gives address, b can still be direct or indirect)"
0"1101: jump to b if a is nonzero (idem)"
0"1110: jump to b if carry flag set"
0"1111: jump to b if carry flag not set"

0"Instruction notes:"
0"-There is no direct MOV instruction, to do direct MOV use ADD, AND or OR"
0" with an operand set to zero."
0"-To do left shift, add a number to itself"
0"-To compare, subtract two values. If 0000, they are equal. To test lesser"
0" than, test the carry flag (1 if a >= b)"
0"-To negate bits, XOR with 1111"
0"-There is no unconditional jump. Use conditional one with value known to be"
0" 0 or non-0"

0"To enter a program, fill in the matrix of 16x16 instruction bits with b or B."
0"Also fill any of the user registers, that is registers 8-f. But registers 0-7"
0"cannot be edited, and may be assumed to all start at 0 initially. They may be"
0"overwritten by the program as working memory or user output."

"A few example programs:"

"empty template"

"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"

"multiplies r8 with r9 and stores result in r7"

"bbbb#Bbbb#bbbb#bbbb" 0"copy r8 to r0"
"bbbb#BbbB#bbbb#bbbB" 0"copy r9 to r1"
"Bbbb#bbbB#bbbB#bbBb" 0"mask r1 with 0001 and store in r2"
"BBbb#bbBb#bBbB#bbbb" 0"if r2 do next instruction, else jump over it"
"bbbb#bbbb#bBBB#BBBB" 0"add r0 to r7"
"bbbb#bbbb#bbbb#Bbbb" 0"shift r0 left"
"bBbb#bbbB#bbbb#bbbB" 0"shift r1 right"
"BBbB#bbbB#bbBb#bbbb" 0"if r1 goto 2"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"

0"performs 8-bit addition, using just two commands"
0"user must put A lsb in r8, A msb in r9, B lsb in ra, B msb in rb,"
0"result will have lsb in r0 and msb in r1"

"bbbb#Bbbb#BbBb#Bbbb" 0"4-bit add r8 and ra and store in r0"
"bbbB#BbbB#BbBB#BbbB" 0"4-bit add with previous carry r9 and rb and store in r1"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"

0"Performs multiplication of 2 4-bit numbers but with 8-bit result"
0"inputs are in r8 and r9. Output lsbs will be in r6, output msbs in r7"

"bbbb#Bbbb#bbbb#bbbb" 0"copy r8 to r0 (r1 will serve as its msbs)"
"bbbb#BbbB#bbbb#bbBb" 0"copy r9 to r2"
"Bbbb#bbBb#bbbB#bbBB" 0"mask r2 with 0001 and store in r3"
"BBbb#bbBB#bBBb#bbbb" 0"if r3 do next 2 instructions, else jump over them"
"bbbb#bbbb#bBBb#BBBb" 0"add r0 to r6"
"bbbB#bbbB#bBBB#BBBB" 0"add r1 to r7, with using previous carry (this & prev op = 8-bit add)"
"bbbb#bbbb#bbbb#Bbbb" 0"add r0 to r0 and store in r0 (this is left shift but remembering carry)"
"bbbB#bbbB#bbbB#BbbB" 0"add r1 to r1, with using previous carry, and store in r1 (this & prev op = 8-bit leftshift)"
"bBbb#bbBb#bbbb#bbBb" 0"shift r2 right"
"BBbB#bbBb#bbBb#bbbb" 0"if r2 goto 2"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"

0"Performs 4-bit division"
0"inputs are in r8 and r9. Output will have remainder in r6, quotient in r7"

"bbbb#bbbb#Bbbb#bbbb" 0"initialize loop variable r0 have highest bit set"
"bbbb#bBBb#bBBb#BBBb" 0"left shift remainder in r6"
"Bbbb#Bbbb#bbbb#BbbB" 0"mask numerator with r0 and store in r1"
"BBbb#bbbB#bBbB#bbbb" 0"if r1 is not zero, do next instruction"
"BbBb#bBBb#bbbB#bBBb" 0"or (well, xor here) the remainder with 1"
"bbBb#bBBb#BbbB#BbBb" 0"subtract dividor from remainder and store in r2"
"Bbbb#bbBb#Bbbb#bbBB" 0"mask off sign bit and store it in r3"
"BBbB#bbBB#BbBb#bbbb" 0"if the sign bit is zero, do next 2 instructions"
"bbbb#bbBb#bbbb#bBBb" 0"set remainder to r2"
"BbBb#bBBB#bbbb#BBBB" 0"or quotient with r0 (set its ith bit to 1)"
"bBbb#bbbb#bbbb#bbbb" 0"right shift loop var"
"BBbB#bbbb#bbbB#bbbb" 0"if loop var is not zero, continue at pos 1"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"
"bbbb#bbbb#bbbb#bbbb"

0"bubble sort. Sorts r8-r11 into r0-r3"
0"algo never stops running (there is no space to remember an extra"
0"variable for a stop condition)"

"bbbb#Bbbb#bbbb#bbbb" 0"copy r8 to r0"
"bbbb#BbbB#bbbb#bbbB" 0"copy r9 to r1"
"bbbb#BbBb#bbbb#bbBb" 0"copy r10 to r2"
"bbbb#BbBB#bbbb#bbBB" 0"copy r11 to r3"
"BBbB#bBbb#bBBb#bbbb" 0"if r4 == 0 (index)"
"bbbb#BBBB#bbBB#bBbb" 0"  set r4 to 3"
"bBBb#bBbb#bbbb#bBbB" 0"copy r[r4] to r5"
"bbBb#bBbb#bbbB#bBbb" 0"r4-- (index--)"
"bBBb#bBbb#bbbb#bBBb" 0"copy r[r4] to r6"
"bbBb#bBbB#bBBb#BBBB" 0"subtract r5 - r6 and store in r7"
"BBBb#bbbb#BBBb#bbbb" 0"if carry flag not set (so if r5 > r6)"
"bBBB#bBbb#bBbB#Bbbb" 0"  copy r5 to r[r4]"
"bbbb#bBbb#bbbB#bBBB" 0"  set r7 to r4 + 1"
"bBBB#bBBB#bBBb#Bbbb" 0"  copy r6 to r[r7]"
"BBbb#BBBB#bBbb#bbbb" 0"goto 4"
"bbbb#bbbb#bbbb#bbbb" 0""
`, 'cpu');


registerCircuit('8-bit divider effect', `

0"MODE:electron"

0"This circuit automatically shows the delay of the operation of the divider in"
0"action using a strategically placed timer. The timer makes it alternate"
0"between computing 15/1 and 15/3"

                 "r128         r64          r32          r16          r8           r4           r2           r1"
                  l            l            l            l            l            l            l            l
                  ^            ^            ^            ^            ^            ^            ^            ^
                  *            *            *            *            *            *            *            *
                  o<*          o<*          o<*          o<*          o<*          o<*          o<*          o<*
                  ^ *          ^ *          ^ *          ^ *          ^ *          ^ *          ^ *          ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
   "q1"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********S"a1"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
   "q2"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********S"a2"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
   "q4"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********S"a4"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
   "q8"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********S"a8"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
  "q16"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********s"a16"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
  "q32"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********s"a32"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
  "q64"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *******  *** *********s"a64"
            *         *  *         *  *         *  *         *  *         *  *         *  *         *  *
         ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<* ***+*****o<*
            *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *    *     ^ *
            *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*  *   *]a a<*
            *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *  *   * ^ ^ *
         ***+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+****+*****+*+***
         *  *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *    *     * *
 "q128"l[***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***+*o<a e * ***
            * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *  * ^ m^^ * *
            * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**  * a e **+**
            * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *    * ^mm   *
            *** *****    *** *****    *** *****    *** *****    *** *****    *** *****    *** *****    *** *********s"a128"
            *            *            *            *            *            *            *            *
            s            s            s            s            s            s            R80          S
           "b128         b64          b32          b16          b8           b4           b2           b1"

0"FIT:y"


`, 'div_effect');

registerCircuit('74595 8-bit register shift', `
0"this is a register shift 8 bit
0"1. enable or not 'serial data input'
0"2. enable and disable 'shift clock'
0"3. enable and disable 'latch clock' and you see the shift bit if you enable 'serial data input' in first times.

"output enable"      s----]o------------------------------*
                                                          |
"latch clock"        s---->O-----------------*            *----*
                                             |            |    v
"serial data input"  s---->O--]o---->d---*---+------>d>O--+---]z------>l "Qa"
                            *------->c   |   *------>c    |
                          *-+------->Q   |   |            |
                          | |      *-----*   |            *----*
                          | |      |         |            |    v
                          | |      *>d---*---+------>d>O--+---]z------>l "Qb"
                          | *------->c   |   *------>c    |
                          *-+------->Q   |   |            |
                          | |      *-----*   |            *----*
                          | |      |         |            |    v
                          | |      *>d---*---+------>d>O--+---]z------>l "Qc"
                          | *------->c   |   *------>c    |
                          *-+------->Q   |   |            |
                          | |      *-----*   |            *----*
                          | |      |         |            |    v
                          | |      *>d---*---+------>d>O--+---]z------>l "Qd"
                          | *------->c   |   *------>c    |
                          *-+------->Q   |   |            |
                          | |      *-----*   |            *----*
                          | |      |         |            |    v
                          | |      *>d---*---+------>d>O--+---]z------>l "Qe"
                          | *------->c   |   *------>c    |
                          *-+------->Q   |   |            |
                          | |      *-----*   |            *----*
                          | |      |         |            |    v
                          | |      *>d---*---+------>d>O--+---]z------>l "Qf"
                          | *------->c   |   *------>c    |
                          *-+------->Q   |   |            |
                          | |      *-----*   |            *----*
                          | |      |         |            |    v
                          | |      *>d---*---+------>d>O--+---]z------>l "Qg"
                          | *------->c   |   *------>c    |
                          *-+------->Q   |   |            |
                          | |      *-----*   |            *----*
                          | |      |         |                 v
                          | |      *>d---*---+------>d>O------]z------>l "Qh"
                          | *------->c   |   *------>c
                          *-+------->Q   |
                          | |            |
"shift clock"        s->O-+-*            *------------>O------]o------>l "serial data output"
                          |
"reset"              S-]o-*

0"Author/Contributor: chezsick
`, '74hc595');