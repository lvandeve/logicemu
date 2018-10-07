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
This JS file contains help circuits for viewing and editing,
and injects them into a dropdown from logicemu.js
*/

registerCircuitGroup('help');

registerCircuit('Welcome', introText, introId);

registerCircuit('Help Index', `0"List of help circuits. If this is your first time, the first one ('Main Help' under 'Viewing') is recommended."\n\nINSERT:toc_help`, 'helpindex');

registerTitle('Viewing');

registerCircuit('Main Help', `
0"LogicEmu Main Help"
0"------------------"

0"First of all, what is LogicEmu? It emulates logic circuits. It has a whole"
0"bunch of circuits included to play with, including binary adders,"
0"multipliers, flip-flops, NAND-only logic, and so on."

0"LogicEmu also allows creating new circuits, see the editing tutorials for"
0"more on that."

0"What is different from many other logic simulators it that this one is"
0"cell-based. This has as a side effect that the notation is not standard"
0"notation. On the other hand, this has as advantage that a lot of logic fits"
0"on a single screen and it's quite flexible. Also, each cell is an ASCII"
0"character, which has advantages for editing and sharing circuits."

0"It's a digital logic emulator, but not an electrical simulator. Power sources"
0"and voltages are abstracted away. Every component (gates, LEDs, even"
0"switches) implicitely have two connections to a power source with positive"
0"voltage and ground terminals, but these are not shown. The only wires shown"
0"are signals between components, which are always either 0 (false) or 1"
0"(true). Whether these have voltages or ground associated with them does not"
0"matter for the digital logic."

0"This help tutorial explains how to view and interact with circuits and all"
0"parts. See the next tutorials for different topics such as emulation"
0"algorithms, rendering and editing."

0"Note that this tutorial is multiple screens long, so scroll down to see all"


0"Input / Output / Wires"
0"----------------------"

0"In general, a circuit has input switches, some processing logic, possibly"
0"some state, and finally output LEDs. So the simplest circuit has a switch"
0"and a LED with a wire in between."

0"Toggle the switch (s) with the mouse to toggle the LED (l)".

s****>l

0"There are in fact 4 types of cells visible in the above circuit:"

s  0": the input switch which can be toggled with the mouse to output 0 or 1"

** 0": wire which connects things"

>  0": arrowhead: input from the wire to the LED"

l  0": the output LED"

0"A 'p' is a push button instead of a switch:"

p****>l

0"As you can see, the electrical circuits above are not closed. That is"
0"because we only simulate the logic here. Power sources and closing of"
0"the electrical circuit are implicit"

0"This switch is a simple component here, but in real life it would actually be"
0"quite involved: it needs a pullup/pulldown resistor (or be a SPDT switch)"
0"to toggle between the two voltages (and not float), and needs a"
0"debouncing circuit."

0"Wires can cross or split. If they cross, the signals don't interfere."

0"Wire split (indicated with a little dot at the connection, or * in text mode):"
0"The input switch activates all connected outout devices. This is also known"
0"as fanout."

    l
    ^
    *
    *
s******>l
    *
    *
    v
    l

0"Wire crossing (indicated with the wires rendered slightly disconnected, or a + in text mode):"
0"Both switch/LED pairs work independently and don't interact:"

    s
    *
    *
    *
s***+**>l
    *
    *
    v
    l

0"Diagonal wire crossing:"


           l     l
            ^   ^
s*** **>l    ; /
    x         x
s*** **>l    / ;
            /   ;
           s     s

0"Diagonal wire crossing at the arrowhead itself (causing 2 diagonal crossing inputs):"

s****** l
       >
s****** l

0"LEDs can also come in various different colors (using numeric digits)"


s*************>l0

s*************>l2

s*************>l3

s*************>l4

0"Logic Gates"
0"-----------"

0"Actual logic is done with logic gates. AND, OR and XOR gates are"
0"represented with the letters a, o and e respectively (e stands for"
0"exclusive or)"

0"AND gate: the LED only goes on if both input switches are enabled:"

s**>a**>l
    ^
s****

0"OR gate: the LED goes on if any input switch is enabled:"

s**>o**>l
    ^
s****

0"XOR gate: the LED goes on if any single input switch is enabled, but not both:"

s**>e**>l
    ^
s****

0"More theory about these logic gates is in several of the built-in circuits"
0"from the 'circuits' drop-down. This tutorial here is about viewing circuits"
0"with LogicEmu, while other circuits are tutorials for actual logic."

0"Inverted gates NAND, NOR and XNOR are indicated with capital letters"
0"instead of small letters. Respectively A, O and E."

0"NAND:"

s**>A**>l
    ^
s****

0"NOR:"

s**>O**>l
    ^
s****

0"XNOR:"

s**>E**>l
    ^
s****

0"A simple NOT gate can be done with O with a single input:"

s**>O**>l

0"3-input gates are also possible, and XOR gates then work like parity gates:"

s****
    v
s**>A**>l
    ^
s****

s****
    v
s**>e**>l
    ^
s****

0"0-input and 1-input gates are also possible. A 0-input AND gate outputs"
0"true due to the empty product:"

a****>l


0"There also exist negated inputs. Normal inputs are indicated with an"
0"arrow head, negated inputs instead with a little circle (or in text"
0"mode, that is m]w[ for NESW respectively):"

s**]l

0"For example logic gates can get negated inputs that way:"

s**]o***>l

s**]a***>l
    ^
s****

0"NOTE: In real life electronics, logic gates normally don't have such"
0"easy way of negating inputs and invertors are needed. In real life,"
0"what you will see more often, is circuits where a regular and a negated"
0"version of a signal runs through the whole system, like so:"

                  l
                  ^
                  o<*
                  ^ *
                *>a a<*
                * ^ ^ *
       %>O------*-+-+-+-------- 0"A'"
 "A"s--*----------+-*-+-------- 0"A"
       %>O--------+---*-------- 0"B'"
 "B"s--*----------*------------ 0"B"

0"To make gates with more than 3 inputs, their size can be increased"
0"In text mode, you can see that character '#' is used for this"

s**>e**>l
    #
s**>#
    #
s**>#
    #
s**>#

0"An example of combining multiple logic gates: The full adder:"
0"(NOTE: This is an example for the notation here. There are circuits explaining"
0"full adders included in the dropdowns above. If you do not know"
0"yet what a full adder means, just enjoy the response to the switches :)"


s**>a**>o**>l
   >    ^
s**>e**>a
       >
s******>e**>l


0"Flip-Flops"
0"----------"

0"This describes the built in 'flip-flop' devices. Note that, as in"
0"real life, all of these can be made from the logic gates above. It is"
0"very useful to have idealized built-in ones however. This tutorial"
0"only explains how to view them, see the flip-flop tutorial to get the"
0"description what flip-flops do and how they work."

0"A 'gate' with a 'c' instead of 'a', 'o', 'e' represent a single-input"
0"T flip-flop or counter (the c stands for counter here). Everytime the"
0"switch is toggle from off to on, the c toggles to the other state, so"
0"it halves the frequency of the signal. This is a component that keeps"
0"a state and is positive edge triggered"

s**>c**>l

0"Multiple of them makes a binary counter"

    l   l   l   l
    ^   ^   ^   ^
s**>c**>c**>c**>c

0"The c can also used as a 'constant' when it has no inputs (it then keeps"
0"its state forever, hence constant). A small 'c' is off, a large 'C' is"
0"on:"

c****>l

C****>l

0"Other gates without inputs, like o and O, could be used for this purpose"
0"but in most built-in circuits 'c' is chosen for consistency."

0"Real ideal flip-flops can be made from 'c', 'd', 'j', 'k', 't', 'q' and 'Q',"
0"and in this case the c stands for 'clock'. Here is how to interpret each letter:"
0"c: the clock input. When the clock input goes from low to high the flip-flop"
0"   will toggle if needed"
0"j: the S input for SR flip-flop or the J input for JK flip-flop"
0"k: the R input for SR flip-flop or the K input for JK flip-flop"
0"d: the D input for D flip-flop"
0"t: the T input for T flip-flop"
0"q: output, or asynchronous S input. Note that c, j, k, d and t can also already"
0"   be used as outputs"
0"Q: negated output, or asynchronous R input"
0"Most other parts will also output signal so using q and Q is not required for that."
0"These parts can be combined in any way, with # (visible in text mode) as filler"

s**>c**>l
    #       0"D flip-flop: when triggering c, the output will remember the state of d"
s**>d


s**>c**>l
    #       0"D flip-flop: when triggering c, the output will toggle if t is on"
s**>t


s****
    v
    j#q**>l
s**>c##     0"Serves as SR or as JK flip-flop"
    k#Q**>l
    ^
s****


s**>q**>l
    #      0"SR latch: no clock, output remembers single switch"
s**>Q**>l


s-->c-->l
s-->t-->l
s-->d-->l
s-->j-->l 0"All parts combined in 1 flip-flop (not realistic but possible)"
s-->k-->l
s-->q-->l
s-->Q-->l

0"So to summarize, the 'c' and 'C' can actually mean three different things:"
0"-counter: when standalone with an input"
0"-constant: when standalone without an input"
0"-clock: when combined with other flip-flop cells like j, k, ..."

0"Integrated Circuits"
0"-------------------"

0"An integrated circuit or chip needs to be defined only once, and can then be"
0"reused in multiple places. It is defined by having an 'I' next to it"
0"and is used with a small 'i'. To define multiple chips, numbers are"
0"used to distinguish them."

0"Here is a full adder chip defined and labeled with number 12"


               I12
               l
               ^
               *
     l<****o<a e *****s
           ^ ^^^/
           a e *
           ^^^
           * *
           * *
           s s

0"And here we use multiple instances of chip 12:"


      l                 l   l   l   l
      ^                 ^   ^   ^   ^
      |                 |   |   |   |
 l<-i12<-s         l<-i12<i12<i12<i12<-s
    ^ ^               ^ ^ ^ ^ ^ ^ ^ ^
    | |               | | | | | | | |
    s s               s s s s s s s s

0"Chips support recursion, one chip can be used in the definition of another"
0"Here we are defining chip number 24 as two connected 12's, and using it"


       l   l
       ^   ^                    l l
       |   |                    ^ ^
  l<-i12<i12<-sI24            l<i24#<s
     ^ ^ ^ ^                    ^^^^
     | | | |                    ssss
     s s s s


0"Special devices"
0"---------------"

0"The delay (or buffer), indicated with 'd', introduced a 1-tick delay"

s-->d-->l


s-->d-->d-->d-->d-->d-->d-->d-->d-->l

0"A timer 'R' blinks with a certain speed. It can also be toggled on and off with the mouse."
0"The speed is given in tenths of a second, and the total period is twice that."
0"If no number is given, the default is 0.5 seconds to toggle (so 1 second full period)."

 10R------>l


  2R------>l


  5R------>l

0"A small 'r' means it's initially not on and must be toggled on with mouse"


  5r------>l

0"An RGB LED 'L' takes a red, green and blue input:"

2"B"s--->L<---s0"R"
         ^
         |
         |
         |
         s
        "G"

0"A terminal can display ASCII characters to a screen and read them from"
0"the keyboard. If it has a blinking cursor, you can type in it. The"
0"EOF LED indicates that nothing was typed or everything types was"
0"already output. If there is no blinking cursor, click it with the"
0"mouse first, then you can type in it"

                lllllll0"ASCII output, from keyboard"
   2"output"    ^^^^^^^
 2"keyboard"    |||||||
    2"ASCII"p-->TTTTTTT<--p0"read ASCII from"
                TTTTTTT    0"input switches to"
       "EOF"l<--TTTTTTT    0"screen"
                TTTTTTT
                ^^^^^^^
                |||||||
                SsssssS0"ASCII input, to screen"
                       0"1000001 = letter A"

0"Without read/write flags, it can instead display or read decimal numbers"

         TTTTTTTT"decimal"
         ^^^^^^^^
         ||||||||
         sSsssssS"binary"

         llllllll
         ^^^^^^^^
         TTTTTTTT

0"A ? is a random generator. It starts with a random initial value. If it"
0"has inputs it will change to a random value on any positive or negative"
0"edge of the input."

?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l

s-->?-->l

p-->?-->l

R-->?-->l
1

0"A ROM, indicated with 'b' for off and 'B' for ON bits, can contain"
0"binary information. The mouse can toggle b's"

           0"output"
           lllll
           ^^^^^
  0"select"|||||
    s----->bbBbB
    s----->bBBbB
    s----->BbbbB
    s----->BbBbB
    s----->bBBbB


0"A RAM is like a writable ROM:"

           0"output"
           lllll
           ^^^^^
  0"select"|||||
    s----->bbBbB<----p0"write"
    s----->bBBbB
    s----->BbbbB
    s----->BbBbB
    s----->bBBbB
           ^^^^^
           |||||
           sssss
           0"data input"

0"A ROM and RAM can use binary addressing instead of unary select. A"
0"RAM can also have invisible bits this way. This RAM has 16 lines."
0"The invisible ones are initially zero but it will remember once you write 1 bits"
0"to them"

           0"output"
           lllll
           ^^^^^
 1"address"|||||
 "8"s----->bbBbB<----p0"write"
 "4"s----->bBBbB
 "2"s----->BbbbB
 "1"s----->BbBbB
           bBBbB
           ^^^^^
           |||||
           sssss
           0"data input"

0"A thin line of b's can also make devices with different behavior"

   "76543210"
    llllllll
    ^^^^^^^^
    ||||||||
    bbbbbbbb 0"binary to unary"
         ^^^
         |||
         sss
        "421"


        "421"
         lll
         ^^^
         |||
    bbbbbbbb 0"unary to binary"
    ^^^^^^^^
    ||||||||
    ssssssss
   "76543210"


   "76543210"
    llllllll
    ^^^^^^^^
    ||||||||
    bbbbbbbb 0"priority select (highest input)"
    ^^^^^^^^
    ||||||||
    ssssssss
   "76543210"


0"Tri-state buffers, indicated with 'V' (that is capital V), allow multiple"
0"devices to output to the same wire, something that normally is not allowed"
0"and would normally create a conflict."

0"Our simulation does not support three states, but the tri-state buffer's"
0"behavior tries to be as close to real-life as possible. All tri-state"
0"buffers can output their signal to the wire, but you should have only"
0"one active at the time. Multiple active at the same time could create a"
0"short in real life, but that is not simulated here. In real life, one"
0"may be active and output a signal to the shared wire, and all others"
0"must have 'floating' state. This 'floating' state is the same as '0' in"
0"the simulation, in real life it's a 'third' state."

0"In the circuit below, you can activate exactly one tristate buffer at"
0"the same time thanks to using pushbuttons (can't press more than one"
0"with a single mouse cursor), so this one cannot create a short in"
0"real life. Enabling multiple 's' switches is ok, that is just the"
0"signal passed through if the corresponding tristate buffer is selected."

     p
     v
 s**>V***
        *
     p  *
     v  *
 s**>V***
        *
     p  *
     v  *
 s**>V******>l


0"Multiple single-input 'V's can also be used to OR multiple wires together"
0"where in real life you would need no gate at all there or diodes would have"
0"sufficed. Again, the simulation cannot simulate that, connecting multiple"
0"wires from different devices together would result in an error (because inconsistency"
0"is possible where one device outputs ground, andother positive voltage, to it. Aka a short)."
0"One solution would be use an OR gate, but the 'V' is available instead"
0"simply to indicate: 'in real life, no gate is needed here.'"
0"It has the same effect as OR in the simulation, but the notation indicates"
0"the intended meaning better."

    s           s            s
    *           *            *
    *           v            *0"this one indicates error, but in real life this can be"
    v           V            *0"fine, depending on what the switches are connected to"
s**>o**>l   s*>V***>l    s********>l
    ^           V            *
    *           ^            *
    *           *            *
    s           s            s

0"So in conclusion, if you see a 'V' it means: the simulation has limitations here"
0"because it cannot represent tri-state logic or floating wires. Let use use a 'V'"
0"to show how you could make this circuit in real life without gates or with a"
0"tristate buffer. In the simulation, the V acts as an AND gate and multiple V"
0"outputs together are OR-ed, but in real life you need neither the AND nor the OR,"
0"you need a tristate buffer instead of the AND, and nothing at all (just connect"
0"wires together) instead of the OR. In real life you also must make sure only one"
0"V at the time is anything other than 'floating' to avoid a short."

0"As far as the simulation is concerned, here is what V's correspond to (but"
0"this is not what it corresponds to in real life since the below allows"
0"to easily make shorts):"

s****                      s****
    v                          v
s**>V**                    s**>a**
      *                          v
      *>l 1"corresponds to"      o>l
      *                          ^
s**>V**                    s**>a**
    ^                          ^
s****                      s****


s**>V**                    s******
      *                          v
s**>V**>l 1"corresponds to"s****>o>l
      *                          ^
s**>V**                    s******

0"The built-in circuit where these V's are used the most, is the one named 'Relay Logic'"


0"Special wires"
0"-------------"

0"Buses are a bundle of wires. Matching numbers of the bus connect to"
0"corresponding inputs and outputs. This allows to save a lot of space."


                                     llllllll
                                     ^^^^^^^^
s---0y                   y0--->l     ||||||||
s---1y                   y1--->l     76543210
s---2yyyyyyyyyyyyyyyyyyyyy2--->l     yyyyyyyy
s---3y                   y3--->l     01234567
s---4y                   y4--->l     ||||||||
                                     ssssssss

0"Wire connections without number to buses are still part of the bus,"
0"e.g. this wire crossing lets two entire buses cross:"


               y2-->l
               y1-->l
               y0-->l
               y
s---0y         y         y0--->l
s---1y         |         y1--->l
s---2yyyyyyyyy-+-yyyyyyyyy2--->l
s---3y         |         y3--->l
s---4y         y         y4--->l
               y
               y2---s
               y1---s
               y0---s


0"Global wires, indicated with 'g', are all connected to each other."
0"If there is a number, then to all other matching numbers. This can be"
0"used e.g. for a global clock signal or other such control signals."
0"Imagine it as being connected by wires on the backplane"

                g----->l

s---g           g----->l

s---g0         1g----->l

s---g1         0g----->l

                g----->l



0"Antennas are another form of 'backplane' wires, connected to the corresponding 'dish'"
0"they're aimed at. Calling them 'antennas' or 'wireless' is just a metaphor."
0"These provide another way to reduce clutter, and are especially useful"
0"for large wrap-around circuits (see the built-in cellular automata circuits)."

          l
          ^
s--(      |       )--->l
          s
s-----*
      n



      u
l<----*

0"Antennas can make wrap-around circuits:"

   nnnnnnnn
  (;       )
  ( s      )
  (        )
  (->l  s--)
  (        )
  (     l  )
  (      < )
  (       ;)
   uuuuuuuu


0"Epilogue"
0"--------"

0"The end, see the next tutorials for more information, such as about"
0"the different tick algorithms, rendering modes, editing, ..."

0"INSERT:toc_help"

0"RENDER:graphical"

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`, 'mainhelp');


