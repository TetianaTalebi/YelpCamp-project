const mongoose = require('mongoose');

const db = mongoose.connection;

const Campground = require('../models/campground');

const cities = require('./cities');

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





// const createNewDoc = async () => {
//     const c = new Campground({title: 'Black Sea', price: 2.50});
//     const b = new Campground({title: 'Big River', price: 4.30});
//     const a = new Campground({title: 'Great Mountain', price: 1.50});
//     console.log(c, b, a);
//     await c.save();
//     await b.save();
//     await a.save()
// }

// createNewDoc();

const seedDB = async () => {

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

