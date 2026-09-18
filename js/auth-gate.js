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
     sha256Hex("tu-clave-nueva")
   (la función ya está cargada en esta misma página).
   ========================================================================== */

// Hash de la clave temporal "BalanceCero#7" — cambiar antes de compartir el acceso.
const PASSWORD_HASH_HEX = "10e5b81183807510b9a2700ce062c483d6a0cd1c4281364d5aeeb1cc0ba8fb7f";

const LS_UNLOCKED_KEY = "bc_unlocked_v1";
const MAX_INTENTOS = 5;
const BLOQUEO_MS = 30000;

let intentosFallidos = 0;
let bloqueadoHasta = 0;

// Implementación de SHA-256 en JS puro (dominio público, adaptada de
// geraintluff/sha256). No depende de crypto.subtle, así que funciona
// siempre — con HTTPS, con HTTP simple, o abriendo el archivo local —
// a diferencia de la Web Crypto API, que el navegador bloquea fuera de
// un "contexto seguro" (https:// o localhost) y fallaba en silencio.
function sha256Hex(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const maxWord = Math.pow(2, 32);
  let i, j;
  let result = "";
  const words = [];
  const asciiBitLength = ascii.length * 8;
  let hash = (sha256Hex.h = sha256Hex.h || []);
  const k = (sha256Hex.k = sha256Hex.k || []);
  let primeCounter = k.length;
  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
      hash[primeCounter] = (Math.pow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (Math.pow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  ascii += "\x80";
  while (ascii.length % 64 - 56) ascii += "\x00";
  for (i = 0; i < ascii.length; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return null; // solo soporta caracteres ASCII/Latin1 en la clave
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;
  for (j = 0; j < words.length; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15], w2 = w[i - 2];
      const a = hash[0], e = hash[4];
      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | 0);
      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
  }
  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? "0" : "") + b.toString(16);
    }
  }
  return result;
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

function onSubmitLock(e) {
  e.preventDefault();
  const ahora = Date.now();
  if (ahora < bloqueadoHasta) {
    const seg = Math.ceil((bloqueadoHasta - ahora) / 1000);
    mostrarError(`Demasiados intentos. Esperá ${seg} segundos.`);
    return;
  }

  const valor = document.getElementById("lockPassword").value;
  const hash = sha256Hex(valor);

  if (hash === null) {
    mostrarError("La clave tiene un carácter no admitido. Usá letras, números y símbolos comunes.");
    return;
  }

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
