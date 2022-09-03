const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const commentsController = require('../controllers/comments');

router.post('/', catchAsync(commentsController.createComment));

router.delete('/:commentId', catchAsync(commentsController.deleteComment));

module.exports = router;