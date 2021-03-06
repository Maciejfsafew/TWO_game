var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("DB is connected");
});

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    strength: Number,
    dexterity: Number,
    hp: Number,
    maxhp: Number,
    level: Number,
    highscoreEnabled: Boolean,
    highscoreName: String,
    experience: Number,
    items: Array,
    gold: Number,
    sleep_start: Date,
    currentLocation: mongoose.Schema.Types.Mixed,
    playfield: mongoose.Schema.Types.Mixed,

    // Fields used for quests
    attackedMonsters: Number,
    completedQueezes: Number,
    completedQuests: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;