const daniEl = document.getElementById("dani");
const satiEl = document.getElementById("sati");
const minuteEl = document.getElementById("minute");
const sekundeEl = document.getElementById("sekunde");
const toggle = document.getElementById("dark-mode-toggle");
const konacno = new Date("2026-07-01T20:00:00").getTime();
const logo = document.getElementById("logo");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  logo.src = "images/tamni-logo.png";
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", toggle.checked);
  if(toggle.checked){
  localStorage.setItem("theme", "dark");
  logo.src = "images/tamni-logo.png";
  }else{
  localStorage.setItem("theme", "light");
  logo.src = "images/svjetli-logo.png";
  }
});

function format(n){
  return n < 10 ? "0" + n : n;
}

function osvjezitajmer(){
  const trenutno = new Date().getTime();
  const razlika = konacno - trenutno;
  if(razlika <= 0){
    daniEl.textContent = "00";
    satiEl.textContent = "00";
    minuteEl.textContent = "00";
    sekundeEl.textContent = "00";
    return;
  }
  const sekunde = Math.floor((razlika / 1000) % 60);
  const minute = Math.floor((razlika / (1000 * 60)) % 60);
  const sati = Math.floor((razlika / (1000 * 60 * 60)) % 24);
  const dani = Math.floor(razlika / (1000 * 60 * 60 * 24));

  daniEl.textContent = format(dani);
  satiEl.textContent = format(sati);
  minuteEl.textContent = format(minute);
  sekundeEl.textContent = format(sekunde);
}

osvjezitajmer();
setInterval(osvjezitajmer, 1000);



