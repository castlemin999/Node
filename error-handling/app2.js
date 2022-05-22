import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';
/*
  미들웨어 안에서 promise를 사용한다면 이를 감지해서 마지막 에러 처리 미들웨어로 보내주는 모듈
  단 반드시 return 처리를 해줘야 한다.
  express5 알파버전 이후부터는 import하지 않아도 된다.
*/ 
import {} from 'express-async-error'

const app = express();
app.use(express.json());

// 비동기적 코드의 에러가 마지막 미들웨어에 도달하는 방법!

app.get('/file1', (req, res) => {
  // 1. 동기 에러 처리
  try {
    const data = fs.readFileSync('/file1.txt'); // 존재하지 않는 file1.txt
  } catch (error) {
    res.status(404).send('File not Found!');
  }

  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.status(404).send('File not Found!');
    }
  });
});

app.get('/file2', (req, res) => {
  return fsAsync.readFile('/file2.txt') // promise return처리
});

app.get('/file3', async (req, res) => {
    const data = await fsAsync.readFile('/file2.txt');
});

// 버전 5 이하에서는: require('express-async-errors');
// Express 5 부터는 이렇게
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' }); // 너무 포괄적인 에러 메시지... (최후의 보류)
});

app.listen(8080);