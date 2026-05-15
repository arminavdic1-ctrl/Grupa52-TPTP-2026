const daniEl = document.getElementById("dani");
const satiEl = document.getElementById("sati");
const minuteEl = document.getElementById("minute");
const sekundeEl = document.getElementById("sekunde");
const toggle = document.getElementById("dark-mode-toggle");
const toggleMob = document.getElementById("dark-mode-toggle-mob");
const logo = document.getElementById("logo");
const korpaToggle = document.getElementById("korpa-toggle");
const korpaToggleDesktop = document.getElementById("korpa-toggle-desktop");
const korpaPanel = document.getElementById("korpa-panel");
const korpaOverlay = document.getElementById("korpa-overlay");
const korpaZatvori = document.getElementById("korpa-zatvori");
const brojac = document.querySelectorAll(".stat-broj");
const hamburger = document.getElementById("hamburger");
const mobMeni = document.getElementById("mob-meni");
const overlay = document.getElementById("mob-overlay");

korpaToggleDesktop.addEventListener("click", otvoriKorpu);
korpaToggle.addEventListener("click", otvoriKorpu);
korpaZatvori.addEventListener("click", zatvoriKorpu); 
korpaOverlay.addEventListener("click", zatvoriKorpu);

// Definisanje krajnjeg datuma countdown timera
const konacno = new Date("2026-07-01T20:00:00").getTime();

// Provjera prethodno sačuvane teme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  logo.src = "images/tamni-logo.png";
  toggle.checked = true;
  if (toggleMob) toggleMob.checked = true;
}

// desktop toggle
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", toggle.checked);

  if (toggle.checked) {
    localStorage.setItem("theme", "dark");
    logo.src = "images/tamni-logo.png";
  } else {
    localStorage.setItem("theme", "light");
    logo.src = "images/svjetli-logo.png";
  }

  if (toggleMob) toggleMob.checked = toggle.checked;
});

// MOBILE toggle 
if (toggleMob) {
  toggleMob.addEventListener("change", () => {
    document.body.classList.toggle("dark", toggleMob.checked);

    if (toggleMob.checked) {
      localStorage.setItem("theme", "dark");
      logo.src = "images/tamni-logo.png";
    } else {
      localStorage.setItem("theme", "light");
      logo.src = "images/svjetli-logo.png";
    }

    toggle.checked = toggleMob.checked;
  });
}

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

// Funkcija za otvaranje korpe
function otvoriKorpu() { 
  korpaPanel.classList.add("otvorena"); 
  korpaOverlay.classList.add("aktivna"); 
}

// Funkcija za zatvaranje korpe
function zatvoriKorpu() { 
  korpaPanel.classList.remove("otvorena"); 
  korpaOverlay.classList.remove("aktivna"); 
}

brojac.forEach(brojac => {
    const target = +brojac.getAttribute("data-target");
    let count = 0;

    const speed = Math.ceil(target / 100); // brzina animacije

    const updateCount = () => {
        count += speed;

        if (count < target) {
            brojac.textContent = count + "+";
            requestAnimationFrame(updateCount);
        } else {
            brojac.textContent = target + "+";
        }
    };

    updateCount();
});

// otvaranje/zatvaranje menija
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("aktivan");
    mobMeni.classList.toggle("aktivan");
    overlay.classList.toggle("aktivna");
});

// klik na overlay zatvara meni
overlay.addEventListener("click", () => {
    hamburger.classList.remove("aktivan");
    mobMeni.classList.remove("aktivan");
    overlay.classList.remove("aktivna");
});

// klik na link zatvara meni
document.querySelectorAll(".mob-meni a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("aktivan");
        mobMeni.classList.remove("aktivan");
        overlay.classList.remove("aktivna");
    });
});

// Pokretanje timera
osvjezitajmer();
setInterval(osvjezitajmer, 1000);
