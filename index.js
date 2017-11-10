const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const db = require('./model/db');

const app = express();

app.set('port', process.env.PORT || 8000);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
db.connect();
app.use(morgan('dev'));
app.use('/api', require('./api/api'));

app.get('/', (req,res)=>{
    res.send({'msg': 'Api working at /api'});
});

app.listen(app.get('port'), ()=>{
 console.log(chalk.cyan.bold(`Listening for requests on port ${app.get('port')}`));
});