/* ==========================================================================
   APP.JS — Lógica de la aplicación
   ========================================================================== */

const STORAGE_KEY = "tp_consorcios_v1";
const CURRENT_KEY = "tp_consorcio_actual_v1";

let state = {
  consorcios: [],
  actualId: null
};

// Cuentas bancarias en edición dentro del formulario de "Inicio" (lista
// dinámica: el consorcio puede tener más de una cuenta).
let bancosEnEdicion = [];

function renderBancosContainer() {
  const cont = document.getElementById("bancosContainer");
  if (!cont) return;
  cont.innerHTML = bancosEnEdicion
    .map(
      (b, idx) => `
    <div class="banco-row" data-idx="${idx}">
      <label>Etiqueta (ej: titular, reserva)
        <input type="text" data-field="etiqueta" value="${escapeHtml(b.etiqueta || "")}" placeholder="Cuenta titular">
      </label>
      <label>Banco
        <input type="text" data-field="nombre" value="${escapeHtml(b.nombre || "")}">
      </label>
      <label>N.º de cuenta
        <input type="text" data-field="cuenta" value="${escapeHtml(b.cuenta || "")}">
      </label>
      <label>CBU
        <input type="text" data-field="cbu" value="${escapeHtml(b.cbu || "")}">
      </label>
      <label>Alias
        <input type="text" data-field="alias" value="${escapeHtml(b.alias || "")}">
      </label>
      ${bancosEnEdicion.length > 1 ? `<button type="button" class="btn-link danger" data-action="eliminar-banco" data-idx="${idx}">Eliminar cuenta</button>` : ""}
    </div>`
    )
    .join("");

  cont.querySelectorAll(".banco-row").forEach((row) => {
    const idx = Number(row.dataset.idx);
    row.querySelectorAll("[data-field]").forEach((input) => {
      input.addEventListener("input", () => {
        bancosEnEdicion[idx][input.dataset.field] = input.value;
      });
    });
  });
  cont.querySelectorAll('[data-action="eliminar-banco"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      bancosEnEdicion.splice(Number(btn.dataset.idx), 1);
      renderBancosContainer();
    });
  });
}

// ---------------------------------------------------------------------------
// Persistencia
// ---------------------------------------------------------------------------
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    state.consorcios = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error leyendo localStorage", e);
    state.consorcios = [];
  }
  state.consorcios.forEach(migrarConsorcio);
  state.actualId = localStorage.getItem(CURRENT_KEY) || (state.consorcios[0] && state.consorcios[0].id) || null;
}

// Adapta consorcios guardados con el formato anterior (matriculaRPA/día de
// vencimiento a nivel de consorcio, una sola cuenta bancaria) al formato
// nuevo, sin perder datos ya cargados.
function migrarConsorcio(c) {
  if (!c.administrador) c.administrador = {};
  if (c.matriculaRPA !== undefined && !c.administrador.matriculaRPA) {
    c.administrador.matriculaRPA = c.matriculaRPA;
  }
  delete c.matriculaRPA;
  delete c.diaVencimiento;

  if (!Array.isArray(c.bancos)) {
    if (c.banco) {
      c.bancos = [{ etiqueta: "Cuenta titular", ...c.banco }];
    } else {
      c.bancos = [{ etiqueta: "Cuenta titular", nombre: "", cuenta: "", cbu: "", alias: "" }];
    }
  }
  delete c.banco;

  if (c.cantidadUF === undefined) c.cantidadUF = "";
  if (c.cantidadPisos === undefined) c.cantidadPisos = "";
  if (c.deptosPorPiso === undefined) c.deptosPorPiso = "";
  if (c.tieneEmpleados === undefined) c.tieneEmpleados = "no";
  if (c.tieneAmenities === undefined) c.tieneAmenities = "no";
  if (c.tieneCocheras === undefined) c.tieneCocheras = "no";

  if (!c.saliente) c.saliente = {};
  if (c.saliente.matricula === undefined) c.saliente.matricula = "";
  if (c.saliente.email === undefined) c.saliente.email = "";
  if (c.saliente.telefono === undefined) c.saliente.telefono = "";
  if (c.saliente.dni === undefined) c.saliente.dni = "";

  if (c.administrador.dni === undefined) c.administrador.dni = "";
  if (c.fechaTomaPosesion === undefined) c.fechaTomaPosesion = "";

  return c;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.consorcios));
  if (state.actualId) localStorage.setItem(CURRENT_KEY, state.actualId);
  if (window.DriveSync) window.DriveSync.onLocalChange();
}

function getActual() {
  return state.consorcios.find((c) => c.id === state.actualId) || null;
}

function nuevoConsorcio(datos) {
  const id = "c_" + Date.now();
  const consorcio = {
    id,
    nombre: datos.nombre || "Consorcio sin nombre",
    direccion: datos.direccion || "",
    cuit: datos.cuit || "",
    cantidadUF: datos.cantidadUF || "",
    cantidadPisos: datos.cantidadPisos || "",
    deptosPorPiso: datos.deptosPorPiso || "",
    tieneEmpleados: datos.tieneEmpleados || "no",
    tieneAmenities: datos.tieneAmenities || "no",
    tieneCocheras: datos.tieneCocheras || "no",
    administrador: {
      nombre: datos.administradorNombre || "",
      dni: datos.administradorDNI || "",
      cuit: datos.administradorCUIT || "",
      matriculaRPA: datos.matriculaRPA || "",
      domicilio: datos.administradorDomicilio || "",
      email: datos.administradorEmail || "",
      telefono: datos.administradorTelefono || ""
    },
    bancos: [{ etiqueta: "Cuenta titular", nombre: "", cuenta: "", cbu: "", alias: "" }],
    fechaAsamblea: "",
    fechaTomaPosesion: "",
    horarioAtencion: "10:00 a 16:00 hs",
    saliente: { nombre: "", dni: "", matricula: "", domicilio: "", email: "", telefono: "", fechaNotificacion: "" },
    checklist: {},
    auditoria: {},
    empleados: {},
    createdAt: new Date().toISOString()
  };
  state.consorcios.push(consorcio);
  state.actualId = id;
  saveState();
  return consorcio;
}

function eliminarConsorcio(id) {
  state.consorcios = state.consorcios.filter((c) => c.id !== id);
  if (state.actualId === id) {
    state.actualId = state.consorcios[0] ? state.consorcios[0].id : null;
  }
  saveState();
}

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------
function fechaHoyStr() {
  const d = new Date();
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" });
}

function sumarDiasHabiles(fechaInicio, dias) {
  const feriados = FERIADOS_AR_2026 || [];
  let f = new Date(fechaInicio);
  let contados = 0;
  while (contados < dias) {
    f.setDate(f.getDate() + 1);
    const dow = f.getDay();
    const isoStr = f.toISOString().slice(0, 10);
    if (dow !== 0 && dow !== 6 && !feriados.includes(isoStr)) {
      contados++;
    }
  }
  return f;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : str;
  return div.innerHTML;
}

function progresoDe(obj, totalIds) {
  const hechos = totalIds.filter((id) => obj[id] && obj[id].estado === "hecho").length;
  return { hechos, total: totalIds.length, pct: totalIds.length ? Math.round((hechos / totalIds.length) * 100) : 0 };
}

// Feriados nacionales de referencia (aproximado, ajustar según calendario oficial vigente)
const FERIADOS_AR_2026 = [
  "2026-01-01", "2026-02-16", "2026-02-17", "2026-03-24", "2026-04-02",
  "2026-04-03", "2026-05-01", "2026-05-25", "2026-06-17", "2026-06-20",
  "2026-07-09", "2026-08-17", "2026-10-12", "2026-11-20", "2026-12-08", "2026-12-25"
];

