/*
LogicEmu
Copyright (C) 2018 by Lode Vandevenne

Help-file circuits for viewing and editing.
*/
registerCircuitGroup('help');

registerCircuit('Welcome', introText);

registerCircuit('Basic Help', `
0"LogicEmu Basic Help"
0"-------------------"

0"This basic help introduces the main subset of all the possible parts."
0"See the full help to also get the more specialized parts."

0"First of all, what is LogicEmu? It emulates logic circuits. It has a whole"
0"bunch of circuits included to play with, including binary adders, multipliers,"
0"flip-flops, NAND-only logic, and so on."

0"LogicEmu also allows creating new circuits, see the editing tutorials"
0"for more on that."

0"What is different from many other logic simulators it that this one is"
0"cell-based. This has as a side effect that the notation is not standard"
0"notation. On the other hand, this has as advantage that a lot of logic"
0"fits on a single screen and it's quite flexible. Also, each cell is an"
0"ASCII character, which has advantages for editing and sharing circuits."

0"Another aspect is, it's a logic emulator, but not an electrical simulator."
0"Power sources and voltages are abstracted away. Every component (gates, LEDs, even switches)"
0"implicitely have two connections to a power source with positive voltage and ground terminals,"
0"but this is not shown. The only wires shown are signals between components,"
0"which are always either 0 (implicitely 'ground') or 1 (implicitely 'positive voltage')."

0"The rest of this help file explains how to view and interact with circuits,"
0"by explaining the meaning of all the symbols. There are also yet more other"
0"help files for other topics like emulation algorithms and render modes."

0"Note that this tutorial is multiple screens long, so scroll down to see all"

0"Input/Output/Wires"
0"------------------"

0"In general, a circuit has input switches, some processing logic, possibly"
0"some state, and finally output LEDs. So the simplest circuit has a switch"
0"and a LED. Toggle the switch (s) with the mouse to toggle the LED (l)".

s****>l

0"There are in fact 4 types of cells visible in the above circuit:"

s  0": the input switch which can be toggled with the mouse to output 0 or 1"

** 0": wire which connects things"

>  0": arrowhead: input from the wire to the LED"

l  0": the output LED"

0"A 'p' is a push button instead of a switch:"

p****>l

0"Wires can split or cross:"

0"Wire split:"

    l
    ^
    *
    *
s******>l
    *
    *
    v
    l

0"Wire crossing:

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

s*** **>l
    x
s*** **>l

0"Diagonal wire crossing in the arrowhead itself (causing 2 diagonal crossing inputs):"

s****** l
       >
s****** l

0"Logic Gates"
0"-----------"

0"Actual logic can be done with logic gates. AND, OR and XOR gates are"
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

0"There also exist negated inputs. Normal inputs are indicated with an"
0"arrow head, negated inputs instead with a little circle (or in text"
0"mode, that is m]w[ for NESW respectively):"

s**]l

0"For example logic gates can get negated inputs that way:"

s**]a***>l
    ^
s****

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

0"Sequential Logic"
0"----------------"

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

0"Combined with flip-flop parts 'd', 't', 'j', 'k', 'q' or 'Q', the 'c'"
0"acts as the clock of an entire flip-flop instead. Here, d is D-input"
0"for D-flip-flop, t the T-input for T-flip-flop, J and K the inputs for"
0"either SR or JK flip-flop, q an output as well as asynch set, Q"
0"inverted output as well as asynch reset. Most other parts than q and Q"
0"will also output signal so using q and Q is not required for that."
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

0"A single loose d instead acts as a single-tick delay"

s**>d**>l

s**>d**>d**>d**>d**>l

0"Epilogue"
0"--------"

0"And that is all for this basic help! Other parts exist, such"
0"as colored LEDs, integrated circuits (reusable templates), wire bundles,"
0"interactive terminals, ROMs, etc... but these are in the full help."
0"However, in theory those are not needed, since all these things (except"
0"the visual/interactive things like colored LEDs) can already be built"
0"with the above parts."

0"Also check other help tutorials for such explanations as the graphic"
0"modes, the updater algorithms, and how to edit your own circuits"


0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`);

