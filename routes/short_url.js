const express = require('express');
const router = express.Router();
const { handleGenerateNewShortURL, handleRedirect, handleShortenWeb, handleAnalytics } = require('../controllers/short_url');

router.post('/', handleGenerateNewShortURL);
router.post('/shorten', handleShortenWeb);
router.post('/analytics', handleAnalytics);
router.get('/:shortId', handleRedirect);

module.exports = router;
