const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = express.Router();
let Order = require('../models/order');

routes.post('/createOrder', (req, res) => {
    console.log(typeof req.body.seat);
    const obj = {};
    success = true;
    if(req.body.seat > 49){
        success= false;
        obj.count = "Number of seats 49";
        return res.json(obj);
    }
    if(req.body.name == ""){
        obj.nameError = 'Please enter name';
        success = false;
        return res.json(obj);
    }
    if(req.body.lastname == ""){
        obj.lastNameError = 'Please enter lastname';
        success = false;
        return res.json(obj);
    }
    if(req.body.seat == ""){
        obj.seatError = 'Please enter number seat';
        success = false;
        return res.json(obj);
    }
    Order.find((err, users)=>{
        if(err){
            res.json({err:err})
        }
        if(users) {
            const error = {};
            success = true;
            for (let key= 0; key < users.length; key++) {
                if (req.body.name === users[key].name && req.body.lastname === users[key].lastname && req.body.seat === users[key].seat) {
                    success = false;
                    error.msg = "You cannot sign up again";
                    return res.json(error);
                }
            }
        }

        let newUser = new Order({
            name : req.body.name,
            lastname : req.body.lastname,
            seat : req.body.seat
        });
        newUser.save(function (err, user) {
            if (err) return console.error(err);
            res.json({user:user,m: "\n" +
                    "Your order has been accepted"});
        });

    })
});


module.exports = routes;


