import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
    scene
} from './scene.js'
 
import {
    linkedin,
    madeira,
    quartzo,
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
    geoWidth: 6,
    geoHeight: 25,
    geoDepth: 66.5,
    bodyPositionX: 86,
    bodyPositionZ: 51,
    color: 0xffffff,
    map: quartzo,
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
    geoWidth: 6,
    geoHeight: 25,
    geoDepth: 72,
    bodyPositionX: 52,
    bodyPositionZ: 84,
    color: 0xffffff,
    map: quartzo,
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
    geoHeight: 85,
    geoDepth: 70,
    bodyPositionX: 23,
    bodyPositionY: 1,
    bodyPositionZ: 90,
    color: 0xcccccc,
    map: madeira,
})

const linkedinRampSphereContactMat = new CANNON.ContactMaterial(
    linkedinRamp.physMat,
    sphere.phys,
    {
        friction: 1000,
    },
)

linkedinRamp.body.quaternion.setFromEuler(Math.PI * 1.5, Math.PI * 1.27, 0);
world.addContactMaterial(linkedinRampSphereContactMat)

const linkedinFloor = createWall({
    geoWidth: .5,
    geoHeight: 65.5,
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
        restitution: .5,
    }
)

const point2Light = new THREE.PointLight(0x000ff0, 10000, 300)
point2Light.position.set(90, 20, 90)
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