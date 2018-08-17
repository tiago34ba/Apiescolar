app.controller("ControllerAutenticacao", function($scope,$http,$rootScope,$location){
	$scope.autenticar = function(){
		
		$http.post("http://localhost:3000/autenticar", $scope.autenticacao)
		.then(function(res){
			var res = res.data;
        	if(res.success){
				localStorage.setItem("user_name",res.data.nome);
				localStorage.setItem("perfil",res.data.perfil);
				localStorage.setItem("user_token",res.token);
				localStorage.setItem("_id",res.data._id);
				
				
				
				$rootScope.user_name = localStorage.getItem("user_name");
		        if (localStorage.getItem("perfil")=="adm"){
		             $rootScope.user_perfil = "Administrador"
	           }else if(localStorage.getItem("perfil")=="user") {
		             $rootScope.user_perfil = "Usiario Comum"
	           }
			     $rootScope.user_name = localStorage.getItem("user_name");
				 $rootScope.logado=$scope.user_name? true:false; 
	
	if (localStorage.getItem("perfil")=="adm"){
		  $rootScope.user_perfil = "Administrador do Sistema"
		
	}else if (localStorage.getItem("perfil")=="usu"){
		 $rootScope.user_perfil = "Usiario Comum"
	}
	


	
  	
				$location.path("/home");
			} else {
				alert(res.message);
			}

		})
		.catch(function(error){
			console.log(error.message);
			alert("Usuario ou senha incorreto")
		});
	}
});

  
