import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
    scene
} from './scene.js'

import {
    world
} from './scenePhys.js'

function createWall({ geoWidth, geoHeight, geoDepth, bodyPositionX, bodyPositionY, bodyPositionZ, transparent, opacity, color, map }) {
    const geo = new THREE.BoxGeometry(geoWidth, geoHeight, geoDepth)
    const mat = new THREE.MeshStandardMaterial({
        color: color ? color : 0x333333,
        side: THREE.DoubleSide,
        transparent: !!transparent,
        opacity: opacity ? opacity : 1,
        map: map,
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    const physMat = new CANNON.Material()

    const body = new CANNON.Body({
        //shape: new CANNON.Plane(),
        //mass: 10
        shape: new CANNON.Box(new CANNON.Vec3(geoWidth / 2, geoHeight / 2, geoDepth / 2)),
        position: new CANNON.Vec3(bodyPositionX, (bodyPositionY ? bodyPositionY : geoHeight / 2), bodyPositionZ),
        type: CANNON.Body.STATIC,
        material: physMat,
    });

    world.addBody(body);

    return { mesh, physMat, body }
}

export { createWall }