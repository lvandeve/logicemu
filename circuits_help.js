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
This JS file contains help circuits for viewing and editing,
and injects them into a dropdown from logicemu.js
*/

registerCircuitGroup('help');

registerCircuit('Main Help', `
0"# LogicEmu Main Help"

0"Table of contents:"
0"INSERT:toc"

0"Welcome to LogicEmu! LogicEmu emulates logic circuits. It has a whole bunch"
0"of circuits included to play with, including binary adders, multipliers,"
0"flip-flops, NAND-only logic, ..., and also allows creating new circuits."

0"E.g. like this AND gate with switches and LED:"

s..>a..>l
    ^
s....

0"LogicEmu is cell-based. A side effect of that is the notation isn't standard"
0"notation. On the other hand, this has as advantage that a lot of logic fits"
0"on a single screen and it's quite flexible. Also, each cell is an ASCII"
0"character, which has advantages for editing and sharing circuits."

0"It's a digital logic emulator, but not an electrical simulator. Power sources"
0"and voltages are abstracted away, and only two signals, 0 and 1, are"
0"emulated."

0"This tutorial is multiple screens long, so scroll down to see all"

0"# User Interface"

0"The top bar has buttons of the user interface, such as selecting built-in"
0"circuits, pausing, changing graphics options, editing, ... Hover over each"
0"button and dropdown to see their explanation."

0"The rest of this tutorial explains what the different symbols and components"
0"in circuits do. Another tutorial goes in more detail over the user interface."

0"# Input / Output / Wires"

0"In general, a circuit has input switches, some processing logic, possibly"
0"some state, and finally output LEDs. So the simplest circuit has a switch"
0"and a LED with a wire in between."

0"Toggle the switch (s) with the mouse to toggle the LED (l)."

s....>l

0"There are in fact 4 types of cells visible in the above circuit:"

s  0": the input switch which can be toggled with the mouse to output 0 or 1"

.. 0": wire which connects things"

>  0": arrowhead: input from the wire to the LED"

l  0": the output LED"

0"A 'p' is a push button instead of a switch:"

p....>l

0"As you can see, the electrical circuits above are not closed. That is"
0"because we only simulate the logic here. Power sources and closing of"
0"the electrical circuit are implicit"

0"This switch is a simple component here, but in real life it would actually be"
0"quite involved: it needs a pullup/pulldown resistor (or be a SPDT switch)"
0"to toggle between the two voltages (and not float), and needs a"
0"debouncing circuit."

0"Wires can cross or split. If they cross, the signals don't interfere."

0"Wire split (indicated with a little dot at the connection, or . in text"
0"mode): The input switch activates all connected outout devices. This is also"
0"known as fanout."


    l
    ^
    .
    .
s......>l
    .
    .
    v
    l

0"Wire crossing (indicated with the wires rendered slightly disconnected, or a"
0"'+' or 'x' in text mode): Both switch/LED pairs work independently and don't"
0"interact:"


    s
    .                  l     l
    .                   ^   ^
    .       s... ..>l    ; /
s...+..>l       x         x
    .       s... ..>l    / ;
    .                   /   ;
    v                  s     s
    l


0"Diagonal wire crossing at the arrowhead itself (causing 2 diagonal crossing"
0"inputs):"

s...... l
       >
s...... l

0"LEDs can also come in various different colors (using numeric digits in the"
0"source code, but the numbers will be invisible below)"


s.............>l0 0"0: red (default color)"

s.............>l1 0"1: orange"

s.............>l2 0"2: yellow"

s.............>l3 0"3: green"

s.............>l4 0"4: blue"

s.............>l5 0"5: purple"

s.............>l6 0"6: pink"

s.............>l7 0"7: white"

s.............>l8 0"8: test signal: toggles between red (off) and green (on)"

s.............>l9 0"9: LCD"

0"# Logic Gates"

0"Actual logic is done with logic gates. AND, OR and XOR gates are"
0"represented with the letters a, o and e respectively (e stands for"
0"exclusive or)"

0"AND gate: the LED only goes on if both input switches are enabled:"

s..>a..>l
    ^
s....

0"OR gate: the LED goes on if any input switch is enabled:"

s..>o..>l
    ^
s....

0"XOR gate: the LED goes on if any single input switch is enabled, but not both:"

s..>e..>l
    ^
s....

0"More theory about these logic gates is in several of the built-in circuits"
0"from the 'circuits' drop-down. This tutorial here is about viewing circuits"
0"with LogicEmu, while other circuits are tutorials for actual logic."

0"Inverted gates NAND, NOR and XNOR are indicated with capital letters"
0"instead of small letters. Respectively A, O and E."

0"NAND:"

s..>A..>l
    ^
s....

0"NOR:"

s..>O..>l
    ^
s....

0"XNOR:"

s..>E..>l
    ^
s....

0"A simple NOT gate can be done with O with a single input:"

s..>O..>l

0"So to summarize, the 6 main logic gates are:"

3"a: AND       "
3"o: OR        "
3"e: XOR       "
3"A: NAND      "
3"O: NOR (+NOT)"
3"E: XNOR      "


0"3-input gates are also possible, and XOR gates then work like parity gates"
0"(outputs 1 if an odd amount of inputs is 1)"

s....
    v
s..>e..>l
    ^
s....

s....
    v
s..>A..>l
    ^
s....

0"0-input and 1-input gates are also possible. A 0-input AND gate outputs"
0"true due to the empty product (or, because it has no 'off' inputs):"

a....>l    s....>a....>l

o....>l    s....>o....>l

e....>l    s....>e....>l

A....>l    s....>A....>l

O....>l    s....>O....>l

E....>l    s....>E....>l

0"There also exist constants, displayed with '0' and '1' in graphics mode or"
0"as 'f' and 'F' ('fixed value') in text mode:"

f....>l    s....>f....>l

F....>l    s....>F....>l

0"A fixed value with a decimal number can also output a decimal number in"
0"binary:"

llllllllll
^^^^^^^^^^
f500######

0"They can also come in a form where all the output bits are inverted. The border"
0"color of the entire component is lit up to indicate this (in text mode, you"
0"can instead see a small f for normal fixed value, capital F for inverted)"

llllllllll
^^^^^^^^^^
F500######

0"There also exist negated inputs. Normal inputs are indicated with an"
0"arrow head, negated inputs instead with a little circle (or in text"
0"mode, that is m]w[ for NESW respectively):"

s..]l

0"For example logic gates can get negated inputs that way:"

s..]o...>l

s..]a...>l
    ^
s....

0"NOTE: In real life electronics, logic gates normally don't have such"
0"easy way of negating inputs and invertors are needed. In real life,"
0"what you will see more often, is circuits where a regular and a negated"
0"version of a signal runs through the whole system, like so:"

                  l
                  ^
                  o<.
                  ^ .
                .>a a<.
                . ^ ^ .
       %>O------.-+-+-+-------- 0"A'"
 "A"s--.----------+-.-+-------- 0"A"
       %>O--------+---.-------- 0"B'"
 "B"s--.----------.------------ 0"B"

0"To make gates with more than 3 inputs, their size can be increased"
0"In text mode, you can see that character '#' is used for this"

s..>e..>l
    #
s..>#
    #
s..>#
    #
s..>#

0"An example of combining multiple logic gates: The full adder: (NOTE: This is"
0"an example for the notation here. There are circuits explaining full adders"
0"included in the dropdowns above. If you do not know yet what a full adder"
0"means, just enjoy the response to the switches :)"


s..>a>o..>l
   >  ^
s..>e>a
     >
s....>e..>l


0"# Flip-Flops"

0"This describes the built in 'flip-flop' devices. Note that, as in"
0"real life, all of these can be made from the logic gates above. It is"
0"very useful to have idealized built-in ones however. This tutorial"
0"only explains how to view them, see the flip-flop tutorial to get the"
0"description what flip-flops do and how they work."

0"A 'gate' with a 'c' instead of 'a', 'o', 'e' represent a single-input"
0"T flip-flop or frequency halver (the c stands for counter here since multiple
0"together form a binary counter)."
0"Everytime the switch is toggle from off to on, the c toggles to the other"
0"state, so it halves the frequency of the signal. This is a component that"
0"keeps a state and is positive edge triggered"

s..>c..>l

0"Multiple of them makes a binary counter"

    l   l   l   l
    ^   ^   ^   ^
s..>c..>c..>c..>c


0"Real ideal flip-flops can be made from 'c', 'd', 'j', 'k', 't', 'q' 'Q' and 'y',"
0"they can be combined to make SR, JK, D or T flip-flops."
0"Here is how to interpret each letter:"
0"- c: the clock input. When the clock input goes from low to high the flip-flop"
0"  will toggle if needed"
0"- j: the S input for SR flip-flop or the J input for JK flip-flop"
0"- k: the R input for SR flip-flop or the K input for JK flip-flop"
0"- d: the D input for D flip-flop"
0"- t: the T input for T flip-flop"
0"- q: output, or asynchronous S input. Note that c, j, k, d and t can also"
0"  already be used as outputs"
0"- Q: negated output, or asynchronous R input"
0"- y: enable input: if present, only reacts to inputs if this is on. May also"
0"  replace c, then the object is a latch instead of a flip-flop. Asynch q and Q"
0"  still override this."
0"Most other parts will also output signal so using q and Q is not required for"
0"that. These parts can be combined in any way, with # (visible in text mode)"
0"as filler"

s..>d..>l
    #       0"D flip-flop: when triggering c, the output will remember the state of d"
s..>c


s..>t..>l
    #       0"D flip-flop: when triggering c, the output will toggle if t is on"
s..>c


s..>j#q..>l
    ###
s..>c##     0"Serves as SR or as JK flip-flop"
    ###
s..>k#Q..>l


      p
      v
s..>j#q..>l
    ###
s..>c##     0"Same with asynch set/reset inputs added"
    ###
s..>k#Q..>l
      ^
      p


s..>q..>l
    #      0"SR latch: no clock, output remembers single switch"
s..>Q..>l



s-->d-->l 0"D-latch (enable input instead of clock)"
    #
s-->y


s-->c-->l
s-->t-->l
s-->d-->l 0"All parts combined in 1 flip-flop"
s-->j-->l 0"Not realistic, but possible."
s-->k-->l 0"J+K combination overridden by D"
s-->q-->l
s-->Q-->l
S-->y-->l


s-->t-->l
s-->d-->l
s-->j-->l 0"All parts combined in 1 flip-flop, without clock"
s-->k-->l 0"Not realistic, but possible."
s-->q-->l 0"J+K combination overridden by D"
s-->Q-->l
S-->y-->l

0"# Integrated Circuits"

0"An integrated circuit or chip needs to be defined only once, and can then be"
0"reused in multiple places. It is defined by having an 'I' next to it"
0"and is used with a small 'i'. To define multiple chips, numbers are"
0"used to distinguish them."

0"Here is a full adder chip defined and labeled with number 12"


               I12
               l
               ^
               .
     l<....o<a e .....s
           ^ ^^^/
           a e .
           ^^^
           . .
           . .
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


0"# Special devices"

0"The delay (or buffer), indicated with 'd', introduces a 1-tick delay"

s-->d-->l


s-->d-->d-->d-->d-->d-->d-->d-->d-->l

0"or it can have a higher delay indicated with a number:"

    4
s-->d-->l

    2
    0
s-->d-->l

0"The pulse, indicated with 'q' or 'Q', create a single short pulse on any"
0"positive input edge. This is only so when standalone or when combined with y,"
0"in other scenarios they'll behave like q and Q of flip-flop explained earlier."

s-->q-->l

s-->Q-->l

s-->q-->l
s-->y

s-->Q-->l
s-->y

0"A pulse duration can be made longer with a number:"

    1
    0
s-->q-->l

0"Note that the pulse can also be made with a delay and an AND gate instead,"
0"or with a c looping back to itself, the single q is just a shortcut:"

  .....          ...
  .   v          v .
s-.>d]a->l   s..>c..>l


0"A timer 'r' or 'R' blinks with a certain speed. The number indicates the"
0"duration, in emulation ticks per timer change. The period of the timer is"
0"two changes. For the normal emulation speed, that means the number gives"
0"the timer period in tenths of a second. The fast or slow emulation speeds"
0"alter this."
0"The default speed, when no number is given or number 0, is a period of 20"
0"ticks, which means about 1 second (or 0.5 seconds per change) for the normal"
0"emulation speed."


 10r------>l

  2r------>l

  5r------>l

0"A small 'r' means it's initially of while 'R' is initially on:"

   r------>l

   R------>l


0"A music note 'N' acts like a speaker, producing a tone of a given frequency."

0"NOTE: this only works if your browser supports Web Audio. The browser may"
0"also require interaction with the page, by clicking something, before audio"
0"can play."
0"If not supported, the N's will still indicate when they're enabled."

p-->N349
  p------>N369
p-->N391
  p------>N415
p-->N440
p-->N466
  p------>N493
p-->N523
  p------>N554
p-->N587
  p------>N622
p-->N659
p-->N698


0"Values above 100000 indicate different audio wave shapes:"

p-->N000440 0"sine"

p-->N100440 0"square"

p-->N200440 0"triangle"

p-->N300440 0"sawtooth"

p-->N400000 0"white noise"


0"Multiple inputs control the volume in binary:"

  N###440
  ^^^^
  ||||
  ssss
 "8421"


0"Multiple input groups control different properties. The number now is the"
0"maximum frequency. Both freq and vol must have a non-zero value to hear"
0"anything."
0"if a music note has an y-input, it's an enable-input and the music note only"
0"produces sound if it's on"

  N########################y#2000
  ^^^      ^^^^    ^^^^    ^
  |||      ||||    ||||    |
  sss      sSss    ssss    S
1"shape" 1"freq"  1"vol""enable"1



0"Kinetic output comes in various forms, depending on a number"

0"These have various symbols in graphical mode, or use letter 'K' in text mode."

0"Numbers 0 (or none), 1, 2 and 3 represent different output devices"

s--->K  0"no number: same as 0."

s--->K0 0"motor / gear"

s--->K1 0"fan / wind / cooling"

s--->K2 0"heating"

s--->K3 0"pump / sprinkler / liquid"

s--->K4 0"electromagnet"

0"for completeness: other simple output types not using 'K' (excludes dot matrix screen, ascii, ...):"

s--->l  0"light / lamp / LED"

s--->l9 0"LCD"

s--->N  0"speaker"

s--->T  0"binary"

0"These outputs such as fan, electromagnet, ... have no other effect other than"
0"showing a different icon if enabled (unless their sensor versions are used,"
0"see below). As output, they're no different than what an LED does, displaying"
0"output. But it can be used to indicate that this output represents some"
0"particular type of action."

0"These components can also be used as detectors instead. As a detector, they"
0"will typically only detect output by one of their matching type in a certain"
0"radius in the neighborhood. Some have slightly different behavior."

0"Gear: activates all neighbors eventually, but has a radius of 1:"

l<--KKKKKKKKKKKKK
                K
s-->KKKKKKKKKKKKK

0"Gears will activate if neighboring gears are active, except if exactly 3"
0"neighbors are active."

               KKKK
p--->KKKKKKKKKKKK KKKKKKKKKKK<--p
               KKKK


0"Fan: only detects active fans with an input, but not fans that indirectly detect air, and have a larger radius, but"
0"notice that fans too far away from the active one detect nothing:"
0"Without inputs, the fan is, instead, an airflow sensor."

 K1 K1 K1 K1 K1

 K1 K1 K1 K1 K1

 K1 K1 K1 K1 K1

s-->K1 K1 K1 K1

 K1 K1 K1 K1 K1

 K1 K1 K1 K1 K1

 K1 K1 K1 K1 K1

0"Heat: similar to fan but smaller radius:"
0"Without inputs, the fan is, instead, a heat sensor."

 K2 K2 K2 K2

 K2 K2 K2 K2

s-->K2 K2 K2

 K2 K2 K2 K2

 K2 K2 K2 K2

0"Water: unlike fan and heat, all water 'pipes' will transmit the water on to"
0"next pipes, and some gap between pipes is allowed:"

s-->K3  K3  K3  K3  K3  K3  K3  K3 3K-->l

0"Electromagnet: similar to fan and heat, with much larger radius, but only transmits"
0"in straight directions (N, E, S, W), not the entire circular pattern:"
0"Without inputs, this acts as a sensor for electromagnets in those 4 directions."


   4K-->l

s-->K4                   4K-->l
s-->K4                   4K-->l
s-->K4                   4K-->l

   4K-->l

0"Note: only those that do not have any inputs (arrows pointed at them) will act"
0"as sensors, those with inputs will only activate if their input is enabled, not"
0"from neighboring matching devices."

0"Higher numbered variants of K have more active effects:"

0"Numbers 5-9 represent TNT of different strengths which can permanently disable devices in a certain radius"

    l<S
    l<S
s-->K5
    l<S
    l<S


   l<Sl<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S
      l<Sl<S
s---->K6 l<S
      l<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S


0"The effect can also propagate to others, and be detected if a detector is at safe distance:"

    K   K   K   K   K   K
    6   6   6   6   6   6

s-->K   K   K   K   K   K------>c>l
    6   6   6   6   6   6

    K   K   K   K   K   K
    6   6   6   6   6   6

0"Note: size 7..9 are larger and not shown here to not affect the other circuits around here."


0"Numbers 10-14 represent EMP of different strengths which can temporarily disable devices in a certain radius"

    l<S
    l<S
s-->K10
    l<S
    l<S


   l<Sl<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S
      l<Sl<S
s---->K11l<S
      l<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S

0"If the EMP disables its own input switch, it will cause flickering:"


s-->K11


0"Note: size 12..14 are larger and not shown here to not affect the other circuits around here."


0"Numbers 15-19 represent jamming signal of different strengths which can temporarily randomize devices in a certain radius"

    l<S
    l<S
s-->K15
    l<S
    l<S


   l<Sl<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S
      l<Sl<S
s---->K16l<S
      l<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S

0"Note: size 17..19 are larger and not shown here to not affect the other circuits around here."

0"Number 20 represents a cover or hatch, that when off, makes what's below it invisible."


    ############
    #          #
    #"revealed"#
    #          #
s-->K20        #
    #          #
    # s.....>l #
    #          #
    ############


0"An RGB LED 'D' takes a red, green and blue input:"

8"R"s--->D<---s"B"6
         ^
         |
         |
         |
         s
        "G"

0"('D' comes from display as will be seen below.)"

0"RGB LEDs with less or more than 3 inputs also exist and use various"
0"color palettes:"

D    D###    D########
^    ^^^^    ^^^^^^^^^
s    ssss    sssssssss

0"With more input groups as configured below and at least a dot (c) or fill (q)"
0"input, D is the Dot Matrix Display. An optional enable 'y' input is also"
0"supported."

0"With binary addressing:"

      D#######y<S"enable"
      ########c<p"dot"
      ########q<p"fill"
      ########
      ########<s"b"
   :s>########<S"g"
   ys>########<s"r"
   :s>########<s"i"
           ^^^
           sss
           "x"

0"With line based matrix addressing:"

    s>D#######y<S"enable"
    s>########c<p"dot"
    S>########q<p"fill"
    s>########
    s>########<s"b"
    S>########<S"g"
    s>########<s"r"
    s>########<s"i"
      ^^^^^^^^
      ssSssSss

0"A capital M forms a multiplexer, demultiplexer or controlled swap, depending on"
0"the configuration. Mouse over them to see a tooltip that explains each one."

0"Mux:"

    4"control"4         4"control"4
         l                  l l
         ^                  ^ ^
    :    .                  . .
    i    .             :    . .
    ns..>M..>l0"out"   is..>M##..>l3"out"
    p    #             n    ###
    us..>#             ps..>###
    t    ^             u    ###
    s    .             ts..>###
    :    .             s    ###
         s             :s..>###
    4"control"4             ^ ^
                            . .
                            . .
                            s s
                        4"control"4

0"Demux:"

    4"control"4         4"control"4
         l                  l l
         ^                  ^ ^
         .                  . .
         .    :             . .    :
5"in"s..>M..>lo    5"in"s..>M##..>lo
         #    u             ###    u
         #..>lt             ###..>lt
         ^    :             ###    p
         .                  ###..>lu
         .                  ###    t
         s                  ###..>ls
    4"control"4             ^ ^    :
                            . .
                            . .
                            s s
                        4"control"4

0"Controlled swap:"

    l
    ^
    .
    .
s..>M..>l
    #
s..>#..>l
    ^
    .
    .
    s


0"A terminal can display ASCII characters to a screen and read them from"
0"the keyboard. If it has a blinking cursor, you can type in it. The"
0"EOF LED indicates that nothing was typed or everything typed was"
0"already output (content entered with the 'read' switch rather than typed"
0"does not count for this). If there is no blinking cursor, click it with the"
0"mouse first, then you can type in it"

0"The c input and output are for the keyboard: output command and EOF signal"
0"The C input is for the screen to input ascii characters"

                lllllll0"ASCII output, from keyboard"
                ^^^^^^^
                |||||||
                T######C<--p0"read ASCII from input switches to screen"
                #######c<--p0"output keyboard ASCII"
                #######c-->l"EOF"
                #######
                ^^^^^^^
                |||||||
                SsssssS0"ASCII input, to screen"
                       0"1000001 = letter A"

0"Without read/write flags, it can instead display or read decimal numbers"

         T#######"decimal"
         ^^^^^^^^
         ||||||||
         sSsssssS"binary"

0"Place cursor in here with mouse, then type a number. Letters don't work,"
0"but a minus sign, and prefix 0x for hex, work. Negative numbers will use"
0"twos complement binary output."

         llllllll
         ^^^^^^^^
         T#######

0"With the following configurations, the terminal works instead as a decimal"
0"counter, with optional features such as reset, down count, and set from data"
0"For counters, y, c, C, q and Q have the meanings indicated."

llllllll         llllllll           llllllll
^^^^^^^^         ^^^^^^^^           ^^^^^^^^
T#######c<p0"up" T#######c<p0"up"   T#######c<p0"up"
                 ########Q<p0"reset"########Q<p0"reset"
                                    ########C<p0"down"

llllllll         llllllll           llllllll
^^^^^^^^         ^^^^^^^^           ^^^^^^^^
T#######q<p0"set"T#######c<p0"up"   T#######y<s0"enable"
^^^^^^^^         ########q<p0"set"  ########c<p0"up"
ssssssss         ^^^^^^^^           ########C<p0"down"
                 ssssssss           ########q<p0"set"
                                    ########Q<p0"reset"
                                    ^^^^^^^^
                                    ssssssss

0"A capital U forms an ALU (arithmetic logic unit) with built-in support for"
0"various advanced mathematical operations. While these can be made from"
0"individual logic gates, having it available as a single unit saves space"
0"in higher level circuits. The number next to the U determines the operation."
0"The full list is in the editing tutorial instead. A tooltip and a label on"
0"the component (if there's enough space) will also show the operation."



0"Example: 2-input operation example: 8-bit adder"

            T#######
            ^^^^^^^^
            llllllll
            ^^^^^^^^
 l<U16##############<s
   ^^^^^^^^ ^^^^^^^^
   ssssssss ssssssss
  " ...8421  ...8421"
  "       A        B"

0"1-input operation example: 8-bit increment"

   T#######
   ^^^^^^^^
   llllllll
   ^^^^^^^^
 l<U24#####<s
   ^^^^^^^^
   ssssssss
  " ...8421"
  "       A"

0"Example: multiply with 16-bit inputs and 32-bit output:"

 "                             A*B"
 T################################
 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 lllllllllllllllllllllllllllllllll
 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 |||||||||||||||||||||||||||||||||
 U18##############################
 ^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^
 |||||||||||||||| ||||||||||||||||
 T############### T###############
 ^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^
 ssssssssssssssss ssssssssssssssss
"         ...8421          ...8421"
"               A                B"

0"Example: the integer power operation with 16-bit inputs and 32-bit output:"

 "                             A^B"
 T################################
 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 lllllllllllllllllllllllllllllllll
 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 |||||||||||||||||||||||||||||||||
 U48##############################
 ^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^
 |||||||||||||||| ||||||||||||||||
 T############### T###############
 ^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^
 ssssssssssssssss ssssssssssssssss
"         ...8421          ...8421"
"               A                B"

0"Example: controlled bit invert using xor:"

   T#######
   ^^^^^^^^
   llllllll
   ^^^^^^^^
   U6##########
   ^^^^^^^^   ^
   ssssssss   s
  " ...8421   1"
  "       A   B"

0"An ALU can also have an operation-select input. For example the following ALU"
0"allows to select between add, sub, mul, div."


           llllllll
           ^^^^^^^^
           ||||||||
l<#################<s  0"carry in"
  #################  :
  #################<s10" 0=add, 1=sub, 2=mul, 3=div"
  U16##############<s2
  ^^^^^^^^ ^^^^^^^^  :
  ssssssss ssssssss
 " ...8421  ...8421"





0"A ? is a random generator. It starts with a random initial value. If it"
0"has inputs it will change to a random value on positive edges of the input."

?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l

s-->?-->l

p-->?-->l

r-->?-->l
2

0"To react to both positive and negative edge, it can be given a regular and"
0"inverted input:"

   ....           ....           ....
   .  w           .  w        2  .  w
s....>?..>l    p....>?..>l    r....>?..>l


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


0"A RAM is like a writable ROM. The clock input 'c' is used to write."

           0"output"
           lllll
           ^^^^^
  0"select"|||||
    s----->bbBbBc<----p0"write"
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
 "8"s----->bbBbBc<----p0"write"
 "4"s----->bBBbB
 "2"s----->BbbbB
 "1"s----->BbBbB
           bBBbB
           ^^^^^
           |||||
           sssss
           0"data input"

0"In the following configurations, b can also make the following devices with"
0"different behavior. These are not ROM or RAM at all, but related because"
0"these unary/binary/priority computations are useful (and part of) the address"
0"input of actual ROM/RAM."

   "76543210"
    llllllll
    ^^^^^^^^
    ||||||||
    b####### 0"binary to unary"
         ^^^
         |||
         sss
        "421"


        "421"
         lll
         ^^^
         |||
    b####### 0"unary to binary"
    ^^^^^^^^
    ||||||||
    ssssssss
   "76543210"


   "76543210"
    llllllll
    ^^^^^^^^
    ||||||||
    b####### 0"priority select (highest input)"
    ^^^^^^^^
    ||||||||
    ssssssss
   "76543210"


0"h and H represent a one-hot detector and inverted one-hot detector. These"
0"are the 'real' XOR gates: the one-hot detector only outputs 1 if there is"
0"exactly 1 input enabled. However, this is not the behavior that cascading"
0"multiple XOR gates does, and more expensive to implement from primitive"
0"gates, so this is not considered an as primitive building block as the 'e'"
0"XOR gate is. For 2 inputs, h and H behave the same as e and E."

s..>h..>l  s..>H..>l
    ^          ^
s....      s....


s-->h-->l  s-->H-->l
s-->#      s-->#
s-->#      s-->#
s-->#      s-->#



0"z and Z are representations of a tristate buffer, or open collector outputs."
0"It is fake because the simulation does not support three states. In real"
0"life, you can have states 'low voltage', 'high voltage' and 'high impedance'."
0"(Other names for high impedance are 'open', 'not connected', 'floating')"
0"In the simulation, there is only zero and one. High impedance is treated the"
0"same as 0. Still, the tri-state buffer can be used as a representation of a"
0"real-life circuit"

0"Different components outputting to same wire normally gives error (marked in"
0"yellow), and one solution is to OR them. An alternative solution here is to"
0"use tri-state buffers (or open collector outputs if you will)."

0"error expected" 0"ok"         0"ok"
s.....          s.....        s..>z...
     .               v               .
s.....          s...>o        s..>z...
     .               v               .
s.........>l    s...>o....>l  s..>z.......>l

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
    .
    .
    v
s..>z..>l

0"Multiple could output to some shared bus, each with a control of which only"
0"one should be active at the time, like this:"

     p
     v
 s..>z...
        .
     p  .
     v  .
 s..>z...
        .
     p  .
     v  .
 s..>z......>l


0"Capital Z does the opposite: it ORs its inputs and multiple get ANDed. This"
0"can be seen as: the output is high by default (instead of low like 'z'),"
0"but any fully zero Z will pull the output to 0. So the opposite of z."

0"To summarize z and Z:"

s....                   s....
    v                       v
s..>z..                 s..>a..
      .                       v
      .>l1"corresponds to"    o>l
      .                       ^
s..>z..                 s..>a..
    ^                       ^
s....                   s....


s....                   s....
    v                       v
s..>Z..                 s..>o..
      .                       v
      .>l1"corresponds to"    a>l
      .                       ^
s..>Z..                 s..>o..
    ^                       ^
s....                   s....


0"The built-in circuit where these z's are used the most, is the one named"
0"'Relay Logic'"


0"# Special wires"

0"Buses are a bundle of wires. Matching numbers of the bus connect to"
0"corresponding inputs and outputs. This allows to save a lot of space."

s---0=                   =0--->l
s---1=                   =1--->l
s---2=====================2--->l
s---3=                   =3--->l
s---4=                   =4--->l


  llllllll
  ^^^^^^^^
  ||||||||
  76543210
  ========
  01234567
  ||||||||
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

0"Dollar signs ($) in buses and global wires indicate automatic numbering,"
0"each next $ in a series represents a unique next numbered connection, and"
0"each consecutive non-interrupted series of $ (possibly with a number to"
0"be a different group) is its own bundle."


                            llll
              llll llll     ^^^^
              ^^^^ ^^^^     ||||
              |||| ||||     5$$$
              $$$$ 0$$$     gggg
=======================
$$$$ 0$$$                   gggg
|||| ||||                   5$$$
ssss ssss                   ||||
                            ssss



0"Antennas are another form of 'backplane' wires, connected to the"
0"corresponding 'dish' they're aimed at. Calling them 'antennas' or 'wireless'"
0"is just a metaphor. These provide another way to reduce clutter, and are"
0"especially useful for large wrap-around circuits (see the built-in cellular"
0"automata circuits)."

          l
          ^
s--(      |       )--->l
          s


s-----n

l<----u

0"Antennas can also make wrap-around circuits when configured such:"

  0nnnnnnnn0
  (;       )
  ( s      )
  (        )
  (->l  s--)
  (        )
  (     l  )
  (      < )
  (       ;)
  0uuuuuuuu0


0"J is a patch panel jack. Path panel jacks allow making arbitrary connections"
0"between any two jacks."

0"Click a jack, then another jack, to connect them together with a patch wire."
0"To remove a wire, click both its jacks again. To remove all wires from one"
0"jack, click that jack twice. To remove all jacks from the board (or save"
0"state), see the dropdown for patchpanel jacks in the menu bar."

0"A jack supports a maximum of 4 wires, adding more will remove the oldest one."

0"You cannot connect multiple jacks that have an input (an arrow pointing to"
0"it) together in one group, if you try an older input connection may be"
0"removed, or it may refuse to connect and indicate a temporary red line. This"
0"is because multiple inputs to the same connected jacks gives a conflict (we"
0"could OR them, but instead we choose the realistic approach where this can"
0"cause an electric short)."

0"Example: the jacks J below allow you to choose to connect the switches"
0"to an AND gate, a XOR gate, directly to a LED, or make some other combination:"

s>J    J>a>J    J>l
         #
s>J    J>#

s>J    J>e>J    J>l
         #
s>J    J>#



0"# Epilogue"

0"The end, see the next tutorials for more information, such as about"
0"the different tick algorithms, rendering modes, editing, ..."

0"INSERT:links_help"

0"LogicEmu. Copyright (C) 2018-2020 by Lode Vandevenne"
`, 'mainhelp');


