require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/router');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use('/', router);

const PORT = 3000;
app.listen(PORT, () => console.log(`Connected at port: ${PORT}`))