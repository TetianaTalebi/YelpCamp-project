if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const mongoose = require('mongoose');

const db = mongoose.connection;

const Campground = require('../models/campground');

const cities = require('./cities_Canada');
const {descriptors, places, photos, authorsExternalDB, authorsLocalDB} = require('./seedHelpers');

db.on('connected', () => console.log('connected'));
db.on('open', () => console.log('open'));
db.on('disconnected', () => console.log('disconnected'));
db.on('reconnected', () => console.log('reconnected'));
db.on('disconnecting', () => console.log('disconnecting'));
db.on('close', () => console.log('close'));


const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/myyelpcamp';

// const dbUrl = 'mongodb://127.0.0.1:27017/myyelpcamp';

mongoose.connect(dbUrl)
.then(() => console.log("Mongo connection is open!"))
.catch((err) => {
    console.log("Mongo connection error!");
    console.log(err)
})

// Define a function 'sample' that accepts an array as an argument 
// and returns the random element from this array
const sample = array => array[Math.floor(Math.random()*array.length)];

let authors;

// Use different seed helper array for authors that depends whether we use production db or local db
if(process.env.NODE_ENV !== 'production'){
    authors = authorsLocalDB;
} else {
    authors = authorsExternalDB;
}

const seedDB = async () => {

    // Empty the database
    await Campground.deleteMany({});

    for (let i=0; i<cities.length; i++){

        const price = Math.floor(Math.random()*50)+35;

        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            images: sample(photos),
            geometry: {
                type: 'Point',
                coordinates: [
                    `${cities[i].longitude}`,
                    `${cities[i].latitude}`
                    ]

            },
            price,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis saepe nulla rerum, sit perferendis cumque eos labore minima esse blanditiis assumenda maiores animi non commodi voluptatem eveniet eum quas molestiae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit ex fugiat quis velit ipsum. Duis culpa ut ea aliqua id culpa esse mollit aute culpa. Nulla nulla non incididunt aliquip. Tempor duis nisi ex ipsum laboris minim proident culpa Lorem mollit occaecat. Do veniam reprehenderit dolore nisi elit consectetur. Incididunt reprehenderit ea nulla cupidatat enim. Minim laborum eiusmod dolore excepteur sit laboris sit et culpa aliqua pariatur sunt sint. Proident Lorem deserunt voluptate proident do. Magna nostrud id minim non. Anim deserunt enim culpa proident incididunt consectetur. Culpa ea exercitation irure incididunt ut cupidatat ex minim adipisicing cupidatat anim exercitation velit. Proident et occaecat qui ea id veniam minim laboris aliqua et duis ex dolore in. Ipsum duis laboris dolor labore tempor anim anim ut ea deserunt ad excepteur dolor deserunt. Elit in aute ipsum magna esse sit cupidatat. Cillum occaecat laboris duis dolore duis consequat non ullamco quis do. Esse mollit labore officia dolor culpa cupidatat Lorem cillum amet. Dolore reprehenderit est commodo sint eiusmod consectetur deserunt. Qui labore dolore pariatur esse ut pariatur aliquip ex. Proident commodo nulla duis aliqua ipsum duis sunt amet elit non duis. Eiusmod cillum sit aliqua est do Lorem magna do adipisicing in. Magna do nulla ullamco labore ex tempor. Elit incididunt excepteur duis dolore magna voluptate quis sit nulla velit excepteur. Commodo sit sit qui esse et velit esse. Reprehenderit sunt ea ex labore aliquip ullamco duis. Elit laboris culpa proident sunt qui eu voluptate nisi minim sit veniam. Amet sit sint nulla ad officia. Ex dolor anim ea deserunt pariatur excepteur ut.',
            
            author: sample(authors),

            location: `${cities[i].city}, ${cities[i].province}`

        });
        await camp.save();
    }
    
}

seedDB()
.then(()=>{
    mongoose.connection.close();
    console.log('db connection closed')
});

