import * as THREE from "three";
import { loadModel } from "./load-model";
import { Mover } from "./mover";
import { constructFloor } from "./construct-floor";

export class App {
	private scene: THREE.Scene;

	constructor() {
		this.initialise();
		this.loadScene();
	}

	private async loadScene() {
		const floor = constructFloor();
		this.scene.add(floor);
		// const model = await loadModel('./model.obj', './model.mtl');
		// this.scene.add(model);
	}

	private initialise() {
		this.scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		let ambientLight = new THREE.AmbientLight(0x404040); // soft white light
		this.scene.add(ambientLight);

		const mover = new Mover(camera);
		this.scene.add(mover.controls.getObject());

		const animate = () => {
			requestAnimationFrame(animate);
			mover.move();
			renderer.render(this.scene, camera);
		};
		animate();
	}
}
