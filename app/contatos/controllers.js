app.controller("ControllerListarContato", function($scope, $http){
	$scope.listarContatos = function(){
		$http.get("http://localhost:3000/contatos")
		.then(function(res){
			var res = res.data;

			if(res.success){
				$scope.contatos = res.data; // Disponibiliza os dados na view (ngView)
			} else {
				alert(res.message);
			}

		})
		.catch(function(error){
			console.log(error.message);
		});
	}
	$scope.listarContatos();

	$scope.removerContato = function(contato){
		var confirma = confirm("Remover "+contato.nome+"?");

		if(!confirma){
			return false;
		} else {
			$http.delete("http://localhost:3000/contatos/"+contato._id)
			.then(function(res){
				var res = res.data;

				if(res.success){
					$scope.listarContatos();
				}
				alert(res.message);
			})
			.catch(function(error){
				console.log(error.message);
			});
		}
	}
});

app.controller("ControllerCadastrarContato", function($scope, $http, $location){
	$scope.cadastrarContatos = function(){
		$http.post("http://localhost:3000/contatos", $scope.contato)
		.then(function(res){
			var res = res.data;

			if(res.success){
				alert(res.message);
				$location.path("/contatos/listar");
			} else {
				alert(res.message);
			}

		})
		.catch(function(error){
			console.log(error.message);
		});
	}
});

app.controller("ControllerEditarContato", function($scope, $http, $location, $routeParams){
	$scope.carregarDadosContato = function(){
		var _id = $routeParams.id;
		
		$http.get("http://localhost:3000/contatos/"+_id)
		.then(function(res){
			var res = res.data;
			var contato = res.data;
			$scope.contato = res.data;
		})
		.catch(function(error){
			console.log(error.message);
		});
		
	}
	$scope.carregarDadosContato();

	$scope.editarContato = function(){
		var _id = $routeParams.id;

		$http.put("http://localhost:3000/contatos/"+_id, $scope.contato)
		.then(function(res){
			var res = res.data;

			if(res.success){
				alert(res.message);
				$location.path("/contatos/listar");
			} else {
				alert(res.message);
			}
		})
		.catch(function(error){
			console.log(error.message);
		});
		
	}
});