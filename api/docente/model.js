var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Criando a "tabela" docente no mongodb
var docenteSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    data_nascimento: {
        type: String,
        require: true
    },
    cpf: {
        type: String,
        require: true
    },
    rg: {
        type: String,
        require: true
    },
    formacao: {
        type: String,
        require: true
    },
});
var docente = mongoose.model('docente', docenteSchema);

module.exports = docente;