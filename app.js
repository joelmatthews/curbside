const express = require('express');
const mongoose = require('mongoose');
const { mainModule } = require('process');
const app = express();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/curbside');
}

app.get('/', (req, res) => {
    res.send('hello');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})