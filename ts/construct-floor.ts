import * as THREE from "three";

export const constructFloor = (): THREE.Mesh => {
	let vertex = new THREE.Vector3();
	let color = new THREE.Color();

	let floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
	floorGeometry.rotateX(-Math.PI / 2);
    // vertex displacement
	let position = floorGeometry.attributes.position as THREE.BufferAttribute;
	for (let i = 0, l = position.count; i < l; i++) {
		vertex.fromBufferAttribute(position, i);
		vertex.x += Math.random() * 20 - 10;
		vertex.y += Math.random() * 2;
		vertex.z += Math.random() * 20 - 10;
		position.setXYZ(i, vertex.x, vertex.y, vertex.z);
	}
	// @ts-ignore
	floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
	// @ts-ignore
	position = floorGeometry.attributes.position;
	let colors = [];
	for (let i = 0, l = position.count; i < l; i++) {
		// @ts-ignore
		color.setHSL(Math.random() * 0.2 + 0.6, 0.75, Math.random() * 0.25 + 0.75);
		// @ts-ignore
		colors.push(color.r, color.g, color.b);
	}
	floorGeometry.addAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
	let floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
	return new THREE.Mesh(floorGeometry, floorMaterial);
};
