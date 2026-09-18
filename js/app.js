/* ==========================================================================
   APP.JS — Lógica de la aplicación
   ========================================================================== */

const STORAGE_KEY = "tp_consorcios_v1";
const CURRENT_KEY = "tp_consorcio_actual_v1";

let state = {
  consorcios: [],
  actualId: null
};

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
  state.actualId = localStorage.getItem(CURRENT_KEY) || (state.consorcios[0] && state.consorcios[0].id) || null;
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
    matriculaRPA: datos.matriculaRPA || "",
    administrador: {
      nombre: datos.administradorNombre || "",
      cuit: datos.administradorCUIT || "",
      domicilio: datos.administradorDomicilio || "",
      email: datos.administradorEmail || "",
      telefono: datos.administradorTelefono || ""
    },
    banco: { nombre: "", cuenta: "", cbu: "", alias: "" },
    fechaAsamblea: "",
    diaVencimiento: "10",
    horarioAtencion: "10:00 a 16:00 hs",
    saliente: { nombre: "", domicilio: "", fechaNotificacion: "" },
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
      <h2>${c ? "Editar datos del consorcio actual" : "Agregar nuevo consorcio"}</h2>
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
        <label>Matrícula RPA (Ley 941)
          <input type="text" name="matriculaRPA" placeholder="N.º de matrícula" value="${c ? escapeHtml(c.matriculaRPA) : ""}">
        </label>
        <label>Fecha de la asamblea de designación
          <input type="date" name="fechaAsamblea" value="${c ? c.fechaAsamblea : ""}">
        </label>
        <label>Día de vencimiento de expensas
          <input type="text" name="diaVencimiento" placeholder="10" value="${c ? escapeHtml(c.diaVencimiento) : "10"}">
        </label>

        <h3 class="form-subtitle">Datos del administrador</h3>
        <label>Nombre y apellido
          <input type="text" name="administradorNombre" value="${c ? escapeHtml(c.administrador.nombre) : ""}">
        </label>
        <label>CUIT / CUIL
          <input type="text" name="administradorCUIT" value="${c ? escapeHtml(c.administrador.cuit) : ""}">
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

        <h3 class="form-subtitle">Cuenta bancaria oficial del consorcio</h3>
        <label>Banco
          <input type="text" name="bancoNombre" value="${c ? escapeHtml(c.banco.nombre) : ""}">
        </label>
        <label>N.º de cuenta
          <input type="text" name="bancoCuenta" value="${c ? escapeHtml(c.banco.cuenta) : ""}">
        </label>
        <label>CBU
          <input type="text" name="bancoCBU" value="${c ? escapeHtml(c.banco.cbu) : ""}">
        </label>
        <label>Alias
          <input type="text" name="bancoAlias" value="${c ? escapeHtml(c.banco.alias) : ""}">
        </label>

        <h3 class="form-subtitle">Administrador saliente (para el reclamo, si corresponde)</h3>
        <label>Nombre y apellido
          <input type="text" name="salienteNombre" value="${c ? escapeHtml(c.saliente.nombre) : ""}">
        </label>
        <label>Domicilio / oficina
          <input type="text" name="salienteDomicilio" value="${c ? escapeHtml(c.saliente.domicilio) : ""}">
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
  c.matriculaRPA = datos.matriculaRPA;
  c.fechaAsamblea = datos.fechaAsamblea;
  c.diaVencimiento = datos.diaVencimiento;
  c.horarioAtencion = datos.horarioAtencion;
  c.administrador = {
    nombre: datos.administradorNombre,
    cuit: datos.administradorCUIT,
    domicilio: datos.administradorDomicilio,
    email: datos.administradorEmail,
    telefono: datos.administradorTelefono
  };
  c.banco = {
    nombre: datos.bancoNombre,
    cuenta: datos.bancoCuenta,
    cbu: datos.bancoCBU,
    alias: datos.bancoAlias
  };
  c.saliente = {
    nombre: datos.salienteNombre,
    domicilio: datos.salienteDomicilio,
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
function renderAuditoria(c) {
  const el = document.getElementById("tab-auditoria");
  if (!c) {
    el.innerHTML = sinConsorcioHtml();
    return;
  }

  const totalIds = auditoriaIds();
  const prog = progresoDe(c.auditoria, totalIds);

  const modulosHtml = AUDITORIA_MODULOS.map((mod) => {
    const itemsHtml = mod.items.map((item) => {
      const estadoActual = (c.auditoria[item.id] && c.auditoria[item.id].estado) || "pendiente";
      const notas = (c.auditoria[item.id] && c.auditoria[item.id].notas) || "";
      return `
      <details class="checklist-item estado-${estadoActual}" data-id="${item.id}">
        <summary>
          <span class="item-titulo">${escapeHtml(item.titulo)}</span>
          <select class="estado-select" data-id="${item.id}">
            <option value="pendiente" ${estadoActual === "pendiente" ? "selected" : ""}>Pendiente</option>
            <option value="en-curso" ${estadoActual === "en-curso" ? "selected" : ""}>Revisando</option>
            <option value="hecho" ${estadoActual === "hecho" ? "selected" : ""}>Verificado OK</option>
          </select>
        </summary>
        <div class="item-body">
          <h4>Puntos a verificar</h4>
          <ul>${item.verificar.map((v) => `<li>${escapeHtml(v)}</li>`).join("")}</ul>
          ${item.riesgo ? `<h4>Riesgo por incumplimiento</h4><p class="riesgo">${escapeHtml(item.riesgo)}</p>` : ""}
          <label class="notas-label">Notas de relevamiento
            <textarea class="notas-textarea" data-id="${item.id}" rows="2" placeholder="Observaciones, fecha de inspección...">${escapeHtml(notas)}</textarea>
          </label>
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
        <span>${prog.hechos} / ${prog.total} verificados (${prog.pct}%)</span>
      </div>
      <p class="muted small">Página oficial de AGC para ascensores, instalaciones térmicas, IFL y fachadas: <a href="https://instalaciones.agcontrol.gob.ar/" target="_blank" rel="noopener">instalaciones.agcontrol.gob.ar</a></p>
    </section>
    ${modulosHtml}
  `;

  bindChecklistEvents(el, c, "auditoria");
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
  const datos = {
    consorcioNombre: c.nombre,
    consorcioDireccion: c.direccion,
    consorcioCUIT: c.cuit,
    administradorNombre: c.administrador.nombre,
    administradorCUIT: c.administrador.cuit,
    matriculaRPA: c.matriculaRPA,
    administradorDomicilio: c.administrador.domicilio,
    administradorEmail: c.administrador.email,
    administradorTelefono: c.administrador.telefono,
    bancoNombre: c.banco.nombre,
    bancoCuenta: c.banco.cuenta,
    bancoCBU: c.banco.cbu,
    bancoAlias: c.banco.alias,
    fechaAsamblea: c.fechaAsamblea ? new Date(c.fechaAsamblea + "T00:00:00").toLocaleDateString("es-AR") : "[fecha de asamblea]",
    fechaHoy: fechaHoyStr(),
    diaVencimiento: c.diaVencimiento,
    salienteNombre: c.saliente.nombre,
    salienteDomicilio: c.saliente.domicilio,
    horarioAtencion: c.horarioAtencion
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

document.addEventListener("DOMContentLoaded", init);