registerCircuit('Ticks and Emulation Algorithms', `
0"Ticks and Emulation Algorithms"
0"------------------------------"

0"It matters how you emulate circuits: when, how and how fast gates read their"
0"inputs. For some circuits, it's interesting to look at the signal propagating"
0"through individual gates, for others global fast response is more desired."
0"For that reason there are multiple emulation algorithms."

0"E.g. the following circuit is most interesting in 'electron mode'. If you hit"
0"the button, you see the signal go round and round. In a fast mode, that would"
0"not be visible, but this circuit will initially load in electron mode."


p**>e>e>e>e>e>e>e>e
    ^             v
    e             e
    ^             v
    e             e
    ^             v
    e<e<e<e<e<e<e<e

0"The simulation is based on ticks: Each tick, components update their value"
0"based on their input components. Normally, the ticks run automatically. You"
0"can pause the simulation by pressing the pause button. If the simulation is"
0"paused, you can do a single tick with the tick button. If the simulation is"
0"not paused, ticks happen automatically every so many milliseconds. If there"
0"are realtime timers in the circuit, those will also cause a tick whenever"
0"they toggle. Clicking switches and pushbuttons with the mouse will also give"
0"an immediate tick, even if the simulation is paused."

0"Note that if the simulation is paused, and you press a switch or pushbutton,"
0"it may happen that you don't see the full effect you expected of your click."
0"This happens if multiple ticks are needed to update all due to gate delays"
0"while clicking a switch causes only one tick if the simulation is paused."
0"Press the tick button a few times, or unpause, or choose a different"
0"emulation algorithm (see below) to fix that."

0"There are different emulation algorithms available for circuits (aka update"
0"modes, what it does per tick). These can be selected by the dropdown with the"
0"following choices:"
0"*) combinational: a single update propagating through all components in a"
0"   sorted order is done only once when you press a switch or button or when a"
0"   timer ticks. This mode works well for circuits that do not have any loops"
0"   (that is, components whose input might be determined directly or"
0"   indirectly through other components by this component's output state) nor"
0"   delays"
0"*) sequential: an update propagating through all components is done"
0"   automatically every so many milliseconds. This mode is needed when there"
0"   are loops or delays, because in both these cases a single update is not"
0"   sufficient to reach the final state. Some circuits may even change state"
0"   forever, and the sequential mode is perfect for that."
0"*) electron: updates are done every so many milliseconds, but this update is"
0"   different than the update done for combinational/sequential. Instead,"
0"   every component updates only based on the previous state of its input"
0"   components. This means signals propagage more slowly, as if you can follow"
0"   the electric signal itself. This mode is good for circuits that build"
0"   flip-flops from primitive components (rather than using the built-in ideal"
0"   flip-flops) This mode also adds one more extra igredient: it adds some"
0"   randomness to a particular kind of double-linked loop as you find in an SR"
0"   latch, and this is loosely based on realistic physics of a flip-flop in"
0"   metastable state eventually reaching a stable state anyway. So indeed the"
0"   electron mode is mainly designed to simulate such behavior in a realistic"
0"   way. The sequential mode is good and fast but can't simulate"
0"   matastability, hence the reason to provide the slower 'nanosecond level'"
0"   electron mode."
0"*) investigate: similar to electron, but it only updates when you press the"
0"   tick button, which allows to see how everything updates at any pace. Note"
0"   that investigate is to electron mode what combinational is to sequential"
0"   mode. You can use combinational mode as a way to investigate sequential"
0"   circuits. The randomness feature of electron mode is disabled for"
0"   investigate."


0"A circuit, when just loaded, will automatically be in one of the modes that"
0"is most suitable for the circuit: if there are no loops, it'll choose"
0"combinational mode. If there are particular types of short loops, electron"
0"mode. In other cases with loops, sequential mode. A mode may also be enforced"
0"with a comment like this, which in this circuit sets it to electron"
0"initially:"

"MODE:electron"

0"Now for some demonstrations of the difference between the modes. Use the"
0"dropdown to switch to the algorithm applicable for each example as explained"
0"by its description:"

0"With the circuit below, try the 4 modes: with combinational and sequential,"
0"the LED updates immediately to the state of the switch. With electron, you"
0"can see the signal propagate through the gates. With investigate, you must"
0"manually press the tick button to have the signal propagate through each gate"


s->o->o->o->o->o->o->o->o->l

0"The circuit below goes slow in sequential mode too, because 'd' are delays"
0"which are designed to work per sequential tick on purpose. In combinational"
0"mode, you now have to press the tick button (or the 's') manually multiple"
0"times to make it advance now since combinational does only one update when"
0"you press the switch:"

s->d->d->d->d->d->d->d->d->l

0"Below is a 4-bit adder circuit. A circuit like this works in combinational"
0"mode and does not need the more expensive sequential mode. There are some"
0"long connections that go through many gates, but none of them are loops. Try"
0"it in all 4 modes to see what happens: combinational and sequential work the"
0"same. Electron gives slower updates so you can see the adder operating but"
0"it'll reach the correct answer soon. Investigate requires pressing tick"
0"several times yourself before you get the correct sum:"


                  "8       4       2       1"
                   l       l       l       l
                   ^       ^       ^       ^
             **a<*>e **a<*>e **a<*>e **a<*>e
             v ^ * ^ v ^ * ^ v ^ * ^ v ^ * ^
"carry out"l<o **+***o **+***o **+***o **+***s"carry in"
             ^   *   ^   *   ^   *   ^   *
             a<*>e   a<*>e   a<*>e   a<*>e
             ^ * ^   ^ * ^   ^ * ^   ^ * ^
             **+**   **+**   **+**   **+**
               * *     * *     * *     * *
               s s     s s     s s     s s
             "b8 a8   b4 a4   b2 a2   b1 a1"

0"However, for a circuit with a loop, you need at least sequential mode."
0"Here is a very simple example: When you turn the switch from 'off' to"
0"'on', the counter will disable itself a tick later. But if you do that"
0"in combinational mode, after pressing the switch, the LED will remain on"
0"as if the disabling does not happen. Press the 'tick' button to see it"
0"happen. This example is very simple, a more important case is for example"
0"when there is memory, then some computation happens on the memory, then"
0"the result is stored back into the original memory."

    ***
    v *
s**>c**>l

0"Another example of something that needs sequential mode is the delay."
0"if you enable the switch in combinational mode, you'll never see the"
0"final state of the delay unless when using the 'tick' button"


s**>d**>l

0"An example of something that requires electron mode is a 1-tick pulse made"
0"from gate delays (without using 'd' but regular gates). In electron mode,"
0"this will pulse once when activating the switch. In fast modes, it'll just"
0"stay off."

p****>o**]a**>l
    *     ^
    *******

0"Another electron example: in electron mode, the signal you make with"
0"the switch will loop around in a much nicer way than in sequential mode, and"
0"of course combinational mode does not support the looping at all without"
0"manually ticking. You can make a neat shape that goes round and round"
0"in electron mode here by briefly enabling the switch, but when you then"
0"enable sequential mode it may be destroyed. Also, if you want manual"
0"ticking, the 'investigate' mode here preserves the signal better than"
0"'combinational' mode."

p**>e>e>e>e>e>e>e>e
    ^             v
    e             e
    ^             v
    e             e
    ^             v
    e<e<e<e<e<e<e<e

0"Here is a circuit that shows the most interesting behavior in electron mode."
0"The two NOR gates each want the opposite, so the circuit keeps blinking. If"
0"you enable the switch, you end the conflict. You may notice that when"
0"enabling the switch, the circuit 'settles' for a while and then ends up at a"
0"random result (enable electron mode to see it, try a few times and it'll"
0"settle to different random results). This random result does not depend"
0"purely on the time you press the switch. There is some true randomness built"
0"in the simulation (only in electron mode) to resolve this circuit. This"
0"circuit here just demonstrates it. The real purpose of this feature is to"
0"make flip-flops made from primitive gates to work as they do in real life."
0"Without the random settling, such flip-flops would not work but keep blinking"
0"between two states. But in real life, such ideal behavior does not happen and"
0"the flip-flops settle to some arbitrary state, and that is emulated with the"
0"randomness here too."


          O-*
          ^ |
  s------>e<*--->l
          v |
          O<*

0"The randomness is not present in combinational or sequential mode. Due to the"
0"way those algorithms work, such loopy circuits settle to a well defined state"
0"immediately. The electron mode is physically more realistic, but slower."

0"FIT:x"

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`, 'algohelp');



