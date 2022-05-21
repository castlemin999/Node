import express from 'express';
import userRouter from './routes/user.js';
import postRouter from './routes/post.js';

const app = express();

app.use(express.json());

// 큰 domian을 설정
app.use('/users', userRouter);
app.use('/posts', postRouter);


// 에러처리 미들웨어도 등록가능

app.listen(8080);
