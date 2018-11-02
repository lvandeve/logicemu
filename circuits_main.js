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

0"A logic gate is a device that implements a boolean function on some amount of"
0"inputs, typically one or two"

0"The OR gate outputs 1 whenever input a OR input b (or both) are on. An OR"
0"gate is denoted with an 'o' in this simulation (but not in real electronics)"
0"Click the switches with the mouse to toggle them on or off and observe the"
0"effect on the output LED:"

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

0"The AND gate outputs 1 only when input a AND input b are on: An AND gate is"
0"denoted with an 'a' in this simulation (again, not in real electronics)"

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
0"exclusively input b (but not both) are on. A XOR gate is denoted with an 'e'"
0"from 'e'xclusive in this simulation (but not in real electronics)"

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

0"The NOT gate has a single input and inverts it, so outputs 1 if the switch is"
0"off, and outputs 0 if the switch is on. A NOT gate is denoted with an 'O' in"
0"this simulation (but not in real electronics)"

 "a"s**>O**>l"out"

0"Here is its truth table:"

0"  a | NOT "
0"  --+---- "
0"  0 |  1  "
0"  1 |  0  "

0"A NOR gate is an OR gate with a NOT behind it (so an OR with inverted"
0"output), integrated together as a single gate. The NOR gate outputs 1 only if"
0"both inputs are off. A NOR gate is denoted with an 'O' in this simulation"
0"(again, not in real electronics), in general in this simulation, capital"
0"letters are used as inverted version of the gate (in real life electronics a"
0"little circle at the output is used instead)"

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

0"The NAND gate is an AND gate with a NOT behind it, integrated into a single"
0"gate A NAND gate is denoted with an 'A' in this simulation (but not in real"
0"electronics)"

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

0"The XNOR gate is a XOR gate with a NOT behind it, integrated into a single"
0"gate. XNOR is sometimes also called EQV from equivalence, because it outputs"
0"1 if both inputs are equal (but this no longer holds true for multi-input"
0"gates, where it instead acts as an inverted parity [odd/even] gate). An XNOR"
0"gate is denoted with an 'E' in this simulation (but not in real electronics)"

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

0"An IMPLY gate outputs 1 except when input a is true and input b is false. Its"
0"name means 'a implies b', and since 'a=true, b=false' is the only combination"
0"that violates that statement, that is the only one where it outputs 0. An"
0"IMPLY gate does not have its own letter notation in this simulation, instead"
0"it can be made with an OR gate with the a input inverted. The inverted input"
0"is denoted with a little circle in this simulation, for once like real"
0"electronics notation actually does it. Real electronics also uses an OR gate"
0"with inverted input as notation for IMPLY, and also uses a little circle at"
0"the input to invert inputs. (note: ensure the render mode is 'graphical' to"
0"see the little circle, in text mode you see a square bracket ']' instead)."
0"Note that this gate is less common compared to the others and is really more"
0"commonly seen as an OR gate with an inverted input, in fact the main goal"
0"here is to demonstrate inverted inputs."

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

0"There are more gates you can make by inverting different inputs or outputs of"
0"any of the gates above, e.g. AND with one inverted input gives NIMPLY. Some"
0"combinations are redundant. In fact, there are 16 possible behaviors in total"
0"for 2-input gates. However the rest are less well established and not"
0"discussed here, you can view them all in the '16 gates' circuit."

0"As a final recap, here is the truth table of all gates seen here:"

0"  a  b | NOT  OR  NOR  AND  NAND  XOR  XNOR  IMPLY NIMPLY"
0"  -----+-------------------------------------------------"
0"  0  0 |  1    0   1    0     1    0     1     1     0   "
0"  0  1 |       1   0    0     1    1     0     1     0   "
0"  1  0 |  0    1   0    0     1    1     0     0     1   "
0"  1  1 |       1   0    1     0    0     1     1     0   "

`, 'logic_gates');

registerCircuit('Binary Numbers Tutorial', `

0"In logic circuits, we use binary instead of decimal counting. Decimal uses"
0"ten different digits. Binary uses a similar counting system, but with only 2"
0"digits: 0 and 1. This is because in electronic circuits, it is much simpler"
0"to make a switch with two states than with ten states. Computers typically do"
0"all math and other operations with binary numbers, and only convert the"
0"results to decimal when presenting them to the user."

0"So to be prepared for math circuits coming up later, this is an introduction"
0"to binary numbers and binary counting"

0"Decimal counts up with 10 possible symbols, from 0 to 0. Whenever 9 is"
0"reached, a next digit is incremented (if that next digit is a hidden zero,"
0"since prefix zeroes are usually not shown, it becomes a 1 and thus visible)"
0"With binary, it's just the same, except there are only two possible values,"
0"so next bits get added much faster"

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

0"Prefix zeroes of a binary number are often shown. For example when one speaks"
0"of an 8-bit binary number, all 8 bits are shown, even zeroes in front. E.g."
0"the number 1 as an 8-bit number is:"

"00000001"

0"To input and output binary numbers, set bits to 1 such that the sum of their"
0"values is the number you want. The value of each bit is a power of two. The"
0"least significant bit has value 1. The more significant bits have higher"
0"powers of two, for example 2 for the second bit, 4 for the third bit, 8 for"
0"the fourth bit, etc..."

0"Form any number you want below. For example, to form the number hundred, set"
0"the bits with values 64, 32 and 4 to 1. The sum of those is 100, and that is"
0"the only possible way to form the number 100. Note that the circuit below"
0"does not actually do anything, it just allows you to toggle some switches and"
0"LEDs to try to form numbers. The sum of all values below is 255 so that is"
0"the highest number you can make, it is the highest unsigned 8-bit value."


   "128 64 32 16 8  4  2  1"
     l  l  l  l  l  l  l  l
     ^  ^  ^  ^  ^  ^  ^  ^
     *  *  *  *  *  *  *  *
     s  s  s  s  s  s  s  s
   "128 64 32 16 8  4  2  1"

0"Most circuits operating on numbers will have such switches and LEDs like"
0"above, except some processing with logic gates will happen in-between"

0"We can also add a built-in binary-to-decimal display to switches to allow you"
0"to experiment more easily with binary numbers. The display shows your binary"
0"number in decimal. Try to make '21' for example. You can make all numbers"
0"from 0 to 255, and there is exactly one combination of input switches to make"
0"each number."


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

`, 'binary_numbers');

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
0"Multi-input AND only goes on if all inputs are on. Multi-input OR goes on if"
0"any input is on. Multi-input XOR, however, acts differently, it acts as a"
0"parity gate (odd/even), it does not act as a 'one-hot-detector' gate. The"
0"behavior is that of chaining multiple 2-input gates together and that gives"
0"parity gate in case of XOR."

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


  ***>A**
  *   ^ *
s*+**** *
  *   v v
s*+**>A>A>A>A***>l  "majority"
  * v       ^
s**>A********


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


  ***>O**
  *   ^ *
s*+**** *
  *   v v
s*+**>O>O>O>O***>l  "majority"
  * v       ^
s**>O********


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


registerCircuit('flip-flops tutorial', `

0"Flip-flops serve as memory elements, or elements that can keep state,"
0"in electronic circuits. This tutorial interactively introduces flip-flops"

0"Flip-Flop Types"
0"---------------"

0"There are 4 main flip-flop types: SR, D, T and JK. Before looking at how they"
0"work at logic-gate level, let's first use the prebuilt components that this"
0"simulation provides to look at their behavior."

0"All of these types have a clock input C. This clock is edge-triggered, that"
0"is, only at that exact instant where it goes on, it will update its state. At"
0"any other time, while the clock is high or low, it will remember that state."

0"SR Flip-Flop"
0"------------"


