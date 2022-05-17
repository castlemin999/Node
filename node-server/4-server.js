const http = require('http');
const fs = require('fs');
const { Stream } = require('stream');

const PORT = 8080;
const courses = [
        {name : 'fender'}
      , {name : 'musicman'}
      , {name : 'yamaha'}
      , {name : 'sire'}
      , {name : 'fodera'}
    ]

// 웹서버 생성
const server = http.createServer((req, res)=> {
    const url = req.url;
    const method = req.method;

    if(url === 'courses'){
        if(method === 'GET'){
            res.writeHead(200, {'content-Type' : 'application/json'});
            res.end(JSON.stringify(courses));
        }
        else if(method === 'POST'){
            const body = [];
            req.on('data', (chunk)=>{
                console.log(chunk);
                body.push(chunk);
            });
            req.on('end', ()=>{
                const bodyStr = Buffer.concat(body).toString();
                const course = JSON.parse(bodyStr);
                courses.push(course);
                res.writeHead(201);
                res.end();
            })
        }
    }
});


// 8080 포트로 실행
server.listen(PORT)