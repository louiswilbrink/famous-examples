'use strict';

var famous = require('famous');
var DOMElement = famous.domRenderables.DOMElement;
var FamousEngine = famous.core.FamousEngine;
var Node = famous.core.Node;
var Camera = famous.components.Camera;
var Gravity3D = famous.physics.Gravity3D;
var MountPoint = famous.components.MountPoint;
var PhysicsEngine = famous.physics.PhysicsEngine;
var Size = famous.components.Size;
var Position = famous.components.Position;
var Sphere = famous.physics.Sphere;
var Vec3 = famous.math.Vec3;

function createPlanet (node, size, position) {
    console.log(this);
    size.setAbsolute(50, 50);

    var mountPoint = new MountPoint(node).set(0.5, 0.5);
    var element = new DOMElement(node, {
        tagName: 'div',
        properties: {
            'background-color': 'lightblue',
            'border-radius': '50%'
        }
    });

    var sphere = new Sphere({
        radius: 100,
        mass: 10000,
        restrictions: ['xy'],
        position: new Vec3(window.innerWidth / 2, window.innerHeight / 2, 5)
    });

    this.gravity = new Gravity3D(sphere);
    this.simulation.add(sphere, this.gravity);
    this.items.push([sphere, position]);
}

function createSatellites (node, size, position, i) {
    size.setAbsolute(20, 20);

    var radius = 200;
    var x = Math.floor(Math.random() * radius * 2) - radius;
    var y = (Math.round(Math.random()) * 2 - 1) * Math.sqrt(radius * radius - x * x);
    console.log(x,y);
    
    var color = 'rgb(' + Math.abs(x) + ',' + Math.abs(Math.round(y)) + ',' + (255 - node.id) + ')';
    var element = new DOMElement(node, {
        properties: {
            'background-color': color,
            'border-radius': '50%'
        }
    });

    var satellite = new Sphere({
        radius: 20,
        mass: 5,
        position: new Vec3(x + window.innerWidth / 2, y + window.innerHeight / 2, -y / 2)
    });

    console.log(color);

    satellite.setVelocity(-y / Math.PI, -x / Math.PI / 2, y / 2);
    this.gravity.addTarget(satellite);
    this.simulation.add(satellite);
    this.items.push([satellite, position]);
}

function Demo () {
    this.scene = FamousEngine.createScene('body');

    this.camera = new Camera(this.scene);
    this.camera.setDepth(1000);

    this.simulation = new PhysicsEngine();
    this.items = [];
    
    for (var i = 0; i < 30; i++) {
        var node = this.scene.addChild();
        var size = new Size(node).setMode(1,1);
        var position = new Position(node);

        if (i === 0) { // create planet.
            createPlanet.call(this, node, size, position);
        }
        if (i !== 0) {
            node.id = i;
            createSatellites.call(this, node, size, position);
        }
    }

    FamousEngine.requestUpdateOnNextTick(this);
}

Demo.prototype.onUpdate = function (time) {
    this.simulation.update(time);

    if (this.items.length > 0) {
        for (var i = 0; i < this.items.length; i++) {
            var itemPosition = this.simulation.getTransform(this.items[i][0]).position;
            this.items[i][1].set(itemPosition[0], itemPosition[1], itemPosition[2]);
        }
    }

    FamousEngine.requestUpdateOnNextTick(this);
};


FamousEngine.init();

var demo = new Demo();
