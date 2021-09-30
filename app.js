const express = require('express');

const { errorHandler, notFound } = require('./controllers/error');
const { rezervasyonRoutes } = require('./routes');

const app = express();

app.use('/rezervasyon', rezervasyonRoutes);

app.use(notFound);

app.use(errorHandler)

app.listen(8080);
