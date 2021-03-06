import styled from "@emotion/styled";
import {
  OrthographicCamera,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import theme from "../../../styles";

export const AbsoluteCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -100;

  user-select: none;
  outline: none;
`;

export const HUD = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;

  overflow: hidden;
  pointer-events: none;

  user-select: none;
`;

/**
 * Kicks off THREE app boilerplate
 */
export const initApp = ({ canvas }) => {
  const { width, height } = canvas.getBoundingClientRect();

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor(theme.colors.black);
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio * 1.5);

  let aspectRatio = window.innerWidth / window.innerHeight;
  let mouse = new Vector2();
  let raycaster = new Raycaster();
  raycaster.params.Points.threshold = 20;

  const views = {
    diversity: {
      camera: new OrthographicCamera(0, width, 0, height, 0, 1),
      scene: new Scene(),
      viz: {}, // holds pre-rendered visualization
      // ...visualizations.diversity,
    },
    particles: {
      camera: new PerspectiveCamera(27, aspectRatio, 0.001, 35000),
      scene: new Scene(),
      viz: {}, // holds pre-rendered visualization
      // ...visualizations.particles,
    },
  };
  const controls = new OrbitControls(views.particles.camera, canvas);

  window.addEventListener("resize", () => {
    for (let [scene] of Object.entries(views)) {
      views[scene].camera.aspect = window.innerWidth / window.innerHeight;
      views[scene].camera.updateProjectionMatrix();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio * 1.5);
  });

  renderer.domElement.addEventListener("mousemove", (event) => {
    event.preventDefault();
    renderer.setPixelRatio(window.devicePixelRatio * 1.5);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  return {
    controls,
    mouse,
    raycaster,
    renderer,
    render: (viewName) => {
      // don't render any scenes
      if (!viewName || !views[viewName]) return () => {};

      const v = views[viewName];
      return () => {
        raycaster.setFromCamera(mouse, v.camera);
        renderer.render(v.scene, v.camera);
      };
    },
    views,
  };
};
