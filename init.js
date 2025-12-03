function init() {
  synth.addEventListener("voiceschanged", loadVoices);
  textInput.addEventListener("input", updateCharCount);

  speakBtn.addEventListener("click", speak);
  stopBtn.addEventListener("click", stop);

}

document.addEventListener("DOMContentLoaded", init);