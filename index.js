const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require ('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');


//middleware
app.use(express.json());
app.use(cors());

require('dotenv').config();

// mongodb functionality
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ydjbhxm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    console.log('Mongodb Connected');
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.get('/',(req,res)=>{
    res.send('trying from office pc');
})

app.listen(port, ()=>{
    console.log('listening to port 5000');
})