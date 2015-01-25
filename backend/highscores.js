var db_user = require('./db_user');

exports.get_config = function() {
    var config, config_json = fs.readFileSync(__dirname + "/../config/game_config.json");
    try {
        config = JSON.parse(config_json);
        console.log("parsed config");
        console.log(config);
        return config;
    } catch (err) {
        console.error('Error parsing configuration JSON!')
        console.error(err);
        return 'error';
    }
}

exports.get_all_players = function(callback) {
    //TODO: filter by finished == true
    db_user.where('hp').gt(1).exec(function(err, players) {
        if(!err) {
            callback(players);
        } else {
            console.error(error);
            callback('error');
        }
    });
};

function stat_value(property) {
    if (property instanceof Array) {
        return stat_value(property.length)
    } else {
        return property;
    }
}

exports.get_highscores = function(callback) {
    var config = exports.get_config();
    exports.get_all_players(function(players) {
        var weights = config["playerscore"];
        var high_scores = [];
        players.forEach(function (player) {
            var player_score = 0;
            for (var prop in weights) {
                if(prop in player) {
                    player_score += weights[prop] * stat_value(player[prop]);
                } else {
                    console.warn("Player property: " + prop + " requested in game_config not found!");
                }
            }
            if (player.highscoreEnabled) {

                high_scores.push({
                    name: player.highscoreName,
                    score: player_score
                });
            }
        });
        callback(high_scores);
    });
};