0"The SR flip-flop set-reset flip-flop has two inputs: S and R. Whenever the"
0"clock is edge-triggered, the output will go on if S is enabled, of is R is"
0"enabled, or stay as-is if neither S nor R are enabled. Having both S and R"
0"enabled is considered an invalid combination, and whichever behavior it"
0"happens to show here does not matter as it is unspecified and may violate"
0"assumptions"

 "S"s**>j#q**>l"Q"
        ###
 "R"s**>k##
        ###
 "C"s**>c##

0"The truth table of the SR flip-flop is as follows. It shows the transition"
0"(if any) that happens at each clock cycle: What is the next Q depending on"
0"the D input and the current Q"

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

0"The D flip-flop or data flip-flop will remember the state of its D input line"
0"whenever the clock goes from low to high. The clock is edge-triggered, that"
0"is, only at that exact instant where it goes on, it will update its state."
0"Try it out: The way to get the output enabled, is to first enable d, then"
0"turn the clock c from off to on."

 "D"s**>d#q**>l"Q"
        ###
 "C"s**>c##

0"The truth table of the D flip-flop is as follows. It shows the transition (if"
0"any) that happens at each clock cycle: What is the next Q depending on the D"
0"input and the current Q"

0"+---+-------+"
0"| D | Qnext |"
0"+---+-------+"
0"| 0 |   0   |"
0"| 1 |   1   |"
0"+---+-------+"

0"It looks as if the truth table shows that the state is just equal to the"
0"input D, so it would seem as if it doesn't do much interesting? Well, it"
0"remembers the state while the clock is off. A D flip-flop actually delays the"
0"input by 1 clock cycle. By looping its output back to the input with a"
0"multiplexer, this is a very useful component for registers in CPU's"

0"T Flip-Flop"
0"-----------"

0"The T flip-flop or toggle flip-flop will toggle its state whenever the T"
0"input is enabled and the clock is triggered. If T is off, it will. keep its"
0"state when the clock triggers."

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


0"The JK flip-flop is similar to the SR input, the J input behaves like set and"
0"the k input like reset. But for the JK flip-flop, the combination of having"
0"both j and k inputs enabled also has well defined behavior: it toggles the"
0"output similar to a T flip-flop in that case."

 "J"s**>j#q**>l"Q"
        ###
 "K"s**>k##
        ###
 "C"s**>c##

0"The truth table of the JK flip-flop is as follows. It shows the transition"
0"(if any) that happens at each clock cycle: What is the next Q depending on"
0"the D input and the current Q"

0"+---+---+-------+"
0"| S | R | Qnext |"
0"+---+---+-------+"
0"| 0 | 0 |   Q   |"
0"| 0 | 1 |   1   |"
0"| 1 | 0 |   0   |"
0"| 1 | 1 |   Q'  |"
0"+---+---+-------+"

0"The JK flip-flop is universal, it can easily be configured to act as SR, D or"
0"T flip-flop: T by connecting J and K together, D by making K the inverse of"
0"J."

0"In practice, many flip-flops also come with an asynchronous reset input"
0"(clear), and somtimes such asynchronous set input (preset), and often also an"
0"inverted version of the output. Asynchronous means it ignores the clock and"
0"overrides everything."

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


0"Epilogue"
0"--------"

0"This concludes the first flip-flop tutorial. Enjoy using them in designs :)"

0"This tutorial was only a first introduction describing what they do."

0"The next tutorial shows how to build flip-flops from logic gates, and shows"
0"the difference between latches, gated latches and true edge-triggered"
0"flip-flops"

`, 'flip_flops');

registerCircuit('flip-flops tutorial II: from gates', `
0"Flip-flops from logic gates"
0"---------------------------"

0"See the previous tutorial for the explanation what flip-flops do and what"
0"types exist."

0"Now let's make flip-flops from actual logic gates, rather than using the"
0"idealized simulated devices. This section will look at the low level timings"
0"in the gates, so make sure the update algorithm is set to 'electron' mode"

0"We will actually build up from latches towards true edge-triggered"
0"flip-flops. This because a latch is much simpler to make from gates, and the"
0"edge triggered ones require more advanced circuits."

0"SR NOR Latch"
0"------------"

0"The most basic flip-flop circuit in electronics has two looped-back"
0"NOR gates, and can flip between two states - and remember them."

0"It's called the SR NOR latch (but originally was called flip-flop"
0"for its behavior). Today, we use the following terminology:"
0"*) latch: it operates directly, asynchronously, at the lowest level,"
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
0"corresponding switch. This same NOR latch will be reused many times below,"
0"until a chapter about NAND logic much later."

0"A bit more compact representation of the same thing:"

 "S"s***>O<***>l "Q"
         v *
 "R"s***>O**

0"This latch can also be made from NAND gates instead of NOR gates, but the"
0"inputs are then active-low."


0"Gated SR Latch"
0"--------------"

0"An SR latch can be made 'gated' by adding an 'enable' input. Only when the"
0"enable input is enabled, will the inputs have any effect. This allows to"
0"control more easily when the state of the flip-flop should update, even if"
0"the input signals are doing other things while enable is off. This can be"
0"done by adding AND gates in front:"

 "S"s**>a>O<*>l"Q  on"
        ^ * *
 "E"s****  x
        v * *
 "R"s**>a>O<*>l"Q' off"

0"Gated D Latch"
0"-------------"

0"A non-gated D-latch would not be too interesting, as it would simply"
0"immediately output the same value as it input. Making it gates allows it to"
0"remember the state while enable is off. A gated SR latch can easily be"
0"modified into a gated D-latch: Connect the D input to S when on, to R when"
0"off:"

 "D"s****>a>O<*>l"Q  on"
        * ^ * *
 "E"s***+**  x
        * v * *
        *]a>O<*>l"Q' off"


0"JK and T Latch"
0"--------------"

0"Neither a T-latch nor a JK-latch make too much sense, the toggling only works"
0"in stable ways with an edge-triggered clock input, without it the signal"
0"would pulse rapidly and it would be quite random which state it is in when"
0"disabling the enable input. So those only make sense as flip-flops, see above"
0"as well as further below. Here's a JK latch anyway:"


         ***
         v *
"J" s***>a>O<***>l
           v *
"K" s***>a>O**
         ^ *
         ***


0"How the latch works: the right two NORs are an SR latch as seen above. The"
0"two inputs are AND-ed with the output of their corresponding NOR (they could"
0"alternatively be AND-ed with the inverse of the output of the opposite NOR),"
0"so the switch input will be seen by the NOR but then immediately disable"
0"itself due to the NORs output going off. The NOR keeps its state thanks to"
0"the opposite NOR though. But now if both switches are active, this causes an"
0"eternal conflict between both NORs, causing the blinking."

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
0"inverted input, so that it only outputs a short pulse when you just enable"
0"the switch. Using this as enable gate of a gated SR or D latch makes them"
0"behave more like an edge triggered flip-flop"

0"However, making sure the update algorithm is set to 'electron' mode, try it"
0"out and you may notice a problem:"

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

0"Often when enabling the clock, you may find the two output LEDs blinking"
0"rapidly, and it sometimes even settles at the wrong output. This is because"
0"the pulse happens to be too short for the latch's circuit to handle. Making"
0"the delay longer (2 ticks by adding a 2 at the d) helps in this case:"

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

0"A delay of 2 happens to work in this simulation because the paths in the"
0"flip-flops are 2 ticks long (that is, in these NOR NOR latches, the longest"
0"path goes through both NORs, which is 2 ticks), and the 2 at the delay"
0"happens to make it match those 2 ticks perfectly here"

0"But that is always going to be fiddly. How much delay do you need in high"
0"speed circuits to be optimally fast yet not too fast for it to? fail? In real"
0"life, especially for the toggling state of T and JK flip-flops, it is very"
0"hard to get this right"

