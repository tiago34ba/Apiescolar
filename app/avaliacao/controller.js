app.controller('myCtrl', function ($scope) {
    $scope.CategoriaOptions = ['Infra', 'Suporte Tecnico', 'Manutenção', 'TI', 'Eletrica', 'Hidráulica'];
});


app.controller("ControllerListaravaliacao", function ($scope, $http, $filter) {
    $scope.listaravaliacao = function () {
        $http.get("http://localhost:3000/chamados")
                .then(function (res) {
                    var res = res.data;
                    if (res.success) {
                        // Disponibiliza os dados na view (ngView)
                        $scope.avaliacao = res.data;
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }

    $scope.listaravaliacao();
    $scope.removeravaliacao = function (avaliacao) {
        var confirma = confirm("Remover " + avaliacao.nome + "?");

        if (!confirma) {
            return false;
        } else {
            $http.delete("http://localhost:3000/chamados/" + avaliacao._id)
                    .then(function (res) {
                        var res = res.data;

                        if (res.success) {
                            $scope.listaraluno();
                        }
                        alert(res.message);
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
        }
    }
});


app.controller("ControllerListaravaliacaoPorUsuario", function ($scope, $http, $filter, $routeParams) {
    $scope.listaravaliacaoPorUsuario = function () {
        var _id = $routeParams.id;
        $http.get("http://localhost:3000/chamadosUsuario/" + localStorage.getItem('user_name'))
                .then(function (res) {
                    var res = res.data;
                    if (res.success) {
                        // Disponibiliza os dados na view (ngView)
                        $scope.avaliacao = res.data;
                    } else {
                        alert(res.message);
                        console.log(res);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }

    $scope.listaravaliacaoPorUsuario();
});





app.controller("ControlleravaliacaoChamado", function ($scope, $http, $location) {
    $scope.cadastraravaliacao = function () {
        //console.log($scope.chamado);
        $scope.chamado.status = "Pendente";

        console.log(localStorage.getItem('user_nome'));
        $scope.avaliacao.requerente = localStorage.getItem('user_name');
        $http.post("http://localhost:3000/chamados", $scope.aluno)
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        alert(res.message);
                        $location.path("/avaliacao/listausuario");
                    } else {
                        alert(res.message);
                    }

                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }
});

app.controller("ControllerEditaravaliacao", function ($scope, $http, $location, $routeParams) {
    $scope.carregarDadosavaliacao = function () {



        //$scope.chamado.atendente=localStorage.getItem('user_name');
        var _id = $routeParams.id;
        $http.get("http://localhost:3000/chamados/" + _id)
                .then(function (res) {
                    var res = res.data;
                    var chamado = res.data;
                    $scope.avaliacao = res.data;
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }
    $scope.carregarDadosaluno();

    $scope.editaravaliacao = function () {
        var _id = $routeParams.id;

        $http.put("http://localhost:3000/chamados/" + _id, $scope.aluno)
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        alert(res.message);
                        $location.path("/avaliacao/listar");
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }





});