// ---------------------------------------------------------------------------
// Render: navegación y encabezado de consorcio
// ---------------------------------------------------------------------------
const TABS = [
  { id: "tab-inicio", label: "Inicio" },
  { id: "tab-toma", label: "Toma de posesión" },
  { id: "tab-reclamo", label: "Reclamo al saliente" },
  { id: "tab-auditoria", label: "Auditoría técnica" },
  { id: "tab-empleados", label: "Legajos de empleados" },
  { id: "tab-generador", label: "Generador de documentos" }
];

function renderSelectorConsorcio() {
  const sel = document.getElementById("selectorConsorcio");
  sel.innerHTML = "";
  if (state.consorcios.length === 0) {
    const opt = document.createElement("option");
    opt.textContent = "— Sin consorcios —";
    sel.appendChild(opt);
    sel.disabled = true;
    return;
  }
  sel.disabled = false;
  state.consorcios.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.nombre;
    if (c.id === state.actualId) opt.selected = true;
    sel.appendChild(opt);
  });
}

function cambiarTab(tabId) {
  document.querySelectorAll(".tab-panel").forEach((el) => el.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach((el) => el.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  document.querySelector(`.nav-btn[data-tab="${tabId}"]`).classList.add("active");
  renderTab(tabId);
}

function renderTab(tabId) {
  const c = getActual();
  switch (tabId) {
    case "tab-inicio":
      renderInicio();
      break;
    case "tab-toma":
      renderToma(c);
      break;
    case "tab-reclamo":
      renderReclamo(c);
      break;
    case "tab-auditoria":
      renderAuditoria(c);
      break;
    case "tab-empleados":
      renderEmpleados(c);
      break;
    case "tab-generador":
      renderGenerador(c);
      break;
  }
}

function renderAll() {
  renderSelectorConsorcio();
  const active = document.querySelector(".tab-panel.active");
  renderTab(active ? active.id : "tab-inicio");
}

// ---------------------------------------------------------------------------
// TAB: Inicio (gestión de consorcios + datos generales)
// ---------------------------------------------------------------------------
function renderInicio() {
  const el = document.getElementById("tab-inicio");
  const c = getActual();
  bancosEnEdicion = c && Array.isArray(c.bancos) && c.bancos.length
    ? JSON.parse(JSON.stringify(c.bancos))
    : [{ etiqueta: "Cuenta titular", nombre: "", cuenta: "", cbu: "", alias: "" }];

  let listaHtml = state.consorcios
    .map((cc) => {
      const totalIds = TOMA_POSESION.map((i) => i.id);
      const prog = progresoDe(cc.checklist, totalIds);
      return `<div class="consorcio-card ${cc.id === state.actualId ? "active" : ""}" data-id="${cc.id}">
        <div class="consorcio-card-main">
          <strong>${escapeHtml(cc.nombre)}</strong>
          <span class="muted">${escapeHtml(cc.direccion || "Sin dirección")}</span>
        </div>
        <div class="consorcio-card-side">
          <div class="progress-mini"><div class="progress-mini-bar" style="width:${prog.pct}%"></div></div>
          <span class="muted small">${prog.hechos}/${prog.total} pasos</span>
          <div class="row-btns">
            <button class="btn-link" data-action="seleccionar" data-id="${cc.id}">Abrir</button>
            <button class="btn-link danger" data-action="eliminar" data-id="${cc.id}">Eliminar</button>
          </div>
        </div>
      </div>`;
    })
    .join("");

  if (!listaHtml) {
    listaHtml = `<p class="muted">Todavía no cargaste ningún consorcio. Creá el primero con el formulario de abajo.</p>`;
  }

  el.innerHTML = `
    ${window.DriveSync ? window.DriveSync.panelHtml() : ""}

    <section class="card">
      <h2>Mis consorcios</h2>
      <p class="muted">Cada consorcio guarda su propio checklist, auditoría y datos para generar documentos. Todo se guarda en este navegador (localStorage).</p>
      <div class="consorcio-list">${listaHtml}</div>
    </section>

    <section class="card">
      <h2>${c ? "Editar datos del consorcio" : "Agregar nuevo consorcio"}</h2>
      <form id="formConsorcio" class="form-grid">
        <label>Nombre del consorcio
          <input type="text" name="nombre" placeholder="Ej: Consorcio Av. Callao 1234" value="${c ? escapeHtml(c.nombre) : ""}" required>
        </label>
        <label>Dirección
          <input type="text" name="direccion" placeholder="Calle y número, CABA" value="${c ? escapeHtml(c.direccion) : ""}">
        </label>
        <label>CUIT del consorcio
          <input type="text" name="cuit" placeholder="30-XXXXXXXX-X" value="${c ? escapeHtml(c.cuit) : ""}">
        </label>
        <label>Fecha de la asamblea de designación
          <input type="date" name="fechaAsamblea" value="${c ? c.fechaAsamblea : ""}">
        </label>
        <label>Fecha de toma de posesión (recepción efectiva)
          <input type="date" name="fechaTomaPosesion" value="${c ? c.fechaTomaPosesion : ""}">
        </label>
        <label>Cantidad de UF (unidades funcionales)
          <input type="number" min="0" name="cantidadUF" value="${c ? escapeHtml(c.cantidadUF) : ""}">
        </label>
        <label>Cantidad de pisos
          <input type="number" min="0" name="cantidadPisos" value="${c ? escapeHtml(c.cantidadPisos) : ""}">
        </label>
        <label>Departamentos por piso
          <input type="number" min="0" name="deptosPorPiso" value="${c ? escapeHtml(c.deptosPorPiso) : ""}">
        </label>
        <label>¿Tiene empleados?
          <select name="tieneEmpleados">
            <option value="no" ${c && c.tieneEmpleados === "no" ? "selected" : ""}>No</option>
            <option value="si" ${c && c.tieneEmpleados === "si" ? "selected" : ""}>Sí</option>
          </select>
        </label>
        <label>¿Tiene amenities?
          <select name="tieneAmenities">
            <option value="no" ${c && c.tieneAmenities === "no" ? "selected" : ""}>No</option>
            <option value="si" ${c && c.tieneAmenities === "si" ? "selected" : ""}>Sí</option>
          </select>
        </label>
        <label>¿Tiene cocheras?
          <select name="tieneCocheras">
            <option value="no" ${c && c.tieneCocheras === "no" ? "selected" : ""}>No</option>
            <option value="si" ${c && c.tieneCocheras === "si" ? "selected" : ""}>Sí</option>
          </select>
        </label>

        <h3 class="form-subtitle">Datos del administrador</h3>
        <label>Nombre y apellido
          <input type="text" name="administradorNombre" value="${c ? escapeHtml(c.administrador.nombre) : ""}">
        </label>
        <label>CUIT / CUIL
          <input type="text" name="administradorCUIT" value="${c ? escapeHtml(c.administrador.cuit) : ""}">
        </label>
        <label>DNI
          <input type="text" name="administradorDNI" value="${c ? escapeHtml(c.administrador.dni) : ""}">
        </label>
        <label>Matrícula RPA (Ley 941)
          <input type="text" name="matriculaRPA" placeholder="N.º de matrícula" value="${c ? escapeHtml(c.administrador.matriculaRPA) : ""}">
        </label>
        <label>Domicilio / oficina de atención
          <input type="text" name="administradorDomicilio" value="${c ? escapeHtml(c.administrador.domicilio) : ""}">
        </label>
        <label>Email
          <input type="email" name="administradorEmail" value="${c ? escapeHtml(c.administrador.email) : ""}">
        </label>
        <label>Teléfono
          <input type="text" name="administradorTelefono" value="${c ? escapeHtml(c.administrador.telefono) : ""}">
        </label>
        <label>Horario de atención
          <input type="text" name="horarioAtencion" value="${c ? escapeHtml(c.horarioAtencion) : "10:00 a 16:00 hs"}">
        </label>

        <h3 class="form-subtitle">Cuentas bancarias del consorcio</h3>
        <div class="form-full">
          <p class="muted small">El consorcio puede tener más de una cuenta (por ejemplo, la titular y la de reserva). Agregá todas las que correspondan.</p>
          <div id="bancosContainer"></div>
          <button type="button" id="btnAgregarBanco" class="btn-secondary">+ Agregar cuenta</button>
        </div>

        <h3 class="form-subtitle">Administrador/a saliente (para el reclamo, si corresponde)</h3>
        <label>Nombre y apellido
          <input type="text" name="salienteNombre" value="${c ? escapeHtml(c.saliente.nombre) : ""}">
        </label>
        <label>DNI
          <input type="text" name="salienteDNI" value="${c ? escapeHtml(c.saliente.dni) : ""}">
        </label>
        <label>Matrícula RPA
          <input type="text" name="salienteMatricula" value="${c ? escapeHtml(c.saliente.matricula) : ""}">
        </label>
        <label>Domicilio legal
          <input type="text" name="salienteDomicilio" value="${c ? escapeHtml(c.saliente.domicilio) : ""}">
        </label>
        <label>Email
          <input type="email" name="salienteEmail" value="${c ? escapeHtml(c.saliente.email) : ""}">
        </label>
        <label>Teléfono
          <input type="text" name="salienteTelefono" value="${c ? escapeHtml(c.saliente.telefono) : ""}">
        </label>
        <label>Fecha de notificación fehaciente de remoción/renuncia
          <input type="date" name="salienteFechaNotificacion" value="${c ? c.saliente.fechaNotificacion : ""}">
        </label>

        <div class="form-actions">
          <button type="submit" class="btn-primary">${c ? "Guardar cambios" : "Crear consorcio"}</button>
        </div>
      </form>
    </section>
  `;

  document.getElementById("formConsorcio").addEventListener("submit", onSubmitConsorcio);
  renderBancosContainer();
  document.getElementById("btnAgregarBanco").addEventListener("click", () => {
    bancosEnEdicion.push({ etiqueta: "", nombre: "", cuenta: "", cbu: "", alias: "" });
    renderBancosContainer();
  });

  if (window.DriveSync) window.DriveSync.bindEvents(el);

  el.querySelectorAll('[data-action="seleccionar"]').forEach((btn) =>
    btn.addEventListener("click", () => {
      state.actualId = btn.dataset.id;
      saveState();
      renderAll();
    })
  );
  el.querySelectorAll('[data-action="eliminar"]').forEach((btn) =>
    btn.addEventListener("click", () => {
      if (confirm("¿Eliminar este consorcio y todo su progreso guardado? Esta acción no se puede deshacer.")) {
        eliminarConsorcio(btn.dataset.id);
        renderAll();
      }
    })
  );
}

function onSubmitConsorcio(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const datos = Object.fromEntries(fd.entries());
  let c = getActual();

  if (!c) {
    c = nuevoConsorcio(datos);
  }

  c.nombre = datos.nombre;
  c.direccion = datos.direccion;
  c.cuit = datos.cuit;
  c.fechaAsamblea = datos.fechaAsamblea;
  c.fechaTomaPosesion = datos.fechaTomaPosesion;
  c.horarioAtencion = datos.horarioAtencion;
  c.cantidadUF = datos.cantidadUF;
  c.cantidadPisos = datos.cantidadPisos;
  c.deptosPorPiso = datos.deptosPorPiso;
  c.tieneEmpleados = datos.tieneEmpleados;
  c.tieneAmenities = datos.tieneAmenities;
  c.tieneCocheras = datos.tieneCocheras;
  c.administrador = {
    nombre: datos.administradorNombre,
    dni: datos.administradorDNI,
    cuit: datos.administradorCUIT,
    matriculaRPA: datos.matriculaRPA,
    domicilio: datos.administradorDomicilio,
    email: datos.administradorEmail,
    telefono: datos.administradorTelefono
  };
  c.bancos = bancosEnEdicion
    .filter((b) => b.etiqueta || b.nombre || b.cuenta || b.cbu || b.alias)
    .map((b) => ({ etiqueta: b.etiqueta || "", nombre: b.nombre || "", cuenta: b.cuenta || "", cbu: b.cbu || "", alias: b.alias || "" }));
  if (!c.bancos.length) {
    c.bancos = [{ etiqueta: "Cuenta titular", nombre: "", cuenta: "", cbu: "", alias: "" }];
  }
  c.saliente = {
    nombre: datos.salienteNombre,
    dni: datos.salienteDNI,
    matricula: datos.salienteMatricula,
    domicilio: datos.salienteDomicilio,
    email: datos.salienteEmail,
    telefono: datos.salienteTelefono,
    fechaNotificacion: datos.salienteFechaNotificacion
  };

  saveState();
  renderAll();
  toast("Datos guardados.");
}

// ---------------------------------------------------------------------------
// TAB: Toma de posesión
// ---------------------------------------------------------------------------
function renderToma(c) {
  const el = document.getElementById("tab-toma");
  if (!c) {
    el.innerHTML = sinConsorcioHtml();
    return;
  }

  const totalIds = TOMA_POSESION.map((i) => i.id);
  const prog = progresoDe(c.checklist, totalIds);

  const itemsHtml = TOMA_POSESION.map((item) => {
    const estadoActual = (c.checklist[item.id] && c.checklist[item.id].estado) || "pendiente";
    const notas = (c.checklist[item.id] && c.checklist[item.id].notas) || "";
    return `
    <details class="checklist-item estado-${estadoActual}" data-id="${item.id}">
      <summary>
        <span class="badge-organismo">${escapeHtml(item.organismo)}</span>
        <span class="item-titulo">${item.orden}. ${escapeHtml(item.titulo)}</span>
        <select class="estado-select" data-id="${item.id}">
          <option value="pendiente" ${estadoActual === "pendiente" ? "selected" : ""}>Pendiente</option>
          <option value="en-curso" ${estadoActual === "en-curso" ? "selected" : ""}>En curso</option>
          <option value="hecho" ${estadoActual === "hecho" ? "selected" : ""}>Hecho</option>
        </select>
      </summary>
      <div class="item-body">
        <p>${escapeHtml(item.resumen)}</p>
        <h4>Fundamento legal</h4>
        <ul>${item.fundamento.map((f) => `<li>${escapeHtml(f)}</li>`).join("")}</ul>
        <h4>Documentación necesaria</h4>
        <ul>${item.documentos.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}</ul>
        <h4>Dónde se hace</h4>
        <p>${escapeHtml(item.dondeSeHace)}</p>
        <h4>Riesgo por incumplimiento</h4>
        <p class="riesgo">${escapeHtml(item.riesgo)}</p>
        ${item.jurisprudencia ? `<h4>Jurisprudencia</h4><p class="muted">${escapeHtml(item.jurisprudencia)}</p>` : ""}
        ${item.tips ? `<h4>Tip práctico</h4><p>${escapeHtml(item.tips)}</p>` : ""}
        ${item.comoProceder ? `<details class="proceder-details"><summary>📋 Cómo proceder — paso a paso</summary><p>${escapeHtml(item.comoProceder)}</p></details>` : ""}
        <label class="notas-label">Notas propias
          <textarea class="notas-textarea" data-id="${item.id}" rows="2" placeholder="Turno, contacto, número de expediente...">${escapeHtml(notas)}</textarea>
        </label>
        ${item.generaDocumento ? `<button class="btn-secondary" data-ir-generador="${item.generaDocumento}">Generar este documento →</button>` : ""}
      </div>
    </details>`;
  }).join("");

  el.innerHTML = `
    <section class="card">
      <h2>Toma de posesión — ${escapeHtml(c.nombre)}</h2>
      <p class="muted">Circuito completo para asumir el control del consorcio: asamblea, banco, ARCA, AGIP, AGC, ART, SUTERH y comunicación a propietarios.</p>
      <div class="progress-bar-wrap">
        <div class="progress-bar"><div class="progress-bar-fill" style="width:${prog.pct}%"></div></div>
        <span>${prog.hechos} / ${prog.total} completados (${prog.pct}%)</span>
      </div>
    </section>
    <section class="checklist-list">${itemsHtml}</section>
  `;

  bindChecklistEvents(el, c, "checklist");
}

function bindChecklistEvents(el, c, campo) {
  el.querySelectorAll(".estado-select").forEach((sel) => {
    sel.addEventListener("click", (e) => e.stopPropagation());
    sel.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      c[campo][id] = c[campo][id] || {};
      c[campo][id].estado = e.target.value;
      saveState();
      const details = el.querySelector(`details[data-id="${id}"]`);
      if (details) {
        details.className = "checklist-item estado-" + e.target.value;
      }
      updateProgressBar(el, c, campo);
      updateInicioCardIfVisible();
    });
  });

  el.querySelectorAll(".notas-textarea").forEach((ta) => {
    ta.addEventListener("input", (e) => {
      const id = e.target.dataset.id;
      c[campo][id] = c[campo][id] || {};
      c[campo][id].notas = e.target.value;
      saveState();
    });
  });

  el.querySelectorAll("[data-ir-generador]").forEach((btn) => {
    btn.addEventListener("click", () => {
      cambiarTab("tab-generador");
      document.getElementById("selectorPlantilla").value = btn.dataset.irGenerador;
      renderPlantillaSeleccionada(c);
    });
  });
}