0"Truly edge-triggered clocks"
0"---------------------------"

0"A more optimal edge-triggered clock, that does not rely on exact timing of a"
0"short pulse, can be made by putting two gated D latches in a row, the"
0"receiving the inverted enable (clock) signal, the second the regular enable"
0"(clock) signal and with the output of the previous one as input. Then while"
0"the clock is low, your input can freely change the first one but not the"
0"second one that gives the actual output. When the clock is high, then the"
0"first one no longer responds to the input, but the second one will update its"
0"state to that of the first one. As long as the clock remains high, the first"
0"one cannot change, so after this update when the clock went high nothing can"
0"affect the second one anymore either. That's how to get the perfect positive"
0"edge-triggered effect. This is also called the 'master-slave' flip-flop."
0"(note: you could also avoid the invertor at an input of the second flip-flop"
0"by using the inverted output from the first flip-flop)"


  "D"s*****>a>O<*****>a>O<*>l"Q  on"
          * ^ * *   * ^ * *
        **+**  x  **+**  x
        * * v * * * * v * *
        O *]a>O<* * *]a>O<*>l"Q' off"
        ^         *
  "C"s*************

0"In the above circuit, moving the position where the invertor of the clock is"
0"can make it negative edge-triggered instead of positive edge-triggered"

0"Similarly, using two gated JK latches can create a JK flip-flop in such"
0"configuration, so that we get a useful toggle signal. Rather than two"
0"independent JK latches, the output from the second one is fed back to the"
0"first. If you enable both J and K, it will toggle state every time the clock"
0"is positively edge triggered. Though this is not yet an actual perfect"
0"edge-triggered JK flipflop yet in the strictest sense, see further."

0"Note: Just like in real life, due to initial randomization of the states, the"
0"first clock cycle may behave wrongly, and for convenience the switch was made"
0"initially on for that"

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

0"The above is useful but is not a truly perfect edge-triggered JK flip-flop"
0"however. To be perfect, it should ONLY be affected by the state of the inputs"
0"at the time the positive edge happens. But here you can try the following:"
0"Set its state to off first and turn all three inputs off. Now turn J on and"
0"then off again (without touching the clock). Now your inputs are still all"
0"off. Since J and K are off, if you now enable to clock, a perfect JK"
0"flip-flop should not turn on. But now enable to clock on the above one, and"
0"observe what happens: it goes on anyway, because turning the J off and on"
0"again managed to change the state of the first latch. The D-flip-flop did not"
0"suffer from this problem, because the D was wired in such a way that it"
0"always actively provides either a set or a reset to the inputs. But the extra"
0"freedom of the JK flip-flop introduces this bad behavior."

0"For example, when making a T flip-flop from the above by wiring J and K"
0"together, there is also a problem: when you disable T, there will still be"
0"one more clock cycle that toggles the output anyway, which is quite"
0"undesirable:"

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

0"One way to solve it, is to take the D flip-flop from above, and instead add"
0"additional combinational logic at the input to compute the desired next state"
0"from the input and the current state. For T, we want next Q on if and only if"
0"any of the following two conditions:"
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


0"Adding asynchronous reset and set (clear and preset) can be done by directly"
0"manipulating the second flip-flop with not much additional logic needed:"

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
0"transparent if the gate is enabled), and flip-flops (which can change only on"
0"a clock edge). And then we saw the types SR, D, T, JK. This table summarizes"
0"the amount of inputs (including gate/clock but excluding optional"
0"preset/clear inputs) of each of those types, or leaves the table cell empty"
0"if there is no useful circuit (e.g. JK/T latch is not because their toggle is"
0"chaotic, and D latch is not because it would be simply a pass-through wire)"

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

0"This showed how to build flip-flops from mixed gates."

0"The next tutorial will build flip-flops from NAND gates only. It is also an"
0"important part since a few more canonical typical flip-flop circuits are"
0"introduced."

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


registerCircuit('flip-flops tutorial III: from NAND', `


0"This tutorial continues the previous ones so it's recommended to view"
0"them first unless you already know what flip-flops do and how they work."

0"Flip-flops from NAND gates only"
0"-------------------------------"

0"The NAND gate is a universal gate so any circuit can be made from only NAND."
0"In the flip-flops tutorial we created perfect flip-flops from pure logic"
0"gates, but it was a mix of different gates. In practice, it may be cheaper to"
0"create circuits from only a single gate, the NAND gate. This argument"
0"probably does not hold true today, where you can make any gates from any"
0"transistors you want on the surfaces of chips, but the flip-flops from NAND"
0"logic only are actually still quite cheap and elegant compared to the ones"
0"from the previous tutorial, and often the canonical circuits, so the chapters"
0"below are worth it for that."

0"We could do something similar with NOR-only logic, in most circuits you can"
0"keep all wiring the same and replace all NANDs with NORs and that will often"
0"result in the same flip-flop except with active-low inputs and outputs, and"
0"negative edge-triggered clock. But NAND is chosen in this tutorial."

0"NAND latches"
0"------------"

0"In the previous tutorial we saw the NOR latch. Now let's present the NAND"
0"latch, which acts the same, except its inputs are active-low (so both"
0"switches off is now the invalid combination, and you must set both switches"
0"on to make it remember state). NOTE: if you saw this latch flicker when just"
0"loading the circuit, that's normal, initially a flip-flop is in a bistable"
0"state and takes time to settle to a random state, this is emulated when we"
0"are in 'electron' mode, in real life this happens in nanoseconds."

 "S'"S**>A**>l"Q  on"
         ^ *
          x
         v *
 "R'"S**>A**>l"Q' off"

0"Please look carefully at the wiring above: The arrows in the diagonal wires"
0"are in the opposite direction as they were in the NOR latches above, with as"
0"only reason to have the Q and Q' in more desirable positions in the circuits"
0"below that use this same core."

0"To try it out more intuitivily with active-high input, here it is with the"
0"inputs inverted at the cost of two extra NANDs:"

 "S"s**>A>A**>l"Q  on"
          ^ *
           x
          v *
 "R"s**>A>A**>l"Q' off"

0"Note that most other circuits below will all be nicely active-high while"
0"using the first active-low latch, because we'll be using NAND gates at the"
0"input of this latch as well, which will invert the inputs making them"
0"effectively active-high."

0"The JK latch can also be made with 4 NAND gates. Comparing this to the"
0"earlier JK latch: this is like using its SR latch with NAND instead of NOR so"
0"their inputs become active-low, replacing the input ANDs with NANDs to make"
0"them this active-low, and connecting the opposite output to each input rather"
0"than inverse of the corresponding output."

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

0"Making the SR latch gated with NAND gates has the advantage it also makes it"
0"active high instead of active low. Note that this configuration isn't that"
0"different from the non-gated JK latch above, just different wiring."


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

0"However! Strictly speaking, NAND-logic only supports 2-input NAND gates. A"
0"3-input NAND gate requires 3 2-input NANDs to create. So unfortunately with"
0"only 2-input NAND gates (and 1-input which is a 2-input with the two inputs"
0"connected), the JK latch looks a bit more expensive, with two regular AND"
0"gates created from NAND+inverter at the front:"

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

0"Note that, as in the previous tutorial, these JK and T latches are not useful"
0"due to the uncontrolled toggling, even when it has an 'enable' input."

0"Of interest, also, is an alternative form of D latch, the Earle latch It has"
0"a low and high enable input, for convenience they are both wired to the same"
0"switch below (that leftmost NAND is not part of the normal Earle latch"
0"cicruit, it requires you to provide the two opposite enable inputs). Note"
0"that this one also has a 3-input NAND in it, so purely with 2-input NANDs it"
0"would take 6 NAND gates (7 including the negatino of the enable input) Its"
0"advantage is that all paths are as long, rather than variable length"


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


0"There is also an entirely different D flip-flop from NAND gates possible, the"
0"classical positive-edge-triggered D flip-flop. It requires either 6 NAND"
0"gates of which one is 3-input, or 8 2-input NAND gates."

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


0"Now let's add the master-slave JK flip-flop with two JK latches again, though"
0"remember this one is not TRULY an edge triggered JK flip-flop, as seen in the"
0"previous flip-flop tutorial (it's broken because, starting with everything"
0"off, enable J, disable J, enable C. It toggles while it shouldn't)"

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


0"Fortunately, to make the JK flip-flop, we don't need any more NAND gates, the"
0"4 NAND gates of the above XOR gate already serve perfectly well to implement"
0"the logic. Just give it the two separate inputs. This is because XOR means"
0"the same as as (T AND !Q) OR (!T AND Q), and for the JK flipflop we saw above"
0"that its input logic is (J and !Q) OR (!K and Q), which looks similar except"
0"the !T is replaced by a different input."

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

          ***********************
          v v                   *
"J"s*****>A>A *>A**>A<*>A**>A***+**>l"Q"
          v v * ^ v v * ^ v ^ * *
"K"s*****>A>A** A>A>A** *>A>A<* *
                ^       *   *   *
"C"s*********************   *****

0"RENDER:graphical"

`, 'flip_flops_nand');


