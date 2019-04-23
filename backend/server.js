'use strict'
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const properties= require('./config/properties');
const DB= require('./config/db');
const cors = require('cors');

DB();
const app = express();
const router = express.Router();
authRoutes(router);
const bodyParser= require('body-parser');
const bodyParserJson = bodyParser.json();
const bodyParserURLEncoded =bodyParser.urlencoded({extended: true});
app.use('/api',router);
app.use(cors());
app.use(bodyParserJson);
app.use(bodyParserURLEncoded);
router.get('/',(req,res) =>{
    res.send('Hello from home');
})

app.use(router);
app.listen(properties.PORT, () => console.log(`server runing on port ${properties.PORT}`));
