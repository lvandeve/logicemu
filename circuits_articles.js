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
This JS file contains various digital logic tutorials circuits,
and injects them into a dropdown from logicemu.js
*/

registerCircuitGroup('articles');

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


"S"s**>A>A******>l"Q"
       ^ ^ *
"E"s****  x
       v v *
"R"s**>A>A**

0"From this, a gated D latch could be made with an extra NAND as invertor:"

"D"s**>A>A******>l"Q"
     * ^ ^ *
"E"s*+**  x
     v v v *
     A>A>A**

0"But it's possible to do better and only use 4 NAND gates total as follows,"
0"making it cheaper than the earlier solution with NORs, ANDs and an inverter"

"D"s**>A**>A******>l"Q"
       ^ * ^ *
       * *  x
       * v v *
"E"s****>A>A**

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
0"would take 6 NAND gates (7 including the negation of the enable input) Its"
0"advantage is that all paths are as long, rather than variable length"


     ***>A****
     *   ^   *
     * ***   *
     * *     v
"D"s*+**>A**>A**>l"Q"
     *   ^   ^ *
     *   ****+**
     *   v   *
"E"s**>A>A****

0"Edge-triggered flip-flop"
0"------------------------"

0"Same as before: Two D-latches in a row, but now with only NAND gates:"


"D"s**>A**>A***>A**>A***>l"Q"
       ^ * ^ *  ^ * ^ *
       * *  x   * *  x
       * v v *  * v v *
       *>A>A**  *>A>A**
       A        *
       ^        *
"C"s*************


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

0"LogicEmu also supports controlled swap with its mux notation (M), but it has"
0"the wrong shape for what we want here so not used:"

      "c"
       s
       v
"a"s**>M**>l
       M
"b"s**>M**>l
       v
       l


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


0"Please note how 'antennas' are used to make some wires cross the chip,"
0"the --(i)-- wire passes through it."

"a"s********>i*******>l2
             i
"b"s**>i***( i )*****>l2
       i     i
"0"c**>i****>i*******>l 0"a xor b"
       i     i
"1"C**>i****>i*******>l 0"a xnor b"



3"Full Adder"
3"----------"

"a"s**>i****************************>l2
       i
"b"s*( i )**>i****************>i****>l2
       i     i                 i
"c"s*( i )*( i )**>i*** >i* **>i****>l 0"carry"
       i     i     i   x i x   i
"0"c**>i****>i****>i*** >i* *( i )**>l 0"sum"
       i     i     i     i     i
"1"C**>i****>i****>i****>i****>i****>l2


0"FIT:w"

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


0"FIT:w"

`, 'toffoli');





registerTitle('Relays');



registerCircuit('Relay Logic', `

0"Here, we simulate different types of relays, and build logic gates out of"
0"them."

    s
    *
    ***
    v *
  *>z*+**>l
  *   *
s** ***
  * * w
  **+>z**>l
    *
    ***
    v *
  *>z*+**>l
  *   *
s**   *
  *   w
  ***>z**>l



0"A relay is a controlled switch, originally working electromechanically (but"
0"optical versions exist): It has is a coil and a mechanical switch. When you"
0"send current through the coil, it becomes magnetic and attracts the switch."
0"The switch, due to that, moves to close a contact. This makes a connection"
0"between two terminal wires available at the relay. The magnetic (or optical)"
0"action ensures there is no electrical contact between the electric circuit"
0"used to control the coil and the electric circuit that goes through the"
0"switch. This isolation is very useful because it allows for example to"
0"control a high power circuit safely with a low power electronic switch."

0"Since they are controlled switches, relays can also be used to make logic"
0"circuits. The relay described above was a simple controlled switch that was"
0"open or closed, and that is called an SPST relay. You can also make the"
0"switch connect to a different contact in both of its states. Then you have a"
0"SPDT relay. You can also make the magnet control two (or more) independent"
0"switches. That gives a DPST or DPDT relay, or 4PDT etc... The diagram above"
0"is a DPDT relay."

0"Important note about the simulation!"
0"------------------------------------"

0"Relays actually require physical things that LogicEmu cannot simulate, but"
0"we use the following workarounds to fix that:"

