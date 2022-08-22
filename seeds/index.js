const mongoose = require('mongoose');
const CurbSideItem = require('../models/items');

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
    await CurbSideItem.deleteMany({})
    const randomArray = Math.floor(Math.random() * 5 ) - 1;
    for (let i = 0; i < 50; i++) {
        const newItem = new CurbSideItem({
            name: 'Random Test Item',
            location: {
                address: '200 York Rd, Jenkintown PA',
                zip: 19000
            },
            category: category[randomArray],
            image: 'https://images.unsplash.com/photo-1577926103605-f426874bee28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
        })
        await newItem.save();
    }
    
}

seedDB().then(() => {
    mongoose.connection.close();
})
