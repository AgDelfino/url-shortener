const express = require('express');
const {handleGenerateNewUrl, handleDeleteUrl} = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateNewUrl);
router.delete('/:shortId', handleDeleteUrl);
module.exports = router;