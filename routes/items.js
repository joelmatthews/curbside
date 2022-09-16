const express = require('express');
const itemsController = require('../controllers/items');
const catchAsync = require('../utilities/catchAsync');
const router = express.Router({ mergeParams: true });
const { validateItem, isLoggedIn } = require('../middleware');


router.get('/', catchAsync(itemsController.index));

router.get('/new', isLoggedIn, catchAsync(itemsController.newForm));

router.get('/:id', catchAsync(itemsController.show));
router.put('/:id', isLoggedIn, validateItem, catchAsync(itemsController.editItem));
router.delete('/:id', isLoggedIn, catchAsync(itemsController.deleteItem));

router.post('/', isLoggedIn, validateItem, catchAsync(itemsController.newItem));

router.get('/:id/edit', isLoggedIn, catchAsync(itemsController.editForm));

module.exports = router;