var i = 0;
var dk_ranks = new Array();

//Blood Talents Begin

//Butchery - BLOOD
dk_ranks[i] = [
  "Whenever you kill an enemy that grants experience or honor, you generate up to 10 runic power. In addition, you generate 1 runic power per 5 sec. while in combat.",
  "Whenever you kill an enemy that grants experience or honor, you generate up to 20 runic power. In addition, you generate 2 runic power per 5 sec. while in combat."
];i++;
//SUBVERSION - BLOOD
dk_ranks[i] = [
  "Increases the critical strike chance of Blood Strike, Heart Strike and Obliterate by 3%, and reduces threat generated while in Blood or Unholy Presence by 8%.",
  "Increases the critical strike chance of Blood Strike, Heart Strike and Obliterate by 6%, and reduces threat generated while in Blood or Unholy Presence by 16%.",
  "Increases the critical strike chance of Blood Strike, Heart Strike and Obliterate by 9%, and reduces threat generated while in Blood or Unholy Presence by 25%."
];i++;
//BLADE BARRIER - BLOOD
dk_ranks[i] = [
  "Whenever your Blood Runes are on cooldown, your Parry chance increases by 2% for the next 10 sec.",
  "Whenever your Blood Runes are on cooldown, your Parry chance increases by 4% for the next 10 sec.",
  "Whenever your Blood Runes are on cooldown, your Parry chance increases by 6% for the next 10 sec.",
  "Whenever your Blood Runes are on cooldown, your Parry chance increases by 8% for the next 10 sec.",
  "Whenever your Blood Runes are on cooldown, your Parry chance increases by 10% for the next 10 sec."
];i++;
//Bladed Armor - Blood
dk_ranks[i] = [
  "Increases your attack power by 1 for every 180 armor value you have. ",
  "Increases your attack power by 2 for every 180 armor value you have. ",
  "Increases your attack power by 3 for every 180 armor value you have. ",
  "Increases your attack power by 4 for every 180 armor value you have. ",
  "Increases your attack power by 5 for every 180 armor value you have. "
];i++;
//SCENT OF BLOOD - BLOOD
dk_ranks[i] = [
  "You have a 15% chance after being struck by a ranged or melee hit to gain the Scent of Blood effect, causing your next melee hit to generate 5 runic power. This effect cannot occur more often than once every 20 sec.",
  "You have a 15% chance after being struck by a ranged or melee hit to gain the Scent of Blood effect, causing your next 2 melee hits to generate 5 runic power. This effect cannot occur more often than once every 20 sec.",
  "You have a 15% chance after being struck by a ranged or melee hit to gain the Scent of Blood effect, causing your next 3 melee hits to generate 5 runic power. This effect cannot occur more often than once every 20 sec."
];i++;
//Two-Handed Weapon Specialization - BLOOD
dk_ranks[i] = [
  "Increases the damage you deal with two-handed melee weapons by 2%.",
  "Increases the damage you deal with two-handed melee weapons by 4%."
];i++;
//Rune Tap - Blood
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>1 Blood<br></span><br><span style=text-align:left;float:left;>Instant</span><span style=text-align:right;float:right;>1 min cooldown</span><br>Converts 1 Blood Rune into 10% of your maximum health."
];i++;
//DARK CONVICTION - BLOOD
dk_ranks[i] = [
  "Increases your chance to critically hit with weapons, spells and abilities by 1%.",
  "Increases your chance to critically hit with weapons, spells and abilities by 2%.",
  "Increases your chance to critically hit with weapons, spells and abilities by 3%.",
  "Increases your chance to critically hit with weapons, spells and abilities by 4%.",
  "Increases your chance to critically hit with weapons, spells and abilities by 5%."
];i++;
//DEATH RUNE MASTERY - BLOOD
dk_ranks[i] = [
  "Whenever you hit with Death Strike or Obliterate there is a 33% chance that the Frost and Unholy Runes will become Death Runes when they activate.",
  "Whenever you hit with Death Strike or Obliterate there is a 66% chance that the Frost and Unholy Runes will become Death Runes when they activate.",
  "Whenever you hit with Death Strike or Obliterate there is a 100% chance that the Frost and Unholy Runes will become Death Runes when they activate."
];i++;
//Improved Rune Tap - Blood
dk_ranks[i] = [
  "Increases the health provided by Rune Tap by 33% and lowers its cooldown by 10 sec.",
  "Increases the health provided by Rune Tap by 66% and lowers its cooldown by 20 sec.",
  "Increases the health provided by Rune Tap by 100% and lowers its cooldown by 30 sec."
];i++;
//SPELL DEFLECTION - BLOOD
dk_ranks[i] = [
  "You have a chance equal to your Parry chance of taking 10% less damage from a direct damage spell.",
  "You have a chance equal to your Parry chance of taking 20% less damage from a direct damage spell.",
  "You have a chance equal to your Parry chance of taking 30% less damage from a direct damage spell."
];i++;
//VENDETTA - BLOOD
dk_ranks[i] = [
  "Heals you for up to 2% of your total maximum health whenever you kill a target that yields experience or honor.",
  "Heals you for up to 4% of your total maximum health whenever you kill a target that yields experience or honor.",
  "Heals you for up to 6% of your total maximum health whenever you kill a target that yields experience or honor."
];i++;
//Bloody Strikes - Blood
dk_ranks[i] = [
  "Increases the damage by 6% and the bonus damage from diseases by 20% of your Blood Strike and Heart strike.",
  "Increases the damage by 12% and the bonus damage from diseases by 40% of your Blood Strike and Heart strike.",
  "Increases the damage by 18% and the bonus damage from diseases by 60% of your Blood Strike and Heart strike."
];i++;
//Veteran of the Third War - Blood
dk_ranks[i] = [
  "Increases your total Strength and Stamina by 2% and your expertise by 2.",
  "Increases your total Strength and Stamina by 4% and your expertise by 4.",
  "Increases your total Strength and Stamina by 6% and your expertise by 6."
];i++;
//Mark of Blood - Blood
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>1 Blood</span><span style=text-align:right;float:right;>30 yd range</span><br><span style=text-align:left;float:left;>Instant</span><span style=text-align:right;float:right;>3 min cooldown</span><br> Place a Mark of Blood on an enemy. Whenever the marked enemy deals damage to a target, that target is healed for 4% of its maximum health. Lasts for 20 sec."
];i++;
//Bloody Vengeance - Blood
dk_ranks[i] = [
  "Gives you a 1% bonus to physical damage you deal for 30 sec after dealing a critical strike from a weapon swing, spell, or ability. This effect stacks up to 3 times.",
  "Gives you a 2% bonus to physical damage you deal for 30 sec after dealing a critical strike from a weapon swing, spell, or ability. This effect stacks up to 3 times.",
  "Gives you a 3% bonus to physical damage you deal for 30 sec after dealing a critical strike from a weapon swing, spell, or ability. This effect stacks up to 3 times."
];i++;
//Abomination's Might - Blood
dk_ranks[i] = [
  "Your Blood Strikes and Heart Strikes have a 25% chance and your Obliterates have a 50% chance to increase the attack power by 10% of raid members within 45 yards by 10 sec. Also increases your total Strength by 1%.",
  "Your Blood Strikes and Heart Strikes have a 50% chance and your Obliterates have a 100% chance to increase the attack power by 10% of raid members within 45 yards by 10 sec. Also increases your total Strength by 2%."
];i++;
//Bloodworms - Blood
dk_ranks[i] = [
  "Your weapon hits have a 3% chance to cause the target to spawn 2-4 Bloodworms. Bloodworms attack your enemies, healing you as they do damage for 20 sec or until killed.",
  "Your weapon hits have a 6% chance to cause the target to spawn 2-4 Bloodworms. Bloodworms attack your enemies, healing you as they do damage for 20 sec or until killed.",
  "Your weapon hits have a 9% chance to cause the target to spawn 2-4 Bloodworms. Bloodworms attack your enemies, healing you as they do damage for 20 sec or until killed."
];i++;
//Hysteria - Blood
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>1 Blood</span><span style=text-align:right;float:right;>30 yd range</span><br><span style=text-align:left;float:left;>Instant</span><span style=text-align:right;float:right;>3 min cooldown</span><br> Induces a friendly unit into a killing frenzy for 30 sec. The target is Enraged, which increases their physical damage by 20%, but causes them to suffer damage equal to 1% of their maximum health every second."
];i++;
//Improved Blood Presence - Blood
dk_ranks[i] = [
  "While in Frost Presence or Unholy Presence, you retain 2% healing from Blood Presence, and healing done to you is increased by 5% in Blood presence.",
  "While in Frost Presence or Unholy Presence, you retain 4% healing from Blood Presence, and healing done to you is increased by 10% in Blood presence.",
];i++;
// Improved Death Strike - Blood
dk_ranks[i] = [
  "Increases the damage of your Death Strike by 15%, increases its critical strike chance by 3%, and increases the healing granted by 25%.",
  "Increases the damage of your Death Strike by 30%, increases its critical strike chance by 6%, and increases the healing granted by 50%."
];i++;
//SUDDEN DOOM - BLOOD
dk_ranks[i] = [
  "Your Blood Strikes and Heart Strikes have a 5% chance to launch a free Death Coil at your target.",
  "Your Blood Strikes and Heart Strikes have a 10% chance to launch a free Death Coil at your target.",
  "Your Blood Strikes and Heart Strikes have a 15% chance to launch a free Death Coil at your target."
];i++;
//Vampiric Blood - Blood
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>1 Blood</span><br><span style=text-align:left;float:left;>Instant</span><span style=text-align:right;float:right;>1 min cooldown</span><br>Increases the amount of health generated through spells and effects by 50% for 20 sec."
];i++;
//Will of the Necropolis - BLOOD
dk_ranks[i] = [
  "Reduces the cooldown of your Anti-Magic Shell by 4 sec. In addition, when you have less than 35% health, your total armor is increased by 10%.",
  "Reduces the cooldown of your Anti-Magic Shell by 8 sec. In addition, when you have less than 35% health, your total armor is increased by 20%.",
  "Reduces the cooldown of your Anti-Magic Shell by 12 sec. In addition, when you have less than 35% health, your total armor is increased by 30%.",
];i++;
//Heart Strike - Blood
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>1 Blood</span><span style=text-align:right;float:right;>Melee range</span><br><span style=text-align:left;float:left;>Instant</span><br><span style=text-align:left;float:left;>Requires Melee Weapon</span><br> Instantly strike the enemy, causing 60% weapon damage plus 75, and an additional 38 bonus damage per disease. Prevents target from using haste effects for 10 sec."
];i++;
//Might of Mograine - BLOOD
dk_ranks[i] = [
  "Increases the critical strike damage bonus of your Blood Boil, Blood Strike, Death Strike, Heart Strike, and Obliterate abilities by 15%.",
  "Increases the critical strike damage bonus of your Blood Boil, Blood Strike, Death Strike, Heart Strike, and Obliterate abilities by 30%.",
  "Increases the critical strike damage bonus of your Blood Boil, Blood Strike, Death Strike, Heart Strike, and Obliterate abilities by 45%."
];i++;
//Blood Gorged - Blood
dk_ranks[i] = [
  "When you are above 75% health, you deal 2% more damage. Also increases your expertise by 1.",
  "When you are above 75% health, you deal 4% more damage. Also increases your expertise by 2.",
  "When you are above 75% health, you deal 6% more damage. Also increases your expertise by 3.",
  "When you are above 75% health, you deal 8% more damage. Also increases your expertise by 4.",
  "When you are above 75% health, you deal 10% more damage. Also increases your expertise by 5."
];i++;
//Dancing Rune Weapon - Blood
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>50 Runic Power</span><span style=text-align:right;float:right;>30 yd range</span><br><span style=text-align:left;float:left;>Instant</span><span style=text-align:right;float:right;>3 min cooldown</span><br><span style=text-align:left;float:left;>Requires Melee Weapon</span><br> Unleashes all available runic power to summon a second rune weapon that fights on its own for 10 sec plus 1 sec per 5 additional runic power, doing the same attacks as the Death Knight."
];i++;

