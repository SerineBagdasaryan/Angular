const  mongoose = require('mongoose');
const dbURL = require('./properties').DB;
module.exports = () =>{
    mongoose.connect(dbURL,{useNewUrlParser: true})
        .then(() =>console.log(`Mongo connect on ${dbURL}`))
        .catch(err => console.log(`Connection has error ${err}`))
    process.on('SIGNIN',() => {
        mongoose.connection.close(()=>{
            console.log(`Mongo is disconnected`);
            process.exit(0)
        });
    });
}