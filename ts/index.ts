import * as THREE from "three";

// import non-standard examples
// require THREE to be available globally
(window as any).THREE = THREE;
import "three/examples/js/loaders/MTLLoader.js";
import "three/examples/js/loaders/OBJLoader.js";

import { App } from './app';

new App();