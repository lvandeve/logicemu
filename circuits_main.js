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
This JS file contains various demo circuits and electronics tutorials,
and injects them into a dropdown from logicemu.js
*/

registerCircuitGroup('circuits');

registerTitle('Binary Logic');

registerCircuit('Logic Gates Tutorial', `

0"A logic gate is a device that implements a boolean function on some amount"
0"of inputs, typically one or two"

0"The OR gate outputs 1 whenever input a OR input b (or both) are on."
0"An OR gate is denoted with an 'o' in this simulation (but not in real electronics)"
0"Click the switches with the mouse to toggle them on or off and observe the effect"
0"on the output LED:"

 "a"s**>o**>l"out"
        ^
 "b"s****

0"A truth table shows the output for each combination of inputs:"

0"  a  b | OR  "
0"  -----+---- "
0"  0  0 |  0  "
0"  0  1 |  1  "
0"  1  0 |  1  "
0"  1  1 |  1  "

0"The AND gate outputs 1 only when input a AND input b are on:"
0"An AND gate is denoted with an 'a' in this simulation (again, not in real electronics)"

 "a"s**>a**>l"out"
        ^
 "b"s****

0"Here is its truth table:"

0"  a  b | AND  "
0"  -----+----  "
0"  0  0 |  0   "
0"  0  1 |  0   "
0"  1  0 |  0   "
0"  1  1 |  1   "

0"The XOR gate or EXCLUSIVE OR gate outputs 1 whenever exclusively input a OR"
0"exclusively input b (but not both) are on."
0"A XOR gate is denoted with an 'e' from 'e'xclusive in this simulation (but not in real electronics)"

 "a"s**>e**>l"out"
        ^
 "b"s****

0"Here is its truth table:"

0"  a  b | XOR "
0"  -----+---- "
0"  0  0 |  0  "
0"  0  1 |  1  "
0"  1  0 |  1  "
0"  1  1 |  0  "

0"The NOT gate has a single input and inverts it, so outputs 1 if the switch is off,"
0"and outputs 0 if the switch is on"
0"A XOR gate is denoted with an 'O' in this simulation (but not in real electronics)"

 "a"s**>O**>l"out"

0"Here is its truth table:"

0"  a | NOT "
0"  --+---- "
0"  0 |  1  "
0"  1 |  0  "

0"A NOR gate is an OR gate with a NOT behind it (so an OR with inverted output),"
0"integrated together as a single gate. The NOR gate outputs 1 only if both inputs are off."
0"A NOR gate is denoted with an 'O' in this simulation (again, not in real electronics),"
0"in general in this simulation, capital letters are used as inverted version of the gate"
0"(in real life electronics a little circle at the output is used instead)"

 "a"s**>O**>l"out"
        ^
 "b"s****

0"Here is its truth table:"

0"  a  b | NOR  "
0"  -----+----  "
0"  0  0 |  1   "
0"  0  1 |  0   "
0"  1  0 |  0   "
0"  1  1 |  0   "

0"The NAND gate is an AND gate with a NOT behind it, integrated into a single gate"
0"A NAND gate is denoted with an 'A' in this simulation (but not in real electronics)"

 "a"s**>A**>l"out"
        ^
 "b"s****

0"Here is its truth table:"

0"  a  b | NAND "
0"  -----+----- "
0"  0  0 |   1  "
0"  0  1 |   1  "
0"  1  0 |   1  "
0"  1  1 |   0  "

0"The XNOR gate is a XOR gate with a NOT behind it, integrated into a single gate."
0"XNOR is sometimes also called EQV from equivalence, because it outputs 1 if both"
0"inputs are equal (but this no longer holds true for multi-input gates, where it"
0"instead acts as an inverted parity [odd/even] gate)"
0"An XNOR gate is denoted with an 'E' in this simulation (but not in real electronics)"

 "a"s**>E**>l"out"
        ^
 "b"s****

0"Here is its truth table:"

0"  a  b | XNOR "
0"  -----+----- "
0"  0  0 |   1  "
0"  0  1 |   0  "
0"  1  0 |   0  "
0"  1  1 |   1  "

0"An IMPLY gate outputs 1 except when input a is true and input b is false."
0"Its name means 'a implies b', and since 'a=true, b=false' is the only combination"
0"that violates that statement, that is the only one where it outputs 0."
0"An IMPLY gate does not have its own letter notation in this simulation, instead"
0"it can be made with an OR gate with the a input inverted. The inverted input"
0"is denoted with a little circle in this simulation, for once like real electronics"
0"notation actually does it. Real electronics also uses an OR gate with inverted input"
0"as notation for IMPLY, and also uses a little circle at the input to invert inputs."
0"(note: ensure the render mode is 'graphical' to see the little circle,"
0"in text mode you see a square bracket ']' instead)."
0"Note that this gate is less common compared to the others and is really more commonly"
0"seen as an OR gate with an inverted input, in fact the main goal here is to demonstrate"
0"inverted inputs."

 "a"s**]o**>l"out"
        ^
 "b"s****

0"Here is its truth table:"

0"  a  b | IMPLY "
0"  -----+------ "
0"  0  0 |   1   "
0"  0  1 |   1   "
0"  1  0 |   0   "
0"  1  1 |   1   "

0"There are more gates you can make by inverting different inputs or outputs of any of the gates"
0"above, e.g. AND with one inverted input gives NIMPLY. Some combinations are redundant. In fact,"
0"there are 16 possible behaviors in total for 2-input gates. However the rest are"
0"less well established and not discussed here, you can view them all in the '16 gates' circuit."

0"As a final recap, here is the truth table of all gates seen here:"

0"  a  b | NOT  OR  NOR  AND  NAND  XOR  XNOR  IMPLY NIMPLY"
0"  -----+-------------------------------------------------"
0"  0  0 |  1    0   1    0     1    0     1     1     0   "
0"  0  1 |       1   0    0     1    1     0     1     0   "
0"  1  0 |  0    1   0    0     1    1     0     0     1   "
0"  1  1 |       1   0    1     0    0     1     1     0   "

`, 'logic_gates');

registerCircuit('Binary Numbers Tutorial', `

0"In logic circuits, we use binary instead of decimal counting. Decimal"
0"uses ten different digits. Binary uses a similar counting system, but"
0"with only 2 digits: 0 and 1. This is because in electronic circuits,"
0"it is much simpler to make a switch with two states than with ten states."
0"Computers typically do all math and other operations with binary numbers,"
0"and only convert the results to decimal when presenting them to the user."

0"So to be prepared for math circuits coming up later, this is an introduction"
0"to binary numbers and binary counting"

0"Decimal counts up with 10 possible symbols, from 0 to 0. Whenever 9 is reached, a next"
0"digit is incremented (if that next digit is a hidden zero, since prefix"
0"zeroes are usually not shown, it becomes a 1 and thus visible)"
0"With binary, it's just the same, except there are only two possible values, so"
0"next bits get added much faster"

0"Here are the first few decimal and binary numbers:"

"decimal | binary"
"--------+-------"
"      0 |      0"
"      1 |      1"
"      2 |     10"
"      3 |     11"
"      4 |    100"
"      5 |    101"
"      6 |    110"
"      7 |    111"
"      8 |   1000"
"      9 |   1001"
"     10 |   1010"
"     11 |   1011"
"     12 |   1100"
"     13 |   1101"
"     14 |   1110"
"     15 |   1111"
"     16 |  10000"
"            ^^^^
"            8421"

0"Prefix zeroes of a binary number are often shown. For example when"
0"one speaks of an 8-bit binary number, all 8 bits are shown, even"
0"zeroes in front. E.g. the number 1 as an 8-bit number is:"

"00000001"

0"To input and output binary numbers, set bits to 1 such that the sum"
0"of their values is the number you want. The value of each bit is a"
0"power of two. The least significant bit has value 1. The more"
0"significant bits have higher powers of two, for example 2 for the second"
0"bit, 4 for the third bit, 8 for the fourth bit, etc..."

0"Form any number you want below. For example, to form the number hundred,"
0"set the bits with values 64, 32 and 4 to 1. The sum of those is 100,"
0"and that is the only possible way to form the number 100. Note that"
0"the circuit below does not actually do anything, it just allows you to"
0"toggle some switches and LEDs to try to form numbers. The sum of all"
0"values below is 255 so that is the highest number you can make, it is"
0"the highest unsigned 8-bit value."


   "128 64 32 16 8  4  2  1"
     l  l  l  l  l  l  l  l
     ^  ^  ^  ^  ^  ^  ^  ^
     *  *  *  *  *  *  *  *
     s  s  s  s  s  s  s  s
   "128 64 32 16 8  4  2  1"

0"Most circuits operating on numbers will have such switches and LEDs like"
0"above, except some processing with logic gates will happen in-between"

0"We can also add a built-in binary-to-decimal display to switches to"
0"allow you to experiment more easily with binary numbers. The display"
0"shows your binary number in decimal. Try to make '21' for example."
0"You can make all numbers from 0 to 255, and there is exactly one combination"
0"of input switches to make each number."


     TTTTTTTTTTTTTTTTTTTTTT"decimal"
     ^  ^  ^  ^  ^  ^  ^  ^
     *  *  *  *  *  *  *  *
     s  s  s  s  s  s  s  s"binary"
   "128 64 32 16 8  4  2  1"

0"As another aid, here you can type any number from 0 to 255 in the box"
0"(click it if it has no blinking cursor) and see its binary output at the LEDs."



   "128 64 32 16 8  4  2  1"
     l  l  l  l  l  l  l  l"binary"
     ^  ^  ^  ^  ^  ^  ^  ^
     *  *  *  *  *  *  *  *
     TTTTTTTTTTTTTTTTTTTTTT"decimal"

0"FIT:x"
`, 'binary_numbers');

registerCircuit('16 gates', `

0"Because a 2-input gate has 4 combinations of inputs, and for each input combination"
0"has some output, there are in total 2^4 = 16 different possible behaviours of 16-input"
0"gate. Here, all 16 are implemented and their properties and names from logic shown"


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

0"FIT:y FIT:x"

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


registerCircuit('3-input logic gates', `

0"Gates with 3 or more inputs work similarly to their 2-input counterparts."
0"Multi-input AND only goes on if all inputs are on. Multi-input OR goes on if any input is on."
0"Multi-input XOR, however, acts differently, it acts as a parity gate (odd/even),"
0"it does not act as a 'one-hot-detector' gate. The behavior is that of"
0"chaining multiple 2-input gates together and that gives parity gate"
0"in case of XOR."

  s****      s****      s****      s****      s****      s****
      v          v          v          v          v          v
  s**>o**>l  s**>a**>l  s**>e**>l  s**>O**>l  s**>A**>l  s**>E**>l
      ^          ^          ^          ^          ^          ^
  s****      s****      s****      s****      s****      s****

0"There are a few other interesting 3-input gates, which we can build"
0"from multiple 2-input gates in our logic notation:"


0"And-Or-Invert (AOI) and Or-And-Invert (OAI), commonly used component"
0"in some electronics applications because it uses a relatively small"
0"amount of transistors"

s****           s****
    v               v
s**>a>O**>l     s**>o>A**>l
      ^               ^
s******         s******


0"Majority gate"

s****>a**
     >  v
s**** a>o**>l
     >  ^
s****>a**


0"One-hot detector gate: outputs only if exactly 1 input is on"

  *******
  *     v
s*+****]a**
  * *  ]  v
s*+*+**>a>o**>l
  * *  ]  ^
s***+**]a**
    *   ^
    *****


0"Equals gate: outputs only if all inputs are equal"

s**>E**
    ^ v
s**** a**>l
    v ^
s**>E**


`, 'gates3');


registerCircuit('De Morgan\'s law', `

0"De Morgan's law: each gate on the right is equivalent to the one on"
0"the left by having both inputs and the output negated"

0"For example, an AND gate can be made by taking an OR gate, inverting"
0"all inputs and the output. And same for all other combinations below."

  s**>a**>l   s**]O**>l
      ^           m
  s****       s****

  s**>o**>l   s**]A**>l
      ^           m
  s****       s****

  s**>A**>l   s**]o**>l
      ^           m
  s****       s****

  s**>O**>l   s**]a**>l
      ^           m
  s****       s****

  s**]o**>l   s**>A**>l
      ^           m
  s****       s****

0"You can verify this in the english. E.g.:"
0"'the sun is hot AND round'"
0"has the same meaning as:"
0"'it is NOT so that the sun is NOT hot OR that the sun is NOT round'"
0"Notice the three NOTs there and how the AND is replaced by OR"

`, 'morgans_law');


registerCircuit('NAND logic', `

0"NAND is a universal gate, any other logic gate can be constructed from NANDs"

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


s**>A>A>A**>l"NOR"
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
s**>A>A>A>A******>l"AND"
    ^
s****


s**>A******
          v
s**>A>A>A>A******>l"OR"
      ^
s**>A**


s********>A**
        v ^ v
s**>A** A** A****>l"XOR"
  v ^ v ^ v ^
  A** A**>A**
  ^ v ^
s**>A**


s********
        v
s**>A>A>A********>l"NAND"
    ^
s****


s**>A******
          v
s**>A>A>A>A>A****>l"NOR"
      ^
s**>A**


s**********
          *
  *****>A *>A**
  *     v v ^ v
s*+**>A>A A** A**>l"XNOR"
  * v   v ^ v ^
s**>A**>A**>A**


"a"s****>A**
         ^ v
"s"s****>A A*****>l"MUX"
       v   ^
"b"s**>A****


  **>A***
  *  ^  *
s*+***v v
  *   A>A>A>A****>l"majority"
s*+***^     ^
  *  v      *
s***>A*******


0"Wire crossing"

0"It's possible to make a wire crossing from logic gates without any"
0"wire crossing inside of this logic"

0"XOR with 4 NANDs"

s***>A**
   v ^ v
   A** A**>l   "XOR"
   ^ v ^
s***>A**

0"wire crossing with 3 XORs"

s****>e***>l
    v ^
    e**
    ^ v
