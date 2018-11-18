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

registerCircuit('Main Help', `
0"LogicEmu Main Help"
0"------------------"

0"Welcome to LogicEmu! LogicEmu emulates logic circuits. It has a whole bunch"
0"of circuits included to play with, including binary adders, multipliers,"
0"flip-flops, NAND-only logic, ..., and also allows creating new circuits."

0"E.g. like this AND gate with switches and LED:"

s**>a**>l
    ^
s****

0"LogicEmu is cell-based. A side effect of that is the notation isn't standard"
0"notation. On the other hand, this has as advantage that a lot of logic fits"
0"on a single screen and it's quite flexible. Also, each cell is an ASCII"
0"character, which has advantages for editing and sharing circuits."

0"It's a digital logic emulator, but not an electrical simulator. Power sources"
0"and voltages are abstracted away, and only two signals, 0 and 1, are"
0"emulated."

0"This tutorial is multiple screens long, so scroll down to see all"

0"User Interface"
0"--------------"

0"The top bar has buttons of the user interface, such as selecting built-in"
0"circuits, pausing, changing graphics options, editing, ... Hover over each"
0"button and dropdown to see their explanation."

0"The rest of this tutorial explains what the different symbols and components"
0"in circuits do."

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

0"Wire split (indicated with a little dot at the connection, or * in text"
0"mode): The input switch activates all connected outout devices. This is also"
0"known as fanout."


    l
    ^
    *
    *
s******>l
    *
    *
    v
    l

0"Wire crossing (indicated with the wires rendered slightly disconnected, or a"
0"+ in text mode): Both switch/LED pairs work independently and don't interact:"


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

0"Diagonal wire crossing at the arrowhead itself (causing 2 diagonal crossing"
0"inputs):"

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

0"An example of combining multiple logic gates: The full adder: (NOTE: This is"
0"an example for the notation here. There are circuits explaining full adders"
0"included in the dropdowns above. If you do not know yet what a full adder"
0"means, just enjoy the response to the switches :)"


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
0"and in this case the c stands for 'clock'. Here is how to interpret each"
0"letter:"
0"c: the clock input. When the clock input goes from low to high the flip-flop"
0"   will toggle if needed"
0"j: the S input for SR flip-flop or the J input for JK flip-flop"
0"k: the R input for SR flip-flop or the K input for JK flip-flop"
0"d: the D input for D flip-flop"
0"t: the T input for T flip-flop"
0"q: output, or asynchronous S input. Note that c, j, k, d and t can also"
0"   already be used as outputs"
0"Q: negated output, or asynchronous R input"
0"y: enable input: if present, only reacts to inputs if this is on. May also"
0"   replace c, then the object is a latch instead of a flip-flop."
0"Most other parts will also output signal so using q and Q is not required for"
0"that. These parts can be combined in any way, with # (visible in text mode)"
0"as filler"

s**>d**>l
    #       0"D flip-flop: when triggering c, the output will remember the state of d"
s**>c


s**>t**>l
    #       0"D flip-flop: when triggering c, the output will toggle if t is on"
s**>c


s**>j#q**>l
    ###
s**>c##     0"Serves as SR or as JK flip-flop"
    ###
s**>k#Q**>l


      p
      v
s**>j#q**>l
    ###
s**>c##     0"Same with asynch set/reset inputs added"
    ###
s**>k#Q**>l
      ^
      p


s**>q**>l
    #      0"SR latch: no clock, output remembers single switch"
s**>Q**>l



s-->dy-->l 0"D-latch (enable input instead of clock)"
     ^
     s


s-->c-->l
s-->t-->l
s-->d-->l
s-->j-->l 0"All parts combined in 1 flip-flop (not realistic but possible)"
s-->k-->l
s-->q-->l
s-->Q-->l
S-->y-->l

0"So to summarize, the 'c' and 'C' can actually mean three different things:"
0"-counter (1-input T flip-flop): when standalone with an input"
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

0"Chips support nesting, one chip can be used in the definition of another."
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

0"A timer 'R' blinks with a certain speed. It can also be toggled on and off"
0"with the mouse. The speed is given in tenths of a second, and the total"
0"period is twice that. If no number is given, the default is 0.5 seconds to"
0"toggle (so 1 second full period)."


 10R------>l


  2R------>l


  5R------>l

0"A small 'r' means it's initially not on and must be toggled on with mouse:"


  5r------>l

0"An RGB LED 'L' takes a red, green and blue input:"

2"B"s--->L<---s0"R"
         ^
         |
         |
         |
         s
        "G"



0"Capital M's form multiplexer, demultiplexer or controlled swap, depending on"
0"the configuration. Mouse over them to see a tooltip that explains each one."

0"Mux:"

    l               l l
    ^               ^ ^
    *               * *
    *               * *
s**>M**>l       s**>MMM**>l
    M               MMM
s**>M           s**>MMM
    ^               MMM
    *           s**>MMM
    *               MMM
    s           s**>MMM
                    ^ ^
                    * *
                    * *
                    s s


0"Demux:"

    l               l l
    ^               ^ ^
s**>M**>l           * *
    M               * *
    M**>l       s**>MMM**>l
    ^               MMM
    s               MMM**>l
                    MMM
                    MMM**>l
                    MMM
                    MMM**>l
                    ^ ^
                    * *
                    * *
                    s s

0"Controlled swap:"

    l
    ^
    *
    *
s**>M**>l
    M
s**>M**>l
    ^
    *
    *
    s


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

0"With a single input, it acts as an up-counter. An optional reset an be added"

         lllllll
         ^^^^^^^
         TTTTTTT<p"reset"0
               ^
               p


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
0"The invisible ones are initially zero but it will remember once you write 1"
0"bits to them"

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


0"z and Z are representations of a tristate buffer, or open collector outputs."
0"It is fake because the simulation does not support three states. In real"
0"life, you can have states 'low voltage', 'high voltage' and 'high impedance'."
0"(Other names for high impedance are 'open', 'not connected', 'floating')"
0"In the simulation, there is only zero and one. High impedance is treated the"
0"same as 0. Still, the tri-state buffer can be used as a representation of a"
0"real-life circuit"

0"As seen before, different components outputting to same wire normally gives"
0"error, and one solution is to OR them. An alternative solution here is to"
0"use tri-state buffers (or open collector outputs if you will)."

s*****          s*****          s**>z***
     *               v                 *
s*****          s***>o          s**>z***
     *               v                 *
s*********>l    s***>o****>l    s**>z*******>l

0"Note that in real life enabling multiple z's at the same time could cause a"
0"short but that is not simulated here."

0"Since the output wires are literally connected to each other, it would be"
0"a problem in real life if multiple have different voltages. Only combining"
0"open or high impedance ones with ones that have the same voltage is OK in"
0"real life."

0"Logicemu simply provides this as an alternative notation, so that you can"
0"design circuits in it and show the real-life intent."

0"There is more behavior: multiple inputs to the same z are ANDed, this you can"
0"use to actually represent a tri-state buffer with a control signal."

    s
    *
    *
    v
s**>z**>l

0"Multiple could output to some shared bus, each with a control of which only"
0"one should be active at the time, like this:"

     p
     v
 s**>z***
        *
     p  *
     v  *
 s**>z***
        *
     p  *
     v  *
 s**>z******>l

0"To summarize it:"

s****                      s****
    v                          v
s**>z**                    s**>a**
      *                          v
      *>l 1"corresponds to"      o>l
      *                          ^
s**>z**                    s**>a**
    ^                          ^
s****                      s****


s****                      s****
    v                          v
s**>Z**                    s**>o**
      *                          v
      *>l 1"corresponds to"      a>l
      *                          ^
s**>Z**                    s**>o**
    ^                          ^
s****                      s****


0"The built-in circuit where these z's are used the most, is the one named"
0"'Relay Logic'"


0"Special wires"
0"-------------"

0"Buses are a bundle of wires. Matching numbers of the bus connect to"
0"corresponding inputs and outputs. This allows to save a lot of space."


                                     llllllll
                                     ^^^^^^^^
s---0=                   =0--->l     ||||||||
s---1=                   =1--->l     76543210
s---2=====================2--->l     ========
s---3=                   =3--->l     01234567
s---4=                   =4--->l     ||||||||
                                     ssssssss

0"Wire connections without number to buses are still part of the bus,"
0"e.g. this wire crossing lets two entire buses cross:"


               =2-->l
               =1-->l
               =0-->l
               =
s---0=         =         =0--->l
s---1=         |         =1--->l
s---2=========-+-=========2--->l
s---3=         |         =3--->l
s---4=         =         =4--->l
               =
               =2---s
               =1---s
               =0---s


0"Global wires, indicated with a big dot (or 'g' in text mode), are all"
0"connected to each other. If there is a number, then to all other matching"
0"numbers. This can be used e.g. for a global clock signal or other such"
0"control signals. Imagine it as being connected by wires on the backplane"

                g----->l

s---g           g----->l

s---g0         1g----->l

s---g1         0g----->l

                g----->l


0"Antennas are another form of 'backplane' wires, connected to the"
0"corresponding 'dish' they're aimed at. Calling them 'antennas' or 'wireless'"
0"is just a metaphor. These provide another way to reduce clutter, and are"
0"especially useful for large wrap-around circuits (see the built-in cellular"
0"automata circuits)."

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

registerCircuit('Controls', `
0"Controls"
0"--------"

0"Interact with switches (s), pushbuttons (p) and timers (r) by clicking them:"

s--->l

p--->l

r--->l

0"Hover over things to see a tooltip describing them:"

llllllll    llllllll
^^^^^^^^    ^^^^^^^^
bbbbbbbb    TTTTTTTT
     ^^^           ^
     sss           s

0"Click bits (b, B) of a ROM to toggle them:"

  llll
  ^^^^
s>bbbb
s>bBbb
s>bbBb
s>BBBb

0"Shift+Click on something to highlight only that component or wire, e.g. to"
0"easily see where each of the following wires go."
0"This pauses the running circuit until you activate it again."


c>a------------------* *->l
c-V--------,,--------+-+->l
c-+-----* *+* *----* *-+->l
c-+-----+-++--*  *-+---+->l
c-+-----+-,,-----+-+---+->l
c-+---* *--------+-+---*->l
c-+-* *----------+-+----->l
c-* *------------* *----->l

0"Control+Click on something will change it to an inverted type (e.g. AND to"
0"NAND, or default-off pushbutton to default-on pushbutton)."

p-->a-->e-->o-->l

c-->l

s-->c-->l

s-->z-->l

0"User Interface"
0"--------------"

0"This briefly describes the controls at the top. You can also hover over them"
0"to get a tooltip with their explanation."

0"User Interface - First Row"
0"--------------------------"

0"The dropdowns labeled 'help', 'articles', 'circuits' all allow selecting the"
0"various built-in circuits. The current circuit is 'Controls' under 'help'"

0"The left and right arrow next to those dropdowns select the previous or next"
0"circuit."

0"The 'import' button allows to open another circuit, made by yourself or"
0"someone else. More info for that is in the 'Loading Circuits' help circuit."

0"User Interface - Second Row"
0"---------------------------"

0"The first dropdown on the second row allows to choose the 'immediate' or"
0"'electron' algorithm to run the circuits. More information on that is in the"
0"'Ticks and Emulation Algorithms' help circuit"

0"Next to that, the 'tick', 'pause', 'slow', 'norm' and 'fast' buttons all"
0"control the speed. The tick button can be used while paused to do one step."

0"The ticks indicator itself shows how many updates or state changes have been"
0"done in the circuit. Depending on the immediate or electron algorithm, ticks"
0"have a different meaning. You can click the indicator to reset it to 0."

0"To the right of the ticks indicator is a dropdown to choose between graphical"
0"or text mode. Graphical mode looks better, text may be faster and can help"
0"with editing instead. More on that is in the 'Rendering Modes' help circuit."

0"Right of that is a color scheme selector, to choose between various light"
0"or dark schemes to render with."

0"The +/- buttons allow to zoom in or out."

0"Then there is a 'change' dropdown, which allows to change a gate or other"
0"device into something else. This only works for simple devices and does not"
0"allow to change the layout. But it's useful to change a switch into a"
0"pushbutton for example."

0"Next to that is the full fledged edit button which allows to edit existing"
0"circuits or create new ones (similar to 'import')."
0"For more on that, see the 'Editing Help' help circuit. Depending on whether"
0"you used editing, there may also appear a 'forget' button to bring everything"
0"back to the normal state before you edited, and a 'restore' button to go back"
0"to the edited circuit (if not forgotten). Note that if you care about a"
0"circuit you edited or created, you should back it up to your disk in a text"
0"editor, since logicemu only stores it in local storage of your browser, where"
0"it can easily get lost (it does not store it online), and only stores one."

`, 'controlshelp');

registerCircuit('Rendering Modes', `
0"Rendering Modes"
0"---------------"

0"There are two rendering modes: text (ASCII) and graphical (HTML5 canvas)."
0"They can be selected with a dropdown in the top menu."

0"The graphical mode draws nice wires, boxes around components, device inputs"
0"as neatly drawn arrows and negated inputs as little circles. This is the"
0"default mode."

0"The text mode on the other hand draws everything with ASCII characters,"
0"matching how you edit circuits. Gates use the similar letters as the"
0"graphical mode, but now every cell uses some ASCII character, e.g. wires are"
0"broken up into different characters (depending on direction, how to connect,"
0"...). To learn the meaning of the characters, see the editing help"
0"instead."

0"The text mode may render faster in some browsers, especially for huge"
0"circuits."

0"Try out the two modes on the circuit below by changing the dropdown at the"
0"top between 'graphical' and 'text':"

      l   lll
      m  lUUGl
      |   |ll  ####
   p--+---%--->l###   l
      |   |           ^
s---*******--->e>l** *|*>T
      v       >     x X
s---->a-****-->a>l** *|*>l1
      |  ***          s
    s-Vl ***     l
      l     ;   ^
             ; /
              *

0"You can also zoom in and out with the - and + buttons, and change the color"
0"scheme. These controls, too, are in the top bar."

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"

0"FIT:y"
`, 'renderhelp');

registerCircuit('Ticks and Emulation Algorithms', `
0"Ticks and Emulation Algorithms"
0"------------------------------"

0"It matters how you emulate circuits: when, how and how fast gates read their"
0"inputs. For some circuits, it's interesting to look at the signal propagating"
0"through individual gates, for others global fast response is more desired."
0"For that reason there are multiple emulation algorithms, selectable with a"
0"dropdown above."

0"E.g. the following circuit is most interesting in 'electron mode'. If you hit"
0"the button, you see the signal go round and round. In immediate mode, that"
0"would not be visible."


p**>e>e>e>e>e>e>e>e
    ^             v
    e             e
    ^             v
    e             e
    ^             v
    e<e<e<e<e<e<e<e

0"Normally you don't have to set this yourself, as the best mode is chosen"
0"automatically for each circuit loaded. But if you are interested to mess"
0"around with it, read on below."


0"The Details"
0"-----------"

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
0"*) immediate: updates propagate through all components in a sorted order. This"
0"   is done when you press a switch or button or when a timer ticks and keeps"
0"   ticking until things stop changing (in combintional circuits, that's after"
0"   one tick, for sequential ones or with loops, can be more)."
0"*) electron: updates are done every so many milliseconds, but this update is"
0"   different than the update done for immediate mode. Instead, every component"
0"   updates only based on the previous state of its input components. This"
0"   means signals propagage more slowly, as if you can follow the electric"
0"   signal itself. This mode is good for circuits that build flip-flops from"
0"   primitive components (rather than using the built-in ideal flip-flops)"
0"   This mode also adds one more extra igredient: it adds some randomness to a"
0"   particular kind of double-linked loop as you find in an SR latch, and this"
0"   is loosely based on realistic physics of a flip-flop in metastable state"
0"   eventually reaching a stable state anyway. So indeed the electron mode is"
0"   mainly designed to simulate such behavior in a realistic way. The"
0"   immediate mode is good and fast but can't simulate matastability, hence"
0"   the reason to provide the slower 'nanosecond level' electron mode."


0"A circuit, when just loaded, will automatically be in one of the modes that"
0"is most suitable for the circuit: if there are no loops, it'll choose"
0"immediate mode. If there are particular types of short loops, electron mode."
0"In other cases with loops, immediate mode. A mode may also be enforced with a"
0"comment like this, which in this circuit sets it to electron initially:"

"MODE:electron"

0"Now for some demonstrations of the difference between the modes. Use the"
0"dropdown to switch to the algorithm applicable for each example as explained"
0"by its description:"

0"With the circuit below, try the 2 modes: with immediate mode, the LED updates"
0"immediately to the state of the switch. With electron, you can see the signal"
0"propagate through the gates. If you use the pause button, you can use the"
0"tick button to manually propagate the signal."


s->o->o->o->o->o->o->o->o->l

0"The circuit below goes slow in immediate mode too, because 'd' are delays"
0"which are designed to work per sequential tick on purpose."

s->d->d->d->d->d->d->d->d->l

0"Below is a 4-bit adder circuit. A combinational circuit like this works in"
0"works immediately in a single tick in immediate mode. There are some long"
0"connections that go through many gates, but none of them are loops.  Electron"
0"gives slower updates so you can see the adder operating but it'll reach the"
0"correct answer soon. You can see how many ticks it takes with the timer"
0"indicator at the top. You can reset that one to 0 by clicking it."


          "8       4       2       1"
           l       l       l       l
           ^       ^       ^       ^
     **a<*>e **a<*>e **a<*>e **a<*>e
     v ^ * ^ v ^ * ^ v ^ * ^ v ^ * ^
"c"l<o **+***o **+***o **+***o **+***s"c"
     ^   *   ^   *   ^   *   ^   *
     a<*>e   a<*>e   a<*>e   a<*>e
     ^ * ^   ^ * ^   ^ * ^   ^ * ^
     **+**   **+**   **+**   **+**
       * *     * *     * *     * *
       s s     s s     s s     s s
     "b8 a8   b4 a4   b2 a2   b1 a1"

0"However, for a circuit with a loop, multiple ticks happen even in immediate"
0"mode. Here is a very simple example: When you turn the switch from 'off' to"
0"'on', the counter will disable itself a tick later.  This example is very"
0"simple, a more important case is for example when there is memory, then some"
0"computation happens on the memory, then the result is stored back into the"
0"original memory."

    ***
    v *
s**>c**>l

0"Another example of something that needs multiple immediate ticks is the delay."

s**>d**>l

0"An example of something that requires electron mode is a 1-tick pulse made"
0"from gate delays (without using 'd' but regular gates). In electron mode,"
0"this will pulse once when activating the switch. In immediate mode, it'll"
0"just stay off."

p****>o**]a**>l
    *     ^
    *******

