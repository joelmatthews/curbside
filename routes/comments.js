const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const commentsController = require('../controllers/comments');
const { validateComment } = require('../middleware');

router.post('/', validateComment, catchAsync(commentsController.createComment));

router.delete('/:commentId', catchAsync(commentsController.deleteComment));

module.exports = router;