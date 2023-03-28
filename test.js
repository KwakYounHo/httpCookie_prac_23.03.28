const fs   = require('fs');
const http = require('http');
const server = http.createServer((req,rep)=>{
  // 함수 선언 =========================================
  const Mrep = (serverState,ContentType,finish,write)=>{
  rep.writeHead(serverState,{'Content-Type':ContentType});
    if (write) {rep.write(write)};
    rep.end(finish);
  }

  const Wreq = (method,url,callback)=>{
    if (req.method === method && req.url.includes(url)) {
      return callback()
    }
  }

  const checkUrl = (first,second)=>{
    return req.url.startsWith(first,second);
  }
  // ===================================================
  
  
  // 요청 응답 =========================================
  
  // 함수로 응답 해보기
  // Wreq('GET','/',()=>{
  //   Mrep(200,'text/html',fs.readFileSync('./index.html','utf-8'));
  // })
  // if (req.method === 'GET' && req.url === '/') {
    // Mrep(200,'text/html',fs.readFileSync('./index.html','utf-8'));
  // }
// 
  // Wreq('GET','index02.html',()=>{
    // Mrep(200,'text/html',fs.readFileSync('./index02.html','utf-8'));
  // })
// 
  // Wreq('GET','index.html',()=>{
    // Mrep(200,'text/html',fs.readFileSync('./index.html','utf-8'));
  // })

  // switch로 응답 해보기
  if (req.method === 'GET') {
    switch (req.url) {
      case checkUrl('/') :
        Mrep(200, 'text/html', fs.readFileSync('./index.html','utf-8'));
        break
      case checkUrl('/','index.html') :
        Mrep(200, 'text/html', fs.readFileSync('index.html','utf-8'));
        break
      case checkUrl('/','index02.html') :
        Mrep(200, 'text/html', fs.readFileSync('index02.html','utf-8'));
        break
    }
  } else if (req.method === 'POST') {
    
  }
  // ===================================================
})

server.listen(2080, (err)=>{
  if (err) {throw err;} else {console.log('server running port : 2080')}
})