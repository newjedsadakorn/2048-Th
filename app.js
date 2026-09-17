(function(){
"use strict";

var VERSION = "1.3.0";

/* =======================================================
   1. ข้อมูลธีม
   ======================================================= */
var BGS = {
  mist:     {t:"หมอก",    bg:"#efedf2",board:"#e4e1ea",slot:"#dbd7e3",ink:"#1c1a22",dim:"#7d798a",chip:"#e9e6ef",chipH:"#ded9e8",dark:0},
  linen:    {t:"ผ้าลินิน", bg:"#f0ece5",board:"#e4ded3",slot:"#dbd4c7",ink:"#221f1a",dim:"#837d71",chip:"#eae4da",chipH:"#ded7ca",dark:0},
  sky:      {t:"ฟ้า",     bg:"#e9eef3",board:"#dbe3ea",slot:"#d0dae4",ink:"#16202a",dim:"#6f7f8d",chip:"#e3eaf0",chipH:"#d4dee8",dark:0},
  ink:      {t:"หมึก",    bg:"#141218",board:"#1e1b24",slot:"#262130",ink:"#eeeaf4",dim:"#928da0",chip:"#241f2c",chipH:"#2e2838",dark:1},
  midnight: {t:"เที่ยงคืน", bg:"#0e1420",board:"#161e2d",slot:"#1e283a",ink:"#e6ecf7",dim:"#8595ad",chip:"#1a2231",chipH:"#232d3f",dark:1},
  voidd:    {t:"ดำสนิท",  bg:"#09090b",board:"#131316",slot:"#1c1c20",ink:"#ededf0",dim:"#84848f",chip:"#171719",chipH:"#212125",dark:1}
};

// ช่อง 2-16 ผสมสีจากพื้นหลังเอง สีจริงเริ่มที่ 32
var RAMPS = {
  amethyst:{t:"อเมทิสต์", lock:0,c:["#a294dd","#241a3d","#8b79d0","#ffffff","#7563c2","#ffffff","#6150b2","#ffffff","#50409e","#ffffff","#3f3088","#f0eaff","#d8a441","#2a1c05","#c18f33","#241703","#e9c97b","#2a1c05"]},
  ocean:   {t:"มหาสมุทร",lock:0,c:["#7fbcd6","#0d2c38","#4fa3c7","#052430","#2f88b4","#ffffff","#1e6f9c","#ffffff","#145a84","#ffffff","#0e456b","#ffffff","#e0c268","#241d04","#c9a94f","#1d1703","#f0dfa4","#241d04"]},
  ember:   {t:"ถ่านไฟ",  lock:0,c:["#f0b562","#3b2405","#ea9440","#3b1f04","#e0722f","#ffffff","#cf5228","#ffffff","#b03a24","#ffffff","#8c2b20","#ffffff","#e8c44f","#2a1f04","#cfa93a","#211903","#f5e3a6","#2a1f04"]},
  mono:    {t:"ขาวดำ",   lock:0,c:["#9a97a2","#16151a","#7d7a86","#ffffff","#62606b","#ffffff","#4a4852","#ffffff","#35333c","#ffffff","#232228","#f0eff2","#f0eff2","#16151a","#d9d7de","#16151a","#16151a","#f0eff2"]},
  forest:  {t:"ป่า",     lock:0,c:["#86bd86","#122a15","#62a466","#0c2410","#438a4c","#ffffff","#2f7040","#ffffff","#225a33","#ffffff","#174527","#ffffff","#d9b455","#261d04","#c09b3f","#1d1603","#ecd89d","#261d04"]},
  neon:    {t:"นีออน",   lock:1,c:["#5de0c8","#052420","#35c9d8","#04222a","#4b9ef0","#03182e","#7b6ef5","#ffffff","#b455ef","#ffffff","#ef4fa8","#ffffff","#ffe45e","#2a2103","#ffc43d","#2a1d03","#ffffff","#111114"]},
  sakura:  {t:"ซากุระ",  lock:1,c:["#f2b3c4","#3d1a26","#e990a9","#3d1622","#dd6f92","#ffffff","#c95179","#ffffff","#ad3c62","#ffffff","#8a2d4c","#ffffff","#e8c98f","#2c1d10","#cfae70","#22160c","#f7e6c9","#2c1d10"]},
  gold:    {t:"ทองคำ",   lock:1,c:["#d7c08a","#2e2410","#c8aa66","#2a2008","#b8934a","#ffffff","#a37c33","#ffffff","#8a6626","#ffffff","#6d4f1b","#ffffff","#f5d98a","#2e2205","#e0c36a","#241a03","#fff3d0","#2e2205"]},
  plasma:  {t:"พลาสมา",  lock:1,c:["#9b7fe0","#1d1235","#8560e2","#ffffff","#a44ce0","#ffffff","#c33bc7","#ffffff","#d62f96","#ffffff","#a81f6e","#ffffff","#38e0d0","#04302c","#24bdb0","#03211f","#c9fff8","#04302c"]},
  ice:     {t:"น้ำแข็ง",  lock:1,c:["#a8c8dd","#12242f","#85aecb","#0d1d28","#6693b6","#ffffff","#4d789d","#ffffff","#3a5f80","#ffffff","#2a4661","#ffffff","#dfe9f2","#16242f","#c2d4e3","#16242f","#ffffff","#16242f"]},
  clay:    {t:"ดินเผา",  lock:1,c:["#d8a68d","#3a1f14","#c9876a","#351a10","#b56a4e","#ffffff","#9c5139","#ffffff","#7f3d2b","#ffffff","#632e21","#ffffff","#d9c08a","#2e2410","#bfa46f","#241b0a","#f0e3c6","#2e2410"]}
};

var FONTS = {
  fraunces: {t:"Fraunces", css:'"Fraunces",Georgia,serif', q:"Fraunces:SOFT,opsz,wght@40,9..144,400..700", v:'"SOFT" 40'},
  bricolage:{t:"Bricolage",css:'"Bricolage Grotesque",system-ui,sans-serif', q:"Bricolage+Grotesque:opsz,wght@12..96,400..700", v:"normal"},
  space:    {t:"Space",    css:'"Space Grotesk",system-ui,sans-serif', q:"Space+Grotesk:wght@400..700", v:"normal"},
  plex:     {t:"Plex Mono",css:'"IBM Plex Mono",ui-monospace,monospace', q:"IBM+Plex+Mono:wght@400;500;600;700", v:"normal"},
  outfit:   {t:"Outfit",   css:'"Outfit",system-ui,sans-serif', q:"Outfit:wght@300..700", v:"normal"},
  playfair: {t:"Playfair", css:'"Playfair Display",Georgia,serif', q:"Playfair+Display:wght@400..700", v:"normal"}
};

// rc=กล่องใหญ่ ru=ปุ่ม rs=ช่องเล็ก rt=ช่องเกม pad=ระยะขอบในกล่อง
// ระยะขอบต้องโตตามมุมโค้ง ไม่งั้นข้อความจะชนส่วนโค้ง
var RADII = {
  sharp:{t:"คม",  rc:"9px",  ru:"7px",   rs:"5px",  rt:"7px",   pad:"16px"},
  soft: {t:"โค้ง", rc:"18px", ru:"11px",  rs:"8px",  rt:"18.5%", pad:"17px"},
  round:{t:"กลม", rc:"26px", ru:"999px", rs:"13px", rt:"50%",   pad:"21px"}
};

var PRESETS = [
  {t:"เริ่มต้น",  bg:"mist",     ramp:"amethyst", font:"fraunces",  radius:"soft"},
  {t:"กลางคืน",  bg:"ink",      ramp:"amethyst", font:"fraunces",  radius:"soft"},
  {t:"กระดาษ",   bg:"linen",    ramp:"mono",     font:"playfair",  radius:"sharp"},
  {t:"ห้องแล็บ",  bg:"voidd",    ramp:"neon",     font:"plex",      radius:"sharp"},
  {t:"ทะเลเช้า", bg:"sky",      ramp:"ocean",    font:"outfit",    radius:"round"},
  {t:"เตาไฟ",    bg:"midnight", ramp:"ember",    font:"bricolage", radius:"soft"}
];

var MODES = {m3:{t:"3 × 3",n:3}, m4:{t:"4 × 4",n:4}, m5:{t:"5 × 5",n:5}, daily:{t:"ท้าทายประจำวัน",n:4}};
var MODE_KEYS = ["m3","m4","m5"];
var THAI_MON = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
var THAI_MON_S = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
var DOW = ["อา","จ","อ","พ","พฤ","ศ","ส"];

// ของรางวัลหมุนทุกเดือน ต้องเก็บให้ครบก่อนขึ้นเดือนใหม่
var UNLOCKABLE = ["neon","sakura","gold","plasma","ice","clay"];
var TIERS = [3, 8, 15, 22];
function monthRamps(m){
  var i = m % UNLOCKABLE.length;
  return [UNLOCKABLE[i], UNLOCKABLE[(i+1)%UNLOCKABLE.length], UNLOCKABLE[(i+2)%UNLOCKABLE.length]];
}

/* =======================================================
   2. ที่เก็บข้อมูล
   ======================================================= */
var KEY = "g2048.profile.v1";
var P = {
  v:VERSION, name:"", theme:{bg:"auto", ramp:"amethyst", font:"fraunces", radius:"soft"},
  sound:false, anim:true, undo:true,
  best:{m3:0,m4:0,m5:0}, bestTile:{m3:0,m4:0,m5:0},
  checkins:[], unlocked:{}, medals:[],
  stats:{games:0,wins:0,score:0,secs:0,topTile:0}, history:[], daily:{}
};
function loadP(){
  try{
    var raw = localStorage.getItem(KEY);
    if (raw){
      var o = JSON.parse(raw);
      for (var k in o) if (Object.prototype.hasOwnProperty.call(o,k)) P[k] = o[k];
    }
  }catch(e){}
  if (!P.unlocked) P.unlocked = {};
  if (!P.medals) P.medals = [];
  P.v = VERSION;
}
var saveT = null;
function saveP(){
  clearTimeout(saveT);
  saveT = setTimeout(function(){ try{ localStorage.setItem(KEY, JSON.stringify(P)); }catch(e){} }, 120);
}
loadP();

/* =======================================================
   3. ธีม
   ======================================================= */
var loadedFonts = {fraunces:1};
function ensureFont(k){
  if (loadedFonts[k]) return;
  loadedFonts[k] = 1;
  var l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=" + FONTS[k].q + "&display=swap";
  document.head.appendChild(l);
}
function sysDark(){ return window.matchMedia("(prefers-color-scheme: dark)").matches; }
function bgKey(){ return P.theme.bg === "auto" ? (sysDark() ? "ink" : "mist") : P.theme.bg; }
function curBg(){ return BGS[bgKey()] || BGS.mist; }
function rampAllowed(k){ var r = RAMPS[k]; return !!r && (!r.lock || !!P.unlocked[k]); }
function curRamp(){ return rampAllowed(P.theme.ramp) ? RAMPS[P.theme.ramp] : RAMPS.amethyst; }

function applyTheme(){
  var b = curBg(), r = curRamp(), f = FONTS[P.theme.font] || FONTS.fraunces, rd = RADII[P.theme.radius] || RADII.soft;
  ensureFont(P.theme.font);
  var s = document.documentElement.style;
  s.setProperty("--bg", b.bg); s.setProperty("--board", b.board); s.setProperty("--slot", b.slot);
  s.setProperty("--ink", b.ink); s.setProperty("--dim", b.dim);
  s.setProperty("--chip", b.chip); s.setProperty("--chip-h", b.chipH);
  s.setProperty("--accent", r.c[8]); s.setProperty("--accent-ink", r.c[9]);
  s.setProperty("--rc", rd.rc); s.setProperty("--ru", rd.ru);
  s.setProperty("--rs", rd.rs); s.setProperty("--rt", rd.rt);
  s.setProperty("--cpad", rd.pad);
  s.setProperty("--fnum", f.css); s.setProperty("--fvar", f.v);
  s.setProperty("--edge", b.dark ? "rgba(255,255,255,.075)" : "rgba(0,0,0,.055)");
  s.setProperty("--ok",     b.dark ? "#2f5240" : "#cfe3d3");
  s.setProperty("--ok-2",   b.dark ? "#3d6b50" : "#b2d5bc");
  s.setProperty("--ok-ink", b.dark ? "#d5ebdc" : "#2c4a35");
  s.setProperty("--shadow", b.dark ? "0 1px 2px rgba(0,0,0,.4), 0 6px 16px rgba(0,0,0,.3)"
                                   : "0 1px 2px rgba(34,28,52,.07), 0 5px 14px rgba(34,28,52,.055)");
  document.documentElement.style.colorScheme = b.dark ? "dark" : "light";
  G.fvar = f.v; G.rad = null;
  if (G.grid && view === "game") sizeBoard();
}
function tileColor(v){
  var r = curRamp().c;
  var ad = {2:[5,55], 4:[10,68], 8:[16,80], 16:[23,92]}[v];
  if (ad) return ["color-mix(in srgb, var(--ink) " + ad[0] + "%, var(--slot))",
                  "color-mix(in srgb, var(--ink) " + ad[1] + "%, transparent)"];
  var i = Math.round(Math.log(v) / Math.LN2) - 5;
  if (i < 0) i = 0;
  if (i > 8) i = 8;
  return [r[i*2], r[i*2+1]];
}

/* =======================================================
   4. เช็คอิน
   ======================================================= */
function iso(d){ return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0"); }
function today(){ return iso(new Date()); }
function monthPrefix(d){ d = d || new Date(); return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0"); }
function checkedToday(){ return P.checkins.indexOf(today()) >= 0; }
function monthCount(){
  var p = monthPrefix(), n = 0;
  P.checkins.forEach(function(d){ if (d.indexOf(p) === 0) n++; });
  return n;
}
function streakDates(){
  if (!P.checkins.length) return [];
  var set = {}; P.checkins.forEach(function(d){ set[d] = 1; });
  var d = new Date(), out = [];
  if (!set[iso(d)]) d.setDate(d.getDate() - 1);
  while (set[iso(d)]){ out.push(iso(d)); d.setDate(d.getDate() - 1); }
  return out;
}
function streak(){ return streakDates().length; }
function daysLeftInMonth(){
  var n = new Date();
  return new Date(n.getFullYear(), n.getMonth()+1, 0).getDate() - n.getDate();
}
function syncUnlocks(){
  var got = monthCount(), rs = monthRamps(new Date().getMonth()), changed = false;
  TIERS.forEach(function(d, i){
    if (got < d) return;
    if (i < 3){
      if (!P.unlocked[rs[i]]){ P.unlocked[rs[i]] = 1; changed = true; }
    } else {
      var mk = monthPrefix();
      if (P.medals.indexOf(mk) < 0){ P.medals.push(mk); changed = true; }
    }
  });
  if (changed) saveP();
  return changed;
}
function doCheckIn(){
  if (checkedToday()) return;
  P.checkins.push(today());
  if (P.checkins.length > 500) P.checkins = P.checkins.slice(-500);
  syncUnlocks();
  saveP(); applyTheme(); renderDaily(); renderMenu();
}

/* =======================================================
   5. เครื่องเกม
   ======================================================= */
var G = {n:4, mode:"m4", grid:null, score:0, uid:1, over:false, won:false, keep:false,
         prev:null, rng:Math.random, step:0, size:0, live:false, t0:0, rad:null, fvar:'"SOFT" 40'};
var stage = document.getElementById("stage");
var wrapEl = document.getElementById("stagewrap");
var gameView = document.querySelector('[data-view="game"]');
var slotsEl = document.getElementById("slots");
var tilesEl = document.getElementById("tiles");
var scoreEl = document.getElementById("score");
var bestEl  = document.getElementById("best");
var undoBtn = document.getElementById("undo");

function mulberry32(a){
  return function(){
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function seedOfToday(){
  var s = today(), h = 2166136261;
  for (var i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function emptyGrid(n){
  var g = [];
  for (var y = 0; y < n; y++){ g.push([]); for (var x = 0; x < n; x++) g[y].push(null); }
  return g;
}
function mk(x,y,v){ return {id:G.uid++, x:x, y:y, v:v, prev:null, from:null}; }
function freeCells(){
  var o = [];
  for (var y = 0; y < G.n; y++) for (var x = 0; x < G.n; x++) if (!G.grid[y][x]) o.push({x:x,y:y});
  return o;
}
function spawn(){
  var f = freeCells();
  if (!f.length) return;
  var c = f[Math.floor(G.rng() * f.length)];
  G.grid[c.y][c.x] = mk(c.x, c.y, G.rng() < 0.9 ? 2 : 4);
}
function eachTile(fn){
  for (var y = 0; y < G.n; y++) for (var x = 0; x < G.n; x++) if (G.grid[y][x]) fn(G.grid[y][x]);
}
function snap(){
  var g = [];
  for (var y = 0; y < G.n; y++){ g.push([]); for (var x = 0; x < G.n; x++) g[y].push(G.grid[y][x] ? G.grid[y][x].v : 0); }
  return {g:g, score:G.score};
}
function topTile(){ var m = 0; eachTile(function(t){ if (t.v > m) m = t.v; }); return m; }

var VEC = {up:{x:0,y:-1}, right:{x:1,y:0}, down:{x:0,y:1}, left:{x:-1,y:0}};
function within(p){ return p.x>=0 && p.x<G.n && p.y>=0 && p.y<G.n; }
function farthest(cell, v){
  var prev;
  do { prev = cell; cell = {x:prev.x+v.x, y:prev.y+v.y}; }
  while (within(cell) && !G.grid[cell.y][cell.x]);
  return {far:prev, next:within(cell) ? G.grid[cell.y][cell.x] : null};
}
function canMove(){
  if (freeCells().length) return true;
  for (var y = 0; y < G.n; y++) for (var x = 0; x < G.n; x++){
    var t = G.grid[y][x];
    if (x < G.n-1 && G.grid[y][x+1].v === t.v) return true;
    if (y < G.n-1 && G.grid[y+1][x].v === t.v) return true;
  }
  return false;
}
function move(dir){
  if (G.over || !G.live) return;
  var v = VEC[dir], xs = [], ys = [], moved = false, gained = 0, bigMerge = 0;
  for (var i = 0; i < G.n; i++){ xs.push(i); ys.push(i); }
  if (v.x === 1) xs.reverse();
  if (v.y === 1) ys.reverse();
  var before = snap();
  eachTile(function(t){ t.prev = {x:t.x, y:t.y}; t.from = null; });

  xs.forEach(function(x){
    ys.forEach(function(y){
      var t = G.grid[y][x];
      if (!t) return;
      var r = farthest({x:x,y:y}, v), next = r.next;
      if (next && next.v === t.v && !next.from){
        var m = mk(next.x, next.y, t.v * 2);
        m.from = [t, next];
        G.grid[next.y][next.x] = m;
        G.grid[y][x] = null;
        t.x = next.x; t.y = next.y;
        gained += m.v;
        if (m.v > bigMerge) bigMerge = m.v;
        if (m.v >= 2048 && !G.won) G.won = true;
        moved = true;
      } else if (r.far.x !== x || r.far.y !== y){
        G.grid[y][x] = null;
        G.grid[r.far.y][r.far.x] = t;
        t.x = r.far.x; t.y = r.far.y;
        moved = true;
      }
    });
  });

  if (!moved){ nudge(v); return; }

  G.prev = before;
  undoBtn.disabled = !P.undo;
  G.score += gained;
  var bk = G.mode === "daily" ? null : G.mode;
  if (bk && G.score > (P.best[bk]||0)){ P.best[bk] = G.score; saveP(); }
  spawn();
  renderBoard(false);
  paintScore(gained > 0);
  if (gained > 0) floatGain(gained);
  if (bigMerge >= 64) beep(bigMerge);

  if (G.won && !G.keep){ setTimeout(function(){ veil("2048", "ไปต่อได้ถ้ายังไหว", true); }, 420); return; }
  if (!canMove()) finish();
}
function finish(){
  G.over = true;
  var t = topTile(), secs = Math.round((Date.now() - G.t0)/1000);
  P.stats.games++; P.stats.score += G.score; P.stats.secs += secs;
  if (G.won) P.stats.wins++;
  if (t > P.stats.topTile) P.stats.topTile = t;
  if (G.mode !== "daily" && t > (P.bestTile[G.mode]||0)) P.bestTile[G.mode] = t;
  if (G.mode === "daily"){
    var d = P.daily[today()] || {best:0, tile:0};
    if (G.score > d.best){ d.best = G.score; d.tile = t; }
    P.daily[today()] = d;
  }
  P.history.unshift({m:G.mode, s:G.score, t:t, d:today(), sec:secs});
  if (P.history.length > 12) P.history.length = 12;
  saveP();
  submitScore();
  setTimeout(function(){ veil("ตันแล้ว", "คะแนน " + fmt(G.score) + " · ช่องสูงสุด " + t, false); }, 220);
}
var nudgeT = null;
function nudge(v){
  if (!P.anim) return;
  clearTimeout(nudgeT);
  stage.style.transform = "translate(" + (v.x*5) + "px," + (v.y*5) + "px)";
  nudgeT = setTimeout(function(){ stage.style.transform = ""; }, 110);
}

function fmt(n){ return (n||0).toLocaleString("en-US"); }
function radiusPx(){
  if (G.rad) return G.rad;
  var rt = getComputedStyle(document.documentElement).getPropertyValue("--rt").trim();
  G.rad = (rt.indexOf("%") > 0) ? Math.round(G.size * parseFloat(rt) / 100) + "px" : rt;
  return G.rad;
}
function sizeBoard(){
  // ตอนเล่นเต็มจอ กระดานต้องพอดีกับด้านที่แคบกว่าของพื้นที่ว่าง
  var avail = wrapEl.clientWidth;
  var h = wrapEl.clientHeight;
  if (document.body.classList.contains("playing") && h) avail = Math.min(avail, h);
  var w = Math.floor(avail);
  if (w < 120) return;
  stage.style.width = w + "px";

  var pad = Math.round(w * 0.032), gap = Math.round(w * (G.n >= 5 ? 0.022 : 0.028));
  G.size = (w - pad*2 - gap*(G.n-1)) / G.n;
  G.step = G.size + gap;
  stage.style.setProperty("--pad", pad + "px");
  stage.style.setProperty("--gap", gap + "px");
  stage.style.setProperty("--size", G.size + "px");
  slotsEl.style.gridTemplateColumns = "repeat(" + G.n + ",1fr)";
  slotsEl.style.gridTemplateRows = "repeat(" + G.n + ",1fr)";
  slotsEl.innerHTML = "";
  G.rad = null;
  var rad = radiusPx();
  for (var i = 0; i < G.n*G.n; i++){
    var d = document.createElement("div");
    d.style.borderRadius = rad;
    slotsEl.appendChild(d);
  }
  renderBoard(true);
}
function fontFor(v){
  var d = String(v).length, r;
  if (d <= 2) r = 0.43; else if (d === 3) r = 0.355; else if (d === 4) r = 0.275; else r = 0.215;
  return G.size * r;
}
function makeEl(t, at){
  var c = tileColor(t.v);
  var e = document.createElement("div");
  e.className = "tile";
  e.style.background = c[0];
  e.style.color = c[1];
  e.style.borderRadius = radiusPx();
  var fs = fontFor(t.v);
  e.style.fontSize = fs.toFixed(1) + "px";
  var fv = G.fvar || "normal";
  e.style.fontVariationSettings = (fv === "normal" ? "" : fv + ", ") +
    '"opsz" ' + Math.round(Math.min(144, Math.max(14, fs))) + ', "wght" ' + (t.v >= 128 ? 600 : 550);
  e.textContent = t.v;
  var tf = "translate(" + (at.x*G.step) + "px," + (at.y*G.step) + "px)";
  e.style.setProperty("--tf", tf);
  e.style.transform = tf;
  return e;
}
function moveEl(e, x, y){
  var tf = "translate(" + (x*G.step) + "px," + (y*G.step) + "px)";
  e.style.setProperty("--tf", tf);
  e.style.transform = tf;
}
function renderBoard(instant){
  if (!G.grid) return;
  if (!P.anim) instant = true;
  tilesEl.innerHTML = "";
  var pending = [];
  eachTile(function(t){
    if (t.from && !instant){
      t.from.forEach(function(src){
        var e = makeEl(src, src.prev || {x:src.x, y:src.y});
        tilesEl.appendChild(e);
        pending.push(function(){ moveEl(e, t.x, t.y); });
      });
      var m = makeEl(t, {x:t.x, y:t.y});
      m.style.opacity = "0";
      tilesEl.appendChild(m);
      setTimeout(function(){ m.style.opacity = ""; m.classList.add("merge"); }, 112);
    } else if (t.prev && !instant){
      var e2 = makeEl(t, t.prev);
      tilesEl.appendChild(e2);
      pending.push(function(){ moveEl(e2, t.x, t.y); });
    } else {
      var e3 = makeEl(t, {x:t.x, y:t.y});
      if (!instant) e3.classList.add("pop");
      tilesEl.appendChild(e3);
    }
  });
  if (pending.length) requestAnimationFrame(function(){ requestAnimationFrame(function(){ pending.forEach(function(f){ f(); }); }); });
  eachTile(function(t){ t.prev = null; t.from = null; });
}
function paintScore(bump){
  scoreEl.textContent = fmt(G.score);
  var bk = G.mode === "daily" ? null : G.mode;
  bestEl.textContent = bk ? fmt(P.best[bk]||0) : fmt((P.daily[today()]||{}).best || 0);
  if (bump && P.anim){ scoreEl.classList.remove("bump"); void scoreEl.offsetWidth; scoreEl.classList.add("bump"); }
}
function floatGain(n){
  if (!P.anim) return;
  var f = document.createElement("div");
  f.className = "float"; f.textContent = "+" + n;
  var r = scoreEl.getBoundingClientRect();
  f.style.left = r.right + "px"; f.style.top = (r.top - 4) + "px";
  document.body.appendChild(f);
  setTimeout(function(){ f.remove(); }, 780);
}
var actx = null;
function beep(v){
  if (!P.sound) return;
  try{
    var C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    if (!actx) actx = new C();
    if (actx.state === "suspended") actx.resume();
    var st = Math.min(7, Math.round(Math.log(v)/Math.LN2) - 6);
    var o = actx.createOscillator(), g = actx.createGain();
    o.type = "triangle"; o.frequency.value = 330 * Math.pow(2, st/7);
    g.gain.setValueAtTime(0.0001, actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.055, actx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 0.3);
    o.connect(g); g.connect(actx.destination);
    o.start(); o.stop(actx.currentTime + 0.32);
  }catch(e){}
}
function killVeil(){ var v = stage.querySelector(".veil"); if (v) v.remove(); }
function veil(title, sub, cont){
  killVeil();
  var v = document.createElement("div"); v.className = "veil";
  var p = document.createElement("p"); p.textContent = title;
  var s = document.createElement("small"); s.textContent = sub; p.appendChild(s);
  var row = document.createElement("div"); row.className = "vrow";
  if (cont){
    var go = document.createElement("button");
    go.className = "btn primary"; go.type = "button"; go.textContent = "ไปต่อ";
    go.addEventListener("click", function(){ G.keep = true; killVeil(); });
    row.appendChild(go);
  }
  var again = document.createElement("button");
  again.className = "btn"; again.type = "button"; again.textContent = "เริ่มใหม่";
  again.addEventListener("click", function(){ startGame(G.mode); });
  row.appendChild(again);
  var menu = document.createElement("button");
  menu.className = "btn"; menu.type = "button"; menu.textContent = "เมนู";
  menu.addEventListener("click", function(){ go2("menu"); });
  row.appendChild(menu);
  v.appendChild(p); v.appendChild(row);
  stage.appendChild(v);
}
function startGame(mode){
  G.mode = mode;
  G.n = MODES[mode].n;
  G.rng = mode === "daily" ? mulberry32(seedOfToday()) : Math.random;
  G.grid = emptyGrid(G.n);
  G.score = 0; G.over = false; G.won = false; G.keep = false; G.prev = null;
  G.live = true; G.t0 = Date.now();
  undoBtn.disabled = true;
  undoBtn.style.display = P.undo ? "" : "none";
  killVeil();
  spawn(); spawn();
  document.getElementById("gameTitle").textContent = MODES[mode].t;
  document.getElementById("gameSide").textContent = mode === "daily" ? today() : "";
  go2("game");
  requestAnimationFrame(function(){ sizeBoard(); paintScore(false); });
}
function undo(){
  if (!G.prev || !P.undo) return;
  var s = G.prev;
  G.grid = emptyGrid(G.n);
  for (var y = 0; y < G.n; y++) for (var x = 0; x < G.n; x++) if (s.g[y][x]) G.grid[y][x] = mk(x,y,s.g[y][x]);
  G.score = s.score; G.over = false; G.prev = null;
  undoBtn.disabled = true;
  killVeil(); renderBoard(true); paintScore(false);
}

/* ---- กล่องยืนยัน ---- */
function ask(title, msg, okText, danger){
  return new Promise(function(res){
    var m = document.createElement("div"); m.className = "modal";
    var b = document.createElement("div"); b.className = "box";
    var h = document.createElement("h3"); h.textContent = title;
    var p = document.createElement("p"); p.textContent = msg;
    var row = document.createElement("div"); row.className = "vrow";
    var no = document.createElement("button");
    no.className = "btn"; no.type = "button"; no.textContent = "ยกเลิก";
    var yes = document.createElement("button");
    yes.className = "btn primary"; yes.type = "button"; yes.textContent = okText || "ตกลง";
    if (danger){ yes.style.background = "#c0392b"; yes.style.color = "#fff"; }
    function close(v){
      m.remove();
      document.removeEventListener("keydown", esc, true);
      res(v);
    }
    function esc(e){
      if (e.key === "Escape"){ e.stopPropagation(); e.preventDefault(); close(false); }
      if (e.key === "Enter"){ e.stopPropagation(); e.preventDefault(); close(true); }
    }
    no.addEventListener("click", function(){ close(false); });
    yes.addEventListener("click", function(){ close(true); });
    m.addEventListener("click", function(e){ if (e.target === m) close(false); });
    document.addEventListener("keydown", esc, true);
    row.appendChild(no); row.appendChild(yes);
    b.appendChild(h); b.appendChild(p); b.appendChild(row);
    m.appendChild(b);
    document.body.appendChild(m);
    yes.focus();
  });
}
function gameInProgress(){ return !!(G.grid && G.live && !G.over && G.score > 0); }
function confirmOverwrite(){
  if (!gameInProgress()) return Promise.resolve(true);
  return ask("เริ่มเกมใหม่?",
    "เกม" + MODES[G.mode].t + " ที่ค้างอยู่ " + fmt(G.score) + " คะแนน จะหายไป",
    "เริ่มใหม่");
}

var KEYS = {ArrowUp:"up",ArrowRight:"right",ArrowDown:"down",ArrowLeft:"left",
  w:"up",d:"right",s:"down",a:"left",W:"up",D:"right",S:"down",A:"left"};
document.addEventListener("keydown", function(e){
  if (e.target.tagName === "INPUT") return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (view !== "game") return;
  if (KEYS[e.key]){ e.preventDefault(); move(KEYS[e.key]); return; }
  if (e.key === "z" || e.key === "Z"){ e.preventDefault(); undo(); }
  if (e.key === "r" || e.key === "R"){
    e.preventDefault();
    confirmOverwrite().then(function(ok){ if (ok) startGame(G.mode); });
  }
});
var sx=0, sy=0, tracking=false;
// รับการปัดจากทั้งหน้าเกม เพื่อให้นิ้วออกนอกกระดานแล้วยังสั่งได้
gameView.addEventListener("pointerdown", function(e){
  if (e.target.closest(".veil") || e.target.closest("button")) return;
  tracking = true; sx = e.clientX; sy = e.clientY;
});
gameView.addEventListener("pointerup", function(e){
  if (!tracking) return;
  tracking = false;
  var dx = e.clientX - sx, dy = e.clientY - sy, ax = Math.abs(dx), ay = Math.abs(dy);
  if (Math.max(ax,ay) < 20) return;
  move(ax > ay ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
});
gameView.addEventListener("pointercancel", function(){ tracking = false; });
gameView.addEventListener("touchmove", function(e){ if (tracking) e.preventDefault(); }, {passive:false});
undoBtn.addEventListener("click", undo);
document.getElementById("restart").addEventListener("click", function(){
  confirmOverwrite().then(function(ok){ if (ok) startGame(G.mode); });
});
window.addEventListener("resize", function(){ if (view === "game") sizeBoard(); });

/* =======================================================
   6. กระดานคะแนนรวม
   ======================================================= */
var db = null, me = null, myRow = null, boardData = [], boardTab = "m4", unsub = null;
function initCloud(){
  if (!window.claude || !window.claude.use){ noteCloud(); return; }
  Promise.all([window.claude.use("db"), window.claude.use("user")]).then(function(r){
    db = r[0];
    var u = r[1];
    if (!u){ noteCloud(); return; }
    return u.id().then(function(id){
      me = id;
      if (!db || !me){ noteCloud(); return; }
      db.doc("scores/" + me).get().then(function(s){
        myRow = (s && s.exists) ? Object.assign({}, s.data()) : null;
        if (myRow && myRow.name && !P.name){ P.name = myRow.name; saveP(); renderMenu(); }
      }).catch(function(){});
      watchBoard();
      noteCloud();
    });
  }).catch(function(){ noteCloud(); });
}
function watchBoard(){
  if (!db || unsub) return;
  try{
    unsub = db.collection("scores").limit(200).onSnapshot(function(sn){
      boardData = [];
      sn.docs.forEach(function(d){ boardData.push({id:d.id, v:d.data() || {}}); });
      if (view === "scores") renderScores();
    }, function(){});
  }catch(e){}
}
function submitScore(){
  if (!db || !me) return;
  var row = myRow || {name:"", m3:0, m4:0, m5:0, t3:0, t4:0, t5:0, dailyDate:"", dailyBest:0};
  row.name = (P.name || "ผู้เล่น").slice(0,16);
  ["m3","m4","m5"].forEach(function(k){
    if ((P.best[k]||0) > (row[k]||0)) row[k] = P.best[k]||0;
    var tk = "t" + k.slice(1);
    if ((P.bestTile[k]||0) > (row[tk]||0)) row[tk] = P.bestTile[k]||0;
  });
  var d = P.daily[today()];
  if (d){ row.dailyDate = today(); row.dailyBest = d.best; row.dailyTile = d.tile; }
  row.at = Date.now();
  myRow = row;
  db.doc("scores/" + me).set(row).catch(function(){});
}
function noteCloud(){
  document.getElementById("scoreNote").textContent = (db && me)
    ? "กระดานรวมเห็นเฉพาะคนที่เปิดหน้านี้จากบัญชีในองค์กรเดียวกับเจ้าของเกม คะแนนส่งขึ้นเองเมื่อจบเกม"
    : "หน้านี้ยังต่อกระดานรวมไม่ได้ ตอนนี้แสดงเฉพาะสถิติในเครื่อง";
}

/* =======================================================
   7. หน้าจอ
   ======================================================= */
var view = "menu";
function go2(v){
  view = v;
  document.querySelectorAll(".view").forEach(function(s){ s.classList.toggle("on", s.dataset.view === v); });
  document.body.classList.toggle("playing", v === "game");
  window.scrollTo(0,0);
  if (v === "game") requestAnimationFrame(sizeBoard);
  if (v === "menu") renderMenu();
  if (v === "scores") renderScores();
  if (v === "daily") renderDaily();
  if (v === "theme") renderTheme();
  if (v === "stats") renderStats();
  if (v === "settings") renderSettings();
}
document.addEventListener("click", function(e){
  var b = e.target.closest("[data-go]");
  if (b) go2(b.dataset.go);
});

/* ---- เมนู ---- */
var pickedMode = "m4";
function renderMenu(){
  document.getElementById("whoName").textContent = P.name || "ผู้เล่น";
  var mEl = document.getElementById("modes");
  if (!mEl.children.length){
    MODE_KEYS.forEach(function(k){
      var b = document.createElement("button");
      b.type = "button"; b.textContent = MODES[k].t;
      b.addEventListener("click", function(){ pickedMode = k; renderMenu(); });
      mEl.appendChild(b);
    });
  }
  Array.prototype.forEach.call(mEl.children, function(b, i){
    b.setAttribute("aria-pressed", MODE_KEYS[i] === pickedMode ? "true" : "false");
  });
  document.getElementById("menuBest").textContent = fmt(P.best[pickedMode] || 0);

  var alive = !!(G.grid && G.live && !G.over);
  var rb = document.getElementById("resumeBtn");
  rb.hidden = !alive;
  if (alive){
    document.getElementById("resumeInfo").textContent = MODES[G.mode].t + " · " + fmt(G.score);
    document.getElementById("playBtn").textContent = (pickedMode === G.mode) ? "เริ่มเกมใหม่" : "เล่น";
  } else {
    document.getElementById("playBtn").textContent = "เล่น";
  }

  var st = streak();
  var pill = document.getElementById("streakPill");
  pill.hidden = st < 1;
  pill.textContent = "🔥 " + st + " วัน";
  document.getElementById("navStreak").textContent = checkedToday() ? "เช็ควันนี้แล้ว" : "ยังไม่เช็ควันนี้";

  var d = new Date();
  document.getElementById("dailyMon").textContent = THAI_MON_S[d.getMonth()];
  document.getElementById("dailyDay").textContent = d.getDate();
  var dd = P.daily[today()];
  document.getElementById("dailySub").textContent = dd ? ("วันนี้ทำได้ " + fmt(dd.best)) : "กระดานเดียวกันทุกคน วันละหนึ่งชุด";

  document.getElementById("verMenu").textContent = "เวอร์ชัน " + VERSION;
}
document.getElementById("playBtn").addEventListener("click", function(){
  confirmOverwrite().then(function(ok){ if (ok) startGame(pickedMode); });
});
document.getElementById("resumeBtn").addEventListener("click", function(){
  if (!G.grid) return;
  go2("game");
  requestAnimationFrame(function(){ sizeBoard(); paintScore(false); });
});
document.getElementById("dailyBtn").addEventListener("click", function(){
  if (G.mode === "daily" && gameInProgress()){ go2("game"); requestAnimationFrame(function(){ sizeBoard(); paintScore(false); }); return; }
  confirmOverwrite().then(function(ok){ if (ok) startGame("daily"); });
});

/* ---- กระดานคะแนน ---- */
function renderScores(){
  var tabs = document.getElementById("scoreTabs");
  if (!tabs.children.length){
    [["m3","3×3"],["m4","4×4"],["m5","5×5"],["daily","วันนี้"]].forEach(function(p){
      var b = document.createElement("button");
      b.type = "button"; b.textContent = p[1];
      b.addEventListener("click", function(){ boardTab = p[0]; renderScores(); });
      tabs.appendChild(b);
    });
  }
  ["m3","m4","m5","daily"].forEach(function(k,i){
    tabs.children[i].setAttribute("aria-pressed", k === boardTab ? "true" : "false");
  });

  var rows = document.getElementById("scoreRows");
  rows.innerHTML = "";
  var list = [];
  boardData.forEach(function(r){
    var v = r.v || {}, sc, tl;
    if (boardTab === "daily"){
      if (v.dailyDate !== today()) return;
      sc = v.dailyBest || 0; tl = v.dailyTile || 0;
    } else {
      sc = v[boardTab] || 0; tl = v["t" + boardTab.slice(1)] || 0;
    }
    if (!sc) return;
    list.push({id:r.id, name:v.name || "ผู้เล่น", sc:sc, tl:tl});
  });
  list.sort(function(a,b){ return b.sc - a.sc; });

  if (!list.length){
    var mySc = boardTab === "daily" ? ((P.daily[today()]||{}).best||0) : (P.best[boardTab]||0);
    var myTl = boardTab === "daily" ? ((P.daily[today()]||{}).tile||0) : (P.bestTile[boardTab]||0);
    if (mySc) list.push({id:"local", name:P.name || "ผู้เล่น", sc:mySc, tl:myTl});
  }
  if (!list.length){
    var e = document.createElement("div");
    e.className = "empty";
    e.textContent = "ยังไม่มีคะแนนในโหมดนี้ เล่นให้จบสักเกมแล้วคะแนนจะขึ้นมาเอง";
    rows.appendChild(e);
    return;
  }
  list.slice(0,20).forEach(function(r, i){
    var d = document.createElement("div");
    d.className = "row" + ((r.id === me || r.id === "local") ? " me" : "");
    var rk = document.createElement("span"); rk.className = "rk"; rk.textContent = (i+1);
    var nm = document.createElement("span"); nm.className = "nm";
    nm.textContent = r.name;
    var em = document.createElement("em"); em.textContent = "ช่องสูงสุด " + (r.tl || "-");
    nm.appendChild(em);
    var sc = document.createElement("span"); sc.className = "sc"; sc.textContent = fmt(r.sc);
    d.appendChild(rk); d.appendChild(nm); d.appendChild(sc);
    rows.appendChild(d);
  });
}

/* ---- เช็คอิน ---- */
function renderDaily(){
  syncUnlocks();
  var now = new Date(), y = now.getFullYear(), m = now.getMonth();
  var got = monthCount(), left = daysLeftInMonth(), st = streak();

  document.getElementById("calMonth").textContent = THAI_MON[m] + " " + (y + 543);
  document.getElementById("calSub").textContent = "เดือนนี้เช็คแล้ว " + got + " วัน · เหลืออีก " + left + " วันก่อนขึ้นเดือนใหม่";
  document.getElementById("streakSide").textContent = st ? "🔥 " + st : "";

  var set = {}; P.checkins.forEach(function(d){ set[d] = 1; });
  var run = {}; streakDates().forEach(function(d){ run[d] = 1; });

  var g = document.getElementById("calGrid");
  g.innerHTML = "";
  DOW.forEach(function(w){
    var h = document.createElement("div"); h.className = "dow"; h.textContent = w; g.appendChild(h);
  });
  var first = new Date(y, m, 1).getDay(), days = new Date(y, m+1, 0).getDate(), td = now.getDate();
  for (var i = 0; i < first; i++){
    var p = document.createElement("div"); p.className = "d pad"; g.appendChild(p);
  }
  for (var d = 1; d <= days; d++){
    var key = y + "-" + String(m+1).padStart(2,"0") + "-" + String(d).padStart(2,"0");
    var cls = "d ";
    if (set[key]) cls += run[key] ? "got run " : "got ";
    else if (d > td) cls += "soon ";
    else if (d !== td) cls += "miss ";
    if (d === td) cls += "today";
    var el = document.createElement("div");
    el.className = cls.trim();
    el.textContent = d;
    if (run[key] && st >= 3){
      var f = document.createElement("span"); f.className = "fire"; f.textContent = "🔥";
      el.appendChild(f);
    }
    g.appendChild(el);
  }

  var btn = document.getElementById("checkBtn");
  btn.disabled = checkedToday();
  btn.textContent = checkedToday() ? ("เช็คอินวันนี้แล้ว · 🔥 " + st) : "เช็คอินวันนี้";

  var rs = monthRamps(m), rw = document.getElementById("rewards");
  rw.innerHTML = "";
  TIERS.forEach(function(need, i){
    var done = got >= need;
    var row = document.createElement("div");
    row.className = "rw" + (done ? " done" : "");
    var n = document.createElement("span"); n.className = "n"; n.textContent = need;

    var demo = document.createElement("span");
    var title, sub;
    if (i < 3){
      var rk = rs[i], r = RAMPS[rk];
      demo.className = "demo";
      [r.c[0], r.c[6], r.c[12]].forEach(function(col){
        var b = document.createElement("i"); b.style.background = col; demo.appendChild(b);
      });
      title = "ชุดสี " + r.t;
      sub = done ? "ได้แล้ว" : (P.unlocked[rk] ? "มีอยู่แล้ว" : "อีก " + (need - got) + " วัน");
    } else {
      demo.className = "demo medal"; demo.textContent = "🏅";
      title = "เหรียญ" + THAI_MON[m];
      sub = done ? "ได้แล้ว" : "อีก " + (need - got) + " วัน";
    }
    var t = document.createElement("span"); t.className = "t"; t.textContent = title;
    var s = document.createElement("span"); s.className = "s"; s.textContent = sub;
    row.appendChild(n); row.appendChild(demo); row.appendChild(t); row.appendChild(s);
    rw.appendChild(row);
  });

  document.getElementById("rewardNote").textContent =
    "ของรางวัลเปลี่ยนชุดใหม่ทุกวันที่ 1 ถ้าเก็บไม่ครบภายในเดือนนี้ ชุดนี้จะหมุนกลับมาอีกทีในอีก 6 เดือน ของที่ได้แล้วเก็บไว้ถาวร ตอนนี้มีเหรียญ " + P.medals.length + " เหรียญ";
}
document.getElementById("checkBtn").addEventListener("click", doCheckIn);

/* ---- ธีม ---- */
function swatchEl(colors, on, locked, label){
  var b = document.createElement("button");
  b.className = "sw" + (locked ? " lock" : "");
  b.type = "button";
  b.setAttribute("aria-pressed", on ? "true" : "false");
  b.title = label || "";
  b.setAttribute("aria-label", label || "");
  var h = document.createElement("span"); h.className = "half";
  colors.forEach(function(c){ var i = document.createElement("i"); i.style.background = c; h.appendChild(i); });
  b.appendChild(h);
  return b;
}
function renderTheme(){
  document.getElementById("themeSide").textContent = RADII[P.theme.radius].t;

  var pv = document.getElementById("preview");
  pv.innerHTML = "";
  [4, 32, 256, 2048].forEach(function(v){
    var c = tileColor(v);
    var i = document.createElement("i");
    i.style.background = c[0]; i.style.color = c[1];
    i.textContent = v;
    i.style.fontSize = (v > 999 ? 14 : 19) + "px";
    pv.appendChild(i);
  });

  var ps = document.getElementById("presets");
  ps.innerHTML = "";
  PRESETS.forEach(function(p){
    var r = RAMPS[p.ramp], b = BGS[p.bg];
    var on = P.theme.bg === p.bg && P.theme.ramp === p.ramp && P.theme.font === p.font && P.theme.radius === p.radius;
    var locked = !rampAllowed(p.ramp);
    var el = swatchEl([b.bg, r.c[4], r.c[12]], on, locked, p.t);
    el.style.width = "68px";
    if (!locked) el.addEventListener("click", function(){
      P.theme = {bg:p.bg, ramp:p.ramp, font:p.font, radius:p.radius};
      saveP(); applyTheme(); renderTheme();
    });
    ps.appendChild(el);
  });

  var bs = document.getElementById("bgs");
  bs.innerHTML = "";
  var autoEl = swatchEl([BGS.mist.bg, BGS.ink.bg], P.theme.bg === "auto", false, "ตามระบบ");
  autoEl.addEventListener("click", function(){ P.theme.bg = "auto"; saveP(); applyTheme(); renderTheme(); });
  bs.appendChild(autoEl);
  Object.keys(BGS).forEach(function(k){
    var b = BGS[k];
    var el = swatchEl([b.bg, b.board, b.slot], P.theme.bg === k, false, b.t);
    el.addEventListener("click", function(){ P.theme.bg = k; saveP(); applyTheme(); renderTheme(); });
    bs.appendChild(el);
  });

  var rsEl = document.getElementById("ramps");
  rsEl.innerHTML = "";
  Object.keys(RAMPS).forEach(function(k){
    var r = RAMPS[k], locked = !rampAllowed(k);
    var el = swatchEl([r.c[0], r.c[6], r.c[12]], P.theme.ramp === k, locked,
      r.t + (locked ? " (ปลดล็อกจากเช็คอิน)" : ""));
    if (!locked) el.addEventListener("click", function(){ P.theme.ramp = k; saveP(); applyTheme(); renderTheme(); });
    rsEl.appendChild(el);
  });

  var fs = document.getElementById("fonts");
  fs.innerHTML = "";
  Object.keys(FONTS).forEach(function(k){
    ensureFont(k);
    var b = document.createElement("button");
    b.className = "fontsw"; b.type = "button";
    b.setAttribute("aria-pressed", P.theme.font === k ? "true" : "false");
    b.style.fontFamily = FONTS[k].css;
    b.textContent = "2048";
    b.title = FONTS[k].t;
    b.addEventListener("click", function(){ P.theme.font = k; saveP(); applyTheme(); renderTheme(); });
    fs.appendChild(b);
  });

  var rd = document.getElementById("radii");
  rd.innerHTML = "";
  Object.keys(RADII).forEach(function(k){
    var b = document.createElement("button");
    b.type = "button"; b.textContent = RADII[k].t;
    b.setAttribute("aria-pressed", P.theme.radius === k ? "true" : "false");
    b.addEventListener("click", function(){ P.theme.radius = k; saveP(); applyTheme(); renderTheme(); });
    rd.appendChild(b);
  });
}

/* ---- สถิติ ---- */
function renderStats(){
  var s = P.stats, g = document.getElementById("statGrid");
  var items = [
    ["เกมทั้งหมด", fmt(s.games)],
    ["แตะ 2048 ได้", fmt(s.wins) + " ครั้ง"],
    ["ช่องสูงสุดที่เคยทำ", fmt(s.topTile)],
    ["คะแนนรวม", fmt(s.score)],
    ["คะแนนเฉลี่ย", fmt(s.games ? Math.round(s.score/s.games) : 0)],
    ["เวลาเล่นรวม", Math.round(s.secs/60) + " นาที"]
  ];
  g.innerHTML = "";
  items.forEach(function(it){
    var d = document.createElement("div"); d.className = "stat";
    var sp = document.createElement("span"); sp.textContent = it[0];
    var b = document.createElement("b"); b.textContent = it[1];
    d.appendChild(sp); d.appendChild(b); g.appendChild(d);
  });

  var h = document.getElementById("history");
  h.innerHTML = "";
  if (!P.history.length){
    var e = document.createElement("div"); e.className = "empty";
    e.textContent = "ยังไม่มีเกมที่เล่นจบ";
    h.appendChild(e); return;
  }
  P.history.forEach(function(r){
    var d = document.createElement("div"); d.className = "row";
    var rk = document.createElement("span"); rk.className = "rk";
    rk.textContent = r.m === "daily" ? "วัน" : MODES[r.m].t.replace(/ /g,"");
    rk.style.width = "40px"; rk.style.fontSize = "12px";
    var nm = document.createElement("span"); nm.className = "nm";
    nm.textContent = "ช่องสูงสุด " + r.t;
    var em = document.createElement("em"); em.textContent = r.d + " · " + r.sec + " วิ";
    nm.appendChild(em);
    var sc = document.createElement("span"); sc.className = "sc"; sc.textContent = fmt(r.s);
    d.appendChild(rk); d.appendChild(nm); d.appendChild(sc);
    h.appendChild(d);
  });
}

/* ---- ตั้งค่า ---- */
var nameIn = document.getElementById("nameIn");
function tog(id, key, after){
  var b = document.getElementById(id);
  b.setAttribute("aria-pressed", P[key] ? "true" : "false");
  b.onclick = function(){
    P[key] = !P[key];
    b.setAttribute("aria-pressed", P[key] ? "true" : "false");
    saveP();
    if (after) after();
  };
}
function renderSettings(){
  nameIn.value = P.name || "";
  var bg = P.theme.bg === "auto" ? "ตามระบบ" : BGS[P.theme.bg].t;
  document.getElementById("themeSum").textContent =
    bg + " · " + curRamp().t + " · " + FONTS[P.theme.font].t + " · " + RADII[P.theme.radius].t;
  document.getElementById("verSet").textContent = "เวอร์ชัน " + VERSION;
  tog("tSound","sound");
  tog("tAnim","anim");
  tog("tUndo","undo", function(){ undoBtn.style.display = P.undo ? "" : "none"; });
}
nameIn.addEventListener("input", function(){ P.name = nameIn.value.slice(0,16); saveP(); renderMenu(); });
nameIn.addEventListener("blur", function(){ submitScore(); });
document.getElementById("wipe").addEventListener("click", function(){
  ask("ล้างข้อมูลทั้งหมด?",
      "ชื่อ สถิติ ธีม ของที่ปลดล็อก และประวัติเช็คอินในเครื่องนี้จะถูกลบ กู้คืนไม่ได้",
      "ล้างข้อมูล", true).then(function(ok){
    if (!ok) return;
    try{ localStorage.removeItem(KEY); }catch(e){}
    location.reload();
  });
});

/* =======================================================
   8. เริ่ม
   ======================================================= */
var mq = window.matchMedia("(prefers-color-scheme: dark)");
if (mq.addEventListener) mq.addEventListener("change", function(){ if (P.theme.bg === "auto") applyTheme(); });
try{
  if (screen.orientation && screen.orientation.lock){
    var pr = screen.orientation.lock("portrait");
    if (pr && pr.catch) pr.catch(function(){});
  }
}catch(e){}
window.addEventListener("orientationchange", function(){
  setTimeout(function(){ if (view === "game") sizeBoard(); }, 250);
});

syncUnlocks();
applyTheme();
renderMenu();
initCloud();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ if (view === "game") renderBoard(true); });

})();

/* ลงทะเบียน service worker สำหรับเล่นออฟไลน์ (ทำงานเฉพาะเมื่อเสิร์ฟผ่าน https หรือ localhost) */
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./sw.js").catch(function () {});
  });
}