registerCircuit('Full Help', `
0"LogicEmu Full Help"
0"------------------"

0"This is the full help for viewing with LogicEmu. This one explains all"
0"parts unlike the basic help. However this one still does not explain"
0"the editing, for that see the basic and full editing tutorials."

0"First of all, what is LogicEmu? It emulates logic circuits. It has a whole"
0"bunch of circuits included to play with, including binary adders, multipliers,"
0"flip-flops, NAND-only logic, and so on."

0"LogicEmu also allows creating new circuits, see the editing tutorials"
0"for more on that."

0"What is different from many other logic simulators it that this one is"
0"cell-based. This has as a side effect that the notation is not standard"
0"notation. On the other hand, this has as advantage that a lot of logic"
0"fits on a single screen and it's quite flexible. Also, each cell is an"
0"ASCII character, which has advantages for editing and sharing circuits."

0"Another aspect is, it's a logic emulator, but not an electrical simulator."
0"Power sources and voltages are abstracted away. Every component (gates, LEDs, even switches)"
0"implicitely have two connections to a power source with positive voltage and ground terminals,"
0"but this is not shown. The only wires shown are signals between components,"
0"which are always either 0 (implicitely 'ground') or 1 (implicitely 'positive voltage')."

0"The rest of this help file explains how to view and interact with circuits,"
0"by explaining the meaning of the most important symbols. There are also yet more other"
0"help files for other topics like the extended symbols, emulation algorithms and render modes."

0"Note that this tutorial is multiple screens long, so scroll down to see all"

0"Switches, wires and LEDs"
0"------------------------"

0"Switches, indicated with 's', can be toggled on and off with the mouse"
0"Wires connect switches to LEDs"
0"LEDs, indicated with 'l', go on when they receive signal from the wire"
0"Click the switches to see the corresponding LEDs"


s--------------->l

    ************
    *          *
s****          v
               l


      l
     ^
    /
   /
  /
 /
s

0"As you can see, the electrical circuits above are not closed. That is"
0"because we only simulate the logic here. Power sources and closing of"
0"the electrical circuit are implicit"

0"This switch is a simple component here, but in real life it would actually be"
0"quite involved: it needs a pullup/pulldown resistor (or be a SPDT switch)"
0"to toggle between the two voltages (and not float), and needs a"
0"debounding circuit."

0"Wires can cross or split. If they cross, the signals don't interfere."


    s            l     l
    |             ^   ^
    |              ; /
s---+--->l          x
    |              / ;
    v             /   ;
    l            s     s

0"If the wire splits, indicated with a little dot at the split point,"
0"then the signal is connected to all wires, and multiple devices can"
0"be activated from a single input"

    l
    ^
    |
s---*--->l
    |
    v
    l

0"Push buttons, indicated with 'p', are similar to switches, but they"
0"are only on as long as the mouse is held down on them"


p------>l

0"LEDs can also come in various different colors (using numeric digits)"


s--------------->l0

s--------------->l2

s--------------->l3

s--------------->l4

0"Logic Gates"
0"-----------"

0"The 'AND', 'OR' and 'XOR' gates are indicated with 'a', 'o' and 'e'"
0"respectively"

s---v
    a---->l
s---^

s---v
    o---->l
s---^

s---v
    e---->l
s---^

0"The 'NAND', 'NOR' and 'XOR' gates are indicated with 'A', 'O' and 'E'"
0"respectively. So the capital letters mean negated output"


s---v
    A---->l
s---^

s---v
    O---->l
s---^

s---v
    E---->l
s---^

0"A 'NOT' gate can be made with a single-input 'O'"

s--->O--->l

0"Gates can have less or more inputs than 2 and can be bigger to have"
0"space for more inputs"


s---->o---->l

      a---->l 0"inputless AND gate is on (empty product)"

s----v
s--->a----->l
s----^

s--->###
s--->###
s--->#e#---->l
s--->###
s--->###

0"Negated inputs to gates can be used as well. These are indicated with"
0"a little circle instead of an arrowhead (in text mode, with characters"
0"m]w[ instead of ^>v<). These negated inputs invert the signal before"
0"it enters the gate."

s--]o-->l
    ^
s---*

s-->a-->l
    m
s---*

0"NOTE: In real life electronics, logic gates normally don't have such"
0"easy way of negating inputs and invertors are needed. In real life,"
0"what you will see more often, is circuits where a regular and a negated"
0"version of a signal runs through the whole system, like so:"

                   l
                   ^
                **>o<**
                *     *
                a<*   a<*
                ^ *   ^ *
       %>O------*-+---+-+----- "...A'"
 "A"s--*----------+---*-+----- "...A"
       %>O--------+-----*----- "...B'"
 "B"s--*----------*----------- "...B"

0"Tri-state buffers, incicated with 'V' (that is capital V), can all"
0"output to the same wire. Our simulation does NOT support three states,"
0"but the tri-state buffer's behavior tries to be as close to real-life"
0"as possible. All tri-state buffers can output their signal to the wire,"
0"but you should have only one active at the time. Multiple active at"
0"the same time would create a short in real life, but that is not simulated"
0"here (in the example below, since each tristate has a push button, the"
0"error condition would occur if you pressed multiple push buttons at the"
0"same time)"

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
0"One solution would be to OR them, but you can also use the 'V' instead simply to indicate:"
0"in real life, no gate is needed here. It has the same effect in the simulation, but the notation"
0"indicates the intended meaning better."

    s           s            s
    *           *            *
    *           v            *0"this one indictes error, but in real life this can be"
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
0"wires together) instead of the OR"


0"Flip-Flops and Memory"
0"---------------------"

0"The 'counter' gate, indicated with 'c', acts like a 1-input T flip-flop"
0"It will change its state whenever the input goes from low to high"

s--->c--->l

     l    l    l    l
     ^    ^    ^    ^
     |    |    |    |
s--->c--->c--->c--->c

0"Real ideal flip-flops are made from 'c', 'd', 'j', 'k', 't', 'q' and 'Q'"
0"Here is how to interpret each letter:"
0"c: the clock input. When the clock input goes from low to high the flip-flop"
0"   will toggle if needed"
0"j: the S input for SR flip-flop or the J input for JK flip-flop"
0"k: the R input for SR flip-flop or the K input for JK flip-flop"
0"d: the D input for D flip-flop"
0"t: the T input for T flip-flop"
0"q: output, or asynchronous S input. Note that c, j, k, d and t can also already"
0"   be used as outputs"
0"Q: negated output, or asynchronous R input"

        p
        v
 s---->jq----->l
 s---->k#
 s---->cQ
        ^
        p

 s---->t----->l
 s---->c

 s---->d----->l
 s---->c

 s---->q----->l
 s---->Q----->l

0"A ROM, indicated with 'b' for off and 'B' for ON bits, can contain"
0"binary information. The mouse can toggle b's"

           lllll
           ^^^^^
  0"select"|||||
    s----->bbBbB
    s----->bBBbB
    s----->BbbbB
    s----->BbBbB
    s----->bBBbB


0"A RAM is like a writable ROM:"

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

0"A ROM and RAM can use binary addressing instead of unary select. A"
0"RAM can also have invisible bits this way. This RAM has 16 lines."
0"The invisible ones are initially zero but it will remember once you write 1 bits"
0"to them"

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
           sssss0"data"

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
     l<****o<a e%*****s
           ^ ^^^|
           a e *%
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

s--->d--->l


s--->d--->d--->d--->d--->l

0"A timer blinks with a certain speed. It can also be toggled on and off with the mouse."
0"The speed is given in tenths of a second (default if none is given is 0.5 seconds to toggle)."

 10R------>l


  2R------>l


  5R------>l

0"A small r means it's initially not on and must be toggled on with mouse"


  5r------>l

0"An RGB LED takes a red, green and blue input:"

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

0"A ? is a random generator. It will change to a random value on any positive"
0"or negative edge of the input and have a random initial value."

?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l

s-->?-->l

R-->?-->l
1


0"Special wires"
0"-------------"

0"Buses are a bundle of wires. Matching numbers of the bus connect to"
0"corresponding inputs and outputs"


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
0"used e.g. for a global clock signal. Imagine it as being connected by"
0"wires on the backplane"

                g----->l

s---g           g----->l

s---g0         1g----->l

s---g1         0g----->l

                g----->l



0"Antennas are another form of 'backplane' wires, connected to the 'dish'"
0"they're aimed at. You do not have to see these as wireless signals."
0"These provide another way to reduce clutter, and are especially useful"
0"for large wrap-around circuits."

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
0"the different tick algorithms, rendering modes, ..."

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

"RENDER:graphical"

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`);


