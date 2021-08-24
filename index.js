import { sketch as sketchRGB } from './assets/sketch/rgb.js';

const sketch = {
  rgb: sketchRGB,
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
    const sketch = sketch[e.target.dataset.sketch];
    if (sketch) inst = new p5(sketch);
  })
});
