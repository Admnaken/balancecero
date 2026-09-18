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
    tips: "Guardá las constancias de citación (mail, carta documento, cartelera) para blindar la validez de la asamblea ante una eventual impugnación.",
    comoProceder:
      "1) Revisá el Reglamento de Copropiedad: ahí figuran las mayorías exigidas para remover/designar administrador (simple, absoluta o especial) y quién puede convocar (el propio administrador, el Consejo de Propietarios o un porcentaje de copropietarios). 2) Redactá la convocatoria con orden del día claro (por ejemplo: \"1. Remoción del administrador saliente. 2. Designación de nuevo administrador. 3. Autorización de gestiones ante bancos y organismos\"). 3) Notificá a todos los propietarios con la anticipación que fije el reglamento (suele ser 5 a 10 días hábiles), dejando constancia fehaciente (carta documento, mail con acuse, o notificación personal firmada) — no alcanza con la cartelera sola si el reglamento exige notificación fehaciente. 4) El día de la asamblea, labrá un acta provisoria con el listado de presentes/representados (firmas o poderes), verificá el quórum exigido y, si se alcanza, votá cada punto del orden del día dejando asentado el resultado numérico. 5) Elegí Presidente y Secretario de la asamblea y dos copropietarios para firmar el acta definitiva. 6) Con el acta aprobada, ya podés avanzar con los pasos siguientes (asentamiento en el libro, protocolización, etc.)."
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
    tips: "Si el libro está en poder del administrador saliente y no lo entrega, este paso se resuelve junto con el reclamo de documentación (ver sección 'Reclamo al administrador saliente').",
    comoProceder:
      "1) Conseguí el Libro de Actas físico (te lo debe entregar el saliente) o, si el consorcio usa libro digital/rubricado electrónicamente, el acceso correspondiente. 2) Verificá que la rúbrica esté vigente y que las últimas hojas utilizadas coincidan con la última acta asentada — así detectás si hay actas 'salteadas' o el libro está completo. 3) Transcribí o pegá el acta de la asamblea de designación en la siguiente foja en blanco, respetando el orden cronológico y sin dejar espacios en blanco entre actas anteriores. 4) Recabá las firmas de Presidente y Secretario de la asamblea, y de los dos propietarios designados como firmantes, todos en la misma foja. 5) Si el libro está agotado (sin fojas), iniciá en paralelo el trámite de un libro nuevo (ver la guía 'Qué hacer si falta un libro' en el módulo de Auditoría técnica). 6) Si el saliente se niega a entregar el libro, no frenés el resto del circuito: podés operar con el acta certificada por escribano mientras tramitás la entrega forzosa por la vía del reclamo."
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
    tips: "Pedí varias copias certificadas: se usan en el banco, ARCA, AGIP y AGC.",
    comoProceder:
      "1) Llevá el Libro de Actas original (con el acta ya asentada y firmada) a una escribanía. 2) Pedí una \"certificación de copia fiel\" o \"testimonio\" del acta: el escribano coteja el original contra la copia y certifica que son idénticas, con su firma y sello notarial (y legalización del Colegio de Escribanos si el organismo destinatario lo requiere, por ejemplo para trámites interjurisdiccionales). 3) Sacá al menos 4 a 6 copias certificadas: una para el banco, una para ARCA, una para AGIP, una para AGC y una o dos de resguardo. 4) Guardá el libro original siempre en tu poder o en un lugar seguro del consorcio — nunca lo entregues como \"original\" a ningún organismo, solo copias certificadas. 5) Conservá el comprobante de la escribanía (factura/recibo) como gasto del consorcio, a rendir en la próxima asamblea."
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
    tips: "Trámite gratuito. Si es la primera matriculación, reservá turno de examen con anticipación: suele ser el paso más largo del circuito.",
    comoProceder:
      "1) Si ya tenés matrícula, entrá a la plataforma TAD (Trámites a Distancia) del GCBA con tu usuario miBA y verificá la fecha de vencimiento y el estado de tu inscripción en el Registro Público de Administradores. 2) Si está vencida o nunca te matriculaste, iniciá el trámite \"Inscripción al Registro Público de Administradores\" en TAD, cargando: DNI, certificado de antecedentes penales (Registro Nacional de Reincidencia, trámite online), certificado de libre deuda alimentaria, y constancia de CUIT/inscripción en ARCA. 3) Reservá turno para el examen presencial que toma el GCBA (se coordina por registroconsorcios@buenosaires.gob.ar) — es un cuestionario sobre Ley 941, CCyC y normativa de consorcios. 4) Aprobado el examen, completá el curso de capacitación de 60 horas cuando corresponda (habilitado por entidades reconocidas por el GCBA). 5) Con todo aprobado, el GCBA emite el certificado de matrícula vigente, que debés descargar y guardar: es el documento que vas a adjuntar en todos los trámites siguientes (banco, ARCA, AGIP, AGC). 6) Marcá en el calendario la fecha de renovación (la matrícula tiene vigencia limitada) para no quedar inhabilitado a mitad de gestión."
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
      "\"Consorcio de Propietarios Scalabrini Ortiz c/ A., J. M. s/ Remoción de Administrador\" (CNCiv., Sala H): la representación legal del consorcio emana de la asamblea soberana y es válida frente a terceros e instituciones bancarias una vez formalizada conforme al reglamento y asentada en los libros obligatorios.",
    comoProceder:
      "Documentación a reunir ANTES de ir al banco (llevá todo en original y copia, o copia certificada donde se indique): 1) Copia certificada por escribano del Acta de Asamblea de designación. 2) Copia del Reglamento de Copropiedad y Administración. 3) Certificado de matrícula vigente en el RPA (Ley 941). 4) Constancia de CUIT del consorcio (constancia de inscripción ARCA) y de inscripción en AGIP. 5) DNI y constancia de CUIT/CUIL del nuevo administrador. 6) Nota formal firmada solicitando la baja de firmas del administrador saliente y el alta de las tuyas (podés generarla en la pestaña \"Generador de documentos\" de esta app). 7) Si el reglamento o el banco lo exige, poder o autorización específica de la asamblea para operar la cuenta. Presentación ante el banco: 1) Pedí turno en la sucursal donde opera la cuenta del consorcio (Banca Empresas/PyME si la entidad lo maneja así) — muchos bancos exigen que el trámite lo inicie el titular de la cuenta, no un tercero. 2) Entregá la nota formal junto con toda la documentación de respaldo, y pedí que te sellen o firmen una copia como constancia de recepción (\"cargo\"). 3) El banco suele derivar el trámite a su área legal/KYC para validar la documentación (personería, representación, cumplimiento fiscal) — preguntá el plazo estimado de resolución. 4) Una vez aprobado, te van a citar (presencial u online según el banco) para registrar tu firma y, si corresponde, dar de baja el acceso de homebanking del saliente y darte de alta a vos. 5) Confirmá que quede completamente bloqueado el acceso del administrador saliente (firma, tarjeta, homebanking, token) antes de retirarte — es el punto más importante para evitar que siga operando la cuenta después de su remoción. 6) Guardá la constancia de alta y el nuevo CBU/alias (si cambia) para incluirlos en la circular a los propietarios."
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
    generaDocumento: "arca",
    comoProceder:
      "1) Entrá a la web de ARCA (ex AFIP) con tu Clave Fiscal personal (nivel de seguridad 3). 2) Ingresá al servicio \"Administrador de Relaciones de Clave Fiscal\" y seleccioná \"Nueva Relación\". 3) Elegí la opción para vincularte como \"Representante Legal\" de una persona jurídica, e ingresá el CUIT del consorcio. 4) El sistema va a requerir que subas la documentación de respaldo (acta de asamblea, reglamento, certificado de matrícula RPA) a través del servicio \"Presentaciones Digitales\" — generá ahí una presentación adjuntando los PDF escaneados, indicando como motivo \"cambio de administrador/representante legal\". 5) Si el trámite no se resuelve online, ARCA puede citarte a la agencia correspondiente al domicilio fiscal del consorcio para ratificar la documentación en forma presencial. 6) Una vez aprobada la vinculación, vas a poder generar el VEP, presentar el F.931 (cargas sociales del personal) y operar todos los servicios del CUIT del consorcio con tu propia Clave Fiscal. 7) Revisá también que no haya declaraciones juradas atrasadas o VEP impagos a tu nombre como representante saliente-entrante: heredás la situación fiscal del consorcio, así que conviene chequear el estado de cuenta corriente apenas tengas acceso."
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
    generaDocumento: "agip",
    comoProceder:
      "1) Ingresá al portal de AGIP con tu Clave Ciudad (nivel 2 o 3, según el trámite). 2) Buscá el trámite de \"Cambio de representante legal\" o \"Actualización de autoridades\" para el CUIT del consorcio (en algunos casos, si no está disponible online, se presenta por Mesa de Entradas de AGIP o por nota digital). 3) Cargá la documentación: DNI, acta de asamblea certificada, reglamento de copropiedad, certificado de matrícula RPA y un comprobante de servicio a nombre del consorcio en el domicilio fiscal (para acreditar el domicilio). 4) Si AGIP lo requiere, presentá también la nota formal (podés generarla en el Generador de Documentos de esta app) explicando el cambio de gestión. 5) Una vez procesado el cambio, revisá el estado de Ingresos Brutos (si el consorcio tributara por alguna actividad) y del ABL del inmueble, para detectar deudas o pagos atrasados que haya dejado el saliente. 6) Guardá la constancia de la gestión: te la van a pedir si necesitás tramitar después certificados de libre deuda de AGIP."
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
    tips: "Una vez inscripto, deberás contratar profesionales matriculados para cada instalación (ascensorista, gasista, idóneo en incendio) que cargarán los reportes técnicos periódicos.",
    comoProceder:
      "Qué presentar y cómo hacerlo en el portal de instalaciones de la AGC (instalaciones.agcontrol.gob.ar): 1) Ingresá con tu Clave Ciudad (o CUIT/usuario habilitado) y buscá la opción para registrarte como \"Administrador/Responsable de inmueble\" — vas a necesitar los datos catastrales del edificio (circunscripción, sección, manzana, parcela) que suelen figurar en la boleta de ABL o en el Reglamento de Copropiedad. 2) Cargá tu DNI, matrícula RPA vigente y el acta de designación como respaldo de que sos el responsable habilitado para operar el inmueble en el sistema. 3) Una vez vinculado al inmueble, el sistema te muestra las instalaciones ya registradas (ascensores, IFCI, tanques, etc.) con sus obleas y vencimientos — revisá cada una para saber qué está vigente y qué vencido. 4) Para renovar una oblea (por ejemplo la de ascensores o la de matafuegos/instalación fija contra incendio) necesitás que un profesional matriculado en el rubro correspondiente (ascensorista, instalador de incendio, gasista matriculado, electricista con matrícula AEA) haga la inspección y cargue el informe técnico directamente en el sistema con su propia clave — el administrador no carga el informe técnico, solo gestiona la habilitación y paga las tasas. 5) El sistema genera una orden de pago (tasa AGC) que tenés que abonar para que se emita la oblea nueva; guardá el comprobante. 6) Descargá o imprimí la oblea vigente y colocala en el lugar visible correspondiente (sala de máquinas, cabina de ascensor, gabinete de incendio) — es lo que va a pedir cualquier inspector. 7) Si hay obleas vencidas y no hay presupuesto o proveedor contratado, dejá constancia por escrito de la gestión iniciada: eso demuestra diligencia de la nueva administración frente a una eventual inspección."
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
    tips: "Pedile al saliente el certificado de cobertura y el comprobante de \"libre deuda\" como parte del reclamo de documentación.",
    comoProceder:
      "1) Identificá qué ART tiene contratada el consorcio (figura en los recibos de sueldo del personal o en la póliza) y contactala (teléfono o portal web de la aseguradora) informando el cambio de administración. 2) Pedí que actualicen los datos del representante legal del empleador (vos) en el sistema de la ART, y solicitá por escrito (mail) el certificado de cobertura vigente y la constancia de \"libre deuda\" de la gestión anterior. 3) Verificá que la nómina de trabajadores cubiertos coincida con el personal real del edificio (encargados titulares y suplentes) — es común encontrar personal que ya no trabaja más pero sigue \"cubierto\", o personal real que no figura dado de alta. 4) Revisá la fecha del último examen médico periódico de cada trabajador (obligatorio según la actividad) y coordiná los que estén vencidos. 5) Si detectás falta de pago de cuotas de ART por parte del saliente (lo que puede dejar al personal sin cobertura real pese a la póliza vigente), documentalo: es un punto grave para el reclamo de rendición de cuentas. 6) Guardá copia de la póliza y del comprobante de pago al día como parte de la carpeta de legajos de empleados."
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
    tips: "Aprovechá este contacto para consultar la categoría, adicionales y escala salarial vigente del encargado, y así cotejarlos con los recibos que entregue el saliente.",
    comoProceder:
      "1) Comunicate con la delegación de SUTERH correspondiente a la zona del edificio (o la sede central, Sarmiento 2040 CABA) y pedí el circuito vigente para informar cambio de administración — puede ser trámite presencial, telefónico o por formulario digital según el momento. 2) Presentá copia del reglamento de copropiedad, constancia de CUIT del consorcio y tus datos (DNI, matrícula RPA) para que el sindicato actualice el legajo del empleador. 3) Pedí un informe del estado de aportes del personal (sindicales, OSPERYH, fondo SERACARH) para verificar que el saliente no haya dejado meses impagos. 4) Consultá la categoría convencional, antigüedad y escala salarial vigente (CCT 589/10) de cada trabajador para cotejarla con los recibos de sueldo que te entregue el saliente y detectar diferencias. 5) Si hay aportes atrasados o mal categorizados, documentalo por escrito: es un ítem central del reclamo de rendición de cuentas laboral y puede generar responsabilidad solidaria del consorcio si no se regulariza a tiempo."
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
    generaDocumento: "circular",
    comoProceder:
      "1) Esperá a tener confirmados y operativos los datos bancarios oficiales (paso 'Banco') antes de enviar la circular, para no inducir a los propietarios a pagar en una cuenta que todavía no está habilitada a tu nombre. 2) Generá la circular desde la pestaña 'Generador de documentos' (ya trae los datos del administrador, matrícula y las cuentas bancarias cargadas). 3) Revisá y completá el listado de mails de propietarios/residentes (si no lo tenés completo, usá el Libro Registro de Propietarios o pedilo al Consejo/administración del edificio). 4) Enviá la circular por correo electrónico a toda la nómina y, en paralelo, imprimila y fijala en la cartelera del edificio y en los palieres si el reglamento así lo prevé — la doble vía (mail + cartelera) refuerza la notificación fehaciente. 5) Adjuntá o incluí la ficha de reempadronamiento para actualizar contactos y unidades funcionales. 6) Guardá una copia con fecha de envío/fijación: sirve como respaldo si más adelante alguien alega no haber sido notificado del cambio de cuenta."
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
    fundamento: ["Art. 2067 inc. j) CCyC", "Art. 12 Ley 941 CABA"],
    desarrollo:
      "1) Identificá con precisión la fecha de notificación fehaciente de la remoción/renuncia (mail con acuse, carta documento, o la propia acta de asamblea notificada) — de ahí arranca el conteo de los 10 días hábiles administrativos (no corridos: se excluyen sábados, domingos y feriados). 2) Cargá esa fecha en el campo 'Fecha de notificación fehaciente' de la pestaña Inicio: la app calcula automáticamente el vencimiento del plazo. 3) Dentro de esos 10 días, enviá una nota o mail formal (de tono cordial pero por escrito) proponiendo día, hora y lugar concretos para el Acta de Traspaso, y pedile que lleve un inventario de lo que va a entregar (libros, documentación, llaves, claves). 4) Si el saliente acepta, labrá en ese encuentro un Acta de Entrega/Traspaso detallando ítem por ítem lo recibido, con fecha y firma de ambas partes — esto evita discusiones posteriores sobre qué se entregó y qué no. 5) Si no responde o se niega a fijar una fecha, dejá vencer el plazo sin más reclamos informales: es momento de pasar a la intimación formal por Carta Documento (etapa 2). 6) Llevá un registro escrito de cada intento de contacto (capturas de mensajes, mails enviados) — sirve como prueba de la diligencia de la nueva administración si el conflicto escala."
  },
  {
    id: "etapa2",
    numero: 2,
    titulo: "Intimación formal por Carta Documento",
    plazo: "48 a 72 horas (perentorio)",
    descripcion:
      "Vencido el plazo de 10 días hábiles sin entrega de inventario, libros y documentación contable/bancaria, se intima formalmente por Carta Documento con plazo perentorio de 48 a 72 horas. Debe citar expresamente el Art. 2067 inc. j) CCyC y el Art. 12 de la Ley 941, detallar individualmente los elementos retenidos, y advertir el inicio de acciones judiciales y la denuncia administrativa ante el RPA.",
    fundamento: ["Art. 2067 inc. j) CCyC", "Art. 12 Ley 941 CABA", "Art. 173 inc. 2° Código Penal (retención indebida)"],
    generaDocumento: "carta-documento",
    desarrollo:
      "1) Generá el texto de la Carta Documento desde la pestaña 'Generador de documentos' (ya incluye los artículos legales y los datos del saliente cargados). 2) Antes de enviarla, detallá individualmente los elementos que reclamás (no alcanza con decir 'documentación del consorcio': listá libros por nombre, extractos bancarios por período, legajos de personal, claves de homebanking, etc.) — usá como guía el listado de 'Documentación a reclamar' de esta misma pestaña. 3) Enviala por Correo Argentino (o la empresa de cartas documento que uses) al domicilio legal/fiscal del administrador saliente que tengas registrado, y también, si es posible, a un domicilio alternativo conocido, para reforzar la notificación. 4) Fijá el plazo perentorio de 48 a 72 horas hábiles desde la recepción, y dejá expresamente advertido que, vencido el plazo, vas a iniciar denuncia administrativa ante el RPA y acciones judiciales (medida cautelar de secuestro y rendición de cuentas). 5) Guardá el comprobante de imposición y, apenas esté disponible, la constancia de entrega (o el aviso de que no fue retirada) — son la prueba de la intimación fehaciente que vas a necesitar en las etapas siguientes. 6) Si el saliente responde y entrega parcialmente, documentá por escrito qué recibiste y qué sigue faltando antes de avanzar a la etapa 3."
  },
  {
    id: "etapa3",
    numero: 3,
    titulo: "Denuncia administrativa ante el RPA (CABA)",
    plazo: "Ante persistencia del incumplimiento",
    descripcion:
      "Se inicia una presentación formal ante Defensa del Consumidor / RPA de CABA por infracción al Art. 12 de la Ley 941. El RPA cita a audiencia de conciliación y, de no mediar entrega, aplica sanciones pecuniarias e inhabilitación de la matrícula del administrador saliente.",
    fundamento: ["Art. 15 Ley 941 CABA"],
    desarrollo:
      "Cómo se gestiona la denuncia en el RPA: 1) La denuncia se presenta ante el Registro Público de Administradores de CABA (dependiente de la Dirección General de Defensa y Protección del Consumidor del GCBA), habitualmente vía TAD (Trámites a Distancia) con tu Clave Ciudad/miBA, buscando el trámite de 'Denuncia contra administrador de consorcio' o presentación por Mesa de Entradas si no está disponible online en tu jurisdicción. 2) Armá un escrito de denuncia que identifique: datos del consorcio y del denunciante (vos, como nuevo administrador con matrícula vigente), datos del administrador saliente denunciado (nombre y N.º de matrícula RPA — es un dato clave para que el RPA lo identifique en su padrón), relato claro de los hechos (fecha de remoción/renuncia, falta de entrega de libros y documentación) y encuadre en el Art. 12 de la Ley 941 (obligación de entrega) y Art. 15 (régimen sancionatorio). 3) Adjuntá como prueba: copia del acta de asamblea de designación, la Carta Documento enviada (etapa 2) con su constancia de recepción, y el listado detallado de lo que sigue sin entregarse. 4) El RPA, recibida la denuncia, cita a ambas partes a una audiencia de conciliación (puede ser presencial o virtual) donde intenta que el saliente entregue lo reclamado; si concurre y entrega, se labra acta y se cierra el expediente. 5) Si el saliente no comparece o no entrega, el RPA puede iniciar un sumario administrativo que derive en multa y, en casos graves o reiterados, suspensión o cancelación de su matrícula (lo que le impide seguir administrando cualquier consorcio en CABA). 6) Este trámite es gratuito y no requiere patrocinio letrado, aunque podés hacerte asesorar. Corré esta vía en paralelo (no en lugar) de la vía judicial de la etapa 4 si la urgencia por los fondos o los libros lo justifica."
  },
  {
    id: "etapa4",
    numero: 4,
    titulo: "Vía judicial: medida cautelar y rendición de cuentas",
    plazo: "Con patrocinio letrado",
    descripcion:
      "Se inician simultáneamente dos acciones en el fuero Civil: (1) Medida Cautelar Autónoma de Secuestro de Libros y Documentación (Art. 209 CPCCN), que permite a un oficial de justicia, con auxilio de la fuerza pública, incautar los libros y carpetas contables; y (2) Juicio por Rendición de Cuentas (Art. 652 CPCCN / Arts. 858 y ss. CCyC), exigiendo la presentación documentada de ingresos y egresos del período administrado.",
    fundamento: ["Art. 209 CPCCN", "Art. 652 CPCCN", "Arts. 858 a 864 CCyC"],
    desarrollo:
      "1) Esta etapa requiere patrocinio letrado obligatorio (no es un trámite que se haga sin abogado) — buscá un abogado con experiencia en derecho de consorcios/propiedad horizontal. 2) Con el abogado, armá el expediente de Medida Cautelar Autónoma de Secuestro de Libros y Documentación: se presenta ante el fuero Civil (Juzgado Nacional en lo Civil de CABA), fundada en el Art. 209 CPCCN, acompañando toda la prueba reunida hasta acá (acta de designación, Carta Documento con constancia de recepción, y de corresponder, la denuncia RPA en trámite). Si el juez la concede, libra un oficio para que un oficial de justicia, con auxilio de la fuerza pública si es necesario, concurra al domicilio del saliente a secuestrar libros y documentación. 3) En paralelo (puede ser en la misma presentación o en expediente separado, según estrategia del abogado), se inicia el Juicio por Rendición de Cuentas (Art. 652 CPCCN, Arts. 858 a 864 CCyC), exigiendo que el saliente presente de forma documentada todos los ingresos y egresos administrados durante su gestión, con comprobantes respaldatorios. 4) Mientras el proceso judicial avanza, seguí operando el consorcio con lo que sí lograste obtener (cuenta bancaria, matrícula, organismos) para no paralizar la administración. 5) Tené en cuenta los tiempos: la vía judicial es la más lenta de las cuatro etapas, por eso conviene haber agotado (o iniciado en paralelo) las vías administrativas más rápidas (Carta Documento, denuncia RPA) antes o al mismo tiempo. 6) Documentá todos los gastos del proceso judicial (tasa de justicia, honorarios) porque, de prosperar la rendición de cuentas, pueden reclamarse como parte de los daños ocasionados por la retención indebida."
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
    subtitulo: "Exigencias de AGC, MetroGAS, ENARGAS y AEA. No todos los consorcios tienen todas las instalaciones: marcá \"No tiene\" en las opcionales para que no queden pendientes eternamente.",
    items: [
      {
        id: "ascensores",
        titulo: "Ascensores y montacargas (Ordenanza 51.598 / AGC)",
        opcional: true,
        preguntaTiene: "¿El edificio tiene ascensor o montacargas?",
        verificar: [
          "Sala de máquinas: orden, limpieza y libre de elementos ajenos al equipo",
          "Cabina: estado general, botonera, iluminación, luz de emergencia y timbre de alarma funcionando",
          "Oblea/código QR de la AGC vigente y visible (en cabina o sala de máquinas)",
          "Prueba de funcionamiento: llamada desde piso, apertura/cierre de puertas y parada a nivel"
        ],
        nota:
          "Esto es lo único verificable en una visita de traspaso: no se puede inspeccionar el estado de los cables, el foso ni el interior de los mecanismos sin desarmar el equipo. El informe técnico completo (freno de seguridad, paracaídas, limitador de velocidad, cableado) se consulta en el sistema de la AGC una vez que tomás posesión y te vinculás como responsable del inmueble.",
        riesgo: "Clausura preventiva del equipo por la AGC, multas severas y responsabilidad penal subsidiaria del consorcio por accidentes a terceros."
      },
      {
        id: "gas",
        titulo: "Instalación de gas y calderas centrales (ENARGAS / MetroGAS)",
        opcional: true,
        preguntaTiene: "¿El edificio tiene calefacción/agua caliente central por caldera?",
        verificar: [
          "Nicho de medidores con rejillas de ventilación despejadas y sin candados restrictivos",
          "Cartelería de seguridad en sala de calderas",
          "Contrato de mantenimiento vigente con gasista/calderista matriculado",
          "Estado de quemadores, bombas de recirculación y conductos de evacuación"
        ],
        riesgo: "Corte intempestivo del suministro de gas por denuncia/inspección de MetroGAS, con plazos de reconexión que pueden superar los 6 u 8 meses."
      },
      {
        id: "sistema-fijo-incendio",
        titulo: "Sistema fijo contra incendio (rociadores, bombas de incendio, hidrantes)",
        opcional: true,
        preguntaTiene: "¿El edificio tiene sistema fijo contra incendio (más allá de los matafuegos)?",
        verificar: [
          "Gabinetes de mangueras e hidrantes en buen estado, con prueba de hermeticidad/presión",
          "Bomba de incendio: arranque automático y presión en rango normal",
          "Luces de emergencia operativas en rutas de evacuación/escaleras",
          "Puertas cortafuego con cierre automático funcionando y libres de obstáculos",
          "Señalética de vías de evacuación visible"
        ],
        riesgo: "Inoponibilidad del seguro en caso de siniestro (rechazo de cobertura) e imputación penal del consorcio."
      },
      {
        id: "matafuegos",
        titulo: "Matafuegos (obligatorio en todo consorcio)",
        campos: [
          { id: "cantidad", label: "Cantidad de matafuegos", type: "number" },
          { id: "tamanos", label: "Tamaños (ej: 5kg ABC, 10kg CO2)", type: "text" },
          { id: "vencimiento", label: "Próximo vencimiento de carga", type: "date" },
          { id: "fechaMantenimiento", label: "Fecha del último mantenimiento", type: "date" },
          { id: "estadoCarga", label: "Estado de carga (manómetro)", type: "select", options: ["En rango verde (cargado)", "Bajo / por vencer", "Vencido o descargado"] }
        ],
        riesgo: "Inoponibilidad del seguro en caso de siniestro e infracción directa ante una inspección de la AGC; es exigible en todos los edificios, sin excepción."
      },
      {
        id: "electrica",
        titulo: "Tableros eléctricos y puesta a tierra (AEA 90364)",
        verificar: [
          "Tablero general con protecciones termomagnéticas y disyuntores diferenciales probados",
          "Medición anual del protocolo de Puesta a Tierra (PAT) con telurímetro",
          "Ausencia de cables expuestos o empalmes fuera de cajas de paso"
        ],
        campos: [
          { id: "estadoGeneral", label: "Estado general del tablero", type: "select", options: ["Bueno", "Regular — con detalles", "Malo — requiere intervención"] },
          { id: "detallesObservados", label: "Detalle de lo observado (cables sueltos, llaves quemadas, falta de rotulado, etc.)", type: "textarea" },
          { id: "fechaMedicionPAT", label: "Fecha de la última medición de Puesta a Tierra", type: "date" }
        ],
        riesgo: "Riesgo de electrocución, incendios por cortocircuito y apercibimiento de la AGC."
      },
      {
        id: "sala-maquinas",
        titulo: "Sala de máquinas (general)",
        verificar: [
          "Iluminación adecuada y en funcionamiento",
          "Ausencia de humedad, filtraciones o acumulación de agua",
          "Piso en buen estado, sin obstáculos ni elementos ajenos",
          "Medidores de gas y electricidad identificados, rotulados y accesibles"
        ],
        riesgo: "Una sala de máquinas en mal estado dificulta el mantenimiento de ascensores/calderas y puede ser observada en inspecciones de la AGC."
      },
      {
        id: "cisterna-electrobombas",
        titulo: "Cisterna y electrobombas de elevación de agua (sistema automático)",
        opcional: true,
        preguntaTiene: "¿El edificio tiene cisterna con electrobombas para elevar agua a los tanques?",
        verificar: [
          "Arranque y parada automática de las electrobombas (sistema de flotante/presostato)",
          "Nivel de agua en la cisterna dentro de parámetros normales",
          "Tapa de inspección sellada y en buen estado",
          "Ausencia de filtraciones o humedad en el recinto de la cisterna"
        ],
        riesgo: "Una falla no detectada en el sistema automático deriva en falta de suministro de agua a todo el edificio."
      },
      {
        id: "escaleras",
        titulo: "Escaleras",
        campos: [
          { id: "iluminacion", label: "Estado de la iluminación", type: "select", options: ["Buena", "Parcial — hay artefactos sin funcionar", "Deficiente / sin luz"] },
          { id: "antideslizante", label: "¿Tiene sistema antideslizante en los escalones?", type: "select", options: ["Sí", "No"] }
        ],
        riesgo: "Escaleras sin buena iluminación o sin antideslizante son causa frecuente de accidentes y reclamos de responsabilidad civil contra el consorcio."
      },
      {
        id: "pasillos",
        titulo: "Pasillos",
        campos: [
          { id: "iluminacion", label: "Estado de la iluminación", type: "select", options: ["Buena", "Parcial — hay artefactos sin funcionar", "Deficiente / sin luz"] },
          { id: "estadoInterruptores", label: "Estado de los interruptores / sensores de movimiento", type: "select", options: ["Funcionan correctamente", "Alguno no funciona", "No funcionan / no hay"] }
        ],
        riesgo: "Pasillos mal iluminados son un factor de riesgo de accidentes y un reclamo habitual de los propietarios."
      },
      {
        id: "cerradura-principal",
        titulo: "Cerradura de la puerta principal",
        campos: [
          { id: "tipoLlave", label: "Tipo de llave", type: "select", options: ["Convencional", "Electrónica / tarjeta / app"] },
          { id: "cantidadCopias", label: "Cantidad de copias entregadas por UF", type: "number" },
          { id: "protocoloPerdida", label: "Protocolo si un propietario pierde una llave/copia", type: "textarea" }
        ],
        riesgo: "Sin un protocolo claro de copias y pérdidas, se pierde el control de quién tiene acceso al edificio, con implicancias de seguridad para todos los residentes."
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
        verificar: ["Transcripción de la asamblea de designación", "Estado de rubricación"],
        siNoLoTengo:
          "Cómo reemplazarlo: la rúbrica de libros de consorcio en CABA la otorga el Registro Público de Administradores (GCBA) / en algunos casos se gestiona vía escribanía habilitada, según el circuito vigente al momento del trámite — consultá en el mismo portal donde tramitaste tu matrícula RPA. Pedí turno para rubricar un libro nuevo (\"reposición\" o \"habilitación\" de libro) llevando DNI, certificado de matrícula RPA y los datos del consorcio (CUIT, dirección). Cómo saber si el libro existente es válido o está mal confeccionado: revisá que la carátula tenga la rúbrica original (sello y firma del organismo, no una fotocopia), que las actas estén en orden cronológico sin saltos de fecha ni fojas arrancadas, que cada acta tenga las firmas exigidas (presidente y secretario de la asamblea más dos propietarios) y que no haya espacios en blanco entre actas (facilitan adulteraciones). Si encontrás fojas arrancadas, actas sin firmar, o el libro directamente no aparece, ese hallazgo se suma al reclamo formal al administrador saliente (además del reclamo por faltante), porque un libro mal llevado también compromete la validez de lo actuado en su gestión."
      },
      {
        id: "libro-administracion",
        titulo: "Libro de Administración / Registro de Propietarios",
        verificar: ["Actualización de datos de contacto", "Porcentuales de expensas correctos"],
        siNoLoTengo:
          "Cómo reemplazarlo: al igual que el resto de los libros obligatorios, se rubrica un ejemplar nuevo ante el organismo habilitante (mismo circuito que el Libro de Actas). Mientras se tramita, armá en paralelo una planilla propia con los datos de todos los propietarios (nombre, UF, porcentual, contacto) para no perder continuidad operativa. Cómo saber si está mal confeccionado: verificá que los porcentuales de cada unidad sumen 100% y coincidan con el Reglamento de Copropiedad, y que los datos de contacto no estén manifiestamente desactualizados (titulares fallecidos, unidades vendidas hace años sin actualizar). Un libro con porcentuales incorrectos puede haber generado expensas mal liquidadas durante años: es un hallazgo grave a documentar para el reclamo y para revisar con un contador."
      },
      {
        id: "libro-ordenes",
        titulo: "Libro de Órdenes del Personal",
        verificar: ["Requisito obligatorio del CCT 589/10 para impartir instrucciones al encargado"],
        siNoLoTengo:
          "Cómo reemplazarlo: se rubrica un libro nuevo por el mismo circuito que los demás libros de consorcio. Es indispensable para poder dejar asentadas por escrito las instrucciones al encargado (art. correspondiente del CCT 589/10) y para documentar llamados de atención de forma válida ante un conflicto laboral. Cómo saber si está mal llevado: si las órdenes no tienen fecha, no están firmadas por el administrador, o hay borrones/tachaduras sin salvar, pierden valor probatorio en un eventual conflicto laboral — es un punto a señalar en el reclamo si el saliente lo llevaba así."
      },
      {
        id: "libro-sueldos",
        titulo: "Libro de Sueldos y Jornales (Ley 20.744 / ARCA)",
        verificar: ["Habilitación del libro de sueldos digital / hojas móviles", "Actualizado al día"],
        siNoLoTengo:
          "Cómo reemplazarlo: este libro (o su equivalente de hojas móviles/sueldos digital) se habilita ante ARCA (ex AFIP), no ante el GCBA — es un trámite distinto al resto de los libros de consorcio. Sin este libro habilitado no podés pagar sueldos de forma regular ni respaldar los recibos ante una inspección del Ministerio de Trabajo. Cómo saber si está mal llevado: cotejá que los importes asentados coincidan con los recibos de sueldo efectivamente entregados al personal y con lo declarado en el F.931 de ARCA — una diferencia entre estos tres documentos es indicio de pagos \"en negro\" parcial o de aportes mal liquidados, un hallazgo serio para el reclamo y con implicancias legales para el consorcio como empleador."
      },
      {
        id: "libros-tecnicos",
        titulo: "Libros técnicos obligatorios",
        verificar: [
          "Libro de Inspección de Ascensores (registro virtual en la web de la AGC)",
          "Libro de Mantenimiento de Instalaciones Fijas contra Incendio (registro virtual AGC)",
          "Registro de limpieza y desinfección de tanques de agua"
        ],
        siNoLoTengo:
          "Estos ya no son libros físicos en la mayoría de los casos: son registros virtuales dentro del portal de instalaciones de la AGC (instalaciones.agcontrol.gob.ar), cargados por los técnicos matriculados en cada intervención. Si no encontrás historial, verificá directamente en el portal una vez que estés vinculado como administrador del inmueble — ahí vas a ver todo el historial de cargas de la empresa de mantenimiento. Cómo saber si está \"mal confeccionado\": si el sistema muestra que hace muchos meses no se carga una inspección o mantenimiento pese a que la empresa de mantenimiento factura el servicio regularmente, es un fuerte indicio de que el mantenimiento no se estaba haciendo realmente o no se registraba — reclamalo al saliente y, de corresponder, revisá el contrato con la empresa de mantenimiento."
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
        verificar: ["Expensas recaudadas en cuenta bancaria a nombre del consorcio (prohibido usar cuentas personales del administrador)"],
        queMirar:
          "Qué pedirle al administrador saliente y qué mirar: 1) Extractos bancarios de la cuenta del consorcio de, como mínimo, los últimos 12 meses (idealmente desde la última asamblea que aprobó rendición de cuentas) — pedilos en PDF del banco, no un resumen armado por el propio saliente. 2) Conciliaciones bancarias mes a mes: el saldo del extracto del banco debe coincidir con lo registrado en la contabilidad del consorcio (libro de caja/banco); si no concilia, hay que averiguar por qué. 3) Comprobantes de todos los egresos relevantes (transferencias, pagos a proveedores, sueldos) con su respectivo respaldo documental (factura, recibo). 4) Verificar que no haya extracciones en efectivo sin justificar, transferencias a cuentas de terceros no identificados, o pagos a la cuenta personal del propio administrador saliente. 5) Estado de plazos fijos o inversiones del fondo de reserva, si el consorcio tuviera. 6) Saldo actual de la cuenta al día del traspaso, cotejado con el extracto bancario real (no con lo que declare el saliente de palabra). 7) Verificar que la totalidad de los medios de pago (chequeras, tarjetas, accesos de homebanking) queden efectivamente en tu poder o dados de baja — ver el paso 'Banco' de Toma de posesión."
      },
      {
        id: "situacion-fiscal",
        titulo: "Obligaciones previsionales y fiscales (ARCA)",
        verificar: ["CUIT del consorcio activo", "Cargas sociales F.931 del personal al día"],
        queMirar:
          "Qué pedir y qué mirar: constancia de CUIT y estado del domicilio fiscal; las últimas declaraciones juradas F.931 presentadas (verificar que estén presentadas en fecha, sin atrasos); los comprobantes de pago (VEP) de cada F.931, no solo la declaración — puede estar presentada pero impaga; el estado de cuenta corriente del CUIT en ARCA (para detectar deudas, intereses o planes de pago en curso); y si el consorcio realiza alguna actividad que tribute Ingresos Brutos, el estado de esa inscripción ante AGIP. Una declaración jurada presentada pero no pagada genera intereses y puede derivar en responsabilidad del consorcio como empleador — es un hallazgo para documentar."
      },
      {
        id: "situacion-laboral",
        titulo: "Régimen laboral (CCT 589/10 / FATERyH / SUTERH)",
        verificar: ["Vestimenta y EPP vigentes entregados al personal", "Valor de vivienda (si aplica) declarado en el recibo de sueldo"],
        queMirar:
          "Qué pedir y qué mirar: los legajos completos del personal (contrato, alta temprana ante ARCA, recibos de sueldo firmados de los últimos 12 meses); comprobantes de entrega de ropa de trabajo y elementos de protección personal (EPP) firmados por el trabajador (exigencia del CCT 589/10); constancia de exámenes médicos preocupacionales y periódicos vigentes; el estado de aportes sindicales y a OSPERYH; y si el encargado tiene vivienda en el edificio, que el valor locativo esté correctamente declarado en el recibo (para evitar contingencias fiscales y de aportes). Cotejá la categoría convencional declarada contra las tareas que realmente cumple el trabajador — una categorización incorrecta es una fuente frecuente de reclamos laborales futuros."
      },
      {
        id: "seguros",
        titulo: "Pólizas de seguro",
        verificar: ["Póliza Integral de Consorcio (incendio + responsabilidad civil) vigente y pagada al día"],
        queMirar:
          "Qué pedir y qué mirar: copia completa de la póliza vigente (no solo el certificado resumen) para revisar sumas aseguradas, exclusiones y franquicias; comprobante de pago de la prima al día (una póliza puede figurar 'vigente' pero estar en proceso de anulación por falta de pago); certificado de cobertura de ART del personal (ya cubierto en el paso 'ART' de Toma de posesión, pero conviene volver a cotejarlo acá); y si el edificio tiene ascensores o instalaciones especiales, que la póliza no tenga cláusulas de exclusión por falta de mantenimiento o de obleas vigentes, porque eso puede dejar sin cobertura real un siniestro aunque la póliza esté \"pagada\"."
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
// {{bancoCBU}}, {{bancoAlias}}, {{cuentasBancariasTexto}} (lista de todas las cuentas,
// para plantillas que admiten más de una), {{fechaAsamblea}}, {{fechaHoy}},
// {{salienteNombre}}, {{salienteMatricula}}, {{salienteDomicilio}}, {{salienteEmail}},
// {{salienteTelefono}}, {{horarioAtencion}}

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

2. Datos de la(s) Cuenta(s) Bancaria(s) Oficial(es) para Pago de Expensas

De acuerdo con lo establecido por el Art. 9° inc. f) de la Ley N.º 941 de la CABA, se recuerda que los fondos del consorcio deben canalizarse de manera exclusiva a través de cuenta(s) bancaria(s) titularidad del ente ({{consorcioNombre}}, CUIT N.º {{consorcioCUIT}}):

{{cuentasBancariasTexto}}

3. Modalidad de Pago y Envío de Comprobantes

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
