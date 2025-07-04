const express = require('express');
const router = express.Router();
const { createFlower, getFlowers, getFlower, deleteFlower, updateFlower, upload } = require('../controller/flowerController');

router.get('/', getFlowers);

router.get('/:id', getFlower);

router.post('/', upload.single('Image'), createFlower); 

router.delete('/:id', deleteFlower); 

router.patch('/:id', upload.single('Image'), updateFlower);

module.exports = router;
