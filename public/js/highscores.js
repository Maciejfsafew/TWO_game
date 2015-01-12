function backs() {
    primus.send('update_person', {'person': window.person}, function (data) {
        var update_person_answer = data.update_person_answer;
        if (update_person_answer === 'error') {
            window.alert('Update error');
        }
        else if (update_person_answer === 'success') {
            window.open('/game', "_self");
        }
    });
};


$(document).ready(function() {
    var shell_panel = document.getElementById('high-scores');


    primus.send("highscores", {}, function (response) {
        var responseMsg = response.msg;
        var player_scores = [];
        if(responseMsg === 'success') {
            player_scores = response.people;
        }
        $.getJSON("/public/assets/game_config.json", function(config) {
            var weights = config["playerscore"];
            var high_scores = [];

            player_scores.forEach(function (player) {
                var player_score = 0;

                for (prop in weights) {
                    if(player.hasOwnProperty(prop)) {
                        player_score += weights[prop] * player[prop];
                    } else {
                        console.warn("Player property: " + prop + " requested in game_config not found!");
                    }

                }

                high_scores.push({
                    name: player.username,
                    score: player_score
                });

            });

            high_scores.forEach(function (score) {
                shell_panel.innerHTML += score.name + " | " + score.score + "<br>";
            });

            //<pre> ?
            //TODO: add ascii-table formatting
            shell_panel.fadeOut("slow")
            shell_panel.fadeIn("slow")

        });

    });

});