document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = '../Main_Page/main.html'; // Redirects to 3d.html when the button is clicked
});
// Set up basic scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Set background color to white
renderer.setClearColor(0xffffff, 1); // Set background to white

document.body.appendChild(renderer.domElement);

// Add Orbit Controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// Set up lighting: Add both Ambient Light and Directional Light
var ambientLight = new THREE.AmbientLight(0x404040, 1); // Low-intensity ambient light to brighten the scene slightly
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong light to highlight the 3D model
directionalLight.position.set(5, 5, 5).normalize(); // Set light position to ensure the model is well-lit
scene.add(directionalLight);

// Optional: Add a point light to enhance the model's visibility
var pointLight = new THREE.PointLight(0xffffff, 1, 100); // White point light
pointLight.position.set(2, 2, 2); // Position the light in the scene
scene.add(pointLight);

// Load 3D model (GLB format)
var loader = new THREE.GLTFLoader();
loader.load('result.gltf', function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.scale.set(1, 1, 1); // Scale model
    gltf.scene.position.set(0, 0, 0); // Position model

    // Ensure the model's material retains its original colors
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.material.emissive.set(0x000000); // Disable emissive if set
            child.material.needsUpdate = true; // Update material if needed
        }
    });
}, undefined, function (error) {
    console.error(error);
});

// Set the camera to a better angle for viewing
camera.position.set(100, 180, 200); // Position the camera at a better angle
camera.lookAt(0, 0, 0); // Make the camera look at the model's center

// Animation loop
var animate = function () {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
};
animate();
