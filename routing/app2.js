import express from 'express';

const app = express();

app.use(express.json());

// router를 사용해서 동일한 url을 묶을 수 있다.
// 단 조금 복잡한 서버같은 경우엔 여러가지 경로가 있기 때문에 가독성이 떨어짐
app
  .route('/posts')
  .get((req, res) => {
    res.status(201).send('GET: /posts');
  })
  .post((req, res) => {
    res.status(201).send('POST: /posts');
  });

app
  .route('/posts/:id')
  .put((req, res) => {
    res.status(201).send('PUT: /posts/:id');
  })
  .delete((req, res) => {
    res.status(201).send('DELETE: /posts/:id');
  });

app.listen(8080);
