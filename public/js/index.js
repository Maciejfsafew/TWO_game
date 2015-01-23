// connect to current URL
var primus = Primus.connect();

primus.on("open", function () {
    console.log("Connected!");
});

function updateHeight() {
    var health = document.getElementById("health");
    health.value = window.person.hp;
    health.max = window.person.maxhp;
    var maxHp = document.getElementById("maxHp");
    $("#currHp").html(health.value + '/' + health.max);
}


function updateLocation() {
    primus.send('map', {}, function (server_response) {

        console.log(server_response.map);
        console.log(server_response.location);
        var location = server_response.location;
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
                        img.src = 'public/images/tree_image.jpg';
                        break;
                    case 1:
                        img.src = 'public/images/path_image.jpg';
                        break;
                    case 2:
                        img.src = 'public/images/chest_image.jpg';
                        break;
                    case 3:
                        img.src = 'public/images/monster_image.jpg';
                        break;
                    case 4:
                        img.src = 'public/images/boss_image.jpg';
                        break;
                    case 5:
                        img.src = 'public/images/start_image.jpg';
                        break;
                }
                img.width = 30;
                img.height = 30;
                if (col == score.length - location.x && row == location.y) {
                    img.style.border = "2px solid blue";
                } else {
                    img.style.border = "2px solid lightblue"
                }
                console.log(location);
                newCell10.appendChild(img);
            });
            row = row + 1;
        });
    });
}

function setUpUserInfo() {
    updateHeight();
    $("#level").html(window.person.level);
    var strength = document.getElementById("strength");
    strength.value = window.person.strength;
    $("#currStrength").html(strength.value + '/' + strength.max);
    var dexterity = document.getElementById("dexterity");
    dexterity.value = window.person.dexterity;
    $("#currDexterity").html(dexterity.value + '/' + dexterity.max);
    var experience = document.getElementById("experience");
    experience.value = window.person.experience;
    $("#currExperience").html(experience.value + '/' + experience.max);
}

function logout() {
    primus.send('update_person', {'person': window.person}, function (data) {
        var update_person_answer = data.update_person_answer;
        if (update_person_answer === 'error') {
            window.alert('Update error');
        }
        else if (update_person_answer === 'success') {
            $.removeCookie("name");
            window.open('/', "_self");
        }
    });
};

function highscores() {
    primus.send('update_person', {'person': window.person}, function (data) {
        var update_person_answer = data.update_person_answer;
        if (update_person_answer === 'error') {
            window.alert('Update error');
        }
        else if (update_person_answer === 'success') {
            window.open('/highscores', "_self");
        }
    });
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
                window.person = data.person;
                setUpUserInfo();
                window.is_sleeping = false;
                console.log(window.person);
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

