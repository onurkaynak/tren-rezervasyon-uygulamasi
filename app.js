const express = require('express');

const { errorHandler, notFound } = require('./controllers/error');

const app = express();

app.use(notFound);

app.use(errorHandler)

app.listen(8080);
