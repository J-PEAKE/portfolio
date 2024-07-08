// src/js/physicsSpinner/physicsSimulation.js
import Matter from 'matter-js';
import ShapeFactory from './shapeFactory';
import EventManager from './eventManager';

export default class PhysicsSimulation {
  constructor(containerId) {
    this.containerId = containerId;
    this.color1 = '#222222';
    this.color2 = '#1C5D99';
    this.initialAngle = Math.PI / 4; // Set the initial angle to 45 degrees

    this.engine = Matter.Engine.create();
    this.render = Matter.Render.create({
      element: document.getElementById(this.containerId),
      engine: this.engine,
      canvas: document.createElement('canvas'),
      options: {
        width: 300,
        height: 400,
        wireframes: false,
        background: 'transparent',
      },
    });
  }

  init() {
    console.log(`Initializing PhysicsSimulation for container: ${this.containerId}`);
    
    const circles = ShapeFactory.createCircles();
    this.box = ShapeFactory.createBox();
    this.backgroundBox = ShapeFactory.createBackgroundBox();

    Matter.Body.setAngle(this.backgroundBox, this.initialAngle); // Apply the initial angle

    this.addBodiesToWorld([this.backgroundBox, ...circles]); // Initially, add only the background box and circles

    Matter.Render.run(this.render);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.engine);

    this.eventManager = new EventManager(this.engine, this.render, this);
    this.eventManager.setupEvents();

    setTimeout(() => {
      this.resetBoxWithAngle();
    }, 500);
  }

  addBodiesToWorld(bodies) {
    Matter.Composite.add(this.engine.world, bodies);
  }

  resetBoxWithAngle() {
    console.log('Resetting box with angle');
    this.box = ShapeFactory.createBox();
    Matter.Body.setAngle(this.box, this.backgroundBox.angle);
    this.addBodiesToWorld([this.box]);
  }
}
