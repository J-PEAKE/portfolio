import Matter from 'matter-js';
import EventManager from './eventManager';
import ShapeFactory from './shapeFactory';

class PhysicsSimulation {
  constructor(containerId, className, initialAngle, thresholdAngle, color1, color2) {
    this.containerId = containerId;
    this.className = className;
    this.initialAngle = initialAngle;
    this.thresholdAngle = thresholdAngle;
    this.color1 = color1;
    this.color2 = color2;

    console.log('Setting up canvas');
    this.engine = this.setupCanvas();
    console.log('Creating shapes');
    this.circles = ShapeFactory.createCircles();
    this.box = ShapeFactory.createBox();
    this.backgroundBox = ShapeFactory.createBackgroundBox();
    this.addBodiesToWorld([this.backgroundBox, ...this.circles, this.box]);
  }

  setupCanvas() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      throw new Error(`Container with id ${this.containerId} not found`);
    }

    if (this.className) {
      container.classList.add(this.className);
    }

    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
      },
    });
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    return engine;
  }

  addBodiesToWorld(bodies) {
    Matter.Composite.add(this.engine.world, bodies);
  }

  init() {
    console.log('Initializing event manager');
    const eventManager = new EventManager(this.engine, this.box, this.backgroundBox, this.initialAngle, this.thresholdAngle, this.color1, this.color2);
    eventManager.setupEvents();
    console.log('Events set up');
  }
}

export default PhysicsSimulation;
