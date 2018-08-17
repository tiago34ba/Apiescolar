var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
	nome: {
		type: String,
		require: true
	},
	login: {
		type: String,
		require: true
	},
	senha: {
		type: String,
		require: true
	},
	
	perfil: {
		type: String,
		require: true
	}
});

var Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;