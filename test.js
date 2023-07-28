import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import galaxyBackground from "./components/galaxyBackground";

// Wait for the DOM to load
 // Wait for the DOM to load
document.addEventListener("DOMContentLoaded", init);

function init() {
    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvas-container").appendChild(renderer.domElement);

    // Create a sphere geometry
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Add the sphere to the scene
    scene.add(sphere);

    // Create a raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Add a click event listener to the canvas
    renderer.domElement.addEventListener("click", onCanvasClick);

    // Render the scene
    renderer.render(scene, camera);

    function onCanvasClick(event) {
        // Calculate normalized device coordinates (-1 to +1) for the mouse click
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
            // If the ray intersects the sphere, handle the click
            onSphereClick();
        }
    }

    function onSphereClick() {
        console.log("Sphere clicked!");
    }
}