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

var name = 'louis';

var boxes = [];
var letters = [];

var scalePoints = [
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

    letter.setScale(2,2,2);

    //if (i == originPoints.length) {
        //letter.setMountPoint(0,0);
        //letter.setOrigin(0,0);
    //}
    //else {
        //letter.setMountPoint(
            //mountPoints[i][0],
            //mountPoints[i][1]
        //);

        //letter.setOrigin(
            //originPoints[i][0],
            //originPoints[i][1]
        //);
    //}

    box.setSizeMode('absolute', 'absolute')
       .setAbsoluteSize(50, 50)
       .setPosition(i*300, 100);

    var boxElement = new DOMElement(box, {
        properties: {
            'background-color': '#49afeb'
        }
    });

    var letterElement = new DOMElement(letter);

    letterElement.setProperty('background-color', 'lightgray');

    //letterElement.setContent(scalePoints[i][0] + ' ' + scalePoints[i][1])

    boxes.push(box);
    letters.push(letter);
}

//this makes the nodes spin
var spinner = scene.addComponent({
  onUpdate: function(time) {
    for (var i = 0; i < letters.length; i++) {
        var scale = (1 - Math.cos(time/1000));
        letters[i].setScale(scale, scale, scale);
    }
    scene.requestUpdateOnNextTick(spinner);
  }
});

scene.requestUpdate(spinner);

FamousEngine.init();
