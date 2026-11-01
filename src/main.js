import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from 'three';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();

const size = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const perspectiveCamera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
perspectiveCamera.position.z = 5;


const textureLoader = new THREE.TextureLoader();
const flagTexture = textureLoader.load("/image/Flag_of_India_2.png");

const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

const material = new THREE.RawShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTexture: { value: flagTexture },
        uFrequency: { value: new THREE.Vector2(8, 8) },
        uTime: { value: 0 }
    }
});

const mesh = new THREE.Mesh(geometry, material);
mesh.scale.y = 2 / 3;
scene.add(mesh);

new OrbitControls(perspectiveCamera, canvas);

const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const animate = () => {
    const elaspedTime = clock.getElapsedTime();
    renderer.render(scene, perspectiveCamera);
    window.requestAnimationFrame(animate);
    material.uniforms.uTime.value = elaspedTime;

}

animate();

