var Chamado = require('./model');


var cadastrarChamado = function(req, res){
	var chamado = req.body; // se não houver o body-parser, não dá para pegar o json do cliente usando o '.body'

	console.log(req);
	new Chamado(chamado).save(function(error, data) {
		if(error){
			res.status(400).json({
				success: false,
				message: "Erro ao cadastrar - "+ error.message,
			}); // enviando o resulato para o cliente
		} else {
			res.status(201).json({
				success: true,
				message: "Chamado cadastrado com sucesso.",
				data: data
			});
		}
	});
}

var listarChamados = function(req, res){
	Chamado.find(function(error, data){
		if(error){
			res.status(400).json({
				success: false,
				message:  error.message,
			});
		} else if(!data) {
			res.status(404).json({
				success: false,
				message: "Nenhum registro localizado."
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Ok - Dados localizados com sucesso.",
				data: data
			});
		}
	});
}

var listarChamadoPorId = function(req, res){
	Chamado.findById(req.params.id, function(error, data){
		if(error){
			res.status(400).json({
				success: false,
				message:  error.message,
			});
		} else if(!data) {
			res.status(404).json({
				success: false,
				message: "Nenhum registro localizado."
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Ok",
				data: data
			});
		}
	});
}

var atualizarChamado = function(req, res){
	var query = {_id: req.params.id};
	var chamado = req.body;

	Chamado.findOneAndUpdate(query, chamado, function(error, data){
		if(error){
			res.status(400).json({
				success: false,
				message: "Erro ao atualizar - "+ error.message,
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Chamado atualizado com sucesso.",
				data: data
			});
		}
	});
}

var removerChamado = function(req, res){
	var query = {_id: req.params.id};

	Chamado.findOneAndRemove(query, function(error, data){
		if(error){
			res.status(400).json({
				success: false,
				message: "Erro ao remover - "+ error.message,
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Chamado removido com sucesso.",
				data: data
			});
		}
	});
}


var listaPorUsuario = function(req, res){
	
	var query = {requerente: req.params.requerente};
	Chamado.find(query, function(error, data){
		if(error){
			res.status(400).json({
				success: false,
				message: "Erro ao buscar- "+ error.message,
			});
		} else {
			res.status(200).json({
				success: true,
				message: "sucesso.",
				data: data
			});
		}
	});
}

exports.cadastrarChamado   = cadastrarChamado; // faz com que os outros arquivos "vejam" este
exports.listarChamados     = listarChamados;
exports.listarChamadoPorId = listarChamadoPorId;
exports.atualizarChamado   = atualizarChamado;
exports.removerChamado     = removerChamado;
exports.listaPorUsuario    =listaPorUsuario;