0"*) the decoupling: Real relays physically decouple the 'coil' input from the"
0"   switch, magnetically or optically. Here we'll just implement it as"
0"   connected switches instead. It has no real effect on the logic gates we"
0"   make from the relays and we'll hide them in ICs anyway."

0"*) bi-directional wires: Relays are simple controlled switches that don't"
0"   care which direction current flows. However, in the simulation everything"
0"   is always uni-directional, like diodes. The workaround is: for many relays"
0"   defined below as IC templates, we make two versions: one for one"
0"   direction, and another for the reversed direction (having the relay 180"
0"   degrees rotated)."

0"*) tri-state logic: The open state of the relay is 'high impedance' rather"
0"   than 'zero' or 'one', a third state that exists in real life but is not"
0"   simulated in logicemu. However, as a workaround logicemu provides the 'z'"
0"   part, representing a tri-state buffer, and the relays are designed with"
0"   those. See the help for more information about this, but the gist is:"
0"   multiple z's can be connected to the same output wire, and a high signal"
0"   passing through any of them will be applied to the output wire."

0"*) electrically closed circuits: In real life, the relay's coil is activated"
0"   with current, which requires two endpoints of the coil connected to a"
0"   wire. In this simulation, voltage/current sources are not present since"
0"   they are implicit. There is no workaround needed for this, Just remember"
0"   in real life there is one more wire and it needs to be a voltage"
0"   difference to get current flowing to operate the coil."

0"IC Templates"
0"------------"

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
s**>z****>l

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
s**>z****>l

0"NOTE: the IC id of this one breaks the rule of using #inputs, #outputs in the"
0"name. The 9 represents the fact that it's an inverted output (9 being decimal"
0"complement of -1)"


0"SPDT relay"  0"SPDT relay flipped around"
0"----------"  0"-------------------------"

   Is                     Is
   1*                     2*
   2***                   1***
    v *                    v *
  *>z*+**>l            s**>z*+**
  *   *                      * *
s**   *                      * *>l
  *   w                      w *
  ***>z**>l            s****>z**

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
  *>z*+**>l         s**>z*+**                    *>z*+**>l
  *   *                   * *                    *   *
s** ***                 *** *>l                s** ***
  * * w                 * w *                    * * w
  **+>z**>l         s***+>z**                    **+>z**>l
    *                   *                          *
    ***                 ***                        ***
    v *                 v *                        v *
  *>z*+**>l         s**>z*+**                    **z<+***s
  *   *                   * *                    *   *
s**   *                   * *>l                l<*   *
  *   w                   w *                    *   w
  ***>z**>l         s****>z**                    ****z<**s

0"The DPDT relay (double pole, double throw) is in fact two SPDT relays"
0"controlled by the same coil."


0"4PDT relay"  0"4PDT relay flipped around"
0"----------"  0"-------------------------"

     s I                  s I
    ***4                 ***8
    v *8                 v *4
 *->z-+-->l           s->z-+-*
s*  %-w                  %-w *>l
 *--+>z-->l           s--+>z-*
    v-&                  v-&
 *->z-+-->l           s->z-+-*
s*  %-w                  %-w *>l
 *--+>z-->l           s--+>z-*
    v-&                  v-&
 *->z-+-->l           s->z-+-*
s*  %-w                  %-w *>l
 *--+>z-->l           s--+>z-*
    v-&                  v-&
 *->z-+-->l           s->z-+-*
s*    w                    w *>l
 *--->z-->l           s--->z-*



0"The 4PDT relay (double pole, double throw) is in fact four SPDT relays"
0"controlled by the same coil."

0"DPST (NO) relay"
0"---------------"

      s
      ***
      v *
  s**>z*+**>lI
        *    2
      ***    2
      v
  s**>z****>l

0"The DPST (normally open) relay is two SPST relays to a single coil."

0"DPST (NC) relay"
0"---------------"

      s
      ***
      w *
  s**>z*+**>lI
        *    2
      ***    8
      w
  s**>z****>l

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
        z     z
        *************>l

0"NOTE: remember those two z's on the bottom are not needed in real life. It's"
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
        z     z     z     z
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
        z     z
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
        z     z     z     z
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
        *   z
        *   *z<*
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
0"MODE:immediate"
`, 'relay_logic');














