import * as THREE from "three";
import { constructFloor } from "./construct-floor";
import { loadModel } from "./load-model";
import { Mover } from "./mover";
import { Sampler } from "./sampler";
import { addPlanets } from "./add-planets";
import { addOctahedrons } from "./add-octahedron";

export class App {
	private scene: THREE.Scene;
	private mover: Mover;
	private sampler: Sampler;

	constructor() {
		this.initialise();
		this.loadScene();
		this.sampler = new Sampler();
	}

	private async loadScene() {
		const floor = constructFloor();
		this.scene.add(floor);
		const meshes = await addPlanets(7);
		const artifacts = addOctahedrons();
		this.scene.add(...meshes, ...artifacts);
	}

	private initialise() {
		this.scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
		this.scene.add(ambientLight);

		this.mover = new Mover(camera, this.scene);
		this.scene.add(this.mover.yawObject);

		const animate = () => {
			requestAnimationFrame(animate);
			this.mover.move();
			renderer.render(this.scene, camera);
		};
		animate();
	}
}
