const CurbsideItem = require('../models/items');

module.exports.index = async (req, res) => {
    const items = await CurbsideItem.find({});
    res.render('index', { items })
};

module.exports.show = async (req, res) => {
    const { id } = req.params;
    const item = await CurbsideItem.findById(id).populate('comments');  
    res.render('show', { item });
};

module.exports.newForm = async (req, res) => {
    res.render('new');
};

module.exports.newItem = async (req, res) => {
    const formData = req.body.item;
    const curbsideItem = new CurbsideItem(formData);
    console.log(curbsideItem);
    await curbsideItem.save();
    res.redirect(`/items/${curbsideItem._id}`);
}

module.exports.editForm = async (req, res) => {
    const { id } = req.params;
    const curbsideItem = await CurbsideItem.findById(id);
    console.log(curbsideItem);
    res.render('edit', { curbsideItem })
}

module.exports.editItem = async (req, res) => {
    const { id } = req.params;
    const curbsideItem = await CurbsideItem.findByIdAndUpdate(id, { ...req.body.item });
    await curbsideItem.save();
    res.redirect(`/items/${curbsideItem._id}`);
}

module.exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    await CurbsideItem.findByIdAndDelete(id);
    res.redirect('/items');
}