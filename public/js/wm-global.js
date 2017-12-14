// Returns a list with duplicate values removed.
function getUnique(arr) {
  return arr.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
}

// Return the specialization of a talent
function getTalentSpec(classId, talentDetails) {
  var preview = getTalentPreviewList(talentDetails);
  var max = Math.max.apply(Math, preview);

  // Have spent more than 36 talent points in  1 tree
  if (max > 36) {
    return specsToString[classId][indexOfMax(preview)];
  }

  // No specialization
  return null;
}

// Return preview of talents using talent Details
function getTalentPreviewList(talentDetails) {
  var preview = [
    talentDetails[0].total,
    talentDetails[1].total,
    talentDetails[2].total
  ];

  return preview;
}

// https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
function indexOfMax(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}

function getPageTitleFromTalentDetails(details, classId) {
  var pageTitle = '(' + details[0].total + '/' +
                        details[1].total + '/' +
                        details[2].total + ')' +
                ' - ' + classesToString[classId];

  return pageTitle;
}
// ----------  INT -> STRING ----------
var classesToString = {
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

var specsToString = {
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

var inventorySlotToString = {
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

var itemTypesToString = {
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
  11: 'TwoHandMace',
  12: 'Polearm',
  13: 'Staff',
  14: 'Dagger',
  15: 'FistWeapon',
  16: 'Bow',
  17: 'Crossbow',
  18: 'Gun',
  19: 'Thrown'
};

var itemQualityToString = {
  1: 'Poor',      // Gray
  2: 'Common',    // White
  3: 'Uncommon',  // Green
  4: 'Rare',      // Blue
  5: 'Epic',      // Purple
  6: 'Legendary'  // Orange
};

var itemBindsToString = {
  1: 'BoE',       // Bind on Equip
  2: 'BoP',       // Bind on Pickup
  3: 'BoA'        // Bind on Account
};

// ---------- STRING -> INT ----------
var classesToInt = {
  Warrior: 1,
  Paladin: 2,
  Hunter: 3,
  Rogue: 4,
  Priest: 5,
  Deathknight: 6,
  Shaman: 7,
  Mage: 8,
  Warlock: 9,
  Druid: 11,
};

var inventorySlotToInt = {
  Ammo: 0,
  Head: 1,
  Neck: 2,
  Shoulder: 3,
  Shirt: 4,
  Chest: 5,
  Waist: 6,
  Legs: 7,
  Feet: 8,
  Wrist: 9,
  Hands: 10,
  Finger1: 11,
  Finger2: 12,
  Trinket1: 13,
  Trinket2: 14,
  Back: 15,
  MainHand: 16,
  OffHand: 17,
  Ranged: 18,
  Tabard: 19,
  Finger: 20,
  Trinket: 21,
  OneHand: 22,
  TwoHand: 23,
};

var itemTypesToInt = {
  None: 0,
  Cloth: 1,
  Leather: 2,
  Mail: 3,
  Plate: 4,
  Shield: 5,
  OneHandAxe: 6,
  TwoHandAxe: 7,
  OneHandSword: 8,
  TwoHandSword: 9,
  OneHandMace: 10,
  TwoHandMace: 11,
  Polearm: 12,
  Staff: 13,
  Dagger: 14,
  FistWeapon: 15,
  Bow: 16,
  Crossbow: 17,
  Gun: 18,
  Thrown: 19,
};

var itemQualityToInt = {
  Poor: 1,
  Common: 2,
  Uncommon: 3,
  Rare: 4,
  Epic: 5,
  Legendary: 6,
};

var itemBindsToInt = {
  BoE: 1,
  BoP: 2,
  BoA: 3,
};

// ---------- Raid Comp -----------
var raidRoles = {
  rdps: 0,
  mdps: 1,
  healer: 2,
  tank: 3
};

var raidBuffs = {
  bloodlust: 0,
  heal: 1,
  inspiration: 2,
  hp: 3,
  int: 4,
  stamina: 5,
  improvMight: 6,
  haste: 7,
  totems: 8,
  ap: 9,
  sp: 10,
  meleeCrit: 11,
  spellCrit: 12,
  replenishment: 13,
  icyTalons: 14,
  faerie: 15,
  spellHit: 16,
}

var raidSpells = {
  bres: 0,
  misdirect: 1,
  tot: 2,
  dsac: 3,
  interrupt: 4,
  dispelMagic: 5,
  dispelDisease: 6,
  dispelPoison: 7,
  dispelCurse: 8,
  dmgReduct: 9,
  hysteria: 10,
  innervate: 11,
  stuns: 12,
  strAgi: 13,
}


// Class info
var classInfo = {
  1: { 
    buffs: [],
    0: {
      role: raidRoles.rdps
    }
  },
  2: 'Paladin',
  3: 'Hunter',
  4: 'Rogue',
  5: 'Priest',
  6: 'Deathknight',
  7: 'Shaman',
  8: 'Mage',
  9: 'Warlock',
  11: 'Druid'
}

// Raid Buffs