var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Criando a "tabela" contato no mongodb
var contatoSchema = new Schema({
	nome: {
		type: String,
		require: true
	},
	telefone: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true
	},
	perfil: {
		type: String,
		require: true
	},
});
var Contato = mongoose.model('contatos', contatoSchema);

module.exports = Contato;
