app.controller('myCtrl', function ($scope) {
    $scope.CategoriaOptions = ['Infra', 'Suporte Tecnico', 'Manutenção', 'TI', 'Eletrica', 'Hidráulica'];
});


app.controller("ControllerListarAluno", function ($scope, $http, $filter) {
    $scope.listarAluno = function () {
		
		
        $http.get("http://localhost:3000/aluno")
                .then(function (res) {
                    var res = res.data;
					
                    if (res.success) {
                        // Disponibiliza os dados na view (ngView)
                        $scope.alunos = res.data;
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }

    $scope.listarAluno();
    $scope.removerAluno = function (aluno) {
        var confirma = confirm("Remover " + aluno.nome + "?");

        if (!confirma) {
            return false;
        } else {
            $http.delete("http://localhost:3000/aluno/" + aluno._id)
                    .then(function (res) {
                        var res = res.data;

                        if (res.success) {
                            $scope.listarAluno();
                        }
                        alert(res.message);
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
        }
    }
});


app.controller("ControllerListarAlunoPorUsuario", function ($scope, $http, $filter, $routeParams) {
    $scope.listaralunoPorUsuario = function () {
        var _id = $routeParams.id;
        $http.get("http://localhost:3000/chamadosUsuario/" + localStorage.getItem('user_name'))
                .then(function (res) {
                    var res = res.data;
                    if (res.success) {
                        // Disponibiliza os dados na view (ngView)
                        $scope.chamados = res.data;
                    } else {
                        alert(res.message);
                        console.log(res);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }

    $scope.listaralunoPorUsuario();
});





app.controller("ControllerCadastrarAluno", function ($scope, $http, $location) {
    $scope.cadastrarAluno = function () {
        //console.log($scope.chamado);
        //$scope.chamado.status = "Pendente";
		console.log($scope.aluno);
		
		
        $scope.aluno.requerente = localStorage.getItem('user_name');
        $http.post("http://localhost:3000/aluno", $scope.aluno)
                .then(function (res) {
                    var res = res.data;
                    if (res.success) {
                        alert(res.message);
                        $location.path("/aluno/listar");
                    } else {
                        alert(res.message);
                    }

                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }
});

app.controller("ControllerEditarAluno", function ($scope, $http, $location, $routeParams) {
    $scope.carregarDadosaluno = function () {



        //$scope.chamado.atendente=localStorage.getItem('user_name');
        var _id = $routeParams.id;
        $http.get("http://localhost:3000/aluno/" + _id)
                .then(function (res) {
                    var res = res.data;
                    var chamado = res.data;
                    $scope.aluno = res.data;
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }
    $scope.carregarDadosaluno();

    $scope.editaAluno = function () {
        var _id = $routeParams.id;
		//console($scope.aluno);
		

        $http.put("http://localhost:3000/aluno/" + _id, $scope.aluno)
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        alert(res.message);
                        $location.path("/aluno/listar");
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }





});