registerCircuit('Glossary', `
0"This lists some of the LogicEmu-specific terms that appear in some articles:"

0"- Algorithm: This refers to how circuit state is computed each tick."
0"There are two main algorithms that can be chosen with a dropdown selector:"
0"immediate mode and electron mode. See their respective entries in this list."

0"- ALU: Arithmetic Logic Unit. This may refer to an actual ALU in a CPU, to"
0"an ALU built from logic gates in logicemu, or to a built-in component type"
0"in logicemu indicated with the letter 'U' that provides built-in mathematical"
0"operations."

0"- Antenna: This is a metaphor for a certain kind of backplane wire (see:"
0"Backplane), and while it could be seen as if the signal is transferred"
0"wirelessly, it can just as well be seen as there being a wire connection"
0"behind the visible circuit board. The antennas, unlike other types of"
0"backplane wires, connect with another antenna they are 'aimed' at, instead"
0"of a matching numbered connection, hence their name."

0"- Backplane: This usually refers to any kind of way that parts of wires can"
0"connect to each other from a distance without having to draw all cells"
0"between them. It's considered that this happens on another hidden circuit"
0"board, the 'backplane'. For example the global wires and antennas."

0"- Built-in circuit: One of the circuits (or articles) that are loaded"
0"and available automatically, built into this program itself, as opposed to"
0"user-created and edited circuits. This glossary itself is one of them."

0"- Built-in device: A type of device that has complex behavior but doesn't"
0"need to be made from individual logic gates since it's provided as a feature by"
0"the emulator. For example: a mathematical multiplier can be made from"
0"purely NAND gates alone in a circuit, then it is not a built-in multipler"
0"but a multiplier made from scratch. But logicemu also provudes the built-in"
0"ALU component 'U', which can do various operations including multiply,"
0"using that one means using a built-in device as multiplier."

0"- Cell: a single square on the grid, on which the circuits are built with one"
0"letter or other ASCII character per cell."

0"- Chip: see Integrated Circuit."

0"- Circuit: One of the pages in LogicEmu, like this glossary itself here is."
0"There are built-in circuits, like this one, or it's possible to create and"
0"edit your own circuits. Circuits can contain various devices, wires, gates,"
0"text comments, etc... and can focus on a single topic, or contain a mix of"
0"many different topics, things, etc... They can either fit on a single screen,"
0"or be large and have a scrollbar."

0"- Component: a device, such as an AND gate, a switch, an LED, an interactive"
0"terminal, and so on. A component can occupy multiple cells, and all its"
0"output wires are also considered part of the component."

0"- Counter Gate: A 'gate' that acts as a single-input T flip-flop or frequency"
0"halver: it flips its state each time the input goes from low to high."
0"Example:"

s-->c-->l

0"- Device: see Component"

0"- Device input: see Input"

0"- Dropdown: the various menus in the menu bar at the top, in which various"
0"options and/or circuits can be selected."

0"- Electron Mode: emulation mode that works gate per gate, slower but lower"
0"level than immediate mode. Chooseable with one of the top dropdowns"
0"See also this other help-circuit:"
0"INSERT:link:algohelp"

0"- Graphical Mode: Rendering where things are drawn with boxes, arrows and"
0"generally look more graphical than the text mode."
0"See also this other help-circuit:"
0"INSERT:link:renderhelp"

0"- Graphics Mode: see Graphical Mode"

0"- IC: see Integrated Circuit."

0"- Immediate Mode: emulation mode that works globally and faster than electron"
0"mode, for sequential circuits or combinational circuits without loops."
0"Chooseable with one of the top dropdowns."
0"See also this other help-circuit:"
0"INSERT:link:algohelp"

0"- Input: this can mean two things:"
0" - Inputs of some circuit, such as the switches 's', pushbuttons 'p' or"
0"   keyboard/decimal input with an interactive terminal"
0" - As device input: the arrows (or circles if negated) that enter some device"
0"   or logic gate. Example: the arrow that enters the LED 'l' here:"

s-->l


0"- Integrated Circuit: the ability to define a circuit and reuse it multiple"
0" times elsewhere on the board. The definition or template is indicated with"
0"a capital 'I' and a usage or instance with a small 'i'"

0"- Large Device: built-in devices that can have multiple differently"
0"interpreted inputs and/or outputs. E.g. the Terminal which interprets"
0"inputs differently based on their location (ASCII input bits, 'read' signal,"
0"and so on). This as opposed to simple logic gates, LEDs, ... which interpret"
0"all inputs according to the same simple rules. Large devices typically also"
0"have larger surface area to allow all those inputs and ouptuts."

0"- Logic Gate: one of the basic logic gates such as OR, NOR, AND, NAND, XOR,"
0"XNOR. This is a type of device, other devices such as LED, switch or"
0"interactive terminal are not logic gates."

0"- LSB: least significant bit: if bits represent a number, which of the bits"
0"has the value '1' (with the bit next to it having value '2', then '4', and"
0"so on). For some built-in devices in logicemu, it matters on which side of"
0"an input the LSB is (and the MSB, most significant bit, is on the other side).

0"- Mode: this can refer to algorithm mode (immediate mode or electron mode)"
0"or to rendering mode (text mode or graphical mode), see their respective"
0"entries."

0"- MSB: most significant bit, the bit farthest away from the LSB, see: LSB"

0"- Part: a character on a single cell (see Cell), as opposed to a Component"
0"which is made from one or more parts (or cells)."

0"- Rendering Mode: graphics mode, text mode or source mode, see their definitions."

0"- Source Mode: a rendering mode that literally shows the source code, not very"
0"  useful for running circuits, but for taking a quick look at the source code"
0"  in-place"

0"- Terminal: see VTE."

0"- Text Mode: Rendering where things are drawn with individual letter characters"
0"and other ASCII characters. Less nice looking than graphical mode, but more"
0"similar to the source code, and may be faster in some browsers."
0"See also this other help-circuit:"
0"INSERT:link:renderhelp"

0"- Ticks: The amount of emulation steps done so far. Individual ticks can"
0"be seen by using the tick button when the circuit is paused."

0"- VTE: Interactive Terminal, either as keyboard and/or as screen, made with 'T'."
0"The abbreviation VTE stands for Virtual Terminal Emulator, normally software"
0"emulated terminals are called such, and the one here represents actual"
0"hardware, so this may be a slight misnomer."

0"- Wire: Anything that connects devices together. The wires will have the"
0"logic value of the devices they are outputting from, and give that value"
0"to device inputs. Buses, backplane connections and patch cables in jacks"
0"are also forms of wires."

`, 'glossary');

registerCircuit('Controls', `
0"# Controls"

0"Interact with switches (s), pushbuttons (p) and timers (r) by clicking them:"

s--->l

p--->l

r--->l

0"Hover over things to see a tooltip describing them:"

llllllll    llllllll
^^^^^^^^    ^^^^^^^^
b#######    T#######c<p
     ^^^
     sss

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
0"How visible the hightlight is depends on the chosen color scheme."


f>a------------------. .->l
f-X--------,,--------+-+->l
f-+-----. .+. .----. .-+->l
f-+-----+-++--.  .-+---+->l
f-+-----+-,,-----+-+---+->l
f-+---. .--------+-+---.->l
f-+-. .----------+-+----->l
f-. .------------. .----->l

0"Control+Click on something will change it to an inverted type (e.g. AND to"
0"NAND, or default-off pushbutton to default-on pushbutton)."

p-->a-->e-->o-->l

f-->l

s-->c-->l

s-->z-->l

0"Control+Shift+Click on something will change it to an OFF constant, and"
0"toggle back to the original type the next time you ctrl+shift+click it."
0"This allows to temporarily disable inputs or devices when testing something"
0"out."
0"Exception: on switches of type S will become an on constant instead (you can"
0"get off constant by first switching off the switch, or ctrl+clicking the"
0"constant after the fact). This allows to freeze switches."

r-->l

P-->l

    l
    ^
s-->e<--S

0"# User Interface"

0"This briefly describes the controls at the top. You can also hover over them"
0"to get a tooltip with their explanation."

0"## User Interface - First Row"

0"The dropdowns labeled 'help', 'articles', 'circuits' all allow selecting the"
0"various built-in circuits. The current circuit is 'Controls' under 'help'"

0"The left and right arrow next to those dropdowns select the previous or next"
0"circuit."

0"The 'import' button allows to open another circuit, made by yourself or"
0"someone else. More info for that is in the 'Loading Circuits' help circuit."

0"Next to that is the full fledged edit button which allows to edit existing"
0"circuits or create new ones (similar to 'import')."
0"For more on that, see the 'Editing Help' help circuit."
0"Next to that is a save dropdown, that allows to save the current edited"
0"(or any, really) circuit to save slots A-F. These can be loaded with the 'my'"
0"dropdown at the circuit dropdowns to the left. These are saved locally on your"
0"machine, in local storage. Note that if you care about a circuit you edited"
0"or created, you should export it and back it up to your disk in a text"
0"editor, since local storage can easily get lost (it does not store it online)."

0"## User Interface - Second Row"

0"The first dropdown on the second row allows to choose the 'immediate' or"
0"'electron' algorithm to run the circuits. More information on that is in the"
0"'Ticks and Emulation Algorithms' help circuit"

0"Next to that, the 'tick', 'pause', 'slow', 'norm' and 'fast' buttons all"
0"control the speed. The tick button can be used while paused to do one step."

0"The ticks indicator itself shows how many updates or state changes have been"
0"done in the circuit. Depending on the immediate or electron algorithm, ticks"
0"have a different meaning. You can click the indicator to reset it to 0."

0"To the right of the ticks indicator is a dropdown to choose graphical mode,"
0"text mode or source mode. Graphical mode looks better, text may be faster and"
0"can help with editing instead. Source mode is even more primitive. More on"
0"that is in the 'Rendering Modes' help circuit."

0"Right of that is a color scheme selector, to choose between various light"
0"or dark schemes to render with."

0"Some color schemes have good contrast while others have a special theme."

0"The monochrome mode is special: it does not show the logic value of"
0"individual wires since it does not have color to do so, the only visible"
0"state are the capitalization of switches (s/S), pushbuttons (p/P),"
0"timers (r/R), LED outputs (l/L) and flip-flop states (c/C). The"
0"capitalization of logic gates (such as a for AND and A for NAND) does not"
0"indicate their state but their type."

0"The +/- buttons allow to zoom in or out."

0"Then there is a 'change' dropdown, which allows to change a gate or other"
0"device into something else. This only works for simple devices and does not"
0"allow to change the wiring layout. But it's useful to change a switch into a"
0"pushbutton for example."

0"Next is a dropdown for patch panel jacks. That's only useful if there are"
0"patch panel jacks in the circuit, like these:"

s-->J   J-->l

s-->J   J-->l

0"The stats button shows several statistics, such as estimated amount of"
0"transistors, about the circuit. Some statistics try to estimate real life"
0"cost of the circuit, others are more related to the internal emulation and"
0"have no real-life meaning."

`, 'controlshelp');

registerCircuit('Rendering Modes', `

0"There are three rendering modes: graphical (HTML5 canvas), text and source."
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

0"The source mode is a more primitive of the text mode, drawing all original"
0"source code characters of the circuit literally. This mode is not very"
0"useful for running circuits, but for taking a quick look at the source code"
0"in-place. Note that despite being simple text, this one may run slower in"
0"some browsers on circuits with lots of text due to how it has to create"
0"individual elements for every single character in this case."

0"The text mode may render faster in some browsers, especially for huge"
0"circuits."

0"Try out the modes on the circuit below by changing the dropdown at the top"
0"between 'graphical', 'text' and 'source':"

      l   lll
      m  lVVWl
      |   |ll  ####
   p--+---%--->l###   l
      |   |           ^
s---.......--->e>l.. .|.>T
      v       >     x *
s---->a-....-->a>l.. .|.>l1
      |  ...          s
    s-Xl ...     l
      l     ;   ^
             ; /
              .

0"You can also zoom in and out with the - and + buttons, and change the color"
0"scheme. These controls, too, are in the top bar."

`, 'renderhelp');

registerCircuit('Ticks and Emulation Algorithms', `
0"# Ticks and Emulation Algorithms"

0"It matters how you emulate circuits: when, how and how fast gates read their"
0"inputs. For some circuits, it's interesting to look at the signal propagating"
0"through individual gates, for others global fast response is more desired."
0"For that reason there are multiple emulation algorithms, selectable with a"
0"dropdown above."

0"E.g. the following circuit is most interesting in 'electron mode'. If you hit"
0"the button, you see the signal go round and round. In immediate mode, that"
0"would not be visible."


p..>e>e>e>e>e>e>e>e
    ^             v
    e             e
    ^             v
    e             e
    ^             v
    e<e<e<e<e<e<e<e

0"Normally you don't have to set this yourself, as the best mode is chosen"
0"automatically for each circuit loaded, based on the presense of particular"
0"loop-like structures. But if you are interested to mess around with it, read"
0"on below."


0"# The Details"

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
0"- immediate: updates propagate through all components in a sorted order. This"
0"  is done when you press a switch or button or when a timer ticks and keeps"
0"  ticking until things stop changing (in combintional circuits, that's after"
0"  one tick, for sequential ones or with loops, can be more)."
0"- electron: updates are done every so many milliseconds, but this update is"
0"  different than the update done for immediate mode. Instead, every component"
0"  updates only based on the previous state of its input components. This"
0"  means signals propagage more slowly, as if you can follow the electric"
0"  signal itself. This mode is good for circuits that build flip-flops from"
0"  primitive components (rather than using the built-in ideal flip-flops)"
0"  This mode also adds one more extra igredient: it adds some randomness to a"
0"  particular kind of double-linked loop as you find in an SR latch, and this"
0"  is loosely based on realistic physics of a flip-flop in metastable state"
0"  eventually reaching a stable state anyway. So indeed the electron mode is"
0"  mainly designed to simulate such behavior in a realistic way. The"
0"  immediate mode is good and fast but can't simulate matastability, hence"
0"  the reason to provide the slower 'nanosecond level' electron mode."


0"A circuit, when just loaded, will automatically be in one of the modes that"
0"is most suitable for the circuit: if there are no loops, it'll choose"
0"immediate mode. If there are particular types of short loops, electron mode."
0"In other cases with loops, immediate mode. A mode may also be enforced with a"
0"comment like this, which in this circuit sets it to electron initially:"

3"MODE:electron"

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
     ..a<.>e ..a<.>e ..a<.>e ..a<.>e
     v ^ . ^ v ^ . ^ v ^ . ^ v ^ . ^
"c"l<o ..+...o ..+...o ..+...o ..+...s"c"
     ^   .   ^   .   ^   .   ^   .
     a<.>e   a<.>e   a<.>e   a<.>e
     ^ . ^   ^ . ^   ^ . ^   ^ . ^
     ..+..   ..+..   ..+..   ..+..
       . .     . .     . .     . .
       s s     s s     s s     s s
     "b8 a8   b4 a4   b2 a2   b1 a1"

0"However, for a circuit with a loop, multiple ticks happen even in immediate"
0"mode. Here is a very simple example: When you turn the switch from 'off' to"
0"'on', the counter will disable itself a tick later.  This example is very"
0"simple, a more important case is for example when there is memory, then some"
0"computation happens on the memory, then the result is stored back into the"
0"original memory."

    ...
    v .
s..>c..>l

0"Another example of something that needs multiple immediate ticks is the delay."

s..>d..>l

0"An example of something that requires electron mode is a 1-tick pulse made"
0"from gate delays (without using 'd' but regular gates). In electron mode,"
0"this will pulse once when activating the switch. In immediate mode, it'll"
0"just stay off."

p....>o..]a..>l
    .     ^
    .......

0"Another electron example: in electron mode, the signal you make with"
0"the switch will loop around in a much nicer way than in immediate mode."

s..>e>e>e>e>e>e>e>e
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


          O-.
          ^ |
  s------>e<.--->l
          v |
          O<.

0"The randomness is not present in immediate mode. Due to the way those"
0"algorithms work, such loopy circuits settle to a well defined state"
0"immediately. The electron mode is physically more realistic, but slower."

0"An interesting circuit to compare the different modes is the 8-bit divider"
0"circuit. This divider has a very long longest path, but in immediate mode you"
0"see updates immediately. In electron mode, you can see the circuit flow for a"
0"long time, when changing the right buttons of the divider."

`, 'algohelp');


registerCircuit('Loading Circuits', `
0"For loading circuits, there are multiple options:"

0"# 1. Navigation"

0"First of all, you can load the built-in circuits, like this help one right"
0"here, with the dropdowns navigation at the top (labeled 'help', 'articles',
0"'circuits'), or the clickable links from the welcome and help pages."

0"You can aways reach the welcome and help page with the 'index' and 'help'"
0"links in the top left corner to get those lists, or use the drop downs at
0"any time without having to navigate to those pages first."

0"You can also use the next and previous buttons, to the right of the drop"
0"downs, to go to the next or previous built-in circuits, in the order they are"
0"in the drop downs".


0"# 2. Importing (Source Code)"

0"A second method, to load external circuits, is to load a circuit with"
0"'import' (or 'edit'). Then you need to get the source code from a circuit and"
0"paste it in the box. You can view the source code of circuits yourself with"
0"the 'edit' button (see the editing help for that). Source code of a"
0"circuit looks for example like this:"

3"s--->a---->l"
3"     ^      "
3"s----.      "

0"It becomes this when loaded:"

s--->a---->l
     ^
s----.


0"# 3. base64 URL code"

0"A third method is through a base64 code in the URL. This uses a fragment"
0"'#code=...' in the URL, and will decompress that base64 string to a circuit."
0"For example something like this (all those characters after 'code=' are the"
0"base64 code):"

0"lodev.org/logicemu/#code=0AHMtLS0-YS2BBmwKIIEBXgqBFC0uCg"

0"Note that those codes contain the entire circuit encoded inside of them and"
0"are decoded locally in the browser, these are not codes used by a web server"
0"or cloud (since LogicEmu doesn't use those) and they do not require online"
0"connectivity. Those 'fragments' aka 'hashes' (#) of URLs are not sent to any"
0"server by the browser."

0"Sharing this URL is also a way to share your own edited circuits, although it"
0"looks worse (no nice circuit shape visible) and there may be limitations on"
0"URL length (it's capped, huge circuits and especially those with lots of text"
0"instead of circuitry will not compress well)"



0"# 4. URL id"

0"A fourth method is through an id in the URL. This works only for built-in"
0"circuits. If you see '#id=....' in the URL, it means you can load that"
0"circuit directly from that URL, rather than see the main welcome page first."
0"For example:"

0"lodev.org/logicemu/#id=logic_gates"

0"These ids are built-in and known offline by LogicEmu (for the offline"
0"built-in circuits), they are not sent to any web server or cloud and require"
0"no internet connectivity."

`, 'loadinghelp');

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

registerTitle('Editing');

