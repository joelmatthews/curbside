const express = require('express');
const itemsController = require('../controllers/items');
const router = express.Router();

router.get('/', itemsController.index);

router.get('/new', itemsController.newForm);

router.get('/:id', itemsController.show);

router.post('/', itemsController.new);

module.exports = router;