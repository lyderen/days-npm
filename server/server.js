
const path = require('path');
const express = require('express');
const {mongoose} = require('./db/mongose');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const _ = require('lodash');
const {Day,DayGuest} = require('./models/days');
const {User} = require ('./models/user.js');
// 'AIzaSyARaSrrUoZcecS9MawCuXA3AEmxxiZELyU'
const cors = require('cors');

const {Todo} = require('./models/todo');
const {authenticate} = require('./middleware/authenticate');

const publicPath = path.join(__dirname, '..' , 'public');
const port = process.env.PORT || 3000;

process.settingKeys = require('../EnvaiermantVariable/setting');


const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(publicPath));


app.post(('/days/guest') ,(req,res) => {
  const day = new DayGuest({
    sourceDate: req.body.body.sourceDate,
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

app.post(('/user/signup') , (req,res) => {
  const body = _.pick(req.body.body, ['email', 'password', 'userName'])
   
  var user = new User(body);
  
  user.save().then(() => {
    return user.generateAuthToken();
      }).then((token) => {
         res.cookie('token', token, {maxAge : 6000 * 100 * 10, httpOnly: true});
         res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(200).send(e);
    })   
  });

  app.post('/user/login', (req, res) => {
    const body = _.pick(req.body.body, ['email','password']);
  
    User.findByCredentials(body.email, body.password).then((user) => {
          return user.generateAuthToken().then((token) => {
            res.cookie('token', token, {maxAge : 6000 * 100 * 10, httpOnly: true});
            res.header('x-auth', token).send(user);
          });
    }).catch((e) => {
      console.log(e)
        res.status(200).send(e);
    });
  });
  
  app.post(('/days'),authenticate ,(req,res) => {
    const day = new Day({
      sourceDate: req.body.body.sourceDate,
      date: req.body.body.date,
      hebrewDate: req.body.body.hebrewDate,
      completedAt: new Date().getTime(),
      typeSuspc: req.body.body.typeSuspc,
      timeSuspc: req.body.body.timeSuspc,
      sunRise: req.body.body.sunRise,
      sunSet: req.body.body.sunSet,
      _creator: req.user._id
    });
   
    day.save().then((doc) => {
      res.send(doc);
    }).catch((e) => {
     res.status(200).send(e);
    });
  });

  app.get(('/days') , authenticate, (req,res) => {
    Day.find({
      _creator: req.user._id
    }).then((days) => {
      res.send({days})
    }).catch((e) => {
      res.status(200).send(e);
    })
});

  app.delete('/users/logout', authenticate, (req,res) => {
    req.user.removeToken(req.cookies.token).then(() => {
      res.status(200).send('u r log out');
    }, (e) => {
      console.log(e);
      res.status(200).send(e);
    })
});

app.get(process.settingKeys.keys.urlAdmin,(req,res) => {

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






