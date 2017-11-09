const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const connection = require('./model/connection');
const User = require('./model/User');

const app = express();

app.set('port', process.env.PORT || 8000);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(morgan('dev'));
app.use('/api', require('./api/api'));

app.get('/', (req,res)=>{
    res.send({'msg': 'Api working at /api'});
})

app.listen(app.get('port'), ()=>{
 console.log(chalk.cyan.bold(`Listening for requests on port ${app.get('port')}`));
});