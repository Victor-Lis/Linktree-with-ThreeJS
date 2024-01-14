import * as THREE from 'three';
import grassImg from '../imgs/grass.svg'
import linkedinImg from '../imgs/linkedin.png'
import githubImg from '../imgs/github.png'

const textureLoader = new THREE.TextureLoader()

const grass = textureLoader.load(grassImg)
const linkedin = textureLoader.load(linkedinImg)
const github = textureLoader.load(githubImg)

export { grass, linkedin, github }