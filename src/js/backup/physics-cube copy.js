console.log('physics-cube.js is loaded');

document.addEventListener("DOMContentLoaded", function() {
  const { Engine, Render, Runner, Bodies, Composite, Body, Events } = Matter;

  // Create a Matter.js engine
  const engine = Engine.create();

  // Create a Matter.js renderer
  const render = Render.create({
    element: document.getElementById('container'),
    engine: engine,
    canvas: document.getElementById('canvas'),
    options: {
      width: 300,
      height: 400,
      wireframes: false,
      background: 'transparent'
    }
  });

  // Create circle bodies
  const circleA = Bodies.circle(150, 30, 16, {
    restitution: 0.7,
    render: { fillStyle: '#ffffff', strokeStyle: '#ffffff' }
  });
  const circleB = Bodies.circle(150, 50, 24, {
    restitution: 0.7,
    render: { fillStyle: '#ffffff', strokeStyle: '#ffffff' }
  });
  const circleC = Bodies.circle(150, 80, 32, {
    restitution: 0.7,
    render: { fillStyle: '#ffffff', strokeStyle: '#ffffff' }
  });

  // Define dimensions for the box
  const boxWidth = 200;
  const boxHeight = 200;
  const thickness = 20;

  // Define positions for the box center
  const boxCenterX = 150;
  const boxCenterY = 200;
  const halfWidth = boxWidth / 2;
  const halfHeight = boxHeight / 2;

  // Create box sides
  const boxTop = Bodies.rectangle(boxCenterX, boxCenterY - halfHeight + thickness / 2, boxWidth, thickness, {
    isStatic: true,
    render: { fillStyle: 'transparent' }
  });
  const boxBottom = Bodies.rectangle(boxCenterX, boxCenterY + halfHeight - thickness / 2, boxWidth, thickness, {
    isStatic: true,
    render: { fillStyle: 'transparent' }
  });
  const boxLeft = Bodies.rectangle(boxCenterX - halfWidth + thickness / 2, boxCenterY, thickness, boxHeight, {
    isStatic: true,
    render: { fillStyle: 'transparent' }
  });
  const boxRight = Bodies.rectangle(boxCenterX + halfWidth - thickness / 2, boxCenterY, thickness, boxHeight, {
    isStatic: true,
    render: { fillStyle: 'transparent' }
  });

  // Create the complete box by combining the sides
  let box = Body.create({
    parts: [boxTop, boxBottom, boxLeft, boxRight],
    isStatic: true,
    collisionFilter: {
      group: -1,
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
    render: { fillStyle: '#1C5D99' }
  });

  // Set the initial angle for the background box
  const initialAngle = Math.PI / 4;
  Body.setAngle(backgroundBox, initialAngle);

  // Add all bodies to the world
  Composite.add(engine.world, [backgroundBox, box, circleA, circleB, circleC]);

  // Run the renderer
  Render.run(render);

  // Create and run the runner
  const runner = Runner.create();
  Runner.run(runner, engine);

  // Delay enabling collisions for the box
  setTimeout(() => {
    Composite.remove(engine.world, box);
    box = Body.create({
      parts: [boxTop, boxBottom, boxLeft, boxRight],
      isStatic: true
    });
    Body.setAngle(box, backgroundBox.angle);
    Composite.add(engine.world, box);
  }, 500);

  // Initialize rotation variables
  let angularVelocity = 0.0;
  const angularDamping = 0.98;
  let boxRemoved = false;
  let scrollEnabled = false;

  const thresholdAngle = Math.PI;

  const color1 = '#222222';
  const color2 = '#1C5D99';

  // Function to disable scrolling
  function disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  // Function to enable scrolling
  function enableScroll() {
    document.body.style.overflow = 'auto';
  }

  // Disable scroll on load
  disableScroll();

  // Event listener for engine updates
  Events.on(engine, 'beforeUpdate', () => {
    if (Math.abs(angularVelocity) > 0.0001) {
      if (box) {
        Body.rotate(box, angularVelocity);
      }
      Body.rotate(backgroundBox, angularVelocity);
      angularVelocity *= angularDamping;

      let currentAngle = backgroundBox.angle - initialAngle;
      let absoluteAngle = Math.abs(currentAngle % (2 * Math.PI));
      let interpolationFactor;

      if (absoluteAngle <= thresholdAngle) {
        interpolationFactor = absoluteAngle / thresholdAngle;
      } else {
        interpolationFactor = (2 * Math.PI - absoluteAngle) / thresholdAngle;
      }

      interpolationFactor = Math.min(1, Math.max(0, interpolationFactor));

      // Remove the box after the threshold angle is passed
      if (absoluteAngle >= thresholdAngle && !boxRemoved) {
        if (box) {
          Composite.remove(engine.world, box);
          box = null;
        }
        console.log('Current state of engine.world:', engine.world.bodies);

        // Enable scroll after threshold is passed
        if (!scrollEnabled) {
          enableScroll();
          scrollEnabled = true;
        }
      } else if (absoluteAngle < thresholdAngle && boxRemoved) {
        boxRemoved = false;
        box = Body.create({
          parts: [boxTop, boxBottom, boxLeft, boxRight],
          isStatic: true
        });
        Body.setAngle(box, backgroundBox.angle);
        Composite.add(engine.world, box);
      }

      // Interpolate background color
      let r = Math.round(parseInt(color1.substring(1, 3), 16) * (1 - interpolationFactor) + parseInt(color2.substring(1, 3), 16) * interpolationFactor);
      let g = Math.round(parseInt(color1.substring(3, 5), 16) * (1 - interpolationFactor) + parseInt(color2.substring(3, 5), 16) * interpolationFactor);
      let b = Math.round(parseInt(color1.substring(5, 7), 16) * (1 - interpolationFactor) + parseInt(color2.substring(5, 7), 16) * interpolationFactor);

      let interpolatedColor = `rgb(${r}, ${g}, ${b})`;

      document.body.style.backgroundColor = interpolatedColor;

      // Reset the initial angle after a full rotation
      if (absoluteAngle >= 2 * Math.PI) {
        document.body.style.backgroundColor = color1;
        initialAngle = backgroundBox.angle;
      }
    }
  });

  // Event listener for mouse wheel
  window.addEventListener('wheel', function(event) {
    if (!scrollEnabled) {
      angularVelocity += event.deltaY * 0.0001;
    }
  });

  let isDragging = false;
  let lastMouseX, lastMouseY;

  // Event listener for starting drag
  function startDrag(event) {
    isDragging = true;
    lastMouseX = event.clientX || event.touches[0].clientX;
    lastMouseY = event.clientY || event.touches[0].clientY;
  }

  // Event listener for ending drag
  function endDrag() {
    isDragging = false;
  }

  // Event listener for dragging
  function drag(event) {
    if (!isDragging || scrollEnabled) return;

    const mouseX = event.clientX || event.touches[0].clientX;
    const mouseY = event.clientY || event.touches[0].clientY;
    const deltaX = mouseX - lastMouseX;
    const deltaY = mouseY - lastMouseY;

    angularVelocity += (deltaX + deltaY) * 0.0005;

    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }

  // Add mouse and touch event listeners for dragging
  window.addEventListener('mousedown', startDrag);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('mousemove', drag);

  window.addEventListener('touchstart', startDrag);
  window.addEventListener('touchend', endDrag);
  window.addEventListener('touchmove', drag);
});