registerCircuit('Rendering Modes', `
0"Rendering Modes"
0"---------------"

0"There are two rendering modes: text (ASCII) and graphical (HTML5 canvas)."
0"They can be selected with a dropdown in the top menu."

0"The graphical mode draws nice wires, boxes around components, device"
0"inputs as neatly drawn arrows and negated inputs as little circles."
0"This is the default mode."

0"The text mode on the other hand draws everything with ASCII characters,"
0"matching how you edit circuits. Gates use the similar letters as the graphical"
0"mode, but now every cell uses some ASCII character, e.g. wires are broken up"
0"into different characters (depending on direction, how to connect, ...)."
0"To learn the meaning of the characters, see the editing tutorials instead."

0"The text mode may render faster in some browsers, especially for huge circuits."

0"Try out the two modes on the circuit below by changing the dropdown at"
0"the top between 'graphical' and 'text':"

      l   lll
      m  lzzZl
      |   |ll  ####
   p--+---%--->l###   l
      |   |           ^
s---*******--->e>l** *|*>T
      v       >     x X
s---->a-****-->a>l** *|*>l1
      |  ***          s
    s-hl ***     l
      l     ;   ^
             ; /
              *

0"You can also zoom in and out with the - and + buttons, and change the color scheme."
0"These controls, too, are in the top bar."

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`, 'renderhelp');


registerCircuit('Loading Circuits', `
0"For loading circuits, there are multiple options:"

0"1. Navigation"
0"-------------"

0"First of all, you can load the built-in circuits, like this help one right"
0"here, with the dropdowns navigation at the top, or the welcome page links."


0"2. Importing (Source Code)"
0"--------------------------"

0"A second method, to load external circuits, is to load a circuit with 'import'"
0"(or 'edit'). Then you need to get the source code from a circuit and paste it"
0"in the box. You can view the source code of circuits yourself with the 'edit'"
0"button (see the editing tutorials for that)."
0"Source code of a circuit looks for example like this:"

0"s--->a---->l"
0"     ^      "
0"s----*      "

0"It becomes this when loaded:"

s--->a---->l
     ^
s----*


0"3. base64 URL code"
0"------------------"

0"A third method is through a base64 code in the URL. This uses a fragment"
0"'#code=...' in the URL, and will decompress that base64 string to a circuit."
0"For example something like this (all those characters after 'code=' are the"
0"base64 code):"

0"lodev.org/logicemu/#code=0AHMtLS0-YS2BBmwKIIEBXgqBFC0qCg"

0"Note that those codes contain the entire circuit encoded inside of them and"
0"are decoded locally in the browser, these are not codes used by a web server"
0"or cloud (since LogicEmu doesn't use those) and they do not require online"
0"connectivity. Those 'fragments' aka 'hashes' (#) of URLs are not sent to any"
0"server by the browser."

0"Sharing this URL is also a way to share your own edited circuits, although it"
0"looks worse (no nice circuit shape visible) and there may be limitations on"
0"URL length (it's capped, huge circuits and especially those with lots of text"
0"instead of circuitry will not compress well)"



0"4. URL id"
0"---------"

0"A fourth method is through an id in the URL. This works only for built-in circuits."
0"If you see '#id=....' in the URL, it means you can load that circuit directly"
0"from that URL, rather than see the main welcome page first. For example:"

0"lodev.org/logicemu/#id=logic_gates"

0"These ids are built-in and known offline by LogicEmu (for the offline built-in"
0"circuits), they are not sent to any web server or cloud and require no internet"
0"connectivity."

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`, 'loadinghelp');


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

registerTitle('Editing');

