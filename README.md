# Toma de Posesión de Consorcios (CABA)

Aplicación web estática (HTML/CSS/JS puro, sin backend ni dependencias) para acompañar el proceso de toma de posesión de un consorcio en la Ciudad Autónoma de Buenos Aires: checklist de trámites (banco, ARCA, AGIP, AGC, ART, SUTERH/FATERyH), reclamo al administrador saliente, auditoría técnica inicial, checklist de legajos de empleados y generador de notas/cartas documento.

Todos los datos se guardan en el navegador (`localStorage`); no hay servidor ni base de datos. Es una herramienta de uso individual.

## Publicar en GitHub Pages

1. Creá un repositorio nuevo en GitHub (por ejemplo `toma-posesion-consorcios`).
2. Subí el contenido de esta carpeta (`index.html`, `css/`, `js/`, `README.md`) a la raíz del repositorio.
3. En el repositorio: **Settings → Pages**.
4. En "Build and deployment" elegí **Deploy from a branch**, rama `main` (o `master`), carpeta `/ (root)`.
5. Guardá. En 1–2 minutos la app queda publicada en `https://<tu-usuario>.github.io/<nombre-repo>/`.

### Subida rápida por línea de comandos

```bash
cd toma-posesion-app
git init
git add .
git commit -m "Primera versión de la app de toma de posesión"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/<nombre-repo>.git
git push -u origin main
```

Después activás Pages como en el paso 3-5.

## Respaldo en Google Drive

La pestaña "Inicio" tiene un panel para conectar la app con tu Google Drive: guarda (y permite restaurar) un archivo `toma-posesion-consorcios-backup.json` con todos tus consorcios. La app solo puede ver/editar ese archivo puntual (scope `drive.file`), no el resto de tu Drive, y la conexión se hace directamente entre tu navegador y Google (no hay ningún servidor intermedio).

Para que funcione necesitás generar un **Client ID de OAuth** una única vez, en tu propia cuenta de Google Cloud (es gratis):

1. Andá a [console.cloud.google.com](https://console.cloud.google.com/) e iniciá sesión con tu cuenta de Google.
2. Creá un proyecto nuevo (arriba a la izquierda → "Nuevo proyecto"). Nombre sugerido: `toma-posesion-consorcios`.
3. Con el proyecto seleccionado, andá a **APIs y servicios → Biblioteca**, buscá **Google Drive API** y hacé clic en **Habilitar**.
4. Andá a **APIs y servicios → Pantalla de consentimiento de OAuth**:
   - Tipo de usuario: **Externo**.
   - Completá nombre de la app y tu email.
   - En **Público de prueba / Test users**, agregá tu propio email (el que vas a usar para conectar Drive).
   - Dejá la app en estado **"Testing/Pruebas"** — no hace falta publicarla ni pedir verificación a Google, porque sos el único usuario.
5. Andá a **APIs y servicios → Credenciales → Crear credenciales → ID de cliente de OAuth**:
   - Tipo de aplicación: **Aplicación web**.
   - En **Orígenes de JavaScript autorizados**, agregá la URL donde vive tu app, por ejemplo `https://<tu-usuario>.github.io` (sin la barra final, y sin el nombre del repo).
   - Si vas a probar en tu computadora antes de publicar, agregá también `http://localhost:8000` (o el puerto que uses).
   - Guardá y copiá el **Client ID** que te genera (termina en `.apps.googleusercontent.com`).
6. Pegá ese Client ID en el campo "Client ID de Google Cloud (OAuth)" del panel de la app y hacé clic en **Conectar con Google Drive**. La primera vez Google te va a pedir que confirmes el acceso (va a avisar que la app no está verificada — es normal en modo "Testing"; hacé clic en "Ir a [nombre de la app] (no seguro)" y confirmá, ya que sos vos mismo el dueño de la app).

Una vez conectado podés tildar **"Guardar automáticamente en Drive después de cada cambio"** para no tener que acordarte de respaldar manualmente. La conexión (el token de acceso) dura unas horas y no queda guardada entre sesiones por seguridad — cuando vuelvas a abrir la app en otro momento, hacé clic en "Conectar con Google Drive" de nuevo (no vuelve a pedir todos los permisos, es un clic rápido).

> **Importante:** este flujo de conexión requiere que la página se abra por `http://` o `https://` (GitHub Pages o un servidor local). No funciona si abrís el `index.html` directamente como archivo (`file://`).

## Estructura

```
index.html        → estructura de la app y navegación por pestañas
css/styles.css     → estilos
js/data.js         → contenido: checklist de trámites, auditoría técnica, legajos, plantillas de documentos
js/drive-sync.js   → conexión y respaldo con Google Drive (OAuth vía Google Identity Services)
js/app.js          → lógica: manejo de consorcios, checklist, generador de documentos, calculadora de plazos
```

## Actualizar contenido normativo

Todo el texto legal (artículos, plazos, documentación exigida, riesgos, plantillas) vive en `js/data.js`, separado de la lógica. Para agregar un paso nuevo al checklist de toma de posesión, sumá un objeto al array `TOMA_POSESION`; para agregar una plantilla nueva al generador, sumá una clave a `PLANTILLAS`.

## Advertencia

El contenido es de referencia legal y administrativa (CCyC, Ley 941 CABA, CCT 589/10, normativa AGC/ARCA/AGIP) recopilado y organizado a partir de material propio del administrador. No reemplaza el asesoramiento de un abogado o contador para un caso concreto, y conviene revisar periódicamente que los plazos, formularios y links oficiales sigan vigentes.
