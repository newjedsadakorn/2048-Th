#!/usr/bin/env node
/* รวม index.html + styles.css + app.js ให้เป็นไฟล์เดียวใน dist/
   ใช้ตอนอยากได้ HTML ก้อนเดียวไปแปะที่อื่น เช่น artifact หรือส่งให้คนอื่นเปิดตรงๆ
   วิธีใช้:  node build.js            */

const fs = require("fs");
const path = require("path");

const root = __dirname;
const out = path.join(root, "dist");

function read(f) {
  return fs.readFileSync(path.join(root, f), "utf8");
}

let html = read("index.html");
const css = read("styles.css");
const js = read("app.js");

// แทนที่ลิงก์ไฟล์ภายนอกด้วยเนื้อไฟล์จริง
html = html.replace(
  /\n?[ \t]*<link rel="stylesheet" href="styles\.css">/,
  "\n<style>\n" + css.trim() + "\n</style>"
);
html = html.replace(
  /\n?[ \t]*<script src="app\.js"><\/script>/,
  "\n<script>\n" + js.trim() + "\n</script>"
);

// ไฟล์เดียวไม่มี sw.js / manifest ให้โหลด จึงถอดออกกันคอนโซลขึ้น error
html = html.replace(/\n?[ \t]*<link rel="manifest"[^>]*>/, "");
html = html.replace(/\n?[ \t]*<link rel="icon"[^>]*>/, "");
html = html.replace(/\n?[ \t]*<link rel="apple-touch-icon"[^>]*>/, "");

if (html.includes('href="styles.css"') || html.includes('src="app.js"')) {
  console.error("build ล้มเหลว: แทนที่ลิงก์ไฟล์ไม่สำเร็จ ตรวจ index.html ว่ายังเขียนแท็กแบบเดิมอยู่ไหม");
  process.exit(1);
}

fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "index.html"), html);

const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
console.log("สร้าง dist/index.html แล้ว (" + kb + " KB)");
