const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

require('./controllers/authController')(app);

app.listen(3000);