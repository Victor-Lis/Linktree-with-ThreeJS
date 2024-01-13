import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import grass from './imgs/grass.svg'

const canvas = document.querySelector("canvas")

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

canvas.style.minWidth = `${window.innerWidth}px`
canvas.style.minHeight = `${window.innerHeight}px`

renderer.setSize(parseInt(canvas.style.minWidth), parseInt(canvas.style.minHeight));

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera(
    45,
    parseInt(canvas.style.minWidth) / parseInt(canvas.style.minHeight),
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 20, -20)
orbit.update()
// orbit.enabled = false

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const textureLoader = new THREE.TextureLoader()

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0),
})

const groundPhysMat = new CANNON.Material()

const groundGeo = new THREE.PlaneGeometry(250, 250);
const groundMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    // wireframe: true,
    material: groundPhysMat,
    map: textureLoader.load(grass)
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
world.addBody(groundBody);
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

// Sphere

const spherePhysMat = new CANNON.Material()

const sphereGeo = new THREE.SphereGeometry(5)
const sphereMat = new THREE.MeshBasicMaterial({
    color: 0xf00000,
    wireframe: true,
    material: spherePhysMat,
})
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat)
scene.add(sphereMesh)

const sphereBody = new CANNON.Body({
    mass: 4,
    shape: new CANNON.Sphere(5),
    position: new CANNON.Vec3(0.5, 50, 0),
    material: spherePhysMat
});

world.addBody(sphereBody)

const groundSphereContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    spherePhysMat,
    {
        friction: 1,
        restitution: 1
    }
);

sphereBody.linearDamping = 0.31
world.addContactMaterial(groundSphereContactMat);

// Sphere2

const sphere2PhysMat = new CANNON.Material()

const sphere2Geo = new THREE.SphereGeometry(5)
const sphere2Mat = new THREE.MeshBasicMaterial({
    color: 0x0000f0,
    wireframe: true,
    material: spherePhysMat,
})
const sphere2Mesh = new THREE.Mesh(sphere2Geo, sphere2Mat)
scene.add(sphere2Mesh)

const sphere2Body = new CANNON.Body({
    mass: 4,
    shape: new CANNON.Sphere(5),
    position: new CANNON.Vec3(6.5, 100, 0),
    material: spherePhysMat
});

world.addBody(sphere2Body)

const groundSphere2ContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    sphere2PhysMat,
    {
        friction: 1,
        restitution: 1
    }
);

sphere2Body.linearDamping = 0.31
world.addContactMaterial(groundSphere2ContactMat);

const timeStep = 1 / 60

function animate() {
    world.step(timeStep)

    groundMesh.position.copy(groundBody.position)
    groundMesh.quaternion.copy(groundBody.quaternion)

    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);

    sphere2Mesh.position.copy(sphere2Body.position);
    sphere2Mesh.quaternion.copy(sphere2Body.quaternion);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', function () {
    canvas.style.minWidth = `${window.innerWidth}px`
    canvas.style.minHeight = `${window.innerHeight}px`

    camera.aspect = parseInt(canvas.style.minWidth) / parseInt(canvas.style.minHeight);
    camera.updateProjectionMatrix()
    renderer.setSize(parseInt(canvas.style.minWidth), parseInt(canvas.style.minHeight))
})