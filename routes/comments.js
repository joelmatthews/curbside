const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const commentsController = require('../controllers/comments');
const { validateComment, isLoggedIn, isCommentAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateComment, catchAsync(commentsController.createComment));

router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(commentsController.deleteComment));

module.exports = router;