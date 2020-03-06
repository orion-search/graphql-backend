const shader = `
attribute float size;

attribute vec3 customColor;
attribute float opacity;

varying vec3 vColor;
varying float vOpacity;

uniform bool noDepth;

void main() {
  vColor = customColor;
  vOpacity = opacity;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.);

  gl_PointSize = noDepth ? size : size * (1000.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export default shader;
