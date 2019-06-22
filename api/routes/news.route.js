const express = require('express');
const app = express();
const expressJwt = require('express-jwt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const upload = multer({dest:'uploads/'});
const bodyParser = require('body-parser');
const routes = express.Router();
let Users = require('../models/Users');
let Images = require('../models/Images');
let News = require('../models/News');
let Chat = require('../models/Chat')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const secret = 'secret';
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
// app.use(express.static(__dirname + "/public"));
const storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req,file,cb) {
    cb(null,file.fieldname + '-' + Date.now()+
    path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  // limits: {fileSize:1000000},
  fileFilter:function (req,file,cb) {
    checkFileType(file,cb);
  }
}).single('file');

function checkFileType(file,cb){
  const filetypes = /jpeg|jpg|png|gif/;
  const extname= filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){
    return cb(null,true);
  }else {
    cb('Error: Image only!')
  }
}

let userId;
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, secret, function(err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
     userId = decoded.sub;
    console.log(decoded,'fggg');
    next();
  });
}



routes.post('/upload', verifyToken,(req,res) => {
upload(req,res,(err)=>{
if(err){
  res.send(err);
}else {
  if(req.file === 'undefined'){
    res.json({msg:'No file selected'});
  } else {
    // const fullPath = "images/" + req.file.filename;
    const fullPath = req.file.filename;
    const images = new Images({
      image: fullPath,
      userId: userId,
    })
    images.save(function (err,file) {
      if(err) {
res.send(err);
      }
      res.json(file) //file
    });
  }
}
})
  })

// routes.post('/',(req,res) => {
//   const io = req.app.get('io');
//   const chat = new Chat({
//     description: req.body.description
//   });
//   chat.save().then(()=>{
//     io.emit('newChatAdded');
//   });
// });
//
// routes.get('/',(req,res) =>{
//   Chat.find({}).then((chat)=>{
//     res.send(chat);
//   });
// });

routes.get('/profAdmin', verifyToken, (req, res)=>{
      Users.findOne({_id:userId}, (err, decoded)=>{
        if(err){
          res.json({err:err})
        }else{
          res.json(decoded);
        }

  })
})






// routes.post('/upload',upload.any(),(req, res)=> {
//   let token = req.headers["authorization"];
//   console.log(token);
//   jwt.verify(token,secret, function (err, decoded) {
//     if(err){
//       res.json({err:err});
//     }else {
//       console.log(req.files, 'files');
//       const body =req.files;
//       if(body){
//         body.forEach(function(file){
//           let filename=(new Date).valueOf() + "_" + file.originalname
//           fs.rename(file.path, './public/images/' + filename,function(err){
//             console.log(file.path);
//             // const base64Data = new Buffer(JSON.stringify(req.files)).toString("base64");
//             // console.log(base64Data,64);
//             if(err)throw err;
//             let images = new Images({
//               image:filename,//or file.path
//               userId: decoded.sub
//             })
//             images.save(function (err,result) {
//               if(err) {
//
//               }
//               res.json(result);
//
//             });
//           });
//         });
//       }
//       }
//   })
//   })
//


routes.post('/add', (req, res) => {
  Users.find({role:req.body.role}, (err, users)=>{
    if(err){
      res.json({err:err})
    }
    if(users) {
      const error = {};
      success = true;
      for (let key in users) {
        console.log(users[key].role, "helloooooooooooo");
        if (req.body.role === "admin" && users[key].role === "admin") {
          success = false;
          error.msg = "You can not register as an admin";
          return res.json(error);
        }
      }
    }


  const errors = {};
  success = true;
  if(req.body.password !== req.body.cpassword) {
    success = false;
    errors.messg = "Password is not same as confirmation";
    return res.json(errors);
  }
  let newUser = new Users({
    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email,
    password : req.body.password,
    cpassword : req.body.cpassword,
    role : req.body.role,
  });
  Users.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg : "Failed to register User"})
    } else {
      res.json({success: true, msges: "User registered"});
    }
  });
  //   }
  })
});




routes.route('/admin').get((req, res)=> {

   Users.find({
   }).then((users) => {
     res.send(users);
   }).catch((e) => {
     res.send(e);
   });
})


