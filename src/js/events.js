import Matter from 'matter-js';
import { disableScroll, enableScroll } from './functions';

const { Events, Body } = Matter;

export function setupEvents(engine, backgroundBox, initialAngle, box) {
  let angularVelocity = 0.0;
  const angularDamping = 0.98;
  let rotationEnabled = true;

  const color1 = '#222222';
  const color2 = '#1C5D99';

  disableScroll();

  function handleAngleEvents(currentAngle) {
    if (currentAngle >= Math.PI / 2 && currentAngle < Math.PI / 2 + 0.1) {
      console.log('Hit 90 degrees');
    } else if (currentAngle >= Math.PI && currentAngle < Math.PI + 0.1) {
      console.log('Hit 180 degrees');
      document.body.style.backgroundColor = color2;
    } else if (currentAngle >= 3 * Math.PI / 2 && currentAngle < 3 * Math.PI / 2 + 0.1) {
      console.log('Hit 270 degrees');
    } else if (currentAngle >= 2 * Math.PI && currentAngle < 2 * Math.PI + 0.1) {
      console.log('Hit 360 degrees');
      enableScroll();
      rotationEnabled = false;
      angularVelocity = 0.0;
    }
  }

  Events.on(engine, 'beforeUpdate', () => {
    if (rotationEnabled && Math.abs(angularVelocity) > 0.0001) {
      Body.rotate(backgroundBox, angularVelocity);
      Body.setAngle(box, backgroundBox.angle); // Sync the angle directly with backgroundBox
      angularVelocity *= angularDamping;

      let currentAngle = backgroundBox.angle - initialAngle;
      let absoluteAngle = Math.abs(currentAngle % (2 * Math.PI));
      let interpolationFactor;

      if (absoluteAngle <= Math.PI) {
        interpolationFactor = absoluteAngle / Math.PI;
      } else {
        interpolationFactor = (2 * Math.PI - absoluteAngle) / Math.PI;
      }

      let r = Math.round(parseInt(color1.substring(1, 3), 16) * (1 - interpolationFactor) + parseInt(color2.substring(1, 3), 16) * interpolationFactor);
      let g = Math.round(parseInt(color1.substring(3, 5), 16) * (1 - interpolationFactor) + parseInt(color2.substring(3, 5), 16) * interpolationFactor);
      let b = Math.round(parseInt(color1.substring(5, 7), 16) * (1 - interpolationFactor) + parseInt(color2.substring(5, 7), 16) * interpolationFactor);
      let interpolatedColor = `rgb(${r}, ${g}, ${b})`;
      document.body.style.backgroundColor = interpolatedColor;

      handleAngleEvents(absoluteAngle);

      if (absoluteAngle >= 2 * Math.PI) {
        document.body.style.backgroundColor = color1;
        initialAngle = backgroundBox.angle;
        angularVelocity = 0.0;
        rotationEnabled = false;
      }
    }
  });

  window.addEventListener('wheel', function(event) {
    if (rotationEnabled) {
      let currentAngle = backgroundBox.angle - initialAngle;
      let absoluteAngle = Math.abs(currentAngle % (2 * Math.PI));

      if (absoluteAngle <= 2 * Math.PI) {
        if (event.deltaY > 0) {
          angularVelocity += event.deltaY * 0.0001;
        } else if (event.deltaY < 0 && currentAngle > 0) {
          angularVelocity += event.deltaY * 0.0001;
        } else {
          event.preventDefault();
        }
      } else {
        event.preventDefault();
      }
    } else {
      event.preventDefault();
    }
  }, { passive: false });

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
    if (!isDragging || !rotationEnabled) return;

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
}
