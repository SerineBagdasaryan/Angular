const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./DB');
const http = require('http');
const socketIo = require('socket.io');
const routes = require('./routes/news.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use('/news', routes);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, token, _id");
res.header("Access-Control-Expose-Headers: Authorization");
  res.append('Access-Control-Allow-Headers', 'Content-Type');

  next();
});
// app.use(express.static(path.join(__dirname,'dist/angular7crud')));
// app.use(express.static(path.join(__dirname,'index.html')));
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port,function () {
  console.log(`Listening on port ${port}`)
})
