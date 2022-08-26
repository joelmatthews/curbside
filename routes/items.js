const express = require('express');
const itemsController = require('../controllers/items');
const router = express.Router();

router.get('/', itemsController.index);

router.get('/:id', itemsController.show);

module.exports = router;