'use strict';

var famous = require('famous');
var DOMElement = famous.domRenderables.DOMElement;
var FamousEngine = famous.core.FamousEngine;
var Node = famous.core.Node;
var math = famous.math;
var physics = famous.physics;
var Particle = physics.Particle;
var Sphere = physics.Sphere;
var Vec3 = math.Vec3;
var Box = physics.Box;
var Wall = physics.Wall;

// Create Simulation.
var simulation = new physics.PhysicsEngine();

// Create Scene.
var scene = FamousEngine.createScene();

/***************************************
 * Add Bodies
 ***************************************/

// Create Sphere.
var mySphere = new Sphere({ mass: 10, radius: 50 });

// Give the sphere some velocity.
mySphere.setVelocity(100, 0)
    .setPosition(0, 250, 0);

// Create Wall.
var rightWall = new Wall({ 
    direction: Wall.LEFT,
    size: [10, 500, 100]
});

rightWall.setPosition(500, 0, 0);

simulation.addBody(rightWall);
simulation.addBody(mySphere);

/***************************************
 * Add Nodes + Components
 ***************************************/

// Create circleNode, which updates its position based on mySphere's position.
var circleNode = scene.addChild();

circleNode
    .setSizeMode('absolute', 'absolute', 'absolute')
    // Match size of sphere
    .setAbsoluteSize(100, 100)
    .setPosition(0, 250, 0)
    .setMountPoint(0, 0);

// Add DOMElement component to circleNode.
var circleDOMElement = new DOMElement(circleNode, { tagName: 'div' })
    .setProperty('background-color', 'pink')
    .setProperty('border-radius', '50px');

// Create a wallNode, which will update its position based on rightWall's position.
var wallNode = scene.addChild();

wallNode
    .setSizeMode('absolute', 'absolute', 'absolute')
    .setAbsoluteSize(10, 500, 100);

var wallDOMElement = new DOMElement(wallNode, { tagName: 'div' })
    .setProperty('background-color', 'lightblue');

/***************************************
 * Create an Update Loop
 ***************************************/

var updateLoop = scene.addComponent({
    onUpdate: function (time) {
        // During update, sync cirlceNode position with sphere,
        // and wallNode position with wall.
        var spherePosition = mySphere.getPosition();
        var wallPosition = rightWall.getPosition();
        
        circleNode.setPosition(spherePosition.x, spherePosition.y);
        wallNode.setPosition(wallPosition.x, wallPosition.y);

        simulation.update(time);
        
        scene.requestUpdateOnNextTick(updateLoop);
    }
});

// Kick off loop.
scene.requestUpdate(updateLoop);
FamousEngine.init();
