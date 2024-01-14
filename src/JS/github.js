import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
    scene
} from './scene.js'
 
import {
    github,
    pedregulho
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

const githubBaseWall1 = createWall({
    geoWidth: 50,
    geoHeight: 10,
    geoDepth: 2.5,
    bodyPositionX: -75,
    bodyPositionZ: -100,
    color: 0x777777,
    map: pedregulho,
})

const githubBaseWall1SphereContactMat = new CANNON.ContactMaterial(
    githubBaseWall1.physMat,
    sphere.phys,
    {
        restitution: 0,
    }
)

world.addContactMaterial(githubBaseWall1SphereContactMat)

const githubBaseWall2 = createWall({
    geoWidth: 20,
    geoHeight: 10,
    geoDepth: 2.5,
    bodyPositionX: -110,
    bodyPositionZ: -75,
    color: 0x777777,
    map: pedregulho,
})

const githubBaseWall2SphereContactMat = new CANNON.ContactMaterial(
    githubBaseWall2.physMat,
    sphere.phys,
    {
        restitution: 0,
    }
)

githubBaseWall2.body.quaternion.setFromEuler(0, 0, 0);
world.addContactMaterial(githubBaseWall2SphereContactMat)

const githubBaseWall3 = createWall({
    geoWidth: 25,
    geoHeight: 10,
    geoDepth: 2.5,
    bodyPositionX: -100,
    bodyPositionZ: -87.5,
    color: 0x777777,
    map: pedregulho,
})

const githubBaseWall3SphereContactMat = new CANNON.ContactMaterial(
    githubBaseWall3.physMat,
    sphere.phys,
    {
        restitution: 0,
    }
)

githubBaseWall3.body.quaternion.setFromEuler(0, Math.PI * 1.5, 0);
world.addContactMaterial(githubBaseWall3SphereContactMat)

const githubBaseWall4 = createWall({
    geoWidth: 50,
    geoHeight: 10,
    geoDepth: 2.5,
    bodyPositionX: -75,
    bodyPositionZ: -50,
    color: 0x777777,
    map: pedregulho,
})

const githubBaseWall4SphereContactMat = new CANNON.ContactMaterial(
    githubBaseWall4.physMat,
    sphere.phys,
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
    bodyPositionZ: -75,
    color: 0x777777,
    map: pedregulho,
})

const githubBaseWall5SphereContactMat = new CANNON.ContactMaterial(
    githubBaseWall5.physMat,
    sphere.phys,
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
    sphere.phys,
    {
        restitution: 0,
    }
)

const point3Light = new THREE.PointLight(0xffffff, 3500, 300)
point3Light.position.set(-85, 30, -85)
scene.add(point3Light)

githubFloor.body.quaternion.setFromEuler(Math.PI * 1.5, Math.PI * 1.5, 0);
console.log(githubFloor.body)
world.addContactMaterial(githubFloorSphereContactMat)

function renderGithub(){
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
}

export { renderGithub }