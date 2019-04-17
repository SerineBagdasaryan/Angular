const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required: 'Fullname can not be empty',
        unique: true,
    },
    email: {
        type:String,
        unique: true,
        required: 'Email can not be Empty',
    },
    password: {
        type: String,
        required: ' Password can not be empty',
        minlength: [4,'Password must be atleast 4 character long'],
    },
    saltSecret: String
});
userSchema.path('email').validate((val)=>{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

userSchema.pre('save',function (next) {
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password, salt,(err,hash)=>{
            this.password= hash;
            this.saltSecret = salt;
            next();
        });
    });

});
userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password,this.password);
};
userSchema.methods.generateJwt= function(){
    return jwt.sign({_id: this._id},
        process.env.JWT_SECRET,

        {
            expiresIn: process.env.JWT_EXP
        });
}
mongoose.model('User',userSchema);