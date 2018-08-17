app.config(function($routeProvider){
	$routeProvider.when("/chamados/listar", {
		templateUrl: "chamados/listar.html",
		controller: "ControllerListarChamado"
	});
	
	$routeProvider.when("/chamados/listausuario", {
		templateUrl: "chamados/Lista-usuario.html",
		controller: "ControllerListarChamadoPorUsuario"
	});

	$routeProvider.when("/chamados/cadastrar", {
		templateUrl: "chamados/cadastrar.html",
		controller: "ControllerCadastrarChamado",
		

	});

	$routeProvider.when("/chamados/editar/:id", {
		templateUrl: "chamados/editar.html",
		controller: "ControllerEditarChamado",
		
	});
		
})
.run(function($rootScope, $location) {
	//fica escultadno a rota e verifica o perfil
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
     
	  var ListaRotaAdmin = ['chamados/listar.html','administracao/administracao.html'];
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
  
  
  
  
  