0"Another electron example: in electron mode, the signal you make with"
0"the switch will loop around in a much nicer way than in immediate mode."

s**>e>e>e>e>e>e>e>e
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

0"The randomness is not present in immediate mode. Due to the way those"
0"algorithms work, such loopy circuits settle to a well defined state"
0"immediately. The electron mode is physically more realistic, but slower."

0"An interesting circuit to compare the different modes is the 8-bit divider"
0"circuit. This divider has a very long longest path, but in immediate mode you"
0"see updates immediately. In electron mode, you can see the circuit flow for a"
0"long time, when changing the right buttons of the divider."

0"FIT:w"

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`, 'algohelp');


registerCircuit('Loading Circuits', `
0"For loading circuits, there are multiple options:"

0"1. Navigation"
0"-------------"

0"First of all, you can load the built-in circuits, like this help one right"
0"here, with the dropdowns navigation at the top, or the welcome page links."


0"2. Importing (Source Code)"
0"--------------------------"

0"A second method, to load external circuits, is to load a circuit with"
0"'import' (or 'edit'). Then you need to get the source code from a circuit and"
0"paste it in the box. You can view the source code of circuits yourself with"
0"the 'edit' button (see the editing help for that). Source code of a"
0"circuit looks for example like this:"

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

0"A fourth method is through an id in the URL. This works only for built-in"
0"circuits. If you see '#id=....' in the URL, it means you can load that"
0"circuit directly from that URL, rather than see the main welcome page first."
0"For example:"

