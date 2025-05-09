import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
    scene
} from './scene.js'

import {
    ground,
    world
} from './scenePhys.js'

import {
    sphere
} from './scenePhys.js'

function createBlock({
    width,
    positionX,
    positionY,
    positionZ,
    restitution,
    friction,
    texture,
    color,
    mass
}) {

    const geo = new THREE.BoxGeometry(width, width, width)
    const mat = new THREE.MeshStandardMaterial({
        color: color ? color : 0x333333,
        side: THREE.DoubleSide,
        map: texture,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(positionX, positionY, positionZ ? positionZ : positionX + width)
    scene.add(mesh)

    const physMat = new CANNON.Material()

    const body = new CANNON.Body({
        //shape: new CANNON.Plane(),
        // mass: 10,
        shape: new CANNON.Box(new CANNON.Vec3(width / 2, width / 2, width / 2)),
        position: new CANNON.Vec3(positionX, positionY, positionZ ? positionZ : positionX + width),
        material: physMat,
        mass: mass ? mass : 5,
    });

    world.addBody(body);

    const physSphereContactMat = new CANNON.ContactMaterial(
        physMat,
        sphere.phys,
        {
            restitution: restitution ? restitution : 0,
            friction: friction ? friction : 0,
        }
    )

    world.addContactMaterial(physSphereContactMat)

    return ({
        mesh,
        body
    })

}

function createWall({ geoWidth, geoHeight, geoDepth, bodyPositionX, bodyPositionY, bodyPositionZ, transparent, opacity, color, map }) {
    const geo = new THREE.BoxGeometry(geoWidth, geoHeight, geoDepth)
    const mat = new THREE.MeshStandardMaterial({
        color: color ? color : 0x333333,
        side: THREE.DoubleSide,
        transparent: !!transparent,
        opacity: opacity ? opacity : 1,
        map: map,
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    const physMat = new CANNON.Material()

    const body = new CANNON.Body({
        //shape: new CANNON.Plane(),
        //mass: 10
        shape: new CANNON.Box(new CANNON.Vec3(geoWidth / 2, geoHeight / 2, geoDepth / 2)),
        position: new CANNON.Vec3(bodyPositionX, (bodyPositionY ? bodyPositionY : geoHeight / 2), bodyPositionZ),
        type: CANNON.Body.STATIC,
        material: physMat,
    });

    world.addBody(body);

    return { mesh, physMat, body }
}

function createPortal({
    positionX,
    positionY,
    positionZ,
    width,
    bodyTexture,
    restitution,
    portalTexture,
    portalColor
}) {

    let blocks = []

    positionY = positionY + (width / 4)

    while (blocks.length <= 14) {

        if (blocks.length > 0 && blocks.length < 4) {
            positionX = positionX + width
        } else if (blocks.length >= 4 && blocks.length < 8) {
            positionY = positionY + width
        } else if (blocks.length >= 8 && blocks.length < 11) {
            positionX = positionX - width
        } else if (blocks.length >= 12) {
            positionY = positionY - width
        }

        const geo = new THREE.BoxGeometry(width, width, width)
        const mat = new THREE.MeshStandardMaterial({
            color: !bodyTexture && 0x333333,
            side: THREE.DoubleSide,
            map: bodyTexture,
        })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(positionX, positionY, positionZ)
        scene.add(mesh)

        const physMat = new CANNON.Material()

        const body = new CANNON.Body({
            //shape: new CANNON.Plane(),
            //mass: 10
            shape: new CANNON.Box(new CANNON.Vec3(width / 2, width / 2, width / 2)),
            position: new CANNON.Vec3(positionX, positionY, positionZ),
            type: CANNON.Body.STATIC,
            material: physMat,
        });

        world.addBody(body);

        const physSphereContactMat = new CANNON.ContactMaterial(
            physMat,
            sphere.phys,
            {
                restitution: restitution ? restitution : 0,
            }
        )

        world.addContactMaterial(physSphereContactMat)

        blocks.push({
            mesh,
            body
        })

        if (blocks.length == 15) {

            let portal = createWall({
                geoWidth: .5,
                geoHeight: width * 3,
                geoDepth: width * 2,
                bodyPositionY: positionY + width,
                bodyPositionX: positionX + width * 1.5,
                bodyPositionZ: positionZ,
                color: portalColor ? portalColor : 0x99ffff,
                map: portalTexture,
            })

            portal.body.quaternion.setFromEuler(0, Math.PI * 1.5, 0);

            portal.mesh.position.copy(portal.body.position)
            portal.mesh.quaternion.copy(portal.body.quaternion)

        }

    }

    return blocks
}

function createBall({
    texture,
    positionX,
    positionY,
    positionZ,
}) {
    const spherePhysMat = new CANNON.Material()

    const sphereGeo = new THREE.SphereGeometry(5)
    const sphereMat = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: texture && texture,
    })
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(sphereMesh)

    const sphereBody = new CANNON.Body({
        mass: 5,
        shape: new CANNON.Sphere(5),
        position: new CANNON.Vec3(positionX, positionY, positionZ),
        material: spherePhysMat
    });

    world.addBody(sphereBody)

    const spheresContactMat = new CANNON.ContactMaterial(
        sphere.phys,
        spherePhysMat,
        {
            friction: 1,
            restitution: 1
        }
    );

    sphereMesh.position.copy(sphereBody.position)

    sphereBody.linearDamping = 0.25
    world.addContactMaterial(spheresContactMat);

    const sphereGroundContactMat = new CANNON.ContactMaterial(
        ground.phys,
        spherePhysMat,
        {
            friction: 1,
            restitution: 0
        }
    );

    world.addContactMaterial(sphereGroundContactMat);

    return {
        mesh: sphereMesh,
        body: sphereBody
    }
}

export { createWall, createPortal, createBlock, createBall }