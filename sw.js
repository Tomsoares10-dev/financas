// Finanças — funciona offline. Os dados ficam no aparelho (localStorage), nunca aqui.
const VERSAO = 'financas-v7';
const APP = ['./', 'index.html', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png', 'lib/jspdf.umd.min.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Página: tenta a internet primeiro (pega atualizações), senão usa a cópia salva.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(r => { const copia = r.clone(); caches.open(VERSAO).then(c => c.put('index.html', copia)); return r; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // Fontes e bibliotecas externas (leitor de comprovante, PDF): guarda depois da primeira vez.
  const externos = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'tessdata.projectnaptha.com'];
  if (externos.indexOf(url.hostname) >= 0) {
    e.respondWith(
      caches.match(req).then(r => r || fetch(req).then(res => { if (res.ok || res.type === 'opaque') { const copia = res.clone(); caches.open(VERSAO).then(c => c.put(req, copia)); } return res; }))
    );
    return;
  }

  // Arquivos do app: cópia salva primeiro.
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
  }
});
