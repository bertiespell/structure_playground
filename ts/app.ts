import * as THREE from "three";

export class App {
	private scene: THREE.Scene;

	constructor() {
		this.initialise();
		this.loadModel();
	}

	public loadModel() {
		const loader = new THREE.OBJLoader();
		loader.load(
			// resource URL
			"./model.obj",

			// onLoad callback
			// Here the loaded data is assumed to be an object
			(obj) => {
				this.scene.add(obj);
			},

			// onProgress callback
			(xhr) => {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
			},

			// onError callback
			(err) => {
				console.error("An error happened", err);
			},
		);
	}

	private initialise() {
		this.scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		this.scene.add(cube);

		camera.position.z = 5;

		var light = new THREE.PointLight( 0xff0000, 10, 100 );
		light.position.set( 50, 50, 50 );
		this.scene.add( light );

		var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
		this.scene.add( ambientLight );

		const animate = () => {
			requestAnimationFrame(animate);

			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			renderer.render(this.scene, camera);
		};

		animate();
	}
}