/* ==========================================================================
   DATA.JS — Contenido normativo y estructura de checklists
   Toma de Posesión de Consorcios — CABA (Ley 941 / CCyCN / CCT 589/10)
   ========================================================================== */

// ---------------------------------------------------------------------------
// 1. CHECKLIST DE TOMA DE POSESIÓN
// ---------------------------------------------------------------------------
const TOMA_POSESION = [
  {
    id: "asamblea",
    orden: 1,
    organismo: "Asamblea",
    titulo: "Convocatoria y celebración de la Asamblea de designación",
    resumen:
      "Asamblea donde se aprueba la remoción/renuncia del administrador saliente y la designación del entrante, con las mayorías fijadas en el Reglamento de Propiedad Horizontal o, en su defecto, por el CCyC.",
    fundamento: [
      "Art. 2065 CCyC — El administrador es representante legal del consorcio (persona jurídica, art. 2044).",
      "Art. 2066 CCyC — Designación y remoción del administrador por asamblea de propietarios.",
      "Art. 2059 CCyC — Validez de la convocatoria y citación a asamblea."
    ],
    documentos: [
      "Convocatoria formal con orden del día",
      "Constancias de citación a todos los propietarios",
      "Libro de Registro de Propietarios actualizado (para citación válida)"
    ],
    dondeSeHace: "En el edificio o lugar indicado en la convocatoria (o de forma mixta/virtual si el reglamento lo permite).",
    riesgo:
      "Una asamblea mal convocada o sin las mayorías requeridas puede ser impugnada judicialmente, dejando sin efecto la designación y todos los trámites posteriores.",
    tips: "Guardá las constancias de citación (mail, carta documento, cartelera) para blindar la validez de la asamblea ante una eventual impugnación."
  },
  {
    id: "libro-actas",
    orden: 2,
    organismo: "Libro de Actas",
    titulo: "Asentamiento y firma del Acta de Asamblea",
    resumen:
      "Asentar lo actuado en el Libro de Actas de Asambleas, con firma del Presidente y Secretario de la asamblea y los dos copropietarios designados.",
    fundamento: [
      "Art. 2062 CCyC — El acta debe asentarse en el Libro de Actas, firmada por presidente y secretario de la asamblea y dos propietarios."
    ],
    documentos: [
      "Libro de Actas rubricado (verificar rúbrica vigente)",
      "Texto del acta con orden del día, quórum, mayorías y resolución"
    ],
    dondeSeHace: "Libro físico o digital habilitado del consorcio.",
    riesgo:
      "Un acta no asentada o sin las firmas requeridas no acredita la representación legal frente a terceros (bancos, ARCA, AGIP).",
    tips: "Si el libro está en poder del administrador saliente y no lo entrega, este paso se resuelve junto con el reclamo de documentación (ver sección 'Reclamo al administrador saliente')."
  },
  {
    id: "protocolizacion",
    orden: 3,
    organismo: "Escribanía",
    titulo: "Protocolización / certificación notarial del Acta",
    resumen:
      "Para operar ante bancos y organismos, generalmente se exige copia fiel del acta certificada por Escribano Público, acreditando la rúbrica del libro.",
    fundamento: [
      "Comunicaciones \"A\" del BCRA — exigen verificar vigencia de la personería jurídica y facultades de representación antes de operar cuentas."
    ],
    documentos: [
      "Acta de asamblea original asentada en el libro rubricado",
      "Certificación notarial de copia fiel del acta"
    ],
    dondeSeHace: "Escribanía de su confianza.",
    riesgo:
      "Sin certificación notarial, la mayoría de los bancos rechaza el cambio de firmas.",
    tips: "Pedí varias copias certificadas: se usan en el banco, ARCA, AGIP y AGC."
  },
  {
    id: "matricula-rpa",
    orden: 4,
    organismo: "RPA (Ley 941)",
    titulo: "Verificar vigencia de la matrícula propia en el RPA de CABA",
    resumen:
      "El administrador debe contar con certificado de acreditación e inscripción vigente en el Registro Público de Administradores de Consorcios de CABA (Ley 941). Las entidades bancarias y organismos verifican esta condición antes de autorizar la gestión de fondos.",
    fundamento: [
      "Ley 941 CABA (Texto Ordenado Decreto 2.503/79) — Registro Público de Administradores de Consorcios de Propiedad Horizontal.",
      "Art. 15 Ley 941 — Sanciones e inhabilitación de matrícula por incumplimientos."
    ],
    documentos: [
      "Certificado de matrícula vigente (Ley 941)",
      "Constancia de inscripción en ARCA del administrador",
      "Certificado de curso de capacitación (60 hs, cuando corresponda)",
      "Certificado de antecedentes penales (Registro Nacional de Reincidencia)",
      "Certificado de libre deuda alimentaria"
    ],
    dondeSeHace:
      "Trámite online vía plataforma TAD (Trámites a Distancia) del GCBA, con usuario miBA nivel 2/3. Requiere aprobar examen presencial previo (coordinar por registroconsorcios@buenosaires.gob.ar).",
    riesgo:
      "Ejercer la representación o gestión de fondos sin acreditación vigente ante el RPA expone a sanciones administrativas y multas de Defensa al Consumidor / AGC (Art. 15 Ley 941).",
    tips: "Trámite gratuito. Si es la primera matriculación, reservá turno de examen con anticipación: suele ser el paso más largo del circuito."
  },
  {
    id: "banco",
    orden: 5,
    organismo: "Banco",
    titulo: "Alta como administrador de la cuenta bancaria del consorcio",
    resumen:
      "Cambio de firmas y alta de la nueva administración en la entidad bancaria donde opera la cuenta del consorcio.",
    fundamento: [
      "Arts. 2065 y 2067 inc. a) CCyC — El administrador es representante legal del consorcio.",
      "Art. 2062 CCyC — Exige acta asentada en el Libro de Actas.",
      "Comunicaciones \"A\" BCRA — Verificación de personería jurídica, facultades de representación y cumplimiento fiscal (ARCA/AGIP) antes de autorizar firmas."
    ],
    documentos: [
      "Nota formal solicitando baja de firmas del saliente y alta del entrante",
      "Copia legalizada del Acta de Asamblea de designación",
      "Copia del Reglamento de Propiedad Horizontal",
      "Certificado de matrícula/inscripción vigente en el RPA (Ley 941)",
      "Constancia de CUIT del consorcio (ARCA) e inscripción en AGIP",
      "DNI y CUIT/CUIL del nuevo administrador",
      "Registro de firma (presencial o vía plataforma digital del banco)"
    ],
    dondeSeHace: "Sucursal bancaria donde opera la cuenta del consorcio, o banca empresas online según la entidad.",
    riesgo:
      "Si no se formaliza el alta, el banco mantiene las firmas congeladas o da de baja las anteriores, imposibilitando el pago de expensas, sueldos del personal (CCT 589/10) y servicios esenciales. Si el saliente opera la cuenta luego de su remoción, incurre en responsabilidad civil y eventualmente penal (defraudación o retención indebida).",
    tips: "Llevá todo en copias certificadas y pedí por escrito la constancia de recepción del trámite en el banco.",
    jurisprudencia:
      "\"Consorcio de Propietarios Scalabrini Ortiz c/ A., J. M. s/ Remoción de Administrador\" (CNCiv., Sala H): la representación legal del consorcio emana de la asamblea soberana y es válida frente a terceros e instituciones bancarias una vez formalizada conforme al reglamento y asentada en los libros obligatorios."
  },
  {
    id: "arca",
    orden: 6,
    organismo: "ARCA",
    titulo: "Vinculación de Clave Fiscal como Representante Legal (RG 4624/2019)",
    resumen:
      "Solicitar ante ARCA (ex AFIP) la vinculación de la Clave Fiscal personal del administrador como representante legal del consorcio.",
    fundamento: [
      "RG AFIP/ARCA N.º 4624/2019.",
      "Arts. 6° y 13° de la Ley N.º 11.683 (Procedimiento Fiscal)."
    ],
    documentos: [
      "DNI del administrador",
      "Acta de Asamblea de designación",
      "Reglamento de Propiedad Horizontal",
      "Certificado de matrícula vigente ante el RPA (Ley 941)"
    ],
    dondeSeHace:
      "Presentación digital vía \"Presentaciones Digitales\" en el sitio de ARCA, o de forma presencial en la agencia correspondiente al CUIT del consorcio.",
    riesgo:
      "Sin la vinculación, el administrador no puede presentar declaraciones juradas (F.931), generar VEP ni operar el CUIT del consorcio, paralizando pagos de cargas sociales y trámites fiscales.",
    tips: "Podés usar el modelo de nota del Generador de Documentos para adjuntar como presentación digital.",
    generaDocumento: "arca"
  },
  {
    id: "agip",
    orden: 7,
    organismo: "AGIP",
    titulo: "Alta de representación legal y cambio de autoridades",
    resumen:
      "Formalizar ante la Dirección General de Rentas de CABA (AGIP) la actualización de la representación legal e informar la vinculación de la Clave Ciudad Nivel 2/3.",
    fundamento: [
      "Art. 2065 CCyC.",
      "Código Fiscal de la CABA.",
      "Ordenanza AGIP N.º 40.225/85 — Llevanza de libros de Caja/Banco, balances y arqueos."
    ],
    documentos: [
      "DNI del administrador",
      "Acta de Asamblea de designación (certificada/cotejada)",
      "Reglamento de Propiedad Horizontal",
      "Certificado del RPA CABA (Ley 941)",
      "Comprobante de servicio público a nombre del consorcio en el domicilio fiscal"
    ],
    dondeSeHace: "AGIP — Clave Ciudad / Dirección General de Rentas CABA (trámite digital, con eventual ratificación presencial).",
    riesgo:
      "Sin la Clave Ciudad vinculada, no se pueden gestionar obligaciones tributarias locales (Ingresos Brutos si correspondiera, ABL del consorcio, etc.) ni informar cambios de autoridades.",
    tips: "Coordiná este trámite junto con el de ARCA: comparten buena parte de la documentación de respaldo.",
    generaDocumento: "agip"
  },
  {
    id: "agc",
    orden: 8,
    organismo: "AGC",
    titulo: "Vinculación en el Registro de Instalaciones (AGC)",
    resumen:
      "Inscribirse como administrador/responsable del inmueble en el sistema de Registro de Instalaciones de la Agencia Gubernamental de Control, que centraliza ascensores, instalaciones fijas contra incendio (IFCI), fachadas y artefactos térmicos.",
    fundamento: [
      "Ordenanza N.º 51.598 — Ascensores y montacargas.",
      "Ordenanza N.º 52.288 y Ley N.º 1.294 — Instalaciones fijas contra incendio y matafuegos.",
      "Ley CABA N.º 6.116 (ex Ley 257) — Conservación de fachadas.",
      "Reglamento AEA 90364 — Instalaciones eléctricas y puesta a tierra."
    ],
    documentos: [
      "DNI y matrícula RPA del administrador",
      "Acta de designación",
      "Datos catastrales del inmueble"
    ],
    dondeSeHace: "Portal instalaciones.agcontrol.gob.ar — inscripción online como propietario/administrador/responsable del inmueble.",
    riesgo:
      "Clausura preventiva de ascensores/calderas, multas severas y rechazo de cobertura de seguros por falta de registro o vencimiento de obleas (matafuegos, ascensores).",
    tips: "Una vez inscripto, deberás contratar profesionales matriculados para cada instalación (ascensorista, gasista, idóneo en incendio) que cargarán los reportes técnicos periódicos."
  },
  {
    id: "art",
    orden: 9,
    organismo: "ART",
    titulo: "Alta / continuidad como empleador ante la ART",
    resumen:
      "Verificar y actualizar los datos del empleador (consorcio) ante la Aseguradora de Riesgos del Trabajo, asegurando cobertura vigente del personal (encargados, suplentes, terceros que corresponda).",
    fundamento: [
      "Ley N.º 24.557 de Riesgos del Trabajo.",
      "CCT 589/10 (FATERyH) — Elementos de Protección Personal y exámenes médicos."
    ],
    documentos: [
      "Contrato y certificado de cobertura de ART vigente",
      "Nómina de trabajadores cubiertos",
      "Constancia de \"sin deuda\" emitida por la aseguradora",
      "Constancias de exámenes preocupacionales y periódicos"
    ],
    dondeSeHace: "Ante la compañía aseguradora contratada (verificar/actualizar datos del representante legal del empleador).",
    riesgo:
      "Falta de cobertura vigente o de datos actualizados del representante legal expone al consorcio a responsabilidad directa ante un accidente laboral del personal de edificio.",
    tips: "Pedile al saliente el certificado de cobertura y el comprobante de \"libre deuda\" como parte del reclamo de documentación."
  },
  {
    id: "suterh",
    orden: 10,
    organismo: "SUTERH / FATERyH",
    titulo: "Actualización de datos del empleador ante SUTERH / FATERyH",
    resumen:
      "Informar el cambio de administración al sindicato (SUTERH) y a la Federación (FATERyH) para mantener regularizados los aportes sindicales, la obra social (OSPERYH) y el fondo SERACARH del personal del edificio.",
    fundamento: [
      "CCT 589/10 (FATERyH) — Encuadramiento convencional del personal de edificios.",
      "Ley de Contrato de Trabajo N.º 20.744."
    ],
    documentos: [
      "Copia del Reglamento de Copropiedad",
      "Constancia de alta del consorcio ante ARCA (CUIT)",
      "Datos del nuevo administrador (DNI, matrícula RPA)"
    ],
    dondeSeHace: "Delegación de SUTERH que corresponda a la zona del edificio (sede central: Sarmiento 2040, CABA), o trámite digital si está disponible.",
    riesgo:
      "Aportes sindicales u obra social no regularizados pueden derivar en reclamos laborales o falta de cobertura de OSPERYH para el personal.",
    tips: "Aprovechá este contacto para consultar la categoría, adicionales y escala salarial vigente del encargado, y así cotejarlos con los recibos que entregue el saliente."
  },
  {
    id: "circular",
    orden: 11,
    organismo: "Propietarios",
    titulo: "Circular institucional de presentación e inicio de gestión",
    resumen:
      "Notificar formalmente a todos los propietarios y residentes el cambio de administración, los datos de contacto, la matrícula RPA y — muy importante — los datos bancarios oficiales para el pago de expensas.",
    fundamento: [
      "Art. 9° inc. f) Ley 941 CABA — Los fondos deben canalizarse exclusivamente a través de la cuenta bancaria del consorcio.",
      "Art. 2067 inc. i) CCyC — Actualización del Libro Registro de Propietarios."
    ],
    documentos: [
      "Circular con datos de la administración y matrícula",
      "Datos de la cuenta bancaria oficial (Banco, CBU, Alias, titular)",
      "Ficha de reempadronamiento de propietarios/residentes"
    ],
    dondeSeHace: "Envío por correo electrónico a la nómina de propietarios y fijación en la cartelera del edificio.",
    riesgo:
      "Si no se notifica formalmente la CBU del consorcio, un pago realizado por error a una cuenta ajena (por ejemplo del administrador saliente) puede no considerarse cancelatorio de la deuda de expensas.",
    tips: "Este paso conviene hacerlo apenas estén confirmados los datos bancarios (paso 'Banco'), para evitar pagos a cuentas incorrectas.",
    generaDocumento: "circular"
  }
];

