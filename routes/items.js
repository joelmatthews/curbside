const express = require('express');
const itemsController = require('../controllers/items');
const router = express.Router();

router.get('/', itemsController.index);

module.exports = router;