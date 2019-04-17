const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Invoice = new Schema({
        item: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        due: {
            type: Date,
            required: true
        },
        rate: {
            type: Number,
        },
        tax: {
            type: Number,
        },

    },
    {
        collection: 'invoice'
    });

module.exports = mongoose.model('Invoice', Invoice);
