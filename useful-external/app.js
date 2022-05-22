import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

// http://expressjs.com/en/resources/middleware/morgan.html
const app = express();

// cookie-parser
// morgan
// cors
// helmet

// cookie-parser
// key: Cookie
// value: yummy_cookie=choco; tasty_cookie=strawberry

const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200, // for options request
  credentials: true, // Access-Control-Allow-Credentials: true
};

app.use(cookieParser()); // http://expressjs.com/en/resources/middleware/cookie-parser.html
app.use(morgan('common')); // http://expressjs.com/en/resources/middleware/morgan.html log 모듈
app.use(cors(corsOptions));
app.use(helmet()); // https://github.com/helmetjs/helmet 유용한 보안 설정을 헤더에 자동으로 설정

app.get('/', (req, res) => {
  console.log(req.cookies); // it will be undefined without cookie-parser
  console.log(req.cookies.yummy_cookie);
  res.send('Welsome!');
});

app.listen(8080);