0"lodev.org/logicemu/#id=logic_gates"

0"These ids are built-in and known offline by LogicEmu (for the offline"
0"built-in circuits), they are not sent to any web server or cloud and require"
0"no internet connectivity."

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`, 'loadinghelp');


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

registerTitle('Editing');

registerCircuit('Editing Help', `
0"This tutorial introduces all the parts and cell characters for editing."

0"Editing is done with ASCII text. The simulation is cell based: Every"
0"character is a cell. Cells contain wires, parts, and so on. Devices can span"
0"multiple cells, e.g. a long wire, an enlarged AND gate, ..."

0"In fact, to show better how circuits are built in this editing help, we"
0"force text rendering mode instead of graphical here with the following"
0"command:"

0"RENDER:text"

0"Editing can be done in the browser here with the 'edit' button in the top"
0"bar. It is possible and more pleasant to do the actual editing itself of that"
0"circuit from the text field in a good plain text editor (one that supports"
0"block selection). Then paste the finished circuit back in the box to try it"
0"out"

0"Try out the edit button here: You can change the AND gate below into an OR"
0"gate, by turning the 'a' into an 'o'. Press the 'edit' button, find this and"
0"gate in it, change the a into an o, and press 'done'."

s**>a**>l
    ^
s****

0"Note how not only that logic gate but also this text itself was in there."
0"That is because this whole page including all text is a circuit you can edit!"

0"Once you edited a map with the 'edit' button, it is saved in the local"
0"storage of the browser (but not sent to the internet nor shared, it's just"
0"local on your machine). If you reload the page, at least without any hash"
0"tags (#id or #code) in the URL, you will get back the edited circuit instead"
0"of the regular welcome page. Use the 'forget' button to remove it."

0"Note that local storage is unreliable, save circuits for example to your disk"
0"with a text editor instead to safely keep them (or use version control, ...)."

0"In addition, when you edited a map, there may be a '#code=...' code in the"
0"URL. This is a local-only (not on a server) base64 code containing the entire"
0"circuit compressed inside of it. You can use this URL as an alternative way"
0"to share circuits, although it is less good looking and less reliable than"
0"sharing the actual ASCII circuit. The code is not present if the circuit is"
0"too big for a reasonable URL length."

0"Instead of the 'edit' button, you can also use the 'import' button to load an"
0"edited circuit. The difference is with the import button it doesn't show the"
0"code of the current circuit, it's simpler to just import with it."

0"That explained how to actually edit, most of the rest of this tutorial"
0"describes all the different parts and ASCII characters, their bahavior and"
0"how to use them to make the circuits you want."

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
0"through the output wires when on. In real life this would make no sense, as"
0"an electrical circuit must be closed. However, in this simulation (and, in"
0"fact, logic diagrams in general) it makes perfect sense: only signal wires"
0"are shown, wires to power sources or for closing the circuit are hidden, no"
0"need to draw them, they are implicit."

0"Click the green switches with the mouse to toggle them"

          *
s******   *
          S

0"NEW PART: device inputs"
0"^, >, v, <: north, east, south, west device inputs"

0"These arrow heads connect a wire to the input side of devices such as logic"
0"gates and LEDs. While not introduced yet, below we use an 'o' diode to"
0"demonstrate them best. A wire directly connected to some device is an output"
0"of that device, while when connected with an arrowhead it's an input. so the"
0"signal below goes from the switch s to the o and then from the o to the l:"

s****>o****>l

0"NEW PART: LED"
0"l: LED/light (user output)"

0"The LED serves as outputs, to indicate the result. Here of course it's used"
0"on the simplest possible circuit so all the result shows is the same as the"
0"input switch. This is considered a full circuit though: with both an input"
0"and an output. It's not closed, like a real electric circuit, because wiring"
0"to power sources is implicit."

s****>l   S****>l

0"NEW PART: push button"
0"p and P: initially off and initially on push button"

0"these toggle back to original state when releasing the mouse button"

p****>l   P****>l

0"This switch will only leave through the push button signal if the switch is"
0"on itself"

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
0"Different devices (here l and s) also don't interact if they touch, they are"
0"individual LEDs and switches The circuit with * instead of -| operates as one"
0"because those *'s are all connected"

          lll
          ^^^
s----->l  |||     *****>l
s----->l  |||    s*****>l
s----->l  |||     *****>l
          |||
          sss

0"NOTE: for style reasons, most built-in circuits use '*' for most wires with"
0"some distance bewteen them and only use --- or | for close packing when"
0"really needed. This is purely up to personal preference though."

0"NEW PART: comments"
0"double quote: encloses comment, numbers: alter alignment, colon: vertical
0"              comment"

0"Comments, like this text here, are made with double quotes. The comment"
0"starts at a quote and ends at the next quote on the same line. A number"
0"before the first double quote (or alternatively after the last) can also"
0"enable aligned text."

0"Below the different types of alignment are shown. The quotes themselves are"
0"not visible in the rendering (not even in text mode), only in the source"
0"code, so use the 'edit' button to see this part"

"In quotes: regular comment, 1 character per cell"

0"In quotes with 0 prepended: left aligned narrow width"

1"In quotes with 1 prepended: center aligned narrow width"

2"In quotes with 2 prepended: right aligned narrow width"

3"quotes with 3: 1 char per cell, shifted left a bit"

4"quotes with 4: 1 char per cell, shifted right a bit"

0"Vertical comments can alternatively be made with a colon above and below:"

  :
  v
  e
  r
  t
  i
  c
  a
  l
  :

0"Note: It's safe to use a colon in a horizontal comment, but you can't use a"
0"quote in a vertical comment, it'll be used to comment a line horizontally."

0"NEW PART: isolators"

0"(space), @ and comments: isolators, do not connect anything, no signal goes"
0"through Normally space is used as isolators. @ can be used to indicate"
0"shapes, such as drawing a case around something. Comments are isolators, no"
0"matter what is inside them (even if commented-out circuits)"

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

0"These invert the input signal, and will be rendered with a small circle in"
0"graphics mode."

s****]l   S****]l

s****      s****      s****      s****      s****      s****
    w          w          w          w          w          w
s**]o**>l  s**]a**>l  s**]e**>l  s**]O**>l  s**]A**>l  s**]E**>l

0"NEW BEHAVIOR: multi-input gates"

0"Gates can have more than two inputs, for example three below, more is"
0"possible if the gate would be large enough, how to do that is introduced a"
0"bit further (extending with # or $). Note that multi-input XOR gates act as"
0"parity gates"

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

