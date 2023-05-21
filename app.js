let video = null;
let detector = null;
let detections = [];
let videoVisibility = true;
let detecting = false;
let detectionInterval = 700; // Intervalo de detección en milisegundos
let lastDetectionTime = 0; // Último tiempo de detección

const videoAction = document.getElementById('videoAction');
const detectionAction = document.getElementById('detectionAction');

document.body.style.cursor = 'wait';

function preload() {
  detector = ml5.objectDetector('cocossd');
}

function setup() {
  createCanvas(300, 300).parent('contenedor-video-canvas');
  video = createCapture(VIDEO);
  video.size(300, 300).parent('contenedor-video-canvas');
}

function draw() {
  if (!video || !detecting || millis() - lastDetectionTime < detectionInterval) {
    return;
  }

  image(video, 0, 0);

  if (!detecting) {
    return;
  }

  detector.detect(video, onDetected);
  lastDetectionTime = millis();
}

function onDetected(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  detections = results;
  processDetections();
}

function processDetections() {
  for (let i = 0; i < detections.length; i++) {
    const object = detections[i];
    boundingBox(object);
    drawLabel(object);
    processDetectionLabel(object.label);
  }
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
  textSize(22);
  text(object.label, object.x + 15, object.y + 34);
}

function processDetectionLabel(label) {
  let message = '';
  
  switch (label) {
    case 'person':
      message = 'there is a person at the door';
      break;
    case 'dog':
      message = 'there is a dog at the door';
      break;
    case 'phone':
      message = 'please remove the phone';
      break;
    default:
      // Agrega más casos según tus necesidades
      break;
  }
  
  if (message) {
    const msg = new SpeechSynthesisUtterance(message);
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
  }
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
  detecting = !detecting;
  if (detecting) {
    detect();
    detectionAction.innerText = 'Stop...';
  } else {
    detectionAction.innerText = 'Detect objects';
  }
}

function detect() {
  detector.detect(video, onDetected);
  lastDetectionTime = millis();
}