registerCircuit('Editing Tutorial', `
0"This tutorial introduces all the parts and cell characters for editing."

0"Editing is done with ASCII text. The simulation is cell based: Every"
0"character is a cell. Cells contain wires, parts, and so on. Devices"
0"can span multiple cells, e.g. a long wire, an enlarged AND gate, ..."

0"In fact, to show better how circuits are built in this editing tutorial,"
0"we force text rendering mode instead of graphical here with the following"
0"command:"

"RENDER:text

0"Editing can be done in the browser here with the 'edit' button in the top bar."
0"It is possible and more pleasant to do the actual editing itself of that circuit"
0"from the text field in a good plain text editor (one that supports block"
0"selection). Then paste the finished circuit back in the box to try it out"

0"Try out the edit button here: You can change the AND gate below into an OR gate,"
0"by turning the 'a' into an 'o'. Press the 'edit' button, find this"
0"and gate in it, change the a into an o, and press 'done'."

s**>a**>l
    ^
s****

0"Note how not only that logic gate but also this text itself was in there. That is"
0"because this whole page including all text is a circuit you can edit!"

0"Once you edited a map with the 'edit' button, it is saved in the local storage"
0"of the browser (but not sent to the internet nor shared, it's just local on"
0"your machine). If you reload the page, at least without any hash tags (#id"
0"or #code) in the URL, you will get back the edited circuit instead of the"
0"regular welcome page. Use the 'forget' button to remove it."

0"Note that local storage is unreliable, save circuits for example to your disk"
0"with a text editor instead to safely keep them (or use version control, ...)."

0"In addition, when you edited a map, there may be a '#code=...' code in the URL."
0"This is a local-only (not on a server) base64 code containing the entire circuit"
0"compressed inside of it. You can use this URL as an alternative way to share circuits,"
0"although it is less good looking and less reliable than sharing the actual ASCII circuit."
0"The code is not present if the circuit is too big for a reasonable URL length."

0"Instead of the 'edit' button, you can also use the 'import' button to load an"
0"edited circuit. The difference is with the import button it doesn't show the"
0"code of the current circuit, it's simpler to just import with it."

0"That explained how to actually edit, most of the rest of this tutorial describes"
0"all the different parts and ASCII characters, their bahavior and how to use them"
0"to make the circuits you want."

0"The most simple circuit that does something is a switch connected to a LED:"

s**>l

0"There are in fact 4 types of cells visible in the above circuit:"

s  0": the input switch which can be toggled with the mouse"

** 0": wire which connects things"

>  0": arrowhead: input from the wire to the LED. For other diretions,"
   0"  use ^>v< for north, east, south, west respectively"

l  0": the output LED"

0"From here on all those and much more cell types are introduced one by one."

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION I: input/output/wiring"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"NEW PART: wires"
0"*: wire, wire split, wire corner."
0"-, |: horizontal and vertical wires"

0"They don't do much below since they're not connected to anything here:"

          |        *-----
          |        |
-------   |    ----*       ********
          |        |
          |        *-----

0"NEW PART: switches"
0"s, S: initially off and initially on switch"

0"Switches can be toggled with the mouse. They produce a logic signal traveling"
0"through the output wires when on."
0"In real life this would make no sense, as an electrical circuit must be closed."
0"However, in this simulation (and, in fact, logic diagrams in general) it makes"
0"perfect sense: only signal wires are shown, wires to power sources or for closing"
0"the circuit are hidden, no need to draw them, they are implicit."

0"Click the green switches with the mouse to toggle them"

          *
s******   *
          S

0"NEW PART: device inputs"
0"^, >, v, <: north, east, south, west device inputs"

0"these arrow heads connect a wire to the input side of devices"
0"such as logic gates and LEDs. While not introduced yet, below we use an 'o'"
0"diode to demonstrate them best. A wire directly connected to some device is"
0"an output of that device, while when connected with an arrowhead it's an input."
0"so the signal below goes from the switch s to the o and then from the o to the l:"

s****>o****>l

0"NEW PART: LED"
0"l: LED/light (user output)"

0"The LED serves as outputs, to indicate the result. Here of course it's used"
0"on the simplest possible circuit so all the result shows is the same as the"
0"input switch. This is considered a full circuit though: with both an input and"
0"an output. It's not closed, like a real electric circuit, because wiring to"
0"power sources is implicit."

s****>l   S****>l

0"NEW PART: push button"
0"p and P: initially off and initially on push button"

0"these toggle back to original state when releasing the mouse button"

p****>l   P****>l

0"This switch will only leave through the push button signal if the switch is on itself"

p**>s**>l

0"NEW BEHAVIOR: controlled switch"

0"A switch or pushbutton with an input will only work if its input is on:"

s****>s***>l

p****>s***>l

s****>p***>l

0"NEW PART: wire crossing"
0"+: wire crossing, x: diagonal wire crossing"

0"The wire crossing allows two independent signals to go through"

     s
     *
     *
s****+****>l
     *
     *
     v
     l

s**** ****>l
     x
s**** ****>l

0"NEW BEHAVIOUR: wire and device packing"

0"-| can be packed closer together than *, because * would touch on all sides"
0"Different devices (here l and s) also don't interact if they touch, they are individual LEDs and switches"
0"The circuit with * instead of -| operates as one because those *'s are all connected"

          lll
          ^^^
s----->l  |||     *****>l
s----->l  |||    s*****>l
s----->l  |||     *****>l
          |||
          sss

0"NOTE: for style reasons, most built-in circuits use '*' for most wires"
0"with some distance bewteen them and only use --- or | for close packing when"
0"really needed. This is purely up to personal preference though."

0"NEW PART: comments"
0"double quote: encloses comment, numbers: alter alignment"

0"Comments, like this text here, are made with double quotes."
0"The comment starts at a quote and ends at the next quote on the same line."
0"A number before the first double quote (or alternatively after the last)"
0"can also enable aligned text."
0"Below the different types of alignment are shown. The quotes themselves are not"
0"visible in the rendering (not even in text mode), only in the source code, so use"
0"the 'edit' button to see this part"

"In quotes: regular comment, 1 character per cell"

0"In quotes with 0 prepended: left aligned narrow width"

1"In quotes with 1 prepended: center aligned narrow width"

2"In quotes with 2 prepended: right aligned narrow width"

3"quotes with 3: 1 char per cell, shifted left a bit"

4"quotes with 4: 1 char per cell, shifted right a bit"

0"NEW PART: isolators"

0"(space), @ and comments: isolators, do not connect anything, no signal goes through"
0"Normally space is used as isolators. @ can be used to indicate shapes, such as drawing"
0"a case around something."
0"Comments are isolators, no matter what is inside them (even if commented-out circuits)"

@ @ @ @ @ @ @ @ @ @

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION II: logic gates"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"


0"NEW PARTS: logic gates OR, AND, XOR"
0"o: OR gate, a: AND gate, e: XOR gate"

0"These devices operate on 2 (or any other amount of) inputs. The 'e' of XOR"
0"stands for Exclusive or."

s****      s****      s****
    v          v          v
s**>o**>l  s**>a**>l  s**>e**>l

0"NEW PARTS: logic gates NOR, NAND, XNOR"
0"O: NOR gate, A: NAND gate, E: XNOR gate"

0"These are similar but with inverted outputs."

s****      s****      s****
    v          v          v
s**>O**>l  s**>A**>l  s**>E**>l

0"NEW PARTS: inverted device inputs"
0"m, ], w, [: north, east, south, west facing inverted inputs"

0"These invert the input signal, and will be rendered with a small circle in graphics mode."

s****]l   S****]l

s****      s****      s****      s****      s****      s****
    w          w          w          w          w          w
s**]o**>l  s**]a**>l  s**]e**>l  s**]O**>l  s**]A**>l  s**]E**>l

0"NEW BEHAVIOR: multi-input gates"

0"Gates can have more than two inputs, for example three below, more is possible"
0"if the gate would be large enough, how to do that is introduced a bit further (extending with # or $)."
0"Note that multi-input XOR gates act as parity gates"

    s          s          s
    *          *          *
    *          *          *
    v          v          v
s**>o**>l  s**>a**>l  s**>e**>l
    ^          ^          ^
    *          *          *
    *          *          *
    s          s          s

0"Gates can also work as expected with just 1 input."

s**>o**>l       s**>O**>l

s**>a**>l       s**>A**>l

s**>e**>l       s**>E**>l

0"Gates can also work as expected with 0 inputs, and that includes the 0-input AND"
0"gate outputting a signal and the NAND gate not outputting a signal. The reason"
0"an AND gate with 0 inputs outputs a value, is because the rule of an AND"
0"gate is: it outputs when it does not have any 'off' inputs. This is also"
0"known as the empty product"

o**>l       O**>l

a**>l       A**>l

e**>l       E**>l

0"NEW BEHAVIOR: NOT gate"

0"A NOT gate can be made in several ways from the existing parts. The"
0"recommended form is with a one-input NOR gate:"

s**>O**>l

0"but depending on the situation, you may find yourself using inverted device"
0"inputs, NAND gates, and so on instead"

s******]l

s**>A**>l

s**]o**>l

0"NEW BEHAVIOUR: rules for wire with multiple devices"

0"A single wire can output to multiple devices. Note that we call the entire"
0"connected wire shape a single wire in the simulation's terminology."
0"In the internals of the simulation, the entire wire, with all splits and arrow heads,"
0"is actually an extension of s (its output), and internally part of s."

s*********>l
      *
      ****>l
      *
      ****>l

0"But multiple different outputs inputting to the same wire is an error"
0"As seen above, the wire is an extension of the part it outputs from. So here it would be three"
0"different switches at the same time, which is of course impossible."

s*****
     *
s*****
     *
s*********>l

0"If you do want to output multiple devices to 1 wire, use an OR gate,"
0"(or as seen further, a tristate buffer)"

s*****
     v
s***>o
     v
s***>o****>l

0"NEW PART: device extender"
0"#: device extender, $: noninteracting device extender"

0"An extender extends the size of a device, for many-input logic gates, or"
0"large or specially shaped switches and LEDs."
0"Remember, devices like s, l, o, a, e that touch don't interact with each other"
0"when touching but work independently, so # is needed to extend its area instead"

lllll    lllll    lllll    ###
^^^^^    ^^^^^    ^^^^^    #l#
|||||    |||||    |||||    ###
o####    e####    e####     ^
^^^^^    ^^^^^    ^^^^^    ###
|||||    |||||    |||||    #s#
sssss    sssss    sssss    ###

0"$ is similar to #, but it does not interact with inputs or wires, it"
0"can be used to allow squeezing inputs through the following LCD display"
0"without interacting with unwanted segments:"


    $$l<-*
   $   $ |
  >l   l<|
  |$   $||
 *+>l$$ ||
 ||$   $||
 ||$   $||
 ||l   l||
 ||^$l$^||
 ||| ^ |||
 ||| | |||
 ||| | |||
 sss s sss


0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION III: Flip-Flops And Memory"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"NEW PART: counter"
0"c,C (standalone): initially off,on counter"

0"This is a counter or mono-input T flip-flop. Whenever the input toggles on,"
0"the c changes its state, so its output toggles at half the rate as the input."
0"capital C starts in on state instead of off state, other than that behaves the same."

s**>c**>l     s**>C**>l

0"This can make a binary counter, although it counts backwards in this simple form"

s**>c**>c**>c**>c**>c**>c**>c**>c**>l

s**>C**>C**>C**>C**>C**>C**>C**>C**>l

0"NEW PARTS: flip flop parts"
0"c, C, j, k, d, t, q, Q: flip-flop parts (clocked with c). combine them freely."

0"j, k, d and t are inputs for JK, T, D, and SR flip-flops."
0"c is the clock input and what stores the state. use C to have it initially on."
0"q and Q are output and negated output, and asynch set and reset inputs"
0"NOTE: the inputs for SR flip-flop are named J,K like for JK flip-flop, since"
0"JK flip-flop behaves the same as SR for all allowed SR input combinations,"
0"and the names S and R are already used for other non flipflop related parts"
0"These parts can be combined in any way, with # (visible in text mode) as filler"


s**>c**>l
    #       0"D flip-flop: when triggering c, the output will remember the state of d"
s**>d


s**>c**>l
    #       0"D flip-flop: when triggering c, the output will toggle if t is on"
s**>t


s**>j#q**>l
    ###
s**>c##     0"JK flip-flop (also usable as SR flip-flop)"
    ###
s**>k#Q**>l


      s
      v
s**>j#q**>l
    ###
s**>c##     0"JK flip-flop with additional asynch set/reset"
    ###
s**>k#Q**>l
      ^
      s

s**>q**>l
    #      0"SR latch: no clock"
s**>Q**>l


s**>j**>l
    #
s**>c**>l 0"JK flip-flop with q and Q left out, they are not required to get outputs"
    #
s**>k**>l

     s
     v
s-->jq**>l
s-- k#
s-->d#     0"Combining every single part (not useful but possible)"
s-- t#
s-->cQ**>l
     ^
     s

0"This is only a selection of the combinations you can do with those."
0"Also, you can make flip-flops from the ground up with more basic components"
0"instead as well (e.g. NAND-only). Other built-in circuits demonstrate those."

0"NEW PART: delay"
0"d (standalone): 1-tick delay (behavior depends on tick algorithm)"

s**>d**>l

s**>d**>d**>d**>d**>d**>d**>l

0"Numbers from 2-256 make d become an N-tick delay, with buffer that remembers all upcoming tick values,"
0"so it behaves like N d's in a row"

s**>d**>l
    6

s**>d**>l
    1
    6

0"Note that this means a very short pulse still stays a very short pulse, it just is delayed. If you"
0"want to guarantee a certain minimum pulse length (at least for a single short input), try the following:"

   *****
   *   v
 p**>d>c**>l
     1
     6

0"Note: the data (j,k,d,t) inputs of a flip-flop must already be set before the"
0"clock signal ('setup time'). Enabling the clock and data signal at the exact same time does not work."
0"This is expected behavior, otherwise shift registers wouldn't work. For example this d"
0"flip-flop cannot be toggled on due to the d input arriving at same time as clock which is too late:"

s**>d**>l
  * #
  *>c

0"Putting a delay at the clock input solves this (note that in this silly example"
0"once on it can't be turned off):"

s******>d**>l
  *     #
  *>d**>c

0"NEW PART: memory"
0"b and B: ROM and RAM bits"

0"ROM, unary adress select"

             lll
             ^^^
             |||
    "0"s---->Bbb
    "1"s---->BBb
    "2"s---->bBB
    "3"s---->bbB

0"ROM, binary adress select"

          lll        lll
          ^^^        ^^^
          |||        |||
 "1"s---->Bbb        Bbb
 "2"s---->BBb        BBb
          bBB        bBB
          bbB        bbB
                      ^^
                      ||
                      ss

0"RAM, unary address select"

           lll"output"
           ^^^
           |||
   "a 0"s->bbb<-p"store"
   "d 1"s->bbb
   "r 2"s->bbb
   "e 3"s->bbb
   "s"     ^^^
   "s"     |||
           sss"data"

0"RAM, binary address select. 16 lines, only 5 visible here, so you won't"
0"see the line in hardware if you select an address higher than 4 but it can still"
0"internally store the state. Choose a low address, enable some data bits and use 'store'"
0"to see some small b's become capital B's, indicating a 1 is stored in this bit"

           lll"output"
           ^^^
           |||
   "a 1"s->bbb<-p"store"
   "d 2"s->bbb
   "r 4"s->bbb
   "e 8"s->bbb
   "s"     bbb
   "s"     ^^^
           |||
           sss"data"


0"NEW BEHAVIOR: decoder and encoder"


0"Binary N to unary 2^N decoder"

"76543210"
 llllllll
 ^^^^^^^^
 ||||||||
 bbbbbbbb
      ^^^
      |||
      sss
     "421"


0"Unary 2^N to binary N encoder"

     "421"
      lll
      ^^^
      |||
 bbbbbbbb
 ^^^^^^^^
 ||||||||
 ssssssss
"76543210"

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION IV: Integrated Circuits"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"NEW PARTS: integrated circuit template and usage"
0"I: IC definition, i: IC usage"

0"I and i respectively define and use integrated circuit (IC). Numbers are used to"
0"identify them. This allows to design and reuse templates or sub-circuits"
0"Everything connected to parts touching the capital I defines the circuit for that number."
0"Space or strings break the connection, but the @ isolator allows still connecting to the I"
0"The small i behaves as a copy of the large template."

    l   lI5    ll    ll
    ^   ^      ^^    ^^
    a< >e      ||    ||
    ^ x ^      i5    i5
    ** **      ^^    ^^
    *   *      ||    ||
    s   s      ss    ss

0"The master template must use exactly s as input and l as output, to mark them."
0"In the copy any gate inputs to the ic count as input and wires exiting count as output, so"
0"copies can use anything, including gates and other template copies, as inputs"
0"and outputs".

0"Copies must have exactly the same amount of inputs and outputs as the template,"
0"and in the same directions (except if rotated, see below), else it indicates"
0"yellow error as shown here (1 input missing):"

 ll
 ^^
 ||
 i5
 ^
 |
 s

0"Use more i's (or #) to make the copy bigger if space to attach more inputs is required."

 l  l
 ^  ^
 *  *
 iii5
 ^  ^
 *  *
 s  s

0"While the template must use 's' to indicate inputs and 'l' to indicate outputs,"
0"any instances may use anything, such as gates, other chips, ... as inputs and outputs"

l   l
^   ^
o<ii5
^ ^ ^
ii5 *
^ ^ *
s s s

0"Multiple definitions for the same number results in an error:".

 I6      I6
s-->l   s-->l    s-->i6-->l

0"Inputs are matched to the template by their direction (north, east, south, west), and"
0"their order in this direction. Other than that, the shape and location of the inputs"
0"and outputs is freeform, e.g. see how the 'p' in the copy is more to the left while"
0"it matches the rightmost s of the template: that's because this is the only input"
0"coming from the east, so they match"

                 llllll
    llllll       ^^^^^^
    ^^^^^^     s>iiiiii
   s*||||*sI7    i ^^ i
     ssss        i ss i
                 i<p  i
                 i    i
                 iii7ii
                 ^    ^
                 s    s

0"NEW BEHAVIOR: nesting integrated circuit templates"

0"You can nest templates, 1 template can refer to others, e.g. here we use the I5 from"
0"above inside a new template I8 (we're making a full adder from two half adders here by the way):"

l   lI8    l   l     l   l
^   ^      ^   ^     ^   ^
o<ii5      *   *     *   *
^ ^ ^      iiii8     iiii8
ii5 *      ^ ^ ^     ^ ^ ^
^ ^ *      * * *     * * *
s s s      s s s     s s s

0"NEW BEHAVIOR: rotated chips"

0"Chips can be rotated in steps of 90 degrees if desired. To do this, rotate the position of the number"
0"compared to the small i in a different position than the number is compared to the large I of the template."
0"if there is any ambiguity, such as the number being surrounded by i's from multiple sides or"
0"it being the IC with no number at all then it will not rotate and take the templat's rotation."

0"E.g. here chip 5 from above is rotated:"

l<5<s
  i
l<i<s

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION V: Extra Parts"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"These parts do not extend the logic abilities, but allow different ways of input/output interaction"

0"NEW PARTS: timers"
0"R: timer initially on, r: timer initially off"

0"This is a realtime timer. It can be toggled on or off with mouse"
0"r is initially off (does not tick at all and must be enabled with mouse"
0"like a switch). R is initially on. During operation, the capital letter"
0"means it's not paused, and the color means it's outputting the signal or"
0"not based on current phase"

r****>l   R***>l

0"NEW PARTS: numbers"
0"0123456789: affect various properties of other parts"

0"Numbers were already encountered above for a few parts. Numbers affect many things"
0"including: LED colors, timer speeds, IC indices, delay durations, bus/bundle wire numbers, etc..."

0"Here numbers on LEDs and timers are demonstrated."

0"Timer speeds are the toggle-interval in tenths of a second (exceptions: no number gives 0.5 seconds, number 0 gives 1 second)"

0 1 2 3 4 5 6 7
l l l l l l l l        l l l l l l l l l l l
^ ^ ^ ^ ^ ^ ^ ^        ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
* * * * * * * *        * * * * * * * * * * *
s s s s s s s s        r r r r r r r r r r r
                       1 2 3 4 5 6 7 8 9 1 1
                                         0 1

0"Numbers are parsed from the component outward. So this works correctly:"


  R**>l
  1
  5

0"But this does NOT work as intended, the timer will be parsed as having a speed of 1,"
0"not as 15, because it only parses the number in a straight line from the r:"

  R**>l 0"DOES NOT WORK AS INTENDED!"
  15

0"NEW PART: RGB LED"
0"L: RGB LED"

s*>L<*s
   ^
   *
   s

0"NEW PART: Interactive terminal"
0"T: Interactive multiline terminal (7-bit ASCII)"

0"This is made from a rectangular grid of T's, but you cannot see the T's"
0"when rendered, it shows it as a black screen on which arbitrary characters"
0"can appear, even in text mode. So you have to view the source code with the"
0"'edit' button to see how this one is made."

0"It can have different functions: ASCII keyboard, screen, both, or decimal input/display"

0"With only inputs, it acts as a screen that can read 7-bit ASCII codes from"
0"any circuit inputs:"

TTTTTTT<***p"read"
TTTTTTT
TTTTTTT
TTTTTTT
^^^^^^^
|||||||
SsssssS"ASCII code in to screen"


0"With only outputs, it acts as a buffered keyboard. You can type at any"
0"time, it remembers all keystrokes, and they can be read one by one by"
0"enabling the 'out' bit. If the blinking cursor is not present, click"
0"it with the mouse first, then type with your real keyboard."
0"When there are no further typed characters to output, the eof bit will be enabled when out goes high"
0"NOTE: this configuration represents a keyboard, not a screen, but you still"
0"see a little screen rendered anyway, this is only present to show the"
0"blinking cursor and some characters to show it noticed your typing"


         lllllll"keyboard ASCII code out"
         ^^^^^^^
         |||||||
"out"p**>TTTTTTT
         TTTTTTT
"eof"l<**TTTTTTT

0"If you give the VTE both inputs and outputs, it acts as both a screen and a"
0"buffered keyboard. The screen shows both typed characters and characters"
0"read from the circuit. It will only output typed characters to the circuit."
0"If the blinking cursor is not in here but in the other one, click it with"
0"the mouse to focus this one:"

          lllllll"keyboard ASCII code out"0
          ^^^^^^^
          |||||||
"out"p**>TTTTTTTT<***p"read from in to screen"0
         TTTTTTTT
"eof"l<**TTTTTTTT
         TTTTTTTT
         TTTTTTTT
          ^^^^^^^
          |||||||
          SsssssS"ASCII code in to screen"0

0"With only inputs and no read/out flags, it will instead show the binary input in decimal"

         TTTTTTTT"decimal"0 T
         ^^^^^^^^           ^
         ||||||||           |
         sSsssssS"binary"0  s

0"With only outputs and no read/out flags, it will instead convert typed decimal value"
0"to binary, if the number parses as a valid decimal number"

         llllllll
         ^^^^^^^^
         TTTTTTTT

0"NEW PART: Random generator"
0"?: random generator"

0"The random generator will change to a random value on any positive"
0"or negative edge of the input and have a random initial value."

?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l

s**>?**>l

R**>?**>l
1

0"NEW PART: tri-state buffer"
0"V: fake tri-state buffer"

0"V (capital V, not to be confused with small arrowhead input v) is a fake"
0"representation of a tristate buffer. It is fake because the simulation does"
0"not support three states. In real life, you have the states 'low voltage',"
0"'high voltage' and 'high impedance'. In the simulation, there is only zero"
0"and one. High impedance is treated the same as 0. Still, the tri-state buffer"
0"can be used as a representation of a real-life circuit"

0"As seen before, different components outputting to same wire normally"
0"gives error, and one solution is to OR them. The tristate buffer"
0"solution, instead, also has 1 more switch per tristate buffer, to select"
0"that line (each V must have exactly 2 inputs to work correctly)"

                                    p
                                    v
s*****          s*****          s**>V***
     *               v                 *
s*****          s***>o              p  *
     *               v              v  *
s*********>l    s***>o****>l    s**>V***
                                       *
                                    p  *
                                    v  *
                                s**>V******>l

0"Note that in real life enabling multiple V's at the same time could cause a short"
0"but that is not simulated here."

0"Multiple single-input 'V's can also be used to OR multiple wires together"
0"where in real life you would need no gate at all there or diodes would have"
0"sufficed."

    s           s            s
    *           *            *0"here you see error, but this is what it"
    *           v            *0"represents in real life and there it's ok"
    v           V            *
s**>o**>l   s*>V***>l    s********>l
    ^           V            *
    *           ^            *
    *           *            *
    s           s            s

0"So in conclusion:"
0"-V's in logicemu are purely notational and show what a circuit 'could' look like"
0" in real life electrical circuits"
0"-a single-input V in logicemu represents an OR to its output wire in logicemu"
0"-a single-input V in real-life represents nothing at all, that is, only"
0" multiple wires connecting to the same point (possibly with diode)"
0"-a 2-input V in logicemu represents an AND gate that is OR-ed to its output wire"
0"-a 2-input V in real life represents a tristate buffer"
0"-V's only approximate reality, some real behavior like shorts is not emulated."

0"The best example circuit to see V's in action is the 'Relay Logic' circuit."

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION VI: Parts for shortcuts and compactness"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"These parts and behaviors are not necessary to make logic circuits, but can help make things"
0"more compact. Some are very useful all the time, others are included only for rare situations"
0"when they actually help make something more readable."

0"NEW PARTS: diagonal wires"
0"'/' and '\\': diagonal wires."

0"NOTE: because backslash has special meaning in many programming language strings, ;"
0"can be used as an alternative. It will still be rendered as \\"

      >l  l<
     /      ;
    /        ;
   /          ;
  /            ;
 s              s

0"NEW BEHAVIOR: diagonal inputs"

0"An input of the form ^ > v < m ] w or [ that touches nothing where it points at"
0"but touches something diagonally on one or both sides of that point, acts as one"
0"or two independent diagonally crossing diagonal inputs"



 l l      l l
  ^       ^ ^
 s s      a e
          ^^^
          s s

0"Those diagonal inputs read diagonally even from wires going up, nothing"
0"else can do that"

       l l
  l    ^ ^
 ^     a e
*      ^^^
s      * *
       s s


0"NEW PART: global wire"
0"g: global wire (backplane)"

0"The global wire can output to many loose places at any distance everywhere"
0"use e.g. for a global clock or reset signal"

s----g    g--->l


l<---g    g--->l

0"G: an additional independent global wire"

s---G    G--->l

0"g,G with numbers: yet more global wires"

 s---g0  3g--->l
 s---g1  2g--->l
 s---g2  1g--->l
 s---g3  0g--->l
         3g--->l

0"Multi-digit codes are read decimally left to right or top to bottom"
0"depending on horizontal or vertical direction compared to the g"

  s--g1234    1234g-->l

0"Global wire can be used in an integrated circuit"

  s---g17      71g-->lI17    i17-->l    i17-->l    i17-->l

0"NEW PART: straight backplane connections ('antennas')"
0"(,),u,n: 'antennas'"

0"These are another form of 'backplane' wires, connected"
0"to the corresponding 'dish' they're aimed at. Calling them 'antennas'"
0"or 'wireless' is just a metaphor."
0"These provide another way to reduce clutter, and are especially useful"
0"for large wrap-around circuits."

         l             l
         ^             ^
         |             n
  s--(   |  )-->l
         |
  (--s   |  l<--)      u
         s             s


0"The antenna connects to its corresponding opposing horizontal or vertical side of"
0"the other antenna, each independently"

          l
   s      ^
   |      |
 s-(-s l<-)->l
   |      |
   s      v
          l

0"The antenna can also connect some non-wire-like connections, such as be in-between"
0"an input and a device"

 s--->(    )l

0"Antennas can be nested recursively:"

 s-(   s-(    )->l   )->l

0"The antenna has very specific special rules for diagonal connections. Those are too"
0"detailed to explain in this tutorial, but the goal of the rules is that you can make"
0"wrap-around circuits including diagonal connections like this:"

   nnnnnnnnn
  (  s  s  s)
  (         )
  ( l  l  l )
  (^  ^  ^  )
  (  /  /  /)
  ( s  s  s )
  (         )
  (  l  l  l)
  ( ^  ^  ^ )
  (/  /  /  )
   uuuuuuuuu

0"NEW PART: bus"
0"y: bus"

0"A bus is a bundle of wires through which multiple connections can go."
0"Numbers indicate which internal wire connects to external wire"
0"Matching numbers connect, but disconnected buses are independent, so can reuse numbers"

 l  l  l  l  l  l  l
 ^  ^  ^  ^  ^  ^  ^
 |  |  |  |  |  |  |
 0  1  2  3  4  5  6
 yyyyyyyyyyyyyyyyyyy
 6  5  4  3  2  1  0
 |  |  |  |  |  |  |
 s  s  s  s  s  s  s

0"Buses can connect all their internal wires through a regular wire. Wire"
0"crossings act as expected on this (so two independent buses can cross without interacting)"
0"Note that all these bus connection are resolved already during initial"
0"parsing of the circuit, while running the simulation nothing special gets"
0"simulated in those buses, because the simulation has all gates connected"
0"directly to other gates in a data structure that was built during parsing, just"
0"like regular wires, all the buses did was tell which gates connect to which"

            y1->l
            y2->l
            y3->l
            y
            |
   yyyy-----+-----yyyy
   123      |      123
   |||      y      |||
   sss      y1-s   vvv
            y2-s   lll
            y3-s


0"The above shortcuts and behaviors are all still considered readable style. Below"
0"follow some more new parts that allow packing wires and devices even closer, however"
0"they may make circuits ugly and unreadable."

0"SUGGESTION: avoid using the parts and behaviors below unless absolutely necessary for compactness"

0"NEW PARTS: Non-interacting wire corners"
0",: non-interacting wire corner"

0"This is a corners or split that can be more closely packed than *. They interact"
0"with other wires, but not with their own kind."

                     ll
                     ^^
l<---,,--->l         ||
     ||         l<---,,--->l
     ||              ||
     ||              ||
     ss              ss

0"NEW PARTS: Double corners"
0"%: NW plus SE corner, &: NE plus SW corner"

0"These corners work independently on both sides"

      l             l
      ^             ^
      |             |
      |             |
  s---%--->l    l<--&---s
      |             |
      |             |
      s             s

0"NEW BEHAVIOR: A few more notes about / \\ and x"

0"Diagonal wires themselves can also act as a wire crossing due to connecting to corners:"


 l    l
 ^    ^
  ;  /
   ;/
   /;
  /  ;
 s    s

0"Even though x, / and \\ can interact with * diagonally,"
0"*'s still don't interact diagonally with each other, so no output possible here:"


   *>l "no output"
  *
 *
 s

0"x does not interact with +, |, -, so no output possible here:"


lllll
^^^^^
|||||
 xxx
  |
  s

0"NEW PART: 8-way wire crossing"
0"X: 8-way wire crossing"

0"X (capital instead of small letter) is a wire crossing that works both"
0"straight and diagonally, giving it 8 connection points and 4 independent"
0"signals:"

     l
  s  ^  l
   ; | ^
    ;|/
  s--X-->l
    /|;
   / | v
  s  |  l
     s


0"NEW BEHAVIOR: device inputs connecting to multiple wires"

0"Device inputs > < ^ v ] [ m w output on exactly one side, but can receive their"
0"input from any of the other sides (3 direct neighbors, and 4 more from x)"

                                          s
s---v              >l       s--* >l        ;l<
    l        s-----*            x           x
                   >l       s--* >l        /l<
                                          s

0"Normally you connect 1 wire to 1 input side of a device input. It is possible to"
0"connect multiple, everything attached to the multiple input sides is connected together"
0"as 1 wire, so the signal passes through"

s---v----v----v---->l
    l    l    l

0"Connecting outputs from different devices to the same device input gives an error."
0"This is the same rule as seen earlier that you cannot connect outputs from"
0"different devices to a single wire"

s--v--s
   l

0"NEW PART: multi device input"
0"z: regular multi device input, Z: inverted multi device input"

0"These are normal and inverted device/gate inputs outputting to multiple sides"
0"they connect to each other and wires, and output to all devices, no matter"
0"what direction. They do not interact with other gate input types"

       l  l
s------zz-zZl
       l  l

0"NEW PART: device input crossing"
0"h: regular device input crossing, H: inverted device input crossing"

0"These are a combination of wire crossing and normal or inverted device input"


    l         l           s---->o--------->l
   lh-s      lH-s         s-----he-------->l
    |         |           s-----+ha------->l
    s         s                 ||^
                                sss

0"h and H work also diagonally. So can serve also as simple diagonal device inputs"

s     s              l
 ;     ;            h
  h     H     s----*
   l     l          h
                     l

0"NOTE: the diagonal usage of ^ seen earler above is also a type of wire crossing input,"
0"and the diagonal ^ is a nicer looking style than what you can make with h."

0"h and H can also work as a regular wire crossing, in fact it does the same as capital X in that case:"

l   l   l
 h  ^  h
  ; | /
   ;|/
s---h-->l
   /|;
  / | ;
 /  |  ;
s   s   s

0"NEW BEHAVIOR: integrated circuits diagonal inputs/outputs"

0"Chips, too, can have diagonal inputs and outputs:"
0"For the definition, x from s as inputs, and h to l as outputs"
0"For the usages, h to the chip as its inputs, x from the chip as outputs"

   s  s  s  l
    ; | /  h               s s s >l
     vvv  *                * | */
     e###>O                 hvh/
  s->#I9#-->l              s>i9-->l
     ####                   h^h
     ^^^                   * | *
    / | ;                  s s s
   s  s  s

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION VII: Command Words"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"


0"NEW BEHAVIOR: force modes and settings"

0"Some specific command words in strings make things happen. In all the below,"
0"replace colon space by just colon, and the commands will work for real. They"
0"are neutered with the space here to not make them affect this tutorial."

0"'MODE: combinational' --> force combinational mode"
0"'MODE: sequential' --> force sequential mode"
0"'MODE: electron' --> force electron mode"
0"'MODE: investigate' --> force investigate mode"
0"'RENDER: text' --> force text mode rendering (ascii)"
0"'RENDER: graphical' --> force graphics mode rendering (canvas)"
0"'FIT: x' --> zoom horizontally to full width, even if it means scrolling y"
0"'FIT: y' --> if possible zoom vertically such that top up to this marker is visible"
0"             if two such markers present, zoom such that height matches their vertical distance."
0"'INSERT: toc' --> inserts a table of contents of built-in circuits here"
0"                  this also also works with 'toc_main' and 'toc_help'"

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"Epilogue"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"This concludes the editing tutorial, and showed most of the different behaviors"
0"of different cells and parts."


`, 'editing');