0"Gates can also work as expected with 0 inputs, and that includes the 0-input"
0"AND gate outputting a signal and the NAND gate not outputting a signal. The"
0"reason an AND gate with 0 inputs outputs a value, is because the rule of an"
0"AND gate is: it outputs when it does not have any 'off' inputs. This is also"
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
0"connected wire shape a single wire in the simulation's terminology. In the"
0"internals of the simulation, the entire wire, with all splits and arrow"
0"heads, is actually an extension of s (its output), and internally part of s."

s*********>l
      *
      ****>l
      *
      ****>l

0"But multiple different outputs inputting to the same wire is an error As seen"
0"above, the wire is an extension of the part it outputs from. So here it would"
0"be three different switches at the same time, which is of course impossible."

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
0"large or specially shaped switches and LEDs. Remember, devices like s, l, o,"
0"a, e that touch don't interact with each other when touching but work"
0"independently, so # is needed to extend its area instead"

lllll    lllll    lllll    ###
^^^^^    ^^^^^    ^^^^^    #l#
|||||    |||||    |||||    ###
o####    e####    e####     ^
^^^^^    ^^^^^    ^^^^^    ###
|||||    |||||    |||||    #s#
sssss    sssss    sssss    ###

0"$ is similar to #, but it does not interact with inputs or wires (and can be"
0"considered to only extend surface area, nothing more), it can be used to"
0"allow squeezing inputs through the following LCD display without interacting"
0"with unwanted segments:"


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

0"The device extender is used for logic gates, LEDs, switches and other single-"
0"cell devices. However, for large devices which are introduced below, like T,"
0"i, M, B, b, the extenders are not (always) needed, for those the letters"
0"themselves usually connect with each other, unlike a, o, e, etc... do."

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION III: Flip-Flops And Memory"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"NEW PART: counter"
0"c,C (standalone): initially off,on counter"

0"This is a counter or mono-input T flip-flop. Whenever the input toggles on,"
0"the c changes its state, so its output toggles at half the rate as the input."
0"capital C starts in on state instead of off state, other than that behaves"
0"the same."

s**>c**>l     s**>C**>l

0"This can make a binary counter, although it counts backwards in this simple form"

s**>c**>c**>c**>c**>c**>c**>c**>c**>l

s**>C**>C**>C**>C**>C**>C**>C**>C**>l

0"NEW PARTS: flip flop parts"
0"c, C, j, k, d, t, q, Q, y: flip-flop parts (clocked with c). combine them"
0"freely."

0"j, k, d and t are inputs for JK, T, D, and SR flip-flops."
0"c is the clock input and what stores the state. use C to have it initially on."
0"q and Q are output and negated output, and asynch set and reset inputs."
0"y is an optional enable input, if not on, the flip-flop ignores all inputs."
0"NOTE: the inputs for SR flip-flop are named J,K like for JK flip-flop, since"
0"JK flip-flop behaves the same as SR for all allowed SR input combinations,"
0"and the names S and R are already used for other non flipflop related parts"
0"These parts can be combined in any way, with # (visible in text mode) as"
0"filler"

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


s**>q**>l
    #      0"SR latch: no clock, output remembers single switch"
s**>Q**>l



s-->dy-->l 0"D-latch (enable input instead of clock)"
     ^
     s


     s
     v
s-->jq**>l
s-->k#
s-->dy<**S 0"Combining every single part (not useful but possible)"
s-->t#
s-->cQ**>l
     ^
     s

0"This is only a selection of the combinations you can do with those. Also, you"
0"can make flip-flops from the ground up with more basic components instead as"
0"well (e.g. NAND-only). Other built-in circuits demonstrate those."

0"NEW PART: delay"
0"d (standalone): 1-tick delay (behavior depends on tick algorithm)"

s**>d**>l

s**>d**>d**>d**>d**>d**>d**>l

0"Numbers from 2-256 make d become an N-tick delay, with buffer that remembers"
0"all upcoming tick values, so it behaves like N d's in a row"

s**>d**>l
    6

s**>d**>l
    1
    6

0"Note that this means a very short pulse still stays a very short pulse, it"
0"just is delayed. If you want to guarantee a certain minimum pulse length (at"
0"least for a single short input), try the following:"

   *****
   *   v
 p**>d>c**>l
     1
     6

0"Note: the data (j,k,d,t) inputs of a flip-flop must already be set before the"
0"clock signal ('setup time'). Enabling the clock and data signal at the exact"
0"same time does not work. This is expected behavior, otherwise shift registers"
0"wouldn't work. For example this d flip-flop cannot be toggled on due to the d"
0"input arriving at same time as clock which is too late:"

s**>d**>l
  * #
  *>c

0"Putting a delay at the clock input solves this (note that in this silly"
0"example once on it can't be turned off):"

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

0"RAM, binary address select. 16 lines, only 5 visible here, so you won't see"
0"the line in hardware if you select an address higher than 4 but it can still"
0"internally store the state. Choose a low address, enable some data bits and"
0"use 'store' to see some small b's become capital B's, indicating a 1 is"
0"stored in this bit"

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

0"I and i respectively define and use integrated circuit (IC). Numbers are used"
0"to identify them. This allows to design and reuse templates or sub-circuits."
0"Everything connected to parts touching the capital I defines the circuit for"
0"that number. Space or strings break the connection, but the @ isolator allows"
0"still connecting to the I The small i behaves as a copy of the large"
0"template."

    l   lI5    ll    ll
    ^   ^      ^^    ^^
    a< >e      ||    ||
    ^ x ^      i5    i5
    ** **      ^^    ^^
    *   *      ||    ||
    s   s      ss    ss

0"The master template must use exactly s as input and l as output, to mark"
0"them. In the copy any gate inputs to the ic count as input and wires exiting"
0"count as output, so copies can use anything, including gates and other"
0"template copies, as inputs and outputs"

0"Copies must have exactly the same amount of inputs and outputs as the"
0"template, and in the same directions (except if rotated, see below), else it"
0"indicates yellow error as shown here (1 input missing):"

 ll
 ^^
 ||
 i5
 ^
 |
 s

0"Use more i's (or #) to make the copy bigger if space to attach more inputs is"
0"required."

 l  l
 ^  ^
 *  *
 iii5
 ^  ^
 *  *
 s  s

0"While the template must use 's' to indicate inputs and 'l' to indicate"
0"outputs, any instances may use anything, such as gates, other chips, ... as"
0"inputs and outputs"

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

0"Inputs are matched to the template by their direction (north, east, south,"
0"west), and their order in this direction. Other than that, the shape and"
0"location of the inputs and outputs is freeform, e.g. see how the 'p' in the"
0"copy is more to the left while it matches the rightmost s of the template:"
0"that's because this is the only input coming from the east, so they match"

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

0"You can nest templates, 1 template can refer to others, e.g. here we use the"
0"I5 from above inside a new template I8 (we're making a full adder from two"
0"half adders here by the way):"

l   lI8    l   l     l   l
^   ^      ^   ^     ^   ^
o<ii5      *   *     *   *
^ ^ ^      iiii8     iiii8
ii5 *      ^ ^ ^     ^ ^ ^
^ ^ *      * * *     * * *
s s s      s s s     s s s

0"NEW BEHAVIOR: rotated chips"

0"Chips can be rotated in steps of 90 degrees if desired. To do this, rotate"
0"the position of the number compared to the small i in a different position"
0"than the number is compared to the large I of the template. If there is any"
0"ambiguity, such as the number being surrounded by i's from multiple sides or"
0"it being the IC with no number at all then it will not rotate and take the"
0"templat's rotation."

0"E.g. here chip 5 from above is rotated:"

l<5<s
  i
l<i<s

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION V: Extra Parts"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"These parts do not extend the logic abilities, but allow different ways of"
0"input/output interaction"

0"NEW PARTS: timers"
0"R: timer initially on, r: timer initially off"

0"This is a realtime timer. It can be toggled on or off with mouse r is"
0"initially off (does not tick at all and must be enabled with mouse like a"
0"switch). R is initially on. During operation, the capital letter means it's"
0"not paused, and the color means it's outputting the signal or not based on"
0"current phase"

r****>l   R***>l

0"NEW PARTS: numbers"
0"0123456789: affect various properties of other parts"

0"Numbers were already encountered above for a few parts. Numbers affect many"
0"things including: LED colors, timer speeds, IC indices, delay durations,"
0"bus/bundle wire numbers, etc..."

0"Here numbers on LEDs and timers are demonstrated."

0"Timer speeds are the toggle-interval in tenths of a second (exceptions: no"
0"number gives 0.5 seconds, number 0 gives 1 second)"

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

0"But this does NOT work as intended, the timer will be parsed as having a"
0"speed of 1, not as 15, because it only parses the number in a straight line"
0"from the r:"

  R**>l 0"DOES NOT WORK AS INTENDED!"
  15

0"NEW PART: RGB LED"
0"L: RGB LED"

s*>L<*s
   ^
   *
   s

0"NEW PART: Mux"
0"M: Multiplexer (various functions)"

