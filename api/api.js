const Router = require('express').Router();
const authRoutes = require('../auth/auth');

Router.use('/auth', authRoutes);

Router.get('/', (req,res)=>{
    res.send({ 'msg': 'api working' });
});

module.exports = Router;