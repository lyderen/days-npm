const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const AdminSchma = new mongoose.Schema({
    password:{
        type: String,
        required: true
    }
});

UserSchema.met('save', function(next) {
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


