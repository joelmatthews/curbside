const express = require('express');
const itemsController = require('../controllers/items');
const catchAsync = require('../utilities/catchAsync');
const router = express.Router();
const { validateItem } = require('../middleware');

router.get('/', catchAsync(itemsController.index));

router.get('/new', catchAsync(itemsController.newForm));

router.get('/:id', catchAsync(itemsController.show));
router.put('/:id', validateItem, catchAsync(itemsController.editItem));
router.delete('/:id', catchAsync(itemsController.deleteItem));

router.post('/', validateItem, catchAsync(itemsController.newItem));

router.get('/:id/edit', catchAsync(itemsController.editForm));

module.exports = router;