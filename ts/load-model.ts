import * as THREE from "three";

export const loadModel = (objFilePath: string, mtlFilePath: string): Promise<THREE.Group> => {
    return new Promise((resolve, reject) => {
        const mtlLoader = new THREE.MTLLoader();
		mtlLoader.load(mtlFilePath, (material) => {
			const loader = new THREE.OBJLoader();
			loader.setMaterials(material);
			loader.load(objFilePath, resolve, () => {}, reject);
		});
    });
}