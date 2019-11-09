const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');
const routes = require('./routes/route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useUnifiedTopology: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use('/order', routes);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, token, _id");
    res.header("Access-Control-Expose-Headers: Authorization");
    res.append('Access-Control-Allow-Headers', 'Content-Type');

    next();
});
const port = process.env.PORT || 8080;

app.listen(port,function () {
    console.log(`Listening on port ${port}`)
})