function updateProgressBar(el, c, campo) {
  let totalIds;
  if (campo === "checklist") totalIds = TOMA_POSESION.map((i) => i.id);
  else if (campo === "auditoria") totalIds = auditoriaIds();
  else totalIds = empleadosIds();
  const prog = progresoDe(c[campo], totalIds);
  const fill = el.querySelector(".progress-bar-fill");
  const label = el.querySelector(".progress-bar-wrap span");
  if (fill) fill.style.width = prog.pct + "%";
  if (label) label.textContent = `${prog.hechos} / ${prog.total} completados (${prog.pct}%)`;
}

function updateInicioCardIfVisible() {
  const inicioPanel = document.getElementById("tab-inicio");
  if (inicioPanel && inicioPanel.classList.contains("active")) {
    renderInicio();
  }
}

function auditoriaIds() {
  const ids = [];
  AUDITORIA_MODULOS.forEach((m) => m.items.forEach((i) => ids.push(i.id)));
  return ids;
}

function empleadosIds() {
  const ids = [];
  EMPLEADOS_EJES.forEach((eje) => eje.items.forEach((_, idx) => ids.push(eje.id + "_" + idx)));
  return ids;
}

// ---------------------------------------------------------------------------
// TAB: Reclamo al administrador saliente
// ---------------------------------------------------------------------------
function renderReclamo(c) {
  const el = document.getElementById("tab-reclamo");
  if (!c) {
    el.innerHTML = sinConsorcioHtml();
    return;
  }

  let plazosHtml = "";
  if (c.saliente.fechaNotificacion) {
    const inicio = new Date(c.saliente.fechaNotificacion + "T00:00:00");
    const vencInterpelacion = sumarDiasHabiles(inicio, 10);
    const vencCD = new Date(vencInterpelacion);
    vencCD.setDate(vencCD.getDate() + 3); // 72hs de margen ilustrativo tras CD
    plazosHtml = `
      <div class="alert-box">
        <strong>Calculadora de plazos</strong> (a partir de la fecha de notificación fehaciente: ${inicio.toLocaleDateString("es-AR")})
        <ul>
          <li>Vencimiento del plazo de <strong>10 días hábiles</strong> del Art. 2067 inc. j) CCyC / Art. 12 Ley 941: <strong>${vencInterpelacion.toLocaleDateString("es-AR")}</strong>. A partir de esa fecha, si no entregó la documentación, corresponde enviar Carta Documento.</li>
          <li>Si la Carta Documento se envía el día del vencimiento, el plazo perentorio de 48/72 horas hábiles vencería aproximadamente el <strong>${vencCD.toLocaleDateString("es-AR")}</strong> (verificar días hábiles exactos al momento del envío).</li>
        </ul>
      </div>`;
  } else {
    plazosHtml = `<div class="alert-box muted">Cargá la "Fecha de notificación fehaciente de remoción/renuncia" del saliente en la pestaña Inicio para activar la calculadora de plazos.</div>`;
  }

  const etapasHtml = RECLAMO_ETAPAS.map((et) => `
    <div class="etapa-card">
      <div class="etapa-numero">${et.numero}</div>
      <div class="etapa-contenido">
        <h3>${escapeHtml(et.titulo)}</h3>
        <span class="badge-plazo">${escapeHtml(et.plazo)}</span>
        <p>${escapeHtml(et.descripcion)}</p>
        <p class="muted"><strong>Fundamento:</strong> ${et.fundamento.map(escapeHtml).join(" · ")}</p>
        ${et.desarrollo ? `<details class="proceder-details"><summary>📋 Desarrollo — cómo se procede en detalle</summary><p>${escapeHtml(et.desarrollo)}</p></details>` : ""}
        ${et.generaDocumento ? `<button class="btn-secondary" data-ir-generador="${et.generaDocumento}">Generar Carta Documento →</button>` : ""}
      </div>
    </div>
  `).join("");

  const docsHtml = DOCUMENTACION_A_RECLAMAR.map((d) => `<li>${escapeHtml(d)}</li>`).join("");

  el.innerHTML = `
    <section class="card">
      <h2>Reclamo al administrador saliente — ${escapeHtml(c.nombre)}</h2>
      <p class="muted">Guía de acción en 4 etapas para exigir la entrega de libros, documentación y fondos al administrador saliente.</p>
      ${plazosHtml}
    </section>
    <section class="etapas-list">${etapasHtml}</section>
    <section class="card">
      <h3>Documentación a reclamar (detalle completo)</h3>
      <ul class="two-cols">${docsHtml}</ul>
    </section>
  `;

  el.querySelectorAll("[data-ir-generador]").forEach((btn) => {
    btn.addEventListener("click", () => {
      cambiarTab("tab-generador");
      document.getElementById("selectorPlantilla").value = btn.dataset.irGenerador;
      renderPlantillaSeleccionada(c);
    });
  });
}

