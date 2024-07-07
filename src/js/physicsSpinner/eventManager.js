// src/js/EventManager.js
import Matter from 'matter-js';

class EventManager {
    constructor(engine, simulation) {
      this.engine = engine;
      this.simulation = simulation;
      this.angularVelocity = simulation.angularVelocity;
      this.angularDamping = simulation.angularDamping;
      this.rotationEnabled = simulation.rotationEnabled;
      this.initialAngle = simulation.initialAngle;
      this.backgroundBox = simulation.backgroundBox;
    }
  
    setupEvents() {
      const { Events, Body } = Matter;
      Events.on(this.engine, 'beforeUpdate', () => {
        if (this.rotationEnabled && Math.abs(this.angularVelocity) > 0.0001) {
          Body.rotate(this.simulation.box, this.angularVelocity);
          Body.rotate(this.simulation.backgroundBox, this.angularVelocity);
          this.angularVelocity *= this.angularDamping;
          this.handleAngleEvents(this.simulation.backgroundBox.angle - this.initialAngle);
        }
      });
  
      window.addEventListener('wheel', (event) => this.handleWheelEvent(event), { passive: false });
  
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
  
    handleWheelEvent(event) {
      const { Body } = Matter;
      if (this.rotationEnabled) {
        let currentAngle = this.simulation.backgroundBox.angle - this.initialAngle;
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
    }
  
    handleAngleEvents(currentAngle) {
      const color1 = '#222222';
      const color2 = '#1C5D99';
  
      if (currentAngle >= Math.PI / 2 && currentAngle < Math.PI / 2 + 0.1) {
        console.log('Hit 90 degrees');
      } else if (currentAngle >= Math.PI && currentAngle < Math.PI + 0.1) {
        console.log('Hit 180 degrees');
        document.body.style.backgroundColor = color2;
      } else if (currentAngle >= 3 * Math.PI / 2 && currentAngle < 3 * Math.PI / 2 + 0.1) {
        console.log('Hit 270 degrees');
      } else if (currentAngle >= 2 * Math.PI && currentAngle < 2 * Math.PI + 0.1) {
        console.log('Hit 360 degrees');
        this.simulation.enableScroll();
        this.rotationEnabled = false;
        this.angularVelocity = 0.0;
      }
  
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
    }
  }
  
  export default EventManager;
  