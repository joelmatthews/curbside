const CurbsideItem = require('../models/items');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const items = await CurbsideItem.find({});
    res.render('index', { items })
};

module.exports.show = async (req, res) => {
    const { id } = req.params;
    const item = await CurbsideItem.findById(id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!item) {
        req.flash('error', 'Cannot Find Item!');
        res.redirect('/items');
    }
    res.render('show', { item });
};

module.exports.newForm = async (req, res) => {
    res.render('new');
};

module.exports.newItem = async (req, res) => {
    const formData = req.body.item;
    const curbsideItem = new CurbsideItem(formData);
    curbsideItem.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    curbsideItem.author = req.user._id;
    await curbsideItem.save();
    console.log(curbsideItem);
    res.redirect(`/items/${curbsideItem._id}`);
}

module.exports.editForm = async (req, res) => {
    const { id } = req.params;
    const curbsideItem = await CurbsideItem.findById(id);
    if (!curbsideItem) {
        req.flash('error', 'Cannot Find Item!');
        res.redirect('/items');
    }
    res.render('edit', { curbsideItem })
}

module.exports.editItem = async (req, res) => {
    const { id } = req.params;
    const curbsideItem = await CurbsideItem.findByIdAndUpdate(id, { ...req.body.item });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    curbsideItem.images.push(...imgs);
    await curbsideItem.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await curbsideItem.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        console.log(curbsideItem)
    }
    if (!curbsideItem) {
        req.flash('error', 'Cannot Find Item!');
        res.redirect('/items')
    }
    req.flash('success', 'Successfully Updated Item')
    res.redirect(`/items/${curbsideItem._id}`);
}

module.exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    await CurbsideItem.findByIdAndDelete(id);
    res.redirect('/items');
}