registerCircuit('ASCII symbol summary (for editing)', `
0"Summary of characters. See the other tutorials for the full explanation."

0"BASIC"
0"-----"

0"(space): isolator"
0"(newline): next line of the 2D drawing"
0"(quote): comment"

0"*: wire, wire split, wire corner"
0"-|: straight wires"
0"+: wire crossing"
0"x: diagonal wire crossing"

0"^>v<: device/gate inputs"
0"m]w[: inverted device/gate inputs"

0"l: LED, lamp or light: user output"
0"sS: switch: user input"
0"pP: push button"

0"a: AND gate"
0"o: OR gate"
0"e: XOR gate"
0"A: NAND gate"
0"O: NOR gate, NOT gate"
0"E: XNOR gate"

0"#: extend the surface area of devices"

0"cC: flip-flop clock, counter"
0"jkdt: flip-flop inputs"
0"qQ: flip-flop outputs/asynch inputs"

0"EXTENDED"
0"--------"

0" @: isolator"

0",: wire corner that doesn't interact with itself"
0"/\\: diagonal wires"
0"&%: double wire corners"
0"g: global backplane wires"
0"y: bus (bundle of wires)"
0"()un: straight connected backplane wires, 'antennas'"

0"I: IC template"
0"i: IC instance"

0"zZ: normal/inverted device inputs that work in 4 directions"
0"hH: normal/inverted wire crossing device input (works diagonally too)"

0"V: tri-state buffer"

0"L: RGB LED: 3 inputs, red, green and blue"
0"rR: real-time timer"

0"bB: ROM/RAM bits"
0"T: terminal (ASCII keyboard/screen)"
0"?: random generator"

0"$: extend the surface area of devices without input/output interaction"
0"0123456789: modifiers: LED color, timer speed, bus/ic/backplane id"

`, 'symbols');


