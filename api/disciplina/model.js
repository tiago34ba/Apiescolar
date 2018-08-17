var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Criando a "tabela" Alnno no mongodb
var disciplinaSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    garga_horaria: {
        type: String,
        require: true
    },
    valor: {
        type: String,
        require: true
    },
   
});
var Disciplina = mongoose.model('disciplina', disciplinaSchema);

module.exports = Disciplina;