import express from 'express';

const app = express();

// express.json -> REST API, body parse
// express.urlencoded -> HTML form
// express.static

app.use(express.json());
app.post('/posts', (req, res) => {
  console.log(req.body);
  res.status(201).send('Thanks, Created');
});

const options = {
  dotfiles: 'ignore',
  etag: false,
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  },
};

// public 폴더안에 파일들을 res에 일일히 담지 않아도 접근가능함
// localhost:8080/image.png
app.use(express.static('public', options));

app.listen(8080);
