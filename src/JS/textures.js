import * as THREE from 'three';
import grassImg from '../imgs/grass.svg'
import brickImg from '../imgs/stonebrick.svg'
import linkedinImg from '../imgs/linkedin.png'
import githubImg from '../imgs/github.png'
import madeiraImg from '../imgs/madeira.jpeg'
import quartzoImg from '../imgs/quartzo.svg'
import pedregulhoImg from '../imgs/pedregulho.jpeg'
import ballImg from '../imgs/ball.png'
import portalImg from '../imgs/portal.gif'
import obsidianImg from '../imgs/obsidiana.jpeg'
import glowstoneImg from '../imgs/glowstone.png'
import frontEndMentorImg from '../imgs/front-end-mentor.png'
import bannerImg from '../imgs/Dev_Victor-Lis.png'
import followersFloorImg from '../imgs/Followers.png'
import starsFloorImg from '../imgs/stars.png'

const textureLoader = new THREE.TextureLoader()

const grass = textureLoader.load(grassImg)
const brick = textureLoader.load(brickImg)
const linkedin = textureLoader.load(linkedinImg)
const github = textureLoader.load(githubImg)
const madeira = textureLoader.load(madeiraImg)
const quartzo = textureLoader.load(quartzoImg)
const pedregulho = textureLoader.load(pedregulhoImg)
const bola = textureLoader.load(ballImg)
const portal = textureLoader.load(portalImg)
const obsidiana = textureLoader.load(obsidianImg)
const glowstone = textureLoader.load(glowstoneImg)
const frontEndMentor = textureLoader.load(frontEndMentorImg)
const banner = textureLoader.load(bannerImg)
const followersFloor = textureLoader.load(followersFloorImg)
const starsFloor = textureLoader.load(starsFloorImg)

export { 
    grass, 
    brick, 
    linkedin, 
    github, 
    madeira, 
    quartzo, 
    pedregulho, 
    bola, 
    portal, 
    obsidiana,
    glowstone,
    frontEndMentor,
    banner,
    followersFloor,
    starsFloor,
    textureLoader
}