// ---------------------------------------------------------------------------
// 2. RECLAMO AL ADMINISTRADOR SALIENTE — Guía de acción en 4 etapas
// ---------------------------------------------------------------------------
const RECLAMO_ETAPAS = [
  {
    id: "etapa1",
    numero: 1,
    titulo: "Verificación de plazos e interpelación inicial",
    plazo: "10 días hábiles",
    descripcion:
      "Contabilizar los 10 días hábiles administrativos desde que el administrador saliente fue notificado fehacientemente de su remoción o renuncia (copia del Acta de Asamblea o Carta Documento). Durante este plazo conviene enviar una comunicación formal de cortesía indicando lugar, fecha y hora para realizar el Acta de Traspaso.",
    fundamento: ["Art. 2067 inc. j) CCyC", "Art. 12 Ley 941 CABA"]
  },
  {
    id: "etapa2",
    numero: 2,
    titulo: "Intimación formal por Carta Documento",
    plazo: "48 a 72 horas (perentorio)",
    descripcion:
      "Vencido el plazo de 10 días hábiles sin entrega de inventario, libros y documentación contable/bancaria, se intima formalmente por Carta Documento con plazo perentorio de 48 a 72 horas. Debe citar expresamente el Art. 2067 inc. j) CCyC y el Art. 12 de la Ley 941, detallar individualmente los elementos retenidos, y advertir el inicio de acciones judiciales y la denuncia administrativa ante el RPA.",
    fundamento: ["Art. 2067 inc. j) CCyC", "Art. 12 Ley 941 CABA", "Art. 173 inc. 2° Código Penal (retención indebida)"],
    generaDocumento: "carta-documento"
  },
  {
    id: "etapa3",
    numero: 3,
    titulo: "Denuncia administrativa ante el RPA (CABA)",
    plazo: "Ante persistencia del incumplimiento",
    descripcion:
      "Se inicia una presentación formal ante Defensa del Consumidor / RPA de CABA por infracción al Art. 12 de la Ley 941. El RPA cita a audiencia de conciliación y, de no mediar entrega, aplica sanciones pecuniarias e inhabilitación de la matrícula del administrador saliente.",
    fundamento: ["Art. 15 Ley 941 CABA"]
  },
  {
    id: "etapa4",
    numero: 4,
    titulo: "Vía judicial: medida cautelar y rendición de cuentas",
    plazo: "Con patrocinio letrado",
    descripcion:
      "Se inician simultáneamente dos acciones en el fuero Civil: (1) Medida Cautelar Autónoma de Secuestro de Libros y Documentación (Art. 209 CPCCN), que permite a un oficial de justicia, con auxilio de la fuerza pública, incautar los libros y carpetas contables; y (2) Juicio por Rendición de Cuentas (Art. 652 CPCCN / Arts. 858 y ss. CCyC), exigiendo la presentación documentada de ingresos y egresos del período administrado.",
    fundamento: ["Art. 209 CPCCN", "Art. 652 CPCCN", "Arts. 858 a 864 CCyC"]
  }
];

