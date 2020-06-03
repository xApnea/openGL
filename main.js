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
}

window.onload = main;