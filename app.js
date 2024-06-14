const express = require('express');

const path = require('path');
const mongoose = require('mongoose');

// Require Campground model from models/campground.js
const Campground = require('./models/campground');

// Create a mongoose.connection shortcut
const db = mongoose.connection;

db.on('connected', () => console.log('connected'));
db.on('open', () => console.log('open'));
db.on('disconnected', () => console.log('disconnected'));
db.on('reconnected', () => console.log('reconnected'));
db.on('disconnecting', () => console.log('disconnecting'));
db.on('close', () => console.log('close'));

mongoose.connect('mongodb://127.0.0.1:27017/myyelpcamp')
.then(() => console.log("Mongo connection is open!"))
.catch((err) => {
    console.log("Mongo connection error!");
    console.log(err)
})

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
    // res.send('Hello from YelpCamp!')
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title: 'My Backyard', description: 'Cheap Camping'});
    await camp.save();
    res.send(camp)
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})