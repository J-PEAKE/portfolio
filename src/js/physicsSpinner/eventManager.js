// src/js/physicsSpinner/eventManager.js
import Matter from 'matter-js';

export default class EventManager {
  constructor(engine, render, physicsSimulation) {
    this.engine = engine;
    this.render = render;
    this.physicsSimulation = physicsSimulation;
    this.angularVelocity = 0.0;
    this.angularDamping = 0.97;
    this.rotationEnabled = true;

    // Initial touch positions
    this.lastTouchY = 0;
    this.lastTouchX = 0;
  }

  setupEvents() {
    // Set up mouse wheel event
    window.addEventListener('wheel', (event) => this.handleWheelEvent(event), { passive: false });

    // Set up touch events
    window.addEventListener('touchstart', (event) => this.handleTouchStart(event), { passive: false });
    window.addEventListener('touchmove', (event) => this.handleTouchMove(event), { passive: false });

    // Set up engine update event
    Matter.Events.on(this.engine, 'beforeUpdate', () => this.handleBeforeUpdate());
  }

  handleWheelEvent(event) {
    if (this.rotationEnabled) {
      this.angularVelocity += event.deltaY * 0.0002;
    }
  }

  handleTouchStart(event) {
    if (event.touches.length === 1) {
      this.lastTouchY = event.touches[0].clientY;
      this.lastTouchX = event.touches[0].clientX;
    }
  }

  handleTouchMove(event) {
    if (this.rotationEnabled && event.touches.length === 1) {
      const currentTouchY = event.touches[0].clientY;
      const currentTouchX = event.touches[0].clientX;
      const deltaY = this.lastTouchY - currentTouchY;
      const deltaX = this.lastTouchX - currentTouchX;
      this.lastTouchY = currentTouchY;
      this.lastTouchX = currentTouchX;
      this.angularVelocity += (deltaY + deltaX) * 0.0002;
    }
  }

  handleBeforeUpdate() {
    if (Math.abs(this.angularVelocity) > 0.0001) {
      if (this.physicsSimulation.box) {
        Matter.Body.rotate(this.physicsSimulation.box, this.angularVelocity);
      }
      Matter.Body.rotate(this.physicsSimulation.backgroundBox, this.angularVelocity);
      this.angularVelocity *= this.angularDamping;

      let currentAngle = this.physicsSimulation.backgroundBox.angle - this.physicsSimulation.initialAngle;
      let absoluteAngle = Math.abs(currentAngle % (2 * Math.PI));

      // Handle specific angle events
      this.handleAngleEvents(absoluteAngle);

      // Interpolate color until 180 degrees
      let interpolationFactor;
      if (absoluteAngle <= Math.PI) {
        interpolationFactor = absoluteAngle / Math.PI;
      } else {
        // Interpolate color from 180 to 360 degrees back to color1
        interpolationFactor = (2 * Math.PI - absoluteAngle) / Math.PI;
      }

      let r = Math.round(parseInt(this.physicsSimulation.color1.substring(1, 3), 16) * (1 - interpolationFactor) + parseInt(this.physicsSimulation.color2.substring(1, 3), 16) * interpolationFactor);
      let g = Math.round(parseInt(this.physicsSimulation.color1.substring(3, 5), 16) * (1 - interpolationFactor) + parseInt(this.physicsSimulation.color2.substring(3, 5), 16) * interpolationFactor);
      let b = Math.round(parseInt(this.physicsSimulation.color1.substring(5, 7), 16) * (1 - interpolationFactor) + parseInt(this.physicsSimulation.color2.substring(5, 7), 16) * interpolationFactor);
      let interpolatedColor = `rgb(${r}, ${g}, ${b})`;
      document.body.style.backgroundColor = interpolatedColor;

      // Stop rotation after 360 degrees
      if (absoluteAngle >= 2 * Math.PI) {
        document.body.style.backgroundColor = this.physicsSimulation.color1;
        this.physicsSimulation.initialAngle = this.physicsSimulation.backgroundBox.angle;
        this.angularVelocity = 0.0;
        this.rotationEnabled = false; // Disable further rotation
      }
    }
  }

  handleAngleEvents(absoluteAngle) {
    if (absoluteAngle >= Math.PI / 2 && absoluteAngle < Math.PI / 2 + 0.1) {
      console.log('Hit 90 degrees');
      // Add any additional functionality here
    } else if (absoluteAngle >= Math.PI && absoluteAngle < Math.PI + 0.1) {
      console.log('Hit 180 degrees');
      document.body.style.backgroundColor = this.physicsSimulation.color2; // Ensure color transition is complete
      // Add any additional functionality here
    } else if (absoluteAngle >= 3 * Math.PI / 2 && absoluteAngle < 3 * Math.PI / 2 + 0.1) {
      console.log('Hit 270 degrees');
      // Add any additional functionality here
    } else if (absoluteAngle >= 2 * Math.PI && absoluteAngle < 2 * Math.PI + 0.1) {
      console.log('Hit 360 degrees');
      this.rotationEnabled = false; // Disable further rotation
      this.angularVelocity = 0.0; // Stop rotation
      // Add any additional functionality here
    }
  }
}