s****>e***>l

0"wire crossing with 12 NANDs"


   *******>A**
   *     v ^ v
   *     A** A***>l
s***>A** ^ v ^
   v ^ v *>A**
   A** A**
   ^ v ^ *>A**
s***>A** v ^ v
   *     A** A***>l
   *     ^ v ^
   *******>A**

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

0"wire crossing with 8 NANDs, of which a 3-input and 2 1-input"

s***>A**>A>A**>l
   v ^ v ^
   A**>A**
   ^ v ^ v
s***>A**>A>A**>l

`, 'nand_logic');


registerCircuit('NOR logic', `

0"NOR is a universal gate, any other logic gate can be constructed from NORs"

s****>O****>l"NOT"


s**>O>O****>l"AND"
      ^
s**>O**


s**>O**>O**>l"OR"
    ^
s****

  *****>O
  *     v
s*+**>O>O
  * v   v
s**>O**>O**>l"XOR"


s**>O******>l"NOR"
    ^
s****


s**>O>O>O**>l"NAND"
      ^
s**>O**


s**>O**
  v ^ v
  O** O****>l"XNOR"
  ^ v ^
s**>O**



0"NOR logic emulating 3-input gates"
0"smallest possible amount of gates used"


s**********
          v
s****>O>O>O>O****>l"OR"
      ^
s******


s****>O******
            v
s****>O>O>O>O****>l"AND"
        ^
s****>O**


s********>O**
        v ^ v
s**>O** O** O****>l"XOR"
  v ^ v ^ v ^
  O** O**>O**
  ^ v ^
s**>O**


s**********
          v
s****>O>O>O******>l"NOR"
      ^
s******


s**>O******
          v
s**>O>O>O>O>O****>l"NAND"
      ^
s**>O**


s**********
          *
  *****>O *>O**
  *     v v ^ v
s*+**>O>O O** O**>l"XNOR"
  * v   v ^ v ^
s**>O**>O**>O**


"a"s**>O******
       ^     v
"s"s****>O   O***>l"MUX"
         v   ^
"b"s****>O****


  **>O***
  *  ^  *
s*+***v v
  *   O>O>O>O****>l"majority"
s*+***^     ^
  *  v      *
s***>O*******


0"Wire crossing"

0"It's possible to make a wire crossing from logic gates without any"
0"wire crossing inside of this logic"

0"XNOR with 4 NORs"

s***>O**
   v ^ v
   O** O**>l   "XNOR"
   ^ v ^
s***>O**

0"wire crossing with 3 XNORs"

s****>E***>l
    v ^
    E**
    ^ v
s****>E***>l

0"wire crossing with 12 NORs"

   *******>O**
   *     v ^ v
   *     O** O***>l
s***>O** ^ v ^
   v ^ v *>O**
   O** O**
   ^ v ^ *>O**
s***>O** v ^ v
   *     O** O***>l
   *     ^ v ^
   *******>O**


0"wire crossing with 10 NORs (various shapes)"

                                           s
   ***>O****        s**>O**>O**>l          *
   *   ^   v          * ^   ^            *******
s***>O**>O>O***>l     *>O**>O            v v   v
   v ^ v ^            v ^ v ^          *>O>O**>O
   O** O**            O** O**          * v v v v
   ^ v ^ v            ^ v ^ v        s**>O>O>O>O**>l
s***>O**>O>O***>l     *>O**>O          * * v
   *   v   ^          * v   v          * *>O
   ***>O****        s**>O**>O**>l      * v v
                                       *>O>O
                                           *
                                           *
                                           v
                                           l


0"wire crossing with 8 NORs, of which a 3-input and 2 1-input"

s****>O****>O*>O**>l
   v  ^  v  ^
   O****>O***
   ^  v  ^  v
s****>O****>O*>O**>l

`, 'nor_logic');



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
0"bit output by the XOR gate has value 1, the bit output by the AND gate has value 2."

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

0"The full adder is made from two half adders (each pair of a+e gate is"
0"a half adder). It sums 3 1-bit numbers (or 2 bits of a 1-bit number, and"
0"the third bit being the carry, see the ripple carry circuit for that),"
0"and outputs a 2-bit number"

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

0"The 8-bit ripple carry has 8 full adders, configured to pass on the"
0"carry. If you add 1 to 255, you get the slowest possible ripple."
0"The longest path is as long as the amount of bits, so this type of"
0"adder is slow and not used in practice (see carry lookahead adder next)"


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
0"carry adder is slow because the longest path goes through all the full adders."

0"Lookahead of the expected carry rather than letting it ripple through"
0"makes the adder faster, at the cost of more logic (especially many multi-input AND/OR gates)"

0"At the bottom are the standard full adders, except they are missing an AND and an OR (the"
0"lookahead unit has many big ones of those instead), and the outputs of their first half adder is"
0"given to the lookahead unit."

0"The left part computes things that are not needed for this 4-bit adder but can be used to"
0"chain multiple CLA's together. pg,gg to make a recursively bigger CLA, or c4 to ripple CLA's instead."
0"Note that there is some serious redundancy in the left part, since c4 can be computed as"
0"(pg AND c0) OR gg, but that would add one more gate delay and this circuit is demonstrating"
0"the absolute max speed"

0"The one-input AND and OR gates represent buffers. Without them, some signals have different lengths of"
0"gate delay and cause some garbage flickering. They cause no slowdown since only the longest path matters."

0"CLA = carry lookahead adder: this whole circuit"
0"LCU = lookahead carry unit: the logic excluding the full adders"
0"c = carry, g = carry generator (from AND), p = carry propagator (from XOR), pg = group prop., gg = group gen."

0"carry propagate will go on if adding 1 more bit to the input would cause a carry out."
0"carry generate will go on if a carry got generated in this 4-bit sum itself, but not due to the external input carry"

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

0"There are many ways to extend this adder to more than 4 bits: Keep doing the same as above with"
0"more and more and bigger and bigger AND and OR gates for every next bit. This is the fastest but most"
0"expensive. Recursively create a 16-bit adder from 4 of the above CLA, and so on. This is the middle"
0"ground in cost/speed. Ripple multiple of the above CLA's. This is slower but cheaper, and still faster than"
0"rippling every single bit (which would be an even slower but even cheaper option). And then, even"
0"more tradeoffs can be made by doing any of the above with other sizes than 4-bit CLA's."

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

0"Note: The full subtractor is similar to the adder, and in practice"
0"you don't need a separate circuit like this to subtract, you can also"
0"use a full adder, invert the bits of B and add 1 to B"

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

0"Note: in practice you don't need a separate circuit like this, you can"
0"use the full adder, to subtract, and look at the sign bit of the result"



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


0"Earlier circuits demonstrated the adder, subtractor and comparator."
0"You don't need all those three separate circuits to compute any of those"
0"however, with just an adder you can do all those operations. An ALU"
0"in a CPU, at a very basic level, does exactly that: It usually includes an adder to"
0"do various different computations."

0"In twos complement binary notation, subtracting a-b can be done by inverting the bits"
0"of b and adding 1. So before the adder inputs, put a circuit that can optionally negate"
0"b's bits (with xor gates), and adding 1 can be done with the carry input."

0"Comparing can be done by subtracting and then looking at the carry out:"
0"when subtracting a-b, it will be high when a >= b, low when a < b. To"
0"test for equality, use a many-input NOR gate to check if all out bits are zero."

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

0"Multiplication can be done with the shift-and-add algorithm:"
0"To multiply number A with n-bit number B:"
0"Initialize a result value at 0. Then n times, if the n-th bit of B"
0"is 1, add A to the result, and always shift A left by 1."
0"This can be done sequentially with an algorithm, but here it is done"
0"as one entire combinational circuit in hardware, so with n layers"
0"of adders. To multiply two 4-bit numbers, that gives 4 4-bit adders,"
0"for a total of 16 full adders."

0"The main unit is the following 1-bit full adder with a few extra's."
0"The carry c works as usual within a 4-bit adder."
0"The bit 'b' is the bit matching the current stage from the second number we are multiplying. It"
0"ANDs the 'a' input of the adder to disable it if 0."
0"We also output 'a' again at the top to apply the left-shift for the next stage,"
0"and pass 'b' through to the left because it must be applied to all adders of this stage."
0"'r' will eventually become a final result bit after it went through all stages."

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


0"Note how the shifting is done: rather than physically shifting a left, instead in this"
0"implementation 'a' goes up vertically and instead r shifts to the right. That boils down"
0"to the exact same thing, but it allows the circuit to be square shaped rather than a parallellogram."

0"To operate the circuit, enter a binary a at the bottom row, and a binary"
0"b at the right column. Then read the output in the 8 output LEDs, the"
0"ones in the right column are the 4 LSBs of the output, the top ones the 4 MSBs."
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






`, 'mul8');


registerCircuit('4-bit divider', `


0"Division of two binary n-bit numbers A/B to get quotient Q and remainder R"
0"can be done with the following algorithm (long division):"
0"Initialize Q and R at 0. Do n times (i=0..n-1): Left shift R by 1 bit."
0"Set R's least significant bit to bit #i of A. If R >= B, then subtract"
0"B from R and set bit #i of Q to 1."

0"This can be computed sequentially as an algorithm, but here we build"
0"a full combinational implementation with gates. Since there are n"
0"subtractions (and n is 4 for 4-bit dividers) that means there will be"
0"4 4-bit subtractors."

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

0"This implements the algorithm as follows: the subtractor inputs are"
0"the corresponding r and b bits of the R and B inputs. The l is the loan"
0"and works as usual in the full 4-bit subtractor unit this is part of."
0"On top, a multiplexer is added, which can choose between the subtractor"
0"output r-b, or between copying the input r. The choice is made by the"
0"q bit output by this 4-bit layer, and that q bit is the loan of the leftmost"
0"(MSB) full adder of this 4-bit layer (the inverse of it will be output)."
0"This matches the algorithm as follows: this leftmost load bit is true"
0"if r < b, and by controlling the mux this implements the 'if R >= B' and"
0"outputs R itself, or R with B subtracted, as seen in the algo, as the next R."
0"The rightmost R bit will be set to the corresponding bit of A (adding 1 to R"
0"where needed), and R is left shifted implicitely through the wiring between each layer."

0"Here is one of the 4 layers. Note how a single bit of A is input from the right"
0"as rightmost R bit, and all bits from B are used. Also note how the MUXes of all subtractors are"
0"controlled by the result of the leftmost subtractor, making this algorithm slow"
0"since this happens at every layer, so the computation has to cross every single"
0"subtractor all the time (the multiplier did not suffer from such slowness). Also"
0"note how the B inputs are passed through to the top, ready to go to the next layer."
0"The output remainder bits will be left shifted (and r8 discarded) for the next layer."

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


0"Finally, combining all stages together, to get the full 4-bit divider."
0"It computes a / b, and outputs the quotient on the left, and the remainder"
0"at the top, all 4-bit numbers. Look carefully which of the bits are the"
0"LSB (marked with 1) and MSB (marked with 8) of each of those 4 numbers..."


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

0"8-bit divider. See the 4-bit divider circuit for the explanation."
0"This one is simply bigger."

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




`, 'div8');


registerCircuit('8-bit right barrel shifter', `


0"A right barrel shifter can shift a binary number by a configurable"
0"amount of bits. This is implemented with layers of multiplexers."
0"The last layer, for 8+ bits of shifting, makes it always output 0, since"
0"it means the number got shifted too far."

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


0"A left barrel shifter can shift a binary number by a configurable"
0"amount of bits. This is implemented with layers of multiplexers."
0"The last layer, for 8+ bits of shifting, makes it always output 0, since"
0"it means the number got shifted too far."

0"Left shifting does the same as multiplying by two. For example"
0"left shifting by 1 is like multiplying with 2 (or adding the number to itself)."


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

0"The choice of left/right is implemented by mirroring at input and then mirroring"
0"back before the output. That way the internal right shifter has the effect of"
0"shifting left."


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
                  * 7yyy0y6yyy1y5yyy2y4yyy3y3yyy4y2yyy5y1yyy6y0yyy7 0"mirroring stage"
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
              * * * 7yyy7y6yyy6y5yyy5y4yyy4y3yyy3y2yyy2y1yyy1y0yyy0 0"redundant looking mux. For consistency..."
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
              * * * 7yyy3y6yyy2y5yyy1y4yyy0y3yyy7y2yyy6y1yyy5y0yyy4 0"rotate 4"
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
              * * * 7yyy1y6yyy0y5yyy7y4yyy6y3yyy5y2yyy4y1yyy3y0yyy2 0"rotate 2 right"
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
              * * * 7yyy0y6yyy7y5yyy6y4yyy5y3yyy4y2yyy3y1yyy2y0yyy1 0"rotate 1 right"
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
                *   7yyy0y6yyy1y5yyy2y4yyy3y3yyy4y2yyy5y1yyy6y0yyy7 0"mirroring stage"
                *   *     *     *     *     *     *     *     *
                *****     *     *     *     *     *     *     *
                    *     *     *     *     *     *     *     *
                    s     s     s     s     s     s     s     s

`);


registerTitle('Flip-flops');


