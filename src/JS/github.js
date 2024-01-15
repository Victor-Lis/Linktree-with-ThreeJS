import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
    scene
} from './scene.js'

import {
    github,
    pedregulho,
    obsidiana,
    portal as portalTexture,
} from './textures.js'

import {
    sphere
} from './scenePhys.js'

import {
    world
} from './scenePhys';

import {
    createWall,
    createPortal,
} from './functions.js'

const portal = createPortal({
    positionX: -90,
    positionY: 5,
    positionZ: -115,
    width: 15,
    bodyTexture: obsidiana,
    restitution: 0,
    portalTexture: portalTexture,
    portalColor: 0x3e00a3,
})

const githubFloor = createWall({
    geoWidth: .5,
    geoHeight: 30,
    geoDepth: 30,
    bodyPositionX: -66,
    bodyPositionY: 10,
    bodyPositionZ: -90,
    color: 0xffffff,
    map: github,
})

const githubFloorSphereContactMat = new CANNON.ContactMaterial(
    githubFloor.physMat,
    sphere.phys,
    {
        restitution: 0,
    }
)

githubFloor.body.quaternion.setFromEuler(Math.PI * 1.7, Math.PI * 1.5, 0);
world.addContactMaterial(githubFloorSphereContactMat)

const point3Light = new THREE.PointLight(0x3e00a3, 5000, 300)
point3Light.position.set(-70, 50, -105)
scene.add(point3Light)

function renderGithub() {

    githubFloor.mesh.position.copy(githubFloor.body.position)
    githubFloor.mesh.quaternion.copy(githubFloor.body.quaternion)

}

export { renderGithub }