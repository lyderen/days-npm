const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
process.settingKeys = require('../../EnvaiermantVariable/setting');


// must to add a usER NAME to the user schema
var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: false,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
      }
    },
    password: {
      type: String,
      require: true,
      minlength: 6
    },
    userName:{
        type: String
    
    },
    suspicuosStrongDays:[{
        daysBetween:{
            type:Number
        },
        dateInMonth:{
            type:Number
        }
    }],
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
  });
  
     //refresh token is it showld bee at list the amount the user that ue have in aur system

      UserSchema.methods.toJSON = function () {
          const user = this;
          const userObj = user.toObject();

          return _.pick(userObj, ['email', '_id' , 'userName']);
      }

      UserSchema.methods.generateAuthToken = function () {
        const user = this;
        const access = 'auth';
        const token = jwt.sign({_id: user._id.toHexString(),access}, process.settingKeys.keys.tokenKey).toString();
        user.tokens.push({access,token})
        
     
        return user.save().then(() => {
            return token;
        });
    }



    UserSchema.methods.removeToken = function(token) {
        const user = this;

        return user.update({
            $pull: {
                tokens: {token}
            }
        });
    };

    UserSchema.statics.findByToken = function (token) {
     const User = this;
     let decoded;

     try{
         decoded = jwt.verify(token,process.settingKeys.keys.tokenKey);
     }catch (e) {
           return Promise.reject();
     }

     return User.findOne({
         '_id':decoded._id,
         'tokens.token': token,
         'tokens.access': 'auth'
     });
   }
    

      UserSchema.statics.findByCredentials = function(email, password) {
          const User = this;
          console.log(email);
       return User.findOne({email}).then((user) => {
            if(!user){
                return Promise.reject();
            }

            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err,res) => {
                   if(res){
                       resolve(user);

                   }else{
                       reject(err);
                   }
                });
            });
        });  
      };

      UserSchema.pre('save', function(next) {
          const user = this;

          if(user.isModified('password')){
              bcrypt.genSalt(10, (err,salt) => {
                  bcrypt.hash(user.password, salt, (err, hash) => {
                      user.password = hash;
                      next();
                  });
              });
          }else{
              next();
          }
      });

   var User = mongoose.model('Users', UserSchema);
   
   module.exports = {User}