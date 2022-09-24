const express = require('express');
const itemsController = require('../controllers/items');
const catchAsync = require('../utilities/catchAsync');
const router = express.Router({ mergeParams: true });
const { validateItem, isLoggedIn, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary'); 
const upload = multer({ storage });


router.get('/', catchAsync(itemsController.index));

router.get('/new', isLoggedIn, catchAsync(itemsController.newForm));

router.get('/:id', catchAsync(itemsController.show));
router.put('/:id', isLoggedIn, isAuthor, validateItem, upload.array('images'), catchAsync(itemsController.editItem));
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(itemsController.deleteItem));

router.post('/', isLoggedIn, validateItem, upload.array('images'), catchAsync(itemsController.newItem));


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(itemsController.editForm));

module.exports = router;