const CurbsideItem = require('../models/items');

module.exports.index = async (req, res) => {
    const items = await CurbsideItem.find({});
    res.render('index', { items })
}

module.exports.show = async (req, res) => {
    const { id } = req.params;
    const item = await CurbsideItem.findById(id);
    console.log(item);  
    res.render('show', { item });
}