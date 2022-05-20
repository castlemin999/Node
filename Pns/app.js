const express = require("express");
const app = express();

// PNS
app.get("/interface/pnsmg_002.jsp", (req, res)=>{
    const port = req.headers.host.split(":")[1];
    const delay = port === "8080" ? 0 : 50;

    console.log( req.headers.host, delay );

    setTimeout(()=>{
        res.status(200).json({
            count: "1", 
            result: "OK",
            reason: "dd"
        });
    }, delay*1000);
});

// // ListAPI
// app.get("/interface/pnsmg_001.jsp", (req, res)=>{
//     const port = req.headers.host.split(":")[1];
//     const delay = port === "8080" ? 0 : 60;

//     const expose = req.query.expose;
//     const state = req.query.state;

//     console.log( req.headers.host, delay, expose, state );

//     setTimeout(()=>{
//         res.status(200).json([
//             { popupId:"L1234", popupNm:"TV팝업" }
//         ]);
//     }, delay*1000);
// });

// // Banner 
// app.post("/rcv_register_csvmessage.ctl", (req, res)=>{
//     const port = req.headers.host.split(":")[1];
//     const delay = port === "8080" ? 0 : 60;
//     const expose = req.body.ext;
    
//     console.log( req.headers.host, delay, expose, state );

//     setTimeout(()=>{
//         res.status(200).json({
//             result: "IF-001",
//             count: 0
//         });
//     }, delay*1000);
// });

app.listen(8080, ()=>{ console.log("Run port: 8080"); });
app.listen(8070, ()=>{ console.log("Run port: 8070"); });
// app.listen(8090, ()=>{ console.log("Run port: 8090"); });