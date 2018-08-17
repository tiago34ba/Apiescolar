var Classe = require('./model');


var cadastrarClasse = function (req, res) {
    var classe = req.body; // se não houver o body-parser, não dá para pegar o json do cliente usando o '.body'

    console.log(req);
    new Classe(classe).save(function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: "Erro ao cadastrar - " + error.message,
            }); // enviando o resulato para o Classe
        } else {
            res.status(201).json({
                success: true,
                message: "Classe cadastrado com sucesso.",
                data: data
            });
        }
    });
}

var listarClasse = function (req, res) {
    Classe.find(function (error, data) {
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
}

var listarClasseId = function (req, res) {
    Classe.findById(req.params.id, function (error, data) {
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

var atualizaClasse = function (req, res) {
    var query = {
        _id: req.params.id
    };
    var Classe = req.body;

    Classe.findOneAndUpdate(query, Classe, function (error, data) {
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
}

var removerClasse = function (req, res) {
    var query = {
        _id: req.params.id
    };

    Classe.findOneAndRemove(query, function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: "Erro ao remover - " + error.message,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Classe removido com sucesso.",
                data: data
            });
        }
    });
}


var listaPorClasse = function (req, res) {

    var query = {
        requerente: req.params.requerente
    };
    Classe.find(query, function (error, data) {
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
}

exports.cadastrarClasse = cadastrarClasse; // faz com que os outros arquivos "vejam" este
exports.listarClasse = listarClasse;
exports.listarClasseId = listarClasseId;
exports.atualizaClasse = atualizaClasse;
exports.removerClasse = removerClasse;
exports.listaPorClasse = listaPorClasse;
