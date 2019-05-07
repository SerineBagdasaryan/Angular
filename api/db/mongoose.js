const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager',{useNewUrlParser: true}).then(() =>{
    console.log('Connected to MongoDb Successfully:)');
}).catch((e)=>{
    console.log('Error while attemping to connect to Mongodb');
    console.log(e);
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
module.exports = {
    mongoose
};
