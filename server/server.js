const fs = require('fs');
process.setting = JSON.parse(fs.readFileSync('.env.json','UTF-8'));
const path = require('path');
const express = require('express');
const {mongoose} = require('./db/mongose');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const _ = require('lodash');
const {Day,DayGuest} = require('./models/days');
const User = require ('./models/user.js');
// 'AIzaSyARaSrrUoZcecS9MawCuXA3AEmxxiZELyU'
const cors = require('cors');

const {Todo} = require('./models/todo');
const {authenticate} = require('./middleware/authenticate');

const publicPath = path.join(__dirname, '..' , 'public');
const port = process.env.PORT || 3000;



const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(publicPath));


app.post(('/days/guest') ,(req,res) => {
  const day = new DayGuest({
    date: req.body.body.date,
    hebrewDate: req.body.body.hebrewDate,
    completedAt: new Date().getTime(),
    typeSuspc: req.body.body.typeSuspc,
    timeSuspc: req.body.body.timeSuspc,
    sunrise: req.body.body.sunrise,
    sunset: req.body.body.sunset,
  });

  day.save().then((doc) => {
    res.send(doc);
  }).catch((e) => {
   res.status(200).send(e);
  });
});


app.get(process.setting.urlAdmin,(req,res) => {

 DayGuest.find().then((docs) => {
  res.status(200).send(docs)
 }).catch((e) => {
   res.status(200).send(e)
 })
 

});

app.get(('*'), (req,res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is up ${port}`);
});