registerCircuit('flip-flops tutorial', `

0"Flip-flops serve as memory elements, or elements that can keep state,"
0"in electronic circuits. This tutorial interactively introduces flip-flops"

0"Flip-Flop Types"
0"---------------"

0"There are 4 main flip-flop types: SR, D, T and JK. Before looking at"
0"how they work at logic-gate level, let's first use the prebuilt"
0"components that this simulation provides to look at their behavior."

0"All of these types have a clock input C. This clock is edge-triggered,"
0"that is, only at that exact instant where it goes on,"
0"it will update its state. At any other time, while the clock is high"
0"or low, it will remember that state.

0"SR Flip-Flop"
0"------------"


0"The SR flip-flop set-reset flip-flop has two inputs: S and R. Whenever"
0"the clock is edge-triggered, the output will go on if S is enabled,"
0"of is R is enabled, or stay as-is if neither S nor R are enabled. Having"
0"both S and R enabled is considered an invalid combination, and whichever"
0"behavior it happens to show here does not matter as it is unspecified"
0"and may violate assumptions"

 "S"s**>j#q**>l"Q"
        ###
 "R"s**>k##
        ###
 "C"s**>c##

0"The truth table of the SR flip-flop is as follows. It shows the"
0"transition (if any) that happens at each clock cycle: What is the"
0"next Q depending on the D input and the current Q"

0"+---+---+-------+"
0"| S | R | Qnext |"
0"+---+---+-------+"
0"| 0 | 0 |   Q   |"
0"| 0 | 1 |   1   |"
0"| 1 | 0 |   0   |"
0"| 1 | 1 |invalid|"
0"+---+---+-------+"

0"D Flip-Flop"
0"-----------"

0"The D flip-flop or data flip-flop will remember the state of its D"
0"input line whenever the clock goes from low to high. The clock is"
0"edge-triggered, that is, only at that exact instant where it goes on,"
0"it will update its state. Try it out: The way to get the output"
0"enabled, is to first enable d, then turn the clock c from"
0"off to on."

 "D"s**>d#q**>l"Q"
        ###
 "C"s**>c##

0"The truth table of the D flip-flop is as follows. It shows the"
0"transition (if any) that happens at each clock cycle: What is the"
0"next Q depending on the D input and the current Q"

0"+---+-------+"
0"| D | Qnext |"
0"+---+-------+"
0"| 0 |   0   |"
0"| 1 |   1   |"
0"+---+-------+"

0"It looks as if the truth table shows that the state is just equal to"
0"the input D, so it would seem as if it doesn't do much interesting?"
0"Well, it remembers the state while the clock is off. A D flip-flop actually"
0"delays the input by 1 clock cycle. By looping its output back to the"
0"input with a multiplexer, this is a very useful component for registers in"
0"CPU's"

0"T Flip-Flop"
0"-----------"

0"The T flip-flop or toggle flip-flop will toggle its state whenever the"
0"T input is enabled and the clock is triggered. If T is off, it will."
0"keep its state when the clock triggers."

 "T"s**>t#q**>l"Q"
        ###
 "C"s**>c##

0"In the truth table, Q' represents the inverse of Q"

0"+---+-------+"
0"| T | Qnext |"
0"+---+-------+"
0"| 0 |   Q   |"
0"| 1 |   Q'  |"
0"+---+-------+"

0"JK Flip-Flop"
0"------------"


0"The JK flip-flop is similar to the SR input, the J input behaves like"
0"set and the k input like reset. But for the JK flip-flop, the combination"
0"of having both j and k inputs enabled also has well defined behavior:"
0"it toggles the output similar to a T flip-flop in that case."

 "J"s**>j#q**>l"Q"
        ###
 "K"s**>k##
        ###
 "C"s**>c##

0"The truth table of the JK flip-flop is as follows. It shows the"
0"transition (if any) that happens at each clock cycle: What is the"
0"next Q depending on the D input and the current Q"

0"+---+---+-------+"
0"| S | R | Qnext |"
0"+---+---+-------+"
0"| 0 | 0 |   Q   |"
0"| 0 | 1 |   1   |"
0"| 1 | 0 |   0   |"
0"| 1 | 1 |   Q'  |"
0"+---+---+-------+"

0"The JK flip-flop is universal, it can easily be configured to act as"
0"SR, D or T flip-flop: T by connecting J and K together, D by making"
0"K the inverse of J."

0"In practice, many flip-flops also come with an asynchronous reset"
0"input (clear), and somtimes such asynchronous set input (preset),"
0"and often also an inverted version of the output. Asynchronous means"
0"it ignores the clock and overrides everything."

      "preset"
          s
          *
          *
          v
 "J"s**>j#q**>l"Q"
        ###
 "K"s**>k##
        ###
 "C"s**>c#Q**>l"Q'"
          ^
          *
          *
          s
       "clear"

0"In real electronics notation, the above flip-flop looks more"
0"somewhat like this:"

0"       |        "
0"   +-------+    "
0"---|J Pr  Q|--- "
0"   |       |    "
0"---|>      |    "
0"   |      _|    "
0"---|K CLR Q|--- "
0"   +-------+    "
0"       |        "


0"Flip-flops from logic gates"
0"---------------------------"

0"Now let's make flip-flops from actual logic gates, rather than using"
0"the idealized simulated devices above. This section will look at the"
0"low level timings in the gates, so make sure the update algorithm is"
0"set to 'electron' mode"


0"SR NOR Latch"
0"------------"

0"The most basic flip-flop circuit in electronics has two looped-back"
0"NOR gates, and can flip between two states - and remember them."

0"It's called the SR NOR latch (but originally was called flip-flop"
0"for its behavior). Today, we use the following terminology:"
0"*) latch: when it operates directly, asynchronously, at the lowest level,"
0"   the inputs directly affect the outputs (transparent)"
0"*) gated latch: latch with an enable input. When the enable input is high,"
0"   it still works like a latch"
0"*) flip-flop: when it has an edge-triggered clock, for the most reliable"
0"   well-controlled behavior"

0"It remembers the state of the last switch that was enabled, when both"
0"switches are off. There is also an invalid state: both switches on is"
0"invalid, it happens to make both outputs go off for this particular"
0"combination of gates, but this breaks the desired mode of operation"
0"where exactly one of the two outputs is on and the other is its inverse."

 "S"s**>O<*>l"Q  on"
        * *
         x
        * *
 "R"s**>O<*>l"Q' off"

0"Please carefully notice the wiring above: For convenience the LEDs are"
0"connected to the opposite NOR gate so that the position matches the"
0"corresponding switch. This same NOR latch will be reused many times"
0"below, until a chapter about NAND logic much later."

0"A bit more compact representation of the same thing:"

 "S"s***>O<***>l "Q"
         v *
 "R"s***>O**

0"This latch can also be made from NAND gates instead of NOR gates, but"
0"the inputs are then active-low."


0"Gated SR Latch"
0"--------------"

0"An SR latch can be made 'gated' by adding an 'enable' input. Only when"
0"the enable input is enabled, will the inputs have any effect. This"
0"allows to control more easily when the state of the flip-flop should"
0"update, even if the input signals are doing other things while enable"
0"is off. This can be done by adding AND gates in front:"

 "S"s**>a>O<*>l"Q  on"
        ^ * *
 "E"s****  x
        v * *
 "R"s**>a>O<*>l"Q' off"

0"Gated D Latch"
0"-------------"

0"A non-gated D-latch would not be too interesting, as it would simply"
0"immediately output the same value as it input. Making it gates allows"
0"it to remember the state while enable is off. A gated SR latch can"
0"easily be modified into a gated D-latch: Connect the D input to S when"
0"on, to R when off:"

 "D"s****>a>O<*>l"Q  on"
        * ^ * *
 "E"s***+**  x
        * v * *
        *]a>O<*>l"Q' off"


0"JK and T Latch"
0"--------------"

0"Neither a T-latch nor a JK-latch make too much sense, the toggling"
0"only works in stable ways with an edge-triggered clock input, without"
0"it the signal would pulse rapidly and it would be quite random which"
0"state it is in when disabling the enable input. So those only make"
0"sense as flip-flops, see above as well as further below. Here's a"
0"JK latch anyway:"


         ***
         v *
"J" s***>a>O<***>l
           v *
"K" s***>a>O**
         ^ *
         ***


0"How the latch works: the right two NORs are an SR latch as seen above."
0"The two inputs are AND-ed with the output of their corresponding NOR"
0"(they could alternatively be AND-ed with the inverse of the output of"
0"the opposite NOR), so the switch input will be seen by the NOR but"
0"then immediately disable itself due to the NORs output going off. The"
0"NOR keeps its state thanks to the opposite NOR though. But now if both"
0"switches are active, this causes an eternal conflict between both NORs,"
0"causing the blinking."

0"It can also be made from 4 NOR gates instead of NAND gates, but"
0"the inputs are then active-low."

0"A T latch can be made by tying J and K together:"

         ***
         v *
"T" s***>a>O<***>l"Q"
       *   v *
       *>a>O**
         ^ *
         ***

0"The toggling makes the output LED blink rapidly. So this toggling"
0"is not very useful as it's pretty random which state it will be in when"
0"releasing an input, especially given that in real life electronics this"
0"happens at nanosecond speed."

0"gated JK and T Latch"
0"--------------------"

0"These latches, too, can be gated. However, the toggle output still"
0"does not get more useful from this because the gate is not edge-triggered."
0"Note the 3-input AND gates."


        ***
        v *
"J" s**>a>O<*****>l"Q  on"
        ^ * *
"E" s****  x
        v * *
"K" s**>a>O<*****>l"Q' off"
        ^ *
        ***


        ***
        v *
"T" s**>a>O<*****>l"Q  on"
      * ^ * *
"E" s*+**  x
      * v * *
      *>a>O<*****>l"Q' off"
        ^ *
        ***


0"Attempting edge-triggered clocks"
0"--------------------------------"

0"How to make an edge-triggered clock? A simple way to try first, but that"
0"will turn out to be not optimal, is to turn the clock signal into a very"
0"short pulse, with an edge-detecter circuit like this:"

s****>d**]a**>l
    *     ^
    *******

0"There is a small delay included in the above, and an AND gate with one"
0"inverted input, so that it only outputs a short pulse when you just"
0"enable the switch. Using this as enable gate of a gated SR or D latch"
0"makes them behave more like an edge triggered flip-flop"

0"However, making sure the update algorithm is set to 'electron' mode,"
0"try it out and you may notice a problem:"

  "S"s********>a>O<*>l"Q  on"
               ^ * *
  "C"s**>d]a****  x
       *   ^   v * *
  "R"s*+***+**>a>O<*>l"Q' off"
       *   *
       *****


  "D"s**********>a>O<*>l"Q  on"
               * ^ * *
  "C"s**>d]a***+**  x
       *   ^   * v * *
       *****   *]a>O<*>l"Q' off"


                ***
                v *
  "T" s********>a>O<*****>l"Q  on"
              * ^ * *
  "C" s**>d]a*+**  x
        *   ^ * v * *
        ***** *>a>O<*****>l"Q' off"
                ^ *
                ***


                ***
                v *
  "J" s********>a>O<*****>l"Q  on"
                ^ * *
  "C" s**>d]a****  x
        *   ^   v * *
  "K" s*+***+**>a>O<*****>l"Q' off"
        *   *   ^ *
        *****   ***

0"Often when enabling the clock, you may find the two output LEDs"
0"blinking rapidly, and it sometimes even settles at the wrong output."
0"This is because the pulse happens to be too short for the latch's"
0"circuit to handle. Making the delay longer (2 ticks by adding a 2"
0"at the d) helps in this case:"

  "S"s********>a>O<*>l"Q  on"
         2     ^ * *
  "C"s**>d]a****  x
       *   ^   v * *
  "R"s*+***+**>a>O<*>l"Q' off"
       *   *
       *****


  "D"s**********>a>O<*>l"Q  on"
         2     * ^ * *
  "C"s**>d]a***+**  x
       *   ^   * v * *
       *****   *]a>O<*>l"Q' off"


                ***
                v *
  "T" s********>a>O<*****>l"Q  on"
          2   * ^ * *
  "C" s**>d]a*+**  x
        *   ^ * v * *
        ***** *>a>O<*****>l"Q' off"
                ^ *
                ***


                ***
                v *
  "J" s********>a>O<*****>l"Q  on"
          2     ^ * *
  "C" s**>d]a****  x
        *   ^   v * *
  "K" s*+***+**>a>O<*****>l"Q' off"
        *   *   ^ *
        *****   ***

0"A delay of 2 happens to work in this simulation because the paths in"
0"the flip-flops are 2 ticks long (that is, in these NOR NOR latches,"
0"the longest path goes through both NORs, which is 2 ticks), and the"
0"2 at the delay happens to make it match those 2 ticks perfectly here"

0"But that is always going to be fiddly. How much delay do you need in"
0"high speed circuits to be optimally fast yet not too fast for it to?
0"fail? In real life, especially for the toggling state of T and JK"
0"flip-flops, it is very hard to get this right"

0"Truly edge-triggered clocks"
0"---------------------------"

0"A more optimal edge-triggered clock, that does not rely on exact timing"
0"of a short pulse, can be made by putting two gated D latches in a row, the"
0"receiving the inverted enable (clock) signal, the second the regular"
0"enable (clock) signal and with the output of the previous one as input."
0"Then while the clock is low, your input can freely change the first one"
0"but not the second one that gives the actual output. When the clock is high,"
0"then the first one no longer responds to the input, but the second one will"
0"update its state to that of the first one. As long as the clock remains high,"
0"the first one cannot change, so after this update when the clock went high"
0"nothing can affect the second one anymore either. That's how to get the perfect"
0"positive edge-triggered effect. This is also called the 'master-slave' flip-flop."
0"(note: you could also avoid the invertor at an input of the second flip-flop"
0"by using the inverted output from the first flip-flop)"


  "D"s*****>a>O<*****>a>O<*>l"Q  on"
          * ^ * *   * ^ * *
        **+**  x  **+**  x
        * * v * * * * v * *
        O *]a>O<* * *]a>O<*>l"Q' off"
        ^         *
  "C"s*************

0"In the above circuit, moving the position where the invertor of the clock"
0"is can make it negative edge-triggered instead of positive edge-triggered"



0"Similarly, using two gated JK latches can create a JK flip-flop in such"
0"configuration, so that we get a useful toggle signal. Rather than two"
0"independent JK latches, the output from the second one is fed back to"
0"the first. If you enable both J and K, it will toggle state every time"
0"the clock is positively edge triggered. Though this is not yet an actual perfect"
0"edge-triggered JK flipflop yet in the strictest sense, see further."

0"Note: Just like in real life, due to initial randomization of the states, the first clock"
0"cycle may behave wrongly, and for convenience the switch was made initially on for that"

              ***********
              v         *
    "J"s*****>a>O<***>a>O<*****>l"Q  on"
              ^ * *   ^ * *
            ***  x  ***  x  0"broken, see note!"
            * v * * * v * *
    "K"s****+>a>O<**+>a>O<*****>l"Q' off"
            * ^     *   *
            O ******+****
            ^       *
    "C"S*************

0"The above is useful but is not a truly perfect edge-triggered JK"
0"flip-flop however. To be perfect, it should ONLY be affected by the"
0"state of the inputs at the time the positive edge happens."
0"But here you can try the following: Set its state to off first and turn"
0"all three inputs off. Now turn J on and then off again (without"
0"touching the clock). Now your inputs are still all off. Since J and K"
0"are off, if you now enable to clock, a perfect JK flip-flop should not"
0"turn on. But now enable to clock on the above one, and observe what"
0"happens: it goes on anyway, because turnong the J off and on again"
0"managed to change the state of the first latch. The D-flip-flop did"
0"not suffer from this problem, because the D was wired in such a way"
0"that it always actively provides either a set or a reset to the inputs."
0"But the extra freedom of the JK flip-flop introduces this bad behavior."

0"For example, when making a T flip-flop from the above by wiring J and"
0"K together, there is also a problem: when you disable T, there will"
0"still be one more clock cycle that toggles the output anyway, which is"
0"quite undesirable:"

              ***********
              v         *
    "T"s*****>a>O<***>a>O<*****>l"Q  on"
          *   ^ * *   ^ * *
          * ***  x  ***  x  0"broken, see note!"
          * * v * * * v * *
          **+>a>O<**+>a>O<*****>l"Q' off"
            * ^     *   *
            O ******+****
            ^       *
    "C"S*************

0"One way to solve it, is to take the D flip-flop from above, and instead"
0"add additional combinational logic at the input to compute the desired"
0"next state from the input and the current state. For T, we want next Q"
0"on if and only if any of the following two conditions:"
0"*) T is on and Q is off"
0"*) T is off and Q is on"
0"This logic can be compacted: Qnext = (T xor Q)"


         *********************
         v                   *
  "T"s**>e****>a>O<*****>a>O<*>l"Q  on"
             * ^ * *   * ^ * *
           **+**  x  **+**  x
           * * v * * * * v * *
           O *]a>O<* * *]a>O<*>l"Q' off"
           ^         *
  "C"s****************

0"We can also solve the full JK flip-flop that way, here the logic is a"
0"bit bigger because there are more rules. We want next Q on if and only"
0"if any of the following three conditions:"
0"*) J is on and K is off"
0"*) J is on and K is on and Q is off"
0"*) J is off and K is off and Q is on"
0"This logic can be compacted (with a karnough map for example):"
0"Qnext = (J and !Q) or (!K and Q)"


        *************************
        w *                     *
  "J"s*>a*+>o****>a>O<*****>a>O<*>l"Q  on"
          v ^   * ^ * *   * ^ * *
  "K"s***]a** **+**  x  **+**  x
              * * v * * * * v * *
              O *]a>O<* * *]a>O<*>l"Q' off"
              ^         *
  "C"s*******************


0"Adding asynchronous reset and set (clear and preset) can be done by"
0"directly manipulating the second flip-flop with not much additional"
0"logic needed:"

                    "preset"
                        s
                        v
  "D"s*****>a>O<*****>a>O<*>l"Q  on"
          * ^ * *   * ^ * *
        **+**  x  **+**  x
        * * v * * * * v * *
        O *]a>O<* * *]a>O<*>l"Q' off"
        ^         *     ^
  "C"s*************     s
                     "clear"

0"Summary"
0"-------"

0"Above we saw latches (which are transparent), gated latches (which are"
0"transparent if the gate is enabled), and flip-flops (which can change"
0"only on a clock edge). And then we saw the types SR, D, T, JK. This"
0"table summarizes the amount of inputs (including gate/clock but excluding"
0"optional preset/clear inputs) of each of those types, or leaves the"
0"table cell empty if there is no useful circuit (e.g. JK/T latch is not"
0"because their toggle is chaotic, and D latch is not because it would be"
0"simply a pass-through wire)"

0"    | latch | gated l. | flip-flop |"
0"----+-------+----------+-----------+"
0" SR |   2   |   3      |    3      |"
0"----+-------+----------+-----------+"
0" D  |       |   2      |    2      |"
0"----+-------+----------+-----------+"
0" T  |       |          |    2      |"
0"----+-------+----------+-----------+"
0" JK |       |          |    3      |"
0"----+-------+----------+-----------+"

0"Epilogue"
0"--------"

0"This concludes the first flip-flop tutorial. Now enjoy using them in designs :)"

0"The next tutorial 'flip-flops (from NAND)' is a second part that will build flip-flops from NAND gates only."
0"It is also an important part since a few more canonical typical flip-flop circuits"
0"are introduced."

0"Don't forget that you don't need to use all those logic gates if you don't"
0"want to, there are simple built-in flip-flops available in the simulation"
0"like so:"

s**>j#q**>l
    ###
s**>k##
    ###
s**>c#Q**>l

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

0"RENDER:graphical"

`, 'flip_flops');


