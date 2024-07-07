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


document.addEventListener("DOMContentLoaded", function() {
  const simulation = new PhysicsSimulation('container1', 'canvas');
  simulation.init();
});


