// src/js/main.js

function importAll(r) {
  r.keys().forEach(r);
}

import '../css/styles.css';

// Import all JavaScript files in the src/js folder
importAll(require.context('.', true, /\.js$/));

import '../css/styles.css';
import PhysicsSimulation from './physicsSpinner/physicsSimulation';
import Header from './nav/header';


document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.header')) {
    console.log('DOMContentLoaded event triggered');

    // Initialize header
    const headerContainerId = 'headerContainer';
    const header = new Header(headerContainerId);
    console.log(`Instantiating Header for container: ${headerContainerId}`);
    header.create();

    // Initialize physics simulation
    const containerId = 'container1';
    const className = 'custom-class';
    const initialAngle = Math.PI / 4;
    const thresholdAngle = Math.PI;
    const color1 = '#222222';
    const color2 = '#1C5D99';

    console.log(`Instantiating PhysicsSimulation for container: ${containerId}`);
    const simulation = new PhysicsSimulation(containerId, className, initialAngle, thresholdAngle, color1, color2);
    simulation.init();
  }
});