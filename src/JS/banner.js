import * as CANNON from 'cannon-es'

import { world } from './scenePhys';

import { createWall } from './functions.js'

import { banner as bannerTexture } from './textures.js';

import { sphere } from './scenePhys';

const banner = createWall({
    bodyPositionX: -.5,
    bodyPositionY: 0,
    bodyPositionZ: 30,
    geoWidth: 250,
    geoDepth: 80,
    geoHeight: .1,
    color: 0xffffff,
    map: bannerTexture,
})

const bannerSphereContactMat = new CANNON.ContactMaterial(
    banner.physMat,
    sphere.phys,
    {
        friction: 100,
        restitution: 0
    }
);

world.addContactMaterial(bannerSphereContactMat)

function renderBanner(){
    
    banner.mesh.position.copy(banner.body.position)
    banner.mesh.quaternion.copy(banner.body.quaternion)

}

export { renderBanner }