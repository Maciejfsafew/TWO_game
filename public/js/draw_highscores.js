$(document).ready(function() {
    var table = document.getElementById('high-scores-table');
    table = table.tBodies[0];
    primus.send('get_highscores', '', function(response) {
        var highscores = response['highscores'];
        highscores.forEach(function (score) {
            var newRow = table.insertRow(-1);

            var newCell10 = newRow.insertCell(0);
            var newCellText = document.createTextNode(score.name);
            newCell10.appendChild(newCellText);

            var newCell01 = newRow.insertCell(1);
            newCellText = document.createTextNode(score.score);
            newCell01.appendChild(newCellText);





        });
        $('td').typewrite({ 'delay': 100, callback: function() {
            $("table, td, th").animate({"border-color": "#00fe00"}, 800);
        }});



    });




});
