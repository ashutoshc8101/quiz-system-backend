const mongoose = require('mongoose');
const chalk = require('chalk');


function connect() {
    require('dotenv').config();
    
    const url = 'mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASSWORD + '@' + process.env.MONGODB_URL;

    mongoose.connect(url , { useMongoClient : true });
    mongoose.Promise = global.Promise;
    mongoose.connection.once('open', ()=>{
        console.log(chalk.yellow.bold(`Connected to mongodb database`));
    });
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

}

module.exports = {
  connect,
  connection: mongoose.connection
};