registerCircuit('Editing Help', `
0"# LogicEmu Editing Help"

0"This tutorial explains how to edit and create new circuits in LogicEmu."

0"It explains how editing is done in general, and explains all the types of"
0"parts that exist, and the cells they are made from."

0"Table of contents:"
0"INSERT:toc1"

0"# Introduction"

0"The simulation is cell based. Cells contain wires, parts, and so on. Devices"
0"can span multiple cells, e.g. a long wire, an enlarged AND gate, ..."

0"Each cell is an ASCII character, so a circuit can be created in a text editor"
0"with a fixed-width font."

0"In fact, to show better how circuits are built in this editing help, we"
0"force text rendering mode instead of graphical here with the following"
0"command:"

3"RENDER:text"

0"Editing can be done in the browser here with the 'edit' button in the top"
0"bar. But it is possible and more pleasant to do the actual editing itself"
0"in a good plain text editor (one that supports block selection). Then paste"
0"the finished circuit back in the box to try it out."

0"Try out the edit button here: You can change the AND gate below into an OR"
0"gate, by turning the 'a' into an 'o'. Press the 'edit' button, find this AND"
0"gate in it, change the a into an o, and press 'done'."



s..>a..>l     "<------ the AND gate to find"0
    ^
s....



0"Note how not only that logic gate but also this text itself was in there."
0"That is because this whole page including all text is a circuit you can edit!"

0"Edited circuits can be saved with the [save] dropdown to a few local save"
0"slots. But Local storage is unreliable (and not online), it's safer to export"
0"and save circuits for example to your disk with a text editor instead to"
0"safely keep them (or use version control, ...)."

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

s..>l

0"There are in fact 4 types of cells visible in the above circuit:"

s 0": the input switch which can be toggled with the mouse"

..0": wire which connects things"

> 0": arrowhead: input from the wire to the LED. For other diretions,"
  0"  use ^>v< for north, east, south, west respectively"

l 0": the output LED"

0"From here on all those and much more cell types are introduced one by one."

0"# SECTION I: Input/Output/Wiring"

0"## Wires"

3".: wire, wire split, wire corner"
3"-: horizontal wire"
3"|: vertical wire"

0"They don't do much below since they're not connected to anything here:"

          |        .-----
          |        |
-------   |    ----.       ........
          |        |
          |        .-----

0"## Switches"

3"s: initially off switch"
3"S: initially on switch"

0"Switches can be toggled with the mouse. They produce a logic signal traveling"
0"through the output wires when on. In real life this would make no sense, as"
0"an electrical circuit must be closed. However, in this simulation (and, in"
0"fact, logic diagrams in general) it makes perfect sense: only signal wires"
0"are shown, wires to power sources or for closing the circuit are hidden, no"
0"need to draw them, they are implicit."

0"Click the green switches with the mouse to toggle them"

          .
s......   .
          S

0"## LED"

3"l: LED/light (user output)"

0"The LED serves as outputs, to indicate the result. Here of course it's used"
0"on the simplest possible circuit so all the result shows is the same as the"
0"input switch. This is considered a full circuit though: with both an input"
0"and an output. It's not closed, like a real electric circuit, because wiring"
0"to power sources is implicit."

s....>l   S....>l

0"## Device inputs"

3"^: north device input"
3">: east device input"
3"v: south device input"
3"<: west device input"

0"You may have noticed the arrow heads in the LED circuit above. These connect"
0"a wire to the input side of devices such as logic gates and LEDs. While not"
0"introduced yet, below we use an 'o' as diode to demonstrate them best. A wire"
0"directly connected to some device is an output of that device, while when"
0"connected with an arrowhead it's an input. so the signal below goes from the"
0"switch s to the o and then from the o to the LED l:"

s....>o....>l

0"## Push button"

3"p: initially off push button"
3"P: initially on push button"

0"these are similar to the switch s/S, but toggle back to original state when"
0"releasing the mouse button"

p....>l   P....>l

0"## Controlled switch"

0"A switch or pushbutton with an input will only work if its input is on:"

s....>s...>l

p....>s...>l

s....>p...>l

0"## Wire crossing"

3"+: wire crossing"
3"x: diagonal wire crossing"

0"The wire crossing allows two independent signals to go through"

     s
     .
     .
s....+....>l
     .
     .
     v
     l

s.... ....>l
     x
s.... ....>l

0"## Wire and device packing"

0"-| can be packed closer together than ., because . would touch on all sides"
0"Different devices (here l and s) also don't interact if they touch (see"
0"further how to make them larger instead), they are individual LEDs and"
0"switches The circuit with . instead of -| operates as one because those .'s"
0"are all connected"

          lll
          ^^^
s----->l  |||     .....>l
s----->l  |||    s.....>l
s----->l  |||     .....>l
          |||
          sss

0"## Comments"

3"double quote: encloses comment"

0"Comments, like this text itself here, are made with double quotes. The comment"
0"starts at a quote and ends at the next quote on the same line. A number"
0"before the first double quote (or alternatively after the last) can also"
0"enable aligned or differently styled text. That is explained in a later"
0"chapter."


0"## Isolators"

3"(space): isolator"
3"@: isolator (structural)"
3"comment: also acts as isolator"

0"Isolators do not connect anything, no signal goes through. Normally space"
0"is used as isolators. @ can be used to indicate shapes, such as drawing a"
0"case around something, and also connects IC templates. Comments are"
0"isolators, no matter what is inside them (even if commented-out circuits)"

0"The @ looks like the letter '@' in text mode, and as a block in graphical mode"

  @ @@@@

0"# SECTION II: Logic Gates"


0"## Logic gates OR, AND, XOR"

3"o: OR gate"
3"a: AND gate"
3"e: XOR gate"

0"These devices operate on 2 (or any other amount of) inputs. The 'e' of XOR"
0"stands for Exclusive or."

s....      s....      s....
    v          v          v
s..>o..>l  s..>a..>l  s..>e..>l

0"## Logic gates NOR, NAND, XNOR"

3"O: NOR gate"
3"A: NAND gate"
3"E: XNOR gate"

0"These are similar but with inverted outputs."

s....      s....      s....
    v          v          v
s..>O..>l  s..>A..>l  s..>E..>l

0"## Inverted device inputs"

3"m: north inverted device input"
3"]: east inverted device input"
3"w: south inverted device input"
3"[: west inverted device input"

0"These invert the input signal, and will be rendered with a small circle in"
0"graphics mode."

s....]l   S....]l


s....      s....      s....
    w          w          w
s..]o..>l  s..]a..>l  s..]e..>l


s....      s....      s....
    w          w          w
s..]O..>l  s..]A..>l  s..]E..>l


0"NOTE: to invert *outputs* of devices, instead use a different device type,"
0"e.g. use NAND 'A' instead of AND 'a'"


0"## Multi-input logic gates"

0"Gates can have more than two inputs, for example three below, more is"
0"possible if the gate would be large enough, how to do that is introduced a"
0"bit further (extending with #). Note that multi-input XOR gates act as"
0"parity gates"

    s          s          s
    .          .          .
    .          .          .
    v          v          v
s..>o..>l  s..>a..>l  s..>e..>l
    ^          ^          ^
    .          .          .
    .          .          .
    s          s          s

0"Gates can also work as expected with just 1 input."

s..>o..>l       s..>O..>l

s..>a..>l       s..>A..>l

s..>e..>l       s..>E..>l

0"Gates can also work as expected with 0 inputs, and that includes the 0-input"
0"AND gate outputting a signal and the NAND gate not outputting a signal. The"
0"reason an AND gate with 0 inputs outputs a value, is because the rule of an"
0"AND gate is: it outputs when it does not have any 'off' inputs. This is also"
0"known as the empty product"

o..>l       O..>l

a..>l       A..>l

e..>l       E..>l

0"## NOT gate"

0"A NOT gate can be made in several ways from the existing parts. The"
0"recommended form is with a one-input NOR gate:"

s..>O..>l

0"but depending on the situation, you may find yourself using inverted device"
0"inputs, NAND gates, and so on instead"

s......]l

s..>A..>l

s..]o..>l

0"## Constant (fixed value)"

3"f: constant ('fixed') off"
3"F: constant ('fixed') on"

0"The constant value, indicated with 'f' or 'F' from 'fixed' always outputs 0"
0"(for small 'f') or '1' (for capital 'F'), even if it has inputs (so its"
0"inputs are meaningless)."

0"These are rendered as a '0' and a '1' instead of an 'f' and 'F' in graphics"
0"mode."

f-->l    s-->f-->l

F-->l    s-->F-->l

0"NOTE: the letter 'f' from 'fixed' instead of 'c' from 'constant' is used"
0"because 'c' is already used for 'counter' and 'clock' seen further on."

0"## Rules for wire with multiple devices"

0"A single wire can output to multiple devices. Note that we call the entire"
0"connected wire shape a single wire in the simulation's terminology. In the"
0"internals of the simulation, the entire wire, with all splits and arrow"
0"heads, is actually an extension of s (its output), and internally part of s."

s.........>l
      .
      ....>l
      .
      ....>l

0"But multiple different outputs inputting to the same wire is an error As seen"
0"above, the wire is an extension of the part it outputs from. So here it would"
0"be three different switches at the same time, which is of course impossible."

s.....
     .
s..... 0"error expected"
     .
s.........>l

0"If you do want to output multiple devices to 1 wire, use an OR gate,"
0"(or as seen further, a tristate buffer)"

s.....
     v
s...>o
     v
s...>o....>l

0"## Device extender"

3"#: device extender"

0"An extender extends the size of a device, for many-input logic gates, or"
0"large or specially shaped switches and LEDs. Remember, devices like s, l, o,"
0"a, e whose letters touch don't interact with each other when touching but"
0"work independently, so # is needed to extend its area instead"

lllll    lllll    lllll    ###
^^^^^    ^^^^^    ^^^^^    #l#
|||||    |||||    |||||    ###
o####    e####    e####     ^
^^^^^    ^^^^^    ^^^^^    ###
|||||    |||||    |||||    #s#
sssss    sssss    sssss    ###

0"This also allows extending LEDs to form, for example, a 7-segment display:"

    ##l<-.
   #   # |
  >l   l<|
  |#   #||
 .+>l## ||
 ||#   #||
 ||#   #||
 ||l   l||
 ||^#l#^||
 ||| ^ |||
 ||| | |||
 ||| | |||
 sss s sss

0"The device extender is used for logic gates, LEDs, switches and other single-"
0"cell devices. However, for large devices which are introduced below, like T,"
0"i, M, B, b, the extenders are not (always) needed, for those the letters"
0"themselves usually connect with each other, unlike a, o, e, etc... do."

0"It's not allowed to mix different letters in the same extended area, except"
0"for a few types of devides that use multiple letters like flip-flops. For"
0"example the following is an error due to mixing a and o with a #:"

s-->a-->l 0"error expected"
    #
s-->o

0"To summarize:"

0"With some exceptions, device letters that touch don't interact (whether or"
0"not they are the same letter), devices can be made bigger by adding #, and"
0"it's not allowed to mix different device types in a single group of # (but"
0"adding more of the same letter in the same group of # will simply keep it the"
0"same single device)"

0"# SECTION III: Flip-Flops And Memory"

0"## Counter"

3"c (standalone): initially off counter"
3"C (standalone): initially on counter"


0"This is a single-input T flip-flop or frequency halver (the c stands for"
0"counter here since multiple together form a binary counter)."
0"Whenever the input toggles on, the c changes its state, so its output toggles"
0"at half the rate as the input."
0"Capital C starts in on state instead of off state, other than that behaves"
0"the same."

s..>c..>l     s..>C..>l

0"This can make a binary counter, although it counts backwards in this simple form"

s..>c..>c..>c..>c..>c..>c..>c..>c..>l

s..>C..>C..>C..>C..>C..>C..>C..>C..>l

0"## Flip flop"

3"c: flip flop part: clock, state off, can be combined together"
3"C: flip flop part: clock, state on, can be combined together"
3"j: flip flop part: s or j input, can be combined together"
3"k: flip flop part: r or k input, can be combined together"
3"d: flip flop part: d input, can be combined together"
3"t: flip flop part: t input, can be combined together"
3"q: flip flop part: output or asynch set, can be combined together"
3"Q: flip flop part: inverted output or asynch reset, can be combined together"
3"y: flip flop part: enable input, can be combined together"


0"Real ideal flip-flops can be made from 'c', 'd', 'j', 'k', 't', 'q' 'Q' and 'y',"
0"they can be combined to make SR, JK, D or T flip-flops."
0"Here is how to interpret each letter:"
0"- c: the clock input. When the clock input goes from low to high the flip-flop"
0"  will toggle if needed"
0"- j: the S input for SR flip-flop or the J input for JK flip-flop"
0"- k: the R input for SR flip-flop or the K input for JK flip-flop"
0"- d: the D input for D flip-flop"
0"- t: the T input for T flip-flop"
0"- q: output, or asynchronous S input. Note that c, j, k, d and t can also"
0"  already be used as outputs"
0"- Q: negated output, or asynchronous R input"
0"- y: enable input: if present, only reacts to inputs if this is on. May also"
0"  replace c, then the object is a latch instead of a flip-flop. Asynch q and Q"
0"  still override this."
0"Most other parts will also output signal so using q and Q is not required for"
0"that. These parts can be combined in any way, with # (visible in text mode)"
0"as filler"

s..>c..>l
    #       0"D flip-flop: when triggering c, the output will remember the state of d"
s..>d


s..>c..>l
    #       0"D flip-flop: when triggering c, the output will toggle if t is on"
s..>t


s..>j#q..>l
    ###
s..>c##     0"JK flip-flop (also usable as SR flip-flop)"
    ###
s..>k#Q..>l


      s
      v
s..>j#q..>l
    ###
s..>c##     0"JK flip-flop with additional asynch set/reset"
    ###
s..>k#Q..>l
      ^
      s

s..>q..>l
    #      0"SR latch: no clock"
s..>Q..>l


s..>j..>l
    #
s..>c..>l 0"JK flip-flop with q and Q left out, they are not required to get outputs"
    #
s..>k..>l


s..>q..>l
    #      0"SR latch: no clock, output remembers single switch"
s..>Q..>l



s-->d-->l 0"D-latch (enable input instead of clock)"
    #
s-->y


s-->c-->l
s-->t-->l
s-->d-->l 0"All parts combined in 1 flip-flop"
s-->j-->l 0"Not realistic, but possible."
s-->k-->l 0"J+K combination overridden by D"
s-->q-->l
s-->Q-->l
S-->y-->l


s-->t-->l
s-->d-->l
s-->j-->l 0"All parts combined in 1 flip-flop, without clock"
s-->k-->l 0"Not realistic, but possible."
s-->q-->l 0"J+K combination overridden by D"
s-->Q-->l
S-->y-->l

0"Letters of the same type touching will be considered a different flip-flop"
0"rather tha combine together, and will allow input to pass through. This"
0"allows to create packed flip-flops, such as multiple D-flip-flops with each"
0"their own data input, but shared clock, enable, asynch reset and asynch set:"

     sSss
     vvvv
s-->dcyQq-->l
s-->dcyQq-->l
s-->dcyQq-->l
s-->dcyQq-->l


0"This is only a selection of the combinations you can do with those. Also, you"
0"can make flip-flops from the ground up with more basic components instead as"
0"well (e.g. NAND-only). Other built-in circuits demonstrate those."

0"A few combinations of the above with missing parts, or standalone parts (such"
0"as a lone d, or a lone q) would not perform useful behavior with the rules"
0"above. Some of those combinations have been overridden with completely"
0"different behavior. These are described below."



0"## Delay"

3"d (standalone): 1-tick delay (behavior depends on tick algorithm)"

s..>d..>l

s..>d..>d..>d..>d..>d..>d..>l

0"Numbers from 2-256 make d become an N-tick delay, with buffer that remembers"
0"all upcoming tick values, so it behaves like N d's in a row"

s..>d..>l
    6

s..>d..>l
    1
    6

0"Note that this means a very short pulse still stays a very short pulse, it"
0"just is delayed. If you want to guarantee a certain minimum pulse length (at"
0"least for a single short input), try the following:"

   .....
   .   v
 p..>d>c..>l
     1
     6

0"Note: the data (j,k,d,t) inputs of a flip-flop must already be set before the"
0"clock signal ('setup time'). Enabling the clock and data signal at the exact"
0"same time does not work. This is expected behavior, otherwise shift registers"
0"wouldn't work. For example this d flip-flop cannot be toggled on due to the d"
0"input arriving at same time as clock which is too late:"

s..>d..>l
  . #
  .>c

0"Putting a delay at the clock input solves this (note that in this silly"
0"example once on it can't be turned off):"

s......>d..>l
  .     #
  .>d..>c

0"## Pulse"

3"q (standalone): gives single tick pulse on positive input edge"
3"Q (standalone): gives single tick inverted pulse on positive input edge"

s-->q-->l

s-->Q-->l


0"A pulse duration can be made longer with a number:"

    1
    0
s-->q-->l

0"A pulse can be combined with enable input, but if adding any other flip-flop parts"
0"it'll behave as the flip-flops explained above instead."

s-->q-->l
s-->y

s-->Q-->l
s-->y

0"Note that the pulse can also be made with a delay and an AND gate instead,"
0"or with a c looping back to itself, the single q is just a shortcut:"

  .....          ...
  .   v          v .
s-.>d]a->l   s..>c..>l

0"## Permanent enable"

3"j (standalone): initially off, once enabled can never be disabled"
3"k (standalone): initially on, once disabled can never be enabled"

s-->j-->l

s-->k-->l

0"This behavior happens for j because it's a flip-flop input. A j-input"
0"will enable a flip-flop, but if it's standalone there are no other inputs to"
0"disable it."
0"The k, howver, would normally not do that so a standalone k is specially"
0"modified to do the inverse behaviour of a standalone j."

0"You can ctrl-click the j or k to reset them back anyway."


0"## Memory"

3"b: ROM and RAM bit, value 0"
3"B: ROM and RAM bit, value 1"

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
 "2"s---->Bbb"0"     Bbb"0"
 "1"s---->BBb"1"     BBb"1"
          bBB"2"     bBB"2"
          bbB"3"     bbB"3"
                      ^^
                      ||
                      ss
                     "21"

0"RAM, unary address select. The clock input 'c' writes the data to the selected"
0"data line."

           lll"output"
           ^^^
           |||
   "a 0"s->bbbc<-p"store"
   "d 1"s->bbb
   "d 2"s->bbb
   "r 3"s->bbb
   "e"     ^^^
   "s"     |||
   "s"     sss"data"

0"RAM, binary address select. 16 lines, only 5 visible here, so you won't see"
0"the line in hardware if you select an address higher than 4 but it can still"
0"internally store the state. Choose a low address, enable some data bits and"
0"use 'store' to see some small b's become capital B's, indicating a 1 is"
0"stored in this bit"

           lll"output"
           ^^^
           |||
   "a 8"s->bbbc<-p"store"
   "d 4"s->bbb
   "d 2"s->bbb
   "r 1"s->bbb
   "e"     bbb
   "s"     ^^^
   "s"     |||
           sss"data"

0"RAM can also have an enable-input y, if so writing only works if enable is"
0"on during the positive edge of the clock. It can also have a reset-all input"
0"Q, which resets all lines to 0"

           lll"output"
           ^^^
           |||
   "a 8"s->bbby<-s"enable"
   "d 4"s->bbbc<-p"store"
   "d 2"s->bbbQ<-p"reset all"
   "r 1"s->bbb
   "e"     bbb
   "s"     ^^^
   "s"     |||
           sss"data"

0"Summary of the special characters for RAM/ROM:"
0"- y: enable: enable or disable the clock"
0"- c: clock (write/store on positive clock edge)"
0"- Q: reset all (asynchronous, overrides enable)"


0"## Decoder and encoder"

0"The ROM/RAM components can also be set up to do a completely different"
0"not memory-related operation: binary decoder, binary encoder or priority"
0"selector. This still makes sense, since those are operations the above"
0"ROM/RAM components do to handle the unary and/or binary address select."

0"To use a b as such a coder, use b with # instead of mixing multiple b's and"
0"B's. It is still allowed to have multiple b's (just like you can have an"
0"AND gate made like a###a), but there must be less than the amount of outputs,"
0"that's how the distionction is made."

0"Binary N to unary 2^N decoder"

"76543210"
 llllllll
 ^^^^^^^^
 ||||||||
 b#######
      ^^^
      |||
      sss
     "421"


0"Unary 2^N to binary N encoder"

     "421"
      lll
      ^^^
      |||
 b#######
 ^^^^^^^^
 ||||||||
 ssssssss
"76543210"


0"Unary to unary: priority selector"

"76543210"
 llllllll
 ^^^^^^^^
 ||||||||
 b#######
 ^^^^^^^^
 ||||||||
 ssssssss
"76543210"

0"These devices can also have an enable input and enable output. These are"
0"not indicated with 'y' however since they work differently. The enable input"
0"will disable all outputs if not on. The enable output will go on if any of the"
0"regular outputs is on. This allows chaining multiple of them."

 "76543210"
  llllllll
  ^^^^^^^^
  ||||||||
l<b#######<s
  ^^^^^^^^
  ||||||||
  ssssssss
 "76543210"

0"## Fixed Values"

0"Another method of providing some data, are fixed values, given in decimal"
0"but outputting the value in binary. The least significant bit will be on the"
0"most clockwise end of a side, so at the right side if the outputs are at the"
0"top but at the left side if at the bottom. The decimal value is always read"
0"from left to right or top to bottom though."


llllllllll   f12#######
^^^^^^^^^^   vvvvvvvvvv
f12#######   llllllllll

llllllllll   llllllllll
^^^^^^^^^^   ^^^^^^^^^^
f500######   f3########

0"A capital F inverts the output bits"

llllllllll
^^^^^^^^^^
F12#######

0"NOTE: the letter f and F are not rendered in graphical mode, only in text mode."
0"In graphics mode, just the decimal value is shown, with a different border"
0"color around the component in case of inverted bits with capital F."

0"# SECTION IV: Integrated Circuits"

0"## Integrated circuit template and usage"

3"I: IC template / definition"
3"i: IC usage / instance"

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
    .. ..      ^^    ^^
    .   .      ||    ||
    s   s      ss    ss

0"The template must use exactly s as input and l as output, to mark them."
0"In the copy any gate inputs to the ic count as input and wires exiting"
0"count as output, so copies can use anything, including gates and other"
0"template copies, as inputs and outputs"

0"Copies must have exactly the same amount of inputs and outputs as the"
0"template, and in the same directions (except if rotated, see below), else it"
0"indicates yellow error as shown here (1 input missing):"

 ll
 ^^
 ||
 i5 0"error expected"
 ^
 |
 s

0"Use # to make the copy bigger if space to attach more inputs is required."

 l  l
 ^  ^
 .  .
 ##i5
 ^  ^
 .  .
 s  s

0"While the template must use 's' to indicate inputs and 'l' to indicate"
0"outputs, any instances may use anything, such as gates, other chips, ... as"
0"inputs and outputs"

l   l
^   ^
o<#i5
^ ^ ^
#i5 .
^ ^ .
s s s

0"Multiple definitions for the same number results in an error:"

 I6      I6
s-->l   s-->l    s-->i6-->l   0"error expected"

0"Inputs are matched to the template by their direction (north, east, south,"
0"west), and their order in this direction. Other than that, the shape and"
0"location of the inputs and outputs is freeform, e.g. see how the 'p' in the"
0"copy is more to the left while it matches the rightmost s of the template:"
0"that's because this is the only input coming from the east, so they match"

                 llllll
    llllll       ^^^^^^
    ^^^^^^     s>######
   s.||||.sI7    # ^^ #
     ssss        # ss #
                 #<p  #
                 #    #
                 ##i7##
                 ^    ^
                 s    s

0"## Nesting integrated circuit templates"

0"You can nest templates, 1 template can refer to others, e.g. here we use the"
0"I5 from above inside a new template I8 (we're making a full adder from two"
0"half adders here by the way):"

l   lI8    l   l     l   l
^   ^      ^   ^     ^   ^
o<#i5      .   .     .   .
^ ^ ^      ###i8     ###i8
#i5 .      ^ ^ ^     ^ ^ ^
^ ^ .      . . .     . . .
s s s      s s s     s s s

0"## Rotated chips"

0"Chips can be rotated in steps of 90 degrees if desired. To do this, rotate"
0"the position of the number compared to the small i in a different position"
0"than the number is compared to the large I of the template. If there is any"
0"ambiguity, such as the number being surrounded by i's from multiple sides or"
0"it being the IC with no number at all then it will not rotate and take the"
0"templat's rotation."

0"E.g. here chip 5 from above is rotated:"

l<5<s
  i
l<#<s

0"# SECTION V: Extra Parts"

0"These parts do not extend the logic abilities, but allow different ways of"
0"input/output interaction"

0"## Timers"

3"R: timer initially on"
3"r: timer initially off"

0"This is a realtime timer, toggling state every so many milliseconds. r is"
0"initially off, R is initially on, so r and R blink with opposite timings"
0"(they are 180 degrees out of phase)"
0"The number indicates the duration, in emulation ticks per timer change. The"
0"full period of the timer is two changes so twice that. For the normal"
0"emulation speed, that means the number gives the timer period in tenths of a"
0"second. The fast or slow emulation speeds alter this."
0"The default speed, when no number is given or number 0, is a period of 20"
0"ticks, which means about 1 second for the normal emulation speed."

r....>l   R...>l

0"A timer with an input will only work while the input is enabled"

s..>r..>l   S..>r..>l

0"You can click a timer with the mouse to freeze or unfreeze it."

0"## Numbers"

3"0123456789: affect various properties of other parts"

0"Numbers were already encountered above for a few parts. Numbers affect many"
0"things including: LED colors, timer speeds, IC indices, delay durations,"
0"bus/bundle wire numbers, etc..."

0"All LED colors:"

s.............>l0 0"0: red (default color)"

s.............>l1 0"1: orange"

s.............>l2 0"2: yellow"

s.............>l3 0"3: green"

s.............>l4 0"4: blue"

s.............>l5 0"5: purple"

s.............>l6 0"6: pink"

s.............>l7 0"7: white"

s.............>l8 0"8: test signal: toggles between red (off) and green (on)"

s.............>l9 0"9: LCD"

0"Numbers affecting timer speed:"

l l l l l l l l l l l
^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
. . . . . . . . . . .
r r r r r r r r r r r
1 2 3 4 5 6 7 8 9 1 1
                  0 1

0"Numbers are parsed from the component outward. So this works correctly:"


  R..>l
  1
  5

0"But this does NOT work as intended, the timer will be parsed as having a"
0"speed of 1, not as 15, because it only parses the number in a straight line"
0"from the r:"

  R..>l 0"does not work as intended (too fast)"
  15

0"Numbers are used for several different things, such as style/alignment of"
0"comments, timer delay duration, LED colors, IC identifiers, and so on. If a"
0"number touches multiple different kinds parts, then there is a certain order"
0"of importance of which part exaclty the number will affect. The number will"
0"usually not have multiple different effects but only the most important one."
0"E.g. a number used for comment alignment will not change the color of an LED"
0"that happens to touch the number. The order of important, with the top"
0"taking priority, is:"

0"- comment alignment and style"
0"- bus of wires"
0"- global wire 'g'"
0"- IC definition"
0"- IC usage"
0"- ROM"
0"- timer timings"
0"- LED color"

0"Standalone numbers, or numbers touching only a regular wire (when it doesn't"
0"cause any effect) can also be used as a type of comment, the number will"
0"remain visible and have different styling than normal comments (matching the"
0"color of circuits rather than comments)."


0"## Patch Panel Jack"

3"J: jack for patch panel wires"

0"J is a patch panel jack. Path panel jacks allow making arbitrary connections"
0"between any two jacks."

0"Click a jack, then another jack, to connect them together with a patch wire."
0"To remove a wire, click both its jacks again. To remove all wires from one"
0"jack, click that jack twice. To remove all jacks from the board (or save"
0"state), see the dropdown for patchpanel jacks in the menu bar."

0"A jack supports a maximum of 4 wires, adding more will remove the oldest one."

0"You cannot connect multiple jacks that have an input (an arrow pointing to"
0"it) together in one group, if you try an older input connection may be"
0"removed, or it may refuse to connect and indicate a temporary red line. This"
0"is because multiple inputs to the same connected jacks gives a conflict (we"
0"could OR them, but instead we choose the realistic approach where this can"
0"cause an electric short)."

0"Example: the jacks J below allow you to choose to connect the switches"
0"to an AND gate, a XOR gate, directly to a LED, or make some other combination:"

s>J    J>a>J    J>l
         #
       J>#


s>J    J>e>J    J>l
         #
       J>#


0"## Music Note"

3"N: music note (note/noise, audio speaker)"

0"A Music Note 'N' acts like a speaker, producing a tone of a given frequency."

0"NOTE: this only works if your browser supports Web Audio. The browser may"
0"also require interaction with the page, by clicking something, before audio"
0"can play."
0"If not supported, the N's will still indicate when they're enabled."

p-->N349
  p------>N369
p-->N391
  p------>N415
p-->N440
p-->N466
  p------>N493
p-->N523
  p------>N554
p-->N587
  p------>N622
p-->N659
p-->N698

0"Values from 20 to 20000 hertz are supported, though not all may be audible"
0"through your speakers."

p-->N20

p-->N50

p-->N100

p-->N200

p-->N400

p-->N1000

p-->N2000

p-->N4000

p-->N8000

p-->N12000

p-->N15000

p-->N20000


0"Playing two sounds with slightly different frequencies at the same time may create a beat effect:"

  .>N440
p..
  .>N441


0"By default the audio is a sine wave. Adding increments of 100000 allows other wave shapes:"

p-->N000440 0"sine"

p-->N100440 0"square"

p-->N200440 0"triangle"

p-->N300440 0"sawtooth"

p-->N400000 0"white noise"


0"Multiple inputs control the volume in binary:"

  N###440
  ^^^^
  ||||
  ssss
 "8421"


0"Multiple input groups control different properties. The number now is the"
0"maximum frequency. Both freq and vol must have a non-zero value to hear"
0"anything."

  N#####################2000
  ^^^      ^^^^    ^^^^
  |||      ||||    ||||
  sss      sSss    ssss
1"shape" 1"freq"  1"vol"


0"A music note can also be given an enable-input with y, then it only"
0"produces sound if it's on"

  N########################y#2000
  ^^^      ^^^^    ^^^^    ^
  |||      ||||    ||||    |
  sss      sSss    ssss    S
1"shape" 1"freq"  1"vol""enable"1


0"## Kinetic Output"

3"K: kinetic output, comes in various forms, depending on a number"

0"These have various symbols in graphical mode, or use letter 'K' in text mode."

0"Numbers 0 (or none), 1, 2 and 3 represent different output devices"

s--->K  0"no number: same as 0."

s--->K0 0"motor / gear"

s--->K1 0"fan / wind / cooling"

s--->K2 0"heating"

s--->K3 0"pump / sprinkler / liquid"

s--->K4 0"electromagnet"

0"for completeness: other simple output types not using 'K' (excludes dot matrix screen, ascii, ...):"

s--->l  0"light / lamp / LED"

s--->l9 0"LCD"

s--->N  0"speaker"

s--->T  0"binary"

0"These outputs such as fan, electromagnet, ... have no other effect other than"
0"showing a different icon if enabled (unless their sensor versions are used,"
0"see below). As output, they're no different than what an LED does, displaying"
0"output. But it can be used to indicate that this output represents some"
0"particular type of action."

0"These components can also be used as detectors instead. As a detector, they"
0"will typically only detect output by one of their matching type in a certain"
0"radius in the neighborhood. Some have slightly different behavior."

0"Gear: activates all neighbors eventually, but has a radius of 1:"

l<--KKKKKKKKKKKKK
                K
s-->KKKKKKKKKKKKK

0"Gears will activate if neighboring gears are active, except if exactly 3"
0"neighbors are active."

               KKKK
p--->KKKKKKKKKKKK KKKKKKKKKKK<--p
               KKKK


0"Fan: only detects active fans with an input, but not fans that indirectly detect air, and have a larger radius, but"
0"notice that fans too far away from the active one detect nothing:"
0"Without inputs, the fan is, instead, an airflow sensor."

 K1 K1 K1 K1 K1

 K1 K1 K1 K1 K1

 K1 K1 K1 K1 K1

s-->K1 K1 K1 K1

 K1 K1 K1 K1 K1

 K1 K1 K1 K1 K1

 K1 K1 K1 K1 K1

0"Heat: similar to fan but smaller radius:"
0"Without inputs, the fan is, instead, a heat sensor."

 K2 K2 K2 K2

 K2 K2 K2 K2

s-->K2 K2 K2

 K2 K2 K2 K2

 K2 K2 K2 K2

0"Water: unlike fan and heat, all water 'pipes' will transmit the water on to"
0"next pipes, and some gap between pipes is allowed:"

s-->K3  K3  K3  K3  K3  K3  K3  K3 3K-->l

0"Electromagnet: similar to fan and heat, with much larger radius, but only transmits"
0"in straight directions (N, E, S, W), not the entire circular pattern:"
0"Without inputs, this acts as a sensor for electromagnets in those 4 directions."


   4K-->l

s-->K4                   4K-->l
s-->K4                   4K-->l
s-->K4                   4K-->l

   4K-->l

0"Note: only those that do not have any inputs (arrows pointed at them) will act"
0"as sensors, those with inputs will only activate if their input is enabled, not"
0"from neighboring matching devices."

0"Higher numbered variants of K have more active effects:"

0"Numbers 5-9 represent TNT of different strengths which can permanently disable devices in a certain radius"

    l<S
    l<S
s-->K5
    l<S
    l<S


   l<Sl<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S
      l<Sl<S
s---->K6 l<S
      l<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S


0"The effect can also propagate to others, and be detected if a detector is at safe distance:"

    K   K   K   K   K   K
    6   6   6   6   6   6

s-->K   K   K   K   K   K------>c>l
    6   6   6   6   6   6

    K   K   K   K   K   K
    6   6   6   6   6   6

0"Note: size 7..9 are larger and not shown here to not affect the other circuits around here."


0"Numbers 10-14 represent EMP of different strengths which can temporarily disable devices in a certain radius"

    l<S
    l<S
s-->K10
    l<S
    l<S


   l<Sl<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S
      l<Sl<S
s---->K11l<S
      l<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S

0"If the EMP disables its own input switch, it will cause flickering:"


s-->K11


0"Note: size 12..14 are larger and not shown here to not affect the other circuits around here."


0"Numbers 15-19 represent jamming signal of different strengths which can temporarily randomize devices in a certain radius"

    l<S
    l<S
s-->K15
    l<S
    l<S


   l<Sl<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S
      l<Sl<S
s---->K16l<S
      l<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S
   l<Sl<Sl<S

0"Note: size 17..19 are larger and not shown here to not affect the other circuits around here."

0"Number 20 represents a cover or hatch, that when off, makes what's below it invisible."


    ############
    #          #
    #"revealed"#
    #          #
s-->K20        #
    #          #
    # s.....>l #
    #          #
    ############


0"## Dot Matrix Display, RGB LED"

3"D: dot matrix display, RGB LED"

0"With three or less inputs, or 4-9 inputs but less than 2 sides used, D is a"
0"single RGB LED (a single pixel, which can be made larger):"

s.>D<.s    D##
   ^       ###
   .       ###
   s       ^^^
           sss
          "RGB"

0"1-9 color inputs use various different color palettes:"


"1 input: mono"0"2 inputs: RG"0"3 inputs: RGB"

 D              D#             D##
 ^              ^^             ^^^
 s              ss             sss
"I"            "RG"           "RGB"

0"4 inputs: RGBI"

 D###
 ^^^^
 ssss
"IRGB"

0"5 inputs: 27 colors 3-level RGB: : 0-26 = 3x3x3 colors""

 D####
 ^^^^^
 sssss
"X8421"

0"6 inputs: 64 colors 4-level RGB"

 D#######
 ^^ ^^ ^^
 ss ss ss
"Rr Gg Bb"

0"7 inputs: 125 colors 5-level RGB: 0-124 = 5x5x5 colors"

 D######
 ^^^^^^^
 sssssss
"...8421"

0"8 inputs: 216 colors 6-level RGB: 0-215 = 6x6x6 colors"

 D#######
 ^^^^^^^^
 ssssssss
"....8421"

0"9 inputs: 512 colors 8-level RGB"

 D##########
 ^^^ ^^^ ^^^
 sss sss sss
"Rrr Ggg Bbb"

0"With more input groups as configured below, D is the Dot Matrix Display:"

0"With binary addressing:"

      D#######y<S"enable"
      ########c<p"dot"
      ########q<p"fill"
      ########
      ########<s"b"
   :s>########<S"g"
   ys>########<s"r"
   :s>########<s"i"
           ^^^
           sss
           "x"



0"The BGRI inputs are blue, green, red and intensity. Not all must be present,"
0"any of 0, 1, 2, 3 or 4 color bits are possible and each amount has a different"
0"color palette. If there are 3 inputs, each pixel represents an RGB LED."


0"With line based matrix addressing:"

    s>D#######y<S"enable"
    s>########c<p"dot"
    S>########q<p"fill"
    s>########
    s>########<s"b"
    S>########<S"g"
    s>########<s"r"
    s>########<s"i"
      ^^^^^^^^
      ssSssSss

0"The following lettered inputs are supported:"
0"- y: enable"
0"- c: enable"
0"- q: fill"
0"- Q: reset: fill with color 0"

0"The same color schemes as for the RGB LED are available, with up to 9 color inputs."

0"In addition, 0 color inputs uses oscilloscope color: green, fades out over time (time based on amount of"
0"dots drawn, line based addressing not supported in case of oscilloscope, 'fill' instead clears)"

0"To see the fadeout, first draw a dot in one place, then change location and keep drawing a dot in the"
0"different location until old dot starts fading out."

      D#######c<p"dot"
      ########Q<p"clear"
      ########
      ########
      ########
    s>########
    s>########
    s>########
           ^^^
           sss

0"Note that the oscilloscope does not support 'fill', since it can only have a few"
0"dots lit at the time. It supports 'clear', but clear is in a sense cheating"
0"the dots should normally fade out over time, representing phosphor fading out."
0"Also note that the phosphor fadeout uses the 'dot' input as clock, not the"
0"real time."


0"## Mux"

3"M: Multiplexer (various functions)"

0"M together with # to make it large enough forms a multiplexer, or, in other"
0"configurations, a demux, controlled swap, and possibly with more than two"
0"inputs/outputs and passthrough of the select signal."

0"Mux:"

    4"control"4         4"control"4
         l                  l l
         ^                  ^ ^
    :    .                  . .
    i    .             :    . .
    ns..>M..>l0"out"   is..>M##..>l3"out"
    p    #             n    ###
    us..>#             ps..>###
    t    ^             u    ###
    s    .             ts..>###
    :    .             s    ###
         s             :s..>###
    4"control"4             ^ ^
                            . .
                            . .
                            s s
                        4"control"4

0"Demux:"

    4"control"4         4"control"4
         l                  l l
         ^                  ^ ^
         .                  . .
         .    :             . .    :
5"in"s..>M..>lo    5"in"s..>M##..>lo
         #    u             ###    u
         #..>lt             ###..>lt
         ^    :             ###    p
         .                  ###..>lu
         .                  ###    t
         s                  ###..>ls
    4"control"4             ^ ^    :
                            . .
                            . .
                            s s
                        4"control"4

0"Controlled swap:"

    l
    ^
    .
    .
s..>M..>l
    #
s..>#..>l
    ^
    .
    .
    s

0"These muxes are optional for convenience, notation or compactness, you can"
0"also instead make them with AND and OR gates or from NAND gates only."

0"## Interactive terminal (VTE)"

3"T: Interactive multiline terminal (7-bit ASCII)"

0"A rectangular grid of T with extenders # forms an interactive terminal. When"
0"rendered, it shows it as a black screen on which arbitrary characters can"
0"appear, even in text mode. So you have to view the source code with the"
0"'edit' button to see how this one is made."

0"It can have different functions: ASCII keyboard, screen, both, or decimal"
0"input/display"

0"With only inputs, it acts as a screen that can read 7-bit ASCII codes from"
0"any circuit inputs:"

T######C<...p3"read"
#######
#######
#######
^^^^^^^
|||||||
SsssssS3"ASCII code in to screen"


0"With only outputs, it acts as a buffered keyboard. You can type at any time,"
0"it remembers all keystrokes, and they can be read one by one by enabling the"
0"'out' bit. If the blinking cursor is not present, click it with the mouse"
0"first, then type with your real keyboard. When there are no further typed"
0"characters to output, the eof bit will be enabled when out goes high NOTE:"
0"this configuration represents a keyboard, not a screen, but you still see a"
0"little screen rendered anyway, this is only present to show the blinking"
0"cursor and some characters to show it noticed your typing."


         lllllll3"keyboard ASCII code out"
         ^^^^^^^
         |||||||
         T######c<--p0"out"
         #######c-->l0"EOF"
         #######

0"If you give the VTE both inputs and outputs, it acts as both a screen and a"
0"buffered keyboard. The screen shows both typed characters and characters read"
0"from the circuit. It will only output typed characters to the circuit. If the"
0"blinking cursor is not in here but in the other one, click it with the mouse"
0"to focus this one:"

          lllllll3"keyboard ASCII code out"0
          ^^^^^^^
          |||||||
         T#######C<--p0"read from in to screen"0
         ########c<--p0"out"
         ########c-->l0"EOF"
         ########
         ########
          ^^^^^^^
          |||||||
          SsssssS"ASCII code in to screen"0

0"The terminal can also have an 'enable' input 'y', in that case the read and write"
0"signals only work while enable is true."

          lllllll3"keyboard ASCII code out"0
          ^^^^^^^
          |||||||
         T#######y<--s0"enable"
         ########C<--p0"read from in to screen"0
         ########c<--p0"out"
         ########c-->l0"EOF"
         ########
          ^^^^^^^
          |||||||
          SsssssS"ASCII code in to screen"0

0"The screen also supports unicode rather than just ASCII. ASCII is a 7-bit code,"
0"but Unicode is a 21-bit code including international characters, emoji, ..."

0"How it gets displayed may depend on your webbrowser and installed fonts, if"
0"the code given below (smiley emoji) doesn't work, try lower valued codes."

0"Values translate directly from hex unicode codepoints which you can look up"
0"online, every 4 bits from the switches below correspond to a hex digit, e.g."
0"unicode U+1F600 is binary 0 0001 1111 0110 0000 0000"

     T####################C<p
     #####################
     #####################
     ^^^^^^^^^^^^^^^^^^^^^
     ssssSSSSSsSSsssssssss
 1"21 bits Unicode code point"

0"Note that the terminal has some inputs/outputs without letters, and some with"
0"letters:, as follows:"

0"- y: enable: if present and not enabled, disables the inputs below."
0"- C: read or in, to screen"
0"- c: write or out, from keyboard (only user-typed characters)"
0"- c output: EOF signal, from keyboard"

0"With only inputs and no read/out flags, it will instead show the binary input"
0"in decimal."

         T#######3"decimal"0 T
         ^^^^^^^^            ^
         ||||||||            |
         sSsssssS3"binary"0  s

0"Place a 1 next to a decimal display terminal to show signed output (twos"
0"complement)"

        1T#######3"decimal, signed"0
         ^^^^^^^^
         ||||||||
         Ssssssss3"binary, twos complement"0

0"Place a 2 next to a decimal display terminal to show floating point output"
0"input bits interpreted as floating point with sign, exponent, mantissa). These"
0"behave like the floating point values used in typical computers, including the"
0"NaN (not a number) and Infinity behavior."

        2T#######3"decimal, signed"0
         ^^^^^^^^
         ||||||||
         Ssssssss3"binary, 8-bit float"0
        "seeemmmm"

0"It's also possible to separate the sign, exponent and mantissa into groups to"
0"create arbitrary floating point types. Up to 64-bit float is supported, no"
0"matter whether split like this or not. If not split into groups like this,"
0"then the amount of exponent bits is computed automatically in a way that"
0"matches the exponent sizes of floats in typical computers for known power of"
0"two sizes, and in-between for other sizes."

        2T##########
         ^ ^^^^ ^^^^
         | |||| ||||
         S ssss ssss
        "s eeee mmmm"

0"The decimal display also supports passing through the input value:"

         llllllll
         ^^^^^^^^
         ||||||||
         T#######
         ^^^^^^^^
         ||||||||
         sSsssssS

0"With only outputs and no read/out flags, it will instead convert typed"
0"decimal value to binary, if the number parses as a valid decimal number."
0"Place cursor in here with mouse, then type a number. Letters don't work,"
0"but a minus sign, and prefix 0x for hex, work. Negative numbers will use"
0"twos complement binary output."

         llllllll
         ^^^^^^^^
         T#######

0"This, too, supports signed and floating point:"

         llllllll
         ^^^^^^^^
        1T#######

        "seeemmmm"
         llllllll
         ^^^^^^^^
        2T#######

0"With the following configurations, the terminal works instead as a decimal"
0"counter, with optional features such as reset, down count, and set from data"

0"For counters, y, c, C, q and Q have the meanings indicated."

llllllll         llllllll           llllllll
^^^^^^^^         ^^^^^^^^           ^^^^^^^^
T#######c<p0"up" T#######c<p0"up"   T#######c<p0"up"
                 ########Q<p0"reset"########Q<p0"reset"
                                    ########C<p0"down"

llllllll         llllllll           llllllll
^^^^^^^^         ^^^^^^^^           ^^^^^^^^
T#######q<p0"set"T#######c<p0"up"   T#######y<s0"enable"
^^^^^^^^         ########q<p0"set"  ########c<p0"up"
ssssssss         ^^^^^^^^           ########C<p0"down"
                 ssssssss           ########q<p0"set"
                                    ########Q<p0"reset"
                                    ^^^^^^^^
                                    ssssssss

0"For these counter-configurations, the special input flags use the following"
0"characters:"

0"- y: enable"
0"- c: count up"
0"- C: count down"
0"- q: set to input value "
0"- Q: reset counter to 0"

0"NOTE: c and C have different meaning for counter and keyboard/screen. It is"
0"not possible to make a counter with only C (down count but no up count or q/Q)"
0"because with only a C it acts like a screen instead where the C input displays"
0"a character. But a counter only counting up, with a single c, works, because"
0"a keyboard, which also uses c, also must have a c output for the EOF flag,"
0"and that's how such counter and keyboard can be distinguished."
0"And without any such special inputs at all, it'll act as a decimal display or"
0"decimal keyboard."

0"## ALU (Arithmetic Logic Unit)"

3"U: ALU"

0"The ALU is a built-in component that can do various mathematical operations"
0"in binary. This takes away the fun of building mathematical operations from"
0"logic gates, but can be useful to save space in higher level designs."


0"2-input operation example: 8-bit adder"

            T#######
            ^^^^^^^^
            llllllll
            ^^^^^^^^
 l<U16##############<s
   ^^^^^^^^ ^^^^^^^^
   ssssssss ssssssss
  " ...8421  ...8421"
  "       A        B"

0"1-input operation example: 8-bit increment"

   T#######
   ^^^^^^^^
   llllllll
   ^^^^^^^^
 l<U24#####<s
   ^^^^^^^^
   ssssssss
  " ...8421"
  "       A"

0"2-input example with different sizes: controlled bit invert using xor:"

   T#######
   ^^^^^^^^
   llllllll
   ^^^^^^^^
   U6##########
   ^^^^^^^^   ^
   ssssssss   s
  " ...8421   1"
  "       A   B"

0"3-input operation example: multiply values modulo a third value"

                     T#######
                     ^^^^^^^^
                     llllllll
                     ^^^^^^^^
 l<U18#######################<s
   ^^^^^^^^ ^^^^^^^^ ^^^^^^^^
   ssssssss ssssssss ssssssss
  " ...8421  ...8421  ...8421"
  "       A        B        C"

0"The top side is the output. The button side contains the input(s). The"
0"left and right side are optional and contain special flag bits, the input"
0"bit is carry (only used for a few operations, such as add). The output bit"
0"is overflow (can serve as carry if the amount of output bits is set up"
0"correctly) or error (e.g. logarithm of 0 or division through 0) depending"
0"on the operation."

0"The configuration can be rotated or mirrored, and the optional flag input or"
0"output side can be left out, but the main input side always must be on the"
0"opposite side of the main output side, and there always must be 1 main output"
0"side and a side with 1 or 2 main inputs."

0"The numeric code tells the operation. Without number, it has the value matching"
0"the unsigned operation 'add'."

0"The operations are (note that there are a few gaps, not all numbers are used"
0"for an operation):"

0"* bitwise operators: "
 0"(unsigned: 0..15, signed: 128..143, float: 256..271) "
 0"0:zero, 1:and, 2:nimply b, 3:a, 4:nimply a, 5:b, 6:xor, 7:or,"
 0"8:nor, 9:xnor, 10:not b, 11:imply a, 12:not a, 13:imply b, 14:nand, 15:ones"

0"* for floating point, these operators are replaced with float-specific type conversions, roundings & constants:"
 0"NOTE: you must add 256 to these values to use the op as float (see further), but we show the base operation values here."
 0"0:from uint, 1:to uint, 2:from int, 3:to int,"
 0"4:scaled from uint, 5:scaled to uint, 6:scaled from int, 7:scaled to int,"
 0"8:floor, 9:ceil, 10:round b, 11:truncate,"
 0"12:get raw exponent, 13:get raw mantissa, 14:pi, 15:e"

0"* elementary 2-input operators:"
 0"(unsigned: 16..23, signed: 144..151, float: 272..279)"
 0"16:add, 17:sub, 18:mul, 19:div, 20:remainder, 21:floored div, 22:modulo, 23:clmul"

0"* elementary 1-input operators (sign also supports optional 2-input):"
 0"(unsigned: 24..31, signed: 152..159, float: 280..287)"
 0"24:increment, 25:decrement, 26:negate, 27:abs, 28:sign/copysign"
 0"31:identity (for float, can change from one precision to another)"

0"* comparisons:"
 0"(unsigned: 32..39, signed: 160..167, float: 288..295)"
 0"32:==, 33:<, 34:<=, 35:!=, 36:>=, 37:>, 38:min, 39:max"

0"* shift operations:"
 0"(unsigned: 40..47, signed: 168..175, float: 296..303)"
 0"40:lshift, 41:rshift, 42:rot lshift, 43:rot rshift"

0"* higher operations (NOTE: some differ in type with 1 or 2 inputs):"
 0"(unsigned: 47..55, signed: 176..183, float: 304..311)"
 0"48:power, 49:log2/integer log, 50:sqrt/integer root"
 0"54:binary to BCD/base, 55:BCD/base to binary"

0"* number theory ops (in addition, regular pow/mul/add with 3 inputs work modular):"
 0"(unsigned: 56..63, signed: 184..191, float: 312..319)"
 0"56:modular inverse, 57:gcd, 58:lcm, 59:factorial, 60:binomial, 61:perfectpow"

0"* expensive number theory ops:"
 0"(unsigned: 64..71, signed: 192..199, float: 320..327)"
 0"64:isprime, 65:nextprime, 66:prevprime,"
 0"67:factorize, 68:discrete log, 69:quadratic residue, 70:euler totient"

0"* bit ops:"
 0"(unsigned: 72..79, signed: 200..207, float: 328..335)"
 0"72:count leading zeroes (clz), 73:count trailing zeroes (ctz),74:popcount"
 0"76:PEXT, 77:PDEP"

0"* transcendental functions (for integer, inputs/outputs scaled to make period/range match int range):"
 0"(unsigned: 80..87, signed: 208..215, float: 336..343)"
 0"80:sine, 81:arcsine, 82:cosine, 83:arccosine, 84:tangent, 85:arctangent/atan2, 86:ln, 87:exp"

0"* time related + random:"
 0"(unsigned: 88..95, signed: 216..223, float: 344..351)"
 0"88:unix time in seconds, 89:unix time to Y-M-D h:m:s, 90: Y-M-D h:m:s to unix time"
 0"95: random (0, 1 or 2 inputs, side-input toggles change)"

0"* bit permutation operations:"
 0"(unsigned: 96..103, signed: 224..231, float: 352..359)"
 0"96:mirror bits, 97:bit reversal, 98:perfect shuffle, 99:perfect unshuffle"
 0"100:GRP, 101:UNGRP"

0"* special functions (most float-only):"
 0"(unsigned: 104..111, signed: 232..239, float: 360..367)"
 0"104:gamma,105:loggamma,106:lambertw,107:besselj"
 0"108:erf/erfc"


0"Adding 128 to the number makes the operation signed, e.g. operation 19 is"
0"unsigned division, and operation 147 is signed division. Signed operations"
0"use twos complements"

0"Adding 256 to the number makes the operation floating, e.g. operation 19 is"
0"integer division, and operation 275 is floating point division. For floating"
0"point data, you can choose to use a single bit group for the input/output, or"
0"split it in three groups: mantissa, exponent and sign. The same bit encoding as"
0"in real CPUs is used for these floating point values."

0"For the case of floating point arithmetic, not all operations are supported,"
0"such as the bitwise, integer number theoretic, base conversion and time related"
0"ones. On the other hand, operations like sin, tan, ln work more as expected."
0"Use the floating point ALU in combination with floating point terminal input"
0"and output for easy of use. See also the description of decimal display terminal"
0"higher up in this tutorial for info about how the inputs and outputs work for"
0"floating point (amount of exponent bits, ...). Examples are further below."

0"If no number is added to the ALU, it will default to operation number 16 'add'"

  llll
  ^^^^
l<U########<s
  ^^^^ ^^^^
  ssss ssss

0"single-input operators such as abs or popcount will use operand A and ignore"
0"operand B. Some other operations, such as sign and sqrt, can optionally take"
0" a second argument."

0"Not all operators use the flag input or flag output bit. It's not required to"
0"add them in the circuit and it's ok (not an error) to add them even if the"
0"operation doesn't use them."

0"The ALU can have as many input and output bits as you want, but depending on"
0"the version of your browser, values with more than 31 bits will not work."
0"Browsers since around 2019, supporting BigInt, will support practically any"
0"bit size."

0"Example: the integer power operation with 16-bit inputs and 32-bit output:"

   "                             A^B"
   T################################
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   lllllllllllllllllllllllllllllllll
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |||||||||||||||||||||||||||||||||
 l<U48##############################<s
   ^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^
   |||||||||||||||| ||||||||||||||||
   T############### T###############
   ^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^
   ssssssssssssssss ssssssssssssssss
  "         ...8421          ...8421"
  "               A                B"

0"Example: multiply with 16-bit inputs and 32-bit output:"

   "                             A*B"
   T################################
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   lllllllllllllllllllllllllllllllll
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |||||||||||||||||||||||||||||||||
 l<U18##############################<s
   ^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^
   |||||||||||||||| ||||||||||||||||
   T############### T###############
   ^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^
   ssssssssssssssss ssssssssssssssss
  "         ...8421          ...8421"
  "               A                B"

0"Example: 32-bit floating point sine"

2T###############################
 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 U336############################
 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2T###############################

0"Example: 32-bit floating point power"

2T#################################
 ^ ^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^
 U304##################################################################
 ^ ^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^  ^ ^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^
2T################################# 2T#################################


0"Some operators can have different effect depending on the amount of inputs"
0"or support 3 inputs. For example the power operator supports 3 inputs, and"
0"then acts as modular exponentiation: power modulo the third argument, e.g."
0"power modulo the prime 37:"

  T#########################
  ^^^^^^^^^^^^^^^^^^^^^^^^^^
  llllllllllllllllllllllllll
  ^^^^^^^^^^^^^^^^^^^^^^^^^^
l<U48#######################<s
  ^^^^^^^^ ^^^^^^^^ ^^^^^^^^
  T####### T####### T#######
  ^^^^^^^^ ^^^^^^^^ ^^^^^^^^
  ssssssss ssssssss ssSssSsS


0"## ALU with operation select"

0"An ALU can also have an operation-select input. For example the following ALU"
0"allows to select between add, sub, mul, div."


           llllllll
           ^^^^^^^^
           ||||||||
l<#################<s  0"carry in"
  #################  :
  #################<s10" 0=add, 1=sub, 2=mul, 3=div"
  U16##############<s2
  ^^^^^^^^ ^^^^^^^^  :
  ssssssss ssssssss
 " ...8421  ...8421"

0"The operation-select input is optional and should be on the same side as"
0"where the optional carry input can be located. It's possible to have both"
0"carry and operation select, as in the example above. If this side has only"
0"one input, then it's treated as carry if it has 1 bit, or as operation select"
0"if it has multiple bits. The carry bit is on the LSB side of the operation"
0"select and there must be a gap between the carry bit and op select bits."



0"## Random generator"

3"?: random generator"

0"The random generator will change to a random value on any positive edge of"
0"the input and have a random initial value."

?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l

s..>?..>l

R..>?..>l
2


0"To react to both positive and negative edge, it can be given a regular and"
0"inverted input:"

   ....           ....           ....
   .  w           .  w        2  .  w
s....>?..>l    p....>?..>l    r....>?..>l



0"## One-hot detector"

3"h: one-hot detector"
3"H: inverted one-hot detector"

0"h and H represent a one-hot detector and inverted one-hot detector. These"
0"are the 'real' XOR gates: the one-hot detector only outputs 1 if there is"
0"exactly 1 input enabled. However, this is not the behavior that cascading"
0"multiple XOR gates does, and more expensive to implement from primitive"
0"gates, so this is not considered an as primitive building block as the 'e'"
0"XOR gate is. For 2 inputs, h and H behave the same as e and E."
0"The inverted one-hot gate has the opposite output value of the one-hot gate."
0"It is not a one-cold gate, for that, invert all the inputs of a one-hot gate."

s..>h..>l  s..>H..>l
    ^          ^
s....      s....


s-->h-->l  s-->H-->l
s-->#      s-->#
s-->#      s-->#
s-->#      s-->#




0"## Tri-state buffer (or open collector output)"

3"z: fake tri-state buffer (and-or)"
3"Z: fake tri-state buffer (or-and)"

0"z is a fake representation of a tristate buffer. It is fake because the"
0"simulation does not support three states. In real life, you can have states"
0"'low voltage', 'high voltage' and 'high impedance'. (Other names for high"
0"impedance are 'open', 'not connected', 'floating'). In the simulation, there"
0"is only zero and one. High impedance is treated the same as 0. Still, the"
0"tri-state buffer can be used as a representation of a real-life circuit"

0"As seen before, different components outputting to same wire normally gives"
0"error, and one solution is to OR them. An alternative solution here is to"
0"use tri-state buffers (or open collector outputs if you will)."

0"error expected" 0"ok"         0"ok"
s.....          s.....        s..>z...
     .               v               .
s.....          s...>o        s..>z...
     .               v               .
s.........>l    s...>o....>l  s..>z.......>l



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
    .
    .
    v
s..>z..>l

0"Multiple could output to some shared bus, each with a control of which only"
0"one should be active at the time, like this:"

     p
     v
 s..>z...
        .
     p  .
     v  .
 s..>z...
        .
     p  .
     v  .
 s..>z......>l


0"Capital Z does the opposite: it ORs its inputs and multiple get ANDed. This"
0"can be seen as: the output is high by default (instead of low like 'z'),"
0"but any fully zero Z will pull the output to 0. So the opposite of z."


0"To summarize z and Z:"

s....                      s....
    v                          v
s..>z..                    s..>a..
      .                          v
      .>l 1"corresponds to"      o>l
      .                          ^
s..>z..                    s..>a..
    ^                          ^
s....                      s....


s....                      s....
    v                          v
s..>Z..                    s..>o..
      .                          v
      .>l 1"corresponds to"      a>l
      .                          ^
s..>Z..                    s..>o..
    ^                          ^
s....                      s....


0"# SECTION VI: Parts for shortcuts and compactness"

0"These parts and behaviors are not necessary to make logic circuits, but can"
0"help make things more compact. Some are very useful all the time, others are"
0"included only for rare situations when they actually help make something more"
0"readable."

0"## Diagonal wires"

3"/: diagonal wire"
3"\\: diagonal wire"

0"NOTE: because backslash has special meaning in many programming language"
0"strings, ';' can be used as an alternative. It will still be rendered as \\"

      >l  l<
     /      ;
    /        ;
   /          ;
  /            ;
 s              s

0"## Diagonal inputs"

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
.      ^^^
s      . .
       s s


0"## Global wire"

3"g: global wire (backplane)"

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

  s---g17      71g-->lI17

  i17-->l    i17-->l    i17-->l

0"## Straight backplane connections ('antennas')"

3"(: 'antenna' east"
3"): 'antenna' west"
3"u: 'antenna' north"
3"n: 'antenna' south"

0"These are another form of 'backplane' wires, connected to the corresponding"
0"'dish' they're aimed at. Calling them 'antennas' or 'wireless' is just a"
0"metaphor. These provide another way to reduce clutter, and also provide a"
0"useful method for large wrap-around circuits."

         l             l
         ^             ^
         |             n
  s--(   |  )-->l
         |
  (--s   |  l<--)      u
         s             s

(   )
|   |         (--s     )-->l
|   v
s   l

0"Like the 'g' backplane wire, the antenna by default connects to all sides"
0"(except see further):"

   l          l
   ^          ^
s--(-->l  l<--)-->l
   v          v
   l          l

0"The antenna can also connect some non-wire-like connections, such as be"
0"in-between an input and a device (this with the standard rule, the limited"
0"exceptions above would not allow this)"


0"Antennas can be nested recursively:"

 s-(   s-(    )->l   )->l
"A     B         B      A"


0"If two antennas have only a 1-cell gap in-between, then that cell will not"
0"connect to the antennas nor inputs on sides, allowing to bridge a 1-cell gap:"

s--(l)-->l
    ^
    s

s-->e-->l
s--(#)->l
s-->#

0"When marking a group of antennas with 0's as shown below, the antenna gets"
0"different very specific special rules for wrap-around connections. Those"
0"are too detailed to explain in this tutorial, but the goal of the rules is"
0"that you can make wrap-around circuits including diagonal connections like"
0"this:"

  0nnnnnnnnn0
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
  0uuuuuuuuu0


0"The antenna with 0 for wrap-around behaves differently than without the 0,"
0"instead of acting as one single all-connecting wire, different input/output"
0"directions act independently:"

          l
          ^
   0      |
 s-(-s l<-)->l
   |      0
   s

0"It also allows, unlike the regular antenna, to separate an input from the"
0"device it inputs too, again useful to split up a large repetitive wrap-around"
0"circuit:"

 s--->(    )l


0"## Bus"

3"=: bus"

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



0"## Automatic numbering for bus and global wire"

3"$: automatic numbering"

0"Instead of manually giving each connection of a bus (or a bundle of global wires)"
0"a unique number, you can use $ to automatically number:"


0"Without automatic numbering:"

              llllllllllll
              ^^^^^^^^^^^^
              ||||||||||||
              012345678901
              000000000011
==========================
000000000011
012345678901
||||||||||||
ssssssssssss

0"With automatic numbering:"

              llllllllllll
              ^^^^^^^^^^^^
              ||||||||||||
              0$$$$$$$$$$$
==========================
0$$$$$$$$$$$
||||||||||||
ssssssssssss

0"Global wires example:"

llllllllllll
^^^^^^^^^^^^
||||||||||||
4$$$$$$$$$$$
gggggggggggg

gggggggggggg
4$$$$$$$$$$$
||||||||||||
ssssssssssss

0"The automatic numbering creates different groups for different starting digits:"

              llll llll
              ^^^^ ^^^^
              |||| ||||
              0$$$ 1$$$
=======================
0$$$ 1$$$
|||| ||||
ssss ssss

0"The connections with '$' don't just increment from the starting digit, they"
0"have unique codes that don't collide with existing numbers. E.g. the $ next"
0"to the '0' does not have value '1' but some unique hidden value that matches"
0"the other '$' next to '0'"

0"The $ connection's value is based on the distance from the digit, allowing"
0"mirroring bits like this:"

lllllllllllllll
^^^^^^^^^^^^^^^
|||||||||||||||
$$$$$$$$$$$$$$0
===============
0$$$$$$$$$$$$$$
|||||||||||||||
sssssssssssssss

0"They work vertically as well:"


          lllll
          ^^^^^
          |||||
          0$$$$
          =====
            =
            =
s---0=      =       =0-->l
s---$=      =       =$-->l
s---$================$-->l
s---$=      =       =$-->l
s---$=      =       =$-->l
            =
            =
          =====
          0$$$$
          |||||
          vvvvv
          lllll

0"If there is no digit present, they form another unique group, different from group 0."
0"Since there is no digit to indicate beginning or end of these, left and top always"
0"match (no mirroring possible with these):"

              llll llll
              ^^^^ ^^^^
              |||| ||||
              0$$$ $$$$
=======================
0$$$ $$$$
|||| ||||
ssss ssss


0"Using numbers larger than 9 as starting value can be done as follows, e.g."
0"for value 105 here:"


              llll
              ^^^^
              ||||
              1$$$
              0===
    ===1======5===
    ===0
    $$$5
    ||||
    Ssss


0"The number itself will match numbers without $, and groups of different size"
0"but same number will still match:"

llll ll  l
^^^^ ^^  ^
|||| ||  |
7$$$ 7$  7
==========
7$$$
||||
ssss

0"Different groups can also be placed next to each other, and parse correctly"
0"(left to right or right to left) even when mirrored:"

 "HGFEDCBA"
  llllllll
  ^^^^^^^^
  ||||||||
  $$$2$$$1
  ========
  1$$$2$$$
  ||||||||
  ssssssss
 "ABCDEFGH"

 "EFGHABCD"
  llllllll
  ^^^^^^^^
  ||||||||
  2$$$1$$$
  ========
  1$$$2$$$
  ||||||||
  ssssssss
 "ABCDEFGH"

0"NOTE: the automatic numbering only works for consecutive connections that"
0"touch each other, no gaps in between. Each gap restarts the count and would"
0"also disconnect a group of $ from the intended number. If you need inputs"
0"or outputs of the bus to be more spread around, you have to resort to"
0"individual numbers without $. An $ can never match any regular number."


0"Only such consecutive horizontal and vertical groups, for global wires or"
0"buses, with no digit or a single number, work. Other shapes, mixing multiple"
0"numbers or using '$' for other devices (timer timings, ...) do not work,"
0"doing this may result in unspecified behavior. As an example, the numeric"
0"values of $ will be arbitrarily computed numbers that could be very large"
0"or could be negative (their only feature is being unique and distinct from"
0"actual real numbers entered with digits, the actual value does not matter),"
0"so they cannot work for timer values. And the computation is done either"
0"horizontally or vertically, if both are possible due to a non-linear shape,"
0"it's not specified which direction it will choose."



0"## Non-interacting wire corner"

3",: non-interacting wire corner"

0"This is a corners or split that can be more closely packed than .. They"
0"interact with other wires, but not with their own kind."

                     ll
                     ^^
l<---,,--->l         ||
     ||         l<---,,--->l
     ||              ||
     ||              ||
     ss              ss

0"## Double corners"

3"%: NW plus SE corner"
3"&: NE plus SW corner"

0"These corners work independently on both sides"

      l             l
      ^             ^
      |             |
      |             |
  s---%--->l    l<--&---s
      |             |
      |             |
      s             s

0"## A few more notes about / \\ and x"

0"Diagonal wires themselves can also act as a wire crossing due to connecting"
0"to corners:"


 l    l
 ^    ^
  ;  /
   ;/
   /;
  /  ;
 s    s

0"Even though x, / and \\ can interact with . diagonally,"
0".'s still don't interact diagonally with each other, so no output possible"
0"here:"

   .>l 0"no output"
  .
 .
 s

0"x does not interact with +, |, -, so no output possible here:"


1"no output"
    lllll
    ^^^^^
    |||||
     xxx
      |
      s

0"## 8-way wire crossing"

3"*: 8-way wire crossing"

0"the * is a wire crossing that works both straight and diagonally, giving it 8"
0"connection points and 4 independent signals:"

     l
  s  ^  l
   ; | ^
    ;|/
  s--*-->l
    /|;
   / | v
  s  |  l
     s


0"## Device inputs connecting to multiple wires"

0"Device inputs > < ^ v ] [ m w output on exactly one side, but can receive"
0"their input from any of the other sides (3 direct neighbors, and 4 more from x)"

                                     s
s---v            >l     s--. >l       ;l<
    l      s-----.          x          x
                 >l     s--. >l       /l<
                                     s

0"Normally you connect 1 wire to 1 input side of a device input. It is possible"
0"to connect multiple, everything attached to the multiple input sides is"
0"connected together as 1 wire, so the signal passes through"

s---v----v----v---->l
    l    l    l

0"Connecting outputs from different devices to the same device input gives an"
0"error. This is the same rule as seen earlier that you cannot connect outputs"
0"from different devices to a single wire"

s--v--s 0"error expected"
   l

0"## Multi device input"

3"V: regular multi device input"
3"W: inverted multi device input"

0"These are normal and inverted device/gate inputs outputting to multiple sides"
0"they connect to each other and wires, and output to all devices, no matter"
0"what direction. They do not interact with other gate input types"

       l  l
s------VV-VWl
       l  l

0"## Device input crossing"

3"X: regular device input crossing (8-directional)"
3"Y: inverted device input crossing (8-directional)"

0"These are a combination of wire crossing and normal or inverted device input"


  l       l       s---->o--------->l
 lX-s    lY-s     s-----Xe-------->l
  |       |       s-----+Xa------->l
  s       s             ||^
                        sss

0"X and Y also work diagonally. So can serve also as simple diagonal device"
0"inputs"

s     s              l      s s s  s s s
 ;     ;            X        ;|/    ;|/
  X     Y     s----.          X      Y
   l     l          X        lll    lll
                     l

0"NOTE: the diagonal usage of ^ seen earler above is also a type of wire"
0"crossing input, and the diagonal ^ is a nicer looking style than what you can"
0"make with X and can be a bit more compact."

0"NOTE: view this circuit in graphical instead of text mode with the dropdown"
0"to see better what exactly the input is connecting to above."

0"X and Y can also work as a regular wire crossing, in fact it does the same as"
0"'*' in that case. That's just a side effect, not their main use case."

l   l   l
 ^  ^  ^
  ; | /
   ;|/
s---X-->l
   /|;
  / | ;
 /  |  ;
s   s   s

0"## Integrated circuits diagonal inputs/outputs"

0"Chips, too, can have diagonal inputs and outputs:"
0"For the definition, x from s as inputs, and X to l as outputs"
0"For the usages, X to the chip as its inputs, x from the chip as outputs"

   s  s  s  l
    ; | /  X               s s s >l
     vvv  .                . | ./
     e###>O                 XvX/
  s->#I9#-->l              s>i9-->l
     ####                   X^X
     ^^^                   . | .
    / | ;                  s s s
   s  s  s

0"# SECTION VII: Comment Styles"

0"Comments can have a number outside the quotes to affect styles."
0"View the source of this circuit to see how this works in code."
0"It is typed in the code for example as follows for number 0, but with a"
0"double quote instead of two single quotes on each side:"

3"0''formatted comment''"

0"The numeric styles do the following (styles not actually shown, see table below for that):"

0"formatted text styles: those support a few markdown features, described further below"
3"0: left aligned formatted text"
3"1: center aligned formatted text"
3"2: right aligned formatted text"

0"narrow fixed width text: like full width, but narrower (monospace)."
3"3: left aligned narrow fixed width text"
3"4: center aligned narrow fixed width text"
3"5: right aligned narrow fixed width text"

0"full width text: this has the same width as a circuit element per character (wide fixed width)"
3"6: full width text, shifted left a bit"
3"7: standard full width text, same as not using any number at all"
3"8: full width text, shifted right a bit"

0"hidden text: source-code only comments, will not show up when rendering the circuit"
3"9: hidden text, source-code only comment"

0"The formatted text styles support a small subset of markdown features:"
3"# : main chapter (heading 1)"
3"## : sub-chapter (heading 2)"
3"### : sub-sub-chapter (heading 3)"
3"- : bullet list item (indentation not supported)"
3"* : bullet list item (same as -)"
3"___: horizontal rule"

0"NOTE: numbers placed left or right of a quote will be used for the text style"
0"and take priority over other uses of numbers (see further). Do not place a quote"
0"next to a number intended to affect something else. Numbers above or below a"
0"quote are fine. Numbers can be shared amongst multiple strings though."

0"For these, the # or - must come directly after the opening quote, and there"
0"must be a space after the special symbol. Note that this will remove or"
0"replace this original special symbol character, so you can't use the"
0"formatted text to represent a - or # at the start with a space after it."

0"The full width and narrow fixed width styles do not interpret any characters as markdown,"
0"and so will keep the # as-is"

0"NOTE: other markdown features, such as bold and italic, are currently not supported."

0"Below the different types of alignment and style are shown in a table. The"
0"first column indicates whether any number or # is present. The second column"
0"shows the actual formatted text. View the source code in the editor to really"
0"see how it's made. The 'v' symbols indicate where the quotes are located and"
0"the '0' symbol where possibly a number is located. The text may look much"
0"narrower than the table (except for full width text), but in the source code"
0"the full width of the table is taken up by the text, quotes and numbers in"
0"each case."


         "0v           v"
.--------.--------------.
|0"     "| "hello world"| 0"full width text (best for circuit labels)"
.--------.--------------.
|0"0    "|0"hello world"| 0"formatted left aligned (best for long text)"
.--------.--------------.
|0"1    "|1"hello world"| 0"formatted center aligned"
.--------.--------------.
|0"2    "|2"hello world"| 0"formatted right aligned"
.--------.--------------.
|0"3    "|3"hello world"| 0"narrow fixed width left aligned (best for ASCII art)"
.--------.--------------.
|0"4    "|4"hello world"| 0"narrow fixed width center aligned"
.--------.--------------.
|0"5    "|5"hello world"| 0"narrow fixed width right aligned"
.--------.--------------.
|0"6    "|6"hello world"| 0"full width shifted left (starts at quote/number)"
.--------.--------------.
|0"7    "|7"hello world"| 0"standard full width, same as no number"
.--------.--------------.
|0"8    "|8"hello world"| 0"full width shifted right (ends at quote/number)"
.--------.--------------.
|0"9    "|9"hello world"| 0"hidden source-code only comment"
.--------.--------------.
|0"0 #  "|0"# head H1  "| 0"chapter (heading 1)"
.--------.--------------.
|0"0 ## "|0"## head H2 "| 0"sub-chapter (heading 2)"
.--------.--------------.
|0"0 ###"|0"### head H3"| 0"sub-sub-chapter (heading 3)"
.--------.--------------.
|0"0 -  "|0"- bullet   "| 0"bullet list item"
.--------.--------------.
|0"0 *  "|0"* bullet   "| 0"bullet list item (same as with -)"
.--------.--------------.

0"Horizontal rule:"
0"___"

0"Fixed width text will not use markdown, unless a narrow width and a formatted"
0"number are combined"

          0v          v0
+--------+--------------+----+
|0"3 #  "|3"# no head." |2" "| 0"displays the #"
+--------+--------------+----+
|0"3 #  "|3"# heading "0|2"0"| 0"interprets the #"
+--------+--------------+----+
|0"3 -  "|3"- dash    " |2" "| 0"displays the -"
+--------+--------------+----+
|0"3 -  "|3"- bullet  "0|2"0"| 0"interprets the -"
+--------+--------------+----+

0"NOTE: The color and background color of the text is determined by the chosen"
0"rendering color scheme (light, dark, ...). In some schemes, text may have a"
0"subtle background color. This is applied only for fixed width (narrow or"
0"full width) text, not for formatted text. This is intended to make the text"
0"distinguishable from circuits. Formatted text already looks different enough"
0"on its own. Full width text will not have a background color behind spaces"
0"while narrow fixed width text will have it also behind spaces. This allows"
0"full width text to only have that color where actual characters are placed"
0"to indicate inputs/outputs and such, while for narrow width text this would"
0"not look good and instead its background color can serve to show a"
0"rectangular area in which ASCII art or code is drawn."


0"## Vertical comments"

3"colon: vertical comment"

0"Vertical comments can alternatively be made with a colon above and below. This"
0"doesn't support formatting, only the full width circuit style:"

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

0"A number above the first or below the last colon can affect style, but this"
0"supports less options than horizontal strings and no alignment options."

  0     3     6     9
  :     :     :     :
  s     s     s     s
  t     t     t     t
  y     y     y     y
  l     l     l     l
  e     e     e     e

  0     3     6     9
  :     :     :     :

0"Note: It's safe to use a colon in a horizontal comment, but you can't use a"
0"quote in a vertical comment, it'll be used to comment a line horizontally."


0"# SECTION VIII: Command Words"


0"## Force modes and settings, insert tables and links"

0"Some specific command words in strings make things happen. They all use a"
0"keyword and a colon. They are demonstrated below, but with a semicolon so"
0"that they don't perform the actual effect. Replace the semicolon with a colon"
0"to make them work for real."

3"MODE;immediate    : force immediate mode                                            "
3"MODE;electron     : force electron mode                                             "
3"RENDER;graphical  : force graphics mode rendering (canvas)                          "
3"RENDER;text       : force text mode rendering (ascii)                               "
3"RENDER;source     : force source mode rendering (literal ascii)                     "
3"INSERT;toc        : inserts a table of contents to chapters in this circuit.        "
3"                    Clicking a link will scroll towards that chapter title. Chapter "
3"                    titles are made with markdown as explained earlier.             "
3"INSERT;toc1       : Similar to toc but only shows heading 1 chapters                "
3"INSERT;toc2       : Similar to toc but only shows up to heading 2 chapters          "
3"INSERT;toc3       : Same as toc since it shows up to heading 3 chapters, the maximum"
3"INSERT;links      : inserts a table of links to all built-in circuits. The links    "
3"                    will open the clicked circuit and thus close the current one.   "
3"INSERT;links_help : similar to links, but only the subset of help articles.         "
3"INSERT;links_main : similar to links, but leaves out most help articles.            "
3"INSERT;link:id    : inserts a link to a single built-in circuit, by name (link-id)  "
3"TITLE;...         : use this as title or name for the circuit. The word TITLE       "
3"                    must touch a quote and the title is parsed up to the            "
3"                    ending quote. This title can show up e.g. in the browser        "
3"                    window titlebar and the circuit menubar. It may also be         "
3"                    ignored depending on the rendering. Built-in circuits don't     "
3"                    need this since they get their title in a different way.        "

0"NOTE: the multiline  'INSERT' items will take up a lot of vertical space and"
0"will automatically modify the circuit, inserting as many newlines as the TOC"
0"or list is long. This will break the flow of circuits that cross the line on"
0"which the INSERT item is located. Consider the line on which INSERT is placed"
0"a no-go zone for anything else. You do not need to add the vertical space"
0"yourself."

0"Example of a link, it links back to this article itself:"

0"INSERT:link:editing"

0"Example of a table of contents (toc), those links scroll the page to the chapter title:"

0"INSERT:toc"

0"# Epilogue"

0"This concludes the editing help, and showed most of the different"
0"behaviors of different cells and parts."

0"LogicEmu. Copyright (C) 2018-2020 by Lode Vandevenne"
`, 'editing');


