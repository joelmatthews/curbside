const Comment = require('../models/comment');
const CurbsideItem = require('../models/items');

module.exports.createComment = async (req, res) => {
    const { id } = req.params;
    const curbsideItem = await CurbsideItem.findById(id);
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    curbsideItem.comments.push(comment);
    await curbsideItem.save();
    await comment.save();
    req.flash('success', 'Sucessfully Created a Comment');
    res.redirect(`/items/${curbsideItem._id}`);
    
}

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    await CurbsideItem.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Sucessfully Deleted a Comment');
    res.redirect(`/items/${id}`);
}