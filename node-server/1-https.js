const http = require('http');
const fs = require('fs');
// console.log(http.STATUS_CODES);
// console.log(http.METHODS);

const name = 'sungmin';
const courses = [{name}]

// 서버 생성
const server = http.createServer((req, res) => {
    console.log('Incoming...');
    // console.log(req.headers);
    // console.log(req.httpVersion);  
    // console.log(req.method);
    // console.log(req.url);
    
    const url = req.url;
    res.setHeader('Content-Type', 'text/html');
    if(url === '/'){
        fs.createReadStream('./html/index.html').pipe(res);
    } else if(url === '/courses'){
        fs.createReadStream('./html/courses.html').pipe(res);        
    } else{
        fs.createReadStream('./html/notFound.html').pipe(res);
    }

    //res.end();
    /* 
        pipe는 비동기적인 함수 이므로, 호출만 해놓고 (작업이 끝나길 기다리지 않고) 다음 코드 라인으로 넘어간다. 
        그래서 piping이 되고 있는 중간에 res.end를 호출하게 되면 파이핑이 멈추게 된다.
        pipe이 끝나면 자동으로 end() 처리가 되므로, 수동적으로 호출해줄 필요는 업다.
    */
});

// PORT 설정 및 서버 오픈
server.listen(8080); 