'use strict';

var famous = require('famous');
var DOMElement = famous.domRenderables.DOMElement;
var Transitionable = famous.transitions.Transitionable;
var FamousEngine = famous.core.FamousEngine;
var Node = famous.core.Node;
var Size = famous.components.Size;

// Create scene.
var scene = FamousEngine.createScene();

var boxNode = scene.addChild();

boxNode.setSizeMode('absolute', 'absolute')
    .setAbsoluteSize(300, 300);

var boxElement = new DOMElement(boxNode);
boxElement.setProperty('background-color', 'lightblue');

var boxTransitionable = new Transitionable(0);

// Callback is specified but it never successfully runs.
boxTransitionable.set(100, { duration: 1000, curve: 'outBounce' }, function () { console.log('box done'); });

var componentId = boxNode.addComponent({
    onUpdate: function (time) {
        var position = boxTransitionable.get();
        boxNode.setPosition(position, position, position);
        if (boxTransitionable.isActive()) {
            boxNode.requestUpdate(componentId);
        }
    }
}); 

boxNode.requestUpdate(componentId);

FamousEngine.init();

var clock = FamousEngine.getClock();

var rectNode = scene.addChild();

var rectPositionYZ = 0;

console.log(rectPositionYZ);

var rectSize = new Size(rectNode);
    rectSize.setMode('absolute', 'absolute')
        .setAbsolute(200, 600);

var rectElement = new DOMElement(rectNode);
    rectElement.setProperty('background-color', 'pink');

var rectTransitionable = new Transitionable();

rectTransitionable.from(0).to(1200, 'outBack', 1000).delay(1000).to(250, 'outBounce', 2500);

var rectComponentId = rectNode.addComponent({
    onUpdate: function (time) {
        rectNode.setPosition(rectTransitionable.get(), rectPositionYZ, rectPositionYZ);
        if (rectTransitionable.isActive()) {
            rectNode.requestUpdate(rectComponentId);
        }
    }
});

rectNode.requestUpdate(rectComponentId);
