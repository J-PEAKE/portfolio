// Prevent Overscroll Bounce Effect on iOS
document.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, { passive: false });

// module aliases
const { Engine, Render, Runner, Bodies, Composite, Body, Events, Mouse, MouseConstraint } = Matter;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: document.getElementById('content'),
  engine: engine,
  canvas: document.getElementById('canvas'),
  options: {
    width: 300,
    height: 400,
    wireframes: false,
    background: 'transparent' // background color of the canvas
  }
});

// create circles
const circleA = Bodies.circle(150, 30, 16, { 
  restitution: 0.8,
  render: {
    fillStyle: '#000000', // black fill color
    strokeStyle: '#ffffff' // white stroke color
  }
});
const circleB = Bodies.circle(150, 50, 24, { 
  restitution: 0.7,
  render: {
    fillStyle: '#000000', // black fill color
    strokeStyle: '#ffffff' // white stroke color
  }
});
const circleC = Bodies.circle(150, 80, 32, { 
  restitution: 0.5,
  render: {
    fillStyle: '#000000', // black fill color
    strokeStyle: '#ffffff' // white stroke color
  }
});

// dimensions of the box
const boxWidth = 200;
const boxHeight = 200;
const thickness = 20; // thickness of the box walls

// calculate positions for the box boundaries
const boxCenterX = 150; // center x-coordinate of the box
const boxCenterY = 200; // center y-coordinate of the box
const halfWidth = boxWidth / 2;
const halfHeight = boxHeight / 2;

// create boundaries for the box
const boxTop = Bodies.rectangle(boxCenterX, boxCenterY - halfHeight + thickness / 2, boxWidth, thickness, { 
  isStatic: true,
  render: {
    fillStyle: 'transparent', // transparent fill color
  }
});
const boxBottom = Bodies.rectangle(boxCenterX, boxCenterY + halfHeight - thickness / 2, boxWidth, thickness, { 
  isStatic: true,
  render: {
    fillStyle: 'transparent', // transparent fill color
  }
});
const boxLeft = Bodies.rectangle(boxCenterX - halfWidth + thickness / 2, boxCenterY, thickness, boxHeight, { 
  isStatic: true,
  render: {
    fillStyle: 'transparent', // transparent fill color
  }
});
const boxRight = Bodies.rectangle(boxCenterX + halfWidth - thickness / 2, boxCenterY, thickness, boxHeight, { 
  isStatic: true,
  render: {
    fillStyle: 'transparent', // transparent fill color
  }
});

// Create the compound box body
const box = Body.create({
  parts: [boxTop, boxBottom, boxLeft, boxRight],
  isStatic: true,
  collisionFilter: {
    group: -1, // Initially disable collisions
    category: 0
  }
});

// Create the background box
const backgroundBox = Bodies.rectangle(boxCenterX, boxCenterY, boxWidth - 30, boxHeight - 30, {
  isStatic: true,
  collisionFilter: {
    group: -1,
    category: 0
  },
  render: {
    fillStyle: '#ffffff' // white fill color for background box
  }
});

// Set the starting angle of the box to 45 degrees (π/4 radians)
const initialAngle = Math.PI / 4;
// Body.setAngle(box, initialAngle); // Set angle of the box
Body.setAngle(backgroundBox, initialAngle); // Set angle of the background box

// Add all bodies to the world
Composite.add(engine.world, [backgroundBox, box, circleA, circleB, circleC]);

// Run the renderer
Render.run(render);

// Create runner
const runner = Runner.create();
Runner.run(runner, engine);

// Enable collisions for the box after a delay
setTimeout(() => {
  Composite.remove(engine.world, box);
  const boxWithCollision = Body.create({
    parts: [boxTop, boxBottom, boxLeft, boxRight],
    isStatic: true
  });
  Body.setAngle(boxWithCollision, backgroundBox.angle); // Set the angle to match the background box
  Composite.add(engine.world, boxWithCollision);
}, 500); // 0.5 seconds delay to allow circles to fall through

// Variables to store rotational inertia
let angularVelocity = 0.0;
const angularDamping = 0.98; // Damping factor to simulate friction/inertia

// Apply inertia to the box rotation in each update
Events.on(engine, 'beforeUpdate', () => {
  if (Math.abs(angularVelocity) > 0.0001) {
    Body.rotate(box, angularVelocity);
    Body.rotate(backgroundBox, angularVelocity);
    angularVelocity *= angularDamping; // Apply damping to slow down the rotation over time
  }
});

// Rotate the box with mouse scroll and add to angular velocity
window.addEventListener('wheel', function(event) {
  angularVelocity += event.deltaY * 0.0001; // Adjust the factor to control the speed of rotation
});

// Drag event handling for rotation
let isDragging = false;
let lastMouseX, lastMouseY;

function startDrag(event) {
  isDragging = true;
  lastMouseX = event.clientX || event.touches[0].clientX;
  lastMouseY = event.clientY || event.touches[0].clientY;
}

function endDrag() {
  isDragging = false;
}

function drag(event) {
  if (!isDragging) return;

  const mouseX = event.clientX || event.touches[0].clientX;
  const mouseY = event.clientY || event.touches[0].clientY;
  const deltaX = mouseX - lastMouseX;
  const deltaY = mouseY - lastMouseY;

  angularVelocity += (deltaX + deltaY) * 0.0005; // Adjust the factor to control the speed of rotation

  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

// // Mouse events
// render.canvas.addEventListener('mousedown', startDrag);
// render.canvas.addEventListener('mouseup', endDrag);
// render.canvas.addEventListener('mousemove', drag);

// // Touch events
// render.canvas.addEventListener('touchstart', startDrag);
// render.canvas.addEventListener('touchend', endDrag);
// render.canvas.addEventListener('touchmove', drag);

// Mouse events
window.addEventListener('mousedown', startDrag);
window.addEventListener('mouseup', endDrag);
window.addEventListener('mousemove', drag);

// Touch events
window.addEventListener('touchstart', startDrag);
window.addEventListener('touchend', endDrag);
window.addEventListener('touchmove', drag);
