const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ExpressError = require('./utilities/ExpressError');
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
app.use(methodOverride('_method'));

app.use('/items', itemRoutes);

app.get('/', (req, res) => {
    res.send('hello');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Oh no, something went wrong!'} = err;
    res.status(statusCode).render('error', { err })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})