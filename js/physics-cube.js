console.log('physics-cube.js is loaded');

document.addEventListener("DOMContentLoaded", function() {
  const { Engine, Render, Runner, Bodies, Composite, Body, Events } = Matter;

  const engine = Engine.create();

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

  const circleA = Bodies.circle(150, 30, 16, {
    restitution: 0.8,
    render: { fillStyle: '#ffffff', strokeStyle: '#ffffff' }
  });
  const circleB = Bodies.circle(150, 50, 24, {
    restitution: 0.7,
    render: { fillStyle: '#ffffff', strokeStyle: '#ffffff' }
  });
  const circleC = Bodies.circle(150, 80, 32, {
    restitution: 0.8,
    render: { fillStyle: '#ffffff', strokeStyle: '#ffffff' }
  });

  const boxWidth = 200;
  const boxHeight = 200;
  const thickness = 20;

  const boxCenterX = 150;
  const boxCenterY = 200;
  const halfWidth = boxWidth / 2;
  const halfHeight = boxHeight / 2;

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

  let box = Body.create({
    parts: [boxTop, boxBottom, boxLeft, boxRight],
    isStatic: true,
    collisionFilter: {
      group: -1,
      category: 0
    }
  });

  const backgroundBox = Bodies.rectangle(boxCenterX, boxCenterY, boxWidth - 30, boxHeight - 30, {
    isStatic: true,
    collisionFilter: {
      group: -1,
      category: 0
    },
    render: { fillStyle: '#1C5D99' }
  });

  const initialAngle = Math.PI / 4;
  Body.setAngle(backgroundBox, initialAngle);
  let initialBackgroundAngle = initialAngle;

  // Composite.add(engine.world, [backgroundBox, box, circleA, circleB, circleC]);
  Composite.add(engine.world, [backgroundBox, box, circleC]);


  Render.run(render);

  const runner = Runner.create();
  Runner.run(runner, engine);

  setTimeout(() => {
    Composite.remove(engine.world, box);
    box = Body.create({
      parts: [boxTop, boxBottom, boxLeft, boxRight],
      isStatic: true
    });
    Body.setAngle(box, backgroundBox.angle);
    Composite.add(engine.world, box);
  }, 500);

  let angularVelocity = 0.0;
  const angularDamping = 0.97;

  const thresholdAngle = Math.PI;

  const color1 = '#222222';
  const color2 = '#1C5D99';

  Events.on(engine, 'beforeUpdate', () => {
    if (Math.abs(angularVelocity) > 0.0001) {
      if (box) {
        Body.rotate(box, angularVelocity);
      }
      Body.rotate(backgroundBox, angularVelocity);
      angularVelocity *= angularDamping;

      let angleDifference = backgroundBox.angle - initialBackgroundAngle;

      console.log('Angle difference:', angleDifference);
      console.log('Background box angle:', backgroundBox.angle);
      console.log('Initial background angle:', initialBackgroundAngle);

      let interpolationFactor = Math.abs(angleDifference / thresholdAngle);
      interpolationFactor = Math.min(1, interpolationFactor);

      if (Math.abs(angleDifference) >= thresholdAngle) {
        if (box) {
          Composite.remove(engine.world, box);
          box = null;
        }
        console.log('Current state of engine.world:', engine.world.bodies);
      }

      let r = Math.round(parseInt(color1.substring(1, 3), 16) * (1 - interpolationFactor) + parseInt(color2.substring(1, 3), 16) * interpolationFactor);
      let g = Math.round(parseInt(color1.substring(3, 5), 16) * (1 - interpolationFactor) + parseInt(color2.substring(3, 5), 16) * interpolationFactor);
      let b = Math.round(parseInt(color1.substring(5, 7), 16) * (1 - interpolationFactor) + parseInt(color2.substring(5, 7), 16) * interpolationFactor);

      let interpolatedColor = `rgb(${r}, ${g}, ${b})`;

      document.body.style.backgroundColor = interpolatedColor;
    }
  });

  window.addEventListener('wheel', function(event) {
    angularVelocity += event.deltaY * 0.0001;
  });

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

    angularVelocity += (deltaX + deltaY) * 0.0005;

    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }

  window.addEventListener('mousedown', startDrag);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('mousemove', drag);

  window.addEventListener('touchstart', startDrag);
  window.addEventListener('touchend', endDrag);
  window.addEventListener('touchmove', drag);
});
