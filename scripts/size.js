'use strict';

var famous = require('famous');
var DOMElement = famous.domRenderables.DOMElement;
var Size = famous.core.Size;
var FamousEngine = famous.core.FamousEngine;
var Node = famous.core.Node;

// Create scene.
var scene = FamousEngine.createScene();

var boxNode = scene.addChild();
var boxSize = new Size(boxNode);

boxNode.setSizeMode('absolute', 'absolute')
    .setAbsoluteSize(300, 300);

var boxElement = new DOMElement(boxNode);
boxElement.setProperty('background-color', 'lightgray');

FamousEngine.init();
