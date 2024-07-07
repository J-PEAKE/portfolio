import Matter from 'matter-js';

class EventManager {
  constructor(engine, render, backgroundBox, box, initialAngle, thresholdAngle, color1, color2) {
    this.engine = engine;
    this.render = render;
    this.backgroundBox = backgroundBox;
    this.box = box;
    this.initialAngle = initialAngle;
    this.thresholdAngle = thresholdAngle;
    this.color1 = color1;
    this.color2 = color2;
    this.angularVelocity = 0.0;
    this.angularDamping = 0.98;
    this.rotationEnabled = true;
  }

  setupEvents() {
    const { Events, Body } = Matter;

    Events.on(this.engine, 'beforeUpdate', () => {
      if (this.rotationEnabled && Math.abs(this.angularVelocity) > 0.0001) {
        Body.rotate(this.backgroundBox, this.angularVelocity);
        Body.rotate(this.box, this.angularVelocity);
        this.angularVelocity *= this.angularDamping;

        let currentAngle = this.backgroundBox.angle - this.initialAngle;
        let absoluteAngle = Math.abs(currentAngle % (2 * Math.PI));

        let interpolationFactor = absoluteAngle <= this.thresholdAngle ? absoluteAngle / this.thresholdAngle : (2 * Math.PI - absoluteAngle) / this.thresholdAngle;
        interpolationFactor = Math.min(1, Math.max(0, interpolationFactor));

        let r = Math.round(parseInt(this.color1.substring(1, 3), 16) * (1 - interpolationFactor) + parseInt(this.color2.substring(1, 3), 16) * interpolationFactor);
        let g = Math.round(parseInt(this.color1.substring(3, 5), 16) * (1 - interpolationFactor) + parseInt(this.color2.substring(3, 5), 16) * interpolationFactor);
        let b = Math.round(parseInt(this.color1.substring(5, 7), 16) * (1 - interpolationFactor) + parseInt(this.color2.substring(5, 7), 16) * interpolationFactor);
        let interpolatedColor = `rgb(${r}, ${g}, ${b})`;
        document.body.style.backgroundColor = interpolatedColor;

        if (absoluteAngle >= 2 * Math.PI) {
          document.body.style.backgroundColor = this.color1;
          this.initialAngle = this.backgroundBox.angle;
          this.angularVelocity = 0.0;
          this.rotationEnabled = false;
        }
      }
    });

    window.addEventListener('wheel', (event) => {
      if (this.rotationEnabled) {
        let currentAngle = this.backgroundBox.angle - this.initialAngle;
        let absoluteAngle = Math.abs(currentAngle % (2 * Math.PI));

        if (absoluteAngle <= 2 * Math.PI) {
          if (event.deltaY > 0) {
            this.angularVelocity += event.deltaY * 0.0001;
          } else if (event.deltaY < 0 && currentAngle > 0) {
            this.angularVelocity += event.deltaY * 0.0001;
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
  }
}

export default EventManager;
