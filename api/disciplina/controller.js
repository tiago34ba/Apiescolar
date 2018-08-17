/* global listarDisciplinaId, Disciplina */

var Disciplina = require('./model');


var cadastrarDisciplina = function (req, res) {
    var aluno = req.body; // se não houver o body-parser, não dá para pegar o json do cliente usando o '.body'

    console.log(req);
    new Disciplina(Disciplina).save(function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: "Erro ao cadastrar - " + error.message,
            }); // enviando o resulato para o aluno
        } else {
            res.status(201).json({
                success: true,
                message: "Disciplina cadastrada com sucesso.",
                data: data
            });
        }
    });
};

var listarDisciplina = function (req, res) {
    Disciplina.find(function (error, data) {
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

var listarDisciplinaPorId = function (req, res) {
    Disciplina.findById(req.params.id, function (error, data) {
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
};

var atualizarDisciplina = function (req, res) {
    var query = {
        _id: req.params.id
    };
    var aluno = req.body;

    Disciplina.findOneAndUpdate(query, Disciplina, function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: "Erro ao atualizar - " + error.message,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "docente atualizado com sucesso.",
                data: data
            });
        }
    });
};

var removerDisciplina = function (req, res) {
    var query = {
        _id: req.params.id
    };

    Disciplina.findOneAndRemove(query, function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: "Erro ao remover - " + error.message,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Disciplina removida com sucesso.",
                data: data
            });
        }
    });
};


var listaPorDisciplina = function (req, res) {

    var query = {
        requerente: req.params.requerente
    };
    Disciplina.find(query, function (error, data) {
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

exports.cadastrarDisciplina = cadastrarDisciplina; // faz com que os outros arquivos "vejam" este
exports.listarDisciplina = listarDisciplina;
exports.listarDisciplinaPorId = listarDisciplinaPorId;
exports.atualizarDisciplina = atualizarDisciplina;
exports.removerDisciplina = removerDisciplina;
exports.listaPorDisciplina = listaPorDisciplina;
