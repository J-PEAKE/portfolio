// src/js/main.js

function importAll(r) {
  r.keys().forEach(r);
}

import '../css/styles.css';

// Import all JavaScript files in the src/js folder
importAll(require.context('.', true, /\.js$/));

import '../css/styles.css';
import PhysicsSimulation from './physicsSpinner/physicsSimulation';
import Header from './site-components/header';


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event triggered');


  const header = new Header(["interactive", "visualisation", "cv", "contact"]);
  header.render();
  

  const physicsSimulation = new PhysicsSimulation('container1');
  physicsSimulation.init();
});


// Prevent default touch events to disable screen bounce on iOS
document.addEventListener('touchmove', function(event) {
  if (!event.target.closest('.scrollable')) {
    event.preventDefault();
  }
}, { passive: false });