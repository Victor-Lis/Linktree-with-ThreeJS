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
    followersFloor,
    textureLoader,
} from './textures.js'

import {
    sphere,
} from './scenePhys.js'

import {
    world
} from './scenePhys';

import {
    createWall,
    createBlock,
    createPortal,
    createBall,
} from './functions.js'

const followers = []

async function getFollowers(){    
    try{

        const res = await fetch("https://api.github.com/users/Victor-Lis/followers")
        const data = await res.json()
        
        let initX = -250
        let initY = 5
        let initZ = 250

        function randomPos(){
            let x = Math.round(Math.random() * 50)
            
            let invert = Math.round(Math.random() * 2) >= 1 ? false : true

            if(invert){
                x=x*-1
            }

            return x
        }

        data?.map((user) => {

            followers.push(createBlock({
                texture: textureLoader.load(user.avatar_url),
                positionX: initX+randomPos(),
                positionZ: initZ+randomPos(),
                positionY: initY+Math.abs(randomPos()),
                mass: 5,
                width: 12.5,
                color: 0xffffff
            }))

        })

    }catch{

    }
}

const floor = createWall({
    geoWidth: 250,
    geoHeight: 1,
    geoDepth: 250,
    bodyPositionX: -250,
    bodyPositionY: 0,
    bodyPositionZ: 250,
    color: 0xff0099,
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

const point3Light = new THREE.PointLight(0xffffff, 5000, 1000)
point3Light.position.set(-250, 60, 250)
scene.add(point3Light)

const wall1 = createWall({
    geoWidth: 255,
    geoHeight: 325,
    geoDepth: 10,
    bodyPositionX: -125,
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
    geoHeight: 325,
    geoDepth: 10,
    bodyPositionX: -375,
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
    geoHeight: 325,
    geoDepth: 10,
    bodyPositionX: -250,
    bodyPositionZ: 125,
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
    geoHeight: 325,
    geoDepth: 10,
    bodyPositionX: -250,
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
    bodyPositionX: -250,
    bodyPositionZ: 250,
    opacity: 0.1,
    transparent: true,
    bodyPositionY: 325,
    color: 0x000ff0
})

const roofSphereContactMat = new CANNON.ContactMaterial(
    roof.physMat,
    sphere.phys,
    {
        friction: 0.5,
    }
)

const lobbyPointLight = new THREE.PointLight(0x3e00a3, 5000, 1000)
lobbyPointLight.position.set(0, 70, 250)
scene.add(lobbyPointLight)

roof.body.quaternion.setFromEuler(Math.PI / 2, 0, 0);
world.addContactMaterial(roofSphereContactMat)

const portal = createPortal({
    positionX: -275,
    positionY: 5,
    positionZ: 130,
    width: 15,
    restitution: 0,
    bodyTexture: obsidiana,
    portalTexture: portalTexture,
    portalColor: 0xff0099,
})

const portalPointLight = new THREE.PointLight(0xff0099, 5000, 100)
portalPointLight.position.set(-300, 30, 130)
scene.add(portalPointLight)

const ramp = createWall({
    geoWidth: .5,
    geoHeight: 30,
    geoDepth: 30,
    bodyPositionX: -252.5,
    bodyPositionY: 10,
    bodyPositionZ: 147,
    color: 0xff0099,
})

const rampSphereContactMat = new CANNON.ContactMaterial(
    ramp.physMat,
    sphere.phys,
    {
        restitution: 0,
    }
)

ramp.body.quaternion.setFromEuler(Math.PI * 1.7, Math.PI * 1.5, 0);
world.addContactMaterial(rampSphereContactMat)


function renderFollowersLobby() {
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

    ramp.mesh.position.copy(ramp.body.position)
    ramp.mesh.quaternion.copy(ramp.body.quaternion)

    followers.map((follower) => {
        follower.mesh.position.copy(follower.body.position)
        follower.mesh.quaternion.copy(follower.body.quaternion)
    })
}

function teleportToFollowersLobby(){
    sphere.body.angularVelocity.set(0,0,0)
    sphere.body.position.set(-250, 10, 350)
    sphere.mesh.position.copy(sphere.body.position)
    camera.position.set(-250, 160, 367.5)
}

export { renderFollowersLobby, teleportToFollowersLobby, getFollowers }