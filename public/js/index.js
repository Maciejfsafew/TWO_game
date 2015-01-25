// connect to current URL
var primus = Primus.connect();

primus.on("open", function () {
    console.log("Connected!");
});

function updateHeight(person) {
    var health = document.getElementById("health");
    health.value = person.hp;
    health.max = person.maxhp;
    var maxHp = document.getElementById("maxHp");
    $("#currHp").html(health.value + '/' + health.max);
}

function updateHighscores(form) {
    var name = form[0].value;
    console.log(name);

    primus.send('updateHighscores', {'u': $.cookie("name"), 'name': name}, function (server_response) {
        window.open('/highscores', "_self");
    });
}

function updateLocation() {
    primus.send('map', {'u': $.cookie("name")}, function (server_response) {
        var location = server_response.location;
        if (location == undefined) {
            location = {x: -1, y: -1};
        }
        var map_panel = document.getElementById('map-view');

        map_panel = map_panel.tBodies[0];
        while (map_panel.hasChildNodes()) {
            map_panel.removeChild(map_panel.firstChild);
        }
        function transpose(a) {
            return Object.keys(a[0]).map(
                function (c) {
                    return a.map(function (r) {
                        return r[c];
                    });
                }
            );
        }

        var images = 'public/images/';
        var row = 0, col = 0;
        var area = transpose(server_response.map);
        area.forEach(function (score) {

            col = 0;
            var newRow = map_panel.insertRow(-1);
            score.reverse().forEach(function (element) {
                col = col + 1;
                var newCell10 = newRow.insertCell(0);

                var img = document.createElement('img');
                switch (element.type) {
                    case 0:
                        img.src = images + 'tree_image.jpg';
                        break;
                    case 1:
                        img.src = images + 'path_image.jpg';
                        break;
                    case 2:
                        img.src = images + 'chest_image.jpg';
                        break;
                    case 3:
                        img.src = images + 'monster_image.jpg';
                        break;
                    case 4:
                        img.src = images + 'boss_image.jpg';
                        break;
                    case 5:
                        img.src = images + 'start_image.jpg';
                        break;
                    case 6:
                        img.src = images + 'quest_image.jpg';
                        break;
                    case 7:
                        img.src = images + 'store_image.jpg';
                        break;
                }
                img.width = 25;
                img.height = 25;
                if (col == score.length - location.x && row == location.y) {
                    img.style.border = "2px solid yellow";
                } else {
                    img.style.border = "2px solid lightblue"
                }
                newCell10.appendChild(img);
            });
            row = row + 1;
        });
    });
}

function setUpUserInfo(person) {
    updateHeight(person);
    $("#level").html(person.level);
    $("#currStrength").html(person.strength);
    $("#currDexterity").html(person.dexterity);
    var experience = document.getElementById("experience");
    experience.value = person.experience;
    experience.max = person.expPerLevel;
    $("#currExperience").html(experience.value + '/' + experience.max);
    $("#currGold").html(person.gold);
}

function logout() {
    $.removeCookie("name");
    window.open('/', "_self");
};

function highscores() {
    window.open('/highscores', "_self");
};

$(function () {
    if ($.cookie("name") != null) {
        primus.send('get_person', {'u': $.cookie("name")}, function (data) {
            var get_person_answer = data.get_person_answer;
            if (get_person_answer === 'error') {
                window.alert('Error');
                window.open('/', "_self")
            }
            else if (get_person_answer === 'success') {
                //window.person = data.person;
                setUpUserInfo(data.person);
                updateLocation();
                window.is_sleeping = false;
                //console.log(window.person);
                var data_name = "<b>Hej, " + $.cookie("name") + "!</b>";
                $("#name").html(data_name);
                $("#body_elements").attr('style', 'display: block');
            }
        });
    }
    else {
        window.open('/', "_self")
    }
});