registerCircuit('flip-flops (from counters)', `

0"This one is just for interest in this simulation itself. The simulation"
0"provides the 'c' gate as counter gate. This is a single-input T flip-flop."
0"The circuits here show how to make any regular flip-flop from those."

0"Gated D latch. Not a valid D flip-flop, only a gated latch, because it's"
0"possible to change state while the clock is high instead of only on clock"
0"rising edge"

"D" s**>e<c**>l
        v ^
"E" s**>a**

0"D flipflop. Two c's are needed to prevent anything from changing except when"
0"clock goes from low to high."

"D" s**>e<*>e<*
        v * v *
        a>c a>c****>l
        m   ^
"C" s********

0"It's not possible to do the above or any of the next flip-flops with only a"
0"single c, because when looping c's output back to the input, needed for the"
0"control logic, it will disable itself the next tick, like below: (if you've"
0"ever seen one of those amusing 'useless machines' that powers off its own on"
0"switch, this does exactly the same)"

    ***
    v *
s**>c****>l


0"T flip-flop"

0"Despite 'c' being a single-input T flip-flop, two c's are needed to use it"
0"for one with separate T and clock input."

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

`, 'flip_flops_counters');


registerCircuit('flip-flops (from Qq)', `

0"This one is just for interest in this simulation itself. The simulation"
0"provides 'Qq' as an SR latch. Here we try to build all ideal flip-flops from"
0"it."

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



`, 'flip_flops_qq');


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

0"FIT:x"

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
        ||| *z  ||| *z  ||| *z     |
        ++*-+cd<++*-+cd<++*-+cd<--*|
        ||  |   ||  |   ||  |     ||
        +*--+cd<+*--+cd<+*--+cd<-*||
        |   *z  |   *z  |   *z   |||
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


registerTitle('Quantum Gates');

registerCircuit('Quantum logic gates', `
0"Here a few quantum logic gates are introduced in a handwavy way."

0"Most useful quantum logic gates cannot be emulated here because they involve"
0"negative, imaginary or complex numbers and superpositions. We can only"
0"simulate the ones where inputs that are exactly True or False only give"
0"outputs that are exactly True or False."

0"The gates that are possible are emulated on classical bits here, but do not"
0"be mislead, as in quantum physics each input and each output can be much"
0"more, each can be associated with a normalized pair of complex numbers with"
0"arbitrary precision to which a unitary complex matrix operation is applied,"
0"and with multiple inputs and outputs this state size (amount of complex"
0"numbers) grows exponentially larger."

0"So the gates shown below are classical gates simulating the behavior of some"
0"quantum gates."

0"Quantum gates all must have the property of being reversible: it has as many"
0"inputs as outputs, and each input combination has a unique output combination"
0"so you can tell from the output what the input was, and vice versa."

0"Pauli-X gate: acts like a NOT gate:"

s**>O**>l

0"SWAP gate: swaps two inputs:"

s** **>l
   x
s** **>l

0"Controlled NOT gate: CNOT gate: acts like XOR plus lets the control input"
0"through."

s******>l
    v
s**>e**>l

0"Controlled SWAP gate: Fredkin gate:"

"c"s**************>l 0"c"
           *
"a"s*******+>e****>l 0"(a AND NOT c) OR (b AND c)"
         v v ^
"b"s****>e>a**>e**>l 0"(b AND NOT c) OR (a AND c)"
       *       ^
       *********

0"Controlled-controlled NOT gate: CCNOT gate: Toffoli gate:"

      *****
      *   *
"a"s**+***+****>l"a"
      * v *
"b"s***>a *****>l"b"
        v
"c"s***>e******>l"(a AND b) XOR c"


0"Fredkin and Toffoli are able to implement all classical logic gates, they are"
0"universal classical logic gates (but they are not universal quantum logic"
0"gates). See next circuits for examples of this."

0"Other common quantum gates, such as Hadamard, Pauli-Y, Pauli-Z, roots of the"
0"above, phase shift, ..., cannot be implemented here and so there is not good"
0"reason to describe them here. But you need them to take the actual advantage"
0"of quantum computing, you need gates that create superpositions. Also, we"
0"didn't use any of the notation normally used for quantum circuits here. If"
0"interested check out literature on it and try out an online quantum computer"
0"simulator."

`, 'quantum_gates');


registerCircuit('Fredkin gate', `

0"The Fredkin gate is a reversible gate: every unique input has a unique output"

0"In addition, it always has as many ones at the input as at the output."

0"It is a universal classical logic gate: all regular logic gates can be"
0"built from it, as shown below."

0"It is also useful for quantum computing thanks to being reversible and"
0"emulating classic gates. It is not a universal quantum gate though so"
0"not sufficient. For more on that and its typical notation, see literature"
0"or try out an online quantum computer simulator. Here we show a classical"
0"(non-quantum) Fredkin gate instead."

0"It is also known as the controlled swap gate (CSWAP)."

"c"s**************>l 0"c"
           *
"a"s*******+>e****>l 0"(a AND NOT c) OR (b AND c)"
         v v ^
"b"s****>e>a**>e**>l 0"(b AND NOT c) OR (a AND c)"
       *       ^
       *********
           I

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

0"control the AND gate (here implicitely in the middle switch, which only goes"
0"on when also its input is on) to enable/disable the crossing:"

    s
    *
s***+>e**>l
  v v ^
  e>a**
  ^   v
s****>e**>l

0"Of course if no XOR gates are available, the AND/NOT/OR expressions given at"
0"the output labels above can be used instead (requires 4 ands, 2 ors and an"
0"invertor)."

0"It's defined as a chip at the beginning so we can use it as follows now (with"
0"the control input always at the top):"

"c"s**>i**>l
       i
"a"s**>i**>l
       i
"b"s**>i**>l


0"The Fredkin gate can make all regular gates, but there are 'garbage' input"
0"and output signals to support the reversibility"

3"NOT"
3"---"

"a"s**>i**>l2
       i
"0"c**>i**>l2
       i
"1"C**>i**>l 0"not a"

3"AND"
3"---"

"a"s**>i**>l2
       i
"b"s**>i**>l2
       i
"0"c**>i**>l 0"a and b"

3"NAND"
3"----"

0"Note: NOT is reversible so if all you care about is reversibility you can"
0"use a NOT instead of the second Fredkin gate instead. Here we do everything"
0"from fredkin only so need two."

"a"s**>i**********>l2
       i
"b"s**>i* *>i*****>l2
       i x  i
"0"c**>i* *>i*****>l2
            i
"1"C*******>i*****>l 0"a nand b"

0"Nicer version if NOT can be used:"

"a"s**>i******>l2
       i
"b"s**>i******>l2
       i
"0"c**>i**>O**>l 0"a nand b"


3"OR"
3"--"

"a"s**>i**>l2
       i
"b"s**>i**>l 0"a or b"
       i
"1"C**>i**>l2



3"NOR"
3"---"

"a"s**>i**********>l2
       i
"1"C**>i* *>i*****>l2
       i x  i
"b"s**>i* *>i*****>l 0"a nor b"
            i
"0"c*******>i*****>l2

0"Nicer version if NOT can be used:"

"a"s**>i******>l2
       i
"b"s**>i**>O**>l 0"a nor b"
       i
"1"C**>i******>l2


3"XOR, XNOR"
3"---------"


0"Please not how 'antennas' are used to make some wires cross the chip,"
0"the --(i)-- wire passes through it."

"a"s********>i*******>l2
             i
"b"s**>i****(i)******>l2
       i     i
"0"c**>i****>i*******>l 0"a xor b"
       i     i
"1"C**>i****>i*******>l 0"a xnor b"



3"Full Adder"
3"----------"

"a"s**>i****************************>l2
       i
"b"s**(i)***>i****************>i****>l2
       i     i                 i
"c"s**(i)***(i)***>i*** >i* **>i****>l 0"carry"
       i     i     i   x i x   i
"0"c**>i****>i****>i*** >i* **(i)***>l 0"sum"
       i     i     i     i     i
"1"C**>i****>i****>i****>i****>i****>l2


0"FIT:x"

`, 'fredkin');