0"Multiple M's that touch together form a multiplexer, or, in other"
0"configurations", a demux, controlled swap, and possibly with more than two"
0"inputs/outputs and passthrough of the select signal."

0"Mux:"

    l               l l
    ^               ^ ^
    *               * *
    *               * *
s**>M**>l       s**>MMM**>l
    M               MMM
s**>M           s**>MMM
    ^               MMM
    *           s**>MMM
    *               MMM
    s           s**>MMM
                    ^ ^
                    * *
                    * *
                    s s


0"Demux:"

    l               l l
    ^               ^ ^
s**>M**>l           * *
    M               * *
    M**>l       s**>MMM**>l
    ^               MMM
    s               MMM**>l
                    MMM
                    MMM**>l
                    MMM
                    MMM**>l
                    ^ ^
                    * *
                    * *
                    s s

0"Controlled swap:"

    l
    ^
    *
    *
s**>M**>l
    M
s**>M**>l
    ^
    *
    *
    s

0"These muxes are optional for convenience, notation or compactness, you can"
0"also instead make them with AND and OR gates or from NAND gates only."

0"NEW PART: Interactive terminal"
0"T: Interactive multiline terminal (7-bit ASCII)"

0"This is made from a rectangular grid of T's, but you cannot see the T's when"
0"rendered, it shows it as a black screen on which arbitrary characters can"
0"appear, even in text mode. So you have to view the source code with the"
0"'edit' button to see how this one is made."

0"It can have different functions: ASCII keyboard, screen, both, or decimal"
0"input/display"

0"With only inputs, it acts as a screen that can read 7-bit ASCII codes from"
0"any circuit inputs:"

TTTTTTT<***p"read"
TTTTTTT
TTTTTTT
TTTTTTT
^^^^^^^
|||||||
SsssssS"ASCII code in to screen"


0"With only outputs, it acts as a buffered keyboard. You can type at any time,"
0"it remembers all keystrokes, and they can be read one by one by enabling the"
0"'out' bit. If the blinking cursor is not present, click it with the mouse"
0"first, then type with your real keyboard. When there are no further typed"
0"characters to output, the eof bit will be enabled when out goes high NOTE:"
0"this configuration represents a keyboard, not a screen, but you still see a"
0"little screen rendered anyway, this is only present to show the blinking"
0"cursor and some characters to show it noticed your typing."


         lllllll"keyboard ASCII code out"
         ^^^^^^^
         |||||||
"out"p**>TTTTTTT
         TTTTTTT
"eof"l<**TTTTTTT

0"If you give the VTE both inputs and outputs, it acts as both a screen and a"
0"buffered keyboard. The screen shows both typed characters and characters read"
0"from the circuit. It will only output typed characters to the circuit. If the"
0"blinking cursor is not in here but in the other one, click it with the mouse"
0"to focus this one:"

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

0"With only inputs and no read/out flags, it will instead show the binary input"
0"in decimal."

         TTTTTTTT"decimal"0 T
         ^^^^^^^^           ^
         ||||||||           |
         sSsssssS"binary"0  s

0"With only outputs and no read/out flags, it will instead convert typed"
0"decimal value to binary, if the number parses as a valid decimal number."

         llllllll
         ^^^^^^^^
         TTTTTTTT

0"With a single input, it acts as an up-counter. An optional reset an be added"

         lllllll
         ^^^^^^^
         TTTTTTT
               ^
               p

         lllllll
         ^^^^^^^
         TTTTTTT<p"reset"0
               ^
               p

0"NEW PART: Random generator"
0"?: random generator"

0"The random generator will change to a random value on any positive or"
0"negative edge of the input and have a random initial value."

?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l

s**>?**>l

R**>?**>l
1

0"NEW PART: tri-state buffer (or open collector output)"
0"z, Z: fake tri-state buffer"

0"z is a fake representation of a tristate buffer. It is fake because the"
0"simulation does not support three states. In real life, you can have states"
0"'low voltage', 'high voltage' and 'high impedance'. (Other names for high"
0"impedance are 'open', 'not connected', 'floating'). In the simulation, there"
0"is only zero and one. High impedance is treated the same as 0. Still, the"
0"tri-state buffer can be used as a representation of a real-life circuit"

0"As seen before, different components outputting to same wire normally gives"
0"error, and one solution is to OR them. An alternative solution here is to"
0"use tri-state buffers (or open collector outputs if you will)."

s*****          s*****          s**>z***
     *               v                 *
s*****          s***>o          s**>z***
     *               v                 *
s*********>l    s***>o****>l    s**>z*******>l

0"Note that in real life enabling multiple z's at the same time could cause a"
0"short but that is not simulated here."

0"Since the output wires are literally connected to each other, it would be"
0"a problem in real life if multiple have different voltages. Only combining"
0"open or high impedance ones with ones that have the same voltage is OK in"
0"real life."

0"Logicemu simply provides this as an alternative notation, so that you can"
0"design circuits in it and show the real-life intent."

0"There is more behavior: multiple inputs to the same z are ANDed, this you can"
0"use to actually represent a tri-state buffer with a control signal."

    s
    *
    *
    v
s**>z**>l

0"Multiple could output to some shared bus, each with a control of which only"
0"one should be active at the time, like this:"

     p
     v
 s**>z***
        *
     p  *
     v  *
 s**>z***
        *
     p  *
     v  *
 s**>z******>l

0"To summarize it:"

s****                      s****
    v                          v
s**>z**                    s**>a**
      *                          v
      *>l 1"corresponds to"      o>l
      *                          ^
s**>z**                    s**>a**
    ^                          ^
s****                      s****


s****                      s****
    v                          v
s**>Z**                    s**>o**
      *                          v
      *>l 1"corresponds to"      a>l
      *                          ^
s**>Z**                    s**>o**
    ^                          ^
s****                      s****


0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION VI: Parts for shortcuts and compactness"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"These parts and behaviors are not necessary to make logic circuits, but can"
0"help make things more compact. Some are very useful all the time, others are"
0"included only for rare situations when they actually help make something more"
0"readable."

0"NEW PARTS: diagonal wires"
0"'/' and '\\': diagonal wires."

0"NOTE: because backslash has special meaning in many programming language"
0"strings, ';' can be used as an alternative. It will still be rendered as \\"

      >l  l<
     /      ;
    /        ;
   /          ;
  /            ;
 s              s

0"NEW BEHAVIOR: diagonal inputs"

0"An input of the form ^ > v < m ] w or [ that touches nothing where it points"
0"at but touches something diagonally on one or both sides of that point, acts"
0"as one or two independent diagonally crossing diagonal inputs"



 l l      l l
  ^       ^ ^
 s s      a e
          ^^^
          s s

0"Those diagonal inputs read diagonally even from wires going up, nothing else"
0"can do that"

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

0"g with numbers: more independent global wires"

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

0"These are another form of 'backplane' wires, connected to the corresponding"
0"'dish' they're aimed at. Calling them 'antennas' or 'wireless' is just a"
0"metaphor. These provide another way to reduce clutter, and are especially"
0"useful for large wrap-around circuits."

         l             l
         ^             ^
         |             n
  s--(   |  )-->l
         |
  (--s   |  l<--)      u
         s             s


0"The antenna connects to its corresponding opposing horizontal or vertical"
0"side of the other antenna, each independently"

          l
   s      ^
   |      |
 s-(-s l<-)->l
   |      |
   s      v
          l

0"The antenna can also connect some non-wire-like connections, such as be"
0"in-between an input and a device"

 s--->(    )l

0"Antennas can be nested recursively:"

 s-(   s-(    )->l   )->l

0"The antenna has very specific special rules for diagonal connections. Those"
0"are too detailed to explain in this tutorial, but the goal of the rules is"
0"that you can make wrap-around circuits including diagonal connections like"
0"this:"

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
0"=: bus"

0"A bus is a bundle of wires through which multiple connections can go. Numbers"
0"indicate which internal wire connects to external wire. Matching numbers"
0"connect, but disconnected buses are independent, so can reuse numbers"

 l  l  l  l  l  l  l
 ^  ^  ^  ^  ^  ^  ^
 |  |  |  |  |  |  |
 0  1  2  3  4  5  6
 ===================
 6  5  4  3  2  1  0
 |  |  |  |  |  |  |
 s  s  s  s  s  s  s

0"Buses can connect all their internal wires through a regular wire. Wire"
0"crossings act as expected on this (so two independent buses can cross without"
0"interacting). Note that all these bus connection are resolved already during"
0"initial parsing of the circuit, while running the simulation nothing special"
0"gets simulated in those buses, because the simulation has all gates connected"
0"directly to other gates in a data structure that was built during parsing,"
0"just like regular wires, all the buses did was tell which gates connect to"
0"which"

            =1->l
            =2->l
            =3->l
            =
            |
   ====-----+-----====
   123      |      123
   |||      =      |||
   sss      =1-s   vvv
            =2-s   lll
            =3-s


0"The above shortcuts and behaviors are all still considered readable style."
0"Below follow some more new parts that allow packing wires and devices even"
0"closer, however they may make circuits ugly and unreadable."

