// Service Worker — Cuaderno de Repostería
//
// IMPORTANTE: si en el futuro modificas index.html (o cualquier archivo de
// ASSETS) y publicas los cambios en GitHub Pages, sube también este número
// de versión (CACHE_NAME). Si no lo subes, los navegadores que ya instalaron
// la app seguirán viendo la versión vieja guardada en caché, sin importar
// qué tan corregido esté el archivo real en el repositorio.
const CACHE_VERSION = "v2";
const CACHE_NAME = `cuaderno-reposteria-${CACHE_VERSION}`;

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .catch((err) => console.error("[sw] Error precargando assets:", err))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  // No cacheamos llamadas a la API de Claude (deben ser siempre en vivo).
  if (request.url.includes("api.anthropic.com")) return;

  const isNavigation =
    request.mode === "navigate" ||
    (request.headers.get("accept") || "").includes("text/html");

  if (isNavigation) {
    // Network-first para el HTML: así, apenas publicas una corrección en
    // GitHub Pages, el usuario la recibe de inmediato. Solo si no hay
    // conexión usamos la copia guardada como respaldo.
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  // Resto de archivos (íconos, manifest, etc.): cache-first con
  // actualización en segundo plano.
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
