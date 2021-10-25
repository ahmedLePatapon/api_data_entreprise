const express = require('express');
const createError = require('http-errors');

const config = require('./config');
const port = config.PORT || '3000';

const app = express();

const apiRouter = require('./api/index');

app.use('/api', apiRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500).json(err);
});

app.listen(port, () => console.log(`serveur à l\`ecoutesur le port http://localhost:${port}`))