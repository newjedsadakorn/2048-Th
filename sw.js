/* 2048 — service worker
   กลยุทธ์: ไฟล์ของเกมใช้ cache-first (เล่นออฟไลน์ได้)
            ฟอนต์จาก Google ใช้ stale-while-revalidate
   เวลาแก้ไฟล์เกม ให้ขยับ CACHE เป็นเวอร์ชันใหม่ ไม่งั้นเครื่องที่เคยเปิดจะยังเห็นของเก่า */

var VERSION = "1.2.0";
var SHELL = "2048-shell-" + VERSION;
var FONTS = "2048-fonts-v1";

var ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-maskable.svg"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(SHELL).then(function (c) {
      return c.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== SHELL && k !== FONTS) return caches.delete(k);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);

  // ฟอนต์: ส่งของที่แคชไว้ก่อน แล้วค่อยอัปเดตเบื้องหลัง
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(
      caches.open(FONTS).then(function (c) {
        return c.match(req).then(function (hit) {
          var net = fetch(req).then(function (res) {
            if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone());
            return res;
          }).catch(function () { return hit; });
          return hit || net;
        });
      })
    );
    return;
  }

  // นอกโดเมนตัวเอง (เช่น ระบบของ claude.ai) ปล่อยผ่าน ไม่แตะ
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.ok && res.type === "basic") {
          var copy = res.clone();
          caches.open(SHELL).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        // ออฟไลน์และไม่มีในแคช: ถ้าเป็นการเปิดหน้า ให้คืนหน้าเกม
        if (req.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
