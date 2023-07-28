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
camera.position.z = 40;
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
cloudMesh.name = "earth"

scene.add(cloudMesh);


const moonGeometry = new THREE.SphereGeometry(1, 10, 10,10);

const moonMaterial = new THREE.MeshPhongMaterial({
  roughness: 0.5,
  bumpMap: new THREE.TextureLoader().load("assets/texture/mooonBump.jpg"),
  bumpScale: 0.01,
  map: new THREE.TextureLoader().load("assets/texture/moon.jpg"),
});
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.name = "moon"
scene.add(moonMesh);
// moonMesh.position.x= 1.5;  

moonMesh.position.set(0, 10, 0);

const ambienLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambienLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);
galaxyBackground(scene);

    // Create a raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Add a click event listener to the canvas
    renderer.domElement.addEventListener("click", onCanvasClick);

    // Render the scene
    // renderer.render(scene, camera);

    function onCanvasClick(event) {
        // Calculate normalized device coordinates (-1 to +1) for the mouse click
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        // Calculate objects intersecting the picking ray
        if (intersects.length > 0) {

          let meshName = intersects[0].object.name
          if (meshName === "earth") {
            console.log("onclick earth")
          } else if( meshName === "moon"){
            console.log("onclick moon")
          }

            // If the ray intersects the sphere, handle the click
        }
    }




let moonAngle = 0
const moonOrbitRadius = 30; // Adjust the Moon's orbit radius
function animate() {
  requestAnimationFrame(animate);
  earthMesh.rotation.y -= 0.0015;
  cloudMesh.rotation.y -= 0.001;
  moonMesh.rotation.y -= 0.000015;
  
    // Update Moon's position (circular orbit)
    const earthPosition = earthMesh.position.clone();
    moonAngle += 0.005; // Adjust the Moon's orbit speed
    const offsetX = moonOrbitRadius * Math.cos(moonAngle);
    const offsetZ = moonOrbitRadius * Math.sin(moonAngle);
    moonMesh.position.set(earthPosition.x + offsetX, 0, earthPosition.z + offsetZ);

  
  renderer.render(scene, camera);
  controls.update();
  
}

animate();

