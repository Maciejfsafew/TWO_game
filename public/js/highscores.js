$(document).ready(function() {
    var shell_panel = document.getElementById('high-scores');

    var player_scores = [
        {
            name: "zenek",
            level: 12,
            nr_of_items: 1,
            xp : 340
        },
        {
            name: "krycha",
            level: 20,
            nr_of_items : 13,
            xp: 2
        },
        {
            name: "franio",
            level : 2,
            nr_of_items: 0,
            xp: 10
        }
    ];

    console.log("sending stuff to primus");

    primus.send('get_config', 'get_config', function(config) {

    console.log("received stuff from primus:");
    console.log(config);

    //$.getJSON("/public/assets/game_config.json", function(config) {
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

            console.log(player);
            console.log(weights);
            console.log(player_score);

            high_scores.push({
                name: player.name,
                score: player_score
            });

        });

        high_scores.forEach(function (score) {
            shell_panel.innerHTML += score.name + " | " + score.score + "<br>";
        });

        //<pre> ?
        //TODO: add ascii-table formatting
        //shell_panel.fadeOut("slow")
        //shell_panel.fadeIn("slow")

    });

});