// ---------------------------------------------------------------------------
// TAB: Auditoría técnica
// ---------------------------------------------------------------------------
const ESTADOS_AUDITORIA = [
  { value: "pendiente", label: "Pendiente" },
  { value: "en-curso", label: "Revisando" },
  { value: "con-observaciones", label: "Verificado — con observaciones" },
  { value: "ok", label: "Verificado — sin observaciones" }
];

// Módulos III y IV (libros y documentación) registran "entrega", no
// "verificación técnica": un libro o un comprobante se entrega o no se
// entrega, no se "revisa" de la misma forma que un ascensor.
const ESTADOS_ENTREGA = [
  { value: "pendiente", label: "Pendiente" },
  { value: "entregado-conforme", label: "Entregado conforme" },
  { value: "entregado-incompleto", label: "Entregado incompleto" },
  { value: "no-entregado", label: "No entregado" },
  { value: "irregular", label: "Irregular" }
];

function estadosDeModulo(mod) {
  return mod && mod.estadoTipo === "entrega" ? ESTADOS_ENTREGA : ESTADOS_AUDITORIA;
}

function estadoObservado(estado) {
  // Estados que ameritan quedar listados como "observación / pendiente" en
  // el Acta de Recepción y disparar los recordatorios legales.
  return ["pendiente", "entregado-incompleto", "no-entregado", "irregular"].includes(estado);
}

