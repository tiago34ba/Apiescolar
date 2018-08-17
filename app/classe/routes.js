app.config(function($routeProvider){
$routeProvider.when("/classe/listar", {
		templateUrl: "classe/lista.html",
		controller: "ControllerListarClasse"
	});
	
	
	$routeProvider.when("/classe/cadastrar", {
		templateUrl: "classe/cadastra.html",
		controller: "ControllerCadastrarClasse",

	});

	$routeProvider.when("/classe/editar/:id", {
		templateUrl: "classe/editar.html",
		controller: "ControllerEditarClasse",
		
	});
		
})	
    
    
    
    
.run(function($rootScope, $location) {
	//fica escultadno a rota e verifica o perfil
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
     
	  var ListaRotaAdmin = ['classe/listar.html','administracao/administracao.html'];
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