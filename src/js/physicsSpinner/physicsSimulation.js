// src/js/PhysicsSimulation.js
import Matter from 'matter-js';
import ShapeFactory from './shapeFactory.js';
import EventManager from './eventManager.js';

class PhysicsSimulation {
  constructor(containerId, canvasId) {
    this.container = document.getElementById(containerId);
    this.canvas = document.getElementById(canvasId);
    this.engine = Matter.Engine.create();
    this.render = Matter.Render.create({
      element: this.container,
      engine: this.engine,
      canvas: this.canvas,
      options: {
        width: 300,
        height: 400,
        wireframes: false,
        background: 'transparent'
      }
    });

    this.shapeFactory = new ShapeFactory(Matter);
    this.eventManager = new EventManager(this.engine, this);

    this.circles = [];
    this.box = null;
    this.backgroundBox = null;
    this.angularVelocity = 0.0;
    this.angularDamping = 0.98;
    this.rotationEnabled = true;
    this.initialAngle = Math.PI / 4;
  }

  init() {
    this.circles = this.shapeFactory.createCircles();
    this.box = this.shapeFactory.createBox();
    this.backgroundBox = this.shapeFactory.createBackgroundBox();
    this.addBodiesToWorld();
    this.eventManager.setupEvents();
    this.disableScroll();
    Matter.Render.run(this.render);
    Matter.Runner.run(Matter.Runner.create(), this.engine);

    setTimeout(() => {
      Matter.Composite.remove(this.engine.world, this.box);
      this.box = Matter.Body.create({
        parts: this.box.parts,
        isStatic: true
      });
      Matter.Body.setAngle(this.box, this.backgroundBox.angle);
      Matter.Composite.add(this.engine.world, this.box);
    }, 500);
  }

  addBodiesToWorld() {
    Matter.Composite.add(this.engine.world, [this.backgroundBox, this.box, ...this.circles]);
  }

  disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  enableScroll() {
    document.body.style.overflow = 'auto';
  }
}

export default PhysicsSimulation;