function auditoriaProgreso(c) {
  const ids = auditoriaIds();
  let hechos = 0;
  ids.forEach((id) => {
    const registro = c.auditoria[id];
    const item = auditoriaItemPorId(id);
    if (item && item.opcional && registro && registro.tiene === "no") {
      hechos++; // no aplica: no puede quedar "pendiente" para siempre
    } else if (registro && registro.estado && registro.estado !== "pendiente") {
      hechos++;
    }
  });
  return { hechos, total: ids.length, pct: ids.length ? Math.round((hechos / ids.length) * 100) : 0 };
}

function auditoriaItemPorId(id) {
  for (const mod of AUDITORIA_MODULOS) {
    const found = mod.items.find((i) => i.id === id);
    if (found) return found;
  }
  return null;
}

function auditoriaModuloDeItem(id) {
  return AUDITORIA_MODULOS.find((mod) => mod.items.some((i) => i.id === id)) || null;
}

function renderAuditoria(c) {
  const el = document.getElementById("tab-auditoria");
  if (!c) {
    el.innerHTML = sinConsorcioHtml();
    return;
  }

  const prog = auditoriaProgreso(c);

  const modulosHtml = AUDITORIA_MODULOS.map((mod) => {
    const estadosModulo = estadosDeModulo(mod);
    const itemsHtml = mod.items.map((item) => {
      const registro = c.auditoria[item.id] || {};
      const estadoActual = registro.estado || "pendiente";
      const notas = registro.notas || "";
      const campos = registro.campos || {};
      const tiene = registro.tiene || (item.opcional ? "" : "si");
      const noAplica = item.opcional && tiene === "no";

      const camposHtml = (item.campos || [])
        .map((campo) => {
          const valor = campos[campo.id] || "";
          if (campo.type === "select") {
            return `<label>${escapeHtml(campo.label)}
              <select class="campo-input" data-id="${item.id}" data-campo="${campo.id}">
                <option value="">— Sin definir —</option>
                ${campo.options.map((op) => `<option value="${escapeHtml(op)}" ${valor === op ? "selected" : ""}>${escapeHtml(op)}</option>`).join("")}
              </select>
            </label>`;
          }
          if (campo.type === "textarea") {
            return `<label class="form-full">${escapeHtml(campo.label)}
              <textarea class="campo-input" data-id="${item.id}" data-campo="${campo.id}" rows="2">${escapeHtml(valor)}</textarea>
            </label>`;
          }
          return `<label>${escapeHtml(campo.label)}
            <input type="${campo.type}" class="campo-input" data-id="${item.id}" data-campo="${campo.id}" value="${escapeHtml(valor)}">
          </label>`;
        })
        .join("");

      const tieneToggleHtml = item.opcional
        ? `<label class="tiene-toggle">${escapeHtml(item.preguntaTiene || "¿El consorcio tiene esta instalación?")}
            <select class="tiene-select" data-id="${item.id}">
              <option value="" ${tiene === "" ? "selected" : ""}>— Sin definir —</option>
              <option value="si" ${tiene === "si" ? "selected" : ""}>Sí, tiene</option>
              <option value="no" ${tiene === "no" ? "selected" : ""}>No tiene</option>
            </select>
          </label>`
        : "";

      const cuerpoHtml = noAplica
        ? `<p class="muted">No aplica: se marcó que este consorcio no tiene esta instalación. Cambiá la respuesta de arriba si corresponde revisarlo.</p>`
        : `
          ${item.verificar ? `<h4>Puntos a verificar</h4><ul>${item.verificar.map((v) => `<li>${escapeHtml(v)}</li>`).join("")}</ul>` : ""}
          ${item.nota ? `<p class="muted small">${escapeHtml(item.nota)}</p>` : ""}
          ${item.campos ? `<h4>Relevamiento</h4><div class="form-grid">${camposHtml}</div>` : ""}
          ${item.riesgo ? `<h4>Riesgo por incumplimiento</h4><p class="riesgo">${escapeHtml(item.riesgo)}</p>` : ""}
          ${item.siNoLoTengo ? `<details class="proceder-details"><summary>📋 Si no tengo este libro / no sé si está bien confeccionado</summary><p>${escapeHtml(item.siNoLoTengo)}</p></details>` : ""}
          ${item.queMirar ? `<details class="proceder-details"><summary>📋 Qué mirar / qué pedir</summary><p>${escapeHtml(item.queMirar)}</p></details>` : ""}
          <label class="estado-label">Estado
            <select class="estado-select" data-id="${item.id}">
              ${estadosModulo.map((es) => `<option value="${es.value}" ${estadoActual === es.value ? "selected" : ""}>${es.label}</option>`).join("")}
            </select>
          </label>
          <label class="notas-label">Notas de relevamiento${mod.estadoTipo === "entrega" ? " / detalle de lo faltante o incompleto" : ""}
            <textarea class="notas-textarea" data-id="${item.id}" rows="2" placeholder="Observaciones, fecha de inspección...">${escapeHtml(notas)}</textarea>
          </label>`;

      return `
      <details class="checklist-item estado-${noAplica ? "no-aplica" : estadoActual}" data-id="${item.id}">
        <summary>
          <span class="item-titulo">${escapeHtml(item.titulo)}</span>
          <span class="badge-estado">${noAplica ? "No aplica" : estadosModulo.find((e) => e.value === estadoActual).label}</span>
        </summary>
        <div class="item-body">
          ${tieneToggleHtml}
          ${cuerpoHtml}
        </div>
      </details>`;
    }).join("");

    return `<section class="card">
      <h3>${escapeHtml(mod.titulo)}</h3>
      <p class="muted">${escapeHtml(mod.subtitulo)}</p>
      <div class="checklist-list">${itemsHtml}</div>
    </section>`;
  }).join("");

  el.innerHTML = `
    <section class="card">
      <h2>Auditoría de inicio y diagnóstico integral — ${escapeHtml(c.nombre)}</h2>
      <p class="muted">Relevamiento técnico, edilicio, contable, fiscal y laboral para usar como "Auditoría Técnica Previa de Toma de Razón" ante el consejo de propietarios.</p>
      <div class="progress-bar-wrap">
        <div class="progress-bar"><div class="progress-bar-fill" style="width:${prog.pct}%"></div></div>
        <span>${prog.hechos} / ${prog.total} resueltos (${prog.pct}%)</span>
      </div>
      <p class="muted small">Página oficial de AGC para ascensores, instalaciones térmicas, IFL y fachadas: <a href="https://instalaciones.agcontrol.gob.ar/" target="_blank" rel="noopener">instalaciones.agcontrol.gob.ar</a></p>
      <div class="form-actions" style="margin-top:10px;">
        <button class="btn-primary" id="btnGenerarActa">📄 Generar Acta de Recepción (para imprimir / PDF)</button>
      </div>
    </section>
    ${checkpointsLegalesHtml(c)}
    ${modulosHtml}
  `;

  bindAuditoriaEvents(el, c);

  const btnActa = document.getElementById("btnGenerarActa");
  if (btnActa) btnActa.addEventListener("click", () => abrirActaRecepcion(c));
}

