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
  console.log('DOMContentLoaded event triggered');

  const headerContainer = document.getElementById('headerContainer');
  if (headerContainer) {
    console.log('Instantiating Header for container: headerContainer');
    new Header(headerContainer);
  }

  const container1 = document.getElementById('container1');
  if (container1) {
    console.log('Instantiating PhysicsSimulation for container: container1');
    new PhysicsSimulation(container1, ['#222222', '#1C5D99'], 500);
  }
});