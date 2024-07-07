// src/js/physicsSpinner/physicsSimulation.js
import Matter from 'matter-js';
import EventManager from './eventManager';
import ShapeFactory from './shapeFactory';

class PhysicsSimulation {
  constructor(container, colors, delay) {
    this.container = container;
    this.colors = colors;
    this.delay = delay;
    this.engine = Matter.Engine.create();
    this.render = null;
    this.circles = [];
    this.box = null;
    this.backgroundBox = null;
    this.runner = null;
    this.eventManager = null;

    this.init();
  }

  init() {
    console.log(`Initializing PhysicsSimulation for container: ${this.container.id}`);
    const { Render, Composite, Body } = Matter;

    this.render = Render.create({
      element: this.container,
      engine: this.engine,
      options: {
        width: 300,
        height: 400,
        wireframes: false,
        background: 'transparent'
      }
    });

    this.circles = ShapeFactory.createCircles();
    this.box = ShapeFactory.createBox();
    this.backgroundBox = ShapeFactory.createBackgroundBox();

    // Rotate the background box initially
    Body.setAngle(this.backgroundBox, Math.PI / 4);

    Composite.add(this.engine.world, [this.backgroundBox, ...this.circles]);

    Render.run(this.render);
    this.runner = Matter.Runner.create();
    Matter.Runner.run(this.runner, this.engine);

    // Initialize EventManager
    this.eventManager = new EventManager(this.engine, this.backgroundBox, this.box, this.colors);

    // Disable physics for the box initially
    Composite.remove(this.engine.world, this.box);
    setTimeout(() => {
      // Sync box angle with backgroundBox angle before adding it to the world
      Body.setAngle(this.box, this.backgroundBox.angle);
      Composite.add(this.engine.world, this.box);
    }, this.delay);

    this.setupEvents();
  }

  setupEvents() {
    window.addEventListener('wheel', this.handleWheelEvent.bind(this), { passive: false });
  }

  handleWheelEvent(event) {
    console.log('Mouse wheel event detected');
    if (this.eventManager && this.eventManager.rotationEnabled) {
      let currentAngle = this.backgroundBox.angle - this.eventManager.initialAngle;
      let absoluteAngle = Math.abs(currentAngle % (2 * Math.PI));

      if (absoluteAngle <= 2 * Math.PI) {
        if (event.deltaY > 0) {
          this.eventManager.angularVelocity += event.deltaY * 0.0001;
        } else if (event.deltaY < 0 && currentAngle > 0) {
          this.eventManager.angularVelocity += event.deltaY * 0.0001;
        } else {
          event.preventDefault();
        }
      } else {
        event.preventDefault();
      }
    } else {
      event.preventDefault();
    }
  }
}

export default PhysicsSimulation;