registerCircuit('flip-flops (from NAND)', `


0"This circuit continues the previous one named 'flip-flops tutorial',"
0"so it's recommended to view that one first unless you already know"
0"what flip-flops do and how they work."

0"Flip-flops from NAND gates only"
0"-------------------------------"

0"The NAND gate is a universal gate so any circuit can be made from only"
0"NAND."
0"In the flip-flops tutorial we created perfect flip-flops from pure logic gates, but"
0"it was a mix of different gates. In practice, it may be cheaper to"
0"create circuits from only a single gate, the NAND gate. This argument"
0"probably does not hold true today, where you can make any gates from"
0"any transistors you want on the surfaces of chips, but the flip-flops"
0"from NAND logic only are actually still quite cheap and elegant compared"
0"to the ones from the previous tutorial, and often the canonical circuits, so the chapters"
0"below are worth it for that."

0"We could do something similar with NOR-only logic, in most circuits you"
0"can keep all wiring the same and replace all NANDs with NORs and that"
0"will often result in the same flip-flop except with active-low inputs"
0"and outputs, and negative edge-triggered clock. But NAND is chosen in"
0"this tutorial."

0"NAND latches"
0"------------"

0"In the previous tutorial we saw the NOR latch. Now let's present the NAND latch, which"
0"acts the same, except its inputs are active-low (so both switches off"
0"is now the invalid combination, and you must set both switches on to"
0"make it remember state)."
0"NOTE: if you saw this latch flicker when just loading the circuit, that's normal, initially"
0"a flip-flop is in a bistable state and takes time to settle to a random state,"
0"this is emulated when we are in 'electron' mode, in real life this happens in nanoseconds."

 "S'"S**>A**>l"Q  on"
         ^ *
          x
         v *
 "R'"S**>A**>l"Q' off"

0"Please look carefully at the wiring above: The arrows in the diagonal"
0"wires are in the opposite direction as they were in the NOR latches"
0"above, with as only reason to have the Q and Q' in more desirable"
0"positions in the circuits below that use this same core."

0"Note that most other circuits below will all be nicely active-high,"
0"because we'll be using NAND gates at the input of this latch as well,"
0"which will invert the inputs making them effectively active-high."

0"The JK latch can also be made with 4 NAND gates."
0"Comparing this to the earlier JK latch: this is like using its SR"
0"latch with NAND instead of NOR so their inputs become active-low,"
0"replacing the input ANDs with NANDs to make them this active-low,"
0"and connecting the opposite output to each input rather than inverse"
0"of the corresponding output."

       *****
       v v *
"J"s**>A>A*+****>l"Q"
           * *
"K"s**>A>A** *
       ^ ^   *
       *******

0"The T latch is straightforward from that:"

       *****
       v v *
"T"s**>A>A*+****>l"Q"
     *     * *
     *>A>A** *
       ^ ^   *
       *******

0"gated NAND latches"
0"------------------"

0"Making the SR latch gated with NAND gates has the advantage it also"
0"makes it active high instead of active low. Note that this configuration"
0"isn't that different from the non-gated JK latch above, just different"
0"wiring."


"S"s**>A**>A******>l"Q"
       ^   ^ *
"E"s****    x
       v   v *
"R"s**>A**>A**

0"From this, a gated D latch could be made with an extra NAND as invertor:"

"D"s**>A**>A******>l"Q"
     * ^   ^ *
"E"s*+**    x
     v v   v *
     A>A**>A**

0"But it's possible to do better and only use 4 NAND gates total as follows,"
0"making it cheaper than the earlier solution with NORs, ANDs and an inverter"

"D"s**>A****>A******>l"Q"
       ^ *   ^ *
       * *    x
       * v   v *
"E"s****>A**>A**

0"A more compact looking version of the same thing:"

"D"s>A**>A**>l"Q"
     ^ v ^ *
"E"s**>A>A<*


0"To make the above JK latch gates, the first NANDs can be used as 3-input"
0"NAND gates:"

       *****
       v v *
"J"s**>A>A*+****>l"Q"
       ^   * *
"E"s****   * *
       v   * *
"K"s**>A>A** *
       ^ ^   *
       *******

0"However! Strictly speaking, NAND-logic only supports 2-input NAND gates."
0"A 3-input NAND gate requires 3 2-input NANDs to create. So unfortunately"
0"with only 2-input NAND gates (and 1-input which is a 2-input with the two"
0"inputs connected), the JK latch looks a bit more expensive, with two regular"
0"AND gates created from NAND+inverter at the front:"

              *****
              v v *
"J"s***>A>A**>A>A*+****>l"Q"
        ^         * *
"E"s*****         * *
        v         * *
"K"s***>A>A**>A>A** *
              ^ ^   *
              *******

0"The T latch can save one of those NAND pairs:"

             *****
             v v *
"T"s****   *>A>A*+****>l"Q"
       v   *     * *
       A>A**     * *
       ^   *     * *
"E"s****   *>A>A** *
             ^ ^   *
             *******

0"Note that, as in the previous tutorial, these JK and T latches are not useful due to the"
0"uncontrolled toggling, even when it has an 'enable' input."

0"Of interest, also, is an alternative form of D latch, the Earle latch"
0"It has a low and high enable input, for convenience they are both wired"
0"to the same switch below (that leftmost NAND is not part of the normal Earle latch"
0"cicruit, it requires you to provide the two opposite enable inputs). Note"
0"that this one also has a 3-input NAND in it, so purely with 2-input NANDs"
0"it would take 6 NAND gates (7 including the negatino of the enable input)"
0"Its advantage is that all paths are as long, rather than variable length"


     ***>A****
     *   ^   *
     * ***   *
     * *     v
"D"s*+**>A**>A**>l"Q"
     *   ^   ^ *
     A   ****+**
     ^   v   *
"E"s****>A****

0"Edge-triggered flip-flop"
0"------------------------"

0"Same as before: Two D-latches in a row, but now with only NAND gates:"


"D"s**>A****>A***>A****>A***>l"Q"
       ^ *   ^ *  ^ *   ^ *
       * *    x   * *    x
       * v   v *  * v   v *
       *>A**>A**  *>A**>A**
       A          *
       ^          *
"C"s***************


0"There is also an entirely different D flip-flop from NAND gates possible,"
0"the classical positive-edge-triggered D flip-flop. It requires either 6"
0"NAND gates of which one is 3-input, or 8 2-input NAND gates."

      *******
      *     *
"D"s**+**>A**
      *   ^ *
      *    x
      *   v *
      * *>A****>A**
      * * ^     ^ *
"C"s**+**  ;     x
      * *   *   v *
      * *>A****>A***>l
      *   ^ *
      *    x
      *   v *
      ***>A**

0"Despite having fewer NAND gates here, AFAIK in practice the master-slave"
0"flip-flop is cheaper in modern chips because there are cheap ways to make"
0"the two D latches from transistors"


0"Now let's add the master-slave JK flip-flop with two JK latches again,"
0"though remember this one is not TRULY an edge triggered JK flip-flop."

0"The version with 3-input NANDs:"

         ***************
         v           v *
"J"s****>A>A******>A>A*+****>l"Q"
         ^ ^ *     ^   * *
      ****  x   ****   * *
      *  v v *  *  v   * * 0"broken! see note"
"K"s**+*>A>A****+*>A>A** *
      *  ^      *    ^   *
      A  *******+*********
      ^         *
"C"s*************

0"The version with 2-input NANDs:"

               ***************
               v           v *
"J"s****>A>A**>A>A******>A>A*+****>l"Q"
         ^       ^ *     ^   * *
      ****        x   ****   * *
      *  v       v *  *  v   * * 0"broken! see note"
"K"s**+*>A>A**>A>A****+*>A>A** *
      *        ^      *    ^   *
      A        *******+*********
      ^               *
"C"s*******************


0"To make the truly properly edge-triggered T flip-flop with the XOR in front of"
0"a D flip-flop, we need 4 NAND gates to implement this XOR"

            *******************
            *                 *
"T"s***>A>A*+*>A**>A***>A**>A*****>l"Q"
      * ^ ^ *  ^ * ^ *  ^ * ^ *
      *>A>A *  * *  x   * *  x
        ^ ^ *  * v v *  * v v *
        *****  *>A>A**  *>A>A**
               *        *
               A        *
               ^        *
"C"s*********************


0"Fortunately, to make the JK flip-flop, we don't need any more NAND gates, the 4"
0"NAND gates of the above XOR gate already serve perfectly well to implement the"
0"logic. Just give it the two separate inputs. This is because XOR means the same as"
0"as (T AND !Q) OR (!T AND Q), and for the JK flipflop we saw above that its input"
0"logic is (J and !Q) OR (!K and Q), which looks similar except the !T is replaced"
0"by a different input."

            *******************
            *                 *
"J"s***>A>A*+*>A**>A***>A**>A*****>l"Q"
        ^ ^ *  ^ * ^ *  ^ * ^ *
"K"s***>A>A *  * *  x   * *  x
        ^ ^ *  * v v *  * v v *
        *****  *>A>A**  *>A>A**
               *        *
               A        *
               ^        *
"C"s*********************

0"A more compact looking version of the same thing:"

          *******************
          v v               *
"J"s*****>A>A *>A**>A**>A**>A<****>l
          v v * ^ v ^ * ^ v v *
"K"s*****>A>A** A>A>A<* *>A>A**
                ^       *
"C"s*********************

0"RENDER:graphical"

`, 'flip_flops_nand');


