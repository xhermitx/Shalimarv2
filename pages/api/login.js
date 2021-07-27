const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
});

export default function handler(req, res) {
    if(req.body.email = "rohit@gmail.com" && req.body.password=="pass"){
        res.status(200).json({message: "Logged in"});
    }
    else{
        res.status(200).json({message: "wrogn credentials"});
    }
  }
