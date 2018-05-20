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
Final load of LogicEmu, to load the initial circuit after everything has
been initialized and registered.
*/

var initialCircuitText = introText;
var initialTitle = introTitle;

// the text you last edited is remembered. To remove the memory, use the edit button, clear the string, and save
var stored_text = getLocalStorage('circuit_text');
if (stored_text != '' && !!stored_text) {
  initialCircuitText = stored_text;
  initialTitle = 'stored circuit';
}

var link_id = getParameterByName('id');
if(link_id) {
  var linkableCircuit = linkableCircuits[link_id];
  if(linkableCircuit) {
    initialCircuitText = linkableCircuit[1];
    initialTitle = linkableCircuit[0];
    currentSelectedCircuit = linkableCircuit[2];
  } else {
    initialCircuitText = 'R>l 1"Circuit with id \'' + link_id + '\' not found, loading intro instead." l<R\n\n' + introText;
    initialTitle = introTitle;
  }
}

parseText(initialCircuitText, initialTitle);

