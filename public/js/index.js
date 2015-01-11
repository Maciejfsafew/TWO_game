// connect to current URL
var primus = Primus.connect();

primus.on("open", function () {
    console.log("Connected!");
});

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

