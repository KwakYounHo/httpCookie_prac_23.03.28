// const url = '/index02.html'
// // console.log(url.startsWith('/','ㅋㅋㅋㅋㅋㅋㅋㅋ'))

// const check = first=>{
//   return url.includes(first)
// }
// console.log(check('index.html'));
// 
// switch (url) {
//   case check() : 
//     console.log('/')
//     break
//   case check('index02.html') :
//     console.log('index02.html');
//     break
//   case check('index.html') :
//     console.log('index.html');
//     break
// }

function checkGET () {
  // a가 request.method라고 가정
  let a = 1 // 1은 'GET'이라고 가정
  let url = '/JS/index02.html' // 변수 url은 req.url이라고 가정
  
  function Cincludes(first) { // url에 매개변수 문자열이 포함되어있다면 true
    return url.includes(first)
  }

  if (a === 1) { // req.method === 'GET'
    switch (true) { // 요청 온 url주소를 찾아라
      case 'index.html' :
        console.log('첫 번째 케이스');
        break
      case 'index02.html' :
        console.log('두 번째 케이스');
        break
      case '/' :
        console.log('세 번째 케이스');
        break
      case Cincludes('/index02.html') :
        console.log('네 번째 케이스')
        break
      case '/index02.html' :
        console.log('다섯 번째 케이스')
        break
    }
  }
}
console.log(checkGET())
