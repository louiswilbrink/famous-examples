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

var name = 'louiswilb';

var boxes = [];
var letters = [];

var originPoints = [
    [0, 0], 
    [0.5, 0.5], 
    [1,1], 
    [0, 0.5], 
    [0,1], 
    [0.5, 0], 
    [0.5, 1], 
    [1, 0],
    [1, 0.5]
];

var mountPoints = [
    [0, 0], 
    [0.5, 0.5], 
    [1,1], 
    [0, 0.5], 
    [0,1], 
    [0.5, 0], 
    [0.5, 1], 
    [1, 0],
    [1, 0.5]
];

for (var i = 0; i < name.length; i++) {
    var box = scene.addChild();
    var letter = box.addChild();

    if (i == originPoints.length) {
        letter.setMountPoint(0,0);
        letter.setOrigin(0,0);
    }
    else {
        letter.setMountPoint(
            mountPoints[i][0],
            mountPoints[i][1]
        );

        letter.setOrigin(
            originPoints[i][0],
            originPoints[i][1]
        );
    }

    box.setSizeMode('absolute', 'absolute')
       .setAbsoluteSize(50, 50)
       .setPosition(i*100, 100);

    var boxElement = new DOMElement(box, {
        properties: {
            'background-color': '#49afeb'
        }
    });

    var letterElement = new DOMElement(letter);

    letterElement.setProperty('background-color', 'lightgray');

    letterElement.setContent(originPoints[i][0] + ' ' + originPoints[i][1])

    boxes.push(box);
    letters.push(letter);
}

//this makes the nodes spin
var spinner = scene.addComponent({
  onUpdate: function(time) {
    for (var i = 0; i < letters.length; i++) {
        letters[i].setRotation(0,0,time/1000);
    }
    scene.requestUpdateOnNextTick(spinner);
  }
});

scene.requestUpdate(spinner);

FamousEngine.init();
