import * as THREE from "three";

export const addOctahedrons = (numberOfOctahedrons = 20): Array<THREE.Mesh> => {
    const geometry = new THREE.OctahedronGeometry(10,1);
    const material = new THREE.MeshStandardMaterial( {
        color: 0x4286f4,
        // shading: THREE.Shading, // default is THREE.SmoothShading
        metalness: 0,
        roughness: 1
    } );

    let shapes: Array<THREE.Mesh> = []

    for (let i = 0; i < numberOfOctahedrons; i++) {
        const newShape = new THREE.Mesh(geometry, material);
        newShape.position.y += 10;
        newShape.position.x += (Math.random() * 500) - 300;
        newShape.position.z += (Math.random() * 500) - 600;
        shapes.push(newShape);
    }

    return shapes;
}