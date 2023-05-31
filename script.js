var temperatureDisplay = document.getElementById("temperature-display");

// Variable para almacenar la temperatura actual
var temperature = 16;

// Función para actualizar la temperatura en el indicador
function updateTemperatureDisplay() {
  temperatureDisplay.textContent = temperature;
}

// Función para incrementar la temperatura
function increaseTemperature() {
  temperature++;
  updateTemperatureDisplay();
}

// Función para disminuir la temperatura
function reduceTemperature() {
  temperature--;
  updateTemperatureDisplay();
}

// Función para anunciar la temperatura actual
function announceTemperature() {
  var utterance = new SpeechSynthesisUtterance("The temperature is currently " + temperature + " degrees Celsius.");
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}


if (annyang) {
  var commands = {
    "increase temperature": increaseTemperature,
    "reduce temperature": reduceTemperature,
    "what is the temperature": announceTemperature
  };

  annyang.addCommands(commands);
  annyang.start();
}


updateTemperatureDisplay();

  