registerCircuit('ASCII symbol summary', `
0"Summary of characters. See the other tutorials for the full explanation."

0"# Basic"

3"(space): isolator"
3"(newline): next line of the 2D drawing"
3"(quote): comment"

3".: wire, wire split, wire corner"
3"-|: straight wires"
3"+: wire crossing"

3"^>v<: device/gate inputs"
3"m]w[: inverted device/gate inputs"

3"l: LED, lamp or light (output)"
3"sS: switch (input)"
3"pP: push button (input)"

3"a: AND gate"
3"o: OR gate"
3"e: XOR gate"
3"A: NAND gate"
3"O: NOR gate, NOT gate"
3"E: XNOR gate"

3"fF: constant off/on ('fixed')"
3"cC: counter (see also 'clock' meaning below)"

3"#: extend the surface area of devices"

0"# Extended"

3"cC: flip-flop clock"
3"jkdt: flip-flop inputs"
3"qQ: flip-flop outputs/asynch inputs"
3"y: flip-flop enable"

3"@: isolator"

3"/\\: diagonal wires"
3"x: diagonal wire crossing"
3"*: straight and diagonal wire crossing"
3",: wire corner that doesn't interact with itself"
3"&%: double wire corners"
3"g: global backplane wires"
3"=: bus (bundle of wires)"
3"()un: straight connected backplane wires, 'antennas'"
3"J: patch panel jack"

3"I: IC template"
3"i: IC instance"

3"VW: normal/inverted device inputs that work in 4 directions"
3"XY: normal/inverted wire crossing device input (works diagonally too)"

3"z: tri-state buffer"
3"Z: inverted tri-state buffer"
3"h: one-hot detector ('the real XOR')"
3"H: inverted one-hot detector"

3"D: dot matrix display, RGB LED, oscilloscope"
3"rR: real-time timer"
3"N: music note (speaker for audio/music/noise)"
3"K: kinetic, various misc output devices"
3"?: random bit generator"

3"bB: ROM/RAM bits"
3"M: MUX"
3"T: terminal (ASCII keyboard/screen)"
3"U: ALU (prebuilt mathematical operations)"

3"0123456789: modifiers: LED color, timer speed, bus/ic/global wire id"
3"$: automatic unique numbering for bus/global wire"

`, 'symbols');


