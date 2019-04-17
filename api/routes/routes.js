const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({dest:'uploads'});
const bodyParser = require('body-parser');
const routes = express.Router();
let Invoice = require('../models/Invoice');
const joi= require('Joi');
routes.post('/invoices',  function (req, res, next) {
    if (!req.body.item) {
        res.status(400).send({err: 'Item is required'});
    }
    if (!req.body.qty) {
        res.status(400).send({err: 'Qty is required'});
    }
    if (!req.body.date) {
        res.status(400).send({err: 'Date is required'});
    }
    if (!req.body.due) {
        res.status(400).send({err: 'Due is required'});
    }
    else {

        var invoice = new Invoice({
            item: req.body.item,
            qty: req.body.qty,
            date: req.body.date,
            due: req.body.due,
            rate: req.body.rate,
            tax: req.body.tax,
        })
        invoice.save(function (err, result) {
            if (err) {
                console.log("Data does not save!")
            }
            console.log("It's OK!")
            res.json(result);

        });

    }
});
routes.get('/invoices/:id',  function (req, res, next) {
    const {id} = req.params;
    Invoice.findById(id).then(invoice =>{
        if (!invoice){
            return res.status(404).json({err: 'Could not find any invoice'});
        }
        return res.json(invoice);
    })
        .catch(err => res.status(500).json(err));
});
routes.get('/invoices',  function (req, res, next) {
    Invoice.find().then(invoice =>{
        if (!invoice){
            return res.status(404).json({err: 'Could not find any invoice'});
        }
        return res.json(invoice);
    })
        .catch(err => res.status(500).json(err));
});
routes.delete('/invoices/:id',  function (req, res, next) {
    const {id} = req.params;
    Invoice.findByIdAndRemove(id).then(invoice =>{
        if (!invoice){
            return res.status(404).json({err: 'Could not delete any invoice'});
        }
        return res.json(invoice);
    })
        .catch(err => res.status(500).json(err));
});
routes.put('/invoices/:id',  function (req, res, next) {
    console.log(req.params.id,);
    Invoice.findById({_id: req.params.id}, function (err, invoice) {
        if (err) console.log("Err");
        invoice.item= req.body.item;
            invoice.data = req.body.item;
            invoice.due= req.body.due;
            invoice.qty = req.body.qty;
            invoice.tax = req.body.tax;
            invoice.rate = req.body.rate;
        invoice.save(function (err, result) {
            if (err)

                res.send(err);
            res.json(result);
        });
    });

});
module.exports = routes;
