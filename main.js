window.onload = main;

function main() {
  ///////////////////////////////////////////////////////////////////////////
  // INITIALIZATION
  ///////////////////////////////////////////////////////////////////////////
  const canvas = document.querySelector("#glCanvas");

  //Initialize the GL context
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  //Build our shaders
  var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
  var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  //Build a program from those shaders
  var program = createProgram(gl, vertexShader, fragmentShader);

  // must supply data to our program
  //look up location attribute of program

  // Looking up attribute locations (and uniform locations) is something you should do during initialization, not in your render loop.

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position")
  // make a buffer
  var positionBuffer = gl.createBuffer();
  //make a bind point. works similar to .bind, it binds a resource to one global variable, making it accessible by all other functions.
  // basically...  ARRAY_BUFFER = positionBuffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // this binds our positionbuffer to the ARRAY_BUFFER above

  //pass data into the buffer now that we can access it globally.
  //3 2D coordinates:
  var positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
  ];
  // ARRAY_BUFFER is just the global variable through which
  // our earlier declared position buffer is accessed through

  // gl needs strongly typed data, so floats are needed instead of standard arrays

  //STATIC DRAW just tells gl we wont be drawing to this buffer much
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


  ///////////////////////////////////////////////////////////////////////////
  // RENDERING
  ///////////////////////////////////////////////////////////////////////////

  webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  // this converts our clipspace coordinates of -1 to +1 into the right screen size
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Set clear color to black
  //             R    G    B    Alpha (OPACITY)
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // clear the color buffer with above color
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);
  gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

  // attribute vec4 a_position;
  // a vec4 is a 4 float value:
  // 0,0,0,1 -> default vals
  //a_position = {x: 0, y: 0, z: 0, w: 1}

  //FINALLY DARW THE DAMN TRIANGLE

  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 3; //darw 3 vertices
  gl.drawArrays(primitiveType, offset, count);
}



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