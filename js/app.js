let scene, camera, renderer, controls, loadedModel;

init();
animate(); 

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    camera = new THREE.PerspectiveCamera(75, 1000 / 600, 0.2, 1000);
    camera.position.set(0, 0, 12);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(1000, 600);
    document.getElementById('panel3d').appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    const light = new THREE.AmbientLight(0xffffff, 1.0); 
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); 
    scene.add(directionalLight);

    loadModel('niebieski');
}

function loadModel(color) {
    const loader = new THREE.GLTFLoader();

    if (loadedModel) {
        scene.remove(loadedModel);
        loadedModel = null;
    }

    let modelPath = '';
    switch(color) {
        case 'czerwony':
            modelPath = 'model/Red/samsung_s24 red.gltf';
            break;
        case 'czarny':
            modelPath = 'model/Black/samsung_s24 black.gltf';
            break;
        case 'szary':
            modelPath = 'model/Gray/samsung_s24 gray.gltf';
            break;
        default:
            modelPath = 'model/Blue/samsung_s24 blue.gltf';
            break;
    }

    loader.load(modelPath, function(gltf) {
        loadedModel = gltf.scene;
        loadedModel.position.x -= 2;  
        scene.add(loadedModel);
    }, undefined, function(error) {
        console.error(error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    
    if (loadedModel) {
        loadedModel.rotation.y += 0.004; 
    }

    controls.update(); 
    renderer.render(scene, camera);
}

window.addEventListener('resize', function() {
    const container = document.getElementById('panel3d');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
