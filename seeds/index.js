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

// Define a function 'sample' that accepts an array as an argument 
// and return the random element from this array
const sample = array => array[Math.floor(Math.random()*array.length)];

const price = Math.floor(Math.random()*20)+19;



const seedDB = async () => {

    // Empty the database

    await Campground.deleteMany({});

    // Add 50 campgrounds to the db that have random location
    // Choose location randomly from cities array

    for (let i=0; i<50; i++){

        // cities is an array that contains objects
        // we are generating a random number from 0 to cities.length-1

        let randomCities = Math.floor(Math.random()*(cities.length));
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url:'https://res.cloudinary.com/dljmlxtmx/image/upload/v1728274651/YelpCamp/ldjs8sxrmnsxy0jbrpzc.jpg',
                    filename: 'YelpCamp/ldjs8sxrmnsxy0jbrpzc'
                },{
                    url: 'https://res.cloudinary.com/dljmlxtmx/image/upload/v1728274651/YelpCamp/rglqq3sjus1rszypyxqt.jpg',
                    filename: 'YelpCamp/rglqq3sjus1rszypyxqt'
                },{
                    url: 'https://res.cloudinary.com/dljmlxtmx/image/upload/v1728274651/YelpCamp/ektmez6kxmfv2huod6sz.jpg',
                    filename: 'YelpCamp/ektmez6kxmfv2huod6sz'
                },{
                    url: 'https://res.cloudinary.com/dljmlxtmx/image/upload/v1728274651/YelpCamp/a2erd1lfnq9naz8atwbo.jpg',
                    filename: 'YelpCamp/a2erd1lfnq9naz8atwbo'
                }
            ],
            geometry: {
                type: 'Point',
                coordinates: [-74.014181, 40.780945]
            },
            price,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis saepe nulla rerum, sit perferendis cumque eos labore minima esse blanditiis assumenda maiores animi non commodi voluptatem eveniet eum quas molestiae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae velit odit libero facere soluta, magnam molestias rerum aspernatur perferendis possimus dolores voluptate repudiandae tempora provident incidunt cumque repellendus in adipisci. Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            author: '66f0e0cfafa6e339ae846860',
            location: `${cities[randomCities].city}, ${cities[randomCities].state}`

        });
        await camp.save();
    }
    
}

seedDB()
.then(()=>{
    mongoose.connection.close();
    console.log('db connection closed')
});