registerCircuit('Toffoli gate', `

0"The Toffoli gate is a reversible gate: every unique input has a unique output"

0"It is a universal classical logic gate: all regular logic gates can be built"
0"from it, as shown below."

0"It is also useful for quantum computing thanks to being reversible and"
0"emulating classic gates. It is not a universal quantum gate though so not"
0"sufficient. For more on that and its typical notation, see literature or try"
0"out an online quantum computer simulator. Here we show a classical"
0"(non-quantum) Toffoli gate instead."

0"It is also known as the controlled controlled not gate (CCNOT)"

0"If both a and b are true, c gets inverted, else all outputs are the same as"
0"the inputs"

      *****
      *   *
"a"s**+***+****>l"a"
      * v *
"b"s***>a *****>l"b"
        v
"c"s***>e******>l"(a AND b) XOR c"
        I

0"It's defined as a chip above so we can use it as follows now (with the"
0"controlled input/output always at bottom):"

s**>i**>l
    i
s**>i**>l
    i
s**>i**>l


0"It can make all regular gates, but there are 'garbage' input and output"
0"signals to support the reversibility"

3"NOT"
3"---"

"1"C**>i**>l2
       i
"1"C**>i**>l2
       i
"a"s**>i**>l"NOT a"


3"AND"
3"---"

"a"s**>i**>l2
       i
"b"s**>i**>l2
       i
"0"c**>i**>l"a AND b"


3"NAND"
3"----"

"a"s**>i**>l2
       i
"b"s**>i**>l2
       i
"1"C**>i**>l"a NAND b"


3"OR"
3"--"

"a"s**>i***>i***>l2
       i    i
"b"s**>i* *>i***>l2
       i x  i
"1"C**>i* *>i***>l"a OR b"

0"Nicer version if NOT can be used (with Morgan's law):"

"a"s**>O**>i**>l2
           i
"b"s**>O**>i**>l2
           i
"1"C******>i**>l"a OR b"


3"NOR"
3"---"

0"(TODO: verify if there is no way with 2 gates)"

"a"s***** ***** *******>l2
         x    * *
"b"s**>i* *>i*-X-*>i***>l2
       i    i * *  i
"1"C**>i***>i** **>i***>l2
       i    i      i
"1"C**>i***>i*****>i***>l"a NOR b"

0"Nicer version if NOT can be used (with Morgan's law):"

0"Nicer if we allow NOT gates:"

"a"s**>O**>i******>l2
           i
"b"s**>O**>i******>l2
           i
"1"C******>i**>O**>l"a NOR b"

3"XOR"
3"---"

"a"s**>i**>l2
       i
"1"C**>i**>l2
       i
"b"s**>i**>l"a XOR b"


3"XNOR"
3"----"

0"Please not how 'antennas' are used to make some wires cross the chip,"
0"the --(i)-- wire passes through it."

"1"C******>i***>l2
           i
"a"s**>i**(i)**>l2
       i   i
"1"C**>i**>i***>l2
       i   i
"b"s**>i**>i***>l"a XNOR b"

0"Nicer version if NOT can be used (with Morgan's law):"

"a"s**>i******>l2
       i
"1"C**>i******>l2
       i
"b"s**>i**>O**>l"a XNOR b"


0"FIT:x"

`, 'toffoli');





registerTitle('Relays');



