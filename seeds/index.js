const mongoose = require('mongoose');

const db = mongoose.connection;

const Campground = require('../models/campground');

const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');

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



const seedDB = async () => {

    // Empty database

    // Empty database

    await Campground.deleteMany({});

    // Add 50 campgrounds to the db that have random location
    // Choose location randomly from cities array

    for (let i=0; i<50; i++){

        // cities is an array that contains objects
        // we are generating a random number from 0 to cities.length

        let randomCities = Math.floor(Math.random()*(cities.length));
        const camp = new Campground({location: `${cities[randomCities].city}, ${cities[randomCities].state}`});
        await camp.save();
    }
    
}

seedDB();

