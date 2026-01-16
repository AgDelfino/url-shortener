const express = require('express');
const {handleGenerateNewUrl, handleDeleteUrl, handleGetAnalytics} = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateNewUrl);
router.delete('/:shortId', handleDeleteUrl)
router.get('/analytics/:shortId', handleGetAnalytics);
module.exports = router;