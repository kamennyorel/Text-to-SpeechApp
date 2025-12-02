const synth = window.speechSynthesis;
const voiceSelect = document.getElementById("voice");
let voices = [];

function populateVoiceList() {
  voices = synth.getVoices();
  if (voices.length === 0) return;

  voiceSelect.innerHTML = "";
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

function loadVoicesWithRetry() {
  populateVoiceList();
  if (voices.length === 0) {
    setTimeout(loadVoicesWithRetry, 100);
  }
}

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  loadVoicesWithRetry();
  synth.addEventListener("voiceschanged", populateVoiceList);

  document.getElementById("speak").addEventListener("click", () => {
    const text = document.getElementById("text").value;
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceIndex = voiceSelect.value;
    utterance.voice = voices[selectedVoiceIndex];

    utterance.rate = parseFloat(document.getElementById("speed").value);
    utterance.pitch = parseFloat(document.getElementById("pitch").value);

    synth.speak(utterance);
  });

  document.getElementById("stop").addEventListener("click", () => {
    synth.cancel();
  });

  // Update labels dynamically
  document.getElementById("speed").addEventListener("input", (e) => {
    document.getElementById("speedVal").textContent = e.target.value + "x";
  });
  document.getElementById("pitch").addEventListener("input", (e) => {
    document.getElementById("pitchVal").textContent = e.target.value;
  });
});
