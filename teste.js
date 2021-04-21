
var scene, renderer;
var WIDTH, HEIGHT;
var views = [];

// Create renderer
function initRender() {
    WIDTH = 300;//window.innerWidth;
    HEIGHT = 200;//window.innerHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
}
// Create scene
function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
}
// Create camera
function initCamera() {
    var canvas1 = document.getElementById('canvas1');
    var canvas2 = document.getElementById('canvas2');
    var w = 300, h = 200;

    var fullWidth = w * 2;
    var fullHeight = h * 1;
    // Create a camera and render it to the canvas and add it to the array
    views.push(new View(canvas1, fullWidth, fullHeight, w * 0, h * 0, w, h));
    views.push(new View(canvas2, fullWidth, fullHeight, w * 1, h * 0, w, h));
}
// Create light
function initLight() {
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1).normalize();
    scene.add(light);

    var light = new THREE.AmbientLight(0x404040); // ambient light
    scene.add(light);
}
// Create a mesh object
function initObject() {
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}
// Entry function
function initThree() {
    initRender();
    initScene();
    initCamera();
    initLight();
    initObject();
    animation();
}
// loop
function animation() {
    requestAnimationFrame(animation);
    for (var i = 0; i < views.length; ++i) {

        views[i].render();

    }
}
/*
 * Canvas: indicates the id name of the div whose content is to be displayed on it. Such as canvas1, canvas2.
         fullWidth: the width of the viewport
         fullHeight: the height of the viewport
         viewX: We can choose to display only a certain part of the viewport, viewX indicates where to start the display from the x coordinate of the viewport.
         viewY: As above, viewY indicates where to start the display from the Y coordinate of the viewport.
         viewWidth: only display the width of a certain part of the viewport
         viewHeight: Only display the height of a certain part of the viewport.
*/
function View(canvas, fullWidth, fullHeight, viewX, viewY, viewWidth, viewHeight) {
    // What needs to be noted here is that the screen ratio multiplied here must be consistent with the setting of the renderer. Otherwise, the picture on the canvas is inconsistent with the camera viewport picture
    canvas.width = viewWidth * window.devicePixelRatio;
    canvas.height = viewHeight * window.devicePixelRatio;

    var context = canvas.getContext('2d');

    var camera = new THREE.PerspectiveCamera(20, viewWidth / viewHeight, 1, 10000);
    var controls = new THREE.OrbitControls(camera);
    /*
         fullWidth: The width of the entire view (mouth), which can also be understood as the width of the camera.
         fullHeight: The height of the entire view (mouth), which can also be understood as the height of the camera.
         x: The x-axis offset position of the view and the offset of the part to be displayed relative to the upper left corner.
         y: y-axis offset position of the view
         width: the width of the subview, only this width will be displayed
         height: the height of the subview, only this height will be displayed
    */
    camera.setViewOffset(fullWidth, fullHeight, viewX, viewY, viewWidth, viewHeight);
    camera.position.z = 100;

    this.render = function () {
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        controls.update();
        context.drawImage(renderer.domElement, 0, 0);
    };

}