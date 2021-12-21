
/**
 * What P5 was designed for.
 */
 export const sketch = p => {

  let petals = [];
  let _vpX = 0;
  let _vpY = 0;
  let _H = 0;
  let _S = 0;
  let _L = 0;
  let _SIZE = 0;
  
  p.setup = function() {
    let i, angle, vO;
    let h = Math.random() * 360, s = 100, l = 2;
    let speed = 0.2, size = 10;
    for (i = 0; i < 100; i++) {
      vO = Math.random() * 0.001 - 0.0005;
      angle = Math.random() * p.PI * 2 - p.PI;
      h += 1;
      if (h > 360) h -= 360;
      speed += 0.001;
      size += 0.1;
      petals.push({ x:0, y:0, angle, vO, speed, h, s, l, size });
    }
  
    _vpX = p.windowWidth * 0.5;
    _vpY = p.windowHeight * 0.5;
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
    p.noStroke();
    p.smooth();
    p.colorMode(p.HSL, 360, 100, 100, 1);
  }
  p.windowResized = function() {
    _vpX = p.windowWidth * 0.5;
    _vpY = p.windowHeight * 0.5;
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
  
  p.draw = function() {
    _H += 0.1;
    _S -= 0.006;
    _L += 0.010;
    _SIZE += 0.012;
    let h;
    petals.forEach(petal => {
      petal.angle += petal.vO;
      let vx = Math.cos(petal.angle);
      let vy = Math.sin(petal.angle);
      petal.x += vx * petal.speed;
      petal.y += vy * petal.speed;
      h = petal.h + _H;
      if (h > 360) h -= 360;
      p.fill(h, Math.min(100, petal.s + _S), Math.min(100, petal.l + _L));
      p.circle(_vpX + petal.x, _vpY + petal.y, petal.size + _SIZE);
    });
  }
  
  
};
