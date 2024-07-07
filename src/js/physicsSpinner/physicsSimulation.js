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
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      throw new Error(`Container with id ${this.containerId} not found`);
    }

    console.log(`Initializing PhysicsSimulation for container: ${this.containerId}`);

    this.canvas = document.createElement('canvas');
    this.canvas.classList.add(this.className);
    container.appendChild(this.canvas);

    const { Engine, Render, Runner, Composite } = Matter;
    this.engine = Engine.create();

    this.render = Render.create({
      element: container,
      engine: this.engine,
      canvas: this.canvas,
      options: {
        width: 300,
        height: 400,
        wireframes: false,
        background: 'transparent',
      }
    });

    this.backgroundBox = ShapeFactory.createBackgroundBox();
    this.circles = ShapeFactory.createCircles();
    this.box = ShapeFactory.createBox();

    Composite.add(this.engine.world, [this.backgroundBox, this.box, ...this.circles]);

    Render.run(this.render);
    this.runner = Runner.create();
    Runner.run(this.runner, this.engine);

    const eventManager = new EventManager(this.engine, this.render, this.backgroundBox, this.box, this.initialAngle, this.thresholdAngle, this.color1, this.color2);
    eventManager.setupEvents();

    setTimeout(() => {
      Composite.remove(this.engine.world, this.box);
      this.box = ShapeFactory.createBox();
      Matter.Body.setAngle(this.box, this.backgroundBox.angle);
      Composite.add(this.engine.world, this.box);
    }, 500);
  }
}

export default PhysicsSimulation;
