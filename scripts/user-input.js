'use strict';

var famous = require('famous');
var DOMElement = famous.domRenderables.DOMElement;
var Size = famous.core.Size;
var FamousEngine = famous.core.FamousEngine;
var Node = famous.core.Node;

// Create scene.
var scene = FamousEngine.createScene();

function NameInput() {
    Node.call(this);
    this._domElement = new DOMElement(this, {
        tagName: 'input',
        attributes: {
            placeholder: 'Currently Broken :('
        }
    });
    this.setProportionalSize(1, 0.5);

    // Adding keyup as an UI Event allows the previously added DOMElement to
    // instruct the DOMRenderer to act accordingly.
    this.addUIEvent('keyup');
}

NameInput.prototype = Object.create(Node.prototype);
NameInput.prototype.constructor = NameInput;

NameInput.prototype.onReceive = function onReceive(type, ev) {
    // Check if the received event is the keyup event.
    if (type === 'keyup') {
        // Instead of reading the value from the DOMElement, we have access
        // to the DOMElement's current value through the event payload
        // itself.
        //
        // We globally emit (broadcast) the event to all nodes (the entire
        // scene graph). This means all nodes, including this node, will
        // receive the dispatched event.
        this.emit('name', ev.value);
    }
    // Equivalent to Node.prototype.receive.call(this, type, ev);
    // Used in order to allow potential components to receive the event.
    this.receive(type, ev);
};

function NameOutput() {
    Node.call(this);
    this._domElement = new DOMElement(this);

    this
        .setProportionalSize(1, 0.5)
        .setAlign(0, 1)
        .setMountPoint(0, 1);
}

NameOutput.prototype = Object.create(Node.prototype);
NameOutput.prototype.constructor = NameOutput;

NameOutput.prototype.onReceive = function onReceive(type, ev) {
    if (type === 'name') {
        this._domElement.setContent('Hello, ' + ev + ' !');
    }
    this.receive(type, ev);
};

scene.addChild(new NameInput());
scene.addChild(new NameOutput());

FamousEngine.init();
