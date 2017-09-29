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

  var inventorySlots = {
    0: 'Ammo',
    1: 'Head',
    2: 'Neck',
    3: 'Shoulder',
    4: 'Shirt',
    5: 'Chest',
    6: 'Waist',
    7: 'Legs',
    8: 'Feet',
    9: 'Wrist',
    10: 'Hands',
    11: 'Finger1',
    12: 'Finger2',
    13: 'Trinket1',
    14: 'Trinket2',
    15: 'Back',
    16: 'MainHand',
    17: 'OffHand',
    18: 'Ranged',
    19: 'Tabard',
    20: 'Finger', // Can go in Finger1 / Finger2
    21: 'Trinket', // Can go in Trinket1 / Trinket2
    22: 'OneHand', // Can go in MainHand / OffHand
    23: 'TwoHand' // Can go in MainHand only
  };

  var itemTypes = {
    0: 'None',
    1: 'Cloth',
    2: 'Leather',
    3: 'Mail',
    4: 'Plate',
    5: 'Shield',
    6: 'OneHandAxe',
    7: 'TwoHandAxe',
    8: 'OneHandSword',
    9: 'TwoHandSword',
    10: 'OneHandMace',
    11: 'TwoHandSword',
    12: 'Polearm',
    13: 'Staff',
    14: 'Dagger',
    15: 'FistWeapon',
    16: 'Bow',
    17: 'Crossbow',
    18: 'Gun',
    19: 'Thrown'
  };

  var itemQuality = {
    1: 'Poor',      // Gray
    2: 'Common',    // White
    3: 'Uncommon',  // Green
    4: 'Rare',      // Blue
    5: 'Epic',      // Purple
    6: 'Legendary'  // Orange
  };

  var itemBinds = {
    1: 'BoE',       // Bind on Equip
    2: 'BoP',       // Bind on Pickup
    3: 'BoA'        // Bind on Account
  };

  return {
    // int -> string
    classes: classes,
    specs: specs,
    inventorySlots: inventorySlots,
    itemTypes: itemTypes,
    itemBinds: itemBinds
  };

}]);
