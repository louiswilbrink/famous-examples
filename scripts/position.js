'use strict';

var famous = require('famous');

var Camera = famous.components.Camera;
var Curves = famous.transitions.Curves;
var DOMElement = famous.domRenderables.DOMElement;
var FamousEngine = famous.core.FamousEngine;
var Node = famous.core.Node;
var Position = famous.components.Position;
var Rotation = famous.components.Rotation;

// Create scene.
var scene = FamousEngine.createScene();

var box = scene.addChild();
var letter = box.addChild();

letter.setMountPoint(0,0);
letter.setOrigin(0,0);

box.setSizeMode('absolute', 'absolute')
   .setAbsoluteSize(50, 50)
   .setPosition(100, 100);

var boxElement = new DOMElement(box, {
    properties: {
        'background-color': '#49afeb'
    }
});

var letterElement = new DOMElement(letter);

letterElement.setProperty('background-color', 'lightgray');
letterElement.setContent('LW');

var letterPosition = new Position(letter);
console.log('letterPosition', letterPosition);

var posY, posX;

function togglePosition() {
    posX = (posX) ? 0 : 100;
    posY = (posY) ? 0 : 200;

    letterPosition.set(posX, posY, 1, { duration: 2000 }, togglePosition);
}

togglePosition();

FamousEngine.init();
