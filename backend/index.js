const express = require('express');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const app = express();

//CROSS ORIGIN REQUESTS
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(fileupload());

//ESTABLISH CONNECTION
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

//HANDLING ERRORS
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //CONNECTED
});

//USER MODEL
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    count: {
        type: Number,
        default: 0
    }
        ,
    img: [
        {
            name: String,
            email: String,
            data: Buffer
        }
    ],
    deathDocs: [
        {
            data: Buffer
        }
    ]
});

const User = mongoose.model('Users', userSchema);

//SIGNING UP A USER
app.post('/signup', (req,res)=> {
    User.create({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, (err,data) => {
        if(err)
            console.log(err)
    });
    res.send('User created');
});

//USER LOGIN
app.post('/login', (req,res) => {
    User.findOne({email: req.body.email, password: req.body.password}, (err, data) => {
        if(err)
            res.send("Error hai bhai");
        console.log(req.body.email, req.body.password);
        console.log(data);
        res.send(data._id);
    });
})

//UPLOAD IMAGE
app.post('/upload', async (req,res) => {
    //ID OF THE USER
    const id = req.body.id;
    const Email = req.body.email;
    //FILE PROPERTIES
    const fileName = req.files.file.name;
    const fileData = req.files.file.data;

    //UPDATING THE IMAGE
    const user = await User.findById(id);
    user.img.push({
        name: fileName,
        email: Email,
        data: fileData
    })
    const resData = await user.save();
    res.send(req.files.file);
});

app.get('/drive', async (req,res) => {
    const id = req.query.id;
    // console.log(req.query.id);
    const images = await User.findById(id)
    console.log(images.img);
    res.send(images.img);
});

app.post('/claim', async (req,res) => {
    const Email = req.body.email;
    const image = req.files.file.data;

    const user = await User.findOne({ email: Email});
    user.deathDocs.push({
        data: image
    });
    console.log(req.files.file);
    user.count += 1;
    await user.save();
    // const user = await User.findOne({ email: Email});
    if(user.count == 2){
        if(Buffer.compare(user.deathDocs[0].data, image) === 0){
            const user = await User.findOne({ email: Email});
            user.img.forEach(async (e) => {
                const to_user = await User.findOne({ email: e.email});
                to_user.img.push({
                    name: e.name,
                    email: "",
                    data: e.data
                })
                await to_user.save();
                console.log('saved');
            })
        }
    }
    res.send(req.files.file);
})

app.get('/', (req,res) => {
    res.send('connected')
});

app.listen(8080, () => {
    console.log('Connected');
});