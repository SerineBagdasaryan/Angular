const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Order= new Schema ({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    seat: {
        type: Number
    }
},{
    collection: 'orders'
    });
module.exports = mongoose.model('Order',Order);
