import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
    sphere
} from './scenePhys.js'

import {
    brick 
} from './textures.js'

import { 
    world 
} from './scenePhys';

import {
    createWall
} from './functions.js'

const wall1 = createWall({
    geoWidth: 265,
    geoHeight: 125,
    geoDepth: 10,
    bodyPositionX: 125,
    bodyPositionZ: 0,
    map: brick,
})

const wall1SphereContactMat = new CANNON.ContactMaterial(
    wall1.physMat,
    sphere.phys,
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
    bodyPositionZ: 0,
    map: brick,
})

const wall2SphereContactMat = new CANNON.ContactMaterial(
    wall2.physMat,
    sphere.phys,
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
    bodyPositionZ: 125,
    map: brick,
})

const wall3SphereContactMat = new CANNON.ContactMaterial(
    wall3.physMat,
    sphere.phys,
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
    bodyPositionZ: -125,
    map: brick,
})

const wall4SphereContactMat = new CANNON.ContactMaterial(
    wall4.physMat,
    sphere.phys,
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
    sphere.phys,
    {
        friction: 0.5,
    }
)

roof.body.quaternion.setFromEuler(Math.PI / 2, 0, 0);
world.addContactMaterial(roofSphereContactMat)

function renderScenario(){
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

export { renderScenario }