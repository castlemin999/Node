import express from 'express';
import cors from 'cors';
const app = express();

/* CORS 란
  클라이언트와 서버가 동일한 IP에서 작동하고 있다면 별다른 제약 없이 리소스를 주고 받을 수 있지만
  서로 다른 IP에서 작동하고 있다면 원칙적으로는 어떤 데이터도 주고 받을 수 없다.
  주고 받기 위해서는 서버에서 클라이언트에게 Access-Control-Allow-Origin을 허용 해야지만 가능하다. (Header에 추가)
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE'
  );
  next();
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.listen(8080);