registerCircuit('Editing Side Notes', `

0"A few extra side notes for editing"

0"Interchangeable ASCII characters"
0"--------------------------------"

0"There are a few pairs of ASCII charcters that have the same or similar meaning:"

0"@ and ASCII space: both are isolator. @ is slightly different because it can connect IC"
0"templates while space ends them, and @ can be used as visual aid such as drawing a casing around a device"

0"ASCII backtick and ASCII double quote: the backtick will be replaced by double quotes, for text in circuits"
0"--> this helps with defining circuits in double quoted strings in programming languages."
0"    Tip: use raw string literals when available."

0"; and \\ (ASCII backslash): the ; will be replaced by backslash in the circuit (but not inside comments)"
0"--> this helps with defining circuits in strings in programming languages."
0"    Tip: use raw string literals when available (but in JS \\ still has special meaning)."

0". and *: the . has the same functionality as * (wire)"
0"--> this helps with drawing circuits on paper"

0"Style used in built-in circuits"
0"-------------------------------"

0"Most built-in circuits use a certain style that is not optimally compact but looks better. It works as follows:"

0"For wires, mostly * is used, no - or |, forcing to have a 1-cell gat between neighbor wires."
0"so no closely packed wires. The only exception is for ROM and Terminals and sometimes for multi-bit signals."

0"yes:"     0"no:"

s****>l   s---->l
          s---->l
s****>l   s---->l

s****>l

0"but, yes for ROM:"

    lll
    ^^^
s-->BbB
s-->bBb
s-->bBB


0"Some of the 'compact shortcut' cells are avoided except in rare circumstances,"
0"in particular 'h', 'H', 'Z', '%', '&' and touching >^<v inputs from sides"

0"yes:"       0"no:"       0"no:"

s**>a**>l     s*&>a**>l   s**>a**>l
   >            &+z          h
s**>e**>l     s**>e**>l   s**>e**>l

0"Centers and corners of devices are aligned on a certain grid for aesthetic reasons:"

3" a-a-a-a"
3" |@|@|@|"
3" a-a-a-a"
3" |@|@|@|"
3" a-a-a-a"
3" |@|@|@|"
3" a-a-a-a"

0"In that grid:"
0"*) 'a' can be almost anything, such as gates, except gate inputs"
0"*) '|' and '-' can be gate inputs '^>v<m]w[' or wires '*' or 'x'"
0"*) '@' may only be empty, or filler of large devices, or the middle"
0"   (diagonal) one of a ^^^ style gate input."

0"This with various exceptions for numbers, backplane wires, comments, etc..."
0"but this is the spirit of the idea."

0"The grid may shift in case of isolated or far apart devices."

0"yes:"            0"no:"

s>l                s*>l


s**>l              s***>l
          s**
            v
s**>a**>l   a>l    s***v
    ^       ^          a**>l
s****     s**      s***^


s**>d#q**>l        s**>dq**>l
    ###                ##
s**>c#Q**>l        s**>cQ**>l

0"This is just a principle followed in many built-in circuits. This turned out"
0"to make nicer looking circuits than trying to make everything as small as possible"
0"with compaction tricks. However, there's no need to follow this in your own editing."

0"Editing in the Geany Text Editor"
0"--------------------------------"

0"Editing is best done in a good plain text editor, at least it must support a fixed"
0"width font and provide block selection, allowing to paste a rectangular selected"
0"block anywhere."

0"There are many other editors that can do this, but here are some tips for Geany."
0"Many of these will work in other editors too, there just may be different shortcuts"
0"and different edge case behaviors. Geany is based on scintilla so similar"
0"behaviors may work in other scintilla based editors like scite, notepad++,"
0"notepad2, code::blocks, etc... Another type of editor that might be useful instead, could"
0"be one designed for making 2D ASCII art drawings."

0"-Make sure to set a fixed width font. Geany is an editor for programming so"
0" likely it already is by default. without a fixed width font, characters will"
0" not line up correctly below each other, and that is quite important since"
0" circuits are 2-dimensional."
0"-Turn off line wrapping, only then you can see the 2D layout correctly."
0"-The insert key is useful. Normally the 'insert' mode of text editors is"
0" rarely used, but for editing 2-dimensional diagrams it's awesome if you are"
0" changing something in the middle: it allows to overwrite characters without"
0" moving stuff to the right of your cursor. Unfortunately, backspace will"
0" still move said stuff to the left so instead of backspace, use left arrow"
0" then space to remove something to the left of the cursor. Also, if you have"
0" no insert mode, then pressing delete after each keystroke will be needed"
0" instead."
0"-CTRL+d duplicates a line, which is handy sometimes e.g. to make vertical"
0" wires longer."
0"-If you have a circuit without any other circuitry to the left or right of"
0" it, then copypasting it to another location above or below is quite easy:"
0" just select it, copy (CTRL+C) and paste it on a different line (CTRL+V). So"
0" copypasting circuits multiple times vertically is easy in any text editor is"
0" easy."
0"-If you want to copypaste something horizontally, or something that is in"
0" between some stuff on its left and/or right, then you need block selection,"
0" to select the characters in the rectangle around the part you want to copy."
0" For example if you want to copypaste only the middle or gate below but not"
0" the and/xor gates left/right of it:"


      l      l      l
      ^      ^      ^
    s>a<s  s>o<s  s>e<s

0"If you use block selection as explained below, you can easily paste many instances of that"
0"or gate like so:"

  l     l     l     l     l     l     l     l
  ^     ^     ^     ^     ^     ^     ^     ^
s>o<s s>o<s s>o<s s>o<s s>o<s s>o<s s>o<s s>o<s

0"So how to do the block selection in geany:"
0"-To do it with arrow keys: first place the cursor in one corner of the"
0" rectangle you want to select. Then hold down alt+shift and press the arrow"
0" keys up/down and left/right to select a rectangle."
0"-To do it with the mouse: first place the cursor in one corner of the"
0" rectangle you want to select. Then hold down ctrl+shift, or in alt+shift"
0" (depends on OS), and click the mouse to the other corner of the rectangle."
0" Or hold down just ctrl, and drag the mouse to any rectangle shape."
0"-Now you have a rectangle selected. Press ctrl+c to copy it. Then place the"
0" cursor where you want to paste it, and press ctrl+v there."
0"-Important: make sure the rectangle you selected has all characters filled."
0" If there were lines that were not filled up to the end, fill them all up"
0" with spaces first. Only then, when you paste the block, will all content to"
0" the right of where you pasted shift by the same amount, which is very likely"
0" what you want to not completely disaling other parts of the circuit."
0"-To easily get spaces to the right of everything, place the cursor somewhere"
0" very far on the right (add spaces to 1 line for this if needed). Then use"
0" mouse block selection and click elsewhere on the right to get a very long"
0" cursor. Then type any letter, e.g. '@', to type a vertical wall of @ symbols"
0" on the right. Everything to the left of them will be automatically filled"
0" with spaces! Which makes editing of the 2D circuit much easier."
0"-You can also use the block selection as multicursor. Instead of a"
0" rectangle, select a vertical line to get a long cursor. Then you can insert"
0" multiple spaces, *'s, or any other character by typing it. Similarly using"
0" the delete key deletes all characters to the right of the cursor, good for"
0" selectively deleting a part of the circuit."
0"-If you paste a block, it will insert itself into all content below. So if"
0" you have some circuitry below that you don't want affected, first add enough"
0" newlines below where you will paste, only then paste."
0"-Don't use the backspace key with multicursor, instead use the delete key."
0" The delete key guarantees it will delete one character on each line to the"
0" right of the cursor. With backspace, however, geany may backspace a"
0" different amount of spaces on each line (it tries to be helpful in a way"
0" that fails here) which will disalign the circuit to the right of the"
0" multicursor."
0"-Similarly, the tab key is kind of unreliable for multicursor, so use space"
0" to remain evenly spaced."


0"As an example of the spaces problem:"

s
v
o**>l
^
s

0"If you select the above OR gate with block selection, and then place the cursor below here and hit CTRL+v"
0"multiple times, you will get the following mess:"

ssss
vvvv
o**>lo**>lo**>lo**>l
^^^^
ssss

0"If however, you add 4 spaces to the right of the s, the right of the v,"
0"the right of the ^, and the right of the bottom s, and one more space"
0"at the end of every line to get some in-between whitespace, and you"
0"copypaste that 4 times below, it looks as intended:"

s     s     s     s
v     v     v     v
o**>l o**>l o**>l o**>l
^     ^     ^     ^
s     s     s     s

0"RENDER:text"

0"FIT:x"

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`, 'editingextra');

