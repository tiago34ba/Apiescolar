app.controller("ControllerCadastreSe", function($scope,$http,$location){
	$scope.cadastrarUsuarios = function(){
		$http.post("http://localhost:3000/cadastrar-se", $scope.usuario)
		.then(function(res){
			var res = res.data;

			if(res.success){
				alert(res.message);
				$location.path("/autenticar");
			} else {
				alert(res.message);
			}

		})
		.catch(function(error){
			console.log(error.message);
		});
	}
});

app.controller("ControllerLogoff", function($scope,$rootScope,$http, $location){
	localStorage.removeItem("user_name");
	localStorage.removeItem("user_token");
	localStorage.removeItem("_id");
	localStorage.removeItem("perfil");
	$location.path("/autenticar");
    $rootScope.user_name='';
    $rootScope.user_perfil='';
	$rootScope.logado=false;
	
});