// IMPORTAÇÃO DE MODULO
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

// CONSECTA BD
//mongoose.connect('mongodb://localhost:27017/mean');
mongoose.connect('mongodb://chamadosUser:chamados2018@ds121599.mlab.com:21599/chamadosdb');

// CONFIGURA API
var api = express();
    api.use(cors());
    api.use(bodyParser.json());

// IMPORTA CONTROLLERS
var ControllerContato = require('./contatos/controller');
var ControllerUsuario = require('./usuarios/controller');
var ControllerChamado = require('./chamados/controller');
var ControllerAluno   = require('./aluno/controller');
var ControllerDocente = require('./docente/controller');
var ControllerClasse  = require('./classe/controller');
var ControllerAvaliacao = require('./avaliacao/controller');



// CRIA ROTAS
// Rotas autenicação
api.post("/cadastrar-se", ControllerUsuario.cadastrarSe);
api.post("/autenticar", ControllerUsuario.autenticar);

//Qualquer rota abaixo da instrução abaixo não funcionará sem autenticação, por causa da linha abaixo
api.use(ControllerUsuario.chackLogado);

// Contatos
api.post("/contatos", ControllerContato.cadastrarContato);
api.get("/contatos", ControllerContato.listarContatos);
api.get("/contatos/:id", ControllerContato.listarContatoPorId);
api.put("/contatos/:id", ControllerContato.atualizarContato);
api.delete("/contatos/:id", ControllerContato.removerContato);

// Usuários
api.post("/usuarios", ControllerUsuario.cadastrarUsuario);
api.get("/usuarios", ControllerUsuario.listarUsuarios);
api.get("/usuarios/:id", ControllerUsuario.listarUsuarioPorId);
api.put("/usuarios/:id", ControllerUsuario.atualizarUsuario);
api.delete("/usuarios/:id", ControllerUsuario.removerUsuario);




//Chamados
api.post("/chamados", ControllerChamado.cadastrarChamado);
api.get("/chamados", ControllerChamado.listarChamados);
api.get("/chamados/:id", ControllerChamado.listarChamadoPorId);
api.get("/chamadosUsuario/:requerente", ControllerChamado.listaPorUsuario);
api.put("/chamados/:id", ControllerChamado.atualizarChamado);
api.delete("/chamados/:id", ControllerChamado.removerChamado);


//Alunos
api.post("/aluno",ControllerAluno.cadastrarAluno);
api.get("/aluno",ControllerAluno.listarAluno);
api.get("/aluno/:id",ControllerAluno.listarAlunoPorId);
//api.get("/alunoUsuario/:requerente", Controlleraluno.listaPorUsuario);
api.put("/aluno/:id",ControllerAluno.atualizarAluno);
api.delete("/aluno/:id",ControllerAluno.removerAluno);


//Classe
api.post("/classe", ControllerClasse.cadastrarClasse);
api.get("/classe", ControllerClasse.listarClasse);
api.get("/classe/:id", ControllerClasse.listarClasseId);
//api.get("/classeUsuario/:requerente", Controllerclasse.listaPorclasse);
api.put("/classe/:id", ControllerClasse.atualizaClasse);
api.delete("/classe/:id", ControllerClasse.removerClasse);

//Docente
api.post("/docente", ControllerDocente.cadastrarDocente);
api.get("/docente", ControllerDocente.listaPorDocente);
api.get("/docente", ControllerDocente.listarDocenteId);
//api.get("/docenteUsuario/:requerente", Controllerdocente.listaPordocente);
api.put("/docente/:id", ControllerDocente.atualizarDocente);
api.delete("/docente/:id", ControllerDocente.removerDocente);


//Avaliacao
api.post("/avaliacao", ControllerAvaliacao.cadastrarAvaliacao);
api.get("/avaliacao", ControllerAvaliacao.listaPorAvaliacao);
api.get("/avaliacao", ControllerAvaliacao.listarAvaliacaoPorId);
//api.get("/avaliacaoUsuario/:requerente", Controlleravaliacao.listaPoravaliacao);
api.put("/avaliacao/:id", ControllerAvaliacao.atualizarAvaliacao);
api.delete("/avaliacao/:id", ControllerAvaliacao.removerAvaliacao);


// PORTA DO SERVIDOR
api.listen(3000, function(){
	console.log("Servidor rodando na porta 3000!");
});
