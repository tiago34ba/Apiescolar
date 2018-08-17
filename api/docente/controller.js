var Docente = require('./model');


var cadastrarDocente = function (req, res) {
    var Docente = req.body; // se não houver o body-parser, não dá para pegar o json do cliente usando o '.body'

    console.log(req);
    new Docente(Docente).save(function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: "Erro ao cadastrar - " + error.message,
            }); // enviando o resulato para o Docente
        } else {
            res.status(201).json({
                success: true,
                message: "Docente cadastrado com sucesso.",
                data: data
            });
        }
    });
}

var listarDocente = function (req, res) {
    Docente.find(function (error, data) {
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

var listarDocentePorId = function (req, res) {
    Docente.findById(req.params.id, function (error, data) {
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

var atualizarDocente = function (req, res) {
    var query = {
        _id: req.params.id
    };
    var Docente = req.body;

    Docente.findOneAndUpdate(query, Docente, function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: "Erro ao atualizar - " + error.message,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Docente atualizado com sucesso.",
                data: data
            });
        }
    });
}

var removerDocente = function (req, res) {
    var query = {
        _id: req.params.id
    };

    Docente.findOneAndRemove(query, function (error, data) {
        if (error) {
            res.status(400).json({
                success: false,
                message: "Erro ao remover - " + error.message,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Docente removido com sucesso.",
                data: data
            });
        }
    });
}


var listaPorDocente = function (req, res) {

    var query = {
        requerente: req.params.requerente
    };
    Docente.find(query, function (error, data) {
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

exports.cadastrarDocente = cadastrarDocente; // faz com que os outros arquivos "vejam" este
exports.listarDocente = listarDocente;
exports.listarDocenteId = listarDocentePorId;
exports.atualizarDocente = atualizarDocente;
exports.removerDocente = removerDocente;
exports.listaPorDocente = listaPorDocente;
