	app.config(function($routeProvider){
	//$routeProvider

	$routeProvider.when("/geral/cadastre_se", {
		templateUrl: "geral/cadastre_se.html",
		controller: "ControllerCadastreSe"
	});

	$routeProvider.when("/home", {
		templateUrl: "geral/home.html",
	});

	$routeProvider.when("/logoff", {
		templateUrl: "autenticacao/form-autenticacao.html",
		controller: "ControllerLogoff"
	});

	$routeProvider.otherwise({
		template: "<h1>Página não encontrada.</h1>",
	});

});
