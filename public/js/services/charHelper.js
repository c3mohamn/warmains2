// Calculator helper service
wmApp.service('charHelper', ['$http', function($http) {

  var classes = {
    1: 'Warrior',
    2: 'Paladin',
    3: 'Hunter',
    4: 'Rogue',
    5: 'Priest',
    6: 'Deathknight',
    7: 'Shaman',
    8: 'Mage',
    9: 'Warlock',
    11: 'Druid'
  };

  var specs = {
    1: ['arms', 'fury', 'protection'],
    2: ['holy', 'protection', 'retribution'],
    3: ['beastmastery', 'marksmanship', 'survival'],
    4: ['assassination', 'combat', 'subtlety'],
    5: ['discipline', 'holy', 'shadow'],
    6: ['blood', 'frost', 'unholy'],
    7: ['elemental', 'enhancement', 'restoration'],
    8: ['arcane', 'fire', 'frost'],
    9: ['affliction', 'demonology', 'destruction'],
    11: ['balance', 'feral', 'restoration']
  };

  return {
    classes: classes,
    specs: specs
  };

}]);
