const qs     = require('qs');
const fs     = require('fs');
const http   = require('http');
const server = http.createServer((req,rep)=>{
  const CUrl = (url)=>{return req.url.includes(url)};
  const Mrep = (serverState,ContentType,finish,write)=>{
    rep.writeHead(serverState,{'Content-Type':ContentType});
      if (write) {rep.write(write)};
      rep.end(finish);
    }
  if (req.method === 'GET') {
    switch (true) {
      case req.url==='/' :
        rep.writeHead(200, {'Content-Type':'text/html'});
        rep.end(fs.readFileSync('./index.html','utf-8'));
        break
      case CUrl('index02.html') :
        Mrep(200,'text/html',fs.readFileSync('./index02.html','utf-8'));
        break
    }
  } else if (req.method === 'POST') {
    switch (true) {
      case CUrl('checkJoin') :
        let formData = '';
        let parsingData = '';
        req.on('data',data=>{formData += data})
        req.on('end',()=>{
          parsingData = JSON.stringify(qs.parse(formData));
          rep.writeHead(200, {'Content-Type':'text/json'});
          rep.end(parsingData);
        })
        break
    }
  }
})
server.listen(2080, (err)=>{
  if (err) {throw err;}else{console.log('http Server Running Port : 2080')}
})