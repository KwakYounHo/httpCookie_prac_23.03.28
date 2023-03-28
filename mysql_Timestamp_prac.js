const qs     = require('qs');
const fs     = require('fs');
const mysql  = require('mysql2');
const bcrypt = require('bcrypt');
const http   = require('http');
const conn   = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'test_youn'
})
conn.connect((err)=>{
  if (err) {throw err;}else{console.log('DB Server Running Port : 3306')}
})
const server = http.createServer((req,rep)=>{
  // 응답 함수 ========================================
  const Mrep = (state,ContentType,finish,write)=>{
    rep.writeHead(state,{'Content-Type':ContentType});
    if (write) {rep.write(write)};
    rep.end(finish);
  }
  // const whereReq = (method,url,callback) => {
  //   if (req.method === method && req.url.includes(url)) {
  //     return callback()
  //   }
  // }
  // =================================================
  
  
  // 요청 응답 ========================================
  // whereReq('GET','/',()=>{
  //   Mrep(200,'text/html',fs.readFileSync('./index.html','utf-8'));
  // })
  // whereReq('GET','index02.html',()=>{
  //   Mrep(200,'text/html',fs.readFileSync('index02.html','utf-8'));
  // })
  if (req.method === 'GET' && req.url === '/') {
    Mrep(200,'text/html',fs.readFileSync('./index.html','utf-8'));
  }

  if (req.method === 'GET' && req.url.includes('index02.html')) {
    Mrep(200,'text/html',fs.readFileSync('./index02.html','utf-8'));
  }

  if (req.method === 'GET' && req.url.includes('index.html')) {
    Mrep(200,'text/html',fs.readFileSync('index.html','utf-8'));
  }

  if (req.method === 'POST' && req.url.includes('checkJoin')) {
    let userData='';
    req.on('data',data=>{userData+=data;})
    req.on('end',()=>{
      const parData    = qs.parse(userData);
      // console.log(parData);
      const dataKeys   = Object.keys(parData)
      dataKeys.splice(1,1)
      const dataValues = Object.values(parData)
      dataValues.splice(1,1)
      const userPW     = bcrypt.hashSync(parData.PW,10);
      conn.query(`INSERT INTO m_info (${dataKeys.join()},PW)
      values (${dataValues.map(element=>{return `\'${element}\'`}).join()},'${userPW}')`)
    })
    Mrep(200, 'text/html',`<h1>Joined</h1>`)
  }
  // =================================================
})

server.listen(2080, (err)=>{
  if (err) {throw err;}else{console.log('App Server Ruinning Port : 2080')}
})