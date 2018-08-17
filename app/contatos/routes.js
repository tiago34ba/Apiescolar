app.config(function($routeProvider){
	$routeProvider
	.when("/contatos/listar", {
		templateUrl: "contatos/listar.html",
		controller: "ControllerListarContato"
	});

	$routeProvider.when("/contatos/cadastrar", {
		templateUrl: "contatos/cadastrar.html",
		controller: "ControllerCadastrarContato"
	});

	$routeProvider.when("/contatos/editar/:id", {
		templateUrl: "contatos/editar.html",
		controller: "ControllerEditarContato"
	});
});