registerCircuit('Ticks and Emulation Algorithms', `
0"The simulation is based on ticks: Each tick, components update their"
0"value based on their input components. Normally, the ticks run"
0"automatically. You can pause the simulation by pressing the pause"
0"button. If the simulation is paused, you can do a single tick with the"
0"tick button. If the simulation is not paused, ticks happen automatically"
0"every so many milliseconds. If there are realtime timers in the circuit,"
0"those will also cause a tick whenever they toggle. Clicking switches"
0"and pushbuttons with the mouse will also give an immediate tick, even"
0"if the simulation is paused."

0"Note that if the simulation is paused, and you press a switch or pushbutton,"
0"it may happen that you don't see the full effect you expected of your click."
0"This happens if multiple ticks are needed to update all due to gate delays"
0"while clicking a switch causes only one tick if the simulation is paused."
0"Press the tick button a few times, or unpause, or choose a different emulation"
0"algorithm (see below) to fix that."

0"There are different emulation algorithms available for circuits (aka update modes,"
0"what it does per tick). These can be selected by the dropdown with the following choices:"
0"*) combinational: a single update propagating through all components is done only when you"
0"   press a switch or button. This mode is good for circuits where the output state is"
0"   determined completely and only by the input switch states, without loops, such as"
0"   adders or multipliers."
0"*) sequential: an update propagating through all components is done automatically every"
0"   so many milliseconds. This mode is good for circuits where the output state is determined"
0"   not only by input switches but also by memory state, such as registers or CPUs."
0"*) electron: updates are done every so many milliseconds, but this update is different than"
0"   the update done for combinational/sequential. Instead, every component updates only based"
0"   on the previous state of its input components. This means signals propagage more slowly,"
0"   as if you can follow the electric signal itself. This mode is good for circuits that"
0"   build flip-flops from primitive components (rather than using the built-in ideal flip-flops)"
0"*) investigate: similar to electron, but it only updates when you press the tick button,"
0"   which allows to see how everything updates at any pace. Note that investigate is to electron"
0"   mode what combinational is to sequential mode. You can use combinational mode as a way to"
0"   investigate sequential circuits"

0"A circuit, when just loaded, will automatically be in one of the modes that is most suitable"
0"for the circuit: if there are no flipflops or loops, it'll choose combinational mode. If"
0"there are particular types of short loops, electron mode. If c's are present, sequential"
0"mode. A mode may also be enforced with a comment like this, which in this circuit sets it"
0"to sequential initially:"

0"MODE:sequential"

0"Now for some demonstrations of the difference between the modes. Use the"
0"dropdown to switch to the algorithm applicable for each example as explained"
0"by its description:"

0"With the circuit below, try the 4 modes: with combinational and sequential,"
0"the LED updates immediately to the state of the switch. With electron, you can"
0"see the signal propagate through the gates. With investigate, you must manually"
0"press the tick button to have the signal propagate through each gate"

s->o->o->o->o->o->o->o->o->l

0"The circuit below goes slow in sequential mode too, because 'd' are delays"
0"which are designed to work per sequential tick on purpose. In combinational"
0"mode, you now have to press the tick button (or the 's') manually multiple"
0"times to make it advance now since combinational does only one update when"
0"you press the switch:"

s->d->d->d->d->d->d->d->d->l

0"A circuit which has multiple premade flip-flops, like any 'c' gate or the bigger"
0"ones made from cjktdqQ, really need 'sequential' mode to operate properly."
0"For example this 8-bit counter will update properly when you push the button"
0"in sequential mode, but in combinational mode you have to press 'tick' up to 8 times."
0"This because flip-flops will only update based on the previous state of their"
0"input flip-flops. In fact, flip-flops do in sequential/combinational mode, what"
0"primitive gates do in electron/investigate mode"

  "1  2  4  8  16 32 64 128"
   l  l  l  l  l  l  l  l
   m  m  m  m  m  m  m  m
   |  |  |  |  |  |  |  |
s->C->C->C->C->C->C->C->C

0"Below is a 4-bit adder circuit. A circuit like this works in combinational mode"
0"and does not need the more expensive sequential mode. Try it in all 4 modes to"
0"see what happens: combinational and sequential work the same. Electron gives"
0"slower updates so you can see the adder operating but it'll reach the correct"
0"answer soon. Investigate requires pressing tick several times yourself before"
0"you get the correct sum:"

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



0"Here is a circuit that shows the most interesting behavior in electron"
0"mode. The two NOR gates each want the opposite, so the circuit keeps"
0"blinking. If you enable the switch, you end the conflict. You may notice"
0"that when enabling the switch, the circuit 'settles' for a while and then"
0"ends up at a random result (enable electron mode to see it, try a few times and"
0"it'll settle to different random results). This random result does not depend"
0"purely on the time you press the switch. There is some true randomness built in"
0"the simulation (only in electron mode) to resolve this circuit. This circuit"
0"here just demonstrates it. The real purpose of this feature is to make flip-flops"
0"made from primitive gates to work as they do in real life. Without the random"
0"settling, such flip-flops would not work but keep blinking between two states."
0"But in real life, such ideal behavior does not happen and the flip-flops settle"
0"to some arbitrary state, and that is emulated with the randomness here"
0"too."

          O-*
          ^ |
  s------>e<*--->l
          v |
          O<*

0"The randomness is not present in combinational or sequential mode. Due to the"
0"way those algorithms work, such loopy circuits settle to a well defined state"
0"immediately. The electron mode is physically more realistic, but slower."


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
0"FIT:x"

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`);