registerCircuit('flip-flops (from counters)', `

0"This one is just for interest in this simulation itself. The simulation"
0"provides the 'c' gate as counter gate. This is a single-input T flip-flop."
0"The circuits here show how to make any regular flip-flop for those."

0"Gated D latch. Not a valid D flip-flop, only a gated latch, because it's"
0"possible to change state while the clock is high instead of only on clock"
0"rising edge"

"D" s**>e<*
        v c***>l
"E" s**>a*^

0"D flipflop. Two c's are needed to prevent anything from changing"
0"except when clock goes from low to high."

"D" s**>e<*>e<*
        v * v *
        a>c a>c****>l
        m   ^
"C" s********

0"It's not possible to do the above or any of the next flip-flops with only"
0"a single c, because a c's output comes 1 tick after its input, and when"
0"looping the output back to the input, needed for the control logic, it"
0"may disable itself the next tick, like this:"

    ***
    v *
s**>c****>l


0"T flip-flop"

0"Despite 'c' being a single-input T flip-flop, two c's are needed to use"
0"it for one with separate T and clock input."

"T" s**>e<*
        v *
        a>c>a>c****>l
        m   ^
"C" s********

0"SR flipflop"

"S" s**>o>e<*>e<*
        ^ v * v *
"R" s**]a a>c a>c****>l
        ^ m   ^ *
"C" s***+****** *
        *       *
        *********

0"JK flipflop"

        *************
        * w         *
"J" s***+>a *****   *
        v v v   *   *
"K" s**>a>o>e>a>c>a>c********>l
              m   ^
"C" s**************

`);


registerCircuit('flip-flops (from Qq)', `

0"This one is just for interest in this simulation itself. The simulation"
0"provides 'Qq' as an SR latch. Here we try to build all ideal flip-flops"
0"from it."

0"SR latch"

"S" s**>q**>l
        #
"R" s**>Q

0"Gated D latch"

"D" s*>A**]q**>l
       ^ v #
"E" s***>A]Q

0"D flip-flop"

"D" s*>A**]q>A**]q******>l
       m v # ^ v #
       *]A]Q *>A]Q
       *     *
"C" s*********


0"T flip-flop"

        *************
        v           *
"T" s**>e>A**]q>A**]q******>l
          m v # ^ v #
          *]A]Q *>A]Q
          *     *
"C" s************

0"SR flip-flop"

"S" s**>o>A**]q>A**]q******>l
        ^ m v # ^ v #
"R" s**]a *]A]Q *>A]Q
        m *     *   *
"C" s***+********   *
        *           *
        *************

0"JK flip-flop"

"J" s**>a[***************
        v  *            *
        o**+*>A**]q>A**]q******>l
        ^  *  m v # ^ v #
"K" s**]a<**  *]A]Q *>A]Q
              *     *
"C" s****************



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

0"NOTE: in 'electron' mode, you can also make it with an or gate (serving as buffer/diode) instead of a 'd' gate."
0"but in the 'fast' simulation algorithms, only the 'd' makes the 1-tick we need explicit"

0"The single counter is a frequency halfer, so undos the effect of the frequency doubler:"

        l2
        ^
s****>d>e>c*****>l
    *   ^
    *****

`);

registerTitle('Displays');


registerCircuit('colored LEDs', `

   0 1 2 3 4 5 6 7
   l l l l l l l l   >L<
   ^ ^ ^ ^ ^ ^ ^ ^   |^|
   | | | | | | | |   |||
   s s s s s s s s   sss


  >L< >L[ >L< >L[ ]L< ]L[ ]L< ]L[
  *^* *^* *m* *m* *^* *^* *m* *m*
   |   |   |   |   |   |   |   |
   s   s   s   s   s   s   s   s
`);




registerCircuit('colored LEDs wave', `
   R--*>c>c>c--->l0
   1  *]c>c>c--->l1
      *>c]c>c--->l2
      *]c]c>c--->l3
      *>c>c]c--->l4
      *]c>c]c--->l5
      *>c]c]c--->l6
      *]c]c]c--->l7
`);


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
     ||Z ^-++*+]o#*||              BBbBBBB "9"             BBbBBBB "9"
     ||z-v-+++*-z  ||                 ^^^^                 BBBbBBB "A"
     ||a[e<++*+>e-*||                 ||||                 BBBBBbb "b"
     ||v v ||||   v||                 ||||                 bBBBbbB "C"
     ||o<a[+*++-->A*|                 ssss                 BbBBBBb "d"
     |A<   ||||   m |                                      BBBBbbB "E"
     |ZZ---*+++-w-* |                "8421"                BBBbbbB "F"
     *-A<E<++*+]A---*                                         ^^^^
       ^ z |||| ^                                             ||||
       | Z-+*++>e                                             ||||
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

`);


registerCircuit('Hello World terminal', `

    TTTTTTT<**************************
    TTTTTTT                          *
    TTTTTTT                          *
    TTTTTTT                          *
    ^^^^^^^                          *
    |||||||                          *
    bBbbbbB<-----------------------* *
    BBbbBbb<---------------------* * *
    BBbBBbb<-------------------* * * *
    BBBbbBb<-----------------* * * * *
    BBbBBBB<---------------* * * * * *
    BBBbBBB<-------------* * * * * * *
    bBbbbbb<-----------* * * * * * * *
    BBbBBBB<---------* * * * * * * * *
    BBbBBbb<-------* * * * * * * * * *
    BBbBBbb<-----* * * * * * * * * * *
    BBbbBbB<---* * * * * * * * * * * *
    BbbBbbb<-* * * * * * * * * * * * *
             * * * * * * * * * * * * *
           **+*+*+*+*+*+*+*+*+*+*+** *
           * * * * * * * * * * * * * *
           *>d>d>d>d>d>d>d>d>d>d>d>d *
             C c c c c c c c c c c c *
             ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ *
             ************************R

`, 'hello_world');


registerCircuit('Keyboard and screen', `

0"The keyboard text typed fast at the bottom will slowly be transfered to the screen"


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

`);


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

`);


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




`);


registerCircuit('register', `
0"A register can be made from a D flip-flop plus a mux. A D flip-flop is"
0"in fact sufficient to have a working memory unit useful as a register,"
0"but the addition of the mux allows to have an independent 'enable'"
0"flag that will *not* interfere with the clock signal (if you would"
0"try to AND an enable signal with the clock, then enabling it while"
0"the clock is high would cause a positive edge that should not be there)."
0"This is desirable because in a CPU you want registers to only be written"
0"to when specifically enabled, and you do not want turning on enable"
0"signals in between clock edges to mess up anything. The mux allows to"
0"feed back the registers output to its input while not write-enabled."


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

0"And then used as follows:

       llllllll
       ^^^^^^^^
"C"s-->iiiiiii8
"E"s-->iiiiiiii
       ^^^^^^^^
       ssssssss

`, 'register');


registerCircuit('serial-in, serial-out shift register', `

 "D"s**>d*>d*>d*>d*>d*>d*>d*>d**>l
        #  #  #  #  #  #  #  #
        c  c  c  c  c  c  c  c
        ^  ^  ^  ^  ^  ^  ^  ^
 "C"p*************************

`);


registerCircuit('serial-in, parallel-out shift register', `


        l  l  l  l  l  l  l  l
        ^  ^  ^  ^  ^  ^  ^  ^
 "D"s**>d*>d*>d*>d*>d*>d*>d*>d
        #  #  #  #  #  #  #  #
        c  c  c  c  c  c  c  c
        ^  ^  ^  ^  ^  ^  ^  ^
 "C"p*************************

`);


registerCircuit('parallel-in, serial-out shift register', `


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

`);

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

`);

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


0"8-to-3 priority encoder, made from 2 4-to-2 priority encoders plus"
0"glue logic"

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




0"8-to-3 priority encoder, made from 5 4-to-2 priority encoders (the 5th
0"is at the top) plus glue logic. Also has 'disable' input and ouptut"
0"which allow making larger ones out of this."

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

0"BCD is a method of representing decimal numbers with 4 bits per"
0"decimal digit (0-9)."

0"This circuit converts a 8-bit binary number (0-255) into three"
0"decimal digits."

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

0"For 8-bit: 8 layers of add-3 modules. Not all are present since not"
0"all input values have the ability to go above 5"

0"The ROM with B's is to turn the 4-bit decimal digits into the"
0"segments for the 7-segment display."

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

0"The output here only goes to 255, so if you try to give larger input it'll overflow"

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

`);


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
        ||| *z  ||| *z  ||| *z     |
        ++*-+cd<++*-+cd<++*-+cd<--*|
        ||  |   ||  |   ||  |     ||
        +*--+cd<+*--+cd<+*--+cd<-*||
        |   *z  |   *z  |   *z   |||
        *---+cd<*---+cd<*---+cd<*|||
            |       |       |   ||||
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



`, 'keypad');


registerTitle('Quantum Gates');

registerCircuit('Fredkin gate', `

0"The Fredkin gate is a reversible gate: every unique input has a unique output"
0"It is also known as the controlled swap gate"

"c"s**************>l 0"c"
           *
"a"s*******+>e****>l 0"(a AND NOT c) OR (b AND c)"
         v v ^
"b"s****>e>a**>e**>l 0"(b AND NOT c) OR (a AND c)"
       *       ^
       *********

"a"s********>e****>l 0"(a AND NOT c) OR (b AND c)"
         *   ^
"c"s*****+***+****>l 0"c"
         v v *
"b"s****>e>a**>e**>l 0"(b AND NOT c) OR (a AND c)"
       *       ^
       *********

0"The essense of the design here is a wire crossing with 3 XORs, but then"
0"with an AND gate in the middle controlled by the control gate."

0"wire crossing:"

s**>e**>l
  v ^
  e**
  ^ v
s**>e**>l

0"control the AND gate (here implicitely in the middle switch, which only goes on when also its input is on)"
0"to enable/disable the crossing:"

    s
    *
s***+>e**>l
  v v ^
  e>a**
  ^   v
s****>e**>l

0"Of course if no XOR gates are available, the AND/NOT/OR expressions given at the output labels above"
0"can be used instead (requires 4 ands, 2 ors and an invertor)."

0"The Fredkin gate can make all regular gates, but there are 'garbage' input and output signals to support the reversibility"

"AND"

"a"s**************>l2
           *
"a"s*******+>e****>l2
         v v ^
"0"c****>e>a**>e**>l 0"a and b"
       *       ^
       *********



"OR"

"a"s**************>l2
           *
"a"s*******+>e****>l 0"a or b"
         v v ^
"1"C****>e>a**>e**>l2
       *       ^
       *********


"NOT"

"a"s**************>l2
           *
"0"c*******+>e****>l2
         v v ^
"1"C****>e>a**>e**>l 0"not a"
       *       ^
       *********


"XOR, XNOR"

"a"s*************************>l2
                     *
"b"s*****************+*******>l2
           *         *
"0"c*******+>e*******+>e*****>l 0"a xor b"
         v v ^     v v ^
"1"C****>e>a**>e**>e>a**>e***>l 0"a xnor b"
       *       ^ *       ^
       ********* *********

"NAND"

"a"s****************************>l2
           *
"a"s*******+>e********>e********>l2
         v v ^     *   ^
"0"c****>e>a**>e***+***+********>l2
       *       ^   v v *
"1"C***+*******+**>e>a**>e******>l 0"a nand b"
       *       * *       ^
       ********* *********

"NOR"

"a"s****************************>l2
           *
"1"C*******+>e********>e********>l 0"a nor b"
         v v ^     *   ^
"b"s****>e>a**>e***+***+********>l2
       *       ^   v v *
"0"c***+*******+**>e>a**>e******>l2
       *       * *       ^
       ********* *********


0"Full Adder"


"a"s******************************************************>l2
           *
"b"s*******+**********************************************>l2
           *         *                             *
"c"s*******+*********+********************>e*******+>e****>l 0"carry"
           *         *         *       *   ^     * * ^
"0"c*******+>e*******+>e*******+>e*****+***+*****+*+*+****>l 0"sum"
         v v ^     v v ^     v v ^     v v *     v v *
"1"C****>e>a**>e**>e>a**>e**>e>a**>e**>e>a**>e**>e>a**>e**>l2
       *       ^ *       ^ *       ^ *       ^ *       ^
       ********* ********* ********* ********* *********

`, 'fredkin');


