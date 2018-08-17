var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Criando a "tabela" docente no mongodb
var classeSchema = new Schema({
    numero: {
        type: String,
        require: true
    },
    anda: {
        type: String,
        require: true
    },
    capacidade: {
        type: String,
        require: true
    },
    });
var Classe = mongoose.model('classe', classeSchema);

module.exports = Classe;