registerCircuit('Relay Logic', `

0"Here, we simulate different types of relays, and build logic gates out of"
0"them."

    s
    *
    ***
    v *
  *>V*+**>l
  *   *
s** ***
  * * w
  **+>V**>l
    *
    ***
    v *
  *>V*+**>l
  *   *
s**   *
  *   w
  ***>V**>l



0"What is a relay? It's a controlled switch. Optical versions exist, but the"
0"typical original version works electromagnetically: It has is a coil and a"
0"mechanical switch. When you send current through the coil, it becomes"
0"magnetic and attracts the switch. The switch, due to that, moves to close a"
0"contact. This makes a connection between two terminal wires available at the"
0"relay. The magnetic (or optical) action ensures there is no electrical"
0"contact between the electric circuit used to control the coil and the"
0"electric circuit that goes through the switch. This isolation is very useful"
0"because it allows for example to control a high power circuit safely with a"
0"low power electronic switch. Since they are controlled switches, relays can"
0"also be used to make logic circuits. The relay described above was a simple"
0"controlled switch that was open or closed, and that is called an SPST relay."
0"You can also make the switch connect to a different contact in both of its"
0"states. Then you have a SPDT relay. You can also make the magnet control two"
0"(or more) independent switches. That gives a DPST or DPDT relay, or 4PDT"
0"etc... The diagram above is a DPDT relay."

0"Important note about the simulation!"
0"------------------------------------"

0"Relays actually require physical things that LogicEmu cannot simulate. There"
0"are multiple different things we cannot simulate, but there are workarounds"
0"as described."
0"*) the decoupling: Real relays physically decouple the 'coil' input from the"
0"   switch, magnetically or optically. Here we'll just implement it as"
0"   connected switches instead. It has no real effect on the logic gates we"
0"   make from the relays and we'll hide them in ICs anyway."
0"*) 'open' switch state: LogicEmu does not support switches with regular"
0"   two-directional wires. Everything in the simulation is always"
0"   uni-directional, like diodes. So the simulation can simulate a transistor,"
0"   but it cannot simulate a controlled switch that has an open/closed state."
0"   And relays happen to be such controlled switches. The workaround is: for"
0"   many relays defined below as IC templates, we make two versions: one for"
0"   one direction, and another for the reversed direction (having the relay"
0"   180 degrees rotated)."
0"*) tri-state logic: the open state of the relay switch creates a 'floating'"
0"   state, the third state of tri-state logic. LogicEmu only supports"
0"   two-state logic (0 and 1), but offers the 'V' device to simulate tristate"
0"   buffers and to simulate multiple things outputting to the same wire. So"
0"   'V' is used a lot in the circuits below. In real life, any V with two"
0"   inputs is either a tristate buffer or a mechanical controlled switch, and"
0"   any V with one input can be completely removed (but removing it in the"
0"   simulation would give 'multiple devices outputting to same wire' error)."
0"   In the simulation, multiple inputs to the same V act as AND, and multiple"
0"   V's outputting to the same wire act as OR. We could have implemented them"
0"   with 'a' and 'o' in fact, but using the V's makes it more explicit what"
0"   we're doing here, it's purely a notational thing. Read the 'Full Help' for"
0"   more about the V's if that was not clear, it's somewhat important to"
0"   understand the circuits below. The V's are basically our poor man's"
0"   tristate workaround and act as OR of ANDs."
0"*) fully closed circuits: In real life, the relay's coil is activated with"
0"   current, which requires two endpoints of the coil connected to a wire. In"
0"   this simulation, voltage/current sources are not present since they are"
0"   implicit. Because as you know in LogicEmu a switch to a LED looks like"
0"   this: 's-->l', but in real life of course that electrical circuit must be"
0"   closed, so implicitely there is a power supply between the switch and the"
0"   LED. Similarly, in the simulation, we give only a single wire to the coil"
0"   input of the relays. Just remember in real life there are two and there"
0"   needs to be a voltage difference between them and current flowing to"
0"   operate the coil."

0"All relays are defined as IC templates below, so their full form is visible"
0"here, and further down their compact IC versions will be used. The naming of"
0"IC's chosen here is a vertical number (at capital I in the templates, at"
0"small i in the usages) The first digit is the amount of inputs (other than"
0"the coil), the second is the amount of outputs. So for example i12 is a relay"
0"with 1 input (plus additionally the coil input) and 2 outputs, in other words"
0"an 'SPDT' relay. And i21 is that same relay flipped around (the workdaround"
0"described above)."

0"SPST (NO) relay"
0"---------------"

   Is
   1*
   1v
s**>V****>l

0"The SPST (NO) relay (single pole, single throw, normally open) is a simple"
0"controlled switch. The top input is the coil input. The left input is the"
0"input to the switch being controlled and the right is the switches output. In"
0"real life, this relay has 4 terminals instead of 3 since you need two wires"
0"to send current through the coil. But as described above, this simulation"
0"makes that implicit."

0"It may seem as if the above relay is basically just an AND gate of the two"
0"switches, and maybe in the limited simulation here it is, but in practice"
0"there's a big difference between the top input, and the other two terminals"
0"which can connect any two things in any direction at any voltage, so mentally"
0"treating it that way helps to understand real relays and appreciate the below"
0"circuits better."


0"SPST (NC) relay"
0"---------------"

0"The 'normally closed' SPST relay is similar, but the switch is wired such"
0"that it makes contact by default, and when the coil is active it does not"
0"make contact"

   Is
   1*
   9w
s**>V****>l

0"NOTE: the IC id of this one breaks the rule of using #inputs, #outputs in the"
0"name. The 9 represents the fact that it's an inverted output (9 being decimal"
0"complement of -1)"


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

0"The SPDT relay (single pole, double throw) is very similar to the SPST relay,"
0"except the switch will also connect to a contact when in the 'off' position"
0"of the SPST relay. It is in fact an NO and an NC SPST with shared coil."

0"So now the coil will connect the common contact to either one, or the other,"
0"contact on the other side. It acts like a MUX or a DEMUX (depending on which"
0"side you use as input)"

0"Remember that we need to define two IC's here because the simulation requires"
0"an input/output direction, but in real life this is the same relay flipped"
0"around."


0"DPDT relay"   0"DPDT relay flipped around"0"DPDT relay one side flipped"
0"----------"   0"-------------------------"0"---------------------------"

   Is                  Is                         Is
   2*                  4*                         3*
   4***                2***                       3***
    v *                 v *                        v *
  *>V*+**>l         s**>V*+**                    *>V*+**>l
  *   *                   * *                    *   *
s** ***                 *** *>l                s** ***
  * * w                 * w *                    * * w
  **+>V**>l         s***+>V**                    **+>V**>l
    *                   *                          *
    ***                 ***                        ***
    v *                 v *                        v *
  *>V*+**>l         s**>V*+**                    **V<+***s
  *   *                   * *                    *   *
s**   *                   * *>l                l<*   *
  *   w                   w *                    *   w
  ***>V**>l         s****>V**                    ****V<**s

0"The DPDT relay (double pole, double throw) is in fact two SPDT relays"
0"controlled by the same coil."


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



0"The 4PDT relay (double pole, double throw) is in fact four SPDT relays"
0"controlled by the same coil."

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


0"Note: The SPST, SPDT, DPST, 4PDT, ... naming is also used for regular (human"
0"controlled) switches and pushbuttons, not only for relays. The 's' switch of"
0"LogicEmu is not directly one of those, as it's abstracted away which physical"
0"build is used for it (it doesn't even have two poles in Logicemu), the 's' of"
0"LogicEmu could be an SPST with a pullup or pulldown resistor, or it could be"
0"an SPDT that can toggle between ground and positive voltage."

0"Trying out the IC instances"
0"---------------------------"

   s         s
   v         v
   i         i
 s>1>l     s>1>l
   1         9

   s         s         s         s
   v         v         v         v
   i>l     s>i         i>l     s>i
 s>1         2>l     s>i         i>l
   2>l     s>1         i>l     s>i
                       i         i
                       i>l     s>i
   s         s       s>i         i>l
   v         v         i>l     s>i
   i>l     s>i         i         i
 s>i         i>l       i>l     s>i
   i>l     s>i       s>i         i>l
   i         i         i>l     s>i
   i>l     s>i         i         i
 s>2         4>l       i>l     s>i
   4>l     s>2       s>4         8>l
                       8>l     s>4

   s         s
   v         v
 s>i>l     s>i>l
   2         2
 s>2>l     s>8>l


   s
   v
 s>i>l
   i
 s>i>l
   3
 s>3>l





0"Making logic gates from relays"
0"------------------------------"

0"To make logic gates from relays, we control the coils (the top inputs) with"
0"the gate input signals. The inputs from the left are passing through the"
0"constant '1' from the left. Because when making logic gates with relays, the"
0"goal is actually to open/close a switch network made from all the relays,"
0"controlled by their coils."

0"So in the circuits below, usually the gate inputs are at the top and the"
0"outputs to the right."

0"The minimal possible relay type is used everywhere below. In real life, if"
0"you want to make such gates from a bunch of relays, it's likely you got a"
0"bunch of relays of all the same type, That's usually fine, almost all the"
0"below circuits can be trivially be replaced with only SPDT relays or only"
0"DPDT relays. If you have only SPDT's, DPDT can be made from two of them. If"
0"you have only DPDT's, an SPDT can be made by not using some inputs/outputs."
0"If you have only SPST (NO) relays, many gates below are not easily"
0"implementable. You can make an SPDT from two SPST's plus an invertor so you"
0"then need a way to make that invertor, or use a normally open (NO) and a"
0"normally closed (NC) SPST if you have both types."

0"AND gate"
0"--------"

0"An AND gate can be made with relays in series"

  s   s
  v   v
  i   i
C>1**>1**>l
  1   1

0"This is a two-input AND gate: only if the two coils are activates, will the"
0"constant signal be able to pass through the LED (or in real life, will the"
0"circuit containing the LED and a here hidden power supply be closed)"

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
0"just there due to a limitation of the simulation. The wires are connected,"
0"either relay being closed will connect the power source and the LED"

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

0"A XOR gate can be made from two SPDT relays, one flipped compared to the"
0"other and the wires crossed. This way, toggling one relay crosses the signal"
0"in such a way that it connects from one output of the first to a connected"
0"output of the other, but enabling both or no relays makes the connection"
0"mismatch."

0"This is similar to how a light in a home controlled by two classical wall"
0"switches works. Light switches in a room typically also behave like XOR,"
0"since that is the way you can get each switch to function to toggle the light"
0"on and off."

    s   s
    v   v
    i* >i
C**>1 x 2**>l
    2* >1

0"Multi-input XOR gate"
0"--------------------"

0"Note that multi-input XOR gate works like parity (even/odd) gate, not as"
0"one-hot (exactly one input) detector."

0"This works once again like wall switches for lights in homes, for rooms that"
0"have more than two wall switches. All the inner switches use a DPDT to"
0"emulate a '4-way' home switch that crosses wires based on the signal, and the"
0"two outer switches use the simpler SPDT's to emulate '3-way' home switches. A"
0"wire crossing at the end is needed only if there's an even amount of switches"
0"(at least in the configuration used here)."

0"Each inner relay will either swap or not swap two inputs, only if the correct"
0"amount of swaps happens, the output will go on."

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

0"Two NOT gates in a row cancel each other out, but this shows how to connect"
0"multiple to show that both need a power source input."

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

0"One way to make NAND is like the AND above and an extra invertor behind it,"
0"but that would cost three relays."

0"To make the NAND gate with two relays, the configuration of the OR gate is"
0"used, but with the inputs inverted (by Morgan's law, this turns OR into"
0"NAND), by using 'normally closed' SPST relays (or alternatively two SPDT"
0"relays with the inverted output chosen)."

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

0"The first relay acts as an inverter for the first switch. So it's only the"
0"second relay that is the essense of the latch. The set switch enables its"
0"coil, and makes it go on thanks to the power from the inverted R input. It"
0"then stays on thanks to the loop back of its output to its own coil. When"
0"pressing the reset switch, since it's inverted this disables the power input"
0"to the core relay, and turns off the latch. The main relay is a DPDT, so it's"
0"possible to use the second circuit for the external outputs (rather than"
0"sharing the output that drives its coil), including an inverted Q'."


0"In real life, it is also possible to let the coil of the main relay be"
0"connected to the ground through the reset relay and to the positive voltage"
0"through this relay itself. Then resetting happens by disconnecting it from"
0"the ground. But we cannot simulate it here since the simulation doesn't have"
0"two terminals for the coil and no way to distinguish the disconnected and"
0"ground states."


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
0"MODE:fast"
`, 'relay_logic');


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
           h          ^|         h
       s    *         ||        *    s          l
        ; ==8=========80========8== /      ls   ^   sl
         *7                       1*        h;  |s /h
          =             g-->c<d   =          ;h |vh/
          = *----]a------>a>d ^   =           i####
          = |     ^       ^ t<*s  =           #   #<--s
          = o<a e>e<o<a e>o<*     =         s>#   #-->l
          = ^ ^^^   ^ ^^^   |     =       l<--#>l #<s
          = a e *   a e *   |     =           #   #
          = ^^^ |   ^^^ |   |     =          /#####;
       s--6 0 2 4   1 3 5   |     8->l      hh  ^| hh
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
           h          |v         h
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
           h          ^|         h
       s    *         ||        *    s          l
        ; ==8=========80========8== /      ls   ^   sl
         *7                       1*        h;  |s /h
          =         g------>c<d   =          ;h |vh/
          = *----]a------>a>d ^   =           i####
          = |     ^       ^ t<*s  =           #   #<--------o<sI1
          = o<a e>e<o<a e>o<*     =         s>#   #-->l     ^
          = ^ ^^^   ^ ^^^   |     =       l<--#>l #<s       a<
          = a e *   a e *   |     =           #   #         m|
          = ^^^ |   ^^^ |   |     =          /#####;        d|
       s--6 0 2 4   1 3 5   |     8->l      hh  ^| hh       ^|
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
           h          |v         h
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
           h          ^|         h
       s    *         ||        *    s          l
        ; ==8=========80========8== /      ls   ^   sl
         *7                       1*        h;  |s /h
          =             g-->c<d   =          ;h |vh/
          = *----]a------>a>d ^   =           i####
          = |     ^       ^ t<*s  =           #   #<--s
          = o<a e>e<o<a e>o<*     =         s>#   #-->l
          = ^ ^^^   ^ ^^^   |     =       l<--#>l #<s
          = a e *   a e *   |     =           #   #
          = ^^^ |   ^^^ |   |     =          /#####;
       s--6 0 2 4   1 3 5   |     8->l      hh  ^| hh
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
           h          |v         h
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
           h          ^|         h
       s    *         ||        *    s          l
        ; ==8=========80========8== /      ls   ^   sl
         *7                       1*        h;  |s /h
          =         g------>c<d   =          ;h |vh/
          = *----]a------>a>d ^   =           i####
          = |     ^       ^ t<*s  =           #   #<--------o<sI1
          = o<a e>e<o<a e>o<*     =         s>#   #-->l     ^
          = ^ ^^^   ^ ^^^   |     =       l<--#>l #<s       a<
          = a e *   a e *   |     =           #   #         m|
          = ^^^ |   ^^^ |   |     =          /#####;        d|
       s--6 0 2 4   1 3 5   |     8->l      hh  ^| hh       ^|
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
           h          |v         h
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
#s# #s# #s#                   #s#     #s#                   #s#     #s#                   #s#   #s#                   #s#
### ### ###                   ###     ###                   ###     ###                   ###   ###                   ###
 *   *   *I74181               *       *                     *       *                     *     *                     *
 *   *   *                     *       *                     *       *                     *     *                     *
 *   *   *   *******************       *   *******************       *   *******************     *   *******************
 *   *   *   *       *         *       *   *       *         *       *   *       *         *     *   *       *         *
 *   v   *   *       w         *       *   *       w         *       *   *       w         *     *   *       w         *
 *   O   *   *       o         *       *   *       o         *       *   *       o         *     *   *       o         *
 *   *   *   *       *         *       *   *       *         *       *   *       *         *     *   *       *         *    ###
 *   *   *   * ******+*********+*******+***+*******+*********+*******+***+*******+*********+*****+***+*******+*********+****#s#"s0"
 *   *   *   * *     *         *       *   * *     *         *       *   * *     *         *     *   * *     *         *    ###
 *   *   *   * *     *         *       *   * *     *         *       *   * *     *         *     *   * *     *         *
 *   *   *   * *     *         *       *   * *     *         *       *   * *     *         *     *   * *     *         *    ###
 *   *   *   * * ****+*********+*******+***+*+*****+*********+*******+***+*+*****+*********+*****+***+*+*****+*********+****#s#"s1"
 *   *   *   * * *   *         *       *   * * *   *         *       *   * * *   *         *     *   * * *   *         *    ###
 *   *   *   * * *   *         *       *   * * *   *         *       *   * * *   *         *     *   * * *   *         *
 *   *   *   * * *   *         *       *   * * *   *         *       *   * * *   *         *     *   * * *   *         *    ###
 *   *   *   * * *   *   ******+*******+***+*+*+***+*********+*******+***+*+*+***+*********+*****+***+*+*+***+*********+****#s#"s2"
 *   *   *   * * *   *   *     *       *   * * *   *   *     *       *   * * *   *   *     *     *   * * *   *   *     *    ###
 *   *   *   * * *   *   *     *       *   * * *   *   *     *       *   * * *   *   *     *     *   * * *   *   *     *
 *   *   *   * * *   *   *     *       *   * * *   *   *     *       *   * * *   *   *     *     *   * * *   *   *     *    ###
 *   *   *   * * *   *   *     * ******+***+*+*+***+***+*****+*******+***+*+*+***+***+*****+*****+***+*+*+***+***+*****+****#s#"s3"
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
  ###             ###        ###          ###                       ###                     ###     ###       ###
  #l#             #l#        #l#          #l#                       #l#                     #l#     #l#       #l#
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


