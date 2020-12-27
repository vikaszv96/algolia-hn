const Post = require('../models/post');
const { default: Axios } = require("axios");

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
    const { name, password } = req.body;
    // console.log("pass = "+ req.body.password)
    // Post.findOneAndUpdate({ user }).exec((err, data) => {
      Post.findOne({user:name}, function (err,data){
        if (err) console.log(err);
      else {
            // console.log("pass database = "+ data);
        bcrypt.compare(password , data.password, function(err, result) {
             // result == true
                if(result){
            // generate token and send to client/react
            const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.json({ token, name });
        } else {
            return res.status(400).json({
                error: 'Incorrect password!'
            });
        }
      });
    }
    });


};

// exports.requireSignin = expressJwt({
//     secret: process.env.JWT_SECRET
// });

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});
