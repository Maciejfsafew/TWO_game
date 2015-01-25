var imgDir = "/public/resources/monsters"
var defaultMonster = "default.png"
var monsterArray = {
  'Tank' : 'tank.png',
  'Rogue': 'rogue.png',
  'Troll': 'troll.png'
};


var showMonsterImg = function(element) {
  primus.send('map', {'u': $.cookie("name")}, function (response) {
    var location = response.location;
    var field = response.map[location.x][location.y];
    if (field.monster) {
      var monster = field.monster;

      var nameElement = element.find('#monster-name');
      var imgElement = element.find('#monster-picture');
      var descElement = element.find('#monster-description');
      var statsElement = element.find('#monster-stats');

      console.log(JSON.stringify(monster));
      var monsterImg = imgDir + '/' + monsterArray[monster.name];
      imgElement.attr('src', monsterImg);
      nameElement.html(monster.name + ' (lvl ' + monster.level + ')');
      descElement.html(monster.description );
      statsElement.html('HP: ' + monster.hp + '/' + monster.maxhp + ' Str: ' + monster.strength + ' Dex: ' + monster.dexterity);

      element.css("visibility", "visible");
    } else {
      hideMonsterImg(element);
    }
  });
}


var hideMonsterImg = function(element) {
  element.css("visibility", "hidden");
}
