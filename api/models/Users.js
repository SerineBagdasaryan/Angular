const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
// Define collection and schema for Business
let Users = new Schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String,
    unique: true,
  } ,

  password: {
    type:String

  },
  cpassword: {
    type:String
  },
  role: {
    type:String
  },
  // _userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // }
},{
  collection: 'users'
});

module.exports = mongoose.model('Users', Users);

module.exports.getUserById = (id, callback) => {
  Users.findById(id, callback);
};


module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) {
        throw err;
      } else {
        newUser.password = hash;
        newUser.save(callback);
      }
    });
  });
}

module.exports.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if(err) {
      throw err;
    } else {
      callback(null, isMatch);
    }
  });
}
module.exports.profileRead = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};