registerCircuit('Editing Side Notes', `

0"A few extra side notes for editing"

0"# Interchangeable ASCII characters"

0"There are a few pairs of ASCII charcters that have the same or similar meaning:"

0"@ and ASCII space: both are isolator. @ is slightly different because it can"
0"connect IC templates while space ends them, and @ can be used as visual aid"
0"such as drawing a casing around a device"

0"ASCII backtick and ASCII double quote: the backtick will be replaced by"
0"double quotes, for text in circuits"
0"--> this helps with defining circuits in double quoted strings in"
0"    programming languages. Tip: use raw string literals when available."
0"--> the single quote does not have such meaning, the single quote can freely"
0"    be typed in comment texts as apostrophe."

0"; and \\ (ASCII backslash): the ; will be replaced by backslash in the"
0"circuit (but not inside comments)"
0"--> this helps with defining circuits in strings in programming languages."
0"    Tip: use raw string literals when available (but in JS \\ still has"
0"    special meaning in raw strings)."

0"# Style used in built-in circuits"

0"Most built-in circuits use a certain style that is not optimally compact but"
0"gives a consistent overall look. For the examples below, toggle between text"
0"and graphics rendering mode to see the graphical look."

0"For wires, mostly . is used, no - or |, forcing to have a 1-cell gap between"
0"neighbor wires. So no closely packed wires. The only exception is for ROM and"
0"Terminals and sometimes for multi-bit signals."

0"yes:"     0"no:"

s....>l   s---->l
          s---->l
s....>l   s---->l

s....>l

0"but, yes for ROM and other such large devices with grouped inputs/outputs:"

    lll
    ^^^
s-->BbB
s-->bBb
s-->bBB


0"Some of the 'compact shortcut' cells are avoided except in rare circumstances,"
0"in particular 'V', 'W', 'X', 'Y', '%', '&' and touching >^<v inputs from sides."
0"But as an exception, ^^^ is used for inputs of half adders and similar circuits."

0"yes:"       0"no:"       0"no:"

s..>a..>l     s.&>a..>l   s..>a..>l
   >            &+V          X
s..>e..>l     s..>e..>l   s..>e..>l

0"NOTE: the rightmost one with X looks fine, but the issue is X does not show"
0"the directionality, so does not work in the following tighter scenario:"

0"ok:"    0"wrong:"

s>a>l    s>a>l
 >        X
s>e>l    s>e>l


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
0"- 'a' can be almost anything, such as gates, except gate inputs"
0"- '|' and '-' can be gate inputs '^>v<m]w[' or wires '.' or 'x'"
0"- '@' may only be empty, or filler of large devices, or the middle"
0"   (diagonal) one of a ^^^ style gate input."

0"This with various exceptions for numbers, backplane wires, comments, etc..."
0"but this is the spirit of the idea."

0"The grid may shift in case of isolated or far apart devices."

0"yes:"            0"no:"

s>l                s.>l


s..>l              s...>l
          s..
            v
s..>a..>l   a>l    s...v
    ^       ^          a..>l
s....     s..      s...^


s..>d#q..>l        s..>dq..>l
    ###                ##
s..>c#Q..>l        s..>cQ..>l

0"This is just a principle followed in many built-in circuits. This turned out"
0"to make nicer looking circuits than trying to make everything as small as"
0"possible with compaction tricks. However, there's no need to follow this in"
0"your own editing."

0"# Editing in the Geany Text Editor"

0"Editing is best done in a good plain text editor that supports a fixed-width"
0"font, rectangular block selection and copypasting of such selections."

0"There are many editors that can do this, but here are some tips for"
0"Geany. Many of these will work in other editors too, there just may be"
0"different shortcuts and different edge case behaviors. Geany is based on"
0"scintilla so similar behaviors may work in other scintilla based editors like"
0"scite, notepad++, notepad2, code::blocks, etc... Another type of editor that"
0"might be useful instead, could be one designed for making 2D ASCII art"
0"drawings."

0"- Make sure to set a fixed width font. Geany is an editor for programming so"
0"  likely it already is by default. Without a fixed width font, characters will"
0"  not line up correctly below each other, and that is quite important since"
0"  circuits are 2-dimensional."
0"- Turn off line wrapping, only then you can see the 2D layout correctly."
0"- The insert key is useful. Normally the 'overwrite' mode of text editors is"
0"  rarely used, but for editing 2-dimensional diagrams it's awesome if you are"
0"  changing something in the middle: it allows to overwrite characters without"
0"  moving stuff to the right of your cursor. Unfortunately, backspace will"
0"  still move said stuff to the left so instead of backspace, use left arrow"
0"  then space to remove something to the left of the cursor. Also, if you have"
0"  no overwrite mode, then pressing delete after each keystroke will be needed"
0"  instead."
0"- CTRL+d duplicates a line, which is handy sometimes e.g. to make vertical"
0"  wires longer."
0"- If you have a circuit without any other circuitry to the left or right of"
0"  it, then copypasting it to another location above or below is quite easy:"
0"  just select it, copy (CTRL+C) and paste it on a different line (CTRL+V). So"
0"  copypasting circuits multiple times vertically is easy in any text editor is"
0"  easy."
0"- If you want to copypaste something horizontally, or something that is in"
0"  between some stuff on its left and/or right, then you need block selection,"
0"  to select the characters in the rectangle around the part you want to copy."
0"  For example if you want to copypaste only the middle or gate below but not"
0"  the and/xor gates left/right of it:"


      l      l      l
      ^      ^      ^
    s>a<s  s>o<s  s>e<s

0"If you use block selection as explained below, you can easily paste many"
0"instances of that or gate like so:"

  l     l     l     l     l     l     l     l
  ^     ^     ^     ^     ^     ^     ^     ^
s>o<s s>o<s s>o<s s>o<s s>o<s s>o<s s>o<s s>o<s

0"So how to do the block selection in geany:"

0"- To do it with arrow keys: first place the cursor in one corner of the"
0"  rectangle you want to select. Then hold down alt+shift and press the arrow"
0"  keys up/down and left/right to select a rectangle."
0"- To do it with the mouse: first place the cursor in one corner of the"
0"  rectangle you want to select. Then hold down ctrl+shift, or alt+shift"
0"  (depends on OS), and click the mouse to the other corner of the rectangle."
0"  Or hold down just ctrl, and drag the mouse to any rectangle shape."
0"- Now you have a rectangle selected. Press ctrl+c to copy it. Then place the"
0"  cursor where you want to paste it, and press ctrl+v there."
0"- Important: make sure the rectangle you selected has all characters filled."
0"  If there were lines that were not filled up to the end, fill them all up"
0"  with spaces first. Only then, when you paste the block, will all content to"
0"  the right of where you pasted shift by the same amount, which is very likely"
0"  what you want to not completely disaling other parts of the circuit."
0"- To easily get spaces to the right of everything, place the cursor somewhere"
0"  very far on the right (add spaces to 1 line for this if needed). Then use"
0"  mouse block selection and click elsewhere on the right to get a very long"
0"  cursor. Then type any letter, e.g. '@', to type a vertical wall of @ symbols"
0"  on the right. Everything to the left of them will be automatically filled"
0"  with spaces! Which makes editing of the 2D circuit much easier."
0"- You can also use the block selection as multicursor. Instead of a"
0"  rectangle, select a vertical line to get a long cursor. Then you can insert"
0"  multiple spaces, .'s, or any other character by typing it. Similarly using"
0"  the delete key deletes all characters to the right of the cursor, good for"
0"  selectively deleting a part of the circuit."
0"- If you paste a block, it will insert itself into all content below. So if"
0"  you have some circuitry below that you don't want affected, first add enough"
0"  newlines below where you will paste, only then paste."
0"- Don't use the backspace key with multicursor, instead use the delete key."
0"  The delete key guarantees it will delete one character on each line to the"
0"  right of the cursor. With backspace, however, geany may backspace a"
0"  different amount of spaces on each line (it tries to be helpful in a way"
0"  that fails here) which will disalign the circuit to the right of the"
0"  multicursor."
0"- Similarly, the tab key is kind of unreliable for multicursor, so use space"
0"  to remain evenly spaced."


0"As an example of the spaces problem:"

s
v
o..>l
^
s

0"If you select the above OR gate with block selection, and then place the"
0"cursor below here and hit CTRL+v multiple times, you will get the following"
0"mess:"

ssss
vvvv
o..>lo..>lo..>lo..>l
^^^^
ssss

0"If however, you add 4 spaces to the right of the s, the right of the v, the"
0"right of the ^, and the right of the bottom s, and one more space at the end"
0"of every line to get some in-between whitespace, and you copypaste that 4"
0"times below, it looks as intended:"

s     s     s     s
v     v     v     v
o..>l o..>l o..>l o..>l
^     ^     ^     ^
s     s     s     s

0"RENDER:text"

`, 'editingextra');

registerCircuit('Electronic Diagram', `
0"comparison with real electrical diagrams. On the left real life notation, on"
0"the right our ASCII notation The real life notation is of course also just an"
0"ascii art approximation here."

4"                ___         "
4"            ---|   \\        " ..>a..
4"    AND        |   |----    "    ^
4"            ---|___/        " ....
4"                            "
4"               ____         "
4"            ---\\   \\        " ..>o..
4"     OR        |   }----    "    ^
4"            ---/___/        " ....
4"                            "
4"                ___         "
4"            ---\\\\  \\        " ..>e..
4"    XOR        ||  }----    "    ^
4"            ---//__/        " ....
4"                            "
4"                ___         "
4"            ---|   \\        " ..>A..
4"   NAND        |   |o---    "    ^
4"            ---|___/        " ....
4"                            "
4"               ____         "
4"            ---\\   \\        " ..>O..
4"    NOR        |   }o---    "    ^
4"            ---/___/        " ....
4"                            "
4"                ___         "
4"            ---\\\\  \\        " ..>E..
4"   XNOR        ||  }o---    "    ^
4"            ---//__/        " ....
4"                            "
4"               ____         "
4"            --o\\   \\        " ..]o..
4"  IMPLY        |   }----    "    ^
4"            ---/___/        " ....
4"                            "
4"                ___         "
4"            ---|   \\        " ..>a..
4" NIMPLY        |   |----    "    m
4"            --o|___/        " ....
4"                            "
4"                            "
4"                            "
4"    NOT     ----|>o-----    " ..>O..
4"                            "
4"                            "
4"                            "
4"  DIODE     ----|>|-----    " ..>o..
4"                            "
4"                            "
4"                 //         "
4"    LED     ----|>|-----    " ..>l..
4"                            "
4"                            "
4"                 /          "
4" SWITCH   V+ ---o  o----    " s....
4"                     >      "
4"                     >      "
4"                    GND     "
4"                            "
4"                            "
4"                  |         "
4"                -----       "
4"   PUSH   V+ ---o   o---    " p....
4"                      >     "
4"                      >     "
4"                     GND    "
4"                            "
4"            -----           "
4"           / _   \\          "
4" CLOCK    | | |_| |---      " R....
4"           \\ 1Hz /          " 5
4"            ----            "
4"                            "
4"                            "
4"                            "
4"CONSTANT 0     GND-----     " f....
4"                            "
4"                            "
4"CONSTANT 1      V+-----     " F....
4"                            "
4"                            "
4"FLOATING Z      -------     " f....     0"(Not supported, '0' is used)"
4"                            "
4"                            "
4"                            "
4"                  |         "     .
4"                  |         "     v
4"TRISTATE     ----|>----     " ...>z.... 0"(Not truly supported but this represents it)"
4"BUFFER                      "
4"                            "
4"                            "
4"                            "
4"                 +-----+    "
4"              ---|T   Q|----" -->t--
4" T-FLIPFLOP      |     |    " -->c
4"              ---|>    |    "
4"                 +-----+    "
4"                            "
4"                 +-----+    "
4"              ---|D   Q|----" -->d--
4" D-FLIPFLOP      |     |    " -->c
4"              ---|>    |    "
4"                 +-----+    "
4"                            "
4"                 +-----+    "
4"              ---|J   Q|----" -->j--
4"JK-FLIPFLOP   ---|>    |    " -->c
4"              ---|K    |    " -->k
4"                 +-----+    "
4"                            "
4"                 +-----+    "
4"             V+ -|T   Q|----"
4" COUNTER         |     |    " -->c--
4"              ---|>    |    "
4"                 +-----+    "
4"                            "
4"                    |       "     |
4"                 +-----+    "     v
4"              ---|T S Q|----" -->tq--
4"T-FLIPFLOP       |    _|    " -->cQ--
4"W.ASYNCH.SR   ---|> R Q|----"     ^
4"                 +-----+    "     |
4"                    |       "
4"                            "
4"                    |       "     |
4"                 +-----+    "     v
4"              ---|D S Q|----" -->dq--
4"D-FLIPFLOP       |    _|    " -->cQ--
4"W.ASYNCH.SR   ---|> R Q|----"     ^
4"                 +-----+    "     |
4"                    |       "
4"                            "
4"                    |       "     |
4"                 +-----+    "     v
4"              ---|J S Q|----" -->jq--
4"JK-FLIPFLOP   ---|>   _|    " -->c#
4"W.ASYNCH.SR   ---|K R Q|----" -->kQ--
4"                 +-----+    "     ^
4"                    |       "     |
4"                            "
4"                            "
4"                            "
4" IC USAGE                   "
4"                            "
4"        +---u---+           " ->i4081
4"       -|       |-Vdd       " ->#####<-
4"       -|  IC   |-          " --#####<-
4"       -|       |-          " --#####--
4"       -| 4081  |-          " ->#####--
4"       -|       |-          " ->#####<-
4"       -|       |-          "   #####<-
4"    Vss-|       |-          "
4"        +-------+           "
4"                            "
4"                            "
4"                            "
4" IC SCHEMATIC               "
4"                            "
4"       +---u---+            " s---v
4"       |       |            " s-->a@v---s
4"     1-|--+    |-14Vdd      " l<--, a<--s
4"     2-|-\\| +--|-13         " l<--, ,-->l
4"     3-|--u |/-|-12         " s-->a ,-->l
4"     4-|--n u--|-11         " s---^ a<--s
4"     5-|-/| n--|-10         "       ^---s
4"     6-|--+ |\\-|-9          "       I4081
4"  Vss7-|    +--|-8          "
4"       |  4081 |            "
4"       +-------+            "
4"                            "
4"                            "
4"                            "
4" RELAY (SPST)               "
4"                            "    .
4" ---uuuuuu----              "    v
4"    ======                  " ..>z... 0"(same as tristate buffer, not accurate emulation but close)"
4" ----o  o-----              "
4"      \\                     "
4"                            "
4"                            "
4"                            "
4"                            "
4" RELAY (SPDT)               "    .
4"                            "    ...
4" ---uuuuuu----              "    v |
4"    ======                  " ..>z.+...
4"        o----               "      w
4" ----o                      " ....>z...
4"      \\ o----               "
4"                            "
4"                            "
4"                            "
4"          _                 "
4"         | -_               "
4"       --|   |              " ..>M...
4"         |   |              "    #
4" MUX     |   |---           " ..>#
4"       --|  _|              "    ^
4"         |_-                "    .
4"           |                "    .
4"           |                "
4"                            "
4"                            "
4"                            "
4"          _                 "
4"         | -_               "
4"         |   |--            " ..>M...
4"         |   |              "    #
4"DEMUX  --|   |              "    #...
4"         |  _|--            "    ^
4"         |_-                "    .
4"           |                "    .
4"           |                "
4"                            "

`, 'diagram');


registerTitle('Parts');

var componentid = 0;

registerCircuit('Switch (s)', `
 s-->l
`, 'component' + componentid++);

registerCircuit('Switch Initially On (S)', `
 S-->l
`, 'component' + componentid++);

registerCircuit('Pushbutton (p)', `
 p-->l
`, 'component' + componentid++);

registerCircuit('Pushbutton Initially On (P)', `
 P-->l
`, 'component' + componentid++);

registerCircuit('Timer Initially Off (r)', `
 r-->l
`, 'component' + componentid++);

registerCircuit('Timer Initially On (R)', `
 R-->l
`, 'component' + componentid++);

registerCircuit('LED (l)', `
 s-->l
`, 'component' + componentid++);

registerCircuit('Colored LED (l)', `
 s-->l2
`, 'component' + componentid++);

registerCircuit('Wire Split (.)', `
    l
    ^
    |
 s--.->l
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
  ;   X
   ; /
    x
   / ;
  /   X
 s     l

`, 'component' + componentid++);

registerCircuit('8-Way Wire Crossing (*)', `

 s  s  l
  ; | X
   ;|/
 s--*->l
   /|;
  / v X
 s  l  l

`, 'component' + componentid++);

registerCircuit('AND gate (a)', `
s-->a-->l
    ^
s---.
`, 'component' + componentid++);

