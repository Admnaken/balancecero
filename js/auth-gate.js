/* ==========================================================================
   AUTH-GATE.JS — Pantalla de acceso con clave
   ==========================================================================
   Filtro de acceso del lado del navegador: no se envía ni se muestra la
   clave en texto plano, se compara el hash SHA-256. Es un filtro para que
   nadie entre por tener la URL, no una bóveda: el código fuente del sitio
   es público (o casi), así que alguien con conocimientos técnicos podría
   inspeccionarlo. Para protección real de acceso, sumar Cloudflare Access
   por delante del sitio.

   Para cambiar la clave: generar el hash SHA-256 de la nueva clave y
   reemplazar PASSWORD_HASH_HEX. Se puede calcular en la consola del
   navegador con:
     crypto.subtle.digest("SHA-256", new TextEncoder().encode("tu-clave-nueva"))
       .then(buf => console.log(Array.from(new Uint8Array(buf))
         .map(b => b.toString(16).padStart(2, "0")).join("")));
   ========================================================================== */

// Hash de la clave temporal "BalanceCero#7" — cambiar antes de compartir el acceso.
const PASSWORD_HASH_HEX = "10e5b81183807510b9a2700ce062c483d6a0cd1c4281364d5aeeb1cc0ba8fb7f";

const LS_UNLOCKED_KEY = "bc_unlocked_v1";
const MAX_INTENTOS = 5;
const BLOQUEO_MS = 30000;

let intentosFallidos = 0;
let bloqueadoHasta = 0;

async function sha256Hex(texto) {
  const enc = new TextEncoder().encode(texto);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function mostrarApp() {
  document.getElementById("lockScreen").classList.add("lock-hidden");
  document.getElementById("appRoot").classList.add("app-visible");
  if (window.AppInit) window.AppInit();
}

function mostrarLock() {
  document.getElementById("appRoot").classList.remove("app-visible");
  document.getElementById("lockScreen").classList.remove("lock-hidden");
  const input = document.getElementById("lockPassword");
  if (input) { input.value = ""; input.focus(); }
}

function mostrarError(msg) {
  const err = document.getElementById("lockError");
  err.textContent = msg;
  const card = document.querySelector(".lock-card");
  card.classList.remove("lock-shake");
  void card.offsetWidth; // reiniciar animación
  card.classList.add("lock-shake");
}

async function onSubmitLock(e) {
  e.preventDefault();
  const ahora = Date.now();
  if (ahora < bloqueadoHasta) {
    const seg = Math.ceil((bloqueadoHasta - ahora) / 1000);
    mostrarError(`Demasiados intentos. Esperá ${seg} segundos.`);
    return;
  }

  const valor = document.getElementById("lockPassword").value;
  const hash = await sha256Hex(valor);

  if (hash === PASSWORD_HASH_HEX) {
    intentosFallidos = 0;
    const recordar = document.getElementById("lockRemember").checked;
    if (recordar) localStorage.setItem(LS_UNLOCKED_KEY, "1");
    else sessionStorage.setItem(LS_UNLOCKED_KEY, "1");
    document.getElementById("lockError").textContent = "";
    mostrarApp();
  } else {
    intentosFallidos++;
    if (intentosFallidos >= MAX_INTENTOS) {
      bloqueadoHasta = Date.now() + BLOQUEO_MS;
      mostrarError(`Demasiados intentos incorrectos. Esperá ${BLOQUEO_MS / 1000} segundos.`);
      intentosFallidos = 0;
    } else {
      mostrarError("Clave incorrecta. Intentá de nuevo.");
    }
  }
}

function bloquearApp() {
  localStorage.removeItem(LS_UNLOCKED_KEY);
  sessionStorage.removeItem(LS_UNLOCKED_KEY);
  mostrarLock();
}

function initAuthGate() {
  const yaDesbloqueado = localStorage.getItem(LS_UNLOCKED_KEY) === "1" || sessionStorage.getItem(LS_UNLOCKED_KEY) === "1";

  document.getElementById("lockForm").addEventListener("submit", onSubmitLock);

  const toggle = document.getElementById("lockToggle");
  toggle.addEventListener("click", () => {
    const input = document.getElementById("lockPassword");
    const mostrando = input.type === "text";
    input.type = mostrando ? "password" : "text";
    toggle.textContent = mostrando ? "👁" : "🙈";
  });

  const btnBloquear = document.getElementById("btnBloquear");
  if (btnBloquear) btnBloquear.addEventListener("click", bloquearApp);

  if (yaDesbloqueado) {
    mostrarApp();
  } else {
    mostrarLock();
  }
}

document.addEventListener("DOMContentLoaded", initAuthGate);
