let video = null;
let detector = null;
let detections = [];
let videoVisibility = true;
let detecting = false;

const videoAction = document.getElementById('videoAction');
const detectionAction = document.getElementById('detectionAction');

document.body.style.cursor = 'wait';

function preload() {
  detector = ml5.objectDetector('cocossd');
}

function setup() {
  createCanvas(250, 250).parent('contenedor-video-canvas');
  video = createCapture(VIDEO);
  video.size(200, 200).parent('contenedor-video-canvas');

}

function draw() {
  if (!video || !detecting) return;
  image(video, 0, 0);
  for (let i = 0; i < detections.length; i++) {
    drawResult(detections[i]);
  }
}

function drawResult(object) {
  boundingBox(object);
  drawLabel(object);
}

function boundingBox(object) {
  stroke('blue');
  strokeWeight(6);
  noFill();
  rect(object.x, object.y, object.width, object.height);
}
function drawLabel(object) {
  noStroke();
  fill('white');
  textSize(34);
  text(object.label, object.x + 15, object.y + 34);
}

function onDetected(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
   
console.log(detections[0].confidence);


for(let i = 0; i < detections.length; i++){
if(detections[i].label === 'person'){
  console.log("Usted es una persona");
  const msg = new SpeechSynthesisUtterance("there is a person at the door");
  window.speechSynthesis.speak(msg);
} else if(detections[i].label === 'dog'){
  const msg = new SpeechSynthesisUtterance("there is a dog at the door");
  window.speechSynthesis.speak(msg);
}
}

//if(detections[0].label=="person"){
  //console.log("detecto una persona");
//}







//if(detections.length>=2){
  //if(detections.length.label=="person"){
    //console.log("Examen anulado");
  //}
   
//}




  if (detecting) {
    detect();
  }
}

function detect() {
  detector.detect(video, onDetected);
}

function toggleVideo() {
  if (!video) return;
  if (videoVisibility) {
    video.hide();
    videoAction.innerText = 'Enable Video';
  } else {
    video.show();
    videoAction.innerText = 'Disable video';
  }
  videoVisibility = !videoVisibility;
}

function toggleDetecting() {
  if (!video || !detector) return;
  if (!detecting) {
    detect();
    detectionAction.innerText = 'Stop...';
  } else {
    detectionAction.innerText = 'Detect objects';
  }
  detecting = !detecting;
}
