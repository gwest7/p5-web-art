
/**
 * The initial version was done using AS3/Flex.
 * 
 * The RGB colour space to bipyramid shape is an original idea.
 * 
 * 3D rotation calculations based on Keith Peter's book, Making things move.
 * https://www.amazon.com/Foundation-Actionscript-3-0-Animation-Making/dp/1590597915
 * 
 */
export const sketch = p => {

  let _fl = 450;
  let _vpX = 0;
  let _vpY = 0;
  let _velocityX = 0;
  let _velocityY = 0;
  var spacingXY = 13;
  var spacingZ = 10;
  var depthOffset = spacingZ * 0xf; //depth can go up to 32 (when max and min are both 0xf)
  let prevMouseX;
  let prevMouseY;
  let spots = [];
  
  // let imgMask;
  // p.preload = function() {
  //   imgMask = p.loadImage('assets/mask2.png');
  // }
  
  p.setup = function() {
    let r, g, b, spot;
    const aR = -120 * p.PI / 180;
    const aG = 0;
    const aB = 120 * p.PI / 180;
    const aRCos = p.cos(aR), aGCos = p.cos(aG), aBCos = p.cos(aB), aRSin = p.sin(aR), aGSin = p.sin(aG), aBSin = p.sin(aB);
    for (r = 0; r <= 0xf; r += 3) {
      for (g = 0; g <= 0xf; g += 3) {
        for (b = 0; b <= 0xf; b += 3) {
          if (r != 0xf && r != 0 && g != 0xf && g != 0 && b != 0xf && b != 0) continue; //remove inside spheres
          spot = {
            r: r << 4 | r,
            g: g << 4 | g,
            b: b << 4 | b,
            scale: 1
          };
          spot.cx = (aRCos * r + aGCos * g + aBCos * b) * spacingXY;
          spot.cy = (aRSin * r + aGSin * g + aBSin * b) * spacingXY;
          spot.cz = (Math.max(r, g, b) + Math.min(r, g, b)) * spacingZ - depthOffset;
          spot.img = p.createImage(100, 100);
          spots.push(spot);
        }
      }
    }
  
    _vpX = p.windowWidth * 0.5;
    _vpY = p.windowHeight * 0.5;
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(60);
    p.stroke(80);
  }
  p.windowResized = function() {
    _vpX = p.windowWidth * 0.5;
    _vpY = p.windowHeight * 0.5;
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
  
  p.draw = function() {
    p.background(60);
    let angleX = _velocityY * 0.002;
    let angleY = _velocityX * 0.002;
    _velocityX *= 0.9;
    _velocityY *= 0.9;
    update(angleX, angleY);
  
    //if (frameCount % 16 === 0) console.log(spots[0].scale);
    spots.forEach(spot => {
      if (spot.visible) {
        p.fill(spot.r, spot.g, spot.b);
        p.circle(_vpX + spot.cx * spot.scale, _vpY + spot.cy * spot.scale, 32 * spot.scale);
      }
    });
  }
  
  p.mousePressed = function() {
    prevMouseX = p.mouseX;
    prevMouseY = p.mouseY;
    // prevent default
    return false;
  }
  
  p.mouseDragged = function() {
    _velocityX += p.mouseX - prevMouseX;
    _velocityY += p.mouseY - prevMouseY;
    prevMouseX = p.mouseX;
    prevMouseY = p.mouseY;
    // prevent default
    return false;
  }
  
  p.mouseWheel = function(event) {
    _fl += event.delta;
    return false;
  }
  
  function update(angleX, angleY) {
    let angleXCos = p.cos(angleX);
    let angleXSin = p.sin(angleX);
    let angleYCos = p.cos(angleY);
    let angleYSin = p.sin(angleY);
    spots.forEach(spot => {
      rotX(spot, angleXCos, angleXSin);
      rotY(spot, angleYCos, angleYSin);
      fixPerspective(spot);
    });
    spots.sort((a, b) => b.cz - a.cz);
  }
  
  function rotX(spot, cos, sin) {
    let _cy = spot.cy * cos - spot.cz * sin;
    let _cz = spot.cz * cos + spot.cy * sin;
    spot.cy = _cy;
    spot.cz = _cz;
  }
  
  function rotY(spot, cos, sin) {
    let _cx = spot.cx * cos - spot.cz * sin;
    let _cz = spot.cz * cos + spot.cx * sin;
    spot.cx = _cx;
    spot.cz = _cz;
  }
  
  function fixPerspective(spot) {
    if (spot.cz > -_fl) {
      let scale = _fl / (_fl + spot.cz);
      spot.scale = scale + 0.2;
      spot.x = _vpX + spot.cx * scale;
      spot.y = _vpY + spot.cy * scale;
      spot.visible = true;
    } else {
      spot.visible = false;
    }
  }
};