registerCircuit('NAND Gate (A)', `
s-->A-->l
    ^
s---.
`, 'component' + componentid++);

registerCircuit('OR Gate (o)', `
s-->o-->l
    ^
s---.
`, 'component' + componentid++);

registerCircuit('NOR Gate (O)', `
s-->O-->l
    ^
s---.
`, 'component' + componentid++);

registerCircuit('XOR Gate (e)', `
s-->e-->l
    ^
s---.
`, 'component' + componentid++);

registerCircuit('XNOR Gate (E)', `
s-->E-->l
    ^
s---.
`, 'component' + componentid++);

registerCircuit('One-hot Gate (h)', `
s-->h-->l
    ^
s---.
`, 'component' + componentid++);

registerCircuit('Inverted One-hot Gate (H)', `
s-->H-->l
    ^
s---.
`, 'component' + componentid++);

registerCircuit('Negative Input (m]w[)', `
s--]o-->l
    ^
s---.
`, 'component' + componentid++);

registerCircuit('Constant Off (f)', `
f-->l
`, 'component' + componentid++);

registerCircuit('Constant On (F)', `
F-->l
`, 'component' + componentid++);

registerCircuit('Fixed Value (f)', `
llllllllll
^^^^^^^^^^
f20#######
`, 'component' + componentid++);

registerCircuit('Fixed Value Inverted (F)', `
llllllllll
^^^^^^^^^^
F20#######
`, 'component' + componentid++);

registerCircuit('Random Generator (?)', `
p-->?-->l
`, 'component' + componentid++);

registerCircuit('Counter Gate (c)', `
s-->c-->l
`, 'component' + componentid++);

registerCircuit('Delay gate (d)', `
s-->d-->l
`, 'component' + componentid++);

registerCircuit('Delay gate with time (d)', `
    1
    0
s-->d-->l
`, 'component' + componentid++);

registerCircuit('Pulse gate (q)', `
s-->q-->l
`, 'component' + componentid++);

registerCircuit('Pulse gate with time (q)', `
    1
    0
s-->q-->l
`, 'component' + componentid++);

registerCircuit('Pulse gate with enable (q)', `
s-->q-->l
s-->y
`, 'component' + componentid++);

registerCircuit('Inverted pulse gate (Q)', `
s-->Q-->l
`, 'component' + componentid++);

registerCircuit('Inverted pulse gate with time (Q)', `
    1
    0
s-->Q-->l
`, 'component' + componentid++);

registerCircuit('Inverted pulse gate with enable (Q)', `
s-->Q-->l
s-->y-->l
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

registerCircuit('SR or JK flip-flop (jk)', `
 s-->j-->l
 s-->c
 s-->k-->l
`, 'component' + componentid++);

registerCircuit('D latch (d)', `
 s-->d-->l
     #
 s-->y
`, 'component' + componentid++);

registerCircuit('SR or JK latch (qQ)', `
 s-->q-->l
     #
 s-->Q-->l
`, 'component' + componentid++);

registerCircuit('SR or JK latch (jk)', `
 s-->j-->l
     #
 s-->k-->l
`, 'component' + componentid++);

// NOTE: qQ with enable is not useful, q and Q override the enable. But j and k don't.
registerCircuit('SR or JK latch with enable (jky)', `
 s-->j-->l
 s-->y
 s-->k-->l
`, 'component' + componentid++);

registerCircuit('T latch (t)', `
 s-->t-->l
`, 'component' + componentid++);

registerCircuit('T latch with enable (ty)', `
 s-->t-->l
 s-->y
`, 'component' + componentid++);


registerCircuit('flip-flop with everything (cqQjkdty)', `
 s-->q-->l
 s-->Q-->l
 s-->j-->l
 s-->k-->l
 s-->d-->l
 s-->t-->l
 s-->c-->l
 s-->y-->l

`, 'component' + componentid++);

registerCircuit('Path Panel Jack (J)', `

 s-->J    J-->l

 s-->J    J-->l

`, 'component' + componentid++);

registerCircuit('ASCII Keyboard Terminal (T)', `
     lllllll
     ^^^^^^^
     |||||||
     T######c<p
     #######c>l"eof"0
     #######
`, 'component' + componentid++);

registerCircuit('ASCII Screen Terminal (T)', `
     T######C<p"read"
     #######
     #######
     ^^^^^^^
     Sssssss
`, 'component' + componentid++);

registerCircuit('ASCII Screen Terminal, slightly different bounding box (T)', `
     T#####C<p"read"
     #######
     #######
     ^^^^^^^
     Sssssss
`, 'component' + componentid++);

registerCircuit('ASCII Terminal With Both (T)', `

                lllllll
                ^^^^^^^
                |||||||
                T######C<--p0"read"
                #######c<--p0"output"
                #######c-->l0"EOF"
                ^^^^^^^
                |||||||
                sssssss
`, 'component' + componentid++);

registerCircuit('ASCII Terminal With Both and Enable (T)', `

                lllllll
                ^^^^^^^
                |||||||
                T######y<--s0"enable"
                #######C<--p0"read"
                #######c<--p0"output"
                #######c-->l0"EOF"
                ^^^^^^^
                |||||||
                sssssss
`, 'component' + componentid++);

registerCircuit('Unicode Screen Terminal (T)', `
     T####################C<p
     #####################
     #####################
     ^^^^^^^^^^^^^^^^^^^^^
     ssssSSSSSsSSsssssssss
`, 'component' + componentid++);

registerCircuit('Decimal Display Terminal (T)', `
     T######
     ^^^^^^^
     sssssss
`, 'component' + componentid++);

registerCircuit('Terminal 1-bit output (T)', `
    T
    ^
    s
`, 'component' + componentid++);

registerCircuit('Decimal Display Terminal, Signed (T)', `
    1T######
     ^^^^^^^
     sssssss
    "s"
`, 'component' + componentid++);

registerCircuit('Decimal Display Terminal, Float (T)', `
    2T######
     ^^^^^^^
     sssssss
    "s"
`, 'component' + componentid++);

registerCircuit('Decimal Display Terminal With Passthrough (T)', `
     lllllll
     ^^^^^^^
     T######
     ^^^^^^^
     sssssss
`, 'component' + componentid++);

registerCircuit('Decimal Display Terminal With Passthrough, Signed (T)', `
     lllllll
     ^^^^^^^
    1T######
     ^^^^^^^
     sssssss
    "s"
`, 'component' + componentid++);

registerCircuit('Decimal Display Terminal With Passthrough, Float (T)', `
     lllllll
     ^^^^^^^
    2T######
     ^^^^^^^
     sssssss
    "s"
`, 'component' + componentid++);

registerCircuit('Decimal Display Terminal With Passthrough, 1-bit (T)', `
     l
     ^
     T
     ^
     s
`, 'component' + componentid++);

registerCircuit('Decimal Keyboard Terminal (T)', `
     lllllll
     ^^^^^^^
     T######
`, 'component' + componentid++);

registerCircuit('Decimal Keyboard Terminal, Signed (T)', `
     lllllll
     ^^^^^^^
    1T######
`, 'component' + componentid++);

registerCircuit('Decimal Keyboard Terminal, Float (T)', `
     lllllll
     ^^^^^^^
    2T######
`, 'component' + componentid++);

registerCircuit('Terminal Counter (T)', `
     T#####c<p

`, 'component' + componentid++);

registerCircuit('Terminal Counter  With Output (T)', `
     lllllll
     ^^^^^^^
     T######c<p

`, 'component' + componentid++);

registerCircuit('Terminal Counter with Enable (T)', `
     lllllll
     ^^^^^^^
     T######c<p"count"
     T######y<s"enable"

`, 'component' + componentid++);

registerCircuit('Terminal Counter With Reset (T)', `
     lllllll
     ^^^^^^^
     T######c<p0"count"
     #######Q<p0"reset"

`, 'component' + componentid++);

registerCircuit('Terminal Counter with Up/Down (T)', `
     lllllll
     ^^^^^^^
     T######c<p0"up"
     T######C<p0"down"

`, 'component' + componentid++);

registerCircuit('Terminal Counter With Up/Reset/Down (T)', `
     lllllll
     ^^^^^^^
     T######c<p0"up"
     #######Q<p0"reset"
     #######C<p0"down"

`, 'component' + componentid++);

registerCircuit('Terminal Counter With Set (T)', `
     lllllll
     ^^^^^^^
     T######c<p0"count"
     #######q<p0"set"
     ^^^^^^^
     sssssss

`, 'component' + componentid++);

registerCircuit('Terminal Counter With Enable/Up/Down/Set/Reset (T)', `
     lllllll
     ^^^^^^^
     #######y<s0"enable"
     T######c<p0"up"
     #######C<p0"down"
     #######q<p0"set"
     #######Q<p0"reset"
     ^^^^^^^
     sssssss

`, 'component' + componentid++);

registerCircuit('Terminal Decimal Memory Display (T)', `

     T######q<p0"set"
     ^^^^^^^
     sssssss

`, 'component' + componentid++);

registerCircuit('Terminal Decimal Memory Display With Output (T)', `
     lllllll
     ^^^^^^^
     T######q<p0"set"
     ^^^^^^^
     sssssss

`, 'component' + componentid++);

registerCircuit('Terminal Decimal Memory Display with Enable and Reset (T)', `
     lllllll
     ^^^^^^^
     T######y<s0"enable"
     T######q<p0"set"
     T######Q<p0"reset"
     ^^^^^^^
     sssssss

`, 'component' + componentid++);

registerCircuit('Terminal Decimal Memory Display, Signed (T)', `
     lllllll
     ^^^^^^^
    1T######q<p0"set"
     ^^^^^^^
     sssssss

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


registerCircuit('ROM one-hot, with gaps (bB)', `
   l ll
   ^ ^^
   | ||
s->b#bB
   ####
s->B#Bb
   ####
s->B#bB
s->b#Bb
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

registerCircuit('ROM binary, with gaps (bB)', `
   l ll
   ^ ^^
   | ||
s->b#bB
   ####
s->B#Bb
   ####
   B#bB
   b#Bb
`, 'component' + componentid++);

registerCircuit('RAM one-hot (bB)', `

   lll
   ^^^
   |||
s->bbbc<p
s->bbb
s->bbb
s->bbb
   ^^^
   |||
   sss
`, 'component' + componentid++);

registerCircuit('RAM binary (bB)', `

   lll
   ^^^
   |||
s->bbbc<p
s->bbb
   bbb
   bbb
   ^^^
   |||
   sss
`, 'component' + componentid++);

registerCircuit('RAM binary, beyond the visible (bB)', `

   lll
   ^^^
   |||
s->bbbc<p
s->bbb
s->bbb
   bbb
   ^^^
   |||
   sss
`, 'component' + componentid++);

registerCircuit('RAM binary with reset and enable (bB)', `

   lll
   ^^^
   |||
s->bbby<s0"enable"
s->bbbc<p0"set"
s->bbbQ<p0"reset all:
   bbb
   ^^^
   |||
   sss
`, 'component' + componentid++);

registerCircuit('Binary to Unary (b)', `

  llll
  ^^^^
  ||||
  b###
    ^^
    ||
    ss

`, 'component' + componentid++);

registerCircuit('Binary to Unary With Enable (b)', `

   llll
   ^^^^
   ||||
l<-b###<-s
     ^^
     ||
     ss

`, 'component' + componentid++);

registerCircuit('Unary to Binary (b)', `

   ll
   ^^
   ||
 b###
 ^^^^
 ||||
 ssss

`, 'component' + componentid++);

registerCircuit('Unary to Binary With Enable  (b)', `

     ll
     ^^
     ||
l<-b###<-s
   ^^^^
   ||||
   ssss

`, 'component' + componentid++);

registerCircuit('Priority Selector (b)', `

 llll
 ^^^^
 ||||
 b###
 ^^^^
 ||||
 ssss

`, 'component' + componentid++);

registerCircuit('Priority Selector With Enable (b)', `

   llll
   ^^^^
   ||||
l<-b###<-s
   ^^^^
   ||||
   ssss

`, 'component' + componentid++);

registerCircuit('Priority Selector (LSB left) (b)', `

 llll
 ^^^^
 ||||
0b###
 ^^^^
 ||||
 ssss

`, 'component' + componentid++);

registerCircuit('Mux (M)', `

    l
    ^
    .
    .
s..>M..>l
    #
s..>#
    ^
    .
    .
    s

`, 'component' + componentid++);

registerCircuit('Demux (M)', `


    l
    ^
s..>M..>l
    #
    #..>l
    ^
    s

`, 'component' + componentid++);

registerCircuit('Multi-input mux (M)', `

    ll
    ^^
    ||
    ||
s-->M#-->l
s-->##
s-->##
s-->##
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
s-->M#-->l
    ##-->l
    ##-->l
    ##-->l
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
s-->#-->l
    #
s-->#
s-->#
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
s-->#-->l
    #
    #-->l
    #-->l
    ^
    |
    |
    s

`, 'component' + componentid++);

registerCircuit('Mux with controlled swap (M)', `

    l
    ^
    .
    .
s..>M..>l
    #
s..>#..>l
    ^
    .
    .
    s

`, 'component' + componentid++);

registerCircuit('Mux with controlled swap of buses (M)', `

    l
    ^
    .
    .
s-->M-->l
s-->#-->l
    #
s-->#-->l
s-->#-->l
    ^
    .
    .
    s

`, 'component' + componentid++);

registerCircuit('ALU with 1-input operation (U)', `


   llllllll
   ^^^^^^^^
 l<U24#####<s
   ^^^^^^^^
   ssssssss

`, 'component' + componentid++);

registerCircuit('ALU with 1-input operation, signed (U)', `


   llllllll
   ^^^^^^^^
 l<U155####<s
   ^^^^^^^^
   ssssssss

`, 'component' + componentid++);

registerCircuit('ALU with 1-input operation, float (U)', `


   llllllll
   ^^^^^^^^
 l<U336####<s
   ^^^^^^^^
   ssssssss

`, 'component' + componentid++);

registerCircuit('ALU with 1-input operation, no side bits (U)', `


   llllllll
   ^^^^^^^^
   U74#####
   ^^^^^^^^
   ssssssss

`, 'component' + componentid++);

registerCircuit('ALU with 2-input operation (U)', `


            llllllll
            ^^^^^^^^
 l<U16##############<s
   ^^^^^^^^ ^^^^^^^^
   ssssssss ssssssss

`, 'component' + componentid++);

registerCircuit('ALU with 2-input operation, no side bits (U)', `


   lllllllllllllllll
   ^^^^^^^^^^^^^^^^^
   U48##############
   ^^^^^^^^ ^^^^^^^^
   ssssssss ssssssss

`, 'component' + componentid++);

registerCircuit('ALU with 2-input operation, signed (U)', `

            llllllll
            ^^^^^^^^
 l<U136#############<s
   ^^^^^^^^ ^^^^^^^^
   ssssssss ssssssss

`, 'component' + componentid++);

registerCircuit('ALU with 2-input operation, mixed size (U)', `

   llllllll
   ^^^^^^^^
   U6###############
   ^^^^^^^^        ^
   ssssssss        s

`, 'component' + componentid++);

registerCircuit('ALU with 2-input operation, float (U)', `

  2T#######
   ^^^^^^^^
   llllllll
   ^^^^^^^^
   U304##############
   ^^^^^^^^  ^^^^^^^^
  2T####### 2T#######

`, 'component' + componentid++);

registerCircuit('ALU with 2-input operation, float parts (U)', `

  2T#########
   ^ ^^^ ^^^^
   l lll llll
   ^ ^^^ ^^^^
   U304##################
   ^ ^^^ ^^^^  ^ ^^^ ^^^^
  2T######### 2T#########

`, 'component' + componentid++);


registerCircuit('ALU with 3-input operation (U)', `


                     llllllll
                     ^^^^^^^^
 l<U18#######################<s
   ^^^^^^^^ ^^^^^^^^ ^^^^^^^^
   ssssssss ssssssss ssssssss

`, 'component' + componentid++);

registerCircuit('ALU with 3-input operation, signed (U)', `


                     llllllll
                     ^^^^^^^^
 l<U138######################<s
   ^^^^^^^^ ^^^^^^^^ ^^^^^^^^
   ssssssss ssssssss ssssssss

`, 'component' + componentid++);

registerCircuit('ALU with 3-input operation, no side bits (U)', `


                     llllllll
                     ^^^^^^^^
   U18#######################
   ^^^^^^^^ ^^^^^^^^ ^^^^^^^^
   ssssssss ssssssss ssssssss

`, 'component' + componentid++);




registerCircuit('ALU with operation select (U)', `

           llllllll
           ^^^^^^^^
           ||||||||
l<#################<s
  #################
  #################<s
  U16##############<s
  ^^^^^^^^ ^^^^^^^^
  ssssssss ssssssss

`, 'component' + componentid++);






registerCircuit('RGB LED, 1 Input: I (D)', `
     D
     ^
     |
     s

    "I"

`, 'component' + componentid++);

registerCircuit('RGB LED, 2 Inputs: R,G (D)', `

    D#      s->D<-s
    ^^
    ||
    ss

   "RG"

`, 'component' + componentid++);

registerCircuit('RGB LED, 3 Inputs: R,G,B (D)', `

     D##      s->D<-s
     ^^^         ^
     |||         |
     sss         s

    "RGB"
`, 'component' + componentid++);

registerCircuit('RGB LED, 4 Inputs, RGBI (D)', `
     D###
     ^^^^
     ||||
     ssss

    "IRGB"

`, 'component' + componentid++);

registerCircuit('RGB LED, 5 Inputs, 3-level RGB (D)', `
     D####
     ^^^^^
     |||||
     sssss
    "X8421""0-26: 3x3x3"3

`, 'component' + componentid++);

registerCircuit('RGB LED, 6 Inputs, 4-level RGB (D)', `
     D#####      D#######
     ^^^^^^      ^^ ^^ ^^
     ||||||      || || ||
     ssssss      ss ss ss

    "RrGgBb"    "Rr Gg Bb"

`, 'component' + componentid++);

registerCircuit('RGB LED, 7 Inputs, 5-level RGB (D)', `
     D######
     ^^^^^^^
     |||||||
     sssssss
    "...8421""0-124: 5x5x5"3

`, 'component' + componentid++);

registerCircuit('RGB LED, 8 Inputs, 6-level RGB (D)', `
     D#######
     ^^^^^^^^
     ||||||||
     ssssssss
    "....8421""0-215: 6x6x6"3

`, 'component' + componentid++);

registerCircuit('RGB LED, 9 Inputs, 8-level RGB (D)', `
     D########      D##########
     ^^^^^^^^^      ^^^ ^^^ ^^^
     |||||||||      ||| ||| |||
     sssssssss      sss sss sss

    "RrrGggBbb"    "Rrr Ggg Bbb"

`, 'component' + componentid++);

registerCircuit('Dot Matrix Display, Binary Addressing (D)', `
      D#######y<S"enable"
      ########c<p"dot"
      ########q<p"fill"
      ########Q<p"clear"
      #########
    s>#########<s"b"
    s>#########<S"g"
    s>#########<s"r"
           ^^^
           sss

`, 'component' + componentid++);

registerCircuit('Dot Matrix Display, Matrix Addressing (D)', `
    s>D#######y<S"enable"
    s>########c<p"dot"
    S>########q<p"fill"
    S>########Q<p"clear"
    S>########
    s>########<-s"b"
    s>########<-S"g"
    S>########<-s"r"
    s>########
    s>########
      ^^^^^^^^
      ssSssSss

`, 'component' + componentid++);

registerCircuit('Dot Matrix Display, Matrix Addressing, Dot Input Only (D)', `
    s>D#######c<p"dot"
    s>########
    S>########
    s>########<-s"b"
    s>########<-S"g"
    S>########<-s"r"
    s>########
    s>########
      ^^^^^^^^
      ssSssSss

`, 'component' + componentid++);

registerCircuit('Dot Matrix Display, Matrix Addressing, 512 Colors (D)', `
    s>D#######y<S"enable"
    s>########c<p"dot"
    S>########q<p"fill"
    S>########Q<p"clear"
    S>#########
    s>#########<s"b"
    s>#########<s"b"
    S>#########<s"B"
    s>#########<s"g"
    s>#########<s"g"
    s>#########<s"G"
    s>#########<s"r"
    s>#########<s"r"
    s>#########<S"R"
      ^^^^^^^^
      ssSssSss

`, 'component' + componentid++);

registerCircuit('Dot Matrix Display, As Oscilloscope (D)', `
      D#######c<p"dot"
      ########
      ########
      ########
      ########
    s>########
    s>########
    s>########
           ^^^
           sss

`, 'component' + componentid++);

registerCircuit('Dot Matrix Display, As Oscilloscope With Clear and Enable (D)', `
      D#######y<S"enable"
      ########c<p"dot"
      ########Q<p"clear"
      ########
      ########
    s>########
    s>########
    s>########
           ^^^
           sss

`, 'component' + componentid++);

registerCircuit('Music Note (audio speaker) (N)', `
 s-->N440
`, 'component' + componentid++);

registerCircuit('Music Note (audio speaker) with volume (N)', `
 s-->N800
 s-->#
 s-->#
 s-->#
`, 'component' + componentid++);

registerCircuit('Music Note (audio speaker) with multiple controls (N)', `

  N#####################2000
  ^^^      ^^^^    ^^^^
  |||      ||||    ||||
  sss      sSss    ssss

`, 'component' + componentid++);

registerCircuit('Music Note (audio speaker) with multiple controls and Enable (N)', `

  2000N#####################y<--s
      ^^^      ^^^^    ^^^^
      |||      ||||    ||||
      sss      sSss    Ssss

`, 'component' + componentid++);

registerCircuit('Motor / Gear (K)', `
s-->K
`, 'component' + componentid++);

registerCircuit('Gears (K)', `
s-->KKKKKKKKKK-->l
`, 'component' + componentid++);

registerCircuit('Fan (K)', `
s-->K1
`, 'component' + componentid++);

registerCircuit('Wind Detector (K)', `
s-->K1   1K--->l
`, 'component' + componentid++);

registerCircuit('Heater (K)', `
s-->K2
`, 'component' + componentid++);

registerCircuit('Heat Detector (K)', `
s-->K2 2K--->l
`, 'component' + componentid++);

registerCircuit('Pump / Sprinkler (K)', `
s-->K3
`, 'component' + componentid++);

registerCircuit('Water Pipes (K)', `
s-->K3  K3  K3  K3  K3 3K-->l
`, 'component' + componentid++);

registerCircuit('Electromagnet (K)', `
s-->K4
`, 'component' + componentid++);

registerCircuit('Electromagnet Detector (K)', `
s-->K4               4K--->l
`, 'component' + componentid++);

registerCircuit('TNT (K)', `
s-->K9
`, 'component' + componentid++);

registerCircuit('EMP (K)', `
s-->K14
`, 'component' + componentid++);

registerCircuit('JAM (K)', `
s-->K19
`, 'component' + componentid++);

registerCircuit('Hatch (K)', `
    #################
    #               #
s-->K20  "revealed" #
    #               #
    #################
`, 'component' + componentid++);

registerCircuit('Bus (=)', `

s---0=              =4-->l
s---1=              =3-->l
s---2================2-->l
s---3=              =1-->l
s---4=              =0-->l
`, 'component' + componentid++);


registerCircuit('Bus crossing (=+)', `

      lll
      ^^^
      |||
      012
      ===
       =
       =
s-0=   =   =2->l
s-1====+====1->l
s-2=   =   =0->l
       =
       =
      ===
      210
      |||
      sss


`, 'component' + componentid++);

registerCircuit('Backplane global wire (g)', `
  s----g

          g--->l
`, 'component' + componentid++);

registerCircuit('Backplane global wire Numbered (g)', `
  s----g2

         3g--->l

  s----g3

         2g--->l
`, 'component' + componentid++);

registerCircuit('Bus with auto numbering ($)', `

s---0=              =0-->l
s---$=              =$-->l
s---$================$-->l
s---$=              =$-->l
s---$=              =$-->l
`, 'component' + componentid++);

registerCircuit('Backplane global wires auto numbering ($)', `

s---g0        0g-->l
s---g$        $g-->l
s---g$        $g-->l
s---g$        $g-->l
s---g$        $g-->l

`, 'component' + componentid++);

registerCircuit('Backplane Antenna ((u)n)', `
s--(  )-->l

(--s  l<--)

(--s  )-->l


`, 'component' + componentid++);

registerCircuit('Backplane Wrap-Around ((u)n0)', `
0nnnnnnn0
(;  s   )
( s     )
(       )
(<s    l)
(    l  )
(   l ^ )
(   ^  ;)
0uuuuuuu0

`, 'component' + componentid++);

registerCircuit('Tristate Buffer as OR (z)', `

s-->z..-->l
      .
s-->z..

`, 'component' + componentid++);

registerCircuit('Tristate Buffer as AND (z)', `

s-->z-->l
    ^
s---.

`, 'component' + componentid++);

registerCircuit('Tristate Buffer (inverted) as AND (Z)', `

S-->Z..-->l
      .
S-->Z..

`, 'component' + componentid++);

registerCircuit('Tristate Buffer (inverted) as OR (Z)', `

S-->Z-->l
    ^
S---.

`, 'component' + componentid++);

registerCircuit('Double Corner (&)', `
    s
    |
    |
 s--&->l
    |
    v
    l
`, 'component' + componentid++);

registerCircuit('Double Corner (%)', `
    l
    ^
    |
 s--%->l
    |
    |
    s
`, 'component' + componentid++);

registerCircuit('Multi-input (V)', `
   l
s--Vl
   l
`, 'component' + componentid++);

registerCircuit('Negated multi-input (W)', `
   l
s--Wl
   l
`, 'component' + componentid++);

registerCircuit('Wire Crossing Input (X)', `

    s
    |
  s-Xl
    l

`, 'component' + componentid++);

registerCircuit('Negated Wire Crossing Input (Y)', `

    s
    |
  s-Yl
    l

`, 'component' + componentid++);

registerCircuit('Diagonal Crossing Regular Input (^)', `

l l
^ ^     l
a e    ^
 ^    s
s s

`, 'component' + componentid++);

registerCircuit('Diagonal Crossing Input Triplet (^^^)', `

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
a e .     sss
^^^ .
s s s
`, 'component' + componentid++);




registerTitle('Testing');



registerCircuit('Unit Test', `

0"This is a unit test. It's for testing and development. It's included under"
0"'help' because it shows expected behavior of some edge cases."

0"Note: also try in browser console: applyTransform(4), applyTransform(2)"

0"Note: also try following maps, as they use a lot of components:"
0"* game of life ship: check the ship works and wraps around with autotick"
0"* langton's ant"
0"* 4 math functions with decimal"
0"* Lissajous and Plasma"
0"* Fredkin Gate"
0"* All the next unit tests, such as drawing test"
0"* All the individual devices in the directly preceding circuits"

0"# On"

0"In this section, the LED on the right of each contraption must be ON. If it's"
0"OFF, something is broken. A short delay just after loading is allowed."
0"There should also be no errors indicated."

F...........>l8

F----------->l8

f...........]l8

F>e-Xa-VVo+.>l8

f....>O.....>l8

f....>O#....>l8

a...........>l8

A...........]l8

o...........]l8

O...........>l8

E...........>l8

e...........]l8

C...........>l8

c...........]l8

p...........]l8

P...........>l8

s...........]l8

S...........>l8

Q...........>l8

11IF........>l8

i11.........>l8

10IO........>l8

i10.........>l8

i10.........>l8

>bB.........>l8

s....>C.....>l8

s---->c--->O>l8
s---->j--->O>l8
s---->k----->l8
s---->q--->O>l8
s---->Q----->l8

F>j--------->l8

f>k--------->l8

F>q---------]l8

F>q>c------->l8

F-->a##----->l8

F-->a#a----->l8

F-->a------->l8
f-->a-------]l8
F-->a------->l8

F-->a-------]l8
f-->#-------]l8
F-->a-------]l8

F-->o------->l8
f-->#------->l8
F-->o------->l8

F-->d
    #
F>q>c------->l8

f-->d
    #
F>q>c-------]l8

F-->t
    #
F>q>c------->l8

f-->t
    #
F>q>c-------]l8

f-->j
f-->k
F>q>c-------]l8

F-->j
f-->k
F>q>c------->l8

f-->j
F-->k
F>q>c-------]l8

F-->j
F-->k
F>q>c------->l8

F-->d
F-->Q
F>q>c-------]l8

f-->d
F-->q
f-->c------->l8

     C
     v
     qS
     vv
F-->dcyQq--->l8
F-->dcyQq--->l8
f-->dcyQq---]l8
F-->dcyQq--->l8


       .-->O>l8
F------+---->l8
f------.

f .--------->l8
 x
F .------->O>l8

f---v
f-->a-------]l8

f---w
f-->a-------]l8

f---v
f--]a-------]l8

f---w
f--]a------->l8

3Rw
  e--------->l8
3R^

3rv
  e--------->l8
3R^

f->A->q----->l8
f---->Q

f->a-]q----->l8
f---->Q

 c
 v
Bb-------->O>l8
bB---------->l8
BB---------->l8
bB---------->l8

 C
 v
Bb---------->l8
bB-------->O>l8
BB---------->l8
bB-------->O>l8

  b---------]l8
  #--------->l8
S>#---------]l8
s>#---------]l8

  b---------]l8
  #--------->l8
S>#---------]l8
s>#---------]l8

s>b
S>#
s>#--------->l8
s>#---------]l8

s>b
S>#
s>#--------->l8
s>#---------]l8

s>b---------]l8
S>#--------->l8
S>#---------]l8
s>#---------]l8

F+++++++++++>l8

F.-+*XY+*.-+>l8


F..( ). ).>O>l8
      .
      ......>l8

F...
    x
     .......>l8

