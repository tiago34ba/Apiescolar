	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	// Criando a "tabela" contato no mongodb
	var chamadoSchema = new Schema({
		data_abertura: {
			type: String,
			require: true
		},
		data_vencimento: {
			type: String,
			require: true
		},
		requerente: {
			type: String,
			require: true
		},
		atendente: {
			type: String,
			require: true
		},
		titulo: {
			type: String,
			require: true
		},
		descricao: {
			type: String,
			require: true
		},
		categoria_chamado: {
			type: String,
			require: true
		},
		status: {
			type: String,
			require: true
		},
		data_fechamento: {
			type: String,
			require: true
		},
		feed_back: {
			type: String,
			require: false
		},
		
	});
	var Chamado = mongoose.model('chamados', chamadoSchema);

	module.exports = Chamado;
