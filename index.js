import { sketch as sketchRGB } from './assets/sketch/rgb.js';
import { sketch as sketchNodes } from './assets/sketch/nodes.js';

const sketches = {
  rgb: sketchRGB,
  node: sketchNodes,
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
    console.log('Loading sketch for', e.target.dataset.sketch);
    const sketch = sketches[e.target.dataset.sketch];
    if (sketch) inst = new p5(sketch);
  })
});
