var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("DB is connected");
});

var userSchema = mongoose.Schema({
    username: String,
    password: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;