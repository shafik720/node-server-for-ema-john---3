const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require ('cors');


//middleware
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('trying from office pc');
})

app.listen(port, ()=>{
    console.log('listening to port 5000');
})