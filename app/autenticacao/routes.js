app.config(function($routeProvider){
	$routeProvider
	.when("/autenticar", {
		templateUrl: "autenticacao/form-autenticacao.html",
		controller: "ControllerAutenticacao"
	});
});