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