0"SUGGESTION: avoid using the parts and behaviors below unless absolutely"
0"necessary for compactness"

0"NEW PARTS: Non-interacting wire corners"
0",: non-interacting wire corner"

0"This is a corners or split that can be more closely packed than *. They"
0"interact with other wires, but not with their own kind."

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

0"Diagonal wires themselves can also act as a wire crossing due to connecting"
0"to corners:"


 l    l
 ^    ^
  ;  /
   ;/
   /;
  /  ;
 s    s

0"Even though x, / and \\ can interact with * diagonally,"
0"*'s still don't interact diagonally with each other, so no output possible"
0"here:"

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

0"Device inputs > < ^ v ] [ m w output on exactly one side, but can receive"
0"their input from any of the other sides (3 direct neighbors, and 4 more from x)"

                                          s
s---v              >l       s--* >l        ;l<
    l        s-----*            x           x
                   >l       s--* >l        /l<
                                          s

0"Normally you connect 1 wire to 1 input side of a device input. It is possible"
0"to connect multiple, everything attached to the multiple input sides is"
0"connected together as 1 wire, so the signal passes through"

s---v----v----v---->l
    l    l    l

0"Connecting outputs from different devices to the same device input gives an"
0"error. This is the same rule as seen earlier that you cannot connect outputs"
0"from different devices to a single wire"

s--v--s
   l

0"NEW PART: multi device input"
0"U: regular multi device input, G: inverted multi device input"

0"These are normal and inverted device/gate inputs outputting to multiple sides"
0"they connect to each other and wires, and output to all devices, no matter"
0"what direction. They do not interact with other gate input types"

       l  l
s------UU-UGl
       l  l

0"NEW PART: device input crossing"
0"V: regular device input crossing, W: inverted device input crossing"

0"These are a combination of wire crossing and normal or inverted device input"


    l         l           s---->o--------->l
   lh-s      lH-s         s-----he-------->l
    |         |           s-----+ha------->l
    s         s                 ||^
                                sss

0"V and W work also diagonally. So can serve also as simple diagonal device"
0"inputs"

s     s              l
 ;     ;            V
  V     W     s----*
   l     l          V
                     l

0"NOTE: the diagonal usage of ^ seen earler above is also a type of wire"
0"crossing input, and the diagonal ^ is a nicer looking style than what you can"
0"make with V."

0"V and W can also work as a regular wire crossing, in fact it does the same as"
0"capital X in that case:"

l   l   l
 V  ^  V
  ; | /
   ;|/
s---V-->l
   /|;
  / | ;
 /  |  ;
s   s   s

0"NEW BEHAVIOR: integrated circuits diagonal inputs/outputs"

0"Chips, too, can have diagonal inputs and outputs:"
0"For the definition, x from s as inputs, and V to l as outputs"
0"For the usages, V to the chip as its inputs, x from the chip as outputs"

   s  s  s  l
    ; | /  V               s s s >l
     vvv  *                * | */
     e###>O                 VvV/
  s->#I9#-->l              s>i9-->l
     ####                   V^V
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

0"'MODE: immediate' --> force immediate mode"
0"'MODE: electron' --> force electron mode"
0"'RENDER: text' --> force text mode rendering (ascii)"
0"'RENDER: graphical' --> force graphics mode rendering (canvas)"
0"'FIT: w' --> zoom horizontally to full width, even if it means scrolling y"
0"             (the w means 'full width')
0"'FIT: r' --> don't take anything to the right of this marker into account for"
0"             zooming so causes less zoom out (the r is from 'right side')"
0"'FIT: y' --> if possible zoom vertically such that top up to this marker is"
0"             visible. If two such markers present, zoom such that height"
0"             matches their vertical distance."
0"'INSERT: toc' --> inserts a table of contents of built-in circuits here"
0"                  this also also works with 'toc_main' and 'toc_help'"

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"Epilogue"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"This concludes the editing help, and showed most of the different"
0"behaviors of different cells and parts."


`, 'editing');


registerCircuit('ASCII symbol summary', `
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

0"cC: flip-flop clock, counter, constant"
0"jkdt: flip-flop inputs"
0"qQ: flip-flop outputs/asynch inputs"
0"y: flip-flop enable"

0"EXTENDED"
0"--------"

0" @: isolator"

0",: wire corner that doesn't interact with itself"
0"/\\: diagonal wires"
0"&%: double wire corners"
0"g: global backplane wires"
0"=: bus (bundle of wires)"
0"()un: straight connected backplane wires, 'antennas'"

0"I: IC template"
0"i: IC instance"

0"UG: normal/inverted device inputs that work in 4 directions"
0"VW: normal/inverted wire crossing device input (works diagonally too)"

0"z: tri-state buffer"

0"L: RGB LED: 3 inputs, red, green and blue"
0"rR: real-time timer"

0"bB: ROM/RAM bits"
0"T: terminal (ASCII keyboard/screen)"
0"?: random generator"

0"$: extend the surface area of devices without input/output interaction"
0"0123456789: modifiers: LED color, timer speed, bus/ic/backplane id"

0"FIT:y"

`, 'symbols');


registerCircuit('Editing Side Notes', `

0"A few extra side notes for editing"

0"Interchangeable ASCII characters"
0"--------------------------------"

0"There are a few pairs of ASCII charcters that have the same or similar meaning:"

0"@ and ASCII space: both are isolator. @ is slightly different because it can"
0"connect IC templates while space ends them, and @ can be used as visual aid"
0"such as drawing a casing around a device"

0"ASCII backtick and ASCII double quote: the backtick will be replaced by"
0"double quotes, for text in circuits"
0"--> this helps with defining circuits in double quoted strings in"
0"    programming languages. Tip: use raw string literals when available."

0"; and \\ (ASCII backslash): the ; will be replaced by backslash in the"
0"circuit (but not inside comments)"
0"--> this helps with defining circuits in strings in programming languages."
0"    Tip: use raw string literals when available (but in JS \\ still has"
0"    special meaning in raw strings)."

0". and *: the . has the same functionality as * (wire)"
0"--> this helps with drawing circuits on paper"

0"Style used in built-in circuits"
0"-------------------------------"

0"Most built-in circuits use a certain style that is not optimally compact but"
0"looks better. It works as follows:"

0"For wires, mostly * is used, no - or |, forcing to have a 1-cell gat between"
0"neighbor wires. So no closely packed wires. The only exception is for ROM and"
0"Terminals and sometimes for multi-bit signals."

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
0"in particular 'V', 'W', 'G', '%', '&' and touching >^<v inputs from sides"

0"yes:"       0"no:"       0"no:"

s**>a**>l     s*&>a**>l   s**>a**>l
   >            &+U          V
s**>e**>l     s**>e**>l   s**>e**>l

0"Centers and corners of devices are aligned on a certain grid for aesthetic"
0"reasons:"

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
0"to make nicer looking circuits than trying to make everything as small as"
0"possible with compaction tricks. However, there's no need to follow this in"
0"your own editing."

0"Editing in the Geany Text Editor"
0"--------------------------------"

0"Editing is best done in a good plain text editor, at least it must support a"
0"fixed width font and provide block selection, allowing to paste a rectangular"
0"selected block anywhere."

0"There are many other editors that can do this, but here are some tips for"
0"Geany. Many of these will work in other editors too, there just may be"
0"different shortcuts and different edge case behaviors. Geany is based on"
0"scintilla so similar behaviors may work in other scintilla based editors like"
0"scite, notepad++, notepad2, code::blocks, etc... Another type of editor that"
0"might be useful instead, could be one designed for making 2D ASCII art"
0"drawings."

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

0"If you use block selection as explained below, you can easily paste many"
0"instances of that or gate like so:"

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

0"If you select the above OR gate with block selection, and then place the"
0"cursor below here and hit CTRL+v multiple times, you will get the following"
0"mess:"

ssss
vvvv
o**>lo**>lo**>lo**>l
^^^^
ssss

0"If however, you add 4 spaces to the right of the s, the right of the v, the"
0"right of the ^, and the right of the bottom s, and one more space at the end"
0"of every line to get some in-between whitespace, and you copypaste that 4"
0"times below, it looks as intended:"

s     s     s     s
v     v     v     v
o**>l o**>l o**>l o**>l
^     ^     ^     ^
s     s     s     s

0"RENDER:text"

0"FIT:w"

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`, 'editingextra');

registerCircuit('Electronic Diagram', `
0"comparison with real electrical diagrams. On the left real life notation, on"
0"the right our ASCII notation The real life notation is of course also just an"
0"ascii art approximation here."


