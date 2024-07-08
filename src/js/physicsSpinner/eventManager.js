// src/js/physicsSpinner/eventManager.js
import Matter from 'matter-js';

class EventManager {
  constructor(engine, backgroundBox, box, colors) {
    this.engine = engine;
    this.backgroundBox = backgroundBox;
    this.box = box;
    this.colors = colors;

    this.angularVelocity = 0.0;
    this.angularDamping = 0.98;
    this.rotationEnabled = true;
    this.initialAngle = Math.PI / 4;

    Matter.Events.on(this.engine, 'beforeUpdate', this.update.bind(this));
  }

  update() {
    if (this.rotationEnabled && Math.abs(this.angularVelocity) > 0.0001) {
      Matter.Body.rotate(this.backgroundBox, this.angularVelocity);
      Matter.Body.rotate(this.box, this.angularVelocity);
      this.angularVelocity *= this.angularDamping;

      let currentAngle = this.backgroundBox.angle - this.initialAngle;
      let absoluteAngle = Math.abs(currentAngle % (2 * Math.PI));
      let interpolationFactor;

      // Interpolate color until 180 degrees
      if (absoluteAngle <= Math.PI) {
        interpolationFactor = absoluteAngle / Math.PI;
      } else {
        // Interpolate color from 180 to 360 degrees back to color1
        interpolationFactor = (2 * Math.PI - absoluteAngle) / Math.PI;
      }

      let r = Math.round(parseInt(this.colors[0].substring(1, 3), 16) * (1 - interpolationFactor) + parseInt(this.colors[1].substring(1, 3), 16) * interpolationFactor);
      let g = Math.round(parseInt(this.colors[0].substring(3, 5), 16) * (1 - interpolationFactor) + parseInt(this.colors[1].substring(3, 5), 16) * interpolationFactor);
      let b = Math.round(parseInt(this.colors[0].substring(5, 7), 16) * (1 - interpolationFactor) + parseInt(this.colors[1].substring(5, 7), 16) * interpolationFactor);
      let interpolatedColor = `rgb(${r}, ${g}, ${b})`;
      document.body.style.backgroundColor = interpolatedColor;

      // Handle specific angle events
      this.handleAngleEvents(absoluteAngle);

      // Stop rotation after 360 degrees
      if (absoluteAngle >= 2 * Math.PI) {
        document.body.style.backgroundColor = this.colors[0];
        this.initialAngle = this.backgroundBox.angle;
        this.angularVelocity = 0.0;
        this.rotationEnabled = false; // Disable further rotation
      }
    }
  }

  handleAngleEvents(currentAngle) {
    if (currentAngle >= Math.PI / 2 && currentAngle < Math.PI / 2 + 0.1) {
      console.log('Hit 90 degrees');
    } else if (currentAngle >= Math.PI && currentAngle < Math.PI + 0.1) {
      console.log('Hit 180 degrees');
      document.body.style.backgroundColor = this.colors[1];
    } else if (currentAngle >= 3 * Math.PI / 2 && currentAngle < 3 * Math.PI / 2 + 0.1) {
      console.log('Hit 270 degrees');
    } else if (currentAngle >= 2 * Math.PI && currentAngle < 2 * Math.PI + 0.1) {
      console.log('Hit 360 degrees');
      this.rotationEnabled = false;
      this.angularVelocity = 0.0;
    }
  }
}

export default EventManager;