registerCircuit('Toffoli gate', `

0"The Toffoli gate is a reversible gate: every unique input has a unique output"
0"It is also known as the controlled controlled not gate (CCNOT)"
0"If both a and b are true, c gets inverted, else all outputs are the same as the inputs"

"a"s***********>l"a"
        *
"b"s****+******>l"b"
       vv
"c"s*** a>e****>l"(a AND b) XOR c"
      *   ^
      *****




0"It can make all regular gates, but there are 'garbage' input and output signals to support the reversibility"

"NOT"

"1"C***********>l2
        *
"1"C****+******>l2
       vv
"a"s*** a>e****>l"NOT a"
      *   ^
      *****


"AND"

"a"s***********>l2
        *
"b"s****+******>l2
       vv
"0"c*** a>e****>l"a AND b"
      *   ^
      *****



"NAND"

"q"s***********>l2
        *
"b"s****+******>l2
       vv
"1"c*** a>e****>l"a NAND b"
      *   ^
      *****


"XOR"

"a"s***********>l2
        *
"1"C****+******>l2
       vv
"b"s*** a>e****>l"a XOR b"
      *   ^
      *****

0"one garbage signal of XOR removed with a loop-back to an input:"
0"(similar can be done with XNOR, OR, NOR, NOT, but not shown there)

    ***********
    *         *
    **********+**>l2
        *     *
"a"s****+******
       vv
"b"s*** a>e******>l"a XOR b"
      *   ^
      *****



"XNOR"

"1"C****************>l2
              *
"a"s**********+*****>l2
        *     *
"1"C****+*****+*****>l2
       vv    vv
"b"s*** a>e** a>e***>l"a XNOR b"
      *   ^ *   ^
      ***** *****

"OR"

"a"s******************>l2
        *       *
"b"s****+*** ***+*****>l2
       vv   x  vv
"1"C*** a>e* ** a>e***>l"a OR b"
      *   ^   *   ^
      *****   *****


"NOR"

0"(TODO: verify if there is no way with 2 gates)"

"a"s******** ******** ********>l2
            x       * *
"b"s******** *******-X-*******>l2
        *       *   * *  *
"1"C****+*******+**** ***+****>l2
       vv      vv       vv
"1"C*** a>e**** a>e***** a>e**>l"a NOR b"
      *   ^   *   ^    *   ^
      *****   *****    *****

`, 'toffoli');





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


  **>A***
  *  ^  *
s*+***v v
  *   A>A>A>A***>l  "majority"
s*+***^     ^
  *  v      *
s***>A*******

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

    *****v
    *    A**
s****v   ^ v
     A**** A****>l
s****^ * v ^
    *  * A**
    ***+*^
       *
       ***>A****>l


0"full adder"

    *****v   ******v
    *    A** * *   A**
s****v   ^ v * v   ^ v
     A**** A** A**** A*****>l
s****^ * v ^   ^ * v ^
    *  * A**   * * A**
    ***+*^     **+*^
       *       * *
s******+******** *
       *         v
       *********>A*********>l




`, 'nand_logic_2');

registerCircuit('NAND logic III: no wire crossings', `

0"Here we make circuits only from NAND, and without any wire crossings"
0"either. So purely NAND in 2-dimensional plane (because a wire crossing"
0"is in fact 3-dimensional). Of course there is the 10-NAND wire crossing"
0"and sometimes it will have to be used, but for most circuits below"
0"more minimal solutions were found."


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

0"Note that in electron mode, there are some flickering garbage signals"
0"in the wire crossing due to different path lengths. This is never fixable"
0"with NAND gates. This can only be fixed with buffers (delays)."
0"We can use LEDs as such buffers (after all, we're allowed to use l,"
0"but not o which you'd normally use for that). The longest path goes"
0"through 5 gates, so LEDs are added such that every possible path from"
0"input to output is 5 devices long."

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


registerCircuit('Relay Logic', `

0"Here, we simulate different types of relays, and build logic gates out"
0"of them."

0"What is a relay? It's a controlled switch. Optical versions exist, but the typical original version works"
0"electromagnetically: It has is a coil and a mechanical switch. When you send current through the coil,"
0"it becomes magnetic and attracts the switch. The switch, due to that, moves to close a contact. This makes"
0"a connection between two terminal wires available at the relay. The magnetic (or optical) action ensures"
0"there is no electrical contact between the electric circuit used to control the coil and the electric"
0"circuit that goes through the switch. This isolation is very useful because it allows for example to control"
0"a high power circuit safely with a low power electronic switch. Since they are controlled switches, relays can"
0"also be used to make logic circuits."
0"The relay described above was a simple controlled switch that was open or closed, and that is called an SPST relay."
0"You can also make the switch connect to a different contact in both of its states. Then you have a SPDT relay. You can"
0"also make the magnet control two (or more) independent switches. That gives a DPST or DPDT relay, or 4PDT etc..."

0"Important note about the simulation!"
0"------------------------------------"

0"Relays actually require physical things that LogicEmu cannot simulate."
0"There are multiple different things we cannot simulate, but there are workarounds as described."
0"*) the decoupling: Real relays physically decouple the 'coil' input from the switch,"
0"   magnetically or optically. Here we'll just implement it as connected switches instead."
0"   It has no real effect on the logic gates we make from the relays and we'll hide them in ICs anyway."
0"*) 'open' switch state: LogicEmu does not support switches with regular two-directional wires."
0"   Everything in the simulation is always uni-directional, like diodes. So the simulation can simulate"
0"   a transistor, but it cannot simulate a controlled switch that has an open/closed state. And relays happen to be such"
0"   controlled switches. The workaround is: for many relays defined below as IC templates, we make two versions:"
0"   one for one direction, and another for the reversed direction (having the relay 180 degrees rotated)."
0"*) tri-state logic: the open state of the relay switch creates a 'floating' state, the third"
0"   state of tri-state logic. LogicEmu only supports two-state logic (0 and 1), but offers the 'V'"
0"   device to simulate tristate buffers and to simulate multiple things outputting to the same wire. So"
0"   'V' is used a lot in the circuits below. In real life, any V with two inputs is either a"
0"   tristate buffer or a mechanical controlled switch, and any V with one input can be completely removed"
0"   (but removing it in the simulation would give 'multiple devices outputting to same wire' error)."
0"   In the simulation, any V with multiple inputs acts as an AND, and any V's that output to the same wire"
0"   act as OR. We could have implemented them with 'a' and 'o' in fact, but using the V's makes it more"
0"   explicit what we're doing here, it's purely a notational thing. Do read the 'Full Help' for more about"
0"   the V's if that was not clear, it's somewhat important to understand the circuits below. The V's are"
0"   basically our poor man's tristate workaround."
0"*) fully closed circuits: In real life, the relay's coil is activated with current, which requires two"
0"   endpoints of the coil connected to a wire. In this simulation, voltage/current sources are not present"
0"   since they are implicit. Because as you know in LogicEmu a switch to a LED looks like this: 's-->l',"
0"   but in real life of course that electrical circuit must be closed, so implicitely there is a power"
0"   supply between the switch and the LED. Similarly, in the simulation, we give only a single wire to"
0"   the coil input of the relays. Just remember in real life there are two and there needs to be a voltage"
0"   difference between them and current flowing to operate the coil."


0"All relays are defined as IC templates below, so they can be used more compactly. The naming of IC's"
0"is a vertical number. The first digit is the amount of inputs (other than the coil), the second is the"
0"amount of outputs. So for example i12 is a relay with 1 input (plus additionally the coil input) and 2 outputs,"
0"in other words an 'SPDT' relay. And i21 is that same relay flipped around (the workdaround described above)."

0"SPST (NO) relay"
0"---------------"

   Is
   1*
   1v
s**>V****>l

0"The SPST (NO) relay (single pole, single throw, normally open) is a simple"
0"controlled switch. The top input is the coil input."
0"The left input is the input to the switch being controlled and the right is the switches output. In real"
0"life, this relay has 4 terminals instead of 3 since you need two wires to send current through the coil."
0"But as described above, this simulation makes that implicit."

0"It may seem as if the above relay is basically just an AND gate of the two"
0"switches, and maybe in the limited simulation here it is, but in practice"
0"there's a big difference between the top input, and the other two terminals"
0"which can connect any two things in any direction at any voltage, so"
0"mentally treating it that way helps to understand real relays and"
0"appreciate the below circuits better."


0"SPST (NC) relay"
0"---------------"

0"The 'normally closed' SPST relay is similar, but the switch is wired such that"
0"it makes contact by default, and when the coil is active it does not make contact"

   Is
   1*
   9w
s**>V****>l

0"NOTE: the IC id of this one breaks the rule of using #inputs, #outputs in the name."
0"The 9 represents the fact that it's an inverted output (9 being decimal complement of -1)"


0"SPDT relay"  0"SPDT relay flipped around"
0"----------"  0"-------------------------"

   Is                     Is
   1*                     2*
   2***                   1***
    v *                    v *
  *>V*+**>l            s**>V*+**
  *   *                      * *
s**   *                      * *>l
  *   w                      w *
  ***>V**>l            s****>V**

0"The SPDT relay (single pole, double throw) is very similar to the SPST relay, except"
0"the switch will also connect to a contact when in the 'off' position of the SPST relay."
0"It is in fact an NO and an NC SPST with shared coil."

0"So now the coil will connect the common contact to either one, or the other, contact"
0"on the other side. It acts like a MUX or a DEMUX (depending on which side you use as input)

0"Remember that we need to define two IC's here because the simulation requires an"
0"input/output direction, but in real life this is the same relay flipped around."


0"DPDT relay"  0"DPDT relay flipped around"   0"DPDT relay one side flipped"
0"----------"  0"-------------------------"   0"---------------------------"

   Is                     Is                         Is
   2*                     4*                         3*
   4***                   2***                       3***
    v *                    v *                        v *
  *>V*+**>l            s**>V*+**                    *>V*+**>l
  *   *                      * *                    *   *
s** ***                    *** *>l                s** ***
  * * w                    * w *                    * * w
  **+>V**>l            s***+>V**                    **+>V**>l
    *                      *                          *
    ***                    ***                        ***
    v *                    v *                        v *
  *>V*+**>l            s**>V*+**                    **V<+***s
  *   *                      * *                    *   *
s**   *                      * *>l                l<*   *
  *   w                      w *                    *   w
  ***>V**>l            s****>V**                    ****V<**s

0"The DPDT relay (double pole, double throw) is in fact two SPDT relays controlled by"
0"the same coil."


0"4PDT relay"  0"4PDT relay flipped around"
0"----------"  0"-------------------------"

     s I                  s I
    ***4                 ***8
    v *8                 v *4
 *->V-+-->l           s->V-+-*
s*  %-w                  %-w *>l
 *--+>V-->l           s--+>V-*
    v-&                  v-&
 *->V-+-->l           s->V-+-*
s*  %-w                  %-w *>l
 *--+>V-->l           s--+>V-*
    v-&                  v-&
 *->V-+-->l           s->V-+-*
s*  %-w                  %-w *>l
 *--+>V-->l           s--+>V-*
    v-&                  v-&
 *->V-+-->l           s->V-+-*
s*    w                    w *>l
 *--->V-->l           s--->V-*



0"The 4PDT relay (double pole, double throw) is in fact four SPDT relays controlled by"
0"the same coil."

0"DPST (NO) relay"
0"---------------"

      s
      ***
      v *
  s**>V*+**>lI
        *    2
      ***    2
      v
  s**>V****>l

0"The DPST (normally open) relay is two SPST relays to a single coil."

0"DPST (NC) relay"
0"---------------"

      s
      ***
      w *
  s**>V*+**>lI
        *    2
      ***    8
      w
  s**>V****>l

0"The DPST (normally closed) relay is two SPST relays to a single coil."


0"Note: The SPST, SPDT, DPST, 4PDT, ... naming is also used for regular"
0"(human controlled) switches and pushbuttons, not only for relays. The 's' switch of"
0"LogicEmu is not directly one of those, as it's abstracted away which"
0"physical build is used for it (it doesn't even have two poles in Logicemu),"
0"the 's' of LogicEmu could be an SPST with a pullup or pulldown resistor, or"
0"it could be an SPDT that can toggle between ground and positive voltage."

0"Trying out the IC instances"
0"---------------------------"

   s         s
   v         v
   i         i
 s>1>l     s>1>l
   1         9

   s         s             s         s
   v         v             v         v
   i>l     s>i             i>l     s>i
 s>1         2>l         s>i         i>l
   2>l     s>1             i>l     s>i
                           i         i
                           i>l     s>i
   s         s           s>i         i>l
   v         v             i>l     s>i
   i>l     s>i             i         i
 s>i         i>l           i>l     s>i
   i>l     s>i           s>i         i>l
   i         i             i>l     s>i
   i>l     s>i             i         i
 s>2         4>l           i>l     s>i
   4>l     s>2           s>4         8>l
                           8>l     s>4

   s         s
   v         v
 s>i>l     s>i>l
   2         2
 s>2>l     s>8>l


0"Making logic gates from relays"
0"------------------------------"

0"To make logic gates from relays, we control the coils (the top inputs) with the gate"
0"input signals. The inputs from the left are passing through the constant '1' from the"
0"left. Because when making logic gates with relays, the goal is actually to open/close"
0"a switch network made from all the relays, controlled by their coils."

0"So in the circuits below, usually the gate inputs are at the top and the outputs to the right."

0"The minimal possible relay type is used everywhere below. In real life, if you want"
0"to make such gates from a bunch of relays, it's likely you got a bunch of relays of all the same type,"
0"That's usually fine, almost all the below circuits can be trivially be replaced with only"
0"SPDT relays or only DPDT relays."
0"If you have only SPDT's, DPDT can be made from two of them. If you have only DPDT's, an SPDT can be"
0"made by not using some inputs/outputs."
0"If you have only SPST (NO) relays, many gates below are not easily implementable."
0"You can make an SPDT from two SPST's plus an invertor so you then need a way to make that invertor,"
0"or use a normally open (NO) and a normally closed (NC) SPST if you have both types."

0"AND gate"
0"--------"

0"An AND gate can be made with relays in series"

  s   s
  v   v
  i   i
C>1**>1**>l
  1   1

0"This is a two-input AND gate: only if the two coils are activates, will"
0"the constant signal be able to pass through the LED (or in real life,"
0"will the circuit containing the LED and a here hidden power supply be"
0"closed)"

0"Multi-input AND gate"
0"--------------------"

  s s s s
  v v v v
  i i i i
C>1>1>1>1>l
  1 1 1 1

0"OR gate"
0"-------"

0"An OR gate can be made with relays in parallel"

      s     s
      *     *
C*****+**** *
    * v   * v
    * i   * i
    *>1** *>1**
      1 *   1 *
        v     v
        V     V
        *************>l

0"NOTE: remember those two V's on the bottom are not needed in real life. It's"
0"just there due to a limitation of the simulation. The wires are connected, either"
0"relay being closed will connect the power source and the LED"

0"Multi-input OR gate"
0"-------------------"

      s     s     s     s
      *     *     *     *
C*****+*****+*****+*****+*********
    * v   * v   * v   * v
    * i   * i   * i   * i
    *>1** *>1** *>1** *>1**
      1 *   1 *   1 *   1 *
        v     v     v     v
        V     V     V     V
   ******************************>l

0"XOR gate"
0"--------"

0"A XOR gate can be made from two SPDT relays, one flipped compared to"
0"the other and the wires crossed. This way, toggling one relay crosses"
0"the signal in such a way that it connects from one output of the first"
0"to a connected output of the other, but enabling both or no relays makes the"
0"connection mismatch."

0"This is similar to how a light in a home controlled by two classical wall switches works."
0"Light switches in a room typically also behave like XOR, since that is the way you can get"
0"each switch to function to toggle the light on and off."

    s   s
    v   v
    i* >i
C**>1 x 2**>l
    2* >1

0"Multi-input XOR gate"
0"--------------------"

0"Note that multi-input XOR gate works like parity (even/odd) gate, not"
0"as one-hot (exactly one input) detector."

0"This works once again like wall switches for lights in homes, for rooms"
0"that have more than two wall switches. All the inner switches use a DPDT"
0"to emulate a '4-way' home switch that crosses wires based on the signal,"
0"and the two outer switches use the simpler SPDT's to emulate '3-way' home"
0"switches. A wire crossing at the end is needed only if there's an even"
0"amount of switches (at least in the configuration used here)."

0"Each inner relay will either swap or not swap two inputs, only if the"
0"correct amount of swaps happens, the output will go on."

    s     s     s
    v     v     v
    i****>i****>i
C**>1 *   i     2**>l
    2*+**>i****>1
      * * i
      * *>i
      *   4
      ***>2

    s     s     s     s
    v     v     v     v
    i****>i****>i** *>i
C**>1 *   i *   i  x  2**>l
    2*+**>i*+**>i** *>1
      * * i * * i
      * *>i * *>i
      *   4 *   4
      ***>2 ***>2


0"NOT gate"
0"--------"

0"A NOT gate can be made with an SPDT (NC) relay: since it's"
0"closed by default, but open if there's signal, it is an inverter:"

    s
    v
    i
C**>1**>l
    9

0"It can be made easily with an SPDT as well:"

    s
    v
    i**
C**>1
    2**>l

0"Two NOT gates"
0"-------------"

0"Two NOT gates in a row cancel each other out, but this shows how to connect multiple"
0"to show that both need a power source input."

    s
    *
    *
    * *****
    v *   v
    i *   i
  *>1 * *>1
  * 9** * 9**>l
  *     *
C********

0"NAND gate"
0"---------"

0"One way to make NAND is like the AND above and an extra invertor behind"
0"it, but that would cost three relays."

0"To make the NAND gate with two relays, the configuration of the OR gate"
0"is used, but with the inputs inverted (by Morgan's law, this turns"
0"OR into NAND), by using 'normally closed' SPST relays (or alternatively two"
0"SPDT relays with the inverted output chosen)."

      s     s
      *     *
C*****+**** *
    * v   * v
    * i   * i
    *>1   *>1
      9**   9**
        v     v
        V     V
        *************>l

0"Multi-input NAND gate"
0"---------------------"

      s     s     s     s
      *     *     *     *
C*****+*****+*****+*****+*********
    * v   * v   * v   * v
    * i   * i   * i   * i
    *>1** *>1** *>1** *>1**
      9 *   9 *   9 *   9 *
        v     v     v     v
        V     V     V     V
   ******************************>l

0"NOR gate"
0"--------"

0"One way to make NOR is like the NOR above and an extra invertor behind"
0"it, but that would cost three relays."

0"To make the NOR gate with two relays, the configuration of the AND gate"
0"is used, but with the inputs inverted (by Morgan's law, this turns"
0"AND into NOR), by using 'normally closed' SPST relays (or alternatively two"
0"SPDT relays with the inverted output chosen)."

  s   s
  v   v
  i   i
C>1**>1**>l
  9   9

0"Multi-input NOR gate"
0"--------------------"

  s s s s
  v v v v
  i i i i
C>1>1>1>1**>l
  9 9 9 9


0"XNOR gate"
0"---------"

0"An XNOR gate can be made like the XOR gate, but with the wires going straight"
0"instead of crossed:"

    s   s
    v   v
    i**>i
C**>1   2**>l
    2**>1

0"Multi-input XNOR gate"
0"---------------------"

0"Note that multi-input XNOR works like parity (even/odd) gate, not like"
0"'all inputs are equal' detector."

0"This works the same as the multi-input XOR gate, except the wire crossing"
0"at the end is added in the opposite cases:"

    s     s     s
    v     v     v
    i****>i** *>i
C**>1 *   i  x  2**>l
    2*+**>i** *>1
      * * i
      * *>i
      *   4
      ***>2

    s     s     s     s
    v     v     v     v
    i****>i****>i****>i
C**>1 *   i *   i     2**>l
    2*+**>i*+**>i****>1
      * * i * * i
      * *>i * *>i
      *   4 *   4
      ***>2 ***>2

0"Other Contraptions"
0"------------------"

0"Above were all single logic gates. Now follow more complex contraptions."

0"Half adder"
0"----------"

0"A half adder is an AND gate and a XOR gate. With two DPDT relays, both"
0"gates according to the principles from above can be combined. The XOR"
0"wires going in the other side looks awkward but it's needed because"
0"the XOR needs the second relay mirrored, the AND does not."


     s        s
     *        *
     v        v
     i*****   i*******>l"AND"
C***>i    ***>i
   * i**      i**
   * i        i
   * i****    i<****
   *>2   *  **3    *
     4** *  * 3<** *
       * *  *    * *
       * ***+***** *
       *    *      *
       *****+*******
            *
            **********>l"XOR"

0"There are a few extra loose outputs available, for in case they would"
0"be useful. The left one outputs the inverse of the first input. The"
0"right one is a NIMPLY gate."

0"flip-flop: SR latch"
0"-------------------"

0"S sets the latch, R resets it. It remembers its state when S and"
0"R are off."

       "R" "S"

        s   s
        *   *
        *   v
        *   V
        *   *V<*
        v   v  *
        i   i***
    C**>1**>i
      * 9   i**
      *     i
      *     i*********>l"Q"
      *****>2
            4*********>l"Q'"

0"The first relay acts as an inverter for the first switch. So it's only"
0"the second relay that is the essense of the latch. The set switch"
0"enables its coil, and makes it go on thanks to the power from the"
0"inverted R input. It then stays on thanks to the loop back of its output to"
0"its own coil. When pressing the reset switch, since it's inverted this"
0"disables the power input to the core relay, and turns off the latch."
0"The main relay is a DPDT, so it's possible to use the second circuit for the external"
0"outputs (rather than sharing the output that drives its coil), including an inverted Q'."


0"In real life, it is also possible to let the coil of the main relay be"
0"connected to the ground through the reset relay and to the positive"
0"voltage through this relay itself. Then resetting happens by"
0"disconnecting it from the ground. But we cannot simulate it here since"
0"the simulation doesn't have two terminals for the coil and no way to distinguish"
0"the disconnected and ground states."


0"Fredkin gate"
0"------------"

0"The DPDT relay configured as 4-way switch is in fact a controlled swap gate."
0"The top input controls whether the two other inputs swap."
0"That is the Fredkin gate, a reversible quantum gate. So all logic gates can"
0"also made from this relay as shown in a different circuit schematic included"
0"in LogicEmu, titled 'Fredkin Gate'."

   s**************>l
          v
     ****>i
     *    i
   s*+***>i*******>l
     * *  i
     * **>i
     *    4
   s*****>2*******>l

0"Demultiplexer"
0"-------------"

0"A SPDT relay is a 1:2 demultiplexer. The top switch selects to which of the"
0"two outputs the input switch goes."

    s
    v
    i**>l
s**>1
    2**>l

0"A 1:4 demultiplexer, allowing to choose between 4 outputs with 2 control"
0"inputs, can be made as follows:"

    s s
    * *
    * v
    * i**>l
    v i
    i>i**>l
s**>1 i
    2>i**>l
      2
      4**>l

0"A 1:8 demultiplexer, allowing to choose between 8 outputs with 3 control"
0"inputs, can be made as follows:"

    s s s
    * * *
    * * v
    * * i**>l
    * * i
    * * i**>l
    * v i
    * i>i**>l
    v i i
    i>i>i**>l
s**>1 i i
    2>i>i**>l
      2 i
      4>i**>l
        i
        i**>l
        4
        8**>l

0"Multiplexer"
0"-----------"

0"A SPDT relay is a 2:1 multiplexer. The top switch selects which of the"
0"left two input switches go to the output."

    s
    v
s**>i
    2**>l
s**>1

0"A 4:1 multiplexer, allowing to choose between 4 switches with 2 control"
0"inputs, can be made as follows:"

    s s
    v *
s**>i *
    i v
s**>i>i
    i 2**>l
s**>i>1
    4
s**>2

0"The 4:1 multiplexer can also be used as a programmable logic gate, which you"
0"can program to behave like any of the 16 possible 2-input logic gates using"
0"the 4 switches on the left. E.g. to make an AND gate, set the top switch on"
0"and the other three off. To make an OR gate, turn the bottom switch off and"
0"the other 3 on. So that's yet another way to make logic gates with relays."

0"A 8:1 multiplexer:"


    s s s
    * * *
    v * *
s**>i * *
    i * *
s**>i * *
    i v *
s**>i>i *
    i i v
s**>i>i>i
    i i 2**>l
s**>i>i>1
    i 4
s**>i>2
    i
s**>i
    8
s**>4



0"RENDER:graphical"
0"MODE:sequential"
`, 'relay_logic');

