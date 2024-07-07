import Matter from 'matter-js';

const { Bodies, Body } = Matter;

const ShapeFactory = {
  createCircles: () => {
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
    return [circleA, circleB, circleC];
  },

  createBox: () => {
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

    return Body.create({
      parts: [boxTop, boxBottom, boxLeft, boxRight],
      isStatic: true,
      collisionFilter: {
        group: 0,
        category: 0x0001,
        mask: 0xFFFFFFFF
      }
    });
  },

  createBackgroundBox: () => {
    const boxWidth = 170;
    const boxHeight = 170;
    const boxCenterX = 150;
    const boxCenterY = 200;

    return Bodies.rectangle(boxCenterX, boxCenterY, boxWidth, boxHeight, {
      isStatic: true,
      isSensor: true, // Makes the body non-collidable
      render: { fillStyle: '#1C5D99' }
    });
  }
};

export default ShapeFactory;
