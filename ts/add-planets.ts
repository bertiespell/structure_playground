import * as THREE from "three";

export const addPlanets = async (
    numberOfPlanets: number, 
    distanceMultiplier: number = 1
): Promise<Array<THREE.Mesh>> => {
    let loader = new THREE.TextureLoader();
    return new Promise((resolve) => {
        loader.load("./land_ocean_ice_cloud_2048.jpg", (texture) => {
            let geometry = new THREE.SphereBufferGeometry(200, 20, 20);
            let material = new THREE.MeshLambertMaterial({ map: texture });

            const meshes: Array<THREE.Mesh> = [];

            for (let i = 0; i < numberOfPlanets; i++) {
                let mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(
                    (Math.random() * 1000 * distanceMultiplier) - (500 * distanceMultiplier),
                    (Math.random() * 500) + 300,
                    (Math.random() * 1000 * distanceMultiplier) - (500 * distanceMultiplier)
                );
                mesh.rotation.set(
                    Math.random() * 360, 
                    Math.random() * 360, 
                    Math.random() * 360
                );
                meshes.push(mesh);
            }
            resolve(meshes);
        });
    });
}