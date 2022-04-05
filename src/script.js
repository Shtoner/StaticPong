import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Color } from 'three'

const canvas = document.querySelector('canvas')

const gui = new dat.GUI()


const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height, 0.1, 100)
scene.add(camera)

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;

camera.lookAt('sphere')

  const ambientLight = new THREE.AmbientLight();
  ambientLight.intensity= 10
  scene.add(ambientLight);

  const directionalLight= new THREE.DirectionalLight(0xffffff,0.5)

scene.add(directionalLight)


const renderer = new THREE.WebGLRenderer({
    canvas:canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

  const controls = new OrbitControls(camera, renderer.domElement);
console.log(renderer)

const standardMat = new THREE.MeshStandardMaterial()
standardMat.side = THREE.DoubleSide

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5,35,15),
    standardMat
)
// sphere.position.x = 
sphere.scale.set(.04,.04,.04)
scene.add(sphere)

const planeL = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    standardMat
    )
planeL.rotation.y = Math.PI /2
planeL.position.x = -2

scene.add(planeL)

const planeR = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    standardMat
    )
planeR.rotation.y = -Math.PI /2
planeR.position.x = 2
scene.add(planeR)

// sphere.position.x = 4;
// sphere.position.y = 5;
// sphere.position.z = 5;
// sphere.metalness = 1
// sphere.shininess=2




window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const clock=new THREE.Clock()
let rightX = .08 
let oldElapsedTime = 0


function animate() {

	requestAnimationFrame( animate );


    const elapsedTime= clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime


    if(sphere.position.x>1.76||sphere.position.x<-1.76){
        
    rightX = -rightX 
    } 
        
    sphere.position.x+=    rightX

    

    
    // sphere.position.x=  -(elapsedTime - rightX)
	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}
animate()
// camera.lookAt(sphere)
// camera.position.z= -2
// //lights
// const light = new THREE.AmbientLight( 0x404040)
// scene.add(light)

// const controls = new OrbitControls(camera,renderer.domElement)
// controls.enableDamping=true



// // window.addEventListener('resize', () =>
// // {
// //     // Update sizes
// //     sizes.width = window.innerWidth
// //     sizes.height = window.innerHeight

// //     // Update camera
// //     camera.aspect = sizes.width / sizes.height
// //     camera.updateProjectionMatrix()

// //     // Update renderer
// //     renderer.setSize(sizes.width, sizes.height)
// //     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// // })

// renderer.render(scene,camera)
