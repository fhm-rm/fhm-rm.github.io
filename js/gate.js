// Audio handler - define first so it's accessible globally
const audio = document.getElementById("bgAudio");
const toggle = document.getElementById("audioToggle");
const AUDIO_STATE = "audio-muted";

// Restore mute state from localStorage on load
const isMuted = localStorage.getItem(AUDIO_STATE) === "true";
if(isMuted) {
  audio.muted = true;
  toggle.classList.add("muted");
  toggle.textContent = "🔇";
}

function playAudio(){
  // Browser autoplay policy: play only if user has interacted with page
  const playPromise = audio.play();
  if(playPromise !== undefined){
    playPromise.catch(err => {
      // Autoplay may be blocked; user will manually unmute
      console.log("Audio autoplay blocked, user can unmute manually");
    });
  }
}

toggle.addEventListener("click", function(){
  audio.muted = !audio.muted;
  localStorage.setItem(AUDIO_STATE, audio.muted ? "true" : "false");
  
  if(audio.muted){
    toggle.classList.add("muted");
    toggle.textContent = "🔇";
  } else {
    toggle.classList.remove("muted");
    toggle.textContent = "🔊";
    playAudio();
  }
});

// Allow audio to play after any user interaction
document.addEventListener("click", function(){
  if(!audio.muted && audio.paused){
    playAudio();
  }
}, { once: true });

// Gate/Password handler
(function(){
  const gate = document.getElementById("gate");
  const site = document.getElementById("site");
  const input = document.getElementById("pw");
  const btn = document.getElementById("enter");
  const msg = document.getElementById("msg");

  const PASSWORD = "yournickname"; // TODO: set to the private nickname
  const KEY = "access-granted";

  function unlock(){
    gate.classList.add("hidden");
    site.classList.remove("hidden");
    sessionStorage.setItem(KEY, "1");
    playAudio(); // Start playing music after unlock
  }

  function tryUnlock(value){
    const v = (value || "").trim();
    if(!v){ msg.textContent = ""; return; }
    if(v === PASSWORD){ unlock(); }
    else { msg.textContent = "That doesn’t feel right. Try again?"; }
  }

  if(sessionStorage.getItem(KEY) === "1"){
    unlock();
  }

  btn.addEventListener("click", function(){ tryUnlock(input.value); });
  input.addEventListener("keydown", function(e){ if(e.key === "Enter") { tryUnlock(input.value); } });

  const params = new URLSearchParams(window.location.search);
  const code = params.get("p");
  if(code){ tryUnlock(code); }
})();


