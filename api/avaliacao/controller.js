/* global listarAvaliacaoId, Avaliacao, cadastraraluno, aluno */

var Avaliacao = require('./model');


var cadastrarAvaliacao = function (req, res) {
    var Avaliacao = req.body; // se não houver o body-parser, não dá para pegar o json do cliente usando o '.body'

    console.log(req);
    new Avaliacao(avaliacao).save(function (error, data) {
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

var listarAvaliacao = function (req, res) {
    Avaliacao.find(function (error, data) {
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

var listarAvaliacaoPorId = function (req, res) {
    Avaliacao.findById(req.params.id, function (error, data) {
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

var atualizarAvaliacao = function (req, res) {
    var query = {
        _id: req.params.id
    };
    var aluno = req.body;

    Avaliacao.findOneAndUpdate(query, aluno, function (error, data) {
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

var removerAvaliacao = function (req, res) {
    var query = {
        _id: req.params.id
    };

    Avaliacao.findOneAndRemove(query, function (error, data) {
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


var listaPorAvaliacao = function (req, res) {

    var query = {
        requerente: req.params.requerente
    };
    Avaliacao.find(query, function (error, data) {
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

exports.cadastrarAvaliacao = cadastrarAvaliacao; // faz com que os outros arquivos "vejam" este
exports.listarAvaliacao = listarAvaliacao;
exports.listarAvaliacaoPorId = listarAvaliacaoPorId;
exports.atualizarAvaliacao = atualizarAvaliacao;
exports.removerAvaliacao = removerAvaliacao;
exports.listaPorAvaliacao = listaPorAvaliacao;