F...
    X
     .......>l8

F...X.......>l8

        I5
f->O-------->l8

i5---------->l8

f->O-------.
     I6     X
i6           l8
  x
   .........>l8

S-->C>C>C>C->l8


F-----.
       \\
        .--->l8

        .--->l8
       /
F-----.

F           >l8
 ;         /
  .-------.

F-------&
        &--->l8

        %--->l8
F-------%

F----g10

       10g-->l8

         g-->l8
         1
         0

    0       0
F-->(       )l8

F--(     )-->l8

F--.     .-->l8
   (     )


F.         .>l8
  ;       /
   (     )

F--n

   u-------->l8

f--(     (--]l8

.----------->l8
.         .->l8
(-----.  .)->l8
F     |  |.->l8
      |  .-->l8
      .----->l8

F-n--------->l8

  u--------->l8

(--F       )>l8

       :
F--(   ) )-->l8
       :

     f
F--( ( ) )-->l8
       .----]l8

     F
f--( ( ) )--]l8
       .---->l8

    .------->l8
    #
F--(e)------>l8
    #
  F>#<f

F(         )>l8

    F
0nnnnn0
(;    )
( F   )
(    .------>l8
(    |)
(    .)
0uuuuu0
    .------->l8

0nnnnnnn0
(       )
(    =2 ) =2>l8
( S  = ;) =
(*S  =1-) =1>l8
( S  = /) =
(    =0 ) =0>l8
(    =  ) =
0uuuu=uu0 =
     =    =
     ======

0nnnnnnn0
(       )
(    =2 ) =2>l8
( s  = ;) =
(*s  =1-) =1]l8
( S  = /) =
(    =0 ) =0]l8
(    =  ) =
0uuuu=uu0 =
     =    =
     ======

F--(

F--(
   0

F--(()------]l8

  0         0
F>(         )l8

F>(         )]8

 F         .>l8
F(0       0)>l8
 F         .>l8

 f         .>l8
f(0       0)]l8
 F         .]l8

 f         .]l8
F(0       0)>l8
 f         .]l8

F          .>l8
 ;        /
  (0    0)
 /        ;
F          .>l8

f          .>l8
 ;        /
  (0    0)
 /        ;
F          .]l8

F          .]l8
 ;        /
  (0    0)
 /        ;
f          .>l8



            ]l8

            Wl8

             l8
            Yl8
             l8

F---------->#l8

F----------VVl8

F----------VXl8

F----0=0---->l8

F12=     =21]l8
   ==---==
f21=     =12>l8


F---12=45--->l8
F---23=34---]l8
f---34=12--->l8
F---45=23--->l8

  I8
S.(@@@).....>l8

S>i8........>l8

s->lI

S------->i-->l8

s-------]i-->l8

S--->i##i--->l8

S------>i##->l8

S------>i#i->l8

s->i->lI2

S------>i2-->l8

       I23
s->O-------->l8

S------>i2-->l8
         3

        i
S------>2--->l8
  "text"3

        i
S------>2--->l8
        3
        :
        t
        :

#-----------]l8

#------->O-->l8

F..>c.......>l8

O..>c.......>l8

S..>c.......>l8

F..]C.......>l8

f..]C.......>l8

f..>C.......>l8

O.....>d....>l8

         e-->l8
        >
F------+---->l8
      >
       e---->l8

S-->dy------>l8
     ^
     S

F..>z.......>l8

    f
    v
F..>z.......]l8

    F
    v
F..>z.......>l8
     .
f..>z.

    f
    v
F..>Z.......>l8
     .
F..>Z.

    F
    v
F..>Z.......]l8
     .
f..>Z.
    ^
    f

          |
S5110g 5110g>l8

          |
S5120g 5120g>l8


F--.
   |
F. | .------>l8
  ;|/
F--*-------->l8
  /|;
F. | .------>l8
   |
   .-------->l8


F--.
   |
F. | .------]l8
  ;|/
f--*--------]l8
  /|;
f. | .------>l8
   |
   .-------->l8


F--.
   |
f. | .------]l8
  ;|/
F--*-------->l8
  /|;
f. | .------]l8
   |
   .-------->l8


    .------->l8
F---,------->l8
f...,.......]l8
    .-------]l8

S---------->o
s-----------]l8

S---------->o
            >l8

    T#------]l8
    ##------]l8
    ##------]l8
    cc
    |^
    &+------>l8
     s

s>T---------]l8
S>#--------->l8
s>#---------]l8
S>#--------->l8
S>#--------->l8
s>#---------]l8

s>T>l s>i---]l8
s>#>l S>1--->l8
s>#>l S>6--->l8
s>#>l s>5---]l8
s>#>l s>#---]l8
s>#>l S>#--->l8
I165

    ........]l8
    .
s-->M-------]l8
    #
S-->#
    ^
    s

    ........>l8
    .
s-->M------->l8
    #
S-->#
    ^
    S

    ........>l8
    .
S-->M-------]l8
    #
s-->#
    ^
    S

    S
    v
s-->M------->l8
    #
S-->#-------]l8



    ........>l8
    .
S-->M-------]l8
    #
s-->#------->l8
    ^
    S

  .---------]l8
s>U
s>4
S>8
S>#
  #
s>#--------->l8
s>#---------]l8
S>#---------]l8
s>#--------->l8
  ^
  s

  .---------]l8
s>U---------]l8
s>5---------]l8
S>5---------]l8
s>#--------->l8
s>#---------]l8
s>#--------->l8
S>#--------->l8
S>#--------->l8
  ^
  s

     .------]l8
     |
s>U###
s>1###
s>6###
S>####
  ####
s>####------>l8
s>####------>l8
S>####------>l8
S>####------]l8
  ^^ ^
  sS s

s>U###
s>####
s>####
S>####
  ####
s>####------>l8
s>####------>l8
S>####------>l8
S>####------]l8
  ^^
  sS

S>e--------->l8
s>#
s>#

S>e---------]l8
S>#
s>#

S>e--------->l8
S>#
S>#

S>h--------->l8
s>#
s>#

S>h---------]l8
S>#
s>#

S>h---------]l8
S>#
S>#




S-321=====$-]l8
s-$=======$-]l8
S-$=======$->l8
S-$=======$->l8
s-$=======$-]l8
s-$=====321->l8
  =========
  ======321->l8
  ========$-]l8
  ========$->l8


S-0=======1->l8
s-$=======$->l8
S-$=======$->l8
S-$=======$-]l8
   =======
S-$=======$->l8
   =======
s-$=======0->l8
S-$=======$-]l8
S-$=======$->l8
S-1=======$->l8

.-----------]l8
|.----------]l8
||.--------->l8
||| .-------]l8
||| |.------]l8
||| ||.----->l8
||| |||
$$$ $$$
=======
    $$$
    ssS

   .-------->l8
   |.-------]l8
   ||.------>l8
   |||.----->l8
   7$$$
   ========
   = $$$7
S-7= |||.--->l8
s-$= ||.----]l8
S-$= |.----->l8
S-$= .------>l8

s-0=0-------]l8
S-$=$------->l8
s-$=$-------]l8
s-1=1-------]l8
S-$=$------->l8
S-$=$------->l8
   =
   =1-------]l8
   =$------->l8
   =$------->l8
   =0-------]l8
   =$------->l8
   =$-------]l8
   =
   =$-------]l8
   =$------->l8
   =0-------]l8
   =$------->l8
   =$------->l8
   =1-------]l8


S-g321   $g-]l8
s-g$     $g-]l8
S-g$     $g->l8
S-g$     $g->l8
s-g$     $g-]l8
s-g$   321g->l8


S-7g     g$-]l8
s-$g     g$-]l8
S-$g     g$->l8
S-$g     g$->l8
s-$g     g$-]l8
s-$g     g7->l8


 llll   .--->l8
 ^^^^   |.-->l8
s.|||   ||.-]l8
s-.||   |||.]l8
s--.| S>####
s---. S>#
I60   s>#
      s>i60

ssSS
vvvv
i###-------->l8
6  #-------->l8
0  #--------]l8
   #--------]l8


(-#    )---->l8
(-6    )---->l8
(-0    )----]l8
(-i### )----]l8
  ^^^^
  ssSS

  #<S
  #<S
  #<s
  #<s
  #
60i####
   |||.-----]l8
   ||.------]l8
   |.------->l8
   .-------->l8


F->l####---->l8
   5   5
F->####l---->l8

  .--------->l8
  |.-------->l8
S-++-------->l8
T###
  ^^
  FF



F-->J------->l8

F-->J    J--]l8

  2
F>T--------->l8
f>#---------]l8
F>#--------->l8
F>#--------->l8

s>U
S>3
s>0
s>4
s>#
s># 0"2^3=8"
  #
s>#---------]l8
S>#--------->l8
s>#--------->l8
s>#---------]l8
S>#---------]l8
s>#---------]l8


f-----------]l8
2----------->l8
0-----------]l8
#----------->l8
#-----------]l8
#-----------]l8


F----------->l8
2-----------]l8
0----------->l8
#-----------]l8
#----------->l8
#----------->l8


f-----------]l8
1-----------]l8
f----------->l8


F------v
       K10
S----->o----]l8
S----->o---->l8

S--->K------>l8

F---->KK---->l8

    55
F-->KK>c---->l8

    6
f-->K-------]l8

F-->K1 1K--->l8

F-->K2 2K--->l8

F-->K3 3K--->l8

F-->K4 4K--->l8

    KKKK
F-->K KK----]l8
    KKKK

    KKKK
F-->KK K---->l8
    KKKK

       I935
s----->O---->l8

s--->i935--->l8

s---]i935---]l8

       I936
s-----]o---->l8

s--->i936--->l8

s---]i936---]l8

s>lI937

S--->i937--->l8

S---]i937---]l8




0"# Off"

0"In this section, the LED on the right of each contraption must be OFF. If"
0"it's ON, something is broken. There should also be no errors indicated."

............>l8

f...........>l8

F.....@.....>l8

      ......>l8
F.....+

F.....|.....>l8

o...........>l8

e...........>l8

A...........>l8

s...........>l8

p...........>l8

s.....>o....>l8

s.....>a....>l8

s.....>e....>l8

F.....( (...>l8

F...( ( )...>l8

F.....
      X.....>l8

f---- ------>l8
     x
F---- ------>l8

F-----------
            Vl8

F-----------V
             l8

F----------.
            Vl8
3Rw
  E--------->l8
3R^

s---->R----->l8

r---->R----->l8

F...........]l8

F---------->Xl8

F----------V>l8

F----->----->l8

F-----------<l8

F---------->>l8

      :
F...........>l8
      :

F......
      .
     "."
      .
      ......>l8

s->oI9

s------>oI92>l8

        i
S------>2--->l8
        3

S----->i92-->l8
         :
         t
         :
S----->i92-->l8

F.....>o
      >o---->l8


F---=0==0--->l8

F---=0=0---->l8

F---=0------>l8

F---=====--->l8

F----=0=---->l8

S...........]l8

s....>S.....>l8


S...(")"
      ......>l8

F..>C.......>l8

O..>C.......>l8

S..>C.......>l8


       e---->l8
      ^
F-----

S-->dy------>l8
     ^
     s

s-->dy------>l8
     ^
     S

s------->l-->l8

S---------->o
s----------->l8

S---------->o
            ]l8


F-->(       )l8


F-->J####---]l8

F-->J    J-->l8


F------v
       K5
F----->o---->l8


F------v
       K10
F----->o---->l8

F---->K K--->l8




0"# Toggle"

0"In this section, the LED on the right must be have the same state as the"
0"input switch (slight delay is allowed, and if clicking twice very fast"
0"it can happen that some circuits with 'd' become invalid, that's acceptable)"

###
s##
###
.
............>l8
.
.......>o...>l8
.
.......>a...>l8
.
.......>e...>l8
.
.......>d...>l8
.
.......>S...>l8
.
.......>a...>l8
.       ^
.........
.
.......>o...>l8
.       ^
.........
.
.       c
.       v
.......>e...>l8
.
...>d>e>c...>l8
. .   ^
. .....
.
...g12 12g..>l8
.
.
.       =1>O>l8
.     ===
.     . =2..>l8
.     .
...1= . =2>O>l8
.   ==+==
.>O2= . =1..>l8
.     .
...2= .
.   ===
.>O1=
.
.
...(    )...>l8
.
.
. s>e#>lI6416
.
...>i6416...>l8
.
...>O.......]l8
.
.  d-. C>jq->l8
.  ^ v C>kQ-]l8
.--.>e-->c-->l8
.
. C--.>a---->l8
.     X
.----.>e----]l8
.
......
.     x
.      Y
.       O--->l8
.
.---.>o>q--->l8
.   .>O>Q---]l8
.
.  o...v     l8
.  ^   o     ^
...+.. ..>o...
.  . .       v
.  o<.       l8
.
.--( )-.
.      n
. .--------->l8
. n    u
.      .&
. u     |
. .--( )%
.
.
......>o>C..>l8
.    .   ^
.    .>O..
.
.
.-->dy------>l8
.    ^
.    S
.
.     ......>l8
.     .
. c..>M.....>l8
.     #
. C..>#.....]l8
.     ^
.......
.
.     ......>l8
.     .
. C..>M.....]l8
.     #
.     #.....>l8
.     ^
.......
.
.8612g 8612g>l8
.
.8613g g8613>l8
.
.g8614 8614g>l8
.
.g8615 g8615>l8
.
.8710g 8710g>l8
.8711g 8711g>l8
.8712g 8712g>l8
.
.8713g g8713>l8
.8714g g8714>l8
.8715g g8715>l8
.
.g8716 8716g>l8
.g8717 8717g>l8
.g8718 8718g>l8
.
.g8719 g8719>l8
.g8720 g8720>l8
.g8721 g8721>l8
.
.-->q------->l8
. c>y
.--]Q-------]l8
.
.-->j------->l8
. C>y
.--]k-------]l8
.
.-->q------->l8
.--]Q-------]l8
.
.-->j------->l8
.--]k-------]l8
.
.
.
.


0"# Flip Flops"

0"Expected behavior written before each circuit"

0"Behaves like D flip-flop, C positive edge triggered, both outputs same:"

s-->c-->l
s-->d-->l

0"Behaves like T flip-flop, C positive edge triggered, both outputs same:"

s-->c-->l
s-->t-->l

0"Behaves like JK flip-flop, toggle when clocked and J+K, all LEDs same:"

s-->c-->l
s-->j-->l
s-->k--]l


0"Behaves like D flip-flop, C negative edge triggered, both outputs same:"

s--]c-->l
s-->d-->l

0"Behaves like D latch, both outputs same:"

s-->y-->l
s-->d-->l

0"Toggles output state whenever input has positive edge, initially off"

s-->c-->l

0"Toggles output state whenever input has positive edge, initially on"

s-->C-->l

0"Outputs the input signal with slight delay:"

s-->d-->l

0"Rapidly oscillates when input on, else keeps whatever state it last had:"

s-->t-->l

0"Behaves like JK latch, rapidly oscillates if both j+k (or q+Q) on:"

s-->j-->l       s-->q-->l
s-->k--]l       s-->Q--]l

0"Behaves like JK latch with enable on left, ignores enable (always enabled) on right:""

s-->j-->l       s-->q-->l
s-->y-->l       s-->y-->l
s-->k--]l       s-->Q--]l

0"Rapidly oscillates if t is on, outputs value of d if t is off:"

s-->t-->l
s-->d-->l

0"Outputs 1 if j is 1 and k is 0, outputs 0 if j is 0 and k is 1, outputs value of d if both are 1, keeps state if both are 0."
0"Ignores d in all cases except if j+k both 1."

s-->j-->l
s-->k--]l
s-->d-->l


0"Works like SR flipflop for j=k=0, j=1 and k=0 or j=0 and k=1. With both j and k on, keeps last state (same as j=k=0)"

s-->j-->l
s-->k--]l
  .>d
  .-.

0"works like D flip-flop with dual edge triggered clock"

s---->d-->l
s---.>c-->l
    ..m

0"works like T flip-flop with dual edge triggered clock"

s---->t-->l
s---.>c-->l
    ..m

0"Gives brief positive pulse on positive clock edge (with y, only when enabled):"

s-->q-->l       s-->q-->l
                s-->y-->l



0"Gives longer duration pulse:"

    1               1
    0               0
s-->q-->l       s-->q-->l
                s-->y-->l

0"Gives brief negative pulse on positive clock edge (with y, only when enabled):"

s-->Q-->l       s-->Q-->l
                s-->y--]l

0"Gives brief pulse on positive and negative clock edge:"

  ...
  . w
s-.>q-->l

0"initially off, once on, never goes off again:"

s-->j-->l

0"initially on, once off, never goes on again:"

s-->k-->l

0"Combination of all inputs:"
0"positive edge at clock input causes update of state according to inputs."
0"all LEDs should read same value (some have inverted input)"
0"q enables immediately on no matter what"
0"Q disables immediately on no matter what"
0"Q and q together makes it rapidly oscillate"
0"T on trumps D/J/K"
0"D trumps J+K combination"
0"single J, single K or no J/K trump D"
0"so it's expected that J+K does not toggle in this case but outputs value of D."

S-->y-->l
s-->c-->l
    #
s-->t-->l
s-->d-->l
s-->j-->l
s-->k--]l
    #
s-->q-->l
s-->Q--]l

0"Same but without clock, if enabled updates every tick instead of at positive clock edge"

S-->y-->l
    #
s-->t-->l
s-->d-->l
s-->j-->l
s-->k--]l
    #
s-->q-->l
s-->Q--]l

0"# Errors"

0"In this section, everything extending to the right must be an error, marked"
0"in yellow"

s---.
    .--------->l
s---.

s---a
    #--------->l
s---o

s-->c#a------->l

s-->M#U------->l

s--->i741----->l

I195
s>e>l0

s--->i195----->l
     ^
     s

I197
s------>e----->l
I196

s-->z
    .--------->l
s-->Z
      ls
      ^v
s-->U####----->l

f25###F------->l

0"# IC input order"

0"Each input must activate the correct LED in the IC usage on the right"

     "ABCDEFGH"
      llllllll          "ABCDEFGH"           "C     A"                                 "G     E"
      ^^^^^^^^           llllllll             s     s                                   s     s
    I0||||||||  :        ^^^^^^^^              ;   /                                     ;   /
      |||||||| sH    :   ||||||||      :        X X     :                                 X X
   :  |||||||.-.:    As  #########i0  sG    #########->lA        ###########            0########
   As ||||||| s"G"3    ; #    ^    # /      #   ^:  #->lB    :   #     ^   #   :        i  ^:   #
   : ;|||||||/          X#    s    #X       #   sF  #->lC    Es  #     s   #  sC    :   #  sB   #
    : .|||||. :          #"F  D" s>#        #  :    #->lD      ; #    "H"  # /      Hl<-#   :   #
    Bs-.|||.-sF         X#<s    "B"#X       #<sH    #->lE       X#"B"    s>#X       Gl<-#  :    #
    :   .|.   :        / #  "H"    # ;      #  : Ds>#->lF        #<s "D  F"#        Fl<-#<sD :  #
       / s ;         Cs  #   s     #  sE    #    :  #->lG       X#    s    #X       El<-#    Hs>#
      s "D" s        :   #   v     #   :    #   :   #->lH      / #    v    # ;      Dl<-#    :  #
    " C     E"           ###########        #   Bs  #   :    Gs  0i#########  sA    Cl<-#  Fs   #
                                            #   :v  i        :      ||||||||   :    Bl<-#  :v   #
                                            ########0               vvvvvvvv        Al<-#########
                                                X X                 llllllll        :     X X
                                               /   ;               "HGFEDCBA"            /   ;
                                              s     s                                   s     s
                                             "E     G"                                 "A     C"

          "E"
      "D"  l                                   "A     C"                           "E     G"
  :    l  X                                     l     l          "HGFEDCBA"         l     l
  Cl   ^ /I1                                     <   >            ssssssss           X   X
  : X  |.    :       :                 :   :      ; /             vvvvvvvv            ; /
     ; ||.->lF       Cl  #########i1  lE   As>#########        ###########          1########
 :    .|||.  :         ^ #    v    # X     Bs>#   v:  #    :   #     v   #   :      i  v:   #
 Bl<-.|||||;            ;#    l    #/      Cs>#   lF  #    Gl  #     l   #  lA      #  lB   #  :
 :  .|||||| X :          #"F  H" l<#       Ds>#  :    #      X #    "D"  # ^        #   :   #<sH
   /|||||||  lG         /#>l    "B"#;      Es>#>lD    #       ;#"B"    l<#/         #  :    #<sG
: X |||||||.. :        v #  "D"    # X     Fs>#  : Hl<#        #>l "H  F"#          #>lH :  #<sF
Al  ||||||||v        Al  #   l     #  lG   Gs>#    :  #       /#    l    #;         #    Dl<#<sE
:   ssssssssl"H"3    :   #   ^     #   :   Hs>#   :   #      X #    ^    # v        #    :  #<sD
   "ABCDEFGH"            ###########       :  #   Bl  #    El  1i#########  lC      #  Fl   #<sC
                         ^^^^^^^^             #   :^  i    :                 :      #  :^   #<sB
                         ssssssss             ########1                             #########<sA
                        "ABCDEFGH"                / ;                                 / ;      :
                                                 X   X                               <   >
                                                l     l                             l     l
                                               "G     E"                           "C     A"


0"RENDER:text"
`, 'unittest');






registerCircuit('Drawing Test', `

0"This is a unit test for testing and development."

0"# LED Colors"

0 1 2 3 4 5 6 7 8 9   0 1 2 3 4 5 6 7 8 9
l l l l l l l l l l   l l l l l l l l l l
^ ^ ^ ^ ^ ^ ^ ^ ^ ^   ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
s s s s s s s s s s   S S S S S S S S S S

 D D
 ^ ^
 s S
"I I"

 ## ## ## ##
 D# D# D# D#
 ^^ ^^ ^^ ^^
 ss sS Ss SS
"RG RG RG RG"

 ### ### ### ### ### ### ### ###
 D## D## D## D## D## D## D## D##
 ^^^ ^^^ ^^^ ^^^ ^^^ ^^^ ^^^ ^^^
 sss ssS sSs sSS Sss SsS SSs SSS
"RGB RGB RGB RGB RGB RGB RGB RGB"

 #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### ####
 D### D### D### D### D### D### D### D### D### D### D### D### D### D### D### D###
 ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^
 ssss sssS ssSs ssSS sSss sSsS sSSs sSSS Ssss SssS SsSs SsSS SSss SSsS SSSs SSSS
"IRGB IRGB IRGB IRGB IRGB IRGB IRGB IRGB IRGB IRGB IRGB IRGB IRGB IRGB IRGB IRGB"

 D#### D##### D###### D####### D########
 ^^^^^ ^^^^^^ ^^^^^^^ ^^^^^^^^ ^^^^^^^^^
 sssss ssssss sssssss ssssssss sssssssss


0"# Devices"

s-->a-->l    s-->o-->l    s-->e-->l    s-->e-->l    s-->a-->l
    #            #            #           >         s-->a-->l
s-->#        s-->#        s-->#        s-->a-->l    s-->a-->l


s-->e-->lI20      s-->i20-->l         s-->jq-->l    s-->M-->l
    #                 ###             s-->c#            #
s-->e             s-->#i#             s-->kQ-->l    s-->#-->l
                                                        ^
                                                        s

                                                           llllllll
                                                           ^^^^^^^^
                                                           T#######
                                      s>D#######c<p"dot"
                                      s>########q<p"fill"
  s->a>l      s>U>l         lll       S>########           llllllll
  p->e>l      s>1>l         ^^^       s>########<s"b"      ^^^^^^^^
  r->o>l      s>6>l         |||       s>########<S"g"      T#######
  S->A>l        #        s->bbB       S>########<s"r"
  P->E>l      s>#        S->BBb       s>########
  R->O>l      s>#        s->BbB       s>########           T#######
  s->?>l      s>#        s->bBb         ^^^^^^^^           ^^^^^^^^
                                        ssSssSss           ssssssss


s-->N-->l

s-->N-->l
s-->#
s-->#
s-->#800


0"Fixed value: the f should be hidden in graphics mode and number aligned to side. In text mode, the f must be visible."

llllllllll
^^^^^^^^^^
||||||||||
f500######


0"# Wire Shapes"

s-->l    l
         ^            l       l l   l   l  l       l  l   l   l
   l     |             ^     ^   ^  ^  ^    ^     ^    ^  ^  ^       l
   ^     |              ;   /     ; | /      ;   /      ; | /        ^
   |     s               ; /       ;|/        ; /        ;|/         |
s--+-->l       s          x      s--*-->l   s--*-->l      *       s--*-->l
   |           .         / ;       /|;        / ;        /|;         |
   s       l<.....>l    /   ;     / | ;      /   ;      / | ;        s
               .       s     s   s  s  s    s     s    s  s  s
    l  l l  l  v
    ^   X   ^  l       l       l     l   l   l   l
    |  / ;  |           X     X      ^  X     X  ^        l       l
s---+-*---*-+------->l   ;   /       | /       ; |        ^       ^
    |/     ;|             ; /        |/         ;|        |       |
    *       *              *      s--*-->l    s--*-->l s--%--s s--&--s
   /|       |;            / ;       /|           |;       |       |
s-*-+-------+-*----->l   /   ;     / |           | ;      v       v
 /  |       |  ;        s     s   s  s           s  s     l       l
S   s       s   s

       s    s s    s       s    s s    s
  l l  . l  . .  l .  l l  . l  . .  l .      l     l
   X    X    X    X    Y    Y    Y    Y     s.Vl  s.Wl
  . .  . l  l l  l .  . .  . l  l l  l .      l     l
  s s  s           s  s s  s           s
                                              s     s
       s   s                 s   s            |     |
  l    .   .    l       l    .   .    l     s.Xl  s.Yl
s.Xl s.Xl lX.s lX.s   s.Yl s.Yl lY.s lY.s     |     |
  .    l   l    .       .    l   l    .       v     v
  s             s       s             s       l     l

  a e       s         s         l      s       s      l         e a
  ^^^       .     l<..+...s     ^      .   s...+..>l  ^         ^^^
s...+..>l   .>a       vvv       .    a<.     vvv      .     l<..+...s
    s       .>        e a       .     <.     a e      .         s
           s+>e               e<+s   e<+s            s+>e
            .                  <.      .              .>
            .                 a<.      .              .>a
            v                   .      v              .
            l                   s      l              s

  l O  O l
   <^  ^>
s....  ....s



s--g2 2g-->l   s---g--->l

             s                s
             |                |                s-->e--->l
             n                n    s-->e--->l      #
