const mongoose = require('mongoose');
const CurbsideItem = require('../models/items');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/curbside')
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('database connected')
});

const category = ['furniture', 'clothing', 'toys', 'entertainment', 'other'];

const seedDB = async () => {
    await CurbsideItem.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const newItem = new CurbsideItem({
            name: 'Random Test Item',
            author: '6323c7e45693399c8667c39b',
            location: {
                addressLineOne: '200 York Rd',
                addressLineTwo: '',
                city: 'Jenkintown',
                state: 'PA',
                zip: 19000
            },
            category: category[0],
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae iaculis sem, eu pulvinar sem. Cras lacinia a est id luctus. Curabitur dapibus orci quis maximus tristique. Etiam ornare tristique dolor, at venenatis felis ultrices vel. Sed vestibulum mi sed lorem posuere mollis. Sed id enim in enim tempus dapibus. Morbi dui purus, euismod a lectus ac, aliquet interdum lacus.',
            images: [
                {
                  url: 'https://res.cloudinary.com/dubud8fgb/image/upload/v1663893640/Curbside/exv16rmui9erees6pslu.avif',
                  filename: 'Curbside/exv16rmui9erees6pslu',
                }
              ]
        })
        await newItem.save();
    }
    
}

seedDB().then(() => {
    mongoose.connection.close();
})