const DOCUMENTACION_A_RECLAMAR = [
  "Libros Obligatorios Rubricados: Actas de Asamblea, Administración, Registro de Propietarios, Registro/Control de Firmas y Libro Ley de Sueldos y Jornadas (Art. 52 LCT)",
  "Comprobantes de ingresos/egresos y facturas",
  "Extractos bancarios y conciliaciones bancarias",
  "Claves de acceso a banca electrónica",
  "Constancias de Clave Fiscal (ARCA) y Clave Ciudad (AGIP)",
  "Formularios F.931 de ARCA (declaraciones juradas y tickets de pago de cargas sociales)",
  "Legajos de personal (LCT y CCT 589/10)",
  "Pólizas de ART y comprobantes de aportes sindicales (OSPERYH / FATERyH / SERACARH)",
  "Saldo de caja chica y saldos no invertidos",
  "Póliza de Seguro Integral de Consorcio vigente",
  "Libro de Inspección de Ascensores (registro digital AGC)",
  "Certificados de limpieza de tanques de agua",
  "Certificado de conservación de fachada (Ley 6.116)",
  "Inventario de bienes muebles del edificio"
];

// ---------------------------------------------------------------------------
// 3. AUDITORÍA TÉCNICA E INSTITUCIONAL DE INICIO
// ---------------------------------------------------------------------------
const AUDITORIA_MODULOS = [
  {
    id: "modulo1",
    titulo: "Módulo I — Seguridad técnica e instalaciones",
    subtitulo: "Exigencias de AGC, MetroGAS, ENARGAS y AEA (inspección visual)",
    items: [
      {
        id: "ascensores",
        titulo: "Ascensores y montacargas (Ordenanza 51.598 / AGC)",
        verificar: [
          "Oblea con código QR vigente",
          "Funciona la luz de emergencia y el timbre de alarma dentro de la cabina",
          "Ausencia de ruidos anómalos o desniveles al parar en piso",
          "Libro de Inspección con firma mensual de la empresa de mantenimiento",
          "Cableado, freno de seguridad, paracaídas y limitador de velocidad en buen estado",
          "Puertas: patines retráctiles, trabas y sensores de presencia operativos",
          "Cartelería de carga máxima permitida visible"
        ],
        riesgo: "Clausura preventiva del equipo por la AGC, multas severas y responsabilidad penal subsidiaria del consorcio por accidentes a terceros."
      },
      {
        id: "gas",
        titulo: "Instalación de gas y calderas centrales (ENARGAS / MetroGAS)",
        verificar: [
          "Nicho de medidores con rejillas de ventilación despejadas y sin candados restrictivos",
          "Cartelería de seguridad en sala de calderas",
          "Contrato de mantenimiento vigente con gasista/calderista matriculado",
          "Estado de quemadores, bombas de recirculación y conductos de evacuación"
        ],
        riesgo: "Corte intempestivo del suministro de gas por denuncia/inspección de MetroGAS, con plazos de reconexión que pueden superar los 6 u 8 meses."
      },
      {
        id: "incendio",
        titulo: "Protección contra incendio e IFL (Ordenanza 52.288 / Ley 1.294)",
        verificar: [
          "Gabinetes de mangueras e hidrantes en buen estado, con prueba de hermeticidad/presión",
          "Matafuegos con oblea digital AGC vigente y carga anual al día, manómetro en rango verde",
          "Luces de emergencia operativas en rutas de evacuación/escaleras",
          "Puertas cortafuego con cierre automático funcionando y libres de obstáculos",
          "Señalética de vías de evacuación visible"
        ],
        riesgo: "Inoponibilidad del seguro en caso de siniestro (rechazo de cobertura) e imputación penal del consorcio."
      },
      {
        id: "electrica",
        titulo: "Tableros eléctricos y puesta a tierra (AEA 90364)",
        verificar: [
          "Tablero general con protecciones termomagnéticas y disyuntores diferenciales probados",
          "Medición anual del protocolo de Puesta a Tierra (PAT) con telurímetro",
          "Ausencia de cables expuestos o empalmes fuera de cajas de paso"
        ],
        riesgo: "Riesgo de electrocución, incendios por cortocircuito y apercibimiento de la AGC."
      }
    ]
  },
  {
    id: "modulo2",
    titulo: "Módulo II — Edificabilidad, fachadas y salubridad",
    subtitulo: "Código de Edificación de CABA y leyes ambientales",
    items: [
      {
        id: "fachadas",
        titulo: "Conservación de fachadas y balcones (Ley CABA N.º 6.116, ex Ley 257)",
        verificar: [
          "Grietas, desprendimientos de mampostería o revestimientos en frente/contrafrente/balcones",
          "Certificado de Conservación vigente registrado ante la AGC",
          "Mantenimiento de barandas, maceteros, marquesinas y soportes de aire acondicionado"
        ],
        riesgo: "Demandas civiles por daños a peatones o vehículos por caída de mampostería; multas e intimaciones judiciales de la Ciudad."
      },
      {
        id: "tanques",
        titulo: "Limpieza de tanques y potabilidad de agua (Ley 3.873/11 y Ley 5.665/16)",
        verificar: [
          "Fecha de última limpieza de tanques de agua potable",
          "Análisis bacteriológico vigente (anual)",
          "Análisis físico-químico vigente (trienal)",
          "Tapas de tanques selladas herméticamente",
          "Integridad estructural de tanque subterráneo y elevado"
        ],
        riesgo: "Infracciones sanitarias, riesgo de intoxicación o enfermedades hídricas en la población del edificio."
      },
      {
        id: "residuos",
        titulo: "Gestión de residuos (Ley 1.854 \"Basura Cero\")",
        verificar: ["Recipientes diferenciados (húmedos/reciclables) para separación en origen"],
        riesgo: "Multas impuestas por el Ministerio de Espacio Público e Higiene Urbana."
      }
    ]
  },
  {
    id: "modulo3",
    titulo: "Módulo III — Matriz de libros y documentación legal",
    subtitulo: "Para auditar al momento del traspaso — Arts. 2065/2067 CCyC y Ley 941",
    items: [
      {
        id: "libro-actas-aud",
        titulo: "Libro de Actas de Asamblea",
        verificar: ["Transcripción de la asamblea de designación", "Estado de rubricación"]
      },
      {
        id: "libro-administracion",
        titulo: "Libro de Administración / Registro de Propietarios",
        verificar: ["Actualización de datos de contacto", "Porcentuales de expensas correctos"]
      },
      {
        id: "libro-ordenes",
        titulo: "Libro de Órdenes del Personal",
        verificar: ["Requisito obligatorio del CCT 589/10 para impartir instrucciones al encargado"]
      },
      {
        id: "libro-sueldos",
        titulo: "Libro de Sueldos y Jornales (Ley 20.744 / ARCA)",
        verificar: ["Habilitación del libro de sueldos digital / hojas móviles", "Actualizado al día"]
      },
      {
        id: "libros-tecnicos",
        titulo: "Libros técnicos obligatorios",
        verificar: [
          "Libro de Inspección de Ascensores (registro virtual en la web de la AGC)",
          "Libro de Mantenimiento de Instalaciones Fijas contra Incendio (registro virtual AGC)",
          "Registro de limpieza y desinfección de tanques de agua"
        ]
      }
    ]
  },
  {
    id: "modulo4",
    titulo: "Módulo IV — Estado situacional contable, fiscal y laboral",
    subtitulo: "Cuestionario para el copropietario/consejo durante la reunión de traspaso",
    items: [
      {
        id: "situacion-bancaria",
        titulo: "Situación bancaria",
        verificar: ["Expensas recaudadas en cuenta bancaria a nombre del consorcio (prohibido usar cuentas personales del administrador)"]
      },
      {
        id: "situacion-fiscal",
        titulo: "Obligaciones previsionales y fiscales (ARCA)",
        verificar: ["CUIT del consorcio activo", "Cargas sociales F.931 del personal al día"]
      },
      {
        id: "situacion-laboral",
        titulo: "Régimen laboral (CCT 589/10 / FATERyH / SUTERH)",
        verificar: ["Vestimenta y EPP vigentes entregados al personal", "Valor de vivienda (si aplica) declarado en el recibo de sueldo"]
      },
      {
        id: "seguros",
        titulo: "Pólizas de seguro",
        verificar: ["Póliza Integral de Consorcio (incendio + responsabilidad civil) vigente y pagada al día"]
      }
    ]
  }
];