routes.route('/images').get(verifyToken, (req,res)=> {
      Images.find({userId: userId}, (err, decoded)=>{
        if(err){
          res.json({err:err})
        }else{
          for (let key in decoded) {
            console.log(decoded[key], "helloooooooooooo");
          }
          res.json(decoded);
        }
      })
});




routes.route('/profileUser').post((req, res)=> {
  const email = req.body.email;
  const password = req.body.password;
  Users.findOne({ email: email }, function (err, user) {

    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: "User not found"});
    } else {
      Users.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        // If Password Matches go-on to create a JWT token
        if(isMatch) {
          const token = jwt.sign({
            sub: user._id,
            role: user.role,
          },
            secret, {
              expiresIn: 86400 // expires in 24 hours
            });
          res.status(200).send({
            success: true,
            token: token,
            user: user,
          });
        } else {
          return res.json({success: false, msg: "Wrong password"});
        }
      });
    }
  })
});
routes.route('/findEmail').post((req, res)=> {
  const email = req.body.email;
  Users.findOne({ email: email }, function (err, user) {

    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: "Incorrect Email"});
    } else {
     res.json(user.email);
    }
  })
});
routes.route('/findPass').post((req, res)=> {
  const email = req.body.findbyEmail;
  let obj = {};
  success =  true;
  Users.findOne({email: email}, function (err, user) {
    if(err) throw err;
    if(!req.body.password) {
      obj.err= "Enter new password";
      success = false;
      return res.json({obj: obj,success: false});
    } else {
      user.password = bcrypt.hashSync(req.body.password)
      user.cpassword = req.body.password;
      user.save(function (err,result) {
        if(err)
          res.send(err);
        res.json({result: result,success: true});
      })
    }
  })
});


routes.route('/update/:id').post((req, res) =>{
  console.log(req.params.id,);
  News.findById({_id: req.params.id}, function (err, news) {
    if (err) console.log("Err");
    news.title =req.body.title;
    news.textarea = req.body.textarea;
    news.save(function (err, result) {
      if (err)

        res.send(err);
      res.json(result);
    });
  });

});



routes.route('/profile').post(verifyToken,(req, res)=> {
      let news = new News({
        title: req.body.title,
        textarea: req.body.textarea,
          userId: userId
      })
      news.save(function (err, result) {
        if (err)
          res.json(err);

        res.json(result);

      });

    });

routes.route('/changePass',).post(verifyToken,(req, res)=> {
      Users.findOne({_id:userId}, (err, decoded)=>{
        if(err){
          res.json({err:err})
        }else{
          decoded.cpassword  = req.body.password;
          decoded.password = bcrypt.hashSync(req.body.password)
          decoded.save(function (err,result) {
            if(err)
              res.send(err);
            res.json(result);
          })

        }
      })

});

routes.route('/getNews').get(verifyToken,(req, res)=> {
      News.find({userId:userId}, (err, decoded)=>{
        if(err){
          res.json({err:err})
        }else{
          for (let key in decoded) {
            console.log(decoded[key], "helloooooooooooo");
          }
          res.json(decoded);
        }
      })

});


routes.route('/edit/:id').get((req, res) =>{
  let id = req.params.id;
  News.findById(id, function (err, news){
    res.json(news);
  });
});
routes.route('/view/:id').get((req, res) =>{
  let id = req.params.id;
  News.findById(id, function (err, news){
    res.json(news);
  });
});
routes.route('/editUser/:id').get((req, res)=> {
  let id = req.params.id;
  Users.findById(id, function (err, users){
    res.json(users);
  });
});
//
// //  Defined update route
routes.route('/updateUsers/:id').post((req, res) =>{
  Users.findById({_id: req.params.id}, function (err, users) {
    if (err) console.log("Err");
    users.fname = req.body.fname;
    users.lname = req.body.lname;
    users.email = req.body.email;
    users.password = req.body.password;
    users.cpassword = req.body.cpassword;
    users.role = req.body.role;
    users.save(function (err, result) {
      if (err)

        res.send(err);
      res.json(result);
    });
  });

});


routes.route('/delete/:id').get((req, res)=> {
  Users.deleteOne({_id: req.params.id}, function(err, users){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});
routes.route('/deleteNews/:id').get((req, res) => {
  News.deleteOne({_id: req.params.id}, function(err, news){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});
//
module.exports = routes;
