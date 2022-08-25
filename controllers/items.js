const CurbsideItem = require('../models/items');

module.exports.index = async (req, res) => {
    const items = await CurbsideItem.find({});
    console.log(items);
    res.render('index', { items })
}