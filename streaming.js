const http = require("http");

const PORT = 3000;
const HOST = "localhost";
const base = `http://${HOST}:${PORT}`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, base);
  res.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>`);
  let count = 0;
  let prevClassName = null;
  const id = setInterval(() => {
    count += 0.1;
    const className = `count-${Math.floor(Math.random() * 1e6)}`;

    res.write(`<!-- start section -->`);
    if (prevClassName) {
      res.write(`<style>.${prevClassName} { display: none; }</style>`);
    }
    res.write(`<h1 class="${className}">${count.toFixed(1)}</h1>`);
    res.write(`<!-- end section -->`);

    prevClassName = className;
  }, 100).unref();

  req.addListener("close", () => {
    clearInterval(id);
    res.end("");
  });
});
server.listen(PORT, HOST, () => {
  console.log(`Listening on ${base}`);
});