registerCircuit('Electronic Diagram', `
0"comparison with real electrical diagrams. On the left real life notation, on the right our ASCII notation"
0"The real life notation is of course also just an ascii art approximation here."

0"RENDER:text"
0"FIT:x"

1"                ___         "
1"            ---|   \\        "**>a**
1"    AND        |   |----    "   ^
1"            ---|___/        "****
1"                            "
1"               ____         "
1"            ---\\   \\        "**>o**
1"     OR        |   }----    "   ^
1"            ---/___/        "****
1"                            "
1"                ___         "
1"            ---\\\\  \\        "**>e**
1"    XOR        ||  }----    "   ^
1"            ---//__/        "****
1"                            "
1"                ___         "
1"            ---|   \\        "**>A**
1"   NAND        |   |o---    "   ^
1"            ---|___/        "****
1"                            "
1"               ____         "
1"            ---\\   \\        "**>O**
1"    NOR        |   }o---    "   ^
1"            ---/___/        "****
1"                            "
1"                ___         "
1"            ---\\\\  \\        "**>E**
1"   XNOR        ||  }o---    "   ^
1"            ---//__/        "****
1"                            "
1"               ____         "
1"            --o\\   \\        "**]o**
1"  IMPLY        |   }----    "   ^
1"            ---/___/        "****
1"                            "
1"                ___         "
1"            ---|   \\        "**>a**
1" NIMPLY        |   |----    "   m
1"            --o|___/        "****
1"                            "
1"                            "
1"                            "
1"    NOT     ----|>o-----    "**>O**
1"                            "
1"                            "
1"                            "
1"  DIODE     ----|>|-----    "**>o**
1"                            "
1"                            "
1"                 //         "
1"    LED     ----|>|-----    "**>l**
1"                            "
1"                            "
1"                 /          "
1" SWITCH   V+ ---o  o----    "s****
1"                     >      "
1"                     >      "
1"                    GND     "
1"                            "
1"                            "
1"                  |         "
1"                -----       "
1"   PUSH   V+ ---o   o---    "p****
1"                      >     "
1"                      >     "
1"                     GND    "
1"                            "
1"            -----           "
1"           / _   \\          "
1" CLOCK    | | |_| |---      "R****
1"           \\ 1Hz /          "5
1"            ----            "
1"                            "
1"                            "
1"                            "
1"CONSTANT 0     GND-----     "c****
1"                            "
1"                            "
1"CONSTANT 1      V+-----     "C****
1"                            "
1"                            "
1"FLOATING Z      -------     "c****     0"(Not supported, '0' is used)"
1"                            "
1"                            "
1"                            "
1"                  |         "    *
1"                  |         "    v
1"TRISTATE     ----|>----     "***>V**** 0"(Not truly supported but this represents it)"
1"BUFFER                      "
1"                            "
1"                            "
1"                            "
1"                 +-----+    "
1"              ---|T   Q|----"-->t--
1" T-FLIPFLOP      |     |    "-->c
1"              ---|>    |    "
1"                 +-----+    "
1"                            "
1"                 +-----+    "
1"              ---|D   Q|----"-->d--
1" D-FLIPFLOP      |     |    "-->c
1"              ---|>    |    "
1"                 +-----+    "
1"                            "
1"                 +-----+    "
1"              ---|J   Q|----"-->j--
1"JK-FLIPFLOP   ---|>    |    "-->c
1"              ---|K    |    "-->k
1"                 +-----+    "
1"                            "
1"                 +-----+    "
1"             V+ -|T   Q|----"
1" COUNTER         |     |    "-->c--
1"              ---|>    |    "
1"                 +-----+    "
1"                            "
1"                    |       "    |
1"                 +-----+    "    v
1"              ---|T S Q|----"-->tq--
1"T-FLIPFLOP       |    _|    "-->cQ--
1"W.ASYNCH.SR   ---|> R Q|----"    ^
1"                 +-----+    "    |
1"                    |       "
1"                            "
1"                    |       "    |
1"                 +-----+    "    v
1"              ---|D S Q|----"-->dq--
1"D-FLIPFLOP       |    _|    "-->cQ--
1"W.ASYNCH.SR   ---|> R Q|----"    ^
1"                 +-----+    "    |
1"                    |       "
1"                            "
1"                    |       "    |
1"                 +-----+    "    v
1"              ---|J S Q|----"-->jq--
1"JK-FLIPFLOP   ---|>   _|    "-->c#
1"W.ASYNCH.SR   ---|K R Q|----"-->kQ--
1"                 +-----+    "    ^
1"                    |       "    |
1"                            "
1"                            "
1"                            "
1" IC USAGE                   "
1"                            "
1"        +---u---+           "->i4081
1"       -|       |-Vdd       "->iiiii<-
1"       -|  IC   |-          "--iiiii<-
1"       -|       |-          "--iiiii--
1"       -| 4081  |-          "->iiiii--
1"       -|       |-          "->iiiii<-
1"       -|       |-          "  iiiii<-
1"    Vss-|       |-          "
1"        +-------+           "
1"                            "
1"                            "
1"                            "
1" IC SCHEMATIC               "
1"                            "
1"       +---u---+            "s---v
1"       |       |            "s-->a@v---s
1"     1-|--+    |-14Vdd      "l<--, a<--s
1"     2-|-\\| +--|-13         "l<--, ,-->l
1"     3-|--u |/-|-12         "s-->a ,-->l
1"     4-|--n u--|-11         "s---^ a<--s
1"     5-|-/| n--|-10         "      ^---s
1"     6-|--+ |\\-|-9          "      I4081
1"  Vss7-|    +--|-8          "
1"       |  4081 |            "
1"       +-------+            "
1"                            "
1"                            "
1"                            "
1" RELAY (SPST)               "
1"                            "   *
1" ---uuuuuu----              "   v
1"    ======                  "**>V*** 0"(same as tristate buffer, not accurate emulation but close)"
1" ----o  o-----              "
1"      \\                     "
1"                            "
1"                            "
1"                            "
1"                            "
1" RELAY (SPDT)               "   *
1"                            "   ***
1" ---uuuuuu----              "   v |
1"    ======                  "**>V*+***
1"        o----               "     w
1" ----o                      "****>V***
1"      \\ o----               "
1"                            "
1"                            "
1"                            "
1"          _                 "
1"         | -_               "****>a**
1"       --|   |              "     m v
1"         |   |              "     * o**
1" MUX     |   |---           "     * ^
1"       --|  _|              "**>a*+**
1"         |_-                "   ^ *
1"           |                "   ***
1"           |                "   *
1"                            "
1"                            "
1"                            "
1"          _                 "
1"         | -_               "   *>a****
1"         |   |--            "   * m
1"         |   |              "**** *
1"DEMUX  --|   |              "   v *
1"         |  _|--            "   a*+****
1"         |_-                "   ^ *
1"           |                "   ***
1"           |                "   *
1"                            "



`, 'diagram');


