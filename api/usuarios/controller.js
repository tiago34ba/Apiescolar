var Usuario = require('./model');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');
var chaveJWT = "mean";

var cadastrarUsuario = function(req, res){
	var usuario = req.body; // se não houver o body-parser, não dá para pegar o json do cliente usando o '.body'
	    usuario.senha = sha256(usuario.senha);

	new Usuario(usuario).save(function(error, data) {
		if(error){
			res.status(400).json({
				success: false,
				message: "Erro ao cadastrar - "+ error.message,
			}); // enviando o resulato para o cliente
		} else {
			res.status(201).json({
				success: true,
				message: "Usuario cadastrado com sucesso.",
				data: data
			});
		}
	});
}

var listarUsuarios = function(req, res){
	Usuario.find(function(error, data){
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


var listarUsuarioPorId = function(req, res){
	Usuario.findById(req.params.id, function(error, data){
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

var atualizarUsuario = function(req, res){
	var query = {_id: req.params.id};
	var usuario = req.body;

	Usuario.findOneAndUpdate(query, usuario, function(error, data){
		if(error){
			res.status(400).json({
				success: false,
				message: "Erro ao atualizar - "+ error.message,
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Usuario atualizado com sucesso.",
				data: data
			});
		}
	});
}

var removerUsuario = function(req, res){
	var query = {_id: req.params.id};

	Usuario.findOneAndRemove(query, function(error, data){
		if(error){
			res.status(400).json({
				success: false,
				message: "Erro ao remover - "+ error.message,
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Usuario removido com sucesso.",
				data: data
			});
		}
	});
}

var cadastrarSe = function(req, res){
	var usuario = req.body; // se não houver o body-parser, não dá para pegar o json do cliente usando o '.body'
	usuario.senha = sha256(usuario.senha);

	new Usuario(usuario).save(function(error, data) {
		if(error){
			res.status(400).json({
				success: false,
				message: "Erro ao cadastrar - "+ error.message,
			}); // enviando o resulato para o cliente
		} else {
			res.status(201).json({
				success: true,
				message: "Usuario cadastrado com sucesso.",
				data: data
			});
		}
	});
}

var autenticar = function(req, res){
	
	//var usuario = req.body; // se não houver o body-parser, não dá para pegar o json do cliente usando o '.body'
	var query = {
		login: req.body.login,
		senha: sha256(req.body.senha)
	};

	Usuario.findOne(query, function(error,data) {
		if((error)){
			res.status(401).json({
				success: false,
				message: "Erro no login: Usuario e/ou senha incorretos - "+ error.message,
			});
		} 
		else if(!data) {
			res.status(401).json({
				success: false,
				message: "Erro no login: Usuario e/ou senha incorretos - ",
		})
		}
		
		else {
			
			// Se não der erro, então cria o token
			var payload = {};
			if(data){
			var payload = {
				nome:  data.nome,
				id:    data._id,
				perfil:data.perfil,
			 };
			}
			
			
			var token = jwt.sign(payload,chaveJWT);

			res.status(200).json({
				success: true,
				message: "Atenticação realizada.",
				data: data,
				token: token
			});
		}
	});
}

var chackLogado = function(req, res, next){// Esta função será chamada antes de qualquer outra
	var token = req.headers.authorization;

	if(token){
		token = token.split("Bearer").pop().trim();

		jwt.verify(token, chaveJWT, function(error, data){
			if(error){
				res.status(401).json({
					success: false,
					message: "Token JWT inválido."
				});
			} else {
				req.decoded = data; //v 
				next(); // esperando a próxima requisição
			}
		});
	} else {
		res.status(401).json({
			success:false,
			message: "Token JWT não informado."
		});
	}
}


exports.cadastrarUsuario = cadastrarUsuario; // faz com que os outros arquivos "vejam" este
exports.listarUsuarios = listarUsuarios;
exports.listarUsuarioPorId = listarUsuarioPorId;
exports.atualizarUsuario = atualizarUsuario;
exports.removerUsuario = removerUsuario;
exports.cadastrarSe = cadastrarSe;
exports.autenticar = autenticar;
exports.chackLogado = chackLogado;