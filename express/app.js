import express from 'express';
const app = express();


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


app.use((req, res, next)=>{
    res.status(404).send('Not Available @_@')
})

app.use((error, req, res, next)=>{
    console.error(error);
    res.status(500).send('Sorry Error!')
})
app.listen(8080);

