const mongoose = require('mongoose');

export default function handler(req, res) {
    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String
    });

    const User = mongoose.models('Users', userSchema);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
    // we're connected!
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        newUser.save(()=> {
            if(err)
                res.status(500).json({message: "Problem occured"});
            else
                res.status(200).json({message: "New User created"});
        })
    });
}