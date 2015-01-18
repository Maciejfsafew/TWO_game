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

function setUpUserInfo(person) {
    updateHeight(person);
    $("#level").html(person.level);
    var strength = document.getElementById("strength");
    $("#currStrength").html(person.strength);
    var dexterity = document.getElementById("dexterity");
    $("#currDexterity").html(person.dexterity);
    var experience = document.getElementById("experience");
    experience.value = person.experience;
    $("#currExperience").html(experience.value + '/' + experience.max);
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