//FROST TALENTS BEGIN----------------------------------------------------------------------

//Improved Icy Touch - Frost
dk_ranks[i] = [
  "Your Icy Touch does an additional 10% damage and your Frost Fever reduces melee and ranged attack speed by an additional 2%.",
  "Your Icy Touch does an additional 20% damage and your Frost Fever reduces melee and ranged attack speed by an additional 4%.",
  "Your Icy Touch does an additional 30% damage and your Frost Fever reduces melee and ranged attack speed by an additional 6%."
];i++;
//Runic Power Mastery- FROST
dk_ranks[i] = [
  "Increases your maximum Runic Power by 15.",
  "Increases your maximum Runic Power by 30."
];i++;
//Toughness - Frost
dk_ranks[i] = [
  "Increases your armor value from items by 3% and reduces the duration of all movement slowing effects by 6%.",
  "Increases your armor value from items by 6% and reduces the duration of all movement slowing effects by 12%.",
  "Increases your armor value from items by 9% and reduces the duration of all movement slowing effects by 18%.",
  "Increases your armor value from items by 12% and reduces the duration of all movement slowing effects by 24%.",
  "Increases your armor value from items by 15% and reduces the duration of all movement slowing effects by 30%."
];i++;
//Icy Reach - Frost
dk_ranks[i] = [
  "Increases the range of your Icy Touch, Chains of Ice and Howling Blast by 5 yards.",
  "Increases the range of your Icy Touch, Chains of Ice and Howling Blast by 10 yards."
];i++;
//Black Ice - Frost
dk_ranks[i] = [
  "Increases your Frost damage by 2%.",
  "Increases your Frost damage by 4%.",
  "Increases your Frost damage by 6%.",
  "Increases your Frost damage by 8%.",
  "Increases your Frost damage by 10%."
];i++;
//Nerves of Cold Steel - FROST
dk_ranks[i] = [
  "Increases your chance to hit with a one-handed melee weapon by 1% and increases the damage done by your offhand weapon by 8%.",
  "Increases your chance to hit with a one-handed melee weapon by 2% and increases the damage done by your offhand weapon by 16%.",
  "Increases your chance to hit with a one-handed melee weapon by 3% and increases the damage done by your offhand weapon by 25%."
];i++;
//ICY TALONS - FROST
dk_ranks[i] = [
  "You leech heat from victims of your Frost Fever, so that when their melee speed is reduced, yours increases by 4% for for the next 20 sec.",
  "You leech heat from victims of your Frost Fever, so that when their melee speed is reduced, yours increases by 8% for for the next 20 sec.",
  "You leech heat from victims of your Frost Fever, so that when their melee speed is reduced, yours increases by 12% for for the next 20 sec.",
  "You leech heat from victims of your Frost Fever, so that when their melee speed is reduced, yours increases by 16% for for the next 20 sec.",
  "You leech heat from victims of your Frost Fever, so that when their melee speed is reduced, yours increases by 20% for for the next 20 sec."
];i++;
//Lichborne - Frost
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>Instant<br></span><span style=text-align:right;float:right;>2 min cooldown</span><br>\
	Draw upon unholy energy to become undead for 15 sec. While undead, you are immune to Charm, Fear and Sleep effects, and your horrifying visage causes melee attacks to have an additional 25% chance to miss you."
];i++;
//Annihilation - Frost
dk_ranks[i] = [
  "Increases the critical strike chance of your melee special abilities by 1%. In addition, there is a 33% chance that your Obliterate will do its damage without consuming diseases.",
  "Increases the critical strike chance of your melee special abilities by 2%. In addition, there is a 66% chance that your Obliterate will do its damage without consuming diseases.",
  "Increases the critical strike chance of your melee special abilities by 3%. In addition, there is a 100% chance that your Obliterate will do its damage without consuming diseases.",
];i++;
//Killing Machine - Frost
dk_ranks[i] = [
  "After landing a critical strike from an auto attack, there is a 10% chance your next Icy Touch, Howling Blast or Frost Strike will be a critical strike.",
  "After landing a critical strike from an auto attack, there is a 20% chance your next Icy Touch, Howling Blast or Frost Strike will be a critical strike.",
  "After landing a critical strike from an auto attack, there is a 30% chance your next Icy Touch, Howling Blast or Frost Strike will be a critical strike.",
  "After landing a critical strike from an auto attack, there is a 40% chance your next Icy Touch, Howling Blast or Frost Strike will be a critical strike.",
  "After landing a critical strike from an auto attack, there is a 50% chance your next Icy Touch, Howling Blast or Frost Strike will be a critical strike.",
];i++;
//Chill of the Grave - Frost
dk_ranks[i] = [
  "Your Chains of Ice, Howling Blast, Icy Touch and Obliterate generate 2.5 additional runic power.",
  "Your Chains of Ice, Howling Blast, Icy Touch and Obliterate generate 5 additional runic power. "
];i++;
//Endless Winter - Frost
dk_ranks[i] = [
  "Your strength is increased by 2% and the cost of your Mind Freeze is reduced to 10 Runic Power.",
  "Your strength is increased by 4% and your Mind Freeze no longer costs runic power."
];i++;
//Frigid Dreadplate - Frost
dk_ranks[i] = [
  "Reduces the chance melee attacks will hit you by 1%.",
  "Reduces the chance melee attacks will hit you by 2%.",
  "Reduces the chance melee attacks will hit you by 3%."
];i++;
//Glacier Rot - Frost
dk_ranks[i] = [
  "Diseased enemies take 7% more damage from your Icy Touch, Howling Blast and Frost Strike.",
  "Diseased enemies take 13% more damage from your Icy Touch, Howling Blast and Frost Strike.",
  "Diseased enemies take 20% more damage from your Icy Touch, Howling Blast and Frost Strike."
];i++;
//Deathchill - Frost
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>Instant<br></span><br><span style=text-align:right;float:right;>2 min cooldown</span><br>When activated, makes your next Icy Touch, Howling Blast, Frost Strike or Obliterate a critical hit if used within 30 sec."
];i++;
//Improved Icy Talons - Frost
dk_ranks[i] = [
  "Your Icy Talons effect increases the melee attack speed of your entire group or raid by 20% for the next 20 sec. In addition, increases your melee attack speed by 5% at all times."
];i++;
//Merciless Combat - Frost
dk_ranks[i] = [
  "Your Icy Touch, Howling Blast, Obliterate and Frost Strike do an additional 6% damage when striking targets with less than 35% health.",
  "Your Icy Touch, Howling Blast, Obliterate and Frost Strike do an additional 12% damage when striking targets with less than 35% health."
];i++;
//Rime - Frost
dk_ranks[i] = [
  "Increases the critical strike chance of your Icy Touch and Obliterate by 5% and casting Icy Touch has a 5% chance to cause your next Howling Blast to consume no runes.",
  "Increases the critical strike chance of your Icy Touch and Obliterate by 10% and casting Icy Touch has a 10% chance to cause your next Howling Blast to consume no runes.",
  "Increases the critical strike chance of your Icy Touch and Obliterate by 15% and casting Icy Touch has a 15% chance to cause your next Howling Blast to consume no runes.",
];i++;
//Chillblains - Frost
dk_ranks[i] = [
  "Victims of your Frost Fever disease are Chilled, Reducing movement speed by 15% for 10 seconds.",
  "Victims of your Frost Fever disease are Chilled, Reducing movement speed by 30% for 10 seconds.",
  "Victims of your Frost Fever disease are Chilled, Reducing movement speed by 50% for 10 seconds."
];i++;
//HUNGERING COLD - FROST
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>60 Runic Power<br></span><br> <span style=text-align:left;float:left;>Instant<br></span><span style=text-align:right;float:right;>1 min cooldown</span><br>Purges the earth around the Death Knight of all heat. Enemies within 10 yards are trapped in ice, preventing them from performing any action for 10 sec and infecting them with Frost Fever. Enemies are considered Frozen, but any damage other than diseases will break the ice."
];i++;
//Improved Frost Presence - FROST
dk_ranks[i] = [
  "While in Blood Presence or Unholy Presence, you retain 4% stamina from Frost Presence, and damage done to you is decreased by an additional 1% in Frost Presence.",
  "While in Blood Presence or Unholy Presence, you retain 8% stamina from Frost Presence, and damage done to you is decreased by an additional 2% in Frost Presence."
];i++;
// Threat of Thassarian - Frost
dk_ranks[i] = [
  "When dual-wielding, your Death Strikes, Obliterates, Plague Strikes, Rune Strikes, Blood Strikes and Frost Strikes have a 30% chance to also deal damage with your offhand weapon.",
  "When dual-wielding, your Death Strikes, Obliterates, Plague Strikes, Rune Strikes, Blood Strikes and Frost Strikes have a 60% chance to also deal damage with your offhand weapon.",
  "When dual-wielding, your Death Strikes, Obliterates, Plague Strikes, Rune Strikes, Blood Strikes and Frost Strikes have a 100% chance to also deal damage with your offhand weapon."
];i++;
//Blood of the North - FROST
dk_ranks[i] = [
  "Increases Blood Strike and Frost Strike damage by 3%. In addition, whenever you hit with a Blood Strike or Pestilence there is a 30% chance that the Blood Rune will become a Death Rune when it activates.",
  "Increases Blood Strike and Frost Strike damage by 6%. In addition, whenever you hit with a Blood Strike or Pestilence there is a 60% chance that the Blood Rune will become a Death Rune when it activates.",
  "Increases Blood Strike and Frost Strike damage by 9%. In addition, whenever you hit with a Blood Strike or Pestilence there is a 100% chance that the Blood Rune will become a Death Rune when it activates."
];i++;
//UNBREAKABLE ARMOR - FROST
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>1 Frost<br></span><br><span style=text-align:left;float:left;>Instant<br></span><span style=text-align:right;float:right;>1 min cooldown</span><br>Increases your armor by 25%, your total Strength by 10% and your Parry chance by 5% for 20 sec."
];i++;
//Acclimation - Frost
dk_ranks[i] = [
  "When you are hit by a spell, you have a 10% chance to boost your resistance to that type of magic for 18 sec. Stacks up to 3 times.",
  "When you are hit by a spell, you have a 20% chance to boost your resistance to that type of magic for 18 sec. Stacks up to 3 times.",
  "When you are hit by a spell, you have a 30% chance to boost your resistance to that type of magic for 18 sec. Stacks up to 3 times.",
];i++;
//Frost Strike - Frost
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>40 Runic Power<br></span><span style=text-align:right;float:right;>Melee Range</span><br><span style=text-align:left;float:left;>Instant</span><br/><span style=text-align:left;float:left;>Requires Melee Weapon<br></span><br>\
	Instantly strike the enemy, causing 55% weapon damage plus 47.85 as Frost damage."
];i++;
//Guile of Gorefiend - Frost
dk_ranks[i] = [
  "Increases the critical strike damage bonus of your Blood Strike, Frost Strike, Howling Blast and Obliterate abilities by 15%, and increases the duration of your Icebound Fortitude by 2 sec.",
  "Increases the critical strike damage bonus of your Blood Strike, Frost Strike, Howling Blast and Obliterate abilities by 30%, and increases the duration of your Icebound Fortitude by 4 sec.",
  "Increases the critical strike damage bonus of your Blood Strike, Frost Strike, Howling Blast and Obliterate abilities by 45%, and increases the duration of your Icebound Fortitude by 6 sec."
];i++;
//Tundra Stalker - Frost
dk_ranks[i] = [
  "Your spells and abilities deal 3% more damage to targets infected with Frost Fever. Also increases your expertise by 1.",
  "Your spells and abilities deal 6% more damage to targets infected with Frost Fever. Also increases your expertise by 2.",
  "Your spells and abilities deal 9% more damage to targets infected with Frost Fever. Also increases your expertise by 3.",
  "Your spells and abilities deal 12% more damage to targets infected with Frost Fever. Also increases your expertise by 4.",
  "Your spells and abilities deal 15% more damage to targets infected with Frost Fever. Also increases your expertise by 5. "
];i++;
//Howling Blast - FROST
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>1 Unholy 1 Frost<br></span><span style=text-align:right;float:right;>20 yd range</span><br> <span style=text-align:left;float:left;>Instant<br></span><span style=text-align:right;float:right;>8 sec cooldown</span><br>Blast the target with a frigid wind dealing 198 to 214 Frost damage to all enemies within 10 yards."
];i++;

