// Set up basic scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing for smoother edges
renderer.setSize(window.innerWidth, window.innerHeight);

// Set background color to a dark neutral tone
renderer.setClearColor(0xffffff, 2); // Background remains dark to emphasize the model
document.body.appendChild(renderer.domElement);

// Add Orbit Controls for better navigation
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// Add Ambient and Directional Lighting with white tones
var ambientLight = new THREE.AmbientLight(0x434343, 2.1); // Bright white ambient light
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Strong directional white light
directionalLight.position.set(20, 15, 20); // Positioned above and slightly angled
directionalLight.castShadow = true; // Enable shadows for depth
scene.add(directionalLight);

// Add a white spotlight for dramatic effect
var spotLight = new THREE.SpotLight(0xffffff, 2);
spotLight.position.set(25, 20, 25); // Position above and to the side
spotLight.castShadow = true; // Enable shadows
scene.add(spotLight);

// Add a white point light for soft highlights
var pointLight = new THREE.PointLight(0xffffff, 1.2, 100);
pointLight.position.set(5, 5, 5); // Position near the model for highlights
scene.add(pointLight);

// Variable to hold the 3D model
var model;

// Load 3D model (GLB format)
var loader = new THREE.GLTFLoader();
loader.load('result.gltf', function (gltf) {
    model = gltf.scene;
    scene.add(model);

    // Scale and position the model
    model.scale.set(1, 1, 1); // Adjust size if necessary
    model.position.set(0, 0, 0); // Center the model at the origin
    model.rotation.set(0,0,0); // Ensure the model starts upright

    // Ensure the model's material looks polished
    model.traverse(function (child) {
        if (child.isMesh) {
            child.material.metalness = 0.5; // Add moderate reflectivity
            child.material.roughness = 0.3; // Smoothen the surface slightly
            child.material.emissive.set(0x000000); // Disable glow effects
            child.material.needsUpdate = true; // Apply changes to material
        }
    });
}, undefined, function (error) {
    console.error(error);
});

// Position the camera for a better view
camera.position.set(0.4237162688984951,-392.4691650703549, 147.523771100659 ); // Adjust position to focus on the model
camera.lookAt(0, 0, 0); // Ensure the camera looks at the model's center
camera.rotation.set(1.3713737966891695, 0.0005689362284197986, -0.002814990708179874);

// Resize renderer on window resize
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Key listener to check camera info
window.addEventListener('keydown', function(event) {
    if(event.key === 'c') { // Press 'c' to check camera
        console.log("Camera Position:", camera.position);
        console.log("Camera Rotation (Euler):", camera.rotation);
    }
});

// Animation loop
var animate = function () {
    requestAnimationFrame(animate);

    // Rotate the model if loaded
    if (model) {
        model.rotation.z += 0.02; // Rotate around the Z-axis for spinning
    }

    controls.update(); // Update OrbitControls
    renderer.render(scene, camera);

    // Optional: continuous logging (comment out if you use key press)
    console.log("Camera Position:", camera.position);
    console.log("Camera Rotation (Euler):", camera.rotation);
};

animate();
