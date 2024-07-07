// src/js/main.js

function importAll(r) {
  r.keys().forEach(r);
}

// Import all JavaScript files in the src/js folder
importAll(require.context('.', true, /\.js$/));

import '../css/styles.css';
import PhysicsSimulation from './physicsSpinner/physicsSimulation';
import { Header } from './nav/header';


 const myHeader = new Header('path/to/logo.png', 'Logo');
// // document.body.appendChild(header);

// If you need to add more elements to the header later
const nav = document.createElement('nav');
myHeader.addElement(nav);

document.addEventListener('DOMContentLoaded', () => {
  const containerId = 'container1';
  const className = 'canvas';
  const initialAngle = Math.PI / 4;
  const thresholdAngle = Math.PI;
  const color1 = '#222222';
  const color2 = '#1C5D99';

  const simulation = new PhysicsSimulation(containerId, className, initialAngle, thresholdAngle, color1, color2);
  simulation.init();
});



