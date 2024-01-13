import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import grass from './imgs/grass.svg'
import linkedin from './imgs/linkedin.png'
import github from './imgs/github.png'

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

camera.position.set(0, 500, 0)
orbit.update()
// orbit.enabled = false

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xFFFFFF, 3500, 300)
pointLight.position.set(0, 50, 0)
scene.add(pointLight)

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
groundBody.quaternion.setFromEuler(Math.PI / 2, 0, 0);

// Sphere

const spherePhysMat = new CANNON.Material()

const sphereGeo = new THREE.SphereGeometry(5)
const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xf00000,
    wireframe: true,
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

function createWall({ geoWidth, geoHeight, geoDepth, bodyPositionX, bodyPositionY, bodyPositionZ, transparent, opacity, color, map }) {
    const geo = new THREE.BoxGeometry(geoWidth, geoHeight, geoDepth)
    const mat = new THREE.MeshStandardMaterial({
        color: color ? color : 0x333333,
        side: THREE.DoubleSide,
        transparent: !!transparent,
        opacity: opacity ? opacity : 1,
        map: map && textureLoader.load(map),
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

const base = createWall({
    geoWidth: 25,
    geoHeight: .5,
    geoDepth: 25,
    bodyPositionX: 0,
    bodyPositionZ: 0,
    color: 0xffff00
})

const baseSphereContactMat = new CANNON.ContactMaterial(
    base.physMat,
    spherePhysMat,
    {
        friction: 0.5,
    }
)

world.addContactMaterial(baseSphereContactMat)

const wall1 = createWall({
    geoWidth: 265,
    geoHeight: 125,
    geoDepth: 10,
    bodyPositionX: 125,
    bodyPositionZ: 0
})

const wall1SphereContactMat = new CANNON.ContactMaterial(
    wall1.physMat,
    spherePhysMat,
    {
        friction: 1,
        restitution: 2
    }
);

world.addContactMaterial(wall1SphereContactMat)
wall1.body.quaternion.setFromEuler(0, Math.PI * -.5, 0);

const wall2 = createWall({
    geoWidth: 265,
    geoHeight: 125,
    geoDepth: 10,
    bodyPositionX: -125,
    bodyPositionZ: 0
})

const wall2SphereContactMat = new CANNON.ContactMaterial(
    wall2.physMat,
    spherePhysMat,
    {
        friction: 1,
        restitution: 2
    }
);

world.addContactMaterial(wall2SphereContactMat)
wall2.body.quaternion.setFromEuler(0, Math.PI * -.5, 0);

const wall3 = createWall({
    geoWidth: 265,
    geoHeight: 125,
    geoDepth: 10,
    bodyPositionX: 0,
    bodyPositionZ: 125
})

const wall3SphereContactMat = new CANNON.ContactMaterial(
    wall3.physMat,
    spherePhysMat,
    {
        friction: 1,
        restitution: 2
    }
);

world.addContactMaterial(wall3SphereContactMat)

const wall4 = createWall({
    geoWidth: 265,
    geoHeight: 125,
    geoDepth: 10,
    bodyPositionX: 0,
    bodyPositionZ: -125
})

const wall4SphereContactMat = new CANNON.ContactMaterial(
    wall4.physMat,
    spherePhysMat,
    {
        friction: 1,
        restitution: 2
    }
);

world.addContactMaterial(wall4SphereContactMat)

const roof = createWall({
    geoWidth: 260,
    geoHeight: 260,
    geoDepth: 1,
    bodyPositionX: 0,
    bodyPositionZ: 0,
    opacity: 0.1,
    transparent: true,
    color: 0x000ff0
})

roof.body.position.y = 125

const roofSphereContactMat = new CANNON.ContactMaterial(
    roof.physMat,
    spherePhysMat,
    {
        friction: 0.5,
    }
)

roof.body.quaternion.setFromEuler(Math.PI / 2, 0, 0);
world.addContactMaterial(roofSphereContactMat)

const linkedinBaseWall1 = createWall({
    geoWidth: 2.5,
    geoHeight: 20,
    geoDepth: 80,
    bodyPositionX: 95,
    bodyPositionZ: 57.5
})

linkedinBaseWall1.body.quaternion.setFromEuler(0, Math.PI / 2, 0);

const linkedinBaseWall1SphereContactMat = new CANNON.ContactMaterial(
    linkedinBaseWall1.physMat,
    spherePhysMat,
    {
        restitution: 0,
    }
)

world.addContactMaterial(linkedinBaseWall1SphereContactMat)

const linkedinBaseWall2 = createWall({
    geoWidth: 2.5,
    geoHeight: 20,
    geoDepth: 75,
    bodyPositionX: 55,
    bodyPositionZ: 125 - 30
})

const linkedinBaseWall2SphereContactMat = new CANNON.ContactMaterial(
    linkedinBaseWall2.physMat,
    spherePhysMat,
    {
        restitution: 0,
    }
)

world.addContactMaterial(linkedinBaseWall2SphereContactMat)


const linkedinRamp = createWall({
    geoWidth: .5,
    geoHeight: 65,
    geoDepth: 30,
    bodyPositionX: 0,
    bodyPositionY: 1,
    bodyPositionZ: 90,
    color: 0x0ff0f0
})

const linkedinRampSphereContactMat = new CANNON.ContactMaterial(
    linkedinRamp.physMat,
    spherePhysMat,
    {
        friction: 1000,
    },
)

linkedinRamp.body.quaternion.setFromEuler(Math.PI * 1.5, Math.PI * 1.30, 0);
world.addContactMaterial(linkedinRampSphereContactMat)

const linkedinFloor = createWall({
    geoWidth: .5,
    geoHeight: 65,
    geoDepth: 65,
    bodyPositionX: 87.5,
    bodyPositionY: 20,
    bodyPositionZ: 87.5,
    color: 0xffffff,
    map: linkedin,
})

const linkedinFloorSphereContactMat = new CANNON.ContactMaterial(
    linkedinFloor.physMat,
    spherePhysMat,
    {
        restitution: 5,
    }
)

const point2Light = new THREE.PointLight(0x000ff0, 12500, 300)
point2Light.position.set(90, 50, 90)
scene.add(point2Light)

linkedinFloor.body.quaternion.setFromEuler(Math.PI * 1.5, Math.PI * 1.5, 0);
console.log(linkedinFloor.body)
world.addContactMaterial(linkedinFloorSphereContactMat)

const githubBaseWall1 = createWall({
    geoWidth: 200,
    geoHeight: 10,
    geoDepth: 2.5,
    bodyPositionX: 0,
    bodyPositionZ: -100
})

const githubBaseWall1SphereContactMat = new CANNON.ContactMaterial(
    githubBaseWall1.physMat,
    spherePhysMat,
    {
        restitution: 0,
    }
)

world.addContactMaterial(githubBaseWall1SphereContactMat)

const githubBaseWall2 = createWall({
    geoWidth: 50,
    geoHeight: 10,
    geoDepth: 2.5,
    bodyPositionX: 100,
    bodyPositionZ: -75
})

const githubBaseWall2SphereContactMat = new CANNON.ContactMaterial(
    githubBaseWall2.physMat,
    spherePhysMat,
    {
        restitution: 0,
    }
)

githubBaseWall2.body.quaternion.setFromEuler(0, Math.PI * 1.5, 0);
world.addContactMaterial(githubBaseWall2SphereContactMat)

const githubBaseWall3 = createWall({
    geoWidth: 25,
    geoHeight: 10,
    geoDepth: 2.5,
    bodyPositionX: -100,
    bodyPositionZ: -87.5
})

const githubBaseWall3SphereContactMat = new CANNON.ContactMaterial(
    githubBaseWall3.physMat,
    spherePhysMat,
    {
        restitution: 0,
    }
)

githubBaseWall3.body.quaternion.setFromEuler(0, Math.PI * 1.5, 0);
world.addContactMaterial(githubBaseWall3SphereContactMat)

const githubBaseWall4 = createWall({
    geoWidth: 100,
    geoHeight: 10,
    geoDepth: 2.5,
    bodyPositionX: -100,
    bodyPositionZ: -50
})

const githubBaseWall4SphereContactMat = new CANNON.ContactMaterial(
    githubBaseWall4.physMat,
    spherePhysMat,
    {
        restitution: 0,
    }
)

githubBaseWall4.body.quaternion.setFromEuler(0, 0, 0);
world.addContactMaterial(githubBaseWall4SphereContactMat)

const githubBaseWall5 = createWall({
    geoWidth: 50,
    geoHeight: 10,
    geoDepth: 2.5,
    bodyPositionX: -50,
    bodyPositionZ: -75
})

const githubBaseWall5SphereContactMat = new CANNON.ContactMaterial(
    githubBaseWall5.physMat,
    spherePhysMat,
    {
        restitution: 0,
    }
)

githubBaseWall5.body.quaternion.setFromEuler(0, Math.PI * 1.5, 0);
world.addContactMaterial(githubBaseWall5SphereContactMat)

const githubFloor = createWall({
    geoWidth: .5,
    geoHeight: 50,
    geoDepth: 50,
    bodyPositionX: -75,
    bodyPositionY: 1,
    bodyPositionZ: -75,
    color: 0x202020,
    map: github,
})

const githubFloorSphereContactMat = new CANNON.ContactMaterial(
    githubFloor.physMat,
    spherePhysMat,
    {
        restitution: 0,
    }
)

const point3Light = new THREE.PointLight(0xffffff, 12500, 300)
point3Light.position.set(-80, 30, -80)
scene.add(point3Light)

githubFloor.body.quaternion.setFromEuler(Math.PI * 1.5, Math.PI * 1.5, 0);
console.log(githubFloor.body)
world.addContactMaterial(githubFloorSphereContactMat)

const timeStep = 1 / 60

let redirecting = false;

function animate() {
    world.step(timeStep)

    groundMesh.position.copy(groundBody.position)
    groundMesh.quaternion.copy(groundBody.quaternion)

    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);

    wall1.mesh.position.copy(wall1.body.position)
    wall1.mesh.quaternion.copy(wall1.body.quaternion)

    wall2.mesh.position.copy(wall2.body.position)
    wall2.mesh.quaternion.copy(wall2.body.quaternion)

    wall3.mesh.position.copy(wall3.body.position)
    wall3.mesh.quaternion.copy(wall3.body.quaternion)

    wall4.mesh.position.copy(wall4.body.position)
    wall4.mesh.quaternion.copy(wall4.body.quaternion)

    base.mesh.position.copy(base.body.position)
    base.mesh.quaternion.copy(base.body.quaternion)

    roof.mesh.position.copy(roof.body.position)
    roof.mesh.quaternion.copy(roof.body.quaternion)

    linkedinBaseWall1.mesh.position.copy(linkedinBaseWall1.body.position)
    linkedinBaseWall1.mesh.quaternion.copy(linkedinBaseWall1.body.quaternion)

    linkedinBaseWall2.mesh.position.copy(linkedinBaseWall2.body.position)
    linkedinBaseWall2.mesh.quaternion.copy(linkedinBaseWall2.body.quaternion)

    linkedinRamp.mesh.position.copy(linkedinRamp.body.position)
    linkedinRamp.mesh.quaternion.copy(linkedinRamp.body.quaternion)

    linkedinFloor.mesh.position.copy(linkedinFloor.body.position)
    linkedinFloor.mesh.quaternion.copy(linkedinFloor.body.quaternion)

    githubBaseWall1.mesh.position.copy(githubBaseWall1.body.position)
    githubBaseWall1.mesh.quaternion.copy(githubBaseWall1.body.quaternion)

    githubBaseWall2.mesh.position.copy(githubBaseWall2.body.position)
    githubBaseWall2.mesh.quaternion.copy(githubBaseWall2.body.quaternion)

    githubBaseWall3.mesh.position.copy(githubBaseWall3.body.position)
    githubBaseWall3.mesh.quaternion.copy(githubBaseWall3.body.quaternion)

    githubBaseWall4.mesh.position.copy(githubBaseWall4.body.position)
    githubBaseWall4.mesh.quaternion.copy(githubBaseWall4.body.quaternion)

    githubBaseWall5.mesh.position.copy(githubBaseWall5.body.position)
    githubBaseWall5.mesh.quaternion.copy(githubBaseWall5.body.quaternion)

    githubFloor.mesh.position.copy(githubFloor.body.position)
    githubFloor.mesh.quaternion.copy(githubFloor.body.quaternion)

    if (sphereMesh.position.z > 53 && sphereMesh.position.x > 53) {

        setTimeout(() => {

            if (!redirecting) {
                window.location.href = "https://www.linkedin.com/in/victor-lis-bronzo/"
                redirecting = true
            }

        }, 1000)

    }

    if (((sphereMesh.position.z > -102) && (sphereMesh.position.z < -57)) && ((sphereMesh.position.x < -44) && (sphereMesh.position.x > -102))) {

        setTimeout(() => {
            
            if (!redirecting) {
                window.location.href = "https://www.github.com/Victor-Lis"
                redirecting = true
            }

        }, 1000)

    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)

const controls = {
    left: document.querySelector("#left"),
    right: document.querySelector("#right"),
    up: document.querySelector("#up"),
    down: document.querySelector("#down"),
}

controls.left.addEventListener("click", (e) => {
    console.log("Left")
    sphereBody.angularVelocity.set(0, 0, 10)
})

controls.right.addEventListener("click", (e) => {
    console.log("Right")
    sphereBody.angularVelocity.set(0, 0, -10)
})

controls.up.addEventListener("click", (e) => {
    console.log("Up")
    sphereBody.angularVelocity.set(-10, 0, 0)
})

controls.down.addEventListener("click", (e) => {
    console.log("Down")
    sphereBody.angularVelocity.set(10, 0, 0)
})

window.addEventListener("keydown", (e) => {
    if (e.key.toUpperCase() == "A") {
        sphereBody.angularVelocity.set(0, 0, 10)
    }
    if (e.key.toUpperCase() == "D") {
        sphereBody.angularVelocity.set(0, 0, -10)
    }
    if (e.key.toUpperCase() == "W") {
        sphereBody.angularVelocity.set(-10, 0, 0)
    }
    if (e.key.toUpperCase() == "S") {
        sphereBody.angularVelocity.set(10, 0, 0)
    }
})

window.addEventListener('resize', function () {
    canvas.style.minWidth = `${window.innerWidth}px`
    canvas.style.minHeight = `${window.innerHeight}px`

    camera.aspect = parseInt(canvas.style.minWidth) / parseInt(canvas.style.minHeight);
    camera.updateProjectionMatrix()
    renderer.setSize(parseInt(canvas.style.minWidth), parseInt(canvas.style.minHeight))
})