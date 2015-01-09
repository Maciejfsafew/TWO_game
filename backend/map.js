var FieldType = require("./fieldTypes")

var Monster = require("./monster")
var Start = require("./start")
var Chest = require("./chest")
var FinalBoss = require("./finalBoss")
var Forbidden = require("./forbidden")
var Path = require("./path")

function parsePlayfield(text) {
    var playfield = [[]];
    var os = require('os');
    var lines = text.split(os.EOL);
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
                default:
                    console.error("Error parsing map field: " + fields[k]);
            }
            playfield[i][k] = newField;
        }
    }
    return playfield;

}

exports.readFieldDefinition = function(filepath) {
    fs = require('fs');

    var data = fs.readFileSync(filepath, 'utf8');
    return parsePlayfield(data);

}




