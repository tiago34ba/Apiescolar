app.controller('myCtrl', function ($scope) {
    $scope.CategoriaOptions = ['Infra', 'Suporte Tecnico', 'Manutenção', 'TI', 'Eletrica', 'Hidráulica'];
});


app.controller("ControllerListarClasse", function ($scope, $http, $filter) {
    $scope.listarAluno = function () {
		
		
        $http.get("http://localhost:3000/classe")
                .then(function (res) {
                    var res = res.data;
					
                    if (res.success) {
                        // Disponibiliza os dados na view (ngView)
                        $scope.classe = res.data;
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }

    $scope.listarClasse();
    $scope.removerClasse = function (aluno) {
        var confirma = confirm("Remover " + classe.nome + "?");

        if (!confirma) {
            return false;
        } else {
            $http.delete("http://localhost:3000/classe/" + aluno._id)
                    .then(function (res) {
                        var res = res.data;

                        if (res.success) {
                            $scope.listarClasse();
                        }
                        alert(res.message);
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
        }
    }
});


app.controller("ControllerListarClassePorUsuario", function ($scope, $http, $filter, $routeParams) {
    $scope.listarclassePorUsuario = function () {
        var _id = $routeParams.id;
        $http.get("http://localhost:3000/classe/" + localStorage.getItem('user_name'))
                .then(function (res) {
                    var res = res.data;
                    if (res.success) {
                        // Disponibiliza os dados na view (ngView)
                        $scope.classe = res.data;
                    } else {
                        alert(res.message);
                        console.log(res);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }

    $scope.listarclassePorUsuario();
});





app.controller("ControllerCadastrarClasse", function ($scope, $http, $location) {
    $scope.cadastrarClasse = function () {
        //console.log($scope.chamado);
        //$scope.chamado.status = "Pendente";
		console.log($scope.classe);
		
		
        $scope.classe.requerente = localStorage.getItem('user_name');
        $http.post("http://localhost:3000/classe", $scope.classe)
                .then(function (res) {
                    var res = res.data;
                    if (res.success) {
                        alert(res.message);
                        $location.path("/classe/listar");
                    } else {
                        alert(res.message);
                    }

                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }
});

app.controller("ControllerEditarClasse", function ($scope, $http, $location, $routeParams) {
    $scope.carregarDadosclasse = function () {



        //$scope.chamado.atendente=localStorage.getItem('user_name');
        var _id = $routeParams.id;
        $http.get("http://localhost:3000/classe/" + _id)
                .then(function (res) {
                    var res = res.data;
                    var chamado = res.data;
                    $scope.classe = res.data;
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }
    $scope.carregarDadosclasse();

    $scope.editaClasse = function () {
        var _id = $routeParams.id;
		//console($scope.aluno);
		

        $http.put("http://localhost:3000/classe/" + _id, $scope.aluno)
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        alert(res.message);
                        $location.path("/classe/listar");
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }





});