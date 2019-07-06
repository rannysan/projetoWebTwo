const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use(express.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

app.listen(3000);