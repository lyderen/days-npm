
const path = require('path');
const express = require('express');
const {mongoose} = require('./db/mongose');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const _ = require('lodash');
const {Day,DayGuest} = require('./models/days');
const {User} = require ('./models/user.js');
const {Note} = require('./models/note')
const session = require('express-session');
const cors = require('cors');

const {authenticate} = require('./middleware/authenticate');
const {queries} = require('./db/quereis');

const publicPath = path.join(__dirname, '..' , 'public');
const port = process.env.PORT || 3000;

process.settingKeys = require('../EnvaiermantVariable/setting');


const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(publicPath));
app.use(session({secret: process.settingKeys.keys.sessionKey, saveUninitialized: false, resave: false}))

app.post(('/days/guest') ,(req,res) => {
  const day = new DayGuest({
    sourceDate: req.body.body.sourceDate,
    date: req.body.body.date,
    hebrewDate: req.body.body.hebrewDate,
    completedAt: new Date().getTime(),
    typeSuspc: req.body.body.typeSuspc,
    timeSuspc: req.body.body.timeSuspc,
    sunRise: req.body.body.sunRise,
    sunSet: req.body.body.sunSet,
    citi:req.body.body.citi
  });

  day.save().then((doc) => {
    res.send(doc);
  }).catch((e) => {
   res.status(200).send(e);
  });
});

app.post(('/user/signup') , (req,res) => {
  const body = _.pick(req.body.body, ['email', 'password', 'userName','lastName'])
  
  if(body.lastName){
    res.status(200).send('<h1> Maybe next time....</h1>');
  }else { 
    var user = new User(body);
    
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.cookie('token', token, {maxAge : 6000 * 100 * 10, httpOnly: true});
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(200).send(e);
    }) 
  }

  });

  app.post('/user/login', (req, res) => {
    const body = _.pick(req.body.body, ['email','password','lastName']);
    if(body.lastName){
      res.status(200).send('<h1> Maybe next time....</h1>');
    }else {
      User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
          res.cookie('token', token, {maxAge : 6000 * 100 * 10, httpOnly: true});
          res.header('x-auth', token).send(user);
        });
      }).catch((e) => {
        console.log(e)
        res.status(200).send(e);
      });
    }
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
      _creator: req.user._id,
      append: req.body.body.append,
      delete: req.body.body.delete,
      systemApplay: req.body.body.systemApplay,
      citi:req.body.body.citi,
      haflagaAppend: req.body.body.haflagaAppend
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

app.post('/user/edithaflaga', authenticate, (req,res) => {
  const idS = req.body.body; 
  console.log(idS);
   let dysColect = [],
       days = [];
   dysColect =  idS.map(async (id) => {
    const doc = await Day.findOneAndUpdate({ _id: id }, { $set: { haflagaAppend: true } }, { returnOriginal: false, 'new': true });
     return doc;
    });
      
    for(let i = 0; i < 2 ;i++){
      dysColect[i].then((docs) => {
       days.push(docs)
       
       if(days.length == 2){
         res.send(days);
       }
      })

    }
   })  
    


app.post('/user/edit', authenticate, (req,res) => {
  const id = req.body.body.id,
        time = req.body.body.time;
   console.log(req.body.body);
     Day.findOneAndUpdate({_id: id}, {$set: { append: true, timeSuspc: time}},{returnOriginal: false,'new':true}).then((day) => {
      
        res.send(day)
     }).catch((e) => {
       res.status(200).send(e);
     })
})

  app.delete('/users/logout', authenticate, (req,res) => {
    req.user.removeToken(req.cookies.token).then(() => {
      res.status(200).send('u r log out');
    }, (e) => {
      console.log(e);
      res.status(200).send(e);
    })
});

app.post('/connect',(req, res) => {
     const note = new Note({
      email: req.body.body.email,
      title: req.body.body.title,
      topic: req.body.body.topic,
      creatAt: new Date().getTime,
      lastName: req.body.body.lastName 
     });

  if(note.lastName){
    res.status(200).send('<h1> Maybe next time....</h1>');
  } else {
    note.save().then(() => {
      res.send('Thenks for your Note will handel shortly')
    }).catch((e) => {

    })
  }
})

app.get(process.settingKeys.keys.urlAdmin,(req,res) => {
     if(!req.session.name){
       req.session.name = process.settingKeys.keys.sessionName;
       // res.render()
       res.sendFile(path.join(publicPath,'../admin/enter.html'));
     } else {
      res.status(400).send('invalid ecsessc');
       
     }
});

app.get('/admindashbord',(req,res) => {
  console.log(req.session);
 if(req.session.name == process.settingKeys.keys.sessionName){
   res.sendFile(path.join(publicPath,'admin.html'));
 } else {
  res.status(400).send('u r not admin, work hard...');
 }
});
//,{typeSuspc: data.typeSuspc}, { date: { $gt: data.startDay, $lt: data.endDay }}
app.post('/admindashbord/data/guest', (req,res) => {
  if(req.session.name == process.settingKeys.keys.sessionName){
     
      return  queries(req.body.body)
      
      .then((days) => {
        res.send({days})             
      }).catch((e) => {
        res.status(200).send('cant recived data');
      })
  } else{
    res.status(400).send('u r not admin, work hard...');
  }
})

app.get('/admindashbord/notes',(req,res) => {
  if(req.session.name == process.settingKeys.keys.sessionName){
    Note.find({read: false}).then((doc) => {
      const notes = doc;
        res.send({notes});
    }).catch((e) => {
      res.status(200).send('cant recived data');
    })
  }else {

    res.status(400).send('u r not admin, work hard...');
  }

});

app.post('/admindashbord/notes/edit',(req,res) => {
  if(req.session.name == process.settingKeys.keys.sessionName){
      const id = req.body.body;

      Note.findOneAndUpdate({_id: id}, {$set:{read: true}}).then((note) => {
        res.send(note);
      })
  }else {
    res.status(400).send('u r not admin, work hard...');
  }
})

app.post('/admindashbord/data/delete',(req,res) => {
  if(req.session.name == process.settingKeys.keys.sessionName){
       const id = req.body.body;
       console.log(id);
         // future add a funct that old all the files that will be removed irter on the id's array
       DayGuest.remove({ _id: id}).then((response) => {
  console.log(response)
         res.status(200).send(response);
       })
      
} else{
  res.status(400).send('u r not admin, work hard...');
}
})

app.get(('*'), (req,res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is up ${port}`);
});






