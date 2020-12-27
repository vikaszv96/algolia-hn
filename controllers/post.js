const Post = require('../models/post');
const slugify = require('slugify');
const { default: Axios } = require("axios");
const bcrypt = require('bcryptjs');

exports.create = (req, res) => {
    const { user, password, cpassword, history } = req.body;

    console.log("req.body "+ req.body);

    // validate
    switch (true) {
        case !user:
            return res.status(400).json({ error: 'username is required' });
            break;
        case !password:
            return res.status(400).json({ error: 'password is required' });
            break;
    }

    if(password != cpassword)
    {
      return res.status(400).json({ error: 'password doesnt match' });
    }
    // create post
    bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(password,salt,(err,password)=>{
            // {password} = hash;
    Post.create({ user, password, history }, (err, post) => {
        if (err) {
            console.log(err);
            res.status(400).json({ error: 'Duplicate post. Try another title' });
        }
        res.json(post);
    });
  })
  })
};

exports.list = async(req, res) => {

  var { par } = req.params;
  var pars = par.split('~');

  console.log("pars[5] = " + pars[5]);
 var hist = {
   word: pars[1],
   time:new Date()
 }
  await Axios.get(
     `http://hn.algolia.com/api/v1/${pars[0]}?query=${pars[1]}&tags=${pars[2]}&page=${pars[3]}&numericFilters=created_at_i>${pars[4]}`
     )
     .then((r) => {
       if(pars[1] != '')
       {
             Post.findOneAndUpdate({user:pars[5]}, { $push: { history: hist } }, { new: true }).exec((err, post) => {
                 if (err) console.log(err);
             else {
                res.send({ datas: r.data });
             }
     })
   }
   else {
       res.send({ datas: r.data });
   }
   })
     .catch((err) => {
       console.log("err = "+ err);
     });
};

exports.hist = async(req, res) => {
  var { par } = req.params;
  console.log("par history = "+ par);
  Post.findOne({user:par}, function(err, data) {
    if (err) console.log(err);
else {
  console.log("history = "+ data.history);
   res.send({ datas: data.history });
}
})
};

exports.read = (req, res) => {
    const { slug } = req.params;
    var post = {
      "name":"Vikas",
      "email":"vikas.zv95@gmail.com"
    }
    res.json(post);
};
