if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}

const mongoose = require('mongoose');

const db = mongoose.connection;

const Campground = require('../models/campground');

const cities = require('./cities_Canada');
const {descriptors, places} = require('./seedHelpers');

db.on('connected', () => console.log('connected'));
db.on('open', () => console.log('open'));
db.on('disconnected', () => console.log('disconnected'));
db.on('reconnected', () => console.log('reconnected'));
db.on('disconnecting', () => console.log('disconnecting'));
db.on('close', () => console.log('close'));

// Production database
// const dbUrl = process.env.DB_URL;

//local database
const dbUrl = 'mongodb://127.0.0.1:27017/myyelpcamp';

mongoose.connect(dbUrl)
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

    // Add 750 campgrounds to the db that have random location
    // Choose location randomly from cities array

    for (let i=0; i<750; i++){

        // cities is an array that contains objects

        // we are generating a random number from 0 to cities.length-1
        let randomCities = Math.floor(Math.random()*(cities.length));

        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url:'https://res.cloudinary.com/dljmlxtmx/image/upload/v1728789755/YelpCamp/y8n7kyigm3atucteitay.jpg',
                    filename: 'YelpCamp/ldjs8sxrmnsxy0jbrpzc'
                },{
                    url: 'https://res.cloudinary.com/dljmlxtmx/image/upload/v1728700713/YelpCamp/gfkmkfkwxkxo9umiu2te.jpg',
                    filename: 'YelpCamp/rglqq3sjus1rszypyxqt'
                },{
                    url: 'https://res.cloudinary.com/dljmlxtmx/image/upload/v1728700713/YelpCamp/h9ew8qvx7djmvjr6qvdj.jpg',
                    filename: 'YelpCamp/ektmez6kxmfv2huod6sz'
                },{
                    url: 'https://res.cloudinary.com/dljmlxtmx/image/upload/v1728789755/YelpCamp/jji26dp2xxjfrskslzew.jpg',
                    filename: 'YelpCamp/a2erd1lfnq9naz8atwbo'
                }
            ],
            geometry: {
                type: 'Point',

                coordinates: [
                    `${cities[randomCities].longitude}`,
                    `${cities[randomCities].latitude}`
                    ]

            },
            price,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis saepe nulla rerum, sit perferendis cumque eos labore minima esse blanditiis assumenda maiores animi non commodi voluptatem eveniet eum quas molestiae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit ex fugiat quis velit ipsum. Duis culpa ut ea aliqua id culpa esse mollit aute culpa. Nulla nulla non incididunt aliquip. Tempor duis nisi ex ipsum laboris minim proident culpa Lorem mollit occaecat. Do veniam reprehenderit dolore nisi elit consectetur. Incididunt reprehenderit ea nulla cupidatat enim. Minim laborum eiusmod dolore excepteur sit laboris sit et culpa aliqua pariatur sunt sint. Proident Lorem deserunt voluptate proident do. Magna nostrud id minim non. Anim deserunt enim culpa proident incididunt consectetur. Culpa ea exercitation irure incididunt ut cupidatat ex minim adipisicing cupidatat anim exercitation velit. Proident et occaecat qui ea id veniam minim laboris aliqua et duis ex dolore in. Ipsum duis laboris dolor labore tempor anim anim ut ea deserunt ad excepteur dolor deserunt. Elit in aute ipsum magna esse sit cupidatat. Cillum occaecat laboris duis dolore duis consequat non ullamco quis do. Esse mollit labore officia dolor culpa cupidatat Lorem cillum amet. Dolore reprehenderit est commodo sint eiusmod consectetur deserunt. Ea aliqua laborum eu qui. Magna dolore esse aliqua ad. Sint elit fugiat laborum ad anim laborum non. Sunt esse non nulla mollit dolor sit commodo aliqua pariatur irure minim officia nisi. Velit ipsum do esse eu adipisicing velit occaecat minim id irure laboris. Lorem esse deserunt Lorem officia nulla est excepteur. Officia adipisicing do ea reprehenderit. Elit ad voluptate irure exercitation nisi ex consectetur cillum consectetur aliquip velit est esse. Proident elit aliquip amet consectetur consectetur pariatur anim enim. Magna amet culpa laborum laborum. Elit deserunt dolor nisi ut nisi ex eiusmod. Nostrud sunt ea consectetur magna minim ut id in do aute consectetur sunt. Nulla consectetur officia occaecat amet eiusmod anim ea exercitation aliqua nisi voluptate aute esse. Magna irure adipisicing amet consectetur quis proident culpa eu ipsum officia in enim laborum commodo. Dolore veniam proident veniam proident deserunt elit eiusmod anim eiusmod mollit adipisicing incididunt. Laboris amet aliquip Lorem ad id sit sunt amet esse excepteur ex. Qui labore dolore pariatur esse ut pariatur aliquip ex. Proident commodo nulla duis aliqua ipsum duis sunt amet elit non duis. Eiusmod cillum sit aliqua est do Lorem magna do adipisicing in. Magna do nulla ullamco labore ex tempor. Elit incididunt excepteur duis dolore magna voluptate quis sit nulla velit excepteur. Commodo sit sit qui esse et velit esse. Reprehenderit sunt ea ex labore aliquip ullamco duis. Elit laboris culpa proident sunt qui eu voluptate nisi minim sit veniam. Amet sit sint nulla ad officia. Ex dolor anim ea deserunt pariatur excepteur ut.',
            
            // author for external database
            // '672658a117ef894175db3f95'

            // author for internal database
            // '66f0e0cfafa6e339ae846860'

            author: '66f0e0cfafa6e339ae846860',
            location: `${cities[randomCities].city}, ${cities[randomCities].province}`

        });
        await camp.save();
    }
    
}

seedDB()
.then(()=>{
    mongoose.connection.close();
    console.log('db connection closed')
});

