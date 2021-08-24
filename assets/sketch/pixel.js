
export const sketch = p => {

  // this variable will hold our shader object
  let shader;
  let cam;

  let count = 0;

  p.preload = function(){
    // load the shader
    shader = p.loadShader('assets/shader/basic.vert', 'assets/shader/basic.frag');
  }

  p.setup = function() {
    // shaders require WEBGL mode to work
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();

    cam = p.createCapture(p.VIDEO);
    cam.size(p.windowWidth, p.windowHeight);
    cam.hide();
  }

  p.windowResized = function(){
    resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.draw = function() {
    // shader() sets the active shader with our shader
    p.shader(shader);

    // passing cam as a texture
    shader.setUniform('tex0', cam);

    let value = p.mouseY / p.height;
    shader.setUniform('u_a', p.mouseX / p.width);
    shader.setUniform('u_b', p.mouseY / p.height);
    shader.setUniform('u_c', count % 6 / 6);

    // rect gives us some geometry on the screen
    p.rect(0,0,p.width, p.height);
  }

  p.mousePressed = function() {
    count++;
  }

}