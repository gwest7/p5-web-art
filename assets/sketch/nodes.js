/**
 * Basic point velicity and proximity measurements.
 */
export const sketch = p => {

  const NODES = 200;
  let distLine;
  let speed = 0.1;
  
  let nodes;
  let state = 0;
  const hueMax = 4096;
  
  p.setup = function() {
    nodes = [];
   
    let i, angle, vx, vy;
    for (i = 0; i < NODES; ++i) {
      angle = Math.random() * p.PI * 2 - p.PI; //180 deg
      vx = Math.cos(angle);
      vy = Math.sin(angle);
      nodes.push({x: Math.random() * p.windowWidth, y: Math.random() * p.windowHeight, vx, vy, br:0, vbr:0});
    }
    
    distLine = Math.min(p.windowWidth, p.windowHeight) * 0.1;
    p.colorMode(p.HSB, hueMax, 100, 100, 1);
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
  }

  p.windowResized = function() {
    distLine = Math.min(p.windowWidth, p.windowHeight) * 0.1;
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.mouseClicked = function() {
    state += 1;
    if (state === 3) state = 0;
    p.background(0);
  }
  p.mouseWheel = function(event) {
    speed += event.delta * 0.01;
    return false;
  }

  p.draw = function() {
    if (state===0) p.background(0);

    let i, j, distX, distY, dist;
    
    for (i = 0; i < NODES; ++i) moveNode(nodes[i]);
    
    for (i = 0; i < NODES - 1; ++i) {
      for (j = i + 1; j < NODES; ++j) {
        distX = nodes[i].x - nodes[j].x;
        if (distX > -distLine && distX < distLine) {
          distY = nodes[i].y - nodes[j].y;
          if (distY > -distLine && distY < distLine) {
            dist = Math.sqrt(distX * distX + distY * distY);
            if (dist < distLine) {
              let f = (distLine - dist) / distLine;
              if (state === 0) {
                p.stroke(0, 0, 100, f);
                p.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                p.fill(0, 0, f, 1)
                p.circle(nodes[j].x, nodes[j].y, dist*0.5);
              } else if (state === 1) {
                p.stroke(p.frameCount % hueMax, 100, 100, f);
                p.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
              } else if (state === 2) {
                p.noStroke();
                p.fill(p.frameCount % hueMax, 100, 100, f*0.1);
                p.circle(nodes[i].x, nodes[i].y, distLine - dist);
              }
            }
          }
        }
      }
    }
  }
  
  function moveNode(n) {
    n.x += n.vx * speed;
    n.y += n.vy * speed;
    if (n.x < 0) {
      n.x += p.windowWidth;
    } else if (n.x > p.windowWidth) {
      n.x -= p.windowWidth;
    }
    if (n.y < 0) {
      n.y += p.windowHeight;
    } else if (n.y > p.windowHeight) {
      n.y -= p.windowHeight;
    }
  }
  

};