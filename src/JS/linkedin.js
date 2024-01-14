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
    glowstone,
    portal as portalTexture,
} from './textures.js'

import {
    sphere
} from './scenePhys.js'

import { 
    world 
} from './scenePhys';

import {
    createPortal,
    createWall
} from './functions.js'

const linkedinFloor = createWall({
    geoWidth: .5,
    geoHeight: 30,
    geoDepth: 30,
    bodyPositionX: 66,
    bodyPositionY: 10,
    bodyPositionZ: -90,
    color: 0xffffff,
    map: linkedin,
})

const linkedinFloorSphereContactMat = new CANNON.ContactMaterial(
    linkedinFloor.physMat,
    sphere.phys,
    {
        restitution: 0,
    }
)

linkedinFloor.body.quaternion.setFromEuler(Math.PI * 1.7, Math.PI * 1.5, 0);
world.addContactMaterial(linkedinFloorSphereContactMat)

const point2Light = new THREE.PointLight(0x000ff0, 5000, 300)
point2Light.position.set(75, 30, -95)
scene.add(point2Light)

// linkedinFloor.body.quaternion.setFromEuler(0, 0, Math.PI * 1.5);
world.addContactMaterial(linkedinFloorSphereContactMat)

const portal = createPortal({
    positionX: 45,
    positionY: 5,
    positionZ: -115,
    width: 15,
    bodyTexture: glowstone,
    restitution: 0,
    portalTexture: portalTexture,
})

function renderLinkedin(){
    linkedinFloor.mesh.position.copy(linkedinFloor.body.position)
    linkedinFloor.mesh.quaternion.copy(linkedinFloor.body.quaternion)
}

export { renderLinkedin } 