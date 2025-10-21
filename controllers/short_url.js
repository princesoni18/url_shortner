const shortid = require('short-id');
const Url = require('../models/url_model');

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const shortId = shortid.generate();
  await Url.create({
    shortId,
    redirectUrl: url,
  });

  return res.json({ shortId });
}

async function handleShortenWeb(req, res) {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  const shortId = shortid.generate();
  await Url.create({
    shortId,
    redirectUrl: url,
  });

  res.redirect(`/?shortUrl=${shortId}`);
}

async function handleAnalytics(req, res) {
  const { shortId } = req.body;
  if (!shortId) {
    return res.status(400).send('Short ID is required');
  }

  const entry = await Url.findOne({ shortId });
  if (!entry) {
    return res.redirect('/?error=Short URL not found');
  }

  const urlData = encodeURIComponent(JSON.stringify(entry));
  res.redirect(`/?urlData=${urlData}`);
}

async function handleRedirect(req, res) {
  const { shortId } = req.params;
  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitedHistory: { timestamp: Date.now() } } }
  );

  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.redirect(entry.redirectUrl);
}

module.exports = {
  handleGenerateNewShortURL,
  handleRedirect,
  handleShortenWeb,
  handleAnalytics,
};
