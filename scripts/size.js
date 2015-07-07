'use strict';

var famous = require('famous');
var DOMElement = famous.domRenderables.DOMElement;
var Size = famous.components.Size;
var FamousEngine = famous.core.FamousEngine;
var Node = famous.core.Node;

// Create scene.
var scene = FamousEngine.createScene();

var boxNode = scene.addChild();
var boxSize = new Size(boxNode);

var boxElement = new DOMElement(boxNode);
boxElement.setProperty('background-color', 'lightgray');

var boxSize = new Size(boxNode);
boxSize.setMode('absolute', 'absolute')
    .setAbsolute(300, 250);

FamousEngine.init();
