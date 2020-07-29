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
Final load of LogicEmu, to load the initial circuit after everything has
been initialized and registered.
*/

var fromLocalStorage = maybeLoadFromLocalStorage();
loadSavedCircuits();

registerCircuitGroup('my');
maybeLoadFromLocalStorage();
if(fromUrlCode) registerCircuit(fromUrlCode[1], fromUrlCode[0], fromUrlCode[2]);
registerCircuit('A', savedCircuits[0], 'saved_circuit_a', false, true);
registerCircuit('B', savedCircuits[1], 'saved_circuit_b', false, true);
registerCircuit('C', savedCircuits[2], 'saved_circuit_c', false, true);
registerCircuit('D', savedCircuits[3], 'saved_circuit_d', false, true);
registerCircuit('E', savedCircuits[4], 'saved_circuit_e', false, true);
registerCircuit('F', savedCircuits[5], 'saved_circuit_f', false, true);
if(fromLocalStorage) {
  // autosave and old_autosave are initially the same, but after editing, autosave will be updated, old_autosave will remain the original older data from local storage
  registerCircuit('autosave', autoSaveCircuit, 'autosave', false, true);
  registerCircuit('old autosave', fromLocalStorage[0], 'old_autosave');
}

var fromLinkId = maybeLoadFromLinkId();
var fromUrlCode = maybeLoadFromUrlCode();

var loaded = undefined; // format: [text, title, link_id, circuit index], with id undefined if none and index -1 if none
if(!loaded) loaded = fromLinkId;
if(!loaded) loaded = fromUrlCode;
// below commented out: no longer auto-load recovered edited circuit, it has id code "autosave" and is in the "my" dropdown now
//if(!loaded) loaded = fromLocalStorage;
if(!loaded) loaded = [introText, introTitle, introId, -1];

createMenuUI();

parseText(loaded[0], loaded[1], loaded[2] ? linkableCircuits[loaded[2]] : undefined, 2);
if(loaded[3] >= 0) currentSelectedCircuit = loaded[3];

if(debugHook) debugHook();

