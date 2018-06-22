const cookieParser = require('cookie-parser');
const {User} = require('../models/user');

const authenticate = (req,res, next) => {
    const token = req.cookies.token;
  
    User.findByToken(token).then((user) => {
        console.log(user);
        if(!user){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        
        res.status(200).send('cant find user');
    });
};

module.exports = {authenticate};