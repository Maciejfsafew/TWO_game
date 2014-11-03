var FieldType = Object.freeze({FORBIDDEN : 0, PATH : 1, CHEST : 2, MONSTER : 3, FINAL_BOSS: 4,
                                START : 5 });

var forbidden = {type : FieldType.FORBIDDEN};
var path = {type : FieldType.PATH};
var finalBoss = {type : FieldType.FINAL_BOSS};
var start = {type : FieldType.START};



var chest1 = { puzzle : "p1"};
var chest2 = { puzzle : "p2"};
var monster1 = {name : "1"};
var monster2 = {name : "2"};
var monster3 = {name : "3"};

var field = [
    [ chest1,   path,       monster3, forbidden],
    [finalBoss, monster1,   forbidden, chest2],
    [forbidden, path,       monster2,   path],
    [forbidden, forbidden,  forbidden, start]
];


