import * as THREE from 'three';
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector("canvas")

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

canvas.style.minWidth = `${window.innerWidth}px`
canvas.style.minHeight = `${window.innerHeight}px`

renderer.setSize(parseInt(canvas.style.minWidth), parseInt(canvas.style.minHeight));

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera(
    45,
    parseInt(canvas.style.minWidth) / parseInt(canvas.style.minHeight),
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

orbit.update()
// orbit.enabled = false

const ambientLight = new THREE.AmbientLight(0xffffff, 0.25)
scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xFFFFFF, 5000, 300)
// pointLight.position.set(0, 50, 0)
// scene.add(pointLight)

window.addEventListener('resize', function () {
    canvas.style.minWidth = `${window.innerWidth}px`
    canvas.style.minHeight = `${window.innerHeight}px`

    camera.aspect = parseInt(canvas.style.minWidth) / parseInt(canvas.style.minHeight);
    camera.updateProjectionMatrix()
    renderer.setSize(parseInt(canvas.style.minWidth), parseInt(canvas.style.minHeight))
})

camera.position.set(0, 50, 0)

export { renderer, camera, scene }
