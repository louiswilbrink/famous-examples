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

box.setSizeMode('absolute', 'absolute')
   .setAbsoluteSize(50, 50)
   .setPosition(100, 200);

var blueDiv = new DOMElement(box, {
    properties: {
        'background-color': '#49afeb'
    }
});

FamousEngine.init();
