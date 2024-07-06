export function addBodiesToWorld(engine, bodies) {
  const { Composite } = require('matter-js');
  Composite.add(engine.world, bodies);
}

export function disableScroll() {
  document.body.style.overflow = 'hidden';
}

export function enableScroll() {
  document.body.style.overflow = 'auto';
}
