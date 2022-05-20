import express from 'express';
const app = express();

app.use(express.json()); // body 내의 json을 parsing 해준다.

// res와 next를 사용해서 미들웨어의 흐름이 이어지도록 해야한다!

app.get(
    '/',
    (req, res, next)=>{
        console.log('first');
        res.send('Hello');
        next(new Error('error'));
        next('route');
    },
    (req, res, next)=>{
        console.log('first2');
        next();
    }
);

app.get('/',(req, res, next)=>{
    console.log('second');
    next();
});




app.post('/', (req, res, next)=>{
    console.log(req.body)
});






// app.get('/sky/:id', (req, res, next)=>{
//     //console.log(req);
//     //console.log(req.headers);
//     console.log(req.params);
//     console.log(req.params.id);

//     console.log(req.query);
//     console.log(req.query.keyword);

//     //res.json({name : 'Sungmin'});
//     //res.sendStatus(400);
//     res.setHeader('a', 'b');
//     res.status(201).send('created');
// });



// /api 경로에서만 반응한다.
// /api/doc 이런건 반응안함.
app.all('/api', (req, res, next)=>{
    console.log('all');
    next();
});


// 반면 use는 설정 된 경로에서 뒤에 더 추가되어도 반응한다.
app.use('/sky', (req, res, next)=>{
    console.log('all');
    next();
});


app.use((req, res, next)=>{
    res.status(404).send('Not Available @_@')
})

app.use((error, req, res, next)=>{
    console.error(error);
    res.status(500).send('Sorry Error!')
})

app.listen(8080);