registerCircuit('mirror bits', `
     l l l l l l l l      llllllll
     ^ ^ ^ ^ ^ ^ ^ ^      ^^^^^^^^
     * * * * * * * *      ||||||||
     *  x   x   x  *      ||||||||
     * * * * * * * *      76543210
      x   x   x   x       yyyyyyyy
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
`);


registerCircuit('shuffle & unshuffle bits', `

0"Shuffle is a particular bit permutation"

     l l l l l l l l      llllllll
     ^ ^ ^ ^ ^ ^ ^ ^      ^^^^^^^^
     * * * * * * * *      ||||||||
     *  x   x   x  *      ||||||||
     * * * * * * * *      04152637
     * *  x   x  * *      yyyyyyyy
     * * * * * * * *      01234567
     * * *  x  * * *      ||||||||
     * * * * * * * *      ||||||||
     s s s s s s s s      ssssssss

     l l l l l l l l      llllllll
     ^ ^ ^ ^ ^ ^ ^ ^      ^^^^^^^^
     * * * * * * * *      ||||||||
     * * *  x  * * *      ||||||||
     * * * * * * * *      02461357
     * *  x   x  * *      yyyyyyyy
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

0"The bit sorter sorts the input bits by value, putting all 0's left and all 1's right"


0"slowest even if it looks small. Use electron mode to see speed difference"
0"Note the single input gates on the sides, they are just buffers to make all path lengths the same."


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

0"4-but majority gate"

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

`);


registerCircuit('population count', `

0"The population count circuit outputs in binary how many inputs bits are one."
0"They can be made from half and full adders, with corresponding bits criss-cross connected to next layers."
0"For example, the 2-bit population is a half adder, 3-bit population count is a full adder, and the higher"
0"ones use more and more adders. Those circuits are not guaranteed to be optimal."


     "1"
      l
      ^
      s  "1-bit popcount: trivial"


     "2 1"
      l l
      ^ ^
      a e
      ^^^
      s s "2-bit popcount: half adder"


     "2   1"
      l   l
      ^   ^
      o<a e
      ^ ^^^
      a e *
      ^^^ *
      s s s "3-bit popcount: full adder"


     "4 2   1"
      l l   l
      ^ ^   ^
      a e<a e
      ^^^ ^^^
      * * * *
      *  x  *
      a e a e
      ^^^ ^^^
      s s s s "4-bit popcount"


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
      s s s s s "5-bit popcount"


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
      s s s s s s "6-bit popcount"


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
      s s s s s s s "7-bit popcount"


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
      s s s s s s s s "8-bit popcount"


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
      s s s s s s s s s  "9-bit popcount"

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

`);


registerTitle('Cellular Automata');


registerCircuit('Conway\'s game of life single cell', `

0"A single cell of Conway's game of life. If the clock is activated,"
0"it will go on if it has 3 neighbors, stay on if it was on and has 2 neighbors,"
0"go off in all other cases. The neighbors here are the small switches on the sides"

0"Internally, half and full adders are used for population count to do that computation."

0"For compactness, a wire bus from all inputs to the core is used."

                         s
            |           ||         |
          yy8yyyyyyyyyyy80yyyyyyyyy8yy
          y                          y
          y           ###"clk"       y
          y           ###            y
        s-7           ##p-->c<*      1-s
          y *----]a------>a>d *      y
          y *     ^       ^ t<*p#    y
          y o<a e>e<o<a e>o<*  ##    y
          y ^ ^^^   ^ ^^^   * "tgl"  y
          y a e *   a e *   *        y
          y ^^^ *   ^^^ *   *        y
          y * * ** ** * *** *        y
        s-6 * *   x   *   * *        8-
         -8 * * ** ** *   * *        2-s
          y *  x     x    * *        y
          y a e o<a e o<a e *        y
          y ^^^ ^ ^^^ ^ ^^^ *        y
          y * * a e * a e * * ###### y
          y * * ^^^ * ^^^ * * ###### y
          y * * * * * * * * * ###### y
          yy0y1y2y3y4y5y6y7y8>l##### y
          y                   ###### y
        s-5                   ###### 3-s
          y                          y
          y                          y
          y                          y
          yy8yyyyyyyyyyy48yyyyyyyyy8yy
            |           ||         |
                        s

`);


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


          l           ls          l
           h          ^|         h
       s    *         ||        *    s          l
        ; yy8yyyyyyyyy80yyyyyyyy8yy /      ls   ^   sl
         *7                       1*        h;  |s /h
          y             g-->c<*s  y          ;h |vh/
          y *----]a------>a>d |   y           i####
          y |     ^       ^ t<*   y           #   #<--s
          y o<a e>e<o<a e>o<*     y         s>#   #-->l
          y ^ ^^^   ^ ^^^   |     y       l<--#>l #<s
          y a e *   a e *   |     y           #   #
          y ^^^ |   ^^^ |   |     y          /#####;
       s--6 0 2 4   1 3 5   |     8->l      hh  ^| hh
       l<-8 yyyyyyyyyyyyyyy |     2--s     l/   s|  ;l
          y 0 1 2   3 4   5 |     y        s     v   s
          y a e o<a e o<a e |     y              l
          y ^^^ ^ ^^^ ^ ^^^ |     y
          y * * a e * a e * |     y
          y | | ^^^ | ^^^ | |     yI
          y | | * * | * * | |     y
          yy0y1y2y3y4y5y6y7y8>l   y
         *5                       3*
        / yy8yyyyyyyyy48yyyyyyyy8yy ;
       s    *         ||        *    s
           h          |v         h
          l           sl          l

