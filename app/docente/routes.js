app.config(function($routeProvider){
	
    
      $routeProvider.when("/docente/listar", {
		templateUrl: "docente/lista.html",
		controller: "ControllerListarDocente"
	});
	
	$routeProvider.when("/docente/listausuario", {
		templateUrl: "docente/lista.html",
		controller: "ControllerListdocentePorUsuario"
	});

	$routeProvider.when("/docente/cadastrar", {
		templateUrl: "docente/cadastra.html",
		controller: "ControllerCadastrardocente",
		

	});

	$routeProvider.when("/docente/editar/:id", {
		templateUrl: "docente/editar.html",
		controller: "ControllerEditardocente",
		
	});
		
})
.run(function($rootScope, $location) {
	//fica escultadno a rota e verifica o perfil
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
     
	  var ListaRotaAdmin = ['docente/listar.html','administracao/administracao.html'];
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