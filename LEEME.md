# Cuaderno de Repostería — cómo instalarla

Esta carpeta es una app web instalable (PWA). Para que el botón "instalar"
aparezca en el celular o la computadora, el navegador exige que los archivos
se sirvan por **HTTPS** desde algún lugar — no basta con abrir `index.html`
haciendo doble clic. La forma más fácil y gratis:

## Opción recomendada: Netlify Drop (2 minutos, sin cuenta)

1. Entra a https://app.netlify.com/drop
2. Arrastra esta carpeta completa (`index.html`, `manifest.json`, `sw.js`,
   `icon-192.png`, `icon-512.png`) a la página.
3. Netlify te da un link tipo `https://algo-al-azar.netlify.app`.
4. Abre ese link desde el celular.

## Instalarla en el celular

- **Android (Chrome):** abre el link → menú (⋮) → "Instalar app" o
  "Agregar a pantalla de inicio".
- **iPhone (Safari):** abre el link → botón compartir (□↑) → "Agregar a
  pantalla de inicio".

Desde ahí queda como un ícono más, abre a pantalla completa sin barra del
navegador, y funciona sin internet salvo por la función "Agregar por foto"
(esa sí necesita conexión, porque llama a la API de Claude).

## Instalarla en la computadora

- **Chrome / Edge:** abre el link → aparece un ícono de instalar (⊕) en la
  barra de direcciones → clic → "Instalar".

## Otras formas de hospedarla (igual de gratis)

- GitHub Pages (si ya usas GitHub): sube la carpeta a un repo y activa Pages
  en la configuración del repo.
- Vercel (vercel.com): arrastra la carpeta igual que en Netlify.

## Sobre tus datos

Todo (recetas, moldes, inventario) se guarda en el almacenamiento local del
navegador de ese dispositivo — no se sube a ningún servidor. Usa los botones
"Descargar copia" / "Restaurar desde archivo" en Configuración para pasar tus
datos a otro celular o computadora, o para tener un respaldo.

## Sobre la función "Agregar por foto"

Necesita tu propia clave (API key) de la API de Claude, que consigues gratis
(con créditos de prueba) en console.anthropic.com → Settings → API Keys. Se
guarda solo en tu dispositivo y el uso se cobra a tu cuenta de Anthropic
según lo que uses.
