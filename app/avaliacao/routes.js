app.config(function($routeProvider){
	$routeProvider.when("/avaliacao/listar", {
		templateUrl: "avaliacao/lista.html",
		controller: "ControllerListarAvaliacao"
	});
	
	$routeProvider.when("/avaliacao/listausuario", {
		templateUrl: "avaliacao/Lista-usuario.html",
		controller: "ControllerListaravaliacaoPorUsuario"
	});

	$routeProvider.when("/avaliacao/cadastrar", {
		templateUrl: "avaliacao/cadastra.html",
		controller: "ControllerCadastrarAvaliacao",
		

	});

	$routeProvider.when("/avaliacao/editar/:id", {
		templateUrl: "avaliacao/editar.html",
		controller: "ControllerEditarAvaliacao",
		
	});
		
})
.run(function($rootScope, $location) {
	//fica escultadno a rota e verifica o perfil
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
     
	  var ListaRotaAdmin = ['avaliacao/listar.html','administracao/administracao.html'];
      result= ListaRotaAdmin.indexOf(next.templateUrl) != -1
	  console.log(localStorage.getItem('perfil'));
	  if ((!localStorage.getItem("user_token"))&&(next.templateUrl!="autenticacao/form-autenticacao.html") &&(next.templateUrl!="geral/cadastre_se.html")){
		  alert("você precisa logar no sistema")
		   $location.path("/autenticar");
		  
	  }else
	  if ("adm"!= localStorage.getItem('perfil') && (result)){
        // no logged user, redirect to /login
		 alert('você não tem permissão para acessar essa funcionalidade-'+localStorage.getItem('perfil'));
         $location.path("/home");
       
      }
	  
    });
  });