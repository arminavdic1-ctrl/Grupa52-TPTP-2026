// Dohvatanje potrebnih HTML elemenata
const daniEl = document.getElementById("dani");
const satiEl = document.getElementById("sati");
const minuteEl = document.getElementById("minute");
const sekundeEl = document.getElementById("sekunde");
const toggle = document.getElementById("dark-mode-toggle");
const logo = document.getElementById("logo");

// Definisanje krajnjeg datuma countdown timera
const konacno = new Date("2026-07-01T20:00:00").getTime();

// Provjera prethodno sačuvane teme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  logo.src = "images/tamni-logo.png";
  toggle.checked = true;
}

// Promjena dark/light teme
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

// Formatiranje vremena (dodavanje nule ispred brojeva < 10)
function format(n){
  return n < 10 ? "0" + n : n;
}

// Funkcija za osvježavanje countdown timera
function osvjezitajmer(){

  const trenutno = new Date().getTime();
  const razlika = konacno - trenutno;

  // Ako je odbrojavanje završeno
  if(razlika <= 0){
    daniEl.textContent = "00";
    satiEl.textContent = "00";
    minuteEl.textContent = "00";
    sekundeEl.textContent = "00";
    return;
  }

  // Izračunavanje dana, sati, minuta i sekundi
  const sekunde = Math.floor((razlika / 1000) % 60);
  const minute = Math.floor((razlika / (1000 * 60)) % 60);
  const sati = Math.floor((razlika / (1000 * 60 * 60)) % 24);
  const dani = Math.floor(razlika / (1000 * 60 * 60 * 24));

  // Prikaz vremena na stranici
  daniEl.textContent = format(dani);
  satiEl.textContent = format(sati);
  minuteEl.textContent = format(minute);
  sekundeEl.textContent = format(sekunde);
}

// Pokretanje timera
osvjezitajmer();
setInterval(osvjezitajmer, 1000);
