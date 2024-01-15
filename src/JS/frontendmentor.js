import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
    scene
} from './scene.js'
 
import {
    glowstone,
    frontEndMentor,
    portal as portalTexture,
    madeira,
} from './textures.js'

import {
    sphere
} from './scenePhys.js'

import { 
    world 
} from './scenePhys.js';

import {
    createPortal,
    createWall
} from './functions.js'

const frontEndMentorFloor = createWall({
    geoWidth: .5,
    geoHeight: 30,
    geoDepth: 30,
    bodyPositionX: 0,
    bodyPositionY: 10,
    bodyPositionZ: -90,
    color: 0xffffff,
    map: frontEndMentor,
})

const frontEndMentorFloorSphereContactMat = new CANNON.ContactMaterial(
    frontEndMentorFloor.physMat,
    sphere.phys,
    {
        restitution: 0,
    }
)

frontEndMentorFloor.body.quaternion.setFromEuler(Math.PI * 1.7, Math.PI * 1.5, 0);
world.addContactMaterial(frontEndMentorFloorSphereContactMat)

const portal = createPortal({
    positionX: -22.5,
    positionY: 5,
    positionZ: -115,
    width: 15,
    restitution: 0,
    bodyTexture: madeira,
    portalTexture: portalTexture,
    portalColor: 0x13ff0f,
})

const pointLight = new THREE.PointLight(0x13ff0f, 500, 300)
pointLight.position.set(0, 50, -105)
scene.add(pointLight)

function renderFrontEndMentor(){
    frontEndMentorFloor.mesh.position.copy(frontEndMentorFloor.body.position)
    frontEndMentorFloor.mesh.quaternion.copy(frontEndMentorFloor.body.quaternion)
}

export { renderFrontEndMentor } 