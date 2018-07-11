const mongoose = require('mongoose');

const Day = mongoose.model('Day',{
    sourceDate: {
        type:String
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
    }
    
});



const DayGuest = mongoose.model('DayGust',{
    sourceDate: {
       type:String
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
    }

});

module.exports = {Day,DayGuest};