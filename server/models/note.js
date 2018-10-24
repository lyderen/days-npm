const mongoose = require('mongoose');

const Note = mongoose.model('Notes',{
    email:{
        type: String
    },
    title:{
        type: String,
        require: true
    },
    topic:{
        type: String,
        require: true,
    },
    read:{
        type: Boolean,
        default: false
    },
    creatAt:{
        type: Number,
    }

});

module.exports = Note;