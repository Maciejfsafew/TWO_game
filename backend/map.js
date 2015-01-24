var FieldType = require("./fieldTypes")

var Monster = require("./monster")
var Start = require("./start")
var Chest = require("./chest")
var FinalBoss = require("./finalBoss")
var Forbidden = require("./forbidden")
var Path = require("./path")
var Quest = require("./quest")
var Store = require("./store")

function parsePlayfield(text) {
    var playfield = [[]];
    var os = require('os');
    var lines = text.split(os.EOL);
    if (lines.length === 1)
        lines = text.split('\n');
    for(var i = 0; i < lines.length; i++) {
        if(lines[i].trim().length == 0) {
            continue; //ignore empty lines
        }
        var fields = lines[i].split(/[\s,]+/);
        playfield[i] = [];
        for(var k = 0; k < fields.length; k++) {
            var newField;
            switch (fields[k][0]) {
                case "X":
                    newField = new Forbidden();
                    break;
                case "P":
                    newField = new Path();
                    break;
                case "C":
                    newField = new Chest();
                    break;
                case "M":
                    newField = new Monster();
                    break;
                case "S":
                    newField = new Start();
                    break;
                case "B":
                    newField = new FinalBoss();
                    break;
                case "Q":
                    newField = new Quest();
                    break;
                case "W":
                    newField = new Store();
                    break;
                default:
                    console.error("Error parsing map field: " + fields[k]);
            }
            playfield[i][k] = newField;
        }
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
    return transpose(playfield);
}

exports.getStartField = function(playfield) {
    for(var i = 0; i < playfield.length; i++) {
        var line = playfield[i];
        for(var k = 0; k < playfield[i].length; k++) {
            if(playfield[i][k].type == FieldType.START) {
                return [i, k];
            }
        }
    }
}

exports.readFieldDefinition = function(filepath) {
    fs = require('fs');

    var data = fs.readFileSync(filepath, 'utf8');
    return parsePlayfield(data);
};

exports.movePerson = function(person, direction) {
    var newLocation = {x: person.currentLocation.x, y: person.currentLocation.y};
    if (direction === "W") {
        newLocation.x -= 1;
    } else if (direction === "E") {
        newLocation.x += 1;
    } else if (direction === "S") {
        newLocation.y += 1;
    } else if (direction === "N") {
        newLocation.y -= 1;
    }

    var status = true;
    if (newLocation.x < 0 || newLocation.x >= person.playfield.length) {
        status = false;
    }
    if (newLocation.y < 0 || newLocation.y >= person.playfield[0].length) {
        status = false;
    }


    if (status) {
        var newField = person.playfield[newLocation.x][newLocation.y];

        if(newField.type != FieldType.FORBIDDEN) {
            return {field: newField, location: newLocation, status: status};
        } else {
            return {status: false};
        }

    } else {
        return {status: false}
    }
}

exports.getFieldDescription = function (field){
    if (field.type == FieldType.FORBIDDEN) {
        return "This field is forbidden.";
    } else if (field.type == FieldType.PATH) {
        return "Normal path field.";
    } else if (field.type == FieldType.CHEST) {
        return "On this field is chest.";
    } else if (field.type ==  FieldType.MONSTER) {
        return "On this field is really scary monster.";
    } else if (field.type ==  FieldType.FINAL_BOSS) {
        return "The journey is over. This field is occupied by Smaug.";
    } else if (field.type == FieldType.START) {
        return "This is the start field. Enjoy.";
    } else if (field.type == FieldType.START) {
        return "There is a mysterious cottage on the filed. It's owner may ask you for favour.";
    } else if (field.type ==  FieldType.STORE) {
        return "Welcome to store. You can buy or sell items.";
    }
}
