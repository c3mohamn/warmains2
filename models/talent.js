var mongoose = require('mongoose');

//char Schema
var TalentSchema = mongoose.Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    classId: {type: Number, required: true},
    talents: {type: String, required: true},
    glyphs: {type: String, required: false},
    preview: {type: Array, required: false},
    spec: {type: String, required: false},
    description: {type: String, required: false}
});

var Talent = module.exports = mongoose.model('Talent', TalentSchema);

module.exports.saveTalent = function(newTalent, callback) {
    newTalent.save(callback);
}