s--( )-->l      (--s l<--)         s--(#)-->l   (--#  )-->l
             u                u    s-->#           #
             |                |                s-->#( )-->l
             v                v
             l                l

           l               l  l  l
           ^         s s s  ^ ^ ^
    0      |          ;|/    ;|/
  s-(-s l<-)->l       0(-s l<-)0
    |      0          /|;    /|;
    s                s s s  v v v
                           l  l  l


l l   l l   l l   l      a l
^ ^   ^ ^   ^ ^   ^^     ^^
a e   a e   a |   | ;    . ;
^^^   ^^    ^^|   s  s   s  s
s s   s s   s s




s-1========1->l   s-1========1->l    s-1========1->l   s-1========1->l

s-1========1->l   s-1========1->l    s-1========1->l   s-1========1->l







"---- |||| //// ;;;; %%%% &&&& .... ,,,, ++++ xxxx **** @@@@"

 ---- |||| //// ;;;; %%%% &&&& .... ,,,, ++++ xxxx **** @@@@
 ---- |||| //// ;;;; %%%% &&&& .... ,,,, ++++ xxxx **** @@@@
 ---- |||| //// ;;;; %%%% &&&& .... ,,,, ++++ xxxx **** @@@@
 ---- |||| //// ;;;; %%%% &&&& .... ,,,, ++++ xxxx **** @@@@


s-->r-->l     s-->s-->l
s-->R-->l     s-->S-->l
S-->r-->l     S-->s-->l
S-->R-->l     S-->S-->l


0"Wire crossing inputs X and Y have the most possible shapes: each of 8 sides could be"
0"empty, wire, or arrow/antiarrow head. Up to 4 independent parts can have the on or the off"
0"color. Therefore, these use the dynamic drawing system to support more than the"
0"standard limit of 2 (standard) or 4 (specific to a few, like +) different on/off wire combinations."

        s S          s   S             s              s        s    s s    s s       s
s--Xl   | |     l    |    ; l      l    ;      l       ; l     |l    ;|     ;|l     l|l
        X X    X  S--Xl    X   S--Xl  S--Xl  S--Xl   S--Xl  S--Xl  S--Xl  S--Xl   S--Xl
S--Xl   l l   /      l    / l    /        l      ;     / l    /l      ll    /ll     /l;
             S           s      s                 s   s      s             s       s   s

        l l     S  s        S            s              s    s      s s    s s     s
lX--s   X X    /   |     l /   l        /      l     l /    l|      |/    l|/     l|l
        | |   X   lX--S   X    lX--S  lX--S  lX--S   lX--S  lX--S  lX--S  lX--S   lX--S
lX--S   s S  l     l     l ;     ;    l      /       l ;     l;    ll     ll;     /l;
                            s     s         s           s      s             s   s   s




        s S          s   S             s              s        s    s s    s s       s
s--Yl   | |     l    |    ; l      l    ;      l       ; l     |l    ;|     ;|l     l|l
        Y Y    Y  S--Yl    Y   S--Yl  S--Yl  S--Yl   S--Yl  S--Yl  S--Yl  S--Yl   S--Yl
S--Yl   l l   /      l    / l    /        l      ;     / l    /l      ll    /ll     /l;
             S           s      s                 s   s      s             s       s   s

        l l     S  s        S            s              s    s      s s    s s     s
lY--s   Y Y    /   |     l /   l        /      l     l /    l|      |/    l|/     l|l
        | |   Y   lY--S   Y    lY--S  lY--S  lY--S   lY--S  lY--S  lY--S  lY--S   lY--S
lY--S   s S  l     l     l ;     ;    l      /       l ;     l;    ll     ll;     /l;
                            s     s         s           s      s             s   s   s




 s       s           s   S             s              s        s    s s    s s       s
  ;       ;          |    ; /      /    ;      ;       ; l     |l    ;|     ;|/     ;|l
S--X-   S--X-     S--Xl    X   S--Xl  S--X-  S--Xl   S--X-  S--X-  S--Xl  S--Xl   S--Xl
    ;       ;        |    / l    /        l      ;     / l    /l      l;    /l;     /l;
                         s      s                 s   s      s             s       s   s

   s       s       s        S            s              s    s      s s    s s     s
  /       /        |     l /   ;        /      /     l /    l|      |/    ;|/     l|/
-X--S   -X--S     lX--S   X    lX--S  -X--S  lX--S   -X--S  -X--S  lX--S  lX--S   lX--S
/       /          |     / ;     ;    l      /       l ;     l;    /l     /l;     /l;
                            s     s         s           s      s             s   s   s


0"# Patch Panel Wires"
                                       J   J   J   J



s>J   J>O>J    J>O>J    J>L            J   J   J   J
        #        #
s>J   J>#      J>#      J>L

                                       J   J   J   J



                                       J   J   J   J

0"# Kinetic devices K"

s-->K

s-->K0       s-->K5       s-->K10      s-->K15

s-->K1       s-->K6       s-->K11      s-->K16

s-->K2       s-->K7       s-->K12      s-->K17

s-->K3       s-->K8       s-->K13      s-->K18

s-->K4       s-->K9       s-->K14      s-->K19


     ##########
     #  ^     #
     #  S     #
s--->K20 s>o------>l
     #        #
     #        #
     ##########


0"# Error color"

s-->a-->l
    #
s-->o

0"# Audio"



0"The following sound should sound somewhat piano-like. At least there should"
0"be a sharp immediate start, and a smooth gradual decrease in volume. Test this"
0"in different web browsers."




                              3
                              4
                              9
    B#b#b#b#b#b#b#b#b#b#b#b#b>N
    b#B#b#b#b#b#b#b#b#b#b#b#b>#
    b#b#B#b#b#b#b#b#b#b#b#b#b>#
    b#b#b#B#B#b#b#b#b#b#b#b#b>#
    b#b#b#b#b#B#B#b#b#b#b#b#b>#
    b#b#b#b#b#b#b#B#B#b#b#b#b>#
    b#b#b#b#b#b#b#b#b#B#B#B#b>#
    b#b#b#b#b#b#b#b#b#b#b#b#B>#
    ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
.>q>d>d>d>d>d>d>d>d>d>d>d>d>d
. 2 2 2 2 2 2 2 2 2 2 2 2 2 2
.
p#
##



0"Test all parameters:"

  N########################y#2000
  ^^^      ^^^^    ^^^^    ^
  |||      ||||    ||||    |
  sss      sSss    Ssss    s
1"shape" 1"freq"  1"vol""enable"1


0"# Time"

0"The following should show unix time and time since loading of this circuit."
0"That is, the U88 with fixed 0-input should constantly output the unix time"
0"the circuit had when loaded. Everything is in seconds."

0"unix time:"
T###############################
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
||||||||||||||||||||||||||||||||
U88#############################
^
r

0"time since running start:"
T###############################
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
||||||||||||||||||||||||||||||||
U17##############################################################
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
|||||||||||||||||||||||||||||||| ||||||||||||||||||||||||||||||||
U88############################# U88#############################
^                                ^
r                                f


0"# Floating point"

0"Verify 64-bit floating point support"

2T#################################################################
 ^ ^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 l lllllllllll llllllllllllllllllllllllllllllllllllllllllllllllllll
 ^ ^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2T#################################################################


0"# Comment Alignment"

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

6"hi"     6"hi"
EEeee     EEeee

"hi"6     "hi"6
EEeee     EEeee

8"hi"     8"hi"
eeeEE     eeeEE

"hi"8     "hi"8
eeeEE     eeeEE

3"hi"     3"hi"
Ooooo     Ooooo

"hi"3     "hi"3
Ooooo     Ooooo

4"hi"     4"hi"
ooOoo     ooOoo

"hi"4     "hi"4
ooOoo     ooOoo

5"hi"     5"hi"
ooooO     ooooO

"hi"5     "hi"5
ooooO     ooooO



l<--s6"There should be no space between this comment and the switch"


"There should be no space between this comment and the switch"8s-->l


l<--s0"There should be no space between this comment and the switch"


"There should be no space between this comment and the switch"2s-->l


"The number 3 in this comment should NOT make the LED green."
            l
            ^
            s

"The hidden number 3 should NOT make the LED green."3l<--s


0"Multiline text with background and underscores: check that you can see the"
0"underscores, and they don't disappear beneath the next line (there must be"
0"multiple lines of underscores visible, not just the bottom)."
0"Must be checked at different zoom levels."
0"NOTE: ensure to choose color scheme where background color of preformatted"
0"text is different than main background."

3"______"
3"______"
3"______"
3"______"


0"Multiline text with spaces and background: check that the background is not"
0"striped due to gaps."
0"Must be checked at different zoom levels."
0"NOTE: ensure to choose color scheme where background color of preformatted"
0"text is different than main background."

3"      "
3"      "
3"      "
3"      "

0"The following text's background should not overlap the and gate:"

   3"text"
a##########
^         ^
s         s

0"# Comment Styling"

"full width"

0"narrow variable width"

3"narrow monospace"

0"# chapter title"

0"## subchapter title"

0"### subsubchapter title"

0"# monospace chapter"3

0"- bullet"
0"* bullet"

0"horizontal rule:"
0"___"

0"vertical styling:"
     0  1  2  3  4  5  6  7  8
  :  :  :  :  :  :  :  :  :  :
  v  v  v  v  v  v  v  v  v  v
  e  e  e  e  e  e  e  e  e  e
  r  r  r  r  r  r  r  r  r  r

  n  0  1  2  3  4  5  6  7  8
  :  :  :  :  :  :  :  :  :  :

  :  :  :  :  :  :  :  :  :  :
  v  v  v  v  v  v  v  v  v  v
  e  e  e  e  e  e  e  e  e  e
  r  r  r  r  r  r  r  r  r  r

  n  0  1  2  3  4  5  6  7  8
  :  :  :  :  :  :  :  :  :  :
     0  1  2  3  4  5  6  7  8


0"TOC:"
0"INSERT:toc"

0"link:"
0"INSERT:link:drawtest"

0"unexisting link:"
0"INSERT:link:unexisting"

`, 'drawtest');



registerCircuit('Update Algorithm Test', `

0"This tests the algorithmic update order of components. E.g. if an update algorithm is not working"
0"correctly, some things that should update in one tick, may instead propagate slowly due to updating"
0"components in the wrong order."

0"Most tests behave differently in immediate mode and electron mode. The behavior for each is described"
0"above each circuit."

0"MODE:immediate"




0"Below, press the left switch, and the right switch."

0"In immediate mode, for both the left and right one, the LED must be updated immediately, not multiple ticks."
0"--> typically if there would be a bug and the updates would go in scanline order rather than correct device dependency order,"
0"it will be the second one, the right to left case, going wrong."

0"In electron mode, it must propagate slowly, and at the same speed in the left to right and right"
0"to left case."

s>e>e>e>e>e>e>e>e>l

l<e<e<e<e<e<e<e<e<s




0"Test with input jacks update order. Connect the jacks with horizontal empty gab of distance 1 between them together."
0"When pressing the switch:"

0"in immediate mode, the LED must update immediately, for both directions."
0"in electron mode, similarly as for the e's above, slower propagation is expected."

s>J J>J J>J J>l

l<J J<J J<J J<s





0"Below, there *should* be a slow propagation in both immediate and electron mode, since this are delays. The right to left and left to right ones"
0"should have same speed. Electron and immediate should have the same speed, and the speed should be the same as the 'e' case above for electron mode."

s>d>d>d>d>d>d>d>d>l

l<d<d<d<d<d<d<d<d<s





0"Below, there should be no propagation delay im immediate mode: flip-flop clocks and counters should update immediately, in immediate mode."
0"Clicking each switch the first time should immediately light the LED. A second and more times should not affect the LED"
0"since this are binary counters."

0"In electron, as usual, slower propagation is expected."

s>c>c>c>c>c>c>c>c>l

l<c<c<c<c<c<c<c<c<s





0"The JK flip-flop below must work correctly as a JK flip-flop in immediate mode and electron mode."
0"This circuit depends a lot on correct update algorithm."
0"In reality, this is not a robust JK flip-flop since it depends on the clock pulse being very short."
0"That's also why there's a q pulse after the clock input here, and a few delays. But it must be emulated correctly"
0"and work with those timing tweaks in both modes."


"J" S----->#A->d->A--.->l "Q"
      2  .-^^--d<-^-.|
"C" p>q--.-vv--d<-v-+.
"K" S----->#A->d->A-.-->l "Q'"

0"This mirrored version should also work"

 "Q "l<-.--A<-d<-A#<-----S "J"
        |.-^->d--^^-.  2
        .+-v->d--vv-.--q<p "C"
 "Q'"l<--.-A<-d<-A#<-----S "K"




0"In the circuits below, the 2 LEDs of one of the gates should blink"
0"alternatingly, not be on or off at the same time. If they do in one or more"
0"of the different orientation variants below, that's related to a bad update order."

0"Set speed to slow to see this best."

0"However, it is in fact broken in some orientations in immediate mode. That's hard"
0"to fix because there's a loop, and immediate mode must choose *some* point where"
0"to start computing each tick. If it updates the regular LED first, then the o"
0"gate, then the inverted LED, then you get exactly that issue, and it does happen"
0"in some orientations below in immediate mode."

0"In electron mode, it must work for all oritations: Electron mode is the mode"
0"to use to correctly emulate gates with loop-backs."

  ...         ...                 ...            ...
l l .    o>l  . v   ...... ...... . l l  l<o     v .
^ m .    #    . ##o .    . .    . . m ^    #   o## .
o## .  .>#]l. . w v .l[#<. .>#]l. . ##o .l[#<. v w .
  ^ .  .    . . l l    #     #    . ^   .    . l l .
  ...  ...... ...    l<o     o>l  ...   ......   ...








0"Also test the 4-bit CPU circuit: the order of updates based on dependencies of clock, registers, ... is"
0"important there. Expected is that it'll copy inputs and (after running a good while) sort from lowest to highest."

0"INSERT:link:cpu"






0"Also test the Langton's Ant circuit:"

0"INSERT:link:langtons_ant"

`, 'ordertest');


registerCircuit('All supported ALU ops (2-input)', `

0"This lists all possible ALU ops, with 2 inputs attached, even for operators"
0"that don't exist or normally take 1 input."

   T### T###
   ^^^^ ^^^^
   3210 7654
   gggg gggg
   ssss ssss
  "8421 8421"
  "   A    B"


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U0#######<s l<U1#######<s l<U2#######<s l<U3#######<s l<U4#######<s l<U5#######<s l<U6#######<s l<U7#######<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U8#######<s l<U9#######<s l<U10######<s l<U11######<s l<U12######<s l<U13######<s l<U14######<s l<U15######<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U16######<s l<U17######<s l<U18######<s l<U19######<s l<U20######<s l<U21######<s l<U22######<s l<U23######<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U24######<s l<U25######<s l<U26######<s l<U27######<s l<U28######<s l<U29######<s l<U30######<s l<U31######<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U32######<s l<U33######<s l<U34######<s l<U35######<s l<U36######<s l<U37######<s l<U38######<s l<U39######<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U40######<s l<U41######<s l<U42######<s l<U43######<s l<U44######<s l<U45######<s l<U46######<s l<U47######<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U48######<s l<U49######<s l<U50######<s l<U51######<s l<U52######<s l<U53######<s l<U54######<s l<U55######<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U56######<s l<U57######<s l<U58######<s l<U59######<s l<U60######<s l<U61######<s l<U62######<s l<U63######<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U64######<s l<U65######<s l<U66######<s l<U67######<s l<U68######<s l<U69######<s l<U70######<s l<U71######<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U72######<s l<U73######<s l<U74######<s l<U75######<s l<U76######<s l<U77######<s l<U78######<s l<U79######<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U80######<s l<U81######<s l<U82######<s l<U83######<s l<U84######<s l<U85######<s l<U86######<s l<U87######<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U88######<s l<U89######<s l<U90######<s l<U91######<s l<U92######<s l<U93######<s l<U94######<s l<U95######<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U96######<s l<U97######<s l<U98######<s l<U99######<s l<U100#####<s l<U101#####<s l<U102#####<s l<U103#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U104#####<s l<U105#####<s l<U106#####<s l<U107#####<s l<U108#####<s l<U109#####<s l<U110#####<s l<U111#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U112#####<s l<U113#####<s l<U114#####<s l<U115#####<s l<U116#####<s l<U117#####<s l<U118#####<s l<U119#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


        T###          T###          T###          T###          T###          T###          T###          T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U120#####<s l<U121#####<s l<U122#####<s l<U123#####<s l<U124#####<s l<U125#####<s l<U126#####<s l<U127#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


`, 'aluall2');



registerCircuit('All supported ALU ops (1-input)', `

0"This lists all possible ALU ops, with 1 input attached, even for operators"
0"that don't exist or normally take 2+ inputs."

   T###
   ^^^^
   3210
   gggg
   ssss
  "8421"
  "   A"



   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U0##<s l<U1##<s l<U2##<s l<U3##<s l<U4##<s l<U5##<s l<U6##<s l<U7##<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U8##<s l<U9##<s l<U10#<s l<U11#<s l<U12#<s l<U13#<s l<U14#<s l<U15#<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U16#<s l<U17#<s l<U18#<s l<U19#<s l<U20#<s l<U21#<s l<U22#<s l<U23#<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U24#<s l<U25#<s l<U26#<s l<U27#<s l<U28#<s l<U29#<s l<U30#<s l<U31#<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U32#<s l<U33#<s l<U34#<s l<U35#<s l<U36#<s l<U37#<s l<U38#<s l<U39#<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U40#<s l<U41#<s l<U42#<s l<U43#<s l<U44#<s l<U45#<s l<U46#<s l<U47#<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U48#<s l<U49#<s l<U50#<s l<U51#<s l<U52#<s l<U53#<s l<U54#<s l<U55#<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U56#<s l<U57#<s l<U58#<s l<U59#<s l<U60#<s l<U61#<s l<U62#<s l<U63#<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U64#<s l<U65#<s l<U66#<s l<U67#<s l<U68#<s l<U69#<s l<U70#<s l<U71#<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U72#<s l<U73#<s l<U74#<s l<U75#<s l<U76#<s l<U77#<s l<U78#<s l<U79#<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U80#<s l<U81#<s l<U82#<s l<U83#<s l<U84#<s l<U85#<s l<U86#<s l<U87#<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U88#<s l<U89#<s l<U90#<s l<U91#<s l<U92#<s l<U93#<s l<U94#<s l<U95#<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U96#<s l<U97#<s l<U98#<s l<U99#<s l<U100<s l<U101<s l<U102<s l<U103<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U104<s l<U105<s l<U106<s l<U107<s l<U108<s l<U109<s l<U110<s l<U111<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U112<s l<U113<s l<U114<s l<U115<s l<U116<s l<U117<s l<U118<s l<U119<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


   T###     T###     T###     T###     T###     T###     T###     T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U120<s l<U121<s l<U122<s l<U123<s l<U124<s l<U125<s l<U126<s l<U127<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210

`, 'aluall1');



registerCircuit('All supported ALU ops (2-input signed)', `

0"This lists all possible signed ALU ops, with 2 inputs attached, even for"
0"operators that don't exist or normally take 1 input."

  1T### 1T###
   ^^^^  ^^^^
   3210  7654
   gggg  gggg
   ssss  ssss
  "8421  8421"
  "   A     B"


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U128#####<s l<U129#####<s l<U130#####<s l<U131#####<s l<U132#####<s l<U133#####<s l<U134#####<s l<U135#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U136#####<s l<U137#####<s l<U138#####<s l<U139#####<s l<U140#####<s l<U141#####<s l<U142#####<s l<U143#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U144#####<s l<U145#####<s l<U146#####<s l<U147#####<s l<U148#####<s l<U149#####<s l<U150#####<s l<U151#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U152#####<s l<U153#####<s l<U154#####<s l<U155#####<s l<U156#####<s l<U157#####<s l<U158#####<s l<U159#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U160#####<s l<U161#####<s l<U162#####<s l<U163#####<s l<U164#####<s l<U165#####<s l<U166#####<s l<U167#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U168#####<s l<U169#####<s l<U170#####<s l<U171#####<s l<U172#####<s l<U173#####<s l<U174#####<s l<U175#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U176#####<s l<U177#####<s l<U178#####<s l<U179#####<s l<U180#####<s l<U181#####<s l<U182#####<s l<U183#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U184#####<s l<U185#####<s l<U186#####<s l<U187#####<s l<U188#####<s l<U189#####<s l<U190#####<s l<U191#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U192#####<s l<U193#####<s l<U194#####<s l<U195#####<s l<U196#####<s l<U197#####<s l<U198#####<s l<U199#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U200#####<s l<U201#####<s l<U202#####<s l<U203#####<s l<U204#####<s l<U205#####<s l<U206#####<s l<U207#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U208#####<s l<U209#####<s l<U210#####<s l<U211#####<s l<U212#####<s l<U213#####<s l<U214#####<s l<U215#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U216#####<s l<U217#####<s l<U218#####<s l<U219#####<s l<U220#####<s l<U221#####<s l<U222#####<s l<U223#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U224#####<s l<U225#####<s l<U226#####<s l<U227#####<s l<U228#####<s l<U229#####<s l<U230#####<s l<U231#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U232#####<s l<U233#####<s l<U234#####<s l<U235#####<s l<U236#####<s l<U237#####<s l<U238#####<s l<U239#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U240#####<s l<U241#####<s l<U242#####<s l<U243#####<s l<U244#####<s l<U245#####<s l<U246#####<s l<U247#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       1T###         1T###         1T###         1T###         1T###         1T###         1T###         1T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U248#####<s l<U249#####<s l<U250#####<s l<U251#####<s l<U252#####<s l<U253#####<s l<U254#####<s l<U255#####<s
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


`, 'aluall2s');




registerCircuit('All supported ALU ops (1-input, signed)', `

0"This lists all possible signed ALU ops, with 1 input attached, even for operators"
0"that don't exist or normally take 2+ inputs."

  1T###
   ^^^^
   3210
   gggg
   ssss
  "8421"
  "   A"



  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U128<s l<U129<s l<U130<s l<U131<s l<U132<s l<U133<s l<U134<s l<U135<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U136<s l<U137<s l<U138<s l<U139<s l<U140<s l<U141<s l<U142<s l<U143<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U144<s l<U145<s l<U146<s l<U147<s l<U148<s l<U149<s l<U150<s l<U151<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U152<s l<U153<s l<U154<s l<U155<s l<U156<s l<U157<s l<U158<s l<U159<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U160<s l<U161<s l<U162<s l<U163<s l<U164<s l<U165<s l<U166<s l<U167<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U168<s l<U169<s l<U170<s l<U171<s l<U172<s l<U173<s l<U174<s l<U175<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U176<s l<U177<s l<U178<s l<U179<s l<U180<s l<U181<s l<U182<s l<U183<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U184<s l<U185<s l<U186<s l<U187<s l<U188<s l<U189<s l<U190<s l<U191<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U192<s l<U193<s l<U194<s l<U195<s l<U196<s l<U197<s l<U198<s l<U199<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U200<s l<U201<s l<U202<s l<U203<s l<U204<s l<U205<s l<U206<s l<U207<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U208<s l<U209<s l<U210<s l<U211<s l<U212<s l<U213<s l<U214<s l<U215<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U216<s l<U217<s l<U218<s l<U219<s l<U220<s l<U221<s l<U222<s l<U223<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U224<s l<U225<s l<U226<s l<U227<s l<U228<s l<U229<s l<U230<s l<U231<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U232<s l<U233<s l<U234<s l<U235<s l<U236<s l<U237<s l<U238<s l<U239<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U240<s l<U241<s l<U242<s l<U243<s l<U244<s l<U245<s l<U246<s l<U247<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  1T###    1T###    1T###    1T###    1T###    1T###    1T###    1T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U248<s l<U249<s l<U250<s l<U251<s l<U252<s l<U253<s l<U254<s l<U255<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210

`, 'aluall1s');





registerCircuit('All supported ALU ops (2-input float)', `

0"This lists all possible signed ALU ops, with 2 inputs attached, even for"
0"operators that don't exist or normally take 1 input."

  2T### 2T###
   ^^^^  ^^^^
   3210  7654
   gggg  gggg
   ssss  ssss
  "8421  8421"
  "   A     B"


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U256#####<s l<U257#####<s l<U258#####<s l<U259#####<s l<U260#####<s l<U261#####<s l<U262#####<s l<U263#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U264#####<s l<U265#####<s l<U266#####<s l<U267#####<s l<U268#####<s l<U269#####<s l<U270#####<s l<U271#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U272#####<s l<U273#####<s l<U274#####<s l<U275#####<s l<U276#####<s l<U277#####<s l<U278#####<s l<U279#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U280#####<s l<U281#####<s l<U282#####<s l<U283#####<s l<U284#####<s l<U285#####<s l<U286#####<s l<U287#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U288#####<s l<U289#####<s l<U290#####<s l<U291#####<s l<U292#####<s l<U293#####<s l<U294#####<s l<U295#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U296#####<s l<U297#####<s l<U298#####<s l<U299#####<s l<U300#####<s l<U301#####<s l<U302#####<s l<U303#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U304#####<s l<U305#####<s l<U306#####<s l<U307#####<s l<U308#####<s l<U309#####<s l<U310#####<s l<U311#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U312#####<s l<U313#####<s l<U314#####<s l<U315#####<s l<U316#####<s l<U317#####<s l<U318#####<s l<U319#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U320#####<s l<U321#####<s l<U322#####<s l<U323#####<s l<U324#####<s l<U325#####<s l<U326#####<s l<U327#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U328#####<s l<U329#####<s l<U330#####<s l<U331#####<s l<U332#####<s l<U333#####<s l<U334#####<s l<U335#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U336#####<s l<U337#####<s l<U338#####<s l<U339#####<s l<U340#####<s l<U341#####<s l<U342#####<s l<U343#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U344#####<s l<U345#####<s l<U346#####<s l<U347#####<s l<U348#####<s l<U349#####<s l<U350#####<s l<U351#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U352#####<s l<U353#####<s l<U354#####<s l<U355#####<s l<U356#####<s l<U357#####<s l<U358#####<s l<U359#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U360#####<s l<U361#####<s l<U362#####<s l<U363#####<s l<U364#####<s l<U365#####<s l<U366#####<s l<U367#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U368#####<s l<U369#####<s l<U370#####<s l<U371#####<s l<U372#####<s l<U373#####<s l<U374#####<s l<U375#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


       2T###         2T###         2T###         2T###         2T###         2T###         2T###         2T###
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
        llll          llll          llll          llll          llll          llll          llll          llll
        ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^          ^^^^
 l<U376#####<s l<U377#####<s l<U378#####<s l<U379#####<s l<U380#####<s l<U381#####<s l<U382#####<s l<U383#####<s
   #########     #########     #########     #########     #########     #########     #########     #########
   ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^     ^^^^ ^^^^
   gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg     gggg gggg
   3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654     3210 7654


`, 'aluall2f');


registerCircuit('All supported ALU ops (1-input, float)', `

0"This lists all possible signed ALU ops, with 1 input attached, even for operators"
0"that don't exist or normally take 2+ inputs."

  2T###
   ^^^^
   3210
   gggg
   ssss
  "8421"
  "   A"



  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U256<s l<U257<s l<U258<s l<U259<s l<U260<s l<U261<s l<U262<s l<U263<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U264<s l<U265<s l<U266<s l<U267<s l<U268<s l<U269<s l<U270<s l<U271<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U272<s l<U273<s l<U274<s l<U275<s l<U276<s l<U277<s l<U278<s l<U279<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U280<s l<U281<s l<U282<s l<U283<s l<U284<s l<U285<s l<U286<s l<U287<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U288<s l<U289<s l<U290<s l<U291<s l<U292<s l<U293<s l<U294<s l<U295<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U296<s l<U297<s l<U298<s l<U299<s l<U300<s l<U301<s l<U302<s l<U303<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U304<s l<U305<s l<U306<s l<U307<s l<U308<s l<U309<s l<U310<s l<U311<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U312<s l<U313<s l<U314<s l<U315<s l<U316<s l<U317<s l<U318<s l<U319<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U320<s l<U321<s l<U322<s l<U323<s l<U324<s l<U325<s l<U326<s l<U327<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U328<s l<U329<s l<U330<s l<U331<s l<U332<s l<U333<s l<U334<s l<U335<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U336<s l<U337<s l<U338<s l<U339<s l<U340<s l<U341<s l<U342<s l<U343<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U344<s l<U345<s l<U346<s l<U347<s l<U348<s l<U349<s l<U350<s l<U351<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U352<s l<U353<s l<U354<s l<U355<s l<U356<s l<U357<s l<U358<s l<U359<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U360<s l<U361<s l<U362<s l<U363<s l<U364<s l<U365<s l<U366<s l<U367<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U368<s l<U369<s l<U370<s l<U371<s l<U372<s l<U373<s l<U374<s l<U375<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210


  2T###    2T###    2T###    2T###    2T###    2T###    2T###    2T###
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   llll     llll     llll     llll     llll     llll     llll     llll
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
 l<U376<s l<U377<s l<U378<s l<U379<s l<U380<s l<U381<s l<U382<s l<U383<s
   ####     ####     ####     ####     ####     ####     ####     ####
   ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^     ^^^^
   gggg     gggg     gggg     gggg     gggg     gggg     gggg     gggg
   3210     3210     3210     3210     3210     3210     3210     3210

`, 'aluall1f');


registerCircuit('8-bit 1-input ALU tester', `

0"u=unsigned (default), s=signed, f=floating point"


   llllllll
   ^^^^^^^^
  0T#######"u"
   ^^^^^^^^
  1T#######"s"
   ^^^^^^^^
  2T#######"f"
   ^^^^^^^^
 l<########<s
   ########
   ########<0=
   ########<1=
   ########<2=
   ########<3=
   ########<4=
   ########<5=
   ########<6=============
   ########<--s"s" 6543210
   U0######<--s"f" T######"opindex"
   ^^^^^^^^
  0T#######"u"
   ^^^^^^^^
  1T#######"s"
   ^^^^^^^^
  2T#######"f"
   ^^^^^^^^
   ssssssss


`, 'alutest8_1');


registerCircuit('32-bit 1-input ALU tester', `

0"u=unsigned (default), s=signed, f=floating point"


   llllllllllllllllllllllllllllllll
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  0T###############################"u"
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  1T###############################"s"
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  2T###############################"f"
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 l<################################<s
   ################################
   ################################<0=
   ################################<1=
   ################################<2=
   ################################<3=
   ################################<4=
   ################################<5=
   ################################<6=============
   ################################<--s"s" 6543210
   U0##############################<--s"f" T######"opindex"
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  0T###############################"u"
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  1T###############################"s"
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  2T###############################"f"
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   ssssssssssssssssssssssssssssssss


`, 'alutest32_1');


registerCircuit('8-bit 2-input ALU tester', `

0"u=unsigned (default), s=signed, f=floating point"


            llllllll
            ^^^^^^^^
           0T#######"u"
            ^^^^^^^^
           1T#######"s"
            ^^^^^^^^
           2T#######"f"
            ^^^^^^^^
 l<#################<s
   #################
   #################<0=
   #################<1=
   #################<2=
   #################<3=
   #################<4=
   #################<5=
   #################<6=============
   #################<--s"s" 6543210
   U0###############<--s"f" T######"opindex"
   ^^^^^^^^ ^^^^^^^^
  0T#######0T#######"u"
   ^^^^^^^^ ^^^^^^^^
  1T#######1T#######"s"
   ^^^^^^^^ ^^^^^^^^
  2T#######2T#######"f"
   ^^^^^^^^ ^^^^^^^^
   ssssssss ssssssss


`, 'alutest8_2');


registerCircuit('32-bit 2-input ALU tester', `

0"u=unsigned (default), s=signed, f=floating point"


                                    llllllllllllllllllllllllllllllll
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                   0T###############################"u"
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                   1T###############################"s"
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                   2T###############################"f"
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 l<#################################################################<s
   #################################################################
   #################################################################<0=
   #################################################################<1=
   #################################################################<2=
   #################################################################<3=
   #################################################################<4=
   #################################################################<5=
   #################################################################<6=============
   #################################################################<--s"s" 6543210
   U0###############################################################<--s"f" T######"opindex"
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  0T###############################0T###############################"u"
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  1T###############################1T###############################"s"
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  2T###############################2T###############################"f"
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   ssssssssssssssssssssssssssssssss ssssssssssssssssssssssssssssssss


`, 'alutest32_2');


registerTitle('Front Page');


registerCircuit('Welcome', introText, introId);

registerCircuit('Help Index', `
0"# Logicemu Help"

0"Logicemu is a cell-based logic emulator. To learn more details, see the"
0"various help-circuits below."

0"If this is your first time, the first one ('Main Help') is recommended."


"INSERT:links_help"

`, 'helpindex');

registerCircuit('Main Index', `
0"List of main circuits."


"INSERT:links_main"

`, 'mainindex');