registerCircuit('4-bit CPU', `

0"A working 4-bit CPU. Full explanation with instruction set is further down."

  1                                llll"ALU out"
  3 0                              ^^^^
  g g                    ==========3210                                    g17 g18
  * *                    =         ||||                                    v   v
  * *   3210============ =         iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii14
  * *   ||||           = =         ^^^^                  ^^^^  ^^^^         ^^^^
  * *   ||||"registers"= =         ||||      "carr="     ||||  ||||         ||||
  * *   ||||"memor="   = =         ||||        g19>l     ||||  ||||         ||||
  * ***>iiiiilllli     = =         |||| 1   0g>i         ||||  ||||         ||||
  *-+-->i"r0"^^^^i<b<0 = =         |||| 0  13g>3         ||||  ||||         ||||
  * * *>iiiiiiii32 # = = =         |||| g   1g>0 g10  8g>a|||  ||||         ||||
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
  * **+>iiiiilllli # = = = =         iiiiiii12<a<g14
  *-+-+>i"r6"^^^^i<b = = = =         ^^^^ ^^^^
  * * *>iiiiiiii32 # = ==+=+=========3210 3210======
  * * * ^^^^       # =   = =          "B imm"      =
  * **+>iiiiilllli # =   = =                       =
  *---+>i"r7"^^^^i<b ====+=+=========3210          =
      *>iiiiiiii32 #     = =         ||||"A ind"   =
      * ^^^^       #     = =         iiiiiii12[g15 =
      g ||||       #     = =         ^^^^ ^^^^     =
      1 ||||"user" #     = ==========3210 3210===============3210
        iiiiiiiiii #     =                                   ||||      6g g5
        i"r8"^^^^i<b     =                                   ||||       * *
        ii12 SSSS  #     =          "jump"                   ||||"ABC"  v v
        ^^^^       #     =         ==3210                    iiiiiiiiiiii13
        iiiiiiiiii #     =         = ||||                    ^^^^ ^^^^ ^^^^
        i"r9"^^^^i<b     =         = iiiiiii12[g16           |||| |||| c|||
        ii12 sSSS  #     =         = ^^^^ ^^^^               |||| ||||  |||
        ^^^^       #     ==========+=3210 ||||          11   |||| |||| 1|||
        iiiiiiiiii #     =         =      ||||          1098 |||| |||| 2|||
        i"ra"^^^^i<b     =         =     2||||          gggg |||| |||| g|||
        ii12 ssSS  #     =         =     1||||"inc"     |||| |||| |||| ||||
        ^^^^       #     =         =     g||||"IP"      llll llll llll llll
        iiiiiiiiii #     =         =     *ii20<C        ^^^^ ^^^^ ^^^^ ^^^^
        i"rb"^^^^i<b     =         =      ^^^^          |||| |||| |||| ||||"instruction ROM"0
        ii12 sssS  #     =         =      ||||          |||| |||| |||| ||||"put program here"0
        ^^^^       #     =         =    *-*+++--------->bbbb#Bbbb#bbbb#bbbb"0 0000"
        iiiiiiiiii #     =         =    |*-*++--------->bbbb#BbbB#bbbb#bbbB"1 0001"
        i"rc"^^^^i<b     =         ="IP"||*-*+--------->bbbb#BbBb#bbbb#bbBb"2 0010"
        ii12 ssss  #     =         =    |||*-*--------->bbbb#BbBB#bbbb#bbBB"3 0011"
        ^^^^       #     =         = 0g>ii31            BBbB#bBbb#bBBb#bbbb"4 0100"
        iiiiiiiiii #     =         = 7g>iiii            bbbb#BBBB#bbBB#bBbb"5 0101"
        i"rd"^^^^i<b     =         = 2g>iiii            bBBb#bBbb#bbbb#bBbB"6 0110"
        ii12 ssss  #     =         =    ^^^^            bbBb#bBbb#bbbB#bBbb"7 0111"
        ^^^^       #     =         =    llll            bBBb#bBbb#bbbb#bBBb"8 1000"
        iiiiiiiiii #     =         =    ^^^^            bbBb#bBbB#bBBb#BBBB"9 1001"
        i"re"^^^^i<b     =         = 0g>ii31            BBBb#bbbb#BBBb#bbbb"a 1010"
        ii12 ssss  #     =         = 6g>iiii            bBBB#bBbb#bBbB#Bbbb"b 1011"
        ^^^^       #     =         = 1g>iiii            bbbb#bBbb#bbbB#bBBB"c 1100"
        iiiiiiiiii #     =         =    ^^^^            bBBB#bBBB#bBBb#Bbbb"d 1101"
        i"rf"^^^^i<b     =         =====3210            BBbb#BBBB#bBbb#bbbb"e 1110"
        ii12 ssss        =                              bbbb#bbbb#bbbb#bbbb"f 1111"
        ^^^^             =                                                 "      "
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

    "mux"            "4-bit 2:1 mux"                "4-bit 3:1 mux"                 "4-bit 4:1 mux"
    *** l         l     l     l     lI12           llll      s    sI13             llll      s      sI14
    * w ^         ^     ^     ^     ^              ^^^^      v    *                ^^^^      v      *
  s*+>a>oI      0>i   1>i   2>i   3>i              iiiiiiiii12    *                iiiiiiiii12      *
    *   ^1      = 1   = 1   = 1   = 1              ^^^^   ^^^^    *                ^^^^   ^^^^      *
  s*+>a**0      4>0   5>0   6>0   7>0         iiiiiii12<**++++*****           iiiiiii12<* iiiiiii12<*
    * ^         = ^   = ^   = ^   = ^         ^^^^ ^^^^   ||||                ^^^^ ^^^^ * ^^^^ ^^^^ *
    ***         = 8   = 8   = 8   = 8         ssss ssss   ssss                ssss ssss * ssss ssss *
      *         =====================8s                                                 *           *
      s         0123 4567                                                               *************
                ssss ssss


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

                  llll                                                      s sI23
                  ^^^^                                                      v v
                  iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii14
                  ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^
                  a<* a<* a<* a<* A<* A<* A<* A<* o<* o<* o<* o<* e<* e<* e<* e<*
                  ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ * ^ *
  0=1=2=3=4=5=6=7=0=4=1=5=2=6=3=7=0=4=1=5=2=6=3=7=0=4=1=5=2=6=3=7=0=4=1=5=2=6=3=7=============
  s s s s s s s s


 "1-bit reg. w. clock,"         "4-bit reg w. clock,"                "4-bit reg w. clock,"
 "enable and reset"              "enable and reset"                  "reset, enable & bus"
                  l
                  ^                 l   l   l   lI31                        "bus"
             ******                 ^   ^   ^   ^                           llllI32
             *    *               ==+===+===+===+=                          ^^^^
      "C"s***+***>c           "c"s0>i 0>i 0>i 0>i                      iiiiiii12<* llll"state"
             *    #           "e"s1>3 1>3 1>3 1>3                      ^^^^ ^^^^ * ^^^^
             *    Q<*         "r"s2>0 2>0 2>0 2>0                 =====3210 3210=+=3210
             *    d *               ^   ^   ^   ^                 =         |||| *
             *    ^ *               s   s   s   s               **+*********++++****s"en. r/w"
 "enable"s***+****+*+**I                                        * =         ||||
             * *  * * *3                                        v = s>iiiiiiii31
      "R"s***+*+**+** *0                               "en. w"s>a-+-->iiiiiiiiii
             * *  *   *                                           = s>iiiiiiiiii
             * ]a>o<a<*                                           =         ^^^^
             *  ^   ^                                             ==========3210
             ****   s                                                       ssss

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



