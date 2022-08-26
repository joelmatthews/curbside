const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

//express router routes
const itemRoutes = require('./routes/items');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/curbside');
}

//EJS Template set up
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Serve Static Assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/items', itemRoutes);

app.get('/', (req, res) => {
    res.send('hello');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})