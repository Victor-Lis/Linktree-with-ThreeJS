import * as THREE from 'three';

import { renderer, camera, scene, } from './scene.js';
import { sphere, renderScenePhys } from './scenePhys.js';
import { renderScenario } from './scenario.js';
import { renderFollowersLobby, getFollowers } from './githubFollowers.js';

getFollowers()

camera.position.set(0, 120, 117.5)

function animate() {

    renderScenePhys()

    renderScenario()

    renderFollowersLobby()

    const lookAt = new THREE.Vector3(sphere.body.position.x, sphere.body.position.y, sphere.body.position.z)
    camera.lookAt(lookAt)

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)

window.addEventListener("keydown", (e) => {

})