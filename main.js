import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import galaxyBackground from "./components/galaxyBackground";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
document.body.appendChild(renderer.domElement);

const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
  roughness: 0.5,
  map: new THREE.TextureLoader().load("assets/texture/earthmap1k.jpg"),
  bumpMap: new THREE.TextureLoader().load("assets/texture/earthbump.jpg"),
  bumpScale: 0.3,
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);
const cloudMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load("assets/texture/earthCloud.png"),
  transparent: 10,
});
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

const ambienLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambienLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);
galaxyBackground(scene);

function animate() {
  requestAnimationFrame(animate);
  earthMesh.rotation.y -= 0.0015;
  cloudMesh.rotation.y -= 0.001;
  renderer.render(scene, camera);
  controls.update();
}

animate();