`, 'game_of_life');

registerCircuit('Conway\'s game of life galaxy', `

   "tick" g    "autotick"
    p##-->o<-----##R2
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

          l           ls          l
           h          ^|         h
       s    *         ||        *    s          l
        ; yy8yyyyyyyyy80yyyyyyyy8yy /      ls   ^   sl
         *7                       1*        h;  |s /h
          y             g-->c<*s  y          ;h |vh/
          y *----]a------>a>d |   y           i####
          y |     ^       ^ t<*   y           #   #<--------o<sI1
          y o<a e>e<o<a e>o<*     y         s>#   #-->l     ^
          y ^ ^^^   ^ ^^^   |     y       l<--#>l #<s       e<
          y a e *   a e *   |     y           #   #         ^|
          y ^^^ |   ^^^ |   |     y          /#####;        d|
       s--6 0 2 4   1 3 5   |     8->l      hh  ^| hh       ^|
       l<-8 yyyyyyyyyyyyyyy |     2--s     l/   s|  ;l      d|
          y 0 1 2   3 4   5 |     y        s     v   s      ^|
          y a e o<a e o<a e |     y              l          a*
          y ^^^ ^ ^^^ ^ ^^^ |     y
          y * * a e * a e * |     y
          y | | ^^^ | ^^^ | |     yI
          y | | * * | * * | |     y
          yy0y1y2y3y4y5y6y7y8>l   y
         *5                       3*
        / yy8yyyyyyyyy48yyyyyyyy8yy ;
       s    *         ||        *    s
           h          |v         h
          l           sl          l

`, 'gol_galaxy');


registerCircuit('Conway\'s game of life wrap', `

   "tick" g    "autotick"
    p##-->o<-a<--s##
    ###      ^   ###
    ###      r4  ###



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



          l           ls          l
           h          ^|         h
       s    *         ||        *    s          l
        ; yy8yyyyyyyyy80yyyyyyyy8yy /      ls   ^   sl
         *7                       1*        h;  |s /h
          y             g-->c<*s  y          ;h |vh/
          y *----]a------>a>d |   y           i####
          y |     ^       ^ t<*   y           #   #<--s
          y o<a e>e<o<a e>o<*     y         s>#   #-->l
          y ^ ^^^   ^ ^^^   |     y       l<--#>l #<s
          y a e *   a e *   |     y           #   #
          y ^^^ |   ^^^ |   |     y          /#####;
       s--6 0 2 4   1 3 5   |     8->l      hh  ^| hh
       l<-8 yyyyyyyyyyyyyyy |     2--s     l/   s|  ;l
          y 0 1 2   3 4   5 |     y        s     v   s
          y a e o<a e o<a e |     y              l
          y ^^^ ^ ^^^ ^ ^^^ |     y
          y * * a e * a e * |     y
          y | | ^^^ | ^^^ | |     yI
          y | | * * | * * | |     y
          yy0y1y2y3y4y5y6y7y8>l   y
         *5                       3*
        / yy8yyyyyyyyy48yyyyyyyy8yy ;
       s    *         ||        *    s
           h          |v         h
          l           sl          l

`, 'gol_wrap');


registerCircuit('Conway\'s game of life ship', `

   "tick" g    "autotick"
    p##-->o<-----###
    ###          ##R1
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


          l           ls          l
           h          ^|         h
       s    *         ||        *    s          l
        ; yy8yyyyyyyyy80yyyyyyyy8yy /      ls   ^   sl
         *7                       1*        h;  |s /h
          y             g-->c<*s  y          ;h |vh/
          y *----]a------>a>d |   y           i####
          y |     ^       ^ t<*   y           #   #<--------o<sI1
          y o<a e>e<o<a e>o<*     y         s>#   #-->l     ^
          y ^ ^^^   ^ ^^^   |     y       l<--#>l #<s       e<
          y a e *   a e *   |     y           #   #         ^|
          y ^^^ |   ^^^ |   |     y          /#####;        d|
       s--6 0 2 4   1 3 5   |     8->l      hh  ^| hh       ^|
       l<-8 yyyyyyyyyyyyyyy |     2--s     l/   s|  ;l      d|
          y 0 1 2   3 4   5 |     y        s     v   s      ^|
          y a e o<a e o<a e |     y              l          a*
          y ^^^ ^ ^^^ ^ ^^^ |     y
          y * * a e * a e * |     y
          y | | ^^^ | ^^^ | |     yI
          y | | * * | * * | |     y
          yy0y1y2y3y4y5y6y7y8>l   y
         *5                       3*
        / yy8yyyyyyyyy48yyyyyyyy8yy ;
       s    *         ||        *    s
           h          |v         h
          l           sl          l

`, 'gol_ship');

registerCircuit('Langtons Ant', `
0"Langton's Ant"

0"This circuit is without clock, and only works in 'electron' mode, not in"
0"sequential mode. Make this clocked with global wire to make it work in"
0"sequential mode."

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

0"This circuit combines 4 4-bit CLA's to form a fast 16-bit adder."
0"Read the description of the 4-bit CLA first before this one."

0"An IC (I0) is used in the circuit at the bottom to define the 4-bit CLA. Then the IC is"
0"used 4 times (the boxes with i0) to get the 16-bit adder."

0"Note that the CLU logic (the logic with the large AND and OR gates) for the 16-bit unit"
0"is the exact same logic as the CLU logic in the 4-bit unit. We just replaced the"
0"1-bit full adders with 4-bit CLAs."

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
`, 'cla_adder_16');


registerCircuit('16-bit ripple vs lookahead speed comparison', `

0"MODE:electron (set to electron by default to show the gate delays)"

0"This circuit allows to compare the speed of the 16-bit ripple carry adder and 16-bit"
0"carry lookahead adder in electron mode. The input A has already been set to all ones to"
0"enable the case with longest carry propagation."
0"Just press the buttons marked 'CARRY' or alternatively the ones marked 'B1' (the first"
0"bit of B) (but not both at the same time) to see the rippling propagation in the first"
0"adder, and the faster update in the second adder"


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



@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



0"The circuit below is the chip-template for the 4-bit CLA used 4 times above. Using a chip has no effect on speed."
0"It does obscure some of the logic above from view but otherwise it would be too large to fit on a screen."

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

`, 'div16');


registerCircuit('32-bit divider', `

                                                                                                                                                                                 "r8  r4  r2  r1"
                                                            "q1"l l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l   l
                                                                m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
                                                                *>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>###>
                    l    lI4                              "q2"l &-i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<i4#<
                    ^    ^                                    m ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^-s"a1"
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
0"The once popular 74181 4-bit ALU. Check out its spec sheet for more information."

0"It supports 32 operations (of which many overlapping/similar/trivial ones)"

0"The m bit selects between two groups of 16 operations (mode): when m is low,"
0"the 16 different logic operations (0, AND, IMPLY, ...). When m is high,"
0"addition/subtraction operations, with various combinations of adding/subtracting"
0"A and B, subtracting 1 of the result (to add 1 use carry instead), and several"
0"that have A OR B, A AND B or bit-inverted versions as operands"

0"Bits s0-s3 select one of the 16 operations for the current m"

0"Bits a0-a3 are the first input, bits b0-b3 the second input."

0"Bits f0-f3 are the output"

0"The input c is carry in, the output c is carry out"

0"= is true when all output bits are true (when result of subtraction in active-low"
0"usage is zero)"

0"p = carry propagate, g = carry generate, used to combine multiple chips (including a separate"
0"carry lookahead chip) to make 8-bit and higher ALU. These are standard signals of carry"
0"lookahead adders, for more info on those see the included carry lookahead adder circuit from"
0"the dropdown."

0"You can interpret the inputs/outputs as either active low or active high"
0"and both cases work equally well (but the intended use is active-low,"
0"because = only works correct there)"
0"Both those views have a different table of operations, same ones but in different order."
0"They support all the same ones due to Morgan's law and similar symmetries (e.g. AND and OR wap for both tables)"

0"Some signals are active high in active low mode and vice versa. Here is the full list:"
0"When using in active-low mode: carry, m, s and = are active-HIGH. a, b, f, g, p are active-low"
0"When using in active-high mode: carry is active-LOW. All the rest is active-high."

0"The ' in the main circuit shows which are active-low. The ' is not repeated in the small instances below it."


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
 *   *   *   *       *         *       *   *       *         *       *   *       *         *     *   *       *         *
 *   *   *   * ******+*********+*******+***+*******+*********+*******+***+*******+*********+*****+***+*******+*********+**#s#"s0"
 *   *   *   * *     *         *       *   * *     *         *       *   * *     *         *     *   * *     *         *
 *   *   *   * * ****+*********+*******+***+*+*****+*********+*******+***+*+*****+*********+*****+***+*+*****+*********+**#s#"s1"
 *   *   *   * * *   *         *       *   * * *   *         *       *   * * *   *         *     *   * * *   *         *
 *   *   *   * * *   *   ******+*******+***+*+*+***+*********+*******+***+*+*+***+*********+*****+***+*+*+***+*********+**#s#"s2"
 *   *   *   * * *   *   *     *       *   * * *   *   *     *       *   * * *   *   *     *     *   * * *   *   *     *
 *   *   *   * * *   *   *     * ******+***+*+*+***+***+*****+*******+***+*+*+***+***+*****+*****+***+*+*+***+***+*****+**#s#"s3"
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
 *   *         *           *                 *         *                   *           *               *           *
 *   *         *           *                 *         *                   *           *               *           *
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
   *               *          *            *                         *                       *       *         *
   v               v          v            v                         v                       v       v         v
  #l#             #l#        #l#          #l#                       #l#                     #l#     #l#       #l#
  ###             ###        ###          ###                       ###                     ###     ###       ###
  ###             ###        ###          ###                       ###                     ###     ###       ###
 "F'0             F'1        A=B          F'2                       F'3                      G'    Cn+4        P'"


0"NOTE! The IC definition here is not the true pin-order of the physical chip! But it is how the official logic diagram"
0"is specified. The true pinout has 2x12 pins, has the inputs/outputs in a more mixed order, and has the voltage and ground pins."


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

0"Instance set up for doing XOR in active low, XNOR in active high"

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


registerCircuit('compact 0-255 display', `


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
                ^^^^^^^^               ^^^^^^^^               ^^^^^^^^
                ssssssss               ssssssss               ssssssss
               "....8421               ....8421               ....8421"



@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

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
 BBBBbbB          ^ ^ ^ ^ ^ ^ ^ ^ |8|
 BBBbbbB          | | | | | | | | |5|     v* v* l l l v* *v  v* v* l l l v* *v  v* v* l l l v* *v
    ^^^^          p | | i5##### | | |     l| l| ^ ^ ^ l x l  l| l| ^ ^ ^ l x l  l| l| ^ ^ ^ l x l
    ||||            | | ^ ^ ^ ^ | | |      |  | | | |  * *    |  | | | |  * *    |  | | | |  * *
    ||||            | | | | | | | | |   i87#######################################################I89
    ssss            | i5##### | | | |                                                     ^^^^^^^^
                    | ^ ^ ^ ^ | | | |                                                     ssssssss
                    | | | | | | | | |
                    i5##### | | | | |
                    ^ ^ ^ ^ | | | | |
                    p | | | | | | | |
                      s s s s s s s s

`);

registerCircuit('compact 0-65535 display', `

         #################################
         #|| v ||| v ||| v ||| v ||| v | #
         #|h#l#h|h#l#h|h#l#h|h#l#h|h#l#h #
         #|#   #|#   #|#   #|#   #|#   # #
         #|l   l|l   l|l   l|l   l|l   l #
         #|#   #|#   #|#   #|#   #|#   # #
         $&h#l# &h#l# &h#l# &h#l# &h#l#  #
         # #   # #   # #   # #   # #   # #
         # l   l l   l l   l l   l l   l #
         # #   # #   # #   # #   # #   # #
         # h#l#h h#l#h h#l#h h#l#h h#l#h #
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

`);



registerCircuit('16-bit adder with decimal IO', `

0"Binary 16-bit adder with decimal input and decimal output."

0"Decimal conversions done with the built-in terminal component. For true"
0"decimal conversion circuits from gates, see bcd/binary encoder/decoder circuits"
0"or the 'compact display' circuits"

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
  yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
  3322222222221111 1111110000000000
  1098765432109876 5432109876543210
  ssssssssssssssss ssssssssssssssss

`);



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
      v-aze           v-aZe              |^  ^/;^|                           ^ |  |
  l<--o ^+^--s    l<--o ^+m--s           |a<>e  **                          ]a a< |
      ^aze            ^aZE               |^/;^                              |^ ^| |
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



registerCircuit('8-bit divider effect', `

0"MODE:electron"

0"This circuit automatically shows the delay of the operation of the divider in action using a strategically placed timer."
0"The timer makes it alternate between computing 15/1 and 15/3"

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




`, 'div_effect');



