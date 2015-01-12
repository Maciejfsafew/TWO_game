$(document).ready(function() {
    var shell_panel = document.getElementById('high-scores');
    primus.send('get_highscores', '', function(response) {
        var highscores = response['highscores'];
        highscores.forEach(function (score) {
            shell_panel.innerHTML += score.name + " | " + score.score + "<br>";
        });
    });
});
