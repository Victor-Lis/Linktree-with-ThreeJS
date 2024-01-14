import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
    scene
} from './scene.js'
 
import {
    linkedin
} from './textures.js'

import {
    sphere
} from './scenePhys.js'

import { 
    world 
} from './scenePhys';

import {
    createWall
} from './functions.js'

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
    sphere.phys,
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
    sphere.phys,
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
    sphere.phys,
    {
        friction: 1000,
    },
)

linkedinRamp.body.quaternion.setFromEuler(Math.PI * 1.5, Math.PI * 1.30, 0);
world.addContactMaterial(linkedinRampSphereContactMat)

const linkedinFloor = createWall({
    geoWidth: .5,
    geoHeight: 62.5,
    geoDepth: 67.5,
    bodyPositionX: 87.5,
    bodyPositionY: 20,
    bodyPositionZ: 87.5,
    color: 0xffffff,
    map: linkedin,
})

const linkedinFloorSphereContactMat = new CANNON.ContactMaterial(
    linkedinFloor.physMat,
    sphere.phys,
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

function renderLinkedin(){
    linkedinBaseWall1.mesh.position.copy(linkedinBaseWall1.body.position)
    linkedinBaseWall1.mesh.quaternion.copy(linkedinBaseWall1.body.quaternion)

    linkedinBaseWall2.mesh.position.copy(linkedinBaseWall2.body.position)
    linkedinBaseWall2.mesh.quaternion.copy(linkedinBaseWall2.body.quaternion)

    linkedinRamp.mesh.position.copy(linkedinRamp.body.position)
    linkedinRamp.mesh.quaternion.copy(linkedinRamp.body.quaternion)

    linkedinFloor.mesh.position.copy(linkedinFloor.body.position)
    linkedinFloor.mesh.quaternion.copy(linkedinFloor.body.quaternion)
}

export { renderLinkedin } 