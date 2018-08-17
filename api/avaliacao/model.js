/* global chamadochema */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Criando a "tabela" avaliação no mongodb
var avaliacaoSchema = new Schema({
    av1: {
        type: String,
        require: true
    },
    av2: {
        type: String,
        require: true
    },
    trabalho: {
        type: String,
        require: true
    },
});
var Avaliacao = mongoose.model('avaliacao', avaliacaoSchema);

module.exports = Avaliacao;