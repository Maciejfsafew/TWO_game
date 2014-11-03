var FieldType = Object.freeze({FORBIDDEN : 0, PATH : 1, CHEST : 2, MONSTER : 3, FINAL_BOSS: 4,
    START : 5 })


function Forbidden() {
    this.type = FieldType.FORBIDDEN;
}

Forbidden.prototype.toString = function() {
    return "X";
};

function Path() {
    this.type = FieldType.PATH;
}

Path.prototype.toString = function() {
    return "_";
};

function FinalBoss() {
    this.type = FieldType.FINAL_BOSS;
}

FinalBoss.prototype.toString = function() {
    return "Boss";
};

function Start() {
    this.type = FieldType.START;
}

Start.prototype.toString = function() {
    return "Start";
};

function Chest() {
    this.type = FieldType.CHEST;
    this.items = [];
}

Chest.prototype.toString = function () {
    return "Chest<" + this.items + ">";
};

function Monster(id) {
    this.type = FieldType.MONSTER;
    this.monsterId = id;
}

Monster.prototype.toString = function() {
    return "Monster nr " + this.monsterId;
};

function parsePlayfield(text) {
    var playfield = [[]];
    var lines = text.split("\n");
    for(var i = 0; i < lines.length; i++) {
        if(lines[i].trim().length == 0) {
            continue; //ignore empty lines
        }
        var fields = lines[i].split(/[\s,]+/);
        console.log(fields);
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
                    if(fields[k].length >= 2) {
                        newField = new Monster(Number(fields[k].slice(1)));
                    } else {
                        console.error("Error parsing map field: monster specified but no id ");
                    }
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
            console.log(fields[k]);
            playfield[i][k] = newField;
        }
    }
    return playfield;

}

function readFieldDefinition(filepath) {
    var request = new XMLHttpRequest();
	request.open("GET", filepath, false);
	request.send(null);
    var playfield = parsePlayfield(request.responseText);
    console.log("playfield:\n" + playfield.join("\n"));
    return playfield;
}

readFieldDefinition("test.field");