// ---------------------------------------------------------------------------
// Checkpoints legales (recordatorios automáticos) — Módulo de notificaciones
// ---------------------------------------------------------------------------
function checkpointsLegalesHtml(c) {
  const ids = auditoriaIds();
  const modulo3y4Ids = ["modulo3", "modulo4"].flatMap(
    (mid) => (AUDITORIA_MODULOS.find((m) => m.id === mid) || { items: [] }).items.map((i) => i.id)
  );
  const pendientesONoEntregados = modulo3y4Ids.filter((id) => {
    const registro = c.auditoria[id];
    const estado = (registro && registro.estado) || "pendiente";
    return estado === "pendiente" || estado === "no-entregado";
  });

  let alerta1 = "";
  if (c.fechaTomaPosesion && pendientesONoEntregados.length) {
    const inicio = new Date(c.fechaTomaPosesion + "T00:00:00");
    const vencimiento = sumarDiasHabiles(inicio, 10);
    const hoy = new Date();
    if (hoy >= vencimiento) {
      alerta1 = `<div class="alert-box danger">
        <strong>⚠ Plazo de 10 días hábiles vencido</strong> — quedan ${pendientesONoEntregados.length} ítem(s) de libros/documentación en estado "Pendiente" o "No entregado" desde la toma de posesión (${inicio.toLocaleDateString("es-AR")}). Corresponde enviar Carta Documento de intimación al administrador saliente.
        <div class="form-actions"><button class="btn-secondary" data-ir-generador="carta-documento">Generar Carta Documento →</button></div>
      </div>`;
    }
  }

  let alerta2 = "";
  if (c.fechaTomaPosesion) {
    const inicio = new Date(c.fechaTomaPosesion + "T00:00:00");
    const vencAsamblea = new Date(inicio);
    vencAsamblea.setDate(vencAsamblea.getDate() + 30);
    alerta2 = `<div class="alert-box">
      <strong>📅 Recordatorio: Asamblea Informativa de Inicio</strong> — programala dentro de los 30 días de la toma de posesión (venc. orientativo: ${vencAsamblea.toLocaleDateString("es-AR")}) para presentar a los propietarios el estado real en que se recibió el edificio, eximiendo a la nueva gestión de responsabilidad por hechos anteriores.
      <div class="form-actions"><button class="btn-secondary" data-ir-generador="asamblea-informativa">Generar convocatoria y orden del día →</button></div>
    </div>`;
  } else {
    alerta2 = `<div class="alert-box muted">Cargá la "Fecha de toma de posesión" en la pestaña Inicio para activar el recordatorio de la Asamblea Informativa de Inicio.</div>`;
  }

  const alerta3 = `<div class="alert-box warning">
    <strong>⚖ Impugnación de la Asamblea de Designación por la administración saliente</strong> — si la administración anterior desconoce el acto asambleario, se requiere representación letrada (abogado matriculado en el CPACF) en la Mediación Prejudicial Obligatoria (Ley N.º 26.589) o en la contestación de acciones de nulidad de asamblea (Art. 2060 CCyCN).
  </div>`;

  return `<section class="card">
    <h3>Notificaciones y checkpoints legales</h3>
    <div class="checkpoints-list">
      ${alerta1}
      ${alerta2}
      ${alerta3}
    </div>
  </section>`;
}

function bindAuditoriaEvents(el, c) {
  el.querySelectorAll(".estado-select").forEach((sel) => {
    sel.addEventListener("click", (e) => e.stopPropagation());
    sel.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      c.auditoria[id] = c.auditoria[id] || {};
      c.auditoria[id].estado = e.target.value;
      saveState();
      renderAuditoria(c);
    });
  });

  el.querySelectorAll(".tiene-select").forEach((sel) => {
    sel.addEventListener("click", (e) => e.stopPropagation());
    sel.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      c.auditoria[id] = c.auditoria[id] || {};
      c.auditoria[id].tiene = e.target.value;
      saveState();
      renderAuditoria(c);
    });
  });

  el.querySelectorAll(".campo-input").forEach((input) => {
    input.addEventListener("click", (e) => e.stopPropagation());
    input.addEventListener("input", (e) => {
      const id = e.target.dataset.id;
      const campo = e.target.dataset.campo;
      c.auditoria[id] = c.auditoria[id] || {};
      c.auditoria[id].campos = c.auditoria[id].campos || {};
      c.auditoria[id].campos[campo] = e.target.value;
      saveState();
    });
    input.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      const campo = e.target.dataset.campo;
      c.auditoria[id] = c.auditoria[id] || {};
      c.auditoria[id].campos = c.auditoria[id].campos || {};
      c.auditoria[id].campos[campo] = e.target.value;
      saveState();
    });
  });

  el.querySelectorAll(".notas-textarea").forEach((ta) => {
    ta.addEventListener("input", (e) => {
      const id = e.target.dataset.id;
      c.auditoria[id] = c.auditoria[id] || {};
      c.auditoria[id].notas = e.target.value;
      saveState();
    });
  });

  el.querySelectorAll("[data-ir-generador]").forEach((btn) => {
    btn.addEventListener("click", () => {
      cambiarTab("tab-generador");
      document.getElementById("selectorPlantilla").value = btn.dataset.irGenerador;
      renderPlantillaSeleccionada(c);
    });
  });
}

// ---------------------------------------------------------------------------
// ACTA DE RECEPCIÓN DE DOCUMENTACIÓN Y LIBROS — BAJO RESERVA DE AUDITORÍA
// ---------------------------------------------------------------------------
function fechaEnPalabras(fecha) {
  const dia = fecha.getDate();
  const mes = fecha.toLocaleDateString("es-AR", { month: "long" });
  const anio = fecha.getFullYear();
  return `${dia} días del mes de ${mes} de ${anio}`;
}

function itemsEntregaHtml(mod, c) {
  if (!mod) return "";
  return mod.items
    .map((item) => {
      const registro = c.auditoria[item.id] || {};
      const estado = registro.estado || "pendiente";
      const label = ESTADOS_ENTREGA.find((e) => e.value === estado).label;
      return `<li><strong>${escapeHtml(item.titulo)}:</strong> ${escapeHtml(label)}</li>`;
    })
    .join("");
}

function itemsTecnicosHtml(c) {
  const modulosTecnicos = AUDITORIA_MODULOS.filter((m) => m.id === "modulo1" || m.id === "modulo2");
  const lis = [];
  modulosTecnicos.forEach((mod) => {
    mod.items.forEach((item) => {
      const registro = c.auditoria[item.id] || {};
      if (item.opcional && registro.tiene === "no") return; // no aplica: no listar
      const estado = registro.estado || "pendiente";
      const label = ESTADOS_AUDITORIA.find((e) => e.value === estado).label;
      lis.push(`<li><strong>${escapeHtml(item.titulo)}:</strong> ${escapeHtml(label)}</li>`);
    });
  });
  return lis.join("");
}

function observacionesActaHtml(c) {
  const modulosDoc = AUDITORIA_MODULOS.filter((m) => m.id === "modulo3" || m.id === "modulo4");
  const items = [];
  modulosDoc.forEach((mod) => {
    mod.items.forEach((item) => {
      const registro = c.auditoria[item.id] || {};
      const estado = registro.estado || "pendiente";
      if (estadoObservado(estado)) {
        const label = ESTADOS_ENTREGA.find((e) => e.value === estado).label;
        const nota = registro.notas ? escapeHtml(registro.notas) : "Sin detalle adicional cargado.";
        items.push(`<li><em>${escapeHtml(item.titulo)} — ${escapeHtml(label)}:</em> ${nota}</li>`);
      }
    });
  });
  if (!items.length) {
    return "<p>No se registran observaciones: todos los ítems de libros y documentación relevados en la auditoría figuran como entregados conformes al momento de la firma de la presente.</p>";
  }
  return `<ul>${items.join("")}</ul>`;
}

