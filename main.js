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
camera.position.z = 15;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
document.body.appendChild(renderer.domElement);

const earthGeometry = new THREE.SphereGeometry(5, 32, 32,10);
const earthMaterial = new THREE.MeshPhongMaterial({
  roughness: 0.5,
  map: new THREE.TextureLoader().load("assets/texture/earthmap1k.jpg"),
  bumpMap: new THREE.TextureLoader().load("assets/texture/earthbump.jpg"),
  bumpScale: 0.3,
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);


const cloudGeometry = new THREE.SphereGeometry(5.2, 32, 32,10);
const cloudMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load("assets/texture/earthCloud.png"),
  transparent: 10,
});
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);


const moonGeometry = new THREE.SphereGeometry(1, 10, 10,10);

const moonMaterial = new THREE.MeshPhongMaterial({
  roughness: 0.5,
  bumpMap: new THREE.TextureLoader().load("assets/texture/mooonBump.jpg"),
  bumpScale: 0.01,
  map: new THREE.TextureLoader().load("assets/texture/moon.jpg"),
});
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
earthMesh.add(moonMesh);
// moonMesh.position.x= 1.5;  

const moonOrbit = 10;
moonMesh.position.set(moonOrbit, 0, 0);

    // Add a click event listener to the Moon
    moonMesh.addEventListener('click', () => {
      // Move the camera to view the Moon
      console.log("on moon click")
      // const moonPosition = moon.position.clone();
      // const targetPosition = moonPosition.add(new THREE.Vector3(10, 5, 10));
      // const tweenDuration = 1000; // Animation duration in milliseconds
      // new TWEEN.Tween(camera.position).to(targetPosition, tweenDuration).start();
    });


    
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
  moonMesh.rotation.y -= 0.000015;

    // Rotate Moon around the Earth
    // moonMesh.position.x = moonOrbit * Math.cos(Date.now() * 0.001);
    // moonMesh.position.z = moonOrbit * Math.sin(Date.now() * 0.001);

  renderer.render(scene, camera);
  controls.update();
}

animate();