// ---------------------------------------------------------------------------
// 4. CHECKLIST AUDITABLE DE LEGAJOS DE EMPLEADOS
// ---------------------------------------------------------------------------
const EMPLEADOS_EJES = [
  {
    id: "eje1",
    titulo: "1. Documentación de legajos generales y registro (LCT y CCT 589/10)",
    items: [
      "Alta Temprana de ARCA (F. 885/A): acreditación de inscripción de cada trabajador de la nómina",
      "Libro Ley de Sueldos y Jornadas (Art. 52 LCT): rubricado por la Subsecretaría de Trabajo de CABA (o Libro de Sueldos Digital de ARCA), al día",
      "Exámenes médicos preocupacionales y periódicos (Ley de Riesgos del Trabajo)",
      "Constancias de entrega de ropa de trabajo y EPP (Art. 14 CCT 589/10: 2 uniformes al año y calzado adecuado)"
    ]
  },
  {
    id: "eje2",
    titulo: "2. Recibos de sueldo y encuadramiento convencional",
    items: [
      "Recibos de haberes de los últimos 24 meses, firmados o con comprobante de transferencia a cuenta sueldo (Art. 124 LCT)",
      "Categoría del trabajador correctamente aplicada: encargado permanente (con o sin vivienda), jornalizado o suplente",
      "Adicionales específicos: antigüedad (1% o 2%), limpieza de mando/colectiva, retiro de residuos, mantenimiento de jardín, manejo de calderas, clasificación de residuos",
      "Valor hora y horas extraordinarias: cotejo de planillas de ingreso/egreso con cálculo al 50% y 100%"
    ]
  },
  {
    id: "eje3",
    titulo: "3. Sistema previsional y obligaciones fiscales (F.931)",
    items: [
      "Declaración Jurada de Cargas Sociales (F.931 – ARCA) de los últimos 24 a 60 meses",
      "Ticket de pago de cargas sociales y VEPs (SIPA, INSSJP, Obra Social OSPERYH)",
      "Constancia de deuda previsional (sistema \"Mis Facilidades\" / \"Cuentas Tributarias\") para verificar planes de pago o ejecuciones fiscales en curso"
    ]
  },
  {
    id: "eje4",
    titulo: "4. Cobertura de riesgos, seguros y aportes sindicales",
    items: [
      "Contrato y certificado de cobertura de ART vigente, con nómina y constancia de \"sin deuda\"",
      "Seguro de Vida Obligatorio (Decreto 1567/74) y póliza específica del CCT 589/10",
      "Boletas de aporte sindical, contribución solidaria y aporte al Fondo de Maternidad, Vida y Desempleo (FATERyH) y SERACARH"
    ]
  }
];

