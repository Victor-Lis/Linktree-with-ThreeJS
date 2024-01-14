import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { 
    renderer, 
    camera,
    scene,
} from './scene.js'

import {
    sphere,
    renderScenePhys
} from './scenePhys.js'

import {
    renderScenario
} from './scenario.js'

import {
    renderLinkedin
} from './linkedin.js'
import { renderGithub } from './github.js';

let redirecting = false;

camera.position.set(0, 140, 120)

function animate() {

    renderScenePhys()

    renderScenario()

    renderLinkedin()
 
    renderGithub()

    const lookAt = new THREE.Vector3(sphere.body.position.x, sphere.body.position.y, sphere.body.position.z)
    camera.lookAt(lookAt)

    if (sphere.mesh.position.z > 53 && sphere.mesh.position.x > 53) {

        setTimeout(() => {

            if (!redirecting) {
                window.location.href = "https://www.linkedin.com/in/victor-lis-bronzo/"
                redirecting = true
            }

        }, 2000)

    }

    if (((sphere.mesh.position.z > -102) && (sphere.mesh.position.z < -57)) && ((sphere.mesh.position.x < -44) && (sphere.mesh.position.x > -102))) {

        setTimeout(() => {

            if (!redirecting) {
                window.location.href = "https://www.github.com/Victor-Lis"
                redirecting = true
            }

        }, 2000)

    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)

const controls = {
    left: document.querySelector("#left"),
    right: document.querySelector("#right"),
    up: document.querySelector("#up"),
    down: document.querySelector("#down"),
}

function move({ direction }) {
    if (direction == 1) {
        sphere.body.angularVelocity.set(10, 0, 0)
    }else if(direction == 2){
        sphere.body.angularVelocity.set(-10, 0, 0)
    }else if(direction == 3){
        sphere.body.angularVelocity.set(0, 0, 10)
    }else{
        sphere.body.angularVelocity.set(0, 0, -10)
    }
}

controls.left.addEventListener("click", (e) => {
    move({ direction: 3 })
})

controls.right.addEventListener("click", (e) => {
    move({ direction: 4 })
})

controls.up.addEventListener("click", (e) => {
    move({ direction: 2 })
})

controls.down.addEventListener("click", (e) => {
    move({ direction: 1 })
})

window.addEventListener("keydown", (e) => {
    if (e.key.toUpperCase() == "A") {
        move({ direction: 3 })
    }
    if (e.key.toUpperCase() == "D") {
        move({ direction: 4 })
    }
    if (e.key.toUpperCase() == "W") {
        move({ direction: 2 })
    }
    if (e.key.toUpperCase() == "S") {
        move({ direction: 1 })
    }
})