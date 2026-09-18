/* ==========================================================================
   DRIVE-SYNC.JS — Respaldo automático en Google Drive
   Usa Google Identity Services (OAuth2, solo en el navegador, sin backend)
   y la API de Drive con el scope "drive.file" (la app solo puede ver/editar
   el archivo de respaldo que ella misma crea, no el resto del Drive).
   ========================================================================== */

const DRIVE_FILE_NAME = "toma-posesion-consorcios-backup.json";
const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.file";
const LS_CLIENT_ID = "tp_drive_client_id";
const LS_FILE_ID = "tp_drive_file_id";
const LS_AUTOSYNC = "tp_drive_autosync";
const LS_LAST_SYNC = "tp_drive_last_sync";

const driveState = {
  clientId: localStorage.getItem(LS_CLIENT_ID) || "",
  fileId: localStorage.getItem(LS_FILE_ID) || "",
  autosync: localStorage.getItem(LS_AUTOSYNC) === "1",
  lastSync: localStorage.getItem(LS_LAST_SYNC) || "",
  accessToken: null,
  tokenClient: null,
  connecting: false,
  status: "desconectado", // desconectado | conectando | conectado | error
  errorMsg: ""
};

let autosyncTimer = null;

function gisDisponible() {
  return !!(window.google && window.google.accounts && window.google.accounts.oauth2);
}

function ensureTokenClient() {
  if (!gisDisponible() || !driveState.clientId) return null;
  if (!driveState.tokenClient) {
    driveState.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: driveState.clientId,
      scope: DRIVE_SCOPE,
      callback: (resp) => {
        driveState.connecting = false;
        if (resp.error) {
          driveState.status = "error";
          driveState.errorMsg = resp.error;
          refrescarPanel();
          return;
        }
        driveState.accessToken = resp.access_token;
        driveState.status = "conectado";
        refrescarPanel();
        toast("Conectado a Google Drive.");
      }
    });
  }
  return driveState.tokenClient;
}

function conectar() {
  if (!driveState.clientId) {
    toast("Pegá primero el Client ID de Google Cloud.");
    return;
  }
  if (!gisDisponible()) {
    toast("No se pudo cargar Google Identity Services. Revisá tu conexión a internet.");
    return;
  }
  driveState.connecting = true;
  driveState.status = "conectando";
  refrescarPanel();
  const client = ensureTokenClient();
  if (client) client.requestAccessToken({ prompt: "" });
}

function desconectar() {
  if (driveState.accessToken && window.google && google.accounts && google.accounts.oauth2) {
    google.accounts.oauth2.revoke(driveState.accessToken, () => {});
  }
  driveState.accessToken = null;
  driveState.status = "desconectado";
  refrescarPanel();
}

async function buscarArchivoExistente() {
  const q = encodeURIComponent(`name='${DRIVE_FILE_NAME}' and trashed=false`);
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime)&spaces=drive`,
    { headers: { Authorization: `Bearer ${driveState.accessToken}` } }
  );
  if (!res.ok) throw new Error("No se pudo buscar el archivo en Drive (" + res.status + ")");
  const data = await res.json();
  return data.files && data.files.length ? data.files[0].id : null;
}

async function guardarEnDrive(silencioso) {
  if (!driveState.accessToken) {
    if (!silencioso) toast("Conectá con Google Drive primero.");
    return;
  }
  const payload = JSON.stringify(
    { exportedAt: new Date().toISOString(), consorcios: state.consorcios, actualId: state.actualId },
    null,
    2
  );
  try {
    if (!driveState.fileId) {
      driveState.fileId = await buscarArchivoExistente();
    }
    if (driveState.fileId) {
      const res = await fetch(
        `https://www.googleapis.com/upload/drive/v3/files/${driveState.fileId}?uploadType=media`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${driveState.accessToken}`, "Content-Type": "application/json" },
          body: payload
        }
      );
      if (!res.ok) throw new Error("Error al actualizar el respaldo (" + res.status + ")");
    } else {
      const boundary = "tpapp_boundary_" + Date.now();
      const metadata = { name: DRIVE_FILE_NAME, mimeType: "application/json" };
      const multipartBody =
        `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
        `--${boundary}\r\nContent-Type: application/json\r\n\r\n${payload}\r\n--${boundary}--`;
      const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${driveState.accessToken}`,
          "Content-Type": `multipart/related; boundary=${boundary}`
        },
        body: multipartBody
      });
      if (!res.ok) throw new Error("Error al crear el respaldo (" + res.status + ")");
      const data = await res.json();
      driveState.fileId = data.id;
    }
    localStorage.setItem(LS_FILE_ID, driveState.fileId);
    driveState.lastSync = new Date().toISOString();
    localStorage.setItem(LS_LAST_SYNC, driveState.lastSync);
    if (!silencioso) toast("Respaldo guardado en Google Drive.");
    refrescarPanel();
  } catch (e) {
    console.error(e);
    if (!silencioso) toast("No se pudo guardar en Drive: " + e.message);
  }
}

