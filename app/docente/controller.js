app.controller('myCtrl', function ($scope) {
    $scope.CategoriaOptions = ['Infra', 'Suporte Tecnico', 'Manutenção', 'TI', 'Eletrica', 'Hidráulica'];
});


app.controller("ControllerListarDocente", function ($scope, $http, $filter) {
    $scope.listarDocente = function () {
		
		
        $http.get("http://localhost:3000/docente")
                .then(function (res) {
                    var res = res.data;
					
                    if (res.success) {
                        // Disponibiliza os dados na view (ngView)
                        $scope.docente = res.data;
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }

    $scope.listarDocente();
    $scope.removerDocente = function (aluno) {
        var confirma = confirm("Remover " + aluno.nome + "?");

        if (!confirma) {
            return false;
        } else {
            $http.delete("http://localhost:3000/docente/" + aluno._id)
                    .then(function (res) {
                        var res = res.data;

                        if (res.success) {
                            $scope.listarDocente();
                        }
                        alert(res.message);
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
        }
    }
});


app.controller("ControllerListarDocentePorUsuario", function ($scope, $http, $filter, $routeParams) {
    $scope.listardocentePorUsuario = function () {
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

    $scope.listardocentePorUsuario();
});





app.controller("ControllerCadastrarAluno", function ($scope, $http, $location) {
    $scope.cadastrarDocente = function () {
        //console.log($scope.chamado);
        //$scope.chamado.status = "Pendente";
		console.log($scope.aluno);
		
		
        $scope.docente.requerente = localStorage.getItem('user_name');
        $http.post("http://localhost:3000/docente", $scope.aluno)
                .then(function (res) {
                    var res = res.data;
                    if (res.success) {
                        alert(res.message);
                        $location.path("/docente/listar");
                    } else {
                        alert(res.message);
                    }

                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }
});

app.controller("ControllerEditarDocente", function ($scope, $http, $location, $routeParams) {
    $scope.carregarDadosdocente = function () {



        //$scope.chamado.atendente=localStorage.getItem('user_name');
        var _id = $routeParams.id;
        $http.get("http://localhost:3000/docente/" + _id)
                .then(function (res) {
                    var res = res.data;
                    var chamado = res.data;
                    $scope.docente = res.data;
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }
    $scope.carregarDadosaluno();

    $scope.editaDocente = function () {
        var _id = $routeParams.id;
		//console($scope.aluno);
		

        $http.put("http://localhost:3000/docente/" + _id, $scope.aluno)
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        alert(res.message);
                        $location.path("/docente/listar");
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }





});



