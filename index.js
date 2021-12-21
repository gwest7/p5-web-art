import { sketch as sketchRGB } from './assets/sketch/rgb.js';
import { sketch as sketchNodes } from './assets/sketch/nodes.js';
import { sketch as sketchPixel } from './assets/sketch/pixel.js';
import { sketch as sketchFlower } from './assets/sketch/flower.js';

const sketches = {
  rgb: sketchRGB,
  node: sketchNodes,
  px: sketchPixel,
  flower: sketchFlower,
}

let inst;

document.querySelectorAll('button[data-sketch]')
.forEach(elm => {
  elm.addEventListener('click', e => {
    e.preventDefault();
    if (inst) {
      inst.remove();
      inst = null;
    }
    const sketch = sketches[e.target.dataset.sketch];
    if (sketch) {
      console.log('Loading sketch for', e.target.dataset.sketch);
      inst = new p5(sketch);
    } else {
      console.log('Lost sketch for', e.target.dataset.sketch);
    }
  })
});
