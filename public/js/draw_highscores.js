var primus = Primus.connect();

$(window).keypress(function(event) {
  if (event.keyCode == 0 || event.keyCode == 32) {
      window.open('/game', "_self");
  }
});

$(document).ready(function() {
    var table = document.getElementById('high-scores-table');
    table = table.tBodies[0];
    primus.send('get_highscores', '', function(response) {
        var highscores = response['highscores'];
        highscores.forEach(function (score) {
            var newRow = table.insertRow(-1);

            var newCell10 = newRow.insertCell(0);
            newCell10.className = "highscore";
            var newCellText = document.createTextNode(score.name);
            newCell10.appendChild(newCellText);

            var newCell01 = newRow.insertCell(1);
            newCell01.className = "highscore";
            newCellText = document.createTextNode(score.score);
            newCell01.appendChild(newCellText);

        });
        $('td').typewrite({ 'delay': 100, callback: function() {
            $("table, td, th").animate({"border-color": "#00fe00"}, 400);
        }});

    });



});
