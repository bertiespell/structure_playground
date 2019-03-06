import * as THREE from "three";
import { throttle } from 'underscore';
import { playChord } from "./make-chord";

export type EncounteredObjects = {
    [uuid: string]: boolean
}
export class Mover {
    private controls: any;
	public get yawObject(): THREE.Object3D {
        return this.controls.getObject();
    }
    public get directionFacing(): THREE.Vector3 {
        return this.controls.getDirection(new THREE.Vector3(0,0,0));
    }

    public get encounteredObjects() {
        return this._encounteredObjects;
    }

    private _encounteredObjects: EncounteredObjects = {};
	private moveForward = false;
	private moveBackward = false;
	private moveLeft = false;
	private moveRight = false;
	private canJump = false;
	private prevTime = performance.now();
	private velocity = new THREE.Vector3();
    private direction = new THREE.Vector3();
    
    private throttledEncounterSwap: any;

	constructor(
        camera: THREE.PerspectiveCamera, 
        private scene: THREE.Scene
    ) {
		this.controls = new (THREE as any).PointerLockControls(camera);
		document.body.addEventListener("click", () => {
			this.controls.lock();
        });

		const onKeyDown = (event: KeyboardEvent) => {
			switch (event.keyCode) {
				case 38: // up
				case 87: // w
					this.moveForward = true;
					break;
				case 37: // left
				case 65: // a
					this.moveLeft = true;
					break;
				case 40: // down
				case 83: // s
					this.moveBackward = true;
					break;
				case 39: // right
				case 68: // d
					this.moveRight = true;
					break;
				case 32: // space
					if (this.canJump === true) {
						this.velocity.y += 350;
					}
					this.canJump = false;
					break;
			}
		};
		const onKeyUp = (event: KeyboardEvent) => {
			switch (event.keyCode) {
				case 38: // up
				case 87: // w
					this.moveForward = false;
					break;
				case 37: // left
				case 65: // a
					this.moveLeft = false;
					break;
				case 40: // down
				case 83: // s
					this.moveBackward = false;
					break;
				case 39: // right
				case 68: // d
					this.moveRight = false;
					break;
			}
		};
		document.addEventListener("keydown", onKeyDown, false);
        document.addEventListener("keyup", onKeyUp, false);
        
        const throttledEncountedSwap = throttle((uuid: string) => {
            if (!this._encounteredObjects.hasOwnProperty(uuid)) {
                this._encounteredObjects[uuid] = true;
            } else {
                this._encounteredObjects[uuid] = !this._encounteredObjects[uuid];
            }
            if (this._encounteredObjects[uuid]) {
                console.log('ThrolledEncounterSwap')
                playChord(Math.min(Math.min(Math.random()*80, 50), 80));
            }
        }, 3000);

        this.throttledEncounterSwap = throttledEncountedSwap;
	}

	public move() {
		if (this.controls.isLocked === true) {
            const raycaster = new THREE.Raycaster(
                this.yawObject.position, 
                this.directionFacing.normalize(), 
                0, 
                20
            );

            const intersections = raycaster.intersectObjects(this.scene.children);
            
            intersections.forEach(intersection => {
                // when we encounter a new object - we store it as colliding
                const uuid = intersection.object.uuid;
                this.throttledEncounterSwap(uuid);
            });
            
			const onObject = intersections.length > 0;
			const time = performance.now();
			const delta = (time - this.prevTime) / 1000;
			this.velocity.x -= this.velocity.x * 10.0 * delta;
			this.velocity.z -= this.velocity.z * 10.0 * delta;
			this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
			this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
			this.direction.x = Number(this.moveLeft) - Number(this.moveRight);
			this.direction.normalize(); // this ensures consistent movements in all directions
			if (this.moveForward || this.moveBackward) {
				this.velocity.z -= this.direction.z * 400.0 * delta;
			}
			if (this.moveLeft || this.moveRight) {
				this.velocity.x -= this.direction.x * 400.0 * delta;
			}
			if (onObject === true) {
				this.velocity.y = Math.max(0, this.velocity.y);
				this.canJump = true;
			}
			this.controls.getObject().translateX(this.velocity.x * delta);
			this.controls.getObject().translateY(this.velocity.y * delta);
			this.controls.getObject().translateZ(this.velocity.z * delta);
			if (this.controls.getObject().position.y < 10) {
				this.velocity.y = 0;
				this.controls.getObject().position.y = 10;
				this.canJump = true;
			}
			this.prevTime = time;
		}
	}
}
