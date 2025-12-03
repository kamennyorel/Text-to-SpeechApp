const synth = window.speechSynthesis;
let voices = [];

function loadVoices() {
  voices = synth.getVoices();

  if (voices.length === 0) {
    return;
  }

  const voiceSelect = document.getElementById("voice");
  voiceSelect.innerHTML = "";

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  console.log(`Loaded ${voices.length} voices`);
}

const voiceSelect = document.getElementById("voice");
voiceSelect.innerHTML = "";


const textInput = document.getElementById("text");
const charCount = document.getElementById("charCount");

function updateCharCount() {
  const count = textInput.value.length;
  charCount.textContent = count;
}

const speakBtn = document.getElementById("speak-btn");
const stopBtn = document.getElementById("stop-btn");
const speedSlider = document.getElementById("speed");
const pitchSlider = document.getElementById("pitch");
const status = document.getElementById("status");
const statusText = document.getElementById("status-text");

const utterance = new SpeechSynthesisUtterance(text);

const selectedVoiceIndex = voiceSelect.value;
if (selectedVoiceIndex !== "") {
  utterance.voice = voices[selectedVoiceIndex];
}

function speak() {

  const text = textInput.value.trim();
  if (!text) {
    alert("Please enter some text to speak");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  const selectedVoiceIndex = voiceSelect.value;
  if (selectedVoiceIndex !== "") {
    utterance.voice = voices[selectedVoiceIndex];
  }

  utterance.rate = parseFloat(speedSlider.value);
  utterance.pitch = parseFloat(pitchSlider.value);
  utterance.volume = 1.0;

  synth.speak(utterance);
}

function stop() {
  synth.cancel();
  speakBtn.disabled = false;
}

