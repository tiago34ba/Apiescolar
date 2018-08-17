app.config(function($routeProvider){
	$routeProvider
	.when("/usuarios/listar", {
		templateUrl: "usuarios/listar.html",
		controller: "ControllerListarUsuario"
	});

	$routeProvider.when("/usuarios/cadastrar", {
		templateUrl: "usuarios/cadastrar.html",
		controller: "ControllerCadastrarUsuario"
	});

	$routeProvider.when("/usuarios/editar/:id", {
		templateUrl: "usuarios/editar.html",
		controller: "ControllerEditarUsuario"
	});
});