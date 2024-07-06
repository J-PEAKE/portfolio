import Matter from 'matter-js';

const { Render } = Matter;

export function setupCanvas(engine) {
  const render = Render.create({
    element: document.getElementById('container1'),
    engine: engine,
    canvas: document.getElementById('canvas'),
    options: {
      width: 300,
      height: 400,
      wireframes: false,
      background: 'transparent'
    }
  });

  Render.run(render);
}
