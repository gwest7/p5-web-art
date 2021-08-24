
precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D tex0;

uniform float u_a;
uniform float u_b;
uniform float u_c;

// http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl
// vec3 rgb2hsv(vec3 c) {
//   vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
//   vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
//   vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);

//   float d = q.x - min(q.w, q.y);
//   float e = 1.0e-10;
//   return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
// }
// vec3 hsv2rgb(vec3 c) {
//   vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//   vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//   return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
// }

vec3 rgb2hsb( in vec3 c ){
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
    rgb = rgb * rgb * (3.0 - 2.0 * rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {
    
  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;

  vec4 tex = texture2D(tex0, uv);

  vec3 hsb = rgb2hsb(vec3(tex.r,tex.g,tex.b));
  hsb.x = (hsb.z + u_c * 5.0) / 6.0; // hue
  hsb.y = 1.0 - (hsb.y + u_a) * 0.5; // sat
  hsb.z = (hsb.z + u_b) * 0.5; // bri
  vec3 color = hsb2rgb(hsb);

  // render the output
  gl_FragColor = vec4(color, 1.0);
}