0"RENDER:text"
0"FIT:w"

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
1"TRISTATE     ----|>----     "***>z**** 0"(Not truly supported but this represents it)"
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
1"    ======                  "**>z*** 0"(same as tristate buffer, not accurate emulation but close)"
1" ----o  o-----              "
1"      \\                     "
1"                            "
1"                            "
1"                            "
1"                            "
1" RELAY (SPDT)               "   *
1"                            "   ***
1" ---uuuuuu----              "   v |
1"    ======                  "**>z*+***
1"        o----               "     w
1" ----o                      "****>z***
1"      \\ o----               "
1"                            "
1"                            "
1"                            "
1"          _                 "
1"         | -_               "
1"       --|   |              "**>M***
1"         |   |              "   M
1" MUX     |   |---           "**>M
1"       --|  _|              "   ^
1"         |_-                "   *
1"           |                "   *
1"           |                "
1"                            "
1"                            "
1"                            "
1"          _                 "
1"         | -_               "
1"         |   |--            "**>M***
1"         |   |              "   M
1"DEMUX  --|   |              "   M***
1"         |  _|--            "   ^
1"         |_-                "   *
1"           |                "   *
1"           |                "
1"                            "



`, 'diagram');


registerTitle('Parts');

var componentid = 0;

registerCircuit('Switch (s)', `
 s-->l
`, 'component' + componentid++);

registerCircuit('Pushbutton (p)', `
 p-->l
`, 'component' + componentid++);

registerCircuit('Timer (r)', `
 R-->l
`, 'component' + componentid++);

registerCircuit('LED (l)', `
 s-->l
`, 'component' + componentid++);

registerCircuit('Colored LED (l)', `
 s-->l2
`, 'component' + componentid++);

registerCircuit('RGB LED (L)', `
 s-->L<--s
     ^
     |
     |
     s
`, 'component' + componentid++);

registerCircuit('Wire Split (*)', `
    l
    ^
    |
 s--*->l
    |
    v
    l
`, 'component' + componentid++);

registerCircuit('Wire Crossing (+)', `
    s
    |
    |
 s--+->l
    |
    v
    l
`, 'component' + componentid++);

registerCircuit('Diagonal Wire Crossing (x)', `

 s     l
  ;   V
   ; /
    x
   / ;
  /   V
 s     l

`, 'component' + componentid++);

registerCircuit('8-Way Wire Crossing (X)', `

 s  s  l
  ; | V
   ;|/
 s--X->l
   /|;
  / v V
 s  l  l

`, 'component' + componentid++);

registerCircuit('AND gate (a)', `
s-->a-->l
    ^
s---*
`, 'component' + componentid++);

registerCircuit('OR Gate (o)', `
s-->o-->l
    ^
s---*
`, 'component' + componentid++);

registerCircuit('XOR Gate (e)', `
s-->e-->l
    ^
s---*
`, 'component' + componentid++);

registerCircuit('NAND Gate (A)', `
s-->A-->l
    ^
s---*
`, 'component' + componentid++);

registerCircuit('NOR Gate (O)', `
s-->O-->l
    ^
s---*
`, 'component' + componentid++);

registerCircuit('XNOR Gate (E)', `
s-->E-->l
    ^
s---*
`, 'component' + componentid++);

registerCircuit('Negative Input (m]w[)', `
s--]o-->l
    ^
s---*
`, 'component' + componentid++);

registerCircuit('Constant Off (c)', `
c-->l
`, 'component' + componentid++);

registerCircuit('Constant On (C)', `
C-->l
`, 'component' + componentid++);

registerCircuit('Random Generator (?)', `
s-->?-->l
`, 'component' + componentid++);

registerCircuit('Counter Gate (c)', `
s-->c-->l
`, 'component' + componentid++);

registerCircuit('Delay gate (d)', `
s-->d-->l
`, 'component' + componentid++);

registerCircuit('D flip-flop (d)', `
 s-->d-->l
     #
 s-->c
`, 'component' + componentid++);

registerCircuit('T flip-flop (t)', `
 s-->t-->l
     #
 s-->c
`, 'component' + componentid++);

registerCircuit('JK flip-flop (jk)', `
 s-->j-->l
 s-->c
 s-->k-->l
`, 'component' + componentid++);

registerCircuit('D latch (d)', `
 s-->d-->l
     #
 s-->y
`, 'component' + componentid++);

registerCircuit('SR latch (qQ)', `
 s-->q-->l
     #
 s-->Q-->l
`, 'component' + componentid++);

registerCircuit('Keyboard Terminal (T)', `
     lllllll
     ^^^^^^^
     |||||||
     TTTTTTT<p
     TTTTTTT>l"eof"0
     TTTTTTT
`, 'component' + componentid++);

registerCircuit('ASCII Terminal Screen (T)', `
     TTTTTTT<p"read"
     TTTTTTT
     TTTTTTT
     ^^^^^^^
     Sssssss
`, 'component' + componentid++);

registerCircuit('Decimal Display Terminal (T)', `
     TTTTTTT
     ^^^^^^^
     sssssss
`, 'component' + componentid++);

registerCircuit('Decimal Keyboard Terminal (T)', `
     lllllll
     ^^^^^^^
     TTTTTTT
`, 'component' + componentid++);

registerCircuit('Terminal Counter With Reset (T)', `
     lllllll
     ^^^^^^^
     TTTTTTT<p"reset"0
           ^
           p
`, 'component' + componentid++);

registerCircuit('ROM one-hot (bB)', `
   lll
   ^^^
   |||
s->bbB
s->BBb
s->BbB
s->bBb
`, 'component' + componentid++);

registerCircuit('ROM binary (bB)', `
   lll
   ^^^
   |||
s->bbB
s->BBb
   BbB
   bBb
`, 'component' + componentid++);

registerCircuit('RAM (bB)', `

   lll
   ^^^
   |||
s->bbb<-p
s->bbb
s->bbb
   bbb
   ^^^
   |||
   sss
`, 'component' + componentid++);

registerCircuit('Binary to Unary (b)', `

  llll
  ^^^^
  ||||
  bbbb
    ^^
    ||
    ss

`, 'component' + componentid++);

registerCircuit('Unary to Binary (b)', `

   ll
   ^^
   ||
 bbbb
 ^^^^
 ||||
 ssss

`, 'component' + componentid++);

registerCircuit('Priority Selector (b)', `

 llll
 ^^^^
 ||||
 bbbb
 ^^^^
 ||||
 ssss

`, 'component' + componentid++);

registerCircuit('Priority Selector (LSB left) (b)', `

 llll
 ^^^^
 ||||
0bbbb
 ^^^^
 ||||
 ssss

`, 'component' + componentid++);

registerCircuit('Mux (M)', `

    l
    ^
    *
    *
s**>M**>l
    M
s**>M
    ^
    *
    *
    s

`, 'component' + componentid++);

registerCircuit('Demux (M)', `


    l
    ^
s**>M**>l
    M
    M**>l
    ^
    s

`, 'component' + componentid++);

registerCircuit('Multi-input mux (M)', `

    ll
    ^^
    ||
    ||
s-->MM-->l
s-->MM
s-->MM
s-->MM
    ^^
    ||
    ||
    ss

`, 'component' + componentid++);

registerCircuit('Multi-output demux (M)', `

    ll
    ^^
    ||
    ||
s-->MM-->l
    MM-->l
    MM-->l
    MM-->l
    ^^
    ||
    ||
    ss

`, 'component' + componentid++);

registerCircuit('Mux of buses (M)', `

    l
    ^
    |
    |
s-->M-->l
s-->M-->l
    M
s-->M
s-->M
    ^
    |
    |
    s

`, 'component' + componentid++);

registerCircuit('Demux of bus (M)', `

    l
    ^
    |
    |
s-->M-->l
s-->M-->l
    M
    M-->l
    M-->l
    ^
    |
    |
    s

`, 'component' + componentid++);

registerCircuit('Mux with controlled swap (M)', `

    l
    ^
    *
    *
s**>M**>l
    M
s**>M**>l
    ^
    *
    *
    s

`, 'component' + componentid++);

registerCircuit('Mux with controlled swap of buses(M)', `

    l
    ^
    *
    *
s-->M-->l
s-->M-->l
    M
s-->M-->l
s-->M-->l
    ^
    *
    *
    s

`, 'component' + componentid++);

registerCircuit('Bus (=)', `

s---0=              =4-->l
s---1=              =3-->l
s---2================2-->l
s---3=              =1-->l
s---4=              =0-->l
`, 'component' + componentid++);

registerCircuit('Backplane (g)', `
  s----g

          g--->l
`, 'component' + componentid++);

registerCircuit('Backplane Wrap-Around ((u)n)', `
(--s     l<--)
`, 'component' + componentid++);

registerCircuit('Tristate Buffer as OR (z)', `

s-->z**-->l
      *
s-->z**

`, 'component' + componentid++);

registerCircuit('Tristate Buffer as AND (z)', `

s-->z-->l
    ^
s---*

`, 'component' + componentid++);

registerCircuit('Tristate Buffer (inverted) as AND (Z)', `

S-->Z**-->l
      *
S-->Z**

`, 'component' + componentid++);

registerCircuit('Tristate Buffer (inverted) as OR (Z)', `

S-->Z-->l
    ^
S---*