registerCircuit('Rendering Modes', `
0"There are two rendering modes: text (ASCII) and graphical (HTML5 canvas)."
0"They can be selected with a dropdown in the top menu. The graphical"
0"mode draws nice wires, boxes around components, regular inputs as"
0"neatly drawn arrows and negated inputs as little circles. The ASCII"
0"mode on the other hand draws everything with ASCII characters, with"
0"similar letters used for components, but various other"
0"symbols for different types of wire connections and inputs. To"
0"learn the meaning of these, see the editing tutorials instead."
0"Normally the graphical mode is easiest to use, but on huge circuits"
0"it may be too slow, and in some browsers automatically select the"
0"ASCII mode"

0"BROWSER NOTE: Currently the graphics mode is fast in chrome but slow in some"
0"other browsers, so for very large circuits it will automatically change"
0"to text mode in those browsers. The reason is: every cell uses its own"
0"little HTML5 canvas, and for Chrome that seems to be no problem while"
0"for firefox each little canvas appears to have a big overhead to create it."

0"Try out the two modes on the circuit below"

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

0"You can also zoom in and out with the - and + buttons"

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`);


registerTitle('Editing');


registerCircuit('Basic Editing Tutorial', `

0"This basic editing tutorial only introduces the basic parts."
0"See the full editing tutorial for explanations of all the parts,"
0"including fancy ones or ones that are for compactness only."

0"Note that for the editing tutorial, 'text' rendering mode is enabled"
0"by default, but you can still manually change it to 'graphics' mode."

0"Editing"
0"-------"

0"Editing is done with ASCII text. The simulation is cell based: Every"
0"character is a cell. Cells contain wires, parts, and so on. Devices"
0"can span multiple cells, e.g. a long wire, an enlarged AND gate, ..."

0"Editing can be done in this browser based application with the 'edit'"
0"button. However, it is advised to do the actual editing itself in a"
0"good text editor, one that supports block selection to allow copypasting"
0"rectangular parts of the circuit rather than just lines. Then paste the"
0"finished circuit in this browser based application to try it out"

0"Try it out here: You can change the AND gate below into an OR gate,"
0"by turning the 'a' into an 'o'. Press the edit button, find this"
0"and gate in it, change the a into an o, and press 'done'."

s**>a**>l
    ^
s****

0"Once you edited a map, it is saved in local storage in your browser"
0"(but not sent to the internet nor shared, it's just local on your machine). Everytime"
0"you reload the page you will see your last edited circuit. To get rid"
0"of that and see the default instead, save an emtpy string with the"
0"edit tool, that is, select all and press delete."

0"Input/Output/Wires"
0"------------------"

0"Almost all circuits have devices, connected to each other with wires with arrowheads."
0"Devices are: inputs (switches/buttons), gates (AND, OR, ...), states (flip flops, ...),"
0"outputs (LEDs, ...) and various fancy parts. Wires make the connections between"
0"devices, with the arrowhead showing the direction of the connection. The arrowhead"
0"is also called a 'device input' (not to be confused with a switch which is a 'user input'),"
0"because it is attached to a device that sees this wire as an input."
0"Wires can also take various advanced and fancy forms (busses, backplane, ...)"
0"but not in this reduced tutorial, here we only see the basic wires."

0"The most simple circuit that does something looks like this (a switch connected to a LED):"

s****>l

0"There are in fact 4 types of cells visible in the above circuit:"

s  0": the input switch which can be toggled with the mouse"

** 0": wire which connects things"

>  0": arrowhead: input from the wire to the LED. For other diretions, use ^>v< for north, east, south, west respectively"

l  0": the output LED"

0"A 'p' is a push button instead of a switch:"

p****>l

0"Wires can split or cross:"

0"Wire split:"

    l
    ^
    *
    *
s******>l
    *
    *
    v
    l

0"Wire crossing:

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

s*** **>l
    x
s*** **>l

0"Diagonal wire crossing in the arrowhead itself (causing 2 diagonal crossing inputs):"

s****** l
       >
s****** l

0"Logic Gates"
0"-----------"

0"Actual logic can be done with logic gates. AND, OR and XOR gates are"
0"represented with the letters a, o and e respectively (e stands for"
0"exclusive or)"

s**>a**>l
    ^
s****

s**>o**>l
    ^
s****

s**>e**>l
    ^
s****

0"Inverted gates NAND, NOR and XNOR are indicated with capital letters"
0"instead of small letters. Respectively A, O and E."

s**>A**>l
    ^
s****

s**>O**>l
    ^
s****

s**>E**>l
    ^
s****

0"A simple NOT gate can be done with O with a single input, but see further"
0"for the other option of negated inputs."

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

0"There also exist negated inputs. Normal inputs are wone with ^>v<, but"
0"negated inputs are done with m]w[ for north, each, south, west respectively"

s**]l

0"Logic gates and LEDs can get negated inputs that way:"

s**]a***>l
    ^
s****

s****]l

0"To make gates with more than 3 inputs, their size can be increased"
0"with a # character:"

s**>e**>l
    #
s**>#
    #
s**>#
    #
s**>#

0"An example of combining multiple logic gates: The full adder. Note"
0"the way the diagonal-crossing inputs are used to have two inputs for"
0"each a and e gate:"


s**>a**>o**>l
   >    ^
s**>e**>a
       >
s******>e**>l

0"Sequential Logic"
0"----------------"

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

0"Combined with flip-flop parts 'd', 't', 'j', 'k', 'q' or 'Q', the 'c'"
0"acts as the clock of an entire flip-flop instead. Here, d is D-input"
0"for D-flip-flop, t the T-input for T-flip-flop, J and K the inputs for"
0"either SR or JK flip-flop, q an output as well as asynch set, Q"
0"inverted output as well as asynch reset. Most other parts than q and Q"
0"will also output signal so using q and Q is not required for that."
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

0"A single loose d instead acts as a single-tick delay"

s**>d**>l

s**>d**>d**>d**>d**>l

0"Epilogue"
0"--------"

0"And that is all for this reduced set tutorial! Other parts exist, such"
0"as colored LEDs, integrated circuits (reusable templates), wire bundles,"
0"interactive terminals, ROMs, etc... but these are in the full help."
0"However, in theory those are not needed, since all these things (except"
0"the visual/interactive things like colored LEDs) can already be built"
0"with the above parts."

0"Also check other help tutorials for such explanations as the graphic"
0"modes, the updater algorithms, and how to edit your own circuits"

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

0"RENDER:text (for edit tutorials we force text mode at start. Manually select 'graphical' to see graphics mode)"
0"FIT:x"

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`);


