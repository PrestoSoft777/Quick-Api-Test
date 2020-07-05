const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const router = require('./src/router');
const Mongo = require('./.mongoKey');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

mongoose.connect(Mongo, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.set('view engine', 'ejs');

app.use('/', router);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