function abrirActaRecepcion(c) {
  const hoy = new Date();
  const bancos = Array.isArray(c.bancos) && c.bancos.length ? c.bancos : [];
  const bancoPrincipal = bancos[0] || {};

  const html = `<!DOCTYPE html>
<html lang="es-AR">
<head>
<meta charset="UTF-8">
<title>Acta de Recepción — ${escapeHtml(c.nombre)}</title>
<style>
  body { font-family: "Times New Roman", Times, serif; font-size: 12pt; color: #111; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.5; }
  h1 { font-size: 14pt; text-align: center; margin-bottom: 24px; }
  p, li { text-align: justify; }
  h2 { font-size: 12pt; margin-top: 20px; }
  ul { margin: 6px 0 6px 20px; padding: 0; }
  .toolbar { max-width: 800px; margin: 0 auto 20px; text-align: right; }
  .toolbar button { font-family: Arial, sans-serif; font-size: 14px; padding: 8px 16px; background: #0b2a4a; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
  .firmas { display: flex; justify-content: space-between; margin-top: 60px; gap: 40px; }
  .firma-box { flex: 1; text-align: center; font-family: Arial, sans-serif; font-size: 10pt; }
  .firma-linea { border-top: 1px solid #111; margin-top: 50px; padding-top: 6px; }
  .firma-rol { font-weight: bold; margin-top: 6px; }
  @media print { .toolbar { display: none; } body { margin: 0; } }
</style>
</head>
<body>
<div class="toolbar"><button onclick="window.print()">🖨 Imprimir / Guardar como PDF</button></div>

<h1>ACTA DE RECEPCIÓN DE DOCUMENTACIÓN Y LIBROS<br>CON RESERVA DE AUDITORÍA</h1>

<p>En la Ciudad Autónoma de Buenos Aires, a los ${fechaEnPalabras(hoy)}, entre:</p>

<p>Por una parte, el/la Sr./Sra. ${escapeHtml(c.saliente.nombre) || "[Nombre del Administrador Saliente]"}, DNI N.º ${escapeHtml(c.saliente.dni) || "[DNI]"}, Matrícula RPA N.º ${escapeHtml(c.saliente.matricula) || "[matrícula]"}, en su carácter de Administrador/a saliente del Consorcio de Propietarios de la calle ${escapeHtml(c.direccion) || "[dirección del edificio]"}, CUIT N.º ${escapeHtml(c.cuit) || "[CUIT]"}, en adelante denominado LA ADMINISTRACIÓN SALIENTE;</p>

<p>Y por la otra parte, el/la Sr./Sra. ${escapeHtml(c.administrador.nombre) || "[Nombre del Administrador Entrante]"}, DNI N.º ${escapeHtml(c.administrador.dni) || "[DNI]"}, Matrícula RPA N.º ${escapeHtml(c.administrador.matriculaRPA) || "[matrícula]"}, en su carácter de Administrador/a entrante y representante legal del Consorcio de la referencia, en adelante denominado LA ADMINISTRACIÓN ENTRANTE;</p>

<p>Se conviene en celebrar la presente ACTA DE RECEPCIÓN, la cual se sujetará a las siguientes cláusulas y condiciones:</p>

<p><strong>PRIMERA: OBJETO.</strong> LA ADMINISTRACIÓN SALIENTE hace entrega en este acto a LA ADMINISTRACIÓN ENTRANTE de la documentación, libros obligatorios, antecedentes y elementos pertenecientes al Consorcio de Propietarios de la calle ${escapeHtml(c.direccion) || "[dirección del edificio]"}, conforme al siguiente detalle, relevado según el proceso de Auditoría Técnica de esta administración:</p>

<h2>1. Libros obligatorios y documentación legal</h2>
<ul>${itemsEntregaHtml(AUDITORIA_MODULOS.find((m) => m.id === "modulo3"), c)}</ul>

<h2>2. Situación contable, fiscal, laboral y seguros</h2>
<ul>${itemsEntregaHtml(AUDITORIA_MODULOS.find((m) => m.id === "modulo4"), c)}</ul>

<h2>3. Relevamiento técnico y edilicio</h2>
<ul>${itemsTecnicosHtml(c)}</ul>

<h2>4. Datos bancarios informados</h2>
<p>Cuenta bancaria oficial del consorcio: Banco ${escapeHtml(bancoPrincipal.nombre) || "[banco]"}, N.º de cuenta ${escapeHtml(bancoPrincipal.cuenta) || "[cuenta]"}, CBU ${escapeHtml(bancoPrincipal.cbu) || "[cbu]"}.</p>

<p><strong>SEGUNDA: OBSERVACIONES Y DOCUMENTACIÓN PENDIENTE.</strong> Se deja constancia expresa de que al momento de la firma de la presente acta se registran las siguientes observaciones sobre lo detallado en el Punto Primero:</p>
${observacionesActaHtml(c)}
<p>LA ADMINISTRACIÓN SALIENTE se compromete a hacer entrega de los elementos faltantes o a subsanar las irregularidades señaladas dentro del plazo perentorio de SETENTA Y DOS (72) horas hábiles, bajo apercibimiento de lo dispuesto por la Ley N.º 941 del GCBA.</p>

<p><strong>TERCERA: CLÁUSULA DE RESERVA DE AUDITORÍA.</strong> LA ADMINISTRACIÓN ENTRANTE recibe la documentación descrita en el Punto Primero BAJO ESTRICTA Y EXPRESA RESERVA DE AUDITORÍA E INVENTARIO DETALLADO. Se deja establecido que la recepción material de las carpetas, folios y libros:</p>
<ol>
<li>NO IMPLICA aprobación de la gestión de LA ADMINISTRACIÓN SALIENTE, ni conformidad con la exactitud de los saldos bancarios, números de caja, ni con la legitimidad de las erogaciones realizadas.</li>
<li>NO CONSTITUYE la rendición de cuentas definitiva a la que se refieren los artículos 858 y 2067 inc. e) del Código Civil y Comercial de la Nación.</li>
<li>NO IMPORTA RENUNCIA ALGUNA por parte del Consorcio de Propietarios ni de la nueva administración para exigir la entrega de documentación faltante, reclamar la restitución de sumas de dinero, iniciar denuncias ante el Registro Público de Administradores (RPA - Ley 941 CABA) o promover las acciones civiles y penales que pudieran corresponder por inconsistencias, deudas ocultas o irregularidades que se detecten tras el examen analítico de los antecedentes dentro del plazo de NOVENTA (90) días.</li>
</ol>

<p>En prueba de conformidad y previa lectura, se firman DOS (2) ejemplares de un mismo tenor y a un solo efecto, en la Ciudad Autónoma de Buenos Aires, a la fecha expresada al comienzo.</p>

<div class="firmas">
  <div class="firma-box">
    <div class="firma-linea">………………………………………</div>
    <div>${escapeHtml(c.saliente.nombre) || "(Nombre completo)"}</div>
    <div>Mat. RPA N.º ${escapeHtml(c.saliente.matricula) || ""}</div>
    <div>D.N.I. ${escapeHtml(c.saliente.dni) || ""}</div>
    <div class="firma-rol">ADMINISTRADOR SALIENTE</div>
  </div>
  <div class="firma-box">
    <div class="firma-linea">………………………………………</div>
    <div>${escapeHtml(c.administrador.nombre) || "(Nombre completo)"}</div>
    <div>Mat. RPA N.º ${escapeHtml(c.administrador.matriculaRPA) || ""}</div>
    <div>D.N.I. ${escapeHtml(c.administrador.dni) || ""}</div>
    <div class="firma-rol">ADMINISTRADOR ENTRANTE</div>
  </div>
</div>

</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const ventana = window.open(url, "_blank");
  if (!ventana) {
    toast("El navegador bloqueó la ventana. Permití ventanas emergentes para generar el acta.");
  }
}

// ---------------------------------------------------------------------------
// TAB: Legajos de empleados
// ---------------------------------------------------------------------------
function renderEmpleados(c) {
  const el = document.getElementById("tab-empleados");
  if (!c) {
    el.innerHTML = sinConsorcioHtml();
    return;
  }

  const totalIds = empleadosIds();
  const prog = progresoDe(c.empleados, totalIds);

  const ejesHtml = EMPLEADOS_EJES.map((eje) => {
    const itemsHtml = eje.items.map((texto, idx) => {
      const id = eje.id + "_" + idx;
      const checked = c.empleados[id] && c.empleados[id].estado === "hecho";
      return `<li class="check-line">
        <label>
          <input type="checkbox" class="empleado-check" data-id="${id}" ${checked ? "checked" : ""}>
          <span>${escapeHtml(texto)}</span>
        </label>
      </li>`;
    }).join("");
    return `<section class="card">
      <h3>${escapeHtml(eje.titulo)}</h3>
      <ul class="check-list">${itemsHtml}</ul>
    </section>`;
  }).join("");

  el.innerHTML = `
    <section class="card">
      <h2>Checklist auditable de legajos de empleados — ${escapeHtml(c.nombre)}</h2>
      <p class="muted">Solicitar expresamente al administrador saliente esta documentación del personal (encargados, suplentes) organizada en 4 ejes normativos.</p>
      <div class="progress-bar-wrap">
        <div class="progress-bar"><div class="progress-bar-fill" style="width:${prog.pct}%"></div></div>
        <span>${prog.hechos} / ${prog.total} verificados (${prog.pct}%)</span>
      </div>
    </section>
    ${ejesHtml}
    <section class="card alert-box">
      <strong>Atención — impacto contable y penal</strong>
      <p>Si detectás que el saliente declaró retenciones al personal (Formulario 931) pero no abonó el VEP correspondiente, el Consorcio (empleador directo) responde solidariamente por la deuda previsional. Si el monto supera el umbral del Régimen Penal Tributario (Art. 6° Ley 27.430), puede configurar apropiación indebida de recursos de la seguridad social. Documentá el hallazgo con este checklist para deslindar tu responsabilidad como nueva gestión.</p>
    </section>
  `;

  el.querySelectorAll(".empleado-check").forEach((chk) => {
    chk.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      c.empleados[id] = { estado: e.target.checked ? "hecho" : "pendiente" };
      saveState();
      updateProgressBar(el, c, "empleados");
      updateInicioCardIfVisible();
    });
  });
}

// ---------------------------------------------------------------------------
// TAB: Generador de documentos
// ---------------------------------------------------------------------------
function renderGenerador(c) {
  const el = document.getElementById("tab-generador");
  if (!c) {
    el.innerHTML = sinConsorcioHtml();
    return;
  }

  const opciones = Object.keys(PLANTILLAS)
    .map((key) => `<option value="${key}">${escapeHtml(PLANTILLAS[key].titulo)}</option>`)
    .join("");

  el.innerHTML = `
    <section class="card">
      <h2>Generador de documentos — ${escapeHtml(c.nombre)}</h2>
      <p class="muted">Elegí un modelo: se completa automáticamente con los datos cargados en "Inicio". Podés editar el texto final antes de copiarlo o imprimirlo.</p>
      <label>Modelo de documento
        <select id="selectorPlantilla">${opciones}</select>
      </label>
    </section>
    <section class="card">
      <div class="doc-toolbar">
        <button class="btn-secondary" id="btnCopiar">Copiar al portapapeles</button>
        <button class="btn-secondary" id="btnImprimir">Imprimir / Guardar como PDF</button>
        <button class="btn-secondary" id="btnDescargar">Descargar .txt</button>
      </div>
      <textarea id="documentoGenerado" class="documento-textarea" rows="26"></textarea>
    </section>
  `;

  document.getElementById("selectorPlantilla").addEventListener("change", () => renderPlantillaSeleccionada(c));
  document.getElementById("btnCopiar").addEventListener("click", () => {
    const ta = document.getElementById("documentoGenerado");
    ta.select();
    navigator.clipboard && navigator.clipboard.writeText(ta.value);
    toast("Documento copiado al portapapeles.");
  });
  document.getElementById("btnImprimir").addEventListener("click", () => {
    const texto = document.getElementById("documentoGenerado").value;
    const ventana = window.open("", "_blank");
    ventana.document.write(`<pre style="font-family: Georgia, serif; white-space: pre-wrap; font-size: 14px; line-height:1.5; padding: 40px;">${escapeHtml(texto)}</pre>`);
    ventana.document.close();
    ventana.focus();
    ventana.print();
  });
  document.getElementById("btnDescargar").addEventListener("click", () => {
    const texto = document.getElementById("documentoGenerado").value;
    const sel = document.getElementById("selectorPlantilla").value;
    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${sel}-${(c.nombre || "consorcio").replace(/\s+/g, "_")}.txt`;
    a.click();
  });

  renderPlantillaSeleccionada(c);
}

