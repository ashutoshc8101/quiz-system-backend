const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL, { useMongoClient : true });
mongoose.Promise = global.Promise;
mongoose.connection.once('open', ()=>{
    console.log(chalk.yellow.bold(`Connected to mongodb database`));
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose.connection;
