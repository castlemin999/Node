import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';
const app = express();
app.use(express.json());

/*
  에러처리를 잘한다는것
  1. 요청을 제대로 처리하지 못했다면 적절한 에러메시지를 보내준다.
  2. 시스템 내부적으로 문제가 발생하더라도 서버가 중지되지 않도록 예외처리를 하는것
*/ 

// 각각의 미들웨어 안에서 최대한 오류처리를 해주고 마지막 app use는 최후의 보류
app.get('/file1', (req, res) => {

  // 1. 동기 에러 처리
  try {
    const data = fs.readFileSync('/file1.txt'); // 존재하지 않는 file1.txt
  } catch (error) {
    res.status(404).send('File not Found!');
  }

  /*
    2. 비동기 에러 처리
    express의 모든 미들웨어 체인은 동기적으로 연결되어 있다.
    즉 콜백함수 내에서 err가 발생하면 처리 후 다음 미들웨어로 넘겨줘야 하는데 
    콜백함수에서 아무런 처리를 하지 않는다면 다음 미들웨어로 넘어가지 않게 된다.
    외부에서는 에러가 발생했는지 안했는지 확인 할 수가 없다.
  */
  // fs.readFile('/file1.txt', (err, data) => {
  //   if (err) {
  //     res.status(404).send('File not Found!');
  //   }
  // });

});

/*
  promise도 마찬가지로 콜백함수 내에서 에러가 발생하면 외부에서 확인 할 수 가없다.
  반드시 catch를 이용해서 에러 처리를 해줘야한다.  
*/
app.get('/file2', (req, res) => {
  fsAsync
    .readFile('/file2.txt') //
    .catch((error) => {
      //next(error) 이렇게 하면 맨 밑 app use의 에러처리까지 내려간다. 'Something went wrong'
      res.status(404).send('File not Found!');;
    });
});


/*
  async를 함수 앞에 선언하면 함수 자체는 promise를 반환한다.
  때문에 이것 또한 내부에서 에러가 발생하면 외부에서 확인이 불가능하다.
  
*/
app.get('/file3', async (req, res) => {
  try {
    const data = await fsAsync.readFile('/file2.txt');
  } catch(error) {
    res.status(404).send('File not Found!');
  }
});

// 버전 5 이하에서는: require('express-async-errors');

// Express 5 부터는 이렇게
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' }); // 너무 포괄적인 에러 메시지... (최후의 보류)
});

app.listen(8080);


/** 정리
 * 
 * 각각의 미들웨어에서 에러가 발생했을때 미들웨어 안에서 적절한 메시지를 활용하여 사용자에게 전달해야한다.
 * 동기 처리에서는 try catch로 에러를 처리하고 마지막 에러처리 미들웨어에서 최후의 안전망으로 처리할 수 있다.
 * 비동기 처리에서는 프로미스 또는 콜백함수 내에서 발생하는 에러는 외부에서 감지 할 수 없기 때문에 마지막 미들웨어에서도 에러를 감지할 수 없다. 
 * 반드시 내부적으로 처리해야한다.
 * 
 */