function renderPlantillaSeleccionada(c) {
  const key = document.getElementById("selectorPlantilla").value;
  const plantilla = PLANTILLAS[key];
  const bancos = Array.isArray(c.bancos) && c.bancos.length ? c.bancos : [{ etiqueta: "Cuenta titular", nombre: "", cuenta: "", cbu: "", alias: "" }];
  const bancoPrincipal = bancos[0];
  const cuentasBancariasTexto = bancos
    .map((b) => {
      const etiqueta = b.etiqueta ? `${b.etiqueta} — ` : "";
      return `- ${etiqueta}Banco: ${b.nombre || "[banco]"} · Cuenta N.º: ${b.cuenta || "[cuenta]"} · CBU: ${b.cbu || "[cbu]"} · Alias: ${b.alias || "[alias]"}`;
    })
    .join("\n");

  const datos = {
    consorcioNombre: c.nombre,
    consorcioDireccion: c.direccion,
    consorcioCUIT: c.cuit,
    administradorNombre: c.administrador.nombre,
    administradorDNI: c.administrador.dni,
    administradorCUIT: c.administrador.cuit,
    matriculaRPA: c.administrador.matriculaRPA,
    administradorDomicilio: c.administrador.domicilio,
    administradorEmail: c.administrador.email,
    administradorTelefono: c.administrador.telefono,
    bancoNombre: bancoPrincipal.nombre,
    bancoCuenta: bancoPrincipal.cuenta,
    bancoCBU: bancoPrincipal.cbu,
    bancoAlias: bancoPrincipal.alias,
    cuentasBancariasTexto,
    fechaAsamblea: c.fechaAsamblea ? new Date(c.fechaAsamblea + "T00:00:00").toLocaleDateString("es-AR") : "[fecha de asamblea]",
    fechaHoy: fechaHoyStr(),
    salienteNombre: c.saliente.nombre,
    salienteDNI: c.saliente.dni,
    salienteMatricula: c.saliente.matricula,
    salienteDomicilio: c.saliente.domicilio,
    salienteEmail: c.saliente.email,
    salienteTelefono: c.saliente.telefono,
    horarioAtencion: c.horarioAtencion,
    fechaTomaPosesion: c.fechaTomaPosesion ? new Date(c.fechaTomaPosesion + "T00:00:00").toLocaleDateString("es-AR") : "[fecha de toma de posesión]"
  };

  let texto = plantilla.cuerpo;
  Object.keys(datos).forEach((k) => {
    const valor = datos[k] && String(datos[k]).trim() ? datos[k] : `[${k}]`;
    texto = texto.split(`{{${k}}}`).join(valor);
  });

  document.getElementById("documentoGenerado").value = texto;
}

// ---------------------------------------------------------------------------
// Helpers de UI
// ---------------------------------------------------------------------------
function sinConsorcioHtml() {
  return `<section class="card"><p>Primero creá o seleccioná un consorcio en la pestaña "Inicio".</p></section>`;
}

function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => t.classList.remove("show"), 2200);
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
function init() {
  loadState();

  if (window.DriveSync) window.DriveSync.init();

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => cambiarTab(btn.dataset.tab));
  });

  document.getElementById("selectorConsorcio").addEventListener("change", (e) => {
    state.actualId = e.target.value;
    saveState();
    renderAll();
  });

  document.getElementById("btnNuevoConsorcio").addEventListener("click", () => {
    state.actualId = null;
    cambiarTab("tab-inicio");
  });

  renderAll();
}

// El arranque real de la app lo dispara auth-gate.js una vez que se
// desbloquea la pantalla de acceso (o de entrada, si ya estaba desbloqueada
// en este dispositivo). Se expone init() para que auth-gate.js la invoque.
window.AppInit = init;