//UNHOLY TALENTS BEGIN--------------------------------------------------------

//Vicious Strikes - UNHOLY
dk_ranks[i] = [
  "Increases the critical strike chance by 3% and the critical strike damage bonus by 15% of your Plague Strike, Death Strike and Scourge Strike.",
  "Increases the critical strike chance by 6% and the critical strike damage bonus by 30% of your Plague Strike, Death Strike and Scourge Strike.",
];i++;
//VIRULENCE - UNHOLY
dk_ranks[i] = [
  "Increases your chance to hit with your spells by 1% and reduces the chance that your spells and diseases you cause can be cured by 10%.",
  "Increases your chance to hit with your spells by 2% and reduces the chance that your spells and diseases you cause can be cured by 20%.",
  "Increases your chance to hit with your spells by 3% and reduces the chance that your spells and diseases you cause can be cured by 30%."
];i++;
//Anticipation - UNHOLY
dk_ranks[i] = [
  "Increases your chance to dodge by 1%.",
  "Increases your chance to dodge by 2%.",
  "Increases your chance to dodge by 3%.",
  "Increases your chance to dodge by 4%.",
  "Increases your chance to dodge by 5%."
];i++;
//EPIDEMIC - UNHOLY
dk_ranks[i] = [
  "Increases the duration of Blood Plague and Frost Fever by 3 sec.",
  "Increases the duration of Blood Plague and Frost Fever by 6 sec."
];i++;
//Morbidity - UNHOLY
dk_ranks[i] = [
  "Increases the damage and healing of Death Coil by 5% and reduces the cooldown on Death and Decay by 5 sec.",
  "Increases the damage and healing of Death Coil by 10% and reduces the cooldown on Death and Decay by 10 sec.",
  "Increases the damage and healing of Death Coil by 15% and reduces the cooldown on Death and Decay by 15 sec."
];i++;
//Unholy Command - Unholy
dk_ranks[i] = [
  "Reduces the cooldown of your Death Grip ability by 5 sec.",
  "Reduces the cooldown of your Death Grip ability by 10 sec."
];i++;
//Ravenous Dead - Unholy
dk_ranks[i] = [
  "Increases the total Strength 1% and the contribution your Ghouls get from your Strength and Stamina by 20%.",
  "Increases the total Strength 2% and the contribution your Ghouls get from your Strength and Stamina by 40%.",
  "Increases the total Strength 3% and the contribution your Ghouls get from your Strength and Stamina by 60%."
];i++;
//Outbreak - UNHOLY
dk_ranks[i] = [
  "Increases the damage of Plague Strike, Pestilence and Blood Boil by 10% and Scourge Strike by 7%.",
  "Increases the damage of Plague Strike, Pestilence and Blood Boil by 20% and Scourge Strike by 13%.",
  "Increases the damage of Plague Strike, Pestilence and Blood Boil by 30% and Scourge Strike by 20%."
];i++;
//Necrosis - Unholy
dk_ranks[i] = [
  "Your auto attacks deal an additional 4% Shadow damage.",
  "Your auto attacks deal an additional 8% Shadow damage.",
  "Your auto attacks deal an additional 12% Shadow damage.",
  "Your auto attacks deal an additional 16% Shadow damage.",
  "Your auto attacks deal an additional 20% Shadow damage."
];i++;
//CORPSE EXPLOSION - UNHOLY
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>1 Unholy<br></span><span style=text-align:right;float:right;>30 yd range</span><br><span style=text-align:left;float:left;>Instant<br></span><br>\
	Cause a corpse to explode for 166 Shadow damage to all enemies within 10 yards. Will use a nearby corpse if the target is not a corpse. Does not affect mechanical or elemental corpses."
];i++;
//ON A PALE HORSE - UNHOLY
dk_ranks[i] = [
  "You become as hard to stop as death itself. The duration of all Stun and Fear effects used against you is reduced by 10%, and your mounted speed is increased by 10%. This does not stack with other movement speed increasing effects.",
  "You become as hard to stop as death itself. The duration of all Stun and Fear effects used against you is reduced by 20%, and your mounted speed is increased by 20%. This does not stack with other movement speed increasing effects."
];i++;
//Blood-Caked Blade - Unholy
dk_ranks[i] = [
  "Your auto attacks have a 10% chance to cause a Blood-Caked Strike, which hits for 25% weapon damage plus 12.5% for each of your diseases on the target.",
  "Your auto attacks have a 20% chance to cause a Blood-Caked Strike, which hits for 25% weapon damage plus 12.5% for each of your diseases on the target.",
  "Your auto attacks have a 30% chance to cause a Blood-Caked Strike, which hits for 25% weapon damage plus 12.5% for each of your diseases on the target."
];i++;
//Night of the Dead - UNHOLY
dk_ranks[i] = [
  "Reduces the cooldown on Raise Dead by 45 seconds and the cooldown on Army of the Dead by 2 minutes. Also reduces the damage your pet takes from creature area of effect attacks by 45%.",
  "Reduces the cooldown on Raise Dead by 90 seconds and the cooldown on Army of the Dead by 4 minutes. Also reduces the damage your pet takes from creature area of effect attacks by 90%."
];i++;
// Unholy Blight -  UNHOLY
dk_ranks[i] = [
  "Causes the victims of your Death Coil to be surrounded by a vile swarm of unholy insects, taking 10% of the damage done by the Death Coil over 10 seconds, and preventing any diseases on the victim from being dispelled."
];i++;
//IMPURITY - UNHOLY
dk_ranks[i] = [
  "Your spells receive an additional 5% benefit from your attack power.",
  "Your spells receive an additional 10% benefit from your attack power.",
  "Your spells receive an additional 15% benefit from your attack power.",
  "Your spells receive an additional 20% benefit from your attack power.",
  "Your spells receive an additional 25% benefit from your attack power."
];i++;
//Dirge - Unholy
dk_ranks[i] = [
  "Your Death Strike, Obliterate, Plague Strike and Scourge Strike generate 2.5 additional runic power.",
  "Your Death Strike, Obliterate, Plague Strike and Scourge Strike generate 5 additional runic power."
];i++;
//Desecration - Unholy
dk_ranks[i] = [
  "Your Plague Strikes and Scourge Strikes have a 25% chance to cause the Desecrated Ground effect. Targets in the area are slowed by 50% by the grasping arms of the deae while standing on the unholy ground. Lasts 20 sec.",
  "Your Plague Strikes and Scourge Strikes have a 50% chance to cause the Desecrated Ground effect. Targets in the area are slowed by 50% by the grasping arms of the dead while standing on the unholy ground. Lasts 20 sec."
];i++;
//Magic Suppression - UNHOLY
dk_ranks[i] = [
  "You take 1% less damage from all magic. In addition, your Anti-Magic Shell absorbs an additional 8% of spell damage.",
  "You take 2% less damage from all magic. In addition, your Anti-Magic Shell absorbs an additional 16% of spell damage.",
  "You take 3% less damage from all magic. In addition, your Anti-Magic Shell absorbs an additional 24% of spell damage."
];i++;
//Reaping - Unholy
dk_ranks[i] = [
  "Whenever you hit with Blood Strike or Blood Boil there is a 33% chance that the Blood Rune becomes a Death Rune when it activates.",
  "Whenever you hit with Blood Strike or Blood Boil there is a 66% chance that the Blood Rune becomes a Death Rune when it activates.",
  "Whenever you hit with Blood Strike or Blood Boil there is a 100% chance that the Blood Rune becomes a Death Rune when it activates."
];i++;
//Master of Ghouls - Unholy
dk_ranks[i] = [
  "Reduces the cooldown of Raise Dead by 60 seoncds, and the Ghoul summoned by your Raise Dead spell is considered a pet under your control. Unlike normal Death Knight Ghouls, your pet does not have a limited duration."
];i++;
//Desolation - Unholy
dk_ranks[i] = [
  "Your Blood Strikes cause you to deal 1% additional damage with all attacks for the next 20 seconds.",
  "Your Blood Strikes cause you to deal 2% additional damage with all attacks for the next 20 seconds.",
  "Your Blood Strikes cause you to deal 3% additional damage with all attacks for the next 20 seconds.",
  "Your Blood Strikes cause you to deal 4% additional damage with all attacks for the next 20 seconds.",
  "Your Blood Strikes cause you to deal 5% additional damage with all attacks for the next 20 seconds."
];i++;
//Anti-Magic Zone - Unholy
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>1 Unholy<br></span><br><span style=text-align:left;float:left;>Instant<br></span><span style=text-align:right;float:right;>2 min cooldown</span><br>\
	Places a large, stationary Anti-Magic Zone that reduces spell damage done to party or raid members inside it by 75%. The Anti-Magic Zone lasts for 30 sec or until it absorbs 111,376 spell damage."
];i++;
//Improved Unholy Presence - UNHOLY
dk_ranks[i] = [
  "While in Blood Presence or Frost Presence, you retain 8% increased movement speed from Unholy Presence, and your runes finish their cooldowns 5% faster in Unholy Presence.",
  "While in Blood Presence or Frost Presence, you retain 15% increased movement speed from Unholy Presence, and your runes finish their cooldowns 10% faster in Unholy Presence."
];i++;
//Ghoul Frenzy - Unholy
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>1 Unholy</span><span style=text-align:right;float:right;>45 yd range</span><br><span style=text-align:left;float:left;>Instant</span><span style=text-align:right;float:right;>10 sec cooldown</span><br><br>Grants your pet 25% haste for 30 seconds and heals it for 60% of its health over the duration."
];i++;
//Crypt Fever - Unholy
dk_ranks[i] = [
  "Your diseases also cause Crypt Fever, which increases disease damage taken by the target by 10%.",
  "Your diseases also cause Crypt Fever, which increases disease damage taken by the target by 20%.",
  "Your diseases also cause Crypt Fever, which increases disease damage taken by the target by 30%."
];i++;
//Bone Shield - Unholy
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>1 Unholy<br></span><br><span style=text-align:left;float:left;>Instant<br></span><span style=text-align:right;float:right;>1 min cooldown</span><br><br>The Death Knight is surrounded by 4 whirling bones. While at least 1 bone remains, he takes 40% less damage from all sources and deals 2% more damage with all attacks, spells and abilities. Each damaging attack that lands consumes 1 bone. Lasts 5 mins."
];i++;
//Wandering Plague - UNHOLY
dk_ranks[i] = [
  "When your diseases damage an enemy, there is a chance equal to your melee critical strike chance that they will cause 33% additional damage to the target and all enemies within 8 yards. Ignores any target under the effect of a spell that is cancelled by taking damage.",
  "When your diseases damage an enemy, there is a chance equal to your melee critical strike chance that they will cause 66% additional damage to the target and all enemies within 8 yards. Ignores any target under the effect of a spell that is cancelled by taking damage.",
  "When your diseases damage an enemy, there is a chance equal to your melee critical strike chance that they will cause 100% additional damage to the target and all enemies within 8 yards. Ignores any target under the effect of a spell that is cancelled by taking damage."
];i++;
//EBON PLAGUEBRINGER - UNHOLY
dk_ranks[i] = [
  "Your Crypt Fever morphs into Ebon Plague, which increases vulnerability to magic by 4% in addition to increasing the damage done by diseases. Improves your critical strike chance with weapons and spells by 1% at all times.",
  "Your Crypt Fever morphs into Ebon Plague, which increases vulnerability to magic by 9% in addition to increasing the damage done by diseases. Improves your critical strike chance with weapons and spells by 2% at all times.",
  "Your Crypt Fever morphs into Ebon Plague, which increases vulnerability to magic by 13% in addition to increasing the damage done by diseases. Improves your critical strike chance with weapons and spells by 3% at all times."
];i++;
//Scourge Strike - Unholy
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>1 Unholy 1 Frost<br></span><span style=text-align:right;float:right;>Melee range</span><br> <span style=text-align:left;float:left;>Instant<br></span><br><span style=text-align:left;float:left;>Requires Melee Weapon<br></span><br>An unholy strike that deals 60% weapon damage as Shadow damage plus 81, and an additional 41 bonus damage per disease."
];i++;
//Rage of Rivendare - Unholy
dk_ranks[i] = [
  "Your spells and abilities deal 2% more damage to targets infected with Blood Plague. Also increases your expertise by 1.",
  "Your spells and abilities deal 4% more damage to targets infected with Blood Plague. Also increases your expertise by 2.",
  "Your spells and abilities deal 6% more damage to targets infected with Blood Plague. Also increases your expertise by 3.",
  "Your spells and abilities deal 8% more damage to targets infected with Blood Plague. Also increases your expertise by 4.",
  "Your spells and abilities deal 10% more damage to targets infected with Blood Plague. Also increases your expertise by 5."
];i++;
//Gargoyle
dk_ranks[i] = [
  "<span style=text-align:left;float:left;>60 runic power</span><span style=text-align:right;float:right;>30 yd range</span><br><span style=text-align:left;float:left;>Instant</span><span style=text-align:right;float:right;>3 min cooldown</span><br><br>\
	A Gargoyle flies into the area and bombards the target with Nature damage modified by the Death Knight\'s attack power. Persists for 30 seconds."
];

//UNHOLY Talents End^^
