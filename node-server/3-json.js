// node http module
const http = require('http');
// Node File System module
const fs = require('fs');

// 메모리에 데이터 보관
let studyList = [
    { name : 'Java' },
    { name : 'JavaScript' },
    { name : 'HTML' },
    { name : 'CSS' },
    { name : 'MySQL' }
]

// server 생성
const server = http.createServer((req, res)=>{
    const url = req.url;
    const method = req.method;
    if(url === '/study'){
        if(method === 'GET'){
            // HTTP 헤더 Content-Type 설정
            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify(studyList));
        }
        else if(method === 'POST'){
            // 버퍼 방식 이용
            const body = [];
            console.log('-----전송 전-----')
            console.log(studyList)
            // Client에서 보낸 데이터들을 배열로 담는다.
            req.on('data', (chunk)=>{
                body.push(chunk);
            });
            req.on('end', ()=>{
                // 받은 데이터들를 concat해서 String으로 변환 후
                const datas = Buffer.concat(body).toString();
                // Object 형태로 parse
                const studies = JSON.parse(datas);
                // 메모리의 studyList에 넣는다.
                studyList.push(studies);
                console.log('-----전송 후-----')
                console.log(studyList)
                res.writeHead(201);
                res.end();
            })
        }
    }
});

// 8080 포트로 서버 응답
server.listen(8080);