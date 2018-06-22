const mongoose = require('mongoose');

const Day = mongoose.model('Day',{
    date:{
        type: String,
        required: true
    },
    hebrewDate:{
       type: String,
       require: true
    },
    completedAt: {
        type: Number,
        default: null
    },
    typeSuspc:{
        type: String
    },
    _creator:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sunrise:{
        type: String
    },
    sunset:{
        type: String
    },
    append: {
        type: Boolean,
        default: false
    },
    delete:{
       type: Boolean,
       default: false   
    }
    
});



const DayGuest = mongoose.model('DayGust',{
    date:{
        type: String,
        required: true
    },
    hebrewDate:{
       type:Object
    },
    timeSuspc:{
      type:String
    },
    completedAt: {
        type: Number,
        default: null
    },
    typeSuspc:{
        type: String
    },
    _creator:{
        type: String,
    },
    sunrise:{
        type: String
    },
    sunset:{
        type: String
    }

});

module.exports = {Day,DayGuest};