function main() {
  const canvas = document.querySelector("#glCanvas");

  //Initialize the GL context
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
  // Set clear color to black
  //             R    G    B    OPACITY
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // clear the color buffer with above color
  gl.clear(gl.COLOR_BUFFER_BIT);

  //Build our shaders
  var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
  var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  //Build a program from those shaders
  var program = createProgram(gl, vertexShader, fragmentShader);

  // we have a program on the GPU ^^^^




}

window.onload = main;

function createShader(gl, type, source) {
  //gl = canvas
  //type = frag || vertx
  //source = non javascript typed src code
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
};