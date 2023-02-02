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

async function run(){
    try{
        await client.connect();
        const productCollections = client.db('emaJohn').collection('emaJohnFirst');

        // getting all the product
        app.get('/product',async(req, res)=>{
            
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);

            let result;
            const query = {};
            const cursor = productCollections.find(query);
            if(page || size){
                result = await cursor.skip(page * 10).limit(size).toArray();
            }else{
                result = await cursor.toArray();
            }
            
            res.send(result);
        })

        // getting product quantity
        app.get('/productCount', async(req, res)=>{
            const query = {};
            const cursor = productCollections.find(query);
            const result = await cursor.count();
            res.send({result});
        })
    }
    finally{}
}

run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('trying from office pc');
})

app.listen(port, ()=>{
    console.log('listening to port 5000');
})