// ---------------------------------------------------------------------------
// 5. PLANTILLAS DE DOCUMENTOS (Generador)
// ---------------------------------------------------------------------------
// Placeholders disponibles: {{consorcioNombre}}, {{consorcioDireccion}}, {{consorcioCUIT}},
// {{administradorNombre}}, {{administradorCUIT}}, {{matriculaRPA}}, {{administradorDomicilio}},
// {{administradorEmail}}, {{administradorTelefono}}, {{bancoNombre}}, {{bancoCuenta}},
// {{bancoCBU}}, {{bancoAlias}}, {{fechaAsamblea}}, {{fechaHoy}}, {{diaVencimiento}},
// {{salienteNombre}}, {{salienteDomicilio}}, {{horarioAtencion}}

const PLANTILLAS = {
  arca: {
    titulo: "Presentación ante ARCA — Vinculación de Clave Fiscal",
    cuerpo: `Ciudad Autónoma de Buenos Aires, {{fechaHoy}}

A la Agencia de Recaudación y Control Aduanero (ARCA)
Asunto: Solicitud de vinculación de Clave Fiscal como Representante Legal / Administrador (RG 4624/2019)

CUIT del Consorcio: {{consorcioCUIT}}
Denominación: {{consorcioNombre}}

De mi mayor consideración:

Me dirijo a Uds. en mi carácter de Administrador y Representante Legal del {{consorcioNombre}}, CUIT N.º {{consorcioCUIT}}, a fin de solicitar formalmente la vinculación de mi Clave Fiscal personal como Representante Legal del mencionado ente de la propiedad horizontal, en los términos de la Resolución General AFIP N.º 4624/2019 y los Arts. 6° y 13° de la Ley N.º 11.683.

A tal efecto, declaro bajo juramento los siguientes datos personales:

- Nombre y Apellido: {{administradorNombre}}
- CUIT / CUIL: {{administradorCUIT}}
- Matrícula RPA (CABA): {{matriculaRPA}}
- Domicilio Fiscal Personal: {{administradorDomicilio}}, CABA

Para dar cumplimiento con la normativa vigente y acreditar personería, adjunto digitalmente en formato PDF legible la siguiente documentación:

1. Copia del Documento Nacional de Identidad (DNI) del suscripto.
2. Copia del Acta de Asamblea de Propietarios de fecha {{fechaAsamblea}} en la que se aprueba mi designación como Administrador.
3. Copia del Reglamento de Propiedad Horizontal.
4. Certificado de acreditación de Matrícula vigente ante el Registro Público de Administradores de Consorcios de CABA (Ley 941).

Sin otro particular, solicito se dé curso a la presente vinculación en el sistema registral.

Atentamente,

{{administradorNombre}}
Administrador del Consorcio
CUIT: {{administradorCUIT}}`
  },
  agip: {
    titulo: "Presentación ante AGIP — Alta de representación legal",
    cuerpo: `Ciudad Autónoma de Buenos Aires, {{fechaHoy}}

A la Dirección General de Rentas de la CABA (AGIP)
Asunto: Alta de Representación Legal y Cambio de Autoridades del Consorcio de Propietarios

CUIT del Consorcio: {{consorcioCUIT}}
Domicilio Fiscal del Consorcio: {{consorcioDireccion}}, CABA

De mi mayor consideración:

Por la presente, me dirijo a la Dirección General de Rentas de la CABA en mi carácter de Administrador del {{consorcioNombre}} (CUIT {{consorcioCUIT}}), legitimado en virtud del Art. 2065 del Código Civil y Comercial de la Nación y del Código Fiscal de la CABA.

El objeto de la presente es formalizar la actualización de la representación legal del consorcio e informar la vinculación de la Clave Ciudad Nivel 2/3 para la gestión de las obligaciones tributarias y de información que corresponden a la entidad administrada.

Informo mis datos filiatorios a tal fin:

- Administrador: {{administradorNombre}}
- CUIT: {{administradorCUIT}}
- Matrícula RPA CABA N.º: {{matriculaRPA}}
- Correo Electrónico de Contacto: {{administradorEmail}}

Acompaño a la presente la siguiente documentación respaldatoria:

1. Copia de DNI del Administrador.
2. Copia del Acta de Asamblea de Designación debidamente certificada / cotejada.
3. Copia del Reglamento de Propiedad Horizontal.
4. Certificado del RPA CABA según Ley 941.
5. Comprobante de servicio público a nombre del Consorcio en el domicilio fiscal declarado.

Quedo a disposición para la ratificación presencial o digital que el organismo requiera.

Saluda atentamente,

{{administradorNombre}}
Administrador del Consorcio
CUIT: {{administradorCUIT}}`
  },
  banco: {
    titulo: "Nota al Banco — Alta como administrador de la cuenta",
    cuerpo: `Ciudad Autónoma de Buenos Aires, {{fechaHoy}}

Al Sr./Sra. Gerente/a de la sucursal
Asunto: Solicitud de baja de firmas del administrador saliente y alta del nuevo administrador

De mi mayor consideración:

Me dirijo a Uds. en mi carácter de Administrador y Representante Legal del {{consorcioNombre}}, CUIT N.º {{consorcioCUIT}}, titular de la cuenta N.º {{bancoCuenta}} (CBU {{bancoCBU}}) en esa entidad, a fin de solicitar formalmente:

1. La baja de las firmas autorizadas del administrador saliente.
2. El alta de mi firma como nuevo Administrador y único autorizado para operar la cuenta.

Adjunto la siguiente documentación:

- Copia legalizada del Acta de Asamblea de designación de fecha {{fechaAsamblea}}.
- Copia del Reglamento de Propiedad Horizontal.
- Certificado de Matrícula/Inscripción vigente en el RPA de CABA (Ley 941) N.º {{matriculaRPA}}.
- Constancia de CUIT del Consorcio (ARCA) e inscripción en AGIP.
- DNI y CUIT/CUIL del nuevo administrador ({{administradorNombre}}, {{administradorCUIT}}).

Quedo a disposición para completar el registro de firma presencial o digital que la entidad requiera.

Atentamente,

{{administradorNombre}}
Administrador del Consorcio
CUIT: {{administradorCUIT}}`
  },
  circular: {
    titulo: "Circular Institucional — Presentación e inicio de gestión",
    cuerpo: `CIRCULAR N.º 01 — PRESENTACIÓN E INICIO DE GESTIÓN

{{consorcioNombre}}
CUIT N.º: {{consorcioCUIT}}

A los Sres. Propietarios y Residentes del Consorcio:

Ciudad Autónoma de Buenos Aires, {{fechaHoy}}

De nuestra mayor consideración:

Nos dirigimos a Uds. con el propósito de notificarles formalmente que, en virtud de la decisión adoptada por la Asamblea de Propietarios de fecha {{fechaAsamblea}}, {{administradorNombre}} ha asumido la Administración y Representación Legal del {{consorcioNombre}}.

A fin de garantizar una transición ordenada, transparente y ajustada a la legislación vigente (Código Civil y Comercial de la Nación y Ley N.º 941 de la CABA), ponemos a su disposición los datos institucionales, operativos y bancarios que regirán a partir de la fecha:

1. Datos de la Administración y Matrícula

- Administrador: {{administradorNombre}}
- Matrícula RPA (CABA): N.º {{matriculaRPA}}
- CUIT del Administrador: {{administradorCUIT}}
- Domicilio Legal / Atención: {{administradorDomicilio}}, CABA
- Teléfono de Contacto / Urgencias: {{administradorTelefono}}
- Correo Electrónico Oficial: {{administradorEmail}}
- Horario de Atención: {{horarioAtencion}}

2. Datos de la Cuenta Bancaria Oficial para Pago de Expensas

De acuerdo con lo establecido por el Art. 9° inc. f) de la Ley N.º 941 de la CABA, se recuerda que los fondos del consorcio deben canalizarse de manera exclusiva a través de la cuenta bancaria titularidad del ente:

- Banco: {{bancoNombre}}
- Tipo y N.º de Cuenta: {{bancoCuenta}}
- Titular: {{consorcioNombre}}
- CUIT del Consorcio: {{consorcioCUIT}}
- CBU N.º: {{bancoCBU}}
- Alias CBU: {{bancoAlias}}

3. Modalidad de Pago y Envío de Comprobantes

- Plazo de Vencimiento: las expensas vencerán el día {{diaVencimiento}} de cada mes.
- Aviso de Pago: una vez realizada la transferencia o depósito bancario, es requisito indispensable remitir el comprobante correspondiente vía correo electrónico a {{administradorEmail}}, indicando Piso, Departamento y Unidad Funcional (UF).
- Importante: queda terminantemente prohibido el cobro de expensas en efectivo o mediante depósitos en cuentas de terceros o de la administración a título personal.

4. Reempadronamiento de Propietarios y Residentes

A los fines de actualizar el Libro Registro de Propietarios (Art. 2067 inc. i CCyC) solicitamos a los Sres. Propietarios completar la ficha de datos y remitirla dentro de los próximos diez (10) días corridos con: nombre completo del titular / CUIT o DNI, correo electrónico constituido para notificaciones fehacientes y teléfono de contacto.

Agradeciendo de antemano la colaboración de todos los integrantes del consorcio para esta nueva etapa, los saludamos con nuestra consideración más distinguida.

Saluda atentamente,

{{administradorNombre}}
Administrador del Consorcio
Matrícula RPA CABA N.º {{matriculaRPA}}`
  },
  "carta-documento": {
    titulo: "Carta Documento de Intimación Fehaciente al Administrador Saliente",
    cuerpo: `CABA, {{fechaHoy}}

REMITENTE: {{consorcioNombre}}, CABA (Representado por el Administrador {{administradorNombre}}, CUIT {{administradorCUIT}})
DESTINATARIO: {{salienteNombre}}
DOMICILIO DESTINATARIO: {{salienteDomicilio}}, CABA

En mi carácter de Administrador y Representante Legal del {{consorcioNombre}}, CUIT N.º {{consorcioCUIT}}, personería que me fuera otorgada mediante Acta de Asamblea de Propietarios de fecha {{fechaAsamblea}}, la cual le fuera notificada oportunamente, me dirijo a Ud. a fin de INTIMARLO FORMALMENTE Y POR ÚLTIMA VEZ para que en el plazo PERENTORIO E IMPRORROGABLE DE CUARENTA Y OCHO (48) HORAS HÁBILES contadas a partir de la recepción de la presente, proceda a hacer entrega efectiva e íntegra a esta Administración de la totalidad de los Libros Obligatorios, documentación contable, laboral, fiscal, legal y saldos de fondos pertenecientes al Consorcio que se encuentran en su poder.

Se le recuerda que ha vencido en exceso el plazo legal de diez (10) días hábiles dispuesto por el Art. 2067 inc. j) del Código Civil y Comercial de la Nación y el Art. 12 de la Ley N.º 941 de la Ciudad Autónoma de Buenos Aires, habiéndose constituido en pleno derecho de mora.

DETALLE DE LA DOCUMENTACIÓN EXIGIDA:

1. Libros Obligatorios Rubricados: Libro de Actas de Asamblea, Libro de Administración, Libro Registro de Propietarios, Libro de Control de Firmas y Libro Ley de Sueldos y Jornadas (Art. 52 LCT).
2. Documentación Contable y Bancaria: comprobantes, facturas de egresos e ingresos, extractos de la cuenta bancaria del Consorcio, conciliaciones bancarias, constancias de Clave Fiscal y Clave Ciudad, arqueo de caja chica y saldos no invertidos.
3. Documentación Laboral y Previsional: legajos completos del personal dependiente del CCT 589/10 (SUTERH), Altas Tempranas de ARCA, Formularios 931 (declaraciones juradas y tickets de pago de cargas sociales), pólizas de ART y comprobantes de aportes sindicales (OSPERYH/FATERyH/SERACARH).
4. Documentación Edilicia y Planos: póliza de Seguro Integral de Consorcio vigente, Libro de Inspección de Ascensores, certificado de limpieza de tanques, certificados de conservación de fachada (Ley 6.116) e inventario de bienes muebles del edificio.

A tal efecto, se fija como lugar y horario de entrega las oficinas de esta Administración situadas en {{administradorDomicilio}}, CABA, en el horario de {{horarioAtencion}}.

APERCIBIMIENTO: en caso de silencio, negativa o incumplimiento en el plazo conferido:

1. Se promoverá de inmediato la Acción Judicial por Secuestro de Libros y Documentación (Art. 209 del CPCCN) con auxilio de la fuerza pública, y la correspondiente Acción por Rendición de Cuentas (Arts. 858 y ss. CCyC y 652 del CPCCN), haciéndolo directa y exclusivamente responsable por los daños, perjuicios, multas e intereses que su omisión le ocasione al Consorcio.
2. Se radicará la correspondiente Denuncia Penal por Retención Indebida comprendida en el Art. 173 inc. 2° del Código Penal de la Nación.
3. Se formalizará la Denuncia Administrativa ante el Registro Público de Administradores de Consorcios (RPA) de CABA por infracción grave a la Ley N.º 941, solicitando la aplicación del máximo de las sanciones previstas (multa e inhabilitación de la matrícula).

Queda Ud. formalmente notificado.

CABA, {{fechaHoy}}

{{administradorNombre}}
Administrador del Consorcio
CUIT: {{administradorCUIT}}

Nota: enviar por Correo Argentino u otro prestador postal oficial como Carta Documento con aviso de recibo.`
  }
};