`, 'component' + componentid++);

registerCircuit('Double Corner (&%)', `
    s
    |
    |
 s--&->l
    |
    v
    l
`, 'component' + componentid++);

registerCircuit('Multi-input (U)', `
   l
s--Ul
   l
`, 'component' + componentid++);

registerCircuit('Negated multi-input (G)', `
   l
s--Gl
   l
`, 'component' + componentid++);

registerCircuit('Wire Crossing Input (V)', `

    s
    |
  s-Vl
    l

`, 'component' + componentid++);

registerCircuit('Negated Wire Crossing Input (W)', `

    s
    |
  s-Wl
    l

`, 'component' + componentid++);

registerCircuit('Diagonal Crossing Input (^^^)', `

l l
^ ^
a e
^^^
s s

`, 'component' + componentid++);

registerCircuit('IC (iI)', `
l   l     l l
^   ^     ^ ^
o<a eI5   #i5
^ ^^^     ^^^
a e *     sss
^^^ *
s s s
`, 'component' + componentid++);




registerTitle('Testing');



registerCircuit('Unit Test', `

0"This is a unit test. It's for testing and development. It's included under"
0"'help' because it shows expected behavior of some edge cases."

0"Note: also try: applyTransform(4), applyTransform(2)"

0"Note: also test the map 'game of life ship' and enable autotick, and"
0"'langton's ant' in electron mode"

0"On"
0"--"

0"In this section, the LED on the right of each contraption must be ON. If it's"
0"OFF, something is broken"

C***********>l

C----------->l

C>e-ha-UUo+*>l

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
    V
     *******>l

C***V*******>l

c->O-------->lI5

i5---------->l

c->O-------*
            V
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

            Gl

             l
            Wl
             l

C---------->#l

C----------UUl

C----------UVl

C----0=0---->l

C12=     =21]l
   ==---==
c21=     =12>l


C---12=45--->l
C---23=34---]l
c---34=12--->l
C---45=23--->l

  I8
S*(@@@)*****>l

S>i8********>l

s->lI

S------->i-->l

s-------]i-->l

S--->i$-----]l
      #----->l

S--->i$$i--->l

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

S-->dy------>l
     ^
     S

C**>z*******>l

    c
    v
C**>z*******]l

    C
    v
C**>z*******>l
     *
c**>z*

    c
    v
C**>Z*******>l
     *
C**>Z*

    C
    v
C**>Z*******]l
     *
c**>Z*
    ^
    c

          |
S5110g 5110g>l

          |
S5120g 5120g>l

0"Off"
0"---"

0"In this section, the LED on the right of each contraption must be OFF. If"
0"it's ON, something is broken"

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
      V*****>l

c---- ------>l
     x
C---- ------>l

C-----------
            Ul

C-----------U
             l

C----------*
            Ul
1Rw
  E--------->l
1R^

r----------->l

s---->R----->l

C***********]l

C---------->Vl

C----------U>l

      :
C***********>l
      :

C******
      *
     "*"
      *
      ******>l

C*****>o
      >o---->l


C---=0==0--->l

C---=0=0---->l

C---=0------>l

C---=====--->l

C----=0=---->l

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

S-->dy------>l
     ^
     s

s-->dy------>l
     ^
     S


0"Toggle"
0"------"

0"In this section, the LED on the right must be have the same state as the"
0"input switch (slight delay is allowed)"

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
*       =1>O>l
*     ===
*     * =2**>l
*     *
***1= * =2>O>l
*   ==+==
*>O2= * =1**>l
*     *
***2= *
*   ===
*>O1=
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
*     V
*----*>e----]l
*
******
*     x
*      W
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
*-->dy------>l
*    ^
*    S
*
*     ******>l
*     *
* c**>M*****>l
*     M
* C**>M*****]l
*     ^
*******
*
*     ******>l
*     *
* C**>M*****]l
*     M
*     M*****>l
*     ^
*******
*
*8612g 8612g>l
*
*8613g g8613>l
*
*g8614 8614g>l
*
*g8615 g8615>l
*
*8710g 8710g>l
*8711g 8711g>l
*8712g 8712g>l
*
*8713g g8713>l
*8714g g8714>l
*8715g g8715>l
*
*g8716 8716g>l
*g8717 8717g>l
*g8718 8718g>l
*
*g8719 g8719>l
*g8720 g8720>l
*g8721 g8721>l
*
*


0"Flip Flops"
0"----------"

0"Expected:"
0"-main output read from t,c,k,d,q"
0"-inverted output read from j,Q; inverted to LED so all LEDs should read the"
0" same"
0"-q enables immediately on no matter what"
0"-Q disables immediately on no matter what"
0"-Q and q together makes it flicker"
0"-c may change state on positive edge only according to the rules of T,D,J,K"
0" flip-flop inputs"
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
S-->y-->l

0"Expected: behaves like JK flipflop, all LEDs same value"

s-->c-->l
s-->j-->l
s-->k--]l

0"Errors"
0"------"

0"In this section, everything extending to the right must be an error, marked"
0"in yellow"

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

0"IC input order"
0"--------------"

0"Each input must activate the correct LED"

                 "ABCD"
      llll        llll
      ^^^^        ^^^^
      ||||#s      ||||
    I0|||||       iiiiiiiiii0
      |||&%       i    ^    i
    s-*|*-s       i    s    i
       |          i"C  B" s>i
       #s         i<s    "A"i
                  i  "D"    i
                  i   s     i
                  i   v     i
                  iiiiiiiiiii

0"RENDER:text"
`, 'unittest');






registerCircuit('Drawing Test', `

0"This is a unit test for testing and development."

0 1 2 3 4 5 6 7   0 1 2 3 4 5 6 7
l l l l l l l l   l l l l l l l l   s>L<s   TTTT
^ ^ ^ ^ ^ ^ ^ ^   ^ ^ ^ ^ ^ ^ ^ ^     ^     ^^^^
s s s s s s s s   S S S S S S S S     s     ssss

s-->l    l   ****
         ^   ****     l       l l   l   l  l       l  l   l   l
   l     |   ****      V     V   V  ^  V    V     V    V  ^  V       l
   ^     |   ****       ;   /     ; | /      ;   /      ; | /        ^
   |     s               ; /       ;|/        ; /        ;|/         |
s--+-->l       s          x      s--X-->l   s--X-->l      X       s--X-->l
   |           *         / ;       /|;        / ;        /|;         |
   s       l<*****>l    /   ;     / | ;      /   ;      / | ;        s
               *       s     s   s  s  s    s     s    s  s  s
    l  l l  l  v
    ^   V   ^  l       l       l     l   l   l   l
    |  / ;  |           V     V      ^  V     V  ^        l       l
s---+-X---X-+------->l   ;   /       | /       ; |        ^       ^
    |/     ;|             ; /        |/         ;|        |       |
    X       X              X      s--X-->l    s--X-->l s--%--s s--&--s
   /|       |;            / ;       /|           |;       |       |
s-X-+-------+-X----->l   /   ;     / |           | ;      v       v
 /  |       |  ;        s     s   s  s           s  s     l       l
S   s       s   s
                                            s-g->l
       s    s s    s       s    s s    s                  s->a>l       s
  l l  * l  * *  l *  l l  * l  * *  l *      l     l     p->e>l       v
   V    V    V    V    W    W    W    W     s*Ul  s*Gl    r->o>l       e*
  * *  * l  l l  l *  * *  * l  l l  l *      l     l     S->A>l  s--->$|
  s s  s           s  s s  s           s                  P->E>l       $v
                                              s     s     R->O>l       |l
       s   s                 s   s            |     |     s->?>l       |
  l    *   *    l       l    *   *    l     s*Vl  s*Wl                 v
s*Vl s*Vl lV*s lV*s   s*Wl s*Wl lW*s lW*s     |     |                  l
  *    l   l    *       *    l   l    *       v     v
  s             s       s             s       l     l

  a e       s         s         l      s       s      l         e a
  ^^^       *     l<**+***s     ^      *   s***+**>l  ^         ^^^
s***+**>l   *>a       vvv       *    a<*     vvv      *     l<**+***s
    s       *>        e a       *     <*     a e      *         s
           s+>e               e<+s   e<+s            s+>e
            *                  <*      *              *>
            *                 a<*      *              *>a
            v                   *      v              *
            l                   s      l              s



0"Comment Alignment"
0"-----------------"

0"In each test below the word 'hi' is aligned with different methods. The word"
0"should appear on top of the capital letters indicated with gates below it. In"
0"the case of an E it must be exact, in the case of an O slight deviation is"
0"allowed (this is for half width text)"

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


l<--s0"There should be no space between this comment and the switch"


"The number 3 in this comment should NOT make the LED green."
            l
            ^
            s

"FIT:w"

`, 'drawtest');

registerTitle('Front Page');


registerCircuit('Welcome', introText, introId);

registerCircuit('Help Index', `
0"List of help circuits. If this is your first time, the first one ('Main Help'"
0"under 'Viewing') is recommended."


INSERT:toc_help

0"FIT:y"`, 'helpindex');
