const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/syook_assignment')

const db = mongoose.connection

db.on('error', console.error.bind('Error connecting to Database'))

db.once('open', function(){
    console.log('Connected to Database')
})

module.exports = db;

