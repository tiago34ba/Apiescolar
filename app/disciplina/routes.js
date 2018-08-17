app.config(function($routeProvider){
	$routeProvider.when("/disciplina/listar", {
		templateUrl: "disciplina/lista.html",
		controller: "ControllerListarDisciplina"
	});
	
	$routeProvider.when("/disciplina/listausuario", {
		templateUrl: "disciplina/Lista-usuario.html",
		controller: "ControllerListdisciplinaPorUsuario"
	});

	$routeProvider.when("/disciplina/cadastrar", {
		templateUrl: "disciplina/cadastra.html",
		controller: "ControllerCadastrarDisciplina",
		

	});

	$routeProvider.when("/disciplina/editar/:id", {
		templateUrl: "disciplina/editar.html",
		controller: "ControllerEditarDisciplina",
		
	});
		
})
.run(function($rootScope, $location) {
	//fica escultadno a rota e verifica o perfil
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
     
	  var ListaRotaAdmin = ['disciplina/listar.html','administracao/administracao.html'];
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