async function restaurarDesdeDrive() {
  if (!driveState.accessToken) {
    toast("Conectá con Google Drive primero.");
    return;
  }
  if (!confirm("Esto va a reemplazar los datos guardados en este navegador por los del respaldo de Drive. ¿Continuar?")) {
    return;
  }
  try {
    let fileId = driveState.fileId || (await buscarArchivoExistente());
    if (!fileId) {
      toast("Todavía no hay ningún respaldo guardado en Drive.");
      return;
    }
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: { Authorization: `Bearer ${driveState.accessToken}` }
    });
    if (!res.ok) throw new Error("Error al leer el respaldo (" + res.status + ")");
    const data = await res.json();
    state.consorcios = data.consorcios || [];
    state.actualId = data.actualId && state.consorcios.some((c) => c.id === data.actualId)
      ? data.actualId
      : (state.consorcios[0] ? state.consorcios[0].id : null);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.consorcios));
    if (state.actualId) localStorage.setItem(CURRENT_KEY, state.actualId);
    driveState.fileId = fileId;
    localStorage.setItem(LS_FILE_ID, fileId);
    driveState.lastSync = new Date().toISOString();
    localStorage.setItem(LS_LAST_SYNC, driveState.lastSync);
    renderAll();
    toast("Datos restaurados desde Google Drive.");
  } catch (e) {
    console.error(e);
    toast("No se pudo restaurar desde Drive: " + e.message);
  }
}

function onLocalChange() {
  if (!driveState.autosync || !driveState.accessToken) return;
  clearTimeout(autosyncTimer);
  autosyncTimer = setTimeout(() => guardarEnDrive(true), 1500);
}

function refrescarPanel() {
  const panel = document.getElementById("drivePanelContainer");
  if (panel) panel.outerHTML = panelHtml();
  const contenedor = document.getElementById("tab-inicio");
  if (contenedor && contenedor.classList.contains("active")) bindEvents(contenedor);
}

function formatearFecha(iso) {
  if (!iso) return "nunca";
  const d = new Date(iso);
  return d.toLocaleString("es-AR");
}

function panelHtml() {
  const conectado = driveState.status === "conectado";
  let estadoTexto = "Desconectado";
  let estadoClase = "muted";
  if (driveState.status === "conectando") { estadoTexto = "Conectando…"; }
  if (conectado) { estadoTexto = "Conectado a Google Drive"; estadoClase = "drive-ok"; }
  if (driveState.status === "error") { estadoTexto = "Error de conexión: " + escapeHtml(driveState.errorMsg || ""); estadoClase = "riesgo"; }

  return `
    <section class="card" id="drivePanelContainer">
      <h2>Respaldo en Google Drive</h2>
      <p class="muted">La app guarda un archivo <code>${DRIVE_FILE_NAME}</code> en tu Drive con todos tus consorcios, por si cambiás de computadora o se borra el navegador. Solo accede a ese archivo (scope <code>drive.file</code>), no al resto de tu Drive.</p>

      <label>Client ID de Google Cloud (OAuth)
        <input type="text" id="driveClientId" placeholder="xxxxxxxx.apps.googleusercontent.com" value="${escapeHtml(driveState.clientId)}">
      </label>
      <p class="muted small">¿No tenés uno todavía? Mirá los pasos en el README ("Respaldo en Google Drive").</p>

      <div class="drive-status ${estadoClase}">● ${estadoTexto}</div>
      <p class="muted small">Última sincronización: ${formatearFecha(driveState.lastSync)}</p>

      <div class="doc-toolbar">
        ${conectado
          ? `<button class="btn-secondary" id="btnDriveDesconectar">Desconectar</button>
             <button class="btn-secondary" id="btnDriveGuardar">Guardar respaldo ahora</button>
             <button class="btn-secondary" id="btnDriveRestaurar">Restaurar desde Drive</button>`
          : `<button class="btn-primary" id="btnDriveConectar" ${driveState.connecting ? "disabled" : ""}>${driveState.connecting ? "Conectando…" : "Conectar con Google Drive"}</button>`
        }
      </div>

      <label class="check-line" style="margin-top:8px;">
        <input type="checkbox" id="driveAutosync" ${driveState.autosync ? "checked" : ""} ${conectado ? "" : "disabled"}>
        <span>Guardar automáticamente en Drive después de cada cambio</span>
      </label>
    </section>
  `;
}

function bindEvents(container) {
  const inputId = container.querySelector("#driveClientId");
  if (inputId) {
    inputId.addEventListener("change", (e) => {
      driveState.clientId = e.target.value.trim();
      localStorage.setItem(LS_CLIENT_ID, driveState.clientId);
      driveState.tokenClient = null; // reconstruir con el nuevo client id
    });
  }
  const btnConectar = container.querySelector("#btnDriveConectar");
  if (btnConectar) btnConectar.addEventListener("click", conectar);

  const btnDesconectar = container.querySelector("#btnDriveDesconectar");
  if (btnDesconectar) btnDesconectar.addEventListener("click", desconectar);

  const btnGuardar = container.querySelector("#btnDriveGuardar");
  if (btnGuardar) btnGuardar.addEventListener("click", () => guardarEnDrive(false));

  const btnRestaurar = container.querySelector("#btnDriveRestaurar");
  if (btnRestaurar) btnRestaurar.addEventListener("click", restaurarDesdeDrive);

  const chkAutosync = container.querySelector("#driveAutosync");
  if (chkAutosync) {
    chkAutosync.addEventListener("change", (e) => {
      driveState.autosync = e.target.checked;
      localStorage.setItem(LS_AUTOSYNC, driveState.autosync ? "1" : "0");
    });
  }
}

function init() {
  // Nada que hacer al arrancar: la conexión se establece cuando el usuario
  // hace click en "Conectar con Google Drive" (requiere gesto del usuario
  // para el popup de consentimiento de Google).
}

window.DriveSync = { init, panelHtml, bindEvents, onLocalChange };
