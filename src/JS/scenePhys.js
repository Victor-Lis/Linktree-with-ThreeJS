import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
    grass,
} from './textures.js'

import { 
    renderer, 
    camera,
    scene,
} from './scene.js'

import {
    grass,
    bola, 
} from './textures.js'

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -19.81, 0),
})

const groundPhysMat = new CANNON.Material()

const groundGeo = new THREE.PlaneGeometry(250, 250);
const groundMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    // wireframe: true,
    map: grass
})
const groundMesh = new THREE.Mesh(groundGeo, groundMat)
scene.add(groundMesh)

const groundBody = new CANNON.Body({
    //shape: new CANNON.Plane(),
    //mass: 10
    shape: new CANNON.Box(new CANNON.Vec3(125, 125, 0.1)),
    type: CANNON.Body.STATIC,
    material: groundPhysMat,
});
groundBody.quaternion.setFromEuler(Math.PI / 2, 0, 0);
world.addBody(groundBody);

// Sphere

const spherePhysMat = new CANNON.Material()

const sphereGeo = new THREE.SphereGeometry(5)
const sphereMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: bola,
})
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat)
scene.add(sphereMesh)

const sphereBody = new CANNON.Body({
    mass: 50,
    shape: new CANNON.Sphere(5),
    position: new CANNON.Vec3(0, 15, 0),
    material: spherePhysMat
});

world.addBody(sphereBody)

const groundSphereContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    spherePhysMat,
    {
        friction: 1,
        restitution: 0
    }
);

sphereBody.linearDamping = 0.25
world.addContactMaterial(groundSphereContactMat);

const ground = {
    mesh: groundMesh,
    body: groundBody,
    phys: groundPhysMat,
}

const sphere = {
    mesh: sphereMesh,
    body: sphereBody,
    phys: spherePhysMat,
}

const timeStep = 1 / 60

function renderScenePhys(){
    world.step(timeStep)

    ground.mesh.position.copy(ground.body.position)
    ground.mesh.quaternion.copy(ground.body.quaternion)

    sphere.mesh.position.copy(sphere.body.position);
    sphere.mesh.quaternion.copy(sphere.body.quaternion);
}

export { world, ground, sphere, renderScenePhys }