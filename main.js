import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff000 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

camera.position.z = 5;

function animate() {
  // Rotate the sphere
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  renderer.render( scene, camera );
}

//Creates Audio Analyser and adds it to the camera

const listener = new THREE.AudioListener();
camera.add ( listener ); 

// creates audio source

const sound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audopLoader.load('sounds/ambient.ogg', function(buffer){
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});

const analyser = new THREE.AudioAnalyser( sound, 32 );

// gets the average frequency of the sound
const data = analyser.getAverageFrequency();

//! sets up the anayliser to gather the frequency data from the mp3 file

const setupAudioContext = () => {
  AudioContext = new window.AudioContext();
  document.getElementById("myAudio").addEventListener("play", setupAudioContext);
  source = audioContext.createMediaElementSource(audioElement);
  analyser = audioContext.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 1024;
  dataArray = new Uint8Array(analyser.freqencyBinCount);
};

const render = () => {
  analyser.getByteFrequencyData(dataArray);

  requestAnimationFrame(render);
};

render();