const express = require('express');

const { notFound } = require('./controllers/error');

const app = express();

app.use(notFound);

app.listen(8080);
