var mongoose = require('mongoose');

//char Schema
var CharSchema = mongoose.Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    class: {type: String, required: true},
    race: String,
    spec: String,
    description: String,
    talents: {},
    points: {},
    professions: {},
    glyphs: {},
    // items
    head: {item: String, gems: String, enchant: String},
    neck: {item: String, gems: String, enchant: String},
    shoulders: {item: String, gems: String, enchant: String},
    back: {item: String, gems: String, enchant: String},
    chest: {item: String, gems: String, enchant: String},
    wrist: {item: String, gems: String, enchant: String},
    hands: {item: String, gems: String, enchant: String},
    waist: {item: String, gems: String, enchant: String},
    legs: {item: String, gems: String, enchant: String},
    feet: {item: String, gems: String, enchant: String},
    finger1: {item: String, gems: String, enchant: String},
    finger2: {item: String, gems: String, enchant: String},
    trinket1: {item: String, gems: String, enchant: String},
    trinket2: {item: String, gems: String, enchant: String},
    mainhand: {item: String, gems: String, enchant: String},
    offhand: {item: String, gems: String, enchant: String},
    ranged: {item: String, gems: String, enchant: String}
});

var Char = module.exports = mongoose.model('Char', CharSchema);

module.exports.saveChar = function(newChar, callback) {
    newChar.save(callback);
}
