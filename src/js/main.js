import '../css/styles.css';
import { setupCanvas } from './canvasSetup';
import { setupEvents } from './events';
import { createBox, createCircles, backgroundBox } from './shapes';
import { addBodiesToWorld } from './functions';
import Matter from 'matter-js';

const { Engine, Runner, Composite, Body } = Matter;

// Create a Matter.js engine
const engine = Engine.create();

// Setup Canvas
setupCanvas(engine);

// Create and run the runner
const runner = Runner.create();
Runner.run(runner, engine);

// Create shapes and add to the world
const circles = createCircles();
let box = createBox(); // Use 'let' instead of 'const' to allow reassignment
addBodiesToWorld(engine, [backgroundBox, ...circles]);

// Set initial angle for the background box
const initialAngle = Math.PI / 4;
Body.setAngle(backgroundBox, initialAngle);
Body.setAngle(box, initialAngle); // Set the initial angle for the box as well

// Set up events
setupEvents(engine, backgroundBox, initialAngle, box);

// Delay enabling collisions for the box
setTimeout(() => {
  Composite.remove(engine.world, box);
  box = createBox(); // Reassign the new box
  Body.setAngle(box, backgroundBox.angle);
  Composite.add(engine.world, box);

  // Re-setup events with the new box
  setupEvents(engine, backgroundBox, initialAngle, box);
}, 500);
