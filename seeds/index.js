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
            location: {
                addressLineOne: '200 York Rd',
                addressLineTwo: '',
                city: 'Jenkintown',
                state: 'PA',
                zip: 19000
            },
            category: category[0],
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae iaculis sem, eu pulvinar sem. Cras lacinia a est id luctus. Curabitur dapibus orci quis maximus tristique. Etiam ornare tristique dolor, at venenatis felis ultrices vel. Sed vestibulum mi sed lorem posuere mollis. Sed id enim in enim tempus dapibus. Morbi dui purus, euismod a lectus ac, aliquet interdum lacus.',
            image: 'https://images.unsplash.com/photo-1577926103605-f426874bee28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
        })
        await newItem.save();
    }
    
}

seedDB().then(() => {
    mongoose.connection.close();
})
