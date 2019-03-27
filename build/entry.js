var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersectedObject, mouseOn;

camera.position.z = 20;
camera.position.y = 10
camera.lookAt(new THREE.Vector3());

renderer.setSize(window.innerWidth, window.innerHeight);

var planeGeo = new THREE.PlaneGeometry(50, 50);
var planeMat = new THREE.MeshBasicMaterial({ color: 'gray' });
planeMat.side = THREE.DoubleSide;
var plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x += 1.5708
scene.add(plane);

var cubeGeo = new THREE.BoxGeometry(5, 5, 5);
var cubeMat = new THREE.MeshBasicMaterial({ color: 'green' });
var cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.position.y = 2.5
scene.add(cube);

var onMouseMove = function (e) {
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  if (!intersects[0]) {
    intersectedObject = null
  }
  if (intersects[0] && intersects[0].object !== intersectedObject) { 
      intersectedObject = intersects[0].object
  }
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

var onMouseDown = function (e) {
  console.log(intersectedObject)
};

var onKeyUp = function (e) {
  console.log(e.keyCode)
};

var animate = function () {
  controls.update;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();

var windowResizeHandler = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHandler();

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('keyup', onKeyUp, false);
window.addEventListener('resize', windowResizeHandler);

document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);