registerTitle('Testing');



registerCircuit('Unit Test', `

0"This is a unit test. It's for testing and development. It's included"
0"under 'help' because it shows expected behavior of some edge cases."

0"Note: also try: applyTransform(4), applyTransform(2)"

0"Note: also test the map 'game of life ship' and enable autotick"

0"On"
0"--"

0"In this section, the LED on the right of each contraption must be ON. If it's OFF, something is broken"

C***********>l

C----------->l

C>e-ha-zzo+*>l

c****>O*****>l

c****>O#****>l

a***********>l

O***********>l

E***********>l

P***********>l

S***********>l

Q***********>l

C***********>lI11

i11*********>l

O***********>lI10

i10*********>l

i10*********>l

>bB*********>l

s****>C*****>l

s---->c--->O>l
s---->j--->O>l
s---->k----->l
s---->q--->O>l
s---->Q----->l

       *-->O>l
C------+---->l
c------*

c *--------->l
 x
C *------->O>l

c---v
c-->a-------]l

c---w
c-->a-------]l

c---v
c--]a-------]l

c---w
c--]a------->l

1Rw
  e--------->l
1R^

s->A->q----->l
s---->Q

s->a-]q----->l
s---->Q

 c
 v
Bb-------->O>l
bB---------->l
BB---------->l
bB---------->l

 C
 v
Bb---------->l
bB-------->O>l
BB---------->l
bB-------->O>l


C**( )* )*>O>l
      *
      ******>l

C***
    x
     *******>l

C***
    h
     *******>l

C***h*******>l

c->O-------->lI5

i5---------->l

c->O-------*
            h
i6           lI6
  x
   *********>l

S-->C>C>C>C->l


C-----*
       \\
        *--->l

        *--->l
       /
C-----*

C           >l
 ;         /
  *-------*

C-------&
        &--->l

        %--->l
C-------%

C----g10

       10g-->l

         g-->l
         1
         0

C--( ( ) )-->l


            ]l

            Zl

             l
            Hl
             l

C---------->#l

C----------zzl

C----------zhl



C12y     y21]l
   yy---yy
c21y     y12>l


C---12y45--->l
C---23y34---]l
c---34y12--->l
C---45y23--->l

  I8
S*(@@@)*****>l

S>i8********>l

s->lI

S------->i-->l

s-------]i-->l

S--->i$-----]l
      #----->l

S--->i
     $------]l
     i------>l

S------>i$#->l

S------>i$i->l

s->i->lI2

S------>i2-->l

#-----------]l

#------->O-->l

C**>C*******>l

O**>C*******>l

S**>C*******>l

O*****>d****>l

         e-->l
        >
C------+---->l
      >
       e---->l

0"Off"
0"---"

0"In this section, the LED on the right of each contraption must be OFF. If it's ON, something is broken"

************>l

c***********>l

C*****@*****>l

      ******>l
C*****+

C*****|*****>l

o***********>l

e***********>l

A***********>l

s***********>l

p***********>l

s*****>o****>l

s*****>a****>l

s*****>e****>l

C*****( (***>l

C***( ( )***>l

C*****
      h*****>l

c---- ------>l
     x
C---- ------>l

C-----------
            zl

C-----------z
             l

C----------*
            zl
1Rw
  E--------->l
1R^

r----------->l

s---->R----->l

C***********]l

C---------->hl

C----------z>l

C******
      *
     "*"
      *
      ******>l

C*****>o
      >o---->l


C---y0y3y--->l
C---y1y2y--->l
C---y2y1y--->l
C---y3y0y--->l


  12      21
C-y       y->l
  yyyyyyyyy
C-y       y->l
  21      12

S***********]l

s****>S*****>l


S***(")"
      ******>l

C**>c*******>l

O**>c*******>l

S**>c*******>l


       e---->l
      ^
C-----


0"Toggle"
0"------"

0"In this section, the LED on the right must be have the same state as the input switch"
0"(slight delay is allowed)

###
s##
###
*
************>l
*
*******>o***>l
*
*******>a***>l
*
*******>e***>l
*
*******>d***>l
*
*******>S***>l
*
*******>a***>l
*       ^
*********
*
*******>o***>l
*       ^
*********
*
*         c
*         v
*******>e***>l
*
***>d>e>c***>l
* *   ^
* *****
*
***g12 12g**>l
*
*
*       y1>O>l
*     yyy
*     * y2**>l
*     *
***1y * y2>O>l
*   yy+yy
*>O2y * y1**>l
*     *
***2y *
*   yyy
*>O1y
*
*
***(    )***>l
*
*
* s>e#>lI6416
*
***>i6416***>l
*
***>O*******]l
*
*  d-* C>jq->l
*  ^ v C>kQ-]l
*--*>e-->c-->l
*
* C--*>a---->l
*     h
*----*>e----]l
*
******
*     x
*      H
*       O--->l
*
*---*>o>q--->l
*   *>O>Q---]l
*
*  o***v     l
*  ^   o     ^
***+** **>o***
*  * *       v
*  o<*       l
*
*--( )-*
*      n
* *--------->l
* n    u
*      *&
* u     |
* *--( )%
*
*
******>o>c**>l
*    *   ^
*    *>O**
*
*

0"Flip Flops"
0"----------"

0"expected:"
0"-main output read from t,c,k,d,q"
0"-inverted output read from j,Q; inverted to LED so all LEDs should read the same"
0"-q enables immediately on no matter what"
0"-Q disables immediately on no matter what"
0"-Q and q together makes it flicker"
0"-c may change state on positive edge only according to the rules of T,D,J,K flip-flop inputs"
0"-when mixing D/T/JK flip-flop inputs"
0"--on inputs trump off inputs"
0"--off D trumps off JK & T"
0"--toggle trumps everything"
0"--following combinations make it toggle: T, JK, DK"

s-->c-->l
    #
s-->t-->l
s-->d-->l
s-->j-->l
s-->k--]l
    #
s-->q-->l
s-->Q--]l

0"Expected: behaves like JK flipflop, all LEDs same value"

s-->c-->l
s-->j-->l
s-->k--]l


0"Comment Alignment"
0"-----------------"

0"In each test below the word 'hi' is aligned with different methods."
0"The word should appear on top of the capital letters indicated"
0"with gates below it. In the case of an E it must be exact, in the"
0"case of an O slight deviation is allowed (this is for half width text)"

"hi"      "hi"
eEEee     eEEee

0"hi"     0"hi"
Ooooo     Ooooo

"hi"0     "hi"0
Ooooo     Ooooo

1"hi"     1"hi"
ooOoo     ooOoo

"hi"1     "hi"1
ooOoo     ooOoo

2"hi"     2"hi"
ooooO     ooooO

"hi"2     "hi"2
ooooO     ooooO

3"hi"     3"hi"
EEeee     EEeee

"hi"3     "hi"3
EEeee     EEeee

4"hi"     4"hi"
eeeEE     eeeEE

"hi"4     "hi"4
eeeEE     eeeEE

0"Errors"
0"------"

0"In this section, everything extending to the right must be an error, marked in yellow"

s---*
    *--------->l
s---*

s--->i741----->l

I195
s>e>l0

s--->i195----->l
     ^
     s

I197
s------>e----->l
I196

0"RENDER:text"


`, 'unittest');
