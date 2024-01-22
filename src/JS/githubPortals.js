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
    followersFloor,
    starsFloor
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

const portalFollowers = createPortal({
    positionX: -90,
    positionY: 5,
    positionZ: 135,
    width: 15,
    bodyTexture: obsidiana,
    restitution: 0,
    portalTexture: portalTexture,
    portalColor: 0xffffff,
})

const githubFloorFollowers = createWall({
    geoWidth: .5,
    geoHeight: 30,
    geoDepth: 30,
    bodyPositionX: -67.5,
    bodyPositionY: 10,
    bodyPositionZ: 155,
    color: 0xffffff,
    map: followersFloor,
})

const githubFloorFollowersSphereContactMat = new CANNON.ContactMaterial(
    githubFloorFollowers.physMat,
    sphere.phys,
    {
        restitution: 0,
    }
)

const portalFollowersLight = new THREE.PointLight(0x3e00a3, 5000, 300)
portalFollowersLight.position.set(-75, 50, 175)
scene.add(portalFollowersLight)

githubFloorFollowers.body.quaternion.setFromEuler(Math.PI * 1.7, Math.PI * 1.5, 0);
world.addContactMaterial(githubFloorFollowersSphereContactMat)

const githubStars = createPortal({
    positionX: 46,
    positionY: 5,
    positionZ: 135,
    width: 15,
    bodyTexture: obsidiana,
    restitution: 0,
    portalTexture: portalTexture,
    portalColor: 0xFFFF00,
})

const githubFloor = createWall({
    geoWidth: .5,
    geoHeight: 30,
    geoDepth: 30,
    bodyPositionX: 68,
    bodyPositionY: 10,
    bodyPositionZ: 155,
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

const portalLight = new THREE.PointLight(0xFFBD59, 5000, 300)
portalLight.position.set(75, 50, 175)
scene.add(portalLight)

githubFloor.body.quaternion.setFromEuler(Math.PI * 1.7, Math.PI * 1.5, 0);
world.addContactMaterial(githubFloorSphereContactMat)

const point3Light = new THREE.PointLight(0x3e00a3, 5000, 300)
point3Light.position.set(-70, 50, -105)
scene.add(point3Light)

function renderGithubPortals() {

    githubFloor.mesh.position.copy(githubFloor.body.position)
    githubFloor.mesh.quaternion.copy(githubFloor.body.quaternion)

    githubFloorFollowers.mesh.position.copy(githubFloorFollowers.body.position)
    githubFloorFollowers.mesh.quaternion.copy(githubFloorFollowers.body.quaternion)

}

export { renderGithubPortals }