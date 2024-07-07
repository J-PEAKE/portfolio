import Matter from 'matter-js';

class EventManager {
  constructor(engine, box, backgroundBox, initialAngle, thresholdAngle, color1, color2) {
    this.engine = engine;
    this.box = box;
    this.backgroundBox = backgroundBox;
    this.initialAngle = initialAngle;
    this.thresholdAngle = thresholdAngle;
    this.color1 = color1;
    this.color2 = color2;
    this.angularVelocity = 0.0;
    this.angularDamping = 0.98;
    this.rotationEnabled = true;
  }

  setupEvents() {
    console.log('Setting up events');
    Matter.Events.on(this.engine, 'beforeUpdate', () => {
      if (this.rotationEnabled && Math.abs(this.angularVelocity) > 0.0001) {
        Matter.Body.rotate(this.box, this.angularVelocity);
        Matter.Body.rotate(this.backgroundBox, this.angularVelocity);
        this.angularVelocity *= this.angularDamping;

        let currentAngle = this.backgroundBox.angle - this.initialAngle;
        let absoluteAngle = Math.abs(currentAngle % (2 * Math.PI));
        let interpolationFactor;

        if (absoluteAngle <= Math.PI) {
          interpolationFactor = absoluteAngle / Math.PI;
        } else {
          interpolationFactor = (2 * Math.PI - absoluteAngle) / Math.PI;
        }

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

    let isDragging = false;
    let lastMouseX, lastMouseY;

    const startDrag = (event) => {
      isDragging = true;
      lastMouseX = event.clientX || event.touches[0].clientX;
      lastMouseY = event.clientY || event.touches[0].clientY;
    };

    const endDrag = () => {
      isDragging = false;
    };

    const drag = (event) => {
      if (!isDragging || !this.rotationEnabled) return;

      const mouseX = event.clientX || event.touches[0].clientX;
      const mouseY = event.clientY || event.touches[0].clientY;
      const deltaX = mouseX - lastMouseX;
      const deltaY = mouseY - lastMouseY;

      this.angularVelocity += (deltaX + deltaY) * 0.0005;

      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    window.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('mousemove', drag);

    window.addEventListener('touchstart', startDrag);
    window.addEventListener('touchend', endDrag);
    window.addEventListener('touchmove', drag);
  }
}

export default EventManager;
