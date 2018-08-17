/* global listaralunoId, docente */

var Aluno = require('./model');


var cadastrarAluno = function (req,res) {
    var aluno = req.body; // se não houver o body-parser, não dá para pegar o json do cliente usando o '.body'

    console.log(req);
    new Aluno(aluno).save(function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: "Erro ao cadastrar - " + error.message,
            }); // enviando o resulato para o aluno
        } else {
            res.status(201).json({
                success: true,
                message: "aluno cadastrado com sucesso.",
		data: data
				});
        }
    });
};

var listarAluno = function (req, res) {
    Aluno.find(function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        } else if (!data) {
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
};

var listarAlunoPorId = function (req, res) {
    Aluno.findById(req.params.id, function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        } else if (!data) {
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

var atualizarAluno = function (req, res) {
    var query = {
        _id: req.params.id
    };
    var aluno = req.body;

    Aluno.findOneAndUpdate(query, aluno, function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: "Erro ao atualizar - " + error.message,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "aluno atualizado com sucesso.",
                data: data
            });
        }
    });
};

var removerAluno = function (req, res) {
    var query = {
        _id: req.params.id
    };

    Aluno.findOneAndRemove(query, function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: "Erro ao remover - " + error.message,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "aluno removido com sucesso.",
                data: data
            });
        }
    });
};


var listaPorAluno = function (req, res) {

    var query = {
        requerente: req.params.requerente
    };
    aluno.find(query, function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: "Erro ao buscar- " + error.message,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "sucesso.",
                data: data
            });
        }
    });
};

exports.cadastrarAluno = cadastrarAluno; // faz com que os outros arquivos "vejam" este
exports.listarAluno = listarAluno;
exports.listarAlunoPorId = listarAlunoPorId;
exports.atualizarAluno = atualizarAluno;
exports.removerAluno = removerAluno;
exports.listaPorAluno = listaPorAluno;
