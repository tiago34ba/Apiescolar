


app.controller('myCtrl', function ($scope) {
    $scope.CategoriaOptions = ['Infra', 'Suporte Tecnico', 'Manutenção', 'TI', 'Eletrica', 'Hidráulica'];
});


app.controller("ControllerListarChamado", function ($scope, $http, $filter) {
    $scope.listarChamados = function () {
        $http.get("http://localhost:3000/chamados")
                .then(function (res) {
                    var res = res.data;
                    if (res.success) {
                        // Disponibiliza os dados na view (ngView)
                        $scope.chamados = res.data;
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }

    $scope.listarChamados();
    $scope.removerChamado = function (chamado) {
        var confirma = confirm("Remover " + chamado.nome + "?");

        if (!confirma) {
            return false;
        } else {
            $http.delete("http://localhost:3000/chamados/" + chamado._id)
                    .then(function (res) {
                        var res = res.data;

                        if (res.success) {
                            $scope.listarChamados();
                        }
                        alert(res.message);
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
        }
    }
});


app.controller("ControllerListarChamadoPorUsuario", function ($scope, $http, $filter, $routeParams) {
    $scope.listarChamadosPorUsuario = function () {
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

    $scope.listarChamadosPorUsuario();
});





app.controller("ControllerCadastrarChamado", function ($scope, $http, $location) {
    $scope.cadastrarChamados = function () {
        //console.log($scope.chamado);
        $scope.chamado.status = "Pendente";

        console.log(localStorage.getItem('user_nome'));
        $scope.chamado.requerente = localStorage.getItem('user_name');
        $http.post("http://localhost:3000/chamados", $scope.chamado)
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        alert(res.message);
                        $location.path("/chamados/listausuario");
                    } else {
                        alert(res.message);
                    }

                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }
});

app.controller("ControllerEditarChamado", function ($scope, $http, $location, $routeParams) {
    $scope.carregarDadosChamado = function () {



        //$scope.chamado.atendente=localStorage.getItem('user_name');
        var _id = $routeParams.id;
        $http.get("http://localhost:3000/chamados/" + _id)
                .then(function (res) {
                    var res = res.data;
                    var chamado = res.data;
                    $scope.chamado = res.data;
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }
    $scope.carregarDadosChamado();

    $scope.editarChamado = function () {
        var _id = $routeParams.id;

        $http.put("http://localhost:3000/chamados/" + _id, $scope.chamado)
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        alert(res.message);
                        $location.path("/chamados/listar");
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }





});