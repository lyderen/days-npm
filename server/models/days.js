const mongoose = require('mongoose');

const Day = mongoose.model('Day',{
    sourceDate: {
        type: Object
     },
    date:{
        type: Number,
        required: true
    },
    hebrewDate:{
        type:Object,
       require: true
    },
    completedAt: {
        type: Number,
        default: null
    },
    typeSuspc:{
        type: String
    },
    timeSuspc:{
        type:String
    },
    _creator:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sunRise:{
        type: String
    },
    sunSet:{
        type: String
    },
    append: {
        type: Boolean,
        default: false
    },
    delete:{
       type: Boolean,
       default: false   
    },
    systemApplay: {
        type: Boolean,
        default: false
    },    
    haflagaAppend:{
        type: Boolean,
        default: false
    },
    citi:{
        type:String,
        default: 'ירושלים'
    }

});



const DayGuest = mongoose.model('DayGust',{
    sourceDate: {
       type: Object
    },
    date:{
        type: Number,
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
    sunRise:{
        type: String
    },
    sunSet:{
        type: String
    },
    citi:{
        type:String,
        default: 'ירושלים'
    }

});

module.exports = {Day,DayGuest};