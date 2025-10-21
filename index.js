require('dotenv').config();

const express = require('express');
const path = require('path');
const logger = require('./utils/logger');
const connectDB = require('./utils/mongoose');

connectDB();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const shortUrlRoutes = require('./routes/short_url');
app.use('/url', shortUrlRoutes);

app.get('/', (req, res) => {
  logger.info('Root endpoint hit');
  const shortUrl = req.query.shortUrl ? `${req.protocol}://${req.get('host')}/url/${req.query.shortUrl}` : null;
  const urlData = req.query.urlData ? JSON.parse(decodeURIComponent(req.query.urlData)) : null;
  res.render('home', { shortUrl, urlData });
});

app.get('/demo', (req, res) => {
  logger.info('Demo endpoint hit');
  res.json({ message: 'Hello from URL Shortener!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
