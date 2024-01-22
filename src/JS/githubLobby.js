import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
    scene,
    camera
} from './scene.js'

import {
    github,
    pedregulho,
    obsidiana,
    brick,
    portal as portalTexture,
} from './textures.js'

import {
    sphere,
} from './scenePhys.js'

import {
    world
} from './scenePhys';

import {
    createWall,
    createPortal,
} from './functions.js'

const floor = createWall({
    geoWidth: 250,
    geoHeight: 1,
    geoDepth: 250,
    bodyPositionX: 0,
    bodyPositionY: 0,
    bodyPositionZ: 250,
    color: 0xffffff,
    map: github,
})

floor.body.quaternion.setFromEuler(0, Math.PI * 2, 0)

const floorSphereContactMat = new CANNON.ContactMaterial(
    floor.physMat,
    sphere.phys,
    {
        restitution: 0,
    }
)

world.addContactMaterial(floorSphereContactMat)

const point3Light = new THREE.PointLight(0x3e00a3, 5000, 300)
point3Light.position.set(-70, 50, -105)
scene.add(point3Light)

const wall1 = createWall({
    geoWidth: 255,
    geoHeight: 125,
    geoDepth: 10,
    bodyPositionX: 125,
    bodyPositionZ: 250,
    map: brick,
})

const wall1SphereContactMat = new CANNON.ContactMaterial(
    wall1.physMat,
    sphere.phys,
    {
        friction: 1,
        restitution: 1
    }
);

world.addContactMaterial(wall1SphereContactMat)
wall1.body.quaternion.setFromEuler(0, Math.PI * -.5, 0);

const wall2 = createWall({
    geoWidth: 255,
    geoHeight: 125,
    geoDepth: 10,
    bodyPositionX: -125,
    bodyPositionZ: 250,
    map: brick,
})

const wall2SphereContactMat = new CANNON.ContactMaterial(
    wall2.physMat,
    sphere.phys,
    {
        friction: 1,
        restitution: 1
    }
);

world.addContactMaterial(wall2SphereContactMat)
wall2.body.quaternion.setFromEuler(0, Math.PI * -.5, 0);

const wall3 = createWall({
    geoWidth: 255,
    geoHeight: 125,
    geoDepth: 10,
    bodyPositionX: 0,
    bodyPositionZ: -135,
    map: brick,
})

const wall3SphereContactMat = new CANNON.ContactMaterial(
    wall3.physMat,
    sphere.phys,
    {
        friction: 1,
        restitution: 1
    }
);

world.addContactMaterial(wall3SphereContactMat)

const wall4 = createWall({
    geoWidth: 255,
    geoHeight: 125,
    geoDepth: 10,
    bodyPositionX: 0,
    bodyPositionZ: 375,
    map: brick,
})

const wall4SphereContactMat = new CANNON.ContactMaterial(
    wall4.physMat,
    sphere.phys,
    {
        friction: 1,
        restitution: 1
    }
);

world.addContactMaterial(wall4SphereContactMat)

const roof = createWall({
    geoWidth: 260,
    geoHeight: 260,
    geoDepth: 1,
    bodyPositionX: 0,
    bodyPositionZ: 250,
    opacity: 0.1,
    transparent: true,
    color: 0x000ff0
})

roof.body.position.y = 125

const roofSphereContactMat = new CANNON.ContactMaterial(
    roof.physMat,
    sphere.phys,
    {
        friction: 0.5,
    }
)

const lobbyPointLight = new THREE.PointLight(0x3e00a3, 5000, 1000)
lobbyPointLight.position.set(0, 70, 275)
scene.add(lobbyPointLight)

roof.body.quaternion.setFromEuler(Math.PI / 2, 0, 0);
world.addContactMaterial(roofSphereContactMat)

function renderGithubLobby() {
    floor.mesh.position.copy(floor.body.position)
    floor.mesh.quaternion.copy(floor.body.quaternion)

    wall1.mesh.position.copy(wall1.body.position)
    wall1.mesh.quaternion.copy(wall1.body.quaternion)

    wall2.mesh.position.copy(wall2.body.position)
    wall2.mesh.quaternion.copy(wall2.body.quaternion)

    wall3.mesh.position.copy(wall3.body.position)
    wall3.mesh.quaternion.copy(wall3.body.quaternion)

    wall4.mesh.position.copy(wall4.body.position)
    wall4.mesh.quaternion.copy(wall4.body.quaternion)

    roof.mesh.position.copy(roof.body.position)
    roof.mesh.quaternion.copy(roof.body.quaternion)
}

function teleportToGithubLobby(){
    sphere.body.angularVelocity.set(0,0,0)
    sphere.body.position.set(0, 10, 250)
    sphere.mesh.position.copy(sphere.body.position)
    camera.position.set(0, 120, 367.5)
}

export { renderGithubLobby, teleportToGithubLobby }