registerCircuit('Full Editing Tutorial', `
0"This tutorial introduces all the characters for editing."

0"RENDER:text (for edit tutorials we force text mode at start. Manually select 'graphical' to see graphics mode)"

0"Editing is done with ASCII text. The simulation is cell based: Every"
0"character is a cell. Cells contain wires, parts, and so on. Devices"
0"can span multiple cells, e.g. a long wire, an enlarged AND gate, ..."

0"Editing can be done in this browser based application with the 'edit'"
0"button. However, it is advised to do the actual editing itself in a"
0"good text editor, one that supports block selection to allow copypasting"
0"rectangular parts of the circuit rather than just lines. Then paste the"
0"finished circuit in this browser based application to try it out"

0"Try it out here: You can change the AND gate below into an OR gate,"
0"by turning the 'a' into an 'o'. Press the edit button, find this"
0"and gate in it, change the a into an o, and press 'done'."

s**>a**>l
    ^
s****

0"Once you edited a map, it is saved in local storage in your browser"
0"(but not sent to the internet nor shared, it's just local on your machine). Everytime"
0"you reload the page you will see your last edited circuit. To get rid"
0"of that and see the default instead, save an emtpy string with the"
0"edit tool, that is, select all and press delete."
0"Scroll down to go through the full tutorial as it introduces more and more parts."

0"The rest of this tutorial describes all the different parts and ASCII characters"

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION I: wiring and logic"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"NEW PART: comments"

0"Comments are made with double quotes."
0"The comment starts at a quote and ends at the next quote on the same line."
0"A 0, 1 or 2 before the first double quote can also enable aligned text"
0"Below the 4 types of comments are shown. The quotes themselves are not"
0"visible in the rendering (not even in text mode), only in the source code."

"In quotes: regular comment, 1 character per cell"

0"In quotes with 0 prepended: left aligned narrow width"

1"In quotes with 1 prepended: center aligned narrow width"

2"In quotes with 2 prepended: right aligned narrow width"

0"NEW BEHAVIOR: force mode"

0"Optionally you can put a MODE: comment to enforce a certain update algorithm."
0"In fact the one below actually truly triggers that mode for this tutorial."
0"It's not necessary here as it already autochooses the correct mode for this"
0"circuit (sequential), but it's for demonstration (other options for MODE"
0"are combinational, electron and investigate)"

0"MODE:sequential"

0"NEW PART: isolators"

0"(space), @ and comments: isolators, do not connect anything, no signal goes through"
0"Normally space is used as isolators. @ can be used to indicate shapes, or in"
0"a rare case to connect things in IC templates (see later). Comments are also"
0"isolators, no matter what is inside them (even if commented-out circuits)"

@ @ @ @ @ @ @ @ @ @

0"NEW PART: horizontal and vertical wires"

0"*: wire, wire split, wire corner. They don't do much below since they're"
0"not connected to anything yet"

          *        ******
          *        *
*******   *    *****
          *        *
          *        ******

0"NEW PART: switches"

0"s: initially-off switch, S: initially-on switch. Switches can be toggled with"
0"the mouse. They produce a logic signal traveling through wires when on."
0"In real life this would make no sense, as an electrical circuit must be closed."
0"However, in this simulation, the circuit still is to be seen as closed, the"
0"power source and wiring to its anode and cathode are simply not drawn in the"
0"logic diagram, they are implicit."

0"Click the green switches with the mouse to toggle them"

          *
s******   *
          S

0"NEW PART: device inputs"

0">, v, <, ^: these arrow heads connect a wire to the input side of devices"
0"such as logic gates and LEDs (see further). Note that in the switch above"
0"there were no such arrow heads in the previous diagram with just switches:"
0"a wire connected directly to a device (like a switch) is an output, a wire"
0"connected with an arrow head is an input. We have not introduced gates and"
0"LEDs yet, but can slow what happens if you add an input to a switch: then"
0"the switch acts as a more traditional switch that leaves its input signal"
0"through when on, rather than creating a signal out of thin air"

s****>s****

0"NEW PART: LED"

0"l: LED/light (user output)"
0"Finally we can show a full logic circuit! All circuits above were only partial."
0"We consider a full logic circuit to be one that has switches as input, and LEDs"
0"as output."
0"This is the simplest possible logic circuit: the output state (the LED) has"
0"the same value as the input state (the switch)."
0"Again, remember that we leave out the power source and wiring to close the circuit,"
0"the electrical circuit is implicitely closed and we focus only on the logic."

s****>l   S****>l

0"NEW PART: push button"

0"p and P: push button: these toggle back to original state when releasing the mouse button"

p****>l   P****>l

0"This switch will only leave through the push button signal if the switch is on itself"

p**>s**>l

0"NEW PART: wire crossing"

0"+: wire crossing, allows two independent signals to go through"

     s
     *
     *
s****+****>l
     *
     *
     v
     l

0"x: diagonal wire crossing"

s**** ****>l
     x
s**** ****>l

0"NEW PARTS: logic gates OR, AND, XOR"

0"o: OR gate, a: AND gate, e: XOR gate"

s****      s****      s****
    v          v          v
s**>o**>l  s**>a**>l  s**>e**>l


0"NEW PARTS: logic gates NOR, NAND, XNOR"

0"O: NOR gate, A: NAND gate, E: XNOR gate"

s****      s****      s****
    v          v          v
s**>O**>l  s**>A**>l  s**>E**>l

0"NEW PARTS: inverted device inputs"

0"m, ], w, [: inverted device/gate inputs"

s----]l   S----]l

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
0"or a tri-state buffer (see further)"

s*****
     v
s***>o
     v
s***>o****>l

0"NEW BEHAVIOUR: wire and device packing"

0"NEW PART: packed wires"

0"-: horizontal wires, |: vertical wire"
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

0"NOTE: one could choose to use - and | instead of *, only using * for"
0"corners and splits. The reason most circuits included here use * anyway"
0"is for style: less different cell styles, and using * for"
0"most places (except buses and other packed wire situations) forces you to"
0"keep distance which will actually usually look nicer and easier to read."
0"Here is some of the less used alternative style:"

s----*---->l
     |            s-v      s--v
     *---->l        a->l   s->e->l
     |            s-^
     *---->l

0"NEW PART: device extender"

0"# extends the size of a device, for many-input logic gates, or large or specially shaped switches and LEDs"
0"Remember, devices like s, l, o, a, e that touch don't interact with each other"
0"when touching but work independently, so # is needed to extend its area instead"

lllll    lllll    lllll    ###
^^^^^    ^^^^^    ^^^^^    #l#
|||||    |||||    |||||    ###
o####    e####    e####     ^
^^^^^    ^^^^^    ^^^^^    ###
|||||    |||||    |||||    #s#
sssss    sssss    sssss    ###

0"NEW PART: noninteracting extender"

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

0"NEW PART: tri-state buffer"

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

0"NOTE: In real life, multiple tristate buffers should not be enabled at the"
0"same time. In the simulation here, if that happens no error is displayed"
0"simply because such error state is not implemented. When building circuits"
0"with those, try to build them as you would in real-life"

0"Multiple single-input 'V's can also be used to OR multiple wires together"
0"where in real life you would need no gate at all there or diodes would have"
0"sufficed. Again, the simulation cannot simulate that, connecting multiple"
0"wires from different devices together would result in an error. One solution"
0"would be to OR them, but you can also use the 'V' instead simply to indicate:"
0"in real life, no gate is needed here."
0"in real life, no gate is needed here."

    s           s            s
    *           *            *
    *           v            *0"here you see error, but this is what it represents in real life"
    v           V            *
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
0"wires together) instead of the OR"


0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION II: Flip-Flops And Memory"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"NEW PART: counter"

0"c as standalone: counter or mono-input T flip-flop. Whenever the input toggles on,"
0"the c changes its state, so its output toggles at half the rate as the input."
0"capital C starts in on state instead of off state, other than that behaves the same."

s**>c**>l     s**>C**>l

0"This can make a binary counter, although it counts backwards in this simple form"

s**>c**>c**>c**>c**>c**>c**>c**>c**>l

s**>C**>C**>C**>C**>C**>C**>C**>C**>l

0"NEW PARTS: flip flop parts"

0"c, j, k, d, t, q, Q: flip-flop parts (clocked with c). combine them freely."
0"j, k, d and t are inputs for JK, T, D, and SR flip-flops."
0"c is the clock input and what stores the state. use C to have it initially on."
0"q and Q are output and negated output, and asynch set and reset inputs"
0"NOTE: the inputs for SR flip-flop are named J,K like for JK flip-flop, since"
0"JK flip-flop behaves the same as SR for all allowed SR input combinations,"
0"and the names S and R are already used for other non flipflop related parts"

0"D flip-flop"

      s
      v
 s-->dq--->l
 s-->cQ--->l
      ^
      s

0"T flip-flop"

     s
     v
s-->tq--->l
s-->cQ--->l
     ^
     s


0"SR or JK flip-flop"

     s
     v
s-->jq--->l
s-->c#
s-->kQ--->l
     ^
     s

0"SR latch"

s-->q--->l
s-->Q

0"NOTE: this is only a small selection of the combinations you can do with those"
0"Also, you can make flip flops from more basic components instead as well (e.g. NAND-only)"
0"Different tutorials introduce flip-flops in more detail"

0"NEW PART: delay"

0"d as standalone: 1-tick delay (behavior depends on tick algorithm)"

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
0"SECTION III: Integrated Circuits"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"NEW PARTS: integrated circuit template and usage"

0"I and i: define and use integrated circuit (IC). Numbers are used to identify them"
0"This allows to design and reuse templates"
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
0"SECTION IV: Fancy Parts    "
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"These parts do not extend the logic abilities, but allow different ways of input/output interaction"

0"NEW PARTS: timers"

0"r and R: realtime timer. Can be toggled off with mouse"
0"r is initially off (does not tick at all and must be enabled with mouse like a switch). R is initially on"
0"During operation, the capital letter means it's not paused, and the color means it's outputting the signal or not based on current phase"

r****>l   R***>l

0"NEW PARTS: numbers"

0"0123456789: affect LED colors and timer speeds"
0"Timer speeds are toggle interval in tenths of a second (exceptions: no number gives 0.5 seconds, number 0 gives 1 second)"

0 1 2 3 4 5 6 7
l l l l l l l l        l l l l l l l l l l l
^ ^ ^ ^ ^ ^ ^ ^        ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
* * * * * * * *        * * * * * * * * * * *
s s s s s s s s        r r r r r r r r r r r
                       1 2 3 4 5 6 7 8 9 1 1
                                         0 1

0"NEW PART: RGB LED"

0"L: RGB LED"

s*>L<*s
   ^
   *
   s

0"NEW PART: Interactive terminal"

0"T: Interactive multiline terminal (7-bit ASCII)"
0"This is made from a rectangular grid of i's, but you cannot see the i's"
0"when rendered, it shows it as a black screen on which arbitrary characters"
0"can appear"

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

          lllllll"keyboard ASCII code out"
          ^^^^^^^
          |||||||
"out"p**>TTTTTTTT<***p"read from in to screen"
         TTTTTTTT
"eof"l<**TTTTTTTT
         TTTTTTTT
         TTTTTTTT
          ^^^^^^^
          |||||||
          SsssssS"ASCII code in to screen"

0"With only inputs and no read/out flags, it will instead show the binary input in decimal"

         TTTTTTTT"decimal"
         ^^^^^^^^
         ||||||||
         sSsssssS"binary"

0"With only outputs and no read/out flags, it will instead convert typed decimal value"
0"to binary, if the number parses as a valid decimal number"

        llllllll
        ^^^^^^^^
        TTTTTTTT

0"NEW PART: Random generator"

0"A ? is a random generator. It will change to a random value on any positive"
0"or negative edge of the input and have a random initial value."

?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l
?-->l  ?-->l  ?-->l  ?-->l

s**>?**>l

R**>?**>l
1


0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION V: Parts for shortcuts and compactness"
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

0"g: global wire (backplane): can output to many loose places at any distance everywhere"
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

0"Multi-digit codes are read decimally left to right or top to bottom depending on horizontal or vertical direction compared to the g"

  s--g1234    1234g-->l

0"Global wire can be used in an integrated circuit"

  s---g17      71g-->lI17    i17-->l    i17-->l    i17-->l

0"NEW PART: straight backplane connections ('antennas')"

0"(,),u,n: 'antennas'. Connect at any distance to the opposing 'antenna dish' they"
0"are aimed at: ( aims horizontally to ), n aims downwards to u and vice versa."
0"The signal flies over all other non-wireless circuitry."
0"If you don't like the antenna analogy, you may also imagine a wire on the"
0"back side of the board connecting those points, similar to g and G."

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

0"y: bus: multiple connections go through it"
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

0",: wire corners/splits that can be more closely packed than *. They interact"
0"with other wires, but not with their own kind."

                     ll
                     ^^
l<---,,--->l         ||
     ||         l<---,,--->l
     ||              ||
     ||              ||
     ss              ss

0"NEW PARTS: Double corners"

0"% and &: double corners, works independently on both sides"

      l             l
      ^             ^
      |             |
      |             |
  s---%--->l    l<--&---s
      |             |
      |             |
      s             s

0"A few more notes about / \\ and x"

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

0"z, Z: normal and inverted device/gate inputs outputting to multiple sides"
0"they connect to each other and wires, and output to all devices, no matter"
0"what direction. They do not interact with other gate input types"

       l  l
s------zz-zZl
       l  l

0"NEW PART: device input crossing"

0"h, H: combination of wire crossing and normal or inverted device input"


    l         l           s---->o--------->l
   lh-s      lH-s         s-----he-------->l
    |         |           s-----+ha------->l
    s         s                 ||^
                                sss

0"h and H work also diagonally. So can serve also as simple diagonal device inputs"

s     s              l
 x     x            h
  h     H     s----*
   l     l          h
                     l

0"NOTE: the diagonal usage of ^ seen earler above is also a type of wire crossing input,"
0"and the diagonal ^ is considered good style in half adders, while needing to use h or H"
0"often indicates a too closely packed circuit."

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
0"SECTION VI: Command Words"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

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

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION VII: Interchangeable ASCII characters"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"There are a few pairs of ASCII charcters that have the same or similar meaning:"

0"@ and ASCII space: both are isolator. @ is rendered differently so this can be used for visual features"

0"ASCII backtick and ASCII double quote: the backtick will be replaced by quotes, for text in circuits"

0"; and ASCII backslash: the ; will be replaced by backslash in the circuit"

0". and *: the . has the same functionality as * (wire)"

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"SECTION VIII: Editing in the Geany Text Editor"
0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

0"Editing is best done in a good plain text editor, at least it must support a fixed"
0"width font and provide block selection, allowing to paste a rectangular selected"
0"block anywhere."

0"There are many other editors that can do this, but here are some tips for Geany."
0"Many of these will work in other editors too, there just may be different shortcuts"
0"and different edge case behaviors. Geany is based on scintilla so similar"
0"behaviors may work in other scintilla based editors like scite, notepad++,"
0"notepad2, code::blocks, etc... Another type of editor that might be useful instead, could"
0"be one designed for making 2D ASCII art drawings."

0"-Make sure to set a fixed width font. Geany is an editor for programming so likely it already is by default."
0" without a fixed width font, characters will not line up correctly below each other, and that is quite important"
0" since circuits are 2-dimensional."
0"-Turn off line wrapping, only then you can see the 2D layout correctly."
0"-The insert key is useful. Normally the 'insert' mode of text editors is rarely used,"
0" but for editing 2-dimensional diagrams it's awesome if you are changing something in the middle:"
0" it allows to overwrite characters without moving stuff to the right of your cursor. Unfortunately,"
0" backspace will still move said stuff to the left so instead of backspace, use left arrow then"
0" space to remove something to the left of the cursor. Also, if you have no insert mode, then pressing"
0" delete after each keystroke will be needed instead."
0"-CTRL+d duplicates a line, which is handy sometimes e.g. to make vertical wires longer."
0"-If you have a circuit without any other circuitry to the left or right of it, then"
0" copypasting it to another location above or below is quite easy: just select it, copy (CTRL+C)"
0" and paste it on a different line (CTRL+V). So copypasting circuits multiple times vertically is"
0" easy in any text editor is easy."
0"-If you want to copypaste something horizontally, or something that is in between some stuff on its"
0" left and/or right, then you need block selection, to select the characters in the rectangle"
0" around the part you want to copy. For example if you want to copypaste only the middle or gate"
0" below but not the and/xor gates left/right of it:"

      l      l      l
      ^      ^      ^
    s>a<s  s>o<s  s>e<s

0"If you use block selection as explained below, you can easily paste many instances of that"
0"or gate like so:"

  l     l     l     l     l     l     l     l
  ^     ^     ^     ^     ^     ^     ^     ^
s>o<s s>o<s s>o<s s>o<s s>o<s s>o<s s>o<s s>o<s

0"So how to do the block selection in geany:"
0"-To do it with arrow keys: first place the cursor in one corner of the rectangle you want to select."
0" Then hold down alt+shift and press the arrow keys up/down and left/right to select a rectangle."
0"-To do it with the mouse: first place the cursor in one corner of the rectangle you want to select."
0" Then hold down ctrl+shift, or in alt+shift (depends on OS), and click the mouse to the"
0" other corner of the rectangle. Or hold down just ctrl, and drag the mouse to any rectangle shape."
0"-Now you have a rectangle selected. Press ctrl+c to copy it. Then place the cursor where you want to"
0" paste it, and press ctrl+v there."
0"-Important: make sure the rectangle you selected has all characters filled. If there were lines that"
0" were not filled up to the end, fill them all up with spaces first. Only then, when you paste the block,"
0" will all content to the right of where you pasted shift by the same amount, which is very likely what"
0" you want to not completely disaling other parts of the circuit."
0"-To easily get spaces to the right of everything, place the cursor somewhere very far on the right (add"
0" spaces to 1 line for this if needed). Then use mouse block selection and click elsewhere on the right"
0" to get a very long cursor. Then type any letter, e.g. '@', to type a vertical wall of @ symbols on the"
0" right. Everything to the left of them will be automatically filled with spaces! Which makes editing of"
0" the 2D circuit much easier."
0"-You can also use the block selection as multicursor. Instead of a rectangle, select a vertical line to"
0" get a long cursor. Then you can insert multiple spaces, *'s, or any other character by typing it. Similarly"
0" using the delete key deletes all characters to the right of the cursor, good for selectively deleting a part"
0" of the circuit."
0"-If you paste a block, it will insert itself into all content below. So if you have some"
0" circuitry below that you don't want affected, first add enough newlines below where you will"
0" paste, only then paste."
0"-Don't use the backspace key with multicursor, instead use the delete key. The delete key guarantees"
0" it will delete one character on each line to the right of the cursor. With backspace, however, geany"
0" may backspace a different amount of spaces on each line (it tries to be helpful in a way that fails here)"
0" which will disalign the circuit to the right of the multicursor."
0"-Similarly, the tab key is kind of unreliable for multicursor, so use space to remain evenly spaced."

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

0"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
0"FIT:x"

0"LogicEmu. Copyright (C) 2018 by Lode Vandevenne"
`);


registerCircuit('ASCII symbol summary (for editing)', `
0"Summary of characters. See the other tutorials for the full explanation."

0"BASIC"
0"-----"

0"(space): isolator"
0"(newline): next line of the 2D drawing"
0"(quote): comment"

0"*: wire, wire split"
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

0"-|: compact wires"
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

`);

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



`);


registerTitle();



registerCircuit('Unit Test', `

0"This is a unit test. It's for testing and development. It's included"
0"under 'help' because it shows expected behavior of some edge cases."

0"Note: also try: applyTransform(4), applyTransform(2)"

0"Note: also test the map 'game of life large ship' and enable autotick"

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

#-----------]l

#------->O-->l

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
*
*
*

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

"RENDER:text"


`);
