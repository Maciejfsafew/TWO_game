var imgDir = "../resources/monsters"
var defaultMonster = "default.png"
var monsterArray = [
  'Tank' : 'tank.png',
  'Rogue': 'rogue.png',
  'Troll': 'troll.png'
]

var element = $('#monster-view');

var showMonsterImg = function(parameters) {
  // TODO uzupelnic jak bedzie API do potworow
  primus.send('monster-api', parameters, function (response) {
    var nameElement = element.children('#monster-name');
    var imgElement = element.children('#monster-picture');
    var descElement = element.children('#monster-description');
    var statsElement = element.children('#monster-stats');

    var monster = imgDir + '/' + monsterArray[response.name];
    imgElement.attr('src', monster);
    nameElement.html(response.name + '(lvl ' + response/.level + ')');
    descElement.html('<i>' + response.description + '</i>');
    statsElement.html('HP: ' + response.hp + '/' + response.maxhp + ' Str: ' + response.strength + ' Dex: ' + response.dexterity);

    element.show();
  });
}

varHideMonsterImg = function() {
  element.hide();
}
