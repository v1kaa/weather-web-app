const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const dotenv = require('dotenv');

const MongoUrl='mongodb://localhost:27017';

const route = require('./routes/user')

const app=express();

app.use(bodyParser.json());
app.use('/user',route);

mongoose.connect(MongoUrl)
    .then(()=>{
        console.log('conection successful');
    })
    .catch((error) => {
        console.error('Error occurred while connecting to DB:', error.message);
    });






app.use((req,res)=>{
    res.send('hello');
})
app.listen(3000,()=>{
        console.log('server is running on port 3000');
    });

